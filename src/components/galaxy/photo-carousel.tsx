import { useState } from 'react'
import { ArrowLeft, ArrowRight, ImageOff } from 'lucide-react'

import { imageUrl } from '@/data/api'
import type { Photo } from '@/data/types'
import { cn } from '@/lib/utils'

interface PhotoCarouselProps {
  title: string
  photos: Photo[]
  /** Hide the thumbnail strip (for small overlays). */
  compact?: boolean
}

export function PhotoCarousel({
  title,
  photos,
  compact = false,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-md bg-muted text-muted-foreground">
        <ImageOff className="size-6" aria-hidden />
        <span className="text-xs">No photos yet</span>
      </div>
    )
  }

  const current = photos[index % photos.length]
  const go = (delta: number) =>
    setIndex((i) => (i + delta + photos.length) % photos.length)

  return (
    <figure
      className="flex flex-col gap-3"
      aria-roledescription="carousel"
      aria-label={`${title} photos`}
    >
      <figcaption className="flex items-baseline justify-between gap-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        <span className="truncate text-foreground">{title}</span>
        <span className="shrink-0">
          {index + 1} / {photos.length}
        </span>
      </figcaption>

      <div className="relative overflow-hidden rounded-md bg-muted">
        <img
          key={current.src}
          src={imageUrl(current.src, 720)}
          alt={current.alt}
          width={720}
          height={540}
          className="aspect-[4/3] w-full object-cover animate-in fade-in duration-300 motion-reduce:animate-none"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute top-1/2 left-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      {!compact && (
        <div className="grid grid-cols-4 gap-2">
          {photos.slice(0, 4).map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}: ${photo.alt}`}
              aria-current={i === index}
              className={cn(
                'overflow-hidden rounded-sm ring-2 ring-transparent transition focus-visible:outline-none focus-visible:ring-ring',
                i === index ? 'ring-primary' : 'opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={imageUrl(photo.src, 160)}
                alt=""
                width={160}
                height={120}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  )
}
