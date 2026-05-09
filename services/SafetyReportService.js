import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CHECKLISTS, AMBIENTES } from '../data/mapeamento_dados';

// ─── BIBLIOTECA DE IMPLICAÇÕES ESTATÍSTICAS ────────────────────────────────
// Fonte: DATASUS, SINAN/MS, ABNT NBR 9050, INMETRO, OMS, IBGE, literatura de
// prevenção de acidentes domésticos (Agnaldo Fontinele – referência editorial Vigilaro).
const RISK_IMPLICATIONS = {

    // POR TIPO DE RISCO (tags do checklist)
    queda: {
        baby: "Quedas são a principal causa de trauma craniano em bebês. Em superfícies rígidas, uma queda de menos de 1 metro já pode ser fatal. O tempo de reação de cuidadores é, em média, de 0,3 segundos — insuficiente para evitar o impacto.",
        toddler: "Entre 1 e 3 anos, quedas de móveis e escadas são a principal causa de internação por trauma. Crianças nessa faixa ainda não têm noção de profundidade desenvolvida.",
        child: "Crianças entre 3 e 12 anos lideram as estatísticas de fraturas por quedas de altura no Brasil (DATASUS). Janelas sem proteção são o principal vetor de acidente grave.",
        teen: "Adolescentes têm tendência a subestimar riscos de altura. Quedas de sacadas e telhados representam uma das principais causas de trauma grave nessa faixa etária.",
        adult: "Quedas em ambiente doméstico causam cerca de 30% dos afastamentos laborais por acidente. Escadas molhadas, tapetes soltos e ausência de iluminação são os principais fatores.",
        senior: "Quedas são a principal causa de morte acidental em idosos no Brasil (DATASUS, 2023), representando 35% das hospitalizações acima de 60 anos. O uso de medicamentos psicoativos aumenta o risco de queda em até 60%. Com a osteoporose, uma simples queda pode resultar em fratura de quadril — com mortalidade pós-cirúrgica de até 30% em 1 ano.",
        pet: "Pets, especialmente filhotes, podem cair de alturas que parecem seguras para humanos. Gatos sofrem da 'Síndrome do Gato Voador' — quedas de janelas abertas são frequentes em apartamentos.",
        default: "Quedas domésticas são a 2ª maior causa de morte acidental no Brasil, com mais de 30 mil óbitos por ano (IBGE). A prevenção é totalmente possível com ajustes estruturais simples."
    },
    afogamento: {
        baby: "O afogamento é silencioso e ocorre em menos de 60 segundos em bebês. Um bebê pode se afogar em apenas 5 cm de água — em baldes, banheiras ou vasos sanitários abertos.",
        toddler: "O afogamento é a 2ª causa de morte acidental em crianças de 1 a 4 anos no Brasil (MS/DATASUS). Não há gritos — a criança simplesmente afunda. A janela de resgate é de 2 a 4 minutos.",
        child: "Crianças de 5 a 14 anos representam 40% das mortes por afogamento no Brasil. Piscinas sem cerca física respondem pela maioria dos casos — coletes salva-vidas não substituem barreiras físicas.",
        pet: "Muitos pets caem em piscinas e morrem de exaustão porque não conseguem acessar as escadas convencionais. Capas de piscina dão falsa sensação de segurança — animais ficam presos embaixo.",
        default: "O afogamento responde por mais de 3.500 mortes por ano no Brasil (Sociedade Brasileira de Salvamento Aquático). É silencioso, rápido e 100% evitável com barreiras físicas adequadas."
    },
    queimadura: {
        baby: "A pele do bebê é 15x mais fina que a de um adulto. Água a 60°C causa queimadura de 2º grau em 3 segundos. A cozinha responde por cerca de 40% das queimaduras infantis (DATASUS). O manequim de panela para trás e a trava em forno são medidas imediatas.",
        toddler: "Crianças pequenas têm reflexo de agarrar — e puxam cabos de panelas sem entender o perigo. O Hospital das Clínicas registra alta incidência de queimaduras em crianças de 1-3 anos por líquidos quentes.",
        child: "Crianças em idade escolar experimentam com fósforos e isqueiros. Queimaduras químicas com produtos de limpeza também são frequentes nessa faixa.",
        senior: "Idosos podem ter sensibilidade à temperatura reduzida (neuropatia), não percebendo o perigo de superfícies quentes ou água em temperatura elevada antes de se machucar gravemente.",
        pet: "Gatos e cães podem subir em fogões e encostar em superfícies quentes. Óleo quente espirrado causa queimaduras graves nas patas e no focinho.",
        default: "Queimaduras representam a 4ª maior causa de internação por acidente no Brasil. 73% dos casos ocorrem em ambiente doméstico, sendo 60% na cozinha (DATASUS/MS)."
    },
    intoxicacao: {
        baby: "Bebês e crianças pequenas são as principais vítimas de intoxicação doméstica. O SINAN registra que 35% das intoxicações acidentais acometem crianças < 5 anos, principalmente por produtos de limpeza coloridos e medicamentos.",
        toddler: "Crianças de 1 a 3 anos exploram com a boca. Produtos de limpeza com coloração atraente são confundidos com suco ou balas. A intoxicação é a 3ª causa de morte acidental nessa faixa etária no país.",
        pet: "Uva, cebola, alho, xilitol (em gomas e algumas manteigas de amendoim) e chocolate são altamente tóxicos para cães. Paracetamol e anti-inflamatórios comuns podem ser fatais para gatos. O CVT-SP registra milhares de chamadas/ano por intoxicação acidental de pets.",
        senior: "Idosos podem confundir medicamentos semelhantes ou tomar doses erradas. A polifarmácia (uso de 5 ou mais medicamentos) aumenta o risco de interações e intoxicação acidental.",
        default: "O SINAN registra cerca de 200 mil notificações de intoxicação por ano no Brasil. Produtos de uso domiciliar e medicamentos respondem por mais de 50% dos casos. Armazenamento correto previne quase 100% dos acidentes."
    },
    eletricidade: {
        baby: "Tomadas na altura do chão são acessíveis para bebês que começam a se locomover. Choques elétricos causam parada cardíaca e queimaduras internas invisíveis a olho nu.",
        child: "Crianças introduzem objetos metálicos em tomadas por curiosidade. O choque elétrico em crianças causa, além de parada cardíaca, graves queimaduras internas que nem sempre são visíveis externamente.",
        teen: "Adolescentes realizam reparos elétricos improvisados. Instalações inadequadas são responsáveis por 60% dos incêndios residenciais no Brasil (CBMERJ/CBPMESP).",
        adult: "Choques elétricos causam cerca de 1.200 mortes/ano no Brasil (ABRACOPEL). Instalações improvisadas, fios descascados e extensões sobrecarregadas são os principais fatores.",
        pet: "Fios elétricos são 'brinquedos' irresistíveis para filhotes. Morder um fio energizado causa queimaduras na boca e parada cardíaca. Cães e gatos jovens são os mais afetados.",
        default: "Choques elétricos e incêndios de origem elétrica causam mais de 1.200 mortes/ano no Brasil (ABRACOPEL). 60% dos casos têm origem em instalações improvisadas ou com sobrecarga."
    },
    gas: {
        default: "Explosões e intoxicações por GLP (gás de cozinha) causam aproximadamente 300 acidentes graves por ano no Brasil (Corpo de Bombeiros). São 100% evitáveis com manutenção preventiva do botijão, mangueiras e regulador. O gás natural, usado em aparelhos sem manutenção, pode acumular silenciosamente e causar explosão com a simples acender de uma luz."
    },
    corte: {
        baby: "Bebês não têm controle motor para evitar objetos cortantes. Lâminas expostas em gavetas baix as causam ferimentos graves, incluindo cortes em artérias.",
        child: "Tesouras, facas e objetos pontiagudos acessíveis causam ferimentos frequentes em crianças. O risco é maior em gavetas baixas e superfícies acessíveis.",
        default: "Cortes e perfurações domésticos respondem por grande parte dos atendimentos de emergência. Objetos cortantes guardados incorretamente são a principal causa."
    },
    sufocacao: {
        baby: "A sufocação é a 1ª causa de morte acidental em bebês < 1 ano no Brasil (MS). Travesseiros, lençóis soltos, objetos pequenos (< 4,5 cm) e grades de berço espaçadas são os principais vetores. Bebês não têm força muscular para desobstruir as vias aéreas.",
        toddler: "Crianças pequenas colocam objetos pequenos na boca por instinto exploratório. Qualquer objeto que caiba em um tubo de papel toalha representa risco de sufocação.",
        pet: "Sacos plásticos e embalagens de snacks são armadilhas para pets curiosos. Gatos e cães podem enfiar a cabeça e sufocarem sem conseguir se livrar.",
        default: "A sufocação por corpos estranhos é uma das principais causas de morte acidental evitável. Objetos menores que 4,5 cm de diâmetro devem ser mantidos fora do alcance de crianças."
    },
    iluminacao: {
        senior: "Idosos levantam à noite com maior frequência (noctúria) e têm adaptação visual mais lenta ao escuro. Corredores e banheiros sem iluminação noturna são os principais cenários de queda noturna, que ocorrem em ambiente de menor supervisão e com consequências muitas vezes fatais.",
        default: "A iluminação insuficiente está associada a 20% das quedas domésticas, principalmente em escadas, corredores e banheiros. Iluminação de presença (sensor) é a solução de menor custo e maior eficácia."
    },
    janela: {
        child: "Quedas de janelas e sacadas são a principal causa de trauma craniano grave em crianças entre 1 e 5 anos em ambiente urbano. Redes de proteção certificadas pela ABNT NBR 16389 são obrigatórias por lei em apartamentos em vários estados.",
        pet: "Gatos são atraídos por janelas abertas e pássaros. A 'Síndrome do Gato Voador' é documentada em centros veterinários de todo o país — quedas de andares elevados causam fraturas múltiplas mas raramente são fatais, porém geram custos veterinários altos e sofrimento ao animal.",
        default: "Quedas de janelas e sacadas representam causa relevante de trauma grave. Proteções físicas (grades ou redes) são a única medida efetiva de prevenção."
    }
};

// ─── HELPER: busca a implicação correta para um item ─────────────────────────
function getImplication(item, profileType) {
    const tags = item.tags || [];
    const titulo = (item.titulo || '').toLowerCase();

    // Extrair texto contextual por tag + tipo de perfil
    for (const tag of tags) {
        const tagData = RISK_IMPLICATIONS[tag];
        if (tagData) {
            return tagData[profileType] || tagData.default || null;
        }
    }

    // Fallback por palavras no título
    const keywords = Object.keys(RISK_IMPLICATIONS);
    for (const kw of keywords) {
        if (titulo.includes(kw)) {
            const tagData = RISK_IMPLICATIONS[kw];
            return tagData[profileType] || tagData.default || null;
        }
    }

    return null;
}

// ─── HELPER: orientação de ação para o item ──────────────────────────────────
function getActionTip(item, knowledgeTip) {
    // Retorna a dica específica do item. Se não houver, retorna vazio para que a IA crie a dela.
    const tip = item.dica || item.orientacao || item.tip || '';
    return tip;
}

// ─── HELPER: resolve tipo de perfil robusto ──────────────────────────────────
function resolveProfileType(profile) {
    if (!profile) return 'adult';
    const tipo = (profile.tipo || '').toLowerCase();
    if (tipo === 'pet') return 'pet';

    // Calcula idade real
    let age = parseInt(profile.idade, 10);
    if (isNaN(age) && profile.dataNascimento) {
        const birth = new Date(profile.dataNascimento);
        if (!isNaN(birth.getTime())) {
            const diff = Date.now() - birth.getTime();
            age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
    }

    if (!isNaN(age)) {
        if (age < 1) return 'baby';
        if (age <= 3) return 'toddler';
        if (age <= 12) return 'child';
        if (age <= 17) return 'teen';
        if (age >= 80) return 'senior'; // idoso avançado ainda usa 'senior'
        if (age >= 60) return 'senior';
    }

    const map = {
        baby: 'baby', toddler: 'toddler', child: 'child', crianca: 'child',
        teen: 'teen', adolescente: 'teen', adult: 'adult', adulto: 'adult',
        senior: 'senior', idoso: 'senior'
    };
    return map[tipo] || 'adult';
}

// ─── HELPER: formata localização da moradia ──────────────────────────────────
function formatLocation(moradia) {
    const parts = [];
    if (moradia.cidade) parts.push(moradia.cidade);
    if (moradia.estado) parts.push(moradia.estado);
    return parts.join('/') || null;
}

// ─── HELPER: label de tipo de perfil ─────────────────────────────────────────
function typeLabel(type, age) {
    const labels = {
        baby: 'Bebê', toddler: 'Criança pequena', child: 'Criança',
        teen: 'Adolescente', adult: 'Adulto', senior: age >= 80 ? 'Idoso(a) avançado(a)' : 'Idoso(a)', pet: 'Pet'
    };
    return labels[type] || 'Morador(a)';
}

// ─── CLASSE PRINCIPAL ─────────────────────────────────────────────────────────
class SafetyReportService {

    async getDeepDiveReport(profileId) {
        try {
            const ProfileService = require('./ProfileService').default;
            const HealthService = require('./HealthService').default;
            const SafetyKnowledge = require('./SafetyKnowledgeService').default;
            const CS = require('./ChecklistService').ChecklistService || require('./ChecklistService').default;

            // ── 1. PERFIL ──────────────────────────────────────────────────
            const profiles = await ProfileService.getAllPerfis();
            const profile = profiles.find(p => p.id === profileId);
            if (!profile) return null;

            const type = resolveProfileType(profile);
            const age = parseInt(profile.idade, 10) || null;
            const firstName = (profile.nome || '').split(' ')[0] || 'Morador';

            // ── 2. MORADIA ─────────────────────────────────────────────────
            const moradia = await ProfileService.getMoradia();
            const location = formatLocation(moradia);
            const residenceId = await ProfileService.getActiveResidenceId();
            const mapping = await ProfileService.getMapping();

            const tipoMoradia = moradia.tipo || moradia.tipoMoradia || null;
            const andar = moradia.andar || null;
            const caract = moradia.caracteristicas || [];

            // ── 3. SAÚDE ───────────────────────────────────────────────────
            let medications = [], treatments = [], medicalHistory = [];
            try {
                [medications, treatments, medicalHistory] = await Promise.all([
                    HealthService.getMedications(profileId),
                    HealthService.getTreatments(profileId),
                    HealthService.getMedicalHistory ? HealthService.getMedicalHistory(profileId) : Promise.resolve([])
                ]);
            } catch (_) { /* saúde é opcional */ }

            const hasMeds = medications.length > 0;
            const medNames = medications.slice(0, 3).map(m => m.nome || m.name || m).filter(Boolean).join(', ');

            // ── 4. CHECKLIST STATE ─────────────────────────────────────────
            const checklistState = await CS.getAllState(residenceId);

            // ── 5. RECONHECIMENTOS SALVOS ──────────────────────────────────
            const acknowledgments = await this.getAcknowledgments(profileId);

            // ── 6. PROCESSAR AMBIENTES ─────────────────────────────────────
            const riskItems = [];   // "nao"
            const pendingItems = [];   // sem resposta

            const isRelevant = (roomKey) => {
                const roomDef = AMBIENTES.find(a => a.id === roomKey);
                if (!roomDef) return false;
                if (roomDef.condicional === 'opcional') {
                    const k = roomKey.toLowerCase();
                    return (mapping || []).some(m => (m || '').toLowerCase().includes(k) || k.includes((m || '').toLowerCase()));
                }
                if (roomDef.condicional === 'bebe' && type !== 'baby' && type !== 'toddler') return false;
                if (roomDef.condicional === 'idoso' && type !== 'senior') return false;
                return true;
            };

            const roomKeys = Object.keys(CHECKLISTS);
            for (const roomKey of roomKeys) {
                if (!isRelevant(roomKey)) continue;

                const roomDef = AMBIENTES.find(a => a.id === roomKey);
                const roomStructure = CHECKLISTS[roomKey];
                const roomAnswers = checklistState[roomKey] || {};
                const knowledge = SafetyKnowledge.getEnvironmentInfo(roomKey, type);
                const envLabel = roomDef ? roomDef.nome : roomKey;
                const envEmoji = roomDef ? roomDef.emoji : '🏠';

                const allItems = [];
                if (roomStructure?.categorias) {
                    roomStructure.categorias.forEach(cat => {
                        if (cat.itens) allItems.push(...cat.itens);
                    });
                }

                // Normaliza texto para comparação robusta
                const normStr = (str) => str
                    ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
                    : "";

                // Lê o estado do item suportando AMBOS os formatos de armazenamento:
                // Novo: array de {text, status} com status='conforme'/'risco'/'na'
                // Legado: objeto chave-valor com valor='sim'/'nao'/'na'
                const getItemAnswer = (titulo) => {
                    if (Array.isArray(roomAnswers)) {
                        const found = roomAnswers.find(i =>
                            normStr(i.text) === normStr(titulo) ||
                            normStr(i.titulo) === normStr(titulo)
                        );
                        if (!found) return undefined;
                        if (found.status === 'conforme' || found.checked === true) return 'sim';
                        if (found.status === 'risco') return 'nao';
                        if (found.status === 'na') return 'na';
                        return undefined;
                    } else {
                        const v = roomAnswers[titulo];
                        if (v === 'sim' || v === true) return 'sim';
                        if (v === 'nao' || v === false) return 'nao';
                        if (v === 'na') return 'na';
                        return undefined;
                    }
                };

                allItems.forEach(q => {
                    const answer = getItemAnswer(q.titulo);
                    const itemKey = `${roomKey}::${q.titulo}`;
                    const implication = getImplication(q, type);
                    const tip = getActionTip(q, knowledge?.tip);

                    const base = {
                        itemKey,
                        roomKey,
                        roomLabel: envLabel,
                        roomEmoji: envEmoji,
                        titulo: q.titulo || '',
                        tags: q.tags || [],
                        implication,
                        tip,
                        acknowledged: acknowledgments[itemKey] || null
                    };

                    if (answer === 'nao' || answer === false) {
                        riskItems.push(base);
                    } else if (answer !== 'sim' && answer !== true) {
                        pendingItems.push(base);
                    }
                });
            }

            // ── 7. SUMÁRIO EXECUTIVO NARRATIVO ─────────────────────────────
            const critCount = riskItems.filter(r => !r.acknowledged).length;
            const ackCount = riskItems.filter(r => r.acknowledged).length;
            const pendingCount = pendingItems.length;

            let executiveSummary;
            const healthContext = hasMeds && type === 'senior'
                ? ` Dado que você faz uso de medicamentos como ${medNames}, o risco de quedas e desequilíbrio merece atenção redobrada.`
                : hasMeds
                    ? ` Há medicamentos registrados — certifique-se de que estão armazenados com segurança.`
                    : '';

            if (critCount === 0 && pendingCount === 0) {
                executiveSummary = `${firstName}, sua vistoria está completa e não há irregularidades ativas. Excelente! Continue revisando periodicamente para manter este nível de proteção.${healthContext}`;
            } else if (critCount === 0 && pendingCount > 0) {
                executiveSummary = `${firstName}, não há riscos confirmados, mas ${pendingCount} item(ns) ainda não foram verificados. Complete a vistoria para um diagnóstico preciso.${healthContext}`;
            } else if (critCount === 1) {
                executiveSummary = `${firstName}, identificamos 1 irregularidade ativa na vistoria. Uma ação simples pode eliminar completamente esse risco.${healthContext}${ackCount > 0 ? ` Você já reconheceu ${ackCount} item(ns) anteriormente.` : ''}`;
            } else {
                executiveSummary = `${firstName}, a vistoria registrou ${critCount} irregularidade(s) ativa(s) distribuídas nos ambientes da sua residência. Abaixo estão as implicações de cada uma e as orientações para resolução.${healthContext}${ackCount > 0 ? ` ${ackCount} item(ns) foram reconhecidos por você anteriormente.` : ''}`;
            }

            // ── 8. CONTEÚDO EDITORIAL ──────────────────────────────────────
            const intro = SafetyKnowledge.getIntro(type);
            const curiosity = SafetyKnowledge.getCuriosity(type);

            return {
                profile,
                reportType: type,
                typeLabel: typeLabel(type, age),
                age,
                moradia: {
                    tipo: tipoMoradia,
                    andar,
                    caracteristicas: caract,
                    location
                },
                health: {
                    hasMeds,
                    medNames,
                    treatments,
                    medicalHistory
                },
                executiveSummary,
                riskItems,      // irregularidades ativas (apenas "nao")
                pendingItems,   // não verificados
                intro,
                curiosity,
                otherProfiles: profiles.filter(p => p.id !== profileId),
                stats: {
                    total: riskItems.length + pendingItems.length,
                    risks: riskItems.length,
                    pending: pendingItems.length,
                    acknowledged: ackCount
                },
                generatedAt: new Date().toISOString()
            };

        } catch (error) {
            if (__DEV__) { console.error('SafetyReportService.getDeepDiveReport error:', error); }
            return null;
        }
    }

    /**
     * Salva o reconhecimento de risco pelo usuário.
     * O item NÃO some do relatório — apenas muda o estado visual.
     */
    async saveAcknowledgment(profileId, itemKey, responsibleName) {
        try {
            const storageKey = `@safety_acknowledgment_${profileId}`;
            const existing = await AsyncStorage.getItem(storageKey);
            const data = existing ? JSON.parse(existing) : {};

            data[itemKey] = {
                responsibleName,
                date: new Date().toISOString()
            };

            await AsyncStorage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            if (__DEV__) { console.error('saveAcknowledgment error:', e); }
            return false;
        }
    }

    /**
     * Retorna todos os reconhecimentos salvos para um perfil.
     */
    async getAcknowledgments(profileId) {
        try {
            const storageKey = `@safety_acknowledgment_${profileId}`;
            const data = await AsyncStorage.getItem(storageKey);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    }

    /**
     * Remove um reconhecimento (caso o usuário queira reabrir o item).
     */
    async removeAcknowledgment(profileId, itemKey) {
        try {
            const storageKey = `@safety_acknowledgment_${profileId}`;
            const existing = await AsyncStorage.getItem(storageKey);
            const data = existing ? JSON.parse(existing) : {};
            delete data[itemKey];
            await AsyncStorage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Gera um hash simples dos dados relevantes para detectar mudanças.
     * Quando o hash muda, o relatório IA precisa ser regenerado.
     */
    async computeDataHash(profileId) {
        try {
            const ProfileService = require('./ProfileService').default;
            const CS = require('./ChecklistService').ChecklistService || require('./ChecklistService').default;

            const profiles = await ProfileService.getAllPerfis();
            const profile = profiles.find(p => p.id === profileId);
            const moradia = await ProfileService.getMoradia();
            const residenceId = await ProfileService.getActiveResidenceId();
            const checklistState = await CS.getAllState(residenceId);

            // Concatena dados relevantes em uma string e gera hash simples
            const dataStr = JSON.stringify({
                nome: profile?.nome,
                tipo: profile?.tipo,
                idade: profile?.idade,
                dataNascimento: profile?.dataNascimento,
                condicoesEspeciais: profile?.condicoesEspeciais,
                tipoImovel: moradia?.tipoImovel || moradia?.tipo,
                caracteristicas: moradia?.caracteristicas,
                estrutura: moradia?.estrutura,
                checklists: checklistState
            });

            // Hash simples (soma de char codes com rotação)
            let hash = 0;
            for (let i = 0; i < dataStr.length; i++) {
                const chr = dataStr.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Converte para int32
            }
            return String(hash);
        } catch (e) {
            if (__DEV__) { console.error('computeDataHash error:', e); }
            return String(Date.now()); // Fallback: sempre diferente → força regeneração
        }
    }

    /**
     * Retorna o Relatório Personalizado IA (Quem, Onde, O Que, Como) em formato estruturado (JSON).
     * Auto-detecta mudanças nos dados via hash e regenera automaticamente quando necessário.
     * @param {string} profileId - ID do morador.
     * @param {boolean} forceRefresh - Força re-geração na OpenAI ignorando o cache local.
     */
    async getAIAugmentedReport(profileId, forceRefresh = false) {
        try {
            const cacheKey = `@ai_report_${profileId}`;
            const currentHash = await this.computeDataHash(profileId);

            if (!forceRefresh) {
                const cached = await AsyncStorage.getItem(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    // Se o hash bate, os dados não mudaram → cache válido
                    if (parsed.dataHash === currentHash) {
                        return parsed;
                    }
                    // Hash diferente → dados mudaram, cache stale (vai regenerar abaixo)
                    console.log('📊 Dados alterados detectados — regenerando relatório IA.');
                }
            }

            // Precisamos dos dados cruzados atuais
            const reportData = await this.getDeepDiveReport(profileId);
            if (!reportData) return null;

            const OpenAIService = require('./OpenAIService').default;

            const aiResponseJSON = await OpenAIService.generateConsultativeReport(reportData);

            if (aiResponseJSON && aiResponseJSON.quem) {
                // Salva cache com hash e timestamp
                const fullResponse = {
                    ...aiResponseJSON,
                    dataHash: currentHash,
                    generatedAt: new Date().toISOString()
                };
                await AsyncStorage.setItem(cacheKey, JSON.stringify(fullResponse));
                return fullResponse;
            }

            return null;
        } catch (error) {
            if (__DEV__) { console.error('Erro getAIAugmentedReport:', error); }
            // Fallback: tenta retornar cache antigo se existir
            try {
                const cached = await AsyncStorage.getItem(`@ai_report_${profileId}`);
                if (cached) return JSON.parse(cached);
            } catch (_) { }
            return null;
        }
    }

    async resolveRisk(profileId, riskTitle) {
        try {
            const key = `@safety_resolution_${profileId}`;
            const json = await AsyncStorage.getItem(key);
            const data = json ? JSON.parse(json) : {};
            data[riskTitle] = { resolved: true, timestamp: new Date().toISOString() };
            await AsyncStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) { return false; }
    }

    async unresolveRisk(profileId, riskTitle) {
        try {
            const key = `@safety_resolution_${profileId}`;
            const json = await AsyncStorage.getItem(key);
            const data = json ? JSON.parse(json) : {};
            delete data[riskTitle];
            await AsyncStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) { return false; }
    }

    async generatePDFReport(profileId) {
        try {
            const reportData = await this.getDeepDiveReport(profileId);
            if (!reportData) throw new Error("Dados do relatório não encontrados");

            const aiReport = await this.getAIAugmentedReport(profileId);
            
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Relatório Vigilaro Care - ${reportData.profile.nome}</title>
                    <style>
                        body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                        h1 { color: #2C3E50; border-bottom: 2px solid #3498DB; padding-bottom: 10px; }
                        h2 { color: #2980B9; margin-top: 30px; }
                        .header { text-align: center; margin-bottom: 40px; }
                        .badge { padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: bold; background: #E1F5FE; color: #01579B; }
                        .summary { background: #F8F9FA; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #3498DB; }
                        .risk-item { margin-bottom: 20px; padding: 15px; border: 1px solid #EEE; border-radius: 8px; }
                        .risk-title { font-weight: bold; color: #C0392B; display: flex; align-items: center; }
                        .room { font-size: 0.8em; color: #7F8C8D; text-transform: uppercase; margin-bottom: 5px; }
                        .tip { background: #E8F5E9; padding: 10px; margin-top: 10px; border-radius: 5px; font-size: 0.9em; }
                        .footer { margin-top: 50px; text-align: center; font-size: 0.8em; color: #95A5A6; border-top: 1px solid #EEE; padding-top: 10px; }
                        .pill { display: inline-block; padding: 2px 8px; background: #EEE; border-radius: 4px; margin-right: 5px; font-size: 0.75em; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Vigilaro Care Neo</h1>
                        <p>Relatório de Segurança e Prevenção de Acidentes</p>
                    </div>

                    <div class="summary">
                        <h2>Sumário para ${reportData.profile.nome}</h2>
                        <p><strong>Perfil:</strong> ${reportData.typeLabel} (${reportData.age} anos)</p>
                        <p><strong>Residência:</strong> ${reportData.moradia.tipo || 'Casa'} - ${reportData.moradia.location || 'Local não informado'}</p>
                        <p>${reportData.executiveSummary}</p>
                    </div>

                    ${aiReport ? `
                    <div class="ai-insight">
                        <h2>Análise Estratégica</h2>
                        <p><strong>Onde focar:</strong> ${aiReport.onde}</p>
                        <p><strong>O que fazer:</strong> ${aiReport.o_que}</p>
                    </div>
                    ` : ''}

                    <h2>Irregularidades Identificadas (${reportData.riskItems.length})</h2>
                    ${reportData.riskItems.length > 0 ? reportData.riskItems.map(item => `
                        <div class="risk-item">
                            <div class="room">${item.roomEmoji} ${item.roomLabel}</div>
                            <div class="risk-title">${item.titulo}</div>
                            <p>${item.implication || 'Risco iminente de acidente doméstico.'}</p>
                            ${item.tip ? `<div class="tip"><strong>Ação Recomendada:</strong> ${item.tip}</div>` : ''}
                            <div>${item.tags.map(t => `<span class="pill">${t}</span>`).join('')}</div>
                        </div>
                    `).join('') : '<p>Parabéns! Nenhuma irregularidade ativa foi encontrada nos ambientes vistoriados.</p>'}

                    ${reportData.pendingItems.length > 0 ? `
                        <h2>Itens Pendentes de Vistoria (${reportData.pendingItems.length})</h2>
                        <p>Atenção: Os ambientes abaixo ainda possuem itens não verificados, o que pode ocultar riscos reais.</p>
                        <ul>
                            ${Array.from(new Set(reportData.pendingItems.map(p => p.roomLabel))).map(room => `<li>${room}</li>`).join('')}
                        </ul>
                    ` : ''}

                    <div class="footer">
                        <p>Gerado em ${new Date(reportData.generatedAt).toLocaleDateString()} às ${new Date(reportData.generatedAt).toLocaleTimeString()}</p>
                        <p>Vigilaro Care - Inteligência de Proteção Familiar</p>
                    </div>
                </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html });
            
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Relatório Vigilaro Care',
                    UTI: 'com.adobe.pdf'
                });
            } else {
                return uri;
            }

            return true;
        } catch (error) {
            if (__DEV__) { console.error('generatePDFReport error:', error); }
            throw error;
        }
    }
}

export default new SafetyReportService();
