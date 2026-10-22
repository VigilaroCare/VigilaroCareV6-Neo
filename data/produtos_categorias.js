// Nomes de ícones resolvidos via NeoIcon (Phosphor) — passamos string,
// não component refs, pra não amarrar o data layer à biblioteca.
// O nome viaja como string e a tela renderiza com <NeoIcon name={item.icon} />.

export const PRODUTOS_CATEGORIAS_DATA = {
    'limpeza': {
        titulo: 'Limpeza Doméstica', titulo_ptpt: 'Limpeza da Casa', titulo_es: 'Limpieza del Hogar', titulo_en: 'Household Cleaning',
        subtitulo: 'Produtos Químicos', subtitulo_ptpt: 'Produtos Químicos', subtitulo_es: 'Productos Químicos', subtitulo_en: 'Chemical Products',
        icon: 'Trash', // Cleaning bucket generic
        iconColor: '#0EA5E9', // Sky
        bg: '#E0F2FE', // Sky 100
        imagemUrl: require('../assets/illustrations/pad/ambientes-casa_produto-limpeza-luvas-esponja_033.jpg'),
        definicao: 'Produtos usados na higiene da casa contêm substâncias corrosivas e tóxicas (cloro, amônia).', definicao_ptpt: 'Os produtos usados na limpeza da casa contêm substâncias corrosivas e tóxicas (cloro, amoníaco).', definicao_es: 'Los productos de limpieza del hogar contienen sustancias corrosivas y tóxicas (cloro, amoníaco).', definicao_en: 'Products used to clean the home contain corrosive and toxic substances (chlorine, ammonia).',
        importancia: 'Produtos de limpeza estão entre as principais causas de intoxicação de crianças em casa — e guardá-los embaixo da pia os deixa ao alcance delas.', importancia_ptpt: 'Os produtos de limpeza estão entre as principais causas de intoxicação de crianças em casa — e guardá-los debaixo do lava-loiça deixa-os ao alcance delas.', importancia_es: 'Los productos de limpieza están entre las principales causas de intoxicación de niños en casa — y guardarlos debajo del fregadero los deja a su alcance.', importancia_en: 'Cleaning products are among the main causes of poisoning in children at home — and keeping them under the sink puts them within their reach.',
        comoIdentificar: [
            'Sempre manter na embalagem original.',
            'Nunca misturar produtos (ex: água sanitária + desinfetante = gás tóxico).',
            'Manter no alto e trancado.'
        ], comoIdentificar_ptpt: [
            'Manter sempre na embalagem original.',
            'Nunca misturar produtos (ex.: lixívia + outros detergentes = gás tóxico).',
            'Guardar no alto e fechado à chave.',
        ], comoIdentificar_es: [
            'Mantenerlos siempre en el envase original.',
            'Nunca mezclar productos (p. ej., lejía + otros limpiadores = gas tóxico).',
            'Guardarlos en alto y bajo llave.',
        ], comoIdentificar_en: [
            'Always keep them in the original packaging.',
            'Never mix products (e.g. bleach + other cleaners = toxic gas).',
            'Keep them up high and locked away.',
        ],
        exemplos: [
            'Água Sanitária (Corrosiva aos olhos).',
            'Detergentes (Irritantes).',
            'Desengordurantes (Cáusticos).'
        ], exemplos_ptpt: [
            'Lixívia (corrosiva para os olhos).',
            'Detergentes (irritantes).',
            'Desengordurantes (cáusticos).',
        ], exemplos_es: [
            'Lejía (corrosiva para los ojos).',
            'Detergentes (irritantes).',
            'Desengrasantes (cáusticos).',
        ], exemplos_en: [
            'Bleach (corrosive to the eyes).',
            'Detergents (irritant).',
            'Degreasers (caustic).',
        ],
        primeirosSocorros: 'Se ingerir: NÃO provoque vômito. Ligue para o {{POISON_CONTROL}}. Se cair no olho: lave com água corrente por 20 minutos.', primeirosSocorros_ptpt: 'Se for ingerido: NÃO provoque o vómito. Ligue para o {{POISON_CONTROL}}. Se cair nos olhos: lave com água corrente durante 20 minutos.', primeirosSocorros_es: 'Si se ingiere: NO provoque el vómito. Llame de inmediato: {{POISON_CONTROL}}. Si entra en los ojos: lave con agua corriente durante 20 minutos.', primeirosSocorros_en: 'If swallowed: do NOT induce vomiting. Call {{POISON_CONTROL}}. If it gets in the eyes: rinse with running water for 20 minutes.'
    },
    'jardim': {
        titulo: 'Jardinagem', titulo_ptpt: 'Jardinagem', titulo_es: 'Jardinería', titulo_en: 'Gardening',
        subtitulo: 'Pesticidas e Adubos', subtitulo_ptpt: 'Pesticidas e Adubos', subtitulo_es: 'Pesticidas y Abonos', subtitulo_en: 'Pesticides and Fertilisers',
        icon: 'Brush', // Gardening tool generic
        iconColor: '#059669', // Emerald
        bg: '#D1FAE5', // Emerald 100
        imagemUrl: require('../assets/illustrations/pad/generated_jardim.png'),
        definicao: 'Produtos para matar pragas e adubar plantas são altamente tóxicos para humanos e pets.', definicao_ptpt: 'Os produtos para matar pragas e adubar plantas são muito tóxicos para pessoas e animais.', definicao_es: 'Los productos para matar plagas y abonar plantas son muy tóxicos para personas y mascotas.', definicao_en: 'Products that kill pests and feed plants are highly toxic to people and pets.',
        importancia: 'A ingestão acidental pode causar falência de órgãos.', importancia_ptpt: 'A ingestão acidental pode causar falência de órgãos.', importancia_es: 'La ingestión accidental puede causar fallo de órganos.', importancia_en: 'Accidental swallowing can cause organ failure.',
        comoIdentificar: [
            'Veneno de rato (Raticida).',
            'Herbicidas (Mata-mato).',
            'Adubos químicos (NPK).'
        ], comoIdentificar_ptpt: [
            'Veneno para ratos (raticida).',
            'Herbicidas (mata-ervas).',
            'Adubos químicos (NPK).',
        ], comoIdentificar_es: [
            'Veneno para ratas (raticida).',
            'Herbicidas (matamalezas).',
            'Abonos químicos (NPK).',
        ], comoIdentificar_en: [
            'Rat poison (rodenticide).',
            'Herbicides (weed killers).',
            'Chemical fertilisers (NPK).',
        ],
        comoEvitar: [
            'Usar luvas ao manusear.',
            'Não aplicar em dias de muito vento.',
            'Manter animais longe por 24h após aplicação.'
        ], comoEvitar_ptpt: [
            'Usar luvas ao manusear.',
            'Não aplicar em dias de muito vento.',
            'Manter os animais afastados durante 24 h após a aplicação.',
        ], comoEvitar_es: [
            'Usar guantes al manipularlos.',
            'No aplicar en días de mucho viento.',
            'Mantener a los animales alejados 24 h después de la aplicación.',
        ], comoEvitar_en: [
            'Wear gloves when handling.',
            'Do not apply on very windy days.',
            'Keep animals away for 24 hours after application.',
        ]
    },
    'manutencao': {
        titulo: 'Manutenção', titulo_ptpt: 'Manutenção', titulo_es: 'Mantenimiento', titulo_en: 'Maintenance',
        subtitulo: 'Tintas e Solventes', subtitulo_ptpt: 'Tintas e Solventes', subtitulo_es: 'Pinturas y Disolventes', subtitulo_en: 'Paints and Solvents',
        icon: 'TruckFast', // Maintenance/Work generic
        iconColor: '#F59E0B', // Amber
        bg: '#FEF3C7', // Amber 100
        imagemUrl: null,
        definicao: 'Tintas, vernizes, colas e solventes (thinner) emitem vapores tóxicos e são inflamáveis.', definicao_ptpt: 'Tintas, vernizes, colas e solventes (diluente) libertam vapores tóxicos e são inflamáveis.', definicao_es: 'Pinturas, barnices, pegamentos y disolventes (diluyente) desprenden vapores tóxicos y son inflamables.', definicao_en: 'Paints, varnishes, glues and solvents (thinner) give off toxic fumes and are flammable.',
        importancia: 'Risco duplo: Intoxicação por inalação e Incêndio.', importancia_ptpt: 'Risco duplo: intoxicação por inalação e incêndio.', importancia_es: 'Riesgo doble: intoxicación por inhalación e incendio.', importancia_en: 'Double risk: poisoning by inhalation and fire.',
        comoIdentificar: [
            'Latas de tinta abertas.',
            'Garrafas de aguarrás/thinner.',
            'Colas de contato (sapateiro).'
        ], comoIdentificar_ptpt: [
            'Latas de tinta abertas.',
            'Garrafas de aguarrás/diluente.',
            'Colas de contacto (de sapateiro).',
        ], comoIdentificar_es: [
            'Latas de pintura abiertas.',
            'Botellas de aguarrás/diluyente.',
            'Pegamentos de contacto.',
        ], comoIdentificar_en: [
            'Open paint tins.',
            'Bottles of white spirit/thinner.',
            'Contact adhesives (shoe glue).',
        ],
        comoEvitar: [
            'Usar máscara ao pintar.',
            'Manter local ventilado.',
            'Longe de fontes de calor (cigarro, fogão, aquecedor).'
        ], comoEvitar_ptpt: [
            'Usar máscara ao pintar.',
            'Manter o local ventilado.',
            'Longe de fontes de calor (cigarros, fogão, aquecedor).',
        ], comoEvitar_es: [
            'Usar mascarilla al pintar.',
            'Mantener el lugar ventilado.',
            'Lejos de fuentes de calor (cigarrillos, cocina, estufa).',
        ], comoEvitar_en: [
            'Wear a mask when painting.',
            'Keep the area ventilated.',
            'Keep away from heat sources (cigarettes, cooker, heater).',
        ]
    },
    'remedios': {
        titulo: 'Medicamentos', titulo_ptpt: 'Medicamentos', titulo_es: 'Medicamentos', titulo_en: 'Medicines',
        subtitulo: 'Farmácia Caseira', subtitulo_ptpt: 'Farmácia de Casa', subtitulo_es: 'Botiquín de Casa', subtitulo_en: 'Home Medicine Cabinet',
        icon: 'Health', // Medical cross
        iconColor: '#EF4444', // Red
        bg: '#FEE2E2', // Red 100
        imagemUrl: require('../assets/illustrations/pad/fotos-stock-genericas_cartelas-comprimidos-medicamentos_038.jpg'),
        definicao: 'Remédios parecem "balinhas" para crianças. A superdosagem pode ser fatal.', definicao_ptpt: 'Para as crianças, os medicamentos parecem «rebuçados». Uma sobredosagem pode ser fatal.', definicao_es: 'Para los niños, los medicamentos parecen «caramelos». Una sobredosis puede ser mortal.', definicao_en: 'To children, medicines look like "sweets". An overdose can be fatal.',
        importancia: 'Intoxicação medicamentosa é comum em crianças (curiosas) e idosos, que podem confundir tipos e dosagens.', importancia_ptpt: 'A intoxicação por medicamentos é frequente em crianças (curiosidade) e idosos, que podem confundir medicamentos e doses.', importancia_es: 'La intoxicación por medicamentos es frecuente en niños (curiosidad) y personas mayores, que pueden confundir medicamentos y dosis.', importancia_en: 'Medicine poisoning is common in children (curiosity) and older adults, who may mix up medicines and doses.',
        comoIdentificar: [
            'Xaropes doces.',
            'Comprimidos coloridos.',
            'Remédios de uso contínuo soltos na mesa.'
        ], comoIdentificar_ptpt: [
            'Xaropes doces.',
            'Comprimidos coloridos.',
            'Medicamentos de uso contínuo soltos na mesa.',
        ], comoIdentificar_es: [
            'Jarabes dulces.',
            'Comprimidos de colores.',
            'Medicamentos de uso continuo sueltos en la mesa.',
        ], comoIdentificar_en: [
            'Sweet syrups.',
            'Coloured pills.',
            'Long-term medicines left loose on the table.',
        ],
        comoEvitar: [
            'Caixa de remédios trancada no alto.',
            'Não tomar remédio no escuro.',
            'Descartar vencidos em farmácias (não no lixo).'
        ], comoEvitar_ptpt: [
            'Caixa dos medicamentos fechada à chave e no alto.',
            'Não tomar medicamentos às escuras.',
            'Entregar os medicamentos fora de prazo na farmácia (não no lixo).',
        ], comoEvitar_es: [
            'Caja de medicamentos cerrada con llave y en alto.',
            'No tomar medicamentos a oscuras.',
            'Desechar los caducados en la farmacia (no en la basura).',
        ], comoEvitar_en: [
            'Medicine box locked and up high.',
            'Do not take medicines in the dark.',
            'Return expired medicines to a pharmacy (not the bin).',
        ]
    }
};
