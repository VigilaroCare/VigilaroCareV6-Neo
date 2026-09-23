/**
 * normalizar_pictogramas.js — padroniza os pictogramas SEM redesenhar nada.
 *
 * O acervo é bom peça a peça e desalinhado como conjunto. Medição de 61 peças:
 * a ocupação do quadro varia de 37,6% a 61,9%, a cor média varia 21 níveis de
 * luminância e há peças até 8,7% fora do centro óptico. É isso que o olho lê
 * como "não foi desenhado junto" — não a qualidade de cada desenho.
 *
 * Este script corrige o ENQUADRAMENTO e a COR, preservando o desenho:
 *   1. separa o glifo do tile e da moldura embutida
 *   2. recupera a cor real do glifo desfazendo a mistura com o creme da borda
 *      (o que preserva a suavidade original da aresta)
 *   3. reancora a cor no verde único, MANTENDO a modulação de luz e sombra —
 *      cada pixel guarda sua razão com a média, então o volume não achata
 *   4. reescala para ocupação uniforme e centraliza pelo centro de massa
 *   5. exporta em fundo transparente, nas densidades que o React Native usa
 *
 * O tile creme, o canto e a sombra passam a ser desenhados pelo PictogramTile.
 *
 * Uso: node scripts/normalizar_pictogramas.js [--pasta home-pictograms] [--base 180]
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const RAIZ = path.join(__dirname, '..');
const ORIGEM = path.join(RAIZ, 'assets', 'illustrations');
const DESTINO = path.join(ORIGEM, 'glifos');

// Verde único de todo o acervo — primary900. Mede 8,22:1 sobre o creme do
// tile, acima do nível AAA da norma, e continua legível a 24px.
const VERDE_ALVO = [6, 78, 59];
const CREME = [244, 235, 220];

// ── TAMANHO ÓPTICO ──────────────────────────────────────────────────────────
// Igualar a CAIXA de cada desenho não funciona: com todas em 52% de caixa, a
// área de tinta variou 3,4x entre as peças (de 3,9% a 13,4%), e a grade ficou
// visivelmente desproporcional — a pata parecia pesada, a linha de pulso
// parecia perdida. O olho pesa a tinta, não a caixa.
//
// Também não serve igualar só a tinta: a linha de pulso precisaria crescer
// 58% e estouraria o tile. O equilíbrio é a média geométrica entre as duas
// normalizações, com a caixa presa numa faixa.
const TINTA_ALVO = 0.097;     // mediana medida do conjunto
const CAIXA_ALVO = 0.52;
const CAIXA_MIN = 0.46;
const CAIXA_MAX = 0.66;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function componentesValidos(mask, w, h, mx, my) {
    const rot = new Int32Array(w * h).fill(-1);
    const fila = new Int32Array(w * h);
    const toca = [];
    let n = 0;
    for (let s = 0; s < w * h; s++) {
        if (!mask[s] || rot[s] !== -1) continue;
        let ini = 0, fim = 0; fila[fim++] = s; rot[s] = n;
        let borda = false;
        while (ini < fim) {
            const p = fila[ini++], x = p % w, y = (p / w) | 0;
            // a moldura embutida é o que encosta na borda do recorte
            if (x <= mx + 1 || y <= my + 1 || x >= w - mx - 2 || y >= h - my - 2) borda = true;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const nx = x + dx, ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                const q = ny * w + nx;
                if (mask[q] && rot[q] === -1) { rot[q] = n; fila[fim++] = q; }
            }
        }
        toca[n] = borda; n++;
    }
    for (let i = 0; i < w * h; i++) if (mask[i] && toca[rot[i]]) mask[i] = 0;
    return mask;
}

/**
 * Extrai o glifo com alfa suave.
 *
 * O pixel da aresta é uma MISTURA de glifo e creme. Tratá-lo como "dentro ou
 * fora" serrilha a borda; aqui a proporção da mistura vira o alfa, e a cor
 * verdadeira do glifo é recuperada desfazendo a mistura. É o que mantém a
 * suavidade que o desenho original já tinha.
 */
function extrair(png) {
    const { width: w, height: h, data } = png;
    const mx = Math.round(w * 0.11), my = Math.round(h * 0.11);
    const Lcreme = lum(...CREME);

    // núcleo do glifo, para achar os componentes e descartar a moldura
    const nucleo = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const L = lum(data[i], data[i + 1], data[i + 2]);
        if (x > mx && x < w - mx && y > my && y < h - my && L < 140) nucleo[y * w + x] = 1;
    }
    componentesValidos(nucleo, w, h, mx, my);

    // alfa por desmistura, restrito à vizinhança do núcleo aprovado
    const alfa = new Float32Array(w * h);
    const cor = new Float32Array(w * h * 3);
    const R = 3;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const p = y * w + x;
        let perto = false;
        for (let dy = -R; dy <= R && !perto; dy++) for (let dx = -R; dx <= R; dx++) {
            const nx = clamp(x + dx, 0, w - 1), ny = clamp(y + dy, 0, h - 1);
            if (nucleo[ny * w + nx]) { perto = true; break; }
        }
        if (!perto) continue;
        const i = p * 4;
        const L = lum(data[i], data[i + 1], data[i + 2]);
        const a = clamp((Lcreme - L) / (Lcreme - 40), 0, 1);
        if (a <= 0.004) continue;
        alfa[p] = a;
        // desfaz a mistura com o creme: C = (P - (1-a)*creme) / a
        for (let c = 0; c < 3; c++) {
            cor[p * 3 + c] = clamp((data[i + c] - (1 - a) * CREME[c]) / a, 0, 255);
        }
    }
    return { alfa, cor };
}

function processar(arquivo, base) {
    const src = PNG.sync.read(fs.readFileSync(arquivo));
    const { width: w, height: h } = src;
    const { alfa, cor } = extrair(src);

    // caixa, centro de massa, luminância média e ÁREA DE TINTA do glifo
    let x0 = w, y0 = h, x1 = -1, y1 = -1, peso = 0, sx = 0, sy = 0, sL = 0, tinta = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const p = y * w + x, a = alfa[p];
        if (a > 0.03) tinta += a;                      // cobertura real, com a borda suave
        if (a < 0.5) continue;
        if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y;
        peso += a; sx += x * a; sy += y * a;
        sL += lum(cor[p * 3], cor[p * 3 + 1], cor[p * 3 + 2]) * a;
    }
    if (x1 < 0) return null;
    const Lmedia = sL / peso;
    const cmx = sx / peso, cmy = sy / peso;            // centro de MASSA, não da caixa
    const lado = Math.max(x1 - x0 + 1, y1 - y0 + 1);

    const saidas = [];
    let caixaFinal = 0;
    for (const [suf, mult] of [['', 1], ['@2x', 2], ['@3x', 3]]) {
        const S = Math.round(base * mult);

        // Duas escalas concorrentes: uma iguala a caixa, a outra iguala a
        // tinta. A média geométrica fica entre as duas — desenho fino cresce,
        // desenho cheio encolhe — e a faixa impede qualquer extremo.
        const porCaixa = (S * CAIXA_ALVO) / lado;
        const porTinta = Math.sqrt((TINTA_ALVO * S * S) / tinta);
        let escala = Math.sqrt(porCaixa * porTinta);
        const caixa = (lado * escala) / S;
        if (caixa > CAIXA_MAX) escala = (S * CAIXA_MAX) / lado;
        if (caixa < CAIXA_MIN) escala = (S * CAIXA_MIN) / lado;
        caixaFinal = (lado * escala) / S;
        const out = new PNG({ width: S, height: S });
        out.data.fill(0);
        // amostragem com supersampling 2x2 — a redução do original pede filtro
        const F = 2;
        for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
            let ar = 0, ag = 0, ab = 0, aa = 0;
            for (let j = 0; j < F; j++) for (let i2 = 0; i2 < F; i2++) {
                // do destino para a origem, alinhando o centro de massa ao centro
                const dx = x + (i2 + 0.5) / F - S / 2;
                const dy = y + (j + 0.5) / F - S / 2;
                const ox = Math.round(cmx + dx / escala);
                const oy = Math.round(cmy + dy / escala);
                if (ox < 0 || oy < 0 || ox >= w || oy >= h) continue;
                const p = oy * w + ox, a = alfa[p];
                if (a <= 0) continue;
                // REANCORAGEM DE COR: a razão entre a luminância do pixel e a
                // média do glifo é o que carrega o volume. Multiplicar o verde
                // alvo por essa razão troca a cor sem achatar luz e sombra.
                const r = lum(cor[p * 3], cor[p * 3 + 1], cor[p * 3 + 2]) / Lmedia;
                ar += clamp(VERDE_ALVO[0] * r, 0, 255) * a;
                ag += clamp(VERDE_ALVO[1] * r, 0, 255) * a;
                ab += clamp(VERDE_ALVO[2] * r, 0, 255) * a;
                aa += a;
            }
            const n = F * F, d = (y * S + x) * 4;
            if (aa > 0) {
                out.data[d] = Math.round(ar / aa);
                out.data[d + 1] = Math.round(ag / aa);
                out.data[d + 2] = Math.round(ab / aa);
                out.data[d + 3] = Math.round((aa / n) * 255);
            }
        }
        const nome = path.basename(arquivo, '.png') + suf + '.png';
        fs.mkdirSync(DESTINO, { recursive: true });
        fs.writeFileSync(path.join(DESTINO, nome), PNG.sync.write(out));
        saidas.push(nome);
    }
    return { ocupacaoOriginal: lado / w, caixaFinal, tinta: tinta / (w * h), saidas };
}

const arg = (n, p) => { const a = process.argv.slice(2), i = a.indexOf('--' + n); return i >= 0 && a[i + 1] ? a[i + 1] : p; };
const pasta = arg('pasta', 'home-pictograms');
const base = Number(arg('base', 180));
const dir = path.join(ORIGEM, pasta);
const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));

console.log(`Normalizando ${arquivos.length} peça(s) de ${pasta} — verde único, tamanho óptico, base ${base}px.`);
for (const f of arquivos) {
    const r = processar(path.join(dir, f), base);
    console.log('  ' + f.padEnd(34), r ? 'caixa ' + (r.caixaFinal * 100).toFixed(0) + '% (tinta equilibrada)' : 'FALHOU: glifo nao encontrado');
}
console.log(`\nGlifos em assets/illustrations/glifos/ (1x, @2x, @3x). Originais intactos.`);
