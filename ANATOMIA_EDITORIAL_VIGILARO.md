# Anatomia Editorial Vigilaro
### Padrão definitivo das telas internas (2º e 3º níveis)

> **Versão:** 1.0 (definitiva) · **Data:** 2026-06-15
> **Status:** fonte canônica única — substitui `PADRAO_ANATOMIA_PAGINAS.md` (2026-06-10, mantido só como histórico)
> **Escopo:** toda tela abaixo da Home/tabs. Telas-pânico (SOS) têm linguagem própria documentada à parte.
> **Base:** mockup de direção aprovado ("editorial tech, hierarquia rigorosa, menos ornamento") + tokens do DesignSystem2026. Nenhuma estética nova foi inventada.

---

## 0. Como ler este documento

Este é o contrato visual das telas internas. Use-o de duas formas:
- **Construindo uma tela nova** → siga §3 (esqueleto) + §7 (componentes) e valide no §8 (checklist).
- **Auditando uma tela existente** → rode o §8 contra ela; o que falhar está na dívida do §9.

A regra de ouro está na §1. Se em dúvida sobre um caso não previsto, decida pelo princípio-mãe, não por exceção.

---

## 1. Princípio-mãe

**A hierarquia nasce da tipografia, não de molduras.** Caixa em volta de título é ornamento sem função — e ornamento sem função sai do app. O acabamento é *editorial*: título forte à esquerda, respiro, menos caixa.

Corolário importante: **o app não tem um padrão por nível.** Tem **um único esqueleto** para toda tela interna. O que distingue 2º de 3º nível não é a arquitetura — é *quais peças do esqueleto* cada um usa e com que ênfase (§4).

---

## 2. A régua de níveis

| Nível | O que é | Função | Header | Exemplos |
|---|---|---|---|---|
| **1º — raiz de tab** | Home, Aprender (`KnowledgeHub`), Menu | Vitrine / dispatcher | título **rola junto**, **sem back** (padrão C, exceção sancionada) | grid de pictogramas cerâmicos |
| **2º — hub / índice / lista** | telas que a tab abre | **Rotear** — porta de entrada | `NeoScreenHeader` **fixo, com back** | `ModoPreventivo` (grade de cartões das atividades), `TeoriaFogo`, `PlantasToxicas` |
| **3º — detalhe / folha** | telas que o 2º abre | **Informar / agir** — consumo final | `NeoScreenHeader` **fixo, com back** | `MinhaSaude` e `SaudePet` (ficha individual, com a fileira "Trocar pessoa ou pet"), `ConceitoDetail`, `MicroArticle` |

> Do 2º nível para baixo, a anatomia da §3 é **obrigatória**. O 1º nível é o único com licença de rolar o título e dispensar o back.

---

## 3. O esqueleto único (2º e 3º níveis)

Seis elementos, sempre nesta ordem. ② e ⑤ são opcionais; ① e ⑥ são obrigatórios.

```
┌─────────────────────────────────────┐
│ (◀)  Título da Página               │ ① HEADER FIXO (fora do scroll)
│      Subtítulo opcional em 1 linha  │
│─────────────────────────────────────│
│ ░░░░░░ scroll começa aqui ░░░░░░░░░ │
│ ╔═════════════════════════════════╗ │ ② HERO (opcional — só quando agrega)
│ ║ [arte/foto]  Lead de contexto   ║ │    NeoCard, formato único
│ ╚═════════════════════════════════╝ │
│                                     │
│ EYEBROW DA SEÇÃO                    │ ③ SEÇÕES (0..n)
│ ╔═════════════════════════════════╗ │    Eyebrow à esquerda +
│ ║ conteúdo em NeoCard glass       ║ │    conteúdo em NeoCard
│ ╚═════════════════════════════════╝ │
│                                     │
│ EYEBROW DA SEÇÃO                    │
│ ╔═════════════════════════════════╗ │
│ ║ • item de lista          ›      ║ │ ④ LISTAS: itens dentro de 1 NeoCard,
│ ║ ──────────────────────────      ║ │    divisor neutral[300],
│ ║ • item de lista          ›      ║ │    chevron Linear
│ ╚═════════════════════════════════╝ │
│                                     │
│ ┌─────────────────────────────────┐ │ ⑤ CTA PRIMÁRIO (opcional):
│ │      Ação Principal             │ │    gradients.brand, fim do scroll
│ └─────────────────────────────────┘ │
│ ░░░ paddingBottom: token único ░░░░ │ ⑥ FOLGA DO FOOTER: 1 token, não chute
└─────────────────────────────────────┘
```

### ① Header fixo — `NeoScreenHeader` (obrigatório)
Fica **fora do ScrollView** (não rola). Composição travada no componente:
- **Back-circle único:** 44×44, `glass.light` + borda `glass.border` (tokens, nunca rgba inline), ícone `ArrowLeft2` **Linear** (contrato "Bold ancora, Linear atua" — back é ação). Omitido só em raiz de tab.
- **Título:** `H1` (34px/800), **à esquerda**. Em títulos longos, `numberOfLines={2}` antes de reduzir fonte.
- **Subtítulo:** opcional, `Body` secundário, 1 linha.
- Respeita `rowDirection` (suporte a canhotos, como na Home).
- **Nunca:** dentro de card · centralizado · em H3.

### ② Hero opcional — formato ÚNICO
Só quando a tela pede contexto visual. **Sempre** o mesmo formato: `NeoCard` (`glass` ou `premium`) com **arte/foto à esquerda + lead à direita** — via `components/NeoSectionHero`, nunca montado à mão.

> **Revisto em 23/10/2026 (decisão do Agnaldo).** O texto antes dizia "~72px". Esse número foi escrito pensando em tela de ficha e ficava modesto demais num hub com foto de capa — enquanto o código tinha derivado para banners de 280px. Ficou o meio, de propósito: a arte é `DS.layout.heroArt` (96 = 8×12, na malha de 8pt).
>
> **A altura do hero não é token e não se declara.** Ela é consequência da arte mais o respiro do card. Havia QUATRO alturas soltas no app (280 em 18 telas, 200 em 5, mais um 240 e um 220), todas nascidas de cópia e nenhuma de decisão — sem número de altura para copiar, não há como divergir de novo. Ver §9.3.
- **Proibido:** banner full-bleed com fundo próprio, círculo de ícone custom, cor de hero em hex solto. A cor vem de `gridAccents`/paleta da seção.
- Para fichas de perfil, a "arte" é `GlassProfileRing` (foto = identidade/guardrail de correção).

### ③ Seções
- **Rótulo:** `Eyebrow` (11px/600/tracking 1.4/uppercase), à esquerda, `marginTop: spacing.lg (24)`, `marginBottom: spacing.sm (8)`.
- **Conteúdo:** `NeoCard variant="glass"`. O destaque pode ser `variant="premium"` — **no máximo 1 por tela**.

### ④ Listas
Itens **dentro de um único `NeoCard`** (não um card solto por item em listas longas), separados por divisor `neutral[300]` 1px, chevron `ArrowRight2` **Linear** 16px `neutral[500]`. Toque via `TappablePressable`.

### ⑤ CTA primário (opcional)
No fim do conteúdo (rola junto), `gradients.brand`, raio `radius.md (20)`, texto `type.button`. **Pinned-bottom apenas** em fluxos de decisão (wizards, confirmação).

### ⑥ Folga do footer (obrigatório)
**Um token único** no `paddingBottom` do scroll — `DS.layout.scrollBottomFooter` (telas com footer flutuante) ou `scrollBottomBare` (modais/wizards). Nunca um valor chutado.

---

## 4. A diferença característica: 2º vs 3º nível

Mesmo esqueleto, **composição diferente** — é isto que dá o "caráter" de cada nível.

### 2º nível (hub / índice) — *predomina o ④*
- Header fixo **com back** + hero **às vezes**.
- Corpo = **listas** (linhas com chevron) ou **grid de cards-foto horizontais**.
- Cada item **leva adiante** → a tela é um roteador.

### 3º nível (detalhe / folha) — *predomina ②③⑤*
- Header fixo **com back** + hero **quase sempre** (foto/arte + lead = identidade do conteúdo).
- Corpo = **seções de conteúdo** (Eyebrow + NeoCard glass).
- **Não navega adiante** — é folha; termina em **CTA** (ex: "Compartilhar Ficha de Emergência").

> **Nota (28/10/2026):** `MinhaSaude` e `SaudePet` já não têm "lista de pouso": abrem direto na ficha (a do perfil ativo; a do primeiro animal) e a troca de pessoa ou de animal é a fileira `MembrosDaCasa`, igual nas duas. Ver §9.7.

---

## 5. Doutrina visual transversal

Atravessa todos os níveis e decide **qual imagem vai em cada slot**:

> ### foto = conteúdo · cerâmica = navegação · ícone = função

- **Foto** representa conteúdo real (um guia, uma planta tóxica, uma pessoa/pet) → heroes e cards de conteúdo do 3º nível.
- **Cerâmica** (pictograma 3D creme+moldura-verde) representa um destino de navegação → grids do 1º/2º nível.
- **Ícone** marca uma função pontual (back, chevron, CTA, rótulo de seção) → nunca decora.

---

## 6. As 7 proibições (o que sai do app)

1. ❌ Título de página dentro de `NeoCard`.
2. ❌ Título de página em H3/16px — título é H1, sempre.
3. ❌ Título de página centralizado (exceção única: telas-pânico SOS).
4. ❌ Back-button com estilo inline/copiado — só via `NeoScreenHeader`.
5. ❌ Cor de hero/seção em hex solto — só tokens (`gridAccents`, `secondary`, `accent`).
6. ❌ `paddingBottom` mágico no scroll — só `DS.layout.scrollBottom*`.
7. ❌ Tela sem `AppBackground` — toda tela interna vive sobre o mist.

---

## 7. Componentes canônicos (a API do padrão)

| Peça | Componente / token | Observação |
|---|---|---|
| Header fixo | `components/NeoScreenHeader` | já existe; `title`, `subtitle`, `onBack`, `rightAction` |
| Cartões | `components/NeoCard` | `variant`: `glass` (padrão), `premium` (1 destaque/tela), `elevated` (grids) |
| Tipografia | `components/NeoTypography` | `H1` (título), `H2/H3` (dentro de card), `Body`, `Small`, `Eyebrow` |
| Rótulo de seção | `Eyebrow` | uppercase, à esquerda |
| Toque em lista | `components/TappablePressable` | substitui TouchableOpacity nas linhas |
| Hero de perfil | `components/GlassProfileRing` | foto + anel; fichas humana e pet |
| Ícones | `components/NeoIcon` | `ArrowLeft2`/`ArrowRight2` Linear; "Bold ancora, Linear atua" |
| Fundo | `components/AppBackground` | mist — obrigatório |
| Folga/paddings | `DS.layout` | `scrollBottomFooter`, `scrollBottomBare`, `screenHPadding`, `headerMinHeight` |
| Cores de seção | `Neo.colors.gridAccents.*.color` | `accent` só tem champagne/copper; rose/amber/emerald vivem em `gridAccents` |

---

## 8. Checklist de conformidade

Use ao criar ou auditar uma tela interna (2º/3º nível):

- [ ] Vive sobre `AppBackground` (mist).
- [ ] Header é `NeoScreenHeader` **fixo, fora do scroll**, com back.
- [ ] Título é `H1`, à esquerda, fora de card.
- [ ] Hero (se houver) é o formato único: arte/foto-esq + lead-dir, sem banner full-bleed.
- [ ] Seções: `Eyebrow` à esquerda + `NeoCard glass`; no máximo 1 `premium`.
- [ ] Listas: linhas dentro de **1** NeoCard, com divisor + chevron `ArrowRight2` Linear, toque `TappablePressable`.
- [ ] Nenhuma cor em hex solto — só tokens (`gridAccents`/`secondary`/`accent`).
- [ ] `paddingBottom` do scroll = `DS.layout.scrollBottom*` (sem número mágico).
- [ ] Imagens seguem a doutrina foto/cerâmica/ícone (§5).
- [ ] CTA (se houver) no fim do scroll; pinned-bottom só em wizard/confirmação.

---

## 9. Estado do rollout (honesto)

Este é o **padrão-alvo**; a aplicação é **parcial**.

- ✅ **Conformes (verificados):** `MinhaSaudeScreen`, `SaudePetScreen`, `ModoPreventivoScreenNeo` (a grade; o modal de auditoria segue no modelo antigo) — na linguagem da Home desde 28/10/2026 (§9.7). `MapaDeRiscosScreen` (2026-08-07) — vide §9.2.
- 🟡 **Migração pendente (auditoria 2026-06-10 — reconferir estado atual antes de migrar):**
  - `TeoriaFogo` — **padrão D**: estrutura própria, header vermelho custom, sem `AppBackground`. Não conforme.
  - Telas com **título em card** (padrão B): `Sobre` e similares. (`ModoPreventivo` saiu desta lista em 28/10/2026 — §9.7.)
  - **Heroes fora de família:** `PetsMenu` (banner full-bleed), `KitEmergencia` (círculo de ícone), `ConceitoDetail` (cor de hero hardcoded).

A migração das internas para o `NeoScreenHeader` é uma das sessões dedicadas ainda pendentes na dívida de design (casa com a frente de padronização premium — cards horizontais + fotos).

### 9.1 Atualização 2026-08-04 — auditoria de heroes (higiene, não migração)

Levantamento em `screens/` encontrou **~30 telas** usando o padrão banner full-bleed **fora da família documentada em §2** (o mesmo "padrão A" citado na nota de rodapé da §201, nunca migrado). Todas compartilham um bloco quase idêntico, copiado manualmente tela a tela — evidência direta de que múltiplas sessões/ferramentas de IA reproduziram o mesmo código em vez de extrair um componente.

Nesta rodada foi feita **higiene dentro do padrão não-conforme** (não migração para o padrão-alvo): removido gradiente de sombreamento no rodapé da imagem, removido `blurRadius` decorativo, removido subtítulo sobreposto — mantendo só o título. Título continua sobreposto à imagem sem gradiente de legibilidade; contraste passa a depender da foto de cada tela (risco aceito).

Lista completa (candidatas a migração futura para `NeoScreenHeader` + hero §2, quando essa frente for retomada):
`KnowledgeHubScreen`, `KitsHubScreen`, `AcessoriosSegurancaScreen`, `EletrodomesticosScreen`, `UtensiliosReviewsScreen`, `EletrodomesticosReviewsScreen`, `DispositivosEletronicosReviewsScreen`, `PetsMenuScreen`, `UtensiliosDomesticosScreen`, `RiscosFisicosScreen`, `CuidarProtegerHubScreen`, `InfoRotulosScreen`, `NeurodivergenceMenuScreen`, `ScannerScreen` (intro), `FasesVidaMenuScreen`, `LazerFeriasMenuScreen`, `RiscosMenuScreen`, `EducationEnvironmentsScreen`, `DispositivosProtecaoScreen`, mais os 10 já listados na auditoria original de 2026-06-10 e as 6 telas de `screens/Travel/*`.

**Bugs reais encontrados de brinde** (cópia-e-cola sem revisão): `KitsHubScreen.js` e `RiscosMenuScreen.js` referenciavam `themeColors` sem nunca importá-lo — `ReferenceError` garantido se a tela fosse aberta. Ambos corrigidos. Isso é o tipo de risco concreto que a duplicação de padrão gera — vale como argumento a favor de, quando essa frente for retomada, migrar para o componente único em vez de continuar copiando o bloco.

### 9.2 Atualização 2026-08-08 — `MapaDeRiscosScreen` + `AmbienteRiscoScreen`

Sucedem `MapaDeCalorScreen`, que **não constava em nenhuma lista** deste documento — nem conforme, nem pendente, nem entre as ~30 da §9.1. Estava fora do radar de auditoria, e carregava o mesmo defeito catalogado na §9.1: `themeColors` referenciado no escopo do módulo, fora do componente que o cria (`ReferenceError` garantido em qualquer cômodo com score < 40% e nenhum item crítico). Terceira ocorrência do mesmo bug, depois de `KitsHubScreen` e `RiscosMenuScreen`. Carregava também um erro de contrato de navegação: mandava `areaId`/`areaNome` para a `ChecklistDetail`, que lê `roomId`/`roomName` — todo toque num cômodo caía no guard e devolvia "Ambiente não encontrado".

**A mudança de fundo não é visual, é de origem do dado.** As duas gerações anteriores derivavam risco de respostas de checklist (o calor era % de vistoria concluída). O mapa atual analisa os **dados declarados** — moradia e moradores — via `RiscoService`, e não lê estado de vistoria em lugar nenhum. Casa recém-cadastrada já produz mapa.

Isso redefiniu a navegação: o toque num ambiente abre `AmbienteRisco` (o detalhe do risco daquele ambiente), **não o checklist**. A vistoria é o CTA do fim do detalhe. Antes, o mapa era um segundo atalho para um destino que a Home já oferece, e o diagnóstico virava índice de questionário.

O que as duas telas exercitam do padrão-alvo:

- Header é `NeoScreenHeader` fixo, fora do scroll (a antiga tinha back-button inline — proibição nº 4).
- `MapaDeRiscos` é **2º nível**: sem hero (② é opcional), corpo em listas dentro de **1** card, com divisor e chevron `ArrowRight2` Linear, toque via `TappablePressable`. A antiga usava grid 2-col de cards soltos. A alternativa de hero seria repetir o círculo-de-ícone que a §2 proíbe — o mesmo desvio catalogado em `KitEmergencia`.
- `AmbienteRisco` é **3º nível**: lead + seções de conteúdo + CTA no fim do scroll. É folha — não navega adiante no mapa.
- Exatamente 1 `premium` por tela (o panorama no mapa; o lead no detalhe).
- Zero hex solto: cores de categoria saem de `themeColors.categoria.*` (5 tons, um por categoria), severidade de `themeColors.textOn.*`. A antiga tinha 8 hex inline marcados como "DS: data-level color".
- `paddingBottom` = `DS.layout.scrollBottomFooter`; horizontal = `DS.layout.screenHPadding`.

Cor nunca é o único portador de sentido (WCAG 1.4.1): cada categoria tem ícone próprio, cada chip exibe a contagem em texto, e severidade e vínculo com morador vêm sempre com rótulo escrito.

---

### 9.3 Atualização 2026-10-23 — o hero ganhou componente

O Agnaldo olhou o app e disse três coisas: os heroes de cada seção têm tamanhos diferentes, são altos demais, e os pictogramas internos saltam aos olhos por desproporção. As três se confirmaram na medição, e têm a mesma causa.

**O que foi medido:** 25 telas declaram `HERO_HEIGHT`, com **quatro valores** — 280 em 18, 200 em 5, mais um 240 e um 220 — e outras 3 definem a altura de outro jeito. Cada cópia trouxe junto, além do banner full-bleed que a §3② sempre proibiu, um **botão de voltar estilizado inline** (proibição nº 4) e um bloco de paralaxe repetido. O `PictogramTile`, que normaliza o tamanho óptico da arte, é usado em **5 lugares** do app inteiro — a home é um deles, e é por isso que ela parece certa e as internas não.

**A causa raiz:** a §3② descrevia o hero como formato, e **nunca houve componente**. O §9.1 já tinha prescrito a saída ("migrar para o componente único em vez de continuar copiando o bloco"); faltava o componente existir.

**Feito:** `components/NeoSectionHero` — `NeoCard` + arte à esquerda (`DS.layout.heroArt`) + lead à direita, sem altura declarada (ver §3②). A arte usa `resizeMode="contain"`, nunca `cover`: `cover` recorta a borda de um objeto desenhado e centrado, e era o que deixava a arte parecendo deslocada. Primeira tela migrada como amostra: `RiscosMenuScreen` — saíram a paralaxe, a altura mágica, o botão de voltar inline, o `#FFF`/`#222` cravados, o `fontSize: 34` no lugar do H1 e o `paddingBottom: 40`; entraram `NeoScreenHeader` e `NeoSectionHero`.

**Pendente:** as outras 24 telas da lista do §9.1, e passar a arte das telas internas pelo `PictogramTile`. A migração espera o Agnaldo julgar a amostra no aparelho — nenhuma ferramenta de IA aqui enxerga tela React Native, então o acabamento visual não se confere lendo código.

---

### 9.4 Atualização 2026-10-25 — a paleta deixa de ser refém da logomarca

**Decisão do Agnaldo, registrada nas palavras dele:** *"A paleta de cores foi definida com base na logomarca Vigilaro Care, que no início do desenvolvimento do app eu insistia em deixá-lo na home, competindo com todo o resto. Para o bem geral, abro mão da rigidez das cores adotadas. No momento oportuno, adequaremos a logo ao app e não como foi no início, no caso, ao contrário."*

**O que isso autoriza:** a paleta pode crescer quando houver ganho demonstrável. Não é licença para cor avulsa — a proibição 5 (§6) continua de pé, e toda cor nova entra como **token** com significado declarado.

**O que isso NÃO autoriza:** escolher cor por gosto. A primeira aplicação da licença, no mesmo dia, foi o gradiente de card indexado pela severidade que o `ScoreService` já devolve (`TOM_POR_BANDA`): terracota = ação necessária, âmbar = atenção, verde = em dia, petróleo = informação sem juízo de risco. A cor vem do dado; um card em `error` com as pendências resolvidas vira `success` sozinho. Sem essa amarra o gradiente seria decoração, e a diretriz do Agnaldo é explícita contra isso ("não busco maquiar, firula e perfumaria").

**A inversão, que é o ponto:** a logo passa a se adequar ao app, não o app à logo. Fica pendente adequar a marca quando a identidade do app estiver estável — ver `docs/PENDENCIAS.md`.

---

### 9.5 Atualização 2026-10-25 — o card retroiluminado (`NeoGlifoCard`)

**ATENÇÃO antes de copiar o tile cerâmico de qualquer tela:** o padrão de grade de pictogramas está **em migração**. Duas telas já saíram do tile; quatro ainda não. Copiar o tile hoje é copiar o padrão antigo.

**O que mudou.** O pictograma deixa de morar num prato creme e passa a morar na **luz do próprio card**. O gradiente é radial, vai do escuro na borda ao claro no canto inferior direito, e a arte é assentada nesse canto. Um campo só — sem placa, sem moldura, sem card dentro de card.

**De onde veio.** Da pergunta do Agnaldo sobre a versão anterior: *"por que o pictograma está dentro de um card bege que está dentro do card?"*. A placa clara atrás da arte era remendo para dar contraste a ela, não decisão de desenho. Ela caiu.

**A cor continua vindo do dado**, pelos mesmos tokens de §9.4 — agora em `DS.gradients.radiais`, que são os `card*Dark` lineares com uma parada de luz na frente. Numa tela com score, o tom sai de `ScoreService.getTom()`. Numa tela de conteúdo, da seção. Nunca do gosto.

**Duas artes, dois enquadramentos, um arquivo.** Os glifos foram reenquadrados de 52% para 73% de ocupação (a margem existia para caber dentro do prato, que não existe mais). `PictogramTile` compensa com `FATOR_TILE` para as telas não migradas ficarem idênticas ao que eram. Quem usa `NeoGlifoCard` recebe o arquivo cheio.

**Estado da migração — CONCLUÍDA em 25/10/2026.** Nenhuma tela usa `PictogramTile`; o componente está marcado como superado no próprio arquivo.

| superfície | formato |
|---|---|
| `KnowledgeHubScreen` (grade) | 3 colunas, cor por seção, título no alto |
| `KnowledgeHubScreen` (Radar e Conceitos) | card largo, com seta |
| `HomeScreenNeo` (2 colunas) | tom do Vistorias pelo score, número das pendências |
| `HomeScreenNeo` (1 coluna, telefone estreito) | card largo, com seta — mesmo componente |
| `MenuScreenNeo` | 2 colunas; grafite nas preferências, petróleo na ajuda |
| `TravelModeScreen` | seletores + etapas + guia largo |
| `GlobalFloatingFooter` (menu inferior) | sem moldura; a aba ativa acende na luz |

**O seletor do Viagem é o caso que o card resolveu melhor que o tile.** Ali a opção não escolhida precisava recuar, e recuar com `opacity` deixava moldura fantasma no Android (ver `PictogramTile.js`). Com o card, o estado se diz pelo **tom**: verde no escolhido, grafite nos preteridos, petróleo enquanto nada foi escolhido. Nenhuma opacidade em lugar nenhum — o problema sumiu junto com a solução que o contornava.

**Número no card:** só quando o dado é real e já está carregado. A prancha L decidiu que card sem dado não inventa número, e que a assimetria é a informação — o que tem número é o que pede ação. Hoje só Vistorias tem dado na abertura da Home.

**Título no ALTO, não embaixo.** Medido: embaixo ele disputa a faixa horizontal com a arte, e "Segurança em Condomínio" a 11px não cabe ao lado de um pictograma de 70px numa célula de 112px. A prancha L usava título embaixo porque os rótulos da Home têm até 12 caracteres; os da Educação chegam a 24.

**O menu inferior, e por que ele não virou um card.** A família de ícones do rodapé (`HomeTile`, `EducationTile`, `TravelTile`, `MenuTile`, `ReportTile`) citava o tile de propósito: cada glifo morava num quadrado de cantos arredondados, de "assinatura constante". Com o tile fora das telas, o rodapé passou a citar o que não existe. A moldura saiu dos cinco, e `K` devolveu a cada glifo a extensão que ela ocupava — os cinco medem ~200 de 256.

Traduzir o card para uma barra de 32px **não podia ser um card**: seria pesado e a navegação competiria com o conteúdo. A tradução é a **luz** — o que o card tem de essencial, um ponto claro de onde o desenho emerge. A aba ativa acende; a inativa não.

Duas amarras que não podem cair numa revisão futura: o glifo ativo **continua preenchido** (o sinal nunca é só cor — WCAG 1.4.1 pede segundo canal, e no alto contraste a luz tem contraste baixo de propósito); e a espessura do traço é **dividida por `K`**, senão o `scale` do SVG a multiplicaria junto e cada ícone sairia com um peso de linha diferente conforme o quanto cresceu.

### 9.6 Atualização 2026-10-28 — a linguagem da Home chega às telas internas (piloto: Scanner e Info Rótulos)

**A decisão do Agnaldo, nas palavras dele:** *"Não gosto do design das nossas páginas internas, que ainda apresentam características que tinham antes da nossa nova estética da home, a qual deve nortear todo o resto. Precisamos trabalhar para que todo o app tenha a mesma linguagem gráfica. O fino acabamento que conseguimos com a nova home."*

**O que a medição mostrou.** Varredura estática das 107 telas registradas (tabela completa, por onda, em `docs/AUDITORIA_VISUAL_2026-10-28.md`): **3** na linguagem nova, **11** na anatomia de junho (cabeçalho fixo, sem banner), **35** com banner de foto, **50** com botão de voltar copiado à mão e **8** sem cabeçalho padrão. **563** cores hex soltas, **20** telas sem `AppBackground`, **51** com `NeoCard variant="elevated"`. O diagnóstico é o mesmo do §9.3: a anatomia de junho descrevia o padrão e a Home foi redesenhada depois, sem que as internas a acompanhassem. Olhando a tela, a diferença é imediata: a Home é fundo limpo, tipografia forte e cartões de cor com pictograma; as internas são foto de estoque no topo (a MESMA foto de ferramentas serve de capa a Vistorias e a Atividades, e de miniatura a vários cômodos), faixa verde-escura vazia, e cartões brancos com ícone em círculo claro.

**O que o piloto estabeleceu.** Scanner e Info Rótulos foram refeitos na linguagem da Home (commit 62439ed). As peças e as regras, para a migração ser troca e não reinvenção:

| Peça | Componente | Regra |
|---|---|---|
| Cabeçalho | `NeoScreenHeader` (fixo, H1 à esquerda, subtítulo de 1 linha) | Sem banner de foto e sem botão de voltar copiado. O título da tela é igual ao do ícone que a abriu. |
| Ação principal e destino | `NeoGlifoCard` — pequeno (2 colunas) ou `largo` com seta | O tom é o **significado**, nunca o gosto. Substitui o cartão branco com círculo de ícone claro e o tile cerâmico. |
| Estado | `components/NeoPill` — suave, sólida ou `sobreCampo` | O nível vai ESCRITO; a cor só reforça (WCAG 1.4.1). Texto e fundo saem de `textOn.*`, aferido em AA. |
| Topo de um resultado | `NeoGlifoCard` estático, com `rodape` para as pílulas | O tom é o do DADO (perigo), não da seção. |
| Aviso | `SafetyDisclaimer` (variantes `sos`, `ia`, `produto`…) | Texto na tinta do tema. Telefone do PAÍS onde a pessoa está, nunca "CIATOX ou SAMU" para todos. |
| Lista de histórico | linhas dentro de **1** `NeoCard`, com pílula e chevron | Conforme o §3④. |
| Estilos | fábrica que recebe o tema (`useThemeDS`) | Nunca `StyleSheet.create` com a paleta do DS no escopo do módulo. |

**Proibições acrescentadas** (somam-se às 7 do §6):

8. ❌ Banner de foto no topo de tela interna. Foto é CONTEÚDO (artigo, guia, planta): só entra onde a foto é o assunto.
9. ❌ Emoji como ícone. Ícone é `NeoIcon`.
10. ❌ Círculo claro atrás de ícone.
11. ❌ Pílula ou selo montado à mão. Só `NeoPill`.
12. ❌ Texto em cor de PREENCHIMENTO (`feedback.*`, laranja, amarelo) ou em hex solto. Texto usa `textOn.*`.
13. ❌ `StyleSheet.create` com cor do DS no escopo do módulo — prende a tela na paleta clara. Medido no piloto: o rótulo "Se INGERIR", a parte mais importante do resultado, saía verde-escuro sobre cartão escuro.

**O que isto altera nas seções anteriores.** §3② (hero): quando a tela precisa de hero, o formato único deixa de ser "`NeoCard` com arte à esquerda" e passa a ser o `NeoGlifoCard` estático, com o tom do dado. §5: "cerâmica = navegação" lê-se, desde 25/10, como "cartão retroiluminado = navegação e estado" (§9.5).

**Defeitos reais achados de brinde** (a mesma família dos do §9.1: o que a cópia de bloco não revisa). A regra do §3 de esconder o rodapé com a câmera aberta nunca valeu, porque a lista de rotas trazia o nome do COMPONENTE (`ScannerScreen`) e a rota se chama `Scanner`. O texto do alerta saía em laranja de 2,8:1 sobre branco. O texto da ação vazava do cartão. Subtítulos saíam em preto por uma cor inválida (`'#FFF' + 'BB'`). O hub inteiro não tinha texto em NENHUM idioma e caía no português reserva.

**Ordem de migração.** Por porta de entrada (o que o usuário abre mais cedo), não por facilidade. Detalhe tela a tela em `docs/AUDITORIA_VISUAL_2026-10-28.md`.

| Onda | Telas | Conteúdo |
|---|---:|---|
| 1 — feita | 4 | Scanner, Info Rótulos, resultado, Modo Viagem |
| 2 | 28 | as portas dos cartões da Home: Vistorias, Atividades, Minha Saúde, Saúde Pet, perfis — **Minha Saúde, Saúde Pet e Atividades Eventuais feitas em 28/10/2026 (§9.7)** |
| 3 | 24 | Educação |
| 4 | 32 | Menu, Viagem, Segurança, ferramentas e o resto |
| fora | 13 | emergência (linguagem própria, §0) |
| fora | 6 | rotas que nenhuma tela abre (PENDENCIAS E3): decidir apagar ANTES de migrar |

**Checklist de migração de uma tela** (some ao §8): troca o bloco banner + voltar + título por `NeoScreenHeader`; destinos viram `NeoGlifoCard` (se há glifo) ou linhas em 1 card; selos viram `NeoPill`; hex vira token (`textOn.*` para texto); emoji vira `NeoIcon`; estilos viram fábrica de tema; texto novo sai nos 4 idiomas e entra no registro de revisão como pendente; **conferir a tela no tema claro, no escuro e num aparelho de 360dp** — nenhuma ferramenta de IA enxerga tela só lendo código, e foi no escuro que o piloto achou o defeito mais grave.

### 9.7 Atualização 2026-10-28 — Minha Saúde, Saúde Pet e Atividades Eventuais (a onda 2 começou)

A pedido do Agnaldo, na conversa em que ele testou o piloto ("Info rótulos melhorou muito. Gostei."): (1) "Trocar pessoa ou pet" e as duas telas de saúde no MESMO formato, com a foto que cada pessoa e cada animal tem do cadastro, em cartões como os da Home; (2) Atividades Eventuais, com os cartões "ainda no modelo antigo".

| Tela | O que virou |
|---|---|
| `MinhaSaude`, `SaudePet` | `NeoScreenHeader` + fileira `MembrosDaCasa` + `NeoGlifoCard` `largo` em modo foto + `SaudeSecao`. Sem lista de pouso; `SaudePet` sem `petId` abre o primeiro animal. |
| `ModoPreventivo` (Atividades Eventuais) | `NeoScreenHeader` + grade de 2 colunas de `NeoGlifoCard`: as 7 categorias em tom `info` e o 8º cartão, "Planejar reforma, visita ou mudança", em `warning` por ser o único que não abre uma verificação. Um pictograma por categoria, do conjunto `assets/illustrations/glifos`. |

**Peças novas ou ampliadas**

- `components/MembrosDaCasa.js` — a fileira "Trocar pessoa ou pet"; exporta `fotoDoPerfil` e `inicialDoNome`. Com um membro só não desenha nada.
- `components/SaudeSecao.js` — `SaudeSecao` (cartão de seção) e `SaudeChips`. Antes cada tela tinha a sua cópia, com a paleta clara no escopo do módulo.
- `NeoGlifoCard`: modo FOTO (`foto`, `inicial`: a foto é conteúdo, entra como quadrado de cantos arredondados com borda clara, nunca como fundo), `linhasTitulo` (título de até N linhas) e `recuo` (afasta a arte do canto, para o pictograma cuja tinta encosta na borda da própria caixa, como o "60+").

**Regras que ficam**

- O título da página é o do cartão que a abriu, pela MESMA chave de texto (`home.myHealth`, `home.petHealth`, `home.eventualActivities`, `navigation.education`), para os dois nunca mais divergirem. Aconteceu em Atividades: o cartão dizia "Atividades" e a página "Atividades Eventuais"; em inglês, "Occasional" no cartão e "Eventual" (falso cognato) na página.
- Pessoa e animal têm o MESMO formato de ficha. O que difere é o conteúdo, não a estrutura.
- Trocar de ficha é `navigation.replace`, não `push`: voltar continua levando à Home.

**Defeitos reais achados de brinde**

- `NeoScreenHeader`: o círculo do "voltar" lia a paleta clara no escopo do módulo; no tema escuro ficava claro com a seta clara (regra 13). Afetava todas as telas que usam o cabeçalho.
- 8 textos dos estados vazios dessas telas não existiam em NENHUM idioma (en, es e pt-PT mostravam o português reserva).
- `GlobalFloatingFooter`: o conserto de "Aprendizado" (commit 09ebb35) não funcionava em 360dp. No Android, `adjustsFontSizeToFit` com `numberOfLines={1}` só trunca, não reduz a fonte. Agora o card da aba mede a si mesmo e o rótulo escolhe o tamanho.
- Medir em aparelho estreito com `wm size` deixa `useWindowDimensions` com valor velho depois do `wm size reset` (apareceu 540dp num aparelho de 411dp). Reiniciar o app antes de concluir que a tela tem defeito.

**O que NÃO foi migrado (dívida, de propósito)**

- O **modal de auditoria** de cada categoria de Atividades Eventuais (educação, perguntas S/N/NA, resultado) segue no modelo antigo: foto de estoque remota no topo, botões com cores fixas, sem tema escuro completo. É um fluxo de três estados dentro de um `Modal`; migrar pede decidir se vira tela própria.
- Os 7 pictogramas de categoria foram escolhidos entre os que já existem. Um conjunto desenhado para cada categoria (festa, visita a idosos, obra, mudança, crianças, altura, química) seria melhor; é decisão de arte.

---

## 10. Exemplo de referência

`MinhaSaudeScreen` (e `SaudePetScreen`, que tem a MESMA estrutura) é o espelho da linguagem da Home numa ficha individual:

- `NeoScreenHeader` com o nome do cartão da Home ("Minha Saúde" / "Saúde Pet").
- Fileira `MembrosDaCasa` ("Trocar pessoa ou pet"): um cartão com a foto de cada pessoa e de cada animal; o aberto fica marcado; tocar em outro troca a ficha com `navigation.replace`.
- Cartão da pessoa ou do animal: `NeoGlifoCard` `largo` em modo FOTO (`foto` e `inicial`), com `NeoPill sobreCampo` no rodapé.
- Seções em `SaudeSecao` e `SaudeChips` (leem o tema) e o CTA "Compartilhar Ficha de Emergência". É folha: não navega adiante.

---

*Padrão definido exclusivamente sobre tokens existentes do DS2026 e o mockup de direção aprovado. O padrão A (já presente em telas como FerramentasIA/PetsMenu/KitEmergencia) foi eleito e formalizado por ser o alinhado ao mockup.*
