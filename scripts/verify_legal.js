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
// O representante na UE NÃO derruba a suíte: é pendência de negócio, aberta de
// propósito, e só impede publicar nas lojas europeias. Na primeira versão deste
// script ele entrava como bloqueio — e como `validate:legal` está na cadeia de
// `&&` do `npm run validate`, a suíte INTEIRA passou a nunca poder passar, e
// `validate:types` e `validate:android-export` deixaram de rodar. Virou aviso:
// aparece sempre, não trava nada.
const avisos = [];
if (!repUE || repUE === 'null') {
    avisos.push(
        'CONTROLADOR.representanteUE está vazio. Controlador fora da UE que ' +
        'oferece serviço a residentes da União precisa designar representante ' +
        'por escrito — RGPD art. 27. Impede publicar nas lojas EUROPEIAS ' +
        '(pt-PT e es); Brasil e EUA não dependem deste item.'
    );
}

// 3. As quatro jurisdições continuam presentes.
for (const chave of ["'pt-BR'", "'pt-PT'", 'es:', 'en:']) {
    if (!src.includes(chave)) problemas.push('Falta a política da jurisdição ' + chave);
}

// 4. Permissões declaradas = uso real (17/10/2026). O app declarava microfone
// ("monitoramento de áudio"), sensor de movimento ("detectar quedas
// automaticamente"), Face ID e localização "sempre" sem usar nenhum — e os
// Termos prometiam detecção de queda e monitor de áudio. Apple 5.1.1 (pedir
// só o necessário, descrever o uso real), Google Play (permissões e Segurança
// dos dados), LGPD art. 6º VI e CDC (oferta enganosa). Bibliotecas reinjetam
// permissões a cada atualização: esta checagem é o que impede a volta.
const app = JSON.parse(fs.readFileSync(path.join(RAIZ, 'app.json'), 'utf8')).expo;
const plugin = (nome) => (app.plugins || []).find((p) => (Array.isArray(p) ? p[0] : p) === nome);
const opcoes = (nome) => { const p = plugin(nome); return Array.isArray(p) ? p[1] || {} : {}; };
const ipl = app.ios?.infoPlist || {};
for (const k of ['NSMicrophoneUsageDescription', 'NSMotionUsageDescription', 'NSFaceIDUsageDescription', 'NSLocationAlwaysUsageDescription', 'NSLocationAlwaysAndWhenInUseUsageDescription']) {
    if (ipl[k]) problemas.push(`app.json declara ${k}, mas o app não usa esse recurso.`);
}
if (plugin('expo-audio') && opcoes('expo-audio').microphonePermission !== false) problemas.push('expo-audio sem { microphonePermission: false } — o plugin reinjeta o pedido de microfone no iOS.');
if (plugin('expo-audio') && opcoes('expo-audio').recordAudioAndroid !== false) problemas.push('expo-audio sem { recordAudioAndroid: false } — o plugin reinjeta RECORD_AUDIO no Android.');
if (fs.existsSync(path.join(RAIZ, 'node_modules', 'expo-sensors')) && opcoes('expo-sensors').motionPermission !== false) problemas.push('expo-sensors instalado sem { motionPermission: false } — o iOS declara o sensor de movimento.');
if (opcoes('expo-secure-store').faceIDPermission !== false) problemas.push('expo-secure-store sem { faceIDPermission: false } — o iOS declara Face ID, que o app não usa.');
const loc = opcoes('expo-location');
if (loc.locationAlwaysPermission !== false || loc.locationAlwaysAndWhenInUsePermission !== false) problemas.push('expo-location declara localização "sempre" — o app só usa em primeiro plano.');
const bloqueadas = app.android?.blockedPermissions || [];
for (const p of ['android.permission.RECORD_AUDIO', 'android.permission.ACTIVITY_RECOGNITION', 'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK']) {
    if (!bloqueadas.includes(p)) problemas.push(`Android: ${p} não está em blockedPermissions (uma biblioteca a injeta sem uso).`);
}
if ((app.android?.permissions || []).some((p) => /RECORD_AUDIO|BACKGROUND_LOCATION|ACTIVITY_RECOGNITION/.test(p))) problemas.push('Android declara permissão que o app não usa (áudio, localização em segundo plano ou atividade física).');
// Textos dos pedidos do iOS nos 4 idiomas, com as mesmas chaves do infoPlist.
const usadas = Object.keys(ipl).filter((k) => /UsageDescription$/.test(k));
for (const lang of ['pt-BR', 'pt-PT', 'en', 'es']) {
    const arq = app.locales?.[lang];
    if (!arq || !fs.existsSync(path.join(RAIZ, arq))) { problemas.push(`Pedidos de permissão do iOS sem tradução para ${lang} (app.json → locales).`); continue; }
    const ios = JSON.parse(fs.readFileSync(path.join(RAIZ, arq), 'utf8')).ios || {};
    for (const k of usadas) if (!ios[k]) problemas.push(`${arq}: falta ${k}.`);
}
// Nada de prometer recurso que não existe.
const textosLegais = [src, ...['pt-BR', 'pt-PT', 'en', 'es'].map((l) => JSON.stringify(require(path.join(RAIZ, 'locales', l, 'common.json')).terms || {}))].join('\n');
const fantasmas = textosLegais.match(/detec[çc][ãa]o de queda|dete[çc][ãa]o de queda|detecci[óo]n de ca[íi]das|fall detection|monitor de [áa]udio|audio monitor|grava[çc][ãa]o acionada|grabaci[óo]n activada|recording triggered/gi);
if (fantasmas) problemas.push(`Termos/Política prometem recurso que não existe: ${[...new Set(fantasmas)].join(', ')}.`);

// 5. Formulários das lojas (17/10/2026) — o que o app faz tem de bater com o
// que se declara: docs/lojas/FORMULARIOS_LOJAS.md.
// 5a. IA de terceiro só com permissão explícita (Apple 5.1.2(i); LGPD art. 11 e 33).
const lerSrc = (rel) => fs.readFileSync(path.join(RAIZ, rel), 'utf8');
const assinaturasIA = {
    'services/OpenAIService.js': ['sendMessage(', 'generateConsultativeReport(', 'generateTravelBriefing(', 'analyzeVaccineCard(', 'transcribeAudio('],
    'services/VisionService.js': ['analyzeImage:', 'analyzeVaccineCard:', 'analyzeMedication:', 'analyzeProductLabel:'],
};
for (const [arq, funcs] of Object.entries(assinaturasIA)) {
    const s = lerSrc(arq);
    for (const fn of funcs) {
        const i = s.indexOf(fn.endsWith(':') ? fn : 'async ' + fn);
        const trecho = i >= 0 ? s.slice(i, i + 400) : '';
        if (!/ConsentimentoIAService\.exigir\(\)/.test(trecho)) problemas.push(`${arq}: ${fn} envia dados à IA sem ConsentimentoIAService.exigir() no início.`);
    }
}
// 5b. Manifesto de privacidade da Apple: sem rastreamento e com os tipos declarados.
const pm = app.ios?.privacyManifests;
if (!pm || pm.NSPrivacyTracking !== false) problemas.push('app.json: ios.privacyManifests ausente ou com rastreamento ligado.');
const tiposDeclarados = new Set((pm?.NSPrivacyCollectedDataTypes || []).map((x) => x.NSPrivacyCollectedDataType.replace('NSPrivacyCollectedDataType', '')));
for (const t of ['Health', 'PhotosorVideos', 'CoarseLocation', 'PurchaseHistory', 'CrashData']) {
    if (!tiposDeclarados.has(t)) problemas.push(`Manifesto de privacidade sem ${t} — o app coleta esse dado (ver docs/lojas/FORMULARIOS_LOJAS.md).`);
}
// 5c. Páginas públicas iguais ao texto do app (as lojas pedem a URL pública).
try {
    const os = require('os');
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'site-legal-'));
    require('child_process').execFileSync(process.execPath, [path.join(RAIZ, 'scripts', 'gerar_paginas_legais.js'), tmp], { stdio: 'ignore' });
    for (const rel of ['index.html', 'politica-de-privacidade/index.html', 'termos-de-uso/index.html']) {
        const pub = path.join(RAIZ, 'site-legal', rel);
        if (!fs.existsSync(pub) || fs.readFileSync(pub, 'utf8') !== fs.readFileSync(path.join(tmp, rel), 'utf8')) {
            problemas.push(`site-legal/${rel} desatualizada em relação ao texto do app — rode node scripts/gerar_paginas_legais.js e republique.`);
        }
    }
    fs.rmSync(tmp, { recursive: true, force: true });
} catch (e) {
    problemas.push('Não foi possível gerar as páginas públicas para conferir: ' + e.message);
}

const mostrar = (rotulo, lista) => {
    if (!lista.length) return;
    console.log(linha(rotulo));
    console.log('');
    lista.forEach((p, i) => {
        console.log(linha('  ' + (i + 1) + '. ' + p));
        console.log('');
    });
};

mostrar('BLOQUEIOS — nenhuma loja aceita assim:', problemas);
mostrar('AVISOS — não derrubam a suíte:', avisos);

if (!problemas.length && !avisos.length) {
    console.log(linha('Nenhum campo obrigatório em falta.'));
    console.log(linha('As quatro jurisdições estão presentes.\n'));
} else {
    console.log(linha('Ver docs/CONFORMIDADE_LEGAL.md, itens L1 e L2.\n'));
}

if (problemas.length) {
    console.log('RESULTADO: reprovado — ' + problemas.length + ' bloqueio(s) antes de publicar.\n');
    process.exit(1);
}

console.log(
    avisos.length
        ? 'RESULTADO: aprovado com ' + avisos.length + ' aviso(s) — publicável no Brasil e nos EUA.\n'
        : 'RESULTADO: aprovado — política publicável.\n'
);
process.exit(0);
