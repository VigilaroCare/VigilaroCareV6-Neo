/**
 * verify_pais_emergencia.js — o número de emergência segue o país onde a
 * pessoa ESTÁ (D20/emergência, 17/10/2026). npm run validate:pais
 *
 * 1. Detecção pela posição contra cidades reais — capitais, litoral, ilhas,
 *    cidades de fronteira (onde a regra é "na dúvida, 112") e alto-mar.
 * 2. Os textos e os botões de ligar usam o país físico quando há posição, e
 *    o da Região do aparelho quando não há.
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
let regiaoDoAparelho = 'BR';
const i18nFalso = { language: 'pt-BR', t: (k, o) => (o && o.defaultValue) || k };
const dubles = {
    'expo-localization': { getLocales: () => [{ regionCode: regiaoDoAparelho }] },
    '../i18n': { default: i18nFalso },
};
const carregarOriginal = Module._load;
Module._load = function (pedido, pai, ...resto) {
    if (pedido in dubles) return { __esModule: true, ...dubles[pedido] };
    return carregarOriginal.call(this, pedido, pai, ...resto);
};
global.__DEV__ = false;

const { paisPelaPosicao } = require('../utils/getEmergencyCountry');

let falhas = 0;
const ok = (c, m) => { console.log(`  ${c ? 'OK   ' : 'FALHA'} ${m}`); if (!c) falhas++; };

console.log('1. País pela posição');
// [lugar, lat, lon, esperado]  — esperado null = "na dúvida, 112"
const CASOS = [
    ['São Paulo', -23.55, -46.63, 'BR'], ['Brasília', -15.79, -47.88, 'BR'],
    ['Maceió (litoral que o contorno antigo perdia)', -9.67, -35.74, 'BR'],
    ['Fortaleza', -3.73, -38.52, 'BR'], ['Manaus', -3.12, -60.02, 'BR'],
    ['Porto Alegre', -30.03, -51.23, 'BR'], ['Florianópolis (ilha)', -27.60, -48.55, 'BR'],
    ['Santos', -23.96, -46.33, 'BR'], ['Rio de Janeiro', -22.91, -43.17, 'BR'],
    ['Foz do Iguaçu (tríplice fronteira)', -25.54, -54.58, null],
    ['Ponta Porã (colada a Pedro Juan Caballero)', -22.536, -55.726, null],
    ['Chuí (fronteira com o Uruguai)', -33.69, -53.46, null],
    ['Lisboa', 38.72, -9.14, 'PT'], ['Porto', 41.15, -8.61, 'PT'],
    ['Funchal (Madeira)', 32.65, -16.91, 'PT'], ['Ponta Delgada (Açores)', 37.74, -25.67, 'PT'],
    ['Madrid', 40.42, -3.70, 'ES'], ['Palma (Baleares)', 39.57, 2.65, 'ES'],
    ['Las Palmas (Canárias)', 28.12, -15.43, 'ES'],
    ['Badajoz (fronteira PT/ES — os dois discam 112)', 38.88, -6.97, 'ES'],
    ['Londres', 51.51, -0.13, 'GB'], ['Belfast', 54.60, -5.93, 'GB'],
    ['Nova York', 40.71, -74.01, 'US'], ['Honolulu (Havaí)', 21.31, -157.86, 'US'],
    ['Anchorage (Alasca)', 61.22, -149.90, 'US'], ['Miami', 25.76, -80.19, 'US'],
    ['Cidade do México', 19.43, -99.13, 'MX'], ['Cancún', 21.16, -86.85, 'MX'],
    ['Tijuana (fronteira US/MX — os dois discam 911)', 32.51, -117.04, 'MX'],
    ['Paris', 48.86, 2.35, 'FR'], ['Tóquio', 35.68, 139.69, 'JP'], ['Buenos Aires', -34.60, -58.38, 'AR'],
    ['Meio do Atlântico', 0, -30, null],
];
for (const [lugar, lat, lon, esperado] of CASOS) {
    const r = paisPelaPosicao(lat, lon);
    ok(r.pais === esperado, `${lugar}: ${r.pais ?? '112 (na dúvida)'} [${r.motivo}]`);
}

console.log('\n2. Números nos textos e botões');
const tok = require('../utils/emergencyTokens');
const cenario = (nome, regiao, posicao, esperado) => {
    regiaoDoAparelho = regiao;
    tok.resetEmergencyCountryCache();
    tok.definirPaisFisico(posicao ? paisPelaPosicao(...posicao) : undefined);
    const medico = tok.getMedicalDial(); const bombeiros = tok.getFireDial();
    const texto = tok.resolveEmergencyTokens('Ligue para o {{EMERGENCY_MEDICAL}}. Bombeiros: {{FIRE_NUMBER}}. Intoxicação: {{POISON_CONTROL}}.');
    const selo = tok.resolveEmergencyTokens('{{CERT_SEAL}}');
    ok(medico === esperado.medico && bombeiros === esperado.bombeiros, `${nome}: socorro ${medico}, bombeiros ${bombeiros}`);
    ok(texto.includes(`(${esperado.medico})`) && !texto.includes('{{'), `${nome}: texto → "${texto}"`);
    ok(tok.getPoisonControlLabel().includes(esperado.intox), `${nome}: intoxicação → ${tok.getPoisonControlLabel()}`);
    ok(selo.includes(esperado.selo), `${nome}: norma segue o aparelho → ${selo}`);
    return tok.getEstadoPaisEmergencia();
};
const LISBOA = [38.72, -9.14]; const RIO = [-22.91, -43.17]; const TOQUIO = [35.68, 139.69]; const FOZ = [-25.54, -54.58];
let e = cenario('Brasileiro em Lisboa', 'BR', LISBOA, { medico: '112', bombeiros: '112', intox: 'CIAV', selo: 'INMETRO' });
ok(e.origem === 'posicao' && e.pais === 'PT' && e.paisAparelho === 'BR', 'estado: posição PT, aparelho BR (aviso "você está em Portugal")');
e = cenario('Brasileiro em casa, SEM localização', 'BR', null, { medico: '192', bombeiros: '193', intox: 'CIATOX', selo: 'INMETRO' });
ok(e.origem === 'aparelho', 'estado: origem aparelho (aviso "sem localização")');
cenario('Português no Rio', 'PT', RIO, { medico: '192', bombeiros: '193', intox: 'CIATOX', selo: '' });
cenario('Brasileiro em Tóquio (país sem número verificado)', 'BR', TOQUIO, { medico: '112', bombeiros: '112', intox: '112', selo: 'INMETRO' });
e = cenario('Em Foz do Iguaçu (fronteira)', 'BR', FOZ, { medico: '112', bombeiros: '112', intox: '112', selo: 'INMETRO' });
ok(e.pais === null && e.motivo === 'fronteira', 'estado: na dúvida, fronteira');
tok.definirPaisFisico(undefined);

console.log(`\nRESULTADO: ${falhas ? falhas + ' falha(s)' : 'aprovado'}`);
process.exit(falhas ? 1 : 0);
