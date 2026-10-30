// Gera o HTML estático da página a partir do build SSR e injeta em dist/index.html.
import { readFile, writeFile, rm } from 'node:fs/promises'

const { render } = await import('../dist-ssr/entry-server.js')
const html = await readFile('dist/index.html', 'utf8')
await writeFile('dist/index.html', html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
await rm('dist-ssr', { recursive: true, force: true })
console.log('prerender ok')
