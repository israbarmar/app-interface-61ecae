/**
 * Data contract shared by the UI and the (future) Python backend.
 * The backend should return JSON matching these shapes — see README.md.
 */

export interface Photo {
  /** Site-relative path (e.g. `/img/foo.png`) or absolute URL. */
  src: string
  alt: string
}

/** One block of the side card: a heading, its main value, and extra data. */
export interface CardField {
  label: string
  info: string
  /** Label for the secondary value. Defaults to "Add data". */
  addDataLabel?: string
  addData: string
}

export interface Site {
  id: string
  name: string
  location: string
  lat: number
  lon: number
  photos: Photo[]
  fields: CardField[]
}

export interface Overview {
  title: string
  intro: string
  headline: string
  subheadline: string
  mapLabel: string
  /** Short instruction under the map label. Optional. */
  mapHint?: string
}

export interface DashboardData {
  overview: Overview
  sites: Site[]
  /** Where the data came from, shown as a status badge. */
  source: 'api' | 'demo'
}
