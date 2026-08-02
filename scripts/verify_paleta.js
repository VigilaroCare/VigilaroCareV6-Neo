/**
 * verify_paleta.js
 *
 * Impede que cores emprestadas voltem a entrar nas telas.
 *
 * POR QUE ESTE TESTE EXISTE (2026-08-01)
 * Uma auditoria de "cara de IA" encontrou três paletas convivendo: o
 * verde-floresta autoral do DS, os defaults do Tailwind (violet-500,
 * amber-500, pink-500, blue-500) e os do Material (red-700, orange-900).
 * Saturação alta de default é o tique que denuncia origem genérica — e o
 * problema não era estética, era que o DS não tinha resposta para "cor de
 * categoria", então cada tela inventava a sua.
 *
 * A resposta virou `colors.categoria` (terracota, ocre, ardósia, ameixa,
 * rosé), com três funções por tom: texto / fill / tint. Este teste garante
 * que ninguém volte a cravar hex no lugar.
 *
 * NÃO é um teste de estilo. É de identidade: um hex cravado numa tela é uma
 * cor que não responde a tema, nem a alto contraste, nem a dark mode.
 *
 * Rodar: node scripts/verify_paleta.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/**
 * Hex que denunciam origem genérica. Se aparecer um destes numa tela, é porque
 * alguém colou de um gerador ou de outra biblioteca em vez de usar o token.
 */
const EMPRESTADOS = {
    // Tailwind
    '#8B5CF6': 'violet-500 → categoria.ameixa',
    '#7C3AED': 'violet-600 → categoria.ameixa',
    '#6D28D9': 'violet-700 → categoria.ameixa',
    '#EC4899': 'pink-500 → categoria.rose',
    '#DB2777': 'pink-600 → categoria.rose',
    '#3B82F6': 'blue-500 → categoria.ardosia',
    '#F97316': 'orange-500 → categoria.ocre',
    // Material
    '#9C27B0': 'purple-500 → categoria.ameixa',
    '#E91E63': 'pink-500 → categoria.rose',
    '#2196F3': 'blue-500 → categoria.ardosia',
    '#1976D2': 'blue-700 → categoria.ardosia',
    '#FF9800': 'orange-500 → categoria.ocre',
    '#E65100': 'orange-900 → categoria.ocre',
    '#F57F17': 'yellow-800 → categoria.ocre',
};

/**
 * Comentário histórico ("// was #2196F3") não conta — o código já usa token.
 *
 * O \r é removido antes: os ficheiros do projeto são CRLF e, depois de
 * split('\n'), sobra um \r no fim da linha. Como \r é terminador de linha para
 * o motor de regex, `.*$` não conseguia alcançá-lo e os comentários passavam
 * incólumes — o teste acusava três falsos positivos.
 */
function semComentario(linha) {
    return linha
        .replace(/\r$/, '')
        .replace(/\/\/[^\n]*/, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
}

function varrer(dir, achados = []) {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entrada.name);
        if (entrada.isDirectory()) { varrer(p, achados); continue; }
        if (!entrada.name.endsWith('.js')) continue;

        const rel = path.relative(ROOT, p).replace(/\\/g, '/');
        fs.readFileSync(p, 'utf8').split('\n').forEach((linha, i) => {
            const codigo = semComentario(linha);
            for (const [hex, destino] of Object.entries(EMPRESTADOS)) {
                if (new RegExp(hex, 'i').test(codigo)) {
                    achados.push({ rel, linha: i + 1, hex, destino });
                }
            }
        });
    }
    return achados;
}

console.log('\n1. CORES EMPRESTADAS NAS TELAS\n');
const achados = varrer(path.join(ROOT, 'screens'));

if (achados.length) {
    for (const a of achados.slice(0, 20)) {
        console.log(`   FALHA ${a.rel}:${a.linha}`);
        console.log(`         ${a.hex} — use ${a.destino}`);
    }
    if (achados.length > 20) console.log(`         ... e mais ${achados.length - 20}`);
} else {
    console.log(`   OK    nenhum dos ${Object.keys(EMPRESTADOS).length} hex vigiados aparece em screens/`);
}

// ---------------------------------------------------------------------------
// Informativo: densidade de hex cravado. Não falha — ainda há vermelhos e
// verdes de feedback a migrar, e ali a escolha entre texto e preenchimento
// muda o contraste, então tem de ser caso a caso.
// ---------------------------------------------------------------------------
console.log('\n2. DENSIDADE DE HEX CRAVADO (informativo)\n');
let hexTotal = 0, tokenTotal = 0;
(function contar(dir) {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entrada.name);
        if (entrada.isDirectory()) { contar(p); continue; }
        if (!entrada.name.endsWith('.js')) continue;
        const src = fs.readFileSync(p, 'utf8');
        hexTotal += (src.match(/#[0-9A-Fa-f]{6}/g) || []).length;
        tokenTotal += (src.match(/Neo\.colors\.|DS\.colors\.|themeColors\./g) || []).length;
    }
})(path.join(ROOT, 'screens'));

const pct = ((tokenTotal / (tokenTotal + hexTotal)) * 100).toFixed(1);
console.log(`   hex cravado: ${hexTotal}   token: ${tokenTotal}   (${pct}% via token)`);
console.log('   Meta: os que restam são feedback (vermelho/verde/âmbar), onde a');
console.log('   escolha entre texto e preenchimento muda o contraste — migrar caso a caso.');

console.log(achados.length === 0
    ? '\nRESULTADO: aprovado — nenhuma cor emprestada nas telas.\n'
    : `\nRESULTADO: ${achados.length} ocorrência(s).\n`);
process.exit(achados.length === 0 ? 0 : 1);
