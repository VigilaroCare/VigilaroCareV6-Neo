/**
 * extrair_texto_fixo.js — D20: tira das telas o texto escrito direto no JSX
 * (que aparecia em português em qualquer idioma) e o põe nos arquivos de
 * tradução, sob `telas.<Tela>.<chave>`.
 *
 *   node scripts/extrair_texto_fixo.js --listar   lista o que encontraria
 *   node scripts/extrair_texto_fixo.js --aplicar <traducoes.json>
 *        aplica: troca o texto por t('telas...', 'texto') — ou tx(...) onde
 *        não há `t` em escopo — e grava pt-BR/pt-PT/en/es nos common.json.
 *        <traducoes.json>: { "<chave>": { "en": "...", "es": "...", "ptpt"?: "..." } }
 *
 * Regras:
 *  - Só JSXText com letras (não mexe em emoji solto, números, símbolos).
 *  - Espaço em volta segue a regra do JSX (linha quebrada some; espaço na
 *    mesma linha fica dentro da string), para "Para: {nome}" não colar.
 *  - Texto de marca ("SOS", "Vigilaro Care") também vai: em outro idioma
 *    pode ficar igual, mas a decisão passa a ser do arquivo de tradução.
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const RAIZ = path.resolve(__dirname, '..');
const DIRS = ['screens', 'components'];

function arquivos(dir, out = []) {
    for (const e of fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true })) {
        const rel = path.join(dir, e.name).split(path.sep).join('/');
        if (e.isDirectory()) arquivos(rel, out);
        else if (/\.js$/.test(e.name)) out.push(rel);
    }
    return out;
}

/** Texto como o JSX o renderiza (mesma regra do Babel). */
function textoJSX(raw) {
    const linhas = raw.split(/\r\n|\n|\r/);
    let ultimaNaoVazia = 0;
    linhas.forEach((l, i) => { if (/[^ \t]/.test(l)) ultimaNaoVazia = i; });
    let s = '';
    linhas.forEach((linha, i) => {
        const primeira = i === 0, ultima = i === linhas.length - 1;
        let t = linha.replace(/\t/g, ' ');
        if (!primeira) t = t.replace(/^[ ]+/, '');
        if (!ultima) t = t.replace(/[ ]+$/, '');
        if (t) { if (i !== ultimaNaoVazia) t += ' '; s += t; }
    });
    return s;
}

const slug = (s) => {
    const base = s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 ]+/g, ' ').trim()
        .split(/\s+/).slice(0, 6).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join('');
    return base.slice(0, 40) || 'texto';
};

// Literais: só os que são português (o código também tem ids, rotas, chaves).
const PT = /[ãõçáéíóúâêôàÁÉÍÓÚÂÊÔÃÕÇ]|\b(de|do|da|dos|das|para|com|não|você|seu|sua|uma|em|no|na|os|as|ao|pelo|pela|Salvar|Cancelar|Editar|Excluir|Remover|Voltar|Fechar|Ligar|Buscar|Erro|Sucesso|Sim|Confirmar|Continuar|Concluir|Entendi|Enviar|Copiar|Compartilhar|Adicionar|Selecionar|Carregando|Aviso|Nome|Telefone|Idade|Pronto|Visitar|Morador|Visitante|Residente)\b/;
const TEXT_PROPS = new Set(['placeholder', 'title', 'label', 'accessibilityLabel', 'accessibilityHint', 'subtitle', 'description',
    'text', 'headerTitle', 'emptyText', 'buttonText', 'message', 'hint', 'caption', 'confirmText', 'cancelText', 'actionLabel', 'badge']);
const NAO_TRADUZ = new Set(['t', 'tx', 't_field', 't_array', 't_object', 'require', 'navigate', 'push', 'replace', 'getItem', 'setItem',
    'removeItem', 'log', 'warn', 'error', 'includes', 'startsWith', 'endsWith', 'indexOf', 'split', 'join', 'find', 'filter', 'getParam', 'resolveEmergencyTokens']);

function textoDe(node) {
    if (node.type === 'StringLiteral') return node.value;
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis.map((q) => q.value.cooked).join('');
    return null;
}

/** O literal está num lugar que vira texto na tela? (filho de JSX, atributo de texto, ternário/lógico dentro deles) */
function contextoDeTela(p) {
    let q = p.parentPath;
    while (q) {
        const n = q.node;
        if (q.isCallExpression()) {
            const c = n.callee; const nome = c.name || (c.property && c.property.name);
            if (NAO_TRADUZ.has(nome)) return null;
            return null; // argumento de outra função: decide quem chama, não aqui
        }
        if (q.isBinaryExpression() || q.isSwitchCase() || q.isObjectProperty() || q.isMemberExpression() || q.isImportDeclaration()) return null;
        if (q.isJSXAttribute()) return TEXT_PROPS.has(n.name.name) ? 'attrExpr' : null;
        if (q.isJSXExpressionContainer()) {
            return q.parentPath.isJSXAttribute() ? (TEXT_PROPS.has(q.parentPath.node.name.name) ? 'expr' : null) : 'expr';
        }
        if (!(q.isConditionalExpression() || q.isLogicalExpression() || q.isTemplateLiteral())) return null;
        q = q.parentPath;
    }
    return null;
}

function coletar() {
    const achados = [];
    const todos = DIRS.flatMap((d) => arquivos(d));
    for (const rel of todos) {
        const src = fs.readFileSync(path.join(RAIZ, rel), 'utf8');
        let ast;
        try { ast = parser.parse(src, { sourceType: 'module', plugins: ['jsx'] }); } catch { continue; }
        const tela = path.basename(rel, '.js');
        const usadas = new Set();
        const add = (p, node, texto, forma) => {
            let k = slug(texto); let n = 2;
            while (usadas.has(k)) k = slug(texto) + n++;
            usadas.add(k);
            achados.push({ rel, tela, chave: `telas.${tela}.${k}`, texto, forma, ini: node.start, fim: node.end, temT: p.scope.hasBinding('t') });
        };
        traverse(ast, {
            JSXText(p) {
                const texto = textoJSX(p.node.value);
                if (/[A-Za-zÀ-ú]{2}/.test(texto)) add(p, p.node, texto, 'jsx');
            },
            'StringLiteral|TemplateLiteral'(p) {
                const texto = textoDe(p.node);
                if (texto == null || !/[A-Za-zÀ-ú]{3}/.test(texto) || !PT.test(texto)) return;
                // Atributo de texto com valor literal: placeholder="..."
                if (p.parentPath.isJSXAttribute()) {
                    if (TEXT_PROPS.has(p.parentPath.node.name.name)) add(p, p.node, texto, 'attr');
                    return;
                }
                // Alertas: título, mensagem e rótulo dos botões.
                const call = p.parentPath.isCallExpression() ? p.parentPath : null;
                if (call) {
                    const c = call.node.callee;
                    const ehAlerta = c.type === 'MemberExpression' && ['NeoAlert', 'Alert'].includes(c.object.name) && c.property.name === 'alert';
                    if (ehAlerta && call.node.arguments.indexOf(p.node) <= 1) add(p, p.node, texto, 'expr');
                    return;
                }
                if (p.parentPath.isObjectProperty() && p.parentPath.node.value === p.node
                    && ['text'].includes(p.parentPath.node.key.name)) {
                    const alerta = p.findParent((q) => q.isCallExpression() && q.node.callee.type === 'MemberExpression'
                        && ['NeoAlert', 'Alert'].includes(q.node.callee.object.name));
                    if (alerta) add(p, p.node, texto, 'expr');
                    return;
                }
                const ctx = contextoDeTela(p);
                if (ctx) add(p, p.node, texto, 'expr');
            },
        });
    }
    return achados;
}

function literal(s) { return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n') + "'"; }

function definir(obj, chave, valor) {
    const partes = chave.split('.');
    let o = obj;
    for (const p of partes.slice(0, -1)) { if (typeof o[p] !== 'object' || o[p] === null) o[p] = {}; o = o[p]; }
    o[partes[partes.length - 1]] = valor;
}

function aplicar(traducoes) {
    const achados = coletar();
    const faltando = achados.filter((a) => !traducoes[a.chave] || traducoes[a.chave].en == null || traducoes[a.chave].es == null);
    if (faltando.length) {
        console.error(`${faltando.length} chave(s) sem tradução en/es — nada aplicado:`);
        faltando.slice(0, 20).forEach((a) => console.error('  ', a.chave, '|', a.texto));
        process.exit(1);
    }
    // 1. Telas (de trás para a frente em cada arquivo).
    const porArquivo = {};
    achados.forEach((a) => (porArquivo[a.rel] = porArquivo[a.rel] || []).push(a));
    for (const [rel, lista] of Object.entries(porArquivo)) {
        const abs = path.join(RAIZ, rel);
        let src = fs.readFileSync(abs, 'utf8');
        lista.sort((a, b) => b.ini - a.ini);
        let usaTx = false;
        for (const a of lista) {
            const fn = a.temT ? 't' : 'tx';
            if (!a.temT) usaTx = true;
            const chamada = `${fn}(${literal(a.chave)}, ${literal(a.texto)})`;
            src = src.slice(0, a.ini) + (a.forma === 'expr' ? chamada : `{${chamada}}`) + src.slice(a.fim);
        }
        if (usaTx && !/\bimport\s*\{[^}]*\btx\b[^}]*\}\s*from\s*['"][^'"]*txFixo['"]/.test(src)) {
            const relUtil = path.relative(path.dirname(abs), path.join(RAIZ, 'utils', 'txFixo')).split(path.sep).join('/');
            const imp = `import { tx } from '${relUtil.startsWith('.') ? relUtil : './' + relUtil}';\n`;
            const m = src.match(/^(?:\s*(?:\/\*[\s\S]*?\*\/|\/\/[^\n]*))*\s*/);
            src = src.slice(0, m[0].length) + imp + src.slice(m[0].length);
        }
        parser.parse(src, { sourceType: 'module', plugins: ['jsx'] });
        fs.writeFileSync(abs, src);
    }
    // 2. Arquivos de tradução.
    const L = { 'pt-BR': (a) => a.texto, 'pt-PT': (a) => (traducoes[a.chave].ptpt || a.texto), en: (a) => traducoes[a.chave].en, es: (a) => traducoes[a.chave].es };
    for (const [dir, val] of Object.entries(L)) {
        const p = path.join(RAIZ, 'locales', dir, 'common.json');
        const raw = fs.readFileSync(p, 'utf8');
        const crlf = raw.includes('\r\n');
        const j = JSON.parse(raw);
        achados.forEach((a) => definir(j, a.chave, val(a)));
        let out = JSON.stringify(j, null, 4) + '\n';
        if (crlf) out = out.replace(/\n/g, '\r\n');
        fs.writeFileSync(p, out);
    }
    console.log(`${achados.length} textos em ${Object.keys(porArquivo).length} telas`);
}

const [, , modo, arg] = process.argv;
if (modo === '--listar') {
    const a = coletar();
    if (arg) fs.writeFileSync(arg, JSON.stringify(a.map(({ chave, texto, rel, temT, forma }) => ({ chave, texto, rel, temT, forma })), null, 1));
    console.log(`${a.length} textos; ${a.filter((x) => !x.temT).length} sem t em escopo`);
} else if (modo === '--aplicar') {
    aplicar(JSON.parse(fs.readFileSync(arg, 'utf8')));
} else {
    console.log('uso: --listar [saida.json] | --aplicar <traducoes.json>');
}
