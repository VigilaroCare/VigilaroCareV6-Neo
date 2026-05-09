/**
 * intro_safety.js
 * Módulo de Introdução e Conceitos Fundamentais
 * Baseado no Método Prevenção 3D de Agnaldo Fontinele
 */

export const INTRO_CONCEPTS = [
    {
        id: 'intro_01',
        titulo: 'Introdução à Segurança',
        titulo_en: 'Introduction to Safety',
        titulo_es: 'Introducción a la Seguridad',
        emoji: '🛡️',
        definicao: 'Segurança doméstica não é acidente, é planejamento. É o conjunto de medidas adotadas para minimizar riscos e garantir a integridade física de toda a família.',
        definicao_en: 'Home safety is not an accident, it is planning. It is the set of measures adopted to minimize risks and ensure the physical integrity of the entire family.',
        definicao_es: 'La seguridad doméstica no es un accidente, es planificación. Es el conjunto de medidas adoptadas para minimizar riesgos y garantizar la integridad física de toda la familia.',
        importancia: 'A maioria dos os acidentes acontecem onde deveríamos estar mais seguros: em casa. Entender os fundamentos previne tragédias antes que aconteçam.',
        importancia_en: 'Most accidents happen where we should be safest: at home. Understanding the fundamentals prevents tragedies before they happen.',
        importancia_es: 'La mayoría de los accidentes ocurren donde deberíamos estar más seguros: en casa. Comprender los fundamentos previene tragedias antes de que sucedan.',
        curiosidades: [
            'As quedas são a principal causa de acidentes domésticos no Brasil.',
            'Crianças e idosos são os grupos mais vulneráveis.'
        ],
        curiosidades_en: [
            'Falls are the leading cause of domestic accidents in Brazil.',
            'Children and the elderly are the most vulnerable groups.'
        ],
        curiosidades_es: [
            'Las caídas son la principal causa de accidentes domésticos en Brasil.',
            'Los niños y los ancianos son los grupos más vulnerables.'
        ]
    },
    {
        id: 'prevencao_3d',
        titulo: 'Metodologia 3D',
        titulo_en: '3D Methodology',
        titulo_es: 'Metodología 3D',
        emoji: '💎',
        definicao: 'Para eliminarmos os perigos do lar, a prevenção e a conscientização são as únicas chaves. A Metodologia 3D define ações para uma prevenção Diária, Dinâmica e Duradoura, transformando a casa em um refúgio seguro.',
        definicao_en: 'To eliminate home hazards, prevention and awareness are the only keys. The 3D Methodology defines actions for Daily, Dynamic, and Durable prevention, transforming the home into a safe refuge.',
        definicao_es: 'Para eliminar los peligros del hogar, la prevención y la concientización son las únicas claves. La Metodología 3D define acciones para una prevención Diaria, Dinámica y Duradera, transformando la casa en un refugio seguro.',
        importancia: 'A grande maioria dos acidentes não acontece por acaso, mas por descaso. Praticar a segurança de forma constante é sempre mais vantajoso do que remediar uma emergência que poderia ter sido evitada.',
        importancia_en: 'The vast majority of accidents do not happen by chance, but by neglect. Practicing safety consistently is always more advantageous than dealing with an emergency that could have been avoided.',
        importancia_es: 'La gran mayoría de los accidentes no ocurren por casualidad, sino por descuido. Practicar la seguridad de forma constante siempre es más ventajoso que remediar una emergencia que podría haberse evitado.',
        comoIdentificar: [
            '🗓️ DIÁRIA: Devemos estar atentos ao nosso ambiente todos os dias. A prevenção jamais pode ser negligenciada pela pressa, distrações ou pelo costume de conviver com o risco.',
            '🔄 DINÂMICA: A prevenção deve acompanhar as mudanças da vida e da casa. Mantenha um olhar crítico e alerta para evitar que alterações no ambiente criem novas armadilhas.',
            '♾️ DURADOURA: Somente a constância garante a proteção real. A prevenção deve ser contínua para evitar que novos perigos ameacem a saúde e o bem-estar da família.'
        ],
        comoIdentificar_en: [
            '🗓️ DAILY: We must be attentive to our environment every day. Prevention should never be neglected due to haste, distractions, or the habit of living with risk.',
            '🔄 DYNAMIC: Prevention must keep up with changes in life and home. Maintain a critical and alert eye to prevent environmental changes from creating new traps.',
            '♾️ DURABLE: Only consistency guarantees real protection. Prevention must be continuous to prevent new dangers from threatening the family\'s health and well-being.'
        ],
        comoIdentificar_es: [
            '🗓️ DIARIA: Debemos estar atentos a nuestro entorno todos los días. La prevención nunca debe ser descuidada por la prisa, las distracciones o la costumbre de convivir con el riesgo.',
            '🔄 DINÁMICA: La prevención debe acompañar los cambios de la vida y del hogar. Mantenga una mirada crítica y alerta para evitar que los cambios en el ambiente creen nuevas trampas.',
            '♾️ DURADERA: Solo la constancia garantiza la protección real. La prevención debe ser continua para evitar que nuevos peligros amenacen la salud y el bienestar de la familia.'
        ],
        exemplos: [
            'Reflita: Seu lar é um refúgio ou uma armadilha?',
            'Atenção: A pressa é inimiga da prevenção diária.',
            'Lembre-se: Prevenir poupa a angústia da emergência.'
        ],
        exemplos_en: [
            'Reflect: Is your home a refuge or a trap?',
            'Attention: Haste is the enemy of daily prevention.',
            'Remember: Prevention saves the anguish of emergency.'
        ],
        exemplos_es: [
            'Reflexione: ¿Su hogar es un refugio o una trampa?',
            'Atención: La prisa es enemiga de la prevención diaria.',
            'Recuerde: Prevenir ahorra la angustia de la emergencia.'
        ],
        conteudo: `## Os Pilares do Vigilaro Care: Quem, Onde, O Quê e Como

A Metodologia de Prevenção 3D ganha vida através da lógica estrutural do aplicativo, dividida em quatro pilares fundamentais para garantir uma cobertura abrangente:

* **👤 Quem (Proteger)**: O foco na proteção de todos os membros da família, com atenção especial aos grupos mais vulneráveis (crianças e idosos), recebendo recomendações personalizadas para cada perfil.
* **📍 Onde (Ambientes)**: A segurança se estende a todos os locais frequentados (dentro de casa, quintal, lazer e viagens). A prevenção é sempre contextualizada para o ambiente em que você está.
* **⚠️ O Quê (Riscos)**: Auxiliamos na identificação e compreensão cirúrgica dos diversos tipos de riscos ocultos, desde quedas até intoxicações e acidentes elétricos.
* **🛠️ Como (Ações)**: O Vigilaro não apenas aponta os problemas, mas oferece o "Como" através de soluções práticas, checklists e recursos educativos que guiam a implementação rápida e eficaz.`,

        conteudo_en: `## Vigilaro Care Pillars: Who, Where, What and How

The 3D Prevention Methodology comes to life through the application's structural logic, divided into four fundamental pillars to ensure comprehensive coverage:

* **👤 Who (To Protect)**: Focus on protecting all family members, with special attention to vulnerable groups (children and the elderly), receiving personalized recommendations for each profile.
* **📍 Where (Environments)**: Safety extends to all frequented locations (indoors, outdoors, leisure, and travel). Prevention is always contextualized to the environment you are in.
* **⚠️ What (Risks)**: We help identify and surgically understand various hidden risks, from falls to poisoning and electrical accidents.
* **🛠️ How (Actions)**: Vigilaro doesn't just point out problems, it provides the "How" through practical solutions, checklists, and educational resources that guide quick and effective implementation.`,

        conteudo_es: `## Los Pilares de Vigilaro Care: Quién, Dónde, Qué y Cómo

La Metodología de Prevención 3D cobra vida a través de la lógica estructural de la aplicación, dividida en cuatro pilares fundamentales para garantizar una cobertura integral:

* **👤 Quién (Proteger)**: El enfoque en la protección de todos los miembros de la familia, con atención especial a los grupos vulnerables (niños y ancianos), recibiendo recomendaciones personalizadas para cada perfil.
* **📍 Dónde (Ambientes)**: La seguridad se extiende a todos los lugares frecuentados (dentro de casa, patio, ocio y viajes). La prevención siempre está contextualizada al entorno en el que te encuentras.
* **⚠️ Qué (Riesgos)**: Ayudamos a identificar y comprender quirúrgicamente varios riesgos ocultos, desde caídas hasta intoxicaciones y accidentes eléctricos.
* **🛠️ Cómo (Acciones)**: Vigilaro no solo señala los problemas, sino que ofrece el "Cómo" a través de soluciones prácticas, listas de verificación y recursos educativos que guían una implementación rápida y efectiva.`
    },
    {
        id: 'piramide_bird',
        titulo: 'Quase Acidentes',
        titulo_en: 'Near Misses',
        titulo_es: 'Casi Accidentes',
        emoji: '⚠️',
        definicao: 'Conceito da "Pirâmide de Bird": Para cada acidente grave, houveram centenas de "quase acidentes" ou comportamentos inseguros que foram ignorados.',
        definicao_en: '"Bird\'s Pyramid" concept: For every serious accident, there were hundreds of "near misses" or unsafe behaviors that were ignored.',
        definicao_es: 'Concepto de la "Pirámide de Bird": Por cada accidente grave, hubo cientos de "casi accidentes" o comportamientos inseguros que fueron ignorados.',
        importancia: 'Se você ignorar o "quase caiu" (tropeção no tapete), eventualmente a queda real vai acontecer. Tratar o quase acidente previne o acidente fatal.',
        importancia_en: 'If you ignore the "almost fell" (tripping on a rug), eventually the real fall will happen. Treating near misses prevents fatal accidents.',
        importancia_es: 'Si ignoras el "casi caí" (tropezón en la alfombra), eventualmente la caída real ocurrirá. Tratar el casi accidente previene el accidente fatal.',
        comoEvitar: [
            'Relate e corrija imediatamente qualquer "susto".',
            'Não diga "foi só um susto", diga "foi um aviso".',
            'Elimine a "condição insegura" (tapete solto) assim que detectada.'
        ],
        comoEvitar_en: [
            'Report and immediately correct any "scare".',
            'Don\'t say "it was just a scare", say "it was a warning".',
            'Eliminate the "unsafe condition" (loose rug) as soon as detected.'
        ],
        comoEvitar_es: [
            'Reporte y corrija inmediatamente cualquier "susto".',
            'No diga "fue solo un susto", diga "fue una advertencia".',
            'Elimine la "condición insegura" (alfombra suelta) tan pronto como se detecte.'
        ]
    }
];
