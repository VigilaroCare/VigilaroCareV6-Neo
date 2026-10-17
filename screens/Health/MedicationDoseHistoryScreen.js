/**
 * MedicationDoseHistoryScreen.js
 * Vigilaro Care V6 Neo
 *
 * Histórico de doses tomadas de um lembrete específico.
 * Exibe estatísticas de aderência (7d, 30d) e lista de registros.
 * Acessado a partir do card do lembrete na MedicationRemindersScreen.
 */

import { tx } from '../../utils/txFixo';
import { useState, useCallback } from "react";
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, Body, Small, Eyebrow } from "../../components/NeoTypography";
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import EmptyState from '../../components/EmptyState';
import { SkeletonCard } from '../../components/SkeletonLoader';
import PremiumGate from '../../components/PremiumGate';
import { useSubscription } from '../../hooks/useSubscription';
import MedicationReminderService from '../../services/MedicationReminderService';

const CLR = {
    pill:    Neo.colors.categoria.ardosia.fill,
    success: '#16A34A',
    warning: '#D97706',
    danger:  '#DC2626',
};

// Barra de progresso de aderência
function AderenciaBar({ percentual, label, dias }) {
    const pct = Math.max(0, Math.min(100, percentual));
    const cor = pct >= 80 ? CLR.success : pct >= 50 ? CLR.warning : CLR.danger;
    return (
        <View style={hStyles.aderenciaWrap}>
            <View style={hStyles.aderenciaHeader}>
                <Small style={hStyles.aderenciaLabel}>{label}</Small>
                <Small style={[hStyles.aderenciaPct, { color: cor }]}>{pct}%</Small>
            </View>
            <View style={hStyles.barTrack}>
                <View style={[hStyles.barFill, { width: `${pct}%`, backgroundColor: cor }]} />
            </View>
            <Small style={hStyles.aderenciaSub}>{dias}{tx('telas.MedicationDoseHistoryScreen.diasAnalisados', ' dias analisados')}</Small>
        </View>
    );
}

export default function MedicationDoseHistoryScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const reminder = route.params?.reminder;
    const { limits } = useSubscription();

    const [historico, setHistorico] = useState([]);
    const [stats7, setStats7]   = useState(null);
    const [stats30, setStats30] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(useCallback(() => {
        let alive = true;
        (async () => {
            if (!reminder?.id) return;
            setLoading(true);
            try {
                const maxDias = limits.historicoDosesDias;
                const [h, s7, s30] = await Promise.all([
                    MedicationReminderService.getHistoricoDoses(reminder.id, maxDias),
                    MedicationReminderService.getEstatisticas(reminder.id, 7),
                    MedicationReminderService.getEstatisticas(reminder.id, 30),
                ]);
                if (alive) { setHistorico(h); setStats7(s7); setStats30(s30); }
            } catch (e) {
                if (__DEV__) console.error('[MedicationDoseHistory] load:', e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [reminder?.id]));

    const handleRegistrar = async () => {
        try {
            await MedicationReminderService.registrarDoseTomada(reminder.id);
            // Recarrega
            const maxDias = limits.historicoDosesDias;
            const [h, s7, s30] = await Promise.all([
                MedicationReminderService.getHistoricoDoses(reminder.id, maxDias),
                MedicationReminderService.getEstatisticas(reminder.id, 7),
                MedicationReminderService.getEstatisticas(reminder.id, 30),
            ]);
            setHistorico(h); setStats7(s7); setStats30(s30);
        } catch {
            Alert.alert(tx('telas.MedicationDoseHistoryScreen.erro', 'Erro'), tx('telas.MedicationDoseHistoryScreen.naoFoiPossivelRegistrarADose', 'Não foi possível registrar a dose.'));
        }
    };

    const handleRemoverEntrada = (entradaId) => {
        Alert.alert(
            tx('telas.MedicationDoseHistoryScreen.removerRegistro', 'Remover registro'),
            tx('telas.MedicationDoseHistoryScreen.desejaRemoverEsteRegistroDoHistorico', 'Deseja remover este registro do histórico?'),
            [
                { text: tx('telas.MedicationDoseHistoryScreen.cancelar', 'Cancelar'), style: 'cancel' },
                {
                    text: tx('telas.MedicationDoseHistoryScreen.remover', 'Remover'),
                    style: 'destructive',
                    onPress: async () => {
                        // Filtra localmente e salva
                        const novoHistorico = historico.filter(d => d.id !== entradaId);
                        setHistorico(novoHistorico);
                        // Persiste via update direto no storage
                        try {
                            const all = await MedicationReminderService.getAll();
                            const idx = all.findIndex(r => r.id === reminder.id);
                            if (idx >= 0) {
                                all[idx].historicoDoses = [...novoHistorico].reverse();
                                const { Storage } = require('../../utils/SecureStorage');
                                await Storage.setItem('@vigilaro_medication_reminders', JSON.stringify(all));
                            }
                        } catch (e) {
                            if (__DEV__) console.error('[MedicationDoseHistory] remove:', e);
                        }
                    },
                },
            ]
        );
    };

    if (!reminder) {
        return (
            <AppBackground>
                <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Body>{tx('telas.MedicationDoseHistoryScreen.nenhumLembreteSelecionado', 'Nenhum lembrete selecionado.')}</Body>
                </SafeAreaView>
            </AppBackground>
        );
    }

    return (
        <AppBackground>
            <StatusBar style="dark" />
            <SafeAreaView style={{ flex: 1 }}>

                {/* Header */}
                <View style={hStyles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={hStyles.backBtn}
                        accessibilityLabel={tx('telas.MedicationDoseHistoryScreen.voltar', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H2 style={hStyles.headerTitle} numberOfLines={1}>{reminder.medicamentoNome}</H2>
                        <Body style={hStyles.headerSub}>{tx('telas.MedicationDoseHistoryScreen.historicoDeDoses', 'Histórico de doses')}</Body>
                    </View>
                </View>

                {loading ? (
                    <View style={hStyles.scroll}>
                        <SkeletonCard lines={2} />
                        <SkeletonCard lines={4} />
                    </View>
                ) : (
                    <ScrollView
                        contentContainerStyle={hStyles.scroll}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Botão principal — registrar dose agora */}
                        <TouchableOpacity
                            style={hStyles.tomeiBtn}
                            onPress={handleRegistrar}
                            accessibilityLabel="Registrar dose tomada agora"
                        >
                            <NeoIcon name="TickCircle" variant="Bold" size={22} color="#FFF" />
                            <Text style={hStyles.tomeiBtnText}>{tx('telas.MedicationDoseHistoryScreen.tomeiAgora', 'Tomei agora')}</Text>
                        </TouchableOpacity>

                        {/* Estatísticas de aderência */}
                        {(stats7 || stats30) && (
                            <>
                                <Eyebrow style={hStyles.eyebrow}>{tx('telas.MedicationDoseHistoryScreen.aderencia', 'Aderência')}</Eyebrow>
                                <PremiumGate feature="aderenciaStats" inline>
                                    <NeoCard variant="elevated" style={hStyles.card}>
                                        {stats7 && (
                                            <AderenciaBar
                                                percentual={stats7.percentual}
                                                label={tx('telas.MedicationDoseHistoryScreen.ultimos7Dias', 'Últimos 7 dias')}
                                                dias={7}
                                            />
                                        )}
                                        {stats7 && stats30 && <View style={hStyles.divider} />}
                                        {stats30 && (
                                            <AderenciaBar
                                                percentual={stats30.percentual}
                                                label={tx('telas.MedicationDoseHistoryScreen.ultimos30Dias', 'Últimos 30 dias')}
                                                dias={30}
                                            />
                                        )}
                                        <Small style={hStyles.statsNote}>{tx('telas.MedicationDoseHistoryScreen.estimativaBaseadaNosHorariosEDias', '* Estimativa baseada nos horários e dias configurados.')}</Small>
                                    </NeoCard>
                                </PremiumGate>
                            </>
                        )}

                        {/* Lista de histórico */}
                        <Eyebrow style={[hStyles.eyebrow, { marginTop: 8 }]}>{tx('telas.MedicationDoseHistoryScreen.registros', 'Registros (')}{limits.historicoDosesDias}{tx('telas.MedicationDoseHistoryScreen.dias', ' dias)')}</Eyebrow>

                        {historico.length === 0 ? (
                            <EmptyState
                                icon="Clock"
                                title="Nenhuma dose registrada"
                                description={tx('telas.MedicationDoseHistoryScreen.toqueEmTomeiAgoraSempreQue', 'Toque em \'Tomei agora\' sempre que tomar o medicamento.')}
                            />
                        ) : (
                            <NeoCard variant="elevated" padding={0} style={hStyles.card}>
                                {historico.map((entrada, i) => (
                                    <View
                                        key={entrada.id}
                                        style={[hStyles.entradaRow, i > 0 && hStyles.entradaDivider]}
                                    >
                                        <View style={hStyles.entradaDot} />
                                        <View style={{ flex: 1 }}>
                                            <Body style={hStyles.entradaData}>
                                                {MedicationReminderService.constructor.formatDataHora
                                                    ? (() => {
                                                        // static call workaround
                                                        const d = new Date(entrada.timestamp);
                                                        const dia = String(d.getDate()).padStart(2, '0');
                                                        const mes = String(d.getMonth() + 1).padStart(2, '0');
                                                        const h   = String(d.getHours()).padStart(2, '0');
                                                        const m   = String(d.getMinutes()).padStart(2, '0');
                                                        return `${dia}/${mes} às ${h}:${m}`;
                                                    })()
                                                    : entrada.timestamp}
                                            </Body>
                                            {!!entrada.horario && (
                                                <Small style={hStyles.entradaHorario}>{tx('telas.MedicationDoseHistoryScreen.doseDas', 'Dose das ')}{entrada.horario}
                                                </Small>
                                            )}
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => handleRemoverEntrada(entrada.id)}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                            accessibilityLabel={tx('telas.MedicationDoseHistoryScreen.removerRegistro2', 'Remover registro')}
                                        >
                                            <NeoIcon name="Trash" variant="Linear" size={16} color={Neo.colors.neutral[400]} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </NeoCard>
                        )}

                        <Small style={hStyles.legalNote}>{tx('telas.MedicationDoseHistoryScreen.esteHistoricoEApenasUmRegistro', 'Este histórico é apenas um registro pessoal. Não constitui prontuário médico. Consulte sempre seu médico para informações sobre sua medicação.')}</Small>
                    </ScrollView>
                )}
            </SafeAreaView>
        </AppBackground>
    );
}

const hStyles = StyleSheet.create({
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.md,
        paddingBottom: Neo.spacing.sm,
        gap: 12,
    },
    backBtn: {
        width: 40, height: 40, borderRadius: 20,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: Neo.colors.neutral[100],
    },
    headerTitle: { fontSize: 20, color: Neo.colors.neutral[900] },
    headerSub:   { color: Neo.colors.neutral[500], fontSize: 13 },

    scroll: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: Neo.layout?.scrollBottomFooter || 100,
    },
    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    card:    { marginBottom: Neo.spacing.md },

    tomeiBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 10, backgroundColor: CLR.success,
        paddingVertical: 16, borderRadius: 16,
        marginTop: Neo.spacing.md, marginBottom: 4,
        shadowColor: CLR.success, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    },
    tomeiBtnText: {
        color: '#FFF', fontSize: 17, fontWeight: '700',
    },

    aderenciaWrap: { marginBottom: 4 },
    aderenciaHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    aderenciaLabel: { color: Neo.colors.neutral[700], fontWeight: '600' },
    aderenciaPct:   { fontWeight: '800', fontSize: 15 },
    barTrack: {
        height: 8, borderRadius: 4,
        backgroundColor: Neo.colors.neutral[200],
        overflow: 'hidden',
    },
    barFill: { height: '100%', borderRadius: 4 },
    aderenciaSub: { color: Neo.colors.neutral[400], marginTop: 4, fontSize: 11 },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Neo.colors.neutral[200],
        marginVertical: Neo.spacing.md,
    },
    statsNote: {
        color: Neo.colors.neutral[400], marginTop: Neo.spacing.md,
        fontStyle: 'italic', fontSize: 11,
    },

    entradaRow: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: Neo.spacing.md, paddingVertical: 14,
    },
    entradaDivider: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Neo.colors.neutral[200],
    },
    entradaDot: {
        width: 10, height: 10, borderRadius: 5,
        backgroundColor: CLR.success,
    },
    entradaData:    { color: Neo.colors.neutral[800], fontSize: 14, fontWeight: '600' },
    entradaHorario: { color: Neo.colors.neutral[500], fontSize: 12, marginTop: 2 },

    legalNote: {
        color: Neo.colors.neutral[400], textAlign: 'center',
        lineHeight: 18, fontSize: 11,
        marginTop: Neo.spacing.md, marginBottom: 20,
        fontStyle: 'italic',
    },
});
