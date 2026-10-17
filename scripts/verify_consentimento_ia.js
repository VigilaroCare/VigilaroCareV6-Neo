/**
 * verify_consentimento_ia.js — sem permissão explícita, NENHUMA chamada de IA
 * sai do aparelho (Apple 5.1.2(i); LGPD art. 11, I, e 33, VIII). 17/10/2026.
 * npm run validate:ia
 *
 * Roda o VisionService de verdade com a rede espionada: sem consentimento,
 * zero requisições; recusou, zero; permitiu, a requisição sai; revogou, para.
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

const disco = {};
let respostaDoUsuario = 'Agora não';
let perguntas = 0;
let requisicoes = 0;
const dubles = {
    '@react-native-async-storage/async-storage': { default: {
        getItem: async (k) => (k in disco ? disco[k] : null),
        setItem: async (k, v) => { disco[k] = v; },
        removeItem: async (k) => { delete disco[k]; },
    } },
    'react-native': { DeviceEventEmitter: { emit: () => {} } },
    '../i18n': { default: { t: (k, o) => (o && o.defaultValue) || k, language: 'pt-BR' } },
    '../utils/NeoAlert': { default: { alert: (_t, _m, botoes) => {
        perguntas++;
        const b = botoes.find((x) => x.text === respostaDoUsuario);
        setTimeout(() => b.onPress(), 0);
    } } },
    '../utils/Config': { Config: { VIGILARO_PROXY_URL: 'https://proxy.teste', APP_SECRET: 'x' } },
    '../utils/fetchWithTimeout': { fetchWithTimeout: async () => { requisicoes++; return { ok: true, json: async () => ({ choices: [{ message: { content: '{}' } }] }) }; } },
    './InfoRotulosRuleEngine': { getFamilySummary: async () => '' },
};
const carregarOriginal = Module._load;
Module._load = function (pedido, pai, ...resto) {
    if (pedido in dubles) return { __esModule: true, ...dubles[pedido] };
    return carregarOriginal.call(this, pedido, pai, ...resto);
};
global.__DEV__ = false;
global.fetch = async () => { requisicoes++; return { ok: true, json: async () => ({}) }; };

const C = require('../services/ConsentimentoIAService').default;
const { VisionService } = require('../services/VisionService');

let falhas = 0;
const ok = (c, m) => { console.log(`  ${c ? 'OK   ' : 'FALHA'} ${m}`); if (!c) falhas++; };
const tentar = async () => { try { await VisionService.analyzeImage('AAAA', 'environment'); return 'enviou'; } catch (e) { return e.name; } };

(async () => {
    console.log('Trava de IA (VisionService real, rede espionada)');
    ok((await tentar()) === 'SemConsentimentoIA' && requisicoes === 0, 'nunca perguntado: bloqueia, zero requisições');

    respostaDoUsuario = 'Agora não';
    ok((await C.pedir()) === false && perguntas === 1, 'pergunta e a pessoa recusa');
    ok((await tentar()) === 'SemConsentimentoIA' && requisicoes === 0, 'recusou: bloqueia, zero requisições');

    respostaDoUsuario = 'Permitir';
    ok((await C.pedir()) === true && perguntas === 2, 'pergunta de novo (ação da pessoa) e ela permite');
    ok((await C.pedir()) === true && perguntas === 2, 'já permitido: não pergunta outra vez');
    const r = await tentar();
    ok(r !== 'SemConsentimentoIA' && requisicoes >= 1, `permitiu: a análise sai (requisições: ${requisicoes})`);

    const antes = requisicoes;
    await C.definir(false);
    ok((await tentar()) === 'SemConsentimentoIA' && requisicoes === antes, 'revogou em Suas escolhas: bloqueia de novo');

    disco['@vigilaro_consentimento_ia'] = JSON.stringify({ versao: 0, aceito: true });
    ok(!(await C.temConsentimento()), 'consentimento de versão antiga do texto não vale');

    console.log(`\nRESULTADO: ${falhas ? falhas + ' falha(s)' : 'aprovado'}`);
    process.exit(falhas ? 1 : 0);
})();
