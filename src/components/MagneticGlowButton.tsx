import { useEffect, useRef } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { gsap } from '../lib/gsap'

type MagneticGlowButtonProps = {
  href: string
  children: ReactNode
  /** Cor do glow pulsante (hex sólido, ex: '#6E1F2A') — a opacidade é aplicada internamente. */
  glowColor: string
  className?: string
  style?: CSSProperties
}

const MAGNET_STRENGTH = 0.3
const MAX_OFFSET = 16

/**
 * CTA principal do fechamento: "magnetic hover" no desktop (o botão se
 * desloca em direção ao cursor dentro de uma zona ao redor, via
 * `gsap.quickTo` — mais leve que animar a cada frame manualmente) e glow
 * pulsante contínuo (`animate-cta-glow`, ver index.css). Em touch não há
 * `mousemove`, então só o glow e o `active:scale` do toque se aplicam.
 */
export function MagneticGlowButton({ href, children, glowColor, className = '', style }: MagneticGlowButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const canHoverRef = useRef(false)
  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const yToRef = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!btnRef.current) return

    xToRef.current = gsap.quickTo(btnRef.current, 'x', { duration: 0.45, ease: 'power3.out' })
    yToRef.current = gsap.quickTo(btnRef.current, 'y', { duration: 0.45, ease: 'power3.out' })

    return () => {
      gsap.set(btnRef.current, { x: 0, y: 0 })
    }
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canHoverRef.current || !wrapRef.current || !xToRef.current || !yToRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)

    xToRef.current(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx * MAGNET_STRENGTH)))
    yToRef.current(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy * MAGNET_STRENGTH)))
  }

  const handleMouseLeave = () => {
    xToRef.current?.(0)
    yToRef.current?.(0)
  }

  return (
    <div
      ref={wrapRef}
      className="relative -m-6 inline-block p-6 sm:-m-8 sm:p-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a
        ref={btnRef}
        href={href}
        className={`animate-cta-glow inline-block transition-transform duration-150 ease-out active:scale-95 ${className}`}
        style={{ ...style, ['--glow-color' as string]: `${glowColor}A6` }}
      >
        {children}
      </a>
    </div>
  )
}
