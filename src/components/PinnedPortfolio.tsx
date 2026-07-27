import type { CSSProperties } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { FullBleedMedia } from './FullBleedMedia'
import { ScrollFade } from './ScrollFade'
import { gsap } from '../lib/gsap'
import type { PortfolioItem } from '../content/isabella'

type PinnedPortfolioProps = {
  items: PortfolioItem[]
  eyebrow: string
  eyebrowStyle: CSSProperties
  captionStyle: CSSProperties
  descriptionStyle?: CSSProperties
  overlayColor?: string
}

/** Quanto do scroll (em % da altura da tela) dura o crossfade entre um item e o próximo. */
const FADE_VH = 60

/**
 * Cada item fica preso na tela (`position: sticky`, nativo do CSS — não
 * `ScrollTrigger.pin`, que já causou blocos pretos e travamento no scroll
 * mobile real numa tentativa anterior) enquanto o item seguinte, sobreposto
 * por cima com z-index maior, faz fade-in conforme o usuário rola. O texto
 * mora dentro da mesma camada que recebe o fade, então troca junto com a
 * imagem/vídeo, sem separador nenhum entre os itens.
 */
export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      items.forEach((_, i) => {
        if (i === 0) return
        const box = boxRefs.current[i]
        const layer = layerRefs.current[i]
        if (!box || !layer) return

        gsap.fromTo(
          layer,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: box,
              start: 'top top',
              end: () => `+=${window.innerHeight * (FADE_VH / 100)}`,
              scrub: 1,
            },
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      {items.map((item, i) => {
        const isFirst = i === 0
        const isLast = i === items.length - 1

        const textBlock = (
          <>
            <h3 className="text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.05]" style={captionStyle}>
              {item.caption}
            </h3>
            {item.description ? (
              <p
                className="mt-5 max-w-xl text-lg leading-relaxed sm:mt-6 sm:max-w-2xl sm:text-xl"
                style={{ opacity: 0.88, ...descriptionStyle }}
              >
                {item.description}
              </p>
            ) : null}
          </>
        )

        return (
          <div
            key={i}
            ref={(el) => {
              boxRefs.current[i] = el
            }}
            className="relative w-full"
            style={{
              height: isLast ? '100vh' : `calc(100vh + ${FADE_VH}vh)`,
              marginTop: isFirst ? 0 : `-${FADE_VH}vh`,
              zIndex: i,
            }}
          >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <div
                ref={
                  isFirst
                    ? undefined
                    : (el) => {
                        layerRefs.current[i] = el
                      }
                }
                className="absolute inset-0"
              >
                <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />

                {/* Vinheta constante — legibilidade do texto, presente em toda seção, não só na transição. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${overlayColor}66 0%, transparent 22%, transparent 45%, ${overlayColor}99 55%, transparent 78%, ${overlayColor}66 100%)`,
                  }}
                />

                <div className="absolute inset-x-6 top-1/2 max-w-3xl -translate-y-1/2 sm:inset-x-10 md:inset-x-16">
                  {isFirst ? <ScrollFade>{textBlock}</ScrollFade> : textBlock}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
