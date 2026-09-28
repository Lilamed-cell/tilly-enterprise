'use strict';

const Store = (() => {
  const { KEYS, SECURITY, DEFAULTS, LIMITS } = CONFIG;

  async function computeHash(json) {
    return Security.sha256(json + '::' + SECURITY.INTEGRITY_SECRET);
  }

  async function load() {
    let raw;
    try { raw = localStorage.getItem(KEYS.DATA); }
    catch { return clone(DEFAULTS); }

    if (!raw) return clone(DEFAULTS);

    let parsed;
    try { parsed = JSON.parse(raw); }
    catch { console.warn('Corrupt data — using defaults'); return clone(DEFAULTS); }

    try {
      const storedHash = localStorage.getItem(KEYS.INTEGRITY);
      const computedHash = await computeHash(raw);
      if (storedHash && storedHash !== computedHash) {
        console.warn('⚠️ Data integrity check FAILED — possible tampering.');
        parsed.__tampered = true;
      }
    } catch {}

    /* ⬇⬇⬇ ADD THESE 4 LINES RIGHT HERE ⬇⬇⬇ */
    if (parsed.version !== CONFIG.VERSION) {
      console.log('Config version changed — reloading defaults');
      return clone(DEFAULTS);
    }

    return normalize(parsed);
  }

  async function save(data) {
    const clean = normalize(data);
    const json = JSON.stringify(clean);
    try {
      localStorage.setItem(KEYS.DATA, json);
      localStorage.setItem(KEYS.INTEGRITY, await computeHash(json));
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        throw new Error('Storage is full. Delete some products, or use image URLs instead of uploads.');
      }
      throw e;
    }
  }

  function cleanImage(value) {
    const v = Security.sanitizeText(value, 2_000_000);
    if (!v) return '';
    if (/^https:\/\//i.test(v)) return v;
    if (/^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/i.test(v)) return v;
    return '';
  }

  function normalize(input) {
    const settings = { ...DEFAULTS.settings, ...(input?.settings || {}) };

    settings.storeName = Security.sanitizeText(settings.storeName, 60)     || DEFAULTS.settings.storeName;
    settings.currency  = Security.sanitizeText(settings.currency, 4)       || DEFAULTS.settings.currency;
    settings.whatsapp  = Security.sanitizePhone(settings.whatsapp)         || DEFAULTS.settings.whatsapp;
    settings.footName  = Security.sanitizeText(settings.footName, 80)      || DEFAULTS.settings.footName;
    settings.topbar    = Security.sanitizeText(settings.topbar, 200)       || '';
    settings.heroTitle = Security.sanitizeText(settings.heroTitle, 120)    || DEFAULTS.settings.heroTitle;
    settings.heroText  = Security.sanitizeText(settings.heroText, 300)     || DEFAULTS.settings.heroText;
    settings.heroBackground = cleanImage(settings.heroBackground) || '';

    const products = (Array.isArray(input?.products) ? input.products : DEFAULTS.products)
      .map(normalizeProduct)
      .filter(Boolean);

    return { settings, products, version: CONFIG.VERSION, savedAt: Date.now() };
  }

  function normalizeProduct(p) {
    if (!p || typeof p !== 'object') return null;
    const name = Security.sanitizeText(p.name, LIMITS.NAME);
    if (!name) return null;

    const thumb = cleanImage(p.thumb) || '📦';

    return {
      id:    Number.isFinite(+p.id) ? +p.id : Date.now() + Math.floor(Math.random() * 1000),
      name,
      cat:   Security.sanitizeText(p.cat, LIMITS.CAT) || 'Uncategorised',
      price: Math.max(0, Math.floor(+p.price) || 0),
      old:   p.old ? Math.max(0, Math.floor(+p.old)) : null,
      thumb,
      specs: Security.sanitizeText(p.specs, LIMITS.SPECS),
      desc:  Security.sanitizeText(p.desc, LIMITS.DESC),
      tag:   Security.sanitizeText(p.tag, LIMITS.TAG)
    };
  }

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function nextId(products) {
    return products.reduce((m, p) => Math.max(m, +p.id || 0), 0) + 1;
  }

  function usageKB() {
    try {
      const used = (localStorage.getItem(KEYS.DATA) || '').length;
      return Math.round(used / 1024);
    } catch { return 0; }
  }

  return { load, save, normalize, clone, nextId, computeHash, cleanImage, usageKB };
})();