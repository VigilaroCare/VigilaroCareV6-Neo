/**
 * verify_icons.js
 *
 * Falha se alguma tela pedir ao NeoIcon um nome que ele não sabe resolver.
 *
 * POR QUE ESTE TESTE EXISTE (2026-07-31)
 * O NeoIcon tem um fallback: nome desconhecido vira um TRIÂNGULO DE ALERTA.
 * Em desenvolvimento sai um console.warn, mas em release a falha é silenciosa —
 * o utilizador só vê o ícone errado. Foi assim que 26 nomes remanescentes da
 * migração Iconsax → Phosphor ficaram meses a renderizar um triângulo.
 *
 * O caso que revelou o problema foi pior ainda, e este teste NÃO o teria
 * apanhado: o alias 'Pet' resolvia para 'Heart'. Nome válido, ícone errado.
 * Nenhuma verificação estática apanha semântica — só olho humano. Por isso a
 * secção 2 imprime os aliases para revisão em vez de os validar.
 *
 * Rodar: node scripts/verify_icons.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NEOICON = path.join(ROOT, 'components/NeoIcon.js');
const PHOSPHOR_DIR = path.join(ROOT, 'node_modules/phosphor-react-native/lib/typescript/icons');

const fonte = fs.readFileSync(NEOICON, 'utf8');

/** Um nome resolve se está no PHOSPHOR_MAP, nos aliases, nos custom, ou é um nome Phosphor válido. */
function resolve(nome) {
    if (new RegExp(`^\\s+'?${nome}'?:`, 'm').test(fonte)) return true;
    if (fs.existsSync(path.join(PHOSPHOR_DIR, `${nome}.d.ts`))) return true;
    return false;
}

/** Recolhe todo `name=` de <NeoIcon>, e `icon=`/`iconName=` dos componentes que repassam. */
function coletar(dir, encontrados = new Map()) {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entrada.name);
        if (entrada.isDirectory()) { coletar(p, encontrados); continue; }
        if (!entrada.name.endsWith('.js')) continue;

        const src = fs.readFileSync(p, 'utf8');
        const rel = path.relative(ROOT, p).replace(/\\/g, '/');

        const registar = (nome) => {
            if (!encontrados.has(nome)) encontrados.set(nome, new Set());
            encontrados.get(nome).add(rel);
        };

        for (const m of src.matchAll(/<NeoIcon[^>]*?name="([A-Za-z0-9_-]+)"/g)) registar(m[1]);
        for (const m of src.matchAll(/\bicon(?:Name)?=["{']([A-Za-z0-9_-]+)['"}]/g)) registar(m[1]);
    }
    return encontrados;
}

console.log('\n1. NOMES DE ÍCONE PEDIDOS PELAS TELAS\n');
const usados = coletar(path.join(ROOT, 'screens'));
coletar(path.join(ROOT, 'components'), usados);

const quebrados = [...usados.entries()]
    .filter(([nome]) => !resolve(nome))
    .sort(([a], [b]) => a.localeCompare(b));

if (quebrados.length) {
    for (const [nome, ficheiros] of quebrados) {
        console.log(`   FALHA ${nome.padEnd(24)} -> ${[...ficheiros].slice(0, 3).join(', ')}`);
    }
    console.log(`\n   ${quebrados.length} nome(s) renderizariam um triângulo de alerta.`);
    console.log('   Adicione em PHOSPHOR_MAP (components/NeoIcon.js) apontando para o');
    console.log('   nome Phosphor equivalente — semântico antes de literal.');
} else {
    console.log(`   OK    ${usados.size} nomes distintos, todos resolvem`);
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Nomes de ícone vindos dos DADOS. A secção 1 só vê literais no JSX
// (name="Casa"); um `<NeoIcon name={item.icone} />` escapa-lhe por completo —
// e é assim que a maior parte dos ambientes, categorias e dispositivos é
// desenhada. Aqui validamos o outro lado: os valores em /data.
// ---------------------------------------------------------------------------
console.log('\n2. NOMES DE ÍCONE VINDOS DOS DADOS (campo `icone`)\n');
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

function varrerDados(dir, achados = { quebrados: [], emojis: [], total: 0 }) {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entrada.name);
        if (entrada.isDirectory()) { varrerDados(p, achados); continue; }
        if (!entrada.name.endsWith('.js')) continue;

        const rel = path.relative(ROOT, p).replace(/\\/g, '/');
        const src = fs.readFileSync(p, 'utf8');
        for (const m of src.matchAll(/\bicone:\s*['"]([^'"]*)['"]/g)) {
            const valor = m[1];
            achados.total++;
            if (EMOJI.test(valor)) achados.emojis.push(`${rel}: ${valor}`);
            else if (valor && !resolve(valor)) achados.quebrados.push(`${rel}: ${valor}`);
        }
    }
    return achados;
}

const dados = varrerDados(path.join(ROOT, 'data'));
let falhasDados = 0;

if (dados.emojis.length) {
    falhasDados += dados.emojis.length;
    console.log(`   FALHA ${dados.emojis.length} campo(s) \`icone\` ainda com emoji:`);
    dados.emojis.slice(0, 10).forEach((x) => console.log(`         ${x}`));
}
if (dados.quebrados.length) {
    falhasDados += dados.quebrados.length;
    console.log(`   FALHA ${dados.quebrados.length} nome(s) que não resolvem:`);
    dados.quebrados.slice(0, 10).forEach((x) => console.log(`         ${x}`));
}
if (!falhasDados) {
    console.log(`   OK    ${dados.total} campos \`icone\` em /data, todos nomes válidos`);
}

console.log('\n3. ALIASES SEMÂNTICOS (revisão humana — não é assertiva)\n');
const blocoAlias = fonte.match(/const overrides = \{([\s\S]*?)\n\s{4}\};/);
if (blocoAlias) {
    const pares = [...blocoAlias[1].matchAll(/'([^']+)':\s*'([^']+)'/g)]
        .filter(([, de, para]) => de.toLowerCase() !== para.toLowerCase());
    for (const [, de, para] of pares) {
        console.log(`   ${de.padEnd(24)} -> ${para}`);
    }
    console.log('\n   Confira se cada seta ainda faz sentido. Foi aqui que \'Pet\' apontou');
    console.log('   para \'Heart\' — nome válido, ícone errado, invisível a qualquer teste.');
}

const totalFalhas = quebrados.length + falhasDados;
console.log(totalFalhas === 0
    ? '\nRESULTADO: aprovado — nenhum ícone cai no fallback.\n'
    : `\nRESULTADO: ${totalFalhas} falha(s).\n`);
process.exit(totalFalhas === 0 ? 0 : 1);
