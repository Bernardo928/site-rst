import { ArrowDown, Star } from 'lucide-react'
import Picture from './Picture'
import { site } from '../data/site'
import { menuHref, menuLinkProps, openMenu } from '../lib/menu'
import { useOpenStatus } from '../hooks/useOpenStatus'

const lines = [
  { text: 'Uma experiência', em: false },
  { text: 'que merece', em: true },
  { text: 'ser vivida.', em: false },
]

const ticker = ['Samba ao vivo', 'Drinks autorais de cachaça', 'Porções para dividir', 'Quintal verde', 'Rua Fidalga, 23']

export default function Hero() {
  const status = useOpenStatus()

  return (
    <section id="inicio" className="grain relative overflow-hidden bg-forest text-cream">
      <div className="container-x grid min-h-[100svh] items-center gap-10 pt-28 pb-28 lg:grid-cols-12 lg:pb-32">
        <div className="relative z-10 lg:col-span-7">
          <p className="rise flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold tracking-[0.28em] uppercase" style={{ animationDelay: '.05s' }}>
            <span className="text-gold">Pinheiros · São Paulo</span>
            {/* reserva o espaço antes do status chegar, para não empurrar o título */}
            <a
              href="#contato"
              className={`inline-flex items-center gap-2 rounded-full border border-cream/20 bg-forest/40 px-3 py-1.5 tracking-[0.14em] backdrop-blur-sm transition-[opacity,border-color] duration-500 hover:border-gold ${status ? '' : 'opacity-0'}`}
            >
              <span className={`relative size-2 rounded-full ${status?.open ? 'bg-emerald-400' : 'bg-cream/40'}`}>
                {status?.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />}
              </span>
              {status?.label ?? 'Horário'}
              <span className="font-normal tracking-normal text-cream/65 normal-case">· {status?.detail ?? 'qua a sáb, a partir das 17h'}</span>
            </a>
          </p>

          <h1 className="display mt-7 text-[clamp(2.9rem,7.6vw,7.2rem)] uppercase" aria-label="Uma experiência que merece ser vivida.">
            {lines.map((l, i) => (
              <span key={l.text} className="line" aria-hidden="true">
                <span style={{ animationDelay: `${0.05 + i * 0.08}s` }} className={l.em ? 'font-normal text-gold-soft italic' : ''}>
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="rise mt-8 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg" style={{ animationDelay: '.55s' }}>
            Música, sabores, encontros e boas histórias no coração de Pinheiros.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '.7s' }}>
            <a href="#sobre" className="btn-gold">
              Conheça a Casa
            </a>
            <a href={menuHref} onClick={openMenu} className="btn-ghost-light" {...menuLinkProps}>
              Explore o cardápio
            </a>
          </div>

          <a
            href="#avaliacoes"
            className="rise mt-12 inline-flex items-center gap-3 text-sm text-cream/75 transition-colors hover:text-cream"
            style={{ animationDelay: '.85s' }}
          >
            <span className="flex text-gold" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-cream">{site.rating.value}</strong> de 5 · {site.rating.count} avaliações
            </span>
          </a>
        </div>

        {/* Uma única foto: fundo no mobile, arco emoldurado no desktop. */}
        <div className="lg:relative lg:col-span-5">
          <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:ml-auto lg:aspect-[1215/1760] lg:max-h-[78vh] lg:rounded-t-[999px] lg:rounded-b-[32px]">
            <Picture
              name="fachada-noite"
              alt="Fachada da Casa Marafo à noite: letreiro vermelho, marquise de madeira iluminada e o balcão aberto para a Rua Fidalga"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="block h-full"
              imgClassName="h-full w-full object-cover object-[50%_70%] lg:object-[50%_62%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/85 via-forest/75 to-forest lg:bg-none lg:bg-gradient-to-t lg:from-forest/50 lg:via-transparent lg:to-transparent" />
            <div className="pointer-events-none absolute inset-3 hidden rounded-t-[999px] rounded-b-[24px] border border-gold/40 lg:block" />
          </div>
          <p className="rise absolute bottom-6 left-0 hidden -translate-x-1/3 rotate-[-6deg] rounded-full bg-wine px-6 py-3 font-serif text-lg text-cream italic shadow-[0_20px_40px_-15px_rgba(0,0,0,.6)] lg:block" style={{ animationDelay: '1s' }}>
            da cana ao copo
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-gold/25 bg-forest/85 py-4 backdrop-blur-sm" aria-hidden="true">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] text-[0.72rem] tracking-[0.3em] text-gold-soft uppercase">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 whitespace-nowrap">
              {t} <span className="text-gold/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      <a
        href="#destaques"
        aria-label="Ir para os destaques"
        className="absolute right-6 bottom-20 hidden size-12 place-items-center rounded-full border border-cream/25 text-cream/70 transition hover:border-gold hover:text-gold md:grid"
      >
        <ArrowDown className="size-4" />
      </a>
    </section>
  )
}
