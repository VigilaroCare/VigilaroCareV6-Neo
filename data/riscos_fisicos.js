export const riscosFisicos = [
    {
        id: 'rf_e1',
        nome: 'Benjamins e Tês (Sobrecarga)', nome_en: 'Power Strips (Overload)', nome_es: 'Regletas (Sobrecarga)',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🔌',
        imagemUrl: require('../assets/illustrations/pad/pessoas-lifestyle_convertkit-yrdsq-1gyre-unsplash_003.jpg'),
        risco: 'Superaquecimento e Incêndio', risco_en: 'Overheating and Fire', risco_es: 'Sobrecalentamiento e Incendio',
        descricao: 'Principal causa de incêndios elétricos no Brasil segundo a Abracopel. Plásticos derretem e propagam fogo rapidamente.', descricao_en: 'One of the leading causes of electrical fires — in Brazil, the leading one according to Abracopel. Plastics melt and spread fire quickly.', descricao_es: 'Una de las principales causas de incendios eléctricos — en Brasil, la principal según Abracopel. Los plásticos se derriten y propagan el fuego rápidamente.',
        prevencao: [
            'Nunca ligue aparelhos de micro-ondas, airfryer, secador, ferro elétrico em benjamins.',
            'Prefira filtros de linha com fusível embutido.',
            'Se a tomada ou o pino do aparelho estiverem quentes, desligue imediatamente.'
        ],
        prevencao_en: [
            'Never plug microwaves, air fryers, hair dryers or irons into multi-plug adapters.',
            'Prefer power strips with a built-in fuse.',
            'If the outlet or the appliance plug feels hot, unplug it immediately.',
        ],
        prevencao_es: [
            'Nunca conecte microondas, freidoras de aire, secadores de pelo ni planchas en ladrones o enchufes múltiples.',
            'Prefiera regletas con fusible incorporado.',
            'Si el enchufe o la clavija del aparato están calientes, desconéctelo de inmediato.',
        ],
        primeirosSocorros: 'Se houver princípio de incêndio, NUNCA jogue água. Desligue a chave geral e use extintor pó químico ou CO2.',
        primeirosSocorros_en: 'If a fire starts, NEVER throw water. Turn off the main switch and use a dry chemical or CO2 extinguisher.',
        primeirosSocorros_es: 'Si hay principio de incendio, NUNCA arroje agua. Apague el interruptor principal y use extintor de polvo o CO2.'
    },
    {
        id: 'rf_e2',
        nome: 'Celular no Banheiro/Molhado', nome_en: 'Phone in Bathroom/Wet', nome_es: 'Celular en Baño/Mojado',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '📱',
        imagemUrl: require('../assets/illustrations/pad/generated_rf_e2.png'),
        risco: 'Choque Fatal por Umidade', risco_en: 'Fatal Shock from Moisture', risco_es: 'Choque Fatal por Humedad',
        descricao: 'O corpo molhado reduz drasticamente a resistência da pele, tornando o choque de carregadores letal.', descricao_en: 'A wet body drastically reduces skin resistance, making charger shocks lethal.', descricao_es: 'El cuerpo mojado reduce drásticamente la resistencia de la piel, haciendo letal el choque.',
        prevencao: [
            'NUNCA use o celular conectado à tomada enquanto estiver no banho ou com o corpo úmido.',
            'Recarregue o celular fora de banheiros ou áreas de piscina.',
            'Evite cabos piratas ou falsificados, que não possuem isolamento seguro.'
        ],
        prevencao_en: [
            'NEVER use the phone plugged in while bathing or with a wet body.',
            'Charge the phone outside bathrooms or pool areas.',
            'Avoid counterfeit cables with poor insulation.'
        ],
        prevencao_es: [
            'NUNCA use el celular conectado mientras se baña o con el cuerpo húmedo.',
            'Cargue el celular fuera de baños o áreas de piscina.',
            'Evite cables falsificados sin aislamiento seguro.'
        ],
        primeirosSocorros: 'Desconecte o carregador da tomada usando um cabo de vassoura seco. Chame o {{EMERGENCY_MEDICAL}}',
        primeirosSocorros_en: 'Unplug the charger from the outlet using a dry wooden broom handle. Call {{EMERGENCY_MEDICAL}}',
        primeirosSocorros_es: 'Desconecte el cargador del enchufe usando un palo de escoba seco. Llame a {{EMERGENCY_MEDICAL}}'
    },
    {
        id: 'rf_e3',
        nome: 'Fios Desencapados (Pets e Bebês)', nome_en: 'Exposed Wires (Pets/Babies)', nome_es: 'Cables Pelados (Mascotas/Bebés)',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🐶',
        imagemUrl: require('../assets/illustrations/pad/fotos-stock-genericas_bebe-mordendo-fios-eletricos_020.jpg'),
        risco: 'Eletrocussão e Asfixia', risco_en: 'Electrocution and Asphyxiation', risco_es: 'Electrocución y Asfixia',
        descricao: 'Animais de estimação roem cabos baixos e bebês (fase oral) os levam à boca, aumentando o risco de choque elétrico.', descricao_en: 'Pets chew low-hanging cables and babies (in the oral phase) put them in their mouths, increasing the risk of electric shock.', descricao_es: 'Las mascotas muerden los cables bajos y los bebés (en la fase oral) se los llevan a la boca, lo que aumenta el riesgo de descarga eléctrica.',
        prevencao: [
            'Passe cabos por dentro de canaletas de PVC rígidas.',
            'Use organizadores de fios em formato de conduíte espiral rígido',
            'Retire extensões rasteiras, mantenha os cabos elétricos suspensos e fora do chão.'
        ],
        prevencao_en: [
            'Run cables through rigid PVC cable channels.',
            'Use rigid spiral-wrap cable organizers.',
            'Remove extension cords that run along the floor; keep electrical cables raised and off the floor.',
        ],
        prevencao_es: [
            'Pase los cables por canaletas rígidas de PVC.',
            'Use organizadores de cables tipo espiral rígida.',
            'Retire las extensiones que corren por el suelo; mantenga los cables eléctricos elevados y fuera del piso.',
        ],
        primeirosSocorros: 'Desligue a energia geral. Se for pet, afaste-o do fio com material plástico/madeira. Faça RCP se houver parada cardíaca.',
        primeirosSocorros_en: 'Turn off the main power. If it is a pet, move it away from the wire using plastic or wood. Perform CPR if there is cardiac arrest.',
        primeirosSocorros_es: 'Corte la electricidad general. Si es una mascota, apártela del cable con un objeto de plástico o madera. Haga RCP si hay paro cardíaco.'
    },
    {
        id: 'rf_e4',
        nome: 'Troca da Resistência do Chuveiro', nome_en: 'Shower Heater Replacement', nome_es: 'Cambio de Resistencia de Ducha',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🚿',
        imagemUrl: require('../assets/illustrations/pad/eletrico_chuveiro-eletrico_007.jpg'),
        risco: 'Choque Fibrilar no Banho', risco_en: 'Fibrillating Shock in Shower', risco_es: 'Choque Fibrilar en la Ducha',
        descricao: 'Acidente muito comum ao tentar consertar chuveiro com o box ainda molhado e apenas fechando a água.', descricao_en: 'A very common accident when trying to fix an electric shower with the stall still wet, having only shut off the water.', descricao_es: 'Accidente muy común al intentar reparar una ducha eléctrica con la mampara aún mojada, habiendo cerrado solo el agua.',
        prevencao: [
            'Sempre desligue o DISJUNTOR no quadro de força, não apenas a torneira.',
            'Use calçado de borracha (chinelo seco) durante a troca.',
            'Após a troca, deixe a água correr no Frio primeiro, para não queimar a nova resistência.'
        ],
        prevencao_en: [
            'Always turn off the BREAKER, not just the tap.',
            'Wear rubber footwear (dry slippers) during replacement.',
            'After replacement, let cold water run first to avoid burning the new element.'
        ],
        prevencao_es: [
            'Siempre apague el DISYUNTOR, no solo la llave de agua.',
            'Use calzado de goma (chanclas secas) durante el cambio.',
            'Después del cambio, deje correr agua Fría primero.'
        ],
        primeirosSocorros: 'Desligue a chave geral da casa. Arraste a vítima para fora do box seco e inicie ressuscitação se necessário.',
        primeirosSocorros_en: 'Turn off the home\'s main breaker. Pull the victim out of the shower to a dry area and start resuscitation if needed.',
        primeirosSocorros_es: 'Desconecte el interruptor general de la casa. Saque a la víctima de la ducha hacia un área seca e inicie la reanimación si es necesario.'
    },
    {
        id: 'rf_e5',
        nome: 'Tomadas Desprotegidas (Crianças)', nome_en: 'Unprotected Outlets (Children)', nome_es: 'Enchufes Desprotegidos (Niños)',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '👶',
        imagemUrl: require('../assets/illustrations/pad/outros_bebe-tomada-eletrica_028.jpg'),
        risco: 'Queimaduras Graves nas Mãos', risco_en: 'Severe Hand Burns', risco_es: 'Quemaduras Graves en Manos',
        descricao: 'Crianças de 1 a 5 anos frequentemente inserem clipes, grampos ou chaves nos buracos das tomadas baixas.', descricao_en: 'Toddlers often insert clips, hairpins, or keys into low outlets.', descricao_es: 'Niños pequeños a menudo insertan clips, horquillas o llaves en enchufes bajos.',
        prevencao: [
            'Coloque protetores de plástico em todas as tomadas não utilizadas.',
            'Bloqueie o acesso a tomadas com móveis pesados (sofás, estantes).',
            'Ensine as crianças sobre o risco do choque elétrico de forma lúdica.'
        ],
        prevencao_en: [
            'Fit plastic covers on every unused outlet.',
            'Block access to outlets with heavy furniture (sofas, bookcases).',
            'Teach children about the risk of electric shock in a playful way.',
        ],
        prevencao_es: [
            'Coloque protectores de plástico en todos los enchufes que no se usen.',
            'Bloquee el acceso a los enchufes con muebles pesados (sofás, estanterías).',
            'Enseñe a los niños sobre el riesgo de descarga eléctrica de forma lúdica.',
        ],
        primeirosSocorros: 'Não toque na criança se ela estiver grudada. Desligue a energia geral. Verifique batimentos e respiração.',
        primeirosSocorros_en: 'Do not touch the child if stuck. Turn off main power. Check pulse and breathing.',
        primeirosSocorros_es: 'No toque al niño si está pegado. Apague la energía general. Verifique pulso y respiración.'
    },
    {
        id: 'rf_e6',
        nome: 'Eletrodomésticos Perto de Pias/Piscinas', nome_en: 'Appliances near Sinks/Pools', nome_es: 'Electrodomésticos cerca de Fregaderos/Piscinas',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🔌',
        imagemUrl: require('../assets/illustrations/pad/generated_rf_e6.png'),
        risco: 'Choque por Queda na Água', risco_en: 'Shock from Falling in Water', risco_es: 'Choque por Caída en el Agua',
        descricao: 'Secadores na pia, equipamentos eletro-eletrônicos na borda da piscina causam acidentes com alta letalidade.', descricao_en: 'Hair dryers by the sink and electrical or electronic equipment at the edge of the pool cause accidents with high fatality rates.', descricao_es: 'Secadores junto al lavabo y equipos eléctricos o electrónicos al borde de la piscina causan accidentes de alta letalidad.',
        prevencao: [
            'Mantenha aparelhos elétricos a pelo menos 1 metro de pias, banheiras e piscinas.',
            'Instale tomadas com Dispositivo DR (Diferencial Residual) nestas áreas.',
            'Seque bem as mãos antes de tocar em qualquer eletrodoméstico.'
        ],
        prevencao_en: [
            'Keep appliances at least 3 feet from sinks, tubs, and pools.',
            'Install GFCI (Ground Fault Circuit Interrupter) outlets in these areas.',
            'Dry hands well before touching any appliance.'
        ],
        prevencao_es: [
            'Mantenga los aparatos al menos a 1 metro de lavabos, bañeras y piscinas.',
            'Instale enchufes con Dispositivo DR (Diferencial Residual).',
            'Séquese bien las manos antes de tocar cualquier electrodoméstico.'
        ],
        primeirosSocorros: 'NÃO tente tirar o aparelho da água! Vá até o quadro e desligue o disjuntor.',
        primeirosSocorros_en: 'DO NOT try to pull the appliance out of the water! Go to the panel and flip the breaker.',
        primeirosSocorros_es: '¡NO intente sacar el aparato del agua! Vaya al cuadro y baje el disyuntor.'
    },
    {
        id: 'rf_e7',
        nome: 'Pipas na Rede Elétrica', nome_en: 'Kites on Power Lines', nome_es: 'Cometas en la Red Eléctrica',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🪁',
        imagemUrl: require('../assets/illustrations/pad/generated_rf_e7.png'),
        risco: 'Arco Elétrico de Alta Tensão', risco_en: 'High Voltage Arc', risco_es: 'Arco de Alta Tensión',
        descricao: 'Acidente grave em ruas e condomínios. Linhas chilenas (de óxido de alumínio e pó de quartzo) ou úmidas conduzem a alta tensão diretamente para quem as usa.', descricao_en: 'A serious accident on streets and in residential complexes. Abrasive kite lines (coated with aluminum oxide and quartz powder) or wet lines conduct high voltage straight to whoever is holding them.', descricao_es: 'Accidente grave en calles y condominios. Los hilos abrasivos de cometa (recubiertos de óxido de aluminio y polvo de cuarzo) o los hilos mojados conducen la alta tensión directamente a quien los sostiene.',
        prevencao: [
            'Solte pipas apenas em parques abertos, longe de postes de rua.',
            'Jamais use linha com cerol, linha chilena ou fios metálicos.',
            'Se a pipa enroscar no fio, NÃO tente tirar com cabos de vassoura, canos ou pedras. Muito menos tente alcançar.'
        ],
        prevencao_en: [
            'Fly kites only in open parks, far from utility poles.',
            'Never use glass-coated or abrasive line, or metal wire.',
            'If the kite gets caught on a power line, DO NOT try to free it with broom handles, pipes or stones. And never try to reach it.',
        ],
        prevencao_es: [
            'Vuele cometas solo en parques abiertos, lejos de los postes de luz.',
            'Nunca use hilo con vidrio, hilo abrasivo ni alambre metálico.',
            'Si la cometa se enreda en el cable, NO intente soltarla con palos de escoba, tubos o piedras. Mucho menos intente alcanzarla.',
        ],
        primeirosSocorros: 'Afaste curiosos (risco de cabo partido no chão). Ligue imediatamente para {{EMERGENCY_MEDICAL}} e para a concessionária de energia.',
        primeirosSocorros_en: 'Keep onlookers away (risk of a downed live wire). Immediately call {{EMERGENCY_MEDICAL}} and the electric utility.',
        primeirosSocorros_es: 'Aleje a los curiosos (riesgo de cable caído en el suelo). Llame de inmediato a {{EMERGENCY_MEDICAL}} y a la compañía eléctrica.'
    },
    {
        id: 'rf_e8',
        nome: 'Instalações Antigas e Gambiarras', nome_en: 'Old Wiring and DIY Fixes', nome_es: 'Instalaciones Antiguas',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🏚️',
        imagemUrl: require('../assets/illustrations/pad/eletrico_photo-of-electrical-wirings-on-white-wal_018.jpg'),
        risco: 'Incêndio Noturno (Idosos)', risco_en: 'Nighttime Fire (Elderly)', risco_es: 'Incendio Nocturno (Ancianos)',
        descricao: 'Casas antigas normalmente não suportam as cargas atuais. Fios ressecam no forro, causando fogo.', descricao_en: 'Older homes usually cannot handle today\'s electrical loads. Wiring dries out in the ceiling space and starts fires.', descricao_es: 'Las casas antiguas normalmente no soportan las cargas eléctricas actuales. Los cables se resecan en el entretecho y provocan incendios.',
        prevencao: [
            'Realize uma revisão com eletricista qualificado a cada 10 anos.',
            'Substitua quadros de força de fusível antigo por disjuntores DIN e DR.',
            'Evite emendas malfeitas com fita isolante de baixa qualidade.'
        ],
        prevencao_en: [
            'Have a qualified electrician review wiring every 10 years.',
            'Replace old fuse boxes with modern breakers and GFCIs.',
            'Avoid poorly made splices with cheap electrical tape.'
        ],
        prevencao_es: [
            'Realice una revisión con un electricista calificado cada 10 años.',
            'Reemplace las cajas de fusibles antiguas por disyuntores modernos.',
            'Evite empalmes mal hechos con cinta aislante barata.'
        ],
        primeirosSocorros: 'Instale detectores de fumaça, especialmente onde moram idosos ou pessoas com mobilidade reduzida, que precisam de mais tempo para sair. Se alguém na casa for surdo, prefira modelos com alerta luminoso ou vibratório.',
        primeirosSocorros_en: 'Install smoke detectors, especially where older adults or people with reduced mobility live, as they need more time to get out. If anyone in the home is deaf, choose models with a flashing-light or vibrating alert.',
        primeirosSocorros_es: 'Instale detectores de humo, especialmente donde viven personas mayores o con movilidad reducida, que necesitan más tiempo para salir. Si alguien en casa es sordo, elija modelos con alerta luminosa o vibratoria.'
    },
    {
        id: 'rf_e9',
        nome: 'Extensões sob Tapetes e Portas', nome_en: 'Extension Cords under Rugs', nome_es: 'Extensiones bajo Alfombras',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🧶',
        imagemUrl: require('../assets/illustrations/pad/generated_rf_e9.png'),
        risco: 'Curto-circuito e Fogo em Tecido', risco_en: 'Short Circuit and Fabric Fire', risco_es: 'Cortocircuito y Fuego en Tela',
        descricao: 'O pisar constante ou esmagamento sob portas quebra os filamentos de cobre, gerando pontos de calor que podem provocar fogo ou expor o cobre e causar choques elétricos.', descricao_en: 'Constant stepping on cords or crushing them under doors breaks the copper strands, creating hot spots that can start a fire, or exposing the copper and causing electric shocks.', descricao_es: 'Pisar los cables constantemente o aplastarlos bajo las puertas rompe los filamentos de cobre y genera puntos de calor que pueden provocar fuego, o deja el cobre expuesto y causa descargas eléctricas.',
        prevencao: [
            'Nunca passe fios elétricos debaixo de tapetes, sofás ou colchões.',
            'Não passe extensões por frestas de portas que possam "prensar" e danificar o cabo.',
            'Se precisar cruzar um cômodo, use passadores de piso protetores de borracha.'
        ],
        prevencao_en: [
            'Never run electrical cords under rugs, sofas or mattresses.',
            'Do not run extension cords through door gaps where they can be "pinched" and damaged.',
            'If you need to cross a room, use protective rubber floor cord covers.',
        ],
        prevencao_es: [
            'Nunca pase cables eléctricos debajo de alfombras, sofás o colchones.',
            'No pase extensiones por las rendijas de las puertas, donde pueden quedar "prensadas" y dañarse.',
            'Si necesita cruzar una habitación, use pasacables de goma para el suelo.',
        ],
        primeirosSocorros: 'Ao sentir cheiro de queimado ou ver fumaça no tapete, desligue o aparelho e depois a chave geral.',
        primeirosSocorros_en: 'If you smell burning or see smoke on the rug, unplug the appliance then turn off main power.',
        primeirosSocorros_es: 'Si huele a quemado o ve humo en la alfombra, desconecte el aparato y luego la energía principal.'
    },
    {
        id: 'rf_e10',
        nome: 'O Choque do Resgatista', nome_en: 'The Rescuer\'s Shock', nome_es: 'El Choque del Rescatista',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🚫',
        imagemUrl: require('../assets/illustrations/pad/generated_rf_e10.png'),
        risco: 'Múltiplas Vítimas Fatais', risco_en: 'Multiple Fatalities', risco_es: 'Múltiples Víctimas Fatales',
        descricao: 'Muitas mortes ocorrem quando um familiar tenta puxar a pessoa que está tomando o choque e acaba eletrocutado junto.', descricao_en: 'Many deaths occur when a family member tries to pull the victim being shocked and gets electrocuted too.', descricao_es: 'Muchas muertes ocurren cuando un familiar intenta jalar a la víctima y también se electrocuta.',
        prevencao: [
            'A primeira regra é: o corpo humano conduz eletricidade. NÃO TOQUE NA VÍTIMA DIRETAMENTE.',
            'Mapeie e conheça onde fica o quadro de força (disjuntores) da casa.',
            'Tenha sempre lanternas caso o desligamento ocorra à noite.'
        ],
        prevencao_en: [
            'The first rule is: the human body conducts electricity. DO NOT TOUCH THE VICTIM DIRECTLY.',
            'Map and know where the breaker panel is located.',
            'Always have flashlights in case of nighttime power shutoff.'
        ],
        prevencao_es: [
            'La primera regla es: el cuerpo humano conduce electricidad. NO TOQUE A LA VÍCTIMA DIRECTAMENTE.',
            'Conozca dónde está el panel de disyuntores.',
            'Tenga linternas en caso de corte nocturno.'
        ],
        primeirosSocorros: 'Desligue a chave geral. Se impossível, afaste a vítima usando cabo de vassoura seco, tábua ou tapete de borracha grosso.',
        primeirosSocorros_en: 'Turn off main switch. If impossible, move victim using a dry broomstick, board, or thick rubber mat.',
        primeirosSocorros_es: 'Apague el interruptor general. Si es imposible, aleje a la víctima usando un palo de escoba seco, tabla o tapete de goma grueso.'
    },
    
    {
        id: 'rf_3',
        nome: 'Armas de Fogo', nome_en: 'Firearms', nome_es: 'Armas de Fuego',
        imagemUrl: require('../assets/illustrations/pad/arma-de-fogo-em-casa.jpg'),
        categoria: 'Armas', categoria_en: 'Weapons', categoria_es: 'Armas',
        emoji: '🔫',
        risco: 'Morte Acidental', risco_en: 'Accidental Death', risco_es: 'Muerte Accidental',
        descricao: 'O acesso indevido por crianças curiosas ou em momentos de raiva pode ser fatal.', descricao_en: 'Access by curious children, or in moments of anger, can be fatal.', descricao_es: 'El acceso por parte de niños curiosos, o en momentos de ira, puede ser fatal.',
        prevencao: [
            'Armazene a arma desmuniciada em cofre trancado.',
            'Guarde a munição em local separado e também trancado.',
            'A chave/segredo do cofre deve ser restrita aos donos.',
            'Eduque crianças: se virem uma arma, NÃO TOCAR, sair de perto e chamar um adulto.',
        ],
        prevencao_en: [
            'Store the unloaded gun in a locked safe.',
            'Store ammunition in a separate, locked location.',
            'The safe key/combination must be restricted to the owners.',
            'Educate children: if they see a gun, DO NOT TOUCH, walk away and call an adult.',
        ],
        prevencao_es: [
            'Guarde el arma descargada en una caja fuerte cerrada.',
            'Guarde la munición en un lugar separado y también cerrado.',
            'La llave/combinación de la caja fuerte debe estar restringida a los dueños.',
            'Eduque a los niños: si ven un arma, NO TOCAR, alejarse y llamar a un adulto.',
        ],
        primeirosSocorros: 'Ligue para o {{EMERGENCY_MEDICAL}} e para a polícia ({{POLICE_NUMBER}}). Estanque sangramentos com compressão forte.',
        primeirosSocorros_en: 'Call {{EMERGENCY_MEDICAL}} and the police ({{POLICE_NUMBER}}). Control bleeding with firm pressure.',
        primeirosSocorros_es: 'Llame a {{EMERGENCY_MEDICAL}} y a la policía ({{POLICE_NUMBER}}). Detenga las hemorragias con compresión firme.'
    },
    {
        id: 'rf_4',
        nome: 'Prevenção de Quedas', nome_en: 'Fall Prevention', nome_es: 'Prevención de Caídas',
        imagemUrl: require('../assets/illustrations/pad/Como-evitar-quedas-na-terceira-idade-1.jpg'),
        categoria: 'Quedas', categoria_en: 'Falls', categoria_es: 'Caídas',
        emoji: '🤕',
        risco: 'Fraturas e Traumas', risco_en: 'Fractures and Trauma', risco_es: 'Fracturas y Traumas',
        descricao: 'Principal causa de acidentes com idosos e crianças.', descricao_en: 'Main cause of accidents with elderly and children.', descricao_es: 'Principal causa de accidentes con ancianos y niños.',
        prevencao: [
            'Instale corrimão em ambos os lados de escadas.',
            'Iluminação adequada em corredores e banheiros (luz noturna).',
            'Remova tapetes soltos ou use antiderrapantes.',
            'Instale grades de proteção ou telas em janelas e sacadas.',
            'Instale barras de apoio na parede do chuveiro e ao lado do vaso sanitário.'
        ],
        prevencao_en: [
            'Install handrails on both sides of stairs.',
            'Adequate lighting in hallways and bathrooms (night light).',
            'Remove loose rugs or use non-slip backing.',
            'Install guards or safety netting on windows and balconies.',
            'Install grab bars on the shower wall and next to the toilet.',
        ],
        prevencao_es: [
            'Instale pasamanos a ambos lados de las escaleras.',
            'Iluminación adecuada en pasillos y baños (luz nocturna).',
            'Retire las alfombras sueltas o use antideslizantes.',
            'Instale rejas de protección o redes en ventanas y balcones.',
            'Instale barras de apoyo en la pared de la ducha y junto al inodoro.',
        ],
        primeirosSocorros: 'Não mova a vítima se houver suspeita de fratura na coluna/pescoço. Chame o {{EMERGENCY_MEDICAL}}.',
        primeirosSocorros_en: 'Do not move the victim if a spine or neck fracture is suspected. Call {{EMERGENCY_MEDICAL}}.',
        primeirosSocorros_es: 'No mueva a la víctima si hay sospecha de fractura de columna o cuello. Llame a {{EMERGENCY_MEDICAL}}.'
    },
    {
        id: 'rf_5',
        nome: 'Afogamento', nome_en: 'Drowning', nome_es: 'Ahogamiento',
        imagemUrl: require('../assets/illustrations/pad/Afogamento.webp'),
        categoria: 'Água', categoria_en: 'Water', categoria_es: 'Agua',
        emoji: '💧',
        risco: 'Morte por Asfixia', risco_en: 'Death by Asphyxiation', risco_es: 'Muerte por Asfixia',
        descricao: 'Pode acontecer com crianças pequenas em apenas 2,5 a 5 centímetros de água (baldes, banheiras) e de forma rápida e silenciosa.', descricao_en: 'It can happen to young children in just 1 to 2 inches (2.5 to 5 cm) of water (buckets, bathtubs) — quickly and silently.', descricao_es: 'Puede ocurrirles a niños pequeños en apenas 2,5 a 5 centímetros de agua (cubos, bañeras), de forma rápida y silenciosa.',
        prevencao: [
            'Nunca deixe crianças sozinhas no banho ou piscina.',
            'Esvazie baldes, bacias, tanques e máquinas de lavar após o uso.',
            'Mantenha a tampa do vaso sanitário travada.',
            'Cerque a piscina completamente.',
        ],
        prevencao_en: [
            'Never leave children alone in the bath or pool.',
            'Empty buckets, basins, laundry tubs and washing machines after use.',
            'Keep the toilet lid locked.',
            'Fence the pool completely.',
        ],
        prevencao_es: [
            'Nunca deje a los niños solos en el baño o la piscina.',
            'Vacíe cubos, palanganas, lavaderos y lavadoras después de usarlos.',
            'Mantenga la tapa del inodoro trabada.',
            'Cerque la piscina por completo.',
        ],
        primeirosSocorros: 'Retire da água. Se não respirar, inicie RCP imediatamente. Chame o {{EMERGENCY_MEDICAL}}',
        primeirosSocorros_en: 'Get them out of the water. If they are not breathing, start CPR immediately. Call {{EMERGENCY_MEDICAL}}',
        primeirosSocorros_es: 'Sáquelo del agua. Si no respira, inicie la RCP de inmediato. Llame a {{EMERGENCY_MEDICAL}}'
    },
    // NOVOS CARDS - RISCOS FÍSICOS (DOMÉSTICOS E LAZER)
    {
        id: 'rf_esmagamento',
        nome: 'Esmagamento por Tombamento', nome_en: 'Crushing by Tipping Furniture', nome_es: 'Aplastamiento por Vuelco',
        categoria: 'Traumatismos', categoria_en: 'Trauma', categoria_es: 'Traumatismos',
        emoji: '📺',
        imagemUrl: require('../assets/illustrations/pad/acidentes-estatisticas_acidentes-domesticos-no-brasil_002.jpg'),
        risco: 'Lesões Fatais', risco_en: 'Fatal Injuries', risco_es: 'Lesiones Fatales',
        descricao: 'O hábito infantil de escalar móveis pode fazer com que estantes altas e televisores tombem sobre as crianças. Além disso, portas sem travas antiesmagamento causam severas e irreversíveis lesões.', descricao_es: 'La costumbre infantil de trepar a los muebles puede hacer que estanterías altas y televisores se vuelquen sobre los niños. Además, las puertas sin protectores antiaplastamiento causan lesiones graves e irreversibles.', descricao_en: 'Children\'s habit of climbing furniture can make tall bookcases and TVs tip over onto them. Doors without anti-pinch guards also cause severe, irreversible injuries.',
        prevencao: [
            'Fixe estantes altas e cômodas na parede usando suportes ou cabos apropriados.',
            'Fixe televisores de tela plana na parede ou no rack.',
            'Use protetores salva-dedos (trava antiesmagamento) em todas as portas.',
            'Não coloque brinquedos no topo de móveis altos, evitando que a criança tente escalar.'
        ], prevencao_es: [
            'Fije las estanterías altas y cómodas a la pared con soportes o cables adecuados.',
            'Fije los televisores de pantalla plana a la pared o al mueble.',
            'Use protectores salvadedos (antiaplastamiento) en todas las puertas.',
            'No coloque juguetes encima de muebles altos, para que el niño no intente trepar.',
        ], prevencao_en: [
            'Anchor tall bookcases and dressers to the wall with proper brackets or straps.',
            'Mount flat-screen TVs on the wall or secure them to the stand.',
            'Use finger-pinch guards (anti-pinch devices) on every door.',
            'Do not put toys on top of tall furniture, so the child is not tempted to climb.',
        ],
        primeirosSocorros: 'Remova o peso imediatamente. Se a vítima estiver inconsciente ou se houver suspeita de fratura interna, não mova o pescoço e ligue para o {{EMERGENCY_MEDICAL}}.', primeirosSocorros_es: 'Retire el peso de inmediato. Si la víctima está inconsciente o hay sospecha de fractura interna, no le mueva el cuello y llame a {{EMERGENCY_MEDICAL}}.', primeirosSocorros_en: 'Remove the weight immediately. If the victim is unconscious or an internal fracture is suspected, do not move the neck and call {{EMERGENCY_MEDICAL}}.'
    },
    {
        id: 'rf_queimaduras_domesticas',
        nome: 'Queimaduras', nome_en: 'Burns', nome_es: 'Quemaduras',
        categoria: 'Fogo', categoria_en: 'Fire', categoria_es: 'Fuego',
        emoji: '🔥',
        imagemUrl: require('../assets/illustrations/pad/outros_bebe-alcancando-panela-fogao_009.jpg'),
        risco: 'Queimaduras Térmicas Graves', risco_en: 'Severe Thermal Burns', risco_es: 'Quemaduras Térmicas Graves',
        descricao: 'A cozinha é o ambiente mais crítico. Tombamento de líquidos ferventes (ao puxar toalhas) e cabos de panela para fora causam queimaduras irreparáveis.', descricao_es: 'La cocina es el ambiente más crítico. Los líquidos hirviendo que se vuelcan (al tirar de manteles) y los mangos de sartenes hacia afuera causan quemaduras irreparables.', descricao_en: 'The kitchen is the most critical room. Boiling liquids pulled over (by tugging on tablecloths) and pan handles sticking out cause irreparable burns.',
        prevencao: [
            'Vire os cabos das panelas para o centro do fogão.',
            'Use as bocas de trás do fogão sempre que possível.',
            'Não use toalhas de mesa longas se houver crianças que possam puxá-las. Pets eventualmente também podem causar este tipo de acidente.',
            'Atenção ao abrir a porta do forno ou retirar recipientes quentes (use cabos apropriados ou luvas térmicas) e ao usar panelas de pressão.'
        ], prevencao_es: [
            'Gire los mangos de las ollas hacia el centro de la cocina.',
            'Use los quemadores traseros siempre que sea posible.',
            'No use manteles largos si hay niños que puedan tirar de ellos. Las mascotas también pueden causar eventualmente este tipo de accidente.',
            'Atención al abrir la puerta del horno o retirar recipientes calientes (use asas adecuadas o guantes térmicos) y al usar ollas a presión.',
        ], prevencao_en: [
            'Turn pan handles toward the center of the stove.',
            'Use the back burners whenever possible.',
            'Do not use long tablecloths if there are children who could pull them. Pets can occasionally cause this kind of accident too.',
            'Take care when opening the oven door or taking out hot dishes (use proper handles or oven mitts) and when using pressure cookers.',
        ],
        primeirosSocorros: 'Resfrie o local com água corrente em temperatura ambiente por 10-15 minutos. NUNCA aplique gelo, pasta de dente ou manteiga. Procure o pronto-socorro.'
    },
    {
        id: 'rf_sufocacao',
        nome: 'Sufocação e Engasgo', nome_en: 'Choking and Suffocation', nome_es: 'Asfixia y Atragantamiento',
        categoria: 'Vias Aéreas', categoria_en: 'Airways', categoria_es: 'Vías Respiratorias',
        emoji: '👶',
        imagemUrl: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),
        risco: 'Morte por Asfixia', risco_en: 'Death by Asphyxiation', risco_es: 'Muerte por Asfixia',
        descricao: 'Primeira causa de morte acidental entre bebês de até um ano. Riscos incluem travesseiros e excesso de roupa de cama no berço, peças pequenas e alimentos granulados.', descricao_es: 'Una de las principales causas de muerte accidental en bebés menores de un año. Los riesgos incluyen almohadas y exceso de ropa de cama en la cuna, piezas pequeñas y alimentos pequeños y redondos.', descricao_en: 'A leading cause of accidental death in babies under one year old. Risks include pillows and excess bedding in the crib, small parts and small, round foods.',
        prevencao: [
            'Bebês devem dormir de barriga para cima, em berço vazio (sem protetores, ursos ou travesseiros).',
            'Corte alimentos redondos (uvas, tomate cereja) ao comprido antes de servir a crianças.',
            'Verifique a indicação de idade e {{CERT_SEAL}} nos brinquedos.',
            'Mantenha feijões crus, milho e moedas longe do alcance. Despensa assim como cozinha é local proibido para crianças.'
        ], prevencao_es: [
            'Los bebés deben dormir boca arriba, en una cuna vacía (sin protectores, peluches ni almohadas).',
            'Corte los alimentos redondos (uvas, tomates cherry) a lo largo antes de servirlos a los niños.',
            'Verifique la indicación de edad y el {{CERT_SEAL}} en los juguetes.',
            'Mantenga frijoles crudos, maíz y monedas fuera del alcance. La despensa, al igual que la cocina, es un lugar prohibido para los niños.',
        ], prevencao_en: [
            'Babies should sleep on their backs in an empty crib (no bumpers, stuffed animals or pillows).',
            'Cut round foods (grapes, cherry tomatoes) lengthwise before serving them to children.',
            'Check the age rating and the {{CERT_SEAL}} on toys.',
            'Keep dried beans, corn kernels and coins out of reach. The pantry, like the kitchen, is off-limits to children.',
        ],
        primeirosSocorros: 'Acima de 1 ano: alterne 5 pancadas entre as escápulas (use o “calcanhar” da mão) com 5 compressões abdominais (Heimlich). Bebê: alterne 5 pancadas nas costas com 5 compressões no peito (com a base da palma de uma das mãos), nunca Heimlich. Ligue para o {{EMERGENCY_MEDICAL}} se não desengasgar.', primeirosSocorros_es: 'Mayores de 1 año: alterne 5 golpes entre los omóplatos (con el talón de la mano) y 5 compresiones abdominales (Heimlich). Bebé: alterne 5 golpes en la espalda y 5 compresiones en el pecho (con el talón de una mano), nunca Heimlich. Llame a {{EMERGENCY_MEDICAL}} si no se desatraganta.', primeirosSocorros_en: 'Over 1 year: alternate 5 back blows between the shoulder blades (with the heel of the hand) and 5 abdominal thrusts (Heimlich). Baby: alternate 5 back blows and 5 chest thrusts (with the heel of one hand) — never Heimlich. Call {{EMERGENCY_MEDICAL}} if the airway does not clear.'
    },
    {
        id: 'rf_cortes',
        nome: 'Cortes Profundos', nome_en: 'Deep Cuts', nome_es: 'Cortes Profundos',
        categoria: 'Ferimentos', categoria_en: 'Injuries', categoria_es: 'Heridas',
        emoji: '🔪',
        imagemUrl: require('../assets/illustrations/pad/outros_conjunto-facas-cozinha_005.jpg'),
        risco: 'Hemorragia Severa', risco_en: 'Severe Hemorrhage', risco_es: 'Hemorragia Severa',
        descricao: 'Facas mal armazenadas e louças de banheiro (pias) usadas como apoio por idosos e pessoas com mobilidade reduzida, que quebram e geram lâminas mortais.',
        prevencao: [
            'Guarde facas e ferramentas cortantes em gavetas altas ou com trava.',
            'NUNCA se apoie na pia do banheiro ou suba no vaso sanitário (cerâmica). Instale barras de apoio de metal fixadas na alvenaria.',
            'Use luvas anticorte (EPI) ao manusear ferramentas pesadas.',
            'Coloque películas protetoras ou redes em portas de vidro. Isso evita cacos e estilhaços cortantes.'
        ], prevencao_es: [
            'Guarde cuchillos y herramientas cortantes en cajones altos o con traba.',
            'NUNCA se apoye en el lavabo ni se suba al inodoro (cerámica). Instale barras de apoyo metálicas fijadas a la mampostería.',
            'Use guantes anticorte (EPP) al manipular herramientas pesadas.',
            'Coloque láminas de seguridad o redes en las puertas de vidrio. Así se evitan fragmentos cortantes si el vidrio se rompe.',
        ], prevencao_en: [
            'Store knives and sharp tools in high or locked drawers.',
            'NEVER lean on the bathroom sink or stand on the toilet (ceramic). Install metal grab bars anchored into the masonry.',
            'Wear cut-resistant gloves (PPE) when handling heavy tools.',
            'Apply safety film or netting to glass doors. This prevents sharp shards if the glass shatters.',
        ],
        primeirosSocorros: 'Faça compressão direta no ferimento com um pano limpo para estancar o sangramento. Eleve o membro se possível. Vá ao hospital.'
    },
    {
        id: 'rf_ebikes',
        nome: 'E-bikes e Bicicletas', nome_en: 'E-bikes & Bicycles', nome_es: 'E-bikes y Bicicletas',
        categoria: 'Lazer e Esporte', categoria_en: 'Sports & Leisure', categoria_es: 'Deporte',
        emoji: '🚴',
        imagemUrl: require('../assets/illustrations/pad/pessoas-lifestyle_photo-of-family-having-fun-3820210_010.jpg'),
        risco: 'Trauma Craniano e Fraturas', risco_en: 'Head Trauma & Fractures', risco_es: 'Trauma Craneal',
        descricao: 'O aumento de veículos elétricos e em alta velocidade (32-60 km/h) transformou ciclovias em zonas de tensão, causando colisões e atropelamentos.',
        prevencao: [
            'O uso do capacete é INEGOCIÁVEL para todos os ocupantes, incluindo em patinetes.',
            'Respeite a velocidade da via e a desproporção de massa com os pedestres.',
            'Crianças em bikes comuns devem pedalar em locais seguros, longe do trânsito de carros.',
            'Sinalize suas ações e evite usar fones de ouvido no trânsito.'
        ],
        primeirosSocorros: 'Em caso de colisão, não mova a vítima (risco de lesão medular). Ligue para o {{EMERGENCY_MEDICAL}} e mantenha a pessoa calma até o resgate chegar.', primeirosSocorros_es: 'En caso de colisión, no mueva a la víctima (riesgo de lesión medular). Llame a {{EMERGENCY_MEDICAL}} y mantenga a la persona tranquila hasta que llegue el rescate.', primeirosSocorros_en: 'After a collision, do not move the victim (risk of spinal cord injury). Call {{EMERGENCY_MEDICAL}} and keep the person calm until help arrives.'
    },
    {
        id: 'rf_playgrounds',
        nome: 'Lesões em Parquinhos', nome_en: 'Playground Injuries', nome_es: 'Lesiones en Parques',
        categoria: 'Lazer e Esporte', categoria_en: 'Sports & Leisure', categoria_es: 'Deporte',
        emoji: '🛝',
        imagemUrl: require('../assets/illustrations/pad/criancas-bebes_playground-aventura_004.jpg'),
        risco: 'Cortes, Tétano e Fraturas', risco_en: 'Cuts, Tetanus and Fractures', risco_es: 'Cortes, Tétanos y Fracturas',
        descricao: 'Falta de manutenção gera ferrugem, pregos expostos e partes folgadas ou soltas. Brincar em áreas não compatíveis com a idade ou crianças com grande diferença de idade também causa choques violentos.', descricao_es: 'La falta de mantenimiento genera óxido, clavos expuestos y piezas flojas o sueltas. Jugar en áreas no adecuadas para la edad, o con niños de edades muy distintas, también provoca choques violentos.', descricao_en: 'Poor maintenance leads to rust, exposed nails and loose or detached parts. Playing in areas not suited to the child\'s age, or alongside much older children, also causes violent collisions.',
        prevencao: [
            'Faça uma vistoria visual rápida antes da criança brincar (Vistoria Dinâmica).',
            'Supervisione ativamente. Acidentes acontecem em frações de segundo.',
            'Certifique-se de que o piso do parquinho seja de borracha ou areia fofa, não superfícies ásperas.',
            'Evite roupas com cordões no parquinho para prevenir enforcamento.'
        ], prevencao_es: [
            'Haga una inspección visual rápida antes de que el niño juegue (inspección dinámica).',
            'Supervise activamente. Los accidentes ocurren en fracciones de segundo.',
            'Asegúrese de que el piso del parque infantil sea de goma o arena suelta, no superficies ásperas.',
            'Evite la ropa con cordones en el parque infantil para prevenir el ahorcamiento.',
        ], prevencao_en: [
            'Do a quick visual inspection before the child plays (a dynamic check).',
            'Supervise actively. Accidents happen in a split second.',
            'Make sure the playground surface is rubber or loose, soft sand — not hard, rough ground.',
            'Avoid clothing with drawstrings at the playground to prevent strangulation.',
        ],
        primeirosSocorros: 'Lave cortes com água e sabão. Se o metal estava enferrujado, verifique a vacina antitetânica. Imobilize fraturas e vá ao PS.'
    },
    {
        id: 'rf_eventos',
        nome: 'Queimaduras em Eventos', nome_en: 'Event Burns', nome_es: 'Quemaduras en Eventos',
        categoria: 'Lazer e Esporte', categoria_en: 'Sports & Leisure', categoria_es: 'Deporte',
        emoji: '🎆',
        imagemUrl: require('../assets/illustrations/pad/Churrasco.png'),
        risco: 'Explosões e Queimaduras Graves', risco_en: 'Explosions and Severe Burns', risco_es: 'Explosiones y Quemaduras Graves',
        descricao: 'Uso de álcool líquido em churrasqueiras e manuseio amador de fogos de artifício em festas representam os maiores picos de acidentes em determinadas épocas do ano.', descricao_es: 'El uso de alcohol líquido en parrillas y la manipulación aficionada de fuegos artificiales en fiestas representan los mayores picos de accidentes en ciertas épocas del año.', descricao_en: 'Using liquid alcohol on barbecues and amateur handling of fireworks at parties account for the biggest accident peaks at certain times of year.',
        prevencao: [
            'NUNCA use álcool líquido (seja de qual volume for) para acender o carvão. Use acendedores sólidos ou acendedores elétricos.',
            'Mantenha as crianças longe (pelo menos 2 metros) da churrasqueira. Qualquer distração pode permitir que tragédias aconteçam.',
            'Fogos de artifício só devem ser manuseados por profissionais com licença.',
            'Não acenda fogueiras próximo à rede elétrica ou vegetação seca.'
        ], prevencao_es: [
            'NUNCA use alcohol líquido (en ninguna cantidad) para encender el carbón. Use pastillas de encendido sólidas o encendedores eléctricos.',
            'Mantenga a los niños lejos de la parrilla (al menos 2 metros). Cualquier distracción puede provocar una tragedia.',
            'Los fuegos artificiales solo deben ser manipulados por profesionales con licencia.',
            'No encienda hogueras cerca de la red eléctrica ni de vegetación seca.',
        ], prevencao_en: [
            'NEVER use liquid alcohol, in any amount, to light charcoal. Use solid fire starters or electric starters.',
            'Keep children away from the grill (at least 2 meters / 6 feet). Any distraction can lead to tragedy.',
            'Fireworks should only be handled by licensed professionals.',
            'Do not light bonfires near power lines or dry vegetation.',
        ],
        primeirosSocorros: 'Apague as chamas (abafando). Resfrie com muita água corrente. Cubra com pano limpo úmido e corra para o hospital. Não estoure bolhas.'
    },

    {
        id: 'rf_clima',
        nome: 'Exposição ao Clima e Insolação', nome_en: 'Climate Exposure & Sunstroke', nome_es: 'Exposición al Clima e Insolación',
        categoria: 'Lazer e Esporte', categoria_en: 'Sports & Leisure', categoria_es: 'Deporte',
        emoji: '☀️',
        imagemUrl: require('../assets/illustrations/pad/ambientes-casa_forma-de-gota-de-gua-tempestade-previs-o_017.jpg'),
        risco: 'Desidratação e Mal-Estar Térmico', risco_en: 'Dehydration and Heat Stress', risco_es: 'Deshidratación y Estrés Térmico',
        descricao: 'Ficar exposto ao sol quente por longos períodos cuidando do jardim ou quintal é um risco silencioso que pode levar à desidratação severa e insolação.',
        prevencao: [
            'Priorize a jardinagem nas primeiras horas da manhã ou no fim da tarde.',
            'Use sempre chapéus de abas largas, óculos de sol e protetor solar.',
            'Mantenha uma garrafa de água por perto e faça pausas regulares à sombra.'
        ], prevencao_es: [
            'Priorice la jardinería a primera hora de la mañana o al final de la tarde.',
            'Use siempre sombrero de ala ancha, gafas de sol y protector solar.',
            'Mantenga una botella de agua cerca y haga pausas regulares a la sombra.',
        ], prevencao_en: [
            'Do your gardening early in the morning or late in the afternoon.',
            'Always wear a wide-brimmed hat, sunglasses and sunscreen.',
            'Keep a bottle of water nearby and take regular breaks in the shade.',
        ],
        primeirosSocorros: 'Se sofrer insolação, vá para um local fresco e arejado. Beba água aos poucos. Faça compressas frias na cabeça. Se houver tontura forte ou vômito, procure um médico.', primeirosSocorros_es: 'Si sufre una insolación, vaya a un lugar fresco y ventilado. Beba agua poco a poco. Aplique compresas frías en la cabeza. Si hay mareo intenso o vómitos, busque atención médica.', primeirosSocorros_en: 'If you have heatstroke, move to a cool, well-ventilated place. Sip water slowly. Apply cold compresses to the head. If there is severe dizziness or vomiting, seek medical care.'
    }
];