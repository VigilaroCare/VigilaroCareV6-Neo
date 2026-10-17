# Formulários das lojas — respostas prontas

Vigilaro Care V6 Neo · levantado no código em 17/10/2026 · revisar a cada versão que mude o que sai do aparelho.

Este documento é a **fonte única** das respostas. O manifesto de privacidade da Apple (`app.json` → `ios.privacyManifests`) e a Política de Privacidade dizem o mesmo; `npm run validate:legal` confere parte disso.

---

## 0. Antes de abrir os consoles — bloqueios

| # | Bloqueio | Situação | O que fazer |
|---|---|---|---|
| B1 | **URL pública da Política** — exigida pelas duas lojas | O domínio `www.vigilarocare.ia.br` respondia **404 em todas as páginas** | Publicar a pasta `site-legal/` no domínio (gerada por `node scripts/gerar_paginas_legais.js`, mesmo texto do app, 4 idiomas). As URLs que o app já usa passam a funcionar: `/politica-de-privacidade/` e `/termos-de-uso/` |
| B2 | **Links de Termos e Política na tela de assinatura** — Apple 3.1.2 | Apontam para as mesmas URLs (404) | Resolve junto com B1 |
| B3 | **Representante na UE** (RGPD art. 27) | Sem definição | Até decidir: **não liberar** o app em Portugal, Espanha e demais países da UE/EEE (Play: Países/regiões; App Store: Disponibilidade). Brasil, EUA e México não dependem disso |
| B4 | **Status de comerciante (DSA, UE)** — App Store pede para distribuir na UE | Depende de B3 | Mesmo encaminhamento de B3 |

---

## 1. O que sai do aparelho (inventário)

Tudo o que não está nesta tabela **fica só no aparelho** (perfis, nomes, contatos de emergência, ficha médica, lembretes, fotos de perfil, endereço). Nada é vendido, nada é usado para publicidade, não há rastreamento entre apps, não há login nem conta.

| Dado | Para onde | Quando | Vínculo com a pessoa | Evidência |
|---|---|---|---|---|
| Faixa etária do perfil, tipo de casa, ambientes, cidade/estado, resultado da vistoria | OpenAI (EUA), via servidor do Vigilaro (não guarda) | Só na análise personalizada por IA, **com permissão explícita** | Não — sai sem nome (token `{{NOME}}`) | `services/OpenAIService.js` (`generateConsultativeReport`), `services/ConsentimentoIAService.js` |
| Foto escolhida | OpenAI | Só no Scanner, **com permissão explícita** | Não | `services/VisionService.js`, `screens/ScannerScreen.js` |
| Idades dos viajantes, tipo de viagem | OpenAI | Resumo do dossiê de viagem, com permissão | Não | `generateTravelBriefing` |

**Dados de saúde não saem do aparelho.** Condições, medicamentos, alergias, tipo sanguíneo, gestação e deficiência ficam no celular. A decisão do autor, em 17/10/2026, é que o app informa e não opina, e `npm run validate:legal` falha se algum desses dados voltar a ir para a IA. A ficha médica do SOS só sai se a própria pessoa a compartilhar, pelo app de mensagens.
| Código de barras / nome de substância | Open Food Facts, Open Beauty Facts, Open Products Facts, UPCitemdb, PubChem, EPA CompTox | Consultas do Scanner de código e do Info Rótulos | Não — só o código ou o nome | `services/InfoRotulosSubstanceService.js` |
| Histórico de compra + ID anônimo da instalação | RevenueCat | Ao assinar/validar o Premium | Não — ID anônimo, sem e-mail | `services/SubscriptionService.js` (sem `logIn`) |
| Relatórios de falha, desempenho, ID aleatório da instalação | Sentry | Quando há erro | Não — `sendDefaultPii: false` + limpeza de nomes, telefones, endereços e saúde | `services/SentryService.js` |

**Não sai do aparelho:**
- **Localização precisa.** O SOS a coloca na mensagem que a própria pessoa envia, pelo app de SMS ou WhatsApp, aos contatos que ela escolheu. A identificação do país também acontece no aparelho, e dela só o código do país é guardado.
- **Áudio.** O app não usa o microfone, e a permissão está bloqueada.
- **Contatos da agenda.** O app não lê a agenda.
- **Mensagens e arquivos.** Nada é enviado.
- **Lembrete ao cuidador remoto.** Está desligado no app (`CUIDADOR_REMOTO_DISPONIVEL = false`).

Retenção nos terceiros:
- **OpenAI:** até 30 dias, só para prevenir abuso; não usa os dados para treinar modelos.
- **Sentry:** conforme o plano (padrão 90 dias).
- **RevenueCat:** enquanto houver assinatura; pode ser apagado a pedido.

---

## 2. Google Play Console → Conteúdo do app

### 2.1 Política de Privacidade
`https://www.vigilarocare.ia.br/politica-de-privacidade/` *(depois de B1)*

### 2.2 Anúncios
**Não**, o app não contém anúncios.

### 2.3 Acesso ao app
**"Todas ou algumas funcionalidades são restritas"**. Sugestão de texto para a equipe de revisão:
> Não há login. Todas as funções básicas abrem sem conta. As funções Premium exigem assinatura pelo Google Play; o fluxo de compra pode ser testado pelo próprio Google Play. As análises por inteligência artificial pedem uma permissão explícita na primeira vez que são usadas.

### 2.4 Classificação de conteúdo (questionário IARC)
- **Categoria sugerida:** "Referência, notícias ou educação" (o app é guia de prevenção).
- **Violência, sexo, linguagem, drogas e jogos de azar:** Não.
- **"Usuários interagem ou trocam conteúdo entre si":** Não.
- **"O app compartilha a localização física atual do usuário com outros usuários":** Não. O SOS a coloca numa mensagem que a pessoa envia pelo próprio app de SMS/WhatsApp, para contatos dela, que não são usuários do app.
- **"Compras digitais":** Sim (assinatura).

### 2.5 Público-alvo
**18 anos ou mais.** A política declara: "feito para adultos responsáveis; a criança não usa o app". Não marcar faixas infantis, porque isso aciona a Política para Famílias. A ficha da loja não deve ter arte ou linguagem voltada a crianças.

### 2.6 Seção Segurança dos dados

**Coleta e compartilhamento**
- O app coleta ou compartilha algum dos tipos de dados obrigatórios? **Sim**.
- Todos os dados coletados são criptografados em trânsito? **Sim** (HTTPS em todas as chamadas).
- Você oferece uma forma de os usuários solicitarem a exclusão dos dados? **Sim**. No app, **Menu → Resetar App** apaga tudo do aparelho; para dados nos prestadores, o pedido vai a contato@vigilarocare.ia.br.

**Tipos de dados.** "Compartilhado: Não" em todos: os destinatários são prestadores que tratam os dados em nome do Vigilaro, o que é exceção prevista pelo Google.

| Categoria → tipo | Coletado | Efêmero? | Obrigatório ou opcional | Finalidades |
|---|---|---|---|---|
| Local → **Local aproximado** | Sim | Não (OpenAI retém até 30 dias) | **Opcional** | Funcionalidade do app |
| Informações pessoais → **Outras informações** (faixa etária, tipo de casa) | Sim | Não | Opcional | Funcionalidade do app |
| Fotos e vídeos → **Fotos** | Sim | Não | Opcional | Funcionalidade do app |
| Informações financeiras → **Histórico de compras** | Sim | Não | Opcional (só quem assina) | Funcionalidade do app; Análise |
| Atividade no app → **Histórico de pesquisa no app** (código de barras, substância) | Sim | Não | Opcional | Funcionalidade do app |
| Informações e desempenho do app → **Registros de falhas** | Sim | Não | **Obrigatório** (não há como desligar) | Análise; Funcionalidade do app |
| Informações e desempenho do app → **Diagnóstico** | Sim | Não | Obrigatório | Análise; Funcionalidade do app |
| Dispositivo ou outros IDs → **ID aleatório da instalação** (Sentry, RevenueCat) | Sim | Não | Obrigatório | Análise; Funcionalidade do app |

**Não marcar:**
- Local preciso.
- Nome, e-mail, IDs de usuário, endereço, telefone.
- **Saúde e fitness** (informações de saúde e de fitness): ficam no aparelho.
- Raça/etnia, convicções, orientação sexual, outras informações sensíveis.
- Mensagens, áudio, vídeos, arquivos, agenda.
- Contatos, navegação na web, apps instalados, informações de fitness.

> Por que "Local aproximado" e não "Local preciso": o que sai é a **cidade/estado da casa** (texto que a pessoa digitou), na análise por IA. A posição do GPS nunca é transmitida pelo app.

### 2.7 Declaração de apps de saúde
O app **tem recursos de saúde e não é dispositivo médico**. Recursos a descrever:
- lembretes de medicamentos (notificações locais);
- ficha médica pessoal (alergias, condições, tipo sanguíneo), guardada no aparelho;
- guias de primeiros socorros;
- SOS de emergência.

Marque no formulário as opções equivalentes a "gestão de medicamentos/tratamento", "registros de saúde pessoais" e "primeiros socorros/emergência". Os nomes exatos das opções mudam: **conferir na tela do formulário**. Em "o app é dispositivo médico regulado?", responder **Não**. O app informa e organiza, sem diagnosticar nem prescrever, e tem aviso médico obrigatório na abertura.

### 2.8 Outras declarações
| Declaração | Resposta |
|---|---|
| Recursos financeiros | Não |
| App governamental | Não |
| App de notícias | Não |
| Permissões restritas (SMS, registro de chamadas, localização em 2º plano, todos os arquivos) | Nenhuma: o SOS abre o app de SMS do sistema, sem `SEND_SMS` |
| Serviço em primeiro plano | Nenhum em uso (permissões bloqueadas). Se o console perguntar pelos serviços declarados pela biblioteca de áudio: "não usados". |
| Programa de Segurança para Famílias | Não (público 18+) |

---

## 3. App Store Connect

### 3.1 URLs
- **Política de Privacidade:** `https://www.vigilarocare.ia.br/politica-de-privacidade/` *(depois de B1)*.
- **Termos de Uso (EULA):** `https://www.vigilarocare.ia.br/termos-de-uso/`. Colocar também na descrição do app, porque a Apple exige o link dos Termos para apps com assinatura (3.1.2).
- **Escolhas de privacidade (opcional):** a mesma URL da política. No app: Menu → Privacidade → Suas escolhas.

### 3.2 Privacidade do app ("rótulos")
- **Dados usados para rastrear você:** nenhum.
- **Dados vinculados a você:** nenhum (não há conta, e tudo sai sem nome).
- **Dados não vinculados a você:**

| Tipo da Apple | Finalidade |
|---|---|
| Localização → **Localização aproximada** | Funcionalidade do app |
| Conteúdo do usuário → **Fotos ou vídeos** | Funcionalidade do app |
| Compras → **Histórico de compras** | Funcionalidade do app; Análise |
| **Histórico de pesquisa** | Funcionalidade do app |
| Diagnóstico → **Dados de falhas**, **Dados de desempenho**, **Outros dados de diagnóstico** | Funcionalidade do app |
| **Outros tipos de dados** (faixa etária, tipo de casa, ambientes) | Funcionalidade do app |

**Saúde e condicionamento: não marcar.** O app guarda dados de saúde só no aparelho; pela Apple, isso não é "coleta".

Isso é exatamente o `ios.privacyManifests` do `app.json`. Se um mudar, o outro muda junto.

### 3.3 Classificação etária (questionário)
- **Informações médicas ou de tratamento:** **Frequente**. Há conteúdo de primeiros socorros e medicamentos em todo o app. Espere uma classificação acima de 4+.
- **Violência, conteúdo sexual, palavrões, jogos de azar, drogas:** nenhum.
- **Conteúdo gerado por usuários / comunicação entre usuários:** não.
- **Navegação web irrestrita:** não. Os links externos abrem no navegador do sistema.

### 3.4 Conformidade de exportação
Já declarado no `app.json` (`ITSAppUsesNonExemptEncryption: false`). O app usa só HTTPS e o Keychain do sistema, que são criptografia isenta, e a pergunta não aparece a cada build.

### 3.5 Notas para a revisão (App Review Information)
> Não há login. A localização serve para: (1) enviar onde a pessoa está quando ela aciona o SOS — a mensagem é enviada pelo app de SMS/WhatsApp do próprio usuário, com confirmação; (2) identificar, no aparelho, o país, para mostrar o número de emergência correto (opt-in, desligável em Privacidade → Suas escolhas). As análises por inteligência artificial (OpenAI) pedem permissão explícita antes do primeiro envio, conforme a diretriz 5.1.2(i), e são revogáveis no mesmo lugar. O app não usa microfone, sensores de movimento, Face ID nem localização em segundo plano. O botão SOS não liga automaticamente para serviços de emergência.

### 3.6 Diretrizes que o app já atende (para referência)

| Diretriz | Como |
|---|---|
| 5.1.1 — permissões só do que usa, texto claro | Câmera, fotos e localização em uso, com textos traduzidos nos 4 idiomas (`locales/ios/`). Microfone, movimento, Face ID e "sempre" removidos |
| 5.1.2(i) — IA de terceiro com permissão explícita | `ConsentimentoIAService` (trava central nos serviços de IA) |
| 3.1.2 — assinatura | Tela com preço, período, Termos e Política (links válidos depois de B1) |
| 1.4.1 — apps de saúde | Aviso médico obrigatório na abertura; sem diagnóstico |
| Manifesto de privacidade (APIs de motivo obrigatório) | `ios.privacyManifests` com os motivos declarados pelas próprias bibliotecas |
| Exclusão de conta | Não se aplica (sem conta). Menu → Resetar App apaga tudo |

---

## 4. Quando mudar algo no app

Atualizar **os quatro juntos** sempre que mudar o que sai do aparelho:
1. este documento;
2. `app.json` → `ios.privacyManifests`;
3. a Política de Privacidade (`data/legal/politica_privacidade.js`), seguida de `node scripts/gerar_paginas_legais.js` e da republicação de `site-legal/`;
4. os formulários nos dois consoles.

`npm run validate:legal` falha se:
- uma permissão sem uso voltar;
- a IA perder a trava de consentimento;
- o manifesto perder um tipo coletado;
- as páginas públicas ficarem diferentes do texto do app.
