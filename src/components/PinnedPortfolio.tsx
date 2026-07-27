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

export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([])
  // Todas as palavras (título + descrição) de cada item, na ordem em que
  // aparecem — é nessa lista que o stagger do scroll atua, palavra por
  // palavra, em vez de mostrar o bloco inteiro de uma vez.
  const wordRefs = useRef<HTMLSpanElement[][]>([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = mediaRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    if (media.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(media, { opacity: 0 })
      gsap.set(media[0], { opacity: 1 })

      const allWords = wordRefs.current.flat()
      gsap.set(allWords, { opacity: 0, y: -16 })
      gsap.set(wordRefs.current[0], { opacity: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      items.forEach((_, i) => {
        if (i === items.length - 1) return
        const t = i
        tl.to(
          wordRefs.current[i],
          { opacity: 0, y: 16, ease: 'none', duration: 0.12, stagger: { amount: 0.08 } },
          t + 0.04,
        )
          .to(media[i], { opacity: 0, ease: 'none', duration: 0.2 }, t + 0.04)
          .to(media[i + 1], { opacity: 1, ease: 'none', duration: 0.2 }, t + 0.04)
          .to(
            wordRefs.current[i + 1],
            { opacity: 1, y: 0, ease: 'none', duration: 0.3, stagger: { amount: 0.4 } },
            t + 0.2,
          )
      })
    }, section)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  mediaRefs.current = []
  wordRefs.current = items.map(() => [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            mediaRefs.current[i] = el
          }}
          className="absolute inset-0"
          style={{ zIndex: i }}
        >
          <FullBleedMedia src={item.src} type={item.type} alt={item.alt} />
        </div>
      ))}

      {/* Faixa escurecida no centro da tela — é onde o texto fica agora,
          então o contraste precisa vir dali, não só de baixo. */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: items.length,
          background: `linear-gradient(to bottom, ${overlayColor}00 0%, ${overlayColor}B8 32%, ${overlayColor}CC 50%, ${overlayColor}B8 68%, ${overlayColor}00 100%)`,
        }}
      />

      <span
        className="absolute left-6 top-6 text-sm uppercase tracking-[0.2em] sm:left-10 sm:top-10 sm:text-base"
        style={{ zIndex: items.length + 1, ...eyebrowStyle }}
      >
        {eyebrow}
      </span>

      <div
        className="absolute inset-x-6 top-1/2 -translate-y-1/2 sm:inset-x-10 md:inset-x-16"
        style={{ zIndex: items.length + 1 }}
      >
        <div className="relative">
          {items.map((item, i) => {
            const captionWords = item.caption.split(' ')
            const descriptionWords = item.description?.split(' ') ?? []
            return (
              <div key={i} className="absolute inset-0 flex flex-col justify-center">
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
            )
          })}
          <h3 className={`invisible ${captionClass}`} style={captionStyle} aria-hidden>
            {items[0]?.caption}
          </h3>
          <p
            className={`invisible ${descriptionClass}`}
            style={{ opacity: 0.88, ...descriptionStyle }}
            aria-hidden
          >
            {items[0]?.description}
          </p>
        </div>
      </div>
    </section>
  )
}
