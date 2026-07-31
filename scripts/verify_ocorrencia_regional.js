/**
 * verify_ocorrencia_regional.js
 *
 * Verifica a camada de ocorrencia regional (data/ocorrencia_regional.js +
 * utils/relevanciaRegional.js) contra as bases reais de fichas.
 *
 * Rodar: node scripts/verify_ocorrencia_regional.js
 *
 * O que este teste protege:
 *  1. Cobertura — toda ficha do catalogo tem classificacao. Ficha nova sem
 *     entrada aqui e o modo de falha mais provavel desta camada.
 *  2. Ausencia de orfao — nenhuma entrada aponta para ficha que nao existe.
 *  3. Nenhuma remocao — a ordenacao regional nunca pode perder uma ficha, em
 *     nenhum mercado. E a garantia de que regionalizar nao virou omitir.
 *  4. Integridade de forma — todos os mercados presentes, status e criterio
 *     dentro do vocabulario, criterio ausente quando status e 'ausente'.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

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

const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(
    toEvaluable(fs.readFileSync(path.join(ROOT, 'data/ocorrencia_regional.js'), 'utf8')),
    sandbox
);
vm.runInContext(
    toEvaluable(fs.readFileSync(path.join(ROOT, 'utils/relevanciaRegional.js'), 'utf8')),
    sandbox
);

const { MERCADOS, OCORRENCIA_ANIMAIS, OCORRENCIA_PLANTAS, STATUS_VALIDACAO } = sandbox;

/** Ids reais das bases, lidos do fonte (evita depender de bundler/require de imagem). */
function idsDe(rel) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    return [...src.matchAll(/^\s*id: "([^"]+)"/gm)].map((m) => m[1]);
}

const BASES = [
    { tipo: 'animais', rel: 'data/animais_ciatox.js', mapa: OCORRENCIA_ANIMAIS },
    { tipo: 'plantas', rel: 'data/plantas_ciatox.js', mapa: OCORRENCIA_PLANTAS },
];

const STATUS_VALIDOS = ['ocorre', 'parcial', 'ausente'];
const CRITERIOS_VALIDOS = ['A', 'B', 'AB'];

let failures = 0;
const fail = (msg) => { failures++; console.log(`   FALHA ${msg}`); };

console.log(`\nSTATUS DE VALIDACAO DOS DADOS: ${STATUS_VALIDACAO.toUpperCase()}`);
if (STATUS_VALIDACAO === 'preliminar') {
    console.log('   (classificacao por distribuicao biogeografica; criterios A/B ainda');
    console.log('    nao extraidos de SINAN / CIAV / INTCF / NPDS — ver cabecalho do');
    console.log('    ficheiro de dados antes de usar em producao)');
}

// ---------------------------------------------------------------------------
console.log('\n1. COBERTURA E ORFAOS\n');
for (const { tipo, rel, mapa } of BASES) {
    const ids = idsDe(rel);
    const classificados = Object.keys(mapa);

    const semClassificacao = ids.filter((id) => !mapa[id]);
    const orfaos = classificados.filter((id) => !ids.includes(id));

    if (semClassificacao.length) fail(`${tipo}: sem classificacao -> ${semClassificacao.join(', ')}`);
    if (orfaos.length) fail(`${tipo}: entrada orfa (ficha nao existe) -> ${orfaos.join(', ')}`);
    if (!semClassificacao.length && !orfaos.length) {
        console.log(`   OK    ${tipo}: ${ids.length} fichas, ${classificados.length} classificadas, 0 orfas`);
    }
}

// ---------------------------------------------------------------------------
console.log('\n2. FORMA DAS ENTRADAS\n');
for (const { tipo, mapa } of BASES) {
    let erros = 0;
    for (const [id, porMercado] of Object.entries(mapa)) {
        for (const mercado of MERCADOS) {
            const e = porMercado[mercado];
            if (!e) { fail(`${tipo}/${id}: mercado ${mercado} em falta`); erros++; continue; }
            if (!STATUS_VALIDOS.includes(e.status)) { fail(`${tipo}/${id}/${mercado}: status invalido "${e.status}"`); erros++; }
            if (e.criterio !== null && !CRITERIOS_VALIDOS.includes(e.criterio)) { fail(`${tipo}/${id}/${mercado}: criterio invalido "${e.criterio}"`); erros++; }
            if (e.status === 'ausente' && e.criterio !== null) { fail(`${tipo}/${id}/${mercado}: 'ausente' nao pode ter criterio`); erros++; }
            if (e.status !== 'ausente' && e.criterio === null) { fail(`${tipo}/${id}/${mercado}: '${e.status}' exige criterio A, B ou AB`); erros++; }
        }
    }
    if (!erros) console.log(`   OK    ${tipo}: todas as entradas bem formadas em ${MERCADOS.length} mercados`);
}

// ---------------------------------------------------------------------------
console.log('\n3. A ORDENACAO NUNCA REMOVE UMA FICHA\n');
for (const { tipo, rel } of BASES) {
    const fichas = idsDe(rel).map((id) => ({ id }));
    let erros = 0;
    for (const mercado of [...MERCADOS, null, 'XX']) {
        const ordenadas = sandbox.ordenarPorRelevancia(fichas, tipo, mercado);
        if (ordenadas.length !== fichas.length) {
            fail(`${tipo}/${mercado}: ordenacao mudou o total (${fichas.length} -> ${ordenadas.length})`);
            erros++;
            continue;
        }
        const perdidas = fichas.filter((f) => !ordenadas.some((o) => o.id === f.id));
        if (perdidas.length) { fail(`${tipo}/${mercado}: fichas perdidas -> ${perdidas.map((f) => f.id).join(', ')}`); erros++; }

        const { locais, outrasRegioes } = sandbox.separarPorRelevancia(fichas, tipo, mercado);
        if (locais.length + outrasRegioes.length !== fichas.length) {
            fail(`${tipo}/${mercado}: separacao perdeu fichas (${locais.length}+${outrasRegioes.length} != ${fichas.length})`);
            erros++;
        }
    }
    if (!erros) console.log(`   OK    ${tipo}: catalogo integro em ${MERCADOS.length + 2} cenarios de mercado`);
}

// ---------------------------------------------------------------------------
console.log('\n4. COBERTURA POR MERCADO (informativo)\n');
console.log('   mercado   animais local/total   plantas local/total   lacunas');
for (const mercado of MERCADOS) {
    const linha = BASES.map(({ tipo, rel }) => {
        const fichas = idsDe(rel).map((id) => ({ id }));
        const { locais } = sandbox.separarPorRelevancia(fichas, tipo, mercado);
        return `${String(locais.length).padStart(2)}/${fichas.length}`;
    });
    const lacunas = sandbox.getLacunas(mercado).length;
    console.log(`   ${mercado.padEnd(9)} ${linha[0].padEnd(21)} ${linha[1].padEnd(21)} ${lacunas}`);
}

console.log(
    failures === 0
        ? '\nRESULTADO: aprovado — cobertura completa, nenhuma ficha removida em nenhum mercado.\n'
        : `\nRESULTADO: ${failures} falha(s).\n`
);
process.exit(failures === 0 ? 0 : 1);
