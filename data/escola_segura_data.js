/**
 * escola_segura_data.js
 * Dados do checklist Escola Segura
 * Vigilaro Care V5
 * 
 * Fonte: Ministério da Educação, Corpo de Bombeiros, ABNT
 * Atualizado: Novembro/2025
 */

// ============================================
// CHECKLIST ESCOLA SEGURA
// ============================================

export const CHECKLIST_ESCOLA_SEGURA = {
  id: 'escola-segura',
  nome: 'Escola Segura',
  nome_en: 'Safe School',
  nome_es: 'Escuela Segura',
  icone: 'Student',
  cor: '#4169E1',
  descricao: 'Checklist completo para avaliar segurança da instituição de ensino',
  descricao_en: 'Complete checklist to evaluate the safety of educational institutions',
  descricao_es: 'Lista de verificación completa para evaluar la seguridad de la institución educativa',

  introducao: `Este checklist ajudará pais e responsáveis na verificação do nível de segurança da Instituição de Ensino e se ela está preparada para prevenir acidentes.

Solicite um tour pelas instalações e não hesite em fazer perguntas sobre a visão da escola sobre a prevenção de acidentes com seus alunos.`,
  introducao_en: `This checklist will help parents and guardians verify the safety level of the Educational Institution and whether it is prepared to prevent accidents.

Request a tour of the facilities and do not hesitate to ask questions about the school's vision for accident prevention with its students.`,
  introducao_es: `Esta lista de verificación ayudará a padres y responsables a verificar el nivel de seguridad de la Institución Educativa y si está preparada para prevenir accidentes.

Solicite un recorrido por las instalaciones y no dude en hacer preguntas sobre la visión de la escuela sobre la prevención de accidentes con sus alumnos.`,

  categorias: [
    {
      id: 'estrutura-fisica',
      nome: 'Estrutura Física',
      nome_en: 'Physical Structure',
      nome_es: 'Estructura Física',
      icone: 'Crane',
      cor: '#FF8C00',

      itens: [
        {
          id: 'escadas-rampas',
          texto: 'Escadas e rampas possuem piso antiderrapante',
          texto_en: 'Stairs and ramps have non-slip flooring',
          texto_es: 'Escaleras y rampas tienen piso antideslizante',
          critico: true,
          detalhes: 'Superfícies antiderrapantes ajudam a prevenir quedas, especialmente em dias de chuva.',
          detalhes_en: 'Non-slip surfaces help prevent falls, especially on rainy days.',
          detalhes_es: 'Las superficies antideslizantes ayudan a prevenir caídas, especialmente en días de lluvia.'
        },
        {
          id: 'corrimao',
          texto: 'Corrimãos instalados em escadas e rampas',
          texto_en: 'Handrails installed on stairs and ramps',
          texto_es: 'Pasamanos instalados en escaleras y rampas',
          critico: true,
          detalhes: 'Corrimãos devem estar em ambos os lados e em altura adequada para as crianças.',
          detalhes_en: 'Handrails should be on both sides and at appropriate height for children.',
          detalhes_es: 'Los pasamanos deben estar en ambos lados y a una altura adecuada para los niños.'
        },
        {
          id: 'corrimao-altura',
          texto: 'Altura dos corrimãos adequada às crianças',
          texto_en: 'Handrail height appropriate for children',
          texto_es: 'Altura de pasamanos adecuada para niños',
          critico: false,
          detalhes: 'Para crianças pequenas, pode ser necessário corrimão duplo (um mais baixo).',
          detalhes_en: 'For small children, a double handrail (one lower) may be needed.',
          detalhes_es: 'Para niños pequeños, puede ser necesario un pasamanos doble (uno más bajo).'
        },
        {
          id: 'janelas-protegidas',
          texto: 'Janelas possuem grades ou telas de proteção',
          texto_en: 'Windows have protective bars or screens',
          texto_es: 'Las ventanas tienen rejas o mallas de protección',
          critico: true,
          detalhes: 'Fundamental em andares superiores. Grades com espaçamento máximo de 6 cm.',
          detalhes_en: 'Essential on upper floors. Bars with maximum 6 cm spacing.',
          detalhes_es: 'Fundamental en pisos superiores. Rejas con espaciado máximo de 6 cm.'
        },
        {
          id: 'vidros-seguros',
          texto: 'Vidros são temperados ou laminados',
          texto_en: 'Glass is tempered or laminated',
          texto_es: 'Los vidrios son templados o laminados',
          critico: true,
          detalhes: 'Vidros de segurança não se estilhaçam em pedaços cortantes.',
          detalhes_en: 'Safety glass does not shatter into sharp pieces.',
          detalhes_es: 'Los vidrios de seguridad no se rompen en pedazos cortantes.'
        },
        {
          id: 'tomadas-protegidas',
          texto: 'Tomadas protegidas com tampas ou em altura elevada',
          texto_en: 'Outlets protected with covers or placed at elevated height',
          texto_es: 'Tomacorrientes protegidos con tapas o a altura elevada',
          critico: true,
          detalhes: 'Reduz o risco de choque elétrico. Tomadas baixas devem ter proteção.',
          detalhes_en: 'Reduces the risk of electric shock. Low outlets must have protection.',
          detalhes_es: 'Reduce el riesgo de choques eléctricos. Los tomacorrientes bajos deben tener protección.'
        },
        {
          id: 'fiacao-protegida',
          texto: 'Não há fiação elétrica aparente ou desencapada',
          texto_en: 'No exposed or bare electrical wiring',
          texto_es: 'No hay cableado eléctrico expuesto o pelado',
          critico: true,
          detalhes: 'Toda fiação deve estar embutida ou em conduítes.',
          detalhes_en: 'All wiring must be embedded or in conduits.',
          detalhes_es: 'Todo el cableado debe estar empotrado o en conductos.'
        },
        {
          id: 'iluminacao',
          texto: 'Iluminação adequada em todos os ambientes',
          texto_en: 'Adequate lighting in all areas',
          texto_es: 'Iluminación adecuada en todos los ambientes',
          critico: false,
          detalhes: 'Boa iluminação ajuda a prevenir acidentes e favorece a aprendizagem.',
          detalhes_en: 'Good lighting helps prevent accidents and supports learning.',
          detalhes_es: 'La buena iluminación ayuda a prevenir accidentes y favorece el aprendizaje.'
        },
        {
          id: 'ventilacao',
          texto: 'Ventilação adequada nas salas de aula',
          texto_en: 'Adequate ventilation in classrooms',
          texto_es: 'Ventilación adecuada en las aulas',
          critico: false,
          detalhes: 'Ambiente bem ventilado reduz a propagação de doenças.',
          detalhes_en: 'Good ventilation reduces the spread of disease.',
          detalhes_es: 'Un ambiente bien ventilado reduce la propagación de enfermedades.'
        },
        {
          id: 'saidas-emergencia',
          texto: 'Saídas de emergência sinalizadas e desobstruídas',
          texto_en: 'Emergency exits marked and unobstructed',
          texto_es: 'Salidas de emergencia señalizadas y despejadas',
          critico: true,
          detalhes: 'Fundamental para evacuação rápida em caso de emergência.',
          detalhes_en: 'Essential for rapid evacuation in case of emergency.',
          detalhes_es: 'Fundamental para una evacuación rápida en caso de emergencia.'
        },
        {
          id: 'extintores',
          texto: 'Extintores de incêndio visíveis, dentro da validade e desobstruídos.',
          texto_en: 'Fire extinguishers visible, within their expiration date and unobstructed.',
          texto_es: 'Extintores de incendio visibles, vigentes y sin obstrucciones.',
          critico: true,
          detalhes: 'Verificar se há extintores suficientes e se estão em locais acessíveis e sinalizados.',
          detalhes_en: 'Check that there are enough extinguishers and that they are in accessible, clearly marked locations.',
          detalhes_es: 'Verificar que haya suficientes extintores y que estén en lugares accesibles y señalizados.'
        },
        {
          id: 'piso-conservacao',
          texto: 'Pisos em bom estado (sem buracos, desníveis)',
          texto_en: 'Floors in good condition (no holes, uneven surfaces)',
          texto_es: 'Pisos en buen estado (sin huecos, desniveles)',
          critico: true,
          detalhes: 'Pisos irregulares são grande causa de quedas.',
          detalhes_en: 'Irregular floors are a major cause of falls.',
          detalhes_es: 'Los pisos irregulares son una gran causa de caídas.'
        }
      ]
    },

    {
      id: 'mobiliario',
      nome: 'Mobiliário e Equipamentos',
      nome_en: 'Furniture & Equipment',
      nome_es: 'Mobiliario y Equipos',
      icone: 'Chair',
      cor: '#8B4513',

      itens: [
        {
          id: 'moveis-adequados',
          texto: 'Móveis adequados à faixa etária das crianças',
          texto_en: 'Furniture appropriate for children\'s age group',
          texto_es: 'Muebles adecuados al grupo de edad de los niños',
          critico: true,
          detalhes: 'Mesas, cadeiras e prateleiras devem ter altura apropriada.',
          detalhes_en: 'Tables, chairs, and shelves should be at appropriate height.',
          detalhes_es: 'Mesas, sillas y estantes deben tener una altura apropiada.'
        },
        {
          id: 'moveis-estabilidade',
          texto: 'Móveis fixados ou com boa estabilidade',
          texto_en: 'Furniture secured or with good stability',
          texto_es: 'Muebles fijados o con buena estabilidad',
          critico: true,
          detalhes: 'Estantes e armários altos devem ser fixados na parede.',
          detalhes_en: 'Tall shelves and cabinets should be anchored to the wall.',
          detalhes_es: 'Los estantes y armarios altos deben estar fijados a la pared.'
        },
        {
          id: 'quinas-protegidas',
          texto: 'Quinas de móveis protegidas ou arredondadas',
          texto_en: 'Furniture corners protected or rounded',
          texto_es: 'Esquinas de muebles protegidas o redondeadas',
          critico: false,
          detalhes: 'Protetores de quina reduzem ferimentos em batidas.',
          detalhes_en: 'Corner guards reduce injuries from knocks.',
          detalhes_es: 'Los protectores de esquinas reducen las lesiones por golpes.'
        },
        {
          id: 'moveis-conservacao',
          texto: 'Móveis em bom estado de conservação',
          texto_en: 'Furniture in good condition',
          texto_es: 'Muebles en buen estado de conservación',
          critico: true,
          detalhes: 'Sem lascas, pregos expostos ou partes quebradas.',
          detalhes_en: 'No splinters, exposed nails, or broken parts.',
          detalhes_es: 'Sin astillas, clavos expuestos o partes rotas.'
        },
        {
          id: 'bercos-certificados',
          texto: 'Berços com {{CERT_SEAL}} (para berçários)',
          texto_en: 'Cribs certified by safety standards (for nurseries)',
          texto_es: 'Cunas certificadas por estándares de seguridad (para guarderías)',
          critico: true,
          detalhes: 'Verificar {{CERT_SEAL}} e a conformidade com {{STANDARDS_BODY}}.',
          detalhes_en: 'Check for safety certification seal and compliance with standards.',
          detalhes_es: 'Verificar el sello de certificación y el cumplimiento de las normas.'
        },
        {
          id: 'bercos-individuais',
          texto: 'Um bebê por berço (nunca compartilhado)',
          texto_en: 'One baby per crib (never shared)',
          texto_es: 'Un bebé por cuna (nunca compartida)',
          critico: true,
          detalhes: 'Compartilhar berço aumenta risco de sufocação.',
          detalhes_en: 'Sharing a crib increases the risk of suffocation.',
          detalhes_es: 'Compartir una cuna aumenta el riesgo de asfixia.'
        },
        {
          id: 'bercos-grades',
          texto: 'Grades dos berços com espaçamento adequado (máx 6 cm)',
          texto_en: 'Crib slats with adequate spacing (max 6 cm)',
          texto_es: 'Barrotes de cunas con espaciado adecuado (máx 6 cm)',
          critico: true,
          detalhes: 'Reduz o risco de a cabeça do bebê ficar presa.',
          detalhes_en: 'Reduces the risk of the baby\'s head getting stuck.',
          detalhes_es: 'Reduce el riesgo de que la cabeza del bebé quede atrapada.'
        }
      ]
    },

    {
      id: 'banheiros',
      nome: 'Banheiros',
      nome_en: 'Bathrooms',
      nome_es: 'Baños',
      icone: 'Toilet',
      cor: '#4682B4',

      itens: [
        {
          id: 'banheiro-idade',
          texto: 'Banheiros adaptados à faixa etária',
          texto_en: 'Bathrooms adapted to the age group',
          texto_es: 'Baños adaptados al grupo de edad',
          critico: true,
          detalhes: 'Vasos sanitários, pias e torneiras em altura acessível para as crianças.',
          detalhes_en: 'Toilets, sinks, and faucets at accessible height for children.',
          detalhes_es: 'Inodoros, lavabos y grifos a una altura accesible para los niños.'
        },
        {
          id: 'banheiro-higiene',
          texto: 'Banheiros limpos e bem conservados',
          texto_en: 'Bathrooms clean and well maintained',
          texto_es: 'Baños limpios y bien mantenidos',
          critico: true,
          detalhes: 'Higiene ajuda a prevenir doenças e infecções.',
          detalhes_en: 'Hygiene helps prevent diseases and infections.',
          detalhes_es: 'La higiene ayuda a prevenir enfermedades e infecciones.'
        },
        {
          id: 'banheiro-privacidade',
          texto: 'Divisórias que preservam a privacidade',
          texto_en: 'Partitions that preserve privacy',
          texto_es: 'Divisiones que preserven la privacidad',
          critico: false,
          detalhes: 'Importante para desenvolvimento da autonomia e pudor.',
          detalhes_en: 'Important for developing autonomy and modesty.',
          detalhes_es: 'Importante para el desarrollo de la autonomía y el pudor.'
        },
        {
          id: 'banheiro-piso',
          texto: 'Piso antiderrapante',
          texto_en: 'Non-slip flooring',
          texto_es: 'Piso antideslizante',
          critico: true,
          detalhes: 'Fundamental para prevenir quedas em ambiente molhado.',
          detalhes_en: 'Essential to prevent falls in wet environments.',
          detalhes_es: 'Fundamental para prevenir caídas en ambientes mojados.'
        },
        {
          id: 'banheiro-iluminacao',
          texto: 'Iluminação adequada',
          texto_en: 'Adequate lighting',
          texto_es: 'Iluminación adecuada',
          critico: false,
          detalhes: 'Boa visibilidade aumenta segurança.',
          detalhes_en: 'Good visibility increases safety.',
          detalhes_es: 'La buena visibilidad aumenta la seguridad.'
        },
        {
          id: 'banheiro-ventilacao',
          texto: 'Ventilação adequada',
          texto_en: 'Adequate ventilation',
          texto_es: 'Ventilación adecuada',
          critico: false,
          detalhes: 'Ajuda a prevenir mofo e umidade excessiva.',
          detalhes_en: 'Helps prevent mold and excessive humidity.',
          detalhes_es: 'Ayuda a prevenir el moho y la humedad excesiva.'
        },
        {
          id: 'fraldario',
          texto: 'Fraldário com trocador seguro (para bebês)',
          texto_en: 'Diaper changing area with safe changing table (for babies)',
          texto_es: 'Cambiador con mesa segura para cambio de pañales (para bebés)',
          critico: true,
          detalhes: 'Trocador com cintas de segurança e superfície antiderrapante.',
          detalhes_en: 'Changing table with safety straps and non-slip surface.',
          detalhes_es: 'Cambiador con correas de seguridad y superficie antideslizante.'
        }
      ]
    },

    {
      id: 'parquinho',
      nome: 'Parquinho e Área de Lazer',
      nome_en: 'Playground & Recreation Area',
      nome_es: 'Parque Infantil y Área de Recreación',
      icone: 'Confetti',
      cor: '#32CD32',

      itens: [
        {
          id: 'parquinho-certificacao',
          texto: 'Brinquedos seguem recomendações da ABNT',
          texto_en: 'Playground equipment follows safety standards',
          texto_es: 'Los juegos siguen las normas de seguridad',
          critico: true,
          detalhes: 'Equipamentos conforme a ABNT NBR 16071 (playgrounds) atendem a requisitos mínimos de segurança.',
          detalhes_en: 'Equipment built to playground safety standards meets minimum safety requirements.',
          detalhes_es: 'Los equipos conformes a las normas de seguridad de parques infantiles cumplen requisitos mínimos de seguridad.'
        },
        {
          id: 'parquinho-manutencao',
          texto: 'Brinquedos recebem manutenção constante',
          texto_en: 'Playground equipment receives constant maintenance',
          texto_es: 'Los juegos reciben mantenimiento constante',
          critico: true,
          detalhes: 'Perguntar frequência das inspeções (recomendado: mensalmente).',
          detalhes_en: 'Ask about inspection frequency (recommended: monthly).',
          detalhes_es: 'Preguntar la frecuencia de las inspecciones (recomendado: mensualmente).'
        },
        {
          id: 'parquinho-conservacao',
          texto: 'Brinquedos em bom estado (sem ferrugem, peças soltas)',
          texto_en: 'Equipment in good condition (no rust, loose parts)',
          texto_es: 'Equipos en buen estado (sin óxido, piezas sueltas)',
          critico: true,
          detalhes: 'Verificar parafusos, correntes, balanços e escorregadores.',
          detalhes_en: 'Check screws, chains, swings, and slides.',
          detalhes_es: 'Verificar tornillos, cadenas, columpios y toboganes.'
        },
        {
          id: 'parquinho-quinas',
          texto: 'Sem quinas afiadas ou partes cortantes',
          texto_en: 'No sharp edges or cutting parts',
          texto_es: 'Sin bordes afilados ni partes cortantes',
          critico: true,
          detalhes: 'Bordas devem ser arredondadas.',
          detalhes_en: 'Edges should be rounded.',
          detalhes_es: 'Los bordes deben ser redondeados.'
        },
        {
          id: 'parquinho-piso',
          texto: 'Piso absorvente de impacto (grama, areia, borracha)',
          texto_en: 'Impact-absorbing surface (grass, sand, rubber)',
          texto_es: 'Piso absorbente de impacto (césped, arena, goma)',
          critico: true,
          detalhes: 'Piso adequado reduz gravidade de quedas. Nunca concreto ou asfalto.',
          detalhes_en: 'Proper flooring reduces fall severity. Never concrete or asphalt.',
          detalhes_es: 'El piso adecuado reduce la gravedad de las caídas. Nunca concreto o asfalto.'
        },
        {
          id: 'parquinho-piso-espessura',
          texto: 'Espessura adequada do piso absorvente',
          texto_en: 'Adequate thickness of impact-absorbing surface',
          texto_es: 'Espesor adecuado del piso absorbente',
          critico: true,
          detalhes: 'Areia ou material emborrachado com no mínimo 30 cm de profundidade.',
          detalhes_en: 'Sand or rubber material with at least 30 cm depth.',
          detalhes_es: 'Arena o material de goma con al menos 30 cm de profundidad.'
        },
        {
          id: 'parquinho-cercado',
          texto: 'Área do parquinho cercada ou delimitada',
          texto_en: 'Playground area fenced or delimited',
          texto_es: 'Área del parque infantil cercada o delimitada',
          critico: false,
          detalhes: 'Dificulta que crianças corram para áreas perigosas.',
          detalhes_en: 'Makes it harder for children to run into dangerous areas.',
          detalhes_es: 'Dificulta que los niños corran hacia áreas peligrosas.'
        },
        {
          id: 'parquinho-supervisao',
          texto: 'Há supervisão adulta constante no parquinho',
          texto_en: 'There is constant adult supervision at the playground',
          texto_es: 'Hay supervisión adulta constante en el parque infantil',
          critico: true,
          detalhes: 'Fundamental para intervenção rápida em acidentes.',
          detalhes_en: 'Essential for quick intervention in accidents.',
          detalhes_es: 'Fundamental para la intervención rápida en accidentes.'
        },
        {
          id: 'parquinho-sombra',
          texto: 'Área com sombra ou cobertura',
          texto_en: 'Area with shade or cover',
          texto_es: 'Área con sombra o cobertura',
          critico: false,
          detalhes: 'Protege do sol forte, especialmente em regiões quentes.',
          detalhes_en: 'Protects from strong sun, especially in hot regions.',
          detalhes_es: 'Protege del sol fuerte, especialmente en regiones cálidas.'
        }
      ]
    },

    {
      id: 'area-esportiva',
      nome: 'Quadras e Equipamentos Esportivos',
      nome_en: 'Courts & Sports Equipment',
      nome_es: 'Canchas y Equipos Deportivos',
      icone: 'SoccerBall',
      cor: '#FFD700',

      itens: [
        {
          id: 'quadra-piso',
          texto: 'Piso nivelado e capaz de absorver impacto',
          texto_en: 'Level surface capable of absorbing impact',
          texto_es: 'Piso nivelado y capaz de absorber impacto',
          critico: true,
          detalhes: 'Piso emborrachado ou sintético é ideal. Evitar concreto puro.',
          detalhes_en: 'Rubber or synthetic flooring is ideal. Avoid bare concrete.',
          detalhes_es: 'El piso de goma o sintético es ideal. Evitar concreto puro.'
        },
        {
          id: 'quadra-drenagem',
          texto: 'Boa drenagem (não acumula água)',
          texto_en: 'Good drainage (does not accumulate water)',
          texto_es: 'Buen drenaje (no acumula agua)',
          critico: false,
          detalhes: 'Reduz escorregões e permite o uso depois da chuva.',
          detalhes_en: 'Reduces slipping and allows use after rain.',
          detalhes_es: 'Reduce los resbalones y permite el uso después de la lluvia.'
        },
        {
          id: 'basquete-protecao',
          texto: 'Postes de basquete protegidos com espuma',
          texto_en: 'Basketball poles protected with foam padding',
          texto_es: 'Postes de baloncesto protegidos con espuma',
          critico: true,
          detalhes: 'Proteção acolchoada reduz lesões em colisões.',
          detalhes_en: 'Padded protection reduces collision injuries.',
          detalhes_es: 'La protección acolchada reduce las lesiones por colisión.'
        },
        {
          id: 'traves-conservacao',
          texto: 'Traves de gol sem ferrugem',
          texto_en: 'Goal posts without rust',
          texto_es: 'Porterías sin óxido',
          critico: true,
          detalhes: 'Estruturas enferrujadas podem quebrar ou causar tétano.',
          detalhes_en: 'Rusted structures can break or cause tetanus.',
          detalhes_es: 'Las estructuras oxidadas pueden romperse o causar tétanos.'
        },
        {
          id: 'traves-fixacao',
          texto: 'Traves bem fixadas no solo',
          texto_en: 'Goal posts securely anchored to the ground',
          texto_es: 'Porterías bien fijadas al suelo',
          critico: true,
          detalhes: 'Traves soltas podem tombar e causar acidentes graves.',
          detalhes_en: 'Loose goal posts can topple and cause serious accidents.',
          detalhes_es: 'Las porterías sueltas pueden volcarse y causar accidentes graves.'
        },
        {
          id: 'ganchos-protegidos',
          texto: 'Ganchos de rede protegidos',
          texto_en: 'Net hooks protected',
          texto_es: 'Ganchos de red protegidos',
          critico: true,
          detalhes: 'Ganchos expostos podem causar ferimentos.',
          detalhes_en: 'Exposed hooks can cause injuries.',
          detalhes_es: 'Los ganchos expuestos pueden causar lesiones.'
        },
        {
          id: 'arquibancada',
          texto: 'Arquibancadas seguras (se houver)',
          texto_en: 'Safe bleachers (if applicable)',
          texto_es: 'Gradas seguras (si las hay)',
          critico: false,
          detalhes: 'Com corrimãos e espaçamento adequado entre assentos.',
          detalhes_en: 'With handrails and adequate spacing between seats.',
          detalhes_es: 'Con pasamanos y espaciado adecuado entre asientos.'
        }
      ]
    },

    {
      id: 'piscina',
      nome: 'Piscina (se houver)',
      nome_en: 'Swimming Pool (if applicable)',
      nome_es: 'Piscina (si aplica)',
      icone: 'SwimmingPool',
      cor: '#00CED1',

      itens: [
        {
          id: 'piscina-cerca',
          texto: 'Piscina cercada por grade',
          texto_en: 'Pool surrounded by fence',
          texto_es: 'Piscina rodeada por valla',
          critico: true,
          detalhes: 'Cerca de no mínimo 1,50 m de altura ao redor de toda a piscina.',
          detalhes_en: 'Fence at least 1.2 m (4 ft) high around the entire pool.',
          detalhes_es: 'Valla de al menos 1,2 m de altura alrededor de toda la piscina.'
        },
        {
          id: 'piscina-portao',
          texto: 'Portão com trava de segurança',
          texto_en: 'Gate with safety lock',
          texto_es: 'Portón con cerradura de seguridad',
          critico: true,
          detalhes: 'Portão deve trancar automaticamente e ter trava fora do alcance de crianças.',
          detalhes_en: 'Gate should lock automatically and have a lock out of children\'s reach.',
          detalhes_es: 'El portón debe cerrarse automáticamente y tener cerradura fuera del alcance de los niños.'
        },
        {
          id: 'piscina-acesso',
          texto: 'Acesso bloqueado quando não em uso',
          texto_en: 'Access blocked when not in use',
          texto_es: 'Acceso bloqueado cuando no está en uso',
          critico: true,
          detalhes: 'Crianças não devem ter acesso à área da piscina sem supervisão.',
          detalhes_en: 'Children should not have access to the pool area without supervision.',
          detalhes_es: 'Los niños no deben tener acceso al área de la piscina sin supervisión.'
        },
        {
          id: 'piscina-profundidade',
          texto: 'Profundidade claramente sinalizada',
          texto_en: 'Depth clearly marked',
          texto_es: 'Profundidad claramente señalizada',
          critico: true,
          detalhes: 'Marcações visíveis das profundidades.',
          detalhes_en: 'Visible depth markings.',
          detalhes_es: 'Marcas visibles de profundidad.'
        },
        {
          id: 'piscina-escada',
          texto: 'Escada/degraus com corrimão',
          texto_en: 'Ladder/steps with handrail',
          texto_es: 'Escalera/peldaños con pasamanos',
          critico: true,
          detalhes: 'Entrada e saída seguras da piscina.',
          detalhes_en: 'Safe pool entry and exit.',
          detalhes_es: 'Entrada y salida seguras de la piscina.'
        },
        {
          id: 'piscina-borda',
          texto: 'Bordas antiderrapantes',
          texto_en: 'Non-slip edges',
          texto_es: 'Bordes antideslizantes',
          critico: true,
          detalhes: 'Reduz escorregões ao redor da piscina.',
          detalhes_en: 'Reduces slipping around the pool.',
          detalhes_es: 'Reduce los resbalones alrededor de la piscina.'
        },
        {
          id: 'piscina-equipamentos',
          texto: 'Equipamentos de salvamento acessíveis (boia, vara, corda)',
          texto_en: 'Rescue equipment accessible (ring buoy, reaching pole, rope)',
          texto_es: 'Equipo de salvamento accesible (aro salvavidas, pértiga, cuerda)',
          critico: true,
          detalhes: 'Devem estar sempre disponíveis para uso imediato.',
          detalhes_en: 'Must always be available for immediate use.',
          detalhes_es: 'Deben estar siempre disponibles para uso inmediato.'
        },
        {
          id: 'piscina-supervisao',
          texto: 'Supervisor/monitor capacitado sempre presente',
          texto_en: 'Trained supervisor/monitor always present',
          texto_es: 'Supervisor/monitor capacitado siempre presente',
          critico: true,
          detalhes: 'Profissional com treinamento em salvamento aquático.',
          detalhes_en: 'Professional with aquatic rescue training.',
          detalhes_es: 'Profesional con entrenamiento en salvamento acuático.'
        },
        {
          id: 'piscina-primeiros-socorros',
          texto: 'Kit de primeiros socorros próximo à piscina',
          texto_en: 'First aid kit near the pool',
          texto_es: 'Kit de primeros auxilios cerca de la piscina',
          critico: true,
          detalhes: 'Para atendimento imediato em caso de acidente.',
          detalhes_en: 'For immediate care in case of accident.',
          detalhes_es: 'Para atención inmediata en caso de accidente.'
        },
        {
          id: 'piscina-higiene',
          texto: 'Água tratada e limpa',
          texto_en: 'Water treated and clean',
          texto_es: 'Agua tratada y limpia',
          critico: true,
          detalhes: 'Análise periódica da qualidade da água (pH, cloro).',
          detalhes_en: 'Periodic water quality analysis (pH, chlorine).',
          detalhes_es: 'Análisis periódico de la calidad del agua (pH, cloro).'
        }
      ]
    },

    {
      id: 'refeitorio',
      nome: 'Refeitório/Cantina',
      nome_en: 'Cafeteria/Dining Hall',
      nome_es: 'Comedor/Cafetería',
      icone: 'ForkKnife',
      cor: '#FF6347',

      itens: [
        {
          id: 'refeitorio-higiene',
          texto: 'Ambiente limpo e higienizado',
          texto_en: 'Clean and sanitized environment',
          texto_es: 'Ambiente limpio e higienizado',
          critico: true,
          detalhes: 'Limpeza frequente de mesas, cadeiras e pisos.',
          detalhes_en: 'Frequent cleaning of tables, chairs, and floors.',
          detalhes_es: 'Limpieza frecuente de mesas, sillas y pisos.'
        },
        {
          id: 'cozinha-separada',
          texto: 'Cozinha separada da área de refeição',
          texto_en: 'Kitchen separated from dining area',
          texto_es: 'Cocina separada del área de comedor',
          critico: true,
          detalhes: 'Crianças não devem ter acesso à área de preparo.',
          detalhes_en: 'Children should not have access to the preparation area.',
          detalhes_es: 'Los niños no deben tener acceso al área de preparación.'
        },
        {
          id: 'alimentos-armazenamento',
          texto: 'Alimentos armazenados adequadamente',
          texto_en: 'Food stored properly',
          texto_es: 'Alimentos almacenados adecuadamente',
          critico: true,
          detalhes: 'Refrigeração adequada e proteção contra pragas.',
          detalhes_en: 'Proper refrigeration and pest protection.',
          detalhes_es: 'Refrigeración adecuada y protección contra plagas.'
        },
        {
          id: 'agua-potavel',
          texto: 'Água potável disponível',
          texto_en: 'Drinking water available',
          texto_es: 'Agua potable disponible',
          critico: true,
          detalhes: 'Bebedouros ou copos higienizados.',
          detalhes_en: 'Sanitized water fountains or cups.',
          detalhes_es: 'Bebederos o vasos higienizados.'
        },
        {
          id: 'mesas-conservacao',
          texto: 'Mesas e cadeiras em bom estado',
          texto_en: 'Tables and chairs in good condition',
          texto_es: 'Mesas y sillas en buen estado',
          critico: false,
          detalhes: 'Sem lascas ou partes soltas.',
          detalhes_en: 'No splinters or loose parts.',
          detalhes_es: 'Sin astillas ni partes sueltas.'
        },
        {
          id: 'alergias',
          texto: 'Controle de alergias alimentares',
          texto_en: 'Food allergy management',
          texto_es: 'Control de alergias alimentarias',
          critico: true,
          detalhes: 'Escola tem protocolo para lidar com alergias.',
          detalhes_en: 'School has a protocol for handling allergies.',
          detalhes_es: 'La escuela tiene un protocolo para manejar alergias.'
        }
      ]
    },

    {
      id: 'seguranca-geral',
      nome: 'Segurança Geral',
      nome_en: 'General Safety',
      nome_es: 'Seguridad General',
      icone: 'Lock',
      cor: '#DC143C',

      itens: [
        {
          id: 'controle-acesso',
          texto: 'Controle de entrada e saída de pessoas',
          texto_en: 'People entry and exit control',
          texto_es: 'Control de entrada y salida de personas',
          critico: true,
          detalhes: 'Recepção com identificação de visitantes.',
          detalhes_en: 'Reception with visitor identification.',
          detalhes_es: 'Recepción con identificación de visitantes.'
        },
        {
          id: 'retirada-autorizada',
          texto: 'A criança só é entregue a pessoas autorizadas pela família',
          texto_en: 'Children are only handed over to people authorized by the family',
          texto_es: 'El niño solo se entrega a personas autorizadas por la familia',
          critico: true,
          detalhes: 'Pergunte como a escola confere quem vem buscar a criança e o que faz quando aparece alguém que não está na lista.',
          detalhes_en: 'Ask how the school checks who is collecting the child and what it does if someone not on the list turns up.',
          detalhes_es: 'Pregunte cómo comprueba la escuela quién viene a recoger al niño y qué hace si aparece alguien que no está en la lista.'
        },
        {
          id: 'antecedentes',
          texto: 'A escola pede certidão de antecedentes criminais de quem trabalha com as crianças',
          texto_en: 'The school requires criminal record checks for staff who work with children',
          texto_es: 'La escuela exige certificado de antecedentes penales a quien trabaja con los niños',
          critico: true,
          detalhes: 'Vale para professores e também para portaria, limpeza, cozinha e transporte.',
          detalhes_en: 'This applies to teachers and also to reception, cleaning, kitchen and transport staff.',
          detalhes_es: 'Vale para los docentes y también para conserjería, limpieza, cocina y transporte.'
        },
        {
          id: 'portoes-trancados',
          texto: 'Portões mantidos trancados durante horário de aula',
          texto_en: 'Gates kept locked during school hours',
          texto_es: 'Portones cerrados con llave durante el horario de clases',
          critico: true,
          detalhes: 'Dificulta a saída não autorizada e a entrada de estranhos.',
          detalhes_en: 'Makes unauthorized exits and strangers getting in harder.',
          detalhes_es: 'Dificulta la salida no autorizada y la entrada de extraños.'
        },
        {
          id: 'cameras',
          texto: 'Sistema de câmeras de segurança (opcional)',
          texto_en: 'Security camera system (optional)',
          texto_es: 'Sistema de cámaras de seguridad (opcional)',
          critico: false,
          detalhes: 'Aumenta segurança e permite monitoramento.',
          detalhes_en: 'Increases security and allows monitoring.',
          detalhes_es: 'Aumenta la seguridad y permite el monitoreo.'
        },
        {
          id: 'plano-emergencia',
          texto: 'Plano de emergência e evacuação documentado',
          texto_en: 'Documented emergency and evacuation plan',
          texto_es: 'Plan de emergencia y evacuación documentado',
          critico: true,
          detalhes: 'Rotinas de simulação de incêndio e evacuação.',
          detalhes_en: 'Fire and evacuation drill routines.',
          detalhes_es: 'Rutinas de simulación de incendio y evacuación.'
        },
        {
          id: 'simulacoes',
          texto: 'Simulações periódicas de evacuação',
          texto_en: 'Periodic evacuation drills',
          texto_es: 'Simulaciones periódicas de evacuación',
          critico: true,
          detalhes: 'Recomendado: pelo menos 2 vezes ao ano.',
          detalhes_en: 'Recommended: at least 2 times per year.',
          detalhes_es: 'Recomendado: al menos 2 veces al año.'
        },
        {
          id: 'primeiros-socorros',
          texto: 'Equipe treinada em primeiros socorros',
          texto_en: 'Staff trained in first aid',
          texto_es: 'Equipo capacitado en primeros auxilios',
          critico: true,
          detalhes: 'Pelo menos um funcionário capacitado por turno.',
          detalhes_en: 'At least one trained employee per shift.',
          detalhes_es: 'Al menos un empleado capacitado por turno.'
        },
        {
          id: 'medicamentos',
          texto: 'Protocolo para administração de medicamentos',
          texto_en: 'Protocol for medication administration',
          texto_es: 'Protocolo para administración de medicamentos',
          critico: true,
          detalhes: 'Apenas com prescrição médica e autorização dos pais.',
          detalhes_en: 'Only with medical prescription and parental authorization.',
          detalhes_es: 'Solo con prescripción médica y autorización de los padres.'
        },
        {
          id: 'ficha-medica',
          texto: 'Fichas médicas das crianças, atualizadas',
          texto_en: 'Children\'s medical records, kept up to date',
          texto_es: 'Fichas médicas de los niños, actualizadas',
          critico: true,
          detalhes: 'Incluindo alergias, condições especiais e contatos de emergência.',
          detalhes_en: 'Including allergies, special conditions, and emergency contacts.',
          detalhes_es: 'Incluyendo alergias, condiciones especiales y contactos de emergencia.'
        },
        {
          id: 'enfermaria',
          texto: 'Espaço para atendimento de emergências',
          texto_en: 'Space for emergency care',
          texto_es: 'Espacio para atención de emergencias',
          critico: false,
          detalhes: 'Sala de enfermaria ou espaço adequado para primeiros socorros.',
          detalhes_en: 'Infirmary room or adequate space for first aid.',
          detalhes_es: 'Sala de enfermería o espacio adecuado para primeros auxilios.'
        },
        {
          id: 'comunicacao-pais',
          texto: 'Sistema de comunicação rápida com os pais',
          texto_en: 'Quick communication system with parents',
          texto_es: 'Sistema de comunicación rápida con los padres',
          critico: true,
          detalhes: 'Telefones atualizados e meios de contato emergencial.',
          detalhes_en: 'Updated phone numbers and emergency contact methods.',
          detalhes_es: 'Teléfonos actualizados y medios de contacto de emergencia.'
        }
      ]
    },

    {
      id: 'professores',
      nome: 'Equipe e Capacitação',
      nome_en: 'Staff & Training',
      nome_es: 'Equipo y Capacitación',
      icone: 'ChalkboardTeacher',
      cor: '#9370DB',

      itens: [
        {
          id: 'numero-criancas',
          texto: 'Número adequado de crianças por professor',
          texto_en: 'Adequate number of children per teacher',
          texto_es: 'Número adecuado de niños por profesor',
          critico: true,
          detalhes: 'Recomendado: até 15 crianças por professor (varia por idade).',
          detalhes_en: 'Recommended: up to 15 children per teacher (varies by age).',
          detalhes_es: 'Recomendado: hasta 15 niños por profesor (varía según la edad).'
        },
        {
          id: 'treinamento-seguranca',
          texto: 'Equipe treinada em segurança e prevenção',
          texto_en: 'Staff trained in safety and prevention',
          texto_es: 'Equipo capacitado en seguridad y prevención',
          critico: true,
          detalhes: 'Capacitação regular em prevenção de acidentes.',
          detalhes_en: 'Regular training in accident prevention.',
          detalhes_es: 'Capacitación regular en prevención de accidentes.'
        },
        {
          id: 'treinamento-primeiros-socorros',
          texto: 'Treinamento em primeiros socorros atualizado',
          texto_en: 'Updated first aid training',
          texto_es: 'Entrenamiento en primeros auxilios actualizado',
          critico: true,
          detalhes: 'Reciclagem a cada 2 anos no mínimo.',
          detalhes_en: 'Refresher training at least every 2 years.',
          detalhes_es: 'Reciclaje al menos cada 2 años.'
        },
        {
          id: 'supervisao-recreio',
          texto: 'Supervisão adequada durante recreio',
          texto_en: 'Adequate supervision during recess',
          texto_es: 'Supervisión adecuada durante el recreo',
          critico: true,
          detalhes: 'Adultos atentos em todas as áreas de recreação, inclusive nas idas ao banheiro.',
          detalhes_en: 'Attentive adults in all recreation areas, including trips to the toilet.',
          detalhes_es: 'Adultos atentos en todas las áreas de recreo, también cuando los niños van al baño.'
        },
        {
          id: 'protocolo-bullying',
          texto: 'Protocolo de prevenção e combate ao bullying',
          texto_en: 'Bullying prevention and response protocol',
          texto_es: 'Protocolo de prevención y combate al acoso escolar',
          critico: true,
          detalhes: 'Política clara e ações definidas.',
          detalhes_en: 'Clear policy and defined actions.',
          detalhes_es: 'Política clara y acciones definidas.'
        }
      ]
    },
    {
      id: 'transporte-escolar',
      nome: 'Transporte Escolar / Logística',
      nome_en: 'School Transport / Logistics',
      nome_es: 'Transporte Escolar / Logística',
      icone: 'Bus',
      cor: '#FF8C00',

      itens: [
        {
          id: 'transporte-credenciado',
          texto: 'Veículo e motorista credenciados pelos órgãos oficiais',
          texto_en: 'Vehicle and driver accredited by official agencies',
          texto_es: 'Vehículo y conductor acreditados por agencias oficiales',
          critico: true,
          detalhes: 'Exija a documentação do veículo e a credencial do motorista atualizada.',
          detalhes_en: 'Demand the vehicle documentation and updated driver\'s credential.',
          detalhes_es: 'Exija la documentación del vehículo y la credencial del conductor actualizada.'
        },
        {
          id: 'transporte-cinto',
          texto: 'Cinto de segurança disponível e usado por todas as crianças',
          texto_en: 'Seat belts available and used by all children',
          texto_es: 'Cinturones de seguridad disponibles y usados por todos los niños',
          critico: true,
          detalhes: 'É obrigatório um cinto para cada ocupante e fiscalização ativa do uso.',
          detalhes_en: 'A seat belt for each occupant and active use enforcement is mandatory.',
          detalhes_es: 'Es obligatorio un cinturón para cada ocupante y la fiscalización activa del uso.'
        },
        {
          id: 'transporte-monitor',
          texto: 'Presença de um monitor auxiliar (além do motorista)',
          texto_en: 'Presence of an assistant monitor (besides the driver)',
          texto_es: 'Presencia de un monitor auxiliar (además del conductor)',
          critico: true,
          detalhes: 'Fundamental para ajudar no embarque/desembarque e evitar distrações do condutor.',
          detalhes_en: 'Essential to help with boarding/alighting and prevent driver distractions.',
          detalhes_es: 'Fundamental para ayudar en el embarque/desembarque y evitar distracciones del conductor.'
        },
        {
          id: 'transporte-embarque',
          texto: 'Embarque e desembarque seguros, feitos do lado da calçada e com entrega em mãos',
          texto_en: 'Safe boarding and alighting on the sidewalk side with hand-to-hand delivery',
          texto_es: 'Embarque y desembarque seguros del lado de la acera con entrega en mano',
          critico: true,
          detalhes: 'A criança nunca deve atravessar a rua sozinha ou ficar solta na calçada.',
          detalhes_en: 'The child should never cross the street alone or be left unattended on the sidewalk.',
          detalhes_es: 'El niño nunca debe cruzar la calle solo ni quedar suelto en la acera.'
        }
      ]
    }
  ],

  // Resumo de critérios críticos
  criterios_criticos: 33,
  total_itens: 93,

  // Orientações finais
  orientacoes_finais: `
COMO USAR ESTE CHECKLIST:

1. **Agende uma visita**: Peça para conhecer todas as instalações
2. **Faça perguntas**: Não hesite em questionar sobre segurança
3. **Observe atentamente**: Veja como funcionários e crianças interagem
4. **Priorize itens críticos**: São os mais importantes para segurança
5. **Compare escolas**: Use o mesmo checklist para comparar opções

IMPORTANTE:
- Nenhuma escola será perfeita em todos os itens
- Priorize os itens marcados como "críticos"
- Questione como a escola pretende melhorar pontos fracos
- Reavalie periodicamente a segurança da escola
  `,

  // Perguntas adicionais para fazer
  perguntas_sugeridas: [
    'Com que frequência é feita inspeção dos brinquedos do parquinho?',
    'Qual o protocolo em caso de acidente?',
    'Como é feita a comunicação com os pais em emergências?',
    'Há seguro de acidentes para as crianças?',
    'Quantos funcionários têm treinamento em primeiros socorros?',
    'Com que frequência são realizados simulados de evacuação?',
    'Como a escola lida com crianças com deficiência ou neurodivergentes?',
    'Qual a política de administração de medicamentos?',
    'Como é feito o controle de visitantes?',
    'A escola já teve algum acidente grave? Como foi tratado?'
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const calcularPontuacao = (respostas) => {
  let totalItens = 0;
  let itensMarcados = 0;
  let criticosMarcados = 0;
  let totalCriticos = 0;

  CHECKLIST_ESCOLA_SEGURA.categorias.forEach(categoria => {
    categoria.itens.forEach(item => {
      // Se a resposta for 'na', o item não entra na conta (não penaliza nem beneficia)
      if (respostas[item.id] === 'na') {
        return;
      }

      totalItens++;
      if (item.critico) totalCriticos++;

      // Suporta o formato antigo (booleano true) e o novo S/N/NA (conforme)
      if (respostas[item.id] === true || respostas[item.id] === 'conforme') {
        itensMarcados++;
        if (item.critico) criticosMarcados++;
      }
    });
  });

  return {
    total: totalItens,
    marcados: itensMarcados,
    percentual: Math.round((itensMarcados / totalItens) * 100),
    criticos_total: totalCriticos,
    criticos_marcados: criticosMarcados,
    criticos_percentual: Math.round((criticosMarcados / totalCriticos) * 100)
  };
};

export const getNivelSeguranca = (pontuacao) => {
  const { criticos_percentual } = pontuacao;

  if (criticos_percentual >= 90) {
    return {
      nivel: 'EXCELENTE',
      nivel_en: 'EXCELLENT',
      nivel_es: 'EXCELENTE',
      cor: '#4CAF50',
      icone: 'CheckCircle',
      mensagem: 'A escola atende à maioria dos critérios críticos de segurança!',
      mensagem_en: 'The school meets most critical safety criteria!',
      mensagem_es: '¡La escuela cumple con la mayoría de los criterios críticos de seguridad!'
    };
  } else if (criticos_percentual >= 70) {
    return {
      nivel: 'BOM',
      nivel_en: 'GOOD',
      nivel_es: 'BUENO',
      cor: '#FFD700',
      icone: 'ThumbsUp',
      mensagem: 'A escola atende a maioria dos critérios, mas há pontos a melhorar.',
      mensagem_en: 'The school meets most criteria, but there are areas for improvement.',
      mensagem_es: 'La escuela cumple con la mayoría de los criterios, pero hay puntos a mejorar.'
    };
  } else if (criticos_percentual >= 50) {
    return {
      nivel: 'REGULAR',
      nivel_en: 'FAIR',
      nivel_es: 'REGULAR',
      cor: '#FF9800',
      icone: 'Warning',
      mensagem: 'Atenção! Vários critérios críticos não são atendidos.',
      mensagem_en: 'Warning! Several critical criteria are not met.',
      mensagem_es: '¡Atención! Varios criterios críticos no se cumplen.'
    };
  } else {
    return {
      nivel: 'INSUFICIENTE',
      nivel_en: 'INSUFFICIENT',
      nivel_es: 'INSUFICIENTE',
      cor: '#F44336',
      icone: 'XCircle',
      mensagem: 'ALERTA! A escola não atende critérios básicos de segurança.',
      mensagem_en: 'ALERT! The school does not meet basic safety criteria.',
      mensagem_es: '¡ALERTA! La escuela no cumple con los criterios básicos de seguridad.'
    };
  }
};

export default {
  CHECKLIST_ESCOLA_SEGURA,
  calcularPontuacao,
  getNivelSeguranca
};
