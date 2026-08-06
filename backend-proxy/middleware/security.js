const rateLimit = require('express-rate-limit');

// Limiter dedicado às rotas de mensagens — cada request aqui custa dinheiro
// real no provedor (Zenvia/Twilio), diferente das rotas de proxy. O apiLimiter
// global (60 req/min) continua valendo; este é um teto adicional, muito mais
// apertado, por IP. Requer `app.set('trust proxy', 1)` (já feito no server.js)
// para o IP real chegar atrás do LB da Vercel.
const smsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de envio de mensagens atingido. Tente novamente mais tarde.' },
});

// Campos de texto entram no corpo da mensagem montada pelo servidor. Tamanho
// limitado impede SMS multi-segmento (custo) e a remoção de caracteres de
// controle/quebras de linha impede que o payload injete conteúdo extra na
// mensagem (ex.: instruções falsas ao destinatário em linhas novas).
const MAX_NAME_LEN = 60;
const MAX_MEDICATION_LEN = 120;
const TEXT_FIELD_LIMITS = {
  caregiverName: MAX_NAME_LEN,
  recipientName: MAX_NAME_LEN,
  medicationName: MAX_MEDICATION_LEN,
};

const stripControlChars = (s) =>
  String(s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();

const E164_RE = /^\+\d{10,15}$/;

const validateSmsPayload = (req, res, next) => {
  const body = req.body || {};
  const { recipientPhone, caregiverName, recipientName, medicationName } = body;

  if (!recipientPhone || !caregiverName || !recipientName || !medicationName) {
    return res.status(400).json({
      error: 'Campos obrigatórios: recipientPhone, caregiverName, recipientName, medicationName',
    });
  }

  if (typeof recipientPhone !== 'string' || !E164_RE.test(recipientPhone)) {
    return res.status(400).json({
      error: 'recipientPhone deve estar no formato E.164 (ex: +5511999999999)',
    });
  }

  if (body.channel !== undefined && !['sms', 'whatsapp'].includes(body.channel)) {
    return res.status(400).json({ error: "channel deve ser 'sms' ou 'whatsapp'" });
  }

  if (body.type !== undefined && !['reminder', 'optin'].includes(body.type)) {
    return res.status(400).json({ error: "type deve ser 'reminder' ou 'optin'" });
  }

  for (const [field, maxLen] of Object.entries(TEXT_FIELD_LIMITS)) {
    if (typeof body[field] !== 'string' || body[field].length > maxLen) {
      return res.status(400).json({
        error: `${field} deve ser texto com no máximo ${maxLen} caracteres`,
      });
    }
    body[field] = stripControlChars(body[field]);
    if (!body[field]) {
      return res.status(400).json({ error: `${field} não pode ser vazio` });
    }
  }

  next();
};

module.exports = { smsLimiter, validateSmsPayload };
