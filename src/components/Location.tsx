import { useEffect, useRef, useState } from 'react'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import Logo from './Logo'
import { TikTokIcon } from './icons'
import Cane from './Cane'
import { useOpenStatus } from '../hooks/useOpenStatus'
import { site } from '../data/site'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="grain relative overflow-hidden bg-forest py-24 text-center text-cream lg:py-32">
      <Logo className="pointer-events-none absolute top-1/2 left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 text-cream/[0.04]" ring />
      <Cane className="pointer-events-none absolute -right-8 bottom-0 hidden h-[120%] text-gold/10 md:block" />
      <div className="container-x relative" data-reveal>
        <p className="eyebrow justify-center text-gold">Rua Fidalga, 23</p>
        <h2 id="cta-title" className="display mx-auto mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)]">
          Vamos viver essa <em className="text-gold-soft italic">experiência?</em>
        </h2>
        <p className="mt-6 text-lg text-cream/75">A Casa Marafo espera por você.</p>
        <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10">
          <Navigation className="size-4" /> Como chegar
        </a>
      </div>
    </section>
  )
}

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShowMap(true), { rootMargin: '300px' })
    if (mapRef.current) io.observe(mapRef.current)
    return () => io.disconnect()
  }, [])

  const { address } = site
  const status = useOpenStatus()
  return (
    <section id="contato" className="bg-paper py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow text-wine">Localização</p>
          <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)] text-forest">
            Encontre a <em className="text-wine italic">Casa Marafo.</em>
          </h2>

          <dl className="mt-10 divide-y divide-forest/10 border-y border-forest/10">
            <div className="flex gap-4 py-5">
              <dt><MapPin className="mt-0.5 size-5 text-wine" aria-label="Endereço" /></dt>
              <dd>
                {address.street} — {address.district}
                <br />
                {address.city}, {address.zip}
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt><Phone className="mt-0.5 size-5 text-wine" aria-label="Telefone" /></dt>
              <dd>
                <a href={site.phone.href} className="font-semibold text-forest underline-offset-4 hover:underline">
                  {site.phone.display}
                </a>
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt><Clock className="mt-0.5 size-5 text-wine" aria-label="Horários" /></dt>
              <dd className="w-full">
                {status && (
                <p className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.open ? 'bg-moss/15 text-moss' : 'bg-wine/10 text-wine'}`}>
                  <span className={`size-1.5 rounded-full ${status.open ? 'bg-moss' : 'bg-wine'}`} />
                  {status.label} · {status.detail}
                </p>
                )}
                <ul className="space-y-1.5">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span className="text-ink/70">{h.days}</span>
                      <span className={h.time === 'Fechado' ? 'text-ink/60' : 'font-semibold text-forest'}>{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-ink/65">Horários podem variar em feriados.</p>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-forest">
              <Navigation className="size-4" /> Abrir no Google Maps
            </a>
            <a href={site.phone.href} className="btn-ghost-dark">
              <Phone className="size-4" /> Ligar
            </a>
            <a href={site.links.tiktok} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark" aria-label="TikTok @casamarafo">
              <TikTokIcon className="size-4" /> TikTok
            </a>
          </div>
        </div>

        <div ref={mapRef} className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-cream ring-1 ring-forest/10 lg:col-span-7" data-reveal>
          {showMap ? (
            <iframe
              title="Mapa: Casa Marafo, Rua Fidalga 23, Pinheiros"
              src={site.links.mapEmbed}
              className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-forest/40">
              <MapPin className="size-10" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
