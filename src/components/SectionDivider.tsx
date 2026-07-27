import type { CSSProperties } from 'react'

type SectionDividerProps = {
  label: string
  labelStyle: CSSProperties
  bg: string
}

/**
 * Faixa própria entre duas seções full-bleed — cor sólida, sem sobrepor
 * foto nenhuma, com o "título" da seção seguinte centralizado. Existe pra
 * separar as seções sem precisar escurecer em cima das fotos (o que
 * cortava cabeça/início de imagem quando a transição vivia ali).
 */
export function SectionDivider({ label, labelStyle, bg }: SectionDividerProps) {
  return (
    <div
      className="flex h-[13vh] min-h-[90px] w-full items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <span className="text-base uppercase tracking-[0.2em] sm:text-lg" style={labelStyle}>
        {label}
      </span>
    </div>
  )
}
