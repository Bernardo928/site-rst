import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Picture, { type ImageKey } from './Picture'

export type LightboxItem = { name: ImageKey; alt: string; caption?: string }

type Props = {
  items: LightboxItem[]
  index: number | null
  onChange: (i: number | null) => void
}

export default function Lightbox({ items, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const open = index !== null
  const go = (d: number) => index !== null && onChange((index + d + items.length) % items.length)

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prevFocus?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index])

  if (!open) return null
  const item = items[index]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-cream backdrop-blur-sm"
      style={{ animation: 'rise .5s var(--ease-soft) both' }}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="text-xs tracking-[0.3em] text-cream/60">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" onClick={() => onChange(null)} aria-label="Fechar" className="grid size-11 place-items-center rounded-full border border-cream/25 transition hover:border-gold hover:text-gold">
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
        <Picture
          key={item.name}
          name={item.name}
          alt={item.alt}
          sizes="90vw"
          className="contents"
          imgClassName="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Imagem anterior" className="absolute left-2 grid size-12 place-items-center rounded-full bg-ink/60 ring-1 ring-cream/20 transition hover:bg-gold hover:text-forest sm:left-6">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próxima imagem" className="absolute right-2 grid size-12 place-items-center rounded-full bg-ink/60 ring-1 ring-cream/20 transition hover:bg-gold hover:text-forest sm:right-6">
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <p className="px-6 py-5 text-center font-serif text-lg font-light italic text-cream/85">{item.caption ?? item.alt}</p>
    </div>,
    document.body,
  )
}
