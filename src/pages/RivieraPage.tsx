import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
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

// Nomes mantidos como no arquivo original: `bg` é o creme claro (usado como
// texto/primeiro plano sobre as seções, e como canvas do wrapper/rodapé) e
// `ink` é o marrom escuro (usado como fundo dominante das seções de
// conteúdo) — ver mapeamento invertido nos `colors` de cada seção abaixo.
const bg = '#EFE6D3'
const ink = '#2B2118'
const muted = '#7A6C57'
const accent = '#97733A'
const surface = '#E2D5B8'
const line = '#D3C3A0'
// Creme ligeiramente mais claro, reservado pras legendas grandes do Portfólio.
const captionCream = '#F8F3E8'

const display = { fontFamily: "'Cormorant Garamond', serif", color: ink }
const body = { fontFamily: "'Manrope', sans-serif" }

const SCROLL_ROOT_ID = 'riviera-scroll-root'

// Copy: variação "Confiança & Autoridade" (ver src/content/vinhoVariations.ts)
// — tom premium/confiança combina com o visual dourado e refinado da Riviera.
const copy = vinhoVariations.v4
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

export function RivieraPage() {
  return (
    <div
      id={SCROLL_ROOT_ID}
      style={{ backgroundColor: bg, color: ink, ...body }}
      className="h-dvh w-full snap-y snap-mandatory overflow-y-auto"
    >
      <VideoHero
        videoSrc={heroVideos.riviera}
        eyebrow="Modelo Comercial — São Paulo"
        title="Isabella Marques"
        titleClassName="text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02]"
        lead={copy.subheadline}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel="Contato Comercial"
        ctaHref={isabella.contactHref}
        ctaTagline="Collabs e Campanhas"
        colors={{ overlayTint: ink, text: bg, mutedText: surface, accent, ctaBg: ink, ctaText: bg }}
        displayFont={display}
        bodyFont={body}
        replayOnScroll
      />

      {/* Sobre */}
      <AboutSection
        image={images.rosto}
        bioLong={copy.sobre}
        stats={isabella.stats}
        overlayColor={ink}
        bodyStyle={{ ...body, color: bg }}
        mutedStyle={{ color: surface }}
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
        captionStyle={{ ...display, color: captionCream }}
        descriptionStyle={{ ...body, color: bg }}
        overlayColor={ink}
        mediaBrightness={0.4}
      />

      {/* Campanhas ideais */}
      <CampaignsSection
        categories={campaignCategories}
        intro="Um perfil versátil o suficiente pra transitar entre esses universos sem perder consistência."
        eyebrow="Campanhas"
        eyebrowStyle={{ ...body, color: accent }}
        bodyStyle={body}
        colors={{ ink: bg, muted: surface, accent, line, bg: ink }}
        scroller={`#${SCROLL_ROOT_ID}`}
        partnersLogos={partnerLogos}
        partnersTitle="Marcas Parceiras"
      />

      {/* Como funciona */}
      <ProcessSection
        image={images.dress10}
        steps={processSteps}
        eyebrow="Da ideia à campanha"
        eyebrowStyle={{ ...body, color: accent }}
        bodyStyle={body}
        displayFont={{ ...display, color: bg }}
        colors={{ ink: bg, muted: surface, accent, line, bg: ink }}
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
        eyebrowStyle={{ ...body, color: accent }}
        displayFont={{ ...display, color: bg }}
        bodyStyle={body}
        colors={{ ink: bg, muted: surface, accent, line, bg: ink, ctaBg: ink, ctaText: bg }}
      />

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
