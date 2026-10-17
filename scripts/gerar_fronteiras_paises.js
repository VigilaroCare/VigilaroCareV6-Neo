/**
 * gerar_fronteiras_paises.js — gera data/fronteirasPaises.js a partir do
 * Natural Earth (fronteiras de países, DOMÍNIO PÚBLICO — "No permission is
 * needed to use Natural Earth", naturalearthdata.com/about/terms-of-use).
 *
 * Por que existe (17/10/2026): o app precisa saber em que PAÍS a pessoa está,
 * sem internet, para mostrar o número de emergência certo a quem viaja. O
 * contorno do Brasil desenhado à mão deixava Maceió "fora do Brasil".
 *
 * Uso:
 *   curl -L -o ne50.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_0_countries.geojson
 *   node scripts/gerar_fronteiras_paises.js ne50.geojson [tolerancia_graus=0.01]
 *
 * Saída compacta: coordenadas em centésimos de grau (~1,1 km), cada anel
 * codificado em diferenças sucessivas. A simplificação (Douglas-Peucker) e o
 * arredondamento somam erro de 1–2 km — por isso a detecção trata a faixa
 * perto de fronteira como "indefinida" (ver utils/getEmergencyCountry.js).
 */
const fs = require('fs');
const path = require('path');

const [, , entrada, tolArg] = process.argv;
if (!entrada) { console.error('uso: node scripts/gerar_fronteiras_paises.js <ne_50m_admin_0_countries.geojson> [tolerancia]'); process.exit(1); }
const TOL = Number(tolArg || 0.01);

function distSeg(p, a, b) {
    const dx = b[0] - a[0]; const dy = b[1] - a[1];
    const t = dx || dy ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy))) : 0;
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}
function dp(pts, tol) {
    if (pts.length <= 4) return pts;
    const manter = new Uint8Array(pts.length); manter[0] = manter[pts.length - 1] = 1;
    const pilha = [[0, pts.length - 1]];
    while (pilha.length) {
        const [i, j] = pilha.pop();
        let max = 0; let idx = -1;
        for (let k = i + 1; k < j; k++) { const d = distSeg(pts[k], pts[i], pts[j]); if (d > max) { max = d; idx = k; } }
        if (max > tol && idx > 0) { manter[idx] = 1; pilha.push([i, idx], [idx, j]); }
    }
    const out = pts.filter((_, k) => manter[k]);
    return out.length >= 4 ? out : pts.slice(0, 4);
}
function codificar(anel) {
    const q = anel.map(([lon, lat]) => [Math.round(lon * 100), Math.round(lat * 100)]);
    const sem = q.filter((p, i) => i === 0 || p[0] !== q[i - 1][0] || p[1] !== q[i - 1][1]);
    if (sem.length < 4) return null;
    const flat = [sem[0][0], sem[0][1]];
    for (let i = 1; i < sem.length; i++) flat.push(sem[i][0] - sem[i - 1][0], sem[i][1] - sem[i - 1][1]);
    return flat;
}

const g = JSON.parse(fs.readFileSync(entrada, 'utf8'));
const paises = [];
let pontos = 0;
for (const ft of g.features) {
    const p = ft.properties;
    const cod = [p.ISO_A2_EH, p.ISO_A2].find((c) => c && c !== '-99');
    if (!cod) continue; // Somaliland, N. Chipre, Siachen: sem código ISO — caem no genérico (112)
    const polys = ft.geometry.type === 'Polygon' ? [ft.geometry.coordinates] : ft.geometry.coordinates;
    const poligonos = [];
    let bb = [Infinity, Infinity, -Infinity, -Infinity];
    for (const pl of polys) {
        const aneis = pl.map((r) => codificar(dp(r, TOL))).filter(Boolean);
        if (!aneis.length) continue;
        for (const [lon, lat] of pl[0]) bb = [Math.min(bb[0], lat), Math.min(bb[1], lon), Math.max(bb[2], lat), Math.max(bb[3], lon)];
        aneis.forEach((a) => (pontos += a.length / 2));
        poligonos.push(aneis);
    }
    if (!poligonos.length) continue;
    paises.push({
        c: cod,
        n: [p.NAME_PT || p.NAME, p.NAME_EN || p.NAME, p.NAME_ES || p.NAME],
        b: bb.map((v) => Math.round(v * 100)),
        // Texto, não array: no bytecode do Hermes um array literal de números
        // ocupa ~5x mais que a mesma informação numa string (20,3 MB → ~18,9).
        // Polígonos separados por "|", anéis por ";", números por ",".
        p: poligonos.map((aneis) => aneis.map((a) => a.join(',')).join(';')).join('|'),
    });
}
paises.sort((a, b) => a.c.localeCompare(b.c));

const cab = `/**
 * fronteirasPaises.js — GERADO por scripts/gerar_fronteiras_paises.js. Não editar à mão.
 * Fonte: Natural Earth 1:50m Admin 0 Countries v5.1.2 — domínio público.
 * Tolerância de simplificação: ${TOL}°. ${paises.length} países, ${pontos} pontos.
 * Formato: c = ISO 3166-1 alfa-2; n = [nome pt, en, es]; b = [latMin, lonMin,
 * latMax, lonMax] em centésimos de grau; p = texto: polígonos "|", anéis ";" (o 1º é o
 * contorno, os demais buracos), números "," -> lon0,lat0,dlon1,dlat1... em centésimos.
 */
/* eslint-disable */
`;
const corpo = 'export const FRONTEIRAS_PAISES = [\n' + paises.map((x) => JSON.stringify(x)).join(',\n') + '\n];\n';
const destino = path.join(__dirname, '..', 'data', 'fronteirasPaises.js');
fs.writeFileSync(destino, cab + corpo);
console.log(`${paises.length} países, ${pontos} pontos, ${(fs.statSync(destino).size / 1024).toFixed(0)} KB → data/fronteirasPaises.js`);
