'use strict';

(async function () {
  const $ = id => document.getElementById(id);
  const esc = Security.escapeHtml;
  let DB = null;
  let cart = {};
  let activeCat = 'All';
  let query = '';
  let currentProduct = null;
  let pvQty = 1;
  let pvOpenedFromClick = false;   // tracks how the popup was opened

  const money = n => DB.settings.currency + ' ' + Number(n || 0).toLocaleString('en-US');

  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  function thumbHTML(value, cls) {
    const v = String(value || '📦').trim();
    if (/^(https:\/\/|data:image\/)/i.test(v)) {
      return `<div class="${cls}"><img src="${esc(v)}" alt="" loading="lazy"
                onerror="this.replaceWith(document.createTextNode('📦'))"></div>`;
    }
    return `<div class="${cls}">${esc(v)}</div>`;
  }

  function applySettings() {
    const s = DB.settings;
    document.title = `${s.storeName} — Electronics & Home Appliances in Ghana`;
    $('topbar').textContent     = s.topbar;
    $('logoName').textContent   = s.storeName;
    $('heroTitle').textContent  = s.heroTitle;
    $('heroText').textContent   = s.heroText;
    $('footName').textContent   = `⚡ ${s.storeName}`;
    $('footCopy').textContent   = s.footName;

    const hero = document.querySelector('.hero');
    if (hero) {
      if (s.heroBackground) {
        const safeUrl = s.heroBackground.replace(/["'()\\]/g, encodeURIComponent);
        hero.style.backgroundImage =
          `linear-gradient(135deg, rgba(15,118,110,.82) 0%, rgba(19,78,74,.86) 55%, rgba(15,23,42,.92) 100%), url("${safeUrl}")`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        hero.classList.add('has-bg');
      } else {
        hero.style.backgroundImage = '';
        hero.classList.remove('has-bg');
      }
    }
  }

  function renderChips() {
    const cats = ['All', ...new Set(DB.products.map(p => p.cat))];
    if (!cats.includes(activeCat)) activeCat = 'All';

    $('chips').innerHTML = cats.map(c => {
      const n = c === 'All' ? DB.products.length : DB.products.filter(p => p.cat === c).length;
      return `<button class="chip ${c === activeCat ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)} <span style="opacity:.6">(${n})</span></button>`;
    }).join('');

    $('chips').querySelectorAll('.chip').forEach(btn => {
      btn.onclick = () => { activeCat = btn.dataset.cat; renderChips(); renderGrid(); };
    });
  }

  function renderGrid() {
    let list = DB.products.filter(p => activeCat === 'All' || p.cat === activeCat);

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        String(p.specs || '').toLowerCase().includes(q)
      );
    }

    $('count').textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;

    if (!list.length) {
      $('grid').innerHTML = `<div class="empty"><div>🔍</div><strong>No products found</strong><p>Try a different search or category.</p></div>`;
      return;
    }

    $('grid').innerHTML = list.map(p => {
      const tagClass = (p.tag && p.tag.toLowerCase() === 'sale') ? 'tag low' : 'tag';
      return `
        <article class="card" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${esc(p.name)}">
          <div class="thumb">
            ${p.tag ? `<span class="${tagClass}">${esc(p.tag)}</span>` : ''}
            ${thumbHTML(p.thumb, '')}
          </div>
          <div class="body">
            <div class="cat">${esc(p.cat)}</div>
            <h3 class="name">${esc(p.name)}</h3>
            <div class="specs">${esc(p.specs || '')}</div>
            <div class="price">${money(p.price)}${p.old ? `<small>${money(p.old)}</small>` : ''}</div>
            <button class="add" data-id="${p.id}">Add to Cart</button>
          </div>
        </article>`;
    }).join('');

    $('grid').querySelectorAll('.card').forEach(card => {
      const id = Number(card.dataset.id);
      card.addEventListener('click', e => {
        if (e.target.closest('.add')) return;
        openProductView(id, false);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductView(id, false); }
      });
    });

    $('grid').querySelectorAll('.add').forEach(btn => {
      btn.onclick = e => {
        e.stopPropagation();
        addToCart(Number(btn.dataset.id), btn);
      };
    });
  }

  /* =========================================================
     PRODUCT DETAIL VIEW — FIXED
     ========================================================= */
  function openProductView(id, fromUrl) {
    const p = DB.products.find(x => x.id === id);
    if (!p) return;
    currentProduct = p;
    pvQty = 1;
    pvOpenedFromClick = !fromUrl;

    /* Image */
    const pvImage = $('pvImage');
    if (/^(https:\/\/|data:image\/)/i.test(p.thumb)) {
      pvImage.innerHTML = `<img src="${esc(p.thumb)}" alt="${esc(p.name)}"
                            onerror="this.replaceWith(document.createTextNode('📦'))">`;
    } else {
      pvImage.innerHTML = `<span class="pv-emoji">${esc(p.thumb || '📦')}</span>`;
    }

    $('pvCat').textContent   = p.cat;
    $('pvName').textContent  = p.name;
    $('pvSpecs').textContent = p.specs || '';
    $('pvPrice').textContent = money(p.price);

    if (p.old) {
      $('pvOld').textContent = money(p.old);
      $('pvOld').hidden = false;
    } else {
      $('pvOld').hidden = true;
    }

    $('pvDesc').textContent = p.desc || autoDescription(p);
    $('pvQty').textContent = '1';

    $('productView').hidden = false;
    document.body.classList.add('locked');

    /* Update URL — replaceState for URL-opened popups (so back button
       doesn't leave the site), pushState for card-clicked popups
       (so back button closes them). */
    try {
      if (fromUrl) {
        history.replaceState({ pvOpen: id }, '', '#product-' + id);
      } else {
        history.pushState({ pvOpen: id }, '', '#product-' + id);
      }
    } catch (e) { /* ignore — some browsers block history in file:// */ }
  }

  function closeProductView(fromPopState) {
    if ($('productView').hidden) return;
    $('productView').hidden = true;
    currentProduct = null;

    /* If the cart drawer is open, keep body locked; otherwise unlock */
    if (!$('overlay').classList.contains('open')) {
      document.body.classList.remove('locked');
    }

    /* Strip the #product-X from URL without navigating back.
       This is the key fix: never use history.back() here. */
    if (!fromPopState && location.hash && location.hash.startsWith('#product-')) {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch (e) { /* ignore */ }
    }
  }

  function autoDescription(p) {
    return `${p.name} — available now at ${DB.settings.storeName}. ` +
           `${p.specs || ''}  Order today for delivery anywhere in Ghana, ` +
           `with a 2-year warranty and expert installation available.`;
  }

  $('pvDec').onclick = () => {
    if (pvQty > 1) { pvQty--; $('pvQty').textContent = pvQty; }
  };
  $('pvInc').onclick = () => {
    if (pvQty < 99) { pvQty++; $('pvQty').textContent = pvQty; }
  };

  $('pvAdd').onclick = () => {
    if (!currentProduct) return;
    const p = currentProduct;
    cart[p.id] = (cart[p.id] || 0) + pvQty;
    saveCart(); renderCart();
    toast(`✓ ${pvQty} × ${p.name} added to cart`);
    closeProductView(false);
    $('badge').style.transform = 'scale(1.4)';
    setTimeout(() => { $('badge').style.transform = ''; }, 250);
  };

  $('pvClose').onclick = () => closeProductView(false);
  $('productView').addEventListener('click', e => {
    if (e.target === $('productView')) closeProductView(false);
  });

  /* Back/forward support */
  window.addEventListener('popstate', () => {
    /* Case 1: popup is open → back button should close it */
    if (!$('productView').hidden) {
      closeProductView(true);
      return;
    }
    /* Case 2: popup is closed → forward button onto a product URL should open it */
    const h = location.hash.match(/^#product-(\d+)$/);
    if (h) {
      const id = Number(h[1]);
      if (DB.products.some(p => p.id === id)) openProductView(id, true);
    }
  });

  /* =========================================================
     CART
     ========================================================= */
  function loadCart() {
    try { cart = JSON.parse(localStorage.getItem(CONFIG.KEYS.CART)) || {}; }
    catch { cart = {}; }
  }
  function saveCart() {
    try { localStorage.setItem(CONFIG.KEYS.CART, JSON.stringify(cart)); } catch {}
  }
  function sanitizeCart() {
    let changed = false;
    Object.keys(cart).forEach(id => {
      if (!DB.products.some(p => p.id === Number(id))) { delete cart[id]; changed = true; }
    });
    if (changed) saveCart();
  }

  function addToCart(id, btn) {
    const p = DB.products.find(x => x.id === id);
    if (!p) return;
    cart[id] = (cart[id] || 0) + 1;
    saveCart(); renderCart();
    toast(`✓ ${p.name} added to cart`);
    if (btn) {
      btn.textContent = '✓ Added';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1100);
    }
  }

  function changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart(); renderCart();
  }
  function removeItem(id) { delete cart[id]; saveCart(); renderCart(); }

  const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = () => Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = DB.products.find(x => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  function renderCart() {
    const entries = Object.entries(cart);
    $('badge').textContent = cartCount();

    if (!entries.length) {
      $('items').innerHTML = `<div class="empty"><div>🛒</div><strong>Your cart is empty</strong><p>Add a few products to get started.</p></div>`;
    } else {
      $('items').innerHTML = entries.map(([id, qty]) => {
        const p = DB.products.find(x => x.id === Number(id));
        if (!p) return '';
        return `
          <div class="item">
            ${thumbHTML(p.thumb, 'item-thumb')}
            <div class="item-info">
              <h4>${esc(p.name)}</h4>
              <div class="p">${money(p.price)}</div>
              <div class="qty">
                <button data-act="dec" data-id="${p.id}" aria-label="Decrease">−</button>
                <span>${qty}</span>
                <button data-act="inc" data-id="${p.id}" aria-label="Increase">+</button>
              </div>
            </div>
            <button class="remove" data-act="del" data-id="${p.id}" title="Remove">&times;</button>
          </div>`;
      }).join('');

      $('items').querySelectorAll('button[data-act]').forEach(btn => {
        const id = Number(btn.dataset.id), act = btn.dataset.act;
        btn.onclick = () => {
          if (act === 'inc') changeQty(id, 1);
          if (act === 'dec') changeQty(id, -1);
          if (act === 'del') removeItem(id);
        };
      });
    }

    const total = cartTotal();
    $('subtotal').textContent = money(total);
    $('total').textContent = money(total);
    $('checkout').disabled = !entries.length;
  }

  function checkout() {
    const entries = Object.entries(cart);
    if (!entries.length) return;

    let msg = `*New Order — ${DB.settings.storeName}*\n\n`;
    entries.forEach(([id, qty], i) => {
      const p = DB.products.find(x => x.id === Number(id));
      if (!p) return;
      msg += `${i + 1}. ${p.name}\n   Qty: ${qty} × ${money(p.price)} = ${money(p.price * qty)}\n\n`;
    });
    msg += `*Total: ${money(cartTotal())}*\n\nPlease confirm availability and delivery. Thank you!`;

    const num = Security.sanitizePhone(DB.settings.whatsapp);
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  }

  const openCart  = () => { $('drawer').classList.add('open'); $('overlay').classList.add('open'); };
  const closeCart = () => { $('drawer').classList.remove('open'); $('overlay').classList.remove('open'); };

  /* =========================================================
     BOOT
     ========================================================= */
  DB = await Store.load();
  loadCart();
  sanitizeCart();

  applySettings();
  renderChips();
  renderGrid();
  renderCart();

  $('search').oninput   = e => { query = e.target.value.trim(); renderGrid(); };
  $('openCart').onclick = openCart;
  $('closeCart').onclick = closeCart;
  $('overlay').onclick  = closeCart;
  $('checkout').onclick = checkout;
  $('year').textContent = new Date().getFullYear();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!$('productView').hidden) closeProductView(false);
      else closeCart();
    }
  });

  /* If URL contains #product-N on load, open that product (from URL, not click) */
  const hash = location.hash.match(/^#product-(\d+)$/);
  if (hash) {
    const id = Number(hash[1]);
    if (DB.products.some(p => p.id === id)) {
      openProductView(id, true);
    } else {
      /* Product doesn't exist — clean the URL so it doesn't get stuck */
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  if (DB.__tampered) toast('⚠️ Stored data failed integrity check');
})();