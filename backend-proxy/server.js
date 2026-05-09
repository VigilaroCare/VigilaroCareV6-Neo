require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

app.use(cors());
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
  pathRewrite: {
    '^/api/openai': '/v1', // rewrites /api/openai/chat/completions to /v1/chat/completions
  },
  onProxyReq: (proxyReq, req, res) => {
    if (OPENAI_API_KEY) {
      proxyReq.setHeader('Authorization', `Bearer ${OPENAI_API_KEY}`);
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
  onProxyReq: (proxyReq, req, res) => {
    if (ELEVEN_API_KEY) {
      proxyReq.setHeader('xi-api-key', ELEVEN_API_KEY);
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
  onProxyReq: (proxyReq, req, res) => {
    if (EPA_CTX_API_KEY) {
      proxyReq.setHeader('x-api-key', EPA_CTX_API_KEY);
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
