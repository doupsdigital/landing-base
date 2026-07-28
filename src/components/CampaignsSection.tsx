import type { CSSProperties } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { CategoryIcon } from './CategoryIcon'
import type { CategoryIconName } from './CategoryIcon'
import { BrandsMarquee } from './BrandsMarquee'

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
  /** Logos de marcas parceiras, exibidos em carrossel abaixo dos chips de categoria. */
  partnersLogos?: { src: string; alt: string }[]
  partnersTitle?: string
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
  partnersLogos,
  partnersTitle,
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

      <div
        className={`-mt-6 flex min-h-dvh w-full flex-col items-center px-6 sm:-mt-8 sm:px-10 md:px-16 ${
          partnersLogos && partnersLogos.length > 0
            ? 'justify-start pb-8 pt-16 sm:pb-12 sm:pt-20 md:pb-8 md:pt-20'
            : 'justify-center py-10'
        }`}
      >
        <div className="flex w-full flex-col items-center">
          <p
            className="mx-auto mb-8 max-w-xl text-center text-base leading-relaxed sm:mb-8 sm:text-lg"
            style={{ ...bodyStyle, color: colors.muted }}
          >
            {intro}
          </p>

          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-xl sm:gap-4 md:max-w-3xl md:grid-cols-4">
            {categories.map((cat, i) => (
              <div
                key={cat.label}
                ref={(el) => {
                  chipRefs.current[i] = el
                }}
                className="group relative aspect-square overflow-hidden rounded-sm border"
                style={{ borderColor: colors.line }}
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : null}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${colors.bg}E6 0%, ${colors.bg}66 55%, ${colors.bg}40 100%)`,
                  }}
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2.5 p-4 text-center sm:gap-3">
                  <CategoryIcon name={cat.icon} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" style={{ color: colors.accent }} />
                  <span
                    className="text-sm uppercase tracking-[0.08em] sm:text-base"
                    style={{ ...bodyStyle, color: colors.ink }}
                  >
                    {cat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {partnersLogos && partnersLogos.length > 0 ? (
          <div className="mt-10 w-full max-w-3xl sm:mt-14 md:mt-8">
            <p
              className="mb-5 text-center text-xs uppercase tracking-[0.3em] sm:mb-6 sm:text-sm"
              style={{ ...bodyStyle, color: colors.accent }}
            >
              {partnersTitle}
            </p>
            <BrandsMarquee logos={partnersLogos} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
