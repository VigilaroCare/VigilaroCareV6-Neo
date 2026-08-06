const crypto = require('crypto');

// Atestação de app (ver ATTESTATION.md). Serverless-friendly: nonce stateless
// assinado com o APP_SECRET (não há DB/memória compartilhada na Vercel para
// guardar nonces emitidos). ATTESTATION_MODE=off|log|enforce — default off.

const NONCE_TTL_MS = 5 * 60 * 1000;

const getSecret = () => process.env.VIGILARO_APP_SECRET;
const getMode = () => (process.env.ATTESTATION_MODE || 'off').toLowerCase();

const signNonce = (payload) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

// Nonce = "<ts>.<rand>.<hmac>" — validável sem estado: assinatura prova que
// fomos nós que emitimos; ts limita a janela de uso.
const issueNonce = () => {
  const payload = `${Date.now()}.${crypto.randomBytes(16).toString('base64url')}`;
  return `${payload}.${signNonce(payload)}`;
};

const verifyNonce = (nonce) => {
  if (typeof nonce !== 'string') return false;
  const parts = nonce.split('.');
  if (parts.length !== 3) return false;
  const [ts, rand, mac] = parts;
  const expected = signNonce(`${ts}.${rand}`);
  const macBuf = Buffer.from(String(mac));
  const expBuf = Buffer.from(expected);
  if (macBuf.length !== expBuf.length || !crypto.timingSafeEqual(macBuf, expBuf)) return false;
  const age = Date.now() - Number(ts);
  return Number.isFinite(age) && age >= 0 && age <= NONCE_TTL_MS;
};

// --- Google: OAuth2 de service account sem dependência nova (RS256 manual) ---
let cachedGoogleToken = null; // { token, exp } — cache por instância warm

const getGoogleAccessToken = async () => {
  if (cachedGoogleToken && cachedGoogleToken.exp > Date.now() + 60000) {
    return cachedGoogleToken.token;
  }
  const sa = JSON.parse(Buffer.from(process.env.GOOGLE_SA_KEY_B64, 'base64').toString('utf8'));
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/playintegrity',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }).toString(),
  });
  if (!res.ok) throw new Error(`Google OAuth falhou: ${res.status}`);
  const data = await res.json();
  cachedGoogleToken = { token: data.access_token, exp: Date.now() + data.expires_in * 1000 };
  return cachedGoogleToken.token;
};

const verifyPlayIntegrity = async (integrityToken, expectedNonce) => {
  const pkg = process.env.PLAY_INTEGRITY_PACKAGE;
  if (!pkg || !process.env.GOOGLE_SA_KEY_B64) {
    return { ok: false, reason: 'play-integrity-nao-configurado' };
  }
  const accessToken = await getGoogleAccessToken();
  const res = await fetch(
    `https://playintegrity.googleapis.com/v1/${encodeURIComponent(pkg)}:decodeIntegrityToken`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ integrityToken }),
    }
  );
  if (!res.ok) return { ok: false, reason: `decode-falhou-${res.status}` };
  const { tokenPayloadExternal: p } = await res.json();
  if (!p) return { ok: false, reason: 'payload-vazio' };
  const nonceOk = p.requestDetails
    && p.requestDetails.nonce === Buffer.from(expectedNonce).toString('base64url');
  const appOk = p.appIntegrity && p.appIntegrity.appRecognitionVerdict === 'PLAY_RECOGNIZED';
  const deviceOk = p.deviceIntegrity
    && Array.isArray(p.deviceIntegrity.deviceRecognitionVerdict)
    && p.deviceIntegrity.deviceRecognitionVerdict.includes('MEETS_DEVICE_INTEGRITY');
  if (nonceOk && appOk && deviceOk) return { ok: true };
  return { ok: false, reason: `verdicts nonce=${!!nonceOk} app=${!!appOk} device=${!!deviceOk}` };
};

// iOS DeviceCheck: etapa 2 — exige JWT ES256 com a chave .p8 da Apple.
// Enquanto não implementado, iOS é aceito em modo enforce SOMENTE se as
// chaves Apple ainda não estiverem configuradas (gap documentado em
// ATTESTATION.md; enforce pleno só com os dois lados prontos).
const verifyDeviceCheck = async () => ({ ok: false, reason: 'devicecheck-etapa-2' });

const requireAttestation = async (req, res, next) => {
  const mode = getMode();
  if (mode === 'off') return next();

  let result;
  try {
    const platform = req.headers['x-vigilaro-attest-platform'];
    const attestToken = req.headers['x-vigilaro-attest'];
    const nonce = req.headers['x-vigilaro-attest-nonce'];

    if (!attestToken || !verifyNonce(nonce)) {
      result = { ok: false, reason: 'atestado-ou-nonce-ausente/expirado' };
    } else if (platform === 'android') {
      result = await verifyPlayIntegrity(attestToken, nonce);
    } else if (platform === 'ios') {
      result = process.env.APPLE_DEVICECHECK_P8_B64
        ? await verifyDeviceCheck(attestToken)
        : { ok: true, gap: 'ios-sem-devicecheck-configurado' };
    } else {
      result = { ok: false, reason: 'plataforma-invalida' };
    }
  } catch (e) {
    // Falha de infra (Google fora do ar etc.): em log, segue; em enforce,
    // NÃO falha aberto — rota cara fica indisponível a nao-atestados.
    result = { ok: false, reason: `excecao: ${e.message}` };
  }

  if (result.ok) return next();
  if (mode === 'log') {
    console.warn(`[attest][log] falha de atestação (não bloqueado): ${result.reason}`);
    return next();
  }
  return res.status(403).json({ error: 'Atestação de app inválida' });
};

module.exports = { issueNonce, verifyNonce, requireAttestation };
