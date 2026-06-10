require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
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

// Security guard: rejects requests without the app secret
const requireAppSecret = (req, res, next) => {
  const token = req.headers['x-vigilaro-token'];
  if (!token || token !== APP_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing X-Vigilaro-Token' });
  }
  // Delete the custom token so it doesn't leak upstream
  delete req.headers['x-vigilaro-token'];
  next();
};

// 1. Proxy OpenAI
const openaiProxy = createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  ws: true, // Support WebSockets for Realtime API
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

// Apply Middlewares
app.use('/api/openai', requireAppSecret, openaiProxy);
app.use('/api/elevenlabs', requireAppSecret, elevenLabsProxy);
app.use('/api/epa', requireAppSecret, epaProxy);

// Export app for Vercel Serverless
module.exports = app;

// Listen only if not running inside Vercel
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`\x1b[32m🚀 Vigilaro Proxy running on http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[33m🔒 App Secret ends with: ...${APP_SECRET.slice(-4)}\x1b[0m`);
  });
  
  server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/api/openai')) {
      openaiProxy.upgrade(req, socket, head);
    }
  });
}
