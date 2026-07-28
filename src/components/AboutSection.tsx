import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { gsap } from '../lib/gsap'
import { FullBleedMedia } from './FullBleedMedia'
import { ScrollFade } from './ScrollFade'

/** Fração da seção visível pra disparar o reveal — mesmo valor usado no Portfólio. */
const ACTIVE_THRESHOLD = 0.6

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
  /** Escurece a imagem de verdade (`filter: brightness`), em vez de misturar com o fundo como `imageOpacity`. Padrão: 1 (sem alteração). */
  imageBrightness?: number
  /** Scroller do ScrollTrigger, se a página não rolar na `window` (ex: container próprio com `scroll-snap`). Padrão: `window`. */
  scroller?: string | Element
  /** Label fixo (`position: sticky`) no topo da seção, mesmo padrão do eyebrow "Portfólio" em PinnedPortfolio. Se omitido, não renderiza nada (compatível com as outras rotas). */
  eyebrow?: string
  eyebrowStyle?: CSSProperties
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
  imageBrightness = 1,
  scroller,
  eyebrow,
  eyebrowStyle,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const [isTextVisible, setIsTextVisible] = useState(false)

  // Só ativo quando `scroller` existe (rota com scroll-snap, ex: Vinho): o
  // ScrollFade escrubado por scroll pula direto pro estado final quando a
  // seção "chega pronta" por um snap, então o reveal aqui usa o mesmo
  // IntersectionObserver + transição CSS de duração fixa do Portfólio.
  useEffect(() => {
    if (!scroller) return
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsTextVisible(entry.intersectionRatio >= ACTIVE_THRESHOLD),
      { threshold: ACTIVE_THRESHOLD },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [scroller])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const imgWrap = imgWrapRef.current
    if (!section || !imgWrap) return

    // Ver comentário equivalente em ScrollFade.tsx: resolvido manualmente porque
    // o seletor de string do GSAP, dentro de um gsap.context escopado a `section`,
    // só acha descendentes — e o scroller aqui é sempre um ancestral.
    const resolvedScroller = typeof scroller === 'string' ? (document.querySelector(scroller) ?? undefined) : scroller

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrap,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1, scroller: resolvedScroller },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [scroller])

  const textContent = (
    <>
      <p className="text-xl leading-relaxed sm:text-2xl" style={{ opacity: 0.92, ...bodyStyle }}>
        {bioLong}
      </p>
      {stats && stats.length > 0 ? (
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-base sm:mt-10 sm:text-lg">
          {stats.map((s) => (
            <span key={s.label} style={mutedStyle}>
              {s.label} ·{' '}
              <span className="font-medium" style={{ color: valueColor }}>
                {s.value}
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </>
  )

  return (
    <section ref={sectionRef} className="relative w-full snap-start snap-always overflow-hidden">
      {eyebrow ? (
        <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
          <span
            className="text-sm uppercase tracking-[0.3em] sm:text-base"
            style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}

      <div
        ref={imgWrapRef}
        className="absolute inset-[-6%]"
        style={{ opacity: imageOpacity, filter: `brightness(${imageBrightness})` }}
      >
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
      <div className="relative flex min-h-dvh w-full flex-col items-center justify-end px-6 pb-10 sm:px-10 sm:pb-24">
        {scroller ? (
          <div
            className="mx-auto max-w-3xl text-center transition-[opacity,transform] duration-1000 ease-out"
            style={{
              opacity: isTextVisible ? 1 : 0,
              transform: `translateY(${isTextVisible ? 0 : 40}px)`,
              transitionDelay: isTextVisible ? '350ms' : '0ms',
            }}
          >
            {textContent}
          </div>
        ) : (
          <ScrollFade className="mx-auto max-w-3xl text-center">{textContent}</ScrollFade>
        )}
      </div>
    </section>
  )
}
