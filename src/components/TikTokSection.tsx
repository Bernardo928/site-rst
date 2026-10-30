import { useEffect, useRef, useState } from 'react'
import { TikTokIcon } from './icons'
import { site } from '../data/site'

// Incorporação oficial de perfil do TikTok (creator embed). O script só é baixado
// quando a seção se aproxima da tela, para não pesar o carregamento inicial.
export default function TikTokSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: '400px' })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!load || document.getElementById('tiktok-embed-js')) return
    const s = document.createElement('script')
    s.id = 'tiktok-embed-js'
    s.src = 'https://www.tiktok.com/embed.js'
    s.async = true
    document.body.appendChild(s)
  }, [load])

  return (
    <section id="tiktok" className="grain overflow-hidden bg-ink py-24 text-cream lg:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div data-reveal>
          <p className="eyebrow text-gold">TikTok</p>
          <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)]">
            A Casa Marafo <em className="text-gold-soft italic">em movimento.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
            Rodas de samba, drinks sendo preparados e as noites na Fidalga — acompanhe tudo no perfil oficial.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={site.links.tiktok} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <TikTokIcon className="size-4" /> Siga a Casa Marafo
            </a>
            <a href={site.links.tiktok} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
              Abrir @casamarafo ↗
            </a>
          </div>
        </div>

        <div ref={ref} className="relative mx-auto w-full max-w-[400px]" data-reveal>
          <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(198,163,106,.25),transparent)]" />
          <div className="rounded-[44px] bg-gradient-to-b from-cream/20 to-cream/5 p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]">
            <div className="relative min-h-[560px] overflow-hidden rounded-[36px] bg-white text-ink">
              {load ? (
                <blockquote
                  className="tiktok-embed !m-0 !min-w-0"
                  cite={site.links.tiktok}
                  data-unique-id="casamarafo"
                  data-embed-type="creator"
                  style={{ maxWidth: '100%', minWidth: 288 }}
                >
                  <section className="grid min-h-[540px] place-items-center p-8 text-center">
                    <a href={site.links.tiktok} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 font-semibold">
                      <TikTokIcon className="size-10" />
                      @casamarafo
                    </a>
                  </section>
                </blockquote>
              ) : (
                <div className="grid min-h-[560px] place-items-center">
                  <TikTokIcon className="size-10 animate-pulse text-ink/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
