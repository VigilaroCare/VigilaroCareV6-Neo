/**
 * bagagem_viagem.js — o que levar na viagem, e por quê.
 *
 * ── DE ONDE VEIO ────────────────────────────────────────────────────────
 * Havia duas telas dizendo a mesma coisa: `FazendoAsMalas` (lista acionável,
 * alcançável pela aba Viagem) e `KitViagem` (lista de referência, 365 linhas,
 * registrada no App.js e SEM nenhum caminho de navegação — ninguém conseguia
 * abrir). A segunda tinha o conteúdo mais fundo: o porquê e o quanto
 * ("margem de 3 a 5 dias extras", "bagagem de mão, nunca no porão"), além de
 * categorias inteiras que a primeira não cobria — primeiros socorros, higiene,
 * hidratação e segurança pessoal.
 *
 * Religar a segunda tela poria duas listas de remédio na mesma aba, sem
 * concordar entre si. O conteúdo foi consolidado AQUI e a tela órfã saiu.
 *
 * ── CONVENÇÃO DE IDIOMA ─────────────────────────────────────────────────
 * Campo base = pt-BR; sufixos `_en`, `_es` e `_ptpt`, lidos por `t_field` e
 * `t_array` (utils/getLocalizedField). O `_ptpt` só aparece onde o português
 * europeu realmente diverge — "pensos rápidos", "telemóvel", "autocarro" —
 * porque o helper cai no pt-BR quando o campo não existe. Duplicar texto
 * idêntico só engordaria o arquivo e criaria dois lugares para corrigir.
 *
 * ── FONTE ÚNICA ─────────────────────────────────────────────────────────
 * `buildDynamicKits` mora aqui e é consumida pela tela E pelo
 * TravelReportService (dossiê em PDF). Não duplicar a regra de cruzamento.
 */
import { DS as Neo } from '../../utils/DesignSystem2026';

// ═══════════════════════════════════════════════════════════════════════
// BASE — entram em toda viagem
// ═══════════════════════════════════════════════════════════════════════

const MEDICAMENTOS = {
    id: 'medicamentos_ida',
    icon: 'Lovely',
    color: Neo.colors.feedback.error,
    title: 'Medicamentos',
    title_en: 'Medication',
    title_es: 'Medicamentos',
    intro: 'A parte mais crítica do preparo. Falta de remédio em viagem não se resolve no destino.',
    intro_en: 'The most critical part of packing. Running out of medication away from home is not easy to fix.',
    intro_es: 'La parte más crítica del equipaje. Quedarse sin medicación en el viaje no se resuelve en el destino.',
    sections: [
        {
            subtitle: 'Uso contínuo',
            subtitle_en: 'Ongoing treatment',
            subtitle_es: 'Uso continuo',
            items: [
                'Remédios de condições crônicas (pressão, diabetes e afins)',
                'Calcule os dias da viagem + margem de 3 a 5 dias extras',
                'Mantenha na embalagem original, com a bula',
                'Leve na bagagem de mão — nunca no porão de carga',
            ],
            items_en: [
                'Medication for chronic conditions (blood pressure, diabetes and the like)',
                'Count the days of the trip and add a 3 to 5 day margin',
                'Keep it in the original packaging, with the leaflet',
                'Carry it in your hand luggage — never in the hold',
            ],
            items_es: [
                'Medicación de condiciones crónicas (presión, diabetes y similares)',
                'Calcule los días del viaje y añada un margen de 3 a 5 días',
                'Consérvela en el envase original, con el prospecto',
                'Llévela en el equipaje de mano, nunca en la bodega',
            ],
        },
        {
            subtitle: 'Sintomáticos',
            subtitle_en: 'For symptoms',
            subtitle_es: 'Sintomáticos',
            items: [
                'Analgésico e antitérmico',
                'Anti-inflamatório',
                'Antialérgico',
                'Antigripal e descongestionante',
                'Antiácido e antidiarreico',
            ],
            items_en: [
                'Painkiller and fever reducer',
                'Anti-inflammatory',
                'Antihistamine',
                'Cold and decongestant medicine',
                'Antacid and anti-diarrhoeal',
            ],
            items_es: [
                'Analgésico y antitérmico',
                'Antiinflamatorio',
                'Antialérgico',
                'Antigripal y descongestionante',
                'Antiácido y antidiarreico',
            ],
        },
        {
            subtitle: 'Documentação do remédio',
            subtitle_en: 'Paperwork for the medication',
            subtitle_es: 'Documentación del medicamento',
            items: [
                'Receitas atualizadas e legíveis',
                'Laudo para medicamento controlado',
                'Viagem internacional: receita traduzida ou em inglês',
                'Lista de alergias e contatos médicos',
            ],
            items_en: [
                'Up-to-date, legible prescriptions',
                'A doctor’s report for controlled medication',
                'International trip: prescription translated or written in English',
                'A list of allergies and medical contacts',
            ],
            items_es: [
                'Recetas actualizadas y legibles',
                'Informe médico para medicación controlada',
                'Viaje internacional: receta traducida o en inglés',
                'Lista de alergias y contactos médicos',
            ],
        },
    ],
};

const PRIMEIROS_SOCORROS = {
    id: 'primeiros_socorros',
    icon: 'Health',
    color: Neo.colors.feedback.error,
    title: 'Primeiros Socorros',
    title_en: 'First Aid',
    title_es: 'Primeros Auxilios',
    intro: 'Vale ainda mais se a viagem tem criança ou atividade ao ar livre.',
    intro_en: 'Matters even more when children or outdoor activities are involved.',
    intro_es: 'Importa aún más si el viaje incluye niños o actividades al aire libre.',
    sections: [
        {
            subtitle: 'Curativos',
            subtitle_en: 'Dressings',
            subtitle_es: 'Vendajes',
            subtitle_ptpt: 'Pensos',
            items: [
                'Band-aid de vários tamanhos',
                'Compressas de gaze esterilizadas',
                'Esparadrapo ou micropore',
                'Atadura elástica',
            ],
            items_ptpt: [
                'Pensos rápidos de vários tamanhos',
                'Compressas de gaze esterilizadas',
                'Adesivo ou micropore',
                'Ligadura elástica',
            ],
            items_en: [
                'Adhesive bandages in several sizes',
                'Sterile gauze pads',
                'Medical tape',
                'Elastic bandage',
            ],
            items_es: [
                'Tiritas de varios tamaños',
                'Compresas de gasa estériles',
                'Esparadrapo o micropore',
                'Venda elástica',
            ],
        },
        {
            subtitle: 'Antissépticos e limpeza',
            subtitle_en: 'Antiseptics and cleaning',
            subtitle_es: 'Antisépticos y limpieza',
            items: [
                'Antisséptico (clorexidina ou iodopovidona)',
                'Álcool 70% em lenço ou spray',
                'Soro fisiológico para limpar ferimento',
            ],
            items_en: [
                'Antiseptic (chlorhexidine or povidone-iodine)',
                '70% alcohol wipes or spray',
                'Saline solution to clean wounds',
            ],
            items_es: [
                'Antiséptico (clorhexidina o povidona yodada)',
                'Alcohol 70% en toallitas o spray',
                'Suero fisiológico para limpiar heridas',
            ],
        },
        {
            subtitle: 'Instrumentos',
            subtitle_en: 'Instruments',
            subtitle_es: 'Instrumentos',
            items: [
                'Tesoura de pontas redondas',
                'Pinça para farpa e espinho',
                'Termômetro digital',
                'Luvas descartáveis',
            ],
            items_ptpt: [
                'Tesoura de pontas redondas',
                'Pinça para farpas e espinhos',
                'Termómetro digital',
                'Luvas descartáveis',
            ],
            items_en: [
                'Round-tipped scissors',
                'Tweezers for splinters and thorns',
                'Digital thermometer',
                'Disposable gloves',
            ],
            items_es: [
                'Tijeras de puntas redondeadas',
                'Pinzas para astillas y espinas',
                'Termómetro digital',
                'Guantes desechables',
            ],
        },
        {
            subtitle: 'Específicos',
            subtitle_en: 'Specific items',
            subtitle_es: 'Específicos',
            items: [
                'Pomada para queimadura leve',
                'Gel ou roll-on para picada de inseto',
                'Analgésico de uso tópico',
                'Colírio lubrificante',
            ],
            items_en: [
                'Ointment for minor burns',
                'Gel or roll-on for insect bites',
                'Topical pain relief',
                'Lubricating eye drops',
            ],
            items_es: [
                'Pomada para quemaduras leves',
                'Gel o roll-on para picaduras de insectos',
                'Analgésico de uso tópico',
                'Colirio lubricante',
            ],
        },
    ],
};

const HIGIENE = {
    id: 'higiene',
    icon: 'ShieldTick',
    color: Neo.colors.secondary[500],
    title: 'Higiene e Proteção',
    title_en: 'Hygiene and Protection',
    title_es: 'Higiene y Protección',
    intro: 'Higiene e proteção ambiental são prevenção — não são supérfluos de mala.',
    intro_en: 'Hygiene and protection from the elements are prevention, not packing extras.',
    intro_es: 'La higiene y la protección ambiental son prevención, no accesorios de maleta.',
    sections: [
        {
            subtitle: 'Higiene pessoal',
            subtitle_en: 'Personal hygiene',
            subtitle_es: 'Higiene personal',
            items: [
                'Escova, pasta e fio dental',
                'Sabonete e xampu em tamanho de viagem',
                'Desodorante e cuidados pessoais',
                'Absorventes ou itens de higiene íntima',
            ],
            items_en: [
                'Toothbrush, toothpaste and floss',
                'Travel-size soap and shampoo',
                'Deodorant and personal care items',
                'Sanitary pads or intimate hygiene items',
            ],
            items_es: [
                'Cepillo, pasta e hilo dental',
                'Jabón y champú de tamaño viaje',
                'Desodorante y cuidado personal',
                'Compresas o artículos de higiene íntima',
            ],
        },
        {
            subtitle: 'Sol e ambiente',
            subtitle_en: 'Sun and environment',
            subtitle_es: 'Sol y ambiente',
            items: [
                'Protetor solar FPS 30 ou maior. Tenha à mão também, creme para aliviar a dor e a inflamação da queimadura solar ou insolação',
                'Protetor labial com FPS',
                'Hidratante corporal — o ar do avião resseca',
                'Repelente, sobretudo em destino tropical',
            ],
            items_en: [
                'Sunscreen SPF 30 or higher. Also keep an after-sun cream on hand to ease the pain and inflammation of sunburn or heatstroke',
                'Lip balm with SPF',
                'Body moisturiser — cabin air is very drying',
                'Insect repellent, especially for tropical destinations',
            ],
            items_es: [
                'Protector solar FPS 30 o superior. Lleve también una crema para aliviar el dolor y la inflamación de la quemadura solar o insolación',
                'Protector labial con FPS',
                'Crema hidratante — el aire del avión reseca',
                'Repelente, sobre todo en destinos tropicales',
            ],
        },
        {
            subtitle: 'Sanitização',
            subtitle_en: 'Sanitising',
            subtitle_es: 'Desinfección',
            items: [
                'Álcool em gel de bolso',
                'Lenços umedecidos antissépticos',
                'Máscaras descartáveis para lugar cheio',
            ],
            items_en: [
                'Pocket hand sanitiser',
                'Antiseptic wet wipes',
                'Disposable masks for crowded places',
            ],
            items_es: [
                'Gel hidroalcohólico de bolsillo',
                'Toallitas antisépticas',
                'Mascarillas desechables para lugares concurridos',
            ],
        },
    ],
};

const DOCUMENTOS = {
    id: 'docs_ida',
    icon: 'DocumentText',
    color: Neo.colors.primary[500],
    title: 'Documentos Vitais',
    title_en: 'Essential Documents',
    title_es: 'Documentos Vitales',
    intro: 'Imprevisto acontece. Tenha cópia física e acesso offline.',
    intro_en: 'Things go wrong. Keep a paper copy and offline access.',
    intro_es: 'Los imprevistos ocurren. Tenga copia física y acceso sin conexión.',
    items: [
        'Passaporte e RG válidos e em bom estado',
        'Cartão de vacinas, físico e digital',
        'Certidão de nascimento, para menores de idade',
        'Cartão do plano de saúde e do SUS',
        'Cópias dos documentos, físicas e na nuvem',
        'Seguro viagem impresso ou acessível offline',
        'Cartão de emergência: tipo sanguíneo, alergias e contatos',
    ],
    items_ptpt: [
        'Passaporte e cartão de cidadão válidos e em bom estado',
        'Boletim de vacinas, em papel e digital',
        'Certidão de nascimento, para menores de idade',
        'Cartão de utente e do seguro de saúde',
        'Cópias dos documentos, em papel e na nuvem',
        'Seguro de viagem impresso ou acessível offline',
        'Cartão de emergência: grupo sanguíneo, alergias e contactos',
    ],
    items_en: [
        'Valid passport and ID in good condition',
        'Vaccination record, on paper and digital',
        'Birth certificate for children',
        'Health insurance and public health cards',
        'Copies of documents, on paper and in the cloud',
        'Travel insurance printed or available offline',
        'Emergency card: blood type, allergies and contacts',
    ],
    items_es: [
        'Pasaporte y documento de identidad válidos y en buen estado',
        'Cartilla de vacunación, física y digital',
        'Partida de nacimiento para menores de edad',
        'Tarjeta del seguro médico y sanidad pública',
        'Copias de los documentos, físicas y en la nube',
        'Seguro de viaje impreso o accesible sin conexión',
        'Tarjeta de emergencia: grupo sanguíneo, alergias y contactos',
    ],
};

const CONFORTO = {
    id: 'conforto_ida',
    icon: 'Coffee',
    color: Neo.colors.feedback.warning,
    title: 'Conforto e Hidratação',
    title_en: 'Comfort and Hydration',
    title_es: 'Confort e Hidratación',
    intro: 'Evita os pequenos estresses do trajeto — e a desidratação, que passa despercebida.',
    intro_en: 'Heads off the small stresses of the journey, and the dehydration nobody notices.',
    intro_es: 'Evita los pequeños estreses del trayecto y la deshidratación, que pasa desapercibida.',
    items: [
        'Garrafa reutilizável, vazia para encher depois do raio-x',
        'Sais de reidratação oral',
        'Pastilha ou purificador de água, em destino rural',
        'Lanche não perecível',
        'Muda de roupa leve na bagagem de mão, caso a despachada atrase',
        'Higiene básica: escova, pasta e frascos de até 100 ml',
    ],
    items_ptpt: [
        'Garrafa reutilizável, vazia para encher depois do raio-x',
        'Sais de reidratação oral',
        'Pastilha ou purificador de água, em destino rural',
        'Lanche não perecível',
        'Muda de roupa leve na bagagem de mão, caso a despachada atrase',
        'Higiene básica: escova, pasta e frascos até 100 ml',
    ],
    items_en: [
        'Reusable bottle, empty so you can fill it after security',
        'Oral rehydration salts',
        'Water purification tablets or filter for rural destinations',
        'Non-perishable snack',
        'A light change of clothes in your hand luggage, in case the checked bag is delayed',
        'Basic toiletries: brush, toothpaste and containers up to 100 ml',
    ],
    items_es: [
        'Botella reutilizable, vacía para llenarla tras el control',
        'Sales de rehidratación oral',
        'Pastillas o purificador de agua en destinos rurales',
        'Tentempié no perecedero',
        'Una muda ligera en el equipaje de mano, por si la facturada se retrasa',
        'Higiene básica: cepillo, pasta y envases de hasta 100 ml',
    ],
};

export const KITS_BASE = [MEDICAMENTOS, PRIMEIROS_SOCORROS, HIGIENE, DOCUMENTOS, CONFORTO];

// ═══════════════════════════════════════════════════════════════════════
// MÓDULOS — entram conforme o briefing da viagem
// ═══════════════════════════════════════════════════════════════════════

const MODULO_LAZER = {
    id: 'kit_lazer',
    icon: 'Sun1',
    color: Neo.colors.feedback.warning,
    title: 'Módulo de Lazer',
    title_en: 'Leisure Module',
    title_es: 'Módulo de Ocio',
    intro: 'Itens para diversão e atividade ao ar livre.',
    intro_en: 'Items for fun and outdoor activities.',
    intro_es: 'Artículos para diversión y actividades al aire libre.',
    items: ['Protetor solar e pós-sol', 'Óculos de sol e chapéu', 'Roupas de banho', 'Brinquedos ou livros'],
    items_en: ['Sunscreen and after-sun', 'Sunglasses and a hat', 'Swimwear', 'Toys or books'],
    items_es: ['Protector solar y after-sun', 'Gafas de sol y sombrero', 'Bañadores', 'Juguetes o libros'],
};

const MODULO_TRABALHO = {
    id: 'kit_trabalho',
    icon: 'Briefcase',
    color: Neo.colors.primary[500],
    title: 'Módulo de Trabalho',
    title_en: 'Work Module',
    title_es: 'Módulo de Trabajo',
    intro: 'Segurança para equipamento e produtividade.',
    intro_en: 'Keeping your equipment safe and you productive.',
    intro_es: 'Seguridad para el equipo y productividad.',
    items: ['Notebook, tablet e carregadores', 'Powerbank e adaptador universal', 'Fones com cancelamento de ruído', 'Cadeado de cabo para o notebook'],
    items_ptpt: ['Portátil, tablet e carregadores', 'Powerbank e adaptador universal', 'Auscultadores com cancelamento de ruído', 'Cadeado de cabo para o portátil'],
    items_en: ['Laptop, tablet and chargers', 'Power bank and universal adapter', 'Noise-cancelling headphones', 'Cable lock for the laptop'],
    items_es: ['Portátil, tablet y cargadores', 'Batería externa y adaptador universal', 'Auriculares con cancelación de ruido', 'Candado de cable para el portátil'],
};

const MODULO_PETS = {
    id: 'kit_pets',
    icon: 'Pet',
    color: Neo.colors.feedback.error,
    title: 'Módulo Pet',
    title_en: 'Pet Module',
    title_es: 'Módulo Mascota',
    intro: 'Segurança e bem-estar do animal.',
    intro_en: 'Your animal’s safety and wellbeing.',
    intro_es: 'Seguridad y bienestar del animal.',
    items: [
        'Carteira de vacinação do pet atualizada',
        'Caixa de transporte adequada ao meio de transporte',
        'Coleira extra com plaquinha de identificação e microchip',
        'Medicamentos específicos do animal',
        'Comedouro e bebedouro portáteis',
        'Alimento e água para o trajeto',
        'Saquinhos coletores',
    ],
    items_en: [
        'Up-to-date pet vaccination record',
        'Carrier suited to the mode of transport',
        'Spare collar with ID tag, plus microchip',
        'The animal’s specific medication',
        'Portable food and water bowls',
        'Food and water for the journey',
        'Waste bags',
    ],
    items_es: [
        'Cartilla de vacunación de la mascota al día',
        'Transportín adecuado al medio de transporte',
        'Collar extra con placa de identificación y microchip',
        'Medicación específica del animal',
        'Comedero y bebedero portátiles',
        'Comida y agua para el trayecto',
        'Bolsas para recoger',
    ],
};

const MODULO_CRIANCAS = {
    id: 'kit_criancas',
    icon: 'Baby',
    color: Neo.colors.secondary[500],
    title: 'Módulo Infantil',
    title_en: 'Children Module',
    title_es: 'Módulo Infantil',
    intro: 'Cuidado e distração para os pequenos.',
    intro_en: 'Care and distraction for little ones.',
    intro_es: 'Cuidado y distracción para los pequeños.',
    items: [
        'Medicamentos pediátricos específicos (enjoo, febre)',
        'Pulseira de identificação com nome e telefone',
        'Lanches fáceis e sem farelo',
        'Brinquedo de apego e itens de distração',
    ],
    items_ptpt: [
        'Medicamentos pediátricos específicos (enjoo, febre)',
        'Pulseira de identificação com nome e telemóvel',
        'Lanches fáceis e sem migalhas',
        'Brinquedo de apego e itens de distração',
    ],
    items_en: [
        'Specific children’s medication (motion sickness, fever)',
        'ID wristband with name and phone number',
        'Easy, crumb-free snacks',
        'A comfort toy and things to keep them busy',
    ],
    items_es: [
        'Medicación pediátrica específica (mareo, fiebre)',
        'Pulsera de identificación con nombre y teléfono',
        'Tentempiés fáciles y sin migas',
        'Juguete de apego y objetos de distracción',
    ],
};

const MODULO_IDOSO_PCD = {
    id: 'kit_idoso_pcd',
    icon: 'Elderly',
    color: Neo.colors.primary[300],
    title: 'Módulo Acessibilidade e Apoio',
    title_en: 'Accessibility and Support Module',
    title_es: 'Módulo de Accesibilidad y Apoyo',
    intro: 'Facilitadores de locomoção e conforto.',
    intro_en: 'Aids for getting about, and for comfort.',
    intro_es: 'Facilitadores de movilidad y confort.',
    items: [
        'Bengala, andador ou cadeira de rodas revisados',
        'Laudos médicos, sobretudo para voo e cruzeiro',
        'Calçado muito confortável e antiderrapante',
        'Travesseiro de pescoço ergonômico',
    ],
    items_ptpt: [
        'Bengala, andarilho ou cadeira de rodas revistos',
        'Relatórios médicos, sobretudo para voo e cruzeiro',
        'Calçado muito confortável e antiderrapante',
        'Almofada de pescoço ergonómica',
    ],
    items_en: [
        'Cane, walker or wheelchair, serviced beforehand',
        'Medical reports, especially for flights and cruises',
        'Very comfortable, non-slip footwear',
        'Ergonomic neck pillow',
    ],
    items_es: [
        'Bastón, andador o silla de ruedas revisados',
        'Informes médicos, sobre todo para vuelos y cruceros',
        'Calzado muy cómodo y antideslizante',
        'Almohada cervical ergonómica',
    ],
};

const MODULO_PRAIA = {
    id: 'kit_praia',
    icon: 'SwimmingPool',
    color: Neo.colors.feedback.success,
    title: 'Módulo Praia e Resort',
    title_en: 'Beach and Resort Module',
    title_es: 'Módulo Playa y Resort',
    intro: 'Cuidados essenciais sob o sol.',
    intro_en: 'The essentials for time in the sun.',
    intro_es: 'Cuidados esenciales bajo el sol.',
    items: [
        'Repelente resistente à água',
        'Boia de corpo ou colete salva-vidas infantil',
        'Saco estanque para proteger o celular da areia e da água',
    ],
    items_ptpt: [
        'Repelente resistente à água',
        'Boia ou colete salva-vidas infantil',
        'Saco estanque para proteger o telemóvel da areia e da água',
    ],
    items_en: [
        'Water-resistant insect repellent',
        'Flotation aid or child life jacket',
        'Dry bag to keep the phone safe from sand and water',
    ],
    items_es: [
        'Repelente resistente al agua',
        'Flotador o chaleco salvavidas infantil',
        'Bolsa estanca para proteger el móvil de la arena y el agua',
    ],
};

const MODULO_RURAL = {
    id: 'kit_rural',
    icon: 'Plant',
    color: Neo.colors.feedback.success,
    title: 'Módulo Campo e Natureza',
    title_en: 'Countryside and Nature Module',
    title_es: 'Módulo Campo y Naturaleza',
    intro: 'Prevenção contra insetos e imprevistos climáticos.',
    intro_en: 'Guarding against insects and unpredictable weather.',
    intro_es: 'Prevención frente a insectos y clima imprevisible.',
    items: [
        'Repelente forte (icaridina) para carrapato e mosquito',
        'Bota ou calçado fechado, contra animais peçonhentos',
        'Capa de chuva leve',
        'Lanterna de cabeça com pilhas extras',
    ],
    items_ptpt: [
        'Repelente forte (icaridina) para carraça e mosquito',
        'Bota ou calçado fechado, contra animais peçonhentos',
        'Capa de chuva leve',
        'Lanterna de cabeça com pilhas extra',
    ],
    items_en: [
        'Strong repellent (icaridin) for ticks and mosquitoes',
        'Boots or closed shoes, against venomous animals',
        'Lightweight rain jacket',
        'Head torch with spare batteries',
    ],
    items_es: [
        'Repelente fuerte (icaridina) para garrapatas y mosquitos',
        'Botas o calzado cerrado, frente a animales venenosos',
        'Chubasquero ligero',
        'Linterna frontal con pilas de repuesto',
    ],
};

const MODULO_INTERNACIONAL = {
    id: 'kit_internacional',
    icon: 'Global',
    color: Neo.colors.secondary[600] || Neo.colors.secondary[500],
    title: 'Módulo Internacional',
    title_en: 'International Module',
    title_es: 'Módulo Internacional',
    intro: 'Documentação e energia para outro país.',
    intro_en: 'Paperwork and power for another country.',
    intro_es: 'Documentación y energía para otro país.',
    items: [
        'Adaptador universal de tomadas',
        'Cópias do passaporte, física e na nuvem',
        'Apólice do seguro-viagem acessível offline',
        'Contato do consulado brasileiro no destino',
    ],
    items_ptpt: [
        'Adaptador universal de tomadas',
        'Cópias do passaporte, em papel e na nuvem',
        'Apólice do seguro de viagem acessível offline',
        'Contacto do consulado português no destino',
    ],
    items_en: [
        'Universal plug adapter',
        'Copies of the passport, on paper and in the cloud',
        'Travel insurance policy available offline',
        'Contact details for your consulate at the destination',
    ],
    items_es: [
        'Adaptador universal de enchufes',
        'Copias del pasaporte, física y en la nube',
        'Póliza del seguro de viaje accesible sin conexión',
        'Contacto del consulado en el destino',
    ],
};

/**
 * Cruza o briefing da viagem e devolve os kits que se aplicam.
 * FONTE ÚNICA: usada pela tela Fazendo as Malas e pelo TravelReportService.
 */
export function buildDynamicKits(activeTrip) {
    const kits = [...KITS_BASE];
    if (!activeTrip) return kits;

    kits.push(activeTrip.purpose === 'trabalho' ? MODULO_TRABALHO : MODULO_LAZER);

    if (activeTrip.config?.hasKids) kits.push(MODULO_CRIANCAS);
    if (activeTrip.config?.hasPets) kits.push(MODULO_PETS);
    if (activeTrip.config?.hasElderly || activeTrip.config?.hasPcd) kits.push(MODULO_IDOSO_PCD);

    if (activeTrip.type === 'praia' || activeTrip.type === 'resort') kits.push(MODULO_PRAIA);
    if (activeTrip.type === 'rural') kits.push(MODULO_RURAL);
    if (activeTrip.config?.isInternational) kits.push(MODULO_INTERNACIONAL);

    return kits;
}

/** Conta os itens de um kit, com ou sem subseções. */
export const contarItens = (kit) =>
    kit.sections
        ? kit.sections.reduce((n, s) => n + (s.items?.length || 0), 0)
        : (kit.items?.length || 0);
