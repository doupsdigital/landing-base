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
  overlayColor?: string
}

export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  overlayColor = '#000000',
}: PinnedPortfolioProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const captionRefs = useRef<Array<HTMLDivElement | null>>([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = mediaRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    const captions = captionRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    if (media.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(media, { opacity: 0 })
      gsap.set(media[0], { opacity: 1 })
      gsap.set(captions, { opacity: 0, y: 24 })
      gsap.set(captions[0], { opacity: 1, y: 0 })

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
        tl.to(media[i], { opacity: 0, ease: 'none', duration: 0.16 }, t + 0.5)
          .to(media[i + 1], { opacity: 1, ease: 'none', duration: 0.16 }, t + 0.5)
          .to(captions[i], { opacity: 0, y: -16, ease: 'none', duration: 0.14 }, t + 0.4)
          .to(captions[i + 1], { opacity: 1, y: 0, ease: 'none', duration: 0.18 }, t + 0.6)
      })
    }, section)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  mediaRefs.current = []
  captionRefs.current = []

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

      <div
        className="absolute inset-0"
        style={{
          zIndex: items.length,
          background: `linear-gradient(to top, ${overlayColor}CC, ${overlayColor}00 45%)`,
        }}
      />

      <span
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.2em] sm:left-10 sm:top-10"
        style={{ zIndex: items.length + 1, ...eyebrowStyle }}
      >
        {eyebrow}
      </span>

      <div
        className="absolute inset-x-6 bottom-10 sm:inset-x-10 sm:bottom-16"
        style={{ zIndex: items.length + 1 }}
      >
        <div className="relative">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                captionRefs.current[i] = el
              }}
              className="absolute inset-x-0 bottom-0"
            >
              <p className="text-4xl sm:text-6xl" style={captionStyle}>
                {item.caption}
              </p>
            </div>
          ))}
          <p className="invisible text-4xl sm:text-6xl" style={captionStyle} aria-hidden>
            {items[0]?.caption}
          </p>
        </div>
      </div>
    </section>
  )
}
