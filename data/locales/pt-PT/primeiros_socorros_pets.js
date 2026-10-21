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
            { titulo: 'Abra a boca com cuidado', descricao: 'Puxe a língua do animal para o lado e verifique se há um objeto visível (cuidado com as mordidas reflexas).', critico: true },
            { titulo: 'Retire o objeto SÓ se estiver fácil e visível na cavidade oral', descricao: 'NÃO tente puxar com os dedos ou com uma pinça se o objeto estiver profundo, para não o empurrar.' },
            { titulo: 'Manobra de Heimlich (Grande)', descricao: 'Posicione-se atrás do cão, abrace-lhe a cintura com os punhos logo abaixo das costelas e pressione com firmeza para cima e para a frente.', critico: true },
            { titulo: 'Heimlich (Pequenos)', descricao: 'Manobra específica para cães pequenos e gatos: deite o animal de lado e pressione o abdómen logo abaixo das costelas com as pontas dos dedos, com força controlada.', critico: true },
            { titulo: 'Pancadas nas costas', descricao: 'Aplique pancadas firmes entre as omoplatas com a palma da mão (indicado apenas para gatos e cães pequenos).' },
        ],
        alertas: [
            'Cuidado para não sofrer mordidas ou arranhões: os animais engasgados entram em pânico e reagem por instinto.',
            'Ligue para o veterinário e avise que está a caminho.',
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
            { titulo: 'Mova para um local seguro', descricao: 'Retire o animal da via com muito cuidado, usando um lençol ou cobertor esticado como maca para proteger a coluna.', critico: true },
            { titulo: 'NÃO o deixar andar', descricao: 'Mantenha o animal deitado mesmo que pareça bem e queira correr (as pancadas podem causar hemorragia interna silenciosa).' },
            { titulo: 'Sinalize a zona', descricao: 'Garanta a segurança do local onde parou para socorrer contra novos acidentes.' },
            { titulo: 'Contenha as hemorragias', descricao: 'Pressione as feridas a sangrar com um pano limpo ou uma compressa.' },
            { titulo: 'Veterinário IMEDIATO', descricao: 'Leve o animal de imediato ao hospital veterinário para atendimento, exames de imagem e suporte.', critico: true },
        ],
        alertas: [
            'Os animais com dor forte mordem por instinto: improvise um açaime leve (apenas se não houver risco de vómito).',
            'Mantenha o corpo do animal quente durante o trajeto.',
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
            { titulo: 'Verifique batimentos e respiração', descricao: 'Coloque a mão sobre o peito para sentir os batimentos, aproxime o ouvido do focinho para verificar a respiração e procure o pulso na face interna da coxa.', critico: true },
            { titulo: 'Apenas se PARADO', descricao: 'NUNCA faça compressões cardíacas se o coração do animal ainda estiver a bater.' },
            { titulo: 'Deite sobre o lado DIREITO', descricao: 'Deite o animal sobre o lado direito do corpo (o coração fica por baixo do cotovelo esquerdo).' },
            { titulo: 'Compressões (Pequenos)', descricao: 'Em gatos e cães pequenos, envolver o peito com uma das mãos e comprimir a um ritmo de 100 a 120 por minuto.', critico: true },
            { titulo: 'Compressões (Méd/Grandes)', descricao: 'Coloque as duas mãos sobrepostas na parte mais larga do peito e comprima cerca de um terço da largura do tórax.', critico: true },
            { titulo: 'Respiração boca-focinho', descricao: 'Mantenha a boca do animal bem fechada e sopre ar diretamente para as narinas (2 insuflações a cada 30 compressões).' },
        ],
        alertas: [
            'Não pare as compressões até chegar às urgências veterinárias ou até o animal voltar a respirar.',
            'O procedimento é exaustivo: reveze com outra pessoa a cada 2 minutos, se possível.',
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
            { titulo: 'Tire do calor de imediato', descricao: 'Leve o animal de imediato para a sombra, para o ar condicionado ou para um local arejado.', critico: true },
            { titulo: 'Molhe as patas e a barriga', descricao: 'Molhe as patas e a barriga com água fresca à temperatura ambiente (NUNCA água gelada ou gelo, pelo risco de choque térmico).', critico: true },
            { titulo: 'Aumente a ventilação', descricao: 'Ligue uma ventoinha virada para o animal ou abane-o com vigor.' },
            { titulo: 'Ofereça água fresca', descricao: 'Ofereça uma taça de água fresca sem forçar o animal a beber, para evitar engasgamentos.' },
            { titulo: 'Leve ao veterinário', descricao: 'Leve ao veterinário mesmo que o animal pareça melhorar, pois o sobreaquecimento pode danificar os rins e outros órgãos internos.' },
        ],
        alertas: [
            'Não atire água gelada sobre o animal.',
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
            { titulo: 'NÃO puxe a língua', descricao: 'NÃO puxe a língua do animal (cães e gatos não engolem a língua; tentar segurá-la resulta em mordidas graves).', critico: true },
            { titulo: 'Afaste móveis e esquinas', descricao: 'Afaste móveis e objetos duros para que o animal não bata com a cabeça nem magoe os olhos.' },
            { titulo: 'Reduza a luz e o som', descricao: 'Apague as luzes e desligue a televisão ou o rádio para diminuir os estímulos ao cérebro.' },
            { titulo: 'Cronometre a duração', descricao: 'Cronometre a duração da crise. Se ultrapassar 5 minutos, leve ao veterinário como emergência.' },
            { titulo: 'Após a crise', descricao: 'Aguarde o regresso gradual da consciência (o animal acorda assustado e temporariamente desorientado). Fale baixo e evite tocar-lhe com movimentos rápidos: pode assustar-se e reagir com uma mordida.' },
        ],
        alertas: [
            'Mantenha a calma, pois os animais sentem a nossa tensão.',
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
            { titulo: 'Pressione com firmeza', descricao: 'Coloque um pano limpo ou uma compressa sobre o corte e pressione sem parar durante pelo menos 5 minutos.', critico: true },
            { titulo: 'Não fique a espreitar', descricao: 'NÃO retire o pano para verificar a hemorragia, para não romper o coágulo.' },
            { titulo: 'Eleve a ferida', descricao: 'Eleve a pata ferida acima do nível do peito para diminuir a pressão sanguínea.' },
            { titulo: 'Garrote: CUIDADO', descricao: 'Último recurso: só em hemorragia grave de pata ou cauda que não pare com pressão firme e contínua. Use uma faixa larga e elástica (um cordão fino corta e escorrega no membro). Anote a hora em que foi aplicado e vá de imediato ao veterinário, que decide quando o soltar.', critico: true },
            { titulo: 'Ir ao veterinário o quanto antes', descricao: 'Leve ao veterinário, pois os cortes profundos precisam de pontos e de pensos profissionais.' },
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
            { titulo: 'Fotografe o animal', descricao: 'Se for seguro, fotografe o animal causador para o veterinário saber que soro aplicar. NUNCA tente apanhar o animal.', critico: true },
            { titulo: 'Mantenha o animal imóvel', descricao: 'Evite que o animal ande ou corra (o movimento acelera os batimentos e espalha o veneno).' },
            { titulo: 'NÃO corte nem aperte', descricao: 'NUNCA corte o local da picada, não faça garrotes e não tente sugar o veneno.', critico: true },
            { titulo: 'Eleve a zona', descricao: 'Eleve a pata picada em relação ao corpo.' },
            { titulo: 'Dirija-se ao veterinário', descricao: 'Leve de imediato ao veterinário para aplicação do soro antiofídico ou antiescorpiónico.', critico: true },
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
            { titulo: 'Limpe a boca de imediato', descricao: 'Retire os restos de folhas da boca e lave com bastante água corrente para limpar a seiva.', critico: true },
            { titulo: 'Foto da planta', descricao: 'Fotografe a planta mastigada ou leve um raminho para identificação.' },
            { titulo: 'Vigie a respiração', descricao: 'Observe a respiração, pois as plantas tóxicas provocam inchaço na boca e na garganta.' },
            { titulo: 'NÃO provoque o vómito', descricao: 'NÃO provoque o vómito sem indicação expressa do veterinário (as plantas corrosivas queimam no regresso).' },
            { titulo: 'Carvão ativado: só com veterinário', descricao: 'NÃO dê carvão ativado nem remédios caseiros por iniciativa própria: há risco de aspiração para os pulmões. Dê apenas se o veterinário indicar.' },
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
            { titulo: 'Afaste o produto', descricao: 'Retire o animal de perto do produto químico e isole a zona.', critico: true },
            { titulo: 'Contacto com a PELE/OLHOS', descricao: 'Lave a pele ou os olhos afetados com água corrente fria durante 15 minutos sem parar.', critico: true },
            { titulo: 'Ingestão', descricao: 'NÃO provoque o vómito por iniciativa própria (os produtos corrosivos queimam no regresso); só se o veterinário indicar. Ofereça água fresca para limpar a boca.' },
            { titulo: 'Ligue para o centro antivenenos', descricao: 'Ligue para {{POISON_CONTROL}} com a embalagem do produto na mão para ler os componentes.' },
            { titulo: 'Ir às urgências veterinárias', descricao: 'Leve a embalagem do produto químico ou a caixa do veneno juntamente com o animal ao veterinário.' },
        ],
        alertas: [
            'NUNCA dê medicamentos para humanos (como paracetamol ou aspirina) a cães e gatos.',
            'Alimentos como chocolate, cebola e xilitol (adoçante) também são venenosos para os animais.',
        ],
    },
];
