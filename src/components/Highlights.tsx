import { HeartHandshake, Martini, Music2, UtensilsCrossed } from 'lucide-react'

const items = [
  { icon: Martini, title: 'Drinks especiais', text: 'Autorais com cachaças brasileiras' },
  { icon: Music2, title: 'Música ao vivo', text: 'Samba e noites animadas' },
  { icon: HeartHandshake, title: 'Ambiente acolhedor', text: 'Aberto, leve e inclusivo' },
  { icon: UtensilsCrossed, title: 'Gastronomia', text: 'Porções, lanches e sobremesas' },
]

export default function Highlights() {
  return (
    <section id="destaques" aria-label="Destaques" className="border-y border-gold/20 bg-pine text-cream">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4" data-stagger>
        {items.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className={`group flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:gap-5 lg:py-10 ${
              i % 2 ? 'pl-5 sm:pl-8' : 'pr-5'
            } ${i > 1 ? 'border-t border-cream/10 lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l lg:border-cream/10 lg:pl-8' : ''}`}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-forest">
              <Icon className="size-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-serif text-lg leading-tight">{title}</p>
              <p className="mt-1 text-xs text-cream/60 sm:text-sm">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
