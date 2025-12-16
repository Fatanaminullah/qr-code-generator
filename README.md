# QR Code Generator

Simple website to generate a QR code from a URL (no ads, no expiry). The QR is generated locally in your browser.

## Features

- Enter a URL
- Click **Generate**
- See the QR image
- Click the QR (or the **Download PNG** button) to download

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

## Deploy to Netlify

### Option A: Import from Git (recommended)

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `20` (already set in `netlify.toml`)

Netlify will auto-detect `netlify.toml`, so you usually won’t need to enter anything manually.

### Option B: Netlify Drop (drag & drop)

```bash
npm install
npm run build
```

Then drag the generated `dist/` folder into Netlify Drop.


