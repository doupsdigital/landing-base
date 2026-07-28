import type { CSSProperties } from 'react'

export type CategoryIconName = 'dress' | 'sparkle' | 'dumbbell' | 'gem' | 'bell' | 'star'

type CategoryIconProps = {
  name: CategoryIconName
  className?: string
  style?: CSSProperties
}

const paths: Record<CategoryIconName, string[]> = {
  dress: [
    'M12 3.5a1.7 1.7 0 1 1 1.7 1.7c-.9 0-1.2.5-1.2 1v.8',
    'M3 20l7.2-5.6a2.2 2.2 0 0 1 2.8 0L20 20',
    'M3 20h18',
  ],
  sparkle: ['M12 3l1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4z'],
  dumbbell: [
    'M2.5 9.5h2.2v6H2.5z',
    'M20.3 9.5h2.2v6h-2.2z',
    'M6 7.5h2v10H6z',
    'M17 7.5h2v10h-2z',
    'M8 12.5h9',
  ],
  gem: ['M6 3.5h12l3.5 5.5L12 21 2.5 9z', 'M2.5 9h19', 'M9 3.5l3 5.5 3-5.5', 'M12 9l-3.2 12M12 9l3.2 12'],
  bell: ['M4.2 16.2a7.8 7.8 0 0 1 15.6 0z', 'M2.5 16.2h19', 'M12 16.2v2', 'M9.3 20h5.4'],
  star: ['M12 2.5l2.7 6.1 6.6.7-5 4.5 1.4 6.5L12 16.9l-5.7 3.4 1.4-6.5-5-4.5 6.6-.7z'],
}

/** Ícones lineares pequenos, sem lib externa — um path por categoria de campanha. */
export function CategoryIcon({ name, className = 'h-4 w-4', style }: CategoryIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
