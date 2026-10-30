import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Picture from './Picture'
import Logo from './Logo'
import Cane from './Cane'
import { site } from '../data/site'

export default function About() {
  const [open, setOpen] = useState(false)

  return (
    <section id="sobre" className="relative overflow-hidden bg-paper py-24 lg:py-36">
      <Cane className="pointer-events-none absolute -top-10 right-0 hidden h-[90%] text-forest/[0.06] lg:block" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7" data-reveal>
          <div className="overflow-hidden rounded-[28px]">
            <div data-parallax="6" className="scale-[1.14]">
              <Picture
                name="jardim-logo"
                alt="Quintal da Casa Marafo: parede vinho com o selo da casa, samambaias suspensas, varal de luzes e plantas tropicais"
                sizes="(min-width: 1024px) 58vw, 100vw"
                imgClassName="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
              />
            </div>
          </div>

          <figure className="grain relative -mt-20 ml-auto w-[82%] rounded-[24px] bg-forest p-7 text-cream shadow-[0_30px_60px_-25px_rgba(16,35,29,.6)] sm:absolute sm:-right-6 sm:-bottom-14 sm:mt-0 sm:w-[min(380px,60%)] lg:-right-14">
            <Logo className="size-14 text-gold" />
            <blockquote className="mt-5 font-serif text-xl leading-snug font-light italic sm:text-2xl">
              “Da cana que brota da terra, surge a cachaça que aquece a alma.”
            </blockquote>
            <figcaption className="mt-4 text-[0.7rem] tracking-[0.24em] text-gold uppercase">Carta de drinks autorais</figcaption>
          </figure>
        </div>

        <div className="lg:col-span-5 lg:pl-10" data-reveal>
          <p className="eyebrow text-wine">Sobre a casa</p>
          <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)] text-forest">
            Mais que um bar. <em className="text-wine italic">Um lugar para se encontrar.</em>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-ink/75">
            A Casa Marafo é um espaço de acolhimento, música, gastronomia e experiências. Um lugar para reunir pessoas,
            compartilhar sabores e aproveitar bons momentos no coração de Pinheiros.
          </p>

          <div
            id="historia"
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-(--ease-soft) ${
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-4 pt-6 leading-relaxed text-ink/70">
                <p>
                  O nome vem de <strong className="font-semibold text-forest">marafo</strong>, um dos apelidos populares da
                  cachaça — e é ela a protagonista da carta de drinks autorais assinada por Francini Reiter, com rótulos
                  como Salineira, Mato Dentro e cachaça de jambu.
                </p>
                <p>
                  Na Rua Fidalga, a casa junta samba e música ao vivo, porções para dividir, lanches e um quintal verde
                  cheio de plantas. Um espaço aberto e acolhedor para todo mundo, incluindo a comunidade LGBTQ+.
                </p>
                <p className="text-sm text-ink/60">
                  {site.services.join(' · ')} · {site.priceRange}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="historia"
            className="btn-forest group mt-10"
          >
            {open ? 'Mostrar menos' : 'Conheça nossa história'}
            <ArrowRight className={`size-4 transition-transform duration-500 ${open ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>
      </div>
    </section>
  )
}
