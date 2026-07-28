import type { CSSProperties } from 'react'
import { CTAButton } from './CTAButton'

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
  return (
    <section id="contato" className="relative w-full snap-start snap-always">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div className="-mt-6 flex min-h-screen w-full items-center px-6 py-16 sm:-mt-8 sm:px-10 md:px-16">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-5 md:gap-16">
          <div className="relative mx-auto aspect-[3/5] w-full max-w-xs overflow-hidden rounded-sm md:col-span-2 md:mx-0 md:max-w-none">
            <img src={image} alt="" className="h-full w-full object-cover object-top" />
          </div>

          <div className="text-center md:col-span-3 md:text-left">
            <h2 style={displayFont} className="text-[clamp(2rem,5vw,3.75rem)]">
              {title}
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-start">
              <CTAButton
                href={ctaHref}
                className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
                style={{ backgroundColor: colors.ctaBg, color: colors.ctaText }}
              >
                {ctaPrimaryLabel}
              </CTAButton>
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

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                style={{ ...bodyStyle, color: colors.muted }}
              >
                <InstagramGlyph className="h-4 w-4" />
                {instagramHandle}
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                style={{ ...bodyStyle, color: colors.muted }}
              >
                <MailGlyph className="h-4 w-4" />
                {emailLabel}
              </a>
            </div>

            <p className="mt-5 text-sm" style={{ ...bodyStyle, color: colors.muted, opacity: 0.85 }}>
              {responseTime}
            </p>

            <div
              className="mt-9 border-t pt-6 text-[11px] uppercase tracking-[0.16em]"
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
