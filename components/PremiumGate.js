/**
 * PremiumGate.js
 * Vigilaro Care V6 Neo
 *
 * Componente wrapper que bloqueia o acesso a features premium.
 * Quando o usuário toca em um elemento bloqueado, abre o paywall
 * com contexto específico da feature tentada.
 *
 * Uso (modo wrapper — bloqueia touch):
 *   <PremiumGate feature="snooze">
 *     <MeuBotao />
 *   </PremiumGate>
 *
 * Uso (modo imperativo — retorna handler):
 *   const { guard } = usePremiumGate();
 *   <TouchableOpacity onPress={guard('snooze', handleSnooze)} />
 *
 * Uso (modo inline — mostra conteúdo ou paywall):
 *   <PremiumGate feature="aderenciaStats" inline>
 *     <ConteudoProtegido />
 *   </PremiumGate>
 */

import { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Small } from './NeoTypography';
import NeoIcon from './NeoIcon';
import { useSubscription } from '../hooks/useSubscription';
import { PAYWALL_CONTEXT } from '../utils/PremiumLimits';

const CLR_PREMIUM = '#7C3AED'; // violet — cor exclusiva Premium

// ─── Badge de lock inline ─────────────────────────────────────────────────────
function LockBadge({ compact = false }) {
    return (
        <View style={[lockStyles.badge, compact && lockStyles.badgeCompact]}>
            <NeoIcon name="Lock1" variant="Bold" size={compact ? 10 : 12} color="#FFF" />
            {!compact && (
                <Small style={lockStyles.badgeText}>Premium</Small>
            )}
        </View>
    );
}

const lockStyles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: CLR_PREMIUM,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 999,
    },
    badgeCompact: { paddingHorizontal: 5, paddingVertical: 2 },
    badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});

// ─── Componente principal ─────────────────────────────────────────────────────

export default function PremiumGate({
    feature,          // chave em PAYWALL_CONTEXT / PremiumLimits
    currentCount,     // (opcional) para gates numéricos
    children,
    inline = false,   // true = mostra overlay bloqueado, false = bloqueia touch
    style,
}) {
    const navigation = useNavigation();
    const { canUseFeature, tier } = useSubscription();

    const allowed = canUseFeature(feature, currentCount ?? null);

    const openPaywall = useCallback(() => {
        const ctx = PAYWALL_CONTEXT[feature] ?? {};
        navigation.navigate('UpgradePremium', {
            featureContext: feature,
            contextTitle: ctx.title,
            contextDescription: ctx.description,
            contextIcon: ctx.icon,
        });
    }, [navigation, feature]);

    // Usuário pode usar a feature — renderiza normalmente
    if (allowed) return children;

    // ── Modo inline: mostra conteúdo com overlay desfocado ──
    if (inline) {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={openPaywall} style={[gStyles.inlineWrap, style]}>
                {/* Conteúdo desativado visualmente */}
                <View style={gStyles.inlineBlur} pointerEvents="none">
                    {children}
                </View>
                {/* Overlay central */}
                <View style={gStyles.inlineOverlay}>
                    <View style={gStyles.inlineLockCircle}>
                        <NeoIcon name="Lock1" variant="Bold" size={20} color={CLR_PREMIUM} />
                    </View>
                    <Small style={gStyles.inlineText}>
                        {PAYWALL_CONTEXT[feature]?.title ?? 'Recurso Premium'}
                    </Small>
                    <Small style={gStyles.inlineCta}>Tocar para desbloquear</Small>
                </View>
            </TouchableOpacity>
        );
    }

    // ── Modo padrão: bloqueia o toque e vai para paywall ──
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={openPaywall}
            style={[gStyles.touchWrap, style]}
        >
            {/* Renderiza children desativados */}
            <View pointerEvents="none" style={gStyles.childrenWrap}>
                {children}
            </View>
            {/* Badge de lock no canto superior direito */}
            <View style={gStyles.lockBadgeWrap}>
                <LockBadge compact />
            </View>
        </TouchableOpacity>
    );
}

const gStyles = StyleSheet.create({
    touchWrap: { position: 'relative' },
    childrenWrap: { opacity: 0.45 },
    lockBadgeWrap: {
        position: 'absolute',
        top: -4,
        right: -4,
        zIndex: 10,
    },

    inlineWrap: { position: 'relative', overflow: 'hidden', borderRadius: 14 },
    inlineBlur: { opacity: 0.2 },
    inlineOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 14,
        padding: 20,
    },
    inlineLockCircle: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: CLR_PREMIUM + '15',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, borderColor: CLR_PREMIUM + '40',
    },
    inlineText: {
        color: Neo.colors.neutral[800], fontWeight: '700',
        textAlign: 'center', fontSize: 13,
    },
    inlineCta: {
        color: CLR_PREMIUM, fontWeight: '600', fontSize: 12,
    },
});

// ─── Hook imperativo ──────────────────────────────────────────────────────────

/**
 * Versão imperativa para usar em handlers sem wrapper JSX.
 *
 * const { guard } = usePremiumGate();
 * <Button onPress={guard('snooze', handleSnooze)} />
 */
export function usePremiumGate() {
    const navigation = useNavigation();
    const { canUseFeature } = useSubscription();

    const guard = useCallback(
        (feature, handler, currentCount = null) => {
            return (...args) => {
                if (canUseFeature(feature, currentCount)) {
                    handler?.(...args);
                } else {
                    const ctx = PAYWALL_CONTEXT[feature] ?? {};
                    navigation.navigate('UpgradePremium', {
                        featureContext: feature,
                        contextTitle: ctx.title,
                        contextDescription: ctx.description,
                        contextIcon: ctx.icon,
                    });
                }
            };
        },
        [canUseFeature, navigation]
    );

    return { guard };
}
