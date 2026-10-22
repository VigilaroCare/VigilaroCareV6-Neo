# Revisão de conteúdo — quatro documentos por tema

Gerado por `scripts/gerar_revisao_conteudo.js`. Regerar: `node scripts/gerar_revisao_conteudo.js`.

| documento | textos | o que tem dentro |
|---|---|---|
| `PS-Primeiros-Socorros.docx` | 167 | O que fazer / o que nunca fazer / quando chamar ajuda, para pessoas e pets, mais o conteúdo do kit |
| `ED-Educacao.docx` | 676 | Central de Conhecimento, micro-blog, Radar, artigos, guias, teoria do fogo, fases da vida |
| `AE-Atividades-Eventuais.docx` | 224 | Férias, viagem, escola, gestação, condomínio, gás, incêndio, brinquedos, obra, visitas, kits |
| `EX-Explicativos.docx` | 658 | Por que um ponto importa: consequência por prazo, como evitar, perfis (neurodivergência, mobilidade, escola, ILP) |

`_manifesto.json` guarda, para cada código, o arquivo de origem, o campo, a linha e o **texto original**. É o que permite transformar o `.docx` devolvido em alteração de código sem adivinhação.

## Por que isto substitui `docs/conteudo-editavel/`

A exportação anterior pegou tudo — 4.519 textos em 52 arquivos, em tabela de três colunas (ID | Onde aparece | Texto). O Agnaldo revisou o formato e disse que ele "mostrou-se trabalhoso": achar os parágrafos que importam no meio de rótulo de botão, nome de ícone e caminho de imagem é garimpo, não revisão.

As escolhas aqui são o oposto:

- **Escopo por tema do app**, não por arquivo de dados. Os cabeçalhos são os nomes que aparecem na navegação.
- **Só prosa.** Campo técnico, URL, caminho de asset e tradução ficam fora. Ele revisa pt-BR; a tradução sai depois, a partir do texto aprovado.
- **Texto corrido**, não célula de tabela.
- **Código de rastreio na mesma linha**, cinza e 7pt: presente para o retorno, recessivo para a leitura.
- **Rótulo de papel do campo** (`O QUE FAZER`, `O QUE NUNCA FAZER`, `QUANDO CHAMAR AJUDA`...). Sem ele o documento mentiria por omissão: em primeiros socorros, uma frase de "o que fazer" parada no campo "o que não fazer" inverte a orientação de emergência, e sem o rótulo não há como verificar isso.

## Lacuna que este escopo corrigiu

A extração original varreu apenas `data/*.js`. Nunca desceu em `data/locales/pt-BR/` nem em `data/kits/`. Resultado: **14 arquivos de conteúdo nunca foram enviados para revisão humana** — incluindo *todo* o primeiros socorros (`primeiros_socorros.js`, 13 KB), os guias de segurança, a base de artigos e o conteúdo educativo dos kits.

É exatamente o material que o Agnaldo pediu para revisar.

## Fora do escopo, de propósito

`data/delay_guidance.js` não entra. É código morto — nenhuma referência fora dele mesmo — resquício da gestão de medicamentos que foi refutada por questão legal. O conteúdo é conduta clínica sobre atraso de dose, justamente o que o app não faz. Deve ser removido, não revisado.

## Como a revisão volta para o código

1. Ele edita o texto por cima, no Word, sem marcar o que mudou.
2. O código cinza no início do parágrafo fica intacto.
3. `REMOVER` no lugar do texto = excluir.
4. Parágrafo novo sem código = inclusão.
5. Comentário do Word = dúvida ou observação para mim.

Na volta, o `.docx` é comparado contra `original` no manifesto; o que mudou vira edição no arquivo e no campo que o manifesto aponta. Texto aprovado entra também em `en`, `es` e `pt-PT`, conforme a regra do projeto — conteúdo não sai só em pt-BR.

## Versões revisadas pelo Agnaldo (como recuperar)

Os documentos PS, ED, AE e EX com as anotações e correções do Agnaldo foram substituídos em
16/10/2026 por versões regeradas a partir do código. As versões revisadas ficam no git, no commit
`7e703b5~1` (= `ffa6a8b`):

    git show 7e703b5~1:docs/revisao-conteudo/PS-Primeiros-Socorros.docx > PS-revisado.docx
    git show 7e703b5~1:docs/revisao-conteudo/ED-Educacao.docx > ED-revisado.docx
    git show 7e703b5~1:docs/revisao-conteudo/AE-Atividades-Eventuais.docx > AE-revisado.docx
    git show 7e703b5~1:docs/revisao-conteudo/EX-Explicativos.docx > EX-revisado.docx

As cópias locais `.anterior-*` foram apagadas depois de conferido que eram idênticas, byte a byte,
a essas versões do git. O que cada revisão mudou está em `_plano-<documento>.json`.

## Trava: nenhum texto chega ao app sem se saber se foi revisado

`scripts/verify_revisao_conteudo.js` (`npm run validate:revisao`, parte do `npm run validate`) varre o app
inteiro — `data/`, `screens/`, `components/` e os textos de 70+ caracteres de `locales/pt-BR/common.json` —
sem depender da lista de temas do gerador. Foi essa lista feita à mão que deixou 986 textos fora das revisões
até a RC, e a tela `PrimeirosSocorrosEmergenciaScreen` inteira sem revisão humana.

Cada texto em pt-BR cai numa de quatro situações:

| situação | de onde vem |
|---|---|
| revisado | está num documento devolvido (texto original do manifesto ou texto novo do `_plano-*`) |
| em revisão | está num documento enviado e ainda não devolvido (manifesto sem `_plano-`, ex.: RS) |
| aprovado | mudou fora de documento com decisão registrada em `_registro-revisao.json` |
| pendente | sabidamente não revisado — backlog, registrado com o motivo |

Texto fora das quatro **faz o validate falhar**, com arquivo, linha e texto. Saídas:

- mandar para revisão e aplicar o retorno (o `_plano-*` passa a contar como revisado);
- se o Agnaldo já aprovou **aquele texto** (ex.: por chat): `--aprovar "o que ele aprovou e quando" <arquivo>`;
- para seguir sem revisão: `--pendente "por que" <arquivo>` — fica visível no backlog.

`--listar` mostra o backlog por motivo e por arquivo; `--limpar` tira do registro texto que saiu do app.

Arquivo cujo texto não chega ao usuário (código morto, tela órfã) fica em `FORA_DO_ESCOPO`, com o sinal que provaria
que voltou a ser usado — se esse sinal aparecer no código, a trava falha.

### RP — Revisão de Pendências

O tema `RP` do gerador não lê arquivos inteiros: lê o backlog da trava, filtrado pelos motivos listados em
`pendentes`. Abaixo de cada texto alterado vai a linha "VERSAO QUE VOCE REVISOU" (o texto revisado mais parecido
do mesmo arquivo); texto escrito depois vai marcado "ESCRITO DEPOIS DA SUA REVISAO". O importador ignora as duas
linhas. Enviado em 21/10/2026 com 202 códigos. Os `_plano-*.json` precisam estar no git: sem eles,
o que já foi revisado volta a aparecer como não revisado.

Registro inicial (21/10/2026): marca REMOVER resolvida, grafia, concordância, tokens de país e replicações
pedidas pelo Agnaldo contaram como aprovadas; a volta ao imperativo dos primeiros socorros e os pontos da
D27 também. Toda reescrita de conteúdo cuja redação final ele não viu ficou **pendente**.
