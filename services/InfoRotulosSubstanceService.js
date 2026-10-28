/**
 * InfoRotulosSubstanceService.js
 * Serviço de busca de substâncias para o módulo InfoRótulos
 *
 * Cadeia de resolução:
 *   Barcode: Base local → Open Food Facts → Open Beauty Facts → Open Products Facts → UPCitemdb
 *   Nome:    Cache → PubChem → EPA CTX (enriquecimento) → cache stale → null
 *
 * APIs utilizadas:
 *   - PubChem PUG REST (gratuita, sem chave)
 *   - EPA CTX (gratuita, chave por email)
 *   - Open Food Facts (gratuita, sem chave, 3M+ produtos)
 *   - Open Beauty Facts (gratuita, sem chave, cosméticos)
 *   - Open Products Facts (gratuita, sem chave, economia circular)
 *   - UPCitemdb (gratuita, 100 req/dia)
 */

import { getCached, setCached } from './inforotulos_cache';
import { PRODUTOS_PERIGOSOS } from '../data/produtos_scanner';
import { Config } from '../utils/Config';
import { fetchWithTimeout as fetchWithTimeoutBase } from '../utils/fetchWithTimeout';

// ─────────────────────────────────────────
// Configuração
// ─────────────────────────────────────────
const FETCH_TIMEOUT = 12000;  // 12s por API (cadeia pode ter até 4 APIs)
const USER_AGENT = 'VigilaroCare/1.0 (vigilarocare@gmail.com)';

// Enriquecimento EPA CTX — FLAG booleana, não chave (auditoria 2026-06-12,
// item A1): a chamada real sempre vai via proxy autenticado, que adiciona a
// chave server-side. Manter uma "API key" no cliente convidava alguém a colar
// a chave real no .env do app — e ela iria parar no bundle sem necessidade.
// Compat: a env antiga (EXPO_PUBLIC_EPA_CTX_API_KEY) ainda liga a flag, mas
// o valor é descartado.
const EPA_ENRICHMENT_ENABLED =
    process.env.EXPO_PUBLIC_EPA_ENRICHMENT === 'true' ||
    !!process.env.EXPO_PUBLIC_EPA_CTX_API_KEY;

// ─────────────────────────────────────────
// Traduções GHS H-Statements (PT-BR)
// ─────────────────────────────────────────
const H_TRANSLATIONS = {
    H290: 'Pode ser corrosivo para metais.',
    H300: 'Fatal se ingerido.',
    H301: 'Tóxico se ingerido.',
    H302: 'Nocivo se ingerido.',
    H304: 'Pode ser fatal se ingerido e penetrar nas vias respiratórias.',
    H310: 'Fatal em contato com a pele.',
    H311: 'Tóxico em contato com a pele.',
    H312: 'Nocivo em contato com a pele.',
    H314: 'Causa queimaduras graves na pele e lesões oculares.',
    H315: 'Causa irritação cutânea.',
    H317: 'Pode causar reação alérgica na pele.',
    H318: 'Causa lesões oculares graves.',
    H319: 'Causa irritação ocular grave.',
    H330: 'Fatal se inalado.',
    H331: 'Tóxico se inalado.',
    H332: 'Nocivo se inalado.',
    H334: 'Pode causar sintomas de alergia ou asma se inalado.',
    H335: 'Pode causar irritação das vias respiratórias.',
    H336: 'Pode causar sonolência e tonturas.',
    H340: 'Pode causar defeitos genéticos.',
    H341: 'Suspeito de causar defeitos genéticos.',
    H350: 'Pode causar câncer.',
    H351: 'Suspeito de causar câncer.',
    H360: 'Pode prejudicar a fertilidade ou o feto.',
    H361: 'Suspeito de prejudicar a fertilidade ou o feto.',
    H370: 'Causa danos a órgãos.',
    H371: 'Pode causar danos a órgãos.',
    H372: 'Causa danos a órgãos em exposições prolongadas ou repetidas.',
    H373: 'Pode causar danos a órgãos em exposições prolongadas.',
    H400: 'Muito tóxico para os organismos aquáticos.',
    H410: 'Muito tóxico para organismos aquáticos com efeitos duradouros.',
    H411: 'Tóxico para organismos aquáticos com efeitos duradouros.',
};

const RELEVANT_H_CODES = new Set(Object.keys(H_TRANSLATIONS));

// Mapa GHS → categorias internas usadas pelo RuleEngine
const GHS_CATEGORY_MAP = [
    { match: /fatal.*inhal|lethal.*inhal|H330/i, category: 'toxico_agudo_inalacao' },
    { match: /fatal.*swallow|lethal.*oral|H300/i, category: 'toxico_agudo_ingestao' },
    { match: /fatal.*skin|lethal.*dermal|H310/i, category: 'toxico_agudo_cutaneo' },
    { match: /harmful.*swallow|nocivo.*ingest|H302/i, category: 'nocivo_ingestao' },
    { match: /causes.*severe.*burns|corros|H314/i, category: 'corrosivo' },
    { match: /causes.*skin.*irritat|H315/i, category: 'irritante_pele' },
    { match: /causes.*serious.*eye|eye.*irritat|H318|H319/i, category: 'irritante_ocular' },
    { match: /respiratory.*irritat|H335/i, category: 'irritante_respiratorio' },
    { match: /may.*cause.*cancer|carcinog|H350|H351/i, category: 'carcinogenico' },
    { match: /repro.*toxic|may.*damage.*fertil|H360|H361/i, category: 'teratogeno' },
    { match: /genetic|mutagenic|H340|H341/i, category: 'genotóxico' },
    { match: /drowsiness|dizziness|H336/i, category: 'neurotoxico' },
    { match: /organ.*damage|H370|H371|H372|H373/i, category: 'dano_orgaos' },
    { match: /toxic.*aquatic|H400|H410|H411/i, category: 'toxico_ambiental' },
    { match: /allerg|sensitiz|H317|H334/i, category: 'alergeno' },
];

// Primeiros socorros padrão (PT-BR)
const DEFAULT_FIRST_AID = {
    ingestao: 'Não induza vômito. Enxágue a boca com água. Ligue imediatamente para o CIATOX: 0800 722 6001.',
    contato_pele: 'Remova roupas contaminadas. Lave a área afetada com água corrente por pelo menos 15 minutos.',
    contato_olhos: 'Lave os olhos com água corrente por 15 minutos mantendo as pálpebras abertas. Procure atendimento.',
    inalacao: 'Leve a pessoa ao ar livre imediatamente. Se inconsciente, coloque em posição lateral de segurança.',
};

// ─────────────────────────────────────────
// PONTO DE ENTRADA: Busca por código de barras
// ─────────────────────────────────────────

/**
 * Resolve um código de barras para dados do produto.
 * Cadeia: base local → Open Food Facts → Open Beauty Facts → Open Products Facts → UPCitemdb
 *
 * @param {string} barcode
 * @returns {Promise<{ found: boolean, source: string, product: Object | null }>}
 */
export async function resolveBarcode(barcode) {
    if (!barcode?.trim()) return { found: false, source: 'none', product: null };

    const code = barcode.trim();

    // Sanitização (auditoria 2026-06-12, item E26): o valor vem do scanner —
    // um QR malicioso pode conter texto arbitrário, que seria interpolado nas
    // URLs das APIs externas (path/query injection). Códigos de produto
    // legítimos (EAN-8/13, UPC-A, ITF-14) são estritamente numéricos.
    if (!/^[0-9]{6,14}$/.test(code)) {
        if (__DEV__) console.warn('[Barcode] Código rejeitado (formato inválido)');
        return { found: false, source: 'invalid', product: null };
    }

    if (__DEV__) console.log('[Barcode] Resolvendo código:', code);

    // ① Base local
    const local = PRODUTOS_PERIGOSOS[code];
    if (local && local.nome !== 'Produto não identificado') {
        if (__DEV__) console.log('[Barcode] ✅ Encontrado na base local:', local.nome);
        return {
            found: true,
            source: 'local',
            product: {
                nome: local.nome,
                categoria: local.categoria,
                perigo: local.perigo,
                componentes: local.componentes || [],
                riscos: local.riscos || [],
                primeiros_socorros: local.primeiros_socorros || DEFAULT_FIRST_AID,
                prevencao: local.prevencao || [],
                icone: local.icone || '🧪',
                cor: local.cor || '#FF9800',
                ghs_categories: local.ghs_categories || [],
                toxic_for_species: local.toxic_for_species || [],
                barcode: code,
            }
        };
    }

    // ② Open Food Facts (base principal — 3M+ produtos, sem chave)
    try {
        if (__DEV__) console.log('[Barcode] Buscando Open Food Facts...');
        const offProduct = await fetchOpenFoodFacts(code);
        if (offProduct) {
            if (__DEV__) console.log('[Barcode] ✅ Encontrado no Open Food Facts:', offProduct.nome);
            return { found: true, source: 'open_food_facts', product: offProduct };
        }
    } catch (e) {
        if (__DEV__) console.warn('[Barcode] Open Food Facts error:', e.message);
    }

    // ③ Open Beauty Facts (cosméticos e higiene)
    try {
        if (__DEV__) console.log('[Barcode] Buscando Open Beauty Facts...');
        const obfProduct = await fetchOpenBeautyFacts(code);
        if (obfProduct) {
            if (__DEV__) console.log('[Barcode] ✅ Encontrado no Open Beauty Facts:', obfProduct.nome);
            return { found: true, source: 'open_beauty_facts', product: obfProduct };
        }
    } catch (e) {
        if (__DEV__) console.warn('[Barcode] Open Beauty Facts error:', e.message);
    }

    // ④ Open Products Facts (base menor — produtos domésticos/economia circular)
    try {
        if (__DEV__) console.log('[Barcode] Buscando Open Products Facts...');
        const opfProduct = await fetchOpenProductsFacts(code);
        if (opfProduct) {
            if (__DEV__) console.log('[Barcode] ✅ Encontrado no Open Products Facts:', opfProduct.nome);
            return { found: true, source: 'open_products_facts', product: opfProduct };
        }
    } catch (e) {
        if (__DEV__) console.warn('[Barcode] Open Products Facts error:', e.message);
    }

    // ⑤ UPCitemdb (100 req/dia grátis — base global de UPC/EAN)
    try {
        if (__DEV__) console.log('[Barcode] Buscando UPCitemdb...');
        const upcProduct = await fetchUPCitemdb(code);
        if (upcProduct) {
            if (__DEV__) console.log('[Barcode] ✅ Encontrado no UPCitemdb:', upcProduct.nome);
            return { found: true, source: 'upcitemdb', product: upcProduct };
        }
    } catch (e) {
        if (__DEV__) console.warn('[Barcode] UPCitemdb error:', e.message);
    }

    // ⑥ Não encontrado em nenhuma base
    if (__DEV__) console.log('[Barcode] ❌ Produto não encontrado em nenhuma base externa');
    return { found: false, source: 'not_found', product: null, barcode: code };
}

// ─────────────────────────────────────────
// Open Food Facts — base principal (3M+ produtos)
// https://world.openfoodfacts.org
// ─────────────────────────────────────────

async function fetchOpenFoodFacts(barcode) {
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;

    const res = await fetchWithTimeout(url, {
        headers: { 'User-Agent': USER_AGENT },
    });

    // OFF retorna 404 HTTP para barcodes inexistentes — mas com JSON válido
    // Aceitar qualquer resposta e verificar o JSON
    const data = await safeJsonParse(res);
    if (!data || data.status !== 1 || !data.product) return null;

    const p = data.product;

    // Extrai ingredientes do texto (preferência: pt → genérico → en)
    const ingredientesRaw = p.ingredients_text_pt || p.ingredients_text || p.ingredients_text_en || '';

    // Extrai nomes individuais dos ingredientes da lista estruturada (se disponível)
    const ingredientesEstruturados = (p.ingredients || [])
        .map(i => i.text || i.id?.replace('en:', '') || '')
        .filter(Boolean);

    // Usa a lista estruturada se disponível, senão faz split do texto
    const componentes = ingredientesEstruturados.length > 0
        ? ingredientesEstruturados
        : ingredientesRaw.split(/[,;.]/).map(s => s.trim()).filter(s => s.length > 1);

    return {
        nome: p.product_name_pt || p.product_name || p.generic_name_pt || p.generic_name || 'Produto',
        categoria: p.categories || (p.categories_tags || []).map(t => t.replace('en:', '')).join(', ') || 'Geral',
        marca: p.brands || '',
        ingredientes_texto: ingredientesRaw,
        componentes,
        imagem: p.image_front_url || p.image_url || null,
        barcode,
        source: 'open_food_facts',
        // Dados extras úteis para toxicologia
        aditivos: (p.additives_tags || []).map(t => t.replace('en:', '')),
        allergens: p.allergens || '',
        nova_group: p.nova_group || null,
        nutriscore: p.nutriscore_grade || null,
    };
}

// ─────────────────────────────────────────
// Open Beauty Facts — cosméticos e higiene
// https://world.openbeautyfacts.org
// ─────────────────────────────────────────

async function fetchOpenBeautyFacts(barcode) {
    const url = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json`;

    const res = await fetchWithTimeout(url, {
        headers: { 'User-Agent': USER_AGENT },
    });

    const data = await safeJsonParse(res);
    if (!data || data.status !== 1 || !data.product) return null;

    const p = data.product;
    const ingredientesRaw = p.ingredients_text_pt || p.ingredients_text || p.ingredients_text_en || '';

    const ingredientesEstruturados = (p.ingredients || [])
        .map(i => i.text || i.id?.replace('en:', '') || '')
        .filter(Boolean);

    const componentes = ingredientesEstruturados.length > 0
        ? ingredientesEstruturados
        : ingredientesRaw.split(/[,;.]/).map(s => s.trim()).filter(s => s.length > 1);

    return {
        nome: p.product_name_pt || p.product_name || p.generic_name || 'Produto de Beleza',
        categoria: p.categories || 'Cosmético / Higiene',
        marca: p.brands || '',
        ingredientes_texto: ingredientesRaw,
        componentes,
        imagem: p.image_front_url || p.image_url || null,
        barcode,
        source: 'open_beauty_facts',
    };
}

// ─────────────────────────────────────────
// Open Products Facts — produtos domésticos (base menor)
// https://world.openproductsfacts.org
// ─────────────────────────────────────────

async function fetchOpenProductsFacts(barcode) {
    const url = `https://world.openproductsfacts.org/api/v2/product/${barcode}.json`;

    const res = await fetchWithTimeout(url, {
        headers: { 'User-Agent': USER_AGENT },
    });

    const data = await safeJsonParse(res);
    if (!data || data.status !== 1 || !data.product) return null;

    const p = data.product;
    const ingredientesRaw = p.ingredients_text_pt || p.ingredients_text || '';

    return {
        nome: p.product_name_pt || p.product_name || p.generic_name || 'Produto',
        categoria: p.categories || 'Geral',
        marca: p.brands || '',
        ingredientes_texto: ingredientesRaw,
        componentes: ingredientesRaw.split(/[,;.]/).map(s => s.trim()).filter(s => s.length > 1),
        imagem: p.image_url || null,
        barcode,
        source: 'open_products_facts',
    };
}

// ─────────────────────────────────────────
// UPCitemdb — base global UPC/EAN (100 req/dia)
// https://api.upcitemdb.com
// ─────────────────────────────────────────

async function fetchUPCitemdb(barcode) {
    const url = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;

    const res = await fetchWithTimeout(url, {
        headers: { 'User-Agent': USER_AGENT },
    });

    if (!res.ok) return null;
    const data = await safeJsonParse(res);
    if (!data || !data.items?.length) return null;

    const item = data.items[0];

    // A descrição do UPCitemdb é texto de LOJA ("Zyad 5mg 30 comprimidos, Aché..."), não a
    // composição. Antes ela era cortada em vírgulas e cada pedaço virava "ingrediente": o
    // resultado listava propaganda como se fosse composição e ainda a mandava para a consulta
    // toxicológica. Sem composição, o produto fica SEM composição — e a tela pede a foto dos
    // ingredientes.
    const descricao = item.description || '';

    return {
        nome: item.title || 'Produto',
        categoria: item.category || 'Geral',
        marca: item.brand || '',
        ingredientes_texto: '',
        componentes: [],
        descricao,
        imagem: item.images?.[0] || null,
        barcode,
        source: 'upcitemdb',
        // Dados extras do UPCitemdb
        ean: item.ean || barcode,
        preco_min: item.lowest_recorded_price || null,
        preco_max: item.highest_recorded_price || null,
    };
}

// ─────────────────────────────────────────
// PONTO DE ENTRADA: Busca por nome
// ─────────────────────────────────────────

/**
 * Busca dados toxicológicos de uma substância por nome.
 * Cadeia: cache fresco → PubChem → EPA CTX (enriquece) → cache stale → null
 *
 * @param {string} name - Nome da substância ou produto
 * @returns {Promise<Object|null>}
 */
export async function getSubstanceByName(name) {
    if (!name?.trim()) return null;

    const trimmed = name.trim();

    // ① Cache fresco
    const cached = await getCached(trimmed);
    if (cached?.fresh) {
        return cached.data;
    }

    // ② PubChem (sem chave)
    try {
        const pubchemData = await fetchFromPubChem(trimmed);

        if (pubchemData) {
            // ③ EPA CTX (enriquecimento paralelo, se chave disponível)
            let enriched = pubchemData;
            if (EPA_ENRICHMENT_ENABLED) {
                try {
                    const epaData = await fetchFromEPACTX(trimmed);
                    if (epaData) {
                        enriched = mergeEPAData(pubchemData, epaData);
                    }
                } catch {
                    // Falha silenciosa — PubChem é suficiente
                }
            }

            await setCached(trimmed, enriched);
            return enriched;
        }
    } catch (e) {
        if (__DEV__) console.warn('[SubstanceService] PubChem fetch failed:', e.message);
    }

    // ④ Cache stale (melhor que null)
    if (cached) {
        return cached.data;
    }

    return null;
}

/**
 * Busca dados para uma lista de ingredientes (ex: de um barcode scan).
 * Retorna os que encontrar, ignora os que não.
 */
export async function getSubstancesForIngredients(ingredients) {
    if (!ingredients?.length) return [];

    const results = [];
    // Limita a 5 ingredientes por consulta para não sobrecarregar
    const limited = ingredients.slice(0, 5);

    for (const name of limited) {
        const data = await getSubstanceByName(name);
        if (data) {
            results.push(data);
        }
    }

    return results;
}

// ─────────────────────────────────────────
// PubChem PUG REST API
// ─────────────────────────────────────────

async function fetchFromPubChem(name) {
    try {
        const cid = await resolvePubChemCID(name);
        if (!cid) return null;

        const [ghs, firstAid] = await Promise.all([
            fetchPubChemGHS(cid),
            fetchPubChemFirstAid(cid),
        ]);

        return parsePubChemResult({ name, cid, ghs, firstAid });
    } catch (err) {
        if (__DEV__) console.warn('[PubChem] fetch error:', err.message);
        return null;
    }
}

async function resolvePubChemCID(name) {
    const url =
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/` +
        `${encodeURIComponent(name)}/cids/JSON`;

    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;

    const data = await res.json();
    return data?.IdentifierList?.CID?.[0] ?? null;
}

async function fetchPubChemGHS(cid) {
    const url =
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON` +
        `?heading=GHS+Classification`;

    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    return res.json();
}

async function fetchPubChemFirstAid(cid) {
    const url =
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON` +
        `?heading=First+Aid+Measures`;

    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    return res.json();
}

function parsePubChemResult({ name, cid, ghs, firstAid }) {
    const hStatements = extractHStatements(ghs);
    const pStatements = extractPStatements(ghs);
    const categories = mapToCategories(hStatements);
    const firstAidPt = extractFirstAidPt(firstAid);

    return {
        name_pt: name,
        name_en: ghs?.Record?.RecordTitle ?? name,
        pubchem_cid: cid,
        cas_number: extractCAS(ghs),
        ghs_categories: categories,
        hazard_statements: hStatements,
        precautionary: pStatements.slice(0, 6),
        first_aid: firstAidPt,
        toxic_for_species: [],
        severity: calculateSeverity(hStatements),
        source: 'pubchem',
        // EPA CTX campos (preenchidos se chave disponível)
        epa_ld50: null,
        epa_carcinogenicity: null,
        epa_reproductive_toxicity: null,
        epa_genotoxicity: null,
    };
}

function extractHStatements(ghs) {
    if (!ghs) return [];
    const statements = [];

    const walkSections = (sections) => {
        for (const section of (sections || [])) {
            // Procura em sub-seções
            if (section.Section) {
                walkSections(section.Section);
            }
            for (const info of (section.Information || [])) {
                for (const { String: text } of (info.Value?.StringWithMarkup || [])) {
                    if (!text) continue;
                    const match = text.match(/^(H\d{3}[a-z]?)[:\s]/i);
                    if (match) {
                        const code = match[1].toUpperCase();
                        if (RELEVANT_H_CODES.has(code)) {
                            statements.push({
                                code,
                                text_en: text.replace(/^H\d{3}[a-z]?[:\s]*/i, '').trim(),
                                text_pt: H_TRANSLATIONS[code] || text,
                            });
                        }
                    }
                }
            }
        }
    };

    walkSections(ghs?.Record?.Section || []);

    // Deduplica por código
    return statements.filter(
        (s, i, arr) => arr.findIndex(x => x.code === s.code) === i
    );
}

function extractPStatements(ghs) {
    if (!ghs) return [];
    const statements = [];

    const walkSections = (sections) => {
        for (const section of (sections || [])) {
            if (section.Section) walkSections(section.Section);
            for (const info of (section.Information || [])) {
                for (const { String: text } of (info.Value?.StringWithMarkup || [])) {
                    if (!text) continue;
                    const match = text.match(/^(P\d{3})[:\s]/i);
                    if (match) {
                        statements.push({
                            code: match[1].toUpperCase(),
                            text: text.replace(/^P\d{3}[:\s]*/i, '').trim(),
                        });
                    }
                }
            }
        }
    };

    walkSections(ghs?.Record?.Section || []);
    return statements.filter((s, i, arr) => arr.findIndex(x => x.code === s.code) === i);
}

function mapToCategories(hStatements) {
    const categories = new Set();

    for (const stmt of hStatements) {
        const combined = `${stmt.code} ${stmt.text_en}`;
        for (const { match, category } of GHS_CATEGORY_MAP) {
            if (match.test(combined)) categories.add(category);
        }
    }

    return [...categories];
}

function extractFirstAidPt(firstAidJson) {
    if (!firstAidJson) return { ...DEFAULT_FIRST_AID };

    const result = { ...DEFAULT_FIRST_AID };

    const walkSections = (sections) => {
        for (const section of (sections || [])) {
            if (section.Section) walkSections(section.Section);
            const heading = section.TOCHeading ?? '';
            const text = section.Information?.[0]?.Value?.StringWithMarkup?.[0]?.String ?? '';
            if (!text) continue;

            if (/ingestion|swallow/i.test(heading))
                result.ingestao = `${text} CIATOX: 0800 722 6001.`;
            else if (/skin/i.test(heading))
                result.contato_pele = text;
            else if (/eye/i.test(heading))
                result.contato_olhos = text;
            else if (/inhal/i.test(heading))
                result.inalacao = text;
        }
    };

    walkSections(firstAidJson?.Record?.Section || []);
    return result;
}

function extractCAS(ghs) {
    const walkSections = (sections) => {
        for (const s of (sections || [])) {
            if (s.Section) {
                const r = walkSections(s.Section);
                if (r) return r;
            }
            for (const info of (s.Information || [])) {
                const val = info.Value?.StringWithMarkup?.[0]?.String ?? '';
                if (/^\d{2,7}-\d{2}-\d$/.test(val)) return val;
            }
        }
        return null;
    };
    return walkSections(ghs?.Record?.Section || []);
}

function calculateSeverity(hStatements) {
    const codes = new Set(hStatements.map(s => s.code));

    // Fatal
    if (codes.has('H300') || codes.has('H310') || codes.has('H330')) return 'Extremo';
    // Tóxico ou corrosivo
    if (codes.has('H301') || codes.has('H311') || codes.has('H331') || codes.has('H314')) return 'Muito Alto';
    // Carcinogênico ou teratogênico
    if (codes.has('H350') || codes.has('H360') || codes.has('H340')) return 'Muito Alto';
    // Nocivo
    if (codes.has('H302') || codes.has('H312') || codes.has('H332')) return 'Alto';
    // Lesão ocular grave ou sensibilizante
    if (codes.has('H318') || codes.has('H317') || codes.has('H334')) return 'Alto';
    // Irritante
    if (codes.has('H315') || codes.has('H319') || codes.has('H335')) return 'Médio';
    // Sonolência/tontura
    if (codes.has('H336')) return 'Médio';
    // Algum H-code reconhecido
    if (hStatements.length > 0) return 'Baixo';

    return 'Indeterminado';
}

// ─────────────────────────────────────────
// EPA CTX API (enriquecimento)
// ─────────────────────────────────────────

async function fetchFromEPACTX(name) {
    if (!EPA_ENRICHMENT_ENABLED) return null;

    try {
        // Busca DTXSID pelo nome
        const searchUrl = `${Config.VIGILARO_PROXY_URL}/api/epa/chemical/search/equal/${encodeURIComponent(name)}`;
        const searchRes = await fetchWithTimeout(searchUrl, {
            headers: { 'x-vigilaro-token': Config.VIGILARO_APP_SECRET },
        });

        if (!searchRes.ok) return null;
        const searchData = await searchRes.json();

        const dtxsid = searchData?.[0]?.dtxsid;
        if (!dtxsid) return null;

        // Busca dados de hazard
        const hazardUrl = `${Config.VIGILARO_PROXY_URL}/api/epa/chemical/detail/search/by-dtxsid/${dtxsid}`;
        const hazardRes = await fetchWithTimeout(hazardUrl, {
            headers: { 'x-vigilaro-token': Config.VIGILARO_APP_SECRET },
        });

        if (!hazardRes.ok) return null;
        return hazardRes.json();
    } catch (e) {
        if (__DEV__) console.warn('[EPA CTX] fetch error:', e.message);
        return null;
    }
}

function mergeEPAData(pubchemData, epaData) {
    return {
        ...pubchemData,
        source: 'pubchem+epa',
        epa_ld50: epaData?.toxvalData?.oralLd50 ?? null,
        epa_carcinogenicity: epaData?.cancerClassification ?? null,
        epa_reproductive_toxicity: epaData?.reproductiveToxicity ?? null,
        epa_genotoxicity: epaData?.genotoxicity ?? null,
    };
}

// ─────────────────────────────────────────
// Utilitários
// ─────────────────────────────────────────

// Padrão AbortController centralizado em utils/fetchWithTimeout; aqui só
// fixamos o timeout padrão por API desta cadeia (12s).
function fetchWithTimeout(url, options = {}) {
    return fetchWithTimeoutBase(url, options, FETCH_TIMEOUT);
}

/**
 * Parse JSON de forma segura — protege contra APIs que retornam HTML/texto
 * em vez de JSON (ex: Open Food Facts retorna HTML 404 para barcodes inválidos).
 */
async function safeJsonParse(response) {
    try {
        const text = await response.text();
        if (!text || text.trim().startsWith('<')) {
            // Resposta HTML ou vazia — não é JSON
            if (__DEV__) console.warn('[SafeJSON] Resposta não-JSON recebida (HTML/vazio)');
            return null;
        }
        return JSON.parse(text);
    } catch (e) {
        if (__DEV__) console.warn('[SafeJSON] Falha ao parsear JSON:', e.message);
        return null;
    }
}
