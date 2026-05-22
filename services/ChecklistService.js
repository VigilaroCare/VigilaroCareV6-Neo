import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAreaRelevant } from '../utils/ProfileFilterEngine';
import TimelineService from './TimelineService'; // Added F-05
import AchievementService from './AchievementService'; // Added F-07

const STORAGE_KEY_PREFIX = "@checklist_state_";
let stateCache = {};
let _ProfileService = null, _FilterEngine = null, _MapeamentoDados = null;

const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

export const ChecklistService = {
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

    // Salva o estado de um item específico
    saveItemState: async (areaId, itemTitulo, isChecked, residenceId = null) => {
        try {
            const key = await ChecklistService.getStorageKey(residenceId);

            // Garantir que o cache está carregado
            if (!stateCache[key]) {
                await ChecklistService.getAllState(residenceId);
            }

            const currentData = stateCache[key] || {};

            if (!currentData[areaId]) {
                currentData[areaId] = {};
            }

            currentData[areaId][itemTitulo] = isChecked;

            // F-05: Registra no Histórico de Melhorias quando uma ação preventiva é marcada como segura
            if (isChecked === true) {
                TimelineService.logMelhoria(areaId, itemTitulo);
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

            const data = json ? JSON.parse(json) : {};
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
            currentData[areaId] = itemsArray;

            stateCache[key] = currentData;
            await AsyncStorage.setItem(key, JSON.stringify(currentData));
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar estado do ambiente:', error); }
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

    getAreaStats: (areaId, areaData = {}, structure = null, profiles = [], moradia = null) => {
        if (!_FilterEngine) _FilterEngine = require('../utils/ProfileFilterEngine');
        let stats = { checked: 0, na: 0, total: 0, warning: 0, critical: 0, failedItems: [] };
        let items = [];

        if (structure && structure.categorias) structure.categorias.forEach(cat => { if (cat.itens) items = [...items, ...cat.itens]; });
        else if (Array.isArray(areaData) && areaData.length > 0) items = areaData;
        // BUG-05 FIX: Formato legado — areaData como objeto { itemTitulo: status }
        else if (areaData && typeof areaData === 'object' && !Array.isArray(areaData) && Object.keys(areaData).length > 0) {
            items = Object.keys(areaData).map(k => ({ titulo: k, status: areaData[k] }));
        }
        else return stats;

        // OTIMIZAÇÃO: Hash Map O(1)
        const areaDataMap = {};
        const isArrayData = Array.isArray(areaData);
        if (isArrayData) areaData.forEach(i => { if (i.text || i.titulo) areaDataMap[normalizeString(i.text || i.titulo)] = i; });

        items.forEach(schemaItem => {
            if (!_FilterEngine.isItemRelevant(schemaItem, profiles, moradia)) return;

            const itemKey = schemaItem.titulo || schemaItem.text;
            let found = isArrayData ? areaDataMap[normalizeString(itemKey)] : (areaData[itemKey] !== undefined ? { status: areaData[itemKey] === 'na' ? 'na' : (areaData[itemKey] === true ? 'conforme' : 'pendente'), checked: areaData[itemKey] === true } : null);

            let isChecked = found && (found.status === 'conforme' || found.checked);
            let isNA = found && found.status === 'na';

            if (isNA) { stats.na++; return; }
            stats.total++;
            if (isChecked) {
                stats.checked++;
            } else { 
                const isCrit = schemaItem.tipo === 'perigo';
                isCrit ? stats.critical++ : stats.warning++; 
                stats.failedItems.push({ titulo: schemaItem.titulo || schemaItem.text, isCritical: isCrit, dica: schemaItem.dica_seguranca || '' });
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

                const areaStats = ChecklistService.getAreaStats(area.id, areaData, structure, profiles, moradia);

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
