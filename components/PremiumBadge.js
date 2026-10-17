/**
 * PremiumBadge.js
 * Vigilaro Care V6 Neo
 *
 * Tag visual inline que indica que uma feature é exclusiva Premium.
 * Vários tamanhos e variantes disponíveis.
 *
 * Uso:
 *   <PremiumBadge />                  → "✦ Premium" pequeno
 *   <PremiumBadge size="md" />        → maior
 *   <PremiumBadge variant="pill" />   → fundo colorido
 *   <PremiumBadge variant="icon" />   → só o cadeado
 */

import { tx } from '../utils/txFixo';
import { View, StyleSheet } from 'react-native';
import { Small } from './NeoTypography';
import NeoIcon from './NeoIcon';

const CLR_PREMIUM = '#7C3AED';

export default function PremiumBadge({
    size    = 'sm',     // 'sm' | 'md'
    variant = 'pill',   // 'pill' | 'text' | 'icon'
    style,
}) {
    const isMd   = size === 'md';
    const fSize  = isMd ? 12 : 10;
    const iSize  = isMd ? 13 : 11;
    const pY     = isMd ? 4 : 2;
    const pX     = isMd ? 9 : 6;

    if (variant === 'icon') {
        return (
            <View style={[bStyles.iconWrap, style]}>
                <NeoIcon name="Crown1" variant="Bold" size={iSize} color={CLR_PREMIUM} />
            </View>
        );
    }

    if (variant === 'text') {
        return (
            <Small style={[bStyles.textOnly, { fontSize: fSize }, style]}>{tx('telas.PremiumBadge.premium', '✦ Premium')}</Small>
        );
    }

    // pill (default)
    return (
        <View style={[bStyles.pill, { paddingHorizontal: pX, paddingVertical: pY }, style]}>
            <NeoIcon name="Crown1" variant="Bold" size={iSize} color={CLR_PREMIUM} />
            <Small style={[bStyles.pillText, { fontSize: fSize }]}>{tx('telas.PremiumBadge.premium2', 'Premium')}</Small>
        </View>
    );
}

const bStyles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: CLR_PREMIUM + '14',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: CLR_PREMIUM + '30',
    },
    pillText: {
        color: CLR_PREMIUM,
        fontWeight: '700',
    },
    textOnly: {
        color: CLR_PREMIUM,
        fontWeight: '700',
    },
    iconWrap: {
        width: 22, height: 22, borderRadius: 11,
        backgroundColor: CLR_PREMIUM + '14',
        alignItems: 'center', justifyContent: 'center',
    },
});
