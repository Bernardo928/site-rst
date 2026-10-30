import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Picture, { type ImageKey } from './Picture'

type Panel = {
  n: string
  title: string
  text: string
  cta: string
  href: string
  image?: { name: ImageKey; alt: string }
  art?: ReactNode
}

// Sem foto real de show disponível: composição gráfica em vez de imagem inventada.
const SambaArt = (
  <div className="grain absolute inset-0 overflow-hidden bg-wine">
    <div className="absolute -top-1/4 -right-1/4 size-[120%] rounded-full border border-gold/20" />
    <div className="absolute -top-[10%] -right-[10%] size-[90%] rounded-full border border-gold/15" />
    <div className="absolute inset-x-8 bottom-10 flex h-[38%] items-end justify-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 26 }, (_, i) => (
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
    <p className="absolute top-8 left-8 font-serif text-7xl leading-none font-light text-cream/90 italic">samba</p>
  </div>
)

const panels: Panel[] = [
  {
    n: '01',
    title: 'Drinks',
    text: 'Drinks especiais e experiências de sabores, com a cachaça como protagonista.',
    cta: 'Conhecer os drinks',
    href: '#drinks',
    image: { name: 'drink-cafe', alt: 'Drink com espuma, grão de café e chapéu de palha trançada sobre mesa de madeira' },
  },
  {
    n: '02',
    title: 'Samba e música',
    text: 'Música ao vivo e noites animadas na Rua Fidalga.',
    cta: 'Ver no TikTok',
    href: '#tiktok',
    art: SambaArt,
  },
  {
    n: '03',
    title: 'Gastronomia',
    text: 'Comidas e porções para compartilhar — do torresmo ao hambúrguer angus.',
    cta: 'Abrir o cardápio',
    href: '#cardapio',
    image: { name: 'burger-fritas', alt: 'Hambúrguer angus com queijo, alface e tomate, fritas e ketchup no papel estampado Marafo' },
  },
  {
    n: '04',
    title: 'Acolhimento',
    text: 'Um ambiente aberto, acolhedor e inclusivo. Todo mundo é bem-vindo.',
    cta: 'Como chegar',
    href: '#contato',
    image: { name: 'detalhe-balcao', alt: 'Balcão da Casa Marafo aberto para a rua, com luz quente, banco de madeira e cortina de contas' },
  },
]

export default function Experiences() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  // Desktop: a seção fixa e os painéis correm na horizontal conforme a rolagem.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false
    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const el = track.current!
        const distance = () => Math.max(0, el.scrollWidth - section.current!.clientWidth)
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
      })
      ctx = mm
      // os demais gatilhos da página precisam recalcular contando o espaço do pin
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={section} id="experiencias" className="grain overflow-hidden bg-forest py-24 text-cream lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
        <div>
          <p className="eyebrow text-gold">Experiências</p>
          <h2 className="display mt-6 max-w-2xl text-[clamp(2.3rem,4.6vw,4rem)]">
            O que faz a Casa Marafo ser <em className="text-gold-soft italic">única.</em>
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-cream/60 lg:block">Continue rolando para ver as quatro.</p>
      </div>

      <ul
        ref={track}
        className="container-x mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:flex lg:w-auto lg:max-w-none lg:gap-6 lg:pr-[10vw] lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
      >
        {panels.map((p) => (
          <li key={p.title} className="lg:w-[min(46vw,680px)] lg:shrink-0">
            <a
              href={p.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[24px] ring-1 ring-cream/10 transition-shadow duration-700 hover:ring-gold/50 lg:aspect-[16/11]"
            >
              {p.image ? (
                <Picture
                  name={p.image.name}
                  alt={p.image.alt}
                  sizes="(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0"
                  imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-(--ease-soft) group-hover:scale-[1.06]"
                />
              ) : (
                p.art
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="text-xs tracking-[0.3em] text-gold">{p.n} / 04</span>
                  <h3 className="mt-2 font-serif text-3xl font-light uppercase sm:text-4xl">{p.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/75">{p.text}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-soft">
                  {p.cta}
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
