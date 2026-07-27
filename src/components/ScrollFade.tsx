import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from '../lib/gsap'

type ScrollFadeProps = {
  children: ReactNode
  className?: string
  y?: number
  scale?: number
  start?: string
  end?: string
  /** Scroller do ScrollTrigger, se a página não rolar na `window` (ex: container próprio com `scroll-snap`). Padrão: `window`. */
  scroller?: string | Element
}

export function ScrollFade({
  children,
  className,
  y = 40,
  scale,
  start = 'top 90%',
  end = 'top 55%',
  scroller,
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Resolvido manualmente (em vez de deixar o GSAP resolver a string): dentro
    // de um gsap.context(fn, el), o seletor de string do GSAP fica escopado a
    // `el` (só acha descendentes) — mas o scroller aqui é sempre um ancestral
    // (o container com scroll-snap), então a busca escopada nunca encontra e
    // quebra o ScrollTrigger.
    const resolvedScroller = typeof scroller === 'string' ? (document.querySelector(scroller) ?? undefined) : scroller

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, ...(scale ? { scale } : {}) },
        {
          opacity: 1,
          y: 0,
          ...(scale ? { scale: 1 } : {}),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 1,
            scroller: resolvedScroller,
          },
        },
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroller])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
