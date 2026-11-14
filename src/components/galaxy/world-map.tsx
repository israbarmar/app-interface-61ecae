import { useMemo } from 'react'
import { geoEquirectangular, geoGraticule10, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import land110m from 'world-atlas/land-110m.json'

import type { Site } from '@/data/types'
import { cn } from '@/lib/utils'

const WIDTH = 960
// Equirectangular, cropped to latitudes 84°N … 62°S so the map fills a wide panel.
const NORTH = 84
const SOUTH = -62
const SCALE = WIDTH / (2 * Math.PI)
const TOP = ((NORTH * Math.PI) / 180) * SCALE
const HEIGHT = Math.round(TOP + ((-SOUTH * Math.PI) / 180) * SCALE)

const topology = land110m as unknown as Topology<{ land: GeometryCollection }>
const land = feature(
  topology,
  topology.objects.land,
) as unknown as FeatureCollection

const projection = geoEquirectangular()
  .scale(SCALE)
  .translate([WIDTH / 2, TOP])
const path = geoPath(projection)

interface WorldMapProps {
  sites: Site[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function WorldMap({ sites, selectedId, onSelect }: WorldMapProps) {
  const shapes = useMemo(
    () => ({
      graticule: path(geoGraticule10()) ?? '',
      land: path(land) ?? '',
    }),
    [],
  )

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="group"
      aria-label="World map of observatories"
    >
      <defs>
        <radialGradient id="map-vignette" cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="black" stopOpacity={0} />
          <stop offset="100%" stopColor="black" stopOpacity={0.45} />
        </radialGradient>
        <filter id="land-relief" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="2"
            floodColor="black"
            floodOpacity="0.55"
          />
        </filter>
      </defs>
      <rect width={WIDTH} height={HEIGHT} className="fill-map-ocean" />
      <path
        d={shapes.graticule}
        className="fill-none stroke-map-grid"
        strokeWidth={0.5}
      />
      <path
        d={shapes.land}
        className="fill-map-land stroke-map-coast"
        strokeWidth={0.6}
        filter="url(#land-relief)"
      />
      <rect
        width={WIDTH}
        height={HEIGHT}
        fill="url(#map-vignette)"
        pointerEvents="none"
      />

      {sites.map((site) => {
        const point = projection([site.lon, site.lat])
        if (!point) return null
        const active = site.id === selectedId
        return (
          <g
            key={site.id}
            transform={`translate(${point[0]} ${point[1]})`}
            role="button"
            tabIndex={0}
            aria-label={`${site.name}, ${site.location}`}
            aria-pressed={active}
            onClick={() => onSelect(site.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(site.id)
              }
            }}
            className="group cursor-pointer outline-none"
          >
            <circle
              r={active ? 18 : 12}
              className={cn(
                'fill-primary/15 transition-all motion-reduce:transition-none',
                active && 'animate-pulse motion-reduce:animate-none',
              )}
            />
            <circle
              r={active ? 7 : 5}
              className={cn(
                'stroke-background transition-all motion-reduce:transition-none group-hover:fill-primary group-focus-visible:stroke-foreground',
                active ? 'fill-primary' : 'fill-primary/80',
              )}
              strokeWidth={2}
            />
            <text
              y={-16}
              textAnchor="middle"
              className={cn(
                'pointer-events-none fill-foreground font-mono text-[11px] transition-opacity',
                active
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
              )}
            >
              {site.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
