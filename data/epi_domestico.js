/**
 * epi_domestico.js
 * Guia de Equipamentos de Proteção Individual para Uso Doméstico
 * Vigilaro Care V5
 */

export const EPI_DOMESTICO = {
    id: 'epi_dom',
    titulo: 'EPIs para Atividades Domésticas',
    emoji: '🦺',
    descricao: 'Equipamentos de Proteção Individual não são apenas para obras. Muitas atividades domésticas exigem proteção adequada.',

    advertencia: 'Acidentes domésticos podem parecer pequenos, mas causam milhares de lesões graves por ano. Use EPIs!',

    categorias: [
        {
            id: 'epi_cabeca',
            titulo: 'Proteção para a Cabeça',
            icone: 'helmet-outline',
            emoji: '⛑️',
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
            icone: 'glasses-outline',
            emoji: '🥽',
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
            icone: 'hand-left-outline',
            emoji: '🧤',
            tipos: [
                {
                    tipo: 'Luvas de borracha/látex',
                    uso: 'Limpeza com produtos químicos, lavagem pesada'
                },
                {
                    tipo: 'Luvas de couro/vaqueta',
                    uso: 'Jardinagem, manuseio de ferramentas, objetos ásperos'
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
            icone: 'ear-outline',
            emoji: '👂',
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
            icone: 'footsteps-outline',
            emoji: '👟',
            quando: [
                'Jardinagem (risco de animais peçonhentos)',
                'Limpeza de quintais e áreas com entulho',
                'Reformas e obras',
                'Carregar objetos pesados',
                'Trabalhar com ferramentas que podem cair'
            ],
            equipamento: 'Botina de segurança com biqueira',
            alternativa: 'Se não tiver botina, use tênis fechado e resistente (NUNCA chinelo)',
            dica: 'Sapatos abertos são causa frequente de acidentes com quedas de objetos.'
        },
        {
            id: 'epi_respiratorio',
            titulo: 'Proteção Respiratória',
            icone: 'thermometer-outline',
            emoji: '😷',
            quando: [
                'Usar tintas, vernizes ou solventes',
                'Lixar paredes ou madeiras',
                'Limpar áreas com mofo',
                'Usar produtos com vapores fortes (cloro, amônia)',
                'Trabalhar em ambientes com poeira'
            ],
            tipos: [
                {
                    tipo: 'Máscara PFF2/N95',
                    uso: 'Poeira, partículas, mofo'
                },
                {
                    tipo: 'Máscara com filtro químico',
                    uso: 'Vapores de solventes, tintas, produtos químicos'
                }
            ],
            dica: 'Trabalhe sempre em ambientes VENTILADOS. Máscara é complemento, não substituto.'
        },
        {
            id: 'epi_corpo',
            titulo: 'Proteção para o Corpo',
            icone: 'shirt-outline',
            emoji: '👷',
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
