/**
 * render-vetor.js — AMOSTRA do caminho procedural (vetor), peça "Vistorias".
 *
 * Por que existe: a geração por IA entrega raster fixo, com variação entre
 * peças e sem controle no tamanho de uso. Aqui a peça é DEFINIDA por geometria
 * e o material é uma receita de código — a mesma que, num app RN, vira SVG.
 *
 * O que isso prova, se funcionar:
 *   - aresta nítida em qualquer tamanho (a forma é calculada, não redimensionada)
 *   - luz idêntica em todas as peças, por construção
 *   - traço ajustável por tamanho (engrossar no pequeno é mudar um número)
 *   - modo escuro de graça (o tile é desenhado, não pintado no arquivo)
 *
 * Uso: node scripts/pictogramas/render-vetor.js [--lado 1024]
 * Saída: assets/illustrations/_gerados/vetor/vistorias-<lado>.png
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const RAIZ = path.join(__dirname, '..', '..');
const SAIDA = path.join(RAIZ, 'assets', 'illustrations', '_gerados', 'vetor');

// ── Paleta (tokens do DS) ───────────────────────────────────────────────────
const CREME = [244, 235, 220];      // colors.tile.cream
const VERDE = [20, 52, 43];         // primary.900 — o verde profundo do glifo
const VERDE_LUZ = [46, 92, 74];     // face iluminada
const BORDA_TILE = [214, 203, 186]; // borda suave do tile, sem contorno duro

// ── Utilidades de geometria ─────────────────────────────────────────────────
const mix = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const suave = (b0, b1, x) => { const t = clamp((x - b0) / (b1 - b0), 0, 1); return t * t * (3 - 2 * t); };

/** Distância de um ponto ao segmento — base de todo traço de espessura fixa. */
function distSegmento(px, py, ax, ay, bx, by) {
    const vx = bx - ax, vy = by - ay;
    const wx = px - ax, wy = py - ay;
    const t = clamp((wx * vx + wy * vy) / (vx * vx + vy * vy), 0, 1);
    const dx = px - (ax + t * vx), dy = py - (ay + t * vy);
    return Math.hypot(dx, dy);
}

/**
 * SDF do glifo "Vistorias": anel com abertura + tique.
 * Negativo dentro da forma, positivo fora — é o que permite calcular a aresta
 * com precisão de subpixel e derivar o relevo.
 */
function sdfVistorias(x, y, S) {
    const cx = 0.5 * S, cy = 0.5 * S;
    const traco = 0.085 * S;          // espessura única de todo o desenho
    const raio = 0.30 * S;

    // Anel com abertura no canto superior direito, por onde o tique passa.
    // As pontas do arco são CALOTAS ARREDONDADAS: cortar o anel por ângulo
    // deixa a aresta em faca, que é justamente o "bruto" que queremos eliminar.
    const dx = x - cx, dy = y - cy;
    const ang = Math.atan2(-dy, dx);                 // 0 = direita, cresce anti-horário
    const a0 = 0.16, a1 = 1.02;                      // limites da abertura (rad)
    const dentroDoArco = !(ang > a0 && ang < a1);
    let distAnel;
    if (dentroDoArco) {
        distAnel = Math.abs(Math.hypot(dx, dy) - raio) - traco / 2;
    } else {
        // fora do arco: distância à ponta mais próxima → calota redonda
        const pa = [cx + raio * Math.cos(a0), cy - raio * Math.sin(a0)];
        const pb = [cx + raio * Math.cos(a1), cy - raio * Math.sin(a1)];
        distAnel = Math.min(Math.hypot(x - pa[0], y - pa[1]), Math.hypot(x - pb[0], y - pb[1])) - traco / 2;
    }

    // Tique: dois segmentos unidos
    const p1 = [cx - 0.175 * S, cy + 0.015 * S];
    const p2 = [cx - 0.045 * S, cy + 0.145 * S];
    const p3 = [cx + 0.235 * S, cy - 0.175 * S];
    const distTique = Math.min(
        distSegmento(x, y, p1[0], p1[1], p2[0], p2[1]),
        distSegmento(x, y, p2[0], p2[1], p3[0], p3[1])
    ) - traco / 2;

    return Math.min(distAnel, distTique);
}

/**
 * Polilinha de espessura única, com pontas e junções arredondadas.
 * É a primitiva que resolve a maior parte do acervo: linha de pulso, contorno
 * de casa, alça de mala, cantos de mira, barras de código.
 */
function sdfPolilinha(x, y, pts, traco) {
    let d = Infinity;
    for (let i = 0; i < pts.length - 1; i++) {
        d = Math.min(d, distSegmento(x, y, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]));
    }
    return d - traco / 2;
}

/** "Minha Saúde": linha de pulso, um pico alto e um vale fundo, pontas chatas. */
function sdfMinhaSaude(x, y, S) {
    const P = [[0.13, 0.50], [0.27, 0.50], [0.315, 0.425], [0.40, 0.60],
               [0.475, 0.225], [0.555, 0.75], [0.625, 0.435], [0.70, 0.50], [0.87, 0.50]];
    return sdfPolilinha(x, y, P.map(([a, b]) => [a * S, b * S]), 0.075 * S);
}

/**
 * Cantos de mira: quatro cantoneiras em L, uma por quina.
 * Aparecem em Info Rótulos e em Scanner de Ambiente — a mesma primitiva serve
 * às duas, então a moldura de leitura fica idêntica nas duas peças de graça.
 */
function sdfCantosMira(x, y, S, { inset = 0.175, braco = 0.085, traco = 0.055 } = {}) {
    const a = inset * S, b = (1 - inset) * S, L = braco * S, t = traco * S;
    const cantos = [
        [[a, a + L], [a, a], [a + L, a]],   // superior esquerdo
        [[b - L, a], [b, a], [b, a + L]],   // superior direito
        [[a, b - L], [a, b], [a + L, b]],   // inferior esquerdo
        [[b - L, b], [b, b], [b, b - L]],   // inferior direito
    ];
    let d = Infinity;
    for (const pts of cantos) d = Math.min(d, sdfPolilinha(x, y, pts, t));
    return d;
}

/** "Info Rótulos": código de barras dentro dos cantos de mira. */
function sdfInfoRotulos(x, y, S) {
    const n = 9, t = 0.034 * S;
    const x0 = 0.295 * S, x1 = 0.705 * S;
    const yTopo = 0.315 * S, yBase = 0.685 * S;
    let d = sdfCantosMira(x, y, S);
    for (let i = 0; i < n; i++) {
        const cx = x0 + (x1 - x0) * (i / (n - 1));
        d = Math.min(d, sdfPolilinha(x, y, [[cx, yTopo], [cx, yBase]], t));
    }
    return d;
}

/**
 * "Scanner de Ambiente": planta baixa esquemática dentro dos cantos de mira.
 * As paredes são segmentos soltos, não um retângulo fechado — os intervalos
 * entre elas SÃO as portas, que é como o original representa a circulação.
 */
function sdfScannerAmbiente(x, y, S) {
    const t = 0.030 * S;
    const seg = (ax, ay, bx, by) => sdfPolilinha(x, y, [[ax * S, ay * S], [bx * S, by * S]], t);
    const paredes = [
        // contorno externo, com vãos onde o original abre passagem
        seg(0.365, 0.305, 0.635, 0.305),   // topo
        seg(0.635, 0.305, 0.635, 0.675),   // direita
        seg(0.365, 0.675, 0.635, 0.675),   // base
        seg(0.365, 0.305, 0.365, 0.495),   // esquerda, metade de cima
        seg(0.365, 0.560, 0.365, 0.675),   // esquerda, metade de baixo (vão no meio)
        // eixo horizontal que atravessa e ultrapassa a planta dos dois lados
        seg(0.300, 0.495, 0.700, 0.495),
        // divisórias internas
        // duas paredes descem do topo com um vão entre elas — a porta do
        // cômodo superior. Ambas nascem na parede de cima: soltas no meio do
        // ar, viravam um traço órfão que o original não tem.
        seg(0.500, 0.305, 0.500, 0.400),
        seg(0.445, 0.305, 0.445, 0.375),
        seg(0.365, 0.415, 0.455, 0.415),   // parede do cômodo à esquerda
        seg(0.545, 0.495, 0.545, 0.600),   // divisória inferior
        seg(0.455, 0.600, 0.545, 0.600),   // parede do cômodo inferior
        seg(0.455, 0.600, 0.455, 0.675),   // fecha o cômodo até a base
    ];
    return Math.min(sdfCantosMira(x, y, S), Math.min(...paredes));
}

/** Caixa de cantos arredondados — corpo de mala, painel, pé. */
function sdfCaixa(x, y, cx, cy, hw, hh, r) {
    const qx = Math.abs(x - cx) - (hw - r);
    const qy = Math.abs(y - cy) - (hh - r);
    return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
}

/**
 * União SUAVE de duas formas. O `min` comum cola as peças deixando um vinco
 * na junção; isto funde as duas com uma concordância de raio `k`, que é o que
 * dá a silhueta orgânica de um coxim modelado à mão.
 */
function uniaoSuave(a, b, k) {
    const h = clamp(0.5 + 0.5 * (b - a) / k, 0, 1);
    return mix(b, a, h) - k * h * (1 - h);
}

/** Elipse — coxins da pata. Aproximação de distância, suficiente para o relevo. */
function sdfElipse(x, y, cx, cy, rx, ry) {
    const k = Math.hypot((x - cx) / rx, (y - cy) / ry);
    return (k - 1) * Math.min(rx, ry);
}

/** "Saúde Pet": quatro coxins e o coxim principal, com o pulso gravado nele. */
function sdfSaudePet(x, y, S) {
    const dedos = [
        sdfElipse(x, y, 0.285 * S, 0.470 * S, 0.062 * S, 0.082 * S),
        sdfElipse(x, y, 0.408 * S, 0.362 * S, 0.064 * S, 0.090 * S),
        sdfElipse(x, y, 0.592 * S, 0.362 * S, 0.064 * S, 0.090 * S),
        sdfElipse(x, y, 0.715 * S, 0.470 * S, 0.062 * S, 0.082 * S),
    ];
    // Coxim principal: caixa muito arredondada somada a um domo no topo —
    // dá a forma de gota larga do original sem recorrer a curva desenhada.
    const base = sdfCaixa(x, y, 0.50 * S, 0.640 * S, 0.185 * S, 0.120 * S, 0.112 * S);
    const topo = sdfElipse(x, y, 0.50 * S, 0.560 * S, 0.115 * S, 0.085 * S);
    const coxim = uniaoSuave(base, topo, 0.055 * S);   // sem vinco na junção
    return Math.min(Math.min(...dedos), coxim);
}

/** A linha de pulso gravada no coxim principal. */
function gravadoSaudePet(x, y, S) {
    const P = [[0.355, 0.660], [0.420, 0.660], [0.452, 0.612], [0.492, 0.712],
               [0.538, 0.575], [0.578, 0.660], [0.645, 0.660]];
    return sdfPolilinha(x, y, P.map(([a, b]) => [a * S, b * S]), 0.024 * S);
}

/**
 * "Cuidar e Proteger": telhado, família de três e duas mãos em concha.
 *
 * Peça no limite do método. Telhado e figuras são geometria pura e saem
 * fiéis. As MÃOS são aproximação: palma e polegar fundidos por união suave,
 * o que dá a massa e o gesto, mas não os vincos e a anatomia do original.
 */
function sdfCuidarProteger(x, y, S) {
    const lin = (pts, esp) => sdfPolilinha(x, y, pts.map(([a, b]) => [a * S, b * S]), esp);

    // Telhado: duas águas com beirais curtos descendo nas pontas
    const telhado = Math.min(
        lin([[0.295, 0.370], [0.500, 0.232], [0.705, 0.370]], 0.034 * S),
        lin([[0.305, 0.360], [0.305, 0.410]], 0.034 * S),
        lin([[0.695, 0.360], [0.695, 0.410]], 0.034 * S)
    );

    // Família: cabeça redonda e corpo em cápsula — o pictograma clássico
    const pessoa = (cx, cyCabeca, rCabeca, cyCorpo, hw, hh) => uniaoSuave(
        sdfElipse(x, y, cx * S, cyCabeca * S, rCabeca * S, rCabeca * S),
        sdfCaixa(x, y, cx * S, cyCorpo * S, hw * S, hh * S, hw * 0.75 * S),
        0.012 * S
    );
    // Afastei os adultos e desci a criança: na primeira tentativa os três
    // corpos se encostavam e viravam uma massa só no tamanho do tile.
    const familia = Math.min(
        pessoa(0.415, 0.428, 0.039, 0.527, 0.049, 0.068),   // adulto esquerdo
        pessoa(0.585, 0.428, 0.039, 0.527, 0.049, 0.068),   // adulto direito
        pessoa(0.500, 0.512, 0.031, 0.596, 0.038, 0.050)    // criança ao centro
    );

    // Mãos em concha: palma subindo pelo lado de fora e polegar curvando para
    // dentro. A união suave é o que transforma dois traços em uma peça só.
    const mao = (espelho) => {
        const m = (px) => espelho ? 1 - px : px;
        const palma = lin([
            [m(0.252), 0.452], [m(0.268), 0.640], [m(0.350), 0.742], [m(0.452), 0.760],
        ], 0.082 * S);
        const polegar = lin([[m(0.318), 0.520], [m(0.360), 0.628]], 0.050 * S);
        return uniaoSuave(palma, polegar, 0.040 * S);
    };

    return Math.min(Math.min(telhado, familia), Math.min(mao(false), mao(true)));
}

/** Gira um ponto em torno de um centro — necessário para peças inclinadas. */
function girar(x, y, cx, cy, rad) {
    const c = Math.cos(rad), s = Math.sin(rad);
    const dx = x - cx, dy = y - cy;
    return [cx + dx * c - dy * s, cy + dx * s + dy * c];
}

/**
 * "Atividades Eventuais": contorno de casa com martelo e chave de fenda
 * cruzados. As ferramentas são a parte esquemática — martelo tem forma
 * orgânica, e aqui ele é reconstruído com caixa girada mais garra em dois
 * segmentos. Fica legível, mas não é cópia do desenho original.
 */
function sdfAtividadesEventuais(x, y, S) {
    const t = 0.034 * S;
    const lin = (pts, esp = t) => sdfPolilinha(x, y, pts.map(([a, b]) => [a * S, b * S]), esp);

    // Casa: telhado de uma água com cumeeira deslocada para a direita
    const casa = Math.min(
        lin([[0.225, 0.400], [0.640, 0.235], [0.775, 0.430]]),   // telhado
        lin([[0.265, 0.383], [0.265, 0.740]]),                   // parede esquerda
        lin([[0.265, 0.740], [0.735, 0.740]]),                   // base
        lin([[0.735, 0.740], [0.735, 0.410]])                    // parede direita
    );

    // Janela dividida à esquerda e porta à direita (a porta abre na base)
    const esq = 0.030 * S;
    const janela = Math.min(
        lin([[0.305, 0.455], [0.380, 0.455], [0.380, 0.545], [0.305, 0.545], [0.305, 0.455]], esq),
        lin([[0.305, 0.575], [0.380, 0.575], [0.380, 0.705], [0.305, 0.705], [0.305, 0.575]], esq)
    );
    const porta = lin([[0.640, 0.740], [0.640, 0.560], [0.712, 0.560], [0.712, 0.740]], esq);

    // Ferramentas menores e mais baixas: na primeira tentativa invadiam o
    // telhado e a cabeça do martelo colidia com a cumeeira.
    const chave = Math.min(
        lin([[0.430, 0.678], [0.528, 0.520]], 0.024 * S),        // haste
        lin([[0.534, 0.510], [0.578, 0.440]], 0.052 * S)         // cabo
    );

    // Martelo: cabo descendo para a direita, cabeça girada e garra em V
    const cabo = lin([[0.472, 0.470], [0.566, 0.672]], 0.040 * S);
    const ang = -0.38;
    const cxh = 0.452 * S, cyh = 0.442 * S;
    const [hx, hy] = girar(x, y, cxh, cyh, ang);
    const cabeca = sdfCaixa(hx, hy, cxh, cyh, 0.068 * S, 0.030 * S, 0.012 * S);
    // garra: dois segmentos que saem da cabeça e curvam para baixo
    const garra = uniaoSuave(
        lin([[0.400, 0.428], [0.378, 0.470]], 0.026 * S),
        lin([[0.378, 0.470], [0.412, 0.487]], 0.026 * S),
        0.02 * S
    );
    const martelo = uniaoSuave(Math.min(cabo, cabeca), garra, 0.018 * S);

    return Math.min(Math.min(casa, Math.min(janela, porta)), Math.min(chave, martelo));
}

/** "Modo Viagem": mala rígida com alça, dois sulcos e dois pés. */
function sdfModoViagem(x, y, S) {
    const corpo = sdfCaixa(x, y, 0.50 * S, 0.555 * S, 0.205 * S, 0.215 * S, 0.048 * S);
    const alca = sdfPolilinha(x, y, [
        [0.425 * S, 0.345 * S], [0.425 * S, 0.285 * S],
        [0.575 * S, 0.285 * S], [0.575 * S, 0.345 * S],
    ], 0.038 * S);
    const peEsq = sdfCaixa(x, y, 0.405 * S, 0.788 * S, 0.026 * S, 0.028 * S, 0.014 * S);
    const peDir = sdfCaixa(x, y, 0.595 * S, 0.788 * S, 0.026 * S, 0.028 * S, 0.014 * S);
    return Math.min(Math.min(corpo, alca), Math.min(peEsq, peDir));
}

/** Os dois sulcos verticais da mala — relevo NEGATIVO, não desenho por cima. */
function gravadoModoViagem(x, y, S) {
    const a = sdfPolilinha(x, y, [[0.437 * S, 0.372 * S], [0.437 * S, 0.742 * S]], 0.020 * S);
    const b = sdfPolilinha(x, y, [[0.563 * S, 0.372 * S], [0.563 * S, 0.742 * S]], 0.020 * S);
    return Math.min(a, b);
}

// Registro de peças. Cada entrada pode ter `forma` e, opcionalmente, `gravado`
// — o sulco que afunda na peça em vez de se somar a ela. Todo glifo novo ganha
// render idêntico: mesma luz, mesmo chanfro, mesmo tile. É isso que garante a
// unidade do conjunto sem depender de alguém lembrar das regras.
const GLIFOS = {
    vistorias: { forma: sdfVistorias },
    'minha-saude': { forma: sdfMinhaSaude },
    'info-rotulos': { forma: sdfInfoRotulos },
    'modo-viagem': { forma: sdfModoViagem, gravado: gravadoModoViagem },
    'scanner-ambiente': { forma: sdfScannerAmbiente },
    'saude-pet': { forma: sdfSaudePet, gravado: gravadoSaudePet },
    'atividades-eventuais': { forma: sdfAtividadesEventuais },
    'cuidar-e-proteger': { forma: sdfCuidarProteger },
};
let sdfGlifo = GLIFOS.vistorias.forma;
let sdfGravado = null;

/** SDF do tile: squircle (superelipse), a curvatura contínua do vocabulário Apple. */
function sdfTile(x, y, S) {
    const cx = 0.5 * S, cy = 0.5 * S;
    const a = 0.46 * S, n = 5;                       // n=5 → squircle
    const u = Math.abs((x - cx) / a), v = Math.abs((y - cy) / a);
    const r = Math.pow(Math.pow(u, n) + Math.pow(v, n), 1 / n);
    return (r - 1) * a;                              // aproximação de distância
}

function render(S) {
    const png = new PNG({ width: S, height: S });
    const luz = (() => { const v = [-0.55, -0.72, 0.42]; const m = Math.hypot(...v); return v.map(c => c / m); })();
    const bevel = 0.022 * S;                         // largura do chanfro

    for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
            const i = (y * S + x) * 4;
            const px = x + 0.5, py = y + 0.5;

            // ── Fundo: tile creme com squircle e borda suave ────────────────
            const dTile = sdfTile(px, py, S);
            const dentroTile = 1 - suave(-0.0018 * S, 0.0018 * S, dTile);
            if (dentroTile <= 0.002) { png.data[i + 3] = 0; continue; }

            // borda: escurecimento curto na casca, sem linha dura
            const casca = suave(-0.016 * S, 0, dTile);
            let r = mix(CREME[0], BORDA_TILE[0], casca * 0.9);
            let g = mix(CREME[1], BORDA_TILE[1], casca * 0.9);
            let b = mix(CREME[2], BORDA_TILE[2], casca * 0.9);

            // ── Sombra de contato do glifo sobre o tile ─────────────────────
            const dSombra = sdfGlifo(px, py - 0.008 * S, S);
            const sombra = (1 - suave(0, 0.026 * S, dSombra)) * 0.16;
            r *= (1 - sombra); g *= (1 - sombra); b *= (1 - sombra);

            // ── Glifo ──────────────────────────────────────────────────────
            const d = sdfGlifo(px, py, S);
            const aa = 0.0016 * S;  // banda de suavizacao proporcional: aresta limpa em qualquer tamanho
                const cobertura = 1 - suave(-aa, aa, d);   // antialias de subpixel
            if (cobertura > 0.001) {
                // ── Campo de ALTURA da peça ────────────────────────────────
                // Em vez de derivar a normal só da borda, montamos a altura de
                // cada ponto: domo do chanfro menos o sulco gravado. A normal
                // sai do gradiente dessa altura, então sulco e borda usam a
                // mesma matemática — é o que faz o gravado parecer afundado no
                // material, e não uma linha pintada por cima.
                const domo = (t) => Math.sqrt(Math.max(0, 1 - Math.pow(clamp(t, 0, 1) - 1, 2)));
                const altura = (ax, ay) => {
                    const dd = sdfGlifo(ax, ay, S);
                    if (dd > 0) return 0;
                    let hh = domo(-dd / bevel);
                    if (sdfGravado) {
                        const dg = sdfGravado(ax, ay, S);
                        if (dg < 0) hh -= 0.85 * domo(-dg / (bevel * 0.85));
                    }
                    return hh;
                };

                const h = altura(px, py);
                const e = 1.0;
                const escalaRelevo = bevel * 0.9;    // converte altura em inclinação
                const gx = -(altura(px + e, py) - altura(px - e, py)) / (2 * e) * escalaRelevo;
                const gy = -(altura(px, py + e) - altura(px, py - e)) / (2 * e) * escalaRelevo;
                let nx = gx, ny = gy, nz = 0.45 + 0.55 * clamp(h, 0, 1);
                const m = Math.hypot(nx, ny, nz) || 1;
                nx /= m; ny /= m; nz /= m;

                const lambert = clamp(nx * luz[0] + ny * luz[1] + nz * luz[2], 0, 1);
                // Brilho largo e suave — define a quina sem virar ponto de plástico
                const brilho = Math.pow(lambert, 14) * 0.35;
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

/**
 * Supersampling: desenha grande e reduz por média.
 *
 * Calcular a cobertura por pixel dá aresta de ~2px — tecnicamente suavizada,
 * mas dura o bastante para virar escada quando se amplia. Pior: o relevo é
 * derivado do campo pixel a pixel, o que terraça o sombreado. Renderizar em
 * 3x e reduzir resolve os dois de uma vez, porque cada pixel final passa a ser
 * a média de nove amostras — é o que os motores de render chamam de SSAA.
 */
function renderSS(S, fator = 3) {
    const g = render(S * fator);
    const out = new PNG({ width: S, height: S });
    for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
            let r = 0, gr = 0, b = 0, a = 0;
            for (let j = 0; j < fator; j++) {
                for (let i2 = 0; i2 < fator; i2++) {
                    const k = ((y * fator + j) * S * fator + (x * fator + i2)) * 4;
                    const al = g.data[k + 3] / 255;
                    r += g.data[k] * al; gr += g.data[k + 1] * al; b += g.data[k + 2] * al; a += al;
                }
            }
            const n = fator * fator;
            const d = (y * S + x) * 4;
            out.data[d] = a > 0 ? Math.round(r / a) : 0;       // média com peso de alfa,
            out.data[d + 1] = a > 0 ? Math.round(gr / a) : 0;  // para a borda não puxar
            out.data[d + 2] = a > 0 ? Math.round(b / a) : 0;   // a cor do vazio
            out.data[d + 3] = Math.round((a / n) * 255);
        }
    }
    return out;
}

const arg = (n, p) => { const a = process.argv.slice(2); const i = a.indexOf('--' + n); return i >= 0 && a[i + 1] ? Number(a[i + 1]) : p; };
fs.mkdirSync(SAIDA, { recursive: true });
const peca = (() => { const a = process.argv.slice(2); const i = a.indexOf('--peca'); return i >= 0 && a[i + 1] ? a[i + 1] : 'vistorias'; })();
const registro = GLIFOS[peca] || GLIFOS.vistorias;
sdfGlifo = registro.forma;
sdfGravado = registro.gravado || null;
// Tamanhos de saída. O padrão cobre os dois usos: 1024 é mestre de
// inspeção; 510 é o tile real num aparelho 3x. Para exportar o conjunto que o
// React Native consome, passe --tamanhos 170,340,510 (1x, 2x e 3x).
const tamanhos = (() => {
    const a = process.argv.slice(2), i = a.indexOf('--tamanhos');
    if (i >= 0 && a[i + 1]) return a[i + 1].split(',').map(Number).filter(Boolean);
    return [arg('lado', 1024), 510];
})();
for (const lado of tamanhos) {          // 510 = 170pt em tela 3x
    const arquivo = path.join(SAIDA, `${peca}-${lado}.png`);
    fs.writeFileSync(arquivo, PNG.sync.write(renderSS(lado, 3)));
    console.log('gerado', path.relative(RAIZ, arquivo));
}
