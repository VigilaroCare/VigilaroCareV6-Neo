const { isOpaqueInk, connectedComponents, Jimp, intToRGBA, rgbaToInt } = require('./lib.js');

// Preenche pixels "unfilled" (mascara subjectMask) com a cor do pixel creme
// mais proximo (BFS multi-origem 2D) — respeita gradiente suave do material
// em qualquer direcao, nao so horizontal.
function nearestCreamFill(img, subjectPixelsSet, isCreamFn) {
    const { width, height } = img.bitmap;
    const colorR = new Float32Array(width * height);
    const colorG = new Float32Array(width * height);
    const colorB = new Float32Array(width * height);
    const filled = new Uint8Array(width * height);
    let queue = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = y * width + x;
            if (subjectPixelsSet.has(idx)) continue; // sera preenchido
            const px = intToRGBA(img.getPixelColor(x, y));
            if (isCreamFn(px)) {
                filled[idx] = 1;
                colorR[idx] = px.r; colorG[idx] = px.g; colorB[idx] = px.b;
                queue.push(idx);
            }
        }
    }

    let head = 0;
    while (head < queue.length) {
        const idx = queue[head++];
        const x = idx % width, y = (idx / width) | 0;
        const neighbors = [[x+1,y],[x-1,y],[x,y+1],[x,y-1]];
        for (const [nx, ny] of neighbors) {
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            const nidx = ny * width + nx;
            if (filled[nidx]) continue;
            if (!subjectPixelsSet.has(nidx)) continue; // so preenche pixels do sujeito
            filled[nidx] = 1;
            colorR[nidx] = colorR[idx]; colorG[nidx] = colorG[idx]; colorB[nidx] = colorB[idx];
            queue.push(nidx);
        }
    }

    const out = img.clone();
    for (const idx of subjectPixelsSet) {
        const x = idx % width, y = (idx / width) | 0;
        out.setPixelColor(rgbaToInt(Math.round(colorR[idx]), Math.round(colorG[idx]), Math.round(colorB[idx]), 255), x, y);
    }
    return out;
}

module.exports = { nearestCreamFill };
