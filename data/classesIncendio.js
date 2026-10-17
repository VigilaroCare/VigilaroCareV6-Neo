/**
 * classesIncendio.js — FONTE UNICA das classes de incendio e dos tipos de
 * extintor, pela norma que vale no PAIS do usuario (nao pelo idioma).
 *
 * ================================================================
 * POR QUE ESTE FICHEIRO EXISTE (D16, 16/10/2026)
 * ================================================================
 * O app ensinava "Classe C = eletricos" e "Classe K = cozinha" em todos os
 * idiomas. Isso vale no Brasil, nos EUA e no Mexico, mas NAO na Europa: pela
 * EN 2 a Classe C e GAS, o oleo de cozinha e Classe F e a eletricidade nao tem
 * letra. Um utilizador em Lisboa lia que a Classe C era fogo eletrico e, na
 * loja, encontrava extintores "C" para gas. O Agnaldo pediu: "implemente com
 * base nas melhores praticas e recomendacoes da legislacao vigente em cada
 * contexto de regiao", seguindo as instituicoes e os orgaos formais de cada
 * lugar.
 *
 * Tambem havia DUAS listas de classes paralelas (teoria_fogo.js e
 * fire_prevention_content.js), uma com a Classe D e outra sem. As duas agora
 * leem daqui, pelos tokens abaixo, resolvidos em utils/emergencyTokens.js.
 *
 * ================================================================
 * FONTES (conferidas em 16/10/2026)
 * ================================================================
 *  NBR  — Brasil: ABNT NBR 12693 (sistemas de protecao por extintores) e as
 *         Instrucoes Tecnicas dos Corpos de Bombeiros estaduais (ex.: IT 16
 *         CBMMG, IT 21 CBPMESP). A, B (liquidos e gases inflamaveis),
 *         C (equipamento eletrico energizado), D, K.
 *  NFPA — EUA: NFPA 10 (Standard for Portable Fire Extinguishers), sec. 5.2.
 *         Mesmas letras do Brasil; gases inflamaveis sao Classe B.
 *  NOM  — Mexico: NOM-002-STPS-2010. A, B (liquidos e gases), C (eletrico
 *         energizado), D, K.
 *  EN2  — Portugal (NP EN 2), Espanha (UNE-EN 2), Reino Unido (BS EN 2):
 *         A, B, C (GASES), D, F (oleos de cozinha). Eletricidade nao e
 *         classe: o extintor apto traz o pictograma de uso em equipamento
 *         eletrico (ensaio dieletrico da EN 3-7).
 *
 * Pais sem entrada cai em GENERICA: descreve pelo MATERIAL e cita as duas
 * convencoes ("Classe K nas Americas, Classe F na Europa"). Nunca entrega a
 * letra de outro pais como se fosse a do usuario.
 *
 * Bateria de ion-litio NAO e Classe D (decisao aprovada em 16/10/2026; ver
 * D15 em docs/PENDENCIAS.md) — a linha de metais diz isso explicitamente.
 */

export const NORMA_POR_PAIS = {
    BR: 'NBR',
    US: 'NFPA',
    MX: 'NOM',
    PT: 'EN2',
    ES: 'EN2',
    GB: 'EN2',
};

// As tres normas das Americas usam as mesmas letras; o texto so muda no nome
// da norma (FIRE_STANDARD).
const AMERICAS = {
    FIRE_CLASS_SOLIDS: {
        pt: 'Classe A: sólidos que deixam brasa e cinza (madeira, papel, tecido, plástico). Apaga-se com água ou pó ABC.',
        ptPT: 'Classe A: sólidos que deixam brasa e cinza (madeira, papel, tecido, plástico). Apaga-se com água ou pó ABC.',
        en: 'Class A: ordinary solids that leave embers and ash (wood, paper, fabric, plastic). Water or ABC dry chemical.',
        es: 'Clase A: sólidos que dejan brasa y ceniza (madera, papel, tela, plástico). Se apaga con agua o polvo ABC.',
    },
    FIRE_CLASS_LIQUIDS: {
        pt: 'Classe B: líquidos inflamáveis (gasolina, álcool, solventes, tintas). Nunca use água: ela espalha o líquido em chamas.',
        ptPT: 'Classe B: líquidos inflamáveis (gasolina, álcool, solventes, tintas). Nunca use água: ela espalha o líquido em chamas.',
        en: 'Class B: flammable liquids (gasoline, alcohol, solvents, paint). Never use water: it spreads the burning liquid.',
        es: 'Clase B: líquidos inflamables (gasolina, alcohol, solventes, pinturas). Nunca use agua: esparce el líquido en llamas.',
    },
    FIRE_CLASS_GASES: {
        pt: 'Gás de cozinha (GLP) e gás natural também são Classe B. Antes de tudo, feche o registro do gás — não apague a chama de um vazamento sem fechar a fonte, porque o gás continua saindo e pode explodir.',
        ptPT: 'O gás de cozinha (GPL) e o gás natural também são Classe B. Antes de tudo, feche a válvula do gás — não apague a chama de uma fuga sem fechar a fonte, porque o gás continua a sair e pode explodir.',
        en: 'Propane and natural gas are also Class B. First shut off the gas supply — do not put out the flame of a leak without closing the source, because gas keeps escaping and can explode.',
        es: 'El gas LP y el gas natural también son Clase B. Antes que nada, cierre la llave del gas: no apague la llama de una fuga sin cerrar la fuente, porque el gas sigue saliendo y puede explotar.',
    },
    FIRE_CLASS_ELECTRICAL: {
        pt: 'Classe C: equipamentos e instalações elétricas energizados. Desligue a energia no quadro e nunca use água (choque elétrico). Sem energia, o fogo passa a ser da classe do material que queima.',
        ptPT: 'Classe C: equipamentos e instalações elétricas sob tensão. Desligue a corrente no quadro e nunca use água (choque elétrico). Sem corrente, o fogo passa a ser da classe do material que arde.',
        en: 'Class C: energized electrical equipment and wiring. Cut the power at the breaker panel and never use water (electric shock). Once de-energized, the fire becomes the class of whatever is burning.',
        es: 'Clase C: equipos e instalaciones eléctricas energizados. Corte la corriente en el tablero y nunca use agua (descarga eléctrica). Sin corriente, el fuego pasa a ser de la clase del material que arde.',
    },
    FIRE_CLASS_METALS: {
        pt: 'Classe D: metais combustíveis (magnésio, titânio, sódio). Exige extintor especial e é raro em casa. Bateria de celular, patinete ou bicicleta elétrica NÃO é Classe D.',
        ptPT: 'Classe D: metais combustíveis (magnésio, titânio, sódio). Exige extintor especial e é rara em casa. Bateria de telemóvel, trotinete ou bicicleta elétrica NÃO é Classe D.',
        en: 'Class D: combustible metals (magnesium, titanium, sodium). Needs a special extinguisher and is rare at home. Phone, e-scooter and e-bike batteries are NOT Class D.',
        es: 'Clase D: metales combustibles (magnesio, titanio, sodio). Requiere extintor especial y es rara en casa. La batería del celular, del patinete o de la bicicleta eléctrica NO es Clase D.',
    },
    FIRE_CLASS_COOKING: {
        pt: 'Classe K: óleos e gorduras de cozinha. Nunca use água (o óleo explode em vapor). Desligue o fogo e abafe com uma tampa ou um pano úmido bem torcido; o extintor próprio é o de Classe K.',
        ptPT: 'Classe K: óleos e gorduras de cozinha. Nunca use água (o óleo explode em vapor). Desligue o lume e abafe com uma tampa ou um pano húmido bem torcido; o extintor próprio é o de Classe K.',
        en: 'Class K: cooking oils and fats. Never use water (the oil erupts in steam). Turn off the heat and smother with a lid or a damp, well-wrung cloth; the right extinguisher is a Class K.',
        es: 'Clase K: aceites y grasas de cocina. Nunca use agua (el aceite estalla en vapor). Apague el fuego y sofoque con una tapa o un paño húmedo bien escurrido; el extintor indicado es el de Clase K.',
    },
    COOKING_FIRE_CLASS: { pt: 'Classe K', ptPT: 'Classe K', en: 'Class K', es: 'Clase K' },
    EXTINGUISHER_ABC: {
        pt: 'Pó ABC: o "coringa" residencial — sólidos, líquidos, gases e equipamentos elétricos.',
        ptPT: 'Pó ABC: o "coringa" doméstico — sólidos, líquidos, gases e equipamentos elétricos.',
        en: 'ABC dry chemical: the all-rounder for homes — solids, liquids, gases and electrical equipment.',
        es: 'Polvo ABC: el "comodín" del hogar — sólidos, líquidos, gases y equipos eléctricos.',
    },
    EXTINGUISHER_BC: {
        pt: 'Pó químico BC: líquidos, gases e equipamentos elétricos. Não serve para sólidos e suja muito.',
        ptPT: 'Pó químico BC: líquidos, gases e equipamentos elétricos. Não serve para sólidos e suja muito.',
        en: 'BC dry chemical: liquids, gases and electrical equipment. Not for solids, and very messy.',
        es: 'Polvo químico BC: líquidos, gases y equipos eléctricos. No sirve para sólidos y ensucia mucho.',
    },
    EXTINGUISHER_CO2: {
        pt: 'CO2 (BC): líquidos e equipamentos elétricos. Não deixa resíduo (ideal para eletrônicos), mas perde eficácia ao ar livre.',
        ptPT: 'CO2 (BC): líquidos e equipamentos elétricos. Não deixa resíduo (ideal para eletrónica), mas perde eficácia ao ar livre.',
        en: 'CO2 (BC): liquids and electrical equipment. Leaves no residue (ideal for electronics) but loses effect outdoors.',
        es: 'CO2 (BC): líquidos y equipos eléctricos. No deja residuo (ideal para electrónica), pero pierde eficacia al aire libre.',
    },
    EXTINGUISHER_ABC_COVERS: {
        pt: 'serve para sólidos, líquidos inflamáveis e equipamentos elétricos',
        ptPT: 'serve para sólidos, líquidos inflamáveis e equipamentos elétricos',
        en: 'covers solids, flammable liquids and electrical equipment',
        es: 'sirve para sólidos, líquidos inflamables y equipos eléctricos',
    },
};

const TABELA = {
    NBR: {
        ...AMERICAS,
        FIRE_STANDARD: {
            pt: 'a ABNT NBR 12693 e as Instruções Técnicas do Corpo de Bombeiros',
            ptPT: 'a ABNT NBR 12693 e as Instruções Técnicas do Corpo de Bombeiros (Brasil)',
            en: 'ABNT NBR 12693 and the Fire Department Technical Instructions (Brazil)',
            es: 'la ABNT NBR 12693 y las Instrucciones Técnicas del Cuerpo de Bomberos (Brasil)',
        },
    },
    NFPA: {
        ...AMERICAS,
        FIRE_STANDARD: {
            pt: 'a NFPA 10 (EUA)', ptPT: 'a NFPA 10 (EUA)', en: 'NFPA 10', es: 'la NFPA 10 (EE. UU.)',
        },
    },
    NOM: {
        ...AMERICAS,
        FIRE_STANDARD: {
            pt: 'a NOM-002-STPS-2010 (México)', ptPT: 'a NOM-002-STPS-2010 (México)',
            en: 'NOM-002-STPS-2010 (Mexico)', es: 'la NOM-002-STPS-2010',
        },
    },
    EN2: {
        FIRE_CLASS_SOLIDS: AMERICAS.FIRE_CLASS_SOLIDS,
        FIRE_CLASS_LIQUIDS: {
            pt: 'Classe B: líquidos inflamáveis e sólidos que derretem (gasolina, álcool, solventes, cera). Nunca use água: ela espalha o líquido em chamas.',
            ptPT: 'Classe B: líquidos inflamáveis e sólidos que derretem (gasolina, álcool, solventes, cera). Nunca use água: ela espalha o líquido em chamas.',
            en: 'Class B: flammable liquids and liquefiable solids (petrol, alcohol, solvents, wax). Never use water: it spreads the burning liquid.',
            es: 'Clase B: líquidos inflamables y sólidos que se funden (gasolina, alcohol, disolventes, cera). Nunca use agua: esparce el líquido en llamas.',
        },
        FIRE_CLASS_GASES: {
            pt: 'Classe C: gases inflamáveis (butano, propano, gás natural). Antes de tudo, feche a válvula do gás — não apague a chama de um vazamento sem fechar a fonte, porque o gás continua saindo e pode explodir.',
            ptPT: 'Classe C: gases inflamáveis (butano, propano, gás natural). Antes de tudo, feche a válvula do gás — não apague a chama de uma fuga sem fechar a fonte, porque o gás continua a sair e pode explodir.',
            en: 'Class C: flammable gases (butane, propane, natural gas). First shut off the gas supply — do not put out the flame of a leak without closing the source, because gas keeps escaping and can explode.',
            es: 'Clase C: gases inflamables (butano, propano, gas natural). Antes que nada, cierre la llave del gas: no apague la llama de una fuga sin cerrar la fuente, porque el gas sigue saliendo y puede explotar.',
        },
        FIRE_CLASS_ELECTRICAL: {
            pt: 'Equipamento elétrico ligado não tem classe própria na norma europeia. Desligue a energia no quadro e nunca use água; se precisar de extintor, use só um com o pictograma de uso em equipamento elétrico (CO2 ou pó).',
            ptPT: 'Equipamento elétrico ligado não tem classe própria na norma europeia. Desligue a corrente no quadro e nunca use água; se precisar de extintor, use só um com o pictograma de utilização em equipamento elétrico (CO2 ou pó).',
            en: 'Live electrical equipment has no class of its own under the European standard. Cut the power at the consumer unit and never use water; if you need an extinguisher, use only one bearing the electrical-use pictogram (CO2 or powder).',
            es: 'El equipo eléctrico conectado no tiene clase propia en la norma europea. Corte la corriente en el cuadro y nunca use agua; si necesita extintor, use solo uno con el pictograma de uso en equipos eléctricos (CO2 o polvo).',
        },
        FIRE_CLASS_METALS: AMERICAS.FIRE_CLASS_METALS,
        FIRE_CLASS_COOKING: {
            pt: 'Classe F: óleos e gorduras de cozinha. Nunca use água (o óleo explode em vapor). Desligue o fogo e abafe com uma tampa ou um pano úmido bem torcido; o extintor próprio é o de Classe F (químico úmido).',
            ptPT: 'Classe F: óleos e gorduras de cozinha. Nunca use água (o óleo explode em vapor). Desligue o lume e abafe com uma tampa ou um pano húmido bem torcido; o extintor próprio é o de Classe F (químico húmido).',
            en: 'Class F: cooking oils and fats. Never use water (the oil erupts in steam). Turn off the heat and smother with a lid or a damp, well-wrung cloth; the right extinguisher is a Class F (wet chemical).',
            es: 'Clase F: aceites y grasas de cocina. Nunca use agua (el aceite estalla en vapor). Apague el fuego y sofoque con una tapa o un paño húmedo bien escurrido; el extintor indicado es el de Clase F (químico húmedo).',
        },
        COOKING_FIRE_CLASS: { pt: 'Classe F', ptPT: 'Classe F', en: 'Class F', es: 'Clase F' },
        EXTINGUISHER_ABC: {
            pt: 'Pó ABC: o "coringa" doméstico — sólidos (A), líquidos (B) e gases (C); a maioria traz também o pictograma de uso em equipamento elétrico.',
            ptPT: 'Pó ABC: o "coringa" doméstico — sólidos (A), líquidos (B) e gases (C); a maioria traz também o pictograma de utilização em equipamento elétrico.',
            en: 'ABC powder: the all-rounder for homes — solids (A), liquids (B) and gases (C); most also carry the electrical-use pictogram.',
            es: 'Polvo ABC: el "comodín" del hogar — sólidos (A), líquidos (B) y gases (C); la mayoría lleva también el pictograma de uso en equipos eléctricos.',
        },
        EXTINGUISHER_BC: {
            pt: 'Pó BC: líquidos (B) e gases (C); com o pictograma elétrico, também em equipamento ligado. Não serve para sólidos e suja muito.',
            ptPT: 'Pó BC: líquidos (B) e gases (C); com o pictograma elétrico, também em equipamento ligado. Não serve para sólidos e suja muito.',
            en: 'BC powder: liquids (B) and gases (C); with the electrical pictogram, also on live equipment. Not for solids, and very messy.',
            es: 'Polvo BC: líquidos (B) y gases (C); con el pictograma eléctrico, también en equipos conectados. No sirve para sólidos y ensucia mucho.',
        },
        EXTINGUISHER_CO2: {
            pt: 'CO2: líquidos (B) e equipamento elétrico (pictograma). Não deixa resíduo (ideal para eletrônicos), mas perde eficácia ao ar livre.',
            ptPT: 'CO2: líquidos (B) e equipamento elétrico (pictograma). Não deixa resíduo (ideal para eletrónica), mas perde eficácia ao ar livre.',
            en: 'CO2: liquids (B) and electrical equipment (pictogram). Leaves no residue (ideal for electronics) but loses effect outdoors.',
            es: 'CO2: líquidos (B) y equipos eléctricos (pictograma). No deja residuo (ideal para electrónica), pero pierde eficacia al aire libre.',
        },
        EXTINGUISHER_ABC_COVERS: {
            pt: 'serve para sólidos, líquidos e gases e, quando traz o pictograma elétrico, para equipamento ligado',
            ptPT: 'serve para sólidos, líquidos e gases e, quando traz o pictograma elétrico, para equipamento ligado',
            en: 'covers solids, liquids and gases and, when it carries the electrical pictogram, live equipment',
            es: 'sirve para sólidos, líquidos y gases y, si lleva el pictograma eléctrico, para equipos conectados',
        },
        FIRE_STANDARD: {
            pt: 'a norma europeia EN 2', ptPT: 'a norma NP EN 2', en: 'BS EN 2', es: 'la norma UNE-EN 2',
        },
    },
};

// Pais desconhecido: descreve pelo material e cita as duas convencoes.
TABELA.GENERICA = {
    FIRE_CLASS_SOLIDS: AMERICAS.FIRE_CLASS_SOLIDS,
    FIRE_CLASS_LIQUIDS: AMERICAS.FIRE_CLASS_LIQUIDS,
    FIRE_CLASS_GASES: {
        pt: 'Gases inflamáveis (gás de cozinha): Classe B nas Américas, Classe C na Europa. Antes de tudo, feche o registro do gás — não apague a chama de um vazamento sem fechar a fonte.',
        ptPT: 'Gases inflamáveis (gás de cozinha): Classe B nas Américas, Classe C na Europa. Antes de tudo, feche a válvula do gás — não apague a chama de uma fuga sem fechar a fonte.',
        en: 'Flammable gases (cooking gas): Class B in the Americas, Class C in Europe. First shut off the gas supply — do not put out the flame of a leak without closing the source.',
        es: 'Gases inflamables (gas de cocina): Clase B en América, Clase C en Europa. Antes que nada, cierre la llave del gas: no apague la llama de una fuga sin cerrar la fuente.',
    },
    FIRE_CLASS_ELECTRICAL: {
        pt: 'Equipamento elétrico ligado: Classe C nas Américas; na Europa não tem classe própria. Desligue a energia e nunca use água; use só extintor indicado para equipamento elétrico (CO2 ou pó).',
        ptPT: 'Equipamento elétrico ligado: Classe C nas Américas; na Europa não tem classe própria. Desligue a corrente e nunca use água; use só extintor indicado para equipamento elétrico (CO2 ou pó).',
        en: 'Live electrical equipment: Class C in the Americas; no class of its own in Europe. Cut the power and never use water; use only an extinguisher rated for electrical equipment (CO2 or powder).',
        es: 'Equipo eléctrico conectado: Clase C en América; en Europa no tiene clase propia. Corte la corriente y nunca use agua; use solo un extintor indicado para equipos eléctricos (CO2 o polvo).',
    },
    FIRE_CLASS_METALS: AMERICAS.FIRE_CLASS_METALS,
    FIRE_CLASS_COOKING: {
        pt: 'Óleos e gorduras de cozinha: Classe K nas Américas, Classe F na Europa. Nunca use água. Desligue o fogo e abafe com uma tampa ou um pano úmido bem torcido.',
        ptPT: 'Óleos e gorduras de cozinha: Classe K nas Américas, Classe F na Europa. Nunca use água. Desligue o lume e abafe com uma tampa ou um pano húmido bem torcido.',
        en: 'Cooking oils and fats: Class K in the Americas, Class F in Europe. Never use water. Turn off the heat and smother with a lid or a damp, well-wrung cloth.',
        es: 'Aceites y grasas de cocina: Clase K en América, Clase F en Europa. Nunca use agua. Apague el fuego y sofoque con una tapa o un paño húmedo bien escurrido.',
    },
    COOKING_FIRE_CLASS: { pt: 'Classe K/F', ptPT: 'Classe K/F', en: 'Class K/F', es: 'Clase K/F' },
    EXTINGUISHER_ABC: {
        pt: 'Pó ABC: o "coringa" residencial — sólidos, líquidos e gases; confira no rótulo se é indicado para equipamento elétrico.',
        ptPT: 'Pó ABC: o "coringa" doméstico — sólidos, líquidos e gases; confirme no rótulo se é indicado para equipamento elétrico.',
        en: 'ABC powder: the all-rounder for homes — solids, liquids and gases; check the label for electrical use.',
        es: 'Polvo ABC: el "comodín" del hogar — sólidos, líquidos y gases; confirme en la etiqueta si sirve para equipos eléctricos.',
    },
    EXTINGUISHER_BC: {
        pt: 'Pó BC: líquidos e gases; confira no rótulo se é indicado para equipamento elétrico. Não serve para sólidos e suja muito.',
        ptPT: 'Pó BC: líquidos e gases; confirme no rótulo se é indicado para equipamento elétrico. Não serve para sólidos e suja muito.',
        en: 'BC powder: liquids and gases; check the label for electrical use. Not for solids, and very messy.',
        es: 'Polvo BC: líquidos y gases; confirme en la etiqueta si sirve para equipos eléctricos. No sirve para sólidos y ensucia mucho.',
    },
    EXTINGUISHER_CO2: {
        pt: 'CO2: líquidos e equipamentos elétricos. Não deixa resíduo (ideal para eletrônicos), mas perde eficácia ao ar livre.',
        ptPT: 'CO2: líquidos e equipamentos elétricos. Não deixa resíduo (ideal para eletrónica), mas perde eficácia ao ar livre.',
        en: 'CO2: liquids and electrical equipment. Leaves no residue (ideal for electronics) but loses effect outdoors.',
        es: 'CO2: líquidos y equipos eléctricos. No deja residuo (ideal para electrónica), pero pierde eficacia al aire libre.',
    },
    EXTINGUISHER_ABC_COVERS: {
        pt: 'serve para sólidos, líquidos e gases (confira no rótulo o uso em equipamento elétrico)',
        ptPT: 'serve para sólidos, líquidos e gases (confirme no rótulo o uso em equipamento elétrico)',
        en: 'covers solids, liquids and gases (check the label for electrical use)',
        es: 'sirve para sólidos, líquidos y gases (confirme en la etiqueta el uso en equipos eléctricos)',
    },
    FIRE_STANDARD: {
        pt: 'a norma de incêndio do seu país', ptPT: 'a norma de incêndio do seu país',
        en: 'your country\'s fire standard', es: 'la norma de incendios de su país',
    },
};

/** Tokens que este ficheiro resolve (usados por utils/emergencyTokens.js). */
export const TOKENS_CLASSES_INCENDIO = Object.keys(TABELA.GENERICA);

/** Norma de incendio do pais ('NBR' | 'NFPA' | 'NOM' | 'EN2' | 'GENERICA'). */
export function getNormaIncendio(countryCode) {
    const pais = countryCode ? String(countryCode).toUpperCase() : null;
    return (pais && NORMA_POR_PAIS[pais]) || 'GENERICA';
}

/** Texto do token para o pais e idioma; nunca vazio. */
export function getClasseIncendio(token, countryCode, langKey) {
    const norma = TABELA[getNormaIncendio(countryCode)];
    const entrada = norma[token] || TABELA.GENERICA[token];
    if (!entrada) return '';
    return entrada[langKey] || entrada.pt;
}
