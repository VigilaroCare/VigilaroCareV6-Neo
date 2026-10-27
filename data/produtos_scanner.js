/**
 * produtos_scanner.js
 * Base de dados de produtos perigosos para scanner
 * Códigos de barras comuns de produtos domésticos
 *
 * Campos adicionados para InfoRótulos (retrocompatíveis):
 *   - ghs_categories: categorias internas para matching com RuleEngine
 *   - toxic_for_species: espécies para as quais o produto é tóxico
 */

export const PRODUTOS_PERIGOSOS = {
  // ═══════════════════════════════════════
  // LIMPEZA PESADA
  // ═══════════════════════════════════════
  '7891022100105': {
    nome: 'Água Sanitária',
    categoria: 'Produto de Limpeza',
    perigo: 'Muito Alto',
    componentes: ['Hipoclorito de sódio 2-2,5%'],
    riscos: ['Corrosivo para pele e olhos', 'Gás tóxico se misturado com ácidos/amônia'],
    primeiros_socorros: {
      ingestao: 'NÃO induzir vômito. Dar água. {{POISON_CONTROL}}.',
      pele: 'Lavar por 15 min.',
      olhos: 'Lavar por 20 min.'
    },
    prevencao: ['Nunca misturar com outros produtos', 'Guardar no alto'],
    icone: 'Drop',
    cor: '#F44336',
    ghs_categories: ['corrosivo', 'irritante_ocular', 'irritante_respiratorio', 'toxico_ambiental'],
    toxic_for_species: ['gato', 'ave', 'peixe'],
  },
  '7891022101201': {
    nome: 'Desinfetante (Pinho/Eucalipto)',
    categoria: 'Limpeza',
    perigo: 'Alto',
    componentes: ['Cloreto de benzalcônio', 'Fenol'],
    riscos: ['Irritação severa', 'Tóxico para gatos (Fenol)'],
    primeiros_socorros: {
      ingestao: 'Não vomitar. Hospital veterinário para pets.',
      olhos: 'Lavagem abundante.'
    },
    prevencao: ['Secar o chão antes de permitir pets', 'Ventilar'],
    icone: 'Tree',
    cor: '#E91E63',
    ghs_categories: ['irritante_pele', 'irritante_ocular', 'nocivo_ingestao'],
    toxic_for_species: ['gato'],
  },
  '7896004712345': {
    nome: 'Desinfetante à base de Amônia',
    categoria: 'Limpeza Pesada',
    perigo: 'Alto',
    componentes: ['Amônia Quaternária'],
    riscos: ['Vapores tóxicos', 'Queimadura química'],
    primeiros_socorros: {
      ingestao: 'Não provocar vômito. CIATOX.',
      inalacao: 'Ar fresco urgente.'
    },
    prevencao: ['NÃO MISTURAR COM ÁGUA SANITÁRIA (Gás Mortal)', 'Usar luvas'],
    icone: 'Skull',
    cor: '#7B1FA2',
    ghs_categories: ['corrosivo', 'irritante_respiratorio', 'toxico_agudo_inalacao'],
    toxic_for_species: ['gato', 'ave'],
  },
  '7896090700102': {
    nome: 'Soda Cáustica (Diabo Verde)',
    categoria: 'Corrosivo',
    perigo: 'Extremo',
    componentes: ['Hidróxido de Sódio'],
    riscos: ['Cegueira permanente', 'Perfuração de órgãos', 'Corrosão instantânea da pele'],
    primeiros_socorros: {
      ingestao: 'HOSPITAL IMEDIATO. Levar embalagem.',
      olhos: 'Lavar sem parar a caminho do hospital.'
    },
    prevencao: ['Trancar com chave', 'Usar óculos de proteção'],
    icone: 'TestTube',
    cor: '#B71C1C',
    ghs_categories: ['corrosivo', 'toxico_agudo_ingestao', 'irritante_ocular'],
    toxic_for_species: [],
  },
  '7891024130001': {
    nome: 'Limpador Multiuso',
    categoria: 'Limpeza',
    perigo: 'Médio',
    componentes: ['Tensoativos', 'Álcali', 'Fragrância'],
    riscos: ['Irritação cutânea', 'Irritação ocular'],
    primeiros_socorros: {
      ingestao: 'Beber água. CIATOX se mal-estar.',
      olhos: 'Lavar com água por 15 min.',
      pele: 'Lavar com água e sabão.'
    },
    prevencao: ['Usar luvas', 'Manter fora do alcance de crianças'],
    icone: 'Broom',
    cor: '#FF9800',
    ghs_categories: ['irritante_pele', 'irritante_ocular'],
    toxic_for_species: [],
  },
  '7891035021008': {
    nome: 'Limpador de Vidros',
    categoria: 'Limpeza',
    perigo: 'Médio',
    componentes: ['Álcool isopropílico', 'Amônia'],
    riscos: ['Irritação respiratória', 'Nocivo se ingerido'],
    primeiros_socorros: {
      ingestao: 'Não provocar vômito.',
      inalacao: 'Levar ao ar fresco.'
    },
    prevencao: ['Ventilar durante uso', 'Longe de crianças'],
    icone: 'Square',
    cor: '#2196F3',
    ghs_categories: ['irritante_respiratorio', 'nocivo_ingestao'],
    toxic_for_species: ['ave'],
  },
  '7891023900101': {
    nome: 'Desentupidor Líquido',
    categoria: 'Corrosivo',
    perigo: 'Extremo',
    componentes: ['Hidróxido de sódio concentrado', 'Ácido sulfúrico'],
    riscos: ['Corrosão severa', 'Queimaduras profundas', 'Perfuração de órgãos'],
    primeiros_socorros: {
      ingestao: 'HOSPITAL IMEDIATO. NÃO provocar vômito.',
      pele: 'Lavar com muita água por 20 min.',
      olhos: 'Lavar CONTINUAMENTE a caminho do hospital.'
    },
    prevencao: ['Usar luvas e óculos', 'Trancar com chave'],
    icone: 'Toilet',
    cor: '#B71C1C',
    ghs_categories: ['corrosivo', 'toxico_agudo_ingestao', 'irritante_ocular'],
    toxic_for_species: [],
  },
  '7891024110002': {
    nome: 'Amaciante de Roupas',
    categoria: 'Limpeza',
    perigo: 'Médio',
    componentes: ['Cloreto de dialquildimetilamônio', 'Fragrância'],
    riscos: ['Irritação gástrica se ingerido', 'Irritante ocular'],
    primeiros_socorros: {
      ingestao: 'Não provocar vômito. Beber água. CIATOX se necessário.',
      olhos: 'Lavar por 15 min.'
    },
    prevencao: ['Nunca reutilizar embalagem para bebidas', 'Fora do alcance de crianças'],
    icone: 'Drop',
    cor: '#9C27B0',
    ghs_categories: ['nocivo_ingestao', 'irritante_ocular'],
    toxic_for_species: [],
  },

  // ═══════════════════════════════════════
  // INFLAMÁVEIS E SOLVENTES
  // ═══════════════════════════════════════
  '7896022200388': {
    nome: 'Álcool Líquido 70%',
    categoria: 'Inflamável',
    perigo: 'Alto',
    componentes: ['Etanol'],
    riscos: ['Explosão e Queimaduras', 'Intoxicação alcoólica em crianças'],
    primeiros_socorros: {
      queimadura: 'Água fria corrente. Não usar pasta de dente.',
      ingestao: 'Hospital.'
    },
    prevencao: ['Longe do fogo', 'Preferir álcool em gel'],
    icone: 'Fire',
    cor: '#D32F2F',
    ghs_categories: ['nocivo_ingestao', 'irritante_ocular'],
    toxic_for_species: [],
  },
  '7896036600010': {
    nome: 'Acetona / Removedor de Esmalte',
    categoria: 'Solvente',
    perigo: 'Médio',
    componentes: ['Acetona', 'Etanol'],
    riscos: ['Inflamável', 'Dano ocular severo', 'Tontura/Desmaio (inalação)'],
    primeiros_socorros: {
      ingestao: 'Não vomitar.',
      olhos: 'Lavar muito.'
    },
    prevencao: ['Manter frasco fechado', 'Longe de crianças'],
    icone: 'Sparkle',
    cor: '#FF9800',
    ghs_categories: ['irritante_ocular', 'neurotoxico'],
    toxic_for_species: [],
  },
  '7896020428015': {
    nome: 'Thinner / Aguarrás',
    categoria: 'Solvente',
    perigo: 'Muito Alto',
    componentes: ['Tolueno', 'Xileno', 'Hidrocarbonetos'],
    riscos: ['Pneumonia química se aspirado', 'Neurotóxico', 'Inflamável'],
    primeiros_socorros: {
      ingestao: 'NÃO provocar vômito (risco de aspiração). {{EMERGENCY_MEDICAL}}.',
      inalacao: 'Ar fresco imediato.',
      pele: 'Lavar com água e sabão.'
    },
    prevencao: ['Armazenar em armário alto e ventilado', 'Usar máscara ao manusear'],
    icone: 'PaintBrush',
    cor: '#D32F2F',
    ghs_categories: ['toxico_agudo_inalacao', 'neurotoxico', 'teratogeno'],
    toxic_for_species: ['gato', 'cachorro', 'ave'],
  },

  // ═══════════════════════════════════════
  // VENENOS E PESTICIDAS
  // ═══════════════════════════════════════
  '7891035500201': {
    nome: 'Inseticida Spray (Mata Barata/Mosquito)',
    categoria: 'Veneno',
    perigo: 'Alto',
    componentes: ['Piretróides', 'Solventes'],
    riscos: ['Neurotóxico (tremores, convulsão)', 'Fatal para Gatos e Peixes'],
    primeiros_socorros: {
      ingestao: '{{POISON_CONTROL}}.',
      pele: 'Lavar com água e sabão.'
    },
    prevencao: ['Não aplicar com pessoas/pets no quarto', 'Guardar trancado'],
    icone: 'Bug',
    cor: '#F44336',
    ghs_categories: ['neurotoxico', 'toxico_agudo_inalacao', 'toxico_ambiental'],
    toxic_for_species: ['gato', 'peixe', 'ave'],
  },
  '7896009945000': {
    nome: 'Raticida (Isca)',
    categoria: 'Veneno',
    perigo: 'Extremo',
    componentes: ['Brodifacoum'],
    riscos: ['Hemorragia interna', 'Morte silenciosa dias após ingestão'],
    primeiros_socorros: {
      ingestao: 'HOSPITAL VETERINÁRIO/HUMANO URGENTE. Levar caixa.'
    },
    prevencao: ['Usar caixas porta-isca trancadas', 'Nunca deixar solto'],
    icone: 'Bug',
    cor: '#000000',
    ghs_categories: ['toxico_agudo_ingestao'],
    toxic_for_species: ['cachorro', 'gato'],
  },
  '7896002300100': {
    nome: 'Naftalina / Bolinhas de Naftalina',
    categoria: 'Pesticida Doméstico',
    perigo: 'Alto',
    componentes: ['Naftaleno', 'Paradiclorobenzeno'],
    riscos: ['Parece bala — atrai crianças', 'Tóxica para fígado e sangue', 'Anemia hemolítica'],
    primeiros_socorros: {
      ingestao: 'NÃO provocar vômito. {{POISON_CONTROL}}.'
    },
    prevencao: ['Evitar uso — preferir sachês de cedro/lavanda', 'Nunca deixar ao alcance de crianças'],
    icone: 'Circle',
    cor: '#E91E63',
    ghs_categories: ['toxico_agudo_ingestao', 'carcinogenico', 'dano_orgaos'],
    toxic_for_species: ['cachorro', 'gato'],
  },
  '7896100500203': {
    nome: 'Herbicida / Mata-Mato',
    categoria: 'Jardinagem',
    perigo: 'Muito Alto',
    componentes: ['Glifosato'],
    riscos: ['Altamente tóxico se ingerido', 'Queimaduras na pele', 'Risco ambiental'],
    primeiros_socorros: {
      ingestao: '{{EMERGENCY_MEDICAL}}. NÃO provocar vômito.',
      pele: 'Banho imediato com água e sabão.'
    },
    prevencao: ['Não aplicar com vento', 'Manter crianças e pets afastados por 24-48h'],
    icone: 'Plant',
    cor: '#D32F2F',
    ghs_categories: ['toxico_agudo_ingestao', 'irritante_pele', 'irritante_ocular', 'toxico_ambiental'],
    toxic_for_species: ['cachorro', 'gato'],
  },

  // ═══════════════════════════════════════
  // MEDICAMENTOS COMUNS
  // ═══════════════════════════════════════
  '7896006200012': {
    nome: 'Paracetamol (Tylenol/Genérico)',
    categoria: 'Medicamento',
    perigo: 'Médio (Humanos) / Mortal (Gatos)',
    componentes: ['Paracetamol'],
    riscos: ['FATAL PARA GATOS (anemia/asfixia)', 'Falência hepática em superdosagem'],
    primeiros_socorros: {
      ingestao_pet: 'VETERINÁRIO EMERGÊNCIA. Não esperar sintomas.',
      ingestao_humana: 'Hospital se dose alta.'
    },
    prevencao: ['Nunca dar remédio humano para pets', 'Caixa de remédios alta'],
    icone: 'Pill',
    cor: '#E91E63',
    ghs_categories: ['dano_orgaos'],
    toxic_for_species: ['gato'],
  },
  '7891058001004': {
    nome: 'Dipirona Sódica',
    categoria: 'Medicamento',
    perigo: 'Baixo/Médio',
    componentes: ['Dipirona'],
    riscos: ['Choque anafilático (alergia)', 'Queda de pressão'],
    primeiros_socorros: {
      reacao: 'Hospital se inchaço/falta de ar.'
    },
    prevencao: ['Verificar alergias na família'],
    icone: 'Thermometer',
    cor: '#FFC107',
    ghs_categories: ['alergeno'],
    toxic_for_species: [],
  },
  '7896015528010': {
    nome: 'Ibuprofeno (Advil/Genérico)',
    categoria: 'Medicamento',
    perigo: 'Médio (Humanos) / Alto (Pets)',
    componentes: ['Ibuprofeno'],
    riscos: ['Tóxico para cães e gatos', 'Úlceras gástricas em sobredosagem', 'Falência renal em pets'],
    primeiros_socorros: {
      ingestao_pet: 'VETERINÁRIO EMERGÊNCIA imediata.',
      ingestao_humana: 'Hospital se sobredosagem.'
    },
    prevencao: ['Nunca dar remédio humano a pets', 'Caixa de remédios trancada'],
    icone: 'Pill',
    cor: '#E91E63',
    ghs_categories: ['dano_orgaos'],
    toxic_for_species: ['gato', 'cachorro'],
  },

  // ═══════════════════════════════════════
  // OUTROS DOMÉSTICOS
  // ═══════════════════════════════════════
  '7896004701516': {
    nome: 'Detergente Neutro',
    categoria: 'Limpeza',
    perigo: 'Baixo',
    componentes: ['Tensoativos'],
    riscos: ['Irritação leve', 'Diarreia se ingerido'],
    primeiros_socorros: { ingestao: 'Beber água.' },
    prevencao: ['Fora do alcance de bebês'],
    icone: 'Drop',
    cor: '#FF9800',
    ghs_categories: ['irritante_ocular'],
    toxic_for_species: [],
  },
  '7891150029002': {
    nome: 'Álcool em Gel 70%',
    categoria: 'Antisséptico',
    perigo: 'Baixo',
    componentes: ['Etanol em gel'],
    riscos: ['Intoxicação alcoólica em crianças se ingerido', 'Inflamável'],
    primeiros_socorros: {
      ingestao: 'Não provocar vômito. CIATOX se grande quantidade.',
    },
    prevencao: ['Supervisionar uso por crianças', 'Longe do fogo'],
    icone: 'Drop',
    cor: '#FFC107',
    ghs_categories: ['nocivo_ingestao'],
    toxic_for_species: [],
  },
  '7891010000100': {
    nome: 'Pilha Alcalina (AA/AAA)',
    categoria: 'Eletrônico',
    perigo: 'Médio',
    componentes: ['Hidróxido de potássio', 'Dióxido de manganês', 'Zinco'],
    riscos: ['Vazamento cáustico', 'Risco de ingestão por crianças (pilha botão)'],
    primeiros_socorros: {
      ingestao: 'HOSPITAL URGENTE. Raio-X. NÃO provocar vômito.',
      pele: 'Lavar com água em caso de vazamento.'
    },
    prevencao: ['Parafusar compartimentos', 'Descartar pilhas corretamente'],
    icone: 'BatteryWarning',
    cor: '#FF9800',
    ghs_categories: ['corrosivo', 'nocivo_ingestao'],
    toxic_for_species: [],
  },
  '7891000100103': {
    nome: 'Óleo Essencial de Melaleuca (Tea Tree)',
    categoria: 'Cosmético',
    perigo: 'Alto (Pets)',
    componentes: ['Terpinen-4-ol', 'γ-Terpineno', '1,8-Cineol'],
    riscos: ['FATAL para gatos em contato direto', 'Tóxico se ingerido', 'Convulsão em pets'],
    primeiros_socorros: {
      ingestao: 'Não provocar vômito. CIATOX.',
      ingestao_pet: 'VETERINÁRIO EMERGÊNCIA.'
    },
    prevencao: ['Não usar difusores em ambientes com gatos', 'Manter frascos fechados'],
    icone: 'Leaf',
    cor: '#E91E63',
    ghs_categories: ['toxico_agudo_ingestao', 'neurotoxico'],
    toxic_for_species: ['gato', 'cachorro'],
  },

  // Default
  'default': {
    nome: 'Produto não identificado',
    categoria: 'Desconhecido',
    perigo: 'Indeterminado',
    riscos: ['Não consta na base, tratar como perigoso'],
    primeiros_socorros: { ingestao: 'Ligar {{POISON_CONTROL}}' },
    prevencao: ['Ler rótulo', 'Afastar crianças'],
    icone: 'Question',
    cor: '#9E9E9E',
    ghs_categories: [],
    toxic_for_species: [],
  }
};

/**
 * Busca produto por código de barras
 */
export const buscarProduto = (codigo) => {
  return PRODUTOS_PERIGOSOS[codigo] || {
    ...PRODUTOS_PERIGOSOS['default'],
    codigo_barras: codigo
  };
};

// Sinônimos populares para busca tolerante (Lei de Postel): permite achar o
// produto pelo nome comercial/popular ou sem acento no momento de urgência.
const SINONIMOS_PRODUTOS = {
  '7891022100105': 'qboa candida cloro lixivia alvejante hipoclorito bleach lejia',
  '7891022101201': 'pinho sol kalipto casa km creolina eucalipto',
  '7896004712345': 'amoniaco lysoform ajax limpador amonia',
  '7896090700102': 'diabo verde soda caustica hidroxido de sodio',
  '7891024130001': 'veja mr musculo uau cif multiuso',
  '7891035021008': 'vidrex limpa vidro limpa vidros',
  '7891023900101': 'desentupidor pia ralo acido muriatico acido sulfurico',
  '7891024110002': 'downy comfort fofo amaciante',
  '7896022200388': 'alcool 70 alcool liquido etanol',
  '7896036600010': 'acetona esmalte removedor',
  '7896020428015': 'agua raz aguarraz thinner solvente querosene terebintina',
  '7891035500201': 'baygon sbp raid mata barata mata mosquito veneno inseto',
  '7896009945000': 'chumbinho veneno de rato mata rato raticida klerat',
  '7896002300100': 'naftalina bolinha traca',
  '7896100500203': 'roundup glifosato mata mato herbicida',
  '7896006200012': 'tylenol paracetamol acetaminofeno',
  '7891058001004': 'novalgina dipirona dorflex neosaldina metamizol',
  '7896015528010': 'advil alivium ibuprofeno',
  '7896004701516': 'ype limpol minuano detergente lava loucas sabao',
  '7891010000100': 'bateria pilha botao moeda controle remoto',
  '7891000100103': 'melaleuca tea tree oleo essencial difusor',
};

const normalizarTermoBusca = (valor = '') =>
  String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_/]/g, ' ')
    .toLowerCase()
    .trim();

/**
 * Busca produto por nome (parcial, insensível a maiúsculas, acentos, hífens e nomes populares)
 */
export const buscarProdutoPorNome = (termo) => {
  const query = normalizarTermoBusca(termo);
  if (!query) return [];

  return Object.entries(PRODUTOS_PERIGOSOS)
    .filter(([key, p]) => {
      if (key === 'default') return false;
      const alvo = normalizarTermoBusca([
        p.nome,
        ...(p.componentes || []),
        p.categoria,
        SINONIMOS_PRODUTOS[key] || '',
      ].filter(Boolean).join(' '));
      return alvo.includes(query);
    })
    .map(([barcode, p]) => ({ ...p, barcode }));
};

export const NIVEIS_PERIGO = {
  'Muito Alto': { cor: '#D32F2F', icone: 'Circle', descricao: 'EXTREMAMENTE PERIGOSO' },
  'Alto': { cor: '#F44336', icone: 'Circle', descricao: 'MUITO PERIGOSO' },
  'Médio': { cor: '#FF9800', icone: 'Circle', descricao: 'CUIDADO' },
  'Médio (Humanos) / Mortal (Gatos)': { cor: '#E91E63', icone: 'Circle', descricao: 'MORTAL PARA GATOS' },
  'Médio (Humanos) / Alto (Pets)': { cor: '#E91E63', icone: 'Circle', descricao: 'TÓXICO PARA PETS' },
  'Alto (Pets)': { cor: '#E91E63', icone: 'Circle', descricao: 'TÓXICO PARA PETS' },
  'Baixo': { cor: '#FFC107', icone: 'Circle', descricao: 'RISCO LEVE' },
  'Baixo/Médio': { cor: '#FFC107', icone: 'Circle', descricao: 'RISCO LEVE' },
  'Extremo': { cor: '#000000', icone: 'Skull', descricao: 'RISCO DE MORTE' },
  'Indeterminado': { cor: '#9E9E9E', icone: 'Question', descricao: 'DESCONHECIDO' }
};

export default PRODUTOS_PERIGOSOS;
