/**
 * animais_ciatox.js
 * Dados de animais peçonhentos baseados nas diretrizes do CIATOX/PR e SESA.
 * Atualizado com lista nacional e estrutura rica para UI Premium.
 * Vigilaro Care V5
 */

// Catálogo detalhado para o Guia Geral
export const animaisCatalog = [
    {
        id: "jararaca",
        nomePopular: "Jararaca",
        nomePopular_en: "Jararaca Pit Viper",
        nomePopular_es: "Jararaca",
        nomeCientifico: "Bothrops jararaca",
        emoji: "🐍",
        nivelPerigo: "Muito Alto",
        nivelPerigo_en: "Very High",
        nivelPerigo_es: "Muy Alto",
        descricao: "Serpente venenosa responsável por cerca de 90% dos acidentes ofídicos no Brasil. Possui coloração marrom-acinzentada com manchas triangulares escuras.",
        descricao_en: "Venomous snake responsible for approximately 90% of snakebite incidents in Brazil. Features gray-brown coloring with dark triangular markings.",
        descricao_es: "Serpiente venenosa responsable de aproximadamente el 90% de los accidentes ofídicos en Brasil. Tiene coloración marrón grisácea con manchas triangulares oscuras.",
        habitat: "Áreas rurais, matas, plantações, pilhas de lenha e entulho. Comum em todo o Brasil, exceto Amazônia central.",
        habitat_en: "Rural areas, forests, plantations, woodpiles and debris. Common throughout Brazil, except central Amazon.",
        habitat_es: "Áreas rurales, bosques, plantaciones, pilas de leña y escombros. Común en todo Brasil, excepto Amazonía central.",
        comportamento: "Geralmente não é agressiva, mas ataca quando se sente ameaçada. Mais ativa ao entardecer e à noite.",
        comportamento_en: "Generally not aggressive, but strikes when feeling threatened. Most active at dusk and during the night.",
        comportamento_es: "Generalmente no es agresiva, pero ataca cuando se siente amenazada. Más activa al atardecer y durante la noche.",
        tipoVeneno: "Veneno Proteolítico e Coagulante",
        tipoVeneno_en: "Proteolytic and Coagulant Venom",
        tipoVeneno_es: "Veneno Proteolítico y Coagulante",
        efeito: "Causa necrose local, hemorragia e alteração da coagulação sanguínea.",
        efeito_en: "Causes local necrosis, hemorrhage and blood coagulation disorders.",
        efeito_es: "Causa necrosis local, hemorragia y alteración de la coagulación sanguínea.",
        sintomas: {
            "imediatos": [
                "Dor intensa no local da picada",
                "Inchaço progressivo",
                "Manchas roxas (equimoses)",
                "Sangramento no local"
            ],
            "tardios": [
                "Sangramento em gengivas e nariz",
                "Presença de sangue na urina",
                "Náuseas e vômitos",
                "Pressão baixa"
            ],
            "graves": [
                "Insuficiência renal aguda",
                "Choque hipovolêmico",
                "Necrose extensa com perda de tecidos",
                "Hemorragia cerebral"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Mantenha a vítima calma e deitada",
                "Chame o {{EMERGENCY_MEDICAL}} imediatamente",
                "Lave o local com água e sabão",
                "Mantenha o membro afetado em posição neutra",
                "Remova anéis, pulseiras e roupas apertadas",
                "Ofereça água para a vítima",
                "Se possível, fotografe o animal de longe",
                "Leve a vítima ao hospital IMEDIATAMENTE"
            ],
            "naoFazer": [
                "Fazer torniquete ou garrote",
                "Cortar ou furar o local da picada",
                "Sugar o veneno com a boca",
                "Aplicar gelo, folhas, pó de café ou qualquer substância",
                "Dar bebida alcoólica",
                "Tentar capturar ou matar a cobra",
                "Fazer a vítima correr ou se movimentar muito"
            ]
        },
        caracteristicas: [
            "Cabeça triangular e achatada",
            "Corpo robusto de 70cm a 1,5m",
            "Coloração marrom-acinzentada",
            "Manchas triangulares escuras ao longo do corpo",
            "Fosseta loreal (buraco) entre olho e narina",
            "Cauda curta e não enrolada"
        ],
        sintomas_en: {
            "imediatos": [
                "Intense pain at bite site",
                "Progressive swelling",
                "Purple spots (ecchymosis)",
                "Bleeding at the site"
            ],
            "tardios": [
                "Bleeding from gums and nose",
                "Blood in urine",
                "Nausea and vomiting",
                "Low blood pressure"
            ],
            "graves": [
                "Acute kidney failure",
                "Hypovolemic shock",
                "Extensive necrosis with tissue loss",
                "Cerebral hemorrhage"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor intenso en el lugar de la picadura",
                "Hinchazón progresiva",
                "Manchas moradas (equimosis)",
                "Sangrado en el lugar"
            ],
            "tardios": [
                "Sangrado en encías y nariz",
                "Presencia de sangre en la orina",
                "Náuseas y vómitos",
                "Presión baja"
            ],
            "graves": [
                "Insuficiencia renal aguda",
                "Choque hipovolémico",
                "Necrosis extensa con pérdida de tejidos",
                "Hemorragia cerebral"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Keep victim calm and lying down",
                "Call {{EMERGENCY_MEDICAL}} immediately",
                "Wash the site with soap and water",
                "Keep affected limb in a neutral position",
                "Remove rings, bracelets, and tight clothing",
                "Offer water to the victim",
                "If possible, photograph the animal from a distance",
                "Take victim to hospital IMMEDIATAMENTE"
            ],
            "naoFazer": [
                "Do not use a tourniquet",
                "Do not cut or puncture the bite site",
                "Do not suck venom with your mouth",
                "Do not apply ice, leaves, coffee grounds, or any substance",
                "Do not give alcoholic beverages",
                "Do not attempt to capture or kill the snake",
                "Do not make the victim run or move too much"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Mantenga a la víctima tranquila y acostada",
                "Llame a {{EMERGENCY_MEDICAL}} inmediatamente",
                "Lave el lugar con agua y jabón",
                "Mantenga el miembro afectado en posición neutra",
                "Quítese anillos, pulseras y ropa ajustada",
                "Ofrezca agua a la víctima",
                "Si es posible, fotografíe al animal de lejos",
                "Lleve a la víctima al hospital INMEDIATAMENTE"
            ],
            "naoFazer": [
                "No hacer torniquete o garrote",
                "No cortar ni perforar el lugar de la picadura",
                "No succionar el veneno con la boca",
                "No aplicar hielo, hojas, café en polvo o cualquier sustancia",
                "No dar bebidas alcohólicas",
                "No intentar capturar o matar a la serpiente",
                "No hacer que la víctima corra o se mueva mucho"
            ]
        },
        caracteristicas_en: [
            "Triangular, flattened head",
            "Robust body from 70cm to 1.5m",
            "Gray-brown coloration",
            "Dark triangular markings along the body",
            "Loreal pit (hole) between eye and nostril",
            "Short, uncoiled tail"
        ],
        caracteristicas_es: [
            "Cabeza triangular y achatada",
            "Cuerpo robusto de 70cm a 1.5m",
            "Coloración marrón-grisácea",
            "Manchas triangulares oscuras a lo largo del cuerpo",
            "Foseta loreal (agujero) entre ojo y narina",
            "Cola corta y no enrollada"
        ],
        periodoAtivo: "Mais ativa ao entardecer e durante a noite. No inverno, menos ativa.",
        periodoAtivo_en: "Most active at dusk and during the night. Less active in winter.",
        periodoAtivo_es: "Más activa al atardecer y durante la noche. En invierno, menos activa.",
        prevencao: [
            "Use botas de cano alto em áreas de risco",
            "Limpe terrenos e remova entulhos",
            "Mantenha jardins e gramas aparados",
            "Vede frestas e buracos em muros",
            "Use luvas ao manusear lenha ou entulho",
            "Ilumine caminhos durante a noite",
            "Evite acúmulo de lixo que atraia roedores"
        ],
        prevencao_en: [
            "Wear tall boots in risk areas",
            "Clear land and remove debris",
            "Keep gardens and lawns trimmed",
            "Seal cracks and holes in walls",
            "Wear gloves when handling firewood or debris",
            "Light pathways at night",
            "Avoid waste accumulation that attracts rodents"
        ],
        prevencao_es: [
            "Use botas altas en áreas de riesgo",
            "Limpie terrenos y retire escombros",
            "Mantenga jardines y césped recortados",
            "Selle grietas y agujeros en muros",
            "Use guantes al manipular leña o escombros",
            "Ilumine caminos durante la noche",
            "Evite acumulación de basura que atraiga roedores"
        ],
        tratamento: "O tratamento específico é feito com soro antibotrópico, disponível em hospitais de referência. Quanto mais rápido o atendimento, menor o risco de sequelas graves.",
        tratamento_en: "Specific treatment uses antibothropic serum, available at reference hospitals. The faster the care, the lower the risk of serious complications.",
        tratamento_es: "El tratamiento específico se realiza con suero antibotrópico, disponible en hospitales de referencia. Cuanto más rápida la atención, menor el riesgo de secuelas graves.",
        gravidade: "MUITO GRAVE - Pode levar à morte e causar sequelas permanentes, como perda de dedos ou membros. O atendimento rápido, com soro, reduz muito esse risco.",
        gravidade_en: "VERY SERIOUS - It can be fatal and cause permanent damage, such as loss of fingers or limbs. Prompt treatment with antivenom greatly reduces this risk.",
        gravidade_es: "MUY GRAVE - Puede ser mortal y causar secuelas permanentes, como pérdida de dedos o miembros. La atención rápida, con suero, reduce mucho ese riesgo.",
        imagem: require('../assets/sinitox/animais/bj_jararaca.jpg'),
        tipo: "cobra",
    },
    {
        id: "escorpiao_amarelo",
        nomePopular: "Escorpião Amarelo",
        nomePopular_en: "Yellow Scorpion",
        nomePopular_es: "Escorpión Amarillo",
        nomeCientifico: "Tityus serrulatus",
        emoji: "🦂",
        nivelPerigo: "Muito Alto",
        nivelPerigo_en: "Very High",
        nivelPerigo_es: "Muy Alto",
        descricao: "O escorpião mais perigoso do Brasil. Responsável por acidentes graves, principalmente em crianças. Reprodução assexuada facilita proliferação.",
        descricao_en: "The most dangerous scorpion in Brazil. Responsible for serious accidents, especially in children. Asexual reproduction facilitates proliferation.",
        descricao_es: "El escorpión más peligroso de Brasil. Responsable de accidentes graves, principalmente en niños. La reproducción asexual facilita la proliferación.",
        habitat: "Áreas urbanas, entulhos, madeiras empilhadas, dentro de casas (sapatos, roupas, camas). Preferem locais escuros e úmidos.",
        habitat_en: "Urban areas, debris, stacked wood, inside homes (shoes, clothes, beds). They prefer dark and humid places.",
        habitat_es: "Áreas urbanas, escombros, maderas apiladas, dentro de casas (zapatos, ropa, camas). Prefieren lugares oscuros y húmedos.",
        comportamento: "Hábitos noturnos. Durante o dia fica escondido. Não é agressiva, mas ferroa quando se sente ameaçado ou pressionado.",
        comportamento_en: "Nocturnal habits. Hides during the day. Not aggressive, but stings when feeling threatened or pressed.",
        comportamento_es: "Hábitos nocturnos. Durante el día permanece oculto. No es agresivo, pero pica cuando se siente amenazado o presionado.",
        tipoVeneno: "Neurotóxico",
        tipoVeneno_en: "Neurotoxic",
        tipoVeneno_es: "Neurotóxico",
        efeito: "Afeta sistema nervoso, causando dor intensa e alterações cardiovasculares e respiratórias graves.",
        efeito_en: "Affects the nervous system, causing intense pain and severe cardiovascular and respiratory changes.",
        efeito_es: "Afecta el sistema nervioso, causando dolor intenso y alteraciones cardiovasculares y respiratorias graves.",
        sintomas: {
            "imediatos": [
                "Dor local intensa e imediata",
                "Sensação de choque no local",
                "Suor excessivo",
                "Náuseas",
                "Agitação"
            ],
            "tardios": [
                "Vômitos intensos",
                "Salivação excessiva",
                "Tremores",
                "Visão turva"
            ],
            "graves": [
                "Arritmias cardíacas",
                "Edema pulmonar agudo",
                "Convulsões",
                "Insuficiência respiratória",
                "Morte (principalmente crianças)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar o local com água e sabão",
                "Aplicar compressa fria (NÃO gelo direto)",
                "Chamar o {{EMERGENCY_MEDICAL}} IMEDIATAMENTE",
                "Manter a pessoa calma",
                "Anotar hora do acidente",
                "Se possível, capturar o escorpião com cuidado",
                "Levar ao hospital urgentemente"
            ],
            "naoFazer": [
                "Fazer torniquete",
                "Cortar ou perfurar o local",
                "Aplicar qualquer substância",
                "Dar bebidas alcoólicas",
                "Apertar ou espremer o local"
            ]
        },
        caracteristicas: [
            "Coloração amarelo claro",
            "Tamanho: 6-7 cm",
            "Cauda com aguilhão venenoso",
            "Patas e cauda com serrilhas",
            "Fluorescente sob luz ultravioleta"
        ],
        sintomas_en: {
            "imediatos": [
                "Intense and immediate local pain",
                "Shock sensation at the site",
                "Excessive sweating",
                "Nausea",
                "Agitation"
            ],
            "tardios": [
                "Severe vomiting",
                "Excessive salivation",
                "Tremors",
                "Blurred vision"
            ],
            "graves": [
                "Cardiac arrhythmias",
                "Acute pulmonary edema",
                "Convulsions",
                "Respiratory failure",
                "Death (especially in children)"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local intenso e inmediato",
                "Sensación de choque en el lugar",
                "Sudoración excesiva",
                "Náuseas",
                "Agitación"
            ],
            "tardios": [
                "Vómitos intensos",
                "Salivación excesiva",
                "Temblores",
                "Visión borrosa"
            ],
            "graves": [
                "Arritmias cardíacas",
                "Edema pulmonar agudo",
                "Convulsiones",
                "Insuficiencia respiratoria",
                "Muerte (principalmente en niños)"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site with soap and water",
                "Apply cold compress (NOT direct ice)",
                "Call {{EMERGENCY_MEDICAL}} IMMEDIATELY",
                "Keep the person calm",
                "Note the time of the accident",
                "If possible, carefully capture the scorpion",
                "Take to the hospital urgently"
            ],
            "naoFazer": [
                "Do not use a tourniquet",
                "Do not cut or puncture the site",
                "Do not apply any substance",
                "Do not give alcoholic beverages",
                "Do not squeeze or press the site"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lavar el lugar con agua y jabón",
                "Aplicar compresa fría (NO hielo directo)",
                "Llamar a {{EMERGENCY_MEDICAL}} INMEDIATAMENTE",
                "Mantener a la persona tranquila",
                "Anotar la hora del accidente",
                "Si es posible, capturar cuidadosamente al escorpión",
                "Llevar al hospital urgentemente"
            ],
            "naoFazer": [
                "No hacer torniquete",
                "No cortar o perforar el lugar",
                "No aplicar ninguna sustancia",
                "No dar bebidas alcohólicas",
                "No apretar o exprimir el lugar"
            ]
        },
        caracteristicas_en: [
            "Light yellow coloration",
            "Size: 6-7 cm",
            "Tail with venomous stinger",
            "Legs and tail with serrations",
            "Fluorescent under ultraviolet light"
        ],
        caracteristicas_es: [
            "Coloración amarillo claro",
            "Tamaño: 6-7 cm",
            "Cola con aguijón venenoso",
            "Patas y cola con estrías",
            "Fluorescente bajo luz ultravioleta"
        ],
        periodoAtivo: "Principalmente à noite. Mais ativo em períodos quentes e chuvosos.",
        prevencao: [
            "Mantenha casa limpa e sem entulhos",
            "Vede frestas e buracos",
            "Sacuda roupas e sapatos antes de usar",
            "Use telas em ralos",
            "Afaste camas das paredes",
            "Evite acúmulo de lixo",
            "Use luvas ao mexer em entulhos"
        ],
        tratamento: "O soro antiescorpiônico está disponível em hospitais de referência, e a indicação é da equipe de saúde, conforme a gravidade. Em crianças a picada costuma ser mais grave: procure atendimento imediatamente, mesmo sem sintomas.",
        gravidade: "EXTREMAMENTE GRAVE em crianças menores de 7 anos. Pode levar à morte em 2-3 horas sem tratamento adequado.",
        imagem: require('../assets/sinitox/animais/ts_amarelo.jpg'),
        tipo: "escorpiao",
    },
    {
        id: "aranha_marrom",
        nomePopular: "Aranha Marrom",
        nomePopular_en: "Brown Recluse Spider",
        nomePopular_es: "Araña Marrón",
        nomeCientifico: "Loxosceles spp.",
        emoji: "🕷️",
        nivelPerigo: "Alto",
        nivelPerigo_en: "High",
        nivelPerigo_es: "Alto",
        descricao: "Aranha pequena mas muito venenosa. Acidentes podem causar necrose grave. Vive em ambientes domésticos.",
        descricao_en: "Small but highly venomous spider. Bites can cause severe necrosis. Lives in domestic environments.",
        descricao_es: "Araña pequeña pero muy venenosa. Los accidentes pueden causar necrosis grave. Vive en ambientes domésticos.",
        habitat: "Interior de residências, atrás de móveis, quadros, cortinas, roupas guardadas, sapatos, porões.",
        habitat_en: "Inside homes, behind furniture, picture frames, curtains, stored clothing, shoes, basements.",
        habitat_es: "Interior de residencias, detrás de muebles, cuadros, cortinas, ropa guardada, zapatos, sótanos.",
        comportamento: "Não é agressiva. Acidentes ocorrem quando a aranha é pressionada contra a pele (vestir roupas, calçar sapatos).",
        comportamento_en: "Not aggressive. Accidents occur when the spider is pressed against the skin (putting on clothes, wearing shoes).",
        comportamento_es: "No es agresiva. Los accidentes ocurren cuando la araña es presionada contra la piel (vestir ropa, calzar zapatos).",
        tipoVeneno: "Proteolítico e Hemolítico",
        tipoVeneno_en: "Proteolytic and Hemolytic",
        tipoVeneno_es: "Proteolítico y Hemolítico",
        efeito: "Causa necrose tecidual extensa e pode afetar rins e causar problemas de coagulação.",
        efeito_en: "Causes extensive tissue necrosis and can affect kidneys and cause coagulation problems.",
        efeito_es: "Causa necrosis tisular extensa y puede afectar riñones y causar problemas de coagulación.",
        sintomas: {
            "imediatos": [
                "Dor leve ou ausente no momento",
                "Marca de picada pouco visível",
                "Sensação de queimadura leve"
            ],
            "tardios": [
                "Vermelhidão e inchaço (após 12-24h)",
                "Bolhas na região",
                "Escurecimento da pele",
                "Febre"
            ],
            "graves": [
                "Necrose extensa da pele",
                "Insuficiência renal",
                "Anemia grave",
                "Icterícia",
                "Úlcera que demora meses para cicatrizar"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar o local com água e sabão",
                "Aplicar compressa fria",
                "Procurar atendimento médico IMEDIATO",
                "Se possível, capturar a aranha para identificação",
                "Anotar hora do acidente",
                "Manter área elevada"
            ],
            "naoFazer": [
                "Fazer torniquete",
                "Cortar ou furar",
                "Aplicar produtos caseiros",
                "Esperar sintomas piorarem"
            ]
        },
        caracteristicas: [
            "Coloração marrom clara",
            "Tamanho: corpo 8-15mm",
            "Desenho de violino no cefalotórax",
            "Seis olhos (3 pares)",
            "Pernas finas e longas"
        ],
        sintomas_en: {
            "imediatos": [
                "Mild or absent pain at the moment",
                "Barely visible bite mark",
                "Slight burning sensation"
            ],
            "tardios": [
                "Redness and swelling (after 12-24h)",
                "Blisters in the area",
                "Darkening of the skin",
                "Fever"
            ],
            "graves": [
                "Extensive skin necrosis",
                "Kidney failure",
                "Severe anemia",
                "Jaundice",
                "Ulcer that takes months to heal"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor leve o ausente en el momento",
                "Marca de picadura poco visible",
                "Ligera sensación de ardor"
            ],
            "tardios": [
                "Enrojecimiento e hinchazón (después de 12-24h)",
                "Ampollas en la zona",
                "Oscurecimiento de la piel",
                "Fiebre"
            ],
            "graves": [
                "Necrosis extensa de la piel",
                "Insuficiencia renal",
                "Anemia grave",
                "Ictericia",
                "Úlcera que tarda meses en sanar"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site with soap and water",
                "Apply cold compress",
                "Seek IMMEDIATE medical attention",
                "If possible, capture the spider for identification",
                "Note the time of the accident",
                "Keep area elevated"
            ],
            "naoFazer": [
                "Do not use a tourniquet",
                "Do not cut or puncture",
                "Do not apply homemade products",
                "Do not wait for symptoms to worsen"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lavar el lugar con agua y jabón",
                "Aplicar compresa fría",
                "Buscar atención médica INMEDIATA",
                "Si es posible, capturar la araña para identificación",
                "Anotar la hora del accidente",
                "Mantener el área elevada"
            ],
            "naoFazer": [
                "No hacer torniquete",
                "No cortar o perforar",
                "No aplicar productos caseros",
                "No esperar a que los síntomas empeoren"
            ]
        },
        caracteristicas_en: [
            "Light brown coloration",
            "Size: body 8-15mm",
            "Violin shape on the cephalothorax",
            "Six eyes (3 pairs)",
            "Long, thin legs"
        ],
        caracteristicas_es: [
            "Coloración marrón clara",
            "Tamaño: cuerpo 8-15mm",
            "Diseño de violín en el cefalotórax",
            "Seis ojos (3 pares)",
            "Piernas largas y delgadas"
        ],
        periodoAtivo: "Hábitos noturnos. Durante o dia fica escondida.",
        prevencao: [
            "Sacudir roupas e sapatos antes de usar",
            "Afastar camas das paredes",
            "Não acumular roupas em cantos",
            "Limpar atrás de móveis regularmente",
            "Vedar frestas em rodapés",
            "Guardar roupas em sacos plásticos fechados"
        ],
        tratamento: "Tratamento com soro antiaracnídeo nos casos graves. Pode necessitar desbridamento cirúrgico da necrose.",
        gravidade: "GRAVE - Pode causar necrose extensa necessitando cirurgia e enxertos. Cicatrizes permanentes são comuns.",
        imagem: require('../assets/sinitox/animais/li_marrom.jpg'),
        tipo: "aranha",
    },
    {
        id: "coral",
        nomePopular: "Cobra Coral",
        nomePopular_en: "Coral Snake",
        nomePopular_es: "Serpiente Coral",
        nomeCientifico: "Micrurus spp.",
        emoji: "🐍",
        nivelPerigo: "Muito Alto",
        nivelPerigo_en: "Very High",
        nivelPerigo_es: "Muy Alto",
        descricao: "Serpente extremamente venenosa. Possui anéis coloridos (vermelho, preto, branco/amarelo). Veneno neurotóxico potente pode causar paralisia respiratória.",
        descricao_en: "Extremely venomous snake. Features colored rings (red, black, white/yellow). Potent neurotoxic venom can cause respiratory paralysis.",
        descricao_es: "Serpiente extremadamente venenosa. Posee anillos coloridos (rojo, negro, blanco/amarillo). Veneno neurotóxico potente puede causar parálisis respiratoria.",
        habitat: "Matas, áreas rurais, jardins. Hábitos subterrâneos e noturnos. Encontrada em todo Brasil.",
        habitat_en: "Forests, rural areas, gardens. Underground and nocturnal habits. Found throughout Brazil.",
        habitat_es: "Bosques, áreas rurales, jardines. Hábitos subterráneos y nocturnos. Se encuentra en todo Brasil.",
        comportamento: "Geralmente dócil e tímida. Foge do ser humano. Acidentes raros mas muito graves. Boca pequena dificulta mordida.",
        comportamento_en: "Generally docile and shy. Flees from humans. Rare but very serious accidents. Small mouth makes biting difficult.",
        comportamento_es: "Generalmente dócil y tímida. Huye del ser humano. Accidentes raros pero muy graves. Boca pequeña dificulta mordedura.",
        tipoVeneno: "Neurotóxico",
        tipoVeneno_en: "Neurotoxic",
        tipoVeneno_es: "Neurotóxico",
        efeito: "Paralisa músculos, incluindo respiratórios. Pode causar insuficiência respiratória e morte.",
        efeito_en: "Paralyzes muscles, including respiratory ones. Can cause respiratory failure and death.",
        efeito_es: "Paraliza músculos, incluyendo respiratorios. Puede causar insuficiencia respiratoria y muerte.",
        sintomas: {
            "imediatos": [
                "Dor leve ou ausente no local",
                "Marca de picada discreta",
                "Visão dupla",
                "Pálpebras caídas (ptose)"
            ],
            "tardios": [
                "Dificuldade para engolir",
                "Fraqueza muscular progressiva",
                "Dificuldade respiratória",
                "Paralisia dos membros"
            ],
            "graves": [
                "Parada respiratória",
                "Morte por asfixia",
                "Necessidade de ventilação mecânica"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Chamar o {{EMERGENCY_MEDICAL}} URGENTEMENTE",
                "Manter vítima ABSOLUTAMENTE calma e deitada",
                "Imobilizar membro afetado",
                "Observar sinais respiratórios",
                "Transportar com urgência mesmo sem sintomas",
                "Fotografar cobra se possível (segurança)"
            ],
            "naoFazer": [
                "Fazer torniquete",
                "Cortar, perfurar ou sugar",
                "Dar bebidas ou alimentos",
                "Esperar sintomas aparecerem para buscar ajuda",
                "Perder tempo"
            ]
        },
        caracteristicas: [
            "Anéis coloridos: vermelho, preto, branco/amarelo",
            "Cabeça pequena, arredondada",
            "Corpo cilíndrico, tamanho 60-100cm",
            "Olhos pequenos",
            "Padrão: vermelho tocando amarelo/branco",
            "Não possui fosseta loreal"
        ],
        sintomas_en: {
            "imediatos": [
                "Mild or absent pain at the site",
                "Discrete bite mark",
                "Double vision",
                "Drooping eyelids (ptosis)"
            ],
            "tardios": [
                "Difficulty swallowing",
                "Progressive muscle weakness",
                "Difficulty breathing",
                "Paralysis of the limbs"
            ],
            "graves": [
                "Respiratory arrest",
                "Death by asphyxiation",
                "Need for mechanical ventilation"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor leve o ausente en el lugar",
                "Marca de picadura discreta",
                "Visión doble",
                "Párpados caídos (ptosis)"
            ],
            "tardios": [
                "Dificultad para tragar",
                "Debilidad muscular progresiva",
                "Dificultad para respirar",
                "Parálisis de las extremidades"
            ],
            "graves": [
                "Paro respiratorio",
                "Muerte por asfixia",
                "Necesidad de ventilación mecánica"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Call {{EMERGENCY_MEDICAL}} URGENTLY",
                "Keep victim ABSOLUTELY calm and lying down",
                "Immobilize affected limb",
                "Observe respiratory signs",
                "Transport urgently even without symptoms",
                "Photograph snake if possible (safety)"
            ],
            "naoFazer": [
                "Do not use a tourniquet",
                "Do not cut, puncture, or suck",
                "Do not give drinks or food",
                "Do not wait for symptoms to appear to seek help",
                "Do not waste time"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Llamar a {{EMERGENCY_MEDICAL}} URGENTEMENTE",
                "Mantener a la víctima ABSOLUTAMENTE tranquila y acostada",
                "Inmovilizar el miembro afectado",
                "Observar signos respiratorios",
                "Transportar urgentemente incluso sin síntomas",
                "Fotografiar serpiente si es posible (seguridad)"
            ],
            "naoFazer": [
                "No hacer torniquete",
                "No cortar, perforar ni succionar",
                "No dar bebidas o alimentos",
                "No esperar a que aparezcan los síntomas para buscar ayuda",
                "No perder el tiempo"
            ]
        },
        caracteristicas_en: [
            "Colored rings: red, black, white/yellow",
            "Small, rounded head",
            "Cylindrical body, size 60-100cm",
            "Small eyes",
            "Pattern: red touching yellow/white",
            "No loreal pit"
        ],
        caracteristicas_es: [
            "Anillos de colores: rojo, negro, blanco/amarillo",
            "Cabeza pequeña, redondeada",
            "Cuerpo cilíndrico, tamaño 60-100cm",
            "Ojos pequeños",
            "Patrón: rojo tocando amarillo/blanco",
            "No tiene foseta loreal"
        ],
        periodoAtivo: "Principalmente noturna e crepuscular. Hábitos subterrâneos.",
        prevencao: [
            "Botas de cano alto e perneiras",
            "Não mexer em folhas secas sem proteção",
            "Cuidado ao manusear lenha",
            "Não introduzir mãos em buracos",
            "Lanternas em caminhadas noturnas",
            "Manter jardins limpos"
        ],
        tratamento: "Soro anticoral (antielapídico). URGÊNCIA ABSOLUTA mesmo sem sintomas. Ventilação mecânica pode ser necessária.",
        gravidade: "EXTREMAMENTE GRAVE - Alta letalidade se não tratada rapidamente. Sintomas podem demorar horas para aparecer mas evolução é rápida.",
        imagem: require('../assets/sinitox/animais/mc_coral.jpg'),
        tipo: "cobra",
    },
    {
        id: "aranha_armadeira",
        nomePopular: "Aranha Armadeira",
        nomePopular_en: "Brazilian Wandering Spider",
        nomePopular_es: "Araña Armadeira",
        nomeCientifico: "Phoneutria spp.",
        emoji: "🕷️",
        nivelPerigo: "Muito Alto",
        nivelPerigo_en: "Very High",
        nivelPerigo_es: "Muy Alto",
        descricao: "Aranha agressiva e peçonhenta. Considerada uma das mais venenosas do mundo. Postura de ataque característica com patas dianteiras levantadas.",
        descricao_en: "Aggressive and venomous spider. Considered one of the most venomous in the world. Characteristic attack posture with front legs raised.",
        descricao_es: "Araña agresiva y venenosa. Considerada una de las más venenosas del mundo. Postura de ataque característica con patas delanteras levantadas.",
        habitat: "Bananeiras (daí o nome aranha-de-banana), áreas rurais, jardins, dentro de casas, sapatos, roupas.",
        habitat_en: "Banana trees (hence the name banana spider), rural areas, gardens, inside homes, shoes, clothing.",
        habitat_es: "Plataneras (de ahí el nombre araña del banano), áreas rurales, jardines, dentro de casas, zapatos, ropa.",
        comportamento: "Extremamente agressiva quando ameaçada. Não foge, assume postura de ataque. Pula em direção ao agressor.",
        comportamento_en: "Extremely aggressive when threatened. Does not flee, assumes attack posture. Jumps toward the aggressor.",
        comportamento_es: "Extremadamente agresiva cuando está amenazada. No huye, asume postura de ataque. Salta hacia el agresor.",
        tipoVeneno: "Neurotóxico",
        tipoVeneno_en: "Neurotoxic",
        tipoVeneno_es: "Neurotóxico",
        efeito: "Causa dor intensa, alterações cardiovasculares e neurológicas. Pode ser fatal em crianças.",
        efeito_en: "Causes intense pain, cardiovascular and neurological changes. Can be fatal in children.",
        efeito_es: "Causa dolor intenso, alteraciones cardiovasculares y neurológicas. Puede ser fatal en niños.",
        sintomas: {
            "imediatos": [
                "Dor muito intensa e imediata",
                "Sudorese no local",
                "Taquicardia",
                "Agitação",
                "Salivação excessiva"
            ],
            "tardios": [
                "Vômitos",
                "Diarreia",
                "Alteração da pressão arterial",
                "Arritmias"
            ],
            "graves": [
                "Edema pulmonar agudo",
                "Choque",
                "Priapismo (ereção prolongada e dolorosa)",
                "Morte (raro, mas possível em crianças)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar com água e sabão",
                "Compressa fria",
                "Chamar o {{EMERGENCY_MEDICAL}} imediatamente",
                "Manter pessoa calma",
                "Capturar aranha se possível (com segurança)",
                "Levar ao hospital urgentemente"
            ],
            "naoFazer": [
                "Fazer torniquete",
                "Cortar ou perfurar",
                "Aplicar substâncias",
                "Dar bebidas alcoólicas"
            ]
        },
        caracteristicas: [
            "Corpo grande: 4-5 cm sem pernas",
            "Pernas longas e robustas",
            "Coloração marrom-acinzentada",
            "Pelos densos nas pernas",
            "Quelíceras vermelhas",
            "Postura de ataque: patas dianteiras levantadas"
        ],
        sintomas_en: {
            "imediatos": [
                "Very intense and immediate pain",
                "Sweating at the site",
                "Tachycardia",
                "Agitation",
                "Excessive salivation"
            ],
            "tardios": [
                "Vomiting",
                "Diarrhea",
                "Blood pressure changes",
                "Arrhythmias"
            ],
            "graves": [
                "Acute pulmonary edema",
                "Shock",
                "Priapism (prolonged and painful erection)",
                "Death (rare, but possible in children)"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor muy intenso e inmediato",
                "Sudoración en el lugar",
                "Taquicardia",
                "Agitación",
                "Salivación excesiva"
            ],
            "tardios": [
                "Vómitos",
                "Diarrea",
                "Alteración de la presión arterial",
                "Arritmias"
            ],
            "graves": [
                "Edema pulmonar agudo",
                "Choque",
                "Priapismo (erección prolongada y dolorosa)",
                "Muerte (raro, pero posible en niños)"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash with soap and water",
                "Cold compress",
                "Call {{EMERGENCY_MEDICAL}} immediately",
                "Keep person calm",
                "Capture spider if possible (safely)",
                "Take to the hospital urgently"
            ],
            "naoFazer": [
                "Do not use a tourniquet",
                "Do not cut or puncture",
                "Do not apply substances",
                "Do not give alcoholic beverages"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lavar con agua y jabón",
                "Compresa fría",
                "Llamar a {{EMERGENCY_MEDICAL}} inmediatamente",
                "Mantener a la persona tranquila",
                "Capturar la araña si es posible (con seguridad)",
                "Llevar al hospital urgentemente"
            ],
            "naoFazer": [
                "No hacer torniquete",
                "No cortar ni perforar",
                "No aplicar sustancias",
                "No dar bebidas alcohólicas"
            ]
        },
        caracteristicas_en: [
            "Large body: 4-5 cm without legs",
            "Long, robust legs",
            "Gray-brown coloration",
            "Dense hairs on legs",
            "Red chelicerae",
            "Attack posture: front legs raised"
        ],
        caracteristicas_es: [
            "Cuerpo grande: 4-5 cm sin piernas",
            "Piernas largas y robustas",
            "Coloración marrón-grisácea",
            "Pelos densos en las patas",
            "Quelíceros rojos",
            "Postura de ataque: patas delanteras levantadas"
        ],
        periodoAtivo: "Principalmente noturna, mas pode ser encontrada durante o dia.",
        prevencao: [
            "Sacudir roupas, sapatos, toalhas",
            "Cuidado ao colher bananas",
            "Verificar calçados antes de usar",
            "Não andar descalço",
            "Usar luvas ao mexer em jardins",
            "Verificar roupas de cama",
            "Manter ambientes limpos"
        ],
        tratamento: "Soro antiaracnídico. Analgésicos para controle da dor intensa. Hospitalização recomendada.",
        gravidade: "MUITO GRAVE - Dor extrema, pode ser fatal em crianças. Acidentes são comuns por ser agressiva.",
        imagem: require('../assets/sinitox/animais/pp_armadeira.jpg'),
        tipo: "aranha",
    },
    {
        id: "lacraia",
        nomePopular: "Lacraia/Centopeia",
        nomePopular_en: "Centipede",
        nomePopular_es: "Ciempiés",
        nomeCientifico: "Scolopendra spp.",
        emoji: "🐛",
        nivelPerigo: "Médio",
        nivelPerigo_en: "Medium",
        nivelPerigo_es: "Medio",
        descricao: "Artrópode com corpo alongado e muitas pernas. Possui ferrão venenoso. Acidentes causam dor intensa mas raramente são graves.",
        descricao_en: "Arthropod with elongated body and many legs. Has a venomous stinger. Accidents cause intense pain but are rarely serious.",
        descricao_es: "Artrópodo con cuerpo alargado y muchas patas. Posee aguijón venenoso. Los accidentes causan dolor intenso pero raramente son graves.",
        habitat: "Locais úmidos e escuros: embaixo de pedras, madeiras, folhas. Jardins, porões, banheiros.",
        habitat_en: "Humid and dark places: under rocks, wood, leaves. Gardens, basements, bathrooms.",
        habitat_es: "Lugares húmedos y oscuros: debajo de piedras, maderas, hojas. Jardines, sótanos, baños.",
        comportamento: "Noturna. Rápida e agressiva quando perturbada. Morde com o primeiro par de patas modificado (forcípulas).",
        comportamento_en: "Nocturnal. Fast and aggressive when disturbed. Bites with the first pair of modified legs (forcipules).",
        comportamento_es: "Nocturna. Rápida y agresiva cuando es perturbada. Muerde con el primer par de patas modificado (forcípulas).",
        tipoVeneno: "Tóxico local",
        tipoVeneno_en: "Local Toxin",
        tipoVeneno_es: "Tóxico local",
        efeito: "Causa dor intensa, inflamação local e raramente sintomas sistêmicos.",
        efeito_en: "Causes intense pain, local inflammation and rarely systemic symptoms.",
        efeito_es: "Causa dolor intenso, inflamación local y raramente síntomas sistémicos.",
        sintomas: {
            "imediatos": [
                "Dor intensa e imediata",
                "Vermelhidão no local",
                "Inchaço",
                "Sensação de queimadura"
            ],
            "tardios": [
                "Dor pode durar até 48 horas",
                "Edema persistente",
                "Raramente náuseas"
            ],
            "graves": [
                "Infecção secundária",
                "Reações alérgicas (raro)",
                "Necrose local (muito raro)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar com água e sabão",
                "Compressa fria para aliviar dor",
                "Analgésico oral se necessário",
                "Observar sinais de infecção",
                "Procurar médico se sintomas graves"
            ],
            "naoFazer": [
                "Fazer torniquete",
                "Cortar ou perfurar",
                "Aplicar produtos caseiros"
            ]
        },
        caracteristicas: [
            "Corpo alongado e achatado",
            "Tamanho: 5-25cm",
            "Coloração amarronzada ou esverdeada",
            "Um par de pernas por segmento",
            "Antenas longas",
            "Movimentos rápidos"
        ],
        sintomas_en: {
            "imediatos": [
                "Intense and immediate pain",
                "Redness at the site",
                "Swelling",
                "Burning sensation"
            ],
            "tardios": [
                "Pain can last up to 48 hours",
                "Persistent edema",
                "Rarely nausea"
            ],
            "graves": [
                "Secondary infection",
                "Allergic reactions (rare)",
                "Local necrosis (very rare)"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor intenso e inmediato",
                "Enrojecimiento en el lugar",
                "Hinchazón",
                "Sensación de ardor"
            ],
            "tardios": [
                "El dolor puede durar hasta 48 horas",
                "Edema persistente",
                "Raramente náuseas"
            ],
            "graves": [
                "Infección secundaria",
                "Reacciones alérgicas (raro)",
                "Necrosis local (muy raro)"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash with soap and water",
                "Cold compress to relieve pain",
                "Oral analgesic if necessary",
                "Observe signs of infection",
                "Seek doctor if severe symptoms"
            ],
            "naoFazer": [
                "Do not use a tourniquet",
                "Do not cut or puncture",
                "Do not apply homemade products"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lavar con agua y jabón",
                "Compresa fría para aliviar el dolor",
                "Analgésico oral si es necesario",
                "Observar signos de infección",
                "Buscar médico si hay síntomas graves"
            ],
            "naoFazer": [
                "No hacer torniquete",
                "No cortar ni perforar",
                "No aplicar productos caseros"
            ]
        },
        caracteristicas_en: [
            "Elongated and flattened body",
            "Size: 5-25cm",
            "Brownish or greenish coloration",
            "One pair of legs per segment",
            "Long antennae",
            "Fast movements"
        ],
        caracteristicas_es: [
            "Cuerpo alargado y achatado",
            "Tamaño: 5-25cm",
            "Coloración amarronzada o verdosa",
            "Un par de patas por segmento",
            "Antenas largas",
            "Movimientos rápidos"
        ],
        periodoAtivo: "Principalmente noturna. Busca umidade.",
        prevencao: [
            "Eliminar umidade excessiva",
            "Vedar frestas e buracos",
            "Não acumular entulho",
            "Sacudir roupas e sapatos",
            "Usar luvas ao mexer em jardim",
            "Manter ambientes secos"
        ],
        tratamento: "Sintomático: analgésicos e anti-inflamatórios. Raramente necessita soro.",
        gravidade: "MODERADO - Dor intensa mas raramente grave. Risco maior é infecção secundária.",
        imagem: require('../assets/sinitox/animais/sc_lacraia.jpg'),
        tipo: "centopeia",
    },
    {
        id: "abelhas",
        nomePopular: "Abelhas",
        nomePopular_en: "Bees",
        nomePopular_es: "Abejas",
        nomeCientifico: "Apis mellifera",
        emoji: "🐝",
        nivelPerigo: "Médio a Alto",
        nivelPerigo_en: "Medium to High",
        nivelPerigo_es: "Medio a Alto",
        descricao: "Insetos sociais importantes para polinização, mas que ferroam para defender a colmeia. O ferrão possui farpas e fica preso na pele, causando a morte da abelha.",
        descricao_en: "Important social insects for pollination, but they sting to defend the hive. The stinger has barbs and gets stuck in the skin, causing the bee's death.",
        descricao_es: "Insectos sociales importantes para la polinización, pero pican para defender la colmena. El aguijón tiene púas y queda atrapado en la piel, causando la muerte de la abeja.",
        habitat: "Colmeias em árvores, telhados, muros, buracos em pedras. Podem formar enxames migratórios.",
        habitat_en: "Hives in trees, rooftops, walls, holes in rocks. Can form migratory swarms.",
        habitat_es: "Colmenas en árboles, techos, muros, agujeros en piedras. Pueden formar enjambres migratorios.",
        comportamento: "Atacam em grupo quando a colmeia é ameaçada. Abelhas africanizadas são muito defensivas e perseguem invasores por longas distâncias.",
        comportamento_en: "Attack in groups when the hive is threatened. Africanized bees are very defensive and chase intruders over long distances.",
        comportamento_es: "Atacan en grupo cuando la colmena es amenazada. Las abejas africanizadas son muy defensivas y persiguen invasores por largas distancias.",
        tipoVeneno: "Apitoxina (Mistura complexa)",
        tipoVeneno_en: "Apitoxin (Complex mixture)",
        tipoVeneno_es: "Apitoxina (Mezcla compleja)",
        efeito: "Dor local, inflamação. Em múltiplas picadas, pode causar intoxicação sistêmica. Risco grave de choque anafilático em alérgicos.",
        efeito_en: "Local pain, inflammation. Multiple stings can cause systemic intoxication. Serious risk of anaphylactic shock in allergic individuals.",
        efeito_es: "Dolor local, inflamación. En múltiples picaduras, puede causar intoxicación sistémica. Riesgo grave de choque anafiláctico en alérgicos.",
        sintomas: {
            "imediatos": [
                "Dor aguda e imediata",
                "Vermelhidão e calor no local",
                "Inchaço (edema)",
                "Presença do ferrão na pele"
            ],
            "tardios": [
                "Coceira intensa",
                "Inchaço que pode aumentar por 24-48h"
            ],
            "graves": [
                "Dificuldade para respirar (edema de glote)",
                "Urticária generalizada",
                "Tontura e desmaio",
                "Choque anafilático",
                "Insuficiência renal (em caso de centenas de picadas)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Remover o ferrão IMEDIATAMENTE raspando com um cartão ou faca (NÃO usar pinça)",
                "Lavar com água e sabão",
                "Aplicar compressa fria",
                "Se alérgico: usar caneta de epinefrina e ir ao hospital",
                "Se múltiplas picadas: ir ao hospital imediatamente"
            ],
            "naoFazer": [
                "Espremer o ferrão (isso injeta mais veneno)",
                "Coçar o local (risco de infecção)",
                "Aplicar álcool ou produtos caseiros"
            ]
        },
        caracteristicas: [
            "Corpo peludo, listrado em amarelo e preto",
            "Tamanho: 1-1.5cm",
            "Ferrão serrilhado (fica preso)",
            "Vivem em colônias grandes",
            "Produzem mel e cera"
        ],
        sintomas_en: {
            "imediatos": [
                "Sharp and immediate pain",
                "Redness and heat at the site",
                "Swelling (edema)",
                "Presence of the stinger in the skin"
            ],
            "tardios": [
                "Intense itching",
                "Swelling that can increase for 24-48h"
            ],
            "graves": [
                "Difficulty breathing (glottis edema)",
                "Generalized hives",
                "Dizziness and fainting",
                "Anaphylactic shock",
                "Kidney failure (in case of hundreds of stings)"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor agudo e inmediato",
                "Enrojecimiento y calor en el lugar",
                "Hinchazón (edema)",
                "Presencia del aguijón en la piel"
            ],
            "tardios": [
                "Picazón intensa",
                "Hinchazón que puede aumentar por 24-48h"
            ],
            "graves": [
                "Dificultad para respirar (edema de glotis)",
                "Urticaria generalizada",
                "Mareos y desmayos",
                "Choque anafiláctico",
                "Insuficiencia renal (en caso de cientos de picaduras)"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Remove stinger IMMEDIATELY by scraping with a card or knife (DO NOT use tweezers)",
                "Wash with soap and water",
                "Apply cold compress",
                "If allergic: use epinephrine pen and go to the hospital",
                "If multiple stings: go to the hospital immediately"
            ],
            "naoFazer": [
                "Do not squeeze the stinger (injects more venom)",
                "Do not scratch the site (risk of infection)",
                "Do not apply alcohol or homemade products"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Retirar el aguijón INMEDIATAMENTE raspando con una tarjeta o cuchillo (NO usar pinzas)",
                "Lavar con agua y jabón",
                "Aplicar compresa fría",
                "Si es alérgico: usar autoinyector de epinefrina e ir al hospital",
                "Si hay múltiples picaduras: ir al hospital inmediatamente"
            ],
            "naoFazer": [
                "No exprimir el aguijón (inyecta más veneno)",
                "No rascar el lugar (riesgo de infección)",
                "No aplicar alcohol o productos caseros"
            ]
        },
        caracteristicas_en: [
            "Hairy body, striped in yellow and black",
            "Size: 1-1.5cm",
            "Barbed stinger (gets stuck)",
            "Live in large colonies",
            "Produce honey and wax"
        ],
        caracteristicas_es: [
            "Cuerpo peludo, a rayas amarillas y negras",
            "Tamaño: 1-1.5cm",
            "Aguijón con púas (se queda atrapado)",
            "Viven en colonias grandes",
            "Producen miel y cera"
        ],
        periodoAtivo: "Diurnas. Muito ativas em dias quentes e ensolarados.",
        prevencao: [
            "Não se aproximar de colmeias",
            "Evitar ruídos e vibrações fortes perto de ninhos",
            "Não usar roupas escuras ou perfumes fortes em matas",
            "Se atacado: correr em zigue-zague e proteger o rosto/pescoço",
            "Não matar abelhas perto da colmeia (libera feromônio de alarme)"
        ],
        tratamento: "Remoção do ferrão, analgésicos, anti-histamínicos. Corticoides em casos moderados. Adrenalina para anafilaxia.",
        gravidade: "VARIÁVEL - De leve (picada única em não alérgico) a FATAL (alérgicos ou ataque de enxame).",
        imagem: require('../assets/sinitox/animais/honey_bee.jpg'), // Updated to new AI image
        tipo: "inseto",
    },
    {
        id: "vespas",
        nomePopular: "Vespas e Marimbondos",
        nomePopular_en: "Wasps and Hornets",
        nomePopular_es: "Avispas y Avispones",
        nomeCientifico: "Polistes spp. / Polybia spp.",
        emoji: "🦟",
        nivelPerigo: "Médio",
        nivelPerigo_en: "Medium",
        nivelPerigo_es: "Medio",
        descricao: "Insetos com corpo mais liso e cintura fina. Diferente das abelhas, não perdem o ferrão e podem picar múltiplas vezes sem morrer.",
        descricao_en: "Insects with smoother body and thin waist. Unlike bees, they don't lose their stinger and can sting multiple times without dying.",
        descricao_es: "Insectos con cuerpo más liso y cintura delgada. A diferencia de las abejas, no pierden el aguijón y pueden picar múltiples veces sin morir.",
        habitat: "Ninhos de papel (casas de marimbondo) em beirais, forros, arbustos, galhos de árvores.",
        habitat_en: "Paper nests (wasp houses) on eaves, ceilings, bushes, tree branches.",
        habitat_es: "Nidos de papel (casas de avispas) en aleros, techos, arbustos, ramas de árboles.",
        comportamento: "Defendem o ninho agressivamente se perturbadas. Algumas espécies são solitárias, outras sociais.",
        comportamento_en: "Defend the nest aggressively when disturbed. Some species are solitary, others social.",
        comportamento_es: "Defienden el nido agresivamente cuando son perturbadas. Algunas especies son solitarias, otras sociales.",
        tipoVeneno: "Complexo proteico",
        tipoVeneno_en: "Protein Complex",
        tipoVeneno_es: "Complejo proteico",
        efeito: "Dor intensa, similar à queimadura. Risco de reação alérgica, embora menos comum que em abelhas.",
        efeito_en: "Intense pain, similar to a burn. Risk of allergic reaction, though less common than with bees.",
        efeito_es: "Dolor intenso, similar a una quemadura. Riesgo de reacción alérgica, aunque menos común que con abejas.",
        sintomas: {
            "imediatos": [
                "Dor intensa e latejante",
                "Vermelhidão local",
                "Inchaço",
                "Sensação de queimação"
            ],
            "tardios": [
                "Coceira",
                "Inchaço persistente"
            ],
            "graves": [
                "Reação alérgica sistêmica",
                "Inchaço na garganta",
                "Queda de pressão"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar com água e sabão",
                "Aplicar compressa fria ou gelo envolto em pano",
                "Manter o local elevado se possível",
                "Observar sinais de alergia"
            ],
            "naoFazer": [
                "Tentar espremer o local",
                "Cutucar o ninho",
                "Matar o inseto perto do ninho (pode atrair outros)"
            ]
        },
        caracteristicas: [
            "Corpo liso e brilhante (poucos pelos)",
            "Cintura bem marcada ('cintura de vespa')",
            "Pernas longas",
            "Cores variadas: preto, amarelo, avermelhado",
            "Não deixam ferrão"
        ],
        sintomas_en: {
            "imediatos": [
                "Intense and throbbing pain",
                "Local redness",
                "Swelling",
                "Burning sensation"
            ],
            "tardios": [
                "Itching",
                "Persistent swelling"
            ],
            "graves": [
                "Systemic allergic reaction",
                "Throat swelling",
                "Drop in blood pressure"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor intenso y punzante",
                "Enrojecimiento local",
                "Hinchazón",
                "Sensación de ardor"
            ],
            "tardios": [
                "Picazón",
                "Hinchazón persistente"
            ],
            "graves": [
                "Reacción alérgica sistémica",
                "Hinchazón en la garganta",
                "Caída de la presión arterial"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash with soap and water",
                "Apply cold compress or ice wrapped in cloth",
                "Keep site elevated if possible",
                "Observe signs of allergy"
            ],
            "naoFazer": [
                "Do not try to squeeze the site",
                "Do not poke the nest",
                "Do not kill the insect near the nest (can attract others)"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lavar con agua y jabón",
                "Aplicar compresa fría o hielo envuelto en paño",
                "Mantener el lugar elevado si es posible",
                "Observar signos de alergia"
            ],
            "naoFazer": [
                "No intentar exprimir el lugar",
                "No molestar el nido",
                "No matar al insecto cerca del nido (puede atraer a otros)"
            ]
        },
        caracteristicas_en: [
            "Smooth and shiny body (few hairs)",
            "Well-defined waist ('wasp waist')",
            "Long legs",
            "Varied colors: black, yellow, reddish",
            "Do not leave stinger"
        ],
        caracteristicas_es: [
            "Cuerpo liso y brillante (pocos pelos)",
            "Cintura bien marcada ('cintura de avispa')",
            "Piernas largas",
            "Colores variados: negro, amarillo, rojizo",
            "No dejan aguijón"
        ],
        periodoAtivo: "Diurnas. Ativas no calor.",
        prevencao: [
            "Verificar beirais e telhados regularmente",
            "Não deixar restos de comida ou bebidas doces expostos",
            "Remover ninhos pequenos à noite (com cuidado extremo)",
            "Chamar controle de pragas para ninhos grandes"
        ],
        tratamento: "Sintomático para dor e inchaço. Atendimento médico se houver reação alérgica.",
        gravidade: "MODERADA - Dolorosa, mas geralmente não fatal, exceto em alérgicos.",
        imagem: require('../assets/sinitox/animais/vespa.jpg'),
        tipo: "inseto",
    },
    {
        id: "cascavel",
        nomePopular: "Cascavel",
        nomePopular_en: "Rattlesnake",
        nomePopular_es: "Cascabel",
        nomeCientifico: "Crotalus durissus",
        emoji: "⚠️",
        nivelPerigo: "Atenção",
        nivelPerigo_en: "Warning",
        nivelPerigo_es: "Atención",
        descricao: "Espécie identificada na base do SINITOX. Informações detalhadas sobre comportamento e primeiros socorros serão adicionadas em breve.",
        descricao_en: "Species identified in the SINITOX database. Detailed information about behavior and first aid will be added soon.",
        descricao_es: "Especie identificada en la base del SINITOX. Información detallada sobre comportamiento y primeros auxilios será añadida pronto.",
        habitat: "Consulte especialistas locais.",
        habitat_en: "Consult local specialists.",
        habitat_es: "Consulte especialistas locales.",
        comportamento: "Evite contato.",
        comportamento_en: "Avoid contact.",
        comportamento_es: "Evite contacto.",
        tipoVeneno: "Peçonhento",
        tipoVeneno_en: "Venomous",
        tipoVeneno_es: "Ponzoñoso",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/cd_cascavel.jpg'),
        tipo: "outro",
    },
    {
        id: "jararacu_u",
        nomePopular: "Jararacuçu",
        nomePopular_en: "Jararacussu Pit Viper",
        nomePopular_es: "Jararacusú",
        nomeCientifico: "Bothrops jararacussu",
        emoji: "⚠️",
        nivelPerigo: "Atenção",
        nivelPerigo_en: "Warning",
        nivelPerigo_es: "Atención",
        descricao: "Espécie identificada na base do SINITOX. Informações detalhadas sobre comportamento e primeiros socorros serão adicionadas em breve.",
        descricao_en: "Species identified in the SINITOX database. Detailed information about behavior and first aid will be added soon.",
        descricao_es: "Especie identificada en la base del SINITOX. Información detallada sobre comportamiento y primeros auxilios será añadida pronto.",
        habitat: "Consulte especialistas locais.",
        habitat_en: "Consult local specialists.",
        habitat_es: "Consulte especialistas locales.",
        comportamento: "Evite contato.",
        comportamento_en: "Avoid contact.",
        comportamento_es: "Evite contacto.",
        tipoVeneno: "Peçonhento",
        tipoVeneno_en: "Venomous",
        tipoVeneno_es: "Ponzoñoso",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/bj_jararacussu.jpg'),
        tipo: "outro",
    },
    {
        id: "jararacu_u_albina",
        nomePopular: "Jararacuçu albina",
        nomePopular_en: "Albino Jararacussu",
        nomePopular_es: "Jararacusú albina",
        nomeCientifico: "Bothrops jararacussu (albina)",
        emoji: "⚠️",
        nivelPerigo: "Atenção",
        nivelPerigo_en: "Warning",
        nivelPerigo_es: "Atención",
        descricao: "Espécie identificada na base do SINITOX. Informações detalhadas sobre comportamento e primeiros socorros serão adicionadas em breve.",
        descricao_en: "Species identified in the SINITOX database. Detailed information about behavior and first aid will be added soon.",
        descricao_es: "Especie identificada en la base del SINITOX. Información detallada sobre comportamiento y primeros auxilios será añadida pronto.",
        habitat: "Consulte especialistas locais.",
        habitat_en: "Consult local specialists.",
        habitat_es: "Consulte especialistas locales.",
        comportamento: "Evite contato.",
        comportamento_en: "Avoid contact.",
        comportamento_es: "Evite contacto.",
        tipoVeneno: "Peçonhento",
        tipoVeneno_en: "Venomous",
        tipoVeneno_es: "Ponzoñoso",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/bj_albina.jpg'),
        tipo: "outro",
    },
    {
        id: "surucucu",
        nomePopular: "Surucucu",
        nomePopular_en: "Bushmaster",
        nomePopular_es: "Surucucú",
        nomeCientifico: "Lachesia muta",
        emoji: "⚠️",
        nivelPerigo: "Atenção",
        nivelPerigo_en: "Warning",
        nivelPerigo_es: "Atención",
        descricao: "Espécie identificada na base do SINITOX. Informações detalhadas sobre comportamento e primeiros socorros serão adicionadas em breve.",
        descricao_en: "Species identified in the SINITOX database. Detailed information about behavior and first aid will be added soon.",
        descricao_es: "Especie identificada en la base del SINITOX. Información detallada sobre comportamiento y primeros auxilios será añadida pronto.",
        habitat: "Consulte especialistas locais.",
        habitat_en: "Consult local specialists.",
        habitat_es: "Consulte especialistas locales.",
        comportamento: "Evite contato.",
        comportamento_en: "Avoid contact.",
        comportamento_es: "Evite contacto.",
        tipoVeneno: "Peçonhento",
        tipoVeneno_en: "Venomous",
        tipoVeneno_es: "Ponzoñoso",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/lm_surucucu.jpg'),
        tipo: "outro",
    },
    {
        id: "cobra_coral",
        nomePopular: "Cobra-coral",
        nomePopular_en: "Coral Snake",
        nomePopular_es: "Serpiente Coral",
        nomeCientifico: "Micrurus corallinus",
        emoji: "⚠️",
        nivelPerigo: "Atenção",
        nivelPerigo_en: "Warning",
        nivelPerigo_es: "Atención",
        descricao: "Espécie identificada na base do SINITOX. Informações detalhadas sobre comportamento e primeiros socorros serão adicionadas em breve.",
        descricao_en: "Species identified in the SINITOX database. Detailed information about behavior and first aid will be added soon.",
        descricao_es: "Especie identificada en la base del SINITOX. Información detallada sobre comportamiento y primeros auxilios será añadida pronto.",
        habitat: "Consulte especialistas locais.",
        habitat_en: "Consult local specialists.",
        habitat_es: "Consulte especialistas locales.",
        comportamento: "Evite contato.",
        comportamento_en: "Avoid contact.",
        comportamento_es: "Evite contacto.",
        tipoVeneno: "Peçonhento",
        tipoVeneno_en: "Venomous",
        tipoVeneno_es: "Ponzoñoso",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/mc_coral.jpg'),
        tipo: "outro",
    },

    {
        id: "escorpiao_marrom",
        nomePopular: "Escorpião Marrom",
        nomePopular_en: "Brown Scorpion",
        nomePopular_es: "Escorpión Marrón",
        nomeCientifico: "Tityus bahiensis",
        emoji: "🦂",
        nivelPerigo: "Alto",
        nivelPerigo_en: "High",
        nivelPerigo_es: "Alto",
        descricao: "Espécie muito comum nas regiões Sul e Sudeste do Brasil. Menos perigoso que o amarelo, mas exige cuidado médico.",
        descricao_en: "Species very common in the South and Southeast regions of Brazil. Less dangerous than the yellow one, but requires medical care.",
        descricao_es: "Especie muy común en las regiones Sur y Sudeste de Brasil. Menos peligroso que el amarillo, pero exige cuidado médico.",
        habitat: "Entulhos, tijolos, telhas, terrenos baldios.",
        habitat_en: "Rubble, bricks, roof tiles, vacant lots.",
        habitat_es: "Escombros, ladrillos, tejas, terrenos baldíos.",
        comportamento: "Noturno. Esconde-se em locais escuros e úmidos.",
        comportamento_en: "Nocturnal. Hides in dark and damp places.",
        comportamento_es: "Nocturno. Se esconde en lugares oscuros y húmedos.",
        tipoVeneno: "Peçonhento (Neurotóxico)",
        tipoVeneno_en: "Venomous (Neurotoxic)",
        tipoVeneno_es: "Ponzoñoso (Neurotóxico)",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/tb_marrom.png'),
        tipo: "outro",
    },
    {
        id: "aranha_caranguejeira",
        nomePopular: "Aranha caranguejeira",
        nomePopular_en: "Tarantula",
        nomePopular_es: "Tarántula",
        nomeCientifico: "Grammostola mollicoma",
        emoji: "⚠️",
        nivelPerigo: "Atenção",
        nivelPerigo_en: "Warning",
        nivelPerigo_es: "Atención",
        descricao: "Espécie identificada na base do SINITOX. Informações detalhadas sobre comportamento e primeiros socorros serão adicionadas em breve.",
        descricao_en: "Species identified in the SINITOX database. Detailed information about behavior and first aid will be added soon.",
        descricao_es: "Especie identificada en la base del SINITOX. Información detallada sobre comportamiento y primeros auxilios será añadida pronto.",
        habitat: "Consulte especialistas locais.",
        habitat_en: "Consult local specialists.",
        habitat_es: "Consulte especialistas locales.",
        comportamento: "Evite contato.",
        comportamento_en: "Avoid contact.",
        comportamento_es: "Evite contacto.",
        tipoVeneno: "Peçonhento",
        tipoVeneno_en: "Venomous",
        tipoVeneno_es: "Ponzoñoso",
        efeito: "Pode causar acidentes.",
        efeito_en: "Can cause accidents.",
        efeito_es: "Puede causar accidentes.",
        sintomas: {
            "imediatos": [
                "Dor local",
                "Possível inchaço"
            ],
            "tardios": [
                "Procure atendimento médico"
            ],
            "graves": [
                "Risco de complicações"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lave o local",
                "Procure atendimento médico",
                "Leve foto do animal"
            ],
            "naoFazer": [
                "Não faça torniquete",
                "Não chupe o veneno"
            ]
        },
        caracteristicas: [
            "Identificado por foto do SINITOX"
        ],
        sintomas_en: {
            "imediatos": [
                "Local pain",
                "Possible swelling"
            ],
            "tardios": [
                "Seek medical attention"
            ],
            "graves": [
                "Risk of complications"
            ]
        },
        sintomas_es: {
            "imediatos": [
                "Dolor local",
                "Posible hinchazón"
            ],
            "tardios": [
                "Busque atención médica"
            ],
            "graves": [
                "Riesgo de complicaciones"
            ]
        },
        primeirosSocorros_en: {
            "fazer": [
                "Wash the site",
                "Seek medical attention",
                "Take a photo of the animal"
            ],
            "naoFazer": [
                "Do not apply a tourniquet",
                "Do not suck the venom"
            ]
        },
        primeirosSocorros_es: {
            "fazer": [
                "Lave el lugar",
                "Busque atención médica",
                "Lleve foto del animal"
            ],
            "naoFazer": [
                "No aplique torniquete",
                "No succione el veneno"
            ]
        },
        caracteristicas_en: [
            "Identified by SINITOX photo"
        ],
        caracteristicas_es: [
            "Identificado por foto del SINITOX"
        ],
        periodoAtivo: "Variável",
        prevencao: [
            "Mantenha distância",
            "Use calçados fechados"
        ],
        tratamento: "Sintomático e soro específico se disponível.",
        gravidade: "Variável - Consulte {{POISON_CONTROL}}",
        imagem: require('../assets/sinitox/animais/gm_caranguejeira.jpg'),
        tipo: "outro",
    },
    {
        id: "viuva_negra",
        nomePopular: "Viúva-negra",
        nomePopular_en: "Black Widow",
        nomePopular_es: "Viuda Negra",
        nomeCientifico: "Latrodectus spp.",
        emoji: "🕷️",
        nivelPerigo: "Alto",
        nivelPerigo_en: "High",
        nivelPerigo_es: "Alto",
        descricao: "Aranha pequena, preta com mancha vermelha (ampulheta) no abdômen. Veneno neurotóxico potente.",
        descricao_en: "Small, black spider with a red marking (hourglass) on the abdomen. Potent neurotoxic venom.",
        descricao_es: "Araña pequeña, negra con mancha roja (reloj de arena) en el abdomen. Veneno neurotóxico potente.",
        habitat: "Teias irregulares em arbustos, gramíneas, cascas de coco, pneus velhos, latas vazias.",
        habitat_en: "Irregular webs in bushes, grasses, coconut shells, old tires, empty cans.",
        habitat_es: "Telas irregulares en arbustos, hierbas, cáscaras de coco, neumáticos viejos, latas vacías.",
        comportamento: "Não é agressiva, pica quando comprimida contra o corpo.",
        comportamento_en: "Not aggressive, bites when pressed against the body.",
        comportamento_es: "No es agresiva, pica cuando es comprimida contra el cuerpo.",
        tipoVeneno: "Neurotóxico",
        tipoVeneno_en: "Neurotoxic",
        tipoVeneno_es: "Neurotóxico",
        efeito: "Dor intensa, cãibras musculares, tremores, alterações cardíacas.",
        efeito_en: "Intense pain, muscle cramps, tremors, cardiac changes.",
        efeito_es: "Dolor intenso, calambres musculares, temblores, alteraciones cardíacas.",
        sintomas: {
            "imediatos": [
                "Dor na picada (sensação de alfinetada)",
                "Pequena mancha vermelha",
                "Suor local"
            ],
            "tardios": [
                "Dor muscular intensa (cãibras)",
                "Abdômen rígido (parece apendicite)",
                "Tremores e ansiedade",
                "Taquicardia"
            ],
            "graves": [
                "Choque",
                "Distúrbios cardíacos graves"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar com água e sabão",
                "Compressa morna (ajuda na dor muscular)",
                "Hospital IMEDIATAMENTE"
            ],
            "naoFazer": [
                "Não fazer torniquete",
                "Não sugar veneno"
            ]
        },
        caracteristicas: [
            "Cor preta brilhante",
            "Mancha vermelha em forma de ampulheta no ventre",
            "Tamanho pequeno (1-1.5cm)"
        ],
        periodoAtivo: "Ano todo",
        prevencao: [
            "Usar luvas ao mexer em entulhos",
            "Limpar jardins regularmente"
        ],
        tratamento: "Soro antilatrodéctico e relaxantes musculares.",
        gravidade: "GRAVE - Requer atendimento médico urgente.",
        imagem: require('../assets/sinitox/animais/viuva_negra.png'),
        tipo: "aranha",
    },
    {
        id: "formiga_lava_pes",
        nomePopular: "Formiga Lava-pés",
        nomePopular_en: "Fire Ant",
        nomePopular_es: "Hormiga de Fuego",
        nomeCientifico: "Solenopsis spp.",
        emoji: "🐜",
        nivelPerigo: "Médio",
        nivelPerigo_en: "Medium",
        nivelPerigo_es: "Medio",
        descricao: "Formigas agressivas que atacam em grupo. A picada causa dor, queimação e pústulas (bolinhas de pus).",
        descricao_en: "Aggressive ants that attack in groups. The sting causes pain, burning and pustules (pus-filled bumps).",
        descricao_es: "Hormigas agresivas que atacan en grupo. La picadura causa dolor, ardor y pústulas (bolitas de pus).",
        habitat: "Montículos de terra solta em jardins, gramados e calçadas.",
        habitat_en: "Loose soil mounds in gardens, lawns and sidewalks.",
        habitat_es: "Montículos de tierra suelta en jardines, céspedes y aceras.",
        comportamento: "Defendem o ninho agressivamente. Picam e ferroam simultaneamente.",
        comportamento_en: "Defend the nest aggressively. Bite and sting simultaneously.",
        comportamento_es: "Defienden el nido agresivamente. Pican y aguijonean simultáneamente.",
        tipoVeneno: "Alcaloides (Solenopsina)",
        tipoVeneno_en: "Alkaloids (Solenopsin)",
        tipoVeneno_es: "Alcaloides (Solenopsina)",
        efeito: "Dor, queimação, reação alérgica.",
        efeito_en: "Pain, burning, allergic reaction.",
        efeito_es: "Dolor, ardor, reacción alérgica.",
        sintomas: {
            "imediatos": [
                "Dor aguda e queimação",
                "Vermelhidão",
                "Inchaço"
            ],
            "tardios": [
                "Pústulas (bolhas com pus) estéreis após 24h",
                "Coceira intensa"
            ],
            "graves": [
                "Choque anafilático (em alérgicos)",
                "Urticária generalizada"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar com água e sabão",
                "Compressa fria",
                "Antialérgico (se prescrito)"
            ],
            "naoFazer": [
                "Não estourar as bolhas (risco de infecção)"
            ]
        },
        caracteristicas: [
            "Cor avermelhada a preta",
            "Ninhos em forma de murundus (montinhos de terra)"
        ],
        periodoAtivo: "Diurno",
        prevencao: [
            "Cuidado ao pisar em gramados",
            "Usar calçados fechados"
        ],
        tratamento: "Sintomático. Adrenalina em caso de anafilaxia.",
        gravidade: "MODERADA - Risco alto apenas para alérgicos.",
        imagem: require('../assets/sinitox/animais/formiga_lava_pes.png'),
        tipo: "inseto",
    },
    {
        id: "lonomia",
        nomePopular: "Taturana Lonomia",
        nomePopular_en: "Lonomia Caterpillar",
        nomePopular_es: "Oruga Lonomia",
        nomeCientifico: "Lonomia obliqua",
        emoji: "🐛",
        nivelPerigo: "Muito Alto",
        nivelPerigo_en: "Very High",
        nivelPerigo_es: "Muy Alto",
        descricao: "Lagarta com cerdas urticantes em forma de 'pinheirinho'. O contato causa queimadura e pode levar a hemorragias graves.",
        descricao_en: "Caterpillar with urticating bristles shaped like 'pine trees'. Contact causes burns and can lead to severe hemorrhaging.",
        descricao_es: "Oruga con cerdas urticantes en forma de 'pinito'. El contacto causa quemadura y puede llevar a hemorragias graves.",
        habitat: "Troncos de árvores frutíferas e nativas. Vivem em colônias (agrupadas).",
        habitat_en: "Trunks of fruit and native trees. Live in colonies (grouped).",
        habitat_es: "Troncos de árboles frutales y nativos. Viven en colonias (agrupadas).",
        comportamento: "Ficam camufladas nos troncos durante o dia.",
        comportamento_en: "Stay camouflaged on tree trunks during the day.",
        comportamento_es: "Permanecen camufladas en los troncos durante el día.",
        tipoVeneno: "Hemorrágico",
        tipoVeneno_en: "Hemorrhagic",
        tipoVeneno_es: "Hemorrágico",
        efeito: "Diminui a coagulação do sangue, causando sangramentos.",
        efeito_en: "Decreases blood coagulation, causing bleeding.",
        efeito_es: "Disminuye la coagulación de la sangre, causando sangrados.",
        sintomas: {
            "imediatos": [
                "Dor em queimação",
                "Vermelhidão e inchaço"
            ],
            "tardios": [
                "Sangramento na gengiva, nariz e urina",
                "Manchas roxas pelo corpo",
                "Dor de cabeça"
            ],
            "graves": [
                "Insuficiência renal",
                "Hemorragia cerebral",
                "Morte"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar com água fria",
                "Hospital IMEDIATAMENTE",
                "Levar a lagarta (com cuidado) ou foto"
            ],
            "naoFazer": [
                "Não esfregar",
                "Não passar nada na pele"
            ]
        },
        caracteristicas: [
            "Cor marrom-esverdeada",
            "Cerdas parecem pinheiros",
            "Vivem agrupadas"
        ],
        periodoAtivo: "Verão e outono",
        prevencao: [
            "Observar troncos antes de encostar",
            "Usar luvas na jardinagem"
        ],
        tratamento: "Soro antilonômico.",
        gravidade: "MUITO GRAVE - Risco de morte por hemorragia.",
        imagem: require('../assets/sinitox/animais/lonomia_taturana.png'),
        tipo: "outro",
    },
    {
        id: "agua_viva",
        nomePopular: "Água-viva",
        nomePopular_en: "Jellyfish",
        nomePopular_es: "Medusa",
        nomeCientifico: "Cnidários",
        emoji: "🪼",
        nivelPerigo: "Médio",
        nivelPerigo_en: "Medium",
        nivelPerigo_es: "Medio",
        descricao: "Animais marinhos gelatinosos com tentáculos que liberam toxinas ao toque.",
        descricao_en: "Gelatinous marine animals with tentacles that release toxins upon contact.",
        descricao_es: "Animales marinos gelatinosos con tentáculos que liberan toxinas al tacto.",
        habitat: "Mar (águas costeiras).",
        habitat_en: "Sea (coastal waters).",
        habitat_es: "Mar (aguas costeras).",
        comportamento: "Flutuam na água. Tentáculos podem ser longos e invisíveis.",
        comportamento_en: "Float in the water. Tentacles can be long and invisible.",
        comportamento_es: "Flotan en el agua. Los tentáculos pueden ser largos e invisibles.",
        tipoVeneno: "Neurotóxico e dermatonecrótico",
        tipoVeneno_en: "Neurotoxic and dermatonecrotic",
        tipoVeneno_es: "Neurotóxico y dermatonecrótico",
        efeito: "Queimadura química intensa.",
        efeito_en: "Intense chemical burn.",
        efeito_es: "Quemadura química intensa.",
        sintomas: {
            "imediatos": [
                "Dor intensa e ardência",
                "Marcas vermelhas (linhas) na pele"
            ],
            "tardios": [
                "Bolhas",
                "Necrose superficial"
            ],
            "graves": [
                "Reação alérgica",
                "Arritmia (raro em espécies comuns no BR)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Sair da água",
                "Lavar com ÁGUA DO MAR",
                "Aplicar VINAGRE por 30 min",
                "Remover tentáculos com pinça"
            ],
            "naoFazer": [
                "NÃO usar água doce (ativa mais veneno)",
                "NÃO esfregar",
                "NÃO usar urina ou álcool"
            ]
        },
        caracteristicas: [
            "Corpo gelatinoso transparente ou azulado",
            "Tentáculos longos"
        ],
        periodoAtivo: "Verão",
        prevencao: [
            "Evitar banho de mar com presença de águas-vivas",
            "Perguntar aos guarda-vidas"
        ],
        tratamento: "Vinagre e controle da dor.",
        gravidade: "MODERADA - Dor intensa.",
        imagem: require('../assets/sinitox/animais/agua_viva.png'),
        tipo: "aquatico",
    },
    {
        id: "caravela",
        nomePopular: "Caravela Portuguesa",
        nomePopular_en: "Portuguese Man o' War",
        nomePopular_es: "Carabela Portuguesa",
        nomeCientifico: "Physalia physalis",
        emoji: "⛵",
        nivelPerigo: "Alto",
        nivelPerigo_en: "High",
        nivelPerigo_es: "Alto",
        descricao: "Parecida com água-viva, mas com flutuador roxo/azulado fora da água. Tentáculos podem chegar a 30 metros.",
        descricao_en: "Similar to a jellyfish, but with a purple/blue float above the water. Tentacles can reach 30 meters.",
        descricao_es: "Parecida a una medusa, pero con flotador púrpura/azulado fuera del agua. Los tentáculos pueden llegar a 30 metros.",
        habitat: "Mar aberto e praias.",
        habitat_en: "Open sea and beaches.",
        habitat_es: "Mar abierto y playas.",
        comportamento: "Flutua na superfície.",
        comportamento_en: "Floats on the surface.",
        comportamento_es: "Flota en la superficie.",
        tipoVeneno: "Potente",
        tipoVeneno_en: "Potent",
        tipoVeneno_es: "Potente",
        efeito: "Dor excruciante, choque, problemas respiratórios.",
        efeito_en: "Excruciating pain, shock, respiratory problems.",
        efeito_es: "Dolor insoportable, choque, problemas respiratorios.",
        sintomas: {
            "imediatos": [
                "Dor extrema imediata",
                "Marcas vermelhas intensas"
            ],
            "tardios": [
                "Mal-estar geral",
                "Náuseas"
            ],
            "graves": [
                "Choque",
                "Parada cardiorrespiratória (raro)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Não tocar nos tentáculos",
                "Lavar com ÁGUA DO MAR",
                "Aplicar VINAGRE",
                "Procurar médico"
            ],
            "naoFazer": [
                "NÃO usar água doce",
                "NÃO esfregar"
            ]
        },
        caracteristicas: [
            "Flutuador roxo/rosa (parece um balão)",
            "Tentáculos azuis muito longos"
        ],
        periodoAtivo: "Verão",
        prevencao: [
            "Não tocar mesmo se estiver na areia (ainda queima)",
            "Afastar-se ao ver o balão na água"
        ],
        tratamento: "Vinagre, analgésicos potentes, suporte hospitalar.",
        gravidade: "GRAVE - Dor incapacitante.",
        imagem: require('../assets/sinitox/animais/caravela.png'),
        tipo: "aquatico",
    },
    {
        id: "arraia",
        nomePopular: "Arraia",
        nomePopular_en: "Stingray",
        nomePopular_es: "Raya",
        nomeCientifico: "Potamotrygon spp. (rio) / Dasyatis spp. (mar)",
        emoji: "🦈",
        nivelPerigo: "Médio",
        nivelPerigo_en: "Medium",
        nivelPerigo_es: "Medio",
        descricao: "Peixe com ferrão serrilhado na cauda. Fica enterrada na areia/lama.",
        descricao_en: "Fish with a serrated barb in the tail. Buries itself in sand/mud.",
        descricao_es: "Pez con aguión aserrado en la cola. Se entierra en la arena/lodo.",
        habitat: "Rios e mar, fundos arenosos.",
        habitat_en: "Rivers and sea, sandy bottoms.",
        habitat_es: "Ríos y mar, fondos arenosos.",
        comportamento: "Defensiva. Ferroa quando pisada.",
        comportamento_en: "Defensive. Stings when stepped on.",
        comportamento_es: "Defensiva. Pica cuando es pisada.",
        tipoVeneno: "Necrosante",
        tipoVeneno_en: "Necrotic",
        tipoVeneno_es: "Necrosante",
        efeito: "Dor lancinante e ferida lacerante.",
        efeito_en: "Lancinating pain and lacerating wound.",
        efeito_es: "Dolor lancinante y herida lacerante.",
        sintomas: {
            "imediatos": [
                "Dor extrema",
                "Sangramento",
                "Inchaço"
            ],
            "tardios": [
                "Necrose (tecido morre) na ferida",
                "Infecção secundária"
            ],
            "graves": [
                "Tétano",
                "Gangrena"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Mergulhar local em ÁGUA QUENTE (45°C) por 30-90 min (alivia dor e anula veneno)",
                "Lavar bem a ferida",
                "Procurar médico"
            ],
            "naoFazer": [
                "Não fazer torniquete"
            ]
        },
        caracteristicas: [
            "Corpo achatado",
            "Ferrão na base da cauda"
        ],
        periodoAtivo: "Dia e noite",
        prevencao: [
            "Andar arrastando os pés na água (espanta o animal)",
            "Olhar onde pisa"
        ],
        tratamento: "Água quente, limpeza cirúrgica, antibióticos.",
        gravidade: "MODERADA a GRAVE (pela infecção/necrose).",
        imagem: require('../assets/sinitox/animais/arraia.jpg'),
        tipo: "aquatico",
    },
    {
        id: "peixe_escorpiao",
        nomePopular: "Peixe-escorpião / Peixe-pedra",
        nomePopular_en: "Scorpionfish / Stonefish",
        nomePopular_es: "Pez escorpión / Pez piedra",
        nomeCientifico: "Scorpaena spp. / Synanceia spp.",
        emoji: "🐠",
        nivelPerigo: "Alto",
        nivelPerigo_en: "High",
        nivelPerigo_es: "Alto",
        descricao: "Peixes que se camuflam entre pedras e corais. Possuem espinhos venenosos no dorso.",
        descricao_en: "Fish that camouflage among rocks and corals. Have venomous spines on their back.",
        descricao_es: "Peces que se camuflan entre piedras y corales. Poseen espinas venenosas en el dorso.",
        habitat: "Recifes, costões rochosos.",
        habitat_en: "Reefs, rocky shores.",
        habitat_es: "Arrecifes, costas rocosas.",
        comportamento: "Imóveis, confiam na camuflagem.",
        comportamento_en: "Motionless, rely on camouflage.",
        comportamento_es: "Inmóviles, confían en el camuflaje.",
        tipoVeneno: "Miotóxico e neurotóxico",
        tipoVeneno_en: "Myotoxic and neurotoxic",
        tipoVeneno_es: "Miotóxico y neurotóxico",
        efeito: "Dor insuportável, edema, paralisia.",
        efeito_en: "Unbearable pain, edema, paralysis.",
        efeito_es: "Dolor insoportable, edema, parálisis.",
        sintomas: {
            "imediatos": [
                "Dor excruciante",
                "Inchaço rápido"
            ],
            "tardios": [
                "Bolhas",
                "Necrose"
            ],
            "graves": [
                "Choque",
                "Parada cardíaca (Peixe-pedra)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "ÁGUA QUENTE (45°C) no local imediatamente",
                "Hospital urgente"
            ],
            "naoFazer": [
                "Não cortar",
                "Não fazer torniquete"
            ]
        },
        caracteristicas: [
            "Parecem pedras ou corais",
            "Espinhos dorsais"
        ],
        periodoAtivo: "Dia e noite",
        prevencao: [
            "Usar calçados de proteção no mar",
            "Não tocar em pedras/corais"
        ],
        tratamento: "Água quente, soro específico (para Peixe-pedra, se disponível), suporte.",
        imagem: require('../assets/sinitox/animais/peixe_escorpiao.png'),
        tipo: "aquatico",
    },
    {
        id: "sapo_cururu",
        nomePopular: "Sapo Cururu",
        nomePopular_en: "Cane Toad",
        nomePopular_es: "Sapo de Caña",
        nomeCientifico: "Rhinella marina",
        emoji: "🐸",
        nivelPerigo: "Baixo (para humanos) / Alto (para pets)",
        nivelPerigo_en: "Low (for humans) / High (for pets)",
        nivelPerigo_es: "Bajo (para humanos) / Alto (para mascotas)",
        descricao: "Anfíbio comum. Possui glândulas de veneno atrás dos olhos. Só libera veneno se as glândulas forem comprimidas (mordida de cão).",
        descricao_en: "Common amphibian. Has venom glands behind the eyes. Only releases venom if the glands are compressed (dog bite).",
        descricao_es: "Anfibio común. Posee glándulas de veneno detrás de los ojos. Solo libera veneno si las glándulas son comprimidas (mordida de perro).",
        habitat: "Jardins, áreas úmidas.",
        habitat_en: "Gardens, humid areas.",
        habitat_es: "Jardines, áreas húmedas.",
        comportamento: "Noturno. Não ataca.",
        comportamento_en: "Nocturnal. Does not attack.",
        comportamento_es: "Nocturno. No ataca.",
        tipoVeneno: "Cardiotóxico",
        tipoVeneno_en: "Cardiotoxic",
        tipoVeneno_es: "Cardiotóxico",
        efeito: "Irritação de mucosas. Em pets: arritmia e convulsão.",
        efeito_en: "Mucous irritation. In pets: arrhythmia and seizures.",
        efeito_es: "Irritación de mucosas. En mascotas: arritmia y convulsión.",
        sintomas: {
            "imediatos": [
                "Irritação nos olhos/boca (se houver contato)",
                "Em cães: salivação intensa, vômito"
            ],
            "tardios": [
                "Em cães: convulsão, parada cardíaca"
            ],
            "graves": [
                "Morte de animais domésticos"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar boca/olhos com água abundante",
                "Levar pet ao veterinário URGENTE"
            ],
            "naoFazer": [
                "Não deixar pet brincar com sapo"
            ]
        },
        caracteristicas: [
            "Grande porte",
            "Pele verrugosa",
            "Glândulas grandes atrás da cabeça"
        ],
        periodoAtivo: "Noturno",
        prevencao: [
            "Vigiar cães à noite no jardim"
        ],
        tratamento: "Lavagem e suporte sintomático.",
        gravidade: "LEVE (humanos) / GRAVE (pets).",
        imagem: require('../assets/sinitox/animais/sapo_cururu.png'),
        tipo: "anfibio",
    },
    {
        id: "baiacu",
        nomePopular: "Baiacu",
        nomePopular_en: "Pufferfish",
        nomePopular_es: "Pez Globo",
        nomeCientifico: "Tetraodontidae",
        emoji: "🐡",
        nivelPerigo: "Muito Alto (Ingestão)",
        nivelPerigo_en: "Very High (Ingestion)",
        nivelPerigo_es: "Muy Alto (Ingestión)",
        descricao: "Peixe que infla quando ameaçado. Sua carne/vísceras contém Tetrodotoxina, um veneno mortal sem antídoto.",
        descricao_en: "Fish that inflates when threatened. Its flesh/viscera contains Tetrodotoxin, a deadly poison with no antidote.",
        descricao_es: "Pez que se infla cuando es amenazado. Su carne/vísceras contienen Tetrodotoxina, un veneno mortal sin antídoto.",
        habitat: "Mar e rios.",
        habitat_en: "Sea and rivers.",
        habitat_es: "Mar y ríos.",
        comportamento: "Não ataca. Perigo é comer.",
        comportamento_en: "Does not attack. Danger is ingestion.",
        comportamento_es: "No ataca. El peligro es comerlo.",
        tipoVeneno: "Tetrodotoxina (Neurotóxico)",
        tipoVeneno_en: "Tetrodotoxin (Neurotoxic)",
        tipoVeneno_es: "Tetrodotoxina (Neurotóxico)",
        efeito: "Paralisia muscular progressiva, parada respiratória.",
        efeito_en: "Progressive muscular paralysis, respiratory arrest.",
        efeito_es: "Parálisis muscular progresiva, paro respiratorio.",
        sintomas: {
            "imediatos": [
                "Dormência nos lábios e língua",
                "Tontura"
            ],
            "tardios": [
                "Paralisia do corpo",
                "Dificuldade de respirar"
            ],
            "graves": [
                "Parada respiratória (consciência preservada)",
                "Morte"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Hospital IMEDIATAMENTE ao primeiro sintoma após comer peixe",
                "Ventilação mecânica (respirador) salva vidas"
            ],
            "naoFazer": [
                "Não esperar passar"
            ]
        },
        caracteristicas: [
            "Infla o corpo",
            "Dentes fundidos (bico)"
        ],
        periodoAtivo: "Dia",
        prevencao: [
            "NÃO consumir baiacu se não for preparado por chef especializado",
            "Evitar pescar e comer sem conhecer"
        ],
        tratamento: "Suporte ventilatório até o veneno sair do corpo.",
        gravidade: "EXTREMAMENTE GRAVE - Mortal.",
        imagem: require('../assets/sinitox/animais/baiacu.png'),
        tipo: "aquatico",
    },
    {
        id: "polvo_aneis_azuis",
        nomePopular: "Polvo-de-anéis-azuis",
        nomePopular_en: "Blue-ringed Octopus",
        nomePopular_es: "Pulpo de Anillos Azules",
        nomeCientifico: "Hapalochlaena spp.",
        emoji: "🐙",
        nivelPerigo: "Extremo",
        nivelPerigo_en: "Extreme",
        nivelPerigo_es: "Extremo",
        descricao: "Pequeno polvo com anéis azuis brilhantes. Um dos animais mais venenosos do mundo. Raro no Brasil, mas perigoso.",
        descricao_en: "Small octopus with bright blue rings. One of the most venomous animals in the world. Rare in Brazil, but dangerous.",
        descricao_es: "Pequeño pulpo con anillos azules brillantes. Uno de los animales más venenosos del mundo. Raro en Brasil, pero peligroso.",
        habitat: "Recifes de coral.",
        habitat_en: "Coral reefs.",
        habitat_es: "Arrecifes de coral.",
        comportamento: "Tímido, mas morde se manuseado. Anéis brilham quando irritado.",
        comportamento_en: "Shy, but bites if handled. Rings glow when irritated.",
        comportamento_es: "Tímido, pero muerde si es manipulado. Los anillos brillan cuando está irritado.",
        tipoVeneno: "Tetrodotoxina",
        tipoVeneno_en: "Tetrodotoxin",
        tipoVeneno_es: "Tetrodotoxina",
        efeito: "Paralisia respiratória em minutos.",
        efeito_en: "Respiratory paralysis within minutes.",
        efeito_es: "Parálisis respiratoria en minutos.",
        sintomas: {
            "imediatos": [
                "Mordida indolor",
                "Dormência na boca/rosto",
                "Fraqueza muscular"
            ],
            "tardios": [
                "Parada respiratória"
            ],
            "graves": [
                "Morte rápida"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Respiração boca-a-boca ou RCP IMEDIATA",
                "Não parar até chegar socorro médico avançado",
                "Hospital urgente"
            ],
            "naoFazer": [
                "Não tocar no animal"
            ]
        },
        caracteristicas: [
            "Pequeno (tamanho de uma mão)",
            "Anéis azuis elétricos"
        ],
        periodoAtivo: "Dia e noite",
        prevencao: [
            "NUNCA tocar em polvos coloridos",
            "Não colocar mãos em tocas"
        ],
        tratamento: "Ventilação mecânica.",
        gravidade: "MORTAL.",
        imagem: require('../assets/sinitox/animais/polvo_aneis_azuis.png'),
        tipo: "aquatico",
    },
    {
        id: "salamandra",
        nomePopular: "Salamandra",
        nomePopular_en: "Salamander",
        nomePopular_es: "Salamandra",
        nomeCientifico: "Salamandra spp.",
        emoji: "🦎",
        nivelPerigo: "Baixo",
        nivelPerigo_en: "Low",
        nivelPerigo_es: "Bajo",
        descricao: "Anfíbios com cauda. Algumas espécies liberam toxinas pela pele.",
        descricao_en: "Amphibians with tails. Some species release toxins through their skin.",
        descricao_es: "Anfibios con cola. Algunas especies liberan toxinas por la piel.",
        habitat: "Locais úmidos.",
        habitat_en: "Humid places.",
        habitat_es: "Lugares húmedos.",
        comportamento: "Passivas.",
        comportamento_en: "Passive.",
        comportamento_es: "Pasivas.",
        tipoVeneno: "Irritante",
        tipoVeneno_en: "Irritant",
        tipoVeneno_es: "Irritante",
        efeito: "Irritação de mucosas.",
        efeito_en: "Mucous irritation.",
        efeito_es: "Irritación de mucosas.",
        sintomas: {
            "imediatos": [
                "Ardência se tocar nos olhos/boca"
            ],
            "tardios": [
                "Dermatite leve"
            ],
            "graves": [
                "Intoxicação se ingerida (pets/crianças)"
            ]
        },
        primeirosSocorros: {
            "fazer": [
                "Lavar mãos após tocar",
                "Lavar olhos se houver contato"
            ],
            "naoFazer": [
                "Não levar à boca"
            ]
        },
        caracteristicas: [
            "Corpo alongado, pele úmida",
            "Cores vivas (aviso de perigo)"
        ],
        periodoAtivo: "Noturno",
        prevencao: [
            "Apenas observar, não tocar"
        ],
        tratamento: "Sintomático.",
        gravidade: "LEVE.",
        imagem: require('../assets/sinitox/animais/salamandra.png'),
        tipo: "anfibio",
    },
];

// Mapeamento por Estado (CIATOX) - Mantido igual, apenas referenciando os dados ricos se necessário
export const animaisPorEstado = {
    'AC': {
        estado: 'Acre',
        peconhentos: ['Jararaca-do-norte (Bothrops atrox)', 'Coral-verdadeira (Micrurus spp.)'],
        naoPeconhentos: ['Jiboia (Boa constrictor)', 'Caninana (Spilotes pullatus)', 'Falsas-corais (Oxyrhopus / Erythrolamprus)']
    },
    'AL': {
        estado: 'Alagoas',
        peconhentos: ['Jararaca-malha-de-sapo (Bothrops leucurus)', 'Bothrops locais'],
        naoPeconhentos: ['Jiboia (Boa constrictor)', 'Caninana (Spilotes pullatus)', 'Falsas-corais']
    },
    'AP': {
        estado: 'Amapá',
        peconhentos: ['Jararaca-do-norte (Bothrops atrox)', 'Coral-verdadeira (Micrurus spp.)', 'Lachesis (Surucucu) em florestas'],
        naoPeconhentos: ['Jiboia (Boa constrictor)', 'Caninana (Spilotes pullatus)', 'Colubrídeos variados']
    },
    'AM': {
        estado: 'Amazonas',
        peconhentos: ['Jararaca-do-norte (Bothrops atrox)', 'Surucucu / pico-de-jaca (Lachesis muta)', 'Coral-verdadeira (Micrurus spp.)'],
        naoPeconhentos: ['Jiboia (Boa constrictor / Epicrates spp.)', 'Caninana (Spilotes pullatus)', 'Erythrolamprus (falsas-corais)']
    },
    'BA': {
        estado: 'Bahia',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Jararaca-malha-de-sapo (Bothrops leucurus)', 'Cascavel (Crotalus durissus)', 'Corais (Micrurus spp.)'],
        naoPeconhentos: ['Jiboia (Boa constrictor)', 'Caninana (Spilotes pullatus)', 'Falsas-corais']
    },
    'CE': {
        estado: 'Ceará',
        peconhentos: ['Bothrops spp. (jararacas/urutus)', 'Cascavel (Crotalus durissus)', 'Corais (Micrurus spp.)'],
        naoPeconhentos: ['Caninana (Spilotes pullatus)', 'Jiboia', 'Colubrídeos (Philodryas, Erythrolamprus)']
    },
    'DF': {
        estado: 'Distrito Federal',
        peconhentos: ['Bothrops spp. (jararacas/urutus)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia (Boa constrictor)', 'Caninana', 'Philodryas']
    },
    'ES': {
        estado: 'Espírito Santo',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Jararacuçu (Bothrops jararacussu)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Caninana (Spilotes pullatus)', 'Jiboia', 'Falsas-corais']
    },
    'GO': {
        estado: 'Goiás',
        peconhentos: ['Bothrops spp. (jararacas/urutus)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Colubrídeos']
    },
    'MA': {
        estado: 'Maranhão',
        peconhentos: ['Bothrops atrox (norte)', 'Bothrops spp. (resto do estado)', 'Micrurus spp.', 'Lachesis (possível)'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Falsas-corais']
    },
    'MT': {
        estado: 'Mato Grosso',
        peconhentos: ['Bothrops atrox (norte)', 'Bothrops (Cerrado/Chaco)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Boa constrictor / Colubrídeos']
    },
    'MS': {
        estado: 'Mato Grosso do Sul',
        peconhentos: ['Bothrops spp. (urutus/caissacas)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Colubrídeos']
    },
    'MG': {
        estado: 'Minas Gerais',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Falsas-corais']
    },
    'PA': {
        estado: 'Pará',
        peconhentos: ['Bothrops atrox (muito relevante)', 'Micrurus spp.', 'Lachesis (florestas)'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Erythrolamprus (falsas-corais)']
    },
    'PB': {
        estado: 'Paraíba',
        peconhentos: ['Bothrops leucurus (litoral/nordeste)', 'Bothrops spp. locais', 'Micrurus spp.'],
        naoPeconhentos: ['Caninana', 'Jiboia', 'Falsas-corais']
    },
    'PR': {
        estado: 'Paraná',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Jararacuçu (Bothrops jararacussu)', 'Cascavel (Crotalus durissus)', 'Micrurus altirostris'],
        naoPeconhentos: ['Caninana (Spilotes pullatus)', 'Jiboia', 'Falsas-corais']
    },
    'PE': {
        estado: 'Pernambuco',
        peconhentos: ['Bothrops leucurus', 'Cascavel (ocasional)', 'Micrurus spp.'],
        naoPeconhentos: ['Caninana', 'Jiboia', 'Falsas-corais']
    },
    'PI': {
        estado: 'Piauí',
        peconhentos: ['Bothrops spp. (semiárido)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Caninana', 'Jiboia', 'Colubrídeos']
    },
    'RJ': {
        estado: 'Rio de Janeiro',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Jararacuçu (litoral/serra)', 'Cascavel (ocasional)', 'Micrurus spp.'],
        naoPeconhentos: ['Caninana', 'Jiboia', 'Falsas-corais']
    },
    'RN': {
        estado: 'Rio Grande do Norte',
        peconhentos: ['Bothrops leucurus', 'Micrurus spp.', 'Cascavel (ocasional)'],
        naoPeconhentos: ['Caninana', 'Jiboia', 'Colubrídeos']
    },
    'RS': {
        estado: 'Rio Grande do Sul',
        peconhentos: ['Bothrops pubescens / neuwiedi', 'Cascavel (subsp. sulinas)', 'Micrurus altirostris'],
        naoPeconhentos: ['Jiboia (pontual)', 'Caninana', 'Colubrídeos do sul (Philodryas, Tachymenis)']
    },
    'RO': {
        estado: 'Rondônia',
        peconhentos: ['Bothrops atrox', 'Micrurus spp.', 'Lachesis (possível)'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Falsas-corais']
    },
    'RR': {
        estado: 'Roraima',
        peconhentos: ['Bothrops atrox', 'Micrurus spp.', 'Lachesis (florestas)'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Colubrídeos']
    },
    'SC': {
        estado: 'Santa Catarina',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Jararacuçu (litoral)', 'Cascavel (menos frequente)', 'Micrurus altirostris'],
        naoPeconhentos: ['Caninana (Spilotes pullatus)', 'Jiboia', 'Falsas-corais']
    },
    'SP': {
        estado: 'São Paulo',
        peconhentos: ['Jararaca (Bothrops jararaca)', 'Jararacuçu (Bothrops jararacussu)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Falsas-corais', 'Philodryas']
    },
    'SE': {
        estado: 'Sergipe',
        peconhentos: ['Bothrops leucurus', 'Bothrops locais', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Falsas-corais']
    },
    'TO': {
        estado: 'Tocantins',
        peconhentos: ['Bothrops atrox (amazônia)', 'Bothrops (cerrado)', 'Cascavel (Crotalus durissus)', 'Micrurus spp.'],
        naoPeconhentos: ['Jiboia', 'Caninana', 'Colubrídeos']
    }
};

// Mantendo compatibilidade com código antigo que importava 'animaisCiatox'
export const animaisCiatox = animaisCatalog;
