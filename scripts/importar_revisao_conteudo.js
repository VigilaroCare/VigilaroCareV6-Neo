/**
 * importar_revisao_conteudo.js
 *
 * Le um .docx revisado pelo Agnaldo e diz, texto por texto, o que ele mudou.
 * Nao escreve em `data/` por conta propria: emite um relatorio e um plano em
 * JSON para aplicacao conferida.
 *
 * Uso:
 *   node scripts/importar_revisao_conteudo.js <documento.docx> [--manifesto <ref|caminho>]
 *
 * O `--manifesto` aceita um ref do git (ex: `639c220`) ou um caminho. O padrao
 * e o manifesto atual do repositorio.
 *
 * ================================================================
 * POR QUE O MANIFESTO PRECISA SER O QUE GEROU O DOCUMENTO
 * ================================================================
 * Os codigos (AE-0001, AE-0002...) sao sequenciais por posicao. Isso foi um
 * erro de projeto meu: assim que o conteudo de origem muda, tudo abaixo do
 * ponto alterado desliza um numero.
 *
 * Aconteceu na pratica em 08/10/2026. Consolidei duas secoes de `safety_gas.js`
 * (achado do proprio Agnaldo) e regerei o manifesto enquanto ele revisava o
 * documento antigo. Resultado: 209 dos 237 codigos AE passaram a apontar para
 * outro texto. Ler a revisao dele com o manifesto novo teria aplicado as
 * edicoes nos campos ERRADOS — silenciosamente, com cara de sucesso.
 *
 * Dai a verificacao de coerencia obrigatoria aqui: antes de classificar
 * qualquer edicao, o script confere quantos paragrafos do documento batem
 * exatamente com o `original` do manifesto. Revisao humana normal mexe em
 * parte do texto, nunca em tudo. Se a taxa de batida vier baixa, o par
 * documento/manifesto esta trocado e o script PARA.
 *
 * A correcao de raiz — codigo derivado de hash estavel, nao de posicao — esta
 * anotada em docs/PENDENCIAS.md.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const zlib = require('zlib');

const RAIZ = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Leitura do .docx sem dependencia externa: e um ZIP, e so word/document.xml
// (e word/comments.xml, quando existe) interessa.
// ---------------------------------------------------------------------------

/** Extrai uma entrada de um ZIP usando os cabecalhos locais. */
function lerDoZip(buffer, nomeAlvo) {
    let pos = 0;
    while (pos < buffer.length - 4) {
        if (buffer.readUInt32LE(pos) !== 0x04034b50) { pos++; continue; }
        const metodo = buffer.readUInt16LE(pos + 8);
        const tamComp = buffer.readUInt32LE(pos + 18);
        const tamNome = buffer.readUInt16LE(pos + 26);
        const tamExtra = buffer.readUInt16LE(pos + 28);
        const nome = buffer.toString('utf8', pos + 30, pos + 30 + tamNome);
        const inicio = pos + 30 + tamNome + tamExtra;
        if (nome === nomeAlvo) {
            const dados = buffer.subarray(inicio, inicio + tamComp);
            return metodo === 0 ? dados : zlib.inflateRawSync(dados);
        }
        pos = inicio + tamComp;
    }
    return null;
}

const DESESCAPA = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
};

/**
 * Texto de cada paragrafo do document.xml, na ordem.
 *
 * Concatena TODOS os <w:t> do paragrafo de proposito: o Word reparte uma frase
 * editada em varios <w:r>, e o marcador cinza do codigo e um run separado que
 * pode acabar fundido ao texto. Juntar tudo e depois separar pelo padrao do
 * codigo e o unico caminho estavel.
 *
 * <w:tab/> vira espaco; <w:br/> e o fim de <w:p> viram quebra de linha, para
 * reconstituir os "\n" que existiam na string original do codigo.
 *
 * O SUMARIO E DESCARTADO. Quando o Word atualiza o indice, ele copia o texto
 * de cada cabecalho para dentro do campo TOC — e os cabecalhos levam codigo.
 * Sem este filtro, cada entrada do indice entra como se fosse um paragrafo de
 * conteudo, com o numero de pagina colado no fim: "Estacionamentos e Garagens
 * 7" aparecia como edicao do Agnaldo, e as linhas de indice sem codigo
 * entravam como texto novo. Foram 43 edicoes falsas e 113 inclusoes falsas na
 * primeira tentativa.
 *
 * O teste da ancora `_Toc` e o confiavel: independe do idioma do Word. O
 * pStyle entra como reforco porque e `Sumrio1`/`Sumrio2` num Word em
 * portugues e `TOC1`/`TOC2` num Word em ingles.
 */
const RX_PSTYLE_SUMARIO = /<w:pStyle\s+w:val="(?:TOC|Sum[^"]*)\d[^"]*"/i;

function paragrafos(xmlBuffer) {
    const xml = xmlBuffer.toString('utf8');
    const saida = [];
    const RX_P = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>|<w:p(?:\s[^>]*)?\/>/g;
    let m;
    while ((m = RX_P.exec(xml)) !== null) {
        const corpo = m[1] || '';
        if (corpo.includes('w:anchor="_Toc') || RX_PSTYLE_SUMARIO.test(corpo)) {
            saida.push({ texto: '', cabecalho: false });  // posicao mantida, conteudo descartado
            continue;
        }
        // Ignora o conteudo de campos (TOC): vem com w:instrText e duplicaria.
        const semCampos = corpo.replace(/<w:instrText[\s\S]*?<\/w:instrText>/g, '');
        let texto = '';
        const RX_NO = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\s*\/>|<w:br\s*\/>/g;
        let n;
        while ((n = RX_NO.exec(semCampos)) !== null) {
            if (n[0].startsWith('<w:tab')) { texto += ' '; continue; }
            if (n[0].startsWith('<w:br')) { texto += '\n'; continue; }
            texto += n[1].replace(/&(amp|lt|gt|quot|apos);/g, (s) => DESESCAPA[s]);
        }
        saida.push({ texto, cabecalho: RX_PSTYLE_CABECALHO.test(corpo) });
    }
    return saida;
}

/** Comentarios do Word, se houver: duvidas e observacoes do revisor. */
function comentarios(buffer) {
    const xmlBuf = lerDoZip(buffer, 'word/comments.xml');
    if (!xmlBuf) return [];
    const xml = xmlBuf.toString('utf8');
    const out = [];
    const RX = /<w:comment\b[^>]*w:author="([^"]*)"[^>]*>([\s\S]*?)<\/w:comment>/g;
    let m;
    while ((m = RX.exec(xml)) !== null) {
        let texto = '';
        const RX_T = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
        let t;
        while ((t = RX_T.exec(m[2])) !== null) {
            texto += t[1].replace(/&(amp|lt|gt|quot|apos);/g, (s) => DESESCAPA[s]);
        }
        if (texto.trim()) out.push({ autor: m[1], texto: texto.trim() });
    }
    return out;
}

// ---------------------------------------------------------------------------
// Normalizacao para comparar
// ---------------------------------------------------------------------------

/**
 * O Word normaliza tipografia ao salvar: aspas retas viram curvas, "..." vira
 * reticencia, hifen duplo vira travessao, NBSP aparece onde havia espaco.
 * Comparar sem desfazer isso marcaria como "editado" texto que ninguem tocou.
 */
function normalizar(s) {
    return String(s)
        .replace(/\r\n?/g, '\n')
        .replace(/[‘’‛]/g, "'")
        .replace(/[“”‟]/g, '"')
        .replace(/…/g, '...')
        .replace(/[–—]/g, '-')
        .replace(/ /g, ' ')
        .replace(/[ \t]+/g, ' ')
        .split('\n').map((l) => l.trim()).filter((l) => l !== '')
        .join('\n')
        .trim();
}

const RX_CODIGO = /^\s*([A-Z]{2}-\d{4})\b[\s ]*([\s\S]*)$/;

/**
 * Paragrafos que o PROPRIO gerador escreve e que nao levam codigo: os rotulos
 * de papel do campo ("O QUE FAZER", "ITENS", "DESCRICAO"), os cabecalhos de
 * secao e o texto de abertura do documento.
 *
 * Sem este filtro eles entram como "texto novo escrito pelo revisor". Na
 * primeira passada foram 78 inclusoes falsas — 23 rotulos de papel e 55
 * cabecalhos — contra zero inclusoes reais.
 *
 * Os rotulos vem do proprio gerador em vez de copiados: lista copiada sai de
 * sincronia na primeira vez que alguem acrescentar um campo lá.
 */
const { PAPEL_DO_CAMPO } = require('./gerar_revisao_conteudo.js');
const ROTULOS_DO_GERADOR = new Set(Object.values(PAPEL_DO_CAMPO));

const ABERTURA_DO_GERADOR = [
    /^VIGILARO CARE/i,
    /^Como revisar$/i,
    /^Indice$/i,
    /^\d+ textos neste documento\.$/i,
    /^Edite o texto direto/i,
    /^N[ãa]o apague o c[óo]digo cinza/i,
    /^Para remover um texto/i,
    /^Para acrescentar um texto novo/i,
    /^D[úu]vida ou coment[áa]rio/i,
    /^Pode devolver s[óo] uma parte/i,
];

/** Estilo de cabecalho, em Word pt ou en. */
const RX_PSTYLE_CABECALHO = /<w:pStyle\s+w:val="(?:Heading\d|T[íi]?tulo\d?|Ttulo\d?)"/i;

const ehEstruturaDoGerador = (texto) => {
    const t = texto.trim();
    if (ROTULOS_DO_GERADOR.has(t)) return true;
    return ABERTURA_DO_GERADOR.some((rx) => rx.test(t));
};

const MARCA_REMOVER = /^\s*(REMOVER|REMOVIDO|EXCLUIR|APAGAR)\b[\s.!]*$/i;

// ---------------------------------------------------------------------------
// Principal
// ---------------------------------------------------------------------------

function carregarManifesto(ref) {
    if (!ref) {
        return JSON.parse(fs.readFileSync(
            path.join(RAIZ, 'docs/revisao-conteudo/_manifesto.json'), 'utf8',
        ));
    }
    if (fs.existsSync(ref)) return JSON.parse(fs.readFileSync(ref, 'utf8'));
    // ref do git
    const saida = execFileSync(
        'git', ['show', `${ref}:docs/revisao-conteudo/_manifesto.json`],
        { cwd: RAIZ, maxBuffer: 64 * 1024 * 1024 },
    );
    return JSON.parse(saida.toString('utf8'));
}

function principal() {
    const args = process.argv.slice(2);
    const docPath = args.find((a) => a.endsWith('.docx'));
    if (!docPath) {
        console.error('Uso: node scripts/importar_revisao_conteudo.js <documento.docx> [--manifesto <ref|caminho>]');
        process.exit(2);
    }
    const iRef = args.indexOf('--manifesto');
    const manifesto = carregarManifesto(iRef >= 0 ? args[iRef + 1] : null);

    const buffer = fs.readFileSync(path.isAbsolute(docPath) ? docPath : path.join(RAIZ, docPath));
    const xml = lerDoZip(buffer, 'word/document.xml');
    if (!xml) { console.error('document.xml nao encontrado no .docx'); process.exit(1); }

    const paras = paragrafos(xml);

    // Agrupa: um codigo pode ter ganhado paragrafos novos logo abaixo dele.
    const lidos = [];       // { codigo, texto }
    const semCodigo = [];   // { depoisDe, texto }
    let ultimoCodigo = null;
    let estrutura = 0;
    for (const p of paras) {
        const t = p.texto.trim();
        if (!t) continue;
        const m = RX_CODIGO.exec(t);
        if (m && manifesto[m[1]]) {
            ultimoCodigo = m[1];
            lidos.push({ codigo: m[1], texto: m[2] });
            continue;
        }
        // Cabecalho sem codigo e rotulo de papel sao andaimes do gerador, nao
        // texto do revisor. Entram na contagem de estrutura so para o
        // relatorio poder provar que nada foi perdido pelo caminho.
        if (p.cabecalho || ehEstruturaDoGerador(t)) { estrutura++; continue; }
        if (ultimoCodigo) semCodigo.push({ depoisDe: ultimoCodigo, texto: t });
    }

    if (!lidos.length) {
        console.error('Nenhum codigo reconhecido. O manifesto corresponde a este documento?');
        process.exit(1);
    }

    // ---- verificacao de coerencia documento x manifesto --------------------
    const iguais = lidos.filter((l) => normalizar(l.texto) === normalizar(manifesto[l.codigo].original)).length;
    const taxa = iguais / lidos.length;
    console.log(`\ndocumento : ${path.basename(docPath)}`);
    console.log(`manifesto : ${iRef >= 0 ? args[iRef + 1] : 'atual do repositorio'}`);
    console.log(`codigos lidos: ${lidos.length}  |  intactos: ${iguais} (${(taxa * 100).toFixed(1)}%)`);
    console.log(`estrutura do gerador ignorada: ${estrutura} paragrafo(s)`);

    if (taxa < 0.5) {
        console.error('\nPARADO: menos da metade dos textos bate com o manifesto.');
        console.error('Revisao humana nao reescreve tudo — o par documento/manifesto esta trocado.');
        console.error('Passe o manifesto que gerou ESTE documento com --manifesto <ref do git>.');
        process.exit(1);
    }

    // ---- classificacao -----------------------------------------------------
    const editados = [];
    const removidos = [];
    for (const l of lidos) {
        const antes = normalizar(manifesto[l.codigo].original);
        const depois = normalizar(l.texto);
        if (depois === antes) continue;
        if (MARCA_REMOVER.test(depois) || depois === '') {
            removidos.push({ ...manifesto[l.codigo], codigo: l.codigo });
        } else {
            editados.push({ ...manifesto[l.codigo], codigo: l.codigo, novo: l.texto.trim() });
        }
    }

    const coment = comentarios(buffer);

    // ---- relatorio ---------------------------------------------------------
    console.log(`\nEDITADOS : ${editados.length}`);
    console.log(`REMOVIDOS: ${removidos.length}`);
    console.log(`NOVOS    : ${semCodigo.length}`);
    console.log(`COMENTARIOS DO WORD: ${coment.length}`);

    for (const e of editados) {
        console.log(`\n--- ${e.codigo}  ${e.arquivo}:${e.linha}  [${e.chave}]`);
        console.log(`    item : ${e.item}`);
        console.log(`    antes: ${e.original.replace(/\n/g, ' ⏎ ')}`);
        console.log(`    novo : ${e.novo.replace(/\n/g, ' ⏎ ')}`);
    }
    for (const r of removidos) {
        console.log(`\n--- ${r.codigo} REMOVER  ${r.arquivo}:${r.linha}  [${r.chave}]`);
        console.log(`    ${r.original.replace(/\n/g, ' ⏎ ').slice(0, 120)}`);
    }
    for (const n of semCodigo) {
        console.log(`\n--- NOVO (depois de ${n.depoisDe})`);
        console.log(`    ${n.texto.replace(/\n/g, ' ⏎ ').slice(0, 200)}`);
    }
    for (const c of coment) {
        console.log(`\n--- COMENTARIO (${c.autor}): ${c.texto}`);
    }

    const plano = {
        documento: path.basename(docPath),
        manifesto: iRef >= 0 ? args[iRef + 1] : 'atual',
        geradoEm: new Date().toISOString(),
        coerencia: { lidos: lidos.length, intactos: iguais, taxa: Number(taxa.toFixed(4)) },
        editados,
        removidos,
        novos: semCodigo,
        comentarios: coment,
    };
    const destino = path.join(RAIZ, 'docs/revisao-conteudo', `_plano-${path.basename(docPath, '.docx')}.json`);
    fs.writeFileSync(destino, JSON.stringify(plano, null, 2), 'utf8');
    console.log(`\nPlano: ${path.relative(RAIZ, destino)}`);
}

principal();
