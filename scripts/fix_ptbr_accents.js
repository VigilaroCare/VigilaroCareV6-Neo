/**
 * fix_ptbr_accents.js
 * 
 * Script de correção automática de acentuação no pt-BR/common.json.
 * Baseado nos resultados da auditoria de locales.
 * 
 * Uso: node scripts/fix_ptbr_accents.js
 */

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'locales', 'pt-BR', 'common.json');

// Mapa de substituições (word boundary-aware)
const REPLACEMENTS = [
    // Atenção
    { find: /\bAtencao\b/g, replace: 'Atenção' },
    { find: /\batencao\b/g, replace: 'atenção' },
    // Prevenção
    { find: /\bPrevencao\b/g, replace: 'Prevenção' },
    { find: /\bprevencao\b/g, replace: 'prevenção' },
    // Proteções
    { find: /\bProtecoes\b/g, replace: 'Proteções' },
    { find: /\bprotecoes\b/g, replace: 'proteções' },
    // Relatório
    { find: /\bRelatorio\b/g, replace: 'Relatório' },
    { find: /\brelatorio\b/g, replace: 'relatório' },
    // Histórico
    { find: /\bHistorico\b/g, replace: 'Histórico' },
    { find: /\bhistorico\b/g, replace: 'histórico' },
    // Residência
    { find: /\bResidencia\b/g, replace: 'Residência' },
    { find: /\bresidencia\b/g, replace: 'residência' },
    // Educação
    { find: /\bEducacao\b/g, replace: 'Educação' },
    { find: /\beducacao\b/g, replace: 'educação' },
    // Necessária
    { find: /\bNecessaria\b/g, replace: 'Necessária' },
    { find: /\bnecessaria\b/g, replace: 'necessária' },
];

function fixValues(obj) {
    let totalFixes = 0;
    
    function walk(o) {
        for (const key of Object.keys(o)) {
            if (typeof o[key] === 'object' && o[key] !== null) {
                walk(o[key]);
            } else if (typeof o[key] === 'string') {
                let original = o[key];
                let fixed = original;
                for (const r of REPLACEMENTS) {
                    fixed = fixed.replace(r.find, r.replace);
                }
                if (fixed !== original) {
                    o[key] = fixed;
                    totalFixes++;
                    console.log(`  ✓ Corrigido: "${original.substring(0, 50)}" → "${fixed.substring(0, 50)}"`);
                }
            }
        }
    }
    
    walk(obj);
    return totalFixes;
}

// Main
const raw = fs.readFileSync(FILE_PATH, 'utf-8');
const data = JSON.parse(raw);

console.log('');
console.log('═══════════════════════════════════════════════');
console.log('  Correção de Acentuação — pt-BR/common.json');
console.log('═══════════════════════════════════════════════');
console.log('');

const count = fixValues(data);

if (count > 0) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 4), 'utf-8');
    console.log('');
    console.log(`  ✅ ${count} correções aplicadas e salvas.`);
} else {
    console.log('  Nenhuma correção necessária.');
}
console.log('');
