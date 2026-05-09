/**
 * EletrodomesticosReviewsScreen.js
 * Lista de Reviews Educativos — Eletrodomésticos
 * Vigilaro Care V6 Neo
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
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import { ArrowLeft, ArrowRight2 } from 'iconsax-react-native';
import { ELETRODOMESTICOS_REVIEWS } from '../../data/eletrodomesticos_reviews';

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

export default function EletrodomesticosReviewsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');

    const THEME_COLOR = '#1565C0';
    const ITEMS = ELETRODOMESTICOS_REVIEWS;

    const handlePress = (item) => {
        navigation.navigate('SafetyReviewDetail', { item });
    };

    return (
        <AppBackground variant="subtle">
            <StatusBar style="dark" />

            {/* ═══ HEADER ═══ */}
            <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.backBtn, { backgroundColor: THEME_COLOR + '20' }]}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={22} color={THEME_COLOR} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerEmoji}>⚡</Text>
                    <Text style={styles.headerTitle}>{t('headersFirst.homeAppliances', 'Eletrodomésticos')}</Text>
                    <Text style={styles.headerSubtitle}>
                        {t('headersFirst.riscosPrevenOEOQueFazerEmCasoDeAcidente', 'Riscos, prevenção e o que fazer em caso de acidente')}
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
                        <Text style={styles.infoText}>
                            📋 {ITEMS.length} itens • Toque para ver o review completo
                        </Text>
                    </View>
                </FadeInView>

                {ITEMS.map((item, idx) => {
                    const riskColor = RISK_COLORS[item.nivelRisco] || '#999';
                    const riskBg = RISK_BG[item.nivelRisco] || '#F5F5F5';
                    const riskLabel = RISK_LABELS[item.nivelRisco] || '';

                    return (
                        <FadeInView key={item.id} delay={150 + idx * 50}>
                            <TouchableOpacity
                                onPress={() => handlePress(item)}
                                activeOpacity={0.7}
                            >
                                <NeoCard variant="glass" style={styles.itemCard}>
                                    <View style={styles.itemRow}>
                                        {/* Emoji */}
                                        <View style={[styles.emojiCircle, { backgroundColor: riskBg }]}>
                                            <Text style={styles.emojiText}>{item.emoji}</Text>
                                        </View>

                                        {/* Info */}
                                        <View style={styles.itemInfo}>
                                            <Text style={styles.itemName}>{item.nome}</Text>
                                            <Text style={styles.itemDesc} numberOfLines={2}>
                                                {item.resumo}
                                            </Text>
                                            {/* Badges */}
                                            <View style={styles.badgeRow}>
                                                <View style={[styles.badge, { backgroundColor: riskColor }]}>
                                                    <Text style={styles.badgeText}>{riskLabel}</Text>
                                                </View>
                                                <Text style={styles.freqText}>
                                                    Uso {item.frequenciaUso.toLowerCase()}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Arrow */}
                                        <ArrowRight2 size={18} color={Neo.colors.neutral[400]} />
                                    </View>
                                </NeoCard>
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

    itemCard: {
        padding: 14,
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    emojiCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiText: {
        fontSize: 24,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        marginBottom: 3,
    },
    itemDesc: {
        fontSize: 12,
        color: Neo.colors.neutral[600],
        lineHeight: 16,
        marginBottom: 6,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
    },
    freqText: {
        fontSize: 10,
        color: Neo.colors.neutral[500],
        fontWeight: '500',
    },
});
