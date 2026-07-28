import { ScrollFade } from '../components/ScrollFade'
import { CTAButton } from '../components/CTAButton'
import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { AboutSection } from '../components/AboutSection'
import { SectionDivider } from '../components/SectionDivider'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'

const ink = '#F2EFEA'
const bg = '#0C0C0D'
const muted = '#8E8E92'
const accent = '#B99A5B'
const line = '#2A2A2C'

const display = { fontFamily: "'Fraunces', serif", fontStyle: 'italic' as const, color: ink }
const body = { fontFamily: "'Inter', sans-serif" }

export function NoirPage() {
  return (
    <div style={{ backgroundColor: bg, color: ink, ...body }} className="min-h-screen">
      <VideoHero
        videoSrc={heroVideos.noir}
        eyebrow="Modelo Comercial — São Paulo"
        title={'Isabella\nMarques'}
        titleClassName="text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.98]"
        lead={isabella.bioShort}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel="Falar com a modelo"
        ctaHref={isabella.contactHref}
        colors={{ overlayTint: bg, text: ink, mutedText: muted, accent, ctaBg: ink, ctaText: bg }}
        displayFont={display}
        bodyFont={body}
      />

      {/* Sobre */}
      <SectionDivider label="Sobre" labelStyle={{ color: accent }} bg={bg} />
      <AboutSection
        image={images.rosto}
        bioLong={isabella.bioLong}
        stats={isabella.stats}
        overlayColor={bg}
        bodyStyle={{ ...body, color: ink }}
        mutedStyle={{ color: muted }}
        valueColor={ink}
      />

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolio}
        eyebrow="Especialidades"
        eyebrowStyle={{ ...body, color: accent }}
        captionStyle={{ ...display }}
        descriptionStyle={{ ...body, color: ink }}
        overlayColor={bg}
      />

      {/* Campanhas ideais */}
      <SectionDivider label="Campanhas ideais" labelStyle={{ color: accent }} bg={bg} />
      <section className="px-6 py-20 sm:px-10 md:px-16">
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
          <div className="mt-8 inline-block">
            <CTAButton
              href={isabella.contactHref}
              className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
              style={{ backgroundColor: ink, color: bg }}
            >
              Falar com a modelo
            </CTAButton>
          </div>
        </ScrollFade>
      </section>

      <footer
        className="border-t px-6 py-8 text-[11px] sm:px-10"
        style={{ borderColor: line, color: muted }}
      >
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
