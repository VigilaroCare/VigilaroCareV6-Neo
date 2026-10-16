import AsyncStorage from "@react-native-async-storage/async-storage";
import TimelineService from './TimelineService'; // Added F-05
import AchievementService from './AchievementService'; // Added F-07

const STORAGE_KEY_PREFIX = "@checklist_state_";
let stateCache = {};
let _ProfileService = null, _FilterEngine = null, _MapeamentoDados = null;

const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

// ---------------------------------------------------------------------------
// Identidade do item da vistoria (D18)
//
// A resposta e gravada pelo `id` fixo do item de `mapeamento_dados.js`. Antes
// era gravada pelo TEXTO do titulo, em dois formatos diferentes no mesmo balde
// do ambiente: lista `[{ text, status }]` (vistoria guiada, plano de acao) e
// mapa `{ titulo: true|'na' }` (revisao de pendencias, roteiro das areas). Dois
// defeitos silenciosos vinham dai: toda revisao de texto apagava a resposta, e
// gravar no formato mapa sobre um balde lista criava propriedade em array, que
// o JSON.stringify descarta \u2014 a resposta sumia sem erro.
//
// Formato unico, garantido por `migrarEstado` em toda leitura:
//   estado[ambiente] = [{ id, text, status: 'conforme'|'risco'|'na', checked }]
//   estado['roteiro_' + ambiente] = { passoPtBR: true|'na' }  (AreasInternas)
// Leitura de resposta: SEMPRE por `ChecklistService.respostaDe` /
// `respostasDaArea`. Nao compare texto na tela.
// ---------------------------------------------------------------------------

const PREFIXO_ROTEIRO = 'roteiro_';
const chaveRoteiro = (areaId) => `${PREFIXO_ROTEIRO}${areaId}`;

let _indice = null;
const indiceDeItens = () => {
    if (_indice) return _indice;
    const { CHECKLISTS, TITULOS_ANTERIORES = {} } = require('../data/mapeamento_dados');
    const porId = {};
    const porTitulo = {}; // titulo normalizado -> [ids]
    const add = (titulo, id) => {
        const k = normalizeString(titulo);
        if (k) (porTitulo[k] = porTitulo[k] || []).push(id);
    };
    Object.keys(CHECKLISTS).forEach((area) => (CHECKLISTS[area].categorias || []).forEach((cat) => (cat.itens || []).forEach((item) => {
        if (!item.id) return;
        porId[item.id] = { titulo: item.titulo, area };
        add(item.titulo, item.id);
    })));
    Object.entries(TITULOS_ANTERIORES).forEach(([id, titulos]) => titulos.forEach((t) => add(t, id)));
    _indice = { porId, porTitulo, areas: new Set(Object.keys(CHECKLISTS)) };
    return _indice;
};

/**
 * Id do item a partir do id gravado ou do texto (atual ou anterior). Um mesmo
 * titulo existe em mais de um ambiente (ex.: cabos de panela na cozinha e no
 * ambiente integrado) \u2014 prefere o item do proprio ambiente.
 */
const resolverId = (areaId, idGravado, texto) => {
    const { porId, porTitulo } = indiceDeItens();
    if (idGravado && porId[idGravado]) return idGravado;
    const ids = porTitulo[normalizeString(texto)];
    if (!ids || ids.length === 0) return null;
    return ids.find((id) => porId[id].area === areaId) || ids[0];
};

const normalizarStatus = (v) => {
    if (v === true || v === 'sim' || v === 'conforme') return 'conforme';
    if (v === false || v === 'nao' || v === 'risco') return 'risco';
    if (v === 'na') return 'na';
    return null;
};

const statusDaEntrada = (e) => {
    if (!e) return null;
    const s = normalizarStatus(e.status);
    if (s) return s;
    return e.status == null && e.checked === true ? 'conforme' : null;
};

const entradaCanonica = (id, status) => {
    const { porId } = indiceDeItens();
    return { id, text: porId[id].titulo, status, checked: status === 'conforme' };
};

/** Converte o balde de um ambiente para a lista canonica. Nao apaga dado que nao reconhece. */
const migrarArea = (areaId, balde) => {
    const lista = [];
    const posicao = {};
    let roteiro = null;
    const gravar = (id, entrada) => {
        if (id in posicao) lista[posicao[id]] = entrada;
        else { posicao[id] = lista.length; lista.push(entrada); }
    };
    if (Array.isArray(balde)) {
        balde.forEach((e) => {
            if (!e) return;
            const id = resolverId(areaId, e.id, e.text || e.titulo);
            if (!id) { lista.push(e); return; } // orfao: guarda como esta
            const status = statusDaEntrada(e);
            if (status) gravar(id, entradaCanonica(id, status));
        });
    } else if (balde && typeof balde === 'object') {
        Object.entries(balde).forEach(([chave, valor]) => {
            const id = resolverId(areaId, chave, chave);
            if (!id) { (roteiro = roteiro || {})[chave] = valor; return; } // passo do roteiro
            const status = normalizarStatus(valor);
            if (status) gravar(id, entradaCanonica(id, status));
        });
    }
    return { lista, roteiro };
};

export const ChecklistService = {
    /**
     * Normaliza o estado gravado para o formato unico (ver topo do ficheiro).
     * Pura: devolve { estado, mudou } sem tocar no storage.
     */
    migrarEstado: (dados) => {
        const { areas } = indiceDeItens();
        const estado = { ...(dados || {}) };
        let mudou = false;
        Object.keys(dados || {}).forEach((chave) => {
            const balde = dados[chave];
            if (areas.has(chave)) {
                const { lista, roteiro } = migrarArea(chave, balde);
                if (JSON.stringify(lista) !== JSON.stringify(balde)) { estado[chave] = lista; mudou = true; }
                if (roteiro) {
                    estado[chaveRoteiro(chave)] = { ...roteiro, ...(estado[chaveRoteiro(chave)] || {}) };
                    mudou = true;
                }
            } else if (!chave.startsWith(PREFIXO_ROTEIRO) && !chave.startsWith('custom_')
                && balde && typeof balde === 'object' && !Array.isArray(balde)) {
                // Roteiro de area sem vistoria propria, gravado antes da separacao.
                estado[chaveRoteiro(chave)] = { ...balde, ...(estado[chaveRoteiro(chave)] || {}) };
                delete estado[chave];
                mudou = true;
            }
        });
        return { estado, mudou };
    },

    /** Chave do balde de respostas do roteiro (AreasInternasScreen) de uma area. */
    chaveRoteiro,

    /** Id fixo do item a partir de um id ou de um titulo (atual ou anterior); null se nao for item. */
    idDoItem: (areaId, idOuTitulo) => resolverId(areaId, idOuTitulo, idOuTitulo),

    /**
     * Resposta de UM item: 'conforme' | 'risco' | 'na' | null (sem resposta).
     * Casa pelo id e, na falta dele, pelo titulo (atual ou anterior).
     */
    respostaDe: (areaData, item) => ChecklistService.respostasDaArea(areaData)(item),

    /** Igual a `respostaDe`, indexado uma vez para varrer muitos itens. */
    respostasDaArea: (areaData) => {
        const porId = {};
        const porTexto = {};
        if (Array.isArray(areaData)) {
            areaData.forEach((e) => {
                if (!e) return;
                const s = statusDaEntrada(e);
                if (e.id) porId[e.id] = s;
                const k = normalizeString(e.text || e.titulo);
                if (k) porTexto[k] = s;
            });
        } else if (areaData && typeof areaData === 'object') {
            Object.entries(areaData).forEach(([k, v]) => {
                porId[k] = normalizarStatus(v);
                porTexto[normalizeString(k)] = normalizarStatus(v);
            });
        }
        return (item) => {
            if (!item) return null;
            if (item.id && porId[item.id] !== undefined) return porId[item.id];
            const s = porTexto[normalizeString(item.titulo || item.text)];
            return s === undefined ? null : s;
        };
    },

    /**
     * Retorna os perfis que declaram USAR um cômodo específico.
     * Fundamento do RiskInterpreter (D4) — permite priorizar riscos
     * por contexto humano (ex: idosa Maria usa quarto X com escada).
     *
     * IMPORTANTE: este helper depende do schema v2 (comodosUsados[]).
     * Perfis pré-migração têm comodosUsados preenchido pela
     * ProfileService.migrateProfilesV2 com todos os cômodos do mapping.
     *
     * @param {string} roomId - id do cômodo (ex: 'cozinha', 'quarto_idoso')
     * @returns {Promise<Array>} Lista de perfis que usam o cômodo
     */
    getResidentsOfRoom: async (roomId) => {
        if (!roomId) return [];
        const ProfileService = require('./ProfileService').default;
        const perfis = await ProfileService.getPerfis();
        return perfis.filter((p) => Array.isArray(p.comodosUsados) && p.comodosUsados.includes(roomId));
    },

    // Helper para obter todos os itens de um ambiente em uma lista plana
    getFlattenedItems: (roomId) => {
        const { CHECKLISTS } = require('../data/mapeamento_dados');
        const data = CHECKLISTS[roomId];
        if (!data || !data.categorias) return [];

        let flat = [];
        data.categorias.forEach(cat => {
            if (cat.itens) {
                cat.itens.forEach(item => {
                    flat.push({ 
                        ...item, 
                        text: item.titulo, // Alias para compatibilidade
                        category: cat.nome 
                    });
                });
            }
        });
        return flat;
    },

    // Helper para gerar chave baseada na residência
    getStorageKey: async (residenceId) => {
        // Dynamic require to prevent circular dependency
        const ProfileService = require("./ProfileService").default;
        const id = residenceId || await ProfileService.getActiveResidenceId();
        return `${STORAGE_KEY_PREFIX}${id}`;
    },

    // Limpa o cache em memória (usado para reset)
    clearCache: () => {
        stateCache = {};
        console.log("ChecklistService cache cleared.");
    },

    /**
     * Grava a resposta de UM item da vistoria.
     * @param {string} areaId - ambiente (balde) onde a resposta vive
     * @param {object|string} item - o item ({ id, titulo }) ou, por compatibilidade, o id/titulo
     * @param {*} valor - 'conforme'|'risco'|'na'|null, ou true/false/'sim'/'nao' (legado)
     */
    saveItemState: async (areaId, item, valor, residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);

            // Garantir que o cache está carregado
            if (!stateCache[key]) {
                await ChecklistService.getAllState(residenceId);
            }

            const currentData = stateCache[key] || {};

            const id = typeof item === 'object' && item
                ? resolverId(areaId, item.id, item.titulo || item.text)
                : resolverId(areaId, item, item);
            if (!id) {
                // Nao e item de vistoria: gravar seria criar resposta que nenhuma tela le.
                if (__DEV__) console.warn('[ChecklistService] item sem id de vistoria, nada gravado:', areaId, item);
                return false;
            }

            const status = normalizarStatus(valor);
            const lista = migrarArea(areaId, currentData[areaId]).lista;
            const i = lista.findIndex((e) => e && e.id === id);
            if (status === null) {
                if (i >= 0) lista.splice(i, 1);
            } else if (i >= 0) {
                lista[i] = entradaCanonica(id, status);
            } else {
                lista.push(entradaCanonica(id, status));
            }
            currentData[areaId] = lista;

            // F-05: Registra no Histórico de Melhorias quando uma ação preventiva é marcada como segura
            if (status === 'conforme') {
                TimelineService.logMelhoria(areaId, indiceDeItens().porId[id].titulo);
                // F-07: Conquistas e XP
                AchievementService.grantChecklistPoint();
                AchievementService.grantFirstInspection();
            }

            // Atualiza Cache
            stateCache[key] = currentData;

            // Persiste no Storage
            await AsyncStorage.setItem(key, JSON.stringify(currentData));

            // Registra timestamp da última verificação
            await AsyncStorage.setItem('@vigilaro_last_check', new Date().toISOString());

            return true;
        } catch (error) {
            if (__DEV__) { console.error("CRITICAL ERROR saveItemState:", error); }
            return false;
        }
    },

    // Retorna a data da última verificação feita pelo usuário
    getLastCheckDate: async () => {
        try {
            const iso = await AsyncStorage.getItem('@vigilaro_last_check');
            return iso ? new Date(iso) : null;
        } catch {
            return null;
        }
    },

    // Recupera todo o estado do checklist da residência ATIVA (ou da informada)
    getAllState: async (residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);

            // Tenta ler da chave por residência
            let json = await AsyncStorage.getItem(key);

            // MIGRAÇÃO LEGADA: Se não há dados por residência mas existe a chave global antiga,
            // migra automaticamente para a chave da residência e apaga a global.
            if (!json) {
                const legacyJson = await AsyncStorage.getItem('checklistItems');
                if (legacyJson) {
                    console.log('[ChecklistService] Migrando dados legados para chave por residência:', key);
                    await AsyncStorage.setItem(key, legacyJson);
                    await AsyncStorage.removeItem('checklistItems');
                    json = legacyJson;
                }
            }

            const bruto = json ? JSON.parse(json) : {};
            const { estado: data, mudou } = ChecklistService.migrarEstado(bruto);
            if (mudou) await AsyncStorage.setItem(key, JSON.stringify(data));
            stateCache[key] = data; // Atualiza cache
            return data;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao ler checklist:', error); }
            return {};
        }
    },

    // Salva o array de itens de uma área (substitui a área inteira)
    saveRoomState: async (areaId, itemsArray, residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);

            // Garante que o cache está carregado
            if (!stateCache[key]) {
                await ChecklistService.getAllState(residenceId);
            }

            const currentData = stateCache[key] || {};
            // Normaliza na entrada: id fixo, texto atual, sem objetos pesados
            // (itemObj/categoryObj) e sem duplicata do mesmo item.
            currentData[areaId] = indiceDeItens().areas.has(areaId)
                ? migrarArea(areaId, itemsArray).lista
                : itemsArray;

            stateCache[key] = currentData;
            await AsyncStorage.setItem(key, JSON.stringify(currentData));
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar estado do ambiente:', error); }
            return false;
        }
    },

    /**
     * Roteiro das areas (AreasInternasScreen): passos de `areas_internas.js`,
     * que NAO sao itens da vistoria e vivem em balde proprio. Chave = texto do
     * passo em pt-BR (independe do idioma da tela).
     */
    saveRoteiroState: async (areaId, passoPtBR, valor, residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);
            if (!stateCache[key]) await ChecklistService.getAllState(residenceId);
            const currentData = stateCache[key] || {};
            const chave = chaveRoteiro(areaId);
            const balde = { ...(currentData[chave] || {}) };
            if (valor === null || valor === undefined) delete balde[passoPtBR];
            else balde[passoPtBR] = valor;
            currentData[chave] = balde;
            stateCache[key] = currentData;
            await AsyncStorage.setItem(key, JSON.stringify(currentData));
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar roteiro:', error); }
            return false;
        }
    },

    // Apaga todos os dados de checklist de uma residência específica
    clearResidenceData: async (residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);
            await AsyncStorage.removeItem(key);
            delete stateCache[key];
            console.log('[ChecklistService] Dados da residência apagados:', key);
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao apagar dados da residência:', error); }
            return false;
        }
    },

    // Retorna o estado de um ambiente específico
    getRoomState: async (areaId, residenceId = null) => {
        const allState = await ChecklistService.getAllState(residenceId);
        return allState[areaId] || {}; // BUG-14 FIX: {} em vez de [] — formato padrão dos callers
    },

    // Calcula o progresso de PREENCHIMENTO de uma área específica
    getAreaProgress: async (areaId, totalItems, residenceId = null) => {
        const allState = await ChecklistService.getAllState(residenceId);
        const areaData = allState[areaId];

        let answeredCount = 0;

        if (Array.isArray(areaData)) {
            // Formato novo: Conta qualquer resposta (Conforme, Risco ou NA)
            answeredCount = areaData.filter(i =>
                i.status === 'conforme' ||
                i.status === 'risco' ||
                i.status === 'na' ||
                (i.checked === true) // Legacy compat
            ).length;

        } else if (areaData && typeof areaData === 'object') {
            // Formato legado: Conta chaves que não são nulas
            answeredCount = Object.values(areaData).filter(val => val !== null && val !== undefined).length;
        }

        // Percentual de Conclusão da Vistoria
        const percentage = totalItems > 0 ? Math.round((answeredCount / totalItems) * 100) : 0;

        return {
            checked: answeredCount,
            total: totalItems,
            percentage: Math.min(percentage, 100) // Cap at 100
        };
    },

    // Obter checklist filtrado pelo briefing
    getFilteredChecklist: (fullChecklist, briefing) => {
        if (!briefing) return fullChecklist; // Se não tem briefing, mostra tudo (ou padrão)

        return fullChecklist.map(area => {
            // Filtra itens dentro da área
            const filteredItems = area.itens.filter(item => {
                // Se o item não tem tags, exibe sempre
                if (!item.tags || item.tags.length === 0) return true;

                // Verifica se alguma tag do item bate com o briefing
                const hasMatchingFeature = item.tags.some(tag =>
                    briefing.caracteristicas.includes(tag) || briefing.tipo === tag
                );

                return hasMatchingFeature;
            });

            return { ...area, itens: filteredItems };
        }).filter(area => area.itens.length > 0); // Remove áreas vazias
    },

    getAreaStats: (areaId, areaData = {}, structure = null, profiles = [], moradia = null, mapping = []) => {
        if (!_FilterEngine) _FilterEngine = require('../utils/ProfileFilterEngine');
        // `respondidos` conta item com resposta REGISTRADA, qualquer que seja
        // ela. É diferente de `checked`, que só conta o que está conforme.
        // Sem essa distinção, uma vistoria inteiramente respondida e
        // inteiramente reprovada dava checked=0 e era lida como "vistoria não
        // iniciada" — o pior caso recebia o sinal mais brando de todos.
        let stats = { checked: 0, na: 0, total: 0, warning: 0, critical: 0, respondidos: 0, failedItems: [] };
        let items = [];

        const dynamicStructure = _FilterEngine.getRoomChecklistStructure(areaId, profiles, moradia, mapping);
        if (dynamicStructure && dynamicStructure.categorias && dynamicStructure.categorias.length > 0) {
            dynamicStructure.categorias.forEach(cat => { if (cat.itens) items = [...items, ...cat.itens]; });
        } else if (structure && structure.categorias) {
            structure.categorias.forEach(cat => { if (cat.itens) items = [...items, ...cat.itens]; });
        } else if (Array.isArray(areaData) && areaData.length > 0) {
            items = areaData;
        } else if (areaData && typeof areaData === 'object' && !Array.isArray(areaData) && Object.keys(areaData).length > 0) {
            items = Object.keys(areaData).map(k => ({ titulo: k, status: areaData[k] }));
        } else {
            return stats;
        }

        const respostaDe = ChecklistService.respostasDaArea(areaData);

        items.forEach(schemaItem => {
            if (!_FilterEngine.isItemRelevant(schemaItem, profiles, moradia)) return;

            const resposta = respostaDe(schemaItem);
            const isChecked = resposta === 'conforme';
            const isNA = resposta === 'na';

            if (resposta) stats.respondidos++;

            if (isNA) { stats.na++; return; }
            stats.total++;
            if (isChecked) {
                stats.checked++;
            } else { 
                const isCrit = schemaItem.tipo === 'perigo';
                isCrit ? stats.critical++ : stats.warning++; 
                stats.failedItems.push({ id: schemaItem.id, titulo: schemaItem.titulo || schemaItem.text, isCritical: isCrit, dica: schemaItem.dica_seguranca || '', tags: schemaItem.tags || [] });
            }
        });

        return stats;
    },

    // Calcula a pontuação global de segurança da casa
    // Retorna estatísticas detalhadas (Verde, Amarelo, Vermelho)
    // ACTUALIZADO: Aceita { moradia, profiles, mapping } ou (allAreasDefinition, residenceId, mapping) legado
    getGlobalSafetyBreakdown: async (allAreasDefinition, residenceId = null, mapping = [], moradia = null, profiles = []) => {
        const allState = await ChecklistService.getAllState(residenceId);
        const { CHECKLISTS } = require('../data/mapeamento_dados');
        const { isAreaRelevant } = require('../utils/ProfileFilterEngine');

        let stats = {
            safe: 0,      // Checked (Verde)
            warning: 0,   // Unchecked Normal/Sugestão (Amarelo)
            critical: 0,  // Unchecked Perigo (Vermelho)
            total: 0,
            percentage: 0
        };

        allAreasDefinition.forEach(area => {
            const relevant = isAreaRelevant(area, moradia, profiles, mapping);

            if (relevant) {
                const areaData = allState[area.id] || {};
                const structure = CHECKLISTS[area.id];

                const areaStats = ChecklistService.getAreaStats(area.id, areaData, structure, profiles, moradia, mapping);

                stats.total += areaStats.total;
                stats.safe += areaStats.checked;
                stats.warning += areaStats.warning;
                stats.critical += areaStats.critical;
            }
        });

        stats.percentage = stats.total > 0 ? Math.round((stats.safe / stats.total) * 100) : 0;
        return stats;
    },

    // Calcula a pontuação global de segurança da casa
    getGlobalSafetyScore: async (allAreasDefinition, residenceId = null, mapping = []) => {
        const stats = await ChecklistService.getGlobalSafetyBreakdown(allAreasDefinition, residenceId, mapping);
        return stats.percentage;
    },

    // Reseta todo o checklist (para nova auditoria)
    resetChecklist: async (residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);
            await AsyncStorage.removeItem(key);
            // Limpa cache também
            delete stateCache[key];
            return true;
        } catch (error) {
            return false;
        }
    }
};

export default ChecklistService;
