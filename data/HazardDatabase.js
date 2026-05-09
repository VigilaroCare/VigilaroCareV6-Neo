import i18next from 'i18next';
import { HAZARD_DATABASE_PT_BR } from './locales/pt-BR/HazardDatabase';
import { HAZARD_DATABASE_PT_PT } from './locales/pt-PT/HazardDatabase';
import { HAZARD_DATABASE_EN } from './locales/en/HazardDatabase';
import { HAZARD_DATABASE_ES } from './locales/es/HazardDatabase';

export const getHazardDatabase = () => {
    const lang = i18next.language || 'pt-BR';
    if (lang === 'en') return HAZARD_DATABASE_EN;
    if (lang === 'es') return HAZARD_DATABASE_ES;
    if (lang === 'pt-PT') return HAZARD_DATABASE_PT_PT;
    return HAZARD_DATABASE_PT_BR;
};

// Proxy para componentes legados que importam HAZARD_DATABASE diretamente
export const HAZARD_DATABASE = new Proxy({}, {
    get: function(target, prop) {
        return getHazardDatabase()[prop];
    },
    ownKeys: function(target) {
        return Object.keys(getHazardDatabase());
    },
    getOwnPropertyDescriptor: function(target, prop) {
        return Object.getOwnPropertyDescriptor(getHazardDatabase(), prop);
    }
});

/**
 * Função para obter lista plana de TODOS os itens mapeáveis
 */
export function getAllHazardItems() {
    let items = [];
    const db = getHazardDatabase();
    Object.keys(db).forEach(key => {
        const area = db[key];
        const labeledItems = area.items.map(i => ({ ...i, areaId: key, areaLabel: area.label }));
        items = [...items, ...labeledItems];
    });
    return items;
}

/**
 * Função inteligente de filtro
 */
export function getRisksForProfile(inventoryIds, userProfiles) {
    const risks = [];
    const db = getHazardDatabase();

    // Para cada item que o usuário TEM
    inventoryIds.forEach(itemId => {
        let foundItem = null;
        Object.keys(db).forEach(key => {
            const item = db[key].items.find(i => i.id === itemId);
            if (item) foundItem = item;
        });

        if (foundItem) {
            risks.push({
                itemId: foundItem.id,
                itemLabel: foundItem.label,
                riskLevel: foundItem.riskLevel,
                hazards: foundItem.hazards,
                expert_tip: foundItem.expert_tip
            });
        }
    });

    return risks;
}
