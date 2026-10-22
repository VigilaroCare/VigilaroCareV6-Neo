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
        descricao: 'Lazer sem tropeços e com móveis estáveis.',
        descricao_en: 'Leisure without tripping and with stable furniture.',
        descricao_es: 'Ocio sin tropiezos y con muebles estables.',
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
        descricao: 'O local de maior risco (queimaduras e cortes). Atenção total!',
        descricao_en: 'The highest risk area (burns and cuts). Full attention!',
        descricao_es: 'El área de mayor riesgo (quemaduras y cortes). ¡Atención total!',
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
        descricao: 'Ninho seguro: Combate ao sufocamento e quedas.',
        descricao_en: 'Safe nest: Prevention of suffocation and falls.',
        descricao_es: 'Nido seguro: Prevención de asfixia y caídas.',
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
        descricao: 'Medicamentos trancados e ambiente relaxante.',
        descricao_en: 'Locked medications and relaxing environment.',
        descricao_es: 'Medicamentos bajo llave y ambiente relajante.',
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
        descricao: 'Autonomia com zero barreiras. Prevenção de quedas.',
        descricao_en: 'Autonomy with zero barriers. Fall prevention.',
        descricao_es: 'Autonomía sin barreras. Prevención de caídas.',
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
        descricao: 'Evite quedas e afogamentos. Um santuário de segurança.',
        descricao_en: 'Prevent falls and drowning. A safety sanctuary.',
        descricao_es: 'Evita caídas y ahogamientos. Un santuario de seguridad.',
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
        descricao: 'Produtos químicos no alto e baldes vazios. Área técnica segura.',
        descricao_en: 'Chemicals stored high and empty buckets. Safe utility area.',
        descricao_es: 'Productos químicos en alto y cubetas vacías. Área técnica segura.',
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
        descricao: 'Organização evita quedas e contaminação por roedores.',
        descricao_en: 'Organization prevents falls and rodent contamination.',
        descricao_es: 'La organización evita caídas y contaminación por roedores.',
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
        descricao: 'Ferramentas afiadas longe de crianças. Ventilação adequada.',
        descricao_en: 'Sharp tools away from children. Adequate ventilation.',
        descricao_es: 'Herramientas afiladas lejos de los niños. Ventilación adecuada.',
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
        descricao: 'Organização anula abrigo para aranhas e escorpiões.',
        descricao_en: 'Organization eliminates shelter for spiders and scorpions.',
        descricao_es: 'La organización elimina el refugio para arañas y escorpiones.',
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
        descricao: 'Risco alto de umidade, mofo e acúmulo de gases tóxicos.',
        descricao_en: 'High risk of moisture, mold and toxic gas accumulation.',
        descricao_es: 'Alto riesgo de humedad, moho y acumulación de gases tóxicos.',
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
        descricao: 'Ventilação e validade. Prevenção de explosões.',
        descricao_en: 'Ventilation and expiration date. Explosion prevention.',
        descricao_es: 'Ventilación y fecha de caducidad. Prevención de explosiones.',
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
                    { id: 'ambiente_integrado_04', titulo: 'Facas e ferramentas de corte guardadas de forma segura e inacessíveis a crianças/pets', titulo_en: 'Knives and cutting tools stored safely and inaccessible to children/pets', titulo_es: 'Cuchillos y herramientas de corte guardados de forma segura e inaccesibles para niños/mascotas', titulo_ptpt: 'Facas e ferramentas de corte guardadas de forma segura e inacessíveis a crianças/animais', tipo: 'perigo', tags: ['corte', 'crianças'] }
                ]
            },
            {
                nome: 'Estar e Layout',
                nome_en: 'Living and Layout',
                nome_es: 'Sala y Diseño',
                nome_ptpt: 'Estar e Layout',
                emoji: '🛋️', icone: 'Armchair',
                itens: [
                    { id: 'ambiente_integrado_05', titulo: 'TVs, estantes ou móveis altos fixados na parede (anti-tombamento)', titulo_en: 'TVs, shelving units or tall furniture secured to the wall (anti-tip)', titulo_es: 'Televisores, estanterías o muebles altos fijados a la pared (antivuelco)', titulo_ptpt: 'TVs, estantes ou móveis altos fixados na parede (anti-queda)', tipo: 'perigo', tags: ['tombamento'] },
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
                    { id: 'ambiente_integrado_10', titulo: 'O carregador de telemóvel/celular fica desligado da tomada se não estiver em uso', titulo_en: 'Phone charger unplugged from the outlet when not in use', titulo_es: 'Cargador de móvil/celular desenchufado de la toma de corriente si no está en uso', titulo_ptpt: 'O carregador de telemóvel fica desligado da tomada se não estiver a ser utilizado', tipo: 'perigo', tags: ['choque', 'incêndio'] },
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
                    { id: 'cozinha_02', titulo: 'Você prioriza o uso das bocas traseiras do fogão durante o preparo?', titulo_en: 'Do you prioritize using the back burners of the stove while cooking?', titulo_es: '¿Prioriza el uso de los quemadores traseros de la estufa durante la preparación?', tipo: 'sugestão', tags: ['prevenção'] },
                    { id: 'cozinha_03', titulo: 'A porta do forno possui trava de segurança funcional?', titulo_en: 'Does the oven door have a functional safety lock?', titulo_es: '¿La puerta del horno tiene un cierre de seguridad funcional?', tipo: 'perigo', tags: ['crianças'] },
                    { id: 'cozinha_04', titulo: 'Eletroportáteis que geram calor extremo (AirFryer, Forno Elétrico, Torradeira) são deixados para esfriar fora do alcance infantil antes de serem guardados?', titulo_en: 'Are heat-generating appliances (AirFryer, Electric Oven, Toaster) left to cool out of children\'s reach before being stored?', titulo_es: '¿Los electrodomésticos que generan calor extremo (AirFryer, Horno Eléctrico, Tostadora) se dejan enfriar fuera del alcance de los niños antes de guardarlos?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                    { id: 'cozinha_05', titulo: 'Os cabos de Airfryers ou Fornos não ficam soltos ou pendurados para fora da bancada durante o uso (evitando puxões)?', titulo_en: 'Are cables of Airfryers or Ovens not left loose or hanging off the counter during use (avoiding pulls)?', titulo_es: '¿Los cables de las freidoras de aire o los hornos no quedan sueltos o colgando fuera de la encimera durante su uso (evitando tirones)?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                    { id: 'cozinha_06', titulo: 'As toalhas de mesa são curtas (evitando puxões ou quedas de líquidos quentes)?', titulo_en: 'Are tablecloths short (avoiding pulls or spills of hot liquids)?', titulo_es: '¿Los manteles son cortos (evitando tirones o derrames de líquidos calientes)?', tipo: 'perigo', tags: ['queimadura', 'crianças'] },
                    { id: 'cozinha_07', titulo: 'Luvas térmicas estão em local visível e de fácil acesso?', titulo_en: 'Are oven mitts in a visible and easily accessible location?', titulo_es: '¿Los guantes térmicos están en un lugar visible y de fácil acceso?', tipo: 'normal', tags: ['segurança'] },
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
                    { id: 'cozinha_13', titulo: 'Facas e tesouras guardadas em gavetas altas ou com travas magnéticas', titulo_en: 'Knives and scissors stored in high drawers or with magnetic locks', titulo_es: 'Cuchillos y tijeras guardados en cajones altos o con cerraduras magnéticas', tipo: 'perigo', tags: ['corte', 'crianças'] },
                    { id: 'cozinha_14', titulo: 'Vidros e louças quebradas descartados em caixas rígidas (ex: leite) antes do lixo', titulo_en: 'Broken glass and dishes discarded in rigid boxes (e.g., milk cartons) before trashing', titulo_es: 'Vidrios y vajillas rotas desechados en cajas rígidas (ej: leche) antes de tirarlos a la basura', tipo: 'normal', tags: ['corte'] },
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
                    { id: 'banheiro_01', titulo: 'Piso do box possui tapete de borracha antiderrapante', titulo_en: 'Shower floor has non-slip rubber mat', titulo_es: 'El piso de la ducha tiene una alfombra de goma antideslizante', tipo: 'perigo', tags: ['queda'] },
                    { id: 'banheiro_02', titulo: 'Barras de apoio instaladas dentro do box e ao lado do vaso', titulo_en: 'Grab bars installed inside the shower and next to the toilet', titulo_es: 'Barras de apoyo instaladas dentro de la ducha y junto al inodoro', tipo: 'sugestão', tags: ['idosos', 'acessibilidade'] },
                    { id: 'banheiro_03', titulo: 'Piso fora do box é mantido seco após o uso', titulo_en: 'Floor outside the shower is kept dry after use', titulo_es: 'El piso fuera de la ducha se mantiene seco después de su uso', tipo: 'normal', tags: ['queda'] },
                ],
            },
            {
                nome: 'Segurança Geral', nome_en: 'General Safety', nome_es: 'Seguridad General',
                emoji: '🛡️', icone: 'ShieldCheck',
                itens: [
                    { id: 'banheiro_04', titulo: 'Baldes e bacias são guardados vazios e virados para baixo?', titulo_en: 'Are buckets and basins stored empty and turned upside down?', titulo_es: '¿Se guardan los cubos y palanganas vacíos y boca abajo?', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'banheiro_05', titulo: 'O box é de vidro temperado e possui película de segurança?', titulo_en: 'Is the shower enclosure made of tempered glass and has a safety film?', titulo_es: '¿La mampara es de vidrio templado y tiene una película de seguridad?', tipo: 'normal', tags: ['corte'] },
                    { id: 'banheiro_06', titulo: 'Medicamentos e lâminas estão trancados ou fora do alcance visual?', titulo_en: 'Are medicines and razors locked or out of sight?', titulo_es: '¿Los medicamentos y las maquinillas de afeitar están bajo llave o fuera de la vista?', tipo: 'perigo', tags: ['intoxicação', 'corte'] },
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
                    { id: 'sala_01', titulo: 'TVs e estantes altas fixadas na parede (anti-tombamento)', titulo_en: 'TVs and tall bookcases fixed to the wall (anti-tip)', titulo_es: 'Televisores y estanterías altas fijadas a la pared (antivuelco)', tipo: 'perigo', tags: ['tombamento'] },
                    { id: 'sala_02', titulo: 'Quinas de mesas e painéis baixos possuem protetores de silicone', titulo_en: 'Table corners and low panels have silicone protectors', titulo_es: 'Las esquinas de mesas y paneles bajos tienen protectores de silicona', tipo: 'normal', tags: ['impacto'] },
                    { id: 'sala_03', titulo: 'Caminho de circulação está totalmente livre de obstáculos', titulo_en: 'Circulation path is completely free of obstacles', titulo_es: 'El camino de circulación está totalmente libre de obstáculos', tipo: 'normal', tags: ['acessibilidade'] },
                    { id: 'sala_04', titulo: 'Tapetes soltos removidos ou fixados com fita dupla face no chão', titulo_en: 'Loose rugs removed or fixed with double-sided tape to the floor', titulo_es: 'Alfombras sueltas retiradas o fijadas con cinta de doble cara al suelo', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sala_05', titulo: 'Existem rampas ou escadinhas para acesso aos móveis altos (sofá) para o pet?', titulo_en: 'Are there ramps or steps to access high furniture (sofa) for the pet?', titulo_es: '¿Hay rampas o escalones para acceder a muebles altos (sofá) para la mascota?', tipo: 'sugestão', tags: ['pet_idoso', 'pet_mobilidade'] },
                    { id: 'sala_06', titulo: 'Os móveis mantêm uma disposição constante para facilitar a orientação espacial do pet cego ou com déficit cognitivo?', titulo_en: 'Do furniture keep a constant arrangement to facilitate the spatial orientation of blind or cognitively impaired pets?', titulo_es: '¿Los muebles mantienen una disposición constante para facilitar la orientación espacial de la mascota ciega o con déficit cognitivo?', tipo: 'normal', tags: ['pet_visao_reduzida', 'disfuncao_cognitiva'] },
                ],
            },
            {
                nome: 'Elétrica e Janelas', nome_en: 'Electrical and Windows', nome_es: 'Eléctrico y Ventanas',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'sala_07', titulo: 'Fios elétricos organizados ou protegidos em canaletas', titulo_en: 'Electrical wires organized or protected in conduits', titulo_es: 'Cables eléctricos organizados o protegidos en canaletas', tipo: 'normal', tags: ['tropeço'] },
                    { id: 'sala_08', titulo: 'Janelas e basculantes possuem redes de proteção instaladas', titulo_en: 'Windows and transoms have safety nets installed', titulo_es: 'Ventanas y tragaluces tienen redes de protección instaladas', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sala_09', titulo: 'Carregadores de celular fora da tomada se não usados (risco bucal e de incêndio)', titulo_en: 'Cell phone chargers unplugged if not used (mouth and fire risk)', titulo_es: 'Cargadores de celular desenchufados si no se usan (riesgo bucal y de incendio)', tipo: 'perigo', tags: ['choque'] },
                ],
            },
            {
                nome: 'Objetos Perigosos', nome_en: 'Dangerous Objects', nome_es: 'Objetos Peligrosos',
                emoji: '🍷', icone: 'Wine',
                itens: [
                    { id: 'sala_10', titulo: 'Bebidas alcoólicas trancadas ou totalmente fora do alcance visual', titulo_en: 'Alcoholic beverages locked or totally out of sight', titulo_es: 'Bebidas alcohólicas bajo llave o totalmente fuera de la vista', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'sala_11', titulo: 'Controles remotos possuem o compartimento de pilha botão parafusado', titulo_en: 'Remote controls have the button battery compartment screwed shut', titulo_es: 'Los controles remotos tienen el compartimento de la pila de botón atornillado', tipo: 'perigo', tags: ['ingestão'] },
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
                    { id: 'quarto_idoso_05', titulo: 'Caminho até o banheiro 100% livre de móveis ou objetos', titulo_en: 'Path to the bathroom 100% free of furniture or objects', titulo_es: 'Camino al baño 100% libre de muebles u objetos', tipo: 'perigo', tags: ['acessibilidade'] },
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
                    { id: 'area_servico_01', titulo: 'Produtos de limpeza estritamente no alto e trancados', titulo_en: 'Cleaning products strictly high up and locked', titulo_es: 'Productos de limpieza estrictamente en alto y bajo llave', tipo: 'perigo', tags: ['intoxicação'] },
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
                    { id: 'quintal_02', titulo: 'Mato mantido baixo e sobrocado', titulo_en: 'Weeds kept low and trimmed', titulo_es: 'Maleza mantenida baja y recortada', tipo: 'normal', tags: ['manutenção'] },
                    { id: 'quintal_03', titulo: 'Inspeção regular contra focos de água parada (Dengue)', titulo_en: 'Regular inspection against stagnant water sources (Dengue)', titulo_es: 'Inspección regular contra focos de agua estancada (Dengue)', tipo: 'perigo', tags: ['saúde'] },
                ],
            },
            {
                nome: 'Estrutura', nome_en: 'Structure', nome_es: 'Estructura',
                emoji: '🧱', icone: 'Wall',
                itens: [
                    { id: 'quintal_04', titulo: 'Piso plano, sem buracos ou desníveis perigosos disfarçados', titulo_en: 'Flat floor, no hidden dangerous holes or unevenness', titulo_es: 'Piso plano, sin agujeros ocultos ni desniveles peligrosos', tipo: 'normal', tags: ['queda'] },
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
                    { id: 'parquinho_06', titulo: 'Supervisão visual constante, garantindo que as crianças nunca fiquem sozinhas', titulo_en: 'Constant visual supervision, ensuring children are never left alone', titulo_es: 'Supervisión visual constante, asegurando que los niños nunca se queden solos', tipo: 'perigo', tags: ['supervisão'] },
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
                    { id: 'piscina_01', titulo: 'Piscina é devidamente cercada (mínimo 1.20m) com portão e trava automática', titulo_en: 'Pool is properly fenced (minimum 1.20m) with automatic gate and lock', titulo_es: 'La piscina está debidamente cercada (mínimo 1.20m) con puerta y cerradura automática', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'piscina_02', titulo: 'Uso de capa firme de segurança que suporta peso (evitando criar bolsão "envelope")', titulo_en: 'Use of a firm safety cover that supports weight (avoiding "envelope" pockets)', titulo_es: 'Uso de cubierta de seguridad firme que soporta peso (evitando crear bolsillos "sobre")', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'piscina_03', titulo: 'Alarmes de detecção de movimento ativos instalados na superfície da água', titulo_en: 'Active motion detection alarms installed on the water surface', titulo_es: 'Alarmas activas de detección de movimiento instaladas en la superficie del agua', tipo: 'sugestão', tags: ['tecnologia'] },
                ],
            },
            {
                nome: 'Comportamento', nome_en: 'Behavior', nome_es: 'Comportamiento',
                emoji: '👀', icone: 'Eye',
                itens: [
                    { id: 'piscina_04', titulo: 'Supervisão visual direta e engajada (sem uso de celular) mantida durante uso', titulo_en: 'Direct and engaged visual supervision (no phone use) maintained during use', titulo_es: 'Supervisión visual directa y comprometida (sin uso del celular) mantenida durante el uso', tipo: 'perigo', tags: ['supervisão'] },
                    { id: 'piscina_05', titulo: 'Brinquedos removidos da piscina após uso (evitando atrativo para crianças)', titulo_en: 'Toys removed from pool after use (avoiding attraction for children)', titulo_es: 'Juguetes removidos de la piscina después del uso (evitando atracción para niños)', tipo: 'normal', tags: ['prevenção'] },
                    { id: 'piscina_06', titulo: 'Ralos modernos do modelo anti-aprisionamento de cabelos', titulo_en: 'Modern drains with anti-hair entrapment models', titulo_es: 'Desagües modernos del modelo anti-atrapamiento de cabello', tipo: 'perigo', tags: ['segurança'] },
                    { id: 'piscina_07', titulo: 'Piscina possui rampa ou escada interna para saída autônoma de pets (Segurança 3D)', titulo_en: 'Pool has a ramp or internal stairs for autonomous pet exit (3D Safety)', titulo_es: 'La piscina tiene rampa o escalera interna para la salida autónoma de mascotas (Seguridad 3D)', tipo: 'perigo', tags: ['afogamento', 'pets'] },
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
                    { id: 'central_gas_02', titulo: 'Botijões protegidos de sol forte, chuva contínua e longe de ralos (para o gás não descer)', titulo_en: 'Cylinders protected from strong sun, continuous rain, and away from drains (so gas doesn\'t sink)', titulo_es: 'Cilindros protegidos del sol fuerte, lluvia continua y lejos de desagües (para que el gas no baje)', tipo: 'normal', tags: ['manutenção'] },
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
                    { id: 'quarto_crianca_01', titulo: 'Brinquedos possuem selo de certificação de segurança', titulo_en: 'Toys carry a safety certification mark', titulo_es: 'Los juguetes llevan un sello de certificación de seguridad', titulo_ptpt: 'Os brinquedos têm marca de certificação de segurança', tipo: 'normal', tags: ['qualidade'] },
                    { id: 'quarto_crianca_02', titulo: 'Verificado pelo "Teste do Rolo de Papel" (peças pequenas que passam no rolo de papel higiênico são banidas)', titulo_en: 'Verified by the "Toilet Paper Roll Test" (small parts that pass through a toilet paper roll are banned)', titulo_es: 'Verificado por la "Prueba del rollo de papel" (piezas pequeñas que pasan por el rollo de papel higiénico están prohibidas)', tipo: 'sugestão', tags: ['asfixia'] },
                    { id: 'quarto_crianca_03', titulo: 'Brinquedos de pilha possuem o compartimento travado e parafusado', titulo_en: 'Battery toys have the compartment locked and screwed shut', titulo_es: 'Los juguetes a pilas tienen el compartimento cerrado con llave y atornillado', tipo: 'perigo', tags: ['bateria'] },
                    { id: 'quarto_crianca_04', titulo: 'Bexigas/Balões são usados sob supervisão rigorosa (risco alto de asfixia em caso de estouro)', titulo_en: 'Balloons are used under strict supervision (high risk of choking if popped)', titulo_es: 'Los globos se usan bajo estricta supervisión (alto riesgo de asfixia en caso de estallido)', tipo: 'perigo', tags: ['asfixia'] },
                ],
            },
            {
                nome: 'Cuidado no Banho (Área Molhada)', nome_en: 'Bath Care (Wet Area)', nome_es: 'Cuidado en el Baño (Área Húmeda)',
                emoji: '🛁', icone: 'Bathtub',
                itens: [
                    { id: 'quarto_crianca_05', titulo: 'Tampa do vaso sanitário possui trava física de engate antiafogamento', titulo_en: 'Toilet lid has a physical anti-drowning catch lock', titulo_es: 'La tapa del inodoro tiene un cierre físico de enganche antiahogamiento', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'quarto_crianca_06', titulo: 'Banheira é esvaziada instantaneamente após o término do uso', titulo_en: 'Bathtub is emptied instantly after use', titulo_es: 'La bañera se vacía instantáneamente después de su uso', tipo: 'perigo', tags: ['afogamento'] },
                    { id: 'quarto_crianca_07', titulo: 'Criança tem supervisão ininterrupta durante 100% do tempo do banho', titulo_en: 'Child has uninterrupted supervision during 100% of bath time', titulo_es: 'El niño tiene supervisión ininterrumpida durante el 100% del tiempo del baño', tipo: 'perigo', tags: ['supervisão'] },
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
                nome: 'Proteção Ambiental e Gases', nome_en: 'Environmental Protection and Gases', nome_es: 'Protección Ambiental y Gases',
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
                    { id: 'garagem_04', titulo: 'Inexistem materiais e fluídos inflamáveis estocados nesta área', titulo_en: 'There are no flammable materials and fluids stored in this area', titulo_es: 'No hay materiales y fluidos inflamables almacenados en esta área', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'garagem_05', titulo: 'Entulhos ausentes, garantindo livre circulação das portas do veículo', titulo_en: 'Absent debris, ensuring free circulation from vehicle doors', titulo_es: 'Ausencia de escombros, garantizando la libre circulación de las puertas del vehículo', tipo: 'normal', tags: ['acessibilidade'] },
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
                    { id: 'hall_corredor_04', titulo: 'Caminho até a saída principal está 100% livre de obstáculos em qualquer horário', titulo_en: 'Path to the main exit is 100% free of obstacles at all times', titulo_es: 'El camino hacia la salida principal está 100% libre de obstáculos en todo momento', tipo: 'perigo', tags: ['evacuação'] },
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
                    { id: 'jardim_horta_04', titulo: 'Fertilizantes e venenos ficam trancados rigorosamente na embalagem original', titulo_en: 'Fertilizers and poisons are strictly locked in their original packaging', titulo_es: 'Los fertilizantes y venenos están estrictamente bajo llave en su envase original', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'jardim_horta_05', titulo: 'Tesouras de poda e serras estão travadas e guardadas fora de alcance', titulo_en: 'Pruning shears and saws are locked and stored out of reach', titulo_es: 'Tijeras de podar y sierras están cerradas y guardadas fuera del alcance', tipo: 'perigo', tags: ['corte'] },
                    { id: 'jardim_horta_06', titulo: 'Ferramentas são limpas após o uso (jamais largadas no chão do jardim)', titulo_en: 'Tools are cleaned after use (never left on the garden floor)', titulo_es: 'Las herramientas se limpian después de su uso (nunca se dejan en el suelo del jardín)', tipo: 'normal', tags: ['organização'] },
                ],
            },
            {
                nome: 'Proteção Pessoal (EPI)', nome_en: 'Personal Protection (PPE)', nome_es: 'Protección Personal (EPI)',
                emoji: '🧤', icone: 'Hand',
                itens: [
                    { id: 'jardim_horta_07', titulo: 'Manuseio da terra vegetal ocorre com uso rotineiro de luvas e botas fechadas', titulo_en: 'Potting soil handled with routine use of gloves and closed boots', titulo_es: 'Manejo de la tierra con uso rutinario de guantes y botas cerradas', tipo: 'normal', tags: ['biológico'] },
                    { id: 'jardim_horta_08', titulo: 'Uso padronizado de proteção ocular ao manipular produtos químicos em spray ou galhos finos', titulo_en: 'Standard use of eye protection when handling chemical sprays or thin branches', titulo_es: 'Uso estandarizado de protección ocular al manipular aerosoles químicos o ramas finas', tipo: 'sugestão', tags: ['epi'] },
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
                    { id: 'oficina_02', titulo: 'Serras e lâminas de corte cortantes estão devidamente trancadas', titulo_en: 'Saws and sharp cutting blades are properly locked', titulo_es: 'Sierras y cuchillas de corte afiladas están debidamente bloqueadas', tipo: 'perigo', tags: ['corte'] },
                    { id: 'oficina_03', titulo: 'Nível de ventilação extra e iluminação são adequados ao ambiente', titulo_en: 'Extra ventilation and lighting levels are adequate for the environment', titulo_es: 'El nivel de ventilación extra y la iluminación son adecuados para el entorno', tipo: 'normal', tags: ['saúde'] },
                    { id: 'oficina_04', titulo: 'Uso de equipamento de Proteção Individual (óculos, luvas) sempre acessível', titulo_en: 'Use of Personal Protective Equipment (glasses, gloves) always accessible', titulo_es: 'Uso de Equipo de Protección Personal (gafas, guantes) siempre accesible', tipo: 'sugestão', tags: ['proteção'] },
                ],
            },
            {
                nome: 'Segurança Elétrica e Combustível', nome_en: 'Electrical and Fuel Safety', nome_es: 'Seguridad Eléctrica y de Combustibles',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'oficina_05', titulo: 'Extintor de incêndio (tipo ABC) presente e com validade conferida', titulo_en: 'Fire extinguisher (type ABC) present and validity checked', titulo_es: 'Extintor de incendios (tipo ABC) presente y validez comprobada', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'oficina_06', titulo: 'Tomadas e extensões não sobrecarregadas (sem "benjamin" em cascata)', titulo_en: 'Outlets and extensions not overloaded (no cascaded "power strips")', titulo_es: 'Enchufes y extensiones no sobrecargados (sin "regletas" en cascada)', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'oficina_07', titulo: 'Porta da oficina trancada quando não em uso (impedindo acesso infantil)', titulo_en: 'Workshop door locked when not in use (preventing children\'s access)', titulo_es: 'Puerta del taller cerrada con llave cuando no está en uso (impidiendo el acceso de los niños)', tipo: 'perigo', tags: ['crianças', 'segurança'] },
                ],
            },
        ],
    },

    varanda: {
        categorias: [
            {
                nome: 'Blindagem de Altura', nome_en: 'Height Shielding', nome_es: 'Blindaje de Altura',
                emoji: '🏙️', icone: 'Buildings',
                itens: [
                    { id: 'varanda_01', titulo: 'Rede de proteção certificada instalada em toda a extensão do vão', titulo_en: 'Certified safety net installed along the entire length of the span', titulo_es: 'Red de protección certificada instalada en toda la longitud del espacio', tipo: 'perigo', tags: ['queda'] },
                    { id: 'varanda_02', titulo: 'Ausência de móveis ou vasos próximos ao guarda-corpo (eliminando o "efeito escada")', titulo_en: 'Absence of furniture or pots near the guardrail (eliminating the "ladder effect")', titulo_es: 'Ausencia de muebles o macetas cerca de la barandilla (eliminando el "efecto escalera")', tipo: 'perigo', tags: ['queda', 'crianças'] },
                    { id: 'varanda_03', titulo: 'Piso é antiderrapante (mesmo sendo molhado com chuva)', titulo_en: 'Floor is non-slip (even when wet with rain)', titulo_es: 'El piso es antideslizante (incluso cuando está mojado por la lluvia)', tipo: 'normal', tags: ['queda'] },
                ],
            },
            {
                nome: 'Segurança Complementar', nome_en: 'Complementary Safety', nome_es: 'Seguridad Complementaria',
                emoji: '🛡️', icone: 'ShieldCheck',
                itens: [
                    { id: 'varanda_04', titulo: 'Vasos de plantas não obstruem a passagem e estão fixados (sem risco de queda por vento)', titulo_en: 'Plant pots do not obstruct the passage and are fixed (no risk of falling from wind)', titulo_es: 'Las macetas no obstruyen el paso y están fijas (sin riesgo de caída por el viento)', tipo: 'normal', tags: ['queda', 'organização'] },
                    { id: 'varanda_05', titulo: 'Churrasqueira de varanda (se houver) possui ventilação adequada e extensão do gás conferida', titulo_en: 'Balcony grill (if any) has proper ventilation and checked gas extension', titulo_es: 'La parrilla del balcón (si la hay) tiene ventilación adecuada y extensión de gas verificada', tipo: 'perigo', tags: ['incêndio', 'gás'] },
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
                    { id: 'despensa_03', titulo: 'Grãos crus (feijão, milho) ficam trancados em potes (risco de asfixia/nariz)', titulo_en: 'Raw grains (beans, corn) are locked in jars (choking/nose risk)', titulo_es: 'Los granos crudos (frijoles, maíz) están encerrados en frascos (riesgo de asfixia/nariz)', tipo: 'sugestão', tags: ['crianças'] },
                ],
            },
        ],
    },

    deposito: {
        categorias: [
            {
                nome: 'Ordem e Progresso', nome_en: 'Order and Progress', nome_es: 'Orden y Progreso',
                emoji: '📦', icone: 'Package',
                itens: [
                    { id: 'deposito_01', titulo: 'Ambiente se mantém limpo e ventilado (anulando atrativo para aranhas)', titulo_en: 'Environment remains clean and ventilated (nullifying attraction for spiders)', titulo_es: 'El entorno se mantiene limpio y ventilado (anulando la atracción para las arañas)', tipo: 'normal', tags: ['pragas'] },
                    { id: 'deposito_02', titulo: 'Itens pesados apoiados no chão (nunca em prateleiras altas e instáveis)', titulo_en: 'Heavy items supported on the floor (never on high, unstable shelves)', titulo_es: 'Artículos pesados apoyados en el suelo (nunca en estantes altos e inestables)', tipo: 'perigo', tags: ['esmagamento'] },
                    { id: 'deposito_03', titulo: 'Corredores internos de circulação se abrem totalmente livres', titulo_en: 'Internal circulation corridors open up completely free', titulo_es: 'Los pasillos de circulación interna se abren totalmente libres', tipo: 'normal', tags: ['acessibilidade'] },
                ],
            },
            {
                nome: 'Prevenção de Riscos', nome_en: 'Risk Prevention', nome_es: 'Prevención de Riesgos',
                emoji: '⚠️', icone: 'Warning',
                itens: [
                    { id: 'deposito_04', titulo: 'Inexistem materiais inflamáveis armazenados próximos a fontes de calor ou instalações elétricas', titulo_en: 'There are no flammable materials stored near heat sources or electrical installations', titulo_es: 'No hay materiales inflamables almacenados cerca de fuentes de calor o instalaciones eléctricas', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'deposito_05', titulo: 'Inspeção periódica de frestas e ralos contra escorpiões e aranhas-marrom', titulo_en: 'Periodic inspection of cracks and drains against scorpions and brown spiders', titulo_es: 'Inspección periódica de grietas y desagües contra escorpiones y arañas pardas', tipo: 'perigo', tags: ['animais_peçonhentos'] },
                    { id: 'deposito_06', titulo: 'Porta do depósito possui trava que impede acesso de crianças sem supervisão', titulo_en: 'Storage door has a lock that prevents unsupervised children\'s access', titulo_es: 'La puerta de almacenamiento tiene una cerradura que impide el acceso de los niños sin supervisión', tipo: 'sugestão', tags: ['crianças', 'segurança'] },
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
                nome: 'Estrutura e Acesso',
                emoji: '🪜', icone: 'Ladder',
                itens: [
                    { id: 'sotao_01', titulo: 'Escada de acesso (fixa ou retrátil) é firme e suporta peso com segurança', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sotao_02', titulo: 'Piso do sótão é forrado adequadamente (sem risco de pisar em falso no gesso/forro)', tipo: 'perigo', tags: ['queda'] },
                    { id: 'sotao_03', titulo: 'Iluminação é suficiente para inspecionar cantos escuros', tipo: 'normal', tags: ['visão'] },
                ],
            },
            {
                nome: 'Clima e Pragas',
                emoji: '🦇', icone: 'Bird',
                itens: [
                    { id: 'sotao_04', titulo: 'Telhado inspecionado periodicamente contra goteiras que afetem fiação elétrica', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'sotao_05', titulo: 'Ventilação adequada para evitar superaquecimento no verão', tipo: 'sugestão', tags: ['conforto'] },
                    { id: 'sotao_06', titulo: 'Livre de ninhos de pássaros, morcegos, ratos ou cupins nas vigas', tipo: 'perigo', tags: ['biológico', 'pragas'] },
                ],
            },
            {
                nome: 'Armazenamento',
                emoji: '📦', icone: 'Package',
                itens: [
                    { id: 'sotao_07', titulo: 'Caixas pesadas são armazenadas nas bordas ou sobre vigas de sustentação', tipo: 'normal', tags: ['estrutura'] },
                    { id: 'sotao_08', titulo: 'Nenhum material inflamável ou químico estocado próximo ao calor do telhado', tipo: 'perigo', tags: ['incêndio'] },
                ],
            },
        ],
    },

    porao: {
        categorias: [
            {
                nome: 'Qualidade do Ar e Umidade',
                emoji: '💧', icone: 'Drop',
                itens: [
                    { id: 'porao_01', titulo: 'Ambiente livre de mofo negro e infiltrações severas nas paredes', tipo: 'perigo', tags: ['respiratório', 'saúde'] },
                    { id: 'porao_02', titulo: 'Ventilação mecânica ou natural presente para evitar acúmulo de gases (ex: radônio, monóxido)', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'porao_03', titulo: 'Ralos possuem sistema de refluxo ou tampa para evitar alagamentos ou invasão de esgoto', tipo: 'perigo', tags: ['higiene'] },
                ],
            },
            {
                nome: 'Segurança Elétrica e Estrutural',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'porao_04', titulo: 'Fiação elétrica não fica exposta à umidade do piso ou paredes', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'porao_05', titulo: 'Escada de descida possui corrimão extremamente firme e iluminação dedicada', tipo: 'perigo', tags: ['queda'] },
                    { id: 'porao_06', titulo: 'Ausência de rachaduras profundas nos pilares de fundação', tipo: 'normal', tags: ['estrutura'] },
                ],
            },
            {
                nome: 'Animais e Pragas',
                emoji: '🕷️', icone: 'Bug',
                itens: [
                    { id: 'porao_07', titulo: 'Inspeção contra aranhas-marrom, escorpiões e roedores feita a cada 6 meses', tipo: 'perigo', tags: ['animais_peçonhentos'] },
                    { id: 'porao_08', titulo: 'Equipamentos e caixas armazenados elevados do chão para evitar danos por umidade e abrigos', tipo: 'normal', tags: ['organização'] },
                ],
            },
        ],
    },

    quarto_adulto: {
        categorias: [
            {
                nome: 'Blindagem do Adulto',
                emoji: '🔒', icone: 'Lock',
                itens: [
                    { id: 'quarto_adulto_01', titulo: 'Medicamentos e cosméticos ficam totalmente fora do alcance ou trancados em gavetas', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'quarto_adulto_02', titulo: 'Objetos cortantes (alicate de unha, tesoura) são guardados de forma altamente segura e fechada', tipo: 'normal', tags: ['corte'] },
                    { id: 'quarto_adulto_03', titulo: 'O carregador de celular fica desconectado e longe da cama na hora de dormir', tipo: 'perigo', tags: ['choque', 'incêndio'] },
                    { id: 'quarto_adulto_04', titulo: 'Cigarros e isqueiros mantidos inacessíveis à curiosidade infantil', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'quarto_adulto_05', titulo: 'Aparelhos conectados diretamente na tomada ou sem sobrecarga com extensões ("benjamins")', tipo: 'normal', tags: ['choque'] },
                ],
            },
        ],
    },

    canil: {
        categorias: [
            {
                nome: 'Ambiente e Abrigo',
                emoji: '🏠', icone: 'House',
                itens: [
                    { id: 'canil_01', titulo: 'Área do pet possui abrigo protegido contra sol direto, chuva e vento forte', tipo: 'normal', tags: ['conforto'] },
                    { id: 'canil_02', titulo: 'Piso da área é liso e fácil de higienizar (sem acúmulo de urina/fezes)', tipo: 'normal', tags: ['saúde'] },
                    { id: 'canil_03', titulo: 'Plantas tóxicas para animais (comigo-ninguém-pode, lírio, espada-de-são-jorge) foram removidas da área de acesso', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'canil_04', titulo: 'Produtos carrapaticidas, venenos e produtos químicos de limpeza ficam completamente inacessíveis ao animal', tipo: 'perigo', tags: ['intoxicação'] },
                ],
            },
            {
                nome: 'Segurança e Prevenção de Fugas',
                emoji: '🐕', icone: 'Dog',
                itens: [
                    { id: 'canil_05', titulo: 'Portões e cercas estão íntegros e sem frestas por onde o animal possa escapar', tipo: 'perigo', tags: ['fuga', 'segurança'] },
                    { id: 'canil_06', titulo: 'Recipientes de água e comida são mantidos limpos e livres de insetos', tipo: 'normal', tags: ['saúde'] },
                    { id: 'canil_07', titulo: 'Fios elétricos e cabos estão protegidos ou fora do alcance do animal (risco de mastigação)', tipo: 'perigo', tags: ['choque'] },
                    { id: 'canil_08', titulo: 'Lixeiras possuem tampas pesadas ou travas para evitar acesso a restos perigosos', tipo: 'perigo', tags: ['intoxicação', 'corte'] },
                    { id: 'canil_09', titulo: 'Em caso de evacuação, coleira, guia e caixa de transporte estão acessíveis rapidamente', tipo: 'sugestão', tags: ['evacuação'] },
                ],
            },
        ],
    },

    kits_prontidao: {
        categorias: [
            {
                nome: 'Equipamentos de Proteção (EPIs)',
                nome_en: 'Personal Protective Equipment (PPE)',
                nome_es: 'Equipos de Protección Personal (EPP)',
                nome_ptpt: 'Equipamentos de Proteção (EPIs)',
                emoji: '🪖', icone: 'HardHat',
                itens: [
                    { id: 'kits_prontidao_01', titulo: 'Óculos de proteção disponíveis para pequenas manutenções ou limpezas químicas', titulo_en: 'Safety glasses available for minor maintenance or chemical cleaning', titulo_es: 'Gafas de seguridad disponibles para pequeños mantenimientos o limpiezas químicas', titulo_ptpt: 'Óculos de proteção disponíveis para pequenas manutenções ou limpezas químicas', tipo: 'perigo', tags: ['visão'] },
                    { id: 'kits_prontidao_02', titulo: 'Luvas de raspa/couro presentes para jardinagem pesada e proteção contra animais peçonhentos', titulo_en: 'Heavy duty leather gloves present for gardening and protection against venomous animals', titulo_es: 'Guantes de cuero disponibles para jardinería pesada y protección contra animales ponzoñosos', titulo_ptpt: 'Luvas de raspa/couro presentes para jardinagem pesada e proteção contra animais peçonhentos', tipo: 'perigo', tags: ['corte', 'animais_peçonhentos'] },
                    { id: 'kits_prontidao_03', titulo: 'Calçados fechados e antiderrapantes são usados rotineiramente em limpeza e no jardim', titulo_en: 'Closed, non-slip footwear is routinely used for cleaning and in the garden', titulo_es: 'Se utiliza calzado cerrado y antideslizante de forma rutinaria en la limpieza y el jardín', titulo_ptpt: 'Calçado fechado e antiderrapante usado rotineiramente na limpeza e no jardim', tipo: 'perigo', tags: ['queda', 'animais_peçonhentos'] },
                    { id: 'kits_prontidao_04', titulo: 'Protetores auriculares (plugue ou concha) disponíveis para uso com ferramentas ruidosas', titulo_en: 'Hearing protectors (plugs or earmuffs) available for use with noisy tools', titulo_es: 'Protectores auditivos (tapones o copas) disponibles para usar con herramientas ruidosas', titulo_ptpt: 'Protetores auriculares (tampões ou concha) disponíveis para uso com ferramentas ruidosas', tipo: 'normal', tags: ['audição'] },
                    { id: 'kits_prontidao_05', titulo: 'Capacete de proteção (ou de ciclista) acessível para manutenções em altura/telhados', titulo_en: 'Safety helmet (or bicycle helmet) accessible for maintenance at heights/roofs', titulo_es: 'Casco de protección (o de ciclista) accesible para mantenimientos en altura/techos', titulo_ptpt: 'Capacete de proteção (ou de ciclista) acessível para manutenções em altura/telhados', tipo: 'sugestão', tags: ['impacto'] }
                ],
            },
            {
                nome: 'Caixa de Ferramentas',
                nome_en: 'Toolbox',
                nome_es: 'Caja de Herramientas',
                nome_ptpt: 'Caixa de Ferramentas',
                emoji: '🧰', icone: 'Toolbox',
                itens: [
                    { id: 'kits_prontidao_06', titulo: 'Ferramentas de corte e perfuração são estritamente isoladas do acesso infantil', titulo_en: 'Cutting and drilling tools are strictly isolated from children\'s access', titulo_es: 'Las herramientas de corte y perforación están estrictamente aisladas del acceso infantil', titulo_ptpt: 'Ferramentas de corte e perfuração são estritamente isoladas do acesso infantil', tipo: 'perigo', tags: ['corte'] },
                    { id: 'kits_prontidao_07', titulo: 'Fita isolante e chave de teste de tensão guardadas na caixa para emergências elétricas', titulo_en: 'Electrical tape and voltage tester stored in the box for electrical emergencies', titulo_es: 'Cinta aislante y probador de voltaje guardados en la caja para emergencias eléctricas', titulo_ptpt: 'Fita isoladora e busca-polos guardados na caixa para emergências elétricas', tipo: 'normal', tags: ['choque'] }
                ],
            },
            {
                nome: 'Kits de Apoio e Emergência',
                nome_en: 'Support and Emergency Kits',
                nome_es: 'Kits de Apoyo y Emergencia',
                nome_ptpt: 'Kits de Apoio e Emergência',
                emoji: '🎒', icone: 'Backpack',
                itens: [
                    { id: 'kits_prontidao_08', titulo: 'Lanterna resistente com pilhas extras ou luz de emergência mantidas funcionais', titulo_en: 'Heavy duty flashlight with extra batteries or emergency light kept functional', titulo_es: 'Linterna resistente con pilas extras o luz de emergencia mantenida funcional', titulo_ptpt: 'Lanterna resistente com pilhas extra ou luz de emergência mantidas funcionais', tipo: 'perigo', tags: ['energia'] },
                    { id: 'kits_prontidao_09', titulo: 'Pilha extra de reserva (lacrada) para os equipamentos de iluminação e emergência', titulo_en: 'Extra backup batteries (sealed) for lighting and emergency equipment', titulo_es: 'Pilas extra de repuesto (selladas) para equipos de iluminación y emergencia', titulo_ptpt: 'Pilhas extra de reserva (seladas) para os equipamentos de iluminação e emergência', tipo: 'normal', tags: ['energia'] },
                    { id: 'kits_prontidao_10', titulo: 'Documentos de identidade e cartilhas de saúde (SUS/Plano) guardados em acesso prioritário', titulo_en: 'Identity documents and health records stored where you can reach them first', titulo_es: 'Documentos de identidad y cartillas de salud guardados en acceso prioritario', titulo_ptpt: 'Documentos de identificação e cadernetas de saúde guardados em acesso prioritário', tipo: 'normal', tags: ['documentos'] },
                    { id: 'kits_prontidao_11', titulo: 'Lista impressa e atualizada de contatos de emergência e apoio afixada', titulo_en: 'Printed and updated list of emergency and support contacts posted', titulo_es: 'Lista impresa y actualizada de contactos de emergencia y apoyo fijada', titulo_ptpt: 'Lista impressa e atualizada de contactos de emergência e apoio afixada', tipo: 'normal', tags: ['comunicação'] },
                ],
            },
            {
                nome: 'Kit de Primeiros Socorros / Curativos',
                nome_en: 'First Aid Kit / Dressings',
                nome_es: 'Kit de Primeros Auxilios / Vendajes',
                nome_ptpt: 'Kit de Primeiros Socorros / Pensos',
                emoji: '🩹', icone: 'Bandaids',
                itens: [
                    { id: 'kits_prontidao_12', titulo: 'Estoque mantido de Antisséptico (Água oxigenada 10v, Clorexidina ou similar)', titulo_en: 'Antiseptic stock maintained (Hydrogen peroxide 10v, Chlorhexidine or similar)', titulo_es: 'Existencias de antiséptico mantenidas (Agua oxigenada 10v, Clorhexidina o similar)', titulo_ptpt: 'Stock mantido de Antisséptico (Água oxigenada 10v, Clorexidina ou similar)', tipo: 'perigo', tags: ['primeiros_socorros'] },
                    { id: 'kits_prontidao_13', titulo: 'Dotação não-vencida de compressas de gaze estéril, esparadrapo e curativos adesivos', titulo_en: 'Unexpired supply of sterile gauze pads, tape and adhesive bandages', titulo_es: 'Suministro no vencido de compresas de gasa estériles, esparadrapo y vendas adhesivas', titulo_ptpt: 'Lote não vencido de compressas de gaze estéril, fita adesiva e pensos rápidos', tipo: 'perigo', tags: ['primeiros_socorros'] },
                    { id: 'kits_prontidao_14', titulo: 'Soro Fisiológico pronto para limpeza imediata de feridas abertas ou olhos', titulo_en: 'Saline solution ready for immediate cleaning of open wounds or eyes', titulo_es: 'Suero fisiológico listo para la limpieza inmediata de heridas abiertas u ojos', titulo_ptpt: 'Soro Fisiológico pronto para limpeza imediata de feridas abertas ou olhos', tipo: 'normal', tags: ['primeiros_socorros'] },
                    { id: 'kits_prontidao_15', titulo: 'Tesoura sem ponta reservada no kit para corte de gazes ou vestimentas', titulo_en: 'Blunt scissors reserved in the kit for cutting gauze or clothing', titulo_es: 'Tijeras sin punta reservadas en el kit para cortar gasas o ropa', titulo_ptpt: 'Tesoura sem ponta reservada no kit para corte de gazes ou vestuário', tipo: 'normal', tags: ['primeiros_socorros'] },
                    { id: 'kits_prontidao_16', titulo: 'Bolsa de gelo ou compressas frias instantâneas para casos de picadas e contusões', titulo_en: 'Ice pack or instant cold packs for stings and bruises', titulo_es: 'Bolsa de hielo o compresas frías instantáneas para picaduras y contusiones', titulo_ptpt: 'Saco de gelo ou compressas frias instantâneas para casos de picadas e contusões', tipo: 'sugestão', tags: ['primeiros_socorros'] }
                ],
            },
            {
                nome: 'Farmácia Caseira',
                nome_en: 'Home Pharmacy',
                nome_es: 'Farmacia Casera',
                nome_ptpt: 'Farmácia Caseira',
                emoji: '💊', icone: 'Pill',
                itens: [
                    { id: 'kits_prontidao_17', titulo: 'Medicamentos estritamente isolados do alcance de crianças ou pets (alto e/ou trancado)', titulo_en: 'Medicines strictly isolated from the reach of children or pets (high up and/or locked)', titulo_es: 'Medicamentos estrictamente aislados del alcance de niños o mascotas (alto y/o cerrado)', titulo_ptpt: 'Medicamentos estritamente isolados do alcance de crianças ou pets (alto e/ou trancado)', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'kits_prontidao_18', titulo: 'Sais de Reidratação Oral (SRO) disponíveis para emergências de desidratação grave', titulo_en: 'Oral Rehydration Salts (ORS) available for severe dehydration emergencies', titulo_es: 'Sales de Rehidratación Oral (SRO) disponibles para emergencias de deshidratación grave', titulo_ptpt: 'Sais de Reidratação Oral (SRO) disponíveis para emergências de desidratação grave', tipo: 'sugestão', tags: ['saúde'] },
                    { id: 'kits_prontidao_19', titulo: 'Medicamentos e insumos conferidos periodicamente, todos estritamente no prazo de validade', titulo_en: 'Medicines and supplies checked periodically, all strictly within expiration date', titulo_es: 'Medicamentos e insumos verificados periódicamente, todos estrictamente dentro de la fecha de caducidad', titulo_ptpt: 'Medicamentos e consumíveis verificados periodicamente, todos estritamente no prazo de validade', tipo: 'perigo', tags: ['intoxicação'] },
                ],
            },
            {
                nome: 'Prontidão Pet',
                nome_en: 'Pet Readiness',
                nome_es: 'Preparación de Mascotas',
                nome_ptpt: 'Prontidão Pet',
                emoji: '🐶', icone: 'Dog',
                itens: [
                    { id: 'kits_prontidao_20', titulo: 'Cópia da via da Carteira de Vacinação guardada em formato físico e ágil (ou na Nuvem)', titulo_en: 'Copy of the Vaccination Card saved in physical and agile format (or in the Cloud)', titulo_es: 'Copia de la Cartilla de Vacunación guardada en formato físico y ágil (o en la Nube)', titulo_ptpt: 'Cópia da via do Boletim de Vacinas guardada em formato físico e ágil (ou na Nuvem)', tipo: 'normal', tags: ['documentos'] },
                    { id: 'kits_prontidao_21', titulo: 'Focinheira presente para uso como ferramenta de blindagem profilática em momentos de estresse', titulo_en: 'Muzzle present for use as a prophylactic safety tool in times of stress', titulo_es: 'Bozal presente para usar como herramienta de seguridad profiláctica en momentos de estrés', titulo_ptpt: 'Açaime presente para uso como ferramenta de proteção profilática em momentos de stress', tipo: 'perigo', tags: ['segurança'] },
                    { id: 'kits_prontidao_22', titulo: 'Caixa de transporte montada (ou bolsa de suporte) em padrão robusto, preparada para evacuação', titulo_en: 'Sturdy pet carrier (or support bag) assembled, prepared for evacuation', titulo_es: 'Caja de transporte montada (o bolsa de soporte) resistente, preparada para evacuación', titulo_ptpt: 'Caixa de transporte montada (ou bolsa de suporte) em padrão robusto, preparada para evacuação', tipo: 'perigo', tags: ['fuga'] },
                    { id: 'kits_prontidao_23', titulo: 'Água e Ração estocadas sob medida preventiva de segurança em recipientes herméticos de 3 dias', titulo_en: 'Water and food stored Hermetically for 3 days as a preventive safety measure', titulo_es: 'Agua y alimentos almacenados Herméticamente durante 3 días como medida de seguridad preventiva', titulo_ptpt: 'Água e ração armazenadas sob medida preventiva de segurança em recipientes herméticos de 3 dias', tipo: 'sugestão', tags: ['sobrevivência'] },
                    { id: 'kits_prontidao_24', titulo: 'Carvão Ativado em estoque (para emergências de intoxicação, sob guia veterinário)', titulo_en: 'Activated charcoal in stock (for poisoning emergencies, under veterinary guidance)', titulo_es: 'Carbón activado en stock (para emergencias de intoxicación, bajo guía veterinaria)', titulo_ptpt: 'Carvão Ativado em stock (para emergências de intoxicação, sob orientação veterinária)', tipo: 'perigo', tags: ['intoxicação'] },
                    { id: 'kits_prontidao_25', titulo: 'Fotos impressas ou salvas offline do pet para identificação rápida em caso de busca', titulo_en: 'Printed or offline saved photos of the pet for quick identification in case of search', titulo_es: 'Fotos impresas o guardadas fuera de línea de la mascota para una identificación rápida en caso de búsqueda', titulo_ptpt: 'Fotos impressas ou guardadas offline do pet para identificação rápida em caso de busca', tipo: 'normal', tags: ['identificação'] }
                ],
            },
        ],
    },

    // ==========================================
    // VISTORIAS INSTITUCIONAIS (NOVO)
    // ==========================================

    escola_segura: {
        categorias: [
            {
                nome: 'Infraestrutura e Prevenção de Quedas',
                emoji: '🏗️', icone: 'Crane',
                itens: [
                    { id: 'escola_segura_01', titulo: 'Pisos das áreas de recreação absorvem impacto (grama, areia ou emborrachados)', tipo: 'perigo', tags: ['queda', 'crianças'] },
                    { id: 'escola_segura_02', titulo: 'Escadas possuem corrimãos em dupla altura (para adultos e crianças pequenas)', tipo: 'perigo', tags: ['acessibilidade', 'queda'] },
                    { id: 'escola_segura_03', titulo: 'Arestas e quinas vivas de balcões e pilares possuem proteção macia', tipo: 'normal', tags: ['impacto'] },
                    { id: 'escola_segura_04', titulo: 'Janelas e basculantes nos andares superiores possuem redes de proteção', tipo: 'perigo', tags: ['queda'] },
                    { id: 'escola_segura_05', titulo: 'Ralos dos pátios possuem telas para evitar acúmulo de sujeira e insetos', tipo: 'normal', tags: ['limpeza'] }
                ],
            },
            {
                nome: 'Incêndio e Evacuação',
                emoji: '🧯', icone: 'FireExtinguisher',
                itens: [
                    { id: 'escola_segura_06', titulo: 'Existe um Plano de Abandono Escolar documentado e testado em simulados', tipo: 'perigo', tags: ['evacuação', 'incêndio'] },
                    { id: 'escola_segura_07', titulo: 'Rotas de fuga estão sinalizadas (placas luminescentes) e desobstruídas', tipo: 'perigo', tags: ['evacuação'] },
                    { id: 'escola_segura_08', titulo: 'Extintores de incêndio estão na validade e sem obstruções na frente', tipo: 'perigo', tags: ['incêndio'] },
                    { id: 'escola_segura_09', titulo: 'Portas de áreas de grande circulação abrem para fora (sentido da fuga)', tipo: 'normal', tags: ['evacuação'] }
                ],
            },
            {
                nome: 'Saúde e Primeiros Socorros (Lei Lucas)',
                emoji: '⚕️', icone: 'FirstAid',
                itens: [
                    { id: 'escola_segura_10', titulo: 'Profissionais possuem curso atualizado de Primeiros Socorros (Lei 13.722/18)', tipo: 'perigo', tags: ['saúde', 'legislação'] },
                    { id: 'escola_segura_11', titulo: 'Existe um Kit de Primeiros Socorros completo e rapidamente acessível', tipo: 'perigo', tags: ['saúde'] },
                    { id: 'escola_segura_12', titulo: 'A escola possui formulário médico dos alunos (alergias, tipo sanguíneo)', tipo: 'normal', tags: ['saúde'] },
                    { id: 'escola_segura_13', titulo: 'Medicamentos dos alunos ficam retidos e trancados na coordenação/enfermaria', tipo: 'perigo', tags: ['intoxicação'] }
                ],
            },
            {
                nome: 'Segurança Elétrica e Acesso',
                emoji: '⚡', icone: 'Lightning',
                itens: [
                    { id: 'escola_segura_14', titulo: 'Tomadas acessíveis às crianças possuem protetores firmes', tipo: 'perigo', tags: ['choque', 'crianças'] },
                    { id: 'escola_segura_15', titulo: 'Quadro de força (disjuntores) fica trancado, sem acesso para alunos', tipo: 'perigo', tags: ['choque'] },
                    { id: 'escola_segura_16', titulo: 'Controle de acesso rigoroso na portaria (só autorizados retiram crianças)', tipo: 'perigo', tags: ['segurança'] }
                ],
            },
            {
                nome: 'Corpo Docente e Prevenção',
                emoji: '👥', icone: 'Users',
                itens: [
                    { id: 'escola_segura_17', titulo: 'A escola possui canal de denúncias ou ouvidoria ativa para pais e alunos relatarem abusos/bullying de forma confidencial', tipo: 'perigo', tags: ['psicológico', 'prevenção'] },
                    { id: 'escola_segura_18', titulo: 'Profissionais de apoio (portaria, merenda, auxiliares) possuem checagem prévia de antecedentes criminais pela direção', tipo: 'normal', tags: ['segurança'] },
                    { id: 'escola_segura_19', titulo: 'Existe supervisão visual constante dos monitores mesmo durante o recreio e idas ao banheiro das crianças', tipo: 'perigo', tags: ['supervisão'] }
                ],
            }
        ],
    },

    asilo_seguro: {
        categorias: [
            {
                nome: 'Acessibilidade (Estatuto do Idoso/ABNT)',
                emoji: '🦽', icone: 'Wheelchair',
                itens: [
                    { id: 'asilo_seguro_01', titulo: 'Ausência total de degraus isolados (uso de rampas adequadas com piso tátil)', tipo: 'perigo', tags: ['queda', 'acessibilidade'] },
                    { id: 'asilo_seguro_02', titulo: 'Corredores largos e portas dimensionadas para cadeiras de rodas', tipo: 'perigo', tags: ['acessibilidade'] },
                    { id: 'asilo_seguro_03', titulo: 'Corrimãos contínuos instalados em ambos os lados de rampas e corredores', tipo: 'normal', tags: ['mobilidade'] },
                    { id: 'asilo_seguro_04', titulo: 'Iluminação forte e contínua, principalmente à noite (luzes de balizamento)', tipo: 'perigo', tags: ['visão', 'queda'] },
                    { id: 'asilo_seguro_05', titulo: 'Pisos antiderrapantes (zero tapetes soltos em áreas de circulação)', tipo: 'perigo', tags: ['queda'] }
                ],
            },
            {
                nome: 'Banheiros e Higiene (RDC Anvisa)',
                emoji: '🚿', icone: 'Shower',
                itens: [
                    { id: 'asilo_seguro_06', titulo: 'Banheiros adaptados com barras de apoio fixadas no vaso e no box', tipo: 'perigo', tags: ['queda', 'acessibilidade'] },
                    { id: 'asilo_seguro_07', titulo: 'Portas dos banheiros abrem para fora (acesso rápido em caso de queda/desmaio)', tipo: 'perigo', tags: ['emergência'] },
                    { id: 'asilo_seguro_08', titulo: 'Piso do box é totalmente nivelado (sem ressaltos de mármore para tropeço)', tipo: 'normal', tags: ['queda'] },
                    { id: 'asilo_seguro_09', titulo: 'Assento do vaso sanitário é elevado, facilitando o uso', tipo: 'sugestão', tags: ['conforto'] }
                ],
            },
            {
                nome: 'Emergência e Cuidados Médicos',
                emoji: '🚨', icone: 'Siren',
                itens: [
                    { id: 'asilo_seguro_10', titulo: 'Quartos/banheiros possuem botões de emergência ao alcance das mãos e do chão', tipo: 'perigo', tags: ['saúde', 'emergência'] },
                    { id: 'asilo_seguro_11', titulo: 'Medicamentos são gerenciados e trancados exclusivamente pela enfermagem', tipo: 'perigo', tags: ['intoxicação', 'saúde'] },
                    { id: 'asilo_seguro_12', titulo: 'Camas possuem altura regulável e grades retráteis para evitar quedas', tipo: 'normal', tags: ['queda'] }
                ],
            },
            {
                nome: 'Incêndio e Evacuação Adaptada',
                emoji: '🔥', icone: 'Fire',
                itens: [
                    { id: 'asilo_seguro_13', titulo: 'Plano de emergência visa a retirada de pessoas acamadas/mobilidade reduzida', tipo: 'perigo', tags: ['evacuação', 'incêndio'] },
                    { id: 'asilo_seguro_14', titulo: 'Ausência de cadeiras ou macas soltas nos corredores bloqueando a rota de fuga', tipo: 'perigo', tags: ['evacuação'] },
                    { id: 'asilo_seguro_15', titulo: 'Sistema de detecção de fumaça e alarme sonoro ativo com brigadistas treinados', tipo: 'perigo', tags: ['incêndio'] }
                ],
            },
            {
                nome: 'Equipe e Ética do Cuidado',
                emoji: '🤝', icone: 'Handshake',
                itens: [
                    { id: 'asilo_seguro_16', titulo: 'Instalação de câmeras de monitoramento nas áreas comuns (corredores/salas) para auditoria comportamental', tipo: 'perigo', tags: ['segurança', 'monitoramento'] },
                    { id: 'asilo_seguro_17', titulo: 'A instituição garante que cuidadores possuem qualificação técnica comprovada e antecedentes criminais checados', tipo: 'perigo', tags: ['saúde', 'profissionalismo'] },
                    { id: 'asilo_seguro_18', titulo: 'Os idosos se comunicam livremente ou existe canal confidencial direto entre a família e a diretoria técnica', tipo: 'normal', tags: ['transparência'] }
                ],
            }
        ],
    }

};
