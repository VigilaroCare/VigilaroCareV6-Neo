/**
 * ProfileFilterEngine.js
 * FONTE ÚNICA DE VERDADE para filtragem de checklists por perfil.
 * Vigilaro Care V6
 *
 * Uso: import { getRelevantAreas } from '../utils/ProfileFilterEngine';
 * Entrada: (moradia, profiles, mapping)
 * Saída: Array de IDs de áreas relevantes para este contexto.
 */

/**
 * Mapa de triggers: para áreas 'opcional', quais IDs do mapping ativam essa área.
 * Os IDs do mapping são os salvos por ProfileService.saveMapping() via HousingOptions.js.
 */
export const MAPPING_TRIGGERS = {
    piscina: ['piscina', 'piscina_coletiva'],
    parquinho: ['parquinho', 'playground_coletivo'],
    escadas: ['escadas_internas', 'escadas'],
    quintal: ['quintal', 'quadra_esportiva', 'frente'],
    jardim_horta: ['jardim', 'horta', 'jardinagem_ativa', 'pomar'],
    garagem: ['garagem'],
    deposito: ['deposito_oficina', 'sotao_porao', 'ferramentas'],
    oficina: ['deposito_oficina', 'ferramentas', 'oficina_ext', 'oficina_domestica'],
    sotao: ['sotao_porao'],
    porao: ['sotao_porao'],
    canil: ['area_pet'],
    central_gas: ['central_gas', 'gas_encanado', 'botijao', 'botijao_gas'],
    despensa: ['despensa'],
    copa: ['copa'], // Separado da sala
    varanda: ['sacada', 'varanda_externa', 'varanda', 'terraco'],
    hall_corredor: ['corredor', 'hall', 'elevador_hall', 'corredores'],
    quarto_adulto: ['quarto_casal', 'quarto_solteiro', 'quarto_hospedes', 'quarto_adolescente', 'escritorio', 'quarto_pcd', 'quarto_adulto'],
    quarto_bebe: ['quarto_bebe'], 
    quarto_crianca: ['quarto_infantil', 'brinquedoteca', 'quarto_crianca'], 
    quarto_idoso: ['quarto_idoso'],
    area_servico: ['lavanderia', 'area_servico', 'lavanderia_interna'],
    cozinha: ['cozinha', 'cozinha_americana', 'cozinha_tradicional'],
    sala: ['sala_estar', 'sala_jantar', 'sala', 'sala_tv'],
    banheiro: ['banheiro_social', 'banheiro_suite', 'lavabo', 'banheiro'],
};


/**
 * Calcula a idade em anos a partir de uma data de nascimento (string ISO ou Date).
 */
function calcularIdade(dataNascimento) {
    if (!dataNascimento) return null;
    try {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
        return idade;
    } catch (error) {
        return null;
    }
}

/**
 * Verifica se uma área é relevante para o perfil e moradia informados.
 *
 * @param {Object} area - Objeto de AMBIENTES (com id e condicional)
 * @param {Object} moradia - Objeto salvo por ProfileService.saveMoradia()
 * @param {Array}  profiles - Array de perfis residentes (com dataNascimento, tipo)
 * @param {Array}  mapping - Array de IDs das áreas/itens selecionados no wizard (saveMapping)
 * @returns {boolean}
 */
export function isAreaRelevant(area, moradia, profiles, mapping) {
    const safeMapping = Array.isArray(mapping) ? mapping : [];
    const safeProfiles = Array.isArray(profiles) ? profiles : [];
    const safeMoradia = moradia || {};

    const isStudioLike = ['studio', 'loft', 'kitnet'].includes(safeMoradia.tipo || safeMoradia.tipoImovel);

    if (isStudioLike) {
        // Se for um studio/loft/kitnet, os cômodos de estar, cozinha e quarto adulto são absorvidos pela Área Integrada.
        if (area.id === 'ambiente_integrado') return true;
        if (['sala', 'cozinha', 'quarto_adulto'].includes(area.id)) return false;
    } else {
        // Se não for um studio, a Área Integrada não é relevante.
        if (area.id === 'ambiente_integrado') return false;
    }

    const { condicional } = area;

    // --- Sem condicional: sempre exibir ---
    if (!condicional) return true;

    // --- Relevância baseada no MAPPING NOMINAL ---
    // Mesmo para checklists condicionais (bebe/crianca), se o usuário selecionou o ambiente no Wizard, nós o exibimos.
    const explicitTriggers = MAPPING_TRIGGERS[area.id] || [];
    const isExplicitlyMapped = explicitTriggers.some(t => safeMapping.includes(t)) || safeMapping.includes(area.id);

    // --- Condicional por perfil: BEBÊ, CRIANÇA, IDOSO ---
    // Se há marcações feitas na moradia (safeMapping.length > 0), NÓS RESPEITAMOS ESTAS MARCAÇÕES!
    // Não criaremos quartos "fantasmas" só porque a pessoa tem aquela idade.
    if (['bebe', 'crianca', 'idoso'].includes(condicional)) {
        if (safeMapping.length > 0) return isExplicitlyMapped;

        // Se NÃO HOUVER NENHUMA MARCAÇÃO (App cru/Antigo), fazemos injeção automática por conveniência:
        const hasResident = safeProfiles.some(p => {
            if (p.tipo === condicional) return true;
            const idade = calcularIdade(p.dataNascimento);
            if (idade === null) return false;
            if (condicional === 'bebe') return idade <= 1;
            if (condicional === 'crianca') return idade >= 2 && idade <= 12;
            if (condicional === 'idoso') return idade >= 60;
            return false;
        });
        return hasResident;
    }

    // --- Condicional OPCIONAL: verifica pelo mapping de ambientes ---
    if (condicional === 'opcional') {
        const basicAreas = ['cozinha', 'sala', 'banheiro', 'area_servico', 'hall_corredor'];

        // Se o usuário não mapeou NADA, assumimos que as áreas básicas existem
        if (safeMapping.length === 0 && basicAreas.includes(area.id)) {
            return true;
        }

        // Caso especial: escadas (Rigoroso)
        if (area.id === 'escadas') {
            const hasManualEscada = isExplicitlyMapped;
            const andares = parseInt(safeMoradia.andares || 1, 10);
            const hasStructuralEscada = (andares > 1 || safeMoradia.tipoConstrucao === 'sobrado' || safeMoradia.tipoImovel === 'sobrado');

            return hasManualEscada || hasStructuralEscada;
        }

        // Match direto no mapping para os demais opcionais
        if (isExplicitlyMapped) return true;

        // Fallback final: Se rejeitado por exclusão no mapping, oculta.
        return false;
    }

    // Fallback: exibir (condicional desconhecido/sem condicional)
    return true;
}

/**
 * Verifica se um ITEM específico é relevante baseado em suas tags.
 * 
 * @param {Object} item - Item do checklist (com tags[])
 * @param {Array}  profiles - Perfis residentes
 * @param {Object} moradia - Dados da moradia
 * @returns {boolean}
 */
export function isItemRelevant(item, profiles, moradia) {
    const safeProfiles = Array.isArray(profiles) ? profiles : [];
    const safeMoradia = moradia || {};

    const hasBebe = safeProfiles.some(p => p.tipo === 'bebe' || (p.tipo === 'humano' && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) <= 1));
    const hasCrianca = safeProfiles.some(p => p.tipo === 'crianca' || (p.tipo === 'humano' && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) <= 12));
    const hasIdoso = safeProfiles.some(p => p.tipo === 'idoso' || (p.tipo === 'humano' && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) >= 60));

    // Caso especial: portão de segurança em escadas só é relevante em edificações com mais de um pavimento e com crianças pequenas/bebês
    const tituloLower = (item.titulo || '').toLowerCase();
    if (tituloLower.includes('babygate') || tituloLower.includes('portão de bloqueio') || tituloLower.includes('portões de bloqueio')) {
        const andares = parseInt(safeMoradia.andares || safeMoradia.floors || 1, 10);
        const isSobrado = ['sobrado', 'cobertura'].includes(safeMoradia.tipo || safeMoradia.tipoImovel);
        const hasMultipleFloors = andares > 1 || isSobrado;
        if (!hasMultipleFloors) return false;
        if (!hasCrianca && !hasBebe) return false;
    }

    // Caso especial: redes de proteção em janelas/sacadas só são relevantes se a edificação tiver mais de um pavimento, for apartamento/studio/cobertura, ou estiver em andar superior
    if (tituloLower.includes('rede de proteção') || tituloLower.includes('redes de proteção')) {
        const andares = parseInt(safeMoradia.andares || safeMoradia.floors || 1, 10);
        const andar = parseInt(safeMoradia.andar || 0, 10);
        const isApartment = ['apartamento', 'studio', 'cobertura'].includes(safeMoradia.tipo || safeMoradia.tipoImovel);
        const hasHeightHazard = andares > 1 || andar > 0 || isApartment;
        if (!hasHeightHazard) return false;
        if (!hasCrianca && !hasBebe && !safeProfiles.some(p => p.tipo === 'pet')) return false;
    }

    if (!item.tags || item.tags.length === 0) return true;

    const hasPetIdoso = safeProfiles.some(p => {
        if (p.tipo !== 'pet') return false;
        const idade = calcularIdade(p.dataNascimento);
        if (idade === null) return false;
        if (p.especie === 'gato') return idade >= 10;
        return idade >= 7; // cão ou outros
    });
    const hasPetPcd = safeProfiles.some(p => p.tipo === 'pet' && p.necessidadesEspeciais && p.necessidadesEspeciais.length > 0);
    const hasPetMobilidade = safeProfiles.some(p => p.tipo === 'pet' && p.necessidadesEspeciais && p.necessidadesEspeciais.includes('mobilidade_reduzida'));
    const hasPetVisao = safeProfiles.some(p => p.tipo === 'pet' && p.necessidadesEspeciais && p.necessidadesEspeciais.includes('visao_reduzida'));
    const hasDisfuncaoCognitiva = safeProfiles.some(p => p.tipo === 'pet' && p.necessidadesEspeciais && p.necessidadesEspeciais.includes('disfuncao_cognitiva'));

    // Regras de Tags Humanas
    if (item.tags.includes('crianças') || item.tags.includes('crianca')) {
        if (!hasCrianca && !hasBebe) return false;
    }
    if (item.tags.includes('bebe')) {
        if (!hasBebe) return false;
    }
    if (item.tags.includes('idoso') || item.tags.includes('idosos')) {
        if (!hasIdoso) return false;
    }

    // Qualquer pet (Radar sazonal, D17: processionária, fogos, calor no carro).
    // Nenhum item de checklist usa a tag 'pet' hoje — a regra não muda a vistoria.
    if (item.tags.includes('pet')) {
        if (!safeProfiles.some(p => p.tipo === 'pet')) return false;
    }

    // Regras de Tags Pet Vulneráveis
    if (item.tags.includes('pet_idoso')) {
        if (!hasPetIdoso) return false;
    }
    if (item.tags.includes('pet_pcd')) {
        if (!hasPetPcd) return false;
    }
    if (item.tags.includes('pet_mobilidade')) {
        if (!hasPetMobilidade) return false;
    }
    if (item.tags.includes('pet_visao_reduzida')) {
        if (!hasPetVisao) return false;
    }
    if (item.tags.includes('disfuncao_cognitiva')) {
        if (!hasDisfuncaoCognitiva) return false;
    }

    return true;
}

/**
 * Retorna apenas as áreas relevantes de uma lista de AMBIENTES.
 *
 * @param {Array}  allAreas  - Array completo de AMBIENTES
 * @param {Object} moradia   - ProfileService.getMoradia()
 * @param {Array}  profiles  - ProfileService.getResidentsProfiles()
 * @param {Array}  mapping   - ProfileService.getMapping()
 * @returns {Array} Subset de áreas relevantes
 */
export function getRelevantAreas(allAreas, moradia, profiles, mapping) {
    if (!allAreas) return [];
    return allAreas.filter(area => isAreaRelevant(area, moradia, profiles, mapping));
}

/**
 * Retorna a estrutura do checklist de um cômodo dinamicamente,
 * aplicando regras como injeção de itens de idosos se necessário.
 *
 * @param {string} roomId - ID do cômodo
 * @param {Array}  profiles - Perfis de moradores
 * @param {Object} moradia - Dados da moradia
 * @param {Array}  mapping - Ambientes mapeados
 * @returns {Object} Estrutura de checklist do cômodo
 */
export function getRoomChecklistStructure(roomId, profiles, moradia, mapping = []) {
    const { CHECKLISTS } = require('../data/mapeamento_dados');
    const safeProfiles = Array.isArray(profiles) ? profiles : [];
    const safeMapping = Array.isArray(mapping) ? mapping : [];

    // Clona o checklist estático do ambiente para evitar mutações indesejadas no global
    const structure = JSON.parse(JSON.stringify(CHECKLISTS[roomId] || { categorias: [] }));

    // Regra: Injetar itens do "Quarto do Idoso" no "Quarto de Adulto" ou "Área Integrada" se:
    // 1. O cômodo atual for 'quarto_adulto' ou 'ambiente_integrado'
    // 2. Houver idoso cadastrado nos perfis
    // 3. NÃO houver um 'quarto_idoso' mapeado explicitamente no onboarding
    if (roomId === 'quarto_adulto' || roomId === 'ambiente_integrado') {
        const hasIdoso = safeProfiles.some(p => p.tipo === 'idoso' || (p.tipo === 'humano' && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) >= 60));
        const isQuartoIdosoMapped = safeMapping.includes('quarto_idoso');

        if (hasIdoso && !isQuartoIdosoMapped) {
            const idosoStructure = CHECKLISTS['quarto_idoso'];
            if (idosoStructure && idosoStructure.categorias) {
                idosoStructure.categorias.forEach(cat => {
                    structure.categorias.push({
                        nome: 'Segurança do Idoso (Antiqueda)',
                        nome_en: 'Elderly Safety (Anti-fall)',
                        nome_es: 'Seguridad del Adulto Mayor (Anticaídas)',
                        nome_ptpt: 'Segurança do Idoso (Antiqueda)',
                        emoji: '👵',
                        itens: cat.itens
                    });
                });
            }
        }
    }

    return structure;
}

/**
 * Retorna o nome de exibição dinamicamente ajustado para certas áreas (ex: central_gas).
 *
 * @param {string} areaId - ID da área
 * @param {string} defaultName - Nome padrão da área
 * @param {Array}  mapping - Ambientes/riscos mapeados
 * @param {Function} t - Função de tradução
 * @returns {string} Nome dinamicamente traduzido/ajustado
 */
export function getDynamicAreaName(areaId, defaultName, mapping, t) {
    const safeMapping = Array.isArray(mapping) ? mapping : [];
    if (areaId === 'central_gas') {
        if (safeMapping.includes('botijao') || safeMapping.includes('botijao_gas')) {
            return t('checklists.botijaoGas', 'Botijão de Gás');
        }
        if (safeMapping.includes('gas_encanado')) {
            return t('checklists.gasEncanado', 'Gás Encanado');
        }
    }
    return defaultName;
}

export default { getRelevantAreas, isAreaRelevant, isItemRelevant, getRoomChecklistStructure, getDynamicAreaName, MAPPING_TRIGGERS };
