import { ArrowRight, MapPin, X } from 'lucide-react'

import type { Site } from '@/data/types'

interface InfoCardProps {
  site: Site
  onClose: () => void
  onNext: () => void
}

const iconButton =
  'grid size-8 shrink-0 place-items-center transition-[filter,background-color] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none motion-reduce:transition-none'

export function InfoCard({ site, onClose, onNext }: InfoCardProps) {
  return (
    <aside
      aria-labelledby="card-title"
      className="flex h-full flex-col border border-foreground/15 bg-card p-1 pb-4 text-card-foreground animate-in fade-in slide-in-from-right-4 duration-300 motion-reduce:animate-none"
    >
      <header className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close card"
          className={`${iconButton} bg-destructive text-destructive-foreground`}
        >
          <X className="size-4" />
        </button>
        <div className="min-w-0 flex-1 pt-2 text-center">
          <h3
            id="card-title"
            className="font-display text-xl font-bold leading-tight"
          >
            {site.name}
          </h3>
          <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" aria-hidden />
            {site.location}
          </p>
          <div className="mx-auto mt-2 h-px w-2/3 bg-card-foreground/70" />
        </div>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next observatory"
          className={`${iconButton} bg-primary text-primary-foreground`}
        >
          <ArrowRight className="size-4" />
        </button>
      </header>

      <dl className="mt-4 flex flex-1 flex-col justify-around gap-4 px-3 text-center">
        {site.fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <dt className="font-display text-xl font-bold">{field.label}</dt>
            <dd className="font-mono text-sm text-primary">{field.info}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">
              {field.addDataLabel ?? 'Add data'}:
            </dd>
            <dd className="font-mono text-xs">{field.addData}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export function EmptyCard({
  sites,
  onSelect,
}: {
  sites: Site[]
  onSelect: (id: string) => void
}) {
  return (
    <aside className="flex h-full flex-col border border-foreground/15 bg-card p-5 text-card-foreground">
      <h3 className="text-center font-display text-xl font-bold">Card</h3>
      <div className="mx-auto mt-2 h-px w-2/3 bg-card-foreground/70" />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Select an observatory on the map, or pick one below.
      </p>
      <ul className="mt-4 flex flex-col gap-1">
        {sites.map((site) => (
          <li key={site.id}>
            <button
              type="button"
              onClick={() => onSelect(site.id)}
              className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span>{site.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {site.fields[0]?.info}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
