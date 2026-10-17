export const emergenciasPetsPTPT = [
    {
        id: 'engasgo_pet',
        titulo: 'Engasgamento (Animal)',
        descricao: 'Animal agitado, a tentar tossir ou sem conseguir respirar.',
        icon: 'paw',
        cor: '#D32F2F', // Vermelho
        corFundo: '#FFEBEE',
        frequencia: 'Comum',
        passos: [
            { titulo: 'Abrir a boca com cuidado', descricao: 'Puxar a língua do animal para o lado e verificar se há um objeto visível (cuidado com as mordidas reflexas).', critico: true },
            { titulo: 'Retirar o objeto SÓ se estiver fácil e visível na cavidade oral', descricao: 'NÃO tentar puxar com os dedos ou com uma pinça se o objeto estiver profundo, para não o empurrar.' },
            { titulo: 'Manobra de Heimlich (Grande)', descricao: 'Posicionar-se atrás do cão, abraçar-lhe a cintura com os punhos logo abaixo das costelas e pressionar com firmeza para cima e para a frente.', critico: true },
            { titulo: 'Heimlich (Pequenos)', descricao: 'Manobra específica para cães pequenos e gatos: deitar o animal de lado e pressionar o abdómen logo abaixo das costelas com as pontas dos dedos, com força controlada.', critico: true },
            { titulo: 'Pancadas nas costas', descricao: 'Aplicar pancadas firmes entre as omoplatas com a palma da mão (indicado apenas para gatos e cães pequenos).' },
        ],
        alertas: [
            'Cuidado para não sofrer mordidas ou arranhões: os animais engasgados entram em pânico e reagem por instinto.',
            'Ligar para o veterinário e avisar que está a caminho.',
        ],
    },
    {
        id: 'atropelamento_pet',
        titulo: 'Atropelamento / Trauma',
        descricao: 'Pancadas fortes, dor intensa ou dificuldade em mexer-se.',
        icon: 'bandage',
        cor: '#F57C00', // Laranja
        corFundo: '#FFF3E0',
        frequencia: 'Grave',
        passos: [
            { titulo: 'Mover para um local seguro', descricao: 'Retirar o animal da via com muito cuidado, usando um lençol ou cobertor esticado como maca para proteger a coluna.', critico: true },
            { titulo: 'NÃO o deixar andar', descricao: 'Manter o animal deitado mesmo que pareça bem e queira correr (as pancadas podem causar hemorragia interna silenciosa).' },
            { titulo: 'Sinalizar a zona', descricao: 'Garantir a segurança do local onde parou para socorrer contra novos acidentes.' },
            { titulo: 'Conter as hemorragias', descricao: 'Pressionar as feridas a sangrar com um pano limpo ou uma compressa.' },
            { titulo: 'Veterinário IMEDIATO', descricao: 'Levar o animal de imediato ao hospital veterinário para atendimento, exames de imagem e suporte.', critico: true },
        ],
        alertas: [
            'Os animais com dor forte mordem por instinto: improvisar um açaime leve (apenas se não houver risco de vómito).',
            'Manter o corpo do animal quente durante o trajeto.',
        ],
    },
    {
        id: 'rcp_pet',
        titulo: 'Paragem Cardíaca (Animal)',
        descricao: 'Animal inconsciente, sem respiração e sem batimentos cardíacos.',
        icon: 'heart-dislike',
        cor: '#B71C1C', // Vermelho Escuro
        corFundo: '#FFEBEE',
        frequencia: 'Extrema',
        passos: [
            { titulo: 'Verificar batimentos e respiração', descricao: 'Colocar a mão sobre o peito para sentir os batimentos, aproximar o ouvido do focinho para verificar a respiração e procurar o pulso na face interna da coxa.', critico: true },
            { titulo: 'Apenas se PARADO', descricao: 'NUNCA fazer compressões cardíacas se o coração do animal ainda estiver a bater.' },
            { titulo: 'Deitar sobre o lado DIREITO', descricao: 'Deitar o animal sobre o lado direito do corpo (o coração fica por baixo do cotovelo esquerdo).' },
            { titulo: 'Compressões (Pequenos)', descricao: 'Em gatos e cães pequenos, envolver o peito com uma das mãos e comprimir a um ritmo de 100 a 120 por minuto.', critico: true },
            { titulo: 'Compressões (Méd/Grandes)', descricao: 'Colocar as duas mãos sobrepostas na parte mais larga do peito e comprimir cerca de um terço da largura do tórax.', critico: true },
            { titulo: 'Respiração boca-focinho', descricao: 'Manter a boca do animal bem fechada e soprar ar diretamente para as narinas (2 insuflações a cada 30 compressões).' },
        ],
        alertas: [
            'Não parar as compressões até chegar às urgências veterinárias ou até o animal voltar a respirar.',
            'O procedimento é exaustivo: revezar com outra pessoa a cada 2 minutos, se possível.',
        ],
    },
    {
        id: 'calor_pet',
        titulo: 'Hipertermia (Golpe de Calor)',
        descricao: 'Respiração extremamente ofegante, gengivas muito vermelhas e prostração.',
        icon: 'sunny',
        cor: '#FBC02D', // Amarelo
        corFundo: '#FFFDE7',
        frequencia: 'Verão',
        passos: [
            { titulo: 'Tirar do calor de imediato', descricao: 'Levar o animal de imediato para a sombra, para o ar condicionado ou para um local arejado.', critico: true },
            { titulo: 'Molhar as patas e a barriga', descricao: 'Molhar as patas e a barriga com água fresca à temperatura ambiente (NUNCA água gelada ou gelo, pelo risco de choque térmico).', critico: true },
            { titulo: 'Aumentar a ventilação', descricao: 'Ligar uma ventoinha virada para o animal ou abaná-lo com vigor.' },
            { titulo: 'Oferecer água fresca', descricao: 'Oferecer uma taça de água fresca sem forçar o animal a beber, para evitar engasgamentos.' },
            { titulo: 'Levar ao veterinário', descricao: 'Levar ao veterinário mesmo que o animal pareça melhorar, pois o sobreaquecimento pode danificar os rins e outros órgãos internos.' },
        ],
        alertas: [
            'Não atirar água gelada sobre o animal.',
            'Os animais de focinho curto (como Pugs, Bulldogs e Persas) sofrem muito mais com o calor.',
        ],
    },
    {
        id: 'convulsao_pet',
        titulo: 'Convulsão (Animal)',
        descricao: 'Corpo rígido, a salivar e a agitar as patas no ar.',
        icon: 'pulse',
        cor: '#7B1FA2', // Roxo
        corFundo: '#F3E5F5',
        frequencia: 'Comum',
        passos: [
            { titulo: 'NÃO puxar a língua', descricao: 'NÃO puxar a língua do animal (cães e gatos não engolem a língua; tentar segurá-la resulta em mordidas graves).', critico: true },
            { titulo: 'Afastar móveis e esquinas', descricao: 'Afastar móveis e objetos duros para que o animal não bata com a cabeça nem magoe os olhos.' },
            { titulo: 'Reduzir a luz e o som', descricao: 'Apagar as luzes e desligar a televisão ou o rádio para diminuir os estímulos ao cérebro.' },
            { titulo: 'Cronometrar a duração', descricao: 'Cronometrar a duração da crise. Se ultrapassar 5 minutos, levar ao veterinário como emergência.' },
            { titulo: 'Após a crise', descricao: 'Aguardar o regresso gradual da consciência (o animal acorda assustado e temporariamente desorientado). Falar baixo e evitar tocar-lhe com movimentos rápidos: pode assustar-se e reagir com uma mordida.' },
        ],
        alertas: [
            'Manter a calma, pois os animais sentem a nossa tensão.',
            'Se possível, filmar a crise com o telemóvel para mostrar ao médico veterinário.',
        ],
    },
    {
        id: 'sangramento_pet',
        titulo: 'Hemorragia / Corte (Animal)',
        descricao: 'Feridas a sangrar nas orelhas, nas patas ou na pele.',
        icon: 'water',
        cor: '#D32F2F', // Vermelho
        corFundo: '#FFEBEE',
        frequencia: 'Comum',
        passos: [
            { titulo: 'Pressionar com firmeza', descricao: 'Colocar um pano limpo ou uma compressa sobre o corte e pressionar sem parar durante pelo menos 5 minutos.', critico: true },
            { titulo: 'Não ficar a espreitar', descricao: 'NÃO retirar o pano para verificar a hemorragia, para não romper o coágulo.' },
            { titulo: 'Elevar a ferida', descricao: 'Elevar a pata ferida acima do nível do peito para diminuir a pressão sanguínea.' },
            { titulo: 'Garrote: CUIDADO', descricao: 'Último recurso: só em hemorragia grave de pata ou cauda que não pare com pressão firme e contínua. Usar uma faixa larga e elástica (um cordão fino corta e escorrega no membro). Anotar a hora em que foi aplicado e ir de imediato ao veterinário, que decide quando o soltar.', critico: true },
            { titulo: 'Ir ao veterinário o quanto antes', descricao: 'Levar ao veterinário, pois os cortes profundos precisam de pontos e de pensos profissionais.' },
        ],
        alertas: [
            'Os cortes nas orelhas sangram muito e salpicam sangue quando o animal abana a cabeça.',
            'Se cortar uma unha demasiado curta e sangrar, aplicar amido de milho para ajudar a estancar.',
        ],
    },
    {
        id: 'picada_peconhentos',
        titulo: 'Picada de Venenosos',
        descricao: 'Animais peçonhentos e picadas dolorosas no quintal.',
        icon: 'warning',
        cor: '#FF5722', // Deep Orange
        corFundo: '#FBE9E7',
        frequencia: 'Urgente',
        passos: [
            { titulo: 'Fotografar o animal', descricao: 'Se for seguro, fotografar o animal causador para o veterinário saber que soro aplicar. NUNCA tentar apanhar o animal.', critico: true },
            { titulo: 'Manter o animal imóvel', descricao: 'Evitar que o animal ande ou corra (o movimento acelera os batimentos e espalha o veneno).' },
            { titulo: 'NÃO cortar nem apertar', descricao: 'NUNCA cortar o local da picada, não fazer garrotes e não tentar sugar o veneno.', critico: true },
            { titulo: 'Elevar a zona', descricao: 'Elevar a pata picada em relação ao corpo.' },
            { titulo: 'Dirigir-se ao veterinário', descricao: 'Levar de imediato ao veterinário para aplicação do soro antiofídico ou antiescorpiónico.', critico: true },
        ],
        alertas: ['Escorpião: dor intensa imediata e vómito', 'Cobra: inchaço rápido e hemorragia'],
    },
    {
        id: 'plantas_toxicas_pet',
        titulo: 'Plantas Tóxicas',
        descricao: 'Ingestão de flores, folhas ou seiva de plantas tóxicas.',
        icon: 'leaf',
        cor: '#4CAF50', // Verde
        corFundo: '#E8F5E9',
        frequencia: 'Comum',
        passos: [
            { titulo: 'Limpar a boca de imediato', descricao: 'Retirar os restos de folhas da boca e lavar com bastante água corrente para limpar a seiva.', critico: true },
            { titulo: 'Foto da planta', descricao: 'Fotografar a planta mastigada ou levar um raminho para identificação.' },
            { titulo: 'Vigiar a respiração', descricao: 'Observar a respiração, pois as plantas tóxicas provocam inchaço na boca e na garganta.' },
            { titulo: 'NÃO provocar o vómito', descricao: 'NÃO provocar o vómito sem indicação expressa do veterinário (as plantas corrosivas queimam no regresso).' },
            { titulo: 'Carvão ativado: só com veterinário', descricao: 'NÃO dar carvão ativado nem remédios caseiros por iniciativa própria: há risco de aspiração para os pulmões. Dar apenas se o veterinário indicar.' },
        ],
        alertas: [
            'As folhas de lírio são altamente venenosas para os gatos e podem causar insuficiência renal grave.',
            'Sinais comuns: salivação excessiva, língua inchada, vómitos e apatia.',
        ],
    },
    {
        id: 'quimicos_pet',
        titulo: 'Produtos Químicos',
        descricao: 'Ingestão de lixívia, desinfetantes ou veneno para ratos.',
        icon: 'flask',
        cor: '#607D8B', // Blue Grey
        corFundo: '#ECEFF1',
        frequencia: 'Grave',
        passos: [
            { titulo: 'Afastar o produto', descricao: 'Retirar o animal de perto do produto químico e isolar a zona.', critico: true },
            { titulo: 'Contacto com a PELE/OLHOS', descricao: 'Lavar a pele ou os olhos afetados com água corrente fria durante 15 minutos sem parar.', critico: true },
            { titulo: 'Ingestão', descricao: 'NÃO provocar o vómito por iniciativa própria (os produtos corrosivos queimam no regresso); só se o veterinário indicar. Oferecer água fresca para limpar a boca.' },
            { titulo: 'Ligar para o centro antivenenos', descricao: 'Ligar para {{POISON_CONTROL}} com a embalagem do produto na mão para ler os componentes.' },
            { titulo: 'Ir às urgências veterinárias', descricao: 'Levar a embalagem do produto químico ou a caixa do veneno juntamente com o animal ao veterinário.' },
        ],
        alertas: [
            'NUNCA dar medicamentos para humanos (como paracetamol ou aspirina) a cães e gatos.',
            'Alimentos como chocolate, cebola e xilitol (adoçante) também são venenosos para os animais.',
        ],
    },
];
