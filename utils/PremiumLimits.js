/**
 * PremiumLimits.js
 * Vigilaro Care V6 Neo
 *
 * Fonte única de verdade para os limites de cada tier.
 * NÃO colocar lógica de negócio aqui — apenas constantes.
 *
 * Tiers ativos:
 *   free    — Freemium (padrão sem assinatura)
 *   premium — Premium Individual (R$ 19,90/mês · R$ 149,90/ano)
 *
 * Tier futuro (fase Família — não implementado nesta versão):
 *   familia — Plano Família (R$ 34,90/mês · R$ 269,90/ano)
 *
 * REGRA: qualquer novo feature gate deve ter entrada AQUI primeiro.
 * Não hardcode limites diretamente nas telas.
 */

export const LIMITS = {
    free: {
        // ── Módulo Hora do Remédio ──────────────────────────────────
        maxLembretes:            3,          // máx de lembretes ativos simultâneos
        maxHorariosPerLembrete:  2,          // máx de horários por lembrete
        historicoDosesDias:      7,          // dias de histórico visíveis
        aderenciaStats:          false,      // estatísticas 7d/30d
        snooze:                  false,      // adiar notificação
        cuidadorRemoto:          false,      // módulo SMS/WhatsApp
        cuidadorRemotoMaxContatos: 0,

        // ── Scanner & IA ─────────────────────────────────────────────
        scannerMensal:           3,          // varreduras de rótulo/mês
        infoRotulosMensal:       3,

        // ── Checklists & Relatórios ──────────────────────────────────
        maxChecklists:           3,
        relatoriosPDF:           false,

        // ── Radar Vigilaro ───────────────────────────────────────────
        radarCompleto:           false,
    },

    premium: {
        // ── Módulo Hora do Remédio ──────────────────────────────────
        maxLembretes:            Infinity,
        maxHorariosPerLembrete:  Infinity,
        historicoDosesDias:      90,
        aderenciaStats:          true,
        snooze:                  true,
        cuidadorRemoto:          true,
        cuidadorRemotoMaxContatos: 1,       // 1 contato; Família = ilimitado

        // ── Scanner & IA ─────────────────────────────────────────────
        scannerMensal:           Infinity,
        infoRotulosMensal:       Infinity,

        // ── Checklists & Relatórios ──────────────────────────────────
        maxChecklists:           Infinity,
        relatoriosPDF:           true,

        // ── Radar Vigilaro ───────────────────────────────────────────
        radarCompleto:           true,
    },

    // Plano Família — reservado para fase futura (sincronização em nuvem necessária)
    familia: {
        maxLembretes:            Infinity,
        maxHorariosPerLembrete:  Infinity,
        historicoDosesDias:      90,
        aderenciaStats:          true,
        snooze:                  true,
        cuidadorRemoto:          true,
        cuidadorRemotoMaxContatos: Infinity,
        maxChecklists:           Infinity,
        relatoriosPDF:           true,
        radarCompleto:           true,
        scannerMensal:           Infinity,
        infoRotulosMensal:       Infinity,
        // Features exclusivas Família (futuras):
        syncNuvem:               true,
        compartilhamentoPerfil:  true,
        membrosFamilia:          5,
    },
};

/**
 * Retorna os limites do tier informado.
 * Sempre retorna um objeto válido, mesmo para tier desconhecido.
 */
export function getLimits(tier = 'free') {
    return LIMITS[tier] ?? LIMITS.free;
}

/**
 * Verifica se uma feature específica está disponível para o tier.
 * @param {string} tier       — 'free' | 'premium' | 'familia'
 * @param {string} feature    — chave em LIMITS
 * @param {*}     value       — valor atual a comparar (para limites numéricos)
 *
 * Exemplos:
 *   canUse('free', 'snooze')               → false
 *   canUse('premium', 'snooze')            → true
 *   canUse('free', 'maxLembretes', 3)      → false (3 >= 3, não pode adicionar mais)
 *   canUse('premium', 'maxLembretes', 99)  → true
 */
export function canUse(tier, feature, currentCount = null) {
    const limits = getLimits(tier);
    const limit  = limits[feature];

    if (typeof limit === 'boolean') return limit;
    if (limit === Infinity)         return true;
    if (typeof limit === 'number' && currentCount !== null) {
        return currentCount < limit;
    }
    return !!limit;
}

/**
 * Descrição legível do que o Premium desbloqueia — usada no paywall contextual.
 */
export const PAYWALL_CONTEXT = {
    maxLembretes: {
        title: 'Lembretes ilimitados',
        description: 'No Freemium, você pode ter até 3 lembretes ativos. Com o Premium, adicione quantos quiser.',
        icon: 'MedicalSquare',
    },
    maxHorariosPerLembrete: {
        title: 'Horários ilimitados',
        description: 'Configure quantos horários precisar para cada medicamento.',
        icon: 'Clock',
    },
    aderenciaStats: {
        title: 'Estatísticas de aderência',
        description: 'Veja o percentual de doses tomadas nos últimos 7 e 30 dias.',
        icon: 'Chart',
    },
    snooze: {
        title: 'Adiar lembrete',
        description: 'Adie notificações por 10, 30 ou 60 minutos sem perder o controle.',
        icon: 'Clock',
    },
    cuidadorRemoto: {
        title: 'Cuidador Remoto',
        description: 'Notifique a pessoa assistida via WhatsApp ou SMS nos horários configurados.',
        icon: 'Wifi',
    },
    historicoDosesDias: {
        title: 'Histórico completo (90 dias)',
        description: 'No Freemium, o histórico fica disponível por 7 dias. Com Premium, acesse 90 dias completos.',
        icon: 'Calendar1',
    },
    scannerMensal: {
        title: 'Scanner de rótulos ilimitado',
        description: 'No Freemium, você tem 3 análises/mês. Com Premium, sem limites.',
        icon: 'Scan',
    },
    relatoriosPDF: {
        title: 'Relatórios em PDF',
        description: 'Exporte e compartilhe relatórios de checklists e histórico de saúde.',
        icon: 'DocumentText',
    },
};
