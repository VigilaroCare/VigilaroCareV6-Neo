export const areasInternas = [
    // === CONVIVÊNCIA ===
    {
        id: 'living_room',
        grupo: 'comodos',
        titulo: 'Sala de Estar',
        situacao: 'Convívio',
        emoji: '🛋️',
        cor: '#FF7043',
        riscos: 'Quedas, tombamento, choques, vidros.',
        oQueFazer: [
            'A circulação está livre de móveis ou objetos que causem tropeços?',
            'As quinas vivas de mesas e estantes possuem protetores de silicone?',
            'Os tapetes estão fixados com fita dupla face ou são antiderrapantes?',
            'A TV e móveis altos estão fixados na parede (risco de tombamento)?',
            'Bebidas alcoólicas e objetos de vidro estão fora do alcance de crianças?',
            'A iluminação é suficiente para evitar acidentes à noite?'
        ],
        oQueNaoFazer: [
            'Não deixe fios elétricos soltos no caminho.',
            'Não posicione móveis perto de janelas (efeito escada).',
            'Não deixe bibelôs pequenos acessíveis (risco de engasgo).'
        ],
        quandoChamarAjuda: 'Em caso de queda de móvel sobre criança, não mova se houver suspeita de trauma. Chame {{EMERGENCY_NUMBER}}/193.'
    },
    {
        id: 'dining_room', // Mantido para compatibilidade, mas conteúdo mesclado ou refinado
        grupo: 'comodos',
        titulo: 'Sala de Jantar',
        situacao: 'Refeições',
        emoji: '🍽️',
        cor: '#FFCA28',
        riscos: 'Queimaduras, cortes.',
        oQueFazer: [
            'A toalha de mesa é curta ou segura (evita que crianças puxem)?',
            'Há espaço livre para circulação ao redor das cadeiras?',
            'Objetos de vidro estão longe das bordas da mesa?'
        ],
        oQueNaoFazer: [
            'Não deixe pratos quentes na borda da mesa.',
            'Não use velas acesas sem supervisão constante.'
        ],
        quandoChamarAjuda: 'Cortes com vidro: estanque o sangue e procure socorro.'
    },

    // === SERVIÇOS E COZINHA ===
    {
        id: 'kitchen',
        grupo: 'comodos',
        titulo: 'Cozinha e Copa',
        situacao: 'Alto Risco',
        emoji: '🍳',
        cor: '#EF5350',
        riscos: 'Queimaduras, cortes, gás, intoxicação.',
        oQueFazer: [
            'O acesso de crianças é restrito (uso de portões/babygates)?',
            'Os cabos das panelas ficam voltados para dentro do fogão?',
            'Facas e eletrodomésticos de corte estão em armários altos ou travados?',
            'Produtos de limpeza estão trancados e longe de alimentos?',
            'O gás é fechado após o uso ou tem válvula de segurança?'
        ],
        oQueNaoFazer: [
            'Nunca deixe toalhas de mesa compridas pendentes.',
            'Não cozinhe com crianças no colo.',
            'Não deixe eletrodomésticos ligados na tomada sem uso.'
        ],
        quandoChamarAjuda: 'Queimadura: Água corrente fria por 20min. Fogo em óleo: Abafe com tampa (NUNCA JOGUE ÁGUA).'
    },
    {
        id: 'pantry',
        grupo: 'comodos',
        titulo: 'Despensa',
        situacao: 'Armazenamento',
        emoji: '🥫',
        cor: '#795548',
        riscos: 'Intoxicação, asfixia, pragas.',
        oQueFazer: [
            'O local é fresco, seco e protegido contra insetos/roedores?',
            'Produtos de limpeza/tóxicos estão SEPARADOS dos alimentos?',
            'Grãos (feijão, milho) estão em potes altos (risco de asfixia/nariz)?',
            'Há escada segura para alcançar prateleiras altas (nada de improvisos)?'
        ],
        oQueNaoFazer: [
            'Não armazene produtos químicos em garrafas de alimentos/bebidas.',
            'Não deixe sacos plásticos ao alcance (risco de sufocamento).'
        ],
        quandoChamarAjuda: 'Ingestão de tóxicos: Ligue {{POISON_CONTROL}}.'
    },
    {
        id: 'laundry',
        grupo: 'comodos',
        titulo: 'Área de Serviço',
        situacao: 'Limpeza',
        emoji: '🧺',
        cor: '#42A5F5',
        riscos: 'Afogamento, intoxicação, quedas.',
        oQueFazer: [
            'Produtos de limpeza (solda, cloro) estão no alto e trancados?',
            'Baldes e bacias ficam vazios e virados para baixo?',
            'O tanque permanece vazio após o uso?',
            'Ferro de passar e tábua são guardados frios e longe de alcance?'
        ],
        oQueNaoFazer: [
            'Nunca armazene produtos em garrafas pet de refrigerante.',
            'Não deixe baldes com "molho" no chão acessíveis a bebês.'
        ],
        quandoChamarAjuda: 'Ingestão de químicos: Não provoque vômito. Ligue {{EMERGENCY_NUMBER}} ou CIATOX.'
    },

    // === DORMITÓRIOS (Segmentados) ===
    {
        id: 'bedroom_baby',
        grupo: 'comodos',
        titulo: 'Quarto do Bebê',
        situacao: 'Bebê (0-3 anos)',
        emoji: '👶',
        cor: '#F48FB1',
        riscos: 'Sufocamento, quedas.',
        oQueFazer: [
            'O berço segue normas (grades até 6cm) e está livre de pelúcias/kists?',
            'Móveis estão longe das janelas?',
            'Há monitoramento (babá eletrônica)?',
            'Trocador tem bordas altas e itens à mão?'
        ],
        oQueNaoFazer: [
            'Não deixe o bebê sozinho no trocador.',
            'Não use protetores de berço fofos (risco de sufocamento).'
        ],
        quandoChamarAjuda: 'Bebê engasgado ou roxo: Inicie manobra de Heimlich e chame 193.'
    },
    {
        id: 'bedroom_kids',
        grupo: 'comodos',
        titulo: 'Quarto de Criança',
        situacao: 'Infantil',
        emoji: '🧸',
        cor: '#CE93D8',
        riscos: 'Quedas, tombamento.',
        oQueFazer: [
            'As janelas possuem telas/redes de proteção?',
            'Grades de proteção estão instaladas na cama?',
            'Móveis (cômodas) estão parafusados na parede (anti-tombamento)?',
            'Brinquedos são guardados para evitar tropeços noturnos?'
        ],
        oQueNaoFazer: [
            'Não deixe móveis escaláveis perto de janelas.',
            'Não deixe fios elétricos soltos.'
        ]
    },
    {
        id: 'bedroom_teen',
        grupo: 'comodos',
        titulo: 'Quarto Adolescente',
        situacao: 'Jovem',
        emoji: '🎧',
        cor: '#5C6BC0',
        riscos: 'Elétricos, bagunça.',
        oQueFazer: [
            'O chão está livre de objetos (evita tropeços)?',
            'O uso de eletrônicos e fios está organizado (sem sobrecarga)?',
            'A postura na cadeira de estudo/PC é adequada?'
        ],
        oQueNaoFazer: [
            'Não durma com celular carregando embaixo do travesseiro (aquecimento).'
        ]
    },
    {
        id: 'bedroom_adult',
        grupo: 'comodos',
        titulo: 'Quarto Adulto',
        situacao: 'Casal/Solteiro',
        emoji: '🛏️',
        cor: '#AB47BC',
        riscos: 'Medicamentos, armas, curiosidade infantil.',
        oQueFazer: [
            'Medicamentos e cosméticos estão trancados?',
            'Objetos cortantes (tesouras, alicates) estão seguros?',
            'Armas de fogo (se houver) estão em cofre e desmuniciadas?'
        ],
        oQueNaoFazer: [
            'Não deixe remédios na mesa de cabeceira se houver crianças na casa.'
        ]
    },
    {
        id: 'bedroom_senior',
        grupo: 'comodos',
        titulo: 'Quarto de Idoso',
        situacao: 'Terceira Idade',
        emoji: '👴',
        cor: '#9575CD',
        riscos: 'Quedas graves.',
        oQueFazer: [
            'A altura da cama permite apoiar os pés no chão sentado?',
            'O caminho ao banheiro é livre, sem tapetes e iluminado (luz noturna)?',
            'Os móveis têm cantos arredondados e são firmes para apoio?',
            'Há um telefone ou botão de emergência próximo à cama?'
        ],
        oQueNaoFazer: [
            'Não use tapetes soltos (são os maiores vilões).',
            'Não deixe cobertas arrastando no chão.'
        ],
        quandoChamarAjuda: 'Queda de idoso requer avaliação médica para descartar fraturas.'
    },

    // === BANHEIRO ===
    {
        id: 'bathroom',
        grupo: 'comodos',
        titulo: 'Banheiros',
        situacao: 'Área Molhada',
        emoji: '🚿',
        cor: '#29B6F6',
        riscos: 'Quedas, afogamento, choque.',
        oQueFazer: [
            'O piso do box tem tapete antiderrapante?',
            'Há barras de apoio no box e vaso (essencial para idosos)?',
            'A tampa do vaso tem trava (evita afogamento de crianças)?',
            'Medicamentos/Giletes estão fora de alcance?',
            'O piso é mantido seco após o banho?'
        ],
        oQueNaoFazer: [
            'JAMAIS deixe crianças sozinhas na banheira (afogamento em cm de água).',
            'Não use secador descalço ou no piso molhado.'
        ],
        quandoChamarAjuda: 'Afogamento ou queda com bate-cabeça: 193.'
    },

    // === INFRA E CIRCULAÇÃO ===
    {
        id: 'stairs',
        grupo: 'comodos',
        titulo: 'Escadas',
        situacao: 'Desnível',
        emoji: '🪜',
        cor: '#FFA726',
        riscos: 'Quedas fatais.',
        oQueFazer: [
            'Há corrimão firme em ambos os lados?',
            'Os degraus têm fita antiderrapante?',
            'A iluminação é excelente em todo o trajeto?',
            'Há portões (babygates) no topo e na base (se houver crianças)?'
        ],
        oQueNaoFazer: [
            'Não deixe objetos nos degraus.',
            'Não use tapetes soltos nos patamares.'
        ]
    },
    {
        id: 'garage',
        grupo: 'comodos',
        titulo: 'Garagem',
        situacao: 'Veículos',
        emoji: '🚗',
        cor: '#607D8B',
        riscos: 'Atropelamento, CO, Inflamáveis.',
        oQueFazer: [
            'A iluminação é boa e o chão livre de entulhos?',
            'Você verifica atrás/embaixo do carro antes de manobrar?',
            'Materiais inflamáveis estão longe de calor?',
            'O portão tem sensor anti-esmagamento?'
        ],
        oQueNaoFazer: [
            'Jamais deixe o carro ligado em garagem fechada (Monóxido de Carbono mata).',
            'Não deixe crianças brincarem na área de manobra.'
        ]
    },
    {
        id: 'gas_central',
        grupo: 'comodos',
        titulo: 'Central de Gás',
        situacao: 'Técnico',
        emoji: '🔥',
        cor: '#D84315',
        riscos: 'Explosão, vazamento.',
        oQueFazer: [
            'Botijões estão em local VENTILADO e externo (protegido sol/chuva)?',
            'Estão longe de ralos e eletricidade?',
            'A validade da mangueira/regulador foi verificada?',
            'Teste de vazamento é feito apenas com espuma de sabão?'
        ],
        oQueNaoFazer: [
            'Nunca use fogo (isqueiro) para testar vazamento!',
            'Se cheirar gás: Não acenda luzes, abra janelas e saia.'
        ],
        quandoChamarAjuda: 'Vazamento incontrolável ou fogo: 193 (Bombeiros).'
    },
    {
        id: 'armarios_geral',
        grupo: 'comodos',
        titulo: 'Armários Gerais',
        situacao: 'Organização',
        emoji: '🗄️',
        cor: '#795548',
        riscos: 'Queda de objetos, acesso indevido.',
        oQueFazer: [
            'Objetos pesados estão nas partes baixas?',
            'Produtos perigosos (remédios, químicos) estão nas partes altas ou trancados?',
            'Há travas de segurança externas nas portas (proteção infantil)?'
        ],
        oQueNaoFazer: [
            'Não deixe chaves nas fechaduras ao alcance de crianças.'
        ]
    },
    {
        id: 'balcony_indoor', // Varanda considerada interna/anexa
        grupo: 'comodos',
        titulo: 'Varanda / Sacada',
        situacao: 'Extensão',
        emoji: '🌅',
        cor: '#FFB74D',
        riscos: 'Queda de altura.',
        oQueFazer: [
            'O piso é antiderrapante (risco se molhar)?',
            'Redes de proteção certificadas estão instaladas (obrigatório para crianças/pets)?',
            'Afastou móveis e vasos do guarda-corpo (efeito escada)?'
        ],
        oQueNaoFazer: [
            'Não deixe crianças sozinhas na sacada.',
            'Não apoie debruçado no guarda-corpo.'
        ]
    }
    ,
    {
        id: 'accessibility_pcd',
        grupo: 'especial',
        titulo: 'Acessibilidade (PCD)',
        situacao: 'Adaptação',
        emoji: '♿',
        cor: '#00897B', // Teal
        riscos: 'Barreiras, quedas, falta de autonomia.',
        oQueFazer: [
            'Portas e corredores são largos o suficiente para cadeira de rodas/andador?',
            'Há espaço de circulação e giro (360º) para cadeira de rodas nas salas?',
            'O quarto do PCD fica no térreo (evita escadas)?',
            'O banheiro possui barras de apoio e bacia sanitária elevada?',
            'O box é amplo e nivelado (sem degrau) para acesso de cadeira de banho?',
            'Torneiras são de alavanca ou sensor (fáceis de abrir)?',
            'Pias e bancadas possuem vão livre embaixo para encaixe das pernas?'
        ],
        oQueNaoFazer: [
            'Não use tapetes que dificultem a rolagem da cadeira.',
            'Não coloque móveis no trajeto de circulação diária.',
            'Não instale armários muito altos sem opção de acesso.'
        ],
        quandoChamarAjuda: 'Quedas de cadeirantes podem gerar traumas ocultos. Avalie com cuidado e chame ajuda especializada.'
    }
];
