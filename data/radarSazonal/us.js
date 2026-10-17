/**
 * Radar sazonal — ESTADOS UNIDOS (hemisfério norte). D17, 17/10/2026.
 * Regiões: northeast, midwest, south, west.
 */
export const JANELAS_US = [
  {
    id: "us_winter_co",
    paises: ["US"],
    janelas: [{ de: "11-01", ate: "03-15" }],
    pico: { de: "12-01", ate: "02-15" },
    severidade: 3,
    categoria: "intoxicacao",
    publico: ["bebe", "idoso"],
    ambientes: ["central_gas", "garagem"],
    icone: "Wind",
    titulo: "Inverno: monóxido de carbono e aquecedores",
    titulo_en: "Winter: carbon monoxide and heaters",
    titulo_es: "Invierno: monóxido de carbono y calefactores",
    resumo: "Mais de 400 pessoas morrem por ano nos EUA por monóxido de carbono, e mais da metade das mortes ocorre de novembro a fevereiro. Geradores portáteis em uso durante falta de luz são uma causa frequente.",
    resumo_en: "More than 400 people die each year in the US from carbon monoxide, over half of them between November and February. Portable generators used during power outages are a frequent cause.",
    resumo_es: "Más de 400 personas mueren cada año en EE. UU. por monóxido de carbono, y más de la mitad entre noviembre y febrero. Los generadores portátiles usados durante apagones son una causa frecuente.",
    orientacoes: [
      "Alarme de CO em cada andar e perto dos quartos; teste todo mês.",
      "Gerador SÓ ao ar livre, a pelo menos 6 metros (20 pés) da casa — nunca na garagem, mesmo de porta aberta.",
      "Aquecedor portátil a 1 metro (3 pés) de qualquer coisa que queime, e desligado ao dormir.",
      "Alarme de CO tocou: saia, ligue {{EMERGENCY_NUMBER}} e só volte com autorização."
    ],
    orientacoes_en: [
      "A CO alarm on every level and near bedrooms; test monthly.",
      "Generators OUTSIDE ONLY, at least 20 feet from the house — never in the garage, even with the door open.",
      "Space heaters 3 feet from anything that can burn, and off when sleeping.",
      "CO alarm sounding: get out, call {{EMERGENCY_NUMBER}} and go back only when cleared."
    ],
    orientacoes_es: [
      "Alarma de CO en cada piso y cerca de los dormitorios; pruébela cada mes.",
      "Generador SOLO al aire libre, a al menos 6 metros (20 pies) de la casa — nunca en el garaje, aunque la puerta esté abierta.",
      "Calefactor portátil a 1 metro (3 pies) de cualquier cosa que pueda arder, y apagado al dormir.",
      "Si suena la alarma de CO: salga, llame al {{EMERGENCY_NUMBER}} y vuelva solo con autorización."
    ],
    fonte: "CDC; CPSC"
  },
  {
    id: "us_clocks",
    paises: ["US"],
    eventos: [
      { regra: "dst_us_inicio", antes: 5, depois: 2, nome: "mudança de horário", nome_en: "clock change", nome_es: "cambio de hora" },
      { regra: "dst_us_fim", antes: 5, depois: 2, nome: "mudança de horário", nome_en: "clock change", nome_es: "cambio de hora" }
    ],
    severidade: 1,
    categoria: "incendio",
    publico: [],
    icone: "Clock",
    titulo: "Mudou o relógio? Teste os alarmes",
    titulo_en: "Clocks changing? Test your alarms",
    titulo_es: "¿Cambia la hora? Pruebe las alarmas",
    resumo: "A mudança de horário é o lembrete combinado para testar os alarmes de fumaça e de monóxido de carbono e trocar as baterias.",
    resumo_en: "The clock change is the agreed reminder to test smoke and carbon monoxide alarms and replace their batteries.",
    resumo_es: "El cambio de hora es el recordatorio para probar las alarmas de humo y de monóxido de carbono y cambiar las pilas.",
    orientacoes: [
      "Aperte o botão de teste de cada alarme.",
      "Troque as baterias; alarmes com mais de 10 anos devem ser substituídos.",
      "Revise com a família a rota de fuga e o ponto de encontro do lado de fora."
    ],
    orientacoes_en: [
      "Press the test button on every alarm.",
      "Replace the batteries; alarms older than 10 years should be replaced.",
      "Review the escape route and outside meeting point with the family."
    ],
    orientacoes_es: [
      "Pulse el botón de prueba de cada alarma.",
      "Cambie las pilas; las alarmas con más de 10 años deben reemplazarse.",
      "Repase con la familia la ruta de escape y el punto de encuentro afuera."
    ],
    fonte: "International Association of Fire Chiefs — Change Your Clock, Change Your Battery"
  },
  {
    id: "us_tornado",
    paises: ["US"],
    regioes: ["south", "midwest"],
    janelas: [{ de: "03-01", ate: "07-15" }],
    pico: { de: "04-15", ate: "06-15" },
    severidade: 3,
    categoria: "clima",
    publico: [],
    icone: "Wind",
    titulo: "Temporada de tornados",
    titulo_en: "Tornado season",
    titulo_es: "Temporada de tornados",
    resumo: "No Sul o pico vai de março a maio; nas Planícies do Norte e no Meio-Oeste, do fim da primavera ao verão. O abrigo certo é decidido antes do alerta, não durante.",
    resumo_en: "In the South the peak runs March to May; in the northern Plains and Midwest, late spring into summer. Your shelter is chosen before the warning, not during it.",
    resumo_es: "En el Sur el pico va de marzo a mayo; en las Llanuras del Norte y el Medio Oeste, de finales de primavera al verano. El refugio se decide antes del aviso, no durante.",
    orientacoes: [
      "Escolha o abrigo: porão, ou um cômodo interno sem janelas no andar mais baixo (banheiro, closet).",
      "Casa móvel não protege: combine antes para onde ir.",
      "Alertas de emergência sem fio (WEA) ativados no celular e um rádio meteorológico NOAA.",
      "Capacete de bicicleta e calçado fechado para as crianças no abrigo."
    ],
    orientacoes_en: [
      "Pick your shelter: basement, or an interior room with no windows on the lowest floor (bathroom, closet).",
      "Mobile homes offer little protection: agree in advance where to go.",
      "Wireless Emergency Alerts on your phone, plus a NOAA weather radio.",
      "Bike helmets and closed shoes for the children in the shelter."
    ],
    orientacoes_es: [
      "Elija el refugio: sótano, o una habitación interior sin ventanas en el piso más bajo (baño, clóset).",
      "Las casas móviles no protegen: acuerde antes adónde ir.",
      "Alertas de emergencia inalámbricas (WEA) activadas en el celular y una radio meteorológica NOAA.",
      "Casco de bicicleta y calzado cerrado para los niños en el refugio."
    ],
    fonte: "National Weather Service; FEMA"
  },
  {
    id: "us_window_falls",
    paises: ["US"],
    janelas: [{ de: "04-01", ate: "09-30" }],
    severidade: 2,
    categoria: "queda",
    publico: ["crianca"],
    icone: "Home2",
    titulo: "Janelas abertas: queda de crianças",
    titulo_en: "Open windows: child falls",
    titulo_es: "Ventanas abiertas: caídas de niños",
    resumo: "Primavera e verão têm mais quedas de janela do que qualquer outra estação. A tela de mosquito foi feita para insetos, não para segurar uma criança.",
    resumo_en: "Spring and summer see more window falls than any other season. Screens are made to keep bugs out, not to hold a child.",
    resumo_es: "La primavera y el verano tienen más caídas por ventanas que cualquier otra estación. La mosquitera está hecha para los insectos, no para sostener a un niño.",
    orientacoes: [
      "Trava ou limitador que deixe a janela abrir no máximo 10 cm (4 polegadas).",
      "Grades de janela com barras a até 10 cm, com abertura de emergência para adultos.",
      "Móveis que a criança possa escalar longe das janelas.",
      "Se possível, abra a parte de cima da janela, não a de baixo."
    ],
    orientacoes_en: [
      "Window stops that limit the opening to 4 inches at most.",
      "Window guards with bars no more than 4 inches apart, with an emergency release for adults.",
      "Climbable furniture away from windows.",
      "Where possible, open the top of the window, not the bottom."
    ],
    orientacoes_es: [
      "Topes que limiten la apertura de la ventana a 10 cm (4 pulgadas) como máximo.",
      "Rejas con barras a no más de 10 cm, con apertura de emergencia para adultos.",
      "Muebles escalables lejos de las ventanas.",
      "Si es posible, abra la parte de arriba de la ventana, no la de abajo."
    ],
    fonte: "American Academy of Pediatrics; Massachusetts Department of Public Health"
  },
  {
    id: "us_drowning",
    paises: ["US"],
    janelas: [{ de: "05-15", ate: "09-15" }],
    severidade: 3,
    categoria: "afogamento",
    publico: ["crianca"],
    ambientes: ["piscina"],
    icone: "Drop",
    titulo: "Verão: afogamento infantil",
    titulo_en: "Summer: child drowning",
    titulo_es: "Verano: ahogamiento infantil",
    resumo: "Afogamento é a principal causa de morte de crianças de 1 a 4 anos nos EUA, quase sempre em piscinas de casa, em segundos e em silêncio.",
    resumo_en: "Drowning is the leading cause of death for children aged 1 to 4 in the US, mostly in home pools, in seconds and in silence.",
    resumo_es: "El ahogamiento es la principal causa de muerte de niños de 1 a 4 años en EE. UU., casi siempre en piscinas de casa, en segundos y en silencio.",
    orientacoes: [
      "Cerca de quatro lados, com pelo menos 1,2 m (4 pés), e portão que fecha e trava sozinho.",
      "Um adulto “vigia da água” por vez, sem celular e sem bebida.",
      "Aulas de natação a partir de 1 ano ajudam, mas não substituem vigilância.",
      "Aprenda RCP: os minutos até o socorro chegar decidem."
    ],
    orientacoes_en: [
      "A four-sided fence at least 4 feet high, with a self-closing, self-latching gate.",
      "One designated “water watcher” at a time, no phone and no drinks.",
      "Swim lessons from age 1 help but do not replace supervision.",
      "Learn CPR: the minutes before help arrives decide the outcome."
    ],
    orientacoes_es: [
      "Cerca de cuatro lados, de al menos 1,2 m (4 pies), con puerta que se cierra y traba sola.",
      "Un adulto “vigía del agua” por turno, sin celular y sin bebidas.",
      "Las clases de natación desde el año ayudan, pero no sustituyen la vigilancia.",
      "Aprenda RCP: los minutos hasta que llega la ayuda deciden."
    ],
    fonte: "CDC — Drowning Prevention; American Academy of Pediatrics"
  },
  {
    id: "us_hot_car",
    paises: ["US"],
    janelas: [{ de: "04-15", ate: "09-30" }],
    pico: { de: "06-01", ate: "08-31" },
    severidade: 3,
    categoria: "calor",
    publico: ["bebe", "crianca", "pet"],
    icone: "Car",
    titulo: "Criança esquecida no carro",
    titulo_en: "Children left in hot cars",
    titulo_es: "Niños olvidados en el auto",
    resumo: "Cerca de 38 crianças morrem por ano nos EUA de insolação dentro de veículos; mais da metade foi simplesmente esquecida por um cuidador. Pode acontecer com qualquer família.",
    resumo_en: "About 38 children die each year in the US from heatstroke in vehicles; more than half were simply forgotten by a caregiver. It can happen to any family.",
    resumo_es: "Cerca de 38 niños mueren cada año en EE. UU. por golpe de calor dentro de vehículos; más de la mitad fueron simplemente olvidados por un cuidador. Puede pasarle a cualquier familia.",
    orientacoes: [
      "Ponha algo indispensável (bolsa, celular, sapato do pé esquerdo) no banco de trás, junto da cadeirinha.",
      "Combine com a creche: se a criança não chegar, liguem na hora.",
      "Carro sempre trancado em casa, chave longe das crianças — muitas entram sozinhas.",
      "Viu uma criança ou animal sozinho em carro: ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "Put something you cannot do without (bag, phone, left shoe) on the back seat next to the car seat.",
      "Agree with daycare: if the child does not arrive, they call you right away.",
      "Keep the car locked at home and keys away from children — many get in on their own.",
      "See a child or animal alone in a car: call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Ponga algo imprescindible (bolso, celular, zapato izquierdo) en el asiento trasero, junto a la silla.",
      "Acuerde con la guardería: si el niño no llega, que lo llamen de inmediato.",
      "Auto siempre cerrado en casa y llaves lejos de los niños — muchos entran solos.",
      "¿Ve a un niño o animal solo en un auto? Llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "NHTSA; noheatstroke.org (San José State University)"
  },
  {
    id: "us_july4",
    paises: ["US"],
    eventos: [{ regra: "fixo", data: "07-04", antes: 16, depois: 3, nome: "4 de Julho", nome_en: "the Fourth of July", nome_es: "el 4 de Julio" }],
    severidade: 3,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "4 de Julho: fogos de artifício",
    titulo_en: "Fourth of July: fireworks",
    titulo_es: "4 de Julio: fuegos artificiales",
    resumo: "Cerca de 60% dos ferimentos com fogos acontecem nos 30 dias em torno do 4 de Julho. Sparklers, que parecem inofensivos, ferem muitas crianças pequenas.",
    resumo_en: "About 60% of fireworks injuries happen in the 30 days around the Fourth of July. Sparklers, which look harmless, injure many young children.",
    resumo_es: "Cerca del 60% de las lesiones por fuegos ocurre en los 30 días alrededor del 4 de Julio. Las bengalas, que parecen inofensivas, hieren a muchos niños pequeños.",
    orientacoes: [
      "Prefira a queima de fogos pública.",
      "Criança nunca acende nem segura fogos — nem sparkler.",
      "Fogo que falhou: não volte nem reacenda; molhe com bastante água.",
      "Pets dentro de casa, com identificação: é a noite em que mais animais fogem."
    ],
    orientacoes_en: [
      "Go to a public display instead.",
      "Children never light or hold fireworks — not even sparklers.",
      "A dud: do not go back or relight it; soak it with plenty of water.",
      "Pets indoors with ID: it is the night most animals run away."
    ],
    orientacoes_es: [
      "Prefiera el espectáculo público.",
      "Los niños nunca encienden ni sostienen fuegos — ni bengalas.",
      "Fuego que falló: no vuelva ni lo reencienda; mójelo con abundante agua.",
      "Mascotas dentro de casa, con identificación: es la noche en que más animales escapan."
    ],
    fonte: "U.S. Consumer Product Safety Commission (CPSC)"
  },
  {
    id: "us_heat",
    paises: ["US"],
    janelas: [{ de: "05-15", ate: "09-30" }],
    pico: { de: "07-01", ate: "08-31" },
    severidade: 2,
    categoria: "calor",
    publico: ["idoso", "bebe", "pet"],
    icone: "Sun1",
    titulo: "Calor extremo",
    titulo_en: "Extreme heat",
    titulo_es: "Calor extremo",
    resumo: "O calor é o fenômeno do clima que mais mata nos EUA. Idosos, bebês e quem vive sem ar-condicionado são os mais expostos.",
    resumo_en: "Heat is the deadliest weather hazard in the US. Older adults, babies and people without air conditioning are most at risk.",
    resumo_es: "El calor es el fenómeno climático que más mata en EE. UU. Mayores, bebés y quienes viven sin aire acondicionado son los más expuestos.",
    orientacoes: [
      "Acompanhe o HeatRisk do Serviço Meteorológico Nacional.",
      "Sem ar-condicionado? Vá a um centro de resfriamento (cooling center) nas horas mais quentes.",
      "Ventilador não basta acima de cerca de 35 °C; molhe a pele e use água fria.",
      "Confusão ou pele quente e seca é emergência: ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "Check the National Weather Service HeatRisk.",
      "No air conditioning? Go to a cooling center during the hottest hours.",
      "A fan is not enough above roughly 95 °F; wet your skin and use cool water.",
      "Confusion or hot, dry skin is an emergency: call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Consulte el HeatRisk del Servicio Meteorológico Nacional.",
      "¿Sin aire acondicionado? Vaya a un centro de enfriamiento en las horas de más calor.",
      "El ventilador no basta por encima de unos 35 °C; moje la piel y use agua fresca.",
      "Confusión o piel caliente y seca es una emergencia: llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "National Weather Service; CDC"
  },
  {
    id: "us_hurricane",
    paises: ["US"],
    regioes: ["south", "northeast"],
    janelas: [{ de: "06-01", ate: "11-30" }],
    pico: { de: "08-15", ate: "10-15" },
    severidade: 3,
    categoria: "clima",
    publico: [],
    icone: "CloudLightning",
    titulo: "Temporada de furacões (costa do Atlântico e do Golfo)",
    titulo_en: "Hurricane season (Atlantic and Gulf coasts)",
    titulo_es: "Temporada de huracanes (costa del Atlántico y del Golfo)",
    resumo: "De 1º de junho a 30 de novembro, com pico de meados de agosto a meados de outubro. Depois da tempestade, a maior parte das mortes vem de afogamento em enchente e de monóxido de carbono de geradores.",
    resumo_en: "From 1 June to 30 November, peaking mid-August to mid-October. After the storm, most deaths come from flood drowning and carbon monoxide from generators.",
    resumo_es: "Del 1 de junio al 30 de noviembre, con pico de mediados de agosto a mediados de octubre. Tras la tormenta, la mayoría de las muertes viene de ahogamientos por inundación y monóxido de carbono de generadores.",
    orientacoes: [
      "Saiba se você está em zona de evacuação e qual é a rota.",
      "Kit para 3 dias: água, comida, remédios, lanterna, baterias e documentos à prova d'água.",
      "Nunca dirija ou ande em água de enchente: “Turn around, don't drown”.",
      "Gerador só ao ar livre, a 6 m (20 pés) da casa."
    ],
    orientacoes_en: [
      "Know whether you are in an evacuation zone and your route.",
      "A 3-day kit: water, food, medicines, flashlight, batteries and waterproofed documents.",
      "Never drive or walk through floodwater: “Turn around, don't drown”.",
      "Generators outside only, 20 feet from the house."
    ],
    orientacoes_es: [
      "Sepa si está en zona de evacuación y cuál es su ruta.",
      "Kit para 3 días: agua, comida, medicamentos, linterna, pilas y documentos a prueba de agua.",
      "Nunca conduzca ni camine por agua de inundación: “Turn around, don't drown”.",
      "Generador solo al aire libre, a 6 m (20 pies) de la casa."
    ],
    fonte: "NOAA National Hurricane Center; FEMA (Ready.gov); CPSC"
  },
  {
    id: "us_wildfire",
    paises: ["US"],
    regioes: ["west"],
    janelas: [{ de: "06-01", ate: "11-30" }],
    pico: { de: "08-01", ate: "10-31" },
    severidade: 3,
    categoria: "incendio",
    publico: ["bebe", "idoso"],
    icone: "Fire",
    titulo: "Temporada de incêndios florestais",
    titulo_en: "Wildfire season",
    titulo_es: "Temporada de incendios forestales",
    resumo: "No Oeste, o fogo e a fumaça chegam rápido. Os primeiros metros em volta da casa decidem se uma brasa vira incêndio.",
    resumo_en: "In the West, fire and smoke arrive fast. The first few feet around the house decide whether an ember becomes a house fire.",
    resumo_es: "En el Oeste, el fuego y el humo llegan rápido. Los primeros metros alrededor de la casa deciden si una brasa se convierte en incendio.",
    orientacoes: [
      "Nada que queime a menos de 1,5 m (5 pés) da casa: lenha, móveis de jardim, folhas, cobertura vegetal.",
      "Calhas e telhado limpos de folhas e agulhas.",
      "Mochila de evacuação pronta e rota combinada; inscreva-se nos alertas do seu condado.",
      "Fumaça: janelas fechadas, filtro de ar e acompanhe a qualidade do ar no AirNow."
    ],
    orientacoes_en: [
      "Nothing that burns within 5 feet of the house: firewood, garden furniture, leaves, mulch.",
      "Gutters and roof clear of leaves and needles.",
      "Go-bag ready and route agreed; sign up for your county's alerts.",
      "Smoke: windows shut, air filter on, and check air quality on AirNow."
    ],
    orientacoes_es: [
      "Nada que arda a menos de 1,5 m (5 pies) de la casa: leña, muebles de jardín, hojas, mantillo.",
      "Canaletas y techo limpios de hojas y agujas.",
      "Mochila de evacuación lista y ruta acordada; inscríbase en las alertas de su condado.",
      "Humo: ventanas cerradas, filtro de aire y consulte la calidad del aire en AirNow."
    ],
    fonte: "FEMA (Ready.gov); EPA AirNow"
  },
  {
    id: "us_halloween",
    paises: ["US"],
    eventos: [{ regra: "fixo", data: "10-31", antes: 10, depois: 0, nome: "Halloween", nome_en: "Halloween", nome_es: "Halloween" }],
    severidade: 2,
    categoria: "transito",
    publico: ["crianca"],
    icone: "Moon",
    titulo: "Halloween: crianças na rua à noite",
    titulo_en: "Halloween: children on the street after dark",
    titulo_es: "Halloween: niños en la calle de noche",
    resumo: "Um estudo com 42 anos de dados federais mostrou que, no Halloween, o risco de morte por atropelamento de crianças de 4 a 8 anos é cerca de 10 vezes maior.",
    resumo_en: "A study of 42 years of federal data found that on Halloween, children aged 4 to 8 face about a 10-fold higher risk of dying as pedestrians.",
    resumo_es: "Un estudio con 42 años de datos federales mostró que, en Halloween, el riesgo de muerte por atropello de niños de 4 a 8 años es unas 10 veces mayor.",
    orientacoes: [
      "Lanterna e fita refletiva na fantasia; máscaras que não tapem a visão.",
      "Crianças pequenas sempre com um adulto; atravessar só na faixa.",
      "Abóbora com luz de LED, não vela.",
      "Ao dirigir nessa noite: devagar em bairros residenciais."
    ],
    orientacoes_en: [
      "A flashlight and reflective tape on the costume; masks that do not block vision.",
      "Young children always with an adult; cross only at crosswalks.",
      "LED lights in pumpkins, not candles.",
      "If driving that night: slow down in residential streets."
    ],
    orientacoes_es: [
      "Linterna y cinta reflectante en el disfraz; máscaras que no tapen la vista.",
      "Niños pequeños siempre con un adulto; cruzar solo por el paso de peatones.",
      "Calabaza con luz LED, no vela.",
      "Si conduce esa noche: despacio en las calles residenciales."
    ],
    fonte: "JAMA Pediatrics (2019), dados da NHTSA"
  },
  {
    id: "us_thanksgiving",
    paises: ["US"],
    eventos: [{ regra: "thanksgiving", antes: 7, depois: 0, nome: "Thanksgiving", nome_en: "Thanksgiving", nome_es: "Acción de Gracias" }],
    severidade: 2,
    categoria: "incendio",
    publico: [],
    icone: "Fire",
    titulo: "Thanksgiving: o dia com mais fogo na cozinha",
    titulo_en: "Thanksgiving: the top day for kitchen fires",
    titulo_es: "Acción de Gracias: el día con más fuegos en la cocina",
    resumo: "Thanksgiving é o dia do ano com mais incêndios em cozinhas residenciais, seguido do Natal. A causa número um é panela no fogo sem ninguém olhando.",
    resumo_en: "Thanksgiving is the peak day of the year for home cooking fires, followed by Christmas. The leading cause is unattended cooking.",
    resumo_es: "Acción de Gracias es el día del año con más incendios en cocinas de casa, seguido de Navidad. La causa principal es la comida al fuego sin nadie mirando.",
    orientacoes: [
      "Fogão ligado = alguém na cozinha.",
      "Fritadeira de peru só ao ar livre, longe da casa, com o peru descongelado e seco.",
      "Fogo na panela: tampe e desligue o fogo — nunca água.",
      "Crianças a 1 metro (3 pés) do fogão."
    ],
    orientacoes_en: [
      "Stove on = someone in the kitchen.",
      "Turkey fryers outdoors only, away from the house, with the turkey thawed and dry.",
      "Pan fire: put a lid on it and turn off the heat — never water.",
      "Children 3 feet from the stove."
    ],
    orientacoes_es: [
      "Estufa encendida = alguien en la cocina.",
      "Freidora de pavo solo al aire libre, lejos de la casa, con el pavo descongelado y seco.",
      "Fuego en la olla: tápela y apague el fuego — nunca agua.",
      "Niños a 1 metro (3 pies) de la estufa."
    ],
    fonte: "National Fire Protection Association (NFPA)"
  },
  {
    id: "us_holidays",
    paises: ["US"],
    janelas: [{ de: "12-01", ate: "01-06" }],
    severidade: 2,
    categoria: "incendio",
    publico: ["crianca", "pet"],
    icone: "Gift",
    titulo: "Festas de fim de ano: árvore, velas e baterias",
    titulo_en: "Holiday season: trees, candles and batteries",
    titulo_es: "Fiestas de fin de año: árbol, velas y pilas",
    resumo: "Dezembro é o pico de incêndios com velas, e o Natal é o dia com mais deles. A maioria dos incêndios em árvores de Natal acontece em dezembro e janeiro.",
    resumo_en: "December is the peak month for candle fires, and Christmas is the top day. Most Christmas tree fires happen in December and January.",
    resumo_es: "Diciembre es el pico de incendios por velas, y Navidad es el día con más. La mayoría de los incendios de árboles de Navidad ocurre en diciembre y enero.",
    orientacoes: [
      "Árvore natural regada todo dia e a 1 metro (3 pés) de aquecedores e lareira.",
      "Velas a 30 cm (1 pé) de qualquer coisa que queime; apague ao sair do cômodo.",
      "Luzes desligadas ao dormir; não ligue várias extensões em cadeia.",
      "Brinquedos e cartões com bateria de botão: compartimento parafusado."
    ],
    orientacoes_en: [
      "Water a real tree daily and keep it 3 feet from heaters and the fireplace.",
      "Candles 1 foot from anything that can burn; blow them out when leaving the room.",
      "Lights off at bedtime; do not daisy-chain extension cords.",
      "Toys and cards with button batteries: screwed-shut compartments."
    ],
    orientacoes_es: [
      "Árbol natural regado a diario y a 1 metro (3 pies) de calefactores y chimenea.",
      "Velas a 30 cm (1 pie) de cualquier cosa que pueda arder; apáguelas al salir de la habitación.",
      "Luces apagadas al dormir; no conecte extensiones en cadena.",
      "Juguetes y tarjetas con pilas de botón: compartimiento atornillado."
    ],
    fonte: "National Fire Protection Association (NFPA); CPSC"
  }
];
