import { demoCharts, demoOverview, demoSites } from './fixtures'
import type { ChartSpec, DashboardData, Overview, Site } from './types'

/**
 * Base URL of the Python backend, e.g. `https://api.example.com`.
 * Set VITE_API_URL in the Netlify environment (or `.env.local`) to switch
 * from demo data to live data. Leave unset to keep using the fixtures.
 */
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(
  /\/$/,
  '',
)

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`${path} responded ${res.status}`)
  return (await res.json()) as T
}

/**
 * Loads everything the home screen needs.
 * Expected backend endpoints:
 *   GET /overview -> Overview
 *   GET /sites    -> Site[]
 *   GET /charts   -> ChartSpec[]  (optional, demo charts if missing)
 * Falls back to demo data if the backend is not configured or unreachable.
 */
export async function loadDashboard(): Promise<DashboardData> {
  if (!API_URL)
    return {
      overview: demoOverview,
      sites: demoSites,
      charts: demoCharts,
      source: 'demo',
    }
  try {
    const [overview, sites, charts] = await Promise.all([
      getJson<Overview>('/overview').catch(() => demoOverview),
      getJson<Site[]>('/sites'),
      getJson<ChartSpec[]>('/charts').catch(() => demoCharts),
    ])
    return { overview, sites, charts, source: 'api' }
  } catch (err) {
    console.error('GalaxyFarm backend unavailable, using demo data:', err)
    return {
      overview: demoOverview,
      sites: demoSites,
      charts: demoCharts,
      source: 'demo',
    }
  }
}

/** Serves local images through the Netlify Image CDN at a given width. */
export function imageUrl(src: string, width: number) {
  if (/^https?:\/\//.test(src)) return src
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp`
}
