/**
 * verify_legal.js — a política de privacidade está publicável?
 *
 * Existe por causa de um erro cometido ao escrever as políticas: os campos que
 * só o titular do negócio pode preencher foram postos como texto visível
 * ("[PREENCHER: razão social e CNPJ]"), com o argumento de que assim não
 * passariam batido. O argumento estava certo; o lugar, errado — quem lia o
 * recado era o usuário final.
 *
 * O recado mudou de endereço: o texto degrada em silêncio (a frase some) e a
 * cobrança vem para cá, onde ela pode travar a publicação sem cobrar nada de
 * quem instala o app.
 *
 * Uso: node scripts/verify_legal.js   (entra em `npm run validate`)
 * Sai com código 1 enquanto faltar campo obrigatório.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ARQ = path.join(RAIZ, 'data', 'legal', 'politica_privacidade.js');
const src = fs.readFileSync(ARQ, 'utf8');

const linha = (s) => '  ' + s;
console.log('\n══════════════════════════════════════════════════════════════');
console.log('  VIGILARO CARE — CONFORMIDADE LEGAL DA POLÍTICA');
console.log('══════════════════════════════════════════════════════════════\n');

const problemas = [];

// 1. Nenhum marcador de preenchimento pode sobrar no texto que vai à tela.
const marcadores = src.match(/\[PREENCHER[^\]]*\]/g) || [];
if (marcadores.length) {
    problemas.push(
        'Há ' + marcadores.length + ' marcador(es) [PREENCHER] no arquivo. ' +
        'Texto de preenchimento NUNCA deve chegar ao usuário — use `null` e ' +
        'deixe a frase ser omitida.'
    );
}

// 2. Campos de identidade obrigatórios.
const valor = (campo) => {
    const m = new RegExp(campo + ':\\s*([^,\\n]+)').exec(src);
    return m ? m[1].trim() : null;
};
const razao = valor('razaoSocial');
const repUE = valor('representanteUE');

if (!razao || razao === 'null') {
    problemas.push(
        'CONTROLADOR.razaoSocial está vazio. Razão social e CNPJ são ' +
        'obrigatórios — LGPD art. 9º, I, e RGPD art. 13(1)(a). Sem isso, ' +
        'não publique em NENHUMA loja.'
    );
}
if (!repUE || repUE === 'null') {
    problemas.push(
        'CONTROLADOR.representanteUE está vazio. Controlador fora da UE que ' +
        'oferece serviço a residentes da União precisa designar representante ' +
        'por escrito — RGPD art. 27. Sem isso, não publique nas lojas EUROPEIAS ' +
        '(pt-PT e es). A publicação no Brasil e nos EUA não depende deste item.'
    );
}

// 3. As quatro jurisdições continuam presentes.
for (const chave of ["'pt-BR'", "'pt-PT'", 'es:', 'en:']) {
    if (!src.includes(chave)) problemas.push('Falta a política da jurisdição ' + chave);
}

if (!problemas.length) {
    console.log(linha('Nenhum campo obrigatório em falta.'));
    console.log(linha('As quatro jurisdições estão presentes.\n'));
    console.log('RESULTADO: aprovado — política publicável.\n');
    process.exit(0);
}

problemas.forEach((p, i) => {
    console.log(linha((i + 1) + '. ' + p));
    console.log('');
});
console.log(linha('Ver docs/CONFORMIDADE_LEGAL.md, itens L1 e L2.\n'));
console.log('RESULTADO: reprovado — ' + problemas.length + ' pendência(s) antes de publicar.\n');
process.exit(1);
