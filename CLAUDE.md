# DIRETRIZES DE REVISÃO: VIGILARO CARE (PREVENÇÃO INTELIGENTE)

## PREMISSAS CRÍTICAS (LEIA ANTES DE REVISAR)
1. IGNORE regras cosméticas, estilo de escrita, quebras de linha ou padrões de lint. Não faça comentários sobre isso.
2. Foco total em CORRETUDE LÓGICA, SEGURANÇA DE DADOS e REGRAS DE NEGÓCIO DE SAÚDE DOMICILIAR.

## PILAR 1: VULNERABILIDADES E SEGURANÇA
- **Privacidade (LGPD/HIPAA):** Dados de saúde de idosos, crianças e prontuários do "Minha Saúde" devem ser criptografados ou tratados de forma estritamente segura. Logs nunca devem expor dados sensíveis.
- **Mecanismos de Emergência:** A lógica que envolve o botão "SOS" ou alertas críticos não pode conter caminhos de código assíncronos que possam travar ou falhar silenciosamente (silenced errors).
- **Entradas de Usuário:** Qualquer entrada nos módulos "Scanner Ambiente" ou "Info Rótulos" deve ser sanitizada para evitar injeções ou falhas de parse de imagem/texto.

## PILAR 2: REGRAS DE NEGÓCIO (PREVENÇÃO DE ACIDENTES)
- **Cálculo de Risco:** A lógica que atualiza a porcentagem de "ATENÇÃO NECESSÁRIA" (ex: 61% na tela) baseada nos ambientes (Cozinha, Quarto do Idoso) deve ser determinística e atualizar o estado global corretamente.
- **Faixas Etárias e Perfis:** Modificações nas regras de recomendação para perfis específicos (Idosos, Pets, Crianças) devem manter a consistência com as ações diárias do assistente de proteção.
- **Modo Viagem / Atividades:** Garanta que a transição de modos de monitoramento mude os gatilhos de notificação sem deixar o app em estado inconsistente.

## PILAR 3: PADRÕES CANÔNICOS (evitar duplicação entre sessões/ferramentas de IA)
Este projeto já foi tocado por múltiplas ferramentas de IA (Claude, Codex, Gemini) em sessões diferentes, o que gerou implementações paralelas do mesmo conceito. Antes de criar uma solução nova, verifique se já existe um caminho canônico:

- **Vínculo perfil ↔ residência:** use sempre `ProfileService.setProfileResidenceRelationship(perfilId, relationship, residenceId)`. Não escreva diretamente em `moradia.habitantes[]`/`frequentadores[]` — isso já foi feito de forma duplicada e inconsistente em `AddPerfilScreenNeo` (patch manual) vs `QuemProtegerScreenNeo` (usa a função corretamente).
- **Padrão visual de telas internas (2º/3º nível):** ver `ANATOMIA_EDITORIAL_VIGILARO.md` — é a fonte canônica única. Antes de copiar o bloco de "hero com imagem" de outra tela, confira lá se esse padrão ainda é o alvo ou se está em `§9 Estado do rollout` como dívida pendente de migração.
- **Classificação de risco:** `data/categoriasRisco.js` é a fonte única (5 categorias + preparação). Não crie enums de risco paralelos nem reclassifique `tags` na tela. Conteúdo novo em `mapeamento_dados.js` classifica sozinho pelas `tags`; tag nova exige entrada em `TAG_CATEGORIA` (rode `auditarTaxonomia()` em DEV para achar órfãs).
- **Mapa de riscos ≠ vistoria.** `RiscoService` analisa **dados declarados** (moradia + moradores) e não lê estado de checklist — é diagnóstico, existe antes de qualquer vistoria. A vistoria é verificação e tem tela própria. Não volte a derivar "risco" de `failedItems`: duas gerações da tela já fizeram isso e mediam progresso de preenchimento, não risco. A atribuição de causa ("por que este ponto se aplica, e a quem") é delegada ao `ProfileFilterEngine` via `isItemRelevant(item, [], moradia)` e `isItemRelevant(item, [pessoa], moradia)` — nunca reimplemente as regras de tag, elas sairiam de sincronia.
- **Faixa/limiar de score:** sempre `ScoreService.getBanda(score)`. Nenhuma tela declara limiar próprio.
- Ao encontrar uma segunda implementação de algo que já existe, prefira consolidar na versão que segue o padrão documentado em vez de criar uma terceira.
