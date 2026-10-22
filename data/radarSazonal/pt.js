/**
 * Radar sazonal — PORTUGAL (hemisfério norte). D17, 17/10/2026.
 * O texto-base (titulo, resumo, orientacoes) está em português de Portugal:
 * quem está em Portugal lê-o assim mesmo com o app em pt-BR.
 * Regiões: continente, acores, madeira.
 */
export const JANELAS_PT = [
  {
    id: "pt_inverno_co",
    paises: ["PT"],
    janelas: [{ de: "11-01", ate: "03-31" }],
    pico: { de: "12-15", ate: "02-15" },
    severidade: 3,
    categoria: "intoxicacao",
    publico: ["bebe", "idoso"],
    ambientes: ["central_gas"],
    icone: "Wind",
    titulo: "Inverno: monóxido de carbono",
    titulo_en: "Winter: carbon monoxide",
    titulo_es: "Invierno: monóxido de carbono",
    resumo: "O INEM (Instituto Nacional de Emergência Médica) alerta todos os invernos para intoxicações por monóxido de carbono: braseiras em divisões fechadas, esquentadores na casa de banho, salamandras e lareiras sem tiragem. O gás não tem cheiro e mata durante o sono.",
    resumo_en: "Every winter Portugal's emergency service (INEM) warns about carbon monoxide poisoning: braziers in closed rooms, gas water heaters in bathrooms, stoves and fireplaces with poor draught. The gas has no smell and kills during sleep.",
    resumo_es: "Cada invierno el INEM (Instituto Nacional de Emergencia Médica) de Portugal alerta sobre intoxicaciones por monóxido de carbono: braseros en habitaciones cerradas, calentadores en el baño, estufas y chimeneas con mal tiro. El gas no tiene olor y mata mientras se duerme.",
    orientacoes: [
      "Nunca adormeça com a braseira ou o aquecedor a gás ligados; mantenha sempre uma entrada de ar.",
      "Esquentador fora da casa de banho, com revisão em dia; chaminé limpa uma vez por ano.",
      "Instale um detetor de monóxido de carbono perto dos quartos.",
      "Dores de cabeça, tonturas e sonolência em várias pessoas da casa: abra tudo, saia e ligue {{EMERGENCY_NUMBER}}.",
      "Idosos: aqueça bem as divisões onde passam mais tempo e vigie quem vive sozinho."
    ],
    orientacoes_en: [
      "Never fall asleep with a brazier or gas heater on; always keep an air inlet open.",
      "Gas water heater outside the bathroom, serviced on schedule; chimney swept once a year.",
      "Install a carbon monoxide detector near the bedrooms.",
      "Headaches, dizziness and drowsiness in several people at home: open everything, get out and call {{EMERGENCY_NUMBER}}.",
      "Older adults: keep the rooms they use most well heated and check on those who live alone."
    ],
    orientacoes_es: [
      "Nunca se duerma con el brasero o la estufa de gas encendidos; mantenga siempre una entrada de aire.",
      "Calentador fuera del baño y con revisión al día; chimenea limpia una vez al año.",
      "Instale un detector de monóxido de carbono cerca de los dormitorios.",
      "Dolor de cabeza, mareo y somnolencia en varias personas de la casa: abra todo, salga y llame al {{EMERGENCY_NUMBER}}.",
      "Mayores: caliente bien las habitaciones donde pasan más tiempo y vigile a quien vive solo."
    ],
    fonte: "INEM; DGS — Plano de Saúde Sazonal (inverno)"
  },
  {
    id: "pt_processionaria",
    paises: ["PT"],
    regioes: ["continente"],
    janelas: [{ de: "01-01", ate: "05-31" }],
    pico: { de: "02-01", ate: "03-31" },
    severidade: 2,
    categoria: "pets",
    publico: ["pet", "crianca"],
    ambientes: ["quintal", "jardim_horta"],
    icone: "Pet",
    titulo: "Lagarta do pinheiro (processionária)",
    titulo_en: "Pine processionary caterpillars",
    titulo_es: "Procesionaria del pino",
    resumo: "Entre janeiro e maio, as lagartas descem dos pinheiros em fila. Os pelos urticantes causam lesões graves na boca e na língua dos cães — é urgência veterinária — e reações alérgicas em crianças.",
    resumo_en: "Between January and May, the caterpillars come down from pine trees in long lines. Their stinging hairs cause serious injuries to dogs' mouths and tongues — a veterinary emergency — and allergic reactions in children.",
    resumo_es: "Entre enero y mayo, las orugas bajan de los pinos en fila. Sus pelos urticantes causan lesiones graves en la boca y la lengua de los perros — es una urgencia veterinaria — y reacciones alérgicas en niños.",
    orientacoes: [
      "Em pinhais e jardins com pinheiros, cão sempre com trela e longe das filas e dos ninhos.",
      "Ensine as crianças a não tocar nas lagartas nem nos ninhos.",
      "Contacto: lave com água abundante, sem esfregar, e vá ao veterinário ou ao médico de imediato.",
      "Ninhos no seu terreno: peça a remoção a um profissional ou à câmara municipal."
    ],
    orientacoes_en: [
      "In pine woods and gardens with pines, keep dogs on a lead and away from the lines and nests.",
      "Teach children not to touch the caterpillars or their nests.",
      "Contact: rinse with plenty of water without rubbing, and go to the vet or doctor right away.",
      "Nests on your land: ask a professional or the local council to remove them."
    ],
    orientacoes_es: [
      "En pinares y jardines con pinos, el perro siempre con correa y lejos de las filas y los nidos.",
      "Enseñe a los niños a no tocar las orugas ni los nidos.",
      "Contacto: lave con abundante agua, sin frotar, y vaya al veterinario o al médico de inmediato.",
      "Nidos en su terreno: pida su retirada a un profesional o al ayuntamiento."
    ],
    fonte: "Câmaras municipais (Cascais); literatura veterinária (Univ. Lusófona)"
  },
  {
    id: "pt_limpeza_terrenos",
    paises: ["PT"],
    regioes: ["continente"],
    janelas: [{ de: "03-01", ate: "04-30" }],
    severidade: 2,
    categoria: "incendio",
    publico: [],
    ambientes: ["quintal", "jardim_horta"],
    icone: "Tree",
    titulo: "Limpeza de terrenos à volta de casa",
    titulo_en: "Clearing land around your home",
    titulo_es: "Limpieza de terrenos alrededor de casa",
    resumo: "Quem tem casa junto a espaço florestal deve limpar a vegetação numa faixa de 50 metros (10 metros em terreno agrícola), medida a partir da parede da casa. O prazo legal é normalmente 30 de abril e o Governo anuncia as prorrogações em cada ano.",
    resumo_en: "Homes next to woodland must keep vegetation cleared in a 50-metre strip (10 metres on farmland), measured from the house wall. The legal deadline is usually 30 April, and the Government announces any extension each year.",
    resumo_es: "Quien tiene casa junto a una zona forestal debe limpiar la vegetación en una franja de 50 metros (10 metros en terreno agrícola), medida desde la pared de la casa. El plazo legal suele ser el 30 de abril y el Gobierno anuncia las prórrogas cada año.",
    orientacoes: [
      "Confirme o prazo deste ano junto da câmara municipal ou do ICNF (Instituto da Conservação da Natureza e das Florestas).",
      "Retire mato, ramos secos e lenha encostados à casa; árvores com copas afastadas do telhado.",
      "Caleiras limpas de folhas e agulhas de pinheiro.",
      "Queimas de sobrantes só com autorização e fora dos dias de perigo elevado."
    ],
    orientacoes_en: [
      "Check this year's deadline with your local council or ICNF (Portugal's nature and forests institute).",
      "Remove brush, dry branches and firewood stacked against the house; keep tree canopies clear of the roof.",
      "Gutters clear of leaves and pine needles.",
      "Burning garden waste only with authorisation and never on high-risk days."
    ],
    orientacoes_es: [
      "Confirme el plazo de este año en el ayuntamiento o en el ICNF (instituto portugués de conservación de la naturaleza y los bosques).",
      "Retire maleza, ramas secas y leña apoyadas en la casa; copas de los árboles lejos del tejado.",
      "Canaletas limpias de hojas y agujas de pino.",
      "Quemas de restos solo con autorización y fuera de los días de peligro alto."
    ],
    fonte: "Decreto-Lei 82/2021; ICNF"
  },
  {
    id: "pt_calor",
    paises: ["PT"],
    janelas: [{ de: "05-01", ate: "09-30" }],
    pico: { de: "07-01", ate: "08-31" },
    severidade: 3,
    categoria: "calor",
    publico: ["bebe", "idoso", "pet"],
    icone: "Sun1",
    titulo: "Calor: o plano de verão da Direção-Geral da Saúde está ativo",
    titulo_en: "Heat: the health authority's summer plan is active",
    titulo_es: "Calor: el plan de verano de la Dirección General de la Salud está activo",
    resumo: "A DGS (Direção-Geral da Saúde) mantém o plano de resposta ao calor de 1 de maio a 30 de setembro. As noites quentes também matam: o corpo não arrefece, sobretudo em idosos, bebés e doentes crónicos.",
    resumo_en: "Portugal's health authority (DGS) runs its heat-response plan from 1 May to 30 September. Hot nights kill too: the body cannot cool down, especially in older adults, babies and the chronically ill.",
    resumo_es: "La DGS (Dirección General de la Salud) de Portugal mantiene su plan de respuesta al calor del 1 de mayo al 30 de septiembre. Las noches calurosas también matan: el cuerpo no se enfría, sobre todo en mayores, bebés y enfermos crónicos.",
    orientacoes: [
      "Água ao longo do dia, mesmo sem sede; idosos com horários marcados.",
      "Persianas fechadas durante o dia, janelas abertas à noite.",
      "NUNCA deixe crianças ou animais dentro do carro, nem por um minuto.",
      "Acompanhe os avisos do IPMA (instituto de meteorologia); confusão ou pele quente e seca é emergência — ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "Drink water throughout the day, even without thirst; set times for older adults.",
      "Blinds closed during the day, windows open at night.",
      "NEVER leave children or animals in the car, not even for a minute.",
      "Follow weather warnings from IPMA (Portugal's weather institute); confusion or hot, dry skin is an emergency — call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Agua durante el día, aunque no haya sed; mayores con horarios fijos.",
      "Persianas cerradas de día, ventanas abiertas de noche.",
      "NUNCA deje niños ni animales dentro del auto, ni un minuto.",
      "Siga los avisos del IPMA (instituto meteorológico de Portugal); confusión o piel caliente y seca es una emergencia — llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "DGS — Plano de Resposta Sazonal em Saúde (verão)"
  },
  {
    id: "pt_afogamento",
    paises: ["PT"],
    janelas: [{ de: "05-15", ate: "09-30" }],
    severidade: 3,
    categoria: "afogamento",
    publico: ["crianca"],
    ambientes: ["piscina"],
    icone: "Drop",
    titulo: "Afogamentos: rios e locais não vigiados",
    titulo_en: "Drowning: rivers and unguarded spots",
    titulo_es: "Ahogamientos: ríos y lugares sin vigilancia",
    resumo: "Em 2025, todas as mortes por afogamento registadas pela FEPONS (Federação Portuguesa de Nadadores-Salvadores) até julho ocorreram em locais sem vigilância e sem testemunhas, muitas em rios. Nas crianças pequenas, o perigo está muitas vezes na piscina de casa.",
    resumo_en: "In 2025, every drowning death recorded by FEPONS (the Portuguese lifeguards' federation) up to July happened in unguarded places with no witnesses, many of them in rivers. For young children, the danger is often the home pool.",
    resumo_es: "En 2025, todas las muertes por ahogamiento registradas por la FEPONS (Federación Portuguesa de Socorristas) hasta julio ocurrieron en lugares sin vigilancia y sin testigos, muchas en ríos. En los niños pequeños, el peligro suele estar en la piscina de casa.",
    orientacoes: [
      "Banhos só em praias e zonas vigiadas; rios e albufeiras escondem correntes, fundões e água muito fria.",
      "Piscina vedada em toda a volta, com portão que fecha sozinho.",
      "Um adulto “vigia da água” por turno, sem telemóvel.",
      "Alguém em apuros: ligue {{EMERGENCY_NUMBER}} e atire algo que flutue — não entre na água sem formação."
    ],
    orientacoes_en: [
      "Swim only at lifeguarded beaches and areas; rivers and reservoirs hide currents, sudden depths and very cold water.",
      "Pool fenced all the way round, with a self-closing gate.",
      "One adult “water watcher” per shift, no phone.",
      "Someone in trouble: call {{EMERGENCY_NUMBER}} and throw something that floats — do not go in without training."
    ],
    orientacoes_es: [
      "Bañarse solo en playas y zonas vigiladas; ríos y embalses esconden corrientes, pozas y agua muy fría.",
      "Piscina vallada por completo, con puerta de cierre automático.",
      "Un adulto “vigía del agua” por turno, sin móvil.",
      "Alguien en apuros: llame al {{EMERGENCY_NUMBER}} y lance algo que flote — no entre al agua sin formación."
    ],
    fonte: "FEPONS — Observatório do Afogamento 2025"
  },
  {
    id: "pt_incendios",
    paises: ["PT"],
    regioes: ["continente", "madeira"],
    janelas: [{ de: "06-15", ate: "10-15" }],
    pico: { de: "07-01", ate: "09-30" },
    severidade: 3,
    categoria: "incendio",
    publico: [],
    icone: "Fire",
    titulo: "Período de maior perigo de incêndio rural",
    titulo_en: "Peak wildfire danger season",
    titulo_es: "Época de mayor peligro de incendio rural",
    resumo: "Entre julho e setembro o perigo de incêndio rural é máximo. A Proteção Civil (ANEPC) envia SMS de aviso à população; tenha a família preparada para sair a tempo.",
    resumo_en: "Between July and September wildfire danger is at its highest. Portugal's civil protection (ANEPC) sends warning text messages to the public; have the family ready to leave in time.",
    resumo_es: "Entre julio y septiembre el peligro de incendio rural es máximo. La Protección Civil de Portugal (ANEPC) envía SMS de aviso a la población; tenga a la familia preparada para salir a tiempo.",
    orientacoes: [
      "Proibido fazer queimas e fogueiras e usar maquinaria que faça faísca nos dias de perigo.",
      "Combine com a família um ponto de encontro e o caminho de saída; mochila com documentos e medicamentos pronta.",
      "Incêndio a aproximar-se: siga as ordens da Proteção Civil; se ficar em casa, feche janelas e portas e molhe à volta.",
      "Viu fumo? Ligue {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_en: [
      "Burning, bonfires and spark-producing machinery are banned on high-danger days.",
      "Agree a family meeting point and escape route; keep a bag with documents and medicines ready.",
      "Fire approaching: follow civil protection orders; if staying at home, close windows and doors and wet the surroundings.",
      "Seen smoke? Call {{EMERGENCY_NUMBER}}."
    ],
    orientacoes_es: [
      "Prohibido hacer quemas y hogueras y usar maquinaria que haga chispas en los días de peligro.",
      "Acuerde con la familia un punto de encuentro y la ruta de salida; mochila con documentos y medicamentos lista.",
      "Incendio acercándose: siga las órdenes de Protección Civil; si se queda en casa, cierre ventanas y puertas y moje alrededor.",
      "¿Vio humo? Llame al {{EMERGENCY_NUMBER}}."
    ],
    fonte: "ANEPC; ICNF"
  },
  {
    id: "pt_santos_populares",
    paises: ["PT"],
    eventos: [{ regra: "fixo", data: "06-13", antes: 12, depois: 16, nome: "Santos Populares", nome_en: "Popular Saints festivals", nome_es: "Santos Populares" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "Santos Populares: fogo de artifício e brasas",
    titulo_en: "Popular Saints: fireworks and embers",
    titulo_es: "Santos Populares: fuegos artificiales y brasas",
    resumo: "Santo António, São João e São Pedro trazem fogo de artifício, balões de papel e assadores na rua. Queimaduras nas mãos e nos olhos são as lesões mais comuns.",
    resumo_en: "St Anthony, St John and St Peter bring fireworks, paper lanterns and street grills. Burns to the hands and eyes are the most common injuries.",
    resumo_es: "San Antonio, San Juan y San Pedro traen fuegos artificiales, globos de papel y asadores en la calle. Las quemaduras en manos y ojos son las lesiones más comunes.",
    orientacoes: [
      "Crianças afastadas dos assadores e das fogueiras.",
      "Fogo de artifício só comprado em local autorizado, com {{CERT_SEAL}}, aceso no chão e longe da cara.",
      "Balões de mecha acesa causam incêndios: não os lance perto de casas ou mato.",
      "Animais em casa, com identificação, nas noites de festa."
    ],
    orientacoes_en: [
      "Keep children away from grills and bonfires.",
      "Fireworks only from authorised sellers, with {{CERT_SEAL}}, lit on the ground and away from the face.",
      "Lit paper lanterns start fires: never release them near homes or brush.",
      "Pets indoors, wearing ID, on party nights."
    ],
    orientacoes_es: [
      "Niños lejos de los asadores y las hogueras.",
      "Fuegos artificiales solo de venta autorizada, con {{CERT_SEAL}}, encendidos en el suelo y lejos de la cara.",
      "Los globos con mecha encendida provocan incendios: no los suelte cerca de casas o maleza.",
      "Mascotas en casa, con identificación, en las noches de fiesta."
    ],
    fonte: "Vigilaro Care — boas práticas; PSP (pirotecnia)"
  },
  {
    id: "pt_cogumelos",
    paises: ["PT"],
    janelas: [{ de: "10-01", ate: "12-15" }],
    severidade: 2,
    categoria: "intoxicacao",
    publico: [],
    icone: "Danger",
    titulo: "Outono: cogumelos silvestres",
    titulo_en: "Autumn: wild mushrooms",
    titulo_es: "Otoño: setas silvestres",
    resumo: "Com as primeiras chuvas chega a apanha de cogumelos — e as intoxicações. A Amanita phalloides causa a maioria das mortes e os sintomas só aparecem horas depois, quando o fígado já foi atingido.",
    resumo_en: "The first rains bring mushroom picking — and poisonings. Amanita phalloides (death cap) causes most deaths, and symptoms only appear hours later, when the liver is already damaged.",
    resumo_es: "Con las primeras lluvias llega la recolección de setas — y las intoxicaciones. La Amanita phalloides causa la mayoría de las muertes y los síntomas aparecen horas después, cuando el hígado ya está dañado.",
    orientacoes: [
      "Só coma cogumelos que um micologista identificou com certeza; nenhum “truque caseiro” distingue os venenosos.",
      "Crianças e animais não apanham nem mexem em cogumelos do jardim.",
      "Vómitos, diarreia ou dores de barriga depois de comer cogumelos: ligue já para o {{POISON_CONTROL}} e guarde um exemplar.",
      "Não espere melhorar: a fase de alívio aparente é a mais traiçoeira."
    ],
    orientacoes_en: [
      "Only eat mushrooms that a mycologist has identified with certainty; no “home trick” tells the poisonous ones apart.",
      "Children and animals must not pick or handle garden mushrooms.",
      "Vomiting, diarrhoea or stomach pain after eating mushrooms: call {{POISON_CONTROL}} at once and keep a sample.",
      "Do not wait to feel better: the phase of apparent recovery is the most treacherous."
    ],
    orientacoes_es: [
      "Coma solo setas que un micólogo haya identificado con certeza; ningún “truco casero” distingue las venenosas.",
      "Niños y animales no recogen ni tocan las setas del jardín.",
      "Vómitos, diarrea o dolor de barriga tras comer setas: llame ya al {{POISON_CONTROL}} y guarde un ejemplar.",
      "No espere a mejorar: la fase de alivio aparente es la más traicionera."
    ],
    fonte: "ICNF/DGADR — Guia do colector; CIAV"
  },
  {
    id: "pt_natal",
    paises: ["PT"],
    janelas: [{ de: "12-01", ate: "01-06" }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Gift",
    titulo: "Natal e passagem de ano",
    titulo_en: "Christmas and New Year's Eve",
    titulo_es: "Navidad y Nochevieja",
    resumo: "Velas, luzes, lareiras acesas, pilhas de botão em brinquedos e postais, e fogo de artifício à meia-noite: vários riscos juntos na mesma quinzena.",
    resumo_en: "Candles, lights, lit fireplaces, button batteries in toys and cards, and fireworks at midnight: several risks in the same fortnight.",
    resumo_es: "Velas, luces, chimeneas encendidas, pilas de botón en juguetes y tarjetas, y fuegos artificiales a medianoche: varios riesgos en la misma quincena.",
    orientacoes: [
      "Luzes com {{CERT_SEAL}}, desligadas ao deitar e ao sair; velas nunca perto da árvore.",
      "Pilhas de botão fora do alcance; suspeita de ingestão é urgência imediata.",
      "Lareira com resguardo e chaminé limpa.",
      "Fogo de artifício só por adultos, com {{CERT_SEAL}}; animais em casa."
    ],
    orientacoes_en: [
      "Lights with {{CERT_SEAL}}, off at bedtime and when going out; never candles near the tree.",
      "Button batteries out of reach; suspected swallowing is an immediate emergency.",
      "Fireguard in front of the fireplace and the chimney swept.",
      "Fireworks only by adults, with {{CERT_SEAL}}; pets indoors."
    ],
    orientacoes_es: [
      "Luces con {{CERT_SEAL}}, apagadas al acostarse y al salir; velas nunca cerca del árbol.",
      "Pilas de botón fuera del alcance; la sospecha de ingestión es una urgencia inmediata.",
      "Chimenea con protector y limpia.",
      "Fuegos artificiales solo por adultos, con {{CERT_SEAL}}; mascotas en casa."
    ],
    fonte: "Vigilaro Care — boas práticas; ANEPC"
  }
];
