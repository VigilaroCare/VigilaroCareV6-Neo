# Publicar o proxy e ligar o app nele

Situação em 05/10/2026. O endereço que estava cravado no app como produção — `vigilaro-proxy.onrender.com` — responde **404 com `x-render-routing: no-server`**: não existe serviço nenhum ali. Enquanto isso não for resolvido, um build de loja fica sem IA, sem scanner, sem Info Rótulos e sem o SMS do cuidador.

São duas etapas: publicar o proxy, e dizer ao app onde ele está.

---

## Por que Vercel, e não Render

Não é preferência — é o que o código já é. O `server.js` termina assim:

```js
module.exports = app;                                   // Vercel serverless
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  app.listen(PORT, ...);                                // só fora de produção
}
```

Num host de processo contínuo como o Render, com `NODE_ENV=production`, ele **exporta o app e encerra sem escutar porta nenhuma**. Em serverless isso é o correto: a plataforma importa o app e cuida do resto. O `ATTESTATION.md` também já assume Vercel ("o proxy é serverless (Vercel)").

Se um dia quiser mudar para um host de processo contínuo, é preciso tirar a condição do `app.listen` antes.

---

## Etapa 1 — publicar na Vercel

O `vercel.json` necessário já está neste diretório.

### Pelo painel

1. [vercel.com/new](https://vercel.com/new) → importe o repositório `VigilaroCareV6-Neo`.
2. **Root Directory: `backend-proxy`** ← o passo que mais se esquece. Sem isso a Vercel tenta construir o app React Native.
3. Framework Preset: `Other`. Build Command e Output Directory ficam vazios.
4. Antes do primeiro deploy, cadastre as variáveis de ambiente (próxima seção).
5. Deploy.

### Pelo terminal

```bash
cd backend-proxy
npx vercel --prod
```

Na primeira vez ele pergunta o diretório raiz — responda `.` estando dentro de `backend-proxy`.

### Variáveis de ambiente na Vercel

**Obrigatórias — sem elas o servidor não sobe ou não serve:**

| variável | para quê |
|---|---|
| `VIGILARO_APP_SECRET` | autenticação do app. **O processo aborta sem ela** (`FATAL` no `server.js`). |
| `OPENAI_API_KEY` | IA, scanner e relatórios |

**Conforme o recurso que você usar:**

| variável | para quê |
|---|---|
| `VIGILARO_APP_SECRET_PREV` | só durante a rotação do segredo: aceita o antigo enquanto os apps não atualizam. Remova depois. |
| `EPA_CTX_API_KEY` | consulta de substâncias no Info Rótulos |
| `ELEVEN_API_KEY` | voz — **hoje não deve ser ligada**, ver o aviso de licença em `utils/Config.js` |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | SMS |
| `ZENVIA_TOKEN`, `ZENVIA_FROM_SMS`, `ZENVIA_FROM_WHATSAPP` | alternativa ao Twilio |
| `ATTESTATION_MODE` | `off` (padrão), `log` ou `enforce`. **Mantenha `off`**: o app ainda não envia cabeçalho de atestação, e `enforce` bloquearia todos os clientes. Ver `ATTESTATION.md`. |
| `ALLOWED_ORIGINS` | só se for chamar de um site. O app mobile não envia `Origin` e passa sem esta variável. |

Não defina `PORT` nem `NODE_ENV` — a Vercel cuida dos dois.

### Conferir se subiu

```bash
curl -i https://SEU-PROJETO.vercel.app/
```

Esperado: **401**, porque a raiz exige o segredo. Se vier **404 com `x-render-routing`** ou **`no-server`**, o deploy não aconteceu. Se vier 200 sem autenticação, algo está errado na proteção.

Com o segredo:

```bash
curl -i -H "x-vigilaro-app-secret: SEU_SEGREDO" https://SEU-PROJETO.vercel.app/api/attest/nonce
```

Esperado: **200** com um nonce.

---

## Etapa 2 — apontar o app para o proxy

O app lê `EXPO_PUBLIC_VIGILARO_PROXY_URL`. **Não há mais fallback em produção**, de propósito: antes havia um, apontando para o endereço morto, e o sintoma era 404 em tudo — o erro mais difícil de diagnosticar, porque parece problema de rede ou da conta da OpenAI.

```bash
eas secret:create --scope project --name EXPO_PUBLIC_VIGILARO_PROXY_URL --value "https://SEU-PROJETO.vercel.app"
```

Sem barra no final. Aproveite e confira os outros segredos do build:

```bash
eas secret:list
```

Devem estar lá, no mínimo:

- `EXPO_PUBLIC_VIGILARO_PROXY_URL`
- `EXPO_PUBLIC_VIGILARO_APP_SECRET` — **ou** `EXPO_PUBLIC_VIGILARO_PROXY_TOKEN`
- `EXPO_PUBLIC_SENTRY_DSN` (pendência A4)

> **Atenção à precedência.** O `utils/Config.js` lê `EXPO_PUBLIC_VIGILARO_PROXY_TOKEN` **antes** de `EXPO_PUBLIC_VIGILARO_APP_SECRET`. Se as duas existirem com valores diferentes, vale a primeira — e é fácil rotacionar uma e continuar usando a outra sem perceber. Tenha só uma cadastrada.

O valor precisa ser **idêntico** ao `VIGILARO_APP_SECRET` da Vercel, senão o proxy devolve 401 em tudo.

---

## Ordem recomendada, se for rotacionar o segredo junto

A rotação é a pendência A1 e combina bem com este deploy:

1. Gere um segredo novo: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Na Vercel: `VIGILARO_APP_SECRET` = novo, `VIGILARO_APP_SECRET_PREV` = antigo. Redeploy.
3. No EAS: atualize o segredo do app para o novo valor.
4. Gere o build e publique.
5. Quando a maioria tiver atualizado, remova `VIGILARO_APP_SECRET_PREV` da Vercel.

O passo 2 é o que evita derrubar quem ainda está na versão antiga — o `server.js` aceita os dois durante a transição.

---

## Depois de publicar

Volte em `docs/PENDENCIAS.md` e feche **A8**. Se tiver rotacionado o segredo, feche **A1** também.
