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
            match: /cloro|hipoclorito|chlorine|bleach/i, severity: 'MEDIUM',
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
            match: /cloro|hipoclorito|bleach/i, severity: 'HIGH',
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
            match: /cloro|hipoclorito|bleach/i, severity: 'CRITICAL',
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
        acao: 'Use um produto de cada vez e ventile o ambiente. Detalhes em Educação → Misturas Perigosas.',
        acao_en: 'Use one product at a time and ventilate the room. Details in Education → Dangerous Mixtures.',
        acao_es: 'Use un producto cada vez y ventile el ambiente. Detalles en Educación → Mezclas Peligrosas.',
        acao_ptpt: 'Utilize um produto de cada vez e ventile o espaço. Detalhes em Educação → Misturas Perigosas.',
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
    { match: /cloro|hipoclorito|água.?sanitária|agua.?sanitaria|bleach|lixívia|lixivia|lejía|lejia/i,
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
