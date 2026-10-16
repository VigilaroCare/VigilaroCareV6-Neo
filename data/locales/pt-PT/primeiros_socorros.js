export const primeirosSocorrosPTPT = [
    {
        id: 'ps_1',
        titulo: 'Queimaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química ou Elétrica',
        oQueFazer: [
            'Afastar a pessoa do fogo ou da fonte de calor.',
            'Arrefecer o local com água corrente à temperatura ambiente durante 15 a 20 minutos.',
            'Retirar anéis, pulseiras e relógios antes que a zona comece a inchar.',
            'Cobrir a ferida com cuidado com um pano limpo e húmido.',
        ],
        oQueNaoFazer: [
            'NUNCA aplicar pomadas, pasta de dentes, manteiga, café moído ou gelo diretamente sobre a queimadura.',
            'NÃO rebentar as bolhas que se formarem.',
            'NÃO tentar arrancar pedaços de roupa colados à pele queimada.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se a queimadura for maior do que a palma da mão, atingir a cara, as mãos ou os genitais, ou ocorrer em crianças e idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgamento (Adulto e Criança acima de 1 ano)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea — protocolo AHA 2025',
        oQueFazer: [
            'Incentivar a tosse se a pessoa conseguir tossir com força (a tosse é a manobra mais eficaz na obstrução parcial).',
            'Pedir a alguém para ligar para o {{EMERGENCY_MEDICAL}} e iniciar as manobras se a pessoa não conseguir tossir, falar nem respirar (obstrução total).',
            'Posicionar-se atrás da vítima, inclinar-lhe o tronco ligeiramente para a frente e aplicar 5 pancadas firmes nas costas, entre as omoplatas, com a base da mão.',
            'Se o objeto não sair, aplicar 5 compressões abdominais (manobra de Heimlich): colocar o punho fechado logo acima do umbigo, cobri-lo com a outra mão e puxar para dentro e para cima em \'J\'.',
            'Alternar continuamente 5 pancadas nas costas com 5 compressões abdominais até o objeto ser expelido ou a pessoa perder a consciência.',
            'Em grávidas, ou em pessoas obesas quando não for possível abraçar o abdómen, substituir as compressões abdominais por 5 compressões no centro do peito.',
        ],
        oQueNaoFazer: [
            'NÃO oferecer água nem comida (a via aérea está obstruída).',
            'NÃO meter os dedos na boca às cegas para tentar retirar o objeto (risco de o empurrar mais para dentro).',
            'NÃO interromper os ciclos de 5 pancadas e 5 compressões para procurar o objeto, a menos que seja visível ou haja desmaio.',
        ],
        quandoChamarAjuda: 'Ligar para o {{EMERGENCY_MEDICAL}} assim que identificar obstrução total. Se a vítima perder a consciência, deitá-la no chão e iniciar de imediato o SBV com compressões torácicas.'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgamento (Bebé com menos de 1 ano)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes — protocolo AHA 2025',
        oQueFazer: [
            'Apoiar o bebé de barriga para baixo sobre o antebraço, com a cabeça mais baixa do que o tronco, segurando firmemente o queixo e a mandíbula sem apertar o pescoço.',
            'Aplicar 5 pancadas firmes nas costas, entre as omoplatas, com a base da palma da mão.',
            'Virar o bebé de barriga para cima sobre o antebraço e aplicar 5 compressões no centro do peito com a base da palma de uma das mãos.',
            'Alternar ciclos de 5 pancadas nas costas e 5 compressões no peito até o objeto ser expelido ou o bebé perder a consciência.',
        ],
        oQueNaoFazer: [
            'NUNCA fazer compressões abdominais (Heimlich) em bebés com menos de 1 ano (risco de lesão grave em órgãos internos como o fígado e o baço).',
            'NUNCA sacudir o bebé.',
            'NÃO meter os dedos na boca do bebé às cegas se o objeto ou alimento não estiver visível na cavidade oral.',
        ],
        quandoChamarAjuda: 'Ligar para o {{EMERGENCY_MEDICAL}} assim que notar ausência de choro, tosse ou respiração. Se o bebé desmaiar, iniciar o SBV pediátrico (30 compressões para 2 insuflações).'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Hemorragias',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lavar o corte com cuidado com soro fisiológico ou água e sabão neutro.',
            'Pressionar o local com firmeza com um pano limpo durante 5 a 10 minutos sem interromper.',
            'Manter o membro afetado (braço ou perna) elevado para diminuir a pressão e o fluxo de sangue.',
        ],
        oQueNaoFazer: [
            'NÃO fazer garrotes (usar apenas em amputações ou hemorragias arteriais gravíssimas que não param com pressão).',
            'NÃO aplicar café moído, açúcar ou pomadas no corte.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se a hemorragia não parar após 10 minutos de pressão direta, se o corte for muito profundo ou se os bordos ficarem abertos.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contacto com corrente elétrica',
        oQueFazer: [
            'Desligar o disjuntor geral no quadro elétrico IMEDIATAMENTE.',
            'Afastar a pessoa da fonte elétrica com um objeto de madeira ou plástico seco (como um cabo de vassoura seco), caso não seja possível cortar a corrente.',
            'Verificar se a pessoa respira e tem batimentos cardíacos depois de afastada da fonte elétrica.',
        ],
        oQueNaoFazer: [
            'NUNCA tocar na pessoa se ela ainda estiver em contacto com a corrente elétrica.',
        ],
        quandoChamarAjuda: 'Chamar SEMPRE o {{EMERGENCY_MEDICAL}}, pois a corrente elétrica pode provocar arritmias cardíacas tardias.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identificar de imediato que produto ou medicamento a pessoa engoliu.',
            'Ligar de imediato para o centro de informação antivenenos: {{POISON_CONTROL}}.',
            'Seguir rigorosamente as orientações do profissional de saúde que atender.',
        ],
        oQueNaoFazer: [
            'NÃO provocar o vómito, a menos que o centro antivenenos o indique (os produtos corrosivos queimam o esófago à ida e à volta).',
            'NÃO dar leite, água ou remédios caseiros sem indicação médica prévia.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Quedas e Fraturas',
        emoji: '🤕',
        situacao: 'Queda de altura ou impacto forte',
        oQueFazer: [
            'Manter a pessoa deitada e imóvel, sobretudo se houver dor nas costas ou no pescoço.',
            'Aplicar um saco de gelo envolto numa toalha sobre o local dorido.',
            'Pressionar suavemente com um pano limpo se houver ferida a sangrar.',
        ],
        oQueNaoFazer: [
            'NÃO tentar alinhar ou recolocar o osso no lugar.',
            'NÃO mover nem levantar a pessoa se houver suspeita de lesão na coluna.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se houver deformidade visível no osso, dor muito forte, incapacidade de mexer o membro ou desmaio.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craniano',
        emoji: '🧠',
        situacao: 'Pancada forte na cabeça',
        oQueFazer: [
            'Observar a pessoa com atenção nas 24 horas seguintes.',
            'Manter a pessoa acordada e a conversar durante algum tempo após o impacto.',
            'Aplicar uma compressa fria no local para conter o inchaço.',
        ],
        oQueNaoFazer: [
            'NÃO ignorar sintomas como vómitos, tonturas ou falhas de memória.',
            'NÃO dar analgésicos fortes ou sedativos sem indicação médica.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se a pessoa vomitar, desmaiar, sangrar pelo nariz ou pelos ouvidos, ou se as pupilas ficarem de tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vómitos e diarreia após comer',
        oQueFazer: [
            'Beber solução de reidratação oral ou água de coco em pequenos goles ao longo do dia.',
            'Ficar em repouso.',
            'Comer alimentos leves e sem gordura (como arroz branco, batata e torradas) quando o apetite voltar.',
        ],
        oQueNaoFazer: [
            'NÃO tomar medicamentos para \'prender\' o intestino (as toxinas precisam de ser eliminadas pelo corpo).',
            'NÃO forçar a alimentação se houver náuseas fortes.',
        ],
        quandoChamarAjuda: 'Pedir ajuda ao notar sinais de desidratação (boca seca, ausência de lágrimas ou de urina durante horas), febre alta ou sangue nas fezes.'
    },
    {
        id: 'ps_10',
        titulo: 'Corpos Estranhos',
        emoji: '👁️',
        situacao: 'Objeto no olho, nariz ou ouvido',
        oQueFazer: [
            'Olhos: lavar com bastante soro fisiológico ou água morna corrente.',
            'Nariz/ouvido: tentar retirar com cuidado com uma pinça apenas se o objeto estiver visível e à entrada.',
            'Dirigir-se às urgências se o objeto estiver profundo ou for difícil de retirar.',
        ],
        oQueNaoFazer: [
            'NÃO esfregar os olhos (risco de lesão na córnea por atrito).',
            'NÃO introduzir cotonetes ou objetos pontiagudos no ouvido (risco de empurrar o objeto ou perfurar o tímpano).',
        ],
        quandoChamarAjuda: 'Pedir ajuda sempre que o objeto não saia com facilidade na primeira lavagem suave ou se houver dor e visão turva.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordeduras de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lavar bem a ferida com água corrente e sabão neutro durante 10 minutos.',
            'Pressionar com um pano limpo se houver hemorragia.',
            'Dirigir-se às urgências para uma limpeza profunda e avaliação da necessidade de vacina contra a raiva e o tétano.',
        ],
        oQueNaoFazer: [
            'NÃO tentar coser ou fechar a ferida em casa.',
            'NÃO ignorar mordeduras pequenas (a saliva do animal tem bactérias que provocam infeções rápidas).',
        ],
        quandoChamarAjuda: 'Pedir ajuda em qualquer mordedura que provoque ferida na pele, para avaliação e protocolo de vacinação preventiva.'
    },
    {
        id: 'ps_12',
        titulo: 'Mal Súbito',
        emoji: '😵',
        situacao: 'Tontura, fraqueza, palidez ou dor no peito',
        oQueFazer: [
            'Ajudar a pessoa a sentar-se ou deitar-se num local fresco e arejado.',
            'Desapertar a roupa justa, como colarinhos e cintos.',
            'Perguntar por problemas de saúde conhecidos e medicação habitual.',
        ],
        oQueNaoFazer: [
            'NÃO dar água nem comida se a pessoa estiver confusa ou desorientada.',
            'NÃO deixar a pessoa sozinha.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se a pessoa não melhorar em 2 minutos, desmaiar ou referir dor forte ou aperto no peito.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmaio (Síncope)',
        emoji: '💤',
        situacao: 'Perda súbita e breve da consciência',
        oQueFazer: [
            'Deitar a pessoa de barriga para cima.',
            'Elevar as pernas cerca de 30 cm do chão para favorecer o retorno venoso e a circulação cerebral.',
            'Observar a respiração continuamente.',
        ],
        oQueNaoFazer: [
            'NÃO atirar água fria à cara da pessoa.',
            'NÃO dar a cheirar álcool, perfume ou qualquer outra substância.',
            'NÃO tentar levantar a pessoa à pressa assim que recuperar a consciência.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se a pessoa demorar mais de 2 minutos a acordar ou se tiver sofrido uma queda grave com traumatismo na cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, perda de consciência, salivação',
        oQueFazer: [
            'Proteger a cabeça da pessoa colocando por baixo um casaco dobrado ou uma almofada.',
            'Afastar cadeiras ou objetos duros para evitar traumatismos durante os movimentos.',
            'Cronometrar a duração da crise. Se durar mais de 3 minutos, já requer maior atenção.',
            'Virar a pessoa de lado (posição lateral de segurança) assim que a crise passar.',
        ],
        oQueNaoFazer: [
            'NUNCA tentar segurar a língua da pessoa nem colocar objetos ou dedos na boca dela.',
            'NÃO conter com força os movimentos dos braços e das pernas.',
            'NÃO dar água nem medicamentos enquanto houver convulsão.',
        ],
        quandoChamarAjuda: 'Pedir ajuda se a crise durar mais de 5 minutos, se for o primeiro episódio ou se houver crises seguidas.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Acidente Vascular Cerebral)',
        emoji: '🥴',
        situacao: 'Boca torta, fala arrastada, perda de força',
        oQueFazer: [
            'Fazer o teste dos 3F: Face (pedir para sorrir — a boca descai?), Força (pedir para levantar os dois braços — um cai?), Fala (está arrastada?). Se houver algum sinal, é urgente.',
            'Registar a hora exata em que os sintomas começaram.',
            'Ligar de imediato para o {{EMERGENCY_MEDICAL}}.',
        ],
        oQueNaoFazer: [
            'NÃO esperar que os sintomas melhorem sozinhos.',
            'NÃO dar medicamentos (como aspirina ou calmantes) antes da avaliação médica.',
        ],
        quandoChamarAjuda: 'Ligar para o {{EMERGENCY_MEDICAL}} assim que identificar qualquer sinal do teste dos 3F. O tempo é vital para evitar sequelas.'
    },
    {
        id: 'ps_16',
        titulo: 'Paragem Cardiorrespiratória',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligar de imediato para o {{EMERGENCY_MEDICAL}} e pedir um Desfibrilhador Automático Externo (DAE), se houver um disponível no local.',
            'Iniciar as compressões torácicas (SBV) sem perder tempo.',
            'Entrelaçar as mãos, posicionar a base da palma no centro do peito da vítima (sobre o esterno) e comprimir com força e rapidez (100 a 120 compressões por minuto, com cerca de 5 a 6 cm de profundidade).',
            'Permitir que o tórax volte totalmente à posição após cada compressão, sem retirar as mãos.',
        ],
        oQueNaoFazer: [
            'NÃO interromper as compressões torácicas até a equipa do {{EMERGENCY_MEDICAL}} assumir, o DAE indicar para se afastar ou a vítima voltar a respirar normalmente.',
            'NÃO recear fraturar uma costela — manter o fluxo de sangue para o cérebro e o coração é a prioridade absoluta.',
        ],
        quandoChamarAjuda: 'IMEDIATAMENTE.'
    }
];
