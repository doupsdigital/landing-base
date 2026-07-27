# Projeto: Páginas Premium de Portfólio (Base)

Este é o projeto-base usado para gerar páginas premium de apresentação
pessoal para profissionais autônomos (nutricionistas, personal trainers,
modelos comerciais, tatuadores, influencers, etc). Este arquivo define as
convenções que devem ser seguidas em TODA página gerada a partir deste
template.

## O que este projeto NÃO é

Isto NÃO é uma landing page de vendas. Não existe produto, checkout,
oferta ou "comprar agora". A pessoa é o produto — a página existe para
apresentá-la da forma mais impactante possível e gerar em quem visita o
desejo de contratá-la, agendar com ela ou fechar uma parceria.

Pense nela como um "link na bio" premium: substitui o Linktree/WhatsApp
genérico por uma experiência editorial que reforça autoridade e desejo
antes mesmo da pessoa conversar com o cliente/parceiro.

## Stack técnica

- React + Vite + TypeScript
- Tailwind CSS para estilização
- GSAP + ScrollTrigger para toda animação vinculada ao scroll (ver seção
  "Experiência de scroll" — é o motor principal de animação deste
  projeto, não o Framer Motion)
- Framer Motion apenas para transições simples de UI que NÃO dependem
  da posição do scroll (hover de botão, abrir/fechar menu, troca de
  rota)
- Componentes vindos da biblioteca do 21st.dev quando fizerem sentido
  (buscar antes de criar um componente do zero)
- Deploy via Vercel

## Estrutura de pastas

```
src/
  components/     # componentes reutilizáveis (Hero, Gallery, Testimonials, etc)
  sections/       # seções montadas a partir dos componentes
  assets/         # imagens, vídeos, ícones
  context/        # (não versionado) prints, bio, fotos, portfólio do cliente atual
```

## Como usar este template por cliente

1. Duplicar a pasta base para uma pasta nova com o nome do cliente/nicho.
2. Colocar na pasta `context/` tudo que tiver do cliente: prints do
   Instagram, bio, fotos/vídeos de trabalho, depoimentos, paleta de
   cores da marca pessoal, links de contato (WhatsApp, redes sociais).
3. Pedir para o Claude Code montar a página com base no conteúdo de
   `context/`, seguindo as regras deste arquivo.
4. Revisar manualmente espaçamento, contraste, qualidade das imagens e
   timing das animações antes de publicar.
5. Rodar `vercel --prod` para publicar.

## Referências visuais (pasta `context/Referencias/`)

Quando `context/Referencias/` existir, ela contém uma ou mais direções
visuais de referência (arquivos HTML leves, só com cores, tipografia e
estrutura de layout — sem fotos reais e sem o conteúdo final). Cada
arquivo é uma direção de estilo diferente para a mesma pessoa/cliente.

Ao encontrar essa pasta:

- Ler cada arquivo de referência antes de gerar qualquer código —
  extrair paleta de cores exata (hex), tipografia (nome das fontes de
  título/corpo/dados) e o elemento de assinatura descrito em cada um.
- Gerar **uma página completa por referência**, em rotas separadas
  dentro do mesmo projeto (ex: `/noir`, `/riviera`, `/studio`,
  `/cover`, `/vinho` — usar um nome curto baseado no nome do arquivo de
  referência para cada rota).
- Cada rota deve usar o conteúdo real do cliente (fotos e vídeos de
  `context/Imagens/` e `context/Videos/`, texto de `context/Bio/`),
  seguindo fielmente a paleta e a tipografia daquela referência
  específica — nunca misturar cores/fontes de uma referência com o
  layout de outra.
- Manter a mesma estrutura de conteúdo (ver seção "Estrutura de
  conteúdo" abaixo) em todas as rotas, variando apenas a personalidade
  visual — isso facilita comparar as opções lado a lado.
- Se não houver pasta `Referencias/`, seguir só as regras de design
  gerais deste arquivo e criar uma única direção visual, derivada da
  identidade do próprio cliente (fotos, prints, paleta informada).

## Estrutura de conteúdo (ordem das seções)

Diferente de uma landing de vendas, o fluxo aqui é apresentação →
prova de trabalho → desejo → contato. Ordem padrão, salvo indicação
contrária:

1. **Abertura de impacto** — vídeo em loop de fundo (ver "Experiência
   de scroll"), nome/marca pessoal e frase de posicionamento
   sobrepostos na frente do vídeo. Nunca uma foto estática sozinha
   como fundo do hero quando houver vídeo disponível.
2. **Sobre / trajetória** — quem é a pessoa, o que ela representa,
   credenciais ou experiência relevantes, em tom de storytelling, não
   de currículo.
3. **Portfólio / trabalho** — a seção mais importante da página.
   Galeria visual (fotos, vídeos, cases) que é a prova concreta do
   trabalho. Deve ocupar mais espaço que qualquer outra seção.
4. **Prova social** — depoimentos, marcas/clientes já atendidos,
   números relevantes (anos de experiência, projetos, seguidores),
   apresentados de forma sutil, não como "certificados de vendas".
5. **Diferenciais / forma de trabalho** — o que torna essa pessoa
   diferente, como ela atua (não é uma lista de "benefícios do
   produto").
6. **Contato** — call-to-action único e discreto: agendar, chamar no
   WhatsApp, seguir no Instagram. Sem senso de urgência artificial
   ("últimas vagas", "oferta por tempo limitado") — o objetivo é
   parecer seletivo e desejável, não promocional.
7. **FAQ** — só incluir se o nicho tiver dúvidas recorrentes reais
   sobre processo/agendamento (ex: "como funciona a consulta",
   "atende online?"). Nunca objeções de venda ("por que devo
   comprar?").

Regras de CTA:
- Um único CTA principal, repetido no máximo 2 vezes (abertura e
  contato final) — nunca insistente.
- Linguagem de convite/seleção, não de venda: "Vamos conversar",
  "Agende uma consulta", "Fale comigo" — evitar "compre agora",
  "garanta sua vaga", "aproveite".

## Tom de copy por nicho

- **Nutricionista / personal trainer**: tom próximo e confiável,
  focado em resultado real e método de trabalho. Menos aspiracional,
  mais direto e humano.
- **Modelo comercial** (buscando parcerias com marcas/provadores):
  tom editorial, visual em primeiro lugar — o texto é mínimo, quase
  todo o peso está nas imagens/vídeos do portfólio.
- **Tatuador**: tom autoral e artístico, portfólio como galeria de
  arte (grid de trabalhos), estética mais crua/dark, tipografia com
  personalidade.
- **Influencer**: tom aspiracional, mistura de portfólio de conteúdo
  com número/prova de audiência, mas sem parecer "mídia kit"
  corporativo.

Em todos os casos: a página deve parecer curada e exclusiva, nunca
genérica ou "gerada em massa" — mesmo vindo do mesmo template.

## Regras de design

- Paleta de cores: extrair da identidade visual do cliente (prints,
  logo, fotos). Nunca usar paleta genérica "roxo com gradiente" por
  padrão.
- Tipografia: uma fonte serifada ou de destaque para títulos (reforça
  o tom premium/editorial), uma fonte sans-serif limpa para corpo de
  texto.
- Imagens/vídeos em alta qualidade são o ativo mais importante da
  página — nunca comprimir a ponto de perder nitidez, e priorizar
  layout que dê espaço grande para elas (galeria full-bleed, grid
  editorial), evitando thumbnails pequenos.
- Mobile-first: testar sempre a partir de 375px de largura antes de
  ajustar para desktop.
- Espaçamento generoso entre seções (mínimo 80px em desktop, 48px em
  mobile) — o respiro visual reforça a sensação de exclusividade.

## Experiência de scroll (referência: Apple product pages, landonorris.com)

Este NÃO é um site com seções que só aparecem com fade-in ao entrar na
tela (isso parece estático e genérico). O modelo é o de **storytelling
por scroll**: o conteúdo se revela progressivamente, vinculado à
posição exata da rolagem — se a pessoa para de rolar, a animação para;
se rola pra cima, ela volta. Referências diretas: páginas de produto da
Apple (apple.com/iphone, por exemplo) e landonorris.com.

Regras obrigatórias:

- **Hero em vídeo**: a primeira seção sempre tem um vídeo em loop,
  mudo, autoplay, cobrindo toda a tela como fundo (`position: absolute`
  atrás do conteúdo). O texto (nome, posicionamento) fica sobreposto na
  frente do vídeo, nunca abaixo dele — usar overlay escuro sutil
  (gradiente) atrás do texto só o suficiente pra garantir contraste,
  sem esconder o vídeo.
- **Scroll scrubado, não "on enter"**: usar GSAP ScrollTrigger com
  `scrub: true` (ou `scrub: 1` pra um leve delay suave) pra ligar o
  progresso da animação diretamente ao scroll — texto que separa em
  linhas e sobe/racha, imagens que fazem zoom/parallax conforme a
  seção é rolada, número/dado que conta progressivamente. Evitar
  `whileInView` do Framer Motion como mecanismo principal — ele só
  serve pra transições que não precisam ser retomáveis a qualquer
  ponto do scroll.
- **Seções fixadas (pin)**: pelo menos a seção de portfólio/trabalho
  deve fixar a imagem/vídeo na tela (`ScrollTrigger.pin`) enquanto o
  texto ou outras imagens trocam por cima, do jeito que a Apple faz
  pra "prender" a atenção numa feature por vários scrolls antes de
  soltar pra próxima seção.
- **Textos que se constroem com o scroll**: frases longas de
  posicionamento podem aparecer palavra por palavra ou linha por linha
  conforme o scroll avança (opacidade e leve translateY por palavra,
  todos vinculados ao mesmo ScrollTrigger), em vez de aparecer inteiras
  de uma vez.
- **Performance**: vídeos de fundo devem ser comprimidos e leves
  (idealmente MP4 H.264, poucos segundos em loop) — nunca sacrificar o
  scroll suave por causa de vídeo pesado.
- Repetir esse padrão de scroll (vídeo/imagem fixado + texto revelado
  progressivamente) na seção de abertura e na seção de portfólio no
  mínimo; as demais seções (sobre, prova social, contato) podem usar
  reveals mais simples, mas ainda vinculados ao scroll, não a "entrou
  na viewport, disparou uma vez".

## Regras de código

- Componentes em TypeScript, tipados (evitar `any`).
- Um componente por arquivo, nomes em PascalCase.
- Extrair textos/conteúdo do cliente para um único arquivo de dados
  (ex: `content.ts`) em vez de espalhar strings pelo JSX — facilita
  trocar o conteúdo por cliente sem mexer em lógica.
- Sem bibliotecas de CSS além do Tailwind, salvo necessidade
  específica.

## O que NÃO fazer

- Não estruturar a página como landing page de vendas (sem "oferta",
  "benefícios do produto", contadores de urgência, múltiplos CTAs
  insistentes).
- Não usar templates genéricos sem adaptar à identidade visual e ao
  tom do nicho do cliente.
- Não reutilizar a mesma paleta/composição visual entre clientes de
  nichos diferentes — cada página deve parecer feita sob medida.
- Não publicar sem revisão manual de responsividade, qualidade de
  imagem/vídeo e acessibilidade básica (contraste de texto, tamanho de
  fonte mínimo).
