/**
 * limpar.js — normaliza o PNG gerado para virar asset do app.
 *
 * A geração por IA é boa no objeto e ruim na borda: sobra um halo
 * semitransparente de cena (névoa/brilho) que, por cima do tile creme, aparece
 * como sujeira esverdeada. E cada peça sai com o objeto num tamanho diferente
 * dentro do quadro, o que quebra o alinhamento óptico do conjunto.
 *
 * Esta passada é determinística — não depende de o modelo obedecer:
 *   1. corta o halo (zera alfa abaixo do limiar)
 *   2. recorta a caixa do objeto e recentraliza
 *   3. reescala para ocupar sempre a mesma proporção do quadro
 *
 * Uso: node scripts/pictogramas/limpar.js [--limiar 12] [--ocupacao 0.76]
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const RAIZ = path.join(__dirname, '..', '..');
const ENTRADA = path.join(RAIZ, 'assets', 'illustrations', '_gerados');
const SAIDA = path.join(ENTRADA, 'limpos');

function arg(nome, padrao) {
    const a = process.argv.slice(2);
    const i = a.indexOf('--' + nome);
    return i >= 0 && a[i + 1] ? Number(a[i + 1]) : padrao;
}

/**
 * Recorta o fundo branco e devolve a caixa do objeto.
 *
 * O alfa vem da distância ao branco: pixel branco puro fica invisível, pixel
 * do objeto fica opaco, e a faixa entre os dois preserva a suavidade da borda
 * — é o que evita o serrilhado do recorte por limiar seco.
 *
 * `limiar` é o quanto o pixel precisa se afastar do branco (0-255) para
 * começar a existir.
 */
function recortarBranco(png, limiar) {
    const { width: w, height: h, data } = png;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    const faixa = 255 - limiar;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            // distância ao branco = o quanto o canal mais claro escureceu
            const dist = 255 - Math.max(r, g, b);
            if (dist <= limiar) {
                data[i + 3] = 0;
                continue;
            }
            const alfa = Math.min(255, Math.round(((dist - limiar) / faixa) * 255 * 2.2));
            data[i + 3] = alfa;
            if (alfa > 40) {
                if (x < x0) x0 = x;
                if (y < y0) y0 = y;
                if (x > x1) x1 = x;
                if (y > y1) y1 = y;
            }
        }
    }
    return { x0, y0, x1, y1 };
}

/** Amostra bilinear simples do PNG de origem. */
function amostrar(src, sx, sy) {
    const x = Math.max(0, Math.min(src.width - 1, Math.round(sx)));
    const y = Math.max(0, Math.min(src.height - 1, Math.round(sy)));
    return (y * src.width + x) * 4;
}

function normalizar(arquivo, limiar, ocupacao, lado) {
    const src = PNG.sync.read(fs.readFileSync(path.join(ENTRADA, arquivo)));
    const caixa = recortarBranco(src, limiar);
    if (caixa.x1 < 0) return { arquivo, erro: 'imagem vazia após o corte' };

    const larg = caixa.x1 - caixa.x0 + 1;
    const alt = caixa.y1 - caixa.y0 + 1;
    const alvo = lado * ocupacao;              // quanto o objeto deve ocupar
    const escala = alvo / Math.max(larg, alt); // mesma proporção para todas
    const destLarg = Math.round(larg * escala);
    const destAlt = Math.round(alt * escala);
    const offX = Math.round((lado - destLarg) / 2);
    const offY = Math.round((lado - destAlt) / 2);

    const out = new PNG({ width: lado, height: lado });
    out.data.fill(0);
    for (let y = 0; y < destAlt; y++) {
        for (let x = 0; x < destLarg; x++) {
            const s = amostrar(src, caixa.x0 + x / escala, caixa.y0 + y / escala);
            const d = ((y + offY) * lado + (x + offX)) * 4;
            out.data[d] = src.data[s];
            out.data[d + 1] = src.data[s + 1];
            out.data[d + 2] = src.data[s + 2];
            out.data[d + 3] = src.data[s + 3];
        }
    }

    // Tira o branco residual dos pixels invisíveis. O alfa zero já os esconde,
    // mas o RGB continua lá e volta como franja clara quando o RN reduz a
    // imagem para o tamanho do tile — o filtro mistura cor de pixel invisível.
    // Pintá-los com a cor do objeto faz a franja desaparecer.
    let sr = 0, sg = 0, sb = 0, n = 0;
    for (let i = 0; i < out.data.length; i += 4) {
        if (out.data[i + 3] > 200) { sr += out.data[i]; sg += out.data[i + 1]; sb += out.data[i + 2]; n++; }
    }
    if (n) {
        const [mr, mg, mb] = [Math.round(sr / n), Math.round(sg / n), Math.round(sb / n)];
        for (let i = 0; i < out.data.length; i += 4) {
            if (out.data[i + 3] === 0) { out.data[i] = mr; out.data[i + 1] = mg; out.data[i + 2] = mb; }
        }
    }

    fs.mkdirSync(SAIDA, { recursive: true });
    fs.writeFileSync(path.join(SAIDA, arquivo), PNG.sync.write(out));
    return { arquivo, caixa: `${larg}x${alt}`, ocupacaoFinal: (Math.max(destLarg, destAlt) / lado).toFixed(2) };
}

const limiar = arg("limiar", 12);
const ocupacao = arg('ocupacao', 0.76);
const lado = arg('lado', 1024);

const arquivos = fs.existsSync(ENTRADA)
    ? fs.readdirSync(ENTRADA).filter((f) => f.endsWith('.png'))
    : [];

if (!arquivos.length) {
    console.log('Nada em assets/illustrations/_gerados/. Rode gerar.js antes.');
    process.exit(0);
}

console.log(`Limpando ${arquivos.length} peça(s) — limiar de alfa ${limiar}, ocupação ${ocupacao}.`);
arquivos.forEach((f) => {
    const r = normalizar(f, limiar, ocupacao, lado);
    console.log(' ', r.arquivo, r.erro ? `FALHOU: ${r.erro}` : `objeto ${r.caixa} → ocupa ${r.ocupacaoFinal} do quadro`);
});
console.log(`\nProntos em assets/illustrations/_gerados/limpos/`);
