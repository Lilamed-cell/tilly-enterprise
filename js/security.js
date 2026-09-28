'use strict';

const Security = (() => {
  const enc = new TextEncoder();
  const subtle = (window.crypto && window.crypto.subtle) || null;

  const toHex = bytes =>
    [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, '0')).join('');

  const fromHex = hex => {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  };

  const randomBytes = n => crypto.getRandomValues(new Uint8Array(n));
  const randomHex   = n => toHex(randomBytes(n));

  async function sha256(text) {
    if (!subtle) return fallbackHash(text);
    const buf = await subtle.digest('SHA-256', enc.encode(text));
    return toHex(buf);
  }

  async function pbkdf2(password, saltBytes, iterations) {
    if (!subtle) {
      return fallbackHash(password + '::' + toHex(saltBytes) + '::' + iterations);
    }
    const keyMaterial = await subtle.importKey(
      'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']
    );
    const bits = await subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBytes, iterations, hash: CONFIG.SECURITY.PBKDF2_HASH },
      keyMaterial, 256
    );
    return toHex(bits);
  }

  async function hashPassword(password, saltHex) {
    const salt = saltHex ? fromHex(saltHex) : randomBytes(CONFIG.SECURITY.SALT_BYTES);
    const hash = await pbkdf2(password, salt, CONFIG.SECURITY.PBKDF2_ITERATIONS);
    return { hash, salt: toHex(salt) };
  }

  async function verifyPassword(password, storedHash, saltHex) {
    if (!storedHash || !saltHex) return false;
    const { hash } = await hashPassword(password, saltHex);
    return timingSafeEqual(hash, storedHash);
  }

  function timingSafeEqual(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
  }

  function fallbackHash(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  }

  function passwordStrength(pw) {
    if (!pw) return { score: 0, label: '—' };
    let score = 0;
    if (pw.length >= 10) score++;
    if (pw.length >= 14) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return { score: Math.min(score, 4), label: labels[Math.min(score, 4)] };
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => (
      { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
    ));
  }

  function sanitizeText(value, maxLen) {
    if (value == null) return '';
    let s = String(value).replace(/[\u0000-\u001F\u007F]/g, '').trim();
    if (maxLen && s.length > maxLen) s = s.slice(0, maxLen);
    return s;
  }

  function sanitizeImageValue(value, maxLen) {
    const v = sanitizeText(value, maxLen || CONFIG.LIMITS.URL);
    if (!v) return '';
    if (/^(https:\/\/|data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,)/i.test(v)) return v;
    if (/^[\p{Emoji}\p{Emoji_Component}\s]{1,12}$/u.test(v)) return v;
    return '📦';
  }

  function sanitizePhone(value) {
    return String(value || '').replace(/\D/g, '').slice(0, 15);
  }

  const RateLimit = {
    _state() {
      try {
        return JSON.parse(localStorage.getItem(CONFIG.KEYS.RATELIMIT)) ||
               { attempts: [], lockedUntil: 0, history: [] };
      } catch { return { attempts: [], lockedUntil: 0, history: [] }; }
    },
    _save(s) { localStorage.setItem(CONFIG.KEYS.RATELIMIT, JSON.stringify(s)); },

    check() {
      const s = this._state();
      if (s.lockedUntil > Date.now()) {
        return { blocked: true, remainingMs: s.lockedUntil - Date.now() };
      }
      return { blocked: false };
    },

    recordFailure() {
      const s = this._state();
      const now = Date.now();
      s.attempts = (s.attempts || []).filter(t => now - t < CONFIG.SECURITY.ATTEMPT_WINDOW);
      s.attempts.push(now);
      s.history = (s.history || []).slice(-19);
      s.history.push({ t: now, type: 'fail' });

      if (s.attempts.length >= CONFIG.SECURITY.MAX_ATTEMPTS) {
        s.lockedUntil = now + CONFIG.SECURITY.LOCKOUT_DURATION;
        s.attempts = [];
      }
      this._save(s);
      return this.check();
    },

    recordSuccess() {
      const s = this._state();
      s.attempts = [];
      s.lockedUntil = 0;
      s.history = (s.history || []).slice(-19);
      s.history.push({ t: Date.now(), type: 'ok' });
      this._save(s);
    },

    history() { return (this._state().history || []).slice().reverse(); },
    reset()   { localStorage.removeItem(CONFIG.KEYS.RATELIMIT); }
  };

  const Session = {
    create() {
      const token = randomHex(CONFIG.SECURITY.SESSION_BYTES);
      sessionStorage.setItem(CONFIG.KEYS.SESSION, JSON.stringify({
        token,
        created: Date.now(),
        expires: Date.now() + CONFIG.SECURITY.SESSION_TIMEOUT,
        fingerprint: this._fingerprint()
      }));
      return token;
    },

    verify() {
      try {
        const raw = sessionStorage.getItem(CONFIG.KEYS.SESSION);
        if (!raw) return false;
        const s = JSON.parse(raw);
        if (!s.token || Date.now() > s.expires) { this.destroy(); return false; }
        if (s.fingerprint !== this._fingerprint()) { this.destroy(); return false; }
        return true;
      } catch { return false; }
    },

    touch() {
      try {
        const s = JSON.parse(sessionStorage.getItem(CONFIG.KEYS.SESSION) || 'null');
        if (!s || Date.now() > s.expires) return false;
        s.expires = Date.now() + CONFIG.SECURITY.SESSION_TIMEOUT;
        sessionStorage.setItem(CONFIG.KEYS.SESSION, JSON.stringify(s));
        return true;
      } catch { return false; }
    },

    info() {
      try { return JSON.parse(sessionStorage.getItem(CONFIG.KEYS.SESSION) || 'null'); }
      catch { return null; }
    },

    destroy() { sessionStorage.removeItem(CONFIG.KEYS.SESSION); },

    _fingerprint() {
      return fallbackHash(
        navigator.userAgent + '|' + (screen.width + 'x' + screen.height) +
        '|' + (new Date().getTimezoneOffset())
      );
    }
  };

  return {
    sha256, hashPassword, verifyPassword, timingSafeEqual,
    passwordStrength, escapeHtml, sanitizeText,
    sanitizeImageValue, sanitizePhone,
    randomHex, toHex, fromHex,
    RateLimit, Session
  };
})();