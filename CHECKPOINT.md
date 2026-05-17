# 🚦 CHECKPOINT — Vigilaro Care V6 Neo

**Última atualização:** 2026-05-17
**Branch:** `claude/unruffled-jennings-51c18f` (worktree isolada)
**Commits totais no branch:** 68

---

## 🎯 TAREFA PENDENTE PRIORITÁRIA — para retomar nesta ordem

### #1 — Imagens reais nos ambientes (CRÍTICA, adiada por tokens)

**Arquivo:** `data/knowledge_prevencao.js`
**Tela afetada:** `screens/Education/EnvironmentGuideNeoScreen.js`
**Acessada via:** Menu Aprender → Riscos e Orientações por Ambiente → tap em qualquer ambiente

#### Estado atual
Todos os 18 ambientes têm flag `useStyledHero: true` → renderizam hero estilizado nativo (gradient duotone na cor do ambiente + emoji 130px + círculos decorativos). Foi solução intermediária após múltiplas tentativas com URLs Unsplash que retornavam imagens fora de contexto (academia na piscina, foto de escritório no depósito, etc.).

#### O que o user quer
> *"Tenho 100% de preferência de imagens reais e 100% dentro do contexto de cada ambiente."*

User reportou problemas específicos quando estávamos tentando URLs Unsplash:
- Quarto de bebê fora de contexto — quer foto de quarto com **berço nu**
- Quarto infantil com desenho genérico — quer **foto real**
- Quarto do idoso fora do contexto
- Garagem fora do contexto — quer foto com **foco em prevenção**
- Oficina/Ferramentas com desenho — quer foto de **residência com ferramentas na parede/bancada**
- Depósitos com foto de **escritório** (errado)
- Gás/GLP com desenho — quer **botijão em ambiente doméstico**
- Quintal/Jardim com foto de **piscina** (errado)
- Escadas com desenho — quer **escada doméstica real**
- Varanda fora de contexto

#### Estratégia recomendada para a próxima sessão
**Não tente mais URLs Unsplash via `photo-ID`** — provou-se instável (IDs antigos podem retornar fotos completamente diferentes ao longo do tempo). Opções:

1. **Imagens locais bundle** (mais robusto): user fornece JPGs → salvar em `assets/images/ambientes/` → referenciar com `require('../../assets/images/ambientes/quarto_bebe.jpg')`
2. **Pexels CDN** (alternativa CC0 mais estável que Unsplash): formato `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1200`
3. **API Unsplash com chave** (requer setup): autenticada, garante imagens corretas
4. **Manter StyledHero** (atual) — user já disse que **não quer**

**Importante:** o componente `EnvironmentGuideNeoScreen.js` já está preparado para receber `capa` como string OU array de URLs (cascade fallback) e tem o StyledHero como último recurso. Basta atualizar o data file e remover o `useStyledHero: true` dos que ganharem imagem real.

#### IDs dos ambientes (em `data/knowledge_prevencao.js`)
- `sala`, `cozinha`, `despensa`, `quartos`, `quarto_bebe`, `quarto_crianca`, `quarto_idoso`, `banheiros`, `armarios`, `lavanderia`, `garagem`, `oficinas`, `depositos`, `central_gas`, `quintal`, `jardinagem`, `areas_coletivas`, `piscina`, `praia_rios`, `escadas`, `varanda`

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
2. **Prioridade clara:** imagens reais nos 18 ambientes
3. **Decidir abordagem:** locais (assets/) vs Pexels vs Unsplash com API key
4. **Por ambiente, atualizar:** remover `useStyledHero: true` e adicionar `capa: 'url-real'` (ou `capa: require('./...')` se local)

Tudo no branch `claude/unruffled-jennings-51c18f` — pronto pra merge na main quando o user decidir.
