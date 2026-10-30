import { useState } from 'react'
import { FileText, Leaf } from 'lucide-react'
import Lightbox, { type LightboxItem } from './Lightbox'
import { menu, site } from '../data/site'
import type { ImageKey } from './Picture'

const pages: LightboxItem[] = menu.map((c) => ({
  name: c.page as ImageKey,
  alt: `Cardápio oficial da Casa Marafo — ${c.label}`,
}))

export default function MenuSection() {
  const [tab, setTab] = useState(0)
  const [page, setPage] = useState<number | null>(null)
  const cat = menu[tab]

  return (
    <section id="cardapio" className="bg-paper py-24 lg:py-36">
      <div className="container-x">
        <div className="text-center" data-reveal>
          <p className="eyebrow justify-center text-wine">Cardápio</p>
          <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)] text-forest">
            Para beber, petiscar <em className="text-wine italic">e dividir.</em>
          </h2>
        </div>

        <div role="tablist" aria-label="Categorias do cardápio" className="-mx-4 mt-12 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:justify-center [scrollbar-width:none]">
          {menu.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={i === tab}
              aria-controls="menu-panel"
              onClick={() => setTab(i)}
              className={`shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                i === tab ? 'bg-forest text-cream' : 'border border-forest/15 text-forest/75 hover:border-forest/50 hover:text-forest'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`} key={cat.id} className="mx-auto mt-12 max-w-5xl" style={{ animation: 'rise .7s var(--ease-soft) both' }}>
          {cat.groups.map((g) => (
            <div key={g.title} className="mb-14 last:mb-0">
              <div className="mb-6 flex flex-col gap-1 border-b border-forest/15 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="font-serif text-2xl text-forest">{g.title}</h3>
                {g.note && <p className="font-serif text-sm text-wine italic">{g.note}</p>}
              </div>
              <ul className="grid gap-x-14 gap-y-6 md:grid-cols-2">
                {g.items.map((it) => (
                  <li key={it.name} className="group">
                    <div className="flex items-baseline gap-3">
                      <span className="font-semibold tracking-wide text-wine uppercase transition-colors group-hover:text-forest">{it.name}</span>
                      {it.vegan && (
                        <span title="Opção vegana" className="text-moss">
                          <Leaf className="size-3.5" aria-label="vegano" />
                        </span>
                      )}
                      <span className="flex-1 border-b border-dotted border-forest/25" aria-hidden="true" />
                      <span className="font-serif text-lg whitespace-nowrap text-forest">R$ {it.price}</span>
                    </div>
                    {it.desc && <p className="mt-1 text-sm leading-relaxed text-ink/60">{it.desc}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => setPage(tab)} className="btn-ghost-dark">
            <FileText className="size-4" /> Ver página original: {cat.label}
          </button>
          {site.links.canvaMenu && (
            <a href={site.links.canvaMenu} target="_blank" rel="noopener noreferrer" className="btn-forest">
              Cardápio completo no Canva ↗
            </a>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-ink/65">
          <Leaf className="inline size-3" /> opção vegana · Preços em reais, sujeitos a alteração. Consulte disponibilidade na casa.
        </p>
      </div>
      <Lightbox items={pages} index={page} onChange={setPage} />
    </section>
  )
}
