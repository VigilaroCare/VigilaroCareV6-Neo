/**
 * pet_food_safety.js
 * Base de dados de alimentos tóxicos e perigosos para Pets
 * Foco: Cães e Gatos (mas aplicável a outros)
 */

export const PET_FOOD_SAFETY = [
    {
        id: 'chocolate',
        nome: 'Chocolate', nome_en: 'Chocolate', nome_es: 'Chocolate',
        emoji: '🍫',
        risco: 'MUITO ALTO', risco_en: 'VERY HIGH', risco_es: 'MUY ALTO',
        cor: '#D32F2F', // Vermelho
        toxina: 'Teobromina', toxina_en: 'Theobromine', toxina_es: 'Teobromina',
        sintomas: 'Vômitos, diarreia, tremores, convulsão, morte.', sintomas_en: 'Vomiting, diarrhea, tremors, seizure, death.', sintomas_es: 'Vómitos, diarrea, temblores, convulsión, muerte.',
        detalhe: 'Quanto mais escuro o chocolate e menor o animal, maior o risco. Chocolate amargo é fatal em pequenas doses.', detalhe_en: 'The darker the chocolate and smaller the animal, the higher the risk. Dark chocolate is fatal in small doses.', detalhe_es: 'Cuanto más oscuro el chocolate y menor el animal, mayor el riesgo. El chocolate amargo es fatal en pequeñas dosis.'
    },
    {
        id: 'uva',
        nome: 'Uva e Passas', nome_en: 'Grapes and Raisins', nome_es: 'Uvas y Pasas',
        emoji: '🍇',
        risco: 'ALTO', risco_en: 'HIGH', risco_es: 'ALTO',
        cor: '#D32F2F',
        toxina: 'Desconhecida (causa falência renal)', toxina_en: 'Unknown (causes kidney failure)', toxina_es: 'Desconocida (causa insuficiencia renal)',
        sintomas: 'Vômito, letargia, falta de apetite, insuficiência renal aguda.', sintomas_en: 'Vomiting, lethargy, loss of appetite, acute kidney failure.', sintomas_es: 'Vómito, letargo, falta de apetito, insuficiencia renal aguda.',
        detalhe: 'Apenas uma uva pode ser fatal para alguns cães. Causa dano renal irreversível.', detalhe_en: 'Just one grape can be fatal for some dogs. Causes irreversible kidney damage.', detalhe_es: 'Solo una uva puede ser fatal para algunos perros. Causa daño renal irreversible.'
    },
    {
        id: 'cebola',
        nome: 'Cebola e Alho', nome_en: 'Onion and Garlic', nome_es: 'Cebolla y Ajo',
        emoji: '🧅',
        risco: 'MODERADO/ALTO', risco_en: 'MODERATE/HIGH', risco_es: 'MODERADO/ALTO',
        cor: '#F57C00', // Laranja
        toxina: 'Tiossulfato', toxina_en: 'Thiosulfate', toxina_es: 'Tiosulfato',
        sintomas: 'Anemia, fraqueza, gengivas pálidas, urina escura.', sintomas_en: 'Anemia, weakness, pale gums, dark urine.', sintomas_es: 'Anemia, debilidad, encías pálidas, orina oscura.',
        detalhe: 'Danos cumulativos. Ocorre mesmo se cozida ou em pó. Gatos são mais sensíveis.', detalhe_en: 'Cumulative damage. Occurs even if cooked or powdered. Cats are more sensitive.', detalhe_es: 'Daño acumulativo. Ocurre incluso si está cocida o en polvo. Los gatos son más sensibles.'
    },
    {
        id: 'xilitol',
        nome: 'Xilitol (Adoçante)', nome_en: 'Xylitol (Sweetener)', nome_es: 'Xilitol (Edulcorante)',
        emoji: '🍬',
        risco: 'MUITO ALTO', risco_en: 'VERY HIGH', risco_es: 'MUY ALTO',
        cor: '#D32F2F',
        toxina: 'Liberação rápida de insulina', toxina_en: 'Rapid insulin release', toxina_es: 'Liberación rápida de insulina',
        sintomas: 'Hipoglicemia súbita, vômito, perda de coordenação, falência hepática.', sintomas_en: 'Sudden hypoglycemia, vomiting, loss of coordination, liver failure.', sintomas_es: 'Hipoglucemia súbita, vómito, pérdida de coordinación, insuficiencia hepática.',
        detalhe: 'Comum em gomas de mascar, pasta de amendoim diet e cremes dentais humanos.', detalhe_en: 'Common in chewing gum, diet peanut butter, and human toothpastes.', detalhe_es: 'Común en chicles, mantequilla de maní dietética y pastas dentales humanas.'
    },
    {
        id: 'alcool',
        nome: 'Álcool', nome_en: 'Alcohol', nome_es: 'Alcohol',
        emoji: '🍺',
        risco: 'ALTO', risco_en: 'HIGH', risco_es: 'ALTO',
        cor: '#D32F2F',
        toxina: 'Etanol', toxina_en: 'Ethanol', toxina_es: 'Etanol',
        sintomas: 'Vômito, dificuldade respiratória, coma, morte.', sintomas_en: 'Vomiting, breathing difficulty, coma, death.', sintomas_es: 'Vómito, dificultad respiratoria, coma, muerte.',
        detalhe: 'O fígado dos animais não processa álcool. Pequenas doses causam intoxicação grave.', detalhe_en: 'Animals\' livers do not process alcohol. Small doses cause severe poisoning.', detalhe_es: 'El hígado de los animales no procesa el alcohol. Dosis pequeñas causan intoxicación grave.'
    },
    {
        id: 'cafeina',
        nome: 'Café e Chá', nome_en: 'Coffee and Tea', nome_es: 'Café y Té',
        emoji: '☕',
        risco: 'ALTO', risco_en: 'HIGH', risco_es: 'ALTO',
        cor: '#D32F2F',
        toxina: 'Metilxantina', toxina_en: 'Methylxanthine', toxina_es: 'Metilxantina',
        sintomas: 'Hiperatividade, tremores, taquicardia, convulsões.', sintomas_en: 'Hyperactivity, tremors, tachycardia, seizures.', sintomas_es: 'Hiperactividad, temblores, taquicardia, convulsiones.',
        detalhe: 'Semelhante ao chocolate. Borra de café no lixo é um perigo comum.', detalhe_en: 'Similar to chocolate. Coffee grounds in the trash are a common danger.', detalhe_es: 'Similar al chocolate. Los posos de café en la basura son un peligro común.'
    },
    {
        id: 'ossos_cozidos',
        nome: 'Ossos Cozidos', nome_en: 'Cooked Bones', nome_es: 'Huesos Cocidos',
        emoji: '🦴',
        risco: 'ALTO (Físico)', risco_en: 'HIGH (Physical)', risco_es: 'ALTO (Físico)',
        cor: '#D32F2F',
        toxina: 'Não tóxico, mas perigoso', toxina_en: 'Not toxic, but dangerous', toxina_es: 'No tóxico, pero peligroso',
        sintomas: 'Perfuração intestinal, asfixia, quebra de dentes.', sintomas_en: 'Intestinal perforation, asphyxiation, broken teeth.', sintomas_es: 'Perforación intestinal, asfixia, fractura de dientes.',
        detalhe: 'Ao cozinhar, o osso perde colágeno e estilhaça como vidro. NUNCA ofereça ossos de galinha/costela cozidos.', detalhe_en: 'When cooking, the bone loses collagen and shatters like glass. NEVER offer cooked chicken/rib bones.', detalhe_es: 'Al cocinar, el hueso pierde colágeno y se astilla como el vidrio. NUNCA ofrezca huesos de pollo/costilla cocidos.'
    },
    {
        id: 'abacate',
        nome: 'Abacate', nome_en: 'Avocado', nome_es: 'Aguacate',
        emoji: '🥑',
        risco: 'MUITO ALTO (Aves)', risco_en: 'VERY HIGH (Birds)', risco_es: 'MUY ALTO (Aves)',
        cor: '#D32F2F',
        toxina: 'Persina', toxina_en: 'Persin', toxina_es: 'Persina',
        sintomas: 'Dificuldade respiratória, morte súbita (Aves). Vômito/Diarreia (Cães).', sintomas_en: 'Breathing difficulty, sudden death (Birds). Vomiting/Diarrhea (Dogs).', sintomas_es: 'Dificultad respiratoria, muerte súbita (Aves). Vómito/Diarrea (Perros).',
        detalhe: 'EXTREMAMENTE FATAL para aves e coelhos. A polpa, casca e caroço contêm persina, que causa parada cardíaca em pássaros.', detalhe_en: 'EXTREMELY FATAL for birds and rabbits. The flesh, skin, and pit contain persin, which causes cardiac arrest in birds.', detalhe_es: 'EXTREMADAMENTE FATAL para aves y conejos. La pulpa, la cáscara y el hueso contienen persina, que causa paro cardíaco en las aves.'
    },
    {
        id: 'leite',
        nome: 'Leite e Laticínios', nome_en: 'Milk and Dairy', nome_es: 'Leche y Lácteos',
        emoji: '🥛',
        risco: 'BAIXO/MODERADO', risco_en: 'LOW/MODERATE', risco_es: 'BAJO/MODERADO',
        cor: '#FBC02D', // Amarelo
        toxina: 'Lactose (Intolerância)', toxina_en: 'Lactose (Intolerance)', toxina_es: 'Lactosa (Intolerancia)',
        sintomas: 'Diarreia e gases.', sintomas_en: 'Diarrhea and gas.', sintomas_es: 'Diarrea y gases.',
        detalhe: 'A maioria dos pets adultos não digere lactose. Não é fatal, mas causa desconforto.', detalhe_en: 'Most adult pets cannot digest lactose. It is not fatal but causes discomfort.', detalhe_es: 'La mayoría de las mascotas adultas no digieren la lactosa. No es fatal, pero causa molestias.'
    },
    {
        id: 'macadamia',
        nome: 'Noz Macadâmia', nome_en: 'Macadamia Nut', nome_es: 'Nuez de Macadamia',
        emoji: '🌰',
        risco: 'ALTO', risco_en: 'HIGH', risco_es: 'ALTO',
        cor: '#D32F2F',
        toxina: 'Desconhecida', toxina_en: 'Unknown', toxina_es: 'Desconocida',
        sintomas: 'Fraqueza nas patas traseiras, vômito, febre.', sintomas_en: 'Weakness in the hind legs, vomiting, fever.', sintomas_es: 'Debilidad en las patas traseras, vómito, fiebre.',
        detalhe: 'Afeta nervos e músculos. Sintomas aparecem em 12h.', detalhe_en: 'Affects nerves and muscles. Symptoms appear in 12h.', detalhe_es: 'Afecta nervios y músculos. Los síntomas aparecen en 12h.'
    },
    {
        id: 'massa_crua',
        nome: 'Massa Crua (Fermento)', nome_en: 'Raw Dough (Yeast)', nome_es: 'Masa Cruda (Levadura)',
        emoji: '🍞',
        risco: 'ALTO', risco_en: 'HIGH', risco_es: 'ALTO',
        cor: '#D32F2F',
        toxina: 'Expansão e Álcool', toxina_en: 'Expansion and Alcohol', toxina_es: 'Expansión y Alcohol',
        sintomas: 'Dilatação estomacal dolorosa, produção de álcool no estômago.', sintomas_en: 'Painful stomach dilation, alcohol production in the stomach.', sintomas_es: 'Dilatación estomacal dolorosa, producción de alcohol en el estómago.',
        detalhe: 'O fermento cresce no calor do estômago, podendo romper órgãos.', detalhe_en: 'The yeast grows in the heat of the stomach, potentially rupturing organs.', detalhe_es: 'La levadura crece con el calor del estómago, pudiendo romper órganos.'
    },
    {
        id: 'sementes_maca',
        nome: 'Sementes de Maçã/Pera', nome_en: 'Apple/Pear Seeds', nome_es: 'Semillas de Manzana/Pera',
        emoji: '🍎',
        risco: 'ALTO (Aves)', risco_en: 'HIGH (Birds)', risco_es: 'ALTO (Aves)',
        cor: '#D32F2F',
        toxina: 'Cianeto', toxina_en: 'Cyanide', toxina_es: 'Cianuro',
        sintomas: 'Tontura, convulsão, morte rápida (pequenos Pets).', sintomas_en: 'Dizziness, seizure, rapid death (small Pets).', sintomas_es: 'Mareos, convulsión, muerte rápida (mascotas pequeñas).',
        detalhe: 'As sementes de maçã e pêra contêm pequenas quantidades de cianeto. Para aves, apenas uma semente pode ser letal.', detalhe_en: 'Apple and pear seeds contain small amounts of cyanide. For birds, just one seed can be lethal.', detalhe_es: 'Las semillas de manzana y pera contienen pequeñas cantidades de cianuro. Para las aves, solo una semilla puede ser letal.'
    },
    {
        id: 'batata_crua',
        nome: 'Batata Crua', nome_en: 'Raw Potato', nome_es: 'Papa Cruda',
        emoji: '🥔',
        risco: 'MODERADO (Coelhos)', risco_en: 'MODERATE (Rabbits)', risco_es: 'MODERADO (Conejos)',
        cor: '#F57C00',
        toxina: 'Solanina', toxina_en: 'Solanine', toxina_es: 'Solanina',
        sintomas: 'Problemas gastrointestinais severos, paralisia.', sintomas_en: 'Severe gastrointestinal problems, paralysis.', sintomas_es: 'Problemas gastrointestinales severos, parálisis.',
        detalhe: 'Risco alto para coelhos e roedores. Batatas cruas ou com partes verdes são tóxicas.', detalhe_en: 'High risk for rabbits and rodents. Raw potatoes or those with green parts are toxic.', detalhe_es: 'Alto riesgo para conejos y roedores. Las papas crudas o con partes verdes son tóxicas.'
    },
    {
        id: 'cenoura',
        nome: 'Cenoura', nome_en: 'Carrot', nome_es: 'Zanahoria',
        emoji: '🥕',
        risco: 'SEGURO (com moderação)', risco_en: 'SAFE (in moderation)', risco_es: 'SEGURO (con moderación)',
        cor: '#4CAF50',
        toxina: 'Nenhuma', toxina_en: 'None', toxina_es: 'Ninguna',
        sintomas: 'Boa para os dentes e rica em vitaminas.', sintomas_en: 'Good for teeth and rich in vitamins.', sintomas_es: 'Buena para los dientes y rica en vitaminas.',
        detalhe: 'Pode ser oferecida crua ou cozida.', detalhe_en: 'Can be offered raw or cooked.', detalhe_es: 'Puede ofrecerse cruda o cocida.'
    },
    {
        id: 'maca',
        nome: 'Maçã (sem sementes)', nome_en: 'Apple (no seeds)', nome_es: 'Manzana (sin semillas)',
        emoji: '🍏',
        risco: 'SEGURO (com moderação)', risco_en: 'SAFE (in moderation)', risco_es: 'SEGURO (con moderación)',
        cor: '#4CAF50',
        toxina: 'Nenhuma', toxina_en: 'None', toxina_es: 'Ninguna',
        sintomas: 'Fonte de fibras e vitaminas.', sintomas_en: 'Source of fiber and vitamins.', sintomas_es: 'Fuente de fibra y vitaminas.',
        detalhe: 'Remova sempre as sementes.', detalhe_en: 'Always remove the seeds.', detalhe_es: 'Siempre retire las semillas.'
    },
    {
        id: 'banana',
        nome: 'Banana', nome_en: 'Banana', nome_es: 'Plátano',
        emoji: '🍌',
        risco: 'SEGURO (com moderação)', risco_en: 'SAFE (in moderation)', risco_es: 'SEGURO (con moderación)',
        cor: '#4CAF50',
        toxina: 'Nenhuma', toxina_en: 'None', toxina_es: 'Ninguna',
        sintomas: 'Fonte de potássio.', sintomas_en: 'Source of potassium.', sintomas_es: 'Fuente de potasio.',
        detalhe: 'Oferecer em pequenas quantidades.', detalhe_en: 'Offer in small quantities.', detalhe_es: 'Ofrecer en pequeñas cantidades.'
    },
    {
        id: 'arroz_cozido',
        nome: 'Arroz cozido', nome_en: 'Cooked rice', nome_es: 'Arroz cocido',
        emoji: '🍚',
        risco: 'SEGURO (com moderação)', risco_en: 'SAFE (in moderation)', risco_es: 'SEGURO (con moderación)',
        cor: '#4CAF50',
        toxina: 'Nenhuma', toxina_en: 'None', toxina_es: 'Ninguna',
        sintomas: 'Leve e fácil de digerir.', sintomas_en: 'Light and easy to digest.', sintomas_es: 'Ligero y fácil de digerir.',
        detalhe: 'Ótimo para dias com problemas estomacais.', detalhe_en: 'Great for days with stomach problems.', detalhe_es: 'Ideal para días con problemas estomacales.'
    },
    {
        id: 'frango_cozido',
        nome: 'Frango cozido', nome_en: 'Cooked chicken', nome_es: 'Pollo cocido',
        emoji: '🍗',
        risco: 'SEGURO (com moderação)', risco_en: 'SAFE (in moderation)', risco_es: 'SEGURO (con moderación)',
        cor: '#4CAF50',
        toxina: 'Nenhuma', toxina_en: 'None', toxina_es: 'Ninguna',
        sintomas: 'Proteína magra.', sintomas_en: 'Lean protein.', sintomas_es: 'Proteína magra.',
        detalhe: 'Sempre sem tempero e sem ossos.', detalhe_en: 'Always unseasoned and boneless.', detalhe_es: 'Siempre sin condimentar y sin huesos.'
    },
    {
        id: 'abobora',
        nome: 'Abóbora cozida', nome_en: 'Cooked pumpkin', nome_es: 'Calabaza cocida',
        emoji: '🎃',
        risco: 'SEGURO (com moderação)', risco_en: 'SAFE (in moderation)', risco_es: 'SEGURO (con moderación)',
        cor: '#4CAF50',
        toxina: 'Nenhuma', toxina_en: 'None', toxina_es: 'Ninguna',
        sintomas: 'Boa para digestão.', sintomas_en: 'Good for digestion.', sintomas_es: 'Buena para la digestión.',
        detalhe: 'Regula o trânsito intestinal.', detalhe_en: 'Regulates intestinal transit.', detalhe_es: 'Regula el tránsito intestinal.'
    }
];
