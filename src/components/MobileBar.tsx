import { useEffect, useState } from 'react'
import { BookOpen, Navigation, Phone } from 'lucide-react'
import { site } from '../data/site'
import { menuHref, menuLinkProps, openMenu } from '../lib/menu'

// Atalhos fixos no celular: aparecem depois do hero, somem no rodapé.
export default function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 500
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const item = 'flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold tracking-wide'
  return (
    <nav
      aria-label="Atalhos"
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex overflow-hidden rounded-2xl bg-forest/95 text-cream shadow-[0_20px_40px_-12px_rgba(0,0,0,.6)] ring-1 ring-gold/25 backdrop-blur-md transition-[transform,opacity] duration-500 ease-(--ease-soft) lg:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[150%] opacity-0'
      }`}
    >
      <a href={site.phone.href} className={item}>
        <Phone className="size-4 text-gold" /> Ligar
      </a>
      <a href={menuHref} onClick={openMenu} {...menuLinkProps} className={`${item} border-x border-cream/10`}>
        <BookOpen className="size-4 text-gold" /> Cardápio
      </a>
      <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className={`${item} bg-gold text-forest`}>
        <Navigation className="size-4" /> Como chegar
      </a>
    </nav>
  )
}
