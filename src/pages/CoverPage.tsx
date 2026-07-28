import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CTAButton } from '../components/CTAButton'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { CampaignsSection } from '../components/CampaignsSection'
import type { CampaignCategory } from '../components/CampaignsSection'
import { ProcessSection } from '../components/ProcessSection'
import type { ProcessStep } from '../components/ProcessSection'
import { ContactSection } from '../components/ContactSection'
import { FullBleedMedia } from '../components/FullBleedMedia'
import { gsap } from '../lib/gsap'
import { hexToRgba } from '../lib/color'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'
import { vinhoVariations } from '../content/vinhoVariations'
import logoGucci from '../assets/images/logos/01 - Gucci_logo.png'
import logoVersace from '../assets/images/logos/02 - versace-primary-logo.png'
import logoChanel from '../assets/images/logos/03 - Chanel_logo.png'
import logoDolceGabbana from '../assets/images/logos/04 - Dolce-Gabbana-Logo.png'
import logoLouisVuitton from '../assets/images/logos/05 Louis-Vuitton-logo.png'
import logoZara from '../assets/images/logos/06 - ZARA-logo.png'

const partnerLogos = [
  { src: logoGucci, alt: 'Gucci' },
  { src: logoVersace, alt: 'Versace' },
  { src: logoChanel, alt: 'Chanel' },
  { src: logoDolceGabbana, alt: 'Dolce & Gabbana' },
  { src: logoLouisVuitton, alt: 'Louis Vuitton' },
  { src: logoZara, alt: 'Zara' },
]

const bg = '#14150F'
const ink = '#EFE9DD'
const muted = '#A79E8C'
const accent = '#C6A15B'
const line = '#33362A'

const display = { fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' as const, color: ink }
const body = { fontFamily: "'Inter', sans-serif" }
const data = { fontFamily: "'Archivo', sans-serif" }

const SCROLL_ROOT_ID = 'cover-scroll-root'

/** Fração da seção visível pra disparar o replay — mesmo valor usado no Hero/Portfólio das outras rotas. */
const ACTIVE_THRESHOLD = 0.6

// Copy: variação "Lifestyle & Conexão" (ver src/content/vinhoVariations.ts)
// — tom pessoal/caloroso contrasta bem com o nome gigante e dramático do Cover.
const copy = vinhoVariations.v5
const portfolioItems = portfolio.map((item, i) => ({
  ...item,
  caption: `${copy.portfolio[i].title}.`,
  description: copy.portfolio[i].description,
}))

const campaignCategories: CampaignCategory[] = [
  { label: 'Moda feminina', icon: 'dress', image: images.fashion02 },
  { label: 'Beleza & skincare', icon: 'sparkle', image: images.beauty09 },
  { label: 'Fitness & wellness', icon: 'dumbbell', image: images.fitness },
  { label: 'Joias & acessórios', icon: 'gem', image: images.skirt11 },
]

const processSteps: ProcessStep[] = [
  {
    number: '1',
    title: 'Briefing',
    description: 'Compartilhe os objetivos da campanha, o público e o estilo desejado.',
  },
  {
    number: '2',
    title: 'Alinhamento',
    description: 'Definimos disponibilidade, formato do conteúdo, cronograma e detalhes da produção.',
  },
  {
    number: '3',
    title: 'Produção',
    description: 'Realizamos a sessão de fotos ou vídeos seguindo o briefing aprovado.',
  },
  {
    number: '4',
    title: 'Entrega',
    description: 'Você recebe todo o material pronto para usar em campanhas, redes sociais e ações de marketing.',
  },
]

/**
 * Hero de assinatura da Cover — nome gigante estilo capa de revista, layout
 * próprio (não usa o VideoHero compartilhado). Reanima com o mesmo padrão
 * de replay-no-scroll do VideoHero (timeline pausada + IntersectionObserver
 * reiniciando ao voltar a ficar visível), pra ter o mesmo comportamento das
 * outras rotas mantendo o visual exclusivo desta página.
 */
function CoverHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const leadRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true, delay: 0.35, defaults: { ease: 'power2.out' } })
        .fromTo(videoRef.current, { scale: 1.1 }, { scale: 1, duration: 1.6 }, 0)
        .fromTo(overlayRef.current, { opacity: 0.3 }, { opacity: 1, duration: 1.2 }, 0)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .fromTo(nameRef.current, { opacity: 0, y: 34, scale: 1.04 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.2)
        .fromTo(leadRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.42)
        .fromTo(statsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.56)
        .fromTo(taglineRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.68)
        .fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
      timelineRef.current = tl
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
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
  }, [])

  return (
    <section ref={sectionRef} className="relative h-dvh w-full snap-start snap-always overflow-hidden">
      <FullBleedMedia src={heroVideos.cover} type="video" alt="" mediaRef={videoRef} className="absolute inset-0" />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${bg} 0%, ${bg} 3%, ${hexToRgba(bg, 0.15)} 55%)`,
        }}
      />

      {/* Navegação temporária de testes — some quando as rotas de exemplo saírem */}
      <Link
        to="/"
        aria-label="Voltar"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-lg no-underline transition-opacity hover:opacity-80 sm:left-6 sm:top-6"
        style={{ backgroundColor: hexToRgba(bg, 0.55), color: ink, backdropFilter: 'blur(6px)' }}
      >
        ←
      </Link>

      <span
        ref={eyebrowRef}
        className="absolute left-6 top-20 text-sm sm:text-base uppercase tracking-[0.24em] sm:left-10 sm:top-24"
        style={{ ...data, color: accent }}
      >
        Modelo Comercial — São Paulo
      </span>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-[clamp(2.5rem,8vh,5rem)] text-center sm:px-10">
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
          {copy.subheadline}
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

        <p ref={taglineRef} className="mt-6 text-lg sm:text-xl" style={{ ...display, color: accent }}>
          Collabs e Campanhas
        </p>

        <div ref={ctaRef} className="mt-3 inline-block">
          <CTAButton
            href={isabella.contactHref}
            className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
            style={{ backgroundColor: ink, color: bg, ...data }}
          >
            Contato Comercial
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

export function CoverPage() {
  return (
    <div
      id={SCROLL_ROOT_ID}
      style={{ backgroundColor: bg, color: ink, ...body }}
      className="h-dvh w-full snap-y snap-mandatory overflow-y-auto"
    >
      <CoverHero />

      {/* Sobre */}
      <AboutSection
        image={images.rosto}
        bioLong={copy.sobre}
        stats={isabella.stats}
        overlayColor={bg}
        bodyStyle={{ ...body, color: ink }}
        mutedStyle={{ ...data, color: muted }}
        valueColor={accent}
        lineColor={line}
        scroller={`#${SCROLL_ROOT_ID}`}
        eyebrow="Sobre"
        eyebrowStyle={{ ...data, color: accent }}
        imageBrightness={0.4}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolioItems}
        eyebrow="Especialidades"
        eyebrowStyle={{ ...data, color: accent }}
        captionStyle={{ ...display }}
        descriptionStyle={{ ...body, color: ink }}
        overlayColor={bg}
        mediaBrightness={0.4}
      />

      {/* Campanhas ideais */}
      <CampaignsSection
        categories={campaignCategories}
        intro="Um perfil versátil o suficiente pra transitar entre esses universos sem perder consistência."
        eyebrow="Campanhas"
        eyebrowStyle={{ ...data, color: accent }}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, bg }}
        scroller={`#${SCROLL_ROOT_ID}`}
        partnersLogos={partnerLogos}
        partnersTitle="Marcas Parceiras"
      />

      {/* Como funciona */}
      <ProcessSection
        image={images.dress10}
        steps={processSteps}
        eyebrow="Da ideia à campanha"
        eyebrowStyle={{ ...data, color: accent }}
        bodyStyle={body}
        displayFont={display}
        colors={{ ink, muted, accent, line, bg }}
      />

      {/* Contato final */}
      <ContactSection
        image={images.corpo}
        title="A presença que sua marca precisa."
        ctaPrimaryLabel="Solicitar Disponibilidade"
        ctaHref={isabella.contactHref}
        ctaTagline="Parcerias"
        mediaKitDescription="Reúne formatos de conteúdo, métricas e disponibilidade para propostas de parceria."
        mediaKitCtaLabel="Solicitar Mídia Kit"
        instagramHandle={isabella.instagramHandle}
        instagramHref={isabella.instagramHref}
        emailLabel={isabella.contactLabel}
        emailHref={isabella.contactHref}
        locationLine={`${isabella.location.split(',')[0]} · Atuação nacional`}
        eyebrow="Contato"
        eyebrowStyle={{ ...data, color: accent }}
        displayFont={display}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, bg, ctaBg: ink, ctaText: bg }}
      />

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted, ...data }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
