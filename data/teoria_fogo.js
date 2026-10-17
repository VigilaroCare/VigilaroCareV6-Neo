// Nomes de ícones resolvidos via NeoIcon (Phosphor) — passamos string,
// não component refs, pra não amarrar o data layer à biblioteca.
// O nome viaja como string e a tela renderiza com <NeoIcon name={item.icon} />.

export const TEORIA_FOGO_DATA = {
    'triangulo': {
        rotuloComoIdentificar: 'Os três elementos', rotuloComoIdentificar_en: 'The three elements', rotuloComoIdentificar_es: 'Los tres elementos',
        rotuloExemplos: 'Como apagar', rotuloExemplos_en: 'How to put it out', rotuloExemplos_es: 'Cómo apagarlo',
        titulo: 'O Triângulo do Fogo',
        titulo_en: 'The Fire Triangle',
        titulo_es: 'El Triángulo del Fuego',
        subtitulo: 'Conceitos Básicos',
        subtitulo_en: 'Basic Concepts',
        subtitulo_es: 'Conceptos Básicos',
        icon: 'Triangle',
        iconColor: '#EF4444', // Red
        bg: '#FEE2E2', // Red 100
        imagemUrl: require('../assets/illustrations/pad/ambientes-casa_forma-de-gota-de-gua-tempestade-previs-o_017.jpg'),
        definicao: 'Para que o fogo exista, são necessários três elementos: Combustível, Comburente (Oxigênio) e Calor. Se retirar um, o fogo apaga.',
        definicao_en: 'For fire to exist, three elements are needed: Fuel, Oxidizer (Oxygen) and Heat. Remove one and the fire goes out.',
        definicao_es: 'Para que exista fuego se necesitan tres elementos: Combustible, Comburente (Oxígeno) y Calor. Si se retira uno, el fuego se apaga.',
        importancia: 'Entender como o fogo começa é o primeiro passo para saber como apagá-lo ou preveni-lo.', importancia_es: 'Entender cómo comienza el fuego es el primer paso para saber cómo apagarlo o prevenirlo.', importancia_en: 'Understanding how fire starts is the first step to knowing how to put it out or prevent it.',
        comoIdentificar: [
            'Combustível: O que queima (papel, madeira, gás).',
            'Comburente: O ar que respiramos (Oxigênio).',
            'Calor: A faísca ou chama inicial.'
        ],
        comoIdentificar_en: [
            'Fuel: what burns (paper, wood, gas).',
            'Oxidizer: the air we breathe (oxygen).',
            'Heat: the initial spark or flame.'
        ],
        comoIdentificar_es: [
            'Combustible: lo que arde (papel, madera, gas).',
            'Comburente: el aire que respiramos (oxígeno).',
            'Calor: la chispa o llama inicial.'
        ],
        exemplos: [
            'Abafamento: Retira o Oxigênio (ex: tampar a panela).',
            'Resfriamento: Retira o Calor (ex: jogar água — nunca em óleo de cozinha nem em equipamento elétrico ligado).',
            'Isolamento: Retira o Combustível (ex: fechar o gás).'
        ],
        exemplos_en: [
            'Smothering: removes the oxygen (e.g. putting a lid on the pan).',
            'Cooling: removes the heat (e.g. water — never on cooking oil or live electrical equipment).',
            'Starving: removes the fuel (e.g. shutting off the gas).'
        ],
        exemplos_es: [
            'Sofocación: retira el oxígeno (p. ej., tapar la olla).',
            'Enfriamiento: retira el calor (p. ej., agua — nunca en aceite de cocina ni en equipos eléctricos conectados).',
            'Aislamiento: retira el combustible (p. ej., cerrar el gas).'
        ]
    },
    'classes': {
        rotuloComoIdentificar: 'As classes no seu país', rotuloComoIdentificar_en: 'Classes in your country', rotuloComoIdentificar_es: 'Las clases en su país',
        titulo: 'Classes de Incêndio',
        titulo_en: 'Classes of Fire',
        titulo_es: 'Clases de Incendio',
        subtitulo: 'Tipos de Fogo',
        subtitulo_en: 'Types of Fire',
        subtitulo_es: 'Tipos de Fuego',
        icon: 'Fire',
        iconColor: '#F59E0B', // Orange
        bg: '#FEF3C7', // Orange 100
        imagemUrl: require('../assets/illustrations/pad/queimaduras-fogo_classes-de-incendio-tipos_005.jpg'),
        definicao: 'O fogo é classificado pelo tipo de material que está queimando, e cada classe pede um extintor diferente. As letras seguem {{FIRE_STANDARD}}: mudam de um país para outro.',
        definicao_en: 'Fire is classified by the type of material that is burning, and each class calls for a different extinguisher. The letters follow {{FIRE_STANDARD}}: they change from one country to another.',
        definicao_es: 'El fuego se clasifica según el material que arde, y cada clase requiere un extintor distinto. Las letras siguen {{FIRE_STANDARD}}: cambian de un país a otro.',
        definicao_ptpt: 'O fogo é classificado pelo tipo de material que está a arder, e cada classe pede um extintor diferente. As letras seguem {{FIRE_STANDARD}}: mudam de um país para outro.',
        importancia: 'Usar o extintor errado (ex.: água em fogo elétrico ou em óleo de cozinha) pode ser fatal.',
        importancia_en: 'Using the wrong extinguisher (e.g. water on an electrical or cooking-oil fire) can be fatal.',
        importancia_es: 'Usar el extintor equivocado (p. ej., agua en un fuego eléctrico o de aceite de cocina) puede ser fatal.',
        importancia_ptpt: 'Usar o extintor errado (ex.: água em fogo elétrico ou em óleo de cozinha) pode ser fatal.',
        // Fonte unica: data/classesIncendio.js, pela norma do PAIS (D16).
        comoIdentificar: [
            '{{FIRE_CLASS_SOLIDS}}',
            '{{FIRE_CLASS_LIQUIDS}}',
            '{{FIRE_CLASS_GASES}}',
            '{{FIRE_CLASS_ELECTRICAL}}',
            '{{FIRE_CLASS_METALS}}',
            '{{FIRE_CLASS_COOKING}}'
        ]
    },
    'extintores': {
        rotuloComoIdentificar: 'Tipos e para que servem', rotuloComoIdentificar_en: 'Types and what they cover', rotuloComoIdentificar_es: 'Tipos y para qué sirven',
        rotuloComoEvitar: 'Manutenção', rotuloComoEvitar_en: 'Maintenance', rotuloComoEvitar_es: 'Mantenimiento',
        titulo: 'Tipos de Extintores',
        titulo_en: 'Types of Extinguishers',
        titulo_es: 'Tipos de Extintores',
        subtitulo: 'Como Escolher',
        subtitulo_en: 'How to Choose',
        subtitulo_es: 'Cómo Elegir',
        icon: 'Drop',
        iconColor: '#3B82F6', // Blue
        bg: '#DBEAFE', // Blue 100
        imagemUrl: require('../assets/illustrations/pad/queimaduras-fogo_classes-de-incendio-tipos_005.jpg'),
        definicao: 'Cilindros com agentes específicos para combater cada classe de fogo. O rótulo do extintor diz para quais classes ele serve.',
        definicao_en: 'Cylinders with specific agents for each class of fire. The extinguisher label tells you which classes it covers.',
        definicao_es: 'Cilindros con agentes específicos para cada clase de fuego. La etiqueta del extintor indica para qué clases sirve.',
        importancia: 'O extintor de pó ABC é o mais versátil para residências: {{EXTINGUISHER_ABC_COVERS}}.',
        importancia_en: 'The ABC powder extinguisher is the most versatile for homes: it {{EXTINGUISHER_ABC_COVERS}}.',
        importancia_es: 'El extintor de polvo ABC es el más versátil para el hogar: {{EXTINGUISHER_ABC_COVERS}}.',
        // Fonte unica: data/classesIncendio.js, pela norma do PAIS (D16).
        comoIdentificar: [
            'Água (A): só para sólidos (papel, madeira, tecido). NUNCA em equipamento elétrico ligado nem em óleo de cozinha.',
            '{{EXTINGUISHER_BC}}',
            '{{EXTINGUISHER_ABC}}',
            '{{EXTINGUISHER_CO2}}'
        ],
        comoIdentificar_en: [
            'Water (A): solids only (paper, wood, fabric). NEVER on live electrical equipment or cooking oil.',
            '{{EXTINGUISHER_BC}}',
            '{{EXTINGUISHER_ABC}}',
            '{{EXTINGUISHER_CO2}}'
        ],
        comoIdentificar_es: [
            'Agua (A): solo para sólidos (papel, madera, tela). NUNCA en equipos eléctricos conectados ni en aceite de cocina.',
            '{{EXTINGUISHER_BC}}',
            '{{EXTINGUISHER_ABC}}',
            '{{EXTINGUISHER_CO2}}'
        ],
        // Inspecao mensal pelo usuario e manutencao anual por empresa
        // credenciada atendem NBR 12962 (BR), NFPA 10 (EUA), NP 4413 (PT) e
        // RD 513/2017 (ES, que pede verificacao trimestral — a mensal cobre).
        comoEvitar: [
            'Todo mês: o ponteiro do manômetro deve estar na faixa verde e o lacre, intacto.',
            'Uma vez por ano: manutenção (inspeção e recarga) por empresa credenciada.',
            'Confira a data no rótulo ou na etiqueta de manutenção; extintor vencido não é garantia de funcionar.'
        ],
        comoEvitar_en: [
            'Every month: the gauge needle should be in the green zone and the tamper seal intact.',
            'Once a year: maintenance (inspection and recharge) by a certified company.',
            'Check the date on the label or maintenance tag; an expired extinguisher is no guarantee it will work.'
        ],
        comoEvitar_es: [
            'Cada mes: la aguja del manómetro debe estar en la zona verde y el precinto, intacto.',
            'Una vez al año: mantenimiento (revisión y recarga) por una empresa autorizada.',
            'Revise la fecha en la etiqueta de mantenimiento; un extintor vencido no garantiza que funcione.'
        ]
    },
    'transmissao': {
        rotuloComoIdentificar: 'As três formas', rotuloComoIdentificar_en: 'The three ways', rotuloComoIdentificar_es: 'Las tres formas',
        titulo: 'Transmissão de Calor',
        titulo_en: 'Heat Transmission',
        titulo_es: 'Transmisión de Calor',
        subtitulo: 'Como o fogo se espalha',
        subtitulo_en: 'How fire spreads',
        subtitulo_es: 'Cómo se propaga el fuego',
        icon: 'Flash',
        iconColor: '#9333EA', // Purple
        bg: '#F3E8FF',
        imagemUrl: require('../assets/illustrations/pad/queimaduras-fogo_combustao_006.jpg'),
        definicao: 'O calor gerado por um incêndio pode se transferir para outros materiais de três maneiras principais.',
        definicao_en: 'Heat generated by a fire can transfer to other materials in three main ways.',
        definicao_es: 'El calor generado por un incendio puede transferirse a otros materiales de tres formas.',
        importancia: 'Conhecer as formas de propagação ajuda a conter o incêndio mais rapidamente e evitar que atinja novos cômodos.',
        importancia_en: 'Knowing how it spreads helps contain the fire faster and prevents it from reaching new rooms.',
        importancia_es: 'Saber cómo se propaga ayuda a contener el fuego más rápido.',
        comoIdentificar: [
            'Irradiação: Ondas de calor que viajam pelo ar e aquecem objetos próximos (ex: sentir o calor do sol ou da lareira a distância).',
            'Condução: O calor viaja através de materiais sólidos, como metais ou paredes, incendiando materiais do outro lado.',
            'Convecção: Gases e fumaça quentes sobem, se acumulam no teto e se espalham pelo ambiente.'
        ],
        comoIdentificar_en: [
            'Radiation: Heat waves traveling through air (e.g., feeling a fireplace from afar).',
            'Conduction: Heat traveling through solid materials like metals.',
            'Convection: Hot gases rising and spreading across the ceiling.'
        ],
        comoIdentificar_es: [
            'Radiación: Ondas de calor que viajan por el aire.',
            'Conducción: Calor que viaja a través de materiales sólidos.',
            'Convección: Gases calientes que suben y se acumulan en el techo.'
        ]
    },
    'combate': {
        rotuloComoIdentificar: 'Métodos de extinção', rotuloComoIdentificar_en: 'Extinguishing methods', rotuloComoIdentificar_es: 'Métodos de extinción',
        titulo: 'Tipos de Combate',
        titulo_en: 'Types of Firefighting',
        titulo_es: 'Tipos de Combate',
        subtitulo: 'Ação direta',
        subtitulo_en: 'Direct action',
        subtitulo_es: 'Acción directa',
        icon: 'ShieldSlash',
        iconColor: '#059669', // Emerald
        bg: '#D1FAE5',
        imagemUrl: require('../assets/illustrations/pad/queimaduras-fogo_incendio-chamas_007.jpg'),
        definicao: 'Extinguir o fogo significa quebrar o Triângulo do Fogo.',
        definicao_en: 'Extinguishing fire means breaking the Fire Triangle.',
        definicao_es: 'Extinguir el fuego significa romper el Triángulo del Fuego.',
        importancia: 'Cada tipo de incêndio exige a quebra de um elemento específico para ser apagado com segurança.',
        importancia_en: 'Each type of fire requires breaking a specific element to be safely extinguished.',
        importancia_es: 'Cada tipo de fuego exige romper un elemento específico.',
        comoIdentificar: [
            'Abafamento: Consiste em retirar o Oxigênio (comburente). Exemplo: cobrir uma panela em chamas com uma tampa ou usar um cobertor contra chamas.',
            'Resfriamento: Consiste em retirar o Calor. O método mais comum é aplicar água sobre as chamas — nunca em óleo de cozinha nem em equipamento elétrico ligado.',
            'Retirada do Material (Isolamento): Consiste em retirar o material Combustível. Exemplo: desligar o disjuntor elétrico ou fechar o registro do gás.'
        ],
        comoIdentificar_en: [
            'Smothering: Removing Oxygen. E.g., covering a burning pan with a lid.',
            'Cooling: Removing Heat. Applying water is the most common method — never on cooking oil or live electrical equipment.',
            'Starving: Removing Fuel. E.g., turning off the gas valve.'
        ],
        comoIdentificar_es: [
            'Sofocación: Consiste en retirar el Oxígeno. Ej: tapar una olla.',
            'Enfriamiento: Retirar el Calor, normalmente con agua — nunca en aceite de cocina ni en equipos eléctricos conectados.',
            'Aislamiento: Retirar el Combustible. Ej: cerrar el gas.'
        ]
    }
};
