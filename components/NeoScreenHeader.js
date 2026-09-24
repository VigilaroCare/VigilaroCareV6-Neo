/**
 * NeoScreenHeader — cabeçalho padrão das telas internas
 * (PADRAO_ANATOMIA_PAGINAS.md, padrão "Anatomia Editorial Vigilaro")
 *
 * Regras que este componente materializa:
 *  - Título de página é H1 do DS, à ESQUERDA — nunca dentro de card,
 *    nunca centralizado, nunca H3 (a hierarquia vem da tipografia,
 *    não de molduras)
 *  - Back-circle único: 44×44 glass, ícone Linear (back é ação —
 *    contrato "Bold ancora, Linear atua")
 *  - Fica FORA do ScrollView (fixo no topo)
 *  - Respeita rowDirection (suporte a canhotos)
 *
 * Uso:
 *   <NeoScreenHeader
 *     title={t('tela.titulo')}
 *     subtitle={t('tela.subtitulo')}   // opcional, 1 linha
 *     onBack={() => navigation.goBack()} // omitir em raiz de tab
 *     rightAction={<.../>}             // opcional
 *   />
 */
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import { H1, Body } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors } from '../utils/ThemeContext';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';

export default function NeoScreenHeader({ title, subtitle, onBack, rightAction, style }) {
    const { t } = useTranslation('common');
    const colors = useThemeColors();
    const { rowDirection } = useLeftHandedStyle();

    return (
        <View style={[styles.container, { flexDirection: rowDirection }, style]}>
            {onBack && (
                <TouchableOpacity
                    onPress={onBack}
                    style={styles.backCircle}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <NeoIcon name="ArrowLeft2" size={22} color={colors.neutral[900]} variant="Linear" />
                </TouchableOpacity>
            )}

            <View style={styles.titleGroup}>
                <H1 style={[styles.title, { color: colors.neutral[900] }]} numberOfLines={2} accessibilityRole="header">
                    {title}
                </H1>
                {!!subtitle && (
                    <Body style={[styles.subtitle, { color: colors.neutral[700] }]} numberOfLines={1}>
                        {subtitle}
                    </Body>
                )}
            </View>

            {rightAction ? (
                <View style={styles.rightSlot}>{rightAction}</View>
            ) : (
                // Espelho do back-circle para o título não colar na borda
                onBack ? <View style={styles.rightGhost} /> : null
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        minHeight: Neo.layout.headerMinHeight,
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.sm,
        paddingBottom: Neo.spacing.sm,
        gap: Neo.spacing.sm + 4,
    },
    backCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Neo.colors.glass.light,
        borderWidth: 1,
        borderColor: Neo.colors.glass.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    titleGroup: {
        flex: 1,
        minWidth: 0,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,            // h1 compacto p/ telas internas (34 é da Home/hero)
        lineHeight: 31,
        letterSpacing: -0.4,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 17,
        marginTop: 1,
    },
    rightSlot: {
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightGhost: {
        width: 44,
        flexShrink: 0,
    },
});
