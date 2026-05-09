/**
 * check_headersFirst_usage.js
 * 
 * Verifica quais chaves de headersFirst são usadas no código-fonte.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const d = require('../locales/pt-BR/common.json');
const hf = Object.keys(d.headersFirst || {});

// Keys with mojibake-style names (long, uppercase sequences with missing accents)
const mojiKeys = hf.filter(k => k.length > 15 && /[A-Z]{3,}/.test(k));

console.log(`Total headersFirst keys: ${hf.length}`);
console.log(`Mojibake-named keys (>15 chars, CAPS): ${mojiKeys.length}`);
console.log('');

let used = [];
let unused = [];

for (const k of mojiKeys) {
    try {
        const cmd = `findstr /s /r "${k}" screens\\*.js components\\*.js`;
        const result = execSync(cmd, { encoding: 'utf-8', cwd: path.join(__dirname, '..') });
        if (result.trim()) {
            used.push(k);
        } else {
            unused.push(k);
        }
    } catch (e) {
        // findstr returns exit code 1 when no match found
        unused.push(k);
    }
}

console.log(`✅ Usadas no código: ${used.length}`);
for (const k of used) {
    console.log(`   ✓ ${k}`);
}

console.log('');
console.log(`❌ NÃO usadas no código (candidatas a remoção): ${unused.length}`);
for (const k of unused) {
    console.log(`   ✗ ${k}`);
}
