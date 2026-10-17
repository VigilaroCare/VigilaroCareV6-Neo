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
 *   {{CERT_SEAL}}         — selo/marca de conformidade a procurar no produto:
 *                           "o selo do INMETRO" no Brasil, "a marcacao CE" na
 *                           UE, "a marca de um laboratorio certificador (UL,
 *                           ETL)" nos EUA, "a marcacao UKCA" no Reino Unido.
 *   {{STANDARDS_BODY}}    — organismo de normas: ABNT (BR), EN (UE),
 *                           ASTM/ANSI (EUA), BS EN (GB).
 *   {{PEDIATRIC_BODY}}    — sociedade de pediatria de referencia: SBP (BR),
 *                           SPP (PT), AEP (ES), AAP (EUA), RCPCH (GB).
 *   {{HEALTH_AUTHORITY}}  — regulador sanitario: ANVISA (BR), INFARMED (PT),
 *                           AEMPS (ES), FDA (EUA), MHRA (GB).
 *   {{TRAFFIC_AUTHORITY}} — fonte da regra de transito: CTB (BR), Codigo da
 *                           Estrada (PT), RGC (ES), lei estadual (EUA).
 *
 *   Os cinco acima vem de data/instituicoesPorPais.js e foram acrescentados
 *   em 08/10/2026, por decisao do Agnaldo: conteudo de prevencao nao se
 *   resolve com traducao, porque o orgao que certifica, a norma que vale e a
 *   autoridade que recomenda MUDAM com o pais. Pais sem entrada cai numa
 *   formulacao generica correta ("uma certificacao de seguranca reconhecida"),
 *   nunca no orgao de outro pais.
 *
 *   {{POLICE_NUMBER}}     — so o numero da policia: "190" no Brasil, o numero
 *                           geral nos demais (112/911/999). Acrescentado em
 *                           16/10/2026 para armas de fogo, onde o primeiro
 *                           socorro trazia "190" fixo no pt-BR e "911" fixo
 *                           no en e no es — errado no Reino Unido (999) e na
 *                           Espanha (112).
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
import { detectEmergencyCountry, nomeDoPais } from './getEmergencyCountry';
import {
    getEmergencyNumbersForCountry,
    DEFAULT_EMERGENCY_NUMBERS,
} from '../data/emergencyNumbersByCountry';
import {
    SELO_CERTIFICACAO,
    ORGAO_DE_NORMAS,
    ORGAO_PEDIATRIA,
    AUTORIDADE_SANITARIA,
    AUTORIDADE_TRANSITO,
    getInstituicao,
} from '../data/instituicoesPorPais';
import { TOKENS_CLASSES_INCENDIO, getClasseIncendio } from '../data/classesIncendio';
import { TOKENS_REGRAS_TRANSITO, getRegraTransito } from '../data/regrasTransitoPorPais';

// Classes de incendio e extintores (D16): a letra muda com a NORMA do pais —
// Classe C e eletrico no Brasil/EUA/Mexico e gas na Europa (EN 2). Ver
// data/classesIncendio.js para a lista de tokens e as fontes.
const TOKENS_INCENDIO = new Set(TOKENS_CLASSES_INCENDIO);

// Transporte de criancas e micromobilidade (D19): a lei muda com o pais.
// Ver data/regrasTransitoPorPais.js para as fontes.
const TOKENS_TRANSITO = new Set(TOKENS_REGRAS_TRANSITO);

const TOKEN_PATTERN = new RegExp(
    `\\{\\{(EMERGENCY_MEDICAL|EMERGENCY_NUMBER|POISON_CONTROL|FIRE_NUMBER|POLICE_NUMBER|CERT_SEAL|STANDARDS_BODY|PEDIATRIC_BODY|HEALTH_AUTHORITY|TRAFFIC_AUTHORITY|${TOKENS_CLASSES_INCENDIO.join('|')}|${TOKENS_REGRAS_TRANSITO.join('|')})\\}\\}`,
    'g'
);

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
    // SEM artigo, como o "SAMU" do Brasil. O texto leva o artigo ou a
    // contracao ("Chame o", "Ligue para o", "do", "ao").
    //
    // MOTIVO (16/10/2026): o rotulo era "o serviço de emergência", COM artigo,
    // enquanto o do Brasil era "SAMU", sem. Metade dos textos escrevia "Chame
    // o {{EMERGENCY_MEDICAL}}" — certo no Brasil, "Chame o o serviço de
    // emergência" em Portugal. A outra metade escrevia "Ligue
    // {{EMERGENCY_MEDICAL}}" — certo fora, seco no Brasil. Nenhuma forma do
    // texto servia aos dois rotulos ao mesmo tempo. Com os dois sem artigo,
    // o texto decide a gramatica e serve aos dois. Contracoes ("do", "ao",
    // "pelo") so funcionam assim — artigo dentro do token as impediria.
    //
    // es mantem o artigo: "Llame a los servicios" e a forma natural e nenhum
    // texto espanhol pede contracao com o token.
    DEFAULT: {
        pt: 'serviço de emergência',
        ptPT: 'serviço de emergência',
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

    // Espanha — Instituto Nacional de Toxicologia y Ciencias Forenses,
    // servico de informacao toxicologica nacional 24h. Fonte oficial:
    // https://www.mjusticia.gob.es (Instituto Nacional de Toxicologia)
    ES: 'Instituto Nacional de Toxicología (91 562 04 20)',

    // EUA — Poison Help, linha nacional unica 24h operada pela AAPCC, que
    // encaminha para o centro regional. Fonte oficial: https://poisonhelp.hrsa.gov
    US: 'Poison Help (1-800-222-1222)',
};

/**
 * Mesmos numeros em formato discavel (so digitos), para Linking.openURL('tel:').
 * Mantido separado do rotulo de exibicao de proposito: o texto visivel muda
 * com formatacao e idioma, o numero discado nao pode mudar por engano.
 */
const POISON_CONTROL_DIAL_BY_COUNTRY = {
    BR: '08007226001',
    PT: '800250250',
    ES: '915620420',
    US: '18002221222',
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

/**
 * País FÍSICO, vindo da posição (services/PaisAtualService). Vale só para os
 * NÚMEROS de emergência — socorro, bombeiros, polícia, intoxicação: quem está
 * em Lisboa liga para o 112, seja qual for o país do aparelho. Normas, selos,
 * leis e órgãos (CERT_SEAL, TRAFFIC_AUTHORITY…) seguem o país do aparelho,
 * que em geral é o da casa que o app protege.
 *   undefined → sem posição: usa o país do aparelho (comportamento antigo)
 *   { pais: 'PT' | 'JP' | null, motivo } → pais null = na dúvida (fronteira
 *     com número diferente, mar): genérico, 112.
 */
let paisFisico;
const TOKENS_DE_EMERGENCIA = new Set(['EMERGENCY_MEDICAL', 'EMERGENCY_NUMBER', 'POLICE_NUMBER', 'FIRE_NUMBER', 'POISON_CONTROL']);

export function definirPaisFisico(resultado) {
    paisFisico = resultado && typeof resultado === 'object' ? resultado : undefined;
}

/** Nome do país no idioma do app (ex.: "Portugal", "Japan"), ou null. */
export function getNomePais(codigo) {
    const k = getLangKey();
    return nomeDoPais(codigo, k === 'en' ? 'en' : k === 'es' ? 'es' : 'pt');
}

/** País cujos números de emergência valem agora. */
export function getPaisEmergencia() {
    return paisFisico ? paisFisico.pais : getCountry();
}

/**
 * Para os avisos: de onde vem o país dos números.
 * @returns {{origem: 'posicao'|'aparelho', pais: string|null, motivo?: string, paisAparelho: string|null}}
 */
export function getEstadoPaisEmergencia() {
    const paisAparelho = getCountry();
    return paisFisico
        ? { origem: 'posicao', pais: paisFisico.pais, motivo: paisFisico.motivo, paisAparelho }
        : { origem: 'aparelho', pais: paisAparelho, paisAparelho };
}

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
/**
 * Pais detectado (ISO alpha-2) ou null. Para telas que mostram um bloco
 * inteiro so num pais (ex.: categorias do CONTRAN, so no Brasil).
 */
export function getEmergencyCountry() {
    return getCountry();
}

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

        case 'POLICE_NUMBER': {
            const numbers = country
                ? getEmergencyNumbersForCountry(country)
                : DEFAULT_EMERGENCY_NUMBERS;
            return (
                numbers?.policia ||
                numbers?.geral ||
                DEFAULT_EMERGENCY_NUMBERS.geral
            );
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

        // Instituicoes: orgao, selo e norma mudam com o pais. A tabela
        // devolve o DEFAULT generico quando o pais e desconhecido, nunca o
        // orgao de outro pais.
        case 'CERT_SEAL':
            return getInstituicao(SELO_CERTIFICACAO, country, langKey);
        case 'STANDARDS_BODY':
            return getInstituicao(ORGAO_DE_NORMAS, country, langKey);
        case 'PEDIATRIC_BODY':
            return getInstituicao(ORGAO_PEDIATRIA, country, langKey);
        case 'HEALTH_AUTHORITY':
            return getInstituicao(AUTORIDADE_SANITARIA, country, langKey);
        case 'TRAFFIC_AUTHORITY':
            return getInstituicao(AUTORIDADE_TRANSITO, country, langKey);

        case 'POISON_CONTROL': {
            const poison = country ? POISON_CONTROL_BY_COUNTRY[country] : null;
            if (poison) return poison;
            // Sem centro de intoxicacao conhecido: manda pro servico geral,
            // que e sempre melhor do que uma frase truncada.
            return getTokenValue('EMERGENCY_MEDICAL', country, langKey);
        }

        default:
            if (TOKENS_INCENDIO.has(token)) return getClasseIncendio(token, country, langKey);
            if (TOKENS_TRANSITO.has(token)) return getRegraTransito(token, country, langKey);
            return '';
    }
}

/**
 * Rotulo de exibicao do centro de intoxicacao do pais atual, ja no idioma
 * corrente. Ex: "CIATOX (0800 722 6001)" no Brasil, "CIAV (800 250 250)" em
 * Portugal, e o servico de emergencia geral onde nao ha centro conhecido.
 */
export function getPoisonControlLabel(country) {
    const pais = country === undefined ? getPaisEmergencia() : country;
    return getTokenValue('POISON_CONTROL', pais, getLangKey());
}

/**
 * Numero discavel do centro de intoxicacao do pais atual. Cai no numero de
 * emergencia geral quando o pais nao tem centro mapeado — nunca retorna vazio,
 * porque o botao de ligar nao pode ficar sem destino.
 */
export function getPoisonControlDial(country) {
    const pais = country === undefined ? getPaisEmergencia() : country;
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
    const pais = country === undefined ? getPaisEmergencia() : country;
    return getTokenValue('EMERGENCY_MEDICAL', pais, getLangKey());
}

/**
 * Numero medico de emergencia discavel do pais atual.
 * BR 192 (SAMU), UE 112, EUA 911, Reino Unido 999, desconhecido 112.
 */
export function getMedicalDial(country) {
    const pais = country === undefined ? getPaisEmergencia() : country;
    return String(getMedicalNumber(pais)).replace(/\D/g, '');
}

/**
 * Numero dos bombeiros discavel do pais atual.
 * Só o Brasil tem linha separada (193); nos demais o 112/911/999 atende tudo.
 */
export function getFireDial(country) {
    const pais = country === undefined ? getPaisEmergencia() : country;
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
    const paisEmergencia = getPaisEmergencia();
    const langKey = getLangKey();

    return text.replace(TOKEN_PATTERN, (_match, token) =>
        getTokenValue(token, TOKENS_DE_EMERGENCIA.has(token) ? paisEmergencia : country, langKey)
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
