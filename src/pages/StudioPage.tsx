import { ScrollFade } from '../components/ScrollFade'
import { CTAButton } from '../components/CTAButton'
import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'

const bg = '#FFFFFF'
const ink = '#15140F'
const muted = '#6B6A63'
const accent = '#616D5A'
const surface = '#F1EFE9'
const line = '#DEDACF'

const display = { fontFamily: "'Space Grotesk', sans-serif", color: ink }
const body = { fontFamily: "'Inter', sans-serif" }
const mono = { fontFamily: "'IBM Plex Mono', monospace" }

export function StudioPage() {
  return (
    <div style={{ backgroundColor: bg, color: ink, ...body }} className="min-h-screen">
      <VideoHero
        videoSrc={heroVideos.studio}
        eyebrow="Modelo Comercial — São Paulo"
        title="Isabella Marques"
        titleClassName="text-[clamp(2.25rem,6vw,4rem)] leading-[1.02]"
        lead={isabella.bioShort}
        location={isabella.location.split(',')[0]}
        locationLabel={isabella.locationLabel}
        stats={isabella.socialStats}
        ctaLabel="Falar com a modelo"
        ctaHref={isabella.contactHref}
        colors={{
          overlayTint: ink,
          text: bg,
          mutedText: surface,
          accent,
          ctaBg: bg,
          ctaText: ink,
        }}
        displayFont={display}
        bodyFont={body}
        labelFont={mono}
      />

      {/* Sobre */}
      <section className="border-t px-6 py-16 sm:px-10 md:px-16" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-4 block text-sm sm:text-base uppercase tracking-[0.16em]" style={{ ...mono, color: accent }}>
            Sobre
          </span>
          <p className="max-w-[60ch] text-lg leading-relaxed opacity-90">{isabella.bioLong}</p>
        </ScrollFade>
      </section>

      {/* Comp Card — elemento de assinatura */}
      <section className="border-t px-6 py-16 sm:px-10 md:px-16" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-6 block text-sm sm:text-base uppercase tracking-[0.16em]" style={{ ...mono, color: accent }}>
            Comp Card
          </span>
          <div className="overflow-hidden rounded-none border" style={{ borderColor: line }}>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
              <div className="aspect-[3/4] w-full overflow-hidden md:aspect-auto md:h-full">
                <img
                  src={images.rosto}
                  alt="Isabella Marques, comp card"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-baseline justify-between border-b pb-4" style={{ borderColor: line }}>
                  <h2 style={display} className="text-2xl">
                    {isabella.name}
                  </h2>
                  <span className="text-xs" style={{ ...mono, color: muted }}>
                    SP · BR
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  {isabella.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-[11px] uppercase tracking-[0.1em]" style={{ ...mono, color: muted }}>
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-sm" style={mono}>
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 border-t pt-4" style={{ borderColor: line }}>
                  <dt className="mb-2 text-[11px] uppercase tracking-[0.1em]" style={{ ...mono, color: muted }}>
                    Categorias
                  </dt>
                  <div className="flex flex-wrap gap-2">
                    {isabella.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-sm px-2.5 py-1 text-[11px]"
                        style={{ backgroundColor: surface, color: ink, ...mono }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollFade>
      </section>

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolio}
        eyebrow="Portfólio"
        eyebrowStyle={{ ...mono, color: '#DCE0D6' }}
        captionStyle={{ ...display, color: '#FFFFFF' }}
        descriptionStyle={{ ...body, color: surface }}
        overlayColor={ink}
      />

      {/* Contato final */}
      <section id="contato" className="border-t px-6 py-20 text-center sm:px-10" style={{ borderColor: line }}>
        <ScrollFade>
          <span className="mb-6 block text-sm sm:text-base uppercase tracking-[0.16em]" style={{ ...mono, color: accent }}>
            Contato
          </span>
          <h2 style={display} className="text-[clamp(2rem,5vw,3.25rem)]">
            Vamos criar juntos.
          </h2>
          <div className="mt-8 inline-block">
            <CTAButton
              href={isabella.contactHref}
              className="rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.08em]"
              style={{ backgroundColor: ink, color: bg, ...mono }}
            >
              Falar com a modelo
            </CTAButton>
          </div>
        </ScrollFade>
      </section>

      <footer
        className="border-t px-6 py-8 text-[11px] sm:px-10"
        style={{ borderColor: line, color: muted, ...mono }}
      >
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
