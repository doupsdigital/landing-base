import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { CTAButton } from './CTAButton'
import { MagneticGlowButton } from './MagneticGlowButton'
import { FullBleedMedia } from './FullBleedMedia'

type ContactSectionColors = {
  ink: string
  muted: string
  accent: string
  line: string
  bg: string
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
  /** Legenda opcional em cima do CTA principal, na mesma fonte de destaque (displayFont) do título. */
  ctaTagline?: string
  /** Bloco opcional "Mídia Kit" — objetivo secundário do Contato (parcerias que ainda não vão fechar), visualmente mais discreto que o CTA principal. Só renderiza se `mediaKitDescription` e `mediaKitCtaLabel` forem passados. */
  mediaKitTitle?: string
  mediaKitDescription?: string
  mediaKitCtaLabel?: string
  mediaKitHref?: string
  instagramHandle: string
  instagramHref: string
  emailLabel: string
  emailHref: string
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

function DocumentGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className={className} aria-hidden>
      <path d="M6.5 2.75h7l4 4v13.5a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1z" strokeLinejoin="round" />
      <path d="M13.5 2.75v4h4" strokeLinejoin="round" />
      <path d="M9 13h6M9 16.5h6" strokeLinecap="round" />
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
 * Fechamento com foto de fundo full-bleed escurecida (mesmo tratamento do
 * Hero/Sobre/Portfólio) — serve dois objetivos: o CTA principal (fechar
 * diretamente) e, opcional, um bloco "Mídia Kit" mais discreto logo abaixo
 * de um divisor fino, pra marcas que querem avaliar parceria antes de
 * comprometer. Pode crescer além de uma tela (permitido de propósito: é a
 * última seção, então um pouco de rolagem extra aqui não quebra o ritmo
 * de "uma rolada = uma seção" do resto da página).
 */
export function ContactSection({
  image,
  title,
  ctaPrimaryLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  ctaTagline,
  mediaKitTitle = 'Mídia Kit',
  mediaKitDescription,
  mediaKitCtaLabel,
  mediaKitHref,
  instagramHandle,
  instagramHref,
  emailLabel,
  emailHref,
  locationLine,
  eyebrow,
  eyebrowStyle,
  displayFont,
  bodyStyle,
  colors,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Mesmo padrão de IntersectionObserver das outras seções (ver AboutSection):
  // liga o ken burns retomável do fundo (zoom ao entrar, volta ao sair) e o
  // reveal de entrada do texto/CTA (fade + translateY), os dois resetáveis —
  // funcionam de novo toda vez que a seção é revisitada, sem "gastar" a
  // animação sozinha antes do usuário rolar até ali.
  useEffect(() => {
    const section = sectionRef.current
    const imgWrap = imgWrapRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)

        if (imgWrap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.to(imgWrap, {
            scale: entry.isIntersecting ? 1.08 : 1,
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

  const showMediaKit = Boolean(mediaKitDescription && mediaKitCtaLabel)

  return (
    <section id="contato" ref={sectionRef} className="relative w-full snap-start snap-always overflow-hidden">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div ref={imgWrapRef} className="absolute inset-[-6%] will-change-transform" style={{ filter: 'brightness(0.35)' }}>
        <FullBleedMedia src={image} type="image" alt="" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${colors.bg}F2 0%, ${colors.bg}D9 35%, ${colors.bg}80 70%, ${colors.bg}40 100%)`,
        }}
      />

      <div className="relative -mt-6 flex min-h-dvh w-full flex-col items-center justify-center px-6 pb-28 pt-10 sm:-mt-8 sm:px-10 sm:pb-32 sm:pt-14 md:px-16 md:pb-24 md:pt-16">
        <div
          className="mx-auto max-w-2xl text-center transition-[opacity,transform] duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 40}px)`,
          }}
        >
          <h2 style={displayFont} className="text-[clamp(1.75rem,5vw,3.75rem)]">
            {title}
          </h2>

          {ctaTagline ? (
            <p className="mt-5 text-lg sm:mt-7 sm:text-xl" style={{ ...displayFont, color: colors.accent }}>
              {ctaTagline}
            </p>
          ) : null}

          <div
            className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${
              ctaTagline ? 'mt-3' : 'mt-5 sm:mt-7 md:mt-9'
            }`}
          >
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

          {showMediaKit ? (
            <>
              <div className="mx-auto my-10 h-px w-16 sm:my-12" style={{ backgroundColor: colors.line }} />

              <p className="text-2xl sm:text-3xl" style={{ ...displayFont, color: colors.accent }}>
                {mediaKitTitle}
              </p>
              <p
                className="mx-auto mt-3 max-w-md text-sm leading-relaxed sm:text-base"
                style={{ ...bodyStyle, color: colors.muted }}
              >
                {mediaKitDescription}
              </p>
              <div className="mt-6">
                <CTAButton
                  href={mediaKitHref ?? ctaHref}
                  className="rounded-full border px-8 py-3.5 text-[13px] uppercase tracking-[0.08em]"
                  style={{ ...bodyStyle, borderColor: colors.accent, color: colors.accent }}
                >
                  <span className="inline-flex items-center gap-2">
                    <DocumentGlyph className="h-4 w-4 shrink-0" />
                    {mediaKitCtaLabel}
                  </span>
                </CTAButton>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Barra fixa: Instagram/e-mail/localização fora do fluxo da seção —
          só aparece com o Contato em tela, controlada pelo mesmo `isVisible`
          do IntersectionObserver acima. */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 transition-[opacity,transform] duration-700 ease-out sm:px-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 16}px)`,
        }}
      >
        <div
          className="pointer-events-auto flex w-full max-w-3xl flex-col items-center gap-1.5 rounded-t-sm border-t px-4 py-3 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:gap-4 sm:px-6"
          style={{ borderColor: colors.line, backgroundColor: `${colors.bg}F0` }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:justify-start">
            <a
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-100"
              style={{ ...bodyStyle, color: colors.muted, opacity: 0.7 }}
            >
              <InstagramGlyph className="h-3.5 w-3.5" />
              {instagramHandle}
            </a>
            <a
              href={emailHref}
              className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-100"
              style={{ ...bodyStyle, color: colors.muted, opacity: 0.7 }}
            >
              <MailGlyph className="h-3.5 w-3.5" />
              {emailLabel}
            </a>
          </div>

          <p
            className="text-[10px] uppercase tracking-[0.14em] sm:text-right"
            style={{ ...bodyStyle, color: colors.muted, opacity: 0.55 }}
          >
            {locationLine}
          </p>
        </div>
      </div>
    </section>
  )
}
