const fs = require('fs');
const path = require('path');

// Manually read the files and evaluate them
const mapeamentoRaw = fs.readFileSync(path.join(__dirname, 'data/mapeamento_dados.js'), 'utf-8');
const filterEngineRaw = fs.readFileSync(path.join(__dirname, 'utils/ProfileFilterEngine.js'), 'utf-8');
const checklistRaw = fs.readFileSync(path.join(__dirname, 'services/ChecklistService.js'), 'utf-8');

// We can just use string extraction since we know the structure
const areaServicoStr = mapeamentoRaw.substring(mapeamentoRaw.indexOf('area_servico: {'), mapeamentoRaw.indexOf('despensa: {'));

console.log("Found area_servico in mapeamento_dados.js:", areaServicoStr.length > 100);

// Let's create a mock FilterEngine and test getAreaStats
const mockFilterEngine = {
    isItemRelevant: () => true // Assume all items are relevant
};

// Extracted from ChecklistService.getAreaStats
const getAreaStats = (areaId, areaData = {}, structure = null, profiles = [], moradia = null) => {
    let stats = { checked: 0, na: 0, total: 0, warning: 0, critical: 0, failedItems: [] };
    let items = [];

    if (structure && structure.categorias) structure.categorias.forEach(cat => { if (cat.itens) items = [...items, ...cat.itens]; });
    else if (Array.isArray(areaData) && areaData.length > 0) items = areaData;
    else if (areaData && typeof areaData === 'object' && !Array.isArray(areaData) && Object.keys(areaData).length > 0) {
        items = Object.keys(areaData).map(k => ({ titulo: k, status: areaData[k] }));
    }
    else return stats;

    const areaDataMap = {};
    const isArrayData = Array.isArray(areaData);
    if (isArrayData) areaData.forEach(i => { if (i.text || i.titulo) areaDataMap[i.text || i.titulo] = i; });

    items.forEach(schemaItem => {
        if (!mockFilterEngine.isItemRelevant(schemaItem, profiles, moradia)) return;
        stats.total++;
    });

    return stats;
};

// We need to parse structure from mapeamentoRaw... 
// Actually, let's just count the items manually
const matchItems = areaServicoStr.match(/titulo:/g);
console.log("Total items found in area_servico:", matchItems ? matchItems.length : 0);
