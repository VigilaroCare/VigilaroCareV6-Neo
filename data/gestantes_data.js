/**
 * gestantes_data.js
 * Dados completos para gestantes e primeiros meses do bebê
 * Vigilaro Care V5
 * 
 * Fonte: Ministério da Saúde, SBP, OMS, FEBRASGO
 * Atualizado: Novembro/2025
 */

// ============================================
// GESTAÇÃO E PRIMEIROS MESES
// ============================================

export const GESTACAO_DADOS = {
  id: 'gestacao',
  nome: 'Gestação e Primeiros Meses',
  icone: '🤰',
  cor: '#FF9CE5',
  descricao: 'Guia completo de segurança para gestantes e cuidados com recém-nascidos',
  
  fases: [
    {
      id: 'primeiro-trimestre',
      nome: '1º Trimestre',
      icone: '🤰',
      periodo: '1ª a 12ª semana',
      cor: '#FFE4F5',
      
      desenvolvimento: 'Formação dos órgãos principais do bebê. Coração começa a bater (5-6 semanas). Todos os sistemas começam a se desenvolver. Tamanho: de grão de arroz a uma ameixa.',
      
      sintomas_comuns: [
        'Náuseas e vômitos (especialmente pela manhã)',
        'Fadiga e sono excessivo',
        'Sensibilidade nos seios',
        'Mudanças de humor',
        'Aumento da frequência urinária',
        'Aversões alimentares'
      ],
      
      riscos: [
        {
          tipo: 'Quedas',
          nivel: 'ALTO',
          icone: '⚠️',
          cor: '#FF6B00',
          descricao: 'Tonturas e náuseas podem causar quedas. Centro de gravidade ainda não mudou muito, mas fadiga aumenta risco.',
          prevencoes: [
            'Usar calçados fechados e antiderrapantes',
            'Evitar sapatos de salto alto',
            'Levantar devagar (risco de hipotensão postural)',
            'Segurar em corrimãos ao subir/descer escadas',
            'Evitar subir em bancos ou escadas',
            'Manter casa bem iluminada',
            'Remover tapetes soltos'
          ]
        },
        {
          tipo: 'Produtos Químicos',
          nivel: 'CRÍTICO',
          icone: '🧪',
          cor: '#FF0000',
          descricao: 'Fase crítica de formação do bebê. Exposição a químicos pode causar malformações.',
          prevencoes: [
            'Evitar produtos de limpeza fortes',
            'Usar luvas ao limpar',
            'Manter ambiente ventilado',
            'Não pintar ambientes (tinta tem solventes)',
            'Evitar pesticidas e inseticidas',
            'Não fazer unhas com produtos químicos fortes',
            'Evitar tintura de cabelo (pelo menos 1º trimestre)'
          ]
        },
        {
          tipo: 'Medicamentos',
          nivel: 'CRÍTICO',
          icone: '💊',
          cor: '#9400D3',
          descricao: 'Muitos medicamentos são contraindicados na gestação. NUNCA se automedicar.',
          prevencoes: [
            'SEMPRE consultar médico antes de tomar qualquer remédio',
            'Informar TODOS os médicos que está grávida',
            'Evitar ibuprofeno, aspirina, anti-inflamatórios',
            'Suplementar ácido fólico (400-800 mcg/dia)',
            'Não usar medicamentos naturais sem orientação',
            'Manter lista de medicamentos permitidos'
          ]
        },
        {
          tipo: 'Alimentação',
          nivel: 'ALTO',
          icone: '🍽️',
          cor: '#FF9800',
          descricao: 'Alguns alimentos podem causar toxoplasmose, listeriose e outras infecções perigosas.',
          prevencoes: [
            'Evitar carnes cruas ou mal passadas',
            'Não comer peixes crus (sushi/sashimi)',
            'Evitar queijos não pasteurizados',
            'Lavar bem frutas e verduras',
            'Não consumir ovos crus ou mal cozidos',
            'Evitar fígado (excesso vitamina A)',
            'Limitar cafeína (máx 200mg/dia = 2 xícaras)',
            'ZERO álcool - nenhuma quantidade é segura'
          ]
        },
        {
          tipo: 'Infecções',
          nivel: 'ALTO',
          icone: '🦠',
          cor: '#E91E63',
          descricao: 'Toxoplasmose, rubéola, citomegalovírus podem causar problemas graves ao bebê.',
          prevencoes: [
            'Evitar contato com fezes de gato (toxoplasmose)',
            'Usar luvas ao jardinagem',
            'Lavar bem as mãos após tocar animais',
            'Cozinhar bem todas as carnes',
            'Evitar locais com aglomeração se imunidade baixa',
            'Manter vacinas em dia (antes de engravidar)',
            'Fazer pré-natal completo'
          ]
        }
      ],
      
      consultas_exames: [
        'Primeira consulta pré-natal (até 12 semanas)',
        'Ultrassom transvaginal (6-8 semanas)',
        'Ultrassom de translucência nucal (11-14 semanas)',
        'Exames de sangue: hemograma, tipo sanguíneo, sorologias',
        'Exame de urina e urocultura',
        'Papanicolau (se necessário)',
        'Iniciar suplementação (ácido fólico, ferro)'
      ],
      
      sinais_alerta: [
        '⚠️ Sangramento vaginal',
        '⚠️ Dor abdominal intensa',
        '⚠️ Febre acima de 38°C',
        '⚠️ Vômitos excessivos (mais de 3x ao dia)',
        '⚠️ Dor ao urinar',
        '⚠️ Corrimento com odor forte',
        '⚠️ Perda de líquido pela vagina'
      ],
      
      dicas_bemestar: [
        'Descansar sempre que possível',
        'Dormir pelo menos 8 horas por noite',
        'Manter hidratação (2-3 litros água/dia)',
        'Fazer refeições pequenas e frequentes',
        'Gengibre e vitamina B6 ajudam com náuseas',
        'Evitar cheiros fortes que desencadeiem náuseas',
        'Caminhar leve (se liberado pelo médico)',
        'Usar sutiã confortável e de sustentação'
      ]
    },
    
    {
      id: 'segundo-trimestre',
      nome: '2º Trimestre',
      icone: '🤰',
      periodo: '13ª a 26ª semana',
      cor: '#FFD4E5',
      
      desenvolvimento: 'Órgãos continuam amadurecendo. Bebê começa a se mexer (16-20 semanas). Desenvolvem-se cabelo, unhas. Consegue ouvir. Tamanho: de um limão a uma couve-flor.',
      
      sintomas_comuns: [
        'Diminuição de náuseas',
        'Mais energia (melhor fase!)',
        'Crescimento da barriga visível',
        'Movimentos do bebê',
        'Azia e má digestão',
        'Sangramento nasal',
        'Dores nas costas'
      ],
      
      riscos: [
        {
          tipo: 'Quedas',
          nivel: 'CRÍTICO',
          icone: '📉',
          cor: '#FF0000',
          descricao: 'Centro de gravidade começa a mudar. Barriga crescendo aumenta risco de desequilíbrio.',
          prevencoes: [
            'SEMPRE usar calçados fechados e baixos',
            'Evitar pisos molhados e escorregadios',
            'Segurar em apoios ao levantar/sentar',
            'Não subir em bancos ou escadas',
            'Ajustar altura de móveis se necessário',
            'Usar tapetes antiderrapantes no banheiro',
            'Pedir ajuda para alcançar objetos altos',
            'Evitar carregar peso (máx 5-10 kg)'
          ]
        },
        {
          tipo: 'Sobrepeso Excessivo',
          nivel: 'ALTO',
          icone: '⚖️',
          cor: '#FF9800',
          descricao: 'Ganho de peso muito rápido pode causar diabetes gestacional, hipertensão.',
          prevencoes: [
            'Ganho de peso esperado: 0,4-0,5 kg/semana',
            'Total no 2º trimestre: 5-6 kg',
            'Alimentação balanceada e saudável',
            'Evitar "comer por dois"',
            'Atividade física leve (com liberação médica)',
            'Controlar açúcar e sal',
            'Fazer 5-6 refeições pequenas ao dia'
          ]
        },
        {
          tipo: 'Dores nas Costas',
          nivel: 'MÉDIO',
          icone: '🦴',
          cor: '#FFD700',
          descricao: 'Peso da barriga sobrecarrega coluna. Hormônios relaxam ligamentos.',
          prevencoes: [
            'Manter postura correta ao sentar/andar',
            'Usar cadeira com apoio lombar',
            'Dormir de lado com travesseiro entre pernas',
            'Evitar ficar muito tempo na mesma posição',
            'Fazer alongamentos leves',
            'Massagens (se liberadas)',
            'Compressas mornas (não quentes!)',
            'Fisioterapia se necessário'
          ]
        },
        {
          tipo: 'Viagens',
          nivel: 'MÉDIO',
          icone: '✈️',
          cor: '#2196F3',
          descricao: '2º trimestre é melhor período para viajar, mas requer cuidados.',
          prevencoes: [
            'Consultar médico antes de viajar',
            'Evitar viagens após 28 semanas',
            'Levar cartão pré-natal e exames',
            'Usar cinto de segurança (sob e sobre a barriga)',
            'Levantar e caminhar a cada 2 horas',
            'Manter hidratação',
            'Evitar destinos com risco de Zika/dengue',
            'Ter seguro saúde/viagem'
          ]
        },
        {
          tipo: 'Atividade Física',
          nivel: 'MÉDIO',
          icone: '🏃‍♀️',
          cor: '#4CAF50',
          descricao: 'Exercícios são benéficos, mas devem ser adequados à gestação.',
          prevencoes: [
            'Sempre ter liberação médica',
            'Preferir: caminhada, natação, yoga para gestantes',
            'Evitar: esportes de contato, com risco de queda',
            'Não fazer abdominais tradicionais',
            'Manter frequência cardíaca controlada',
            'Parar se sentir dor, tontura, falta de ar',
            'Exercícios pélvicos (Kegel) são ótimos',
            'Não se exercitar em jejum'
          ]
        }
      ],
      
      consultas_exames: [
        'Consultas mensais de pré-natal',
        'Ultrassom morfológico (20-24 semanas) - IMPORTANTE',
        'Teste de tolerância à glicose (24-28 semanas)',
        'Hemograma de controle',
        'Ecocardiograma fetal (se indicado)',
        'Vacina contra gripe (se época)',
        'Vacina dTpa (após 20 semanas)'
      ],
      
      sinais_alerta: [
        '⚠️ Sangramento vaginal',
        '⚠️ Dor abdominal forte e persistente',
        '⚠️ Dor de cabeça intensa',
        '⚠️ Inchaço súbito de mãos/rosto',
        '⚠️ Visão turva ou manchas na visão',
        '⚠️ Diminuição dos movimentos do bebê',
        '⚠️ Contrações regulares antes de 37 semanas',
        '⚠️ Perda de líquido pela vagina'
      ],
      
      preparacao_bebe: [
        'Começar a montar enxoval',
        'Preparar quarto do bebê (pintar antes de 7 meses)',
        'Decidir tipo de parto com médico',
        'Fazer curso de gestantes',
        'Escolher maternidade',
        'Pesquisar sobre amamentação',
        'Definir pediatra'
      ]
    },
    
    {
      id: 'terceiro-trimestre',
      nome: '3º Trimestre',
      icone: '🤰',
      periodo: '27ª a 40ª semana',
      cor: '#FFC4D5',
      
      desenvolvimento: 'Bebê ganha peso rapidamente. Pulmões amadurecem. Abre os olhos. Se posiciona de cabeça para baixo. Tamanho: de uma berinjela a uma melancia.',
      
      sintomas_comuns: [
        'Barriga grande e pesada',
        'Dificuldade para dormir',
        'Falta de ar',
        'Azia intensa',
        'Inchaço nas pernas e pés',
        'Contrações de treinamento (Braxton Hicks)',
        'Vontade frequente de urinar',
        'Cansaço'
      ],
      
      riscos: [
        {
          tipo: 'Quedas',
          nivel: 'CRÍTICO',
          icone: '🚨',
          cor: '#FF0000',
          descricao: 'MAIOR RISCO! Barriga muito grande altera equilíbrio. Queda pode desencadear parto prematuro.',
          prevencoes: [
            'MÁXIMA ATENÇÃO ao caminhar',
            'Usar SEMPRE calçados seguros',
            'Segurar em corrimãos e apoios',
            'NÃO subir em lugar algum',
            'Pedir ajuda para TUDO',
            'Iluminar bem trajetos noturnos',
            'Remover todos os obstáculos do caminho',
            'Evitar pressa e movimentos bruscos',
            'Usar bengala se necessário'
          ]
        },
        {
          tipo: 'Trabalho de Parto Prematuro',
          nivel: 'CRÍTICO',
          icone: '👶',
          cor: '#FF3B30',
          descricao: 'Contrações regulares antes de 37 semanas. Bebê pode nascer prematuro.',
          prevencoes: [
            'Conhecer sinais de trabalho de parto',
            'Contrações regulares (a cada 10 min ou menos)',
            'Dor lombar persistente',
            'Pressão pélvica',
            'Perda de líquido ou sangue',
            'Repouso se recomendado pelo médico',
            'Evitar esforços físicos intensos',
            'Manter relações sexuais somente se liberadas'
          ]
        },
        {
          tipo: 'Pré-eclâmpsia',
          nivel: 'CRÍTICO',
          icone: '💉',
          cor: '#D32F2F',
          descricao: 'Pressão alta + proteína na urina. Pode evoluir para eclâmpsia (convulsões). EMERGÊNCIA!',
          prevencoes: [
            'Medir pressão regularmente',
            'Controlar ganho de peso',
            'Reduzir sal na alimentação',
            'Fazer todos os exames pré-natais',
            'SINAIS: inchaço súbito, dor cabeça forte, visão turva',
            'Repouso se pressão elevada',
            'Tomar cálcio se prescrito',
            'IR AO HOSPITAL se PA > 140x90'
          ]
        },
        {
          tipo: 'Diabetes Gestacional',
          nivel: 'ALTO',
          icone: '🍬',
          cor: '#FF9800',
          descricao: 'Aumento de açúcar no sangue. Pode complicar parto e afetar bebê.',
          prevencoes: [
            'Seguir dieta rigorosa se diagnosticada',
            'Medir glicemia conforme orientação',
            'Evitar doces, carboidratos simples',
            'Fazer exercícios leves',
            'Fracionar refeições (6x ao dia)',
            'Aplicar insulina se necessário',
            'Controlar peso',
            'Monitorar crescimento do bebê'
          ]
        },
        {
          tipo: 'Falta de Ar',
          nivel: 'MÉDIO',
          icone: '😮‍💨',
          cor: '#2196F3',
          descricao: 'Útero pressiona diafragma. Normal, mas pode ser desconfortável.',
          prevencoes: [
            'Manter postura ereta',
            'Dormir com travesseiros elevados',
            'Evitar refeições grandes',
            'Fazer pausas ao andar',
            'Respirar profundamente e devagar',
            'Evitar ambientes abafados',
            'Se falta de ar súbita/intensa: procurar médico'
          ]
        }
      ],
      
      consultas_exames: [
        'Consultas quinzenais (até 36 semanas)',
        'Consultas semanais (após 36 semanas)',
        'Ultrassom de 3º trimestre',
        'Monitoramento de pressão arterial',
        'Exame de estreptococo do grupo B (35-37 sem)',
        'Cardiotocografia (monitora batimentos)',
        'Hemograma final',
        'Definir data/tipo de parto'
      ],
      
      sinais_trabalho_parto: [
        '🚨 Contrações regulares (a cada 5-10 min)',
        '🚨 Perda do tampão mucoso (catarro com sangue)',
        '🚨 Bolsa rompida (perda de líquido)',
        '🚨 Sangramento vermelho vivo',
        '🚨 Diminuição dos movimentos fetais',
        '🚨 Dor lombar intensa e contínua'
      ],
      
      preparacao_final: [
        'Montar bolsa da maternidade (36 semanas)',
        'Ter plano B para chegar à maternidade',
        'Deixar documentos organizados',
        'Preparar casa para chegada do bebê',
        'Instalar bebê conforto no carro',
        'Ter números de emergência visíveis',
        'Fazer pré-admissão na maternidade',
        'Decidir quem vai acompanhar o parto'
      ],
      
      bolsa_maternidade: {
        mae: [
          'Documentos (RG, cartão pré-natal, exames)',
          'Camisolas abertas na frente (2-3)',
          'Roupão',
          'Chinelos',
          'Sutiã de amamentação (2)',
          'Absorventes noturnos',
          'Calcinha pós-parto ou descartável',
          'Produtos de higiene pessoal',
          'Escova e pente',
          'Carregador de celular'
        ],
        bebe: [
          'Roupas de RN (3-4 bodies, macacões)',
          'Mantas (2-3)',
          'Fraldas RN (1 pacote)',
          'Toalhas de boca',
          'Meias e luvas',
          'Gorro',
          'Pomada para assadura',
          'Termômetro',
          'Bebê conforto para saída'
        ],
        acompanhante: [
          'Documentos',
          'Troca de roupa',
          'Produtos de higiene',
          'Snacks e água',
          'Câmera/celular carregado'
        ]
      }
    },
    
    {
      id: 'recem-nascido',
      nome: 'Recém-nascido',
      icone: '👶',
      periodo: '0 a 30 dias',
      cor: '#E1F5FE',
      
      desenvolvimento: 'Adaptação à vida fora do útero. Sono 16-18h/dia. Alimentação a cada 2-3 horas. Visão turva (20-30cm). Reconhece voz da mãe.',
      
      cuidados_essenciais: [
        'Amamentação exclusiva sob livre demanda',
        'Trocar fralda a cada 2-3 horas',
        'Banho diário com água morna',
        'Cuidados com coto umbilical',
        'Manter bebê aquecido (não superaquecer)',
        'Sono SEMPRE de barriga para cima'
      ],
      
      riscos: [
        {
          tipo: 'SMSL (Morte Súbita)',
          nivel: 'CRÍTICO',
          icone: '🛏️',
          cor: '#FF0000',
          descricao: 'Morte súbita e inexplicável de bebês saudáveis durante o sono. MAIOR RISCO: 2-4 meses.',
          prevencoes: [
            'SEMPRE colocar de BARRIGA PARA CIMA',
            'Colchão FIRME e plano',
            'SEM travesseiros, cobertores fofos, bichos de pelúcia',
            'SEM protetores de berço almofadados',
            'Temperatura ambiente confortável (20-22°C)',
            'Pés encostados no pé do berço',
            'Roupas adequadas (não superaquecer)',
            'Amamentação reduz risco',
            'Chupeta ao dormir (após amamentação estabelecida)',
            'Não fumar perto do bebê',
            'Berço no quarto dos pais (até 6 meses)'
          ]
        },
        {
          tipo: 'Sufocação',
          nivel: 'CRÍTICO',
          icone: '⚠️',
          cor: '#D32F2F',
          descricao: 'Bebês não têm força para virar cabeça se algo obstruir respiração.',
          prevencoes: [
            'Berço vazio (só bebê e colchão)',
            'Lençol bem esticado e preso',
            'Nunca cobrir cabeça do bebê',
            'Não adormecer com bebê no colo',
            'Não dividir travesseiro',
            'Cuidado ao amamentar deitada (não adormecer)',
            'Não deixar sozinho em sofás/camas',
            'Supervisão SEMPRE ao trocar fralda'
          ]
        },
        {
          tipo: 'Quedas',
          nivel: 'CRÍTICO',
          icone: '📉',
          cor: '#FF6B00',
          descricao: 'Cabeça é pesada e ossos frágeis. Qualquer queda pode ser grave.',
          prevencoes: [
            'NUNCA deixar sozinho em lugares altos',
            'SEMPRE uma mão segurando ao trocar fralda',
            'Usar trocador com cintas de segurança',
            'Não colocar bebê conforto em cima de mesas',
            'Cuidado ao carregar (sempre apoiar cabeça)',
            'Não carregar com uma mão só',
            'Atenção redobrada se tiver outros filhos',
            'Berço com grades até o chão'
          ]
        },
        {
          tipo: 'Infecções',
          nivel: 'ALTO',
          icone: '🦠',
          cor: '#9C27B0',
          descricao: 'Sistema imunológico imaturo. Qualquer infecção pode ser grave.',
          prevencoes: [
            'Lavar mãos ANTES de tocar no bebê',
            'Evitar visitas nos primeiros 15 dias',
            'Não beijar rosto/mãos do bebê',
            'Ninguém doente perto do bebê',
            'Vacinas em dia',
            'Amamentação exclusiva (protege)',
            'FEBRE em RN é SEMPRE emergência (>37,8°C)',
            'Observar sinais: choro diferente, moleza, recusa de mamar'
          ]
        },
        {
          tipo: 'Queimaduras',
          nivel: 'ALTO',
          icone: '🔥',
          cor: '#FF4500',
          descricao: 'Pele muito fina e sensível. Queimaduras podem ser gravíssimas.',
          prevencoes: [
            'Testar temperatura da água do banho (36-37°C)',
            'Usar SEMPRE termômetro',
            'Água fria primeiro, depois quente',
            'Nunca segurar bebê perto do fogão',
            'Não cozinhar com bebê no colo',
            'Não aquecer mamadeira no micro-ondas',
            'Testar temperatura do leite no pulso',
            'Manter longe de líquidos quentes'
          ]
        },
        {
          tipo: 'Engasgamento',
          nivel: 'MÉDIO',
          icone: '🍼',
          cor: '#FFD700',
          descricao: 'Bebês podem engasgar com leite, especialmente se posição incorreta.',
          prevencoes: [
            'Amamentar com cabeça elevada',
            'Pausas para arrotar durante mamada',
            'Arrotar SEMPRE após mamar',
            'Não deitar imediatamente após mamar',
            'Se mamadeira: furo adequado no bico',
            'Observar durante toda mamada',
            'Aprender manobra de desengasgo'
          ]
        }
      ],
      
      amamentacao: {
        beneficios: [
          'Protege contra infecções',
          'Reduz risco de alergias',
          'Fortalece vínculo mãe-bebê',
          'Reduz risco de SMSL',
          'Previne obesidade infantil',
          'Ajuda útero a voltar ao normal',
          'É gratuito e sempre pronto'
        ],
        dicas: [
          'Oferecer sob livre demanda (8-12x ao dia)',
          'Pega correta: boca aberta, aréola toda dentro',
          'Alternar seios a cada mamada',
          'Esvaziar bem um seio antes de trocar',
          'Duração: quanto o bebê quiser',
          'Posição confortável (várias posições possíveis)',
          'Hidratar-se bem',
          'Alimentação materna não precisa ser especial',
          'Evitar álcool e cigarro'
        ],
        problemas_comuns: [
          'Dor: verificar pega, passar leite após mamar',
          'Rachaduras: corrigir pega, usar concha protetora',
          'Ingurgitamento: amamentar frequente, compressas mornas',
          'Pouco leite: oferecer mais vezes, hidratar-se',
          'Mastite: febre + vermelhidão, procurar médico'
        ]
      },
      
      sinais_alerta: [
        '🚨 FEBRE (>37,8°C axilar) - SEMPRE emergência',
        '🚨 Recusa total de mamar',
        '🚨 Moleza excessiva',
        '🚨 Choro inconsolável por horas',
        '🚨 Vômitos em jato',
        '🚨 Diarreia intensa',
        '🚨 Pele azulada ou muito pálida',
        '🚨 Menos de 6 fraldas molhadas/dia',
        '🚨 Umbigo vermelho, inchado ou com pus',
        '🚨 Respiração muito rápida ou ofegante',
        '🚨 Icterícia intensa (amarelão)'
      ],
      
      coto_umbilical: [
        'Limpar com álcool 70% a cada troca de fralda',
        'Deixar secar ao ar',
        'Fralda dobrada abaixo do coto',
        'Não colocar faixas ou moedas',
        'Cai entre 7-21 dias',
        'Sangramento leve ao cair é normal',
        'Se vermelhidão, inchaço ou pus: procurar médico'
      ],
      
      vacinas_primeiro_mes: [
        'BCG (logo após nascer)',
        'Hepatite B (logo após nascer)',
        'Consulta com pediatra (7-10 dias)',
        'Teste do pezinho (até 5º dia)',
        'Teste da orelhinha',
        'Teste do olhinho',
        'Teste do coraçãozinho'
      ],
      
      desenvolvimento_esperado: [
        'Reflexo de sucção',
        'Reflexo de Moro (susto)',
        'Agarra dedo colocado na mão',
        'Vira cabeça para sons',
        'Foca em rostos (20-30cm)',
        'Começa a sorrir socialmente (3-4 semanas)'
      ]
    }
  ]
};

// ============================================
// CHECKLISTS ESPECÍFICOS
// ============================================

export const CHECKLIST_MATERNIDADE = {
  id: 'bolsa-maternidade',
  nome: 'Bolsa da Maternidade',
  icone: '🏥',
  
  categorias: [
    {
      categoria: 'Para a Mãe',
      itens: [
        'Documentos (RG, cartão pré-natal, carteirinha plano)',
        'Exames recentes',
        'Camisolas que abram na frente (2-3)',
        'Roupão',
        'Chinelos antiderrapantes',
        'Sutiã de amamentação (2)',
        'Absorventes pós-parto',
        'Calcinha pós-parto (3-4)',
        'Produtos de higiene',
        'Escova de cabelo',
        'Escova de dentes',
        'Lenços umedecidos',
        'Roupa confortável para saída',
        'Carregador de celular',
        'Fones de ouvido',
        'Snacks'
      ]
    },
    {
      categoria: 'Para o Bebê',
      itens: [
        'Bodies manga curta RN (3)',
        'Bodies manga longa RN (3)',
        'Macacões RN (3)',
        'Mijão ou calça RN (2)',
        'Casaquinho (1)',
        'Mantas (2-3)',
        'Fraldas RN (1 pacote)',
        'Lenços umedecidos',
        'Toalhas de boca (6)',
        'Luvas e meias (2 pares)',
        'Gorro',
        'Pomada para assadura',
        'Termômetro digital',
        'Bebê conforto instalado no carro'
      ]
    },
    {
      categoria: 'Para o Acompanhante',
      itens: [
        'Documentos',
        'Troca de roupa',
        'Produtos de higiene',
        'Travesseiro pequeno',
        'Snacks e água',
        'Carregador de celular',
        'Dinheiro/cartão',
        'Lista de contatos'
      ]
    }
  ]
};

export const CHECKLIST_QUARTO_BEBE = {
  id: 'quarto-bebe-seguro',
  nome: 'Quarto do Bebê Seguro',
  icone: '🛏️',
  
  itens: [
    {
      item: 'Berço certificado Inmetro',
      critico: true,
      detalhes: 'Grades com espaçamento máximo de 6 cm'
    },
    {
      item: 'Colchão firme e do tamanho exato do berço',
      critico: true,
      detalhes: 'Sem espaços nas laterais'
    },
    {
      item: 'Lençol bem esticado e preso',
      critico: true,
      detalhes: 'Sem folgas que possam cobrir rosto'
    },
    {
      item: 'SEM travesseiros, cobertores fofos, bichos de pelúcia',
      critico: true,
      detalhes: 'Berço deve ter APENAS bebê e colchão'
    },
    {
      item: 'SEM protetor de berço almofadado',
      critico: true,
      detalhes: 'Risco de sufocação'
    },
    {
      item: 'Berço longe de janelas',
      critico: true,
      detalhes: 'Evitar quedas e correntes de ar'
    },
    {
      item: 'Berço longe de cordas de cortinas',
      critico: true,
      detalhes: 'Risco de estrangulamento'
    },
    {
      item: 'Trocador com cinta de segurança',
      critico: true,
      detalhes: 'SEMPRE usar a cinta'
    },
    {
      item: 'Produtos de higiene fora do alcance',
      critico: false,
      detalhes: 'Em prateleira alta ou armário trancado'
    },
    {
      item: 'Temperatura ambiente confortável (20-22°C)',
      critico: false,
      detalhes: 'Nem muito quente, nem muito frio'
    },
    {
      item: 'Luz noturna suave',
      critico: false,
      detalhes: 'Para trocas e mamadas noturnas'
    },
    {
      item: 'Tomadas protegidas',
      critico: true,
      detalhes: 'Mesmo que bebê ainda não engatinhe'
    }
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getFasePorId = (faseId) => {
  return GESTACAO_DADOS.fases.find(f => f.id === faseId) || null;
};

export const getFaseAtual = (semanas) => {
  if (semanas <= 12) return getFasePorId('primeiro-trimestre');
  if (semanas <= 26) return getFasePorId('segundo-trimestre');
  if (semanas <= 40) return getFasePorId('terceiro-trimestre');
  return getFasePorId('recem-nascido');
};

export default {
  GESTACAO_DADOS,
  CHECKLIST_MATERNIDADE,
  CHECKLIST_QUARTO_BEBE,
  getFasePorId,
  getFaseAtual
};
