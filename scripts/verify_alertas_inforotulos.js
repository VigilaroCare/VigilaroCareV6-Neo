/**
 * verify_alertas_inforotulos.js — o cruzamento do produto com a FAMÍLIA, incluindo os pets.
 * 28/10/2026. npm run validate:alertas
 *
 * O que isto protege:
 *  1. O cadastro grava a espécie como ID ('cao', 'gato', 'ave', 'reptil', 'outro'). O motor só
 *     reconhecia "cão" (com til), "cachorro" e "dog": TODO cachorro cadastrado virava "outro
 *     animal" e as regras de cão (chocolate, xilitol, raticida) nunca disparavam. O teste antigo
 *     só usava "Gato", por isso nunca viu.
 *  2. A lista de toxicidade para pets tinha 17 regras e nenhum remédio de uso humano. Aqui se
 *     confere que os grupos novos disparam para a espécie certa e com a gravidade certa...
 *  3. ...e que NÃO disparam nos falsos alarmes conhecidos: "álcool cetílico" (cosmético),
 *     "nicotinamida" (vitamina B3), "manteiga de cacau", "óleo de semente de uva", "clorofila".
 *  4. A regra do medicamento vale para quem mora com criança ou animal, e só.
 *  5. Todo texto novo existe nos 4 idiomas, e as regras estão ordenadas da mais grave para a
 *     menos grave (o motor para na primeira que casa).
 */
const Module = require('module');
const path = require('path');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');
const compilarOriginal = Module.prototype._compile;
Module.prototype._compile = function (codigo, ficheiro) {
    if (ficheiro.startsWith(RAIZ) && !ficheiro.includes('node_modules') && /^\s*(import|export)\s/m.test(codigo)) {
        codigo = babel.transformSync(codigo, { filename: ficheiro, babelrc: false, configFile: false, plugins: ['@babel/plugin-transform-modules-commonjs'] }).code;
    }
    return compilarOriginal.call(this, codigo, ficheiro);
};
global.__DEV__ = false;
// As bases de conteúdo fazem require() de imagens: no Node elas valem 1.
for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) Module._extensions[ext] = (m) => { m.exports = 1; };

// ── a família do teste muda de um caso para outro ──
const hoje = new Date();
const nasc = (anos) => new Date(hoje.getFullYear() - anos, hoje.getMonth(), 10).toISOString().slice(0, 10);
let humanos = [];
let pets = [];
const calcularIdade = (d) => {
    const n = new Date(d);
    let a = hoje.getFullYear() - n.getFullYear();
    if (hoje < new Date(hoje.getFullYear(), n.getMonth(), n.getDate())) a--;
    return a;
};
const dubles = {
    '../utils/getLocalizedField': { t_field: (o, c) => (o ? (o[c] ?? '') : '') },
    './ProfileService': { default: { getPerfisHumanos: async () => humanos, getPets: async () => pets, calcularIdade } },
};
const carregarOriginal = Module._load;
Module._load = function (pedido, pai, ...resto) {
    const arq = ((pai && pai.filename) || '').split(String.fromCharCode(92)).join('/');
    // getLocalizedField puxa o i18n inteiro (expo-localization): vale para QUALQUER módulo que o peça.
    // O ProfileService só é trocado dentro do motor.
    if (pedido === '../utils/getLocalizedField') return { __esModule: true, ...dubles[pedido] };
    if (pedido in dubles && arq.endsWith('services/InfoRotulosRuleEngine.js')) return { __esModule: true, ...dubles[pedido] };
    return carregarOriginal.call(this, pedido, pai, ...resto);
};

const E = require('../services/InfoRotulosRuleEngine');
const D = require('../data/regras_inforotulos');

let falhas = 0;
const ok = (c, m) => { console.log(`  ${c ? 'OK   ' : 'FALHA'} ${m}`); if (!c) falhas++; };
const familia = (h, p) => { humanos = h; pets = p; };
const adulto = { id: 'a', nome: 'Ana', dataNascimento: nasc(35), condicoesMedicas: [], alergias: [] };
const crianca = { id: 'c', nome: 'Caio', dataNascimento: nasc(4), condicoesMedicas: [], alergias: [] };
const cao = { id: 'p1', nome: 'Rex', especie: 'cao' };
const gato = { id: 'p2', nome: 'Duquesa', especie: 'gato' };
const ave = { id: 'p3', nome: 'Loro', especie: 'ave' };
const reptil = { id: 'p4', nome: 'Tito', especie: 'reptil' };

/** Alertas de pet para o produto: { nomeDoPet: severidade }. */
async function alertasDePet(componentes, nome = 'Produto') {
    const al = await E.evaluateProduct(null, { nome, componentes });
    const r = {};
    for (const a of al.filter((x) => x.rule === 'pet_toxicity')) r[a.profiles[0].nome] = a.severity;
    return r;
}

(async () => {
    console.log('Alertas do Info Rótulos: família e pets');

    // ── 1. espécie ──
    console.log('\n1. Espécie do pet (o cadastro grava IDs)');
    const esp = E.normalizePetSpecies;
    ok(esp('cao') === 'cachorro', "'cao' (o que o cadastro grava) é cachorro");
    ok(esp('gato') === 'gato' && esp('ave') === 'ave' && esp('reptil') === 'reptil' && esp('outro') === 'outro', "ids 'gato', 'ave', 'reptil' e 'outro'");
    ok(['Cão', 'Cachorro', 'cadela', 'dog', 'Canino'].every((x) => esp(x) === 'cachorro'), 'texto livre de cachorro, com e sem acento e maiúscula');
    ok(['Pássaro', 'Calopsita', 'periquito', 'Papagaio'].every((x) => esp(x) === 'ave'), 'texto livre de ave');
    ok(esp('Peixe') === 'peixe' && esp('tartaruga') === 'reptil' && esp('Hamster') === 'outro', 'peixe, réptil e o que não é nenhum deles');
    ok(esp('') === 'outro' && esp(null) === 'outro' && esp(undefined) === 'outro', 'vazio e nulo não quebram');

    // ── 2. cachorro cadastrado como 'cao' recebe as regras de cão ──
    console.log('\n2. Cachorro cadastrado como "cao" recebe os alertas de cão');
    familia([adulto], [cao, gato]);
    let r = await alertasDePet(['Chocolate ao leite', 'açúcar']);
    ok(r.Rex === 'HIGH', 'chocolate: alerta para o cachorro (HIGH)');
    r = await alertasDePet(['xilitol']);
    ok(r.Rex === 'CRITICAL', 'xilitol: CRITICAL para o cachorro');
    const resumo = await E.getFamilySummary();
    ok(/cachorro/.test(resumo.text) && !/outro animal/.test(resumo.text), 'o resumo da família diz "cachorro", não "outro animal"');

    // ── 3. remédios de uso humano ──
    console.log('\n3. Remédios de uso humano (antes: nenhum)');
    r = await alertasDePet(['tadalafila 5 mg', 'lactose monoidratada', 'estearato de magnésio']);
    ok(r.Rex === 'MEDIUM' && r.Duquesa === 'MEDIUM', 'tadalafila (o caso do Zyad): MEDIUM para cão e gato');
    r = await alertasDePet(['Paracetamol 500 mg']);
    ok(r.Duquesa === 'CRITICAL' && r.Rex === 'HIGH', 'paracetamol: CRITICAL para gato, HIGH para cão');
    r = await alertasDePet(['Ibuprofeno 600 mg']);
    ok(r.Duquesa === 'HIGH' && r.Rex === 'HIGH', 'ibuprofeno: HIGH para os dois');
    r = await alertasDePet(['Ácido acetilsalicílico 100 mg']);
    ok(r.Duquesa === 'HIGH' && r.Rex === 'HIGH', 'ácido acetilsalicílico (com acento): HIGH para os dois');
    r = await alertasDePet(['oxalato de escitalopram 10 mg']);
    ok(r.Duquesa === 'HIGH' && r.Rex === 'HIGH', 'antidepressivo (escitalopram): HIGH');
    r = await alertasDePet(['Minoxidil 5%']);
    ok(r.Duquesa === 'CRITICAL' && r.Rex === 'HIGH', 'minoxidil: CRITICAL para gato, HIGH para cão');
    r = await alertasDePet(['cloridrato de metilfenidato']);
    ok(r.Duquesa === 'CRITICAL' && r.Rex === 'CRITICAL', 'estimulante de TDAH: CRITICAL');
    r = await alertasDePet(['Baclofeno']);
    ok(r.Duquesa === 'CRITICAL' && r.Rex === 'CRITICAL', 'baclofeno: CRITICAL');
    r = await alertasDePet(['glibenclamida']);
    ok(r.Duquesa === 'HIGH', 'remédio de diabetes: HIGH');

    // ── 4. alimentos e produtos da casa ──
    console.log('\n4. Alimentos e produtos da casa');
    r = await alertasDePet(['Chumbinho']);
    ok(r.Duquesa === 'CRITICAL' && r.Rex === 'CRITICAL', 'chumbinho: CRITICAL para os dois');
    r = await alertasDePet(['cebola em pó']);
    ok(r.Duquesa === 'HIGH' && r.Rex === 'MEDIUM', 'cebola: HIGH para gato, MEDIUM para cão');
    r = await alertasDePet(['uva passa', 'açúcar']);
    ok(r.Rex === 'HIGH' && !r.Duquesa, 'passas: só o cão');
    r = await alertasDePet(['naftalina']);
    ok(r.Duquesa === 'HIGH' && r.Rex === 'HIGH', 'naftalina: HIGH');
    r = await alertasDePet(['álcool etílico 70%']);
    ok(r.Duquesa === 'MEDIUM', 'álcool etílico: MEDIUM');
    familia([adulto], [ave, gato]);
    r = await alertasDePet(['abacate']);
    ok(r.Loro === 'HIGH' && !r.Duquesa, 'abacate: só a ave');
    r = await alertasDePet(['cacau em pó']);
    ok(r.Loro === 'HIGH' && r.Duquesa === 'MEDIUM', 'cacau em pó: HIGH para ave, MEDIUM para gato');
    familia([adulto], [cao, gato]);

    // ── 5. falsos alarmes conhecidos ──
    console.log('\n5. Falsos alarmes que NÃO podem disparar');
    const inocentes = [
        ['álcool cetílico (cosmético)', ['álcool cetílico', 'água', 'glicerina']],
        ['nicotinamida (vitamina B3)', ['nicotinamida', 'niacinamida', 'água']],
        ['manteiga de cacau', ['manteiga de cacau', 'óleo de coco']],
        ['óleo de semente de uva', ['óleo de semente de uva', 'tocoferol']],
        ['óleo de macadâmia', ['óleo de macadâmia']],
        ['clorofila (corante)', ['clorofila', 'água']],
        ['sal e açúcar', ['sal', 'açúcar', 'água']],
    ];
    for (const [rotulo, comps] of inocentes) {
        const x = await alertasDePet(comps);
        ok(Object.keys(x).length === 0, `${rotulo}: nenhum alerta de pet`);
    }

    // ── 6. remédio onde há criança pequena ou animal ──
    console.log('\n6. Guarda segura do remédio');
    const regras = async (comps, extra = {}) => (await E.evaluateProduct(null, { nome: 'X', componentes: comps, ...extra })).map((a) => a.rule);
    familia([adulto], [gato]);
    ok((await regras(['tadalafila 5 mg'])).includes('medicine_storage'), 'remédio + animal em casa: alerta de guarda');
    familia([adulto, crianca], []);
    ok((await regras(['dipirona sódica 500 mg'])).includes('medicine_storage'), 'remédio + criança: alerta de guarda');
    familia([adulto], []);
    ok(!(await regras(['tadalafila 5 mg'])).includes('medicine_storage'), 'só adultos: sem o alerta (não é aviso sobre usar o remédio)');
    familia([adulto, crianca], [gato]);
    ok(!(await regras(['hipoclorito de sódio', 'água'])).includes('medicine_storage'), 'produto de limpeza não é remédio');
    ok((await regras(['vitamina E'], { categoria: 'Suplemento em cápsulas' })).includes('medicine_storage'), 'suplemento em cápsulas conta (a categoria diz)');
    ok(!(await regras(['hidroclorotiazida 25 mg', 'cloroquina'])).includes('mixture_warning'), 'hidroclorotiazida e cloroquina NÃO são cloro: sem o aviso "nunca misturar"');
    ok(E.pareceMedicamento({}, 'Zyad', ['tadalafila 5 mg']) && !E.pareceMedicamento({}, 'Desinfetante', ['água', 'tensoativo']), 'a dose em mg ao lado do componente distingue o remédio');

    // ── 7. quem foi conferido ──
    console.log('\n7. Quem foi conferido (a tela mostra)');
    familia([adulto, crianca], [cao, gato, reptil]);
    const conf = await E.getFamilyCheck();
    ok(conf.total === 5 && conf.pessoas.length === 2 && conf.pets.length === 3, 'pessoas e pets, todos, sem depender de quem é o perfil ativo');
    ok(conf.pets.map((p) => p.especie).join() === 'cachorro,gato,reptil', 'a espécie de cada pet já normalizada');
    ok(conf.pessoas[1].nome === 'Caio' && conf.pessoas[1].idade === 4, 'nome e idade das pessoas');
    familia([], []);
    ok((await E.getFamilyCheck()).total === 0, 'casa sem cadastro: total 0 (a tela convida a cadastrar)');

    // ── 8. a tabela e os textos ──
    console.log('\n8. Integridade da tabela');
    const sev = new Set(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']);
    const peso = { CRITICAL: 5, HIGH: 4, MEDIUM: 3, LOW: 2, INFO: 1 };
    const todas = Object.values(D.TOXICIDADE_PETS).flat();
    ok(todas.every((x) => x.match instanceof RegExp && sev.has(x.severity)), 'toda regra tem regex e gravidade válida');
    ok(todas.every((x) => ['mensagem', 'mensagem_en', 'mensagem_es', 'mensagem_ptpt'].every((k) => typeof x[k] === 'string' && x[k].trim().length > 10)), 'toda regra de pet tem a mensagem nos 4 idiomas');
    const ordenada = Object.values(D.TOXICIDADE_PETS).every((l) => l.every((x, i) => i === 0 || peso[l[i - 1].severity] >= peso[x.severity]));
    ok(ordenada, 'em cada espécie, da mais grave para a menos grave (o motor para na primeira que casa)');
    const ids = D.RISCOS_COMUNS_PETS.map((x) => x.id);
    ok(new Set(ids).size === ids.length, 'ids dos grupos novos são únicos');
    ok(Object.keys(D.TOXICIDADE_PETS).every((e) => D.ESPECIES[e]) && D.ESPECIES.reptil && D.ESPECIES.outro, 'toda espécie com regras (e o réptil) tem nome para o alerta');
    ok(['titulo', 'mensagem', 'acao'].every((c) => ['', '_en', '_es', '_ptpt'].every((s) => typeof D.ALERTAS.medicamento[c + s] === 'string' && D.ALERTAS.medicamento[c + s].length > 5)), 'o alerta do medicamento existe nos 4 idiomas');
    ok(!D.TOXICIDADE_PETS.gato.concat(D.TOXICIDADE_PETS.cachorro).some((x) => /\d+\s*mg\s*\/\s*kg/i.test(x.mensagem)), 'nenhuma dose em mg/kg sem fonte (o "10mg/kg" foi retirado em 28/10)');

    console.log(falhas ? `\n${falhas} falha(s).` : '\nTudo certo.');
    process.exit(falhas ? 1 : 0);
})();
