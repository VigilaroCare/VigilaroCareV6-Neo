export const firePreventionContentPTPT = {
    concepts: {
        title: 'Teoria do Fogo',
        emoji: '🔥',
        sections: [
            {
                title: 'O que é o Fogo?',
                content: 'O fogo é uma reação química de oxidação exotérmica (liberta calor), que gera luz e gases. Para que exista, é necessária a união de quatro elementos essenciais, formando o "Tetraedro do Fogo".'
            },
            {
                title: 'O Tetraedro do Fogo',
                content: 'Antigamente falava-se em triângulo, mas hoje sabemos que são 4 elementos:\n\n1. Combustível: O material que arde (sólido, líquido ou gasoso).\n2. Comburente: O elemento que alimenta o fogo (geralmente o Oxigénio do ar).\n3. Calor: A energia que inicia a reação.\n4. Reação em Cadeia: O processo que torna a combustão autossustentável.\n\nSe retirar QUALQUER um destes 4 elementos, o fogo apaga-se.'
            },
            {
                title: 'Métodos de Propagação',
                content: 'O calor pode espalhar-se de três formas:\n\n• Condução: Transferência de calor através de um corpo sólido, de molécula a molécula. Ex: Uma colher de metal a aquecer na panela.\n\n• Convecção: Movimentação de massas de ar ou líquido aquecidas. O ar quente sobe e o frio desce. É assim que o fogo se espalha para os andares superiores.\n\n• Irradiação: Ondas de calor que viajam pelo espaço, sem necessidade de contacto material. É o calor que sente ao ficar perto de uma fogueira.'
            },
            {
                title: 'Classes de Incêndio',
                content: 'Saber a classe do fogo é vital para escolher o extintor correto. As letras seguem {{FIRE_STANDARD}}:\n\n• {{FIRE_CLASS_SOLIDS}}\n\n• {{FIRE_CLASS_LIQUIDS}}\n\n• {{FIRE_CLASS_GASES}}\n\n• {{FIRE_CLASS_ELECTRICAL}}\n\n• {{FIRE_CLASS_METALS}}\n\n• {{FIRE_CLASS_COOKING}}'
            },
            {
                title: 'Fases do Fogo',
                content: '1. Fase Inicial: O fogo começa pequeno. É o momento ideal para usar um extintor.\n2. Combustão Livre: O fogo cresce, a temperatura sobe rapidamente e o oxigénio é consumido.\n3. Combustão Lenta: O oxigénio diminui, mas o calor é intenso. Cuidado: abrir uma porta agora pode causar uma explosão de fumo (Backdraft).'
            }
        ]
    },
    prevention: {
        title: 'Prevenção em Casa',
        emoji: '🛡️',
        sections: [
            {
                title: 'Cozinha (Área Crítica)',
                content: '• Jamais deixe panelas ao lume sem supervisão.\n• Use um temporizador se precisar de sair.\n• Cabos das panelas virados para dentro.\n• Fogo em óleo? NÃO DEITE ÁGUA. Desligue e abafe com uma tampa.'
            },
            {
                title: 'Elétrica',
                content: '• Evite usar triplas e sobrecargas elétricas.\n• Fios descarnados ou quentes? Chame um eletricista.\n• Desligue os equipamentos da tomada em tempestades.'
            },
            {
                title: 'Inflamáveis',
                content: '• Álcool, gasolina e solventes longe do calor.\n• Armazene em local ventilado.\n• Nunca deite no esgoto (risco de explosão).'
            },
            {
                title: 'Velas e Cigarros',
                content: '• Velas sempre em suporte firme e longe de cortinas.\n• Apague ao sair da divisão.\n• Fumadores: cuidado com o sono e com as beatas.'
            }
        ]
    },
    electricalAppliances: {
        title: 'Eletrodomésticos e Incêndio',
        emoji: '🔌',
        sections: [
            {
                title: '{{COOKING_FIRE_CLASS}} - Cozinha',
                content: 'Incêndios envolvendo óleo e gordura em fritadeiras, grelhadores e assadeiras. NUNCA use água, pois causa uma explosão de vapor e espalha o fogo. O correto é desligar a fonte de calor e abafar com uma tampa ou usar um extintor de {{COOKING_FIRE_CLASS}}.'
            },
            {
                title: 'Equipamentos de Alta Potência',
                content: 'Ar-condicionado, aquecedores, fornos elétricos e micro-ondas exigem muita energia. NUNCA utilize extensões ou triplas para estes aparelhos, pois podem derreter e iniciar um incêndio.'
            },
            {
                title: 'Fontes de Calor',
                content: 'Ferros de engomar, alisadores de cabelo e aquecedores portáteis são causas frequentes de fogo. Nunca os deixe ligados sem supervisão e mantenha-os longe de materiais combustíveis (roupa, cortinas, sofás).'
            }
        ]
    },
    action: {
        title: 'Em Caso de Incêndio',
        emoji: '🚨',
        steps: [
            'SAIA DE CASA DE IMEDIATO. Salvar vidas é a única prioridade.',
            'Se houver fumo no caminho, rasteje. O ar mais limpo e respirável está junto ao chão.',
            'Toque na porta com as costas da mão antes de abrir. Se estiver quente, não abra.',
            'Feche as portas ao passar pelas divisões para ajudar a conter as chamas.',
            'Ligue para os Bombeiros: {{FIRE_NUMBER}}, assim que estiver em local seguro.',
            'NUNCA volte para ir buscar malas, documentos ou telemóveis.',
            'Se a roupa pegar fogo: PARE, DEITE-SE no chão e ROLE de um lado para o outro.',
        ]
    }
};
