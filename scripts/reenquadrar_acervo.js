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

const A = path.join(__dirname, '..', 'assets', 'illustrations');
const PASTAS = ['education-pictograms', 'home-pictograms', 'menu-pictograms', 'travel-pictograms'];
const FORA = ['Modal motocicleta.png', 'Modal motocicleta com baú.png', 'pictogram-transporte-carro .png'];
const MOTO = { arquivo: 'Modal motocicleta com baú.png', nome: 'pictogram-transporte-moto' };

const tmp = (n) => path.join(A, n);
const rmrf = (p) => fs.rmSync(p, { recursive: true, force: true });

// 1. tira de circulacao o que nao participa, sem alterar nenhum arquivo
const guardado = path.join(A, '_fora');
rmrf(guardado); fs.mkdirSync(guardado, { recursive: true });
for (const f of FORA) {
    const o = path.join(A, 'travel-pictograms', f);
    if (fs.existsSync(o)) fs.renameSync(o, path.join(guardado, f));
}

try {
    // 2. as 4 pastas, modo padrao
    for (const p of PASTAS) {
        execSync(`node scripts/normalizar_pictogramas.js --pasta ${p} --caixa ${CAIXA} --saida ${SAIDA}`,
            { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
    }

    // 3. a moto, modo limpo, com renomeacao
    const umA = tmp('_uma'); rmrf(umA); fs.mkdirSync(umA, { recursive: true });
    fs.copyFileSync(path.join(guardado, MOTO.arquivo), path.join(umA, MOTO.nome + '.png'));
    execSync(`node scripts/normalizar_pictogramas.js --pasta _uma --caixa ${CAIXA} --saida ${SAIDA} --limpo`,
        { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
    rmrf(umA);
} finally {
    // 4. devolve tudo ao lugar, aconteca o que acontecer
    for (const f of fs.readdirSync(guardado)) {
        fs.renameSync(path.join(guardado, f), path.join(A, 'travel-pictograms', f));
    }
    rmrf(guardado);
}

const n = fs.readdirSync(path.join(A, SAIDA)).filter(f => f.endsWith('.png')).length;
console.log(`${n} arquivos em assets/illustrations/${SAIDA}/ (${n / 3} pecas x 3 densidades), caixa ${CAIXA}`);
