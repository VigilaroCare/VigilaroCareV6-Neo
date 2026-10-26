/**
 * reenquadrar_acervo.js — roda os 62 pictogramas do app numa ocupacao nova.
 *
 *   node scripts/reenquadrar_acervo.js --caixa 0.52 --saida _controle   (verificar)
 *   node scripts/reenquadrar_acervo.js --caixa 0.73 --saida glifos      (valer)
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * O acervo NAO e homogeneo e isso nao esta visivel em lugar nenhum: as 4
 * pastas de origem usam o modo PADRAO do normalizador, mas
 * "Modal motocicleta com baú.png" usa --limpo e a saida e renomeada para
 * pictogram-transporte-moto, que e o nome que o app importa. Quem rodar so as
 * 4 pastas deixa a moto para tras na calibracao antiga, e isso nao da erro:
 * da uma peca fora de escala no meio da grade.
 *
 * A receita abaixo foi determinada por REPRODUCAO byte a byte do que estava em
 * producao (186 de 186 arquivos), nao por suposicao. Rodar com --caixa 0.52
 * continua reproduzindo exatamente o estado anterior — e o teste de regressao
 * deste script e do normalizador.
 *
 * Ficam de fora, por nao terem glifo em producao e nao serem referenciadas em
 * codigo: "Modal motocicleta.png" e "pictogram-transporte-carro .png" (com
 * espaco no nome). Sao arquivos de trabalho do Agnaldo; o script os poe de
 * lado durante a passada e devolve ao lugar intactos, inclusive se falhar.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const arg = (n, p) => { const a = process.argv.slice(2), i = a.indexOf('--' + n); return i >= 0 && a[i + 1] ? a[i + 1] : p; };
const CAIXA = arg('caixa', '0.52');
const SAIDA = arg('saida', '_controle');
// repassa --alongamento ao normalizador (compensa silhueta esguia)
const EXTRA = process.argv.includes('--alongamento') ? ' --alongamento' : '';

const A = path.join(__dirname, '..', 'assets', 'illustrations');
const PASTAS = ['education-pictograms', 'home-pictograms', 'menu-pictograms', 'travel-pictograms'];

// ── PECAS EM FORMATO LIMPO ──────────────────────────────────────────────────
// A arte nova do Agnaldo vem TRANSPARENTE, sem o tile creme e sem a moldura
// pintados. Ela exige `--limpo`: o caminho padrao desfaz a mistura com o creme
// e, numa arte que nao tem creme, trata o que encontra como se fosse tile — ja
// produziu saida invertida (tile da cor alvo com o desenho vazado).
//
// SEM `--alvo`, de proposito. A reancoragem no verde unico existe para unificar
// o acervo ANTIGO, de tons desencontrados. Numa arte que ja nasce no verde da
// casa ela amplifica o brilho especular: a moto saiu "pincelada de neon"
// (Agnaldo, 23/10/2026) e o botijao novo repetiu o efeito em 25/10/2026.
// O custo e conhecido e aceito: a peca fica no tom do autor, nao na media
// exata (6,78,59) que as peças do caminho padrao tem.
//
// Cada entrada tambem RENOMEIA: o arquivo tem nome de autor e a saida precisa
// do nome que o app importa.
const LIMPAS = [
    { pasta: 'travel-pictograms',    arquivo: 'Modal motocicleta com baú.png',      nome: 'pictogram-transporte-moto' },
    { pasta: 'education-pictograms', arquivo: 'Botijão de gás standard.png',        nome: 'pictogram-vazamento-gas' },
    { pasta: 'education-pictograms', arquivo: 'Extintor Verde com Chama em 3D.png', nome: 'pictogram-fire-prev' },
];

// ── FORA DA PASSADA PADRAO ──────────────────────────────────────────────────
// Tres motivos para um arquivo sair de circulacao durante a passada:
//   1. e fonte de uma peca LIMPA (seria processado no modo errado);
//   2. foi SUPERADO por uma arte nova (regeneraria o desenho antigo por cima);
//   3. e arquivo de trabalho sem glifo em producao.
// Nada e alterado: o script move, roda e devolve — inclusive se falhar.
const FORA = [
    { pasta: 'travel-pictograms',    arquivo: 'Modal motocicleta com baú.png' },  // (1)
    { pasta: 'education-pictograms', arquivo: 'Botijão de gás standard.png' },    // (1)
    { pasta: 'education-pictograms', arquivo: 'Extintor Verde com Chama em 3D.png' }, // (1)
    { pasta: 'education-pictograms', arquivo: 'pictogram-vazamento-gas.png' },    // (2) superado em 25/10/2026
    { pasta: 'education-pictograms', arquivo: 'pictogram-fire-prev.png' },        // (2) superado em 25/10/2026
                                                                                   //     — no desenho antigo a alavanca
                                                                                   //     e o bocal apontavam para o mesmo
                                                                                   //     lado, o que e impossivel de operar
    { pasta: 'travel-pictograms',    arquivo: 'Modal motocicleta.png' },          // (3)
    { pasta: 'travel-pictograms',    arquivo: 'pictogram-transporte-carro .png' },// (3) nome com espaco
];

const tmp = (n) => path.join(A, n);
const rmrf = (p) => fs.rmSync(p, { recursive: true, force: true });

// 1. tira de circulacao o que nao participa, sem alterar nenhum arquivo
const guardado = path.join(A, '_fora');
rmrf(guardado); fs.mkdirSync(guardado, { recursive: true });
const devolver = [];
for (const { pasta, arquivo } of FORA) {
    const o = path.join(A, pasta, arquivo);
    if (!fs.existsSync(o)) continue;
    const destino = path.join(guardado, pasta + '__' + arquivo);
    fs.renameSync(o, destino);
    devolver.push([destino, o]);
}

try {
    // 2. as 4 pastas, modo padrao
    for (const p of PASTAS) {
        execSync(`node scripts/normalizar_pictogramas.js --pasta ${p} --caixa ${CAIXA} --saida ${SAIDA}${EXTRA}`,
            { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
    }

    // 3. as pecas limpas, uma a uma, com renomeacao
    for (const { pasta, arquivo, nome } of LIMPAS) {
        const origem = path.join(guardado, pasta + '__' + arquivo);
        if (!fs.existsSync(origem)) continue;
        const umA = tmp('_uma'); rmrf(umA); fs.mkdirSync(umA, { recursive: true });
        fs.copyFileSync(origem, path.join(umA, nome + '.png'));
        execSync(`node scripts/normalizar_pictogramas.js --pasta _uma --caixa ${CAIXA} --saida ${SAIDA} --limpo${EXTRA}`,
            { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
        rmrf(umA);
    }
} finally {
    // 4. devolve tudo ao lugar, aconteca o que acontecer
    for (const [de, para] of devolver) fs.renameSync(de, para);
    rmrf(guardado);
}

const n = fs.readdirSync(path.join(A, SAIDA)).filter(f => f.endsWith('.png')).length;
console.log(`${n} arquivos em assets/illustrations/${SAIDA}/ (${n / 3} pecas x 3 densidades), caixa ${CAIXA}`);
