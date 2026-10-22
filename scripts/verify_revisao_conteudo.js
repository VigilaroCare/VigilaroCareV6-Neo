/**
 * verify_revisao_conteudo.js — trava de revisao de conteudo.
 *
 * Garante que nenhum texto que o usuario le chegue a um build sem que se saiba
 * se o Agnaldo o revisou.
 *
 * MOTIVO (21/10/2026): o gerador de documentos de revisao le uma lista de
 * arquivos escrita a mao (TEMAS em `gerar_revisao_conteudo.js`). Foi assim que
 * 986 textos ficaram fora de todas as revisoes ate a Revisao Complementar (RC),
 * e que `PrimeirosSocorrosEmergenciaScreen` — orientacao de socorro, numa tela
 * de emergencia — nunca passou por revisao humana. A lista nao avisa quando
 * alguem cria um arquivo novo, escreve prosa numa tela ou reescreve um texto ja
 * revisado. Esta trava nao depende da lista: varre o app inteiro.
 *
 * Cada texto de usuario em pt-BR cai numa de quatro situacoes:
 *
 *   revisado    — esta num documento devolvido pelo Agnaldo, como ele o leu
 *                 (texto original do manifesto) ou como ele o escreveu (texto
 *                 novo do `_plano-*`). Calculado, nao registrado.
 *   em revisao  — esta num documento enviado e ainda nao devolvido (manifesto
 *                 sem `_plano-` da mesma sigla, ex.: RS).
 *   aprovado    — mudou fora de documento, com decisao registrada (ex.: o
 *                 Agnaldo confirmou por chat; marca "REMOVER" aplicada).
 *   pendente    — sabidamente nao revisado. Backlog consciente, nao bloqueia.
 *
 * Os dois ultimos vivem em `docs/revisao-conteudo/_registro-revisao.json`, cada
 * texto com o motivo. Texto que nao cai em nenhuma das quatro FAZ O VALIDATE
 * FALHAR, com arquivo, linha e o proprio texto.
 *
 * Uso:
 *   node scripts/verify_revisao_conteudo.js            verifica (npm run validate:revisao)
 *   node scripts/verify_revisao_conteudo.js --listar   lista os pendentes por motivo e arquivo
 *   node scripts/verify_revisao_conteudo.js --limpar   tira do registro texto que saiu do app
 *   node scripts/verify_revisao_conteudo.js --aprovar "motivo" [arquivo...]
 *   node scripts/verify_revisao_conteudo.js --pendente "motivo" [arquivo...]
 *
 * `--aprovar` e `--pendente` registram os textos que a verificacao reprovou
 * (opcionalmente so dos arquivos citados) e imprimem cada um. Aprovar exige
 * decisao do Agnaldo sobre AQUELE texto — nao use para destravar build. Para
 * destravar sem revisao, `--pendente` deixa o texto visivel no backlog.
 *
 * Fica de fora: traducoes (en, es, pt-PT saem do pt-BR aprovado) e rotulos
 * curtos de interface (menos de 70 caracteres em `common.json`).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { TEMAS, extrair } = require('./gerar_revisao_conteudo');

const RAIZ = path.resolve(__dirname, '..');
const DOCS = path.join(RAIZ, 'docs', 'revisao-conteudo');
const CAMINHO_REGISTRO = path.join(DOCS, '_registro-revisao.json');

/** Onde o app guarda texto de usuario. */
const PASTAS = ['data', 'screens', 'components'];
const COMMON_PT_BR = 'locales/pt-BR/common.json';

/** Traducoes: derivam do pt-BR revisado, nao sao revisadas a parte. */
const PASTAS_DE_TRADUCAO = /^data\/locales\/(en|es|pt-PT)\//;

/**
 * Fora do escopo: texto que NAO chega ao usuario. Arquivo novo nao entra aqui
 * por padrao — a ausencia de lista de inclusao e o que esta trava corrige.
 *
 * Cada entrada diz o que provaria que o texto voltou a chegar ao usuario
 * (`uso`); se isso aparecer em qualquer arquivo de codigo, a trava FALHA. Sem
 * isso, religar uma tela orfa poria no ar texto nunca revisado sem aviso.
 */
const FORA_DO_ESCOPO = {
    // Conduta clinica sobre atraso de dose, que o app nao faz. Ver TEMAS (EX).
    'data/delay_guidance.js': {
        motivo: 'codigo morto — deve ser removido, nao revisado',
        uso: /delay_guidance/,
    },
    // MOTIVO (22/10/2026): ia para o documento de Intoxicacao e Incendio, mas
    // ninguem importa o arquivo (o nome so aparece como categoryId de artigo).
    'data/produtos_perigosos.js': {
        motivo: 'codigo morto — nenhum import; remover ou ligar a uma tela antes de revisar',
        uso: /\/produtos_perigosos(\.js)?['"]|\bprodutosPerigosos\b/,
    },
    // Tela orfa: escreva aqui `uso` com o nome da rota e `ignorarLinha:
    // /<Stack\.Screen/`. Foi o caso de PrimeirosSocorrosEmergenciaScreen (112
    // orientacoes de socorro nunca revisadas, so pt-BR, "(SAMU)" fixo), apagada
    // em 21/10/2026 — os 3 temas que so ela tinha foram para primeiros_socorros.
};
const PASTAS_DE_CODIGO = ['data', 'screens', 'components', 'services', 'utils', 'hooks', 'context', 'contexts', 'navigation'];

/** Mesmo limiar que o gerador usa para prosa em campo desconhecido. */
const MIN_PROSA_INTERFACE = 70;

/** As chaves extras do RC valem aqui para TODOS: a trava ve mais, nunca menos. */
const RC = TEMAS.find((t) => t.sigla === 'RC') || {};
/**
 * Limiar de texto curto em campo de conteudo: 10, nao os 25 do gerador.
 *
 * MOTIVO (21/10/2026): com 25, "NUNCA sacuda o bebe." (20) e "NAO use o
 * elevador." (19) nunca entraram em documento nem na trava — ~500 frases e
 * ~700 titulos. O Agnaldo pediu tudo num documento, "mesmo que eu so precise
 * passar o olho". Abaixo de 10 sobram rotulos de uma palavra (estados,
 * comodos, "OK", nome de rota), que nao sao orientacao.
 */
const MIN_TEXTO_CURTO = 10;
/**
 * Campos de texto que o gerador nao conhecia.
 *
 * MOTIVO (22/10/2026): ao montar o documento de Intoxicacao e Incendio, o
 * "fazer" e o "nao fazer" dos animais peconhentos e das plantas toxicas — 235 e
 * 161 orientacoes de socorro — nunca tinham entrado em documento nem na trava:
 * campo desconhecido so contava com 70+ caracteres. Idem sintomas, efeito do
 * veneno, tratamento, partes toxicas.
 */
const CHAVES_EXTRAS_TRAVA = [
    'fazer', 'naoFazer', 'imediatos', 'tardios', 'graves', 'efeito', 'tipoVeneno', 'periodoAtivo',
    'tratamento', 'gravidade', 'nivelPerigo', 'sintomasHumanos', 'sintomasPets', 'partesToxicas',
    'ondeEncontrada', 'toxina', 'sintomas', 'detalhe', 'risco', 'peconhentos', 'naoPeconhentos',
];
const OPCOES = {
    chavesExtras: [...(RC.chavesExtras || []), ...CHAVES_EXTRAS_TRAVA],
    titulosExtras: [...(RC.titulosExtras || []), 'nomePopular'],
    minimoConhecida: MIN_TEXTO_CURTO,
};

const normalizar = (s) => String(s).replace(/\s+/g, ' ').trim();
const impressao = (s) => crypto.createHash('sha256').update(normalizar(s), 'utf8').digest('hex').slice(0, 16);
const relativo = (abs) => path.relative(RAIZ, abs).replace(/\\/g, '/');

function listarJs(dir, saida = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const abs = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === 'node_modules' || e.name === '__tests__') continue;
            listarJs(abs, saida);
        } else if (e.name.endsWith('.js') && !e.name.endsWith('.test.js')) {
            saida.push(relativo(abs));
        }
    }
    return saida;
}

/** Arquivos fora do escopo que voltaram a ser usados: `[{ arquivo, onde }]`. */
function foraDoEscopoEmUso() {
    const codigo = [
        ...PASTAS_DE_CODIGO.filter((p) => fs.existsSync(path.join(RAIZ, p))).flatMap((p) => listarJs(path.join(RAIZ, p))),
        'App.js',
    ];
    const achados = [];
    for (const [arquivo, regra] of Object.entries(FORA_DO_ESCOPO)) {
        for (const outro of codigo) {
            if (outro === arquivo) continue;
            const linhas = fs.readFileSync(path.join(RAIZ, outro), 'utf8').split('\n');
            linhas.forEach((l, i) => {
                if (regra.uso.test(l) && !(regra.ignorarLinha && regra.ignorarLinha.test(l))) {
                    achados.push({ arquivo, onde: `${outro}:${i + 1}` });
                }
            });
        }
    }
    return achados;
}

/** Todo texto de usuario em pt-BR, com onde ele esta. */
function textosDoApp() {
    const textos = [];
    const arquivos = PASTAS.flatMap((p) => listarJs(path.join(RAIZ, p)))
        .filter((a) => !PASTAS_DE_TRADUCAO.test(a) && !FORA_DO_ESCOPO[a]);
    for (const arquivo of arquivos) {
        const { blocos } = extrair(arquivo, OPCOES);
        for (const b of blocos) {
            if (b.chaveDoTitulo) textos.push({ arquivo, linha: b.linhaDoTitulo, chave: b.chaveDoTitulo, texto: b.item });
            for (const t of b.textos) textos.push({ arquivo, linha: t.linha, chave: t.chave, texto: t.texto });
        }
    }
    const common = JSON.parse(fs.readFileSync(path.join(RAIZ, COMMON_PT_BR), 'utf8'));
    (function andar(no, trilha) {
        for (const [k, v] of Object.entries(no)) {
            const chave = trilha ? `${trilha}.${k}` : k;
            if (typeof v === 'string') {
                if (v.length >= MIN_PROSA_INTERFACE) textos.push({ arquivo: COMMON_PT_BR, linha: 0, chave, texto: v });
            } else if (v && typeof v === 'object') andar(v, chave);
        }
    })(common, '');
    return textos.map((t) => ({ ...t, id: impressao(t.texto) }));
}

/**
 * O que passou por documento. Sigla com `_plano-` = documento devolvido;
 * sem plano = enviado e ainda nao devolvido.
 */
function textosDosDocumentos() {
    const revisados = new Set();
    const emRevisao = new Set();
    const revisadosPorArquivo = {};
    const guardar = (arquivo, texto) => {
        revisados.add(impressao(texto));
        (revisadosPorArquivo[arquivo] = revisadosPorArquivo[arquivo] || []).push(normalizar(texto));
    };
    const arquivos = fs.readdirSync(DOCS);
    const devolvidas = new Set(arquivos
        .filter((f) => f.startsWith('_plano-') && f.endsWith('.json'))
        .map((f) => f.slice('_plano-'.length, '_plano-'.length + 2)));
    for (const f of arquivos.filter((x) => /^_manifesto(-[A-Z]+)?\.json$/.test(x))) {
        const manifesto = JSON.parse(fs.readFileSync(path.join(DOCS, f), 'utf8'));
        for (const [codigo, v] of Object.entries(manifesto)) {
            if (devolvidas.has(codigo.slice(0, 2))) guardar(v.arquivo, v.original);
            else emRevisao.add(impressao(v.original));
        }
    }
    for (const f of arquivos.filter((x) => x.startsWith('_plano-') && x.endsWith('.json'))) {
        const plano = JSON.parse(fs.readFileSync(path.join(DOCS, f), 'utf8'));
        for (const e of plano.editados || []) guardar(e.arquivo, e.novo);
        for (const n of plano.novos || []) revisados.add(impressao(n.texto));
    }
    return { revisados, emRevisao, revisadosPorArquivo, devolvidas: [...devolvidas].sort() };
}

/** Semelhanca por pares de letras (Dice): 1 = igual, 0 = nada em comum. */
function semelhanca(a, b) {
    const pares = (s) => {
        const m = new Map();
        const x = s.toLowerCase();
        for (let i = 0; i < x.length - 1; i++) m.set(x.slice(i, i + 2), (m.get(x.slice(i, i + 2)) || 0) + 1);
        return m;
    };
    const A = pares(a);
    const B = pares(b);
    let comum = 0;
    for (const [k, v] of A) comum += Math.min(v, B.get(k) || 0);
    return (2 * comum) / Math.max(1, a.length + b.length - 2);
}

/**
 * O texto revisado do mesmo arquivo que mais se parece com `texto` — a versao
 * que o Agnaldo leu antes da mudanca. `null` se nada passar de 60% (texto novo).
 * Heuristica para MOSTRAR ao revisor; a trava em si nunca decide por semelhanca.
 */
let cacheDocumentos = null;
function referenciaRevisada(arquivo, texto) {
    cacheDocumentos = cacheDocumentos || textosDosDocumentos();
    const alvo = normalizar(texto);
    let melhor = null;
    let nota = 0.6;
    for (const r of cacheDocumentos.revisadosPorArquivo[arquivo] || []) {
        const s = semelhanca(alvo, r);
        if (s >= nota) { nota = s; melhor = r; }
    }
    return melhor;
}

function lerRegistro() {
    try {
        return JSON.parse(fs.readFileSync(CAMINHO_REGISTRO, 'utf8'));
    } catch {
        return { motivos: {}, textos: {} };
    }
}

function gravarRegistro(registro) {
    const ordenado = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
    const saida = {
        sobre: 'Gerado por scripts/verify_revisao_conteudo.js. Cada texto: [situacao, arquivo, motivo]. '
            + 'Nao edite a mao: use --aprovar / --pendente.',
        motivos: ordenado(registro.motivos),
        textos: ordenado(registro.textos),
    };
    fs.writeFileSync(CAMINHO_REGISTRO, `${JSON.stringify(saida, null, 1)}\n`, 'utf8');
}

/** Classifica todos os textos do app. Exportado para o gerador avisar. */
function avaliar() {
    const textos = textosDoApp();
    const { revisados, emRevisao, devolvidas } = textosDosDocumentos();
    const registro = lerRegistro();
    const r = { revisado: [], emRevisao: [], aprovado: [], pendente: [], semRegistro: [] };
    const vistos = new Set();
    for (const t of textos) {
        if (vistos.has(t.id)) continue;   // mesmo texto em dois lugares: uma decisao so
        vistos.add(t.id);
        const reg = registro.textos[t.id];
        if (revisados.has(t.id)) r.revisado.push(t);
        else if (emRevisao.has(t.id)) r.emRevisao.push(t);
        else if (reg && reg[0] === 'aprovado') r.aprovado.push(t);
        else if (reg && reg[0] === 'pendente') r.pendente.push({ ...t, motivo: reg[2] });
        else r.semRegistro.push(t);
    }
    // Registro de texto que ja saiu do app: lixo inofensivo, limpo na proxima escrita.
    r.obsoletos = Object.keys(registro.textos).filter((id) => !vistos.has(id));
    r.devolvidas = devolvidas;
    r.registro = registro;
    r.foraEmUso = foraDoEscopoEmUso();
    return r;
}

function limpar(r) {
    for (const id of r.obsoletos) delete r.registro.textos[id];
    gravarRegistro(r.registro);
    console.log(`${r.obsoletos.length} registro(s) de texto que saiu do app removido(s).`);
}

function registrar(r, situacao, motivo, filtroArquivos) {
    const alvo = r.semRegistro.filter((t) => !filtroArquivos.length || filtroArquivos.includes(t.arquivo));
    if (!alvo.length) {
        console.log('Nada a registrar: nenhum texto reprovado' + (filtroArquivos.length ? ' nesses arquivos.' : '.'));
        return;
    }
    const { registro } = r;
    let idMotivo = Object.keys(registro.motivos).find((k) => registro.motivos[k].texto === motivo);
    if (!idMotivo) {
        idMotivo = `m${String(Object.keys(registro.motivos).length + 1).padStart(3, '0')}`;
        registro.motivos[idMotivo] = { texto: motivo, em: new Date().toLocaleDateString('sv-SE') };
    }
    for (const t of alvo) {
        registro.textos[t.id] = [situacao, t.arquivo, idMotivo];
        console.log(`  ${situacao.toUpperCase()}  ${t.arquivo}:${t.linha}  ${normalizar(t.texto).slice(0, 110)}`);
    }
    for (const id of r.obsoletos) delete registro.textos[id];
    gravarRegistro(registro);
    console.log(`\n${alvo.length} texto(s) registrado(s) como ${situacao} (${idMotivo}: ${motivo}).`);
    if (r.obsoletos.length) console.log(`${r.obsoletos.length} registro(s) de texto que saiu do app removido(s).`);
}

function porArquivo(lista) {
    const m = {};
    for (const t of lista) (m[t.arquivo] = m[t.arquivo] || []).push(t);
    return Object.entries(m).sort((a, b) => b[1].length - a[1].length);
}

function principal() {
    const args = process.argv.slice(2);
    const r = avaliar();

    if (args.includes('--limpar')) {
        limpar(r);
        return;
    }

    for (const modo of ['--aprovar', '--pendente']) {
        const i = args.indexOf(modo);
        if (i < 0) continue;
        const motivo = args[i + 1];
        if (!motivo || motivo.startsWith('--')) {
            console.error(`${modo} exige o motivo entre aspas.`);
            process.exit(2);
        }
        registrar(r, modo.slice(2), motivo, args.slice(i + 2).filter((a) => !a.startsWith('--')));
        return;
    }

    console.log('Revisao de conteudo — texto de usuario em pt-BR');
    console.log(`  revisado pelo Agnaldo (documentos ${r.devolvidas.join(', ')})  ${r.revisado.length}`);
    console.log(`  em documento ainda nao devolvido                ${r.emRevisao.length}`);
    console.log(`  aprovado fora de documento                      ${r.aprovado.length}`);
    console.log(`  pendente de revisao (backlog)                   ${r.pendente.length}`);

    if (args.includes('--listar')) {
        const porMotivo = {};
        for (const t of r.pendente) (porMotivo[t.motivo] = porMotivo[t.motivo] || []).push(t);
        for (const [motivo, lista] of Object.entries(porMotivo).sort()) {
            console.log(`\n  ${lista.length} — ${r.registro.motivos[motivo].texto}`);
            for (const [arquivo, doArquivo] of porArquivo(lista)) {
                console.log(`    ${String(doArquivo.length).padStart(4)}  ${arquivo}`);
            }
        }
    }

    if (r.foraEmUso.length) {
        console.log('\nFALHA — arquivo tratado como fora do escopo voltou a ser usado:');
        for (const f of r.foraEmUso) {
            console.log(`  ${f.arquivo}  (${FORA_DO_ESCOPO[f.arquivo].motivo})`);
            console.log(`    usado em ${f.onde}`);
        }
        console.log('\n  O texto dele nunca foi revisado. Tire-o de FORA_DO_ESCOPO e mande para revisao.');
        process.exit(1);
    }

    if (r.semRegistro.length) {
        console.log(`\nFALHA — ${r.semRegistro.length} texto(s) sem revisao e sem registro:`);
        for (const [arquivo, lista] of porArquivo(r.semRegistro)) {
            console.log(`\n  ${arquivo}`);
            for (const t of lista.sort((a, b) => a.linha - b.linha)) {
                console.log(`    ${String(t.linha).padStart(5)}  ${t.chave.padEnd(18)} ${normalizar(t.texto).slice(0, 110)}`);
            }
        }
        console.log(`
Texto novo ou alterado que o Agnaldo nao viu. Caminhos:
  - mandar para revisao (documento novo no gerador) e aplicar o retorno;
  - se ele ja aprovou ESTE texto (ex.: por chat):
      node scripts/verify_revisao_conteudo.js --aprovar "o que ele aprovou e quando" <arquivo>
  - para seguir sem revisao agora, deixando visivel no backlog:
      node scripts/verify_revisao_conteudo.js --pendente "por que" <arquivo>`);
        process.exit(1);
    }
    console.log('\nOK — todo texto de usuario esta revisado, em revisao ou registrado.');
}

if (require.main === module) principal();

/** Arquivos com algum texto em documento devolvido. */
function arquivosRevisados() {
    return Object.keys(textosDosDocumentos().revisadosPorArquivo);
}

module.exports = { avaliar, referenciaRevisada, normalizar, impressao, arquivosRevisados, MIN_TEXTO_CURTO, OPCOES };
