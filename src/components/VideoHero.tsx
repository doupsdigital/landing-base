import { useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { hexToRgba } from '../lib/color'
import { CTAButton } from './CTAButton'
import { FullBleedMedia } from './FullBleedMedia'

type StatItem = { value: string; label: string }

type VideoHeroColors = {
  // Cor de base do gradiente escuro atrás do texto (tingimento do vídeo) —
  // normalmente a cor mais escura da paleta, mesmo em páginas de tema claro.
  overlayTint: string
  // Cor do texto sobre o vídeo — precisa ser clara/legível sobre o overlay
  // escuro, mesmo em páginas cujo "ink" normal é escuro (ex: Riviera, Studio).
  text: string
  mutedText: string
  accent: string
  ctaBg: string
  ctaText: string
}

type VideoHeroProps = {
  videoSrc: string
  name: string
  eyebrow: string
  title: string
  lead: string
  location: string
  locationLabel: string
  stats: StatItem[]
  ctaLabel: string
  ctaHref: string
  colors: VideoHeroColors
  displayFont: CSSProperties
  bodyFont: CSSProperties
  /** Fonte de eyebrow, labels de stats, botão Contato e CTA. Padrão: bodyFont. */
  labelFont?: CSSProperties
  titleClassName?: string
  contactAnchor?: string
}

export function VideoHero({
  videoSrc,
  name,
  eyebrow,
  title,
  lead,
  location,
  locationLabel,
  stats,
  ctaLabel,
  ctaHref,
  colors,
  displayFont,
  bodyFont,
  labelFont,
  titleClassName = 'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]',
  contactAnchor = '#contato',
}: VideoHeroProps) {
  const dataFont = labelFont ?? bodyFont
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .fromTo(videoRef.current, { scale: 1.1 }, { scale: 1, duration: 1.6 }, 0)
        .fromTo(overlayRef.current, { opacity: 0.25 }, { opacity: 0.85, duration: 1.2 }, 0)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .fromTo(titleRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, 0.22)
        .fromTo(leadRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.38)
        .fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.62)
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <FullBleedMedia src={videoSrc} type="video" alt="" mediaRef={videoRef} className="absolute inset-0" />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${hexToRgba(colors.overlayTint, 0.92)}, ${hexToRgba(colors.overlayTint, 0.12)} 60%)`,
        }}
      />

      {/* Barra fixa — nome + contato, sempre visível */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-5 py-4 sm:px-10"
        style={{
          backgroundColor: hexToRgba(colors.overlayTint, 0.55),
          backdropFilter: 'blur(6px)',
          borderBottom: `1px solid ${hexToRgba(colors.text, 0.12)}`,
        }}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.14em] no-underline opacity-70 transition-opacity hover:opacity-100"
            style={{ color: colors.mutedText }}
          >
            ← Direções
          </Link>
          <span className="text-sm sm:text-base" style={{ ...displayFont, color: colors.text }}>
            {name}
          </span>
        </div>
        <a
          href={contactAnchor}
          className="rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.12em] no-underline transition-opacity hover:opacity-80"
          style={{ borderColor: hexToRgba(colors.text, 0.5), color: colors.text, ...dataFont }}
        >
          Contato
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 sm:pb-16 md:px-16">
        <div ref={eyebrowRef} className="mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-5" style={{ backgroundColor: colors.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ ...dataFont, color: colors.accent }}>
            {eyebrow}
          </span>
        </div>

        <h1
          ref={titleRef}
          style={{ ...displayFont, color: colors.text }}
          className={`whitespace-pre-line ${titleClassName}`}
        >
          {title}
        </h1>

        <p
          ref={leadRef}
          className="mt-5 max-w-[46ch] text-base leading-relaxed sm:text-lg"
          style={{ ...bodyFont, color: colors.text, opacity: 0.85 }}
        >
          {lead}
        </p>

        <div ref={statsRef} className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[...stats, { value: location, label: locationLabel }].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl" style={{ ...displayFont, color: colors.text }}>
                {s.value}
              </p>
              <p
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ ...dataFont, color: colors.mutedText }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-9">
          <CTAButton
            href={ctaHref}
            className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
            style={{ backgroundColor: colors.ctaBg, color: colors.ctaText, ...dataFont }}
          >
            {ctaLabel}
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
