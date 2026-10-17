/**
 * DataHealthScreen.js
 * 
 * Tela de diagnóstico de integridade de dados.
 * Acessível via menu de ferramentas/dev.
 * Executa a validação completa do @vigilaro_data e exibe o relatório.
 */

import { tx } from '../../utils/txFixo';
import { useState } from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { Neo } from '../../utils/Theme';
import { validateVigilaroData, SEVERITY } from '../../utils/DataIntegrityUtils';
import { Storage } from '../../utils/SecureStorage';

const VIGILARO_DATA_KEY = '@vigilaro_data';

const SEVERITY_COLORS = {
    [SEVERITY.CRITICAL]: Neo.colors.feedback.error,
    [SEVERITY.HIGH]:     Neo.colors.feedback.warning,
    [SEVERITY.MEDIUM]:   Neo.colors.feedback.warning,
    [SEVERITY.LOW]:      Neo.colors.feedback.info,
    [SEVERITY.INFO]:     Neo.colors.neutral[500],
};

const SEVERITY_ICONS = {
    [SEVERITY.CRITICAL]: (s) => <NeoIcon name="CloseCircle" size={s} color={Neo.colors.feedback.error} variant="Bold" />,
    [SEVERITY.HIGH]:     (s) => <NeoIcon name="Warning2" size={s} color={Neo.colors.feedback.warning} variant="Bold" />,
    [SEVERITY.MEDIUM]:   (s) => <NeoIcon name="Warning2" size={s} color={Neo.colors.feedback.warning} variant="Bold" />,
    [SEVERITY.LOW]:      (s) => <NeoIcon name="InfoCircle" size={s} color={Neo.colors.feedback.info} variant="Bold" />,
    [SEVERITY.INFO]:     (s) => <NeoIcon name="InfoCircle" size={s} color={Neo.colors.neutral[500]} />,
};

export default function DataHealthScreen({ navigation }) {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const runValidation = async () => {
        setLoading(true);
        setError(null);
        try {
            const raw = await Storage.getItem(VIGILARO_DATA_KEY);
            if (!raw) {
                setError('Nenhum dado encontrado no armazenamento local.');
                setLoading(false);
                return;
            }
            const data = JSON.parse(raw);
            const result = validateVigilaroData(data);
            setReport(result);
        } catch (e) {
            setError(`Erro ao executar validação: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = () => {
        if (!report) return Neo.colors.neutral[400];
        if (report.healthStatus.includes('CRÍTICO')) return Neo.colors.feedback.error;
        if (report.healthStatus.includes('INSTÁVEL')) return Neo.colors.feedback.warning;
        if (report.healthStatus.includes('ATENÇÃO')) return Neo.colors.feedback.warning;
        if (report.healthStatus.includes('BOM')) return Neo.colors.feedback.info;
        return Neo.colors.feedback.success;
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={{ paddingHorizontal: Neo.spacing.lg, paddingVertical: Neo.spacing.md, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 8 }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                    </TouchableOpacity>
                    <View>
                        <H2>{tx('telas.DataHealthScreen.saudeDosDados', 'Saúde dos Dados')}</H2>
                        <Caption>{tx('telas.DataHealthScreen.diagnosticoDeIntegridadeDoVigilaroData', 'Diagnóstico de integridade do @vigilaro_data')}</Caption>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }}>

                    {/* Run Button */}
                    {!report && (
                        <TouchableOpacity
                            onPress={runValidation}
                            disabled={loading}
                            activeOpacity={0.85}
                            style={{
                                backgroundColor: Neo.colors.primary[500],
                                paddingVertical: 16,
                                borderRadius: 16,
                                alignItems: 'center',
                                marginBottom: 24,
                                opacity: loading ? 0.6 : 1,
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator color={Neo.colors.neutral.white} />
                            ) : (
                                <Body style={{ color: Neo.colors.neutral.white, fontWeight: 'bold', fontSize: 16 }}>{tx('telas.DataHealthScreen.executarDiagnostico', 'Executar Diagnóstico')}</Body>
                            )}
                        </TouchableOpacity>
                    )}

                    {/* Error */}
                    {error && (
                        <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 24, backgroundColor: Neo.colors.feedback.error + '1A' }}>
                            <Body style={{ color: Neo.colors.feedback.error }}>{error}</Body>
                        </NeoCard>
                    )}

                    {/* Report */}
                    {report && (
                        <>
                            {/* Health Status Banner */}
                            <NeoCard variant="elevated" style={{ padding: 20, marginBottom: 24, alignItems: 'center' }}>
                                <View style={{
                                    width: 64, height: 64, borderRadius: 32,
                                    backgroundColor: getStatusColor() + '20',
                                    alignItems: 'center', justifyContent: 'center', marginBottom: 12
                                }}>
                                    {report.healthStatus.includes('SAUDÁVEL')
                                        ? <NeoIcon name="TickCircle" size={36} color={Neo.colors.feedback.success} variant="Bold" />
                                        : <NeoIcon name="Warning2" size={36} color={getStatusColor()} variant="Bold" />
                                    }
                                </View>
                                <H3 style={{ textAlign: 'center', color: getStatusColor() }}>
                                    {report.healthStatus.split('—')[0].trim()}
                                </H3>
                                <Caption style={{ textAlign: 'center', marginTop: 4 }}>
                                    {report.healthStatus.split('—')[1]?.trim() || ''}
                                </Caption>
                            </NeoCard>

                            {/* Stats Grid */}
                            <H3 style={{ marginBottom: 12 }}>{tx('telas.DataHealthScreen.estatisticas', 'Estatísticas')}</H3>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                                {[
                                    { label: 'Perfis', value: report.stats.totalPerfis, color: Neo.colors.primary[500] },
                                    { label: 'Residências', value: report.stats.totalResidences, color: Neo.colors.primary[500] },
                                    { label: 'Órfãos', value: report.stats.orphanedProfiles, color: report.stats.orphanedProfiles > 0 ? Neo.colors.feedback.warning : Neo.colors.feedback.success },
                                    { label: 'Fantasmas', value: report.stats.phantomReferences, color: report.stats.phantomReferences > 0 ? Neo.colors.feedback.error : Neo.colors.feedback.success },
                                    { label: 'IDs Duplos', value: report.stats.duplicateIds, color: report.stats.duplicateIds > 0 ? Neo.colors.feedback.error : Neo.colors.feedback.success },
                                    { label: 'S/ Moradia', value: report.stats.residencesWithoutMoradia, color: report.stats.residencesWithoutMoradia > 0 ? Neo.colors.feedback.warning : Neo.colors.feedback.success },
                                ].map((s, i) => (
                                    <View key={i} style={{
                                        width: '31%', backgroundColor: 'rgba(255,255,255,0.6)',
                                        borderRadius: 12, padding: 12, alignItems: 'center'
                                    }}>
                                        <H3 style={{ color: s.color, fontSize: 22 }}>{s.value}</H3>
                                        <Small style={{ color: Neo.colors.neutral[600], textAlign: 'center' }}>{s.label}</Small>
                                    </View>
                                ))}
                            </View>

                            {/* Issues List */}
                            {report.issues.length > 0 && (
                                <>
                                    <H3 style={{ marginBottom: 12 }}>
                                        {report.issues.length}{tx('telas.DataHealthScreen.problema', ' Problema')}{report.issues.length > 1 ? 's' : ''}{tx('telas.DataHealthScreen.encontrado', ' Encontrado')}{report.issues.length > 1 ? 's' : ''}
                                    </H3>
                                    {report.issues.map((issue, idx) => (
                                        <NeoCard key={idx} variant="elevated" style={{ padding: 14, marginBottom: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <View style={{ marginRight: 10, marginTop: 2 }}>
                                                    {SEVERITY_ICONS[issue.severity]?.(18) || <NeoIcon name="InfoCircle" size={18} color="#999" />}
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Small style={{ fontWeight: 'bold', color: SEVERITY_COLORS[issue.severity] || '#666', marginBottom: 2 }}>
                                                        {issue.category}
                                                    </Small>
                                                    <Caption style={{ color: Neo.colors.neutral[700], lineHeight: 18 }}>
                                                        {issue.message}
                                                    </Caption>
                                                </View>
                                            </View>
                                        </NeoCard>
                                    ))}
                                </>
                            )}

                            {report.issues.length === 0 && (
                                <NeoCard variant="elevated" style={{ padding: 24, alignItems: 'center' }}>
                                    <NeoIcon name="TickCircle" size={48} color={Neo.colors.feedback.success} variant="Bold" />
                                    <H3 style={{ marginTop: 12, color: Neo.colors.feedback.success }}>{tx('telas.DataHealthScreen.tudoIntegro', 'Tudo Íntegro!')}</H3>
                                    <Caption style={{ textAlign: 'center', marginTop: 4 }}>{tx('telas.DataHealthScreen.nenhumaInconsistenciaEncontradaNosDados', 'Nenhuma inconsistência encontrada nos dados.')}</Caption>
                                </NeoCard>
                            )}

                            {/* Re-run Button */}
                            <TouchableOpacity
                                onPress={() => { setReport(null); setError(null); }}
                                style={{
                                    marginTop: 24,
                                    paddingVertical: 14,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: Neo.colors.primary[300],
                                    alignItems: 'center',
                                }}
                            >
                                <Body style={{ color: Neo.colors.primary[500], fontWeight: '600' }}>{tx('telas.DataHealthScreen.executarNovamente', 'Executar Novamente')}</Body>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
