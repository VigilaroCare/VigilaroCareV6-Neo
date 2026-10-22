/**
 * Radar sazonal — BRASIL (hemisfério sul). D17, 17/10/2026.
 * Formato e regras: ver data/radarSazonal/index.js.
 * Regiões: norte, nordeste, centro_oeste, sudeste, sul.
 */
export const JANELAS_BR = [
  {
    id: "br_afogamento_verao",
    paises: ["BR"],
    janelas: [{ de: "12-01", ate: "02-28" }],
    severidade: 3,
    categoria: "afogamento",
    publico: ["crianca"],
    ambientes: ["piscina"],
    icone: "Drop",
    titulo: "Verão: afogamento infantil",
    titulo_en: "Summer: child drowning",
    titulo_es: "Verano: ahogamiento infantil",
    resumo: "O afogamento é a 2ª causa de morte de crianças de 1 a 4 anos no Brasil, e mais da metade das mortes até 9 anos acontece dentro de casa — piscina, balde, banheira. Nas férias o risco sobe e a vigilância cai.",
    resumo_en: "Drowning is the 2nd leading cause of death for children aged 1 to 4 in Brazil, and over half of deaths up to age 9 happen at home — pools, buckets, bathtubs. Risk rises during the holidays while supervision drops.",
    resumo_es: "El ahogamiento es la 2ª causa de muerte de niños de 1 a 4 años en Brasil, y más de la mitad de las muertes hasta los 9 años ocurre en casa — piscina, cubo, bañera. En vacaciones el riesgo sube y la vigilancia baja.",
    orientacoes: [
      "Escolha um adulto “vigia da água” por turno, sem celular, ao alcance do braço da criança pequena.",
      "Piscina cercada por todos os lados, com portão que fecha e trava sozinho.",
      "Esvazie baldes e bacias e vire de boca para baixo; tampa do vaso sanitário fechada.",
      "Boia e braçadeira não salvam vidas: só colete salva-vidas aprovado, e com supervisão.",
      "Piscina inflável: esvazie depois de cada uso."
    ],
    orientacoes_en: [
      "Name one adult “water watcher” per shift, no phone, within arm's reach of young children.",
      "Pool fenced on all sides, with a self-closing, self-latching gate.",
      "Empty buckets and basins and turn them upside down; keep the toilet lid closed.",
      "Floats and armbands do not save lives: only an approved life jacket, and with supervision.",
      "Inflatable pool: empty it after every use."
    ],
    orientacoes_es: [
      "Designe un adulto “vigía del agua” por turno, sin celular, al alcance del brazo de los niños pequeños.",
      "Piscina cercada por todos los lados, con puerta que se cierra y traba sola.",
      "Vacíe cubos y palanganas y póngalos boca abajo; tapa del inodoro cerrada.",
      "Flotadores y manguitos no salvan vidas: solo chaleco salvavidas aprobado, y con supervisión.",
      "Piscina inflable: vacíela después de cada uso."
    ],
    fonte: "SOBRASA — Boletim Brasil 2025"
  },
  {
    id: "br_carnaval",
    paises: ["BR"],
    eventos: [{ regra: "carnaval", antes: 10, depois: 1 }],
    severidade: 2,
    categoria: "queimadura",
    publico: ["crianca"],
    icone: "Flash",
    titulo: "Carnaval chegando",
    titulo_en: "Carnival is coming",
    titulo_es: "Se acerca el Carnaval",
    resumo: "Viagens, multidão, calor, churrasco e bebida ao mesmo tempo: é a combinação que leva a crianças perdidas, afogamentos em viagem e queimaduras com álcool.",
    resumo_en: "Travel, crowds, heat, barbecues and drinking all at once: the mix behind lost children, drownings on trips and alcohol burns.",
    resumo_es: "Viajes, multitudes, calor, parrilladas y bebida al mismo tiempo: la combinación detrás de niños perdidos, ahogamientos en viajes y quemaduras con alcohol.",
    orientacoes: [
      "Pulseira ou etiqueta na criança com nome e telefone de contato; tire uma foto dela antes de sair.",
      "Combine um ponto de encontro e ensine a criança a procurar um policial ou um funcionário uniformizado.",
      "Nunca use álcool líquido para acender churrasqueira.",
      "Em praia, rio ou piscina de casa alugada, a regra do “vigia da água” continua valendo."
    ],
    orientacoes_en: [
      "Wristband or tag on the child with a contact name and phone number; take a photo of them before going out.",
      "Agree on a meeting point and teach the child to look for a police officer or uniformed staff.",
      "Never use liquid alcohol to light a barbecue.",
      "At the beach, river or a rental pool, the “water watcher” rule still applies."
    ],
    orientacoes_es: [
      "Pulsera o etiqueta en el niño con nombre y teléfono de contacto; tómele una foto antes de salir.",
      "Acuerden un punto de encuentro y enséñele a buscar a un policía o a un empleado uniformado.",
      "Nunca use alcohol líquido para encender la parrilla.",
      "En playa, río o piscina de casa alquilada, la regla del “vigía del agua” sigue valiendo."
    ],
    fonte: "Vigilaro Care — boas práticas; SOBRASA (afogamento)"
  },
  {
    id: "br_escorpioes",
    paises: ["BR"],
    janelas: [{ de: "09-01", ate: "03-31" }],
    severidade: 3,
    categoria: "peconhentos",
    publico: ["crianca", "idoso", "pet"],
    ambientes: ["quintal", "jardim_horta", "area_servico"],
    icone: "Danger",
    titulo: "Calor e chuva: temporada de escorpiões",
    titulo_en: "Heat and rain: scorpion season",
    titulo_es: "Calor y lluvia: temporada de escorpiones",
    resumo: "O Brasil passou de 200 mil notificações de acidentes com escorpião em 2023. O período quente e chuvoso tira o animal do esconderijo e o leva para dentro de casa. No Nordeste, julho a setembro também é época de alta.",
    resumo_en: "Brazil recorded over 200,000 scorpion sting notifications in 2023. The hot, rainy season drives them out of hiding and into homes. In the Northeast, July to September is also a peak.",
    resumo_es: "Brasil superó las 200 mil notificaciones de picaduras de escorpión en 2023. La época cálida y lluviosa los saca de su escondite y los lleva al interior de las casas. En el Nordeste, de julio a septiembre también es temporada alta.",
    orientacoes: [
      "Tela ou ralo com fechamento em pias, tanques e ralos; vede frestas de portas e rodapés.",
      "Sem entulho, telha e madeira empilhados no quintal; combata baratas, o alimento do escorpião.",
      "Sacuda roupas, sapatos e toalhas antes de usar; afaste a cama da parede.",
      "Picada em criança, idoso ou pet: vá IMEDIATAMENTE ao serviço de saúde — não espere sintomas."
    ],
    orientacoes_en: [
      "Screens or closable covers on sinks, laundry tubs and drains; seal gaps under doors and skirting boards.",
      "No rubble, tiles or wood piled in the yard; fight cockroaches, the scorpion's food.",
      "Shake out clothes, shoes and towels before use; move the bed away from the wall.",
      "Sting on a child, older adult or pet: go to a health service IMMEDIATELY — do not wait for symptoms."
    ],
    orientacoes_es: [
      "Rejillas o tapas en fregaderos, lavaderos y desagües; selle las rendijas de puertas y zócalos.",
      "Sin escombros, tejas ni madera apilados en el patio; combata las cucarachas, su alimento.",
      "Sacuda ropa, zapatos y toallas antes de usarlos; separe la cama de la pared.",
      "Picadura en niño, persona mayor o mascota: vaya DE INMEDIATO al servicio de salud — no espere síntomas."
    ],
    fonte: "Ministério da Saúde (notificações 2023); Secretarias Estaduais de Saúde"
  },
  {
    id: "br_chuvas_centro_sul",
    paises: ["BR"],
    regioes: ["sudeste", "centro_oeste", "sul"],
    janelas: [{ de: "10-15", ate: "03-31" }],
    pico: { de: "12-01", ate: "02-28" },
    severidade: 3,
    categoria: "clima",
    publico: [],
    icone: "CloudLightning",
    titulo: "Temporada de chuvas fortes e raios",
    titulo_en: "Season of heavy rain and lightning",
    titulo_es: "Temporada de lluvias fuertes y rayos",
    resumo: "O Brasil é o país com mais raios no mundo, e as tempestades de verão trazem alagamento, deslizamento e choque elétrico em casa alagada. Cerca de 1 em cada 5 mortes por raio acontece com a pessoa dentro de casa, perto da rede elétrica ou hidráulica.",
    resumo_en: "Brazil has more lightning than any other country, and summer storms bring flooding, landslides and electric shocks in flooded homes. About 1 in 5 lightning deaths happens indoors, near wiring or plumbing.",
    resumo_es: "Brasil es el país con más rayos del mundo, y las tormentas de verano traen inundaciones, deslizamientos y descargas eléctricas en casas inundadas. Cerca de 1 de cada 5 muertes por rayo ocurre dentro de casa, cerca de la red eléctrica o de agua.",
    orientacoes: [
      "Cadastre seu CEP para alertas da Defesa Civil: envie o CEP por SMS para 40199 (gratuito).",
      "Durante a tempestade, longe de tomadas, chuveiro elétrico, torneiras e celular no carregador.",
      "Água entrando em casa: desligue o disjuntor geral antes que a água chegue às tomadas — nunca pise na água com a energia ligada.",
      "Rachaduras novas, portas emperrando ou barranco cedendo perto de casa: saia e avise a Defesa Civil (199)."
    ],
    orientacoes_en: [
      "Register your postcode for Civil Defense alerts: text your CEP to 40199 (free).",
      "During the storm, stay away from outlets, electric showers, taps and phones on charge.",
      "Water coming in: switch off the main breaker before it reaches the outlets — never step into water with the power on.",
      "New cracks, sticking doors or a slope giving way near the house: leave and call Civil Defense (199)."
    ],
    orientacoes_es: [
      "Registre su código postal para alertas de Defensa Civil: envíe el CEP por SMS al 40199 (gratis).",
      "Durante la tormenta, lejos de enchufes, ducha eléctrica, grifos y celular cargando.",
      "Si entra agua en casa: corte el interruptor general antes de que llegue a los enchufes — nunca pise el agua con la corriente encendida.",
      "Grietas nuevas, puertas que se traban o una ladera que cede cerca de casa: salga y avise a Defensa Civil (199)."
    ],
    fonte: "Defesa Civil (SMS 40199); INPE/ELAT (raios)"
  },
  {
    id: "br_chuvas_nordeste",
    paises: ["BR"],
    regioes: ["nordeste"],
    janelas: [{ de: "04-01", ate: "07-31" }],
    severidade: 3,
    categoria: "clima",
    publico: [],
    icone: "CloudLightning",
    titulo: "Quadrimestre chuvoso no litoral do Nordeste",
    titulo_en: "Rainy season on the Northeast coast",
    titulo_es: "Temporada de lluvias en la costa del Nordeste",
    resumo: "No litoral leste do Nordeste, as chuvas mais fortes vêm de abril a julho, com alagamentos e deslizamentos em encostas. É também época de mais escorpiões buscando abrigo dentro de casa.",
    resumo_en: "On the eastern Northeast coast, the heaviest rain falls from April to July, with flooding and hillside landslides. Scorpions also seek shelter indoors more often in this period.",
    resumo_es: "En la costa este del Nordeste, las lluvias más fuertes caen de abril a julio, con inundaciones y deslizamientos en laderas. También es época de más escorpiones buscando refugio dentro de casa.",
    orientacoes: [
      "Cadastre seu CEP para alertas da Defesa Civil: envie o CEP por SMS para 40199 (gratuito).",
      "Água entrando em casa: desligue o disjuntor geral antes que chegue às tomadas.",
      "Mora em encosta? Observe rachaduras, árvores e postes inclinando e água barrenta brotando — saia e ligue 199.",
      "Mantenha documentos e remédios de uso contínuo em saco plástico, prontos para sair."
    ],
    orientacoes_en: [
      "Register your postcode for Civil Defense alerts: text your CEP to 40199 (free).",
      "Water coming in: switch off the main breaker before it reaches the outlets.",
      "Living on a slope? Watch for cracks, leaning trees or poles and muddy water seeping out — leave and call 199.",
      "Keep documents and regular medicines in a plastic bag, ready to go."
    ],
    orientacoes_es: [
      "Registre su código postal para alertas de Defensa Civil: envíe el CEP por SMS al 40199 (gratis).",
      "Si entra agua en casa: corte el interruptor general antes de que llegue a los enchufes.",
      "¿Vive en una ladera? Observe grietas, árboles o postes inclinándose y agua turbia brotando — salga y llame al 199.",
      "Guarde documentos y medicamentos de uso continuo en una bolsa plástica, listos para salir."
    ],
    fonte: "Defesa Civil (SMS 40199)"
  },
  {
    id: "br_chuvas_norte",
    paises: ["BR"],
    regioes: ["norte"],
    janelas: [{ de: "12-01", ate: "05-31" }],
    severidade: 3,
    categoria: "clima",
    publico: [],
    icone: "CloudLightning",
    titulo: "Período chuvoso e cheia dos rios no Norte",
    titulo_en: "Rainy season and river floods in the North",
    titulo_es: "Época de lluvias y crecida de los ríos en el Norte",
    resumo: "De dezembro a maio, chuva intensa e cheia dos rios alagam casas e ruas. Água de enchente esconde buracos, fios caídos e animais peçonhentos.",
    resumo_en: "From December to May, heavy rain and rising rivers flood homes and streets. Floodwater hides holes, fallen wires and venomous animals.",
    resumo_es: "De diciembre a mayo, lluvias intensas y la crecida de los ríos inundan casas y calles. El agua de la inundación esconde huecos, cables caídos y animales venenosos.",
    orientacoes: [
      "Cadastre seu CEP para alertas da Defesa Civil: envie o CEP por SMS para 40199 (gratuito).",
      "Desligue o disjuntor geral antes que a água chegue às tomadas.",
      "Não deixe crianças brincarem na água de enchente: afogamento, choque, cobras e doenças como a leptospirose.",
      "Água de beber e de cozinhar só tratada ou fervida."
    ],
    orientacoes_en: [
      "Register your postcode for Civil Defense alerts: text your CEP to 40199 (free).",
      "Switch off the main breaker before water reaches the outlets.",
      "Do not let children play in floodwater: drowning, electric shock, snakes and diseases such as leptospirosis.",
      "Drink and cook only with treated or boiled water."
    ],
    orientacoes_es: [
      "Registre su código postal para alertas de Defensa Civil: envíe el CEP por SMS al 40199 (gratis).",
      "Corte el interruptor general antes de que el agua llegue a los enchufes.",
      "No deje que los niños jueguen en el agua de la inundación: ahogamiento, descarga eléctrica, serpientes y enfermedades como la leptospirosis.",
      "Agua para beber y cocinar solo tratada o hervida."
    ],
    fonte: "Defesa Civil (SMS 40199); Ministério da Saúde"
  },
  {
    id: "br_dengue",
    paises: ["BR"],
    janelas: [{ de: "11-01", ate: "05-31" }],
    pico: { de: "02-01", ate: "04-30" },
    severidade: 2,
    categoria: "saude",
    publico: [],
    ambientes: ["quintal", "jardim_horta", "varanda"],
    icone: "Bug",
    titulo: "Dengue: o criadouro pode estar na sua casa ou no quintal",
    titulo_en: "Dengue: the breeding site may be in your home or yard",
    titulo_es: "Dengue: el criadero puede estar en su casa o en el patio",
    resumo: "Com calor e chuva, o mosquito Aedes aegypti se multiplica, e a maior parte dos criadouros está nas casas. Dez minutos por semana de vistoria cortam o ciclo do mosquito.",
    resumo_en: "With heat and rain the Aedes aegypti mosquito multiplies, and most breeding sites are in homes. Ten minutes of checking a week breaks its life cycle.",
    resumo_es: "Con calor y lluvia el mosquito Aedes aegypti se multiplica, y la mayoría de los criaderos está en las casas. Diez minutos de revisión por semana cortan su ciclo.",
    orientacoes: [
      "Uma vez por semana: pratinhos de vaso com areia, calhas desentupidas, garrafas de boca para baixo.",
      "Caixa d'água, tonéis e baldes sempre tampados.",
      "Ralos pouco usados: tampe ou jogue água sanitária diluída.",
      "Febre alta com dor no corpo: procure atendimento e não tome anti-inflamatório por conta própria."
    ],
    orientacoes_en: [
      "Once a week: sand in plant saucers, gutters unclogged, bottles stored upside down.",
      "Water tanks, drums and buckets always covered.",
      "Rarely used drains: cover them or pour in diluted bleach.",
      "High fever with body aches: seek care and do not take anti-inflammatories on your own."
    ],
    orientacoes_es: [
      "Una vez por semana: arena en los platos de las macetas, canaletas limpias, botellas boca abajo.",
      "Tanques de agua, toneles y cubos siempre tapados.",
      "Desagües poco usados: tápelos o eche lejía diluida.",
      "Fiebre alta con dolor en el cuerpo: busque atención y no tome antiinflamatorios por su cuenta."
    ],
    fonte: "Ministério da Saúde"
  },
  {
    id: "br_calor",
    paises: ["BR"],
    janelas: [{ de: "09-15", ate: "03-15" }],
    severidade: 2,
    categoria: "calor",
    publico: ["bebe", "idoso", "pet"],
    icone: "Sun1",
    titulo: "Calor extremo: bebês, idosos e pets primeiro",
    titulo_en: "Extreme heat: babies, older adults and pets first",
    titulo_es: "Calor extremo: bebés, mayores y mascotas primero",
    resumo: "Ondas de calor já acontecem fora do verão. Idosos sentem menos sede, bebês desidratam rápido, e um carro fechado ao sol vira uma estufa em minutos.",
    resumo_en: "Heatwaves now happen outside summer too. Older adults feel less thirst, babies dehydrate fast, and a closed car in the sun becomes an oven within minutes.",
    resumo_es: "Las olas de calor ya ocurren fuera del verano. Las personas mayores sienten menos sed, los bebés se deshidratan rápido y un auto cerrado al sol se vuelve un horno en minutos.",
    orientacoes: [
      "Ofereça água ao idoso em horários marcados — não espere a sede.",
      "NUNCA deixe criança ou pet no carro, nem “só um minuto”. Deixe a bolsa ou o celular no banco de trás, junto da cadeirinha.",
      "Passeio com cachorro só cedo ou à noite: asfalto quente queima as patas.",
      "Confusão, desmaio ou pele quente e seca: é emergência — ligue para {{EMERGENCY_MEDICAL}}."
    ],
    orientacoes_en: [
      "Offer older adults water at set times — do not wait for thirst.",
      "NEVER leave a child or pet in the car, not even “for a minute”. Put your bag or phone on the back seat next to the car seat.",
      "Walk dogs only early or late: hot asphalt burns their paws.",
      "Confusion, fainting or hot, dry skin: it is an emergency — call {{EMERGENCY_MEDICAL}}."
    ],
    orientacoes_es: [
      "Ofrezca agua a la persona mayor a horas fijas — no espere a que tenga sed.",
      "NUNCA deje a un niño o una mascota en el auto, ni “un minuto”. Ponga el bolso o el celular en el asiento trasero, junto a la silla.",
      "Pasee al perro solo temprano o de noche: el asfalto caliente quema las patas.",
      "Confusión, desmayo o piel caliente y seca: es una emergencia — llame a {{EMERGENCY_MEDICAL}}."
    ],
    fonte: "Ministério da Saúde; INMET"
  },
  {
    id: "br_festas_juninas",
    paises: ["BR"],
    janelas: [{ de: "06-01", ate: "06-30" }],
    eventos: [{ regra: "fixo", data: "06-24", antes: 24, depois: 6, nome: "São João", nome_en: "St John's Day", nome_es: "San Juan" }],
    severidade: 3,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Flash",
    titulo: "Festas juninas: fogueira, fogos e balão",
    titulo_en: "June festivals: bonfires, fireworks and balloons",
    titulo_es: "Fiestas de junio: hogueras, fuegos y globos",
    resumo: "Junho concentra queimaduras com fogueira e fogos, principalmente em crianças e nas mãos e no rosto. Soltar balão é crime ambiental (Lei 9.605/1998, art. 42) e causa incêndios em casas e matas.",
    resumo_en: "June concentrates burns from bonfires and fireworks, mostly in children and on hands and faces. Releasing fire balloons is an environmental crime in Brazil (Law 9,605/1998, art. 42) and sets homes and forests on fire.",
    resumo_es: "Junio concentra quemaduras por hogueras y fuegos artificiales, sobre todo en niños y en manos y cara. Soltar globos es un delito ambiental en Brasil (Ley 9.605/1998, art. 42) y provoca incendios en casas y bosques.",
    orientacoes: [
      "Criança longe da fogueira (pelo menos 3 metros) e sem soltar fogos, nem estalinho, sem adulto.",
      "Fogos só os com {{CERT_SEAL}}, acesos no chão, longe do rosto; o que falhou, não reacenda — molhe.",
      "Nunca álcool para avivar a fogueira; tenha um balde de água ou areia por perto.",
      "Pets presos em lugar fechado e com identificação: o barulho provoca estresse severo e faz cães e gatos fugirem.",
      "Roupa de festa em algodão: tecido sintético (poliéster, náilon) pega fogo e gruda na pele."
    ],
    orientacoes_en: [
      "Keep children away from the bonfire (at least 3 metres) and never let them set off fireworks, even small ones, without an adult.",
      "Only fireworks bearing {{CERT_SEAL}}, lit on the ground, away from the face; never relight a dud — soak it.",
      "Never use alcohol to liven up the fire; keep a bucket of water or sand nearby.",
      "Keep pets indoors and wearing ID: the noise causes severe stress and makes dogs and cats run away.",
      "Party clothes in cotton: synthetic fabrics (polyester, nylon) catch fire and stick to the skin."
    ],
    orientacoes_es: [
      "Niños lejos de la hoguera (al menos 3 metros) y sin encender fuegos, ni petardos pequeños, sin un adulto.",
      "Solo fuegos con {{CERT_SEAL}}, encendidos en el suelo, lejos de la cara; el que falló, no lo vuelva a encender — mójelo.",
      "Nunca alcohol para avivar la hoguera; tenga un cubo de agua o arena cerca.",
      "Mascotas encerradas y con identificación: el ruido provoca estrés severo y hace que perros y gatos escapen.",
      "Ropa de fiesta de algodón: las telas sintéticas (poliéster, nailon) arden y se pegan a la piel."
    ],
    fonte: "Lei 9.605/1998, art. 42; Sociedade Brasileira de Queimaduras"
  },
  {
    id: "br_inverno_co",
    paises: ["BR"],
    regioes: ["sul", "sudeste", "centro_oeste"],
    janelas: [{ de: "05-15", ate: "08-31" }],
    pico: { de: "06-15", ate: "07-31" },
    severidade: 3,
    categoria: "intoxicacao",
    publico: ["bebe", "idoso"],
    ambientes: ["central_gas"],
    icone: "Wind",
    titulo: "Frio: monóxido de carbono e aquecedores",
    titulo_en: "Cold: carbon monoxide and heaters",
    titulo_es: "Frío: monóxido de carbono y estufas",
    resumo: "O monóxido de carbono (CO) não tem cheiro nem cor e mata durante o sono. No inverno, bombeiros registram mais casos com aquecedor a gás, lareira, braseiro e até vasilha de álcool em quarto fechado.",
    resumo_en: "Carbon monoxide (CO) has no smell or colour and kills during sleep. In winter, fire departments see more cases from gas heaters, fireplaces, braziers and even bowls of burning alcohol in closed rooms.",
    resumo_es: "El monóxido de carbono (CO) no tiene olor ni color y mata mientras se duerme. En invierno, los bomberos registran más casos con estufas de gas, chimeneas, braseros e incluso recipientes con alcohol en cuartos cerrados.",
    orientacoes: [
      "Aquecedor a gás, lareira ou braseiro: sempre com uma fresta de janela aberta, e nunca ligado enquanto se dorme.",
      "Nunca aqueça o ambiente com fogão, forno ou álcool queimando.",
      "Aquecedor de água a gás fora do banheiro e com manutenção em dia; chaminé limpa uma vez por ano.",
      "Dor de cabeça, tontura e sono em várias pessoas da casa ao mesmo tempo: abra tudo, saia e ligue para {{EMERGENCY_MEDICAL}}.",
      "Aquecedor elétrico longe de cortinas e camas; bolsa de água quente nunca com água fervente.",
      "Aquecedor elétrico nunca em extensão ou benjamim; resistência com fio exposto ou cheiro de queimado vai para o lixo."
    ],
    orientacoes_en: [
      "Gas heater, fireplace or brazier: always with a window slightly open, and never on while sleeping.",
      "Never heat a room with the stove, the oven or burning alcohol.",
      "Gas water heater outside the bathroom and serviced; chimney swept once a year.",
      "Headache, dizziness and drowsiness in several people at home at once: open everything, get out and call {{EMERGENCY_MEDICAL}}.",
      "Electric heaters away from curtains and beds; never fill a hot-water bottle with boiling water.",
      "Never plug an electric heater into an extension cord or multi-plug adapter; throw away any heater with exposed wires or a burning smell."
    ],
    orientacoes_es: [
      "Estufa de gas, chimenea o brasero: siempre con una ventana entreabierta, y nunca encendidos mientras se duerme.",
      "Nunca caliente el ambiente con la cocina, el horno o alcohol encendido.",
      "Calentador de agua a gas fuera del baño y con mantenimiento al día; chimenea limpia una vez al año.",
      "Dolor de cabeza, mareo y sueño en varias personas de la casa a la vez: abra todo, salga y llame a {{EMERGENCY_MEDICAL}}.",
      "Estufa eléctrica lejos de cortinas y camas; la bolsa de agua caliente nunca con agua hirviendo.",
      "Nunca conecte una estufa eléctrica a una extensión o ladrón; deseche la que tenga cables expuestos u olor a quemado."
    ],
    fonte: "Corpo de Bombeiros (PR, MG); Defesa Civil"
  },
  {
    id: "br_seca_queimadas",
    paises: ["BR"],
    regioes: ["centro_oeste", "norte", "sudeste", "nordeste"],
    janelas: [{ de: "07-01", ate: "10-31" }],
    severidade: 2,
    categoria: "clima",
    publico: ["bebe", "idoso"],
    icone: "Wind",
    titulo: "Tempo seco e queimadas",
    titulo_en: "Dry weather and wildfires",
    titulo_es: "Tiempo seco y quemas",
    resumo: "Umidade do ar muito baixa e fumaça de queimadas agravam asma, bronquite e doenças do coração — principalmente em bebês e idosos. E fogo em terreno ou quintal pode virar incêndio rapidamente.",
    resumo_en: "Very low humidity and wildfire smoke worsen asthma, bronchitis and heart disease — especially in babies and older adults. And fire in a yard or empty lot can quickly become a blaze.",
    resumo_es: "La humedad muy baja y el humo de las quemas agravan el asma, la bronquitis y las enfermedades del corazón — sobre todo en bebés y mayores. Y el fuego en un patio o terreno puede volverse un incendio rápidamente.",
    orientacoes: [
      "Nunca queime lixo, folhas ou mato no quintal.",
      "Beba água ao longo do dia; soro fisiológico no nariz de bebês e idosos.",
      "Com fumaça no ar, janelas fechadas e atividades físicas suspensas ao ar livre.",
      "Viu foco de incêndio? Ligue para os Bombeiros ({{FIRE_NUMBER}})."
    ],
    orientacoes_en: [
      "Never burn rubbish, leaves or brush in the yard.",
      "Drink water throughout the day; saline nasal spray for babies and older adults.",
      "When there is smoke in the air, keep windows closed and stop outdoor exercise.",
      "Spotted a fire? Call the fire service ({{FIRE_NUMBER}})."
    ],
    orientacoes_es: [
      "Nunca queme basura, hojas ni maleza en el patio.",
      "Beba agua durante el día; suero fisiológico en la nariz de bebés y mayores.",
      "Con humo en el aire, ventanas cerradas y sin actividad física al aire libre.",
      "¿Vio un foco de incendio? Llame a los bomberos ({{FIRE_NUMBER}})."
    ],
    fonte: "INMET; Defesa Civil; Ministério da Saúde"
  },
  {
    // Texto revisado e aprovado pelo Agnaldo (ED-0367, 16/10/2026), vindo do
    // antigo alerta mensal de agosto.
    id: "br_ventos_agosto",
    paises: ["BR"],
    janelas: [{ de: "08-01", ate: "09-15" }],
    severidade: 2,
    categoria: "intoxicacao",
    publico: ["crianca", "pet"],
    ambientes: ["quintal", "jardim_horta"],
    icone: "Tree",
    titulo: "Ventos de agosto: frutos e sementes tóxicos no chão",
    titulo_en: "August winds: toxic fruits and seeds on the ground",
    titulo_es: "Vientos de agosto: frutos y semillas tóxicos en el suelo",
    resumo: "O vento de agosto derruba frutos e sementes de árvores e arbustos no quintal, no jardim e na calçada. Alguns são tóxicos, como os frutos do cinamomo e as sementes de mamona, chapéu-de-napoleão e pinhão-roxo, e ficam ao alcance de crianças pequenas e pets.",
    resumo_en: "August winds knock fruits and seeds from trees and shrubs into yards, gardens and sidewalks. Some are toxic — chinaberry fruits and the seeds of castor bean, yellow oleander and bellyache bush — and end up within reach of young children and pets.",
    resumo_es: "El viento de agosto tira frutos y semillas de árboles y arbustos en el patio, el jardín y la acera. Algunos son tóxicos, como los frutos del cinamomo y las semillas de ricino, cabalonga y piñón morado, y quedan al alcance de niños pequeños y mascotas.",
    orientacoes: [
      "Após tempestades: inspecione o quintal antes de liberar crianças e pets.",
      "Conheça as plantas do seu quintal — verifique quais são tóxicas na lista do CIATOX (Centro de Informação e Assistência Toxicológica).",
      "Frutos e sementes caídos: recolha os do quintal e da calçada, mesmo que não sejam das suas plantas — o vento traz os da vizinhança, e crianças pequenas e pets costumam levá-los à boca. Lembre-se de que algumas frutas e frutos podem deixar o chão escorregadio.",
      "Criança ou pet engoliu fruto ou semente suspeita: ligue para o {{POISON_CONTROL}} com a planta em mãos."
    ],
    orientacoes_en: [
      "After storms: check the yard before letting children and pets out.",
      "Know the plants in your yard — check which ones are toxic.",
      "Fallen fruits and seeds: pick them up from the yard and sidewalk, even if they are not from your plants — the wind brings the neighbours' too, and young children and pets tend to put them in their mouths. Some fruits also make the ground slippery.",
      "A child or pet swallowed a suspicious fruit or seed: call {{POISON_CONTROL}} with the plant in hand."
    ],
    orientacoes_es: [
      "Después de tormentas: revise el patio antes de dejar salir a niños y mascotas.",
      "Conozca las plantas de su patio — verifique cuáles son tóxicas.",
      "Frutos y semillas caídos: recójalos del patio y la acera, aunque no sean de sus plantas — el viento trae los de los vecinos, y los niños pequeños y las mascotas suelen llevárselos a la boca. Algunos frutos también vuelven el suelo resbaladizo.",
      "Un niño o mascota tragó un fruto o semilla sospechoso: llame a {{POISON_CONTROL}} con la planta a mano."
    ],
    fonte: "SINITOX/CIATOX — plantas tóxicas; revisão Vigilaro (ED-0367)"
  },
  {
    id: "br_pipas",
    paises: ["BR"],
    janelas: [{ de: "07-01", ate: "07-31" }, { de: "01-01", ate: "01-31" }],
    severidade: 2,
    categoria: "choque",
    publico: ["crianca"],
    icone: "Flash",
    titulo: "Férias: pipa, cerol e rede elétrica",
    titulo_en: "School holidays: kites, glass-coated line and power lines",
    titulo_es: "Vacaciones: cometas, hilo cortante y red eléctrica",
    resumo: "Nas férias, pipa enroscada na rede elétrica e linha com cerol ou “chilena” causam choques graves, quedas de laje e cortes profundos — em quem solta e em quem passa.",
    resumo_en: "During school holidays, kites tangled in power lines and glass- or abrasive-coated lines cause severe shocks, falls from rooftops and deep cuts — to the flyer and to passers-by.",
    resumo_es: "En vacaciones, cometas enredadas en la red eléctrica e hilos con vidrio o abrasivos causan descargas graves, caídas de azoteas y cortes profundos — a quien vuela la cometa y a quien pasa.",
    orientacoes: [
      "Pipa só em campo aberto, longe de fios e postes; nunca em laje ou telhado.",
      "Linha com cerol ou chilena: nunca, em lugar nenhum. É proibida por lei em vários estados e, mesmo onde não há lei, corta e pode matar quem passa.",
      "Pipa presa no fio: deixe lá e avise a distribuidora de energia — não puxe, não use vara ou cano.",
      "Motociclistas da família: antena corta-pipa na moto.",
      "Não só motociclistas: quem anda de bicicleta, ciclomotor, patinete ou outros autopropelidos também é atingido pela linha — atenção redobrada onde se solta pipa.",
      "Férias na casa de parentes: confira piscina, sacada, tomadas e remédios ao alcance antes de soltar as crianças."
    ],
    orientacoes_en: [
      "Fly kites only in open fields, away from wires and poles; never on rooftops.",
      "Glass-coated or abrasive kite line: never, anywhere. It is banned by law in several Brazilian states and, even where there is no law, it cuts and can kill passers-by.",
      "Kite stuck on a wire: leave it and call the power company — do not pull it or use poles or pipes.",
      "Motorcyclists in the family: fit an anti-kite-line antenna.",
      "Not just motorcyclists: people on bicycles, mopeds, e-scooters and other light electric vehicles are also hit by kite lines — take extra care where kites are flown.",
      "Holidays at relatives' homes: check the pool, balconies, outlets and reachable medicines before letting the children loose."
    ],
    orientacoes_es: [
      "Cometas solo en campo abierto, lejos de cables y postes; nunca en azoteas ni techos.",
      "Hilo con vidrio o abrasivo: nunca, en ningún lugar. Está prohibido por ley en varios estados brasileños y, aun donde no hay ley, corta y puede matar a quien pasa.",
      "Cometa atrapada en el cable: déjela y avise a la compañía eléctrica — no tire de ella ni use palos o tubos.",
      "Motociclistas de la familia: antena corta-hilo en la moto.",
      "No solo motociclistas: quien va en bicicleta, ciclomotor, patinete u otros vehículos eléctricos ligeros también es alcanzado por el hilo — atención redoblada donde se vuelan cometas.",
      "Vacaciones en casa de familiares: revise piscina, balcones, enchufes y medicamentos al alcance antes de dejar sueltos a los niños."
    ],
    fonte: "Distribuidoras de energia; Corpo de Bombeiros"
  },
  {
    id: "br_dia_criancas",
    paises: ["BR"],
    eventos: [{ regra: "fixo", data: "10-12", antes: 14, depois: 3, nome: "Dia das Crianças", nome_en: "Children's Day", nome_es: "Día del Niño" }],
    severidade: 2,
    categoria: "brinquedos",
    publico: ["crianca"],
    icone: "Gift",
    titulo: "Dia das Crianças: presente seguro",
    titulo_en: "Children's Day: a safe gift",
    titulo_es: "Día del Niño: un regalo seguro",
    resumo: "Bateria de botão e ímã pequeno engolidos causam lesões internas graves em poucas horas. A faixa etária na embalagem não é sugestão: é segurança.",
    resumo_en: "Swallowed button batteries and small magnets cause serious internal injuries within hours. The age rating on the box is not a suggestion: it is safety.",
    resumo_es: "Las pilas de botón y los imanes pequeños tragados causan lesiones internas graves en pocas horas. La edad indicada en la caja no es una sugerencia: es seguridad.",
    orientacoes: [
      "Compre só brinquedo com {{CERT_SEAL}} e respeite a idade indicada.",
      "Pense na casa toda: irmãos, primos e filhos de vizinhos de idades diferentes dividem brinquedos — peças pequenas, ímãs e baterias do brinquedo de uma criança maior podem chegar às mãos das menores.",
      "Compartimento de pilha com parafuso; pilhas de botão guardadas fora do alcance.",
      "Suspeita de bateria ou ímã engolido: pronto-socorro imediatamente, mesmo sem sintomas.",
      "Para menores de 3 anos: nada que caiba num tubo de papel higiênico.",
      "Compartimento sem parafuso: feche com fita adesiva forte; pilhas usadas vão direto para o coletor, nunca ficam sobre a mesa."
    ],
    orientacoes_en: [
      "Buy only toys with {{CERT_SEAL}} and respect the age rating.",
      "Think of the whole household: siblings, cousins and neighbours' children of different ages share toys — small parts, magnets and batteries from an older child's toy can end up in a younger child's hands.",
      "Battery compartments must be screwed shut; keep button batteries out of reach.",
      "Suspect a swallowed battery or magnet: emergency room immediately, even without symptoms.",
      "For under-3s: nothing that fits through a toilet-paper tube.",
      "Compartments without a screw: seal them with strong tape; used batteries go straight to a recycling point, never left on a table."
    ],
    orientacoes_es: [
      "Compre solo juguetes con {{CERT_SEAL}} y respete la edad indicada.",
      "Piense en toda la casa: hermanos, primos e hijos de vecinos de distintas edades comparten juguetes; piezas pequeñas, imanes y pilas del juguete de un niño mayor pueden llegar a manos de los más pequeños.",
      "Compartimiento de pilas con tornillo; pilas de botón fuera del alcance.",
      "Sospecha de pila o imán tragado: urgencias de inmediato, aunque no haya síntomas.",
      "Para menores de 3 años: nada que quepa por un tubo de papel higiénico.",
      "Compartimento sin tornillo: ciérrelo con cinta fuerte; las pilas usadas van directo al contenedor, nunca quedan sobre la mesa."
    ],
    fonte: "Inmetro; Sociedade Brasileira de Pediatria"
  },
  {
    id: "br_fim_de_ano",
    paises: ["BR"],
    janelas: [{ de: "12-01", ate: "01-06" }],
    severidade: 3,
    categoria: "queimadura",
    publico: ["crianca", "pet"],
    icone: "Gift",
    titulo: "Natal e Réveillon",
    titulo_en: "Christmas and New Year",
    titulo_es: "Navidad y Año Nuevo",
    resumo: "Fogos, luzes de Natal, bebida ao alcance das crianças e viagens com piscina e praia. É a época em que vários riscos se somam na mesma semana.",
    resumo_en: "Fireworks, Christmas lights, drinks within children's reach and trips with pools and beaches. Several risks pile up in the same week.",
    resumo_es: "Fuegos artificiales, luces de Navidad, bebida al alcance de los niños y viajes con piscina y playa. Varios riesgos se suman en la misma semana.",
    orientacoes: [
      "Fogos só com adultos, com {{CERT_SEAL}}, acesos no chão e longe do rosto.",
      "Pisca-pisca com {{CERT_SEAL}}, desligado ao dormir e ao sair; árvore longe de velas.",
      "Copos e garrafas de bebida alcoólica fora do alcance das crianças durante e após a festa.",
      "Pets com identificação e em lugar fechado à meia-noite.",
      "Fogos de fabricação caseira ou sem procedência são ilegais e extremamente perigosos: nunca compre nem deixe crianças manusearem.",
      "Queimadura por fogos: água corrente fria por 20 minutos e pronto-socorro.",
      "Bico-de-papagaio (flor-de-natal) irrita boca e olhos; enfeites pequenos e bolas de árvore são risco de engasgo para menores de 3 anos — tudo fora do alcance de crianças e pets."
    ],
    orientacoes_en: [
      "Fireworks only by adults, with {{CERT_SEAL}}, lit on the ground and away from the face.",
      "String lights with {{CERT_SEAL}}, switched off when sleeping or going out; tree away from candles.",
      "Glasses and bottles of alcohol out of children's reach during and after the party.",
      "Pets wearing ID and shut indoors at midnight.",
      "Homemade or unbranded fireworks are illegal and extremely dangerous: never buy them or let children handle them.",
      "Firework burn: cool running water for 20 minutes, then the emergency room.",
      "Poinsettia irritates the mouth and eyes; small ornaments and baubles are a choking risk for under-3s — keep them all out of reach of children and pets."
    ],
    orientacoes_es: [
      "Fuegos solo por adultos, con {{CERT_SEAL}}, encendidos en el suelo y lejos de la cara.",
      "Luces navideñas con {{CERT_SEAL}}, apagadas al dormir y al salir; árbol lejos de las velas.",
      "Vasos y botellas de alcohol fuera del alcance de los niños durante y después de la fiesta.",
      "Mascotas con identificación y encerradas a medianoche.",
      "Los fuegos de fabricación casera o sin procedencia son ilegales y muy peligrosos: nunca los compre ni deje que los niños los manipulen.",
      "Quemadura por fuegos: agua fría corriente durante 20 minutos y urgencias.",
      "La flor de Pascua irrita la boca y los ojos; los adornos pequeños y las bolas del árbol son riesgo de atragantamiento para menores de 3 años — todo fuera del alcance de niños y mascotas."
    ],
    fonte: "Corpo de Bombeiros; Sociedade Brasileira de Queimaduras"
  }
];
