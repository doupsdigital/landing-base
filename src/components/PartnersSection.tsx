import type { CSSProperties } from 'react'
import { BrandsMarquee } from './BrandsMarquee'

type PartnersSectionProps = {
  image: string
  imageAlt: string
  eyebrow: string
  eyebrowStyle: CSSProperties
}

/** Seção dedicada de prova social: título fixo + carrossel de logos em loop. */
export function PartnersSection({ image, imageAlt, eyebrow, eyebrowStyle }: PartnersSectionProps) {
  return (
    <section className="relative w-full snap-start snap-always">
      <div className="pointer-events-none sticky top-6 z-50 flex justify-center sm:top-8">
        <span
          className="text-sm uppercase tracking-[0.3em] sm:text-base"
          style={{ ...eyebrowStyle, textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}
        >
          {eyebrow}
        </span>
      </div>

      <div className="-mt-6 flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 sm:-mt-8 sm:px-10 md:px-16">
        <div className="w-full max-w-4xl">
          <BrandsMarquee image={image} imageAlt={imageAlt} />
        </div>
      </div>
    </section>
  )
}
