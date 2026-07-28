import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { CTAButton } from './CTAButton'
import { MagneticGlowButton } from './MagneticGlowButton'

type ContactSectionColors = {
  ink: string
  muted: string
  accent: string
  line: string
  ctaBg: string
  ctaText: string
}

type ContactSectionProps = {
  image: string
  title: string
  ctaPrimaryLabel: string
  ctaHref: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  instagramHandle: string
  instagramHref: string
  emailLabel: string
  emailHref: string
  responseTime: string
  locationLine: string
  eyebrow: string
  eyebrowStyle: CSSProperties
  displayFont: CSSProperties
  bodyStyle: CSSProperties
  colors: ContactSectionColors
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MailGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className={className} aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Fechamento assimétrico: foto de um lado (não full-bleed, só um recorte),
 * texto + CTA + canais secundários do outro — em vez de um único bloco de
 * texto boiando sozinho num fundo vazio.
 */
export function ContactSection({
  image,
  title,
  ctaPrimaryLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  instagramHandle,
  instagramHref,
  emailLabel,
  emailHref,
  responseTime,
  locationLine,
  eyebrow,
  eyebrowStyle,
  displayFont,
  bodyStyle,
  colors,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Mesmo padrão de IntersectionObserver das outras seções (ver AboutSection):
  // liga o ken burns retomável da foto (zoom ao entrar, volta ao sair) e o
  // reveal de entrada do texto/CTA (fade + translateY), os dois resetáveis —
  // funcionam de novo toda vez que a seção é revisitada, sem "gastar" a
  // animação sozinha antes do usuário rolar até ali.
  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)

        if (img && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.to(img, {
            scale: entry.isIntersecting ? 1.1 : 1,
            duration: entry.isIntersecting ? 6 : 0.6,
            ease: entry.isIntersecting ? 'sine.out' : 'power2.out',
            overwrite: 'auto',
          })
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contato" ref={sectionRef} className="relative w-full snap-start snap-always">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div className="-mt-6 flex min-h-dvh w-full items-center px-6 py-8 sm:-mt-8 sm:px-10 sm:py-12 md:px-16 md:py-16">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-6 sm:gap-8 md:grid-cols-5 md:gap-16">
          <div
            className="relative mx-auto aspect-[3/5] max-h-[36dvh] w-full max-w-[240px] overflow-hidden rounded-sm transition-[opacity,transform] duration-1000 ease-out sm:max-h-[46dvh] sm:max-w-xs md:col-span-2 md:mx-0 md:max-h-none md:max-w-none"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 40}px)`,
            }}
          >
            <img
              ref={imgRef}
              src={image}
              alt=""
              className="h-full w-full object-cover object-top will-change-transform"
            />
          </div>

          <div
            className="text-center transition-[opacity,transform] duration-1000 ease-out md:col-span-3 md:text-left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 40}px)`,
              transitionDelay: isVisible ? '350ms' : '0ms',
            }}
          >
            <h2 style={displayFont} className="text-[clamp(1.75rem,5vw,3.75rem)]">
              {title}
            </h2>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-7 md:mt-9 md:justify-start">
              <MagneticGlowButton
                href={ctaHref}
                glowColor={colors.accent}
                className="rounded-full px-10 py-4 text-xl sm:text-2xl"
                style={{ ...displayFont, backgroundColor: colors.ctaBg, color: colors.ctaText }}
              >
                {ctaPrimaryLabel}
              </MagneticGlowButton>
              {ctaSecondaryLabel ? (
                <CTAButton
                  href={ctaSecondaryHref ?? ctaHref}
                  className="text-[13px] uppercase tracking-[0.08em] underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
                  style={{ color: colors.ink }}
                >
                  {ctaSecondaryLabel}
                </CTAButton>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 sm:mt-8 md:mt-10 md:justify-start">
              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-100"
                style={{ ...bodyStyle, color: colors.muted, opacity: 0.65 }}
              >
                <InstagramGlyph className="h-3.5 w-3.5" />
                {instagramHandle}
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-100"
                style={{ ...bodyStyle, color: colors.muted, opacity: 0.65 }}
              >
                <MailGlyph className="h-3.5 w-3.5" />
                {emailLabel}
              </a>
            </div>

            <p className="mt-3 text-xs sm:mt-4" style={{ ...bodyStyle, color: colors.muted, opacity: 0.6 }}>
              {responseTime}
            </p>

            <div
              className="mt-6 border-t pt-4 text-[11px] uppercase tracking-[0.16em] sm:mt-8 sm:pt-6 md:mt-9"
              style={{ ...bodyStyle, borderColor: colors.line, color: colors.muted }}
            >
              {locationLine}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
