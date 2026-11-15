import { useEffect, useRef } from 'react'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  type ChartConfiguration,
} from 'chart.js'

import type { ChartSpec } from '@/data/types'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
)

/** Series colours per chart type, taken from the wireframe. */
const PALETTES: Record<ChartSpec['type'], string[]> = {
  area: ['#6aa874', '#1f78c1', '#e0b04a', '#c95fd1'],
  line: ['#8fe39a', '#d33fd8', '#3d9dc5', '#e0b04a'],
  bar: ['#2f2b3a', '#0f9b6c', '#3d9dc5', '#e0b04a'],
}

const GRID = 'rgba(255, 255, 255, 0.35)'
const TICK = 'rgba(255, 255, 255, 0.9)'

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

function buildConfig(spec: ChartSpec): ChartConfiguration {
  const palette = PALETTES[spec.type]
  const color = (i: number) => palette[i % palette.length]
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const datasets = spec.series.map((s, i) => {
    if (spec.type === 'bar') {
      return {
        type: 'bar' as const,
        label: s.label,
        data: s.data,
        backgroundColor: color(i),
        borderColor: withAlpha('#ffffff', 0.25),
        borderWidth: 1,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      }
    }
    const area = spec.type === 'area'
    return {
      type: 'line' as const,
      label: s.label,
      data: s.data,
      borderColor: color(i),
      backgroundColor: area ? withAlpha(color(i), 0.6) : color(i),
      fill: area ? 'origin' : false,
      tension: 0,
      borderWidth: area ? 1 : 1.5,
      pointRadius: area ? 2.5 : 4,
      pointHoverRadius: 6,
      pointBackgroundColor: area ? color(i) : '#ffffff',
      pointBorderColor: color(i),
      pointBorderWidth: 2,
    }
  })

  return {
    type: spec.type === 'bar' ? 'bar' : 'line',
    data: { labels: spec.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: reduceMotion ? false : { duration: 600 },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: TICK,
            boxWidth: 12,
            boxHeight: 12,
            font: { family: 'Inter, sans-serif', size: 12 },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(10, 14, 30, 0.92)',
          borderColor: GRID,
          borderWidth: 1,
          titleFont: { family: 'JetBrains Mono, monospace', size: 11 },
          bodyFont: { family: 'Inter, sans-serif', size: 12 },
        },
      },
      scales: {
        x: {
          grid: { color: GRID, drawTicks: true },
          border: { color: GRID },
          ticks: { color: TICK, font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: GRID },
          border: { color: GRID },
          ticks: { color: TICK, font: { size: 11 }, maxTicksLimit: 5 },
        },
      },
    },
  } as ChartConfiguration
}

/** Renders a ChartSpec with Chart.js. Runs only in the browser. */
export function StatChart({ spec }: { spec: ChartSpec }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const chart = new Chart(canvasRef.current, buildConfig(spec))
    return () => chart.destroy()
  }, [spec])

  const summary = spec.series
    .map((s) => `${s.label}: ${s.data.join(', ')}`)
    .join('. ')

  return (
    <div className="relative h-72 w-full sm:h-80">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${spec.title}. ${summary}`}
      />
    </div>
  )
}
