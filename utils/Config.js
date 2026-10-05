/**
 * Config.js
 * Central de configuração do Vigilaro Care
 *
 * IMPORTANTE — SEGURANÇA:
 * Chaves secretas (API keys, tokens) NÃO pertencem a este arquivo.
 * Elas vivem exclusivamente no backend proxy e nos EAS Secrets
 * (configurados via `eas secret:create`).
 * Qualquer chave aqui é extraível de qualquer APK/IPA por engenharia reversa.
 *
 * Variáveis com prefixo EXPO_PUBLIC_ são lidas em tempo de build a partir do
 * arquivo .env (nunca commite o .env com valores reais — use .env.example).
 */

export const Config = {
    // ---------------------------------------------------------------------------
    // VISÃO COMPUTACIONAL
    // Falso por padrão; verdadeiro apenas em DEV e quando a variável de
    // ambiente explicitamente indicar "true". O gate __DEV__ garante que um
    // .env errado nunca ativa o mock num build de loja.
    // ---------------------------------------------------------------------------
    USE_MOCK_VISION: __DEV__ && process.env.EXPO_PUBLIC_USE_MOCK_VISION === 'true',

    // ---------------------------------------------------------------------------
    // BACKEND PROXY — Vigilaro
    // O fallback aponta para o IP local do seu computador rodando o server.js
    // ---------------------------------------------------------------------------
    // Em DEV cai no IP da máquina que roda o server.js. Em PRODUÇÃO não há
    // fallback, de propósito.
    //
    // Havia um: `https://vigilaro-proxy.onrender.com`. Verificado em 05/10/2026,
    // esse host responde 404 com `x-render-routing: no-server` — ou seja, não
    // existe serviço nenhum ali. Um build de loja sem
    // EXPO_PUBLIC_VIGILARO_PROXY_URL nos EAS Secrets ia bater num endereço
    // morto e receber 404 em toda chamada de IA e de SMS, que é o erro mais
    // difícil de diagnosticar: parece problema de rede ou de conta.
    //
    // Sem fallback, a ausência de configuração falha na hora, dizendo o que é.
    VIGILARO_PROXY_URL: process.env.EXPO_PUBLIC_VIGILARO_PROXY_URL
        || (__DEV__ ? 'http://192.168.100.65:3000' : ''),
    // Token publico do cliente mobile. Nao trate como segredo: qualquer APK/IPA
    // pode expor esse valor. O backend deve combinar isso com rate limiting,
    // allow-list, monitoramento e, idealmente, attestation por plataforma.
    VIGILARO_APP_SECRET: process.env.EXPO_PUBLIC_VIGILARO_PROXY_TOKEN ||
        process.env.EXPO_PUBLIC_VIGILARO_APP_SECRET || '',

    // ---------------------------------------------------------------------------
    // REVENUECAT — Assinaturas
    // ---------------------------------------------------------------------------
    REVENUECAT_API_KEY_IOS: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS || '',
    REVENUECAT_API_KEY_ANDROID: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID || '',

    // ---------------------------------------------------------------------------
    // ELEVENLABS — Voz Ultra Realista
    // O voice_id não é segredo; a API key fica exclusivamente no backend proxy.
    //
    // ⚠️ NÃO LIGAR SEM PLANO PAGO. A conta hoje é do plano Free, que licencia o
    // áudio apenas para uso não comercial e com atribuição — o Vigilaro Care é
    // app pago, então distribuir esse áudio violaria os termos. Nenhum caller
    // ativo hoje: a voz do app vem do TTS nativo do aparelho, via expo-speech
    // em services/VoiceAlertService.js. Ver docs/CONFORMIDADE_IA_E_DIREITOS.md.
    // ---------------------------------------------------------------------------
    ELEVENLABS_VOICE_ID: 'cgSgspJ2msm6clMCkdW9', // Jessica (pt-br)
};

/**
 * O proxy está configurado? Tudo que depende dele — IA, scanner, voz, SMS do
 * cuidador — para sem isto.
 *
 * Checar explicitamente evita o pior modo de falha: URL vazia vira requisição
 * relativa, e o erro que chega ao usuário fala de JSON ou de rede, nunca de
 * configuração ausente. Quem for diagnosticar perde horas no lugar errado.
 */
export const PROXY_CONFIGURADO = Boolean(Config.VIGILARO_PROXY_URL);

if (__DEV__ && !PROXY_CONFIGURADO) {
    console.warn(
        '[Config] EXPO_PUBLIC_VIGILARO_PROXY_URL não definida e não há fallback '
        + 'em produção. IA, scanner e SMS do cuidador não vão funcionar. '
        + 'Defina a variável nos EAS Secrets antes de gerar o build de loja.'
    );
}
