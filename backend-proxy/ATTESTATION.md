# Atestação de App — Play Integrity (Android) + DeviceCheck (iOS)

Objetivo: substituir o token estático (`x-vigilaro-token`, extraível do APK/IPA)
como gate principal das rotas caras (SMS e LLM) por um atestado emitido por
Google/Apple **por requisição**, verificado server-side.

## Decisões de arquitetura

| Decisão | Escolha | Motivo |
|---|---|---|
| Nonce | **Stateless** — HMAC-SHA256(`ts.rand`, `VIGILARO_APP_SECRET`), TTL 5 min | O proxy é serverless (Vercel): não há memória compartilhada nem DB para guardar nonces emitidos. O servidor valida assinatura + janela de tempo em vez de procurar o nonce num store. Replay dentro do TTL é mitigado pelo `smsLimiter`/`apiLimiter`. |
| Android | **Play Integrity API** (requisição clássica com nonce) | Verificação por chamada REST `decodeIntegrityToken` — stateless, encaixa no serverless. |
| iOS | **DeviceCheck** (`validate_device_token`) na etapa 1; App Attest fica para quando houver storage | App Attest exige guardar a chave pública por dispositivo gerada na cerimônia de atestação → precisa de DB. DeviceCheck valida o token do dispositivo com uma chamada stateless à Apple. Barreira menor que App Attest, mas real (token emitido pela Apple por dispositivo físico). |
| Rollout | `ATTESTATION_MODE=off → log → enforce` | `log` registra veredicto sem bloquear (coleta dados reais antes de ligar). `enforce` só depois de ambos os clientes enviarem atestado. |

## Fluxo (nonce)

1. App: `GET /api/attest/nonce` (com `x-vigilaro-token`) → `{ nonce, expiresAt }`.
2. App chama o SDK nativo:
   - Android: `StandardIntegrityManager`/`IntegrityManager.requestIntegrityToken({ nonce })`.
   - iOS: `DCDevice.current.generateToken()` (DeviceCheck não usa o nonce; envia-o mesmo assim no header para o servidor validar a janela temporal).
3. App envia a requisição cara com headers:
   - `x-vigilaro-attest`: token de integridade (Android) ou device token (iOS)
   - `x-vigilaro-attest-platform`: `android` | `ios`
   - `x-vigilaro-attest-nonce`: o nonce do passo 1
4. Servidor (`requireAttestation`):
   - valida HMAC + TTL do nonce;
   - Android: `POST playintegrity.googleapis.com/v1/{pkg}:decodeIntegrityToken`, confere `nonce` ecoado, `appRecognitionVerdict=PLAY_RECOGNIZED`, `deviceRecognitionVerdict` contém `MEETS_DEVICE_INTEGRITY`;
   - iOS: `POST api.devicecheck.apple.com/v1/validate_device_token` com JWT ES256 (etapa 2 — ver TODO no middleware).

## Variáveis de ambiente (Vercel)

- `ATTESTATION_MODE` — `off` (default) | `log` | `enforce`
- `PLAY_INTEGRITY_PACKAGE` — ex.: `com.vigilaro.care`
- `GOOGLE_SA_KEY_B64` — JSON da service account (role: Play Integrity API user), base64
- (etapa 2) `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_DEVICECHECK_P8_B64`

## Etapas

- [x] **Etapa 1 (este commit):** middleware `requireAttestation` com nonce stateless,
      verificação Play Integrity completa, modos off/log/enforce, aplicado às rotas
      de SMS e OpenAI. Default `off` — nenhuma mudança de comportamento.
- [ ] **Etapa 2 (humano + cliente):** criar service account no Google Cloud e
      habilitar Play Integrity API no Play Console; integrar SDK no app
      (ex.: `expo-app-integrity` ou módulo nativo) — exige novo build nativo;
      implementar JWT ES256 do DeviceCheck; rodar em `log` por ~1 semana; ligar `enforce`.
- [ ] **Etapa 3 (futuro, exige DB):** migrar iOS para App Attest com assertions.

### Correção de 23/09 — `enforce` era contornável

O ramo iOS devolvia `ok: true` quando `APPLE_DEVICECHECK_P8_B64` não estava
configurado. Como `x-vigilaro-attest-platform` é escolhido pelo cliente e o
nonce vem de rota pública, bastava declarar-se iOS com um token qualquer para
atravessar o `enforce`. Agora, em `enforce`, plataforma sem verificador
configurável é **recusa**; em `log`, a lacuna segue registrada e passando, que
é a função do modo.

**Consequência prática para a etapa 2:** ligar `enforce` sem a chave Apple
passa a bloquear os clientes iOS, em vez de deixá-los entrar sem verificação.
Some-se a isso que o app **ainda não envia** nenhum dos cabeçalhos de
atestação — ligar `enforce` hoje bloquearia todo mundo. A ordem obrigatória é:
cliente enviando atestado → `log` por ~1 semana → `enforce`.

## Ações do humano (pré-requisitos da etapa 2)

1. Google Cloud: criar projeto, habilitar Play Integrity API, criar service
   account, vincular no Play Console (Configuração → Integridade do app).
2. Apple Developer: gerar chave DeviceCheck (.p8) em Certificates → Keys.
3. Colocar as envs acima na Vercel.
