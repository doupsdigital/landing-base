import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ScrollFade } from '../components/ScrollFade'
import { CTAButton } from '../components/CTAButton'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { FullBleedMedia } from '../components/FullBleedMedia'
import { gsap } from '../lib/gsap'
import { hexToRgba } from '../lib/color'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'

const bg = '#14150F'
const ink = '#EFE9DD'
const muted = '#A79E8C'
const accent = '#C6A15B'
const surface = '#1D1F17'
const line = '#33362A'

const display = { fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' as const, color: ink }
const body = { fontFamily: "'Inter', sans-serif" }
const data = { fontFamily: "'Archivo', sans-serif" }

function CoverHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .fromTo(videoRef.current, { scale: 1.1 }, { scale: 1, duration: 1.6 }, 0)
        .fromTo(overlayRef.current, { opacity: 0.3 }, { opacity: 0.9, duration: 1.2 }, 0)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .fromTo(nameRef.current, { opacity: 0, y: 34, scale: 1.04 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.2)
        .fromTo(leadRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.42)
        .fromTo(statsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.56)
        .fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.68)
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <FullBleedMedia
        src={heroVideos.cover}
        type="video"
        alt=""
        mediaRef={videoRef}
        className="absolute inset-0"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${hexToRgba(bg, 0.95)}, ${hexToRgba(bg, 0.15)} 55%)`,
        }}
      />

      {/* Barra fixa — nome + contato, sempre visível */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-5 py-4 sm:px-10"
        style={{
          backgroundColor: hexToRgba(bg, 0.55),
          backdropFilter: 'blur(6px)',
          borderBottom: `1px solid ${hexToRgba(ink, 0.12)}`,
        }}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.14em] no-underline opacity-70 transition-opacity hover:opacity-100"
            style={{ color: muted }}
          >
            ← Direções
          </Link>
          <span className="text-sm sm:text-base" style={display}>
            {isabella.name}
          </span>
        </div>
        <a
          href="#contato"
          className="rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.12em] no-underline transition-opacity hover:opacity-80"
          style={{ borderColor: hexToRgba(ink, 0.5), color: ink, ...data }}
        >
          Contato
        </a>
      </div>

      <span
        ref={eyebrowRef}
        className="absolute left-6 top-20 text-xs uppercase tracking-[0.24em] sm:left-10 sm:top-24"
        style={{ ...data, color: accent }}
      >
        Modelo Comercial — São Paulo
      </span>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-10 text-center sm:px-10 sm:pb-14">
        <h1
          ref={nameRef}
          className="select-none text-[20vw] leading-[0.86] sm:text-[15vw] md:text-[clamp(4.5rem,13vw,11rem)]"
          style={display}
        >
          Isabella
        </h1>
        <p
          ref={leadRef}
          className="mx-auto mt-4 max-w-[42ch] text-base leading-relaxed sm:text-lg"
          style={{ ...body, color: ink, opacity: 0.9 }}
        >
          {isabella.bioShort}
        </p>

        <div ref={statsRef} className="mt-6 flex flex-wrap items-start justify-center gap-x-10 gap-y-3">
          {[...isabella.socialStats, { value: isabella.location.split(',')[0], label: isabella.locationLabel }].map(
            (s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl" style={display}>
                  {s.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ ...data, color: muted }}>
                  {s.label}
                </p>
              </div>
            ),
          )}
        </div>

        <div ref={ctaRef} className="mt-7 inline-block">
          <CTAButton
            href={isabella.contactHref}
            className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
            style={{ backgroundColor: ink, color: bg, ...data }}
          >
            Falar com a modelo
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

export function CoverPage() {
  return (
    <div style={{ backgroundColor: bg, color: ink, ...body }} className="min-h-screen">
      <CoverHero />

      {/* Sobre */}
      <section className="border-t px-6 py-16 sm:px-10 md:px-16" style={{ borderColor: line }}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <ScrollFade>
            <span className="mb-4 block text-xs uppercase tracking-[0.2em]" style={{ ...data, color: accent }}>
              Sobre
            </span>
            <p className="max-w-[52ch] text-lg leading-relaxed opacity-90">{isabella.bioLong}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm" style={{ ...data, color: muted }}>
              {isabella.stats.map((s) => (
                <span key={s.label}>
                  <span style={{ color: ink }}>{s.value}</span> · {s.label}
                </span>
              ))}
            </div>
          </ScrollFade>
          <ScrollFade y={60}>
            <div
              className="aspect-[4/3] w-full overflow-hidden rounded-sm border"
              style={{ borderColor: line, backgroundColor: surface }}
            >
              <img
                src={images.dress10}
                alt="Isabella Marques, produção editorial"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolio}
        eyebrow="Portfólio"
        eyebrowStyle={{ ...data, color: accent }}
        captionStyle={{ ...display }}
        overlayColor={bg}
      />

      {/* Campanhas ideais */}
      <section className="border-t px-6 py-16 sm:px-10 md:px-16" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-6 block text-xs uppercase tracking-[0.2em]" style={{ ...data, color: accent }}>
            Campanhas ideais
          </span>
          <div className="flex flex-wrap gap-3">
            {isabella.categories.map((c) => (
              <span
                key={c}
                className="rounded-sm border px-4 py-2 text-sm"
                style={{ borderColor: line, color: ink, ...data }}
              >
                {c}
              </span>
            ))}
          </div>
        </ScrollFade>
      </section>

      {/* Contato final */}
      <section id="contato" className="border-t px-6 py-24 text-center sm:px-10" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-6 block text-xs uppercase tracking-[0.2em]" style={{ ...data, color: accent }}>
            Contato
          </span>
          <h2 style={display} className="text-[clamp(2.5rem,7vw,5.5rem)]">
            Vamos criar juntos.
          </h2>
          <div className="mt-8 inline-block">
            <CTAButton
              href={isabella.contactHref}
              className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
              style={{ backgroundColor: ink, color: bg, ...data }}
            >
              Falar com a modelo
            </CTAButton>
          </div>
        </ScrollFade>
      </section>

      <footer
        className="border-t px-6 py-8 text-[11px] sm:px-10"
        style={{ borderColor: line, color: muted, ...data }}
      >
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
