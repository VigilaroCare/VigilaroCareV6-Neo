/**
 * acidentes_data.js
 * Base de dados completa de riscos e prevenções por faixa etária
 * Vigilaro Care V5
 * 
 * Fonte: Ministério da Saúde (DATASUS), Criança Segura, ABNT
 * Atualizado: Novembro/2025
 */

// ============================================
// RISCOS E PREVENÇÕES POR FAIXA ETÁRIA
// ============================================

export const RISCOS_POR_IDADE = {
  'bebe': {
    id: 'bebe',
    nome: 'Bebê',
    faixaEtaria: '0 a 2 anos',
    icone: '👶',
    cor: '#FFB6C1',
    
    caracteristicas: 'Nessa fase, a criança se caracteriza pela fragilidade e falta de capacidade para reagir aos perigos. Seus corpos são frágeis, com pele mais fina, órgãos internos imaturos e esqueleto mais delicado. O peso da cabeça é proporcionalmente maior, e elas ainda não possuem força suficiente para se levantar sozinhas.',
    
    principalCausaMorte: 'Sufocação e Engasgamento',
    principalCausaInternacao: 'Quedas',
    
    riscos: [
      {
        tipo: 'Sufocação e Engasgamento',
        nivel: 'CRÍTICO',
        icone: '⚠️',
        cor: '#FF0000',
        descricao: 'SUFOCAÇÃO E ENGASGO: principal causa de morte acidental em bebês menores de 1 ano. Três tipos distintos: (1) Sufocação em berço — objetos macios (travesseiros, almofadas, pelúcias), coleito (bebê dormindo com adultos), superaquecimento. Prevenção: berço vazio, bebê de costas, superfície firme. (2) Engasgo — alimentos inteiros (uva, amendoim), objetos pequenos. Nunca oferecer alimentos redondos inteiros antes dos 4 anos. (3) Inalação de vômito — risco aumentado em bebês com refluxo. O risco de sufocação dormindo de costas é MENOR que o risco de morte súbita dormindo de bruços. Mantenha SEMPRE a posição de costas. (SBP 2023)',
        estatistica: 'Principal causa de óbito nesta faixa etária',
        prevencoes: [
          {
            titulo: 'Posição para dormir',
            itens: [
              'Dormir SEMPRE de barriga para cima em colchão firme',
              'Manter a cabeça descoberta durante o sono',
              'Posicionar os pés encostados na borda inferior do berço',
              'Nunca usar travesseiros para bebês menores de 1 ano'
            ]
          },
          {
            titulo: 'Segurança do berço',
            itens: [
              'Usar berço certificado pelo Inmetro e ABNT',
              'Remover travesseiros, cobertores fofos e protetores de berço',
              'Retirar todos os objetos macios e brinquedos do berço',
              'Grades fixas com distância máxima de 6 cm entre elas',
              'Nunca usar berço compartilhado por duas crianças'
            ]
          },
          {
            titulo: 'Ambiente geral',
            itens: [
              'Manter piso livre de objetos pequenos (botões, moedas)',
              'Evitar roupas com cordões longos ou enfeites soltos',
              'Nunca usar correntinhas ou cordões no pescoço do bebê',
              'Em dias frios, agasalhar mais o bebê em vez de usar cobertores'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'ALTO',
        icone: '📉',
        cor: '#FF6B00',
        descricao: 'Principal causa de internação. Favorecidas pela coordenação motora em desenvolvimento e cabeça desproporcional ao corpo.',
        estatistica: 'Principal causa de internação nesta faixa etária',
        prevencoes: [
          {
            titulo: 'Supervisão constante',
            itens: [
              'NUNCA deixar o bebê sozinho em superfícies altas',
              'Manter SEMPRE uma mão segurando o bebê durante troca de fraldas',
              'Não deixar em camas, sofás ou mesas sem supervisão',
              'Usar trocador com cintas de segurança'
            ]
          },
          {
            titulo: 'Ambiente seguro',
            itens: [
              'Posicionar berço longe de janelas',
              'Usar grades de proteção em escadas desde o nascimento',
              'Manter móveis baixos longe de janelas',
              'O uso de andadores NÃO É ACONSELHADO pela SBP'
            ]
          }
        ]
      },
      {
        tipo: 'Queimaduras',
        nivel: 'ALTO',
        icone: '🔥',
        cor: '#FF4500',
        descricao: 'Pele mais fina e sensível torna os bebês extremamente vulneráveis a queimaduras graves.',
        prevencoes: [
          {
            titulo: 'Na cozinha',
            itens: [
              'Cozinhar nas bocas de trás do fogão',
              'Cabos das panelas sempre virados para dentro',
              'NUNCA carregar o bebê no colo ao manipular líquidos quentes',
              'Manter bebês longe da cozinha durante preparo de alimentos'
            ]
          },
          {
            titulo: 'Banho seguro',
            itens: [
              'Testar temperatura da água com termômetro (35°C a 37°C)',
              'Sempre colocar água fria primeiro, depois a quente',
              'Misturar bem a água antes de colocar o bebê',
              'Nunca deixar torneira de água quente ao alcance'
            ]
          }
        ]
      },
      {
        tipo: 'Envenenamento e Intoxicação',
        nivel: 'ALTO',
        icone: '☠️',
        cor: '#9400D3',
        descricao: 'Estrutura corporal menor e metabolismo mais rápido causam consequências mais sérias em casos de intoxicação.',
        prevencoes: [
          {
            titulo: 'Armazenamento seguro',
            itens: [
              'Guardar medicamentos trancados em lugar alto',
              'Produtos de limpeza em armários com trava de segurança',
              'Nunca transferir produtos químicos para garrafas de refrigerante',
              'Manter álcool, enxaguantes bucais e perfumes fora de alcance'
            ]
          },
          {
            titulo: 'Prevenção',
            itens: [
              'NUNCA chamar medicamento de "doce" ou "docinho"',
              'Não misturar produtos químicos diferentes',
              'Ter sempre à mão o número do CIATOX: 0800 722 6001'
            ]
          }
        ]
      },
      {
        tipo: 'Afogamento',
        nivel: 'CRÍTICO',
        icone: '💧',
        cor: '#0000FF',
        descricao: 'Bebês podem se afogar em apenas 2,5 cm de água (banheira, balde, vaso sanitário, pia).',
        prevencoes: [
          {
            titulo: 'Supervisão',
            itens: [
              'Supervisão CONSTANTE e ATIVA - nunca deixar sozinho na água',
              'Não se distrair com celular durante o banho',
              'Nunca deixar outro filho cuidando do banho do bebê',
              'Esvaziar banheira imediatamente após o uso'
            ]
          },
          {
            titulo: 'Ambiente',
            itens: [
              'Esvaziar e guardar baldes e bacias VIRADOS PARA BAIXO',
              'Manter tampa do vaso sanitário abaixada e lacrada',
              'Portas de banheiro e lavanderia fechadas/trancadas',
              'Remover água de recipientes após uso (baldes, bacias)'
            ]
          }
        ]
      },
      {
        tipo: 'Trânsito',
        nivel: 'ALTO',
        icone: '🚗',
        cor: '#FFD700',
        descricao: 'Uso correto de dispositivos de retenção pode reduzir em até 71% o risco de morte.',
        prevencoes: [
          {
            titulo: 'Bebê conforto (obrigatório)',
            itens: [
              'Uso OBRIGATÓRIO de bebê conforto certificado pelo Inmetro',
              'Instalar DE COSTAS para o movimento até pelo menos 1 ano',
              'Usar até atingir peso máximo (geralmente 13 kg)',
              'Sempre no banco traseiro, preferencialmente no meio',
              'Ajustar as tiras conforme crescimento do bebê'
            ]
          }
        ]
      }
    ]
  },

  'crianca': {
    id: 'crianca',
    nome: 'Criança',
    faixaEtaria: '3 a 10 anos',
    icone: '🧒',
    cor: '#87CEEB',
    
    caracteristicas: 'Nessa fase, a criança é muito curiosa e experimenta o mundo pela boca e outros sentidos. Estão mais independentes, mas não percebem os perigos nem sabem se proteger. Ainda possuem coordenação motora em desenvolvimento e cabeça desproporcional, o que favorece desequilíbrios.',
    
    principalCausaMorte: 'Afogamento (1-4 anos) / Trânsito (5-10 anos)',
    principalCausaInternacao: 'Quedas',
    
    riscos: [
      {
        tipo: 'Afogamento',
        nivel: 'CRÍTICO',
        icone: '🏊',
        cor: '#0000FF',
        descricao: 'É a PRIMEIRA causa de morte por acidente na faixa de 1 a 4 anos. Pode ocorrer em recipientes com apenas dois dedos de água.',
        estatistica: 'Principal causa de morte em crianças de 1-4 anos',
        prevencoes: [
          {
            titulo: 'Supervisão',
            itens: [
              'Supervisão CONSTANTE de um adulto - regra dos 10 segundos',
              'Adulto deve estar ao alcance do braço da criança',
              'Nunca delegar supervisão a outra criança',
              'Não se distrair com celular, leitura ou conversas'
            ]
          },
          {
            titulo: 'Piscinas',
            itens: [
              'Cercar piscina com cerca de NO MÍNIMO 1,5m de altura',
              'Portões com trava de segurança e cadeado',
              'Remover escadas de piscinas infláveis após uso',
              'Manter brinquedos longe da piscina quando não em uso'
            ]
          },
          {
            titulo: 'Equipamentos',
            itens: [
              'COLETE SALVA-VIDAS é o equipamento mais seguro',
              'EVITAR boias infláveis - dão falsa sensação de segurança',
              'Boias de braço podem furar ou escorregar',
              'Ensinar natação a partir dos 4 anos'
            ]
          },
          {
            titulo: 'Recipientes',
            itens: [
              'Esvaziar baldes, bacias e piscinas infantis após uso',
              'Guardar virados para baixo',
              'Tampa do vaso sanitário sempre abaixada',
              'Portas de banheiro fechadas'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'ALTO',
        icone: '🪜',
        cor: '#FF6B00',
        descricao: 'Principal causa de internação. A cabeça desproporcional favorece o desequilíbrio, e crianças são naturalmente escaladoras.',
        estatistica: 'Principal causa de internação em todas as faixas de 0-14 anos',
        prevencoes: [
          {
            titulo: 'Escadas',
            itens: [
              'Portões de segurança no TOPO e na BASE das escadas',
              'Portões certificados pelo Inmetro',
              'Manter portões sempre fechados',
              'Ensinar a descer de costas ou sentado'
            ]
          },
          {
            titulo: 'Janelas e sacadas',
            itens: [
              'Instalar grades ou redes de proteção certificadas',
              'Espaços de NO MÁXIMO 6 cm entre as grades',
              'Manter móveis escaláveis longe de janelas',
              'Não confiar apenas em telas mosquiteiro'
            ]
          },
          {
            titulo: 'Beliches',
            itens: [
              'Crianças menores de 6 anos NÃO devem dormir em beliches',
              'Grade de proteção em todo o perímetro da cama superior',
              'Escada fixa e antiderrapante',
              'Ensinar a não pular ou brincar no beliche'
            ]
          }
        ]
      },
      {
        tipo: 'Trânsito',
        nivel: 'CRÍTICO',
        icone: '🚸',
        cor: '#FFD700',
        descricao: 'Principal causa de morte em crianças de 5-10 anos. Crianças não desenvolveram percepção de velocidade x distância.',
        estatistica: 'Principal causa de morte acidental de 5-14 anos',
        prevencoes: [
          {
            titulo: 'No veículo (1-4 anos)',
            itens: [
              'Uso OBRIGATÓRIO de cadeirinha (9 kg a 18 kg)',
              'Instalar de frente para o movimento',
              'Sempre no banco traseiro',
              'Ajustar as tiras conforme crescimento',
              'Nunca deixar criança sozinha no carro'
            ]
          },
          {
            titulo: 'No veículo (4-10 anos)',
            itens: [
              'Uso de assento de elevação (booster) até 1,45m de altura',
              'Transportar no banco traseiro até 10 anos',
              'Cinto passando pelo meio do ombro e pelo quadril',
              'Nunca usar cinto apenas no pescoço ou barriga'
            ]
          },
          {
            titulo: 'Como pedestre',
            itens: [
              'Crianças até 10 anos NÃO devem andar sozinhas na rua',
              'Ensinar a olhar para AMBOS os lados antes de atravessar',
              'SEMPRE usar faixa de pedestre',
              'Nunca correr precipitadamente para a rua',
              'Respeitar semáforos',
              'Usar roupas claras à noite'
            ]
          }
        ]
      },
      {
        tipo: 'Sufocação e Engasgamento',
        nivel: 'ALTO',
        icone: '🍬',
        cor: '#FF0000',
        descricao: 'Crianças pequenas têm pouca experiência em mastigar e engolir, e exploram objetos pela boca.',
        prevencoes: [
          {
            titulo: 'Alimentos',
            itens: [
              'Cortar alimentos em pedaços PEQUENOS e NÃO REDONDOS',
              'Cortar uvas, tomates cereja no sentido longitudinal',
              'EVITAR: pipoca, nozes, balas duras, cenoura crua',
              'Remover caroços de frutas e ossos de carnes',
              'Ensinar a comer sentado, com calma',
              'Nunca deixar comer enquanto corre ou brinca'
            ]
          },
          {
            titulo: 'Objetos',
            itens: [
              'Brinquedos apropriados para a idade (selo Inmetro)',
              'Evitar brinquedos com peças pequenas para menores de 3 anos',
              'Não dar balões de látex para menores de 8 anos',
              'Guardar pilhas, botões e moedas fora de alcance'
            ]
          }
        ]
      },
      {
        tipo: 'Queimaduras',
        nivel: 'ALTO',
        icone: '🔥',
        cor: '#FF4500',
        descricao: 'Pele mais fina torna crianças mais vulneráveis a lesões graves.',
        prevencoes: [
          {
            titulo: 'Cozinha',
            itens: [
              'Cabos das panelas virados para dentro',
              'Cozinhar nas bocas de trás',
              'Manter crianças longe do fogão',
              'Não usar toalhas de mesa compridas'
            ]
          },
          {
            titulo: 'Elétrica',
            itens: [
              'Proteger TODAS as tomadas com tampas certificadas',
              'Isolar fiações desencapadas',
              'Evitar benjamins e extensões',
              'Ensinar a não colocar objetos em tomadas'
            ]
          },
          {
            titulo: 'Inflamáveis',
            itens: [
              'Guardar fósforos, isqueiros e velas em lugar alto',
              'Nunca usar álcool para limpeza ou acender churrasqueira',
              'Não permitir brincadeiras com fogos de artifício',
              'Ensinar sobre perigos do fogo'
            ]
          }
        ]
      },
      {
        tipo: 'Intoxicação',
        nivel: 'MÉDIO',
        icone: '🧪',
        cor: '#9400D3',
        descricao: 'Quinta maior causa de internação acidental. Curiosidade leva crianças a experimentarem substâncias.',
        prevencoes: [
          {
            titulo: 'Armazenamento',
            itens: [
              'Produtos de limpeza em armários altos com trava',
              'Medicamentos trancados e fora de vista',
              'Manter produtos em embalagens originais',
              'Nunca transferir para garrafas PET'
            ]
          },
          {
            titulo: 'Prevenção',
            itens: [
              'Nunca chamar remédio de "docinho"',
              'Ensinar que nem tudo se pode comer ou beber',
              'Ter número do CIATOX salvo: 0800 722 6001'
            ]
          }
        ]
      },
      {
        tipo: 'Armas de Fogo',
        nivel: 'ALTO',
        icone: '🔫',
        cor: '#8B0000',
        descricao: 'Crianças até 8 anos não distinguem armas reais de brinquedo; até 10 anos não entendem consequências.',
        prevencoes: [
          {
            titulo: 'Segurança',
            itens: [
              'A melhor prevenção é NÃO possuir armas',
              'Se tiver: guardar DESCARREGADA e TRAVADA',
              'Munições em local SEPARADO e TRANCADO',
              'Ensinar a NUNCA tocar em armas',
              'Ensinar a avisar um adulto se encontrar uma arma'
            ]
          }
        ]
      }
    ]
  },

  'adolescente': {
    id: 'adolescente',
    nome: 'Adolescente',
    faixaEtaria: '11 a 17 anos',
    icone: '👦',
    cor: '#9370DB',
    
    caracteristicas: 'Adolescentes conquistaram mais autonomia, mas o desejo de viver novas experiências, a ousadia e a falsa sensação de serem inatingíveis os colocam em situações de risco. Há maior exposição a influências de grupos, comportamentos de risco e experimentação.',
    
    principalCausaMorte: 'Trânsito (acidentes e atropelamentos)',
    principalCausaInternacao: 'Quedas',
    
    riscos: [
      {
        tipo: 'Trânsito',
        nivel: 'CRÍTICO',
        icone: '🏍️',
        cor: '#FFD700',
        descricao: 'Principal causa de morte. Adolescentes são mais vulneráveis por comportamentos de risco, excesso de confiança e distração.',
        estatistica: 'Principal causa de morte acidental em adolescentes',
        prevencoes: [
          {
            titulo: 'Como passageiro',
            itens: [
              'Podem ser transportados em motocicletas SOMENTE a partir dos 10 anos',
              'Sempre usar capacete certificado pelo Inmetro',
              'Usar booster se tiver menos de 1,45m de altura',
              'Banco traseiro até 10 anos completos',
              'Sempre usar cinto de segurança'
            ]
          },
          {
            titulo: 'Como pedestre',
            itens: [
              'Mobilidade autônoma recomendada a partir dos 10 anos',
              'Usar vias com BAIXO fluxo e velocidade máxima 50 km/h',
              'Preferir vias bem sinalizadas (faixa, semáforo)',
              'NUNCA atravessar olhando para celular',
              'Usar roupas claras ou materiais reflexivos à noite',
              'Evitar fones de ouvido ao atravessar ruas'
            ]
          },
          {
            titulo: 'Bicicleta/Skate/Patinete',
            itens: [
              'SEMPRE usar capacete certificado',
              'Usar joelheiras e cotoveleiras',
              'Andar em ciclovias, parques ou vias calmas',
              'Nunca andar contra o fluxo de carros',
              'Respeitar semáforos e sinalização',
              'Não usar celular enquanto pedala'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'ALTO',
        icone: '🧗',
        cor: '#FF6B00',
        descricao: 'Principal motivo de internação. Atividades esportivas, exploração urbana e comportamentos de risco aumentam quedas.',
        prevencoes: [
          {
            titulo: 'Esportes',
            itens: [
              'Usar equipamentos de proteção adequados ao esporte',
              'Praticar em locais apropriados e seguros',
              'Respeitar limites físicos',
              'Nunca praticar parkour sem treinamento profissional'
            ]
          },
          {
            titulo: 'Ambiente',
            itens: [
              'Não subir em telhados, lajes ou locais perigosos',
              'Não se aproximar de beiradas de sacadas/janelas',
              'Evitar "selfies" em locais de risco',
              'Não escalar prédios ou estruturas abandonadas'
            ]
          }
        ]
      },
      {
        tipo: 'Afogamento',
        nivel: 'MÉDIO',
        icone: '🏊',
        cor: '#0000FF',
        descricao: 'Superestimação da capacidade de natação e comportamentos de risco aumentam acidentes.',
        prevencoes: [
          {
            titulo: 'Piscinas e praias',
            itens: [
              'Nunca superestimar habilidade de natação',
              'Não nadar sozinho, mesmo sabendo nadar',
              'Respeitar placas de correnteza e profundidade',
              'Não mergulhar em locais desconhecidos',
              'Evitar nadar após consumir álcool'
            ]
          },
          {
            titulo: 'Embarcações',
            itens: [
              'SEMPRE usar colete salva-vidas',
              'Nunca pular de barcos em movimento',
              'Respeitar capacidade máxima da embarcação'
            ]
          }
        ]
      },
      {
        tipo: 'Queimaduras',
        nivel: 'MÉDIO',
        icone: '🎆',
        cor: '#FF4500',
        descricao: 'Uso de fogos de artifício, festas juninas e experimentos aumentam risco.',
        prevencoes: [
          {
            titulo: 'Fogos de artifício',
            itens: [
              'Nunca soltar fogos de artifício sem supervisão adulta',
              'Manter distância segura',
              'Não tentar reacender fogos que falharam',
              'Usar óculos de proteção'
            ]
          },
          {
            titulo: 'Festas juninas',
            itens: [
              'Não pular fogueiras',
              'Não usar álcool para acender fogueiras',
              'Manter distância de balões (são ilegais)'
            ]
          }
        ]
      },
      {
        tipo: 'Substâncias Tóxicas',
        nivel: 'ALTO',
        icone: '🚬',
        cor: '#9400D3',
        descricao: 'Experimentação de álcool, drogas e outras substâncias pode levar a intoxicações graves.',
        prevencoes: [
          {
            titulo: 'Álcool e drogas',
            itens: [
              'Educação sobre riscos do álcool e drogas',
              'Diálogo aberto sobre pressão do grupo',
              'Ensinar a dizer NÃO',
              'Em caso de intoxicação: ligar 192 (SAMU) imediatamente'
            ]
          },
          {
            titulo: 'Medicamentos',
            itens: [
              'Não usar medicamentos sem prescrição',
              'Risco de overdose acidental',
              'Atenção a "desafios" da internet envolvendo medicamentos'
            ]
          }
        ]
      },
      {
        tipo: 'Armas de Fogo',
        nivel: 'ALTO',
        icone: '🔫',
        cor: '#8B0000',
        descricao: 'Curiosidade e acesso podem levar a acidentes fatais.',
        prevencoes: [
          {
            titulo: 'Segurança',
            itens: [
              'Armas guardadas DESCARREGADAS, TRAVADAS e TRANCADAS',
              'Munições em local separado e trancado',
              'Educação sobre perigos reais de armas',
              'NUNCA tocar em armas encontradas'
            ]
          }
        ]
      },
      {
        tipo: 'Saúde Mental',
        nivel: 'CRÍTICO',
        icone: '🧠',
        cor: '#8B008B',
        descricao: 'Pressão escolar, bullying, redes sociais e mudanças hormonais aumentam risco de depressão e suicídio.',
        prevencoes: [
          {
            titulo: 'Sinais de alerta',
            itens: [
              'Isolamento social',
              'Mudanças bruscas de humor',
              'Queda no desempenho escolar',
              'Falar sobre morte ou suicídio',
              'Perda de interesse em atividades'
            ]
          },
          {
            titulo: 'Ações',
            itens: [
              'Manter diálogo aberto e sem julgamentos',
              'Buscar ajuda profissional (psicólogo/psiquiatra)',
              'CVV (Centro de Valorização da Vida): 188',
              'Monitorar redes sociais com respeito à privacidade',
              'Criar ambiente familiar acolhedor'
            ]
          }
        ]
      }
    ]
  },

  'adulto': {
    id: 'adulto',
    nome: 'Adulto',
    faixaEtaria: '18 a 59 anos',
    icone: '👨',
    cor: '#4682B4',
    
    caracteristicas: 'Adultos enfrentam riscos relacionados ao trabalho, trânsito, atividades domésticas e lazer. Excesso de confiança, multitarefas e estresse podem levar a acidentes. Fase de maior produtividade mas também de maior exposição a riscos ocupacionais.',
    
    principalCausaMorte: 'Trânsito (acidentes automobilísticos e motos)',
    principalCausaInternacao: 'Quedas',
    
    riscos: [
      {
        tipo: 'Acidentes de Trabalho',
        nivel: 'ALTO',
        icone: '🏗️',
        cor: '#FF8C00',
        descricao: 'Milhares de acidentes de trabalho ocorrem anualmente no Brasil, muitos resultando em incapacidade permanente.',
        prevencoes: [
          {
            titulo: 'Equipamentos de Proteção',
            itens: [
              'Usar TODOS os EPIs fornecidos pela empresa',
              'Capacete, luvas, óculos, botas conforme atividade',
              'Nunca improvisar ou remover proteções',
              'Reportar EPIs danificados imediatamente'
            ]
          },
          {
            titulo: 'Normas de Segurança',
            itens: [
              'Seguir todas as Normas Regulamentadoras (NRs)',
              'Participar de treinamentos de segurança',
              'Não realizar tarefas sem treinamento adequado',
              'Reportar condições inseguras ao supervisor'
            ]
          },
          {
            titulo: 'Ergonomia',
            itens: [
              'Ajustar altura de cadeira e monitor',
              'Fazer pausas a cada 50 minutos',
              'Alongar durante o expediente',
              'Levantar pesos com técnica correta (dobrar joelhos)'
            ]
          }
        ]
      },
      {
        tipo: 'Trânsito',
        nivel: 'CRÍTICO',
        icone: '🚗',
        cor: '#FFD700',
        descricao: 'Principal causa de morte violenta. Combinação de velocidade, distração e falhas humanas.',
        estatistica: 'Brasil tem uma das maiores taxas de morte no trânsito',
        prevencoes: [
          {
            titulo: 'Direção defensiva',
            itens: [
              'SEMPRE usar cinto de segurança',
              'Respeitar limites de velocidade',
              'Manter distância segura do veículo da frente',
              'NUNCA dirigir sob efeito de álcool ou drogas',
              'Evitar fadiga - parar a cada 2 horas',
              'NÃO usar celular ao dirigir'
            ]
          },
          {
            titulo: 'Motocicletas',
            itens: [
              'Usar capacete certificado (selo Inmetro)',
              'Usar jaqueta com proteções',
              'Calçado fechado (nunca chinelo)',
              'Dirigir defensivamente - motos são menos visíveis',
              'Fazer revisões periódicas (freios, pneus)',
              'Evitar andar entre carros (corredor)'
            ]
          },
          {
            titulo: 'Manutenção',
            itens: [
              'Verificar pneus regularmente (calibragem e desgaste)',
              'Revisar freios periodicamente',
              'Trocar óleo conforme manual',
              'Verificar lâmpadas e sinalização'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'ALTO',
        icone: '🪜',
        cor: '#FF6B00',
        descricao: 'Principal causa de internação. Quedas de escadas, telhados e durante trabalhos domésticos.',
        prevencoes: [
          {
            titulo: 'Escadas e reparos',
            itens: [
              'Usar escada APROPRIADA para a altura necessária',
              'Nunca improvisar com cadeiras ou caixotes',
              'Ter 3 pontos de apoio sempre',
              'Nunca carregar peso ao subir escada',
              'Posicionar escada em ângulo correto (75°)'
            ]
          },
          {
            titulo: 'Ambiente doméstico',
            itens: [
              'Iluminar bem corredores e escadas',
              'Remover tapetes soltos',
              'Limpar líquidos derramados imediatamente',
              'Usar sapatos antiderrapantes em casa'
            ]
          }
        ]
      },
      {
        tipo: 'Choques Elétricos',
        nivel: 'ALTO',
        icone: '⚡',
        cor: '#FFFF00',
        descricao: 'Reparos elétricos improvisados podem causar choques fatais.',
        prevencoes: [
          {
            titulo: 'Instalações elétricas',
            itens: [
              'SEMPRE desligar disjuntor antes de mexer em fiação',
              'Contratar eletricista profissional para reparos',
              'Nunca fazer gambiarras elétricas',
              'Não sobrecarregar tomadas com benjamins',
              'Trocar fios desencapados imediatamente'
            ]
          },
          {
            titulo: 'Segurança',
            itens: [
              'Nunca mexer em eletricidade com mãos molhadas',
              'Usar ferramentas isoladas',
              'Instalar DR (dispositivo diferencial residual)',
              'Aterrar instalações corretamente'
            ]
          }
        ]
      },
      {
        tipo: 'Queimaduras',
        nivel: 'MÉDIO',
        icone: '🔥',
        cor: '#FF4500',
        descricao: 'Queimaduras domésticas e ocupacionais são comuns em adultos.',
        prevencoes: [
          {
            titulo: 'Cozinha',
            itens: [
              'Cabos de panelas virados para dentro',
              'Usar luvas térmicas ao manusear panelas quentes',
              'Cuidado com óleo quente (respingos)',
              'Nunca jogar água em óleo pegando fogo'
            ]
          },
          {
            titulo: 'Churrasqueiras',
            itens: [
              'NUNCA usar álcool para acender churrasqueira',
              'Usar acendedores apropriados',
              'Manter distância segura',
              'Ter extintor próximo'
            ]
          }
        ]
      },
      {
        tipo: 'Lesões Esportivas',
        nivel: 'MÉDIO',
        icone: '⚽',
        cor: '#32CD32',
        descricao: 'Prática esportiva sem preparo adequado pode causar lesões graves.',
        prevencoes: [
          {
            titulo: 'Prevenção',
            itens: [
              'Fazer aquecimento antes de exercícios',
              'Alongar após atividades',
              'Respeitar limites do corpo',
              'Usar equipamentos de proteção adequados',
              'Aumentar intensidade gradualmente',
              'Consultar médico antes de iniciar nova atividade'
            ]
          }
        ]
      },
      {
        tipo: 'Intoxicações',
        nivel: 'MÉDIO',
        icone: '☠️',
        cor: '#9400D3',
        descricao: 'Intoxicações por produtos químicos, medicamentos e alimentos contaminados.',
        prevencoes: [
          {
            titulo: 'Produtos químicos',
            itens: [
              'Ler rótulos e instruções antes de usar',
              'Usar luvas ao manusear produtos de limpeza',
              'NUNCA misturar água sanitária com outros produtos',
              'Garantir ventilação ao usar produtos químicos',
              'Armazenar em locais seguros'
            ]
          },
          {
            titulo: 'Medicamentos',
            itens: [
              'Nunca se automedicar',
              'Seguir prescrição médica rigorosamente',
              'Verificar prazo de validade',
              'Não misturar álcool com medicamentos',
              'Reportar reações adversas ao médico'
            ]
          }
        ]
      }
    ]
  },

  'idoso': {
    id: 'idoso',
    nome: 'Idoso',
    faixaEtaria: '60 anos ou mais',
    icone: '👴',
    cor: '#DAA520',
    
    caracteristicas: 'Com o envelhecimento, há redução de força muscular, equilíbrio, visão e audição. Reflexos mais lentos, osteoporose e uso de múltiplos medicamentos aumentam riscos. Quedas são especialmente perigosas devido à fragilidade óssea.',
    
    principalCausaMorte: 'Quedas (fraturas de fêmur podem ser fatais)',
    principalCausaInternacao: 'Quedas',
    
    riscos: [
      {
        tipo: 'Quedas',
        nivel: 'CRÍTICO',
        icone: '🦴',
        cor: '#FF0000',
        descricao: 'Principal causa de morte e internação em idosos. Queda pode levar a fratura de fêmur, com até 30% de mortalidade no primeiro ano.',
        estatistica: '30% dos idosos caem pelo menos 1x ao ano',
        prevencoes: [
          {
            titulo: 'Adaptações residenciais ESSENCIAIS',
            itens: [
              'Instalar barras de apoio no banheiro (box e vaso)',
              'Colocar piso antiderrapante no box',
              'Remover TODOS os tapetes soltos da casa',
              'Iluminação forte em TODOS os cômodos',
              'Instalar corrimãos em AMBOS os lados das escadas',
              'Interruptor de luz ao alcance da cama',
              'Deixar trajeto até banheiro livre de obstáculos',
              'Cama com altura adequada (pés tocando chão ao sentar)'
            ]
          },
          {
            titulo: 'Calçados',
            itens: [
              'Usar sapatos fechados, antiderrapantes e com solado firme',
              'NUNCA andar de chinelos dentro de casa',
              'Evitar meias sem sapatos (risco de escorregar)',
              'Amarrar cadarços sempre'
            ]
          },
          {
            titulo: 'Atividades',
            itens: [
              'Levantar-se devagar (risco de tontura)',
              'Sentar por alguns segundos ao sair da cama',
              'Usar bengala ou andador se recomendado',
              'Acender luz antes de se movimentar à noite',
              'Evitar subir em escadas ou bancos'
            ]
          },
          {
            titulo: 'Saúde',
            itens: [
              'Fazer avaliação de equilíbrio regularmente',
              'Praticar exercícios de fortalecimento muscular',
              'Verificar visão anualmente',
              'Revisar medicações com médico (alguns causam tontura)',
              'Tratar osteoporose adequadamente'
            ]
          }
        ]
      },
      {
        tipo: 'Medicamentos',
        nivel: 'ALTO',
        icone: '💊',
        cor: '#9400D3',
        descricao: 'Polifarmácia (uso de múltiplos medicamentos) aumenta risco de interações, efeitos colaterais e intoxicações.',
        prevencoes: [
          {
            titulo: 'Organização',
            itens: [
              'Usar caixas organizadoras de medicamentos por dia/horário',
              'Criar lista atualizada de todos os medicamentos',
              'Levar lista a TODAS as consultas médicas',
              'Configurar alarmes para horários de medicação',
              'Manter receitas atualizadas e legíveis'
            ]
          },
          {
            titulo: 'Segurança',
            itens: [
              'NUNCA misturar remédios de embalagens diferentes',
              'Verificar prazo de validade regularmente',
              'Ler bula e seguir instruções rigorosamente',
              'Não compartilhar medicamentos',
              'Reportar efeitos colaterais ao médico imediatamente',
              'Evitar álcool se tomar medicamentos'
            ]
          },
          {
            titulo: 'Revisão médica',
            itens: [
              'Revisar TODOS medicamentos a cada 6 meses',
              'Questionar necessidade de cada medicamento',
              'Verificar interações medicamentosas',
              'Ajustar doses conforme função renal/hepática'
            ]
          }
        ]
      },
      {
        tipo: 'Trânsito',
        nivel: 'ALTO',
        icone: '🚗',
        cor: '#FFD700',
        descricao: 'Redução de reflexos, visão e audição aumentam riscos. Idosos são mais vulneráveis como pedestres.',
        prevencoes: [
          {
            titulo: 'Como pedestre',
            itens: [
              'Atravessar APENAS em faixas de pedestres',
              'SEMPRE usar semáforo quando disponível',
              'Dar tempo EXTRA para atravessar',
              'Fazer contato visual com motoristas',
              'Usar roupas claras à noite',
              'Evitar carregar volumes que atrapalhem visão',
              'Caminhar em calçadas (nunca na rua)'
            ]
          },
          {
            titulo: 'Como motorista',
            itens: [
              'Fazer exames médicos periódicos',
              'Renovar habilitação conforme prazos',
              'Evitar dirigir à noite se tiver dificuldade visual',
              'Fazer revisões veiculares regulares',
              'Reconhecer limitações e pedir ajuda quando necessário',
              'Considerar transporte alternativo se inseguro'
            ]
          }
        ]
      },
      {
        tipo: 'Queimaduras',
        nivel: 'MÉDIO',
        icone: '🔥',
        cor: '#FF4500',
        descricao: 'Pele mais fina e sensibilidade reduzida aumentam gravidade de queimaduras.',
        prevencoes: [
          {
            titulo: 'Cozinha',
            itens: [
              'Usar mangas compridas ao cozinhar',
              'Testar temperatura de alimentos antes de consumir',
              'Cuidado especial com micro-ondas (aquecimento irregular)',
              'Usar luvas térmicas',
              'Manter extintores acessíveis e revisados'
            ]
          },
          {
            titulo: 'Banho',
            itens: [
              'Testar temperatura da água antes de entrar',
              'Ajustar aquecedor para temperatura máxima segura (38°C)',
              'Nunca deixar água esquentando sozinha'
            ]
          }
        ]
      },
      {
        tipo: 'Isolamento e Negligência',
        nivel: 'ALTO',
        icone: '🏚️',
        cor: '#8B4513',
        descricao: 'Idosos isolados estão em maior risco de acidentes sem socorro imediato.',
        prevencoes: [
          {
            titulo: 'Comunicação',
            itens: [
              'Manter contato diário com familiares',
              'Ter telefone acessível e com números de emergência',
              'Ensinar a usar telefone celular',
              'Vizinhos informados sobre condição de saúde',
              'Considerar dispositivos de alerta médico'
            ]
          },
          {
            titulo: 'Suporte social',
            itens: [
              'Participar de atividades sociais',
              'Grupos de convivência para idosos',
              'Atenção a sinais de depressão',
              'Visitas regulares de familiares'
            ]
          }
        ]
      },
      {
        tipo: 'Desidratação e Má Nutrição',
        nivel: 'MÉDIO',
        icone: '💧',
        cor: '#00CED1',
        descricao: 'Sensação de sede reduzida pode levar à desidratação. Má nutrição aumenta fragilidade.',
        prevencoes: [
          {
            titulo: 'Hidratação',
            itens: [
              'Beber água regularmente MESMO SEM SEDE',
              'Meta: 6-8 copos de água por dia',
              'Deixar garrafa de água visível',
              'Configurar alarmes para lembrar de beber água',
              'Observar cor da urina (deve ser clara)'
            ]
          },
          {
            titulo: 'Nutrição',
            itens: [
              'Fazer pelo menos 3 refeições por dia',
              'Incluir proteínas em cada refeição',
              'Suplementar vitamina D e cálcio se necessário',
              'Consultar nutricionista geriátrico',
              'Facilitar preparo de refeições (marmitas, ajuda)'
            ]
          }
        ]
      },
      {
        tipo: 'Hipotermia e Hipertermia',
        nivel: 'MÉDIO',
        icone: '🌡️',
        cor: '#87CEEB',
        descricao: 'Termorregulação prejudicada aumenta risco de hipo e hipertermia.',
        prevencoes: [
          {
            titulo: 'Frio',
            itens: [
              'Manter casa aquecida (mínimo 20°C)',
              'Usar várias camadas de roupa',
              'Cobertores adequados',
              'Evitar sair em dias muito frios',
              'Atenção a hipotermia: confusão, letargia'
            ]
          },
          {
            titulo: 'Calor',
            itens: [
              'Manter casa ventilada',
              'Beber mais água em dias quentes',
              'Evitar sair em horários de pico de calor (10h-16h)',
              'Usar roupas leves e claras',
              'Sinais de hipertermia: confusão, pele quente e seca'
            ]
          }
        ]
      }
    ]
  },

  'pcd': {
    id: 'pcd',
    nome: 'Pessoa com Deficiência',
    faixaEtaria: 'Todas as idades',
    icone: '♿',
    cor: '#20B2AA',
    
    caracteristicas: 'Pessoas com deficiência enfrentam riscos específicos relacionados ao tipo de deficiência. Adaptações ambientais e tecnologias assistivas são fundamentais para segurança e autonomia.',
    
    principalCausaMorte: 'Varia conforme tipo de deficiência',
    principalCausaInternacao: 'Quedas e complicações relacionadas à mobilidade',
    
    riscos: [
      {
        tipo: 'Acessibilidade e Mobilidade',
        nivel: 'CRÍTICO',
        icone: '🦽',
        cor: '#4169E1',
        descricao: 'Ambientes inadequados aumentam riscos de quedas e acidentes.',
        prevencoes: [
          {
            titulo: 'Adaptações residenciais',
            itens: [
              'Rampas de acesso com inclinação adequada (máx 8,33%)',
              'Portas com largura mínima de 80 cm',
              'Corredores largos (mínimo 90 cm)',
              'Banheiro adaptado com barras e box acessível',
              'Eliminar desníveis e degraus',
              'Interruptores e tomadas em altura acessível (60-100cm)'
            ]
          },
          {
            titulo: 'Cadeira de rodas',
            itens: [
              'Manter cadeira em bom estado (freios, pneus)',
              'Usar cinto de segurança em descidas',
              'Nunca sobrecarregar com peso excessivo',
              'Ter cadeira de backup ou plano alternativo',
              'Aprender técnicas seguras de transferência'
            ]
          },
          {
            titulo: 'Bengalas e andadores',
            itens: [
              'Ponteiras de borracha em bom estado',
              'Altura ajustada corretamente',
              'Usar em ambas as mãos se necessário (muletas)',
              'Substituir quando desgastado'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'ALTO',
        icone: '⚠️',
        cor: '#FF6B00',
        descricao: 'Risco aumentado devido a limitações de mobilidade e equilíbrio.',
        prevencoes: [
          {
            titulo: 'Prevenção geral',
            itens: [
              'Pisos antiderrapantes em toda a casa',
              'Iluminação adequada em todos os cômodos',
              'Barras de apoio em locais estratégicos',
              'Remover tapetes soltos',
              'Manter trajetos livres de obstáculos',
              'Usar calçados adequados'
            ]
          },
          {
            titulo: 'Transferências',
            itens: [
              'Aprender técnicas corretas de transferência',
              'Usar dispositivos apropriados (tábua de transferência)',
              'Pedir ajuda quando necessário',
              'Nunca fazer transferências apressadas'
            ]
          }
        ]
      },
      {
        tipo: 'Queimaduras',
        nivel: 'ALTO',
        icone: '🔥',
        cor: '#FF4500',
        descricao: 'Sensibilidade reduzida ou mobilidade limitada podem dificultar reação rápida.',
        prevencoes: [
          {
            titulo: 'Cozinha adaptada',
            itens: [
              'Fogão em altura acessível',
              'Prateleiras baixas para evitar alcançar objetos quentes',
              'Usar dispositivos de segurança (desligamento automático)',
              'Luvas térmicas sempre acessíveis',
              'Extintor em local acessível'
            ]
          },
          {
            titulo: 'Banho',
            itens: [
              'Termostato para controlar temperatura máxima',
              'Teste de temperatura antes de entrar',
              'Barras de apoio para saída rápida se necessário'
            ]
          }
        ]
      },
      {
        tipo: 'Emergências',
        nivel: 'CRÍTICO',
        icone: '🚨',
        cor: '#DC143C',
        descricao: 'Evacuação e acesso a ajuda podem ser desafiadores em emergências.',
        prevencoes: [
          {
            titulo: 'Plano de emergência',
            itens: [
              'Ter plano de evacuação adaptado',
              'Identificar rotas acessíveis de saída',
              'Vizinhos e familiares informados sobre necessidades',
              'Telefone com números de emergência programados',
              'Considerar dispositivos de alerta médico',
              'Manter documentos médicos acessíveis'
            ]
          },
          {
            titulo: 'Comunicação',
            itens: [
              'Para deficiência auditiva: ter forma visual de alerta (luzes)',
              'Para deficiência visual: ter alarmes sonoros',
              'Para deficiência de fala: ter dispositivos de comunicação alternativa',
              'Cadastro no Corpo de Bombeiros se houver dificuldade de evacuação'
            ]
          }
        ]
      },
      {
        tipo: 'Medicamentos e Saúde',
        nivel: 'ALTO',
        icone: '💊',
        cor: '#9400D3',
        descricao: 'Algumas deficiências requerem medicação contínua e cuidados específicos.',
        prevencoes: [
          {
            titulo: 'Organização',
            itens: [
              'Caixas organizadoras adaptadas (para deficiência visual: em Braille)',
              'Alarmes para horários de medicação',
              'Lista atualizada de medicamentos sempre visível',
              'Familiares informados sobre medicações',
              'Ter medicamentos de reserva'
            ]
          },
          {
            titulo: 'Acompanhamento médico',
            itens: [
              'Consultas regulares com especialistas',
              'Fisioterapia conforme necessário',
              'Terapia ocupacional para adaptações',
              'Acompanhamento nutricional'
            ]
          }
        ]
      },
      {
        tipo: 'Tecnologias Assistivas',
        nivel: 'MÉDIO',
        icone: '🤖',
        cor: '#00CED1',
        descricao: 'Uso adequado de tecnologias assistivas aumenta autonomia e segurança.',
        prevencoes: [
          {
            titulo: 'Dispositivos',
            itens: [
              'Manter dispositivos carregados (cadeiras elétricas, etc)',
              'Fazer manutenção preventiva regular',
              'Ter plano B quando dispositivo falhar',
              'Conhecer bem o funcionamento de cada dispositivo',
              'Treinar familiares no uso dos dispositivos'
            ]
          },
          {
            titulo: 'Automação residencial',
            itens: [
              'Controle de luzes por voz ou app',
              'Fechaduras inteligentes',
              'Termostatos programáveis',
              'Câmeras de segurança',
              'Assistentes virtuais para emergências'
            ]
          }
        ]
      },
      {
        tipo: 'Deficiência Visual',
        nivel: 'ALTO',
        icone: '👁️',
        cor: '#FFD700',
        descricao: 'Riscos específicos relacionados à navegação e identificação de perigos.',
        prevencoes: [
          {
            titulo: 'Ambiente adaptado',
            itens: [
              'Manter layout consistente (não mover móveis)',
              'Marcar degraus e desníveis com texturas',
              'Iluminação forte e contrastes visuais',
              'Bengala sempre em bom estado',
              'Treinar rotas dentro de casa',
              'Eliminar obstáculos ao nível do chão'
            ]
          },
          {
            titulo: 'Tecnologias',
            itens: [
              'Apps de leitura de texto (OCR)',
              'Assistentes de voz',
              'Etiquetas em Braille para medicamentos e alimentos',
              'Detectores sonoros de objetos',
              'Leitores de código de barras falantes'
            ]
          }
        ]
      },
      {
        tipo: 'Deficiência Auditiva',
        nivel: 'MÉDIO',
        icone: '👂',
        cor: '#FF69B4',
        descricao: 'Dificuldade em perceber alertas sonoros e comunicação em emergências.',
        prevencoes: [
          {
            titulo: 'Alertas visuais',
            itens: [
              'Alarme de incêndio com luzes piscantes',
              'Campainha com luz',
              'Despertador vibratório',
              'Apps que convertem som em notificação visual',
              'Legendas em todos os conteúdos de vídeo'
            ]
          },
          {
            titulo: 'Comunicação',
            itens: [
              'Ensinar Libras a familiares',
              'Ter bloco de notas para comunicação escrita',
              'Apps de tradução de voz para texto',
              'Informar vizinhos sobre a deficiência auditiva'
            ]
          }
        ]
      },
      {
        tipo: 'Deficiência Intelectual',
        nivel: 'ALTO',
        icone: '🧠',
        cor: '#9370DB',
        descricao: 'Necessidade de supervisão e instruções claras para segurança.',
        prevencoes: [
          {
            titulo: 'Supervisão',
            itens: [
              'Supervisão adequada conforme nível de autonomia',
              'Rotinas consistentes e previsíveis',
              'Instruções claras e simples',
              'Sinalizações visuais simples',
              'Treinar situações de emergência repetidamente'
            ]
          },
          {
            titulo: 'Segurança',
            itens: [
              'Travas de segurança em portas e janelas',
              'Produtos perigosos trancados',
              'Identificação com nome, endereço e contato',
              'Ensinar números de emergência de forma lúdica',
              'Rede de apoio bem estabelecida'
            ]
          }
        ]
      }
    ]
  },

  'gestante': {
    id: 'gestante',
    nome: 'Gestante',
    faixaEtaria: 'Durante a gravidez',
    icone: '🤰',
    cor: '#FF69B4',

    caracteristicas: 'A gestação altera o centro de gravidade, a mobilidade e a sensibilidade a substâncias químicas. Riscos domésticos que seriam inofensivos para outros adultos podem ter consequências graves para a mãe e o bebê.',

    principalCausaMorte: 'Complicações obstétricas (não acidentais)',
    principalCausaInternacao: 'Quedas e exposição química',

    riscos: [
      {
        tipo: 'Exposição Química',
        nivel: 'CRÍTICO',
        icone: '☠️',
        cor: '#9400D3',
        descricao: 'Solventes, tintas, pesticidas e inseticidas podem atravessar a barreira placentária e causar danos ao desenvolvimento fetal, especialmente no 1º trimestre. Janelas abertas não são suficientes — prefira não usar esses produtos durante toda a gestação.',
        prevencoes: [
          {
            titulo: 'Produtos a evitar',
            itens: [
              'Tintas, solventes e vernizes (mesmo com ventilação — prefira não usar)',
              'Pesticidas e inseticidas de qualquer tipo',
              'Produtos de limpeza com amônia ou cloro em espaços fechados',
              'Removedores de ferrugem e descalcificantes fortes',
              'Se inevitável: usar máscara respiratória PFF2, luvas e ventilação máxima'
            ]
          },
          {
            titulo: 'Substituições seguras',
            itens: [
              'Usar sabão neutro e bicarbonato para limpeza geral',
              'Vinagre diluído para desinfecção de superfícies',
              'Delegar tarefas com químicos fortes a outra pessoa'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'ALTO',
        icone: '🪜',
        cor: '#FF6B00',
        descricao: 'A partir do 2º trimestre, o deslocamento do centro de gravidade aumenta o risco de perda de equilíbrio. Quedas podem causar descolamento de placenta e trauma abdominal grave.',
        prevencoes: [
          {
            titulo: 'Prevenção',
            itens: [
              'Usar calçados com solado antiderrapante e sem salto',
              'Evitar subir em escadas, bancos ou superfícies elevadas',
              'Instalar tapetes antiderrapantes no banheiro (fora e dentro do box)',
              'Não carregar objetos pesados — solicite ajuda',
              'Apoiar-se no corrimão ao subir/descer escadas',
              'Iluminar bem corredores e banheiro (especialmente à noite)'
            ]
          },
          {
            titulo: 'Sinais de alerta após queda',
            itens: [
              'Dor abdominal ou contraturas',
              'Sangramento vaginal',
              'Redução dos movimentos do bebê',
              'Qualquer um desses: ir ao PS imediatamente'
            ]
          }
        ]
      },
      {
        tipo: 'Calor Excessivo',
        nivel: 'MÉDIO',
        icone: '🌡️',
        cor: '#FF8C00',
        descricao: 'Banhos muito quentes e exposição prolongada ao calor podem elevar a temperatura central e causar hipertermia fetal, especialmente no 1º trimestre.',
        prevencoes: [
          {
            titulo: 'Cuidados com temperatura',
            itens: [
              'Temperatura do banho: máximo 38°C no 1º trimestre',
              'Evitar saunas, banheiras de hidromassagem quentes e banhos de ofurô',
              'Em dias quentes: manter-se hidratada e em ambientes frescos',
              'Não fazer exercícios intensos em ambientes quentes',
              'Usar ventilador ou ar-condicionado sem apontar diretamente para o corpo'
            ]
          },
          {
            titulo: 'Sinais de alerta',
            itens: [
              'Tontura, náusea fora do padrão ou sensação de desmaio: deitar de lado esquerdo e hidratar',
              'Sangramento, dor abdominal ou redução de movimentos: PS imediatamente',
              'Contato com médico obstetra a cada sinal de dúvida — não espere consulta agendada'
            ]
          }
        ]
      }
    ]
  },

  'pet': {

    id: 'pet',
    nome: 'Pet',
    faixaEtaria: 'Animais domésticos',
    icone: '🐕',
    cor: '#F4A460',
    
    caracteristicas: 'Pets enfrentam riscos domésticos específicos. Curiosidade natural, comportamento exploratório e impossibilidade de comunicar desconforto aumentam vulnerabilidade.',
    
    principalCausaMorte: 'Intoxicação e atropelamento',
    principalCausaInternacao: 'Ingestão de corpo estranho e intoxicações',
    
    riscos: [
      {
        tipo: 'Intoxicação',
        nivel: 'CRÍTICO',
        icone: '☠️',
        cor: '#9400D3',
        descricao: 'Ingestão de alimentos, plantas ou produtos tóxicos. Animais têm metabolismo diferente dos humanos.',
        prevencoes: [
          {
            titulo: 'Alimentos proibidos',
            itens: [
              'NUNCA dar chocolate (tóxico para cães e gatos)',
              'Evitar: uva, passa, cebola, alho, abacate, xilitol',
              'Café, chá e bebidas com cafeína são tóxicos',
              'Álcool é extremamente perigoso',
              'Ossos cozidos podem quebrar e perfurar'
            ]
          },
          {
            titulo: 'Plantas tóxicas',
            itens: [
              'Comigo-ninguém-pode',
              'Lírio (extremamente tóxico para gatos)',
              'Azaleia',
              'Espada-de-São-Jorge',
              'Hera',
              'Manter plantas tóxicas fora de alcance ou removê-las'
            ]
          },
          {
            titulo: 'Produtos químicos',
            itens: [
              'Produtos de limpeza em armários fechados',
              'Pesticidas e raticidas fora de alcance',
              'Anticongelante (doce mas extremamente tóxico)',
              'Medicamentos humanos trancados',
              'Nunca dar medicamentos humanos sem orientação veterinária'
            ]
          },
          {
            titulo: 'Em caso de intoxicação',
            itens: [
              'Levar IMEDIATAMENTE ao veterinário',
              'Levar embalagem do produto ingerido',
              'NÃO induzir vômito sem orientação veterinária',
              'Ter sempre o número de emergência veterinária'
            ]
          }
        ]
      },
      {
        tipo: 'Ingestão de Corpo Estranho',
        nivel: 'ALTO',
        icone: '🧸',
        cor: '#FF6B00',
        descricao: 'Ingestão de objetos pode causar obstrução intestinal, requerendo cirurgia.',
        prevencoes: [
          {
            titulo: 'Prevenção',
            itens: [
              'Não deixar brinquedos pequenos ao alcance',
              'Guardar roupas, meias e sapatos',
              'Cuidado com botões, elásticos de cabelo, fios',
              'Lixeira com tampa segura',
              'Supervisão durante brincadeiras',
              'Brinquedos apropriados ao tamanho do animal'
            ]
          },
          {
            titulo: 'Sinais de obstrução',
            itens: [
              'Vômitos persistentes',
              'Falta de apetite',
              'Letargia',
              'Dor abdominal',
              'Levar ao veterinário IMEDIATAMENTE'
            ]
          }
        ]
      },
      {
        tipo: 'Quedas',
        nivel: 'MÉDIO',
        icone: '🪟',
        cor: '#FF6B00',
        descricao: 'Gatos especialmente estão em risco de quedas de janelas e sacadas.',
        prevencoes: [
          {
            titulo: 'Proteção',
            itens: [
              'Instalar telas de proteção em TODAS as janelas',
              'Telas específicas para gatos (mais resistentes)',
              'Proteger sacadas',
              'Não deixar janelas abertas sem tela',
              'Cuidado com janelas basculantes (gatos podem ficar presos)'
            ]
          }
        ]
      },
      {
        tipo: 'Trânsito',
        nivel: 'CRÍTICO',
        icone: '🚗',
        cor: '#FFD700',
        descricao: 'Atropelamentos são causa comum de morte em pets.',
        prevencoes: [
          {
            titulo: 'Contenção',
            itens: [
              'Nunca deixar pet solto na rua',
              'Usar coleira e guia SEMPRE em passeios',
              'Portões seguros e cercas sem buracos',
              'Identificação com plaquinha (nome e telefone)',
              'Microchip de identificação'
            ]
          },
          {
            titulo: 'No veículo',
            itens: [
              'Usar caixa de transporte ou cinto de segurança para pets',
              'Nunca deixar pet solto no carro',
              'Não deixar pet com cabeça para fora do carro em movimento',
              'Não deixar pet sozinho dentro do carro (risco de hipertermia)'
            ]
          }
        ]
      },
      {
        tipo: 'Hipertermia (Golpe de Calor)',
        nivel: 'CRÍTICO',
        icone: '🌡️',
        cor: '#FF0000',
        descricao: 'Cães não suam e podem sofrer hipertermia rapidamente. Pode ser fatal.',
        prevencoes: [
          {
            titulo: 'Prevenção',
            itens: [
              'NUNCA deixar pet em carro fechado (mesmo com janela aberta)',
              'Água fresca SEMPRE disponível',
              'Sombra disponível',
              'Passeios nos horários mais frescos (manhã/noite)',
              'Cuidado especial com raças braquicefálicas (Pug, Bulldog)',
              'Evitar exercícios em dias muito quentes'
            ]
          },
          {
            titulo: 'Sinais de hipertermia',
            itens: [
              'Respiração ofegante excessiva',
              'Língua muito vermelha ou roxa',
              'Fraqueza, desorientação',
              'Vômito, diarreia',
              'EMERGÊNCIA VETERINÁRIA - pode ser fatal em minutos'
            ]
          }
        ]
      },
      {
        tipo: 'Afogamento',
        nivel: 'MÉDIO',
        icone: '💧',
        cor: '#0000FF',
        descricao: 'Nem todos os pets sabem nadar. Piscinas podem ser perigosas.',
        prevencoes: [
          {
            titulo: 'Segurança',
            itens: [
              'Cercar piscina ou bloquear acesso',
              'Ensinar onde ficam os degraus de saída',
              'Supervisão constante próximo à água',
              'Considerar rampas de escape para piscinas',
              'Não forçar pet a entrar na água',
              'Coletes salva-vidas para passeios de barco'
            ]
          }
        ]
      },
      {
        tipo: 'Choques Elétricos',
        nivel: 'ALTO',
        icone: '⚡',
        cor: '#FFFF00',
        descricao: 'Filhotes especialmente podem morder fios elétricos.',
        prevencoes: [
          {
            titulo: 'Proteção',
            itens: [
              'Esconder ou proteger fios elétricos',
              'Usar protetores de cabos',
              'Desligar aparelhos não usados da tomada',
              'Borrifar fios com spray amargo (pet-safe)',
              'Supervisão de filhotes',
              'Oferecer brinquedos apropriados para morder'
            ]
          }
        ]
      },
      {
        tipo: 'Fuga e Perda',
        nivel: 'ALTO',
        icone: '🏃',
        cor: '#FF1493',
        descricao: 'Pets podem se perder, sofrer acidentes ou não encontrar caminho de volta.',
        prevencoes: [
          {
            titulo: 'Identificação',
            itens: [
              'Coleira com plaquinha (nome e 2 telefones)',
              'Microchip de identificação',
              'Foto recente do pet',
              'Registrar em bases de dados de pets',
              'Atualizar contatos se mudar de número/endereço'
            ]
          },
          {
            titulo: 'Contenção',
            itens: [
              'Portões sempre fechados',
              'Cercas sem buracos',
              'Cuidado ao abrir portas (pet pode escapar)',
              'Treinamento de obediência básica',
              'Não deixar pet sozinho em áreas abertas'
            ]
          }
        ]
      },
      {
        tipo: 'Brigas e Ataques',
        nivel: 'MÉDIO',
        icone: '🐾',
        cor: '#8B4513',
        descricao: 'Interações com outros animais podem resultar em ferimentos.',
        prevencoes: [
          {
            titulo: 'Socialização',
            itens: [
              'Socializar pet desde filhote',
              'Supervisão em interações com outros pets',
              'Usar guia e coleira em áreas públicas',
              'Conhecer temperamento do seu pet',
              'Evitar interações forçadas',
              'Castração reduz agressividade'
            ]
          },
          {
            titulo: 'Em caso de briga',
            itens: [
              'Não colocar mão para separar',
              'Usar água ou barulho alto',
              'Buscar veterinário imediatamente após briga',
              'Mordidas podem infeccionar rapidamente'
            ]
          }
        ]
      },
      {
        tipo: 'Riscos Específicos: Aves',
        nivel: 'CRÍTICO',
        icone: '🦜',
        cor: '#B71C1C',
        descricao: 'Aves possuem sistema respiratório extremamente sensível e fumaças domésticas podem ser letais.',
        prevencoes: [
          {
            titulo: 'Intoxicação por Teflon (PTFE)',
            itens: [
              'O superaquecimento de panelas antiaderentes libera gases letais para aves',
              'JAMAIS mantenha aves na cozinha ou áreas próximas durante o cozimento',
              'Sintoma: Falta de ar súbita e morte em minutos'
            ]
          },
          {
            titulo: 'Traumas em Voo Livre',
            itens: [
              'Sempre desligar ventiladores de teto antes de soltar a ave',
              'Sinalizar vidros e espelhos com adesivos ou cortinas',
              'Manter portas e janelas com TELAS de malha fina'
            ]
          }
        ]
      },
      {
        tipo: 'Pequenos Mamíferos e Peixes',
        nivel: 'ALTO',
        icone: '🐹',
        cor: '#F57C00',
        descricao: 'Riscos relacionados a fiação elétrica e manutenção de aquários.',
        prevencoes: [
          {
            titulo: 'Roeduras Elétricas (Coelhos/Hamsters)',
            itens: [
              'Proteger TODOS os fios com conduítes resistentes',
              'Coelhos têm instinto de roer fiação, o que causa choques letais'
            ]
          },
          {
            titulo: 'Aquários e Elétrica',
            itens: [
              'Usar filtros de linha e protetores de surto',
              'Ter plano para quedas de energia (bombas a pilha)'
            ]
          }
        ]
      },
      {
        tipo: 'Mordidas e Ataques (Prevenir em Casa)',
        nivel: 'ALTO',
        icone: '🩹',
        cor: '#FF5252',
        descricao: 'Protocolo de mordidas para humanos (Prevenir em Casa).',
        prevencoes: [
          {
            titulo: 'Primeiro Socorro',
            itens: [
              'Lavar com água e sabão por 15 minutos IMEDIATAMENTE',
              'Buscar Pronto-Socorro para avaliar Tétano e Raiva',
              'Observar o animal agressor por 10 dias'
            ]
          }
        ]
      }
    ]
  }
};

// ============================================
// FAIXAS ETÁRIAS - LISTA PARA NAVEGAÇÃO
// ============================================

export const LISTA_IDADES = [
  {
    id: 'bebe',
    nome: 'Bebê',
    subtitulo: '0 a 2 anos',
    icone: '👶',
    cor: '#FFB6C1'
  },
  {
    id: 'crianca',
    nome: 'Criança',
    subtitulo: '3 a 10 anos',
    icone: '🧒',
    cor: '#87CEEB'
  },
  {
    id: 'adolescente',
    nome: 'Adolescente',
    subtitulo: '11 a 17 anos',
    icone: '👦',
    cor: '#9370DB'
  },
  {
    id: 'adulto',
    nome: 'Adulto',
    subtitulo: '18 a 59 anos',
    icone: '👨',
    cor: '#4682B4'
  },
  {
    id: 'idoso',
    nome: 'Idoso',
    subtitulo: '60+ anos',
    icone: '👴',
    cor: '#DAA520'
  },
  {
    id: 'pcd',
    nome: 'PCD',
    subtitulo: 'Pessoa com Deficiência',
    icone: '♿',
    cor: '#20B2AA'
  },
  {
    id: 'pet',
    nome: 'Pet',
    subtitulo: 'Animais domésticos',
    icone: '🐕',
    cor: '#F4A460'
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getRiscosPorIdade = (idadeId) => {
  return RISCOS_POR_IDADE[idadeId] || null;
};

export const getListaIdades = () => {
  return LISTA_IDADES;
};

export const getCorPorNivel = (nivel) => {
  const cores = {
    'CRÍTICO': '#FF0000',
    'ALTO': '#FF6B00',
    'MÉDIO': '#FFD700',
    'BAIXO': '#32CD32'
  };
  return cores[nivel] || '#999999';
};

export default {
  RISCOS_POR_IDADE,
  LISTA_IDADES,
  getRiscosPorIdade,
  getListaIdades,
  getCorPorNivel
};
