# Pendências — Vigilaro Care V6 Neo

Situação em 21/09/2026, branch `feat/mapa-de-riscos-domesticos`. Tudo que está aqui foi verificado no código ou nos painéis; o que já foi resolvido não aparece.

---

## A. Só o Agnaldo pode fazer (painéis e contas)

| # | Pendência | Por quê | Urgência |
|---|---|---|---|
| A1 | **Rotacionar o `VIGILARO_APP_SECRET`** | O token em uso é o mesmo exposto no histórico público do git (commit `c5f2a71`). Privar o repositório não resolve o que já foi clonado. O suporte a rotação sem derrubar apps antigos já está no `server.js`: novo em `VIGILARO_APP_SECRET`, antigo em `VIGILARO_APP_SECRET_PREV`, e remove o `_PREV` depois do build novo. | Alta |
| A2 | **Tornar o repositório privado** no GitHub | Está público. A integração com a Vercel continua funcionando. | Alta |
| A3 | **Spend cap e alerta de gasto** na Twilio e na OpenAI | É a única rede real contra fraude de SMS e queima de crédito. | Alta |
| A4 | **DSN do Sentry nos EAS Secrets** | Já está no `.env` local, mas os builds não leem o `.env`. Sem isso, release sai sem telemetria. | Média |
| A5 | **Conectar GitHub ao Sentry** (passo `scm-connect`) | Faz o Sentry apontar qual commit provavelmente causou o erro. Adiado por decisão sua. | Baixa |
| A6 | **Credenciais para a atestação de app** | Service account no Google Cloud (Play Integrity) e chave `.p8` da Apple (DeviceCheck). Sem elas, a etapa 2 não anda. Ver `backend-proxy/ATTESTATION.md`. | Média |
| A7 | **Preencher Data Safety (Play) e App Privacy (Apple)** | Precisa declarar o compartilhamento com OpenAI, ElevenLabs, EPA, Zenvia e Twilio. A base está no §4 do Mapa de Funcionalidades. | Média — trava a publicação |

---

## B. Segurança e infraestrutura (código)

| # | Pendência | Situação |
|---|---|---|
| B1 | **Atestação de app, etapa 2** | Etapa 1 pronta no servidor (Play Integrity, nonce, modos off/log/enforce, hoje em `off`). Falta o SDK no cliente, o JWT do DeviceCheck para iOS e rodar em `log` por uma semana antes de ligar o `enforce`. Depende de A6. |
| B2 | **Upgrade do Expo SDK** | 13 vulnerabilidades na raiz, uma de severidade alta (`postcss`, ferramenta de build). Só fecham com upgrade maior de SDK. Agora há a skill oficial `expo-upgrade` para conduzir. |
| B3 | **Novo dev build e teste do Sentry** | O Sentry tem código nativo; o build instalado não o tem. O app funciona, mas o envio de erro só será testável no próximo build. |
| B4 | **Decisão sobre reescrever o histórico do git** | Remover o commit com o token, ou aceitar o risco depois de A1 e A2. Com o token rotacionado, vira baixa urgência. |

---

## C. Qualidade de código (varredura de 21/09)

| # | Pendência | Tamanho |
|---|---|---|
| C1 | **Cor do Design System dentro de `StyleSheet.create` no módulo** | Não derruba o app — prende a tela na paleta clara, então o **modo escuro sai errado**. Rode `node scripts/auditar_tinta_congelada.js` para a lista atual, medida contra a paleta escura. **Feito em 22/09:** as 31 ocorrências renderizadas pela NeoTypography, em 9 telas (o rótulo do Menu media 1,14:1). **Falta:** as 37 em `<Text>` cru, `TextInput` e tags mistas — sem o automatismo da NeoTypography, cada uma pede decisão. Regra: onde a superfície é fixa (creme), a tinta também tem de ser fixa; onde a superfície segue o tema, apague a cor e deixe a NeoTypography resolver — override inline desliga o alto contraste. |
| C2 | ~~24 telas com `useEffect([])` carregando dados~~ **Resolvido em 23/09 — e o número estava errado** | O "24" contava qualquer `useEffect([])`. Carregando **dado**, eram 8; e dessas, 7 são telas empilhadas, que o stack desmonta ao voltar — recarregam sozinhas, não têm como ficar velhas. O caso real era 1: a **aba de Viagem**, que fica montada e mostrava a viagem sem `retornoConcluido` depois da Inspeção de Retorno. Corrigido com `useFocusEffect`. Conferidas também as outras abas (Início e Menu já recarregavam; Educação e Acessibilidade não carregam dado) e as telas-lista (Onde Proteger, Relatórios, Minha Saúde já usavam foco). **Regra:** o risco não é `useEffect([])` em si — é tela que **permanece montada** enquanto outra escreve o mesmo dado. Aba e tela-lista que abre editor, sempre `useFocusEffect`. |
| C3 | **531 cores em hexadecimal fora dos tokens** | Regra global do projeto pede token sempre. |
| C4 | **Ambientes fantasma no mapping** | Diagnosticado antes, não corrigido: gás vira ambiente, `quarto_adulto` sem condicional, navegação guiada da vistoria. |

---

## D. Conteúdo

| # | Pendência | Situação |
|---|---|---|
| D1 | **Revisão dos textos educativos** | 3.942 trechos extraídos para `docs/conteudo-editavel/`. 967 campos explicativos têm menos de 90 caracteres — a lista priorizada está em `_textos-rasos.md`. Aguardando sua revisão. |
| D2 | **Nenhum item de checklist tem dica de segurança** | O código lê `dica_seguranca` em `ChecklistService.js:282`, mas **nenhum dos 245 itens tem esse campo**. Por isso o card de pendências mostra sempre "Verifique: <título>" em vez de uma orientação real. É o "texto raso" mais visível do app. |
| D3 | **Orientação por tag cobre 22 de 73 tags** | `data/tag_guidance.js` deixa 51 tags sem texto, incluindo as mais usadas (`básico`, `crianças`, `idosos`, `prevenção`). |
| D4 | **Os 245 itens ainda são perguntas de vistoria** | Para o Mapa de Riscos, precisam virar enunciados de risco. |
| D5 | **Números da landing page** | Publica "224 itens, 16 ambientes, 8 categorias". O real é **245 itens, 25 ambientes, 5 categorias + preparação**. A landing não está neste repositório. |
| D6 | **Traduções** | Todo texto revisado precisa sair em pt-PT, en e es na mesma passada. |

---

## E. Design

| # | Pendência | Situação |
|---|---|---|
| E1 | **Ícones genéricos ao lado dos pictogramas cerâmicos** | Diagnóstico pronto: o problema são os ícones que representam **conceito** (casa, saúde, pet, pessoas, idoso), não os de função. Plano em três passos: triagem dos 124 nomes, duotone nas cores da marca como ganho rápido, e uma família de mini-cerâmicas para os ~20 conceitos recorrentes. |
| E2 | **Decisão sobre o Figma** | Recomendação: não adotar como pré-requisito. Vale se você for editar design à mão com frequência ou contratar designer. |
| E3 | **Mapa real dos fluxos de navegação** | Extrair do código as 119 rotas e desenhar o grafo, para revisar atritos em cima do que existe de fato. |

---

## G. Conformidade de IA e direitos (avaliação de 22/09)

Parecer completo em [CONFORMIDADE_IA_E_DIREITOS.md](CONFORMIDADE_IA_E_DIREITOS.md).

| # | Pendência | Situação |
|---|---|---|
| G1 | **Procedência das ilustrações** | Encerrado: declaradas como geradas no ChatGPT (OpenAI). Uso comercial permitido pelos termos, sem atribuição obrigatória. A identidade visual, por ser gerada por IA, não é protegível por direito autoral — fato de negócio, sem ação. |
| G2 | **ElevenLabs** | Resolvido: não é usada — a voz vem do TTS nativo. O plano é Free (licença não comercial), então **não ligar** sem assinatura paga. Aviso gravado no `Config.js`. |
| G3 | **Crédito ao Open Food Facts** | Feito: bloco "Créditos e fontes" na tela Sobre, nos 4 idiomas. |
| G4 | **Revisão jurídica antes de publicar** | Opcional, mas recomendada. O parecer serve de insumo. |
| G5 | **Repor volume do Radar** | O feed caiu de ~195 para 35 itens com a remoção do material de terceiros. Repor com conteúdo autoral entra na revisão do guia master. |

---

## F. Já resolvido (não refazer)

Proxy com rate limit, limitador dedicado de SMS, validação de payload, allow-list de rotas e token com comparação constant-time · atestação etapa 1 · Sentry com remoção de dados pessoais · tokens de cor inexistentes no Design System · `SafeGradient` contra crash de gradiente · três telas que quebravam por caminho errado de `severity` · `getFaixaEtaria` e `resolveImageUri` · crash do `scrollToIndex` em Áreas Internas · `npm start` com checagem da porta 8081 · Mapa de Funcionalidades refeito a partir do código · identificação de conteúdo gerado por IA no scanner e nos dois PDFs · remoção do despejo de notícias de terceiros do feed do Radar.
