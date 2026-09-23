/**
 * Descongela a tinta: quando o texto e renderizado por um componente da
 * NeoTypography, basta REMOVER o `color:` preso na paleta clara — o NeoText
 * aplica sozinho a cor do tema (DEFAULT_COLOR_FOR_VARIANT) e, em alto
 * contraste, o preto/branco puro.
 *
 * Um override inline (`style={[s.x, { color: textPrimary }]}`) resolveria o
 * modo escuro mas DESLIGA o alto contraste: o NeoText respeita a cor do caller
 * e deixa de aplicar o #000/#FFF. Por isso a remocao e o caminho certo.
 *
 * Texto em <Text> cru nao tem esse automatismo: fica listado para tratar a mao.
 *
 * Uso: node scripts/auditar_tinta_congelada.js [--aplicar]
 *
 * Sem --aplicar so lista. Com --aplicar remove as cores da lista "REMOVER" e
 * deixa a lista "MANUAL" intacta.
 *
 * LIMITE CONHECIDO: entradas de estilo escritas em UMA linha
 * (`title: { fontWeight: '800' },`) nao casam com o leitor de blocos, e o
 * conteudo delas e atribuido a entrada anterior. Na pratica isso gera um ou
 * outro falso positivo na lista — confira o arquivo antes de acreditar. Cor
 * escrita no meio de uma linha com outras props tambem nao e removida
 * automaticamente; essa vai a mao.
 */
const fs = require('fs');
const path = require('path');
const { carregar, achatar, lum, contraste } = require('./paleta');

const RAIZ = path.join(__dirname, '..');
const APLICAR = process.argv.includes('--aplicar');
const p = carregar(path.join(RAIZ, 'utils/DesignSystem2026.js'));
const L = achatar(p.LightColors);
const D = achatar(p.DarkColors);
const TIPOGRAFIA = ['H1', 'H2', 'H3', 'Display', 'Body', 'Small', 'Caption', 'Eyebrow', 'NeoText', 'BodySmall'];

const resolver = (expr, tabela) =>
    tabela[expr.replace(/^(Neo|DS)\.colors\./, '').replace(/\[\s*'?([A-Za-z0-9]+)'?\s*\]/g, '.$1')];

const arquivos = [];
for (const raiz of ['screens', 'components']) {
    (function anda(d) {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
            const q = path.join(d, e.name);
            if (e.isDirectory()) anda(q);
            else if (e.name.endsWith('.js')) arquivos.push(q);
        }
    })(path.join(RAIZ, raiz));
}

const remover = [];
const manual = [];

for (const f of arquivos) {
    let t = fs.readFileSync(f, 'utf8');
    const iSS = t.indexOf('StyleSheet.create');
    if (iSS < 0 || !/useThemeColors|useIsDark/.test(t)) continue;
    const folha = t.slice(iSS);
    const jsx = t.slice(0, iSS);
    const cortes = [];

    const reEntrada = /^\s{4}([A-Za-z0-9_]+):\s*\{([\s\S]*?)^\s{4}\},/gm;
    let m;
    while ((m = reEntrada.exec(folha))) {
        const nome = m[1], corpo = m[2];
        if (/backgroundColor:/.test(corpo)) continue;
        const mc = /(?:^|[\s{,])color:\s*((?:Neo|DS)\.colors\.[A-Za-z0-9_.[\]']+)/m.exec(corpo);
        if (!mc) continue;
        const hex = resolver(mc[1], L);
        if (!hex || !/^#[0-9a-f]{6}$/i.test(hex) || lum(hex) > 0.35) continue;

        // NAO descongelar tinta escolhida para superficie FIXA:
        //  - textOn.* e a tinta medida sobre o creme, posta de proposito
        //  - arquivo com tile.cream tem card que nao acompanha o tema
        // Nos dois casos, remover a cor faria o NeoText clarear o texto sobre
        // um fundo que continua claro — quebraria o que hoje esta certo.
        if (/textOn\./.test(mc[1])) continue;
        if (/tile\.cream/.test(folha)) continue;

        // quem renderiza esse estilo?
        const reUso = new RegExp('<([A-Za-z][A-Za-z0-9_.]*)((?:[^>]|\\n)*?\\bstyle=\\{\\[?[^\\]>]*\\b(?:s|styles)\\.' + nome + '\\b[^\\]>]*\\]?)', 'g');
        const tags = new Set();
        let u, comOverride = 0, semOverride = 0;
        while ((u = reUso.exec(jsx))) {
            tags.add(u[1]);
            if (/color:\s*(?!Neo\.|DS\.)/.test(u[2])) comOverride++; else semOverride++;
        }
        if (!tags.size || !semOverride) continue;

        const soTipografia = [...tags].every((x) => TIPOGRAFIA.includes(x));
        const c = Math.min(contraste(hex, D['neutral.200']), contraste(hex, D['neutral.100']));
        const reg = { f: path.relative(RAIZ, f).replace(/\\/g, '/'), nome, expr: mc[1], hex, c, tags: [...tags] };
        (soTipografia ? remover : manual).push(reg);

        // Guarda o corte e aplica DEPOIS, de tras para frente. Mutar o texto
        // dentro do laco invalidava os offsets seguintes: a primeira remocao
        // de cada arquivo saia certa e as demais cortavam no lugar errado.
        if (soTipografia && APLICAR) {
            const linhaCor = new RegExp('^[ \\t]*color:[ \\t]*' + mc[1].replace(/[.[\]]/g, '\\$&') + ',?[ \\t]*(//[^\\n]*)?\\r?\\n', 'm');
            const inicio = iSS + m.index;
            const trecho = t.slice(inicio, inicio + m[0].length);
            const mm = linhaCor.exec(trecho);
            if (mm) cortes.push({ de: inicio + mm.index, ate: inicio + mm.index + mm[0].length });
        }
    }
    if (APLICAR && cortes.length) {
        let texto = t;
        for (const c of cortes.sort((a, b) => b.de - a.de)) texto = texto.slice(0, c.de) + texto.slice(c.ate);
        fs.writeFileSync(f, texto);
    }
}

const fmt = (l) => l.sort((a, b) => a.c - b.c).map((r) => `${r.c.toFixed(2).padStart(5)}:1  ${r.f}  ${r.nome}  ${r.expr}  <${r.tags.join('/')}>`).join('\n');
console.log(`REMOVER a cor (NeoTypography cuida): ${remover.length}`);
console.log(fmt(remover));
console.log(`\nMANUAL (<Text> cru ou tag mista): ${manual.length}`);
console.log(fmt(manual));
if (APLICAR) console.log('\n>> aplicado.');
