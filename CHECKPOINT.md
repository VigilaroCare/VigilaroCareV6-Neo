# 🚦 CHECKPOINT — Vigilaro Care V6 Neo

**Última atualização:** 2026-05-20
**Branch:** `claude/unruffled-jennings-51c18f` (worktree isolada)
**Commits totais no branch:** 93

---

## ✅ BUG RESOLVIDO (2026-05-18)

**"Edição de perfil só mostra Trash, Edit2 invisível"** — causa raíz identificada e corrigida.

O Edit2 estava sendo renderizado com `color={Neo.colors.neutral[600]}`, mas **`neutral[600]` não existia na paleta DS** (a escala pulava direto de 700 pra 500). O ícone recebia `color={undefined}` e renderizava transparente. O Trash funcionava porque usava `feedback.error` (existia).

**Auditoria do DS revelou outros tokens fantasma** sendo referenciados em 30+ arquivos: `primary[200]`, `primary[800]`, `primary[900]`, `neutral[50]`, `neutral[600]`. Todos resolviam para `undefined`.

**Fix sistêmico:** adicionados os tokens faltantes em `LightColors` e `DarkColors` (com valores invertidos para dark — escala emerald Tailwind + neutros iOS). Isso conserta de uma vez:
- `neutral[600]` → 79 ocorrências em 30 arquivos
- `primary[800]` → 11 ocorrências em 5 arquivos
- `neutral[50]` → 11 ocorrências em 8 arquivos
- `primary[200]`, `primary[900]` → casos esparsos

O bug do Edit2 some automaticamente — o ícone agora tem cor `#787880` (cinza médio iOS) e é visível.

---

## ❓ QUESTÕES UX LEVANTADAS PELO USER — investigar com ele na próxima sessão

Durante audit do dark mode (2026-05-19), user levantou questões de UX/produto que precisam de decisão dele antes de implementar:

### 1. Função real de "Relatório Pessoal" vs Checklists
**User questionou:** "qual a função real de relatório pessoal nesta seção? Não está redundante com os checklists logo abaixo? Em vistorias dos ambientes?"

**Onde aparece:** "O Quê e Como" → modal "Pendências (100%)" com card "Relatório Pessoal" + lista de ambientes com botões "Verificar Agora" (que abrem os mesmos checklists logo abaixo na tela).

**Decisão necessária:** manter ambos (com clarificação visual da diferença), remover Relatório Pessoal (se redundante), ou redesenhar como sumário/dashboard que NÃO sobreposiciona com a lista de checklists.

### 2. Imagens genéricas em "Cuidados por Faixa Etária" (FasesVidaMenu)
**User mencionou:** "Vejo que temos imagens bem genéricas nesta sessão para representar cada uma das faixas etárias. Precisamos rever isso."

**Estado atual:** cada faixa (bebê, criança, adolescente, adulto, idoso, etc.) tem só um ícone iconsax + cor. Não há fotos/ilustrações específicas.

**Opções:**
- Adicionar fotos Pexels CDN como fizemos para os 21 ambientes (consistência visual)
- Ilustrações próprias (mais autoral, mas exige design/contratação)
- Ícones customizados maiores (intermediário)

### 3. Imagens em Utensílios / Eletrodomésticos / Dispositivos: emojis ou favicons?
**User confundiu:** "as imagens que ilustram os cards de utensílios domésticos são favicons?"

**Resposta:** NÃO são favicons — são **emojis Unicode** (`item.emoji` no data file). O user provavelmente se confundiu pelo tamanho pequeno (28px) e estilo flat de cor. Os emojis vêm das fontes do sistema (Apple Color Emoji no iOS, Noto Color Emoji no Android), portanto a aparência VARIA entre devices.

**Decisão necessária:** manter emojis (consistência casual), trocar por iconsax (consistência visual + cor de marca), ou usar fotos reais Pexels (estilo premium).

---

## ⏸️ AGUARDANDO VALIDAÇÃO DO USER (em tempo ocioso)

### Dark Mode — varredura visual restante

**Status:** infraestrutura ✅, NeoTypography ✅ (override automático em dark via último style), Home/Aprender/Footer ✅. Várias outras telas devem ter melhorado automaticamente graças ao NeoTypography fix de cor.

**O que falta o user fazer:** durante tempo ocioso entre renovações de token, navegar pelas telas restantes em **Aparência → Escuro** e listar quais ainda têm problemas de contraste/legibilidade.

**Como vai funcionar:** próxima sessão Claude recebe a lista de telas problemáticas e aplica o padrão (importar `useThemeColors`, declarar `textPrimary`/`textSecondary`, fazer style merge `[s.X, { color: textPrimary }]` no `<Text>` cru). Não é trabalho exploratório — é mecânico.

**Hotspots prováveis (telas com muito `<Text>` cru + `Neo.colors.neutral[X]` hardcoded):**

**Lote 1 — refatorado (2026-05-18):**
- ✅ MenuScreenNeo — section labels, grid labels, theme picker modal
- ✅ RelatoriosScreenNeo — section label "Ambientes" + StatusBar
- ✅ MicroArticleScreen — title, meta, divider, body
- ✅ ChecklistDetailScreen — auditado, cascata do NeoTypography cobre quase tudo (só `loadingText` ficou com cor branca hardcoded, mas é bug pré-existente em ambos os temas)

**Lote 2 — refatorado (2026-05-18) baseado em prints do user:**
- ✅ EducationEnvironmentsScreen — nome do ambiente legível + REMOVIDA frase redundante "Guia de prevenção" + chevron box theme-aware
- ✅ PetPregnancyGuideScreen — section titles + item bullets text + StatusBar/backBtn
- ✅ AgeGroupDetailScreen — hero subtitle/desc, "Principais Riscos" header, riskTitle/riskDesc, preventionBox bg (era "white pill" em dark)

**Lote 3 — refatorado (2026-05-18):**
- ✅ TravelModeScreen — 5× sectionLabel via replace_all + StatusBar
- ✅ KitsHubScreen — StatusBar dynamic (resto cascateia via NeoTypography)
- ✅ RiscosMenuScreen — StatusBar dynamic
- ✅ FerramentasIAScreenNeo — sectionLabel + StatusBar
- ✅ PetWellnessScreen — sectionTitle, tipText, infoTitle, infoText + StatusBar
- ✅ PetFoodSafetyScreen — StatusBar (resto cascateia)
- ✅ AvesSegurasScreen — StatusBar (resto cascateia)
- ✅ PetPregnancyScreen — StatusBar (a tela tem muito Text plain em cards de pet, mas os cards têm bg white-ish onde dark text fica legível em ambos os modos)

**Lote 4 — refatorado (2026-05-18):**
- ✅ 5 forms Health (AddEvent/AddExam/AddTreatment/AddProcedure/AddMedicalRecord) — só StatusBar dinâmico, resto cascateia via NeoTypography (H1/H3/Body/Small)
- ✅ ProfileRiskSummaryScreen — sectionLabel (replace_all) + riskTitle + StatusBar
- ✅ HomeXRayScreen — sectionLabel (replace_all) + StatusBar
- ✅ ConceitoDetailScreen — textBody no renderList (era #4B5563 hardcoded) + StatusBar + backBtn color
- ✅ MicroBlogScreen — articleTitle + headerTitle
- ✅ AreasInternasScreen + AreasExternasScreen — cardTitle, questionText, stepText (replace_all) + StatusBar
- ✅ ChecklistWizardScreen — StatusBar + ambiente nome inline + **fix latente:** import de Text de react-native que estava faltando (bug pré-existente que crasharia se usuário entrasse no branch line 148)
- ✅ OndeProtegerScreen — headerTitle, sectionTitle, ambienteLabel, inventoryTitle (replace_all)

**Lote 5a — refatorado (2026-05-18):**
- ✅ MinhaSaudeScreen — StatusBar dinâmico (resto cascateia)
- ✅ SaudePetScreen — StatusBar dinâmico 2× (resto cascateia)
- ✅ MedicationSchedulerScreen — modalTitle, emptyText + StatusBar
- ✅ PrimeirosSocorrosScreen — cardTitle, modalTitle, stepText + StatusBar
- ✅ PrimeirosSocorrosEmergenciaScreen — StatusBar 2× (cascateia)

**Lote 5b/5c/5d — telas restantes (esperar feedback do user):**
- Health: ShareHealthRecord
- Education: JardinagemSegura, TeoriaFogo, RiscosFisicos, FerramentasTrabalho, UtensiliosDomesticos, EletrodomesticosScreen, IntroSafetyMenu, etc
- Emergency: EmergenciaPet, KitEmergencia/Remedios/PrimeirosSocorros (Kits), GuiaKitsEmergencia, PlanoIncendio
- Tools: AssistentePrevencaoIA, AudioMonitor, VisionMonitor, HistoricoAuditoria, DataHealth
- Safety: EscolaSegura/EscolaSeguraReport, VistoriaAsilo/VistoriaAsiloReport, SafetyActionPlan
- Travel: KitViagem, Inspecao*, FazendoAsMalas, TravelSafetyGuide
- Onboarding: BoasVindas, WelcomeTour, PerfilWizard, NewHomeWizard, FamilyComposition, MapeamentoRiscos
- Reviews: UtensiliosReviews, EletrodomesticosReviews, DispositivosEletronicosReviews, SafetyReviewDetail
- Outras: HistoricoMelhoras, RecentActivity, GenericCategory, ChecklistReport, ChecklistReforma, ChecklistVisit, AcessoriosSeguranca, EPIDomestico, MobilidadeSegura, SegurancaLazer, SegurancaFerias, LazerFeriasMenu, EnvironmentGuide (legacy), TermsOfUse, PrivacyPolicy, Sobre, UpgradePremium, AudioMonitor, VisionMonitor, ProdutoScanner, InfoRotulos/Result, ConversationalAgent, AITextChat, Chat, FerramentasIAScreen (legacy se houver), SafetyPermit, Briefing/SecretBriefing, MapeamentoRiscos, ModoPreventivo, EncerrarSituacao, ModoSituacaoAtiva, SituacoesTemporarias, EmergenciaRapida (já intencionalmente dark)

Total estimado: ~50 telas restantes. Estratégia: aguardar prints do user em dark mode e refatorar sob demanda priorizada por uso real.

**Padrão usado nos refactors:**
```js
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
// dentro do componente:
const themeColors = useThemeColors();
const isDark = useIsDark();
const textPrimary = themeColors.neutral[900];
const textSecondary = themeColors.neutral[700];
// nos <Text style={s.X}>:
<Text style={[s.X, { color: textPrimary }]}>
// no <StatusBar>:
<StatusBar style={isDark ? 'light' : 'dark'} />
```

---

## ✅ Frente #3 — PARTE 1 CONCLUÍDA (2026-05-18)

### Microinterações com Animated API nativa do RN

**Importante:** Reanimated NÃO está instalado no projeto (CHECKPOINT antigo dizia que sim, foi erro). Usamos `Animated` core do RN — funciona perfeitamente pra todas as microinterações desta fase, sem custo de instalação ou config babel.

**O que foi entregue:**

1. **`components/TappablePressable.js` (NOVO)** — Drop-in para `TouchableOpacity` em cards. Spring scale 0.97 ao press-in com retorno bouncy. Respeita `reduceMotion`. `useNativeDriver: true` (animação na thread nativa, zero JS bridge por frame). Aplicado no HomeScreenNeo (profile card, monitor, grid 4 cards, 2 tool cards).

2. **`screens/Education/EnvironmentGuideNeoScreen.js`** — Parallax hero (Spotify-style):
   - Hero "afunda" a meia velocidade do scroll (`translateY: scrollY * 0.5`)
   - Zoom-in 1.4x ao puxar overscroll para baixo
   - Fade para 50% opacity quando rolagem ultrapassa hero
   - Nav (back + emoji) ficou fixa fora do scroll (sobrepõe o hero parallaxado)
   - Tudo desligado em `reduceMotion`

3. **`components/SkeletonLoader.js` (NOVO)** — Placeholder animado com shimmer (gradient sliding em `translateX`). Theme-aware. Respeita `reduceMotion`. Exporta também `<SkeletonContactCard>` (composto: avatar circular + 3 linhas + 2 botões de ação). Aplicado em `ContatosEmergenciaScreen` substituindo o `ActivityIndicator` cego — agora o user vê a forma do conteúdo carregando.

**Padrões estabelecidos para reuso:**
- TappablePressable é a opção default para qualquer card clicável daqui pra frente. Pular pra TouchableOpacity só quando for botão pequeno (não-card) ou link de texto.
- SkeletonLoader resolve qualquer "fundo cinza enquanto carrega". `SkeletonContactCard` é o exemplo de "composto" — outras telas podem criar seus próprios compostos (ex: `SkeletonMedicationRow`, `SkeletonChecklistItem`).
- Parallax hero é um padrão replicável: scrollY → translateY interpolated → Animated.View. Pode aplicar nas outras telas com hero grande (MicroArticleScreen, KitDetailScreen, etc).

**O que falta de microinterações (Parte 2):**
- Swipe-to-delete com revealed action (precisa gesture-handler — já instalado)
- Number counter animado (Animated.Value + interpolate + onChange listener) nos scores
- Progress bar animado nos 3 Kits (width: 0 → valor real, easing.out)
- Transição slide horizontal entre tabs do MinhaSaude/SaudePet
- Stagger entrance padronizado (já tem ScaleInView e FadeInView, mas uso é inconsistente)

---

## ✅ Frente #3 — PARTE 2 + Frente #4 (haptic) CONCLUÍDAS (2026-05-18)

### Microinterações Parte 2

1. **`components/AnimatedProgressBar.js` (NOVO)** — barra de progresso que cresce de 0→value% com `Easing.out(Easing.cubic)`. Re-anima quando `value` muda. Respeita `reduceMotion`. Aceita props de cor, altura, duração, accessibilityLabel.

2. **`components/AnimatedCounter.js` (NOVO)** — tween de número (`Animated.Value` + listener → `setState`). Útil para scores, contagens, percentuais. Aplicado em `CompactActiveMonitor` — o score geral da Home agora anima 0→27% (ou qualquer valor) na primeira renderização e quando os dados mudam. Respeita `reduceMotion`.

3. **Swipe-to-delete em ContatosEmergencia** — `Swipeable` de `react-native-gesture-handler`. Cada card de contato pode ser arrastado para a esquerda revelando botão vermelho com ícone trash + texto "Excluir" (escala animada com o drag). Removeu necessidade do botão Excluir, mas mantivemos por enquanto pra não quebrar o fluxo conhecido — agora há 2 caminhos.

4. **App.js: `GestureHandlerRootView`** wrappando todo o app — necessário pro gesture-handler funcionar (sem ele, o Swipeable seria ignorado).

### Frente #4 (parcial): Haptic padronizado

5. **`utils/Haptics.js` (NOVO)** — wrapper semântico acima de `expo-haptics`. API:
   - `haptic.tap()` — toque em card/botão (Light)
   - `haptic.action()` — ação intermediária (Medium)
   - `haptic.toggle()` — switch/seleção (Selection)
   - `haptic.success()` — sucesso (Notification Success)
   - `haptic.warning()` — atenção (Notification Warning)
   - `haptic.error()` — falha (Notification Error)
   - `haptic.heavy()` — crítico (Heavy)
   - `haptic.sos()` — combo Heavy + Warning sequencial

6. **TappablePressable agora dispara `haptic.tap()` automaticamente** no press-in. Prop `hapticOnPress` permite mudar pra outro verbo ou desabilitar com `null`. Isso significa que todos os cards já recebem haptic sem o callsite precisar fazer nada.

7. **GlobalFloatingFooter migrado** — tap em tab → `haptic.tap()`, press-in do SOS → `haptic.heavy()`, press do SOS → `haptic.sos()`.

8. **AccessibilitySettings migrado** — toggle dos switches e dos chips de tema usam `haptic.toggle()`.

9. **HomeScreenNeo: `navigateWithHaptic` deduplicado** — não dispara mais haptic próprio (que estava duplicando com o TappablePressable). TappablePressable virou a única fonte. Mudança transparente.

### O que falta de microinterações (Parte 3 — futura)

- **Animated progress bars** nos 3 Kits (Primeiros Socorros, Emergência, Remédios) — usar AnimatedProgressBar onde tem fill estático hoje.
- **Stagger entrance padronizado** — uso atual de FadeInView/ScaleInView é inconsistente nos hubs (KnowledgeHub usa FadeInView, HomeScreen usa ScaleInView, outros hubs não usam nada).
- **Transição slide horizontal** entre tabs do MinhaSaude/SaudePet.
- **Bottom sheet com physics natural** em vez de Modal nativo (padronizar onde já é parcial).

### Sons UI (Frente #4 restante — bloqueado em decisão do user)

Precisa do user escolher 5 sons (tap, success, error, alert, navigation) — vão pra `assets/sounds/`. Sugestões de fontes CC0:
- Mixkit (mixkit.co/free-sound-effects/notification/)
- Pixabay sons (pixabay.com/sound-effects/)
- BBC Sound Effects (livre p/ uso pessoal/educacional)

Quando user fornecer ou aprovar 5 arquivos `.mp3`/`.wav`, próxima sessão:
- Cria `services/SoundService.js` com pre-load via `expo-audio`
- Adiciona toggle "Sons da interface" em AccessibilitySettings
- Wire em TappablePressable + ações chave (próximo de `haptic.*`)

---

## ✅ Sessão 2026-05-20 — Imagens do acervo + polimentos Home

### Lote 8a — eBook + acervo de imagens (Drive)
- Criado `docs/STYLE_GUIDE.md`: tom de voz do autor Agnaldo Fontinele extraído do eBook "Prevenção 3D". Conceito 3D (Diária/Dinâmica/Duradoura), vocabulário-marca, templates de texto, anti-padrões, números de emergência.
- Criado `docs/IMAGES_INVENTORY.md`: mapeamento de ~50 imagens do Drive (pasta "Imagens Prevenção", ID `1OKFm3j3fM-fo_deXf7mMAbrrfMeJATwg`) para categorias do app. Inclui File IDs para download.
- Docs commitados em `18f01ac` + `a2f762a` (prompts IA Midjourney para 13 imagens Acessórios).

### Lote 8b — Bundle local das 13 imagens do Drive
- Baixados via MCP Google Drive e salvos em `assets/images/prevencao/`:
  - **Acessórios (10):** protetor-de-quina, trava-gaveta, protetor-de-tomada, trava-vaso, trava-micro, protecao-escadas, redes-protecao, protetor-de-cama, sensor-seguranca, monitoramento
  - **Primeiros Socorros (3):** engasgo, queda, mordida-cachorro
- `data/acessorios_seguranca.js`: 10 campos `imagemUrl: 'https://...'` → `imagem: require('../assets/images/prevencao/...')`
- `data/primeiros_socorros_imagens.js`: ps_2/ps_7/ps_11 → `require()` local
- **Arquitetura nova (retrocompat):**
  - `require()` retorna `number` (asset ID) → campo `imagem` (offline)
  - URL string → campo `imagemUrl` (remoto Pexels)
  - `withImages()` em `primeiros_socorros.js` detecta tipo automaticamente
  - `AcessoriosSegurancaScreen` e `PrimeirosSocorrosScreen` suportam `imagem || {uri: imagemUrl}`
- Commitado em `3436622`.

### Polimento AcessoriosSegurancaScreen
- **Pills removidas**: `PROFILE_TABS`, `selectedProfile`, `filteredCategories`, `renderProfileTab`, ScrollView horizontal — 105 linhas removidas. Página curta, filtro era ruído desnecessário. Commit `2416664`.

### Redesign HousePill (Home header)
- **Problema:** pill usava `LinearGradient` branco opaco + `borderRadius 22`, destoa do fundo mint e do profileCard ao lado (borderRadius 18, rgba sólido).
- **Solução:** remove `LinearGradient` (import removido), `borderRadius 18` = match profileCard, fundo `rgba(255,255,255,0.88)` idêntico, ícone squircle (borderRadius 10), sublabel "Moradia ativa" + nome em negrito.
- Agora os dois cards do header são da mesma família visual.
- Commit `1c734d9`.

### Itens deixados propositalmente para revisão geral do user
- `seguranca_eletrica_fogo`: imagem ainda fora de contexto (sensor genérico). User disse que irá revisar esta seção completamente em breve.
- 3 categorias Acessórios sem imagem no Drive (protecao_portas, barras_apoio, seguranca_agua) mantêm Pexels.

---

## 🎯 PRÓXIMA TAREFA PRIORITÁRIA — próxima sessão

---

## ✅ Frente #1 — CONCLUÍDA (2026-05-18)

**O que foi feito:**
- Migrado de StyledHero (gradient + emoji) para fotos reais via Pexels CDN
- Cada um dos 21 ambientes agora tem `capa: [url1, url2]` com cascade fallback
- StyledHero mantido como último recurso (quando ambas URLs falham)
- Header docblock do arquivo atualizado explicando a nova estratégia

**Por que Pexels (não Unsplash, não local):**
- Pexels não reusa photo-IDs (diferentemente de Unsplash) — URL aponta sempre para a mesma foto
- CC0, mesma licença permissiva
- Acervo melhor para contextos específicos (botijão GLP, áreas comuns de condomínio)
- Não exige bundle local (zero peso adicional no app)

**Mapeamento ambiente → Pexels primary ID** (todos com fallback secundário):

| Ambiente | Primary ID | Contexto |
|---|---|---|
| sala | 1571469 | Sofá cinza em sala moderna |
| cozinha | 5524067 | Cozinha branca com inox |
| despensa | 4440173 | Prateleiras com potes de vidro |
| quartos | 2631746 | Quarto neutro de adulto |
| quarto_bebe | 4713247 | **Berço nu** em quarto sereno |
| quarto_crianca | 5008397 | Beliche com teepee, real |
| quarto_idoso | 8899457 | Quarto sênior minimalista |
| banheiros | 5524223 | Banheiro residencial |
| armarios | 8893908 | Guarda-roupa organizado |
| lavanderia | 5365777 | Lavanderia doméstica |
| garagem | 6200441 | Pickup suburbana na garagem |
| oficinas | 30361320 | Parede com ferramentas, oficina caseira |
| depositos | 36946571 | **Depósito** com prateleiras e caixas |
| central_gas | 36285352 | **Botijões GLP** encostados na parede |
| quintal | 25972319 | Quintal com flores e mobília de pátio |
| jardinagem | 6231714 | Ferramentas de jardinagem em terra |
| areas_coletivas | 33094391 | Playground com escorregador |
| piscina | 17568046 | **Piscina residencial suburbana** |
| praia_rios | 4321954 | Praia tropical aérea |
| escadas | 13005094 | **Escada residencial** com corrimão |
| varanda | 17758798 | **Varanda urbana** com mobília |

**Validação visual pendente do user:** ao rodar o app, navegar em Aprender → Riscos por Ambiente → tap em cada ambiente. Se algum não estiver fiel ao contexto, basta dizer o `id` que escolho outra URL Pexels. O sistema de fallback já cobre falhas de carregamento (404).

---

## ✅ Frente #2 — PARTE 1 CONCLUÍDA (2026-05-18)

### Dark Mode — infraestrutura completa

- **`utils/DesignSystem2026.js`**: paletas `LightColors` + `DarkColors` definidas, exportadas como named exports. Brand verde (#10B981) mantida nas duas. Neutral invertido. Cores semânticas usam valores oficiais iOS Dark Mode (`#FF453A`, `#30D158`, `#FFD60A`, `#64D2FF`). `DarkDS` espelha `DS` com colors trocadas.
- **`utils/ThemeContext.js`**: reescrito do zero. 3 modos: `system` (default — segue `useColorScheme`), `light`, `dark`. Persistido em `AsyncStorage` (`@vigilaro_theme_mode`). Hooks: `useTheme()`, `useThemeColors()`, `useIsDark()`, `useThemeDS()`. Mantém retrocompat com SafeScreen (que usa `theme.background`).
- **`components/AppBackground.js`**: lê tema via `useThemeColors()`. Variante `mist` agora tem gradiente light (verde claro) E dark (verde escuro com tom esverdeado sutil). StatusBar deriva do tema (override manual ainda funciona). MIST exportado mantido só pra compat (light hardcoded — código atual não importa em lugar nenhum).
- **`components/NeoCard.js`**: BlurView `tint` dinâmico (light/dark). Glass variant tem bordas branco-alpha em light e branco-alpha-baixo em dark. Flat e outline variants também adaptados.
- **`screens/AccessibilitySettingsScreen.js`**: nova seção "Aparência" com chip-picker de 3 opções (Sistema, Claro, Escuro). Tela inteira refatorada para ler `colors` do tema (labels, descs, dividers, switches, badges, header). Acessibilidade: `accessibilityRole`, labels nos chips e back button.

### Acessibilidade — sweep nas 3 telas mais críticas

- **`screens/Emergency/SOSCountdownScreen.js`**: `accessibilityLiveRegion="assertive"` no countdown, `accessibilityRole="header"`/"button", `accessibilityHint` no cancel. Pulse animation passa a respeitar `reduceMotion` do AccessibilityContext (importante para idosos com vertigem).
- **`screens/Emergency/ContatosEmergenciaScreen.js`**: labels em back, add, e cada quick action (Call, WhatsApp, SMS) com nome do contato interpolado. Hint em destrutivo (Excluir). hitSlop nas quick actions.
- **`screens/HomeScreenNeo.js`**: labels no profile card (com nome do perfil ativo), monitor (com status + estado expandido), grid cards (label + status), tool buttons, history link, section header.
- **`components/ScaleInView.js`**: respeita `reduceMotion` — quando ativo, renderiza no estado final sem animar. Como é usado em todos os grid cards da Home (e provavelmente outros lugares), esse fix tem efeito cascata. Importante: idosos com vertigem ganham UX estática automaticamente.

### Não foi feito nesta parte (vai para Parte 2)

- ❌ Sweep das ~120 telas restantes (a8labels nos botões secundários — KnowledgeHub, hubs, formulários, settings sub-screens)
- ❌ Refatorar as telas que usam `Neo.colors.neutral[X]` hardcoded para ler do tema dinâmico (no momento, muitas telas vão ter texto preto em fundo escuro quando o user ligar dark mode)
- ❌ Validação manual VoiceOver/TalkBack
- ❌ Validação contraste WCAG AA pair-by-pair

**Como continuar na Parte 2:**
1. User testa Aparência → Escuro no app. Lista quais telas têm problema visual.
2. Para cada tela problemática, swap `Neo.colors.neutral[X]` → `useThemeColors().neutral[X]` (ou usar `useTheme()`).
3. Sweep accessibilityLabel batches de ~10-15 telas por vez.

### Arquivos novos / refatorados

```
utils/DesignSystem2026.js       — DarkColors + DarkDS exports
utils/ThemeContext.js           — reescrito (system/light/dark + persistência)
components/AppBackground.js     — theme-aware
components/NeoCard.js           — theme-aware (BlurView tint)
components/ScaleInView.js       — respeita reduceMotion
screens/AccessibilitySettingsScreen.js — toggle Aparência + theme-aware
screens/Emergency/SOSCountdownScreen.js — a11y completa + reduceMotion
screens/Emergency/ContatosEmergenciaScreen.js — a11y nas ações críticas
screens/HomeScreenNeo.js        — a11y nas ações principais
```

---

## 🗺️ ROADMAP — pós-imagens, próximas 3 grandes frentes

Validado com o user: estas são as frentes que de fato **destacam o app dentre concorrentes** (apps de safety/care como Life360, Tile, Nest Aware). Ordem de prioridade após resolver imagens:

### #2 — Acessibilidade + Dark Mode (1-2 sessões)

**Por que é prioridade #2:** Público idoso é core do Vigilaro Care. App Store policy + WCAG AA são requisito real, não "extra".

#### Acessibilidade
- [ ] Sweep em todas as ~125 telas adicionando `accessibilityLabel` em `TouchableOpacity`, `Image`, `NeoIcon` interativos
- [ ] `accessibilityRole="button"` / `"header"` / `"image"` consistente
- [ ] `accessibilityHint` em ações críticas (SOS, ligar CIATOX, excluir contato)
- [ ] Testar VoiceOver (iOS) e TalkBack (Android) nas jornadas críticas (Home → SOS, Login → Onboarding, vistoria de ambiente)
- [ ] Validar contraste WCAG AA com WebAIM Contrast Checker em todos os pares texto/fundo do DS
- [ ] Fontes escalonáveis: respeitar `fontScale` do sistema (idosos aumentam para 1.5x ou 2x — verificar overflow)
- [ ] Hit-slop generoso em TODOS os botões pequenos (já tem em vários, falta padronizar)
- [ ] Reduzir movimento: respeitar `prefersReducedMotion` (importante para idosos com vertigem)

**Arquivo de referência:** `screens/AccessibilitySettingsScreen.js` (já tem toggle de left-handed, contraste alto — expandir)

#### Dark Mode
- [ ] `utils/DesignSystem2026.js` já tem `DarkColors` definido — **nenhuma tela usa ainda**
- [ ] Implementar `ThemeContext` ou usar `useColorScheme()` do RN
- [ ] Toggle em `AccessibilitySettings` (manual) + opção "Sistema"
- [ ] Adaptar `AppBackground` para `mist.dark` (gradient escuro)
- [ ] Adaptar `NeoCard` glass — BlurView tint dark
- [ ] Validar contraste em todos os ambientes que usam cor própria (cozinha laranja, banheiro azul, etc — alguns vão precisar variant dark)
- [ ] Telas críticas que devem MANTER tema próprio (não seguir dark): `SOSCountdown` (vermelho), `EmergenciaRapida` (preto), `ConversationalAgent` (dark intencional)

**Estimativa:** ~3-5h de trabalho focado por feature

---

### #3 — Microinterações com Reanimated 3 (1-2 sessões)

**Por que é prioridade #3:** Diferença entre "app funcional" e "app premium" está nas microanimações. Apps top-tier (Apple Health, Linear, Things 3) ganham aqui.

#### Animações sugeridas
- [ ] **Tap feedback**: scale 0.97 com spring suave em todos os TouchableOpacity de cards
- [ ] **Scroll parallax** no hero do `EnvironmentGuideNeoScreen` (hero "afunda" 30% ao rolar)
- [ ] **Stagger entrance** nos cards do `KnowledgeHub`, `RiscosMenu`, `FerramentasIA` (cada card aparece com fade+translate 50ms depois do anterior)
- [ ] **Progress bar animado** nos Kits (fill cresce de 0% até o valor real, easing.out)
- [ ] **Pulse contínuo** no botão SOS quando idle (já tem na countdown, levar para o footer)
- [ ] **Transição entre tabs** no MinhaSaude/SaudePet com slide horizontal suave
- [ ] **Number counter** nos índices de risco (de 0 até X com easing)
- [ ] **Swipe-to-delete** com revealed action red nos contatos de emergência, medicamentos, checklists
- [ ] **Skeleton loaders** substituindo ActivityIndicator nas telas com loading (MinhaSaude, RecentActivity, InfoRotulosResult)
- [ ] **Bottom sheet** com physics natural em vez de Modal nativo (já parcialmente — padronizar)

**Bibliotecas:** `react-native-reanimated@3` (já instalado), `react-native-gesture-handler` (já instalado)

**Estimativa:** ~4-6h focado

---

### #4 — Sons sutis + Haptic padronizado (0.5 sessão)

**Por que ganha apesar de pequeno:** baixíssimo custo, percepção de qualidade ↑↑.

#### Implementação
- [ ] Biblioteca de sons UI livres (BBC Sound Effects, Mixkit) — escolher 5: tap, success, error, alert, navigation
- [ ] Toggle em `AccessibilitySettings` (alguns idosos preferem silêncio)
- [ ] `Haptics.Light` em taps comuns
- [ ] `Haptics.Medium` em ações importantes (salvar, marcar feito)
- [ ] `Haptics.Heavy` + sound em alertas (SOS dispara, validação de campo)
- [ ] `Haptics.Success` em conclusões (vistoria completada, kit 100%)
- [ ] Auditoria: hoje haptic está em algumas telas (MedicationScheduler, etc) mas não padronizado — listar usos e uniformizar

**Estimativa:** ~2h focado

---

### #5 — Identidade visual única (sessão dedicada — opcional)

**Quando atacar:** depois das anteriores. Requer alinhamento de marca.

- [ ] Avaliar logo atual — adequado mas pouco memorável
- [ ] Definir "assinatura visual" (uma forma característica, ilustração própria, padrão de fundo)
- [ ] Aplicar consistentemente: splash, onboarding, empty states, marca d'água Menu
- [ ] Trocar emojis genéricos por ilustrações próprias nos hubs principais (KnowledgeHub, FerramentasIA)
- [ ] Considerar contratar ilustrador para 10-15 spot illustrations (não-IA — diferencial autoral)

**Estimativa:** depende de decisão de marca

---

### Ordem sugerida cronológica

```
Sessão N+1: ✅ Imagens reais 21 ambientes — CONCLUÍDA (2026-05-18)
Sessão N+2: ✅ Dark Mode infra + a11y telas críticas — CONCLUÍDA (2026-05-18)
Sessão N+3: ✅ Microinterações parte 1 — TappablePressable, parallax, Skeleton (2026-05-18)
Sessão N+4: ✅ Microinterações parte 2 + Haptic helper — CONCLUÍDA (2026-05-18)
Sessão N+5: ◀ PRÓXIMA — Sons UI (precisa de aprovação do user de arquivos .mp3)
Sessão N+6: Sweep a11y/dark nas ~120 telas restantes (idle do user)
Sessão N+7: Identidade visual (se viável)
```

**Total estimado:** 2-3 sessões focadas restantes.

---

## 📊 Estado da campanha (concluído nesta sessão)

### Telas redesenhadas: **~125 das 127** (98%)
Padrão premium híbrido aplicado: header 38×38 ArrowLeft2 + H1+Caption, AppBackground mist, NeoCard glass, paddingBottom 190 (clearance SOS), StatusBar expo-status-bar.

### Tasks completas (32 total)
Todas as 32 tasks no Task System estão `completed`. Última: **Conceitos Fundamentais** (#32).

### Bugs latentes corrigidos durante a campanha
Dezenas de bugs silenciosos que estavam degradando o app:
- `<Text>`, `React`, `useState`, `Platform` faltando em imports → ReferenceErrors mascarados
- **~80 ícones** inexistentes em iconsax (Ionicons/MaterialCommunity usados por engano em telas Health, Emergency, BoasVindas etc) que renderizavam vazio
- `circle bg transparent` na SOSCountdown → countdown vermelho invisível sobre overlay vermelho (UX crítica)
- `Neo.shadows.lg`, `Neo.colors.white`, `<NeoCard variant="solid">` — refs para tokens inexistentes
- `spread` sintaxe quebrada em JSX (PrimeirosSocorros)
- `ambienteId`, `primaryProfile` usados sem extração de params
- `progressBarFill: transparent` (fill invisível) nos 3 Kits
- Rotas quebradas em hubs (KitsHub, FerramentasIA)

### Telas com hero/visual deliberadamente diferente (NÃO mexer)
- `SOSCountdownScreen` — vermelho intenso modo-pânico
- `EmergenciaRapidaScreen` — fundo escuro alto contraste
- `ConversationalAgentScreen` — fundo dark intencional
- `SituacoesTemporariasScreen` — primary[900] intencional

---

## 📁 Arquivos-chave do projeto

| Caminho | Função |
|---|---|
| `data/knowledge_prevencao.js` | **Dados dos 18 ambientes** (tarefa pendente) |
| `data/intro_safety.js` | Dados dos Conceitos Fundamentais (último refactor) |
| `data/educational_guides.js` | Hub dos cards de ambientes (Proxy multi-idioma) |
| `data/locales/pt-BR/educational_guides.js` | Labels PT-BR — "Quartos" foi renomeado para "Quarto de Adulto" |
| `utils/DesignSystem2026.js` | DS Neo — tokens principais (`Neo.colors.*`, `Neo.spacing.*`, `Neo.shadows.sm/md`, `Neo.radii.*`) |
| `utils/Theme.js` | Theme legacy compat (`Colors`, `Spacing`, `Shadows`, `BorderRadius`, `Typography`, `Neo` alias) |
| `components/NeoCard.js` | Card glass unificado (variant="elevated" = glass com BlurView) |
| `components/AppBackground.js` | Background mist verde — sem `variant="subtle"`, default é mist |
| `components/NeoTypography.js` | H1, H2, H3, Body, Small, Caption |
| `components/NeoIcon.js` | Wrapper iconsax (CUIDADO com nomes Ionicons/MaterialCommunity inválidos) |

### Padrão visual estabelecido
```jsx
<AppBackground>
  <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
    <StatusBar style="dark" />
    <View style={s.header}>
      <TouchableOpacity style={s.backBtn} hitSlop={...}>
        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <H1 style={s.title}>Título</H1>
        <Caption style={s.subtitle}>Subtítulo</Caption>
      </View>
    </View>
    <ScrollView contentContainerStyle={{ paddingBottom: 190 }}>
      <NeoCard variant="elevated">...</NeoCard>
    </ScrollView>
  </SafeAreaView>
</AppBackground>
```

```js
// styles padrão
backBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.75)', alignItems: 'center', justifyContent: 'center' },
title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 ou 24 },
subtitle: { color: Neo.colors.neutral[600] },
header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 14, gap: 12 },
```

---

## 🚨 Armadilhas conhecidas (anti-regressão)

### Ícones iconsax — sempre verificar antes de usar
**NÃO existem em iconsax:** `paw`, `person`, `skull`, `medical`, `sunny`, `moon`, `partly-sunny`, `checkbox`, `square-outline`, `happy`, `body`, `hospital-box`, `medical-bag`, `clipboard-pulse`, `heart-pulse`, `magnet`, `scan-helper`, `radiobox-marked`, `stomach`, `test-tube`, `beaker`, `needle`, `clipboard-text`, `alert-circle`, `bug`, `walk`, `water`, `fitness`, `add-circle`, `flame`, `leaf`, `flask`, `pulse`, `tree`, `virus`, `heart-dislike`, `warning`, `eye-off`, `Pet`, `HeartSlash`, `LampOn`

**Existem e podem usar:** `ArrowLeft2`, `ArrowRight2`, `ArrowDown2`, `ArrowUp2`, `Add`, `AddCircle`, `Tick`, `TickCircle`, `TickSquare`, `Trash`, `Edit2`, `Heart`, `Health`, `Lovely`, `Cake`, `Cpu`, `Drop`, `Scan`, `Sound`, `User`, `Call`, `Camera`, `Eye`, `EyeSlash`, `Home2`, `Briefcase`, `Sun1`, `Cloud`, `Moon`, `Activity`, `Warning2`, `Danger`, `DangerCircle`, `InfoCircle`, `Lamp`, `LampCharge`, `ShieldTick`, `Hospital`, `Calendar`, `CalendarEdit`, `Clock`, `Clipboard`, `DocumentText`, `Message`, `MessageText1`, `Send2`, `ShareNetwork`, `Whatsapp`, `Sms`, `CloseSquare`, `CloseCircle`, `Forbidden2`, `Profile`, `ProfileCircle`, `ShieldTick`, `Setting4`, `Location`, `EmojiHappy`, `Bubble`, `Card`, `Logout`, `Personalcard`, `Copy`, `Microphone2`, `Bed`

### `Neo.shadows.lg` NÃO existe
Apenas `sm`, `md`, `floating`, `none`, `premium4K`. Se precisar de sombra forte, use `md` ou `floating`.

### `<NeoCard variant="solid">` NÃO existe
Variants válidos: `elevated`, `glass` (alias), `outline`, `flat`, `primary`. Default sem variant cai em fallback white.

### `AppBackground variant="subtle"` foi descontinuado
Causava background washed-out. Sempre usar `<AppBackground>` (mist verde rico é o default).

### `StatusBar barStyle="..."` está deprecated
Usar sempre `import { StatusBar } from 'expo-status-bar'` e `<StatusBar style="dark" />` (ou `light`).

### `Colors`, `Spacing`, `Shadows` do utils/Theme
Ainda existem por compat, mas SE remover o import, **verificar todos os usos no arquivo antes** — já criou 5 ReferenceErrors em produção quando esqueci.

---

## 🧪 Como testar / rodar

```bash
# No worktree
cd "C:\Users\User\Documents\VigilaroCareV6 Neo\.claude\worktrees\unruffled-jennings-51c18f"

# Iniciar Metro (usuário prefere tunnel — funciona em qualquer rede)
npx expo start --tunnel

# No celular: Expo Go → escanear QR
```

---

## 🎁 Bônus — outras melhorias eventuais (low priority)

Coisas que NÃO são bugs mas poderiam ser polidas no futuro:
- 4 telas `StatusBar barStyle` deprecated em telas com bg colorido (ConversationalAgent, SituacoesTemporarias, ChecklistDetail, OndeProteger) — funcionam mas geram warning
- Telas legacy usando `Colors`/`Spacing` do Theme — funcionam mas seria melhor migrar para `Neo.colors`/`Neo.spacing`
- Algumas telas (ex: NewHomeWizard, ChecklistDetail) têm 500+ linhas e poderiam ser quebradas em componentes menores

---

## 📞 Para continuar na próxima sessão

1. **Abrir novo chat** e referenciar este arquivo: _"Continue de onde parou conforme `CHECKPOINT.md`"_

2. **Branch e worktree:**
   ```
   Branch: claude/unruffled-jennings-51c18f
   Worktree: C:\Users\User\Documents\VigilaroCareV6 Neo\.claude\worktrees\unruffled-jennings-51c18f
   Último commit: 1c734d9 (Redesign HousePill)
   Status: limpo (só assets/app-icon-square.png untracked, ignorar)
   ```

3. **Pendências priorizadas (decidir com user no início):**

   | # | Item | Status |
   |---|---|---|
   | A | **Aplicar STYLE_GUIDE ao conteúdo do app** — reescrever `descricao`, `prevencao[]`, `tipos[]` nos data files para seguir tom do eBook (Agnaldo Fontinele). Prioridade: Acessórios, depois Primeiros Socorros. | ⏳ aguarda decisão |
   | B | **Sons UI** — user precisa aprovar/fornecer 5 arquivos `.mp3`/`.wav`. Então criar `services/SoundService.js` + toggle em AccessibilitySettings. | 🔒 bloqueado (arquivos) |
   | C | **Revisão geral de conteúdo** — user mencionou que fará revisão das seções. HousePill atualizado, `seguranca_eletrica_fogo` com imagem ruim (aguardando). | 🔒 aguarda user |
   | D | **Sweep dark mode** — ~50 telas restantes ainda não refatoradas para `useThemeColors()`. Atacar sob demanda conforme prints do user. | 🔒 aguarda prints |
   | E | **Merge na main** — quando user decidir que branch está pronto. | 🔒 aguarda user |

4. **Arquitetura nova a conhecer (imagens locais):**
   - `assets/images/prevencao/` → 13 imagens do Drive bundladas
   - Campo `imagem: require(...)` (número) = asset local offline
   - Campo `imagemUrl: 'https://...'` (string) = remoto Pexels
   - `withImages()` em `primeiros_socorros.js` detecta o tipo automaticamente
   - Screens com suporte dual: `AcessoriosSegurancaScreen`, `PrimeirosSocorrosScreen`, `ConceitoDetailScreen`

5. **Docs de referência criados nesta sessão:**
   - `docs/STYLE_GUIDE.md` — tom de voz do eBook Prevenção 3D
   - `docs/IMAGES_INVENTORY.md` — catálogo do Drive com File IDs
   - `docs/AI_PROMPTS_ACESSORIOS.md` — prompts Midjourney para 13 imagens

Tudo no branch `claude/unruffled-jennings-51c18f` — pronto pra merge na main quando o user decidir.
