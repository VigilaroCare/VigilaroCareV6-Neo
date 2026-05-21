import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { ChecklistService } from '../services/ChecklistService';
import { useState, useEffect } from 'react';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import PetHeroBanner from '../components/PetHeroBanner';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { t_field } from '../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function AgeGroupDetailScreen({ route, navigation }) {
    const { group } = route.params;
    const [checklistState, setChecklistState] = useState({});
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[800];
    const textMuted = themeColors.neutral[600];

    // Gerar ID único para persistência baseado no título do grupo
    // Ex: 'Pets Adultos' -> 'custom_Pets_Adultos'
    const areaId = `custom_${group.title.replace(/\s+/g, '_')}`;

    useEffect(() => {
        loadChecklist();
    }, []);

    const loadChecklist = async () => {
        const allState = await ChecklistService.getAllState();
        setChecklistState(allState[areaId] || {});
    };

    const handleAnswer = async (itemText, status) => {
        // Toggle logic: click same status to clear
        const currentStatus = checklistState[itemText];
        const newStatus = currentStatus === status ? null : status;

        const newState = {
            ...checklistState,
            [itemText]: newStatus
        };
        setChecklistState(newState);

        if (newStatus !== null) Vibration.vibrate(10);
        await ChecklistService.saveItemState(areaId, itemText, newStatus);
    };

    return (
        <AppBackground>
        <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]} edges={['top']}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

            {/* HEADER padrão Pets: back button + título/subtítulo lado a lado */}
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.headerTitleNew, { color: group.color }]} accessibilityRole="header" numberOfLines={1}>
                        {t_field(group, 'title')}
                    </Text>
                    {t_field(group, 'subtitle') ? (
                        <Text style={[styles.headerSubtitle, { color: textMuted }]} numberOfLines={1}>
                            {t_field(group, 'subtitle')}
                        </Text>
                    ) : null}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Hero banner — imagem do card de origem (continuidade visual) */}
                <PetHeroBanner
                    image={group.imagem}
                    imageUrl={group.imagemUrl}
                    tint={group.color}
                    resizeMode={group.resizeMode || 'cover'}
                    accessibilityLabel={t_field(group, 'title')}
                    marginHorizontal={0}
                    marginBottom={14}
                />

                {/* Descrição (se houver) — texto solto, sem moldura */}
                {t_field(group, 'description') ? (
                    <Text style={[styles.groupDescription, { color: textBody }]}>
                        {t_field(group, 'description')}
                    </Text>
                ) : null}

                {/* Risks Section — cada risco vira um NeoCard próprio (sem moldura externa) */}
                {group.risks && group.risks.length > 0 && (
                    <>
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
                    </>
                )}

                {/* Checklist Section Removed - Educational Only */}

            </ScrollView>
        </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Header novo no padrão Pet (back + titulo + subtitulo)
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitleNew: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 13,
        fontWeight: '600',
    },
    groupDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
        marginTop: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        backgroundColor: Neo.colors.neutral.white,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100],
        gap: Spacing.md,
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


