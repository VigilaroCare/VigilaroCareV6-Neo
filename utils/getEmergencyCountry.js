/**
 * getEmergencyCountry — em que PAÍS a pessoa está, para escolher o número de
 * emergência certo, SEM depender de rede ("o socorro nunca espera o GPS" —
 * a mesma regra vale para a internet numa emergência real).
 *
 * Duas fontes, nenhuma faz chamada de rede:
 *  1. POSIÇÃO (GPS) testada contra as fronteiras reais de 238 países
 *     (data/fronteirasPaises.js — Natural Earth 1:50m, domínio público,
 *     gerado por scripts/gerar_fronteiras_paises.js). Reflete onde a pessoa
 *     ESTÁ — é o que vale para o brasileiro em Lisboa ou o português no Rio.
 *  2. Sem posição: a Região configurada no aparelho
 *     (Localization.getLocales()[0].regionCode). Diz o país de origem, não o
 *     atual — melhor sinal disponível sem localização.
 *
 * 17/10/2026: substitui o contorno do Brasil desenhado à mão (19 vértices),
 * que deixava Maceió "fora do Brasil" (a reta Recife–Salvador passa por
 * dentro do continente) e não reconhecia nenhum outro país: fora do polígono
 * o app voltava à Região do aparelho, e o brasileiro em Lisboa via 192.
 *
 * NA DÚVIDA, 112. Perto de uma fronteira entre países com números DIFERENTES
 * (ex.: Brasil × Paraguai), a simplificação do mapa (~2 km) e o erro do GPS
 * não permitem afirmar o país: devolve null, e o app usa 112 — o padrão 3GPP
 * faz o celular tratar 112 como emergência e a rede encaminha ao socorro
 * local (no Brasil, a Anatel aceita 112 e 911 desde 2013). Discar 192 do lado
 * paraguaio não chamaria ninguém.
 */
import * as Localization from 'expo-localization';
import { EMERGENCY_NUMBERS_BY_COUNTRY, getEmergencyNumbersForCountry } from '../data/emergencyNumbersByCountry';
import { FRONTEIRAS_PAISES } from '../data/fronteirasPaises';

// Faixa de dúvida junto a fronteira com número diferente. Cobre o erro do
// mapa simplificado (~2 km) + o do GPS em cidade (até centenas de metros) com
// folga; do lado de dentro dela, o país é afirmado.
const FAIXA_FRONTEIRA_KM = 8;
// Posição fora de qualquer contorno (litoral simplificado, barco perto da
// costa): vale o país mais próximo até esta distância.
const ALCANCE_COSTA_KM = 15;
// Pré-filtro por retângulo, em centésimos de grau (0,5°).
const MARGEM_BBOX = 50;

const decodificados = new Map();
function poligonosDe(pais) {
    let p = decodificados.get(pais.c);
    if (!p) {
        // Texto compacto (ver o gerador): "|" polígonos, ";" anéis, "," números.
        p = pais.p.split('|').map((poligono) => poligono.split(';').map((anel) => {
            const flat = anel.split(',');
            const pts = [];
            let lon = 0; let lat = 0;
            for (let i = 0; i < flat.length; i += 2) {
                lon += +flat[i]; lat += +flat[i + 1];
                pts.push([lon / 100, lat / 100]);
            }
            return pts;
        }));
        decodificados.set(pais.c, p);
    }
    return p;
}

function dentroDoAnel(lon, lat, anel) {
    let dentro = false;
    for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
        const [xi, yi] = anel[i]; const [xj, yj] = anel[j];
        if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) dentro = !dentro;
    }
    return dentro;
}

function dentroDoPais(pais, lon, lat) {
    return poligonosDe(pais).some(([contorno, ...buracos]) =>
        dentroDoAnel(lon, lat, contorno) && !buracos.some((b) => dentroDoAnel(lon, lat, b)));
}

/** Distância (km) da posição até a linha de fronteira/costa mais próxima do país. */
function distanciaKm(pais, lon, lat) {
    const kx = 111.32 * Math.cos((lat * Math.PI) / 180); const ky = 110.57;
    const px = lon * kx; const py = lat * ky;
    let min = Infinity;
    for (const aneis of poligonosDe(pais)) {
        for (const anel of aneis) {
            for (let i = 1; i < anel.length; i++) {
                const ax = anel[i - 1][0] * kx; const ay = anel[i - 1][1] * ky;
                const dx = anel[i][0] * kx - ax; const dy = anel[i][1] * ky - ay;
                const l2 = dx * dx + dy * dy;
                const t = l2 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2)) : 0;
                const d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
                if (d < min) min = d;
            }
        }
    }
    return min;
}

/** Assinatura de discagem: dois países "discam igual" se socorro, bombeiros e polícia coincidem. */
function discagem(c) {
    const n = getEmergencyNumbersForCountry(c);
    return [n.samu || n.geral, n.bombeiros || n.geral, n.policia || n.geral].join('/');
}

/**
 * País pela posição.
 * @returns {{pais: string|null, motivo: 'dentro'|'costa'|'fronteira'|'fora'}}
 *   pais null = não dá para afirmar (fronteira com número diferente, ou mar
 *   aberto) — o chamador usa o genérico (112).
 */
export function paisPelaPosicao(latitude, longitude) {
    const lat100 = latitude * 100; const lon100 = longitude * 100;
    const candidatos = FRONTEIRAS_PAISES.filter(({ b }) =>
        lat100 >= b[0] - MARGEM_BBOX && lat100 <= b[2] + MARGEM_BBOX
        && lon100 >= b[1] - MARGEM_BBOX && lon100 <= b[3] + MARGEM_BBOX);

    const casa = candidatos.find((p) => dentroDoPais(p, longitude, latitude));
    const perto = (km) => candidatos
        .filter((p) => p !== casa)
        .map((p) => ({ p, d: distanciaKm(p, longitude, latitude) }))
        .filter((x) => x.d <= km)
        .sort((a, b) => a.d - b.d);

    if (casa) {
        const diferentes = perto(FAIXA_FRONTEIRA_KM).filter((x) => discagem(x.p.c) !== discagem(casa.c));
        return diferentes.length ? { pais: null, motivo: 'fronteira' } : { pais: casa.c, motivo: 'dentro' };
    }
    const proximos = perto(ALCANCE_COSTA_KM);
    if (!proximos.length) return { pais: null, motivo: 'fora' };
    const ambiguo = proximos.some((x) => discagem(x.p.c) !== discagem(proximos[0].p.c));
    return ambiguo ? { pais: null, motivo: 'fronteira' } : { pais: proximos[0].p.c, motivo: 'costa' };
}

/** Nome do país no idioma pedido ('pt' | 'en' | 'es'), ou null. */
export function nomeDoPais(codigo, idioma = 'pt') {
    const p = codigo && FRONTEIRAS_PAISES.find((x) => x.c === codigo);
    if (!p) return null;
    return p.n[{ pt: 0, en: 1, es: 2 }[idioma] ?? 0];
}

/** País da Região configurada no aparelho (só os países com números verificados). */
export function paisDoAparelho() {
    try {
        const region = Localization.getLocales()[0]?.regionCode;
        if (region && EMERGENCY_NUMBERS_BY_COUNTRY[region]) return region;
    } catch (_) {
        // Sem sinal de região disponível — segue para o genérico.
    }
    return null;
}

/**
 * @param {{latitude:number, longitude:number}|null} coords - de getEmergencyLocation()
 * @returns {string|null} ISO do país; com coords, é o país FÍSICO (pode ser
 *   qualquer um dos 238, ou null na dúvida); sem coords, o do aparelho.
 */
export function detectEmergencyCountry(coords) {
    if (coords?.latitude != null && coords?.longitude != null) {
        return paisPelaPosicao(coords.latitude, coords.longitude).pais;
    }
    return paisDoAparelho();
}
