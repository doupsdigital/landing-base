import type { CSSProperties } from 'react'

type SectionDividerProps = {
  label: string
  labelStyle: CSSProperties
  bg: string
}

// Núcleo sólido visível + quanto a faixa "alcança" por cima de cada seção
// vizinha, esmaecendo até transparente — o degradê mora aqui, não na foto.
const CORE_VH = 13
const OVERLAP_VH = 5
const TOTAL_VH = CORE_VH + OVERLAP_VH * 2
const FADE_STOP = (OVERLAP_VH / TOTAL_VH) * 100

/**
 * Faixa própria entre duas seções full-bleed, com o "título" da seção
 * seguinte centralizado. As próprias bordas da faixa esmaecem (não é um
 * retângulo de canto seco) e ela sobrepõe de leve a foto vizinha pra cima
 * e pra baixo — a foto em si fica sem nenhum degradê de transição.
 */
export function SectionDivider({ label, labelStyle, bg }: SectionDividerProps) {
  return (
    <div
      className="relative z-10 flex w-full items-center justify-center"
      style={{
        height: `${TOTAL_VH}vh`,
        minHeight: `${90 + OVERLAP_VH * 12}px`,
        marginTop: `-${OVERLAP_VH}vh`,
        marginBottom: `-${OVERLAP_VH}vh`,
        background: `linear-gradient(to bottom, transparent 0%, ${bg} ${FADE_STOP}%, ${bg} ${100 - FADE_STOP}%, transparent 100%)`,
      }}
    >
      <span className="text-base uppercase tracking-[0.2em] sm:text-lg" style={labelStyle}>
        {label}
      </span>
    </div>
  )
}
