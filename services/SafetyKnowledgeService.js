/**
 * SafetyKnowledgeService.js
 * Serviço responsável por fornecer o conteúdo editorial "Premium" do Relatório de Proteção.
 * Baseado no livro "Guia Completo para Prevenção de Acidentes em Casa" (Agnaldo Fontinele).
 */

const INTRO_TEXTS = {
    'baby': {
        title: "A Fase do Encanto e Cuidado",
        text: "Para os pais, esta é a fase do encanto, mas exige atenção redobrada. Os bebês devem dormir de barriga para cima e o berço deve estar livre de objetos soltos. Lembre-se: um descuido de segundos pode ser fatal."
        // Ref: Pg 15, "Bebês de até 6 meses"
    },
    'toddler': {
        title: "Pequenos Exploradores (1 a 3 anos)",
        text: "Nesta idade, a curiosidade leva a escalar móveis e abrir gavetas. As quedas e cortes são comuns. É crucial manter portas de acesso a escadas e áreas de serviço sempre trancadas."
        // Ref: Pg 21, "Crianças de 1 a 3 anos"
    },
    'child': {
        title: "Energia e Descobertas (3 a 10 anos)",
        text: "Eles correm, escalam e buscam aventuras. A supervisão ainda é necessária, especialmente com bicicletas, piscinas e janelas. Ensine sobre os perigos, mas mantenha a proteção ativa."
        // Ref: Pg 23, "Crianças de 3 a 5 anos"
    },
    'teen': {
        title: "Ousadia e Autonomia",
        text: "A busca pela superação expõe os jovens a novos riscos. O diálogo é sua melhor ferramenta de prevenção. Alerte sobre os perigos da eletricidade e o uso responsável de equipamentos."
        // Ref: Pg 30, "Adolescentes"
    },
    'adult': {
        title: "Rotina e Prevenção",
        text: "Acidentes com adultos muitas vezes ocorrem por pressa ou improviso. Use ferramentas adequadas e mantenha a manutenção da casa em dia para evitar surpresas desagradáveis."
        // Ref: Pg 32, "Adultos"
    },
    'senior': {
        title: "Cuidado e Adaptação",
        text: "Com o tempo, a agilidade diminui. Quedas são o maior risco. Ambientes organizados, bem iluminados e livres de tapetes soltos são essenciais para garantir segurança e autonomia."
        // Ref: Pg 35, "Idosos"
    },
    'pet': {
        title: "Nossos Fiéis Companheiros",
        text: "Pets são como crianças curiosas. Cuidado com plantas tóxicas, fios elétricos expostos e acesso livre à rua. Mantenha produtos de limpeza fora do alcance das patinhas."
    }
};

const ENVIRONMENT_TEXTS = {
    'kitchen': {
        title: "Cozinha",
        riskLevel: "Alto",
        // Padrão Humano
        text: "Considerada o local mais perigoso da casa (responde por c. 40% das queimaduras infantis). Atenção redobrada com cabos de panelas e produtos tóxicos.",
        tip: "Crie uma barreira física e use as bocas de trás do fogão.",
        // Variante Pet
        pet: {
            text: "Cuidado com alimentos tóxicos caindo no chão. Uvas, chocolate, cebola e alho podem ser fatais para cães e gatos. Além disso, óleo quente respingado causa queimaduras graves.",
            tip: "Mantenha o lixo fechado e evite oferecer 'agrados' da mesa sem conhecimento veterinário.",
            riskLevel: "Alto"
        }
    },
    'bathroom': {
        title: "Banheiro",
        riskLevel: "Médio",
        text: "Principal cenário de quedas em idosos e afogamentos em bebês (banheira). Um palmo de água e 30 segundos são suficientes para um acidente fatal.",
        tip: "Mantenha a tampa do vaso fechada e use tapetes antiderrapantes.",
        pet: {
            text: "Vasos sanitários abertos são risco de afogamento para filhotes e fonte de bactérias. Produtos de limpeza no chão podem causar intoxicação por contato/lambedura.",
            tip: "Mantenha a tampa do vaso sempre fechada e produtos de limpeza em armários altos.",
            riskLevel: "Médio"
        }
    },
    'living_room': {
        title: "Sala de Estar",
        riskLevel: "Baixo",
        text: "Aparentemente inofensiva, mas esconde riscos de tombamento de móveis e choques elétricos em tomadas não protegidas.",
        tip: "Fixe a TV e móveis instáveis na parede para evitar esmagamentos.",
        pet: {
            text: "Fios elétricos são 'brinquedos' perigosos que causam choques e queimaduras na boca. Plantas ornamentais podem ser tóxicas se ingeridas.",
            tip: "Esconda fios com organizadores e verifique se suas plantas são 'Pet Friendly'.",
            riskLevel: "Médio"
        }
    },
    'bedroom': {
        title: "Quartos",
        riskLevel: "Baixo",
        text: "Janelas são pontos de atenção crítica contra quedas. Para bebês, o ambiente de sono seguro previne a sufocação (morte súbita).",
        tip: "Instale redes de proteção em janelas e sacadas.",
        pet: {
            text: "Janelas e sacadas sem rede são um convite para quedas fatais, especialmente para gatos (Síndrome do Gato Voador).",
            tip: "Redes de proteção certificadas são obrigatórias para apartamentos.",
            riskLevel: "Alto"
        }
    },
    'stairs': {
        title: "Escadas",
        riskLevel: "Crítico",
        text: "Local frequente de quedas graves. O uso de portões de segurança no topo e na base é indispensável para crianças e pets.",
        tip: "Corrimão firme e iluminação adequada são obrigatórios.",
        pet: {
            text: "Escadas lisas provocam escorregões que afetam a coluna de cães (especialmente os de coluna longa). Quedas de altura também são risco.",
            tip: "Use carpetes antiderrapantes nos degraus e bloqueie acesso de filhotes.",
            riskLevel: "Médio"
        }
    },
    'pool': {
        title: "Piscina",
        riskLevel: "Crítico",
        text: "O afogamento é a 2ª maior causa de morte acidental de 0-14 anos no Brasil. A piscina deve ter cercas físicas de isolamento e portão com trava automática.",
        tip: "Supervisão visual e ativa 100% do tempo. Boias não substituem coletes.",
        pet: {
            text: "Muitos pets caem na piscina e não conseguem sair pela escada, morrendo de exaustão, não de nado ruim. Capas térmicas dão falsa sensação de chão.",
            tip: "Tenha rampas de saída para animais (plataformas flutuantes) e cerque a área.",
            riskLevel: "Crítico"
        }
    },
    'laundry': {
        title: "Área de Serviço",
        riskLevel: "Médio",
        text: "Produtos de limpeza são frequentemente ingeridos por confusão com bebidas. Mantenha baldes vazios e virados para baixo.",
        tip: "Armazene produtos químicos no alto e em armário trancado.",
        pet: {
            text: "Produtos químicos e baldes com molho são perigosos. Pets curiosos podem entrar em máquinas de lavar abertas para dormir.",
            tip: "Verifique o tambor da máquina antes de usar e tranque produtos tóxicos.",
            riskLevel: "Alto"
        }
    },
    'garage': {
        title: "Garagem",
        riskLevel: "Médio",
        text: "Veículos em movimento e ferramentas perigosas. Crianças pequenas não devem transitar desacompanhadas.",
        tip: "Verifique embaixo do carro antes de sair.",
        pet: {
            text: "Anticongelantes (água do radiador) têm cheiro doce mas são letais. Pets costumam dormir sob o motor quente ou atrás das rodas.",
            tip: "Sempre olhe embaixo do carro e buzine antes de dar a partida.",
            riskLevel: "Crítico"
        }
    },
    'garden': { // Quintal
        title: "Quintal e Jardim",
        riskLevel: "Baixo",
        text: "Verifique a existência de plantas tóxicas (Comigo-Ninguém-Pode, Espada de S. Jorge). Atenção a insetos e animais peçonhentos.",
        tip: "Elimine focos de água parada e mantenha a grama aparada.",
        pet: {
            text: "Além de plantas tóxicas, adubos e venenos para ratos/lesmas são perigosíssimos. Fugas por portões mal fechados são causa comum de perda.",
            tip: "Use telas nos portões para evitar fugas e não deixe iscas de veneno acessíveis.",
            riskLevel: "Alto"
        }
    }
};

const STATS_AND_CURIOSITIES = [
    {
        id: 'falls',
        text: "Segundo o Ministério da Saúde, quedas representam 70% dos acidentes com idosos. Iluminação e piso seguro são vitais.",
        target: ['senior']
    },
    {
        id: 'burns',
        text: "Queimaduras são a 2ª maior causa de internação infantil por causas externas. A cozinha e o ferro de passar são os vilões.",
        target: ['baby', 'toddler', 'child']
    },
    {
        id: 'drowning',
        text: "Afogamento é a principal causa de mortalidade acidental em crianças de 1 a 4 anos. Acontece rápido e em silêncio.",
        target: ['baby', 'toddler']
    },
    {
        id: 'poison',
        text: "Medicamentos são responsáveis por mais de 30% das intoxicações humanas. Guarde-os sempre no alto e trancados.",
        target: ['child', 'teen', 'adult', 'senior']
    },
    {
        id: 'pet_poison',
        text: "Alimentos comuns como uva, chocolate e cebola causam falência renal/hepática em cães. A cozinha é um campo minado para eles.",
        target: ['pet']
    },
    {
        id: 'pet_car',
        text: "Gatos e cães pequenos adoram dormir sob carros ou dentro do motor nos dias frios. Sempre verifique antes de ligar.",
        target: ['pet']
    }
];

export const SafetyKnowledgeService = {
    getIntro(profileType, age) {
        return INTRO_TEXTS[profileType] || INTRO_TEXTS['adult'];
    },

    /**
     * Retorna informações do ambiente e uma chave canônica para deduplicação.
     * Agora aceita profileType para retornar texto específico (ex: pet).
     */
    getEnvironmentInfo(envId, profileType = 'humano') {
        const map = {
            // Mapping from NEW IDs (mapeamento_dados.js) to Service Keys
            'cozinha': 'kitchen',
            'cozinha_americana': 'kitchen',
            'banheiro': 'bathroom',
            'sala': 'living_room',
            'sala_jantar': 'living_room', // Or dining if available
            'quarto_casal': 'bedroom', // Legacy
            'quarto_adulto': 'bedroom', // New Standard
            'quarto_bebe': 'bedroom', // Special handling might be needed but basics apply
            'quarto_infantil': 'bedroom',
            'quarto_hospedes': 'bedroom',
            'escadas': 'stairs',
            'piscina': 'pool',
            'area_servico': 'laundry',
            'garagem': 'garage',
            'oficina': 'garage', // Similar risks
            'quintal': 'garden',
            'jardim': 'garden',
            'jardim_quintal': 'garden', // Combined ID
            'varanda': 'living_room', // Fallback or new key?
            'sacada': 'living_room',
            // English Fallbacks just in case
            'kitchen': 'kitchen',
            'bathroom': 'bathroom',
            'living_room': 'living_room',
            'bedroom': 'bedroom',
            'stairs': 'stairs',
            'pool': 'pool',
            'laundry': 'laundry',
            'garage': 'garage',
            'garden': 'garden'
        };

        const canonicalKey = map[envId];
        // Se não houver mapeamento direto, tenta usar o próprio ID se existir no texto
        const finalKey = canonicalKey || (ENVIRONMENT_TEXTS[envId] ? envId : null);

        if (!finalKey) return null;

        const info = ENVIRONMENT_TEXTS[finalKey];
        if (!info) return null;

        // SELEÇÃO DE CONTEÚDO (Pet vs Humano)
        let finalData = { ...info }; // Clone base

        if (profileType === 'pet' && info.pet) {
            // Sobrescreve com dados Pet se existirem
            finalData = {
                ...finalData,
                text: info.pet.text,
                tip: info.pet.tip,
                riskLevel: info.pet.riskLevel || finalData.riskLevel
            };
        }

        return { ...finalData, canonicalKey: finalKey };
    },

    /**
     * Calcula o risco dinamicamente com base em estatísticas oficiais (SBP/OMS)
     */
    getRiskLevel(envId, profileType) {
        const info = this.getEnvironmentInfo(envId);
        if (!info) return 'Baixo';

        const key = info.canonicalKey;

        // Regras de Risco Dinâmico
        if (key === 'pool' && ['baby', 'toddler', 'child'].includes(profileType)) return 'Crítico'; // Afogamento
        if (key === 'kitchen' && ['toddler', 'child', 'senior'].includes(profileType)) return 'Crítico'; // Queimaduras/Fogo
        if (key === 'stairs' && ['baby', 'toddler', 'senior'].includes(profileType)) return 'Crítico'; // Quedas
        if (key === 'bathroom' && ['senior'].includes(profileType)) return 'Crítico'; // Quedas box
        if (key === 'bathroom' && ['baby', 'toddler'].includes(profileType)) return 'Alto'; // Afogamento banheira
        if (key === 'laundry' && ['toddler'].includes(profileType)) return 'Alto'; // Intoxicação
        if (key === 'garden' && ['pet'].includes(profileType)) return 'Alto'; // Fuga/Plantas

        return info.riskLevel; // Fallback para o padrão do ambiente
    },

    getCuriosity(profileType) {
        const relevant = STATS_AND_CURIOSITIES.filter(c => c.target.includes(profileType));
        if (relevant.length > 0) {
            return relevant[Math.floor(Math.random() * relevant.length)];
        }
        return null; // Fallback se não houver específico? Poderia retornar um genérico.
    }
};

export default SafetyKnowledgeService;
