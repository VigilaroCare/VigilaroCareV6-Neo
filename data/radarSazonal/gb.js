/**
 * Radar sazonal — REINO UNIDO (hemisfério norte). D17, 17/10/2026.
 * Sem regiões.
 */
export const JANELAS_GB = [
  {
    id: "gb_cold",
    paises: ["GB"],
    janelas: [{ de: "11-01", ate: "03-31" }],
    pico: { de: "12-15", ate: "02-28" },
    severidade: 3,
    categoria: "frio",
    publico: ["idoso", "bebe"],
    ambientes: ["central_gas"],
    icone: "Wind",
    titulo: "Inverno: frio e monóxido de carbono",
    titulo_en: "Winter: cold homes and carbon monoxide",
    titulo_es: "Invierno: frío y monóxido de carbono",
    resumo: "A UKHSA (agência de segurança em saúde do Reino Unido) emite alertas de saúde por frio de 1º de novembro a 31 de março. O frio aumenta infartos, AVCs e infecções respiratórias em idosos; caldeiras e aquecedores mal mantidos liberam monóxido de carbono.",
    resumo_en: "The UK Health Security Agency (UKHSA) issues cold-health alerts from 1 November to 31 March. Cold raises the risk of heart attacks, strokes and chest infections in older people; poorly maintained boilers and heaters release carbon monoxide.",
    resumo_es: "La UKHSA (agencia de seguridad sanitaria del Reino Unido) emite alertas de salud por frío del 1 de noviembre al 31 de marzo. El frío aumenta infartos, ictus e infecciones respiratorias en mayores; las calderas y estufas sin mantenimiento liberan monóxido de carbono.",
    orientacoes: [
      "Maiores de 65 anos ou com doença crônica: aqueça os cômodos mais usados a pelo menos 18 °C.",
      "Alarme de monóxido de carbono em cada cômodo com aparelho a gás, lenha ou carvão.",
      "Caldeira revisada todo ano por técnico registrado no Gas Safe Register.",
      "Gelo na calçada: calçado antiderrapante para idosos, e sal ou areia na entrada de casa."
    ],
    orientacoes_en: [
      "Over-65s or people with a long-term condition: heat the rooms you use most to at least 18 °C.",
      "A carbon monoxide alarm in every room with a gas, wood or coal appliance.",
      "Boiler serviced every year by a Gas Safe registered engineer.",
      "Icy paths: non-slip footwear for older people, and grit or sand by the front door."
    ],
    orientacoes_es: [
      "Mayores de 65 años o con enfermedad crónica: caliente las habitaciones más usadas a al menos 18 °C.",
      "Alarma de monóxido de carbono en cada habitación con aparato de gas, leña o carbón.",
      "Caldera revisada cada año por un técnico registrado en Gas Safe Register.",
      "Hielo en la acera: calzado antideslizante para mayores, y sal o arena en la entrada."
    ],
    fonte: "UKHSA — Weather-Health Alerting System; Gas Safe Register"
  },
  {
    id: "gb_bonfire",
    paises: ["GB"],
    eventos: [{ regra: "fixo", data: "11-05", antes: 14, depois: 2, nome: "Bonfire Night", nome_en: "Bonfire Night", nome_es: "Bonfire Night" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "Bonfire Night: fogos e fogueiras",
    titulo_en: "Bonfire Night: fireworks and bonfires",
    titulo_es: "Bonfire Night: fuegos y hogueras",
    resumo: "As semanas em torno de 5 de novembro (e do Diwali) concentram queimaduras com fogos e sparklers, inclusive em crianças pequenas. Um sparkler chega a mais de 1.000 °C.",
    resumo_en: "The weeks around 5 November (and Diwali) concentrate firework and sparkler burns, including in young children. A sparkler can exceed 1,000 °C.",
    resumo_es: "Las semanas alrededor del 5 de noviembre (y del Diwali) concentran quemaduras por fuegos y bengalas, también en niños pequeños. Una bengala supera los 1.000 °C.",
    orientacoes: [
      "Prefira um espetáculo público organizado aos fogos em casa.",
      "Sparkler: nunca para menores de 5 anos; luvas, braço esticado e balde de água para apagar.",
      "Fogos só com a marcação de conformidade UKCA (britânica) ou CE (europeia), acesos por um adulto, no chão, sem voltar a um fogo que falhou.",
      "Pets dentro de casa, cortinas fechadas e identificação no colar."
    ],
    orientacoes_en: [
      "Choose an organised public display over fireworks at home.",
      "Sparklers: never for under-5s; gloves, arm outstretched, and a bucket of water to put them out.",
      "Only fireworks with UKCA (UK) or CE (European) conformity marking, lit by an adult, on the ground; never go back to a dud.",
      "Pets indoors, curtains drawn and ID on the collar."
    ],
    orientacoes_es: [
      "Prefiera un espectáculo público organizado a los fuegos en casa.",
      "Bengalas: nunca para menores de 5 años; guantes, brazo estirado y un cubo de agua para apagarlas.",
      "Solo fuegos con marcado de conformidad UKCA (británico) o CE (europeo), encendidos por un adulto, en el suelo; nunca vuelva a uno que falló.",
      "Mascotas dentro de casa, cortinas cerradas e identificación en el collar."
    ],
    fonte: "RoSPA — Firework Code"
  },
  {
    id: "gb_halloween",
    paises: ["GB"],
    eventos: [{ regra: "fixo", data: "10-31", antes: 10, depois: 0, nome: "Halloween", nome_en: "Halloween", nome_es: "Halloween" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca"],
    icone: "Moon",
    titulo: "Halloween: fantasias e velas",
    titulo_en: "Halloween: costumes and candles",
    titulo_es: "Halloween: disfraces y velas",
    resumo: "Fantasias de tecido sintético pegam fogo rápido em contato com velas de abóbora; e crianças pedindo doces no escuro ficam pouco visíveis para os motoristas.",
    resumo_en: "Synthetic costumes catch fire fast near pumpkin candles, and children trick-or-treating in the dark are hard for drivers to see.",
    resumo_es: "Los disfraces sintéticos arden rápido cerca de las velas de las calabazas, y los niños pidiendo dulces a oscuras se ven poco para los conductores.",
    orientacoes: [
      "Luz de LED dentro da abóbora, nunca vela.",
      "Fantasia sem partes soltas e compridas; ensine “pare, deite e role” se a roupa pegar fogo.",
      "Lanterna ou fita refletiva na fantasia e um adulto acompanhando.",
      "Doces com embalagem fechada; atenção a alergias."
    ],
    orientacoes_en: [
      "An LED light inside the pumpkin, never a candle.",
      "Costumes without long, loose parts; teach “stop, drop and roll” if clothes catch fire.",
      "A torch or reflective tape on the costume, and an adult along.",
      "Sweets in sealed wrappers; watch for allergies."
    ],
    orientacoes_es: [
      "Luz LED dentro de la calabaza, nunca una vela.",
      "Disfraz sin partes largas y sueltas; enseñe “detente, tírate y rueda” si la ropa se prende.",
      "Linterna o cinta reflectante en el disfraz y un adulto acompañando.",
      "Dulces con envoltorio cerrado; atención a las alergias."
    ],
    fonte: "RoSPA; Office for Product Safety and Standards"
  },
  {
    id: "gb_christmas",
    paises: ["GB"],
    janelas: [{ de: "12-01", ate: "01-06" }],
    severidade: 3,
    categoria: "brinquedos",
    publico: ["crianca", "pet"],
    icone: "Gift",
    titulo: "Natal: baterias de botão, luzes e velas",
    titulo_en: "Christmas: button batteries, lights and candles",
    titulo_es: "Navidad: pilas de botón, luces y velas",
    resumo: "Brinquedos, luzes e cartões musicais trazem baterias de botão. Engolida, uma bateria queima o esôfago em duas horas. A CAPT (organização britânica de prevenção de acidentes com crianças) estima uma a duas mortes de crianças por ano no Reino Unido.",
    resumo_en: "Toys, lights and musical cards bring button batteries. Once swallowed, a battery can burn the oesophagus within two hours. The Child Accident Prevention Trust (CAPT) estimates one to two child deaths a year in the UK.",
    resumo_es: "Juguetes, luces y tarjetas musicales traen pilas de botón. Tragada, una pila quema el esófago en dos horas. La CAPT (organización británica de prevención de accidentes infantiles) estima una o dos muertes infantiles al año en el Reino Unido.",
    orientacoes: [
      "Compartimento de bateria com parafuso; baterias soltas e usadas fora do alcance.",
      "Suspeita de bateria engolida: vá AGORA ao pronto-socorro (A&E), mesmo sem sintomas.",
      "Luzes desligadas ao dormir e ao sair; velas longe da árvore e da decoração.",
      "Chocolate, uvas-passas e plantas de Natal fora do alcance dos pets."
    ],
    orientacoes_en: [
      "Battery compartments screwed shut; loose and used batteries out of reach.",
      "Suspected swallowed battery: go to A&E NOW, even without symptoms.",
      "Lights off at bedtime and when going out; candles away from the tree and decorations.",
      "Chocolate, raisins and festive plants out of pets' reach."
    ],
    orientacoes_es: [
      "Compartimiento de pilas con tornillo; pilas sueltas y usadas fuera del alcance.",
      "Sospecha de pila tragada: vaya YA a urgencias, aunque no haya síntomas.",
      "Luces apagadas al dormir y al salir; velas lejos del árbol y la decoración.",
      "Chocolate, pasas y plantas navideñas fuera del alcance de las mascotas."
    ],
    fonte: "Child Accident Prevention Trust (CAPT); NHS England"
  },
  {
    id: "gb_heat",
    paises: ["GB"],
    janelas: [{ de: "06-01", ate: "09-30" }],
    severidade: 2,
    categoria: "calor",
    publico: ["idoso", "bebe", "pet"],
    icone: "Sun1",
    titulo: "Verão: alertas de saúde por calor",
    titulo_en: "Summer: heat-health alerts",
    titulo_es: "Verano: alertas de salud por calor",
    resumo: "A UKHSA (agência de segurança em saúde do Reino Unido) emite alertas de saúde por calor de 1º de junho a 30 de setembro. As casas britânicas retêm calor, e os idosos são os primeiros afetados.",
    resumo_en: "The UK Health Security Agency (UKHSA) issues heat-health alerts from 1 June to 30 September. British homes trap heat, and older people are affected first.",
    resumo_es: "La UKHSA (agencia de seguridad sanitaria del Reino Unido) emite alertas de salud por calor del 1 de junio al 30 de septiembre. Las casas británicas retienen el calor y los mayores son los primeros afectados.",
    orientacoes: [
      "Hidratação ao longo do dia; evite o sol nas horas mais quentes.",
      "Cortinas fechadas nas janelas que pegam sol; ventile à noite.",
      "Ligue para parentes idosos que moram sozinhos.",
      "Nunca deixe crianças ou animais em carro estacionado."
    ],
    orientacoes_en: [
      "Stay hydrated through the day; avoid the sun in the hottest hours.",
      "Close curtains on sun-facing windows; ventilate at night.",
      "Call older relatives who live alone.",
      "Never leave children or animals in a parked car."
    ],
    orientacoes_es: [
      "Hidrátese durante el día; evite el sol en las horas de más calor.",
      "Cortinas cerradas en las ventanas al sol; ventile de noche.",
      "Llame a los familiares mayores que viven solos.",
      "Nunca deje niños ni animales en un auto estacionado."
    ],
    fonte: "UKHSA — Heat-Health Alerts"
  },
  {
    id: "gb_open_water",
    paises: ["GB"],
    janelas: [{ de: "04-15", ate: "09-30" }],
    pico: { de: "06-15", ate: "08-31" },
    severidade: 3,
    categoria: "afogamento",
    publico: ["crianca"],
    icone: "Drop",
    titulo: "Água fria: rios, lagos e mar",
    titulo_en: "Cold water: rivers, lakes and the sea",
    titulo_es: "Agua fría: ríos, lagos y mar",
    resumo: "Mesmo no verão, rios e lagos britânicos ficam por volta de 12 °C. O choque térmico tira o fôlego e mata até bons nadadores. Dia quente não quer dizer água quente.",
    resumo_en: "Even in summer, UK rivers and lakes are around 12 °C. Cold water shock takes your breath away and kills even strong swimmers. A hot day does not mean warm water.",
    resumo_es: "Incluso en verano, los ríos y lagos británicos rondan los 12 °C. El choque térmico corta la respiración y mata incluso a buenos nadadores. Día caluroso no significa agua cálida.",
    orientacoes: [
      "Caiu na água? “Float to Live”: deite de costas, orelhas na água, braços e pernas abertos, até a respiração acalmar.",
      "Alguém em apuros: ligue 999 (bombeiros, ou guarda costeira no mar), diga para boiar e jogue algo que flutue — não pule.",
      "Nunca pule em água desconhecida; nunca nade sozinho ou depois de beber.",
      "Crianças perto da água sempre ao alcance do braço de um adulto."
    ],
    orientacoes_en: [
      "Fallen in? “Float to Live”: lie back, ears under, arms and legs out, until your breathing calms.",
      "Someone in trouble: call 999 (fire service inland, coastguard at sea), tell them to float and throw something that floats — do not jump in.",
      "Never jump into unfamiliar water; never swim alone or after drinking.",
      "Children near water always within an adult's arm's reach."
    ],
    orientacoes_es: [
      "¿Cayó al agua? “Flota para vivir”: boca arriba, orejas en el agua, brazos y piernas abiertos, hasta que se calme la respiración.",
      "Alguien en apuros: llame al 999 (bomberos, o guardacostas en el mar), dígale que flote y lance algo que flote — no salte.",
      "Nunca salte a aguas desconocidas; nunca nade solo ni después de beber.",
      "Niños cerca del agua siempre al alcance del brazo de un adulto."
    ],
    fonte: "RNLI — Float to Live; RLSS UK; serviços de bombeiros"
  },
  {
    id: "gb_window_falls",
    paises: ["GB"],
    janelas: [{ de: "04-01", ate: "09-30" }],
    severidade: 2,
    categoria: "queda",
    publico: ["crianca"],
    icone: "Home2",
    titulo: "Tempo bom, janelas abertas: queda de crianças",
    titulo_en: "Warm weather, open windows: child falls",
    titulo_es: "Buen tiempo, ventanas abiertas: caídas de niños",
    resumo: "Na primavera e no verão as janelas ficam abertas e as quedas de crianças aumentam. Tela de mosquito não segura o peso de uma criança.",
    resumo_en: "In spring and summer windows stay open and child falls increase. A fly screen cannot hold a child's weight.",
    resumo_es: "En primavera y verano las ventanas quedan abiertas y las caídas de niños aumentan. La mosquitera no aguanta el peso de un niño.",
    orientacoes: [
      "Trava de janela que limite a abertura a cerca de 10 cm, que um adulto consiga soltar numa emergência.",
      "Camas, sofás e brinquedos longe das janelas.",
      "Varandas sempre com a porta trancada para a criança.",
      "A tela de mosquito não é barreira."
    ],
    orientacoes_en: [
      "Window restrictors limiting the opening to about 10 cm (4 in), which an adult can release in an emergency.",
      "Beds, sofas and toys away from windows.",
      "Balcony doors always locked to children.",
      "A fly screen is not a barrier."
    ],
    orientacoes_es: [
      "Limitador de apertura de ventana a unos 10 cm, que un adulto pueda soltar en una emergencia.",
      "Camas, sofás y juguetes lejos de las ventanas.",
      "Puertas de balcones siempre cerradas para el niño.",
      "La mosquitera no es una barrera."
    ],
    fonte: "RoSPA; Child Accident Prevention Trust"
  }
];
