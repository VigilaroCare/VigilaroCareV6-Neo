// verify_ficha_medica.js — a ficha médica de emergência sai no idioma do app,
// com condições/alergias/necessidades traduzidas e sem id cru, e o valor
// gravado no perfil não muda (D20, 17/10/2026). npm run validate:ficha
const Module = require('module');
const path = require('path');
const babel = require('@babel/core');
const i18next = require('i18next');

const RAIZ = path.join(__dirname, '..');
const compilarOriginal = Module.prototype._compile;
Module.prototype._compile = function (codigo, ficheiro) {
    if (ficheiro.startsWith(RAIZ) && !ficheiro.includes('node_modules') && /^\s*(import|export)\s/m.test(codigo)) {
        codigo = babel.transformSync(codigo, { filename: ficheiro, babelrc: false, configFile: false, plugins: ['@babel/plugin-transform-modules-commonjs'] }).code;
    }
    return compilarOriginal.call(this, codigo, ficheiro);
};

const recursos = {};
for (const l of ['pt-BR', 'pt-PT', 'en', 'es']) recursos[l] = { common: require(`../locales/${l}/common.json`) };
const i18n = i18next.createInstance();
i18n.init({ resources: recursos, lng: 'pt-BR', fallbackLng: 'pt-BR', defaultNS: 'common', interpolation: { escapeValue: false }, initImmediate: false });

const perfil = {
    id: 'p1', nome: 'Ana', dataNascimento: '1950-03-10', tipoSanguineo: 'O-',
    alergias: ['Amendoim', 'Penicilina', 'pó de giz'],
    condicoesMedicas: ['Diabetes', 'Epilepsia', 'Dor Crônica'],
    necessidadesEspeciais: ['visual', 'balance'],
    // Texto livre (22/10/2026): sai na ficha como foi digitado e escapado no PDF.
    comunicacaoEmergencia: 'Não fala; acalma com fone <b>',
};
const dubles = {
    '../i18n': { default: i18n },
    'expo-print': {}, 'expo-sharing': {},
    'react-native': { Share: { share: async () => {} } },
    './ProfileService': { default: { getPerfilAtivo: async () => perfil, getMoradia: async () => ({ endereco: 'Rua A, 10', andar: 3 }), calcularIdade: () => 76 } },
    './HealthService': { default: { getHealthSummary: async () => ({ conditions: perfil.condicoesMedicas, specialNeeds: perfil.necessidadesEspeciais, medications: [] }) } },
    '../utils/SecureStorage': { Storage: { getItem: async () => JSON.stringify([{ nome: 'Rui', telefone: '+351 900' }]) } },
    './getEmergencyCountry': { detectEmergencyCountry: () => 'BR' },
};
const carregarOriginal = Module._load;
Module._load = function (pedido, pai, ...resto) {
    if (pedido in dubles) return { __esModule: true, ...dubles[pedido] };
    return carregarOriginal.call(this, pedido, pai, ...resto);
};
global.__DEV__ = false;

const FMS = require('../services/FichaMedicaService').default;
const { rotuloOpcaoPerfil } = require('../data/opcoesPerfil');
const { rotuloOnboarding, PET_SPECIES } = require('../data/onboarding_data');

let falhas = 0;
const ok = (c, m) => { console.log(`  ${c ? 'OK   ' : 'FALHA'} ${m}`); if (!c) falhas++; };

(async () => {
    const esperado = {
        'pt-BR': ['ALERGIAS: AMENDOIM', 'Diabetes, Epilepsia, Dor Crônica', 'Deficiência Visual, Desequilíbrio/Vertigem', 'Idade: 76 anos', 'Cão'],
        'pt-PT': ['ALERGIAS: AMENDOIM', 'Dor Crónica', 'Deficiência Visual', 'Morada:', 'Cão'],
        en: ['ALLERGIES: PEANUTS, PENICILLIN, PÓ DE GIZ', 'Diabetes, Epilepsy, Chronic Pain', 'Visual Impairment, Balance Problems/Vertigo', 'Age: 76 years old', 'Dog'],
        es: ['ALERGIAS: CACAHUETE / MANÍ', 'Diabetes, Epilepsia, Dolor Crónico', 'Discapacidad Visual', 'Edad: 76 años', 'Perro'],
    };
    for (const [lng, trechos] of Object.entries(esperado)) {
        await i18n.changeLanguage(lng);
        console.log(`\n${lng}`);
        const f = await FMS.coletar();
        const txt = FMS.gerarTexto(f);
        const html = FMS.gerarHtml(f);
        for (const t of trechos.slice(0, -1)) ok(txt.includes(t), `texto contém "${t}"`);
        ok(!/\b(visual|balance)\b/.test(txt), 'texto sem id cru de necessidade');
        ok(rotuloOnboarding(PET_SPECIES, 'cao') === trechos[trechos.length - 1], `espécie "cao" → ${rotuloOnboarding(PET_SPECIES, 'cao')}`);
        ok(html.includes(`lang="${lng}"`), `PDF com lang="${lng}"`);
        ok(txt.includes('Não fala; acalma com fone <b>'), 'texto traz a comunicação como digitada');
        ok(html.includes('acalma com fone &lt;b&gt;') && !html.includes('fone <b>'), 'PDF traz a comunicação escapada');
        if (lng !== 'pt-BR' && lng !== 'pt-PT') ok(!/Condições médicas|Necessidades especiais|Gerada em/.test(txt + html), 'sem rótulo em português');
        if (lng === 'en') console.log('\n' + txt.split('\n').map((l) => '    | ' + l).join('\n'));
    }
    // O valor gravado não muda: o rótulo não vira valor.
    ok(perfil.alergias[0] === 'Amendoim' && perfil.necessidadesEspeciais[0] === 'visual', 'perfil gravado intacto (pt-BR / id)');
    ok(rotuloOpcaoPerfil('texto livre') === 'texto livre', 'valor digitado volta como está');
    console.log(`\nRESULTADO: ${falhas ? falhas + ' falha(s)' : 'aprovado'}`);
    process.exit(falhas ? 1 : 0);
})();
