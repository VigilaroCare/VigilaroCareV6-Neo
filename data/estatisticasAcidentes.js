/**
 * estatisticasAcidentes.js
 * Estatísticas de acidentes domésticos
 * Gerado automaticamente em 2025-12-09T16:44:05.255Z
 */

export const ESTATISTICAS_ACIDENTES = {
  "total": 113,
  "porCategoria": {
    "afogamento": 58,
    "queda": 25,
    "atropelamento": 12,
    "queimadura": 7,
    "esmagamento": 7,
    "choque": 2,
    "corte": 1,
    "animal": 1
  },
  "porLocal": {
    "nao_especificado": 84,
    "geral": 16,
    "area_externa": 5,
    "quarto": 3,
    "cozinha": 3,
    "banheiro": 2
  },
  "porFaixaEtaria": {
    "nao_especificado": 34,
    "adulto": 34,
    "crianca": 32,
    "idoso": 7,
    "adolescente": 3,
    "bebe": 3
  },
  "porGravidade": {
    "nao_especificado": 51,
    "grave": 30,
    "fatal": 24,
    "moderado": 7,
    "leve": 1
  },
  "porMes": {
    "11": 46,
    "12": 67
  }
};

// Mensagens de alerta por categoria
export const ALERTAS_CATEGORIA = {
    queda: "Quedas são a principal causa de acidentes domésticos. Use tapetes antiderrapantes e instale barras de apoio.",
    afogamento: "Nunca deixe crianças sozinhas perto de água. Piscinas devem ter cerca e alarme.",
    queimadura: "Mantenha crianças longe do fogão. Use protetores de bocas e mantenha cabos de panelas virados para dentro.",
    intoxicacao: "Guarde produtos de limpeza e medicamentos em locais altos e trancados.",
    corte: "Mantenha facas e objetos cortantes fora do alcance de crianças.",
    choque: "Use protetores de tomada. Nunca mexa em equipamentos elétricos com as mãos molhadas.",
    engasgo: "Evite dar alimentos pequenos e duros para crianças. Aprenda a manobra de desengasgo: 5 pancadas nas costas alternadas com 5 compressões.",
    esmagamento: "Use protetores de porta para evitar que dedos sejam prensados."
};

// Dicas por faixa etária
export const DICAS_FAIXA_ETARIA = {
    bebe: "Bebês exploram o mundo com a boca. Remova objetos pequenos do alcance.",
    crianca: "Crianças são curiosas e rápidas. Supervisão constante é essencial.",
    idoso: "Idosos têm maior risco de quedas. Remova obstáculos e melhore a iluminação."
};

// Alertas sazonais (baseado em mês)
export const ALERTAS_SAZONAIS = {
    1: "Verão: aumento de afogamentos. Reforce a vigilância em piscinas.",
    2: "Carnaval: cuidado com fantasias inflamáveis e sprays.",
    6: "Festas juninas: atenção redobrada com fogueiras e fogos.",
    12: "Natal: cuidado com decorações elétricas e objetos pequenos na árvore."
};
