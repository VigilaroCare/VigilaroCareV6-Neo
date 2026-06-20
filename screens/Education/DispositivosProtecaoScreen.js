/**
 * DispositivosProtecaoScreen.js
 * Lista de Dispositivos de Proteção para o Lar — Catálogo Educativo
 * Vigilaro Care V6 Neo
 *
 * Padrão visual: idêntico a UtensiliosReviewsScreen
 * (card horizontal com imagem à esquerda, badge de risco, resumo)
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import { DISPOSITIVOS_PROTECAO } from '../../data/dispositivos_protecao';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const RISK_COLORS = {
    critico: '#D32F2F',
    alto: '#E65100',
    medio: '#F57F17',
    baixo: '#388E3C',
};

const RISK_LABELS = {
    critico: 'Crítico',
    alto: 'Alto',
    medio: 'Médio',
    baixo: 'Baixo',
};

const RISK_BG = {
    critico: '#FFEBEE',
    alto: '#FFF3E0',
    medio: '#FFFDE7',
    baixo: '#E8F5E9',
};

export default function DispositivosProtecaoScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    const THEME_COLOR = '#047857'; // Forest/Emerald — identidade de "proteção"
    const ITEMS = DISPOSITIVOS_PROTECAO;

    const handlePress = (item) => {
        navigation.navigate('SafetyReviewDetail', { item });
    };

    return (
        <AppBackground>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* ═══ HEADER ═══ */}
            <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.backBtn, { backgroundColor: THEME_COLOR + '20' }]}
                    activeOpacity={0.7}
                >
                    <NeoIcon name="ArrowLeft" size={22} color={THEME_COLOR} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerEmoji}>🛡️</Text>
                    <Text style={[styles.headerTitle, { color: textPrimary }]} accessibilityRole="header">
                        {t('knowledgeHub.protectionDevices', 'Acessórios de Proteção')}
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: textBody }]}>
                        {t('knowledgeHub.protectionDevicesDesc', 'Itens essenciais para proteger sua casa')}
                    </Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Info bar */}
                <FadeInView delay={100}>
                    <View style={styles.infoBar}>
                        <Text style={[styles.infoText, { color: textMuted }]}>
                            🛡️ {ITEMS.length} dispositivos • Toque para ver detalhes
                        </Text>
                    </View>
                </FadeInView>

                {ITEMS.map((item, idx) => {
                    const riskColor = RISK_COLORS[item.nivelRisco] || '#999';
                    const riskBg = RISK_BG[item.nivelRisco] || '#F5F5F5';
                    const riskLabel = RISK_LABELS[item.nivelRisco] || '';

                    return (
                        <FadeInView key={item.id} delay={150 + idx * 60}>
                            <TouchableOpacity
                                onPress={() => handlePress(item)}
                                activeOpacity={0.8}
                                style={{ marginBottom: 16 }}
                            >
                                {/* Padrão de card alinhado com Utensílios: imagem retangular à esquerda */}
                                <View style={styles.guideCardOuter}>
                                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                        <View style={[styles.guideImageContainer, { backgroundColor: riskBg }]}>
                                            {item.imagemUrl ? (
                                                <ReviewImage
                                                    source={{ uri: item.imagemUrl }}
                                                    tint={THEME_COLOR}
                                                    accessibilityLabel={item.nome}
                                                />
                                            ) : (
                                                <Text style={{ fontSize: 48 }}>{item.emoji}</Text>
                                            )}
                                        </View>
                                        <View style={styles.guideContent}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <View style={{ flex: 1, paddingRight: 8 }}>
                                                    <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{item.nome}</Text>
                                                    <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>Uso {item.frequenciaUso.toLowerCase()}</Text>
                                                </View>
                                                <View style={[styles.toxicBadge, { backgroundColor: riskColor + '15' }]}>
                                                    <Text style={[styles.toxicText, { color: riskColor }]}>{riskLabel}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1 }} />
                                            <Text style={[styles.sptText, { color: textBody }]} numberOfLines={2}>{item.resumo}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </FadeInView>
                    );
                })}

                <View style={{ height: 200 }} />
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 16,
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
    },
    headerEmoji: {
        fontSize: 40,
        marginBottom: 6,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        lineHeight: 18,
    },

    listContent: {
        paddingHorizontal: 16,
    },
    infoBar: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: Neo.colors.neutral[600],
        fontWeight: '500',
    },

    // Card grande estilo Utensílios (imagem retangular à esquerda)
    guideCardOuter: {
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    guideSubtitle: {
        fontSize: 11.5,
        fontStyle: 'italic',
        color: Neo.colors.neutral[500],
        marginBottom: 6,
    },
    toxicBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    toxicText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    sptText: {
        fontSize: 11.5,
        color: Neo.colors.neutral[600],
        lineHeight: 16,
    },
});
