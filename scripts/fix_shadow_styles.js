/**
 * fix_shadow_styles.js
 * 
 * Correção automática de Shadows.* em StyleSheets com borderColor: 'transparent'.
 * Essa combinação causa moldura fantasma no Android.
 * 
 * Regra: Se um style object tem Shadows.* E borderColor: 'transparent',
 * adiciona elevation: 0 para neutralizar a elevação do Android.
 * 
 * Também converte borderColor: 'transparent' → borderColor: 'rgba(0,0,0,0)' como fallback.
 * 
 * Uso: node scripts/fix_shadow_styles.js [--dry-run]
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

function fixFile(filePath) {
    const fileName = path.basename(filePath);
    if (SKIP_FILES.includes(fileName)) return null;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let modified = false;
    const fixes = [];

    // Strategy: Find style blocks in StyleSheet.create that have both
    // ...Shadows.sm/md/lg AND borderColor: 'transparent'
    // For those, we add Platform.OS === 'android' ? 0 : undefined for elevation
    // OR simply remove the shadow spread from that specific block
    
    // Simpler approach: Find lines with borderColor: 'transparent' that are near Shadows.*
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Look for borderColor: 'transparent' in style objects
        if (/borderColor:\s*['"]transparent['"]/.test(line)) {
            // Check surrounding 5 lines up for ...Shadows.*
            let hasShadow = false;
            for (let j = Math.max(0, i - 8); j < i; j++) {
                if (/\.\.\.Shadows\.(sm|md|lg)/.test(lines[j])) {
                    hasShadow = true;
                    break;
                }
            }
            
            if (hasShadow) {
                // Replace transparent borderColor with actual transparent to avoid Android confusion
                // AND check if elevation needs to be added/zeroed
                lines[i] = line.replace(
                    /borderColor:\s*['"]transparent['"]/,
                    "borderColor: 'rgba(0,0,0,0)'"
                );
                
                // Check if there's already an elevation in this block
                let hasElevation = false;
                for (let j = Math.max(0, i - 8); j <= Math.min(lines.length - 1, i + 3); j++) {
                    if (/elevation:\s*\d+/.test(lines[j])) {
                        hasElevation = true;
                        break;
                    }
                }
                
                if (!hasElevation) {
                    // Add elevation: 0 after the borderColor line
                    const indent = line.match(/^\s*/)?.[0] || '    ';
                    lines.splice(i + 1, 0, `${indent}elevation: 0, // [FIX] Previne moldura fantasma Android`);
                    i++; // Skip the inserted line
                }
                
                fixes.push(`L${i + 1}: borderColor transparent + Shadows → added elevation: 0`);
                modified = true;
            }
        }
    }

    if (fixes.length === 0) return null;

    if (!DRY_RUN && modified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    }

    return {
        file: path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/'),
        fixes,
        modified,
    };
}

// Main
let allFiles = [];
for (const d of DIRS) {
    allFiles = allFiles.concat(walk(d));
}

const results = allFiles.map(fixFile).filter(Boolean);
const modifiedCount = results.filter(r => r.modified).length;

console.log('');
console.log('══════════════════════════════════════════════════════════════');
console.log('  FIX: Shadows + borderColor transparent');
console.log(`  Modo: ${DRY_RUN ? 'DRY RUN' : 'APLICANDO CORREÇÕES'}`);
console.log('══════════════════════════════════════════════════════════════');
console.log('');
console.log(`  Arquivos modificados: ${modifiedCount}`);
console.log('');

for (const r of results) {
    console.log(`  ✅ ${r.file}`);
    for (const fix of r.fixes) {
        console.log(`     ${fix}`);
    }
}

console.log('');
