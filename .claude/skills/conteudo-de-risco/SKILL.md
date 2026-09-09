---
name: conteudo-de-risco
description: Procedimento para criar ou alterar conteúdo de risco/prevenção do Vigilaro Care — itens de mapeamento, categorias, textos de checklist, copy educativo e qualquer string que o usuário lê. Use ao mexer em data/*.js, locales/**/common.json ou ao escrever enunciados de risco. Cobre a fonte canônica do conteúdo, a classificação por tags, a tradução obrigatória nos 4 locales e os validadores que precisam passar antes de considerar a tarefa pronta.
---

# Conteúdo de risco e prevenção

Este projeto já foi tocado por várias ferramentas de IA em sessões separadas. O
custo disso não foi código feio — foi conteúdo entrando pela metade: item novo
sem categoria, texto só em pt-BR, enunciado escrito como pergunta de vistoria
num lugar que precisava de afirmação de risco. Este procedimento existe para
fechar esses três buracos.

## 1. De onde vem o texto

`guia-completo-prevencao.md` (raiz do repo) é a fonte canônica do copy
educativo e de risco. É material autoral do dono do projeto, não conteúdo
genérico de segurança — quando houver conflito entre o que o guia diz e o que
parece "boa prática geral", o guia vence.

Antes de escrever um texto novo do zero, procure no guia se o assunto já está
coberto e reaproveite a formulação dele.

**Atenção:** o guia está hoje fora do controle de versão (`*.md` no
`.gitignore`). Ele existe na máquina local, mas não viaja num clone limpo.

## 2. Classificação — nunca crie um enum de risco paralelo

`data/categoriasRisco.js` é a **fonte única** de classificação (5 categorias +
preparação). O fluxo correto:

- Item novo em `data/mapeamento_dados.js` **se classifica sozinho** pelas suas
  `tags`. Você não escreve categoria à mão no item.
- Tag nova exige entrada correspondente em `TAG_CATEGORIA`. Sem ela, o item cai
  silenciosamente no residual `acidente` — parece funcionar e está errado.
- Depois de adicionar tags, rode `auditarTaxonomia()` em `__DEV__` (já é
  chamado por `services/RiscoService.js`) e confirme que a lista de órfãs veio
  vazia.
- Faixa/limiar de score é sempre `ScoreService.getBanda(score)`. Nenhuma tela
  declara limiar próprio.

**Armadilha de nome:** existem `data/categoriasRisco.js` e
`data/RiskCategories.js`. Não são duplicatas e não devem ser unificados:

| arquivo | o que é | quem consome |
|---|---|---|
| `categoriasRisco.js` | taxonomia de classificação (tags → categoria, severidade) | `RiscoService` |
| `RiskCategories.js` | catálogo de conteúdo localizado, via Proxy i18next | `ModoPreventivoScreenNeo` |

Se você precisa classificar, é `categoriasRisco.js`. Se precisa listar conteúdo
por idioma, é `RiskCategories.js`.

## 3. Risco declarado ≠ vistoria

`RiscoService` analisa **dados declarados** (moradia + moradores). Ele não lê
estado de checklist e não deriva risco de `failedItems` — duas gerações da tela
já fizeram isso e acabaram medindo progresso de preenchimento.

Consequência para o texto: no Mapa de Riscos o enunciado é uma **afirmação de
risco** ("Panelas com cabo virado para fora do fogão alcançam a altura de uma
criança"), não uma pergunta de vistoria ("Os cabos das panelas estão virados
para dentro?"). A vistoria tem tela própria e usa a forma interrogativa.

A atribuição de causa ("por que este ponto se aplica, e a quem") é delegada ao
`ProfileFilterEngine` via `isItemRelevant(item, [], moradia)` e
`isItemRelevant(item, [pessoa], moradia)`. Não reimplemente as regras de tag.

## 4. Tradução na mesma passada — e são TRÊS sistemas de i18n

Conteúdo novo sai traduzido nos **4 idiomas** (`pt-BR`, `pt-PT`, `en`, `es`) no
mesmo commit. Deixar `en`/`es` "para uma passada de i18n depois" já criou dívida
grande aqui e foi corrigido explicitamente pelo dono do projeto.

O que engana: o texto do app mora em três lugares com convenções diferentes.
Identifique qual é o seu **antes** de escrever.

| onde | o que guarda | como se traduz | como se lê |
|---|---|---|---|
| `locales/<id>/common.json` | strings de interface (rótulos, botões, títulos) | arquivo por idioma | `t('chave')` |
| `data/locales/<id>/*.js` | catálogos de conteúdo (artigos, guias, primeiros socorros) | 8 arquivos espelhados nos 4 idiomas | Proxy em `data/RiskCategories.js` lê `i18next.language` |
| `data/*.js` (ex. `mapeamento_dados.js`) | itens de risco, plantas, animais | **sufixo inline** no mesmo objeto | `t_field(obj, 'campo')` |

### A convenção de sufixo inline

```js
{ titulo: 'Panela com cabo para fora',      // base pt-BR
  titulo_en: 'Pot handle turned outward',
  titulo_es: 'Mango de olla hacia afuera',
  titulo_ptpt: '...' }                      // opcional — cai para pt-BR
```

`_ptpt` só vale a pena quando o português europeu diverge de verdade; a maioria
dos itens de `mapeamento_dados.js` omite e usa o fallback.

### Ler sempre por `t_field()` — não é só tradução

`utils/getLocalizedField.js` não escolhe só o idioma: toda saída passa por
`resolveEmergencyTokensDeep`, que troca `{{EMERGENCY_MEDICAL}}`,
`{{EMERGENCY_NUMBER}}` e `{{POISON_CONTROL}}` pelo número real do país do
usuário.

Acessar `obj.titulo` direto em vez de `t_field(obj, 'titulo')` num texto que
contenha esses tokens entrega ao usuário o literal `{{EMERGENCY_NUMBER}}` numa
tela de emergência. É bug de segurança, não de tradução. Escrever os campos
traduzidos e esquecer de ligar o `t_field` já aconteceu — faça as duas coisas
na mesma passada.

## 5. Verificação antes de dar a tarefa por pronta

```bash
npm run validate:locales
```

Bloqueia em: chave presente num locale e ausente noutro, mojibake (UTF-8 mal
decodificado), valor vazio/placeholder, acento faltando em pt-BR. Sai com
código 0 quando passa; linhas marcadas com `?` são avisos, não bloqueio.

**Cuidado — esse validador só cobre o primeiro dos três sistemas.** Ele lê
`locales/` e mais nada. Passar nele não prova que `data/locales/` ou os sufixos
`_en`/`_es` foram preenchidos. Para esses dois, a conferência é manual: mesma
lista de arquivos nos 4 idiomas, e todo campo de texto novo com seus sufixos.

Se o conteúdo contém tokens de emergência:

```bash
npm run validate:emergency
```

Se a mudança tocou ícones, paleta, imagens ou tokens de emergência, rode
também o pacote completo:

```bash
npm run validate
```

## 6. Pasta nova de assets

Ao criar pasta nova sob `assets/`, confira `git status --ignored` antes de
confiar que ela entrou. O `.gitignore` deste repo funciona por whitelist e já
deixou assets de fora duas vezes — o app roda local e o EAS Build na nuvem
quebra por não achar os arquivos de `require()` estático.
