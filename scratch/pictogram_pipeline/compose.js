const path = require('path');
const { isOpaqueInk, connectedComponents, Jimp, intToRGBA, rgbaToInt } = require('./lib.js');

const CANVAS_W = 577, CANVAS_H = 433;
// Alvo do SUJEITO ISOLADO (sem a moldura) dentro do canvas — media medida
// isolando o simbolo (connected-components, maior componente = moldura) nos
// 7 home-pictograms bem comportados (exclui modo-viagem.png, outlier estreito).
// Correcao de bug: os valores antigos (0.73/0.76) eram o fill do CARTAO
// INTEIRO (moldura+simbolo) do diagnostico original, nao do simbolo sozinho —
// isso inflava o simbolo quase ate o tamanho externo da moldura.
const TARGET_W = Math.round(CANVAS_W * 0.472);
const TARGET_H = Math.round(CANVAS_H * 0.530);

async function isolateSubject(srcPath) {
    const img = await Jimp.read(srcPath);
    const { width, height } = img.bitmap;
    // Limiar de pixels subiu de 15 para 200: fontes geradas por IA (raw, com
    // fundo branco opaco em vez de transparente) tem specks de ruido de
    // compressao/render espalhados pelo fundo — nao so na borda — que
    // sobrevivem a um limiar de 15px e distorcem o bounding box do sujeito
    // de forma assimetrica (ex: pictogram-menu-privacidade.png, achado
    // 2026-07-27). Um traco real de sujeito, mesmo pequeno, tem centenas de
    // pixels num canvas de ~1200x896.
    const comps = connectedComponents(img, isOpaqueInk).filter(c => c.count > 200);
    const area = c => (c.maxX - c.minX + 1) * (c.maxY - c.minY + 1);
    comps.sort((a, b) => area(b) - area(a));
    const border = comps[0];
    // Exclui componentes que tocam a borda do canvas — nunca e conteudo real
    // (o sujeito sempre tem margem da moldura+tile ate a borda da imagem);
    // ruido de renderizacao/encoding no pixel 0 as vezes aparece como blob
    // minusculo ali e distorce o bounding box do sujeito (composicao sai
    // descentralizada). A propria "border" (maior componente) pode
    // legitimamente tocar a borda em fontes ja recortadas rente — por isso
    // o filtro so se aplica ao calculo do sujeito, nao a escolha do border.
    const touchesEdge = (c) => c.minX <= 0 || c.minY <= 0 || c.maxX >= width - 1 || c.maxY >= height - 1;
    const subjectComps = comps.slice(1).filter(c => !touchesEdge(c));

    let minX = width, maxX = 0, minY = height, maxY = 0;
    for (const c of subjectComps) {
        if (c.minX < minX) minX = c.minX;
        if (c.maxX > maxX) maxX = c.maxX;
        if (c.minY < minY) minY = c.minY;
        if (c.maxY > maxY) maxY = c.maxY;
    }

    // Recorta so o sujeito (com alpha real, resto transparente)
    const subjectSet = new Set();
    for (const c of subjectComps) for (const [x, y] of c.pixels) subjectSet.add(y * width + x);

    const cropW = maxX - minX + 1, cropH = maxY - minY + 1;
    const crop = new Jimp({ width: cropW, height: cropH, color: 0x00000000 });
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            if (subjectSet.has(y * width + x)) {
                crop.setPixelColor(img.getPixelColor(x, y), x - minX, y - minY);
            }
        }
    }
    return { crop, cropW, cropH };
}

async function composeOnFrame(srcPath, framePath, outPath, targetOverride) {
    const { crop, cropW, cropH } = await isolateSubject(srcPath);
    const frame = await Jimp.read(framePath);

    // targetOverride permite uma caixa-alvo QUADRADA (targetW===targetH) —
    // garante que todo sujeito escale pela MESMA dimensao maxima, independente
    // da propria proporcao (largo vs alto). A caixa retangular padrao
    // (TARGET_W x TARGET_H, vinda da media dos home-pictograms) favorece
    // sujeitos com a mesma proporcao da caixa e deixa sujeitos mais largos ou
    // mais altos visualmente menores que os outros — perceptivel lado a lado
    // num grid onde todo icone deveria "pesar" o mesmo.
    const tW = (targetOverride && targetOverride.targetW) || TARGET_W;
    const tH = (targetOverride && targetOverride.targetH) || TARGET_H;
    const scale = Math.min(tW / cropW, tH / cropH);
    const newW = Math.round(cropW * scale);
    const newH = Math.round(cropH * scale);
    const resized = crop.resize({ w: newW, h: newH });

    const destX = Math.round((CANVAS_W - newW) / 2);
    const destY = Math.round((CANVAS_H - newH) / 2);

    const out = frame.clone();
    out.composite(resized, destX, destY);
    await out.write(outPath);
    return { newW, newH, scale };
}

module.exports = { isolateSubject, composeOnFrame, TARGET_W, TARGET_H, CANVAS_W, CANVAS_H };

if (require.main === module) {
    const [,, srcPath, outPath] = process.argv;
    const framePath = path.join(__dirname, 'CANONICAL_EMPTY_FRAME.png');
    composeOnFrame(srcPath, framePath, outPath).then(r => console.log(JSON.stringify(r)));
}
