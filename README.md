# Casa Marafo Bar — website

React + TypeScript + Vite + Tailwind v4 + GSAP/ScrollTrigger + Three.js.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção em dist/
npm run preview  # servir o build
npm run images   # regenerar AVIF/WebP/JPG a partir de assets-src/
```

## Design no Figma
https://www.figma.com/design/vukktuvlV34C4jBzpmu46T — página Home (desktop 1440) em camadas editáveis,
com variáveis de cor, estilos de texto e componentes (Button, Highlight item, Drink row, Menu item, Review card).
Só a foto do hero foi embutida; os outros espaços de foto estão nomeados `img/<nome>` para arrastar o arquivo de `public/images/`.

## Onde editar
- `src/data/site.ts` — endereço, telefone, horários, avaliações, **cardápio** e links.
  - `links.canvaMenu` e `links.linktree` estão vazios de propósito (URLs não confirmadas).
    Preencha-os: o botão "Explore o cardápio" passa a abrir o Canva e o Linktree aparece no rodapé.
- Fotos: coloque originais em `assets-src/photos/`, registre em `scripts/optimize-images.mjs`,
  rode `npm run images` e use pelo nome no componente `<Picture name="..." />`.

## Fotos
Todas são fotos reais enviadas pela casa (fachada, drink, quintal, hambúrguer) e as páginas do
cardápio oficial. A galeria usa recortes de detalhes dessas fotos; substitua por fotos novas
quando houver.

## Recursos
- Status "Aberto agora / Fechado" em tempo real no fuso de São Paulo (`src/lib/hours.ts`, horários em `site.schedule`).
- Drinks autorais com copo 3D (Three.js, só desktop com GPU), experiências com rolagem horizontal fixada (GSAP).
- Cardápio com abas, filtro vegano e páginas originais em lightbox; barra de atalhos no celular.
- Copy revisada: `docs/ux-copy.md`.

## Performance
HTML pré-renderizado no build (`scripts/prerender.mjs`) e hidratado no navegador.
Imagens responsivas AVIF/WebP com placeholder blur, lazy-load abaixo da dobra, hero pré-carregado,
GSAP/Three.js em chunks carregados sob demanda (3D só em desktop com GPU), mapa e TikTok só
carregam perto da tela, fontes self-hosted com `font-display: swap`.
