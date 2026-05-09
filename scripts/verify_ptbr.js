/**
 * Verify pt-BR locale is free of mojibake
 */
const fs = require('fs');
const content = fs.readFileSync('c:/Users/User/Documents/VigilaroCareV6 Neo/locales/pt-BR/common.json', 'utf8');

// Look for double-encoded UTF-8 patterns (Ã followed by specific bytes)
const mojibakeRegex = /\u00c3[\u00a1\u00a9\u00ad\u00b3\u00ba\u00a3\u00b5\u00aa\u00a7\u0160\u201c\u2021\u2022\u0178\u201a]/g;
const matches = content.match(mojibakeRegex);

if (matches && matches.length > 0) {
    console.log(`WARNING: Found ${matches.length} mojibake patterns in pt-BR`);
    // Find context for each
    let idx = 0;
    for (const m of matches) {
        const pos = content.indexOf(m, idx);
        const start = Math.max(0, pos - 40);
        const end = Math.min(content.length, pos + 40);
        console.log(`  At ${pos}: ...${content.substring(start, end)}...`);
        idx = pos + 1;
    }
} else {
    console.log('pt-BR/common.json: ALL CLEAN! No mojibake found.');
}

// Also check the specific fields we fixed
const json = JSON.parse(content);
if (json.headersFirst) {
    const checks = ['vNCULOCOMARESIDNCIA', 'tIPOSANGUNEO', 'rAAMESTIO', 'cONDIESHISTRICO'];
    checks.forEach(key => {
        const val = json.headersFirst[key];
        if (val) console.log(`  ${key}: "${val}" OK`);
        else console.log(`  ${key}: MISSING`);
    });
}
