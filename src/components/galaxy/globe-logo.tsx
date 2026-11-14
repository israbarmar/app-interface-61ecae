import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import land110m from 'world-atlas/land-110m.json'

const SIZE = 64

const topology = land110m as unknown as Topology<{ land: GeometryCollection }>
const land = feature(
  topology,
  topology.objects.land,
) as unknown as FeatureCollection
const projection = geoOrthographic()
  .rotate([20, -15])
  .fitExtent(
    [
      [2, 2],
      [SIZE - 2, SIZE - 2],
    ],
    { type: 'Sphere' },
  )
const path = geoPath(projection)

const shapes = {
  sphere: path({ type: 'Sphere' }) ?? '',
  graticule: path(geoGraticule10()) ?? '',
  land: path(land) ?? '',
}

/** Small rotating-earth style logo drawn from the same land data as the map. */
export function GlobeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} aria-hidden>
      <defs>
        <radialGradient id="globe-shade" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity={0.25} />
          <stop offset="60%" stopColor="white" stopOpacity={0} />
          <stop offset="100%" stopColor="black" stopOpacity={0.45} />
        </radialGradient>
      </defs>
      <path d={shapes.sphere} className="fill-map-ocean" />
      <path
        d={shapes.graticule}
        className="fill-none stroke-map-grid"
        strokeWidth={0.4}
      />
      <path d={shapes.land} className="fill-primary/80" />
      <path d={shapes.sphere} fill="url(#globe-shade)" />
      <path
        d={shapes.sphere}
        className="fill-none stroke-header-foreground/70"
        strokeWidth={1.5}
      />
    </svg>
  )
}
