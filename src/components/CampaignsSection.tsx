import type { CSSProperties } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { CategoryIcon } from './CategoryIcon'
import type { CategoryIconName } from './CategoryIcon'

export type CampaignCategory = {
  label: string
  icon: CategoryIconName
  /** Foto de apoio, sutil, atrás do chip — só pros 2-3 mais relevantes. */
  image?: string
}

type CampaignsSectionColors = {
  ink: string
  muted: string
  accent: string
  line: string
  bg: string
}

type CampaignsSectionProps = {
  categories: CampaignCategory[]
  intro: string
  eyebrow: string
  eyebrowStyle: CSSProperties
  bodyStyle: CSSProperties
  colors: CampaignsSectionColors
  /** Scroller do ScrollTrigger, se a página não rolar na `window` (ex: container próprio com `scroll-snap`). Padrão: `window`. */
  scroller?: string | Element
}

/**
 * Chips revelados com stagger vinculado ao scroll via GSAP ScrollTrigger
 * (não escrubado — `toggleActions` dispara uma vez ao entrar, sem o risco
 * de travar/pular junto com o scroll-snap que o `scrub` contínuo já causou
 * antes nesta página, ver docs/portfolio-scroll-transitions.md).
 */
export function CampaignsSection({
  categories,
  intro,
  eyebrow,
  eyebrowStyle,
  bodyStyle,
  colors,
  scroller,
}: CampaignsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const chipRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const resolvedScroller = typeof scroller === 'string' ? (document.querySelector(scroller) ?? undefined) : scroller
    const chips = chipRefs.current.filter((el): el is HTMLDivElement => el !== null)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chips,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            scroller: resolvedScroller,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [scroller, categories.length])

  return (
    <section ref={sectionRef} className="relative w-full snap-start snap-always">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div className="-mt-6 flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 sm:-mt-8 sm:px-10 md:px-16">
        <p
          className="mx-auto mb-8 max-w-xl text-center text-base leading-relaxed sm:text-lg"
          style={{ ...bodyStyle, color: colors.muted }}
        >
          {intro}
        </p>

        <div className="flex max-w-3xl flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              ref={(el) => {
                chipRefs.current[i] = el
              }}
              className="relative overflow-hidden rounded-sm border px-4 py-2.5"
              style={{ borderColor: colors.line }}
            >
              {cat.image ? (
                <>
                  <img src={cat.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                  <div className="absolute inset-0" style={{ backgroundColor: `${colors.bg}B3` }} />
                </>
              ) : null}
              <span className="relative z-10 flex items-center gap-2 text-sm" style={{ ...bodyStyle, color: colors.ink }}>
                <CategoryIcon name={cat.icon} className="h-4 w-4 shrink-0" style={{ color: colors.accent }} />
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
