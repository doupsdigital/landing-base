import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { FullBleedMedia } from './FullBleedMedia'
import type { PortfolioItem } from '../content/isabella'

type PinnedPortfolioProps = {
  items: PortfolioItem[]
  eyebrow: string
  eyebrowStyle: CSSProperties
  captionStyle: CSSProperties
  descriptionStyle?: CSSProperties
  overlayColor?: string
  /** Escurece a mídia (foto/vídeo) de cada item (`filter: brightness`), pra dar mais destaque ao texto. Padrão: 1 (sem alteração). */
  mediaBrightness?: number
}

/** Fração da seção visível pra ela virar a "ativa" (só uma pode passar disso por vez, já que cada seção tem exatamente 100vh). */
const ACTIVE_THRESHOLD = 0.6

/**
 * Cada item é uma seção comum (`snap-start snap-always`), empilhada no
 * fluxo normal da página — sem scroller próprio. O container de scroll com
 * `scroll-snap-type` é a página inteira (ver `VinhoPage`), não um bloco
 * isolado só pro portfólio: assim o "uma rolagem = uma seção" fica
 * consistente do Hero ao Contato, sem um ponto onde a página muda de
 * comportamento. A seção que encaixou é detectada por IntersectionObserver
 * (relativo ao viewport, funciona igual não importa quantos containers de
 * scroll aninhados existam) e recebe um fade de opacidade com duração fixa
 * via CSS — não escrubado pelo dedo.
 */
export function PinnedPortfolio({
  items,
  eyebrow,
  eyebrowStyle,
  captionStyle,
  descriptionStyle,
  overlayColor = '#000000',
  mediaBrightness = 1,
}: PinnedPortfolioProps) {
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  // Wrapper das imagens (não dos vídeos, que já têm movimento próprio) —
  // recebe o mesmo ken burns sutil do ProcessSection ao virar o item ativo.
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([])
  // Começa em -1 (nenhum item "ativo" ainda) em vez de 0: se o primeiro item
  // já nascesse ativo, a entrada nele nunca disparia a transição CSS (que só
  // anima em mudança de estado, não na primeira renderização).
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLElement)
          if (index === -1) return
          if (entry.intersectionRatio >= ACTIVE_THRESHOLD) {
            setActiveIndex(index)
          } else {
            // Sem isso, sair do portfólio por uma seção de fora (ex: Sobre,
            // acima) nunca "solta" o último item ativo — voltar pro mesmo
            // item depois não muda o índice, então a transição CSS não
            // dispara de novo (só funcionava indo de um item pro outro
            // dentro do próprio portfólio, onde sempre há uma troca real).
            setActiveIndex((prev) => (prev === index ? -1 : prev))
          }
        })
      },
      { threshold: ACTIVE_THRESHOLD },
    )

    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [items.length])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    imgWrapRefs.current.forEach((el, i) => {
      if (!el) return
      const active = i === activeIndex
      gsap.to(el, {
        scale: active ? 1.08 : 1,
        duration: active ? 6 : 0.6,
        ease: active ? 'sine.out' : 'power2.out',
        overwrite: 'auto',
      })
    })
  }, [activeIndex])

  return (
    <div className="relative w-full">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      {items.map((item, i) => (
        <section
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          className="relative h-dvh w-full snap-start snap-always overflow-hidden transition-opacity duration-700 ease-out"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        >
          {item.type === 'image' ? (
            <div
              ref={(el) => {
                imgWrapRefs.current[i] = el
              }}
              className="absolute inset-[-6%] will-change-transform"
              style={{ filter: `brightness(${mediaBrightness})` }}
            >
              <FullBleedMedia src={item.src} desktopSrc={item.desktopSrc} type={item.type} alt={item.alt} />
            </div>
          ) : (
            <div className="absolute inset-0" style={{ filter: `brightness(${mediaBrightness})` }}>
              <FullBleedMedia src={item.src} desktopSrc={item.desktopSrc} type={item.type} alt={item.alt} />
            </div>
          )}

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${overlayColor}66 0%, transparent 20%, transparent 80%, ${overlayColor}66 100%)`,
            }}
          />

          <div
            className="absolute inset-x-6 top-1/2 max-w-3xl transition-[opacity,transform] duration-1000 ease-out sm:inset-x-10 md:inset-x-16"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transform: `translateY(${i === activeIndex ? '-50%' : '-40%'})`,
              transitionDelay: i === activeIndex ? '350ms' : '0ms',
            }}
          >
            <h3 className="text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.05]" style={captionStyle}>
              {item.caption}
            </h3>
            {item.description ? (
              <p
                className="mt-5 max-w-xl text-lg leading-relaxed sm:mt-6 sm:max-w-2xl sm:text-xl"
                style={{ opacity: 0.88, ...descriptionStyle }}
              >
                {item.description}
              </p>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  )
}
