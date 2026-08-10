# HH Goa 2026 — Task 1: Builder DNA / Crew Passport

link: https://hhgoa-task1-builder-dna.vercel.app/

A client-side HH Goa 2026 frame and ID generator built for `#FrameInGoa`.

## Why this concept
Most submissions can stop at "upload → theme → download." This version adds a memorable identity mechanic:

- **Builder DNA:** deterministic builder archetype + four stats based on name/stack/handle.
- **Crew Passport:** 1–3 builders combine into one crew class and shareable team output.
- **No manual crop:** photos auto-fill their frames with `object-fit: cover`.
- **One-click export:** high-resolution PNG through `html-to-image`.
- **Fast sharing:** Web Share API with the generated image when supported; otherwise opens X compose and attempts to copy the image to clipboard.
- **Private by default:** photos stay in the browser; there is no backend.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## Before submitting

1. Replace text-only branding with official HH Goa assets from the event brand kit if permitted.
2. Test on Chrome desktop + one mobile browser.
3. Generate your personal Builder DNA image.
4. Add teammate(s) and generate the Crew Passport.
5. Deploy and verify the public URL.
6. Post the generated asset on X with `#FrameInGoa`, the generator URL, and a 3-step how-to.
7. Use the official task submission/participation flow from HH Goa.

## Useful implementation note about X sharing
Browsers cannot silently upload an arbitrary local image to X without an authenticated X API flow. The app therefore uses the native OS share sheet with the actual PNG where supported. Otherwise it opens X's compose intent and makes a best-effort clipboard copy of the PNG.

## Suggested next upgrades

- Client-side face-aware focal-point detection with MediaPipe.
- Shareable public result URLs via Supabase/Cloudinary.
- A 1080×1920 story format.
- Crew QR code that opens the team's public card.
- Tiny analytics counter for generated/downloaded frames.
