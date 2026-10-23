/**
 * mapeamento_dados.js
 * Dados de Ambientes e Checklists para o Mapeamento Doméstico
 * Vigilaro Care V6 - Módulo Expert (Memória de Elefante)
 * Atualizado com protocolos de prevenção avançada.
 */

export const AMBIENTES = [
    // FLUXO DE CAMINHADA PELA CASA (Internas -> Externas)
    {
        id: 'hall_corredor',
        nome: 'Corredores',
        nome_en: 'Hallways',
        nome_es: 'Pasillos',
        emoji: '🚶', icone: 'Pedestrian',
        iconName: 'Door',
        cor: '#FFD54F',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Iluminação noturna e passagens amplas.',
        descricao_en: 'Night lighting and wide passageways.',
        descricao_es: 'Iluminación nocturna y pasillos amplios.',
        condicional: 'opcional',
        fase: 2,
        imagemUrl: null,
    },
    {
        id: 'sala',
        nome: 'Sala de Estar',
        nome_en: 'Living Room',
        nome_es: 'Sala de Estar',
        emoji: '🛋️', icone: 'Armchair',
        iconName: 'Monitor',
        cor: '#AA96DA',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Convívio e brincadeiras sem tropeços, com móveis estáveis.',
        descricao_en: 'Family time and play without trips, with stable furniture.',
        descricao_es: 'Convivencia y juegos sin tropiezos, con muebles estables.',
        condicional: 'opcional',
        fase: 1,
        imagemUrl: null,
    },
    {
        id: 'copa',
        nome: 'Copa',
        nome_en: 'Dining Area',
        nome_es: 'Comedor',
        emoji: '🍽️', icone: 'ForkKnife',
        iconName: 'Reserve',
        cor: '#F4A460',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Cuidado com toalhas compridas e líquidos quentes.',
        descricao_en: 'Beware of long tablecloths and hot liquids.',
        descricao_es: 'Cuidado con manteles largos y líquidos calientes.',
        condicional: 'opcional',
        fase: 3,
        imagemUrl: null,
    },
    {
        id: 'cozinha',
        nome: 'Cozinha',
        nome_en: 'Kitchen',
        nome_es: 'Cocina',
        emoji: '🍳', icone: 'CookingPot',
        iconName: 'Kitchen',
        cor: '#FF6B6B',
        prioridade: 'Máxima',
        prioridade_en: 'Maximum',
        prioridade_es: 'Máxima',
        descricao: 'Um dos cômodos com mais riscos da casa: queimaduras e cortes.',
        descricao_en: 'One of the riskiest rooms in the house: burns and cuts.',
        descricao_es: 'Una de las estancias con más riesgos de la casa: quemaduras y cortes.',
        descricao_ptpt: 'Uma das divisões da casa com mais riscos: queimaduras e cortes.',
        condicional: 'opcional',
        fase: 1,
        imagemUrl: null,
    },
    {
        id: 'quarto_bebe',
        nome: 'Quarto do Bebê',
        nome_en: 'Baby\'s Room',
        nome_es: 'Habitación del Bebé',
        emoji: '👶', icone: 'Baby',
        iconName: 'BabyCrib',
        cor: '#95E1D3',
        prioridade: 'Máxima',
        prioridade_en: 'Maximum',
        prioridade_es: 'Máxima',
        descricao: 'Sono seguro: prevenção de sufocamento e quedas.',
        descricao_en: 'Safe sleep: preventing suffocation and falls.',
        descricao_es: 'Sueño seguro: prevención de asfixia y caídas.',
        condicional: 'bebe',
        fase: 1,
        imagemUrl: null,
    },
    {
        id: 'quarto_crianca',
        nome: 'Quarto da Criança',
        nome_en: 'Child\'s Room',
        nome_es: 'Habitación del Niño',
        emoji: '👧', icone: 'BabyCrib',
        iconName: 'BabyCrib',
        cor: '#FFB6C1',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Brinquedos seguros, janelas protegidas e móveis fixos.',
        descricao_en: 'Safe toys, protected windows and fixed furniture.',
        descricao_es: 'Juguetes seguros, ventanas protegidas y muebles fijos.',
        condicional: 'crianca',
        fase: 2,
    },
    {
        id: 'quarto_adulto',
        nome: 'Quarto de Adulto',
        nome_en: 'Adult Bedroom',
        nome_es: 'Dormitorio de Adulto',
        emoji: '👨', icone: 'Bed',
        iconName: 'User',
        cor: '#B0C4DE',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Medicamentos guardados com segurança e ambiente de descanso.',
        descricao_en: 'Medicines stored safely and a restful room.',
        descricao_es: 'Medicamentos guardados con seguridad y un ambiente de descanso.',
        fase: 2,
    },
    {
        id: 'quarto_idoso',
        nome: 'Quarto do Idoso',
        nome_en: 'Elderly\'s Room',
        nome_es: 'Habitación del Adulto Mayor',
        emoji: '👴', icone: 'Elderly',
        iconName: 'Elder',
        cor: '#F38181',
        prioridade: 'Máxima',
        prioridade_en: 'Maximum',
        prioridade_es: 'Máxima',
        descricao: 'Autonomia sem barreiras e prevenção de quedas.',
        descricao_en: 'Independence without barriers and fall prevention.',
        descricao_es: 'Autonomía sin barreras y prevención de caídas.',
        condicional: 'idoso',
        fase: 1,
        imagemUrl: null,
    },
    {
        id: 'banheiro',
        nome: 'Banheiro',
        nome_en: 'Bathroom',
        nome_es: 'Baño',
        emoji: '🚿', icone: 'Shower',
        iconName: 'Bathroom',
        cor: '#4ECDC4',
        prioridade: 'Máxima',
        prioridade_en: 'Maximum',
        prioridade_es: 'Máxima',
        descricao: 'Atenção a quedas, choque elétrico e afogamento.',
        descricao_en: 'Watch out for falls, electric shock and drowning.',
        descricao_es: 'Atención a caídas, descargas eléctricas y ahogamiento.',
        condicional: 'opcional',
        fase: 1,
        imagemUrl: null,
    },
    {
        id: 'escadas',
        nome: 'Escadas',
        nome_en: 'Stairs',
        nome_es: 'Escaleras',
        emoji: '🪜', icone: 'Stairs',
        iconName: 'Stairs',
        cor: '#FF5252',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Degraus visíveis, corrimão firme e portões para proteção.',
        descricao_en: 'Visible steps, firm handrails and safety gates.',
        descricao_es: 'Escalones visibles, pasamanos firme y puertas de protección.',
        condicional: 'opcional',
        fase: 1,
    },
    {
        id: 'area_servico',
        nome: 'Lavanderia / Área de Serviço',
        nome_en: 'Laundry / Utility Room',
        nome_es: 'Lavandería / Área de Servicio',
        emoji: '🧺', icone: 'WashingMachine',
        iconName: 'WashingMachine',
        cor: '#A8E6CF',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Produtos químicos no alto e baldes vazios. Área de serviço organizada e segura.',
        descricao_en: 'Chemicals stored high and buckets kept empty. A tidy, safe utility area.',
        descricao_es: 'Productos químicos en alto y cubetas vacías. Zona de lavado ordenada y segura.',
        descricao_ptpt: 'Produtos químicos no alto e baldes vazios. Lavandaria arrumada e segura.',
        condicional: 'opcional',
        fase: 2,
        imagemUrl: null,
    },
    {
        id: 'despensa',
        nome: 'Despensa',
        nome_en: 'Pantry',
        nome_es: 'Despensa',
        emoji: '📦', icone: 'Package',
        iconName: 'Box',
        cor: '#FFB300',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Organização ajuda a evitar quedas e a atração de roedores.',
        descricao_en: 'Good organization helps prevent falls and avoid attracting rodents.',
        descricao_es: 'La organización ayuda a evitar caídas y a no atraer roedores.',
        condicional: 'opcional',
        fase: 3,
    },
    {
        id: 'varanda',
        nome: 'Varanda/Sacada',
        nome_en: 'Balcony/Porch',
        nome_es: 'Balcón/Terraza',
        emoji: '🪴', icone: 'PottedPlant',
        iconName: 'Home2',
        cor: '#00B0FF',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Redes de proteção íntegras e piso antiderrapante.',
        descricao_en: 'Intact safety nets and non-slip flooring.',
        descricao_es: 'Redes de protección íntegras y piso antideslizante.',
        condicional: 'opcional',
        fase: 3,
        imagemUrl: null,
    },
    {
        id: 'garagem',
        nome: 'Garagem',
        nome_en: 'Garage',
        nome_es: 'Garaje',
        emoji: '🚗', icone: 'Car',
        iconName: 'Car',
        cor: '#778899',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Atenção a manobras, pontos cegos e monóxido de carbono.',
        descricao_en: 'Watch for maneuvers, blind spots and carbon monoxide.',
        descricao_es: 'Atención a maniobras, puntos ciegos y monóxido de carbono.',
        condicional: 'opcional',
        fase: 3,
        imagemUrl: null,
    },
    {
        id: 'quintal',
        nome: 'Quintal',
        nome_en: 'Backyard',
        nome_es: 'Patio',
        emoji: '🌳', icone: 'Tree',
        iconName: 'Tree',
        cor: '#87CEEB',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Livre de entulhos e animais peçonhentos.',
        descricao_en: 'Free from debris and venomous animals.',
        descricao_es: 'Libre de escombros y animales venenosos.',
        condicional: 'opcional',
        fase: 2,
    },
    {
        id: 'jardim_horta',
        nome: 'Jardim e Jardinagem',
        nome_en: 'Garden & Gardening',
        nome_es: 'Jardín y Jardinería',
        emoji: '🌻', icone: 'Flower',
        iconName: 'Tree',
        cor: '#8BC34A',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Cuidado com plantas tóxicas e ferramentas de poda.',
        descricao_en: 'Beware of toxic plants and pruning tools.',
        descricao_es: 'Cuidado con plantas tóxicas y herramientas de poda.',
        condicional: 'opcional',
        fase: 2,
    },
    {
        id: 'piscina',
        nome: 'Piscina',
        nome_en: 'Swimming Pool',
        nome_es: 'Piscina',
        emoji: '🏊', icone: 'SwimmingPool',
        iconName: 'Pool',
        cor: '#00CED1',
        prioridade: 'Máxima',
        prioridade_en: 'Maximum',
        prioridade_es: 'Máxima',
        descricao: 'Barreiras físicas e supervisão visual constante.',
        descricao_en: 'Physical barriers and constant visual supervision.',
        descricao_es: 'Barreras físicas y supervisión visual constante.',
        condicional: 'opcional',
        fase: 2,
        imagemUrl: null,
    },
    {
        id: 'parquinho',
        nome: 'Parquinho / Playground',
        nome_en: 'Playground',
        nome_es: 'Parque Infantil',
        emoji: '🎠', icone: 'Confetti',
        iconName: 'Shapes',
        cor: '#00E676',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Manutenção de brinquedos e supervisão atenta.',
        descricao_en: 'Toy maintenance and attentive supervision.',
        descricao_es: 'Mantenimiento de juguetes y supervisión atenta.',
        condicional: 'opcional',
        fase: 2,
    },
    {
        id: 'oficina',
        nome: 'Oficina / Ateliê',
        nome_en: 'Workshop / Studio',
        nome_es: 'Taller / Estudio',
        emoji: '🛠️', icone: 'Toolbox',
        iconName: 'Setting2',
        cor: '#7E57C2',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Ferramentas afiadas longe de crianças. Ventilação e iluminação adequadas.',
        descricao_en: 'Sharp tools away from children. Good ventilation and lighting.',
        descricao_es: 'Herramientas afiladas lejos de los niños. Ventilación e iluminación adecuadas.',
        condicional: 'opcional',
        fase: 3,
        imagemUrl: null,
    },
    {
        id: 'deposito',
        nome: 'Depósito / Bagunça',
        nome_en: 'Storage / Clutter',
        nome_es: 'Depósito / Trastero',
        emoji: '🗄️', icone: 'Archive',
        iconName: 'FolderOpen',
        cor: '#BC8F8F',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Organização reduz os abrigos de aranhas e escorpiões.',
        descricao_en: 'Good organization reduces hiding places for spiders and scorpions.',
        descricao_es: 'La organización reduce los refugios de arañas y escorpiones.',
        condicional: 'opcional',
        fase: 3,
    },
    {
        id: 'sotao',
        nome: 'Sótão',
        nome_en: 'Attic',
        nome_es: 'Ático',
        emoji: '🪜', icone: 'Ladder',
        iconName: 'Building',
        cor: '#A1887F', // Brownish
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Atenção especial a goteiras, cupins e ventilação térmica.',
        descricao_en: 'Special attention to leaks, termites and thermal ventilation.',
        descricao_es: 'Atención especial a goteras, termitas y ventilación térmica.',
        condicional: 'opcional',
        fase: 3,
    },
    {
        id: 'porao',
        nome: 'Porão',
        nome_en: 'Basement',
        nome_es: 'Sótano',
        emoji: '🔦', icone: 'Flashlight',
        iconName: 'Home2',
        cor: '#5D4037', // Dark Brown
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Atenção a umidade, mofo e falta de ventilação.',
        descricao_en: 'Watch out for damp, mold and poor ventilation.',
        descricao_es: 'Atención a la humedad, el moho y la falta de ventilación.',
        descricao_ptpt: 'Atenção à humidade, ao bolor e à falta de ventilação.',
        condicional: 'opcional',
        fase: 3,
    },
    {
        id: 'canil',
        nome: 'Área do Pet',
        nome_en: 'Pet Area',
        nome_es: 'Área de Mascotas',
        emoji: '🐶', icone: 'Dog',
        iconName: 'Pet',
        cor: '#FFB74D',
        prioridade: 'Média',
        prioridade_en: 'Medium',
        prioridade_es: 'Media',
        descricao: 'Sem carrapaticidas expostos. Abrigo seguro.',
        descricao_en: 'No exposed tick treatments. Safe shelter.',
        descricao_es: 'Sin garrapaticidas expuestos. Refugio seguro.',
        condicional: 'opcional',
        fase: 3,
        imagemUrl: null,
    },
    {
        id: 'central_gas',
        nome: 'Central de Gás',
        nome_en: 'Gas Central',
        nome_es: 'Central de Gas',
        emoji: '🔥', icone: 'Fire',
        iconName: 'Danger',
        cor: '#FF9800',
        prioridade: 'Alta',
        prioridade_en: 'High',
        prioridade_es: 'Alta',
        descricao: 'Ventilação e validade de mangueira e regulador, para prevenir vazamentos.',
        descricao_en: 'Ventilation and in-date hoses and regulators, to help prevent leaks.',
        descricao_es: 'Ventilación y mangueras y reguladores vigentes, para prevenir fugas.',
        descricao_ptpt: 'Ventilação e validade do tubo e do redutor, para prevenir fugas.',
        condicional: 'opcional', // Para casas
        fase: 2,
    },
    {
        id: 'ambiente_integrado',
        nome: 'Área Integrada (Studio / Loft / Kitnet)',
        nome_en: 'Integrated Area (Studio / Loft / Kitchenette)',
        nome_es: 'Área Integrada (Estudio / Loft / Monoambiente)',
        nome_ptpt: 'Área Integrada (Estúdio / Loft / Kitchenette)',
        emoji: '🏢', icone: 'Buildings',
        iconName: 'Box',
        cor: '#95A5A6',
        prioridade: 'Máxima',
        prioridade_en: 'Maximum',
        prioridade_es: 'Máxima',
        descricao: 'Quarto, sala e cozinha integrados sem divisórias físicas.',
        descricao_en: 'Bedroom, living room, and kitchen integrated without physical walls.',
        descricao_es: 'Dormitorio, sala y cocina integrados sin paredes divisorias.',
        descricao_ptpt: 'Quarto, sala e cozinha integrados sem divisórias físicas.',
        condicional: 'opcional',
        fase: 1,
    },
];

/**
 * Utilitário para hidratar itens antigos de checklist salvos no dispositivo.
 * Busca o título original em português na estrutura CHECKLISTS para
 * resgatar as propriedades de idioma (titulo_en, titulo_es).
 */
export const hydrateChecklistItem = (savedItem) => {
    if (!savedItem || !savedItem.titulo) return savedItem;
    // Se já tiver traduções, não precisa buscar
    if (savedItem.titulo_en || savedItem.titulo_es) return savedItem;

    // Busca nas Fases 1 a 4
    for (const ambKey of Object.keys(CHECKLISTS)) {
        const amb = CHECKLISTS[ambKey];
        if (amb.categorias) {
            for (const cat of amb.categorias) {
                if (cat.itens) {
                    const found = cat.itens.find(i => i.titulo === savedItem.titulo);
                    if (found) {
                        return { ...savedItem, titulo_en: found.titulo_en, titulo_es: found.titulo_es };
                    }
                }
            }
        }
    }
    return savedItem;
};

/**
 * Titulos que um item JA TEVE, por id. A resposta da vistoria e gravada pelo
 * `id` do item; antes era gravada pelo texto do titulo, e cada revisao de texto
 * apagava em silencio o que o usuario tinha respondido (D18). Este mapa deixa a
 * migracao em ChecklistService reconhecer respostas gravadas com o texto antigo.
 *
 * Ao reescrever o `titulo` de um item, o texto anterior NAO precisa vir para ca:
 * o id ja segura a resposta. So entra aqui texto anterior ao id (out/2026).
 */
export const TITULOS_ANTERIORES = {
    ambiente_integrado_03: ['Produtos de limpeza e químicos guardados em armários altos ou com trava'],
    canil_04: ['Produtos carrapaticidas, venenos e químicos de limpeza ficam completamente inacessíveis ao animal'],
    jardim_horta_08: ['Uso padronizado de proteção ocular ao manipular químicos em spray ou galhos finos'],
    despensa_01: ['Alimentos guardados longe de produtos de limpeza e químicos'],
    cozinha_18: ['Químicos não são transferidos para embalagens de alimentos (garrafa pet, potes)'],
    sala_08: ['Janelas e basculantes possuem redes de proteção garantida'],
    quarto_crianca_08: ['Janelas do quarto possuem redes de proteção garantidas'],
    quarto_crianca_01: ['Brinquedos possuem o selo de certificação do Inmetro', 'Brinquedos possuem {{CERT_SEAL}}'],
};

// Cada item tem `id` fixo (`<ambiente>_<nn>`). NUNCA renumere nem reaproveite
// um id: a resposta do usuario esta gravada nele. Item novo recebe o proximo
// numero livre do ambiente; item removido leva o id junto.
export const CHECKLISTS = {

    ambiente_integrado: {
        categorias: [
            {
                nome: 'Cozinha e Equipamentos',
                nome_en: 'Kitchen and Equipment',
                nome_es: 'Cocina y Equipos',
                nome_ptpt: 'Cozinha e Equipamentos',
                emoji: '🍳', icone: 'CookingPot',
                itens: [
                    { id: 'ambiente_integrado_01', titulo: 'Cabos das panelas estão sempre virados para o interior do fogão?', titulo_en: 'Are pot handles always turned towards the inside of the stove?', titulo_es: '¿Los mangos de las ollas están siempre girados hacia el interior de la estufa?', tipo: 'perigo', tags: ['queimadura', 'básico'] },
                    { id: 'ambiente_integrado_02', titulo: 'Mangueira e regulador de gás dentro da validade (5 anos)', titulo_en: 'Gas hose and regulator within validity (5 years)', titulo_es: 'Manguera y regulador de gas dentro de la validez (5 años)', titulo_ptpt: 'Mangueira e redutor de gás dentro da validade (5 anos)', tipo: 'perigo', tags: ['explosão', 'gás'] },
                    { id: 'ambiente_integrado_03', titulo: 'Produtos de limpeza e outros produtos químicos guardados em armários altos ou com trava', titulo_en: 'Cleaning products and chemicals stored in high cabinets or with safety locks', titulo_es: 'Productos de limpieza y otros productos químicos guardados en gabinetes altos o con cerradura de seguridad', titulo_ptpt: 'Produtos de limpeza e outros produtos químicos guardados em armários altos ou com fecho de segurança', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'ambiente_integrado_04', titulo: 'Facas e ferramentas de corte guardadas de forma segura e inacessíveis a crianças e pets', titulo_en: 'Knives and cutting tools stored safely and inaccessible to children/pets', titulo_es: 'Cuchillos y herramientas de corte guardados de forma segura e inaccesibles para niños/mascotas', titulo_ptpt: 'Facas e ferramentas de corte guardadas de forma segura e inacessíveis a crianças/animais', tipo: 'perigo', tags: ['corte', 'crianças'] }
                ]
            },
            {
                nome: 'Estar e Layout',
                nome_en: 'Living and Layout',
                nome_es: 'Sala y Diseño',
                nome_ptpt: 'Estar e Layout',
                emoji: '🛋️', icone: 'Armchair',
                itens: [
                    { id: 'ambiente_integrado_05', titulo: 'TVs, estantes ou móveis altos fixados na parede (antitombamento)', titulo_en: 'TVs, shelving units or tall furniture secured to the wall (anti-tip)', titulo_es: 'Televisores, estanterías o muebles altos fijados a la pared (antivuelco)', titulo_ptpt: 'TVs, estantes ou móveis altos fixados na parede (anti-queda)', tipo: 'perigo', tags: ['tombamento'] },
                    { id: 'ambiente_integrado_06', titulo: 'Tapetes soltos removidos ou devidamente fixados com fita dupla face', titulo_en: 'Loose rugs removed or properly secured with double-sided tape', titulo_es: 'Alfombras sueltas retiradas o debidamente fijadas con cinta de doble cara', titulo_ptpt: 'Tapetes soltos removidos ou devidamente fixados com fita de dupla face', tipo: 'perigo', tags: ['queda'] },
                    { id: 'ambiente_integrado_07', titulo: 'Janelas e basculantes possuem redes de proteção seguras e sem frestas', titulo_en: 'Windows and transoms have secure safety nets with no gaps', titulo_es: 'Ventanas y tragaluces tienen redes de protección seguras y sin aberturas', titulo_ptpt: 'Janelas e basculantes têm redes de proteção seguras e sem frestas', tipo: 'perigo', tags: ['queda'] },
                    { id: 'ambiente_integrado_08', titulo: 'Fios e cabos elétricos organizados e protegidos contra tropeços e mordidas', titulo_en: 'Electrical wires and cables organized and protected against trips and chewing', titulo_es: 'Cables y cables eléctricos organizados y protegidos contra tropiezos y mordeduras', titulo_ptpt: 'Fios e cabos elétricos organizados e protegidos contra tropeços e trincas/mordidas', tipo: 'normal', tags: ['tropeço'] }
                ]
            },
            {
                nome: 'Dormitório e Objetos',
                nome_en: 'Bedroom and Objects',
                nome_es: 'Dormitorio y Objetos',
                nome_ptpt: 'Dormitório e Objetos',
                emoji: '🛌', icone: 'Bed',
                itens: [
                    { id: 'ambiente_integrado_09', titulo: 'Medicamentos e cosméticos trancados em gavetas ou totalmente fora do alcance', titulo_en: 'Medicines and cosmetics locked in drawers or completely out of reach', titulo_es: 'Medicamentos y cosméticos bajo llave en cajones o totalmente fuera del alcance', titulo_ptpt: 'Medicamentos e cosméticos trancados em gavetas ou totalmente fora do alcance', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'ambiente_integrado_10', titulo: 'O carregador do celular fica desligado da tomada quando não está em uso', titulo_en: 'Phone charger is unplugged when not in use', titulo_es: 'El cargador del celular se desenchufa cuando no está en uso', titulo_ptpt: 'O carregador do telemóvel fica desligado da tomada quando não está a ser utilizado', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'ambiente_integrado_11', titulo: 'Objetos cortantes e pontiagudos guardados de forma segura e fechada', titulo_en: 'Sharp and pointed objects stored in a safe and closed manner', titulo_es: 'Objetos cortantes y puntiagudos guardados de forma segura y cerrada', titulo_ptpt: 'Objetos cortantes e pontiagudos guardados de forma segura e fechada', tipo: 'normal', tags: ['corte'] }
                ]
            }
        ]
    },

    // === FASE 1 ===
    cozinha: {
        categorias: [
            {
                nome: 'Prevenção de Queimaduras e Equipamentos Térmicos', nome_en: 'Burn Prevention and Thermal Equipment', nome_es: 'Prevención de Quemaduras y Equipos Térmicos',
                emoji: '🔥', icone: 'Fire',
                itens: [
                    { id: 'cozinha_01', titulo: 'Cabos das panelas estão sempre virados para o interior do fogão?', titulo_en: 'Are pot handles always turned towards the inside of the stove?', titulo_es: '¿Los mangos de las ollas están siempre girados hacia el interior de la estufa?', tipo: 'perigo', tags: ['queimadura', 'básico'] },
                    { id: 'cozinha_02', titulo: 'Você prioriza as bocas traseiras do fogão durante o uso?', titulo_en: 'Do you favor the back burners when using the stove?', titulo_es: '¿Prioriza los quemadores traseros de la estufa durante el uso?', tipo: 'sugestão', tags: ['prevenção'] },
                    { id: 'cozinha_03', titulo: 'A porta do forno possui trava de segurança funcional?', titulo_en: 'Does the oven door have a functional safety lock?', titulo_es: '¿La puerta del horno tiene un cierre de seguridad funcional?', tipo: 'perigo', tags: ['crianças'] },
                    { id: 'cozinha_04', titulo: 'Eletroportáteis que geram calor extremo (AirFryer, Forno Elétrico, Torradeira) são deixados para esfriar fora do alcance infantil antes de serem guardados?', titulo_en: 'Are heat-generating appliances (AirFryer, Electric Oven, Toaster) left to cool out of children\'s reach before being stored?', titulo_es: '¿Los electrodomésticos que generan calor extremo (AirFryer, Horno Eléctrico, Tostadora) se dejan enfriar fuera del alcance de los niños antes de guardarlos?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                    { id: 'cozinha_05', titulo: 'Os cabos de airfryers ou fornos não ficam soltos ou pendurados para fora da bancada durante o uso, evitando que crianças os alcancem?', titulo_en: 'Are air fryer and oven cords kept from hanging loose off the counter during use, out of children\'s reach?', titulo_es: '¿Los cables de las freidoras de aire o los hornos no quedan sueltos ni colgando fuera de la encimera durante el uso, para que los niños no los alcancen?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                    { id: 'cozinha_06', titulo: 'As toalhas de mesa são curtas (evitando puxões e derramamento de líquidos quentes)?', titulo_en: 'Are tablecloths short (avoiding pulls and spills of hot liquids)?', titulo_es: '¿Los manteles son cortos (evitando tirones y derrames de líquidos calientes)?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                    { id: 'cozinha_07', titulo: 'Luvas térmicas estão em local visível e de fácil acesso?', titulo_en: 'Are oven mitts in a visible and easily accessible location?', titulo_es: '¿Los guantes térmicos están en un lugar visible y de fácil acceso?', tipo: 'normal', tags: ['segurança'] },
                    { id: 'cozinha_19', titulo: 'Botões do fogão têm trava, ou o registro de gás fica fechado, quando não há um adulto na cozinha', titulo_en: 'Stove knobs have locks or covers, or the gas valve is kept closed, when no adult is in the kitchen', titulo_es: 'Los mandos de la cocina tienen traba, o la llave del gas queda cerrada, cuando no hay un adulto en la cocina', titulo_ptpt: 'Os botões do fogão têm trava, ou a válvula do gás fica fechada, quando não há um adulto na cozinha', tipo: 'perigo', tags: ['neurodivergente', 'queimadura', 'incêndio'] },
                ],
            },
            {
                nome: 'Gás e Prevenção de Incêndio', nome_en: 'Gas and Fire Prevention', nome_es: 'Gas y Prevención de Incendios',
                emoji: '🧯', icone: 'FireExtinguisher',
                itens: [
                    { id: 'cozinha_08', titulo: 'Mangueira e regulador de gás dentro da validade (5 anos)', titulo_en: 'Gas hose and regulator within validity (5 years)', titulo_es: 'Manguera y regulador de gas dentro de la validez (5 años)', tipo: 'perigo', tags: ['explosão', 'gás'] },
                    { id: 'cozinha_09', titulo: 'Mangueira de gás em perfeito estado, sem rachaduras', titulo_en: 'Gas hose in perfect condition, no cracks', titulo_es: 'Manguera de gas en perfecto estado, sin grietas', tipo: 'perigo', tags: ['explosão', 'vazamento'] },
                    { id: 'cozinha_10', titulo: 'Válvula foi testada com espuma de sabão (nunca com fogo)', titulo_en: 'Valve was tested with soap foam (never with fire)', titulo_es: 'La válvula fue probada con espuma de jabón (nunca con fuego)', tipo: 'normal', tags: ['manutenção'] },
                    { id: 'cozinha_11', titulo: 'Existe um extintor de incêndio (ABC) acessível na casa', titulo_en: 'There is a fire extinguisher (ABC) accessible in the house', titulo_es: 'Hay un extintor de incendios (ABC) accesible en la casa', tipo: 'sugestão', tags: ['incêndio', 'expert'] },
                    { id: 'cozinha_12', titulo: 'Registro de gás é fechado à noite ou ao sair', titulo_en: 'Gas valve is closed at night or when leaving', titulo_es: 'El registro de gas está cerrado por la noche o al salir', tipo: 'sugestão', tags: ['prevenção'] },
                ],
            },
            {
                nome: 'Lâminas, Vidros e Eletroportáteis Rotativos', nome_en: 'Blades, Glass, and Rotating Appliances', nome_es: 'Cuchillas, Vidrio y Electrodomésticos Giratorios',
                emoji: '🔪', icone: 'Knife',
                itens: [
                    { id: 'cozinha_13', titulo: 'Facas e tesouras são guardadas em gavetas altas ou com travas magnéticas', titulo_en: 'Knives and scissors are stored in high drawers or with magnetic locks', titulo_es: 'Los cuchillos y las tijeras se guardan en cajones altos o con cierres magnéticos', tipo: 'perigo', tags: ['corte', 'crianças'] },
                    { id: 'cozinha_14', titulo: 'Vidros e louças quebradas são descartados em caixas rígidas (ex: leite) antes do lixo', titulo_en: 'Broken glass and crockery are wrapped in rigid cartons (e.g. milk cartons) before going in the bin', titulo_es: 'Los vidrios y la vajilla rota se desechan en cajas rígidas (ej.: de leche) antes de tirarlos a la basura', tipo: 'normal', tags: ['corte'] },
                    { id: 'cozinha_15', titulo: 'Equipamentos perfurocortantes (lâminas de liquidificador, processadores, facas elétricas) estão desmontados ou trancados fora do alcance infantil?', titulo_en: 'Are sharp equipment (blender blades, processors, electric knives) disassembled or locked out of children\'s reach?', titulo_es: '¿Están desarmados o bajo llave fuera del alcance de los niños los equipos cortopunzantes (cuchillas de licuadora, procesadores, cuchillos eléctricos)?', tipo: 'perigo', tags: ['corte', 'crianças'] },
                    { id: 'cozinha_16', titulo: 'Equipamentos rotativos pesados (batedeiras planetárias, mixers) estão guardados desligados da tomada e longe da beirada das pias?', titulo_en: 'Are heavy rotating equipment (stand mixers, blenders) stored unplugged and away from the edge of sinks?', titulo_es: '¿Los equipos rotativos pesados (batidoras de pie, licuadoras) están guardados desenchufados y lejos del borde de los fregaderos?', tipo: 'perigo', tags: ['impacto', 'crianças', 'choque'] },
                ],
            },
            {
                nome: 'Produtos Químicos', nome_en: 'Chemicals', nome_es: 'Productos Químicos',
                emoji: '☠️', icone: 'Skull',
                itens: [
                    { id: 'cozinha_17', titulo: 'Produtos de limpeza em armários altos ou com trava magnética', titulo_en: 'Cleaning products in high cabinets or with magnetic lock', titulo_es: 'Productos de limpieza en gabinetes altos o con cerradura magnética', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'cozinha_18', titulo: 'Produtos químicos não são transferidos para embalagens de alimentos (garrafa pet, potes)', titulo_en: 'Chemicals are not transferred to food packaging (PET bottles, jars)', titulo_es: 'Los productos químicos no se transfieren a envases de alimentos (botellas PET, frascos)', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'cozinha_20', titulo: 'Produtos de limpeza e remédios têm etiqueta em letra grande, relevo ou cor que os diferencie — para não serem confundidos', titulo_en: 'Cleaning products and medicines have large-print, raised or colour-coded labels so they are not mixed up', titulo_es: 'Productos de limpieza y medicamentos con etiqueta en letra grande, en relieve o de un color que los distinga, para no confundirlos', titulo_ptpt: 'Os produtos de limpeza e os medicamentos têm etiqueta em letra grande, relevo ou cor que os distinga — para não serem confundidos', tipo: 'perigo', tags: ['deficiencia_visual', 'intoxicação'] },
                ],
            },
        ],
    },

    banheiro: {
        categorias: [
            {
                nome: 'Prevenção de Quedas', nome_en: 'Fall Prevention', nome_es: 'Prevención de Caídas',
                emoji: '👣', icone: 'Footprints',
                itens: [
                    { id: 'banheiro_01', titulo: 'O box tem piso ou tapete de borracha antiderrapante', titulo_en: 'Shower floor is non-slip or has a non-slip rubber mat', titulo_es: 'La ducha tiene piso o alfombra de goma antideslizante', titulo_ptpt: 'A base do duche é antiderrapante ou tem tapete de borracha antiderrapante', tipo: 'perigo', tags: ['queda'] },
                    { id: 'banheiro_02', titulo: 'Barras de apoio instaladas dentro do box e ao lado do vaso', titulo_en: 'Grab bars installed inside the shower and next to the toilet', titulo_es: 'Barras de apoyo instaladas dentro de la ducha y junto al inodoro', tipo: 'sugestão', tags: ['idosos', 'acessibilidade'] },
                    { id: 'banheiro_11', titulo: 'Banco ou cadeira de banho firme e antiderrapante, para tomar banho sentado', titulo_en: 'A sturdy, non-slip shower bench or chair, for showering seated', titulo_es: 'Banco o silla de ducha firme y antideslizante, para ducharse sentado', titulo_ptpt: 'Banco ou cadeira de duche firme e antiderrapante, para tomar banho sentado', tipo: 'perigo', tags: ['mobilidade_pessoa', 'queda'] },
                    { id: 'banheiro_03', titulo: 'Piso fora do box é mantido seco após o uso', titulo_en: 'Floor outside the shower is kept dry after use', titulo_es: 'El piso fuera de la ducha se mantiene seco después de su uso', tipo: 'normal', tags: ['queda'] },
                ],
            },
            {
                nome: 'Segurança Geral', nome_en: 'General Safety', nome_es: 'Seguridad General',
                emoji: '🛡️', icone: 'ShieldCheck',
                itens: [
                    { id: 'banheiro_04', titulo: 'Baldes e bacias são guardados vazios e virados para baixo?', titulo_en: 'Are buckets and basins stored empty and turned upside down?', titulo_es: '¿Se guardan los cubos y palanganas vacíos y boca abajo?', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'banheiro_05', titulo: 'O box é de vidro temperado e possui película de segurança?', titulo_en: 'Is the shower enclosure made of tempered glass and has a safety film?', titulo_es: '¿La mampara es de vidrio templado y tiene una película de seguridad?', tipo: 'normal', tags: ['corte'] },
                    { id: 'banheiro_06', titulo: 'Medicamentos e lâminas estão trancados ou fora da vista e do alcance?', titulo_en: 'Are medicines and razors locked away or out of sight and reach?', titulo_es: '¿Los medicamentos y las cuchillas están bajo llave o fuera de la vista y del alcance?', tipo: 'perigo', tags: ['intoxicação', 'corte'] },
                    { id: 'banheiro_10', titulo: 'Porta do banheiro fica fechada por fora quando ninguém está usando — a água atrai, e pouca água basta para afogar', titulo_en: 'Bathroom door is kept closed from the outside when not in use — water attracts, and a little water is enough to drown', titulo_es: 'La puerta del baño queda cerrada por fuera cuando nadie lo usa: el agua atrae, y basta poca agua para ahogarse', titulo_ptpt: 'A porta da casa de banho fica fechada por fora quando ninguém a está a usar — a água atrai, e pouca água basta para afogar', tipo: 'perigo', tags: ['neurodivergente', 'afogamento'] },
                    { id: 'banheiro_07', titulo: 'Eletrodomésticos (secador/chapinha) são retirados da tomada após o uso?', titulo_en: 'Are appliances (hair dryer/straightener) unplugged after use?', titulo_es: '¿Están desenchufados los electrodomésticos (secador/plancha) después de su uso?', tipo: 'perigo', tags: ['choque'] },
                    { id: 'banheiro_08', titulo: 'O sistema de aquecimento a gás está instalado em local com ventilação adequada? A manutenção anual está em dia?', titulo_en: 'Is the gas heating system installed in a well-ventilated area? Is the annual maintenance up to date?', titulo_es: '¿Está instalado el sistema de calefacción a gas en un lugar con ventilación adecuada? ¿El mantenimiento anual está al día?', tipo: 'perigo', tags: ['gás'] },
                    { id: 'banheiro_09', titulo: 'A caixa de areia do pet (gato) está em local de fácil acesso para pets idosos ou com mobilidade reduzida?', titulo_en: 'Is the pet (cat) litter box in an easily accessible location for elderly or mobility-impaired pets?', titulo_es: '¿Está la caja de arena para mascotas (gato) en un lugar de fácil acceso para mascotas mayores o con movilidad reducida?', tipo: 'normal', tags: ['pet_idoso', 'pet_mobilidade'] },
                ],
            },
        ],
    },

    sala: {
        categorias: [
            {
                nome: 'Móveis e Layout', nome_en: 'Furniture and Layout', nome_es: 'Muebles y Diseño',
                emoji: '🛋️', icone: 'Armchair',
                itens: [
                    { id: 'sala_01', titulo: 'TVs e estantes altas fixadas na parede (antitombamento)', titulo_en: 'TVs and tall bookcases fixed to the wall (anti-tip)', titulo_es: 'Televisores y estanterías altas fijadas a la pared (antivuelco)', tipo: 'perigo', tags: ['tombamento'] },
                    { id: 'sala_02', titulo: 'Quinas de mesas e painéis baixos possuem protetores de silicone', titulo_en: 'Table corners and low panels have silicone protectors', titulo_es: 'Las esquinas de mesas y paneles bajos tienen protectores de silicona', tipo: 'normal', tags: ['impacto'] },
                    { id: 'sala_03', titulo: 'Caminho de circulação está totalmente livre de obstáculos', titulo_en: 'Circulation path is completely free of obstacles', titulo_es: 'El camino de circulación está totalmente libre de obstáculos', tipo: 'normal', tags: ['acessibilidade'] },
                    { id: 'sala_04', titulo: 'Tapetes soltos removidos ou fixados com fita dupla face', titulo_en: 'Loose rugs removed or secured with double-sided tape', titulo_es: 'Alfombras sueltas retiradas o fijadas con cinta de doble cara', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sala_05', titulo: 'Existem rampas ou escadinhas para acesso aos móveis altos (sofá) para o pet idoso ou com limitações motoras?', titulo_en: 'Are there ramps or steps to high furniture (sofa) for an older pet or one with limited mobility?', titulo_es: '¿Hay rampas o escalones para acceder a los muebles altos (sofá) para la mascota mayor o con limitaciones motoras?', tipo: 'sugestão', tags: ['pet_idoso', 'pet_mobilidade'] },
                    { id: 'sala_06', titulo: 'Os móveis mantêm uma disposição permanente para facilitar a orientação espacial do pet cego ou com déficit cognitivo?', titulo_en: 'Is the furniture kept in a fixed layout to help a blind or cognitively impaired pet find its way?', titulo_es: '¿Los muebles mantienen una disposición permanente para facilitar la orientación espacial de la mascota ciega o con déficit cognitivo?', tipo: 'normal', tags: ['pet_visao_reduzida', 'disfuncao_cognitiva'] },
                ],
            },
            {
                nome: 'Elétrica e Janelas', nome_en: 'Electrical and Windows', nome_es: 'Eléctrico y Ventanas',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'sala_07', titulo: 'Fios elétricos organizados ou protegidos em canaletas', titulo_en: 'Electrical wires organized or protected in conduits', titulo_es: 'Cables eléctricos organizados o protegidos en canaletas', tipo: 'normal', tags: ['tropeço'] },
                    { id: 'sala_08', titulo: 'Janelas e basculantes possuem redes de proteção instaladas', titulo_en: 'Windows and transoms have safety nets installed', titulo_es: 'Ventanas y tragaluces tienen redes de protección instaladas', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sala_13', titulo: 'Janelas têm trava ou limitador de abertura — quem não percebe a altura pode tentar sair por elas', titulo_en: 'Windows have locks or opening restrictors — someone who does not sense the height may try to climb out', titulo_es: 'Las ventanas tienen traba o limitador de apertura: quien no percibe la altura puede intentar salir por ellas', titulo_ptpt: 'As janelas têm trinco ou limitador de abertura — quem não percebe a altura pode tentar sair por elas', tipo: 'perigo', tags: ['neurodivergente', 'queda'] },
                    { id: 'sala_09', titulo: 'Carregadores de celular fora da tomada se não usados (risco de choque elétrico por mordida e de incêndio)', titulo_en: 'Phone chargers unplugged when not in use (risk of electric shock if bitten, and of fire)', titulo_es: 'Cargadores de celular desenchufados si no se usan (riesgo de descarga eléctrica por mordida y de incendio)', titulo_ptpt: 'Carregadores de telemóvel fora da tomada quando não estão a ser usados (risco de choque elétrico por mordida e de incêndio)', tipo: 'perigo', tags: ['choque'] },
                ],
            },
            {
                nome: 'Objetos Perigosos', nome_en: 'Dangerous Objects', nome_es: 'Objetos Peligrosos',
                emoji: '🍷', icone: 'Wine',
                itens: [
                    { id: 'sala_10', titulo: 'Bebidas alcoólicas trancadas ou fora da vista e do alcance', titulo_en: 'Alcoholic drinks locked away or out of sight and reach', titulo_es: 'Bebidas alcohólicas bajo llave o fuera de la vista y del alcance', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'sala_11', titulo: 'Controles e chaves com pilha tipo botão (portão, alarme, chave do carro) têm a tampa firme, e as pilhas novas e usadas ficam fora do alcance', titulo_en: 'Remotes and key fobs with button batteries (gate, alarm, car key) have a secure cover, and new and used batteries are kept out of reach', titulo_es: 'Los mandos y llaves con pila de botón (portón, alarma, llave del coche) tienen la tapa firme, y las pilas nuevas y usadas están fuera del alcance', titulo_ptpt: 'Comandos e chaves com pilha tipo botão (portão, alarme, chave do carro) têm a tampa firme, e as pilhas novas e usadas ficam fora do alcance', tipo: 'perigo', tags: ['ingestão'] },
                    { id: 'sala_12', titulo: 'Objetos pequenos que não são comida (ímãs, pilhas, sementes, peças) ficam fora do alcance — podem ser engolidos', titulo_en: 'Small non-food items (magnets, batteries, seeds, small parts) are kept out of reach — they may be swallowed', titulo_es: 'Los objetos pequeños que no son comida (imanes, pilas, semillas, piezas) están fuera del alcance: pueden ser tragados', titulo_ptpt: 'Objetos pequenos que não são comida (ímanes, pilhas, sementes, peças) ficam fora do alcance — podem ser engolidos', tipo: 'perigo', tags: ['neurodivergente', 'ingestão', 'asfixia'] },
                ],
            },
        ],
    },

    quarto_bebe: {
        categorias: [
            {
                nome: 'Prevenção de Sufocamento', nome_en: 'Suffocation Prevention', nome_es: 'Prevención de Asfixia',
                emoji: '🛏️', icone: 'Bed',
                itens: [
                    { id: 'quarto_bebe_01', titulo: 'Berço livre de kits, pelúcias, travesseiros e cobertores soltos', titulo_en: 'Crib free of bumpers, stuffed animals, pillows, and loose blankets', titulo_es: 'Cuna libre de protectores, peluches, almohadas y mantas sueltas', tipo: 'perigo', tags: ['sufocamento'] },
                    { id: 'quarto_bebe_02', titulo: 'Colchão do berço firme, sem folgas ou desníveis que permitam prender a criança', titulo_en: 'Firm crib mattress, without gaps or unevenness that could trap the child', titulo_es: 'Colchón de cuna firme, sin espacios ni desniveles que puedan atrapar al niño', tipo: 'normal', tags: ['sufocamento'] },
                    { id: 'quarto_bebe_03', titulo: 'Móbiles retirados caso o bebê já consiga alcançá-los', titulo_en: 'Mobiles removed if the baby can already reach them', titulo_es: 'Móviles retirados si el bebé ya puede alcanzarlos', tipo: 'normal', tags: ['estrangulamento'] },
                ],
            },
            {
                nome: 'Estrutura Segura', nome_en: 'Safe Structure', nome_es: 'Estructura Segura',
                emoji: '🏗️', icone: 'Crane',
                itens: [
                    { id: 'quarto_bebe_04', titulo: 'Grades do berço com espaçamento seguro máximo de 6cm', titulo_en: 'Crib rails with a maximum safe spacing of 6cm', titulo_es: 'Barandas de cuna con un espaciado seguro máximo de 6 cm', tipo: 'perigo', tags: ['aprisionamento'] },
                    { id: 'quarto_bebe_05', titulo: 'Berço afastado de janelas, correntes e persianas de cortinas', titulo_en: 'Crib placed away from windows, drafts, and curtain blinds', titulo_es: 'Cuna alejada de ventanas, corrientes de aire y persianas de cortinas', tipo: 'perigo', tags: ['queda', 'estrangulamento'] },
                    { id: 'quarto_bebe_06', titulo: 'Babá eletrônica instalada, testada e livre do contato do bebê', titulo_en: 'Baby monitor installed, tested, and out of the baby\'s reach', titulo_es: 'Monitor de bebé instalado, probado y fuera del alcance del bebé', tipo: 'sugestão', tags: ['monitoramento'] },
                ],
            },
        ],
    },

    quarto_idoso: {
        categorias: [
            {
                nome: 'Antiqueda & Conforto', nome_en: 'Anti-fall & Comfort', nome_es: 'Anticaídas y Confort',
                emoji: '👵', icone: 'Elderly',
                itens: [
                    { id: 'quarto_idoso_01', titulo: 'Tapetes soltos removidos do quarto', titulo_en: 'Loose rugs removed from the bedroom', titulo_es: 'Alfombras sueltas retiradas del dormitorio', tipo: 'perigo', tags: ['queda'] },
                    { id: 'quarto_idoso_02', titulo: 'Luz noturna ou interruptor acessível direto da cama', titulo_en: 'Night light or switch accessible right from the bed', titulo_es: 'Luz nocturna o interruptor accesible directamente desde la cama', tipo: 'normal', tags: ['visão'] },
                    { id: 'quarto_idoso_03', titulo: 'Altura da cama permite apoiar os pés no chão ao sentar', titulo_en: 'Bed height allows feet to rest on the floor when sitting', titulo_es: 'La altura de la cama permite apoyar los pies en el suelo al sentarse', tipo: 'sugestão', tags: ['mobilidade'] },
                    { id: 'quarto_idoso_04', titulo: 'Colchão firme, não afunda excessivamente nas bordas', titulo_en: 'Firm mattress, doesn\'t sink excessively on the edges', titulo_es: 'Colchón firme, no se hunde excesivamente en los bordes', tipo: 'normal', tags: ['estabilidade'] },
                    { id: 'quarto_idoso_05', titulo: 'Caminho até o banheiro livre de móveis e objetos', titulo_en: 'Path to the bathroom clear of furniture and objects', titulo_es: 'Camino al baño libre de muebles y objetos', titulo_ptpt: 'Caminho até à casa de banho livre de móveis e objetos', tipo: 'perigo', tags: ['acessibilidade'] },
                    { id: 'quarto_idoso_06', titulo: 'Fios de abajures e eletrônicos escondidos, fora da passagem', titulo_en: 'Lamp and electronic wires hidden, out of the way', titulo_es: 'Cables de lámparas y electrónicos ocultos, fuera del paso', tipo: 'normal', tags: ['tropeço'] },
                    { id: 'quarto_idoso_07', titulo: 'Móveis firmes o suficiente para servir de apoio ao caminhar', titulo_en: 'Furniture firm enough to serve as support when walking', titulo_es: 'Muebles lo suficientemente firmes para servir de apoyo al caminar', tipo: 'sugestão', tags: ['apoio'] },
                ],
            },
        ],
    },

    escadas: {
        categorias: [
            {
                nome: 'Estrutura', nome_en: 'Structure', nome_es: 'Estructura',
                emoji: '🪜', icone: 'Ladder',
                itens: [
                    { id: 'escadas_01', titulo: 'Portões de bloqueio (babygates) fixados no topo e na base', titulo_en: 'Safety gates (baby gates) fixed at the top and bottom', titulo_es: 'Puertas de seguridad (babygates) fijadas en la parte superior e inferior', tipo: 'perigo', tags: ['queda', 'crianças'] },
                    { id: 'escadas_02', titulo: 'O acesso às escadas está bloqueado por portão de segurança para evitar quedas do pet com mobilidade ou visão reduzida?', titulo_en: 'Is stairway access blocked by a safety gate to prevent falls for pets with reduced mobility or vision?', titulo_es: '¿El acceso a las escaleras está bloqueado por una puerta de seguridad para evitar caídas de mascotas con movilidad o visión reducida?', tipo: 'perigo', tags: ['pet_pcd', 'pet_visao_reduzida', 'pet_mobilidade', 'pet_idoso', 'disfuncao_cognitiva'] },
                    { id: 'escadas_03', titulo: 'Corrimão instalado dos dois lados e totalmente firme', titulo_en: 'Handrail installed on both sides and completely firm', titulo_es: 'Pasamanos instalado a ambos lados y completamente firme', tipo: 'normal', tags: ['apoio'] },
                    { id: 'escadas_04', titulo: 'Degraus possuem fita antiderrapante fixada', titulo_en: 'Steps have anti-slip tape attached', titulo_es: 'Los escalones tienen cinta antideslizante adherida', tipo: 'normal', tags: ['queda'] },
                    { id: 'escadas_05', titulo: 'Iluminação forte e contínua iluminando todos os degraus', titulo_en: 'Strong, continuous lighting illuminating all steps', titulo_es: 'Iluminación fuerte y continua que ilumina todos los escalones', tipo: 'perigo', tags: ['visão'] },
                    { id: 'escadas_06', titulo: 'Escadas desobstruídas e totalmente livres de objetos nos degraus (sapatos, brinquedos, fios ou decorações)', titulo_en: 'Stairways unobstructed and completely free of objects on the steps (shoes, toys, wires, or decorations)', titulo_es: 'Escaleras despejadas y totalmente libres de objetos en los escalones (zapatos, juguetes, cables o decoraciones)', tipo: 'perigo', tags: ['queda', 'tropeço'] },
                    { id: 'escadas_07', titulo: 'Primeiro e último degrau marcados com faixa de cor contrastante, para quem enxerga pouco', titulo_en: 'First and last steps marked with a contrasting colour strip, for someone with low vision', titulo_es: 'Primer y último escalón marcados con una franja de color contrastante, para quien ve poco', titulo_ptpt: 'Primeiro e último degrau marcados com faixa de cor contrastante, para quem vê mal', tipo: 'perigo', tags: ['deficiencia_visual', 'queda'] },
                    { id: 'escadas_08', titulo: 'Quem tem dificuldade de locomoção não depende da escada no dia a dia (quarto no térreo, cadeira elevatória ou rampa)', titulo_en: 'Someone with mobility difficulties does not depend on the stairs day to day (ground-floor bedroom, stairlift or ramp)', titulo_es: 'Quien tiene dificultad para moverse no depende de la escalera a diario (dormitorio en la planta baja, silla salvaescaleras o rampa)', titulo_ptpt: 'Quem tem dificuldade de locomoção não depende da escada no dia a dia (quarto no rés-do-chão, cadeira elevatória ou rampa)', tipo: 'normal', tags: ['mobilidade_pessoa', 'queda', 'acessibilidade'] },
                ],
            },
        ],
    },

    // === FASE 2 ===
    area_servico: {
        categorias: [
            {
                nome: 'Produtos Químicos', nome_en: 'Chemicals', nome_es: 'Productos Químicos',
                emoji: '☠️', icone: 'Skull',
                itens: [
                    { id: 'area_servico_01', titulo: 'Produtos de limpeza no alto e trancados', titulo_en: 'Cleaning products stored high up and locked', titulo_es: 'Productos de limpieza en alto y bajo llave', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'area_servico_02', titulo: 'Produtos mantidos sempre na embalagem original (nada de garrafa PET)', titulo_en: 'Products always kept in their original packaging (no PET bottles)', titulo_es: 'Productos mantenidos siempre en el envase original (nada de botellas PET)', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'area_servico_03', titulo: 'Inseticidas e solventes isolados preventivamente de alimentos', titulo_en: 'Insecticides and solvents preemptively isolated from food', titulo_es: 'Insecticidas y disolventes aislados preventivamente de los alimentos', tipo: 'normal', tags: ['contaminação'] },
                ],
            },
            {
                nome: 'Máquina e Afogamento', nome_en: 'Washing Machine and Drowning', nome_es: 'Lavadora y Ahogamiento',
                emoji: '🧺', icone: 'Basket',
                itens: [
                    { id: 'area_servico_04', titulo: 'Baldes e bacias mantidos vazios e virados para baixo', titulo_en: 'Buckets and basins kept empty and turned upside down', titulo_es: 'Cubos y palanganas mantenidos vacíos y boca abajo', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'area_servico_05', titulo: 'Tanque mantido permanentemente vazio após o uso', titulo_en: 'Laundry sink kept permanently empty after use', titulo_es: 'Lavadero mantenido permanentemente vacío después de su uso', tipo: 'normal', tags: ['afogamento'] },
                    { id: 'area_servico_06', titulo: 'Máquina de lavar desligada da tomada após o ciclo de uso', titulo_en: 'Washing machine unplugged after the cycle', titulo_es: 'Lavadora desenchufada después del ciclo de uso', tipo: 'sugestão', tags: ['segurança'] },
                    { id: 'area_servico_07', titulo: 'Ferro de passar roupa é desligado e colocado em local alto e seguro para esfriar imediatamente após o uso?', titulo_en: 'Is the iron unplugged and placed in a high, safe place to cool immediately after use?', titulo_es: '¿Se desenchufa la plancha y se coloca en un lugar alto y seguro para que se enfríe inmediatamente después de usarla?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                ],
            },
        ],
    },

    quintal: {
        categorias: [
            {
                nome: 'Limpeza e Fauna', nome_en: 'Cleaning and Fauna', nome_es: 'Limpieza y Fauna',
                emoji: '🦂', icone: 'Bug',
                itens: [
                    { id: 'quintal_01', titulo: 'Quintal livre de entulhos, prevenindo abrigo para escorpiões e aranhas', titulo_en: 'Yard free of debris, preventing shelter for scorpions and spiders', titulo_es: 'Patio libre de escombros, previniendo refugio para escorpiones y arañas', tipo: 'perigo', tags: ['animais_peçonhentos'] },
                    { id: 'quintal_02', titulo: 'Mato mantido baixo e roçado', titulo_en: 'Weeds kept low and trimmed', titulo_es: 'Maleza mantenida baja y desbrozada', tipo: 'normal', tags: ['manutenção'] },
                    { id: 'quintal_03', titulo: 'Inspeção regular contra focos de água parada (Dengue)', titulo_en: 'Regular inspection against stagnant water sources (Dengue)', titulo_es: 'Inspección regular contra focos de agua estancada (Dengue)', tipo: 'perigo', tags: ['saúde'] },
                ],
            },
            {
                nome: 'Estrutura', nome_en: 'Structure', nome_es: 'Estructura',
                emoji: '🧱', icone: 'Wall',
                itens: [
                    { id: 'quintal_04', titulo: 'Piso plano, sem buracos ou desníveis escondidos pela grama ou por folhas', titulo_en: 'Flat ground, with no holes or dips hidden by grass or leaves', titulo_es: 'Suelo plano, sin agujeros ni desniveles ocultos por el césped o las hojas', titulo_ptpt: 'Chão plano, sem buracos ou desníveis escondidos pela relva ou por folhas', tipo: 'normal', tags: ['queda'] },
                    { id: 'quintal_05', titulo: 'Iluminação adequada nos acessos com sensores de movimento', titulo_en: 'Adequate lighting at access points with motion sensors', titulo_es: 'Iluminación adecuada en los accesos con sensores de movimiento', tipo: 'sugestão', tags: ['segurança'] },
                    { id: 'quintal_06', titulo: 'Ralos possuem tampas rotativas (abre/fecha) contra insetos', titulo_en: 'Drains have rotating (open/close) covers against insects', titulo_es: 'Los desagües tienen tapas giratorias (abrir/cerrar) contra insectos', tipo: 'sugestão', tags: ['pragas'] },
                ],
            },
        ],
    },

    parquinho: {
        categorias: [
            {
                nome: 'Brinquedos e Estrutura', nome_en: 'Toys and Structure', nome_es: 'Juguetes y Estructura',
                emoji: 'seesaw',
                itens: [
                    { id: 'parquinho_01', titulo: 'Brinquedos livres de ferrugem, lascas de madeira ou pontas vivas', titulo_en: 'Toys free of rust, wood splinters, or sharp edges', titulo_es: 'Juguetes libres de óxido, astillas de madera o bordes afilados', tipo: 'perigo', tags: ['corte', 'tétano'] },
                    { id: 'parquinho_02', titulo: 'Assentos de balanços e correntes firmes e submetidos a revisões periódicas', titulo_en: 'Swing seats and chains firm and subjected to periodic checks', titulo_es: 'Asientos de columpios y cadenas firmes y sujetos a revisiones periódicas', tipo: 'perigo', tags: ['queda'] },
                    { id: 'parquinho_03', titulo: 'Piso com superfície macia que absorve impacto (areia, grama grossa, borracha)', titulo_en: 'Floor with a soft, impact-absorbing surface (sand, thick grass, rubber)', titulo_es: 'Piso con superficie suave que absorbe impactos (arena, césped grueso, goma)', tipo: 'normal', tags: ['queda'] },
                ],
            },
            {
                nome: 'Comportamento Seguro', nome_en: 'Safe Behavior', nome_es: 'Comportamiento Seguro',
                emoji: '👀', icone: 'Eye',
                itens: [
                    { id: 'parquinho_04', titulo: 'Cordões, colares e cachecóis são removidos antes do uso (risco de enrosco e asfixia)', titulo_en: 'Cords, necklaces, and scarves removed before use (entanglement and asphyxiation risk)', titulo_es: 'Cordones, collares y bufandas removidos antes de usar (riesgo de enredo y asfixia)', tipo: 'perigo', tags: ['asfixia', 'estrangulamento'] },
                    { id: 'parquinho_05', titulo: 'Há separação em horários ou áreas entre crianças grandes e bebês', titulo_en: 'Are there separate times or areas between big kids and babies?', titulo_es: '¿Hay separación de horarios o áreas entre niños grandes y bebés?', tipo: 'sugestão', tags: ['choque'] },
                    { id: 'parquinho_06', titulo: 'Supervisão visual constante: as crianças nunca ficam sozinhas no parquinho', titulo_en: 'Constant visual supervision: children are never left alone at the playground', titulo_es: 'Supervisión visual constante: los niños nunca se quedan solos en el parque infantil', titulo_ptpt: 'Vigilância visual constante: as crianças nunca ficam sozinhas no parque infantil', tipo: 'perigo', tags: ['supervisão'] },
                ],
            },
        ],
    },

    piscina: {
        categorias: [
            {
                nome: 'Barreiras Físicas', nome_en: 'Physical Barriers', nome_es: 'Barreras Físicas',
                emoji: '🚧', icone: 'TrafficCone',
                itens: [
                    { id: 'piscina_01', titulo: 'Piscina tem cerca em todo o contorno, de pelo menos 1,50 m, com portão que fecha e trava sozinho', titulo_en: 'Pool is fenced on all sides, at least 1.2 m (4 ft) high, with a self-closing, self-latching gate', titulo_es: 'La piscina tiene valla en todo el contorno, de al menos 1,2 m, con puerta que se cierra y se traba sola', titulo_ptpt: 'A piscina tem vedação em todo o contorno, com pelo menos 1,20 m, e portão que fecha e tranca sozinho', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'piscina_02', titulo: 'Capa de segurança firme, que aguenta peso e fica bem presa nas bordas — capa solta pode afundar e prender quem cair sobre ela', titulo_en: 'A firm safety cover that bears weight and is fixed tight at the edges — a loose cover can sag and trap anyone who falls onto it', titulo_es: 'Cubierta de seguridad firme, que soporta peso y está bien sujeta a los bordes: una cubierta suelta puede hundirse y atrapar a quien caiga sobre ella', titulo_ptpt: 'Cobertura de segurança firme, que aguenta peso e fica bem presa nas bordas — uma cobertura solta pode afundar e prender quem cair sobre ela', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'piscina_03', titulo: 'Alarmes de detecção de movimento ativos instalados na superfície da piscina', titulo_en: 'Active motion-detection alarms installed on the pool surface', titulo_es: 'Alarmas activas de detección de movimiento instaladas en la superficie de la piscina', tipo: 'sugestão', tags: ['tecnologia'] },
                ],
            },
            {
                nome: 'Comportamento', nome_en: 'Behavior', nome_es: 'Comportamiento',
                emoji: '👀', icone: 'Eye',
                itens: [
                    { id: 'piscina_04', titulo: 'Supervisão visual direta e engajada (sem uso de celular) mantida durante uso', titulo_en: 'Direct and engaged visual supervision (no phone use) maintained during use', titulo_es: 'Supervisión visual directa y comprometida (sin uso del celular) mantenida durante el uso', tipo: 'perigo', tags: ['supervisão'] },
                    { id: 'piscina_05', titulo: 'Brinquedos removidos da piscina após uso (evitando atrativo para crianças)', titulo_en: 'Toys removed from pool after use (avoiding attraction for children)', titulo_es: 'Juguetes removidos de la piscina después del uso (evitando atracción para niños)', tipo: 'normal', tags: ['prevenção'] },
                    { id: 'piscina_06', titulo: 'Ralos modernos do modelo antiaprisionamento de cabelos', titulo_en: 'Modern drains with anti-hair entrapment models', titulo_es: 'Desagües modernos del modelo anti-atrapamiento de cabello', tipo: 'perigo', tags: ['segurança'] },
                    { id: 'piscina_07', titulo: 'Piscina tem rampa ou degrau por onde o pet consiga sair sozinho', titulo_en: 'Pool has a ramp or step the pet can use to get out on its own', titulo_es: 'La piscina tiene rampa o escalón por donde la mascota pueda salir sola', titulo_ptpt: 'A piscina tem rampa ou degrau por onde o animal consiga sair sozinho', tipo: 'perigo', tags: ['afogamento', 'pets'] },
                ],
            },
        ],
    },

    central_gas: {
        categorias: [
            {
                nome: 'Instalação', nome_en: 'Installation', nome_es: 'Instalación',
                emoji: '🔥', icone: 'Fire',
                itens: [
                    { id: 'central_gas_01', titulo: 'Botijões de gás armazenados em área externa e bem ventilada', titulo_en: 'Gas cylinders stored in an external, well-ventilated area', titulo_es: 'Cilindros de gas almacenados en una zona externa y bien ventilada', tipo: 'perigo', tags: ['explosão'] },
                    { id: 'central_gas_02', titulo: 'Botijões protegidos de sol forte, chuva contínua e longe de ralos (o gás acumula em partes baixas)', titulo_en: 'Cylinders protected from strong sun and continuous rain, and away from drains (the gas collects in low areas)', titulo_es: 'Cilindros protegidos del sol fuerte y la lluvia continua, y lejos de desagües (el gas se acumula en las partes bajas)', titulo_ptpt: 'Garrafas de gás protegidas do sol forte e da chuva contínua, e longe de ralos (o gás acumula-se nas zonas baixas)', tipo: 'normal', tags: ['manutenção'] },
                    { id: 'central_gas_03', titulo: 'Mangueira e regulador estão devidamente dentro da validade', titulo_en: 'Hose and regulator are strictly within validity', titulo_es: 'La manguera y el regulador están debidamente dentro de la validez', tipo: 'perigo', tags: ['segurança'] },
                    { id: 'central_gas_04', titulo: 'Distância segura mantida de instalações elétricas e tomadas próximas ao botijão', titulo_en: 'Safe distance maintained from electrical installations and outlets near the cylinder', titulo_es: 'Distancia segura mantenida de instalaciones eléctricas y enchufes cerca del cilindro', tipo: 'perigo', tags: ['fogo'] },
                ],
            },
        ],
    },

    quarto_crianca: {
        categorias: [
            {
                nome: 'Brinquedos Seguros', nome_en: 'Safe Toys', nome_es: 'Juguetes Seguros',
                emoji: '🧸', icone: 'Balloon',
                itens: [
                    { id: 'quarto_crianca_01', titulo: 'Brinquedos têm o selo de certificação de segurança exigido no país (no Brasil, o do Inmetro)', titulo_en: 'Toys carry the safety certification mark required in your country', titulo_es: 'Los juguetes llevan el sello de certificación de seguridad exigido en su país', titulo_ptpt: 'Os brinquedos têm a marcação de segurança exigida no país (na União Europeia, a marcação CE)', tipo: 'normal', tags: ['qualidade'] },
                    { id: 'quarto_crianca_02', titulo: 'Peças pequenas (que cabem dentro de um rolo de papel higiênico) ficam longe de crianças menores de 3 anos — teste do rolo', titulo_en: 'Small parts (anything that fits inside a toilet paper roll) are kept away from children under 3 — the toilet roll test', titulo_es: 'Las piezas pequeñas (las que caben dentro de un rollo de papel higiénico) están lejos de los menores de 3 años: la prueba del rollo', titulo_ptpt: 'Peças pequenas (que cabem dentro de um rolo de papel higiénico) ficam longe de crianças com menos de 3 anos — teste do rolo', tipo: 'sugestão', tags: ['asfixia'] },
                    { id: 'quarto_crianca_03', titulo: 'Brinquedos a pilha têm a tampa do compartimento presa com parafuso ou trava que a criança não consegue abrir', titulo_en: 'Battery-operated toys have the compartment cover secured with a screw or a catch a child cannot open', titulo_es: 'Los juguetes a pilas tienen la tapa del compartimento sujeta con tornillo o con un cierre que el niño no puede abrir', titulo_ptpt: 'Os brinquedos a pilhas têm a tampa do compartimento presa com parafuso ou com um fecho que a criança não consegue abrir', tipo: 'perigo', tags: ['bateria'] },
                    { id: 'quarto_crianca_04', titulo: 'Bexigas/Balões são usados sob supervisão rigorosa (risco alto de asfixia em caso de estouro)', titulo_en: 'Balloons are used under strict supervision (high risk of choking if popped)', titulo_es: 'Los globos se usan bajo estricta supervisión (alto riesgo de asfixia en caso de estallido)', tipo: 'perigo', tags: ['asfixia'] },
                    { id: 'quarto_crianca_11', titulo: 'Balões estourados são recolhidos e descartados na hora (os pedaços podem ser engolidos e causar asfixia)', titulo_en: 'Popped balloons are picked up and thrown away at once (the pieces can be swallowed and cause choking)', titulo_es: 'Los globos reventados se recogen y se desechan de inmediato (los trozos pueden tragarse y causar asfixia)', titulo_ptpt: 'Os balões rebentados são apanhados e deitados fora de imediato (os pedaços podem ser engolidos e causar asfixia)', tipo: 'perigo', tags: ['asfixia'] },
                ],
            },
            {
                nome: 'Cuidado no Banho (Área Molhada)', nome_en: 'Bath Care (Wet Area)', nome_es: 'Cuidado en el Baño (Área Húmeda)',
                emoji: '🛁', icone: 'Bathtub',
                itens: [
                    { id: 'quarto_crianca_05', titulo: 'Tampa do vaso sanitário possui trava física de engate antiafogamento', titulo_en: 'Toilet lid has a physical anti-drowning catch lock', titulo_es: 'La tapa del inodoro tiene un cierre físico de enganche antiahogamiento', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'quarto_crianca_06', titulo: 'Banheira é esvaziada imediatamente após o uso', titulo_en: 'Bathtub is emptied immediately after use', titulo_es: 'La bañera se vacía inmediatamente después de usarla', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'quarto_crianca_07', titulo: 'Criança tem supervisão constante durante o banho', titulo_en: 'Child is constantly supervised during bath time', titulo_es: 'El niño tiene supervisión constante durante el baño', tipo: 'perigo', tags: ['supervisão'] },
                ],
            },
            {
                nome: 'Ambiente', nome_en: 'Environment', nome_es: 'Ambiente',
                emoji: '🏠', icone: 'House',
                itens: [
                    { id: 'quarto_crianca_08', titulo: 'Janelas do quarto possuem redes de proteção instaladas', titulo_en: 'Bedroom windows have safety nets installed', titulo_es: 'Las ventanas del dormitorio tienen redes de protección instaladas', tipo: 'perigo', tags: ['queda'] },
                    { id: 'quarto_crianca_09', titulo: 'Móveis instáveis, como cômodas de gaveta, estão fixados na parede (anti tombamento)', titulo_en: 'Unstable furniture, like drawer dressers, are fixed to the wall (anti-tip)', titulo_es: 'Los muebles inestables, como las cómodas, están fijados a la pared (antivuelco)', tipo: 'perigo', tags: ['tombamento'] },
                    { id: 'quarto_crianca_10', titulo: 'Todas as tomadas baixas têm protetores instalados', titulo_en: 'All low outlets have installed protectors', titulo_es: 'Todos los enchufes bajos tienen protectores instalados', tipo: 'normal', tags: ['choque'] },
                ],
            },
        ],
    },

    garagem: {
        categorias: [
            {
                nome: 'Proteção Ambiental e Gases de Escapamento (CO)', nome_en: 'Environmental Protection and Exhaust Fumes (CO)', nome_es: 'Protección Ambiental y Gases de Escape (CO)', nome_ptpt: 'Proteção Ambiental e Gases de Escape (CO)',
                emoji: '🚗', icone: 'Car',
                itens: [
                    { id: 'garagem_01', titulo: 'Você verifica pontos cegos (embaixo e atrás) antes de ligar o veículo?', titulo_en: 'Do you check blind spots (under and behind) before starting the vehicle?', titulo_es: '¿Revisa los puntos ciegos (debajo y detrás) antes de encender el vehículo?', tipo: 'perigo', tags: ['atropelamento'] },
                    { id: 'garagem_02', titulo: 'O carro é mantido desligado enquanto a garagem estiver fechada?', titulo_en: 'Is the car kept off while the garage is closed?', titulo_es: '¿Se mantiene el automóvil apagado mientras el garaje está cerrado?', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'garagem_03', titulo: 'A iluminação é forte o suficiente para manobras seguras sem pontos de sombra?', titulo_en: 'Is lighting strong enough for safe maneuvers without shadow spots?', titulo_es: '¿Es la iluminación lo suficientemente fuerte para maniobras seguras sin puntos de sombra?', tipo: 'normal', tags: ['visão'] },
                ],
            },
            {
                nome: 'Armazenamento', nome_en: 'Storage', nome_es: 'Almacenamiento',
                emoji: '📦', icone: 'Package',
                itens: [
                    { id: 'garagem_04', titulo: 'Não há materiais e fluidos inflamáveis estocados nesta área', titulo_en: 'No flammable materials or fluids are stored in this area', titulo_es: 'No hay materiales ni fluidos inflamables almacenados en esta área', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'garagem_05', titulo: 'Sem entulho em volta do carro, para as portas abrirem e a circulação ficar livre', titulo_en: 'No clutter around the car, so the doors open and the way stays clear', titulo_es: 'Sin escombros alrededor del coche, para que las puertas abran y el paso quede libre', titulo_ptpt: 'Sem entulho à volta do carro, para as portas abrirem e a passagem ficar livre', tipo: 'normal', tags: ['acessibilidade'] },
                ],
            },
        ],
    },

    hall_corredor: {
        categorias: [
            {
                nome: 'Acessibilidade', nome_en: 'Accessibility', nome_es: 'Accesibilidad',
                emoji: '🚶', icone: 'PersonSimpleWalk',
                itens: [
                    { id: 'hall_corredor_01', titulo: 'O corredor tem largura livre (sem móveis pesados estreitando a passagem)', titulo_en: 'The hallway has free width (no heavy furniture narrowing the passage)', titulo_es: 'El pasillo tiene ancho libre (sin muebles pesados ​​que estrechen el paso)', tipo: 'normal', tags: ['acessibilidade'] },
                    { id: 'hall_corredor_02', titulo: 'Ligação da luz é automática (sensor) ou possui acendedor fácil ao alcance', titulo_en: 'Light switch is automatic (sensor) or has an easy switch within reach', titulo_es: 'El encendido es automático (sensor) o tiene un interruptor fácil al alcance', tipo: 'sugestão', tags: ['conforto'] },
                    { id: 'hall_corredor_03', titulo: 'Pisos são completamente planos e sem tapetes soltos escorregadios', titulo_en: 'Floors are completely flat and without slippery loose rugs', titulo_es: 'Los pisos son completamente planos y sin alfombras sueltas resbaladizas', tipo: 'perigo', tags: ['queda'] },
                ],
            },
            {
                nome: 'Rota de Emergência', nome_en: 'Emergency Route', nome_es: 'Ruta de Emergencia',
                emoji: '🚪', icone: 'Door',
                itens: [
                    { id: 'hall_corredor_04', titulo: 'Caminho até a saída principal está livre de obstáculos a qualquer hora', titulo_en: 'Path to the main exit is clear of obstacles at all times', titulo_es: 'El camino hacia la salida principal está libre de obstáculos en todo momento', titulo_ptpt: 'O caminho até à saída principal está livre de obstáculos a qualquer hora', tipo: 'perigo', tags: ['evacuação'] },
                    { id: 'hall_corredor_07', titulo: 'Porta da rua tem trava alta, de dupla ação ou alarme de abertura — para quem pode sair sozinho sem perceber o perigo', titulo_en: 'Front door has a high or double-action lock, or an opening alarm — for someone who may leave alone without sensing the danger', titulo_es: 'La puerta de la calle tiene cerradura alta, de doble acción o alarma de apertura, para quien puede salir solo sin percibir el peligro', titulo_ptpt: 'A porta da rua tem fecho alto, de dupla ação ou alarme de abertura — para quem pode sair sozinho sem perceber o perigo', tipo: 'perigo', tags: ['neurodivergente', 'fuga'] },
                    { id: 'hall_corredor_08', titulo: 'Móveis e objetos ficam sempre no mesmo lugar, e portas e armários totalmente abertos ou fechados — quem enxerga pouco se orienta pela memória', titulo_en: 'Furniture and objects always stay in the same place, and doors and cupboards are fully open or fully closed — someone with low vision finds their way by memory', titulo_es: 'Muebles y objetos siempre en el mismo sitio, y puertas y armarios totalmente abiertos o cerrados: quien ve poco se orienta por la memoria', titulo_ptpt: 'Móveis e objetos ficam sempre no mesmo sítio, e portas e armários totalmente abertos ou fechados — quem vê mal orienta-se pela memória', tipo: 'perigo', tags: ['deficiencia_visual', 'queda'] },
                    { id: 'hall_corredor_09', titulo: 'Detector de fumaça com aviso luminoso ou vibratório — o alarme sonoro pode não ser ouvido', titulo_en: 'Smoke alarm with a flashing-light or vibrating alert — a sound alarm may not be heard', titulo_es: 'Detector de humo con aviso luminoso o vibratorio: la alarma sonora puede no oírse', titulo_ptpt: 'Detetor de fumo com aviso luminoso ou vibratório — o alarme sonoro pode não ser ouvido', tipo: 'perigo', tags: ['deficiencia_auditiva', 'incêndio'] },
                    { id: 'hall_corredor_10', titulo: 'Campainha e interfone com sinal luminoso, e um combinado de como avisar quem não ouve numa emergência à noite', titulo_en: 'Doorbell and intercom with a light signal, and an agreed way to alert someone who cannot hear in a night-time emergency', titulo_es: 'Timbre e interfono con señal luminosa, y un acuerdo sobre cómo avisar de noche, en una emergencia, a quien no oye', titulo_ptpt: 'Campainha e intercomunicador com sinal luminoso, e um combinado sobre como avisar quem não ouve numa emergência à noite', tipo: 'normal', tags: ['deficiencia_auditiva', 'comunicação', 'evacuação'] },
                    { id: 'hall_corredor_11', titulo: 'Passagens livres e largas para andador ou cadeira de rodas (cerca de 80 cm), sem tapetes nem desníveis', titulo_en: 'Clear, wide passages for a walker or wheelchair (about 80 cm), with no rugs or level changes', titulo_es: 'Pasos libres y anchos para andador o silla de ruedas (unos 80 cm), sin alfombras ni desniveles', titulo_ptpt: 'Passagens livres e largas para andarilho ou cadeira de rodas (cerca de 80 cm), sem tapetes nem desníveis', tipo: 'perigo', tags: ['mobilidade_pessoa', 'acessibilidade', 'queda'] },
                    { id: 'hall_corredor_12', titulo: 'Saída de emergência possível para quem usa andador ou cadeira de rodas — e já está combinado quem ajuda', titulo_en: 'An emergency way out that works for someone using a walker or wheelchair — and who will help is already agreed', titulo_es: 'Salida de emergencia posible para quien usa andador o silla de ruedas, y ya está acordado quién ayuda', titulo_ptpt: 'Saída de emergência possível para quem usa andarilho ou cadeira de rodas — e já está combinado quem ajuda', tipo: 'perigo', tags: ['mobilidade_pessoa', 'evacuação'] },
                    { id: 'hall_corredor_05', titulo: 'Existe luz de emergência ou lanterna acessível no corredor para falta de energia', titulo_en: 'Is there an emergency light or accessible flashlight in the hallway for power outages?', titulo_es: '¿Hay una luz de emergencia o una linterna accesible en el pasillo en caso de cortes de energía?', tipo: 'sugestão', tags: ['energia'] },
                    { id: 'hall_corredor_06', titulo: 'Fios elétricos embutidos ou protegidos por canaletas (sem fios soltos pelo chão)', titulo_en: 'Electrical wires embedded or protected by conduits (no loose wires on the floor)', titulo_es: 'Cables eléctricos empotrados o protegidos por canaletas (sin cables sueltos en el suelo)', tipo: 'normal', tags: ['tropeço', 'choque'] },
                ],
            },
        ],
    },

    jardim_horta: {
        categorias: [
            {
                nome: 'Botânica e Ambiente', nome_en: 'Botany and Environment', nome_es: 'Botánica y Ambiente',
                emoji: '🌿', icone: 'Leaf',
                itens: [
                    { id: 'jardim_horta_01', titulo: 'Plantas sabidamente tóxicas (ex: Comigo-ninguém-pode) foram mapeadas e removidas', titulo_en: 'Known toxic plants (e.g., Dumbcane) mapped and removed', titulo_es: 'Plantas conocidas por ser tóxicas (ej: Dieffenbachia) mapeadas y removidas', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'jardim_horta_02', titulo: 'O quintal está livre de entulhos orgânicos de adubo ou madeiras (abrigo para aranhas e escorpiões)', titulo_en: 'The yard is free of organic debris like fertilizer or wood (shelter for spiders and scorpions)', titulo_es: 'El patio está libre de escombros orgánicos de fertilizante o madera (refugio para arañas y escorpiones)', tipo: 'normal', tags: ['animais_peçonhentos'] },
                    { id: 'jardim_horta_03', titulo: 'Crianças e animais de estimação ficam afastados do operador durante o uso de máquinas/poda', titulo_en: 'Children and pets stay away from the operator during machinery use/pruning', titulo_es: 'Los niños y las mascotas se mantienen alejados del operador durante el uso de máquinas/poda', tipo: 'perigo', tags: ['segurança'] },
                ],
            },
            {
                nome: 'Ferramentas e Produtos Químicos', nome_en: 'Tools and Chemicals', nome_es: 'Herramientas y Productos Químicos',
                emoji: '🛠️', icone: 'Toolbox',
                itens: [
                    { id: 'jardim_horta_04', titulo: 'Fertilizantes e venenos ficam trancados, na embalagem original', titulo_en: 'Fertilizers and poisons are locked away in their original packaging', titulo_es: 'Los fertilizantes y venenos están bajo llave, en su envase original', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'jardim_horta_05', titulo: 'Tesouras de poda e serras estão travadas e guardadas fora de alcance', titulo_en: 'Pruning shears and saws are locked and stored out of reach', titulo_es: 'Tijeras de podar y sierras están cerradas y guardadas fuera del alcance', tipo: 'perigo', tags: ['corte'] },
                    { id: 'jardim_horta_06', titulo: 'Ferramentas são limpas após o uso (jamais largadas no chão do jardim)', titulo_en: 'Tools are cleaned after use (never left on the garden floor)', titulo_es: 'Las herramientas se limpian después de su uso (nunca se dejan en el suelo del jardín)', tipo: 'normal', tags: ['organização'] },
                ],
            },
            {
                nome: 'Proteção Pessoal (EPI)', nome_en: 'Personal Protection (PPE)', nome_es: 'Protección Personal (EPI)',
                emoji: '🧤', icone: 'Hand',
                itens: [
                    { id: 'jardim_horta_07', titulo: 'Manuseio da terra vegetal ocorre com uso rotineiro de luvas e botas fechadas', titulo_en: 'Potting soil handled with routine use of gloves and closed boots', titulo_es: 'Manejo de la tierra con uso rutinario de guantes y botas cerradas', tipo: 'normal', tags: ['biológico'] },
                    { id: 'jardim_horta_08', titulo: 'Uso habitual de proteção ocular ao manipular produtos químicos em spray ou galhos finos', titulo_en: 'Habitual use of eye protection when handling chemical sprays or thin branches', titulo_es: 'Uso habitual de protección ocular al manipular aerosoles químicos o ramas finas', tipo: 'sugestão', tags: ['epi'] },
                ],
            },
        ],
    },

    oficina: {
        categorias: [
            {
                nome: 'Ferramentas', nome_en: 'Tools', nome_es: 'Herramientas',
                emoji: '🛠️', icone: 'Toolbox',
                itens: [
                    { id: 'oficina_01', titulo: 'Ferramentas mantidas guardadas em painéis ou caixas (nada solto ou espalhado)', titulo_en: 'Tools kept stored on panels or in boxes (nothing loose or scattered)', titulo_es: 'Herramientas guardadas en paneles o cajas (nada suelto o esparcido)', tipo: 'normal', tags: ['organização'] },
                    { id: 'oficina_02', titulo: 'Serras e lâminas cortantes estão devidamente trancadas', titulo_en: 'Saws and sharp blades are properly locked away', titulo_es: 'Las sierras y cuchillas afiladas están debidamente guardadas bajo llave', tipo: 'perigo', tags: ['corte'] },
                    { id: 'oficina_03', titulo: 'Nível de ventilação extra e iluminação são adequados ao ambiente', titulo_en: 'Extra ventilation and lighting levels are adequate for the environment', titulo_es: 'El nivel de ventilación extra y la iluminación son adecuados para el entorno', tipo: 'normal', tags: ['saúde'] },
                    { id: 'oficina_04', titulo: 'Equipamento de Proteção Individual (óculos, luvas) sempre acessível', titulo_en: 'Personal Protective Equipment (goggles, gloves) always within reach', titulo_es: 'Equipo de Protección Personal (gafas, guantes) siempre accesible', tipo: 'sugestão', tags: ['proteção'] },
                ],
            },
            {
                nome: 'Segurança Elétrica e Combustível', nome_en: 'Electrical and Fuel Safety', nome_es: 'Seguridad Eléctrica y de Combustibles',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'oficina_05', titulo: 'Extintor de incêndio (tipo ABC) presente e com validade conferida', titulo_en: 'Fire extinguisher (type ABC) present and validity checked', titulo_es: 'Extintor de incendios (tipo ABC) presente y validez comprobada', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'oficina_06', titulo: 'Tomadas e extensões não sobrecarregadas (sem "benjamin" em cascata)', titulo_en: 'Outlets and extensions not overloaded (no cascaded "power strips")', titulo_es: 'Enchufes y extensiones no sobrecargados (sin "regletas" en cascada)', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'oficina_07', titulo: 'Porta da oficina trancada quando não está em uso (dificulta o acesso de crianças)', titulo_en: 'Workshop door locked when not in use (keeps children out)', titulo_es: 'Puerta del taller cerrada con llave cuando no se usa (dificulta el acceso de los niños)', tipo: 'perigo', tags: ['crianças', 'segurança'] },
                ],
            },
        ],
    },

    varanda: {
        categorias: [
            {
                nome: 'Proteção em Altura', nome_en: 'Fall Protection at Height', nome_es: 'Protección en Altura',
                emoji: '🏙️', icone: 'Buildings',
                itens: [
                    { id: 'varanda_01', titulo: 'Rede de proteção certificada instalada em toda a extensão do vão', titulo_en: 'Certified safety net installed along the entire length of the span', titulo_es: 'Red de protección certificada instalada en toda la longitud del espacio', tipo: 'perigo', tags: ['queda'] },
                    { id: 'varanda_02', titulo: 'Sem móveis, vasos ou caixas junto ao guarda-corpo que uma criança possa usar como degrau para escalar', titulo_en: 'No furniture, plant pots or boxes next to the railing that a child could use as a step to climb over', titulo_es: 'Sin muebles, macetas ni cajas junto a la barandilla que un niño pueda usar como escalón para trepar', tipo: 'perigo', tags: ['queda', 'crianças'] },
                    { id: 'varanda_03', titulo: 'Piso é antiderrapante (mesmo quando molhado)', titulo_en: 'Floor is non-slip (even when wet)', titulo_es: 'El piso es antideslizante (incluso mojado)', tipo: 'normal', tags: ['queda'] },
                ],
            },
            {
                nome: 'Segurança Complementar', nome_en: 'Complementary Safety', nome_es: 'Seguridad Complementaria',
                emoji: '🛡️', icone: 'ShieldCheck',
                itens: [
                    { id: 'varanda_04', titulo: 'Vasos de plantas não obstruem a passagem e estão fixados, para não caírem com o vento', titulo_en: 'Plant pots do not block the way and are secured so the wind cannot knock them down', titulo_es: 'Las macetas no obstruyen el paso y están fijadas para que el viento no las tire', titulo_ptpt: 'Os vasos de plantas não obstruem a passagem e estão fixos, para não caírem com o vento', tipo: 'normal', tags: ['queda', 'organização'] },
                    { id: 'varanda_05', titulo: 'Churrasqueira da varanda (se houver) tem ventilação adequada; se for a gás, mangueira e regulador estão dentro da validade', titulo_en: 'Balcony grill (if any) has proper ventilation; if it runs on gas, the hose and regulator are in date', titulo_es: 'La parrilla del balcón (si la hay) tiene ventilación adecuada; si es de gas, la manguera y el regulador están vigentes', titulo_ptpt: 'O grelhador da varanda (se houver) tem ventilação adequada; se for a gás, o tubo e o redutor estão dentro da validade', tipo: 'perigo', tags: ['incêndio', 'gás'] },
                    { id: 'varanda_06', titulo: 'Iluminação noturna adequada para evitar tropeços e quedas', titulo_en: 'Adequate night lighting to avoid tripping and falling', titulo_es: 'Iluminación nocturna adecuada para evitar tropiezos y caídas', tipo: 'sugestão', tags: ['visão'] },
                ],
            },
        ],
    },

    despensa: {
        categorias: [
            {
                nome: 'Segurança Alimentar', nome_en: 'Food Safety', nome_es: 'Seguridad Alimentaria',
                emoji: 'cans',
                itens: [
                    { id: 'despensa_01', titulo: 'Alimentos guardados longe de produtos de limpeza e outros produtos químicos', titulo_en: 'Food stored away from cleaning products and chemicals', titulo_es: 'Alimentos almacenados lejos de productos de limpieza y otros productos químicos', tipo: 'perigo', tags: ['contaminação'] },
                    { id: 'despensa_02', titulo: 'Escada segura disponível para alcançar o alto (sem uso de banquinhos improvisados)', titulo_en: 'Safe ladder available to reach high (no use of makeshift stools)', titulo_es: 'Escalera segura disponible para alcanzar alturas (sin uso de taburetes improvisados)', tipo: 'normal', tags: ['queda'] },
                    { id: 'despensa_03', titulo: 'Grãos crus (feijão, milho) ficam em potes bem fechados (risco de asfixia e de a criança colocá-los no nariz ou no ouvido)', titulo_en: 'Raw grains (beans, corn) are kept in tightly closed jars (risk of choking, or of a child putting them in the nose or ear)', titulo_es: 'Los granos crudos (frijoles, maíz) están en frascos bien cerrados (riesgo de asfixia o de que el niño se los meta en la nariz o el oído)', tipo: 'sugestão', tags: ['crianças'] },
                ],
            },
        ],
    },

    deposito: {
        categorias: [
            {
                nome: 'Organização', nome_en: 'Organization', nome_es: 'Organización',
                emoji: '📦', icone: 'Package',
                itens: [
                    { id: 'deposito_01', titulo: 'Ambiente se mantém limpo e ventilado (reduzindo o que atrai aranhas)', titulo_en: 'Space is kept clean and ventilated (less to attract spiders)', titulo_es: 'El espacio se mantiene limpio y ventilado (reduciendo lo que atrae a las arañas)', tipo: 'normal', tags: ['pragas'] },
                    { id: 'deposito_02', titulo: 'Itens pesados apoiados no chão (nunca em prateleiras altas e instáveis)', titulo_en: 'Heavy items supported on the floor (never on high, unstable shelves)', titulo_es: 'Artículos pesados apoyados en el suelo (nunca en estantes altos e inestables)', tipo: 'perigo', tags: ['esmagamento'] },
                    { id: 'deposito_03', titulo: 'Corredores internos ficam livres para circulação', titulo_en: 'Inside walkways are kept clear', titulo_es: 'Los pasillos interiores quedan libres para circular', tipo: 'normal', tags: ['acessibilidade'] },
                ],
            },
            {
                nome: 'Prevenção de Riscos', nome_en: 'Risk Prevention', nome_es: 'Prevención de Riesgos',
                emoji: '⚠️', icone: 'Warning',
                itens: [
                    { id: 'deposito_04', titulo: 'Não há materiais inflamáveis armazenados perto de fontes de calor ou instalações elétricas', titulo_en: 'No flammable materials are stored near heat sources or electrical installations', titulo_es: 'No hay materiales inflamables almacenados cerca de fuentes de calor o instalaciones eléctricas', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'deposito_05', titulo: 'Inspeção periódica de frestas e ralos contra escorpiões e aranhas', titulo_en: 'Regular checks of cracks and drains for scorpions and spiders', titulo_es: 'Inspección periódica de grietas y desagües contra escorpiones y arañas', tipo: 'perigo', tags: ['animais_peçonhentos'] },
                    { id: 'deposito_06', titulo: 'Porta do depósito tem trava que dificulta o acesso de crianças sem supervisão', titulo_en: 'Storage room door has a lock that keeps unsupervised children out', titulo_es: 'La puerta del depósito tiene un cierre que dificulta el acceso de niños sin supervisión', tipo: 'sugestão', tags: ['crianças', 'segurança'] },
                ],
            },
        ],
    },

    copa: {
        categorias: [
            {
                nome: 'Mesa Segura', nome_en: 'Safe Table', nome_es: 'Mesa Segura',
                emoji: '🍽️', icone: 'ForkKnife',
                itens: [
                    { id: 'copa_01', titulo: 'As toalhas de mesa são curtas ou presas (evitando puxões e quedas de objetos quentes ou cortantes)', titulo_en: 'Tablecloths are short or secured (avoiding pulls and falls of hot or sharp objects)', titulo_es: 'Los manteles son cortos o están asegurados (evitando tirones y caídas de objetos calientes o cortantes)', tipo: 'perigo', tags: ['queimadura', 'corte'] },
                    { id: 'copa_02', titulo: 'Tapetes soltos embaixo da mesa ou no caminho até lá foram eliminados', titulo_en: 'Loose rugs under the table or on the way there have been eliminated', titulo_es: 'Las alfombras sueltas debajo de la mesa o en el camino hacia ella se han eliminado', tipo: 'normal', tags: ['queda'] },
                    { id: 'copa_03', titulo: 'Objetos pesados ou de vidro ficam guardados nas partes seguras ou mais baixas da prateleira', titulo_en: 'Heavy or glass objects are stored in the safe or lower parts of the shelf', titulo_es: 'Los objetos pesados o de vidrio se guardan en las partes seguras o más bajas del estante', tipo: 'sugestão', tags: ['queda'] },
                    { id: 'copa_04', titulo: 'As cadeiras são estáveis e niveladas, sem chance de virar para trás sob peso normal', titulo_en: 'Chairs are stable and level, with no chance of tipping backward under normal weight', titulo_es: 'Las sillas son estables y niveladas, sin posibilidad de volcarse hacia atrás con peso normal', tipo: 'normal', tags: ['acidente'] },
                ],
            },
        ],
    },

    sotao: {
        categorias: [
            {
                nome: 'Estrutura e Acesso', nome_en: 'Structure and Access', nome_es: 'Estructura y Acceso',
                emoji: '🪜', icone: 'Ladder',
                itens: [
                    { id: 'sotao_01', titulo: 'Escada de acesso (fixa ou retrátil) é firme e suporta peso com segurança', titulo_en: 'Access ladder (fixed or retractable) is sturdy and safely bears weight', titulo_es: 'La escalera de acceso (fija o retráctil) es firme y soporta el peso con seguridad', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sotao_02', titulo: 'Piso do sótão é forrado adequadamente, para ninguém pisar em falso no gesso ou no forro e cair', titulo_en: 'Attic floor is properly boarded, so no one steps through the plaster or ceiling and falls', titulo_es: 'El piso del desván está bien entablado, para que nadie pise en falso sobre el yeso o el falso techo y se caiga', titulo_ptpt: 'O chão do sótão está bem forrado, para ninguém pisar em falso no gesso ou no teto falso e cair', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sotao_03', titulo: 'Iluminação é suficiente para ver os cantos escuros — ou há uma lanterna à mão', titulo_en: 'Lighting is good enough to see into dark corners — or there is a flashlight at hand', titulo_es: 'La iluminación permite ver los rincones oscuros, o hay una linterna a mano', titulo_ptpt: 'A iluminação permite ver os cantos escuros — ou há uma lanterna à mão', tipo: 'normal', tags: ['visão'] },
                ],
            },
            {
                nome: 'Clima e Pragas', nome_en: 'Weather and Pests', nome_es: 'Clima y Plagas',
                emoji: '🦇', icone: 'Bird',
                itens: [
                    { id: 'sotao_04', titulo: 'Telhado inspecionado periodicamente contra goteiras que afetem a fiação elétrica', titulo_en: 'Roof inspected regularly for leaks that could reach the electrical wiring', titulo_es: 'Tejado revisado periódicamente contra goteras que afecten al cableado eléctrico', titulo_ptpt: 'Telhado inspecionado periodicamente contra infiltrações que afetem a instalação elétrica', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'sotao_05', titulo: 'Ventilação adequada para evitar superaquecimento no verão', titulo_en: 'Adequate ventilation to prevent overheating in summer', titulo_es: 'Ventilación adecuada para evitar el sobrecalentamiento en verano', titulo_ptpt: 'Ventilação adequada para evitar o sobreaquecimento no verão', tipo: 'sugestão', tags: ['conforto'] },
                    { id: 'sotao_06', titulo: 'Livre de ninhos de pássaros, morcegos, ratos ou cupins nas vigas', titulo_en: 'Free of bird nests, bats, rats or termites in the beams', titulo_es: 'Libre de nidos de pájaros, murciélagos, ratas o termitas en las vigas', titulo_ptpt: 'Livre de ninhos de pássaros, morcegos, ratos ou térmitas nas vigas', tipo: 'perigo', tags: ['biológico', 'pragas'] },
                ],
            },
            {
                nome: 'Armazenamento', nome_en: 'Storage', nome_es: 'Almacenamiento',
                emoji: '📦', icone: 'Package',
                itens: [
                    { id: 'sotao_07', titulo: 'Caixas pesadas ficam nas bordas ou sobre as vigas de sustentação', titulo_en: 'Heavy boxes are placed at the edges or on the supporting beams', titulo_es: 'Las cajas pesadas están en los bordes o sobre las vigas de soporte', tipo: 'normal', tags: ['estrutura'] },
                    { id: 'sotao_08', titulo: 'Nenhum material inflamável ou químico estocado perto do calor do telhado', titulo_en: 'No flammable or chemical materials stored near the heat under the roof', titulo_es: 'Ningún material inflamable o químico almacenado cerca del calor del tejado', titulo_ptpt: 'Nenhum material inflamável ou químico guardado perto do calor do telhado', tipo: 'perigo', tags: ['incêndio'] },
                ],
            },
        ],
    },

    porao: {
        categorias: [
            {
                nome: 'Qualidade do Ar e Umidade', nome_en: 'Air Quality and Damp', nome_es: 'Calidad del Aire y Humedad', nome_ptpt: 'Qualidade do Ar e Humidade',
                emoji: '💧', icone: 'Drop',
                itens: [
                    { id: 'porao_01', titulo: 'Ambiente livre de mofo e infiltrações severas nas paredes', titulo_en: 'Free of mold and serious damp patches on the walls', titulo_es: 'Ambiente libre de moho y de filtraciones graves en las paredes', titulo_ptpt: 'Espaço livre de bolor e de infiltrações graves nas paredes', tipo: 'perigo', tags: ['respiratório', 'saúde'] },
                    { id: 'porao_02', titulo: 'Ventilação, natural ou mecânica, contra umidade, mofo e acúmulo de gases (como os de aquecedor ou gerador)', titulo_en: 'Natural or mechanical ventilation against damp, mold and gas build-up (such as from a heater or generator)', titulo_es: 'Ventilación, natural o mecánica, contra la humedad, el moho y la acumulación de gases (como los de un calentador o un generador)', titulo_ptpt: 'Ventilação, natural ou mecânica, contra a humidade, o bolor e a acumulação de gases (como os de um esquentador ou gerador)', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'porao_03', titulo: 'Ralos possuem sistema de refluxo ou tampa para evitar alagamentos ou invasão de esgoto', titulo_en: 'Drains have a backflow valve or cover to prevent flooding or sewage backup', titulo_es: 'Los desagües tienen válvula antirretorno o tapa para evitar inundaciones o el retorno de aguas residuales', titulo_ptpt: 'Os ralos têm válvula antirretorno ou tampa para evitar inundações ou o retorno de esgoto', tipo: 'perigo', tags: ['higiene'] },
                ],
            },
            {
                nome: 'Segurança Elétrica e Estrutural', nome_en: 'Electrical and Structural Safety', nome_es: 'Seguridad Eléctrica y Estructural',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'porao_04', titulo: 'Fiação elétrica não fica exposta à umidade do piso ou das paredes', titulo_en: 'Electrical wiring is not exposed to damp floors or walls', titulo_es: 'El cableado eléctrico no queda expuesto a la humedad del suelo o las paredes', titulo_ptpt: 'A instalação elétrica não fica exposta à humidade do chão ou das paredes', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'porao_05', titulo: 'Escada de descida tem corrimão firme e iluminação própria', titulo_en: 'Stairs down have a sturdy handrail and their own lighting', titulo_es: 'La escalera de bajada tiene pasamanos firme e iluminación propia', tipo: 'perigo', tags: ['queda'] },
                    { id: 'porao_06', titulo: 'Sem rachaduras novas ou profundas nas paredes e pilares — se houver, procure um engenheiro', titulo_en: 'No new or deep cracks in walls and pillars — if there are, consult a structural engineer', titulo_es: 'Sin grietas nuevas o profundas en paredes y pilares; si las hay, consulte a un ingeniero', titulo_ptpt: 'Sem fissuras novas ou profundas nas paredes e pilares — se houver, consulte um engenheiro', tipo: 'normal', tags: ['estrutura'] },
                ],
            },
            {
                nome: 'Animais e Pragas', nome_en: 'Animals and Pests', nome_es: 'Animales y Plagas',
                emoji: '🕷️', icone: 'Bug',
                itens: [
                    { id: 'porao_07', titulo: 'Inspeção periódica contra escorpiões, aranhas e roedores', titulo_en: 'Regular checks for scorpions, spiders and rodents', titulo_es: 'Inspección periódica contra escorpiones, arañas y roedores', tipo: 'perigo', tags: ['animais_peçonhentos'] },
                    { id: 'porao_08', titulo: 'Equipamentos e caixas ficam elevados do chão, longe da umidade e sem servir de abrigo para baratas, escorpiões e roedores', titulo_en: 'Equipment and boxes are kept off the floor, away from damp, so they do not become a hiding place for cockroaches, scorpions and rodents', titulo_es: 'Los equipos y cajas están elevados del suelo, lejos de la humedad y sin servir de refugio a cucarachas, escorpiones y roedores', titulo_ptpt: 'Os equipamentos e caixas ficam acima do chão, longe da humidade e sem servirem de abrigo a baratas, escorpiões e roedores', tipo: 'normal', tags: ['organização'] },
                ],
            },
        ],
    },

    quarto_adulto: {
        categorias: [
            {
                nome: 'Cuidados no Quarto', nome_en: 'Bedroom Safety', nome_es: 'Cuidados en el Dormitorio',
                emoji: '🔒', icone: 'Lock',
                itens: [
                    { id: 'quarto_adulto_01', titulo: 'Medicamentos e cosméticos ficam fora do alcance ou trancados em gavetas', titulo_en: 'Medicines and cosmetics are kept out of reach or locked in drawers', titulo_es: 'Los medicamentos y cosméticos están fuera del alcance o bajo llave en cajones', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'quarto_adulto_02', titulo: 'Objetos cortantes (alicate de unha, tesoura) são guardados em local seguro e fechado', titulo_en: 'Sharp objects (nail clippers, scissors) are stored in a safe, closed place', titulo_es: 'Los objetos cortantes (alicates de uñas, tijeras) se guardan en un lugar seguro y cerrado', titulo_ptpt: 'Os objetos cortantes (corta-unhas, tesoura) são guardados em local seguro e fechado', tipo: 'normal', tags: ['corte'] },
                    { id: 'quarto_adulto_03', titulo: 'O carregador do celular fica desconectado e longe da cama na hora de dormir', titulo_en: 'Phone charger is unplugged and away from the bed at bedtime', titulo_es: 'El cargador del celular se desconecta y se aleja de la cama a la hora de dormir', titulo_ptpt: 'O carregador do telemóvel fica desligado e longe da cama à hora de dormir', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'quarto_adulto_04', titulo: 'Cigarros e isqueiros ficam fora do alcance das crianças', titulo_en: 'Cigarettes and lighters are kept out of children\'s reach', titulo_es: 'Cigarrillos y encendedores están fuera del alcance de los niños', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'quarto_adulto_05', titulo: 'Aparelhos ligados direto na tomada, sem sobrecarregar extensões ("benjamins")', titulo_en: 'Appliances plugged straight into the wall, without overloading extension leads or adapters', titulo_es: 'Aparatos enchufados directamente a la toma, sin sobrecargar alargadores ni ladrones', titulo_ptpt: 'Aparelhos ligados diretamente à tomada, sem sobrecarregar extensões ou fichas triplas', tipo: 'normal', tags: ['choque'] },
                ],
            },
        ],
    },

    canil: {
        categorias: [
            {
                nome: 'Ambiente e Abrigo', nome_en: 'Environment and Shelter', nome_es: 'Entorno y Refugio',
                emoji: '🏠', icone: 'House',
                itens: [
                    { id: 'canil_01', titulo: 'Área do pet tem abrigo contra sol, chuva e vento forte', titulo_en: 'Pet area has shelter from sun, rain and strong wind', titulo_es: 'El área de la mascota tiene refugio contra el sol, la lluvia y el viento fuerte', titulo_ptpt: 'A área do animal tem abrigo contra o sol, a chuva e o vento forte', tipo: 'normal', tags: ['conforto'] },
                    { id: 'canil_02', titulo: 'Piso da área é fácil de limpar e antiderrapante (sem acúmulo de urina e fezes)', titulo_en: 'Floor is easy to clean and non-slip (no build-up of urine and feces)', titulo_es: 'El piso del área es fácil de limpiar y antideslizante (sin acumulación de orina y heces)', titulo_ptpt: 'O chão da área é fácil de limpar e antiderrapante (sem acumulação de urina e fezes)', tipo: 'normal', tags: ['saúde'] },
                    { id: 'canil_03', titulo: 'Plantas tóxicas para animais (comigo-ninguém-pode, lírio, espada-de-são-jorge) ficam fora do alcance do animal', titulo_en: 'Plants toxic to animals (dumb cane, lilies, snake plant) are out of the animal\'s reach', titulo_es: 'Las plantas tóxicas para animales (difenbaquia, lirio, lengua de suegra) están fuera del alcance del animal', titulo_ptpt: 'As plantas tóxicas para animais (dieffenbachia, lírio, língua-de-sogra) ficam fora do alcance do animal', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'canil_04', titulo: 'Produtos carrapaticidas, venenos e produtos químicos de limpeza ficam fora do alcance do animal', titulo_en: 'Tick treatments, poisons and cleaning chemicals are kept out of the animal\'s reach', titulo_es: 'Garrapaticidas, venenos y productos de limpieza están fuera del alcance del animal', titulo_ptpt: 'Carraticidas, venenos e produtos de limpeza ficam fora do alcance do animal', tipo: 'perigo', tags: ['intoxicação'] },
                ],
            },
            {
                nome: 'Segurança e Prevenção de Fugas', nome_en: 'Security and Escape Prevention', nome_es: 'Seguridad y Prevención de Fugas',
                emoji: '🐕', icone: 'Dog',
                itens: [
                    { id: 'canil_05', titulo: 'Portões e cercas estão íntegros e sem frestas por onde o animal possa escapar', titulo_en: 'Gates and fences are intact, with no gaps the animal could escape through', titulo_es: 'Portones y cercas están íntegros y sin huecos por donde el animal pueda escapar', titulo_ptpt: 'Portões e vedações estão intactos e sem frestas por onde o animal possa fugir', tipo: 'perigo', tags: ['fuga', 'segurança'] },
                    { id: 'canil_06', titulo: 'Recipientes de água e comida são mantidos limpos e livres de insetos', titulo_en: 'Water and food bowls are kept clean and free of insects', titulo_es: 'Los recipientes de agua y comida se mantienen limpios y libres de insectos', tipo: 'normal', tags: ['saúde'] },
                    { id: 'canil_07', titulo: 'Fios elétricos e cabos estão protegidos ou fora do alcance do animal (risco de mastigação)', titulo_en: 'Electrical wires and cables are protected or out of the animal\'s reach (chewing risk)', titulo_es: 'Los cables eléctricos están protegidos o fuera del alcance del animal (riesgo de mordida)', tipo: 'perigo', tags: ['choque'] },
                    { id: 'canil_08', titulo: 'Lixeiras têm tampa pesada ou trava, para o animal não alcançar restos perigosos', titulo_en: 'Bins have heavy lids or latches so the animal cannot reach dangerous scraps', titulo_es: 'Los cubos de basura tienen tapa pesada o cierre, para que el animal no alcance restos peligrosos', titulo_ptpt: 'Os caixotes do lixo têm tampa pesada ou fecho, para o animal não chegar a restos perigosos', tipo: 'perigo', tags: ['intoxicação', 'corte'] },
                    { id: 'canil_09', titulo: 'Em caso de evacuação, coleira, guia e caixa de transporte estão à mão', titulo_en: 'In case of evacuation, collar, leash and carrier are close at hand', titulo_es: 'En caso de evacuación, collar, correa y transportín están a mano', titulo_ptpt: 'Em caso de evacuação, coleira, trela e transportadora estão à mão', tipo: 'sugestão', tags: ['evacuação'] },
                ],
            },
        ],
    },
};
