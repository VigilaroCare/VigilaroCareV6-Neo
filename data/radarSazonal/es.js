/**
 * Radar sazonal — ESPANHA (hemisfério norte). D17, 17/10/2026.
 * Regiões: peninsula, baleares, canarias.
 */
export const JANELAS_ES = [
  {
    id: "es_invierno_co",
    paises: ["ES"],
    regioes: ["peninsula", "baleares"],
    janelas: [{ de: "11-01", ate: "03-31" }],
    pico: { de: "12-15", ate: "02-15" },
    severidade: 3,
    categoria: "intoxicacao",
    publico: ["bebe", "idoso"],
    ambientes: ["central_gas"],
    icone: "Wind",
    titulo: "Inverno: braseiros, estufas e monóxido de carbono",
    titulo_en: "Winter: braziers, stoves and carbon monoxide",
    titulo_es: "Invierno: braseros, estufas y monóxido de carbono",
    resumo: "A Espanha registra dezenas de mortes por ano por monóxido de carbono, quase todas no inverno e durante o sono: braseiros, estufas, aquecedores e chaminés sem manutenção.",
    resumo_en: "Spain records dozens of carbon monoxide deaths a year, almost all in winter and during sleep: braziers, stoves, gas heaters and poorly maintained chimneys.",
    resumo_es: "España registra decenas de muertes al año por monóxido de carbono, casi todas en invierno y durante el sueño: braseros, estufas, calentadores y chimeneas sin mantenimiento.",
    orientacoes: [
      "Braseiro não é aquecimento para dormir: apague brasas e chamas antes de deitar.",
      "Ventile a casa todos os dias e deixe uma entrada de ar onde houver combustão.",
      "Aquecedor e caldeira a gás instalados e revisados por profissional autorizado.",
      "Dor de cabeça, enjoo e sono em várias pessoas: saia ao ar livre e ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "A brazier is not heating to sleep with: put out embers and flames before bed.",
      "Air the home every day and keep an air inlet wherever something is burning.",
      "Gas heaters and boilers installed and serviced by an authorised professional.",
      "Headache, nausea and drowsiness in several people: get into the fresh air and call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "El brasero no es calefacción para dormir: apague brasas y llamas antes de acostarse.",
      "Ventile la vivienda a diario y deje una entrada de aire donde haya combustión.",
      "Calentadores y calderas de gas instalados y revisados por un profesional autorizado.",
      "Dolor de cabeza, náuseas y somnolencia en varias personas: salga al aire libre y llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "SEPAR; Comunidad de Madrid — campaña #CalorSeguro"
  },
  {
    id: "es_procesionaria",
    paises: ["ES"],
    regioes: ["peninsula", "baleares"],
    janelas: [{ de: "01-01", ate: "04-30" }],
    pico: { de: "02-01", ate: "03-31" },
    severidade: 2,
    categoria: "pets",
    publico: ["pet", "crianca"],
    ambientes: ["quintal", "jardim_horta"],
    icone: "Pet",
    titulo: "Lagarta-do-pinheiro (procesionaria)",
    titulo_en: "Pine processionary caterpillars",
    titulo_es: "Procesionaria del pino",
    resumo: "Entre janeiro e abril as lagartas descem dos pinheiros. Veterinários espanhóis alertam: cães que as cheiram ou mordem podem ter necrose da língua e da garganta. Em crianças, causam reações alérgicas.",
    resumo_en: "Between January and April the caterpillars come down from the pines. Spanish vets warn that dogs who sniff or bite them can suffer necrosis of the tongue and throat. In children they cause allergic reactions.",
    resumo_es: "Entre enero y abril las orugas bajan de los pinos. Los veterinarios advierten que los perros que las huelen o muerden pueden sufrir necrosis en la lengua y la garganta. En niños causan reacciones alérgicas.",
    orientacoes: [
      "Evite passear com o cão em zonas de pinheiros afetados nesses meses; sempre na guia.",
      "Ensine as crianças a não tocar nas lagartas nem nos ninhos.",
      "Contato: lave com bastante água e vá ao veterinário ou ao médico sem demora.",
      "Ninhos no jardim: retirada por profissional."
    ],
    orientacoes_en: [
      "Avoid walking dogs in affected pine areas during these months; always on a lead.",
      "Teach children not to touch the caterpillars or nests.",
      "Contact: rinse with plenty of water and go to the vet or doctor without delay.",
      "Nests in the garden: have a professional remove them."
    ],
    orientacoes_es: [
      "Evite pasear al perro por zonas de pinos afectados en estos meses; siempre con correa.",
      "Enseñe a los niños a no tocar las orugas ni los nidos.",
      "Contacto: lave con abundante agua y acuda al veterinario o al médico sin demora.",
      "Nidos en el jardín: retirada por un profesional."
    ],
    fonte: "Consejo de Colegios Veterinarios de Castilla y León; Govern de les Illes Balears"
  },
  {
    id: "es_fallas",
    paises: ["ES"],
    regioes: ["peninsula"],
    eventos: [{ regra: "fixo", data: "03-15", antes: 10, depois: 4, nome: "Fallas", nome_en: "Fallas", nome_es: "Fallas" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "Fallas (Comunidade Valenciana): petardos",
    titulo_en: "Fallas (Valencia region): firecrackers",
    titulo_es: "Fallas (Comunitat Valenciana): petardos",
    resumo: "A maioria das queimaduras por petardo nas Fallas acontece em crianças; as mais graves, em adultos com material mais potente. Mãos, rosto e olhos são os mais atingidos.",
    resumo_en: "Most firecracker burns during Fallas happen to children; the most serious ones to adults using stronger devices. Hands, face and eyes are hit most.",
    resumo_es: "La mayoría de las quemaduras por petardos en Fallas las sufren niños; las más graves, adultos con material más potente. Manos, cara y ojos son lo más afectado.",
    orientacoes: [
      "Criança só com petardo adequado à idade e sempre com um adulto ao lado.",
      "Acenda no chão, pela ponta do pavio, longe do rosto; nunca guarde petardos no bolso.",
      "Óculos de proteção para quem acende.",
      "Queimadura: água corrente fria por 10 a 20 minutos; nada de pasta de dente ou manteiga."
    ],
    orientacoes_en: [
      "Children only with age-appropriate firecrackers and always with an adult beside them.",
      "Light them on the ground, at the tip of the fuse, away from the face; never keep firecrackers in pockets.",
      "Safety glasses for whoever lights them.",
      "Burn: cool running water for 10 to 20 minutes; no toothpaste or butter."
    ],
    orientacoes_es: [
      "Niños solo con petardos adecuados a su edad y siempre con un adulto al lado.",
      "Encienda en el suelo, por el extremo de la mecha, lejos de la cara; nunca guarde petardos en los bolsillos.",
      "Gafas de protección para quien enciende.",
      "Quemadura: agua fría corriente durante 10 a 20 minutos; nada de pasta de dientes ni mantequilla."
    ],
    fonte: "Quirónsalud Valencia (Unidad de Mano); Bomberos de Alicante"
  },
  {
    id: "es_calor",
    paises: ["ES"],
    janelas: [{ de: "05-15", ate: "09-30" }],
    pico: { de: "07-01", ate: "08-31" },
    severidade: 3,
    categoria: "calor",
    publico: ["bebe", "idoso", "pet"],
    icone: "Sun1",
    titulo: "Calor: o plano nacional está ativo",
    titulo_en: "Heat: the national plan is active",
    titulo_es: "Calor: el plan nacional está activo",
    resumo: "O Ministério da Saúde mantém o plano contra os efeitos do excesso de temperatura de 15 de maio a 30 de setembro. Idosos, grávidas, crianças e doentes crônicos são os mais vulneráveis.",
    resumo_en: "Spain's Ministry of Health runs its plan against excess heat from 15 May to 30 September. Older adults, pregnant women, children and the chronically ill are most at risk.",
    resumo_es: "El Ministerio de Sanidad mantiene el plan frente al exceso de temperaturas del 15 de mayo al 30 de septiembre. Mayores, embarazadas, niños y enfermos crónicos son los más vulnerables.",
    orientacoes: [
      "Beba líquidos com frequência, mesmo sem sede; evite álcool, cafeína e bebidas muito doces.",
      "Menos atividade física nas horas de mais calor; fique em lugares frescos.",
      "NUNCA deixe crianças ou animais no carro.",
      "Sintomas por mais de uma hora, ou confusão: procure atendimento ou ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "Drink fluids often, even without thirst; avoid alcohol, caffeine and very sugary drinks.",
      "Less physical activity in the hottest hours; stay in cool places.",
      "NEVER leave children or animals in the car.",
      "Symptoms lasting more than an hour, or confusion: seek care or call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Beba líquidos con frecuencia, aunque no tenga sed; evite alcohol, cafeína y bebidas muy azucaradas.",
      "Menos actividad física en las horas de más calor; permanezca en lugares frescos.",
      "NUNCA deje niños ni animales en el auto.",
      "Síntomas más de una hora, o confusión: consulte a un profesional o llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "Ministerio de Sanidad — Plan de Actuaciones Preventivas del Exceso de Temperaturas"
  },
  {
    id: "es_ahogamientos",
    paises: ["ES"],
    janelas: [{ de: "06-01", ate: "09-15" }],
    severidade: 3,
    categoria: "afogamento",
    publico: ["crianca", "idoso"],
    ambientes: ["piscina"],
    icone: "Drop",
    titulo: "Afogamentos: só em zona vigiada",
    titulo_en: "Drowning: only swim where lifeguarded",
    titulo_es: "Ahogamientos: solo en zona vigilada",
    resumo: "Em 2025, 89% das mortes por afogamento na Espanha ocorreram em lugares sem salva-vidas. Pessoas de 65 a 74 anos são as mais atingidas — e as crianças pequenas, na piscina.",
    resumo_en: "In 2025, 89% of drowning deaths in Spain happened where there was no lifeguard. People aged 65 to 74 are hit hardest — and young children, in pools.",
    resumo_es: "En 2025, el 89% de las muertes por ahogamiento en España ocurrió en lugares sin socorrista. Las personas de 65 a 74 años son las más afectadas — y los niños pequeños, en piscinas.",
    orientacoes: [
      "Banho só em zonas vigiadas, respeitando bandeiras e sinalização.",
      "Idosos: entrar na água devagar, nunca depois de refeição pesada ou de muito sol, e acompanhados.",
      "Piscina com cerca e portão que fecha sozinho; um adulto vigiando, sem celular.",
      "Alguém em apuros: ligue {{EMERGENCY_NUMBER}} e jogue algo que flutue."
    ],
    orientacoes_en: [
      "Swim only in lifeguarded areas, following flags and signs.",
      "Older adults: enter the water slowly, never after a heavy meal or lots of sun, and accompanied.",
      "Pool fenced with a self-closing gate; one adult watching, no phone.",
      "Someone in trouble: call {{EMERGENCY_NUMBER}} and throw something that floats."
    ],
    orientacoes_es: [
      "Bañarse solo en zonas vigiladas, respetando banderas y señales.",
      "Mayores: entrar al agua despacio, nunca después de una comida copiosa o de mucho sol, y acompañados.",
      "Piscina vallada con puerta de cierre automático; un adulto vigilando, sin móvil.",
      "Alguien en apuros: llame al {{EMERGENCY_NUMBER}} y lance algo que flote."
    ],
    fonte: "RFESS — Informe Nacional de Ahogamientos 2025"
  },
  {
    id: "es_san_juan",
    paises: ["ES"],
    eventos: [{ regra: "fixo", data: "06-23", antes: 10, depois: 1, nome: "Noite de São João", nome_en: "St John's Eve", nome_es: "Noche de San Juan" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "Noite de São João: fogueiras e petardos",
    titulo_en: "St John's Eve: bonfires and firecrackers",
    titulo_es: "Noche de San Juan: hogueras y petardos",
    resumo: "Fogueiras na praia, petardos e banho noturno se juntam na mesma noite: queimaduras nas mãos e nos olhos e afogamentos no escuro.",
    resumo_en: "Beach bonfires, firecrackers and night swims all in one night: burns to hands and eyes, and drownings in the dark.",
    resumo_es: "Hogueras en la playa, petardos y baños nocturnos en la misma noche: quemaduras en manos y ojos y ahogamientos a oscuras.",
    orientacoes: [
      "Crianças a pelo menos 3 metros da fogueira e sem petardo sem adulto.",
      "Nada de banho de mar à noite depois de beber.",
      "Apague a fogueira com água, não só com areia (as brasas continuam quentes por horas).",
      "Pets em casa e com identificação."
    ],
    orientacoes_en: [
      "Children at least 3 metres from the bonfire and no firecrackers without an adult.",
      "No night swimming after drinking.",
      "Put the bonfire out with water, not just sand (embers stay hot for hours).",
      "Pets indoors and wearing ID."
    ],
    orientacoes_es: [
      "Niños al menos a 3 metros de la hoguera y sin petardos sin un adulto.",
      "Nada de baño nocturno después de beber.",
      "Apague la hoguera con agua, no solo con arena (las brasas siguen calientes durante horas).",
      "Mascotas en casa y con identificación."
    ],
    fonte: "Quirónsalud; Bomberos de Alicante"
  },
  {
    id: "es_incendios",
    paises: ["ES"],
    janelas: [{ de: "06-15", ate: "10-15" }],
    pico: { de: "07-01", ate: "09-15" },
    severidade: 3,
    categoria: "incendio",
    publico: [],
    icone: "Fire",
    titulo: "Época de alto perigo de incêndio florestal",
    titulo_en: "High wildfire danger season",
    titulo_es: "Época de peligro alto de incendio forestal",
    resumo: "Com o verão, cada comunidade autônoma declara a época de alto perigo e proíbe queimadas. Quem mora perto de mata precisa ter um plano de saída.",
    resumo_en: "In summer each autonomous region declares its high-danger season and bans burning. Anyone living near woodland needs an exit plan.",
    resumo_es: "Con el verano, cada comunidad autónoma declara la época de peligro alto y prohíbe las quemas. Quien vive cerca del monte necesita un plan de salida.",
    orientacoes: [
      "Nada de queimar restos, fazer churrasco ou usar ferramentas que soltem faíscas perto do mato.",
      "Mantenha o terreno em volta da casa limpo de mato seco e lenha.",
      "Ative o ES-Alert no celular e siga as ordens da Proteção Civil.",
      "Viu fumaça? Ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "No burning garden waste, barbecues or spark-producing tools near brush.",
      "Keep the ground around the house clear of dry brush and firewood.",
      "Keep ES-Alert enabled on your phone and follow civil protection orders.",
      "Seen smoke? Call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Nada de quemar restos, hacer barbacoas ni usar herramientas que hagan chispas cerca del monte.",
      "Mantenga el terreno alrededor de la casa limpio de maleza seca y leña.",
      "Tenga activado ES-Alert en el móvil y siga las órdenes de Protección Civil.",
      "¿Vio humo? Llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "Protección Civil; comunidades autónomas"
  },
  {
    id: "es_setas",
    paises: ["ES"],
    janelas: [{ de: "10-01", ate: "12-15" }],
    severidade: 2,
    categoria: "intoxicacao",
    publico: [],
    icone: "Danger",
    titulo: "Outono: cogumelos silvestres",
    titulo_en: "Autumn: wild mushrooms",
    titulo_es: "Otoño: setas silvestres",
    resumo: "A época de colheita de cogumelos traz intoxicações graves. A Amanita phalloides causa a maioria das mortes, e os sintomas aparecem só horas depois.",
    resumo_en: "Mushroom-picking season brings serious poisonings. Amanita phalloides (death cap) causes most deaths, and symptoms appear only hours later.",
    resumo_es: "La temporada de setas trae intoxicaciones graves. La Amanita phalloides causa la mayoría de las muertes y los síntomas aparecen horas después.",
    orientacoes: [
      "Coma só cogumelos identificados com certeza por um especialista.",
      "Crianças e animais longe dos cogumelos do jardim.",
      "Sintomas depois de comer cogumelos: ligue para o {{POISON_CONTROL}} e guarde um exemplar.",
      "Não espere melhorar: a fase de alívio aparente engana."
    ],
    orientacoes_en: [
      "Only eat mushrooms identified with certainty by an expert.",
      "Keep children and animals away from garden mushrooms.",
      "Symptoms after eating mushrooms: call {{POISON_CONTROL}} and keep a sample.",
      "Do not wait to feel better: the phase of apparent recovery is deceptive."
    ],
    orientacoes_es: [
      "Coma solo setas identificadas con certeza por un experto.",
      "Niños y animales lejos de las setas del jardín.",
      "Síntomas tras comer setas: llame al {{POISON_CONTROL}} y guarde un ejemplar.",
      "No espere a mejorar: la fase de alivio aparente engaña."
    ],
    fonte: "Instituto Nacional de Toxicología y Ciencias Forenses"
  },
  {
    id: "es_navidad",
    paises: ["ES"],
    janelas: [{ de: "12-01", ate: "01-06" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Gift",
    titulo: "Natal, Réveillon e Reis",
    titulo_en: "Christmas, New Year and Epiphany",
    titulo_es: "Navidad, Nochevieja y Reyes",
    resumo: "Petardos no Réveillon, velas e luzes, e presentes de Reis com pilhas de botão e ímãs: riscos que se acumulam até 6 de janeiro.",
    resumo_en: "Firecrackers on New Year's Eve, candles and lights, and Epiphany presents with button batteries and magnets: risks that build up until 6 January.",
    resumo_es: "Petardos en Nochevieja, velas y luces, y regalos de Reyes con pilas de botón e imanes: riesgos que se acumulan hasta el 6 de enero.",
    orientacoes: [
      "Brinquedos com {{CERT_SEAL}} e adequados à idade; pilhas de botão fora do alcance.",
      "Luzes desligadas ao dormir e ao sair; velas longe da árvore e das cortinas.",
      "Petardos só por adultos; animais em casa à meia-noite.",
      "Suspeita de pilha ou ímã engolido: pronto-socorro na hora."
    ],
    orientacoes_en: [
      "Toys with {{CERT_SEAL}}, suited to the child's age; button batteries out of reach.",
      "Lights off at bedtime and when going out; candles away from the tree and curtains.",
      "Firecrackers only by adults; pets indoors at midnight.",
      "Suspected swallowed battery or magnet: emergency department right away."
    ],
    orientacoes_es: [
      "Juguetes con {{CERT_SEAL}} y adecuados a la edad; pilas de botón fuera del alcance.",
      "Luces apagadas al dormir y al salir; velas lejos del árbol y las cortinas.",
      "Petardos solo por adultos; mascotas en casa a medianoche.",
      "Sospecha de pila o imán tragado: urgencias de inmediato."
    ],
    fonte: "Vigilaro Care — boas práticas"
  }
];
