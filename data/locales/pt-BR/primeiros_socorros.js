export const primeirosSocorrosPTBR = [
    {
        id: 'ps_1',
        titulo: 'Queimaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química ou Elétrica',
        oQueFazer: [
            'Tirar a pessoa de perto do fogo ou da fonte de calor.',
            'Resfriar o local jogando água corrente em temperatura ambiente por 15 a 20 minutos.',
            'Tirar anéis, pulseiras e relógios antes que a região comece a inchar.',
            'Cobrir a ferida cuidadosamente com um pano limpo e úmido.',
        ],
        oQueNaoFazer: [
            'NUNCA passar pomadas, pasta de dente, manteiga, pó de café ou gelo diretamente sobre a queimadura.',
            'NÃO estourar as bolhas que se formarem.',
            'NÃO tentar arrancar pedaços de roupa grudados na pele queimada.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se a queimadura for maior que a palma da mão, atingir o rosto, mãos, genitais ou ocorrer em crianças e idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgo (Adulto e Criança acima de 1 ano)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea — protocolo AHA 2025',
        oQueFazer: [
            'Incentivar a tosse se a pessoa conseguir tossir com força (a tosse é a manobra mais eficaz em obstrução parcial).',
            'Pedir a alguém para ligar para o {{EMERGENCY_MEDICAL}} e iniciar as manobras caso a pessoa não consiga tossir, falar nem respirar (obstrução total).',
            'Posicionar-se atrás da vítima, inclinar o tronco dela levemente para a frente e aplicar 5 pancadas firmes nas costas, entre as escápulas, com a base da mão.',
            'Aplicar 5 compressões abdominais (manobra de Heimlich) se o objeto não sair: posicionar o punho fechado acima do umbigo, cobrir com a outra mão e puxar para dentro e para cima em \'J\'.',
            'Alternar continuamente 5 pancadas nas costas com 5 compressões abdominais até o objeto ser expelido ou a pessoa perder a consciência.',
            'Substituir as compressões abdominais por 5 compressões no centro do peito em gestantes ou em pessoas obesas quando não for possível abraçar o abdômen.',
        ],
        oQueNaoFazer: [
            'NÃO oferecer água nem comida (a via aérea está obstruída).',
            'NÃO colocar os dedos na boca às cegas para tentar retirar o objeto (risco de empurrá-lo mais profundamente).',
            'NÃO interromper os ciclos de 5 pancadas e 5 compressões para procurar o objeto a menos que seja visível ou haja desmaio.',
        ],
        quandoChamarAjuda: 'Ligar para o {{EMERGENCY_MEDICAL}} imediatamente ao identificar obstrução total. Caso a vítima perca a consciência, deitá-la no chão e iniciar imediatamente a RCP com compressões torácicas.'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgo (Bebê menor de 1 ano)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes — protocolo AHA 2025',
        oQueFazer: [
            'Apoiar o bebê de bruços sobre o antebraço, mantendo a cabeça mais baixa que o tronco, sustentando firmemente o queixo e a mandíbula sem apertar o pescoço.',
            'Aplicar 5 pancadas firmes nas costas, entre as escápulas, utilizando a base da palma da mão.',
            'Virar o bebê de barriga para cima no antebraço e aplicar 5 compressões torácicas no centro do peito, com a base da palma da mão ou dois dedos.',
            'Alternar ciclos de 5 pancadas nas costas com 5 compressões no peito até o corpo estranho ser expelido ou o bebê perder a consciência.',
        ],
        oQueNaoFazer: [
            'NUNCA realizar compressões abdominais (Heimlich) em bebês menores de 1 ano (risco de lesão grave em órgãos internos como fígado e baço).',
            'Nunca sacuda o bebê.',
            'NÃO colocar os dedos na boca do bebê às cegas se o objeto ou alimento não estiver visível na cavidade oral.',
        ],
        quandoChamarAjuda: 'Acionar o {{EMERGENCY_MEDICAL}} assim que notar ausência de choro, tosse ou respiração. Se o bebê desmaiar, iniciar a RCP de lactente (30 compressões para 2 ventilações).'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Sangramentos',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lavar o corte delicadamente com soro fisiológico ou água e sabão neutro.',
            'Pressionar o local com firmeza usando um pano limpo por 5 a 10 minutos sem interromper.',
            'Manter o membro afetado (braço ou perna) elevado para diminuir a pressão e o fluxo de sangue.',
        ],
        oQueNaoFazer: [
            'NÃO fazer torniquetes (utilizar apenas em amputações ou sangramentos arteriais gravíssimos que não estancam com pressão).',
            'NÃO aplicar pó de café, açúcar ou pomadas no corte.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se o sangramento não parar após 10 minutos de pressão direta, se o corte for muito profundo ou se as bordas ficarem abertas.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contato com corrente elétrica',
        oQueFazer: [
            'Desligar o disjuntor geral no quadro de luz IMEDIATAMENTE.',
            'Afastar a pessoa da fonte elétrica usando um objeto de madeira ou plástico seco (como cabo de vassoura seco) caso não seja possível desligar a energia.',
            'Checar se a pessoa está respirando e se tem batimentos cardíacos após o afastamento da fonte elétrica.',
        ],
        oQueNaoFazer: [
            'NUNCA encostar na pessoa se ela ainda estiver em contato com a corrente elétrica.',
        ],
        quandoChamarAjuda: 'SEMPRE chamar o {{EMERGENCY_MEDICAL}}, pois a corrente elétrica pode provocar arritmias cardíacas tardias.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identificar imediatamente qual produto ou medicamento a pessoa engoliu.',
            'Ligar imediatamente para o Centro de Informações Antiveneno ({{POISON_CONTROL}}).',
            'Seguir rigorosamente as orientações do atendente médico.',
        ],
        oQueNaoFazer: [
            'NÃO provocar vômito se for ingerido produto químico (produtos corrosivos queimam o esôfago na ida e na volta).',
            'NÃO oferecer leite, água ou remédios caseiros sem orientação médica prévia.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Quedas e Fraturas',
        emoji: '🤕',
        situacao: 'Queda de altura ou impacto forte',
        oQueFazer: [
            'Manter a pessoa deitada e imóvel, especialmente em caso de dor nas costas ou no pescoço.',
            'Aplicar bolsa de gelo enrolada em uma toalha sobre o local dolorido.',
            'Pressionar suavemente com pano limpo em caso de ferimento com sangramento.',
        ],
        oQueNaoFazer: [
            'NÃO tentar alinhar ou colocar o osso de volta no lugar.',
            'NÃO mover ou levantar a pessoa se houver suspeita de lesão na coluna.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se houver deformidade visível no osso, dor muito forte, incapacidade de mover o membro ou desmaio.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craniano',
        emoji: '🧠',
        situacao: 'Batida forte na cabeça',
        oQueFazer: [
            'Observar a pessoa atentamente nas 24 horas seguintes.',
            'Manter a pessoa acordada e conversando por algum tempo após o impacto.',
            'Aplicar compressa fria no local para conter o inchaço.',
        ],
        oQueNaoFazer: [
            'NÃO ignorar sintomas como vômitos, tonturas ou falhas de memória.',
            'NÃO administrar remédios fortes para dor ou sedativos sem orientação médica.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se a pessoa vomitar, desmaiar, apresentar sangramento pelo nariz ou ouvidos, ou se as pupilas ficarem com tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vômitos e diarreia após comer',
        oQueFazer: [
            'Ingerir soro caseiro ou água de coco em pequenos goles ao longo do dia.',
            'Ficar em repouso.',
            'Consumir alimentos leves e sem gordura (como arroz branco, batata e torradas) quando a fome voltar.',
        ],
        oQueNaoFazer: [
            'NÃO tomar remédios para \'prender\' o intestino (as toxinas precisam ser eliminadas pelo corpo).',
            'NÃO forçar a alimentação se houver náusea forte.',
        ],
        quandoChamarAjuda: 'Chamar ajuda ao notar sinais de desidratação (boca seca, ausência de lágrimas ou urina por horas), febre alta ou sangue nas fezes.'
    },
    {
        id: 'ps_10',
        titulo: 'Corpos Estranhos',
        emoji: '👁️',
        situacao: 'Objeto no olho, nariz ou ouvido',
        oQueFazer: [
            'Olhos: lavar com bastante soro fisiológico ou água morna corrente.',
            'Nariz/Ouvido: tentar retirar delicadamente com pinça apenas se o objeto estiver visível e na extremidade.',
            'Dirigir-se ao pronto-socorro se o objeto estiver profundo ou difícil de remover.',
        ],
        oQueNaoFazer: [
            'NÃO esfregar os olhos (risco de lesão na córnea por atrito).',
            'NÃO introduzir cotonetes ou objetos pontiagudos no ouvido (risco de empurrar o objeto ou perfurar o tímpano).',
        ],
        quandoChamarAjuda: 'Chamar ajuda sempre que o objeto não sair com facilidade na primeira lavagem leve ou se houver dor e visão embaçada.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordidas de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lavar bem o ferimento com água corrente e sabão neutro por 10 minutos.',
            'Pressionar com um pano limpo em caso de sangramento.',
            'Dirigir-se ao pronto-socorro para higienização profunda e avaliação da necessidade vacina contra raiva e Tétano.',
        ],
        oQueNaoFazer: [
            'NÃO tentar costurar ou fechar o machucado em casa.',
            'NÃO ignorar mordidas pequenas (a saliva do animal tem bactérias de infecção rápida).',
        ],
        quandoChamarAjuda: 'Chamar ajuda em qualquer mordida que cause ferimento na pele para avaliação e protocolo preventivo de vacinação.'
    },
    {
        id: 'ps_12',
        titulo: 'Mal Súbito',
        emoji: '😵',
        situacao: 'Tontura, fraqueza, palidez ou dor no peito',
        oQueFazer: [
            'Ajudar a pessoa a sentar ou deitar em um local fresco e ventilado.',
            'Afrouxar roupas apertadas, como golas de camisa e cintos.',
            'Perguntar sobre problemas de saúde conhecidos e uso de remédios contínuos.',
        ],
        oQueNaoFazer: [
            'NÃO oferecer água ou comida se a pessoa estiver confusa ou desorientada.',
            'NÃO deixar a pessoa sozinha.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se a pessoa não melhorar em 2 minutos, se desmaiar ou se relatar dor forte ou aperto no peito.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmaio',
        emoji: '💤',
        situacao: 'Perda súbita e breve da consciência',
        oQueFazer: [
            'Deitar a pessoa de barriga para cima.',
            'Elevar as pernas a cerca de 30 cm do chão para favorecer o retorno venoso e a circulação cerebral.',
            'Observar a respiração continuamente.',
        ],
        oQueNaoFazer: [
            'NÃO jogar água fria no rosto da pessoa.',
            'NÃO oferecer álcool, perfume ou qualquer substância para cheirar.',
            'NÃO tentar levantar a pessoa com pressa assim que ela recobrar a consciência.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se a pessoa demorar mais de 2 minutos para acordar ou se sofreu queda grave com trauma na cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, rigidez, salivação',
        oQueFazer: [
            'Proteger a cabeça da pessoa colocando um casaco dobrado ou almofada por baixo.',
            'Afastar cadeiras ou objetos duros para evitar traumas durante os tremores.',
            'Cronometrar a duração da crise. Se durar mais de 3 minutos já requer maior atenção.',
            'Virar a pessoa de lado (posição lateral de segurança) assim que a crise passar.',
        ],
        oQueNaoFazer: [
            'NUNCA tentar segurar a língua da pessoa ou colocar objetos/dedos em sua boca.',
            'NÃO conter com firmeza os movimentos de braços e pernas.',
            'NÃO oferecer água ou remédios enquanto houver convulsão.',
        ],
        quandoChamarAjuda: 'Chamar ajuda se a crise durar mais de 5 minutos, se for o primeiro episódio ou em crises consecutivas.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Derrame)',
        emoji: '🥴',
        situacao: 'Boca torta, fala enrolada, perda de força',
        oQueFazer: [
            'Realizar o teste SAMU: pedir para a pessoa Sorrir (boca entorta?), dar um Abraço (um braço cai?), cantar uma Música (fala enrolada?). Se sim, é urgente.',
            'Marcar a hora exata em que os sintomas começaram.',
            'Ligar imediatamente para o {{EMERGENCY_MEDICAL}}.',
        ],
        oQueNaoFazer: [
            'NÃO esperar os sintomas melhorarem sozinhos.',
            'NÃO administrar remédios (como aspirina ou calmantes) antes da avaliação médica.',
        ],
        quandoChamarAjuda: 'Chamar o {{EMERGENCY_MEDICAL}} imediatamente ao identificar qualquer sinal do teste SAMU. O tempo é vital para evitar sequelas.'
    },
    {
        id: 'ps_16',
        titulo: 'Parada Cardíaca',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligar imediatamente para o {{EMERGENCY_MEDICAL}} e solicitar um Desfibrilador Externo Automático (DEA), se disponível no local.',
            'Iniciar as compressões torácicas (RCP) sem perda de tempo.',
            'Entrelaçar as mãos e posicionar a base da palma no centro do peito da vítima (na altura do osso esterno) e comprimir com força e rapidez (frequência de 100 a 120 compressões por minuto, afundando cerca de 5 a 6 cm).',
            'Permitir o retorno completo do tórax após cada compressão, sem retirar as mãos da posição.',
        ],
        oQueNaoFazer: [
            'NÃO interromper as compressões torácicas até a equipe do {{EMERGENCY_MEDICAL}} assumir, o DEA orientar a afastar-se ou a vítima voltar a respirar normalmente.',
            'NÃO recear fraturas de costela — a manutenção do fluxo sanguíneo para o cérebro e coração é a prioridade absoluta.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    }
];
