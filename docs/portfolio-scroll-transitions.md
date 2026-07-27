# Transição de scroll entre seções — rota /vinho

Registro de contexto pra continuar este trabalho em outra sessão/máquina.
Última atualização: 2026-07-27.

## Objetivo original

A rota `/vinho` (uma das 5 variações de estilo do template, todas
representando a mesma cliente fictícia "Isabella Marques") tinha uma
transição ruim entre as sub-seções do Portfólio (Provador, Look do dia,
Publicidade, Criação de Conteúdo): uma barra preta sólida ("PORTFÓLIO")
separando cada seção, com corte seco de imagem. Três abordagens foram
testadas **antes** desta sessão (corte seco, degradê colorido, degradê
preto) e nenhuma agradou.

Durante esta sessão o pedido evoluiu em fases, description abaixo.

## Estado atual (o que está no `main`, já commitado e com push feito)

A página `/vinho` inteira agora é **um único container de scroll com
CSS `scroll-snap`** — Hero, Sobre, os 4 itens do Portfólio, Campanhas
ideais e Contato são todos "páginas" do mesmo scroller, cada uma
`snap-start snap-always`. Uma rolagem sempre avança exatamente uma
seção, do início ao fim da página, sem pontos onde o comportamento do
scroll muda.

Arquivos principais:

- **`src/pages/VinhoPage.tsx`** — o `<div>` raiz da página é o container
  de scroll (`h-screen w-full snap-y snap-mandatory overflow-y-auto`,
  antes era só `min-h-screen`). As seções "Campanhas ideais" e "Contato"
  ganharam `min-h-screen flex flex-col items-center justify-center
  snap-start snap-always` (antes eram blocos curtos só com padding).
- **`src/components/PinnedPortfolio.tsx`** — cada item é uma `<section
  className="h-screen ... snap-start snap-always">` normal, empilhada no
  fluxo da página (sem scroller próprio). Um `IntersectionObserver`
  (`root: null`, ou seja, o viewport) detecta qual seção "encaixou" e
  dispara um fade de opacidade com **duração fixa via CSS** (700ms,
  `transition-opacity duration-700`) — não é escrubado pelo scroll.
  Constantes ajustáveis no topo do arquivo: `ACTIVE_THRESHOLD` (0.6).
  O label "Portfólio" é um `<span>` `position: sticky` que fica visível
  o tempo todo enquanto as 4 seções passam.
- **`src/components/VideoHero.tsx`** e **`src/components/AboutSection.tsx`**
  — são **compartilhados com as outras 4 rotas de demonstração** (Noir,
  Riviera, Studio, Cover). Receberam as classes `snap-start snap-always`
  na `<section>` raiz, mas isso só tem efeito dentro de um ancestral com
  `scroll-snap-type` definido — e isso hoje só existe no wrapper do
  `VinhoPage.tsx`. Já foi conferido que as outras 4 páginas continuam
  com `className="min-h-screen"` (sem snap), então ficaram intocadas.
- **`src/components/SectionDivider.tsx`** — não foi alterado. Continua
  sendo usado nas transições "Sobre", "Campanhas ideais" e "Contato"
  (faixa sólida com o rótulo). Só foi **removido de dentro do
  `PinnedPortfolio`** (não tem mais divider entre os 4 itens do
  portfólio). As faixas de divider que sobraram (antes de Sobre,
  Campanhas, Contato) ficaram **sem** `scroll-snap-align` de propósito —
  elas não viram uma "parada" própria do snap, só passam rápido entre
  duas seções que são paradas (efeito parecido com um "flash" de rótulo
  entre uma seção e outra).

## Linha do tempo — o que foi tentado e por quê

### Antes desta sessão (contexto encontrado em comentários do código)

Já existia uma tentativa de usar `ScrollTrigger.pin` do GSAP com um
scroller próprio pra essa seção de portfólio — foi **removida** porque
causava blocos pretos e travamento no scroll real em celular. Esse
histórico foi o motivo de evitar `pin: true` do GSAP em todas as
tentativas desta sessão.

### Fase 1 — grading de cor + vinheta constante, sem crossfade (proposta, não implementada nesta sessão)

Baseado numa sugestão do Claude (web) que o usuário colou na conversa:
remover a barra preta, mas manter arquitetura de scroll normal,
aplicando um grading de cor unificado entre as fotos e uma vinheta
constante (não só na transição). **O usuário já tinha testado essa
combinação antes desta sessão e não gostou** — pulamos direto pra tentar
crossfade de verdade.

### Fase 2 — crossfade escrubado com `position: sticky` + GSAP scrub (commit `18053cb`)

Implementação: cada item do portfólio ficava "grudado" na tela via
`position: sticky` (CSS nativo, não `ScrollTrigger.pin`, justamente pra
evitar o bug antigo), com o item seguinte sobreposto por cima (z-index
maior) fazendo fade-in de opacidade **escrubado 1:1 com a distância de
scroll** (`GSAP ScrollTrigger`, `scrub: 1`, faixa de 60vh por transição).

**Resultado no celular real (testado via link da Vercel): ficou ruim.**
Problemas relatados pelo usuário, com print em anexo:
- Precisava passar o dedo várias vezes pra completar UMA transição (o
  fade dependia da distância exata rolada).
- Instabilidade: seções ficavam se sobrepondo sem previsibilidade,
  várias camadas (texto + imagem de seções diferentes) visíveis ao
  mesmo tempo, "fantasma" de conteúdo.
- Rolagem forte/rápida (fling) quebrava tudo — reproduzindo o mesmo tipo
  de bug do `pin` antigo, só que na opacidade em vez da posição.

Diagnóstico: `scrub` contínuo + `sticky` empilhado é frágil porque cada
frame de um fling pula muitos pixels de uma vez, e o navegador lida com
overscroll/momentum de formas diferentes por sistema — qualquer
descompasso nesse cálculo aparece como "fotos grudadas".

### Fase 3 — CSS scroll-snap, mas só dentro do bloco do Portfólio (commit `e35b037`)

Troca completa de mecanismo: removido o GSAP/scrub/sticky. O portfólio
passou a ter seu próprio scroller aninhado (`overflow-y-scroll` +
`snap-y snap-mandatory`, `h-screen`), com cada item `snap-start
snap-always` (`scroll-snap-stop: always` força parar em cada seção
mesmo em fling forte). A seção ativa era detectada por
`IntersectionObserver` (root = o scroller aninhado), com um fade de
opacidade de **duração fixa** via CSS, não mais atrelado à velocidade do
gesto.

**Resultado: funcionou bem** — "uma rolagem = uma seção" ficou estável,
sem sobreposição, sem quebrar em rolagem forte. Porém, como esse
comportamento existia só num bloco isolado (scroller aninhado dentro da
página), ao chegar no portfólio a página "quebrava": o resto da página
(Hero, Sobre, Campanhas, Contato) continuava com scroll contínuo normal,
e de repente entrava nesse bloco com física de scroll diferente — o
usuário descreveu como a página "parece que quebra e começa a funcionar
em um bloco só".

### Fase 4 — CSS scroll-snap na página inteira (commit `2524b87`, estado atual)

Em vez de isolar o snap só no portfólio, o container de scroll com
`scroll-snap-type` virou a **página inteira** (`VinhoPage.tsx`). O
scroller aninhado do portfólio foi removido — os 4 itens agora são só
mais seções normais do mesmo scroller da página, junto com Hero, Sobre,
Campanhas e Contato. Detalhes de implementação na seção "Estado atual"
acima.

**Resultado: "até agora esse foi o melhor resultado que já
conseguimos"** (palavras do usuário), mas ele ainda vai testar mais no
celular antes de considerar fechado.

## O que funcionou (usar como referência pra próximos ajustes)

- CSS `scroll-snap` nativo (`scroll-snap-type` + `scroll-snap-align` +
  `scroll-snap-stop: always`) em vez de qualquer scroll-jacking via JS
  (GSAP `pin` ou `scrub`). O navegador cuida de momentum/fling/overscroll
  de forma muito mais robusta que cálculo manual por frame.
- Detectar a seção "ativa" com `IntersectionObserver` em vez de math de
  posição de scroll.
- Disparar animações com **duração fixa via CSS** (`transition-opacity
  duration-700`) quando o estado ativo muda, em vez de escrubar
  continuamente com o scroll.

## O que NÃO funcionou (evitar repetir)

- `ScrollTrigger.pin` com scroller próprio (bug de antes desta sessão:
  blocos pretos, travamento no mobile).
- `position: sticky` empilhado + GSAP `scrub` contínuo tentando fazer
  crossfade 1:1 com a distância de scroll (Fase 2: instável, exigia
  múltiplos swipes, quebrava em fling forte).
- Isolar o snap só num bloco da página em vez da página inteira (Fase 3:
  funcionava bem sozinho, mas criava uma transição de comportamento
  brusca ao entrar/sair do bloco).

## Pontos de atenção pra quem for continuar

- **Isso é uma decisão específica da rota `/vinho`**, não uma mudança no
  padrão documentado em `CLAUDE.md` (que descreve storytelling por
  scroll contínuo escrubado, estilo Apple/landonorris — o padrão padrão
  do template). Se o usuário decidir que gostou definitivamente desse
  modelo de scroll-snap por página inteira, vale considerar se isso vira
  o novo padrão do template (e atualizar `CLAUDE.md`) ou se fica um
  desvio pontual só dessa rota/cliente.
- `VideoHero.tsx` e `AboutSection.tsx` são compartilhados com Noir,
  Riviera, Studio e Cover — as classes de snap adicionadas neles são
  inofensivas pras outras rotas (só fazem efeito com um ancestral tendo
  `scroll-snap-type`), mas vale reconferir se alguém mexer nesses
  componentes futuramente sem saber desse acoplamento.
- Constantes ajustáveis se o fade parecer rápido/lento demais ou a
  ativação da seção parecer cedo/tarde demais:
  `ACTIVE_THRESHOLD` (0.6) e a duração de 700ms, ambos em
  `src/components/PinnedPortfolio.tsx`.
- Campanhas/Contato foram forçados a `min-h-screen` — como o conteúdo
  deles é curto, pode sobrar bastante espaço vazio vertical; vale
  observar em tela real se isso incomoda.
- Comportamento em desktop (scroll de mouse/trackpad com
  `snap-mandatory`) não foi validado a fundo nesta sessão — o foco foi
  mobile, que é como o usuário está testando.
- Um token de acesso do GitHub foi colado em texto puro numa mensagem
  desta conversa pra viabilizar o push. Recomendado revogar/gerar um
  novo em Settings → Developer settings → Personal access tokens, caso
  ainda não tenha sido feito.

## Commits desta sessão (branch `main`, já com push)

1. `18053cb` — Fase 2 (crossfade sticky + GSAP scrub) — **substituído**.
2. `e35b037` — Fase 3 (scroll-snap isolado no portfólio) — **substituído**.
3. `2524b87` — Fase 4 (scroll-snap na página inteira) — **estado atual**.

## Próximos passos

- Continuar testando no celular via link da Vercel (deploy automático a
  partir do `main` do repositório
  `https://github.com/doupsdigital/landing-base`).
- Reportar qualquer instabilidade específica (com prints, se possível)
  pra ajustar `ACTIVE_THRESHOLD`/duração do fade ou revisar alguma
  seção específica.
- Decidir se esse padrão de scroll-snap na página inteira deve ser
  levado pras outras 4 rotas de demonstração ou mantido só na `/vinho`.
