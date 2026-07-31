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
    icone: '🧴',
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
    icone: '🌲',
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
    icone: '☠️',
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
    icone: '🧪',
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
    icone: '🧹',
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
    icone: '🪟',
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
    icone: '🚽',
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
    icone: '🧴',
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
    icone: '🔥',
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
    icone: '💅',
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
    icone: '🎨',
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
    icone: '🦟',
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
    icone: '🐀',
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
    icone: '⚪',
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
    prevencao: ['Não aplicar com vento', 'Manter crianças/pets afastados por 24-48h'],
    icone: '🌱',
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
    icone: '💊',
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
    icone: '🌡️',
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
    icone: '💊',
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
    icone: '🧼',
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
    icone: '🧴',
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
    icone: '🔋',
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
    icone: '🌿',
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
    icone: '❓',
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

/**
 * Busca produto por nome (parcial, case-insensitive)
 */
export const buscarProdutoPorNome = (termo) => {
  if (!termo?.trim()) return [];
  const lower = termo.toLowerCase();

  return Object.entries(PRODUTOS_PERIGOSOS)
    .filter(([key, p]) =>
      key !== 'default' &&
      (p.nome?.toLowerCase().includes(lower) ||
       (p.componentes || []).some(c => c.toLowerCase().includes(lower)) ||
       p.categoria?.toLowerCase().includes(lower))
    )
    .map(([barcode, p]) => ({ ...p, barcode }));
};

export const NIVEIS_PERIGO = {
  'Muito Alto': { cor: '#D32F2F', icone: '🔴', descricao: 'EXTREMAMENTE PERIGOSO' },
  'Alto': { cor: '#F44336', icone: '🟠', descricao: 'MUITO PERIGOSO' },
  'Médio': { cor: '#FF9800', icone: '🟡', descricao: 'CUIDADO' },
  'Médio (Humanos) / Mortal (Gatos)': { cor: '#E91E63', icone: '🔴', descricao: 'MORTAL PARA GATOS' },
  'Médio (Humanos) / Alto (Pets)': { cor: '#E91E63', icone: '🟠', descricao: 'TÓXICO PARA PETS' },
  'Alto (Pets)': { cor: '#E91E63', icone: '🟠', descricao: 'TÓXICO PARA PETS' },
  'Baixo': { cor: '#FFC107', icone: '🟢', descricao: 'RISCO LEVE' },
  'Baixo/Médio': { cor: '#FFC107', icone: '🟡', descricao: 'RISCO LEVE' },
  'Extremo': { cor: '#000000', icone: '☠️', descricao: 'RISCO DE MORTE' },
  'Indeterminado': { cor: '#9E9E9E', icone: '❓', descricao: 'DESCONHECIDO' }
};

export default PRODUTOS_PERIGOSOS;
