import { VideoHero } from '../components/VideoHero'
import { AboutSection } from '../components/AboutSection'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { CampaignsSection } from '../components/CampaignsSection'
import type { CampaignCategory } from '../components/CampaignsSection'
import { ProcessSection } from '../components/ProcessSection'
import type { ProcessStep } from '../components/ProcessSection'
import { ContactSection } from '../components/ContactSection'
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

const bg = '#FFFFFF'
const ink = '#15140F'
const muted = '#6B6A63'
const accent = '#616D5A'
const surface = '#F1EFE9'
const line = '#DEDACF'
// Reservado pro rótulo fixo do Portfólio: é a única seção realmente escura
// (foto/vídeo full-bleed) — o `accent` (verde-oliva escuro) não teria
// contraste suficiente ali, então usa-se um tom claro só nesse caso.
const darkSectionLabel = '#DCE0D6'

const display = { fontFamily: "'Space Grotesk', sans-serif", color: ink }
const body = { fontFamily: "'Inter', sans-serif" }
const mono = { fontFamily: "'IBM Plex Mono', monospace" }

const SCROLL_ROOT_ID = 'studio-scroll-root'

// Copy: variação "Resultados & Mídia Kit" (ver src/content/vinhoVariations.ts)
// — tom orientado a dados/métricas combina com a identidade mono da Studio.
const copy = vinhoVariations.v1
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

export function StudioPage() {
  return (
    <div
      id={SCROLL_ROOT_ID}
      style={{ backgroundColor: bg, color: ink, ...body }}
      className="h-dvh w-full snap-y snap-mandatory overflow-y-auto"
    >
      <VideoHero
        videoSrc={heroVideos.studio}
        eyebrow="Modelo Comercial — São Paulo"
        title={copy.headline}
        titleClassName="text-[clamp(2.25rem,6vw,4rem)] leading-[1.02]"
        lead={copy.subheadline}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel="Contato Comercial"
        ctaHref={isabella.contactHref}
        ctaTagline="Collabs e Campanhas"
        colors={{ overlayTint: ink, text: bg, mutedText: surface, accent, ctaBg: bg, ctaText: ink }}
        displayFont={display}
        bodyFont={body}
        labelFont={mono}
        replayOnScroll
      />

      {/* Sobre */}
      <AboutSection
        image={images.rosto}
        bioLong={copy.sobre}
        stats={isabella.stats}
        overlayColor={ink}
        bodyStyle={{ ...body, color: bg }}
        mutedStyle={{ ...mono, color: surface }}
        valueColor={darkSectionLabel}
        lineColor={line}
        scroller={`#${SCROLL_ROOT_ID}`}
        eyebrow="Sobre"
        eyebrowStyle={{ ...mono, color: darkSectionLabel }}
        imageBrightness={0.4}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolioItems}
        eyebrow="Especialidades"
        eyebrowStyle={{ ...mono, color: darkSectionLabel }}
        captionStyle={{ ...display, color: '#FFFFFF' }}
        descriptionStyle={{ ...body, color: surface }}
        overlayColor={ink}
        mediaBrightness={0.4}
      />

      {/* Campanhas ideais */}
      <CampaignsSection
        categories={campaignCategories}
        intro="Um perfil versátil o suficiente pra transitar entre esses universos sem perder consistência."
        eyebrow="Campanhas"
        eyebrowStyle={{ ...mono, color: accent }}
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
        eyebrowStyle={{ ...mono, color: accent }}
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
        eyebrowStyle={{ ...mono, color: accent }}
        displayFont={display}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, bg, ctaBg: ink, ctaText: bg }}
      />

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted, ...mono }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
