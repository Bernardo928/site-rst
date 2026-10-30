import { useState, type CSSProperties } from 'react'
import { Expand } from 'lucide-react'
import Picture from './Picture'
import Lightbox, { type LightboxItem } from './Lightbox'
import { TikTokIcon } from './icons'
import images from '../data/images.json'
import { site } from '../data/site'

// Para ampliar a galeria: coloque a foto em assets-src/photos, rode `npm run images`
// e acrescente um item aqui.
const photos: LightboxItem[] = [
  { name: 'detalhe-letreiro', alt: 'Janela do mezanino com o letreiro vermelho da Casa Marafo', caption: 'O letreiro que acende a Rua Fidalga.' },
  { name: 'detalhe-porta', alt: 'Porta de entrada com a cana-de-açúcar gravada no vidro', caption: 'A cana gravada na porta — de onde vem a cachaça.' },
  { name: 'detalhe-samambaias', alt: 'Samambaias suspensas e varal de lâmpadas no quintal', caption: 'Samambaias e luzes no quintal.' },
  { name: 'detalhe-ripado', alt: 'Marquise de ripado de madeira iluminada por baixo', caption: 'O ripado de madeira que abraça a fachada.' },
]

// Galeria "justificada": cada linha tem altura única e cada foto ocupa largura
// proporcional ao seu formato — nenhuma foto é esticada além do tamanho original.
const rows: (number | 'tiktok')[][] = [[0, 1, 2], [3, 'tiktok']]
const TIKTOK_RATIO = 2.2
const ratio = (i: number) => images[photos[i].name].w / images[photos[i].name].h

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className="bg-cream py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end" data-reveal>
          <div>
            <p className="eyebrow text-wine">Galeria</p>
            <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)] text-forest">
              Um pouco da nossa <em className="text-wine italic">atmosfera.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink/70 md:justify-self-end">
            Luz baixa, madeira, plantas e a cana-de-açúcar nos detalhes. Toque numa foto para ver maior.
          </p>
        </div>

        <div className="mt-14 space-y-4" data-stagger>
          {rows.map((row, r) => (
            <ul key={r} className="flex flex-col gap-4 sm:flex-row">
              {row.map((cell) => {
                const ar = cell === 'tiktok' ? TIKTOK_RATIO : ratio(cell)
                const style = { '--ar': ar, aspectRatio: String(ar) } as CSSProperties
                if (cell === 'tiktok')
                  return (
                    <li key="tiktok" style={style} className="sm:flex-[var(--ar)_1_0%]">
                      <a
                        href={site.links.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grain group flex h-full flex-col justify-between overflow-hidden rounded-[18px] bg-forest p-6 text-cream transition-colors duration-500 hover:bg-moss"
                      >
                        <TikTokIcon className="size-7 text-gold" />
                        <div>
                          <p className="font-serif text-2xl font-light">Mais da casa no TikTok</p>
                          <p className="mt-1 text-sm text-cream/65">Vídeos de samba e drinks em @casamarafo ↗</p>
                        </div>
                      </a>
                    </li>
                  )
                const p = photos[cell]
                return (
                  <li key={p.name} style={style} className={`sm:flex-[var(--ar)_1_0%] ${ar < 1 ? 'mx-auto w-2/3 sm:mx-0 sm:w-auto' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setIndex(cell)}
                      aria-label={`Ver maior: ${p.alt}`}
                      className="group relative block h-full w-full overflow-hidden rounded-[18px] bg-forest"
                    >
                      <Picture
                        name={p.name}
                        alt={p.alt}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="block h-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-(--ease-soft) group-hover:scale-[1.05]"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/80 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="font-serif text-sm text-cream italic">{p.caption}</span>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-forest">
                          <Expand className="size-4" />
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </div>
      <Lightbox items={photos} index={index} onChange={setIndex} />
    </section>
  )
}
