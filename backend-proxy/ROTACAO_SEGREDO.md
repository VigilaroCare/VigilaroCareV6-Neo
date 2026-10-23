# Rotação do segredo do proxy (pendência A1)

Runbook para o Agnaldo executar. Preparado em 23/10/2026.

Trata da pendência **A1** do [docs/PENDENCIAS.md](../docs/PENDENCIAS.md). Leia a
seção 1 antes de executar: ela muda o que a tarefa é.

---

## 1. O que foi verificado hoje, e como reconferir

Tudo abaixo foi confirmado em 23/10/2026, não inferido. Os comandos estão aqui
para você repetir quando quiser.

### 1.1 O arquivo vazado é público e continua baixável

```bash
# repositório: 200 anônimo = público
curl -s -o /dev/null -w "%{http_code}\n" https://api.github.com/repos/VigilaroCare/VigilaroCareV6-Neo

# o commit do vazamento: 200 anônimo = ainda servido pelo GitHub
curl -s -o /dev/null -w "%{http_code}\n" https://api.github.com/repos/VigilaroCare/VigilaroCareV6-Neo/commits/c5f2a71
```

O commit `c5f2a71` ("Add files via upload") traz um `.env` de 9 linhas, 363
bytes, com uma linha `VIGILARO_APP_SECRET=` preenchida. O arquivo responde
**200 anônimo** em `raw.githubusercontent.com` nesse SHA.

**O detalhe que engana:** `c5f2a71` **não é ancestral de nenhum ramo**. Nem
`origin/main`, nem `master`, nem o ramo de trabalho:

```bash
git merge-base --is-ancestor c5f2a71 origin/main && echo alcancavel || echo "nao alcancavel"
git branch -a --contains c5f2a71   # vazio
```

Um clone novo **não** traz esse commit. Isso é irrelevante para o risco: o
GitHub continua servindo commits órfãos por SHA, o repositório é público, e o
SHA aparece no histórico de eventos push da conta — que é público e é
justamente o que os rastreadores de segredo varrem. Não trate "não está em
nenhum ramo" como "não está exposto".

### 1.2 Trate TODAS as variáveis daquele arquivo como queimadas

Não tentei enumerar o conteúdo do arquivo, de propósito — e você também não
precisa. Arquivo de ambiente vazado não se audita linha por linha para salvar
uma credencial: **rotaciona-se tudo que estava nele.** Pelo `.env.example` da
época, o conjunto candidato é:

- `OPENAI_API_KEY` — **a mais caras das três**: é crédito consumível;
- `ELEVEN_API_KEY`, `EPA_CTX_API_KEY`;
- `VIGILARO_PROXY_TOKEN` e `VIGILARO_APP_SECRET`;
- `ZENVIA_TOKEN`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, se já estavam lá.

Se alguma dessas nunca teve valor real, ótimo — rotacionar à toa custa minutos.
O inverso custa a conta.

### 1.3 A boa notícia: a janela é hoje, e ela vai fechar

Três fatos verificados que tornam esta rotação barata **agora**:

| Fato | Como conferi | Consequência |
|---|---|---|
| O proxy de produção **não existe** | pendência A8, reconferida em 05/10 | o segredo queimado hoje não protege nada em produção |
| **Não há base instalada** | `version 1.0.2`, `versionCode 3`, slug `vigilaro-care-audit`; lojas e domínio pendentes (A8, D25, G4) | nenhum app antigo para manter funcionando |
| **Não há OTA** | `expo-updates` ausente do `package.json`; sem bloco `updates` nem `runtimeVersion` no `app.json` | depois do lançamento, trocar o token exige **build novo + release nas lojas** |

Juntando: **você não precisa de `VIGILARO_APP_SECRET_PREV` nenhum.** Ele existe
para não derrubar apps já instalados, e não há apps instalados. Depois do
lançamento, sem OTA, a mesma rotação passa a custar um ciclo de revisão de loja
e a exigir manter o token velho válido durante semanas — ou seja, manter o
queimado aceito. Fazer agora é a diferença entre dez minutos e um mês.

---

## 2. A armadilha das duas variáveis

`utils/Config.js` lê o token assim:

```js
VIGILARO_APP_SECRET: process.env.EXPO_PUBLIC_VIGILARO_PROXY_TOKEN ||
    process.env.EXPO_PUBLIC_VIGILARO_APP_SECRET || '',
```

`EXPO_PUBLIC_VIGILARO_PROXY_TOKEN` tem **precedência**. Se você rotacionar só
`..._APP_SECRET` e a `..._PROXY_TOKEN` continuar definida com o valor velho, o
app segue mandando o velho e você vai concluir que a rotação não funcionou.

**Decida uma e elimine a outra.** Recomendo manter apenas
`EXPO_PUBLIC_VIGILARO_PROXY_TOKEN` e apagar
`EXPO_PUBLIC_VIGILARO_APP_SECRET` dos EAS Secrets e do `.env` local.

Lembre também do que o próprio `.env.example` já avisa: `EXPO_PUBLIC_*` é
embutido no bundle. Esse token **não é segredo forte** — é barreira leve. O que
protege a conta OpenAI de verdade é a atestação (B1) mais monitoramento de
gasto. Rotacionar não muda isso; só fecha o valor que está publicado.

---

## 3. Execução

Faça na ordem. Os passos 1 e 2 são os urgentes; o resto pode ser no mesmo dia.

### Passo 1 — Revogar as chaves de fornecedor (antes de qualquer outra coisa)

Estas são as que custam dinheiro. Revogar vem antes de criar as novas.

- [ ] **OpenAI** → platform.openai.com/api-keys: **revogue** a chave antiga,
      crie a nova. Confira o uso dos últimos meses em Usage: consumo que não
      foi seu é o sinal de que a chave foi usada.
- [ ] **ElevenLabs** e **EPA CTX**: revogue e recrie, se existirem.
- [ ] **Zenvia / Twilio**: revogue e recrie, se já tinham valor. Credencial de
      SMS exposta é usada para spam na sua conta.

### Passo 2 — Gerar o token novo do app

```bash
# 32 bytes aleatórios, hex. Rode e copie direto para o destino.
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] Gerar o valor.
- [ ] **Não** colar o valor em chat, em commit, em issue, nem neste arquivo.

### Passo 3 — Vercel (servidor)

Em **Vercel → Settings → Environment Variables**, no projeto do proxy:

- [ ] `VIGILARO_APP_SECRET` = o token novo
- [ ] `OPENAI_API_KEY` = a chave nova
- [ ] demais chaves de fornecedor que você recriou
- [ ] **NÃO** criar `VIGILARO_APP_SECRET_PREV` — ver 1.3. Se ela existir por
      algum motivo, **apague**: ela é exatamente o que mantém o token queimado
      válido.
- [ ] Redeploy (variável de ambiente só vale no deploy seguinte).

O servidor não sobe sem `VIGILARO_APP_SECRET` (`server.js` dá `process.exit(1)`),
então um erro de digitação no nome aparece como falha de boot, não como brecha
silenciosa.

### Passo 4 — EAS Secrets (app)

- [ ] `EXPO_PUBLIC_VIGILARO_PROXY_TOKEN` = o **mesmo** token novo
- [ ] `EXPO_PUBLIC_VIGILARO_APP_SECRET` → **apagar** (ver seção 2)
- [ ] `EXPO_PUBLIC_VIGILARO_PROXY_URL` = a URL real do proxy na Vercel
      (isto é a pendência A8; sem ela, o build de loja quebra IA, scanner,
      Info Rótulos e o SMS do cuidador com erro de rede genérico)

```bash
eas secret:list     # confira os nomes, não os valores
```

### Passo 5 — `.env` locais

- [ ] `backend-proxy/.env` — atualizar com os valores novos
- [ ] `.env` da raiz — atualizar o `EXPO_PUBLIC_VIGILARO_PROXY_TOKEN` e
      remover o `..._APP_SECRET`
- [ ] Conferir que seguem fora do versionamento:

```bash
git check-ignore -v .env backend-proxy/.env   # tem de listar os dois
git ls-files | grep -E '(^|/)\.env$'          # tem de vir VAZIO
```

### Passo 6 — Conferir que funcionou

```bash
# Sem cabeçalho: espera-se 401
curl -i https://SEU-PROJETO.vercel.app/api/openai/chat/completions

# Com o token NOVO: NÃO deve dar 401
curl -i -H "x-vigilaro-token: TOKEN_NOVO" https://SEU-PROJETO.vercel.app/api/attest/nonce

# Com o token VELHO (o do arquivo vazado): TEM de dar 401.
# Este é o teste que prova a rotação. Se não der 401, o _PREV ficou para trás.
curl -i -H "x-vigilaro-token: TOKEN_VELHO" https://SEU-PROJETO.vercel.app/api/attest/nonce
```

- [ ] Os três resultados conferem
- [ ] Build novo (`eas build`) e um teste real de scanner no aparelho

---

## 4. O histórico do git (pendência B4) — precisa da sua decisão

Rotacionar resolve o **dano**: o valor publicado deixa de abrir porta. Não
resolve o **arquivo**, que segue baixável no `c5f2a71`.

Depois do passo 3, o conteúdo daquele arquivo é lixo — e isso já baixa a B4 de
"alta" para "higiene". Três caminhos, em ordem de esforço:

1. **Aceitar e documentar.** Com tudo rotacionado, o arquivo não serve para
   nada. É o caminho que eu recomendaria, visto que o commit nem é alcançável
   por ramo.
2. **Pedir ao GitHub que remova o objeto órfão.** Suporte do GitHub, citando o
   SHA. Eles fazem isso para commits não referenciados. Resolve sem reescrever
   nada.
3. **Reescrever o histórico** (BFG / git-filter-repo) e force-push. É o único
   que mexe no que já está publicado, e também o que pode quebrar clones e
   referências.

**Não vou executar o caminho 3 sem a sua confirmação explícita, caso por caso** —
essa é a regra que você me deu e ela continua valendo. Se decidir por ele, me
diga e eu preparo os comandos e o plano de verificação antes de tocar em nada.

---

## 5. Depois da rotação

- [ ] Atualizar a **A1** no `docs/PENDENCIAS.md`: marcar como resolvida, com a
      data e o que foi rotacionado (sem valores).
- [ ] Reavaliar a **B4** à luz da escolha da seção 4.
- [ ] A **A8** (publicar o proxy) e a **B1** (atestação etapa 2) seguem abertas.
      A atestação é o que de fato protege a conta OpenAI de quem extrair o token
      do APK; a rotação não substitui isso.
