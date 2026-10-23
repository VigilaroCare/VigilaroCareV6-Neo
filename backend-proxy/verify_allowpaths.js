/**
 * verify_allowpaths.js — trava a allow-list de paths do proxy.
 *
 * ELEVEN_ALLOWED e EPA_ALLOWED nao tinham ancora no fim, entao bastava o
 * prefixo: `/text-to-speech/../v1/history` passava, e o http-proxy-middleware
 * repassa o `..` literal — o edge do fornecedor normaliza e a requisicao chega
 * em /v1/history ja com a nossa chave injetada. Este teste existe para que a
 * regressao nao volte sem alguem ver.
 *
 *   node backend-proxy/verify_allowpaths.js
 */
const fs = require('fs');
const path = require('path');

const ARQ = path.join(__dirname, 'server.js');
const fonte = fs.readFileSync(ARQ, 'utf8');

// Extrai so os trechos que interessam, sem subir o servidor (que exigiria env).
function extrair(nome) {
    const m = fonte.match(new RegExp(`const ${nome} = \\[([\\s\\S]*?)\\n\\];`));
    if (!m) throw new Error(`nao achei ${nome} em server.js`);
    // eslint-disable-next-line no-new-func
    return new Function(`return [${m[1]}];`)();
}
function extrairDotSegment() {
    const m = fonte.match(/const temDotSegment = ([^;]+);/);
    if (!m) throw new Error('nao achei temDotSegment em server.js');
    // eslint-disable-next-line no-new-func
    return new Function(`return ${m[1]};`)();
}

const temDotSegment = extrairDotSegment();
const LISTAS = {
    OPENAI: extrair('OPENAI_ALLOWED'),
    ELEVEN: extrair('ELEVEN_ALLOWED'),
    EPA: extrair('EPA_ALLOWED'),
};

// Replica a decisao do middleware allowPaths.
const permite = (lista, p) => !temDotSegment(p) && LISTAS[lista].some((re) => re.test(p));

// [lista, path, deveriaPassar, descricao]
const CASOS = [
    // --- Uso legitimo: nao pode quebrar
    ['OPENAI', '/chat/completions', true, 'OpenAI chat (VisionService)'],
    ['OPENAI', '/audio/transcriptions', true, 'OpenAI voz -> texto'],
    ['OPENAI', '/audio/speech', true, 'OpenAI TTS'],
    ['EPA', '/chemical/search/equal/sodium hypochlorite', true, 'EPA busca com espaco'],
    ['EPA', '/chemical/search/equal/2,4-D', true, 'EPA busca com virgula e hifen'],
    ['EPA', '/chemical/detail/search/by-dtxsid/DTXSID7020182', true, 'EPA detalhe por DTXSID'],
    ['ELEVEN', '/text-to-speech/21m00Tcm4TlvDq8ikWAM', true, 'ElevenLabs TTS por voice_id'],
    ['ELEVEN', '/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream', true, 'ElevenLabs TTS stream'],

    // --- O ataque que motivou o fix
    ['ELEVEN', '/text-to-speech/../v1/history', false, 'ElevenLabs traversal p/ historico'],
    ['ELEVEN', '/text-to-speech/x/../../v1/user', false, 'ElevenLabs traversal p/ conta'],
    ['EPA', '/chemical/../other', false, 'EPA traversal'],
    ['ELEVEN', '/text-to-speech/%2e%2e/v1/history', false, 'traversal percent-encoded'],
    ['ELEVEN', '/text-to-speech/%2E%2E/v1/history', false, 'traversal percent-encoded maiusculo'],

    // --- Endpoints caros/sensiveis do fornecedor seguem fora
    ['OPENAI', '/files', false, 'OpenAI /files fora'],
    ['OPENAI', '/fine_tuning/jobs', false, 'OpenAI fine_tuning fora'],
    ['OPENAI', '/images/generations', false, 'OpenAI images fora'],
    ['OPENAI', '/realtime', false, 'OpenAI realtime fora (feature desativada)'],
    ['OPENAI', '/chat/completions/extra', false, 'OpenAI nao aceita sufixo'],
    ['ELEVEN', '/history', false, 'ElevenLabs historico fora'],
    ['ELEVEN', '/user/subscription', false, 'ElevenLabs assinatura fora'],
    ['EPA', '/chemical/search/equal/x/y', false, 'EPA nao aceita segmento extra'],
];

let falhas = 0;
console.log('\nALLOW-LIST DE PATHS DO PROXY\n');
for (const [lista, p, esperado, desc] of CASOS) {
    const obtido = permite(lista, p);
    if (obtido === esperado) {
        console.log(`   OK    ${esperado ? 'passa ' : 'bloqueia'}  ${desc}`);
    } else {
        falhas++;
        console.log(`   FALHA ${desc}`);
        console.log(`         ${lista} ${JSON.stringify(p)} — esperado ${esperado ? 'passar' : 'bloquear'}, ${obtido ? 'passou' : 'bloqueou'}`);
    }
}

// Os casos acima replicam a decisao do middleware; por isso precisam de uma
// checagem de FIACAO: a guarda tem de estar chamada DENTRO de allowPaths, e
// antes do teste dos padroes. Sem isto, apagar a chamada e deixar a funcao
// definida passaria batido por este arquivo.
console.log('');
const corpo = fonte.match(/const allowPaths = [\s\S]*?\n\};/);
if (!corpo) {
    falhas++;
    console.log('   FALHA nao achei o middleware allowPaths em server.js');
} else {
    const iGuarda = corpo[0].indexOf('temDotSegment(req.path)');
    const iPadroes = corpo[0].indexOf('patterns.some');
    if (iGuarda === -1) {
        falhas++;
        console.log('   FALHA allowPaths nao chama temDotSegment — guarda desligada');
    } else if (iPadroes !== -1 && iGuarda > iPadroes) {
        falhas++;
        console.log('   FALHA allowPaths testa os padroes ANTES da guarda de dot-segment');
    } else {
        console.log('   OK    allowPaths chama a guarda antes de testar os padroes');
    }
}

// Toda regex de allow-list tem de ser fechada: sem `$`, basta o prefixo.
console.log('');
for (const [nome, lista] of Object.entries(LISTAS)) {
    const abertas = lista.filter((re) => !re.source.endsWith('$'));
    if (abertas.length) {
        falhas++;
        console.log(`   FALHA ${nome}_ALLOWED tem padrao sem ancora final:`);
        abertas.forEach((re) => console.log(`         ${re}`));
    } else {
        console.log(`   OK    ${nome}_ALLOWED: todos os padroes fechados com $`);
    }
}

console.log('');
if (falhas) {
    console.log(`RESULTADO: reprovado — ${falhas} problema(s).\n`);
    process.exit(1);
}
console.log('RESULTADO: aprovado — traversal bloqueado, uso legitimo intacto.\n');
