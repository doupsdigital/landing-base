import { ScrollFade } from '../components/ScrollFade'
import { CTAButton } from '../components/CTAButton'
import { VideoHero } from '../components/VideoHero'
import { PinnedPortfolio } from '../components/PinnedPortfolio'
import { isabella, images, portfolio, heroVideos } from '../content/isabella'

const bg = '#EFE6D3'
const ink = '#2B2118'
const muted = '#7A6C57'
const accent = '#97733A'
const surface = '#E2D5B8'
const line = '#D3C3A0'

const display = { fontFamily: "'Cormorant Garamond', serif", color: ink }
const body = { fontFamily: "'Manrope', sans-serif" }

function TapeRule({ marks = ['0', '25', '50', '75', '100'] }: { marks?: string[] }) {
  return (
    <div className="my-8 w-full">
      <div className="h-px w-full border-t-2 border-dotted" style={{ borderColor: accent }} />
      <div className="mt-2 flex justify-between text-[11px] tracking-[0.08em]" style={{ color: muted }}>
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  )
}

export function RivieraPage() {
  return (
    <div style={{ backgroundColor: bg, color: ink, ...body }} className="min-h-screen">
      <VideoHero
        videoSrc={heroVideos.riviera}
        name={isabella.name}
        eyebrow="Modelo Comercial — São Paulo"
        title="Isabella Marques"
        titleClassName="text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02]"
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
          ctaBg: ink,
          ctaText: bg,
        }}
        displayFont={display}
        bodyFont={body}
      />

      {/* Sobre */}
      <section className="px-6 py-16 sm:px-10 md:px-16">
        <ScrollFade>
          <TapeRule />
        </ScrollFade>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ScrollFade>
            <span className="mb-4 block text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
              Sobre
            </span>
            <p className="max-w-[52ch] text-lg leading-relaxed opacity-90">{isabella.bioLong}</p>
          </ScrollFade>
          <ScrollFade y={60}>
            <div
              className="aspect-[4/3] w-full overflow-hidden rounded-md border"
              style={{ borderColor: line, backgroundColor: surface }}
            >
              <img
                src={images.skirt11}
                alt="Isabella Marques, produção de moda"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Ficha / medidas */}
      <section className="px-6 py-16 sm:px-10 md:px-16">
        <ScrollFade>
          <span className="mb-2 block text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
            Ficha
          </span>
          <TapeRule marks={['ALTURA', 'IDADE', 'OLHOS', 'CABELO', 'BIOTIPO']} />
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
            {isabella.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl" style={display}>
                  {s.value}
                </p>
                <p className="text-xs uppercase tracking-[0.1em]" style={{ color: muted }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollFade>
      </section>

      {/* Portfólio — pinado */}
      <PinnedPortfolio
        items={portfolio}
        eyebrow="Portfólio"
        eyebrowStyle={{ ...body, color: '#EFE6D3' }}
        captionStyle={{ ...display, color: '#F8F3E8' }}
        overlayColor={ink}
      />

      {/* Campanhas ideais */}
      <section className="px-6 py-16 sm:px-10 md:px-16">
        <ScrollFade>
          <span className="mb-6 block text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
            Campanhas ideais
          </span>
          <div className="flex flex-wrap gap-3">
            {isabella.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border px-4 py-2 text-sm"
                style={{ borderColor: line, backgroundColor: surface, color: ink }}
              >
                {c}
              </span>
            ))}
          </div>
        </ScrollFade>
      </section>

      {/* Contato final */}
      <section id="contato" className="px-6 py-20 text-center sm:px-10">
        <ScrollFade>
          <TapeRule />
          <span className="mb-6 mt-8 block text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
            Contato
          </span>
          <h2 style={display} className="text-[clamp(2rem,5vw,3.5rem)]">
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

      <footer className="border-t px-6 py-8 text-[11px] sm:px-10" style={{ borderColor: line, color: muted }}>
        {isabella.name} · {isabella.location} · {isabella.contactLabel}
      </footer>
    </div>
  )
}
