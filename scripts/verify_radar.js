/**
 * verify_radar.js — D17: o Radar sazonal mostra o risco certo, no país
 * certo, na data certa, para a casa certa.
 *
 * Carrega o RadarSazonalEngine e o ProfileFilterEngine REAIS (ESM -> CJS via
 * Babel) e confere:
 *   1. integridade do conteúdo: ids únicos, país suportado, região válida,
 *      datas MM-DD válidas, regra de evento conhecida, severidade 1-3,
 *      título/resumo/orientações nos 3 idiomas, mesmo número de orientações,
 *      fonte citada, tokens conhecidos, público válido;
 *   2. datas móveis contra calendários publicados (Páscoa, Carnaval,
 *      Thanksgiving, mudanças de hora nos EUA e na Europa);
 *   3. cobertura: todo país tem pelo menos um risco em todos os 12 meses;
 *   4. hemisfério e país: cenários conhecidos (frio em julho no Sul do
 *      Brasil, frio em janeiro em Portugal — nunca o contrário; nada do
 *      Brasil aparece em Portugal);
 *   5. fases e contagem regressiva de eventos;
 *   6. personalização pela regra canônica (criança, idoso, pet);
 *   7. agenda de avisos.
 *
 * Uso: node scripts/verify_radar.js
 */
const path = require('path');
const fs = require('fs');
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

const dados = require(path.join(RAIZ, 'data/radarSazonal'));
const motor = require(path.join(RAIZ, 'services/RadarSazonalEngine'));
const { JANELAS_SAZONAIS, PAISES_RADAR, REGIOES, ALERTAS_OFICIAIS } = dados;

let falhas = 0;
const ok = (cond, msg) => { if (cond) console.log(`  OK    ${msg}`); else { falhas++; console.log(`  FALHA ${msg}`); } };
const iso = (ms) => new Date(ms).toISOString().slice(0, 10);

// Tokens que o resolvedor conhece (lidos do próprio código, para não divergir).
const fonteTokens = fs.readFileSync(path.join(RAIZ, 'utils/emergencyTokens.js'), 'utf8');
const tokensFixos = fonteTokens.match(/\\\\\{\\\\\{\(([A-Z_|]+)\|\$\{/);
const TOKENS = new Set([
    ...(tokensFixos ? tokensFixos[1].split('|') : []),
    ...require(path.join(RAIZ, 'data/classesIncendio')).TOKENS_CLASSES_INCENDIO,
    ...require(path.join(RAIZ, 'data/regrasTransitoPorPais')).TOKENS_REGRAS_TRANSITO,
]);

// ─── 1. Integridade ─────────────────────────────────────────────────────────
console.log('1. integridade do conteúdo');
const ids = new Set();
const erros = [];
const MMDD = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const REGRAS = ['fixo', 'pascoa', 'carnaval', 'thanksgiving', 'dst_us_inicio', 'dst_us_fim', 'hora_eu_marco', 'hora_eu_outubro'];
const PUBLICO = ['crianca', 'bebe', 'idoso', 'pet'];
for (const j of JANELAS_SAZONAIS) {
    const e = (m) => erros.push(`${j.id}: ${m}`);
    if (ids.has(j.id)) e('id duplicado'); ids.add(j.id);
    if (!j.paises || !j.paises.length || j.paises.some((p) => !PAISES_RADAR.includes(p))) e('país inválido');
    for (const r of j.regioes || []) {
        if (!j.paises.some((p) => (REGIOES[p] || []).some((x) => x.id === r))) e(`região desconhecida ${r}`);
    }
    if (!(j.janelas || []).length && !(j.eventos || []).length) e('sem janela nem evento');
    for (const p of [...(j.janelas || []), ...(j.pico ? [j.pico] : [])]) if (!MMDD.test(p.de) || !MMDD.test(p.ate)) e(`data inválida ${p.de}/${p.ate}`);
    for (const ev of j.eventos || []) {
        if (!REGRAS.includes(ev.regra)) e(`regra ${ev.regra}`);
        if (ev.regra === 'fixo' && !MMDD.test(ev.data || '')) e('evento fixo sem data');
    }
    if (![1, 2, 3].includes(j.severidade)) e('severidade');
    if ((j.publico || []).some((p) => !PUBLICO.includes(p))) e('público inválido');
    if (!j.fonte) e('sem fonte');
    for (const campo of ['titulo', 'resumo']) for (const suf of ['', '_en', '_es']) if (!j[campo + suf]) e(`sem ${campo}${suf}`);
    const n = (j.orientacoes || []).length;
    if (n < 3) e('menos de 3 orientações');
    for (const suf of ['_en', '_es']) if ((j['orientacoes' + suf] || []).length !== n) e(`orientacoes${suf} com ${(j['orientacoes' + suf] || []).length} itens (pt tem ${n})`);
    const texto = JSON.stringify(j);
    for (const t of texto.match(/\{\{([A-Z0-9_]+)\}\}/g) || []) if (!TOKENS.has(t.slice(2, -2))) e(`token desconhecido ${t}`);
    // Tokens por idioma: o mesmo conjunto nos 3 idiomas (tradução não perde número de emergência).
    const tok = (suf) => JSON.stringify([j['resumo' + suf], j['orientacoes' + suf]]).match(/\{\{[A-Z0-9_]+\}\}/g)?.sort().join() || '';
    if (tok('') !== tok('_en') || tok('') !== tok('_es')) e('tokens diferentes entre idiomas');
}
ok(erros.length === 0, `${JANELAS_SAZONAIS.length} janelas, ${erros.length} problema(s)`);
erros.forEach((m) => console.log('        - ' + m));
ok(TOKENS.size > 20, `resolvedor de tokens lido (${TOKENS.size} tokens)`);
for (const p of PAISES_RADAR) {
    const a = ALERTAS_OFICIAIS[p];
    ok(a && a.itens && a.itens_en && a.itens_es && a.itens.length === a.itens_en.length && a.itens.length === a.itens_es.length, `alertas oficiais de ${p} nos 3 idiomas`);
}

// ─── 2. Datas móveis ────────────────────────────────────────────────────────
console.log('2. datas móveis');
const ESPERADO = [
    [{ regra: 'pascoa' }, 2025, '2025-04-20'], [{ regra: 'pascoa' }, 2026, '2026-04-05'],
    [{ regra: 'pascoa' }, 2027, '2027-03-28'], [{ regra: 'pascoa' }, 2028, '2028-04-16'],
    [{ regra: 'carnaval' }, 2026, '2026-02-17'], [{ regra: 'carnaval' }, 2027, '2027-02-09'],
    [{ regra: 'thanksgiving' }, 2025, '2025-11-27'], [{ regra: 'thanksgiving' }, 2026, '2026-11-26'],
    [{ regra: 'dst_us_inicio' }, 2026, '2026-03-08'], [{ regra: 'dst_us_fim' }, 2026, '2026-11-01'],
    [{ regra: 'hora_eu_marco' }, 2026, '2026-03-29'], [{ regra: 'hora_eu_outubro' }, 2026, '2026-10-25'],
    [{ regra: 'hora_eu_marco' }, 2027, '2027-03-28'], [{ regra: 'hora_eu_outubro' }, 2027, '2027-10-31'],
];
for (const [ev, ano, esperado] of ESPERADO) {
    const obtido = iso(motor.dataDoEvento(ev, ano));
    ok(obtido === esperado, `${ev.regra} ${ano} = ${obtido}${obtido === esperado ? '' : ' (esperado ' + esperado + ')'}`);
}

// ─── 3. Cobertura ───────────────────────────────────────────────────────────
console.log('3. cobertura do ano por país');
for (const p of PAISES_RADAR) {
    const r = motor.calcularRadar({ hoje: new Date(2027, 0, 1), pais: p });
    const vazios = r.ano.filter((m) => m.janelas.length === 0).map((m) => m.mes);
    ok(vazios.length === 0, `${p}: todos os meses com pelo menos um risco${vazios.length ? ' — vazios: ' + vazios.join(',') : ''}`);
}

// ─── 4. Hemisfério e país ───────────────────────────────────────────────────
console.log('4. hemisfério e país');
const ativos = (pais, data, extra = {}) => motor.calcularRadar({ hoje: data, pais, ...extra }).agora.map((i) => i.janela.id);
ok(ativos('BR', new Date(2026, 6, 10), { regiao: 'sul' }).includes('br_inverno_co'), 'Brasil/Sul em julho: alerta de frio e monóxido');
ok(!ativos('BR', new Date(2026, 0, 10)).includes('br_inverno_co'), 'Brasil em janeiro: sem alerta de frio');
ok(ativos('BR', new Date(2026, 0, 10)).includes('br_afogamento_verao'), 'Brasil em janeiro: afogamento de verão');
ok(ativos('PT', new Date(2026, 0, 10)).includes('pt_inverno_co'), 'Portugal em janeiro: inverno e monóxido');
ok(!ativos('PT', new Date(2026, 0, 10)).includes('pt_afogamento'), 'Portugal em janeiro: sem afogamento de verão');
ok(ativos('PT', new Date(2026, 7, 10)).includes('pt_incendios'), 'Portugal em agosto: incêndios rurais');
ok(!ativos('PT', new Date(2026, 0, 10)).some((id) => id.startsWith('br_')), 'nada do Brasil aparece em Portugal');
ok(!ativos('BR', new Date(2026, 6, 10), { regiao: 'nordeste' }).includes('br_inverno_co'), 'Brasil/Nordeste em julho: sem alerta de frio do Sul');
ok(ativos('BR', new Date(2026, 4, 10), { regiao: 'nordeste' }).includes('br_chuvas_nordeste'), 'Brasil/Nordeste em maio: quadra chuvosa');
ok(!ativos('US', new Date(2026, 7, 20), { regiao: 'midwest' }).includes('us_hurricane'), 'EUA/Meio-Oeste: sem furacão');
ok(motor.calcularRadar({ hoje: new Date(2026, 7, 20), pais: 'US' }).agora.find((i) => i.janela.id === 'us_hurricane')?.regioesAlvo?.includes('south'), 'EUA sem região escolhida: furacão marcado "vale para" Sul/Nordeste');
ok(!motor.calcularRadar({ hoje: new Date(2026, 0, 1), pais: 'FR' }).suportado, 'país sem calendário: não inventa');
ok(!motor.calcularRadar({ hoje: new Date(2026, 0, 1), pais: null }).suportado, 'país desconhecido: não inventa');

// ─── 5. Fases e contagem regressiva ─────────────────────────────────────────
console.log('5. fases e contagem regressiva');
const item = (pais, data, id, extra) => {
    const r = motor.calcularRadar({ hoje: data, pais, ...extra });
    return [...r.agora, ...r.chegando].find((i) => i.janela.id === id);
};
const sj = item('BR', new Date(2026, 5, 15), 'br_festas_juninas');
ok(sj && sj.fase === 'evento' && sj.diasParaEvento === 9, `São João em 15/06: faltam ${sj && sj.diasParaEvento} dias`);
const j4 = item('US', new Date(2026, 6, 4), 'us_july4');
ok(j4 && j4.diasParaEvento === 0, '4 de Julho: é hoje');
const tg = item('US', new Date(2026, 10, 20), 'us_thanksgiving');
ok(tg && tg.diasParaEvento === 6, `Thanksgiving 2026 a partir de 20/11: faltam ${tg && tg.diasParaEvento} dias`);
const ch = item('PT', new Date(2026, 9, 20), 'pt_inverno_co');
ok(ch && ch.fase === 'chegando' && ch.diasParaInicio === 12, `Portugal 20/10: inverno chega em ${ch && ch.diasParaInicio} dias`);
const pico = item('BR', new Date(2026, 2, 10), 'br_dengue');
ok(pico && pico.fase === 'pico', 'dengue em março: pico');
const virada = item('BR', new Date(2026, 0, 3), 'br_fim_de_ano');
ok(virada && virada.ativa, 'janela que atravessa o ano (dez–jan) ativa em 3 de janeiro');

// ─── 6. Personalização ──────────────────────────────────────────────────────
console.log('6. personalização (regra canônica)');
const anos = (n) => { const d = new Date(); d.setFullYear(d.getFullYear() - n); return d.toISOString(); };
const casa = [
    { id: 'a', nome: 'Ana', tipo: 'humano', dataNascimento: anos(3) },
    { id: 'b', nome: 'Beto', tipo: 'humano', dataNascimento: anos(40) },
    { id: 'c', nome: 'Rex', tipo: 'pet', especie: 'cao' },
    { id: 'd', nome: 'Vó Lia', tipo: 'humano', dataNascimento: anos(78) },
];
const esc = item('BR', new Date(2026, 1, 10), 'br_escorpioes', { perfis: casa });
const nomes = (esc ? esc.quem : []).map((p) => p.nome).sort().join(',');
ok(nomes === 'Ana,Rex,Vó Lia', `escorpião: para ${nomes} (adulto de 40 fica de fora)`);
const semNinguem = item('BR', new Date(2026, 1, 10), 'br_escorpioes', { perfis: [casa[1]] });
ok(semNinguem && semNinguem.quem.length === 0, 'casa só com adulto: o alerta aparece, sem atribuição');
const piscina = item('BR', new Date(2026, 0, 10), 'br_afogamento_verao', { perfis: casa, mapping: ['piscina'] });
ok(piscina && piscina.ambientesCasa.includes('piscina'), 'afogamento: a casa tem piscina');
const r = motor.calcularRadar({ hoje: new Date(2026, 0, 10), pais: 'BR', perfis: casa, mapping: ['piscina'] });
ok(r.agora[0] && r.agora[0].janela.id === 'br_afogamento_verao', `janeiro, casa com criança e piscina: primeiro alerta é ${r.agora[0] && r.agora[0].janela.id}`);

// ─── 7. Agenda de avisos ────────────────────────────────────────────────────
console.log('7. agenda de avisos');
const av = motor.proximosAvisos({ hoje: new Date(2026, 9, 17), pais: 'PT', dias: 60 });
ok(av.some((a) => a.janela.id === 'pt_inverno_co'), 'Portugal, 17/10: aviso do inverno nos próximos 60 dias');
ok(av.some((a) => a.janela.id === 'eu_mudanca_hora'), 'Portugal, 17/10: aviso da mudança de hora');
ok(av.every((a) => a.quando > new Date(2026, 9, 17)), 'nenhum aviso no passado');
ok(motor.proximosAvisos({ hoje: new Date(2026, 9, 17), pais: 'XX' }).length === 0, 'país sem calendário: nenhum aviso');

console.log(falhas ? `\nRESULTADO: ${falhas} falha(s).` : '\nRESULTADO: aprovado');
process.exit(falhas ? 1 : 0);
