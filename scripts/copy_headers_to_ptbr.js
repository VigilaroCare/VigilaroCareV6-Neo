/**
 * Copy headersFirst section from pt-PT to pt-BR locale
 * (pt-PT was already fixed by fix_locales.js)
 */
const fs = require('fs');

const ptPTPath = 'c:/Users/User/Documents/VigilaroCareV6 Neo/locales/pt-PT/common.json';
const ptBRPath = 'c:/Users/User/Documents/VigilaroCareV6 Neo/locales/pt-BR/common.json';

const ptPT = JSON.parse(fs.readFileSync(ptPTPath, 'utf8'));
const ptBR = JSON.parse(fs.readFileSync(ptBRPath, 'utf8'));

if (ptPT.headersFirst) {
    ptBR.headersFirst = { ...ptPT.headersFirst };
    fs.writeFileSync(ptBRPath, JSON.stringify(ptBR, null, 4), 'utf8');
    console.log(`Copied ${Object.keys(ptPT.headersFirst).length} headersFirst keys from pt-PT to pt-BR.`);
    console.log('Sample values:');
    console.log('  vNCULOCOMARESIDNCIA:', ptBR.headersFirst.vNCULOCOMARESIDNCIA);
    console.log('  tIPOSANGUNEO:', ptBR.headersFirst.tIPOSANGUNEO);
    console.log('  rAAMESTIO:', ptBR.headersFirst.rAAMESTIO);
    console.log('  cONDIESHISTRICO:', ptBR.headersFirst.cONDIESHISTRICO);
} else {
    console.log('ERROR: pt-PT has no headersFirst!');
}
