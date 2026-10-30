import { useEffect, useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { nav, site } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  // O menu mobile fica fora do <header>: o backdrop-filter do header viraria o
  // bloco de contenção do position:fixed e encolheria o painel.
  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? 'bg-forest/92 shadow-[0_1px_0_rgba(198,163,106,.18)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-18 items-center justify-between gap-6" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-3 text-cream" onClick={() => setOpen(false)}>
          <Logo className="size-11 text-cream transition-transform duration-700 hover:rotate-[-12deg]" />
          <span className="hidden font-serif text-lg tracking-wide sm:block">
            Casa Marafo<span className="text-gold">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`group relative px-3 py-2 text-[0.8rem] font-medium tracking-wide transition-colors ${
                  active === id ? 'text-gold-soft' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-(--ease-soft) ${
                    active === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-gold hidden min-h-10 px-5 sm:inline-flex">
            <MapPin className="size-4" /> Como chegar
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-cream/25 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

    </header>
      <div
        id="mobile-menu"
        className={`grain fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-forest transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="container-x flex flex-col pt-6 pb-10">
          {nav.map(({ id, label }, i) => (
            <li
              key={id}
              className={`border-b border-cream/10 transition-[opacity,transform] duration-700 ease-(--ease-soft) ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 font-serif text-3xl font-light text-cream"
              >
                {label}
                <span className="font-sans text-xs text-gold">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className="mt-8 grid gap-3">
            <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <MapPin className="size-4" /> Como chegar
            </a>
            <a href={site.phone.href} className="btn-ghost-light">
              Ligar {site.phone.display}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
