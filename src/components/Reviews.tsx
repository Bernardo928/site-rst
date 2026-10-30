import { Quote, Star } from 'lucide-react'
import { reviews, site } from '../data/site'

const Stars = () => (
  <span className="flex gap-0.5 text-gold" aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className="size-4 fill-current" />
    ))}
  </span>
)

export default function Reviews() {
  return (
    <section id="avaliacoes" className="grain overflow-hidden bg-wine-deep py-24 text-cream lg:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow text-gold">Avaliações</p>
          <h2 className="display mt-6 text-[clamp(2.3rem,4.4vw,3.6rem)]">O que nossos visitantes dizem.</h2>
          <div className="mt-10 flex items-end gap-5">
            <span className="font-serif text-[6.5rem] leading-[0.8] font-light text-gold-soft">{site.rating.value}</span>
            <div className="pb-1">
              <Stars />
              <p className="mt-2 text-sm text-cream/70">
                de 5 · {site.rating.count} avaliações
              </p>
            </div>
          </div>
          <a href={site.links.maps} target="_blank" rel="noopener noreferrer" className="btn-ghost-light mt-10">
            Ver no Google Maps ↗
          </a>
        </div>

        <ul className="grid gap-5 lg:col-span-8 lg:grid-cols-2" data-stagger>
          {reviews.map((text, i) => (
            <li
              key={i}
              className={`group relative flex flex-col justify-between rounded-[22px] border border-cream/12 bg-cream/[0.04] p-8 transition-colors duration-500 hover:border-gold/50 hover:bg-cream/[0.07] ${
                i === 0 ? 'lg:row-span-2 lg:p-10' : ''
              }`}
            >
              <Quote className="size-8 text-gold/60 transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.2} />
              <blockquote className={`mt-6 font-serif leading-snug font-light ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'}`}>
                “{text}”
              </blockquote>
              <p className="mt-8 border-t border-cream/10 pt-5 text-xs tracking-[0.2em] text-cream/55 uppercase">Visitante da casa</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
