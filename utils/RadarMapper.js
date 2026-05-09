
// utils/RadarMapper.js

export const getSmartRadarData = (mode, checklistsMap, userMapping) => {
    // checklistsMap: Objeto com status dos checklists { 'kitchen': { ... }, ... }
    // userMapping: Array de strings ['kitchen', 'living_room', ...]

    const calcScore = (keys) => {
        const keyList = Array.isArray(keys) ? keys : [keys];
        let total = 0;
        let count = 0;

        keyList.forEach(k => {
            const state = checklistsMap[k] || {};
            const itemsChecked = Object.values(state).filter(v => v === true).length;
            // Base: 6 itens por ambiente para 100% (ajustável)
            const progress = Math.min((itemsChecked / 6) * 100, 100);

            // Considera se está mapeado explicitamente ou se tem progresso
            if ((userMapping && userMapping.includes(k)) || itemsChecked > 0) {
                total += progress;
                count++;
            }
        });

        if (count === 0) return 0;
        return Math.round(total / count);
    };

    // Helper para verificar existência (Dinâmico)
    const exists = (keys) => {
        if (!userMapping) return true; // Se não houver mapping passado, assume tudo (fallback)
        const keyList = Array.isArray(keys) ? keys : [keys];
        return keyList.some(k => userMapping.includes(k) || (checklistsMap[k] && Object.keys(checklistsMap[k]).length > 0));
    };

    // Definição dos Eixos Explodidos (Granulares)
    // Cada item aqui será uma ponta no gráfico se 'exists' for true

    // INTERNO
    const dadosInternos = [
        { key: 'sala', label: 'Sala', keys: ['living_room', 'sala'] },
        { key: 'copa', label: 'Copa', keys: ['dining_room', 'copa', 'jantar'] },
        { key: 'cozinha', label: 'Cozinha', keys: ['kitchen', 'cozinha'] },
        { key: 'quartos', label: 'Quartos', keys: ['bedroom_master', 'bedroom_single', 'quartos', 'bedroom_guest'] },
        { key: 'kids', label: 'Infantil', keys: ['bedroom_kids', 'bedroom_baby', 'quarto_infantil'] },
        { key: 'banheiros', label: 'Banheiros', keys: ['bathroom', 'banheiro', 'suite'] },
        { key: 'lavanderia', label: 'Lavanderia', keys: ['laundry', 'area_servico'] },
        { key: 'escadas', label: 'Escadas', keys: ['stairs', 'escadas'] },
        { key: 'corredores', label: 'Corredores', keys: ['hallway', 'corredor'] },
        { key: 'escritorio', label: 'Escritório', keys: ['office', 'escritorio'] },
    ];

    // EXTERNO
    const dadosExternos = [
        { key: 'garagem', label: 'Garagem', keys: ['garage', 'garagem'] },
        { key: 'quintal', label: 'Quintal', keys: ['garden', 'quintal', 'yard'] },
        { key: 'piscina', label: 'Piscina', keys: ['pool', 'piscina'] },
        { key: 'churrasqueira', label: 'Lazer', keys: ['barbecue', 'playground', 'lazer'] },
        { key: 'varanda', label: 'Varanda', keys: ['balcony', 'varanda', 'sacadas'] },
        { key: 'entrada', label: 'Acessos', keys: ['entrance', 'portao', 'windows'] }, // Windows em externo? Ou 'Perimetral'
        { key: 'oficina', label: 'Oficina', keys: ['workshop', 'oficina', 'deposito'] },
    ];

    // Função de montagem
    const buildData = (sourceArray) => {
        return sourceArray
            .filter(item => exists(item.keys)) // Auto-filtro (Smart Chart)
            .map(item => ({
                key: item.key,
                label: item.label,
                value: calcScore(item.keys)
            }));
    };

    if (mode === 'Interno') return buildData(dadosInternos);
    if (mode === 'Externo') return buildData(dadosExternos);
    if (mode === 'Completo') return [...buildData(dadosInternos), ...buildData(dadosExternos)];

    // Fallback para o modo 'Geral' (Agrupado 5 eixos)
    return [
        { key: 'convivencia', label: 'Convivência', value: calcScore(['living_room', 'sala', 'kitchen', 'cozinha', 'dining_room']) },
        { key: 'descanso', label: 'Descanso', value: calcScore(['bedroom_master', 'bedroom_kids', 'bathroom', 'bedroom_single']) },
        { key: 'servicos', label: 'Serviços', value: calcScore(['laundry', 'garage', 'storage', 'oficina']) },
        { key: 'lazer', label: 'Lazer', value: calcScore(['garden', 'pool', 'playground', 'barbecue']) },
        { key: 'circulacao', label: 'Circulação', value: calcScore(['stairs', 'balcony', 'hallway']) },
    ];
};
