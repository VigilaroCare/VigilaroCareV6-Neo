/**
 * alertas_sazonais.js
 * Alertas de Segurança para Datas Especiais e Períodos Sazonais
 * Vigilaro Care V5
 */

export const ALERTAS_SAZONAIS = {
    id: 'alertas_sazonais',
    titulo: 'Alertas Sazonais',
    emoji: '🎄',
    descricao: 'Riscos específicos de determinadas épocas do ano e eventos especiais.',

    periodos: [
        {
            id: 'natal_ano_novo',
            titulo: 'Natal e Ano Novo',
            emoji: '🎄',
            meses: [11, 12, 0], // Nov, Dez, Jan
            ativo: true,
            alertas: [
                {
                    id: 'arv_natural',
                    titulo: 'Árvore de Natal Natural',
                    risco: 'Incêndio',
                    descricao: 'Árvores naturais secam e se tornam altamente inflamáveis.',
                    prevencao: [
                        'Mantenha a árvore hidratada (base com água)',
                        'Afaste de fontes de calor e lareiras',
                        'Prefira luzes LED (não aquecem)',
                        'Desligue as luzes ao dormir ou sair'
                    ]
                },
                {
                    id: 'decoracoes',
                    titulo: 'Decorações e Enfeites',
                    risco: 'Incêndio e Intoxicação',
                    descricao: 'Produtos de baixa qualidade podem superaquecer ou conter materiais tóxicos.',
                    prevencao: [
                        'Compre produtos com selo INMETRO',
                        'Verifique a potência das luzes',
                        'Evite extensões sobrecarregadas',
                        'Mantenha enfeites pequenos longe de crianças e pets'
                    ]
                },
                {
                    id: 'fogos',
                    titulo: 'Fogos de Artifício',
                    risco: 'Queimaduras e Lesões',
                    descricao: 'Manipulação incorreta causa queimaduras graves e amputações.',
                    prevencao: [
                        'Compre apenas em locais autorizados',
                        'Nunca segure fogos nas mãos',
                        'Mantenha crianças e pets afastados',
                        'Tenha água por perto',
                        'Use óculos de proteção'
                    ]
                },
                {
                    id: 'bebidas',
                    titulo: 'Bebidas Alcoólicas',
                    risco: 'Intoxicação de Crianças',
                    descricao: 'Crianças podem ingerir bebidas deixadas ao alcance.',
                    prevencao: [
                        'Recolha copos imediatamente após brindes',
                        'Mantenha garrafas em local alto',
                        'Não deixe bebidas coloridas (parecem refrigerante) acessíveis'
                    ]
                }
            ]
        },
        {
            id: 'carnaval',
            titulo: 'Carnaval',
            emoji: '🎭',
            meses: [1, 2], // Fev, Mar
            ativo: false,
            alertas: [
                {
                    id: 'spray_espuma',
                    titulo: 'Spray de Espuma e Confete',
                    risco: 'Irritação ocular e respiratória',
                    descricao: 'Contato com olhos e inalação excessiva podem causar irritação.',
                    prevencao: [
                        'Não mire no rosto',
                        'Mantenha longe de bebês',
                        'Use em ambientes ventilados'
                    ]
                },
                {
                    id: 'fantasias',
                    titulo: 'Fantasias Inflamáveis',
                    risco: 'Queimaduras',
                    descricao: 'Tecidos sintéticos podem pegar fogo facilmente.',
                    prevencao: [
                        'Afaste-se de fogueiras e churrasqueiras',
                        'Evite fantasias longas e soltas perto de fogo'
                    ]
                }
            ]
        },
        {
            id: 'festas_juninas',
            titulo: 'Festas Juninas',
            emoji: '🎆',
            meses: [5, 6], // Jun, Jul
            ativo: false,
            alertas: [
                {
                    id: 'fogueira',
                    titulo: 'Fogueira',
                    risco: 'Queimaduras e Incêndio',
                    descricao: 'Fogueiras são tradicionais mas extremamente perigosas.',
                    prevencao: [
                        'Faça em local aberto e longe de vegetação',
                        'Cerque a fogueira com pedras',
                        'Tenha balde de água ou mangueira por perto',
                        'Nunca deixe crianças sem supervisão',
                        'Apague completamente antes de dormir ou sair'
                    ]
                },
                {
                    id: 'baloes',
                    titulo: 'Balões',
                    risco: 'Incêndio criminoso',
                    descricao: 'Soltar balões é CRIME (Lei 9.605/98) e causa incêndios florestais.',
                    prevencao: [
                        'NÃO solte balões (crime ambiental)',
                        'Denuncie quem soltar (190)'
                    ],
                    crime: true
                },
                {
                    id: 'bombinhas',
                    titulo: 'Bombinhas e Rojões',
                    risco: 'Mutilações',
                    descricao: 'Explodem antes do previsto causando amputações de dedos.',
                    prevencao: [
                        'Evite manipular',
                        'Nunca segure na mão',
                        'Mantenha crianças afastadas'
                    ]
                }
            ]
        },
        {
            id: 'ferias_verao',
            titulo: 'Férias de Verão',
            emoji: '☀️',
            meses: [11, 12, 0, 1], // Nov a Fev
            ativo: true,
            alertas: [
                {
                    id: 'piscina_praia',
                    titulo: 'Piscinas e Praias',
                    risco: 'Afogamento',
                    descricao: 'Afogamento é a segunda causa de morte entre crianças de 1 a 9 anos.',
                    prevencao: [
                        'Supervisão 100% do tempo (olhos na criança)',
                        'Nunca confie em boias de braço',
                        'Ensine a criança a nadar (a partir de 3-4 anos)',
                        'Respeite bandeiras na praia'
                    ]
                },
                {
                    id: 'sol_calor',
                    titulo: 'Sol e Calor Excessivo',
                    risco: 'Insolação e Queimaduras',
                    descricao: 'Exposição prolongada causa queimaduras e desidratação grave.',
                    prevencao: [
                        'Protetor solar a cada 2 horas',
                        'Evite sol entre 10h e 16h',
                        'Hidrate-se constantemente',
                        'Nunca deixe pessoas/pets no carro fechado'
                    ]
                }
            ]
        },
        {
            id: 'inverno',
            titulo: 'Inverno',
            emoji: '❄️',
            meses: [5, 6, 7], // Jun, Jul, Ago
            ativo: false,
            alertas: [
                {
                    id: 'aquecedores',
                    titulo: 'Aquecedores Elétricos',
                    risco: 'Incêndio e Queimaduras',
                    descricao: 'Aquecedores são causa frequente de incêndios residenciais.',
                    prevencao: [
                        'Mantenha 1 metro de distância de cortinas e móveis',
                        'Nunca cubra ou bloqueie saídas de ar',
                        'Desligue ao dormir ou sair',
                        'Prefira modelos com desligamento automático'
                    ]
                },
                {
                    id: 'gas_fechado',
                    titulo: 'Gás em Ambiente Fechado',
                    risco: 'Intoxicação por CO',
                    descricao: 'Aquecedores a gás em ambientes sem ventilação causam intoxicação fatal.',
                    prevencao: [
                        'NUNCA use fogão para aquecer ambiente',
                        'Mantenha ventilação mesmo no frio',
                        'Instale detector de monóxido de carbono'
                    ]
                }
            ]
        },
        {
            id: 'eventos_esportivos',
            titulo: 'Jogos e Comemorações',
            emoji: '⚽',
            meses: [10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // Sempre disponível ou específico? Deixarei todos por enquanto ou focado em Nov.
            ativo: true,
            alertas: [
                {
                    id: 'fogos_golden',
                    titulo: '🏆 Dicas de Ouro: Fogos',
                    risco: 'Lesões Graves',
                    descricao: 'Em dias de jogo, o uso de fogos aumenta drasticamente. Proteja sua família e pets.',
                    prevencao: [
                        'Mantenha pets em cômodo fechado e com som ambiente (TV/Música) para abafar o barulho',
                        'Nunca solte fogos sob efeito de álcool',
                        'Respeite a distância de 50m de residências',
                        'Prefira fogos silenciosos (respeito a autistas e animais)'
                    ],
                    destaque: true // Flag customizada para UI
                }
            ]
        }
    ],

    checklist: {
        natalAnoNovo: [
            { id: 'saz1', texto: 'Árvore afastada de fontes de calor?' },
            { id: 'saz2', texto: 'Luzes LED (não aquecem)?' },
            { id: 'saz3', texto: 'Enfeites com selo INMETRO?' },
            { id: 'saz4', texto: 'Extensões não sobrecarregadas?' },
            { id: 'saz5', texto: 'Bebidas fora do alcance de crianças?' },
            { id: 'saz6', texto: 'Fogos comprados em local autorizado?' }
        ],
        juninas: [
            { id: 'saz7', texto: 'Fogueira afastada de vegetação?' },
            { id: 'saz8', texto: 'Balde de emergência por perto?' },
            { id: 'saz9', texto: 'Crianças supervisionadas?' },
            { id: 'saz10', texto: 'Sem balões (crime)?' }
        ],
        verao: [
            { id: 'saz11', texto: 'Supervisão constante na água?' },
            { id: 'saz12', texto: 'Protetor solar disponível?' },
            { id: 'saz13', texto: 'Hidratação constante?' }
        ]
    },

    // Função para obter alertas do período atual
    getAlertasAtivos: () => {
        const mesAtual = new Date().getMonth();
        return ALERTAS_SAZONAIS.periodos.filter(p => p.meses.includes(mesAtual));
    }
};

export default ALERTAS_SAZONAIS;
