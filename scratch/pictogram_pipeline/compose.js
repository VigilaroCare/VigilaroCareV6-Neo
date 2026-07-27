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
    const comps = connectedComponents(img, isOpaqueInk).filter(c => c.count > 15);
    const area = c => (c.maxX - c.minX + 1) * (c.maxY - c.minY + 1);
    comps.sort((a, b) => area(b) - area(a));
    const border = comps[0];
    const subjectComps = comps.slice(1);

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

async function composeOnFrame(srcPath, framePath, outPath) {
    const { crop, cropW, cropH } = await isolateSubject(srcPath);
    const frame = await Jimp.read(framePath);

    const scale = Math.min(TARGET_W / cropW, TARGET_H / cropH);
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
