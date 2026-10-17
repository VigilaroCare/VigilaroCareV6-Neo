/**
 * onboarding_data.js
 * Constantes e listas para o fluxo de Mapeamento Doméstico.
 * Grava-se o `id`; o texto exibido sai de t_field(item, 'label') (D20).
 */
import { t_field } from '../utils/getLocalizedField';

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
    { id: 'piscina', label: 'Piscina', label_en: 'Swimming Pool', label_es: 'Piscina', icon: 'drop' },
    { id: 'jardim', label: 'Jardim', label_en: 'Garden', label_es: 'Jardín', icon: 'tree' },
    { id: 'quintal', label: 'Quintal', label_en: 'Backyard', label_es: 'Patio', icon: 'sun-1' },
    { id: 'churrasqueira', label: 'Churrasqueira', label_en: 'Barbecue Area', label_es: 'Parrilla / Barbacoa', icon: 'reserve' },
    { id: 'parquinho', label: 'Parquinho', label_en: 'Playground', label_es: 'Parque Infantil', label_ptpt: 'Parque Infantil', icon: 'happyemoji' },
    { id: 'garagem', label: 'Garagem', label_en: 'Garage', label_es: 'Garaje', icon: 'car' },
    { id: 'oficina_ext', label: 'Oficina', label_en: 'Workshop', label_es: 'Taller', icon: 'setting-2' },
    { id: 'pomar', label: 'Pomar/Horta', label_en: 'Orchard/Vegetable Garden', label_es: 'Huerto/Frutales', icon: 'tree' },
    { id: 'canil', label: 'Canil', label_en: 'Kennel', label_es: 'Caseta / Perrera', icon: 'pet' },
    { id: 'rua_movimentada', label: 'Rua Movimentada', label_en: 'Busy Street', label_es: 'Calle Transitada', icon: 'car' },
    { id: 'botijao_gas', label: 'Botijão de Gás', label_en: 'Gas Cylinder', label_es: 'Bombona de Gas', label_ptpt: 'Botija de Gás', icon: 'box' },
    { id: 'gas_encanado', label: 'Gás Encanado', label_en: 'Piped Gas', label_es: 'Gas Natural Canalizado', label_ptpt: 'Gás Canalizado', icon: 'gas-station' },
    { id: 'central_gas', label: 'Central de Gás Externa', label_en: 'Outdoor Gas Tank Area', label_es: 'Central de Gas Exterior', icon: 'gas-station' },
];

export const INTERNAL_ROOMS = [
    { category: 'Salas', category_en: 'Living Areas', category_es: 'Salas', items: [
        { id: 'sala_estar', label: 'Sala de Estar', label_en: 'Living Room', label_es: 'Sala de Estar' },
        { id: 'sala_tv', label: 'Sala de TV', label_en: 'TV Room', label_es: 'Sala de TV' },
        { id: 'sala_jantar', label: 'Sala de Jantar', label_en: 'Dining Room', label_es: 'Comedor' },
    ]},
    { category: 'Cozinha e Copa', category_en: 'Kitchen and Dining', category_es: 'Cocina y Comedor', items: [
        { id: 'cozinha_tradicional', label: 'Cozinha Tradicional', label_en: 'Closed Kitchen', label_es: 'Cocina Cerrada' },
        { id: 'cozinha_americana', label: 'Cozinha Americana', label_en: 'Open-plan Kitchen', label_es: 'Cocina Abierta', label_ptpt: 'Cozinha em Open Space' },
    ]},
    { category: 'Dormitórios', category_en: 'Bedrooms', category_es: 'Dormitorios', category_ptpt: 'Quartos', items: [
        { id: 'quarto_bebe', label: 'Quarto do Bebê', label_en: "Baby's Room", label_es: 'Habitación del Bebé', label_ptpt: 'Quarto do Bebé' },
        { id: 'quarto_crianca', label: 'Quarto de Criança', label_en: "Child's Room", label_es: 'Habitación Infantil' },
        { id: 'quarto_adolescente', label: 'Quarto de Adolescente', label_en: "Teen's Room", label_es: 'Habitación de Adolescente' },
        { id: 'quarto_adulto', label: 'Quarto de Adulto', label_en: 'Adult Bedroom', label_es: 'Dormitorio de Adulto' },
        { id: 'quarto_idoso', label: 'Quarto de Idoso', label_en: "Older Adult's Room", label_es: 'Habitación de Adulto Mayor' },
        { id: 'quarto_pcd', label: 'Quarto Acessível (PcD)', label_en: 'Accessible Room (Disability)', label_es: 'Habitación Accesible (Discapacidad)', label_ptpt: 'Quarto Acessível (Deficiência)' },
    ]},
    { category: 'Áreas Úmidas e Serviço', category_en: 'Wet Areas and Utility', category_es: 'Zonas Húmedas y Servicio', items: [
        { id: 'banheiro', label: 'Banheiro', label_en: 'Bathroom', label_es: 'Baño', label_ptpt: 'Casa de Banho' },
        { id: 'lavabo', label: 'Lavabo', label_en: 'Half Bath', label_es: 'Aseo de Cortesía', label_ptpt: 'Casa de Banho de Serviço' },
        { id: 'area_servico', label: 'Área de Serviço/Lavanderia', label_en: 'Utility Room/Laundry', label_es: 'Lavadero/Lavandería', label_ptpt: 'Lavandaria' },
    ]},
    { category: 'Armazenamento e Trabalho', category_en: 'Storage and Work', category_es: 'Almacenamiento y Trabajo', items: [
        { id: 'despensa', label: 'Despensa', label_en: 'Pantry', label_es: 'Despensa' },
        { id: 'deposito', label: 'Depósito', label_en: 'Storage Room', label_es: 'Trastero', label_ptpt: 'Arrecadação' },
        { id: 'oficina_domestica', label: 'Oficina Doméstica', label_en: 'Home Workshop', label_es: 'Taller Doméstico' },
    ]},
    { category: 'Circulação e Outros', category_en: 'Circulation and Other', category_es: 'Circulación y Otros', items: [
        { id: 'corredores', label: 'Corredores', label_en: 'Hallways', label_es: 'Pasillos' },
        { id: 'escadas', label: 'Escadas', label_en: 'Stairs', label_es: 'Escaleras' },
        { id: 'varanda', label: 'Varanda/Sacada', label_en: 'Balcony/Porch', label_es: 'Balcón/Terraza', label_ptpt: 'Varanda' },
    ]},
];

export const GENDERS = [
    { id: 'masculino', label: 'Masculino', label_en: 'Male', label_es: 'Masculino' },
    { id: 'feminino', label: 'Feminino', label_en: 'Female', label_es: 'Femenino' },
    { id: 'outro', label: 'Outro', label_en: 'Other', label_es: 'Otro' },
];

export const BOND_TYPES = [
    { id: 'morador', label: 'Morador Fixo', label_en: 'Lives Here', label_es: 'Vive Aquí' },
    { id: 'visitante', label: 'Visitante Eventual', label_en: 'Occasional Visitor', label_es: 'Visitante Ocasional' },
];

export const SPECIAL_CONDITIONS = [
    { id: 'pcd', label: 'PcD', label_en: 'Disability', label_es: 'Discapacidad', label_ptpt: 'Pessoa com Deficiência' },
    { id: 'gestante', label: 'Gestante', label_en: 'Pregnant', label_es: 'Embarazada', label_ptpt: 'Grávida' },
    { id: 'acamado', label: 'Acamado', label_en: 'Bedridden', label_es: 'Encamado' },
];

export const PET_SPECIES = [
    { id: 'cao', label: 'Cão', label_en: 'Dog', label_es: 'Perro' },
    { id: 'gato', label: 'Gato', label_en: 'Cat', label_es: 'Gato' },
    { id: 'ave', label: 'Ave', label_en: 'Bird', label_es: 'Ave' },
    { id: 'reptil', label: 'Réptil', label_en: 'Reptile', label_es: 'Reptil' },
    { id: 'outro', label: 'Outro', label_en: 'Other', label_es: 'Otro' },
];

export const PET_SIZES = [
    { id: 'pequeno', label: 'Pequeno', label_en: 'Small', label_es: 'Pequeño' },
    { id: 'medio', label: 'Médio', label_en: 'Medium', label_es: 'Mediano' },
    { id: 'grande', label: 'Grande', label_en: 'Large', label_es: 'Grande' },
];

/** Rótulo traduzido de uma opção destas listas (o `id` é o que se grava). */
export const rotuloOnboarding = (lista, id) => {
    const todas = lista.flatMap((x) => (x.items ? x.items : [x]));
    const op = todas.find((o) => o.id === id || o.label === id);
    return op ? (t_field(op, 'label') || op.label) : (id || '');
};

/** Formata input DD/MM/AAAA com máscara automática */
export const formatDOB = (text) => {
    let c = text.replace(/\D/g, '').slice(0, 8);
    let f = '';
    if (c.length > 0) f += c.slice(0, 2);
    if (c.length > 2) f += '/' + c.slice(2, 4);
    if (c.length > 4) f += '/' + c.slice(4, 8);
    return f;
};
