/**
 * asilo_seguro_data.js
 * Dados do checklist Asilo Seguro (Vistoria Sênior)
 * Vigilaro Care V6
 * 
 * Fonte: Estatuto do Idoso, ABNT, RDC Anvisa
 */

export const CHECKLIST_ASILO_SEGURA = {
  id: 'asilo-seguro',
  nome: 'Asilo Seguro',
  nome_en: 'Safe Nursing Home',
  nome_es: 'Asilo Seguro',
  icone: 'Wheelchair',
  cor: '#1565C0',
  descricao: 'Vistoria técnica para Instituições de Longa Permanência para Idosos (ILPI)',
  descricao_en: 'Technical inspection for Long-Term Care Institutions for the Elderly',
  descricao_es: 'Inspección técnica para Instituciones de Larga Permanencia para Ancianos',

  introducao: `Este checklist foi desenvolvido para auxiliar famílias na avaliação da segurança e infraestrutura de casas de repouso e asilos.

A segurança em instituições sênior vai além da acessibilidade física; envolve protocolos de medicação, detecção de quedas e ética no cuidado.`,
  introducao_en: `This checklist was developed to help families evaluate the safety and infrastructure of nursing homes and care facilities.

Safety in senior institutions goes beyond physical accessibility; it involves medication protocols, fall detection, and care ethics.`,
  introducao_es: `Esta lista de verificación fue desarrollada para ayudar a las familias en la evaluación de la seguridad e infraestructura de hogares de ancianos y asilos.

La seguridad en instituciones para ancianos va más allá de la accesibilidad física; involucra protocolos de medicación, detección de caídas y ética en el cuidado.`,

  categorias: [
    {
      id: 'acessibilidade',
      nome: 'Acessibilidade (Estatuto/ABNT)',
      nome_en: 'Accessibility (Standards)',
      nome_es: 'Accesibilidad (Normativa)',
      icone: 'Wheelchair',
      cor: '#1976D2',
      itens: [
        {
          id: 'asilo_degraus',
          texto: 'Ausência total de degraus isolados (uso de rampas adequadas com piso tátil)',
          texto_en: 'Complete absence of isolated steps (use of adequate ramps with tactile flooring)',
          texto_es: 'Ausencia total de escalones aislados (uso de rampas adecuadas con piso táctil)',
          critico: true,
          detalhes: 'Degraus únicos são a principal causa de tropeços e quedas graves em idosos.',
          detalhes_en: 'Single steps are the leading cause of trips and serious falls in the elderly.',
          detalhes_es: 'Los escalones aislados son la principal causa de tropezones y caídas graves en ancianos.'
        },
        {
          id: 'asilo_corredores',
          texto: 'Corredores largos e portas dimensionadas para cadeiras de rodas',
          texto_en: 'Wide corridors and doors sized for wheelchairs',
          texto_es: 'Pasillos anchos y puertas dimensionadas para sillas de ruedas',
          critico: true,
          detalhes: 'A largura mínima deve permitir a passagem livre de cadeiras de rodas e andadores.',
          detalhes_en: 'Minimum width must allow free passage of wheelchairs and walkers.',
          detalhes_es: 'El ancho mínimo debe permitir el paso libre de sillas de ruedas y andadores.'
        },
        {
          id: 'asilo_corrimao',
          texto: 'Corrimãos contínuos instalados em ambos os lados de rampas e corredores',
          texto_en: 'Continuous handrails installed on both sides of ramps and corridors',
          texto_es: 'Pasamanos continuos instalados en ambos lados de rampas y pasillos',
          critico: false,
          detalhes: 'O apoio firme dos dois lados dá mais estabilidade para andar.',
          detalhes_en: 'Firm support on both sides ensures greater stability when walking.',
          detalhes_es: 'El apoyo firme en ambos lados garantiza mayor estabilidad al caminar.'
        },
        {
          id: 'asilo_iluminacao',
          texto: 'Iluminação forte e contínua, principalmente à noite (luzes de balizamento)',
          texto_en: 'Strong and continuous lighting, especially at night (guide lights)',
          texto_es: 'Iluminación fuerte y continua, principalmente de noche (luces de guía)',
          critico: true,
          detalhes: 'Idosos possuem sensibilidade visual reduzida. Luzes de vigília ajudam a evitar a desorientação.',
          detalhes_en: 'Elderly have reduced visual sensitivity. Night lights help prevent disorientation.',
          detalhes_es: 'Los ancianos tienen sensibilidad visual reducida. Las luces nocturnas ayudan a evitar la desorientación.'
        },
        {
          id: 'asilo_pisos',
          texto: 'Pisos antiderrapantes (zero tapetes soltos em áreas de circulação)',
          texto_en: 'Non-slip floors (zero loose rugs in circulation areas)',
          texto_es: 'Pisos antideslizantes (cero alfombras sueltas en áreas de circulación)',
          critico: true,
          detalhes: 'Tapetes soltos são armadilhas letais em ambientes sênior.',
          detalhes_en: 'Loose rugs are lethal traps in senior environments.',
          detalhes_es: 'Las alfombras sueltas son trampas letales en ambientes para ancianos.'
        }
      ]
    },
    {
      id: 'banheiros',
      nome: 'Banheiros e Higiene (RDC Anvisa)',
      nome_en: 'Bathrooms & Hygiene (Standards)',
      nome_es: 'Baños e Higiene (Normativa)',
      icone: 'Shower',
      cor: '#0288D1',
      itens: [
        {
          id: 'asilo_barras',
          texto: 'Banheiros adaptados com barras de apoio fixadas no vaso e no box',
          texto_en: 'Adapted bathrooms with grab bars fixed on the toilet and shower',
          texto_es: 'Baños adaptados con barras de apoyo fijadas en el inodoro y la ducha',
          critico: true,
          detalhes: 'As barras devem suportar o peso do corpo em caso de desequilíbrio.',
          detalhes_en: 'Bars must support body weight in case of loss of balance.',
          detalhes_es: 'Las barras deben soportar el peso del cuerpo en caso de desequilibrio.'
        },
        {
          id: 'asilo_portas_box',
          texto: 'Portas dos banheiros abrem para fora (acesso rápido em caso de queda)',
          texto_en: 'Bathroom doors open outward (quick access in case of fall)',
          texto_es: 'Puertas de baños abren hacia afuera (acceso rápido en caso de caída)',
          critico: true,
          detalhes: 'Se o idoso cair contra a porta, quem está fora consegue abrir para socorrer.',
          detalhes_en: 'If the elderly person falls against the door, someone outside can open it to help.',
          detalhes_es: 'Si el anciano cae contra la puerta, quien está afuera puede abrirla para socorrer.'
        },
        {
          id: 'asilo_piso_nivelado',
          texto: 'Piso do box é totalmente nivelado (sem ressaltos de mármore)',
          texto_en: 'Shower floor is completely level (no marble ridges)',
          texto_es: 'Piso de la ducha completamente nivelado (sin relieves de mármol)',
          critico: false,
          detalhes: 'Qualquer ressalto no piso do box é um risco de tropeço desnecessário.',
          detalhes_en: 'Any ridge on the shower floor is an unnecessary trip hazard.',
          detalhes_es: 'Cualquier relieve en el piso de la ducha es un riesgo innecesario de tropiezo.'
        },
        {
          id: 'asilo_vaso_elevado',
          texto: 'Assento do vaso sanitário é elevado, facilitando o uso',
          texto_en: 'Toilet seat is raised for easier use',
          texto_es: 'Asiento del inodoro elevado para facilitar el uso',
          critico: false,
          detalhes: 'Vasos elevados exigem menos esforço dos joelhos e reduzem as tonturas ao levantar.',
          detalhes_en: 'Raised toilets require less knee effort and reduce dizziness when standing.',
          detalhes_es: 'Los inodoros elevados requieren menos esfuerzo de rodillas y reducen los mareos al levantarse.'
        }
      ]
    },
    {
      id: 'saude',
      nome: 'Emergência e Cuidados Médicos',
      nome_en: 'Emergency & Medical Care',
      nome_es: 'Emergencia y Cuidados Médicos',
      icone: 'Siren',
      cor: '#D32F2F',
      itens: [
        {
          id: 'asilo_botoes',
          texto: 'Quartos/banheiros possuem botões de emergência ao alcance das mãos e do chão',
          texto_en: 'Rooms/bathrooms have emergency buttons within hand and floor reach',
          texto_es: 'Habitaciones/baños tienen botones de emergencia al alcance de las manos y del suelo',
          critico: true,
          detalhes: 'Caso o idoso caia e não consiga levantar, ele deve poder pedir ajuda do nível do chão.',
          detalhes_en: 'If the elderly person falls and cannot get up, they must be able to call for help from floor level.',
          detalhes_es: 'Si el anciano cae y no puede levantarse, debe poder pedir ayuda desde el nivel del suelo.'
        },
        {
          id: 'asilo_medicamentos',
          texto: 'Medicamentos são gerenciados e trancados exclusivamente pela enfermagem',
          texto_en: 'Medications are managed and locked exclusively by nursing staff',
          texto_es: 'Los medicamentos son gestionados y guardados bajo llave exclusivamente por enfermería',
          critico: true,
          detalhes: 'Erros de medicação e automedicação são riscos críticos em asilos.',
          detalhes_en: 'Medication errors and self-medication are critical risks in nursing homes.',
          detalhes_es: 'Los errores de medicación y la automedicación son riesgos críticos en asilos.'
        },
        {
          id: 'asilo_camas',
          texto: 'Camas possuem altura regulável e grades retráteis para evitar quedas',
          texto_en: 'Beds have adjustable height and retractable rails to prevent falls',
          texto_es: 'Las camas tienen altura regulable y barandillas retráctiles para evitar caídas',
          critico: false,
          detalhes: 'A grade ajuda a evitar que o idoso role para fora da cama durante o sono.',
          detalhes_en: 'The rail helps keep an older person from rolling out of bed during sleep.',
          detalhes_es: 'La barandilla ayuda a evitar que la persona mayor ruede fuera de la cama durante el sueño.'
        }
      ]
    },
    {
      id: 'incendio',
      nome: 'Incêndio e Evacuação Adaptada',
      nome_en: 'Fire & Adapted Evacuation',
      nome_es: 'Incendio y Evacuación Adaptada',
      icone: 'Fire',
      cor: '#F4511E',
      itens: [
        {
          id: 'asilo_plano_abandono',
          texto: 'Plano de emergência prevê a retirada de pessoas acamadas ou com mobilidade reduzida',
          texto_en: 'Emergency plan covers evacuating bedridden residents and those with reduced mobility',
          texto_es: 'El plan de emergencia contempla la evacuación de personas encamadas o con movilidad reducida',
          critico: true,
          detalhes: 'A evacuação de pessoas com mobilidade reduzida exige treinamento e equipamentos específicos.',
          detalhes_en: 'Evacuation of people with reduced mobility requires specific training and equipment.',
          detalhes_es: 'La evacuación de personas con movilidad reducida requiere entrenamiento y equipos específicos.'
        },
        {
          id: 'asilo_corredores_livres',
          texto: 'Ausência de cadeiras ou macas soltas nos corredores bloqueando a fuga',
          texto_en: 'No loose chairs or stretchers in corridors blocking escape routes',
          texto_es: 'Ausencia de sillas o camillas sueltas en los pasillos bloqueando la salida',
          critico: true,
          detalhes: 'Obstáculos em rotas de fuga podem ser fatais em caso de pânico ou fumaça.',
          detalhes_en: 'Obstacles in escape routes can be fatal in case of panic or smoke.',
          detalhes_es: 'Los obstáculos en las rutas de escape pueden ser fatales en caso de pánico o humo.'
        },
        {
          id: 'asilo_detectores',
          texto: 'Sistema de detecção de fumaça e alarme sonoro ativo, com equipe treinada para a evacuação',
          texto_en: 'Active smoke detection and sound alarm system, with staff trained for evacuation',
          texto_es: 'Sistema de detección de humo y alarma sonora activo, con personal formado para la evacuación',
          critico: true,
          detalhes: 'Sistemas automáticos ganham minutos preciosos para o início da evacuação.',
          detalhes_en: 'Automatic systems gain precious minutes for the start of evacuation.',
          detalhes_es: 'Los sistemas automáticos ganan minutos preciosos para el inicio de la evacuación.'
        }
      ]
    },
    {
      id: 'equipe',
      nome: 'Equipe e Ética do Cuidado',
      nome_en: 'Staff & Care Ethics',
      nome_es: 'Equipo y Ética del Cuidado',
      icone: 'Handshake',
      cor: '#388E3C',
      itens: [
        {
          id: 'asilo_cameras',
          texto: 'Instalação de câmeras nas áreas comuns para auditoria comportamental',
          texto_en: 'Camera installation in common areas for behavioral auditing',
          texto_es: 'Instalación de cámaras en áreas comunes para auditoría de comportamiento',
          critico: true,
          detalhes: 'Transparência no cuidado inibe maus-tratos e serve como registro de incidentes.',
          detalhes_en: 'Transparency in care inhibits abuse and serves as an incident record.',
          detalhes_es: 'La transparencia en el cuidado inhibe el maltrato y sirve como registro de incidentes.'
        },
        {
          id: 'asilo_qualificacao',
          texto: 'Cuidadores possuem qualificação técnica e antecedentes checados',
          texto_en: 'Caregivers have technical qualifications and background checks',
          texto_es: 'Los cuidadores tienen cualificación técnica y antecedentes verificados',
          critico: true,
          detalhes: 'A segurança do idoso depende diretamente da integridade e preparo da equipe.',
          detalhes_en: 'The safety of the elderly depends directly on the integrity and training of the staff.',
          detalhes_es: 'La seguridad del anciano depende directamente de la integridad y preparación del equipo.'
        },
        {
          id: 'asilo_transparencia',
          texto: 'Idosos se comunicam livremente com a família sem censura',
          texto_en: 'Elderly communicate freely with family without censorship',
          texto_es: 'Los ancianos se comunican libremente con la familia sin censura',
          critico: false,
          detalhes: 'O isolamento forçado é um sinal de alerta para abusos institucionais.',
          detalhes_en: 'Forced isolation is a warning sign for institutional abuse.',
          detalhes_es: 'El aislamiento forzado es una señal de alerta de abuso institucional.'
        }
      ]
    }
  ],

  criterios_criticos: 12,
  total_itens: 18,

  // Perguntas sugeridas para a família fazer à diretoria
  perguntas_sugeridas: [
    'Qual a formação técnica da equipe de cuidadores e enfermagem?',
    'Como é feito o controle de saída de idosos com Alzheimer ou demência?',
    'Qual o protocolo em caso de queda com suspeita de fratura?',
    'Com que frequência os familiares recebem relatórios de saúde?',
    'A instituição permite visitas em qualquer horário ou apenas agendadas?'
  ]
};

export const calcularPontuacao = (respostas) => {
  let totalItens = 0;
  let itensMarcados = 0;
  let criticosMarcados = 0;
  let totalCriticos = 0;

  CHECKLIST_ASILO_SEGURA.categorias.forEach(categoria => {
    categoria.itens.forEach(item => {
      if (respostas[item.id] === 'na') {
        return;
      }

      totalItens++;
      if (item.critico) totalCriticos++;

      if (respostas[item.id] === true || respostas[item.id] === 'conforme') {
        itensMarcados++;
        if (item.critico) criticosMarcados++;
      }
    });
  });

  return {
    total: totalItens,
    marcados: itensMarcados,
    percentual: totalItens > 0 ? Math.round((itensMarcados / totalItens) * 100) : 0,
    criticos_total: totalCriticos,
    criticos_marcados: criticosMarcados,
    criticos_percentual: totalCriticos > 0 ? Math.round((criticosMarcados / totalCriticos) * 100) : 0
  };
};

export const getNivelSeguranca = (pontuacao) => {
  const { criticos_percentual } = pontuacao;

  if (criticos_percentual >= 90) {
    return {
      nivel: 'EXCELENTE',
      cor: '#4CAF50',
      icone: 'CheckCircle',
      mensagem: 'A instituição atende aos mais rigorosos critérios de segurança sênior.',
      mensagem_en: 'The institution meets the most rigorous senior safety criteria.',
      mensagem_es: 'La institución cumple con los criterios más rigurosos de seguridad para ancianos.'
    };
  } else if (criticos_percentual >= 70) {
    return {
      nivel: 'BOM',
      cor: '#FFD700',
      icone: 'ThumbsUp',
      mensagem: 'A instituição é segura, mas alguns pontos de acessibilidade podem melhorar.',
      mensagem_en: 'The institution is safe, but some accessibility points can improve.',
      mensagem_es: 'La institución es segura, pero algunos puntos de accesibilidad pueden mejorar.'
    };
  } else if (criticos_percentual >= 50) {
    return {
      nivel: 'REGULAR',
      cor: '#FF9800',
      icone: 'Warning',
      mensagem: 'Atenção: Foram encontradas falhas críticas na infraestrutura de cuidado.',
      mensagem_en: 'Warning: Critical failures were found in the care infrastructure.',
      mensagem_es: 'Atención: Se encontraron fallas críticas en la infraestructura de cuidado.'
    };
  } else {
    return {
      nivel: 'INSUFICIENTE',
      cor: '#F44336',
      icone: 'XCircle',
      mensagem: 'ALERTA: A instituição apresenta riscos imediatos à integridade dos idosos.',
      mensagem_en: 'ALERT: The institution presents immediate risks to the integrity of the elderly.',
      mensagem_es: '¡ALERTA! La institución presenta riesgos inmediatos para la integridad de los ancianos.'
    };
  }
};

export default {
  CHECKLIST_ASILO_SEGURA,
  calcularPontuacao,
  getNivelSeguranca
};
