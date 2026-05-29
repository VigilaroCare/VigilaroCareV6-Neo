// Nomes de ícones resolvidos via NeoIcon (Phosphor) — passamos string,
// não component refs, pra não amarrar o data layer à biblioteca.
// O nome viaja como string e a tela renderiza com <NeoIcon name={item.icon} />.

export const PRODUTOS_CATEGORIAS_DATA = {
    'limpeza': {
        titulo: 'Limpeza Doméstica',
        subtitulo: 'Produtos Químicos',
        icon: 'Trash', // Cleaning bucket generic
        iconColor: '#0EA5E9', // Sky
        bg: '#E0F2FE', // Sky 100
        imagemUrl: 'https://images.pexels.com/photos/3177257/pexels-photo-3177257.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Produtos usados na higiene da casa contêm substâncias corrosivas e tóxicas (cloro, amônia).',
        importancia: 'O armazenamento incorreto (embaixo da pia) é a causa nº 1 de intoxicação infantil.',
        comoIdentificar: [
            'Sempre manter na embalagem original.',
            'Nunca misturar produtos (ex: água sanitária + desinfetante = gás tóxico).',
            'Manter no alto e trancado.'
        ],
        exemplos: [
            'Água Sanitária (Corrosiva aos olhos).',
            'Detergentes (Irritantes).',
            'Desengordurantes (Cáusticos).'
        ],
        primeirosSocorros: 'Se ingerir: NÃO provoque vômito. Ligue 0800 722 6001 (CIATOX). Se cair no olho: Lavar com água corrente 20 min.'
    },
    'jardim': {
        titulo: 'Jardinagem',
        subtitulo: 'Pesticidas e Adubos',
        icon: 'Brush', // Gardening tool generic
        iconColor: '#059669', // Emerald
        bg: '#D1FAE5', // Emerald 100
        imagemUrl: 'https://images.pexels.com/photos/4894608/pexels-photo-4894608.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Produtos para matar pragas e adubar plantas são altamente tóxicos para humanos e pets.',
        importancia: 'A ingestão acidental pode causar falência de órgãos.',
        comoIdentificar: [
            'Veneno de rato (Raticida).',
            'Herbicidas (Mata-mato).',
            'Adubos químicos (NPK).'
        ],
        comoEvitar: [
            'Usar luvas ao manusear.',
            'Não aplicar em dias de muito vento.',
            'Manter animais longe por 24h após aplicação.'
        ]
    },
    'manutencao': {
        titulo: 'Manutenção',
        subtitulo: 'Tintas e Solventes',
        icon: 'TruckFast', // Maintenance/Work generic
        iconColor: '#F59E0B', // Amber
        bg: '#FEF3C7', // Amber 100
        imagemUrl: 'https://images.pexels.com/photos/6068901/pexels-photo-6068901.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Tintas, vernizes, colas e solventes (thinner) emitem vapores tóxicos e são inflamáveis.',
        importancia: 'Risco duplo: Intoxicação por inalação e Incêndio.',
        comoIdentificar: [
            'Latas de tinta abertas.',
            'Garrafas de aguarrás/thinner.',
            'Colas de contato (sapateiro).'
        ],
        comoEvitar: [
            'Usar máscara ao pintar.',
            'Manter local ventilado.',
            'Longe de fontes de calor (cigarro, solda).'
        ]
    },
    'remedios': {
        titulo: 'Medicamentos',
        subtitulo: 'Farmácia Caseira',
        icon: 'Health', // Medical cross
        iconColor: '#EF4444', // Red
        bg: '#FEE2E2', // Red 100
        imagemUrl: 'https://images.pexels.com/photos/3873149/pexels-photo-3873149.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Remédios parecem "balinhas" para crianças. A sobredosagem é fatal.',
        importancia: 'Intoxicação medicamentosa é comum em crianças (curiosas) e idosos (confusão).',
        comoIdentificar: [
            'Xaropes doces.',
            'Comprimidos coloridos.',
            'Remédios de uso contínuo soltos na mesa.'
        ],
        comoEvitar: [
            'Caixa de remédios trancada no alto.',
            'Não tomar remédio no escuro.',
            'Descartar vencidos em farmácias (não no lixo).'
        ]
    }
};
