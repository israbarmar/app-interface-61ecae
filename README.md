# GalaxyFarm

GalaxyFarm is an interactive explorer for exoplanet discoveries around the world. Visitors land on a single screen with an introduction, a headline section, and a world map of observatories. Selecting an observatory (or using the card's → button) opens its photo carousel and a data card showing two key metrics and its stellar host, each with supporting data.

The frontend runs today on demo data and is ready to be connected to a Python backend.

## Tech stack

- TanStack Start (React 19, TanStack Router) on Vite, deployed to Netlify
- Tailwind CSS 4 with theme variables in `src/styles.css`
- `d3-geo` + `world-atlas` for the SVG world map
- Netlify Image CDN for responsive, WebP-optimized photos

## Run locally

```bash
pnpm install
pnpm dev                 # http://localhost:3000
# or, with Netlify emulation (Image CDN, env vars):
netlify dev
```

## Connecting the Python backend

The frontend reads its data from `src/data/api.ts`. When `VITE_API_URL` is set (in `.env.local` or the Netlify site environment), it fetches:

| Endpoint        | Returns                                   |
| --------------- | ----------------------------------------- |
| `GET /overview` | page copy (`title`, `intro`, `headline`, `subheadline`, `mapLabel`, `mapHint`) — optional |
| `GET /sites`    | array of observatories with `lat`, `lon`, `photos`, and card `fields` |

The exact shapes are in `src/data/types.ts`, and `backend/example_api.py` is a minimal FastAPI service that returns them. Enable CORS for the Netlify domain. If the backend is unset or unreachable, the app falls back to the demo data in `src/data/fixtures.ts`, and the header badge shows "Demo data" instead of "Live data".

Netlify does not run Python services, so host the backend separately (e.g. Render, Fly.io, Railway, Cloud Run) and point `VITE_API_URL` at it. `VITE_` variables are baked in at build time, so redeploy after changing it.
