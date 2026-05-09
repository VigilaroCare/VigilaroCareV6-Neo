/**
 * ProtectionProfiles.js
 * Base de Conhecimento de Proteção Ativa - Metodologia 3D
 * 
 * Contém os perfis de risco detalhados e recomendações empáticas.
 */

export const PROTECTION_PROFILES = [
    {
        id: 'bebe_rn',
        label: 'Bebê (0 a 6 meses)',
        emoji: '👶',
        minAgeMonths: 0,
        maxAgeMonths: 6,
        description: 'Fase de total dependência. A segurança depende 100% do ambiente de sono e banho.',
        risks: [
            { title: 'Sufocamento', desc: 'Roupa de cama solta, almofadas ou "kit berço" no berço.', severity: 'CRITICO', icon: 'bed' },
            { title: 'Engasgamento', desc: 'Dormir de bruços ou regurgitação.', severity: 'ALTO', icon: 'alert-circle' },
            { title: 'Quedas', desc: 'De trocadores, camas ou sofás (mesmo que não rolem ainda).', severity: 'ALTO', icon: 'download' },
            { title: 'Queimaduras', desc: 'Água do banho ou leite muito quente.', severity: 'MEDIO', icon: 'thermometer' }
        ],
        actions: [
            'Colocar o bebê para dormir sempre de barriga para cima.',
            'Remover brinquedos, travesseiros e protetores do berço (berço vazio é berço seguro).',
            'Jamais aquecer mamadeira no micro-ondas (risco de aquecimento desigual).',
            'Nunca deixar o bebê sozinho em locais altos, nem por um segundo.'
        ]
    },
    {
        id: 'bebe_descoberta',
        label: 'Bebê (7 a 12 meses)',
        emoji: '🚼',
        minAgeMonths: 7,
        maxAgeMonths: 12,
        description: 'Fase de descoberta e fase oral. Curiosidade máxima com noção zero de perigo.',
        risks: [
            { title: 'Ingestão de Objetos', desc: 'Brinquedos pequenos, peças soltas, moedas no chão.', severity: 'CRITICO', icon: 'grid' },
            { title: 'Intoxicação', desc: 'Acesso a produtos de limpeza em armários baixos.', severity: 'CRITICO', icon: 'flask' },
            { title: 'Choques', desc: 'Dedos em tomadas desprotegidas.', severity: 'ALTO', icon: 'flash' },
            { title: 'Andadores', desc: 'Alto risco de traumatismos e quedas de escada.', severity: 'ALTO', icon: 'walk' }
        ],
        actions: [
            'Evite andadores (prefira cercadinhos seguros ou tapetes de atividades).',
            'Instale bloqueios (babygates) no topo e base das escadas e na cozinha.',
            'Proteja todas as tomadas elétricas ao alcance.',
            'Tranque produtos de limpeza e remédios em armários altos.'
        ]
    },
    {
        id: 'crianca_exploradora',
        label: 'Criança (1 a 5 anos)',
        emoji: '🧸',
        minAgeYears: 1,
        maxAgeYears: 5,
        description: 'Pequenos exploradores que escalam tudo. Energia alta e busca por autonomia.',
        risks: [
            { title: 'Quedas de Altura', desc: 'Janelas e sacadas sem proteção são perigo mortal.', severity: 'CRITICO', icon: 'alert' },
            { title: 'Tombamento de Móveis', desc: 'Escalar estantes ou TVs que não estão fixas.', severity: 'CRITICO', icon: 'tv' },
            { title: 'Queimaduras', desc: 'Cabos de panela no fogão ou forno quente.', severity: 'ALTO', icon: 'flame' },
            { title: 'Cortes', desc: 'Acesso a facas ou objetos de vidro.', severity: 'MEDIO', icon: 'cut' }
        ],
        actions: [
            'Instalação inegociável de redes de proteção em janelas e sacadas.',
            'Fixe móveis altos e TVs na parede para evitar tombamento.',
            'Cozinhe nas bocas de trás do fogão e vire os cabos para dentro.',
            'Supervisão visual constante (olho no olho) em piscinas e áreas externas.'
        ]
    },
    {
        id: 'crianca_escolar',
        label: 'Criança (6 a 14 anos)',
        emoji: '🚲',
        minAgeYears: 6,
        maxAgeYears: 14,
        description: 'Energia, brincadeiras dinâmicas e imitação de heróis. Riscos externos aumentam.',
        risks: [
            { title: 'Atropelamentos', desc: 'Correr para a rua atrás de bola ou pipa.', severity: 'CRITICO', icon: 'car' },
            { title: 'Choques Elétricos', desc: 'Pipas (papagaios) perto da rede elétrica.', severity: 'CRITICO', icon: 'flash' },
            { title: 'Quedas Graves', desc: 'Muros, árvores ou bicicletas sem proteção.', severity: 'ALTO', icon: 'bicycle' }
        ],
        actions: [
            'Oriente sobre nunca brincar perto de fios elétricos.',
            'Use capacete e joelheiras para bicicleta e skate.',
            'Ensine a olhar os dois lados da rua e não correr para a via.',
            'Eduque sobre os perigos reais de fogo e eletricidade.'
        ]
    },
    {
        id: 'adolescente',
        label: 'Adolescente',
        emoji: '🎧',
        minAgeYears: 15,
        maxAgeYears: 18,
        description: 'Busca de autoafirmação e distração tecnológica. O risco é a "coragem excessiva".',
        risks: [
            { title: 'Distração', desc: 'Acidentes por uso excessivo de fones e telas (alienação do ambiente).', severity: 'MEDIO', icon: 'headset' },
            { title: 'Riscos de "Coragem"', desc: 'Desafios perigosos e subestimar riscos físicos.', severity: 'ALTO', icon: 'fitness' },
            { title: 'Choques/Fios', desc: 'Carregadores de celular em más condições ou na cama.', severity: 'MEDIO', icon: 'flash' }
        ],
        actions: [
            'Mantenha diálogo aberto sobre responsabilidade e segurança.',
            'Organize o quarto para evitar emaranhados de fios e tropeços.',
            'Alerte sobre o isolamento auditivo causado por fones em locais de risco.'
        ]
    },
    {
        id: 'adulto',
        label: 'Adulto',
        emoji: '👤',
        minAgeYears: 19,
        maxAgeYears: 59,
        description: 'Vítimas da pressa e do improviso. A confiança excessiva gera acidentes.',
        risks: [
            { title: 'Improviso (Gambiarra)', desc: 'Usar cadeiras como escada ou ferramentas erradas.', severity: 'MEDIO', icon: 'construct' },
            { title: 'Choques Elétricos', desc: 'Manutenção sem desligar a chave geral.', severity: 'ALTO', icon: 'flash' },
            { title: 'Lesões', desc: 'Falta de EPI em limpezas pesadas ou jardinagem.', severity: 'MEDIO', icon: 'body' }
        ],
        actions: [
            'Não improvise: use uma escada adequada, não um banco.',
            'Use EPIs (luvas, óculos) para química ou jardinagem.',
            'Mantenha organização para evitar tropeços na correria do dia a dia.'
        ]
    },
    {
        id: 'idoso',
        label: 'Idoso (60+)',
        emoji: '👴',
        minAgeYears: 60,
        maxAgeYears: 150,
        description: 'Grupo de maior risco. Fragilidade óssea e reflexos reduzidos exigem ambiente adaptado.',
        risks: [
            { title: 'Quedas e Fraturas', desc: 'Tapetes soltos e pisos lisos são inimigos mortais (fêmur).', severity: 'CRITICO', icon: 'alert' },
            { title: 'Intoxicação', desc: 'Erro na dosagem de medicamentos por confusão ou visão.', severity: 'ALTO', icon: 'medkit' },
            { title: 'Queimaduras', desc: 'Panela esquecida no fogo ou água muito quente.', severity: 'ALTO', icon: 'flame' }
        ],
        actions: [
            'Adequação total: Barras no banheiro, sem tapetes soltos, luz automática.',
            'Organize remédios em caixas semanais (blisters).',
            'Use calçados fechados e antiderrapantes (evite chinelos soltos).',
            'Instale fechaduras que abram por fora no banheiro (em caso de mal súbito).'
        ]
    }
];

export const SPECIAL_PROFILES = {
    'pcd': {
        id: 'pcd',
        label: 'Acessibilidade (PCD)',
        emoji: '♿',
        description: 'Mobilidade reduzida exige adaptação total para evitar barreiras.',
        risks: [
            { title: 'Rota de Fuga', desc: 'Dificuldade de sair rápido em incêndios.', severity: 'CRITICO', icon: 'exit' },
            { title: 'Barreiras', desc: 'Quedas em degraus ou tapetes não adaptados.', severity: 'ALTO', icon: 'alert' }
        ],
        actions: [
            'Garanta portas largas e rampas de acesso.',
            'Adapte banheiros com barras e cadeiras de banho.',
            'Planeje uma rota de fuga clara e desobstruída.'
        ]
    },
    'fumante': {
        id: 'fumante',
        label: 'Fumante na Residência',
        emoji: '🚬',
        description: 'Risco aumentado de incêndio silencioso.',
        risks: [
            { title: 'Incêndio', desc: 'Bitucas mal apagadas ou fumar na cama.', severity: 'CRITICO', icon: 'flame' },
            { title: 'Queimaduras', desc: 'Adormecer com cigarro aceso.', severity: 'CRITICO', icon: 'bed' }
        ],
        actions: [
            'Regra de Ouro: Nunca fumar na cama ou com sono.',
            'Umideça as bitucas antes de descartar no lixo.'
        ]
    },
    'pet': {
        id: 'pet',
        label: 'Pet (Cães e Gatos)',
        emoji: '🐾',
        description: 'Curiosos e rápidos. O perigo está no acesso ao que não devem.',
        risks: [
            { title: 'Plantas Tóxicas', desc: 'Ingestão de folhagens venenosas no jardim/vaso.', severity: 'ALTO', icon: 'leaf' },
            { title: 'Fuga', desc: 'Portões abertos ou frestas na grade.', severity: 'ALTO', icon: 'walk' },
            { title: 'Eletricidade', desc: 'Roer fios elétricos expostos.', severity: 'MEDIO', icon: 'flash' }
        ],
        actions: [
            'Identifique e remova plantas tóxicas (ex: Comigo-ninguém-pode).',
            'Mantenha portões fechados e use telas em janelas (gatos).',
            'Proteja fios elétricos e não deixe produtos químicos no chão.'
        ]
    }
};

/**
 * Função Helper para encontrar o perfil correto
 */
export function getProtectionProfile(profile) {
    if (!profile) return null;

    // 1. Verificar tipos especiais PRIMEIRO se houver flag (ex: PCD, Fumante)
    // Implementar lógica de flags customizadas aqui se o objeto profile tiver
    if (profile.pcd || profile.condicoesEspeciais?.includes('pcd')) {
        // Nota: PCD pode ser combinado com idade. 
        // Idealmente retornamos um array de perfis ou um perfil "Hibrido".
        // Por simplicidade neste passo, retornamos o perfil de idade MAS com riscos PCD adicionados?
        // Vamos manter a lógica de Idade como BASE, e PCD como ADICIONAL.
        // Retornaremos um objeto composto.
    }

    if (profile.tipo === 'pet') {
        return SPECIAL_PROFILES['pet'];
    }

    // 2. Calcular Idade em Meses e Anos
    const birth = new Date(profile.dataNascimento);
    const now = new Date();

    // Dif em meses
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months--;

    const years = Math.floor(months / 12);

    // 3. Match Profile
    // Verificamos os buckets de baixo para cima
    if (months <= 6) return PROTECTION_PROFILES.find(p => p.id === 'bebe_rn');
    if (months <= 12) return PROTECTION_PROFILES.find(p => p.id === 'bebe_descoberta');
    if (years <= 5) return PROTECTION_PROFILES.find(p => p.id === 'crianca_exploradora');
    if (years <= 14) return PROTECTION_PROFILES.find(p => p.id === 'crianca_escolar');
    if (years <= 18) return PROTECTION_PROFILES.find(p => p.id === 'adolescente');
    if (years < 60) return PROTECTION_PROFILES.find(p => p.id === 'adulto');
    return PROTECTION_PROFILES.find(p => p.id === 'idoso');
}
