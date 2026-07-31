/**
 * getEmergencyCountry — detecta o pais atual do usuario pra escolher o
 * numero de emergencia certo, SEM depender de rede (ver getEmergencyLocation:
 * "o socorro nunca espera o GPS", mesma regra vale pra internet numa
 * emergencia real).
 *
 * Estrategia em 2 camadas, nenhuma faz chamada de rede:
 *  1. GPS (coords ja capturadas por getEmergencyLocation) testado contra um
 *     poligono simplificado do Brasil — a distincao mais importante, porque
 *     e o unico pais do app sem numero unificado (190/192/193 em vez de
 *     112/911) e porque reflete localizacao FISICA real, nao configuracao
 *     do aparelho (importante pro caso de brasileiro no exterior).
 *  2. Se o GPS nao apontar Brasil (ou nao estiver disponivel), cai pro
 *     regionCode do aparelho (Localization.getLocales()[0].regionCode —
 *     configuracao de Regiao do sistema, ja fica em cache local, existe em
 *     iOS/Android/web). Reflete o pais configurado, nao necessariamente o
 *     pais fisico atual, mas e o melhor sinal disponivel sem rede.
 *
 * LIMITACAO CONHECIDA: o poligono do Brasil é uma simplificacao (~19
 * vertices tracando o contorno real) — preciso o suficiente pra distinguir
 * "claramente dentro" de "claramente fora", impreciso perto de fronteiras
 * (built sem teste em GPS real; validar em dispositivo antes de confiar
 * cegamente nas bordas).
 */
import * as Localization from 'expo-localization';
import { EMERGENCY_NUMBERS_BY_COUNTRY } from '../data/emergencyNumbersByCountry';

// Contorno simplificado do Brasil, sentido horario a partir do extremo
// norte (Oiapoque/AP). [latitude, longitude]. Fonte: coordenadas aproximadas
// de cidades/pontos de fronteira conhecidos, nao um shapefile oficial.
const BRAZIL_POLYGON = [
    [4.00, -51.8],   // Oiapoque (AP) — fronteira norte com a Guiana Francesa
    [-1.45, -48.5],  // Belém (PA)
    [-2.53, -44.3],  // São Luís (MA)
    [-3.73, -38.5],  // Fortaleza (CE)
    [-5.79, -35.2],  // Natal (RN) — ponta leste
    [-8.05, -34.9],  // Recife (PE)
    [-12.97, -38.5], // Salvador (BA)
    [-20.30, -40.3], // Vitória (ES)
    [-22.90, -43.2], // Rio de Janeiro (RJ)
    [-27.60, -48.5], // Florianópolis (SC)
    [-33.70, -53.4], // Chuí (RS) — ponta sul
    [-30.90, -55.6], // Santana do Livramento (RS) — fronteira SW c/ Uruguai
    [-25.50, -54.6], // Foz do Iguaçu (PR) — tríplice fronteira
    [-19.00, -57.6], // Corumbá (MS) — fronteira c/ Bolívia
    [-8.76, -63.9],  // Porto Velho (RO)
    [-7.60, -72.7],  // Cruzeiro do Sul (AC) — extremo oeste
    [-4.25, -69.9],  // Tabatinga (AM) — fronteira c/ Peru/Colômbia
    [2.82, -60.7],   // Boa Vista (RR)
];

// Ray casting padrao — algoritmo estabelecido, a precisao real depende só
// dos vertices do poligono acima, nao da logica em si.
function isPointInPolygon(lat, lon, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [latI, lonI] = polygon[i];
        const [latJ, lonJ] = polygon[j];
        const intersect =
            (lonI > lon) !== (lonJ > lon) &&
            lat < ((latJ - latI) * (lon - lonI)) / (lonJ - lonI) + latI;
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * @param {{latitude:number, longitude:number}|null} coords - de getEmergencyLocation()
 * @returns {string|null} codigo ISO do pais (ex: 'BR', 'US') ou null se indeterminado
 */
export function detectEmergencyCountry(coords) {
    if (coords?.latitude != null && coords?.longitude != null) {
        if (isPointInPolygon(coords.latitude, coords.longitude, BRAZIL_POLYGON)) {
            return 'BR';
        }
    }

    try {
        const region = Localization.getLocales()[0]?.regionCode;
        if (region && EMERGENCY_NUMBERS_BY_COUNTRY[region]) return region;
    } catch (_) {
        // Sem sinal de regiao disponivel — segue pro fallback do chamador.
    }

    return null;
}
