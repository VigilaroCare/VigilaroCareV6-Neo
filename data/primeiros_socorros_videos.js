/**
 * primeiros_socorros_videos.js
 * Estrutura de dados para vídeos de primeiros socorros
 * 18 procedimentos × 3 idiomas (PT-BR, ES, EN)
 */

export const LANGUAGES = {
    PT_BR: 'pt-BR',
    ES: 'es',
    EN: 'en',
};

export const CATEGORIES = {
    LIFE_THREATENING: {
        id: 'life_threatening',
        label: {
            [LANGUAGES.PT_BR]: 'Risco de Vida',
            [LANGUAGES.ES]: 'Riesgo de Vida',
            [LANGUAGES.EN]: 'Life Threatening',
        },
        icon: 'heart-pulse',
        color: '#F44336',
        priority: 1,
    },
    COMMON_EMERGENCIES: {
        id: 'common_emergencies',
        label: {
            [LANGUAGES.PT_BR]: 'Emergências Comuns',
            [LANGUAGES.ES]: 'Emergencias Comunes',
            [LANGUAGES.EN]: 'Common Emergencies',
        },
        icon: 'alert-circle',
        color: '#FF9800',
        priority: 2,
    },
    HOME_ACCIDENTS: {
        id: 'home_accidents',
        label: {
            [LANGUAGES.PT_BR]: 'Acidentes Domésticos',
            [LANGUAGES.ES]: 'Accidentes Domésticos',
            [LANGUAGES.EN]: 'Home Accidents',
        },
        icon: 'home',
        color: '#2196F3',
        priority: 3,
    },
    CHILDREN: {
        id: 'children',
        label: {
            [LANGUAGES.PT_BR]: 'Bebês e Crianças',
            [LANGUAGES.ES]: 'Bebés y Niños',
            [LANGUAGES.EN]: 'Babies & Children',
        },
        icon: 'baby-face-outline',
        color: '#9C27B0',
        priority: 4,
    },
};

/**
 * Estrutura de cada procedimento:
 * - id: identificador único
 * - category: categoria do procedimento
 * - duration: duração estimada do vídeo em segundos
 * - complexity: baixa, média, alta
 * - title: título em cada idioma
 * - description: descrição curta em cada idioma
 * - steps: passos do procedimento (para fallback offline)
 * - video: URLs do vídeo por idioma (será preenchido quando vídeos estiverem prontos)
 * - thumbnail: URL da thumbnail
 * - keywords: palavras-chave para busca
 */

export const FIRST_AID_PROCEDURES = [
    // ==========================================
    // CATEGORIA A: RISCO DE VIDA
    // ==========================================
    {
        id: 'cpr_adult',
        category: 'life_threatening',
        duration: 45,
        complexity: 'high',
        title: {
            [LANGUAGES.PT_BR]: 'RCP Adulto',
            [LANGUAGES.ES]: 'RCP Adulto',
            [LANGUAGES.EN]: 'Adult CPR',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Ressuscitação cardiopulmonar para adultos',
            [LANGUAGES.ES]: 'Resucitación cardiopulmonar para adultos',
            [LANGUAGES.EN]: 'Cardiopulmonary resuscitation for adults',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Verifique se a pessoa está consciente',
                'Ligue 192 (SAMU) imediatamente',
                'Coloque a pessoa de costas em superfície firme',
                'Posicione as mãos no centro do peito',
                'Faça 30 compressões rápidas e fortes',
                'Incline a cabeça, levante o queixo',
                'Faça 2 respirações boca a boca',
                'Repita até socorro chegar',
            ],
            [LANGUAGES.ES]: [
                'Verifique si la persona está consciente',
                'Llame al servicio de emergencias inmediatamente',
                'Coloque a la persona boca arriba en superficie firme',
                'Posicione las manos en el centro del pecho',
                'Haga 30 compresiones rápidas y fuertes',
                'Incline la cabeza, levante el mentón',
                'Haga 2 respiraciones boca a boca',
                'Repita hasta que llegue el socorro',
            ],
            [LANGUAGES.EN]: [
                'Check if person is conscious',
                'Call emergency services immediately',
                'Place person on back on firm surface',
                'Position hands on center of chest',
                'Do 30 fast and strong compressions',
                'Tilt head back, lift chin',
                'Give 2 rescue breaths',
                'Repeat until help arrives',
            ],
        },
        video: {
            [LANGUAGES.PT_BR]: null, // Será preenchido com URL do CDN
            [LANGUAGES.ES]: null,
            [LANGUAGES.EN]: null,
        },
        thumbnail: null,
        keywords: ['rcp', 'cpr', 'ressuscitação', 'parada cardíaca', 'heart', 'chest'],
    },
    {
        id: 'cpr_baby',
        category: 'life_threatening',
        duration: 45,
        complexity: 'high',
        title: {
            [LANGUAGES.PT_BR]: 'RCP Bebê/Criança',
            [LANGUAGES.ES]: 'RCP Bebé/Niño',
            [LANGUAGES.EN]: 'Baby/Child CPR',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Ressuscitação cardiopulmonar para bebês e crianças',
            [LANGUAGES.ES]: 'Resucitación cardiopulmonar para bebés y niños',
            [LANGUAGES.EN]: 'Cardiopulmonary resuscitation for babies and children',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Verifique resposta (toque suavemente)',
                'Ligue 192 (SAMU)',
                'Coloque em superfície firme',
                'Use 2 dedos no centro do peito (bebê)',
                'Faça 30 compressões suaves',
                'Cubra boca E nariz com sua boca',
                'Faça 2 sopros suaves',
                'Continue até socorro chegar',
            ],
            [LANGUAGES.ES]: [
                'Verifique respuesta (toque suavemente)',
                'Llame al servicio de emergencias',
                'Coloque en superficie firme',
                'Use 2 dedos en el centro del pecho (bebé)',
                'Haga 30 compresiones suaves',
                'Cubra boca Y nariz con su boca',
                'Haga 2 soplos suaves',
                'Continue hasta que llegue el socorro',
            ],
            [LANGUAGES.EN]: [
                'Check for response (tap gently)',
                'Call emergency services',
                'Place on firm surface',
                'Use 2 fingers on center of chest (baby)',
                'Do 30 gentle compressions',
                'Cover mouth AND nose with your mouth',
                'Give 2 gentle breaths',
                'Continue until help arrives',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['rcp', 'bebê', 'criança', 'baby', 'child', 'infant'],
    },
    {
        id: 'choking_adult',
        category: 'life_threatening',
        duration: 30,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Engasgo Adulto (Heimlich)',
            [LANGUAGES.ES]: 'Atragantamiento Adulto (Heimlich)',
            [LANGUAGES.EN]: 'Adult Choking (Heimlich)',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Manobra de Heimlich para desobstrução de vias aéreas',
            [LANGUAGES.ES]: 'Maniobra de Heimlich para desobstrucción de vías aéreas',
            [LANGUAGES.EN]: 'Heimlich maneuver to clear airway obstruction',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Pergunte se ela consegue tossir',
                'Fique atrás da pessoa',
                'Posicione o punho acima do umbigo',
                'Segure o punho com a outra mão',
                'Faça compressões para cima e para dentro',
                'Repita até o objeto sair',
                'Se desmaiar, inicie RCP',
            ],
            [LANGUAGES.ES]: [
                'Pregunte si puede toser',
                'Póngase detrás de la persona',
                'Posicione el puño arriba del ombligo',
                'Sujete el puño con la otra mano',
                'Haga compresiones hacia arriba y adentro',
                'Repita hasta que salga el objeto',
                'Si se desmaya, inicie RCP',
            ],
            [LANGUAGES.EN]: [
                'Ask if they can cough',
                'Stand behind the person',
                'Position fist above navel',
                'Grasp fist with other hand',
                'Do upward and inward thrusts',
                'Repeat until object comes out',
                'If they faint, start CPR',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['engasgo', 'heimlich', 'choking', 'atragantamiento', 'suffocating'],
    },
    {
        id: 'choking_baby',
        category: 'life_threatening',
        duration: 30,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Engasgo Bebê',
            [LANGUAGES.ES]: 'Atragantamiento Bebé',
            [LANGUAGES.EN]: 'Baby Choking',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Técnica de desobstrução para bebês até 1 ano',
            [LANGUAGES.ES]: 'Técnica de desobstrucción para bebés hasta 1 año',
            [LANGUAGES.EN]: 'Clearing technique for babies up to 1 year',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Coloque o bebê de bruços sobre seu antebraço',
                'Apoie a cabeça com a mão',
                'Dê 5 tapas firmes nas costas',
                'Vire o bebê de costas',
                'Faça 5 compressões no peito com 2 dedos',
                'Alterne até o objeto sair',
                'Se ficar inconsciente, inicie RCP',
            ],
            [LANGUAGES.ES]: [
                'Coloque al bebé boca abajo sobre su antebrazo',
                'Apoye la cabeza con la mano',
                'Dé 5 palmadas firmes en la espalda',
                'Voltee al bebé boca arriba',
                'Haga 5 compresiones en el pecho con 2 dedos',
                'Alterne hasta que salga el objeto',
                'Si queda inconsciente, inicie RCP',
            ],
            [LANGUAGES.EN]: [
                'Place baby face down on your forearm',
                'Support head with your hand',
                'Give 5 firm back slaps',
                'Turn baby face up',
                'Do 5 chest thrusts with 2 fingers',
                'Alternate until object comes out',
                'If unconscious, start CPR',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['engasgo', 'bebê', 'baby', 'choking', 'infant'],
    },
    {
        id: 'aed_use',
        category: 'life_threatening',
        duration: 60,
        complexity: 'high',
        title: {
            [LANGUAGES.PT_BR]: 'Uso do DEA',
            [LANGUAGES.ES]: 'Uso del DEA',
            [LANGUAGES.EN]: 'Using AED',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Como usar o Desfibrilador Externo Automático',
            [LANGUAGES.ES]: 'Cómo usar el Desfibrilador Externo Automático',
            [LANGUAGES.EN]: 'How to use Automated External Defibrillator',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Ligue o DEA e siga as instruções de voz',
                'Exponha o peito da vítima',
                'Cole os eletrodos conforme indicado',
                'Afaste-se enquanto o DEA analisa',
                'Se indicado choque, grite "AFASTEM-SE"',
                'Pressione o botão de choque',
                'Continue RCP até nova análise',
            ],
            [LANGUAGES.ES]: [
                'Encienda el DEA y siga las instrucciones de voz',
                'Exponga el pecho de la víctima',
                'Pegue los electrodos según indicado',
                'Aléjese mientras el DEA analiza',
                'Si se indica choque, grite "ALÉJENSE"',
                'Presione el botón de choque',
                'Continue RCP hasta nuevo análisis',
            ],
            [LANGUAGES.EN]: [
                'Turn on AED and follow voice prompts',
                'Expose victim\'s chest',
                'Attach pads as shown',
                'Stand clear while AED analyzes',
                'If shock advised, shout "CLEAR"',
                'Press shock button',
                'Continue CPR until next analysis',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['dea', 'aed', 'desfibrilador', 'defibrillator', 'choque'],
    },

    // ==========================================
    // CATEGORIA B: EMERGÊNCIAS COMUNS
    // ==========================================
    {
        id: 'burn',
        category: 'common_emergencies',
        duration: 40,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Queimadura',
            [LANGUAGES.ES]: 'Quemadura',
            [LANGUAGES.EN]: 'Burn',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Tratamento para queimaduras de 1º, 2º e 3º grau',
            [LANGUAGES.ES]: 'Tratamiento para quemaduras de 1º, 2º y 3º grado',
            [LANGUAGES.EN]: 'Treatment for 1st, 2nd and 3rd degree burns',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Afaste a fonte de calor',
                'Coloque água corrente fria por 10-20 minutos',
                'NÃO use gelo, pasta de dente ou manteiga',
                'Remova anéis e roupas soltas',
                'Cubra com pano limpo e úmido',
                'NÃO estoure bolhas',
                'Procure atendimento médico se grave',
            ],
            [LANGUAGES.ES]: [
                'Aleje la fuente de calor',
                'Ponga agua corriente fría por 10-20 minutos',
                'NO use hielo, pasta dental o mantequilla',
                'Retire anillos y ropa suelta',
                'Cubra con paño limpio y húmedo',
                'NO reviente ampollas',
                'Busque atención médica si es grave',
            ],
            [LANGUAGES.EN]: [
                'Remove heat source',
                'Run cool water for 10-20 minutes',
                'DO NOT use ice, toothpaste or butter',
                'Remove rings and loose clothing',
                'Cover with clean, damp cloth',
                'DO NOT pop blisters',
                'Seek medical help if severe',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['queimadura', 'burn', 'fogo', 'fire', 'quemadura'],
    },
    {
        id: 'severe_bleeding',
        category: 'common_emergencies',
        duration: 30,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Sangramento Grave',
            [LANGUAGES.ES]: 'Sangrado Grave',
            [LANGUAGES.EN]: 'Severe Bleeding',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Como controlar sangramento intenso',
            [LANGUAGES.ES]: 'Cómo controlar sangrado intenso',
            [LANGUAGES.EN]: 'How to control heavy bleeding',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Vista luvas se disponível',
                'Pressione firmemente com pano limpo',
                'Mantenha pressão constante',
                'Se sangue atravessar, adicione mais pano',
                'NÃO remova o primeiro pano',
                'Eleve o membro se possível',
                'Ligue 192 se não parar',
            ],
            [LANGUAGES.ES]: [
                'Use guantes si están disponibles',
                'Presione firmemente con paño limpio',
                'Mantenga presión constante',
                'Si la sangre atraviesa, agregue más paño',
                'NO retire el primer paño',
                'Eleve el miembro si es posible',
                'Llame emergencias si no para',
            ],
            [LANGUAGES.EN]: [
                'Wear gloves if available',
                'Press firmly with clean cloth',
                'Maintain constant pressure',
                'If blood soaks through, add more cloth',
                'DO NOT remove first cloth',
                'Elevate limb if possible',
                'Call emergency if it doesn\'t stop',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['sangramento', 'sangue', 'bleeding', 'blood', 'hemorragia'],
    },
    {
        id: 'poisoning',
        category: 'common_emergencies',
        duration: 45,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Intoxicação',
            [LANGUAGES.ES]: 'Intoxicación',
            [LANGUAGES.EN]: 'Poisoning',
        },
        description: {
            [LANGUAGES.PT_BR]: 'O que fazer e NÃO fazer em caso de envenenamento',
            [LANGUAGES.ES]: 'Qué hacer y NO hacer en caso de envenenamiento',
            [LANGUAGES.EN]: 'What to do and NOT do in case of poisoning',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Ligue CIATOX: 0800 722 6001',
                'Identifique o produto/substância',
                'NÃO provoque vômito',
                'NÃO dê leite ou água sem orientação',
                'Se na pele, lave com água corrente',
                'Se nos olhos, lave por 15 minutos',
                'Leve a embalagem ao hospital',
            ],
            [LANGUAGES.ES]: [
                'Llame al centro de toxicología',
                'Identifique el producto/sustancia',
                'NO provoque vómito',
                'NO dé leche o agua sin orientación',
                'Si está en la piel, lave con agua corriente',
                'Si está en los ojos, lave por 15 minutos',
                'Lleve el envase al hospital',
            ],
            [LANGUAGES.EN]: [
                'Call Poison Control',
                'Identify the product/substance',
                'DO NOT induce vomiting',
                'DO NOT give milk or water without guidance',
                'If on skin, wash with running water',
                'If in eyes, wash for 15 minutes',
                'Bring container to hospital',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['intoxicação', 'veneno', 'poisoning', 'poison', 'envenenamento'],
    },
    {
        id: 'seizure',
        category: 'common_emergencies',
        duration: 30,
        complexity: 'low',
        title: {
            [LANGUAGES.PT_BR]: 'Convulsão',
            [LANGUAGES.ES]: 'Convulsión',
            [LANGUAGES.EN]: 'Seizure',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Como ajudar alguém tendo uma convulsão',
            [LANGUAGES.ES]: 'Cómo ayudar a alguien teniendo una convulsión',
            [LANGUAGES.EN]: 'How to help someone having a seizure',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Mantenha a calma',
                'Proteja a cabeça com algo macio',
                'Afaste objetos perigosos',
                'NÃO segure a pessoa',
                'NÃO coloque nada na boca',
                'Vire de lado após parar',
                'Ligue 192 se durar mais de 5 minutos',
            ],
            [LANGUAGES.ES]: [
                'Mantenga la calma',
                'Proteja la cabeza con algo suave',
                'Aleje objetos peligrosos',
                'NO sujete a la persona',
                'NO coloque nada en la boca',
                'Voltee de lado después de parar',
                'Llame emergencias si dura más de 5 minutos',
            ],
            [LANGUAGES.EN]: [
                'Stay calm',
                'Protect head with something soft',
                'Move dangerous objects away',
                'DO NOT restrain the person',
                'DO NOT put anything in mouth',
                'Turn on side after it stops',
                'Call emergency if lasts more than 5 minutes',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['convulsão', 'epilepsia', 'seizure', 'epilepsy', 'convulsion'],
    },
    {
        id: 'fainting',
        category: 'common_emergencies',
        duration: 20,
        complexity: 'low',
        title: {
            [LANGUAGES.PT_BR]: 'Desmaio',
            [LANGUAGES.ES]: 'Desmayo',
            [LANGUAGES.EN]: 'Fainting',
        },
        description: {
            [LANGUAGES.PT_BR]: 'O que fazer quando alguém desmaia',
            [LANGUAGES.ES]: 'Qué hacer cuando alguien se desmaya',
            [LANGUAGES.EN]: 'What to do when someone faints',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Deite a pessoa de costas',
                'Eleve as pernas acima do coração',
                'Afrouxe roupas apertadas',
                'Verifique se está respirando',
                'Se não acordar em 1 minuto, ligue 192',
                'Ao acordar, mantenha deitado por alguns minutos',
            ],
            [LANGUAGES.ES]: [
                'Acueste a la persona boca arriba',
                'Eleve las piernas arriba del corazón',
                'Afloje ropa apretada',
                'Verifique si está respirando',
                'Si no despierta en 1 minuto, llame emergencias',
                'Al despertar, mantenga acostado por algunos minutos',
            ],
            [LANGUAGES.EN]: [
                'Lay person on their back',
                'Raise legs above heart level',
                'Loosen tight clothing',
                'Check if breathing',
                'If not awake in 1 minute, call emergency',
                'When awake, keep lying down for a few minutes',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['desmaio', 'fainting', 'desmayo', 'unconscious', 'síncope'],
    },

    // ==========================================
    // CATEGORIA C: ACIDENTES DOMÉSTICOS
    // ==========================================
    {
        id: 'fall',
        category: 'home_accidents',
        duration: 40,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Queda',
            [LANGUAGES.ES]: 'Caída',
            [LANGUAGES.EN]: 'Fall',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Imobilização e cuidados após uma queda',
            [LANGUAGES.ES]: 'Inmovilización y cuidados después de una caída',
            [LANGUAGES.EN]: 'Immobilization and care after a fall',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'NÃO mova a pessoa se suspeitar lesão na coluna',
                'Pergunte onde dói',
                'Verifique se consegue mover mãos e pés',
                'Se fratura visível, imobilize com tala improvisada',
                'Aplique gelo envolto em pano',
                'Ligue 192 se lesão grave',
            ],
            [LANGUAGES.ES]: [
                'NO mueva a la persona si sospecha lesión en la columna',
                'Pregunte dónde duele',
                'Verifique si puede mover manos y pies',
                'Si hay fractura visible, inmovilice con férula improvisada',
                'Aplique hielo envuelto en paño',
                'Llame emergencias si es lesión grave',
            ],
            [LANGUAGES.EN]: [
                'DO NOT move person if you suspect spinal injury',
                'Ask where it hurts',
                'Check if they can move hands and feet',
                'If visible fracture, immobilize with improvised splint',
                'Apply ice wrapped in cloth',
                'Call emergency if serious injury',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['queda', 'fall', 'fratura', 'fracture', 'caída'],
    },
    {
        id: 'electric_shock',
        category: 'home_accidents',
        duration: 30,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Choque Elétrico',
            [LANGUAGES.ES]: 'Descarga Eléctrica',
            [LANGUAGES.EN]: 'Electric Shock',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Como agir em caso de choque elétrico',
            [LANGUAGES.ES]: 'Cómo actuar en caso de descarga eléctrica',
            [LANGUAGES.EN]: 'How to act in case of electric shock',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'NÃO toque na pessoa diretamente',
                'Desligue a energia no disjuntor',
                'Use material isolante (madeira, borracha)',
                'Afaste a pessoa da fonte',
                'Verifique respiração e pulso',
                'Inicie RCP se necessário',
                'Ligue 192',
            ],
            [LANGUAGES.ES]: [
                'NO toque a la persona directamente',
                'Apague la energía en el disyuntor',
                'Use material aislante (madera, goma)',
                'Aleje a la persona de la fuente',
                'Verifique respiración y pulso',
                'Inicie RCP si es necesario',
                'Llame emergencias',
            ],
            [LANGUAGES.EN]: [
                'DO NOT touch person directly',
                'Turn off power at breaker',
                'Use insulating material (wood, rubber)',
                'Move person away from source',
                'Check breathing and pulse',
                'Start CPR if needed',
                'Call emergency services',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['choque', 'elétrico', 'electric', 'shock', 'descarga'],
    },
    {
        id: 'drowning',
        category: 'home_accidents',
        duration: 40,
        complexity: 'high',
        title: {
            [LANGUAGES.PT_BR]: 'Afogamento',
            [LANGUAGES.ES]: 'Ahogamiento',
            [LANGUAGES.EN]: 'Drowning',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Primeiros socorros para vítima de afogamento',
            [LANGUAGES.ES]: 'Primeros auxilios para víctima de ahogamiento',
            [LANGUAGES.EN]: 'First aid for drowning victim',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Retire a pessoa da água com segurança',
                'Coloque deitada de costas',
                'Verifique se está respirando',
                'Se não respira, inicie RCP',
                'NÃO tente retirar água do pulmão',
                'Mantenha aquecido',
                'Ligue 192',
            ],
            [LANGUAGES.ES]: [
                'Retire a la persona del agua con seguridad',
                'Coloque acostada boca arriba',
                'Verifique si está respirando',
                'Si no respira, inicie RCP',
                'NO intente sacar agua del pulmón',
                'Mantenga caliente',
                'Llame emergencias',
            ],
            [LANGUAGES.EN]: [
                'Remove person from water safely',
                'Lay on back',
                'Check if breathing',
                'If not breathing, start CPR',
                'DO NOT try to remove water from lungs',
                'Keep warm',
                'Call emergency services',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['afogamento', 'drowning', 'ahogamiento', 'piscina', 'pool'],
    },
    {
        id: 'animal_bite',
        category: 'home_accidents',
        duration: 30,
        complexity: 'low',
        title: {
            [LANGUAGES.PT_BR]: 'Picada/Mordida de Animal',
            [LANGUAGES.ES]: 'Picadura/Mordedura de Animal',
            [LANGUAGES.EN]: 'Animal Bite/Sting',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Tratamento para picadas e mordidas',
            [LANGUAGES.ES]: 'Tratamiento para picaduras y mordeduras',
            [LANGUAGES.EN]: 'Treatment for bites and stings',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Lave com água e sabão abundantemente',
                'NÃO faça torniquete',
                'NÃO chupe o veneno',
                'Mantenha o membro imóvel',
                'Se possível, fotografe o animal',
                'Procure atendimento médico',
                'Ligue CIATOX: 0800 722 6001',
            ],
            [LANGUAGES.ES]: [
                'Lave con agua y jabón abundantemente',
                'NO haga torniquete',
                'NO chupe el veneno',
                'Mantenga el miembro inmóvil',
                'Si es posible, fotografíe el animal',
                'Busque atención médica',
                'Llame al centro de toxicología',
            ],
            [LANGUAGES.EN]: [
                'Wash thoroughly with soap and water',
                'DO NOT apply tourniquet',
                'DO NOT suck out venom',
                'Keep limb still',
                'If possible, photograph the animal',
                'Seek medical attention',
                'Call Poison Control',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['picada', 'mordida', 'bite', 'sting', 'cobra', 'snake', 'aranha', 'spider'],
    },
    {
        id: 'deep_cut',
        category: 'home_accidents',
        duration: 30,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Corte Profundo',
            [LANGUAGES.ES]: 'Corte Profundo',
            [LANGUAGES.EN]: 'Deep Cut',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Tratamento para cortes profundos',
            [LANGUAGES.ES]: 'Tratamiento para cortes profundos',
            [LANGUAGES.EN]: 'Treatment for deep cuts',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Pressione com pano limpo',
                'Eleve o membro acima do coração',
                'NÃO remova objetos cravados',
                'Se objeto cravado, estabilize sem remover',
                'Aplique curativo compressivo',
                'Procure atendimento se precisar pontos',
            ],
            [LANGUAGES.ES]: [
                'Presione con paño limpio',
                'Eleve el miembro arriba del corazón',
                'NO retire objetos clavados',
                'Si hay objeto clavado, estabilice sin remover',
                'Aplique vendaje compresivo',
                'Busque atención si necesita puntos',
            ],
            [LANGUAGES.EN]: [
                'Press with clean cloth',
                'Raise limb above heart',
                'DO NOT remove embedded objects',
                'If object embedded, stabilize without removing',
                'Apply pressure bandage',
                'Seek care if stitches needed',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['corte', 'cut', 'faca', 'knife', 'sangramento'],
    },

    // ==========================================
    // CATEGORIA D: BEBÊS E CRIANÇAS
    // ==========================================
    {
        id: 'high_fever',
        category: 'children',
        duration: 25,
        complexity: 'low',
        title: {
            [LANGUAGES.PT_BR]: 'Febre Alta',
            [LANGUAGES.ES]: 'Fiebre Alta',
            [LANGUAGES.EN]: 'High Fever',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Como baixar a febre em crianças',
            [LANGUAGES.ES]: 'Cómo bajar la fiebre en niños',
            [LANGUAGES.EN]: 'How to reduce fever in children',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Dê antitérmico conforme peso (paracetamol/dipirona)',
                'Vista roupas leves',
                'Mantenha ambiente arejado',
                'Dê bastante líquido',
                'Compressa morna na testa (não gelada)',
                'Se passar 39°C ou convulsão, ligue 192',
            ],
            [LANGUAGES.ES]: [
                'Dé antitérmico según peso (paracetamol/dipirona)',
                'Vista ropa liviana',
                'Mantenga ambiente ventilado',
                'Dé bastante líquido',
                'Compresas tibias en la frente (no heladas)',
                'Si pasa 39°C o convulsión, llame emergencias',
            ],
            [LANGUAGES.EN]: [
                'Give fever reducer by weight (acetaminophen/ibuprofen)',
                'Dress in light clothing',
                'Keep room well ventilated',
                'Give plenty of fluids',
                'Lukewarm compress on forehead (not cold)',
                'If over 102°F or seizure, call emergency',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['febre', 'fever', 'fiebre', 'criança', 'child', 'temperatura'],
    },
    {
        id: 'allergic_reaction',
        category: 'children',
        duration: 35,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Reação Alérgica',
            [LANGUAGES.ES]: 'Reacción Alérgica',
            [LANGUAGES.EN]: 'Allergic Reaction',
        },
        description: {
            [LANGUAGES.PT_BR]: 'Identificar e tratar reações alérgicas',
            [LANGUAGES.ES]: 'Identificar y tratar reacciones alérgicas',
            [LANGUAGES.EN]: 'Identify and treat allergic reactions',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Identifique sinais: inchaço, urticária, coceira',
                'Afaste do alérgeno se conhecido',
                'Dê antialérgico se disponível',
                'Se dificuldade para respirar, ligue 192 IMEDIATO',
                'Use epinefrina (EpiPen) se tiver e souber usar',
                'Mantenha calmo e deitado',
            ],
            [LANGUAGES.ES]: [
                'Identifique señales: hinchazón, urticaria, picazón',
                'Aleje del alérgeno si es conocido',
                'Dé antialérgico si está disponible',
                'Si tiene dificultad para respirar, llame emergencias INMEDIATO',
                'Use epinefrina (EpiPen) si tiene y sabe usar',
                'Mantenga calmado y acostado',
            ],
            [LANGUAGES.EN]: [
                'Identify signs: swelling, hives, itching',
                'Remove from allergen if known',
                'Give antihistamine if available',
                'If difficulty breathing, call emergency IMMEDIATELY',
                'Use epinephrine (EpiPen) if available and trained',
                'Keep calm and lying down',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['alergia', 'allergy', 'anafilaxia', 'anaphylaxis', 'urticária'],
    },
    {
        id: 'swallowed_object',
        category: 'children',
        duration: 30,
        complexity: 'medium',
        title: {
            [LANGUAGES.PT_BR]: 'Ingestão de Objeto',
            [LANGUAGES.ES]: 'Ingestión de Objeto',
            [LANGUAGES.EN]: 'Swallowed Object',
        },
        description: {
            [LANGUAGES.PT_BR]: 'O que fazer quando criança engole objeto',
            [LANGUAGES.ES]: 'Qué hacer cuando niño traga objeto',
            [LANGUAGES.EN]: 'What to do when child swallows object',
        },
        steps: {
            [LANGUAGES.PT_BR]: [
                'Mantenha a calma',
                'Se respirando normalmente, NÃO induza vômito',
                'Identifique o que foi engolido',
                'Se pilha/bateria/ímã, vá ao hospital URGENTE',
                'Se objeto pontiagudo, vá ao hospital',
                'Se pequeno e liso, monitore nas fezes',
                'Ligue para o pediatra',
            ],
            [LANGUAGES.ES]: [
                'Mantenga la calma',
                'Si respira normalmente, NO induzca vómito',
                'Identifique qué fue tragado',
                'Si es pila/batería/imán, vaya al hospital URGENTE',
                'Si es objeto puntiagudo, vaya al hospital',
                'Si es pequeño y liso, monitoree en las heces',
                'Llame al pediatra',
            ],
            [LANGUAGES.EN]: [
                'Stay calm',
                'If breathing normally, DO NOT induce vomiting',
                'Identify what was swallowed',
                'If battery/magnet, go to hospital URGENT',
                'If sharp object, go to hospital',
                'If small and smooth, monitor in stool',
                'Call pediatrician',
            ],
        },
        video: { [LANGUAGES.PT_BR]: null, [LANGUAGES.ES]: null, [LANGUAGES.EN]: null },
        thumbnail: null,
        keywords: ['engoliu', 'swallowed', 'objeto', 'object', 'criança', 'bateria', 'battery'],
    },
];

// ==========================================
// FUNÇÕES UTILITÁRIAS
// ==========================================

/**
 * Obtém procedimento por ID
 */
export function getProcedureById(id) {
    return FIRST_AID_PROCEDURES.find(p => p.id === id);
}

/**
 * Obtém procedimentos por categoria
 */
export function getProceduresByCategory(categoryId) {
    return FIRST_AID_PROCEDURES.filter(p => p.category === categoryId);
}

/**
 * Busca procedimentos por termo
 */
export function searchProcedures(term, language = LANGUAGES.PT_BR) {
    const lowerTerm = term.toLowerCase();
    return FIRST_AID_PROCEDURES.filter(p => {
        const title = p.title[language]?.toLowerCase() || '';
        const description = p.description[language]?.toLowerCase() || '';
        const keywords = p.keywords.join(' ').toLowerCase();
        return title.includes(lowerTerm) ||
            description.includes(lowerTerm) ||
            keywords.includes(lowerTerm);
    });
}

/**
 * Obtém todas as categorias
 */
export function getAllCategories() {
    return Object.values(CATEGORIES).sort((a, b) => a.priority - b.priority);
}

/**
 * Verifica se vídeo está disponível
 */
export function hasVideo(procedureId, language = LANGUAGES.PT_BR) {
    const procedure = getProcedureById(procedureId);
    return procedure?.video?.[language] != null;
}

export default FIRST_AID_PROCEDURES;
