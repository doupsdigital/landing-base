import { CTAButton } from '../components/CTAButton'
import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { isabella, images, portfolio, heroVideos, videos } from '../content/isabella'
import type { VinhoVariation } from '../content/vinhoVariations'

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
      className="h-screen w-full snap-y snap-mandatory overflow-y-auto"
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
      <section className="relative w-full snap-start snap-always">
        <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
          <span
            className="text-sm uppercase tracking-[0.3em] sm:text-base"
            style={{ ...body, color: accent, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
          >
            Campanhas ideais
          </span>
        </div>
        <div className="-mt-6 flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 sm:-mt-8 sm:px-10 md:px-16">
          <div className="flex flex-wrap justify-center gap-3">
            {isabella.categories.map((c) => (
              <span
                key={c}
                className="rounded-sm border px-4 py-2 text-sm"
                style={{ borderColor: line, color: ink }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contato final */}
      <section id="contato" className="relative w-full snap-start snap-always">
        <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
          <span
            className="text-sm uppercase tracking-[0.3em] sm:text-base"
            style={{ ...body, color: accent, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
          >
            Contato
          </span>
        </div>
        <div className="-mt-6 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center sm:-mt-8 sm:px-10">
          <h2 style={display} className="text-[clamp(2rem,5vw,4rem)]">
            Vamos criar juntos.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <CTAButton
              href={isabella.contactHref}
              className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
              style={{ backgroundColor: vinho, color: ink }}
            >
              {ctaPrimary}
            </CTAButton>
            {ctaSecondary ? (
              <CTAButton
                href={isabella.contactHref}
                className="text-[13px] uppercase tracking-[0.08em] underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
                style={{ color: ink }}
              >
                {ctaSecondary}
              </CTAButton>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
