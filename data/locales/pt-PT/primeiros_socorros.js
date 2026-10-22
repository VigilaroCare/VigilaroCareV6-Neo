export const primeirosSocorrosPTPT = [
    {
        id: 'ps_1',
        titulo: 'Queimaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química ou Elétrica',
        oQueFazer: [
            'Afaste a pessoa do fogo ou da fonte de calor.',
            'Arrefeça o local com água corrente à temperatura ambiente durante 15 a 20 minutos.',
            'Retire anéis, pulseiras e relógios antes que a zona comece a inchar.',
            'Cubra a ferida com cuidado com um pano limpo e húmido.',
        ],
        oQueNaoFazer: [
            'NUNCA aplique pomadas, pasta de dentes, manteiga, café moído ou gelo diretamente sobre a queimadura.',
            'NÃO rebente as bolhas que se formarem.',
            'NÃO tente arrancar pedaços de roupa colados à pele queimada.',
        ],
        quandoChamarAjuda: 'Peça ajuda se a queimadura for maior do que a palma da mão, atingir a cara, as mãos ou os genitais, ou ocorrer em crianças e idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgamento (Adulto e Criança acima de 1 ano)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea — protocolo AHA 2025',
        oQueFazer: [
            'Incentive a tosse se a pessoa conseguir tossir com força (a tosse é a manobra mais eficaz na obstrução parcial).',
            'Peça a alguém para ligar para o {{EMERGENCY_MEDICAL}} e inicie as manobras se a pessoa não conseguir tossir, falar nem respirar (obstrução total).',
            'Posicione-se atrás da vítima, incline-lhe o tronco ligeiramente para a frente e aplique 5 pancadas firmes nas costas, entre as omoplatas, com a base da mão.',
            'Se o objeto não sair, aplique 5 compressões abdominais (manobra de Heimlich): coloque o punho fechado logo acima do umbigo, cubra-o com a outra mão e puxe para dentro e para cima em \'J\'.',
            'Alterne continuamente 5 pancadas nas costas com 5 compressões abdominais até o objeto ser expelido ou a pessoa perder a consciência.',
            'Em grávidas, ou em pessoas obesas quando não for possível abraçar o abdómen, substituir as compressões abdominais por 5 compressões no centro do peito.',
        ],
        oQueNaoFazer: [
            'NÃO ofereça água nem comida (a via aérea está obstruída).',
            'NÃO meta os dedos na boca às cegas para tentar retirar o objeto (risco de o empurrar mais para dentro).',
            'NÃO interrompa os ciclos de 5 pancadas e 5 compressões para procurar o objeto, a menos que seja visível ou haja desmaio.',
        ],
        quandoChamarAjuda: 'Ligue para o {{EMERGENCY_MEDICAL}} assim que identificar obstrução total. Se a vítima perder a consciência, deite-a no chão e inicie de imediato o SBV com compressões torácicas.'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgamento (Bebé com menos de 1 ano)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes — protocolo AHA 2025',
        oQueFazer: [
            'Apoie o bebé de barriga para baixo sobre o antebraço, com a cabeça mais baixa do que o tronco, segurando firmemente o queixo e a mandíbula sem apertar o pescoço.',
            'Aplique 5 pancadas firmes nas costas, entre as omoplatas, com a base da palma da mão.',
            'Vire o bebé de barriga para cima sobre o antebraço e aplique 5 compressões no centro do peito com a base da palma de uma das mãos.',
            'Alterne ciclos de 5 pancadas nas costas e 5 compressões no peito até o objeto ser expelido ou o bebé perder a consciência.',
        ],
        oQueNaoFazer: [
            'NUNCA faça compressões abdominais (Heimlich) em bebés com menos de 1 ano (risco de lesão grave em órgãos internos como o fígado e o baço).',
            'NUNCA sacuda o bebé.',
            'NÃO meta os dedos na boca do bebé às cegas se o objeto ou alimento não estiver visível na cavidade oral.',
        ],
        quandoChamarAjuda: 'Ligue para o {{EMERGENCY_MEDICAL}} assim que notar ausência de choro, tosse ou respiração. Se o bebé desmaiar, inicie o SBV pediátrico (30 compressões para 2 insuflações).'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Hemorragias',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lave o corte com cuidado com soro fisiológico ou água e sabão neutro.',
            'Pressione o local com firmeza com um pano limpo durante 5 a 10 minutos sem interromper.',
            'Mantenha o membro afetado (braço ou perna) elevado para diminuir a pressão e o fluxo de sangue.',
        ],
        oQueNaoFazer: [
            'NÃO faça garrotes (use apenas em amputações ou hemorragias arteriais gravíssimas que não param com pressão).',
            'NÃO aplique café moído, açúcar ou pomadas no corte.',
        ],
        quandoChamarAjuda: 'Peça ajuda se a hemorragia não parar após 10 minutos de pressão direta, se o corte for muito profundo ou se os bordos ficarem abertos.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contacto com corrente elétrica',
        oQueFazer: [
            'Desligue o disjuntor geral no quadro elétrico IMEDIATAMENTE.',
            'Afaste a pessoa da fonte elétrica com um objeto de madeira ou plástico seco (como um cabo de vassoura seco), caso não seja possível cortar a corrente.',
            'Verifique se a pessoa respira e tem batimentos cardíacos depois de afastada da fonte elétrica.',
        ],
        oQueNaoFazer: [
            'NUNCA toque na pessoa se ela ainda estiver em contacto com a corrente elétrica.',
        ],
        quandoChamarAjuda: 'Chame SEMPRE o {{EMERGENCY_MEDICAL}}, pois a corrente elétrica pode provocar arritmias cardíacas tardias.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identifique de imediato que produto ou medicamento a pessoa engoliu.',
            'Ligue de imediato para o centro de informação antivenenos: {{POISON_CONTROL}}.',
            'Siga rigorosamente as orientações do profissional de saúde que atender.',
        ],
        oQueNaoFazer: [
            'NÃO provoque o vómito, a menos que o centro antivenenos o indique (os produtos corrosivos queimam o esófago à ida e à volta).',
            'NÃO dê leite, água ou remédios caseiros sem indicação médica prévia.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Quedas e Fraturas',
        emoji: '🤕',
        situacao: 'Queda de altura ou impacto forte',
        oQueFazer: [
            'Mantenha a pessoa deitada e imóvel, sobretudo se houver dor nas costas ou no pescoço.',
            'Aplique um saco de gelo envolto numa toalha sobre o local dorido.',
            'Pressione suavemente com um pano limpo se houver ferida a sangrar.',
        ],
        oQueNaoFazer: [
            'NÃO tente alinhar ou recolocar o osso no lugar.',
            'NÃO mova nem levante a pessoa se houver suspeita de lesão na coluna.',
        ],
        quandoChamarAjuda: 'Peça ajuda se houver deformidade visível no osso, dor muito forte, incapacidade de mexer o membro ou desmaio.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craniano',
        emoji: '🧠',
        situacao: 'Pancada forte na cabeça',
        oQueFazer: [
            'Observe a pessoa com atenção nas 24 horas seguintes.',
            'Mantenha a pessoa acordada e a conversar durante algum tempo após o impacto.',
            'Aplique uma compressa fria no local para conter o inchaço.',
        ],
        oQueNaoFazer: [
            'NÃO ignore sintomas como vómitos, tonturas ou falhas de memória.',
            'NÃO dê analgésicos fortes ou sedativos sem indicação médica.',
        ],
        quandoChamarAjuda: 'Peça ajuda se a pessoa vomitar, desmaiar, sangrar pelo nariz ou pelos ouvidos, ou se as pupilas ficarem de tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vómitos e diarreia após comer',
        oQueFazer: [
            'Beba solução de reidratação oral ou água de coco em pequenos goles ao longo do dia.',
            'Fique em repouso.',
            'Coma alimentos leves e sem gordura (como arroz branco, batata e torradas) quando o apetite voltar.',
        ],
        oQueNaoFazer: [
            'NÃO tome medicamentos para \'prender\' o intestino (as toxinas precisam de ser eliminadas pelo corpo).',
            'NÃO force a alimentação se houver náuseas fortes.',
        ],
        quandoChamarAjuda: 'Peça ajuda ao notar sinais de desidratação (boca seca, ausência de lágrimas ou de urina durante horas), febre alta ou sangue nas fezes.'
    },
    {
        id: 'ps_10',
        titulo: 'Corpos Estranhos',
        emoji: '👁️',
        situacao: 'Objeto no olho, nariz ou ouvido',
        oQueFazer: [
            'Olhos: lave com bastante soro fisiológico ou água morna corrente.',
            'Nariz/ouvido: tente retirar com cuidado com uma pinça apenas se o objeto estiver visível e à entrada.',
            'Dirija-se às urgências se o objeto estiver profundo ou for difícil de retirar.',
        ],
        oQueNaoFazer: [
            'NÃO esfregue os olhos (risco de lesão na córnea por atrito).',
            'NÃO introduza cotonetes ou objetos pontiagudos no ouvido (risco de empurrar o objeto ou perfurar o tímpano).',
        ],
        quandoChamarAjuda: 'Peça ajuda sempre que o objeto não saia com facilidade na primeira lavagem suave ou se houver dor e visão turva.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordeduras de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lave bem a ferida com água corrente e sabão neutro durante 10 minutos.',
            'Pressione com um pano limpo se houver hemorragia.',
            'Dirija-se às urgências para uma limpeza profunda e avaliação da necessidade de vacina contra a raiva e o tétano.',
        ],
        oQueNaoFazer: [
            'NÃO tente coser ou fechar a ferida em casa.',
            'NÃO ignore mordeduras pequenas (a saliva do animal tem bactérias que provocam infeções rápidas).',
        ],
        quandoChamarAjuda: 'Peça ajuda em qualquer mordedura que provoque ferida na pele, para avaliação e protocolo de vacinação preventiva.'
    },
    {
        id: 'ps_12',
        titulo: 'Mal Súbito',
        emoji: '😵',
        situacao: 'Tontura, fraqueza, palidez ou dor no peito',
        oQueFazer: [
            'Ajude a pessoa a sentar-se ou deitar-se num local fresco e arejado.',
            'Desaperte a roupa justa, como colarinhos e cintos.',
            'Pergunte por problemas de saúde conhecidos e medicação habitual.',
        ],
        oQueNaoFazer: [
            'NÃO dê água nem comida se a pessoa estiver confusa ou desorientada.',
            'NÃO deixe a pessoa sozinha.',
        ],
        quandoChamarAjuda: 'Peça ajuda se a pessoa não melhorar em 2 minutos, desmaiar ou referir dor forte ou aperto no peito.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmaio (Síncope)',
        emoji: '💤',
        situacao: 'Perda súbita e breve da consciência',
        oQueFazer: [
            'Deite a pessoa de barriga para cima.',
            'Eleve as pernas cerca de 30 cm do chão para favorecer o retorno venoso e a circulação cerebral.',
            'Observe a respiração continuamente.',
        ],
        oQueNaoFazer: [
            'NÃO atire água fria à cara da pessoa.',
            'NÃO dê a cheirar álcool, perfume ou qualquer outra substância.',
            'NÃO tente levantar a pessoa à pressa assim que recuperar a consciência.',
        ],
        quandoChamarAjuda: 'Peça ajuda se a pessoa demorar mais de 2 minutos a acordar ou se tiver sofrido uma queda grave com traumatismo na cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, perda de consciência, salivação',
        oQueFazer: [
            'Proteja a cabeça da pessoa colocando por baixo um casaco dobrado ou uma almofada.',
            'Afaste cadeiras ou objetos duros para evitar traumatismos durante os movimentos.',
            'Cronometre a duração da crise. Se durar mais de 3 minutos, já requer maior atenção.',
            'Vire a pessoa de lado (posição lateral de segurança) assim que a crise passar.',
        ],
        oQueNaoFazer: [
            'NUNCA tente segurar a língua da pessoa nem colocar objetos ou dedos na boca dela.',
            'NÃO contenha com força os movimentos dos braços e das pernas.',
            'NÃO dê água nem medicamentos enquanto houver convulsão.',
        ],
        quandoChamarAjuda: 'Peça ajuda se a crise durar mais de 5 minutos, se for o primeiro episódio ou se houver crises seguidas.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Acidente Vascular Cerebral)',
        emoji: '🥴',
        situacao: 'Boca torta, fala arrastada, perda de força',
        oQueFazer: [
            'Faça o teste dos 3F: Face (pedir para sorrir — a boca descai?), Força (pedir para levantar os dois braços — um cai?), Fala (está arrastada?). Se houver algum sinal, é urgente.',
            'Registe a hora exata em que os sintomas começaram.',
            'Ligue de imediato para o {{EMERGENCY_MEDICAL}}.',
        ],
        oQueNaoFazer: [
            'NÃO espere que os sintomas melhorem sozinhos.',
            'NÃO dê medicamentos (como aspirina ou calmantes) antes da avaliação médica.',
        ],
        quandoChamarAjuda: 'Ligue para o {{EMERGENCY_MEDICAL}} assim que identificar qualquer sinal do teste dos 3F. O tempo é vital para evitar sequelas.'
    },
    {
        id: 'ps_16',
        titulo: 'Paragem Cardiorrespiratória',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligue de imediato para o {{EMERGENCY_MEDICAL}} e peça um Desfibrilhador Automático Externo (DAE), se houver um disponível no local.',
            'Inicie as compressões torácicas (SBV) sem perder tempo.',
            'Entrelace as mãos, posicione a base da palma no centro do peito da vítima (sobre o esterno) e comprima com força e rapidez (100 a 120 compressões por minuto, com cerca de 5 a 6 cm de profundidade).',
            'Permita que o tórax volte totalmente à posição após cada compressão, sem retirar as mãos.',
        ],
        oQueNaoFazer: [
            'NÃO interrompa as compressões torácicas até a equipa do {{EMERGENCY_MEDICAL}} assumir, o DAE indicar para se afastar ou a vítima voltar a respirar normalmente.',
            'NÃO receie fraturar uma costela — manter o fluxo de sangue para o cérebro e o coração é a prioridade absoluta.',
        ],
        quandoChamarAjuda: 'IMEDIATAMENTE.'
    },
    {
        id: 'ps_17',
        titulo: 'Afogamento',
        emoji: '🌊',
        situacao: 'Pessoa retirada da água ou que se debatia para respirar',
        oQueFazer: [
            'Peça a alguém para ligar para o {{EMERGENCY_MEDICAL}} e para os bombeiros ({{FIRE_NUMBER}}).',
            'Ajude sem entrar na água sempre que possível: estenda um cabo de vassoura ou uma corda, ou atire algo que flutue (boia, garrafa de plástico fechada, esferovite).',
            'Fora de água, deite a pessoa de barriga para cima num local firme e veja se respira.',
            'Se NÃO respira, inicie a RCP. No afogamento, se souber, comece com 5 insuflações boca a boca e siga com 30 compressões para 2 insuflações; se não souber, faça só as compressões, sem parar.',
            'Se respira, mas não acorda, vire-a de lado (posição lateral de segurança) e vigie a respiração até chegar o socorro.',
            'Tire-lhe a roupa molhada e cubra-a para a aquecer.',
        ],
        oQueNaoFazer: [
            'NÃO salte para a água para salvar alguém se não tiver formação — muitas pessoas que tentam socorrer também se afogam.',
            'NÃO tente tirar a água dos pulmões apertando a barriga ou virando a pessoa de cabeça para baixo: isso atrasa a RCP e pode provocar vómito.',
            'NÃO dispense a avaliação médica por a pessoa parecer bem.',
        ],
        quandoChamarAjuda: 'Sempre. Mesmo quem saiu da água a sentir-se bem precisa de avaliação se engoliu água, tossiu muito ou ficou sonolento: os problemas respiratórios podem surgir horas depois.'
    },
    {
        id: 'ps_18',
        titulo: 'Vómito e Risco de Aspiração',
        emoji: '🤮',
        situacao: 'Pessoa a vomitar que está sonolenta, inconsciente ou deitada',
        oQueFazer: [
            'Vire a pessoa de lado (posição lateral de segurança), com a cabeça um pouco mais baixa, para o vómito escorrer para fora da boca.',
            'Limpe a boca por fora com um pano; retire de dentro apenas os restos que estiver a ver, com o dedo envolto num pano.',
            'Num bebé, segure-o de lado ao colo, com a cabeça um pouco mais baixa do que o corpo.',
            'Fique ao lado e vigie a respiração até a pessoa estar bem acordada ou chegar o socorro.',
            'Se suspeitar de intoxicação, guarde a embalagem do produto ou do medicamento e ligue para o {{POISON_CONTROL}}.',
        ],
        oQueNaoFazer: [
            'NÃO deixe a pessoa deitada de barriga para cima enquanto vomita ou está sonolenta.',
            'NÃO dê água, comida ou medicamentos a quem está sonolento ou inconsciente.',
            'NÃO provoque o vómito.',
            'NÃO deixe a pessoa sozinha.',
        ],
        quandoChamarAjuda: 'Ligue para o {{EMERGENCY_MEDICAL}} se a pessoa não acordar, tiver dificuldade em respirar ou tosse forte depois de vomitar, vomitar sangue, ou se o vómito surgir depois de uma pancada na cabeça ou de suspeita de intoxicação.'
    },
    {
        id: 'ps_19',
        titulo: 'Incêndio e Inalação de Fumo',
        emoji: '💨',
        situacao: 'Fogo em casa, fumo no ambiente ou pessoa que respirou fumo',
        oQueFazer: [
            'Saia e tire todos de casa de imediato; ligue para os bombeiros ({{FIRE_NUMBER}}) já do lado de fora.',
            'Com fumo, baixe-se e saia a rastejar — rente ao chão é onde o ar é mais limpo; se tiver um pano à mão, molhe-o e tape o nariz e a boca, sem perder tempo à procura.',
            'Antes de abrir uma porta, toque-lhe com as costas da mão: se estiver quente, não a abra e procure outra saída. Feche as portas atrás de si.',
            'Se a roupa pegar fogo: pare, deite-se no chão, tape a cara com as mãos e role até apagar.',
            'Leve quem respirou fumo para o ar livre e mantenha a pessoa sentada e em repouso.',
            'Se a pessoa não respirar, inicie a RCP.',
        ],
        oQueNaoFazer: [
            'NUNCA volte para dentro para ir buscar objetos, documentos, pessoas ou animais — avise os bombeiros de quem ficou lá dentro.',
            'NÃO use o elevador.',
            'NÃO se esconda em armários nem debaixo da cama — ensine isto às crianças antes.',
            'NÃO deite água em fogo de óleo de cozinha nem em equipamento elétrico ligado.',
        ],
        quandoChamarAjuda: 'Ligue para o {{EMERGENCY_MEDICAL}} se quem respirou fumo tiver falta de ar, tosse persistente, rouquidão, fuligem no nariz ou na boca, dor de cabeça, tonturas, náuseas ou confusão — o fumo pode conter monóxido de carbono, que intoxica sem cheiro.'
    },
    {
        id: 'ps_20',
        titulo: 'Atingido por um Raio',
        emoji: '🌩️',
        situacao: 'Pessoa atingida por um raio ou que estava muito perto do local onde ele caiu',
        oQueFazer: [
            'Ligue para o {{EMERGENCY_MEDICAL}} de imediato.',
            'Pode tocar na vítima: o corpo de quem foi atingido NÃO fica com carga elétrica.',
            'Se a trovoada continuar e for possível sem risco para si, leve a vítima para um local abrigado — o raio pode voltar a cair no mesmo sítio.',
            'Veja se a pessoa responde e respira. Se não respirar, inicie a RCP e continue até chegar o socorro.',
            'Com várias vítimas, socorra primeiro quem não se mexe e não respira — quem grita ou se mexe está a respirar.',
            'Se a pessoa respira, deite-a de lado (posição lateral de segurança), mantenha-a aquecida e fique junto dela.',
            'Cubra as queimaduras com um pano limpo ou película aderente, sem apertar.',
        ],
        oQueNaoFazer: [
            'NÃO espere que a vítima "descarregue" para a socorrer — isso é um mito, e cada minuto conta.',
            'NÃO se exponha: se ainda houver raios, abrigue-se com a vítima assim que possível.',
            'NÃO dê nada a beber a quem está confuso ou sonolento.',
            'NÃO dispense a avaliação médica de quem parece bem.',
        ],
        quandoChamarAjuda: 'Ligue SEMPRE para o {{EMERGENCY_MEDICAL}}: mesmo quem parece bem pode ter lesões no coração, nos nervos, nos ouvidos e nos olhos que só surgem mais tarde.'
    }
];
