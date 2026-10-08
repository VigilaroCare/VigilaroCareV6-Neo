/**
 * mobilidade_data.js
 * Dados completos sobre mobilidade segura e dispositivos de retenção
 * Vigilaro Care V5
 * 
 * Fonte: CONTRAN, DENATRAN, OMS, ABNT
 * Atualizado: Novembro/2025
 */

// ============================================
// DISPOSITIVOS DE RETENÇÃO VEICULAR (DRV)
// ============================================

export const DISPOSITIVOS_RETENCAO = [
  {
    id: 'bebe-conforto',
    nome: 'Bebê Conforto',
    icone: 'Baby',
    cor: '#FFB6C1',
    imagemUrl: null,
    
    idadeMin: 0,
    idadeMax: 1,
    pesoMin: 0,
    pesoMax: 13,
    alturaMax: 'Até a cabeça ultrapassar o encosto',
    
    posicao: 'De costas para o movimento do veículo',
    localizacao: 'Banco traseiro (preferencialmente no meio)',
    
    descricao: 'O bebê conforto é o primeiro dispositivo de retenção veicular. Deve ser usado desde o nascimento até aproximadamente 1 ano de idade ou 13 kg.',
    
    comoInstalar: [
      'Posicionar de costas para o movimento do veículo',
      'Instalar no banco traseiro',
      'Passar o cinto de segurança pelos pontos indicados',
      'Apertar firmemente - não deve se mover mais que 2,5 cm',
      'Ajustar o ângulo de reclinação (geralmente 45°)',
      'Verificar se o cinto não está torcido'
    ],
    
    comoUsar: [
      'Ajustar as tiras nos ombros do bebê',
      'Deixar espaço de apenas 1 dedo entre tira e ombro',
      'Fivela deve ficar na altura do peito',
      'Remover roupas muito volumosas (interferem no ajuste)',
      'Nunca colocar nada entre bebê e o dispositivo',
      'Cabeça não deve ultrapassar o encosto'
    ],
    
    seguranca: [
      'Usar SEMPRE que o bebê estiver no veículo',
      'Nunca usar bebê conforto com sinais de desgaste',
      'Substituir após qualquer acidente de carro',
      'Verificar {{CERT_SEAL}}',
      'Seguir instruções do fabricante rigorosamente',
      'Nunca instalar em banco com airbag frontal ativo'
    ],
    
    errosComuns: [
      'Instalar de frente para o movimento (ERRADO!)',
      'Tiras muito frouxas',
      'Ângulo incorreto',
      'Cinto de segurança mal passado',
      'Usar além do limite de peso/altura'
    ],
    
    legislacao: 'Obrigatório por lei (Art. 64 do CTB)',
    multa: 'Multa gravíssima + 7 pontos na CNH',
    reducao_risco: 'Reduz em 71% o risco de morte em acidentes'
  },

  {
    id: 'cadeirinha',
    nome: 'Cadeirinha',
    icone: 'Person',
    cor: '#87CEEB',
    imagemUrl: null,
    
    idadeMin: 1,
    idadeMax: 4,
    pesoMin: 9,
    pesoMax: 18,
    alturaMax: 'Até os ombros ultrapassarem o ponto mais alto das tiras',
    
    posicao: 'De frente para o movimento do veículo',
    localizacao: 'Banco traseiro',
    
    descricao: 'A cadeirinha é usada após o bebê conforto, geralmente de 1 a 4 anos. Protege em caso de impacto frontal, lateral e traseiro.',
    
    comoInstalar: [
      'Posicionar de frente para o movimento',
      'Instalar no banco traseiro (meio é mais seguro)',
      'Passar o cinto de segurança pelos pontos corretos',
      'Apertar firmemente - não deve mover mais que 2,5 cm',
      'Se tiver sistema Isofix, usar preferencialmente',
      'Verificar estabilidade'
    ],
    
    comoUsar: [
      'Ajustar altura das tiras conforme crescimento',
      'Tiras devem passar na altura dos ombros',
      'Fivela na altura do peito',
      'Apertar bem as tiras (1 dedo de folga)',
      'Remover casacos grossos antes de colocar',
      'Verificar ajuste a cada uso'
    ],
    
    seguranca: [
      'Verificar {{CERT_SEAL}}',
      'Respeitar limites de peso e altura',
      'Substituir após acidente',
      'Verificar prazo de validade do produto',
      'Não usar cadeirinhas de segunda mão sem conhecer histórico'
    ],
    
    errosComuns: [
      'Tiras mal ajustadas (muito frouxas)',
      'Altura das tiras incorreta',
      'Cinto mal passado',
      'Usar além do limite de peso',
      'Instalar no banco da frente'
    ],
    
    legislacao: 'Obrigatório por lei (Art. 64 do CTB)',
    multa: 'Multa gravíssima + 7 pontos na CNH',
    reducao_risco: 'Reduz em 54-71% o risco de morte'
  },

  {
    id: 'assento-elevacao',
    nome: 'Assento de Elevação (Booster)',
    icone: 'Person',
    cor: '#9370DB',
    imagemUrl: null,
    
    idadeMin: 4,
    idadeMax: 10,
    pesoMin: 15,
    pesoMax: 36,
    alturaMin: 'Quando ombros ultrapassam ponto mais alto da cadeirinha',
    alturaMax: 'Até 1,45m de altura',
    
    posicao: 'Criança sentada no booster, usando cinto do veículo',
    localizacao: 'Banco traseiro',
    
    descricao: 'O booster eleva a criança para que o cinto de segurança do veículo fique posicionado corretamente. Usado até a criança atingir 1,45m de altura.',
    
    comoInstalar: [
      'Posicionar no banco traseiro',
      'Colocar a criança no assento',
      'Passar o cinto de segurança do veículo',
      'Cinto diagonal deve passar pelo MEIO do ombro',
      'Cinto abdominal deve ficar SOBRE o quadril (não na barriga)',
      'Verificar se não está torcido'
    ],
    
    comoUsar: [
      'Criança deve sentar completamente encostada',
      'Pés devem alcançar o chão',
      'Cinto não pode passar pelo pescoço',
      'Cinto não pode ficar sobre a barriga',
      'Nunca passar cinto por baixo do braço',
      'Verificar posicionamento a cada viagem'
    ],
    
    seguranca: [
      'Usar até a criança atingir 1,45m',
      'Verificar se o assento tem {{CERT_SEAL}}',
      'Nunca usar apenas o cinto sem o booster se menor que 1,45m',
      'Substituir se danificado',
      'Guardar em local seguro quando não estiver em uso'
    ],
    
    errosComuns: [
      'Parar de usar antes de atingir 1,45m',
      'Cinto passando pelo pescoço',
      'Cinto sobre a barriga em vez do quadril',
      'Criança não sentar completamente encostada',
      'Usar no banco da frente'
    ],
    
    legislacao: 'Obrigatório até 1,45m de altura (Resolução 819/2021 CONTRAN)',
    multa: 'Multa gravíssima + 7 pontos na CNH',
    reducao_risco: 'Reduz em 59% o risco de lesão grave',
    
    quando_parar: 'Quando a criança atingir 1,45m E o cinto passar corretamente (ombro e quadril)'
  }
];

// ============================================
// MOBILIDADE ATIVA
// ============================================

export const MOBILIDADE_ATIVA = {
  definicao: 'Mobilidade ativa é o deslocamento usando apenas força física humana: andar a pé, bicicleta, skate, patinete, patins.',
  
  beneficios: [
    'Desenvolvimento cognitivo e social',
    'Atividade física regular',
    'Melhora da concentração',
    'Relação consciente com espaço público',
    'Independência e autonomia',
    'Redução da poluição ambiental'
  ],
  
  idadeAutonomia: {
    idade: 10,
    justificativa: 'Antes dos 10 anos, crianças ainda não desenvolveram:',
    habilidadesNecessarias: [
      'Percepção de risco (distância, velocidade, espaço)',
      'Visão periférica completa',
      'Capacidade de detectar origem de sons',
      'Julgamento de tempo seguro para travessia'
    ]
  },
  
  tipos: [
    {
      tipo: 'Bicicleta',
      icone: 'PersonSimpleBike',
      idadeMinima: 4,
      
      equipamentos: [
        'Capacete certificado (obrigatório)',
        'Joelheiras',
        'Cotoveleiras',
        'Buzina ou campainha',
        'Refletores dianteiro e traseiro',
        'Sapatos fechados (nunca chinelos)'
      ],
      
      locaisApropriados: [
        'Ciclovias',
        'Parques',
        'Praças',
        'Vias calmas (baixo fluxo, velocidade máx 50 km/h)',
        'Áreas específicas para bikes'
      ],
      
      locaisEvitar: [
        'Calçadas (pedestres têm prioridade)',
        'Vias de alto fluxo',
        'Rodovias',
        'Ruas sem iluminação à noite',
        'Áreas de trânsito intenso'
      ],
      
      regrasSeguranca: [
        'Sempre usar capacete',
        'Respeitar semáforos e sinalização',
        'Sinalizar conversões com o braço',
        'Andar no mesmo sentido dos carros',
        'Não usar fone de ouvido',
        'Não usar celular enquanto pedala',
        'Verificar freios antes de sair',
        'Usar roupas claras/reflexivas à noite',
        'Reduzir velocidade em cruzamentos'
      ],
      
      manutencao: [
        'Verificar freios regularmente',
        'Calibrar pneus',
        'Lubrificar corrente',
        'Ajustar altura do selim',
        'Verificar parafusos e componentes'
      ]
    },
    {
      tipo: 'Skate',
      icone: 'PersonSimpleRun',
      idadeMinima: 6,
      
      equipamentos: [
        'Capacete certificado (obrigatório)',
        'Joelheiras',
        'Cotoveleiras',
        'Munhequeiras',
        'Sapatos fechados e antiderrapantes'
      ],
      
      locaisApropriados: [
        'Skateparks',
        'Pistas específicas para skate',
        'Áreas planas e livres',
        'Parques permitidos',
        'Estacionamentos vazios (com permissão)'
      ],
      
      regrasSeguranca: [
        'SEMPRE usar todos os equipamentos de proteção',
        'Praticar em locais apropriados',
        'Não andar em vias públicas com trânsito',
        'Respeitar limites de habilidade',
        'Não praticar próximo a carros ou pedestres',
        'Evitar manobras arriscadas sem treinamento',
        'Verificar equipamento antes de usar'
      ]
    },
    {
      tipo: 'Patinete',
      icone: 'Scooter',
      idadeMinima: 5,
      
      equipamentos: [
        'Capacete certificado',
        'Joelheiras e cotoveleiras',
        'Sapatos fechados',
        'Buzina ou campainha'
      ],
      
      locaisApropriados: [
        'Calçadas (com cuidado e prioridade ao pedestre)',
        'Ciclovias',
        'Parques',
        'Vias calmas'
      ],
      
      regrasSeguranca: [
        'Usar equipamentos de proteção',
        'Respeitar pedestres',
        'Não usar em vias movimentadas',
        'Verificar freios',
        'Não andar à noite sem iluminação'
      ]
    },
    {
      tipo: 'Patins',
      icone: 'PersonSimpleRun',
      idadeMinima: 5,
      
      equipamentos: [
        'Capacete',
        'Joelheiras, cotoveleiras, munhequeiras',
        'Patins com freio'
      ],
      
      locaisApropriados: [
        'Pistas de patinação',
        'Áreas planas e lisas',
        'Parques com piso adequado'
      ],
      
      regrasSeguranca: [
        'Usar TODOS os equipamentos de proteção',
        'Aprender a frear corretamente',
        'Praticar em áreas seguras',
        'Não andar próximo a trânsito'
      ]
    }
  ]
};

// ============================================
// SEGURANÇA COMO PEDESTRE
// ============================================

export const SEGURANCA_PEDESTRE = {
  idadeAutonomia: 10,
  
  regrasGerais: [
    'Atravessar SEMPRE na faixa de pedestre',
    'Olhar para AMBOS os lados antes de atravessar',
    'Fazer contato visual com motoristas',
    'Respeitar semáforos',
    'Não correr ao atravessar',
    'Nunca atravessar entre carros estacionados',
    'Não usar celular ao atravessar',
    'Usar calçadas (nunca andar na rua)',
    'Andar de frente para o trânsito se não houver calçada'
  ],
  
  sinalizacaoVial: [
    {
      sinal: 'Semáforo verde para pedestre',
      acao: 'Pode atravessar, mas olhe para os dois lados'
    },
    {
      sinal: 'Semáforo vermelho para pedestre',
      acao: 'NÃO atravesse - aguarde'
    },
    {
      sinal: 'Semáforo amarelo piscando',
      acao: 'Aguarde o verde - NÃO comece a atravessar'
    },
    {
      sinal: 'Faixa de pedestre sem semáforo',
      acao: 'Pedestre tem prioridade, mas aguarde parada dos veículos'
    }
  ],
  
  fatoresRisco: [
    'Vias com alto fluxo de veículos',
    'Velocidades acima de 50 km/h (a OMS recomenda máx 50 km/h em áreas urbanas)',
    'Pouca sinalização (falta de faixa, semáforo)',
    'Calçadas inadequadas ou ausentes',
    'Ruas escuras sem iluminação',
    'Regiões com alto consumo de álcool',
    'Horários de pico de trânsito',
    'Condições climáticas adversas (chuva, neblina)'
  ],
  
  dicas_seguranca_noite: [
    'Usar roupas claras ou com material reflexivo',
    'Portar lanterna',
    'Preferir vias bem iluminadas',
    'Evitar atalhos escuros ou isolados',
    'Caminhar em grupo quando possível',
    'Avisar alguém sobre trajeto e horário'
  ],
  
  criancas_especificas: [
    'Crianças até 10 anos NÃO devem andar sozinhas na rua',
    'Sempre segurar na mão de adulto',
    'Ensinar desde cedo as regras de trânsito',
    'Praticar atravessia em locais seguros',
    'Explicar os perigos de correr para a rua',
    'Nunca deixar brincar próximo à rua'
  ]
};

// ============================================
// MOTOCICLETAS
// ============================================

export const SEGURANCA_MOTO = {
  idadeMinimaPassageiro: 10,
  
  equipamentos_obrigatorios: [
    {
      item: 'Capacete',
      requisitos: [
        'Com {{CERT_SEAL}} (obrigatório)',
        'Tamanho adequado à cabeça',
        'Viseira sem trincas ou arranhões',
        'Fivela funcionando corretamente',
        'Substituir após qualquer queda'
      ]
    },
    {
      item: 'Vestuário',
      recomendacoes: [
        'Jaqueta com proteções (cotovelos, ombros, costas)',
        'Calça jeans ou específica para moto',
        'Luvas',
        'Botas ou sapatos fechados (NUNCA chinelos)',
        'Roupas de cores vibrantes ou reflexivas'
      ]
    }
  ],
  
  regras_passageiro: [
    'Idade mínima legal: 10 anos completos (Art. 244 do CTB)',
    'Tamanho essencial: O passageiro DEVE alcançar as pedaleiras fixas com firmeza. Se a criança tiver 10 anos mas as pernas não alcançarem, não pode ser transportada',
    'Capacete adequado: Usar capacete do tamanho exato da cabeça da criança, jamais um capacete de adulto ou folgado',
    'Segurar nas alças laterais ou na cintura do piloto',
    'Manter pés sempre apoiados nas pedaleiras',
    'Inclinar junto com o piloto nas curvas',
    'Não fazer movimentos bruscos e aguardar a moto parar para descer'
  ],
  
  regras_piloto: [
    'CNH categoria A (obrigatória)',
    'Verificar moto antes de sair (freios, pneus, luzes)',
    'Respeitar limite de velocidade',
    'Manter distância segura',
    'Dirigir defensivamente (motos são menos visíveis)',
    'Evitar andar entre carros (corredor) - perigoso',
    'Não emprestar moto para quem não tem habilitação',
    'Fazer manutenção preventiva regular',
    'Não usar celular ao pilotar',
    'Evitar dirigir com sono ou sob efeito de substâncias'
  ],
  
  riscos_especificos: [
    'Menor visibilidade para outros veículos',
    'Maior vulnerabilidade em acidentes',
    'Instabilidade em pisos molhados ou irregulares',
    'Risco aumentado em curvas',
    'Facilidade de perder equilíbrio'
  ]
};

// ============================================
// MICROMOBILIDADE ELÉTRICA (E-BIKES, ETC)
// ============================================

export const MICROMOBILIDADE_ELETRICA = {
  definicao: 'Veículos de transporte individual movidos a energia limpa, ideais para curtas distâncias. Incluem bicicletas elétricas, patinetes, monociclos e hoverboards.',
  contexto: 'Com a expansão de 7.600 para mais de 284.000 veículos em circulação (2016-2024), tornaram-se vitais para desafogar o trânsito, mas o aumento de acidentes exige responsabilidade.',
  categorias_ctb: [
    {
      nome: 'Bicicleta Elétrica',
      icone: 'PersonSimpleBike',
      velocidadeMax: 'Até 32 km/h',
      caracteristicas: [
        'Tem motor e pedal',
        'Exige força (pedalar) para que o motor funcione',
        'Não possui acelerador no punho',
        'Permite garupa apenas se houver assento ou cadeirinha apropriada fixada'
      ],
      ondeAndar: 'Permitido em ciclofaixas e ciclovias.'
    },
    {
      nome: 'Autopropelidos',
      icone: 'Scooter',
      velocidadeMax: 'Até 32 km/h',
      caracteristicas: [
        'Patinetes elétricos, monociclos e hoverboards',
        'Possuem acelerador',
        'Veículo estritamente INDIVIDUAL. NUNCA levar carona (especialmente crianças)'
      ],
      ondeAndar: 'Permitido em ciclofaixas e ciclovias.'
    },
    {
      nome: 'Ciclomotor',
      icone: 'Moped',
      velocidadeMax: 'De 32 km/h a 50 km/h',
      caracteristicas: [
        'Modelos mais potentes',
        'Obrigatório emplacamento',
        'Exige habilitação (ACC ou Categoria A)',
        'Garupa apenas acima de 10 anos e se alcançar firmemente os pedais (mesmas regras de moto)'
      ],
      ondeAndar: 'Somente LUGAR DE CARRO (RUA). PROIBIDO em ciclofaixas, ciclovias e calçadas.'
    }
  ],
  regras_calcadas: {
    regraGeral: 'Há uma desproporção física: a prioridade é SEMPRE do pedestre.',
    detalhes: [
      'CTB: Só é infração circular na calçada se houver placa proibindo. A regulamentação fica a cargo dos municípios.',
      'Rio de Janeiro: Permitido na calçada se a velocidade não passar de 6 km/h (ritmo de uma pessoa caminhando rápido).',
      'São Paulo: A CET proíbe completamente a circulação nas calçadas.'
    ]
  },
  riscos: [
    'Alta massa e velocidade causam colisões e atropelamentos graves em ciclovias.',
    'Riscos de traumatismos e fraturas devido à desproporção de impacto.',
    'Possibilidade de incêndios causados por baterias.'
  ],
  prevencao: [
    'Educação e respeito: o pedestre é o elo mais frágil.',
    'Reduzir a velocidade ao ultrapassar bicicletas convencionais ou passar perto de pedestres.',
    'Usar capacete e conferir as resoluções de emplacamento e habilitação do Contran para o seu modelo.'
  ]
};

// ============================================
// ESTATÍSTICAS E DADOS
// ============================================

export const ESTATISTICAS_TRANSITO = {
  brasil: {
    mortes_anuais: 'Aproximadamente 35.000 mortes no trânsito por ano',
    principais_causas: [
      'Excesso de velocidade',
      'Não uso de cinto de segurança',
      'Alcool ao volante',
      'Desatenção/celular',
      'Ultrapassagens perigosas'
    ]
  },
  
  impacto_velocidade: [
    {
      velocidade: '50 km/h',
      chance_morte_pedestre: '20%'
    },
    {
      velocidade: '60 km/h',
      chance_morte_pedestre: '50%'
    },
    {
      velocidade: '80 km/h',
      chance_morte_pedestre: '90%'
    }
  ],
  
  eficacia_drv: 'Uso correto de DRV reduz em até 71% o risco de morte em acidentes'
};

// ============================================
// NÚMEROS DE EMERGÊNCIA
// ============================================

export const EMERGENCIA_TRANSITO = {
  samu: '192',
  bombeiros: '193',
  policia: '190',
  policia_rodoviaria: '191',
  
  o_que_fazer_acidente: [
    'Sinalizar o local (triângulo a 30 metros)',
    'Ligar para emergência imediatamente',
    'NÃO mover vítimas (exceto risco iminente)',
    'Prestar primeiros socorros básicos se souber',
    'Aguardar socorro especializado',
    'Anotar dados do outro veículo se aplicável'
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getDispositivoPorIdade = (idade) => {
  if (idade < 1) return DISPOSITIVOS_RETENCAO[0]; // Bebê conforto
  if (idade < 4) return DISPOSITIVOS_RETENCAO[1]; // Cadeirinha
  if (idade < 10) return DISPOSITIVOS_RETENCAO[2]; // Booster
  return null;
};

export const getDispositivoPorPeso = (peso) => {
  if (peso < 13) return DISPOSITIVOS_RETENCAO[0];
  if (peso < 18) return DISPOSITIVOS_RETENCAO[1];
  if (peso < 36) return DISPOSITIVOS_RETENCAO[2];
  return null;
};

export default {
  DISPOSITIVOS_RETENCAO,
  MOBILIDADE_ATIVA,
  SEGURANCA_PEDESTRE,
  SEGURANCA_MOTO,
  MICROMOBILIDADE_ELETRICA,
  ESTATISTICAS_TRANSITO,
  EMERGENCIA_TRANSITO,
  getDispositivoPorIdade,
  getDispositivoPorPeso
};
