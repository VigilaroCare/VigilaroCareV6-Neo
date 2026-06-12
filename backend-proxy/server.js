require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Atrás do LB da Vercel, req.ip precisa vir do X-Forwarded-For (primeiro hop).
// Sem isto, o rate limiter agrupa TODOS os clientes no IP do balanceador
// (bucket único de 60 req/min pra base inteira) e o express-rate-limit v7
// dispara ERR_ERL_UNEXPECTED_X_FORWARDED_FOR.
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;
const EPA_CTX_API_KEY = process.env.EPA_CTX_API_KEY;
const APP_SECRET = process.env.VIGILARO_APP_SECRET;

if (!APP_SECRET) {
  console.error('❌ FATAL: VIGILARO_APP_SECRET não configurado. Servidor não pode iniciar sem segredo de autenticação.');
  process.exit(1);
}

// Headers de segurança HTTP (X-Content-Type-Options, Referrer-Policy, etc.)
app.use(helmet());

// CORS restrito por allow-list. Apps mobile nativos NÃO enviam header Origin,
// então `!origin` passa; navegadores só passam se a origem estiver em
// ALLOWED_ORIGINS (CSV via env). Sem a env, apenas chamadas sem Origin (mobile).
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
}));

// Rate limiting: 60 req/min por IP — barra abuso/DDoS de camada de aplicação.
// NOTA: não usamos express.json() aqui de propósito — o http-proxy-middleware
// encaminha o corpo bruto da requisição; consumir o stream com um body parser
// quebraria o proxy de POST (chat/transcrição/TTS).
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
});
app.use('/api/', apiLimiter);

app.use(morgan('dev'));

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Vigilaro API Proxy Serverless' });
});

// Comparação constant-time — `!==` short-circuita por caractere e vaza
// timing. timingSafeEqual exige buffers do mesmo tamanho, então o length
// é comparado antes (o tamanho do secret não é informação útil ao atacante).
const safeEqual = (a, b) => {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
};

// Security guard: rejects requests without the app secret
const requireAppSecret = (req, res, next) => {
  const token = req.headers['x-vigilaro-token'];
  if (!token || !safeEqual(token, APP_SECRET)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing X-Vigilaro-Token' });
  }
  // Delete the custom token so it doesn't leak upstream
  delete req.headers['x-vigilaro-token'];
  next();
};

// Allow-list de paths por proxy. Sem isto, o pathRewrite expõe as APIs
// INTEIRAS dos fornecedores a quem tiver o app secret (ex.: /v1/files,
// /v1/fine_tuning e /v1/images na OpenAI; /v1/history na ElevenLabs).
// O `req.path` aqui já vem SEM o prefixo do mount (o Express o remove),
// decodificado — regexes ancoradas tornam path traversal inócuo.
// Ao consumir um endpoint novo no app, adicione o padrão aqui.
const allowPaths = (patterns) => (req, res, next) => {
  if (patterns.some((re) => re.test(req.path))) return next();
  return res.status(404).json({ error: 'Not found' });
};

const OPENAI_ALLOWED = [
  /^\/chat\/completions$/,        // VisionService, OpenAIService (chat)
  /^\/audio\/transcriptions$/,    // OpenAIService (voz -> texto)
  /^\/audio\/speech$/,            // OpenAIService (TTS)
  // NOTA: /realtime fica FORA de propósito — a feature Realtime Voice está
  // desativada no app; reativar exige host com WS fora da Vercel (ver acima).
];
const ELEVEN_ALLOWED = [
  /^\/text-to-speech\//,          // nenhum caller ativo hoje; mantido p/ TTS futuro
];
const EPA_ALLOWED = [
  /^\/chemical\//,                // InfoRotulosSubstanceService (search/detail)
];

// 1. Proxy OpenAI
// NOTA: suporte a WebSocket (Realtime API) removido enquanto a feature
// Realtime Voice estiver desativada no app (services/_compat/LegacyAudioRecorder.js).
// O handler de upgrade anterior NÃO validava o x-vigilaro-token — qualquer
// cliente podia abrir um WS pra Realtime API (cobrada por minuto) na nossa conta.
// Ao reativar: validar o token no evento 'upgrade' ANTES de proxyar
// (upgrade não passa pelos middlewares Express) e hospedar fora da Vercel
// (serverless não suporta conexões persistentes).
const openaiProxy = createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    if (path.startsWith('/api/openai')) {
      return path.replace(/^\/api\/openai/, '/v1');
    }
    return '/v1' + path;
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (OPENAI_API_KEY) {
        proxyReq.setHeader('Authorization', `Bearer ${OPENAI_API_KEY}`);
      } else {
        console.error('⚠️ ALERTA: OPENAI_API_KEY ESTÁ UNDEFINED!');
      }
    }
  },
});

// 2. Proxy ElevenLabs
const elevenLabsProxy = createProxyMiddleware({
  target: 'https://api.elevenlabs.io',
  changeOrigin: true,
  pathRewrite: {
    '^/api/elevenlabs': '/v1', // rewrites /api/elevenlabs/text-to-speech to /v1/text-to-speech
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (ELEVEN_API_KEY) {
        proxyReq.setHeader('xi-api-key', ELEVEN_API_KEY);
      }
    }
  },
});

// 3. Proxy EPA CTX (Toxicológico)
const epaProxy = createProxyMiddleware({
  target: 'https://api-ccte.epa.gov',
  changeOrigin: true,
  pathRewrite: {
    '^/api/epa': '/', // rewrites /api/epa/chemical... to /chemical...
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (EPA_CTX_API_KEY) {
        proxyReq.setHeader('x-api-key', EPA_CTX_API_KEY);
      }
    }
  },
});

// Apply Middlewares (guard -> allow-list -> proxy)
app.use('/api/openai', requireAppSecret, allowPaths(OPENAI_ALLOWED), openaiProxy);
app.use('/api/elevenlabs', requireAppSecret, allowPaths(ELEVEN_ALLOWED), elevenLabsProxy);
app.use('/api/epa', requireAppSecret, allowPaths(EPA_ALLOWED), epaProxy);

// Export app for Vercel Serverless
module.exports = app;

// Listen only if not running inside Vercel
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`\x1b[32m🚀 Vigilaro Proxy running on http://localhost:${PORT}\x1b[0m`);
    // Não logar NENHUM fragmento/metadado do secret — nem em dev.
    console.log('\x1b[33m🔒 App Secret carregado.\x1b[0m');
  });
}
