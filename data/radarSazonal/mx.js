/**
 * Radar sazonal — MÉXICO (hemisfério norte). D17, 17/10/2026.
 * Regiões: norte, centro, sur.
 */
export const JANELAS_MX = [
  {
    id: "mx_alacranes",
    paises: ["MX"],
    janelas: [{ de: "03-01", ate: "09-30" }],
    pico: { de: "04-01", ate: "06-30" },
    severidade: 3,
    categoria: "peconhentos",
    publico: ["crianca", "idoso", "pet"],
    ambientes: ["quintal", "jardim_horta"],
    icone: "Danger",
    titulo: "Temporada de escorpiões (alacranes)",
    titulo_en: "Scorpion season",
    titulo_es: "Temporada de alacranes",
    resumo: "O México passou de 131 mil atendimentos por picada de escorpião até julho de 2026; o pico vai de abril a junho. Guanajuato, Jalisco, Guerrero e Michoacán concentram os casos. Crianças com menos de 5 anos e idosos correm mais risco.",
    resumo_en: "Mexico logged over 131,000 scorpion sting cases by July 2026, peaking April to June. Guanajuato, Jalisco, Guerrero and Michoacán have the most cases. Children under 5 and older adults are most at risk.",
    resumo_es: "México superó las 131 mil atenciones por picadura de alacrán hasta julio de 2026; el pico va de abril a junio. Guanajuato, Jalisco, Guerrero y Michoacán concentran los casos. Niños menores de 5 años y mayores corren más riesgo.",
    orientacoes: [
      "Sacuda roupas, sapatos e cobertas antes de usar; afaste as camas da parede.",
      "Tele portas e janelas, tampe ralos e vede rachaduras de paredes e pisos.",
      "Não ande descalço, sobretudo à noite.",
      "Picada: vá IMEDIATAMENTE ao serviço de saúde — o soro antiescorpiônico é gratuito; nada de remédio caseiro."
    ],
    orientacoes_en: [
      "Shake out clothes, shoes and bedding before use; move beds away from walls.",
      "Screens on doors and windows, cover drains and seal cracks in walls and floors.",
      "Do not walk barefoot, especially at night.",
      "Sting: go to a health service IMMEDIATELY — antivenom is free; no home remedies."
    ],
    orientacoes_es: [
      "Sacuda ropa, zapatos y cobijas antes de usarlos; separe las camas de la pared.",
      "Mosquiteros en puertas y ventanas, tape coladeras y resane grietas en muros y pisos.",
      "No camine descalzo, sobre todo de noche.",
      "Picadura: acuda DE INMEDIATO a la unidad de salud — el faboterápico es gratuito; nada de remedios caseros."
    ],
    fonte: "Secretaría de Salud — Boletín Epidemiológico 2026; Secretarías de Salud estatales"
  },
  {
    id: "mx_calor",
    paises: ["MX"],
    janelas: [{ de: "03-15", ate: "10-05" }],
    pico: { de: "04-15", ate: "06-30" },
    severidade: 3,
    categoria: "calor",
    publico: ["bebe", "idoso", "pet"],
    icone: "Sun1",
    titulo: "Temporada de calor extremo",
    titulo_en: "Extreme heat season",
    titulo_es: "Temporada de calor extremo",
    resumo: "A Secretaria de Saúde acompanha a temporada de calor da semana 12 à 40 do ano. O golpe de calor pode chegar de repente; o horário de maior risco é das 10h às 17h.",
    resumo_en: "Mexico's Ministry of Health monitors the heat season from week 12 to week 40 of the year. Heatstroke can strike suddenly; the riskiest hours are 10 am to 5 pm.",
    resumo_es: "La Secretaría de Salud vigila la temporada de calor de la semana 12 a la 40 del año. El golpe de calor puede llegar de repente; el horario de mayor riesgo es de 10 a 17 horas.",
    orientacoes: [
      "Evite o sol das 10h às 17h; água ao longo do dia, mesmo sem sede.",
      "Atenção redobrada com bebês, idosos e quem tem doença crônica.",
      "NUNCA deixe crianças ou animais dentro do carro.",
      "Temperatura do corpo acima de 39 °C, confusão ou desmaio: ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "Avoid the sun from 10 am to 5 pm; drink water through the day, even without thirst.",
      "Extra care with babies, older adults and people with chronic illness.",
      "NEVER leave children or animals in the car.",
      "Body temperature above 39 °C, confusion or fainting: call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Evite el sol de 10 a 17 horas; agua durante el día, aunque no tenga sed.",
      "Atención especial a bebés, mayores y personas con enfermedades crónicas.",
      "NUNCA deje niños ni animales dentro del auto.",
      "Temperatura corporal arriba de 39 °C, confusión o desmayo: llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "Secretaría de Salud — Dirección General de Epidemiología"
  },
  {
    id: "mx_ciclones",
    paises: ["MX"],
    janelas: [{ de: "05-15", ate: "11-30" }],
    pico: { de: "08-15", ate: "10-15" },
    severidade: 3,
    categoria: "clima",
    publico: [],
    icone: "CloudLightning",
    titulo: "Temporada de chuvas e ciclones",
    titulo_en: "Rain and hurricane season",
    titulo_es: "Temporada de lluvias y ciclones",
    resumo: "A temporada começa em 15 de maio no Pacífico e em 1º de junho no Atlântico, e vai até 30 de novembro. Cerca de cinco ciclones atingem o território por ano.",
    resumo_en: "The season starts on 15 May in the Pacific and 1 June in the Atlantic, running to 30 November. About five tropical cyclones hit Mexico each year.",
    resumo_es: "La temporada inicia el 15 de mayo en el Pacífico y el 1 de junio en el Atlántico, y termina el 30 de noviembre. Cada año impactan cerca de cinco ciclones en el territorio.",
    orientacoes: [
      "Plano familiar de proteção civil: saiba qual é o refúgio temporário mais próximo.",
      "Mochila de emergência: documentos em plástico, água, comida não perecível, remédios, lanterna e rádio.",
      "Não atravesse rios, arroios ou ruas alagadas a pé ou de carro.",
      "Siga os avisos do SMN e da Proteção Civil."
    ],
    orientacoes_en: [
      "A family civil protection plan: know your nearest temporary shelter.",
      "Emergency bag: documents in plastic, water, non-perishable food, medicines, flashlight and radio.",
      "Do not cross rivers, streams or flooded streets on foot or by car.",
      "Follow warnings from the National Weather Service (SMN) and Civil Protection."
    ],
    orientacoes_es: [
      "Plan familiar de protección civil: ubique el refugio temporal más cercano.",
      "Mochila de emergencia: documentos protegidos, agua, víveres no perecederos, medicamentos, linterna y radio.",
      "No cruce ríos, arroyos ni calles inundadas a pie o en auto.",
      "Siga los avisos del SMN y de Protección Civil."
    ],
    fonte: "SMN / CONAGUA; CENAPRED"
  },
  {
    id: "mx_dengue",
    paises: ["MX"],
    regioes: ["sur", "centro"],
    janelas: [{ de: "06-01", ate: "11-30" }],
    severidade: 2,
    categoria: "saude",
    publico: [],
    ambientes: ["quintal", "jardim_horta", "varanda"],
    icone: "Bug",
    titulo: "Chuvas: dengue e criadouros",
    titulo_en: "Rainy season: dengue and breeding sites",
    titulo_es: "Lluvias: dengue y criaderos",
    resumo: "Com as chuvas, o mosquito do dengue se multiplica em qualquer recipiente com água parada no pátio e na azotea.",
    resumo_en: "With the rains, the dengue mosquito breeds in any container with standing water in the yard or on the roof.",
    resumo_es: "Con las lluvias, el mosquito del dengue se multiplica en cualquier recipiente con agua estancada en el patio y la azotea.",
    orientacoes: [
      "“Lave, tampe, vire e jogue fora”: baldes, pneus, vasos e garrafas.",
      "Tinacos e tambos sempre tampados.",
      "Telas em portas e janelas; repelente em crianças e grávidas.",
      "Febre alta com dor no corpo: procure atendimento; não tome anti-inflamatório por conta própria."
    ],
    orientacoes_en: [
      "“Wash, cover, turn over and throw out”: buckets, tyres, plant pots and bottles.",
      "Water tanks and drums always covered.",
      "Screens on doors and windows; repellent for children and pregnant women.",
      "High fever with body aches: seek care; do not take anti-inflammatories on your own."
    ],
    orientacoes_es: [
      "“Lava, tapa, voltea y tira”: cubetas, llantas, macetas y botellas.",
      "Tinacos y tambos siempre tapados.",
      "Mosquiteros en puertas y ventanas; repelente en niños y embarazadas.",
      "Fiebre alta con dolor de cuerpo: acuda a consulta; no tome antiinflamatorios por su cuenta."
    ],
    fonte: "Secretaría de Salud"
  },
  {
    id: "mx_semana_santa",
    paises: ["MX"],
    eventos: [{ regra: "pascoa", antes: 10, depois: 1, nome: "Semana Santa", nome_en: "Holy Week", nome_es: "Semana Santa" }],
    severidade: 2,
    categoria: "afogamento",
    publico: ["crianca"],
    icone: "Drop",
    titulo: "Semana Santa: praias, rios e balneários",
    titulo_en: "Holy Week: beaches, rivers and water parks",
    titulo_es: "Semana Santa: playas, ríos y balnearios",
    resumo: "As férias de Semana Santa levam famílias para praias, rios e piscinas, com calor e multidão — terreno fértil para afogamentos e crianças perdidas.",
    resumo_en: "Holy Week holidays take families to beaches, rivers and pools amid heat and crowds — fertile ground for drownings and lost children.",
    resumo_es: "Las vacaciones de Semana Santa llevan a las familias a playas, ríos y albercas, con calor y multitudes — terreno fértil para ahogamientos y niños extraviados.",
    orientacoes: [
      "Nade só em zonas com salva-vidas e respeite as bandeiras.",
      "Um adulto “vigia da água” por turno, sem celular e sem bebida.",
      "Pulseira com nome e telefone na criança; combine um ponto de encontro.",
      "Alguém em apuros: ligue {{EMERGENCY_NUMBER}} e jogue algo que flutue."
    ],
    orientacoes_en: [
      "Swim only where there are lifeguards and respect the flags.",
      "One adult “water watcher” per shift, no phone and no drinks.",
      "A wristband with name and phone number on the child; agree a meeting point.",
      "Someone in trouble: call {{EMERGENCY_NUMBER}} and throw something that floats."
    ],
    orientacoes_es: [
      "Nade solo en zonas con salvavidas y respete las banderas.",
      "Un adulto “vigía del agua” por turno, sin celular y sin bebidas.",
      "Pulsera con nombre y teléfono en el niño; acuerden un punto de encuentro.",
      "Alguien en apuros: llame al {{EMERGENCY_NUMBER}} y lance algo que flote."
    ],
    fonte: "Vigilaro Care — boas práticas; Protección Civil"
  },
  {
    id: "mx_sismos",
    paises: ["MX"],
    eventos: [{ regra: "fixo", data: "09-19", antes: 10, depois: 1, nome: "Simulacro Nacional", nome_en: "National Drill", nome_es: "Simulacro Nacional" }],
    severidade: 2,
    categoria: "clima",
    publico: [],
    icone: "Home2",
    titulo: "Simulacro Nacional: plano familiar contra sismos",
    titulo_en: "National Drill: family earthquake plan",
    titulo_es: "Simulacro Nacional: plan familiar ante sismos",
    resumo: "Terremotos não têm estação, mas o 19 de setembro é a data do Simulacro Nacional. É o momento de revisar o plano da família.",
    resumo_en: "Earthquakes have no season, but 19 September is the date of the National Drill. It is the moment to review the family plan.",
    resumo_es: "Los sismos no tienen temporada, pero el 19 de septiembre es la fecha del Simulacro Nacional. Es el momento de revisar el plan familiar.",
    orientacoes: [
      "Identifique as zonas de menor risco da casa e as rotas de saída.",
      "Fixe estantes, espelhos e televisores na parede.",
      "Mochila de emergência com documentos, água, lanterna e remédios.",
      "Ative o alerta sísmico no celular (SASMEX) onde houver cobertura."
    ],
    orientacoes_en: [
      "Identify the safest spots in the home and the exit routes.",
      "Anchor shelves, mirrors and TVs to the wall.",
      "Emergency bag with documents, water, flashlight and medicines.",
      "Enable seismic alerts on your phone (SASMEX) where available."
    ],
    orientacoes_es: [
      "Identifique las zonas de menor riesgo de la casa y las rutas de salida.",
      "Fije libreros, espejos y televisores a la pared.",
      "Mochila de emergencia con documentos, agua, linterna y medicamentos.",
      "Active la alerta sísmica en el celular (SASMEX) donde haya cobertura."
    ],
    fonte: "CENAPRED; Coordinación Nacional de Protección Civil"
  },
  {
    id: "mx_fiestas_patrias",
    paises: ["MX"],
    eventos: [{ regra: "fixo", data: "09-15", antes: 10, depois: 1, nome: "Fiestas Patrias", nome_en: "Independence Day celebrations", nome_es: "Fiestas Patrias" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "Festas Pátrias: pirotecnia",
    titulo_en: "Independence celebrations: fireworks",
    titulo_es: "Fiestas Patrias: pirotecnia",
    resumo: "Oito em cada dez lesões por pirotecnia no México são nas mãos, seguidas de rosto e olhos — e, na maioria dos casos graves, a criança estava sem um adulto por perto.",
    resumo_en: "Eight in ten fireworks injuries in Mexico are to the hands, followed by face and eyes — and in most serious cases the child had no adult nearby.",
    resumo_es: "Ocho de cada diez lesiones por pirotecnia en México son en las manos, seguidas de cara y ojos — y en la mayoría de los casos graves el niño estaba sin un adulto cerca.",
    orientacoes: [
      "Pirotecnia só manuseada por adultos, com acendedor longo.",
      "Nunca no bolso, nem acesa dentro de garrafa ou lata.",
      "Cohete que não explodiu: não se aproxime; molhe com bastante água.",
      "Queimadura: água corrente por 10 a 20 minutos e atendimento médico."
    ],
    orientacoes_en: [
      "Fireworks handled only by adults, with a long lighter.",
      "Never in pockets, never lit inside a bottle or can.",
      "A firework that did not go off: stay away; soak it with plenty of water.",
      "Burn: running water for 10 to 20 minutes, then medical care."
    ],
    orientacoes_es: [
      "Pirotecnia solo manipulada por adultos, con encendedor largo.",
      "Nunca en los bolsillos, ni encendida dentro de botellas o latas.",
      "Cohete que no explotó: no se acerque; mójelo con abundante agua.",
      "Quemadura: agua corriente durante 10 a 20 minutos y atención médica."
    ],
    fonte: "STCONAPRA (Secretaría de Salud); IMSS"
  },
  {
    id: "mx_dia_muertos",
    paises: ["MX"],
    eventos: [{ regra: "fixo", data: "11-01", antes: 10, depois: 1, nome: "Dia dos Mortos", nome_en: "Day of the Dead", nome_es: "Día de Muertos" }],
    severidade: 2,
    categoria: "incendio",
    publico: ["crianca", "pet"],
    icone: "Fire",
    titulo: "Dia dos Mortos: velas no altar",
    titulo_en: "Day of the Dead: candles on the altar",
    titulo_es: "Día de Muertos: velas en el altar",
    resumo: "Velas acesas entre papel picado, flores secas e toalhas transformam o altar num risco de incêndio, sobretudo à noite e perto de crianças e animais.",
    resumo_en: "Lit candles among tissue paper, dried flowers and tablecloths turn the altar into a fire risk, especially at night and near children and pets.",
    resumo_es: "Las velas encendidas entre papel picado, flores secas y manteles convierten el altar en un riesgo de incendio, sobre todo de noche y cerca de niños y animales.",
    orientacoes: [
      "Velas em base firme e longe de papel picado, cortinas e flores secas.",
      "Apague as velas ao sair e ao dormir; prefira velas de LED.",
      "Altar fora do alcance de crianças pequenas e animais.",
      "Fósforos e isqueiros guardados."
    ],
    orientacoes_en: [
      "Candles on a stable base, away from tissue paper, curtains and dried flowers.",
      "Blow candles out when leaving and at bedtime; LED candles are safer.",
      "Altar out of reach of young children and pets.",
      "Matches and lighters put away."
    ],
    orientacoes_es: [
      "Velas en base firme y lejos del papel picado, cortinas y flores secas.",
      "Apague las velas al salir y al dormir; prefiera velas LED.",
      "Altar fuera del alcance de niños pequeños y mascotas.",
      "Cerillos y encendedores guardados."
    ],
    fonte: "Protección Civil; Vigilaro Care — boas práticas"
  },
  {
    id: "mx_invierno_co",
    paises: ["MX"],
    regioes: ["norte", "centro"],
    janelas: [{ de: "11-01", ate: "02-28" }],
    pico: { de: "12-15", ate: "01-31" },
    severidade: 3,
    categoria: "intoxicacao",
    publico: ["bebe", "idoso"],
    ambientes: ["central_gas"],
    icone: "Wind",
    titulo: "Frio: monóxido de carbono",
    titulo_en: "Cold: carbon monoxide",
    titulo_es: "Frío: monóxido de carbono",
    resumo: "Na temporada fria 2024-2025, 18 das 19 mortes por frio no México foram por monóxido de carbono. Aquecedores dentro do banheiro, braseiros e fogareiros em quarto fechado são as causas mais comuns.",
    resumo_en: "In the 2024–2025 cold season, 18 of Mexico's 19 cold-related deaths were from carbon monoxide. Heaters inside bathrooms, braziers and charcoal burners in closed rooms are the usual causes.",
    resumo_es: "En la temporada invernal 2024-2025, 18 de las 19 muertes por frío en México fueron por monóxido de carbono. Calentadores dentro del baño, braseros y anafres en cuartos cerrados son las causas más comunes.",
    orientacoes: [
      "Nunca durma com braseiro, fogareiro ou chama acesa dentro de casa.",
      "Aquecedor de água a gás fora do banheiro e com manutenção.",
      "Não use forno ou boca do fogão para aquecer o ambiente.",
      "Dor de cabeça, enjoo e sono em várias pessoas: saia ao ar livre e procure atendimento."
    ],
    orientacoes_en: [
      "Never sleep with a brazier, charcoal burner or open flame indoors.",
      "Gas water heater outside the bathroom and serviced.",
      "Do not use the oven or stove burners to heat the room.",
      "Headache, nausea and drowsiness in several people: get into fresh air and seek care."
    ],
    orientacoes_es: [
      "Nunca duerma con brasero, anafre o flama encendida dentro de casa.",
      "Calentador de agua a gas fuera del baño y con mantenimiento.",
      "No use el horno ni las hornillas para calentar el ambiente.",
      "Dolor de cabeza, náuseas y sueño en varias personas: salga al aire libre y busque atención."
    ],
    fonte: "Secretaría de Salud — Temporada Invernal 2024-2025"
  },
  {
    id: "mx_diciembre",
    paises: ["MX"],
    janelas: [{ de: "12-01", ate: "01-06" }],
    severidade: 3,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Gift",
    titulo: "Posadas, Natal e Ano-Novo: pirotecnia e adornos",
    titulo_en: "Posadas, Christmas and New Year: fireworks and decorations",
    titulo_es: "Posadas, Navidad y Año Nuevo: pirotecnia y adornos",
    resumo: "Entre novembro e janeiro, 73% das queimaduras registradas no México estão ligadas à pirotecnia, e crianças e jovens são a maioria. Árvores e adornos em chamas e choques ao pendurar luzes completam a lista.",
    resumo_en: "Between November and January, 73% of burns recorded in Mexico are linked to fireworks, mostly in children and young people. Burning trees and decorations and shocks while hanging lights complete the list.",
    resumo_es: "Entre noviembre y enero, el 73% de las quemaduras registradas en México está relacionado con la pirotecnia, y niños y jóvenes son la mayoría. Árboles y adornos en llamas y descargas al colgar luces completan la lista.",
    orientacoes: [
      "Pirotecnia só por adultos; crianças nunca sozinhas.",
      "Luzes com instalação em bom estado, desligadas ao dormir.",
      "Velas e “luces de Bengala” longe da árvore e das cortinas.",
      "Animais dentro de casa, com identificação, nas noites de festa."
    ],
    orientacoes_en: [
      "Fireworks only by adults; children never alone.",
      "Lights with wiring in good condition, off at bedtime.",
      "Candles and sparklers away from the tree and curtains.",
      "Pets indoors, wearing ID, on party nights."
    ],
    orientacoes_es: [
      "Pirotecnia solo por adultos; niños nunca solos.",
      "Luces con instalación en buen estado, apagadas al dormir.",
      "Velas y luces de Bengala lejos del árbol y las cortinas.",
      "Mascotas dentro de casa, con identificación, en las noches de fiesta."
    ],
    fonte: "Secretaría de Salud; IMSS"
  }
];
