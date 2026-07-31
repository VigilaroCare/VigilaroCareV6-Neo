/**
 * ocorrencia_regional.js
 *
 * Camada de OCORRENCIA e RELEVANCIA por mercado para as fichas de animais
 * peconhentos (data/animais_ciatox.js) e plantas toxicas
 * (data/plantas_ciatox.js).
 *
 * POR QUE ESTA CAMADA EXISTE
 * As duas bases foram escritas para o Brasil. Com o app em 4 locales, um
 * utilizador em Lisboa recebia o catalogo brasileiro inteiro — jararaca,
 * cascavel, surucucu — nenhuma das quais ocorre em Portugal, e nenhuma das
 * viboras que efetivamente mordem la. O problema nao e de traducao, e de
 * relevancia.
 *
 * REGRA DE INCLUSAO — DOIS CRITERIOS (2026-07-31)
 * Uma ficha e relevante para um mercado se atender A **ou** B:
 *   A) FREQUENCIA — aparece na estatistica nacional de intoxicacoes /
 *      notificacoes do pais.
 *   B) GRAVIDADE  — e listada como de importancia medica por autoridade
 *      sanitaria, ou existe antiveneno especifico no pais.
 *
 * Os dois criterios sao necessarios porque nenhum sozinho funciona.
 * So frequencia: o catalogo vira lista de medicamentos e produtos de limpeza
 * (>80% das chamadas do CIAV portugues em 2017 eram farmacos) e Lonomia e
 * Lachesis — raras e potencialmente letais — caem fora. So gravidade: perde-se
 * o que realmente leva gente ao centro de intoxicacao. E a mesma logica que a
 * OMS usa ao classificar serpentes "medically important".
 *
 * A REGIONALIZACAO NUNCA REMOVE
 * `status: 'ausente'` significa "nao apresentar como risco local", NAO
 * "esconder". O catalogo completo continua acessivel — pelo Modo Viagem, por
 * busca direta, e para o imigrante brasileiro em Lisboa ou o portugues que vai
 * viajar ao Brasil. Ver utils/relevanciaRegional.js: a funcao ordena, nao
 * filtra.
 *
 * ================= STATUS DE VALIDACAO =================
 * PRELIMINAR. A classificacao abaixo e de distribuicao biogeografica
 * estabelecida, NAO de estatistica extraida. Os criterios A/B estao atribuidos
 * por expectativa, nao por leitura das fontes. Antes de virar dado de
 * producao, validar cada linha contra:
 *   BR  — SINAN (acidente por animal peconhento e notificacao compulsoria
 *         desde a Portaria 2.472/2010) + SINITOX/Fiocruz
 *   PT  — CIAV / INEM (800 250 250), centro unico nacional
 *   ES  — Servicio de Informacion Toxicologica (INTCF)
 *   US  — America's Poison Centers (relatorio anual NPDS)
 *   Serpentes, transversal — WHO Snakebite Information and Data Platform
 *   Distribuicao — GBIF (fauna) e POWO/Kew (flora)
 *
 * ATENCAO METODOLOGICA: os numeros nao sao comparaveis ENTRE paises
 * (metodologias e coberturas diferentes). Servem para ordenar dentro de um
 * pais, nunca para comparar paises.
 * =======================================================
 */

/** Mercados atendidos hoje, alinhados aos locales do i18n. */
export const MERCADOS = ['BR', 'PT', 'ES', 'US'];

/**
 * `en` nao e um pais. O locale ingles esta mapeado para US como mercado
 * primario; GB, IE, AU, CA e demais anglofonos ainda nao tem classificacao
 * propria e caem no fallback de mercado desconhecido.
 */
export const LOCALE_PARA_MERCADO = {
    'pt-BR': 'BR',
    'pt-PT': 'PT',
    es: 'ES',
    en: 'US',
};

export const STATUS_VALIDACAO = 'preliminar';
export const REVISADO_EM = '2026-07-31';

/**
 * Notacao compacta: [status, criterio, nota?]
 *   status   'ocorre'  — o taxon da ficha ocorre no pais
 *            'parcial' — o genero ocorre, mas com outra especie / outro nome
 *                        popular / outra distribuicao. A ficha serve como
 *                        aproximacao e precisa de adaptacao local.
 *            'ausente' — nao ocorre. Nao apresentar como risco local.
 *   criterio 'A' | 'B' | 'AB' | null  (null quando ausente)
 */
const O = (status, criterio, nota) => ({ status, criterio: criterio || null, nota: nota || null });

export const OCORRENCIA_ANIMAIS = {
    // --- Serpentes ---------------------------------------------------------
    jararaca: {
        BR: O('ocorre', 'AB', 'Responsavel pela maior parte dos acidentes ofidicos no pais.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    jararacu_u: {
        BR: O('ocorre', 'B'), PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    jararacu_u_albina: {
        BR: O('ocorre', 'B', 'Variante albina de Bothrops jararacussu, nao taxon distinto. Avaliar fundir com a ficha jararacu_u.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    cascavel: {
        BR: O('ocorre', 'AB'),
        PT: O('ausente'), ES: O('ausente'),
        US: O('parcial', 'AB', 'Crotalus durissus nao ocorre; o genero e representado por C. atrox, C. adamanteus, C. horridus e outras. Precisa de ficha propria.'),
    },
    surucucu: {
        BR: O('ocorre', 'B', 'Rara, restrita a areas florestais, alta gravidade.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    coral: {
        BR: O('ocorre', 'B'),
        PT: O('ausente'), ES: O('ausente'),
        US: O('parcial', 'B', 'Micrurus fulvius e M. tener no sudeste/sul dos EUA.'),
    },
    cobra_coral: {
        BR: O('ocorre', 'B', 'Micrurus corallinus. Sobreposicao grande com a ficha `coral` (Micrurus spp.) — avaliar fusao.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },

    // --- Escorpioes --------------------------------------------------------
    escorpiao_amarelo: {
        BR: O('ocorre', 'AB', 'Tityus serrulatus. Gravidade alta em criancas.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    escorpiao_marrom: {
        BR: O('ocorre', 'AB'), PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },

    // --- Aranhas -----------------------------------------------------------
    aranha_marrom: {
        BR: O('ocorre', 'AB', 'Loxosceles spp., alta incidencia no Sul.'),
        PT: O('parcial', 'B', 'L. rufescens, mediterranica, muito menos frequente.'),
        ES: O('parcial', 'B', 'L. rufescens.'),
        US: O('parcial', 'AB', 'L. reclusa (brown recluse), nome popular e distribuicao proprios.'),
    },
    aranha_armadeira: {
        BR: O('ocorre', 'AB'), PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    viuva_negra: {
        BR: O('ocorre', 'B'),
        PT: O('parcial', 'B', 'L. tredecimguttatus, viuva-negra europeia.'),
        ES: O('parcial', 'B', 'L. tredecimguttatus.'),
        US: O('parcial', 'AB', 'L. mactans, presenca e casuistica bem maiores.'),
    },
    aranha_caranguejeira: {
        BR: O('ocorre', 'A', 'Baixa gravidade; relevancia e de tranquilizacao, nao de risco.'),
        PT: O('ausente'), ES: O('ausente'),
        US: O('parcial', 'A', 'Aphonopelma spp. no sudoeste.'),
    },

    // --- Insetos e miriapodes ---------------------------------------------
    abelhas: {
        BR: O('ocorre', 'AB'), PT: O('ocorre', 'AB'), ES: O('ocorre', 'AB'), US: O('ocorre', 'AB'),
    },
    vespas: {
        BR: O('ocorre', 'AB'),
        PT: O('parcial', 'AB', 'Polistes ocorre; Polybia nao. LACUNA: Vespa velutina, invasora com relevancia crescente.'),
        ES: O('parcial', 'AB', 'Idem Portugal.'),
        US: O('parcial', 'AB', 'Polistes e Vespula spp.'),
    },
    formiga_lava_pes: {
        BR: O('ocorre', 'A'),
        PT: O('ausente'), ES: O('ausente'),
        US: O('parcial', 'AB', 'Solenopsis invicta, invasora de grande impacto no sul dos EUA.'),
    },
    lonomia: {
        BR: O('ocorre', 'B', 'Rara e potencialmente letal — caso exemplar de por que o criterio B existe.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    lacraia: {
        BR: O('ocorre', 'A'),
        PT: O('parcial', 'A', 'Scolopendra cingulata.'),
        ES: O('parcial', 'A', 'S. cingulata.'),
        US: O('parcial', 'A', 'S. heros.'),
    },

    // --- Aquaticos ---------------------------------------------------------
    agua_viva: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    caravela: {
        BR: O('ocorre', 'A'),
        PT: O('ocorre', 'A', 'Physalia physalis chega a costa atlantica portuguesa.'),
        ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    arraia: {
        BR: O('ocorre', 'A', 'Potamotrygon em agua doce e Dasyatis no mar.'),
        PT: O('parcial', 'A', 'So Dasyatis; nao ha arraias de agua doce.'),
        ES: O('parcial', 'A'), US: O('parcial', 'A'),
    },
    peixe_escorpiao: {
        BR: O('parcial', 'A', 'Scorpaena ocorre; Synanceia (peixe-pedra) e indo-pacifico.'),
        PT: O('parcial', 'A', 'Scorpaena. LACUNA maior: Trachinus spp. (peixe-aranha), causa frequente em praias.'),
        ES: O('parcial', 'A', 'Idem Portugal.'),
        US: O('parcial', 'A'),
    },
    baiacu: {
        BR: O('ocorre', 'B'),
        PT: O('parcial', 'B'),
        ES: O('parcial', 'B', 'Lagocephalus sceleratus, invasor no Mediterraneo.'),
        US: O('parcial', 'B'),
    },
    polvo_aneis_azuis: {
        // ACHADO: taxon indo-pacifico, presente no catalogo brasileiro.
        BR: O('ausente', null, 'Hapalochlaena e indo-pacifico e NAO ocorre no Brasil. Manter como conteudo de interesse geral ou de viagem, nao como risco local.'),
        PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    salamandra: {
        // ACHADO: ficha europeia dentro do catalogo brasileiro.
        BR: O('ausente', null, 'Salamandra salamandra e europeia e NAO ocorre no Brasil.'),
        PT: O('ocorre', 'A', 'Nativa — a ficha ja esta certa, so estava no mercado errado.'),
        ES: O('ocorre', 'A'),
        US: O('ausente', null, 'Ha salamandras nativas, mas de outros generos.'),
    },
    sapo_cururu: {
        BR: O('ocorre', 'A'),
        PT: O('ausente'), ES: O('ausente'),
        US: O('parcial', 'A', 'Rhinella marina introduzida na Florida e no Havai.'),
    },
};

export const OCORRENCIA_PLANTAS = {
    // Ornamentais cosmopolitas — o nucleo reaproveitavel nos 4 mercados.
    comigo_ninguem_pode: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    espirradeira: {
        BR: O('ocorre', 'A'),
        PT: O('ocorre', 'AB', 'Nerium oleander e nativo do Mediterraneo e muito comum em paisagismo.'),
        ES: O('ocorre', 'AB'), US: O('ocorre', 'A'),
    },
    bico_de_papagaio: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    coroa_de_cristo: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    mamona: {
        BR: O('ocorre', 'AB'), PT: O('ocorre', 'AB'), ES: O('ocorre', 'AB'), US: O('ocorre', 'AB'),
    },
    copo_de_leite: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    zamioculca: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    cinamomo: {
        BR: O('ocorre', 'A'),
        PT: O('ocorre', 'A', 'Melia azedarach naturalizada na Peninsula Iberica.'),
        ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },
    tinhorao: {
        BR: O('ocorre', 'A'), PT: O('ocorre', 'A'), ES: O('ocorre', 'A'), US: O('ocorre', 'A'),
    },

    // Cultivo dependente de clima — presentes, mas menos comuns na Iberia.
    taioba_brava: {
        BR: O('ocorre', 'A'),
        PT: O('parcial', 'A', 'Cultivada como ornamental, nao como alimento.'),
        ES: O('parcial', 'A'), US: O('parcial', 'A'),
    },
    avelos: {
        BR: O('ocorre', 'A'),
        PT: O('parcial', 'A'), ES: O('parcial', 'A'), US: O('parcial', 'A'),
    },
    saia_branca: {
        BR: O('ocorre', 'A'),
        PT: O('parcial', 'A', 'Brugmansia cultivada como ornamental em clima ameno.'),
        ES: O('parcial', 'A'), US: O('parcial', 'A'),
    },
    chapeu_napoleao: {
        BR: O('ocorre', 'A'),
        PT: O('parcial', 'A'), ES: O('parcial', 'A'),
        US: O('parcial', 'A', 'Sul da Florida.'),
    },

    // Neotropicais — sem equivalente direto na Iberia.
    mandioca_brava: {
        BR: O('ocorre', 'AB', 'Intoxicacao cianogenica por preparo inadequado.'),
        PT: O('ausente', null, 'Nao cultivada; risco existe apenas via raiz importada. Avaliar manter por comunidade lusofona.'),
        ES: O('ausente'), US: O('parcial', 'A'),
    },
    aroeira_brava: {
        BR: O('ocorre', 'A'), PT: O('ausente'), ES: O('ausente'), US: O('ausente'),
    },
    pinhao_roxo: {
        BR: O('ocorre', 'A'), PT: O('ausente'), ES: O('ausente'),
        US: O('parcial', 'A', 'Sul da Florida.'),
    },
    urtiga: {
        // ACHADO: armadilha de nome popular.
        BR: O('ocorre', 'A', 'Urera baccifera, neotropical.'),
        PT: O('ausente', null, 'ARMADILHA: a "urtiga" europeia e Urtica dioica, outro taxon. Reaproveitar a ficha induziria erro de identificacao. Precisa de ficha propria.'),
        ES: O('ausente', null, 'Idem — Urtica dioica.'),
        US: O('ausente', null, 'Idem — Urtica dioica.'),
    },
};

/**
 * LACUNAS CONHECIDAS — taxons que importam em cada mercado e ainda nao tem
 * ficha. Backlog em codigo, e nao em documento solto, porque some menos.
 * `criterio` segue a mesma regra de dois criterios.
 */
export const LACUNAS_POR_MERCADO = {
    BR: [],
    PT: [
        { nome: 'Vibora-cornuda', taxon: 'Vipera latastei', criterio: 'B', nota: 'Uma das duas unicas serpentes de importancia medica em Portugal.' },
        { nome: 'Vibora-de-Seoane', taxon: 'Vipera seoanei', criterio: 'B', nota: 'Norte de Portugal.' },
        { nome: 'Peixe-aranha', taxon: 'Trachinus spp.', criterio: 'A', nota: 'Causa frequente de envenenamento em praias.' },
        { nome: 'Vespa asiatica', taxon: 'Vespa velutina', criterio: 'AB', nota: 'Invasora, relevancia crescente.' },
        { nome: 'Escorpiao iberico', taxon: 'Buthus ibericus', criterio: 'A', nota: 'Baixa gravidade, alta procura de informacao.' },
        { nome: 'Urtiga', taxon: 'Urtica dioica', criterio: 'A', nota: 'Substitui a ficha `urtiga` (Urera), que e neotropical.' },
    ],
    ES: [
        { nome: 'Vibora hocicuda', taxon: 'Vipera latastei', criterio: 'B' },
        { nome: 'Vibora aspid', taxon: 'Vipera aspis', criterio: 'B', nota: 'Pirineus.' },
        { nome: 'Vibora de Seoane', taxon: 'Vipera seoanei', criterio: 'B', nota: 'Norte.' },
        { nome: 'Pez arana', taxon: 'Trachinus spp.', criterio: 'A' },
        { nome: 'Escorpion amarillo', taxon: 'Buthus occitanus', criterio: 'A' },
        { nome: 'Ortiga', taxon: 'Urtica dioica', criterio: 'A' },
    ],
    US: [
        { nome: 'Copperhead / Cottonmouth', taxon: 'Agkistrodon spp.', criterio: 'AB', nota: 'Junto com Crotalus, dominam a casuistica norte-americana.' },
        { nome: 'Rattlesnakes', taxon: 'Crotalus atrox / adamanteus / horridus', criterio: 'AB' },
        { nome: 'Poison ivy', taxon: 'Toxicodendron radicans', criterio: 'A', nota: 'Uma das exposicoes vegetais mais frequentes nos centros de intoxicacao dos EUA. Ausencia notavel.' },
        { nome: 'Poison oak / sumac', taxon: 'Toxicodendron diversilobum / vernix', criterio: 'A' },
    ],
};

export default { OCORRENCIA_ANIMAIS, OCORRENCIA_PLANTAS, LACUNAS_POR_MERCADO };
