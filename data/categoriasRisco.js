/**
 * categoriasRisco.js — Categorias de risco doméstico
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * FONTE ÚNICA de classificação de risco do app.
 *
 * Sucede `riscoNR5.js`. Duas mudanças de fundo em relação a ele:
 *
 *  1. A norma saiu da interface. O modelo de particionar risco em famílias
 *     (acidente / químico / condições do ambiente / contaminação / ergonomia)
 *     vem da prática de mapa de risco ocupacional, mas citar a norma para uma
 *     família que quer saber se a cozinha é segura não informa nada — é
 *     andaime de raciocínio, não conteúdo. Os nomes aqui são os que o usuário
 *     lê, em linguagem corrente.
 *
 *  2. Classificação não depende de vistoria. O risco de um ambiente existe a
 *     partir do que a casa é e de quem mora nela — não de quantas perguntas
 *     foram respondidas. Vide `RiscoService`.
 *
 * ── COMO ESTENDER ──────────────────────────────────────────────────────────
 *
 * Item novo em `mapeamento_dados.js` classifica sozinho via `tags`. Tag nova
 * precisa de entrada em TAG_CATEGORIA — rode `auditarTaxonomia()` em DEV para
 * listar as órfãs. Sem entrada, cai no residual `acidente`.
 */

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * `tomDS` → chave em themeColors.categoria (fill / tint / texto)
 * `icone` → nome Phosphor via NeoIcon. A categoria NUNCA é sinalizada só por
 *           cor (WCAG 1.4.1): ícone e rótulo acompanham sempre.
 */
export const CATEGORIAS_RISCO = {
    acidente: {
        id: 'acidente',
        ordem: 1,
        tomDS: 'ardosia',
        icone: 'Barricade',
        labelKey: 'risco.categoria.acidente.nome',
        label: 'Acidentes e lesões',
        descKey: 'risco.categoria.acidente.desc',
        desc: 'Quedas, cortes, impacto, choque elétrico, incêndio, explosão, afogamento e animais peçonhentos.',
    },
    quimico: {
        id: 'quimico',
        ordem: 2,
        tomDS: 'rose',
        icone: 'Flask',
        labelKey: 'risco.categoria.quimico.nome',
        label: 'Produtos químicos',
        descKey: 'risco.categoria.quimico.desc',
        desc: 'Produtos de limpeza, medicamentos, gases e vapores — por ingestão, contato ou inalação.',
    },
    ambiente: {
        id: 'ambiente',
        ordem: 3,
        tomDS: 'ameixa',
        icone: 'Thermometer',
        labelKey: 'risco.categoria.ambiente.nome',
        label: 'Condições do ambiente',
        descKey: 'risco.categoria.ambiente.desc',
        desc: 'Temperatura extrema, iluminação deficiente, ruído e ventilação inadequada.',
    },
    contaminacao: {
        id: 'contaminacao',
        ordem: 4,
        tomDS: 'terracota',
        icone: 'Virus',
        labelKey: 'risco.categoria.contaminacao.nome',
        label: 'Contaminação e higiene',
        descKey: 'risco.categoria.contaminacao.desc',
        desc: 'Mofo, umidade, pragas, vetores e falhas de higiene que favorecem contaminação.',
    },
    ergonomia: {
        id: 'ergonomia',
        ordem: 5,
        tomDS: 'ocre',
        icone: 'PersonSimpleWalk',
        labelKey: 'risco.categoria.ergonomia.nome',
        label: 'Ergonomia e acessibilidade',
        descKey: 'risco.categoria.ergonomia.desc',
        desc: 'Mobiliário e circulação inadequados a quem usa o ambiente — alcance, apoio, acessibilidade.',
    },
};

/**
 * Preparação e resposta — não é agente de risco, é barreira.
 * Fora de CATEGORIAS_RISCO de propósito: quem itera as categorias para
 * desenhar o mapa não deve tratar "ter extintor" como um perigo do ambiente.
 */
export const CATEGORIA_PREPARACAO = {
    id: 'preparacao',
    tomDS: null,
    icone: 'FirstAidKit',
    labelKey: 'risco.categoria.preparacao.nome',
    label: 'Preparação e resposta',
    descKey: 'risco.categoria.preparacao.desc',
    desc: 'Barreiras e recursos de emergência: kit de primeiros socorros, extintor, rota de fuga, iluminação de emergência.',
};

/** Ordem canônica de exibição. */
export const ORDEM_CATEGORIAS = Object.values(CATEGORIAS_RISCO)
    .sort((a, b) => a.ordem - b.ordem)
    .map(c => c.id);

/** Categoria residual quando nenhuma tag classifica. */
export const CATEGORIA_FALLBACK = 'acidente';

// ═══════════════════════════════════════════════════════════════════════════
// SEVERIDADE
// ═══════════════════════════════════════════════════════════════════════════

/** Deriva de `tipo`, campo que já existe em todo item de checklist. */
export const SEVERIDADES = {
    alta:  { id: 'alta',  peso: 3, labelKey: 'risco.sev.alta',  label: 'Alta' },
    media: { id: 'media', peso: 2, labelKey: 'risco.sev.media', label: 'Média' },
    baixa: { id: 'baixa', peso: 1, labelKey: 'risco.sev.baixa', label: 'Baixa' },
};

export function severidadeDoItem(item) {
    if (item?.tipo === 'perigo') return 'alta';
    if (item?.tipo === 'sugestão') return 'baixa';
    return 'media';
}

// ═══════════════════════════════════════════════════════════════════════════
// MAPA TAG → CATEGORIA
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Cobre as ~70 tags hoje presentes em `mapeamento_dados.js`.
 * `null` = tag válida que NÃO classifica risco (público-alvo ou nível de
 * dificuldade). Distinta de "ausente", que dispara aviso em DEV.
 */
export const TAG_CATEGORIA = {
    // ── Acidentes e lesões ─────────────────────────────────────────────────
    'queda': 'acidente',
    'tropeço': 'acidente',
    'corte': 'acidente',
    'impacto': 'acidente',
    'esmagamento': 'acidente',
    'tombamento': 'acidente',
    'estabilidade': 'acidente',
    'estrutura': 'acidente',
    'choque': 'acidente',
    'incêndio': 'acidente',
    'fogo': 'acidente',
    'explosão': 'acidente',
    'vazamento': 'acidente',
    'afogamento': 'acidente',
    'asfixia': 'acidente',
    'sufocamento': 'acidente',
    'estrangulamento': 'acidente',
    'aprisionamento': 'acidente',
    'atropelamento': 'acidente',
    'animais_peçonhentos': 'acidente',
    'acidente': 'acidente',

    // ── Produtos químicos ──────────────────────────────────────────────────
    'intoxicação': 'quimico',
    'contaminação': 'quimico',
    'ingestão': 'quimico',
    // O gás é o agente químico; a explosão que ele pode causar entra por
    // 'explosão'. Itens de botijão carregam as duas tags e aparecem nas duas
    // categorias — um mesmo ponto pode ter mais de uma natureza de risco.
    'gás': 'quimico',

    // ── Condições do ambiente ──────────────────────────────────────────────
    'queimadura': 'ambiente',   // temperatura extrema
    'visão': 'ambiente',        // iluminação deficiente
    'audição': 'ambiente',      // ruído
    'conforto': 'ambiente',     // ventilação / térmico

    // ── Contaminação e higiene ─────────────────────────────────────────────
    'biológico': 'contaminacao',
    'pragas': 'contaminacao',
    'respiratório': 'contaminacao',
    'higiene': 'contaminacao',
    'limpeza': 'contaminacao',
    'tétano': 'contaminacao',

    // ── Ergonomia e acessibilidade ─────────────────────────────────────────
    'acessibilidade': 'ergonomia',
    'mobilidade': 'ergonomia',
    'apoio': 'ergonomia',
    'organização': 'ergonomia',
    'disfuncao_cognitiva': 'ergonomia',
    'psicológico': 'ergonomia',
    'pet_mobilidade': 'ergonomia',
    'pet_idoso': 'ergonomia',
    'pet_visao_reduzida': 'ergonomia',
    'pet_pcd': 'ergonomia',

    // ── Preparação e resposta (barreira, não agente) ───────────────────────
    'primeiros_socorros': 'preparacao',
    'emergência': 'preparacao',
    'evacuação': 'preparacao',
    'fuga': 'preparacao',
    'epi': 'preparacao',
    'monitoramento': 'preparacao',
    'comunicação': 'preparacao',
    'documentos': 'preparacao',
    'identificação': 'preparacao',
    'sobrevivência': 'preparacao',
    'energia': 'preparacao',
    'bateria': 'preparacao',
    'manutenção': 'preparacao',
    'saúde': 'preparacao',
    'proteção': 'preparacao',
    'tecnologia': 'preparacao',
    'legislação': 'preparacao',
    'profissionalismo': 'preparacao',
    'qualidade': 'preparacao',
    'transparência': 'preparacao',
    'prevenção': 'preparacao',
    'segurança': 'preparacao',
    'supervisão': 'preparacao',

    // ── Não classificam risco ──────────────────────────────────────────────
    'crianças': null,   // público-alvo; quem ativa o item sai do ProfileFilterEngine
    'neurodivergente': null, // idem: neurodivergência, deficiência intelectual ou condição cognitiva no perfil
    'idosos': null,
    'pets': null,
    'básico': null,     // nível de dificuldade do item
    'expert': null,
};

// ═══════════════════════════════════════════════════════════════════════════
// CLASSIFICAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

const _tagsOrfas = new Set();

/**
 * Categorias de um item. Um item pode pertencer a mais de uma — é o caso do
 * botijão (químico + acidente).
 *
 * @returns {string[]} ids em ORDEM_CATEGORIAS; `['preparacao']` quando o item
 *                     é só barreira de resposta
 */
export function categoriasDoItem(item) {
    const tags = Array.isArray(item?.tags) ? item.tags : [];
    const encontradas = new Set();
    let temPreparacao = false;

    tags.forEach(tag => {
        if (!(tag in TAG_CATEGORIA)) {
            if (__DEV__) _tagsOrfas.add(tag);
            return;
        }
        const cat = TAG_CATEGORIA[tag];
        if (cat === 'preparacao') temPreparacao = true;
        else if (cat) encontradas.add(cat);
    });

    if (encontradas.size > 0) return ORDEM_CATEGORIAS.filter(id => encontradas.has(id));
    if (temPreparacao) return ['preparacao'];
    return [CATEGORIA_FALLBACK];
}

/**
 * Lista tags de conteúdo que nenhuma entrada de TAG_CATEGORIA cobre. Só
 * coleta em __DEV__.
 */
export function auditarTaxonomia() {
    const orfas = [...(__DEV__ ? _tagsOrfas : [])];
    if (__DEV__ && orfas.length > 0) {
        console.warn(
            `[categoriasRisco] ${orfas.length} tag(s) sem categoria — caíram no fallback "${CATEGORIA_FALLBACK}":`,
            orfas.join(', ')
        );
    }
    return orfas;
}

export default {
    CATEGORIAS_RISCO,
    CATEGORIA_PREPARACAO,
    ORDEM_CATEGORIAS,
    CATEGORIA_FALLBACK,
    SEVERIDADES,
    TAG_CATEGORIA,
    categoriasDoItem,
    severidadeDoItem,
    auditarTaxonomia,
};
