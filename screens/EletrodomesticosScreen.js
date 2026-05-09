import { Typography, Spacing, Colors, Shadows } from '../utils/Theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { eletrodomesticosSeguranca } from '../data/eletrodomesticos_seguranca';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EletrodomesticosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [expandedId, setExpandedId] = useState(null);
    const insets = useSafeAreaInsets();

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const renderDeviceCard = (device) => {
        const isExpanded = expandedId === device.id;

        return (
            <TouchableOpacity
                key={device.id}
                style={[styles.card, isExpanded && styles.cardExpanded]}
                onPress={() => toggleExpand(device.id)}
                activeOpacity={0.9}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <NeoIcon
                            name={getIconForDevice(device.id)}
                            size={24}
                            color={Colors.primary}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{device.nome}</Text>
                        <View style={styles.badgesRow}>
                            {device.travas && (
                                <View style={styles.badgeLock}>
                                    <NeoIcon name="Lock" size={12} color="#FFF" style={{ marginRight: 4 }} />
                                    <Text style={styles.badgeLockText}>{t('headersFirst.requerTrava', 'Requer Trava')}</Text>
                                </View>
                            )}
                            {device.riscos.slice(0, 2).map((risco, index) => (
                                <View key={index} style={styles.badgeRisk}>
                                    <Text style={styles.badgeRiskText}>{risco}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <NeoIcon
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={24}
                        color={Colors.textTertiary}
                    />
                </View>

                {isExpanded && (
                    <View style={styles.cardContent}>
                        <Text style={styles.description}>{device.descricao}</Text>

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
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('headersFirst.eletrodomesticos', 'Eletrodomesticos')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('headersFirst.guiaDeSeguranAParaEquipamentosDomSticos', 'Guia de segurança para equipamentos domésticos.')}</Text>
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
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.md,
        ...Shadows.sm,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        elevation: 0, // [FIX] Previne moldura fantasma Android
    },
    cardExpanded: {
        borderColor: Colors.primary,
        ...Shadows.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    cardTitle: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.semibold,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    badgeLock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.error,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    badgeLockText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: Typography.fontFamily.bold,
    },
    badgeRisk: {
        backgroundColor: Colors.surfaceVariant,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    badgeRiskText: {
        color: Colors.textSecondary,
        fontSize: 12,
        fontFamily: Typography.fontFamily.medium,
    },
    cardContent: {
        padding: Spacing.md,
        paddingTop: 0,
        backgroundColor: Colors.surface,
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




