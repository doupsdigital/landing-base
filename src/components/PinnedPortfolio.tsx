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

/** Fração da seção visível pra ela virar a "ativa" (só uma pode passar disso por vez, já que cada seção tem exatamente 100vh). */
const ACTIVE_THRESHOLD = 0.6

/**
 * Cada item é uma seção comum (`snap-start snap-always`), empilhada no
 * fluxo normal da página — sem scroller próprio. O container de scroll com
 * `scroll-snap-type` é a página inteira (ver `VinhoPage`), não um bloco
 * isolado só pro portfólio: assim o "uma rolagem = uma seção" fica
 * consistente do Hero ao Contato, sem um ponto onde a página muda de
 * comportamento. A seção que encaixou é detectada por IntersectionObserver
 * (relativo ao viewport, funciona igual não importa quantos containers de
 * scroll aninhados existam) e recebe um fade de opacidade com duração fixa
 * via CSS — não escrubado pelo dedo.
 */
export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < ACTIVE_THRESHOLD) return
          const index = itemRefs.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) setActiveIndex(index)
        })
      },
      { threshold: ACTIVE_THRESHOLD },
    )

    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [items.length])

  return (
    <div className="relative w-full">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

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
  )
}
