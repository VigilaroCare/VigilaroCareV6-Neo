export const utensiliosDomesticos = [
    {
        id: 'ut_1',
        nome: 'Facas e Cortantes',
        categoria: 'Cozinha',
        emoji: '🔪',
        risco: 'Cortes Graves',
        descricao: 'Facas afiadas, tesouras e lâminas são causas frequentes de acidentes domésticos.',
        prevencao: [
            'Manter facas afiadas (facas cegas exigem mais força e escapam).',
            'Guardar em suportes ou gavetas com trava, longe de crianças.',
            'Nunca deixar facas dentro da pia com água e sabão (invisíveis).',
            'Cortar sempre apoiando na tábua, nunca na mão.',
        ],
        primeirosSocorros: 'Lavar com água e sabão. Comprimir o local com pano limpo. Se profundo, procurar sutura.'
    },
    {
        id: 'ut_2',
        nome: 'Panelas e Fogão',
        categoria: 'Cozinha',
        emoji: '🍳',
        risco: 'Queimaduras Térmicas',
        descricao: 'Cabos de panelas para fora e panelas pesadas são riscos de tombamento e queimadura.',
        prevencao: [
            'Sempre virar os cabos das panelas para o centro do fogão.',
            'Usar as bocas de trás do fogão quando houver crianças por perto.',
            'Verificar a fixação dos cabos (parafusos soltos).',
            'Cuidado com vapor ao abrir tampas.',
        ],
        primeirosSocorros: 'Resfriar a queimadura com água corrente por 10-15 min. Não passar pomadas caseiras.'
    },
    {
        id: 'ut_3',
        nome: 'Vidros e Louças',
        categoria: 'Geral',
        emoji: '🍷',
        risco: 'Cortes e Perfurações',
        descricao: 'Quebra por choque térmico ou impacto. Cacos de vidro são extremamente perigosos.',
        prevencao: [
            'Evitar choque térmico (vidro quente em superfície fria).',
            'Descartar louças lascadas ou trincadas (podem quebrar no uso).',
            'Se quebrar: usar luvas e pá. Passar pano úmido para recolher micro-cacos.',
            'Descarte: embrulhar em jornal/papelão e identificar "VIDRO QUEBRADO".',
        ],
        primeirosSocorros: 'Lavar ferimento. Remover fragmentos visíveis com pinça limpa. Cobrir e pressionar.'
    },
    {
        id: 'ut_4',
        nome: 'Plásticos e Potes',
        categoria: 'Cozinha',
        emoji: '🥡',
        risco: 'Contaminação Química',
        descricao: 'Alguns plásticos liberam substâncias tóxicas (BPA) quando aquecidos.',
        prevencao: [
            'Verificar se o pote é "BPA Free" antes de usar no micro-ondas.',
            'Não aquecer alimentos em potes de sorvete ou margarina (não são próprios).',
            'Descartar potes muito riscados ou manchados (acumulam bactérias).',
        ],
        primeirosSocorros: 'Em caso de ingestão de pedaço de plástico, observar. Se dor/engasgo, procurar médico.'
    },
    {
        id: 'ut_5',
        nome: 'Panela de Pressão',
        categoria: 'Cozinha',
        emoji: '🥘',
        risco: 'Explosão',
        descricao: 'Mal uso ou falta de manutenção pode causar explosões graves.',
        prevencao: [
            'Limpar a válvula de escape a cada uso (desentupir).',
            'Trocar a borracha de vedação regularmente (se estiver rígida).',
            'Nunca abrir antes de sair toda a pressão.',
            'Não encher mais que 2/3 da capacidade.',
        ],
        primeirosSocorros: 'Em caso de explosão/queimadura extensa: SAMU 192. Resfriar área com água.'
    },
    {
        id: 'ut_6',
        nome: 'Eletrodomésticos (Liquidificador/Mixer)',
        categoria: 'Eletro',
        emoji: 'blender', // Ionicons name mapping might be needed or use emoji text
        risco: 'Cortes e Choque',
        descricao: 'Lâminas afiadas e risco elétrico.',
        prevencao: [
            'Só limpar com o aparelho fora da tomada.',
            'Nunca colocar a mão no copo com ele na base (mesmo desligado).',
            'Cuidado com fios pendurados (crianças podem puxar).',
        ],
        primeirosSocorros: 'Desligar energia se houver choque. Tratar cortes conforme gravidade.'
    }
];
