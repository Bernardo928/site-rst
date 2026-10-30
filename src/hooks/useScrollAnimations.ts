import { useEffect } from 'react'

// Carrega GSAP depois da primeira pintura e anima [data-reveal], [data-stagger] e [data-parallax].
export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
          gsap.from(group.children, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 8
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
      ScrollTrigger.refresh()
    }

    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
    idle(() => void run())
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])
}
