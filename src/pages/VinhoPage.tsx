import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { CampaignsSection } from '../components/CampaignsSection'
import type { CampaignCategory } from '../components/CampaignsSection'
import { ProcessSection } from '../components/ProcessSection'
import type { ProcessStep } from '../components/ProcessSection'
import { ContactSection } from '../components/ContactSection'
import { isabella, images, portfolio, heroVideos, videos } from '../content/isabella'
import type { VinhoVariation } from '../content/vinhoVariations'
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

const bg = '#1A1310'
const ink = '#F3ECE4'
const muted = '#B9A99A'
const accent = '#C9A66B'
const line = '#3A2C27'
const vinho = '#6E1F2A'

const display = { fontFamily: "'Fraunces', serif", fontStyle: 'italic' as const, color: ink }
const body = { fontFamily: "'Inter', sans-serif" }

type VinhoPageProps = {
  /** Variação de copy (rotas /vinho-v1..v5). Sem isso, usa o conteúdo padrão. */
  variation?: VinhoVariation
}

const SCROLL_ROOT_ID = 'vinho-scroll-root'

// Enriquecimento local (ícone + foto de apoio em 3 delas) das categorias de
// `isabella.categories` — mantido aqui, não na fonte compartilhada, porque
// Noir/Riviera/Studio/Cover ainda mapeiam esse array como strings simples.
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

export function VinhoPage({ variation }: VinhoPageProps) {
  const title = variation?.headline ?? 'Isabella Marques'
  const lead = variation?.subheadline ?? 'Moda, beleza e lifestyle com autenticidade.'
  const bioLong = variation?.sobre ?? isabella.bioLong
  const ctaPrimary = variation?.ctaPrimary ?? 'Contato Comercial'
  const ctaContact = variation?.ctaPrimary ?? 'Solicitar Disponibilidade'
  const ctaSecondary = variation?.ctaSecondary

  const portfolioItems = variation
    ? portfolio.map((item, i) => ({
        ...item,
        caption: `${variation.portfolio[i].title}.`,
        description: variation.portfolio[i].description,
      }))
    : portfolio

  // Vídeo novo (par portrait/landscape "Isabella 01"), na /vinho principal
  // (sem variação) e na /vinho-v2. As demais variações (v1, v3, v4, v5)
  // continuam com o vídeo original.
  const useNewHeroVideo = !variation || variation.slug === 'vinho-v2'
  const heroVideoSrc = useNewHeroVideo ? videos.v01Portrait : heroVideos.vinho

  return (
    <div
      id={SCROLL_ROOT_ID}
      style={{ backgroundColor: bg, color: ink, ...body }}
      className="h-dvh w-full snap-y snap-mandatory overflow-y-auto"
    >
      <VideoHero
        videoSrc={heroVideoSrc}
        desktopVideoSrc={videos.v01Landscape}
        eyebrow="Modelo Comercial — São Paulo"
        title={title}
        titleClassName="text-[clamp(2.75rem,9vw,4.75rem)] leading-[0.98]"
        lead={lead}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel={ctaPrimary}
        ctaHref={isabella.contactHref}
        ctaSecondaryLabel={ctaSecondary}
        ctaSecondaryHref={isabella.contactHref}
        ctaTagline="Collabs e Campanhas"
        colors={{
          overlayTint: bg,
          text: ink,
          mutedText: muted,
          accent,
          ctaBg: vinho,
          ctaText: ink,
        }}
        displayFont={display}
        bodyFont={body}
        replayOnScroll
      />

      {/* Sobre */}
      <AboutSection
        image={images.v02Portrait}
        desktopImage={images.v02Landscape}
        bioLong={bioLong}
        stats={isabella.stats}
        overlayColor={bg}
        bodyStyle={{ ...body, color: ink }}
        mutedStyle={{ color: muted }}
        valueColor={accent}
        lineColor={line}
        scroller={`#${SCROLL_ROOT_ID}`}
        eyebrow="Sobre"
        eyebrowStyle={{ ...body, color: accent }}
        imageBrightness={0.4}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolioItems}
        eyebrow="Especialidades"
        eyebrowStyle={{ ...body, color: accent }}
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
        eyebrowStyle={{ ...body, color: accent }}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, bg }}
        scroller={`#${SCROLL_ROOT_ID}`}
        partnersLogos={partnerLogos}
        partnersTitle="Marcas Parceiras"
        desktopEnlarged
      />

      {/* Como funciona */}
      <ProcessSection
        image={images.v08Portrait}
        desktopImage={images.v08Landscape}
        steps={processSteps}
        eyebrow="Da ideia à campanha"
        eyebrowStyle={{ ...body, color: accent }}
        bodyStyle={body}
        displayFont={display}
        colors={{ ink, muted, accent, line, bg }}
      />

      {/* Contato final */}
      <ContactSection
        image={images.v07Portrait}
        desktopImage={images.v07Landscape}
        title="A presença que sua marca precisa."
        ctaPrimaryLabel={ctaContact}
        ctaHref={isabella.contactHref}
        ctaSecondaryLabel={ctaSecondary}
        ctaSecondaryHref={isabella.contactHref}
        ctaTagline="Parcerias"
        mediaKitDescription="Reúne formatos de conteúdo, métricas e disponibilidade para propostas de parceria."
        mediaKitCtaLabel="Solicitar Mídia Kit"
        instagramHandle={isabella.instagramHandle}
        instagramHref={isabella.instagramHref}
        emailLabel={isabella.contactLabel}
        emailHref={isabella.contactHref}
        locationLine={`${isabella.location.split(',')[0]} · Atuação nacional`}
        eyebrow="Contato"
        eyebrowStyle={{ ...body, color: accent }}
        displayFont={display}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, bg, ctaBg: vinho, ctaText: ink }}
      />

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
