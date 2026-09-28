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
         REFRIGERATORS (1–20)
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
      { id:10, name:'Panasonic Inverter Fridge 400L', cat:'Refrigerators', price:9800, old:10500, thumb:'https://picsum.photos/seed/fridge10/900/600', specs:'Inverter • 400L • Anti-bacterial', desc:'Panasonic\'s Inverter fridge with an anti-bacterial liner that keeps food fresh and safe for longer. Perfect for large families.', tag:'' },
      { id:11, name:'Haier Thermocool Fridge 180L', cat:'Refrigerators', price:3100, old:null, thumb:'https://picsum.photos/seed/fridge11/900/600', specs:'180L • Low voltage • Genuine lock', desc:'Built to handle Ghanaian power fluctuations. Runs well on low voltage and comes with a genuine lock for security.', tag:'' },
      { id:12, name:'Samsung French Door 550L', cat:'Refrigerators', price:18900, old:null, thumb:'https://picsum.photos/seed/fridge12/900/600', specs:'French door • 550L • Dual ice maker', desc:'Luxury French-door refrigerator with dual ice maker, Twin Cooling, and a flexible zone for customized cooling.', tag:'Luxury' },
      { id:13, name:'LG Door-in-Door 600L', cat:'Refrigerators', price:22500, old:24000, thumb:'https://picsum.photos/seed/fridge13/900/600', specs:'Door-in-Door • 600L • InstaView', desc:'Premium Door-in-Door design lets you grab favorites without opening the main door. InstaView panel lights up with a knock.', tag:'Premium' },
      { id:14, name:'Hisense Side-by-Side 450L', cat:'Refrigerators', price:12500, old:null, thumb:'https://picsum.photos/seed/fridge14/900/600', specs:'Side-by-side • 450L • Water dispenser', desc:'Spacious side-by-side with water dispenser and multi-air-flow cooling for even temperature throughout.', tag:'' },
      { id:15, name:'Midea Chest Freezer 400L', cat:'Refrigerators', price:6400, old:6900, thumb:'https://picsum.photos/seed/fridge15/900/600', specs:'Chest freezer • 400L • 2 baskets', desc:'Extra-large chest freezer with two removable baskets for easy organization. Ideal for shops and restaurants.', tag:'' },
      { id:16, name:'Sharp 2-Door Fridge 250L', cat:'Refrigerators', price:4900, old:null, thumb:'https://picsum.photos/seed/fridge16/900/600', specs:'2-door • 250L • Plasma cluster', desc:'Sharp\'s Plasma Cluster technology deodorizes and preserves food freshness. Reliable workhorse for any home.', tag:'' },
      { id:17, name:'LG Mini Bar Fridge 90L', cat:'Refrigerators', price:1650, old:null, thumb:'https://picsum.photos/seed/fridge17/900/600', specs:'Mini bar • 90L • Compact', desc:'Small but efficient mini fridge — perfect for offices, hotel rooms, or dorm rooms.', tag:'' },
      { id:18, name:'Samsung Bottom Freezer 380L', cat:'Refrigerators', price:8500, old:null, thumb:'https://picsum.photos/seed/fridge18/900/600', specs:'Bottom freezer • 380L • Digital inverter', desc:'Ergonomic bottom-freezer design puts your fresh food at eye level. Digital Inverter compressor runs quiet and efficient.', tag:'' },
      { id:19, name:'Hisense Chest Freezer 500L', cat:'Refrigerators', price:7800, old:8500, thumb:'https://picsum.photos/seed/fridge19/900/600', specs:'Chest freezer • 500L • Commercial grade', desc:'Commercial-grade chest freezer for heavy-duty use. Keeps food frozen for up to 48 hours during power outages.', tag:'' },
      { id:20, name:'Bosch Built-in Fridge 290L', cat:'Refrigerators', price:11200, old:null, thumb:'https://picsum.photos/seed/fridge20/900/600', specs:'Built-in • 290L • NoFrost', desc:'Built-in refrigerator that fits seamlessly into your kitchen cabinets. NoFrost and VitaFresh keep food fresh.', tag:'Premium' },

      /* ============================================================
         PHONES (21–45)
         ============================================================ */
      { id:21, name:'iPhone 15 Pro 256GB', cat:'Phones', price:14500, old:null, thumb:'https://picsum.photos/seed/phone21/900/600', specs:'A17 Pro • Titanium • Unlocked • 256GB', desc:'Apple\'s flagship with titanium frame, A17 Pro chip, and pro-grade camera system with 5x optical zoom. Factory unlocked.', tag:'New' },
      { id:22, name:'iPhone 15 128GB', cat:'Phones', price:10500, old:11500, thumb:'https://picsum.photos/seed/phone22/900/600', specs:'A16 Bionic • 128GB • USB-C', desc:'The standard iPhone 15 with Dynamic Island, USB-C, and a 48MP main camera. Perfect balance of features and price.', tag:'' },
      { id:23, name:'iPhone 14 Pro Max 256GB', cat:'Phones', price:11800, old:12900, thumb:'https://picsum.photos/seed/phone23/900/600', specs:'A16 • ProMotion • 256GB', desc:'Large 6.7-inch Pro Max with ProMotion display and always-on screen. Still a powerhouse in 2024.', tag:'' },
      { id:24, name:'iPhone 13 128GB', cat:'Phones', price:7200, old:null, thumb:'https://picsum.photos/seed/phone24/900/600', specs:'A15 Bionic • 128GB • Dual camera', desc:'Still one of the best value iPhones. A15 chip, great battery, and premium build quality at a mid-range price.', tag:'' },
      { id:25, name:'Samsung Galaxy S24 Ultra', cat:'Phones', price:16900, old:null, thumb:'https://picsum.photos/seed/phone25/900/600', specs:'Snapdragon 8 Gen 3 • S-Pen • 256GB', desc:'Samsung\'s ultimate flagship with built-in S-Pen, 200MP camera, and Galaxy AI features. Titanium frame.', tag:'New' },
      { id:26, name:'Samsung Galaxy S24+', cat:'Phones', price:12500, old:13500, thumb:'https://picsum.photos/seed/phone26/900/600', specs:'Snapdragon 8 Gen 3 • 256GB • AMOLED', desc:'Bigger screen, longer battery, and full Galaxy AI suite. A great alternative to the Ultra.', tag:'' },
      { id:27, name:'Samsung Galaxy A55 5G', cat:'Phones', price:4200, old:4650, thumb:'https://picsum.photos/seed/phone27/900/600', specs:'8GB RAM • 256GB • Dual SIM • 5G', desc:'Premium mid-range phone with Super AMOLED display, 50MP OIS camera, and long battery life. Supports 5G on MTN and Vodafone.', tag:'' },
      { id:28, name:'Samsung Galaxy A35 5G', cat:'Phones', price:3200, old:null, thumb:'https://picsum.photos/seed/phone28/900/600', specs:'6GB RAM • 128GB • 5G', desc:'More affordable sibling to the A55 with most of the same great features. Great for everyday use.', tag:'' },
      { id:29, name:'Samsung Galaxy A25', cat:'Phones', price:2400, old:2650, thumb:'https://picsum.photos/seed/phone29/900/600', specs:'6GB RAM • 128GB • Super AMOLED', desc:'Budget-friendly Samsung with a Super AMOLED screen and reliable performance for daily tasks.', tag:'' },
      { id:30, name:'Samsung Galaxy Z Flip 5', cat:'Phones', price:13500, old:null, thumb:'https://picsum.photos/seed/phone30/900/600', specs:'Foldable • 256GB • Snapdragon 8 Gen 2', desc:'Compact foldable phone with a large cover screen and flagship performance. Folds into a pocketable square.', tag:'Foldable' },
      { id:31, name:'Samsung Galaxy Z Fold 5', cat:'Phones', price:21500, old:23000, thumb:'https://picsum.photos/seed/phone31/900/600', specs:'Foldable • 256GB • S-Pen ready', desc:'Opens into a tablet-sized screen. Perfect for multitasking, work, and entertainment on the go.', tag:'Foldable' },
      { id:32, name:'Tecno Spark 20 Pro', cat:'Phones', price:1450, old:null, thumb:'https://picsum.photos/seed/phone32/900/600', specs:'108MP camera • 5000mAh • 256GB', desc:'Best-value budget phone on the market. 108MP main camera captures incredible detail. 5000mAh battery lasts 2 days.', tag:'Budget Pick' },
      { id:33, name:'Tecno Camon 20 Pro', cat:'Phones', price:2200, old:2450, thumb:'https://picsum.photos/seed/phone33/900/600', specs:'64MP RGBW • 256GB • 5000mAh', desc:'Tecno\'s camera-focused line with RGBW sensor for better low-light photos. Great for photography on a budget.', tag:'' },
      { id:34, name:'Tecno Phantom V Fold', cat:'Phones', price:8900, old:null, thumb:'https://picsum.photos/seed/phone34/900/600', specs:'Foldable • 256GB • Dimensity 9000+', desc:'Affordable foldable from Tecno. Features a large inner display and premium build at a fraction of Samsung prices.', tag:'Foldable' },
      { id:35, name:'Infinix Note 30 Pro', cat:'Phones', price:1950, old:2150, thumb:'https://picsum.photos/seed/phone35/900/600', specs:'108MP • 256GB • 68W fast charge', desc:'Fast charging (68W), 108MP camera, and a big AMOLED display. Excellent value for the price.', tag:'' },
      { id:36, name:'Infinix Zero 30 5G', cat:'Phones', price:3100, old:null, thumb:'https://picsum.photos/seed/phone36/900/600', specs:'5G • 108MP • 12GB RAM', desc:'Premium mid-ranger from Infinix with 5G support, 108MP camera, and 12GB RAM for smooth multitasking.', tag:'' },
      { id:37, name:'Infinix Hot 40i', cat:'Phones', price:950, old:null, thumb:'https://picsum.photos/seed/phone37/900/600', specs:'5000mAh • 128GB • 50MP', desc:'Entry-level phone with all the basics done well. Great for students or as a backup phone.', tag:'Budget' },
      { id:38, name:'Xiaomi Redmi Note 13 Pro', cat:'Phones', price:2950, old:null, thumb:'https://picsum.photos/seed/phone38/900/600', specs:'200MP • AMOLED • 67W charge', desc:'Xiaomi\'s 200MP camera phone with a stunning AMOLED display and 67W turbo charging.', tag:'' },
      { id:39, name:'Xiaomi Redmi 13C', cat:'Phones', price:1150, old:1300, thumb:'https://picsum.photos/seed/phone39/900/600', specs:'50MP • 5000mAh • 128GB', desc:'Entry-level Xiaomi with a big battery and clean MIUI software. Great value.', tag:'' },
      { id:40, name:'Xiaomi Poco X6 Pro', cat:'Phones', price:3400, old:null, thumb:'https://picsum.photos/seed/phone40/900/600', specs:'Dimensity 8300 • 5G • 120Hz', desc:'Gaming-focused phone with flagship-level performance at a mid-range price. Runs any game smoothly.', tag:'' },
      { id:41, name:'Oppo Reno 11 5G', cat:'Phones', price:4500, old:4800, thumb:'https://picsum.photos/seed/phone41/900/600', specs:'5G • 50MP telephoto • 67W', desc:'Oppo\'s camera-focused Reno series with telephoto lens and fast charging. Beautiful design.', tag:'' },
      { id:42, name:'Oppo A78 5G', cat:'Phones', price:1950, old:null, thumb:'https://picsum.photos/seed/phone42/900/600', specs:'5G • 5000mAh • 67W charge', desc:'Affordable 5G phone with 67W fast charging. Great budget option for the 5G era.', tag:'' },
      { id:43, name:'Vivo Y36 5G', cat:'Phones', price:2300, old:2500, thumb:'https://picsum.photos/seed/phone43/900/600', specs:'5G • 8GB RAM • 256GB', desc:'Vivo\'s mid-range 5G phone with a sleek design and reliable performance for everyday use.', tag:'' },
      { id:44, name:'Nokia G42 5G', cat:'Phones', price:1800, old:null, thumb:'https://picsum.photos/seed/phone44/900/600', specs:'5G • Repairable • 50MP', desc:'Nokia\'s repairable 5G phone. Built to last, easy to fix, and runs clean Android.', tag:'' },
      { id:45, name:'Google Pixel 8 Pro', cat:'Phones', price:12500, old:13500, thumb:'https://picsum.photos/seed/phone45/900/600', specs:'Tensor G3 • 50MP • 7 years updates', desc:'Google\'s flagship with the best computational photography in the business, plus 7 years of updates.', tag:'Premium' },

      /* ============================================================
         AUDIO (46–65)
         ============================================================ */
      { id:46, name:'JBL PartyBox 310', cat:'Audio', price:3850, old:null, thumb:'https://picsum.photos/seed/audio46/900/600', specs:'240W • Bluetooth • Karaoke ready', desc:'A true party in a box. 240W of JBL Pro Sound, wheels, karaoke inputs, and 18-hour battery.', tag:'Hot' },
      { id:47, name:'JBL PartyBox 710', cat:'Audio', price:6900, old:7400, thumb:'https://picsum.photos/seed/audio47/900/600', specs:'800W • Wheels • Light show', desc:'Massive 800W party speaker with built-in light show. Perfect for weddings and large events.', tag:'' },
      { id:48, name:'JBL Flip 6', cat:'Audio', price:950, old:null, thumb:'https://picsum.photos/seed/audio48/900/600', specs:'Portable • IP67 • 12h battery', desc:'Small but mighty portable Bluetooth speaker. Waterproof and dustproof for any adventure.', tag:'' },
      { id:49, name:'JBL Charge 5', cat:'Audio', price:1350, old:1450, thumb:'https://picsum.photos/seed/audio49/900/600', specs:'20h battery • Powerbank • IP67', desc:'Portable speaker that doubles as a power bank. 20-hour battery for all-day music.', tag:'' },
      { id:50, name:'JBL Go 3', cat:'Audio', price:350, old:null, thumb:'https://picsum.photos/seed/audio50/900/600', specs:'Portable • IP67 • 5h battery', desc:'Ultra-portable pocket speaker. Clip it to your bag and take music everywhere.', tag:'Budget' },
      { id:51, name:'Anker Soundcore Motion Boom', cat:'Audio', price:650, old:790, thumb:'https://picsum.photos/seed/audio51/900/600', specs:'IPX7 waterproof • 24h playtime', desc:'Rugged waterproof Bluetooth speaker with BassUp technology. 24-hour playtime.', tag:'' },
      { id:52, name:'Anker Soundcore 3', cat:'Audio', price:420, old:null, thumb:'https://picsum.photos/seed/audio52/900/600', specs:'IPX7 • 24h • BassUp', desc:'Compact, waterproof, and loud. The perfect travel speaker from Anker.', tag:'' },
      { id:53, name:'Sony WH-1000XM5', cat:'Audio', price:3200, old:3600, thumb:'https://picsum.photos/seed/audio53/900/600', specs:'Noise cancelling • 30h battery • Bluetooth', desc:'The best noise-cancelling headphones money can buy. Perfect for flights and noisy offices.', tag:'Premium' },
      { id:54, name:'Sony WF-1000XM5', cat:'Audio', price:2400, old:null, thumb:'https://picsum.photos/seed/audio54/900/600', specs:'True wireless • ANC • 8h + 16h case', desc:'Premium wireless earbuds with best-in-class noise cancellation.', tag:'' },
      { id:55, name:'Sony 5.1 Home Theatre System', cat:'Audio', price:2950, old:null, thumb:'https://picsum.photos/seed/audio55/900/600', specs:'1000W • Bluetooth • HDMI ARC', desc:'Cinema-quality sound at home. 1000W surround sound with powerful subwoofer.', tag:'' },
      { id:56, name:'Samsung HW-Q600C Soundbar', cat:'Audio', price:3400, old:null, thumb:'https://picsum.photos/seed/audio56/900/600', specs:'3.1.2ch • Dolby Atmos • Wireless sub', desc:'Dolby Atmos soundbar with wireless subwoofer. Turns any TV into a cinema.', tag:'' },
      { id:57, name:'LG S65Q Soundbar', cat:'Audio', price:2600, old:2900, thumb:'https://picsum.photos/seed/audio57/900/600', specs:'3.1ch • 420W • Bluetooth', desc:'Powerful soundbar with 420W output and Meridian audio technology.', tag:'' },
      { id:58, name:'Bose SoundLink Flex', cat:'Audio', price:1150, old:null, thumb:'https://picsum.photos/seed/audio58/900/600', specs:'IP67 • 12h • PositionIQ', desc:'Bose\'s premium portable speaker with PositionIQ technology that auto-adjusts sound.', tag:'' },
      { id:59, name:'Marshall Emberton II', cat:'Audio', price:1050, old:null, thumb:'https://picsum.photos/seed/audio59/900/600', specs:'IP67 • 30h • Classic design', desc:'Iconic Marshall design with modern sound. 30-hour battery and rugged build.', tag:'' },
      { id:60, name:'Tribit StormBox Blast', cat:'Audio', price:850, old:950, thumb:'https://picsum.photos/seed/audio60/900/600', specs:'90W • 30h • IPX7 • Light show', desc:'Massive 90W portable speaker with LED light show. Party-ready anywhere.', tag:'' },
      { id:61, name:'Ampsonic 5.1 Home Cinema', cat:'Audio', price:1850, old:null, thumb:'https://picsum.photos/seed/audio61/900/600', specs:'5.1 channel • USB • Bluetooth', desc:'Affordable home cinema system with rich sound. Great value for movie lovers.', tag:'' },
      { id:62, name:'Nakamichi Shockwafe 7.1', cat:'Audio', price:5200, old:null, thumb:'https://picsum.photos/seed/audio62/900/600', specs:'7.1ch • Dolby Atmos • Wireless sub', desc:'High-end home theatre soundbar system with dual subwoofers for deep bass.', tag:'Premium' },
      { id:63, name:'Beats Studio Pro', cat:'Audio', price:2800, old:null, thumb:'https://picsum.photos/seed/audio63/900/600', specs:'ANC • 40h • Spatial audio', desc:'Beats\' flagship over-ear headphones with spatial audio and 40-hour battery.', tag:'' },
      { id:64, name:'AirPods Pro 2 (USB-C)', cat:'Audio', price:2400, old:2650, thumb:'https://picsum.photos/seed/audio64/900/600', specs:'ANC • USB-C • Adaptive audio', desc:'Apple\'s premium wireless earbuds with adaptive transparency and USB-C charging.', tag:'' },
      { id:65, name:'Soundcore Anker Life Q30', cat:'Audio', price:620, old:null, thumb:'https://picsum.photos/seed/audio65/900/600', specs:'ANC • 40h • Hi-Res', desc:'Budget-friendly ANC headphones with 40-hour battery and Hi-Res audio support.', tag:'Budget' },

      /* ============================================================
         TELEVISIONS (66–90)
         ============================================================ */
      { id:66, name:'LG 55" 4K Smart TV', cat:'Televisions', price:6200, old:6990, thumb:'https://picsum.photos/seed/tv66/900/600', specs:'4K UHD • webOS • Magic Remote • HDR10', desc:'Brilliant 4K picture with LG\'s webOS smart platform — Netflix, YouTube, DSTV Now. Magic Remote included.', tag:'Best Seller' },
      { id:67, name:'LG 65" OLED evo C3', cat:'Televisions', price:15900, old:17500, thumb:'https://picsum.photos/seed/tv67/900/600', specs:'OLED • 4K • 120Hz • Dolby Vision', desc:'LG\'s award-winning OLED TV with perfect blacks, infinite contrast, and 120Hz gaming support.', tag:'Premium' },
      { id:68, name:'LG 43" Smart TV', cat:'Televisions', price:3400, old:null, thumb:'https://picsum.photos/seed/tv68/900/600', specs:'4K • webOS • ThinQ AI', desc:'Compact 43-inch 4K smart TV. Perfect for bedrooms and small living rooms.', tag:'' },
      { id:69, name:'Samsung 55" Crystal UHD', cat:'Televisions', price:5800, old:6400, thumb:'https://picsum.photos/seed/tv69/900/600', specs:'4K • Tizen • Crystal Processor', desc:'Samsung\'s Crystal UHD with a powerful processor for stunning 4K detail. Tizen smart platform.', tag:'' },
      { id:70, name:'Samsung 65" QLED Q70C', cat:'Televisions', price:12900, old:null, thumb:'https://picsum.photos/seed/tv70/900/600', specs:'QLED • 4K • 120Hz • Quantum HDR', desc:'QLED technology with Quantum HDR delivers brilliant colors and deep contrast. 120Hz for smooth gaming.', tag:'Premium' },
      { id:71, name:'Samsung 75" Neo QLED', cat:'Televisions', price:24500, old:26900, thumb:'https://picsum.photos/seed/tv71/900/600', specs:'Neo QLED • 4K • Mini-LED', desc:'Massive 75-inch Neo QLED with Mini-LED backlight for incredible brightness and contrast.', tag:'Luxury' },
      { id:72, name:'Samsung 43" The Frame', cat:'Televisions', price:7200, old:null, thumb:'https://picsum.photos/seed/tv72/900/600', specs:'QLED • Art mode • 4K', desc:'Turns into a work of art when off. Includes customizable magnetic frame.', tag:'' },
      { id:73, name:'Hisense 43" Smart TV', cat:'Televisions', price:2850, old:null, thumb:'https://picsum.photos/seed/tv73/900/600', specs:'Full HD • VIDAA OS • Netflix', desc:'Reliable 43-inch smart TV. VIDAA OS is fast and simple — Netflix, YouTube, DSTV Now.', tag:'' },
      { id:74, name:'Hisense 55" U6K Mini-LED', cat:'Televisions', price:6500, old:7200, thumb:'https://picsum.photos/seed/tv74/900/600', specs:'Mini-LED • 4K • 120Hz • Dolby Vision', desc:'Hisense\'s Mini-LED TV with 120Hz refresh rate. Excellent picture at a great price.', tag:'' },
      { id:75, name:'Hisense 65" U8K ULED', cat:'Televisions', price:11500, old:null, thumb:'https://picsum.photos/seed/tv75/900/600', specs:'ULED • 4K • 144Hz • Dolby Atmos', desc:'High-end Hisense with 144Hz refresh rate for gamers. Dolby Vision IQ and Atmos support.', tag:'' },
      { id:76, name:'Hisense 32" Smart TV', cat:'Televisions', price:1650, old:null, thumb:'https://picsum.photos/seed/tv76/900/600', specs:'HD • VIDAA • WiFi', desc:'Affordable 32-inch smart TV. Perfect for kitchens, bedrooms, or small spaces.', tag:'Budget' },
      { id:77, name:'TCL 50" QLED 4K', cat:'Televisions', price:4200, old:null, thumb:'https://picsum.photos/seed/tv77/900/600', specs:'QLED • 4K • Google TV', desc:'TCL\'s QLED TV with Google TV built in. Wide color gamut and Dolby Vision.', tag:'' },
      { id:78, name:'TCL 65" QM8 Mini-LED', cat:'Televisions', price:9800, old:10500, thumb:'https://picsum.photos/seed/tv78/900/600', specs:'Mini-LED • 4K • 120Hz • Dolby Atmos', desc:'TCL\'s flagship Mini-LED TV with incredible brightness. Great for bright rooms.', tag:'' },
      { id:79, name:'TCL 55" 4K Google TV', cat:'Televisions', price:3900, old:null, thumb:'https://picsum.photos/seed/tv79/900/600', specs:'4K • Google TV • HDR10', desc:'Affordable 55-inch 4K TV with Google TV smart platform and voice control.', tag:'' },
      { id:80, name:'Sony Bravia XR A80L OLED', cat:'Televisions', price:18500, old:null, thumb:'https://picsum.photos/seed/tv80/900/600', specs:'OLED • 4K • Cognitive Processor XR', desc:'Sony\'s OLED with Cognitive Processor XR for the most realistic picture possible.', tag:'Premium' },
      { id:81, name:'Sony 55" Bravia X90L', cat:'Televisions', price:9500, old:null, thumb:'https://picsum.photos/seed/tv81/900/600', specs:'Full Array LED • 4K • 120Hz', desc:'Sony\'s Full Array LED TV with excellent contrast and PS5-ready gaming features.', tag:'' },
      { id:82, name:'Panasonic 43" 4K Smart', cat:'Televisions', price:3700, old:null, thumb:'https://picsum.photos/seed/tv82/900/600', specs:'4K • HDR10+ • Firefox OS', desc:'Panasonic\'s 43-inch 4K TV with HDR10+ and a reliable smart platform.', tag:'' },
      { id:83, name:'Panasonic 55" OLED', cat:'Televisions', price:11200, old:12500, thumb:'https://picsum.photos/seed/tv83/900/600', specs:'OLED • 4K • Hollywood-tuned', desc:'Panasonic\'s OLED TV tuned by Hollywood colorists for cinematic accuracy.', tag:'' },
      { id:84, name:'Skyworth 43" Smart TV', cat:'Televisions', price:2450, old:null, thumb:'https://picsum.photos/seed/tv84/900/600', specs:'Full HD • Android TV • Chromecast', desc:'Affordable Android TV with Chromecast built in. Great value smart TV.', tag:'' },
      { id:85, name:'Skyworth 55" 4K UHD', cat:'Televisions', price:4100, old:null, thumb:'https://picsum.photos/seed/tv85/900/600', specs:'4K • Android TV • Dolby Audio', desc:'Skyworth\'s 55-inch 4K TV with Android TV and Dolby Audio. Excellent value.', tag:'' },
      { id:86, name:'Nasco 32" Digital TV', cat:'Televisions', price:1250, old:null, thumb:'https://picsum.photos/seed/tv86/900/600', specs:'HD • Digital tuner • USB', desc:'Entry-level 32-inch TV with digital tuner. Ideal for basic viewing.', tag:'Budget' },
      { id:87, name:'Nasco 43" Smart LED', cat:'Televisions', price:2200, old:null, thumb:'https://picsum.photos/seed/tv87/900/600', specs:'Full HD • Smart • WiFi', desc:'Affordable smart TV from Nasco with all the essentials.', tag:'' },
      { id:88, name:'LG 86" 4K UHD Commercial', cat:'Televisions', price:34500, old:null, thumb:'https://picsum.photos/seed/tv88/900/600', specs:'86" • 4K • Commercial display', desc:'Massive 86-inch commercial display. Perfect for lobbies, boardrooms, and stores.', tag:'Luxury' },
      { id:89, name:'Samsung 98" QLED 4K', cat:'Televisions', price:58900, old:null, thumb:'https://picsum.photos/seed/tv89/900/600', specs:'98" • QLED • 4K', desc:'The ultimate home cinema. 98 inches of QLED brilliance.', tag:'Luxury' },
      { id:90, name:'Vizio 50" 4K SmartCast', cat:'Televisions', price:3600, old:null, thumb:'https://picsum.photos/seed/tv90/900/600', specs:'4K • SmartCast • Dolby Vision', desc:'Vizio\'s 50-inch 4K TV with SmartCast platform and Dolby Vision HDR.', tag:'' },

      /* ============================================================
         KITCHEN (91–110)
         ============================================================ */
      { id:91, name:'Bosch 4-Burner Gas Oven & Cooker', cat:'Kitchen', price:4100, old:null, thumb:'https://picsum.photos/seed/kitchen91/900/600', specs:'4-burner • Auto-ignition • Grill', desc:'A complete kitchen workhorse from Bosch — 4 gas burners, full-size oven with grill. Stainless steel finish.', tag:'' },
      { id:92, name:'Scanfrost 4-Burner Gas Cooker', cat:'Kitchen', price:2450, old:2700, thumb:'https://picsum.photos/seed/kitchen92/900/600', specs:'4-burner • Oven • Grill', desc:'Reliable Scanfrost gas cooker with oven and grill. Great value for Ghanaian homes.', tag:'' },
      { id:93, name:'LG 5-Burner Gas Cooker', cat:'Kitchen', price:5600, old:null, thumb:'https://picsum.photos/seed/kitchen93/900/600', specs:'5-burner • Convection oven • Timer', desc:'Premium LG gas cooker with 5 burners and convection oven. Professional cooking at home.', tag:'Premium' },
      { id:94, name:'Samsung Microwave Oven 32L', cat:'Kitchen', price:1850, old:null, thumb:'https://picsum.photos/seed/kitchen94/900/600', specs:'32L • Grill • Ceramic enamel', desc:'Large-capacity microwave with grill function. Ceramic enamel interior is easy to clean.', tag:'' },
      { id:95, name:'LG Microwave Oven 25L', cat:'Kitchen', price:1350, old:null, thumb:'https://picsum.photos/seed/kitchen95/900/600', specs:'25L • Solo • Auto-cook', desc:'Compact microwave with auto-cook presets. Perfect for reheating and quick meals.', tag:'' },
      { id:96, name:'Panasonic Inverter Microwave 27L', cat:'Kitchen', price:2200, old:null, thumb:'https://picsum.photos/seed/kitchen96/900/600', specs:'27L • Inverter • Genius sensor', desc:'Panasonic\'s inverter microwave cooks food evenly without hot spots. Genius sensor auto-adjusts cooking time.', tag:'' },
      { id:97, name:'Philips Air Fryer XXL', cat:'Kitchen', price:1450, old:1650, thumb:'https://picsum.photos/seed/kitchen97/900/600', specs:'7.3L • Rapid Air • 90% less oil', desc:'Philips\' extra-large air fryer. Cook crispy food with up to 90% less oil.', tag:'Hot' },
      { id:98, name:'Ninja Foodi Air Fryer', cat:'Kitchen', price:1850, old:null, thumb:'https://picsum.photos/seed/kitchen98/900/600', specs:'8-in-1 • 7.6L • Dual zone', desc:'Ninja\'s 8-in-1 air fryer does it all — air fry, roast, bake, dehydrate, and more.', tag:'' },
      { id:99, name:'Cosori Air Fryer 5.8L', cat:'Kitchen', price:980, old:null, thumb:'https://picsum.photos/seed/kitchen99/900/600', specs:'5.8L • 12 presets • Non-stick', desc:'Best-selling air fryer with 12 cooking presets. Easy to use and clean.', tag:'' },
      { id:100, name:'Nespresso Vertuo Next', cat:'Kitchen', price:1950, old:null, thumb:'https://picsum.photos/seed/kitchen100/900/600', specs:'Espresso • Coffee • Milk frother', desc:'Nespresso\'s Vertuo system for barista-quality coffee at home. Includes milk frother.', tag:'' },
      { id:101, name:'De\'Longhi Magnifica Espresso', cat:'Kitchen', price:4900, old:null, thumb:'https://picsum.photos/seed/kitchen101/900/600', specs:'Bean-to-cup • Milk frother • Auto-clean', desc:'De\'Longhi\'s bean-to-cup espresso machine. Grinds fresh beans for every cup.', tag:'Premium' },
      { id:102, name:'Kenwood Food Processor', cat:'Kitchen', price:1650, old:null, thumb:'https://picsum.photos/seed/kitchen102/900/600', specs:'1000W • Multi-function • 3L bowl', desc:'Multi-function food processor with blender, dough hook, and slicer attachments.', tag:'' },
      { id:103, name:'Philips Blender 600W', cat:'Kitchen', price:620, old:null, thumb:'https://picsum.photos/seed/kitchen103/900/600', specs:'600W • Glass jar • Ice crush', desc:'Reliable 600W blender with glass jar. Crushes ice and blends smoothies perfectly.', tag:'' },
      { id:104, name:'Ninja Professional Blender', cat:'Kitchen', price:1150, old:null, thumb:'https://picsum.photos/seed/kitchen104/900/600', specs:'1000W • 72oz • Total Crushing', desc:'Ninja\'s powerful 1000W blender with Total Crushing blades. Crushes ice in seconds.', tag:'' },
      { id:105, name:'Binatone Electric Kettle 1.7L', cat:'Kitchen', price:280, old:null, thumb:'https://picsum.photos/seed/kitchen105/900/600', specs:'1.7L • Auto shut-off • Cordless', desc:'Fast-boiling electric kettle with auto shut-off. Perfect for tea and instant noodles.', tag:'' },
      { id:106, name:'Philips Toaster 2-Slice', cat:'Kitchen', price:380, old:null, thumb:'https://picsum.photos/seed/kitchen106/900/600', specs:'2-slice • 8 settings • Cancel function', desc:'Compact 2-slice toaster with 8 browning settings. Perfect golden toast every time.', tag:'' },
      { id:107, name:'Kenwood 4-Slice Toaster', cat:'Kitchen', price:620, old:null, thumb:'https://picsum.photos/seed/kitchen107/900/600', specs:'4-slice • Wide slots • Variable browning', desc:'Extra-wide slots fit bagels and artisan bread. 4 slices at once for busy mornings.', tag:'' },
      { id:108, name:'Cosori Electric Pressure Cooker', cat:'Kitchen', price:1350, old:null, thumb:'https://picsum.photos/seed/kitchen108/900/600', specs:'6L • 13-in-1 • Instant Pot style', desc:'Versatile pressure cooker with 13 cooking functions. From soup to cheesecake.', tag:'' },
      { id:109, name:'Ninja Foodi Grill', cat:'Kitchen', price:2100, old:null, thumb:'https://picsum.photos/seed/kitchen109/900/600', specs:'Indoor grill • Air fry • 6-in-1', desc:'Indoor grill that sears like an outdoor grill. No smoke, no fuss.', tag:'' },
      { id:110, name:'NutriBullet Pro 900W', cat:'Kitchen', price:750, old:null, thumb:'https://picsum.photos/seed/kitchen110/900/600', specs:'900W • Personal blender • BPA-free', desc:'Compact personal blender perfect for smoothies and protein shakes.', tag:'' },

      /* ============================================================
         LAUNDRY (111–130)
         ============================================================ */
      { id:111, name:'LG Front Load Washing Machine 8kg', cat:'Laundry', price:5200, old:5750, thumb:'https://picsum.photos/seed/laundry111/900/600', specs:'8kg • Inverter Direct Drive', desc:'LG\'s 6 Motion technology washes clothes in six ways to gently remove every stain. 10-year motor warranty.', tag:'Sale' },
      { id:112, name:'LG Top Load Washer 10kg', cat:'Laundry', price:4600, old:null, thumb:'https://picsum.photos/seed/laundry112/900/600', specs:'10kg • Smart Inverter • TurboDrum', desc:'Large top-load washer with TurboDrum technology for powerful washing.', tag:'' },
      { id:113, name:'Samsung Front Load 9kg EcoBubble', cat:'Laundry', price:5900, old:null, thumb:'https://picsum.photos/seed/laundry113/900/600', specs:'9kg • EcoBubble • Digital Inverter', desc:'Samsung\'s EcoBubble technology dissolves detergent faster for effective cleaning at low temperatures.', tag:'' },
      { id:114, name:'Samsung Top Load 8kg', cat:'Laundry', price:3850, old:null, thumb:'https://picsum.photos/seed/laundry114/900/600', specs:'8kg • Diamond Drum • Eco Tub', desc:'Reliable top-load washer with Samsung\'s Diamond Drum that protects fabrics.', tag:'' },
      { id:115, name:'Scanfrost Top Load Washer 7kg', cat:'Laundry', price:2350, old:null, thumb:'https://picsum.photos/seed/laundry115/900/600', specs:'7kg • Twin tub • Energy efficient', desc:'Practical twin-tub washer perfect for Ghanaian homes. Works well on low voltage.', tag:'' },
      { id:116, name:'Hisense Front Load 8kg', cat:'Laundry', price:4300, old:4700, thumb:'https://picsum.photos/seed/laundry116/900/600', specs:'8kg • Inverter • 15 programs', desc:'Hisense\'s efficient front-load washer with 15 wash programs for any fabric.', tag:'' },
      { id:117, name:'LG Washer Dryer Combo 10.5kg', cat:'Laundry', price:8900, old:null, thumb:'https://picsum.photos/seed/laundry117/900/600', specs:'Washer + dryer • 10.5kg • AI DD', desc:'Two appliances in one. Washes and dries in a single cycle with AI Direct Drive.', tag:'Premium' },
      { id:118, name:'Bosch Serie 6 Washer 9kg', cat:'Laundry', price:6800, old:null, thumb:'https://picsum.photos/seed/laundry118/900/600', specs:'9kg • EcoSilence • A+++ energy', desc:'Bosch\'s quietest, most efficient washing machine. EcoSilence Drive motor.', tag:'' },
      { id:119, name:'Samsung Washer 8kg with AddWash', cat:'Laundry', price:4800, old:null, thumb:'https://picsum.photos/seed/laundry119/900/600', specs:'8kg • AddWash door • EcoBubble', desc:'AddWash door lets you add forgotten items mid-cycle without stopping the wash.', tag:'' },
      { id:120, name:'Midea Front Load 7kg', cat:'Laundry', price:3200, old:3500, thumb:'https://picsum.photos/seed/laundry120/900/600', specs:'7kg • 15 programs • Steam', desc:'Affordable front-load washer with steam function to remove allergens.', tag:'' },
      { id:121, name:'Haier Front Load 8kg', cat:'Laundry', price:3950, old:null, thumb:'https://picsum.photos/seed/laundry121/900/600', specs:'8kg • Direct Motion • Super wash', desc:'Haier\'s Direct Motion motor for quieter washing with fewer moving parts.', tag:'' },
      { id:122, name:'LG Twin Wash 12kg + 3kg', cat:'Laundry', price:11500, old:null, thumb:'https://picsum.photos/seed/laundry122/900/600', specs:'Twin Wash • 12kg + 3kg mini', desc:'Revolutionary Twin Wash system. Wash two loads simultaneously.', tag:'Premium' },
      { id:123, name:'Panasonic Top Load 9kg', cat:'Laundry', price:4100, old:null, thumb:'https://picsum.photos/seed/laundry123/900/600', specs:'9kg • ActiveFoam • StainMaster', desc:'Panasonic\'s ActiveFoam system creates fine foam that penetrates fabrics faster.', tag:'' },
      { id:124, name:'Sharp Top Load 8.5kg', cat:'Laundry', price:3750, old:null, thumb:'https://picsum.photos/seed/laundry124/900/600', specs:'8.5kg • Mega Mouth • Glass lid', desc:'Wide-opening lid for easy loading and unloading. Great for large families.', tag:'' },
      { id:125, name:'TCL Top Load 7kg', cat:'Laundry', price:2650, old:null, thumb:'https://picsum.photos/seed/laundry125/900/600', specs:'7kg • 8 programs • Quiet', desc:'Budget-friendly top-load washer from TCL. Reliable and quiet.', tag:'' },
      { id:126, name:'Electrolux Front Load 8kg', cat:'Laundry', price:5500, old:null, thumb:'https://picsum.photos/seed/laundry126/900/600', specs:'8kg • SensorWash • Time Manager', desc:'Electrolux\'s SensorWash detects dirt levels and adjusts washing automatically.', tag:'' },
      { id:127, name:'Siemens iQ300 Washer 8kg', cat:'Laundry', price:6200, old:null, thumb:'https://picsum.photos/seed/laundry127/900/600', specs:'8kg • iSensoric • SpeedPerfect', desc:'Siemens\' iSensoric technology senses load size and adjusts water and time.', tag:'' },
      { id:128, name:'Whirlpool Front Load 7.5kg', cat:'Laundry', price:4600, old:null, thumb:'https://picsum.photos/seed/laundry128/900/600', specs:'7.5kg • FreshCare+ • 6th Sense', desc:'Whirlpool\'s 6th Sense technology automatically adjusts cycle for optimal results.', tag:'' },
      { id:129, name:'Scanfrost Semi-Auto 8kg', cat:'Laundry', price:1650, old:null, thumb:'https://picsum.photos/seed/laundry129/900/600', specs:'8kg • Semi-auto • Twin tub', desc:'Semi-automatic twin-tub washer. Simple, rugged, and easy to repair.', tag:'Budget' },
      { id:130, name:'Igenix Top Load 6kg', cat:'Laundry', price:1950, old:null, thumb:'https://picsum.photos/seed/laundry130/900/600', specs:'6kg • 8 programs • Compact', desc:'Compact 6kg washer perfect for small households and singles.', tag:'' },

      /* ============================================================
         SOLAR & POWER (131–150)
         ============================================================ */
      { id:131, name:'3.5KVA Hybrid Solar Inverter + 4 Panels', cat:'Solar', price:12500, old:null, thumb:'https://picsum.photos/seed/solar131/900/600', specs:'24V • MPPT • 4× panels included', desc:'Complete solar solution for Ghanaian homes. Runs fridge, TV, lights, fans. Includes 4 monocrystalline panels.', tag:'Complete Kit' },
      { id:132, name:'5KVA Hybrid Solar Inverter', cat:'Solar', price:9800, old:null, thumb:'https://picsum.photos/seed/solar132/900/600', specs:'48V • Pure sine wave • MPPT', desc:'Powerful 5KVA inverter for larger homes. Runs AC, fridge, freezer, and more.', tag:'Hot' },
      { id:133, name:'2KVA Pure Sine Wave Inverter', cat:'Solar', price:3400, old:3800, thumb:'https://picsum.photos/seed/solar133/900/600', specs:'2KVA • Pure sine wave • LCD', desc:'Pure sine wave output for safe operation of sensitive electronics. LCD status display.', tag:'' },
      { id:134, name:'1.5KVA Inverter + 2 Panels', cat:'Solar', price:6500, old:null, thumb:'https://picsum.photos/seed/solar134/900/600', specs:'1.5KVA • 2× panels • Battery ready', desc:'Entry-level solar kit. Perfect for powering lights, fans, TV, and charging devices.', tag:'' },
      { id:135, name:'200W Monocrystalline Solar Panel', cat:'Solar', price:950, old:null, thumb:'https://picsum.photos/seed/solar135/900/600', specs:'200W • Monocrystalline • 25-yr warranty', desc:'High-efficiency monocrystalline panel. 25-year output warranty. Works with any 12V/24V system.', tag:'' },
      { id:136, name:'300W Monocrystalline Panel', cat:'Solar', price:1350, old:null, thumb:'https://picsum.photos/seed/solar136/900/600', specs:'300W • High efficiency • 25-yr', desc:'Larger 300W panel generates more power from the same sunlight. Ideal for bigger systems.', tag:'' },
      { id:137, name:'450W Monocrystalline Panel', cat:'Solar', price:1850, old:null, thumb:'https://picsum.photos/seed/solar137/900/600', specs:'450W • Half-cut cells • 25-yr', desc:'Premium 450W panel with half-cut cell technology for better shade tolerance.', tag:'' },
      { id:138, name:'200Ah Deep Cycle Battery', cat:'Solar', price:2450, old:null, thumb:'https://picsum.photos/seed/solar138/900/600', specs:'200Ah • Deep cycle • Maintenance-free', desc:'Heavy-duty battery for solar storage. Maintenance-free and long-lasting.', tag:'' },
      { id:139, name:'150Ah Gel Battery', cat:'Solar', price:1850, old:null, thumb:'https://picsum.photos/seed/solar139/900/600', specs:'150Ah • Gel • Deep cycle', desc:'Gel technology for longer life and better performance in hot climates.', tag:'' },
      { id:140, name:'100Ah Lithium Battery', cat:'Solar', price:4200, old:null, thumb:'https://picsum.photos/seed/solar140/900/600', specs:'100Ah • LiFePO4 • 4000 cycles', desc:'Modern lithium battery with 4000+ charge cycles. Lighter, longer-lasting, better value.', tag:'Premium' },
      { id:141, name:'60A MPPT Solar Charge Controller', cat:'Solar', price:850, old:null, thumb:'https://picsum.photos/seed/solar141/900/600', specs:'60A • MPPT • LCD display', desc:'Maximum Power Point Tracking controller extracts up to 30% more power from your panels.', tag:'' },
      { id:142, name:'40A MPPT Charge Controller', cat:'Solar', price:520, old:null, thumb:'https://picsum.photos/seed/solar142/900/600', specs:'40A • MPPT • Auto 12/24V', desc:'Compact 40A MPPT controller. Auto-detects 12V or 24V battery systems.', tag:'' },
      { id:143, name:'Solar Street Light 100W', cat:'Solar', price:650, old:null, thumb:'https://picsum.photos/seed/solar143/900/600', specs:'100W • Motion sensor • Remote', desc:'All-in-one solar street light with motion sensor and remote control.', tag:'' },
      { id:144, name:'Solar Flood Light 200W', cat:'Solar', price:980, old:null, thumb:'https://picsum.photos/seed/solar144/900/600', specs:'200W • IP67 • Remote control', desc:'Powerful solar flood light for compounds and large yards. IP67 waterproof.', tag:'' },
      { id:145, name:'Solar Home Kit 300W', cat:'Solar', price:2200, old:null, thumb:'https://picsum.photos/seed/solar145/900/600', specs:'300W • 3 lights + TV + fan', desc:'Complete home kit with panel, battery, 3 LED lights, TV, and fan.', tag:'' },
      { id:146, name:'Portable Solar Generator 500Wh', cat:'Solar', price:3200, old:null, thumb:'https://picsum.photos/seed/solar146/900/600', specs:'500Wh • 500W output • Solar ready', desc:'Portable power station with 500Wh capacity. Charge from wall or solar panel.', tag:'' },
      { id:147, name:'Portable Solar Generator 1000Wh', cat:'Solar', price:5900, old:null, thumb:'https://picsum.photos/seed/solar147/900/600', specs:'1000Wh • 1000W output • UPS mode', desc:'Larger portable power station for camping, outages, and outdoor events.', tag:'' },
      { id:148, name:'Solar Water Pump 1HP', cat:'Solar', price:4500, old:null, thumb:'https://picsum.photos/seed/solar148/900/600', specs:'1HP • Submersible • Solar powered', desc:'Solar-powered water pump for farms and gardens. No electricity needed.', tag:'' },
      { id:149, name:'6KVA Hybrid Inverter', cat:'Solar', price:13500, old:null, thumb:'https://picsum.photos/seed/solar149/900/600', specs:'48V • 6KVA • Dual MPPT', desc:'Large 6KVA hybrid inverter for whole-home backup. Runs AC and all appliances.', tag:'Premium' },
      { id:150, name:'10KVA Three-Phase Inverter', cat:'Solar', price:24500, old:null, thumb:'https://picsum.photos/seed/solar150/900/600', specs:'10KVA • Three-phase • Commercial', desc:'Commercial-grade three-phase inverter for businesses and large properties.', tag:'Luxury' },

      /* ============================================================
         AIR CONDITIONERS (151–170)
         ============================================================ */
      { id:151, name:'LG 1.5HP Inverter AC', cat:'Air Conditioners', price:4200, old:4700, thumb:'https://picsum.photos/seed/ac151/900/600', specs:'1.5HP • Inverter • Dual Cool', desc:'LG\'s Dual Cool inverter AC cools 40% faster. Energy-efficient and quiet.', tag:'Best Seller' },
      { id:152, name:'LG 2HP Inverter AC', cat:'Air Conditioners', price:5800, old:null, thumb:'https://picsum.photos/seed/ac152/900/600', specs:'2HP • Inverter • Dual Cool', desc:'Larger 2HP inverter AC for bigger rooms. Cools quickly and efficiently.', tag:'' },
      { id:153, name:'Samsung 1.5HP WindFree AC', cat:'Air Conditioners', price:4900, old:null, thumb:'https://picsum.photos/seed/ac153/900/600', specs:'1.5HP • WindFree • Digital Inverter', desc:'Samsung\'s WindFree technology cools without direct cold air blast. Perfect for bedrooms.', tag:'Premium' },
      { id:154, name:'Samsung 2HP Inverter AC', cat:'Air Conditioners', price:6500, old:null, thumb:'https://picsum.photos/seed/ac154/900/600', specs:'2HP • Digital Inverter • Wi-Fi', desc:'Wi-Fi enabled inverter AC. Control from your phone.', tag:'' },
      { id:155, name:'Hisense 1HP Split AC', cat:'Air Conditioners', price:2900, old:3200, thumb:'https://picsum.photos/seed/ac155/900/600', specs:'1HP • Split • Copper condenser', desc:'Efficient 1HP split AC with copper condenser for durability.', tag:'' },
      { id:156, name:'Hisense 1.5HP Inverter AC', cat:'Air Conditioners', price:3600, old:null, thumb:'https://picsum.photos/seed/ac156/900/600', specs:'1.5HP • Inverter • 4-way airflow', desc:'Hisense inverter AC with 4-way airflow for even cooling.', tag:'' },
      { id:157, name:'Midea 1.5HP Inverter AC', cat:'Air Conditioners', price:3400, old:null, thumb:'https://picsum.photos/seed/ac157/900/600', specs:'1.5HP • Inverter • Follow Me', desc:'Midea\'s Follow Me feature senses your location and directs cool air to you.', tag:'' },
      { id:158, name:'Midea 2HP Split AC', cat:'Air Conditioners', price:4850, old:null, thumb:'https://picsum.photos/seed/ac158/900/600', specs:'2HP • Split • Turbo cool', desc:'Powerful 2HP split AC with turbo cooling for instant comfort.', tag:'' },
      { id:159, name:'Panasonic 1.5HP Inverter AC', cat:'Air Conditioners', price:5200, old:null, thumb:'https://picsum.photos/seed/ac159/900/600', specs:'1.5HP • Inverter • nanoe-X', desc:'Panasonic\'s nanoe-X technology purifies the air while cooling.', tag:'Premium' },
      { id:160, name:'Gree 1.5HP Inverter AC', cat:'Air Conditioners', price:3300, old:null, thumb:'https://picsum.photos/seed/ac160/900/600', specs:'1.5HP • Inverter • G-Tech', desc:'Gree\'s G-Tech inverter AC runs quietly and efficiently.', tag:'' },
      { id:161, name:'Gree 2HP Split AC', cat:'Air Conditioners', price:4500, old:null, thumb:'https://picsum.photos/seed/ac161/900/600', specs:'2HP • Split • Copper coil', desc:'Durable 2HP split AC with copper coils for long life.', tag:'' },
      { id:162, name:'Nasco 1HP Split AC', cat:'Air Conditioners', price:2650, old:null, thumb:'https://picsum.photos/seed/ac162/900/600', specs:'1HP • Split • R410a', desc:'Budget-friendly 1HP split AC. Great for small rooms.', tag:'Budget' },
      { id:163, name:'Nasco 1.5HP Split AC', cat:'Air Conditioners', price:3150, old:null, thumb:'https://picsum.photos/seed/ac163/900/600', specs:'1.5HP • Split • Remote', desc:'Reliable 1.5HP AC from Nasco with full-function remote.', tag:'' },
      { id:164, name:'LG 3HP Floor Standing AC', cat:'Air Conditioners', price:12500, old:null, thumb:'https://picsum.photos/seed/ac164/900/600', specs:'3HP • Floor standing • Inverter', desc:'Powerful floor-standing AC for large rooms and offices.', tag:'' },
      { id:165, name:'Hisense 2HP Cassette AC', cat:'Air Conditioners', price:8900, old:null, thumb:'https://picsum.photos/seed/ac165/900/600', specs:'2HP • Ceiling cassette • 4-way', desc:'Ceiling-mounted cassette AC for even air distribution. Perfect for offices.', tag:'' },
      { id:166, name:'Midea 3HP Floor Standing', cat:'Air Conditioners', price:9800, old:null, thumb:'https://picsum.photos/seed/ac166/900/600', specs:'3HP • Floor standing • WiFi', desc:'Large floor-standing AC with WiFi control.', tag:'' },
      { id:167, name:'Samsung 2.5HP Inverter AC', cat:'Air Conditioners', price:8200, old:null, thumb:'https://picsum.photos/seed/ac167/900/600', specs:'2.5HP • Inverter • WindFree', desc:'Premium 2.5HP inverter with Samsung\'s WindFree technology.', tag:'Premium' },
      { id:168, name:'LG 1HP Inverter AC', cat:'Air Conditioners', price:3400, old:null, thumb:'https://picsum.photos/seed/ac168/900/600', specs:'1HP • Inverter • Dual Cool', desc:'Compact 1HP inverter AC for bedrooms and small offices.', tag:'' },
      { id:169, name:'Panasonic 2HP Inverter AC', cat:'Air Conditioners', price:6800, old:null, thumb:'https://picsum.photos/seed/ac169/900/600', specs:'2HP • Inverter • nanoe-G', desc:'Panasonic\'s 2HP inverter with air purification.', tag:'' },
      { id:170, name:'Chigo 1.5HP Split AC', cat:'Air Conditioners', price:2750, old:null, thumb:'https://picsum.photos/seed/ac170/900/600', specs:'1.5HP • Split • Copper', desc:'Affordable 1.5HP split AC with copper condenser.', tag:'Budget' },

      /* ============================================================
         FANS (171–180)
         ============================================================ */
      { id:171, name:'Ox Standing Fan 18"', cat:'Fans', price:380, old:null, thumb:'https://picsum.photos/seed/fan171/900/600', specs:'18" • Standing • 3-speed', desc:'Classic 18-inch standing fan. Adjustable height and 3 speeds.', tag:'' },
      { id:172, name:'Ox Ceiling Fan 56"', cat:'Fans', price:450, old:null, thumb:'https://picsum.photos/seed/fan172/900/600', specs:'56" • Ceiling • 3-speed', desc:'Wide 56-inch ceiling fan for large rooms. Quiet and efficient.', tag:'' },
      { id:173, name:'Ox Table Fan 16"', cat:'Fans', price:220, old:null, thumb:'https://picsum.photos/seed/fan173/900/600', specs:'16" • Table • Oscillating', desc:'Compact 16-inch table fan. Oscillates for wider air coverage.', tag:'' },
      { id:174, name:'Ox Wall Fan 18"', cat:'Fans', price:320, old:null, thumb:'https://picsum.photos/seed/fan174/900/600', specs:'18" • Wall-mounted • Remote', desc:'Space-saving wall fan with remote control. Perfect for shops and workshops.', tag:'' },
      { id:175, name:'Binatone Standing Fan 16"', cat:'Fans', price:320, old:null, thumb:'https://picsum.photos/seed/fan175/900/600', specs:'16" • Standing • 3-speed', desc:'Reliable Binatone standing fan. Great value.', tag:'' },
      { id:176, name:'Century Rechargeable Fan', cat:'Fans', price:550, old:null, thumb:'https://picsum.photos/seed/fan176/900/600', specs:'Rechargeable • LED light • USB', desc:'Rechargeable fan with built-in LED light. Keeps you cool during power cuts.', tag:'Hot' },
      { id:177, name:'Ox Rechargeable Standing Fan', cat:'Fans', price:680, old:null, thumb:'https://picsum.photos/seed/fan177/900/600', specs:'Rechargeable • Remote • LED light', desc:'Premium rechargeable standing fan with remote and LED light.', tag:'' },
      { id:178, name:'Ceiling Fan with Light 48"', cat:'Fans', price:620, old:null, thumb:'https://picsum.photos/seed/fan178/900/600', specs:'48" • Ceiling • LED light kit', desc:'Ceiling fan with integrated LED light. Cools and lights the room.', tag:'' },
      { id:179, name:'Tower Fan 45"', cat:'Fans', price:480, old:null, thumb:'https://picsum.photos/seed/fan179/900/600', specs:'45" • Tower • Remote • Timer', desc:'Sleek tower fan with remote and timer. Perfect for modern living rooms.', tag:'' },
      { id:180, name:'Ox Industrial Wall Fan 26"', cat:'Fans', price:850, old:null, thumb:'https://picsum.photos/seed/fan180/900/600', specs:'26" • Industrial • Wall mount', desc:'Powerful industrial fan for warehouses, workshops, and large spaces.', tag:'' },

      /* ============================================================
         SMALL APPLIANCES (181–195)
         ============================================================ */
      { id:181, name:'Philips Steam Iron 2400W', cat:'Small Appliances', price:420, old:null, thumb:'https://picsum.photos/seed/small181/900/600', specs:'2400W • Steam • Ceramic soleplate', desc:'Powerful 2400W steam iron with ceramic soleplate for smooth gliding.', tag:'' },
      { id:182, name:'Philips Garment Steamer', cat:'Small Appliances', price:580, old:null, thumb:'https://picsum.photos/seed/small182/900/600', specs:'Standing steamer • 1.8L tank', desc:'Standing garment steamer. Gentle on delicate fabrics.', tag:'' },
      { id:183, name:'Samsung Vacuum Cleaner 2000W', cat:'Small Appliances', price:850, old:null, thumb:'https://picsum.photos/seed/small183/900/600', specs:'2000W • Cyclone • HEPA filter', desc:'Powerful 2000W vacuum with HEPA filter for allergy relief.', tag:'' },
      { id:184, name:'Dyson V8 Cordless Vacuum', cat:'Small Appliances', price:3900, old:null, thumb:'https://picsum.photos/seed/small184/900/600', specs:'Cordless • 40min • HEPA', desc:'Dyson\'s cordless vacuum. Lightweight and powerful.', tag:'Premium' },
      { id:185, name:'Xiaomi Robot Vacuum', cat:'Small Appliances', price:2800, old:null, thumb:'https://picsum.photos/seed/small185/900/600', specs:'Robot • App control • Mapping', desc:'Smart robot vacuum with app control and mapping. Cleans while you relax.', tag:'' },
      { id:186, name:'Nasco Hair Dryer 2000W', cat:'Small Appliances', price:220, old:null, thumb:'https://picsum.photos/seed/small186/900/600', specs:'2000W • 3 heat settings • Cool shot', desc:'Powerful hair dryer with 3 heat settings and cool shot button.', tag:'' },
      { id:187, name:'Braun Electric Shaver', cat:'Small Appliances', price:650, old:null, thumb:'https://picsum.photos/seed/small187/900/600', specs:'Rechargeable • Wet & dry • 4 heads', desc:'Premium Braun shaver, wet or dry use. Rechargeable with long battery.', tag:'' },
      { id:188, name:'Philips Beard Trimmer', cat:'Small Appliances', price:380, old:null, thumb:'https://picsum.photos/seed/small188/900/600', specs:'Rechargeable • 20 lengths • Self-sharpening', desc:'Self-sharpening blades, 20 length settings, and 60-minute runtime.', tag:'' },
      { id:189, name:'Oral-B Electric Toothbrush', cat:'Small Appliances', price:450, old:null, thumb:'https://picsum.photos/seed/small189/900/600', specs:'Rechargeable • 3 modes • Timer', desc:'Electric toothbrush with 3 cleaning modes and 2-minute timer.', tag:'' },
      { id:190, name:'Humidifier 5L', cat:'Small Appliances', price:380, old:null, thumb:'https://picsum.photos/seed/small190/900/600', specs:'5L • Ultrasonic • Auto shut-off', desc:'Ultrasonic humidifier for bedrooms. Auto shut-off when empty.', tag:'' },
      { id:191, name:'Air Purifier HEPA', cat:'Small Appliances', price:1200, old:null, thumb:'https://picsum.photos/seed/small191/900/600', specs:'HEPA • 3 stages • Timer', desc:'3-stage HEPA air purifier removes dust, pollen, and odors.', tag:'' },
      { id:192, name:'Dehumidifier 12L', cat:'Small Appliances', price:1450, old:null, thumb:'https://picsum.photos/seed/small192/900/600', specs:'12L/day • Auto defrost • Continuous drain', desc:'Removes up to 12L of moisture per day. Ideal for humid Ghanaian climate.', tag:'' },
      { id:193, name:'Digital Scale 200kg', cat:'Small Appliances', price:280, old:null, thumb:'https://picsum.photos/seed/small193/900/600', specs:'200kg • LCD • Tempered glass', desc:'Sleek digital bathroom scale with tempered glass and LCD display.', tag:'' },
      { id:194, name:'Wall Clock Large', cat:'Small Appliances', price:180, old:null, thumb:'https://picsum.photos/seed/small194/900/600', specs:'Silent • Large numerals • 12"', desc:'Silent wall clock with large numerals. Easy to read from across the room.', tag:'' },
      { id:195, name:'Philips Sound Machine', cat:'Small Appliances', price:520, old:null, thumb:'https://picsum.photos/seed/small195/900/600', specs:'White noise • 20 sounds • Nightlight', desc:'White noise machine with 20 soothing sounds and nightlight. Better sleep.', tag:'' },

      /* ============================================================
         ACCESSORIES (196–200)
         ============================================================ */
      { id:196, name:'Anker Power Bank 20000mAh', cat:'Accessories', price:380, old:null, thumb:'https://picsum.photos/seed/acc196/900/600', specs:'20000mAh • PD 20W • Dual USB', desc:'Fast-charging power bank from Anker. Charges phone 4-5 times.', tag:'' },
      { id:197, name:'USB-C Fast Charger 65W', cat:'Accessories', price:180, old:null, thumb:'https://picsum.photos/seed/acc197/900/600', specs:'65W • USB-C • GaN tech', desc:'Compact 65W GaN charger. Charges laptops and phones fast.', tag:'' },
      { id:198, name:'Surge Protector 8-Way', cat:'Accessories', price:220, old:null, thumb:'https://picsum.photos/seed/acc198/900/600', specs:'8 outlets • Surge • USB ports', desc:'Protects electronics from power surges and lightning. 8 outlets + 2 USB.', tag:'' },
      { id:199, name:'HDMI Cable 4K 3m', cat:'Accessories', price:120, old:null, thumb:'https://picsum.photos/seed/acc199/900/600', specs:'4K • 3m • Gold-plated', desc:'Premium HDMI cable supports 4K at 60Hz. Gold-plated connectors.', tag:'' },
      { id:200, name:'Smart Wi-Fi Plug', cat:'Accessories', price:150, old:null, thumb:'https://picsum.photos/seed/acc200/900/600', specs:'WiFi • App control • Timer', desc:'Control any appliance from your phone. Schedule lights, fans, and more.', tag:'' }
    ]
  }
});