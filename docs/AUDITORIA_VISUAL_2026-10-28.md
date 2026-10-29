# Levantamento visual — a linguagem da Home e as telas internas

**Data:** 28/10/2026 · **Método:** varredura ESTÁTICA do código das 107 telas registradas em `App.js` (`scripts` temporário; marcadores no código). **Não substitui olhar a tela**: ela diz que uma tela TEM banner de foto ou botão de voltar copiado, não diz se ficou bonita. Contas e metodologia na ANATOMIA_EDITORIAL_VIGILARO.md §9.6.

## Resumo

| Geração | Telas | O que é |
|---|---:|---|
| A — linguagem nova | 3 | usa `NeoGlifoCard` (cartão retroiluminado) |
| B — anatomia de junho | 11 | `NeoScreenHeader` fixo, sem banner de foto |
| C — banner de foto | 35 | banner full-bleed com paralaxe (proibido desde junho) |
| D — voltar copiado | 50 | botão de voltar montado à mão, sem `NeoScreenHeader` |
| E — outra | 8 | sem cabeçalho padrão e sem banner |

Total de cores hex soltas nas telas: **563** · telas sem `AppBackground`: **20** · telas com `NeoCard variant="elevated"`: **51**.

## Ondas

| Onda | Telas | Linhas de código |
|---|---:|---:|
| Onda 1 — piloto (feita em 28/10/2026) | 4 | 2457 |
| Onda 2 — as portas dos cards da Home: Vistorias, Atividades, Minha Saúde, Saúde Pet, perfis | 28 | 12988 |
| Onda 3 — Educação | 24 | 7300 |
| Onda 4 — Menu, Viagem, Segurança, ferramentas e o resto | 32 | 11033 |
| Fora da migração — telas de emergência (linguagem própria, ANATOMIA §0) | 13 | 4992 |
| Fora da migração — rotas que nenhuma tela abre (PENDENCIAS E3: decidir apagar antes de migrar) | 6 | 1213 |

> **Atualização de 28/10/2026 (fim do dia):** Minha Saúde, Saúde Pet e Atividades Eventuais (a grade) foram migradas e passam à geração A. Os números do resumo acima são os da varredura inicial e não foram refeitos.

A divisão por onda é por PORTA DE ENTRADA (o que o usuário abre mais cedo), não por facilidade. Onda 2 vem primeiro porque é onde o Agnaldo está: Vistorias, Atividades e Saúde são os cartões da Home.

## Onda 1 — piloto (feita em 28/10/2026)

| Rota | Arquivo | Geração | O que a varredura achou | Linhas |
|---|---|---|---|---:|
| TravelModeScreen | screens/Travel/TravelModeScreen.js | A-nova | banner de foto; voltar copiado | 681 |
| Scanner | screens/ScannerScreen.js | B-anatomia | 17 hex soltos | 592 |
| InfoRotulosResult | screens/InfoRotulosResultScreen.js | A-nova | 6 hex soltos | 737 |
| InfoRotulos | screens/InfoRotulosScreen.js | A-nova | — | 447 |

## Onda 2 — as portas dos cards da Home: Vistorias, Atividades, Minha Saúde, Saúde Pet, perfis

| Rota | Arquivo | Geração | O que a varredura achou | Linhas |
|---|---|---|---|---:|
| AvesSeguras | screens/Pets/AvesSegurasScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 9 hex soltos | 309 |
| PetFoodSafety | screens/Pets/PetFoodSafetyScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 6 hex soltos | 299 |
| PetPregnancyGuide | screens/Pets/PetPregnancyGuideScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 1 hex soltos | 281 |
| PetWellness | screens/Pets/PetWellnessScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 4 hex soltos | 216 |
| PetsMenu | screens/Pets/PetsMenuScreen.js | C-banner | banner de foto; voltar copiado; 12 hex soltos | 449 |
| OndeProteger | screens/Checklists/OndeProtegerScreen.js | D-voltar | voltar copiado; sem AppBackground; 17 hex soltos | 448 |
| MinhaSaude | screens/Health/MinhaSaudeScreen.js | A-nova | **migrada em 28/10/2026** (ANATOMIA §9.7) | 284 |
| SaudePet | screens/Health/SaudePetScreen.js | A-nova | **migrada em 28/10/2026** (ANATOMIA §9.7) | 235 |
| QuemProteger | screens/Profiles/QuemProtegerScreenNeo.js | D-voltar | voltar copiado; 17 hex soltos | 797 |
| AddPerfil | screens/Profiles/AddPerfilScreenNeo.js | D-voltar | voltar copiado; 8 hex soltos | 1466 |
| Relatorios | screens/Checklists/RelatoriosScreenNeo.js | D-voltar | voltar copiado; 15 hex soltos | 907 |
| MedicationReminderForm | screens/Health/MedicationReminderFormScreen.js | D-voltar | voltar copiado; 11 hex soltos | 821 |
| ModoPreventivo | screens/ModoPreventivoScreenNeo.js | A-nova | **grade e modal de verificação migrados em 28/10/2026** (`AuditoriaAtividadeModal`) | 501 |
| HomeXRay | screens/Profiles/HomeXRayScreen.js | D-voltar | voltar copiado; 10 hex soltos | 487 |
| ProfileRiskSummary | screens/Profiles/ProfileRiskSummaryScreen.js | D-voltar | voltar copiado; 2 hex soltos | 1127 |
| AreasInternas | screens/Checklists/AreasInternasScreen.js | D-voltar | voltar copiado; 5 hex soltos | 851 |
| ChecklistDetail | screens/Checklists/ChecklistDetailScreen.js | B-anatomia | 47 hex soltos | 758 |
| MedicationReminders | screens/Health/MedicationRemindersScreen.js | D-voltar | voltar copiado; 6 hex soltos | 560 |
| SafetyActionPlan | screens/Checklists/SafetyActionPlanScreen.js | B-anatomia | 33 hex soltos | 443 |
| MedicationDoseHistory | screens/Health/MedicationDoseHistoryScreen.js | D-voltar | voltar copiado; 5 hex soltos | 346 |
| ChecklistVisit | screens/Checklists/ChecklistVisitScreen.js | A-nova | **migrada em 28/10/2026** (fluxo "Planejar", ANATOMIA §9.7) | 163 |
| ChecklistReforma | screens/Checklists/ChecklistReformaScreen.js | A-nova | **migrada em 28/10/2026** (fluxo "Planejar", ANATOMIA §9.7) | 160 |
| DoseAtrasada | screens/Health/DoseAtrasadaScreen.js | D-voltar | voltar copiado | 150 |
| VisitRiskForm | screens/VisitFlow/VisitRiskFormScreen.js | A-nova | **migrada em 28/10/2026** (fluxo "Planejar", ANATOMIA §9.7) | 121 |
| VisitType | screens/VisitFlow/VisitTypeScreen.js | A-nova | **migrada em 28/10/2026** (fluxo "Planejar", ANATOMIA §9.7) | 112 |
| RenovationType | screens/RenovationFlow/RenovationTypeScreen.js | A-nova | **migrada em 28/10/2026** (fluxo "Planejar", ANATOMIA §9.7) | 100 |
| PerfilWizard | screens/Profiles/PerfilWizardScreen.js | E-outra | — | 31 |
| Checklist | screens/Checklists/ChecklistWizardScreen.js | B-anatomia | 6 hex soltos | 242 |

## Onda 3 — Educação

| Rota | Arquivo | Geração | O que a varredura achou | Linhas |
|---|---|---|---|---:|
| JardinagemSegura | screens/Education/JardinagemSeguraScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 4 hex soltos | 374 |
| PremiumArticle | screens/Education/PremiumArticleScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 7 hex soltos | 374 |
| EnvironmentGuideNeo | screens/Education/EnvironmentGuideNeoScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground | 360 |
| ProdutosPerigosos | screens/Education/ProdutosPerigososScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 5 hex soltos | 223 |
| GuiaKitsEmergencia | screens/Education/GuiaKitsEmergenciaScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground | 199 |
| TeoriaFogo | screens/Education/TeoriaFogoScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 4 hex soltos | 180 |
| TravelSafetyGuide | screens/Education/TravelSafetyGuideScreen.js | C-banner | banner de foto; voltar copiado | 628 |
| SafetyReviewDetail | screens/Education/SafetyReviewDetailScreen.js | C-banner | banner de foto; voltar copiado; 2 hex soltos | 391 |
| UtensiliosReviews | screens/Education/UtensiliosReviewsScreen.js | C-banner | banner de foto; voltar copiado; 7 hex soltos | 382 |
| DispositivosEletronicosReviews | screens/Education/DispositivosEletronicosReviewsScreen.js | C-banner | banner de foto; voltar copiado; 7 hex soltos | 372 |
| EletrodomesticosReviews | screens/Education/EletrodomesticosReviewsScreen.js | C-banner | banner de foto; voltar copiado; 7 hex soltos | 355 |
| DispositivosProtecao | screens/Education/DispositivosProtecaoScreen.js | C-banner | banner de foto; voltar copiado; 7 hex soltos | 323 |
| EducationEnvironments | screens/Education/EducationEnvironmentsScreen.js | C-banner | banner de foto; voltar copiado; 7 hex soltos | 313 |
| FasesVidaMenu | screens/Education/FasesVidaMenuScreen.js | C-banner | banner de foto; voltar copiado; 7 hex soltos | 277 |
| RiscosFisicos | screens/Education/RiscosFisicosScreen.js | C-banner | banner de foto; voltar copiado; 6 hex soltos | 223 |
| LazerFeriasMenu | screens/Education/LazerFeriasMenuScreen.js | C-banner | banner de foto; voltar copiado; 6 hex soltos | 177 |
| CuidarProtegerHub | screens/CuidarProtegerHubScreen.js | C-banner | banner de foto; voltar copiado; 6 hex soltos | 171 |
| NeurodivergenceMenu | screens/Education/NeurodivergenceMenuScreen.js | C-banner | banner de foto; voltar copiado; 3 hex soltos | 159 |
| ConceitoDetail | screens/Education/ConceitoDetailScreen.js | D-voltar | voltar copiado; 5 hex soltos | 513 |
| FerramentasTrabalho | screens/Education/FerramentasTrabalhoScreen.js | D-voltar | voltar copiado; 3 hex soltos | 320 |
| AnimaisPeconhentos | screens/Education/AnimaisPeconhentosScreen.js | D-voltar | voltar copiado; 5 hex soltos | 314 |
| PlantasToxicas | screens/Education/PlantasToxicasScreen.js | D-voltar | voltar copiado; 3 hex soltos | 292 |
| MicroBlog | screens/Education/MicroBlogScreen.js | D-voltar | voltar copiado; 3 hex soltos | 209 |
| MicroArticle | screens/Education/MicroArticleScreen.js | D-voltar | voltar copiado; 6 hex soltos | 171 |

## Onda 4 — Menu, Viagem, Segurança, ferramentas e o resto

| Rota | Arquivo | Geração | O que a varredura achou | Linhas |
|---|---|---|---|---:|
| AgeGroupDetail | screens/AgeGroupDetailScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 3 hex soltos | 377 |
| FazendoAsMalas | screens/Travel/FazendoAsMalasScreen.js | C-banner | banner de foto; voltar copiado | 394 |
| GenericCategory | screens/GenericCategoryScreen.js | C-banner | banner de foto; voltar copiado; 6 hex soltos | 246 |
| InspecaoChegada | screens/Travel/InspecaoChegadaScreen.js | C-banner | banner de foto; voltar copiado; 1 hex soltos | 236 |
| InspecaoRetorno | screens/Travel/InspecaoRetornoScreen.js | C-banner | banner de foto; voltar copiado; 1 hex soltos | 181 |
| InspecaoPartida | screens/Travel/InspecaoPartidaScreen.js | C-banner | banner de foto; voltar copiado; 1 hex soltos | 159 |
| EduContentDetail | screens/EduContentDetailScreen.js | C-banner | banner de foto; voltar copiado; 3 hex soltos | 148 |
| SituacoesTemporarias | screens/SituacoesTemporariasScreen.js | A-nova | **migrada em 28/10/2026.** É aberta pelo cartão "Planejar reforma, visita ou mudança" (Atividades Eventuais) | 110 |
| RadarArticle | screens/Engajamento/RadarArticleScreen.js | D-voltar | voltar copiado; 12 hex soltos | 409 |
| EpiDomestico | screens/EPIDomesticoScreen.js | D-voltar | voltar copiado; 9 hex soltos | 288 |
| MobilidadeSegura | screens/MobilidadeSeguraScreen.js | D-voltar | voltar copiado; 5 hex soltos | 976 |
| VistoriaAsilo | screens/Safety/VistoriaAsiloScreen.js | D-voltar | voltar copiado; 4 hex soltos | 655 |
| EscolaSegura | screens/Safety/EscolaSeguraScreen.js | D-voltar | voltar copiado; 4 hex soltos | 650 |
| NewHomeWizard | screens/NewHomeWizardScreenNeo.js | D-voltar | voltar copiado; 2 hex soltos | 593 |
| SegurancaLazer | screens/SegurancaLazerScreen.js | D-voltar | voltar copiado | 556 |
| RadarVigilaro | screens/Engajamento/RadarVigilaroScreen.js | D-voltar | voltar copiado; 1 hex soltos | 403 |
| VistoriaAsiloReport | screens/Safety/VistoriaAsiloReportScreen.js | D-voltar | voltar copiado | 294 |
| EscolaSeguraReport | screens/Safety/EscolaSeguraReportScreen.js | D-voltar | voltar copiado; 4 hex soltos | 293 |
| PrivacyPolicy | screens/PrivacyPolicyScreen.js | D-voltar | voltar copiado | 189 |
| IntroSafetyMenu | screens/IntroSafetyMenuScreen.js | D-voltar | voltar copiado | 121 |
| TermsOfUse | screens/TermsOfUseScreen.js | D-voltar | voltar copiado | 113 |
| UpgradePremium | screens/UpgradePremiumScreen.js | E-outra | — | 514 |
| AccessibilitySettings | screens/AccessibilitySettingsScreen.js | B-anatomia | 11 hex soltos | 411 |
| WelcomeTour | screens/WelcomeTourScreenNeo.js | E-outra | — | 354 |
| BoasVindas | screens/BoasVindasScreen.js | E-outra | 4 hex soltos | 284 |
| Briefing | screens/SecretBriefingScreen.js | E-outra | 3 hex soltos | 200 |
| SecretBriefing | screens/SecretBriefingScreen.js | E-outra | 3 hex soltos | 200 |
| MapaDeRiscos | screens/Tools/MapaDeRiscosScreen.js | B-anatomia | — | 411 |
| SegurancaFerias | screens/SegurancaFeriasScreen.js | B-anatomia | 3 hex soltos | 409 |
| AmbienteRisco | screens/Tools/AmbienteRiscoScreen.js | B-anatomia | — | 320 |
| Sobre | screens/SobreScreen.js | B-anatomia | — | 298 |
| Contato | screens/ContatoScreen.js | B-anatomia | — | 192 |

## Fora da migração — telas de emergência (linguagem própria, ANATOMIA §0)

| Rota | Arquivo | Geração | O que a varredura achou | Linhas |
|---|---|---|---|---:|
| PrimeirosSocorros | screens/Emergency/PrimeirosSocorrosScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 8 hex soltos | 419 |
| PlanoIncendio | screens/Emergency/PlanoIncendioScreen.js | C-banner | banner de foto; voltar copiado; sem AppBackground; 4 hex soltos | 299 |
| KitsHub | screens/Emergency/KitsHubScreen.js | C-banner | banner de foto; voltar copiado; 8 hex soltos | 268 |
| SOSEmergencyMode | screens/Emergency/SOSEmergencyModeScreenNeo.js | E-outra | sem AppBackground; 36 hex soltos | 643 |
| SOSCountdown | screens/Emergency/SOSCountdownScreen.js | E-outra | sem AppBackground; 16 hex soltos | 510 |
| EmergenciaRapida | screens/Emergency/EmergenciaRapidaScreen.js | D-voltar | voltar copiado; sem AppBackground; 6 hex soltos | 197 |
| KitPrimeirosSocorros | screens/Emergency/KitPrimeirosSocorrosScreen.js | D-voltar | voltar copiado; 8 hex soltos | 335 |
| UrgentContacts | screens/Emergency/ContatosEmergenciaScreen.js | D-voltar | voltar copiado; 4 hex soltos | 875 |
| KitRemedios | screens/Emergency/KitRemediosScreen.js | D-voltar | voltar copiado; 7 hex soltos | 335 |
| KitEmergencia | screens/Emergency/KitEmergenciaScreen.js | D-voltar | voltar copiado; 7 hex soltos | 328 |
| EmergenciaPet | screens/Emergency/EmergenciaPetScreen.js | D-voltar | voltar copiado; 2 hex soltos | 318 |
| ModoSituacaoAtiva | screens/Emergency/ModoSituacaoAtivaScreen.js | D-voltar | voltar copiado; 2 hex soltos | 252 |
| EncerrarSituacao | screens/Emergency/EncerrarSituacaoScreen.js | D-voltar | voltar copiado; 3 hex soltos | 213 |

## Fora da migração — rotas que nenhuma tela abre (PENDENCIAS E3: decidir apagar antes de migrar)

| Rota | Arquivo | Geração | O que a varredura achou | Linhas |
|---|---|---|---|---:|
| EnvironmentGuide | screens/Education/EnvironmentGuideScreen.js | D-voltar | voltar copiado; sem AppBackground; 1 hex soltos | 108 |
| HistoricoAuditoria | screens/HistoricoAuditoriaScreen.js | D-voltar | voltar copiado; sem AppBackground; 2 hex soltos | 43 |
| PetPregnancy | screens/Pets/PetPregnancyScreen.js | D-voltar | voltar copiado | 480 |
| RecentActivity | screens/RecentActivityScreen.js | D-voltar | voltar copiado | 258 |
| KitsMenu | screens/Checklists/KitsMenuScreen.js | D-voltar | voltar copiado; 1 hex soltos | 178 |
| RiscosMenu | screens/Education/RiscosMenuScreen.js | B-anatomia | — | 146 |

