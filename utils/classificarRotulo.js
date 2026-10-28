/**
 * classificarRotulo.js — do que está IMPRESSO no rótulo ao nível de perigo.
 *
 * Função pura: sem i18n, sem rede, sem estado. As regras e o PORQUÊ delas estão em
 * data/regras_inforotulos.js (FRASES_DE_PERIGO). Usada pela tela de resultado do
 * Info Rótulos para o produto lido por foto (source 'ai_label'), que não tem
 * `perigo` nem `ghs_categories` de catálogo, e conferida por
 * scripts/verify_classificacao_rotulo.js (npm run validate:rotulo).
 */
import { FRASES_DE_PERIGO, PALAVRA_DE_SINAL, PISO_DO_SINAL, ORDEM_DO_PERIGO } from '../data/regras_inforotulos';

const semAcento = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const maior = (a, b) => (!a || ORDEM_DO_PERIGO.indexOf(b) > ORDEM_DO_PERIGO.indexOf(a) ? b : a);

/** Palavra de sinal canônica (PERIGO | ATENÇÃO | CUIDADO) a partir do que a IA transcreveu; '' se nenhuma. */
export function sinalDoRotulo(texto) {
    const t = semAcento(texto);
    const achada = PALAVRA_DE_SINAL.find((p) => p.padrao.test(t));
    return achada ? achada.sinal : '';
}

// "não inflamável", "sem risco de explosão", "não é tóxico", "livre de substâncias
// corrosivas": a frase NEGA o perigo. Vale só para a negação colada na frase (no
// máximo uma palavra no meio) e dentro do MESMO item, para "Não misture: libera gás
// tóxico" não anular o aviso de gás tóxico.
const NEGACAO = /(^|[^a-z])(nao|sem|livre de|isento de|nunca|non|not|no)\s+(\w+\s+)?$/;

function achaSemNegacao(padrao, item) {
    const g = new RegExp(padrao.source, 'g');
    let m;
    while ((m = g.exec(item)) !== null) {
        const antes = item.slice(Math.max(0, m.index - 24), m.index);
        if (!NEGACAO.test(antes)) return true;
        if (m[0].length === 0) g.lastIndex++;
    }
    return false;
}

/**
 * Classifica as advertências impressas.
 *
 * @param {{ riscos?: string[], palavraSinal?: string }} rotulo — `riscos` são as frases de
 *   perigo transcritas, uma por item; `palavraSinal` já canônica (ver sinalDoRotulo).
 * @returns {{ perigo: string|null, ghs_categories: string[] }} `perigo` é uma chave de
 *   NIVEIS_PERIGO; null quando o rótulo não traz advertência nem palavra de sinal
 *   (quem chama decide o que fazer — a tela mostra "Indeterminado").
 */
export function classificarRotulo({ riscos = [], palavraSinal = '' } = {}) {
    const itens = (Array.isArray(riscos) ? riscos : []).map(semAcento).filter((x) => x.trim());
    const categorias = new Set();
    let perigo = null;

    for (const item of itens) {
        for (const f of FRASES_DE_PERIGO) {
            if (!achaSemNegacao(f.padrao, item)) continue;
            if (f.categoria) categorias.add(f.categoria);
            perigo = maior(perigo, f.nivel);
        }
    }

    const piso = PISO_DO_SINAL[palavraSinal];
    if (piso) perigo = maior(perigo, piso);

    // Há advertência impressa que as regras não reconhecem: na dúvida, cuidado.
    if (!perigo && itens.length > 0) perigo = 'Médio';

    return { perigo, ghs_categories: [...categorias] };
}
