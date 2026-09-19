/**
 * SentryService.js — inicialização do Sentry com scrubbing de PII.
 *
 * ── POR QUE O SCRUBBING NÃO É OPCIONAL AQUI ────────────────────────────────
 * O Vigilaro Care carrega dados de saúde de idosos e crianças, contatos de
 * emergência, telefones, datas de nascimento e medicamentos. Enviar qualquer
 * um desses para um serviço externo é incidente de LGPD, não "telemetria".
 * Por isso este módulo trabalha em NEGATIVO: o padrão é redigir, e só o que
 * comprovadamente não identifica ninguém sobrevive.
 *
 * O que sai do aparelho: tipo do erro, stack trace, versão do app, plataforma,
 * rota. O que NÃO sai: nome, telefone, e-mail, nascimento, condição de saúde,
 * medicamento, endereço, foto, token.
 *
 * Sem DSN configurado o módulo não inicializa — o app funciona normalmente,
 * apenas sem telemetria (é o estado de hoje, em dev).
 */
import Constants from 'expo-constants';

let Sentry = null;
try {
    Sentry = require('@sentry/react-native');
} catch (_) {
    // SDK ausente (Expo Go sem build nativo): degrada para no-op.
}

// ── Redação ────────────────────────────────────────────────────────────────

// Chaves cujo VALOR é sempre redigido, em qualquer profundidade. Espelha os
// campos do schema de perfil/saúde e as chaves sensíveis do SecureStorage.
const CHAVES_SENSIVEIS = [
    'nome', 'name', 'nomecompleto', 'apelido',
    'telefone', 'phone', 'celular', 'whatsapp', 'recipientphone', 'contato', 'contatos',
    'email', 'mail',
    'datanascimento', 'birthdate', 'dob', 'idade', 'age',
    'cpf', 'rg', 'documento',
    'endereco', 'address', 'cep', 'latitude', 'longitude', 'location', 'coords',
    'medicamento', 'medicamentos', 'medication', 'medications', 'posologia',
    'alergia', 'alergias', 'allergy', 'allergies',
    'condicao', 'condicoes', 'condition', 'conditions', 'diagnostico',
    'tiposanguineo', 'bloodtype', 'prontuario', 'historicomedico',
    'foto', 'photo', 'avatar', 'imagem', 'uri',
    'token', 'secret', 'apikey', 'api_key', 'authorization', 'password', 'senha',
    'perfil', 'perfis', 'profile', 'profiles', 'habitantes', 'frequentadores',
];

// Padrões redigidos mesmo dentro de texto livre (mensagem de erro, breadcrumb).
const PADROES = [
    [/\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, '[email]'],
    // Cobre E.164 (+5541998765432) e formato BR com DDD entre parênteses
    // ("(41) 99876-5432"), que a versão anterior deixava passar.
    [/(?:\+\d{1,3}[\s.-]?)?\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}\b/g, '[telefone]'],
    [/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[cpf]'],
    [/\bvgl_[A-Za-z0-9_-]+/g, '[token]'],
    [/\b(sk|pk)-[A-Za-z0-9_-]{16,}/g, '[apikey]'],
    [/\bBearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redigido]'],
    [/\b\d{4}-\d{2}-\d{2}T?[\d:.]*Z?\b/g, '[data]'], // nascimento em ISO
];

const REDIGIDO = '[redigido]';
const PROFUNDIDADE_MAX = 6;

// ── Nomes próprios ─────────────────────────────────────────────────────────
// Nome de pessoa não tem padrão: nenhum regex distingue "Maria Silva" de texto
// comum. Mas o APP conhece os nomes da família — então ele os registra aqui e
// passam a ser redigidos em qualquer texto livre (mensagem de erro, breadcrumb).
// Os termos ficam só em memória, nunca são enviados.
let termosSensiveis = [];

const escaparRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Registra nomes (perfis, pets, residências) para redação em texto livre.
 * Chamado pelo app quando os perfis carregam. Termos com menos de 3 letras são
 * ignorados — "Ana" dentro de "Ananás" geraria ruído sem ganho de privacidade.
 * @param {string[]} termos
 */
export function registrarTermosSensiveis(termos) {
    const limpos = (Array.isArray(termos) ? termos : [])
        .flatMap((t) => String(t || '').split(/\s+/)) // nome completo e cada parte
        .map((t) => t.trim())
        .filter((t) => t.length >= 3);
    // Mais longos primeiro: redige "Maria Silva" antes de "Maria" sozinho.
    termosSensiveis = [...new Set(limpos)].sort((a, b) => b.length - a.length);
}

export function redigirTexto(valor) {
    if (typeof valor !== 'string') return valor;
    let txt = PADROES.reduce((t, [re, sub]) => t.replace(re, sub), valor);
    for (const termo of termosSensiveis) {
        txt = txt.replace(new RegExp(`\\b${escaparRegex(termo)}\\b`, 'gi'), '[nome]');
    }
    return txt;
}

const ehSensivel = (chave) => {
    const k = String(chave).toLowerCase().replace(/[^a-z]/g, '');
    return CHAVES_SENSIVEIS.some((s) => k === s || k.includes(s));
};

/** Redige recursivamente objetos/arrays, por nome de chave e por padrão. */
export function redigir(valor, profundidade = 0) {
    if (valor == null) return valor;
    if (profundidade > PROFUNDIDADE_MAX) return REDIGIDO;
    if (typeof valor === 'string') return redigirTexto(valor);
    if (typeof valor !== 'object') return valor;
    if (Array.isArray(valor)) return valor.map((v) => redigir(v, profundidade + 1));

    const saida = {};
    for (const [k, v] of Object.entries(valor)) {
        saida[k] = ehSensivel(k) ? REDIGIDO : redigir(v, profundidade + 1);
    }
    return saida;
}

/** Aplica a redação no evento inteiro antes de ele sair do aparelho. */
export function scrubEvent(event) {
    if (!event) return event;

    // Identidade: nunca enviar. O Sentry agrupa por device id anônimo.
    delete event.user;
    delete event.server_name;

    if (event.message) event.message = redigirTexto(event.message);
    if (event.extra) event.extra = redigir(event.extra);
    if (event.contexts) event.contexts = redigir(event.contexts);
    if (event.tags) event.tags = redigir(event.tags);

    // Mensagens de exceção frequentemente carregam o dado que causou o erro.
    if (event.exception?.values) {
        event.exception.values = event.exception.values.map((v) => ({
            ...v,
            value: redigirTexto(v.value),
        }));
    }

    // Requisições: querystring e headers podem levar token.
    if (event.request) {
        if (event.request.url) event.request.url = redigirTexto(String(event.request.url).split('?')[0]);
        delete event.request.headers;
        delete event.request.cookies;
        delete event.request.data;
    }

    if (Array.isArray(event.breadcrumbs)) {
        event.breadcrumbs = event.breadcrumbs.map(scrubBreadcrumb).filter(Boolean);
    }

    return event;
}

export function scrubBreadcrumb(breadcrumb) {
    if (!breadcrumb) return breadcrumb;
    // Breadcrumbs de console repetem console.log do app — o caminho mais fácil
    // para PII vazar sem ninguém notar.
    if (breadcrumb.category === 'console') return null;
    return {
        ...breadcrumb,
        message: redigirTexto(breadcrumb.message),
        data: breadcrumb.data ? redigir(breadcrumb.data) : breadcrumb.data,
    };
}

// ── Inicialização ──────────────────────────────────────────────────────────

let inicializado = false;

/**
 * Liga o Sentry. Seguro chamar mais de uma vez.
 * @returns {boolean} true se ficou ativo.
 */
export function initSentry() {
    if (inicializado) return true;

    const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
    if (!Sentry || !dsn) {
        if (__DEV__ && !dsn) {
            console.log('[Sentry] EXPO_PUBLIC_SENTRY_DSN ausente — telemetria desligada.');
        }
        return false;
    }

    // Em desenvolvimento o ruído é alto e o valor é baixo: o erro já está no
    // terminal. Ligue com EXPO_PUBLIC_SENTRY_DEBUG=true se precisar testar.
    const habilitado = !__DEV__ || process.env.EXPO_PUBLIC_SENTRY_DEBUG === 'true';

    Sentry.init({
        dsn,
        enabled: habilitado,
        environment: __DEV__ ? 'development' : (process.env.EXPO_PUBLIC_ENV || 'production'),
        release: Constants.expoConfig?.version || undefined,

        // NÃO enviar IP, e-mail nem nome de usuário do dispositivo.
        sendDefaultPii: false,
        // Screenshots e hierarquia de views capturariam dados de família na tela.
        attachScreenshot: false,
        attachViewHierarchy: false,
        // Console vira breadcrumb e é rota conhecida de vazamento; cortamos
        // aqui e de novo em beforeBreadcrumb (cinto e suspensório).
        enableCaptureFailedRequests: false,

        tracesSampleRate: 0.2,

        beforeSend: (event) => {
            try {
                return scrubEvent(event);
            } catch (e) {
                // Se o scrubbing falhar, NÃO enviamos: o risco de vazar supera
                // o valor do relatório.
                if (__DEV__) console.warn('[Sentry] scrub falhou, evento descartado:', e?.message);
                return null;
            }
        },
        beforeBreadcrumb: (breadcrumb) => {
            try {
                return scrubBreadcrumb(breadcrumb);
            } catch (_) {
                return null;
            }
        },
    });

    inicializado = true;
    if (__DEV__) console.log(`[Sentry] ativo (enabled=${habilitado}).`);
    return true;
}

/** Erro tratado, já redigido. Use em catch de fluxo crítico. */
export function capturarErro(erro, contexto = {}) {
    if (!Sentry || !inicializado) return;
    try {
        Sentry.captureException(erro, { extra: redigir(contexto) });
    } catch (_) { /* telemetria nunca derruba o app */ }
}

export default {
    initSentry,
    capturarErro,
    registrarTermosSensiveis,
    scrubEvent,
    redigir,
    redigirTexto,
};
