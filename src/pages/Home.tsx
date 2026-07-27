import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '../content/isabella'
import { vinhoVariations } from '../content/vinhoVariations'

const directions = [
  {
    to: '/noir',
    name: 'Editorial Noir',
    desc: 'Preto + dourado, Fraunces itálico, nome na vertical como lombada de revista.',
    img: images.beauty09,
    bg: '#0C0C0D',
  },
  {
    to: '/riviera',
    name: 'Riviera Gold',
    desc: 'Areia + bronze, Cormorant Garamond, régua pontilhada de alfaiataria.',
    img: images.fashion02,
    bg: '#EFE6D3',
  },
  {
    to: '/studio',
    name: 'Studio Clean',
    desc: 'Branco + verde-sálvia, Space Grotesk, comp card com dados em mono.',
    img: images.rosto,
    bg: '#FFFFFF',
  },
  {
    to: '/cover',
    name: 'Bold Cover',
    desc: 'Verde-oliva escuro + dourado, DM Serif itálico gigante, capa de revista.',
    img: images.color06,
    bg: '#14150F',
  },
  {
    to: '/vinho',
    name: 'Vinho Editorial',
    desc: 'Marrom quase preto + dourado + vinho, Playfair Display, barra fixa no topo.',
    img: images.dress10,
    bg: '#1A1310',
  },
]

export function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-400"
        >
          Isabella Marques — 5 direções visuais
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-12 text-3xl font-medium sm:text-4xl"
        >
          Escolha uma direção para revisar
        </motion.h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {directions.map((d, i) => (
            <motion.div
              key={d.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
            >
              <Link
                to={d.to}
                className="group block overflow-hidden rounded-lg border border-neutral-800 transition-colors hover:border-neutral-600"
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ backgroundColor: d.bg }}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <h2 className="mb-1 text-lg font-medium">{d.name}</h2>
                  <p className="text-sm text-neutral-400">{d.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mb-4 mt-16 text-xs uppercase tracking-[0.2em] text-neutral-400"
        >
          Testes — variações de copy (Vinho Editorial)
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46, ease: 'easeOut' }}
          className="flex flex-wrap gap-3"
        >
          {Object.entries(vinhoVariations).map(([key, v]) => (
            <Link
              key={key}
              to={`/${v.slug}`}
              className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-neutral-100"
            >
              /{v.slug} — {v.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
