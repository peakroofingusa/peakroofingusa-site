# Peak Roofing USA — Demo Landing Page

Portfolio demo site built with Next.js 14, Tailwind CSS, TypeScript. Deployed on Cloudflare Pages.

## Tech Stack
- Next.js 14 (static export)
- React 18
- Tailwind CSS
- TypeScript

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Outputs static files to `out/` for Cloudflare Pages.

## Cloudflare Pages Settings
- Build command: `npm run build`
- Build output directory: `out`
- Node version: 18+

## Tracking
- GA4 and Meta Pixel event firing on form submit (events: `generate_lead`, `Lead`)
- Tracking scripts to be injected via `app/layout.tsx` head

## Disclaimer
Demo site for portfolio purposes. Not a real roofing business.
