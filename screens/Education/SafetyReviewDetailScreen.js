/**
 * SafetyReviewDetailScreen.js
 * Tela de detalhe de um Review Educativo de Segurança
 * Vigilaro Care V6 Neo
 *
 * Recebe via route.params: { item } (um objeto de review)
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const RISK_COLORS = {
    critico: Neo.colors.severity?.high?.bg || '#D32F2F', // DS: data-level color
    alto: Neo.colors.accent?.copper || '#E65100', // DS: data-level color
    medio: '#F57F17', // DS: data-level color (no exact mapping)
    baixo: '#388E3C', // DS: data-level color (no exact mapping)
};

const RISK_LABELS = {
    critico: 'Crítico',
    alto: 'Alto',
    medio: 'Médio',
    baixo: 'Baixo',
};

const PERFIL_LABELS = {
    bebe: '👶 Bebês',
    crianca: '🧒 Crianças',
    idoso: '👴 Idosos',
    pet: '🐶 Pets',
    todos: '👥 Todos',
};

export default function SafetyReviewDetailScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const { item } = route.params;
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];

    if (!item) {
        navigation.goBack();
        return null;
    }

    const riskColor = RISK_COLORS[item.nivelRisco] || themeColors.neutral[700];
    const riskLabel = RISK_LABELS[item.nivelRisco] || 'N/A';

    return (
        <AppBackground>
            <StatusBar style="light" />

            {/* ═══ HEADER ═══ */}
            <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.backBtn, { backgroundColor: riskColor + '20' }]}
                    activeOpacity={0.7}
                >
                    <NeoIcon name="ArrowLeft" size={22} color={riskColor} />
                </TouchableOpacity>

                {/* Hero banner grande com a foto do card (padrão FasesVida/Produtos) */}
                {item.imagemUrl ? (
                    <View style={styles.heroBanner}>
                        <ReviewImage
                            source={typeof item.imagemUrl === 'string' ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : item.imagemUrl}
                            tint={riskColor}
                            accessibilityLabel={item.nome}
                        />
                    </View>
                ) : (
                    <View style={[styles.heroEmojiContainer, { backgroundColor: riskColor + '15' }]}>
                        <Text style={styles.heroEmoji}>{item.emoji}</Text>
                    </View>
                )}

                <View style={styles.headerContent}>
                    <Text style={[styles.headerTitle, { color: textPrimary }]} accessibilityRole="header">{item.nome}</Text>
                    <View style={[styles.riskBadge, { backgroundColor: riskColor }]}>
                        <Text style={styles.riskBadgeText}>Risco {riskLabel}</Text>
                    </View>
                </View>
            </View>

            {/* ═══ CONTENT ═══ */}
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Resumo */}
                <FadeInView delay={100}>
                    <NeoCard variant="glass" style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <NeoIcon name="InfoCircle" size={20} color={Neo.colors.primary[600]} variant="Bold" />
                            <Text style={styles.sectionTitle}>{t('headersFirst.sobre', 'Sobre')}</Text>
                        </View>
                        <Text style={[styles.bodyText, { color: textBody }]}>{item.resumo}</Text>

                        {/* Perfil de Risco + Frequência */}
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Text style={[styles.metaLabel, { color: textMuted }]}>{t('headersFirst.frequNciaDeUso', 'Frequência de uso')}</Text>
                                <Text style={[styles.metaValue, { color: textBody }]}>{item.frequenciaUso}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Text style={[styles.metaLabel, { color: textMuted }]}>{t('headersFirst.maisVulnerVeis', 'Mais vulneráveis')}</Text>
                                <Text style={[styles.metaValue, { color: textBody }]}>
                                    {item.perfilRisco.map(p => PERFIL_LABELS[p] || p).join(', ')}
                                </Text>
                            </View>
                        </View>
                    </NeoCard>
                </FadeInView>

                {/* Riscos */}
                <FadeInView delay={200}>
                    <NeoCard variant="glass" style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <NeoIcon name="Danger" size={20} color={Neo.colors.severity?.high?.bg || Neo.colors.feedback.error} variant="Bold" />
                            <Text style={[styles.sectionTitle, { color: Neo.colors.severity?.high?.bg || Neo.colors.feedback.error }]}>
                                {t('headersFirst.riscosIdentificados', 'Riscos Identificados')}
                            </Text>
                        </View>
                        {item.riscos.map((risco, idx) => (
                            <View key={idx} style={styles.riskItem}>
                                <View style={[
                                    styles.riskDot,
                                    { backgroundColor: RISK_COLORS[risco.gravidade] || themeColors.neutral[500] }
                                ]} />
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.riskText, { color: textBody }]}>{risco.descricao}</Text>
                                    <Text style={[
                                        styles.riskLevel,
                                        { color: RISK_COLORS[risco.gravidade] || themeColors.neutral[500] }
                                    ]}>
                                        {RISK_LABELS[risco.gravidade] || risco.gravidade}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </NeoCard>
                </FadeInView>

                {/* Prevenção */}
                <FadeInView delay={300}>
                    <NeoCard variant="glass" style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <NeoIcon name="ShieldTick" size={20} color={Neo.colors.primary[700]} variant="Bold" />
                            <Text style={[styles.sectionTitle, { color: Neo.colors.primary[700] }]}>
                                {t('headersFirst.comoPrevenir', 'Como Prevenir')}
                            </Text>
                        </View>
                        {item.prevencao.map((tip, idx) => (
                            <View key={idx} style={styles.prevItem}>
                                <Text style={styles.prevNumber}>{idx + 1}</Text>
                                <Text style={[styles.prevText, { color: textBody }]}>{tip}</Text>
                            </View>
                        ))}
                    </NeoCard>
                </FadeInView>

                {/* O que fazer (Primeiros Socorros) */}
                <FadeInView delay={400}>
                    <NeoCard variant="glass" style={[styles.sectionCard, styles.emergencyCard]}>
                        <View style={styles.sectionHeader}>
                            <NeoIcon name="Heart" size={20} color={Neo.colors.feedback.error} variant="Bold" />
                            <Text style={[styles.sectionTitle, { color: Neo.colors.feedback.error }]}>
                                {t('headersFirst.oQueFazerEmCasoDeAcidente', 'O Que Fazer em Caso de Acidente')}
                            </Text>
                        </View>
                        <Text style={[styles.bodyText, { color: textBody }]}>{item.oQueFazer}</Text>
                    </NeoCard>
                </FadeInView>

                {/* Estatística */}
                {item.estatistica ? (
                    <FadeInView delay={500}>
                        <NeoCard variant="glass" style={[styles.sectionCard, styles.statCard]}>
                            <View style={styles.sectionHeader}>
                                <NeoIcon name="People" size={20} color={Neo.colors.primary[600]} variant="Bold" />
                                <Text style={[styles.sectionTitle, { color: Neo.colors.primary[600] }]}>
                                    {t('headersFirst.vocSabia', 'Você Sabia?')}
                                </Text>
                            </View>
                            <Text style={[styles.bodyText, { fontStyle: 'italic' }]}>
                                {item.estatistica}
                            </Text>
                        </NeoCard>
                    </FadeInView>
                ) : null}

                <View style={{ height: 200 }} />
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        alignItems: 'center',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    headerContent: {
        alignItems: 'center',
        width: '100%',
    },
    heroBanner: {
        width: '100%',
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: Neo.colors.neutral[200],
        shadowColor: Neo.colors.neutral.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 4,
    },
    heroEmojiContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    heroEmoji: {
        fontSize: 56,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 8,
    },
    riskBadge: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
    },
    riskBadgeText: {
        color: Neo.colors.neutral.white,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    content: {
        paddingHorizontal: 16,
    },
    sectionCard: {
        padding: 16,
        marginBottom: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
    },
    bodyText: {
        fontSize: 14,
        color: Neo.colors.neutral[700],
        lineHeight: 21,
    },

    // Meta row (Frequência + Perfil)
    metaRow: {
        flexDirection: 'row',
        marginTop: 14,
        gap: 12,
    },
    metaItem: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 12,
        padding: 10,
    },
    metaLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: Neo.colors.neutral[500],
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    metaValue: {
        fontSize: 13,
        fontWeight: '600',
        color: Neo.colors.neutral[800],
    },

    // Riscos
    riskItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 10,
    },
    riskDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: 6,
    },
    riskText: {
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 19,
    },
    riskLevel: {
        fontSize: 10,
        fontWeight: '700',
        marginTop: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },

    // Prevenção
    prevItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 10,
    },
    prevNumber: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Neo.colors.primary[100],
        color: Neo.colors.primary[700],
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 22,
        overflow: 'hidden',
    },
    prevText: {
        flex: 1,
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 19,
    },

    // Emergência
    emergencyCard: {
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.feedback.error,
    },

    // Estatística
    statCard: {
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.primary[500],
        backgroundColor: 'rgba(33, 150, 243, 0.04)',
    },
});
