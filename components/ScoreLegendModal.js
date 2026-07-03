import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark } from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import { H2, Body, Caption } from './NeoTypography';

export default function ScoreLegendModal({ visible, onClose }) {
    const isDark = useIsDark();
    const { t } = useTranslation();

    const bgColor = isDark ? Neo.colors.neutral[800] : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const subtextColor = isDark ? Neo.colors.neutral[400] : Neo.colors.neutral[600];

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View style={[styles.bottomSheet, { backgroundColor: bgColor }]}>
                        <View style={styles.header}>
                            <H2 style={[styles.title, { color: textColor }]}>
                                {t('score.legendTitle', 'Score da Casa')}
                            </H2>
                            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                                <NeoIcon name="CloseSquare" size={24} color={subtextColor} variant="Linear" />
                            </TouchableOpacity>
                        </View>

                        <Body style={[styles.description, { color: subtextColor }]}>
                            {t('score.legendDescription', 'Entenda como medimos a proteção do seu lar através dos 3 anéis concêntricos.')}
                        </Body>

                        <View style={styles.legendList}>
                            {/* Anel Externo */}
                            <View style={styles.legendItem}>
                                <View style={styles.ringPreview}>
                                    <View style={[styles.ringOuter, { borderColor: '#6EE7B7' }]} />
                                </View>
                                <View style={styles.legendTextContainer}>
                                    <Text style={[styles.legendTitle, { color: textColor }]}>Anel Externo</Text>
                                    <Caption style={{ color: subtextColor }}>Score Geral da Casa. Um panorama geral de todas as verificações.</Caption>
                                </View>
                            </View>

                            {/* Anel Intermediário */}
                            <View style={styles.legendItem}>
                                <View style={styles.ringPreview}>
                                    <View style={[styles.ringMiddle, { borderColor: '#FCD34D' }]} />
                                </View>
                                <View style={styles.legendTextContainer}>
                                    <Text style={[styles.legendTitle, { color: textColor }]}>Anel Intermediário</Text>
                                    <Caption style={{ color: subtextColor }}>Status dos Ambientes. Porcentagem de ambientes sem nenhuma pendência.</Caption>
                                </View>
                            </View>

                            {/* Anel Interno */}
                            <View style={styles.legendItem}>
                                <View style={styles.ringPreview}>
                                    <View style={[styles.ringInner, { borderColor: '#FCA5A5' }]} />
                                </View>
                                <View style={styles.legendTextContainer}>
                                    <Text style={[styles.legendTitle, { color: textColor }]}>Anel Interno</Text>
                                    <Caption style={{ color: subtextColor }}>Risco Crítico. Porcentagem de ambientes livres de riscos severos.</Caption>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: Neo.spacing.lg,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Neo.spacing.sm,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    closeBtn: {
        padding: 4,
    },
    description: {
        marginBottom: Neo.spacing.xl,
        lineHeight: 20,
    },
    legendList: {
        gap: Neo.spacing.md,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ringPreview: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    ringOuter: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 4,
    },
    ringMiddle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 4,
    },
    ringInner: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 4,
    },
    legendTextContainer: {
        flex: 1,
    },
    legendTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 2,
    }
});
