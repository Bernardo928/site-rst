import { useState } from 'react'
import { Expand } from 'lucide-react'
import Picture from './Picture'
import Lightbox, { type LightboxItem } from './Lightbox'
import { TikTokIcon } from './icons'
import { site } from '../data/site'

// Para ampliar a galeria: coloque a foto em assets-src/photos, rode `npm run images`
// e acrescente um item aqui.
const photos: (LightboxItem & { tile: string })[] = [
  {
    name: 'detalhe-letreiro',
    alt: 'Janela do mezanino com o letreiro vermelho da Casa Marafo',
    caption: 'O letreiro que acende a Rua Fidalga.',
    tile: 'sm:col-span-4 sm:row-span-2 aspect-[610/280] sm:aspect-auto',
  },
  {
    name: 'detalhe-porta',
    alt: 'Porta de entrada com a cana-de-açúcar gravada no vidro',
    caption: 'A cana gravada na porta — de onde vem a cachaça.',
    tile: 'sm:col-span-2 sm:row-span-4 aspect-[230/500] sm:aspect-auto',
  },
  {
    name: 'detalhe-samambaias',
    alt: 'Samambaias suspensas e varal de lâmpadas no quintal',
    caption: 'Samambaias e luzes no quintal.',
    tile: 'sm:col-span-2 sm:row-span-2 aspect-[760/340] sm:aspect-auto',
  },
  {
    name: 'detalhe-ripado',
    alt: 'Marquise de ripado de madeira iluminada por baixo',
    caption: 'O ripado de madeira que abraça a fachada.',
    tile: 'sm:col-span-2 sm:row-span-2 aspect-[1215/250] sm:aspect-auto',
  },
]

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
          <p className="max-w-md text-ink/65 md:justify-self-end">
            Luz quente, madeira, verde e a cana-de-açúcar em cada detalhe. Toque numa foto para ampliar.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:auto-rows-[90px] sm:grid-cols-6 lg:auto-rows-[110px]" data-stagger>
          {photos.map((p, i) => (
            <li key={p.name} className={p.tile}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ampliar: ${p.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-[18px] bg-forest"
              >
                <Picture
                  name={p.name}
                  alt={p.alt}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="block h-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-(--ease-soft) group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/25" />
                <span className="absolute right-4 bottom-4 grid size-10 scale-75 place-items-center rounded-full bg-cream text-forest opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" />
                </span>
              </button>
            </li>
          ))}
          <li className="aspect-[2/1] sm:col-span-6 sm:row-span-2 sm:aspect-auto">
            <a
              href={site.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="grain group relative flex h-full flex-col justify-between overflow-hidden rounded-[18px] bg-forest p-6 text-cream transition-colors duration-500 hover:bg-moss"
            >
              <TikTokIcon className="size-7 text-gold" />
              <div>
                <p className="font-serif text-2xl font-light sm:text-3xl">Mais momentos no TikTok</p>
                <p className="mt-1 text-sm text-cream/60">@casamarafo ↗</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <Lightbox items={photos} index={index} onChange={setIndex} />
    </section>
  )
}
