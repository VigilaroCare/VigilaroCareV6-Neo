import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { areasExternas } from '../../data/areas_externas';
import { ChecklistService } from '../../services/ChecklistService';
import ProfileService from '../../services/ProfileService';

// Mapeamento de IDs de ambiente externo para IDs do mapping
const AMBIENTE_TO_AREA_EXTERNA = {
  backyard: ['quintal'],
  garden_farming: ['jardim', 'pomar', 'horta'],
  collective_areas: ['parquinho', 'condominio', 'quadra'],
  pool_safe: ['piscina'],
  workshop_tool: ['oficina', 'garagem'], // Garagem pode ter ferramentas
  storage_depot: ['deposito'],
  // beach_rivers não tem mapping exato, então exibirá por padrão se não mapeado.
};

export default function AreasExternasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    /* Interactive Checkbox Logic */
    const [checklistState, setChecklistState] = useState({});
    const [mapping, setMapping] = useState([]);
    const [activeResidenceId, setActiveResidenceId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const dadosFiltrados = useMemo(() => {
        let baseData = areasExternas;

        if (mapping && mapping.length > 0) {
            baseData = areasExternas.filter(area => {
                const mappedTerms = AMBIENTE_TO_AREA_EXTERNA[area.id];
                if (!mappedTerms) return true;
                return mappedTerms.some(term => mapping.includes(term));
            });
        }
        return baseData;
    }, [mapping]);

    useFocusEffect(
        useCallback(() => {
            loadChecklistStatus();
        }, [])
    );

    const loadChecklistStatus = async () => {
        const resId = await ProfileService.getActiveResidenceId();
        setActiveResidenceId(resId);
        
        const currentMapping = await ProfileService.getMapping();
        setMapping(currentMapping || []);
        
        if (!resId) return;

        const status = await ChecklistService.getAllState(resId);
        setChecklistState(status || {});
    };

    const getNativeAreaId = (areaId) => {
        return AMBIENTE_TO_AREA_EXTERNA[areaId]?.[0] || areaId;
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleSetStatus = async (areaId, itemText, status) => {
        if (!activeResidenceId) return;

        const nativeId = getNativeAreaId(areaId);
        const currentAreaState = checklistState[nativeId] || {};

        const currentState = currentAreaState[itemText];
        const newStatus = currentState === status ? null : status;

        const updatedState = {
            ...checklistState,
            [nativeId]: {
                ...currentAreaState,
                [itemText]: newStatus
            }
        };
        setChecklistState(updatedState);
        if (newStatus !== null) Vibration.vibrate(10);

        // Save to storage
        await ChecklistService.saveItemState(nativeId, itemText, newStatus, activeResidenceId);
    };

    const renderItem = ({ item }) => {
        const isExpanded = expandedId === item.id;
        const nativeId = getNativeAreaId(item.id);

        // Progress Calculation
        const areaState = checklistState[nativeId] || {};
        // Filter out header objects for count
        const taskItems = item.oQueFazer.filter(step => typeof step === 'string');
        const totalItems = taskItems.length;

        // Contagens
        const naItems = taskItems.filter(step => areaState[step] === 'na').length;
        const checkedItems = taskItems.filter(step => areaState[step] === true).length;
        const validTotal = totalItems - naItems;

        // Evitar divisão por zero se tudo for N/A
        const progress = validTotal > 0 ? checkedItems / validTotal : (naItems > 0 ? 1 : 0);

        return (
            <TouchableOpacity
                style={[styles.card, isExpanded && styles.cardExpanded]}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.9}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.iconBox, { backgroundColor: isExpanded ? Neo.colors.secondary[100] : Neo.colors.secondary[100] + '80' }]}>
                        <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.titulo}</Text>

                        {/* Status Text for Clarity */}
                        <Text style={styles.cardSituation}>
                            {progress === 1 ? 'Seguro ✅' : `${Math.round(progress * 100)}% protegido`}
                        </Text>

                        {/* Mini Progress Bar */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <View style={{ flex: 1, height: 4, backgroundColor: Neo.colors.neutral[300], borderRadius: 2, marginRight: 8, maxWidth: 100 }}>
                                <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: progress === 1 ? Neo.colors.feedback.success : Neo.colors.secondary[500], borderRadius: 2 }} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.chevronBox, isExpanded && { backgroundColor: Neo.colors.secondary[500] }]}>
                        <NeoIcon
                            name={isExpanded ? "ArrowUp2" : "ArrowDown2"}
                            size={20}
                            color={isExpanded ? Neo.colors.neutral.white : Neo.colors.neutral[400]}
                        />
                    </View>
                </View>

                {isExpanded && (
                    <View style={styles.cardBody}>
                        {/* O QUE FAZER (Interativo) */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <NeoIcon name="ShieldTick" size={20} color={Neo.colors.primary[500]} variant="Bold" />
                                <Text style={[styles.sectionLabel, { color: Neo.colors.primary[500] }]}>{t('headersFirst.vERIFICAODESEGURANA', 'VERIFICAÇÃO DE SEGURANÇA')}</Text>
                            </View>

                            <View style={styles.questionsContainer}>
                                {item.oQueFazer.map((step, index) => {
                                    if (typeof step === 'object' && step.header) {
                                        return (
                                            <Text key={index} style={styles.subListHeader}>
                                                {step.header}
                                            </Text>
                                        );
                                    }

                                    const state = checklistState[nativeId]?.[step];
                                    // state: true (Sim), false (Não), 'na' (N/A)

                                    return (
                                        <View key={index} style={styles.questionCard}>
                                            <Text style={styles.questionText}>{step}</Text>

                                            <View style={styles.reponseRow}>
                                                {/* Botão SIM */}
                                                <TouchableOpacity
                                                    style={[
                                                        styles.responseBtn,
                                                        state === true && { backgroundColor: Neo.colors.feedback.success, borderColor: Neo.colors.feedback.success }
                                                    ]}
                                                    onPress={() => handleSetStatus(item.id, step, true)}
                                                >
                                                    <Text style={[styles.responseBtnText, state === true && { color: Neo.colors.neutral.white }]}>{t('headersFirst.sIM', 'SIM')}</Text>
                                                </TouchableOpacity>

                                                {/* Botão NÃO */}
                                                <TouchableOpacity
                                                    style={[
                                                        styles.responseBtn,
                                                        state === false && { backgroundColor: Neo.colors.feedback.error, borderColor: Neo.colors.feedback.error }
                                                    ]}
                                                    onPress={() => handleSetStatus(item.id, step, false)}
                                                >
                                                    <Text style={[styles.responseBtnText, state === false && { color: Neo.colors.neutral.white }]}>{t('headersFirst.nO', 'NÃO')}</Text>
                                                </TouchableOpacity>

                                                {/* Botão N/A */}
                                                <TouchableOpacity
                                                    style={[
                                                        styles.responseBtn,
                                                        state === 'na' && { backgroundColor: Neo.colors.neutral[500], borderColor: Neo.colors.neutral[500] }
                                                    ]}
                                                    onPress={() => handleSetStatus(item.id, step, 'na')}
                                                >
                                                    <Text style={[styles.responseBtnText, state === 'na' && { color: Neo.colors.neutral.white }]}>{t('headersFirst.nA', 'N/A')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        {/* O QUE NÃO FAZER */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <NeoIcon name="CloseCircle" size={20} color={Neo.colors.feedback.error} />
                                <Text style={[styles.sectionLabel, { color: Neo.colors.feedback.error }]}>{t('headersFirst.eVITE', 'EVITE')}</Text>
                            </View>
                            {item.oQueNaoFazer.map((step, index) => (
                                <View key={index} style={styles.stepRow}>
                                    <View style={styles.bulletError} />
                                    <Text style={styles.stepText}>{step}</Text>
                                </View>
                            ))}
                        </View>

                        {/* CHAMAR AJUDA */}
                        <View style={[styles.alertBox, { backgroundColor: Neo.colors.secondary[500] }]}>
                            <View style={styles.alertHeader}>
                                <NeoIcon name="InfoCircle" size={20} color={Neo.colors.neutral.white} />
                                <Text style={styles.alertTitle}>{t('headersFirst.aTENO', 'ATENÇÃO')}</Text>
                            </View>
                            <Text style={styles.alertText}>{item.quandoChamarAjuda}</Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
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
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('headersFirst.ReasExternas', 'Áreas Externas')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('headersFirst.quintalPiscinaELazer', 'Quintal, Piscina e Lazer')}</Text>
                    </View>
                </View>

            <FlatList
                data={dadosFiltrados}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[50],
    },
    header: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: Neo.spacing.xl,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        ...Neo.shadows.md,
    },
    backBtn: {
        marginBottom: Neo.spacing.md,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Neo.colors.neutral.white,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    listContent: {
        padding: Neo.spacing.lg,
    },
    card: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: Neo.radius.lg,
        marginBottom: Neo.spacing.md,
        ...Neo.shadows.sm,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        elevation: 0, // [FIX] Previne moldura fantasma Android
    },
    cardExpanded: {
        borderColor: Neo.colors.secondary[500] + '40',
        ...Neo.shadows.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Neo.spacing.md,
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Neo.spacing.md,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    cardSituation: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[500],
        fontFamily: Typography.fontFamily.medium,
    },
    chevronBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[200],
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBody: {
        padding: Neo.spacing.lg,
        paddingTop: 0,
        backgroundColor: Neo.colors.neutral.white,
    },
    sectionContainer: {
        marginTop: Neo.spacing.lg,
        backgroundColor: Neo.colors.neutral[100],
        padding: Neo.spacing.md,
        borderRadius: Neo.radius.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    stepNumber: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Neo.colors.neutral[500],
        marginRight: 8,
        width: 20,
    },
    bulletError: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Neo.colors.feedback.error,
        marginTop: 8,
        marginRight: 12,
    },
    stepText: {
        fontSize: 15,
        color: Neo.colors.neutral[900],
        flex: 1,
        lineHeight: 22,
    },
    alertBox: {
        padding: Neo.spacing.md,
        borderRadius: Neo.radius.md,
        marginTop: Neo.spacing.lg,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    alertTitle: {
        color: Neo.colors.neutral.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    alertText: {
        color: Neo.colors.neutral.white,
        fontSize: 14,
        lineHeight: 20,
    },
    subListHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Neo.colors.primary[500],
        marginTop: 12,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    checkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    checkText: {
        fontSize: 15,
        color: Neo.colors.neutral[900],
        marginLeft: 12,
        flex: 1,
        lineHeight: 22,
    },
    questionsContainer: {
        gap: 16,
    },
    questionCard: {
        backgroundColor: Neo.colors.neutral.white,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
    },
    questionText: {
        fontSize: 15,
        color: Neo.colors.neutral[900],
        fontWeight: '500',
        marginBottom: 12,
        lineHeight: 22,
    },
    reponseRow: {
        flexDirection: 'row',
        gap: 8,
    },
    responseBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Neo.colors.neutral[100],
    },
    responseBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Neo.colors.neutral[500],
    },
});


