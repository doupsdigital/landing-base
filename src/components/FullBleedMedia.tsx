import { useEffect, useState } from 'react'
import type { Ref } from 'react'

const DESKTOP_QUERY = '(min-width: 768px)'

// `<source media="...">` em <video> não tem suporte confiável entre
// browsers (ao contrário de <picture>) — por isso a troca de fonte por
// breakpoint é feita aqui via matchMedia em JS, não via <source>.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

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
  /**
   * Fonte alternativa (foto ou vídeo) exibida só no desktop (md+, ≥768px), a
   * tela cheia via `object-cover`, sem a camada borrada de fundo — pensada
   * para mídia 16:9 que não tem (ou não precisa de) versão mobile própria.
   * No mobile continua usando `src` com o tratamento normal de `orientation`.
   */
  desktopSrc?: string
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
  desktopSrc,
}: FullBleedMediaProps) {
  const isDesktop = useIsDesktop()
  const hasDesktopVariant = !!desktopSrc
  const activeSrc = hasDesktopVariant && isDesktop ? desktopSrc! : src

  const blurClassName =
    orientation === 'landscape'
      ? 'block h-full w-full scale-110 object-cover blur-[60px] brightness-[0.55] saturate-150 md:hidden'
      : 'hidden h-full w-full scale-110 object-cover blur-[60px] brightness-[0.55] saturate-150 md:block'
  // Com desktopSrc o desktop cobre a tela cheia com o clipe 16:9 real — não
  // precisa da borda borrada (só o mobile mantém o tratamento normal).
  const crispClassName = hasDesktopVariant
    ? 'h-full w-full object-cover'
    : orientation === 'landscape'
      ? 'h-full w-full object-contain md:h-full md:w-full md:max-w-none md:object-cover'
      : 'h-full w-full object-cover md:h-full md:w-auto md:max-w-none md:object-contain'

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {!hasDesktopVariant ? (
        type === 'video' ? (
          <video src={src} autoPlay muted loop playsInline aria-hidden className={blurClassName} />
        ) : (
          <img src={src} alt="" aria-hidden className={blurClassName} />
        )
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center">
        {type === 'video' ? (
          <video
            key={activeSrc}
            ref={mediaRef}
            src={activeSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            className={crispClassName}
          />
        ) : (
          <img src={activeSrc} alt={alt} className={crispClassName} />
        )}
      </div>
    </div>
  )
}
