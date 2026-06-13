/**
 * DoseConfirmationModal.js
 * Modal inteligente de confirmação de dose em 3 etapas:
 *   1. Pergunta: "Tomou no horário?"
 *   2. Seleção de tempo de atraso
 *   3. Orientação clínica + recálculo da próxima dose
 *
 * Tactical Calm Design System — VigilaroCare 2026
 */

import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from './NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Shadows } from '../utils/Theme';
import { DELAY_OPTIONS, getDelayGuidance, MEDICAL_DISCLAIMER } from '../data/delay_guidance';
import { useTranslation } from 'react-i18next';

// Helper i18n para campos multilíngues
const t_field = (obj, field, lang) => {
    if (!obj) return '';
    if (lang === 'en' && obj[`${field}_en`]) return obj[`${field}_en`];
    if (lang === 'es' && obj[`${field}_es`]) return obj[`${field}_es`];
    return obj[field] || '';
};

/**
 * @param {boolean}  visible          - Controle de visibilidade
 * @param {object}   medication       - Objeto do medicamento { name, dosage, nextDoseDate, frequencyHours, isRigidSchedule, implications }
 * @param {object}   profile          - Perfil { nome }
 * @param {function} onConfirmOnTime  - Callback quando tomou no horário
 * @param {function} onConfirmDelay   - Callback com { delayMinutes, nextDoseDate }
 * @param {function} onClose          - Callback para fechar modal
 */
export default function DoseConfirmationModal({
    visible = false,
    medication = {},
    profile = {},
    onConfirmOnTime,
    onConfirmDelay,
    onClose,
}) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language?.substring(0, 2) || 'pt';

    // Etapas: 'question' → 'selectDelay' → 'guidance'
    const [step, setStep] = useState('question');
    const [selectedDelay, setSelectedDelay] = useState(null);
    const [customMinutes, setCustomMinutes] = useState('');

    // Reset ao abrir/fechar
    React.useEffect(() => {
        if (visible) {
            setStep('question');
            setSelectedDelay(null);
            setCustomMinutes('');
        }
    }, [visible]);

    // Hora formatada da dose programada
    const scheduledTime = useMemo(() => {
        if (!medication.nextDoseDate) return '--:--';
        const d = new Date(medication.nextDoseDate);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, [medication.nextDoseDate]);

    // Calcula a próxima dose com base no atraso
    const calculateNextDose = (delayMins) => {
        const now = new Date();
        const freq = medication.frequencyHours || 8;

        if (medication.isRigidSchedule) {
            // Rígido: avança ciclos do horário base em O(1) — o do/while
            // anterior podia congelar o app com dados inválidos.
            const stepMs = freq * 60 * 60 * 1000;
            let baseTime = new Date(medication.nextDoseDate).getTime();
            if (!Number.isFinite(baseTime)) baseTime = now.getTime();
            const cycles = baseTime <= now.getTime()
                ? Math.floor((now.getTime() - baseTime) / stepMs) + 1
                : 0;
            return new Date(baseTime + cycles * stepMs);
        } else {
            // Flexível com lógica de atraso:
            if (delayMins <= 30) {
                // Atraso pequeno: mantém ciclo do horário original
                let baseDate = new Date(medication.nextDoseDate);
                baseDate = new Date(baseDate.getTime() + (freq * 60 * 60 * 1000));
                if (baseDate <= now) {
                    baseDate = new Date(now.getTime() + (freq * 60 * 60 * 1000));
                }
                return baseDate;
            } else {
                // Atraso significativo: recalcula a partir da hora real de tomada
                const exactNext = new Date(now.getTime() + (freq * 60 * 60 * 1000));
                // Arredondamento clínico (blocos de 5 min)
                const coeff = 1000 * 60 * 5;
                return new Date(Math.round(exactNext.getTime() / coeff) * coeff);
            }
        }
    };

    // Dados da orientação clínica
    const delayMinutes = selectedDelay === 'custom'
        ? (parseInt(customMinutes, 10) || 0)
        : (selectedDelay?.minutes || 0);

    const guidance = useMemo(() => getDelayGuidance(delayMinutes), [delayMinutes]);
    const nextDoseDate = useMemo(() => calculateNextDose(delayMinutes), [delayMinutes, medication]);

    const nextDoseFormatted = nextDoseDate
        ? nextDoseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '--:--';

    const nextDoseDateFormatted = nextDoseDate
        ? `${nextDoseDate.getDate()}/${nextDoseDate.getMonth() + 1}`
        : '';

    // ─── Handlers ───
    const handleOnTime = () => {
        onConfirmOnTime?.();
        onClose?.();
    };

    const handleSelectDelay = (option) => {
        if (option.key === 'more') {
            setSelectedDelay('custom');
        } else {
            setSelectedDelay(option);
        }
        setStep('guidance');
    };

    const handleCustomSubmit = () => {
        const mins = parseInt(customMinutes, 10);
        if (!mins || mins <= 0) return;
        setSelectedDelay('custom');
        setStep('guidance');
    };

    const handleConfirmWithDelay = () => {
        const mins = selectedDelay === 'custom'
            ? (parseInt(customMinutes, 10) || 0)
            : (selectedDelay?.minutes || 0);

        onConfirmDelay?.({
            delayMinutes: mins,
            nextDoseDate: nextDoseDate?.toISOString(),
        });
        onClose?.();
    };

    // ─── Renderização das Etapas ───

    const renderStepQuestion = () => (
        <View style={styles.stepContainer}>
            {/* Header com info do remédio */}
            <View style={styles.medHeader}>
                <View style={styles.medIconCircle}>
                    <NeoIcon name="Health" size={28} color="#FFF" />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={styles.medName}>{medication.name || 'Medicamento'}</Text>
                    <Text style={styles.medMeta}>
                        {t('doseConfirm.doseOf', 'Dose de')} {scheduledTime} • {medication.dosage || ''}
                    </Text>
                    {profile?.nome && (
                        <Text style={styles.medProfile}>
                            {t('doseConfirm.for', 'Para')} {profile.nome}
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.divider} />

            {/* Pergunta */}
            <Text style={styles.questionText}>
                {t('doseConfirm.question', 'Você tomou no horário programado?')}
            </Text>

            {/* Opções */}
            <TouchableOpacity
                style={[styles.optionButton, styles.optionOnTime]}
                onPress={handleOnTime}
                activeOpacity={0.8}
            >
                <NeoIcon name="TickCircle" size={24} color="#059669" />
                <Text style={[styles.optionText, { color: '#059669' }]}>
                    {t('doseConfirm.yesOnTime', 'Sim, tomei no horário')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.optionButton, styles.optionLate]}
                onPress={() => setStep('selectDelay')}
                activeOpacity={0.8}
            >
                <NeoIcon name="Clock" size={24} color="#D97706" />
                <Text style={[styles.optionText, { color: '#D97706' }]}>
                    {t('doseConfirm.noLate', 'Não, tomei com atraso')}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderStepSelectDelay = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
                <NeoIcon name="Clock" size={20} color="#D97706" />{' '}
                {t('doseConfirm.howMuchDelay', 'Quanto tempo de atraso?')}
            </Text>

            <View style={styles.delayGrid}>
                {DELAY_OPTIONS.map((opt) => (
                    <TouchableOpacity
                        key={opt.key}
                        style={styles.delayChip}
                        onPress={() => handleSelectDelay(opt)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.delayChipText}>
                            {t_field(opt, 'label', lang)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Input customizado (aparece quando "Mais de 4h" selecionado e step ainda é selectDelay) */}
            {selectedDelay === 'custom' && step === 'selectDelay' && (
                <View style={styles.customInputRow}>
                    <TextInput
                        style={styles.customInput}
                        placeholder={t('doseConfirm.minutesPlaceholder', 'Minutos de atraso')}
                        keyboardType="numeric"
                        value={customMinutes}
                        onChangeText={setCustomMinutes}
                        autoFocus
                    />
                    <TouchableOpacity
                        style={styles.customConfirmBtn}
                        onPress={handleCustomSubmit}
                    >
                        <Text style={styles.customConfirmText}>OK</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity
                style={styles.backLink}
                onPress={() => setStep('question')}
            >
                <NeoIcon name="ArrowLeft2" size={16} color={Colors.primary} />
                <Text style={styles.backLinkText}>{t('doseConfirm.back', 'Voltar')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStepGuidance = () => {
        const delayLabel = selectedDelay === 'custom'
            ? `${customMinutes} min`
            : t_field(selectedDelay, 'label', lang);

        return (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.stepContainer}>
                    {/* Header de alerta */}
                    <View style={[styles.guidanceHeader, { backgroundColor: guidance.bgColor, borderColor: guidance.borderColor }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <NeoIcon name={guidance.icon} size={22} color={guidance.color} />
                            <Text style={[styles.guidanceTitle, { color: guidance.color }]}>
                                {' '}{t_field(guidance, 'title', lang)}
                            </Text>
                        </View>
                        <Text style={styles.guidanceDelay}>
                            {t('doseConfirm.delayIdentified', 'Atraso identificado')}: {delayLabel}
                        </Text>
                    </View>

                    {/* Orientação principal */}
                    <View style={[styles.guidanceCard, { borderLeftColor: guidance.color }]}>
                        <Text style={styles.guidanceSectionTitle}>
                            {t('doseConfirm.whatToKnow', 'O que você precisa saber')}
                        </Text>
                        <Text style={styles.guidanceMessage}>
                            {t_field(guidance, 'message', lang)}
                        </Text>
                    </View>

                    {/* Detalhes de risco */}
                    <View style={[styles.guidanceCard, { borderLeftColor: guidance.color }]}>
                        <Text style={styles.guidanceSectionTitle}>
                            {t('doseConfirm.risksAndCare', 'Riscos e cuidados')}
                        </Text>
                        <Text style={styles.guidanceDetails}>
                            {t_field(guidance, 'riskDetails', lang)}
                        </Text>
                    </View>

                    {/* Implicações específicas do medicamento (se preenchido) */}
                    {medication.implications ? (
                        <View style={[styles.guidanceCard, { borderLeftColor: '#7C3AED', backgroundColor: '#F5F3FF' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                <NeoIcon name="Document" size={16} color="#7C3AED" />
                                <Text style={[styles.guidanceSectionTitle, { color: '#7C3AED', marginBottom: 0, marginLeft: 6 }]}>
                                    {t('doseConfirm.specificInfo', 'Informação específica deste medicamento')}
                                </Text>
                            </View>
                            <Text style={[styles.guidanceDetails, { color: '#5B21B6' }]}>
                                {medication.implications}
                            </Text>
                        </View>
                    ) : null}

                    {/* Próxima dose recalculada */}
                    <View style={styles.nextDoseCard}>
                        <NeoIcon name="Clock" size={20} color={Colors.primary} />
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={styles.nextDoseLabel}>
                                {t('doseConfirm.nextDoseRecalc', 'Próxima dose recalculada para')}:
                            </Text>
                            <Text style={styles.nextDoseTime}>
                                {nextDoseFormatted}
                                {nextDoseDateFormatted ? ` — ${nextDoseDateFormatted}` : ''}
                            </Text>
                            <Text style={styles.nextDoseNote}>
                                {medication.isRigidSchedule
                                    ? t('doseConfirm.rigidNote', 'Horário fixo mantido conforme prescrição')
                                    : t('doseConfirm.flexNote', 'Ajustado com base no atraso real')
                                }
                            </Text>
                        </View>
                    </View>

                    {/* Disclaimer médico */}
                    <View style={styles.disclaimerBox}>
                        <NeoIcon name="InfoCircle" size={14} color="#94A3B8" />
                        <Text style={styles.disclaimerText}>
                            {t_field(MEDICAL_DISCLAIMER, 'text', lang)}
                        </Text>
                    </View>

                    {/* Botão confirmar */}
                    <TouchableOpacity
                        style={[styles.confirmButton, { backgroundColor: guidance.color }]}
                        onPress={handleConfirmWithDelay}
                        activeOpacity={0.85}
                    >
                        <NeoIcon name="TickCircle" size={22} color="#FFF" />
                        <Text style={styles.confirmButtonText}>
                            {t('doseConfirm.confirmDose', 'Entendi e Confirmo a Dose')}
                        </Text>
                    </TouchableOpacity>

                    {/* Voltar */}
                    <TouchableOpacity
                        style={[styles.backLink, { marginTop: 12, marginBottom: 20 }]}
                        onPress={() => setStep('selectDelay')}
                    >
                        <NeoIcon name="ArrowLeft2" size={16} color={Colors.primary} />
                        <Text style={styles.backLinkText}>{t('doseConfirm.changeDelay', 'Alterar tempo de atraso')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                        {step === 'question' && (t('doseConfirm.titleConfirm', '💊 Confirmar Dose'))}
                        {step === 'selectDelay' && (t('doseConfirm.titleDelay', '⏰ Tempo de Atraso'))}
                        {step === 'guidance' && (t('doseConfirm.titleGuidance', '⚕️ Orientação Clínica'))}
                    </Text>
                    <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <NeoIcon name="CloseCircle" size={26} color={Neo.colors.neutral[500]} />
                    </TouchableOpacity>
                </View>

                {/* Step indicator */}
                <View style={styles.stepIndicator}>
                    {['question', 'selectDelay', 'guidance'].map((s, i) => (
                        <View key={s} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[
                                styles.stepDot,
                                step === s && styles.stepDotActive,
                                ['selectDelay', 'guidance'].indexOf(step) > i && styles.stepDotCompleted,
                            ]} />
                            {i < 2 && <View style={[
                                styles.stepLine,
                                ['selectDelay', 'guidance'].indexOf(step) > i && styles.stepLineActive,
                            ]} />}
                        </View>
                    ))}
                </View>

                {/* Content */}
                {step === 'question' && renderStepQuestion()}
                {step === 'selectDelay' && renderStepSelectDelay()}
                {step === 'guidance' && renderStepGuidance()}
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFC',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFF',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
    },

    // Step Indicator
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E2E8F0',
    },
    stepDotActive: {
        backgroundColor: Colors.primary,
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    stepDotCompleted: {
        backgroundColor: '#10B981',
    },
    stepLine: {
        width: 40,
        height: 2,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 4,
    },
    stepLineActive: {
        backgroundColor: '#10B981',
    },

    // Steps
    stepContainer: {
        padding: 20,
    },

    // Med Header
    medHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    medIconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    medName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
    },
    medMeta: {
        fontSize: 14,
        color: Neo.colors.neutral[600],
        marginTop: 2,
    },
    medProfile: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: '600',
        marginTop: 2,
    },

    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },

    // Question
    questionText: {
        fontSize: 17,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },

    // Options
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 14,
        borderWidth: 1.5,
        marginBottom: 12,
        gap: 12,
    },
    optionOnTime: {
        backgroundColor: '#ECFDF5',
        borderColor: '#A7F3D0',
    },
    optionLate: {
        backgroundColor: '#FFFBEB',
        borderColor: '#FDE68A',
    },
    optionText: {
        fontSize: 16,
        fontWeight: '700',
    },

    // Step Title
    stepTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginBottom: 20,
    },

    // Delay Grid
    delayGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    delayChip: {
        width: '30%',
        paddingVertical: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },
    delayChipText: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[700],
    },

    // Custom Input
    customInputRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },
    customInput: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
    },
    customConfirmBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    customConfirmText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Back Link
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
    },
    backLinkText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },

    // Guidance
    guidanceHeader: {
        padding: 16,
        borderRadius: 14,
        borderWidth: 1.5,
        marginBottom: 16,
    },
    guidanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    guidanceDelay: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        fontWeight: '600',
    },
    guidanceCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        ...Shadows.sm,
    },
    guidanceSectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
        marginBottom: 8,
    },
    guidanceMessage: {
        fontSize: 14,
        color: Neo.colors.neutral[700],
        lineHeight: 21,
    },
    guidanceDetails: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        lineHeight: 20,
    },

    // Next Dose
    nextDoseCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    nextDoseLabel: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        fontWeight: '600',
    },
    nextDoseTime: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
        marginTop: 2,
    },
    nextDoseNote: {
        fontSize: 11,
        color: Neo.colors.neutral[500],
        fontStyle: 'italic',
        marginTop: 4,
    },

    // Disclaimer
    disclaimerBox: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 20,
        gap: 8,
    },
    disclaimerText: {
        fontSize: 10.5,
        color: '#94A3B8',
        lineHeight: 15,
        flex: 1,
    },

    // Confirm Button
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 14,
        gap: 10,
        ...Shadows.md,
    },
    confirmButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});
