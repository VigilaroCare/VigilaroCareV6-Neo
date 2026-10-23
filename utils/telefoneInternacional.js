/**
 * telefoneInternacional.js — converte um telefone digitado pelo usuário no
 * formato que o WhatsApp exige (E.164 sem o '+', só dígitos).
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * Havia duas implementações paralelas disso, e as duas fixavam o Brasil:
 *   - ContatosEmergenciaScreen: `wa.me/55${num}` — prefixava 55 sempre, inclusive
 *     num número que já tinha DDI (virava 5555119...) ou num número estrangeiro.
 *   - SOSCountdownScreen (normalizeForWhatsApp): heurística por comprimento,
 *     prefixava 55 em qualquer número de 10-11 dígitos.
 * O app atende BR, PT, ES, GB, US e MX. Prefixar 55 num celular português manda
 * o pedido de socorro para um desconhecido no Brasil. Esta é a versão canônica;
 * não reimplemente a regra na tela.
 *
 * REGRA DE SEGURANÇA — na dúvida, devolve null.
 * Número de emergência errado é pior que botão ausente: o usuário acha que pediu
 * ajuda e ninguém recebeu. Quando não há certeza do DDI (país desconhecido ou
 * comprimento fora do esperado), a função devolve null e quem chama deve oferecer
 * outro caminho (SMS, ligação) em vez de abrir uma conversa com o número errado.
 */

// Comprimentos do número NACIONAL (sem DDI, sem prefixo de tronco).
// Fontes: planos de numeração ANATEL (BR), ANACOM (PT), CNMC (ES),
// Ofcom (GB), NANPA (US/espelhado no MX pelo IFT).
const DDI_POR_PAIS = {
    // 10 = fixo (DDD + 8), 11 = celular (DDD + 9).
    BR: { ddi: '55', nacional: [10, 11] },
    // 9 dígitos, sem tronco (celular começa em 9, fixo em 2).
    PT: { ddi: '351', nacional: [9] },
    ES: { ddi: '34', nacional: [9] },
    // Escrito com 0 na frente (07911…, 0207…); o 0 cai ao internacionalizar.
    GB: { ddi: '44', nacional: [10] },
    // NANPA: 3 de área + 7. O tronco é o próprio '1'.
    US: { ddi: '1', nacional: [10], tronco: '1' },
    MX: { ddi: '52', nacional: [10] },
};

/** Países para os quais sabemos montar o DDI. */
export const PAISES_COM_DDI = Object.keys(DDI_POR_PAIS);

/**
 * @param {string} telefone  Como o usuário digitou: "(41) 99999-9999",
 *                           "+351 912 345 678", "0207 946 0958"…
 * @param {string|null} pais ISO-2 do país do usuário (de `paisDoAparelho()` ou
 *                           `detectEmergencyCountry()`). Sem ele, só passa
 *                           número que já venha com '+'.
 * @returns {string|null} Dígitos prontos para `wa.me/<retorno>`, ou null quando
 *                        não há certeza — nunca um palpite.
 */
export function paraWhatsApp(telefone, pais) {
    const bruto = String(telefone ?? '').trim();
    if (!bruto) return null;

    const digitos = bruto.replace(/\D/g, '');
    if (!digitos) return null;

    // O usuário já informou o DDI explicitamente. É o sinal mais forte que
    // existe e vale mais que qualquer heurística de país: respeita e devolve.
    if (/^\s*\+/.test(bruto)) return digitos;

    const cfg = pais ? DDI_POR_PAIS[pais] : null;
    // Sem país conhecido não há como saber qual DDI prefixar. Não arrisca.
    if (!cfg) return null;

    // Já está internacional sem o '+' (ex.: 5511987654321 colado de outro app).
    // Confere o resto do comprimento para não confundir com DDD homônimo: um
    // fixo de Marília-SP é 5512345678 — começa com "55" e NÃO tem DDI.
    if (digitos.startsWith(cfg.ddi)) {
        const resto = digitos.length - cfg.ddi.length;
        if (cfg.nacional.includes(resto)) return digitos;
    }

    // Remove o prefixo de tronco nacional, que não existe no formato E.164.
    let nacional = digitos;
    if (nacional.startsWith('0')) {
        nacional = nacional.slice(1);
    } else if (cfg.tronco && nacional.startsWith(cfg.tronco)
        && nacional.length === cfg.nacional[0] + cfg.tronco.length) {
        nacional = nacional.slice(cfg.tronco.length);
    }

    if (cfg.nacional.includes(nacional.length)) return cfg.ddi + nacional;

    // Comprimento fora do plano de numeração do país: provavelmente incompleto
    // ou de outro país sem DDI. Devolve null em vez de montar algo inválido.
    return null;
}

export default paraWhatsApp;
