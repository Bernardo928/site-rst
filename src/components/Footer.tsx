import Logo from './Logo'
import { TikTokIcon } from './icons'
import { nav, site } from '../data/site'
import { menuHref, openMenu } from '../lib/menu'

export default function Footer() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <footer className="grain bg-ink pt-20 pb-10 text-cream/75">
      <div className="container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <a href="#inicio" className="inline-flex items-center gap-4 text-cream">
            <Logo className="size-16 text-gold" />
            <span className="font-serif text-2xl">Casa Marafo Bar</span>
          </a>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Samba, drinks autorais de cachaça e boa comida no coração de Pinheiros.
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2">
          <h3 className="text-xs tracking-[0.25em] text-gold uppercase">Navegação</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-gold-soft">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="text-xs tracking-[0.25em] text-gold uppercase">Visite</h3>
          <address className="mt-5 space-y-2.5 text-sm not-italic">
            <a href={site.links.directions} {...ext} className="block transition-colors hover:text-gold-soft">
              {site.address.street} — {site.address.district}
              <br />
              {site.address.city}, {site.address.zip}
            </a>
            <a href={site.phone.href} className="block transition-colors hover:text-gold-soft">{site.phone.display}</a>
          </address>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs tracking-[0.25em] text-gold uppercase">Links</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={site.links.tiktok} {...ext} className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft">
                <TikTokIcon className="size-4" /> TikTok @casamarafo
              </a>
            </li>
            <li>
              <a href={menuHref} onClick={openMenu} {...(site.links.canvaMenu ? ext : {})} className="transition-colors hover:text-gold-soft">
                Cardápio
              </a>
            </li>
            {site.links.linktree && (
              <li>
                <a href={site.links.linktree} {...ext} className="transition-colors hover:text-gold-soft">Linktree</a>
              </li>
            )}
            <li>
              <a href={site.links.maps} {...ext} className="transition-colors hover:text-gold-soft">Google Maps</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col gap-3 border-t border-cream/10 pt-8 text-xs text-cream/60 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Casa Marafo Bar. Todos os direitos reservados.</p>
        <p>Beba com moderação. Venda proibida para menores de 18 anos.</p>
      </div>
    </footer>
  )
}
