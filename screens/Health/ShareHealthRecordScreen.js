import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Share, Alert, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import HealthService from '../../services/HealthService';
import { useProfiles } from '../../contexts/ProfileContext';

// Components
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';

export default function ShareHealthRecordScreen({ navigation }) {
    const { t } = useTranslation('common');
    const { primaryProfile } = useProfiles();

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [options, setOptions] = useState({
        includeMedications: true,
        includeTreatments: true,
        includeSchedule: true,
        includeHistory: true,
        onlyShareable: true
    });

    useEffect(() => {
        loadSummary();
    }, []);

    const loadSummary = async () => {
        try {
            setLoading(true);
            if (primaryProfile) {
                const data = await HealthService.getHealthSummary(primaryProfile.id);
                setSummary(data);
            }
        } catch (e) {
            console.error('Error loading summary:', e);
        } finally {
            setLoading(false);
        }
    };

    const toggleOption = (key) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleShare = async () => {
        try {
            if (!primaryProfile) {
                Alert.alert('Erro', 'Perfil não encontrado');
                return;
            }

            const report = await HealthService.generateHealthReport(primaryProfile.id, options);

            await Share.share({
                message: report,
                title: `Ficha Médica - ${primaryProfile.nome}`
            });
        } catch (e) {
            console.error('Error sharing:', e);
            Alert.alert('Erro', 'Não foi possível compartilhar a ficha médica');
        }
    };

    const handleCopy = async () => {
        try {
            if (!primaryProfile) return;

            const report = await HealthService.generateHealthReport(primaryProfile.id, options);
            await Clipboard.setStringAsync(report);
            Alert.alert('Copiado!', 'Ficha médica copiada para a área de transferência');
        } catch (e) {
            console.error('Error copying:', e);
            Alert.alert('Erro', 'Não foi possível copiar o texto.');
        }
    };

    const getShareableCount = () => {
        if (!summary) return 0;
        return summary.history.filter(h => h.shareable).length;
    };

    return (
        <AppBackground variant="subtle">
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <H2 style={{ flex: 1, marginLeft: 16 }}>{t('headersFirst.compartilhar', 'Compartilhar')}</H2>
                <TouchableOpacity onPress={handleShare}>
                    <NeoIcon name="ShareNetwork" size={28} color={Neo.colors.primary[600]} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Info Card */}
                <NeoCard variant="elevated" style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <NeoIcon name="InfoCircle" size={24} color={Neo.colors.primary[600]} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Body style={{ fontWeight: '600' }}>{t('headersFirst.sobreOCompartilhamento', 'Sobre o compartilhamento')}</Body>
                        <Small style={{ color: Neo.colors.neutral[600], marginTop: 4 }}>
                            {t('headersFirst.selecioneQuaisInformaEsDesejaIncluirNaFi', 'Selecione quais informações deseja incluir na ficha médica. Você pode compartilhar via WhatsApp, email ou copiar o texto.')}
                        </Small>
                    </View>
                </NeoCard>

                {/* Options */}
                <View style={styles.section}>
                    <Small style={styles.sectionTitle}>{t('headersFirst.oQUEINCLUIR', 'O QUE INCLUIR')}</Small>

                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => toggleOption('includeMedications')}
                    >
                        <View style={styles.optionIcon}>
                            <NeoIcon name="Health" size={20} color={Neo.colors.primary[600]} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: '600' }}>{t('headersFirst.medicamentosAtuais', 'Medicamentos Atuais')}</Body>
                            <Small style={{ color: Neo.colors.neutral[500] }}>
                                {summary?.medications.length || 0} medicamento{summary?.medications.length !== 1 ? 's' : ''}
                            </Small>
                        </View>
                        <View style={[styles.checkbox, options.includeMedications && styles.checkboxActive]}>
                            {options.includeMedications && (
                                <NeoIcon name="TickSquare" size={16} color={Neo.colors.neutral.white} />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => toggleOption('includeTreatments')}
                    >
                        <View style={styles.optionIcon}>
                            <NeoIcon name="Health" size={20} color={Neo.colors.primary[600]} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: '600' }}>{t('headersFirst.tratamentosEmAndamento', 'Tratamentos em Andamento')}</Body>
                            <Small style={{ color: Neo.colors.neutral[500] }}>
                                {summary?.treatments.length || 0} tratamento{summary?.treatments.length !== 1 ? 's' : ''}
                            </Small>
                        </View>
                        <View style={[styles.checkbox, options.includeTreatments && styles.checkboxActive]}>
                            {options.includeTreatments && (
                                <NeoIcon name="TickSquare" size={16} color={Neo.colors.neutral.white} />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => toggleOption('includeSchedule')}
                    >
                        <View style={styles.optionIcon}>
                            <NeoIcon name="Calendar" size={20} color={Neo.colors.primary[600]} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: '600' }}>{t('headersFirst.agendaMDica', 'Agenda Médica')}</Body>
                            <Small style={{ color: Neo.colors.neutral[500] }}>
                                {(summary?.appointments?.length || 0) + (summary?.procedures?.length || 0)} evento{(summary?.appointments?.length || 0) + (summary?.procedures?.length || 0) !== 1 ? 's' : ''} agendados
                            </Small>
                        </View>
                        <View style={[styles.checkbox, options.includeSchedule && styles.checkboxActive]}>
                            {options.includeSchedule && (
                                <NeoIcon name="TickSquare" size={16} color={Neo.colors.neutral.white} />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => toggleOption('includeHistory')}
                    >
                        <View style={styles.optionIcon}>
                            <NeoIcon name="Document" size={20} color={Neo.colors.primary[600]} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: '600' }}>{t('headersFirst.histRicoMDico', 'Histórico Médico')}</Body>
                            <Small style={{ color: Neo.colors.neutral[500] }}>
                                {summary?.history.length || 0} registro{summary?.history.length !== 1 ? 's' : ''}
                            </Small>
                        </View>
                        <View style={[styles.checkbox, options.includeHistory && styles.checkboxActive]}>
                            {options.includeHistory && (
                                <NeoIcon name="TickSquare" size={16} color={Neo.colors.neutral.white} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Privacy Option */}
                {options.includeHistory && (
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.privacyCard}
                            onPress={() => toggleOption('onlyShareable')}
                        >
                            <View style={{ flex: 1 }}>
                                <Body style={{ fontWeight: '600' }}>{t('headersFirst.apenasRegistrosMarcadosComoCompartilhVei', 'Apenas registros marcados como compartilháveis')}</Body>
                                <Small style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                                    {options.onlyShareable
                                        ? `${getShareableCount()} de ${summary?.history.length || 0} registros serão incluídos`
                                        : 'Todos os registros serão incluídos'
                                    }
                                </Small>
                            </View>
                            <View style={[styles.toggle, options.onlyShareable && styles.toggleActive]}>
                                <View style={[styles.toggleThumb, options.onlyShareable && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Preview */}
                <View style={styles.section}>
                    <Small style={styles.sectionTitle}>{t('headersFirst.pRVIA', 'PRÉVIA')}</Small>
                    <NeoCard variant="elevated" style={styles.previewCard}>
                        <Small style={[styles.previewText, { fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto' }]}>
                            <Text>*FICHA MÉDICA - VIGILARO CARE*{'\n\n'}</Text>
                            <Text>👤 *Nome:* {primaryProfile?.nome || 'Não informado'}{'\n'}</Text>
                            <Text>⏱️ *Data:* {new Date().toLocaleDateString('pt-BR')}{'\n\n'}</Text>
                            {options.includeMedications && summary?.medications.length > 0 && (
                                <Text>{`💊 *MEDICAMENTOS ATUAIS*\n  ▫️ ${summary.medications[0].name}...\n\n`}</Text>
                            )}
                            {options.includeTreatments && summary?.treatments.length > 0 && (
                                <Text>{`🩺 *TRATAMENTOS EM ANDAMENTO*\n  ▫️ ${summary.treatments[0].name}...\n\n`}</Text>
                            )}
                            {options.includeSchedule && (summary?.appointments?.length > 0 || summary?.procedures?.length > 0) && (
                                <Text>{`🗓️ *AGENDA (CONSULTAS/PROC)*\n  ▫️ ${summary.appointments?.[0]?.name || summary.procedures?.[0]?.name}...\n\n`}</Text>
                            )}
                            {options.includeHistory && summary?.history?.length > 0 && (
                                <Text>{`🗂️ *HISTÓRICO MÉDICO / DOSSIÊ*\n  ▫️ ${summary.history[0].description}...\n\n`}</Text>
                            )}
                            <Text>...</Text>
                        </Small>
                    </NeoCard>
                </View>

            </ScrollView>

            {/* Action Buttons */}
            <SafeAreaView edges={['bottom']} style={styles.footer}>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleCopy}>
                    <NeoIcon name="Copy" size={20} color={Neo.colors.primary[600]} />
                    <Body style={{ color: Neo.colors.primary[600], fontWeight: '600', marginLeft: 8 }}>
                        {t('headersFirst.copiar', 'Copiar')}
                    </Body>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton} onPress={handleShare}>
                    <NeoIcon name="ShareNetwork" size={20} color={Neo.colors.neutral.white} />
                    <Body style={{ color: Neo.colors.neutral.white, fontWeight: '600', marginLeft: 8 }}>
                        {t('headersFirst.compartilharAgora', 'Compartilhar Agora')}
                    </Body>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: Neo.spacing.md,
    },
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },
    infoCard: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Neo.colors.primary[50],
        marginTop: 16,
        gap: 12,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Neo.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        color: Neo.colors.neutral[600],
        fontWeight: '600',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'transparent',
        borderRadius: 12,
        marginBottom: 12,
        gap: 12,
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Neo.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Neo.colors.neutral[300],
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: Neo.colors.primary[500],
        borderColor: Neo.colors.primary[500],
    },
    privacyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'transparent',
        borderRadius: 12,
        gap: 16,
    },
    toggle: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: Neo.colors.neutral[300],
        padding: 2,
        justifyContent: 'center',
    },
    toggleActive: {
        backgroundColor: Neo.colors.primary[500],
    },
    toggleThumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: Neo.colors.neutral.white,
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    previewCard: {
        padding: 16,
        backgroundColor: Neo.colors.neutral[900],
    },
    previewText: {
        fontFamily: 'Courier',
        color: Neo.colors.feedback.success,
        fontSize: 11,
        lineHeight: 16,
    },
    footer: {
        flexDirection: 'row',
        padding: Neo.spacing.lg,
        paddingBottom: 110, // Margin against the bottom tab navigator
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: Neo.colors.neutral[200],
        backgroundColor: 'transparent',
    },
    secondaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Neo.colors.primary[500],
    },
    primaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: Neo.colors.primary[500],
    },
});
