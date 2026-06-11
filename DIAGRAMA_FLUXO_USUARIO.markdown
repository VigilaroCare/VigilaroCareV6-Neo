# Diagrama de fluxo de usuario do aplicativo

Formato: Markdown com blocos Mermaid.

Este documento mapeia os caminhos principais do usuario a partir dos pontos clicaveis do app: cards, botoes de hub, abas, footer global, scanner, relatorios, emergencia, viagem, menu e fluxos derivados.

Escopo analisado no codigo:

- `App.js`
- `navigation/MainTabNavigator.js`
- `components/GlobalFloatingFooter.js`
- `screens/HomeScreenNeo.js`
- `screens/Education/KnowledgeHubScreen.js`
- `screens/Travel/TravelModeScreen.js`
- `screens/MenuScreenNeo.js`
- `screens/InfoRotulosScreen.js`
- `screens/ScannerScreen.js`
- `screens/InfoRotulosResultScreen.js`
- `screens/Checklists/RelatoriosScreenNeo.js`
- `screens/Checklists/OndeProtegerScreen.js`
- `screens/Checklists/ChecklistWizardScreen.js`
- `screens/ModoPreventivoScreenNeo.js`
- `screens/Tools/FerramentasIAScreenNeo.js`
- `screens/Pets/PetsMenuScreen.js`
- `screens/Health/MinhaSaudeScreen.js`

Convencoes:

- Ponto inicial: app aberto.
- Ponto final: tela de resultado, relatorio, checklist concluido, item salvo, chamada externa, email, mapa externo ou retorno para `MainTabs`.
- Setas com texto indicam acao do usuario ou condicao do app.
- Rotas alternativas e erros aparecem como decisoes.

## 1. Entrada do app e navegacao global

```mermaid
flowchart TD
    A["App aberto"] --> B["CustomSplashScreen"]
    B --> C{"Disclaimer medico aceito?"}
    C -- "Nao" --> D["MedicalDisclaimerModal"]
    D -- "Aceitar" --> C
    C -- "Sim" --> E{"Onboarding completo e ha perfis?"}

    E -- "Nao" --> F["BoasVindas"]
    F -- "Acessibilidade" --> G["AccessibilitySettings"]
    G -- "Voltar" --> F
    F -- "Tocar termos" --> H["Modal de termos"]
    H -- "Rolou ate o fim e aceitou" --> F
    F -- "Iniciar sem aceitar" --> F
    F -- "Iniciar aceito" --> I{"ProfileService confirma onboarding?"}
    I -- "Sim" --> J["MainTabs"]
    I -- "Nao" --> K["NewHomeWizard"]
    I -- "Erro" --> L["MapeamentoRiscos"]
    K -- "Adicionar/editar perfil" --> M["AddPerfil"]
    K -- "Acessar Cockpit" --> J
    L -- "Salvar onboarding" --> J

    E -- "Sim" --> J

    J --> N["Footer global"]
    N -- "Inicio" --> O["HomeTab"]
    N -- "Aprender" --> P["KnowledgeTab"]
    N -- "Viagem" --> Q["TravelModeTab"]
    N -- "Menu" --> R["MenuTab"]
    N -- "SOS toque curto" --> S["SOSEmergencyMode"]
    N -- "SOS segurar 1s" --> T["EmergenciaRapida"]

    S -- "Segurar SOS SMS 1.5s" --> U["SOSCountdown"]
    S -- "Primeiros socorros" --> V["PrimeirosSocorrosEmergencia"]
    S -- "Chamar servico externo" --> W["Telefone/geo externo"]
    S -- "Sair SOS" --> J
    T -- "Escolhe tipo de emergencia" --> X["Protocolo de 3 passos"]
    X -- "SAMU/Bombeiros" --> W
    X -- "Voltar" --> T

    Y["FallDetectionService ou VitalCheckService"] -- "Evento critico" --> U
    U -- "Cancelar/voltar" --> J
```

## 2. Home: cards, decisoes e pontos finais

```mermaid
flowchart TD
    H["HomeTab / HomeScreenNeo"] --> A["Seletor de moradia"]
    A --> A1["Modal Minhas residencias"]
    A1 -- "Escolher residencia" --> H
    A1 -- "Cadastrar nova moradia" --> A2{"Nome informado?"}
    A2 -- "Nao" --> A1
    A2 -- "Sim" --> A3["Moradia criada"]
    A3 -- "Depois" --> H
    A3 -- "Configurar agora" --> MAP["OndeProteger"]

    H --> B["Card do perfil"]
    B --> BP["QuemProteger"]
    BP -- "Sem pessoa central" --> BP1["AddPerfil humano"]
    BP -- "Perfil incompleto" --> BP2["AddPerfil com perfil"]
    BP -- "Pessoa cadastrada" --> BP3["Seleciona perfil central"]
    BP -- "Ver leitura personalizada" --> BP4["ProfileRiskSummary"]
    BP -- "Raio-X da casa" --> BP5["HomeXRay"]
    BP -- "Refazer onboarding da casa" --> BP6["NewHomeWizard"]
    BP -- "Continuar" --> MT["MainTabs"]

    H --> C{"Hero principal: estado do app"}
    C -- "Sem conexao" --> C1["Primario: Relatorios"]
    C -- "Sem conexao" --> C2["Secundario: QuemProteger"]
    C -- "Bateria critica" --> C3["Relatorios ou ModoPreventivo"]
    C -- "Sem briefing" --> C4["OndeProteger ou QuemProteger"]
    C -- "Mapeamento em andamento" --> C5["Proxima etapa do briefing ou Relatorios"]
    C -- "Medicacao vencida" --> C6["MedicationScheduler ou MinhaSaude"]
    C -- "Score alto" --> C7["Relatorios ou QuemProteger"]
    C -- "Score medio" --> C8["Relatorios ou ModoPreventivo"]
    C -- "Score baixo" --> C9["SafetyActionPlan ou QuemProteger"]

    H --> D["Grid Acesso rapido"]
    D -- "Briefing vivo" --> MAP
    D -- "Plano de cuidado" --> RPT["Relatorios"]
    D -- "Tarefa eventual" --> EVT["AddEvent"]
    D -- "Scanner com contexto" --> IR["InfoRotulos"]

    EVT --> EVT1{"Tipo de evento"}
    EVT1 -- "Tratamento continuo" --> EVT2["AddTreatment"]
    EVT1 -- "Consulta" --> EVT3["AddAppointment"]
    EVT1 -- "Exame" --> EVT4["AddExam"]
    EVT1 -- "Procedimento" --> EVT5["AddProcedure"]
    EVT2 --> EVTF["Salvar ou voltar"]
    EVT3 --> EVTF
    EVT4 --> EVTF
    EVT5 --> EVTF

    H --> E["Card Briefing vivo"]
    E --> MAP

    H --> F{"Orientacao diaria"}
    F -- "Saude pendente" --> C6
    F -- "Briefing ausente" --> MAP
    F -- "Pendencias no plano" --> PLAN["SafetyActionPlan"]
    F -- "Ha pets" --> PETS["PetsMenu"]
    F -- "Sem pendencia critica" --> RPT

    H --> G{"Acoes acompanhaveis"}
    G -- "Mapeamento incompleto" --> MAP
    G -- "Pendencias" --> PLAN
    G -- "Saude pendente" --> C6
    G -- "Avulsa" --> EVT

    H --> I["Monitor da casa"]
    I -- "Expandir/recolher" --> H
    I -- "Status muda" --> C

    H --> J["Ferramentas inteligentes"]
    J -- "Vigilaro IA" --> CHAT["AITextChat"]
    J -- "Centro de IA" --> TOOLS["FerramentasIA"]
```

## 3. Fluxo de mapeamento, checklists e relatorios

```mermaid
flowchart TD
    MAP["OndeProteger"] --> A{"Ha ambientes mapeados?"}
    A -- "Nao" --> B["Card: Iniciar mapeamento da casa"]
    B --> MR["MapeamentoRiscos"]
    A -- "Nao" --> C["Card: Cadastrar outra moradia"]
    C --> C1{"Confirmou criar?"}
    C1 -- "Nao" --> MAP
    C1 -- "Sim" --> MR

    A -- "Sim" --> D["Cards de ambientes prioritarios"]
    A -- "Sim" --> E["Grid ambientes ativos"]
    D --> AI["AreasInternas"]
    E --> AI

    MAP --> F["Inventario inteligente"]
    F --> HM["HazardMapping"]
    MAP --> G["Ajustar ambientes mapeados"]
    G --> MR
    MAP --> H["Adicionar outra moradia"]
    H --> MR
    MAP --> I["Footer: Refinar mapa"]
    I --> MR

    AI -- "Abrir inventario do ambiente" --> HM
    AI -- "Guia do ambiente" --> EG["EnvironmentGuideNeo"]
    EG -- "Mapear checklist do ambiente" --> AI
    EG -- "Inventario de riscos" --> HM
    HM -- "Concluir/voltar" --> MAP
    MR -- "Salvar fora do onboarding" --> MAP
    MR -- "Salvar no onboarding" --> MT["MainTabs"]

    RPT["Relatorios"] --> R1["Card Relatorio personalizado"]
    R1 --> R1M["Modal de detalhes"]
    R1M -- "Exportar PDF" --> PDF["SafetyReportService.generatePDFReport"]
    RPT --> R2["Historico de melhorias"]
    R2 --> HMEL["HistoricoMelhoras"]
    RPT --> R3["Grid de ambientes"]
    R3 --> CD["ChecklistDetail"]
    RPT --> R4{"Ha pendencias?"}
    R4 -- "Sim: card consolidado" --> PLAN["SafetyActionPlan"]
    R4 -- "Sim: item especifico" --> CD
    R4 -- "Nao" --> OK["Estado tudo seguro"]
    RPT --> R5["Escola Segura"]
    R5 --> ES["EscolaSegura"]
    ES -- "Gerar/ver relatorio" --> ESR["EscolaSeguraReport"]
    RPT --> R6["Asilo Seguro"]
    R6 --> AS["VistoriaAsilo"]
    AS -- "Gerar/ver relatorio" --> ASR["VistoriaAsiloReport"]
    RPT --> R7{"Cadastro incompleto?"}
    R7 -- "Sim" --> BP["QuemProteger"]
    R7 -- "Nao" --> RPT

    CW["Checklist"] --> CW1{"Escolha do usuario"}
    CW1 -- "Vistoria completa" --> CD
    CW1 -- "Comodo especifico" --> CWS["Lista de ambientes"]
    CWS --> CD
    CW1 -- "Voltar dashboard" --> MT
    CD --> CD1{"Ha proximo ambiente sequencial?"}
    CD1 -- "Sim" --> CD
    CD1 -- "Nao" --> CW
```

## 4. InfoRotulos, scanner e resultado

```mermaid
flowchart TD
    IR["InfoRotulos"] --> A["Botao Escanear Codigo de Barras"]
    IR --> B["Busca livre"]
    IR --> C["Cards guiados: limpeza, cosmeticos, pilhas, infantis"]
    IR --> D["Historico"]
    IR --> E["Botao CIATOX"]

    E --> EXT["Telefone externo CIATOX"]
    A --> SC["Scanner mode barcode_scan"]
    B -- "Digitou e ha resultado local" --> LOCAL["Lista de resultados locais"]
    LOCAL -- "Selecionar item" --> RES["InfoRotulosResult"]
    B -- "Enviar busca vazia" --> IR
    B -- "Busca ampliada" --> B1{"Substancia encontrada?"}
    B1 -- "Nao" --> ALERT1["Alerta: substancia nao encontrada"]
    ALERT1 --> IR
    B1 -- "Sim" --> RES
    C -- "Atalho preenche termo" --> B
    D -- "Historico selecionado" --> D1{"Base retorna substancia?"}
    D1 -- "Sim" --> RES
    D1 -- "Nao" --> RES

    SC --> P{"Permissao de camera concedida?"}
    P -- "Nao" --> PG["PermissionGate"]
    PG -- "Solicitar permissao" --> P
    P -- "Sim" --> CAM["Camera"]
    CAM --> BR{"Codigo lido"}
    BR -- "URL/link" --> LS["Troca para mode label_scan"]
    BR -- "Produto encontrado" --> RES
    BR -- "Produto nao encontrado" --> LS
    BR -- "Erro de busca" --> ALERT2["Alerta: falha ao buscar produto"]
    ALERT2 --> CAM
    LS --> PHOTO["Fotografar rotulo"]

    IR2["Scanner sem modo inicial"] --> MODE{"Usuario escolhe modo"}
    MODE -- "Ambiente" --> ENV["mode environment"]
    MODE -- "Rotulo" --> PHOTO
    MODE -- "Codigo de barras" --> SC
    ENV --> PHOTO

    PHOTO --> PX{"Proxy/backend acessivel?"}
    PX -- "Nao" --> ALERT3["Alerta: servidor indisponivel"]
    ALERT3 --> CAM
    PX -- "Sim" --> AN["Analise de imagem"]
    AN --> AN1{"Resultado da analise"}
    AN1 -- "Sucesso" --> INLINE["Resultado inline do Scanner"]
    AN1 -- "Timeout/rede/erro" --> ALERT4["Alerta e nova tentativa"]
    ALERT4 --> CAM
    INLINE -- "Nova leitura" --> CAM
    INLINE -- "Trocar modo" --> IR2

    RES --> R1["Risco, fonte, alertas e acoes"]
    RES --> R2["Primeiros socorros e prevencao"]
    RES --> R3["CIATOX"]
    RES --> R4["Analisar com IA"]
    RES --> R5["Nova consulta"]
    R3 --> EXT
    R4 --> PHOTO
    R5 --> IR
```

## 5. Ferramentas IA

```mermaid
flowchart TD
    TOOLS["FerramentasIA"] --> A["Captura: Centro de leitura preventiva"]
    A --> IR["InfoRotulos"]
    TOOLS --> B["Resposta: Vigilaro Voice"]
    B --> VOICE["AssistentePrevencaoIA"]
    VOICE --> VC["ConversationalAgent"]
    VOICE --> TXT["AITextChat"]
    TOOLS --> C["Resposta: Vigilaro Chat"]
    C --> TXT
    TOOLS --> D["Confianca: Historico de leituras"]
    D --> HIST["HistoricoAuditoria"]
    HIST --> END["Consulta historica / voltar"]
```

## 6. Aprender: trilhas e cards

```mermaid
flowchart TD
    KH["KnowledgeTab / KnowledgeHub"] --> H1["Hero: Micro Blog"]
    H1 --> MB["MicroBlog"]
    MB -- "Seleciona artigo" --> MA["MicroArticle"]
    KH --> H2["Hero: Radar Vigilaro"]
    H2 --> RV["RadarVigilaro"]
    RV -- "Seleciona caso/artigo" --> RA["RadarArticle"]

    KH --> S1["Destaque: Metodologia"]
    S1 --> ISM["IntroSafetyMenu"]
    ISM -- "Seleciona conceito" --> CD["ConceitoDetail"]
    KH --> S2["Destaque: Primeiros Socorros"]
    S2 --> PS["PrimeirosSocorros"]
    KH --> S3["Destaque: Pets"]
    S3 --> PETS["PetsMenu"]

    KH --> F["Fundacao: Metodologia"]
    F --> ISM

    KH --> C["Contextos"]
    C -- "Ambientes" --> EE["EducationEnvironments"]
    EE -- "Seleciona ambiente" --> EGN["EnvironmentGuideNeo"]
    EGN -- "Checklist do ambiente" --> AI["AreasInternas"]
    EGN -- "Inventario" --> HM["HazardMapping"]
    C -- "Pets" --> PETS
    C -- "Seguranca por idade" --> FVM["FasesVidaMenu"]
    FVM -- "Seleciona fase" --> CD
    C -- "Gestante segura" --> GC1["GenericCategory gestante_segura"]
    C -- "Guia de brinquedos" --> GC2["GenericCategory brinquedos"]
    GC1 -- "Seleciona conteudo" --> CD
    GC2 -- "Seleciona conteudo" --> CD

    KH --> R["Analises"]
    R -- "Utensilios" --> UR["UtensiliosReviews"]
    R -- "Eletrodomesticos" --> ER["EletrodomesticosReviews"]
    R -- "Dispositivos eletronicos" --> DR["DispositivosEletronicosReviews"]
    UR -- "Seleciona item" --> SRD["SafetyReviewDetail"]
    ER -- "Seleciona item" --> SRD
    DR -- "Seleciona item" --> SRD

    KH --> EM["Emergencias"]
    EM -- "Prevencao incendio" --> GCF["GenericCategory fire_prevention"]
    EM -- "Planos de fuga" --> PI["PlanoIncendio"]
    EM -- "Primeiros socorros" --> PS
    EM -- "Guia de kits" --> GKE["GuiaKitsEmergencia"]
    GKE -- "Abrir conteudo" --> CD
    GKE -- "Montar este kit" --> KM["KitsMenu"]
    KM -- "Seleciona checklist de kit" --> CKD["ChecklistDetail"]

    KH --> G["Guias praticos"]
    G -- "Plantas toxicas" --> PT["PlantasToxicas"]
    G -- "Animais peconhentos" --> AP["AnimaisPeconhentos"]
    G -- "Produtos perigosos" --> PP["ProdutosPerigosos"]
    G -- "Riscos fisicos" --> RF["RiscosFisicos"]
    G -- "Jardinagem segura" --> JS["JardinagemSegura"]
    G -- "Condominio" --> GCC["GenericCategory condominio_seguranca"]
    PT -- "Seleciona planta" --> CD
    AP -- "Seleciona animal" --> CD
    PP -- "Seleciona produto" --> CD
    RF -- "Seleciona risco" --> CD
    GCC -- "Seleciona conteudo" --> CD

    KH --> M["Mobilidade"]
    M -- "Lazer e ferias" --> LFM["LazerFeriasMenu"]
    LFM -- "Lazer" --> SL["SegurancaLazer"]
    LFM -- "Ferias" --> SF["SegurancaFerias"]
    LFM -- "Mobilidade" --> MS["MobilidadeSegura"]
    M -- "EPIs e ferramentas" --> FT["FerramentasTrabalho"]
    FT -- "EPI domestico" --> EPI["EpiDomestico"]
    FT -- "Acessorios de seguranca" --> ACS["AcessoriosSeguranca"]
```

## 7. Pets

```mermaid
flowchart TD
    P["PetsMenu"] --> A["Prenhez"]
    A --> PG["PetPregnancyGuide"]
    P --> B["Filhotes"]
    B --> AG1["AgeGroupDetail"]
    P --> C["Adultos"]
    C --> AG2["AgeGroupDetail"]
    P --> D["Aves"]
    D --> AV["AvesSeguras"]
    AV -- "Alimentos para aves" --> PFS["PetFoodSafety"]
    P --> E["Wellness"]
    E --> PW["PetWellness"]
    P --> F["Pequenos mamiferos"]
    F --> AG3["AgeGroupDetail"]
    P --> G["Peixes"]
    G --> AG4["AgeGroupDetail"]
    P --> H["Alimentos"]
    H --> PFS
    P --> I["Socorros"]
    I --> PSE["PrimeirosSocorrosEmergencia"]
    P --> J["Guia de socorros pet"]
    J --> PS["PrimeirosSocorros"]
    P --> K["Kit pet checklist"]
    K --> GKE["GuiaKitsEmergencia"]
```

## 8. Viagem

```mermaid
flowchart TD
    T["TravelModeTab / TravelModeScreen"] --> A{"Existe @active_trip?"}
    A -- "Nao" --> B["Tela de configuracao"]
    B --> C["Selecionar tipo de destino"]
    B --> D["Selecionar proposito"]
    B --> E["Selecionar alcance nacional/internacional"]
    B --> F["Marcar companhia: criancas, pets, idosos, PCD"]
    B --> G["Ativar Modo Viagem"]
    G --> H{"Destino escolhido?"}
    H -- "Nao" --> I["Alerta: selecione o destino"]
    I --> B
    H -- "Sim" --> J["Salva @active_trip"]
    J --> K["Dashboard de viagem ativo"]

    A -- "Sim" --> K
    K --> K1["Verificacoes antes de partir"]
    K1 --> IP["InspecaoPartida"]
    K --> K2["Saindo de viagem"]
    K2 --> FM["FazendoAsMalas"]
    K --> K3["Verificacoes no destino"]
    K3 --> IC["InspecaoChegada"]
    K --> K4["Checkout seguro"]
    K4 --> IR["InspecaoRetorno"]
    K --> K5["Guia de seguranca"]
    K5 --> TSG["TravelSafetyGuide"]
    K --> K6["Hospital proximo"]
    K6 --> MAPEXT["Google Maps externo"]
    K --> K7["Guia rapido"]
    K7 --> TSG
    K --> K8["Encerrar viagem"]
    K8 --> L{"Confirmou encerrar?"}
    L -- "Nao" --> K
    L -- "Sim" --> M["Remove @active_trip"]
    M --> B
```

## 9. Menu, configuracoes e suporte

```mermaid
flowchart TD
    M["MenuTab / MenuScreenNeo"] --> A["Acessibilidade"]
    A --> AS["AccessibilitySettings"]
    M --> B["Idioma"]
    B --> BL["Modal de idiomas"]
    BL -- "Seleciona pt-BR, pt-PT, en ou es" --> M
    M --> C["Premium"]
    C --> UP["UpgradePremium"]
    UP -- "Termos" --> TU["TermsOfUse"]
    UP -- "Privacidade" --> PP["PrivacyPolicy"]
    M --> D["Sobre"]
    D --> SO["Sobre"]
    SO -- "Termos" --> TU
    SO -- "Privacidade" --> PP
    M --> E["Termos de Uso"]
    E --> TU
    TU -- "Politica de privacidade" --> PP
    M --> F["Privacidade"]
    F --> PP
    M --> G["Suporte"]
    G --> MAIL["mailto:suporte@vigilaro.com"]
    M --> H["Resetar app"]
    H --> I{"Confirmou reset destrutivo?"}
    I -- "Nao" --> M
    I -- "Sim" --> J{"ProfileService.resetAllData ok?"}
    J -- "Sim" --> BV["BoasVindas"]
    J -- "Nao" --> ERR["Alerta de erro"]
    ERR --> M
```

## 10. Modo preventivo

```mermaid
flowchart TD
    MP["ModoPreventivo"] --> A["Grid RISK_CATEGORIES"]
    A --> B{"Categoria tem action NAVIGATE_SCANNER?"}
    B -- "Sim" --> SC["Scanner mode label_scan"]
    B -- "Nao" --> C["Modal educativo da categoria"]
    C --> D["Iniciar verificacao"]
    D --> E["Perguntas S, N ou NA"]
    E --> F{"Primeira pergunta marcada NA?"}
    F -- "Sim e usuario quer pular ambiente" --> G["Todas respostas NA"]
    F -- "Nao" --> E
    G --> R["Resultado do protocolo"]
    E --> H{"100% respondido?"}
    H -- "Nao" --> I["Alerta: responda todas"]
    I --> E
    H -- "Sim" --> R
    R --> J{"Ha pendencias?"}
    J -- "Nao" --> K["Resultado excelente"]
    J -- "Sim" --> L["Lista de pontos de atencao ordenada por critico"]
    K --> M["Fechar"]
    L --> M
    M --> MP
```

## 11. Minha Saude e agenda

```mermaid
flowchart TD
    MS["MinhaSaude"] --> A{"Aba escolhida"}
    A -- "Medicacoes" --> MED["Lista de medicamentos"]
    A -- "Agenda" --> AG["Lista de eventos"]
    A -- "Dossie" --> DOS["DossierComponent"]

    MED --> M1{"Ha medicamentos?"}
    M1 -- "Nao" --> M2["Adicionar medicacao"]
    M1 -- "Sim" --> M3["Editar, excluir ou confirmar dose"]
    M2 --> SCH["MedicationScheduler"]
    M3 -- "Editar" --> SCH
    M3 -- "Excluir" --> MED
    M3 -- "Confirmar dose" --> DC["DoseConfirmationModal"]
    DC --> MED
    SCH --> S1["Modal de medicamento"]
    S1 -- "Foto do remedio" --> CAM1["Camera/galeria"]
    S1 -- "Foto da receita" --> CAM2["Camera/galeria"]
    S1 -- "Salvar" --> MED

    AG --> A1{"Ha eventos?"}
    A1 -- "Nao ou FAB" --> ADD["AddEvent"]
    A1 -- "Sim: editar evento" --> ADD2{"Tipo"}
    ADD --> ADD2
    ADD2 -- "Tratamento" --> AT["AddTreatment"]
    ADD2 -- "Consulta" --> AA["AddAppointment"]
    ADD2 -- "Exame" --> AE["AddExam"]
    ADD2 -- "Procedimento" --> AP["AddProcedure"]
    AT --> AG
    AA --> AG
    AE --> AG
    AP --> AG
    A1 -- "Marcar tratamento feito" --> AG

    DOS --> D1["Adicionar registro medico"]
    D1 --> AMR["AddMedicalRecord"]
    MS --> SHR["ShareHealthRecord"]
```

## Observacoes de rota

- `KitsHub` possui cards `KitFerramentas` e `KitEPIs`, mas estas rotas nao aparecem declaradas em `App.js`. Se o usuario chegar a `KitsHub` e tocar nesses cards, ha risco de erro de navegacao.
- `MainTabNavigator` declara `AcessibilidadeTab`, mas o footer global nao mostra essa aba diretamente. O acesso visivel fica principalmente pelo Menu e pela tela de boas-vindas.
- `Scanner` em `label_scan` ou `environment` mostra resultado inline dentro do proprio scanner. O resultado `InfoRotulosResult` e usado principalmente para busca, historico e codigo de barras resolvido.
- O footer global e ocultado em rotas de onboarding, camera, IA conversacional, SOS, situacao ativa e premium. Nesses pontos o retorno depende dos botoes internos de cada tela.
