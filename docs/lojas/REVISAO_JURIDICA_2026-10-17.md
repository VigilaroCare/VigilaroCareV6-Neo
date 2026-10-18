# Revisão jurídica — Termos de Uso e Política de Privacidade

**Data:** 17/10/2026
**Escopo:** mudanças de 16–17/10/2026 em Termos, Política, permissões e fluxos de dados do Vigilaro Care V6 Neo, mais o estado geral dos dois documentos.
**Método:** skills `compliance-check` e `legal-risk-assessment` do plugin oficial de Direito da Anthropic ([anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/main/legal), Apache-2.0), aplicadas sobre o código e os textos do repositório.

> **Isto não é aconselhamento jurídico.** É uma triagem técnica para orientar a conversa com um advogado habilitado (direito do consumidor e proteção de dados no Brasil; e, se houver distribuição na UE, em Portugal/Espanha). As normas mudam; confirmar a redação vigente nas fontes oficiais.

---

## Atualização do mesmo dia — "o app informa, não opina"

O autor decidiu que **nenhum dado de saúde sai do aparelho** e que o app **não emite opinião** sobre a pessoa. A análise por IA:
- deixou de receber condições, medicamentos, gestação e deficiência;
- recebe a idade só como faixa etária;
- é proibida, no próprio pedido ao modelo, de comentar doença, remédio, diagnóstico ou tratamento.

O texto offline do relatório também deixou de ligar os medicamentos da pessoa a efeitos no corpo dela. Agora informa, em termos gerais, que a bula indica os efeitos possíveis, encaminha ao médico ou farmacêutico e lista as ações na casa.

**Efeito sobre esta revisão:**

| Item | Antes | Agora |
|---|---|---|
| Req. 3: consentimento destacado para enviar saúde | atendido com a permissão de IA | **não se aplica**: saúde não é enviada |
| Req. 6: transferência de saúde à OpenAI | consentimento art. 33, VIII | só foto, faixa etária e casa, com a mesma permissão |
| Req. 18 / R8: Washington MHMDA | parcial | **risco menor**: dado de saúde não é coletado pela empresa, só guardado no aparelho do usuário |
| Req. 4 / R7: guardar saúde no aparelho | frágil | continua valendo a recomendação, mas com peso menor. Dado que a família guarda no próprio aparelho, para uso particular, tende a ficar fora da LGPD (art. 4º, I). **Confirmar com advogado** |
| Manifesto da Apple / Segurança dos dados | "Saúde" declarada | "Saúde" **retirada** dos dois |

`npm run validate:legal` falha se algum dado de saúde voltar a ir para a IA.

### Termos de Uso reescritos (mesmo dia) — falta só a validação do advogado

Arquivo: `data/legal/termos_uso.js`. É a fonte única: a tela do app e a página pública leem dele, nos 4 idiomas, e o texto está identificado como rascunho para validação. Cobre os requisitos 13 e 14 e o risco R1:

| Seção | O que diz |
|---|---|
| Aceitação e público | 18+; perfis de crianças cadastrados pelo responsável |
| O que o app é e não é | Não diagnostica, não emite parecer, não prescreve |
| Emergência | Números do país onde a pessoa está |
| Inteligência artificial | Opcional, com permissão, sem dado de saúde |
| Alertas | SOS e check-in são auxiliares; o envio do SOS é confirmado pela pessoa |
| Assinatura | Mensal ou anual; cobrança e renovação pela loja; cancelar com 24 h de antecedência; arrependimento de 7 dias (CDC art. 49) |
| Uso adequado | — |
| Propriedade intelectual | — |
| Responsabilidade | Compatível com o CDC |
| Privacidade | Remete à Política |
| Lojas | EULA padrão da Apple e termos do Google Play |
| Alterações | Mudanças relevantes pedem novo aceite |
| Lei e foro | Domicílio do consumidor no Brasil; proteções obrigatórias do país de residência |

Também mudaram:
- a janela de aceite inicial e o resumo da tela de boas-vindas: a cláusula de exoneração saiu, o aceite foi para a versão 2 e é pedido de novo;
- o resumo de privacidade das boas-vindas, que dizia "nada sai do aparelho".

`validate:legal` reprova se a exoneração total voltar.

### Relatórios de falha anônimos e confirmação do responsável (mesmo dia)

**Sentry: requisito 8 e risco R3 resolvidos.** Os relatórios saem sem o ID sorteado na instalação. Foram desligados três caminhos:
- as sessões;
- as falhas nativas, que já aparecem anônimas no Play Console e no Xcode;
- a limpeza passou a cobrir também os eventos de desempenho.

Sem identificador, o relatório deixa de ser dado pessoal, e por isso não há transferência a justificar. `validate:legal` reprova se essas opções voltarem.

**Crianças: requisito 5 e risco R6 resolvidos.** Ao cadastrar um perfil com menos de 18 anos, no assistente ou em Adicionar Perfil, o app exige marcar: "Sou mãe, pai ou responsável legal e autorizo o cadastro destes dados no app". O registro fica no perfil (`consentimentoResponsavel`), e a Política descreve isso nos 4 idiomas.

**Para o advogado validar:**
1. a redação da seção 9 (responsabilidade);
2. o compromisso de atender o arrependimento "pela loja ou pelo nosso contato";
3. a cláusula de lei e foro para quem não reside no Brasil;
4. se convém um EULA próprio para a App Store (hoje: o EULA padrão da Apple mais estes Termos).

---

## Resumo

**Seguir com condições.** As mudanças recentes deixaram o app mais correto, mas sobram **um bloqueio de publicação** e **dois pontos de risco alto** que dependem de decisão ou de advogado:

- 🔴 **Bloqueio:** a Política e os Termos **não têm URL pública**. O domínio respondia 404, e as duas lojas exigem a URL. As páginas já estão geradas em `site-legal/`, falta publicar.
- 🟠 **Termos isentam de "quaisquer danos".** A cláusula é nula perante o CDC (art. 25 e art. 51, I) e precisa de nova redação.
- 🟠 **Distribuição na UE sem representante** (RGPD art. 27). Mitigação: não distribuir na UE até a decisão.

---

## Normas aplicáveis

| Norma | Por que se aplica | O que exige aqui |
|---|---|---|
| **LGPD** (Lei 13.709/2018) | Usuários no Brasil; dados de saúde e de crianças | Base legal; consentimento específico e destacado para dado sensível (art. 11, I) e de criança (art. 14, §1º); transparência (art. 9º); transferência internacional (art. 33); direitos do titular (art. 18) |
| **Res. CD/ANPD nº 2/2022** | Agente de tratamento de pequeno porte | Dispensa de encarregado, **exceto** em tratamento de alto risco. Dado de saúde em escala com IA pode se enquadrar; exige ao menos canal de comunicação |
| **Res. CD/ANPD nº 19/2024** | Envio a OpenAI, Sentry e RevenueCat (EUA) | Cláusulas-padrão da ANPD obrigatórias desde 23/08/2025, ou outra base do art. 33 |
| **CDC** (Lei 8.078/1990) | O app é serviço ao consumidor, com assinatura paga | Informação clara (art. 6º, III; 31); vedação de publicidade enganosa (art. 37); cláusulas abusivas nulas (art. 51); arrependimento em compra a distância (art. 49) |
| **Marco Civil da Internet** (Lei 12.965/2014) | Aplicação de internet | Informação clara sobre coleta e uso (art. 7º, VIII) |
| **RGPD / UK GDPR** | Se distribuído em PT, ES ou GB | Base legal; art. 9 (saúde); art. 13; art. 27 (representante); arts. 28 e 30; art. 35 (DPIA); cap. V (transferências) |
| **Washington My Health My Data Act** | Usuários nos EUA, sem piso de faturamento | Política específica de dados de saúde do consumidor, link na página inicial, consentimento para coletar e para compartilhar |
| **EU AI Act, art. 50** | Conteúdo gerado por IA, se distribuído na UE | Identificar conteúdo gerado por IA |
| **Apple** 5.1.1, 5.1.2(i), 3.1.2, 1.4.1 | Publicação iOS | Permissão só do que usa; permissão explícita para IA de terceiro; links de Termos/Política na assinatura; cuidado em apps de saúde |
| **Google Play** — Dados do usuário, Segurança dos dados, apps de saúde | Publicação Android | Declarações coerentes com o comportamento real; URL da política |

---

## Requisitos

| # | Requisito | Situação | O que falta |
|---|---|---|---|
| 1 | Finalidade nova da localização (país dos números de emergência) informada antes, com opt-in e revogação fácil | ✅ Atendido (D24) | — |
| 2 | Dados pessoais a IA de terceiro só com permissão explícita | ✅ Atendido (17/10) | — Antes era **gerado automaticamente** ao abrir o resumo de riscos, enviando saúde à OpenAI sem pergunta |
| 3 | Consentimento específico e destacado para **enviar** dado de saúde (LGPD art. 11, I; RGPD art. 9(2)(a)) | ✅ Atendido | — |
| 4 | Consentimento para **guardar** dado de saúde no aparelho | ⚠️ Frágil | A política diz que o consentimento é dado "ao preencher esses campos". Pode não ser considerado "destacado". Recomendação: tela única, no primeiro preenchimento de saúde, com aceite explícito |
| 5 | Dados de criança: consentimento específico e em destaque de um dos pais (art. 14, §1º) | ❌ Não atendido | Não há passo de consentimento ao criar perfil de criança. Recomendação: caixa de confirmação "sou o responsável legal e autorizo…" no cadastro de perfil infantil |
| 6 | Transferência internacional — OpenAI | ✅ Consentimento específico e destacado (art. 33, VIII), pedido no app | — |
| 7 | Transferência internacional — RevenueCat | ⚠️ Defensável | Política cita art. 33, IX, c/c art. 7º, V (execução do contrato). **Validar com advogado** |
| 8 | Transferência internacional — Sentry | ❌ Sem base declarada | Opções: (a) aditivo com as cláusulas-padrão da ANPD; (b) tornar o envio anônimo (sem ID de instalação), saindo do conceito de dado pessoal (art. 12) |
| 9 | Contratos de operador/subcontratante (DPA) — OpenAI, Sentry, RevenueCat, **Render** (hospeda o servidor intermediário) | ❓ Desconhecido | Confirmar que foram aceitos/assinados. A política em pt-PT/es **afirma** que há cláusulas contratuais-tipo; precisa ser verdade |
| 10 | Encarregado / canal do titular (LGPD art. 41) | ⚠️ Parcial | Há e-mail de contato. Recomendação: nomear encarregado (pode ser o próprio fundador) e publicar o contato, pelo provável enquadramento como tratamento de alto risco |
| 11 | RIPD / DPIA (LGPD art. 38; RGPD art. 35) | ❌ Não existe | Recomendado: dado de saúde + IA + crianças. Na UE, provavelmente obrigatório |
| 12 | Representante na UE (RGPD art. 27) | ❌ Pendente (sem definição) | Não distribuir na UE até decidir |
| 13 | Termos: limitação de responsabilidade compatível com o CDC | ❌ Não atendido | Ver risco R1 e redação sugerida |
| 14 | Termos: itens de contrato de consumo | ❌ Faltam | Lei e foro; assinatura (renovação, cancelamento, reembolso pelas lojas, art. 49); alteração dos Termos; idade mínima (18+); licença de uso |
| 15 | Termos não prometem recurso inexistente | ✅ Atendido (17/10) | Saíram "detecção de queda" e "monitor de áudio" |
| 16 | Política coerente com o app e com os formulários das lojas | ✅ Atendido (17/10) | Saíram microfone, cuidador remoto ativo e ElevenLabs; entrou o envio à IA com permissão. pt-BR ganhou a seção de transferência internacional |
| 17 | URL pública de Política e Termos | ❌ **Bloqueio** | Publicar `site-legal/` |
| 18 | Washington MHMDA | ⚠️ Parcial | A política em inglês tem a seção "Consumer health data". Recomendado: página própria com o conteúdo exigido pela lei e link na página inicial do site |
| 19 | Conteúdo de IA identificado (AI Act art. 50; lojas) | ✅ Atendido | — |
| 20 | Dispositivo médico (ANVISA RDC 657/2022; MDR) | ✅ Baixo risco | O app informa e organiza, sem diagnóstico; aviso médico na abertura |
| 21 | Coerência de nomes | ⚠️ Menor | A política diz "Resetar Aplicativo"; o Menu diz "Resetar App" |

---

## Riscos (matriz gravidade × probabilidade)

Escala da skill: gravidade 1–5 × probabilidade 1–5.
- 1–4: 🟢 baixo
- 5–9: 🟡 médio
- 10–15: 🟠 alto
- 16–25: 🔴 crítico

| ID | Risco | G | P | Pontos | Nível | Mitigação |
|---|---|---|---|---|---|---|
| R0 | Política e Termos sem URL pública (rejeição nas duas lojas; links da assinatura quebrados) | 4 | 5 | 20 | 🔴 | Publicar `site-legal/` → residual 🟢 |
| R1 | Cláusula "não se responsabilizam por quaisquer danos": nula pelo CDC; atrai PROCON e mina a confiança nos demais avisos | 3 | 4 | 12 | 🟠 | Nova redação (abaixo), validada por advogado |
| R2 | Distribuição na UE sem representante (art. 27) | 4 | 3 | 12 | 🟠 | Não distribuir na UE até decidir → 🟢 |
| R3 | Sentry sem base de transferência internacional | 3 | 2 | 6 | 🟡 | Cláusulas-padrão ANPD ou envio anônimo |
| R4 | DPAs não formalizados com os prestadores | 3 | 3 | 9 | 🟡 | Aceitar/assinar os DPAs (o da OpenAI exige formulário) e guardar cópia |
| R5 | Sem RIPD/DPIA para saúde + IA + crianças | 3 | 3 | 9 | 🟡 | Elaborar RIPD curto (dados, finalidades, riscos, medidas) |
| R6 | Perfil de criança sem consentimento destacado do responsável | 4 | 2 | 8 | 🟡 | Passo de confirmação no cadastro |
| R7 | Consentimento de saúde "ao preencher" pode não ser "destacado" | 3 | 2 | 6 | 🟡 | Aceite explícito no primeiro preenchimento |
| R8 | Washington MHMDA: política própria de dados de saúde | 3 | 2 | 6 | 🟡 | Página própria + link na página inicial |
| R9 | Encarregado não nomeado | 2 | 2 | 4 | 🟢 | Nomear e publicar contato |

**Resolvidos nesta rodada (eram 🔴/🟠):**
- envio de saúde à OpenAI sem permissão, gerado automaticamente;
- permissões declaradas sem uso (microfone, movimento, Face ID, localização "sempre", gravar áudio, atividade física);
- Termos prometendo detecção de queda e monitor de áudio;
- Política descrevendo microfone e cuidador remoto ativos;
- nova finalidade da localização sem ciência;
- trechos em português dentro das políticas em inglês e espanhol.

---

## Redação sugerida — rascunho para o advogado

**Termos, item 4 (Limitação de Responsabilidade).** Substituir:
> "Os desenvolvedores do Vigilaro Care não se responsabilizam por quaisquer danos, lesões ou perdas resultantes do uso das informações fornecidas pelo aplicativo. A segurança final do ambiente e das pessoas é de responsabilidade do usuário."

por:
> "O Vigilaro Care responde pelos danos causados por defeitos do serviço, nos termos do Código de Defesa do Consumidor. O conteúdo tem caráter informativo e preventivo: não substitui profissionais de saúde, serviços de emergência nem a supervisão de um adulto responsável, e as decisões tomadas a partir dele cabem a quem o usa. O app depende de fatores fora do nosso controle — aparelho, bateria, sinal, permissões e serviços de terceiros — e pode falhar."

**Termos, novos itens (esqueleto):**
1. Assinatura: período, renovação automática, cancelamento e reembolso pela loja, direito de arrependimento.
2. Idade mínima: 18 anos; perfis de crianças cadastrados pelo responsável.
3. Licença de uso e propriedade intelectual.
4. Alterações dos Termos, com aviso no app.
5. Lei aplicável e foro: domicílio do consumidor, no Brasil.

---

## Ações recomendadas

1. **Publicar `site-legal/`** no domínio (bloqueio das duas lojas).
2. **Advogado:** revisar os Termos (R1 e itens novos) e validar as bases de transferência (requisitos 7 e 8).
3. **Aceitar/assinar os DPAs** da OpenAI, Sentry, RevenueCat e Render (R4).
4. **Restringir a distribuição** a Brasil, EUA e México até decidir o representante na UE (R2).
5. **Produto:**
   - consentimento destacado do responsável ao criar perfil de criança (R6);
   - aceite explícito no primeiro preenchimento de saúde (R7).
6. **RIPD curto** (R5) e **nomear o encarregado** (R9).
7. **Página de dados de saúde para os EUA** (R8).

## Aprovações necessárias

| Quem | Por quê | Situação |
|---|---|---|
| Agnaldo (controlador) | Países de distribuição; encarregado; aceite dos DPAs | Pendente |
| Advogado (consumidor + dados, Brasil) | Termos (R1, item 14); bases de transferência (7, 8) | Pendente |
| Advogado na UE (se e quando distribuir lá) | Representante, DPIA, textos pt-PT/es | Futuro |

## Revisão especializada recomendada

- **Direito do consumidor:** cláusulas dos Termos e regras da assinatura.
- **Proteção de dados:** RIPD, transferências, DPAs e enquadramento de pequeno porte versus alto risco.
- **EUA:** antes de escalar lá, a aplicabilidade de leis estaduais de dados de saúde (Washington, Nevada) e da CCPA (pisos de faturamento).
