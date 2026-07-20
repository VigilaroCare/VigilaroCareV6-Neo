/**
 * audit_locales.js
 * 
 * Script de auditoria de internacionalização para o VigilaroCare Neo.
 * Detecta:
 * 1. Chaves presentes em um locale mas ausentes em outros
 * 2. Mojibake (encoding corrompido) — sequências UTF-8 mal decodificadas
 * 3. Valores vazios ou placeholder
 * 4. Acentuação faltante em pt-BR (padrões comuns)
 * 
 * Uso: node scripts/audit_locales.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'locales');
const LOCALE_IDS = ['pt-BR', 'pt-PT', 'en', 'es'];

// Mojibake patterns — common UTF-8 -> Latin-1 misinterpretation sequences.
// Do not match plain "Ã": it is valid in Portuguese words such as "NÃO".
const MOJIBAKE_PATTERNS = [
    /Ã[\u0080-\u00BF]/g,                   // Ã¡, Ã§, Ã£, Ã©...
    /Ãƒ[\u0080-\u00BF]?/g,                 // double-encoded accents
    /Ã‚[\u0080-\u00BF]?/g,                 // double-encoded Â artifacts
    /Â[\u00A0©®ºª·]/g,                     // non-breaking/copyright/ordinal artifacts
    /â[\u0080-\u009F]/g,                   // corrupted punctuation/control range
    /â€[\u0080-\u009Fœ�˜™“”]/g,            // smart quotes/dashes artifacts
    /â‚¬/g,                                  // euro-sign artifact inside corrupted text
];

const BLOCKING_TYPES = new Set([
    'MISSING_KEYS',
    'MOJIBAKE',
    'EMPTY_VALUES',
    'ACCENT_MISSING',
]);

// pt-BR accentuation patterns that SHOULD have accents but don't
const PT_BR_ACCENT_CHECKS = [
    { wrong: /\bSaude\b/g, correct: 'Saúde' },
    { wrong: /\bGenero\b/gi, correct: 'Gênero' },
    { wrong: /\bRaca\b/gi, correct: 'Raça' },
    { wrong: /\bHistorico\b/gi, correct: 'Histórico' },
    { wrong: /\bCondicoes\b/gi, correct: 'Condições' },
    { wrong: /\bObservacoes\b/gi, correct: 'Observações' },
    { wrong: /\bAlteracoes\b/gi, correct: 'Alterações' },
    { wrong: /\bPermissao\b/gi, correct: 'Permissão' },
    { wrong: /\bNecessaria\b/gi, correct: 'Necessária' },
    { wrong: /\bSanguineo\b/gi, correct: 'Sanguíneo' },
    { wrong: /\bVeterinaria\b/gi, correct: 'Veterinária' },
    { wrong: /\bResidencia\b/gi, correct: 'Residência' },
    { wrong: /\bVinculo\b/gi, correct: 'Vínculo' },
    { wrong: /\bSerao\b/gi, correct: 'Serão' },
    { wrong: /\bProtecoes\b/gi, correct: 'Proteções' },
    { wrong: /\bSeguranaa\b/gi, correct: 'Segurança' },
    { wrong: /\bPrevencao\b/gi, correct: 'Prevenção' },
    { wrong: /\bInformacao\b/gi, correct: 'Informação' },
    { wrong: /\bEducacao\b/gi, correct: 'Educação' },
    { wrong: /\bEletronica\b/gi, correct: 'Eletrônica' },
    { wrong: /\bMestico\b/gi, correct: 'Mestiço' },
    { wrong: /\bAcoes\b/gi, correct: 'Ações' },
    { wrong: /\bSolucoes\b/gi, correct: 'Soluções' },
    { wrong: /\bSituacoes\b/gi, correct: 'Situações' },
    { wrong: /\bAtencao\b/gi, correct: 'Atenção' },
    { wrong: /\bRelatorio\b/gi, correct: 'Relatório' },
    { wrong: /\bConteudo\b/gi, correct: 'Conteúdo' },
    { wrong: /\bMedicacao\b/gi, correct: 'Medicação' },
    { wrong: /\bNotificacao\b/gi, correct: 'Notificação' },
    { wrong: /\bNavegacao\b/gi, correct: 'Navegação' },
    { wrong: /\bAreaExternas\b/gi, correct: 'Áreas Externas' },
];

// ============================================================
// UTILITIES
// ============================================================

function flattenKeys(obj, prefix = '') {
    const keys = {};
    for (const [k, v] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (v && typeof v === 'object' && !Array.isArray(v)) {
            Object.assign(keys, flattenKeys(v, fullKey));
        } else {
            keys[fullKey] = v;
        }
    }
    return keys;
}

// ============================================================
// MAIN AUDIT
// ============================================================

function main() {
    const locales = {};
    const flatLocales = {};

    // Load all locales
    for (const id of LOCALE_IDS) {
        const filePath = path.join(LOCALES_DIR, id, 'common.json');
        if (!fs.existsSync(filePath)) {
            console.error(`❌ Locale file not found: ${filePath}`);
            continue;
        }
        const raw = fs.readFileSync(filePath, 'utf-8');
        locales[id] = JSON.parse(raw);
        flatLocales[id] = flattenKeys(locales[id]);
    }

    const loadedIds = Object.keys(flatLocales);
    if (loadedIds.length === 0) {
        console.error('No locale files loaded.');
        process.exit(1);
    }

    const issues = [];
    let totalKeys = 0;

    // ── 1. MISSING KEYS ──
    const allKeys = new Set();
    for (const id of loadedIds) {
        for (const k of Object.keys(flatLocales[id])) {
            allKeys.add(k);
        }
    }
    totalKeys = allKeys.size;

    const missingByLocale = {};
    for (const id of loadedIds) {
        missingByLocale[id] = [];
        for (const key of allKeys) {
            if (!(key in flatLocales[id])) {
                missingByLocale[id].push(key);
            }
        }
    }

    for (const id of loadedIds) {
        if (missingByLocale[id].length > 0) {
            issues.push({
                type: 'MISSING_KEYS',
                locale: id,
                count: missingByLocale[id].length,
                keys: missingByLocale[id].slice(0, 30), // Cap at 30 for readability
                total: missingByLocale[id].length,
            });
        }
    }

    // ── 2. MOJIBAKE DETECTION ──
    for (const id of loadedIds) {
        const mojibakeHits = [];
        for (const [key, value] of Object.entries(flatLocales[id])) {
            if (typeof value !== 'string') continue;
            for (const pattern of MOJIBAKE_PATTERNS) {
                pattern.lastIndex = 0;
                if (pattern.test(value)) {
                    mojibakeHits.push({ key, value: value.substring(0, 80), pattern: pattern.source });
                    break; // One hit per key is enough
                }
            }
        }
        if (mojibakeHits.length > 0) {
            issues.push({
                type: 'MOJIBAKE',
                locale: id,
                count: mojibakeHits.length,
                hits: mojibakeHits.slice(0, 20),
            });
        }
    }

    // ── 3. EMPTY / PLACEHOLDER VALUES ──
    for (const id of loadedIds) {
        const emptyKeys = [];
        for (const [key, value] of Object.entries(flatLocales[id])) {
            if (typeof value === 'string' && value.trim() === '') {
                emptyKeys.push(key);
            }
        }
        if (emptyKeys.length > 0) {
            issues.push({
                type: 'EMPTY_VALUES',
                locale: id,
                count: emptyKeys.length,
                keys: emptyKeys.slice(0, 20),
            });
        }
    }

    // ── 4. PT-BR ACCENT AUDIT ──
    if (flatLocales['pt-BR']) {
        const accentIssues = [];
        for (const [key, value] of Object.entries(flatLocales['pt-BR'])) {
            if (typeof value !== 'string') continue;
            for (const check of PT_BR_ACCENT_CHECKS) {
                check.wrong.lastIndex = 0;
                if (check.wrong.test(value)) {
                    accentIssues.push({
                        key,
                        found: value.match(check.wrong)?.[0],
                        expected: check.correct,
                        context: value.substring(0, 60),
                    });
                }
            }
        }
        if (accentIssues.length > 0) {
            issues.push({
                type: 'ACCENT_MISSING',
                locale: 'pt-BR',
                count: accentIssues.length,
                hits: accentIssues.slice(0, 30),
            });
        }
    }

    // ── 5. DUPLICATE VALUES (same value in pt-BR as in en — possible untranslated) ──
    if (flatLocales['pt-BR'] && flatLocales['en']) {
        const suspectUntranslated = [];
        for (const [key, ptValue] of Object.entries(flatLocales['pt-BR'])) {
            if (typeof ptValue !== 'string' || ptValue.length < 10) continue;
            const enValue = flatLocales['en'][key];
            if (enValue && ptValue === enValue) {
                // Exact same — likely untranslated
                suspectUntranslated.push({ key, value: ptValue.substring(0, 60) });
            }
        }
        if (suspectUntranslated.length > 0) {
            issues.push({
                type: 'UNTRANSLATED',
                locale: 'pt-BR',
                count: suspectUntranslated.length,
                hits: suspectUntranslated.slice(0, 20),
            });
        }
    }

    // ============================================================
    // REPORT
    // ============================================================

    console.log('');
    console.log('══════════════════════════════════════════════════════════════');
    console.log('  VIGILARO CARE NEO — AUDITORIA DE INTERNACIONALIZAÇÃO');
    console.log('══════════════════════════════════════════════════════════════');
    console.log('');
    console.log(`  Locales analisados: ${loadedIds.join(', ')}`);
    console.log(`  Total de chaves únicas: ${totalKeys}`);
    console.log(`  Problemas encontrados: ${issues.length} categorias`);
    console.log(`  Problemas bloqueantes: ${issues.filter(issue => BLOCKING_TYPES.has(issue.type)).length} categorias`);
    console.log('');

    if (issues.length === 0) {
        console.log('  ✅ Nenhum problema encontrado!');
        console.log('');
        return;
    }

    for (const issue of issues) {
        console.log('──────────────────────────────────────────────────────────────');
        
        switch (issue.type) {
            case 'MISSING_KEYS':
                console.log(`  🔴 CHAVES FALTANTES em [${issue.locale}]: ${issue.count} chaves`);
                console.log('');
                for (const k of issue.keys) {
                    console.log(`     ∅ ${k}`);
                }
                if (issue.total > issue.keys.length) {
                    console.log(`     ... e mais ${issue.total - issue.keys.length} chaves`);
                }
                break;

            case 'MOJIBAKE':
                console.log(`  🟠 MOJIBAKE (encoding corrompido) em [${issue.locale}]: ${issue.count} chaves`);
                console.log('');
                for (const h of issue.hits) {
                    console.log(`     ⚠ ${h.key}`);
                    console.log(`       "${h.value}..."`);
                }
                break;

            case 'EMPTY_VALUES':
                console.log(`  🟡 VALORES VAZIOS em [${issue.locale}]: ${issue.count} chaves`);
                console.log('');
                for (const k of issue.keys) {
                    console.log(`     ∅ ${k}`);
                }
                break;

            case 'ACCENT_MISSING':
                console.log(`  🟡 ACENTUAÇÃO FALTANTE em [${issue.locale}]: ${issue.count} ocorrências`);
                console.log('');
                for (const h of issue.hits) {
                    console.log(`     ⚠ ${h.key}`);
                    console.log(`       Encontrado: "${h.found}" → Esperado: "${h.expected}"`);
                }
                break;

            case 'UNTRANSLATED':
                console.log(`  🔵 POSSÍVEIS NÃO-TRADUZIDAS em [${issue.locale}]: ${issue.count} chaves`);
                console.log(`     (valor idêntico ao inglês — pode ser intencional)`);
                console.log('');
                for (const h of issue.hits) {
                    console.log(`     ? ${h.key}`);
                    console.log(`       "${h.value}"`);
                }
                break;
        }
        console.log('');
    }

    console.log('══════════════════════════════════════════════════════════════');
    console.log('');

    if (issues.some(issue => BLOCKING_TYPES.has(issue.type))) {
        process.exitCode = 1;
    }
}

main();
