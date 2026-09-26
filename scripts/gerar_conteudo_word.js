/**
 * gerar_conteudo_word.js — versão .docx dos textos para revisão humana.
 *
 * O markdown de `docs/conteudo-editavel/` é ótimo para o código e ruim para
 * revisar: quem edita precisa desviar do identificador, e basta apagar uma
 * linha `**[ID]**` sem querer para o texto perder o caminho de volta.
 *
 * No Word o texto vai numa TABELA: o ID fica numa coluna própria, e só a
 * última coluna é para editar. Não tem como encostar no identificador sem
 * perceber, e a revisão vira o que o Word faz bem — clicar na célula e
 * escrever, com corretor ortográfico e controle de alterações.
 *
 * Uso: node scripts/gerar_conteudo_word.js
 * Saída: docs/conteudo-editavel/word/*.docx
 *
 * Depende de `docx`, que NÃO está nas dependências do projeto de propósito —
 * é ferramenta de autoria e não tem por que ir no bundle do app. Instale sem
 * gravar no package.json:  npm install --no-save docx
 *
 * ATENÇÃO: rodar de novo SOBRESCREVE os .docx e apaga revisões já feitas
 * neles. Ver docs/conteudo-editavel/word/_COMO-REVISAR.md.
 */
const fs = require('fs');
const path = require('path');
const {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType, BorderStyle,
} = require('docx');

const RAIZ = path.join(__dirname, '..');
const ORIGEM = path.join(RAIZ, 'docs', 'conteudo-editavel');
const DESTINO = path.join(ORIGEM, 'word');

// A4 (11906 DXA) com margens de 0,5" (720) → 10466 de área útil.
const LARGURAS = [1250, 2700, 6516];
const TOTAL = LARGURAS.reduce((a, b) => a + b, 0);

const VERDE = 'F4EBDC';   // creme do app, para o cabeçalho da tabela
const CINZA = 'F2F2F2';

const celula = (filhos, largura, sombra) => new TableCell({
    width: { size: largura, type: WidthType.DXA },
    shading: sombra ? { type: ShadingType.CLEAR, fill: sombra, color: 'auto' } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: filhos,
});

const texto = (t, opts = {}) => new Paragraph({
    children: [new TextRun({ text: t, ...opts })],
    spacing: { after: opts.after || 0 },
});

/** Uma linha da tabela; o texto pode ter várias linhas. */
function linhaConteudo(id, contexto, conteudo, par) {
    const paragrafos = String(conteudo).split('\n').map((l) => texto(l));
    return new TableRow({
        children: [
            celula([texto(id, { bold: true, size: 18, font: 'Consolas' })], LARGURAS[0], par ? CINZA : undefined),
            celula([texto(contexto, { size: 17, color: '666666' })], LARGURAS[1], par ? CINZA : undefined),
            celula(paragrafos.length ? paragrafos : [texto('')], LARGURAS[2], par ? CINZA : undefined),
        ],
    });
}

const cabecalho = (cols) => new TableRow({
    tableHeader: true,
    children: cols.map((c, i) => celula(
        [texto(c, { bold: true, size: 18 })],
        LARGURAS[i],
        VERDE,
    )),
});

function documento(titulo, subtitulo, instrucao, tabela) {
    return new Document({
        styles: { default: { document: { run: { font: 'Calibri', size: 21 } } } },
        sections: [{
            properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
            children: [
                new Paragraph({ text: titulo, heading: HeadingLevel.HEADING_1 }),
                texto(subtitulo, { color: '666666', after: 120 }),
                new Paragraph({
                    children: [new TextRun({ text: instrucao, italics: true, size: 19 })],
                    spacing: { after: 240 },
                    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } },
                }),
                tabela,
            ],
        }],
    });
}

const INSTRUCAO = 'Edite apenas a coluna "Texto". As colunas de identificador e de origem são o endereço de volta ao aplicativo — se forem alteradas, o texto não encontra o lugar dele. Pode usar controle de alterações do Word à vontade.';

// ── 1. arquivos de conteúdo, no formato **[ID]** ─────────────────────────
function converterConteudo(arquivo) {
    const bruto = fs.readFileSync(path.join(ORIGEM, arquivo), 'utf8');
    const origem = (/Origem: `([^`]+)`/.exec(bruto) || [])[1] || '';
    const partes = bruto.split(/\*\*\[([A-Z]{2,5}-\d+)\]\*\*\s*·\s*([^\n]*)\n/);
    if (partes.length < 4) return null;

    const linhas = [];
    for (let i = 1; i < partes.length; i += 3) {
        const id = partes[i];
        const contexto = partes[i + 1].replace(/\s*·\s*\d+\s*car\.?\s*$/, '').trim();
        const conteudo = partes[i + 2].replace(/\n*---\n*$/, '').trim();
        linhas.push(linhaConteudo(id, contexto, conteudo, linhas.length % 2 === 1));
    }
    if (!linhas.length) return null;

    const tabela = new Table({
        columnWidths: LARGURAS,
        width: { size: TOTAL, type: WidthType.DXA },
        rows: [cabecalho(['ID', 'Onde aparece', 'Texto']), ...linhas],
    });
    const nome = path.basename(arquivo, '.md');
    return {
        nome,
        n: linhas.length,
        doc: documento(
            'Conteúdo · ' + nome,
            (origem ? 'Origem: ' + origem + ' · ' : '') + linhas.length + ' textos.',
            INSTRUCAO,
            tabela,
        ),
    };
}

// ── 2. _textos-rasos.md, que já é tabela markdown ────────────────────────
function converterRasos() {
    // Leitura protegida: a versão anterior lia sem checar, e como a IIFE do
    // final não tinha catch, um arquivo ausente virava rejeição não tratada
    // DEPOIS de os outros .docx já terem sido sobrescritos — o pior momento
    // possível para abortar, porque as revisões já estariam perdidas.
    const caminho = path.join(ORIGEM, '_textos-rasos.md');
    if (!fs.existsSync(caminho)) {
        console.log('  aviso: _textos-rasos.md não encontrado — documento de prioridade não gerado.');
        return null;
    }
    const bruto = fs.readFileSync(caminho, 'utf8');
    const linhasMd = bruto.split('\n').filter((l) => /^\|\s*[A-Z]{2,5}-\d+\s*\|/.test(l));
    if (!linhasMd.length) return null;

    const linhas = linhasMd.map((l, i) => {
        const c = l.split('|').slice(1, -1).map((x) => x.trim());
        // c = [ID, arquivo, trilha, caracteres, texto]
        return linhaConteudo(c[0], c[1] + ' › ' + c[2], c[4] || '', i % 2 === 1);
    });

    const tabela = new Table({
        columnWidths: LARGURAS,
        width: { size: TOTAL, type: WidthType.DXA },
        rows: [cabecalho(['ID', 'Onde aparece', 'Texto (curto — reescrever)']), ...linhas],
    });
    return {
        nome: '_PRIORIDADE-textos-curtos',
        n: linhas.length,
        doc: documento(
            'Prioridade · textos curtos demais',
            linhas.length + ' campos explicativos com menos de 90 caracteres. É por aqui que a revisão rende mais.',
            INSTRUCAO,
            tabela,
        ),
    };
}

// ── execução ─────────────────────────────────────────────────────────────
(async () => {
    if (!fs.existsSync(ORIGEM)) {
        console.error('Pasta de origem não encontrada: ' + ORIGEM);
        process.exitCode = 1;
        return;
    }
    const jaExistia = fs.existsSync(DESTINO) && fs.readdirSync(DESTINO).some((f) => f.endsWith('.docx'));
    if (jaExistia) {
        console.log('\nATENÇÃO: já existem .docx em ' + path.relative(RAIZ, DESTINO) + '.');
        console.log('Eles serão SOBRESCRITOS — revisões feitas neles se perdem.\n');
    }
    fs.mkdirSync(DESTINO, { recursive: true });
    const arquivos = fs.readdirSync(ORIGEM).filter((f) => f.endsWith('.md') && f !== '_textos-rasos.md' && f !== '_INDICE.md');

    const feitos = [];
    for (const a of arquivos) {
        const r = converterConteudo(a);
        if (!r) { console.log('  pulado (sem IDs reconhecidos): ' + a); continue; }
        fs.writeFileSync(path.join(DESTINO, r.nome + '.docx'), await Packer.toBuffer(r.doc));
        feitos.push(r);
    }
    const rasos = converterRasos();
    if (rasos) {
        fs.writeFileSync(path.join(DESTINO, rasos.nome + '.docx'), await Packer.toBuffer(rasos.doc));
        feitos.push(rasos);
    }

    feitos.sort((a, b) => b.n - a.n);
    const total = feitos.reduce((s, f) => s + f.n, 0);
    console.log('\n' + feitos.length + ' documentos Word em docs/conteudo-editavel/word/  (' + total + ' textos)\n');
    feitos.slice(0, 10).forEach((f) => console.log('  ' + String(f.n).padStart(5) + '  ' + f.nome + '.docx'));
    if (feitos.length > 10) console.log('  ...e mais ' + (feitos.length - 10) + '.');
})().catch((e) => {
    console.error('\nFalhou ao gerar os documentos: ' + (e && e.message ? e.message : e));
    console.error('Parte dos .docx pode ter sido gravada. Confira a pasta antes de revisar.');
    process.exitCode = 1;
});
