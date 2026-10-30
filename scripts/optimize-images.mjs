// Gera AVIF/WebP/JPG responsivos a partir das fotos reais em assets-src/.
// Uso: npm run images
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

const OUT = 'public/images'
const WIDTHS = [480, 720, 960, 1400]

// crop: [left, top, width, height] em pixels do original
const jobs = [
  { src: 'photos/fachada-noite.jpg', out: 'fachada-noite' },
  { src: 'photos/drink-cafe.jpg', out: 'drink-cafe', crop: [0, 8, 1215, 1392] },
  { src: 'photos/jardim-logo.jpg', out: 'jardim-logo', crop: [0, 0, 1215, 676] },
  { src: 'photos/burger-fritas.jpg', out: 'burger-fritas', crop: [0, 22, 1215, 1615] },
  // detalhes da fachada (recortes da mesma foto noturna)
  { src: 'photos/fachada-noite.jpg', out: 'detalhe-letreiro', crop: [388, 560, 610, 280] },
  { src: 'photos/fachada-noite.jpg', out: 'detalhe-porta', crop: [96, 1270, 230, 500] },
  { src: 'photos/fachada-noite.jpg', out: 'detalhe-ripado', crop: [0, 958, 1215, 250] },
  { src: 'photos/fachada-noite.jpg', out: 'detalhe-balcao', crop: [340, 1220, 760, 540] },
  { src: 'photos/jardim-logo.jpg', out: 'detalhe-samambaias', crop: [300, 0, 760, 340] },
  // cardápio oficial
  ...['drinks', 'entradas', 'porcoes', 'lanches', 'sobremesa'].map((n) => ({ src: `menu/${n}.jpg`, out: `menu-${n}`, widths: [600, 1200] })),
]

await mkdir(OUT, { recursive: true })
const manifest = {}
for (const job of jobs) {
  let base = sharp(`assets-src/${job.src}`)
  if (job.crop) {
    const [left, top, width, height] = job.crop
    base = base.extract({ left, top, width, height })
  }
  const buf = await base.toBuffer()
  const { width: w, height: h } = await sharp(buf).metadata()
  const widths = (job.widths ?? WIDTHS).filter((x) => x < w - 100).concat(w).filter((x, i, a) => a.indexOf(x) === i)
  for (const width of widths) {
    const img = sharp(buf).resize({ width })
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}/${job.out}-${width}.avif`)
    await img.clone().webp({ quality: 72 }).toFile(`${OUT}/${job.out}-${width}.webp`)
    await img.clone().jpeg({ quality: 76, mozjpeg: true }).toFile(`${OUT}/${job.out}-${width}.jpg`)
  }
  const tiny = await sharp(buf).resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer()
  manifest[job.out] = { w, h, widths, blur: `data:image/webp;base64,${tiny.toString('base64')}` }
  console.log(job.out, w, h, widths.join(','))
}
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2))
