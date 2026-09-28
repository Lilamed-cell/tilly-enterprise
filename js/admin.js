'use strict';

(async function () {
  const $ = id => document.getElementById(id);
  const { KEYS, SECURITY, LIMITS, IMAGE } = CONFIG;
  const esc = Security.escapeHtml;
  let DB = null;
  let unlocked = false;
  let idleTimer = null;

  const money = n => DB.settings.currency + ' ' + Number(n || 0).toLocaleString('en-US');

  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function thumbHTML(value, cls) {
    const v = String(value || '📦').trim();
    if (/^(https:\/\/|data:image\/)/i.test(v)) {
      return `<div class="${cls}"><img src="${esc(v)}" alt="" loading="lazy"
                onerror="this.replaceWith(document.createTextNode('📦'))"></div>`;
    }
    return `<div class="${cls}">${esc(v)}</div>`;
  }

  /* =========================================================
     IMAGE HELPERS
     ========================================================= */
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read the file. It may be corrupted.'));
      reader.readAsDataURL(file);
    });
  }

  function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error(
        'Could not decode that image. Please use JPG, PNG, WEBP or GIF. ' +
        '(iPhone HEIC files are not supported by browsers — convert to JPG first.)'
      ));
      img.src = dataUrl;
    });
  }

  function fitDimensions(w, h, max) {
    if (w <= max && h <= max) return { width: w, height: h };
    const ratio = Math.min(max / w, max / h);
    return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
  }

  async function fileToDataURL(file, maxDim, quality) {
    if (!file) throw new Error('No file selected');

    const looksLikeImage =
      (file.type && file.type.startsWith('image/')) ||
      /\.(jpe?g|png|gif|webp|bmp|avif)$/i.test(file.name);

    if (!looksLikeImage) {
      throw new Error('That is not an image file. Please choose a JPG, PNG or WEBP.');
    }

    if (/\.heic$|\.heif$/i.test(file.name) || /heic|heif/i.test(file.type)) {
      throw new Error(
        'iPhone HEIC photos are not supported by browsers. ' +
        'On your phone: Settings → Camera → Formats → "Most Compatible", ' +
        'or convert the photo to JPG first.'
      );
    }

    if (file.size > IMAGE.MAX_FILE_MB * 1024 * 1024) {
      throw new Error(`File is too large (max ${IMAGE.MAX_FILE_MB} MB). Try a smaller photo.`);
    }

    const rawDataUrl = await readFileAsDataURL(file);
    const img = await loadImageFromDataUrl(rawDataUrl);

    if (!img.width || !img.height) {
      throw new Error('Could not read the image dimensions.');
    }

    const { width, height } = fitDimensions(img.width, img.height, maxDim);
    const canvas = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    try {
      return canvas.toDataURL('image/jpeg', quality);
    } catch (e) {
      throw new Error('Could not process the image. Try a different photo.');
    }
  }

  function updateThumbPreview() {
    const value = $('pThumb').value.trim();
    const box   = $('pThumbPreview');
    const isImg = /^(https:\/\/|data:image\/)/i.test(value);
    if (isImg) {
      box.hidden = false;
      box.querySelector('img').src = value;
    } else {
      box.hidden = true;
      box.querySelector('img').removeAttribute('src');
    }
  }

  function updateHeroPreview() {
    const value = $('sHeroBg').value.trim();
    const box   = $('heroBgPreview');
    const isImg = /^(https:\/\/|data:image\/)/i.test(value);
    if (isImg) {
      box.hidden = false;
      box.querySelector('img').src = value;
    } else {
      box.hidden = true;
      box.querySelector('img').removeAttribute('src');
    }
  }

  /* LOGIN */
  function showLogin() {
    unlocked = false;
    $('adminPanel').hidden = true;
    $('loginPage').hidden  = false;

    const hasPw = !!localStorage.getItem(KEYS.PW_HASH);
    const rl = Security.RateLimit.check();

    $('loginErr').textContent = '';
    $('pw1').value = ''; $('pw2').value = '';
    $('pwMeter').hidden = true;

    if (!hasPw) {
      $('loginTitle').textContent = 'Create Admin Password';
      $('loginSub').textContent   = 'First-time setup. Choose a strong password — it protects this console.';
      $('confirmWrap').hidden     = false;
      $('pw2').required           = true;
      $('pwMeter').hidden         = false;
      $('loginBtn').textContent   = 'Set Password & Continue';
      $('forgotRow').hidden       = true;
    } else {
      $('loginTitle').textContent = 'Administrator Login';
      $('loginSub').textContent   = 'Enter your password to manage Tilly Enterprise.';
      $('confirmWrap').hidden     = true;
      $('pw2').required           = false;
      $('loginBtn').textContent   = 'Unlock';
      $('forgotRow').hidden       = false;
    }

    if (rl.blocked) {
      const mins = Math.ceil(rl.remainingMs / 60000);
      $('loginErr').textContent = `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? 's' : ''}.`;
      $('loginBtn').disabled = true;
      $('pw1').disabled = true;
      setTimeout(showLogin, Math.min(rl.remainingMs, 60000));
    } else {
      $('loginBtn').disabled = false;
      $('pw1').disabled = false;
      setTimeout(() => $('pw1').focus(), 100);
    }
  }

  $('pw1').addEventListener('input', e => {
    if ($('confirmWrap').hidden) return;
    const { score, label } = Security.passwordStrength(e.target.value);
    $('pwFill').className = 'pw-meter-fill s' + score;
    $('pwHint').textContent = `Strength: ${label} · Use 10+ characters with letters, numbers & symbols`;
  });

  $('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const err = $('loginErr');
    err.textContent = '';

    const rl = Security.RateLimit.check();
    if (rl.blocked) { showLogin(); return; }

    const pw = $('pw1').value;
    const storedHash = localStorage.getItem(KEYS.PW_HASH);
    const saltHex    = localStorage.getItem(KEYS.PW_SALT);

    $('loginBtn').disabled = true;
    $('loginBtn').textContent = 'Verifying…';

    try {
      if (!storedHash) {
        if (pw.length < SECURITY.MIN_PW_LENGTH) {
          err.textContent = `Password must be at least ${SECURITY.MIN_PW_LENGTH} characters.`;
          return;
        }
        if (pw !== $('pw2').value) {
          err.textContent = 'Passwords do not match.';
          return;
        }
        const { hash, salt } = await Security.hashPassword(pw);
        localStorage.setItem(KEYS.PW_HASH, hash);
        localStorage.setItem(KEYS.PW_SALT, salt);
        Security.RateLimit.recordSuccess();
        toast('✓ Admin password created');
        await unlockConsole();
        return;
      }

      const ok = await Security.verifyPassword(pw, storedHash, saltHex);
      if (ok) {
        Security.RateLimit.recordSuccess();
        await unlockConsole();
      } else {
        const state = Security.RateLimit.recordFailure();
        const remaining = SECURITY.MAX_ATTEMPTS -
          ((state.attempts && state.attempts.length) || 0);
        err.textContent = state.blocked
          ? 'Too many failed attempts. Account locked for 30 minutes.'
          : `Incorrect password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`;
        $('pw1').value = '';
        $('pw1').focus();
      }
    } catch (ex) {
      console.error(ex);
      err.textContent = 'A security error occurred. Please try again.';
    } finally {
      $('loginBtn').disabled = false;
      $('loginBtn').textContent = localStorage.getItem(KEYS.PW_HASH) ? 'Unlock' : 'Set Password & Continue';
    }
  });

  async function unlockConsole() {
    unlocked = true;
    Security.Session.create();
    $('loginPage').hidden = true;
    $('adminPanel').hidden = false;
    DB = await Store.load();
    renderAdminProducts();
    fillSettingsForm();
    fillCategoryList();
    renderSessionInfo();
    renderActivity();
    renderStorageInfo();
    startIdleWatch();
  }

  /* SESSION */
  function startIdleWatch() {
    clearInterval(idleTimer);
    idleTimer = setInterval(() => {
      if (!unlocked) return;
      if (!Security.Session.verify()) {
        lockConsole('Session expired — please log in again.');
        return;
      }
      Security.Session.touch();
      renderSessionInfo();
    }, 15000);
  }

  ['click', 'keydown', 'mousemove'].forEach(ev =>
    document.addEventListener(ev, () => {
      if (unlocked) Security.Session.touch();
    }, { passive: true })
  );

  function renderSessionInfo() {
    const s = Security.Session.info();
    if (!s) return;
    $('sessStatus').textContent  = 'Active ✓';
    $('sessExpires').textContent = new Date(s.expires).toLocaleTimeString();
  }

  function renderActivity() {
    const rows = Security.RateLimit.history().slice(0, 10);
    if (!rows.length) {
      $('activityLog').innerHTML = '<p style="color:var(--muted);font-size:.82rem">No activity yet.</p>';
      return;
    }
    $('activityLog').innerHTML = rows.map(r => `
      <div class="act-item ${r.type === 'ok' ? 'ok' : 'fail'}">
        <span>${r.type === 'ok' ? '✓ Successful login' : '✗ Failed attempt'}</span>
        <span>${new Date(r.t).toLocaleString()}</span>
      </div>`).join('');
  }

  function renderStorageInfo() {
    const el = $('storageInfo');
    if (!el) return;
    const kb = Store.usageKB();
    const mb = (kb / 1024).toFixed(2);
    el.textContent = `${mb} MB used (browser limit ≈ 5 MB)`;
  }

  function lockConsole(msg) {
    Security.Session.destroy();
    clearInterval(idleTimer);
    unlocked = false;
    if (msg) toast(msg);
    showLogin();
  }

  $('lockBtn').onclick   = () => lockConsole('Console locked');
  $('logoutBtn').onclick = () => lockConsole('Logged out');
  $('extendSession').onclick = () => {
    if (Security.Session.touch()) {
      renderSessionInfo();
      toast('✓ Session extended');
    } else lockConsole('Session expired');
  };

  /* TABS */
  document.querySelectorAll('.atab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.atab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.apanel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $('tab-' + tab.dataset.tab).classList.add('active');
    };
  });

  /* PRODUCTS */
  function renderAdminProducts() {
    const q = ($('adminSearch').value || '').toLowerCase();
    const list = DB.products.filter(p =>
      !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    );

    $('prodCount').textContent =
      `${DB.products.length} product${DB.products.length !== 1 ? 's' : ''} total` +
      (q ? ` · ${list.length} matching` : '');

    if (!list.length) {
      $('adminProducts').innerHTML = `<div class="empty"><div>📦</div><strong>${q ? 'No matching products' : 'No products yet'}</strong><p>${q ? 'Try another search term.' : 'Click "Add Product" to create your first item.'}</p></div>`;
      return;
    }

    $('adminProducts').innerHTML = list.map(p => `
      <div class="arow">
        ${thumbHTML(p.thumb, 'arow-img')}
        <div class="arow-info">
          <strong>${esc(p.name)}</strong>
          <span>${esc(p.cat)}${p.specs ? ' • ' + esc(p.specs) : ''}${p.tag ? ' • 🏷 ' + esc(p.tag) : ''}</span>
        </div>
        <div class="arow-price">${money(p.price)}</div>
        <div class="arow-actions">
          <button class="mini" data-edit="${p.id}" title="Edit">✏️</button>
          <button class="mini del" data-del="${p.id}" title="Delete">🗑️</button>
        </div>
      </div>`).join('');

    $('adminProducts').querySelectorAll('[data-edit]').forEach(b => {
      b.onclick = () => openProductModal(Number(b.dataset.edit));
    });
    $('adminProducts').querySelectorAll('[data-del]').forEach(b => {
      b.onclick = () => deleteProduct(Number(b.dataset.del));
    });
  }

  function fillCategoryList() {
    const cats = [...new Set(DB.products.map(p => p.cat))];
    $('catList').innerHTML = cats.map(c => `<option value="${esc(c)}"></option>`).join('');
  }

  function openProductModal(id) {
    fillCategoryList();
    if (id) {
      const p = DB.products.find(x => x.id === id);
      if (!p) return;
      $('prodModalTitle').textContent = 'Edit Product';
      $('pId').value    = p.id;
      $('pName').value  = p.name;
      $('pCat').value   = p.cat;
      $('pPrice').value = p.price;
      $('pOld').value   = p.old || '';
      $('pThumb').value = p.thumb || '';
      $('pSpecs').value = p.specs || '';
      $('pDesc').value  = p.desc  || '';
      $('pTag').value   = p.tag   || '';
    } else {
      $('prodModalTitle').textContent = 'Add Product';
      $('prodForm').reset();
      $('pId').value = '';
    }
    updateThumbPreview();
    $('prodModal').hidden = false;
    setTimeout(() => $('pName').focus(), 100);
  }

  function closeProductModal() { $('prodModal').hidden = true; }

  $('addProductBtn').onclick = () => openProductModal(null);
  $('prodCancel').onclick    = closeProductModal;
  $('prodModal').addEventListener('click', e => {
    if (e.target === $('prodModal')) closeProductModal();
  });

  $('prodForm').addEventListener('submit', async e => {
    e.preventDefault();
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }

    const id = $('pId').value ? Number($('pId').value) : null;
    const data = {
      name:  Security.sanitizeText($('pName').value, LIMITS.NAME),
      cat:   Security.sanitizeText($('pCat').value, LIMITS.CAT),
      price: Math.max(0, Math.floor(Number($('pPrice').value) || 0)),
      old:   $('pOld').value ? Math.max(0, Math.floor(Number($('pOld').value))) : null,
      thumb: Store.cleanImage($('pThumb').value) || '📦',
      specs: Security.sanitizeText($('pSpecs').value, LIMITS.SPECS),
      desc:  Security.sanitizeText($('pDesc').value, LIMITS.DESC),
      tag:   Security.sanitizeText($('pTag').value, LIMITS.TAG)
    };

    if (!data.name || !data.cat) { toast('⚠️ Name and category are required'); return; }

    if (id) {
      const idx = DB.products.findIndex(p => p.id === id);
      if (idx > -1) DB.products[idx] = { ...DB.products[idx], ...data };
      toast('✓ Product updated');
    } else {
      DB.products.unshift({ id: Store.nextId(DB.products), ...data });
      toast('✓ Product added');
    }

    try {
      await Store.save(DB);
      closeProductModal();
      renderAdminProducts();
      fillCategoryList();
      renderStorageInfo();
    } catch (ex) {
      toast('⚠️ ' + ex.message);
    }
  });

  async function deleteProduct(id) {
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }
    const p = DB.products.find(x => x.id === id);
    if (!p) return;
    if (!confirm(`Delete "${p.name}"?\n\nThis cannot be undone.`)) return;

    DB.products = DB.products.filter(x => x.id !== id);
    try {
      await Store.save(DB);
      renderAdminProducts();
      renderStorageInfo();
      toast('✓ Product deleted');
    } catch (ex) { toast('⚠️ ' + ex.message); }
  }

  $('adminSearch').addEventListener('input', renderAdminProducts);

  /* SETTINGS */
  function fillSettingsForm() {
    const s = DB.settings;
    $('sName').value      = s.storeName;
    $('sCurrency').value  = s.currency;
    $('sWhatsapp').value  = s.whatsapp;
    $('sFootName').value  = s.footName;
    $('sTopbar').value    = s.topbar;
    $('sHeroTitle').value = s.heroTitle;
    $('sHeroText').value  = s.heroText;
    $('sHeroBg').value    = s.heroBackground || '';
    updateHeroPreview();
  }

  $('saveSettings').onclick = async () => {
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }
    DB.settings = {
      storeName:      Security.sanitizeText($('sName').value, 60),
      currency:       Security.sanitizeText($('sCurrency').value, 4),
      whatsapp:       Security.sanitizePhone($('sWhatsapp').value),
      footName:       Security.sanitizeText($('sFootName').value, 80),
      topbar:         Security.sanitizeText($('sTopbar').value, 200),
      heroTitle:      Security.sanitizeText($('sHeroTitle').value, 120),
      heroText:       Security.sanitizeText($('sHeroText').value, 300),
      heroBackground: Store.cleanImage($('sHeroBg').value)
    };
    try {
      await Store.save(DB);
      fillSettingsForm();
      renderStorageInfo();
      toast('✓ Settings saved');
    } catch (ex) { toast('⚠️ ' + ex.message); }
  };

  $('revertSettings').onclick = () => { fillSettingsForm(); toast('Reverted'); };

  /* CHANGE PASSWORD */
  $('cpNew').addEventListener('input', e => {
    const { score, label } = Security.passwordStrength(e.target.value);
    $('cpFill').className = 'pw-meter-fill s' + score;
    $('cpHint').textContent = `Strength: ${label}`;
  });

  $('changePwBtn').onclick = async () => {
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }
    const err = $('pwErr');
    err.textContent = '';

    const oldPw = $('cpOld').value;
    const newPw = $('cpNew').value;
    const confirm = $('cpConfirm').value;

    if (!oldPw || !newPw || !confirm) { err.textContent = 'Please fill in all fields.'; return; }
    if (newPw.length < SECURITY.MIN_PW_LENGTH) {
      err.textContent = `New password must be at least ${SECURITY.MIN_PW_LENGTH} characters.`; return;
    }
    if (newPw !== confirm) { err.textContent = 'New passwords do not match.'; return; }

    const storedHash = localStorage.getItem(KEYS.PW_HASH);
    const saltHex    = localStorage.getItem(KEYS.PW_SALT);

    const ok = await Security.verifyPassword(oldPw, storedHash, saltHex);
    if (!ok) { err.textContent = 'Current password is incorrect.'; return; }

    const { hash, salt } = await Security.hashPassword(newPw);
    localStorage.setItem(KEYS.PW_HASH, hash);
    localStorage.setItem(KEYS.PW_SALT, salt);

    $('cpOld').value = ''; $('cpNew').value = ''; $('cpConfirm').value = '';
    $('cpFill').className = 'pw-meter-fill';
    $('cpHint').textContent = 'Strength: —';
    toast('✓ Password updated');
  };

  /* BACKUP */
  $('exportBtn').onclick = async () => {
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }
    const payload = {
      app: CONFIG.APP_NAME,
      version: CONFIG.VERSION,
      exportedAt: new Date().toISOString(),
      data: DB
    };
    const unsigned = JSON.stringify(payload, null, 2);
    const signature = await Security.sha256(unsigned + '::' + SECURITY.INTEGRITY_SECRET);
    payload.signature = signature;

    const finalJson = JSON.stringify(payload, null, 2);
    const blob = new Blob([finalJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tilly-enterprise-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('✓ Backup downloaded');
  };

  $('importBtn').onclick   = () => $('importFile').click();
  $('importFile').onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const claimed = parsed.signature;
      const copy = { ...parsed };
      delete copy.signature;
      const recomputed = await Security.sha256(JSON.stringify(copy, null, 2) + '::' + SECURITY.INTEGRITY_SECRET);

      if (claimed && claimed !== recomputed) {
        toast('⚠️ Backup failed integrity check — refusing to import');
        return;
      }
      if (!parsed.data) { toast('⚠️ Invalid backup file'); return; }

      DB = Store.normalize(parsed.data);
      await Store.save(DB);
      renderAdminProducts();
      fillSettingsForm();
      fillCategoryList();
      renderStorageInfo();
      toast('✓ Backup restored');
    } catch (ex) {
      console.error(ex);
      toast('⚠️ Could not read that file');
    } finally {
      e.target.value = '';
    }
  };

  $('resetBtn').onclick = async () => {
    if (!Security.Session.verify()) { lockConsole('Session expired'); return; }
    if (!confirm('⚠️ Reset ALL products and settings to factory defaults?\n\nThis cannot be undone. Export a backup first if unsure.')) return;
    DB = Store.normalize(Store.clone(CONFIG.DEFAULTS));
    await Store.save(DB);
    renderAdminProducts();
    fillSettingsForm();
    fillCategoryList();
    renderStorageInfo();
    toast('✓ Reset to factory defaults');
  };

  /* FORGOT PASSWORD */
  $('forgotPw').addEventListener('click', e => {
    e.preventDefault();
    const ok = confirm(
      'Reset admin access?\n\n' +
      'This clears the saved password so you can set a new one.\n' +
      'Your products and settings are NOT affected.\n\n' +
      'Continue?'
    );
    if (!ok) return;
    localStorage.removeItem(KEYS.PW_HASH);
    localStorage.removeItem(KEYS.PW_SALT);
    Security.RateLimit.reset();
    Security.Session.destroy();
    toast('Password cleared — set a new one');
    showLogin();
  });

  /* IMAGE UPLOAD WIRING */
  $('pThumbUploadBtn').onclick = () => $('pThumbFile').click();
  $('pThumbFile').onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataURL(file, IMAGE.MAX_DIMENSION, IMAGE.JPEG_QUALITY);
      $('pThumb').value = dataUrl;
      updateThumbPreview();
      toast('✓ Image ready');
    } catch (ex) {
      toast('⚠️ ' + ex.message);
    } finally {
      e.target.value = '';
    }
  };
  $('pThumbClearBtn').onclick = () => {
    $('pThumb').value = '';
    updateThumbPreview();
  };
  $('pThumb').addEventListener('input', updateThumbPreview);

  $('heroBgUploadBtn').onclick = () => $('heroBgFile').click();
  $('heroBgFile').onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataURL(file, IMAGE.HERO_DIMENSION, IMAGE.HERO_QUALITY);
      $('sHeroBg').value = dataUrl;
      updateHeroPreview();
      toast('✓ Hero background ready');
    } catch (ex) {
      toast('⚠️ ' + ex.message);
    } finally {
      e.target.value = '';
    }
  };
  $('heroBgClearBtn').onclick = () => {
    $('sHeroBg').value = '';
    updateHeroPreview();
  };
  $('sHeroBg').addEventListener('input', updateHeroPreview);

  /* BOOT */
  DB = await Store.load();

  if (Security.Session.verify()) {
    unlocked = true;
    $('loginPage').hidden = true;
    $('adminPanel').hidden = false;
    renderAdminProducts();
    fillSettingsForm();
    fillCategoryList();
    renderSessionInfo();
    renderActivity();
    renderStorageInfo();
    startIdleWatch();
  } else {
    showLogin();
  }
})();