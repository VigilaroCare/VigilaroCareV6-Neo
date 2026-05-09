/**
 * HousingOptions.js
 * Constantes Centralizadas para Moradia - Vigilaro Care
 * 
 * ATENÇÃO: Este arquivo é a ÚNICA fonte de verdade para opções de moradia.
 * Não duplique estas constantes em outros arquivos!
 */

// ========================================
// TIPOS DE MORADIA
// ========================================
export const TIPOS_MORADIA = [
    { id: 'casa', label: 'Casa', icon: 'home', desc: 'Residência térrea (1 andar)' },
    { id: 'apartamento', label: 'Apartamento', icon: 'business', desc: 'Unidade em prédio' },
    { id: 'sobrado', label: 'Sobrado', icon: 'business-outline', desc: 'Casa com 2+ andares' },
    { id: 'condominio', label: 'Condomínio', icon: 'grid', desc: 'Casa em condomínio fechado' },
];

// ========================================
// REGIÕES
// ========================================
export const REGIOES = [
    { id: 'urbana', label: 'Urbana', icon: 'business', desc: 'Cidade' },
    { id: 'rural', label: 'Rural', icon: 'leaf', desc: 'Campo/Fazenda' },
    { id: 'litoral', label: 'Litoral', icon: 'water', desc: 'Praia/Costa' },
];

// ========================================
// CARACTERÍSTICAS DA MORADIA (Estrutura)
// ========================================
export const CARACTERISTICAS = [
    { id: 'escadas', label: 'Escadas', icon: 'stairs', riscoRelacionado: 'queda' },
    { id: 'piscina', label: 'Piscina', icon: 'water', riscoRelacionado: 'afogamento' },
    { id: 'varanda', label: 'Varanda/Sacada', icon: 'sunny', riscoRelacionado: 'queda' },
    { id: 'jardim', label: 'Jardim/Quintal', icon: 'leaf', riscoRelacionado: 'animais_peconhentos' },
    { id: 'lareira', label: 'Lareira', icon: 'fire', riscoRelacionado: 'incendio' },
    { id: 'churrasqueira', label: 'Churrasqueira', icon: 'bonfire', riscoRelacionado: 'queimadura' },
    { id: 'garagem', label: 'Garagem', icon: 'car', riscoRelacionado: 'intoxicacao' },
    { id: 'area_servico', label: 'Área de Serviço', icon: 'water-outline', riscoRelacionado: null },
];

// ========================================
// AMBIENTES INTERNOS
// ========================================
export const AMBIENTES_INTERNOS = [
    { id: 'sala_estar', label: 'Sala de Estar', icon: 'Monitor' },
    { id: 'sala_jantar', label: 'Sala de Jantar', icon: 'Reserve' },
    { id: 'cozinha', label: 'Cozinha', icon: 'Kitchen' },
    { id: 'copa', label: 'Copa', icon: 'Reserve' },
    { id: 'despensa', label: 'Despensa', icon: 'Box' },
    { id: 'banheiro_social', label: 'Banheiro Social', icon: 'Bathroom' },
    { id: 'banheiro_suite', label: 'Banheiro Suíte', icon: 'Bathroom' },
    { id: 'lavabo', label: 'Lavabo', icon: 'Bathroom' },
    { id: 'quarto_casal', label: 'Quarto Casal', icon: 'Bed' },
    { id: 'quarto_solteiro', label: 'Quarto Solteiro', icon: 'Bed' },
    { id: 'quarto_infantil', label: 'Quarto Infantil', icon: 'Happyemoji' },
    { id: 'quarto_bebe', label: 'Quarto do Bebê', icon: 'BabyCrib' },
    { id: 'quarto_hospedes', label: 'Quarto Hóspedes', icon: 'Profile2User' },
    { id: 'quarto_idoso', label: 'Quarto de Idosos', icon: 'Elder' },
    { id: 'quarto_pcd', label: 'Quarto PCD', icon: 'Health' },
    { id: 'quarto_adolescente', label: 'Quarto Adolescente', icon: 'Game' },
    { id: 'escritorio', label: 'Escritório / Home Office', icon: 'Monitor' },
    { id: 'lavanderia', label: 'Lavanderia / Serviço', icon: 'WashingMachine' },
    { id: 'escadas_internas', label: 'Escadas Internas', icon: 'Stairs' },
    { id: 'corredor', label: 'Corredores', icon: 'ArrowRight2' },
    { id: 'sotao_porao', label: 'Sótão / Porão', icon: 'Box' },
];

// ========================================
// ÁREAS EXTERNAS
// ========================================
export const AREAS_EXTERNAS = [
    { id: 'quintal', label: 'Quintal', icon: 'Tree' },
    { id: 'jardim', label: 'Jardim', icon: 'Tree' },
    { id: 'horta', label: 'Horta', icon: 'Tree' },
    { id: 'garagem', label: 'Garagem', icon: 'Car' },
    { id: 'piscina', label: 'Piscina', icon: 'Pool' },
    { id: 'churrasqueira', label: 'Churrasqueira / Gourmet', icon: 'Fire' },
    { id: 'parquinho', label: 'Parquinho / Playground', icon: 'Happyemoji' },
    { id: 'terraco', label: 'Terraço / Laje', icon: 'Sun1' },
    { id: 'deposito_oficina', label: 'Depósito / Oficina', icon: 'Setting2' },
    { id: 'area_pet', label: 'Canil / Área Pet', icon: 'Pet' },
    { id: 'central_gas', label: 'Central de Gás', icon: 'Danger' },
    { id: 'frente', label: 'Frente / Calçada', icon: 'Home2' },
    { id: 'jardinagem_ativa', label: 'Prática de Jardinagem', icon: 'Tree' },
];

// ========================================
// ÁREAS COMUNS (Condomínios/Edifícios)
// ========================================
export const AREAS_COMUNS = [
    { id: 'piscina_coletiva', label: 'Piscina Coletiva', icon: 'pool', type: 'material' },
    { id: 'playground_coletivo', label: 'Playground / Parquinho', icon: 'seesaw', type: 'material' },
    { id: 'salao_festas', label: 'Salão de Festas', icon: 'balloon', type: 'material' },
    { id: 'quadra_esportiva', label: 'Quadra Esportiva', icon: 'soccer', type: 'material' }, // Mapear para quintal/externo
    { id: 'elevador_hall', label: 'Elevador / Hall Social', icon: 'elevator', type: 'material' }, // Mapear para hall/corredor
    { id: 'academia_coletiva', label: 'Academia', icon: 'dumbbell', type: 'material' }, // Mapear para equipamentos/geral
    { id: 'brinquedoteca', label: 'Brinquedoteca', icon: 'toy-brick', type: 'material' }, // Mapear para sala/interno
];

// ========================================
// EQUIPAMENTOS DE SEGURANÇA
// ========================================
export const EQUIPAMENTOS_SEGURANCA = [
    { id: 'redes_protecao', label: 'Redes de Proteção', icon: 'grid', desc: 'Janelas/Sacadas' },
    { id: 'cerca_piscina', label: 'Cerca em Piscina', icon: 'pool', desc: 'Grade física' },
    { id: 'capa_piscina', label: 'Capa de Piscina', icon: 'water-off', desc: 'Lona ou similar' },
    { id: 'portao_escada', label: 'Bloqueio em Escadas', icon: 'gate', desc: 'Baby Gate' },
    { id: 'travas_armario', label: 'Travas em Armários', icon: 'lock', desc: 'Produtos químicos/remédios' },
    { id: 'protetor_quina', label: 'Protetores de Quina', icon: 'table-furniture', desc: 'Silicone/Borracha' },
    { id: 'luz_emergencia', label: 'Luz de Emergência', icon: 'lightbulb-on', desc: 'Acionamento automático' },
    { id: 'sensor_presenca', label: 'Luz com Sensor', icon: 'motion-sensor', desc: 'Corredores/Escadas' },
    { id: 'protetor_tomada', label: 'Protetores de Tomada', icon: 'power-plug-off', desc: 'Contra choque' },
    { id: 'detector_fumaca', label: 'Detector de Fumaça', icon: 'smoke-detector', desc: 'Alarme de incêndio' },
    { id: 'detector_gas', label: 'Detector de Gás/CO', icon: 'gas-cylinder', desc: 'Vazamentos' },
    { id: 'extintor', label: 'Extintor de Incêndio', icon: 'fire-extinguisher', desc: 'ABC ou similar' },
    { id: 'cameras', label: 'Câmeras de Segurança', icon: 'cctv', desc: 'Monitoramento' },
    { id: 'alarme', label: 'Alarme Residencial', icon: 'alarm-light', desc: 'Sirene/Monitoramento' },
    { id: 'interfone', label: 'Interfone/Videoporteiro', icon: 'phone-in-talk', desc: 'Controle de acesso' },
];

// ========================================
// UTILIDADES (Infraestrutura)
// ========================================
export const UTILIDADES = [
    { id: 'gas_encanado', label: 'Gás Encanado', icon: 'Fire', color: '#FF9800' },
    { id: 'botijao', label: 'Botijão de Gás', icon: 'Danger', color: '#2196F3' },
    { id: 'eletrico', label: 'Sem Gás (Tudo Elétrico)', icon: 'Flash', color: '#4CAF50' },
];

// ========================================
// FATORES DE RISCO
// ========================================
export const FATORES_RISCO = [
    { id: 'banheira', label: 'Banheira', icon: 'water-outline', risco: 'afogamento' },
    { id: 'piso_escorregadio', label: 'Piso Escorregadio', icon: 'warning-outline', risco: 'queda' },
    { id: 'janelas_baixas', label: 'Janelas Baixas', icon: 'resize-outline', risco: 'queda' },
    { id: 'sacada_sem_rede', label: 'Sacada sem Rede', icon: 'remove-outline', risco: 'queda' },
    { id: 'escada_sem_portao', label: 'Escada sem Portão', icon: 'lock-open-outline', risco: 'queda' },
    { id: 'produtos_limpeza', label: 'Produtos de Limpeza', icon: 'flask-outline', risco: 'intoxicacao' },
    { id: 'medicamentos', label: 'Remédios', icon: 'medkit-outline', risco: 'intoxicacao' },
    { id: 'tomadas_baixas', label: 'Tomadas Baixas', icon: 'flash-outline', risco: 'choque' },
    { id: 'poc_cisterna', label: 'Poço/Cisterna', icon: 'water', risco: 'afogamento' },
];

// ========================================
// INVENTÁRIO (O que tem na casa)
// ========================================
export const INVENTARIO_CATEGORIAS = [
    {
        id: 'produtos_quimicos',
        label: 'Produtos Químicos',
        icon: 'flask',
        pergunta: 'Onde você guarda produtos de limpeza?',
        opcoes: ['armário baixo', 'armário alto', 'área de serviço', 'banheiro'],
        riscoSemRespoota: 'intoxicacao'
    },
    {
        id: 'medicamentos',
        label: 'Medicamentos',
        icon: 'medkit',
        pergunta: 'Onde você guarda medicamentos?',
        opcoes: ['armário com chave', 'gaveta', 'cozinha', 'quarto'],
        riscoSemRespoota: 'intoxicacao'
    },
    {
        id: 'ferramentas',
        label: 'Ferramentas',
        icon: 'hammer',
        pergunta: 'Onde você guarda ferramentas?',
        opcoes: ['garagem', 'depósito', 'cozinha', 'área de serviço'],
        riscoSemRespoota: 'corte'
    },
    {
        id: 'armas',
        label: 'Armas',
        icon: 'close-circle',
        pergunta: 'Há armas de fogo na residência?',
        opcoes: ['não', 'sim, em cofre', 'sim, guardada'],
        riscoSemRespoota: 'disparo_acidental'
    },
];

// ========================================
// CONSTANTES DE COMPLETUDE
// ========================================
export const PESOS_COMPLETUDE = {
    perfil: 30,        // 30% do score total
    estrutura: 25,     // 25% do score total
    riscos: 25,        // 25% do score total
    inventario: 20,    // 20% do score total
};

// ========================================
// HELPER: Obter todas as opções de moradia consolidadas
// ========================================
export const getAllHomeOptions = () => ({
    tipos: TIPOS_MORADIA,
    regioes: REGIOES,
    caracteristicas: CARACTERISTICAS,
    ambientesInternos: AMBIENTES_INTERNOS,
    areasExternas: AREAS_EXTERNAS,
    equipamentos: EQUIPAMENTOS_SEGURANCA,
    utilidades: UTILIDADES,
    fatoresRisco: FATORES_RISCO,
    inventario: INVENTARIO_CATEGORIAS,
});

// ========================================
// HELPER: Calcular completude de moradia
// ========================================
export const calcularCompletudeMoradia = (moradia) => {
    if (!moradia) return { total: 0, estrutura: 0, riscos: 0, inventario: 0 };

    let estrutura = 0;
    let riscos = 0;
    let inventario = 0;

    // Estrutura
    if (moradia.tipo) estrutura += 25;
    if (moradia.regiao) estrutura += 25;
    if (moradia.ambientes?.length > 0) estrutura += 25;
    if (moradia.caracteristicas?.length > 0) estrutura += 25;

    // Riscos
    if (moradia.riscos?.identificados?.length >= 0) riscos += 50;
    if (moradia.equipamentosSeguranca?.length > 0) riscos += 50;

    // Inventário
    if (moradia.inventario) {
        const categoriasPreenchidas = Object.values(moradia.inventario)
            .filter(v => v && v.local).length;
        inventario = Math.round((categoriasPreenchidas / INVENTARIO_CATEGORIAS.length) * 100);
    }

    const total = Math.round(
        (estrutura * PESOS_COMPLETUDE.estrutura / 100) +
        (riscos * PESOS_COMPLETUDE.riscos / 100) +
        (inventario * PESOS_COMPLETUDE.inventario / 100)
    );

    return { total, estrutura, riscos, inventario };
};

export default {
    TIPOS_MORADIA,
    REGIOES,
    CARACTERISTICAS,
    AMBIENTES_INTERNOS,
    AREAS_EXTERNAS,
    EQUIPAMENTOS_SEGURANCA,
    UTILIDADES,
    FATORES_RISCO,
    INVENTARIO_CATEGORIAS,
    PESOS_COMPLETUDE,
    getAllHomeOptions,
    calcularCompletudeMoradia,
};
