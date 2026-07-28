import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { CampaignsSection } from '../components/CampaignsSection'
import type { CampaignCategory } from '../components/CampaignsSection'
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

export function VinhoPage({ variation }: VinhoPageProps) {
  const title = variation?.headline ?? 'Isabella Marques'
  const lead = variation?.subheadline ?? 'Elegância sem exagero. Confiança sem esforço.'
  const bioLong = variation?.sobre ?? isabella.bioLong
  const ctaPrimary = variation?.ctaPrimary ?? 'Falar no WhatsApp'
  const ctaSecondary = variation?.ctaSecondary

  const portfolioItems = variation
    ? portfolio.map((item, i) => ({
        ...item,
        caption: `${variation.portfolio[i].title}.`,
        description: variation.portfolio[i].description,
      }))
    : portfolio

  // Vídeo novo, na /vinho principal (sem variação) e na /vinho-v2 — ver
  // Videos/Isabella - 10 - novo - Landscape.mp4. Apesar do nome, o arquivo
  // saiu em retrato (864×1056, gerado por IA) — usa o mesmo tratamento
  // padrão (retrato) das outras rotas, não o modo landscape. As demais
  // variações (v1, v3, v4, v5) continuam com o vídeo original.
  const useNewHeroVideo = !variation || variation.slug === 'vinho-v2'
  const heroVideoSrc = useNewHeroVideo ? videos.v10Landscape : heroVideos.vinho

  return (
    <div
      id={SCROLL_ROOT_ID}
      style={{ backgroundColor: bg, color: ink, ...body }}
      className="h-dvh w-full snap-y snap-mandatory overflow-y-auto"
    >
      <VideoHero
        videoSrc={heroVideoSrc}
        eyebrow="Modelo Comercial — São Paulo"
        title={title}
        titleClassName="text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.98]"
        lead={lead}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel={ctaPrimary}
        ctaHref={isabella.contactHref}
        ctaSecondaryLabel={ctaSecondary}
        ctaSecondaryHref={isabella.contactHref}
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
        image={images.rosto}
        bioLong={bioLong}
        stats={isabella.stats}
        overlayColor={bg}
        bodyStyle={{ ...body, color: ink }}
        mutedStyle={{ color: muted }}
        valueColor={ink}
        scroller={`#${SCROLL_ROOT_ID}`}
        eyebrow="Sobre"
        eyebrowStyle={{ ...body, color: accent }}
        imageBrightness={0.4}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolioItems}
        eyebrow="Portfólio"
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
        eyebrow="Campanhas ideais"
        eyebrowStyle={{ ...body, color: accent }}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, bg }}
        scroller={`#${SCROLL_ROOT_ID}`}
        partnersLogos={partnerLogos}
        partnersTitle="Marcas Parceiras"
      />

      {/* Contato final */}
      <ContactSection
        image={images.corpo}
        title="A presença que sua marca precisa."
        ctaPrimaryLabel={ctaPrimary}
        ctaHref={isabella.contactHref}
        ctaSecondaryLabel={ctaSecondary}
        ctaSecondaryHref={isabella.contactHref}
        instagramHandle={isabella.instagramHandle}
        instagramHref={isabella.instagramHref}
        emailLabel={isabella.contactLabel}
        emailHref={isabella.contactHref}
        responseTime={isabella.responseTime}
        locationLine={`${isabella.location.split(',')[0]} · Atuação nacional`}
        eyebrow="Contato"
        eyebrowStyle={{ ...body, color: accent }}
        displayFont={display}
        bodyStyle={body}
        colors={{ ink, muted, accent, line, ctaBg: vinho, ctaText: ink }}
      />

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
