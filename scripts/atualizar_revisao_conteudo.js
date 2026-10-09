/**
 * atualizar_revisao_conteudo.js
 *
 * Atualiza, DENTRO de um documento de revisão já existente, apenas os textos
 * cujo conteúdo mudou no código. Tudo o resto fica byte a byte como estava —
 * incluindo anotações, comentários e marcas de revisão de quem está lendo.
 *
 * ================================================================
 * POR QUE ESTE SCRIPT EXISTE
 * ================================================================
 * Em 08/10/2026 o Agnaldo estava a revisar o `PS-Primeiros-Socorros.docx`.
 * Chegou às fichas de engasgo, viu que o protocolo estava desatualizado e me
 * disse. Eu respondi que já havia corrigido no código, mas que não conseguira
 * regerar o documento porque ele estava aberto no Word. Ele fechou o documento
 * para que eu atualizasse ESSE tema.
 *
 * Eu regerei o documento INTEIRO, com `--forcar`, e destruí a revisão que ele
 * tinha em andamento. O `git status` tinha acabado de me dizer, na linha
 * acima, que o ficheiro estava modificado. Eu não li.
 *
 * As palavras dele: "O correto seria vc alterar apenas o que vc mexeu."
 *
 * Está certo. Regerar é a ferramenta errada para "corrigi um tema": troca o
 * documento todo para mudar três parágrafos, e leva com ele todo o trabalho
 * humano que estiver dentro.
 *
 * ================================================================
 * COMO FUNCIONA
 * ================================================================
 * Lê o `word/document.xml`, localiza cada parágrafo pelo código cinza e:
 *
 *   - texto igual no documento e no manifesto, mas diferente no código
 *       -> ATUALIZA o parágrafo no lugar
 *   - texto no documento diferente do manifesto
 *       -> a pessoa editou. NÃO TOCA, e reporta como conflito para ela decidir
 *   - texto novo no código, que não existe no documento
 *       -> INSERE um parágrafo logo após o último do mesmo item, com código de
 *          sufixo (PS-0016a), para não renumerar nada do que ela já leu
 *   - texto que saiu do código
 *       -> marca o parágrafo como REMOVIDO, em vez de o apagar: se ela já
 *          anotou algo ali, a anotação continua visível e com contexto
 *
 * Nada é escrito antes de uma cópia de segurança timestampada.
 *
 * ================================================================
 * ESTADO: EXPERIMENTAL — SO `--seco` E CONFIAVEL HOJE (08/10/2026)
 * ================================================================
 * A atualizacao em-lugar (ATUALIZAR) funciona e foi conferida: no teste real,
 * 7 pares do engasgo foram casados corretamente e 0 conflitos falsos.
 *
 * O que NAO esta confiavel: INSERIR e REMOVER. No mesmo teste o script
 * reportou 54 insercoes e 70 remocoes num documento de 172 codigos — churn,
 * nao mudanca real. A causa e o pareamento dentro de `primeiros_socorros_pets.js`,
 * cuja estrutura ({ titulo, descricao } dentro de arrays) produz um bloco por
 * entrada e confunde a derivacao do indice do item.
 *
 * Enquanto isso nao estiver resolvido, use `--seco` para LER o que mudou e
 * aplique a mao, ou peca autorizacao e regere. Escrever com este script hoje
 * pode mexer em paragrafos que nao devia.
 *
 * A protecao que de facto impede a perda esta no gerador: ele recusa
 * sobrescrever ficheiro que o git ve como modificado, e faz copia antes de
 * qualquer escrita.
 *
 * Uso:
 *   node scripts/atualizar_revisao_conteudo.js <documento.docx> --manifesto <ref|caminho>
 *   node scripts/atualizar_revisao_conteudo.js <documento.docx> --manifesto 2b593e9 --seco
 *
 * `--seco` mostra o que faria, sem escrever.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execFileSync } = require('child_process');

const { TEMAS, PAPEL_DO_CAMPO } = require('./gerar_revisao_conteudo.js');

const RAIZ = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// ZIP minimo: ler e reescrever um .docx preservando as outras entradas
// ---------------------------------------------------------------------------

/** Lê todas as entradas do ZIP: {nome, dados(descomprimido), metodo, bruto}. */
function lerZip(buffer) {
    const entradas = [];
    let pos = 0;
    while (pos < buffer.length - 4) {
        if (buffer.readUInt32LE(pos) !== 0x04034b50) { pos++; continue; }
        const metodo = buffer.readUInt16LE(pos + 8);
        const tamComp = buffer.readUInt32LE(pos + 18);
        const tamNome = buffer.readUInt16LE(pos + 26);
        const tamExtra = buffer.readUInt16LE(pos + 28);
        const nome = buffer.toString('utf8', pos + 30, pos + 30 + tamNome);
        const inicio = pos + 30 + tamNome + tamExtra;
        const comp = buffer.subarray(inicio, inicio + tamComp);
        entradas.push({
            nome,
            metodo,
            dados: metodo === 0 ? comp : zlib.inflateRawSync(comp),
        });
        pos = inicio + tamComp;
    }
    return entradas;
}

const crc32Tabela = (() => {
    const t = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[i] = c;
    }
    return t;
})();

function crc32(buf) {
    let c = -1;
    for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ crc32Tabela[(c ^ buf[i]) & 0xff];
    return (c ^ -1) >>> 0;
}

/** Reescreve o ZIP com as mesmas entradas, na mesma ordem. */
function escreverZip(entradas) {
    const locais = [];
    const centrais = [];
    let offset = 0;
    for (const e of entradas) {
        const nome = Buffer.from(e.nome, 'utf8');
        const comp = zlib.deflateRawSync(e.dados, { level: 9 });
        const crc = crc32(e.dados);

        const local = Buffer.alloc(30);
        local.writeUInt32LE(0x04034b50, 0);
        local.writeUInt16LE(20, 4);      // versao
        local.writeUInt16LE(0, 6);       // flags
        local.writeUInt16LE(8, 8);       // deflate
        local.writeUInt32LE(0, 10);      // data/hora
        local.writeUInt32LE(crc, 14);
        local.writeUInt32LE(comp.length, 18);
        local.writeUInt32LE(e.dados.length, 22);
        local.writeUInt16LE(nome.length, 26);
        local.writeUInt16LE(0, 28);
        locais.push(local, nome, comp);

        const central = Buffer.alloc(46);
        central.writeUInt32LE(0x02014b50, 0);
        central.writeUInt16LE(20, 4);
        central.writeUInt16LE(20, 6);
        central.writeUInt16LE(0, 8);
        central.writeUInt16LE(8, 10);
        central.writeUInt32LE(0, 12);
        central.writeUInt32LE(crc, 16);
        central.writeUInt32LE(comp.length, 20);
        central.writeUInt32LE(e.dados.length, 24);
        central.writeUInt16LE(nome.length, 28);
        central.writeUInt16LE(0, 30);
        central.writeUInt16LE(0, 32);
        central.writeUInt16LE(0, 34);
        central.writeUInt16LE(0, 36);
        central.writeUInt32LE(0, 38);
        central.writeUInt32LE(offset, 42);
        centrais.push(central, nome);

        offset += 30 + nome.length + comp.length;
    }
    const corpo = Buffer.concat(locais);
    const diretorio = Buffer.concat(centrais);
    const fim = Buffer.alloc(22);
    fim.writeUInt32LE(0x06054b50, 0);
    fim.writeUInt16LE(entradas.length, 8);
    fim.writeUInt16LE(entradas.length, 10);
    fim.writeUInt32LE(diretorio.length, 12);
    fim.writeUInt32LE(corpo.length, 16);
    return Buffer.concat([corpo, diretorio, fim]);
}

// ---------------------------------------------------------------------------
// XML: parágrafos e texto
// ---------------------------------------------------------------------------

const DESESCAPA = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };
const escapar = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const RX_PSTYLE_SUMARIO = /<w:pStyle\s+w:val="(?:TOC|Sum[^"]*)\d[^"]*"/i;

/** Fatia o document.xml em parágrafos, com posição e texto. */
function fatiarParagrafos(xml) {
    const out = [];
    const RX = /<w:p(?:\s[^>]*)?>[\s\S]*?<\/w:p>|<w:p(?:\s[^>]*)?\/>/g;
    let m;
    while ((m = RX.exec(xml)) !== null) {
        const bruto = m[0];
        const sumario = bruto.includes('w:anchor="_Toc') || RX_PSTYLE_SUMARIO.test(bruto);
        let texto = '';
        if (!sumario) {
            const semCampos = bruto.replace(/<w:instrText[\s\S]*?<\/w:instrText>/g, '');
            const RXN = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\s*\/>|<w:br\s*\/>/g;
            let n;
            while ((n = RXN.exec(semCampos)) !== null) {
                if (n[0].startsWith('<w:tab')) { texto += ' '; continue; }
                if (n[0].startsWith('<w:br')) { texto += '\n'; continue; }
                texto += n[1].replace(/&(amp|lt|gt|quot|apos);/g, (s) => DESESCAPA[s]);
            }
        }
        out.push({ inicio: m.index, fim: m.index + bruto.length, bruto, texto, sumario });
    }
    return out;
}

const RX_CODIGO = /^\s*([A-Z]{2}-\d{4}[a-z]?)\b[\s ]*([\s\S]*)$/;

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
        .join('\n').trim();
}

/** Monta o XML de um parágrafo de texto, igual ao do gerador. */
function xmlParagrafo(codigo, texto, riscado) {
    const marcador = '<w:r><w:rPr><w:rFonts w:ascii="Consolas" w:cs="Consolas" '
        + 'w:eastAsia="Consolas" w:hAnsi="Consolas"/><w:color w:val="9AA0A6"/>'
        + '<w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr>'
        + `<w:t xml:space="preserve">${escapar(codigo)}  </w:t></w:r>`;
    const extra = riscado ? '<w:strike/><w:color w:val="9AA0A6"/>' : '';
    const linhas = String(texto).split('\n');
    const corpo = linhas.map((linha, i) => (
        `<w:r><w:rPr>${extra}<w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>`
        + (i > 0 ? '<w:br/>' : '')
        + `<w:t xml:space="preserve">${escapar(linha)}</w:t></w:r>`
    )).join('');
    return '<w:p><w:pPr><w:spacing w:after="160" w:line="300"/></w:pPr>'
        + marcador + corpo + '</w:p>';
}

// ---------------------------------------------------------------------------
// Conteúdo atual do código, pelo mesmo caminho do gerador
// ---------------------------------------------------------------------------

/**
 * Chave de agrupamento. O código é posicional e desloca quando o conteúdo
 * muda, então o pareamento é feito por (ficheiro, item, campo) — que é
 * estável — e dentro do grupo pela ordem.
 */
const grupoDe = (v) => `${v.arquivo}\u0000${v.indiceItem}\u0000${v.chave}`;

/**
 * NOTA SOBRE A CHAVE: o item NAO entra nela, e isto foi aprendido no primeiro
 * teste real. A correcao do engasgo mudou tambem o TITULO do item — "Engasgo
 * (Adulto/Crianca)" passou a "Engasgo (Adulto e Crianca acima de 1 ano)". Com
 * o titulo na chave, o grupo antigo deixava de existir: os 19 textos do
 * engasgo saiam todos como REMOVIDOS e os novos como grupo novo, que o script
 * ignora. Na pratica, apagaria a seccao e nao poria nada no lugar. O item e
 * conteudo editavel, logo nao serve de identidade.
 */

/**
 * Semelhanca entre dois textos, por sobreposicao de palavras (coeficiente de
 * Dice). O pareamento nao pode ser posicional: um passo acrescentado no meio
 * de uma lista desloca tudo abaixo e cada texto pareceria ter mudado. Casar
 * por conteudo encontra "este texto virou aquele" apesar das insercoes.
 */
function semelhanca(a, b) {
    const palavras = (t) => new Set(
        normalizar(t).toLowerCase()
            .replace(/[^a-z0-9À-ɏ\s]/g, ' ')
            .split(/\s+/)
            .filter((w) => w.length > 2),
    );
    const A = palavras(a);
    const Bs = palavras(b);
    if (!A.size || !Bs.size) return 0;
    let comum = 0;
    for (const w of A) if (Bs.has(w)) comum++;
    return (2 * comum) / (A.size + Bs.size);
}

/** Abaixo disto sao textos diferentes, nao a evolucao de um deles. */
const LIMIAR_PAREAMENTO = 0.34;

/** Pareia antigos com novos, melhor par primeiro. */
function parear(antigos, novos) {
    const candidatos = [];
    antigos.forEach((a, i) => novos.forEach((n, j) => {
        const sim = normalizar(a.original) === normalizar(n) ? 1 : semelhanca(a.original, n);
        if (sim >= LIMIAR_PAREAMENTO) candidatos.push({ i, j, sim });
    }));
    candidatos.sort((x, y) => y.sim - x.sim);
    const usadoA = new Set();
    const usadoN = new Set();
    const pares = [];
    for (const c of candidatos) {
        if (usadoA.has(c.i) || usadoN.has(c.j)) continue;
        usadoA.add(c.i); usadoN.add(c.j);
        pares.push({ antigo: antigos[c.i], novo: novos[c.j], sim: c.sim });
    }
    return {
        pares,
        orfaosAntigos: antigos.filter((_, i) => !usadoA.has(i)),
        orfaosNovos: novos.filter((_, j) => !usadoN.has(j)),
    };
}

function conteudoAtual() {
    // Reusa a extração do gerador, chamando-o em memória.
    const gerador = require('./gerar_revisao_conteudo.js');
    const porGrupo = new Map();
    for (const tema of (gerador.TEMAS || TEMAS)) {
        for (const fonte of tema.fontes) {
            const r = gerador.extrair
                ? gerador.extrair(fonte.arquivo)
                : null;
            if (!r || r.ausente) continue;
            r.blocos.forEach((bloco, indiceItem) => {
                for (const t of bloco.textos) {
                    const chave = grupoDe({ arquivo: fonte.arquivo, indiceItem, chave: t.chave });
                    if (!porGrupo.has(chave)) porGrupo.set(chave, []);
                    porGrupo.get(chave).push(t.texto);
                }
            });
        }
    }
    return porGrupo;
}

function carregarManifesto(ref) {
    if (!ref) {
        return JSON.parse(fs.readFileSync(
            path.join(RAIZ, 'docs/revisao-conteudo/_manifesto.json'), 'utf8'));
    }
    if (fs.existsSync(ref)) return JSON.parse(fs.readFileSync(ref, 'utf8'));
    const saida = execFileSync('git', ['show', `${ref}:docs/revisao-conteudo/_manifesto.json`], {
        cwd: RAIZ, maxBuffer: 64 * 1024 * 1024,
    });
    return JSON.parse(saida.toString('utf8'));
}

// ---------------------------------------------------------------------------
// Principal
// ---------------------------------------------------------------------------

function principal() {
    const args = process.argv.slice(2);
    const docPath = args.find((a) => a.endsWith('.docx'));
    const seco = args.includes('--seco');
    const iRef = args.indexOf('--manifesto');
    if (!docPath) {
        console.error('Uso: node scripts/atualizar_revisao_conteudo.js <doc.docx> --manifesto <ref> [--seco]');
        process.exit(2);
    }
    const abs = path.isAbsolute(docPath) ? docPath : path.join(RAIZ, docPath);
    const manifesto = carregarManifesto(iRef >= 0 ? args[iRef + 1] : null);
    const atual = conteudoAtual();

    const entradas = lerZip(fs.readFileSync(abs));
    const docEntrada = entradas.find((e) => e.nome === 'word/document.xml');
    if (!docEntrada) { console.error('word/document.xml nao encontrado'); process.exit(1); }
    let xml = docEntrada.dados.toString('utf8');

    const paras = fatiarParagrafos(xml);

    // Índice: código -> parágrafo do documento
    const noDoc = new Map();
    for (const p of paras) {
        if (p.sumario) continue;
        const m = RX_CODIGO.exec(p.texto.trim());
        if (m && manifesto[m[1]]) noDoc.set(m[1], { ...p, codigo: m[1], textoCodigo: m[2] });
    }

    // Agrupa os códigos do manifesto na ordem, por (ficheiro, item, campo)
    // O manifesto guarda o TITULO do item, que e conteudo editavel, e a LINHA
    // de origem, que desloca. A identidade estavel e a ORDEM do item dentro do
    // ficheiro: a correcao de um texto nao reordena os itens. Reconstruo esse
    // indice a partir da primeira linha de cada item.
    const indicePorItem = new Map();   // arquivo -> Map(item -> indice)
    for (const v of Object.values(manifesto)) {
        if (!indicePorItem.has(v.arquivo)) indicePorItem.set(v.arquivo, new Map());
        const m = indicePorItem.get(v.arquivo);
        const antes = m.get(v.item);
        if (antes === undefined || v.linha < antes) m.set(v.item, v.linha);
    }
    for (const [arquivo, m] of indicePorItem) {
        const ordenado = [...m.entries()].sort((a, b) => a[1] - b[1]);
        indicePorItem.set(arquivo, new Map(ordenado.map(([item], i) => [item, i])));
    }

    const antigoPorGrupo = new Map();
    for (const [codigo, v] of Object.entries(manifesto)) {
        if (!noDoc.has(codigo)) continue;
        const indiceItem = indicePorItem.get(v.arquivo).get(v.item);
        const g = grupoDe({ ...v, indiceItem });
        if (!antigoPorGrupo.has(g)) antigoPorGrupo.set(g, []);
        antigoPorGrupo.get(g).push({ codigo, original: v.original, meta: v });
    }

    const atualizar = [];   // { codigo, de, para }
    const inserir = [];     // { depoisDe, codigo, texto }
    const remover = [];     // { codigo, texto }
    const conflitos = [];   // { codigo, noDoc, noManifesto, noCodigo }

    for (const [g, antigos] of antigoPorGrupo) {
        const novos = atual.get(g) || [];
        const { pares, orfaosAntigos, orfaosNovos } = parear(antigos, novos);

        for (const { antigo, novo } of pares) {
            const doDoc = normalizar(noDoc.get(antigo.codigo).textoCodigo);
            const doManifesto = normalizar(antigo.original);
            const doCodigo = normalizar(novo);

            if (doCodigo === doManifesto) continue;   // nada mudou no codigo
            if (doDoc !== doManifesto) {              // a pessoa editou aqui
                conflitos.push({
                    codigo: antigo.codigo,
                    noDoc: noDoc.get(antigo.codigo).textoCodigo.trim(),
                    noManifesto: antigo.original,
                    noCodigo: novo,
                });
                continue;
            }
            atualizar.push({ codigo: antigo.codigo, de: antigo.original, para: novo });
        }

        for (const a of orfaosAntigos) remover.push({ codigo: a.codigo, texto: a.original });

        // Texto novo sem par entra depois do ultimo codigo que o documento ja
        // tem neste grupo, com sufixo de letra, para nao renumerar nada do que
        // a pessoa ja leu.
        const ancora = antigos[antigos.length - 1];
        orfaosNovos.forEach((texto, k) => {
            if (!ancora) return;   // grupo inteiramente novo: fica para a regeracao
            inserir.push({
                depoisDe: ancora.codigo,
                codigo: `${ancora.codigo}${String.fromCharCode(97 + k)}`,
                texto,
            });
        });
    }

    // ---- relatório -------------------------------------------------------
    console.log(`\ndocumento : ${path.basename(docPath)}`);
    console.log(`manifesto : ${iRef >= 0 ? args[iRef + 1] : 'atual'}`);
    console.log(`codigos no documento: ${noDoc.size}`);
    console.log(`\nATUALIZAR : ${atualizar.length}`);
    console.log(`INSERIR   : ${inserir.length}`);
    console.log(`REMOVER   : ${remover.length}`);
    console.log(`CONFLITOS : ${conflitos.length}  (editados por humano — nao serao tocados)`);

    for (const u of atualizar) {
        console.log(`\n~ ${u.codigo}`);
        console.log(`  - ${u.de.replace(/\n/g, ' / ').slice(0, 96)}`);
        console.log(`  + ${u.para.replace(/\n/g, ' / ').slice(0, 96)}`);
    }
    for (const i of inserir) console.log(`\n+ ${i.codigo} (apos ${i.depoisDe})\n  ${i.texto.replace(/\n/g, ' / ').slice(0, 96)}`);
    for (const r of remover) console.log(`\n- ${r.codigo}  ${r.texto.replace(/\n/g, ' / ').slice(0, 96)}`);
    for (const c of conflitos) {
        console.log(`\n! ${c.codigo} CONFLITO — voce editou e o codigo tambem mudou`);
        console.log(`  seu texto : ${c.noDoc.replace(/\n/g, ' / ').slice(0, 90)}`);
        console.log(`  no codigo : ${c.noCodigo.replace(/\n/g, ' / ').slice(0, 90)}`);
    }

    if (seco) { console.log('\n--seco: nada escrito.'); return; }
    if (!atualizar.length && !inserir.length && !remover.length) {
        console.log('\nNada a fazer.');
        return;
    }

    // ---- aplicação, de trás para a frente (as posicoes nao deslocam) -----
    const edicoes = [];
    for (const u of atualizar) {
        const p = noDoc.get(u.codigo);
        edicoes.push({ inicio: p.inicio, fim: p.fim, xml: xmlParagrafo(u.codigo, u.para, false) });
    }
    for (const r of remover) {
        const p = noDoc.get(r.codigo);
        edicoes.push({ inicio: p.inicio, fim: p.fim, xml: xmlParagrafo(`${r.codigo} REMOVIDO`, r.texto, true) });
    }
    for (const i of inserir) {
        const p = noDoc.get(i.depoisDe);
        edicoes.push({ inicio: p.fim, fim: p.fim, xml: xmlParagrafo(i.codigo, i.texto, false) });
    }
    edicoes.sort((a, b) => b.inicio - a.inicio);
    for (const e of edicoes) xml = xml.slice(0, e.inicio) + e.xml + xml.slice(e.fim);

    // Cópia de segurança primeiro, sempre.
    const selo = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
    const copia = `${abs}.anterior-${selo}`;
    fs.copyFileSync(abs, copia);

    docEntrada.dados = Buffer.from(xml, 'utf8');
    fs.writeFileSync(abs, escreverZip(entradas));

    console.log(`\nEscrito. Copia do anterior: ${path.basename(copia)}`);
    if (conflitos.length) {
        console.log(`${conflitos.length} conflito(s) NAO foram tocados — resolva a mao.`);
    }
}

principal();
