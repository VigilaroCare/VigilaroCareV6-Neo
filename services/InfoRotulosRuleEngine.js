/**
 * InfoRotulosRuleEngine.js
 * Motor de regras que cruza dados de substâncias com o perfil familiar.
 *
 * Usa o ProfileService existente (sem schema paralelo).
 * Gera alertas personalizados por membro da família.
 *
 * Severidades: CRITICAL > HIGH > MEDIUM > LOW > INFO
 *
 * OS TEXTOS NÃO MORAM AQUI. Até 28/10/2026 este arquivo trazia cerca de 40
 * frases de segurança em português, sem tradução e fora da trava de revisão
 * (que só varre data/, screens/ e components/). Agora o texto vive em
 * data/regras_inforotulos.js — pt-BR como fonte, com _en/_es/_ptpt, lido por
 * t_field(). Aqui ficam só as REGRAS: quando cada alerta aparece e com que
 * severidade.
 */

import ProfileService from './ProfileService';
import { t_field } from '../utils/getLocalizedField';
import { rotuloOpcaoPerfil } from '../data/opcoesPerfil';
import { SAFETY_MIXTURES } from '../data/safety_mixtures';
import {
    SEVERIDADES, ESPECIES, TOXICIDADE_PETS, ALERTAS, MISTURAS_DO_PRODUTO, RESUMO_FAMILIA,
} from '../data/regras_inforotulos';

// ─────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────

// Cor, nível e ícone são design. O rótulo é texto e sai do arquivo de conteúdo:
// o getter é lido na hora de montar o alerta (spread), então acompanha o idioma.
export const SEVERITY = {
    CRITICAL: { level: 5, get label() { return t_field(SEVERIDADES.CRITICAL, 'label'); }, color: '#B71C1C', bg: '#FFEBEE', icon: '🚨' },
    HIGH:     { level: 4, get label() { return t_field(SEVERIDADES.HIGH, 'label'); },     color: '#D32F2F', bg: '#FFCDD2', icon: '⚠️' },
    MEDIUM:   { level: 3, get label() { return t_field(SEVERIDADES.MEDIUM, 'label'); },   color: '#F57C00', bg: '#FFF3E0', icon: '⚡' },
    LOW:      { level: 2, get label() { return t_field(SEVERIDADES.LOW, 'label'); },      color: '#FFC107', bg: '#FFF8E1', icon: '💡' },
    INFO:     { level: 1, get label() { return t_field(SEVERIDADES.INFO, 'label'); },     color: '#1976D2', bg: '#E3F2FD', icon: 'ℹ️' },
};

/** Troca {{marcador}} pelo valor. Marcador ausente vira vazio, nunca "undefined". */
function interpolar(texto, vars = {}) {
    return String(texto || '').replace(/\{\{(\w+)\}\}/g, (_m, k) => (vars[k] == null ? '' : String(vars[k])));
}

/** Campo de texto de um bloco de conteúdo, no idioma atual, com marcadores preenchidos. */
function texto(bloco, campo, vars) {
    return interpolar(t_field(bloco, campo), vars);
}

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
    // As do PRODUTO (catálogo curado, ou o que o rótulo lido por foto imprime) e as da
    // SUBSTÂNCIA consultada, juntas. Antes as da substância ganhavam e, se viessem vazias
    // (achou o composto, sem código H), apagavam as do produto — e o aviso para bebê,
    // gestante e idoso, que depende delas, não disparava.
    const categories = [...new Set([...(productData?.ghs_categories || []), ...(substanceData?.ghs_categories || [])])];
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
                title: texto(ALERTAS.criancaMenor3, 'titulo', { nomes: familyContext.childrenUnder3.map(p => p.nome).join(', ') }),
                message: texto(ALERTAS.criancaMenor3, 'mensagem'),
                action: texto(ALERTAS.criancaMenor3, 'acao'),
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
                title: texto(ALERTAS.criancaMenor12, 'titulo'),
                message: texto(ALERTAS.criancaMenor12, 'mensagem'),
                action: texto(ALERTAS.criancaMenor12, 'acao'),
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
                title: texto(ALERTAS.gestante, 'titulo', { nomes: familyContext.pregnant.map(p => p.nome).join(', ') }),
                message: texto(ALERTAS.gestante, 'mensagem'),
                action: texto(ALERTAS.gestante, 'acao'),
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
                title: texto(ALERTAS.gestanteSolvente, 'titulo'),
                message: texto(ALERTAS.gestanteSolvente, 'mensagem'),
                action: texto(ALERTAS.gestanteSolvente, 'acao'),
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
                title: texto(ALERTAS.idoso, 'titulo', { nomes: familyContext.elderly.map(p => p.nome).join(', ') }),
                message: texto(ALERTAS.idoso, 'mensagem'),
                action: texto(ALERTAS.idoso, 'acao'),
            });
        }
    }

    // ── Regra 5: Pets (por espécie) ──
    for (const pet of familyContext.pets) {
        const especie = normalizePetSpecies(pet.especie);
        const toxRules = TOXICIDADE_PETS[especie];

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
                    title: texto(ALERTAS.pet, 'titulo', { nome: pet.nome, especie: t_field(ESPECIES[especie], 'nome') }),
                    message: t_field(rule, 'mensagem'),
                    action: texto(ALERTAS.pet, 'acao', { nome: pet.nome }),
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
                // O valor gravado no perfil pode ser um rótulo antigo de opção
                // renomeada ("Aspirina"); testa o gravado e o rótulo de hoje.
                const exibido = rotuloOpcaoPerfil(allergen);
                const hasMatch = textsToTest.some(t =>
                    t.toLowerCase().includes(String(allergen).toLowerCase()) ||
                    t.toLowerCase().includes(String(exibido).toLowerCase())
                );

                if (hasMatch) {
                    alerts.push({
                        severity: 'HIGH',
                        ...SEVERITY.HIGH,
                        rule: 'allergy_cross',
                        profiles: [profile],
                        title: texto(ALERTAS.alergia, 'titulo', { nome: profile.nome, alergeno: exibido }),
                        message: texto(ALERTAS.alergia, 'mensagem', { nome: profile.nome, alergeno: exibido }),
                        action: texto(ALERTAS.alergia, 'acao'),
                    });
                }
            }
        }
    }

    // ── Regra 7: Misturas perigosas (alerta educativo) ──
    // O texto vem de data/safety_mixtures.js — a versão canônica, revisada — e
    // não de uma cópia aqui. As regras de qual produto dispara qual mistura ficam
    // em MISTURAS_DO_PRODUTO.
    const secoesDaMistura = new Set();
    for (const r of MISTURAS_DO_PRODUTO) {
        const alvo = [name, ...(r.emComponentes ? componentes : [])].filter(Boolean);
        if (alvo.some(t => r.match.test(t))) r.secoes.forEach(id => secoesDaMistura.add(id));
    }
    if (secoesDaMistura.size > 0) {
        const lista = SAFETY_MIXTURES.sections
            .filter(s => secoesDaMistura.has(s.id))
            .map(s => t_field(s, 'title'));

        alerts.push({
            severity: 'INFO',
            ...SEVERITY.INFO,
            rule: 'mixture_warning',
            profiles: [],
            title: texto(ALERTAS.misturas, 'titulo'),
            message: texto(ALERTAS.misturas, 'mensagem', { lista: lista.join('; ') }),
            action: texto(ALERTAS.misturas, 'acao'),
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
 * Retorna resumo do perfil familiar.
 * Ex: "1 criança (bebê), 1 gato"
 *
 * Devolve DOIS textos, de propósito:
 *  - `label` — no idioma do app, completo. É o que a tela "Seu perfil familiar"
 *              mostra, só no aparelho.
 *  - `text`  — pt-BR, completo. Uso LOCAL; não mande para fora.
 *  - `textoIA` — pt-BR e SEM dado de saúde (nada de gestação). É o único que pode
 *              entrar no pedido à IA; mudar de idioma não muda o que o prompt diz.
 */
export async function getFamilySummary() {
    const ctx = await loadFamilyContext();
    if (!ctx) return null;

    // semSaude: o resumo que VAI PARA A IA. Gestação e alergias são dado de saúde e
    // nunca saem do aparelho (o aviso de permissão promete isso). Faixa etária e
    // animais de estimação ficam.
    const montar = (ptBr, semSaude = false) => {
        // pt-BR lê o campo base; os outros idiomas passam por t_field().
        const c = (bloco, campo) => (ptBr ? (bloco[campo] ?? '') : t_field(bloco, campo));
        const qtd = (bloco, n) => c(bloco, n === 1 ? 'um' : 'varios').replace('{{n}}', String(n));

        const parts = [];

        if (ctx.childrenUnder3.length > 0) {
            const ages = ctx.childrenUnder3.map(p => {
                const age = ProfileService.calcularIdade(p.dataNascimento);
                return age < 1 ? c(RESUMO_FAMILIA.bebe, 'nome') : qtd(RESUMO_FAMILIA.ano, age);
            });
            parts.push(`${qtd(RESUMO_FAMILIA.crianca, ctx.childrenUnder3.length)} (${ages.join(', ')})`);
        } else if (ctx.childrenUnder12.length > 0) {
            parts.push(qtd(RESUMO_FAMILIA.crianca, ctx.childrenUnder12.length));
        }

        if (ctx.pregnant.length > 0 && !semSaude) {
            parts.push(qtd(RESUMO_FAMILIA.gestante, ctx.pregnant.length));
        }

        if (ctx.elderly.length > 0) {
            parts.push(qtd(RESUMO_FAMILIA.idoso, ctx.elderly.length));
        }

        if (ctx.pets.length > 0) {
            const petTypes = {};
            for (const pet of ctx.pets) {
                const species = normalizePetSpecies(pet.especie);
                petTypes[species] = (petTypes[species] || 0) + 1;
            }
            for (const [species, count] of Object.entries(petTypes)) {
                const e = ESPECIES[species] || ESPECIES.outro;
                parts.push(`${count} ${c(e, count > 1 ? 'plural' : 'nome')}`);
            }
        }

        return parts;
    };

    const partesPt = montar(true);
    if (partesPt.length === 0) return null;

    return {
        text: partesPt.join(', '),
        textoIA: montar(true, true).join(', '),
        label: montar(false).join(', '),
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
