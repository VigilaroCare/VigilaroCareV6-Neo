/**
 * verify_telefone_internacional.js — trava a regra de DDI do WhatsApp.
 *
 * O botão de WhatsApp dos contatos de emergência prefixava 55 em qualquer
 * número. Isso quebrava de dois jeitos: número já com DDI virava 5555119…, e
 * celular de PT/ES/GB/US/MX recebia DDI do Brasil — o pedido de socorro ia para
 * um desconhecido. Este validador fixa o comportamento para que a regressão não
 * volte sem alguém ver.
 *
 *   node scripts/verify_telefone_internacional.js
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ARQ = path.join(RAIZ, 'utils', 'telefoneInternacional.js');

// O módulo é ESM e o app não roda build aqui: lê e avalia a função isolada.
function carregarParaWhatsApp() {
    const fonte = fs.readFileSync(ARQ, 'utf8')
        .replace(/export const /g, 'const ')
        .replace(/export function /g, 'function ')
        .replace(/export default .*;?/g, '');
    // eslint-disable-next-line no-new-func
    return new Function(`${fonte}\nreturn paraWhatsApp;`)();
}

const paraWhatsApp = carregarParaWhatsApp();

// [descricao, telefone, pais, esperado]
const CASOS = [
    // --- Brasil: o caso que o codigo antigo acertava
    ['BR celular sem DDI', '(41) 99999-9999', 'BR', '5541999999999'],
    ['BR fixo sem DDI', '41 3333-4444', 'BR', '554133334444'],

    // --- As regressoes que motivaram o fix
    ['BR numero JA com DDI nao duplica', '5541999999999', 'BR', '5541999999999'],
    ['BR com + explicito', '+55 41 99999-9999', 'BR', '5541999999999'],
    ['DDD 55 (Marilia-SP) nao e confundido com DDI', '55 3333-4444', 'BR', '555533334444'],

    // --- Outros paises: nunca recebem DDI do Brasil
    ['PT celular', '912 345 678', 'PT', '351912345678'],
    ['PT fixo', '212 345 678', 'PT', '351212345678'],
    ['ES celular', '612 345 678', 'ES', '34612345678'],
    ['GB movel com tronco 0', '07911 123456', 'GB', '447911123456'],
    ['GB fixo Londres com tronco 0', '020 7946 0958', 'GB', '442079460958'],
    ['US 10 digitos', '(415) 555-2671', 'US', '14155552671'],
    ['US com tronco 1', '1 415 555 2671', 'US', '14155552671'],
    ['MX 10 digitos', '55 1234 5678', 'MX', '525512345678'],

    // --- DDI estrangeiro explicito e respeitado mesmo com outro pais ativo
    ['contato portugues com + e app no BR', '+351 912 345 678', 'BR', '351912345678'],

    // --- Na duvida, null: melhor nenhum botao que numero errado
    ['pais desconhecido e sem +', '99999-9999', null, null],
    ['pais fora do mapa', '912 345 678', 'FR', null],
    ['comprimento fora do plano', '123', 'BR', null],
    ['vazio', '', 'BR', null],
    ['nulo', null, 'BR', null],
    ['so pontuacao', '()- ', 'BR', null],
];

let falhas = 0;
console.log('\nTELEFONE INTERNACIONAL (WhatsApp) — regra de DDI\n');

for (const [desc, tel, pais, esperado] of CASOS) {
    const obtido = paraWhatsApp(tel, pais);
    if (obtido === esperado) {
        console.log(`   OK    ${desc}`);
    } else {
        falhas++;
        console.log(`   FALHA ${desc}`);
        console.log(`         entrada: ${JSON.stringify(tel)} / pais ${pais}`);
        console.log(`         esperado: ${JSON.stringify(esperado)}  obtido: ${JSON.stringify(obtido)}`);
    }
}

// Ninguem deve voltar a montar wa.me na mao.
const SUSPEITOS = [];
for (const dir of ['screens', 'services', 'components', 'utils']) {
    const base = path.join(RAIZ, dir);
    if (!fs.existsSync(base)) continue;
    const pilha = [base];
    while (pilha.length) {
        const atual = pilha.pop();
        for (const nome of fs.readdirSync(atual)) {
            const p = path.join(atual, nome);
            const st = fs.statSync(p);
            if (st.isDirectory()) { pilha.push(p); continue; }
            if (!nome.endsWith('.js')) continue;
            // O proprio arquivo canonico cita o padrao errado no comentario.
            if (nome === 'telefoneInternacional.js') continue;
            const txt = fs.readFileSync(p, 'utf8');
            // wa.me ou whatsapp://send com DDI literal colado antes da variavel.
            const re = /(wa\.me\/|whatsapp:\/\/send\?phone=)(?:55|351|34|44|52|1)\$\{/g;
            if (re.test(txt)) SUSPEITOS.push(path.relative(RAIZ, p));
        }
    }
}

console.log('');
if (SUSPEITOS.length) {
    falhas++;
    console.log('   FALHA DDI literal colado antes da variavel (use paraWhatsApp):');
    SUSPEITOS.forEach((f) => console.log(`         ${f}`));
} else {
    console.log('   OK    nenhum DDI literal montado a mao em wa.me/whatsapp://');
}

console.log('');
if (falhas) {
    console.log(`RESULTADO: reprovado — ${falhas} problema(s).\n`);
    process.exit(1);
}
console.log('RESULTADO: aprovado — DDI resolvido pelo pais, sem palpite.\n');
