export const areasInternas = [
    // === CONVIVÊNCIA ===
    {
        id: 'living_room',
        grupo: 'comodos',
        titulo: 'Sala de Estar', titulo_ptpt: 'Sala de Estar', titulo_es: 'Salón', titulo_en: 'Living Room',
        situacao: 'Convívio', situacao_ptpt: 'Convívio', situacao_es: 'Convivencia', situacao_en: 'Family time',
        emoji: '🛋️', icone: 'Armchair',
        cor: '#FF7043',
        riscos: 'Quedas, tombamento, choques, vidros.', riscos_ptpt: 'Quedas, tombamentos, choques, vidros.', riscos_es: 'Caídas, vuelcos, descargas, vidrios.', riscos_en: 'Falls, tip-overs, shocks, glass.',
        oQueFazer: [
            'A circulação está livre de móveis ou objetos que causem tropeços?',
            'As quinas vivas de mesas e estantes possuem protetores de silicone?',
            'Os tapetes estão fixados com fita dupla face ou são antiderrapantes?',
            'A TV e móveis altos estão fixados na parede (risco de tombamento)?',
            'Bebidas alcoólicas e objetos de vidro estão fora do alcance de crianças?',
            'A iluminação é suficiente para evitar acidentes à noite?'
        ], oQueFazer_ptpt: [
            'As zonas de passagem estão livres de móveis ou objetos que provoquem tropeções?',
            'As esquinas vivas de mesas e estantes têm protetores de silicone?',
            'Os tapetes estão fixados com fita dupla face ou são antiderrapantes?',
            'O televisor e os móveis altos estão fixados à parede (risco de tombamento)?',
            'As bebidas alcoólicas e os objetos de vidro estão fora do alcance das crianças?',
            'A iluminação é suficiente para evitar acidentes à noite?',
        ], oQueFazer_es: [
            '¿Las zonas de paso están libres de muebles u objetos que provoquen tropiezos?',
            '¿Las esquinas vivas de mesas y estanterías tienen protectores de silicona?',
            '¿Las alfombras están fijadas con cinta de doble cara o son antideslizantes?',
            '¿El televisor y los muebles altos están fijados a la pared (riesgo de vuelco)?',
            '¿Las bebidas alcohólicas y los objetos de vidrio están fuera del alcance de los niños?',
            '¿La iluminación es suficiente para evitar accidentes por la noche?',
        ], oQueFazer_en: [
            'Are walkways clear of furniture or objects that could cause trips?',
            'Do sharp table and shelf corners have silicone guards?',
            'Are rugs fixed with double-sided tape or non-slip?',
            'Are the TV and tall furniture fixed to the wall (tip-over risk)?',
            'Are alcoholic drinks and glass objects out of children’s reach?',
            'Is the lighting good enough to prevent accidents at night?',
        ],
        oQueNaoFazer: [
            'Não deixe fios elétricos soltos no caminho.',
            'Não posicione móveis perto de janelas (efeito escada).',
            'Não deixe bibelôs pequenos acessíveis (risco de engasgo).'
        ], oQueNaoFazer_ptpt: [
            'Não deixe fios elétricos soltos no caminho.',
            'Não coloque móveis perto das janelas (efeito escada).',
            'Não deixe pequenos enfeites ao alcance (risco de engasgamento).',
        ], oQueNaoFazer_es: [
            'No deje cables eléctricos sueltos en el paso.',
            'No coloque muebles cerca de las ventanas (sirven de escalera).',
            'No deje adornos pequeños al alcance (riesgo de atragantamiento).',
        ], oQueNaoFazer_en: [
            'Do not leave loose electrical cables in walkways.',
            'Do not place furniture near windows (it works as a ladder).',
            'Do not leave small ornaments within reach (choking risk).',
        ],
        quandoChamarAjuda: 'Em caso de queda de móvel sobre criança, não mova se houver suspeita de trauma. Ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_ptpt: 'Em caso de queda de um móvel sobre uma criança, não a mova se houver suspeita de traumatismo. Ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_es: 'Si un mueble cae sobre un niño, no lo mueva si se sospecha un traumatismo. Llame a {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_en: 'If furniture falls on a child, do not move them if an injury is suspected. Call {{EMERGENCY_MEDICAL}}.'
    },
    {
        id: 'dining_room', // Mantido para compatibilidade, mas conteúdo mesclado ou refinado
        grupo: 'comodos',
        titulo: 'Sala de Jantar', titulo_ptpt: 'Sala de Jantar', titulo_es: 'Comedor', titulo_en: 'Dining Room',
        situacao: 'Refeições', situacao_ptpt: 'Refeições', situacao_es: 'Comidas', situacao_en: 'Meals',
        emoji: '🍽️', icone: 'ForkKnife',
        cor: '#FFCA28',
        riscos: 'Queimaduras, cortes.', riscos_ptpt: 'Queimaduras, cortes.', riscos_es: 'Quemaduras, cortes.', riscos_en: 'Burns, cuts.',
        oQueFazer: [
            'A toalha de mesa é curta ou segura (dificulta que crianças a puxem)?',
            'Há espaço livre para circulação ao redor das cadeiras?',
            'Objetos de vidro estão longe das bordas da mesa?'
        ], oQueFazer_ptpt: [
            'A toalha de mesa é curta ou está presa (dificulta que as crianças a puxem)?',
            'Há espaço livre para circular à volta das cadeiras?',
            'Os objetos de vidro estão longe das bordas da mesa?',
        ], oQueFazer_es: [
            '¿El mantel es corto o está sujeto (dificulta que los niños tiren de él)?',
            '¿Hay espacio libre para circular alrededor de las sillas?',
            '¿Los objetos de vidrio están lejos de los bordes de la mesa?',
        ], oQueFazer_en: [
            'Is the tablecloth short or secured (so children cannot pull it)?',
            'Is there free space to move around the chairs?',
            'Are glass objects away from the edges of the table?',
        ],
        oQueNaoFazer: [
            'Não deixe pratos quentes na borda da mesa.',
            'Não use velas acesas sem supervisão constante.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe pratos quentes na borda da mesa.',
            'Não use velas acesas sem vigilância constante.',
        ], oQueNaoFazer_es: [
            'No deje platos calientes en el borde de la mesa.',
            'No use velas encendidas sin supervisión constante.',
        ], oQueNaoFazer_en: [
            'Do not leave hot dishes at the edge of the table.',
            'Do not leave lit candles without constant supervision.',
        ],
        quandoChamarAjuda: 'Cortes com vidro: estanque o sangue e procure socorro.', quandoChamarAjuda_ptpt: 'Cortes com vidro: estanque a hemorragia e procure socorro.', quandoChamarAjuda_es: 'Cortes con vidrio: detenga la hemorragia y busque ayuda.', quandoChamarAjuda_en: 'Glass cuts: stop the bleeding and seek help.'
    },

    // === SERVIÇOS E COZINHA ===
    {
        id: 'kitchen',
        grupo: 'comodos',
        titulo: 'Cozinha e Copa', titulo_ptpt: 'Cozinha e Copa', titulo_es: 'Cocina', titulo_en: 'Kitchen',
        situacao: 'Alto Risco', situacao_ptpt: 'Alto Risco', situacao_es: 'Alto Riesgo', situacao_en: 'High Risk',
        emoji: '🍳', icone: 'CookingPot',
        cor: '#EF5350',
        riscos: 'Queimaduras, cortes, gás, intoxicação.', riscos_ptpt: 'Queimaduras, cortes, gás, intoxicação.', riscos_es: 'Quemaduras, cortes, gas, intoxicación.', riscos_en: 'Burns, cuts, gas, poisoning.',
        oQueFazer: [
            'O acesso de crianças é restrito (uso de portões/babygates)?',
            'Os cabos das panelas ficam voltados para dentro do fogão?',
            'Facas e eletrodomésticos de corte estão em armários altos ou travados?',
            'Produtos de limpeza estão trancados e longe de alimentos?',
            'O registro do gás é fechado após o uso?'
        ], oQueFazer_ptpt: [
            'O acesso das crianças está restrito (barreiras de segurança)?',
            'Os cabos das panelas ficam virados para dentro do fogão?',
            'As facas e os eletrodomésticos de corte estão em armários altos ou trancados?',
            'Os produtos de limpeza estão fechados à chave e longe dos alimentos?',
            'A torneira do gás é fechada após o uso?',
        ], oQueFazer_es: [
            '¿El acceso de los niños está restringido (barreras de seguridad)?',
            '¿Los mangos de las ollas quedan hacia dentro de la cocina?',
            '¿Los cuchillos y aparatos cortantes están en armarios altos o con cierre?',
            '¿Los productos de limpieza están bajo llave y lejos de los alimentos?',
            '¿Se cierra la llave del gas después de usarlo?',
        ], oQueFazer_en: [
            'Is children’s access restricted (safety gates)?',
            'Are pan handles turned in towards the cooker?',
            'Are knives and cutting appliances in high or locked cupboards?',
            'Are cleaning products locked away and away from food?',
            'Is the gas valve turned off after use?',
        ],
        oQueNaoFazer: [
            'Nunca deixe toalhas de mesa compridas (muita sobra para baixo).',
            'Não cozinhe com crianças no colo ou muito próximas de você.',
            'Não deixe eletrodomésticos ligados na tomada quando estiverem fora de uso.'
        ], oQueNaoFazer_ptpt: [
            'Nunca deixe toalhas de mesa compridas (com muita sobra pendurada).',
            'Não cozinhe com crianças ao colo ou muito perto de si.',
            'Não deixe eletrodomésticos ligados à tomada sem uso.',
        ], oQueNaoFazer_es: [
            'Nunca deje manteles largos colgando (que sobren mucho).',
            'No cocine con niños en brazos o muy cerca de usted.',
            'No deje electrodomésticos enchufados sin usar.',
        ], oQueNaoFazer_en: [
            'Never leave long tablecloths hanging down (lots of overhang).',
            'Do not cook with a child on your lap or right next to you.',
            'Do not leave appliances plugged in when not in use.',
        ],
        quandoChamarAjuda: 'Chame ajuda em queimadura maior que a palma da mão, no rosto ou em crianças e idosos (antes, resfrie com água corrente por 20 min). Fogo em óleo: abafe com tampa (NUNCA jogue água); se não apagar, saia e ligue para os bombeiros ({{FIRE_NUMBER}}).', quandoChamarAjuda_ptpt: 'Peça ajuda em queimaduras maiores do que a palma da mão, na cara ou em crianças e idosos (antes, arrefeça com água corrente durante 20 min). Fogo em óleo: abafe com uma tampa (NUNCA deite água); se não apagar, saia e ligue para os bombeiros ({{FIRE_NUMBER}}).', quandoChamarAjuda_es: 'Pida ayuda ante una quemadura mayor que la palma de la mano, en la cara o en niños y personas mayores (antes, enfríela con agua corriente 20 min). Fuego de aceite: tápelo con una tapa (NUNCA eche agua); si no se apaga, salga y llame a los bomberos ({{FIRE_NUMBER}}).', quandoChamarAjuda_en: 'Get help for a burn larger than the palm of the hand, on the face, or in a child or older person (first cool it under running water for 20 min). Oil fire: smother it with a lid (NEVER throw water); if it does not go out, get out and call the fire service ({{FIRE_NUMBER}}).'
    },
    {
        id: 'pantry',
        grupo: 'comodos',
        titulo: 'Despensa', titulo_ptpt: 'Despensa', titulo_es: 'Despensa', titulo_en: 'Pantry',
        situacao: 'Armazenamento', situacao_ptpt: 'Armazenamento', situacao_es: 'Almacenamiento', situacao_en: 'Storage',
        emoji: '🥫', icone: 'Package',
        cor: '#795548',
        riscos: 'Intoxicação, asfixia, pragas.', riscos_ptpt: 'Intoxicação, asfixia, pragas.', riscos_es: 'Intoxicación, asfixia, plagas.', riscos_en: 'Poisoning, choking, pests.',
        oQueFazer: [
            'O local é fresco, seco e protegido contra insetos e roedores?',
            'Produtos de limpeza/tóxicos estão SEPARADOS dos alimentos?',
            'Grãos (feijão, milho) estão em potes altos (risco de asfixia/nariz)?',
            'Há escada segura para alcançar prateleiras altas (nada de improvisos)?'
        ], oQueFazer_ptpt: [
            'O local é fresco, seco e protegido contra insetos e roedores?',
            'Os produtos de limpeza/tóxicos estão SEPARADOS dos alimentos?',
            'Os grãos (feijão, milho) estão em frascos no alto (risco de asfixia/nariz)?',
            'Há um escadote seguro para chegar às prateleiras altas (nada de improvisos)?',
        ], oQueFazer_es: [
            '¿El lugar es fresco, seco y está protegido contra insectos y roedores?',
            '¿Los productos de limpieza y tóxicos están SEPARADOS de los alimentos?',
            '¿Las legumbres y el maíz están en botes en alto (riesgo de asfixia/nariz)?',
            '¿Hay una escalera segura para llegar a los estantes altos (sin improvisar)?',
        ], oQueFazer_en: [
            'Is it cool, dry and protected against insects and rodents?',
            'Are cleaning/toxic products kept SEPARATE from food?',
            'Are dried beans and corn kept in high containers (choking/nose risk)?',
            'Is there a safe step stool to reach high shelves (no improvising)?',
        ],
        oQueNaoFazer: [
            'Não armazene produtos químicos em garrafas de alimentos/bebidas.',
            'Não deixe sacos plásticos ao alcance (risco de sufocamento).'
        ], oQueNaoFazer_ptpt: [
            'Não guarde produtos químicos em garrafas de alimentos ou bebidas.',
            'Não deixe sacos de plástico ao alcance (risco de sufocação).',
        ], oQueNaoFazer_es: [
            'No guarde productos químicos en botellas de alimentos o bebidas.',
            'No deje bolsas de plástico al alcance (riesgo de asfixia).',
        ], oQueNaoFazer_en: [
            'Do not store chemicals in food or drink bottles.',
            'Do not leave plastic bags within reach (suffocation risk).',
        ],
        quandoChamarAjuda: 'Ingestão de tóxicos: Ligue {{POISON_CONTROL}}.', quandoChamarAjuda_ptpt: 'Ingestão de tóxicos: ligue para o {{POISON_CONTROL}}.', quandoChamarAjuda_es: 'Ingestión de tóxicos: llame a {{POISON_CONTROL}}.', quandoChamarAjuda_en: 'Swallowed something toxic: call {{POISON_CONTROL}}.'
    },
    {
        id: 'laundry',
        grupo: 'comodos',
        titulo: 'Área de Serviço', titulo_ptpt: 'Lavandaria', titulo_es: 'Lavadero', titulo_en: 'Laundry Area',
        situacao: 'Limpeza', situacao_ptpt: 'Limpeza', situacao_es: 'Limpieza', situacao_en: 'Cleaning',
        emoji: '🧺', icone: 'Basket',
        cor: '#42A5F5',
        riscos: 'Afogamento, intoxicação, quedas.', riscos_ptpt: 'Afogamento, intoxicação, quedas.', riscos_es: 'Ahogamiento, intoxicación, caídas.', riscos_en: 'Drowning, poisoning, falls.',
        oQueFazer: [
            'Produtos de limpeza (soda cáustica, cloro) estão no alto e trancados?',
            'Baldes e bacias ficam vazios e virados para baixo?',
            'O tanque permanece vazio após o uso?',
            'Ferro de passar e tábua são guardados frios e longe de alcance?'
        ], oQueFazer_ptpt: [
            'Os produtos de limpeza (soda cáustica, lixívia) estão no alto e fechados à chave?',
            'Os baldes e alguidares ficam vazios e virados para baixo?',
            'O tanque fica vazio após o uso?',
            'O ferro e a tábua de engomar são guardados frios e fora do alcance?',
        ], oQueFazer_es: [
            '¿Los productos de limpieza (sosa cáustica, lejía) están en alto y bajo llave?',
            '¿Los cubos y barreños quedan vacíos y boca abajo?',
            '¿La pila de lavar queda vacía después de usarla?',
            '¿La plancha y la tabla se guardan frías y fuera del alcance?',
        ], oQueFazer_en: [
            'Are cleaning products (caustic soda, bleach) up high and locked away?',
            'Are buckets and basins kept empty and upside down?',
            'Is the laundry sink left empty after use?',
            'Are the iron and ironing board put away cold and out of reach?',
        ],
        oQueNaoFazer: [
            'Nunca armazene produtos em garrafas pet de refrigerante.',
            'Não deixe baldes com "molho" no chão acessíveis a bebês.'
        ], oQueNaoFazer_ptpt: [
            'Nunca guarde produtos em garrafas de refrigerante.',
            'Não deixe baldes com roupa de molho no chão ao alcance dos bebés.',
        ], oQueNaoFazer_es: [
            'Nunca guarde productos en botellas de refresco.',
            'No deje cubos con ropa en remojo en el suelo al alcance de los bebés.',
        ], oQueNaoFazer_en: [
            'Never store products in soft-drink bottles.',
            'Do not leave buckets with clothes soaking on the floor where babies can reach.',
        ],
        quandoChamarAjuda: 'Ingestão de produtos químicos: Não provoque vômito. Ligue para o {{POISON_CONTROL}}.', quandoChamarAjuda_ptpt: 'Ingestão de produtos químicos: não provoque o vómito. Ligue para o {{POISON_CONTROL}}.', quandoChamarAjuda_es: 'Ingestión de productos químicos: no provoque el vómito. Llame a {{POISON_CONTROL}}.', quandoChamarAjuda_en: 'Swallowed chemicals: do not induce vomiting. Call {{POISON_CONTROL}}.'
    },

    // === DORMITÓRIOS (Segmentados) ===
    {
        id: 'bedroom_baby',
        grupo: 'comodos',
        titulo: 'Quarto do Bebê', titulo_ptpt: 'Quarto do Bebé', titulo_es: 'Habitación del Bebé', titulo_en: 'Baby’s Room',
        situacao: 'Bebê (0-3 anos)', situacao_ptpt: 'Bebé (0–3 anos)', situacao_es: 'Bebé (0–3 años)', situacao_en: 'Baby (0–3 years)',
        emoji: '👶', icone: 'Baby',
        cor: '#F48FB1',
        riscos: 'Sufocamento, quedas.', riscos_ptpt: 'Sufocação, quedas.', riscos_es: 'Asfixia, caídas.', riscos_en: 'Suffocation, falls.',
        oQueFazer: [
            'O berço segue normas (grades até 6cm) e está livre de pelúcias e kits de berço?',
            'Móveis estão longe das janelas?',
            'Há monitoramento (babá eletrônica)?',
            'Trocador tem bordas altas e itens à mão?'
        ], oQueFazer_ptpt: [
            'O berço cumpre as normas (grades com até 6 cm) e está livre de peluches e protetores de berço?',
            'Os móveis estão longe das janelas?',
            'Há monitorização (intercomunicador de bebé)?',
            'O muda-fraldas tem bordas altas e tudo à mão?',
        ], oQueFazer_es: [
            '¿La cuna cumple la normativa (barrotes a 6 cm como máximo) y está libre de peluches y chichoneras?',
            '¿Los muebles están lejos de las ventanas?',
            '¿Hay vigilancia (vigilabebés)?',
            '¿El cambiador tiene bordes altos y todo a mano?',
        ], oQueFazer_en: [
            'Does the cot meet safety standards (bars no more than 6 cm apart) and is it free of soft toys and cot bumpers?',
            'Is furniture away from windows?',
            'Is there monitoring (baby monitor)?',
            'Does the changing table have raised edges and everything within reach?',
        ],
        oQueNaoFazer: [
            'Não deixe o bebê sozinho no trocador.',
            'Não use protetores de berço fofos (risco de sufocamento).'
        ], oQueNaoFazer_ptpt: [
            'Não deixe o bebé sozinho no muda-fraldas.',
            'Não use protetores de berço fofos (risco de sufocação).',
        ], oQueNaoFazer_es: [
            'No deje al bebé solo en el cambiador.',
            'No use chichoneras acolchadas (riesgo de asfixia).',
        ], oQueNaoFazer_en: [
            'Do not leave the baby alone on the changing table.',
            'Do not use soft cot bumpers (suffocation risk).',
        ],
        quandoChamarAjuda: 'Bebê engasgado ou roxo: alterne 5 pancadas nas costas com 5 compressões no peito (NUNCA Heimlich em bebê) e ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_ptpt: 'Bebé engasgado ou roxo: alterne 5 pancadas nas costas com 5 compressões no peito (NUNCA Heimlich num bebé) e ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_es: 'Bebé atragantado o morado: alterne 5 golpes en la espalda con 5 compresiones en el pecho (NUNCA Heimlich en un bebé) y llame a {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_en: 'Baby choking or turning blue: alternate 5 back blows with 5 chest thrusts (NEVER the Heimlich on a baby) and call {{EMERGENCY_MEDICAL}}.'
    },
    {
        id: 'bedroom_kids',
        grupo: 'comodos',
        titulo: 'Quarto de Criança', titulo_ptpt: 'Quarto de Criança', titulo_es: 'Habitación Infantil', titulo_en: 'Child’s Room',
        situacao: 'Infantil', situacao_ptpt: 'Infantil', situacao_es: 'Infantil', situacao_en: 'Children',
        emoji: '🧸', icone: 'Balloon',
        cor: '#CE93D8',
        riscos: 'Quedas, tombamento.', riscos_ptpt: 'Quedas, tombamentos.', riscos_es: 'Caídas, vuelcos.', riscos_en: 'Falls, tip-overs.',
        oQueFazer: [
            'As janelas possuem telas/redes de proteção?',
            'Grades de proteção estão instaladas na cama?',
            'Móveis altos ou com gavetas (estantes, guarda-roupas, cômodas) estão parafusados na parede (antitombamento)?',
            'Brinquedos são guardados para evitar tropeços noturnos?'
        ], oQueFazer_ptpt: [
            'As janelas têm redes de proteção?',
            'A cama tem grades de proteção?',
            'Os móveis altos ou com gavetas (estantes, roupeiros, cómodas) estão aparafusados à parede (antitombamento)?',
            'Os brinquedos são arrumados para evitar tropeções à noite?',
        ], oQueFazer_es: [
            '¿Las ventanas tienen mosquiteras o redes de protección?',
            '¿La cama tiene barreras de protección?',
            '¿Los muebles altos o con cajones (estanterías, armarios, cómodas) están atornillados a la pared (antivuelco)?',
            '¿Los juguetes se recogen para evitar tropiezos por la noche?',
        ], oQueFazer_en: [
            'Do the windows have safety screens or nets?',
            'Are bed rails fitted?',
            'Is tall furniture or furniture with drawers (bookcases, wardrobes, chests of drawers) screwed to the wall (anti-tip)?',
            'Are toys put away to avoid tripping at night?',
        ],
        oQueNaoFazer: [
            'Não deixe móveis escaláveis perto de janelas.',
            'Não deixe fios elétricos soltos.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe móveis que se possam escalar perto das janelas.',
            'Não deixe fios elétricos soltos.',
        ], oQueNaoFazer_es: [
            'No deje muebles escalables cerca de las ventanas.',
            'No deje cables eléctricos sueltos.',
        ], oQueNaoFazer_en: [
            'Do not leave climbable furniture near windows.',
            'Do not leave loose electrical cables.',
        ]
    },
    {
        id: 'bedroom_teen',
        grupo: 'comodos',
        titulo: 'Quarto Adolescente', titulo_ptpt: 'Quarto de Adolescente', titulo_es: 'Habitación Adolescente', titulo_en: 'Teenager’s Room',
        situacao: 'Jovem', situacao_ptpt: 'Jovem', situacao_es: 'Joven', situacao_en: 'Young person',
        emoji: '🎧', icone: 'Headphones',
        cor: '#5C6BC0',
        riscos: 'Elétricos, bagunça.', riscos_ptpt: 'Elétricos, desarrumação.', riscos_es: 'Eléctricos, desorden.', riscos_en: 'Electrical, clutter.',
        oQueFazer: [
            'O chão está livre de objetos (reduz o risco de tropeços)?',
            'Os eletrônicos (sem sobrecarga) e os fios estão organizados?',
            'A postura na cadeira de estudo/PC é adequada?'
        ], oQueFazer_ptpt: [
            'O chão está livre de objetos (reduz o risco de tropeções)?',
            'Os eletrónicos e os fios estão organizados (sem sobrecarga)?',
            'A postura na cadeira de estudo/computador é adequada?',
        ], oQueFazer_es: [
            '¿El suelo está libre de objetos (reduce el riesgo de tropiezos)?',
            '¿Los aparatos electrónicos y cables están ordenados (sin sobrecarga)?',
            '¿La postura en la silla de estudio/ordenador es adecuada?',
        ], oQueFazer_en: [
            'Is the floor clear of objects (reduces the risk of trips)?',
            'Are electronics and cables organised (no overload)?',
            'Is posture at the study/computer chair appropriate?',
        ],
        oQueNaoFazer: [
            'Não durma com o celular recarregando embaixo do travesseiro (aquecimento).'
        ], oQueNaoFazer_ptpt: [
            'Não durma com o telemóvel a carregar debaixo da almofada (sobreaquecimento).',
        ], oQueNaoFazer_es: [
            'No duerma con el móvil cargando debajo de la almohada (sobrecalentamiento).',
        ], oQueNaoFazer_en: [
            'Do not sleep with a phone charging under the pillow (overheating).',
        ]
    },
    {
        id: 'bedroom_adult',
        grupo: 'comodos',
        titulo: 'Quarto Adulto', titulo_ptpt: 'Quarto de Adulto', titulo_es: 'Dormitorio Adulto', titulo_en: 'Adult Bedroom',
        situacao: 'Casal/Solteiro', situacao_ptpt: 'Casal/Solteiro', situacao_es: 'Pareja/Individual', situacao_en: 'Couple/Single',
        emoji: '🛏️', icone: 'Bed',
        cor: '#AB47BC',
        riscos: 'Medicamentos, armas, curiosidade infantil.', riscos_ptpt: 'Medicamentos, armas, curiosidade infantil.', riscos_es: 'Medicamentos, armas, curiosidad infantil.', riscos_en: 'Medicines, firearms, children’s curiosity.',
        oQueFazer: [
            'Medicamentos e cosméticos estão trancados?',
            'Objetos cortantes (tesouras, alicates) estão seguros?',
            'Armas de fogo (se houver) estão em cofre e desmuniciadas?'
        ], oQueFazer_ptpt: [
            'Os medicamentos e cosméticos estão fechados à chave?',
            'Os objetos cortantes (tesouras, alicates) estão bem guardados?',
            'As armas de fogo (se houver) estão descarregadas e num cofre?',
        ], oQueFazer_es: [
            '¿Los medicamentos y cosméticos están bajo llave?',
            '¿Los objetos cortantes (tijeras, alicates) están bien guardados?',
            '¿Las armas de fuego (si las hay) están descargadas y en una caja fuerte?',
        ], oQueFazer_en: [
            'Are medicines and cosmetics locked away?',
            'Are sharp objects (scissors, pliers) stored safely?',
            'Are firearms (if any) unloaded and in a safe?',
        ],
        oQueNaoFazer: [
            'Não deixe remédios na mesa de cabeceira se houver crianças ou pessoas com limitações cognitivas na casa.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe medicamentos na mesa de cabeceira se houver crianças ou pessoas com limitações cognitivas em casa.',
        ], oQueNaoFazer_es: [
            'No deje medicamentos en la mesilla de noche si hay niños o personas con limitaciones cognitivas en casa.',
        ], oQueNaoFazer_en: [
            'Do not leave medicines on the bedside table if there are children or people with cognitive impairments in the house.',
        ]
    },
    {
        id: 'bedroom_senior',
        grupo: 'comodos',
        titulo: 'Quarto de Idoso', titulo_ptpt: 'Quarto de Idoso', titulo_es: 'Habitación de Persona Mayor', titulo_en: 'Older Person’s Room',
        situacao: 'Terceira Idade', situacao_ptpt: 'Terceira Idade', situacao_es: 'Tercera Edad', situacao_en: 'Older age',
        emoji: '👴', icone: 'Elderly',
        cor: '#9575CD',
        riscos: 'Quedas graves.', riscos_ptpt: 'Quedas graves.', riscos_es: 'Caídas graves.', riscos_en: 'Serious falls.',
        oQueFazer: [
            'A altura da cama permite apoiar os pés no chão quando sentado?',
            'O caminho até o banheiro é livre, sem tapetes e iluminado (luz noturna)?',
            'Os móveis têm cantos arredondados e são firmes para apoio?',
            'Há um telefone ou botão de emergência próximo à cama?'
        ], oQueFazer_ptpt: [
            'A altura da cama permite apoiar os pés no chão quando sentado?',
            'O caminho até à casa de banho está livre, sem tapetes e iluminado (luz de presença)?',
            'Os móveis têm cantos arredondados e são firmes para apoio?',
            'Há um telefone ou botão de emergência perto da cama?',
        ], oQueFazer_es: [
            '¿La altura de la cama permite apoyar los pies en el suelo al sentarse?',
            '¿El camino al baño está despejado, sin alfombras e iluminado (luz nocturna)?',
            '¿Los muebles tienen esquinas redondeadas y son firmes para apoyarse?',
            '¿Hay un teléfono o botón de emergencia cerca de la cama?',
        ], oQueFazer_en: [
            'Is the bed low enough to rest both feet on the floor when sitting?',
            'Is the path to the bathroom clear, rug-free and lit (night light)?',
            'Does the furniture have rounded corners and is it sturdy enough to lean on?',
            'Is there a phone or emergency button near the bed?',
        ],
        oQueNaoFazer: [
            'Não use tapetes soltos (estão entre os maiores vilões).',
            'Não deixe cobertas arrastando no chão.'
        ], oQueNaoFazer_ptpt: [
            'Não use tapetes soltos (estão entre os maiores vilões).',
            'Não deixe cobertores a arrastar pelo chão.',
        ], oQueNaoFazer_es: [
            'No use alfombras sueltas (están entre las mayores culpables).',
            'No deje mantas arrastrando por el suelo.',
        ], oQueNaoFazer_en: [
            'Do not use loose rugs (they are among the worst culprits).',
            'Do not leave bedding trailing on the floor.',
        ],
        quandoChamarAjuda: 'Queda de idoso ou de pessoa com mobilidade reduzida requer avaliação médica para descartar fraturas.', quandoChamarAjuda_ptpt: 'Uma queda de um idoso ou de uma pessoa com mobilidade reduzida exige avaliação médica para excluir fraturas.', quandoChamarAjuda_es: 'Una caída de una persona mayor o con movilidad reducida requiere valoración médica para descartar fracturas.', quandoChamarAjuda_en: 'A fall in an older person or someone with reduced mobility needs a medical check to rule out fractures.'
    },

    // === BANHEIRO ===
    {
        id: 'bathroom',
        grupo: 'comodos',
        titulo: 'Banheiros', titulo_ptpt: 'Casas de Banho', titulo_es: 'Baños', titulo_en: 'Bathrooms',
        situacao: 'Área Molhada', situacao_ptpt: 'Zona Molhada', situacao_es: 'Zona Húmeda', situacao_en: 'Wet area',
        emoji: '🚿', icone: 'Shower',
        cor: '#29B6F6',
        riscos: 'Quedas, afogamento, choque.', riscos_ptpt: 'Quedas, afogamento, choque.', riscos_es: 'Caídas, ahogamiento, descargas.', riscos_en: 'Falls, drowning, shock.',
        oQueFazer: [
            'O piso do box tem tapete antiderrapante?',
            'Há barras de apoio no box e vaso (essencial para idosos e pessoas com mobilidade reduzida)?',
            'A tampa do vaso tem trava (reduz o risco de afogamento de crianças)?',
            'Medicamentos/Giletes estão fora de alcance?',
            'O piso é mantido seco após o banho?'
        ], oQueFazer_ptpt: [
            'O piso do duche tem tapete antiderrapante?',
            'Há barras de apoio no duche e junto à sanita (essencial para idosos e pessoas com mobilidade reduzida)?',
            'A tampa da sanita tem bloqueio (reduz o risco de afogamento de crianças)?',
            'Os medicamentos e as lâminas estão fora do alcance?',
            'O piso é mantido seco após o banho?',
        ], oQueFazer_es: [
            '¿El suelo de la ducha tiene alfombrilla antideslizante?',
            '¿Hay barras de apoyo en la ducha y junto al inodoro (esencial para personas mayores y con movilidad reducida)?',
            '¿La tapa del inodoro tiene cierre (reduce el riesgo de ahogamiento de niños)?',
            '¿Los medicamentos y las cuchillas están fuera del alcance?',
            '¿El suelo se mantiene seco después de la ducha?',
        ], oQueFazer_en: [
            'Does the shower floor have a non-slip mat?',
            'Are there grab bars in the shower and by the toilet (essential for older people and anyone with reduced mobility)?',
            'Does the toilet lid have a lock (reduces the risk of children drowning)?',
            'Are medicines and razors out of reach?',
            'Is the floor kept dry after showering?',
        ],
        oQueNaoFazer: [
            'JAMAIS deixe crianças sozinhas na banheira (afogamento em poucos centímetros de água).',
            'Não use secador descalço ou no piso molhado.'
        ], oQueNaoFazer_ptpt: [
            'NUNCA deixe crianças sozinhas na banheira (podem afogar-se em poucos centímetros de água).',
            'Não use o secador descalço ou em piso molhado.',
        ], oQueNaoFazer_es: [
            'NUNCA deje a los niños solos en la bañera (pueden ahogarse en pocos centímetros de agua).',
            'No use el secador descalzo ni sobre el suelo mojado.',
        ], oQueNaoFazer_en: [
            'NEVER leave children alone in the bath (they can drown in a few centimetres of water).',
            'Do not use a hair dryer barefoot or on a wet floor.',
        ],
        quandoChamarAjuda: 'Afogamento ou queda com impacto na cabeça: ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_ptpt: 'Afogamento ou queda com pancada na cabeça: ligue para o {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_es: 'Ahogamiento o caída con golpe en la cabeza: llame a {{EMERGENCY_MEDICAL}}.', quandoChamarAjuda_en: 'Drowning or a fall with a blow to the head: call {{EMERGENCY_MEDICAL}}.'
    },

    // === INFRA E CIRCULAÇÃO ===
    {
        id: 'stairs',
        grupo: 'comodos',
        titulo: 'Escadas', titulo_ptpt: 'Escadas', titulo_es: 'Escaleras', titulo_en: 'Stairs',
        situacao: 'Desnível', situacao_ptpt: 'Desnível', situacao_es: 'Desnivel', situacao_en: 'Change in level',
        emoji: '🪜', icone: 'Ladder',
        cor: '#FFA726',
        riscos: 'Quedas fatais.', riscos_ptpt: 'Quedas fatais.', riscos_es: 'Caídas mortales.', riscos_en: 'Fatal falls.',
        oQueFazer: [
            'Há corrimão firme em ambos os lados?',
            'Os degraus têm fita antiderrapante?',
            'A iluminação é excelente em todo o trajeto?',
            'Há portões (babygates) no topo e na base (se houver crianças)?'
        ], oQueFazer_ptpt: [
            'Há corrimão firme dos dois lados?',
            'Os degraus têm fita antiderrapante?',
            'A iluminação é excelente em todo o percurso?',
            'Há barreiras no topo e na base (se houver crianças)?',
        ], oQueFazer_es: [
            '¿Hay un pasamanos firme a ambos lados?',
            '¿Los peldaños tienen cinta antideslizante?',
            '¿La iluminación es excelente en todo el recorrido?',
            '¿Hay barreras arriba y abajo (si hay niños)?',
        ], oQueFazer_en: [
            'Is there a firm handrail on both sides?',
            'Do the steps have non-slip strips?',
            'Is the lighting excellent all the way?',
            'Are there safety gates at the top and bottom (if there are children)?',
        ],
        oQueNaoFazer: [
            'Não deixe objetos nem permita pets nos degraus.',
            'Não use tapetes soltos nos patamares.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe objetos nos degraus nem permita animais neles.',
            'Não use tapetes soltos nos patamares.',
        ], oQueNaoFazer_es: [
            'No deje objetos en los peldaños ni permita que las mascotas se queden en ellos.',
            'No use alfombras sueltas en los rellanos.',
        ], oQueNaoFazer_en: [
            'Do not leave objects on the steps or let pets lie there.',
            'Do not use loose rugs on landings.',
        ]
    },
    {
        id: 'garage',
        grupo: 'comodos',
        titulo: 'Garagem', titulo_ptpt: 'Garagem', titulo_es: 'Garaje', titulo_en: 'Garage',
        situacao: 'Veículos', situacao_ptpt: 'Veículos', situacao_es: 'Vehículos', situacao_en: 'Vehicles',
        emoji: '🚗', icone: 'Car',
        cor: '#607D8B',
        riscos: 'Atropelamento, monóxido de carbono (CO), inflamáveis.', riscos_ptpt: 'Atropelamento, monóxido de carbono (CO), inflamáveis.', riscos_es: 'Atropellos, monóxido de carbono (CO), inflamables.', riscos_en: 'Being run over, carbon monoxide (CO), flammables.',
        oQueFazer: [
            'A iluminação é boa e o chão está livre de objetos espalhados?',
            'Você verifica atrás/embaixo do carro antes de manobrar?',
            'Materiais inflamáveis estão longe de calor?',
            'O portão tem sensor antiesmagamento?'
        ], oQueFazer_ptpt: [
            'A iluminação é boa e o chão está livre de objetos espalhados?',
            'Verifica atrás e por baixo do carro antes de manobrar?',
            'Os materiais inflamáveis estão longe do calor?',
            'O portão tem sensor antiesmagamento?',
        ], oQueFazer_es: [
            '¿La iluminación es buena y el suelo está libre de objetos tirados?',
            '¿Revisa detrás y debajo del coche antes de maniobrar?',
            '¿Los materiales inflamables están lejos del calor?',
            '¿La puerta tiene sensor antiaplastamiento?',
        ], oQueFazer_en: [
            'Is the lighting good and the floor free of things lying around?',
            'Do you check behind and under the car before manoeuvring?',
            'Are flammable materials away from heat?',
            'Does the gate have an anti-crush sensor?',
        ],
        oQueNaoFazer: [
            'Jamais deixe o carro ligado em garagem fechada (Monóxido de Carbono mata).',
            'Não deixe crianças brincarem na área de manobra.'
        ], oQueNaoFazer_ptpt: [
            'Nunca deixe o carro ligado numa garagem fechada (o monóxido de carbono mata).',
            'Não deixe as crianças brincar na zona de manobra.',
        ], oQueNaoFazer_es: [
            'Nunca deje el coche en marcha en un garaje cerrado (el monóxido de carbono mata).',
            'No deje que los niños jueguen en la zona de maniobra.',
        ], oQueNaoFazer_en: [
            'Never leave the car running in a closed garage (carbon monoxide kills).',
            'Do not let children play where cars manoeuvre.',
        ]
    },
    {
        id: 'gas_central',
        grupo: 'comodos',
        titulo: 'Central de Gás', titulo_ptpt: 'Central de Gás', titulo_es: 'Instalación de Gas', titulo_en: 'Gas Supply Point',
        situacao: 'Técnico', situacao_ptpt: 'Técnico', situacao_es: 'Técnico', situacao_en: 'Technical',
        emoji: '🔥', icone: 'Fire',
        cor: '#D84315',
        riscos: 'Explosão, vazamento.', riscos_ptpt: 'Explosão, fugas.', riscos_es: 'Explosión, fugas.', riscos_en: 'Explosion, leaks.',
        oQueFazer: [
            'Botijões estão em local VENTILADO e externo (protegidos de sol e chuva)?',
            'Estão longe de ralos e eletricidade?',
            'As validades da mangueira e do regulador foram verificadas?',
            'Teste de vazamento é feito apenas com espuma de sabão?'
        ], oQueFazer_ptpt: [
            'As botijas estão num local VENTILADO e exterior (protegidas do sol e da chuva)?',
            'Estão longe de ralos e da eletricidade?',
            'Foi verificada a validade do tubo e do redutor?',
            'O teste de fugas é feito apenas com espuma de sabão?',
        ], oQueFazer_es: [
            '¿Las bombonas están en un lugar VENTILADO y exterior (protegidas del sol y la lluvia)?',
            '¿Están lejos de desagües y de la electricidad?',
            '¿Se ha comprobado la fecha de caducidad de la manguera y el regulador?',
            '¿La prueba de fugas se hace solo con agua jabonosa?',
        ], oQueFazer_en: [
            'Are gas cylinders kept somewhere VENTILATED and outdoors (protected from sun and rain)?',
            'Are they away from drains and electricity?',
            'Has the expiry date of the hose and regulator been checked?',
            'Is leak testing only ever done with soapy water?',
        ],
        oQueNaoFazer: [
            'Nunca use fogo (isqueiro) para testar vazamento!',
            'Se cheirar gás: Não acenda luzes, abra janelas e saia.'
        ], oQueNaoFazer_ptpt: [
            'Nunca use fogo (isqueiro) para testar fugas!',
            'Se cheirar a gás: não acenda luzes, abra as janelas e saia.',
        ], oQueNaoFazer_es: [
            '¡Nunca use fuego (mechero) para buscar fugas!',
            'Si huele a gas: no encienda luces, abra las ventanas y salga.',
        ], oQueNaoFazer_en: [
            'Never use a flame (lighter) to test for leaks!',
            'If you smell gas: do not switch on lights, open the windows and get out.',
        ],
        quandoChamarAjuda: 'Vazamento incontrolável ou fogo: saia e ligue para os bombeiros ({{FIRE_NUMBER}}).', quandoChamarAjuda_ptpt: 'Fuga incontrolável ou fogo: saia e ligue para os bombeiros ({{FIRE_NUMBER}}).', quandoChamarAjuda_es: 'Fuga incontrolable o fuego: salga y llame a los bomberos ({{FIRE_NUMBER}}).', quandoChamarAjuda_en: 'Uncontrollable leak or fire: get out and call the fire service ({{FIRE_NUMBER}}).'
    },
    {
        id: 'armarios_geral',
        grupo: 'comodos',
        titulo: 'Armários Gerais', titulo_ptpt: 'Armários Gerais', titulo_es: 'Armarios en General', titulo_en: 'General Cupboards',
        situacao: 'Organização', situacao_ptpt: 'Organização', situacao_es: 'Organización', situacao_en: 'Organisation',
        emoji: '🗄️', icone: 'Archive',
        cor: '#795548',
        riscos: 'Queda de objetos, acesso indevido.', riscos_ptpt: 'Queda de objetos, acesso indevido.', riscos_es: 'Caída de objetos, acceso indebido.', riscos_en: 'Falling objects, unwanted access.',
        oQueFazer: [
            'Objetos pesados estão nas partes baixas?',
            'Produtos perigosos (remédios, produtos químicos) estão nas partes altas ou trancados?',
            'Há travas de segurança externas nas portas (proteção infantil)?'
        ], oQueFazer_ptpt: [
            'Os objetos pesados estão nas partes de baixo?',
            'Os produtos perigosos (medicamentos, químicos) estão no alto ou fechados à chave?',
            'As portas têm fechos de segurança exteriores (proteção infantil)?',
        ], oQueFazer_es: [
            '¿Los objetos pesados están en las partes bajas?',
            '¿Los productos peligrosos (medicamentos, químicos) están en alto o bajo llave?',
            '¿Las puertas tienen cierres de seguridad externos (protección infantil)?',
        ], oQueFazer_en: [
            'Are heavy objects on the lower shelves?',
            'Are dangerous products (medicines, chemicals) up high or locked away?',
            'Do the doors have external safety locks (child protection)?',
        ],
        oQueNaoFazer: [
            'Não deixe chaves nas fechaduras ao alcance de crianças.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe chaves nas fechaduras ao alcance das crianças.',
        ], oQueNaoFazer_es: [
            'No deje las llaves en las cerraduras al alcance de los niños.',
        ], oQueNaoFazer_en: [
            'Do not leave keys in locks within children’s reach.',
        ]
    },
    {
        id: 'balcony_indoor', // Varanda considerada interna/anexa
        grupo: 'comodos',
        titulo: 'Varanda / Sacada', titulo_ptpt: 'Varanda', titulo_es: 'Balcón / Terraza', titulo_en: 'Balcony',
        situacao: 'Extensão', situacao_ptpt: 'Extensão', situacao_es: 'Extensión', situacao_en: 'Extension',
        emoji: '🌅', icone: 'SunHorizon',
        cor: '#FFB74D',
        riscos: 'Queda de altura.', riscos_ptpt: 'Queda em altura.', riscos_es: 'Caída desde altura.', riscos_en: 'Falls from height.',
        oQueFazer: [
            'O piso é antiderrapante (risco se molhar)?',
            'Redes de proteção certificadas estão instaladas (indispensáveis com crianças e pets)?',
            'Afastou móveis e vasos do guarda-corpo (efeito escada)?'
        ], oQueFazer_ptpt: [
            'O piso é antiderrapante (risco se molhar)?',
            'Estão instaladas redes de proteção certificadas (indispensáveis com crianças e animais)?',
            'Afastou móveis e vasos do guarda-corpo (efeito escada)?',
        ], oQueFazer_es: [
            '¿El suelo es antideslizante (riesgo si se moja)?',
            '¿Hay redes de protección certificadas instaladas (imprescindibles con niños y mascotas)?',
            '¿Ha alejado muebles y macetas de la barandilla (sirven de escalera)?',
        ], oQueFazer_en: [
            'Is the floor non-slip (risky when wet)?',
            'Are certified safety nets fitted (essential with children and pets)?',
            'Have you moved furniture and plant pots away from the railing (they work as a ladder)?',
        ],
        oQueNaoFazer: [
            'Não deixe crianças sozinhas na sacada.',
            'Não apoie debruçado no guarda-corpo.'
        ], oQueNaoFazer_ptpt: [
            'Não deixe crianças sozinhas na varanda.',
            'Não se debruce no guarda-corpo.',
        ], oQueNaoFazer_es: [
            'No deje a los niños solos en el balcón.',
            'No se asome apoyándose en la barandilla.',
        ], oQueNaoFazer_en: [
            'Do not leave children alone on the balcony.',
            'Do not lean over the railing.',
        ]
    }
    ,
    {
        id: 'accessibility_pcd',
        grupo: 'especial',
        titulo: 'Acessibilidade (PCD)', titulo_ptpt: 'Acessibilidade (Deficiência)', titulo_es: 'Accesibilidad (Discapacidad)', titulo_en: 'Accessibility (Disability)',
        situacao: 'Adaptação', situacao_ptpt: 'Adaptação', situacao_es: 'Adaptación', situacao_en: 'Adaptation',
        emoji: '♿', icone: 'Wheelchair',
        cor: '#00897B', // Teal
        riscos: 'Barreiras, quedas, falta de autonomia.', riscos_ptpt: 'Barreiras, quedas, falta de autonomia.', riscos_es: 'Barreras, caídas, falta de autonomía.', riscos_en: 'Barriers, falls, loss of independence.',
        oQueFazer: [
            'Portas e corredores são largos o suficiente para cadeira de rodas e andador?',
            'Há espaço de circulação e giro (360º) para cadeira de rodas nas salas?',
            'O quarto do PCD fica no térreo (evita escadas)?',
            'O banheiro possui barras de apoio e bacia sanitária elevada?',
            'O box é amplo e nivelado (sem degrau) para acesso de cadeira de banho?',
            'Torneiras são de alavanca ou sensor (fáceis de abrir e fechar)?',
            'Pias e bancadas possuem vão livre embaixo para encaixe das pernas?'
        ], oQueFazer_ptpt: [
            'As portas e os corredores são largos o suficiente para cadeira de rodas e andarilho?',
            'Há espaço para circular e rodar (360°) a cadeira de rodas nas salas?',
            'O quarto da pessoa com deficiência fica no rés-do-chão (evita escadas)?',
            'A casa de banho tem barras de apoio e sanita elevada?',
            'O duche é amplo e nivelado (sem degrau) para a cadeira de banho?',
            'As torneiras são de alavanca ou sensor (fáceis de abrir e fechar)?',
            'Os lavatórios e bancadas têm espaço livre por baixo para as pernas?',
        ], oQueFazer_es: [
            '¿Las puertas y pasillos son lo bastante anchos para silla de ruedas o andador?',
            '¿Hay espacio para circular y girar (360°) con la silla de ruedas en las habitaciones?',
            '¿La habitación de la persona con discapacidad está en la planta baja (sin escaleras)?',
            '¿El baño tiene barras de apoyo e inodoro elevado?',
            '¿La ducha es amplia y a ras de suelo (sin escalón) para la silla de ducha?',
            '¿Los grifos son de palanca o con sensor (fáciles de abrir y cerrar)?',
            '¿Los lavabos y encimeras tienen hueco libre debajo para las piernas?',
        ], oQueFazer_en: [
            'Are doors and hallways wide enough for a wheelchair or walker?',
            'Is there room to move and turn (360°) a wheelchair in the rooms?',
            'Is the bedroom of the person with a disability on the ground floor (no stairs)?',
            'Does the bathroom have grab bars and a raised toilet?',
            'Is the shower wide and level (no step) for a shower chair?',
            'Are the taps lever or sensor operated (easy to open and close)?',
            'Do sinks and worktops have clear space underneath for the legs?',
        ],
        oQueNaoFazer: [
            'Não use tapetes que dificultem a rolagem da cadeira.',
            'Não coloque móveis no trajeto de circulação diária.',
            'Não instale armários muito altos sem opção de acesso.'
        ], oQueNaoFazer_ptpt: [
            'Não use tapetes que dificultem o rolar da cadeira.',
            'Não coloque móveis no percurso de circulação diária.',
            'Não instale armários muito altos sem outra forma de lá chegar.',
        ], oQueNaoFazer_es: [
            'No use alfombras que dificulten el rodar de la silla.',
            'No ponga muebles en el recorrido diario.',
            'No instale armarios muy altos sin otra forma de alcanzarlos.',
        ], oQueNaoFazer_en: [
            'Do not use rugs that make it hard for the wheelchair to roll.',
            'Do not put furniture in everyday walkways.',
            'Do not fit very high cupboards without another way to reach them.',
        ],
        quandoChamarAjuda: 'Quedas de cadeirantes podem gerar traumas ocultos. Avalie com cuidado e chame ajuda especializada.', quandoChamarAjuda_ptpt: 'As quedas de utilizadores de cadeira de rodas podem causar lesões ocultas. Avalie com cuidado e chame ajuda especializada.', quandoChamarAjuda_es: 'Las caídas de usuarios de silla de ruedas pueden causar lesiones ocultas. Evalúe con cuidado y pida ayuda especializada.', quandoChamarAjuda_en: 'Falls of wheelchair users can cause hidden injuries. Assess carefully and call for specialised help.'
    }
];
