import { useEffect, useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { hexToRgba } from '../lib/color'
import { CTAButton } from './CTAButton'
import { MagneticGlowButton } from './MagneticGlowButton'
import { FullBleedMedia } from './FullBleedMedia'

/** Fração da seção visível pra disparar o replay — mesmo valor usado no Portfólio. */
const ACTIVE_THRESHOLD = 0.6

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
  eyebrow: string
  title: string
  lead: string
  location: string
  locationLabel: string
  stats: StatItem[]
  ctaLabel: string
  ctaHref: string
  /** CTA secundário, opcional — link discreto ao lado do botão principal. */
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  /** Legenda opcional em cima do CTA principal, na mesma fonte de destaque (displayFont) dos valores de stat. */
  ctaTagline?: string
  colors: VideoHeroColors
  displayFont: CSSProperties
  bodyFont: CSSProperties
  /** Fonte de eyebrow, labels de stats e CTA. Padrão: bodyFont. */
  labelFont?: CSSProperties
  titleClassName?: string
  /** Vídeo de fundo em 16:9 em vez do padrão 9:16 do projeto — ver FullBleedMedia. */
  videoOrientation?: 'portrait' | 'landscape'
  /** Reanima o texto (com 350ms de atraso) toda vez que a seção volta a ficar visível no scroll, em vez de tocar só uma vez no load. Padrão: false. */
  replayOnScroll?: boolean
}

export function VideoHero({
  videoSrc,
  eyebrow,
  title,
  lead,
  location,
  locationLabel,
  stats,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  ctaTagline,
  colors,
  displayFont,
  bodyFont,
  labelFont,
  titleClassName = 'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]',
  videoOrientation = 'portrait',
  replayOnScroll = false,
}: VideoHeroProps) {
  const dataFont = labelFont ?? bodyFont
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: replayOnScroll, delay: replayOnScroll ? 0.35 : 0, defaults: { ease: 'power2.out' } })
        .fromTo(videoRef.current, { scale: 1.1 }, { scale: 1, duration: 1.6 }, 0)
        .fromTo(overlayRef.current, { opacity: 0.25 }, { opacity: 1, duration: 1.2 }, 0)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .fromTo(titleRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .fromTo(leadRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1.05)
      if (taglineRef.current) {
        tl.fromTo(taglineRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 1.3)
      }
      tl.fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5)
      timelineRef.current = tl
      if (!replayOnScroll) tl.play()
    })
    return () => ctx.revert()
  }, [replayOnScroll])

  // Sem isso, a animação só toca uma vez no load — replayOnScroll reanima
  // toda vez que a seção volta a ficar visível (ex: rolando de volta pra
  // cima a partir da seção Sobre), igual ao Portfólio.
  useEffect(() => {
    if (!replayOnScroll) return
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= ACTIVE_THRESHOLD) timelineRef.current?.restart()
        })
      },
      { threshold: ACTIVE_THRESHOLD },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [replayOnScroll])

  return (
    <section ref={sectionRef} className="relative h-dvh w-full snap-start snap-always overflow-hidden">
      <FullBleedMedia
        src={videoSrc}
        type="video"
        alt=""
        mediaRef={videoRef}
        className="absolute inset-0"
        orientation={videoOrientation}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${colors.overlayTint} 0%, ${colors.overlayTint} 3%, ${hexToRgba(colors.overlayTint, 0.12)} 60%)`,
        }}
      />

      {/* Navegação temporária de testes — some quando as rotas de exemplo saírem */}
      <Link
        to="/"
        aria-label="Voltar"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-lg no-underline transition-opacity hover:opacity-80 sm:left-6 sm:top-6"
        style={{ backgroundColor: hexToRgba(colors.overlayTint, 0.55), color: colors.text, backdropFilter: 'blur(6px)' }}
      >
        ←
      </Link>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-[clamp(2rem,8dvh,5rem)] sm:px-10 md:px-16">
        <div ref={eyebrowRef} className="mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-5" style={{ backgroundColor: colors.accent }} />
          <span className="text-sm uppercase tracking-[0.2em] sm:text-base" style={{ ...dataFont, color: colors.accent }}>
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
          className="mt-4 max-w-[46ch] text-base leading-relaxed sm:mt-5 sm:text-lg"
          style={{ ...bodyFont, color: colors.text, opacity: 0.85 }}
        >
          {lead}
        </p>

        <div ref={statsRef} className="mt-6 flex flex-wrap gap-x-10 gap-y-4 sm:mt-8">
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

        {ctaTagline ? (
          <p
            ref={taglineRef}
            className="mt-6 text-lg sm:mt-8 sm:text-xl"
            style={{ ...displayFont, color: colors.accent }}
          >
            {ctaTagline}
          </p>
        ) : null}

        <div ref={ctaRef} className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${ctaTagline ? 'mt-3' : 'mt-9'}`}>
          <MagneticGlowButton
            href={ctaHref}
            glowColor={colors.accent}
            className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
            style={{ backgroundColor: colors.ctaBg, color: colors.ctaText, ...dataFont }}
          >
            {ctaLabel}
          </MagneticGlowButton>
          {ctaSecondaryLabel ? (
            <CTAButton
              href={ctaSecondaryHref ?? ctaHref}
              className="text-[13px] uppercase tracking-[0.08em] underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
              style={{ color: colors.text, ...dataFont }}
            >
              {ctaSecondaryLabel}
            </CTAButton>
          ) : null}
        </div>
      </div>
    </section>
  )
}
