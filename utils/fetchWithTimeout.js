/**
 * fetchWithTimeout.js
 * Fonte única do padrão fetch + AbortController com timeout.
 *
 * Resolve com a Response normalmente, ou lança AbortError se exceder timeoutMs.
 * Evita o travamento aparente (spinner infinito) quando o servidor não responde.
 *
 * Cada serviço passa seu próprio timeout adequado à natureza da operação
 * (chat curto, relatório longo, upload de imagem, etc.).
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(id);
    }
}

export default fetchWithTimeout;
