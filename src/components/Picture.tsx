import images from '../data/images.json'

export type ImageKey = keyof typeof images

type Props = {
  name: ImageKey
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

const srcset = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')

export function largest(name: ImageKey, ext = 'jpg') {
  const { widths } = images[name]
  return `/images/${name}-${widths[widths.length - 1]}.${ext}`
}

export default function Picture({ name, alt, sizes = '100vw', className = '', imgClassName = '', priority }: Props) {
  const { w, h, widths, blur } = images[name]
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset(name, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, widths, 'webp')} sizes={sizes} />
      <img
        src={`/images/${name}-${widths[0]}.jpg`}
        srcSet={srcset(name, widths, 'jpg')}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={{ backgroundImage: `url(${blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </picture>
  )
}
