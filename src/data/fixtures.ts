import type { ChartSpec, Overview, Photo, Site } from './types'

/**
 * Demo data shown until the Python backend is connected (VITE_API_URL).
 * Values are illustrative placeholders, not real measurements.
 */

export const demoOverview: Overview = {
  title: 'Cultivating new worlds',
  intro:
    'GalaxyFarm gathers the observations of telescopes around the planet into a single field of view. Every site below is a plot in our farm: it watches its patch of sky, harvests transit and radial-velocity signals, and feeds the catalog of confirmed exoplanets. Select an observatory on the map to see what it has grown so far.',
  headline: 'The global harvest at a glance',
  subheadline: 'Discoveries by observatory',
  mapLabel: 'World map',
  mapHint: 'Click a marker on the map to see its information',
}

const p = (name: string, alt: string): Photo => ({
  src: `/img/${name}.png`,
  alt,
})

const photos = {
  desert: p('observatory-desert', 'Twin observatory domes under the Milky Way'),
  radio: p('radio-array', 'Radio telescope dishes at dusk'),
  interior: p('telescope-interior', 'A reflecting telescope inside its dome'),
  planet: p('exoplanet', 'A rocky exoplanet orbiting an orange dwarf'),
  nebula: p('nebula-field', 'A star field with an emission nebula'),
  summit: p('mountain-summit', 'Observatories on a summit above the clouds'),
}

export const demoSites: Site[] = [
  {
    id: 'paranal',
    name: 'Cerro Paranal',
    location: 'Atacama Desert, Chile',
    lat: -24.627,
    lon: -70.404,
    photos: [photos.desert, photos.interior, photos.planet, photos.nebula],
    fields: [
      { label: 'Planets confirmed', info: '214', addData: '+12 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '18.6 days',
        addData: 'Range 0.7 – 412 d',
      },
      {
        label: 'Stellar Host',
        info: 'TOI-700 · M dwarf',
        addData: '101.4 ly · 3,480 K',
      },
    ],
  },
  {
    id: 'mauna-kea',
    name: 'Mauna Kea',
    location: 'Hawaiʻi, United States',
    lat: 19.82,
    lon: -155.47,
    photos: [photos.summit, photos.interior, photos.nebula, photos.planet],
    fields: [
      { label: 'Planets confirmed', info: '187', addData: '+7 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '42.1 days',
        addData: 'Range 1.2 – 980 d',
      },
      {
        label: 'Stellar Host',
        info: 'HR 8799 · A-type',
        addData: '133 ly · 7,430 K',
      },
    ],
  },
  {
    id: 'kitt-peak',
    name: 'Kitt Peak',
    location: 'Arizona, United States',
    lat: 31.958,
    lon: -111.596,
    photos: [photos.desert, photos.nebula, photos.interior, photos.planet],
    fields: [
      { label: 'Planets confirmed', info: '96', addData: '+3 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '9.4 days',
        addData: 'Range 0.5 – 120 d',
      },
      {
        label: 'Stellar Host',
        info: 'HD 189733 · K dwarf',
        addData: '64.5 ly · 5,050 K',
      },
    ],
  },
  {
    id: 'la-palma',
    name: 'Roque de los Muchachos',
    location: 'La Palma, Spain',
    lat: 28.756,
    lon: -17.892,
    photos: [photos.summit, photos.desert, photos.planet, photos.nebula],
    fields: [
      { label: 'Planets confirmed', info: '132', addData: '+9 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '11.8 days',
        addData: 'Range 0.9 – 260 d',
      },
      {
        label: 'Stellar Host',
        info: 'WASP-12 · G-type',
        addData: '1,410 ly · 6,300 K',
      },
    ],
  },
  {
    id: 'sutherland',
    name: 'Sutherland',
    location: 'Northern Cape, South Africa',
    lat: -32.376,
    lon: 20.81,
    photos: [photos.desert, photos.radio, photos.nebula, photos.planet],
    fields: [
      { label: 'Planets confirmed', info: '78', addData: '+5 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '24.3 days',
        addData: 'Range 1.1 – 340 d',
      },
      {
        label: 'Stellar Host',
        info: 'WASP-121 · F-type',
        addData: '858 ly · 6,460 K',
      },
    ],
  },
  {
    id: 'guizhou',
    name: 'Pingtang Array',
    location: 'Guizhou, China',
    lat: 25.653,
    lon: 106.857,
    photos: [photos.radio, photos.nebula, photos.planet, photos.summit],
    fields: [
      { label: 'Planets confirmed', info: '41', addData: '+2 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '63.0 days',
        addData: 'Range 3.4 – 1,200 d',
      },
      {
        label: 'Stellar Host',
        info: 'YZ Ceti · M dwarf',
        addData: '12.1 ly · 3,100 K',
      },
    ],
  },
  {
    id: 'siding-spring',
    name: 'Siding Spring',
    location: 'New South Wales, Australia',
    lat: -31.273,
    lon: 149.064,
    photos: [photos.desert, photos.interior, photos.nebula, photos.radio],
    fields: [
      { label: 'Planets confirmed', info: '109', addData: '+6 this quarter' },
      {
        label: 'Avg. orbital period',
        info: '15.2 days',
        addData: 'Range 0.6 – 300 d',
      },
      {
        label: 'Stellar Host',
        info: 'Proxima Cen · M dwarf',
        addData: '4.2 ly · 3,040 K',
      },
    ],
  },
]

const axis = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const demoCharts: ChartSpec[] = [
  {
    id: 'detections',
    title: 'Detections by method',
    description:
      'Candidate signals harvested each cycle, split by detection method. Transit surveys dominate most cycles, while radial-velocity follow-ups peak when the southern sites have long winter nights.',
    type: 'area',
    labels: axis,
    series: [
      {
        label: 'Transit',
        data: [790, 960, 630, 270, 290, 20, 950, 440, 110, 860],
      },
      {
        label: 'Radial velocity',
        data: [270, 580, 100, 420, 550, 90, 220, 200, 580, 110],
      },
    ],
  },
  {
    id: 'signal-quality',
    title: 'Signal quality per cycle',
    description:
      'Average signal-to-noise score of the confirmed candidates compared with the false-positive score. The closer the two lines get, the more manual vetting a cycle needs.',
    type: 'line',
    labels: axis,
    series: [
      {
        label: 'Signal-to-noise',
        data: [520, 650, 550, 180, 1000, 640, 550, 830, 120, 750],
      },
      {
        label: 'False positives',
        data: [210, 760, 60, 250, 200, 90, 240, 340, 640, 280],
      },
    ],
  },
  {
    id: 'observing-hours',
    title: 'Observing hours vs. confirmations',
    description:
      'Telescope hours scheduled in each cycle next to the number of candidates promoted to confirmed planets. More hours do not always mean more confirmations — weather and target choice matter too.',
    type: 'bar',
    labels: axis,
    series: [
      {
        label: 'Observing hours',
        data: [810, 860, 500, 990, 350, 80, 410, 970, 400, 600],
      },
      {
        label: 'Confirmations',
        data: [960, 740, 740, 80, 1000, 460, 330, 90, 930, 370],
      },
    ],
  },
]
