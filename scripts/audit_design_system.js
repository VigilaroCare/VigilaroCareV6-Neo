/**
 * audit_design_system.js
 * 
 * Audita telas do VigilaroCare Neo para conformidade com o Design System.
 * Detecta:
 * 1. Shadows.sm em fundos transparentes (causa moldura fantasma no Android)
 * 2. borderWidth manual em NeoCard (sobrescreve o design system)
 * 3. Excesso de cores hardcoded (deveria usar Neo.colors.*)
 * 4. elevation > 0 em fundos rgba/transparent
 * 5. variant="elevated" com backgroundColor rgba
 * 
 * Uso: node scripts/audit_design_system.js
 */

const fs = require('fs');
const path = require('path');

const SCREENS_DIR = path.join(__dirname, '..', 'screens');
const COMPONENTS_DIR = path.join(__dirname, '..', 'components');

// Files the Sonnet audit is handling — SKIP these
const SONNET_FILES = [
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
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                results = results.concat(walk(fullPath));
            } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
                results.push(fullPath);
            }
        }
    } catch (e) { /* skip */ }
    return results;
}

function auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const issues = [];

    // Skip Sonnet files
    if (SONNET_FILES.includes(fileName)) return null;

    // 1. Shadows on transparent backgrounds
    if (content.includes('Shadows.sm') || content.includes('Shadows.md') || content.includes('Shadows.lg')) {
        if (content.includes("'transparent'") || content.includes('rgba(')) {
            issues.push({
                severity: 'HIGH',
                issue: 'Shadow + fundo transparente/rgba → moldura fantasma no Android',
            });
        }
    }

    // 2. Manual borderWidth on NeoCard
    if (content.includes('NeoCard')) {
        const borderMatches = content.match(/borderWidth:\s*[1-9]\d*/g);
        if (borderMatches && borderMatches.length > 0) {
            issues.push({
                severity: 'MEDIUM',
                issue: `borderWidth manual em NeoCard (${borderMatches.length}x) — pode criar molduras intrusas`,
            });
        }
    }

    // 3. variant="elevated" with backgroundColor rgba
    if (content.includes('variant="elevated"') || content.includes("variant='elevated'")) {
        if (content.includes('backgroundColor:') && content.includes('rgba(')) {
            issues.push({
                severity: 'HIGH',
                issue: 'variant="elevated" com backgroundColor rgba → bug de elevação Android',
            });
        }
    }

    // 4. Hardcoded colors (excluding common white/black/theme)
    const hexColors = content.match(/#[0-9A-Fa-f]{6}\b/g) || [];
    const ALLOWED = ['#FFFFFF', '#ffffff', '#000000', '#F2F8F4', '#f2f8f4'];
    const hardcoded = hexColors.filter(c => !ALLOWED.includes(c));
    // Only flag if there are many — a few for specific design elements is OK
    if (hardcoded.length > 10) {
        const unique = [...new Set(hardcoded)];
        issues.push({
            severity: 'LOW',
            issue: `${unique.length} cores únicas hardcoded (total ${hardcoded.length} usos) — considerar Neo.colors.*`,
        });
    }

    // 5. Direct elevation usage (not via NeoCard/Neo.shadows)
    const elevationMatches = content.match(/elevation:\s*[1-9]\d*/g);
    if (elevationMatches && content.includes('rgba(')) {
        issues.push({
            severity: 'MEDIUM',
            issue: `elevation manual (${elevationMatches.length}x) com rgba → pode causar moldura`,
        });
    }

    if (issues.length > 0) {
        return { file: path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/'), issues };
    }
    return null;
}

// Main
const allFiles = [...walk(SCREENS_DIR), ...walk(COMPONENTS_DIR)];
const results = allFiles.map(auditFile).filter(Boolean);

console.log('');
console.log('══════════════════════════════════════════════════════════════');
console.log('  VIGILARO CARE NEO — AUDITORIA DE DESIGN SYSTEM');
console.log('══════════════════════════════════════════════════════════════');
console.log('');
console.log(`  Arquivos analisados: ${allFiles.length}`);
console.log(`  Arquivos com problemas: ${results.length}`);
console.log(`  Arquivos do Sonnet (ignorados): ${SONNET_FILES.length}`);
console.log('');

if (results.length === 0) {
    console.log('  ✅ Nenhum problema de Design System detectado!');
} else {
    const highCount = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'HIGH').length, 0);
    const medCount = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'MEDIUM').length, 0);
    const lowCount = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'LOW').length, 0);

    console.log(`  🔴 ALTO: ${highCount}  |  🟡 MÉDIO: ${medCount}  |  🔵 BAIXO: ${lowCount}`);
    console.log('');

    for (const result of results) {
        console.log('──────────────────────────────────────────────────────────────');
        console.log(`  📁 ${result.file}`);
        for (const issue of result.issues) {
            const icon = issue.severity === 'HIGH' ? '🔴' : issue.severity === 'MEDIUM' ? '🟡' : '🔵';
            console.log(`     ${icon} ${issue.issue}`);
        }
    }
}

console.log('');
console.log('══════════════════════════════════════════════════════════════');
console.log('');
