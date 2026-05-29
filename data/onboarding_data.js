/**
 * onboarding_data.js
 * Constantes e listas para o fluxo de Mapeamento Doméstico.
 */

export const HOUSE_TYPES = [
    { id: 'casa', label: 'Casa', label_en: 'House', label_es: 'Casa', label_ptpt: 'Casa/Moradia', icon: 'home' },
    { id: 'sobrado', label: 'Sobrado', label_en: 'Multi-story House', label_es: 'Casa de dos pisos', label_ptpt: 'Moradia de dois pisos', icon: 'house-2' },
    { id: 'apartamento', label: 'Apartamento', label_en: 'Apartment', label_es: 'Apartamento', label_ptpt: 'Apartamento', icon: 'building' },
    { id: 'sitio', label: 'Sítio/Chácara', label_en: 'Ranch/Farmhouse', label_es: 'Finca/Granja', label_ptpt: 'Quinta/Chácara', icon: 'tree' },
    { id: 'casa_praia', label: 'Casa de Praia', label_en: 'Beach House', label_es: 'Casa de playa', label_ptpt: 'Casa de praia', icon: 'sun-1' },
    { id: 'studio', label: 'Studio/Flat', label_en: 'Studio Apartment', label_es: 'Estudio/Flat', label_ptpt: 'Estúdio/T0', icon: 'box-1' },
    { id: 'loft', label: 'Loft', label_en: 'Loft', label_es: 'Loft', label_ptpt: 'Loft', icon: 'house-2' },
    { id: 'kitnet', label: 'Kitnet', label_en: 'Kitchenette', label_es: 'Monoambiente', label_ptpt: 'Kitchenette/T0', icon: 'box-1' },
    { id: 'cobertura', label: 'Cobertura', label_en: 'Penthouse', label_es: 'Ático/Penthouse', label_ptpt: 'Cobertura/Duplex', icon: 'buildings-2' },
];

export const EXTERNAL_AREAS = [
    { id: 'piscina', label: 'Piscina', icon: 'drop' },
    { id: 'jardim', label: 'Jardim', icon: 'tree' },
    { id: 'quintal', label: 'Quintal', icon: 'sun-1' },
    { id: 'churrasqueira', label: 'Churrasqueira', icon: 'reserve' },
    { id: 'parquinho', label: 'Parquinho', icon: 'happyemoji' },
    { id: 'garagem', label: 'Garagem', icon: 'car' },
    { id: 'oficina_ext', label: 'Oficina', icon: 'setting-2' },
    { id: 'pomar', label: 'Pomar/Horta', icon: 'tree' },
    { id: 'canil', label: 'Canil', icon: 'pet' },
    { id: 'rua_movimentada', label: 'Rua Movimentada', icon: 'car' },
    { id: 'botijao_gas', label: 'Botijão de Gás', icon: 'box' },
    { id: 'gas_encanado', label: 'Gás Encanado', icon: 'gas-station' },
    { id: 'central_gas', label: 'Central de Gás Externa', icon: 'gas-station' },
];

export const INTERNAL_ROOMS = [
    { category: 'Salas', items: [
        { id: 'sala_estar', label: 'Sala de Estar' },
        { id: 'sala_tv', label: 'Sala de TV' },
        { id: 'sala_jantar', label: 'Sala de Jantar' },
    ]},
    { category: 'Cozinha e Copa', items: [
        { id: 'cozinha_tradicional', label: 'Cozinha Tradicional' },
        { id: 'cozinha_americana', label: 'Cozinha Americana' },
    ]},
    { category: 'Dormitórios', items: [
        { id: 'quarto_bebe', label: 'Quarto do Bebê' },
        { id: 'quarto_crianca', label: 'Quarto de Criança' },
        { id: 'quarto_adolescente', label: 'Quarto de Adolescente' },
        { id: 'quarto_adulto', label: 'Quarto de Adulto' },
        { id: 'quarto_idoso', label: 'Quarto de Idoso' },
        { id: 'quarto_pcd', label: 'Quarto Acessível (PcD)' },
    ]},
    { category: 'Áreas Úmidas e Serviço', items: [
        { id: 'banheiro', label: 'Banheiro' },
        { id: 'lavabo', label: 'Lavabo' },
        { id: 'area_servico', label: 'Área de Serviço/Lavanderia' },
    ]},
    { category: 'Armazenamento e Trabalho', items: [
        { id: 'despensa', label: 'Despensa' },
        { id: 'deposito', label: 'Depósito' },
        { id: 'oficina_domestica', label: 'Oficina Doméstica' },
    ]},
    { category: 'Circulação e Outros', items: [
        { id: 'corredores', label: 'Corredores' },
        { id: 'escadas', label: 'Escadas' },
        { id: 'varanda', label: 'Varanda/Sacada' },
    ]},
];

export const GENDERS = [
    { id: 'masculino', label: 'Masculino' },
    { id: 'feminino', label: 'Feminino' },
    { id: 'outro', label: 'Outro' },
];

export const BOND_TYPES = [
    { id: 'morador', label: 'Morador Fixo' },
    { id: 'visitante', label: 'Visitante Eventual' },
];

export const SPECIAL_CONDITIONS = [
    { id: 'pcd', label: 'PcD' },
    { id: 'gestante', label: 'Gestante' },
    { id: 'acamado', label: 'Acamado' },
];

export const PET_SPECIES = [
    { id: 'cao', label: 'Cão' },
    { id: 'gato', label: 'Gato' },
    { id: 'ave', label: 'Ave' },
    { id: 'reptil', label: 'Réptil' },
    { id: 'outro', label: 'Outro' },
];

export const PET_SIZES = [
    { id: 'pequeno', label: 'Pequeno' },
    { id: 'medio', label: 'Médio' },
    { id: 'grande', label: 'Grande' },
];

/** Formata input DD/MM/AAAA com máscara automática */
export const formatDOB = (text) => {
    let c = text.replace(/\D/g, '').slice(0, 8);
    let f = '';
    if (c.length > 0) f += c.slice(0, 2);
    if (c.length > 2) f += '/' + c.slice(2, 4);
    if (c.length > 4) f += '/' + c.slice(4, 8);
    return f;
};
