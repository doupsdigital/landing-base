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
 * Cada item é um painel próprio dentro de um scroller nativo com CSS Scroll
 * Snap (`snap-y snap-mandatory` + `snap-always`) — 1 gesto de scroll sempre
 * encaixa exatamente no próximo item, sem pular vários de uma vez num flick
 * forte, e sem o crossfade empilhado que causava sobreposição ao ir/voltar
 * rápido. O texto usa scrub vinculado à posição real do scroll dentro desse
 * mesmo scroller, então reverte sozinho e de forma suave ao rolar pra cima.
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
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const wordRefs = useRef<HTMLSpanElement[][]>([])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const ctx = gsap.context(() => {
      items.forEach((_, i) => {
        const item = itemRefs.current[i]
        const media = mediaRefs.current[i]
        const words = wordRefs.current[i]
        if (!item) return

        gsap.set(words, { opacity: 0, y: -16 })
        if (media) gsap.set(media, { scale: 1.08 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            scroller,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.4,
          },
        })
        if (media) tl.to(media, { scale: 1, ease: 'none' }, 0)
        tl.to(words, { opacity: 1, y: 0, ease: 'none', stagger: { amount: 0.7 } }, 0)
      })
    }, scroller)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  itemRefs.current = []
  mediaRefs.current = []
  wordRefs.current = items.map(() => [])

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <span
        className="absolute left-6 top-6 z-10 text-sm uppercase tracking-[0.2em] sm:left-10 sm:top-10 sm:text-base"
        style={eyebrowStyle}
      >
        {eyebrow}
      </span>

      <div ref={scrollerRef} className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
        {items.map((item, i) => {
          const captionWords = item.caption.split(' ')
          const descriptionWords = item.description?.split(' ') ?? []
          return (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className="relative h-[100dvh] w-full snap-start snap-always overflow-hidden"
            >
              <div ref={(el) => { mediaRefs.current[i] = el }} className="absolute inset-0">
                <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />
              </div>

              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, ${overlayColor}00 0%, ${overlayColor}B8 32%, ${overlayColor}CC 50%, ${overlayColor}B8 68%, ${overlayColor}00 100%)`,
                }}
              />

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
            </div>
          )
        })}
      </div>
    </section>
  )
}
