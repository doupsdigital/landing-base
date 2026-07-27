import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

type CTAButtonProps = {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function CTAButton({ href, children, className = '', style }: CTAButtonProps) {
  return (
    <motion.a
      href={href}
      className={`inline-block ${className}`}
      style={style}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.a>
  )
}
