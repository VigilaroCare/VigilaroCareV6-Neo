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
            'Cubra a ferida cuidadosamente com um pano limpo e úmido.',
        ],
        oQueNaoFazer: [
            'NUNCA passe pomadas, pasta de dente, manteiga, pó de café ou gelo diretamente sobre a queimadura.',
            'NÃO estoure as bolhas que se formarem.',
            'NÃO tente arrancar pedaços de roupa grudados na pele queimada.',
        ],
        quandoChamarAjuda: 'Chame ajuda se a queimadura for maior que a palma da mão, atingir o rosto, mãos, genitais ou ocorrer em crianças e idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgo (Adulto e Criança acima de 1 ano)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea — protocolo AHA 2025',
        oQueFazer: [
            'Incentive a tosse se a pessoa conseguir tossir com força (a tosse é a manobra mais eficaz em obstrução parcial).',
            'Peça a alguém para ligar para o {{EMERGENCY_MEDICAL}} e inicie as manobras caso a pessoa não consiga tossir, falar nem respirar (obstrução total).',
            'Posicione-se atrás da vítima, incline o tronco dela levemente para a frente e aplique 5 pancadas firmes nas costas, entre as escápulas, com a base da mão.',
            'Aplique 5 compressões abdominais (manobra de Heimlich) se o objeto não sair: posicione o punho fechado acima do umbigo, cubra com a outra mão e puxe para dentro e para cima em \'J\'.',
            'Alterne continuamente 5 pancadas nas costas com 5 compressões abdominais até o objeto ser expelido ou a pessoa perder a consciência.',
            'Substitua as compressões abdominais por 5 compressões no centro do peito em gestantes ou em pessoas obesas quando não for possível abraçar o abdômen.',
        ],
        oQueNaoFazer: [
            'NÃO ofereça água nem comida (a via aérea está obstruída).',
            'NÃO coloque os dedos na boca às cegas para tentar retirar o objeto (risco de empurrá-lo mais profundamente).',
            'NÃO interrompa os ciclos de 5 pancadas e 5 compressões para procurar o objeto a menos que seja visível ou haja desmaio.',
        ],
        quandoChamarAjuda: 'Ligue para o {{EMERGENCY_MEDICAL}} imediatamente ao identificar obstrução total. Caso a vítima perca a consciência, deite-a no chão e inicie imediatamente a RCP com compressões torácicas.'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgo (Bebê menor de 1 ano)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes — protocolo AHA 2025',
        oQueFazer: [
            'Apoie o bebê de bruços sobre o antebraço, mantendo a cabeça mais baixa que o tronco, sustentando firmemente o queixo e a mandíbula sem apertar o pescoço.',
            'Aplique 5 pancadas firmes nas costas, entre as escápulas, utilizando a base da palma da mão.',
            'Vire o bebê de barriga para cima no antebraço e aplique 5 compressões torácicas no centro do peito, com a base da palma de uma das mãos.',
            'Alterne ciclos de 5 pancadas nas costas com 5 compressões no peito até o corpo estranho ser expelido ou o bebê perder a consciência.',
        ],
        oQueNaoFazer: [
            'NUNCA realize compressões abdominais (Heimlich) em bebês menores de 1 ano (risco de lesão grave em órgãos internos como fígado e baço).',
            'NUNCA sacuda o bebê.',
            'NÃO coloque os dedos na boca do bebê às cegas se o objeto ou alimento não estiver visível na cavidade oral.',
        ],
        quandoChamarAjuda: 'Acione o {{EMERGENCY_MEDICAL}} assim que notar ausência de choro, tosse ou respiração. Se o bebê desmaiar, inicie a RCP de lactente (30 compressões para 2 ventilações).'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Sangramentos',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lave o corte delicadamente com soro fisiológico ou água e sabão neutro.',
            'Pressione o local com firmeza usando um pano limpo por 5 a 10 minutos sem interromper.',
            'Mantenha o membro afetado (braço ou perna) elevado para diminuir a pressão e o fluxo de sangue.',
        ],
        oQueNaoFazer: [
            'NÃO faça torniquetes (use apenas em amputações ou sangramentos arteriais gravíssimos que não estancam com pressão).',
            'NÃO aplique pó de café, açúcar ou pomadas no corte.',
        ],
        quandoChamarAjuda: 'Chame ajuda se o sangramento não parar após 10 minutos de pressão direta, se o corte for muito profundo ou se as bordas ficarem abertas.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contato com corrente elétrica',
        oQueFazer: [
            'Desligue o disjuntor geral no quadro de luz IMEDIATAMENTE.',
            'Afaste a pessoa da fonte elétrica usando um objeto de madeira ou plástico seco (como cabo de vassoura seco) caso não seja possível desligar a energia.',
            'Cheque se a pessoa está respirando e se tem batimentos cardíacos após o afastamento da fonte elétrica.',
        ],
        oQueNaoFazer: [
            'NUNCA encoste na pessoa se ela ainda estiver em contato com a corrente elétrica.',
        ],
        quandoChamarAjuda: 'SEMPRE chame o {{EMERGENCY_MEDICAL}}, pois a corrente elétrica pode provocar arritmias cardíacas tardias.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identifique imediatamente qual produto ou medicamento a pessoa engoliu.',
            'Ligue imediatamente para o centro de informações toxicológicas: {{POISON_CONTROL}}.',
            'Siga rigorosamente as orientações do atendente médico.',
        ],
        oQueNaoFazer: [
            'NÃO provoque vômito, a menos que o centro de toxicologia oriente (produtos corrosivos queimam o esôfago na ida e na volta).',
            'NÃO ofereça leite, água ou remédios caseiros sem orientação médica prévia.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Quedas e Fraturas',
        emoji: '🤕',
        situacao: 'Queda de altura ou impacto forte',
        oQueFazer: [
            'Mantenha a pessoa deitada e imóvel, especialmente em caso de dor nas costas ou no pescoço.',
            'Aplique bolsa de gelo enrolada em uma toalha sobre o local dolorido.',
            'Pressione suavemente com pano limpo em caso de ferimento com sangramento.',
        ],
        oQueNaoFazer: [
            'NÃO tente alinhar ou colocar o osso de volta no lugar.',
            'NÃO mova nem levante a pessoa se houver suspeita de lesão na coluna.',
        ],
        quandoChamarAjuda: 'Chame ajuda se houver deformidade visível no osso, dor muito forte, incapacidade de mover o membro ou desmaio.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craniano',
        emoji: '🧠',
        situacao: 'Batida forte na cabeça',
        oQueFazer: [
            'Observe a pessoa atentamente nas 24 horas seguintes.',
            'Mantenha a pessoa acordada e conversando por algum tempo após o impacto.',
            'Aplique compressa fria no local para conter o inchaço.',
        ],
        oQueNaoFazer: [
            'NÃO ignore sintomas como vômitos, tonturas ou falhas de memória.',
            'NÃO administre remédios fortes para dor ou sedativos sem orientação médica.',
        ],
        quandoChamarAjuda: 'Chame ajuda se a pessoa vomitar, desmaiar, apresentar sangramento pelo nariz ou ouvidos, ou se as pupilas ficarem com tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vômitos e diarreia após comer',
        oQueFazer: [
            'Ingira soro caseiro ou água de coco em pequenos goles ao longo do dia.',
            'Fique em repouso.',
            'Consuma alimentos leves e sem gordura (como arroz branco, batata e torradas) quando a fome voltar.',
        ],
        oQueNaoFazer: [
            'NÃO tome remédios para \'prender\' o intestino (as toxinas precisam ser eliminadas pelo corpo).',
            'NÃO force a alimentação se houver náusea forte.',
        ],
        quandoChamarAjuda: 'Chame ajuda ao notar sinais de desidratação (boca seca, ausência de lágrimas ou urina por horas), febre alta ou sangue nas fezes.'
    },
    {
        id: 'ps_10',
        titulo: 'Corpos Estranhos',
        emoji: '👁️',
        situacao: 'Objeto no olho, nariz ou ouvido',
        oQueFazer: [
            'Olhos: lave com bastante soro fisiológico ou água morna corrente.',
            'Nariz/Ouvido: tente retirar delicadamente com pinça apenas se o objeto estiver visível e na extremidade.',
            'Dirija-se ao pronto-socorro se o objeto estiver profundo ou difícil de remover.',
        ],
        oQueNaoFazer: [
            'NÃO esfregue os olhos (risco de lesão na córnea por atrito).',
            'NÃO introduza cotonetes ou objetos pontiagudos no ouvido (risco de empurrar o objeto ou perfurar o tímpano).',
        ],
        quandoChamarAjuda: 'Chame ajuda sempre que o objeto não sair com facilidade na primeira lavagem leve ou se houver dor e visão embaçada.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordidas de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lave bem o ferimento com água corrente e sabão neutro por 10 minutos.',
            'Pressione com um pano limpo em caso de sangramento.',
            'Dirija-se ao pronto-socorro para higienização profunda e avaliação da necessidade de vacina contra raiva e tétano.',
        ],
        oQueNaoFazer: [
            'NÃO tente costurar ou fechar o machucado em casa.',
            'NÃO ignore mordidas pequenas (a saliva do animal tem bactérias de infecção rápida).',
        ],
        quandoChamarAjuda: 'Chame ajuda em qualquer mordida que cause ferimento na pele para avaliação e protocolo preventivo de vacinação.'
    },
    {
        id: 'ps_12',
        titulo: 'Mal Súbito',
        emoji: '😵',
        situacao: 'Tontura, fraqueza, palidez ou dor no peito',
        oQueFazer: [
            'Ajude a pessoa a sentar ou deitar em um local fresco e ventilado.',
            'Afrouxe roupas apertadas, como golas de camisa e cintos.',
            'Pergunte sobre problemas de saúde conhecidos e uso de remédios contínuos.',
        ],
        oQueNaoFazer: [
            'NÃO ofereça água ou comida se a pessoa estiver confusa ou desorientada.',
            'NÃO deixe a pessoa sozinha.',
        ],
        quandoChamarAjuda: 'Chame ajuda se a pessoa não melhorar em 2 minutos, se desmaiar ou se relatar dor forte ou aperto no peito.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmaio',
        emoji: '💤',
        situacao: 'Perda súbita e breve da consciência',
        oQueFazer: [
            'Deite a pessoa de barriga para cima.',
            'Eleve as pernas a cerca de 30 cm do chão para favorecer o retorno venoso e a circulação cerebral.',
            'Observe a respiração continuamente.',
        ],
        oQueNaoFazer: [
            'NÃO jogue água fria no rosto da pessoa.',
            'NÃO ofereça álcool, perfume ou qualquer substância para cheirar.',
            'NÃO tente levantar a pessoa com pressa assim que ela recobrar a consciência.',
        ],
        quandoChamarAjuda: 'Chame ajuda se a pessoa demorar mais de 2 minutos para acordar ou se sofreu queda grave com trauma na cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, rigidez, salivação',
        oQueFazer: [
            'Proteja a cabeça da pessoa colocando um casaco dobrado ou almofada por baixo.',
            'Afaste cadeiras ou objetos duros para evitar traumas durante os tremores.',
            'Cronometre a duração da crise. Se durar mais de 3 minutos já requer maior atenção.',
            'Vire a pessoa de lado (posição lateral de segurança) assim que a crise passar.',
        ],
        oQueNaoFazer: [
            'NUNCA tente segurar a língua da pessoa ou colocar objetos/dedos em sua boca.',
            'NÃO contenha com firmeza os movimentos de braços e pernas.',
            'NÃO ofereça água ou remédios enquanto houver convulsão.',
        ],
        quandoChamarAjuda: 'Chame ajuda se a crise durar mais de 5 minutos, se for o primeiro episódio ou em crises consecutivas.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Derrame)',
        emoji: '🥴',
        situacao: 'Boca torta, fala enrolada, perda de força',
        oQueFazer: [
            'Realize o teste SAMU: peça para a pessoa Sorrir (boca entorta?), dar um Abraço (um braço cai?), cantar uma Música (fala enrolada?). Se sim, é urgente.',
            'Marque a hora exata em que os sintomas começaram.',
            'Ligue imediatamente para o {{EMERGENCY_MEDICAL}}.',
        ],
        oQueNaoFazer: [
            'NÃO espere os sintomas melhorarem sozinhos.',
            'NÃO administre remédios (como aspirina ou calmantes) antes da avaliação médica.',
        ],
        quandoChamarAjuda: 'Chame o {{EMERGENCY_MEDICAL}} imediatamente ao identificar qualquer sinal do teste SAMU. O tempo é vital para evitar sequelas.'
    },
    {
        id: 'ps_16',
        titulo: 'Parada Cardíaca',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligue imediatamente para o {{EMERGENCY_MEDICAL}} e solicite um Desfibrilador Externo Automático (DEA), se disponível no local.',
            'Inicie as compressões torácicas (RCP) sem perda de tempo.',
            'Entrelace as mãos e posicione a base da palma no centro do peito da vítima (na altura do osso esterno) e comprima com força e rapidez (frequência de 100 a 120 compressões por minuto, afundando cerca de 5 a 6 cm).',
            'Permita o retorno completo do tórax após cada compressão, sem retirar as mãos da posição.',
        ],
        oQueNaoFazer: [
            'NÃO interrompa as compressões torácicas até a equipe do {{EMERGENCY_MEDICAL}} assumir, o DEA orientar a afastar-se ou a vítima voltar a respirar normalmente.',
            'NÃO receie fraturas de costela — a manutenção do fluxo sanguíneo para o cérebro e coração é a prioridade absoluta.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    }
];
