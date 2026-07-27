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

      {/* Contraste embaixo (pro texto) + um fio bem curto (~3%) no topo só
          pra suavizar o encontro com o separador, sem cobrir o rosto. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${overlayColor}D9 0%, ${overlayColor}99 25%, transparent 60%, transparent 97%, ${overlayColor} 100%)`,
        }}
      />

      {/* min-h-screen (não h-full) — cresce além de uma tela se o texto
          precisar de mais espaço, em vez de cortar. */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-end px-6 pb-16 sm:px-10 sm:pb-24">
        <ScrollFade className="mx-auto max-w-3xl text-center">
          <p className="text-xl leading-relaxed sm:text-2xl" style={{ opacity: 0.92, ...bodyStyle }}>
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
