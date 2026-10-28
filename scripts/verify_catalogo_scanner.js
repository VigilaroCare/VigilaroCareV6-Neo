/**
 * verify_catalogo_scanner.js
 *
 * Garante que as chaves numéricas do catálogo de produtos (data/produtos_scanner.js)
 * são códigos de barras que PODEM existir, e que os sinônimos de busca apontam
 * para produtos que existem.
 *
 * POR QUE: em 28/10/2026 a análise do módulo achou 11 de 22 códigos EAN-13 com o
 * dígito verificador errado — códigos que nenhum leitor produz, escritos à mão
 * como se fossem de produtos reais. Um código de barras identifica um produto
 * comercial específico; o catálogo é de produtos GENÉRICOS ("Ibuprofeno"). Quem
 * não tem código de verdade usa chave de texto e só é achado pela busca por nome.
 *
 * Não prova que o código seja real, só que não é impossível. A origem dos que
 * passam continua desconhecida (ver o cabeçalho do catálogo).
 *
 * Rodar: node scripts/verify_catalogo_scanner.js
 */
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'data', 'produtos_scanner.js'), 'utf8');

const dv = (c) => {
    const d = c.slice(0, 12).split('').map(Number);
    return (10 - (d.reduce((a, x, i) => a + x * (i % 2 ? 3 : 1), 0) % 10)) % 10;
};

const chaves = [...src.matchAll(/^  '([^']+)': \{\s*\n\s*nome: '/gm)].map((m) => m[1]);
const sinonimos = [...src.matchAll(/^  '([^']+)': '[^']*',?\s*$/gm)].map((m) => m[1]);

const erros = [];
for (const c of chaves) {
    if (/^[0-9]+$/.test(c)) {
        if (c.length !== 13) erros.push(`${c}: chave numérica que não tem 13 dígitos (EAN-13)`);
        else if (dv(c) !== +c[12]) erros.push(`${c}: dígito verificador inválido (o certo seria ${dv(c)}) — esse código não existe no mundo real`);
    }
}
const existentes = new Set(chaves);
for (const c of sinonimos) {
    if (!existentes.has(c)) erros.push(`sinônimo órfão: "${c}" não é chave do catálogo`);
}

const numericas = chaves.filter((c) => /^[0-9]+$/.test(c)).length;
console.log(`Catálogo do scanner: ${chaves.length} entradas (${numericas} com código EAN-13, ${chaves.length - numericas} só por nome), ${sinonimos.length} listas de sinônimos.`);
if (erros.length) {
    console.error('\nFALHA — catálogo com problema:\n  ' + erros.join('\n  '));
    process.exit(1);
}
console.log('OK — todo código numérico passa no dígito verificador e todo sinônimo tem produto.');
