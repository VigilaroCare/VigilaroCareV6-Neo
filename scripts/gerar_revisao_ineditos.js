/**
 * gerar_revisao_ineditos.js — documento so com os textos que o Agnaldo AINDA
 * NAO VIU na forma em que estao no app.
 *
 * Compara o que os 4 documentos de revisao (PS, ED, AE, EX) mostraram com o que
 * o gerador extrai hoje do codigo. Sobra:
 *   - texto que nunca entrou num documento (ex.: template literals, que o
 *     extrator nao lia ate 16/10/2026);
 *   - texto alterado DEPOIS da revisao dele (correcao de protocolo, restauracao
 *     de alerta, erro de digitacao) — ele precisa ver o que mudou.
 *
 * Usa o mesmo layout e o mesmo formato de manifesto do gerador principal, para
 * que `importar_revisao_conteudo.js NV-Textos-Ineditos.docx --manifesto
 * docs/revisao-conteudo/_manifesto-NV.json` leia a revisao de volta.
 *
 * Rode ANTES de regerar os 4 documentos: a comparacao e contra eles.
 *
 * Uso: node scripts/gerar_revisao_ineditos.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execSync } = require('child_process');
const { Packer } = require('docx');
const { TEMAS, extrair, montarDocumento } = require('./gerar_revisao_conteudo');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'docs', 'revisao-conteudo');
const NOME = 'NV-Textos-Ineditos.docx';

function lerDoZip(buffer, alvo) {
    let pos = 0;
    while (pos < buffer.length - 4) {
        if (buffer.readUInt32LE(pos) !== 0x04034b50) { pos++; continue; }
        const metodo = buffer.readUInt16LE(pos + 8);
        const tamComp = buffer.readUInt32LE(pos + 18);
        const tamNome = buffer.readUInt16LE(pos + 26);
        const tamExtra = buffer.readUInt16LE(pos + 28);
        const nome = buffer.toString('utf8', pos + 30, pos + 30 + tamNome);
        const inicio = pos + 30 + tamNome + tamExtra;
        if (nome === alvo) {
            const dados = buffer.subarray(inicio, inicio + tamComp);
            return metodo === 0 ? dados : zlib.inflateRawSync(dados);
        }
        pos = inicio + tamComp;
    }
    return null;
}

const DESESCAPA = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };

// Mesma ideia do importador: desfaz a tipografia do Word antes de comparar.
// O markdown (**) sai porque o app agora o interpreta e o Word nao o mostra igual.
const norm = (s) => String(s)
    .replace(/\r\n?/g, '\n').replace(/[‘’‛]/g, "'").replace(/[“”‟]/g, '"')
    .replace(/…/g, '...').replace(/[–—]/g, '-').replace(/ /g, ' ')
    .replace(/\*\*?/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

function textosDosDocumentos() {
    const vistos = [];
    for (const f of fs.readdirSync(DESTINO).filter((f) => /^(PS|ED|AE|EX)-.*\.docx$/.test(f))) {
        const xml = lerDoZip(fs.readFileSync(path.join(DESTINO, f)), 'word/document.xml').toString('utf8');
        const RX_P = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g;
        let m;
        while ((m = RX_P.exec(xml)) !== null) {
            let t = '';
            const RX_T = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:br\s*\/>/g;
            let n;
            while ((n = RX_T.exec(m[1])) !== null) {
                t += n[0].startsWith('<w:br') ? '\n' : n[1].replace(/&(amp|lt|gt|quot|apos);/g, (x) => DESESCAPA[x]);
            }
            const k = norm(t.replace(/^\s*[A-Z]{2}-\d{4}\b\s*/, ''));
            if (k) vistos.push(k);
        }
    }
    return vistos;
}

async function principal() {
    const destino = path.join(DESTINO, NOME);
    if (fs.existsSync(destino)) {
        const sujo = execSync(`git status --porcelain -- "${destino}"`, { cwd: RAIZ }).toString().trim();
        if (sujo && !process.argv.includes('--forcar')) {
            console.error(`${NOME} tem alteracoes nao commitadas (revisao em andamento?). Nada escrito.`);
            process.exit(1);
        }
        const selo = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
        fs.copyFileSync(destino, `${destino}.anterior-${selo}`);
    }

    const vistos = textosDosDocumentos();
    const exatos = new Set(vistos);
    const tudo = vistos.join(' \u0001 ');
    const foiVisto = (texto) => { const k = norm(texto); return !k || exatos.has(k) || tudo.includes(k); };

    // Manifesto dos 4 documentos: separa "alterado depois da revisao" de "inedito".
    let manifestoRevisado = {};
    try { manifestoRevisado = JSON.parse(fs.readFileSync(path.join(DESTINO, '_manifesto.json'), 'utf8')); } catch { /* sem manifesto */ }
    const conhecido = new Set(Object.values(manifestoRevisado).map((e) => `${e.arquivo}|${e.item}|${e.chave}`));

    const dados = [];
    let alterados = 0;
    let ineditos = 0;
    for (const tema of TEMAS) {
        for (const fonte of tema.fontes) {
            const r = extrair(fonte.arquivo);
            if (r.ausente) continue;
            const blocos = r.blocos
                .map((b) => ({ item: b.item, textos: b.textos.filter((t) => !foiVisto(t.texto)) }))
                .filter((b) => b.textos.length);
            if (!blocos.length) continue;
            blocos.forEach((b) => b.textos.forEach((t) => {
                if (conhecido.has(`${fonte.arquivo}|${b.item}|${t.chave}`)) alterados++; else ineditos++;
            }));
            dados.push({ ...fonte, rotulo: `${tema.sigla} · ${fonte.rotulo}`, blocos });
        }
    }

    const tema = {
        nome: 'Textos que voce ainda nao viu',
        sigla: 'NV',
        descricao: `Textos do app que nao passaram pela sua revisao na forma em que estao hoje: `
            + `${ineditos} nunca entraram nos documentos anteriores e ${alterados} foram alterados `
            + `depois da sua revisao (correcao de protocolo, alerta restaurado, erro de digitacao, `
            + `adequacao por pais). Revise como nos outros documentos.`,
    };
    const manifesto = {};
    const doc = montarDocumento(tema, dados, manifesto);
    fs.writeFileSync(destino, await Packer.toBuffer(doc));
    fs.writeFileSync(path.join(DESTINO, '_manifesto-NV.json'), JSON.stringify(manifesto, null, 1));
    console.log(`${NOME}: ${Object.keys(manifesto).length} textos (${ineditos} ineditos, ${alterados} alterados depois da revisao)`);
}

principal().catch((e) => { console.error(e); process.exit(1); });
