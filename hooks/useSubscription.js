/**
 * useSubscription.js
 * Vigilaro Care V6 Neo
 *
 * Hook reativo que expõe o tier atual e os limites correspondentes.
 * Usa o listener do SubscriptionService para atualizar automaticamente
 * quando o usuário compra, cancela ou restaura uma assinatura.
 *
 * Uso:
 *   const { tier, isPremium, limits, canUseFeature } = useSubscription();
 */

import { useState, useEffect, useCallback } from 'react';
import SubscriptionService from '../services/SubscriptionService';
import { getLimits, canUse } from '../utils/PremiumLimits';

export function useSubscription() {
    const [status, setStatus] = useState(() => SubscriptionService.getSubscriptionStatus());

    useEffect(() => {
        // Registra listener para mudanças em tempo real (compra, restauração)
        const remove = SubscriptionService.addListener((newStatus) => {
            setStatus(newStatus);
        });

        // Garante que temos o status mais recente ao montar
        const current = SubscriptionService.getSubscriptionStatus();
        setStatus(current);

        return remove;
    }, []);

    const tier   = status?.tier ?? 'free';
    const limits = getLimits(tier);

    /**
     * Verifica se o usuário pode usar uma feature específica.
     * @param {string} feature      — chave em PremiumLimits.LIMITS
     * @param {number} currentCount — (opcional) contagem atual para limits numéricos
     */
    const canUseFeature = useCallback(
        (feature, currentCount = null) => canUse(tier, feature, currentCount),
        [tier]
    );

    return {
        tier,                               // 'free' | 'premium' | 'familia'
        isPremium: status?.isPremium ?? false,
        isFamilia: status?.isFamilia ?? false,
        expirationDate: status?.expirationDate ?? null,
        willRenew: status?.willRenew ?? false,
        limits,                             // objeto completo de limites do tier atual
        canUseFeature,                      // (feature, count?) → boolean
        raw: status,                        // status completo para casos avançados
    };
}

export default useSubscription;
