/**
 * verify_emergency_tokens.js
 *
 * Prova que a tokenizacao dos numeros de emergencia NAO alterou a ficha
 * como ela e vista no Brasil, e que ela passou a variar corretamente fora.
 *
 * Rodar: node scripts/verify_emergency_tokens.js
 *
 * Por que este script existe: os textos de primeiros socorros traziam
 * "SAMU (192)" escrito dentro da frase e traduzido junto com ela, o que
 * mostrava o numero brasileiro pra usuario em qualquer pais. A correcao
 * trocou o numero por token. O risco da correcao e regressao silenciosa no
 * conteudo brasileiro — que e o conteudo em producao hoje. Este teste fecha
 * esse risco comparando string por string.
 *
 * Ele carrega a logica REAL de utils/emergencyTokens.js (nao uma copia),
 * transformando os modulos ESM em codigo avaliavel no Node e injetando
 * stubs de i18n e expo-localization. Se alguem mudar as tabelas de rotulo
 * la, este teste quebra aqui.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Carga dos modulos ESM reais
// ---------------------------------------------------------------------------

/**
 * Converte um modulo ESM em codigo avaliavel no Node.
 * `export const` vira `var` de proposito: declaracoes lexicais (const/let) no
 * topo de um vm.Script ficam no escopo lexical do contexto e NAO aparecem no
 * objeto sandbox, entao o teste nao conseguiria le-las.
 */
function toEvaluable(src) {
    return src
        .replace(/^\s*import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
        .replace(/^export\s+default\s+[^;]*;/gm, '')
        .replace(/^export\s+(const|let)\s+/gm, 'var ')
        .replace(/^export\s+/gm, '');
}

const sandbox = {
    console,
    // Stub de i18n: o idioma e trocado pelo teste a cada assercao.
    i18n: { language: 'pt-BR' },
};
vm.createContext(sandbox);

// data/emergencyNumbersByCountry.js — tabela real de numeros por pais.
vm.runInContext(
    toEvaluable(fs.readFileSync(path.join(ROOT, 'data/emergencyNumbersByCountry.js'), 'utf8')),
    sandbox
);

// utils/emergencyTokens.js — logica real de resolucao.
// detectEmergencyCountry e stubado porque depende de GPS/expo-localization;
// o pais e injetado diretamente pelo teste.
sandbox.__country = 'BR';
sandbox.detectEmergencyCountry = () => sandbox.__country;
vm.runInContext(
    toEvaluable(fs.readFileSync(path.join(ROOT, 'utils/emergencyTokens.js'), 'utf8')),
    sandbox
);

function resolve(text, country, lang) {
    sandbox.__country = country;
    sandbox.i18n.language = lang;
    sandbox.resetEmergencyCountryCache();
    return sandbox.resolveEmergencyTokens(text);
}

// ---------------------------------------------------------------------------
// Pares originais: [texto ANTES da mudanca, texto tokenizado, idioma]
// Extraidos das 20 ocorrencias encontradas em animais_ciatox.js e
// plantas_ciatox.js antes da correcao.
// ---------------------------------------------------------------------------
const PAIRS = [
    ['Chame SAMU (192) imediatamente', 'Chame {{EMERGENCY_MEDICAL}} imediatamente', 'pt-BR'],
    ['Chamar SAMU (192) IMEDIATAMENTE', 'Chamar {{EMERGENCY_MEDICAL}} IMEDIATAMENTE', 'pt-BR'],
    ['Chamar SAMU (192) URGENTEMENTE', 'Chamar {{EMERGENCY_MEDICAL}} URGENTEMENTE', 'pt-BR'],
    ['Chamar SAMU (192) imediatamente', 'Chamar {{EMERGENCY_MEDICAL}} imediatamente', 'pt-BR'],
    ['Call emergency services (192) immediately', 'Call {{EMERGENCY_MEDICAL}} immediately', 'en'],
    ['Call emergency services (192) IMMEDIATELY', 'Call {{EMERGENCY_MEDICAL}} IMMEDIATELY', 'en'],
    ['Call emergency services (192) URGENTLY', 'Call {{EMERGENCY_MEDICAL}} URGENTLY', 'en'],
    ['Llame a emergencias (192) inmediatamente', 'Llame a {{EMERGENCY_MEDICAL}} inmediatamente', 'es'],
    ['Llamar a emergencias (192) INMEDIATAMENTE', 'Llamar a {{EMERGENCY_MEDICAL}} INMEDIATAMENTE', 'es'],
    ['Llamar a emergencias (192) URGENTEMENTE', 'Llamar a {{EMERGENCY_MEDICAL}} URGENTEMENTE', 'es'],
    ['Llamar a emergencias (192) inmediatamente', 'Llamar a {{EMERGENCY_MEDICAL}} inmediatamente', 'es'],
    ['Ligue 192 IMEDIATAMENTE', 'Ligue {{EMERGENCY_NUMBER}} IMEDIATAMENTE', 'pt-BR'],
];

/**
 * Mudancas DELIBERADAS no conteudo brasileiro, autorizadas em 2026-07-31.
 * Ficam aqui, e nao na lista acima, pra que a diferenca seja explicita e
 * revisavel — mudanca de conteudo de saude nunca deve passar despercebida.
 * [antes, tokenizado, idioma, depois esperado, motivo]
 */
const INTENTIONAL = [
    [
        'Variável - Consulte CIATOX (0800 014 8110)',
        'Variável - Consulte {{POISON_CONTROL}}',
        'pt-BR',
        'Variável - Consulte CIATOX (0800 722 6001)',
        '0800 014 8110 era o CEATOX do Instituto da Crianca (HC/USP), centro local de SP. Trocado pela linha nacional Disque-Intoxicacao da Anvisa, que roteia pro CIATox mais proximo.',
    ],
    [
        'Call emergency IMMEDIATELY',
        'Call {{EMERGENCY_MEDICAL}} IMMEDIATELY',
        'en',
        'Call emergency services (192) IMMEDIATELY',
        'A versao EN desta ficha nao trazia numero nenhum, so a versao PT trazia. Passa a trazer o numero do pais do usuario.',
    ],
    [
        'Llame a emergencias INMEDIATAMENTE',
        'Llame a {{EMERGENCY_MEDICAL}} INMEDIATAMENTE',
        'es',
        'Llame a emergencias (192) INMEDIATAMENTE',
        'Idem, versao ES.',
    ],
];

let failures = 0;

console.log('\n1. EQUIVALENCIA NO BRASIL (a ficha atual nao pode mudar)\n');
for (const [original, tokenized, lang] of PAIRS) {
    const got = resolve(tokenized, 'BR', lang);
    const ok = got === original;
    if (!ok) failures++;
    console.log(`   ${ok ? 'OK  ' : 'FALHA'} [${lang}] ${got}`);
    if (!ok) console.log(`         esperado: ${original}`);
}

console.log('\n1b. CORRECOES INTENCIONAIS NO BRASIL (mudam de proposito)\n');
for (const [before, tokenized, lang, expected, reason] of INTENTIONAL) {
    const got = resolve(tokenized, 'BR', lang);
    const ok = got === expected;
    if (!ok) failures++;
    console.log(`   ${ok ? 'OK  ' : 'FALHA'} [${lang}] "${before}"`);
    console.log(`          -> "${got}"`);
    console.log(`          motivo: ${reason}`);
    if (!ok) console.log(`          esperado: "${expected}"`);
}

// ---------------------------------------------------------------------------
// 2. Comportamento fora do Brasil — o objetivo da mudanca.
// ---------------------------------------------------------------------------
console.log('\n2. MESMA FICHA EM OUTROS PAISES\n');
const SAMPLES = [
    ['PT', 'pt-PT', 'Chame {{EMERGENCY_MEDICAL}} imediatamente'],
    ['ES', 'es', 'Llame a {{EMERGENCY_MEDICAL}} inmediatamente'],
    ['US', 'en', 'Call {{EMERGENCY_MEDICAL}} immediately'],
    ['GB', 'en', 'Call {{EMERGENCY_MEDICAL}} immediately'],
    ['MX', 'es', 'Llamar a {{EMERGENCY_MEDICAL}} INMEDIATAMENTE'],
    [null, 'en', 'Call {{EMERGENCY_MEDICAL}} immediately'],
    ['PT', 'pt-PT', 'Variável - Consulte {{POISON_CONTROL}}'],
    [null, 'pt-BR', 'Ligue {{EMERGENCY_NUMBER}} IMEDIATAMENTE'],
];
for (const [country, lang, tokenized] of SAMPLES) {
    console.log(`   ${String(country || 'desconhecido').padEnd(12)} [${lang}] ${resolve(tokenized, country, lang)}`);
}

// ---------------------------------------------------------------------------
// 3. Nenhum token pode sobrar sem resolver, e nenhum numero fixo pode voltar.
// ---------------------------------------------------------------------------
console.log('\n3. INTEGRIDADE DAS BASES\n');
const KNOWN = ['EMERGENCY_MEDICAL', 'EMERGENCY_NUMBER', 'POISON_CONTROL'];
const DATA_FILES = ['data/animais_ciatox.js', 'data/plantas_ciatox.js'];

for (const rel of DATA_FILES) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');

    const tokens = [...src.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]);
    const unknown = [...new Set(tokens)].filter((t) => !KNOWN.includes(t));
    if (unknown.length) {
        failures++;
        console.log(`   FALHA ${rel}: token desconhecido -> ${unknown.join(', ')}`);
    }

    // Numero fixo de volta no conteudo = regressao do bug original.
    const hardcoded = [
        ...src.matchAll(/\(192\)|Ligue 192|SAMU \(|0800[\s-]?\d{3}[\s-]?\d{4}/g),
    ].map((m) => m[0]);
    if (hardcoded.length) {
        failures++;
        console.log(`   FALHA ${rel}: numero fixo no conteudo -> ${[...new Set(hardcoded)].join(', ')}`);
    }

    if (!unknown.length && !hardcoded.length) {
        console.log(`   OK    ${rel}: ${tokens.length} tokens, todos conhecidos, nenhum numero fixo`);
    }
}

// ---------------------------------------------------------------------------
// 4. Nenhum token pode resolver pra vazio, em nenhuma combinacao.
// ---------------------------------------------------------------------------
console.log('\n4. NENHUM TOKEN RESOLVE PRA VAZIO\n');
const COUNTRIES = ['BR', 'PT', 'ES', 'US', 'GB', 'MX', 'XX', null];
const LANGS = ['pt-BR', 'pt-PT', 'en', 'es'];
let empties = 0;
for (const token of KNOWN) {
    for (const country of COUNTRIES) {
        for (const lang of LANGS) {
            const out = resolve(`{{${token}}}`, country, lang);
            if (!out || out.includes('{{') || out.includes('undefined')) {
                empties++;
                failures++;
                console.log(`   FALHA ${token} / ${country} / ${lang} -> "${out}"`);
            }
        }
    }
}
if (!empties) {
    console.log(`   OK    ${KNOWN.length * COUNTRIES.length * LANGS.length} combinacoes, nenhuma vazia ou nao resolvida`);
}

// ---------------------------------------------------------------------------
// 5. Centro de intoxicacao: rotulo e numero discavel por pais.
//    O numero discado e o item de maior risco do produto — um digito errado
//    numa emergencia real e pior do que nao ter botao nenhum.
// ---------------------------------------------------------------------------
console.log('\n5. CENTRO DE INTOXICACAO (rotulo e numero discavel)\n');
const DIAL_ESPERADO = {
    BR: '08007226001', // Disque-Intoxicacao / Anvisa
    PT: '800250250',   // CIAV / INEM
    ES: '112',         // sem centro mapeado: cai no geral
    US: '911',
    XX: '112',
};
for (const [country, esperado] of Object.entries(DIAL_ESPERADO)) {
    sandbox.__country = country;
    sandbox.i18n.language = 'pt-BR';
    sandbox.resetEmergencyCountryCache();
    const dial = sandbox.getPoisonControlDial(country);
    const label = sandbox.getPoisonControlLabel(country);
    const ok = dial === esperado && /\d/.test(label) && !/\{\{/.test(label);
    if (!ok) failures++;
    console.log(`   ${ok ? 'OK  ' : 'FALHA'} ${country.padEnd(3)} tel:${dial.padEnd(12)} "${label}"`);
    if (!ok) console.log(`         esperado tel:${esperado}`);
}

// ---------------------------------------------------------------------------
// 6. Nenhum numero brasileiro fixo pode sobrar nas telas ou nos locales.
//    Era exatamente esse o bug: 0800 722 6001 discado a partir de qualquer
//    pais, em qualquer idioma.
// ---------------------------------------------------------------------------
console.log('\n6. SEM NUMERO BR FIXO NO ESCOPO CORRIGIDO\n');
const NUM_BR = /0800[\s-]?722[\s-]?6001|08007226001/g;

// Nas telas o que importa e o numero DISCADO. Comentario citando o numero
// (para explicar o bug corrigido) nao e problema.
for (const rel of [
    'screens/Education/AnimaisPeconhentosScreen.js',
    'screens/Education/PlantasToxicasScreen.js',
]) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const discados = [...src.matchAll(/tel:\s*['"`]?0?800/g)].map((m) => m[0]);
    if (discados.length) {
        failures++;
        console.log(`   FALHA ${rel}: numero BR discado fixo -> ${[...new Set(discados)].join(', ')}`);
    } else {
        console.log(`   OK    ${rel}: numero discado vem do resolvedor de pais`);
    }
}

// Nos locales, so os namespaces que este trabalho cobriu.
const NS_NO_ESCOPO = ['animals', 'plants'];
for (const loc of ['pt-BR', 'pt-PT', 'en', 'es']) {
    const json = JSON.parse(fs.readFileSync(path.join(ROOT, `locales/${loc}/common.json`), 'utf8'));
    const sujos = NS_NO_ESCOPO.filter((ns) => NUM_BR.test(JSON.stringify(json[ns] || {})));
    NUM_BR.lastIndex = 0;
    if (sujos.length) {
        failures++;
        console.log(`   FALHA locales/${loc}: numero BR fixo em ${sujos.join(', ')}`);
    } else {
        console.log(`   OK    locales/${loc}: namespaces animals e plants limpos`);
    }
}

// ---------------------------------------------------------------------------
// 6b. VARREDURA DO REPOSITORIO INTEIRO.
//     Nenhum numero de emergencia brasileiro pode estar escrito em conteudo
//     ou discado diretamente. As unicas excecoes sao os ficheiros que SAO a
//     fonte de verdade dos numeros.
// ---------------------------------------------------------------------------
console.log('\n6b. VARREDURA DO REPOSITORIO\n');
const FONTES_DE_VERDADE = [
    'data/telefones_ciatox.js',        // diretorio oficial dos CIATox por estado
    'data/emergencyNumbersByCountry.js',
    'utils/emergencyTokens.js',
    'scripts/verify_emergency_tokens.js',
];
const RX_CONTEUDO = /0800[\s-]?722[\s-]?6001|08007226001|SAMU\s*\(?192\)?|tel:\s*['"`]?(192|193|0800)/g;

function varrer(dir, achados) {
    for (const entrada of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = `${dir}/${entrada.name}`;
        if (entrada.isDirectory()) { varrer(rel, achados); continue; }
        if (!entrada.name.endsWith('.js')) continue;
        if (FONTES_DE_VERDADE.includes(rel)) continue;
        const linhas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
        linhas.forEach((linha, i) => {
            const semComentario = linha.replace(/\/\/.*$/, '').replace(/^\s*\*.*$/, '');
            RX_CONTEUDO.lastIndex = 0;
            if (RX_CONTEUDO.test(semComentario)) achados.push(`${rel}:${i + 1}`);
        });
    }
    return achados;
}

const achados = [];
for (const dir of ['data', 'screens', 'components', 'utils']) varrer(dir, achados);
if (achados.length) {
    failures++;
    console.log(`   FALHA ${achados.length} ocorrencia(s) de numero BR fixo:`);
    achados.slice(0, 25).forEach((a) => console.log(`         ${a}`));
    if (achados.length > 25) console.log(`         ... e mais ${achados.length - 25}`);
} else {
    console.log('   OK    data/, screens/, components/ e utils/ sem numero de emergencia fixo');
    console.log('         (fontes de verdade excluidas: ' + FONTES_DE_VERDADE.length + ' ficheiros)');
}

// ---------------------------------------------------------------------------
// 7. As chaves novas existem nos 4 locales (senao a UI mostra a chave crua).
// ---------------------------------------------------------------------------
console.log('\n7. CHAVES DE INTERFACE NOS 4 LOCALES\n');
const LOCALES = ['pt-BR', 'pt-PT', 'en', 'es'];
const CHAVES = ['emergencyDesc', 'localSection', 'otherRegionsSection', 'otherRegionsHint'];
for (const loc of LOCALES) {
    const json = JSON.parse(fs.readFileSync(path.join(ROOT, `locales/${loc}/common.json`), 'utf8'));
    const faltando = [];
    for (const ns of ['animals', 'plants']) {
        for (const chave of CHAVES) {
            if (!json[ns] || !json[ns][chave]) faltando.push(`${ns}.${chave}`);
        }
    }
    // emergencyDesc precisa da interpolacao, senao o numero volta a ser fixo.
    for (const ns of ['animals', 'plants']) {
        const v = json[ns]?.emergencyDesc || '';
        if (!v.includes('{{poisonControl}}')) faltando.push(`${ns}.emergencyDesc sem {{poisonControl}}`);
    }
    if (faltando.length) {
        failures++;
        console.log(`   FALHA ${loc}: ${faltando.join(', ')}`);
    } else {
        console.log(`   OK    ${loc}: ${CHAVES.length * 2} chaves presentes, interpolacao ok`);
    }
}

console.log(
    failures === 0
        ? '\nRESULTADO: aprovado — ficha brasileira intacta, variacao correta fora.\n'
        : `\nRESULTADO: ${failures} falha(s).\n`
);
process.exit(failures === 0 ? 0 : 1);
