import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

import type { ChartSpec } from '@/data/types'
import { StatChart } from './stat-chart'

/** The stack of statistics charts under the map, separated by thin rules. */
export function ChartsSection({ charts }: { charts: ChartSpec[] }) {
  return (
    <section
      className="starfield-charts px-4 pt-8 pb-24 sm:px-6"
      aria-label="Statistics"
    >
      {charts.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No statistics available yet.
        </p>
      ) : (
        charts.map((chart, i) => (
          <article
            key={chart.id}
            aria-labelledby={`chart-${chart.id}`}
            className={
              i > 0 ? 'mt-8 border-t border-foreground/60 pt-8' : undefined
            }
          >
            <h3
              id={`chart-${chart.id}`}
              className="text-center font-display text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {chart.title}
            </h3>
            <div className="mx-auto mt-6 max-w-3xl">
              <StatChart spec={chart} />
            </div>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-snug text-foreground/90">
              {chart.description}
            </p>
          </article>
        ))
      )}
    </section>
  )
}

/** Fixed "Go up" button that appears once the user scrolls down. */
export function GoUpButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goUp = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={goUp}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-4 z-50 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition-opacity duration-200 hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none sm:right-6 sm:bottom-6 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUp className="size-4" aria-hidden />
      Go up
    </button>
  )
}
