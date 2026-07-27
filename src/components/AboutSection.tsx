import { useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { gsap } from '../lib/gsap'
import { FullBleedMedia } from './FullBleedMedia'
import { ScrollFade } from './ScrollFade'

type StatItem = { label: string; value: string }

type AboutSectionProps = {
  image: string
  bioLong: string
  stats?: StatItem[]
  overlayColor: string
  eyebrowStyle: CSSProperties
  bodyStyle: CSSProperties
  mutedStyle: CSSProperties
  valueColor: string
  imageOpacity?: number
}

/**
 * Retrato full-bleed "atrás" do texto (opacidade reduzida, não um crop
 * lateral cortado) com um leve parallax vertical no scroll — mesmo padrão
 * de imagem-atrás-texto do Hero e do Portfólio, adaptado pra seção "Sobre".
 */
export function AboutSection({
  image,
  bioLong,
  stats,
  overlayColor,
  eyebrowStyle,
  bodyStyle,
  mutedStyle,
  valueColor,
  imageOpacity = 0.8,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const imgWrap = imgWrapRef.current
    if (!section || !imgWrap) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrap,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div ref={imgWrapRef} className="absolute inset-[-6%]" style={{ opacity: imageOpacity }}>
        <FullBleedMedia src={image} type="image" alt="" />
      </div>

      {/* Escurece de baixo pra cima — o rosto fica livre no topo da foto,
          o texto (que agora mora na parte de baixo da tela) ganha contraste. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${overlayColor}F2 0%, ${overlayColor}C2 38%, ${overlayColor}00 75%)`,
        }}
      />

      {/* min-h-screen (não h-full) — cresce além de uma tela se o texto
          precisar de mais espaço, em vez de cortar. */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-end px-6 pb-16 sm:px-10 sm:pb-24">
        <ScrollFade className="mx-auto max-w-3xl text-center">
          <span className="mb-6 block text-sm uppercase tracking-[0.2em] sm:text-base" style={eyebrowStyle}>
            Sobre
          </span>
          <p className="text-xl leading-relaxed sm:text-3xl" style={{ opacity: 0.92, ...bodyStyle }}>
            {bioLong}
          </p>
          {stats && stats.length > 0 ? (
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-base sm:text-lg">
              {stats.map((s) => (
                <span key={s.label} style={mutedStyle}>
                  <span style={{ color: valueColor }}>{s.value}</span> · {s.label}
                </span>
              ))}
            </div>
          ) : null}
        </ScrollFade>
      </div>
    </section>
  )
}
