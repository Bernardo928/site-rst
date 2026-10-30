import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowDown, Star } from 'lucide-react'
import Picture from './Picture'
import { site } from '../data/site'
import { menuHref, openMenu } from '../lib/menu'

const Glass3D = lazy(() => import('./Glass3D'))

// Só carrega o 3D em telas grandes, sem economia de dados e sem redução de movimento.
function useCan3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData || /2g/.test(conn?.effectiveType ?? '')
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    if (slow) return
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600))
    const update = () => idle(() => setOk(mq.matches))
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return ok
}

export default function Hero() {
  const can3D = useCan3D()

  return (
    <section id="inicio" className="grain relative overflow-hidden bg-forest text-cream">
      <div className="container-x grid min-h-[100svh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-32 lg:pb-24">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow rise text-gold" style={{ animationDelay: '.1s' }}>
            Pinheiros · São Paulo
          </p>
          <h1 className="display rise mt-6 text-[clamp(2.7rem,7.4vw,6.6rem)] uppercase" style={{ animationDelay: '.2s' }}>
            Uma experiência <em className="font-normal text-gold-soft italic">que merece</em> ser vivida.
          </h1>
          <p className="rise mt-7 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg" style={{ animationDelay: '.35s' }}>
            Música, sabores, encontros e boas histórias no coração de Pinheiros.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '.5s' }}>
            <a href="#sobre" className="btn-gold">
              Conheça a Casa
            </a>
            <a href={menuHref} onClick={openMenu} className="btn-ghost-light" {...(site.links.canvaMenu ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              Explore o cardápio
            </a>
          </div>

          <dl className="rise mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-cream/15 pt-7 text-sm" style={{ animationDelay: '.65s' }}>
            <div>
              <dt className="sr-only">Avaliação</dt>
              <dd className="flex items-center gap-2">
                <span className="flex text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="font-semibold">{site.rating.value}</span>
                <span className="text-cream/60">· {site.rating.count} avaliações</span>
              </dd>
            </div>
            <div>
              <dt className="text-cream/50">Endereço</dt>
              <dd>{site.address.street}</dd>
            </div>
            <div>
              <dt className="text-cream/50">Horário</dt>
              <dd>Qua a sáb · a partir das 17h</dd>
            </div>
          </dl>
        </div>

        {/* uma única foto: fundo no mobile, coluna emoldurada em arco no desktop */}
        <div className="lg:relative">
          <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:mx-auto lg:aspect-[1215/1780] lg:max-h-[78vh] lg:rounded-t-[999px] lg:rounded-b-[28px] lg:ring-1 lg:ring-gold/30">
            <Picture
              name="fachada-noite"
              alt="Fachada da Casa Marafo à noite, com o letreiro vermelho, o ripado de madeira iluminado e o balcão aberto para a Rua Fidalga"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="block h-full"
              imgClassName="h-full w-full object-cover object-[50%_70%] lg:scale-[1.04] lg:object-[50%_62%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/85 via-forest/75 to-forest lg:bg-none lg:bg-gradient-to-t lg:from-forest/45 lg:via-transparent lg:to-transparent" />
          </div>
          <div className="absolute -bottom-10 -left-20 hidden size-[260px] lg:block xl:-left-28 xl:size-[300px]" aria-hidden="true">
            {can3D && (
              <Suspense fallback={null}>
                <Glass3D />
              </Suspense>
            )}
          </div>
        </div>
      </div>

      <a
        href="#destaques"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-cream/60 uppercase transition-colors hover:text-gold md:flex"
      >
        Role
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  )
}
