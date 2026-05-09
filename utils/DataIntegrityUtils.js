/**
 * DataIntegrityUtils.js
 * 
 * Motor de Validação de Integridade de Dados — Vigilaro Care Neo.
 * Seguro para uso em React Native (sem dependências de Node.js).
 */

export const SEVERITY = {
    CRITICAL: '🔴 CRÍTICO',
    HIGH:     '🟠 ALTO',
    MEDIUM:   '🟡 MÉDIO',
    LOW:      '🔵 BAIXO',
    INFO:     '⚪ INFO',
};

/**
 * Executa todas as validações sobre o objeto @vigilaro_data.
 * @param {object} data - O objeto completo parseado do AsyncStorage
 * @returns {{ issues: Array, stats: object, summary: string, healthStatus: string }}
 */
export function validateVigilaroData(data) {
    const issues = [];
    const stats = {
        totalPerfis: 0,
        totalResidences: 0,
        orphanedProfiles: 0,
        phantomReferences: 0,
        duplicateIds: 0,
        residencesWithoutMoradia: 0,
        perfisWithoutName: 0,
    };

    if (!data || typeof data !== 'object') {
        issues.push({
            severity: SEVERITY.CRITICAL,
            category: 'ESTRUTURA',
            message: 'Dados são null, undefined ou não são um objeto válido.',
        });
        return buildReport(issues, stats);
    }

    // --- 1. VALIDAÇÃO ESTRUTURAL BASE ---
    validateRootStructure(data, issues);

    // --- 2. VALIDAÇÃO DE RESIDÊNCIAS ---
    validateResidences(data, issues, stats);

    // --- 3. VALIDAÇÃO DE PERFIS ---
    validatePerfis(data, issues, stats);

    // --- 4. INTEGRIDADE REFERENCIAL ---
    validateReferentialIntegrity(data, issues, stats);

    // --- 5. CONSISTÊNCIA DO PERFIL ATIVO ---
    validateActiveProfile(data, issues);

    // --- 6. CONSISTÊNCIA DA RESIDÊNCIA ATIVA ---
    validateActiveResidence(data, issues);

    // --- 7. MAPPING / MORADIA SYNC ---
    validateMappingSync(data, issues);

    // --- 8. DADOS LEGADOS / DUPLICAÇÃO ---
    validateLegacyData(data, issues);

    return buildReport(issues, stats);
}

// ============================================================
// VALIDADORES INDIVIDUAIS
// ============================================================

function validateRootStructure(data, issues) {
    const requiredKeys = ['perfis', 'residences', 'activeResidenceId'];
    for (const key of requiredKeys) {
        if (data[key] === undefined) {
            issues.push({
                severity: SEVERITY.HIGH,
                category: 'ESTRUTURA',
                message: `Chave raiz ausente: "${key}". Pode indicar dados não migrados ou corrompidos.`,
            });
        }
    }

    if (data.perfis && !Array.isArray(data.perfis)) {
        issues.push({
            severity: SEVERITY.CRITICAL,
            category: 'ESTRUTURA',
            message: '"perfis" existe mas não é um array.',
        });
    }

    if (data.residences && !Array.isArray(data.residences)) {
        issues.push({
            severity: SEVERITY.CRITICAL,
            category: 'ESTRUTURA',
            message: '"residences" existe mas não é um array.',
        });
    }
}

function validateResidences(data, issues, stats) {
    const residences = data.residences;
    if (!Array.isArray(residences)) return;

    stats.totalResidences = residences.length;

    if (residences.length === 0) {
        issues.push({
            severity: SEVERITY.HIGH,
            category: 'RESIDÊNCIAS',
            message: 'Array de residências está vazio. O app inicializa uma default_home — possível corrupção.',
        });
        return;
    }

    const ids = new Set();
    for (const res of residences) {
        // Duplicate ID check
        if (ids.has(res.id)) {
            issues.push({
                severity: SEVERITY.CRITICAL,
                category: 'RESIDÊNCIAS',
                message: `ID de residência duplicado: "${res.id}" ("${res.nome}").`,
            });
            stats.duplicateIds++;
        }
        ids.add(res.id);

        // Missing nome
        if (!res.nome || typeof res.nome !== 'string' || res.nome.trim() === '') {
            issues.push({
                severity: SEVERITY.MEDIUM,
                category: 'RESIDÊNCIAS',
                message: `Residência "${res.id}" sem nome definido.`,
            });
        }

        // Missing moradia object
        if (!res.moradia || typeof res.moradia !== 'object') {
            issues.push({
                severity: SEVERITY.HIGH,
                category: 'RESIDÊNCIAS',
                message: `Residência "${res.nome || res.id}" sem objeto "moradia". Checklists e perfis desta casa falharão.`,
            });
            stats.residencesWithoutMoradia++;
        } else {
            // Validate habitantes/frequentadores are arrays
            const hab = res.moradia.habitantes;
            const freq = res.moradia.frequentadores;

            if (hab !== undefined && !Array.isArray(hab)) {
                issues.push({
                    severity: SEVERITY.CRITICAL,
                    category: 'RESIDÊNCIAS',
                    message: `Residência "${res.nome}": moradia.habitantes não é um array (é ${typeof hab}).`,
                });
            }
            if (freq !== undefined && !Array.isArray(freq)) {
                issues.push({
                    severity: SEVERITY.CRITICAL,
                    category: 'RESIDÊNCIAS',
                    message: `Residência "${res.nome}": moradia.frequentadores não é um array (é ${typeof freq}).`,
                });
            }

            // Check for duplicate profile IDs within same house
            const allHouseIds = [...(Array.isArray(hab) ? hab : []), ...(Array.isArray(freq) ? freq : [])];
            const houseIdSet = new Set();
            for (const pid of allHouseIds) {
                if (houseIdSet.has(pid)) {
                    issues.push({
                        severity: SEVERITY.MEDIUM,
                        category: 'RESIDÊNCIAS',
                        message: `Residência "${res.nome}": perfil "${pid}" aparece duplicado nos vínculos (habitantes/frequentadores).`,
                    });
                }
                houseIdSet.add(pid);
            }

            // Check if same profile is in both habitantes AND frequentadores
            if (Array.isArray(hab) && Array.isArray(freq)) {
                const overlap = hab.filter(id => freq.includes(id));
                for (const pid of overlap) {
                    issues.push({
                        severity: SEVERITY.HIGH,
                        category: 'RESIDÊNCIAS',
                        message: `Residência "${res.nome}": perfil "${pid}" está TANTO em habitantes QUANTO em frequentadores. Deve ser um ou outro.`,
                    });
                }
            }
        }

        // Mapping validation
        if (res.mapping !== undefined && !Array.isArray(res.mapping)) {
            issues.push({
                severity: SEVERITY.MEDIUM,
                category: 'RESIDÊNCIAS',
                message: `Residência "${res.nome}": "mapping" não é um array.`,
            });
        }
    }
}

function validatePerfis(data, issues, stats) {
    const perfis = data.perfis;
    if (!Array.isArray(perfis)) return;

    stats.totalPerfis = perfis.length;

    const ids = new Set();
    let activeCount = 0;

    for (const p of perfis) {
        // Duplicate ID
        if (ids.has(p.id)) {
            issues.push({
                severity: SEVERITY.CRITICAL,
                category: 'PERFIS',
                message: `ID de perfil duplicado: "${p.id}" (nome: "${p.nome}").`,
            });
            stats.duplicateIds++;
        }
        ids.add(p.id);

        // Missing nome
        if (!p.nome || typeof p.nome !== 'string' || p.nome.trim() === '') {
            if (!p.pendente) {
                issues.push({
                    severity: SEVERITY.MEDIUM,
                    category: 'PERFIS',
                    message: `Perfil "${p.id}" sem nome (tipo: ${p.tipo}). Não é pendente.`,
                });
                stats.perfisWithoutName++;
            }
        }

        // Missing tipo
        if (!p.tipo || !['humano', 'pet'].includes(p.tipo)) {
            issues.push({
                severity: SEVERITY.HIGH,
                category: 'PERFIS',
                message: `Perfil "${p.nome || p.id}" com tipo inválido: "${p.tipo}". Deve ser "humano" ou "pet".`,
            });
        }

        // Active count
        if (p.ativo) activeCount++;

        // Date validation
        if (p.dataNascimento && typeof p.dataNascimento === 'string' && p.dataNascimento.trim() !== '') {
            const d = new Date(p.dataNascimento);
            if (isNaN(d.getTime())) {
                issues.push({
                    severity: SEVERITY.MEDIUM,
                    category: 'PERFIS',
                    message: `Perfil "${p.nome}": dataNascimento "${p.dataNascimento}" é inválida (não parseia para Date).`,
                });
            }
        }
    }

    // Multiple active profiles
    if (activeCount > 1) {
        issues.push({
            severity: SEVERITY.HIGH,
            category: 'PERFIS',
            message: `${activeCount} perfis marcados como "ativo: true". Apenas 1 deveria estar ativo por vez.`,
        });
    }

    if (activeCount === 0 && perfis.length > 0) {
        issues.push({
            severity: SEVERITY.MEDIUM,
            category: 'PERFIS',
            message: 'Nenhum perfil está marcado como ativo. O app pode não saber quem monitorar.',
        });
    }
}

function validateReferentialIntegrity(data, issues, stats) {
    const perfis = data.perfis;
    const residences = data.residences;

    if (!Array.isArray(perfis) || !Array.isArray(residences)) return;

    const perfilIds = new Set(perfis.map(p => p.id));

    // 1. Check: every profile ID referenced in residences actually exists
    for (const res of residences) {
        if (!res.moradia) continue;
        const habitantes = Array.isArray(res.moradia.habitantes) ? res.moradia.habitantes : [];
        const frequentadores = Array.isArray(res.moradia.frequentadores) ? res.moradia.frequentadores : [];

        for (const pid of [...habitantes, ...frequentadores]) {
            if (!perfilIds.has(pid)) {
                issues.push({
                    severity: SEVERITY.CRITICAL,
                    category: 'INTEGRIDADE REFERENCIAL',
                    message: `Residência "${res.nome}": referencia perfil "${pid}" que NÃO EXISTE no banco de perfis. (Referência fantasma — perfil pode ter sido excluído sem limpeza.)`,
                });
                stats.phantomReferences++;
            }
        }
    }

    // 2. Check: every profile belongs to at least one residence
    const allLinkedIds = new Set();
    for (const res of residences) {
        if (!res.moradia) continue;
        const h = Array.isArray(res.moradia.habitantes) ? res.moradia.habitantes : [];
        const f = Array.isArray(res.moradia.frequentadores) ? res.moradia.frequentadores : [];
        for (const id of [...h, ...f]) {
            allLinkedIds.add(id);
        }
    }

    for (const p of perfis) {
        if (!allLinkedIds.has(p.id)) {
            issues.push({
                severity: SEVERITY.MEDIUM,
                category: 'INTEGRIDADE REFERENCIAL',
                message: `Perfil "${p.nome || p.id}" (${p.tipo}) não está vinculado a NENHUMA residência. É um perfil órfão.`,
            });
            stats.orphanedProfiles++;
        }
    }
}

function validateActiveProfile(data, issues) {
    const perfis = data.perfis;
    const residences = data.residences;

    if (!Array.isArray(perfis) || !Array.isArray(residences)) return;

    const activePerfil = perfis.find(p => p.ativo);
    if (!activePerfil) return;

    const activeResId = data.activeResidenceId || 'default_home';
    const activeRes = residences.find(r => r.id === activeResId);

    if (!activeRes || !activeRes.moradia) return;

    const habitantes = Array.isArray(activeRes.moradia.habitantes) ? activeRes.moradia.habitantes : [];
    const frequentadores = Array.isArray(activeRes.moradia.frequentadores) ? activeRes.moradia.frequentadores : [];
    const allInHouse = [...habitantes, ...frequentadores];

    if (!allInHouse.includes(activePerfil.id)) {
        issues.push({
            severity: SEVERITY.CRITICAL,
            category: 'CONSISTÊNCIA PERFIL ATIVO',
            message: `O perfil ativo "${activePerfil.nome}" (${activePerfil.id}) NÃO pertence à residência ativa "${activeRes.nome}". Isso causa comportamento imprevisível em checklists e alertas.`,
        });
    }
}

function validateActiveResidence(data, issues) {
    const residences = data.residences;
    const activeId = data.activeResidenceId;

    if (!Array.isArray(residences)) return;

    if (!activeId) {
        issues.push({
            severity: SEVERITY.HIGH,
            category: 'RESIDÊNCIA ATIVA',
            message: 'activeResidenceId não está definido. O app usará fallback "default_home".',
        });
        return;
    }

    const exists = residences.find(r => r.id === activeId);
    if (!exists) {
        issues.push({
            severity: SEVERITY.CRITICAL,
            category: 'RESIDÊNCIA ATIVA',
            message: `activeResidenceId "${activeId}" aponta para uma residência que NÃO EXISTE no array. O app não sabe qual casa está ativa.`,
        });
    }
}

function validateMappingSync(data, issues) {
    const residences = data.residences;
    if (!Array.isArray(residences)) return;

    for (const res of residences) {
        if (!res.moradia) continue;

        const mapping = Array.isArray(res.mapping) ? res.mapping : [];
        const caracteristicas = Array.isArray(res.moradia.caracteristicas) ? res.moradia.caracteristicas : [];

        if (mapping.length > 0 && caracteristicas.length > 0) {
            // Check sync
            const inMappingNotInCarac = mapping.filter(m => !caracteristicas.includes(m));
            const inCaracNotInMapping = caracteristicas.filter(c => !mapping.includes(c));

            if (inMappingNotInCarac.length > 0 || inCaracNotInMapping.length > 0) {
                issues.push({
                    severity: SEVERITY.MEDIUM,
                    category: 'MAPPING SYNC',
                    message: `Residência "${res.nome}": mapping e moradia.caracteristicas estão dessincronizados.\n` +
                        (inMappingNotInCarac.length > 0 ? `  → Em mapping mas não em caracteristicas: [${inMappingNotInCarac.join(', ')}]\n` : '') +
                        (inCaracNotInMapping.length > 0 ? `  → Em caracteristicas mas não em mapping: [${inCaracNotInMapping.join(', ')}]` : ''),
                });
            }
        }
    }
}

function validateLegacyData(data, issues) {
    // Check for root-level moradia that may be stale
    if (data.moradia && data.residences && data.residences.length > 0) {
        issues.push({
            severity: SEVERITY.LOW,
            category: 'DADOS LEGADOS',
            message: 'Existe um objeto "moradia" na raiz dos dados (legado). Os dados oficiais agora estão dentro de residences[].moradia. O objeto raiz pode estar desatualizado.',
        });
    }

    // Check for stale completude
    if (data.completude && data.completude.total === 0 && Array.isArray(data.perfis) && data.perfis.length > 0) {
        issues.push({
            severity: SEVERITY.LOW,
            category: 'DADOS LEGADOS',
            message: 'Completude total é 0% mas existem perfis cadastrados. O cálculo de completude pode não estar sendo atualizado.',
        });
    }
}

// ============================================================
// REPORT BUILDER
// ============================================================

function buildReport(issues, stats) {
    const criticalCount = issues.filter(i => i.severity === SEVERITY.CRITICAL).length;
    const highCount = issues.filter(i => i.severity === SEVERITY.HIGH).length;
    const mediumCount = issues.filter(i => i.severity === SEVERITY.MEDIUM).length;
    const lowCount = issues.filter(i => i.severity === SEVERITY.LOW).length;

    const total = issues.length;
    let healthStatus;
    if (criticalCount > 0) healthStatus = '🔴 CRÍTICO — Dados com problemas estruturais graves';
    else if (highCount > 0) healthStatus = '🟠 INSTÁVEL — Problemas significativos detectados';
    else if (mediumCount > 0) healthStatus = '🟡 ATENÇÃO — Inconsistências menores encontradas';
    else if (total > 0) healthStatus = '🔵 BOM — Apenas observações informativas';
    else healthStatus = '🟢 SAUDÁVEL — Nenhum problema detectado';

    const lines = [
        '══════════════════════════════════════════════════════════════',
        '  VIGILARO CARE NEO — RELATÓRIO DE INTEGRIDADE DE DADOS',
        '══════════════════════════════════════════════════════════════',
        '',
        `  Status Geral: ${healthStatus}`,
        '',
        `  Perfis cadastrados:       ${stats.totalPerfis}`,
        `  Residências cadastradas:  ${stats.totalResidences}`,
        `  Perfis órfãos:            ${stats.orphanedProfiles}`,
        `  Referências fantasma:     ${stats.phantomReferences}`,
        `  IDs duplicados:           ${stats.duplicateIds}`,
        `  Residências sem moradia:  ${stats.residencesWithoutMoradia}`,
        `  Perfis sem nome:          ${stats.perfisWithoutName}`,
        '',
        '──────────────────────────────────────────────────────────────',
        `  Total de problemas: ${total}`,
        `    ${SEVERITY.CRITICAL}: ${criticalCount}`,
        `    ${SEVERITY.HIGH}: ${highCount}`,
        `    ${SEVERITY.MEDIUM}: ${mediumCount}`,
        `    ${SEVERITY.LOW}: ${lowCount}`,
        '──────────────────────────────────────────────────────────────',
        '',
    ];

    if (issues.length > 0) {
        lines.push('  DETALHAMENTO:');
        lines.push('');
        for (let i = 0; i < issues.length; i++) {
            const issue = issues[i];
            lines.push(`  ${i + 1}. ${issue.severity} [${issue.category}]`);
            lines.push(`     ${issue.message}`);
            lines.push('');
        }
    }

    lines.push('══════════════════════════════════════════════════════════════');

    const summary = lines.join('\n');

    return { issues, stats, summary, healthStatus };
}
