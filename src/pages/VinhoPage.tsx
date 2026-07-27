import { ScrollFade } from '../components/ScrollFade'
import { CTAButton } from '../components/CTAButton'
import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'

const bg = '#1A1310'
const ink = '#F3ECE4'
const muted = '#B9A99A'
const accent = '#C9A66B'
const line = '#3A2C27'
const vinho = '#6E1F2A'

const display = { fontFamily: "'Playfair Display', serif", color: ink }
const body = { fontFamily: "'Inter', sans-serif" }

export function VinhoPage() {
  return (
    <div style={{ backgroundColor: bg, color: ink, ...body }} className="min-h-screen">
      <VideoHero
        videoSrc={heroVideos.vinho}
        name={isabella.name}
        eyebrow="Modelo Comercial — São Paulo"
        title="Isabella Marques"
        titleClassName="text-[clamp(2.5rem,7vw,6rem)] leading-[1.02]"
        lead={isabella.bioShort}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel="Falar no WhatsApp"
        ctaHref={isabella.contactHref}
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
      <AboutSection
        image={images.rosto}
        bioLong={isabella.bioLong}
        overlayColor={bg}
        eyebrowStyle={{ color: accent }}
        bodyStyle={{ ...body, color: ink }}
        mutedStyle={{ color: muted }}
        valueColor={ink}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolio}
        eyebrow="Portfólio"
        eyebrowStyle={{ ...body, color: accent }}
        captionStyle={{ ...display }}
        descriptionStyle={{ ...body, color: ink }}
        overlayColor={bg}
      />

      {/* Campanhas ideais */}
      <section className="border-t px-6 py-16 sm:px-10 md:px-16" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-6 block text-sm sm:text-base uppercase tracking-[0.16em]" style={{ color: accent }}>
            Campanhas ideais
          </span>
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
      <section id="contato" className="border-t px-6 py-24 text-center sm:px-10" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-6 block text-sm sm:text-base uppercase tracking-[0.16em]" style={{ color: accent }}>
            Contato
          </span>
          <h2 style={display} className="text-[clamp(2rem,5vw,4rem)]">
            Vamos criar juntos.
          </h2>
          <div className="mt-8 inline-block">
            <CTAButton
              href={isabella.contactHref}
              className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
              style={{ backgroundColor: vinho, color: ink }}
            >
              Falar no WhatsApp
            </CTAButton>
          </div>
        </ScrollFade>
      </section>

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
