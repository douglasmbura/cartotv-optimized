# CartoTV – Next.js Migration

Full Next.js 14 App Router migration of CartoTV, fully SEO-optimised and ready for deployment on Render.

## Stack

- **Next.js 14** (App Router, standalone output)
- **TypeScript**
- **Tailwind CSS** + shadcn/ui
- **Three.js** + @react-three/fiber (client-only, lazy loaded)
- **i18next** (11 languages: en, es, fr, de, pt, ar, zh, hi, sw, id, ru)
- **TanStack Query**
- **hls.js** for live stream playback

## SEO Features

- ✅ Server-side rendered metadata per page (title, description, OG, Twitter)
- ✅ hreflang tags for all 11 languages on every page
- ✅ JSON-LD structured data: WebApplication, FAQPage, BroadcastService, BlogPosting, CollectionPage
- ✅ Dynamic `sitemap.xml` covering ~2,000+ URLs (home + watch + 182 countries × 11 langs + blog)
- ✅ `robots.txt` with sitemap reference
- ✅ Canonical URLs on every page
- ✅ RTL support for Arabic
- ✅ Per-country SEO rich text content (Africa, Americas, Europe, Asia-Oceania)
- ✅ Three.js globe lazy-loaded (no SSR) — full LCP performance

## Routes

| Route | Page |
|---|---|
| `/[lang]` | Home (3D globe) |
| `/[lang]/watch` | Country listing |
| `/[lang]/watch/[country]` | Country channel list |
| `/[lang]/watch/[country]/[channel]` | Channel player |
| `/[lang]/blog` | Blog listing |
| `/[lang]/blog/[slug]` | Blog post |
| `/[lang]/who-we-are` | About page |
| `/[lang]/terms` | Terms of Service |
| `/[lang]/privacy` | Privacy Policy |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots |

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` automatically.

## Build & Start

```bash
npm run build
node .next/standalone/server.js
```

## Deployment on Render

The `render.yaml` file is pre-configured. Simply:

1. Push this repo to GitHub
2. Connect the repo to Render
3. Render detects `render.yaml` and deploys automatically

Environment variables are already set in `render.yaml`:
- `NODE_ENV=production`
- `NODE_OPTIONS=--max-old-space-size=1536`
- `PORT=10000`
- `HOSTNAME=0.0.0.0`
- `NEXT_TELEMETRY_DISABLED=1`

## Adding Channels / Countries

Channel data is fetched live from `iptv-org.github.io` M3U playlists — no changes needed.
Country data lives in `src/data/countries.ts`.

## Analytics & Monetisation

- **Google Analytics**: `G-LVEWCM7QE2` (wired in `src/app/layout.tsx`)
- **Google AdSense**: `ca-pub-2116450199889361` (wired in `src/app/layout.tsx`)
- **OneSignal**: App ID `4c598172-f798-4bd2-9483-90e2aefaf259` (wired in `src/app/layout.tsx`)

## Architecture Notes

- All Globe components (`Scene`, `Earth`, `CountryMarker`) are `'use client'` and loaded with `dynamic(..., { ssr: false })` to avoid Three.js SSR errors
- i18next is initialised once at the module level in `I18nProvider.tsx` and synced via `useEffect` on route changes
- `[lang]/layout.tsx` sets `document.documentElement.lang` and `dir` client-side to avoid hydration mismatches
