/**
 * verify_imagens.js
 *
 * Catraca: o número de imagens carregadas por URL remota só pode DIMINUIR.
 *
 * POR QUE ASSIM, E NÃO "FALHA SE HOUVER ALGUMA" (2026-08-01)
 * A auditoria de design encontrou 54 fotos do Pexels puxadas por URL. São dois
 * problemas sobrepostos: fotos de banco genéricas denunciam interface gerada,
 * e URL remota faz o app depender de CDN externo em runtime — sem rede, o
 * espaço fica vazio.
 *
 * Resolver exige arte nova, que é trabalho humano e não sai numa passagem. Um
 * teste que exigisse zero seria vermelho por meses e acabaria ignorado — que é
 * o pior destino de um teste. Uma catraca é honesta: não cobra a solução
 * completa, só impede que o problema cresça enquanto é resolvido.
 *
 * Quando o número baixar, ATUALIZE o teto abaixo. É esse gesto que trava o
 * progresso conquistado.
 *
 * Plano de substituição e worklist: docs/IMAGENS_REMOTAS.md
 *
 * Rodar: node scripts/verify_imagens.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/**
 * Duas categorias, e misturá-las tornaria o teste inútil:
 *
 *   BANCO DE IMAGENS (Pexels, Unsplash) — foto genérica usada como decoração
 *   de interface. É o alvo da auditoria: é o que denuncia interface gerada, e
 *   é substituível por arte própria. É o que a catraca vigia.
 *
 *   EDITORIAL (preveniremcasa.com.br e afins) — imagem que acompanha o artigo
 *   do micro blog, vinda da fonte junto com o texto. Não é decoração nossa,
 *   e trocar por arte própria descaracterizaria a citação. Fica informativo.
 */
const BANCO = /https?:\/\/(images\.)?(pexels|unsplash)\.com/i;
const IMAGEM = /https?:\/\/[^'"`\s]+\.(jpe?g|png|webp|gif)/i;

/** Teto do BANCO DE IMAGENS. Baixe conforme migrarem para assets locais. */
const TETO = 56;

function varrer(dir, achados = { banco: [], editorial: [] }) {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entrada.name);
        if (entrada.isDirectory()) { varrer(p, achados); continue; }
        if (!entrada.name.endsWith('.js')) continue;

        const rel = path.relative(ROOT, p).replace(/\\/g, '/');
        fs.readFileSync(p, 'utf8').split('\n').forEach((linha, i) => {
            if (BANCO.test(linha)) achados.banco.push({ rel, linha: i + 1 });
            else if (IMAGEM.test(linha)) achados.editorial.push({ rel, linha: i + 1 });
        });
    }
    return achados;
}

const achados = { banco: [], editorial: [] };
for (const d of ['screens', 'data']) varrer(path.join(ROOT, d), achados);
const total = achados.banco.length;

console.log('\n1. BANCO DE IMAGENS (Pexels / Unsplash)\n');
console.log(`   encontradas: ${total}   teto: ${TETO}`);

const porFicheiro = achados.banco.reduce((acc, a) => {
    acc[a.rel] = (acc[a.rel] || 0) + 1;
    return acc;
}, {});
const top = Object.entries(porFicheiro).sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log('');
for (const [f, n] of top) console.log(`   ${String(n).padStart(3)}  ${f}`);
if (Object.keys(porFicheiro).length > 8) {
    console.log(`        ... e mais ${Object.keys(porFicheiro).length - 8} ficheiro(s)`);
}

let falhou = false;
console.log('');
if (total > TETO) {
    falhou = true;
    console.log(`   FALHA subiu de ${TETO} para ${total}. Imagem nova deve vir de`);
    console.log('         assets/illustrations/, não de URL remota — senão o app');
    console.log('         depende de rede para desenhar a própria interface.');
} else if (total < TETO) {
    console.log(`   PROGRESSO ${TETO - total} imagem(ns) migrada(s) desde a última marca.`);
    console.log(`         Baixe o TETO para ${total} em scripts/verify_imagens.js`);
    console.log('         para travar o avanço.');
} else {
    console.log('   OK    no teto, sem crescimento.');
}

// ---------------------------------------------------------------------------
console.log('\n2. EDITORIAL (informativo — não entra na catraca)\n');
const edPorFicheiro = achados.editorial.reduce((acc, a) => {
    acc[a.rel] = (acc[a.rel] || 0) + 1;
    return acc;
}, {});
const edTop = Object.entries(edPorFicheiro).sort((a, b) => b[1] - a[1]).slice(0, 4);
console.log(`   ${achados.editorial.length} imagem(ns) que acompanham conteúdo de terceiros`);
for (const [f, n] of edTop) console.log(`   ${String(n).padStart(3)}  ${f}`);
console.log('');
console.log('   Continuam remotas de propósito: são a ilustração do artigo citado.');
console.log('   O risco aqui não é estético, é de disponibilidade — se a fonte sair');
console.log('   do ar, o card fica sem imagem. Vale um placeholder local no futuro.');

console.log(falhou
    ? '\nRESULTADO: falhou.\n'
    : '\nRESULTADO: aprovado — ver docs/IMAGENS_REMOTAS.md para a worklist.\n');
process.exit(falhou ? 1 : 0);
