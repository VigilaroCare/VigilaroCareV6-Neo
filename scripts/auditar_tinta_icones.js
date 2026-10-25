/**
 * auditar_tinta_icones.js — INVENTARIO de cor de icone presa na paleta estatica.
 *
 * ATENCAO AO QUE ESTE SCRIPT NAO SABE (aprendido errando duas vezes em
 * 23-24/10/2026): ele NAO sabe sobre que superficie cada icone e desenhado.
 * A primeira versao resolvia o token na paleta escura e media contra fundo
 * escuro — diagnostico invertido. A segunda passou a medir o hex real nos dois
 * temas, e entao contou como "critico" todo icone BRANCO dentro de botao
 * colorido, que esta correto. Icone vive sobre card, sobre foto, sobre botao
 * de marca, sobre tela-panico vermelha: sem saber qual, numero de contraste
 * nao decide nada.
 *
 * O que ele sabe, e e util: QUAIS icones usam a paleta ESTATICA (`Neo.colors`/
 * `DS.colors`) em vez de `useThemeColors()`. Esses desenham o MESMO hex nos
 * dois temas, entao nao acompanham o tema por construcao. Isso e verdade
 * independente do fundo, e e o inventario que este script entrega.
 *
 * Para decidir cor de icone, a fonte e a ANATOMIA (§3④: chevron `ArrowRight2`
 * Linear 16px `neutral[500]`), nao a conta de contraste daqui.
 *
 * O `auditar_tinta_congelada.js` le folhas de estilo e nao ve cor passada como
 * propriedade (`<NeoIcon color={Neo.colors.neutral[800]} />`). Isso deixou de
 * fora uma familia inteira: 240 ocorrencias em 74 ficheiros, medidas em
 * 23/10/2026. Icone a `neutral[800]` fica quase invisivel no modo escuro pelo
 * mesmo motivo que o texto ficava.
 *
 * As colunas de contraste ficam como REFERENCIA, nunca como veredito: valem
 * para um icone sobre a superficie padrao da tela e nada dizem sobre um icone
 * posto de proposito sobre botao, foto ou tela-panico.
 *
 *   node scripts/auditar_tinta_icones.js            # lista, pior primeiro
 *   node scripts/auditar_tinta_icones.js --limiar 3 # so abaixo de 3:1
 *
 * CORRECAO: trocar o `Neo`/`DS` estatico por `useThemeColors()` no componente
 * (padrao ja usado em 88 ficheiros) — nao sobrescrever com outra cor fixa.
 *
 * LIMITE CONHECIDO: assume a superficie padrao da tela. Icone posto de
 * proposito sobre fundo colorido (branco dentro de botao verde, por exemplo)
 * aparece aqui como falso positivo. Confira a tela antes de acreditar.
 */
const fs = require('fs');
const path = require('path');
const { carregar, achatar, contraste } = require('./paleta');

const RAIZ = path.join(__dirname, '..');
const iLim = process.argv.indexOf('--limiar');
const LIMIAR = iLim >= 0 ? Number(process.argv[iLim + 1]) : Infinity;

const p = carregar(path.join(RAIZ, 'utils/DesignSystem2026.js'));
const L = achatar(p.LightColors);
const D = achatar(p.DarkColors);

// CORRECAO 24/10/2026: a primeira versao resolvia o token na paleta ESCURA e
// media contra a superficie escura. Errado nas duas pontas. `Neo`/`DS` e a
// paleta CLARA ESTATICA — `Neo.colors.neutral[300]` vale #E5E5EA sempre, nos
// dois temas. Entao um icone assim some no tema CLARO (cinza claro sobre card
// branco) e fica alto no escuro. Medir a cor clara contra o fundo escuro
// inverteu o diagnostico e teria me feito "corrigir" 31 pontos pelo motivo
// errado. Agora mede o que de fato e desenhado, nos DOIS temas.
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

const achados = [];
for (const arq of arquivos) {
    const txt = fs.readFileSync(arq, 'utf8');
    const linhas = txt.split(/\r?\n/);
    linhas.forEach((linha, i) => {
        const m = linha.match(/color=\{((?:Neo|DS)\.colors\.[A-Za-z0-9_.[\]']+)\}/);
        if (!m) return;
        // `Neo.colors.X` e estatico: o MESMO hex da paleta clara e desenhado
        // nos dois temas. Por isso a cor nao muda entre as duas medidas — so o
        // fundo muda.
        const hex = resolver(m[1], L);
        if (!hex) return;
        const claro = Math.min(contraste(hex, L['neutral.white']), contraste(hex, L['neutral.100']));
        const escuro = Math.min(contraste(hex, D['neutral.200']), contraste(hex, D['neutral.100']));
        achados.push({ arq: path.relative(RAIZ, arq), linha: i + 1, expr: m[1], claro, escuro, c: Math.min(claro, escuro) });
    });
}

achados.sort((a, b) => a.c - b.c);
const mostrar = achados.filter((a) => a.c < LIMIAR);

console.log(`\nTINTA CONGELADA EM ICONE — ${achados.length} ocorrencia(s) em ${new Set(achados.map((a) => a.arq)).size} ficheiro(s)`);
console.log('INVENTARIO, nao veredito de contraste — ver o cabecalho do ficheiro.\n');

const faixas = { 'critico (<2:1)': 0, 'ruim (2-3:1)': 0, 'limite (3-4,5:1)': 0, 'ok (>=4,5:1)': 0 };
for (const a of achados) {
    if (a.c < 2) faixas['critico (<2:1)']++;
    else if (a.c < 3) faixas['ruim (2-3:1)']++;
    else if (a.c < 4.5) faixas['limite (3-4,5:1)']++;
    else faixas['ok (>=4,5:1)']++;
}
for (const [k, v] of Object.entries(faixas)) console.log(`  ${k.padEnd(20)} ${String(v).padStart(4)}`);

console.log('');
for (const a of mostrar) {
    const pior = a.claro < a.escuro ? 'CLARO ' : 'ESCURO';
    console.log(` claro ${a.claro.toFixed(2).padStart(5)}:1  escuro ${a.escuro.toFixed(2).padStart(5)}:1  pior no ${pior}  ${a.arq}:${a.linha}  ${a.expr}`);
}

// Ranking por ficheiro: onde o esforco rende mais.
const porArq = {};
for (const a of achados) if (a.c < 3) porArq[a.arq] = (porArq[a.arq] || 0) + 1;
const top = Object.entries(porArq).sort((x, y) => y[1] - x[1]).slice(0, 12);
if (top.length) {
    console.log('\nFICHEIROS COM MAIS CASOS ABAIXO DE 3:1 (comecar por aqui):');
    for (const [f, n] of top) console.log(`  ${String(n).padStart(3)}  ${f}`);
}
console.log('');
