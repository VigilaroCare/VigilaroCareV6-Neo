/**
 * verify_necessidades.js — necessidades especiais de PESSOAS ativam itens da vistoria.
 *
 * Até 22/10/2026 só as condições de pets mudavam o checklist e o Mapa de Riscos;
 * neurodivergência, deficiência visual/auditiva e mobilidade marcadas no perfil
 * eram gravadas e não chegavam a nada. Esta trava garante que cada grupo ativa
 * os seus itens, só eles, e que todos estão classificados (data/categoriasRisco.js).
 * Ao criar item com uma destas tags, ajuste a contagem em GRUPOS.
 */
const path = require('path');
const Module = require('module');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');
const compilarOriginal = Module.prototype._compile;
Module.prototype._compile = function (codigo, ficheiro) {
    if (ficheiro.startsWith(RAIZ) && !ficheiro.includes('node_modules') && /^\s*(import|export)\s/m.test(codigo)) {
        codigo = babel.transformSync(codigo, {
            filename: ficheiro, babelrc: false, configFile: false,
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        }).code;
    }
    return compilarOriginal.call(this, codigo, ficheiro);
};
global.__DEV__ = false;

const { isItemRelevant } = require('../utils/ProfileFilterEngine');
const { CHECKLISTS } = require('../data/mapeamento_dados');
const { categoriasDoItem } = require('../data/categoriasRisco');

// tag de público -> [id de necessidade que a ativa, quantos itens a usam]
const GRUPOS = {
    neurodivergente: ['neurodivergence', 5],
    deficiencia_visual: ['visual', 3],
    deficiencia_auditiva: ['hearing', 2],
    mobilidade_pessoa: ['mobility', 4],
};

const todos = Object.values(CHECKLISTS).flatMap((a) => a.categorias.flatMap((c) => c.itens));
const pessoa = (n) => ({ id: n || 'adulto', tipo: 'humano', dataNascimento: '1980-01-01', necessidadesEspeciais: n ? [n] : [] });

let falhas = 0;
const ok = (cond, msg) => { console.log(`  ${cond ? 'OK   ' : 'FALHA'} ${msg}`); if (!cond) falhas++; };

for (const [tag, [nec, qtd]] of Object.entries(GRUPOS)) {
    const itens = todos.filter((i) => (i.tags || []).includes(tag));
    ok(itens.length === qtd, `${tag}: ${itens.length} itens (esperado ${qtd})`);
    ok(itens.every((i) => !isItemRelevant(i, [pessoa(null)], {})), `${tag}: casa sem a necessidade não vê`);
    ok(itens.every((i) => isItemRelevant(i, [pessoa(null), pessoa(nec)], {})), `${tag}: pessoa com "${nec}" vê todos`);
    for (const [outra, [necOutra]] of Object.entries(GRUPOS)) {
        if (outra !== tag) ok(itens.every((i) => !isItemRelevant(i, [pessoa(necOutra)], {})), `${tag}: "${necOutra}" não ativa`);
    }
    ok(itens.every((i) => categoriasDoItem(i).length > 0), `${tag}: itens classificados`);
}
ok(todos.filter((i) => (i.tags || []).includes('mobilidade_pessoa')).every((i) => isItemRelevant(i, [pessoa('balance')], {})),
    'desequilíbrio ("balance") ativa os itens de mobilidade');
ok(todos.filter((i) => (i.tags || []).includes('neurodivergente')).every((i) => !isItemRelevant(i, [{ id: 'p', tipo: 'pet', especie: 'cao', necessidadesEspeciais: ['disfuncao_cognitiva'] }], {})),
    'pet com disfunção cognitiva não ativa itens de pessoa');

console.log(`\nRESULTADO: ${falhas ? falhas + ' falha(s)' : 'aprovado'}`);
process.exit(falhas ? 1 : 0);
