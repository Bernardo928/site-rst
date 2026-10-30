import { lazy, Suspense, useEffect, useState } from 'react'
import Logo from './Logo'
import Cane from './Cane'
import { menu } from '../data/site'

const Glass3D = lazy(() => import('./Glass3D'))

// O 3D só entra em telas grandes, sem economia de dados e sem redução de movimento.
function useCan3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (conn?.saveData) return
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const update = () => setOk(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return ok
}

const featured = ['Casa Marafo', 'Abre Caminhos', 'Alma Brasileira', 'Zé do Coco']
const drinks = menu[0].groups[0].items.filter((d) => featured.includes(d.name))

export default function Drinks() {
  const can3D = useCan3D()
  return (
    <section id="drinks" aria-labelledby="drinks-title" className="grain relative overflow-hidden bg-pine py-24 text-cream lg:py-36">
      <Cane className="pointer-events-none absolute -bottom-10 -left-10 h-[110%] text-gold/10" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div className="group relative order-2 mx-auto aspect-square w-full max-w-[520px] lg:order-1">
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(198,163,106,.28),transparent)]" />
          <div className="absolute inset-0 rounded-full border border-gold/15" />
          <div className="absolute inset-[12%] rounded-full border border-dashed border-gold/20" />
          {/* o selo fica como reserva e some quando o copo 3D termina de carregar */}
          <Logo className="absolute inset-[24%] text-gold/70 transition-opacity duration-700 group-has-[[data-ready=true]]:opacity-0" />
          {can3D && (
            <Suspense fallback={null}>
              <div className="absolute inset-0" aria-hidden="true">
                <Glass3D />
              </div>
            </Suspense>
          )}
        </div>

        <div className="order-1 lg:order-2" data-reveal>
          <p className="eyebrow text-gold">Drinks autorais</p>
          <h2 id="drinks-title" className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)]">
            A cachaça no <em className="text-gold-soft italic">centro do copo.</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-cream/75">
            Carta assinada por Francini Reiter: cachaças brasileiras com infusões, fat-wash, shrubs e soda artesanal.
          </p>

          <ol className="mt-10 divide-y divide-cream/10 border-y border-cream/10" data-stagger>
            {drinks.map((d, i) => (
              <li key={d.name} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-5">
                <span className="font-serif text-sm text-gold/70">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl font-light transition-colors group-hover:text-gold-soft">{d.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/60">{d.desc}</p>
                </div>
                <span className="font-serif text-lg whitespace-nowrap text-gold-soft">R$ {d.price}</span>
              </li>
            ))}
          </ol>
          <a href="#cardapio" className="btn-ghost-light mt-10">
            Ver todos os drinks
          </a>
        </div>
      </div>
    </section>
  )
}
