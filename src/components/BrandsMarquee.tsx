import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

type BrandsMarqueeProps = {
  image: string
  imageAlt?: string
  /** Quantas cópias distintas da imagem por metade do track, antes de duplicar pro loop. */
  tileCount?: number
}

/**
 * Loop infinito: o conteúdo é duplicado (`tileCount * 2` cópias) e o track
 * anda só até `xPercent: -50` (metade da largura duplicada) antes de repetir
 * — como a segunda metade é idêntica à primeira, o reinício não tem soquinho
 * perceptível. `ease: 'none'` mantém velocidade constante.
 */
export function BrandsMarquee({ image, imageAlt = '', tileCount = 5 }: BrandsMarqueeProps) {
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
  }, [tileCount])

  const tiles = Array.from({ length: tileCount * 2 })

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div ref={trackRef} className="flex w-max items-center gap-12 sm:gap-16 md:gap-20">
        {tiles.map((_, i) => (
          <img
            key={i}
            src={image}
            alt={i === 0 ? imageAlt : ''}
            className="h-16 w-auto shrink-0 sm:h-20 md:h-24"
          />
        ))}
      </div>
    </div>
  )
}
