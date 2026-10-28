/**
 * opcoesPerfil.js — opções fixas do perfil (D20, 17/10/2026). Fonte única.
 *
 * Antes cada tela tinha a sua cópia (AddPerfilScreenNeo, PetFormStep) e só em
 * português. O que é GRAVADO no perfil não muda:
 *   - necessidades especiais (pessoa e pet): o `id`  ('visual', 'visao_reduzida')
 *   - condições médicas e alergias:         o `label` em pt-BR ('Asma', 'Amendoim')
 * O valor gravado é lido por regras (InfoRotulosRuleEngine compara alergénios
 * pelo texto), então NUNCA gravar o texto traduzido. Traduz-se só ao EXIBIR,
 * com rotuloOpcaoPerfil(valorGravado) — que também conserta o que a ficha
 * médica e as telas de saúde mostravam para necessidades: o id cru ("visual",
 * "chronic_pain") em qualquer idioma.
 */
import { t_field } from '../utils/getLocalizedField';

export const NECESSIDADES_ACESSIBILIDADE = [
    { id: 'visual', label: 'Deficiência Visual', label_en: 'Visual Impairment', label_es: 'Discapacidad Visual' },
    { id: 'hearing', label: 'Deficiência Auditiva', label_en: 'Hearing Impairment', label_es: 'Discapacidad Auditiva' },
    { id: 'mobility', label: 'Dificuldade de Locomoção', label_en: 'Mobility Difficulty', label_es: 'Dificultad de Movilidad' },
    { id: 'cognitive', label: 'Condição Cognitiva', label_en: 'Cognitive Condition', label_es: 'Condición Cognitiva' },
    { id: 'neurodivergence', label: 'Neurodivergência (TEA, TDAH e outras)', label_en: 'Neurodivergence (autism, ADHD and others)', label_es: 'Neurodivergencia (TEA, TDAH y otras)', label_ptpt: 'Neurodivergência (PEA, PHDA e outras)' },
    { id: 'intellectual', label: 'Deficiência Intelectual', label_en: 'Intellectual Disability', label_es: 'Discapacidad Intelectual' },
    { id: 'speech', label: 'Dificuldade de Fala', label_en: 'Speech Difficulty', label_es: 'Dificultad del Habla' },
    { id: 'chronic_pain', label: 'Dor Crônica', label_en: 'Chronic Pain', label_es: 'Dolor Crónico', label_ptpt: 'Dor Crónica' },
    { id: 'balance', label: 'Desequilíbrio/Vertigem', label_en: 'Balance Problems/Vertigo', label_es: 'Desequilibrio/Vértigo' },
    { id: 'fine_motor', label: 'Habilidades Motoras Finas', label_en: 'Fine Motor Skills', label_es: 'Motricidad Fina' },
];

export const CONDICOES_PET = [
    { id: 'mobilidade_reduzida', label: 'Mobilidade Reduzida / Artrose', label_en: 'Reduced Mobility / Osteoarthritis', label_es: 'Movilidad Reducida / Artrosis' },
    { id: 'visao_reduzida', label: 'Visão Reduzida / Cegueira', label_en: 'Reduced Vision / Blindness', label_es: 'Visión Reducida / Ceguera' },
    { id: 'audicao_reduzida', label: 'Audição Reduzida / Surdez', label_en: 'Reduced Hearing / Deafness', label_es: 'Audición Reducida / Sordera' },
    { id: 'disfuncao_cognitiva', label: 'Condição Neurológica / Cognitiva', label_en: 'Neurological / Cognitive Condition', label_es: 'Condición Neurológica / Cognitiva' },
];

export const CONDICOES_MEDICAS = [
    { id: 'anxiety', label: 'Ansiedade', label_en: 'Anxiety', label_es: 'Ansiedad' },
    { id: 'copd', label: 'DPOC', label_en: 'COPD', label_es: 'EPOC' },
    { id: 'kidney', label: 'Doença Renal', label_en: 'Kidney Disease', label_es: 'Enfermedad Renal' },
    { id: 'liver', label: 'Doença Hepática', label_en: 'Liver Disease', label_es: 'Enfermedad Hepática' },
    { id: 'thyroid', label: 'Distúrbio da Tireoide', label_en: 'Thyroid Disorder', label_es: 'Trastorno de la Tiroides', label_ptpt: 'Distúrbio da Tiroide' },
    { id: 'osteoporosis', label: 'Osteoporose', label_en: 'Osteoporosis', label_es: 'Osteoporosis' },
    { id: 'cancer', label: 'Câncer', label_en: 'Cancer', label_es: 'Cáncer', label_ptpt: 'Cancro' },
    { id: 'diabetes', label: 'Diabetes', label_en: 'Diabetes', label_es: 'Diabetes' },
    { id: 'hypertension', label: 'Hipertensão', label_en: 'Hypertension', label_es: 'Hipertensión' },
    { id: 'heart', label: 'Doença Cardíaca', label_en: 'Heart Disease', label_es: 'Enfermedad Cardíaca' },
    { id: 'asthma', label: 'Asma', label_en: 'Asthma', label_es: 'Asma' },
    { id: 'epilepsy', label: 'Epilepsia', label_en: 'Epilepsy', label_es: 'Epilepsia' },
    { id: 'arthritis', label: 'Artrite', label_en: 'Arthritis', label_es: 'Artritis' },
    { id: 'stroke', label: 'Histórico de AVC', label_en: 'History of Stroke', label_es: 'Antecedente de ACV / Ictus' },
    { id: 'blood_clot', label: 'Distúrbio de Coagulação', label_en: 'Clotting Disorder', label_es: 'Trastorno de la Coagulación' },
    { id: 'autoimmune', label: 'Doença Autoimune', label_en: 'Autoimmune Disease', label_es: 'Enfermedad Autoinmune' },
    { id: 'chronic_pain', label: 'Dor Crônica', label_en: 'Chronic Pain', label_es: 'Dolor Crónico', label_ptpt: 'Dor Crónica' },
    { id: 'sleep_apnea', label: 'Apneia do Sono', label_en: 'Sleep Apnea', label_es: 'Apnea del Sueño' },
    { id: 'migraine', label: 'Enxaqueca', label_en: 'Migraine', label_es: 'Migraña' },
];

export const CATEGORIAS_ALERGIA = [
    {
        title: 'Alimentos', title_en: 'Food', title_es: 'Alimentos',
        icon: '🍴',
        items: [
            { id: 'peanuts', label: 'Amendoim', label_en: 'Peanuts', label_es: 'Cacahuete / Maní' },
            { id: 'tree_nuts', label: 'Nozes / Castanhas', label_en: 'Tree Nuts', label_es: 'Frutos Secos (Nueces)', label_ptpt: 'Frutos de Casca Rija' },
            { id: 'milk', label: 'Leite / Laticínios', label_en: 'Milk / Dairy', label_es: 'Leche / Lácteos', label_ptpt: 'Leite / Lacticínios' },
            { id: 'eggs', label: 'Ovos', label_en: 'Eggs', label_es: 'Huevo' },
            { id: 'shellfish', label: 'Frutos do Mar', label_en: 'Shellfish', label_es: 'Mariscos', label_ptpt: 'Marisco' },
            { id: 'fish', label: 'Peixe', label_en: 'Fish', label_es: 'Pescado' },
            { id: 'soy', label: 'Soja', label_en: 'Soy', label_es: 'Soja' },
            { id: 'gluten', label: 'Trigo / Glúten', label_en: 'Wheat / Gluten', label_es: 'Trigo / Gluten' },
        ],
    },
    {
        title: 'Medicamentos', title_en: 'Medications', title_es: 'Medicamentos',
        icon: '💊',
        items: [
            { id: 'penicillin', label: 'Penicilina', label_en: 'Penicillin', label_es: 'Penicilina' },
            // SEM MARCA desde 27/10/2026, por decisão do Agnaldo: era "Aspirina",
            // marca da Bayer no Brasil. Em inglês "aspirin" é o nome genérico
            // oficial (USAN/BAN) e fica.
            // A lista grava o RÓTULO no perfil, não o id — por isso o nome antigo
            // segue em `legado`. Sem ele, quem já tinha marcado "Aspirina"
            // perderia a marcação no formulário, a alergia viraria "customizada"
            // e a Ficha Médica deixaria de traduzi-la. Ver valorAtualOpcao().
            { id: 'aspirin', label: 'Ácido acetilsalicílico', label_en: 'Aspirin', label_es: 'Ácido acetilsalicílico', legado: ['Aspirina'] },
            { id: 'ibuprofen', label: 'Ibuprofeno', label_en: 'Ibuprofen', label_es: 'Ibuprofeno' },
            { id: 'codeine', label: 'Codeína', label_en: 'Codeine', label_es: 'Codeína' },
        ],
    },
    {
        title: 'Ambiental', title_en: 'Environmental', title_es: 'Ambientales',
        icon: '🌱',
        items: [
            { id: 'pollen', label: 'Pólen', label_en: 'Pollen', label_es: 'Polen' },
            { id: 'mites', label: 'Ácaros', label_en: 'Dust Mites', label_es: 'Ácaros' },
            { id: 'pet_dander', label: 'Pelos de Animais', label_en: 'Pet Dander', label_es: 'Pelo / Caspa de Animales' },
            { id: 'mold', label: 'Mofo / Bolor', label_en: 'Mold', label_es: 'Moho', label_ptpt: 'Bolor' },
        ],
    },
    {
        title: 'Contato', title_en: 'Contact', title_es: 'Contacto', title_ptpt: 'Contacto',
        icon: '🔒',
        items: [
            { id: 'latex', label: 'Látex', label_en: 'Latex', label_es: 'Látex' },
            { id: 'nickel', label: 'Níquel', label_en: 'Nickel', label_es: 'Níquel' },
        ],
    },
    {
        title: 'Insetos', title_en: 'Insects', title_es: 'Insectos',
        icon: '🐝',
        items: [
            { id: 'bee_stings', label: 'Picada de Abelha', label_en: 'Bee Stings', label_es: 'Picadura de Abeja' },
            { id: 'wasp_stings', label: 'Picada de Vespa', label_en: 'Wasp Stings', label_es: 'Picadura de Avispa' },
        ],
    },
];

const TODAS = [
    ...NECESSIDADES_ACESSIBILIDADE,
    ...CONDICOES_PET,
    ...CONDICOES_MEDICAS,
    ...CATEGORIAS_ALERGIA.flatMap((c) => c.items),
];

/** Texto para exibir de uma opção — recebe o objeto da lista. */
export const rotuloOpcao = (opcao) => t_field(opcao, 'label') || opcao.label;

/** A opção de um valor gravado: id, rótulo atual ou rótulo antigo (`legado`). */
const acharOpcao = (v) => TODAS.find((o) => o.id === v || o.label === v || (o.legado || []).includes(v));

/**
 * Texto para exibir de um valor GRAVADO no perfil (id, label pt-BR atual ou
 * label antigo de opção renomeada). Valor digitado pelo usuário ("outra
 * condição") volta como está.
 */
export const rotuloOpcaoPerfil = (valor) => {
    if (valor == null) return '';
    const v = String(valor);
    const op = acharOpcao(v);
    return op ? rotuloOpcao(op) : v;
};

/**
 * Valor gravado → o valor que o formulário grava HOJE. Só troca rótulo antigo
 * de opção renomeada (`legado`) pelo atual; id, rótulo atual e texto digitado
 * pelo usuário voltam como estão. O formulário de perfil aplica ao carregar,
 * e o perfil antigo se atualiza na próxima vez que for salvo.
 */
export const valorAtualOpcao = (valor) => {
    if (valor == null) return valor;
    const op = TODAS.find((o) => (o.legado || []).includes(String(valor)));
    return op ? op.label : valor;
};
