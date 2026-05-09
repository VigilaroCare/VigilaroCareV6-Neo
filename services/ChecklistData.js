import { Alert } from 'react-native';

// "Guia 3D" & "Riscos e Recomendações" merged database
// Categorias: 
// - 0-6m: Berço, sufocamento, banho
// - 7-12m: Andadores (PROIBIDOS), engatinhar, pequenas peças
// - 1-3a: Exploradores, escaladas, intoxicação
// - 3-5a: Quedas, áreas externas
// - 6-14a: Eletrônicos, internet (futuro)
// - Idosos: Quedas, iluminação, remédios, tapetes
// - Geral: Incêndio, Gás, Estrutura

export const ChecklistData = {
    // --- SALA ---
    sala: [
        {
            id: 'sala_quinas',
            pergunta: 'As quinas de mesas e móveis baixos possuem protetores?',
            categoria: 'moveis',
            priority: 'high',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0 || p?.moradores?.criancas?.quantidade > 0 || p?.moradores?.idosos?.quantidade > 0
        },
        {
            id: 'sala_tv',
            pergunta: 'A TV está fixada na parede ou o móvel é estável contra tombamento?',
            categoria: 'eletrica',
            priority: 'high',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0 || p?.moradores?.criancas?.quantidade > 0
        },
        {
            id: 'sala_fios',
            pergunta: 'Fios elétricos estão organizados e fora do caminho?',
            categoria: 'eletrica',
            priority: 'medium',
            condition: () => true // Geral
        },
        {
            id: 'sala_tapetes',
            pergunta: 'Os tapetes são antiderrapantes ou estão fixados no chão?',
            categoria: 'piso',
            priority: 'high',
            condition: (p) => p?.moradores?.idosos?.quantidade > 0 || p?.moradores?.bebes?.quantidade > 0
        },
        {
            id: 'sala_bebidas',
            pergunta: 'Bebidas alcoólicas estão trancadas ou em local alto?',
            categoria: 'toxicos',
            priority: 'medium',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0 || p?.moradores?.adolescentes > 0
        },
        {
            id: 'sala_plantas',
            pergunta: 'Plantas ornamentais são atóxicas (sem "Comigo-ninguém-pode")?',
            categoria: 'toxicos',
            priority: 'high',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0 || p?.pets?.cachorros > 0 || p?.pets?.gatos > 0
        },
        {
            id: 'sala_circulacao',
            pergunta: 'Há espaço livre para circulação (sem excesso de móveis)?',
            categoria: 'moveis',
            priority: 'medium',
            condition: (p) => p?.moradores?.idosos?.quantidade > 0 || p?.moradores?.cadeirantes // Futuro
        }
    ],

    // --- COZINHA ---
    cozinha: [
        {
            id: 'coz_babygate',
            pergunta: 'Existe portão (babygate) impedindo acesso livre à cozinha?',
            categoria: 'acesso',
            priority: 'high',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0 || p?.moradores?.criancas?.quantidade > 0
        },
        {
            id: 'coz_panelas',
            pergunta: 'Cabos de panelas são virados para dentro durante o uso?',
            categoria: 'fogo',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'coz_facas',
            pergunta: 'Facas e objetos cortantes estão em gavetas com travas?',
            categoria: 'objetos',
            priority: 'high',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0
        },
        {
            id: 'coz_limpeza',
            pergunta: 'Produtos de limpeza estão em armários altos ou trancados?',
            categoria: 'toxicos',
            priority: 'high',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0 || p?.moradores?.idosos?.condicaoCognitiva // Alzheimers etc
        },
        {
            id: 'coz_gas_validade',
            pergunta: 'A mangueira e o registro do gás estão dentro da validade?',
            categoria: 'gas',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'coz_gas_local',
            pergunta: 'O botijão fica em área externa e ventilada?',
            categoria: 'gas',
            priority: 'high',
            condition: (p) => p?.residencia?.tipo !== 'apartamento' // Aps geralmente têm gás encanado
        },
        {
            id: 'coz_toalha',
            pergunta: 'A mesa está sem toalha comprida (risco de puxar)?',
            categoria: 'objetos',
            priority: 'medium',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0 || p?.moradores?.criancas?.quantidade > 0
        }
    ],

    // --- QUARTO DO BEBÊ (0-3 anos) ---
    quarto_bebe: [
        {
            id: 'bebe_berco_grades',
            pergunta: 'O espaçamento das grades do berço tem no máximo 6cm?',
            categoria: 'moveis',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'bebe_berco_sufocamento',
            pergunta: 'O berço está LIVRE de almofadas, protetores, pelúcias e cobertores soltos?',
            categoria: 'sufocamento',
            priority: 'high',
            source: 'SBP', // Origem SBP
            condition: () => true
        },
        {
            id: 'bebe_andador',
            pergunta: 'O uso de ANDADOR foi eliminado? (Risco gravíssimo de queda/trauma)',
            categoria: 'quedas',
            priority: 'high',
            source: 'SBP/Guia3D',
            condition: (p) => hasAgeRange(p, 6, 18) // 6 a 18 meses
        },
        {
            id: 'bebe_janelas',
            pergunta: 'Janelas possuem telas de proteção certificadas e dentro da validade?',
            categoria: 'quedas',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'bebe_moveis_janela',
            pergunta: 'Móveis estão longe das janelas (para evitar escalada)?',
            categoria: 'quedas',
            priority: 'high',
            condition: (p) => hasAgeRange(p, 12, 60) // 1 a 5 anos
        },
        {
            id: 'bebe_baba',
            pergunta: 'Babá eletrônica está funcionando e posicionada corretamente?',
            categoria: 'monitoramento',
            priority: 'medium',
            condition: () => true
        }
    ],

    // --- QUARTO DE IDOSO ---
    quarto_idoso: [
        {
            id: 'idoso_luz',
            pergunta: 'Existe luz noturna ou interruptor acessível da cama?',
            categoria: 'iluminacao',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'idoso_tapetes',
            pergunta: 'O caminho até o banheiro está livre de tapetes soltos?',
            categoria: 'quedas',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'idoso_cama',
            pergunta: 'A altura da cama permite apoiar os pés no chão ao sentar?',
            categoria: 'moveis',
            priority: 'medium',
            condition: () => true
        },
        {
            id: 'idoso_celular',
            pergunta: 'Há um telefone ou celular carregado ao alcance da cama?',
            categoria: 'emergencia',
            priority: 'high',
            condition: () => true
        }
    ],

    // --- QUARTO DE CASAL/ADULTO ---
    quarto_casal: [
        {
            id: 'casal_remedios',
            pergunta: 'Medicamentos e cosméticos estão trancados ou fora de alcance?',
            categoria: 'toxicos',
            priority: 'high',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0
        },
        {
            id: 'casal_objetos',
            pergunta: 'Objetos cortantes (tesouras, alicates) estão seguros?',
            categoria: 'objetos',
            priority: 'medium',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0
        },
        {
            id: 'casal_armas',
            pergunta: 'Armas de fogo (se houver) estão em cofre e desmuniciadas?',
            categoria: 'armas',
            priority: 'critical',
            condition: () => true
        }
    ],

    // --- BANHEIRO ---
    banheiro: [
        {
            id: 'banho_piso',
            pergunta: 'O Box possui tapete antiderrapante de borracha?',
            categoria: 'piso',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'banho_barras',
            pergunta: 'Existem barras de apoio no box e vaso sanitário?',
            categoria: 'acessibilidade',
            priority: 'high',
            condition: (p) => p?.moradores?.idosos?.quantidade > 0
        },
        {
            id: 'banho_tampa',
            pergunta: 'A tampa do vaso sanitário possui trava de segurança?',
            categoria: 'afogamento',
            priority: 'high',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0
        },
        {
            id: 'banho_remedios',
            pergunta: 'Medicamentos estão guardados em armário alto (não na pia)?',
            categoria: 'toxicos',
            priority: 'high',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0
        },
        {
            id: 'banho_temp',
            pergunta: 'A temperatura da água é testada antes do banho do bebê?',
            categoria: 'queimaduras',
            priority: 'high',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0
        }
    ],

    // --- ÁREA EXTERNA / PISCINA ---
    area_externa: [
        {
            id: 'ext_piscina_cerca',
            pergunta: 'A piscina possui cerca física de isolamento (mín 1.20m)?',
            categoria: 'afogamento',
            priority: 'high',
            condition: (p) => p?.residencia?.ambientes?.piscina
        },
        {
            id: 'ext_piscina_lona',
            pergunta: 'A piscina possui capa de proteção que suporta peso?',
            categoria: 'afogamento',
            priority: 'medium',
            condition: (p) => p?.residencia?.ambientes?.piscina
        },
        {
            id: 'ext_ralo',
            pergunta: 'O ralo da piscina é do tipo anti-aprisionamento?',
            categoria: 'afogamento',
            priority: 'high',
            condition: (p) => p?.residencia?.ambientes?.piscina
        },
        {
            id: 'ext_plantas',
            pergunta: 'Jardim livre de plantas espinhosas ou tóxicas?',
            categoria: 'jardim',
            priority: 'medium',
            condition: (p) => p?.residencia?.ambientes?.quintal
        },
        {
            id: 'ext_ferramentas',
            pergunta: 'Ferramentas de jardim estão trancadas?',
            categoria: 'objetos',
            priority: 'medium',
            condition: (p) => p?.residencia?.ambientes?.quintal
        },
        // --- RISCOS RURAIS (Sítio / Chácara) ---
        {
            id: 'ext_poco',
            pergunta: 'O poço ou cisterna possui tampa de concreto ou cadeado inamovível?',
            categoria: 'afogamento',
            priority: 'critical',
            condition: (p) => p?.residencia?.tipoImovel === 'sitio' || p?.residencia?.tipoImovel === 'chacara'
        },
        {
            id: 'ext_lago',
            pergunta: 'O acesso a lagos, açudes ou represas está cercado fisicamente?',
            categoria: 'afogamento',
            priority: 'critical',
            condition: (p) => p?.residencia?.tipoImovel === 'sitio' || p?.residencia?.tipoImovel === 'chacara'
        },
        {
            id: 'ext_fossa',
            pergunta: 'A tampa da fossa séptica está íntegra, nivelada e segura contra pisoteio?',
            categoria: 'estrutura',
            priority: 'high',
            condition: (p) => p?.residencia?.tipoImovel === 'sitio' || p?.residencia?.tipoImovel === 'chacara'
        },
        {
            id: 'ext_animais_peconhentos',
            pergunta: 'O mato ao redor da casa sede está roçado (prevenção cobras/escorpiões)?',
            categoria: 'animais',
            condition: (p) => p?.residencia?.tipoImovel === 'sitio' || p?.residencia?.tipoImovel === 'chacara'
        },
        // --- RISCOS CONDOMÍNIO (Apartamento) ---
        {
            id: 'ext_extintor',
            pergunta: 'Você identificou onde ficam os extintores de incêndio no seu andar?',
            categoria: 'emergencia',
            priority: 'high',
            condition: (p) => p?.residencia?.tipoImovel === 'apartamento'
        },
        {
            id: 'ext_escada_emergencia',
            pergunta: 'As escadas de emergência e rotas de fuga estão desobstruídas?',
            categoria: 'emergencia',
            priority: 'critical',
            condition: (p) => p?.residencia?.tipoImovel === 'apartamento'
        },
        {
            id: 'ext_playground',
            pergunta: 'Os brinquedos do playground do prédio estão em bom estado (sem ferrugem/pontas)?',
            categoria: 'lazer',
            priority: 'medium',
            condition: (p) => p?.residencia?.tipoImovel === 'apartamento' && (p?.moradores?.criancas?.quantidade > 0 || p?.moradores?.bebes?.quantidade > 0)
        }
    ],

    // --- ESCADAS ---
    escada: [
        {
            id: 'escada_corrimao',
            pergunta: 'Existe corrimão firme em ambos os lados?',
            categoria: 'acesso',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'escada_portao',
            pergunta: 'Existem portões de segurança no topo e na base?',
            categoria: 'quedas',
            priority: 'high',
            condition: (p) => p?.moradores?.bebes?.quantidade > 0 || p?.moradores?.criancas?.quantidade > 0 || p?.pets?.cachorros > 0
        },
        {
            id: 'escada_fita',
            pergunta: 'Degraus possuem fitas antiderrapantes e sinalização?',
            categoria: 'piso',
            priority: 'medium',
            condition: () => true
        },
        {
            id: 'escada_ilum',
            pergunta: 'A iluminação cobre todos os degraus sem sombras?',
            categoria: 'iluminacao',
            priority: 'medium',
            condition: () => true
        }
    ],

    // --- GARAGEM/OFICINA ---
    garagem: [
        {
            id: 'gar_quimicos',
            pergunta: 'Produtos automotivos e tintas estão em armário trancado?',
            categoria: 'toxicos',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'gar_monoxido',
            pergunta: 'O carro nunca fica ligado com a garagem fechada?',
            categoria: 'ar',
            priority: 'high',
            condition: () => true
        },
        {
            id: 'gar_ferramentas',
            pergunta: 'Ferramentas elétricas estão desligadas e fora de alcance?',
            categoria: 'eletrica',
            priority: 'high',
            condition: (p) => p?.moradores?.criancas?.quantidade > 0
        }
    ]
};

// Helper: Check age range in months
function hasAgeRange(profile, minMonths, maxMonths) {
    if (!profile?.moradores?.bebes?.idades && !profile?.moradores?.criancas?.idades) return false;

    // Combine all ages (converting years to months for 'criancas')
    const bebes = profile.moradores?.bebes?.idades || [];
    const criancas = (profile.moradores?.criancas?.idades || []).map(a => a * 12);
    const todasIdades = [...bebes, ...criancas];

    return todasIdades.some(age => age >= minMonths && age <= maxMonths);
}

// Main function to get filtered questions
export function getQuestionsForRoom(roomId, profile) {
    const allQuestions = ChecklistData[roomId] || [];

    // Filter based on condition
    const filtered = allQuestions.filter(q => {
        try {
            return q.condition(profile);
        } catch (e) {
            if (__DEV__) { console.warn(`Error evaluating condition for ${q.id}`, e); }
            return true; // Default to showing if error
        }
    });

    return filtered;
}

export function getRoomInfo(roomId) {
    const meta = {
        sala: { nome: 'Sala de Estar', emoji: '🛋️' },
        cozinha: { nome: 'Cozinha', emoji: '🍳' },
        quarto_bebe: { nome: 'Quarto do Bebê', emoji: '👶' },
        quarto_crianca: { nome: 'Quarto de Criança', emoji: '🧸' }, // Mapped to quarto_bebe logic usually or seperate
        quarto_casal: { nome: 'Quarto de Casal', emoji: '🛏️' },
        quarto_idoso: { nome: 'Quarto de Idoso', emoji: '👴' },
        banheiro: { nome: 'Banheiro', emoji: '🚿' },
        area_externa: { nome: 'Área Externa', emoji: '🌳' },
        garagem: { nome: 'Garagem / Oficina', emoji: '🚗' },
        escada: { nome: 'Escadas', emoji: '🪜' }
    };
    return meta[roomId] || { nome: 'Ambiente', emoji: '🏠' };
}
