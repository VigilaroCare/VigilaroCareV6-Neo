/**
 * regrasTransitoPorPais.js — regras de transporte de criancas e de
 * micromobilidade pela LEI DO PAIS do usuario (nao pelo idioma).
 *
 * ================================================================
 * POR QUE ESTE FICHEIRO EXISTE (D19, 16/10/2026)
 * ================================================================
 * A tela de Mobilidade mostrava a lei brasileira (CTB, CONTRAN, "multa
 * gravissima + 7 pontos na CNH", "SAMU 192", "PRF 191") para qualquer pais.
 * O Agnaldo pediu: "implemente com base nas melhores praticas e recomendacoes
 * da legislacao vigente em cada contexto de regiao", seguindo as instituicoes
 * e os orgaos formais de cada lugar.
 *
 * Mesmo modelo de data/classesIncendio.js: cada entrada vira um token
 * ({{CHILD_SEAT_LAW}} etc.) resolvido em utils/emergencyTokens.js pelo pais
 * detectado. Pais sem entrada cai em DEFAULT: orientacao generica correta,
 * nunca a lei de outro pais.
 *
 * ================================================================
 * FONTES (conferidas em 16/10/2026)
 * ================================================================
 *  BR — CTB art. 64 (redacao da Lei 14.071/2020), art. 168 e art. 244, V;
 *       Resolucao CONTRAN 819/2021 (Senatran confirmou em 2026 que segue em
 *       vigor). Faixa de 1,45 m: a SBP lembra que a crianca brasileira media
 *       so passa disso depois dos 10 anos — o assento de elevacao continua
 *       sendo o mais seguro ate la.
 *  PT — Codigo da Estrada, art. 55.o (menos de 12 anos e de 135 cm; coima de
 *       120 a 600 euros por crianca, com inibicao de conduzir). Trotinetes com
 *       motor equiparadas a velocipedes (art. 112.o); capacete com leituras
 *       divergentes entre a lei (art. 82.o) e a ANSR — orientamos usar sempre.
 *  ES — Reglamento General de Circulacion: art. 117 (menores de 135 cm; DGT
 *       recomenda ate 150 cm; infraccion grave de 200 euros) e art. 12
 *       (pasajeros de moto: 12 anos; desde 7 com pai/mae/tutor ou adulto
 *       autorizado e capacete). Reforma do RGC em vigor desde 01/10/2026:
 *       capacete obrigatorio e idade minima de 15 anos em patinete eletrico.
 *       Os pontos retirados (3 ou 4) divergem entre fontes — nao citamos.
 *  GB — gov.uk/child-car-seats-the-rules (12 anos ou 135 cm; R129 de costas
 *       ate 15 meses; multa de ate 500 libras); gov.uk/electric-scooter-rules
 *       (trotinete particular so em terreno privado).
 *  US — sem lei federal de cadeirinha (leis estaduais). Recomendacao AAP 2018
 *       (Pediatrics) e NHTSA: de costas o maximo possivel, booster ate ~1,45 m
 *       (4'9"), banco traseiro ate 13 anos. Selo: FMVSS 213.
 *  MX — regras de transito sao estaduais e municipais; so a orientacao geral
 *       e o encaminhamento ao regulamento local, sem citar artigo.
 *
 * Para mudar uma regra: altere aqui, nunca no texto da tela, e cite a fonte.
 */

const T = (pt, ptPT, en, es) => ({ pt, ptPT, en, es });

const REGRAS = {
    BR: {
        CHILD_SEAT_LAW: T(
            'No Brasil (CTB, art. 64, e Resolução CONTRAN 819/2021), crianças com menos de 10 anos que ainda não atingiram 1,45 m de altura viajam no banco traseiro, no dispositivo adequado à idade, ao peso e à altura. Mesmo depois dos 10 anos, se a criança ainda não tiver 1,45 m, continue com o assento de elevação: o cinto só protege quando passa no meio do ombro e sobre o quadril.',
            'No Brasil (CTB, art. 64, e Resolução CONTRAN 819/2021), crianças com menos de 10 anos que ainda não atingiram 1,45 m de altura viajam no banco traseiro, no dispositivo adequado à idade, ao peso e à altura. Mesmo depois dos 10 anos, se a criança ainda não tiver 1,45 m, continue com o assento elevatório: o cinto só protege quando passa a meio do ombro e sobre a anca.',
            'In Brazil (Traffic Code art. 64 and CONTRAN Resolution 819/2021), children under 10 who are shorter than 1.45 m ride in the back seat, in the restraint suited to their age, weight and height. Even after 10, if the child is still under 1.45 m, keep using the booster: the belt only protects when it crosses the middle of the shoulder and sits on the hips.',
            'En Brasil (Código de Tránsito, art. 64, y Resolución CONTRAN 819/2021), los niños menores de 10 años que aún no miden 1,45 m viajan en el asiento trasero, en el dispositivo adecuado a su edad, peso y altura. Incluso después de los 10 años, si el niño aún no mide 1,45 m, siga con el elevador: el cinturón solo protege cuando cruza el centro del hombro y se apoya sobre la cadera.'
        ),
        CHILD_SEAT_PENALTY: T(
            'Infração gravíssima (CTB, art. 168): multa, 7 pontos na CNH e retenção do veículo até a situação ser corrigida.',
            'Infração gravíssima (CTB, art. 168): multa, 7 pontos na carta de condução e retenção do veículo até a situação ser corrigida.',
            'Very serious offence (Traffic Code art. 168): fine, 7 points on the licence and the vehicle held until the situation is corrected.',
            'Infracción gravísima (Código de Tránsito, art. 168): multa, 7 puntos en la licencia y retención del vehículo hasta que se corrija.'
        ),
        CHILD_SEAT_LABEL: T(
            'o selo do Inmetro na etiqueta do dispositivo',
            'o selo do Inmetro na etiqueta do dispositivo',
            'the INMETRO seal on the seat label',
            'el sello del INMETRO en la etiqueta del dispositivo'
        ),
        MOTO_PASSENGER_RULE: T(
            'No Brasil (CTB, art. 244, V), levar na moto criança com menos de 10 anos — ou que não tenha condições de cuidar da própria segurança — é infração gravíssima, com suspensão do direito de dirigir.',
            'No Brasil (CTB, art. 244, V), levar no motociclo criança com menos de 10 anos — ou que não tenha condições de cuidar da própria segurança — é infração gravíssima, com suspensão do direito de conduzir.',
            'In Brazil (Traffic Code art. 244, V), carrying a child under 10 on a motorcycle — or one unable to look after their own safety — is a very serious offence, with licence suspension.',
            'En Brasil (Código de Tránsito, art. 244, V), llevar en moto a un niño menor de 10 años — o que no pueda cuidar de su propia seguridad — es infracción gravísima, con suspensión de la licencia.'
        ),
        MICROMOBILITY_RULE: T(
            'No Brasil, a Resolução CONTRAN 996/2023 define as categorias abaixo. Calçada: só é infração se houver proibição sinalizada, e cada município regulamenta — a prioridade é sempre do pedestre.',
            'No Brasil, a Resolução CONTRAN 996/2023 define as categorias abaixo. Passeio: só é infração se houver proibição sinalizada, e cada município regulamenta — a prioridade é sempre do peão.',
            'In Brazil, CONTRAN Resolution 996/2023 defines the categories below. Sidewalks: riding there is only an offence where signs forbid it, and each city sets its own rules — pedestrians always have priority.',
            'En Brasil, la Resolución CONTRAN 996/2023 define las categorías de abajo. Aceras: solo es infracción donde haya prohibición señalizada, y cada municipio lo regula — la prioridad es siempre del peatón.'
        ),
    },
    PT: {
        CHILD_SEAT_LAW: T(
            'Em Portugal (Código da Estrada, art. 55.º), crianças com menos de 12 anos e menos de 135 cm viajam em sistema de retenção homologado, adequado ao peso e ao tamanho, no banco de trás. No banco da frente, só em cadeira voltada para trás com o airbag do passageiro desligado.',
            'Em Portugal (Código da Estrada, art. 55.º), crianças com menos de 12 anos e menos de 135 cm viajam em sistema de retenção homologado, adequado ao peso e ao tamanho, no banco de trás. No banco da frente, só em cadeira virada para trás com o airbag do passageiro desligado.',
            'In Portugal (Highway Code art. 55), children under 12 and shorter than 135 cm ride in an approved child restraint suited to their weight and size, in the back seat. In the front seat, only in a rear-facing seat with the passenger airbag switched off.',
            'En Portugal (Código de Carretera, art. 55), los niños menores de 12 años y de menos de 135 cm viajan en un sistema de retención homologado, adecuado a su peso y tamaño, en el asiento trasero. En el asiento delantero, solo en una silla a contramarcha con el airbag del pasajero desactivado.'
        ),
        CHILD_SEAT_PENALTY: T(
            'Multa de 120 € a 600 € por criança transportada de forma irregular, com suspensão do direito de dirigir.',
            'Coima de 120 € a 600 € por cada criança transportada indevidamente, com inibição de conduzir.',
            'Fine of €120 to €600 per child carried incorrectly, plus a driving ban.',
            'Multa de 120 € a 600 € por cada niño transportado indebidamente, con inhabilitación para conducir.'
        ),
        CHILD_SEAT_LABEL: T(
            'a etiqueta de homologação europeia ECE R129 (i-Size)',
            'a etiqueta de homologação europeia ECE R129 (i-Size)',
            'the European ECE R129 (i-Size) approval label',
            'la etiqueta de homologación europea ECE R129 (i-Size)'
        ),
        MICROMOBILITY_RULE: T(
            'Em Portugal, trotinetes com motor são equiparadas a bicicletas: circulam na ciclovia ou na via, não na calçada. Sobre o capacete, a lei e as autoridades divergem — use sempre.',
            'Em Portugal, trotinetes com motor são equiparadas a velocípedes: circulam na ciclovia ou na faixa de rodagem, não no passeio. Sobre o capacete, a lei e as autoridades divergem — use sempre.',
            'In Portugal, motorised scooters are treated as bicycles: ride on the cycle lane or the road, never the pavement. The law and the authorities disagree on helmets — always wear one.',
            'En Portugal, los patinetes con motor se equiparan a las bicicletas: circulan por el carril bici o la calzada, nunca por la acera. Sobre el casco, la ley y las autoridades discrepan — úselo siempre.'
        ),
    },
    ES: {
        CHILD_SEAT_LAW: T(
            'Na Espanha (Reglamento General de Circulación, art. 117), menores de 135 cm de altura viajam em sistema de retenção infantil homologado, adequado à altura e ao peso, e, como regra, nos bancos traseiros. A DGT recomenda manter o sistema até os 150 cm.',
            'Em Espanha (Reglamento General de Circulación, art. 117), menores de 135 cm de altura viajam em sistema de retenção infantil homologado, adequado à altura e ao peso, e, como regra, nos bancos traseiros. A DGT recomenda manter o sistema até aos 150 cm.',
            'In Spain (General Traffic Regulation art. 117), children under 135 cm tall ride in an approved child restraint suited to their height and weight and, as a rule, in the rear seats. The DGT recommends keeping the restraint until 150 cm.',
            'En España (Reglamento General de Circulación, art. 117), los menores de 135 cm de estatura viajan en un sistema de retención infantil homologado, adecuado a su talla y peso, y, como norma general, en los asientos traseros. La DGT recomienda mantenerlo hasta los 150 cm.'
        ),
        CHILD_SEAT_PENALTY: T(
            'Infração grave: multa de 200 € e perda de pontos, por cada menor sem o sistema adequado.',
            'Infração grave: coima de 200 € e perda de pontos, por cada menor sem o sistema adequado.',
            'Serious offence: €200 fine and penalty points, for each child without the right restraint.',
            'Infracción grave: multa de 200 € y retirada de puntos, por cada menor sin el sistema adecuado.'
        ),
        CHILD_SEAT_LABEL: T(
            'a etiqueta de homologação europeia ECE R129 (i-Size)',
            'a etiqueta de homologação europeia ECE R129 (i-Size)',
            'the European ECE R129 (i-Size) approval label',
            'la etiqueta de homologación europea ECE R129 (i-Size)'
        ),
        MOTO_PASSENGER_RULE: T(
            'Na Espanha (RGC, art. 12), menores de 12 anos não podem ser passageiros de moto; excepcionalmente a partir dos 7 anos, se quem conduz for o pai, a mãe, o tutor ou um adulto autorizado, e sempre com capacete homologado.',
            'Em Espanha (RGC, art. 12), menores de 12 anos não podem ser passageiros de motociclo; excecionalmente a partir dos 7 anos, se quem conduz for o pai, a mãe, o tutor ou um adulto autorizado, e sempre com capacete homologado.',
            'In Spain (General Traffic Regulation art. 12), children under 12 may not ride as motorcycle passengers; exceptionally from age 7, if the rider is a parent, guardian or authorised adult, and always with an approved helmet.',
            'En España (RGC, art. 12), los menores de 12 años no pueden ir como pasajeros en moto; excepcionalmente desde los 7 años, si conduce el padre, la madre, el tutor o un adulto autorizado, y siempre con casco homologado.'
        ),
        MICROMOBILITY_RULE: T(
            'Na Espanha, desde 1º de outubro de 2026, o capacete é obrigatório no patinete elétrico e a idade mínima é de 15 anos (multa de 200 €). É proibido circular na calçada.',
            'Em Espanha, desde 1 de outubro de 2026, o capacete é obrigatório na trotinete elétrica e a idade mínima é de 15 anos (coima de 200 €). É proibido circular no passeio.',
            'In Spain, since 1 October 2026, helmets are mandatory on e-scooters and the minimum age is 15 (€200 fine). Riding on the pavement is forbidden.',
            'En España, desde el 1 de octubre de 2026, el casco es obligatorio en patinete eléctrico y la edad mínima es de 15 años (multa de 200 €). Está prohibido circular por la acera.'
        ),
    },
    GB: {
        CHILD_SEAT_LAW: T(
            'No Reino Unido, a criança usa cadeirinha até os 12 anos ou 135 cm, o que vier primeiro. Cadeirinhas por altura (i-Size, R129) ficam voltadas para trás até, no mínimo, os 15 meses.',
            'No Reino Unido, a criança usa cadeira auto até aos 12 anos ou 135 cm, o que vier primeiro. Cadeiras por altura (i-Size, R129) ficam viradas para trás até, no mínimo, aos 15 meses.',
            'In the UK, children use a child car seat until they are 12 or 135 cm tall, whichever comes first. Height-based seats (i-Size, R129) must be rear-facing until the child is over 15 months.',
            'En el Reino Unido, el niño usa silla infantil hasta los 12 años o los 135 cm, lo que llegue primero. Las sillas por estatura (i-Size, R129) van a contramarcha al menos hasta los 15 meses.'
        ),
        CHILD_SEAT_PENALTY: T(
            'Multa de até £500 se a criança não estiver no assento ou cinto correto.',
            'Coima de até £500 se a criança não estiver na cadeira ou no cinto correto.',
            'Fine of up to £500 if the child is not in the correct car seat or seat belt.',
            'Multa de hasta 500 £ si el niño no va en la silla o el cinturón correctos.'
        ),
        CHILD_SEAT_LABEL: T(
            'a etiqueta com o "E" maiúsculo num círculo e "R129"',
            'a etiqueta com o "E" maiúsculo num círculo e "R129"',
            'the label with a capital "E" in a circle and "R129"',
            'la etiqueta con la "E" mayúscula en un círculo y "R129"'
        ),
        MICROMOBILITY_RULE: T(
            'No Reino Unido, patinete elétrico PARTICULAR não pode circular em rua, calçada ou parque — só em terreno privado, com autorização do dono. Só os de aluguel dos programas oficiais podem andar na rua e na ciclovia.',
            'No Reino Unido, trotinete elétrica PARTICULAR não pode circular em estrada, passeio ou parque — só em terreno privado, com autorização do dono. Só as de aluguer dos programas oficiais podem andar na estrada e na ciclovia.',
            'In the UK, PRIVATELY OWNED e-scooters cannot be ridden on roads, pavements or in parks — only on private land with the owner\'s permission. Only rental scooters from official trial schemes may use roads and cycle lanes.',
            'En el Reino Unido, el patinete eléctrico PARTICULAR no puede circular por la calle, la acera ni los parques — solo en terreno privado con permiso del dueño. Solo los de alquiler de los programas oficiales pueden ir por la calle y el carril bici.'
        ),
    },
    US: {
        CHILD_SEAT_LAW: T(
            'Nos EUA, as leis de cadeirinha são estaduais. Recomendação da Academia Americana de Pediatria (AAP) e da NHTSA: de costas pelo maior tempo que a cadeirinha permitir, assento de elevação até cerca de 1,45 m (4\'9") e banco traseiro até os 13 anos.',
            'Nos EUA, as leis de cadeira auto são estaduais. Recomendação da Academia Americana de Pediatria (AAP) e da NHTSA: virada para trás pelo maior tempo que a cadeira permitir, assento elevatório até cerca de 1,45 m (4\'9") e banco traseiro até aos 13 anos.',
            'In the US, car seat laws are set by each state. AAP and NHTSA guidance: rear-facing as long as the seat allows, a booster until about 4\'9" (1.45 m), and the back seat until age 13.',
            'En EE. UU., las leyes de sillas infantiles son estatales. Recomendación de la Academia Americana de Pediatría (AAP) y de la NHTSA: a contramarcha el mayor tiempo que permita la silla, elevador hasta cerca de 1,45 m (4\'9") y asiento trasero hasta los 13 años.'
        ),
        CHILD_SEAT_PENALTY: T(
            'A multa varia conforme o estado.', 'A coima varia conforme o estado.',
            'Penalties vary by state.', 'La multa varía según el estado.'
        ),
        CHILD_SEAT_LABEL: T(
            'a etiqueta de conformidade com a norma federal FMVSS 213',
            'a etiqueta de conformidade com a norma federal FMVSS 213',
            'the label stating it conforms to Federal Motor Vehicle Safety Standard 213',
            'la etiqueta de conformidad con la norma federal FMVSS 213'
        ),
        MICROMOBILITY_RULE: T(
            'Nos EUA, as regras de patinete e bicicleta elétrica são estaduais e municipais; muitas cidades proíbem a calçada e exigem capacete para menores. Confira a regra local.',
            'Nos EUA, as regras de trotinete e bicicleta elétrica são estaduais e municipais; muitas cidades proíbem o passeio e exigem capacete para menores. Confirme a regra local.',
            'In the US, e-scooter and e-bike rules are set by states and cities; many ban sidewalk riding and require helmets for minors. Check your local rules.',
            'En EE. UU., las reglas de patinetes y bicicletas eléctricas son estatales y municipales; muchas ciudades prohíben la acera y exigen casco a los menores. Consulte la regla local.'
        ),
    },
    MX: {
        CHILD_SEAT_LAW: T(
            'No México, o transporte de crianças está nos regulamentos de trânsito estaduais e municipais — confira o do seu estado. Como referência: cadeirinha adequada à idade e ao tamanho, de costas pelo maior tempo possível, e banco traseiro até os 12 anos.',
            'No México, o transporte de crianças está nos regulamentos de trânsito estaduais e municipais — confirme o do seu estado. Como referência: cadeira adequada à idade e ao tamanho, virada para trás pelo maior tempo possível, e banco traseiro até aos 12 anos.',
            'In Mexico, child transport rules are set by state and municipal traffic regulations — check yours. As a reference: a seat suited to age and size, rear-facing as long as possible, and the back seat until age 12.',
            'En México, el transporte de niños está en los reglamentos de tránsito estatales y municipales — consulte el de su estado. Como referencia: silla adecuada a la edad y al tamaño, a contramarcha el mayor tiempo posible y asiento trasero hasta los 12 años.'
        ),
        CHILD_SEAT_PENALTY: T(
            'A multa varia conforme o regulamento local.', 'A coima varia conforme o regulamento local.',
            'Penalties vary with local regulations.', 'La multa varía según el reglamento local.'
        ),
    },
};

REGRAS.DEFAULT = {
    CHILD_SEAT_LAW: T(
        'As regras de transporte de crianças mudam de país para país — siga a lei local. Como referência internacional: dispositivo adequado à idade e ao tamanho, de costas pelo maior tempo possível, assento de elevação até cerca de 1,35–1,45 m e banco traseiro.',
        'As regras de transporte de crianças mudam de país para país — siga a lei local. Como referência internacional: sistema adequado à idade e ao tamanho, virado para trás pelo maior tempo possível, assento elevatório até cerca de 1,35–1,45 m e banco traseiro.',
        'Child transport rules vary from country to country — follow local law. As an international reference: a restraint suited to age and size, rear-facing as long as possible, a booster until about 1.35–1.45 m, and the back seat.',
        'Las reglas de transporte de niños cambian de un país a otro — siga la ley local. Como referencia internacional: sistema adecuado a la edad y al tamaño, a contramarcha el mayor tiempo posible, elevador hasta cerca de 1,35–1,45 m y asiento trasero.'
    ),
    CHILD_SEAT_PENALTY: T(
        'A multa varia conforme o país.', 'A coima varia conforme o país.',
        'Penalties vary by country.', 'La multa varía según el país.'
    ),
    CHILD_SEAT_LABEL: T(
        'a etiqueta de homologação do país (por exemplo, ONU R129 ou FMVSS 213)',
        'a etiqueta de homologação do país (por exemplo, ONU R129 ou FMVSS 213)',
        'the national approval label (for example UN R129 or FMVSS 213)',
        'la etiqueta de homologación del país (por ejemplo, ONU R129 o FMVSS 213)'
    ),
    MOTO_PASSENGER_RULE: T(
        'A idade mínima para ser passageiro de moto depende da lei local. Em qualquer caso, a criança precisa alcançar as pedaleiras com firmeza e usar capacete do tamanho da cabeça dela.',
        'A idade mínima para ser passageiro de motociclo depende da lei local. Em qualquer caso, a criança precisa de alcançar os poisa-pés com firmeza e usar capacete do tamanho da cabeça dela.',
        'The minimum age for motorcycle passengers depends on local law. In any case, the child must reach the footrests firmly and wear a helmet that fits their head.',
        'La edad mínima para ir de pasajero en moto depende de la ley local. En cualquier caso, el niño debe alcanzar los reposapiés con firmeza y usar un casco de su talla.'
    ),
    MICROMOBILITY_RULE: T(
        'As regras de patinete e bicicleta elétrica mudam de país e de cidade. Prefira a ciclovia, nunca dispute a calçada com pedestres e use sempre capacete.',
        'As regras de trotinete e bicicleta elétrica mudam de país e de cidade. Prefira a ciclovia, nunca dispute o passeio com peões e use sempre capacete.',
        'E-scooter and e-bike rules vary by country and city. Use cycle lanes, never compete with pedestrians on the sidewalk, and always wear a helmet.',
        'Las reglas de patinetes y bicicletas eléctricas cambian según el país y la ciudad. Use el carril bici, nunca dispute la acera con los peatones y lleve siempre casco.'
    ),
};

/** Tokens que este ficheiro resolve (usados por utils/emergencyTokens.js). */
export const TOKENS_REGRAS_TRANSITO = Object.keys(REGRAS.DEFAULT);

/** Texto do token para o pais e idioma; cai no DEFAULT, nunca vazio. */
export function getRegraTransito(token, countryCode, langKey) {
    const pais = countryCode ? String(countryCode).toUpperCase() : null;
    const entrada = (pais && REGRAS[pais] && REGRAS[pais][token]) || REGRAS.DEFAULT[token];
    if (!entrada) return '';
    return entrada[langKey] || entrada.pt;
}
