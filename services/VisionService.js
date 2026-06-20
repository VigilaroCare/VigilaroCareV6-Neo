/**
 * VisionService.js
 * Serviço de análise de imagens com IA (OpenAI GPT-4o)
 */

import { Config } from "../utils/Config";
import { fetchWithTimeout as fetchWithTimeoutBase } from "../utils/fetchWithTimeout";
import { getFamilySummary } from "./InfoRotulosRuleEngine";

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


export const VisionService = {

    analyzeImage: async (imageBase64, mode = 'environment') => {
        if (Config.USE_MOCK_VISION) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return { analises: [VisionService._getMockAnalysis()] };
        }

        try {
            // 1. Fetch Dynamic Family Context
            const familyContext = await getFamilySummary();
            const profileString = familyContext?.hasVulnerables || familyContext?.hasPets 
                ? `O usuário mora com: ${familyContext.text}. ${
                    familyContext.context.allergies.length > 0 
                      ? `Alergias conhecidas na família: ${familyContext.context.allergies.map(a => a.allergen).join(', ')}.`
                      : ''
                  } FOCAR ESTRITAMENTE em riscos para este perfil.`
                : `O usuário é adulto. Focar em perigos gerais severos (incêndio, choques, quedas fatais). Não liste riscos infantis se não houver crianças na família.`;

            // 2. Select Prompt based on Mode
            let systemPrompt = "";
            let userPrompt = "";

            if (mode === 'label_scan') {
                systemPrompt = "Você é um toxicologista e especialista em segurança doméstica. Responda APENAS em JSON válido. Formato: { \"analises\": [ { \"risco\": \"Alto/Médio/Baixo/Info\", \"titulo\": \"string\", \"descricao\": \"string\", \"acao\": \"string\", \"cor\": \"HEX\" } ] }";
                userPrompt = `Leia este rótulo de produto (fórmula/ingredientes/INCI). Identifique substâncias tóxicas ou alérgenos. CONTEXTO FAMILIAR: ${profileString}. Retorne um array das analises de riscos encontrados no JSON.`;
            } else {
                systemPrompt = "Você é um especialista em segurança doméstica e prevenção de acidentes. Responda APENAS em JSON válido. Formato: { \"analises\": [ { \"risco\": \"Alto/Médio/Baixo\", \"titulo\": \"string\", \"descricao\": \"string\", \"acao\": \"string\", \"cor\": \"HEX\" } ] }";
                userPrompt = `Analise a foto deste ambiente. Procure ativamente por múltiplos riscos de segurança. CONTEXTO FAMILIAR: ${profileString}. Retorne TODOS os riscos físicos encontrados num array JSON.`;
            }

            const response = await fetchWithTimeout(CHAT_URL, {
                method: "POST",
                headers: PROXY_HEADERS,
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: [
                                { type: "text", text: userPrompt },
                                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
                            ]
                        }
                    ],
                    max_tokens: 800,
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
            const jsonStr = match ? match[0] : content;
            return JSON.parse(jsonStr);

        } catch (error) {
            if (__DEV__) { console.error("Vision Error:", error); }
            return {
                analises: [{
                    error: true,
                    titulo: "Erro ou Timeout",
                    descricao: "A análise demorou muito ou falhou.",
                    acao: "Tente novamente.",
                    risco: "Erro",
                    cor: "#6B7280"
                }]
            };
        }
    },

    analyzeVaccineCard: async (imageBase64) => {
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

    analyzeProductLabel: async (imageBase64) => {
        if (Config.USE_MOCK_VISION) {
            return { titulo: "Produto (Mock)", risco: "Médio", cor: "#F59E0B" };
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
                            content: "Você é um toxicologista e especialista em segurança de produtos. Analise o rótulo do produto na imagem. Identifique ingredientes perigosos, riscos de toxicidade e precauções de uso. Responda SEMPRE em português do Brasil. Responda APENAS com JSON válido no formato: { \"titulo\": \"Nome do Produto\", \"descricao\": \"Descrição e composição\", \"riscos\": \"Riscos identificados\", \"acao\": \"Recomendações de segurança\", \"emergencia\": \"O que fazer em caso de ingestão/contato\", \"risco\": \"Alto/Médio/Baixo\", \"cor\": \"HEX\" }"
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
            if (__DEV__) { console.error("ProductLabel Error:", e); }
            return { titulo: "Erro", risco: "Erro", cor: "#6B7280" };
        }
    },

    _getMockAnalysis: () => MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
};