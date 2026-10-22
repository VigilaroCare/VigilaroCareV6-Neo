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
    // D15 (19/10/2026). Bateria de íon-lítio NÃO é Classe D (ver classesIncendio.js).
    // Cada orientação vem de fonte oficial: NFPA (EUA), London Fire Brigade (Reino
    // Unido), Corpo de Bombeiros Militar do RJ e FAA (aviação, EUA). Sem número
    // ou estatística que não tenha fonte verificada. Não ensina a combater: a
    // orientação de todas as fontes é sair e chamar os bombeiros.
    'baterias': {
        rotuloComoIdentificar: 'Sinais de perigo', rotuloComoIdentificar_en: 'Warning signs', rotuloComoIdentificar_es: 'Señales de peligro',
        rotuloComoEvitar: 'Como recarregar e guardar', rotuloComoEvitar_en: 'Charging and storing', rotuloComoEvitar_es: 'Cómo cargar y guardar',
        rotuloComoAgir: 'Se esquentar, soltar fumaça ou pegar fogo', rotuloComoAgir_en: 'If it overheats, smokes or catches fire', rotuloComoAgir_es: 'Si se calienta, echa humo o se incendia',
        rotuloFontes: 'Fontes', rotuloFontes_en: 'Sources', rotuloFontes_es: 'Fuentes',
        titulo: 'Baterias de Lítio',
        titulo_en: 'Lithium Batteries',
        titulo_es: 'Baterías de Litio',
        subtitulo: 'Celular, patinete, bicicleta elétrica, power bank',
        subtitulo_en: 'Phones, e-scooters, e-bikes, power banks',
        subtitulo_es: 'Teléfono, patinete, bicicleta eléctrica, batería portátil',
        subtitulo_ptpt: 'Telemóvel, trotinete, bicicleta elétrica, power bank',
        icon: 'Flash',
        iconColor: '#B45309', // Amber 700
        bg: '#FEF3C7',
        imagemUrl: require('../assets/illustrations/pad/Carregadores-e-cabos.jpg'),
        definicao: 'Celular, notebook, power bank, patinete e bicicleta elétrica usam baterias de íon-lítio. Quando uma bateria é danificada, sobrecarregada ou superaquece, pode entrar em fuga térmica: a reação se alimenta sozinha, solta gases tóxicos e inflamáveis, passa para as células vizinhas e pode reacender depois de parecer apagada.',
        definicao_en: 'Phones, laptops, power banks, e-scooters and e-bikes run on lithium-ion batteries. When a battery is damaged, overcharged or overheats, it can go into thermal runaway: the reaction feeds itself, releases toxic and flammable gases, spreads to neighbouring cells and can reignite after it seems to be out.',
        definicao_es: 'El teléfono, el portátil, la batería portátil, el patinete y la bicicleta eléctrica usan baterías de iones de litio. Cuando una batería se daña, se sobrecarga o se sobrecalienta, puede entrar en fuga térmica: la reacción se alimenta sola, libera gases tóxicos e inflamables, pasa a las celdas vecinas y puede reavivarse después de parecer apagada.',
        definicao_ptpt: 'Telemóvel, portátil, power bank, trotinete e bicicleta elétrica usam baterias de iões de lítio. Quando uma bateria é danificada, sobrecarregada ou sobreaquece, pode entrar em fuga térmica: a reação alimenta-se sozinha, liberta gases tóxicos e inflamáveis, passa para as células vizinhas e pode reacender depois de parecer apagada.',
        importancia: 'Bateria de íon-lítio não é Classe D. O fogo dela é muito quente e se espalha rápido — por isso a orientação dos bombeiros é sair e chamá-los, nunca tentar apagar.',
        importancia_en: 'A lithium-ion battery is not a Class D fire. It burns extremely hot and spreads fast — which is why fire services say to get out and call them, never to try to put it out.',
        importancia_es: 'Una batería de iones de litio no es Clase D. Su fuego es muy caliente y se propaga rápido — por eso los bomberos indican salir y llamarlos, nunca intentar apagarlo.',
        importancia_ptpt: 'Uma bateria de iões de lítio não é Classe D. O fogo é muito quente e propaga-se depressa — por isso a indicação dos bombeiros é sair e chamá-los, nunca tentar apagar.',
        comoIdentificar: [
            'Pare de usar e de recarregar se a bateria soltar fumaça ou cheiro estranho, esquentar além do normal, mudar de cor ou de formato (ficar estufada), vazar ou deixar de recarregar.',
            'Bateria que caiu, sofreu impacto, amassou ou molhou merece atenção: o dano interno pode causar curto-circuito depois.',
        ],
        comoIdentificar_en: [
            'Stop using and charging the battery if it gives off smoke or an unusual smell, gets hotter than normal, changes colour or shape (becomes swollen), leaks or stops taking a charge.',
            'A battery that has been dropped, hit, dented or got wet needs attention: internal damage can cause a short circuit later.',
        ],
        comoIdentificar_es: [
            'Deje de usar y de cargar la batería si echa humo u olor extraño, se calienta más de lo normal, cambia de color o de forma (se hincha), pierde líquido o deja de cargar.',
            'Una batería que se cayó, recibió un golpe, se abolló o se mojó merece atención: el daño interno puede causar un cortocircuito después.',
        ],
        comoIdentificar_ptpt: [
            'Pare de usar e de carregar se a bateria libertar fumo ou cheiro estranho, aquecer além do normal, mudar de cor ou de forma (ficar inchada), verter ou deixar de carregar.',
            'Uma bateria que caiu, sofreu um impacto, amolgou ou se molhou merece atenção: o dano interno pode causar um curto-circuito mais tarde.',
        ],
        comoEvitar: [
            'Use o carregador original ou um aprovado pelo fabricante.',
            'Ligue direto na tomada da parede — sem extensão nem filtro de linha — e um aparelho por tomada.',
            'Não deixe recarregando de madrugada nem sem alguém por perto; tire da tomada quando completar.',
            'Recarregue sobre superfície dura e que não queime, longe de cama, sofá, cortinas e papéis.',
            'Patinete e bicicleta elétrica: recarregue e guarde fora do caminho de saída — nunca no corredor, junto à porta ou embaixo da escada.',
            'Tenha detector de fumaça no lugar onde recarrega patinete ou bicicleta elétrica.',
            'Recarregue em temperatura ambiente (entre 0 °C e 40 °C) e não deixe a bateria ao sol ou dentro do carro quente.',
            'Compre equipamento e bateria com {{CERT_SEAL}}, de vendedor confiável; conserto, só com profissional.',
            'Não jogue bateria no lixo comum: leve a um ponto de coleta.',
        ],
        comoEvitar_en: [
            'Use the original charger or one approved by the manufacturer.',
            'Plug it straight into a wall socket — no extension cord or power strip — and one device per socket.',
            'Do not leave it charging overnight or unattended; unplug it when it is full.',
            'Charge on a hard surface that will not burn, away from beds, sofas, curtains and paper.',
            'E-scooters and e-bikes: charge and store them away from your way out — never in the hallway, by the door or under the stairs.',
            'Fit a smoke alarm where you charge an e-scooter or e-bike.',
            'Charge at room temperature (between 0 °C and 40 °C) and do not leave the battery in the sun or in a hot car.',
            'Buy devices and batteries with {{CERT_SEAL}}, from a trusted seller; repairs only by a professional.',
            'Do not throw batteries in the household rubbish: take them to a collection point.',
        ],
        comoEvitar_es: [
            'Use el cargador original o uno aprobado por el fabricante.',
            'Enchufe directo a la toma de la pared — sin alargador ni regleta — y un aparato por toma.',
            'No lo deje cargando de madrugada ni sin nadie cerca; desenchúfelo cuando termine.',
            'Cargue sobre una superficie dura que no arda, lejos de camas, sofás, cortinas y papeles.',
            'Patinete y bicicleta eléctrica: cárguelos y guárdelos fuera del camino de salida — nunca en el pasillo, junto a la puerta ni bajo la escalera.',
            'Tenga un detector de humo donde carga el patinete o la bicicleta eléctrica.',
            'Cargue a temperatura ambiente (entre 0 °C y 40 °C) y no deje la batería al sol ni dentro del coche caliente.',
            'Compre aparatos y baterías con {{CERT_SEAL}}, de un vendedor de confianza; las reparaciones, solo con un profesional.',
            'No tire las baterías a la basura común: llévelas a un punto de recogida.',
        ],
        comoEvitar_ptpt: [
            'Use o carregador original ou um aprovado pelo fabricante.',
            'Ligue diretamente à tomada da parede — sem extensão nem ficha tripla — e um aparelho por tomada.',
            'Não deixe a carregar durante a noite nem sem ninguém por perto; desligue da tomada quando terminar.',
            'Carregue sobre uma superfície dura que não arda, longe de camas, sofás, cortinados e papéis.',
            'Trotinete e bicicleta elétrica: carregue e guarde fora do caminho de saída — nunca no corredor, junto à porta ou debaixo da escada.',
            'Tenha um detetor de fumo no local onde carrega a trotinete ou a bicicleta elétrica.',
            'Carregue à temperatura ambiente (entre 0 °C e 40 °C) e não deixe a bateria ao sol nem dentro do carro quente.',
            'Compre equipamentos e baterias com {{CERT_SEAL}}, a um vendedor de confiança; reparações, só com um profissional.',
            'Não deite baterias no lixo comum: leve-as a um ponto de recolha.',
        ],
        comoAgir: [
            'Se só esquentou ou está com cheiro estranho: pare de usar e tire da tomada, se der para fazer isso sem se arriscar.',
            'Se soltar fumaça ou pegar fogo: saia do cômodo, feche a porta, tire todos de casa e ligue para os bombeiros ({{FIRE_NUMBER}}).',
            'Não tente apagar e não respire a fumaça: o fogo da bateria é muito quente, os gases são tóxicos e ela pode reacender.',
            'No avião: avise a tripulação na hora — ela tem procedimento e equipamento próprios.',
        ],
        comoAgir_en: [
            'If it only got hot or smells odd: stop using it and unplug it, if you can do that without putting yourself at risk.',
            'If it smokes or catches fire: leave the room, close the door, get everyone out and call the fire service ({{FIRE_NUMBER}}).',
            'Do not try to put it out and do not breathe the smoke: the fire is extremely hot, the gases are toxic and it can reignite.',
            'On a plane: tell the cabin crew right away — they have their own procedure and equipment.',
        ],
        comoAgir_es: [
            'Si solo se calentó o huele raro: deje de usarla y desenchúfela, si puede hacerlo sin arriesgarse.',
            'Si echa humo o se incendia: salga de la habitación, cierre la puerta, saque a todos de la casa y llame a los bomberos ({{FIRE_NUMBER}}).',
            'No intente apagarla y no respire el humo: el fuego es muy caliente, los gases son tóxicos y puede reavivarse.',
            'En el avión: avise de inmediato a la tripulación — tiene su propio procedimiento y equipo.',
        ],
        comoAgir_ptpt: [
            'Se apenas aqueceu ou tem um cheiro estranho: pare de usar e desligue da tomada, se o puder fazer sem se arriscar.',
            'Se libertar fumo ou pegar fogo: saia da divisão, feche a porta, tire todos de casa e ligue para os bombeiros ({{FIRE_NUMBER}}).',
            'Não tente apagar e não respire o fumo: o fogo da bateria é muito quente, os gases são tóxicos e pode reacender.',
            'No avião: avise de imediato a tripulação — tem procedimento e equipamento próprios.',
        ],
        fontes: [
            'NFPA — Associação Nacional de Proteção contra Incêndio (EUA): orientações sobre baterias de íon-lítio e micromobilidade.',
            'London Fire Brigade (Reino Unido): campanha #ChargeSafe.',
            'Corpo de Bombeiros Militar do Estado do Rio de Janeiro: orientações sobre carregamento de bicicletas e patinetes elétricos.',
            'FAA — autoridade de aviação civil dos EUA: alerta de segurança sobre baterias de lítio a bordo (SAFO 25002).',
        ],
        fontes_en: [
            'NFPA — National Fire Protection Association (US): lithium-ion battery and micromobility safety guidance.',
            'London Fire Brigade (UK): #ChargeSafe campaign.',
            'Rio de Janeiro State Military Fire Department (Brazil): guidance on charging e-bikes and e-scooters.',
            'FAA — US Federal Aviation Administration: safety alert on lithium batteries on board (SAFO 25002).',
        ],
        fontes_es: [
            'NFPA — Asociación Nacional de Protección contra el Fuego (EE. UU.): orientaciones sobre baterías de iones de litio y micromovilidad.',
            'London Fire Brigade (Reino Unido): campaña #ChargeSafe.',
            'Cuerpo de Bomberos Militar del Estado de Río de Janeiro (Brasil): orientaciones sobre la carga de bicicletas y patinetes eléctricos.',
            'FAA — autoridad de aviación civil de EE. UU.: alerta de seguridad sobre baterías de litio a bordo (SAFO 25002).',
        ],
        fontes_ptpt: [
            'NFPA — Associação Nacional de Proteção contra Incêndios (EUA): orientações sobre baterias de iões de lítio e micromobilidade.',
            'London Fire Brigade (Reino Unido): campanha #ChargeSafe.',
            'Corpo de Bombeiros Militar do Estado do Rio de Janeiro (Brasil): orientações sobre o carregamento de bicicletas e trotinetes elétricas.',
            'FAA — autoridade de aviação civil dos EUA: alerta de segurança sobre baterias de lítio a bordo (SAFO 25002).',
        ],
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
