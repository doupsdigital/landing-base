import { useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { gsap } from '../lib/gsap'
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

const captionClass = 'text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] flex flex-wrap gap-x-[0.28em]'
const descriptionClass =
  'mt-5 flex max-w-xl flex-wrap gap-x-[0.28em] gap-y-1 text-lg leading-relaxed sm:mt-6 sm:max-w-2xl sm:text-2xl'

function Word({
  word,
  register,
}: {
  word: string
  register: (el: HTMLSpanElement | null) => void
}) {
  return (
    <span ref={register} className="inline-block" aria-hidden>
      {word}
    </span>
  )
}

/**
 * Cada item é uma seção comum, empilhada no fluxo normal da página — igual
 * ao Hero e à seção Sobre, sem pin e sem scroller próprio (isso causava
 * blocos pretos e travamento no scroll mobile real). O texto usa a mesma
 * janela curta de revelação do `ScrollFade` (start 'top 90%', end 'top
 * 55%'), vinculada ao scroll da própria janela: completa numa rolada só, e
 * ao voltar não reanima de forma perceptível — só "já está lá".
 */
export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  const itemRefs = useRef<Array<HTMLElement | null>>([])
  const wordRefs = useRef<HTMLSpanElement[][]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      items.forEach((_, i) => {
        const item = itemRefs.current[i]
        const words = wordRefs.current[i]
        if (!item || words.length === 0) return

        gsap.fromTo(
          words,
          { opacity: 0, y: -16 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: { amount: 0.3 },
            scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 55%', scrub: 1 },
          },
        )
      })
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  itemRefs.current = []
  wordRefs.current = items.map(() => [])

  return (
    <div className="relative w-full">
      {items.map((item, i) => {
        const captionWords = item.caption.split(' ')
        const descriptionWords = item.description?.split(' ') ?? []
        return (
          <section
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="relative h-screen w-full overflow-hidden"
          >
            <div className="absolute inset-0">
              <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />
            </div>

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${overlayColor}00 0%, ${overlayColor}B8 32%, ${overlayColor}CC 50%, ${overlayColor}B8 68%, ${overlayColor}00 100%)`,
              }}
            />

            <span
              className="absolute left-6 top-6 z-10 text-sm uppercase tracking-[0.2em] sm:left-10 sm:top-10 sm:text-base"
              style={eyebrowStyle}
            >
              {eyebrow}
            </span>

            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 sm:inset-x-10 md:inset-x-16">
              <h3 className={captionClass} style={captionStyle} aria-label={item.caption}>
                {captionWords.map((word, wi) => (
                  <Word
                    key={wi}
                    word={word}
                    register={(el) => {
                      if (el) wordRefs.current[i].push(el)
                    }}
                  />
                ))}
              </h3>
              {item.description ? (
                <p
                  className={descriptionClass}
                  style={{ opacity: 0.88, ...descriptionStyle }}
                  aria-label={item.description}
                >
                  {descriptionWords.map((word, wi) => (
                    <Word
                      key={wi}
                      word={word}
                      register={(el) => {
                        if (el) wordRefs.current[i].push(el)
                      }}
                    />
                  ))}
                </p>
              ) : null}
            </div>
          </section>
        )
      })}
    </div>
  )
}
