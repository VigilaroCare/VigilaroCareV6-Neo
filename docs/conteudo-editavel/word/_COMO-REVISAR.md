# Revisão dos textos em Word

Os `.docx` desta pasta são a **mesma coisa** que os `.md` da pasta acima, em formato de tabela para revisar com conforto. Escolha por onde prefere trabalhar; o resultado volta para o código do mesmo jeito.

## Como está organizado

Cada documento é uma tabela de três colunas:

| coluna | o que é | pode editar? |
|---|---|---|
| **ID** | o endereço de volta ao aplicativo (ex.: `ARE-0226`) | **não** |
| **Onde aparece** | de que arquivo e campo o texto veio | **não** |
| **Texto** | o que o usuário lê no app | **sim — é só isto** |

As duas primeiras colunas são como o texto revisado encontra o lugar dele no código. Se um ID sumir, aquele texto vira órfão e precisa ser rastreado à mão.

Fora isso, use o Word à vontade: corretor ortográfico, comentários e **controle de alterações** funcionam normalmente e ajudam bastante — com alterações registradas dá para ver o que mudou sem comparar linha a linha.

## Por onde começar

**`_PRIORIDADE-textos-curtos.docx`** — 967 campos com menos de 90 caracteres. É onde a revisão rende mais: são os textos que hoje aparecem no app como orientação e não orientam nada, do tipo "Ventilar" ou "Usar luvas". Se for revisar só um documento, revise este.

Depois dele, os maiores por volume são `_locales-pt-BR.docx` (527 textos de interface) e `mapeamento_dados.docx` (363, o conteúdo da vistoria).

## Quando terminar

Devolva os arquivos editados e eu aplico de volta no código, conferindo ID por ID. O que for texto de conteúdo sai também em inglês, espanhol e português de Portugal na mesma passada — é regra do projeto, para não abrir dívida de tradução.

## Como estes arquivos são gerados

`node scripts/gerar_conteudo_word.js`, a partir dos `.md` da pasta acima.

Rodar de novo **sobrescreve** tudo e apaga as suas edições. Se precisar regerar depois de já ter revisado algo, guarde uma cópia antes.

O script depende da biblioteca `docx`, que não está nas dependências do projeto (é ferramenta de autoria, não vai no app). Instale sem gravar no `package.json`:

```
npm install --no-save docx
```
