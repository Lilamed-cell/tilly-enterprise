'use strict';

const CONFIG = Object.freeze({
  VERSION: '2.0.2',
  APP_NAME: 'TheTilly Enterprise',

  KEYS: {
    DATA:       'tilly_data_v2',
    INTEGRITY:  'tilly_integrity_v2',
    PW_HASH:    'tilly_pwhash_v2',
    PW_SALT:    'tilly_pwsalt_v2',
    SESSION:    'tilly_session_v2',
    RATELIMIT:  'tilly_ratelimit_v2',
    ACTIVITY:   'tilly_activity_v2',
    CART:       'tilly_cart_v2'
  },

  SECURITY: {
    PBKDF2_ITERATIONS:  310000,
    PBKDF2_HASH:        'SHA-256',
    SALT_BYTES:         16,
    SESSION_BYTES:      32,
    SESSION_TIMEOUT:    30 * 60 * 1000,
    SESSION_WARN:       2  * 60 * 1000,
    MAX_ATTEMPTS:       5,
    ATTEMPT_WINDOW:     15 * 60 * 1000,
    LOCKOUT_DURATION:   30 * 60 * 1000,
    MIN_PW_LENGTH:      10,
    INTEGRITY_SECRET:   'tilly-enterprise-v1-integrity'
  },

  LIMITS: {
    NAME:    120,
    CAT:     40,
    SPECS:   160,
    DESC:    1200,
    TAG:     20,
    URL:     500,
    TEXTAREA:300
  },

  IMAGE: {
    MAX_DIMENSION:  900,
    HERO_DIMENSION: 1600,
    JPEG_QUALITY:   0.78,
    HERO_QUALITY:   0.75,
    MAX_FILE_MB:    8
  },

  DEFAULTS: {
    settings: {
      storeName: 'TheTilly Enterprise',
      currency:  'GH₵',
      whatsapp:  '233241656484',
      footName:  'TheTilly Enterprise Ghana Ltd.',
      topbar:    '🚚 Free delivery in Kumasi on orders over GH₵ 20,000  •   ☎️ +233 24 165 6484 ☎️ +233 20 717 0077',
      heroTitle: 'TheTilly Enterprise: Power your home. Upgrade your life.',
      heroText:  'Genuine fridges, TVs, Phones, Washing Machines, Ovens and complete Solar Systems — with warranty, nationwide delivery and installation across Ghana.',
      heroBackground: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80'
    },
    products: [
      /* ============================================================
         REFRIGERATORS (1–10)
         ============================================================ */
      { id:1, name:'Samsung 2-Door Refrigerator 300L', cat:'Refrigerators', price:3200, old:6000, thumb:'https://i.postimg.cc/c4LbZFXQ/pic-fridge.png', specs:'Frost-free • Inverter • Silver • 300L', desc:'A spacious two-door refrigerator with Samsung\'s Digital Inverter Compressor that runs quieter and uses up to 50% less energy. Frost-free design means no manual defrosting ever.', tag:'Promotion' },
      { id:2, name:'LG Inverter Fridge 250L', cat:'Refrigerators', price:5400, old:null, thumb:'https://i.postimg.cc/43xMPZSH/43DSTV-43-Digital-Satellite-Television.jpg', specs:'Smart inverter • 10-year compressor warranty', desc:'LG\'s Smart Inverter technology adjusts cooling based on usage, saving energy during low-demand hours. Comes with a 10-year warranty on the compressor.', tag:'' },
      { id:3, name:'Hisense Chest Freezer 200L', cat:'Refrigerators', price:3950, old:4300, thumb:'https://picsum.photos/seed/fridge3/900/600', specs:'Fast freeze • Lock & key • 200L', desc:'Perfect for shops, restaurants and large families. Fast-freeze function locks in freshness, built-in lock keeps contents safe. Low power consumption.', tag:'' },
      { id:4, name:'Midea Single Door Fridge 150L', cat:'Refrigerators', price:2650, old:2900, thumb:'https://picsum.photos/seed/fridge4/900/600', specs:'Single door • 150L • Low energy', desc:'Compact single-door fridge ideal for single users, offices or small kitchens. Runs efficiently on inverter power and fits in any space.', tag:'' },
      { id:5, name:'Samsung Side-by-Side 500L', cat:'Refrigerators', price:15500, old:16900, thumb:'https://picsum.photos/seed/fridge5/900/600', specs:'Side-by-side • Ice maker • 500L', desc:'Premium side-by-side refrigerator with built-in ice and water dispenser. Twin Cooling Plus keeps food fresher for longer.', tag:'Premium' },
      { id:6, name:'LG Top Freezer 350L', cat:'Refrigerators', price:7300, old:null, thumb:'https://picsum.photos/seed/fridge6/900/600', specs:'Top freezer • 350L • Smart diagnosis', desc:'Reliable top-freezer fridge with LG\'s Smart Diagnosis feature that helps troubleshoot issues via your phone.', tag:'' },
      { id:7, name:'Hisense Double Door 220L', cat:'Refrigerators', price:4200, old:null, thumb:'https://picsum.photos/seed/fridge7/900/600', specs:'Double door • 220L • Frost free', desc:'Compact double-door refrigerator ideal for small families. Frost-free design means no ice buildup and no manual defrosting.', tag:'' },
      { id:8, name:'Scanfrost Chest Freezer 300L', cat:'Refrigerators', price:5100, old:5500, thumb:'https://picsum.photos/seed/fridge8/900/600', specs:'Chest freezer • 300L • Fast freeze', desc:'Large-capacity chest freezer perfect for shops and bulk storage. Runs quietly and efficiently on low power.', tag:'' },
      { id:9, name:'Bosch Serie 4 Fridge 320L', cat:'Refrigerators', price:8900, old:null, thumb:'https://picsum.photos/seed/fridge9/900/600', specs:'NoFrost • A++ energy • 320L', desc:'German-engineered Bosch fridge with NoFrost technology and A++ energy rating for maximum efficiency and zero manual defrosting.', tag:'' },
      { id:10, name:'Panasonic Inverter Fridge 400L', cat:'Refrigerators', price:9800, old:10500, thumb:'https://picsum.photos/seed/fridge10/900/600', specs:'Inverter • 400L • Anti-bacterial', desc:'Panasonic\'s Inverter fridge with an anti-bacterial liner that keeps food fresh and safe for longer. Perfect for large families.', tag:'' }
    ]
  }
});