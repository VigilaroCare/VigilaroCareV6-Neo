/**
 * sincronizar_traducoes.js
 *
 * Depois de uma rodada de revisão do pt-BR, descobre QUAIS campos mudaram e
 * mostra, para cada um, o texto novo em pt-BR ao lado das traduções atuais —
 * e depois grava as traduções novas exatamente no mesmo campo de cada idioma.
 *
 * POR QUE EXISTE (16/10/2026)
 * A revisão do Agnaldo mudou 387 textos em pt-BR. As traduções (en, es, pt-PT)
 * ficaram descrevendo o texto ANTIGO. Num app de primeiros socorros isso não é
 * detalhe: o inglês continuaria a ensinar o que o português já corrigiu.
 *
 * Encontrar "a mesma frase" nos outros idiomas pelo texto é impossível — o
 * texto é justamente o que muda. A identidade é ESTRUTURAL: id do item, nome do
 * campo, posição na lista. O script percorre a árvore do pt-BR de antes e de
 * depois em paralelo e aponta o caminho de cada campo que mudou.
 *
 * DOIS MECANISMOS DE TRADUÇÃO no projeto, ambos suportados:
 *   - ficheiro por idioma: data/locales/pt-BR/X.js  ->  data/locales/en/X.js ...
 *   - sufixo no mesmo ficheiro: { texto, texto_en, texto_es, texto_ptpt }
 *
 * Uso:
 *   node scripts/sincronizar_traducoes.js listar  <ficheiro-pt> <ref-base>   > trabalho.json
 *   node scripts/sincronizar_traducoes.js aplicar <traducoes.json>
 *   node scripts/sincronizar_traducoes.js faltando <ficheiro-pt>              > trabalho.json   (D21: tudo sem tradução)
 *
 * `listar` não escreve nada. `aplicar` substitui só os trechos de código de
 * cada campo apontado, de trás para a frente, e confere o parse no fim.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const parser = require('@babel/parser');

const RAIZ = path.resolve(__dirname, '..');
const IDIOMAS_FICHEIRO = ['en', 'es', 'pt-PT'];
const SUFIXOS = { en: '_en', es: '_es', 'pt-PT': '_ptpt' };

// ---------------------------------------------------------------------------
// AST -> árvore com posições
// ---------------------------------------------------------------------------

/** Converte um nó em { v, ini, fim, tipo } recursivo. Só literais. */
function noParaValor(n) {
    if (!n) return null;
    switch (n.type) {
        case 'StringLiteral':
            return { tipo: 'str', v: n.value, ini: n.start, fim: n.end };
        case 'TemplateLiteral':
            if (n.expressions.length) return null;
            return { tipo: 'str', v: n.quasis.map((q) => q.value.cooked).join(''), ini: n.start, fim: n.end, tpl: true };
        case 'ArrayExpression':
            return { tipo: 'arr', v: n.elements.map(noParaValor), ini: n.start, fim: n.end };
        case 'ObjectExpression': {
            const o = {};
            for (const p of n.properties) {
                if (p.type !== 'ObjectProperty') continue;
                const k = p.key.name || p.key.value;
                o[k] = noParaValor(p.value);
            }
            return { tipo: 'obj', v: o, ini: n.start, fim: n.end };
        }
        default:
            return null;
    }
}

/**
 * TODAS as exportacoes de array/objeto, como um objeto { nomeExportado: valor }.
 *
 * A primeira versao lia so a primeira exportacao — e micro_blog.js,
 * riscos_fisicos.js e outros exportam varias (categorias, artigos, ...). A
 * edicao do Agnaldo no micro_blog ficava numa exportacao que o script nem
 * olhava: "0 campos mudaram", sem erro.
 *
 * A chave e a POSICAO da exportacao (@0, @1...), nao o nome: nos ficheiros por
 * idioma cada um nomeia a sua (primeirosSocorrosPTBR, primeirosSocorrosEN), mas
 * a ordem e a mesma nos quatro.
 */
function raizExportada(fonte) {
    const ast = parser.parse(fonte, { sourceType: 'module', plugins: ['jsx'] });
    const raiz = { tipo: 'obj', v: {}, ini: 0, fim: fonte.length };
    let n = 0;
    for (const st of ast.program.body) {
        if (st.type === 'ExportNamedDeclaration' && st.declaration && st.declaration.type === 'VariableDeclaration') {
            for (const dec of st.declaration.declarations) {
                const v = noParaValor(dec.init);
                if (v && (v.tipo === 'arr' || v.tipo === 'obj')) raiz.v[`@${n++}`] = v;
            }
        } else if (st.type === 'ExportDefaultDeclaration') {
            const v = noParaValor(st.declaration);
            if (v && (v.tipo === 'arr' || v.tipo === 'obj')) raiz.v[`@${n++}`] = v;
        }
    }
    if (!Object.keys(raiz.v).length) throw new Error('nenhum array/objeto exportado');
    return raiz;
}

const lerGit = (ref, rel) => execFileSync('git', ['show', `${ref}:${rel}`], { cwd: RAIZ, maxBuffer: 64 << 20 }).toString('utf8');

// ---------------------------------------------------------------------------
// Caminho estrutural
// ---------------------------------------------------------------------------

/** Chave de um elemento de lista: o id, se houver; senão a posição. */
const chaveDe = (el, i) => (el && el.tipo === 'obj' && el.v.id && el.v.id.tipo === 'str' ? `#${el.v.id.v}` : `[${i}]`);

function resolver(no, caminho) {
    let atual = no;
    for (const passo of caminho) {
        if (!atual) return null;
        if (atual.tipo === 'arr') {
            if (passo.startsWith('#')) {
                atual = atual.v.find((el) => el && el.tipo === 'obj' && el.v.id && el.v.id.v === passo.slice(1));
            } else {
                atual = atual.v[Number(passo.slice(1, -1))];
            }
        } else if (atual.tipo === 'obj') {
            atual = atual.v[passo];
        } else {
            return null;
        }
    }
    return atual || null;
}

const SUFIXO_RX = /_(en|es|ptpt|pt_pt|ptPT)$/i;
const IGNORAR = new Set(['id', 'icon', 'icone', 'emoji', 'cor', 'color', 'corFundo', 'imagem', 'imagemUrl', 'image',
    'frequencia', 'tipo', 'tags', 'categoria', 'key', 'route', 'tela', 'gradient']);
const textual = (s) => /[A-Za-zÀ-ÿ]{2}/.test(s);

/**
 * Percorre depois x antes. Um array de STRINGS que mudou volta inteiro, porque
 * a revisão pode ter acrescentado ou tirado itens e as posições deixam de casar.
 */
function diferencas(depois, antes, caminho, out) {
    if (!depois) return;
    if (depois.tipo === 'str') {
        if (!antes || antes.v !== depois.v) {
            if (textual(depois.v)) out.push({ caminho, tipo: 'str', pt: depois.v, ptAntes: antes ? antes.v : null });
        }
        return;
    }
    if (depois.tipo === 'arr') {
        const soStrings = depois.v.every((e) => e && e.tipo === 'str');
        if (soStrings) {
            const a = depois.v.map((e) => e.v);
            const b = antes && antes.tipo === 'arr' ? antes.v.map((e) => (e ? e.v : null)) : [];
            if (JSON.stringify(a) !== JSON.stringify(b) && a.some(textual)) {
                out.push({ caminho, tipo: 'arr', pt: a, ptAntes: b });
            }
            return;
        }
        depois.v.forEach((el, i) => {
            const k = chaveDe(el, i);
            diferencas(el, antes ? resolver(antes, [k]) : null, [...caminho, k], out);
        });
        return;
    }
    if (depois.tipo === 'obj') {
        for (const [k, v] of Object.entries(depois.v)) {
            if (IGNORAR.has(k) || SUFIXO_RX.test(k)) continue;
            diferencas(v, antes && antes.tipo === 'obj' ? antes.v[k] : null, [...caminho, k], out);
        }
    }
}

// ---------------------------------------------------------------------------
// listar
// ---------------------------------------------------------------------------

const _sufixosUsados = {};
function fonteUsaSufixo(abs, suf) {
    const k = abs + suf;
    if (!(k in _sufixosUsados)) _sufixosUsados[k] = new RegExp('\\w' + suf + '\\s*:').test(fs.readFileSync(abs, 'utf8'));
    return _sufixosUsados[k];
}

function listar(relPt, ref) {
    const absPt = path.join(RAIZ, relPt);
    const depois = raizExportada(fs.readFileSync(absPt, 'utf8'));
    const antes = raizExportada(lerGit(ref, relPt));
    const mudancas = [];
    diferencas(depois, antes, [], mudancas);

    const porIdioma = relPt.includes('/locales/pt-BR/');
    const trabalho = [];
    for (const m of mudancas) {
        const item = { ficheiro: relPt, caminho: m.caminho, tipo: m.tipo, pt: m.pt, ptAntes: m.ptAntes, atual: {} };
        for (const lang of IDIOMAS_FICHEIRO) {
            if (porIdioma) {
                const rel = relPt.replace('/pt-BR/', `/${lang}/`);
                if (!fs.existsSync(path.join(RAIZ, rel))) continue;
                const no = resolver(raizExportada(fs.readFileSync(path.join(RAIZ, rel), 'utf8')), m.caminho);
                item.atual[lang] = no ? (no.tipo === 'arr' ? no.v.map((e) => e && e.v) : no.v) : null;
            } else {
                const campo = m.caminho[m.caminho.length - 1];
                const pai = resolver(depois, m.caminho.slice(0, -1));
                const irmao = pai && pai.tipo === 'obj' ? pai.v[campo + SUFIXOS[lang]] : null;
                if (irmao === undefined) {
                    // Campo nunca traduzido: nao ha onde trocar, mas da para CRIAR
                    // o _en/_es ao lado do pt-BR — so nos idiomas que o ficheiro ja usa.
                    if (!fonteUsaSufixo(absPt, SUFIXOS[lang])) continue;
                    item.criar = item.criar || {};
                    item.criar[lang] = true;
                    item.atual[lang] = null;
                    continue;
                }
                item.atual[lang] = irmao ? (irmao.tipo === 'arr' ? irmao.v.map((e) => e && e.v) : irmao.v) : null;
            }
        }
        trabalho.push(item);
    }
    process.stdout.write(JSON.stringify(trabalho, null, 1));
}

// ---------------------------------------------------------------------------
// faltando (D21, 19/10/2026)
// ---------------------------------------------------------------------------

/**
 * Lista TODO campo de texto que ainda não tem tradução (sem `_en`/`_es` ao
 * lado), num ficheiro de sufixo. Serve para ficheiros que nunca foram
 * traduzidos — `listar` só vê o que mudou entre duas versões e só cria sufixo
 * em ficheiro que já usa sufixo. A saída tem o mesmo formato de `listar`
 * (com `criar` marcado), então `aplicar` grava sem mudança nenhuma.
 *
 * pt-PT vai marcado para criar, mas só é gravado se a tradução trouxer
 * `pt-PT` (a maioria dos campos cai no pt-BR, de propósito).
 */
const IGNORAR_CONTEUDO = new Set(['gravidade', 'nivelRisco', 'perfilRisco', 'corRisco', 'severidade', 'publico',
    'ambientes', 'rota', 'screen', 'iconName', 'nome_id', 'slug', 'categoryId', 'imagemUrl', 'url', 'link',
    'iconColor', 'bg', 'corTexto', 'corIcone', 'grupo']);

function faltando(relPt) {
    if (relPt.includes('/locales/')) throw new Error('faltando é só para ficheiros de sufixo (data/*.js)');
    const raiz = raizExportada(fs.readFileSync(path.join(RAIZ, relPt), 'utf8'));
    const todos = [];
    diferencas(raiz, null, [], todos);
    const trabalho = [];
    for (const m of todos) {
        const campo = m.caminho[m.caminho.length - 1];
        if (campo.startsWith('@') || campo.startsWith('[') || campo.startsWith('#') || IGNORAR_CONTEUDO.has(campo)) continue;
        if (m.tipo === 'str' && /^#[0-9a-f]{3,8}$/i.test(m.pt)) continue; // cor
        const pai = resolver(raiz, m.caminho.slice(0, -1));
        if (!pai || pai.tipo !== 'obj') continue;
        const criar = {};
        for (const lang of IDIOMAS_FICHEIRO) if (!((campo + SUFIXOS[lang]) in pai.v)) criar[lang] = true;
        if (criar.en || criar.es) trabalho.push({ ficheiro: relPt, caminho: m.caminho, tipo: m.tipo, pt: m.pt, criar, traducao: {} });
    }
    process.stdout.write(JSON.stringify(trabalho, null, 1));
}

// ---------------------------------------------------------------------------
// aplicar
// ---------------------------------------------------------------------------

/** Literal JS com a mesma aspa que o código usa: simples, com escapes. */
function literal(s) {
    return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
}

function literalArray(lista, indent) {
    const pad = ' '.repeat(indent);
    return '[\n' + lista.map((s) => `${pad}    ${literal(s)},`).join('\n') + `\n${pad}]`;
}

function aplicar(caminhoJson) {
    const traducoes = JSON.parse(fs.readFileSync(caminhoJson, 'utf8'));
    // ficheiro destino -> lista de { ini, fim, texto }
    const edicoes = {};
    const falhas = [];
    const push = (rel, e) => (edicoes[rel] = edicoes[rel] || []).push(e);

    for (const t of traducoes) {
        const porIdioma = t.ficheiro.includes('/locales/pt-BR/');
        for (const [lang, novo] of Object.entries(t.traducao || {})) {
            if (novo == null) continue;
            let rel; let no;
            if (porIdioma) {
                rel = t.ficheiro.replace('/pt-BR/', `/${lang}/`);
                no = resolver(raizExportada(fs.readFileSync(path.join(RAIZ, rel), 'utf8')), t.caminho);
            } else {
                rel = t.ficheiro;
                const raiz = raizExportada(fs.readFileSync(path.join(RAIZ, rel), 'utf8'));
                const campo = t.caminho[t.caminho.length - 1];
                const pai = resolver(raiz, t.caminho.slice(0, -1));
                no = pai && pai.tipo === 'obj' ? pai.v[campo + SUFIXOS[lang]] : null;
            }
            if (!no && !porIdioma && t.criar && t.criar[lang]) {
                // Cria `campo_en: ...` logo depois do valor pt-BR, na mesma linha.
                const raiz = raizExportada(fs.readFileSync(path.join(RAIZ, rel), 'utf8'));
                const pt = resolver(raiz, t.caminho);
                if (!pt) { falhas.push(`${rel} ${t.caminho.join('.')}: campo pt-BR sumiu`); continue; }
                const fonteC = fs.readFileSync(path.join(RAIZ, rel), 'utf8');
                const iniLinha = fonteC.lastIndexOf('\n', pt.ini) + 1;
                const indentC = fonteC.slice(iniLinha, pt.ini).match(/^\s*/)[0].length;
                const campo = t.caminho[t.caminho.length - 1];
                const valor = Array.isArray(novo) ? literalArray(novo, indentC) : literal(novo);
                push(rel, { ini: pt.fim, fim: pt.fim, texto: `, ${campo}${SUFIXOS[lang]}: ${valor}` });
                continue;
            }
            if (!no) { falhas.push(`${rel} ${t.caminho.join('.')} (${lang}): campo nao existe`); continue; }
            const fonte = fs.readFileSync(path.join(RAIZ, rel), 'utf8');
            const linhaIni = fonte.lastIndexOf('\n', no.ini) + 1;
            const indent = fonte.slice(linhaIni, no.ini).match(/^\s*/)[0].length;
            const texto = Array.isArray(novo) ? literalArray(novo, indent) : literal(novo);
            push(rel, { ini: no.ini, fim: no.fim, texto });
        }
    }

    for (const [rel, lista] of Object.entries(edicoes)) {
        const abs = path.join(RAIZ, rel);
        let fonte = fs.readFileSync(abs, 'utf8');
        lista.sort((a, b) => b.ini - a.ini);
        for (let i = 1; i < lista.length; i++) {
            if (lista[i].fim > lista[i - 1].ini) throw new Error(`${rel}: edicoes sobrepostas`);
        }
        for (const e of lista) fonte = fonte.slice(0, e.ini) + e.texto + fonte.slice(e.fim);
        parser.parse(fonte, { sourceType: 'module', plugins: ['jsx'] });   // aborta se quebrar
        fs.writeFileSync(abs, fonte, 'utf8');
        console.log(`  ${rel.padEnd(48)} ${lista.length} campo(s)`);
    }
    if (falhas.length) {
        console.log('\nNAO APLICADO:');
        falhas.forEach((f) => console.log('  ' + f));
        process.exitCode = 1;
    }
}

// ---------------------------------------------------------------------------

const [, , cmd, a, b] = process.argv;
if (cmd === 'listar') listar(a, b);
else if (cmd === 'faltando') faltando(a);
else if (cmd === 'aplicar') aplicar(a);
else {
    console.error('Uso: listar <ficheiro-pt> <ref-base> | faltando <ficheiro-pt> | aplicar <traducoes.json>');
    process.exit(2);
}
