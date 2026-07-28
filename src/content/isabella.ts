// Ainda sem substituto novo (nenhum arquivo "Isabella NN" recebido pra essas
// categorias) — continuam nos arquivos antigos até serem organizados.
import fitness from '../assets/images/portrait/isabella-fitness.jpg'
import beauty09 from '../assets/images/portrait/isabella-beauty-09.jpg'
import skirt11 from '../assets/images/portrait/isabella-skirt-11.jpg'
import image02Portrait from '../assets/images/portrait/Isabella 02 - PT.png'
import image02Landscape from '../assets/images/landscape/Isabella 02 - LD.png'
import image04Portrait from '../assets/images/portrait/Isabella 04 - PT.png'
import image04Landscape from '../assets/images/landscape/Isabella 04 - LD.png'
import image06Portrait from '../assets/images/portrait/Isabella 06 - PT.png'
import image06Landscape from '../assets/images/landscape/Isabella 06 - LD.png'
import image08Portrait from '../assets/images/portrait/Isabella 08 - PT.png'
import image08Landscape from '../assets/images/landscape/Isabella 08 - LD.png'
import image07Portrait from '../assets/images/portrait/Isabella 07 - PT.png'
import image07Landscape from '../assets/images/landscape/Isabella 07 - LD.png'

// videoFitness: exceção pedida — continua no arquivo antigo até ter um
// vídeo novo.
import videoFitness from '../assets/videos/portrait/isabella-fitness.mp4'
import video01Portrait from '../assets/videos/portrait/Isabella 01 - PT.mp4'
import video01Landscape from '../assets/videos/landscape/Isabella 01 - LD.mp4'
import video02Portrait from '../assets/videos/portrait/Isabella 02 - PT.mp4'
import video02Landscape from '../assets/videos/landscape/Isabella 02 - LD.mp4'
import video03Portrait from '../assets/videos/portrait/Isabella 03 - PT.mp4'
import video03Landscape from '../assets/videos/landscape/Isabella 03 - LD.mp4'

export const images = {
  // Repontadas pros arquivos novos "Isabella NN - PT" (mesmas chaves, usadas
  // em Home/Noir/Riviera/Studio/Cover) — os antigos isabella-rosto.jpg,
  // isabella-corpo.jpg, isabella-fashion-02.jpg, isabella-color-06.jpg e
  // isabella-dress-10.jpeg não são mais referenciados em lugar nenhum.
  rosto: image02Portrait,
  corpo: image07Portrait,
  fitness,
  fashion02: image04Portrait,
  color06: image06Portrait,
  beauty09,
  dress10: image08Portrait,
  skirt11,
  // Par portrait/landscape da seção Sobre (Vinho) — portrait no mobile,
  // landscape no desktop.
  v02Portrait: image02Portrait,
  v02Landscape: image02Landscape,
  // Par portrait/landscape do item "Look do dia" do portfólio — portrait no
  // mobile, landscape no desktop.
  v04Portrait: image04Portrait,
  v04Landscape: image04Landscape,
  // Par portrait/landscape do item "Criação de Conteúdo" do portfólio —
  // portrait no mobile, landscape no desktop.
  v06Portrait: image06Portrait,
  v06Landscape: image06Landscape,
  // Par portrait/landscape da seção "Da ideia à campanha" — portrait no
  // mobile, landscape no desktop.
  v08Portrait: image08Portrait,
  v08Landscape: image08Landscape,
  // Par portrait/landscape da seção Contato — portrait no mobile, landscape
  // no desktop.
  v07Portrait: image07Portrait,
  v07Landscape: image07Landscape,
}

export const videos = {
  fitness: videoFitness,
  // Repontadas pros arquivos novos (mesmas chaves, usadas no heroVideos do
  // Noir/Riviera/Studio/Vinho) — isabella-09.mp4, isabella-10.mp4 e
  // isabella-11.mp4 não são mais referenciados em lugar nenhum.
  v09: video03Portrait,
  v10: video01Portrait,
  v11: video02Portrait,
  // Par portrait/landscape do hero (tela 1) — ver VinhoPage: portrait no
  // mobile, landscape no desktop.
  v01Portrait: video01Portrait,
  v01Landscape: video01Landscape,
  // Par portrait/landscape do item "Provador" do portfólio — portrait no
  // mobile, landscape no desktop.
  v02Portrait: video02Portrait,
  v02Landscape: video02Landscape,
  // Par portrait/landscape do item "Publicidade" do portfólio — portrait no
  // mobile, landscape no desktop.
  v03Portrait: video03Portrait,
  v03Landscape: video03Landscape,
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
  | { type: 'image'; src: string; desktopSrc?: string; alt: string; caption: string; description?: string }
  | { type: 'video'; src: string; desktopSrc?: string; poster?: string; alt: string; caption: string; description?: string }

// Alterna estritamente imagem/vídeo — evita ter dois vídeos adjacentes na
// sequência fixada do portfólio, que era a causa mais provável do glitch
// de compositing (vídeo/imagem trocando de camada) no crossfade durante
// o scroll.
export const portfolio: PortfolioItem[] = [
  {
    type: 'video',
    src: videos.v02Portrait,
    desktopSrc: videos.v02Landscape,
    alt: 'Isabella em movimento, produção de moda',
    caption: 'Provador.',
    description:
      'Para marcas e lojas que precisam mostrar como a peça se comporta no corpo: caimento, textura e atitude registrados com naturalidade editorial, prontos para transformar vitrine em desejo de compra.',
  },
  {
    type: 'image',
    src: images.v04Portrait,
    desktopSrc: images.v04Landscape,
    alt: 'Isabella em ensaio de estúdio, look casual chic',
    caption: 'Look do dia.',
    description:
      'Produções diárias que traduzem tendência em estilo pessoal — um olhar próximo e autêntico sobre moda, pensado para aproximar a marca do público sem perder o padrão editorial.',
  },
  {
    type: 'video',
    src: videos.v03Portrait,
    desktopSrc: videos.v03Landscape,
    alt: 'Isabella em still de beleza editorial',
    caption: 'Publicidade.',
    description:
      'Campanhas que unem estratégia de marca e presença de tela — produções pensadas para comunicar posicionamento, gerar recall e sustentar uma imagem consistente em qualquer canal.',
  },
  {
    type: 'image',
    src: images.v06Portrait,
    desktopSrc: images.v06Landscape,
    alt: 'Isabella sorrindo em ativação de marca ao ar livre',
    caption: 'Criação de Conteúdo.',
    description:
      'Do conceito à entrega, uma produção autoral e fluida para redes sociais e ativações de marca, mantendo consistência estética e gerando engajamento real.',
  },
]
