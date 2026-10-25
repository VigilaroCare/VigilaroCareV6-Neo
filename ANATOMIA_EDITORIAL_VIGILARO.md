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
| **2º — hub / índice / lista** | telas que a tab abre | **Rotear** — porta de entrada | `NeoScreenHeader` **fixo, com back** | `MinhaSaude` (lista de perfis), `SaudePet` (grid de pets), `TeoriaFogo`, `PlantasToxicas` |
| **3º — detalhe / folha** | telas que o 2º abre | **Informar / agir** — consumo final | `NeoScreenHeader` **fixo, com back** | ficha individual do pet, `ConceitoDetail`, `MicroArticle` |

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

> **Prova de que o padrão é um só:** a mesma `MinhaSaude` é 2º nível quando lista os perfis da casa, e vira 3º nível (ficha individual) quando recebe um `perfilId`. O nível é *composição*, não arquitetura separada.

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

- ✅ **Conformes (verificados):** `MinhaSaudeScreen`, `SaudePetScreen` — exemplares de referência (header fixo, hero `GlassProfileRing`, seções glass, listas em 1 card, padding por token). `MapaDeRiscosScreen` (2026-08-07) — vide §9.2.
- 🟡 **Migração pendente (auditoria 2026-06-10 — reconferir estado atual antes de migrar):**
  - `TeoriaFogo` — **padrão D**: estrutura própria, header vermelho custom, sem `AppBackground`. Não conforme.
  - Telas com **título em card** (padrão B): `ModoPreventivo`, `Sobre` e similares.
  - **Heroes fora de família:** `PetsMenu` (banner full-bleed), `KitEmergencia` (círculo de ícone), `ConceitoDetail` (cor de hero hardcoded).

A migração das internas para o `NeoScreenHeader` é uma das sessões dedicadas ainda pendentes na dívida de design (casa com a frente de padronização premium — cards horizontais + fotos).

### 9.1 Atualização 2026-08-04 — auditoria de heroes (higiene, não migração)

Levantamento em `screens/` encontrou **~30 telas** usando o padrão banner full-bleed **fora da família documentada em §2** (o mesmo "padrão A" citado na nota de rodapé da §201, nunca migrado). Todas compartilham um bloco quase idêntico, copiado manualmente tela a tela — evidência direta de que múltiplas sessões/ferramentas de IA reproduziram o mesmo código em vez de extrair um componente.

Nesta rodada foi feita **higiene dentro do padrão não-conforme** (não migração para o padrão-alvo): removido gradiente de sombreamento no rodapé da imagem, removido `blurRadius` decorativo, removido subtítulo sobreposto — mantendo só o título. Título continua sobreposto à imagem sem gradiente de legibilidade; contraste passa a depender da foto de cada tela (risco aceito).

Lista completa (candidatas a migração futura para `NeoScreenHeader` + hero §2, quando essa frente for retomada):
`KnowledgeHubScreen`, `KitsHubScreen`, `AcessoriosSegurancaScreen`, `EletrodomesticosScreen`, `UtensiliosReviewsScreen`, `EletrodomesticosReviewsScreen`, `DispositivosEletronicosReviewsScreen`, `PetsMenuScreen`, `UtensiliosDomesticosScreen`, `RiscosFisicosScreen`, `CuidarProtegerHubScreen`, `InfoRotulosScreen`, `NeurodivergenceMenuScreen`, `ScannerScreen` (intro), `FasesVidaMenuScreen`, `LazerFeriasMenuScreen`, `RiscosMenuScreen`, `EducationEnvironmentsScreen`, `DispositivosProtecaoScreen`, `MinhaSaudeScreen`, `SaudePetScreen`, mais os 10 já listados na auditoria original de 2026-06-10 e as 6 telas de `screens/Travel/*`.

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

**Estado da migração:**

| tela | estado |
|---|---|
| `KnowledgeHubScreen` (Central de Aprendizado) | migrada — 3 colunas, cor por seção, título no alto |
| `HomeScreenNeo` (grade de 6 atalhos) | migrada — 2 colunas, tom do Vistorias pelo score |
| `HomeScreenNeo` em uma coluna (`isRowLayout`) | **pendente** — telefone estreito segue no tile |
| `MenuScreenNeo` | **pendente** |
| `TravelModeScreen` | **pendente** (39 peças, via `CeramicSelectTile`) |
| cards Radar e Conceitos do `KnowledgeHubScreen` | **pendente** — ainda `PictogramTile` com `width={110}` |

**Número no card:** só quando o dado é real e já está carregado. A prancha L decidiu que card sem dado não inventa número, e que a assimetria é a informação — o que tem número é o que pede ação. Hoje só Vistorias tem dado na abertura da Home.

**Título no ALTO, não embaixo.** Medido: embaixo ele disputa a faixa horizontal com a arte, e "Segurança em Condomínio" a 11px não cabe ao lado de um pictograma de 70px numa célula de 112px. A prancha L usava título embaixo porque os rótulos da Home têm até 12 caracteres; os da Educação chegam a 24.

---

## 10. Exemplo de referência

`MinhaSaudeScreen` é o melhor espelho do padrão porque exercita **os dois níveis na mesma tela**:

- **Como 2º nível** (sem param): pousa no perfil ativo, lista "Outros perfis da casa" como linhas-com-chevron dentro de 1 NeoCard. Cada linha **roteia** (`navigation.push('MinhaSaude', { perfilId })`).
- **Como 3º nível** (com `perfilId`): vira ficha individual — hero `GlassProfileRing` (foto = guardrail de correção) + seções (Condições, Alergias, Necessidades…) + CTA "Compartilhar Ficha de Emergência". É folha: não navega adiante.

---

*Padrão definido exclusivamente sobre tokens existentes do DS2026 e o mockup de direção aprovado. O padrão A (já presente em telas como FerramentasIA/PetsMenu/KitEmergencia) foi eleito e formalizado por ser o alinhado ao mockup.*
