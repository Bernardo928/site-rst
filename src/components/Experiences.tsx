import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Picture, { type ImageKey } from './Picture'
import Logo from './Logo'

type Card = {
  n: string
  title: string
  text: string
  href: string
  image?: { name: ImageKey; alt: string }
  art?: ReactNode
}

// Sem foto real de show disponível: composição gráfica em vez de imagem inventada.
const SambaArt = (
  <div className="grain absolute inset-0 overflow-hidden bg-wine">
    <div className="absolute -top-1/4 -right-1/4 size-[120%] rounded-full border border-gold/20" />
    <div className="absolute -top-[10%] -right-[10%] size-[90%] rounded-full border border-gold/15" />
    <div className="absolute inset-x-8 top-1/2 flex h-28 -translate-y-1/2 items-end justify-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={i}
          className="w-1.5 origin-bottom rounded-full bg-gold/80"
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            animation: `eq ${0.9 + ((i * 13) % 7) / 10}s ease-in-out ${(i % 5) * 0.12}s infinite`,
          }}
        />
      ))}
    </div>
    <p className="absolute top-8 left-8 font-serif text-6xl leading-none font-light text-cream/90 italic">samba</p>
  </div>
)

const cards: Card[] = [
  {
    n: '01',
    title: 'Drinks',
    text: 'Drinks especiais e experiências de sabores.',
    href: '#cardapio',
    image: { name: 'drink-cafe', alt: 'Drink autoral com espuma, grão de café e chapéu de palha trançada sobre mesa de madeira' },
  },
  {
    n: '02',
    title: 'Samba e música',
    text: 'Música ao vivo e noites animadas.',
    href: '#tiktok',
    art: SambaArt,
  },
  {
    n: '03',
    title: 'Gastronomia',
    text: 'Comidas e porções para compartilhar.',
    href: '#cardapio',
    image: { name: 'burger-fritas', alt: 'Hambúrguer angus com queijo, alface e tomate, fritas e ketchup no papel estampado Marafo' },
  },
  {
    n: '04',
    title: 'Acolhimento',
    text: 'Um ambiente aberto, acolhedor e inclusivo.',
    href: '#contato',
    image: { name: 'detalhe-balcao', alt: 'Balcão da Casa Marafo aberto para a rua, com luz quente, banco de madeira e cortina de contas' },
  },
]

export default function Experiences() {
  return (
    <section id="experiencias" className="grain bg-forest py-24 text-cream lg:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow text-gold">Experiências</p>
            <h2 className="display mt-6 max-w-2xl text-[clamp(2.3rem,4.6vw,4rem)]">
              O que faz a Casa Marafo ser <em className="text-gold-soft italic">única.</em>
            </h2>
          </div>
          <Logo className="hidden size-24 shrink-0 text-gold/50 md:block" />
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {cards.map((c, i) => (
            <li key={c.title} className={i % 2 ? 'lg:mt-14' : ''}>
              <a
                href={c.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[22px] ring-1 ring-cream/10 transition-[box-shadow,transform] duration-700 ease-(--ease-soft) hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)] hover:ring-gold/50"
              >
                {c.image ? (
                  <Picture
                    name={c.image.name}
                    alt={c.image.alt}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0"
                    imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-(--ease-soft) group-hover:scale-[1.07]"
                  />
                ) : (
                  c.art
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <span className="absolute top-5 right-5 grid size-10 place-items-center rounded-full border border-cream/30 text-cream backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-forest">
                  <ArrowUpRight className="size-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs tracking-[0.3em] text-gold">{c.n}</span>
                  <h3 className="mt-2 font-serif text-3xl font-light uppercase">{c.title}</h3>
                  <p className="mt-2 max-w-[24ch] text-sm text-cream/75 transition-[opacity,transform] duration-500 lg:translate-y-2 lg:opacity-70 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    {c.text}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
