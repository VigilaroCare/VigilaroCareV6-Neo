export const AGE_GROUPS = [
    {
        id: 'bebes_0_6',
        title: 'Bebês (até 6 meses)',
        subtitle: '0-6 meses',
        icon: 'happy-outline',
        color: '#42A5F5', // Blue 400
        description: 'Foco total em evitar sufocação (berço) e quedas.',
        risks: [
            { id: 'b06_1', text: 'Asfixia/Sufocação (Kit Berço/Protetores)' },
            { id: 'b06_2', text: 'Quedas (Trocador, cama, sofá)' },
            { id: 'b06_3', text: 'Queimaduras (Banho e Mamadeira)' },
            { id: 'b06_4', text: 'Transporte Inadequado (Bebê Conforto)' },
        ],
        checklist: [
            { id: 'cb06_1', text: 'Berço SEM kit berço, almofadas ou pelúcias?' },
            { id: 'cb06_2', text: 'Bebê dorme sempre de barriga para cima?' },
            { id: 'cb06_3', text: 'Temperatura da água testada (termômetro/cotovelo)?' },
            { id: 'cb06_4', text: 'Nunca deixar sozinho em locais altos (trocador)?' },
            { id: 'cb06_5', text: 'Mamadeira aquecida em banho-maria (não micro-ondas)?' },
        ]
    },
    {
        id: 'bebes_7_12',
        title: 'Bebês (7 a 12 meses)',
        subtitle: '7-12 meses',
        icon: 'walk-outline', // Engatinhando/Andando
        color: '#26C6DA', // Cyan 400
        description: 'Fase de engatinhar e ficar em pé. Risco alto de afogamento.',
        risks: [
            { id: 'b712_1', text: 'Afogamento (Baldes, Tanques, Vasos)' },
            { id: 'b712_2', text: 'Engasgos (Objetos pequenos no chão)' },
            { id: 'b712_3', text: 'Queimaduras/Lesões na Cozinha' },
            { id: 'b712_4', text: 'Choque Elétrico (Tomadas baixas)' },
            { id: 'b712_5', text: 'Traumatismos (Uso de Andador - NÃO USAR)' },
        ],
        checklist: [
            { id: 'cb712_1', text: 'Baldes e tanques esvaziados e virados para baixo?' },
            { id: 'cb712_2', text: 'Portõezinhos (baby gate) nas escadas e cozinha?' },
            { id: 'cb712_3', text: 'Chão livre de moedas, botões e peças pequenas?' },
            { id: 'cb712_4', text: 'Tomadas com protetores firmes?' },
            { id: 'cb712_5', text: 'Produtos de limpeza trancados?' },
        ]
    },
    {
        id: 'criancas_1_3',
        title: 'Crianças (1 a 3 anos)',
        subtitle: '1-3 anos',
        icon: 'bicycle-outline',
        color: '#66BB6A', // Green 400
        description: 'Curiosidade intensa. Acesso a gavetas e escaladas.',
        risks: [
            { id: 'c13_1', text: 'Quedas de Janelas e Sacadas (Móveis perto)' },
            { id: 'c13_2', text: 'Engasgos com Alimentos (Jujuba, Uva inteira)' },
            { id: 'c13_3', text: 'Intoxicação (Remédios coloridos/Produtos)' },
            { id: 'c13_4', text: 'Móveis caindo sobre a criança (TV, Gaveteiro)' },
            { id: 'c13_5', text: 'Brincadeiras com Fogo (Isqueiros)' },
        ],
        checklist: [
            { id: 'cc13_1', text: 'Redes de proteção em janelas e sacadas?' },
            { id: 'cc13_2', text: 'Móveis (TV/Estante) fixados na parede?' },
            { id: 'cc13_3', text: 'Remédios e químicos no alto e trancados?' },
            { id: 'cc13_4', text: 'Uvas e tomates cortados longitudinalmente?' },
            { id: 'cc13_5', text: 'Acesso bloqueado a escadas?' },
        ]
    },
    {
        id: 'criancas_3_5',
        title: 'Crianças (3 a 5 anos)',
        subtitle: '3-5 anos',
        icon: 'football-outline',
        color: '#9CCC65', // Light Green 400
        description: 'Exploração com maior desenvoltura. Brincadeiras ativas.',
        risks: [
            { id: 'c35_1', text: 'Lesões por Brincadeiras Agressivas' },
            { id: 'c35_2', text: 'Quedas de Altura (Árvores, Muros)' },
            { id: 'c35_3', text: 'Intoxicação/Queimaduras (Fósforos)' },
            { id: 'c35_4', text: 'Atropelamento (Correr para a rua)' },
        ],
        checklist: [
            { id: 'cc35_1', text: 'Redes de proteção revisadas?' },
            { id: 'cc35_2', text: 'Supervisão em parquinhos e árvores?' },
            { id: 'cc35_3', text: 'Fósforos e isqueiros escondidos?' },
            { id: 'cc35_4', text: 'Capacete para bicicleta/skate?' },
        ]
    },
    {
        id: 'criancas_6_14',
        title: 'Crianças (6 a 14 anos)',
        subtitle: '6-14 anos',
        icon: 'game-controller-outline',
        color: '#FFA726', // Orange 400
        description: 'Autonomia, aventura e comportamento de risco.',
        risks: [
            { id: 'c614_1', text: 'Acidentes Externos (Bicicleta, Skate)' },
            { id: 'c614_2', text: 'Pipas com Cerol / Fios de Alta Tensão' },
            { id: 'c614_3', text: 'Comportamento de Risco (Imitar heróis)' },
            { id: 'c614_4', text: 'Desafios de Internet' },
        ],
        checklist: [
            { id: 'cc614_1', text: 'Conversa sobre segurança na rua/pipa?' },
            { id: 'cc614_2', text: 'Uso de equipamentos de proteção (bike)?' },
            { id: 'cc614_3', text: 'Janelas/Sacadas protegidas?' },
            { id: 'cc614_4', text: 'Supervisão de internet/jogos?' },
        ]
    },
    {
        id: 'adolescentes',
        title: 'Adolescentes',
        subtitle: '15-17 anos',
        icon: 'headset-outline',
        color: '#AB47BC', // Purple 400
        description: 'Ousadia, desafios e riscos fora de casa.',
        risks: [
            { id: 'a1', text: 'Traumas Graves (Trânsito, Quedas)' },
            { id: 'a2', text: 'Afogamentos (Mar/Rios sem supervisão)' },
            { id: 'a3', text: 'Uso de Álcool/Drogas' },
            { id: 'a4', text: 'Ambientes perigosos (Lajes, Obras)' },
        ],
        checklist: [
            { id: 'ca1', text: 'Cinto de segurança sempre?' },
            { id: 'ca2', text: 'Consciência sobre bebidas e direção?' },
            { id: 'ca3', text: 'Segurança na cozinha (uso independente)?' },
            { id: 'ca4', text: 'Diálogo aberto sobre riscos?' },
        ]
    },
    {
        id: 'adultos',
        title: 'Adultos',
        subtitle: '18-59 anos',
        icon: 'briefcase-outline',
        color: '#78909C', // Blue Grey 400
        description: 'Acidentes por falta de atenção ou planejamento.',
        risks: [
            { id: 'ad1', text: 'Lesões com Ferramentas (Falta de EPI)' },
            { id: 'ad2', text: 'Quedas (Escadas, Apoios improvisados)' },
            { id: 'ad3', text: 'Acidentes na Cozinha (Cortes, Queimaduras)' },
            { id: 'ad4', text: 'Choque Elétrico (Reparos caseiros)' },
        ],
        checklist: [
            { id: 'cad1', text: 'Kit de Primeiros Socorros montado?' },
            { id: 'cad2', text: 'Uso de EPIs para reparos?' },
            { id: 'cad3', text: 'Escadas em bom estado de conservação?' },
            { id: 'cad4', text: 'Boas práticas na cozinha (10 regras)?' },
            { id: 'cad5', text: 'Iluminação adequada em toda a casa?' },
        ]
    },
    {
        id: 'idosos',
        title: 'Idosos',
        subtitle: '60+ anos',
        icon: 'glasses-outline',
        color: '#FF7043', // Deep Orange 400
        description: 'Quedas são o maior risco. Foco na acessibilidade.',
        risks: [
            { id: 'i1', text: 'Quedas (Tapetes, Piso liso, Degraus)' },
            { id: 'i2', text: 'Fraturas Graves (Fêmur/Quadril)' },
            { id: 'i3', text: 'Intoxicação (Erro em medicamentos)' },
            { id: 'i4', text: 'Mal-estar Súbito (Tontura)' },
        ],
        checklist: [
            { id: 'ci1', text: 'Tapetes removidos ou fixados?' },
            { id: 'ci2', text: 'Barras de apoio no banheiro?' },
            { id: 'ci3', text: 'Iluminação noturna automática?' },
            { id: 'ci4', text: 'Calçados fechados e antiderrapantes?' },
            { id: 'ci5', text: 'Celular de emergência fácil de usar?' },
            { id: 'ci6', text: 'Dispositivos de proteção (alarme pessoal)?' },
        ]
    },
    {
        id: 'pcds',
        title: 'Portadores de Nec. Especiais (PNE)',
        subtitle: 'Acessibilidade',
        icon: 'accessibility-outline',
        color: '#EC407A', // Pink 400
        description: 'Adaptação estrutural e eliminação de barreiras.',
        risks: [
            { id: 'p1', text: 'Quedas e Dificuldade de Locomoção' },
            { id: 'p2', text: 'Barreiras Arquitetônicas (Degraus)' },
            { id: 'p3', text: 'Lesões por falta de Adaptação (Móveis)' },
            { id: 'p4', text: 'Dificuldade de Fuga em Emergência' },
        ],
        checklist: [
            { id: 'cp1', text: 'Portas largas e rampas de acesso?' },
            { id: 'cp2', text: 'Móveis dispostos para livre circulação?' },
            { id: 'cp3', text: 'Banheiro adaptado e seguro?' },
            { id: 'cp4', text: 'Sinalização adequada de emergência?' },
        ]
    },
];
