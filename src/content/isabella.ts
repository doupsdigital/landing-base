import rosto from '../assets/images/isabella-rosto.jpg'
import corpo from '../assets/images/isabella-corpo.jpg'
import fitness from '../assets/images/isabella-fitness.jpg'
import fashion02 from '../assets/images/isabella-fashion-02.jpg'
import color06 from '../assets/images/isabella-color-06.jpg'
import beauty09 from '../assets/images/isabella-beauty-09.jpg'
import dress10 from '../assets/images/isabella-dress-10.jpeg'
import skirt11 from '../assets/images/isabella-skirt-11.jpg'

import videoFitness from '../assets/videos/isabella-fitness.mp4'
import video09 from '../assets/videos/isabella-09.mp4'
import video10 from '../assets/videos/isabella-10.mp4'
import video11 from '../assets/videos/isabella-11.mp4'
import video10Landscape from '../assets/videos/Isabella - 10 - novo - Landscape.mp4'

export const images = {
  rosto,
  corpo,
  fitness,
  fashion02,
  color06,
  beauty09,
  dress10,
  skirt11,
}

export const videos = {
  fitness: videoFitness,
  v09: video09,
  v10: video10,
  v11: video11,
  v10Landscape: video10Landscape,
}

// Vídeo de abertura (hero full-bleed) de cada uma das 5 direções visuais.
// Só existem 4 vídeos reais — v10 é reaproveitado no Noir e no Vinho, as
// duas paletas mais escuras/noturnas, onde o clima do vídeo (rooftop à
// noite) combina com as duas.
export const heroVideos = {
  noir: videos.v10,
  riviera: videos.v11,
  studio: videos.v09,
  cover: videos.fitness,
  vinho: videos.v10,
}

export const isabella = {
  name: 'Isabella Marques',
  location: 'São Paulo, SP',
  role: 'Modelo Comercial',
  bioShort:
    'Modelo comercial de 25 anos, com estética clean, sofisticada e contemporânea — presença que transita com naturalidade entre moda, beleza, fitness e lifestyle premium.',
  bioLong:
    'Com uma presença leve e sofisticada, Isabella desenvolve conteúdos que aproximam marcas do seu público. Atua em campanhas de moda, beleza, fitness e lifestyle, entregando uma comunicação visual moderna, natural e profissional.',
  stats: [
    { label: 'Altura', value: '1,70 m' },
    { label: 'Idade', value: '25 anos' },
    { label: 'Olhos', value: 'Castanho mel' },
    { label: 'Cabelo', value: 'Castanho escuro' },
    { label: 'Biotipo', value: 'Fitness / ampulheta' },
    { label: 'Base', value: 'São Paulo, SP' },
  ],
  categories: [
    'Moda feminina',
    'Beleza & skincare',
    'Fitness & wellness',
    'Joias & acessórios',
    'Hotelaria & gastronomia',
    'Lifestyle & marcas premium',
  ],
  // Isabella é uma persona fictícia (ver Context/Bio) — números ilustrativos.
  socialStats: [
    { value: '250 mil', label: 'Seguidores' },
    { value: '1.631', label: 'Publicações' },
  ],
  locationLabel: 'Base & atuação nacional',
  contactHref: 'mailto:contato@isabellamarques.com',
  contactLabel: 'contato@isabellamarques.com',
  instagramHandle: '@isabella.marques',
  instagramHref: 'https://instagram.com/isabella.marques',
  responseTime: 'Resposta pessoal em até 24h.',
}

export type PortfolioItem =
  | { type: 'image'; src: string; alt: string; caption: string; description?: string }
  | { type: 'video'; src: string; poster?: string; alt: string; caption: string; description?: string }

// Alterna estritamente imagem/vídeo — evita ter dois vídeos adjacentes na
// sequência fixada do portfólio, que era a causa mais provável do glitch
// de compositing (vídeo/imagem trocando de camada) no crossfade durante
// o scroll.
export const portfolio: PortfolioItem[] = [
  {
    type: 'video',
    src: videos.v11,
    alt: 'Isabella em movimento, produção de moda',
    caption: 'Provador.',
    description:
      'Para marcas e lojas que precisam mostrar como a peça se comporta no corpo: caimento, textura e atitude registrados com naturalidade editorial, prontos para transformar vitrine em desejo de compra.',
  },
  {
    type: 'image',
    src: images.fashion02,
    alt: 'Isabella em ensaio de estúdio, look casual chic',
    caption: 'Look do dia.',
    description:
      'Produções diárias que traduzem tendência em estilo pessoal — um olhar próximo e autêntico sobre moda, pensado para aproximar a marca do público sem perder o padrão editorial.',
  },
  {
    type: 'video',
    src: videos.v09,
    alt: 'Isabella em still de beleza editorial',
    caption: 'Publicidade.',
    description:
      'Campanhas que unem estratégia de marca e presença de tela — produções pensadas para comunicar posicionamento, gerar recall e sustentar uma imagem consistente em qualquer canal.',
  },
  {
    type: 'image',
    src: images.color06,
    alt: 'Isabella sorrindo em ativação de marca ao ar livre',
    caption: 'Criação de Conteúdo.',
    description:
      'Do conceito à entrega, uma produção autoral e fluida para redes sociais e ativações de marca, mantendo consistência estética e gerando engajamento real.',
  },
]
