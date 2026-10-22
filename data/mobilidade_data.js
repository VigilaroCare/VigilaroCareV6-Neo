/**
 * mobilidade_data.js — mobilidade segura e dispositivos de retencao infantil.
 *
 * Reescrito em 16/10/2026 (D19):
 *  - A LEI (idades, alturas, multas, idade de garupa, patinetes) saiu daqui e
 *    foi para data/regrasTransitoPorPais.js, resolvida pelo PAIS do usuario via
 *    tokens ({{CHILD_SEAT_LAW}} etc.). Antes a tela mostrava CTB, CONTRAN, CNH,
 *    SAMU 192 e PRF 191 para qualquer pais.
 *  - Boas praticas atualizadas: cadeirinha de costas pelo maior tempo que o
 *    fabricante permitir (AAP 2018; ONU R129 exige de costas ate 15 meses);
 *    teste dos 5 passos para o assento de elevacao; 30 km/h onde ha pedestres
 *    e ciclistas (OMS / Declaracao de Estocolmo, 2020); capacete de bicicleta
 *    "indispensavel", nao "obrigatorio" — a lei nao o exige em muitos paises.
 *  - Traduzido: _en, _es e _ptpt (onde o vocabulario de Portugal muda:
 *    peao, passadeira, telemovel, cadeira auto).
 *
 * As categorias do CONTRAN (MICROMOBILIDADE_ELETRICA.categorias_ctb) so
 * aparecem no Brasil: sao definicao legal brasileira.
 */

// ============================================
// TEXTOS DA TELA (rotulos que antes estavam fixos em portugues)
// ============================================

export const TEXTOS_MOBILIDADE = {
  abas: { drv: 'Carros', ativa: 'Bicicletas', pedestre: 'Pedestre', moto: 'Moto', eletrica: 'Elétricos' },
  abas_en: { drv: 'Cars', ativa: 'Bikes', pedestre: 'Walking', moto: 'Motorcycle', eletrica: 'E-bikes' },
  abas_es: { drv: 'Autos', ativa: 'Bicis', pedestre: 'Peatón', moto: 'Moto', eletrica: 'Eléctricos' },
  abas_ptpt: { drv: 'Carros', ativa: 'Bicicletas', pedestre: 'Peão', moto: 'Mota', eletrica: 'Elétricos' },

  drvTitulo: 'O que é um dispositivo de retenção?',
  drvTitulo_en: 'What is a child restraint?',
  drvTitulo_es: '¿Qué es un sistema de retención infantil?',
  drvTitulo_ptpt: 'O que é um sistema de retenção?',
  drvTexto: 'É o nome técnico do bebê conforto, da cadeirinha e do assento de elevação — os equipamentos que seguram a criança no carro. O cinto do veículo foi feito para adultos e, sozinho, pode ferir uma criança numa batida.',
  drvTexto_en: 'It is the technical name for the infant carrier, the car seat and the booster — the equipment that holds a child in the car. The vehicle seat belt was designed for adults and, on its own, can injure a child in a crash.',
  drvTexto_es: 'Es el nombre técnico del portabebés, la silla infantil y el elevador — los equipos que sujetan al niño en el auto. El cinturón del vehículo fue diseñado para adultos y, por sí solo, puede herir a un niño en un choque.',
  drvTexto_ptpt: 'É o nome técnico do ovo, da cadeira auto e do assento elevatório — os equipamentos que seguram a criança no carro. O cinto do veículo foi feito para adultos e, sozinho, pode ferir uma criança numa colisão.',

  leiTitulo: 'A lei no seu país', leiTitulo_en: 'The law in your country', leiTitulo_es: 'La ley en su país',
  multaRotulo: 'Penalidade', multaRotulo_en: 'Penalty', multaRotulo_es: 'Sanción', multaRotulo_ptpt: 'Sanção',
  reducaoRisco: 'Usado do jeito certo, o dispositivo de retenção reduz em cerca de 71% o risco de morte de bebês e em 54% o de crianças pequenas (NHTSA).',
  reducaoRisco_en: 'Used correctly, a child restraint cuts the risk of death by about 71% for infants and 54% for toddlers (NHTSA).',
  reducaoRisco_es: 'Usado correctamente, el sistema de retención reduce el riesgo de muerte en cerca de un 71% en bebés y un 54% en niños pequeños (NHTSA).',
  reducaoRisco_ptpt: 'Usado da forma certa, o sistema de retenção reduz em cerca de 71% o risco de morte de bebés e em 54% o de crianças pequenas (NHTSA).',

  idadeBotoes: ['0 a 1 ano', '1 a 4 anos', '4 a 10 anos'],
  idadeBotoes_en: ['0 to 1 year', '1 to 4 years', '4 to 10 years'],
  idadeBotoes_es: ['0 a 1 año', '1 a 4 años', '4 a 10 años'],
  faixaDispositivo: '{idade} anos • {peso} kg',
  faixaDispositivo_en: '{idade} years • {peso} kg',
  faixaDispositivo_es: '{idade} años • {peso} kg',
  localRotulo: 'Local', localRotulo_en: 'Where', localRotulo_es: 'Ubicación',

  dicaItens: [
    'Procure {{CHILD_SEAT_LABEL}}',
    'Siga RIGOROSAMENTE o manual do fabricante e o manual do carro',
    'Troque o dispositivo depois de qualquer batida, mesmo sem dano visível',
    'Não use dispositivo de segunda mão sem conhecer o histórico e a validade',
    'Lugar de criança é no banco de trás'
  ],
  dicaItens_en: [
    'Look for {{CHILD_SEAT_LABEL}}',
    'Follow the seat manual and the car manual STRICTLY',
    'Replace the seat after any crash, even with no visible damage',
    'Do not use a second-hand seat unless you know its history and expiry date',
    'Children belong in the back seat'
  ],
  dicaItens_es: [
    'Busque {{CHILD_SEAT_LABEL}}',
    'Siga ESTRICTAMENTE el manual del fabricante y el del auto',
    'Cambie el dispositivo después de cualquier choque, aunque no se vea dañado',
    'No use un dispositivo de segunda mano sin conocer su historial y su vencimiento',
    'El lugar del niño es el asiento trasero'
  ],
  dicaItens_ptpt: [
    'Procure {{CHILD_SEAT_LABEL}}',
    'Siga RIGOROSAMENTE o manual do fabricante e o manual do carro',
    'Substitua a cadeira depois de qualquer colisão, mesmo sem dano visível',
    'Não use cadeira em segunda mão sem conhecer o historial e a validade',
    'Lugar de criança é no banco de trás'
  ],

  idadeMinimaRotulo: 'Idade mínima sugerida: {n} anos',
  idadeMinimaRotulo_en: 'Suggested minimum age: {n}',
  idadeMinimaRotulo_es: 'Edad mínima sugerida: {n} años',

  autonomiaAtiva: 'Em geral, crianças só devem circular desacompanhadas a partir dos {n} anos.',
  autonomiaAtiva_en: 'As a rule, children should only get around unaccompanied from age {n}.',
  autonomiaAtiva_es: 'Por lo general, los niños solo deberían circular sin compañía a partir de los {n} años.',
  autonomiaPedestre: 'Em geral, crianças podem andar sozinhas na rua a partir dos {n} anos — se já dominam as regras de travessia.',
  autonomiaPedestre_en: 'As a rule, children can walk the streets alone from age {n} — once they have mastered the crossing rules.',
  autonomiaPedestre_es: 'Por lo general, los niños pueden andar solos por la calle a partir de los {n} años — si ya dominan las reglas para cruzar.',

  motoIdadeTitulo: 'Criança na garupa', motoIdadeTitulo_en: 'Children as passengers', motoIdadeTitulo_es: 'Niños como pasajeros', motoIdadeTitulo_ptpt: 'Criança como passageira',

  emergenciaItens: ['{{EMERGENCY_MEDICAL}}', 'Bombeiros: {{FIRE_NUMBER}}', 'Polícia: {{POLICE_NUMBER}}'],
  emergenciaItens_en: ['{{EMERGENCY_MEDICAL}}', 'Fire service: {{FIRE_NUMBER}}', 'Police: {{POLICE_NUMBER}}'],
  emergenciaItens_es: ['{{EMERGENCY_MEDICAL}}', 'Bomberos: {{FIRE_NUMBER}}', 'Policía: {{POLICE_NUMBER}}'],
  emergenciaRodoviaria: 'Em rodovia federal: PRF 191',

  limiteRotulo: 'Limite', limiteRotulo_en: 'Limit', limiteRotulo_es: 'Límite',
  regrasLocaisTitulo: 'As regras no seu país', regrasLocaisTitulo_en: 'The rules in your country', regrasLocaisTitulo_es: 'Las reglas en su país',
};

// ============================================
// DISPOSITIVOS DE RETENÇÃO VEICULAR
// ============================================

export const DISPOSITIVOS_RETENCAO = [
  {
    id: 'bebe-conforto',
    nome: 'Bebê Conforto', nome_en: 'Infant Carrier', nome_es: 'Portabebés', nome_ptpt: 'Ovo (cadeira de bebé)',
    icone: 'Baby',
    cor: '#FFB6C1',
    imagemUrl: null,
    idadeMin: 0, idadeMax: 1, pesoMin: 0, pesoMax: 13,

    posicao: 'SEMPRE de costas para o movimento do veículo',
    posicao_en: 'ALWAYS rear-facing',
    posicao_es: 'SIEMPRE a contramarcha',
    posicao_ptpt: 'SEMPRE virado para trás',
    localizacao: 'Banco traseiro, de preferência no meio',
    localizacao_en: 'Back seat, ideally in the middle',
    localizacao_es: 'Asiento trasero, de preferencia en el centro',

    descricao: 'É o primeiro dispositivo do bebê, usado desde a saída da maternidade até cerca de 1 ano ou 13 kg — ou até o limite de peso e altura que o fabricante indicar.',
    descricao_en: 'The baby\'s first restraint, used from the trip home from the hospital until about 1 year or 13 kg — or up to the weight and height limit set by the manufacturer.',
    descricao_es: 'Es el primer dispositivo del bebé, usado desde la salida de la maternidad hasta cerca de 1 año o 13 kg — o hasta el límite de peso y altura que indique el fabricante.',
    descricao_ptpt: 'É o primeiro sistema do bebé, usado desde a saída da maternidade até cerca de 1 ano ou 13 kg — ou até ao limite de peso e altura que o fabricante indicar.',

    comoInstalar: [
      'Instalar de costas para o movimento, no banco traseiro',
      'Usar a base ISOFIX ou o cinto do carro, passando-o pelas guias indicadas',
      'Apertar até que não se mova mais de 2,5 cm para os lados no ponto de fixação',
      'Ajustar o ângulo pelo indicador do fabricante (o bebê não pode ficar com a cabeça caída para a frente)',
      'Conferir se o cinto do carro não está torcido',
      'Nunca no banco da frente com airbag ativo'
    ],
    comoInstalar_en: [
      'Install rear-facing, in the back seat',
      'Use the ISOFIX base or the car seat belt, routed through the marked guides',
      'Tighten until it moves no more than 1 inch (2.5 cm) side to side at the belt path',
      'Set the recline using the manufacturer\'s indicator (the baby\'s head must not flop forward)',
      'Make sure the car belt is not twisted',
      'Never in a front seat with an active airbag'
    ],
    comoInstalar_es: [
      'Instalar a contramarcha, en el asiento trasero',
      'Usar la base ISOFIX o el cinturón del auto, pasándolo por las guías indicadas',
      'Apretar hasta que no se mueva más de 2,5 cm hacia los lados en el punto de anclaje',
      'Ajustar el ángulo con el indicador del fabricante (la cabeza del bebé no puede caer hacia adelante)',
      'Verificar que el cinturón del auto no esté torcido',
      'Nunca en el asiento delantero con airbag activo'
    ],
    comoInstalar_ptpt: [
      'Instalar virado para trás, no banco traseiro',
      'Usar a base ISOFIX ou o cinto do carro, passando-o pelas guias indicadas',
      'Apertar até que não se mova mais de 2,5 cm para os lados no ponto de fixação',
      'Ajustar o ângulo pelo indicador do fabricante (a cabeça do bebé não pode cair para a frente)',
      'Confirmar que o cinto do carro não está torcido',
      'Nunca no banco da frente com airbag ativo'
    ],

    comoUsar: [
      'Tiras na altura dos ombros do bebê ou logo abaixo',
      'Ajuste firme: não deve ser possível beliscar uma dobra da tira na altura do ombro',
      'Presilha do peito (quando houver) na altura das axilas',
      'Tirar casacos e roupas volumosas antes de prender; cobrir o bebê por cima das tiras',
      'Nada entre o bebê e o dispositivo (almofadas e acessórios que não vieram com ele)',
      'Trocar de dispositivo quando a cabeça chegar a menos de 2,5 cm do topo da concha'
    ],
    comoUsar_en: [
      'Harness straps at or just below the baby\'s shoulders',
      'Snug fit: you should not be able to pinch a fold of strap at the shoulder',
      'Chest clip (if fitted) at armpit level',
      'Remove coats and bulky clothing before buckling; cover the baby over the straps',
      'Nothing between the baby and the seat (cushions or add-ons that did not come with it)',
      'Move to the next seat when the head is less than 1 inch from the top of the shell'
    ],
    comoUsar_es: [
      'Arnés a la altura de los hombros del bebé o justo por debajo',
      'Ajuste firme: no debe poder pellizcarse un pliegue del arnés a la altura del hombro',
      'Clip de pecho (si lo hay) a la altura de las axilas',
      'Quitar abrigos y ropa voluminosa antes de abrochar; abrigar al bebé por encima del arnés',
      'Nada entre el bebé y el dispositivo (cojines o accesorios que no vinieron con él)',
      'Cambiar de dispositivo cuando la cabeza quede a menos de 2,5 cm del borde superior'
    ],
    comoUsar_ptpt: [
      'Arnês à altura dos ombros do bebé ou logo abaixo',
      'Ajuste firme: não deve ser possível beliscar uma dobra do arnês à altura do ombro',
      'Clipe de peito (quando houver) à altura das axilas',
      'Tirar casacos e roupa volumosa antes de prender; tapar o bebé por cima do arnês',
      'Nada entre o bebé e a cadeira (almofadas e acessórios que não vieram com ela)',
      'Mudar de cadeira quando a cabeça ficar a menos de 2,5 cm do topo da concha'
    ],

    errosComuns: [
      'Virar de frente para o movimento (ERRADO!)',
      'Tiras frouxas',
      'Ângulo errado, com a cabeça do bebê caindo para a frente',
      'Cinto do carro passado pelo lugar errado',
      'Colocar no banco da frente com airbag ativo'
    ],
    errosComuns_en: [
      'Turning it forward-facing (WRONG!)',
      'Loose harness',
      'Wrong recline, with the baby\'s head falling forward',
      'Car belt routed through the wrong path',
      'Putting it in a front seat with an active airbag'
    ],
    errosComuns_es: [
      'Ponerlo mirando hacia adelante (¡INCORRECTO!)',
      'Arnés flojo',
      'Ángulo equivocado, con la cabeza del bebé cayendo hacia adelante',
      'Cinturón del auto pasado por el lugar equivocado',
      'Colocarlo en el asiento delantero con airbag activo'
    ],
    errosComuns_ptpt: [
      'Virar para a frente (ERRADO!)',
      'Arnês folgado',
      'Ângulo errado, com a cabeça do bebé a cair para a frente',
      'Cinto do carro passado pelo sítio errado',
      'Colocar no banco da frente com airbag ativo'
    ]
  },

  {
    id: 'cadeirinha',
    nome: 'Cadeirinha', nome_en: 'Convertible Car Seat', nome_es: 'Silla Infantil', nome_ptpt: 'Cadeira Auto',
    icone: 'Person',
    cor: '#87CEEB',
    imagemUrl: null,
    idadeMin: 1, idadeMax: 4, pesoMin: 9, pesoMax: 18,

    posicao: 'De costas para o movimento pelo maior tempo que o fabricante permitir; de frente só depois',
    posicao_en: 'Rear-facing for as long as the manufacturer allows; forward-facing only after that',
    posicao_es: 'A contramarcha el mayor tiempo que permita el fabricante; mirando hacia adelante solo después',
    posicao_ptpt: 'Virada para trás pelo maior tempo que o fabricante permitir; para a frente só depois',
    localizacao: 'Banco traseiro (o meio é o lugar mais protegido)',
    localizacao_en: 'Back seat (the middle is the most protected spot)',
    localizacao_es: 'Asiento trasero (el centro es el lugar más protegido)',

    descricao: 'Vem depois do bebê conforto, em geral de 1 a 4 anos. Quanto mais tempo de costas, melhor: nessa posição, numa batida de frente, as costas da cadeirinha seguram a cabeça e o pescoço, que ainda são frágeis. Só vire de frente quando a criança passar do limite de peso ou altura do modo de costas.',
    descricao_en: 'It comes after the infant carrier, usually from 1 to 4 years. The longer rear-facing, the better: in a frontal crash the seat back supports the head and neck, which are still fragile. Only turn it forward when the child exceeds the rear-facing weight or height limit.',
    descricao_es: 'Viene después del portabebés, en general de 1 a 4 años. Cuanto más tiempo a contramarcha, mejor: en un choque frontal, el respaldo de la silla sostiene la cabeza y el cuello, que aún son frágiles. Gírela hacia adelante solo cuando el niño supere el límite de peso o altura a contramarcha.',
    descricao_ptpt: 'Vem depois do ovo, em geral de 1 a 4 anos. Quanto mais tempo virada para trás, melhor: numa colisão frontal, as costas da cadeira seguram a cabeça e o pescoço, que ainda são frágeis. Só a vire para a frente quando a criança passar do limite de peso ou altura do modo virado para trás.',

    comoInstalar: [
      'Manter de costas enquanto a criança estiver dentro do limite do fabricante para essa posição',
      'Instalar no banco traseiro',
      'Usar o ISOFIX (ou LATCH) quando o carro e a cadeirinha tiverem; de frente, prender também a cinta superior (top tether)',
      'Sem ISOFIX, passar o cinto do carro pelas guias indicadas',
      'Apertar até que não se mova mais de 2,5 cm para os lados no ponto de fixação'
    ],
    comoInstalar_en: [
      'Keep it rear-facing while the child is within the manufacturer\'s limit for that position',
      'Install in the back seat',
      'Use ISOFIX (or LATCH) when both car and seat have it; forward-facing, also attach the top tether',
      'Without ISOFIX, route the car belt through the marked guides',
      'Tighten until it moves no more than 1 inch (2.5 cm) side to side at the belt path'
    ],
    comoInstalar_es: [
      'Mantenerla a contramarcha mientras el niño esté dentro del límite del fabricante para esa posición',
      'Instalar en el asiento trasero',
      'Usar ISOFIX (o LATCH) cuando el auto y la silla lo tengan; mirando hacia adelante, sujetar también la correa superior (top tether)',
      'Sin ISOFIX, pasar el cinturón del auto por las guías indicadas',
      'Apretar hasta que no se mueva más de 2,5 cm hacia los lados en el punto de anclaje'
    ],
    comoInstalar_ptpt: [
      'Manter virada para trás enquanto a criança estiver dentro do limite do fabricante para essa posição',
      'Instalar no banco traseiro',
      'Usar o ISOFIX quando o carro e a cadeira o tiverem; virada para a frente, prender também a cinta superior (top tether)',
      'Sem ISOFIX, passar o cinto do carro pelas guias indicadas',
      'Apertar até que não se mova mais de 2,5 cm para os lados no ponto de fixação'
    ],

    comoUsar: [
      'De costas: tiras na altura dos ombros ou logo abaixo; de frente: na altura dos ombros ou logo acima',
      'Ajuste firme: não deve ser possível beliscar uma dobra da tira no ombro',
      'Presilha do peito (quando houver) na altura das axilas',
      'Tirar casacos grossos antes de prender',
      'Ajustar a altura das tiras conforme a criança cresce'
    ],
    comoUsar_en: [
      'Rear-facing: straps at or just below the shoulders; forward-facing: at or just above',
      'Snug fit: you should not be able to pinch a fold of strap at the shoulder',
      'Chest clip (if fitted) at armpit level',
      'Remove thick coats before buckling',
      'Adjust the strap height as the child grows'
    ],
    comoUsar_es: [
      'A contramarcha: arnés a la altura de los hombros o justo por debajo; hacia adelante: a la altura o justo por encima',
      'Ajuste firme: no debe poder pellizcarse un pliegue del arnés en el hombro',
      'Clip de pecho (si lo hay) a la altura de las axilas',
      'Quitar abrigos gruesos antes de abrochar',
      'Ajustar la altura del arnés a medida que el niño crece'
    ],
    comoUsar_ptpt: [
      'Virada para trás: arnês à altura dos ombros ou logo abaixo; para a frente: à altura dos ombros ou logo acima',
      'Ajuste firme: não deve ser possível beliscar uma dobra do arnês no ombro',
      'Clipe de peito (quando houver) à altura das axilas',
      'Tirar casacos grossos antes de prender',
      'Ajustar a altura do arnês à medida que a criança cresce'
    ],

    errosComuns: [
      'Virar de frente cedo demais',
      'Tiras frouxas ou na altura errada',
      'Cinto do carro passado pelo lugar errado',
      'Usar além do limite de peso ou altura',
      'Instalar no banco da frente'
    ],
    errosComuns_en: [
      'Turning it forward-facing too early',
      'Loose straps or straps at the wrong height',
      'Car belt routed through the wrong path',
      'Using it beyond the weight or height limit',
      'Installing it in the front seat'
    ],
    errosComuns_es: [
      'Girarla hacia adelante demasiado pronto',
      'Arnés flojo o a la altura equivocada',
      'Cinturón del auto pasado por el lugar equivocado',
      'Usarla por encima del límite de peso o altura',
      'Instalarla en el asiento delantero'
    ],
    errosComuns_ptpt: [
      'Virar para a frente cedo demais',
      'Arnês folgado ou à altura errada',
      'Cinto do carro passado pelo sítio errado',
      'Usar além do limite de peso ou altura',
      'Instalar no banco da frente'
    ]
  },

  {
    id: 'assento-elevacao',
    nome: 'Assento de Elevação (Booster)', nome_en: 'Booster Seat', nome_es: 'Elevador (Booster)', nome_ptpt: 'Assento Elevatório (Booster)',
    icone: 'Person',
    cor: '#9370DB',
    imagemUrl: null,
    idadeMin: 4, idadeMax: 10, pesoMin: 15, pesoMax: 36,

    posicao: 'Criança sentada no assento, presa pelo cinto de três pontos do carro',
    posicao_en: 'Child sitting on the booster, held by the car\'s three-point belt',
    posicao_es: 'Niño sentado en el elevador, sujeto con el cinturón de tres puntos del auto',
    localizacao: 'Banco traseiro',
    localizacao_en: 'Back seat',
    localizacao_es: 'Asiento trasero',

    descricao: 'Eleva a criança para que o cinto do carro passe no lugar certo: no meio do ombro e sobre os ossos do quadril. Prefira o modelo com encosto, que guia o cinto e protege a cabeça em batidas laterais. Use até o cinto servir sozinho — em geral perto de 1,45 m.',
    descricao_en: 'It raises the child so the car belt sits in the right place: across the middle of the shoulder and low on the hip bones. Prefer a high-back model, which guides the belt and protects the head in side impacts. Use it until the belt fits on its own — usually around 1.45 m (4\'9").',
    descricao_es: 'Eleva al niño para que el cinturón del auto pase por el lugar correcto: por el centro del hombro y sobre los huesos de la cadera. Prefiera el modelo con respaldo, que guía el cinturón y protege la cabeza en choques laterales. Úselo hasta que el cinturón ajuste por sí solo — en general cerca de 1,45 m.',
    descricao_ptpt: 'Eleva a criança para que o cinto do carro passe no sítio certo: a meio do ombro e sobre os ossos da anca. Prefira o modelo com encosto, que guia o cinto e protege a cabeça em colisões laterais. Use até o cinto servir sozinho — em geral perto de 1,45 m.',

    comoInstalar: [
      'Posicionar no banco traseiro, apoiado por inteiro no assento do carro',
      'Usar sempre o cinto de três pontos (nunca só o abdominal)',
      'Faixa diagonal pelo MEIO do ombro e do peito, longe do pescoço',
      'Faixa abdominal BAIXA, sobre os ossos do quadril (nunca sobre a barriga)',
      'Se o assento tiver ISOFIX, prender também, para ele não voar quando estiver vazio'
    ],
    comoInstalar_en: [
      'Place it in the back seat, fully supported by the car seat',
      'Always use a three-point belt (never a lap-only belt)',
      'Shoulder belt across the MIDDLE of the shoulder and chest, away from the neck',
      'Lap belt LOW, across the hip bones (never over the belly)',
      'If the booster has ISOFIX, attach it too, so it does not fly around when empty'
    ],
    comoInstalar_es: [
      'Colocarlo en el asiento trasero, apoyado por completo en el asiento del auto',
      'Usar siempre el cinturón de tres puntos (nunca solo el abdominal)',
      'Banda diagonal por el CENTRO del hombro y del pecho, lejos del cuello',
      'Banda abdominal BAJA, sobre los huesos de la cadera (nunca sobre la barriga)',
      'Si el elevador tiene ISOFIX, sujetarlo también, para que no salga despedido cuando esté vacío'
    ],
    comoInstalar_ptpt: [
      'Colocar no banco traseiro, apoiado por inteiro no assento do carro',
      'Usar sempre o cinto de três pontos (nunca só o abdominal)',
      'Faixa diagonal pelo MEIO do ombro e do peito, longe do pescoço',
      'Faixa abdominal BAIXA, sobre os ossos da anca (nunca sobre a barriga)',
      'Se o assento tiver ISOFIX, prender também, para não ser projetado quando estiver vazio'
    ],

    comoUsar: [
      'Costas totalmente encostadas no banco',
      'Joelhos dobrando na borda do assento',
      'Cinto nunca no pescoço, nunca atrás das costas ou debaixo do braço',
      'Conferir o cinto a cada viagem',
      'Teste para largar o assento: costas encostadas, joelhos dobrando na borda, faixa no meio do ombro, faixa baixa no quadril, e a criança consegue ficar assim a viagem inteira'
    ],
    comoUsar_en: [
      'Back fully against the seat',
      'Knees bending at the edge of the seat',
      'Belt never on the neck, never behind the back or under the arm',
      'Check the belt on every trip',
      'Test before dropping the booster: back against the seat, knees bending at the edge, belt across the middle of the shoulder, lap belt low on the hips, and the child can sit like that for the whole trip'
    ],
    comoUsar_es: [
      'Espalda totalmente apoyada en el respaldo',
      'Rodillas doblándose en el borde del asiento',
      'Cinturón nunca en el cuello, nunca detrás de la espalda ni debajo del brazo',
      'Revisar el cinturón en cada viaje',
      'Prueba para dejar el elevador: espalda apoyada, rodillas doblándose en el borde, banda en el centro del hombro, banda baja en la cadera, y el niño puede ir así todo el viaje'
    ],
    comoUsar_ptpt: [
      'Costas totalmente encostadas ao banco',
      'Joelhos a dobrar na borda do assento',
      'Cinto nunca no pescoço, nunca atrás das costas ou debaixo do braço',
      'Confirmar o cinto em cada viagem',
      'Teste para largar o assento: costas encostadas, joelhos a dobrar na borda, faixa a meio do ombro, faixa baixa na anca, e a criança consegue ficar assim a viagem inteira'
    ],

    errosComuns: [
      'Largar o assento antes de o cinto servir sozinho',
      'Cinto passando pelo pescoço',
      'Cinto sobre a barriga em vez do quadril',
      'Faixa diagonal atrás das costas ou debaixo do braço',
      'Usar no banco da frente'
    ],
    errosComuns_en: [
      'Dropping the booster before the belt fits on its own',
      'Belt across the neck',
      'Belt over the belly instead of the hips',
      'Shoulder belt behind the back or under the arm',
      'Using it in the front seat'
    ],
    errosComuns_es: [
      'Dejar el elevador antes de que el cinturón ajuste por sí solo',
      'Cinturón por el cuello',
      'Cinturón sobre la barriga en lugar de la cadera',
      'Banda diagonal detrás de la espalda o debajo del brazo',
      'Usarlo en el asiento delantero'
    ],
    errosComuns_ptpt: [
      'Largar o assento antes de o cinto servir sozinho',
      'Cinto a passar pelo pescoço',
      'Cinto sobre a barriga em vez da anca',
      'Faixa diagonal atrás das costas ou debaixo do braço',
      'Usar no banco da frente'
    ]
  }
];

// ============================================
// MOBILIDADE ATIVA
// ============================================

export const MOBILIDADE_ATIVA = {
  definicao: 'Mobilidade ativa é o deslocamento só com a força do corpo: a pé, de bicicleta, skate, patinete ou patins.',
  definicao_en: 'Active mobility means getting around using only your own body: walking, cycling, skateboarding, kick scooters or skates.',
  definicao_es: 'La movilidad activa es desplazarse solo con la fuerza del cuerpo: a pie, en bicicleta, monopatín, patinete o patines.',
  definicao_ptpt: 'Mobilidade ativa é a deslocação só com a força do corpo: a pé, de bicicleta, skate, trotinete ou patins.',

  beneficios: [
    'Desenvolvimento cognitivo e social',
    'Atividade física regular',
    'Melhora da concentração',
    'Relação consciente com o espaço público',
    'Independência e autonomia',
    'Menos poluição'
  ],
  beneficios_en: [
    'Cognitive and social development',
    'Regular physical activity',
    'Better concentration',
    'A conscious relationship with public space',
    'Independence and autonomy',
    'Less pollution'
  ],
  beneficios_es: [
    'Desarrollo cognitivo y social',
    'Actividad física regular',
    'Mejor concentración',
    'Relación consciente con el espacio público',
    'Independencia y autonomía',
    'Menos contaminación'
  ],

  idadeAutonomia: {
    idade: 10,
    habilidadesNecessarias: [
      'Percepção de risco (distância, velocidade, espaço)',
      'Visão periférica completa',
      'Capacidade de saber de onde vem um som',
      'Julgamento do tempo seguro para atravessar'
    ],
    habilidadesNecessarias_en: [
      'Risk perception (distance, speed, space)',
      'Full peripheral vision',
      'Telling where a sound is coming from',
      'Judging when it is safe to cross'
    ],
    habilidadesNecessarias_es: [
      'Percepción del riesgo (distancia, velocidad, espacio)',
      'Visión periférica completa',
      'Capacidad de saber de dónde viene un sonido',
      'Juicio del momento seguro para cruzar'
    ]
  },

  tipos: [
    {
      tipo: 'Bicicleta', tipo_en: 'Bicycle', tipo_es: 'Bicicleta',
      icone: 'PersonSimpleBike',
      idadeMinima: 4,
      equipamentos: [
        'Capacete certificado (indispensável, mesmo onde a lei não exige)',
        'Joelheiras e cotoveleiras para quem está aprendendo',
        'Campainha',
        'Luz branca na frente, luz vermelha atrás e refletores',
        'Calçado fechado (nunca chinelo)'
      ],
      equipamentos_en: [
        'Certified helmet (essential, even where the law does not require it)',
        'Knee and elbow pads while learning',
        'Bell',
        'White front light, red rear light and reflectors',
        'Closed shoes (never flip-flops)'
      ],
      equipamentos_es: [
        'Casco certificado (indispensable, aunque la ley no lo exija)',
        'Rodilleras y coderas mientras aprende',
        'Timbre',
        'Luz blanca delante, luz roja detrás y reflectores',
        'Calzado cerrado (nunca chanclas)'
      ],
      equipamentos_ptpt: [
        'Capacete certificado (indispensável, mesmo onde a lei não obriga)',
        'Joelheiras e cotoveleiras para quem está a aprender',
        'Campainha',
        'Luz branca à frente, luz vermelha atrás e refletores',
        'Calçado fechado (nunca chinelos)'
      ],
      locaisApropriados: [
        'Ciclovias e ciclofaixas',
        'Parques e praças',
        'Ruas calmas, com pouco trânsito e limite de 30 km/h',
        'Áreas próprias para bicicleta'
      ],
      locaisApropriados_en: [
        'Cycle paths and bike lanes',
        'Parks and squares',
        'Quiet streets with little traffic and a 30 km/h (20 mph) limit',
        'Areas designed for bikes'
      ],
      locaisApropriados_es: [
        'Ciclovías y carriles bici',
        'Parques y plazas',
        'Calles tranquilas, con poco tráfico y límite de 30 km/h',
        'Zonas para bicicletas'
      ],
      locaisApropriados_ptpt: [
        'Ciclovias',
        'Parques e praças',
        'Ruas calmas, com pouco trânsito e limite de 30 km/h',
        'Zonas próprias para bicicleta'
      ],
      locaisEvitar: [
        'Calçadas cheias de pedestres (o pedestre tem prioridade)',
        'Vias de trânsito rápido e rodovias',
        'Ruas sem iluminação à noite'
      ],
      locaisEvitar_en: [
        'Crowded sidewalks (pedestrians have priority)',
        'Fast roads and highways',
        'Unlit streets at night'
      ],
      locaisEvitar_es: [
        'Aceras llenas de peatones (el peatón tiene prioridad)',
        'Vías rápidas y carreteras',
        'Calles sin iluminación de noche'
      ],
      locaisEvitar_ptpt: [
        'Passeios cheios de peões (o peão tem prioridade)',
        'Vias rápidas e estradas nacionais',
        'Ruas sem iluminação à noite'
      ],
      regrasSeguranca: [
        'Sempre de capacete, bem ajustado',
        'Respeitar semáforos e sinalização',
        'Sinalizar as conversões com o braço',
        'Andar no mesmo sentido dos carros',
        'Sem fone de ouvido e sem celular',
        'Conferir os freios antes de sair',
        'Roupa clara ou refletiva à noite',
        'Reduzir nos cruzamentos'
      ],
      regrasSeguranca_en: [
        'Always wear a well-fitted helmet',
        'Obey traffic lights and signs',
        'Signal turns with your arm',
        'Ride in the same direction as traffic',
        'No headphones and no phone',
        'Check the brakes before setting off',
        'Light or reflective clothing at night',
        'Slow down at junctions'
      ],
      regrasSeguranca_es: [
        'Siempre con casco, bien ajustado',
        'Respetar semáforos y señales',
        'Señalizar los giros con el brazo',
        'Circular en el mismo sentido que los autos',
        'Sin auriculares y sin celular',
        'Revisar los frenos antes de salir',
        'Ropa clara o reflectante de noche',
        'Reducir en los cruces'
      ],
      regrasSeguranca_ptpt: [
        'Sempre de capacete, bem ajustado',
        'Respeitar semáforos e sinalização',
        'Sinalizar as mudanças de direção com o braço',
        'Circular no mesmo sentido dos carros',
        'Sem auriculares e sem telemóvel',
        'Confirmar os travões antes de sair',
        'Roupa clara ou refletora à noite',
        'Abrandar nos cruzamentos'
      ],
      manutencao: [
        'Freios',
        'Pressão dos pneus',
        'Corrente lubrificada',
        'Altura do selim',
        'Parafusos e peças apertados'
      ],
      manutencao_en: ['Brakes', 'Tyre pressure', 'Lubricated chain', 'Saddle height', 'Bolts and parts tightened'],
      manutencao_es: ['Frenos', 'Presión de los neumáticos', 'Cadena lubricada', 'Altura del sillín', 'Tornillos y piezas apretados'],
      manutencao_ptpt: ['Travões', 'Pressão dos pneus', 'Corrente lubrificada', 'Altura do selim', 'Parafusos e peças apertados']
    },
    {
      tipo: 'Skate', tipo_en: 'Skateboard', tipo_es: 'Monopatín',
      icone: 'PersonSimpleRun',
      idadeMinima: 6,
      equipamentos: [
        'Capacete certificado (indispensável)',
        'Joelheiras, cotoveleiras e munhequeiras',
        'Calçado fechado e antiderrapante'
      ],
      equipamentos_en: ['Certified helmet (essential)', 'Knee, elbow and wrist guards', 'Closed, non-slip shoes'],
      equipamentos_es: ['Casco certificado (indispensable)', 'Rodilleras, coderas y muñequeras', 'Calzado cerrado y antideslizante'],
      locaisApropriados: ['Pistas de skate', 'Áreas planas e livres', 'Parques onde é permitido'],
      locaisApropriados_en: ['Skateparks', 'Flat, open areas', 'Parks where it is allowed'],
      locaisApropriados_es: ['Pistas de skate', 'Zonas planas y despejadas', 'Parques donde esté permitido'],
      regrasSeguranca: [
        'Usar todos os equipamentos de proteção',
        'Nunca na rua com trânsito',
        'Longe de carros e pedestres',
        'Manobras novas só com orientação',
        'Conferir rodas e eixos antes de usar'
      ],
      regrasSeguranca_en: ['Wear all protective gear', 'Never on roads with traffic', 'Keep away from cars and pedestrians', 'Learn new tricks only with guidance', 'Check wheels and trucks before use'],
      regrasSeguranca_es: ['Usar todo el equipo de protección', 'Nunca en calles con tráfico', 'Lejos de autos y peatones', 'Trucos nuevos solo con orientación', 'Revisar ruedas y ejes antes de usarlo'],
      regrasSeguranca_ptpt: ['Usar todo o equipamento de proteção', 'Nunca na estrada com trânsito', 'Longe de carros e peões', 'Manobras novas só com orientação', 'Confirmar rodas e eixos antes de usar']
    },
    {
      tipo: 'Patinete', tipo_en: 'Kick Scooter', tipo_es: 'Patinete', tipo_ptpt: 'Trotinete',
      icone: 'Scooter',
      idadeMinima: 5,
      equipamentos: ['Capacete certificado', 'Joelheiras e cotoveleiras', 'Calçado fechado'],
      equipamentos_en: ['Certified helmet', 'Knee and elbow pads', 'Closed shoes'],
      equipamentos_es: ['Casco certificado', 'Rodilleras y coderas', 'Calzado cerrado'],
      locaisApropriados: ['Parques', 'Ciclovias', 'Calçadas largas, devagar e dando prioridade ao pedestre'],
      locaisApropriados_en: ['Parks', 'Cycle paths', 'Wide sidewalks, slowly and giving way to pedestrians'],
      locaisApropriados_es: ['Parques', 'Ciclovías', 'Aceras anchas, despacio y dando prioridad al peatón'],
      locaisApropriados_ptpt: ['Parques', 'Ciclovias', 'Passeios largos, devagar e dando prioridade ao peão'],
      regrasSeguranca: ['Usar os equipamentos de proteção', 'Dar sempre prioridade ao pedestre', 'Nunca em vias movimentadas', 'Conferir o freio', 'Não andar à noite sem luz'],
      regrasSeguranca_en: ['Wear protective gear', 'Always give way to pedestrians', 'Never on busy roads', 'Check the brake', 'Do not ride at night without lights'],
      regrasSeguranca_es: ['Usar el equipo de protección', 'Dar siempre prioridad al peatón', 'Nunca en vías con mucho tráfico', 'Revisar el freno', 'No circular de noche sin luz'],
      regrasSeguranca_ptpt: ['Usar o equipamento de proteção', 'Dar sempre prioridade ao peão', 'Nunca em vias movimentadas', 'Confirmar o travão', 'Não andar à noite sem luz']
    },
    {
      tipo: 'Patins', tipo_en: 'Skates', tipo_es: 'Patines',
      icone: 'PersonSimpleRun',
      idadeMinima: 5,
      equipamentos: ['Capacete', 'Joelheiras, cotoveleiras e munhequeiras', 'Patins com freio'],
      equipamentos_en: ['Helmet', 'Knee, elbow and wrist guards', 'Skates with a brake'],
      equipamentos_es: ['Casco', 'Rodilleras, coderas y muñequeras', 'Patines con freno'],
      equipamentos_ptpt: ['Capacete', 'Joelheiras, cotoveleiras e munhequeiras', 'Patins com travão'],
      locaisApropriados: ['Pistas de patinação', 'Áreas planas e lisas', 'Parques com piso adequado'],
      locaisApropriados_en: ['Skating rinks and tracks', 'Flat, smooth areas', 'Parks with suitable surfaces'],
      locaisApropriados_es: ['Pistas de patinaje', 'Zonas planas y lisas', 'Parques con suelo adecuado'],
      regrasSeguranca: ['Usar TODOS os equipamentos de proteção', 'Aprender a frear antes de ganhar velocidade', 'Praticar em áreas seguras', 'Longe do trânsito'],
      regrasSeguranca_en: ['Wear ALL protective gear', 'Learn to stop before picking up speed', 'Practise in safe areas', 'Away from traffic'],
      regrasSeguranca_es: ['Usar TODO el equipo de protección', 'Aprender a frenar antes de ganar velocidad', 'Practicar en zonas seguras', 'Lejos del tráfico'],
      regrasSeguranca_ptpt: ['Usar TODO o equipamento de proteção', 'Aprender a travar antes de ganhar velocidade', 'Praticar em zonas seguras', 'Longe do trânsito']
    }
  ]
};

// ============================================
// SEGURANÇA COMO PEDESTRE
// ============================================

export const SEGURANCA_PEDESTRE = {
  idadeAutonomia: 10,

  regrasGerais: [
    'Atravessar SEMPRE na faixa de pedestres ou no semáforo',
    'Olhar para os DOIS lados, e de novo, antes de atravessar',
    'Fazer contato visual com o motorista antes de pisar na rua',
    'Atravessar caminhando, sem correr',
    'Nunca atravessar entre carros estacionados',
    'Sem celular na travessia',
    'Andar pela calçada; sem calçada, andar de frente para os carros'
  ],
  regrasGerais_en: [
    'ALWAYS cross at a crosswalk or traffic light',
    'Look BOTH ways, and again, before crossing',
    'Make eye contact with the driver before stepping into the road',
    'Walk across, do not run',
    'Never cross between parked cars',
    'No phone while crossing',
    'Use the sidewalk; where there is none, walk facing oncoming traffic'
  ],
  regrasGerais_es: [
    'Cruzar SIEMPRE por el paso de peatones o en el semáforo',
    'Mirar a AMBOS lados, y otra vez, antes de cruzar',
    'Buscar el contacto visual con el conductor antes de bajar a la calzada',
    'Cruzar caminando, sin correr',
    'Nunca cruzar entre autos estacionados',
    'Sin celular al cruzar',
    'Ir por la acera; si no hay, caminar de frente a los autos'
  ],
  regrasGerais_ptpt: [
    'Atravessar SEMPRE na passadeira ou no semáforo',
    'Olhar para os DOIS lados, e outra vez, antes de atravessar',
    'Fazer contacto visual com o condutor antes de pisar a estrada',
    'Atravessar a andar, sem correr',
    'Nunca atravessar entre carros estacionados',
    'Sem telemóvel na travessia',
    'Andar pelo passeio; sem passeio, andar de frente para os carros'
  ],

  sinalizacaoVial: [
    { sinal: 'Boneco verde', acao: 'Pode atravessar — mas olhe para os dois lados antes' },
    { sinal: 'Boneco vermelho', acao: 'NÃO atravesse — aguarde' },
    { sinal: 'Boneco vermelho piscando', acao: 'Não comece a atravessar; quem já está na faixa termina a travessia' },
    { sinal: 'Faixa de pedestres sem semáforo', acao: 'O pedestre tem prioridade, mas só atravesse depois que os carros pararem' }
  ],
  sinalizacaoVial_en: [
    { sinal: 'Green walking figure', acao: 'You may cross — but look both ways first' },
    { sinal: 'Red standing figure', acao: 'DO NOT cross — wait' },
    { sinal: 'Flashing signal', acao: 'Do not start crossing; anyone already on the crossing finishes' },
    { sinal: 'Crosswalk without lights', acao: 'Pedestrians have priority, but only cross once the cars have stopped' }
  ],
  sinalizacaoVial_es: [
    { sinal: 'Muñeco verde', acao: 'Puede cruzar — pero mire a ambos lados antes' },
    { sinal: 'Muñeco rojo', acao: 'NO cruce — espere' },
    { sinal: 'Muñeco intermitente', acao: 'No empiece a cruzar; quien ya está en el paso termina de cruzar' },
    { sinal: 'Paso de peatones sin semáforo', acao: 'El peatón tiene prioridad, pero cruce solo cuando los autos se hayan detenido' }
  ],
  sinalizacaoVial_ptpt: [
    { sinal: 'Boneco verde', acao: 'Pode atravessar — mas olhe para os dois lados antes' },
    { sinal: 'Boneco vermelho', acao: 'NÃO atravesse — aguarde' },
    { sinal: 'Boneco a piscar', acao: 'Não comece a atravessar; quem já está na passadeira termina a travessia' },
    { sinal: 'Passadeira sem semáforo', acao: 'O peão tem prioridade, mas só atravesse depois de os carros pararem' }
  ],

  fatoresRisco: [
    'Muito trânsito',
    'Velocidade alta: a OMS recomenda 30 km/h onde pedestres e ciclistas dividem a rua com carros, e no máximo 50 km/h nas demais vias urbanas',
    'Pouca sinalização (sem faixa nem semáforo)',
    'Calçadas ruins ou inexistentes',
    'Ruas escuras',
    'Lugares com muito consumo de álcool',
    'Horários de pico',
    'Chuva e neblina'
  ],
  fatoresRisco_en: [
    'Heavy traffic',
    'High speeds: the WHO recommends 30 km/h (20 mph) where people walk and cycle alongside cars, and no more than 50 km/h on other urban roads',
    'Little signage (no crosswalk or lights)',
    'Poor or missing sidewalks',
    'Dark streets',
    'Places with heavy drinking',
    'Rush hours',
    'Rain and fog'
  ],
  fatoresRisco_es: [
    'Mucho tráfico',
    'Velocidad alta: la OMS recomienda 30 km/h donde peatones y ciclistas comparten la calle con autos, y como máximo 50 km/h en las demás vías urbanas',
    'Poca señalización (sin paso de peatones ni semáforo)',
    'Aceras en mal estado o inexistentes',
    'Calles oscuras',
    'Lugares con mucho consumo de alcohol',
    'Horas pico',
    'Lluvia y niebla'
  ],
  fatoresRisco_ptpt: [
    'Muito trânsito',
    'Velocidade alta: a OMS recomenda 30 km/h onde peões e ciclistas partilham a rua com carros, e no máximo 50 km/h nas restantes vias urbanas',
    'Pouca sinalização (sem passadeira nem semáforo)',
    'Passeios maus ou inexistentes',
    'Ruas escuras',
    'Locais com muito consumo de álcool',
    'Horas de ponta',
    'Chuva e nevoeiro'
  ],

  dicas_seguranca_noite: [
    'Roupa clara ou com material refletivo',
    'Lanterna ou luz no celular',
    'Ruas bem iluminadas',
    'Evitar atalhos escuros ou isolados',
    'Andar em grupo quando possível',
    'Avisar alguém do trajeto e do horário'
  ],
  dicas_seguranca_noite_en: [
    'Light or reflective clothing',
    'A torch or your phone light',
    'Well-lit streets',
    'Avoid dark or isolated shortcuts',
    'Walk in a group when possible',
    'Tell someone your route and timing'
  ],
  dicas_seguranca_noite_es: [
    'Ropa clara o con material reflectante',
    'Linterna o la luz del celular',
    'Calles bien iluminadas',
    'Evitar atajos oscuros o aislados',
    'Caminar en grupo cuando sea posible',
    'Avisar a alguien del trayecto y del horario'
  ],
  dicas_seguranca_noite_ptpt: [
    'Roupa clara ou com material refletor',
    'Lanterna ou a luz do telemóvel',
    'Ruas bem iluminadas',
    'Evitar atalhos escuros ou isolados',
    'Andar em grupo quando possível',
    'Avisar alguém do trajeto e do horário'
  ],

  criancas_especificas: [
    'Até cerca de 10 anos, a criança não anda sozinha na rua',
    'De mão dada com um adulto, do lado de dentro da calçada',
    'Ensinar as regras de trânsito desde cedo, pelo exemplo',
    'Treinar a travessia em lugares calmos',
    'Explicar o perigo de correr para a rua atrás de bola ou bicho',
    'Nada de brincar perto da rua'
  ],
  criancas_especificas_en: [
    'Until about age 10, children do not walk the streets alone',
    'Holding an adult\'s hand, on the side away from the road',
    'Teach road rules early, by example',
    'Practise crossing in quiet places',
    'Explain the danger of running into the road after a ball or a pet',
    'No playing near the road'
  ],
  criancas_especificas_es: [
    'Hasta cerca de los 10 años, el niño no anda solo por la calle',
    'De la mano de un adulto, del lado de adentro de la acera',
    'Enseñar las reglas de tránsito desde pequeño, con el ejemplo',
    'Practicar el cruce en lugares tranquilos',
    'Explicar el peligro de correr a la calle detrás de una pelota o un animal',
    'Nada de jugar cerca de la calle'
  ],
  criancas_especificas_ptpt: [
    'Até cerca dos 10 anos, a criança não anda sozinha na rua',
    'De mão dada com um adulto, do lado de dentro do passeio',
    'Ensinar as regras de trânsito desde cedo, pelo exemplo',
    'Treinar a travessia em locais calmos',
    'Explicar o perigo de correr para a estrada atrás de uma bola ou de um animal',
    'Nada de brincar perto da estrada'
  ]
};

// ============================================
// MOTOCICLETAS
// ============================================

export const SEGURANCA_MOTO = {
  equipamentos_obrigatorios: [
    {
      item: 'Capacete', item_en: 'Helmet', item_es: 'Casco',
      requisitos: [
        'Com {{CERT_SEAL}}',
        'Do tamanho exato da cabeça — nunca um capacete de adulto em criança',
        'Viseira sem trincas ou riscos',
        'Fivela afivelada e funcionando',
        'Trocar depois de qualquer queda'
      ],
      requisitos_en: [
        'With {{CERT_SEAL}}',
        'The exact size of the head — never an adult helmet on a child',
        'Visor free of cracks and scratches',
        'Strap buckled and working',
        'Replace after any fall'
      ],
      requisitos_es: [
        'Con {{CERT_SEAL}}',
        'De la talla exacta de la cabeza — nunca un casco de adulto en un niño',
        'Visera sin grietas ni rayones',
        'Hebilla abrochada y funcionando',
        'Cambiarlo después de cualquier caída'
      ]
    },
    {
      item: 'Vestuário', item_en: 'Clothing', item_es: 'Ropa',
      recomendacoes: [
        'Jaqueta com proteções (cotovelos, ombros, costas)',
        'Calça resistente ou própria para moto',
        'Luvas',
        'Botas ou calçado fechado (NUNCA chinelo)',
        'Cores vivas ou refletivas'
      ],
      recomendacoes_en: [
        'Jacket with armour (elbows, shoulders, back)',
        'Sturdy or motorcycle trousers',
        'Gloves',
        'Boots or closed shoes (NEVER flip-flops)',
        'Bright or reflective colours'
      ],
      recomendacoes_es: [
        'Chaqueta con protecciones (codos, hombros, espalda)',
        'Pantalón resistente o específico para moto',
        'Guantes',
        'Botas o calzado cerrado (NUNCA chanclas)',
        'Colores vivos o reflectantes'
      ],
      recomendacoes_ptpt: [
        'Casaco com proteções (cotovelos, ombros, costas)',
        'Calças resistentes ou próprias para mota',
        'Luvas',
        'Botas ou calçado fechado (NUNCA chinelos)',
        'Cores vivas ou refletoras'
      ]
    }
  ],

  regras_passageiro: [
    'O passageiro precisa alcançar as pedaleiras com firmeza. Se as pernas não alcançam, não pode ir — qualquer que seja a idade',
    'Capacete do tamanho exato da cabeça da criança',
    'Segurar nas alças laterais ou na cintura de quem pilota',
    'Pés sempre nas pedaleiras, longe do escapamento',
    'Inclinar junto com a moto nas curvas',
    'Nada de movimentos bruscos; descer só com a moto parada'
  ],
  regras_passageiro_en: [
    'The passenger must reach the footrests firmly. If their legs do not reach, they cannot ride — whatever their age',
    'A helmet that fits the child\'s head exactly',
    'Hold the side grab handles or the rider\'s waist',
    'Feet always on the footrests, away from the exhaust',
    'Lean with the bike in bends',
    'No sudden movements; get off only when the bike has stopped'
  ],
  regras_passageiro_es: [
    'El pasajero debe alcanzar los reposapiés con firmeza. Si las piernas no llegan, no puede ir — sea cual sea su edad',
    'Casco de la talla exacta de la cabeza del niño',
    'Sujetarse a las asas laterales o a la cintura de quien conduce',
    'Pies siempre en los reposapiés, lejos del escape',
    'Inclinarse con la moto en las curvas',
    'Nada de movimientos bruscos; bajar solo con la moto detenida'
  ],
  regras_passageiro_ptpt: [
    'O passageiro precisa de alcançar os poisa-pés com firmeza. Se as pernas não chegam, não pode ir — qualquer que seja a idade',
    'Capacete do tamanho exato da cabeça da criança',
    'Segurar nas pegas laterais ou na cintura de quem conduz',
    'Pés sempre nos poisa-pés, longe do escape',
    'Inclinar com a mota nas curvas',
    'Nada de movimentos bruscos; descer só com a mota parada'
  ],

  regras_piloto: [
    'Habilitação válida para moto',
    'Conferir freios, pneus e luzes antes de sair',
    'Respeitar o limite de velocidade',
    'Manter distância do veículo da frente',
    'Pilotar na defensiva: a moto é pouco vista',
    'Evitar andar entre os carros',
    'Nunca emprestar a moto para quem não é habilitado',
    'Manutenção preventiva em dia',
    'Sem celular ao pilotar',
    'Nunca pilotar com sono, depois de beber ou sob efeito de remédio que dá sono'
  ],
  regras_piloto_en: [
    'A valid motorcycle licence',
    'Check brakes, tyres and lights before setting off',
    'Respect the speed limit',
    'Keep a safe distance from the vehicle ahead',
    'Ride defensively: motorcycles are hard to see',
    'Avoid filtering between cars',
    'Never lend the bike to an unlicensed rider',
    'Keep up with maintenance',
    'No phone while riding',
    'Never ride drowsy, after drinking or on medication that causes drowsiness'
  ],
  regras_piloto_es: [
    'Licencia de moto vigente',
    'Revisar frenos, neumáticos y luces antes de salir',
    'Respetar el límite de velocidad',
    'Mantener distancia con el vehículo de adelante',
    'Conducir a la defensiva: la moto se ve poco',
    'Evitar circular entre los autos',
    'Nunca prestar la moto a quien no tiene licencia',
    'Mantenimiento preventivo al día',
    'Sin celular al conducir',
    'Nunca conducir con sueño, después de beber o bajo efecto de medicamentos que dan sueño'
  ],
  regras_piloto_ptpt: [
    'Carta de condução válida para mota',
    'Confirmar travões, pneus e luzes antes de sair',
    'Respeitar o limite de velocidade',
    'Manter distância do veículo da frente',
    'Conduzir na defensiva: a mota é pouco vista',
    'Evitar circular entre os carros',
    'Nunca emprestar a mota a quem não tem carta',
    'Manutenção preventiva em dia',
    'Sem telemóvel ao conduzir',
    'Nunca conduzir com sono, depois de beber ou sob efeito de medicamentos que dão sono'
  ],

  riscos_especificos: [
    'Pouca visibilidade para os outros veículos',
    'Corpo exposto no impacto',
    'Instabilidade em piso molhado ou irregular',
    'Risco maior nas curvas',
    'Perda de equilíbrio com facilidade'
  ],
  riscos_especificos_en: [
    'Hard for other drivers to see',
    'Body fully exposed in a crash',
    'Unstable on wet or uneven surfaces',
    'Higher risk in bends',
    'Easy to lose balance'
  ],
  riscos_especificos_es: [
    'Poca visibilidad para los demás vehículos',
    'Cuerpo expuesto en el impacto',
    'Inestabilidad en suelo mojado o irregular',
    'Mayor riesgo en las curvas',
    'Facilidad para perder el equilibrio'
  ]
};

// ============================================
// MICROMOBILIDADE ELÉTRICA
// ============================================

export const MICROMOBILIDADE_ELETRICA = {
  definicao: 'Veículos individuais elétricos para trajetos curtos: bicicletas elétricas, patinetes, monociclos e hoverboards.',
  definicao_en: 'Small electric vehicles for short trips: e-bikes, e-scooters, electric unicycles and hoverboards.',
  definicao_es: 'Vehículos eléctricos individuales para trayectos cortos: bicicletas eléctricas, patinetes, monociclos y hoverboards.',
  definicao_ptpt: 'Veículos elétricos individuais para trajetos curtos: bicicletas elétricas, trotinetes, monociclos e hoverboards.',
  contexto: 'O número desses veículos cresceu muito nos últimos anos. Eles ajudam o trânsito, mas pesam e andam rápido: o aumento de acidentes exige responsabilidade de quem conduz.',
  contexto_en: 'Their numbers have grown fast in recent years. They ease traffic, but they are heavy and quick: the rise in crashes calls for responsible riding.',
  contexto_es: 'La cantidad de estos vehículos creció mucho en los últimos años. Ayudan al tráfico, pero pesan y van rápido: el aumento de accidentes exige responsabilidad de quien los conduce.',

  // Definicao legal brasileira (Resolucao CONTRAN 996/2023). A tela so mostra
  // no Brasil — em outros paises as categorias e os limites sao outros.
  categorias_ctb: [
    {
      nome: 'Bicicleta Elétrica',
      icone: 'PersonSimpleBike',
      velocidadeMax: 'Até 32 km/h',
      caracteristicas: [
        'Tem motor e pedal',
        'O motor só funciona quando se pedala',
        'Sem acelerador no punho',
        'Garupa só com assento ou cadeirinha apropriada fixada'
      ],
      ondeAndar: 'Ciclovias e ciclofaixas.',
      proibido: false
    },
    {
      nome: 'Autopropelidos',
      icone: 'Scooter',
      velocidadeMax: 'Até 32 km/h',
      caracteristicas: [
        'Patinetes elétricos, monociclos e hoverboards',
        'Têm acelerador',
        'Veículo INDIVIDUAL: nunca levar carona, muito menos criança'
      ],
      ondeAndar: 'Ciclovias e ciclofaixas.',
      proibido: false
    },
    {
      nome: 'Ciclomotor',
      icone: 'Moped',
      velocidadeMax: 'De 32 a 50 km/h',
      caracteristicas: [
        'Modelos mais potentes',
        'Exigem emplacamento',
        'Exigem habilitação (ACC ou categoria A)',
        'Garupa com as mesmas regras da moto'
      ],
      ondeAndar: 'Só na rua, como os carros. PROIBIDO em ciclovias, ciclofaixas e calçadas.',
      proibido: true
    }
  ],

  riscos: [
    'Peso e velocidade causam colisões e atropelamentos graves em ciclovias',
    'Traumatismos e fraturas, porque o corpo fica exposto',
    'Incêndio da bateria, sobretudo ao recarregar'
  ],
  riscos_en: [
    'Weight and speed cause serious collisions with cyclists and pedestrians',
    'Head injuries and fractures, because the body is exposed',
    'Battery fires, especially while charging'
  ],
  riscos_es: [
    'El peso y la velocidad causan choques y atropellos graves en ciclovías',
    'Traumatismos y fracturas, porque el cuerpo queda expuesto',
    'Incendio de la batería, sobre todo al cargarla'
  ],

  prevencao: [
    'O pedestre é o mais frágil: reduza perto dele e ceda a passagem',
    'Reduza também ao passar por bicicletas comuns',
    'Use capacete',
    'Recarregue a bateria fora dos quartos e da rota de fuga, sem cobrir e com o carregador original',
    'Confira as regras do seu país e da sua cidade para o seu modelo'
  ],
  prevencao_en: [
    'Pedestrians are the most vulnerable: slow down near them and give way',
    'Slow down when passing ordinary bicycles too',
    'Wear a helmet',
    'Charge the battery outside bedrooms and escape routes, uncovered, with the original charger',
    'Check your country\'s and city\'s rules for your model'
  ],
  prevencao_es: [
    'El peatón es el más frágil: reduzca cerca de él y ceda el paso',
    'Reduzca también al pasar bicicletas comunes',
    'Use casco',
    'Cargue la batería fuera de los dormitorios y de la ruta de escape, sin taparla y con el cargador original',
    'Consulte las reglas de su país y de su ciudad para su modelo'
  ],
  prevencao_ptpt: [
    'O peão é o mais frágil: abrande perto dele e dê passagem',
    'Abrande também ao passar por bicicletas comuns',
    'Use capacete',
    'Carregue a bateria fora dos quartos e do caminho de fuga, sem tapar e com o carregador original',
    'Confirme as regras do seu país e da sua cidade para o seu modelo'
  ]
};

// ============================================
// HELPERS
// ============================================

export const getDispositivoPorIdade = (idade) => {
  if (idade < 1) return DISPOSITIVOS_RETENCAO[0];
  if (idade < 4) return DISPOSITIVOS_RETENCAO[1];
  if (idade < 10) return DISPOSITIVOS_RETENCAO[2];
  return null;
};

export default {
  TEXTOS_MOBILIDADE,
  DISPOSITIVOS_RETENCAO,
  MOBILIDADE_ATIVA,
  SEGURANCA_PEDESTRE,
  SEGURANCA_MOTO,
  MICROMOBILIDADE_ELETRICA,
  getDispositivoPorIdade
};
