export const primeirosSocorrosPTPT = [
    {
        id: 'ps_1',
        titulo: 'Queimaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química ou Elétrica',
        oQueFazer: [
            'Afaste a vítima da fonte de calor.',
            'Arrefeça a área com água corrente (temperatura ambiente) por 15-20 minutos.',
            'Remova acessórios (anéis, relógios) antes que a área inche.',
            'Cubra com um pano limpo e húmido.',
        ],
        oQueNaoFazer: [
            'NUNCA passe pasta de dentes, manteiga, borra de café ou gelo direto.',
            'NÃO rebente as bolhas.',
            'NÃO tente descolar roupas queimadas da pele.',
        ],
        quandoChamarAjuda: 'Se a queimadura for extensa, no rosto, mãos, genitais ou em crianças/idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgamento (Adulto/Criança)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea',
        oQueFazer: [
            'Incentive a tosse se a pessoa conseguir tossir.',
            'Se não emitir som: Inicie a Manobra de Heimlich.',
            'Posicione-se por trás, feche o punho na boca do estômago.',
            'Faça compressões fortes para dentro e para cima (formato de J).',
        ],
        oQueNaoFazer: [
            'Não dê palmadas nas costas se a pessoa estiver de pé (pode agravar).',
            'Não ofereça água.',
        ],
        quandoChamarAjuda: 'Se a pessoa perder a consciência (iniciar SBV) ou não desengasgar.'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgamento (Bebé)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes',
        oQueFazer: [
            'Apoie o bebé de barriga para baixo no seu antebraço, cabeça mais baixa que o corpo.',
            'Dê 5 pancadas firmes nas costas (entre as omoplatas).',
            'Vire de barriga para cima e faça 5 compressões no peito com dois dedos.',
            'Repita até desengasgar.',
        ],
        oQueNaoFazer: [
            'Não sacuda o bebé.',
            'Não tente retirar o objeto com o dedo às cegas.',
        ],
        quandoChamarAjuda: 'Se o bebé ficar roxo ou perder a consciência.'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Hemorragias',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lave com água e sabão neutro.',
            'Comprima o local com um pano limpo fazendo pressão direta por 5-10 min.',
            'Mantenha o membro elevado, se possível.',
        ],
        oQueNaoFazer: [
            'Não faça garrote (exceto em amputação ou risco de vida extremo).',
            'Não coloque pó de café ou açúcar.',
        ],
        quandoChamarAjuda: 'Se a hemorragia não parar, for profunda, ou precisar de pontos.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contacto com corrente elétrica',
        oQueFazer: [
            'Desligue a fonte de energia (quadro elétrico) IMEDIATAMENTE.',
            'Se não puder desligar, afaste a vítima usando um objeto NÃO condutor (cabo de vassoura seco, madeira).',
            'Verifique a respiração e o pulso.',
        ],
        oQueNaoFazer: [
            'NUNCA toque na vítima se ela ainda estiver ligada à corrente.',
        ],
        quandoChamarAjuda: 'SEMPRE chame o 112. Choques podem causar arritmias tardias.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identifique o produto ingerido.',
            'Ligue para o Centro de Informação Antivenenos (CIAV): 800 250 250.',
            'Siga as instruções do atendedor.',
        ],
        oQueNaoFazer: [
            'NÃO provoque o vómito (pode queimar o esófago novamente).',
            'Não dê leite ou água sem orientação.',
        ],
        quandoChamarAjuda: 'Imediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Quedas e Fraturas',
        emoji: '🤕',
        situacao: 'Queda de altura ou impacto forte',
        oQueFazer: [
            'Mantenha a vítima imóvel, especialmente se houver dor nas costas ou pescoço.',
            'Aplique gelo no local do impacto (com pano, não direto na pele).',
            'Se houver hemorragia, faça compressão.',
        ],
        oQueNaoFazer: [
            'NÃO tente colocar o osso no lugar.',
            'NÃO mova a vítima se suspeitar de lesão na coluna.',
        ],
        quandoChamarAjuda: 'Se houver deformidade, dor intensa, impossibilidade de movimento ou desmaio.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craniano',
        emoji: '🧠',
        situacao: 'Pancada forte na cabeça',
        oQueFazer: [
            'Observe a vítima nas próximas 24 horas.',
            'Mantenha a pessoa acordada se estiver sonolenta logo após a pancada.',
            'Aplique compressa fria para reduzir o inchaço.',
        ],
        oQueNaoFazer: [
            'Não ignore sintomas como vómito ou confusão mental.',
            'Não dê medicamentos para dormir.',
        ],
        quandoChamarAjuda: 'Vómitos, desmaio, sangue pelo nariz/ouvido, pupilas de tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vómitos e diarreia após comer',
        oQueFazer: [
            'Hidrate-se com soro oral ou água em pequenos goles.',
            'Faça repouso.',
            'Mantenha uma dieta leve (sem gordura/leite) quando a fome voltar.',
        ],
        oQueNaoFazer: [
            'Não tome medicamentos para "prender" o intestino (a toxina precisa sair).',
            'Não force a alimentação se estiver a vomitar.',
        ],
        quandoChamarAjuda: 'Sinais de desidratação (boca seca, sem urina), sangue nas fezes ou febre alta.'
    },
    {
        id: 'ps_10',
        titulo: 'Corpos Estranhos',
        emoji: '👁️',
        situacao: 'Objeto no olho, nariz ou ouvido',
        oQueFazer: [
            'Olhos: Lave com soro fisiológico ou água corrente abundante.',
            'Nariz/Ouvido: Se estiver visível e fácil, tente retirar com pinça (CUIDADO).',
            'Melhor opção: Procure atendimento médico.',
        ],
        oQueNaoFazer: [
            'NÃO esfregue os olhos (pode arranhar a córnea).',
            'NÃO use cotonete para empurrar objetos no ouvido.',
            'NÃO tente retirar objetos profundos.',
        ],
        quandoChamarAjuda: 'Sempre que não sair facilmente com lavagem ou se houver dor/visão turva.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordeduras de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lave o ferimento com água e sabão por 5-10 minutos.',
            'Comprima para estancar a hemorragia.',
            'Procure atendimento para avaliar vacina antirrábica/tétano.',
        ],
        oQueNaoFazer: [
            'Não feche o ferimento com pontos em casa.',
            'Não ignore mordeduras pequenas (risco alto de infeção).',
        ],
        quandoChamarAjuda: 'Sempre, para protocolo de vacinação e limpeza profunda.'
    },
    {
        id: 'ps_12',
        titulo: 'Mal Súbito',
        emoji: '😵',
        situacao: 'Tontura, fraqueza, palidez ou dor no peito',
        oQueFazer: [
            'Sente ou deite a vítima em local ventilado.',
            'Desaperte roupas apertadas (gola, cinto).',
            'Pergunte se ela toma alguma medicação e se já sentiu isto antes.',
        ],
        oQueNaoFazer: [
            'NÃO dê água ou comida se a pessoa estiver confusa.',
            'NÃO deixe a vítima sozinha.',
        ],
        quandoChamarAjuda: 'Se os sintomas não passarem em poucos minutos ou se houver dor no peito intensa.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmaio (Síncope)',
        emoji: '💤',
        situacao: 'Perda súbita e breve da consciência',
        oQueFazer: [
            'Deite a pessoa de barriga para cima.',
            'Eleve as pernas (acima do nível do coração) para facilitar o retorno do sangue.',
            'Monitorize a respiração.',
        ],
        oQueNaoFazer: [
            'NÃO atire água para o rosto.',
            'NÃO ofereça álcool ou amónia para cheirar.',
            'NÃO tente levantar a pessoa rapidamente.',
        ],
        quandoChamarAjuda: 'Se a pessoa não acordar em 1-2 minutos ou se caiu e bateu com a cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, perda de consciência, salivação',
        oQueFazer: [
            'Proteja a cabeça (coloque uma almofada ou casaco por baixo).',
            'Afaste objetos perigosos em redor.',
            'Cronometre o tempo da crise.',
            'Ao terminar, vire a pessoa de lado (posição lateral de segurança).',
        ],
        oQueNaoFazer: [
            'NUNCA segure a língua ou coloque a mão na boca da vítima.',
            'NÃO tente conter os movimentos à força.',
            'NÃO dê água ou medicamentos durante a crise.',
        ],
        quandoChamarAjuda: 'Se a crise durar mais de 5 minutos, se for a primeira vez, ou se uma crise vier seguida de outra.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Acidente Vascular Cerebral)',
        emoji: '🥴',
        situacao: 'Boca torta, fala arrastada, perda de força',
        oQueFazer: [
            'Faça o teste: Face (torta?), Força (perda num braço?), Fala (arrastada?), Tempo (ligue 112).',
            'Anote a hora exata do início dos sintomas.',
            'Mantenha a vítima em repouso absoluto.',
        ],
        oQueNaoFazer: [
            'NÃO espere que os sintomas passem.',
            'NÃO dê aspirina ou qualquer medicamento.',
        ],
        quandoChamarAjuda: 'IMEDIATAMENTE (112). Tempo é cérebro.'
    },
    {
        id: 'ps_16',
        titulo: 'Paragem Cardiorrespiratória',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligue 112 e peça um DAE (Desfibrilhador) se houver.',
            'Inicie o SBV (Suporte Básico de Vida) IMEDIATAMENTE.',
            'Comprima o centro do peito com força e rapidez (100-120 por minuto).',
            'Permita o retorno total do tórax após cada compressão.',
        ],
        oQueNaoFazer: [
            'NÃO pare as compressões até o socorro chegar ou a vítima reagir.',
            'NÃO tenha medo de fraturar costelas (é preferível à morte).',
        ],
        quandoChamarAjuda: 'IMEDIATAMENTE.'
    }
];
