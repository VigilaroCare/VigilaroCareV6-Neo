// Auditoria de imagens órfãs: concatena TODO o código-fonte e marca como órfã
// a imagem cujo basename não aparece em lugar nenhum. Substring de propósito
// (conservador: se o nome for parte de outra string, considera USADA — não apaga).
const fs = require('fs');
const path = require('path');

const SRC_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json']);
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);
const SKIP = new Set(['node_modules', 'scratch', '.git', 'android', 'ios', '.expo', 'dist', 'build', '.gemini', 'coverage']);

let src = '';
function walkSrc(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (SKIP.has(e.name)) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) walkSrc(p);
        else if (SRC_EXT.has(path.extname(e.name).toLowerCase())) {
            try { src += '\n' + fs.readFileSync(p, 'utf8'); } catch (_) {}
        }
    }
}
walkSrc('.');

const assets = [];
function walkImg(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walkImg(p);
        else if (IMG_EXT.has(path.extname(e.name).toLowerCase())) assets.push(p);
    }
}
walkImg('assets');

const orphans = assets.filter(a => !src.includes(path.basename(a)));

const byDir = {};
for (const o of orphans) {
    const d = path.dirname(o).replace(/\\/g, '/');
    (byDir[d] = byDir[d] || []).push(path.basename(o));
}

console.log('TOTAL imagens:', assets.length, '| ORFAOS:', orphans.length, '| EM USO:', assets.length - orphans.length);
for (const d of Object.keys(byDir).sort()) {
    console.log('\n' + d + '  (' + byDir[d].length + ')');
    byDir[d].sort().forEach(f => console.log('   ' + f));
}
