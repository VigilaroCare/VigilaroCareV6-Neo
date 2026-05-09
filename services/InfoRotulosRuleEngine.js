/**
 * InfoRotulosRuleEngine.js
 * Motor de regras que cruza dados de substâncias com o perfil familiar.
 *
 * Usa o ProfileService existente (sem schema paralelo).
 * Gera alertas personalizados por membro da família.
 *
 * Severidades: CRITICAL > HIGH > MEDIUM > LOW > INFO
 */

import ProfileService from './ProfileService';

// ─────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────

export const SEVERITY = {
    CRITICAL: { level: 5, label: 'CRÍTICO', color: '#B71C1C', bg: '#FFEBEE', icon: '🚨' },
    HIGH:     { level: 4, label: 'ALTO',    color: '#D32F2F', bg: '#FFCDD2', icon: '⚠️' },
    MEDIUM:   { level: 3, label: 'MÉDIO',   color: '#F57C00', bg: '#FFF3E0', icon: '⚡' },
    LOW:      { level: 2, label: 'BAIXO',   color: '#FFC107', bg: '#FFF8E1', icon: '💡' },
    INFO:     { level: 1, label: 'INFO',    color: '#1976D2', bg: '#E3F2FD', icon: 'ℹ️' },
};

// Substâncias conhecidas como tóxicas para espécies específicas
const PET_TOXICITY_DB = {
    // Substâncias fatais para GATOS
    gato: [
        { match: /paracetamol|acetaminophen|tylenol/i, message: 'FATAL para gatos — causa anemia hemolítica e asfixia celular. Dose mínima letal: 10mg/kg.', severity: 'CRITICAL' },
        { match: /fenol|phenol|creosol|cresol/i, message: 'Altamente tóxico para gatos — deficiência enzimática impede metabolização. Evite desinfetantes com fenol.', severity: 'CRITICAL' },
        { match: /permetrina|permethrin/i, message: 'FATAL para gatos — nunca aplicar antipulgas de cão em gato.', severity: 'CRITICAL' },
        { match: /etilenoglicol|ethylene.?glycol|anticongelante/i, message: 'Fatal para gatos e cães — sabor adocicado atrai pets. Causa falência renal rápida.', severity: 'CRITICAL' },
        { match: /óleo.*essencial.*melaleuca|tea.?tree/i, message: 'Tóxico para gatos — não usar difusores em ambientes com felinos.', severity: 'HIGH' },
        { match: /ibuprofeno|ibuprofen/i, message: 'Tóxico para gatos e cães — pode causar úlceras gástricas e falência renal.', severity: 'HIGH' },
        { match: /cloro|hipoclorito|chlorine|bleach/i, message: 'Irritante severo para mucosas felinas. Enxaguar piso completamente antes de liberar acesso ao pet.', severity: 'MEDIUM' },
    ],
    // Substâncias tóxicas para CÃES
    cachorro: [
        { match: /etilenoglicol|ethylene.?glycol|anticongelante/i, message: 'Fatal para cães — sabor adocicado os atrai. Falência renal em horas.', severity: 'CRITICAL' },
        { match: /xilitol|xylitol/i, message: 'EXTREMAMENTE tóxico para cães — hipoglicemia e falência hepática fulminante.', severity: 'CRITICAL' },
        { match: /raticida|brodifacoum|warfarin|cumarínico/i, message: 'Fatal para cães — causa hemorragia interna. Sintomas podem levar dias para aparecer.', severity: 'CRITICAL' },
        { match: /ibuprofeno|ibuprofen/i, message: 'Tóxico para cães — pode causar úlceras gástricas e falência renal.', severity: 'HIGH' },
        { match: /chocolate|teobromina|theobromine/i, message: 'Tóxico para cães — chocolate amargo é mais perigoso que ao leite.', severity: 'HIGH' },
    ],
    // Substâncias tóxicas para AVES
    ave: [
        { match: /teflon|ptfe|politetrafluoretileno/i, message: 'FATAL para aves — vapores de panelas antiaderentes superaquecidas causam morte rápida.', severity: 'CRITICAL' },
        { match: /aerossol|spray|inseticida/i, message: 'Sistema respiratório de aves é extremamente sensível. Nunca use sprays perto de viveiros.', severity: 'HIGH' },
        { match: /cloro|hipoclorito|bleach/i, message: 'Vapores de cloro são tóxicos para aves. Ventilar antes de devolver ao ambiente.', severity: 'HIGH' },
    ],
    // Peixes
    peixe: [
        { match: /inseticida|piretróide|pyrethroid|piretrina/i, message: 'FATAL para peixes — piretróides são extremamente tóxicos em ambiente aquático.', severity: 'CRITICAL' },
        { match: /cloro|hipoclorito|bleach/i, message: 'Cloro é letal para peixes. Nunca descartar produto com cloro em aquários ou fontes.', severity: 'CRITICAL' },
    ],
};

// ─────────────────────────────────────────
// PONTO DE ENTRADA PRINCIPAL
// ─────────────────────────────────────────

/**
 * Avalia um produto/substância contra o perfil familiar do usuário.
 *
 * @param {Object} substanceData - Dados do SubstanceService (GHS, categorias, etc.)
 * @param {Object} [productData] - Dados do produto (nome, componentes) — opcional
 * @returns {Promise<Array<Object>>} - Lista de alertas ordenada por severidade
 */
export async function evaluateProduct(substanceData, productData = null) {
    const alerts = [];

    // Carrega perfil familiar da residência ativa
    const familyContext = await loadFamilyContext();

    if (!familyContext) return alerts;

    const name = productData?.nome || substanceData?.name_pt || '';
    const categories = substanceData?.ghs_categories || productData?.ghs_categories || [];
    const hCodes = new Set((substanceData?.hazard_statements || []).map(h => h.code));
    const componentes = productData?.componentes || [];

    // ── Regra 1: Crianças < 3 anos ──
    if (familyContext.childrenUnder3.length > 0) {
        const dangerousForBabies = categories.some(c =>
            ['corrosivo', 'toxico_agudo_ingestao', 'toxico_agudo_cutaneo', 'nocivo_ingestao', 'irritante_ocular'].includes(c)
        );

        if (dangerousForBabies) {
            alerts.push({
                severity: 'CRITICAL',
                ...SEVERITY.CRITICAL,
                rule: 'child_under_3',
                profiles: familyContext.childrenUnder3,
                title: `Perigo para ${familyContext.childrenUnder3.map(p => p.nome).join(', ')}`,
                message: `Produto com substâncias corrosivas ou tóxicas. Crianças menores de 3 anos exploram TUDO com a boca. Manter absolutamente fora de alcance, preferencialmente trancado.`,
                action: 'Armazene em armário alto com trava de segurança.',
            });
        }
    }

    // ── Regra 2: Crianças < 12 anos ──
    if (familyContext.childrenUnder12.length > 0 && familyContext.childrenUnder3.length === 0) {
        const dangerousForChildren = categories.some(c =>
            ['toxico_agudo_ingestao', 'toxico_agudo_inalacao', 'corrosivo'].includes(c)
        );

        if (dangerousForChildren) {
            alerts.push({
                severity: 'HIGH',
                ...SEVERITY.HIGH,
                rule: 'child_under_12',
                profiles: familyContext.childrenUnder12,
                title: `Atenção: produto perigoso na casa`,
                message: `Substância tóxica ou corrosiva. Crianças em idade escolar já conseguem abrir embalagens. Oriente sobre o perigo.`,
                action: 'Converse sobre segurança. Mantenha fora do alcance.',
            });
        }
    }

    // ── Regra 3: Gestantes ──
    if (familyContext.pregnant.length > 0) {
        const dangerousForPregnant = categories.some(c =>
            ['teratogeno', 'genotóxico', 'carcinogenico', 'neurotoxico'].includes(c)
        );

        if (dangerousForPregnant) {
            alerts.push({
                severity: 'HIGH',
                ...SEVERITY.HIGH,
                rule: 'pregnant',
                profiles: familyContext.pregnant,
                title: `Risco na gestação para ${familyContext.pregnant.map(p => p.nome).join(', ')}`,
                message: `Produto contém substâncias com potencial teratogênico, genotóxico ou carcinogênico. Evite exposição direta durante a gestação. Prefira alternativas seguras.`,
                action: 'Peça a outra pessoa para manusear este produto.',
            });
        }

        // Solventes orgânicos — risco adicional na gestação
        const hasSolvent = categories.includes('neurotoxico') || hCodes.has('H336');
        if (hasSolvent) {
            alerts.push({
                severity: 'MEDIUM',
                ...SEVERITY.MEDIUM,
                rule: 'pregnant_solvent',
                profiles: familyContext.pregnant,
                title: 'Solvente — evitar na gestação',
                message: 'Produtos que causam sonolência/tontura podem conter solventes orgânicos prejudiciais ao desenvolvimento fetal.',
                action: 'Ventile o ambiente. Evite inalação prolongada.',
            });
        }
    }

    // ── Regra 4: Idosos (70+) ──
    if (familyContext.elderly.length > 0) {
        const riskyForElderly = categories.some(c =>
            ['irritante_respiratorio', 'neurotoxico', 'toxico_agudo_inalacao'].includes(c)
        );

        if (riskyForElderly) {
            alerts.push({
                severity: 'MEDIUM',
                ...SEVERITY.MEDIUM,
                rule: 'elderly',
                profiles: familyContext.elderly,
                title: `Cuidado para ${familyContext.elderly.map(p => p.nome).join(', ')}`,
                message: 'Produto com irritantes respiratórios ou neurotóxicos. Idosos têm maior sensibilidade a vapores e risco aumentado de tontura/queda.',
                action: 'Use em local bem ventilado. Evite uso prolongado.',
            });
        }
    }

    // ── Regra 5: Pets (por espécie) ──
    for (const pet of familyContext.pets) {
        const especie = normalizePetSpecies(pet.especie);
        const toxRules = PET_TOXICITY_DB[especie];

        if (!toxRules) continue;

        // Testa contra nome do produto E contra cada componente
        const textsToTest = [name, ...componentes].filter(Boolean);

        for (const rule of toxRules) {
            const matched = textsToTest.some(t => rule.match.test(t));
            if (matched) {
                alerts.push({
                    severity: rule.severity,
                    ...SEVERITY[rule.severity],
                    rule: 'pet_toxicity',
                    profiles: [pet],
                    title: `Tóxico para ${pet.nome} (${especie})`,
                    message: rule.message,
                    action: `Mantenha fora do alcance de ${pet.nome}. Em caso de contato, procure veterinário de emergência.`,
                });
                break; // Uma alerta por pet por produto
            }
        }
    }

    // ── Regra 6: Alergias cadastradas ──
    if (familyContext.allergies.length > 0) {
        const isAllergen = categories.includes('alergeno');

        if (isAllergen) {
            // Verifica cruzamento com alergias específicas cadastradas
            for (const { profile, allergen } of familyContext.allergies) {
                const textsToTest = [name, ...componentes].filter(Boolean);
                const hasMatch = textsToTest.some(t =>
                    t.toLowerCase().includes(allergen.toLowerCase())
                );

                if (hasMatch) {
                    alerts.push({
                        severity: 'HIGH',
                        ...SEVERITY.HIGH,
                        rule: 'allergy_cross',
                        profiles: [profile],
                        title: `Alergia de ${profile.nome}: ${allergen}`,
                        message: `Este produto pode conter "${allergen}", listada como alergia de ${profile.nome}. Evite contato direto.`,
                        action: 'Verifique o rótulo completo. Use luvas se necessário.',
                    });
                }
            }
        }
    }

    // ── Regra 7: Misturas perigosas (alerta educativo) ──
    const isBleach = /cloro|hipoclorito|água.?sanitária|bleach/i.test(name);
    const isAmmonia = /amônia|ammonia/i.test(name);
    const isAcid = /ácido|acid|vinagre/i.test(name);

    if (isBleach || isAmmonia || isAcid) {
        alerts.push({
            severity: 'INFO',
            ...SEVERITY.INFO,
            rule: 'mixture_warning',
            profiles: [],
            title: '⚠️ NUNCA misturar com outros produtos',
            message: isBleach
                ? 'Água sanitária + amônia = gás cloramina (tóxico). Água sanitária + ácido/vinagre = gás cloro (potencialmente letal). Use APENAS um produto por vez.'
                : isAmmonia
                    ? 'Amônia + cloro = gás cloramina (tóxico). Nunca misture produtos de limpeza.'
                    : 'Ácidos + cloro = gás cloro (potencialmente letal). Nunca misture produtos de limpeza.',
            action: 'Use um produto de cada vez. Ventile o ambiente.',
        });
    }

    // Ordena por severidade (CRITICAL primeiro)
    alerts.sort((a, b) => (SEVERITY[b.severity]?.level || 0) - (SEVERITY[a.severity]?.level || 0));

    return alerts;
}

// ─────────────────────────────────────────
// Adapter: ProfileService → contexto para regras
// ─────────────────────────────────────────

async function loadFamilyContext() {
    try {
        const humans = await ProfileService.getPerfisHumanos();
        const pets = await ProfileService.getPets();

        // Crianças por faixa
        const childrenUnder3 = humans.filter(p => {
            const age = ProfileService.calcularIdade(p.dataNascimento);
            return age !== null && age < 3;
        });

        const childrenUnder12 = humans.filter(p => {
            const age = ProfileService.calcularIdade(p.dataNascimento);
            return age !== null && age >= 3 && age < 12;
        });

        // Gestantes (campo condicoesMedicas)
        const pregnant = humans.filter(p =>
            (p.condicoesMedicas || []).some(c =>
                /gestante|grávida|gravida|gestação|gestacao|pregnant/i.test(c)
            )
        );

        // Idosos 70+
        const elderly = humans.filter(p => {
            const age = ProfileService.calcularIdade(p.dataNascimento);
            return age !== null && age >= 70;
        });

        // Alergias (flatten: [{ profile, allergen }])
        const allergies = [];
        for (const p of humans) {
            for (const allergen of (p.alergias || [])) {
                allergies.push({ profile: p, allergen });
            }
        }

        return {
            childrenUnder3,
            childrenUnder12,
            pregnant,
            elderly,
            pets,
            allergies,
            totalHumans: humans.length,
            totalPets: pets.length,
        };
    } catch (e) {
        if (__DEV__) console.warn('[RuleEngine] loadFamilyContext error:', e.message);
        return null;
    }
}

/**
 * Retorna resumo do perfil familiar para exibição na UI.
 * Ex: "1 criança (2 anos), 1 gato"
 */
export async function getFamilySummary() {
    const ctx = await loadFamilyContext();
    if (!ctx) return null;

    const parts = [];

    if (ctx.childrenUnder3.length > 0) {
        const ages = ctx.childrenUnder3.map(p => {
            const age = ProfileService.calcularIdade(p.dataNascimento);
            return age < 1 ? 'bebê' : `${age} ano${age > 1 ? 's' : ''}`;
        });
        parts.push(`${ctx.childrenUnder3.length} criança${ctx.childrenUnder3.length > 1 ? 's' : ''} (${ages.join(', ')})`);
    } else if (ctx.childrenUnder12.length > 0) {
        parts.push(`${ctx.childrenUnder12.length} criança${ctx.childrenUnder12.length > 1 ? 's' : ''}`);
    }

    if (ctx.pregnant.length > 0) {
        parts.push(`${ctx.pregnant.length} gestante${ctx.pregnant.length > 1 ? 's' : ''}`);
    }

    if (ctx.elderly.length > 0) {
        parts.push(`${ctx.elderly.length} idoso${ctx.elderly.length > 1 ? 's' : ''} (70+)`);
    }

    if (ctx.pets.length > 0) {
        const petTypes = {};
        for (const pet of ctx.pets) {
            const species = normalizePetSpecies(pet.especie);
            petTypes[species] = (petTypes[species] || 0) + 1;
        }
        for (const [species, count] of Object.entries(petTypes)) {
            parts.push(`${count} ${species}${count > 1 ? 's' : ''}`);
        }
    }

    if (parts.length === 0) return null;

    return {
        text: parts.join(', '),
        hasVulnerables: ctx.childrenUnder3.length > 0 || ctx.pregnant.length > 0 || ctx.elderly.length > 0,
        hasPets: ctx.pets.length > 0,
        context: ctx,
    };
}

// ─────────────────────────────────────────
// Utilitários
// ─────────────────────────────────────────

function normalizePetSpecies(especie) {
    if (!especie) return 'outro';
    const e = especie.toLowerCase().trim();
    if (/gato|felino|cat/i.test(e)) return 'gato';
    if (/cão|cachorro|dog|canino/i.test(e)) return 'cachorro';
    if (/ave|pássaro|pássaro|bird|calopsita|periquito|papagaio|canário/i.test(e)) return 'ave';
    if (/peixe|fish|aquário/i.test(e)) return 'peixe';
    return 'outro';
}
