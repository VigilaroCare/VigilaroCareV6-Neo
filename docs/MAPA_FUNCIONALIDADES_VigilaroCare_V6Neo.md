# Mapa de Funcionalidades — Vigilaro Care V6 Neo

**Método:** reconstruído a partir da leitura do código em 21/09/2026, branch `feat/mapa-de-riscos-domesticos`, commit `96209b9`. Cada afirmação aponta o arquivo que a comprova. O que não pôde ser confirmado está marcado como **[incerto]** — nada foi preenchido por suposição.

**Para que serve:** impedir que a landing page, as fichas das lojas, a política de privacidade ou o onboarding prometam o que o app não entrega, ou omitam o que ele faz com dados do usuário.

> Substitui o mapa anterior, escrito a partir de histórico de conversas e sem leitura do código.

---

## 1. Números reais

| Item | Valor | Onde conferir |
|---|---|---|
| Telas (arquivos) | 129 | `screens/**/*.js` |
| Rotas registradas | 119 | `App.js` (`Stack.Screen`) + `navigation/MainTabNavigator.js` |
| Rotas comentadas/desativadas | 0 | idem |
| Telas sem rota | 0 | as 11 sem rota direta são subcomponentes ou usadas fora do navegador (ver §2) |
| Serviços | 39 | `services/*.js` |
| Componentes | 57 | `components/*.js` |
| Ambientes de vistoria | **25** | `data/mapeamento_dados.js` (`AMBIENTES`) |
| Áreas de checklist | **28** | `CHECKLISTS` = 25 ambientes + `kits_prontidao`, `escola_segura`, `asilo_seguro` |
| Itens de checklist | **245** | `data/mapeamento_dados.js:478+` |
| Categorias de risco | **5 + preparação** | `data/categoriasRisco.js` — acidente, químico, ambiente, contaminação, ergonomia (+ preparação) |
| Níveis de severidade | 3 | alta, média, baixa (`SEVERIDADES`) |
| Faixas de score | 4 + início | `ScoreService.getBanda` — ≥90, ≥70, ≥40, <40, e 0 = início |

**Estrutura:** não existe `src/`. Código direto na raiz: `screens/`, `services/`, `components/`, `utils/`, `data/`, `contexts/`, `hooks/`, `scripts/`, `locales/`, `navigation/`, `backend-proxy/`.

---

## 2. Rotas por domínio

Todas registradas em `App.js`, exceto as abas em `navigation/MainTabNavigator.js`.

**Raiz (34):** AccessibilitySettings, AcessoriosSeguranca, AgeGroupDetail, AmbientesVistoriados, BoasVindas, Briefing, Contato, CuidarProtegerHub, EduContentDetail, Eletrodomesticos, EpiDomestico, GenericCategory, HistoricoAuditoria, HomeCompleta, InfoRotulos, InfoRotulosResult, IntroSafetyMenu, MobilidadeSegura, ModoPreventivo, NewHomeWizard, PrivacyPolicy, ProdutoScanner, RecentActivity, SafetyPermit, Scanner, SecretBriefing, SegurancaFerias, SegurancaLazer, SituacoesTemporarias, Sobre, TermsOfUse, UpgradePremium, VigilaroScanHub, WelcomeTour

**Education (27):** AnimaisPeconhentos, ConceitoDetail, DispositivosEletronicosReviews, DispositivosProtecao, EducationEnvironments, EletrodomesticosReviews, EnvironmentGuide, EnvironmentGuideNeo, FasesVidaMenu, FerramentasTrabalho, GuiaKitsEmergencia, JardinagemSegura, KnowledgeHub, LazerFeriasMenu, MicroArticle, MicroBlog, NeurodivergenceMenu, PlantasToxicas, PremiumArticle, ProdutosPerigosos, RiscosFisicos, RiscosMenu, SafetyReviewDetail, TeoriaFogo, TravelSafetyGuide, UtensiliosDomesticos, UtensiliosReviews

**Emergency (13):** EmergenciaPet, EmergenciaRapida, EncerrarSituacao, KitEmergencia, KitPrimeirosSocorros, KitRemedios, KitsHub, ModoSituacaoAtiva, PlanoIncendio, PrimeirosSocorros, PrimeirosSocorrosEmergencia, SOSEmergencyMode, UrgentContacts

**Checklists (11):** AreasExternas, AreasInternas, Checklist, ChecklistDetail, ChecklistReforma, ChecklistReport, ChecklistVisit, KitsMenu, OndeProteger, Relatorios, SafetyActionPlan

**Pets (6):** AvesSeguras, PetFoodSafety, PetPregnancy, PetPregnancyGuide, PetWellness, PetsMenu

**Travel (6):** FazendoAsMalas, InspecaoChegada, InspecaoPartida, InspecaoRetorno, KitViagem, TravelModeScreen

**Profiles (5):** AddPerfil, HomeXRay, PerfilWizard, ProfileRiskSummary, QuemProteger

**Health (5):** MedicationDoseHistory, MedicationReminderForm, MedicationReminders, MinhaSaude, SaudePet

**Safety (4):** EscolaSegura, EscolaSeguraReport, VistoriaAsilo, VistoriaAsiloReport

**Tools (3):** AmbienteRisco, DataHealth, MapaDeRiscos

**VisitFlow (2):** VisitRiskForm, VisitType · **Engajamento (2):** RadarArticle, RadarVigilaro · **RenovationFlow (1):** RenovationType

### Código morto: não encontrado

Nenhuma tela órfã. As 11 sem rota direta são legítimas: `CustomSplashScreen` (renderizada por `App.js:465`), `MenuScreenNeo` (importada com apelido `MenuScreen` em `MainTabNavigator.js:13`), `SOSCountdownScreen` (rota em `App.js:632`) e os 8 arquivos de `screens/NewHomeWizard/` (subcomponentes de `NewHomeWizardScreenNeo.js`).

`EngasgoScreen` não existe mais. O conteúdo de primeiros socorros vive em `PrimeirosSocorrosScreen.js` e `PrimeirosSocorrosEmergenciaScreen.js`.

---

## 3. O que o app faz

| Módulo | Evidência |
|---|---|
| Vistoria por ambiente (245 itens, 28 áreas), score e pendências | `ChecklistService`, `ScoreService`, `data/mapeamento_dados.js` |
| Mapa de riscos por dados declarados (não por vistoria) | `RiscoService`, `RiskInterpreterService`, `screens/Tools/MapaDeRiscosScreen.js` |
| Perfis de família e pets, multi-residência, vínculo por casa | `ProfileService`, `screens/Profiles/` |
| Nível de proteção (5 estados) no avatar, chip e cards | `ScoreService.getNivelProtecao`, `components/GlassProfileRing.js` |
| Lembretes de medicação e histórico de doses | `MedicationReminderService`, `screens/Health/` |
| Saúde da família e dos pets | `HealthService`, `MinhaSaudeScreen`, `SaudePetScreen` |
| Pets: bem-estar, gravidez, alimentação, aves | `screens/Pets/` |
| Modo viagem com inspeções de partida, chegada e retorno | `TravelReportService`, `screens/Travel/` |
| Escola Segura e Vistoria de Asilo, com relatório | `screens/Safety/`, `SafetyReportService` |
| InfoRótulos: leitura de rótulos com motor de regras | `InfoRotulosRuleEngine`, `InfoRotulosSubstanceService`, `inforotulos_cache` |
| Scanner de ambiente e de produto por foto | `VisionService`, `ScannerScreen`, `ProdutoScannerScreen` |
| SOS, botão de pânico, contatos urgentes, plano de incêndio | `PanicButtonService`, `screens/Emergency/` |
| Check-in de bem-estar ("vital check") | `VitalCheckService` |
| Sentinela e Radar Vigilaro | `SentinelaService`, `RadarVigilaroService`, `screens/Engajamento/` |
| Gamificação: XP, conquistas, linha do tempo | `GamificationService`, `AchievementService`, `TimelineService` |
| Assinatura e limites por plano (free/premium) | `SubscriptionService`, `UsageLimitsService` |
| Notificações proativas e alertas de kit | `ProactiveNotificationService`, `KitAlertService`, `NotificationService` |
| Acessibilidade: detecção de mão dominante, reduce motion, alto contraste | `HandednessDetector`, `contexts/AccessibilityContext.js`, `utils/DesignSystem2026.js` |
| 4 idiomas | `locales/{pt-BR,pt-PT,en,es}` |
| Relatórios em PDF | `utils/pdfReport.js`, `SafetyReportService`, `TravelReportService` |
| Migração de dados legados | `LegacyMigrationService`, `ProfileService.migrateProfilesV2` |

---

## 4. O que sai do aparelho — seção crítica

O app é **local-first**: não há banco em nuvem, conta de usuário nem login. Os dados vivem no aparelho, com o que é sensível em armazenamento criptografado (`utils/SecureStorage.js`, que roteia chaves de PII e saúde para o `expo-secure-store`).

Quatro caminhos, e só quatro, levam dados para fora:

**1. IA (OpenAI), via proxy próprio.** Acionada por recursos opcionais: scanner de ambiente, scanner de produto, assistente e voz.
- *Sai:* a foto que o usuário submete, em base64 (`VisionService.js:131`), e um contexto do lar **anonimizado**.
- *Não sai:* nomes. A minimização é explícita em `OpenAIService.js:118-125` — o contexto é montado como "PERFIL DO LAR (anonimizado — não há nomes)", com papel e idade ("criança, 4 anos") no lugar da identidade. Condições de saúde vão desvinculadas de identidade.
- *Caminho:* `Config.VIGILARO_PROXY_URL` → `backend-proxy/server.js` → OpenAI. As chaves de provedor ficam só no servidor.

**2. SMS/WhatsApp do cuidador remoto (Zenvia ou Twilio), via proxy.** Só quando o usuário configura um lembrete remoto.
- *Sai:* telefone do destinatário, nome do cuidador, nome do destinatário e nome do medicamento (`backend-proxy/server.js`, rota `/api/notify/medication-reminder`).
- É o único caminho em que **nome e telefone saem do aparelho**, e por ação explícita do usuário.

**3. Consulta de substâncias (EPA CompTox), via proxy.** Sai o nome ou identificador da substância consultada. Nenhum dado pessoal (`InfoRotulosSubstanceService.js`).

**4. Telemetria de erro (Sentry).** Ligada apenas se houver DSN configurado, e desligada em desenvolvimento.
- *Sai:* tipo do erro, pilha de execução, rota, versão do app.
- *Não sai:* nome, telefone, e-mail, nascimento, condição de saúde, medicamento, foto, token. Tudo passa por redação em `services/SentryService.js` antes do envio: por nome de campo, por padrão (e-mail, telefone, CPF, tokens) e pelos nomes da própria família, que o `ProfileContext` registra em memória. Identidade do dispositivo é removida; captura de tela e hierarquia de telas ficam desligadas; se a redação falhar, o evento é descartado em vez de enviado.

**Analytics: nada sai hoje.** O `AnalyticsService.js` **não tem chamada de rede** — é instrumentação local, preparada para Firebase/Amplitude mas não integrada. Além disso é **opt-in explícito**: `consentGranted` começa `false` e nenhum evento é registrado sem consentimento (`AnalyticsService.js:17-20, 126-131`).

**Botão de pânico: não envia nada silenciosamente.** Grava áudio ambiente **no aparelho** e **abre o compositor de SMS**, que exige confirmação do usuário (`PanicButtonService.js:185-221`). Não há envio automático em segundo plano.

**"Vital check" é check-in de vida, não sinal vital.** Não lê batimento, pressão nem oxigenação. São notificações periódicas; se a janela expira sem resposta, o serviço chama `onEscalate({ reason })` e **a UI decide a rota** — o serviço nunca navega sozinho (`VitalCheckService.js:1-10`).

---

## 5. O que o app não faz

- Não tem conta, login nem sincronização em nuvem. Trocar de aparelho não leva os dados junto.
- Não mede sinais vitais.
- Não chama emergência sozinho, nem envia SMS sem confirmação.
- Não compartilha dados entre usuários (não existe backend de dados compartilhado).
- Não rastreia localização em segundo plano. Localização é usada em SOS e recursos de segurança, em primeiro plano.
- Não faz analytics comportamental hoje (o serviço existe, mas não envia).
- Não substitui serviço médico, laudo técnico ou serviço oficial de emergência.
- Não roda no Expo Go: depende de módulos nativos (`react-native-purchases`, `@sentry/react-native`). O teste é por development build.

---

## 6. Pontos incertos

- **[incerto]** `SentinelaService` e `RadarVigilaroService`: confirmados como existentes e com telas próprias, mas o papel de produto de cada um não foi lido em profundidade nesta passada.
- **[incerto]** Cobertura real do `RiskInterpreterService` sobre os 245 itens — há registro anterior de incompatibilidade de chaves que deixaria ~70% dos itens sem implicação associada.
- **[incerto]** Quais telas de Educação são premium e quais são livres; a regra está espalhada entre `SubscriptionService` e as telas.

---

## 7. Números para a comunicação pública

A landing page publica **"224 itens em 16 ambientes"** e **"8 categorias"**. Registros antigos falavam em 19 ambientes e 6 categorias. Nenhum dos dois confere com o código.

| Onde | Publicado | Real | Correção |
|---|---|---|---|
| Itens de checklist | 224 | **245** | atualizar |
| Ambientes | 16 | **25** (ou "28 áreas", contando kits, escola e asilo) | atualizar |
| Categorias | 8 | **5 categorias de risco + preparação** | atualizar |

Sugestão de frase fiel ao código: *"245 pontos de verificação em 25 ambientes da casa, organizados em 5 categorias de risco."*

O arquivo da landing page não está neste repositório — a correção precisa ser feita onde ela é publicada.
