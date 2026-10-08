/**
 * emergencyTokens.js
 *
 * Resolve tokens de emergencia embutidos no conteudo das bases de dados
 * (data/animais_ciatox.js, data/plantas_ciatox.js, etc) pro numero correto
 * do pais onde o usuario ESTA — nao do idioma que ele escolheu.
 *
 * MOTIVO (2026-07-31): os textos de primeiros socorros traziam o numero
 * brasileiro escrito dentro da frase, e o numero foi traduzido junto com
 * ela. Um usuario em Madrid lia "Llame a emergencias (192) inmediatamente"
 * — 192 nao atende em Espanha. Numero errado numa emergencia real e pior
 * que nenhum numero (mesma regra ja documentada em
 * data/emergencyNumbersByCountry.js).
 *
 * TOKENS DISPONIVEIS:
 *   {{EMERGENCY_MEDICAL}} — servico + numero, ex: "SAMU (192)" no Brasil,
 *                           "o servico de emergencia (112)" em Portugal.
 *                           Use quando a frase pede o nome do servico.
 *   {{EMERGENCY_NUMBER}}  — so o numero, ex: "192" / "112" / "911".
 *                           Use quando a frase ja diz "Ligue ...".
 *   {{POISON_CONTROL}}    — centro de intoxicacao quando existe no pais;
 *                           cai pro servico de emergencia geral quando nao.
 *   {{FIRE_NUMBER}}       — so o numero dos bombeiros, ex: "193" no Brasil,
 *                           "112" na UE, "911" nos EUA. Use em texto de
 *                           incendio, gas e evacuacao, onde o servico certo
 *                           e o Corpo de Bombeiros e nao o atendimento
 *                           medico. So o Brasil tem linha separada; nos
 *                           demais paises o numero geral atende tudo.
 *
 * GARANTIA DE COMPATIBILIDADE: com pais = BR, cada token expande exatamente
 * para o texto que estava fixo antes desta mudanca, em pt/en/es. A saida
 * renderizada no Brasil e identica a anterior (ver scripts/verify_emergency_tokens.js).
 *
 * REGRA DE SEGURANCA: nenhum token pode resolver pra vazio. Se o pais for
 * desconhecido, cai pro 112 (reconhecido por boa parte dos aparelhos GSM
 * como atalho de emergencia). Token nao resolvido nunca deve chegar na tela.
 */
import i18n from '../i18n';
import { detectEmergencyCountry } from './getEmergencyCountry';
import {
    getEmergencyNumbersForCountry,
    DEFAULT_EMERGENCY_NUMBERS,
} from '../data/emergencyNumbersByCountry';

const TOKEN_PATTERN = /\{\{(EMERGENCY_MEDICAL|EMERGENCY_NUMBER|POISON_CONTROL|FIRE_NUMBER)\}\}/g;

/**
 * Nome do servico medico de emergencia por pais e idioma.
 * BR usa "SAMU" em portugues porque e o nome que o brasileiro reconhece;
 * em en/es os textos originais diziam "emergency services"/"emergencias",
 * e esses valores sao preservados pra nao alterar a ficha atual.
 */
const MEDICAL_SERVICE_LABELS = {
    BR: {
        pt: 'SAMU',
        ptPT: 'SAMU',
        en: 'emergency services',
        es: 'emergencias',
    },
    DEFAULT: {
        pt: 'o serviço de emergência',
        ptPT: 'o serviço de emergência',
        en: 'emergency services',
        es: 'los servicios de emergencia',
    },
};

/**
 * Centro de informacao toxicologica por pais.
 * So entram paises com linha nacional verificada e estavel — mesma regra de
 * confianca de data/emergencyNumbersByCountry.js. Paises ausentes caem pro
 * servico de emergencia geral, que sempre existe.
 */
const POISON_CONTROL_BY_COUNTRY = {
    // Brasil — Disque-Intoxicacao da Anvisa, linha nacional gratuita 24h que
    // encaminha a ligacao pro CIATox mais proximo de onde ela se origina
    // (RENACIAT, 36 centros). Fonte oficial:
    // https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao
    //
    // CORRECAO 2026-07-31: as fichas traziam 0800 014 8110, que NAO e a linha
    // nacional — e o CEATOX do Instituto da Crianca (HC/USP), centro local de
    // Sao Paulo. Um usuario em Manaus ligava pra um hospital paulista. O
    // numero abaixo e o mesmo ja registrado como `nacional` em
    // data/telefones_ciatox.js, agora unificado.
    BR: 'CIATOX (0800 722 6001)',

    // Portugal — CIAV, Centro de Informacao Antivenenos do INEM. Centro unico
    // nacional, 24h, gratuito. Fonte oficial: https://www.inem.pt/ciav/
    PT: 'CIAV (800 250 250)',
};

/**
 * Mesmos numeros em formato discavel (so digitos), para Linking.openURL('tel:').
 * Mantido separado do rotulo de exibicao de proposito: o texto visivel muda
 * com formatacao e idioma, o numero discado nao pode mudar por engano.
 */
const POISON_CONTROL_DIAL_BY_COUNTRY = {
    BR: '08007226001',
    PT: '800250250',
};

/** Normaliza i18n.language ('pt-BR', 'pt-PT', 'en', 'es') pra chave de label. */
function getLangKey() {
    const lang = (i18n.language || 'pt-BR').toLowerCase();
    if (lang.startsWith('pt-pt')) return 'ptPT';
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('en')) return 'en';
    return 'pt';
}

/**
 * Cache do pais detectado. detectEmergencyCountry() nao faz chamada de rede,
 * mas e chamado uma vez por item de lista renderizado — sem cache isso vira
 * centenas de leituras de Localization por scroll.
 */
let cachedCountry;
let cachedCountryResolved = false;

function getCountry() {
    if (!cachedCountryResolved) {
        try {
            cachedCountry = detectEmergencyCountry(null);
        } catch (_) {
            cachedCountry = null;
        }
        cachedCountryResolved = true;
    }
    return cachedCountry;
}

/**
 * Limpa o cache de pais. Chamar quando a localizacao do usuario mudar
 * (ex: apos o SOS obter coordenadas de GPS reais, ou troca de regiao).
 */
export function resetEmergencyCountryCache() {
    cachedCountry = undefined;
    cachedCountryResolved = false;
}

/** Numero medico de emergencia do pais. Nunca retorna vazio. */
function getMedicalNumber(country) {
    const numbers = country
        ? getEmergencyNumbersForCountry(country)
        : DEFAULT_EMERGENCY_NUMBERS;
    return (
        numbers?.samu ||
        numbers?.geral ||
        DEFAULT_EMERGENCY_NUMBERS.geral
    );
}

function getTokenValue(token, country, langKey) {
    const number = getMedicalNumber(country);

    switch (token) {
        case 'EMERGENCY_NUMBER':
            return number;

        case 'EMERGENCY_MEDICAL': {
            const labels =
                MEDICAL_SERVICE_LABELS[country] || MEDICAL_SERVICE_LABELS.DEFAULT;
            const label = labels[langKey] || MEDICAL_SERVICE_LABELS.DEFAULT[langKey];
            return `${label} (${number})`;
        }

        case 'FIRE_NUMBER': {
            // Mesma logica do getFireDial, mas aqui para texto corrido.
            const numbers = country
                ? getEmergencyNumbersForCountry(country)
                : DEFAULT_EMERGENCY_NUMBERS;
            return (
                numbers?.bombeiros ||
                numbers?.geral ||
                DEFAULT_EMERGENCY_NUMBERS.geral
            );
        }

        case 'POISON_CONTROL': {
            const poison = country ? POISON_CONTROL_BY_COUNTRY[country] : null;
            if (poison) return poison;
            // Sem centro de intoxicacao conhecido: manda pro servico geral,
            // que e sempre melhor do que uma frase truncada.
            return getTokenValue('EMERGENCY_MEDICAL', country, langKey);
        }

        default:
            return '';
    }
}

/**
 * Rotulo de exibicao do centro de intoxicacao do pais atual, ja no idioma
 * corrente. Ex: "CIATOX (0800 722 6001)" no Brasil, "CIAV (800 250 250)" em
 * Portugal, e o servico de emergencia geral onde nao ha centro conhecido.
 */
export function getPoisonControlLabel(country) {
    const pais = country === undefined ? getCountry() : country;
    return getTokenValue('POISON_CONTROL', pais, getLangKey());
}

/**
 * Numero discavel do centro de intoxicacao do pais atual. Cai no numero de
 * emergencia geral quando o pais nao tem centro mapeado — nunca retorna vazio,
 * porque o botao de ligar nao pode ficar sem destino.
 */
export function getPoisonControlDial(country) {
    const pais = country === undefined ? getCountry() : country;
    const direto = pais ? POISON_CONTROL_DIAL_BY_COUNTRY[pais] : null;
    if (direto) return direto;
    return String(getMedicalNumber(pais)).replace(/\D/g, '');
}

/**
 * Rotulo de exibicao do servico medico de emergencia do pais atual, no idioma
 * corrente. Ex: "SAMU (192)" no Brasil, "o serviço de emergência (112)" em
 * Portugal, "emergency services (911)" nos EUA.
 */
export function getMedicalLabel(country) {
    const pais = country === undefined ? getCountry() : country;
    return getTokenValue('EMERGENCY_MEDICAL', pais, getLangKey());
}

/**
 * Numero medico de emergencia discavel do pais atual.
 * BR 192 (SAMU), UE 112, EUA 911, Reino Unido 999, desconhecido 112.
 */
export function getMedicalDial(country) {
    const pais = country === undefined ? getCountry() : country;
    return String(getMedicalNumber(pais)).replace(/\D/g, '');
}

/**
 * Numero dos bombeiros discavel do pais atual.
 * Só o Brasil tem linha separada (193); nos demais o 112/911/999 atende tudo.
 */
export function getFireDial(country) {
    const pais = country === undefined ? getCountry() : country;
    const numbers = pais ? getEmergencyNumbersForCountry(pais) : DEFAULT_EMERGENCY_NUMBERS;
    const numero = numbers?.bombeiros || numbers?.geral || DEFAULT_EMERGENCY_NUMBERS.geral;
    return String(numero).replace(/\D/g, '');
}

/**
 * Substitui os tokens de emergencia em uma string.
 * @param {string} text
 * @returns {string}
 */
export function resolveEmergencyTokens(text) {
    if (typeof text !== 'string') return text;
    // Curto-circuito: a esmagadora maioria das strings nao tem token.
    if (text.indexOf('{{') === -1) return text;

    const country = getCountry();
    const langKey = getLangKey();

    return text.replace(TOKEN_PATTERN, (_match, token) =>
        getTokenValue(token, country, langKey)
    );
}

/**
 * Aplica resolveEmergencyTokens recursivamente em strings, arrays e objetos.
 * Preserva o formato original — o chamador recebe o mesmo tipo que passou.
 * Retorna o proprio valor (sem copiar) quando nao ha nada a substituir, pra
 * nao quebrar igualdade referencial usada por memo/keyExtractor nas listas.
 */
export function resolveEmergencyTokensDeep(value) {
    if (typeof value === 'string') return resolveEmergencyTokens(value);

    if (Array.isArray(value)) {
        let changed = false;
        const next = value.map((item) => {
            const resolved = resolveEmergencyTokensDeep(item);
            if (resolved !== item) changed = true;
            return resolved;
        });
        return changed ? next : value;
    }

    if (value && typeof value === 'object') {
        // Nao mexe em objetos que nao sao dados simples (ex: require() de
        // imagem, que no React Native vira number, ou elementos React).
        if (value.$$typeof) return value;

        let changed = false;
        const next = {};
        for (const key of Object.keys(value)) {
            const resolved = resolveEmergencyTokensDeep(value[key]);
            if (resolved !== value[key]) changed = true;
            next[key] = resolved;
        }
        return changed ? next : value;
    }

    return value;
}

export default resolveEmergencyTokens;
