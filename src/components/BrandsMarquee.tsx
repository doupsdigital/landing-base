import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

type Logo = {
  src: string
  alt: string
}

type BrandsMarqueeProps = {
  logos: Logo[]
  /** Aumenta os logos só no desktop (md+) — no mobile não muda nada. Padrão: false. */
  desktopEnlarged?: boolean
}

/**
 * Loop infinito: a lista de logos é duplicada (2 cópias) e o track anda só
 * até `xPercent: -50` (metade da largura duplicada) antes de repetir — como
 * a segunda metade é idêntica à primeira, o reinício não tem soquinho
 * perceptível. `ease: 'none'` mantém velocidade constante.
 */
export function BrandsMarquee({ logos, desktopEnlarged = false }: BrandsMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1,
      })
    }, track)

    return () => {
      tweenRef.current = null
      ctx.revert()
    }
  }, [logos.length])

  const tiles = [...logos, ...logos]

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div
        className={`flex w-max items-center gap-6 sm:gap-8 md:gap-10 ${desktopEnlarged ? 'md:gap-14' : ''}`}
        ref={trackRef}
      >
        {tiles.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={i < logos.length ? logo.alt : ''}
            className={`h-24 w-auto shrink-0 opacity-80 grayscale sm:h-28 md:h-32 ${desktopEnlarged ? 'md:h-44' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
