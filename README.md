# Tilly Enterprise — Ghana Storefront + Admin

## Structure
- `index.html` — public storefront
- `admin.html` — separate admin console
- `css/` — stylesheets
- `js/` — config, security, store, storefront logic, admin logic
- `.htaccess` — Apache hardening (only if using Apache)

## First-Time Setup
1. Upload everything to your host (Cloudflare Pages, Netlify, Vercel, or cPanel).
2. Visit `https://yoursite.com/admin.html`.
3. Create an admin password (min 10 characters).
4. Add your products — you can paste image URLs or upload photos directly.
5. Export a backup and store it somewhere safe.

## Features
- 🇬🇭 Ghana Cedis (GH₵) currency
- 📱 Click any product to see full detail view with large photo + description
- 🔗 Shareable product URLs (e.g. `yoursite.com/#product-4`)
- 🖼️ Upload product images from your phone or computer
- 🎨 Change hero background from the admin panel
- 📦 Real-time product catalogue
- 🛒 WhatsApp checkout
- 🔐 Full security suite (see below)
- 💾 Backup & restore with digital signatures

## Security
- PBKDF2 password hashing (310,000 iterations + 16-byte salt)
- Rate limiting: 5 failed logins → 30-minute lockout
- 30-minute session expiry with device fingerprint
- SHA-256 data integrity check
- Strict Content Security Policy
- Input sanitisation + image URL whitelist
- Signed backup files (tampered files rejected)

## Important
This is a browser-only app. Data lives in the admin's browser.
- Clearing browser data will erase products. Always export a backup.
- Different devices don't share data.
- For a real shop with multiple users, migrate to a backend (Firebase, Supabase).

## Reset Admin Password
On the login page, click "Forgot password". Products and settings are untouched.

## Backup
Admin → Backup & Restore → Download Backup. Do this regularly.

## Image Tips
- Use JPG or PNG files. iPhone HEIC photos are not supported by browsers.
- On iPhone: Settings → Camera → Formats → "Most Compatible" converts to JPG.
- Uploads are auto-resized to 900px wide (or 1600px for hero background).
- Browser storage limit is ~5 MB. Use image URLs (not uploads) for more products.

## Hosting Recommendations
- **Cloudflare Pages** (free HTTPS + CDN, recommended)
- **Netlify** / **Vercel** (free tier)
- **cPanel shared hosting** (upload `.htaccess` too)

## Deployment
1. Zip the whole `tilly-enterprise/` folder.
2. Upload to your host's `public_html` or use Netlify Drop.
3. Visit `/admin.html` and set your password.
4. Add products and go live.