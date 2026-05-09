export const primeirosSocorrosPTBR = [
    {
        id: 'ps_1',
        titulo: 'Queimaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química ou Elétrica',
        oQueFazer: [
            'Afaste a vítima da fonte de calor.',
            'Resfrie a área com água corrente (temperatura ambiente) por 15-20 minutos.',
            'Remova acessórios (anéis, relógios) antes que a área inche.',
            'Cubra com pano limpo e úmido.',
        ],
        oQueNaoFazer: [
            'NUNCA passe pasta de dente, manteiga, pó de café ou gelo direto.',
            'NÃO estoure bolhas.',
            'NÃO tente desgrudar roupas queimadas da pele.',
        ],
        quandoChamarAjuda: 'Se a queimadura for extensa, no rosto, mãos, genitais ou em crianças/idosos.'
    },
    {
        id: 'ps_2',
        titulo: 'Engasgo (Adulto/Criança)',
        emoji: '🤢',
        situacao: 'Obstrução da via aérea',
        oQueFazer: [
            'Incentive a tosse se a pessoa conseguir tossir.',
            'Se não emitir som: Inicie a Manobra de Heimlich.',
            'Posicione-se atrás, feche o punho na boca do estômago.',
            'Faça compressões fortes para dentro e para cima (formato de J).',
        ],
        oQueNaoFazer: [
            'Não dê tapas nas costas se a pessoa estiver em pé (pode piorar).',
            'Não ofereça água.',
        ],
        quandoChamarAjuda: 'Se a pessoa perder a consciência (iniciar RCP) ou não desengasgar.'
    },
    {
        id: 'ps_3',
        titulo: 'Engasgo (Bebê)',
        emoji: '👶',
        situacao: 'Obstrução em lactentes',
        oQueFazer: [
            'Apoie o bebê de bruços no seu antebraço, cabeça mais baixa que o corpo.',
            'Dê 5 tapas firmes nas costas (entre as escápulas).',
            'Vire de barriga para cima e faça 5 compressões no peito com dois dedos.',
            'Repita até desengasgar.',
        ],
        oQueNaoFazer: [
            'Não sacuda o bebê.',
            'Não tente retirar o objeto com o dedo às cegas.',
        ],
        quandoChamarAjuda: 'Se o bebê ficar roxo ou perder a consciência.'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes e Sangramentos',
        emoji: '🩸',
        situacao: 'Ferimentos abertos',
        oQueFazer: [
            'Lave com água e sabão neutro.',
            'Comprima o local com um pano limpo fazendo pressão direta por 5-10 min.',
            'Mantenha o membro elevado se possível.',
        ],
        oQueNaoFazer: [
            'Não faça torniquete (exceto em amputação ou risco de vida extremo).',
            'Não coloque pó de café ou açúcar.',
        ],
        quandoChamarAjuda: 'Se o sangramento não parar, for profundo, ou precisar de pontos.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Elétrico',
        emoji: '⚡',
        situacao: 'Contato com corrente elétrica',
        oQueFazer: [
            'Desligue a fonte de energia (disjuntor) IMEDIATAMENTE.',
            'Se não puder desligar, afaste a vítima usando objeto NÃO condutor (cabo de vassoura seco, madeira).',
            'Verifique respiração e pulso.',
        ],
        oQueNaoFazer: [
            'NUNCA toque na vítima se ela ainda estiver ligada à corrente.',
        ],
        quandoChamarAjuda: 'SEMPRE chame o 192. Choques podem causar arritmias tardias.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicação',
        emoji: '☠️',
        situacao: 'Ingestão de veneno/químicos',
        oQueFazer: [
            'Identifique o produto ingerido.',
            'Ligue para o CIATOX: 0800 722 6001.',
            'Siga as instruções do atendente.',
        ],
        oQueNaoFazer: [
            'NÃO provoque vômito (pode queimar o esôfago novamente).',
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
            'Se houver sangramento, faça compressão.',
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
        situacao: 'Batida forte na cabeça',
        oQueFazer: [
            'Observe a vítima nas próximas 24 horas.',
            'Mantenha a pessoa acordada se estiver sonolenta logo após a batida.',
            'Aplique compressa fria para reduzir o inchaço.',
        ],
        oQueNaoFazer: [
            'Não ignore sintomas como vômito ou confusão mental.',
            'Não dê medicamentos para dormir.',
        ],
        quandoChamarAjuda: 'Vômitos, desmaio, sangramento pelo nariz/ouvido, pupilas de tamanhos diferentes.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicação Alimentar',
        emoji: '🤢',
        situacao: 'Vômitos e diarreia após comer',
        oQueFazer: [
            'Hidrate-se com soro caseiro ou água de coco em pequenos goles.',
            'Faça repouso.',
            'Mantenha dieta leve (sem gordura/leite) quando a fome voltar.',
        ],
        oQueNaoFazer: [
            'Não tome remédios para "prender" o intestino (a toxina precisa sair).',
            'Não force alimentação se estiver vomitando.',
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
        titulo: 'Mordidas de Animais',
        emoji: '🐕',
        situacao: 'Cão, gato ou outros',
        oQueFazer: [
            'Lave o ferimento com água e sabão por 5-10 minutos.',
            'Comprima para estancar sangramento.',
            'Procure atendimento para avaliar vacina antirrábica/tétano.',
        ],
        oQueNaoFazer: [
            'Não feche o ferimento com pontos em casa.',
            'Não ignore mordidas pequenas (risco alto de infecção).',
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
            'Afrouxe roupas apertadas (gola, cinto).',
            'Pergunte se ela toma algum remédio e se já sentiu isso antes.',
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
            'Monitore a respiração.',
        ],
        oQueNaoFazer: [
            'NÃO jogue água no rosto.',
            'NÃO ofereça álcool ou amônia para cheirar.',
            'NÃO tente levantar a pessoa rapidamente.',
        ],
        quandoChamarAjuda: 'Se a pessoa não acordar em 1-2 minutos ou se caiu e bateu a cabeça.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsão',
        emoji: '🧠',
        situacao: 'Abalos musculares, perda de consciência, salivação',
        oQueFazer: [
            'Proteja a cabeça (coloque uma almofada ou casaco embaixo).',
            'Afaste objetos perigosos ao redor.',
            'Cronometre o tempo da crise.',
            'Ao terminar, vire a pessoa de lado (posição de recuperação).',
        ],
        oQueNaoFazer: [
            'NUNCA segure a língua ou coloque a mão na boca da vítima.',
            'NÃO tente conter os movimentos à força.',
            'NÃO dê água ou remédios durante a crise.',
        ],
        quandoChamarAjuda: 'Se a crise durar mais de 5 minutos, se for a primeira vez, ou se uma crise vier seguida de outra.'
    },
    {
        id: 'ps_15',
        titulo: 'AVC (Derrame)',
        emoji: '🥴',
        situacao: 'Boca torta, fala enrolada, perda de força',
        oQueFazer: [
            'Faça o teste SAMU: Sorria (boca torta?), Abrace (perda de força?), Música (fala enrolada?), Urgente (ligue 192).',
            'Anote a hora exata do início dos sintomas.',
            'Mantenha a vítima em repouso absoluto.',
        ],
        oQueNaoFazer: [
            'NÃO espere os sintomas passarem.',
            'NÃO dê aspirina ou qualquer remédio (pode piorar se for hemorrágico).',
        ],
        quandoChamarAjuda: 'IMEDIATAMENTE (192). Tempo é cérebro.'
    },
    {
        id: 'ps_16',
        titulo: 'Parada Cardíaca',
        emoji: '💔',
        situacao: 'Vítima inconsciente e SEM respiração',
        oQueFazer: [
            'Ligue 192 e peça um DEA (Desfibrilador) se houver.',
            'Inicie a RCP (Massagem Cardíaca) IMEDIATAMENTE.',
            'Comprima o centro do peito com força e rapidez (100-120 por minuto).',
            'Permita o retorno total do tórax após cada compressão.',
        ],
        oQueNaoFazer: [
            'NÃO pare a massagem até o socorro chegar ou a vítima reagir.',
            'NÃO tenha medo de quebrar costelas (é melhor que a morte).',
        ],
        quandoChamarAjuda: 'IMEDIATAMENTE.'
    }
];
