/**
 * regras_inforotulos.js — os textos que o motor de regras do Info Rótulos mostra.
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * Até 28/10/2026 estes textos moravam dentro de services/InfoRotulosRuleEngine.js:
 * cerca de 40 frases de segurança — toxicidade por espécie ("FATAL para gatos…"),
 * avisos para criança, gestante e idoso, alergia. Em português, sem tradução, e
 * fora da trava de revisão, que só varre data/, screens/ e components/. O
 * Agnaldo nunca os leu, e eram exibidos como informação do app.
 *
 * AQUI eles são conteúdo como qualquer outro: pt-BR é a fonte, com sufixo
 * _en / _es / _ptpt, lidos por t_field(). Todos entram na revisão dele como
 * PENDENTES (ver docs/revisao-conteudo/_registro-revisao.json).
 *
 * O QUE MUDOU NO TEXTO (e o que não mudou)
 * - Mesmas frases, mesmas severidades, mesmas regras de quando aparecem.
 * - SAIU "Dose mínima letal: 10mg/kg." da frase do paracetamol para gatos: é um
 *   número de dose escrito sem fonte, e uma afirmação numérica de letalidade em
 *   app de segurança precisa de referência. O resto da frase ficou.
 * - Os marcadores {{nome}}, {{nomes}}, {{especie}}, {{alergeno}} e {{lista}} são
 *   preenchidos pelo motor. Ficam em minúsculas de propósito: o resolvedor de
 *   tokens de emergência só troca os nomes em MAIÚSCULAS e deixa estes em paz.
 * - As regras de mistura perigosa NÃO têm texto aqui: vêm de
 *   data/safety_mixtures.js, a versão canônica e já revisada (ver MISTURAS_DO_PRODUTO).
 */

// ── Rótulo da severidade ─────────────────────────────────────────────────────
// Cor, nível e ícone ficam no motor (são design, não texto).
export const SEVERIDADES = {
    CRITICAL: { label: 'CRÍTICO', label_en: 'CRITICAL', label_es: 'CRÍTICO', label_ptpt: 'CRÍTICO' },
    HIGH:     { label: 'ALTO',    label_en: 'HIGH',     label_es: 'ALTO',    label_ptpt: 'ALTO' },
    MEDIUM:   { label: 'MÉDIO',   label_en: 'MEDIUM',   label_es: 'MEDIO',   label_ptpt: 'MÉDIO' },
    LOW:      { label: 'BAIXO',   label_en: 'LOW',      label_es: 'BAJO',    label_ptpt: 'BAIXO' },
    INFO:     { label: 'INFO',    label_en: 'INFO',     label_es: 'INFO',    label_ptpt: 'INFO' },
};

// ── Como cada espécie se chama no título do alerta ───────────────────────────
// `plural` entra no resumo da família ("2 gatos"); `outro` cobre o que o motor
// não reconhece como gato, cachorro, ave ou peixe.
export const ESPECIES = {
    gato: {
        nome: 'gato', nome_en: 'cat', nome_es: 'gato', nome_ptpt: 'gato',
        plural: 'gatos', plural_en: 'cats', plural_es: 'gatos', plural_ptpt: 'gatos',
    },
    cachorro: {
        nome: 'cachorro', nome_en: 'dog', nome_es: 'perro', nome_ptpt: 'cão',
        plural: 'cachorros', plural_en: 'dogs', plural_es: 'perros', plural_ptpt: 'cães',
    },
    ave: {
        nome: 'ave', nome_en: 'bird', nome_es: 'ave', nome_ptpt: 'ave',
        plural: 'aves', plural_en: 'birds', plural_es: 'aves', plural_ptpt: 'aves',
    },
    peixe: {
        nome: 'peixe', nome_en: 'fish', nome_es: 'pez', nome_ptpt: 'peixe',
        plural: 'peixes', plural_en: 'fish', plural_es: 'peces', plural_ptpt: 'peixes',
    },
    reptil: {
        nome: 'réptil', nome_en: 'reptile', nome_es: 'reptil', nome_ptpt: 'réptil',
        plural: 'répteis', plural_en: 'reptiles', plural_es: 'reptiles', plural_ptpt: 'répteis',
    },
    outro: {
        nome: 'outro animal', nome_en: 'other pet', nome_es: 'otra mascota', nome_ptpt: 'outro animal',
        plural: 'outros animais', plural_en: 'other pets', plural_es: 'otras mascotas', plural_ptpt: 'outros animais',
    },
};

// ── Toxicidade por espécie ───────────────────────────────────────────────────
// `match` testa o nome do produto e cada componente. Uma regra por pet por
// produto: vale a primeira que casar, então a ORDEM é a da gravidade.
export const TOXICIDADE_PETS = {
    gato: [
        {
            match: /paracetamol|acetaminophen|tylenol/i, severity: 'CRITICAL',
            mensagem: 'FATAL para gatos — causa anemia hemolítica e asfixia celular.',
            mensagem_en: 'FATAL to cats — causes hemolytic anemia and cellular asphyxiation.',
            mensagem_es: 'FATAL para los gatos: causa anemia hemolítica y asfixia celular.',
            mensagem_ptpt: 'FATAL para gatos — causa anemia hemolítica e asfixia celular.',
        },
        {
            match: /fenol|phenol|creosol|cresol/i, severity: 'CRITICAL',
            mensagem: 'Altamente tóxico para gatos — deficiência enzimática impede metabolização. Evite desinfetantes com fenol.',
            mensagem_en: 'Highly toxic to cats — an enzyme deficiency keeps them from metabolizing it. Avoid disinfectants that contain phenol.',
            mensagem_es: 'Altamente tóxico para los gatos: una deficiencia enzimática les impide metabolizarlo. Evite los desinfectantes con fenol.',
            mensagem_ptpt: 'Altamente tóxico para gatos — uma deficiência enzimática impede a metabolização. Evite desinfetantes com fenol.',
        },
        {
            match: /permetrina|permethrin/i, severity: 'CRITICAL',
            mensagem: 'FATAL para gatos — nunca aplicar antipulgas de cão em gato.',
            mensagem_en: 'FATAL to cats — never apply a dog flea treatment to a cat.',
            mensagem_es: 'FATAL para los gatos: nunca aplique un antipulgas de perro a un gato.',
            mensagem_ptpt: 'FATAL para gatos — nunca aplicar antipulgas de cão num gato.',
        },
        {
            match: /etilenoglicol|ethylene.?glycol|anticongelante/i, severity: 'CRITICAL',
            mensagem: 'Fatal para gatos e cães — sabor adocicado atrai pets. Causa falência renal rápida.',
            mensagem_en: 'Fatal to cats and dogs — its sweet taste attracts pets. Causes rapid kidney failure.',
            mensagem_es: 'Fatal para gatos y perros: su sabor dulce atrae a las mascotas. Provoca insuficiencia renal rápida.',
            mensagem_ptpt: 'Fatal para gatos e cães — o sabor adocicado atrai os animais. Causa falência renal rápida.',
        },
        {
            match: /óleo.*essencial.*melaleuca|tea.?tree/i, severity: 'HIGH',
            mensagem: 'Tóxico para gatos — não usar difusores em ambientes com felinos.',
            mensagem_en: 'Toxic to cats — do not use diffusers in homes with cats.',
            mensagem_es: 'Tóxico para los gatos: no use difusores en ambientes con felinos.',
            mensagem_ptpt: 'Tóxico para gatos — não usar difusores em ambientes com felinos.',
        },
        {
            match: /ibuprofeno|ibuprofen/i, severity: 'HIGH',
            mensagem: 'Tóxico para gatos e cães — pode causar úlceras gástricas e falência renal.',
            mensagem_en: 'Toxic to cats and dogs — can cause stomach ulcers and kidney failure.',
            mensagem_es: 'Tóxico para gatos y perros: puede causar úlceras gástricas e insuficiencia renal.',
            mensagem_ptpt: 'Tóxico para gatos e cães — pode causar úlceras gástricas e falência renal.',
        },
        {
            match: /\bcloro\b|hipoclorito|isocianurato|tricloro|chlorine|bleach/i, severity: 'MEDIUM',
            mensagem: 'Irritante severo para mucosas felinas. Enxaguar piso completamente antes de liberar acesso ao pet.',
            mensagem_en: 'Severe irritant to feline mucous membranes. Rinse the floor thoroughly before letting the pet back in.',
            mensagem_es: 'Irritante grave para las mucosas de los felinos. Enjuague bien el suelo antes de permitir el acceso a la mascota.',
            mensagem_ptpt: 'Irritante grave para as mucosas dos felinos. Enxaguar bem o chão antes de deixar o animal voltar.',
        },
    ],
    cachorro: [
        {
            match: /etilenoglicol|ethylene.?glycol|anticongelante/i, severity: 'CRITICAL',
            mensagem: 'Fatal para cães — sabor adocicado os atrai. Falência renal em horas.',
            mensagem_en: 'Fatal to dogs — the sweet taste attracts them. Kidney failure within hours.',
            mensagem_es: 'Fatal para los perros: el sabor dulce los atrae. Insuficiencia renal en pocas horas.',
            mensagem_ptpt: 'Fatal para cães — o sabor adocicado atrai-os. Falência renal em poucas horas.',
        },
        {
            match: /xilitol|xylitol/i, severity: 'CRITICAL',
            mensagem: 'EXTREMAMENTE tóxico para cães — hipoglicemia e falência hepática fulminante.',
            mensagem_en: 'EXTREMELY toxic to dogs — hypoglycemia and fulminant liver failure.',
            mensagem_es: 'EXTREMADAMENTE tóxico para los perros: hipoglucemia e insuficiencia hepática fulminante.',
            mensagem_ptpt: 'EXTREMAMENTE tóxico para cães — hipoglicemia e insuficiência hepática fulminante.',
        },
        {
            match: /raticida|brodifacoum|warfarin|cumarínico/i, severity: 'CRITICAL',
            mensagem: 'Fatal para cães — causa hemorragia interna. Sintomas podem levar dias para aparecer.',
            mensagem_en: 'Fatal to dogs — causes internal bleeding. Symptoms can take days to appear.',
            mensagem_es: 'Fatal para los perros: causa hemorragia interna. Los síntomas pueden tardar días en aparecer.',
            mensagem_ptpt: 'Fatal para cães — causa hemorragia interna. Os sintomas podem demorar dias a aparecer.',
        },
        {
            match: /ibuprofeno|ibuprofen/i, severity: 'HIGH',
            mensagem: 'Tóxico para cães — pode causar úlceras gástricas e falência renal.',
            mensagem_en: 'Toxic to dogs — can cause stomach ulcers and kidney failure.',
            mensagem_es: 'Tóxico para los perros: puede causar úlceras gástricas e insuficiencia renal.',
            mensagem_ptpt: 'Tóxico para cães — pode causar úlceras gástricas e falência renal.',
        },
        {
            match: /chocolate|teobromina|theobromine/i, severity: 'HIGH',
            mensagem: 'Tóxico para cães — chocolate amargo é mais perigoso que ao leite.',
            mensagem_en: 'Toxic to dogs — dark chocolate is more dangerous than milk chocolate.',
            mensagem_es: 'Tóxico para los perros: el chocolate negro es más peligroso que el de leche.',
            mensagem_ptpt: 'Tóxico para cães — o chocolate negro é mais perigoso do que o de leite.',
        },
    ],
    ave: [
        {
            match: /teflon|ptfe|politetrafluoretileno/i, severity: 'CRITICAL',
            mensagem: 'FATAL para aves — vapores de panelas antiaderentes superaquecidas causam morte rápida.',
            mensagem_en: 'FATAL to birds — fumes from overheated non-stick cookware cause rapid death.',
            mensagem_es: 'FATAL para las aves: los vapores de sartenes antiadherentes sobrecalentadas causan la muerte rápidamente.',
            mensagem_ptpt: 'FATAL para aves — os vapores de panelas antiaderentes sobreaquecidas causam morte rápida.',
        },
        {
            match: /aerossol|spray|inseticida/i, severity: 'HIGH',
            mensagem: 'Sistema respiratório de aves é extremamente sensível. Nunca use sprays perto de viveiros.',
            mensagem_en: 'Birds have an extremely sensitive respiratory system. Never use sprays near aviaries.',
            mensagem_es: 'El sistema respiratorio de las aves es extremadamente sensible. Nunca use aerosoles cerca de las jaulas.',
            mensagem_ptpt: 'O sistema respiratório das aves é extremamente sensível. Nunca use sprays perto de viveiros.',
        },
        {
            match: /\bcloro\b|hipoclorito|isocianurato|tricloro|bleach/i, severity: 'HIGH',
            mensagem: 'Vapores de cloro são tóxicos para aves. Ventilar antes de devolver ao ambiente.',
            mensagem_en: 'Chlorine fumes are toxic to birds. Ventilate before bringing them back into the room.',
            mensagem_es: 'Los vapores de cloro son tóxicos para las aves. Ventile antes de devolverlas al ambiente.',
            mensagem_ptpt: 'Os vapores de cloro são tóxicos para as aves. Ventilar antes de as devolver ao ambiente.',
        },
    ],
    peixe: [
        {
            match: /inseticida|piretróide|pyrethroid|piretrina/i, severity: 'CRITICAL',
            mensagem: 'FATAL para peixes — piretróides são extremamente tóxicos em ambiente aquático.',
            mensagem_en: 'FATAL to fish — pyrethroids are extremely toxic in aquatic environments.',
            mensagem_es: 'FATAL para los peces: los piretroides son extremadamente tóxicos en medio acuático.',
            mensagem_ptpt: 'FATAL para peixes — os piretroides são extremamente tóxicos em meio aquático.',
        },
        {
            match: /\bcloro\b|hipoclorito|isocianurato|tricloro|bleach/i, severity: 'CRITICAL',
            mensagem: 'Cloro é letal para peixes. Nunca descartar produto com cloro em aquários ou fontes.',
            mensagem_en: 'Chlorine is lethal to fish. Never pour chlorine products into aquariums or fountains.',
            mensagem_es: 'El cloro es letal para los peces. Nunca vierta productos con cloro en acuarios ni en fuentes.',
            mensagem_ptpt: 'O cloro é letal para os peixes. Nunca despejar produtos com cloro em aquários ou fontes.',
        },
    ],
};

// ── Alertas por perfil da família ────────────────────────────────────────────
export const ALERTAS = {
    criancaMenor3: {
        titulo: 'Perigo para {{nomes}}',
        titulo_en: 'Danger for {{nomes}}',
        titulo_es: 'Peligro para {{nomes}}',
        titulo_ptpt: 'Perigo para {{nomes}}',
        mensagem: 'Produto com substâncias corrosivas ou tóxicas. Crianças menores de 3 anos exploram TUDO com a boca. Manter absolutamente fora de alcance, preferencialmente trancado.',
        mensagem_en: 'Product with corrosive or toxic substances. Children under 3 explore EVERYTHING with their mouths. Keep it completely out of reach, preferably locked away.',
        mensagem_es: 'Producto con sustancias corrosivas o tóxicas. Los niños menores de 3 años lo exploran TODO con la boca. Manténgalo totalmente fuera de su alcance, preferiblemente bajo llave.',
        mensagem_ptpt: 'Produto com substâncias corrosivas ou tóxicas. As crianças com menos de 3 anos exploram TUDO com a boca. Manter totalmente fora do alcance, de preferência fechado à chave.',
        acao: 'Armazene em armário alto com trava de segurança.',
        acao_en: 'Store it in a high cabinet with a safety lock.',
        acao_es: 'Guárdelo en un armario alto con cierre de seguridad.',
        acao_ptpt: 'Guarde num armário alto com fecho de segurança.',
    },
    criancaMenor12: {
        titulo: 'Atenção: produto perigoso na casa',
        titulo_en: 'Warning: hazardous product in the home',
        titulo_es: 'Atención: producto peligroso en casa',
        titulo_ptpt: 'Atenção: produto perigoso em casa',
        mensagem: 'Substância tóxica ou corrosiva. Crianças em idade escolar já conseguem abrir embalagens. Oriente sobre o perigo.',
        mensagem_en: 'Toxic or corrosive substance. School-age children can already open packaging. Talk to them about the danger.',
        mensagem_es: 'Sustancia tóxica o corrosiva. Los niños en edad escolar ya pueden abrir envases. Explíqueles el peligro.',
        mensagem_ptpt: 'Substância tóxica ou corrosiva. As crianças em idade escolar já conseguem abrir embalagens. Explique-lhes o perigo.',
        acao: 'Converse sobre segurança. Mantenha fora do alcance.',
        acao_en: 'Talk about safety. Keep it out of reach.',
        acao_es: 'Hable sobre seguridad. Manténgalo fuera de su alcance.',
        acao_ptpt: 'Converse sobre segurança. Mantenha fora do alcance.',
    },
    gestante: {
        titulo: 'Risco na gestação para {{nomes}}',
        titulo_en: 'Pregnancy risk for {{nomes}}',
        titulo_es: 'Riesgo en el embarazo para {{nomes}}',
        titulo_ptpt: 'Risco na gravidez para {{nomes}}',
        mensagem: 'Produto contém substâncias com potencial teratogênico, genotóxico ou carcinogênico. Evite exposição direta durante a gestação. Prefira alternativas seguras.',
        mensagem_en: 'This product contains substances with teratogenic, genotoxic or carcinogenic potential. Avoid direct exposure during pregnancy. Prefer safer alternatives.',
        mensagem_es: 'El producto contiene sustancias con potencial teratogénico, genotóxico o carcinogénico. Evite la exposición directa durante el embarazo. Prefiera alternativas seguras.',
        mensagem_ptpt: 'O produto contém substâncias com potencial teratogénico, genotóxico ou cancerígeno. Evite a exposição direta durante a gravidez. Prefira alternativas seguras.',
        acao: 'Peça a outra pessoa para manusear este produto.',
        acao_en: 'Ask someone else to handle this product.',
        acao_es: 'Pida a otra persona que manipule este producto.',
        acao_ptpt: 'Peça a outra pessoa para manusear este produto.',
    },
    gestanteSolvente: {
        titulo: 'Solvente — evitar na gestação',
        titulo_en: 'Solvent — avoid during pregnancy',
        titulo_es: 'Disolvente: evitar durante el embarazo',
        titulo_ptpt: 'Solvente — evitar na gravidez',
        mensagem: 'Produtos que causam sonolência/tontura podem conter solventes orgânicos prejudiciais ao desenvolvimento fetal.',
        mensagem_en: 'Products that cause drowsiness or dizziness may contain organic solvents harmful to fetal development.',
        mensagem_es: 'Los productos que provocan somnolencia o mareo pueden contener disolventes orgánicos perjudiciales para el desarrollo fetal.',
        mensagem_ptpt: 'Produtos que causam sonolência/tonturas podem conter solventes orgânicos prejudiciais ao desenvolvimento fetal.',
        acao: 'Ventile o ambiente. Evite inalação prolongada.',
        acao_en: 'Ventilate the room. Avoid prolonged inhalation.',
        acao_es: 'Ventile el ambiente. Evite la inhalación prolongada.',
        acao_ptpt: 'Ventile o espaço. Evite a inalação prolongada.',
    },
    idoso: {
        titulo: 'Cuidado para {{nomes}}',
        titulo_en: 'Take care: {{nomes}}',
        titulo_es: 'Cuidado para {{nomes}}',
        titulo_ptpt: 'Cuidado para {{nomes}}',
        mensagem: 'Produto com irritantes respiratórios ou neurotóxicos. Idosos têm maior sensibilidade a vapores e risco aumentado de tontura/queda.',
        mensagem_en: 'Product with respiratory irritants or neurotoxic substances. Older adults are more sensitive to fumes and have a higher risk of dizziness and falls.',
        mensagem_es: 'Producto con irritantes respiratorios o neurotóxicos. Las personas mayores son más sensibles a los vapores y tienen mayor riesgo de mareo y caídas.',
        mensagem_ptpt: 'Produto com irritantes respiratórios ou neurotóxicos. Os idosos são mais sensíveis aos vapores e têm maior risco de tonturas e quedas.',
        acao: 'Use em local bem ventilado. Evite uso prolongado.',
        acao_en: 'Use in a well-ventilated place. Avoid prolonged use.',
        acao_es: 'Úselo en un lugar bien ventilado. Evite el uso prolongado.',
        acao_ptpt: 'Utilize em local bem ventilado. Evite o uso prolongado.',
    },
    pet: {
        titulo: 'Tóxico para {{nome}} ({{especie}})',
        titulo_en: 'Toxic to {{nome}} ({{especie}})',
        titulo_es: 'Tóxico para {{nome}} ({{especie}})',
        titulo_ptpt: 'Tóxico para {{nome}} ({{especie}})',
        acao: 'Mantenha fora do alcance de {{nome}}. Em caso de contato, procure veterinário de emergência.',
        acao_en: "Keep it out of {{nome}}'s reach. If contact occurs, go to an emergency vet.",
        acao_es: 'Manténgalo fuera del alcance de {{nome}}. En caso de contacto, acuda a un veterinario de urgencias.',
        acao_ptpt: 'Mantenha fora do alcance de {{nome}}. Em caso de contacto, procure um veterinário de urgência.',
    },
    alergia: {
        titulo: 'Alergia de {{nome}}: {{alergeno}}',
        titulo_en: "{{nome}}'s allergy: {{alergeno}}",
        titulo_es: 'Alergia de {{nome}}: {{alergeno}}',
        titulo_ptpt: 'Alergia de {{nome}}: {{alergeno}}',
        mensagem: 'Este produto pode conter "{{alergeno}}", listada como alergia de {{nome}}. Evite contato direto.',
        mensagem_en: 'This product may contain "{{alergeno}}", listed as an allergy for {{nome}}. Avoid direct contact.',
        mensagem_es: 'Este producto puede contener "{{alergeno}}", registrada como alergia de {{nome}}. Evite el contacto directo.',
        mensagem_ptpt: 'Este produto pode conter "{{alergeno}}", registado como alergia de {{nome}}. Evite o contacto direto.',
        acao: 'Verifique o rótulo completo. Use luvas se necessário.',
        acao_en: 'Check the full label. Wear gloves if necessary.',
        acao_es: 'Revise la etiqueta completa. Use guantes si es necesario.',
        acao_ptpt: 'Verifique o rótulo completo. Use luvas, se necessário.',
    },
    misturas: {
        titulo: 'NUNCA misturar com outros produtos',
        titulo_en: 'NEVER mix with other products',
        titulo_es: 'NUNCA mezcle con otros productos',
        titulo_ptpt: 'NUNCA misturar com outros produtos',
        mensagem: 'Combinações perigosas com este produto: {{lista}}.',
        mensagem_en: 'Dangerous combinations with this product: {{lista}}.',
        mensagem_es: 'Combinaciones peligrosas con este producto: {{lista}}.',
        mensagem_ptpt: 'Combinações perigosas com este produto: {{lista}}.',
        acao: 'Use um produto de cada vez e ventile o ambiente. Detalhes em Aprendizado → Misturas Perigosas.',
        acao_en: 'Use one product at a time and ventilate the room. Details in Learn → Dangerous Mixtures.',
        acao_es: 'Use un producto cada vez y ventile el ambiente. Detalles en Aprender → Mezclas Peligrosas.',
        acao_ptpt: 'Utilize um produto de cada vez e ventile o espaço. Detalhes em Aprender → Misturas Perigosas.',
    },
    // Remédio ou suplemento no produto: guarda segura para quem mora com criança ou animal.
    // Não é aviso sobre USAR o remédio (isso é com médico e bula): é sobre onde ele fica.
    medicamento: {
        titulo: 'Medicamento ou suplemento na casa',
        titulo_en: 'Medicine or supplement in the home',
        titulo_es: 'Medicamento o suplemento en casa',
        titulo_ptpt: 'Medicamento ou suplemento em casa',
        mensagem: 'Remédios de uso humano estão entre as causas mais comuns de intoxicação de crianças e de animais em casa, e uma dose segura para um adulto pode ser perigosa para eles. Guarde na embalagem original, fora do alcance e da vista.',
        mensagem_en: 'Human medicines are among the most common causes of poisoning in children and pets at home, and a dose that is safe for an adult can be dangerous for them. Keep it in its original packaging, out of reach and out of sight.',
        mensagem_es: 'Los medicamentos de uso humano figuran entre las causas más comunes de intoxicación de niños y mascotas en casa, y una dosis segura para un adulto puede ser peligrosa para ellos. Guárdelo en su envase original, fuera del alcance y de la vista.',
        mensagem_ptpt: 'Os medicamentos de uso humano estão entre as causas mais comuns de intoxicação de crianças e animais em casa, e uma dose segura para um adulto pode ser perigosa para eles. Guarde na embalagem original, fora do alcance e da vista.',
        acao: 'Se alguém ou algum animal engolir, não provoque vômito. Pessoas: {{POISON_CONTROL}}. Animais: veterinário de emergência.',
        acao_en: 'If a person or an animal swallows it, do not induce vomiting. People: {{POISON_CONTROL}}. Animals: emergency veterinarian.',
        acao_es: 'Si una persona o un animal lo traga, no provoque el vómito. Personas: {{POISON_CONTROL}}. Animales: veterinario de urgencias.',
        acao_ptpt: 'Se uma pessoa ou um animal engolir, não provoque o vómito. Pessoas: {{POISON_CONTROL}}. Animais: veterinário de urgência.',
    },
};

// ── Quais misturas de data/safety_mixtures.js cada tipo de produto dispara ───
// `secoes` são os `id` das seções de SAFETY_MIXTURES, na ordem em que aparecem.
// Por padrão testa só o NOME do produto. `emComponentes` testa também cada
// componente — só para cloro, amônia e peróxido, que são o princípio ativo da
// mistura. Álcool e ácido ficam só no nome: "álcool cetílico" está em metade dos
// cosméticos e não faz mistura nenhuma com água sanitária. O ácido é restrito a
// ácido de LIMPEZA: o motor antigo casava qualquer "ácido" no nome, inclusive o
// "ácido acetilsalicílico".
export const MISTURAS_DO_PRODUTO = [
    { match: /\bcloro\b|hipoclorito|água.?sanitária|agua.?sanitaria|bleach|lixívia|lixivia|lejía|lejia/i,
      secoes: ['cloro_acidos', 'cloro_amonia', 'cloro_alcool'], emComponentes: true },
    { match: /amônia|amoníaco|amoniaco|ammonia/i,
      secoes: ['cloro_amonia'], emComponentes: true },
    { match: /vinagre|vinegar|ácido (muriático|clorídrico|sulfúrico|fosfórico)|acido (muriatico|clorhidrico)|muriatic|hydrochloric|salfumán|limpa.?pedras|removedor de ferrugem|rust remover/i,
      secoes: ['cloro_acidos'] },
    { match: /vinagre|vinegar/i,
      secoes: ['oxigenada_vinagre'] },
    { match: /água.?oxigenada|agua.?oxigenada|peróxido de hidrogênio|peroxide|peróxido|peroxido/i,
      secoes: ['oxigenada_vinagre'], emComponentes: true },
    { match: /álcool|alcool|alcohol|etanol|ethanol/i,
      secoes: ['cloro_alcool'] },
    { match: /desentupidor|drain (cleaner|opener)|desatascador|desentupidor de (pia|ralo)/i,
      secoes: ['desentupidores'] },
];

// ── Resumo da família ("1 criança (bebê), 2 gatos") ──────────────────────────
// Aparece no card "Seu perfil familiar" do Info Rótulos e vira o contexto do
// pedido à IA. `um` e `varios` ficam na mesma linha para o plural não depender
// de regra de idioma. {{n}} é a contagem.
export const RESUMO_FAMILIA = {
    crianca: {
        um: '{{n}} criança', um_en: '{{n}} child', um_es: '{{n}} niño', um_ptpt: '{{n}} criança',
        varios: '{{n}} crianças', varios_en: '{{n}} children', varios_es: '{{n}} niños', varios_ptpt: '{{n}} crianças',
    },
    gestante: {
        um: '{{n}} gestante', um_en: '{{n}} pregnant person', um_es: '{{n}} gestante', um_ptpt: '{{n}} grávida',
        varios: '{{n}} gestantes', varios_en: '{{n}} pregnant people', varios_es: '{{n}} gestantes', varios_ptpt: '{{n}} grávidas',
    },
    idoso: {
        um: '{{n}} idoso (70+)', um_en: '{{n}} older adult (70+)', um_es: '{{n}} persona mayor (70+)', um_ptpt: '{{n}} idoso (70+)',
        varios: '{{n}} idosos (70+)', varios_en: '{{n}} older adults (70+)', varios_es: '{{n}} personas mayores (70+)', varios_ptpt: '{{n}} idosos (70+)',
    },
    bebe: { nome: 'bebê', nome_en: 'baby', nome_es: 'bebé', nome_ptpt: 'bebé' },
    ano: {
        um: '{{n}} ano', um_en: '{{n}} year', um_es: '{{n}} año', um_ptpt: '{{n}} ano',
        varios: '{{n}} anos', varios_en: '{{n}} years', varios_es: '{{n}} años', varios_ptpt: '{{n}} anos',
    },
};

// ── Nível de perigo de um produto, como aparece na pílula ────────────────────
// A chave é o valor que o catálogo e as bases gravam em `perigo`. Combinações do
// catálogo ("Médio (Humanos) / Mortal (Gatos)") não estão aqui: mantêm o texto
// original, porque o qualificador é parte da informação.
export const ROTULO_DO_PERIGO = {
    'Extremo':       { label: 'Extremo',       label_en: 'Extreme',      label_es: 'Extremo',   label_ptpt: 'Extremo' },
    'Muito Alto':    { label: 'Muito alto',    label_en: 'Very high',    label_es: 'Muy alto',  label_ptpt: 'Muito alto' },
    'Alto':          { label: 'Alto',          label_en: 'High',         label_es: 'Alto',      label_ptpt: 'Alto' },
    'Médio':         { label: 'Médio',         label_en: 'Medium',       label_es: 'Medio',     label_ptpt: 'Médio' },
    'Baixo':         { label: 'Baixo',         label_en: 'Low',          label_es: 'Bajo',      label_ptpt: 'Baixo' },
    'Indeterminado': { label: 'Indeterminado', label_en: 'Undetermined', label_es: 'Indeterminado', label_ptpt: 'Indeterminado' },
};

// ── Como o RÓTULO LIDO vira nível de perigo e categorias ─────────────────────
// Um produto lido por foto não vem do catálogo: ninguém o curou. O perigo dele é
// o que o FABRICANTE imprimiu — palavra de sinal (PERIGO / ATENÇÃO / CUIDADO) e
// frases de perigo —, que a IA TRANSCREVE e que é classificado AQUI, por regras
// fixas e conferíveis. A IA lê; não julga ("app informa, não opina").
//
// POR QUE NÃO PELAS BASES QUÍMICAS (PubChem), que foi o desenho de 28/10/2026:
// elas só entendem nome em INGLÊS — "hipoclorito de sódio" não acha nada, nem sem
// acento — e descrevem a substância PURA, não o produto diluído: o cloreto de
// sódio sai "Alto" por classificações minoritárias. Resultado: toda foto de rótulo
// em português caía em "Perigo: Indeterminado" e o aviso para bebê, criança,
// gestante, idoso e alergia nunca disparava, nem para um produto escrito
// "CORROSIVO". O rótulo é a classificação do produto que está na mão da pessoa.
//
// O vocabulário de `categoria` é o de `ghs_categories` do catálogo, o mesmo que o
// motor de alertas (InfoRotulosRuleEngine, regras 1 a 6) já lê. Os níveis seguem
// calculateSeverity (InfoRotulosSubstanceService), para o mesmo código H dar o
// mesmo nível em qualquer caminho. Os padrões casam texto SEM acento e em
// minúsculas, em português, inglês e espanhol (rótulo importado), e também o código
// H impresso (H314 etc.).
//
// SÓ ESTAS REGRAS decidem o nível de um rótulo. Frase de perigo que elas não
// reconhecem deixa o produto em "Médio" (há advertência impressa), nunca mais
// baixo: sobre-alertar é o erro seguro, subestimar não. Negação curta ("não
// inflamável") é tratada em classificarRotulo. PARA REVISÃO DO AGNALDO: é a tabela
// que decide "Muito alto", "Alto" e "Médio" — a calibração é dele.

/** Do que a IA transcreveu em "palavra de sinal" ao valor canônico. O primeiro que casar vale (ordem = gravidade). */
export const PALAVRA_DE_SINAL = [
    { sinal: 'PERIGO',  padrao: /\b(perigo|danger|peligro)\b/ },
    { sinal: 'ATENÇÃO', padrao: /\b(atencao|warning|atencion)\b/ },
    { sinal: 'CUIDADO', padrao: /\b(cuidado|caution|precaucion)\b/ },
];

/**
 * Avisos impressos que NÃO são perigo: situação de venda, guarda, validade, forma de uso. A IA os
 * põe junto das "advertências" (estão mesmo na embalagem), mas não descrevem risco do produto: não
 * contam para o nível e, na tela, vão para "Prevenção". Texto sem acento e em minúsculas, como as
 * frases de perigo. Uma frase que casa AQUI e também com FRASES_DE_PERIGO ("Mantenha fora do
 * alcance. Corrosivo.") continua sendo perigo.
 */
export const AVISOS_QUE_NAO_SAO_PERIGO = [
    /fora do alcance|longe do alcance|out of reach|fuera del alcance/,
    /venda sob|prescricao|receita medica|uso sob|prescription only|con receta/,
    /uso (adulto|pediatrico|oral|externo|topico)|via oral|consulte (o|seu) medico|leia a bula|read the (leaflet|label)/,
    /validade|\blote\b|armazen|conserv(e|ar)|guard(e|ar)|proteg(er|ido) da (luz|umidade)|temperatura ambiente|\bstore\b/,
];

/** Nível mínimo que a palavra de sinal garante, mesmo que nenhuma frase seja reconhecida. */
export const PISO_DO_SINAL = { 'PERIGO': 'Alto', 'ATENÇÃO': 'Médio', 'CUIDADO': 'Médio' };

/** Do menos ao mais grave: a escala de NIVEIS_PERIGO (data/produtos_scanner.js). */
export const ORDEM_DO_PERIGO = ['Baixo', 'Médio', 'Alto', 'Muito Alto', 'Extremo'];

export const FRASES_DE_PERIGO = [
    // Fatal (H300, H310, H330)
    { nivel: 'Extremo', categoria: 'toxico_agudo_ingestao', padrao: /(fatal|mortal|letal)\s+(se|por|em caso de)\s+(inger|ingest)|\bh300\b|fatal if swallowed/ },
    { nivel: 'Extremo', categoria: 'toxico_agudo_inalacao', padrao: /(fatal|mortal|letal)\s+(se|por|em caso de)\s+inala|\bh330\b|fatal if inhaled/ },
    { nivel: 'Extremo', categoria: null, padrao: /(fatal|mortal|letal)\s+(em|por)\s+contato|pode\s+(causar\s+a\s+morte|ser\s+fatal)|risco\s+de\s+morte|\bh310\b/ },

    // Corrosivo, tóxico, câncer, mutagênico, feto, explosivo (H314, H301, H331, H350, H340, H360, H20x)
    { nivel: 'Muito Alto', categoria: 'corrosivo', padrao: /corrosiv|queimaduras?\s+(graves?|severas?|quimicas?)|(causa|provoca|pode\s+causar|pode\s+provocar)\s+queimaduras?|\bh314\b|severe\s+skin\s+burns|quemaduras\s+graves/ },
    { nivel: 'Muito Alto', categoria: 'toxico_agudo_ingestao', padrao: /toxic[oa]\s+(se|por|em caso de)\s+(inger|ingest)|\bh301\b|toxic\s+if\s+swallowed/ },
    { nivel: 'Muito Alto', categoria: 'toxico_agudo_inalacao', padrao: /toxic[oa]\s+(se|por|em caso de)\s+inala|\bh331\b|toxic\s+if\s+inhaled/ },
    { nivel: 'Muito Alto', categoria: 'carcinogenico', padrao: /cancer|cancerigen|carcinogen|\bh35[01]\b/ },
    { nivel: 'Muito Alto', categoria: 'genotóxico', padrao: /mutagen|alteracoes\s+geneticas|defeitos\s+geneticos|\bh34[01]\b/ },
    { nivel: 'Muito Alto', categoria: 'teratogeno', padrao: /fertilidade|(afetar|afeta|prejudicar|prejudica)\s+o\s+feto|teratogen|unborn\s+child|\bh36[01]\b/ },
    { nivel: 'Muito Alto', categoria: null, padrao: /explosiv|pode\s+explodir|risco\s+de\s+explosao/ },

    // Lesão ocular, nocivo, alérgeno, gás tóxico por mistura, inflamável, órgãos (H318, H302, H317, H334, EUH031, H22x, H37x)
    { nivel: 'Alto', categoria: 'irritante_ocular', padrao: /lesoes?\s+oculares?\s+graves?|danos?\s+(graves?\s+)?(aos|nos)\s+olhos|cegueira|serious\s+eye\s+damage|\bh318\b/ },
    { nivel: 'Alto', categoria: 'nocivo_ingestao', padrao: /(nocivo|prejudicial|perigos[oa])\s+(se|por|em caso de)\s+(inger|ingest)|harmful\s+if\s+swallowed|\bh302\b/ },
    { nivel: 'Alto', categoria: 'alergeno', padrao: /reacao\s+alergica|sensibilizante|pode\s+(causar|provocar)\s+alergia|allergic\s+(skin\s+)?reaction|\bh317\b|\bh334\b/ },
    { nivel: 'Alto', categoria: 'toxico_agudo_inalacao', padrao: /(libera|liberta|desprende|emite)\w*\s+(gas|gases|vapor|vapores)\s+toxic|gas(es)?\s+toxic|toxic\s+gas|\beuh03[12]\b/ },
    { nivel: 'Alto', categoria: 'dano_orgaos', padrao: /danos?\s+(aos|nos|a)\s+orgaos|organ\s+damage|\bh37[0-3]\b/ },
    { nivel: 'Alto', categoria: null, padrao: /inflamavel|flammable|inflamable|\bh22[0-5]\b/ },

    // Irritantes e solventes (H315, H319, H335, H336)
    { nivel: 'Médio', categoria: 'irritante_ocular', padrao: /irrita\w*[^.]{0,30}\bolhos\b|irritacao\s+ocular|eye\s+irritation|\bh319\b/ },
    { nivel: 'Médio', categoria: 'irritante_pele', padrao: /irrita\w*[^.]{0,30}\b(pele|cutanea|dermica)\b|irritacao\s+(cutanea|dermica)|skin\s+irritation|\bh315\b/ },
    { nivel: 'Médio', categoria: 'irritante_respiratorio', padrao: /irrita\w*[^.]{0,30}vias\s+respiratorias|vapores\s+irritantes|respiratory\s+irritation|\bh335\b/ },
    { nivel: 'Médio', categoria: 'neurotoxico', padrao: /sonolencia|vertigens?|tontura|drowsiness|dizziness|\bh336\b/ },
];

// ── Riscos comuns a cães e gatos: remédios de uso humano, alimentos e produtos da casa ──
// Até 28/10/2026 a lista de TOXICIDADE_PETS tinha 17 regras e NENHUM remédio de uso
// humano: um pet que engolisse o comprimido do dono não gerava alerta nenhum. Aqui
// entram os grupos mais comuns, com UMA mensagem por grupo (não uma por substância).
//
// COMO ESCREVER `match`: minúsculo e SEM acento. O motor testa o texto como veio E sem
// acento ("ácido acetilsalicílico" casa "acido acetilsalicilico"). Palavra ambígua leva
// \b ou a expressão inteira: "álcool" sozinho pegaria "álcool cetílico" (cosmético),
// "cloro" pegaria "clorofila", e "uva" pegaria "óleo de semente de uva".
//
// FONTE de conferência: lista de substâncias tóxicas da ASPCA (APCC) e Manual Veterinário
// Merck. NENHUMA dose: afirmação numérica de letalidade sem referência não entra (ver a
// retirada do "10mg/kg" do paracetamol). PARA REVISÃO — de preferência de um
// médico-veterinário: o Agnaldo é da segurança do trabalho, não da toxicologia animal.
// Gravidade por espécie: `cachorro`, `gato`, `ave`; sem a chave = a regra não vale para ela.
export const RISCOS_COMUNS_PETS = [
    {
        id: 'veneno_grave', cachorro: 'CRITICAL', gato: 'CRITICAL',
        match: /chumbinho|aldicarb|carbofurano|organofosforado|organophosphate|carbamato|metaldeido|metaldehyde|lesmicida|raticida|rodenticida|cumarinico|brodifacoum/i,
        mensagem: 'Veneno de ação rápida (chumbinho, raticida, lesmicida) — FATAL para cães e gatos. É emergência veterinária imediata.',
        mensagem_en: 'Fast-acting poison (rat poison, slug bait) — FATAL to dogs and cats. It is an immediate veterinary emergency.',
        mensagem_es: 'Veneno de acción rápida (raticida, molusquicida): FATAL para perros y gatos. Es una emergencia veterinaria inmediata.',
        mensagem_ptpt: 'Veneno de ação rápida (raticida, lesmicida) — FATAL para cães e gatos. É uma emergência veterinária imediata.',
    },
    {
        id: 'estimulante', cachorro: 'CRITICAL', gato: 'CRITICAL',
        match: /metilfenidato|methylphenidate|ritalina|concerta|lisdexanfetamina|venvanse|anfetamina|amphetamine|dexanfetamina|modafinila/i,
        mensagem: 'Estimulante (como os usados para TDAH) — causa tremores, convulsões e disparo do coração em cães e gatos. É emergência veterinária.',
        mensagem_en: 'Stimulant (such as ADHD medication) — causes tremors, seizures and a racing heart in dogs and cats. It is a veterinary emergency.',
        mensagem_es: 'Estimulante (como los del TDAH): causa temblores, convulsiones y taquicardia en perros y gatos. Es una emergencia veterinaria.',
        mensagem_ptpt: 'Estimulante (como os usados para a PHDA) — causa tremores, convulsões e coração acelerado em cães e gatos. É uma emergência veterinária.',
    },
    {
        id: 'baclofeno', cachorro: 'CRITICAL', gato: 'CRITICAL',
        match: /baclofeno|baclofen/i,
        mensagem: 'Relaxante muscular (baclofeno) — muito tóxico para cães e gatos: causa fraqueza, convulsões e parada da respiração.',
        mensagem_en: 'Muscle relaxant (baclofen) — very toxic to dogs and cats: causes weakness, seizures and breathing failure.',
        mensagem_es: 'Relajante muscular (baclofeno): muy tóxico para perros y gatos; causa debilidad, convulsiones y paro respiratorio.',
        mensagem_ptpt: 'Relaxante muscular (baclofeno) — muito tóxico para cães e gatos: causa fraqueza, convulsões e paragem respiratória.',
    },
    {
        id: 'minoxidil', cachorro: 'HIGH', gato: 'CRITICAL',
        match: /minoxidil|rogaine|regaine/i,
        mensagem: 'Minoxidil (para queda de cabelo) — extremamente tóxico para gatos e perigoso para cães: o contato com a pele de quem usou, ou lamber o produto, pode causar falência do coração e do pulmão.',
        mensagem_en: 'Minoxidil (hair-loss treatment) — extremely toxic to cats and dangerous to dogs: contact with the skin of someone who used it, or licking the product, can cause heart and lung failure.',
        mensagem_es: 'Minoxidil (para la caída del cabello): extremadamente tóxico para los gatos y peligroso para los perros; el contacto con la piel de quien lo usó, o lamer el producto, puede causar insuficiencia cardíaca y pulmonar.',
        mensagem_ptpt: 'Minoxidil (para a queda de cabelo) — extremamente tóxico para gatos e perigoso para cães: o contacto com a pele de quem o usou, ou lamber o produto, pode causar falência do coração e do pulmão.',
    },
    {
        id: 'aine', cachorro: 'HIGH', gato: 'HIGH',
        match: /ibuprofeno|ibuprofen|naproxeno|naproxen|diclofenaco|diclofenac|cetoprofeno|ketoprofen|nimesulida|meloxicam|piroxicam|etoricoxibe|celecoxibe|indometacina|cetorolaco|ketorolac|acido acetilsalicilico|aspirina|aspirin/i,
        mensagem: 'Anti-inflamatório de uso humano — causa úlcera no estômago e lesão nos rins em cães e gatos, mesmo em dose pequena.',
        mensagem_en: 'Human anti-inflammatory — causes stomach ulcers and kidney damage in dogs and cats, even in small doses.',
        mensagem_es: 'Antiinflamatorio de uso humano: causa úlceras de estómago y daño renal en perros y gatos, incluso en dosis pequeñas.',
        mensagem_ptpt: 'Anti-inflamatório de uso humano — causa úlcera no estômago e lesão nos rins em cães e gatos, mesmo em dose pequena.',
    },
    {
        id: 'paracetamol_cao', cachorro: 'HIGH',
        match: /paracetamol|acetaminofeno|acetaminophen|tylenol/i,
        mensagem: 'Paracetamol é tóxico para cães — pode lesar o fígado e o sangue.',
        mensagem_en: 'Paracetamol (acetaminophen) is toxic to dogs — it can damage the liver and the blood.',
        mensagem_es: 'El paracetamol es tóxico para los perros: puede dañar el hígado y la sangre.',
        mensagem_ptpt: 'O paracetamol é tóxico para cães — pode lesar o fígado e o sangue.',
    },
    {
        id: 'antidepressivo', cachorro: 'HIGH', gato: 'HIGH',
        match: /escitalopram|citalopram|fluoxetina|fluoxetine|sertralina|sertraline|paroxetina|venlafaxina|duloxetina|amitriptilina|nortriptilina|clomipramina|bupropiona|trazodona|mirtazapina|fluvoxamina/i,
        mensagem: 'Antidepressivo de uso humano — pode causar tremores, agitação, convulsões e alteração do coração em cães e gatos.',
        mensagem_en: 'Human antidepressant — can cause tremors, agitation, seizures and heart rhythm changes in dogs and cats.',
        mensagem_es: 'Antidepresivo de uso humano: puede causar temblores, agitación, convulsiones y alteraciones del corazón en perros y gatos.',
        mensagem_ptpt: 'Antidepressivo de uso humano — pode causar tremores, agitação, convulsões e alterações do coração em cães e gatos.',
    },
    {
        id: 'calmante', cachorro: 'HIGH', gato: 'HIGH',
        match: /diazepam|clonazepam|alprazolam|lorazepam|bromazepam|midazolam|zolpidem|rivotril|lexotan|stilnox|buspirona/i,
        mensagem: 'Calmante ou remédio para dormir — pode causar sedação profunda ou, ao contrário, agitação e falta de coordenação em cães e gatos.',
        mensagem_en: 'Sedative or sleeping pill — can cause deep sedation or, the opposite, agitation and loss of coordination in dogs and cats.',
        mensagem_es: 'Calmante o somnífero: puede causar sedación profunda o, al contrario, agitación y falta de coordinación en perros y gatos.',
        mensagem_ptpt: 'Calmante ou comprimido para dormir — pode causar sedação profunda ou, ao contrário, agitação e falta de coordenação em cães e gatos.',
    },
    {
        id: 'opioide', cachorro: 'HIGH', gato: 'HIGH',
        match: /tramadol|codeina|morfina|oxicodona|fentanil|metadona|hidrocodona/i,
        mensagem: 'Analgésico opioide — causa sedação intensa e queda da respiração em cães e gatos; nos gatos pode causar também agitação.',
        mensagem_en: 'Opioid painkiller — causes deep sedation and slowed breathing in dogs and cats; in cats it can also cause agitation.',
        mensagem_es: 'Analgésico opioide: causa sedación intensa y respiración lenta en perros y gatos; en los gatos también puede causar agitación.',
        mensagem_ptpt: 'Analgésico opioide — causa sedação intensa e respiração lenta em cães e gatos; nos gatos pode causar também agitação.',
    },
    {
        id: 'hipoglicemiante', cachorro: 'HIGH', gato: 'HIGH',
        match: /glibenclamida|glimepirida|gliclazida|glipizida|insulina|insulin/i,
        mensagem: 'Remédio para diabetes ou insulina — pode causar queda perigosa do açúcar no sangue: fraqueza, tremores e convulsão.',
        mensagem_en: 'Diabetes medication or insulin — can cause a dangerous drop in blood sugar: weakness, tremors and seizures.',
        mensagem_es: 'Medicamento para la diabetes o insulina: puede causar una caída peligrosa del azúcar en sangre: debilidad, temblores y convulsiones.',
        mensagem_ptpt: 'Medicamento para a diabetes ou insulina — pode causar uma descida perigosa do açúcar no sangue: fraqueza, tremores e convulsões.',
    },
    {
        id: 'cardio_forte', cachorro: 'HIGH', gato: 'HIGH',
        match: /propranolol|atenolol|metoprolol|carvedilol|bisoprolol|anlodipino|amlodipino|nifedipino|verapamil|diltiazem|digoxina|clonidina/i,
        mensagem: 'Remédio de pressão ou do coração — pode causar queda perigosa da pressão e alteração do ritmo do coração em cães e gatos.',
        mensagem_en: 'Blood-pressure or heart medication — can cause a dangerous drop in blood pressure and heart rhythm changes in dogs and cats.',
        mensagem_es: 'Medicamento para la presión o el corazón: puede causar una caída peligrosa de la presión y alteraciones del ritmo cardíaco en perros y gatos.',
        mensagem_ptpt: 'Medicamento para a tensão ou para o coração — pode causar uma descida perigosa da tensão e alterações do ritmo do coração em cães e gatos.',
    },
    {
        id: 'pressao', cachorro: 'MEDIUM', gato: 'MEDIUM',
        match: /losartana|valsartana|olmesartana|enalapril|captopril|ramipril|hidroclorotiazida|furosemida|espironolactona|isossorbida|nitroglicerina/i,
        mensagem: 'Remédio de pressão ou diurético — pode derrubar a pressão e sobrecarregar os rins de cães e gatos.',
        mensagem_en: 'Blood-pressure medication or diuretic — can lower blood pressure and strain the kidneys of dogs and cats.',
        mensagem_es: 'Medicamento para la presión o diurético: puede bajar la presión y sobrecargar los riñones de perros y gatos.',
        mensagem_ptpt: 'Medicamento para a tensão ou diurético — pode baixar a tensão e sobrecarregar os rins de cães e gatos.',
    },
    {
        id: 'pde5', cachorro: 'MEDIUM', gato: 'MEDIUM',
        match: /tadalafila|tadalafil|sildenafila|sildenafil|vardenafila|vardenafil|viagra|cialis/i,
        mensagem: 'Remédio para disfunção erétil — pode derrubar a pressão e acelerar o coração de cães e gatos.',
        mensagem_en: 'Erectile dysfunction medication — can lower blood pressure and speed up the heart of dogs and cats.',
        mensagem_es: 'Medicamento para la disfunción eréctil: puede bajar la presión y acelerar el corazón de perros y gatos.',
        mensagem_ptpt: 'Medicamento para a disfunção erétil — pode baixar a tensão e acelerar o coração de cães e gatos.',
    },
    {
        id: 'cafeina', cachorro: 'MEDIUM', gato: 'MEDIUM',
        match: /cafeina|caffeine|guarana|energetico|energy drink/i,
        mensagem: 'Cafeína — em cães e gatos causa agitação, tremores e disparo do coração.',
        mensagem_en: 'Caffeine — in dogs and cats it causes restlessness, tremors and a racing heart.',
        mensagem_es: 'Cafeína: en perros y gatos causa inquietud, temblores y taquicardia.',
        mensagem_ptpt: 'Cafeína — em cães e gatos causa agitação, tremores e coração acelerado.',
    },
    {
        id: 'vitamina_d', cachorro: 'HIGH', gato: 'HIGH',
        match: /calcipotriol|calcipotrieno|calcipotriene|colecalciferol|cholecalciferol|ergocalciferol|vitamina d3|vitamin d3/i,
        mensagem: 'Vitamina D em excesso causa falência dos rins em cães e gatos; pomadas com calcipotriol (psoríase) são ainda mais perigosas.',
        mensagem_en: 'Too much vitamin D causes kidney failure in dogs and cats; psoriasis ointments with calcipotriol are even more dangerous.',
        mensagem_es: 'El exceso de vitamina D causa insuficiencia renal en perros y gatos; las pomadas con calcipotriol (psoriasis) son aún más peligrosas.',
        mensagem_ptpt: 'O excesso de vitamina D causa falência dos rins em cães e gatos; as pomadas com calcipotriol (psoríase) são ainda mais perigosas.',
    },
    {
        id: 'ferro', cachorro: 'HIGH', gato: 'HIGH',
        match: /sulfato ferroso|fumarato ferroso|gluconato ferroso|ferro elementar|ferrous sulfate|ferrous fumarate|iron sulfate/i,
        mensagem: 'Suplemento de ferro — irrita e lesa o estômago, o intestino e o fígado de cães e gatos.',
        mensagem_en: 'Iron supplement — irritates and damages the stomach, intestines and liver of dogs and cats.',
        mensagem_es: 'Suplemento de hierro: irrita y daña el estómago, el intestino y el hígado de perros y gatos.',
        mensagem_ptpt: 'Suplemento de ferro — irrita e lesa o estômago, o intestino e o fígado de cães e gatos.',
    },
    {
        id: 'nicotina', cachorro: 'HIGH', gato: 'HIGH',
        match: /nicotina(?!mid)|nicotine(?!amide)|tabaco|tobacco|cigarro/i,
        mensagem: 'Nicotina (cigarro, refil de cigarro eletrônico, adesivo) — causa vômito, tremores e disparo do coração em cães e gatos.',
        mensagem_en: 'Nicotine (cigarettes, e-cigarette refills, patches) — causes vomiting, tremors and a racing heart in dogs and cats.',
        mensagem_es: 'Nicotina (cigarrillos, recargas de cigarrillo electrónico, parches): causa vómitos, temblores y taquicardia en perros y gatos.',
        mensagem_ptpt: 'Nicotina (cigarros, recargas de cigarro eletrónico, adesivos) — causa vómitos, tremores e coração acelerado em cães e gatos.',
    },
    {
        id: 'naftalina', cachorro: 'HIGH', gato: 'HIGH',
        match: /naftalina|naftaleno|naphthalene|canfora|camphor/i,
        mensagem: 'Naftalina e cânfora — causam lesão no sangue e no fígado e convulsões em cães e gatos.',
        mensagem_en: 'Mothballs and camphor — cause blood and liver damage and seizures in dogs and cats.',
        mensagem_es: 'Naftalina y alcanfor: causan daño en la sangre y el hígado, y convulsiones en perros y gatos.',
        mensagem_ptpt: 'Naftalina e cânfora — causam lesão no sangue e no fígado e convulsões em cães e gatos.',
    },
    {
        id: 'allium', cachorro: 'MEDIUM', gato: 'HIGH',
        match: /\bcebola|\balho\b|alho-poro|alho poro|cebolinha|\bonions?\b|\bgarlic\b|\bchives?\b/i,
        mensagem: 'Cebola e alho (frescos, em pó ou cozidos) destroem os glóbulos vermelhos de cães e gatos; os gatos são ainda mais sensíveis.',
        mensagem_en: 'Onion and garlic (fresh, powdered or cooked) destroy the red blood cells of dogs and cats; cats are even more sensitive.',
        mensagem_es: 'La cebolla y el ajo (frescos, en polvo o cocidos) destruyen los glóbulos rojos de perros y gatos; los gatos son aún más sensibles.',
        mensagem_ptpt: 'A cebola e o alho (frescos, em pó ou cozinhados) destroem os glóbulos vermelhos de cães e gatos; os gatos são ainda mais sensíveis.',
    },
    {
        id: 'passas', cachorro: 'HIGH',
        match: /\bpassas?\b|uva passa|uva-passa|\braisins?\b/i,
        mensagem: 'Uva-passa e passas — podem causar falência dos rins em cães, mesmo em pequena quantidade.',
        mensagem_en: 'Raisins — can cause kidney failure in dogs, even in small amounts.',
        mensagem_es: 'Pasas: pueden causar insuficiencia renal en perros, incluso en pequeñas cantidades.',
        mensagem_ptpt: 'Uvas-passas — podem causar falência dos rins em cães, mesmo em pequena quantidade.',
    },
    {
        id: 'chocolate_outros', gato: 'MEDIUM', ave: 'HIGH',
        match: /chocolate|massa de cacau|po de cacau|cacau em po|cocoa powder|cocoa mass|cocoa solids|teobromina|theobromine/i,
        mensagem: 'Chocolate e cacau (teobromina) — tóxicos para animais de estimação: causam vômito, tremores e alteração do coração.',
        mensagem_en: 'Chocolate and cocoa (theobromine) — toxic to pets: cause vomiting, tremors and heart rhythm changes.',
        mensagem_es: 'Chocolate y cacao (teobromina): tóxicos para las mascotas; causan vómitos, temblores y alteraciones del corazón.',
        mensagem_ptpt: 'Chocolate e cacau (teobromina) — tóxicos para animais de estimação: causam vómitos, tremores e alterações do coração.',
    },
    {
        id: 'alcool', cachorro: 'MEDIUM', gato: 'MEDIUM',
        match: /alcool etilico|alcool isopropilico|alcool 70|alcool gel|alcool absoluto|etanol|ethanol|isopropanol|cerveja|vinho|vodca|vodka|cachaca|whisky|\bwine\b|\bbeer\b/i,
        mensagem: 'Álcool (bebida, gel ou álcool 70) — causa embriaguez e queda da temperatura e do açúcar no sangue de animais pequenos.',
        mensagem_en: 'Alcohol (drinks, gel or rubbing alcohol) — causes intoxication and drops in body temperature and blood sugar in small animals.',
        mensagem_es: 'Alcohol (bebidas, gel o alcohol de 70°): causa embriaguez y bajadas de temperatura y de azúcar en sangre en animales pequeños.',
        mensagem_ptpt: 'Álcool (bebida, gel ou álcool a 70°) — causa embriaguez e descida da temperatura e do açúcar no sangue de animais pequenos.',
    },
    {
        id: 'oleo_essencial', cachorro: 'MEDIUM', gato: 'HIGH',
        match: /oleo essencial|essential oil|tea tree|melaleuca|eucalipto|eucalyptus|pinho|pine oil|ylang|peppermint oil|oleo de canela|cinnamon oil|oleo de cravo|clove oil/i,
        mensagem: 'Óleos essenciais e limpadores perfumados com pinho ou eucalipto — tóxicos para gatos e irritantes para cães. Evite difusores e mantenha o animal longe do piso molhado.',
        mensagem_en: 'Essential oils and pine- or eucalyptus-scented cleaners — toxic to cats and irritating to dogs. Avoid diffusers and keep the animal off wet floors.',
        mensagem_es: 'Aceites esenciales y limpiadores perfumados con pino o eucalipto: tóxicos para los gatos e irritantes para los perros. Evite los difusores y mantenga al animal lejos del suelo mojado.',
        mensagem_ptpt: 'Óleos essenciais e produtos de limpeza perfumados com pinho ou eucalipto — tóxicos para gatos e irritantes para cães. Evite difusores e mantenha o animal longe do chão molhado.',
    },
    {
        id: 'inseticida', cachorro: 'MEDIUM', gato: 'HIGH',
        match: /piretroide|pyrethroid|cipermetrina|deltametrina|bifentrina|esbiotrina|inseticida|insecticide|pesticida|mata.?barata|mata.?mosquito/i,
        mensagem: 'Inseticida — os gatos são especialmente sensíveis aos piretróides e a outros inseticidas. Mantenha o animal fora do ambiente durante o uso e longe do produto.',
        mensagem_en: 'Insecticide — cats are especially sensitive to pyrethroids and other insecticides. Keep the animal out of the room while it is used and away from the product.',
        mensagem_es: 'Insecticida: los gatos son especialmente sensibles a los piretroides y a otros insecticidas. Mantenga al animal fuera del ambiente durante su uso y lejos del producto.',
        mensagem_ptpt: 'Inseticida — os gatos são especialmente sensíveis aos piretroides e a outros inseticidas. Mantenha o animal fora da divisão durante a utilização e longe do produto.',
    },
    {
        id: 'cloro_cao', cachorro: 'MEDIUM',
        match: /\bcloro\b|hipoclorito|sodium hypochlorite|\bbleach\b|agua sanitaria/i,
        mensagem: 'Água sanitária e cloro — irritam a pele, os olhos e o estômago de cães. Evite o contato com o piso ainda molhado.',
        mensagem_en: 'Bleach and chlorine — irritate the skin, eyes and stomach of dogs. Keep dogs off floors that are still wet.',
        mensagem_es: 'Lejía y cloro: irritan la piel, los ojos y el estómago de los perros. Evite el contacto con el suelo todavía mojado.',
        mensagem_ptpt: 'Lixívia e cloro — irritam a pele, os olhos e o estômago dos cães. Evite o contacto com o chão ainda molhado.',
    },
    {
        id: 'abacate_aves', ave: 'HIGH',
        match: /abacate|avocado|persin/i,
        mensagem: 'Abacate é tóxico para aves — causa dificuldade para respirar e pode ser fatal.',
        mensagem_en: 'Avocado is toxic to birds — it causes breathing difficulty and can be fatal.',
        mensagem_es: 'El aguacate es tóxico para las aves: causa dificultad para respirar y puede ser mortal.',
        mensagem_ptpt: 'O abacate é tóxico para aves — causa dificuldade em respirar e pode ser fatal.',
    },
];

// Junta o que vale para cada espécie às regras de cima. O motor para na PRIMEIRA regra que
// casa (um alerta por pet por produto), então a mais grave vem primeiro. Ordenação estável:
// dentro da mesma gravidade, vale a ordem em que foram escritas.
const GRAVIDADE_PET = { CRITICAL: 5, HIGH: 4, MEDIUM: 3, LOW: 2, INFO: 1 };
for (const r of RISCOS_COMUNS_PETS) {
    for (const especie of ['gato', 'cachorro', 'ave']) {
        if (!r[especie]) continue;
        TOXICIDADE_PETS[especie].push({
            match: r.match, severity: r[especie], id: r.id,
            mensagem: r.mensagem, mensagem_en: r.mensagem_en, mensagem_es: r.mensagem_es, mensagem_ptpt: r.mensagem_ptpt,
        });
    }
}
for (const especie of Object.keys(TOXICIDADE_PETS)) {
    TOXICIDADE_PETS[especie] = TOXICIDADE_PETS[especie]
        .map((regra, i) => ({ regra, i }))
        .sort((a, b) => (GRAVIDADE_PET[b.regra.severity] - GRAVIDADE_PET[a.regra.severity]) || (a.i - b.i))
        .map(({ regra }) => regra);
}
