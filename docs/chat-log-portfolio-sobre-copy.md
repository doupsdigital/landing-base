# Registro de sessão — conteúdo do Portfólio, seção Sobre, fontes e variações de copy da Vinho Editorial

Registro de contexto pra retomar este trabalho em outra sessão/chat.
Última atualização: 2026-07-27.

Este arquivo cobre uma sessão de chat longa que tocou várias frentes do
projeto (não só scroll). Pra história específica e mais recente da
**transição de scroll entre seções do Portfólio na rota `/vinho`**, ver
[`portfolio-scroll-transitions.md`](./portfolio-scroll-transitions.md) —
aquele documento foi escrito numa sessão seguinte a esta e continua de
onde esta sessão parou (ver seção "Onde isso se conecta" no fim deste
arquivo).

## Contexto do projeto

Template de páginas premium de portfólio pessoal (ver `CLAUDE.md` na raiz)
pra profissionais autônomos — cliente fictícia atual é "Isabella Marques",
modelo comercial, com 5 direções visuais na mesma base de conteúdo:
Editorial Noir (`/noir`), Riviera Gold (`/riviera`), Studio Clean
(`/studio`), Bold Cover (`/cover`) e Vinho Editorial (`/vinho`). Stack:
React + Vite + TypeScript + Tailwind + GSAP/ScrollTrigger + Framer Motion,
deploy na Vercel a partir do `main` do repo
`https://github.com/doupsdigital/landing-base`.

## O que foi feito, por tema

### 1. Conteúdo do Portfólio — de legendas genéricas pra serviços reais

O portfólio (`src/content/isabella.ts`) tinha 8 itens com legendas
genéricas de still fotográfico ("Movimento.", "Treino.", "Estúdio.",
"Em cena.", "Editorial.", "Still.", "Presença.", "Noite."). Trocado por
4 categorias de serviço reais pedidas pelo usuário, cada uma com um
parágrafo de descrição persuasivo (tom editorial, sem linguagem de
venda, seguindo as regras do `CLAUDE.md`):

- **Provador** — vídeo `isabella-11`
- **Look do dia** — imagem `isabella-fashion-02`
- **Publicidade** — vídeo `isabella-09`
- **Criação de Conteúdo** — imagem `isabella-color-06`

Os outros 4 itens (Movimento, Treino, Recebidos, Noite) foram removidos
a pedido do usuário pra simplificar o portfólio pra só essas 4
categorias. A ordem final foi confirmada explicitamente com o usuário
antes de implementar (havia uma ambiguidade no pedido sobre a posição de
"Criação de Conteúdo" — resolvida perguntando em vez de assumir).

### 2. Seção "Sobre" — de layout quebrado pra imagem full-bleed atrás do texto

A seção "Sobre" original (herdada do template-base, presente em Cover,
Noir, Riviera, Vinho) era um grid de 2 colunas que quebrava no mobile:
texto em cima, imagem cortada num box `aspect-[4/3]` embaixo, sem
seguir o padrão "imagem completa atrás, texto na frente" que o resto do
site usa (Hero, Portfólio).

Criado `src/components/AboutSection.tsx`: retrato full-bleed (usa o
mesmo `FullBleedMedia` do Hero/Portfólio, que evita crop agressivo em
telas largas) com opacidade reduzida atrás do texto, parallax vertical
leve no scroll, texto centralizado. Iterado várias vezes com o usuário:

- Opacidade da foto: começou em 22% (achado escuro demais pelo usuário,
  "quero uma imagem normal com só uns 20% a menos") → ajustada pra 80%.
- Posição do texto: começou centralizado na tela (cobria o rosto) →
  movido pra parte de baixo, com a foto liberando o rosto no topo.
- Studio **não** foi migrada pra esse componente (mantém a seção "Sobre"
  original em texto puro + "Comp Card" à parte) — não fazia parte do
  pedido e já funcionava bem daquele jeito.

### 3. Navegação/scroll do Portfólio — problema original e o que esta sessão resolveu

O mecanismo original (`GSAP ScrollTrigger.pin` com uma timeline gigante
simulando 400% de scroll pra 4 itens, crossfade por opacidade entre
camadas absolutas empilhadas) causava, segundo o usuário testando no
celular físico:

1. Precisar rolar "3 vezes" pra completar a revelação de uma seção.
2. Sobreposição de imagens/textos ao rolar rápido pra frente/trás.
3. Rolagem forte (fling) pulando várias seções de uma vez.

**O que esta sessão tentou e descartou:** CSS Scroll Snap num contêiner
de scroll aninhado só pro bloco do Portfólio (`overflow-y-scroll` +
`snap-y mandatory`), com reveal de texto palavra-por-palavra via GSAP
escopado a esse scroller customizado. **Resultado no celular real:
blocos pretos de renderização durante o scroll, travamento** — revertido
imediatamente.

**O que esta sessão implementou e o usuário aprovou como "muito boa,
fluida, sem interrupções":** remoção completa de `pin`/scroll
customizado. Cada item do Portfólio virou uma `<section>` comum,
empilhada no fluxo normal da página (sem scroller próprio) — mesmo
padrão do Hero e da seção Sobre. O texto passou a usar o componente
`ScrollFade` (já validado, usado pela seção Sobre) em vez de uma
animação palavra-por-palavra feita do zero, que não disparava de forma
confiável nessa nova arquitetura.

**Isso foi o ponto de partida da sessão seguinte**, que continuou
refinando especificamente a transição *entre* as seções (não o
"uma rolagem = uma seção", que já estava resolvido) — ver
[`portfolio-scroll-transitions.md`](./portfolio-scroll-transitions.md).

### 4. Separador entre seções e a saga do degradê

Depois de resolver a navegação, sobrou um problema visual: as seções
(Sobre → Portfólio, e entre os 4 itens do Portfólio) se encontravam com
um corte seco — a foto de uma "batia" direto na foto da próxima, sem
transição, e o rótulo "Portfólio" ficava flutuando em cima da foto
(exigindo escurecer o topo da imagem pra caber, cortando cabeça/rosto).

Criado `src/components/SectionDivider.tsx`: uma faixa própria, de altura
fixa e cor sólida, com o título da seção centralizado (horizontal e
verticalmente) — "Sobre" antes da seção Sobre, "Portfólio" antes de
**cada** item do portfólio, e depois estendido também pra "Campanhas
ideais" e "Contato" nas 5 páginas, mantendo um padrão visual único do
início ao fim.

A partir daí, uma sequência longa de tentativas pra suavizar o encontro
entre o separador e as fotos, todas testadas no celular físico do
usuário e ajustadas com base no resultado real:

| Tentativa | Resultado |
|---|---|
| Degradê grande nas bordas da foto (~30%, depois ~16%) | Cobria cabeça/início da foto |
| Degradê bem raso nas bordas da foto (~10%, ~5%) | Melhor, mas ainda "cortava" um pouco |
| Remover degradê da foto totalmente | Sobrou linha seca entre separador e foto |
| Mover o degradê pra dentro do `SectionDivider` (margem negativa + overlap na foto vizinha) | Ainda lia como mancha em fotos claras |
| Capar a opacidade do degradê do separador em ~35% | Opacidade baixa + distância curta = sutil demais, voltou a parecer linha seca |
| Alongar a distância do degradê (8vh) mantendo opacidade baixa | Ainda lido como "linha" pelo usuário — abordagem abandonada |
| **Voltar pro degradê raso (~5%) na própria foto, depois ajustado pra ~3%** | **Estado em que esta sessão deixou o código** |

**Diagnóstico-chave do próprio usuário, que vale registrar:** um degradê
**escuro** sobreposto a uma foto **clara** sempre vai se destacar como
linha/mancha, não importa o quão curto ou baixa a opacidade — é
contraste de cor, não é problema de tamanho. Isso explica por que as
fotos escuras (Vinho, Noir) sempre pareciam bem e as fotos claras
(jeans claro, fundo bege) sempre denunciavam a transição.

Essa questão **não foi fechada** nesta sessão — o usuário pediu pra
parar de enviar/publicar até chegarmos num resultado bom, e a sessão
seguinte continuou a partir daqui (ver
[`portfolio-scroll-transitions.md`](./portfolio-scroll-transitions.md),
que descreve outras abordagens testadas depois: crossfade com
`position: sticky` + GSAP scrub, e por fim scroll-snap nativo).

### 5. Tamanho de fontes — mobile vs. desktop

A pedido do usuário, as fontes de título/corpo do Portfólio, Sobre e dos
separadores foram aumentadas (estavam pequenas demais no celular).
Usado `clamp()` com `vw` pro título do Portfólio e breakpoints `sm:`
pros demais textos.

**Regressão encontrada depois:** como `sm:` (a partir de 640px) e `vw`
sem teto valem também pra desktop, os textos "estouraram" em telas
largas — título do Portfólio chegando a 88px, sobrepondo a imagem.
Corrigido reduzindo especificamente o teto máximo em telas maiores
(ex.: `clamp(2.75rem, 7vw, 5.5rem)` → `clamp(2.75rem, 5vw, 3.75rem)`,
`sm:text-2xl` → `sm:text-xl`), **sem alterar o valor mínimo/mobile**.
**Lição:** ao pedir aumento de fonte com breakpoints/`vw`, testar as
duas pontas (mobile e desktop) antes de considerar fechado — o usuário
avisou explicitamente que só tinha testado mobile da primeira vez.

### 6. Topbar → botão de voltar (temporário)

A barra fixa no topo de cada página (nome + link "Direções" + botão
"Contato") foi removida nas 5 páginas — o usuário achou que atrapalhava
a experiência enquanto navega pelas rotas de exemplo. Substituída por
um botão de seta (←) pequeno, fixo no canto superior esquerdo, levando
pra `/`. **É explicitamente temporário** — o usuário disse que vai pedir
pra remover esse botão também quando a fase de testes das 5 rotas
acabar.

### 7. Respiro do Hero em telas grandes/altas

O conteúdo do Hero (tarja, título, texto, números, CTA) é ancorado na
base da tela com padding fixo em `rem`. Em celulares com tela grande
(o usuário testou num Poco X6 Pro), esse respiro fixo ficava
proporcionalmente pequeno — botão colado na borda. Trocado por
`padding-bottom: clamp(2.5rem, 8vh, 5rem)`, que escala com a altura
real da viewport — aplicado em `VideoHero.tsx` (compartilhado por Noir,
Riviera, Studio, Vinho) e no hero próprio da `CoverPage.tsx`.

### 8. Deploy na Vercel

Orientado o usuário sobre os dois caminhos (CLI local vs. importar o
repo GitHub no dashboard da Vercel) — optou por GitHub. Confirmado que
o projeto não usa nenhuma variável de ambiente e que `npm run build`
já passava limpo antes do primeiro deploy. Commits e pushes desta
sessão foram feitos a pedido explícito do usuário a cada rodada de
ajuste, pra ele testar no celular físico via o link da Vercel
(fluxo que ele descreveu como o que sempre quer usar: eu ajusto, faço
commit+push, ele testa no aparelho real).

**⚠️ Nota de segurança:** o usuário colou um token de acesso pessoal do
GitHub (`ghp_...`) em texto puro numa mensagem do chat pra viabilizar o
primeiro push. Foi usado só naquele momento (não salvo em
`.git/config`), mas **recomendado revogar/gerar um novo** em
GitHub → Settings → Developer settings → Personal access tokens, caso
ainda não tenha sido feito — ele já fica registrado no histórico da
conversa.

### 9. Variações de copy A/B — `/vinho-v1` a `/vinho-v5`

Criadas 5 rotas novas que reaproveitam 100% da estrutura visual, mídia,
paleta e animações da rota `/vinho` original (que ficou **intocada**),
variando só o texto: headline, subheadline, parágrafo da seção Sobre,
os 4 títulos+descrições do Portfólio e os CTAs (principal e secundário).

- `src/content/vinhoVariations.ts` — as 5 variações de copy, tipadas
  (`VinhoVariation`), na mesma ordem/mídia do portfólio original
  (Provador, Look do dia, Publicidade, Criação de Conteúdo — só título e
  descrição mudam por variação).
- `src/pages/VinhoPage.tsx` — ganhou uma prop opcional `variation`; sem
  ela, renderiza exatamente como antes (rota `/vinho`); com ela,
  sobrescreve os textos.
- `src/components/VideoHero.tsx` — ganhou suporte a **CTA secundário**
  opcional (`ctaSecondaryLabel`/`ctaSecondaryHref`), que não existia
  antes — link discreto ao lado do botão principal, usado tanto no Hero
  quanto no bloco de Contato final de cada variação.
- `src/App.tsx` — rotas `/vinho-v1` .. `/vinho-v5` registradas.
- `src/pages/Home.tsx` — seção nova "Testes — variações de copy" com um
  link por variação, pra navegar clicando sem digitar URL.
- "Campanhas ideais" (as 6 tags) e o rodapé de contato ficaram
  **inalterados** nas 5 variações, como pedido — só o CTA principal e
  secundário do bloco de Contato seguem a variação.

## O que funcionou bem (reaproveitar)

- **Reusar um mecanismo já validado em vez de reinventar.** Quando o
  reveal de texto palavra-por-palavra do Portfólio não funcionava
  direito na nova arquitetura, a solução foi trocar pelo `ScrollFade`
  já comprovado na seção Sobre — resultado idêntico ao que já
  funcionava, zero surpresa.
- **Seções empilhadas no fluxo normal da página, sem scroll customizado
  nem `pin`**, pra qualquer conteúdo full-bleed com texto por cima —
  mais simples e muito mais robusto em mobile real do que qualquer
  scroll-jacking via JS.
- **Separador dedicado entre seções** (`SectionDivider`) em vez de
  tentar resolver a transição só com degradê em cima da foto — resolve
  o problema de cabeça/rosto cortado de raiz, e dá um lugar natural pro
  rótulo da seção.
- **`clamp()` com `vw`** pra tipografia fluida que precisa ser grande no
  mobile sem descontrolar no desktop — só não esquecer de testar as
  duas pontas.
- **Testar no celular físico a cada rodada** (o fluxo do usuário: eu
  ajusto → commit+push → ele testa no aparelho real) pegou vários
  problemas que não apareceriam só olhando no navegador desktop
  (blocos pretos de scroll, corte de cabeça, texto "estourando").
- **Confirmar entendimento e mostrar o plano antes de mudanças grandes
  ou ambíguas**, especialmente em decisões de design sem resposta óbvia
  — evitou pelo menos uma implementação errada (ordem do portfólio) e
  deixou o usuário no controle das decisões visuais.

## O que NÃO funcionou (evitar repetir)

- **`ScrollTrigger.pin` do GSAP com timeline gigante simulando scroll
  virtual** — causava múltiplos toques por seção, sobreposição e quebra
  em fling forte. Não usar pra navegação seção-a-seção.
- **CSS Scroll Snap num contêiner aninhado** (`overflow-y-scroll` só num
  bloco da página, não na página inteira) — quebrou com blocos pretos
  de renderização no mobile real. Se scroll-snap for usado, aplicar no
  nível da página inteira, não isolado num sub-bloco (isso a sessão
  seguinte confirmou).
- **Animação de texto por palavra com `stagger` do GSAP, escopada a um
  trigger próprio por item** — funcionava de forma inconsistente/sutil
  demais na arquitetura de seções empilhadas. Preferir um mecanismo já
  testado (`ScrollFade`) a um novo escrito do zero, quando o efeito
  visual final pode ser parecido.
- **Degradê escuro em cima de foto clara, em qualquer combinação de
  tamanho/opacidade testada** — sempre gera uma linha/mancha visível.
  Esse problema não foi resolvido nesta sessão (ver doc de scroll pra
  continuação).
- **Aumentar fonte com `sm:`/`vw` sem definir um teto pra telas
  largas** — funciona no mobile, "estoura" no desktop se não for
  testado dos dois lados.

## Estado dos arquivos principais ao final desta sessão

- `src/content/isabella.ts` — portfólio com 4 itens (Provador, Look do
  dia, Publicidade, Criação de Conteúdo).
- `src/components/AboutSection.tsx` — retrato full-bleed atrás do texto,
  usado por Cover, Noir, Riviera, Vinho (não por Studio).
- `src/components/PinnedPortfolio.tsx` — seções empilhadas normais,
  texto via `ScrollFade`, degradê raso (~3%) nas bordas de cada foto.
  **Nota:** este arquivo foi alterado de novo numa sessão posterior —
  ver estado real no código e em `portfolio-scroll-transitions.md`.
- `src/components/SectionDivider.tsx` — faixa sólida com rótulo
  centralizado, usada antes de Sobre, cada item do Portfólio, Campanhas
  ideais e Contato, nas 5 páginas.
- `src/components/VideoHero.tsx` — compartilhado por Noir, Riviera,
  Studio, Vinho; ganhou CTA secundário opcional e respiro inferior
  responsivo (`clamp(...vh)`).
- `src/pages/VinhoPage.tsx` — aceita prop `variation` opcional.
- `src/content/vinhoVariations.ts` — as 5 variações de copy.
- `src/App.tsx` — rotas `/vinho-v1` a `/vinho-v5` adicionadas.
- `src/pages/Home.tsx` — links de teste das 5 variações.
- Todas as 5 páginas — topbar fixa trocada por botão de voltar
  temporário.

## Pontos em aberto / itens pra retomar

1. **Transição entre seções do Portfólio ainda não está fechada** — o
   degradê/linha entre fotos claras e o separador continuava incomodando
   o usuário no fim desta sessão. Ver
   [`portfolio-scroll-transitions.md`](./portfolio-scroll-transitions.md)
   pro que foi tentado depois.
2. **Botão de voltar é temporário** — lembrar de remover (ou substituir
   por navegação definitiva) quando a fase de testes das rotas de
   exemplo acabar.
3. **Token do GitHub colado em texto puro** — confirmar se já foi
   revogado/rotacionado.
4. Se as variações de copy da Vinho (`/vinho-v1`..`v5`) forem
   validadas, decidir se esse padrão de A/B testing deve virar algo
   reaproveitável pras outras 4 direções, ou fica só uma ferramenta de
   avaliação pontual da Vinho Editorial.

## Onde isso se conecta

Esta sessão terminou logo depois de criar as variações de copy da
Vinho Editorial. A sessão seguinte (documentada em
[`portfolio-scroll-transitions.md`](./portfolio-scroll-transitions.md))
retomou exatamente do ponto 1 acima — a transição entre seções do
Portfólio — e testou mais algumas abordagens (crossfade com
`position: sticky` + GSAP scrub, depois CSS scroll-snap nativo,
primeiro isolado no bloco do Portfólio e por fim na página inteira da
Vinho). Ler os dois documentos juntos dá o histórico completo até aqui.
