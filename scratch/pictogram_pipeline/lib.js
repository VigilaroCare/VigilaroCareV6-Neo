const { Jimp, intToRGBA, rgbaToInt } = require('jimp');

function isOpaqueInk(px) {
  // "ink" = qualquer coisa nao-transparente e nao-creme (moldura verde ou simbolo)
  if (px.a < 200) return false;
  const isCream = px.r > 215 && px.g > 195 && px.b > 165 && px.r >= px.g && px.g >= px.b - 10;
  return !isCream;
}

// Connected components (4-conectividade) sobre a mascara de "ink".
// Retorna lista de componentes, cada um = {pixels:[[x,y],...], minX,maxX,minY,maxY}
function connectedComponents(img, maskFn) {
  const { width, height } = img.bitmap;
  const visited = new Uint8Array(width * height);
  const comps = [];
  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = intToRGBA(img.getPixelColor(x, y));
      if (maskFn(px)) mask[y * width + x] = 1;
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!mask[idx] || visited[idx]) continue;
      // BFS
      const stack = [[x, y]];
      visited[idx] = 1;
      let minX = x, maxX = x, minY = y, maxY = y, count = 0;
      const pixels = [];
      while (stack.length) {
        const [cx, cy] = stack.pop();
        count++;
        pixels.push([cx, cy]);
        if (cx < minX) minX = cx; if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy; if (cy > maxY) maxY = cy;
        const neighbors = [[cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1]];
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const nidx = ny * width + nx;
          if (mask[nidx] && !visited[nidx]) {
            visited[nidx] = 1;
            stack.push([nx, ny]);
          }
        }
      }
      comps.push({ minX, maxX, minY, maxY, count, pixels });
    }
  }
  return comps;
}

module.exports = { isOpaqueInk, connectedComponents, Jimp, intToRGBA, rgbaToInt };
