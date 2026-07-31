/**
 * relevanciaRegional.js
 *
 * Ordena as fichas de animais peconhentos e plantas toxicas por relevancia
 * para onde o utilizador esta (ou para onde vai viajar), SEM nunca remover
 * nada do catalogo.
 *
 * PRINCIPIO CENTRAL — REGIONALIZAR NAO E ESCONDER
 * Filtrar jararaca para quem esta em Lisboa acerta na maior parte dos casos e
 * erra em dois que importam: o brasileiro que mora la e quer consultar o que
 * conhece, e o portugues que vai viajar ao Brasil. Por isso este modulo
 * ORDENA e MARCA, nunca corta. Quem quiser o catalogo completo continua a
 * tendo — e essa e a diferenca entre regionalizar e omitir.
 *
 * Ver data/ocorrencia_regional.js para a regra de inclusao de dois criterios
 * e para o status de validacao dos dados (hoje: preliminar).
 */
import i18n from '../i18n';
import { detectEmergencyCountry } from './getEmergencyCountry';
import {
    OCORRENCIA_ANIMAIS,
    OCORRENCIA_PLANTAS,
    LACUNAS_POR_MERCADO,
    LOCALE_PARA_MERCADO,
    MERCADOS,
} from '../data/ocorrencia_regional';

/** Peso de ordenacao. Maior = aparece antes. */
const PESO_STATUS = {
    ocorre: 3,
    parcial: 2,
    desconhecido: 1, // ficha sem classificacao ainda: nao penalizar demais
    ausente: 0,
};

/** Dentro do mesmo status, gravidade vem antes de mera frequencia. */
const PESO_CRITERIO = { AB: 3, B: 2, A: 1 };

const MAPAS = {
    animais: OCORRENCIA_ANIMAIS,
    plantas: OCORRENCIA_PLANTAS,
};

/**
 * Converte um locale do i18n em codigo de mercado.
 * Aceita tambem um codigo de pais ja pronto ('BR', 'PT'...).
 */
export function mercadoDeLocale(locale) {
    if (!locale) return null;
    if (MERCADOS.includes(locale)) return locale;
    if (LOCALE_PARA_MERCADO[locale]) return LOCALE_PARA_MERCADO[locale];
    const base = String(locale).split('-')[0];
    return LOCALE_PARA_MERCADO[base] || null;
}

/**
 * Mercado atual do utilizador.
 *
 * Prioriza LOCALIZACAO sobre IDIOMA, seguindo a mesma decisao de produto de
 * data/emergencyNumbersByCountry.js: um turista de fala espanhola no Brasil
 * precisa do conteudo brasileiro, e um brasileiro em Lisboa precisa do
 * portugues. O idioma so entra como ultimo recurso.
 *
 * @param {string|null} destinoViagem  codigo de pais declarado pelo utilizador
 *        (Modo Viagem). Quando presente, sobrepoe a deteccao — quem vai viajar
 *        quer ver o destino, nao onde esta agora.
 */
export function getMercadoAtual(destinoViagem) {
    if (destinoViagem) {
        const doDestino = mercadoDeLocale(destinoViagem);
        if (doDestino) return doDestino;
    }

    try {
        const pais = detectEmergencyCountry(null);
        if (pais && MERCADOS.includes(pais)) return pais;
    } catch (_) {
        // Sem sinal de localizacao — cai no idioma abaixo.
    }

    return mercadoDeLocale(i18n.language);
}

/**
 * Relevancia de uma ficha para um mercado.
 *
 * @param {string} id      id da ficha (ex: 'jararaca')
 * @param {'animais'|'plantas'} tipo
 * @param {string|null} mercado  'BR' | 'PT' | 'ES' | 'US' | null
 * @returns {{status:string, criterio:string|null, nota:string|null, classificado:boolean}}
 */
export function getRelevancia(id, tipo, mercado) {
    const mapa = MAPAS[tipo];
    const entrada = mapa && mapa[id];

    // Mercado desconhecido ou ficha ainda nao classificada: tratar como
    // 'desconhecido', nunca como 'ausente'. Na duvida, mostrar.
    if (!entrada || !mercado || !entrada[mercado]) {
        return { status: 'desconhecido', criterio: null, nota: null, classificado: false };
    }

    return { ...entrada[mercado], classificado: true };
}

/** true quando a ficha deve ser apresentada como risco LOCAL. */
export function ehRiscoLocal(id, tipo, mercado) {
    const { status } = getRelevancia(id, tipo, mercado);
    return status === 'ocorre' || status === 'parcial';
}

/**
 * Ordena as fichas por relevancia regional. NAO remove nenhuma.
 *
 * A ordenacao e estavel: fichas com o mesmo peso mantem a ordem original do
 * catalogo, para que a lista nao "dance" entre renders.
 *
 * @param {Array} fichas  array vindo de animaisCatalog / plantasCiatox
 * @param {'animais'|'plantas'} tipo
 * @param {string|null} mercado
 * @returns {Array} novo array ordenado, com o mesmo comprimento do original
 */
export function ordenarPorRelevancia(fichas, tipo, mercado) {
    if (!Array.isArray(fichas)) return [];
    if (!mercado) return fichas;

    return fichas
        .map((ficha, indice) => {
            const { status, criterio } = getRelevancia(ficha?.id, tipo, mercado);
            return {
                ficha,
                indice,
                peso: (PESO_STATUS[status] ?? PESO_STATUS.desconhecido) * 10 +
                    (PESO_CRITERIO[criterio] || 0),
            };
        })
        .sort((a, b) => (b.peso - a.peso) || (a.indice - b.indice))
        .map((entrada) => entrada.ficha);
}

/**
 * Separa o catalogo em duas faixas para UI com secoes: o que e risco local e
 * o que fica disponivel mas nao se aplica ali. Soma sempre igual ao total —
 * a asserção esta coberta em scripts/verify_ocorrencia_regional.js.
 */
export function separarPorRelevancia(fichas, tipo, mercado) {
    const ordenadas = ordenarPorRelevancia(fichas, tipo, mercado);
    if (!mercado) return { locais: ordenadas, outrasRegioes: [] };

    const locais = [];
    const outrasRegioes = [];
    for (const ficha of ordenadas) {
        (ehRiscoLocal(ficha?.id, tipo, mercado) ? locais : outrasRegioes).push(ficha);
    }
    return { locais, outrasRegioes };
}

/**
 * Lacunas conhecidas do mercado — taxons que importam ali e ainda nao tem
 * ficha. Serve para a UI poder ser honesta ("esta lista ainda nao cobre X")
 * em vez de dar a impressao de cobertura completa.
 */
export function getLacunas(mercado) {
    return (mercado && LACUNAS_POR_MERCADO[mercado]) || [];
}

export default ordenarPorRelevancia;
