# 🚦 CHECKPOINT — Vigilaro Care V6 Neo

**Última atualização:** 2026-05-18
**Branch:** `claude/unruffled-jennings-51c18f` (worktree isolada)
**Commits totais no branch:** 71

---

## 🎯 PRÓXIMA TAREFA PRIORITÁRIA

### #2 — Acessibilidade + Dark Mode (próxima sessão)

A frente #1 (imagens reais nos 21 ambientes) está **CONCLUÍDA** — ver "Histórico" abaixo. Próxima ação: começar pela varredura de `accessibilityLabel` nas ~125 telas (detalhes em `## 🗺️ ROADMAP` mais abaixo).

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
Sessão N+2: ◀ PRÓXIMA — Acessibilidade: sweep accessibilityLabel + testes VoiceOver/TalkBack
Sessão N+3: Dark Mode — implementar ThemeContext + adaptar AppBackground/NeoCard
Sessão N+4: Microinterações parte 1 — taps, stagger, parallax hero
Sessão N+5: Microinterações parte 2 — swipe-to-delete, skeleton loaders, transitions
Sessão N+6: Sons + Haptics padronização
Sessão N+7+: Identidade visual (se viável)
```

**Total estimado:** 5-6 sessões focadas restantes para o app entrar em outro patamar comparado aos top-tier do setor.

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

1. **Cumprimentar e referenciar este checkpoint:** _"Continue de onde parou conforme `CHECKPOINT.md`"_
2. **Prioridade clara:** Acessibilidade (frente #2) — começar pela varredura de `accessibilityLabel` nas telas mais críticas (SOS, Login, Contatos Emergência, EnvironmentGuide)
3. **Validar imagens:** o user pode antes pedir uma volta de validação visual nas fotos dos 21 ambientes (rodar o app e checar tap a tap). Se alguma estiver fora de contexto, basta o `id` do ambiente que troco a URL.

Tudo no branch `claude/unruffled-jennings-51c18f` — pronto pra merge na main quando o user decidir.
