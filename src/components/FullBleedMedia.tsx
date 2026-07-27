import type { Ref } from 'react'

type FullBleedMediaProps = {
  src: string
  type: 'image' | 'video'
  alt: string
  className?: string
  mediaRef?: Ref<HTMLVideoElement>
  /**
   * A maioria da mídia deste projeto é 9:16 (retrato) — ver comentário abaixo.
   * `landscape` inverte o tratamento pra mídia 16:9: cobre a tela cheia no
   * desktop (onde o enquadramento já é largo) e usa a borda borrada só no
   * mobile (onde um vídeo largo cortado com `object-cover` perderia a cena).
   */
  orientation?: 'portrait' | 'landscape'
}

/**
 * Vídeos/fotos deste projeto são todos 9:16 (retrato). Em telas largas,
 * cobrir a tela inteira com `object-cover` força um zoom extremo e corta a
 * composição. Aqui a mídia nítida fica centralizada sem corte (`object-contain`)
 * e uma cópia borrada/escurecida da mesma mídia preenche as laterais — cobre a
 * tela toda sem destruir o enquadramento original. No mobile o viewport já é
 * ~retrato, então a camada nítida cobre 100% sozinha e a borrada nem renderiza.
 */
export function FullBleedMedia({
  src,
  type,
  alt,
  className = '',
  mediaRef,
  orientation = 'portrait',
}: FullBleedMediaProps) {
  const blurClassName =
    orientation === 'landscape'
      ? 'block h-full w-full scale-110 object-cover blur-[60px] brightness-[0.55] saturate-150 md:hidden'
      : 'hidden h-full w-full scale-110 object-cover blur-[60px] brightness-[0.55] saturate-150 md:block'
  const crispClassName =
    orientation === 'landscape'
      ? 'h-full w-full object-contain md:h-full md:w-full md:max-w-none md:object-cover'
      : 'h-full w-full object-cover md:h-full md:w-auto md:max-w-none md:object-contain'

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
