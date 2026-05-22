import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import ReviewImage from '../components/ReviewImage';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing, Typography, BorderRadius, Shadows, Components } from '../utils/Theme';
import { eletrodomesticosSeguranca } from '../data/eletrodomesticos_seguranca';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Cor por dispositivo (usada como tint do ReviewImage)
const DEVICE_COLORS = {
    microondas:    '#E65100',
    processadores: '#7C3AED',
    fogao:         '#D32F2F',
    aquecedor:     '#F57F17',
    ventilador:    '#0EA5E9',
    ferro:         '#EC4899',
    secador:       '#EC4899',
    geladeira:     '#3B82F6',
};

export default function EletrodomesticosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [expandedId, setExpandedId] = useState(null);
    const insets = useSafeAreaInsets();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const renderDeviceCard = (device) => {
        const isExpanded = expandedId === device.id;
        const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
        const deviceColor = DEVICE_COLORS[device.id] || '#6366F1';

        return (
            <TouchableOpacity
                key={device.id}
                onPress={() => toggleExpand(device.id)}
                activeOpacity={0.9}
                style={{ marginBottom: 16 }}
            >
                {/* Card retangular 130x130 padrão Plantas/Reviews */}
                <View style={styles.guideCardOuter}>
                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                        <View style={[styles.guideImageContainer, { backgroundColor: deviceColor + '15' }]}>
                            {device.imagemUrl ? (
                                <ReviewImage
                                    source={{ uri: device.imagemUrl }}
                                    tint={deviceColor}
                                    accessibilityLabel={device.nome}
                                />
                            ) : (
                                <NeoIcon
                                    name={getIconForDevice(device.id)}
                                    size={48}
                                    color={deviceColor}
                                />
                            )}
                        </View>
                        <View style={styles.guideContent}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={{ flex: 1, paddingRight: 8 }}>
                                    <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={2}>{device.nome}</Text>
                                </View>
                                <NeoIcon
                                    name={isExpanded ? "ArrowUp2" : "ArrowDown2"}
                                    size={18}
                                    color={textMuted}
                                />
                            </View>
                            <View style={{ flex: 1 }} />
                            <View style={styles.badgesRow}>
                                {device.travas && (
                                    <View style={styles.badgeLock}>
                                        <NeoIcon name="Lock" size={10} color="#FFF" style={{ marginRight: 3 }} />
                                        <Text style={styles.badgeLockText}>Trava</Text>
                                    </View>
                                )}
                                {device.riscos.slice(0, 2).map((risco, index) => (
                                    <View key={index} style={styles.badgeRisk}>
                                        <Text style={styles.badgeRiskText}>{risco}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                {isExpanded && (
                    <View style={styles.cardContent}>
                        <Text style={[styles.description, { color: textBody }]}>{device.descricao}</Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('headersFirst.RiscosPrincipais', '⚠️ Riscos Principais')}</Text>
                            <View style={styles.tagsContainer}>
                                {device.riscos.map((risco, idx) => (
                                    <View key={idx} style={styles.riskTag}>
                                        <NeoIcon name="Warning2" size={14} color={Colors.error} style={{ marginRight: 4 }} />
                                        <Text style={styles.riskTagText}>{risco}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('headersFirst.PrevenO', '🛡️ Prevenção')}</Text>
                            {device.prevencao.map((item, idx) => (
                                <View key={idx} style={styles.checkItem}>
                                    <NeoIcon name="TickCircle" size={18} color={Colors.success} style={{ marginRight: 8, marginTop: 2 }} />
                                    <Text style={styles.checkText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const getIconForDevice = (id) => {
        const map = {
            'microondas': 'restaurant',
            'processadores': 'nutrition',
            'fogao': 'flame',
            'aquecedor': 'thermometer',
            'ventilador': 'snow',
            'ferro': 'shirt',
            'secador': 'water',
            'geladeira': 'cube'
        };
        return map[id] || 'hardware-chip';
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">{t('headersFirst.eletrodomesticos', 'Eletrodomesticos')}</Text>
                        <Text style={{ fontSize: 13, color: textMuted }}>{t('headersFirst.guiaDeSeguranAParaEquipamentosDomSticos', 'Guia de segurança para equipamentos domésticos.')}</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {eletrodomesticosSeguranca.map((categoria) => (
                    <View key={categoria.id} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryEmoji}>{categoria.emoji}</Text>
                            <Text style={styles.categoryTitle}>{categoria.categoria}</Text>
                        </View>
                        {categoria.dispositivos.map(renderDeviceCard)}
                    </View>
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.md,
        paddingTop: Spacing.sm,
        paddingBottom: Spacing.xl,
        borderBottomLeftRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.xl,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    headerTitle: {
        fontSize: Typography.sizes.xl,
        fontFamily: Typography.fontFamily.bold,
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: Typography.sizes.md,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    scrollContent: {
        padding: Spacing.md,
    },
    categorySection: {
        marginBottom: Spacing.lg,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.xs,
    },
    categoryEmoji: {
        fontSize: 24,
        marginRight: Spacing.sm,
    },
    categoryTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
    },
    // Card grande estilo Plantas/Animais (imagem retangular à esquerda)
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 130,
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
        marginBottom: 4,
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    badgeLock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    badgeLockText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: Typography.fontFamily.bold,
    },
    badgeRisk: {
        backgroundColor: Colors.surfaceVariant,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    badgeRiskText: {
        color: Colors.textSecondary,
        fontSize: 10,
        fontFamily: Typography.fontFamily.medium,
    },
    cardContent: {
        padding: Spacing.md,
        marginTop: -10,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 16,
        marginHorizontal: 8,
    },
    description: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        lineHeight: 20,
    },
    section: {
        marginTop: Spacing.sm,
    },
    sectionTitle: {
        fontSize: Typography.sizes.sm,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: Spacing.md,
    },
    riskTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F0',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: BorderRadius.sm,
        borderWidth: 1,
        borderColor: '#FFD0D0',
    },
    riskTagText: {
        color: Colors.error,
        fontSize: 14,
        fontFamily: Typography.fontFamily.medium,
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    checkText: {
        flex: 1,
        fontSize: Typography.sizes.sm,
        color: Colors.textPrimary,
        lineHeight: 20,
    },
});




