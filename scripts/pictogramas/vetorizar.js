/**
 * vetorizar.js — refaz o acabamento dos pictogramas SEM redesenhar a forma.
 *
 * O problema de redesenhar por geometria à mão é a fidelidade: o desenho de
 * cada peça foi fechado por tentativa e erro e não deve mudar. Aqui a silhueta
 * vem do PRÓPRIO ASSET ATUAL — fidelidade por construção, não por capricho.
 *
 * Como funciona:
 *   1. lê o PNG atual e separa o glifo (verde escuro) do tile creme,
 *      ignorando a moldura embutida perto da borda
 *   2. calcula o campo de distância com sinal (SDF) dessa silhueta
 *   3. reamostra o SDF no tamanho alvo — campo de distância interpola liso,
 *      então a aresta sai limpa mesmo partindo de um asset pequeno
 *   4. aplica a mesma receita de material da amostra: chanfro, luz de cima à
 *      esquerda, oclusão, realce de quina e sombra de contato
 *   5. desenha o tile squircle por código, com os tokens do DS
 *
 * Uso: node scripts/pictogramas/vetorizar.js --peca cuidar-e-proteger [--lado 1024]
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const RAIZ = path.join(__dirname, '..', '..');
const ORIGEM = path.join(RAIZ, 'assets', 'illustrations', 'home-pictograms');
const SAIDA = path.join(RAIZ, 'assets', 'illustrations', '_gerados', 'vetor');

const CREME = [244, 235, 220];
const VERDE = [20, 52, 43];
const VERDE_LUZ = [46, 92, 74];
const BORDA_TILE = [214, 203, 186];

const mix = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const suave = (b0, b1, x) => { const t = clamp((x - b0) / (b1 - b0), 0, 1); return t * t * (3 - 2 * t); };

/**
 * Descarta as partes que encostam na borda do recorte.
 *
 * A moldura verde embutida no PNG é escura como o glifo, então entra na
 * máscara por cor. O que a distingue é a posição: ela abraça a borda, e o
 * desenho vive no miolo. Rotulamos as regiões conectadas e jogamos fora
 * qualquer uma que toque a margem.
 */
function descartarMoldura(mask, w, h, mx, my) {
    const rotulo = new Int32Array(w * h).fill(-1);
    const fila = new Int32Array(w * h);
    let atual = 0;
    const tocaBorda = [];

    for (let s = 0; s < w * h; s++) {
        if (mask[s] <= 0.5 || rotulo[s] !== -1) continue;
        let ini = 0, fim = 0;
        fila[fim++] = s; rotulo[s] = atual;
        let encosta = false;
        while (ini < fim) {
            const p = fila[ini++];
            const x = p % w, y = (p / w) | 0;
            // encostar na borda do RECORTE (não da imagem): a moldura foi
            // cortada pela margem, então seus pedaços flutuam no meio do quadro
            if (x <= mx + 1 || y <= my + 1 || x >= w - mx - 2 || y >= h - my - 2) encosta = true;
            const viz = [p - 1, p + 1, p - w, p + w];
            for (let k = 0; k < 4; k++) {
                const q = viz[k];
                if (q < 0 || q >= w * h) continue;
                if (k < 2 && Math.abs((q % w) - x) !== 1) continue;  // não vazar de linha
                if (mask[q] > 0.5 && rotulo[q] === -1) { rotulo[q] = atual; fila[fim++] = q; }
            }
        }
        tocaBorda[atual] = encosta;
        atual++;
    }
    for (let i = 0; i < w * h; i++) {
        if (mask[i] > 0.5 && tocaBorda[rotulo[i]]) mask[i] = 0;
    }
    return mask;
}

/** Máscara do glifo: escuro o bastante, e longe da moldura embutida. */
function extrairMascara(png, margem = 0.11) {
    const { width: w, height: h, data } = png;
    const mx = Math.round(w * margem), my = Math.round(h * margem);
    const m = new Float32Array(w * h);
    const cob = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
            const dentro = x > mx && x < w - mx && y > my && y < h - my;
            // o glifo é bem mais escuro que o creme (~235) e que o branco externo
            m[y * w + x] = (dentro && lum < 140) ? 1 : 0;
            // cobertura suave: 1 no miolo do glifo, 0 no creme, fracionária na aresta
            cob[y * w + x] = dentro ? clamp((160 - lum) / 45, 0, 1) : 0;
        }
    }
    descartarMoldura(m, w, h, mx, my);
    for (let i = 0; i < w * h; i++) if (m[i] <= 0.5 && cob[i] > 0) cob[i] = Math.min(cob[i], 0.5);
    return { mask: m, cobertura: cob };
}

/** Transformada de distância exata (Felzenszwalb), 1D por eixo. */
function edt1d(f, n) {
    const d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
    let k = 0; v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
    for (let q = 1; q < n; q++) {
        let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
        k++; v[k] = q; z[k] = s; z[k + 1] = Infinity;
    }
    k = 0;
    for (let q = 0; q < n; q++) {
        while (z[k + 1] < q) k++;
        d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
    }
    return d;
}

function distancia(mask, w, h, dentro) {
    const INF = 1e12;
    const f = new Float64Array(w * h);
    for (let i = 0; i < w * h; i++) f[i] = (dentro ? mask[i] > 0.5 : mask[i] <= 0.5) ? INF : 0;
    const col = new Float64Array(h), lin = new Float64Array(w);
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) col[y] = f[y * w + x];
        const d = edt1d(col, h);
        for (let y = 0; y < h; y++) f[y * w + x] = d[y];
    }
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) lin[x] = f[y * w + x];
        const d = edt1d(lin, w);
        for (let x = 0; x < w; x++) f[y * w + x] = Math.sqrt(d[x]);
    }
    return f;
}

/**
 * SDF: negativo dentro, positivo fora.
 *
 * `distancia(..., true)` semeia nos pixels de FORA, então devolve, para cada
 * ponto, a distância até o fundo — é ela que mede a profundidade de quem está
 * dentro. O oposto vale para `false`. Trocar os dois zera o campo inteiro e o
 * pictograma sai chapado.
 */
function construirSDF(mask, w, h, cobertura) {
    const ateOFundo = distancia(mask, w, h, true);
    const ateOGlifo = distancia(mask, w, h, false);
    const sdf = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) sdf[i] = mask[i] > 0.5 ? -ateOFundo[i] : ateOGlifo[i];

    // REFINO DE SUBPIXEL. A máscara é binária, então a borda do campo anda de
    // pixel em pixel e vira escada ao ampliar. O PNG de origem, porém, já tem
    // antialias: a cobertura fracionária de cada pixel diz onde a aresta cai
    // DENTRO dele. Deslocar o campo por (0.5 - cobertura) na faixa da borda
    // devolve essa precisão — é o que troca o degrau por uma curva limpa.
    if (cobertura) {
        for (let i = 0; i < w * h; i++) {
            if (Math.abs(sdf[i]) <= 1.5) sdf[i] += (0.5 - cobertura[i]);
        }
    }
    return suavizarCampo(sdf, w, h, 1.6);
}

/**
 * Borra levemente o campo de distancia. A mascara veio de pixels, entao o
 * contorno do campo ondula de pixel em pixel — e a ondulacao vira escada ao
 * ampliar. Borrar o CAMPO (e nao a imagem) alisa o contorno mantendo a forma,
 * porque a distancia e continua por natureza.
 */
function suavizarCampo(campo, w, h, raio) {
    const r = Math.max(1, Math.round(raio));
    const tmp = new Float32Array(w * h), out = new Float32Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        let soma = 0, n = 0;
        for (let k = -r; k <= r; k++) { const xx = clamp(x + k, 0, w - 1); soma += campo[y * w + xx]; n++; }
        tmp[y * w + x] = soma / n;
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        let soma = 0, n = 0;
        for (let k = -r; k <= r; k++) { const yy = clamp(y + k, 0, h - 1); soma += tmp[yy * w + x]; n++; }
        out[y * w + x] = soma / n;
    }
    return out;
}

/** Caixa do glifo, para recentralizar e padronizar a ocupação. */
function caixa(mask, w, h) {
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (mask[y * w + x] > 0.5) {
        if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y;
    }
    return { x0, y0, x1, y1 };
}

function sdfTile(x, y, S) {
    const c = 0.5 * S, a = 0.46 * S, n = 5;
    const u = Math.abs((x - c) / a), v = Math.abs((y - c) / a);
    return (Math.pow(Math.pow(u, n) + Math.pow(v, n), 1 / n) - 1) * a;
}

function render(peca, S, ocupacao) {
    const src = PNG.sync.read(fs.readFileSync(path.join(ORIGEM, `${peca}.png`)));
    const { width: w, height: h } = src;
    const { mask, cobertura } = extrairMascara(src);
    const sdf = construirSDF(mask, w, h, cobertura);
    const cx = caixa(mask, w, h);
    const larg = cx.x1 - cx.x0 + 1, alt = cx.y1 - cx.y0 + 1;

    // escala origem → destino, mantendo a mesma ocupação em todas as peças
    const escala = (S * ocupacao) / Math.max(larg, alt);
    const offX = (S - larg * escala) / 2, offY = (S - alt * escala) / 2;

    // amostra bilinear do SDF (em unidades de pixel do destino)
    const amostra = (dx, dy) => {
        const sx = cx.x0 + (dx - offX) / escala, sy = cx.y0 + (dy - offY) / escala;
        const x0 = Math.floor(sx), y0 = Math.floor(sy);
        const tx = sx - x0, ty = sy - y0;
        const get = (x, y) => sdf[clamp(y, 0, h - 1) * w + clamp(x, 0, w - 1)];
        const v = mix(mix(get(x0, y0), get(x0 + 1, y0), tx), mix(get(x0, y0 + 1), get(x0 + 1, y0 + 1), tx), ty);
        return v * escala;                     // distância na escala do destino
    };

    const png = new PNG({ width: S, height: S });
    const luz = (() => { const v = [-0.55, -0.72, 0.42], m = Math.hypot(...v); return v.map(c => c / m); })();
    const bevel = 0.017 * S;

    for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
            const i = (y * S + x) * 4;
            const px = x + 0.5, py = y + 0.5;

            const dTile = sdfTile(px, py, S);
            const dentroTile = 1 - suave(-0.0018 * S, 0.0018 * S, dTile);
            if (dentroTile <= 0.002) { png.data[i + 3] = 0; continue; }

            const casca = suave(-0.016 * S, 0, dTile);
            let r = mix(CREME[0], BORDA_TILE[0], casca * 0.9);
            let g = mix(CREME[1], BORDA_TILE[1], casca * 0.9);
            let b = mix(CREME[2], BORDA_TILE[2], casca * 0.9);

            const dSombra = amostra(px, py - 0.007 * S);
            const sombra = (1 - suave(0, 0.028 * S, dSombra)) * 0.14;
            r *= (1 - sombra); g *= (1 - sombra); b *= (1 - sombra);

            const d = amostra(px, py);
            const aa = 0.0016 * S;
                const cobertura = 1 - suave(-aa, aa, d);
            if (cobertura > 0.001) {
                const prof = clamp(-d / bevel, 0, 1);
                const hh = Math.sqrt(Math.max(0, 1 - Math.pow(prof - 1, 2)));
                const e = 1.0;
                const gx = (amostra(px + e, py) - amostra(px - e, py)) / (2 * e);
                const gy = (amostra(px, py + e) - amostra(px, py - e)) / (2 * e);
                const inclina = 1 - prof;
                let nx = gx * inclina, ny = gy * inclina, nz = mix(1, 0.35, inclina * 0.9) * (0.4 + hh * 0.6);
                const m = Math.hypot(nx, ny, nz) || 1; nx /= m; ny /= m; nz /= m;

                const lambert = clamp(nx * luz[0] + ny * luz[1] + nz * luz[2], 0, 1);
                const brilho = Math.pow(lambert, 14) * 0.32;
                const tom = 0.30 + 0.70 * lambert;
                const gr = mix(VERDE[0], VERDE_LUZ[0], tom) + brilho * 190;
                const gg = mix(VERDE[1], VERDE_LUZ[1], tom) + brilho * 190;
                const gb = mix(VERDE[2], VERDE_LUZ[2], tom) + brilho * 190;
                r = mix(r, clamp(gr, 0, 255), cobertura);
                g = mix(g, clamp(gg, 0, 255), cobertura);
                b = mix(b, clamp(gb, 0, 255), cobertura);
            }

            png.data[i] = clamp(Math.round(r), 0, 255);
            png.data[i + 1] = clamp(Math.round(g), 0, 255);
            png.data[i + 2] = clamp(Math.round(b), 0, 255);
            png.data[i + 3] = Math.round(clamp(dentroTile, 0, 1) * 255);
        }
    }
    return png;
}

function renderSS(peca, S, ocupacao, fator = 3) {
    const g = render(peca, S * fator, ocupacao);
    const out = new PNG({ width: S, height: S });
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        let r = 0, gg = 0, b = 0, a = 0;
        for (let j = 0; j < fator; j++) for (let i2 = 0; i2 < fator; i2++) {
            const k = ((y * fator + j) * S * fator + (x * fator + i2)) * 4;
            const al = g.data[k + 3] / 255;
            r += g.data[k] * al; gg += g.data[k + 1] * al; b += g.data[k + 2] * al; a += al;
        }
        const d = (y * S + x) * 4, n = fator * fator;
        out.data[d] = a > 0 ? Math.round(r / a) : 0;
        out.data[d + 1] = a > 0 ? Math.round(gg / a) : 0;
        out.data[d + 2] = a > 0 ? Math.round(b / a) : 0;
        out.data[d + 3] = Math.round((a / n) * 255);
    }
    return out;
}

const arg = (n, p) => { const a = process.argv.slice(2); const i = a.indexOf('--' + n); return i >= 0 && a[i + 1] ? a[i + 1] : p; };
const peca = arg('peca', 'cuidar-e-proteger');
const ocup = Number(arg('ocupacao', 0.70));
fs.mkdirSync(SAIDA, { recursive: true });
for (const lado of [Number(arg('lado', 1024)), 510]) {
    const arquivo = path.join(SAIDA, `${peca}-traced-${lado}.png`);
    fs.writeFileSync(arquivo, PNG.sync.write(renderSS(peca, lado, ocup, 3)));
    console.log('gerado', path.relative(RAIZ, arquivo));
}
