import type { Ref } from 'react'

type FullBleedMediaProps = {
  src: string
  type: 'image' | 'video'
  alt: string
  className?: string
  mediaRef?: Ref<HTMLVideoElement>
}

/**
 * Vídeos/fotos deste projeto são todos 9:16 (retrato). Em telas largas,
 * cobrir a tela inteira com `object-cover` força um zoom extremo e corta a
 * composição. Aqui a mídia nítida fica centralizada sem corte (`object-contain`)
 * e uma cópia borrada/escurecida da mesma mídia preenche as laterais — cobre a
 * tela toda sem destruir o enquadramento original. No mobile o viewport já é
 * ~retrato, então a camada nítida cobre 100% sozinha e a borrada nem renderiza.
 */
export function FullBleedMedia({ src, type, alt, className = '', mediaRef }: FullBleedMediaProps) {
  const blurClassName =
    'hidden h-full w-full scale-110 object-cover blur-[60px] brightness-[0.55] saturate-150 md:block'
  const crispClassName = 'h-full w-full object-cover md:h-full md:w-auto md:max-w-none md:object-contain'

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {type === 'video' ? (
        <video src={src} autoPlay muted loop playsInline aria-hidden className={blurClassName} />
      ) : (
        <img src={src} alt="" aria-hidden className={blurClassName} />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        {type === 'video' ? (
          <video
            ref={mediaRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            className={crispClassName}
          />
        ) : (
          <img src={src} alt={alt} className={crispClassName} />
        )}
      </div>
    </div>
  )
}
