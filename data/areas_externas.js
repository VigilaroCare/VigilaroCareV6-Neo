export const areasExternas = [
    {
        id: 'backyard',
        titulo: 'Quintal',
        emoji: '🌳', icone: 'Tree',
        situacao: 'Área externa',
        oQueFazer: [
            'O local está limpo e sem entulhos/mato alto (evita escorpiões/ratos)?',
            'O piso é plano e sem buracos (risco de queda)?',
            'Piso cerâmico/cimentado é antiderrapante?',
            'A iluminação é boa nas passagens (para segurança noturna)?',
            'Não há acesso fácil para a rua (portão trancado)?'
        ],
        oQueNaoFazer: [
            'Não acumule madeira ou telhas velhas (abrigo de aranha).',
            'Não deixe água parada (Dengue).'
        ],
        quandoChamarAjuda: 'Picada de animal peçonhento: Lave, eleve o membro e vá ao hospital imediatamente.'
    },
    {
        id: 'garden_farming',
        titulo: 'Jardinagem e Hortas',
        emoji: '👩‍🌾', icone: 'Plant',
        situacao: 'Manutenção',
        oQueFazer: [
            'Usa EPIs (luvas, calçado fechado, manga longa) ao jardinar?',
            'Fertilizantes e pesticidas estão trancados e longe de crianças/pets?',
            'Identificou e removeu plantas tóxicas (Comigo-ninguém-pode, Bico-de-papagaio)?',
            'Ferramentas (tesouras, pás) são guardadas logo após o uso?'
        ],
        oQueNaoFazer: [
            'Não toque em plantas desconhecidas.',
            'Não deixe crianças brincarem com terra adubada/química.'
        ],
        quandoChamarAjuda: 'Ingestão de planta: Foto da planta + {{POISON_CONTROL}}.'
    },
    {
        id: 'collective_areas',
        titulo: 'Áreas Coletivas (Playground)',
        emoji: '🛝', icone: 'Confetti',
        situacao: 'Condomínio/Praça',
        oQueFazer: [
            'Brinquedos estão sem ferrugem, rebarbas ou partes soltas?',
            'O piso absorve impacto (areia/borracha)?',
            'Crianças usam brinquedos compatíveis com a idade?',
            'Há supervisão visual constante de um adulto?',
            'Piso de quadras/salões está em bom estado?'
        ],
        oQueNaoFazer: [
            'Não permita uso de brinquedos quebrados.',
            'Não deixe crianças pequenas sozinhas com crianças muito maiores (conflito/acidente).'
        ]
    },
    {
        id: 'pool_safe',
        titulo: 'Piscina',
        emoji: '🏊', icone: 'SwimmingPool',
        situacao: 'Risco Máximo',
        oQueFazer: [
            'Há supervisão visual CONSTANTE (adulto a um braço de distância)?',
            'Existe cerca de proteção física e portão com tranca automática?',
            'Há capas de proteção rígidas (suportam peso)?',
            'Alarmes de detecção na água estão ativos?',
            'Ralos são anti-aprisionamento?',
            'Piscinas plásticas são esvaziadas após o uso?'
        ],
        oQueNaoFazer: [
            'JAMAIS deixe crianças sozinhas, nem por um segundo.',
            'Não confie apenas em boias.',
            'Não deixe brinquedos na água (atração fatal).'
        ],
        quandoChamarAjuda: 'Afogamento: Retire da água, inicie RCP imediatamente e ligue 193.'
    },
    {
        id: 'beach_rivers',
        titulo: 'Praia, Rios e Lagos',
        emoji: '🏖️', icone: 'Umbrella',
        situacao: 'Natureza',
        oQueFazer: [
            'A supervisão é rigorosa (adulto na água junto)?',
            'Avaliou correnteza e profundidade antes de entrar?',
            'Seguiu as orientações dos guarda-vidas (bandeiras)?',
            'Crianças usam colete salva-vidas adequado?'
        ],
        oQueNaoFazer: [
            'Não mergulhe em águas turvas ou desconhecidas (pedras/galhos).',
            'Não nade após refeições pesadas ou ingestão de álcool.'
        ]
    },
    {
        id: 'workshop_tool',
        titulo: 'Oficina Doméstica',
        emoji: '🛠️', icone: 'Toolbox',
        situacao: 'Ferramentas',
        oQueFazer: [
            'Ferramentas estão organizadas em caixas/painéis (evita corte)?',
            'Ambiente é ventilado e iluminado?',
            'Químicos (tinta, solvente) estão na embalagem original e rotulados?',
            'Usa EPIs (óculos, luvas) ao trabalhar?'
        ],
        oQueNaoFazer: [
            'Não deixe ferramentas ligadas na tomada.',
            'Não armazene produtos em garrafas de bebida.'
        ],
        quandoChamarAjuda: 'Amputação/Corte profundo: Comprima o local e corra para emergência.'
    },
    {
        id: 'storage_depot',
        titulo: 'Depósito "Guarda-Tudo"',
        emoji: '📦', icone: 'Package',
        situacao: 'Armazenamento',
        oQueFazer: [
            'O local é limpo e ventilado (evita aranhas/mofo)?',
            'Objetos pesados estão no chão e perto da saída (evita lesão na coluna)?',
            'Há corredores livres para circulação?',
            'Caixas estão estáveis e não muito altas?'
        ],
        oQueNaoFazer: [
            'Não acumule lixo ou caixas vazias (ninhos de pragas).',
            'Não force a coluna ao mover peso sozinho.'
        ]
    }
];

export const areasExternasData = areasExternas; // Compatibilidade com imports antigos
