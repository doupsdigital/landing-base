import { ScrollFade } from '../components/ScrollFade'
import { CTAButton } from '../components/CTAButton'
import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { SectionDivider } from '../components/SectionDivider'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'
import type { VinhoVariation } from '../content/vinhoVariations'

const bg = '#1A1310'
const ink = '#F3ECE4'
const muted = '#B9A99A'
const accent = '#C9A66B'
const line = '#3A2C27'
const vinho = '#6E1F2A'

const display = { fontFamily: "'Playfair Display', serif", color: ink }
const body = { fontFamily: "'Inter', sans-serif" }

type VinhoPageProps = {
  /** Variação de copy (rotas /vinho-v1..v5). Sem isso, usa o conteúdo padrão. */
  variation?: VinhoVariation
}

export function VinhoPage({ variation }: VinhoPageProps) {
  const title = variation?.headline ?? 'Isabella Marques'
  const lead = variation?.subheadline ?? isabella.bioShort
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

  return (
    <div style={{ backgroundColor: bg, color: ink, ...body }} className="min-h-screen">
      <VideoHero
        videoSrc={heroVideos.vinho}
        eyebrow="Modelo Comercial — São Paulo"
        title={title}
        titleClassName="text-[clamp(2.5rem,7vw,6rem)] leading-[1.02]"
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
      />

      {/* Sobre */}
      <SectionDivider label="Sobre" labelStyle={{ color: accent }} bg={bg} />
      <AboutSection
        image={images.rosto}
        bioLong={bioLong}
        overlayColor={bg}
        bodyStyle={{ ...body, color: ink }}
        mutedStyle={{ color: muted }}
        valueColor={ink}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolioItems}
        eyebrow="Portfólio"
        eyebrowStyle={{ ...body, color: accent }}
        captionStyle={{ ...display }}
        descriptionStyle={{ ...body, color: ink }}
        overlayColor={bg}
      />

      {/* Campanhas ideais */}
      <SectionDivider label="Campanhas ideais" labelStyle={{ color: accent }} bg={bg} />
      <section className="px-6 py-16 sm:px-10 md:px-16">
        <ScrollFade>
          <div className="flex flex-wrap gap-3">
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
        </ScrollFade>
      </section>

      {/* Contato final */}
      <SectionDivider label="Contato" labelStyle={{ color: accent }} bg={bg} />
      <section id="contato" className="px-6 py-24 text-center sm:px-10">
        <ScrollFade>
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
        </ScrollFade>
      </section>

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
