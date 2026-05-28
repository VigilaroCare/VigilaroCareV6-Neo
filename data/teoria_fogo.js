// Nomes de ícones resolvidos via NeoIcon (Phosphor) — não importa
// component refs do iconsax pra não amarrar o data layer à biblioteca.
// O nome viaja como string e a tela renderiza com <NeoIcon name={item.icon} />.

export const TEORIA_FOGO_DATA = {
    'triangulo': {
        titulo: 'O Triângulo do Fogo',
        subtitulo: 'Conceitos Básicos',
        icon: 'Triangle',
        iconColor: '#EF4444', // Red
        bg: '#FEE2E2', // Red 100
        imagemUrl: 'https://images.pexels.com/photos/15129794/pexels-photo-15129794.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Para que o fogo exista, são necessários três elementos: Combustível, Comburente (Oxigênio) e Calor. Se retirar um, o fogo apaga.',
        importancia: 'Entender como o fogo começa é o primeiro passo para saber como apagá-lo ou prevení-lo.',
        comoIdentificar: [
            'Combustível: O que queima (papel, madeira, gás).',
            'Comburente: O ar que respiramos (Oxigênio).',
            'Calor: A faísca ou chama inicial.'
        ],
        exemplos: [
            'Abafamento: Retira o Oxigênio (ex: tampar a panela).',
            'Resfriamento: Retira o Calor (ex: jogar água).',
            'Isolamento: Retira o Combustível (ex: fechar o gás).'
        ]
    },
    'classes': {
        titulo: 'Classes de Incêndio',
        subtitulo: 'Tipos de Fogo',
        icon: 'Fire',
        iconColor: '#F59E0B', // Orange
        bg: '#FEF3C7', // Orange 100
        imagemUrl: 'https://images.pexels.com/photos/30591338/pexels-photo-30591338.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'O fogo é classificado pelo tipo de material que está queimando. Cada classe exige um extintor diferente.',
        importancia: 'Usar o extintor errado (ex: água em fogo elétrico) pode ser fatal.',
        comoIdentificar: [
            'Classe A: Sólidos (papel, madeira, tecido). Deixam cinzas.',
            'Classe B: Líquidos inflamáveis (gasolina, álcool, cera). Não deixam cinzas.',
            'Classe C: Equipamentos Elétricos energizados.',
            'Classe D: Metais combustíveis (magnésio, titânio).',
            'Classe K: Óleos e gorduras de cozinha (fritadeiras).'
        ]
    },
    'extintores': {
        titulo: 'Tipos de Extintores',
        subtitulo: 'Como Escolher',
        icon: 'Drop',
        iconColor: '#3B82F6', // Blue
        bg: '#DBEAFE', // Blue 100
        imagemUrl: 'https://images.pexels.com/photos/4805958/pexels-photo-4805958.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Cilindros com agentes químicos específicos para combater cada classe de fogo.',
        importancia: 'O extintor ABC é o mais versátil para residências, cobrindo sólidos, líquidos e elétricos.',
        comoIdentificar: [
            'Água (A): Só para papel/madeira. NUNCA em elétrico ou óleo.',
            'Pó Químico (BC): Líquidos e elétricos. Suja muito.',
            'Pó ABC: O "curinga" residencial.',
            'CO2 (BC): Elétricos e líquidos. Não deixa resíduos (ideal p/ eletrônicos).'
        ],
        comoEvitar: [
            'Verifique a validade anualmente.',
            'O manômetro deve estar na faixa verde.',
            'O lacre deve estar intacto.'
        ]
    },
    'fuga': {
        titulo: 'Plano de Fuga',
        subtitulo: 'Evacuação Segura',
        icon: 'Wind', // Running/Wind concept
        iconColor: '#10B981', // Emerald
        bg: '#D1FAE5', // Emerald 100
        imagemUrl: 'https://images.pexels.com/photos/5036652/pexels-photo-5036652.jpeg?auto=compress&cs=tinysrgb&w=1200',
        definicao: 'Estratégia pré-definida de como sair da casa em caso de incêndio.',
        importancia: 'No pânico e na fumaça, você não consegue pensar. O plano deve ser treinado.',
        comoIdentificar: [
            'Defina 2 rotas de saída de cada cômodo.',
            'Defina um ponto de encontro fora da casa.',
            'Nunca use elevadores.'
        ],
        primeirosSocorros: 'Se houver fumaça, engatinhe (o ar limpo fica embaixo). Toque na porta antes de abrir (se quente, não abra).',
        oQueNaoFazer: [
            'Não volte para pegar nada.',
            'Não se tranque em banheiros (se possível, vá para janela).',
            'Não corra se sua roupa pegar fogo (Pare, Deite, Role).'
        ]
    }
};
