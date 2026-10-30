import type { MouseEvent } from 'react'
import { site } from '../data/site'

// "Explore o cardápio": abre o cardápio oficial no Canva quando o link estiver
// configurado; caso contrário, rola até o cardápio completo do próprio site.
export const menuHref = site.links.canvaMenu || '#cardapio'

export function openMenu(e: MouseEvent<HTMLAnchorElement>) {
  if (site.links.canvaMenu) return
  e.preventDefault()
  document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', '#cardapio')
}
