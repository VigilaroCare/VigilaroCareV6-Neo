// Exclusão de imagens órfãs (mesma lógica conservadora do audit) + a pasta
// travel-options inteira (0 referências, mas colide de nome com travel-pictograms).
// Tudo versionado no git => reversível.
const fs = require('fs');
const path = require('path');

const SRC_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json']);
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);
const SKIP = new Set(['node_modules', 'scratch', '.git', 'android', 'ios', '.expo', 'dist', 'build', '.gemini', 'coverage']);

let src = '';
(function walkSrc(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (SKIP.has(e.name)) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) walkSrc(p);
        else if (SRC_EXT.has(path.extname(e.name).toLowerCase())) {
            try { src += '\n' + fs.readFileSync(p, 'utf8'); } catch (_) {}
        }
    }
})('.');

const assets = [];
(function walkImg(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walkImg(p);
        else if (IMG_EXT.has(path.extname(e.name).toLowerCase())) assets.push(p);
    }
})('assets');

const toDelete = new Set();
for (const a of assets) if (!src.includes(path.basename(a))) toDelete.add(a);

// Pasta inteira órfã (grep "travel-options" = 0 refs).
const TO = path.join('assets', 'illustrations', 'travel-options');
if (fs.existsSync(TO)) for (const f of fs.readdirSync(TO)) toDelete.add(path.join(TO, f));

let bytes = 0, n = 0;
const byDir = {};
for (const f of [...toDelete].sort()) {
    try {
        bytes += fs.statSync(f).size;
        fs.unlinkSync(f);
        n++;
        const d = path.dirname(f).replace(/\\/g, '/');
        byDir[d] = (byDir[d] || 0) + 1;
    } catch (e) { console.log('SKIP ' + f + ' ' + e.message); }
}

// Remove diretórios vazios sob assets/
(function rmEmpty(d) {
    for (const e of fs.readdirSync(d)) {
        const p = path.join(d, e);
        if (fs.statSync(p).isDirectory()) rmEmpty(p);
    }
    if (d !== 'assets' && fs.readdirSync(d).length === 0) {
        fs.rmdirSync(d);
        console.log('rmdir ' + d.replace(/\\/g, '/'));
    }
})('assets');

console.log('\n=== RESUMO por pasta ===');
for (const d of Object.keys(byDir).sort()) console.log('  ' + byDir[d] + '  ' + d);
console.log('\nTOTAL DELETADO: ' + n + ' arquivos | ' + (bytes / 1048576).toFixed(2) + ' MB liberados');
