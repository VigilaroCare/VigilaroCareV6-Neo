export const primeirosSocorrosPTBR = [
    {
        id: 'ps_1',
        titulo: 'Queimaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química ou Elétrica',
        oQueFazer: [
            'Tire a pessoa de perto do fogo ou da fonte de calor.',
            'Resfrie o local jogando água corrente em temperatura ambiente por 15 a 20 minutos.',
            'Tire anéis, pulseiras e relógios antes que a região comece a inchar.',
            'Cubra a ferida de leve com um pano limpo e úmido.',
        ],
        oQueNaoFazer: [
            'NUNCA passe pomadas, pasta de dente, manteiga, pó de café ou gelo direto sobre a queimadura.',
            'NÃO estoure as bolhas que se formarem.',
            'NÃO tente arrancar pedaços de roupa que tenham grudado na pele queimada.',
        ],
        quandoChamarAjuda: 'Se a queimadura for maior que a palma da mão, atingir o rosto, mãos, genitais ou ocorrer em crianças e idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgo (Adulto e Criança acima de 1 ano)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea — protocolo AHA 2025',
        oQueFazer: [
            'Se a pessoa consegue tossir com força, incentive a tossir. A tosse dela é mais eficaz que qualquer manobra sua.',
            'Se ela não consegue tossir, falar nem respirar, a obstrução é total: peça a alguém para ligar para {{EMERGENCY_MEDICAL}} e comece as manobras.',
            'Fique atrás dela, incline o tronco dela para a frente e dê 5 pancadas firmes entre as escápulas, usando a base da mão.',
            'Se o objeto não saiu, dê 5 compressões abdominais: punho fechado logo acima do umbigo, a outra mão por cima, puxando para dentro e para cima (em "J").',
            'Alterne 5 pancadas nas costas com 5 compressões abdominais até o objeto sair ou a pessoa perder a consciência.',
            'Em gestante, ou se você não conseguir abraçar o abdômen da pessoa, troque as compressões abdominais por 5 compressões no centro do peito.',
        ],
        oQueNaoFazer: [
            'Não ofereça água nem comida: a via aérea está fechada.',
            'Não coloque o dedo na boca às cegas para pescar o objeto — você pode empurrá-lo mais para dentro.',
            'Não interrompa os ciclos para procurar o objeto. Só pare se ele sair ou a pessoa desmaiar.',
        ],
        quandoChamarAjuda: 'Assim que perceber que a pessoa não consegue tossir, falar nem respirar. Se ela perder a consciência, deite-a no chão e inicie a RCP (ver "Parada Cardíaca").'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgo (Bebê menor de 1 ano)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes — protocolo AHA 2025',
        oQueFazer: [
            'Apoie o bebê de bruços sobre o seu antebraço, com a cabeça mais baixa que o tronco, sustentando o queixo e a mandíbula dele com a sua mão.',
            'Dê 5 pancadas firmes nas costas, entre as escápulas, usando a base da mão.',
            'Vire o bebê de barriga para cima no seu antebraço e dê 5 compressões no centro do peito usando a base de uma das mãos.',
            'Alterne 5 pancadas nas costas com 5 compressões no peito até o objeto sair ou o bebê perder a consciência.',
        ],
        oQueNaoFazer: [
            'NUNCA faça compressões abdominais (Heimlich) em bebê menor de 1 ano: há risco de lesão no fígado e no baço.',
            'Nunca sacuda o bebê.',
            'Não coloque os dedos na boca do bebê às cegas para tentar pescar o objeto.',
        ],
        quandoChamarAjuda: 'Assim que o bebê parar de chorar, tossir ou respirar. Se ele perder a consciência, inicie a RCP de lactente e ligue para {{EMERGENCY_MEDICAL}}.'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Sangramentos',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lave o corte delicadamente com soro ou água e sabão neutro.',
            'Aperte o local com firmeza usando um pano limpo por 5 a 10 minutos sem parar.',
            'Se for nos braços ou pernas, mantenha o membro levantado para diminuir o fluxo de sangue.',
        ],
        oQueNaoFazer: [
            'Não faça torniquetes (use apenas em amputações ou sangramentos gravíssimos que não param de jeito nenhum).',
            'Não coloque pó de café, açúcar ou pomadas no corte.',
        ],
        quandoChamarAjuda: 'Se o sangramento não parar após 10 minutos de pressão direta, se o corte for muito profundo ou se as bordas ficarem abertas.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contato com corrente elétrica',
        oQueFazer: [
            'Corra para o quadro de luz e desligue o disjuntor geral IMEDIATAMENTE.',
            'Se não puder desligar a energia, empurre o fio ou afaste a pessoa usando um objeto de madeira ou plástico seco (como um cabo de vassoura seco).',
            'Depois de afastar da energia, cheque se a pessoa está respirando e se tem batimentos.',
        ],
        oQueNaoFazer: [
            'NUNCA encoste na pessoa se ela ainda estiver colada ao fio ou tomada elétrica.',
        ],
        quandoChamarAjuda: 'SEMPRE chame o {{EMERGENCY_MEDICAL}}. A corrente elétrica pode causar arritmias no coração horas após o choque.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identifique na hora qual produto ou remédio a pessoa engoliu.',
            'Ligue imediatamente para {{POISON_CONTROL}}.',
            'Siga exatamente o que o atendente médico orientar.',
        ],
        oQueNaoFazer: [
            'NÃO provoque vômito (se o produto for corrosivo, vai queimar a garganta duas vezes).',
            'Não dê leite, água ou remédios caseiros sem orientação médica.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Quedas e Fraturas',
        emoji: '🤕',
        situacao: 'Queda de altura ou impacto forte',
        oQueFazer: [
            'Deixe a pessoa deitada imóvel, principalmente se ela reclamar de dor nas costas ou no pescoço.',
            'Coloque uma bolsa de gelo enrolada em uma toalha sobre o local dolorido.',
            'Se houver corte com sangue, pressione de leve com um pano limpo.',
        ],
        oQueNaoFazer: [
            'NÃO tente colocar o osso de volta no lugar.',
            'NÃO mexa ou levante a pessoa se houver suspeita de lesão na coluna.',
        ],
        quandoChamarAjuda: 'Se houver deformidade visível no osso, dor muito forte, incapacidade de mover o membro ou se a pessoa desmaiou.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craniano',
        emoji: '🧠',
        situacao: 'Batida forte na cabeça',
        oQueFazer: [
            'Fique de olho na pessoa pelas próximas 24 horas.',
            'Mantenha a pessoa acordada e conversando por algum tempo após a pancada.',
            'Coloque uma compressa fria no local para diminuir o inchaço (o famoso "galo").',
        ],
        oQueNaoFazer: [
            'Não ignore sintomas como vômitos, tonturas ou falhas de memória.',
            'Não dê remédios fortes para dor ou para dormir sem orientação.',
        ],
        quandoChamarAjuda: 'Se a pessoa vomitar, desmaiar, tiver sangramento pelo nariz ou ouvidos, ou se as pupilas ficarem com tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vômitos e diarreia após comer',
        oQueFazer: [
            'Tome soro caseiro ou água de coco em pequenos goles ao longo do dia.',
            'Fique de repouso.',
            'Quando a fome voltar, coma alimentos leves e sem gordura (como arroz branco, batata e torradas).',
        ],
        oQueNaoFazer: [
            'Não tome remédios para "prender" o intestino (as toxinas precisam ser eliminadas pelo corpo).',
            'Não se force a comer se ainda estiver com muita náusea.',
        ],
        quandoChamarAjuda: 'Se notar sinais de desidratação (boca muito seca, choro sem lágrimas, ficar horas sem urinar), se tiver sangue nas fezes ou febre alta.'
    },
    {
        id: 'ps_10',
        titulo: 'Corpos Estranhos',
        emoji: '👁️',
        situacao: 'Objeto no olho, nariz ou ouvido',
        oQueFazer: [
            'Olhos: lave com bastante soro fisiológico ou água morna corrente.',
            'Nariz/Ouvido: se o objeto estiver bem na pontinha e for fácil, tente tirar delicadamente com uma pinça.',
            'Se estiver difícil ou profundo, vá direto ao pronto-socorro.',
        ],
        oQueNaoFazer: [
            'NÃO esfregue os olhos (um grão de areia ou metal pode riscar a córnea).',
            'NÃO use cotonetes para cutucar o ouvido (você vai empurrar o objeto ainda mais para dentro).',
        ],
        quandoChamarAjuda: 'Sempre que o objeto não sair com facilidade na primeira lavagem ou se a pessoa sentir dor e vista embaçada.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordidas de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lave bem o ferimento com água corrente e sabão neutro por 10 minutos.',
            'Se estiver sangrando, pressione com um pano limpo.',
            'Vá ao pronto-socorro para limpar profundamente e avaliar a necessidade de vacina contra Raiva e Tétano.',
        ],
        oQueNaoFazer: [
            'Não tente costurar ou fechar o machucado em casa.',
            'Não ignore mordidas pequenas (a saliva do animal tem bactérias que causam infecções rápidas).',
        ],
        quandoChamarAjuda: 'Sempre. Qualquer mordida que rasgue a pele precisa de avaliação e protocolo preventivo de vacinação.'
    },
    {
        id: 'ps_12',
        titulo: 'Mal Súbito',
        emoji: '😵',
        situacao: 'Tontura, fraqueza, palidez ou dor no peito',
        oQueFazer: [
            'Ajude a pessoa a sentar ou deitar em um local fresco e ventilado.',
            'Afrouxe roupas apertadas, como golas de camisa e cintos.',
            'Pergunte se a pessoa tem algum problema de saúde conhecido ou toma remédios diários.',
        ],
        oQueNaoFazer: [
            'NÃO dê água ou comida se a pessoa estiver confusa ou desorientada.',
            'NÃO deixe a pessoa sozinha.',
        ],
        quandoChamarAjuda: 'Se a pessoa não melhorar em 2 minutos, se desmaiar ou se relatar uma dor forte ou aperto no peito.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmaio',
        emoji: '💤',
        situacao: 'Perda súbita e breve da consciência',
        oQueFazer: [
            'Deite a pessoa de barriga para cima.',
            'Levante as pernas dela (cerca de 30 cm do chão) para ajudar o sangue a voltar para a cabeça.',
            'Fique de olho na respiração dela.',
        ],
        oQueNaoFazer: [
            'NÃO jogue água fria no rosto da pessoa.',
            'NÃO dê álcool ou perfume para ela cheirar.',
            'NÃO tente levantar a pessoa com pressa assim que ela acordar.',
        ],
        quandoChamarAjuda: 'Se a pessoa demorar mais de 2 minutos para acordar ou se caiu de forma brusca e bateu a cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, rigidez, salivação',
        oQueFazer: [
            'Proteja a cabeça da pessoa colocando um casaco dobrado ou almofada por baixo.',
            'Afaste cadeiras ou objetos duros para ela não se machucar durante os tremores.',
            'Cronometre a duração da crise.',
            'Assim que a crise passar, vire a pessoa de lado (posição de segurança) para ajudá-la a respirar.',
        ],
        oQueNaoFazer: [
            'NUNCA tente segurar a língua da pessoa ou colocar objetos/dedos na boca dela.',
            'NÃO tente segurar os braços ou pernas dela à força.',
            'NÃO ofereça água ou remédios enquanto ela estiver tremendo.',
        ],
        quandoChamarAjuda: 'Se a crise durar mais de 5 minutos, se for a primeira vez que a pessoa tem isso, ou se ela tiver uma convulsão atrás da outra.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Derrame)',
        emoji: '🥴',
        situacao: 'Boca torta, fala enrolada, perda de força',
        oQueFazer: [
            'Faça o teste SAMU: peça para ela Sorrir (boca entorta?), dar um Abraço (um braço cai?), cantar uma Música (fala enrolada?). Se sim, é Urgente.',
            'Marque no relógio a hora exata em que os sintomas começaram.',
            'Ligue imediatamente para o SAMU no 192.',
        ],
        oQueNaoFazer: [
            'Não espere os sintomas melhorarem sozinhos.',
            'Não dê remédios como aspirina ou calmantes (pode piorar gravemente se for um AVC hemorrágico).',
        ],
        quandoChamarAjuda: 'Na mesma hora (192). O tempo de resposta é vital para evitar sequelas permanentes.'
    },
    {
        id: 'ps_16',
        titulo: 'Parada Cardíaca',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligue imediatamente para o 192 e peça a um ajudante para buscar um DEA (Desfibrilador), se houver um por perto.',
            'Comece as massagens cardíacas (RCP) sem perder tempo.',
            'Apoie as mãos no centro do peito e empurre com força e rapidez (ritmo de 100 a 120 compressões por minuto).',
            'Deixe o peito voltar à posição normal após cada empurrão.',
        ],
        oQueNaoFazer: [
            'Não interrompa as compressões até o socorro chegar ou a pessoa reagir.',
            'Não tenha medo de fraturar uma costela — fazer o coração voltar a bater é a prioridade.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    }
];
