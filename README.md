# Prime Mobile Lube Website

Static, single-page marketing website for a mobile oil change business with:
- 3 tiered oil service cards
- conversion-focused call/text/booking CTAs
- mobile sticky action bar
- future brake service expansion page

## Project Structure

- `index.html` - main landing page and booking form
- `styles.css` - full visual styling and responsive layout
- `script.js` - booking form UX, scheduler button wiring, dynamic year
- `services/brake-repair.html` - future service preview page
- `assets/` - place your logo, photos, and icons here

## Quick Customization

### 1) Business Identity

In `index.html` and `services/brake-repair.html`, replace:
- `Prime Mobile Lube` with your brand name
- `hello@primemobilelube.com` with your email
- `(555) 555-0110` / `+15555550110` with your real phone

### 2) Colors and Look

In `styles.css`, edit CSS variables in `:root`:
- `--accent` and `--accent-strong` for CTA color
- `--bg`, `--surface`, `--text` for brand mood

### 3) Tier Names, Pricing, and Features

In `index.html`, update the three cards under `#services`:
- tier names
- prices
- filter/oil/additive descriptions

### 4) Service Area + Hours

In `index.html`, update:
- city/neighborhood list in `#service-area`
- operating days/hours in Availability block

### 5) Booking + Scheduler

- Form fields are handled in-browser by `script.js`.
- Set your real scheduler link in `script.js`:
  - `const schedulerUrl = "https://example.com/your-scheduler-link";`
- If you use Calendly, Square Appointments, or another tool, paste that URL there.

### 6) Social Links

In `index.html` footer, replace placeholder `href="#"` links with real profiles.

## Local Preview

Open `index.html` directly in your browser, or run a local static server.

With Node.js:

```bash
npx serve .
```

Then open the local URL shown in terminal.

## Deployment Options

Any static hosting works:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Upload the project folder as-is and set `index.html` as the entry page.

## Notes

- Booking form currently shows a success message (no backend submission).
- To collect submissions, connect the form to:
  - Formspree
  - Basin
  - Netlify Forms
  - or your own API endpoint
