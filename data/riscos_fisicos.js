export const riscosFisicos = [
    {
        id: 'rf_e1',
        nome: 'Benjamins e Tês (Sobrecarga)', nome_en: 'Power Strips (Overload)', nome_es: 'Regletas (Sobrecarga)',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🔌',
        imagemUrl: 'https://images.pexels.com/photos/11837458/pexels-photo-11837458.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Superaquecimento e Incêndio', risco_en: 'Overheating and Fire', risco_es: 'Sobrecalentamiento e Incendio',
        descricao: 'Principal causa de incêndios elétricos no Brasil (Abracopel). Plásticos derretem e propagam fogo rapidamente.', descricao_en: 'Main cause of electrical fires. Plastics melt and spread fire quickly.', descricao_es: 'Principal causa de incendios eléctricos. Los plásticos se derriten y propagan el fuego.',
        prevencao: [
            'Nunca ligue aparelhos de resistência (micro-ondas, airfryer, secador) em benjamins.',
            'Prefira filtros de linha com fusível embutido.',
            'Se a tomada ou o pino do aparelho estiverem quentes, desligue imediatamente.'
        ],
        prevencao_en: [
            'Never plug heating appliances (microwave, airfryer, dryer) into power strips.',
            'Prefer surge protectors with built-in fuses.',
            'If the outlet or plug is hot, unplug immediately.'
        ],
        prevencao_es: [
            'Nunca enchufe aparatos de resistencia (microondas, airfryer, secador) en regletas.',
            'Prefiera regletas con fusible incorporado.',
            'Si el enchufe o la clavija están calientes, desconecte inmediatamente.'
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
        imagemUrl: 'https://images.pexels.com/photos/4004071/pexels-photo-4004071.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Choque Fatal por Umidade', risco_en: 'Fatal Shock from Moisture', risco_es: 'Choque Fatal por Humedad',
        descricao: 'O corpo molhado reduz drasticamente a resistência da pele, tornando o choque de carregadores letal.', descricao_en: 'A wet body drastically reduces skin resistance, making charger shocks lethal.', descricao_es: 'El cuerpo mojado reduce drásticamente la resistencia de la piel, haciendo letal el choque.',
        prevencao: [
            'NUNCA use o celular conectado à tomada enquanto estiver no banho ou com o corpo úmido.',
            'Carregue o celular fora de banheiros ou áreas de piscina.',
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
        primeirosSocorros: 'Desconecte o carregador da tomada usando um cabo de vassoura seco. Chame o SAMU (192).',
        primeirosSocorros_en: 'Unplug the charger using a dry broomstick. Call 911.',
        primeirosSocorros_es: 'Desconecte el cargador usando un palo de escoba seco. Llame al 911.'
    },
    {
        id: 'rf_e3',
        nome: 'Fios Desencapados (Pets e Bebês)', nome_en: 'Exposed Wires (Pets/Babies)', nome_es: 'Cables Pelados (Mascotas/Bebés)',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🐶',
        imagemUrl: 'https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Eletrocussão e Asfixia', risco_en: 'Electrocution and Asphyxiation', risco_es: 'Electrocución y Asfixia',
        descricao: 'Animais de estimação roem cabos baixos e bebês (fase oral) os levam à boca, fechando curto-circuito.', descricao_en: 'Pets chew low cables and babies put them in their mouths, causing short circuits.', descricao_es: 'Las mascotas muerden cables bajos y los bebés se los llevan a la boca, causando cortos.',
        prevencao: [
            'Passe cabos por dentro de canaletas de PVC rígidas.',
            'Use organizadores de fios em formato de conduíte espiral duro.',
            'Retire extensões rasteiras do chão, subindo a fiação.'
        ],
        prevencao_en: [
            'Run cables through rigid PVC conduits.',
            'Use hard spiral cable organizers.',
            'Remove trailing extension cords from the floor.'
        ],
        prevencao_es: [
            'Pase los cables por canaletas de PVC rígidas.',
            'Use organizadores de cables en espiral dura.',
            'Retire las extensiones del piso.'
        ],
        primeirosSocorros: 'Desligue a energia geral. Se for pet, afaste-o do fio com material plástico/madeira. Faça RCP se houver parada.',
        primeirosSocorros_en: 'Turn off power. Move pet/baby with plastic/wood. Perform CPR if stopped breathing.',
        primeirosSocorros_es: 'Apague la energía. Aleje a la mascota/bebé con plástico/madera. Haga RCP si no respira.'
    },
    {
        id: 'rf_e4',
        nome: 'Troca da Resistência do Chuveiro', nome_en: 'Shower Heater Replacement', nome_es: 'Cambio de Resistencia de Ducha',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🚿',
        imagemUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Choque Fibrilar no Banho', risco_en: 'Fibrillating Shock in Shower', risco_es: 'Choque Fibrilar en la Ducha',
        descricao: 'Acidente muito comum ao tentar consertar chuveiro com o box ainda molhado e apenas desligando a torneira.', descricao_en: 'Very common accident when fixing a shower with a wet floor without cutting power.', descricao_es: 'Accidente muy común al reparar una ducha con el piso mojado sin cortar la energía.',
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
        primeirosSocorros: 'Derrube a chave geral da casa. Arraste a vítima para fora do box seco e inicie ressuscitação se necessário.',
        primeirosSocorros_en: 'Turn off the main switch. Drag victim to a dry area and start CPR if needed.',
        primeirosSocorros_es: 'Apague el interruptor general. Arrastre a la víctima a un área seca y comience RCP si es necesario.'
    },
    {
        id: 'rf_e5',
        nome: 'Tomadas Desprotegidas (Crianças)', nome_en: 'Unprotected Outlets (Children)', nome_es: 'Enchufes Desprotegidos (Niños)',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '👶',
        imagemUrl: 'https://images.pexels.com/photos/3661267/pexels-photo-3661267.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Queimaduras Graves nas Mãos', risco_en: 'Severe Hand Burns', risco_es: 'Quemaduras Graves en Manos',
        descricao: 'Crianças de 1 a 5 anos frequentemente inserem clipes, grampos ou chaves nos buracos das tomadas baixas.', descricao_en: 'Toddlers often insert clips, hairpins, or keys into low outlets.', descricao_es: 'Niños pequeños a menudo insertan clips, horquillas o llaves en enchufes bajos.',
        prevencao: [
            'Coloque protetores de plástico em todas as tomadas não utilizadas.',
            'Bloqueie o acesso a tomadas com móveis pesados (sofás, estantes).',
            'Ensine as crianças sobre o risco do choque de forma lúdica.'
        ],
        prevencao_en: [
            'Put plastic protectors in all unused outlets.',
            'Block access to outlets with heavy furniture.',
            'Teach children about shock risks playfully.'
        ],
        prevencao_es: [
            'Coloque protectores de plástico en todos los enchufes no utilizados.',
            'Bloquee el acceso a los enchufes con muebles pesados.',
            'Enseñe a los niños sobre el riesgo de manera lúdica.'
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
        imagemUrl: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Choque por Queda na Água', risco_en: 'Shock from Falling in Water', risco_es: 'Choque por Caída en el Agua',
        descricao: 'Secadores na pia, rádios na borda da piscina ou liquidificadores molhados causam acidentes com alta letalidade.', descricao_en: 'Hairdryers near sinks, radios by pools cause highly lethal accidents.', descricao_es: 'Secadores en el lavabo, radios en piscinas causan accidentes muy letales.',
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
        imagemUrl: 'https://images.pexels.com/photos/1359325/pexels-photo-1359325.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Arco Elétrico de Alta Tensão', risco_en: 'High Voltage Arc', risco_es: 'Arco de Alta Tensión',
        descricao: 'Acidente grave em ruas e condomínios. Linhas chilenas ou úmidas conduzem a alta tensão direto para o adolescente.', descricao_en: 'Severe accident on streets. Wet or metallic lines conduct high voltage to the user.', descricao_es: 'Accidente grave en calles. Líneas húmedas o metálicas conducen alto voltaje al usuario.',
        prevencao: [
            'Solte pipas apenas em parques abertos, longe de postes de rua.',
            'Jamais use linha com cerol, linha chilena ou fios metálicos.',
            'Se a pipa enroscar no fio, NÃO tente tirar com cabos de vassoura, canos ou pedras.'
        ],
        prevencao_en: [
            'Fly kites only in open parks, away from power poles.',
            'Never use metallic or glass-coated strings.',
            'If the kite gets stuck, DO NOT try to remove it with poles or stones.'
        ],
        prevencao_es: [
            'Vuele cometas solo en parques abiertos, lejos de postes.',
            'Nunca use hilo curado o hilos metálicos.',
            'Si la cometa se enreda, NO intente sacarla con palos o piedras.'
        ],
        primeirosSocorros: 'Afaste curiosos (risco de cabo partido no chão). Ligue imediatamente para 193 e para a concessionária de energia.',
        primeirosSocorros_en: 'Keep onlookers away (risk of downed line). Call 911 and the power company immediately.',
        primeirosSocorros_es: 'Aleje a los curiosos (riesgo de cable caído). Llame al 911 y a la compañía eléctrica.'
    },
    {
        id: 'rf_e8',
        nome: 'Instalações Antigas e Gambiarras', nome_en: 'Old Wiring and DIY Fixes', nome_es: 'Instalaciones Antiguas',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🏚️',
        imagemUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Incêndio Noturno (Idosos)', risco_en: 'Nighttime Fire (Elderly)', risco_es: 'Incendio Nocturno (Ancianos)',
        descricao: 'Casas construídas há mais de 20 anos não suportam as cargas atuais. Fios ressecam no forro, causando fogo.', descricao_en: 'Houses older than 20 years cannot handle modern loads. Wires dry out in the attic, causing fires.', descricao_es: 'Casas de más de 20 años no soportan cargas modernas. Los cables se secan en el techo, causando fuego.',
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
        primeirosSocorros: 'Instale detectores de fumaça, especialmente em lares de idosos, para alerta precoce.',
        primeirosSocorros_en: 'Install smoke detectors, especially in homes with elderly, for early warning.',
        primeirosSocorros_es: 'Instale detectores de humo, especialmente en hogares de ancianos, para alerta temprana.'
    },
    {
        id: 'rf_e9',
        nome: 'Extensões sob Tapetes e Portas', nome_en: 'Extension Cords under Rugs', nome_es: 'Extensiones bajo Alfombras',
        categoria: 'Eletricidade', categoria_en: 'Electricity', categoria_es: 'Electricidad',
        emoji: '🧶',
        imagemUrl: 'https://images.pexels.com/photos/2085739/pexels-photo-2085739.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Curto-circuito e Fogo em Tecido', risco_en: 'Short Circuit and Fabric Fire', risco_es: 'Cortocircuito y Fuego en Tela',
        descricao: 'O pisoteio constante ou esmagamento sob portas quebra os filamentos de cobre, gerando um ponto de calor extremo.', descricao_en: 'Constant trampling breaks copper filaments, generating extreme heat points.', descricao_es: 'El pisoteo constante rompe los filamentos de cobre, generando puntos de calor extremo.',
        prevencao: [
            'Nunca passe fios elétricos debaixo de tapetes, sofás ou colchões.',
            'Não passe extensões por frestas de portas que possam "prensar" o cabo.',
            'Se precisar cruzar um cômodo, use passadores de piso protetores de borracha.'
        ],
        prevencao_en: [
            'Never run electrical cords under rugs, sofas, or mattresses.',
            'Do not run extensions through door jambs that can pinch the cable.',
            'If you must cross a room, use rubber floor cord covers.'
        ],
        prevencao_es: [
            'Nunca pase cables eléctricos debajo de alfombras, sofás o colchones.',
            'No pase extensiones por huecos de puertas que puedan pellizcar el cable.',
            'Si debe cruzar una habitación, use protectores de cables de goma para el piso.'
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
        imagemUrl: 'https://images.pexels.com/photos/5699509/pexels-photo-5699509.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
        id: 'rf_2',
        nome: 'Prevenção de Incêndios', nome_en: 'Fire Prevention', nome_es: 'Prevención de Incendios',
        categoria: 'Fogo', categoria_en: 'Fire', categoria_es: 'Fuego',
        emoji: '🔥',
        imagemUrl: 'https://images.pexels.com/photos/27404939/pexels-photo-27404939.jpeg?auto=compress&cs=tinysrgb&w=1200',
        risco: 'Queimaduras e Morte', risco_en: 'Burns and Death', risco_es: 'Quemaduras y Muerte',
        descricao: 'Acesse o módulo de Teoria do Fogo e Plano de Fuga para o guia completo.', descricao_en: 'Access the Fire Theory module for the complete guide.', descricao_es: 'Acceda al módulo Teoría del Fuego para la guía completa.',
        prevencao: [
            'Consulte o módulo Teoria do Fogo para aprender sobre classes de incêndio e uso de extintores.',
            'O plano de fuga detalhado e a regra do Triângulo do Fogo estão no guia específico.'
        ],
        prevencao_en: [
            'See the Fire Theory module to learn about fire classes and extinguishers.',
            'The detailed escape plan is in the specific guide.'
        ],
        prevencao_es: [
            'Consulte el módulo Teoría del Fuego para aprender sobre clases de incendio y extintores.',
            'El plan de escape detallado está en la guía específica.'
        ],
        primeirosSocorros: 'Ligue 193. Se a roupa pegar fogo: Pare, Deite e Role.',
        primeirosSocorros_en: 'Call 911. If clothing catches fire: Stop, Drop, and Roll.',
        primeirosSocorros_es: 'Llame al 911. Si la ropa se incendia: Deténgase, Tírese al piso y Ruede.'
    },
    {
        id: 'rf_3',
        nome: 'Armas de Fogo', nome_en: 'Firearms', nome_es: 'Armas de Fuego',
        imagemUrl: 'https://images.pexels.com/photos/32334240/pexels-photo-32334240.jpeg?auto=compress&cs=tinysrgb&w=1200',
        categoria: 'Armas', categoria_en: 'Weapons', categoria_es: 'Armas',
        emoji: '🔫',
        risco: 'Morte Acidental', risco_en: 'Accidental Death', risco_es: 'Muerte Accidental',
        descricao: 'O acesso indevido por crianças ou em momentos de raiva pode ser fatal.', descricao_en: 'Improper access by children or in moments of anger can be fatal.', descricao_es: 'El acceso indebido por niños o en momentos de ira puede ser fatal.',
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
        primeirosSocorros: 'Ligue 192 e 190. Estanque sangramentos com compressão forte.',
        primeirosSocorros_en: 'Call 911. Stop bleeding with strong compression.',
        primeirosSocorros_es: 'Llame al 911. Detenga el sangrado con fuerte compresión.'
    },
    {
        id: 'rf_4',
        nome: 'Prevenção de Quedas', nome_en: 'Fall Prevention', nome_es: 'Prevención de Caídas',
        imagemUrl: 'https://images.pexels.com/photos/19079390/pexels-photo-19079390.jpeg?auto=compress&cs=tinysrgb&w=1200',
        categoria: 'Quedas', categoria_en: 'Falls', categoria_es: 'Caídas',
        emoji: '🤕',
        risco: 'Fraturas e Traumas', risco_en: 'Fractures and Trauma', risco_es: 'Fracturas y Traumas',
        descricao: 'Principal causa de acidentes com idosos e crianças.', descricao_en: 'Main cause of accidents with elderly and children.', descricao_es: 'Principal causa de accidentes con ancianos y niños.',
        prevencao: [
            'Instale corrimão em ambos os lados da escada.',
            'Iluminação adequada em corredores e banheiros.',
            'Remova tapetes soltos ou use antiderrapantes.',
            'Instale grades de proteção em janelas e sacadas.',
        ],
        prevencao_en: [
            'Install handrails on both sides of the stairs.',
            'Adequate lighting in hallways and bathrooms.',
            'Remove loose rugs or use non-slip mats.',
            'Install safety gates on windows and balconies.',
        ],
        prevencao_es: [
            'Instale pasamanos a ambos lados de la escalera.',
            'Iluminación adecuada en pasillos y baños.',
            'Retire alfombras sueltas o use antideslizantes.',
            'Instale rejas de protección en ventanas y balcones.',
        ],
        primeirosSocorros: 'Não mova a vítima se houver suspeita de fratura na coluna/pescoço. Chame 192.',
        primeirosSocorros_en: 'Do not move the victim if a spine/neck fracture is suspected. Call 911.',
        primeirosSocorros_es: 'No mueva a la víctima si se sospecha una fractura de columna/cuello. Llame al 911.'
    },
    {
        id: 'rf_5',
        nome: 'Afogamento', nome_en: 'Drowning', nome_es: 'Ahogamiento',
        imagemUrl: 'https://images.pexels.com/photos/5425095/pexels-photo-5425095.jpeg?auto=compress&cs=tinysrgb&w=1200',
        categoria: 'Água', categoria_en: 'Water', categoria_es: 'Agua',
        emoji: '💧',
        risco: 'Morte por Asfixia', risco_en: 'Death by Asphyxiation', risco_es: 'Muerte por Asfixia',
        descricao: 'Pode acontecer em poucos centímetros de água (baldes, banheiras).', descricao_en: 'It can happen in a few centimeters of water (buckets, bathtubs).', descricao_es: 'Puede ocurrir en unos pocos centímetros de agua (cubos, bañeras).',
        prevencao: [
            'Nunca deixe crianças sozinhas no banho ou piscina.',
            'Esvazie baldes e bacias após o uso.',
            'Mantenha a tampa do vaso sanitário travada.',
            'Cerque a piscina completamente.',
        ],
        prevencao_en: [
            'Never leave children alone in the bath or pool.',
            'Empty buckets and basins after use.',
            'Keep the toilet lid locked.',
            'Fence the pool completely.',
        ],
        prevencao_es: [
            'Nunca deje a los niños solos en el baño o la piscina.',
            'Vacíe los cubos y recipientes después de su uso.',
            'Mantenga la tapa del inodoro cerrada.',
            'Cerca la piscina por completo.',
        ],
        primeirosSocorros: 'Retire da água. Se não respirar, inicie RCP imediatamente. Chame 193/192.',
        primeirosSocorros_en: 'Remove from water. If not breathing, start CPR immediately. Call 911.',
        primeirosSocorros_es: 'Retírelo del agua. Si no respira, inicie la RCP inmediatamente. Llame al 911.'
    }
];
