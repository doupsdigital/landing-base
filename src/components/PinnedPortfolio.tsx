import type { CSSProperties } from 'react'
import { FullBleedMedia } from './FullBleedMedia'
import { ScrollFade } from './ScrollFade'
import { SectionDivider } from './SectionDivider'
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
 * `ScrollFade` da seção Sobre. O rótulo "Portfólio" mora no `SectionDivider`
 * antes de cada item, não mais flutuando em cima da foto — assim a foto
 * fica livre, sem precisar escurecer o topo pra caber o rótulo.
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
        <div key={i}>
          <SectionDivider label={eyebrow} labelStyle={eyebrowStyle} bg={overlayColor} />
          <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
              <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />
            </div>

            {/* Contraste no centro (pro texto) + um fio bem curto (~3%) nas
                pontas só pra suavizar o encontro com o separador, sem
                "invadir" a foto como antes. */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${overlayColor} 0%, transparent 3%, transparent 40%, ${overlayColor}99 50%, transparent 60%, transparent 97%, ${overlayColor} 100%)`,
              }}
            />

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
        </div>
      ))}
    </div>
  )
}
