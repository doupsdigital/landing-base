export type VinhoPortfolioCopy = {
  title: string
  description: string
}

export type VinhoVariation = {
  slug: string
  label: string
  headline: string
  subheadline: string
  sobre: string
  portfolio: [VinhoPortfolioCopy, VinhoPortfolioCopy, VinhoPortfolioCopy, VinhoPortfolioCopy]
  ctaPrimary: string
  ctaSecondary: string
}

// Ordem do portfólio fixa: Provador, Look do dia, Publicidade, Criação de
// Conteúdo — mesma ordem/mídia de src/content/isabella.ts, só o texto muda.
export const vinhoVariations: Record<string, VinhoVariation> = {
  v1: {
    slug: 'vinho-v1',
    label: 'Resultados & Mídia Kit',
    headline: 'Isabella Marques — Criadora de Conteúdo & Modelo Comercial',
    subheadline: '250 mil seguidores. Engajamento real. Presença que converte.',
    sobre:
      'Isabella entrega o que toda marca busca num publi: alcance qualificado, estética consistente e resultado mensurável. Presença versátil em campanhas de moda, beleza, fitness e lifestyle premium — sempre com o padrão editorial que a audiência reconhece.',
    portfolio: [
      {
        title: 'Provador Virtual',
        description:
          'Caimento, textura e atitude registrados com naturalidade — o tipo de conteúdo que transforma vitrine em carrinho.',
      },
      {
        title: 'Estilo Autoral',
        description:
          'Produções diárias que viram referência de estilo pro público — sua marca entra no feed sem parecer publicidade.',
      },
      {
        title: 'Cases de Campanha',
        description:
          'Produções pensadas pra gerar recall e sustentar posicionamento em qualquer canal — com métricas pra provar.',
      },
      {
        title: 'Produção Sob Medida',
        description:
          'Do briefing à entrega, conteúdo autoral pra redes e ativações, mantendo consistência estética e engajamento real.',
      },
    ],
    ctaPrimary: 'Solicitar Mídia Kit',
    ctaSecondary: 'Ver Números da Conta',
  },
  v2: {
    slug: 'vinho-v2',
    label: 'Editorial & Autoral',
    headline: 'Isabella Marques',
    subheadline: 'Elegância sem exagero. Confiança sem esforço.',
    sobre:
      'Isabella constrói uma imagem consistente e atemporal — a combinação que a torna referência em moda, beleza e lifestyle. Cada produção carrega a mesma assinatura: sempre editorial, nunca caricata.',
    portfolio: [
      {
        title: 'Segunda Pele',
        description:
          'Peças fotografadas como se fossem feitas sob medida — caimento e atitude que fazem o público querer experimentar.',
      },
      {
        title: 'Diário de Estilo',
        description:
          'Um olhar próximo e autêntico sobre moda — pensado pra aproximar a marca do público sem perder o padrão editorial.',
      },
      {
        title: 'Narrativa de Marca',
        description:
          'Campanhas que unem estética e propósito — presença de tela a serviço da história que a marca quer contar.',
      },
      {
        title: 'Direção Criativa',
        description:
          'Do conceito à entrega, uma produção fluida e autoral — sua marca ganha uma narrativa visual coerente.',
      },
    ],
    ctaPrimary: 'Vamos Criar Juntos',
    ctaSecondary: 'Bater um Papo',
  },
  v3: {
    slug: 'vinho-v3',
    label: 'Praticidade & Agilidade',
    headline: 'Isabella Marques — Modelo & Criadora',
    subheadline: 'Disponível pra parcerias. Resposta rápida. Entrega no prazo.',
    sobre:
      '25 anos, base em São Paulo, atuação nacional. Isabella já rodou campanhas de moda, beleza, fitness e lifestyle — e sabe como funciona o combinado: briefing, produção, entrega, sem enrolação.',
    portfolio: [
      {
        title: 'Prova de Roupa',
        description: 'Mostra como a peça cai no corpo real — pronto pra usar no feed ou na loja.',
      },
      {
        title: 'Publis do Dia a Dia',
        description: 'Conteúdo leve e constante que mantém sua marca no radar do público.',
      },
      {
        title: 'Campanha Fechada',
        description: 'Produção objetiva, focada em entregar o que o briefing pede.',
      },
      {
        title: 'Pacote de Conteúdo',
        description: 'Reels, fotos e stories — tudo entregue pronto pra publicar.',
      },
    ],
    ctaPrimary: 'Chamar no WhatsApp',
    ctaSecondary: 'Ver Disponibilidade',
  },
  v4: {
    slug: 'vinho-v4',
    label: 'Confiança & Autoridade',
    headline: 'Isabella Marques',
    subheadline: '250 mil seguidores confiam no que ela mostra.',
    sobre:
      'Modelo comercial e criadora de conteúdo com histórico em campanhas de moda, beleza, fitness e marcas premium. Isabella é escolhida por marcas que buscam consistência de imagem e uma audiência que responde.',
    portfolio: [
      {
        title: 'Vitrine que Converte',
        description:
          'Peças registradas com naturalidade editorial — recomendadas por marcas que já testaram o formato.',
      },
      {
        title: 'Referência de Estilo',
        description:
          'Conteúdo que a audiência já reconhece como autêntico — sua marca entra com credibilidade já construída.',
      },
      {
        title: 'Parcerias de Marca',
        description:
          'Campanhas com histórico comprovado de recall e consistência de imagem entre canais.',
      },
      {
        title: 'Conteúdo com Resultado',
        description:
          'Produção testada e aprovada por marcas anteriores — engajamento real, não só alcance.',
      },
    ],
    ctaPrimary: 'Conversar Sobre a Campanha',
    ctaSecondary: 'Pedir Referências',
  },
  v5: {
    slug: 'vinho-v5',
    label: 'Lifestyle & Conexão',
    headline: 'Oi, eu sou a Isabella',
    subheadline: 'Moda, beleza e lifestyle — do jeito que eu realmente vivo.',
    sobre:
      'Sou modelo comercial e criadora de conteúdo, e o que mais gosto de fazer é mostrar marcas de um jeito que combina com a minha audiência — sem forçar a barra, sem parecer propaganda.',
    portfolio: [
      {
        title: 'Testando Pra Você',
        description: 'Mostro como a peça fica de verdade, do jeito que quem me segue gosta de ver.',
      },
      {
        title: 'Meu Estilo',
        description: 'Looks do dia a dia que viram inspiração real pra quem me acompanha.',
      },
      {
        title: 'Parceria de Marca',
        description: 'Quando entro numa campanha, entro de verdade — com a mesma naturalidade de sempre.',
      },
      {
        title: 'Conteúdo Junto com Você',
        description: 'A gente constrói junto o que faz sentido pro seu produto e pra minha audiência.',
      },
    ],
    ctaPrimary: 'Manda um Oi',
    ctaSecondary: 'Vamos Conversar?',
  },
}
