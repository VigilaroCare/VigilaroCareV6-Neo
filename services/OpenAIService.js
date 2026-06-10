/**
 * OpenAIService.js
 * Integração com API OpenAI para chat, TTS, transcrição e visão computacional.
 *
 * ⚠️ SEGURANÇA: A chave de API é lida de Config, que por sua vez lê de
 * EXPO_PUBLIC_OPENAI_API_KEY. Em produção, SUBSTITUA por um backend proxy
 * que adicione a chave server-side. Variáveis EXPO_PUBLIC_ são extraíveis
 * por engenharia reversa do bundle.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';

import { Config } from '../utils/Config';
import { fetchWithTimeout } from '../utils/fetchWithTimeout';
import i18n from '../i18n';

const PROXY_URL = Config.VIGILARO_PROXY_URL;
const APP_SECRET = Config.VIGILARO_APP_SECRET;

const CHAT_URL = `${PROXY_URL}/api/openai/chat/completions`;
const TRANSCRIPTIONS_URL = `${PROXY_URL}/api/openai/audio/transcriptions`;
const SPEECH_URL = `${PROXY_URL}/api/openai/audio/speech`;

// Timeouts proporcionais à natureza de cada operação (ms)
const TIMEOUT_CHAT = 15000;          // chat curto (askMaster)
const TIMEOUT_REPORT = 60000;        // geração de relatório consultivo (resposta JSON longa)
const TIMEOUT_VISION = 30000;        // visão computacional (upload de imagem)
const TIMEOUT_AUDIO_UP = 30000;      // upload de áudio + transcrição
const TIMEOUT_TTS = 20000;           // TTS (resposta de áudio)

// fetchWithTimeout vem de utils/fetchWithTimeout — fonte única do padrão
// AbortController. Todas as chamadas abaixo passam timeout explícito (TIMEOUT_*).

// Vozes disponíveis no OpenAI TTS
// alloy: neutra, echo: masculina, fable: narrativa, onyx: masculina grave, nova: feminina, shimmer: feminina suave
const AVAILABLE_VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
const VOICE_STORAGE_KEY = '@vigilaro_voice_preference';

class OpenAIService {
    constructor() {
        this.context = null;
        this.selectedVoice = 'nova'; // Feminina Natural (Mais agradável)
    }

    // Obter voz selecionada do storage
    async getSelectedVoice() {
        try {
            const voice = await AsyncStorage.getItem(VOICE_STORAGE_KEY);
            if (voice && AVAILABLE_VOICES.includes(voice)) {
                this.selectedVoice = voice;
            }
            return this.selectedVoice;
        } catch (e) {
            return 'nova';
        }
    }

    // Salvar preferência de voz
    async setVoice(voice) {
        if (AVAILABLE_VOICES.includes(voice)) {
            this.selectedVoice = voice;
            await AsyncStorage.setItem(VOICE_STORAGE_KEY, voice);
            return true;
        }
        return false;
    }

    // Lista de vozes disponíveis
    getAvailableVoices() {
        return AVAILABLE_VOICES.map(v => ({
            id: v,
            name: v.charAt(0).toUpperCase() + v.slice(1),
            description: v === 'nova' ? 'Feminina (padrão)' :
                v === 'shimmer' ? 'Feminina suave' :
                    v === 'echo' ? 'Masculina' :
                        v === 'onyx' ? 'Masculina grave' :
                            v === 'fable' ? 'Narrativa' :
                                v === 'alloy' ? 'Neutra' : ''
        }));
    }

    async loadContext() {
        try {
            // 1. Load Universal Data (V6 Unified Storage)
            const vigilaroDataRaw = await AsyncStorage.getItem('@vigilaro_data');
            const vigilaroData = vigilaroDataRaw ? JSON.parse(vigilaroDataRaw) : {};
            const profiles = vigilaroData.perfis || [];

            // 2. Load Home Mapping (Compatibility with direct storage or unified)
            // Tenta ler do unificado primeiro, fallback para antigo
            const homeMapping = vigilaroData.moradia || (await AsyncStorage.getItem('@home_mapping') ? JSON.parse(await AsyncStorage.getItem('@home_mapping')) : null);

            // 3. Load Medications
            const medicationsRaw = await AsyncStorage.getItem('@medications');
            const medications = medicationsRaw ? JSON.parse(medicationsRaw) : [];

            // 4. Load Emergency Contacts
            const emergencyContactsRaw = await AsyncStorage.getItem('@emergency_contacts');
            const emergencyContacts = emergencyContactsRaw ? JSON.parse(emergencyContactsRaw) : [];

            // 5. Load Checklists Progress
            const checklistReforma = await AsyncStorage.getItem('@checklist_reforma_casa');
            const checklistSeguranca = await AsyncStorage.getItem('@checklist_completo');

            // 6. Construct Rich Context String
            let contextStr = "DADOS DO USUÁRIO:\n\n";

            // Família
            if (profiles.length > 0) {
                contextStr += "FAMÍLIA:\n";
                const processedNames = new Set(); // Para evitar duplicatas

                profiles.forEach(p => {
                    // Filtros de Qualidade
                    if (!p.nome || p.nome.includes('(Pendente)') || p.nome === 'Novo Perfil') return;
                    if (processedNames.has(p.nome)) return;

                    processedNames.add(p.nome);

                    const tipo = p.tipo || 'pessoa';

                    // Cálculo de Idade Amigável
                    let idadeStr = 'idade não informada';
                    if (p.dataNascimento) {
                        const birthDate = new Date(p.dataNascimento);
                        if (!isNaN(birthDate)) {
                            const today = new Date();
                            let age = today.getFullYear() - birthDate.getFullYear();
                            const m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            idadeStr = `${age} anos`;
                        } else {
                            idadeStr = p.faixaEtaria || p.raca || '';
                        }
                    } else if (p.faixaEtaria) {
                        idadeStr = p.faixaEtaria;
                    }

                    const condicoes = p.condicoesEspeciais ? ` (${p.condicoesEspeciais})` : '';
                    contextStr += `- ${p.nome}: ${tipo}, ${idadeStr}${condicoes}\n`;
                });
            } else {
                contextStr += "FAMÍLIA: Nenhum perfil cadastrado.\n";
            }

            // Casa (Robustez na leitura)
            if (homeMapping) {
                contextStr += `\nRESIDÊNCIA:\n`;
                contextStr += `- Tipo: ${homeMapping.tipoImovel || homeMapping.tipo || 'não informado (pergunte ao usuário)'}\n`;
                if (homeMapping.temPiscina || (homeMapping.caracteristicas && homeMapping.caracteristicas.includes('piscina'))) contextStr += "- TEM PISCINA\n";
                if (homeMapping.temEscada || (homeMapping.caracteristicas && homeMapping.caracteristicas.includes('escadas'))) contextStr += "- TEM ESCADAS\n";
                if (homeMapping.temChurrasqueira || (homeMapping.caracteristicas && homeMapping.caracteristicas.includes('lareira'))) contextStr += "- TEM FOGO/LAREIRA\n";
                if (homeMapping.temJardim || (homeMapping.caracteristicas && homeMapping.caracteristicas.includes('quintal'))) contextStr += "- TEM ÁREA EXTERNA\n";
            }

            // Medicamentos
            if (medications.length > 0) {
                contextStr += `\nMEDICAMENTOS CADASTRADOS: ${medications.length}\n`;
                medications.slice(0, 3).forEach(m => {
                    contextStr += `- ${m.nome} (${m.horario || 'horário não definido'})\n`;
                });
            }

            // Contatos de Emergência
            if (emergencyContacts.length > 0) {
                contextStr += `\nCONTATOS DE EMERGÊNCIA: ${emergencyContacts.length} cadastrados\n`;
            }

            // Progresso em Checklists
            let progressInfo = [];
            if (checklistReforma) {
                const data = JSON.parse(checklistReforma);
                const completed = Object.values(data).filter(Boolean).length;
                progressInfo.push(`Reforma: ${completed} itens`);
            }
            if (checklistSeguranca) {
                const data = JSON.parse(checklistSeguranca);
                const total = Object.keys(data).length;
                const completed = Object.values(data).filter(v => v === true).length;
                progressInfo.push(`Segurança: ${completed}/${total}`);
            }
            if (progressInfo.length > 0) {
                contextStr += `\nCHECKLISTS: ${progressInfo.join(', ')}\n`;
            }

            this.context = contextStr;
            if (__DEV__) {
                console.log("Contexto IA carregado:", contextStr);
            }
            return contextStr;
        } catch (e) {
            if (__DEV__) {
                console.error("Erro ao carregar contexto IA:", e);
            }
            return "Contexto não disponível.";
        }
    }

    async sendMessage(userMessage, history = []) {
        if (!this.context) {
            await this.loadContext();
        }

        const systemPrompt = `
Você é o VIGILARO, um Especialista em prevenção de acidentes domésticos e saúde no lar.
Objetivo: Proteger a família e educar sobre riscos de forma CONVERSACIONAL e TÁTICA via ÁUDIO.

REGRAS CRÍTICAS PARA VOZ:
1. Respostas CURTAS (máximo 2 frases). Não faça palestras. Vá direto ao ponto.
2. NUNCA use Markdown (*, #, -). O robô leitor lê isso e fica horrível.
3. NUNCA use Emojis.
4. Fale como um mestre de segurança instruindo uma família: firme, claro e focado nas melhores práticas, mas compreensivo com a rotina. Sem bajulações e sem condescendência.
5. Se o usuário disser "Obrigado", "Tchau" ou "Valeu", responda apenas: "Fico à disposição. Conte comigo." (Isso sinalizará o fim da conversa).

SUA PERSONALIDADE:
- NOME: Vigilaro
- TOM: Autoridade técnica, objetivo e empático.
- ESTILO: Foco em resolução e prevenção. Faça apenas verificações táticas.

IDIOMA:
- O usuário utiliza o aplicativo no idioma "${i18n.language}". RESPONDA ESTRITAMENTE NESTE IDIOMA.

CONTEXTO ATUAL DA FAMÍLIA:
${this.context}`;


        const messages = [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userMessage }
        ];

        try {
            const response = await fetchWithTimeout(CHAT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-vigilaro-token': APP_SECRET
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            }, TIMEOUT_CHAT);

            const data = await response.json();

            if (data.error) {
                if (__DEV__) {
                    console.error("OpenAI Error:", data.error);
                }
                return "Desculpe, minha conexão com o cérebro central falhou. Verifique sua chave de API.";
            }

            return data.choices[0].message.content;

        } catch (error) {
            if (__DEV__) {
                console.error("Network Error:", error);
            }
            return "Estou tendo problemas para conectar à internet. Mas lembre-se: em caso de emergência, ligue 192 ou 193.";
        }
    }

    /**
     * Gera o Relatório Personalizado inteligente usando a metodologia "Quem, Onde, O Que, Como"
     * @param {Object} reportData - Dados cruzados (perfil, moradia, saude, riscos)
     */
    async generateConsultativeReport(reportData) {
        const { profile, typeLabel, age, moradia, health, riskItems, pendingItems } = reportData;

        // Verifica se é pet
        const isPet = typeLabel?.toLowerCase() === 'pet' || profile?.tipo?.toLowerCase() === 'pet';

        // Monta o contexto descritivo
        let contextStr = `\nDADOS DO ${isPet ? 'ANIMAL (PET)' : 'MORADOR'}:\n`;
        contextStr += `- Nome: ${profile?.nome || 'Não informado'}\n`;
        contextStr += `- Perfil: ${typeLabel} (${age ? age + ' anos' : 'Idade não informada'})\n`;
        if (profile?.condicoesEspeciais) {
            contextStr += `- Condições/Atenções: ${profile.condicoesEspeciais}\n`;
        }
        if (health?.hasMeds) {
            contextStr += `- Medicamentos Registrados: ${health.medNames}\n`;
        }

        contextStr += `\nDADOS DO AMBIENTE:\n`;
        const mParts = [moradia?.tipo, moradia?.andar ? `${moradia.andar}º andar` : null, moradia?.location].filter(Boolean);
        contextStr += `- Tipo: ${mParts.join(' · ') || 'Não informado'}\n`;
        if (moradia?.caracteristicas?.length > 0) {
            contextStr += `- Características: ${moradia.caracteristicas.join(', ')}\n`;
        }

        contextStr += `\nIRREGULARIDADES ATIVAS (VISTORIA):\n`;
        if (riskItems && riskItems.length > 0) {
            riskItems.forEach((r, idx) => {
                contextStr += `${idx + 1}. Ambiente: ${r.roomLabel} | Problema: ${r.titulo} | Risco: ${r.implication || 'Não especificado'}\n`;
            });
            contextStr += `Total de riscos ativos: ${riskItems.length}\n`;
        } else {
            contextStr += `Nenhum risco ativo identificado no momento.\n`;
        }

        if (pendingItems && pendingItems.length > 0) {
            contextStr += `\nITENS PENDENTES (Vistoria Incompleta): ${pendingItems.length} itens não avaliados.\n`;
        }

        let systemPrompt = `Você é o Vigilaro, um consultor de segurança residencial que cuida das famílias com competência técnica e genuína empatia.\n`;
        systemPrompt += `Seu tom é acolhedor, mas firme quando a segurança exige. Você entende a rotina da casa e fala como alguém que se importa de verdade — nunca como um robô ou um fiscal.\n`;
        systemPrompt += `Nunca seja bajulador ou condescendente. Não use frases de autoajuda. Seja honesto, direto e humano.\n\n`;

        if (isPet) {
            systemPrompt += `O usuário está solicitando o Relatório Personalizado de Proteção focado em seu **Animal de Estimação (Pet)**.\n`;
            systemPrompt += `Dirija-se ao usuário como o "tutor" ou responsável do ${profile?.nome || 'pet'}, e NÃO como se o animal fosse ler o relatório.\n`;
        } else {
            systemPrompt += `O usuário quer o Relatório Personalizado de Proteção para a sua casa e para o perfil avaliado (que pode ser ele mesmo ou um familiar).\n`;
        }

        systemPrompt += `\nBaseie-se na metodologia "Quem, Onde, O Que, Como".
Analise o contexto fornecido e forneça o relatório de forma objetiva no seguinte formato JSON OBRIGATÓRIO:
{
  "quem": "Um relato acolhedor e direto de 1 parágrafo identificando os cuidados específicos para ${profile?.nome || 'o morador'}, considerando idade, medicamentos e condições. Comece usando o nome da pessoa de forma natural, como se estivesse conversando com ela (ex: 'Ana, com seus 72 anos...').",
  "onde": "Um relato claro de 1 parágrafo sobre o que o tipo de residência e suas características representam em termos de atenção. Contextualize de forma prática, não alarmista.",
  "o_que": "Um resumo tático de 1 ou 2 parágrafos sobre as irregularidades encontradas na vistoria. Seja honesto sobre a gravidade, mas explique o porquê de forma compreensível para leigos.",
  "como": "Instruções práticas e acessíveis em 1 ou 2 parágrafos. Explique como resolver os problemas de forma simples e realizável, priorizando o que é mais urgente. Incentive o usuário a agir mostrando que cada pequena ação faz diferença."
}

Regras de Tom e Estilo:
- Fale como um consultor de confiança: competente, humano e encorajador. Combine autoridade técnica com calor humano.
- PROIBIDO usar introduções robóticas ou impessoais como "Como um adulto...", "Dado o perfil de idoso...", "Sendo uma criança de X anos...". Use o nome da pessoa fluidamente e naturalmente.
- ${isPet ? 'Lembre-se: O texto vai para o DONO do pet, instruindo-o objetivamente sobre a segurança do animal com carinho.' : 'Fale diretamente com o usuário que está lendo, de forma clara, assertiva e acolhedora.'}
- IMPORTANT: Se houver POUCOS ou NENHUM risco ativo, reconheça o esforço do usuário de forma genuína (ex: "Seu ambiente está bem cuidado, e isso mostra atenção com quem você ama."), mas SEMPRE sugira pelo menos um ponto de atenção preventiva.
- Se as dicas cadastradas no contexto ('Problema: X | Risco: Y') forem vagas, use sua autoridade em segurança para dar orientações concretas e úteis.
- Nunca use markdown ou emojis no JSON, apenas texto simples.
- Escreva de forma fluida e instrucional, sem listas de pontos (bullet points). Priorize clareza e acessibilidade na linguagem.
- IMPORTANTE: O usuário fala "${i18n.language}". GERE TODO O CONTEÚDO DO JSON ESTREITAMENTE NESTE IDIOMA.`;

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Aqui está o panorama atual:\n${contextStr}` }
        ];

        try {
            const response = await fetchWithTimeout(CHAT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-vigilaro-token': APP_SECRET
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1500,
                    response_format: { type: "json_object" }
                })
            }, TIMEOUT_REPORT);

            const textResponse = await response.text();
            
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                if (__DEV__) {
                    console.error("Falha ao fazer parse do JSON do proxy:", textResponse.substring(0, 200));
                }
                throw new Error("Servidor retornou uma resposta não-JSON (possível erro de conexão/proxy).");
            }

            if (!response.ok || data.error) {
                if (__DEV__) {
                    console.error("OpenAI Error HTTP", response.status, data.error || data);
                }
                throw new Error(data.error?.message || `Erro HTTP ${response.status}`);
            }

            let jsonResponse;
            const content = data.choices[0].message.content;
            try {
                jsonResponse = JSON.parse(content);
            } catch (err) {
                if (__DEV__) {
                    console.error("Falha ao fazer parse do conteúdo OpenAI:", content);
                }
                throw new Error("OpenAI retornou um JSON incompleto ou mal formatado.");
            }
            
            return jsonResponse;

        } catch (error) {
            if (__DEV__) {
                const isTimeout = error?.name === 'AbortError';
                console.error(
                    isTimeout
                        ? `Timeout (${TIMEOUT_REPORT}ms) ao gerar Relatório Personalizado — proxy inalcançável?`
                        : "Erro ao gerar Relatório Personalizado:",
                    error
                );
            }
            throw error;
        }
    }

    /**
     * Extrai dados de uma imagem da carteira de vacinação usando GPT-4o-mini (Vision)
     * @param {string} base64Image - Imagem em formato base64 JPEG ou PNG (sem cabeçalho scheme)
     * @returns {Promise<Array>} - Array de objetos: [{ title: 'Vacina', date: 'YYYY-MM-DD', description: 'Dose X' }]
     */
    async analyzeVaccineCard(base64Image) {
        let systemPrompt = `Você é um OCR assistente médico altamente treinado em ler caligrafias de cadernetas de vacinação e comprovantes do SUS.\n`;
        systemPrompt += `Sua função é identificar os registros de vacinas legíveis na imagem fornecida.\n`;
        systemPrompt += `Retorne estritamente um JSON no seguinte formato, e com formatação de data ISO (YYYY-MM-DD), ou vazio se for ilegível:\n`;
        systemPrompt += `{\n  "vaccines": [\n    { "title": "Nome da Vacina (ex: Febre Amarela)", "date": "2024-10-25", "description": "1ª Dose - Lote 1234" }\n  ]\n}\n`;
        systemPrompt += `Seja resiliente com garrancho médico. Se a data estiver incerta mas legível só o ano, coloque "YYYY-01-01". Se descrição (lote/dose) não for legível, retorne "1 Dose".\n`;
        systemPrompt += `IMPORTANTE: Traduza o texto lido/títulos das vacinas para o idioma "${i18n.language}" se aplicável e mantenha a coesão neste idioma.`;

        const messages = [
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content: [
                    { type: "text", text: "Leia esta carteira de vacinação e liste as vacinas encontradas em JSON." },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${base64Image}`,
                            detail: "high"
                        }
                    }
                ]
            }
        ];

        try {
            const response = await fetchWithTimeout(CHAT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-vigilaro-token': APP_SECRET
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini", // GPT-4o-Mini suporta vision nativamente
                    messages: messages,
                    temperature: 0.1, // temperatura baixa para máxima precisão de transcrição
                    response_format: { type: "json_object" },
                    max_tokens: 1500
                })
            }, TIMEOUT_VISION);

            const data = await response.json();

            if (data.error) {
                if (__DEV__) {
                    console.error("OpenAI Vision Error:", data.error);
                }
                throw new Error(data.error.message);
            }

            const jsonResponse = JSON.parse(data.choices[0].message.content);
            return jsonResponse.vaccines || [];
        } catch (error) {
            if (__DEV__) {
                console.error("Erro ao ler caderneta com IA:", error);
            }
            throw error;
        }
    }

    /**
     * Transcreve áudio usando OpenAI Whisper
     * @param {string} audioUri - URI do arquivo de áudio local
     * @returns {Promise<string>} - Texto transcrito
     */
    async transcribeAudio(audioUri) {
        try {
            const formData = new FormData();

            // Preparar arquivo para upload
            const filename = audioUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `audio/${match[1]}` : 'audio/m4a';

            formData.append('file', {
                uri: audioUri,
                name: filename,
                type: type
            });
            formData.append('model', 'whisper-1');
            formData.append('language', 'pt');

            const response = await fetchWithTimeout(TRANSCRIPTIONS_URL, {
                method: 'POST',
                headers: {
                    'x-vigilaro-token': APP_SECRET,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }, TIMEOUT_AUDIO_UP);

            const data = await response.json();

            if (data.error) {
                if (__DEV__) {
                    console.error('Whisper Error:', data.error);
                }
                throw new Error(data.error.message);
            }

            return data.text;
        } catch (error) {
            if (__DEV__) {
                console.error('Error transcribing audio:', error);
            }
            throw error;
        }
    }

    /**
     * Limpa texto de markdown e formatação para TTS
     * @param {string} text - Texto com possível markdown
     * @returns {string} - Texto limpo para falar
     */
    cleanTextForSpeech(text) {
        if (!text) return '';

        let cleaned = text
            // Remove código
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`[^`]*`/g, '')
            // Remove formatação markdown
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/__([^_]+)__/g, '$1')
            .replace(/_([^_]+)_/g, '$1')
            .replace(/^#+\s*/gm, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/^[\-\*]\s*/gm, '')
            .replace(/^\d+\.\s*/gm, '')
            // Remove TODOS os emojis (Faixa Unicode Ampla)
            .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
            // Remove caracteres de controle raros
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
            // Remove espaços extras
            .replace(/\s+/g, ' ')
            .trim();

        return cleaned;
    }

    /**
     * Gera áudio a partir de texto usando OpenAI TTS
     * @param {string} text - Texto para falar
     * @returns {Promise<string>} - fileUri local com o áudio AAC
     */
    async generateSpeech(text) {
        try {
            // Carregar voz selecionada se ainda não carregou
            if (!this.selectedVoice) {
                await this.getSelectedVoice();
            }

            const response = await fetchWithTimeout(SPEECH_URL, {
                method: 'POST',
                headers: {
                    'x-vigilaro-token': APP_SECRET,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: this.cleanTextForSpeech(text), // Limpa markdown antes de falar
                    voice: this.selectedVoice, // Usa voz selecionada pelo usuário
                    response_format: 'aac'
                })
            }, TIMEOUT_TTS);

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'TTS Error');
            }

            // Converter blob/buffer para base64
            const blob = await response.blob();
            const base64Audio = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            // Limpa o cabeçalho base64 gerado pelo web FileReader
            const cleanBase64 = base64Audio.includes('base64,')
                ? base64Audio.split('base64,')[1]
                : base64Audio;

            // Salva fisicamente no disco para o Expo AV ler de forma estável
            const fileUri = `${FileSystem.cacheDirectory}vigilaro_tts_${Date.now()}.aac`;

            await FileSystem.writeAsStringAsync(fileUri, cleanBase64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            return fileUri;

        } catch (error) {
            if (__DEV__) {
                console.error('Error generating speech with OpenAI TTS:', error);
            }
            throw error;
        }
    }
}

export default new OpenAIService();
