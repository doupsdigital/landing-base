import type { CSSProperties } from 'react'
import { FullBleedMedia } from './FullBleedMedia'
import { ScrollFade } from './ScrollFade'
import type { PortfolioItem } from '../content/isabella'

type PinnedPortfolioProps = {
  items: PortfolioItem[]
  eyebrow: string
  eyebrowStyle: CSSProperties
  captionStyle: CSSProperties
  descriptionStyle?: CSSProperties
  overlayColor?: string
}

/**
 * Cada item é uma seção comum, empilhada no fluxo normal da página — igual
 * ao Hero e à seção Sobre, sem pin e sem scroller próprio (isso causava
 * blocos pretos e travamento no scroll mobile real). O texto usa o mesmo
 * `ScrollFade` da seção Sobre — mesmo mecanismo já validado, em vez de uma
 * animação própria por palavra que não disparava de forma confiável.
 */
export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  return (
    <div className="relative w-full">
      {items.map((item, i) => (
        <section key={i} className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />
          </div>

          {/* Topo e base ficam 100% sólidos (não quase-opacos) por um
              trecho, com uma queda longa e suave — cor cheia encontrando a
              mesma cor cheia da seção vizinha não deixa nenhuma linha
              visível, ao contrário de duas bordas só "quase" escuras. */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${overlayColor} 0%, ${overlayColor} 12%, transparent 30%, ${overlayColor}B3 50%, transparent 70%, ${overlayColor} 88%, ${overlayColor} 100%)`,
            }}
          />

          <span
            className="absolute left-6 top-6 z-10 text-sm uppercase tracking-[0.2em] sm:left-10 sm:top-10 sm:text-base"
            style={eyebrowStyle}
          >
            {eyebrow}
          </span>

          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 sm:inset-x-10 md:inset-x-16">
            <ScrollFade>
              <h3
                className="text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05]"
                style={captionStyle}
              >
                {item.caption}
              </h3>
              {item.description ? (
                <p
                  className="mt-5 max-w-xl text-lg leading-relaxed sm:mt-6 sm:max-w-2xl sm:text-2xl"
                  style={{ opacity: 0.88, ...descriptionStyle }}
                >
                  {item.description}
                </p>
              ) : null}
            </ScrollFade>
          </div>
        </section>
      ))}
    </div>
  )
}
