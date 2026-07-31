export const produtosPerigosos = [
    // Produtos Domésticos e de Limpeza
    {
        id: 'limpeza_1',
        nome: 'Água Sanitária',
        categoria: 'Limpeza',
        emoji: '🧴',
        nivelPerigo: 'Alto',
        descricao: 'Solução de hipoclorito de sódio. Corrosiva e libera gases tóxicos se misturada.',
        prevencao: 'Nunca misturar com outros produtos (ácidos/amônia). Manter em local alto e ventilado.',
        sintomas: 'Queimaduras, tosse, dificuldade respiratória.',
        primeirosSocorros: 'Lavar com água corrente. NÃO provocar vômito. Ligar {{POISON_CONTROL}}.'
    },
    {
        id: 'limpeza_2',
        nome: 'Soda Cáustica',
        categoria: 'Limpeza',
        emoji: '⚠️',
        nivelPerigo: 'Muito Alto',
        descricao: 'Altamente corrosiva. Causa queimaduras graves e cegueira.',
        prevencao: 'Usar luvas/óculos. Armazenar trancado. Substituir por métodos mecânicos.',
        sintomas: 'Dor intensa, queimaduras profundas, perfuração de órgãos.',
        primeirosSocorros: 'Lavar com MUITA água. NÃO provocar vômito. {{EMERGENCY_MEDICAL}} urgente.'
    },
    {
        id: 'limpeza_3',
        nome: 'Desentupidores Químicos',
        categoria: 'Limpeza',
        emoji: '🚽',
        nivelPerigo: 'Muito Alto',
        descricao: 'Ácidos fortes ou soda cáustica concentrada.',
        prevencao: 'Manter tampado e trancado. Usar EPI.',
        sintomas: 'Queimaduras químicas graves.',
        primeirosSocorros: 'Lavar área afetada. Hospital imediato.'
    },
    {
        id: 'limpeza_4',
        nome: 'Limpadores de Forno',
        categoria: 'Limpeza',
        emoji: '🔥',
        nivelPerigo: 'Alto',
        descricao: 'Geralmente contêm soda cáustica ou amônia.',
        prevencao: 'Usar luvas. Ventilar o ambiente durante o uso.',
        sintomas: 'Irritação respiratória, queimaduras na pele.',
        primeirosSocorros: 'Ar fresco. Lavar pele com água.'
    },
    {
        id: 'limpeza_5',
        nome: 'Solventes (Thinner, Aguarrás)',
        categoria: 'Limpeza/Reforma',
        emoji: '🎨',
        nivelPerigo: 'Alto',
        descricao: 'Risco de intoxicação por inalação e aspiração (pneumonia química).',
        prevencao: 'Armazenar em armários altos e ventilados. Embalagem original.',
        sintomas: 'Tontura, náusea, tosse, dificuldade respiratória.',
        primeirosSocorros: 'Não provocar vômito (risco de aspiração). Ar fresco.'
    },

    // Automotivos e Industriais
    {
        id: 'auto_1',
        nome: 'Anticongelante (Etilenoglicol)',
        categoria: 'Automotivo',
        emoji: '🚗',
        nivelPerigo: 'Muito Alto',
        descricao: 'Sabor adocicado atrai crianças/pets. Falência renal rápida.',
        prevencao: 'Armazenar trancado. Limpar vazamentos imediatamente.',
        sintomas: 'Embriaguez, vômito, coma, falência renal.',
        primeirosSocorros: 'Hospital IMEDIATO. Levar embalagem.'
    },
    {
        id: 'auto_2',
        nome: 'Baterias Automotivas',
        categoria: 'Automotivo',
        emoji: '🔋',
        nivelPerigo: 'Alto',
        descricao: 'Contêm ácido sulfúrico e chumbo.',
        prevencao: 'Manter longe de crianças. Descarte em local apropriado.',
        sintomas: 'Queimaduras por ácido, intoxicação por chumbo.',
        primeirosSocorros: 'Lavar com água abundante.'
    },

    // Agroquímicos e Pragas
    {
        id: 'agro_1',
        nome: 'Raticida (Chumbinho)',
        categoria: 'Veneno',
        emoji: '☠️',
        nivelPerigo: 'Extremo',
        descricao: 'Veneno ilegal (carbamato). Mata rapidamente.',
        prevencao: 'NÃO USAR. Denunciar venda. Usar ratoeiras mecânicas.',
        sintomas: 'Salivação, tremores, convulsão, parada respiratória.',
        primeirosSocorros: '{{EMERGENCY_MEDICAL}} IMEDIATAMENTE.'
    },
    {
        id: 'agro_2',
        nome: 'Inseticidas Domésticos',
        categoria: 'Veneno',
        emoji: '🦟',
        nivelPerigo: 'Médio/Alto',
        descricao: 'Sprays e iscas. Efeitos neurológicos se ingeridos/inalados.',
        prevencao: 'Aplicar sem pessoas/pets perto. Guardar no alto.',
        sintomas: 'Dor de cabeça, náusea, tontura.',
        primeirosSocorros: 'Lavar pele. Ar fresco.'
    },

    // Medicamentos e Pessoais
    {
        id: 'med_1',
        nome: 'Medicamentos',
        categoria: 'Medicamentos',
        emoji: '💊',
        nivelPerigo: 'Variável',
        descricao: 'Principal causa de intoxicação infantil. Analgésicos, antidepressivos, etc.',
        prevencao: 'Caixa de remédios trancada. Não chamar de "doce".',
        sintomas: 'Sonolência, vômito, alteração cardíaca.',
        primeirosSocorros: 'Ligar {{POISON_CONTROL}} com nome do remédio.'
    },
    {
        id: 'med_2',
        nome: 'Óleos Essenciais',
        categoria: 'Cosmético',
        emoji: '🌿',
        nivelPerigo: 'Alto',
        descricao: 'Altamente concentrados. Tóxicos se ingeridos (ex: Melaleuca, Eucalipto).',
        prevencao: 'Frascos com trava. Longe de crianças.',
        sintomas: 'Convulsão, depressão respiratória.',
        primeirosSocorros: 'Não provocar vômito. Hospital.'
    },
    {
        id: 'med_3',
        nome: 'E-liquids (Cigarro Eletrônico)',
        categoria: 'Outros',
        emoji: '🚬',
        nivelPerigo: 'Muito Alto',
        descricao: 'Nicotina líquida concentrada. Poucas gotas podem ser fatais para crianças.',
        prevencao: 'Guardar trancado. Embalagem à prova de criança.',
        sintomas: 'Vômito, taquicardia, convulsão.',
        primeirosSocorros: 'Hospital urgente.'
    },

    // Diversos
    {
        id: 'div_1',
        nome: 'Pilhas Botão (Moeda)',
        categoria: 'Diversos',
        emoji: '🪙',
        nivelPerigo: 'Muito Alto',
        descricao: 'Risco de perfuração do esôfago em 2 horas se engolida.',
        prevencao: 'Parafusar compartimentos de pilhas. Guardar no alto.',
        sintomas: 'Engasgo, dor no peito, recusa alimentar.',
        primeirosSocorros: 'Raio-X urgente. NÃO provocar vômito.'
    },
    {
        id: 'div_2',
        nome: 'Naftalina',
        categoria: 'Diversos',
        emoji: '⚪',
        nivelPerigo: 'Médio',
        descricao: 'Parece bala. Tóxica para fígado e sangue.',
        prevencao: 'Evitar uso. Usar sachês de cedro/lavanda.',
        sintomas: 'Icterícia, anemia, vômito.',
        primeirosSocorros: 'Não provocar vômito.'
    },
    {
        id: 'div_3',
        nome: 'Termômetros de Mercúrio',
        categoria: 'Diversos',
        emoji: '🌡️',
        nivelPerigo: 'Alto',
        descricao: 'Vapores tóxicos se quebrado.',
        prevencao: 'Substituir por digital. Descarte correto.',
        sintomas: 'Tosse, tremores (inalação crônica).',
        primeirosSocorros: 'Ventilar ambiente. Não usar aspirador.'
    },
    // NOVOS ITENS - ENRIQUECIMENTO
    {
        id: 'limpeza_6',
        nome: 'Amaciantes e Desinfetantes Concentrados',
        categoria: 'Limpeza',
        emoji: '🧴',
        nivelPerigo: 'Médio',
        descricao: 'Podem causar irritações e lesões gástricas graves se ingeridos puros.',
        prevencao: 'Manter fora do alcance de crianças. Nunca reutilizar embalagens para bebidas.',
        sintomas: 'Vômito, dor abdominal, irritação na boca e garganta.',
        primeirosSocorros: 'Não provocar vômito. Oferecer água em pequenos goles. Ligar {{POISON_CONTROL}}.'
    },
    {
        id: 'ind_1',
        nome: 'Desengraxantes Industriais',
        categoria: 'Industrial',
        emoji: '🏭',
        nivelPerigo: 'Alto',
        descricao: 'Produtos químicos fortes (alcalinos ou solventes) para remoção de gordura pesada.',
        prevencao: 'Uso obrigatório de EPI (luvas/óculos). Armazenamento trancado.',
        sintomas: 'Queimaduras na pele, lesão ocular grave, intoxicação se inalado.',
        primeirosSocorros: 'Lavar com água abundante por 15 min. Hospital imediato se ingestão.'
    },
    {
        id: 'agro_3',
        nome: 'Herbicidas e Formicidas',
        categoria: 'Jardinagem',
        emoji: '🌱',
        nivelPerigo: 'Muito Alto',
        descricao: 'Ex: Glifosato, Paraquat. Altamente tóxicos, podem causar falência de órgãos.',
        prevencao: 'Não aplicar com vento. Manter crianças/pets afastados por 24-48h.',
        sintomas: 'Vômito, dificuldade respiratória, queimaduras na pele.',
        primeirosSocorros: 'Banho imediato se contato com pele. {{EMERGENCY_MEDICAL}} se ingestão.'
    },
    {
        id: 'vet_1',
        nome: 'Antipulgas e Carrapatos',
        categoria: 'Veterinário',
        emoji: '🐕',
        nivelPerigo: 'Médio/Alto',
        descricao: 'Pipetas, sprays e coleiras contêm inseticidas potentes.',
        prevencao: 'Seguir dosagem por peso. Lavar mãos após aplicação. Não deixar crianças tocarem logo após.',
        sintomas: 'Salivação excessiva, tremores, vômito (se ingerido ou overdose).',
        primeirosSocorros: 'Lavar local com água e sabão. Ligar {{POISON_CONTROL}}.'
    },
    {
        id: 'vet_2',
        nome: 'Medicamentos Veterinários',
        categoria: 'Veterinário',
        emoji: '💉',
        nivelPerigo: 'Médio',
        descricao: 'Vermífugos, antibióticos e pomadas animais podem ser tóxicos para humanos.',
        prevencao: 'Guardar em caixa separada dos remédios humanos para evitar confusão.',
        sintomas: 'Náusea, tontura, reações alérgicas.',
        primeirosSocorros: 'Não provocar vômito. Consultar CIATox.'
    },
    {
        id: 'med_4',
        nome: 'Suplementos (Ferro / Vitamina D)',
        categoria: 'Medicamentos',
        emoji: '💊',
        nivelPerigo: 'Alto',
        descricao: 'O excesso de Ferro ou Vitamina D é tóxico e pode causar falência hepática/renal.',
        prevencao: 'Tratar como medicamento perigoso: manter trancado.',
        sintomas: 'Vômito com sangue (Ferro), confusão mental, sede excessiva (Vit D).',
        primeirosSocorros: 'Hospital IMEDIATO em caso de overdose.'
    },
    {
        id: 'cosm_1',
        nome: 'Cosméticos e Perfumes',
        categoria: 'Cosmético',
        emoji: '💄',
        nivelPerigo: 'Baixo/Médio',
        descricao: 'Risco de intoxicação alcoólica em crianças pequenas devido ao etanol.',
        prevencao: 'Manter em prateleiras altas fora do alcance.',
        sintomas: 'Embriaguez, sonolência, hipoglicemia.',
        primeirosSocorros: 'Oferecer líquidos doces. Observar consciência.'
    },
    {
        id: 'jardim_1',
        nome: 'Fertilizantes Químicos (NPK)',
        categoria: 'Jardinagem',
        emoji: '🌻',
        nivelPerigo: 'Médio',
        descricao: 'Risco de intoxicação por nitratos se ingeridos.',
        prevencao: 'Armazenar em local seco, fechado e longe de alimentos.',
        sintomas: 'Náusea, vômito, cianose (pele/lábios azulados).',
        primeirosSocorros: 'Hospital se ingestão significativa.'
    },
    {
        id: 'jardim_2',
        nome: 'Pesticidas e Inseticidas',
        categoria: 'Jardinagem',
        emoji: '☠️',
        nivelPerigo: 'EXTREMO',
        descricao: 'Risco altíssimo de intoxicação letal para crianças e pets por contato ou ingestão acidental.',
        prevencao: 'Trancar em armários altos. Manter SEMPRE no rótulo original. Priorizar opções orgânicas ou naturais.',
        sintomas: 'Convulsões, salivação excessiva, pupilas contraídas, taquicardia.',
        primeirosSocorros: 'Ligar para o CIATOX/SAMU. Levar a embalagem ao pronto-socorro. NÃO induzir vômito.'
    },
    {
        id: 'misturas_perigo',
        nome: 'Misturas Caseiras Perigosas',
        categoria: 'Alerta',
        emoji: '⚠️',
        nivelPerigo: 'EXTREMO',
        descricao: 'Misturar Cloro (Água Sanitária) com Vinagre, Amônia ou Desinfetantes gera gases letais.',
        prevencao: 'NUNCA misturar produtos de limpeza. Usar apenas um por vez.',
        sintomas: 'Queimadura via aérea, tosse intensa, edema pulmonar.',
        primeirosSocorros: 'Sair do local para ar fresco imediatamente. {{EMERGENCY_MEDICAL}}.'
    }
];
