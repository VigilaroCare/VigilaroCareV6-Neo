import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { ChecklistService } from '../services/ChecklistService';
import { useState, useEffect } from 'react';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { t_field } from '../utils/getLocalizedField';

export default function AgeGroupDetailScreen({ route, navigation }) {
    const { group } = route.params;
    const [checklistState, setChecklistState] = useState({});
    const { t } = useTranslation('common');

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
        <AppBackground variant="subtle">
        <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />

            {/* Header Neo Glass Unified */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
                <NeoCard variant="glass"
                    style={{
                        width: '100%',
                        padding: 16,
                        justifyContent: 'space-between',
                        minHeight: 140,
                        alignItems: 'center',
                        ...Neo.shadows?.sm
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            width: 64, height: 64, borderRadius: 20,
                            backgroundColor: group.color, alignItems: 'center', justifyContent: 'center',
                            marginBottom: 12
                        }}>
                             <NeoIcon name={group.icon} size={32} color={Neo.colors.neutral.white} />
                        </View>
                        <Text style={{ color: group.color, fontSize: 20, marginBottom: 4, lineHeight: 24, fontWeight: 'bold', textAlign: 'center' }}>{t_field(group, 'title')}</Text>
                        <Text style={{ color: Neo.colors.neutral[800], fontWeight: 'bold', lineHeight: 16, textAlign: 'center', marginBottom: 8 }}>{t_field(group, 'subtitle')}</Text>
                        <Text style={{ fontSize: 14, color: Neo.colors.neutral[800], textAlign: 'center', lineHeight: 20 }}>{t_field(group, 'description')}</Text>
                    </View>
                </NeoCard>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Risks Section */}
                {group.risks && group.risks.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>{t('ageGroup.risksTitle', 'Principais Riscos')}</Text>
                        <View style={styles.listContainer}>
                            {group.risks.map((risk, index) => (
                                <View key={risk.id || index} style={styles.riskCard}>
                                    <View style={[styles.riskHeader, { borderLeftColor: risk.cor || Neo.colors.feedback.error }]}>
                                        <NeoIcon name={risk.icone || "alert-circle"} size={24} color={risk.cor || Neo.colors.feedback.error} />
                                        <Text style={styles.riskTitle}>{t_field(risk, 'titulo') || t_field(risk, 'text')}</Text>
                                    </View>
                                    {t_field(risk, 'descricao') && <Text style={styles.riskDesc}>{t_field(risk, 'descricao')}</Text>}
                                    {t_field(risk, 'prevencao') && (
                                        <View style={styles.preventionBox}>
                                            <Text style={styles.preventionLabel}>{t('ageGroup.howToPrevent', 'Como Prevenir:')}</Text>
                                            <Text style={styles.preventionText}>{t_field(risk, 'prevencao')}</Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
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


