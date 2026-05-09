/**
 * fix_all_elevated_to_glass.js
 * 
 * Correção agressiva: Converte TODOS os variant="elevated" para variant="glass"
 * em qualquer arquivo que contenha backgroundColor com rgba().
 * 
 * Justificativa: No VigilaroCare, os NeoCards com elevated em telas que usam
 * rgba em QUALQUER lugar causam artefatos visuais. A variante glass é universalmente
 * segura e visualmente equivalente.
 * 
 * Uso: node scripts/fix_all_elevated_to_glass.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

const DIRS = [
    path.join(__dirname, '..', 'screens'),
    path.join(__dirname, '..', 'components'),
];

const SKIP_FILES = [
    'NewHomeWizardScreenNeo.js',
    'OndeProtegerScreen.js',
    'ProfileService.js',
    'QuemProtegerScreenNeo.js',
    'HomeScreenNeo.js',
    'AddPerfilScreenNeo.js',
    'DataHealthScreen.js',
];

function walk(dir) {
    let results = [];
    try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const p = path.join(dir, item);
            const stat = fs.statSync(p);
            if (stat.isDirectory()) results = results.concat(walk(p));
            else if (item.endsWith('.js')) results.push(p);
        }
    } catch (e) {}
    return results;
}

let allFiles = [];
for (const d of DIRS) allFiles = allFiles.concat(walk(d));

let totalFixed = 0;
let filesModified = 0;

console.log('');
console.log('══════════════════════════════════════════════════════════════');
console.log('  FIX: variant="elevated" → variant="glass"');
console.log(`  Modo: ${DRY_RUN ? 'DRY RUN' : 'APLICANDO'}`);
console.log('══════════════════════════════════════════════════════════════');
console.log('');

for (const filePath of allFiles) {
    const fileName = path.basename(filePath);
    if (SKIP_FILES.includes(fileName)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip files that don't have elevated
    if (!content.includes('variant="elevated"') && !content.includes("variant='elevated'")) continue;
    
    // Skip files that don't have rgba (these elevated cards are fine)
    if (!content.includes('rgba(')) continue;
    
    const count1 = (content.match(/variant="elevated"/g) || []).length;
    const count2 = (content.match(/variant='elevated'/g) || []).length;
    const total = count1 + count2;
    
    if (total === 0) continue;
    
    const newContent = content
        .replace(/variant="elevated"/g, 'variant="glass"')
        .replace(/variant='elevated'/g, "variant='glass'");
    
    if (!DRY_RUN) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
    }
    
    const rel = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
    console.log(`  ✅ ${rel} — ${total} substituições`);
    totalFixed += total;
    filesModified++;
}

console.log('');
console.log(`  Total: ${totalFixed} substituições em ${filesModified} arquivos`);
console.log('');
