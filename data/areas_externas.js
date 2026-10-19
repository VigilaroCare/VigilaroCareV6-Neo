export const areasExternas = [
    {
        id: 'backyard',
        titulo: 'Quintal', titulo_ptpt: 'Quintal', titulo_es: 'Patio', titulo_en: 'Backyard',
        emoji: '🌳', icone: 'Tree',
        situacao: 'Área externa', situacao_ptpt: 'Zona exterior', situacao_es: 'Zona exterior', situacao_en: 'Outdoor area',
        oQueFazer: [
            'O local está limpo e sem entulhos/mato alto (evita escorpiões/ratos)?',
            'O piso é plano e sem buracos (risco de queda)?',
            'Piso cerâmico/cimentado é antiderrapante?',
            'A iluminação é boa nas passagens (para segurança noturna)?',
            'Não há acesso fácil para a rua (portão trancado)?'
        ], oQueFazer_ptpt: [
            'O local está limpo e sem entulho ou mato alto (evita escorpiões e ratos)?',
            'O piso é plano e sem buracos (risco de queda)?',
            'O piso cerâmico ou de cimento é antiderrapante?',
            'A iluminação é boa nas passagens (segurança à noite)?',
            'Não há acesso fácil para a rua (portão trancado)?',
        ], oQueFazer_es: [
            '¿El lugar está limpio, sin escombros ni maleza alta (evita escorpiones y ratas)?',
            '¿El suelo es llano y sin agujeros (riesgo de caída)?',
            '¿El suelo cerámico o de cemento es antideslizante?',
            '¿La iluminación es buena en las zonas de paso (seguridad de noche)?',
            '¿No hay salida fácil a la calle (puerta cerrada con llave)?',
        ], oQueFazer_en: [
            'Is the area clean, with no rubble or tall weeds (keeps scorpions and rats away)?',
            'Is the ground level and free of holes (fall risk)?',
            'Is tiled or concrete flooring non-slip?',
            'Is the lighting good along walkways (for safety at night)?',
            'Is there no easy way out to the street (gate locked)?',
        ],
        oQueNaoFazer: [
            'Não acumule madeira ou telhas velhas (abrigo de aranha).',
            'Não deixe água parada (Dengue).'
        ], oQueNaoFazer_ptpt: [
            'Não acumule madeira ou telhas velhas (abrigo de aranhas).',
            'Não deixe água parada (mosquitos que transmitem a dengue).',
        ], oQueNaoFazer_es: [
            'No acumule maderas ni tejas viejas (refugio de arañas).',
            'No deje agua estancada (mosquitos que transmiten el dengue).',
        ], oQueNaoFazer_en: [
            'Do not pile up old wood or roof tiles (they shelter spiders).',
            'Do not leave standing water (mosquitoes that spread dengue).',
        ],
        quandoChamarAjuda: 'Picada de animal peçonhento: lave o local com água e sabão, mantenha a pessoa em repouso e vá ao hospital imediatamente. Não corte, não chupe e não faça torniquete.', quandoChamarAjuda_ptpt: 'Picada de animal venenoso: lave o local com água e sabão, mantenha a pessoa em repouso e vá ao hospital imediatamente. Não corte, não chupe e não faça garrote.', quandoChamarAjuda_es: 'Picadura o mordedura de animal venenoso: lave la zona con agua y jabón, mantenga a la persona en reposo y vaya al hospital de inmediato. No corte, no succione ni haga torniquete.', quandoChamarAjuda_en: 'Venomous bite or sting: wash the area with soap and water, keep the person at rest and go to hospital immediately. Do not cut, suck or apply a tourniquet.'
    },
    {
        id: 'garden_farming',
        titulo: 'Jardinagem e Hortas', titulo_ptpt: 'Jardinagem e Hortas', titulo_es: 'Jardinería y Huertos', titulo_en: 'Gardening and Vegetable Plots',
        emoji: '👩‍🌾', icone: 'Plant',
        situacao: 'Manutenção', situacao_ptpt: 'Manutenção', situacao_es: 'Mantenimiento', situacao_en: 'Maintenance',
        oQueFazer: [
            'Usa EPIs (luvas, calçado fechado, manga longa) ao jardinar?',
            'Fertilizantes e pesticidas estão trancados e longe de crianças/pets?',
            'Identificou e removeu plantas tóxicas (Comigo-ninguém-pode, Bico-de-papagaio)?',
            'Ferramentas (tesouras, pás) são guardadas logo após o uso?'
        ], oQueFazer_ptpt: [
            'Usa equipamento de proteção (luvas, calçado fechado, manga comprida) ao jardinar?',
            'Os adubos e pesticidas estão fechados à chave e longe de crianças e animais?',
            'Identificou e retirou plantas tóxicas (diefembáquia, estrela-de-natal)?',
            'As ferramentas (tesouras, pás) são guardadas logo após o uso?',
        ], oQueFazer_es: [
            '¿Usa protección (guantes, calzado cerrado, manga larga) al trabajar en el jardín?',
            '¿Los abonos y pesticidas están bajo llave y lejos de niños y mascotas?',
            '¿Ha identificado y retirado plantas tóxicas (difenbaquia, flor de Pascua)?',
            '¿Las herramientas (tijeras, palas) se guardan nada más usarlas?',
        ], oQueFazer_en: [
            'Do you wear protective gear (gloves, closed shoes, long sleeves) when gardening?',
            'Are fertilisers and pesticides locked away from children and pets?',
            'Have you identified and removed toxic plants (dumb cane/Dieffenbachia, poinsettia)?',
            'Are tools (shears, spades) put away right after use?',
        ],
        oQueNaoFazer: [
            'Não toque em plantas desconhecidas.',
            'Não deixe crianças brincarem com terra adubada/química.'
        ], oQueNaoFazer_ptpt: [
            'Não toque em plantas desconhecidas.',
            'Não deixe as crianças brincar com terra adubada ou tratada com químicos.',
        ], oQueNaoFazer_es: [
            'No toque plantas desconocidas.',
            'No deje que los niños jueguen con tierra abonada o tratada con químicos.',
        ], oQueNaoFazer_en: [
            'Do not touch plants you do not know.',
            'Do not let children play with fertilised or chemically treated soil.',
        ],
        quandoChamarAjuda: 'Ingestão de planta: Foto da planta + {{POISON_CONTROL}}.', quandoChamarAjuda_ptpt: 'Ingestão de uma planta: fotografe a planta e ligue para o {{POISON_CONTROL}}.', quandoChamarAjuda_es: 'Ingestión de una planta: foto de la planta y llame a {{POISON_CONTROL}}.', quandoChamarAjuda_en: 'Plant swallowed: take a photo of the plant and call {{POISON_CONTROL}}.'
    },
    {
        id: 'collective_areas',
        titulo: 'Áreas Coletivas (Playground)', titulo_ptpt: 'Zonas Comuns (Parque Infantil)', titulo_es: 'Zonas Comunes (Parque Infantil)', titulo_en: 'Shared Areas (Playground)',
        emoji: '🛝', icone: 'Confetti',
        situacao: 'Condomínio/Praça', situacao_ptpt: 'Condomínio/Praça', situacao_es: 'Comunidad/Plaza', situacao_en: 'Building/Park',
        oQueFazer: [
            'Brinquedos estão sem ferrugem, rebarbas ou partes soltas?',
            'O piso absorve impacto (areia/borracha)?',
            'Crianças usam brinquedos compatíveis com a idade?',
            'Há supervisão visual constante de um adulto?',
            'Piso de quadras/salões está em bom estado?'
        ], oQueFazer_ptpt: [
            'Os equipamentos estão sem ferrugem, rebarbas ou peças soltas?',
            'O piso amortece impactos (areia/borracha)?',
            'As crianças usam equipamentos adequados à idade?',
            'Há vigilância visual constante de um adulto?',
            'O piso de campos e salões está em bom estado?',
        ], oQueFazer_es: [
            '¿Los juegos están sin óxido, rebabas ni piezas sueltas?',
            '¿El suelo amortigua los impactos (arena/caucho)?',
            '¿Los niños usan juegos adecuados a su edad?',
            '¿Hay supervisión visual constante de un adulto?',
            '¿El suelo de pistas y salones está en buen estado?',
        ], oQueFazer_en: [
            'Is the play equipment free of rust, sharp edges or loose parts?',
            'Does the ground absorb impact (sand/rubber)?',
            'Do children use equipment suited to their age?',
            'Is there constant visual supervision by an adult?',
            'Are court and hall floors in good condition?',
        ],
        oQueNaoFazer: [
            'Não permita uso de brinquedos quebrados.',
            'Não deixe crianças pequenas sozinhas com crianças muito maiores (conflito/acidente).'
        ], oQueNaoFazer_ptpt: [
            'Não permita o uso de equipamentos partidos.',
            'Não deixe crianças pequenas sozinhas com crianças muito mais velhas (conflito/acidente).',
        ], oQueNaoFazer_es: [
            'No permita el uso de juegos rotos.',
            'No deje a niños pequeños solos con niños mucho mayores (conflictos/accidentes).',
        ], oQueNaoFazer_en: [
            'Do not allow broken equipment to be used.',
            'Do not leave young children alone with much older children (conflict/accidents).',
        ]
    },
    {
        id: 'pool_safe',
        titulo: 'Piscina', titulo_ptpt: 'Piscina', titulo_es: 'Piscina', titulo_en: 'Swimming Pool',
        emoji: '🏊', icone: 'SwimmingPool',
        situacao: 'Risco Máximo', situacao_ptpt: 'Risco Máximo', situacao_es: 'Riesgo Máximo', situacao_en: 'Maximum Risk',
        oQueFazer: [
            'Há supervisão visual CONSTANTE (adulto a um braço de distância)?',
            'Existe cerca de proteção física e portão com tranca automática?',
            'Há capas de proteção rígidas (suportam peso)?',
            'Alarmes de detecção na água estão ativos?',
            'Ralos são anti-aprisionamento?',
            'Piscinas plásticas são esvaziadas após o uso?'
        ], oQueFazer_ptpt: [
            'Há vigilância visual CONSTANTE (um adulto à distância de um braço)?',
            'Há vedação física e portão com trinco automático?',
            'Há coberturas rígidas de segurança (que suportam peso)?',
            'Os alarmes de deteção na água estão ativos?',
            'Os ralos são antiaprisionamento?',
            'As piscinas de plástico são esvaziadas após o uso?',
        ], oQueFazer_es: [
            '¿Hay supervisión visual CONSTANTE (un adulto al alcance de la mano)?',
            '¿Hay una valla física y una puerta con cierre automático?',
            '¿Hay cubiertas rígidas de seguridad (que soportan peso)?',
            '¿Las alarmas de detección en el agua están activas?',
            '¿Los desagües son antiatrapamiento?',
            '¿Las piscinas de plástico se vacían después de usarlas?',
        ], oQueFazer_en: [
            'Is there CONSTANT visual supervision (an adult within arm’s reach)?',
            'Is there a physical fence and a self-latching gate?',
            'Are there rigid safety covers (that hold weight)?',
            'Are in-water alarms switched on?',
            'Are the drains anti-entrapment?',
            'Are paddling pools emptied after use?',
        ],
        oQueNaoFazer: [
            'JAMAIS deixe crianças sozinhas, nem por um segundo.',
            'Não confie apenas em boias.',
            'Não deixe brinquedos na água (atração fatal).'
        ], oQueNaoFazer_ptpt: [
            'NUNCA deixe crianças sozinhas, nem por um segundo.',
            'Não confie apenas em boias.',
            'Não deixe brinquedos na água (atração fatal).',
        ], oQueNaoFazer_es: [
            'NUNCA deje a los niños solos, ni por un segundo.',
            'No confíe solo en los flotadores.',
            'No deje juguetes en el agua (atracción fatal).',
        ], oQueNaoFazer_en: [
            'NEVER leave children alone, not even for a second.',
            'Do not rely on armbands or floats alone.',
            'Do not leave toys in the water (a fatal attraction).',
        ],
        quandoChamarAjuda: 'Afogamento: retire da água e ligue para o {{EMERGENCY_MEDICAL}}. Se a vítima não respirar e você souber, inicie a RCP imediatamente.', quandoChamarAjuda_ptpt: 'Afogamento: retire a vítima da água e ligue para o {{EMERGENCY_MEDICAL}}. Se não respirar e souber, inicie o SBV de imediato.', quandoChamarAjuda_es: 'Ahogamiento: saque a la víctima del agua y llame a {{EMERGENCY_MEDICAL}}. Si no respira y usted sabe, inicie la RCP de inmediato.', quandoChamarAjuda_en: 'Drowning: get the person out of the water and call {{EMERGENCY_MEDICAL}}. If they are not breathing and you know how, start CPR straight away.'
    },
    {
        id: 'beach_rivers',
        titulo: 'Praia, Rios e Lagos', titulo_ptpt: 'Praias, Rios e Lagos', titulo_es: 'Playas, Ríos y Lagos', titulo_en: 'Beaches, Rivers and Lakes',
        emoji: '🏖️', icone: 'Umbrella',
        situacao: 'Natureza', situacao_ptpt: 'Natureza', situacao_es: 'Naturaleza', situacao_en: 'Nature',
        oQueFazer: [
            'A supervisão é rigorosa (adulto na água junto)?',
            'Avaliou correnteza e profundidade antes de entrar?',
            'Seguiu as orientações dos guarda-vidas (bandeiras)?',
            'Crianças usam colete salva-vidas adequado?'
        ], oQueFazer_ptpt: [
            'A vigilância é rigorosa (um adulto dentro de água com eles)?',
            'Avaliou as correntes e a profundidade antes de entrar?',
            'Seguiu as indicações dos nadadores-salvadores (bandeiras)?',
            'As crianças usam colete salva-vidas adequado?',
        ], oQueFazer_es: [
            '¿La supervisión es estricta (un adulto dentro del agua con ellos)?',
            '¿Evaluó las corrientes y la profundidad antes de entrar?',
            '¿Siguió las indicaciones de los socorristas (banderas)?',
            '¿Los niños llevan un chaleco salvavidas adecuado?',
        ], oQueFazer_en: [
            'Is supervision strict (an adult in the water with them)?',
            'Did you check currents and depth before going in?',
            'Did you follow the lifeguards’ instructions (flags)?',
            'Do children wear a suitable life jacket?',
        ],
        oQueNaoFazer: [
            'Não mergulhe em águas turvas ou desconhecidas (pedras/galhos).',
            'Não entre na água depois de beber álcool.'
        ], oQueNaoFazer_ptpt: [
            'Não mergulhe em águas turvas ou desconhecidas (pedras/ramos).',
            'Não entre na água depois de beber álcool.',
        ], oQueNaoFazer_es: [
            'No se tire de cabeza en aguas turbias o desconocidas (rocas/ramas).',
            'No se meta en el agua después de beber alcohol.',
        ], oQueNaoFazer_en: [
            'Do not dive into murky or unknown water (rocks/branches).',
            'Do not go into the water after drinking alcohol.',
        ]
    },
    {
        id: 'workshop_tool',
        titulo: 'Oficina Doméstica', titulo_ptpt: 'Oficina Doméstica', titulo_es: 'Taller Doméstico', titulo_en: 'Home Workshop',
        emoji: '🛠️', icone: 'Toolbox',
        situacao: 'Ferramentas', situacao_ptpt: 'Ferramentas', situacao_es: 'Herramientas', situacao_en: 'Tools',
        oQueFazer: [
            'Ferramentas estão organizadas em caixas/painéis (evita corte)?',
            'Ambiente é ventilado e iluminado?',
            'Produtos químicos (tinta, solvente) estão na embalagem original e rotulados?',
            'Usa EPIs (óculos, luvas) ao trabalhar?'
        ], oQueFazer_ptpt: [
            'As ferramentas estão organizadas em caixas ou painéis (evita cortes)?',
            'O local é ventilado e iluminado?',
            'Os produtos químicos (tinta, solvente) estão na embalagem original e rotulados?',
            'Usa equipamento de proteção (óculos, luvas) ao trabalhar?',
        ], oQueFazer_es: [
            '¿Las herramientas están ordenadas en cajas o paneles (evita cortes)?',
            '¿El lugar está ventilado e iluminado?',
            '¿Los productos químicos (pintura, disolvente) están en su envase original y etiquetados?',
            '¿Usa protección (gafas, guantes) al trabajar?',
        ], oQueFazer_en: [
            'Are tools organised in boxes or on pegboards (avoids cuts)?',
            'Is the space ventilated and well lit?',
            'Are chemicals (paint, solvent) in their original, labelled containers?',
            'Do you wear protective gear (goggles, gloves) when working?',
        ],
        oQueNaoFazer: [
            'Não deixe ferramentas ligadas na tomada.',
            'Não armazene produtos em garrafas de bebida.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe ferramentas ligadas à tomada.',
            'Não guarde produtos em garrafas de bebida.',
        ], oQueNaoFazer_es: [
            'No deje herramientas enchufadas.',
            'No guarde productos en botellas de bebida.',
        ], oQueNaoFazer_en: [
            'Do not leave power tools plugged in.',
            'Do not store products in drink bottles.',
        ],
        quandoChamarAjuda: 'Amputação/corte profundo: comprima o local com um pano limpo e ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_ptpt: 'Amputação/corte profundo: comprima o local com um pano limpo e ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_es: 'Amputación/corte profundo: comprima la herida con un paño limpio y llame a {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_en: 'Amputation/deep cut: press on the wound with a clean cloth and call {{EMERGENCY_MEDICAL}}.'
    },
    {
        id: 'storage_depot',
        titulo: 'Depósito "Guarda-Tudo"', titulo_ptpt: 'Arrecadação', titulo_es: 'Trastero', titulo_en: '"Catch-All" Storeroom',
        emoji: '📦', icone: 'Package',
        situacao: 'Armazenamento', situacao_ptpt: 'Armazenamento', situacao_es: 'Almacenamiento', situacao_en: 'Storage',
        oQueFazer: [
            'O local é limpo e ventilado (evita aranhas/mofo)?',
            'Objetos pesados estão no chão e perto da saída (evita lesão na coluna)?',
            'Há corredores livres para circulação?',
            'Caixas estão estáveis e não muito altas?'
        ], oQueFazer_ptpt: [
            'O local está limpo e ventilado (evita aranhas e bolor)?',
            'Os objetos pesados estão no chão e perto da saída (evita lesões na coluna)?',
            'Há corredores livres para circular?',
            'As caixas estão estáveis e não demasiado altas?',
        ], oQueFazer_es: [
            '¿El lugar está limpio y ventilado (evita arañas y moho)?',
            '¿Los objetos pesados están en el suelo y cerca de la salida (evita lesiones de espalda)?',
            '¿Hay pasillos libres para circular?',
            '¿Las cajas están estables y no demasiado altas?',
        ], oQueFazer_en: [
            'Is the space clean and ventilated (keeps spiders and mould away)?',
            'Are heavy items on the floor and near the exit (avoids back injury)?',
            'Are aisles clear to walk through?',
            'Are boxes stable and not stacked too high?',
        ],
        oQueNaoFazer: [
            'Não acumule lixo ou caixas vazias (ninhos de pragas).',
            'Não force a coluna ao mover peso sozinho.'
        ], oQueNaoFazer_ptpt: [
            'Não acumule lixo ou caixas vazias (ninhos de pragas).',
            'Não force a coluna ao mover peso sozinho.',
        ], oQueNaoFazer_es: [
            'No acumule basura ni cajas vacías (nidos de plagas).',
            'No fuerce la espalda moviendo peso usted solo.',
        ], oQueNaoFazer_en: [
            'Do not let rubbish or empty boxes pile up (pest nests).',
            'Do not strain your back moving heavy things on your own.',
        ]
    }
];

export const areasExternasData = areasExternas; // Compatibilidade com imports antigos
