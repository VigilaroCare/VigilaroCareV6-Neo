import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { ChecklistService } from '../services/ChecklistService';
import NeoCard from '../components/NeoCard';
import ReviewImage from '../components/ReviewImage';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { t_field } from '../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function AgeGroupDetailScreen({ route, navigation }) {
    const { group } = route.params || {};
    const [checklistState, setChecklistState] = useState({});
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const surface = isDark ? themeColors.neutral[100] : '#FFFFFF';

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);

    if (!group) return null;

    const title = t_field(group, 'title');
    const cor = group.color || themeColors.categoria.ardosia.fill;

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    // Gerar ID único para persistência baseado no título do grupo
    const areaId = `custom_${group.title.replace(/\s+/g, '_')}`;

    useEffect(() => {
        loadChecklist();
    }, []);

    const loadChecklist = async () => {
        const allState = await ChecklistService.getAllState();
        setChecklistState(allState[areaId] || {});
    };

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button (fixo no topo da tela) */}
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtnFlat}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: cor,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={group.imagemUrl ? (typeof group.imagemUrl === 'string' ? { uri: group.imagemUrl } : group.imagemUrl) : group.imagem}
                        style={StyleSheet.absoluteFill}
                        contentFit={group.resizeMode || 'cover'}
                    />

                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[styles.content, { marginTop: 20 }]}>
                    {/* Descrição */}
                    {t_field(group, 'description') ? (
                        <Text style={[styles.groupDescription, { color: textBody }]}>
                            {t_field(group, 'description')}
                        </Text>
                    ) : null}

                {/* Risks Section */}
                {group.risks && group.risks.length > 0 && (
                    <View>
                        <Text style={[styles.sectionTitle, { color: textPrimary }]} accessibilityRole="header">{t('ageGroup.risksTitle', 'Principais Riscos')}</Text>
                        {group.risks.map((risk, index) => {
                            const riskColor = risk.cor || Neo.colors.feedback.error;
                            return (
                                <NeoCard
                                    key={risk.id || index}
                                    variant="elevated"
                                    style={[styles.riskCardNeo, { borderLeftColor: riskColor }]}
                                >
                                    <View style={styles.riskHeaderNeo}>
                                        <View style={[styles.riskIconCircle, { backgroundColor: riskColor + '1A' }]}>
                                            <NeoIcon name={risk.icone || 'Warning2'} size={18} color={riskColor} variant="Bold" />
                                        </View>
                                        <Text style={[styles.riskTitle, { color: textPrimary }]}>
                                            {t_field(risk, 'titulo') || t_field(risk, 'text')}
                                        </Text>
                                    </View>
                                    {t_field(risk, 'descricao') && (
                                        <Text style={[styles.riskDescNeo, { color: textMuted }]}>
                                            {t_field(risk, 'descricao')}
                                        </Text>
                                    )}
                                    {t_field(risk, 'prevencao') && (
                                        <View style={[styles.preventionBox, { backgroundColor: isDark ? themeColors.neutral[200] : themeColors.neutral[50] }]}>
                                            <Text style={styles.preventionLabel}>{t('ageGroup.howToPrevent', 'Como Prevenir:')}</Text>
                                            <Text style={[styles.preventionText, { color: textPrimary }]}>{t_field(risk, 'prevencao')}</Text>
                                        </View>
                                    )}
                                </NeoCard>
                            );
                        })}
                    </View>
                )}
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    groupDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
        marginTop: 2,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
    },
    content: {
        padding: Spacing.md,
        paddingBottom: 130, // Increased for TabBar
    },
    heroCard: {
        alignItems: 'center',
        padding: Spacing.xl,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        marginBottom: Spacing.xl,
    },
    heroIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
        ...Shadows.md,
    },
    heroTitle: {
        fontSize: Typography.sizes.xl,
        fontFamily: Typography.fontFamily.bold,
        marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: Typography.sizes.md,
        color: Neo.colors.neutral[600],
        marginBottom: 12,
        fontWeight: '600',
    },
    heroDesc: {
        fontSize: Typography.sizes.md,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
        marginBottom: Spacing.md,
        marginTop: Spacing.sm,
    },
    listContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        ...Shadows.sm,
        marginBottom: Spacing.lg,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100],
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 16,
        marginLeft: 4,
    },
    listText: {
        fontSize: Typography.sizes.md,
        color: Neo.colors.neutral[900],
        flex: 1,
    },
    // Padrão novo — cada risco é seu próprio NeoCard
    riskCardNeo: {
        marginBottom: 12,
        padding: 14,
        borderLeftWidth: 4,
        borderRadius: 14,
    },
    riskHeaderNeo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    riskIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    riskDescNeo: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 8,
        color: Neo.colors.neutral[600],
    },
    // (mantidos por compat com outros usos eventuais)
    riskCard: {
        marginBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100],
        paddingBottom: Spacing.md,
    },
    riskHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: 4,
        paddingLeft: Spacing.sm,
        borderLeftWidth: 4,
    },
    riskTitle: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
        flex: 1,
    },
    riskDesc: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[600],
        marginBottom: 8,
        marginTop: 4,
    },
    preventionBox: {
        backgroundColor: Neo.colors.neutral[50],
        padding: Spacing.sm,
        borderRadius: BorderRadius.sm,
        marginTop: 4,
    },
    preventionLabel: {
        fontSize: Typography.sizes.xs,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.feedback.success,
        marginBottom: 2,
    },
    preventionText: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[900],
    },
    questionItem: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100],
        paddingBottom: 12,
    },
    questionText: {
        fontSize: 15,
        color: Neo.colors.neutral[900],
        marginBottom: 8,
        fontWeight: '500',
    },
    responseRow: {
        flexDirection: 'row',
        gap: 8,
    },
    respBtn: {
        flex: 1,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: Neo.colors.neutral[50],
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
    },
    respBtnSim: { backgroundColor: Neo.colors.feedback.success, borderColor: Neo.colors.feedback.success },
    respBtnNao: { backgroundColor: Neo.colors.feedback.error, borderColor: Neo.colors.feedback.error },
    respBtnNA: { backgroundColor: Neo.colors.neutral[400], borderColor: Neo.colors.neutral[400] },
    respText: { fontSize: 12, fontWeight: 'bold', color: Neo.colors.neutral[500] },
});


