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
 *      [--caixa 0.73] [--saida glifos-justos] [--alvo "#064E3B"]
 *      --limpo  quando a arte de origem JA vem transparente, sem o tile creme
 *               e sem a moldura pintados (o formato novo; ver extrairLimpo)
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const arg = (n, p) => { const a = process.argv.slice(2), i = a.indexOf('--' + n); return i >= 0 && a[i + 1] ? a[i + 1] : p; };
const RAIZ = path.join(__dirname, '..');
const ORIGEM = path.join(RAIZ, 'assets', 'illustrations');
// DESTINO e resolvido depois das opcoes (--saida); ver o rodape do ficheiro.
let DESTINO = path.join(ORIGEM, 'glifos');

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

// --caixa <n>: o alvo de OCUPAÇÃO do quadro, e com ele TODA a escala óptica.
//
// O padrão 0,52 foi calibrado para o glifo morar DENTRO do tile creme, com
// respiro até a moldura. No card retroiluminado (prancha L, 25/10/2026) não há
// tile: a margem vira desperdício. Medido em 22 peças, o desenho ocupa 52% do
// lado do arquivo — numa caixa de 78px na tela sobram 41px de desenho, e numa
// de 58px (grade de 3 colunas) sobram 30px. É isso que o olho lê como
// "pictograma desproporcional".
//
// Por que mexer aqui NÃO desequilibra o conjunto: a escala de cada peça é a
// média geométrica entre igualar a CAIXA e igualar a TINTA. A caixa é lado
// (escala linear), a tinta é área (escala com o quadrado). Movendo os dois
// alvos juntos nessa razão, a média geométrica inteira é multiplicada pelo
// mesmo fator: a ponderação RELATIVA entre as peças fica idêntica e só o
// tamanho absoluto muda. Verificado — com --caixa 0.52 a saída é byte a byte
// igual aos glifos em produção (22 de 22), e --caixa 0.73 preserva o mesmo
// espalhamento relativo (47–58% vira 66–81%, 21% do alvo nos dois casos).
const CAIXA_ALVO = Number(arg('caixa', 0.52));
const _fator = CAIXA_ALVO / 0.52;
const TINTA_ALVO = 0.097 * _fator * _fator;
const CAIXA_MIN = 0.46 * _fator;
const CAIXA_MAX = Math.min(0.66 * _fator, 0.90);

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

// Arte JA LIMPA: desenho em fundo transparente, sem tile nem moldura pintados.
// A `extrair()` acima existe para a arte ANTIGA, que vinha sobre o tile creme —
// ela identifica o creme e desfaz a mistura para recuperar a cor do glifo. Numa
// arte transparente nao ha creme de onde partir, e essa matematica apaga o
// desenho (medido em 23/10/2026: a moto saiu com 0,05% de tinta, uns respingos).
// Aqui o alfa e a cor ja sao os do proprio PNG; o resto do pipeline — tamanho
// optico, centro de massa, verde unico e as tres densidades — segue igual.
function extrairLimpo(png) {
    const { width: w, height: h, data } = png;
    const alfa = new Float32Array(w * h);
    const cor = new Float32Array(w * h * 3);
    for (let p = 0; p < w * h; p++) {
        const i = p * 4;
        alfa[p] = data[i + 3] / 255;
        cor[p * 3] = data[i]; cor[p * 3 + 1] = data[i + 1]; cor[p * 3 + 2] = data[i + 2];
    }
    return { alfa, cor };
}

function processar(arquivo, base, limpo) {
    const src = PNG.sync.read(fs.readFileSync(arquivo));
    const { width: w, height: h } = src;
    const { alfa, cor } = limpo ? extrairLimpo(src) : extrair(src);

    // caixa, centro de massa, luminância média e ÁREA DE TINTA do glifo
    let x0 = w, y0 = h, x1 = -1, y1 = -1, peso = 0, sx = 0, sy = 0, sL = 0, tinta = 0;
    // Caixa CHEIA, no limiar da borda suave. A caixa acima corta em 0,5 — é a
    // medida certa para o tamanho óptico (o olho não pesa a aresta esfumada),
    // mas a renderização pinta todo pixel com alfa > 0. Quem decide se cabe no
    // quadro é esta, não aquela.
    let ex0 = w, ey0 = h, ex1 = -1, ey1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const p = y * w + x, a = alfa[p];
        if (a > 0.03) tinta += a;                      // cobertura real, com a borda suave
        if (a > 0.02) {
            if (x < ex0) ex0 = x; if (y < ey0) ey0 = y;
            if (x > ex1) ex1 = x; if (y > ey1) ey1 = y;
        }
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
        // Arte limpa iguala pela CAIXA, não pela média com a tinta: desenho com
        // muito detalhe fino (raios, discos, grades) acumula tinta sem ganhar
        // presença, então a média o encolhe para "caber" — a moto ficou em 0,48
        // de caixa contra 0,50 do carro e pareceu menor (Agnaldo, 23/10/2026).
        // O olho compara o tamanho aparente, e esse é a caixa.
        let escala = limpo ? porCaixa : Math.sqrt(porCaixa * porTinta);
        const caixa = (lado * escala) / S;
        if (caixa > CAIXA_MAX) escala = (S * CAIXA_MAX) / lado;
        if (caixa < CAIXA_MIN) escala = (S * CAIXA_MIN) / lado;

        // TETO SEM CORTE. A peça é assentada pelo centro de MASSA, que não é o
        // centro da caixa. O teto acima olha só o LADO do desenho, então numa
        // peça de massa deslocada o lado pesado cabe e o leve transborda:
        // pictogram-companhia-idosos saiu com tinta na borda ao subir para 92%
        // de caixa. O limite real é a maior distância do centro de massa até
        // uma extremidade da caixa CHEIA (ex*/ey*, que inclui a borda suave que
        // de fato é pintada). Inerte na calibração antiga — só morde quando a
        // ocupação sobe.
        // A folga é proporcional, não de 1px: a amostragem 2x2 espalha a tinta
        // além do pixel teórico, e um quadro de 540px com 1px de margem entrega
        // o desenho encostado na moldura. 4% do semi-lado resolve nas 3
        // densidades e não muda nada abaixo do teto.
        const bracoMax = Math.max(cmx - ex0, ex1 - cmx, cmy - ey0, ey1 - cmy);
        const tetoSemCorte = (S / 2) * 0.96 / bracoMax;
        if (escala > tetoSemCorte) escala = tetoSemCorte;

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
                //
                // NÃO se aplica a arte limpa. A reancoragem existe para unificar
                // tons desencontrados do acervo ANTIGO; numa arte que já nasce no
                // verde da casa ela só satura — a moto saiu "pincelada de neon"
                // (Agnaldo, 23/10/2026). Arte limpa mantém os tons do autor.
                if ((limpo || SEM_COR) && !ALVO) {
                    // sem alvo: a cor do autor passa intacta, com o relevo que ela tem
                    ar += cor[p * 3] * a;
                    ag += cor[p * 3 + 1] * a;
                    ab += cor[p * 3 + 2] * a;
                } else {
                const r = lum(cor[p * 3], cor[p * 3 + 1], cor[p * 3 + 2]) / Lmedia;
                const alvo = ALVO || VERDE_ALVO;
                // Multiplicar o alvo pela razao so funciona com alvo ESCURO:
                // sobra espaco para o pixel claro subir. Com alvo claro tudo
                // estoura em branco e o volume desaparece — medido em
                // 25/10/2026, o primeiro lote claro saiu lavado.
                // Para alvo claro, COMPRIME: a razao vira um fator entre 0,68
                // e 1,0 do alvo, o que preserva luz e sombra sem clipar.
                const alvoClaro = lum(alvo[0], alvo[1], alvo[2]) > 140;
                if (VELADO) {
                    // GLIFO SOBRE CAMPO DE COR — o relevo vem do ALFA, nao da cor.
                    //
                    // Reancorar num alvo claro nao resolve: multiplicar so desce,
                    // entao mais contraste interno = conjunto mais escuro. Piso
                    // 0,80 saiu lavado; piso 0,40 saiu acinzentado. Os dois
                    // brigam com a mesma manopla.
                    //
                    // Aqui a cor e UMA so (o alvo, tipicamente branco) e a
                    // modulacao vai para a transparencia: realce opaco, sombra
                    // translucida deixando o gradiente do card atravessar. Da
                    // leveza, nitidez e relevo ao mesmo tempo, e harmoniza
                    // sozinho com qualquer cor de card — e como as referencias
                    // que o Agnaldo mandou tratam grafismo sobre campo de cor.
                    const t = PISO + (1 - PISO) * clamp((r - 0.4) / 1.4, 0, 1);
                    ar += alvo[0] * a * t;
                    ag += alvo[1] * a * t;
                    ab += alvo[2] * a * t;
                    aa += a * t;
                    continue;
                }
                const f = alvoClaro
                    ? PISO + (1 - PISO) * clamp((r - 0.4) / 1.4, 0, 1)
                    : r;
                ar += clamp(alvo[0] * f, 0, 255) * a;
                ag += clamp(alvo[1] * f, 0, 255) * a;
                ab += clamp(alvo[2] * f, 0, 255) * a;
                }
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

const pasta = arg('pasta', 'home-pictograms');
const limpo = process.argv.includes('--limpo');  // arte ja transparente, sem tile
const base = Number(arg('base', 180));
// --alvo "#E8F3EC": reancora a cor NESTE tom em vez do verde unico. Com
// --limpo e sem --alvo, a cor do autor passa intacta (ver o bloco de cor).
// --saida <pasta>: escreve noutra pasta em vez de glifos/.
// --piso 0.55: quanto a SOMBRA do glifo claro desce em relacao ao alvo.
// Piso alto = pouco contraste interno (lavado); piso baixo = mais relevo.
// 0,80 saiu lavado na primeira prova; ver §previa no scratchpad.
const PISO = Number(arg('piso', 0.55));
// --velado: a modulacao vai para o ALFA em vez da cor (glifo sobre campo de cor).
const VELADO = process.argv.includes('--velado');
// --sem-cor: nao reancora, mesmo na arte antiga com tile. A reancoragem
// (alvo x razao de luminancia) ACHATA o relevo quando o desenho e um bloco
// escuro com realce fino: medido em 25/10/2026, o acervo em uso tem 13 niveis
// de amplitude contra 191 do original. Esta opcao preserva o modelado.
const SEM_COR = process.argv.includes('--sem-cor');
const hexAlvo = arg('alvo', null);
const ALVO = hexAlvo ? [1, 3, 5].map((i) => parseInt(hexAlvo.replace('#', '').slice(i - 1, i + 1), 16)) : null;
DESTINO = path.join(ORIGEM, arg('saida', 'glifos'));
const dir = path.join(ORIGEM, pasta);
const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));

console.log(`Normalizando ${arquivos.length} peça(s) de ${pasta} — verde único, tamanho óptico, base ${base}px.`);
for (const f of arquivos) {
    const r = processar(path.join(dir, f), base, limpo);
    console.log('  ' + f.padEnd(34), r ? 'caixa ' + (r.caixaFinal * 100).toFixed(0) + '% (tinta equilibrada)' : 'FALHOU: glifo nao encontrado');
}
console.log(`\nGlifos em assets/illustrations/glifos/ (1x, @2x, @3x). Originais intactos.`);
