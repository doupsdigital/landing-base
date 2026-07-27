import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { FullBleedMedia } from './FullBleedMedia'
import type { PortfolioItem } from '../content/isabella'

type PinnedPortfolioProps = {
  items: PortfolioItem[]
  eyebrow: string
  eyebrowStyle: CSSProperties
  captionStyle: CSSProperties
  descriptionStyle?: CSSProperties
  overlayColor?: string
}

/** Fração da seção visível pra ela virar a "ativa" (só uma pode passar disso por vez, já que cada seção e o scroller têm exatamente 100vh). */
const ACTIVE_THRESHOLD = 0.6

/**
 * Cada item ocupa a tela toda dentro de um scroller com scroll-snap nativo
 * do CSS (`scroll-snap-type`, não `ScrollTrigger.pin` nem scrub — isso já
 * causou instabilidade/bugs de scroll no mobile em tentativas anteriores).
 * O navegador garante que uma rolagem sempre encaixa exatamente na seção
 * seguinte, inclusive em rolagens fortes (`snap-always` força parar em
 * cada uma, não pula direto pra mais longe). A seção que "encaixou" é
 * detectada por IntersectionObserver e recebe um fade de opacidade com
 * duração fixa via CSS — não é escrubado pelo dedo, então a transição
 * sempre completa do mesmo jeito, não importa a velocidade do gesto.
 */
export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < ACTIVE_THRESHOLD) return
          const index = itemRefs.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) setActiveIndex(index)
        })
      },
      { root: scroller, threshold: ACTIVE_THRESHOLD },
    )

    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [items.length])

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-x-0 top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div ref={scrollerRef} className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
        {items.map((item, i) => (
          <section
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="relative h-screen w-full snap-start snap-always overflow-hidden transition-opacity duration-700 ease-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <div className="absolute inset-0">
              <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />
            </div>

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${overlayColor}66 0%, transparent 22%, transparent 45%, ${overlayColor}99 55%, transparent 78%, ${overlayColor}66 100%)`,
              }}
            />

            <div className="absolute inset-x-6 top-1/2 max-w-3xl -translate-y-1/2 sm:inset-x-10 md:inset-x-16">
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
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
