import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { loadDashboard } from '@/data/api'
import { GlobeLogo } from '@/components/galaxy/globe-logo'
import { ChartsSection, GoUpButton } from '@/components/galaxy/charts-section'
import { EmptyCard, InfoCard } from '@/components/galaxy/info-card'
import { PhotoCarousel } from '@/components/galaxy/photo-carousel'
import { WorldMap } from '@/components/galaxy/world-map'

export const Route = createFileRoute('/')({
  loader: () => loadDashboard(),
  component: Home,
})

function Home() {
  const { overview, sites, charts, source } = Route.useLoaderData()
  const [selectedId, setSelectedId] = useState<string | null>(
    sites[0]?.id ?? null,
  )

  const selectedIndex = sites.findIndex((s) => s.id === selectedId)
  const selected = selectedIndex >= 0 ? sites[selectedIndex] : null
  const next = () => {
    if (sites.length === 0) return
    setSelectedId(sites[(selectedIndex + 1) % sites.length].id)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-header text-header-foreground">
        <div className="flex h-20 items-center gap-4 px-4 sm:gap-8 sm:px-6">
          <GlobeLogo className="size-12 shrink-0" />
          <span className="font-display text-xl tracking-tight">
            GalaxyFarm
          </span>
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-header-foreground/70">
            <span
              className={
                source === 'api'
                  ? 'size-2 rounded-full bg-emerald-400'
                  : 'size-2 rounded-full bg-primary'
              }
            />
            {source === 'api' ? 'Live data' : 'Demo data'}
          </span>
        </div>
      </header>

      <main>
        <section
          className="starfield px-4 pt-10 pb-10 sm:px-6"
          aria-labelledby="headline"
        >
          <div className="max-w-[44rem]">
            <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
              {overview.title}
            </h1>
            <p className="mt-6 text-sm leading-snug text-foreground/90 sm:text-base">
              {overview.intro}
            </p>
          </div>

          <h2
            id="headline"
            className="mt-10 font-display text-3xl font-bold tracking-tight sm:text-5xl"
          >
            {overview.headline}
          </h2>
          <p className="mt-3 font-display text-2xl font-bold text-foreground/90 sm:text-4xl">
            {overview.subheadline}
          </p>
        </section>

        <section
          className="px-4 pt-6 pb-10 sm:px-6"
          aria-labelledby="map-label"
        >
          <h3
            id="map-label"
            className="pl-6 font-display text-xl font-semibold"
          >
            {overview.mapLabel}
          </h3>
          <p className="mt-3 mb-4 font-mono text-sm text-muted-foreground">
            {overview.mapHint ??
              'Click a marker on the map to see its information'}
          </p>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8">
            <div className="relative aspect-[16/9] min-h-[20rem] overflow-hidden border border-foreground/70 bg-map-ocean lg:aspect-auto lg:min-h-[24rem]">
              {sites.length === 0 ? (
                <div className="grid h-full min-h-[20rem] place-items-center text-sm text-muted-foreground">
                  No observatories to show yet.
                </div>
              ) : (
                <>
                  <WorldMap
                    sites={sites}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                  {selected && (
                    <div className="absolute bottom-3 left-3 hidden w-52 rounded-md border border-border bg-popover/90 p-2.5 shadow-2xl backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none md:block">
                      <PhotoCarousel
                        key={selected.id}
                        title={selected.name}
                        photos={selected.photos}
                        compact
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {selected && (
                <div className="rounded-md border border-border bg-popover p-3 md:hidden">
                  <PhotoCarousel
                    key={selected.id}
                    title={selected.name}
                    photos={selected.photos}
                  />
                </div>
              )}
              <div className="min-h-[24rem] flex-1">
                {selected ? (
                  <InfoCard
                    site={selected}
                    onClose={() => setSelectedId(null)}
                    onNext={next}
                  />
                ) : (
                  <EmptyCard sites={sites} onSelect={setSelectedId} />
                )}
              </div>
            </div>
          </div>
        </section>

        <ChartsSection charts={charts} />
      </main>
      <GoUpButton />
    </div>
  )
}
