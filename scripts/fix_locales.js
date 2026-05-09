/**
 * Fix mojibake characters in locale headersFirst sections
 */
const fs = require('fs');

const langs = ['pt-PT', 'en', 'es'];

// Correct translations per language
const correctValues = {
  'pt-PT': {
    'vNCULOCOMARESIDNCIA': 'V\u00cdNCULO COM A RESID\u00caNCIA',
    'tIPOSANGUNEO': 'TIPO SANGU\u00cdNEO',
    'rAAMESTIO': 'RA\u00c7A / MESTI\u00c7O',
    'cONDIESHISTRICO': 'CONDI\u00c7\u00d5ES & HIST\u00d3RICO'
  },
  'en': {
    'vNCULOCOMARESIDNCIA': 'RESIDENCE LINK',
    'tIPOSANGUNEO': 'BLOOD TYPE',
    'rAAMESTIO': 'BREED / MIXED',
    'cONDIESHISTRICO': 'CONDITIONS & HISTORY'
  },
  'es': {
    'vNCULOCOMARESIDNCIA': 'V\u00cdNCULO CON LA RESIDENCIA',
    'tIPOSANGUNEO': 'TIPO SANGU\u00cdNEO',
    'rAAMESTIO': 'RAZA / MESTIZO',
    'cONDIESHISTRICO': 'CONDICIONES & HISTORIAL'
  }
};

langs.forEach(lang => {
  const filePath = `c:/Users/User/Documents/VigilaroCareV6 Neo/locales/${lang}/common.json`;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    if (json.headersFirst) {
      // Apply known fixes
      const fixes = correctValues[lang];
      if (fixes) {
        Object.keys(fixes).forEach(key => {
          if (json.headersFirst[key] !== undefined) {
            console.log(`  [${lang}] Fixing headersFirst.${key}: "${json.headersFirst[key]}" -> "${fixes[key]}"`);
            json.headersFirst[key] = fixes[key];
          }
        });
      }
      
      // Generic scan: fix any remaining mojibake in ALL values
      Object.keys(json.headersFirst).forEach(key => {
        let val = json.headersFirst[key];
        if (typeof val !== 'string') return;
        
        // Common mojibake patterns (UTF-8 interpreted as Latin-1)
        const replacements = [
          [/\u00c3\u00a1/g, '\u00e1'],  // á
          [/\u00c3\u00a9/g, '\u00e9'],  // é
          [/\u00c3\u00ad/g, '\u00ed'],  // í
          [/\u00c3\u00b3/g, '\u00f3'],  // ó
          [/\u00c3\u00ba/g, '\u00fa'],  // ú
          [/\u00c3\u00a3/g, '\u00e3'],  // ã
          [/\u00c3\u00b5/g, '\u00f5'],  // õ
          [/\u00c3\u00aa/g, '\u00ea'],  // ê
          [/\u00c3\u00a7/g, '\u00e7'],  // ç
          [/\u00c3\u0160/g, '\u00ca'],  // Ê
          [/\u00c3\u201c/g, '\u00d3'],  // Ó
          [/\u00c3\u2021/g, '\u00c7'],  // Ç
          [/\u00c3\u2022/g, '\u00d5'],  // Õ
          [/\u00c3\u0178/g, '\u00df'],  // ß (unlikely but safe)
          [/\u00c3\u201a/g, '\u00e2'],  // â
        ];
        
        let newVal = val;
        replacements.forEach(([pattern, replacement]) => {
          newVal = newVal.replace(pattern, replacement);
        });
        
        if (newVal !== val) {
          console.log(`  [${lang}] Generic fix headersFirst.${key}: "${val}" -> "${newVal}"`);
          json.headersFirst[key] = newVal;
        }
      });
    }
    
    // Write back with UTF-8 BOM to ensure proper encoding
    const output = JSON.stringify(json, null, 4);
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`[${lang}] File saved successfully.`);
    
  } catch (err) {
    console.error(`[${lang}] Error: ${err.message}`);
  }
});

console.log('\nAll locale files processed!');
