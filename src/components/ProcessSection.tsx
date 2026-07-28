import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { FullBleedMedia } from './FullBleedMedia'

export type ProcessStep = {
  number: string
  title: string
  description: string
}

type ProcessSectionColors = {
  ink: string
  muted: string
  accent: string
  line: string
  bg: string
}

type ProcessSectionProps = {
  image: string
  /** Foto alternativa exibida só no desktop (md+) — ver FullBleedMedia `desktopSrc`. No mobile continua `image`. */
  desktopImage?: string
  steps: ProcessStep[]
  eyebrow: string
  eyebrowStyle: CSSProperties
  bodyStyle: CSSProperties
  displayFont: CSSProperties
  colors: ProcessSectionColors
}

/** Atraso entre a revelação de um passo e o próximo, em ms. */
const STEP_DELAY_MS = 600
/** Duração da transição de cada passo (fade + subida), em ms — lenta e fluida. */
const STEP_DURATION_MS = 900
/** Duração da linha conectora (segmento ou traço horizontal), em ms. */
const LINE_DURATION_MS = 700

/**
 * Linha do tempo dos passos do processo — empilhada verticalmente no
 * mobile (número + linha conectora à esquerda, texto à direita) e em
 * linha horizontal no desktop (números conectados por um traço no topo,
 * texto centralizado abaixo). Fundo full-bleed escurecido com o mesmo
 * ken burns retomável do Contato.
 *
 * A revelação usa IntersectionObserver + transição CSS de duração fixa
 * (não GSAP ScrollTrigger) — mesmo padrão do AboutSection/PinnedPortfolio:
 * um ScrollTrigger "play once" pode pular direto pro estado final quando
 * a seção chega pronta por um snap do scroll, o que já causou o mesmo
 * bug aqui (passo 1 aparecia devagar, 2-4 quase instantâneos).
 */
export function ProcessSection({
  image,
  desktopImage,
  steps,
  eyebrow,
  eyebrowStyle,
  bodyStyle,
  displayFont,
  colors,
}: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const imgWrap = imgWrapRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)

        if (imgWrap && !reduceMotion) {
          gsap.to(imgWrap, {
            scale: entry.isIntersecting ? 1.08 : 1,
            duration: entry.isIntersecting ? 6 : 0.6,
            ease: entry.isIntersecting ? 'sine.out' : 'power2.out',
            overwrite: 'auto',
          })
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const totalLineDuration = (steps.length - 1) * STEP_DELAY_MS + LINE_DURATION_MS

  return (
    <section ref={sectionRef} className="relative w-full snap-start snap-always overflow-hidden">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div ref={imgWrapRef} className="absolute inset-[-6%] will-change-transform" style={{ filter: 'brightness(0.32)' }}>
        <FullBleedMedia src={image} desktopSrc={desktopImage} type="image" alt="" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${colors.bg}F2 0%, ${colors.bg}D9 35%, ${colors.bg}80 70%, ${colors.bg}40 100%)`,
        }}
      />

      <div className="relative -mt-6 flex min-h-dvh w-full flex-col justify-center px-6 py-16 sm:-mt-8 sm:px-10 sm:py-20 md:px-16">
        <div className="relative mx-auto w-full max-w-md md:max-w-5xl">
          {/* Traço horizontal conectando os números — só no desktop, na
              mesma altura fixa do topo de cada coluna (as colunas não
              esticam o círculo, então essa posição não muda com o
              tamanho do texto de cada passo). Se desenha da esquerda pra
              direita junto com a revelação dos números. */}
          <div
            className="absolute inset-x-0 top-5 hidden h-px origin-left md:block"
            style={{
              backgroundColor: colors.line,
              transform: `scaleX(${isVisible ? 1 : 0})`,
              transition: `transform ${totalLineDuration}ms ease-in-out`,
            }}
          />

          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex gap-5 transition-[opacity,transform] ease-out md:flex-1 md:flex-col md:items-center md:gap-4 md:text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 24}px)`,
                  transitionDuration: `${STEP_DURATION_MS}ms`,
                  transitionDelay: isVisible ? `${i * STEP_DELAY_MS}ms` : '0ms',
                }}
              >
                {/* Coluna do número: no mobile estica pra altura da linha
                    (`items-center` + filho `flex-1`) preencher o traço
                    vertical até o próximo passo, sem esticar o círculo. */}
                <div className="flex flex-col items-center md:contents">
                  <span
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg"
                    style={{ ...displayFont, borderColor: colors.accent, color: colors.accent, backgroundColor: colors.bg }}
                  >
                    {step.number}
                  </span>
                  {i < steps.length - 1 ? (
                    <span
                      className="mt-2 w-px flex-1 origin-top md:hidden"
                      style={{
                        backgroundColor: colors.line,
                        transform: `scaleY(${isVisible ? 1 : 0})`,
                        transition: `transform ${LINE_DURATION_MS}ms ease-in-out`,
                        transitionDelay: isVisible ? `${i * STEP_DELAY_MS + STEP_DELAY_MS * 0.5}ms` : '0ms',
                      }}
                    />
                  ) : null}
                </div>

                <div className="pb-2 md:pb-0">
                  <h3 className="text-lg font-semibold sm:text-xl" style={{ ...bodyStyle, color: colors.ink }}>
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-base leading-relaxed sm:text-lg"
                    style={{ ...bodyStyle, color: colors.muted }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
