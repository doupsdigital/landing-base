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
}

export function ScrollFade({
  children,
  className,
  y = 40,
  scale,
  start = 'top 90%',
  end = 'top 55%',
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

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
          },
        },
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
