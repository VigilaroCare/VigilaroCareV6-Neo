/**
 * epi_domestico.js
 * Guia de Equipamentos de Proteção Individual para Uso Doméstico
 * Vigilaro Care V5
 */

export const EPI_DOMESTICO = {
    id: 'epi_dom',
    titulo: 'EPIs para Atividades Domésticas',
    emoji: '🦺', icone: 'TShirt',
    descricao: 'Equipamentos de Proteção Individual não são apenas para obras. Muitas atividades domésticas exigem proteção adequada.',

    advertencia: 'Acidentes domésticos podem parecer pequenos, mas causam milhares de lesões graves por ano. Use EPIs!',

    categorias: [
        {
            id: 'epi_cabeca',
            titulo: 'Proteção para a Cabeça',
            icone: 'HardHat',
            emoji: '⛑️', icone: 'HardHat',
            imagemUrl: require('../assets/illustrations/pad/epi-protecao-individual_capaceteproteu00e7u00e3o_008.jpg'),
            quando: [
                'Reparos sob o telhado ou forros',
                'Podas de árvores com risco de queda de galhos',
                'Trabalhos com escadas em altura',
                'Reformas e demolições'
            ],
            equipamento: 'Capacete de proteção (EPI classe A ou B)',
            dica: 'Mantenha um capacete simples em casa para emergências e pequenas obras.'
        },
        {
            id: 'epi_olhos',
            titulo: 'Proteção para os Olhos',
            icone: 'Eyeglasses',
            emoji: '🥽', icone: 'Eyeglasses',
            imagemUrl: require('../assets/illustrations/pad/epi-protecao-individual_oculos-de-seguranca_009.jpg'),
            quando: [
                'Usar furadeira, esmerilhadeira ou lixadeira',
                'Cortar madeira ou metal',
                'Manusear produtos químicos (desentupidores, ácidos)',
                'Podar jardim (risco de galhos)',
                'Limpar com produtos em spray'
            ],
            equipamento: 'Óculos de proteção transparentes (ampla visão)',
            dica: 'Óculos graduados NÃO protegem. Use óculos de segurança sobre eles.'
        },
        {
            id: 'epi_maos',
            titulo: 'Proteção para as Mãos',
            icone: 'Hand',
            emoji: '🧤', icone: 'Hand',
            imagemUrl: require('../assets/illustrations/pad/generated_epi_maos_luvas.png'),
            tipos: [
                {
                    tipo: 'Luvas de borracha/látex',
                    uso: 'Limpeza com produtos químicos'
                },
                {
                    tipo: 'Luvas de raspa',
                    uso: 'Jardinagem, manuseio de entulho e depósito'
                },
                {
                    tipo: 'Luvas isolantes',
                    uso: 'Trabalhos elétricos'
                },
                {
                    tipo: 'Luvas anti-corte (malha de aço)',
                    uso: 'Usar facas afiadas, trabalhar com vidro'
                },
                {
                    tipo: 'Luvas nitrílicas descartáveis',
                    uso: 'Pintura, aplicação de resinas, trabalho fino'
                }
            ],
            dica: 'Tenha pelo menos um par de cada tipo em casa.'
        },
        {
            id: 'epi_ouvidos',
            titulo: 'Proteção para os Ouvidos',
            icone: 'Ear',
            emoji: '👂', icone: 'Ear',
            imagemUrl: require('../assets/illustrations/pad/epi-protecao-individual_boot-4485515_004.jpg'),
            quando: [
                'Usar furadeira por mais de 5 minutos',
                'Usar roçadeira/cortador de grama',
                'Usar lixadeira ou esmerilhadeira',
                'Serrar madeira com serra elétrica',
                'Qualquer ferramenta com ruído alto'
            ],
            equipamento: 'Protetor auricular (abafador ou plug)',
            dica: 'Exposição a ruído intenso causa perda auditiva IRREVERSÍVEL. Proteja-se sempre!',
            limiteDb: 85 // decibéis - limite de segurança
        },
        {
            id: 'epi_pes',
            titulo: 'Proteção para os Pés',
            icone: 'Footprints',
            emoji: '👟', icone: 'Sneaker',
            imagemUrl: require('../assets/illustrations/pad/epi-protecao-individual_bota-de-seguranca_007.jpg'),
            quando: [
                'Jardinagem (risco de animais peçonhentos)',
                'Limpeza de quintais e áreas com entulho',
                'Reformas e obras',
                'Carregar objetos pesados',
                'Trabalhar com ferramentas que podem cair'
            ],
            equipamento: 'Botas fechadas com solado grosso para jardinagem e depósito',
            alternativa: 'Calçado antiderrapante para idosos em casa',
            dica: 'Sapatos abertos são causa frequente de acidentes com quedas de objetos.'
        },
        {
            id: 'epi_respiratorio',
            titulo: 'Proteção Respiratória',
            icone: 'Thermometer',
            emoji: '😷', icone: 'FirstAid',
            imagemUrl: require('../assets/illustrations/pad/fotos-stock-genericas_mulher-mascara-alcool-gel_029.jpg'),
            quando: [
                'Usar tintas, vernizes ou solventes',
                'Lixar paredes ou madeiras',
                'Limpar áreas com mofo',
                'Usar produtos com vapores fortes (cloro, amônia)',
                'Trabalhar em ambientes com poeira'
            ],
            tipos: [
                {
                    tipo: 'Máscara PFF2',
                    uso: 'Poeira, serragem e pulverização de produtos'
                },
                {
                    tipo: 'Máscara simples',
                    uso: 'Limpeza com produtos de cheiro forte'
                },
                {
                    tipo: 'Máscara com respirador semifacial com cartucho químico',
                    uso: 'Gases, vapores e partículas'
                }
            ],
            dica: 'Trabalhe sempre em ambientes VENTILADOS. Máscara é complemento, não substituto.'
        },
        {
            id: 'epi_corpo',
            titulo: 'Proteção para o Corpo',
            icone: 'TShirt',
            emoji: '👷', icone: 'HardHat',
            imagemUrl: require('../assets/illustrations/pad/protetores-seguranca_avental-de-protecao_004.jpg'),
            quando: [
                'Podar plantas (espinhos, alergia)',
                'Manusear materiais abrasivos',
                'Trabalhar com solda ou faíscas',
                'Carregar objetos pesados ou irregulares',
                'Risco de respingos químicos'
            ],
            equipamento: 'Avental de couro ou PVC, manga comprida',
            dica: 'Roupas soltas podem enroscar em ferramentas. Use roupas justas ao corpo.'
        }
    ],

    atividadesEEpis: [
        {
            atividade: 'Jardinagem e Poda',
            epis: ['Luvas de couro', 'Óculos', 'Botina fechada', 'Manga comprida'],
            riscos: ['Espinhos', 'Animais peçonhentos', 'Galhos nos olhos']
        },

        {
            id: 'epi_jardim',
            titulo: 'Armadura do Jardineiro',
            icone: 'Leaf',
            emoji: '🧑‍🌾', icone: 'Plant',
            imagemUrl: require('../assets/illustrations/pad/generated_jardim.png'),
            quando: [
                'Mexer na terra ou podar arbustos espessos',
                'Trabalhar em áreas de mato alto no quintal',
                'Aplicar produtos químicos de jardinagem'
            ],
            equipamento: 'Calças compridas (barras fechadas), blusa de manga longa e botas de cano longo.',
            dica: 'Essa "armadura" impede que insetos subam pelas pernas e protege a pele da seiva corrosiva (látex) de plantas tóxicas.'
        },
        {
            atividade: 'Pintura de Paredes',
            epis: ['Óculos', 'Máscara PFF2', 'Luvas nitrílicas'],
            riscos: ['Respingos nos olhos', 'Inalação de vapores']
        },
        {
            atividade: 'Furar Parede',
            epis: ['Óculos', 'Protetor auricular', 'Máscara contra poeira'],
            riscos: ['Fragmentos nos olhos', 'Perda auditiva', 'Inalação de pó']
        },
        {
            atividade: 'Limpeza com Produtos Fortes',
            epis: ['Luvas de borracha', 'Óculos', 'Máscara (se vapores fortes)'],
            riscos: ['Queimaduras químicas nas mãos', 'Respingos nos olhos']
        },
        {
            atividade: 'Usar Serra Elétrica',
            epis: ['Óculos', 'Protetor auricular', 'Luvas anti-corte', 'Botina'],
            riscos: ['Fragmentos projetados', 'Cortes graves', 'Perda auditiva']
        },
        {
            atividade: 'Desentupir Ralos',
            epis: ['Luvas de borracha longas', 'Óculos', 'Máscara'],
            riscos: ['Contato com produtos cáusticos', 'Respingos corrosivos']
        }
    ],

    checklist: [
        { id: 'epi1', texto: 'Tenho óculos de proteção em casa?' },
        { id: 'epi2', texto: 'Tenho luvas de borracha para limpeza?' },
        { id: 'epi3', texto: 'Tenho luvas de couro para jardinagem?' },
        { id: 'epi4', texto: 'Tenho protetor auricular para ferramentas barulhentas?' },
        { id: 'epi5', texto: 'Tenho botina ou sapato fechado para obras?' },
        { id: 'epi6', texto: 'Tenho máscara PFF2 para poeira?' }
    ],

    ondeComprar: 'Lojas de construção (Leroy Merlin, C&C, Telhanorte), lojas de EPIs industriais, ou online.',

    investimento: {
        basico: {
            itens: ['Óculos', 'Luva borracha', 'Luva couro', 'Máscara PFF2'],
            custoAproximado: 'R$ 50-80'
        },
        completo: {
            itens: ['Todos os itens básicos', 'Protetor auricular', 'Botina', 'Capacete'],
            custoAproximado: 'R$ 150-250'
        }
    }
};

export default EPI_DOMESTICO;
