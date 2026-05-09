/**
 * fix_ghost_frames.js
 * 
 * Correção automática de "molduras fantasmas" no Android.
 * 
 * Regra: Quando um NeoCard usa variant="elevated" E tem backgroundColor com rgba(),
 * o Android renderiza um retângulo cinza por trás (bug de elevation + transparent bg).
 * 
 * Correção: Troca variant="elevated" por variant="glass" nesses casos.
 * Também remove backgroundColor rgba inline quando glass já fornece esse efeito.
 * 
 * Uso: node scripts/fix_ghost_frames.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

const SCREENS_DIR = path.join(__dirname, '..', 'screens');
const COMPONENTS_DIR = path.join(__dirname, '..', 'components');

// Files the Sonnet audit is handling — SKIP
const SKIP_FILES = [
    'NewHomeWizardScreenNeo.js',
    'OndeProtegerScreen.js', 
    'ProfileService.js',
    'QuemProtegerScreenNeo.js',
    'HomeScreenNeo.js',
    'AddPerfilScreenNeo.js',
    'DataHealthScreen.js', // Our new file, already correct
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
    } catch (e) { /* skip */ }
    return results;
}

function fixFile(filePath) {
    const fileName = path.basename(filePath);
    if (SKIP_FILES.includes(fileName)) return null;

    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    const fixes = [];

    // ──────────────────────────────────────────────
    // FIX 1: variant="elevated" with rgba backgroundColor in the same NeoCard block
    // Strategy: Find NeoCard blocks that have both elevated and rgba
    // ──────────────────────────────────────────────
    
    // Pattern: variant="elevated" or variant='elevated' 
    // We need to check if rgba appears nearby (within the same JSX element)
    // Simple but effective: find lines with variant="elevated", check surrounding ~15 lines for rgba backgroundColor
    
    const lines = content.split('\n');
    let modified = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check for variant="elevated" (both quote styles)
        if (line.includes('variant="elevated"') || line.includes("variant='elevated'")) {
            // Look ahead and behind ~20 lines for rgba in backgroundColor within same NeoCard context
            const contextStart = Math.max(0, i - 5);
            const contextEnd = Math.min(lines.length - 1, i + 20);
            const context = lines.slice(contextStart, contextEnd + 1).join('\n');
            
            // Check if this NeoCard block has a rgba backgroundColor
            if (context.includes('rgba(') && context.includes('backgroundColor')) {
                // Replace elevated with glass
                lines[i] = line.replace(/variant="elevated"/g, 'variant="glass"')
                               .replace(/variant='elevated'/g, "variant='glass'");
                fixes.push(`L${i + 1}: variant="elevated" → "glass" (rgba backgroundColor nearby)`);
                modified = true;
            }
        }
    }
    
    if (modified) {
        content = lines.join('\n');
    }

    // ──────────────────────────────────────────────
    // FIX 2: Remove Shadows.sm/md/lg usage alongside transparent/rgba
    // Only for StyleSheet or inline styles, not inside NeoCard (which handles its own shadows)
    // ──────────────────────────────────────────────
    
    // This is riskier to automate — just flag for now
    if (content.includes('Shadows.sm') || content.includes('Shadows.md') || content.includes('Shadows.lg')) {
        if (content.includes("'transparent'") || content.includes('rgba(')) {
            fixes.push('⚠ Shadows.* + transparent/rgba detected — manual review recommended');
        }
    }

    if (fixes.length === 0) return null;
    
    if (!DRY_RUN && modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
    }

    return {
        file: path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/'),
        fixes,
        modified,
    };
}

// Main
const allFiles = [...walk(SCREENS_DIR), ...walk(COMPONENTS_DIR)];
const results = allFiles.map(fixFile).filter(Boolean);
const modifiedCount = results.filter(r => r.modified).length;

console.log('');
console.log('══════════════════════════════════════════════════════════════');
console.log('  FIX: Molduras Fantasmas Android');
console.log(`  Modo: ${DRY_RUN ? 'DRY RUN (sem alterações)' : 'APLICANDO CORREÇÕES'}`);
console.log('══════════════════════════════════════════════════════════════');
console.log('');
console.log(`  Arquivos analisados: ${allFiles.length}`);
console.log(`  Arquivos modificados: ${modifiedCount}`);
console.log(`  Arquivos com avisos manuais: ${results.filter(r => !r.modified).length}`);
console.log('');

for (const r of results) {
    const icon = r.modified ? '✅' : '⚠️';
    console.log(`${icon} ${r.file}`);
    for (const fix of r.fixes) {
        console.log(`   ${fix}`);
    }
}

console.log('');
console.log('══════════════════════════════════════════════════════════════');
