/**
 * VisionService.js
 * Serviço de análise de imagens com IA (OpenAI). Ambiente: analyzeImage. Rótulo: analyzeProductLabel.
 */

import { Config } from "../utils/Config";
import { fetchWithTimeout as fetchWithTimeoutBase } from "../utils/fetchWithTimeout";
import { getFamilySummary } from "./InfoRotulosRuleEngine";
import ConsentimentoIAService from './ConsentimentoIAService';

import i18n from '../i18n';

// Rota do backend-proxy: /api/openai/* (o proxy reescreve para /v1/* na OpenAI).
// /v1/... direto não existe no proxy e retorna 404.
const CHAT_URL = `${Config.VIGILARO_PROXY_URL}/api/openai/chat/completions`;
const PROXY_HEADERS = {
    "Content-Type": "application/json",
    "x-vigilaro-token": Config.VIGILARO_APP_SECRET,
};

// ─────────────────────────────────────────
// Configuração de performance
// ─────────────────────────────────────────
const VISION_TIMEOUT = 25000;      // 25s — suficiente para GPT-4o-mini
const MAX_IMAGE_DIMENSION = 1024;   // px — GPT-4o lê rótulos perfeitamente a 1024px
const IMAGE_COMPRESS_QUALITY = 0.6; // 0-1 — 0.6 é ótimo equilíbrio qualidade/tamanho

// Respostas simuladas para o modo Mock
const MOCK_RESPONSES = [
    {
        risco: "Alto",
        titulo: "Escada sem Proteção",
        descricao: "Detectamos uma escada sem portão de segurança no topo ou na base.",
        acao: "Instale portões de segurança (baby gates) imediatamente para evitar quedas graves.",
        cor: "#EF4444",
    },
    {
        risco: "Médio",
        titulo: "Produtos Químicos Expostos",
        descricao: "Garrafas que parecem ser produtos de limpeza estão ao alcance de crianças.",
        acao: "Mova estes produtos para armários altos e trancados.",
        cor: "#F59E0B",
    },
    {
        risco: "Baixo",
        titulo: "Ambiente Seguro",
        descricao: "Não detectamos riscos imediatos nesta imagem. O ambiente parece organizado.",
        acao: "Continue monitorando. Lembre-se de travar gavetas acessíveis.",
        cor: "#10B981",
    },
    {
        risco: "Alto",
        titulo: "Remédios ao Alcance",
        descricao: "Detectamos embalagens de medicamentos sobre a mesa de cabeceira/balcão.",
        acao: "Guarde IMEDIATAMENTE em local alto e trancado. Risco fatal de intoxicação.",
        cor: "#EF4444",
    },
    {
        risco: "Alto",
        titulo: "Ferro de Passar Quente",
        descricao: "O ferro de passar parece estar ligado ou esfriando com o fio pendurado.",
        acao: "Enrole o fio. Nunca deixe esfriando ao alcance de crianças (risco de puxar e queimadura grave).",
        cor: "#EF4444",
    },
    {
        risco: "Médio",
        titulo: "Objetos Pequenos (Moedas/Botões)",
        descricao: "Há objetos pequenos no chão/mesa que representam risco de engasgo.",
        acao: "Faça uma varredura no chão. Use o 'Tubo de Teste' (rolo de papel higiênico) para medir o perigo.",
        cor: "#F59E0B",
    },
    {
        risco: "Alto",
        titulo: "Janela Aberta sem Rede",
        descricao: "Janela acessível sem rede de proteção visível.",
        acao: "Instale rede de proteção certificada ou limitadores de abertura imediatamente.",
        cor: "#EF4444",
    },
    {
        risco: "Médio",
        titulo: "Fio de Carregador Solto",
        descricao: "Carregador de celular conectado sem uso.",
        acao: "Desplugue quando não usar. Bebês podem colocar a ponta na boca (choque elétrico na saliva).",
        cor: "#F59E0B",
    }
];

// Padrão AbortController centralizado em utils/fetchWithTimeout; aqui só
// fixamos o timeout padrão de visão (25s).
const fetchWithTimeout = (url, options, timeout = VISION_TIMEOUT) =>
    fetchWithTimeoutBase(url, options, timeout);



// ─────────────────────────────────────────
// O que a IA devolve NÃO vai direto para a tela
// ─────────────────────────────────────────
// A resposta é texto livre de um modelo: pode vir comprida, com caracteres de
// controle, campo faltando, ou até uma cor escolhida por ele. Tudo passa por
// aqui antes de virar UI — e de ir para a busca de ingredientes, que sai do
// aparelho (CLAUDE.md, pilar 1: entradas do Scanner e do Info Rótulos).

/** Idioma em que a IA deve escrever. Sem isto, quem usa o app em inglês lia a análise em português. */
const IDIOMA_DA_IA = {
    'pt-BR': 'português do Brasil',
    'pt-PT': 'português de Portugal',
    en: 'English',
    es: 'español',
};
const idiomaDaIA = () => IDIOMA_DA_IA[i18n.language] || IDIOMA_DA_IA['pt-BR'];

const limpar = (v, max) => String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

const lista = (v, maxItens, maxChars) => (Array.isArray(v) ? v : [])
    .map((x) => limpar(x, maxChars))
    .filter(Boolean)
    .slice(0, maxItens);

/** Nível de risco do ambiente. O que o modelo não disser claramente vale MÉDIO: subestimar é o erro perigoso. */
const nivelDoRisco = (r) => {
    const x = limpar(r, 24).toLowerCase();
    if (/alt|high|grave|cr[ií]tic|sever/.test(x)) return 'Alto';
    if (/baix|low|leve|minor/.test(x)) return 'Baixo';
    return 'Médio';
};

/** Lista de riscos do ambiente, já limpa. Lança se a resposta não tiver a lista. */
function sanitizarAnalises(bruto) {
    if (!Array.isArray(bruto?.analises)) throw new Error('Invalid Response: analises');
    const analises = bruto.analises
        .map((a) => ({
            risco: nivelDoRisco(a?.risco),
            titulo: limpar(a?.titulo, 120),
            descricao: limpar(a?.descricao, 500),
            acao: limpar(a?.acao ?? a?.recomendacao, 500),
        }))
        .filter((a) => a.titulo)
        .slice(0, 12);
    return { analises };
}

/**
 * Rótulo lido pela IA, já limpo e no formato de PRODUTO do Info Rótulos.
 *
 * A IA LÊ o rótulo; não julga. Não pedimos nível de perigo nem primeiros
 * socorros: o perigo vem das bases (PubChem/GHS) e dos alertas locais, e a
 * instrução de socorro é a do centro de intoxicação. "App informa, não opina."
 * Lança RotuloIlegivel quando não há o que ler.
 */
function sanitizarRotulo(bruto) {
    const legivel = bruto?.legivel !== false && bruto?.legivel !== 'false';
    const nome = limpar(bruto?.nome, 100);
    const ingredientes = lista(bruto?.ingredientes, 60, 80);
    const riscos = lista(bruto?.advertencias, 12, 200);
    const prevencao = lista(bruto?.precaucoes, 12, 200);
    if (!legivel || (!nome && ingredientes.length === 0 && riscos.length === 0)) {
        const erro = new Error('Label not legible');
        erro.name = 'RotuloIlegivel';
        throw erro;
    }
    return {
        nome: nome || null,
        marca: limpar(bruto?.marca, 60) || null,
        categoria: limpar(bruto?.categoria, 60) || null,
        componentes: ingredientes,
        riscos,
        prevencao,
    };
}

/** Faz a chamada ao modelo e devolve o JSON da resposta (ou lança). */
async function chamarModelo({ system, user, imageBase64, maxTokens }) {
    const response = await fetchWithTimeout(CHAT_URL, {
        method: "POST",
        headers: PROXY_HEADERS,
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: system },
                { role: "user", content: [
                    { type: "text", text: user },
                    { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
                ] },
            ],
            max_tokens: maxTokens,
            response_format: { type: "json_object" },
        }),
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Invalid Response: no content");
    const trecho = content.match(/\{[\s\S]*\}/);
    return JSON.parse(trecho ? trecho[0] : content);
}

export const VisionService = {

    /**
     * Análise de AMBIENTE: uma foto de cômodo, a IA lista os riscos que enxerga.
     * (O rótulo de produto tem função própria: analyzeProductLabel.)
     */
    analyzeImage: async (imageBase64) => {
        await ConsentimentoIAService.exigir(); // Apple 5.1.2(i) / LGPD art. 11 e 33 — ver o serviço
        if (Config.USE_MOCK_VISION) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return sanitizarAnalises({ analises: [VisionService._getMockAnalysis()] });
        }

        try {
            // O contexto que vai à IA é SÓ faixa etária e animais (`textoIA`).
            // Até 28/10/2026 o pedido levava também a gestação e a lista de
            // ALERGIAS da família — dado de saúde, que o aviso de permissão diz
            // que nunca sai do aparelho. A personalização por saúde acontece
            // depois, no aparelho, pelo motor de regras do Info Rótulos.
            const familyContext = await getFamilySummary();
            const perfil = familyContext?.textoIA
                ? `O usuário mora com: ${familyContext.textoIA}. Dê prioridade aos riscos para este perfil.`
                : 'O usuário é adulto. Foque em perigos gerais graves (incêndio, choque elétrico, quedas). Não liste riscos infantis.';

            // Sem campo de cor: a cor do aviso é decisão do app, não do modelo.
            const formato = JSON.stringify({ analises: [{ risco: 'Alto|Médio|Baixo', titulo: 'string', descricao: 'string', acao: 'string' }] });
            const bruto = await chamarModelo({
                system: `Você é um especialista em segurança doméstica e prevenção de acidentes. Responda APENAS com JSON válido neste formato: ${formato}. Escreva todos os textos em ${idiomaDaIA()}.`,
                user: `Analise a foto deste ambiente e liste os riscos de segurança que VOCÊ CONSEGUE VER nela. ${perfil} Não invente o que não está visível. Se não houver risco visível, devolva a lista vazia.`,
                imageBase64,
                maxTokens: 800,
            });
            return sanitizarAnalises(bruto);
        } catch (error) {
            if (__DEV__) { console.error("Vision Error:", error); }
            // PROPAGA. Até 28/10/2026 isto devolvia um "risco" fictício de título
            // "Erro ou Timeout", que a tela de Scanner exibia como resultado ("1
            // risco detectado"), anunciava como "análise concluída" ao leitor de
            // tela e premiava com pontos. O tratamento de erro da própria tela
            // (tempo esgotado, sem conexão, falha genérica) nunca chegava a rodar.
            // Quem decide a mensagem é quem chama.
            throw error;
        }
    },

    analyzeVaccineCard: async (imageBase64) => {
        await ConsentimentoIAService.exigir(); // Apple 5.1.2(i) / LGPD art. 11 e 33 — ver o serviço
        if (Config.USE_MOCK_VISION) {
            return { vaccines: [{ name: "V10", date: "2024-05-10", nextDue: "2025-05-10" }] };
        }

        try {
            const response = await fetchWithTimeout(CHAT_URL, {
                method: "POST",
                headers: PROXY_HEADERS,
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "Extract vaccine data from the image. Respond ONLY with JSON: { \"vaccines\": [{ \"name\": \"string\", \"date\": \"string\", \"nextDue\": \"string\" }] }"
                        },
                        {
                            role: "user",
                            content: [
                                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
                            ]
                        }
                    ],
                    max_tokens: 1000,
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.choices?.[0]?.message?.content) {
                throw new Error("Invalid Response: no content");
            }

            const content = data.choices[0].message.content;
            const match = content.match(/\{[\s\S]*\}/);
            return JSON.parse(match ? match[0] : content);

        } catch (e) {
            if (__DEV__) { console.error("VaccineCard Error:", e); }
            return { vaccines: [] };
        }
    },

    analyzeMedication: async (imageBase64) => {
        await ConsentimentoIAService.exigir(); // Apple 5.1.2(i) / LGPD art. 11 e 33 — ver o serviço
        if (Config.USE_MOCK_VISION) {
            return { name: "Dipirona", dosage: "500 mg" };
        }

        try {
            const response = await fetchWithTimeout(CHAT_URL, {
                method: "POST",
                headers: PROXY_HEADERS,
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "Extract medication name and dosage. Respond ONLY with JSON: { \"name\": \"string\", \"dosage\": \"string\" }"
                        },
                        {
                            role: "user",
                            content: [
                                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
                            ]
                        }
                    ],
                    max_tokens: 500,
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.choices?.[0]?.message?.content) {
                throw new Error("Invalid Response: no content");
            }

            const content = data.choices[0].message.content;
            const match = content.match(/\{[\s\S]*\}/);
            return JSON.parse(match ? match[0] : content);

        } catch (e) {
            if (__DEV__) { console.error("Medication Error:", e); }
            return { name: "", dosage: "" };
        }
    },

    /**
     * Foto de RÓTULO: a IA lê o que está impresso (nome, ingredientes, advertências)
     * e o app devolve um PRODUTO no mesmo formato do Info Rótulos — por isso o
     * resultado cai na tela de resultado do módulo, com alertas da família e
     * consulta de ingredientes, em vez de um formato próprio.
     *
     * NÃO manda contexto da família: a foto basta, e a personalização é local.
     */
    analyzeProductLabel: async (imageBase64) => {
        await ConsentimentoIAService.exigir(); // Apple 5.1.2(i) / LGPD art. 11 e 33 — ver o serviço
        if (Config.USE_MOCK_VISION) {
            return sanitizarRotulo({ nome: 'Produto (Mock)', ingredientes: ['Hipoclorito de sódio'], advertencias: ['Corrosivo'], precaucoes: ['Manter fora do alcance de crianças'] });
        }

        try {
            const formato = JSON.stringify({
                legivel: 'true|false',
                nome: 'string', marca: 'string', categoria: 'string',
                ingredientes: ['string'], advertencias: ['string'], precaucoes: ['string'],
            });
            const bruto = await chamarModelo({
                system: `Você lê rótulos de produtos domésticos. Transcreva APENAS o que está impresso na imagem; não complete, não deduza, não invente. Responda APENAS com JSON válido neste formato: ${formato}. "ingredientes": cada substância exatamente como impressa (nome químico ou INCI), sem traduzir. "advertencias": as advertências de perigo impressas (ex.: corrosivo, inflamável, nocivo se ingerido). "precaucoes": as precauções de uso impressas. NÃO escreva instruções de primeiros socorros. Se o rótulo não estiver legível, devolva "legivel": false e listas vazias. Escreva "categoria" em ${idiomaDaIA()}.`,
                user: 'Leia este rótulo.',
                imageBase64,
                maxTokens: 900,
            });
            return sanitizarRotulo(bruto);
        } catch (e) {
            if (__DEV__) { console.error("ProductLabel Error:", e); }
            throw e;
        }
    },

    _getMockAnalysis: () => MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],

    // Expostos para teste: a validação da resposta da IA é o ponto de segurança.
    _sanitizarAnalises: sanitizarAnalises,
    _sanitizarRotulo: sanitizarRotulo,
};