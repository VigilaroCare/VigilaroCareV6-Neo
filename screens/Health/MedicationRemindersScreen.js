/**
 * MedicationRemindersScreen.js
 * Vigilaro Care V6 Neo
 *
 * Lista todos os lembretes de medicamentos do perfil ativo.
 * Permite ativar/desativar, editar e remover lembretes.
 * Acesso: MinhaSaudeScreen → botão "Gerenciar Lembretes"
 */

import { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, H3, Body, Small, Eyebrow } from '../../components/NeoTypography';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import ButtonNeo from '../../components/ButtonNeo';
import AppBackground from '../../components/AppBackground';
import EmptyState from '../../components/EmptyState';
import { SkeletonCard } from '../../components/SkeletonLoader';
import TappablePressable from '../../components/TappablePressable';
import { usePremiumGate } from '../../components/PremiumGate';
import MedicationReminderService from '../../services/MedicationReminderService';
import ProfileService from '../../services/ProfileService';

// Paleta semântica
const CLR = {
    pill:    Neo.colors.categoria.ardosia.fill,   // sky — informativo/medicamento
    success: '#16A34A',
    warning: '#D97706',
    danger:  '#DC2626',
};

// Badge de status do cuidador remoto
function RemoteBadge({ status }) {
    const s = MedicationReminderService.constructor.optinStatusIcon
        ? MedicationReminderService.constructor.optinStatusIcon(status)
        : MedicationReminderService.__proto__.constructor.optinStatusIcon?.(status)
        ?? { icon: 'Clock', color: CLR.warning, label: 'Aguardando' };

    // Static call via import helper
    const info = (() => {
        switch (status) {
            case 'aceito':   return { icon: 'TickCircle',  color: CLR.success, label: 'Confirmado' };
            case 'recusado': return { icon: 'CloseCircle', color: CLR.danger,  label: 'Recusado' };
            default:         return { icon: 'Clock',        color: CLR.warning, label: 'Aguardando' };
        }
    })();

    return (
        <View style={[rStyles.remoteBadge, { borderColor: info.color + '44', backgroundColor: info.color + '10' }]}>
            <NeoIcon name={info.icon} variant="Bold" size={12} color={info.color} />
            <Small style={[rStyles.remoteBadgeText, { color: info.color }]}>{info.label}</Small>
        </View>
    );
}

// Card individual de lembrete
function ReminderCard({ reminder, onToggle, onEdit, onDelete, onTomei, onSnooze, onHistorico }) {
    const horarios = reminder.horarios?.join(' · ') || '—';

    const dias = (() => {
        if (!reminder.diasSemana?.length || reminder.diasSemana.length === 7) return 'Todos os dias';
        const map = { 1: 'Dom', 2: 'Seg', 3: 'Ter', 4: 'Qua', 5: 'Qui', 6: 'Sex', 7: 'Sáb' };
        return reminder.diasSemana.map(d => map[d]).join(', ');
    })();

    const isRemoteAtivo = reminder.cuidadorRemoto?.ativo;
    const doseCount = reminder.historicoDoses?.length || 0;

    return (
        <NeoCard variant="elevated" style={rStyles.card}>
            {/* Header */}
            <View style={rStyles.cardHeader}>
                <View style={rStyles.pillBadge}>
                    <NeoIcon name="MedicalSquare" variant="Bold" size={18} color={CLR.pill} />
                </View>
                <View style={{ flex: 1 }}>
                    <H3 style={rStyles.medName} numberOfLines={2}>{reminder.medicamentoNome}</H3>
                    {!!reminder.perfilNome && (
                        <Small style={rStyles.perfilTag}>Para: {reminder.perfilNome}</Small>
                    )}
                </View>
                <Switch
                    value={reminder.ativo}
                    onValueChange={() => onToggle(reminder.id)}
                    trackColor={{ false: Neo.colors.neutral[300], true: CLR.pill + '80' }}
                    thumbColor={reminder.ativo ? CLR.pill : Neo.colors.neutral[400]}
                    ios_backgroundColor={Neo.colors.neutral[300]}
                />
            </View>

            {/* Info linha */}
            <View style={rStyles.infoRow}>
                <View style={rStyles.infoChip}>
                    <NeoIcon name="Clock" variant="Linear" size={13} color={Neo.colors.neutral[500]} />
                    <Small style={rStyles.infoChipText}>{horarios}</Small>
                </View>
                <View style={rStyles.infoChip}>
                    <NeoIcon name="Calendar1" variant="Linear" size={13} color={Neo.colors.neutral[500]} />
                    <Small style={rStyles.infoChipText}>{dias}</Small>
                </View>
                {doseCount > 0 && (
                    <View style={[rStyles.infoChip, { backgroundColor: CLR.success + '14', borderColor: CLR.success + '30', borderWidth: 1 }]}>
                        <NeoIcon name="TickCircle" variant="Bold" size={13} color={CLR.success} />
                        <Small style={[rStyles.infoChipText, { color: CLR.success }]}>{doseCount} dose{doseCount !== 1 ? 's' : ''}</Small>
                    </View>
                )}
            </View>

            {/* Cuidador Remoto badge */}
            {isRemoteAtivo && (
                <View style={rStyles.remoteLine}>
                    <NeoIcon name="Wifi" variant="Linear" size={13} color={CLR.pill} />
                    <Small style={rStyles.remoteLabel}>{reminder.cuidadorRemoto.destinatarioNome}</Small>
                    <RemoteBadge status={reminder.cuidadorRemoto.optinStatus} />
                </View>
            )}

            {/* Observações */}
            {!!reminder.observacoes && (
                <Small style={rStyles.obs} numberOfLines={2}>{reminder.observacoes}</Small>
            )}

            {/* ── Ações primárias: Tomei + Snooze ── */}
            <View style={rStyles.primaryActions}>
                <TappablePressable
                    style={rStyles.tomeiBtn}
                    onPress={() => onTomei(reminder)}
                    accessibilityLabel="Registrar dose tomada"
                >
                    <NeoIcon name="TickCircle" variant="Bold" size={16} color="#FFF" />
                    <Small style={rStyles.tomeiBtnText}>Tomei</Small>
                </TappablePressable>
                <TappablePressable
                    style={rStyles.snoozeBtn}
                    onPress={() => onSnooze(reminder)}
                    accessibilityLabel="Adiar lembrete 10 minutos"
                >
                    <NeoIcon name="Clock" variant="Bold" size={16} color={CLR.warning} />
                    <Small style={rStyles.snoozeBtnText}>+10 min</Small>
                </TappablePressable>
            </View>

            {/* ── Ações secundárias ── */}
            <View style={rStyles.actions}>
                <TappablePressable style={rStyles.actionBtn} onPress={() => onHistorico(reminder)}>
                    <NeoIcon name="Chart" variant="Linear" size={14} color={Neo.colors.neutral[500]} />
                    <Small style={[rStyles.actionText, { color: Neo.colors.neutral[500] }]}>Histórico</Small>
                </TappablePressable>
                <TappablePressable style={rStyles.actionBtn} onPress={() => onEdit(reminder)}>
                    <NeoIcon name="Edit2" variant="Linear" size={14} color={CLR.pill} />
                    <Small style={[rStyles.actionText, { color: CLR.pill }]}>Editar</Small>
                </TappablePressable>
                <TappablePressable style={rStyles.actionBtn} onPress={() => onDelete(reminder)}>
                    <NeoIcon name="Trash" variant="Linear" size={14} color={CLR.danger} />
                    <Small style={[rStyles.actionText, { color: CLR.danger }]}>Remover</Small>
                </TappablePressable>
            </View>
        </NeoCard>
    );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function MedicationRemindersScreen() {
    const navigation = useNavigation();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perfilAtivo, setPerfilAtivo] = useState(null);
    const { guard } = usePremiumGate();

    // Helper: quantos lembretes ativos existem agora?
    const activeRemindersCount = reminders.filter(r => r.ativo).length;

    useFocusEffect(useCallback(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            try {
                const perfil = await ProfileService.getPerfilAtivo();
                if (!alive) return;
                setPerfilAtivo(perfil);
                if (perfil?.id) {
                    const data = await MedicationReminderService.getByPerfil(perfil.id);
                    if (alive) setReminders(data);
                } else {
                    // Se não há perfil ativo, carrega todos
                    const data = await MedicationReminderService.getAll();
                    if (alive) setReminders(data);
                }
            } catch (e) {
                if (__DEV__) console.error('[MedicationReminders] load:', e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []));

    const _performToggle = async (id) => {
        try {
            await MedicationReminderService.toggleAtivo(id);
            setReminders(prev =>
                prev.map(r => r.id === id ? { ...r, ativo: !r.ativo } : r)
            );
        } catch (e) {
            Alert.alert('Erro', e.message === 'LIMIT_MAX_LEMBRETES' ? 'Limite de lembretes ativos atingido.' : 'Não foi possível atualizar o lembrete.');
        }
    };

    const handleToggle = (id) => {
        const reminder = reminders.find(r => r.id === id);
        if (!reminder) return;

        // Se está inativo e vai ativar, valida o limite
        if (!reminder.ativo) {
            guard('maxLembretes', () => _performToggle(id), activeRemindersCount)();
        } else {
            // Se já está ativo e vai desativar, sempre permite
            _performToggle(id);
        }
    };

    const handleTomei = async (reminder) => {
        try {
            await MedicationReminderService.registrarDoseTomada(reminder.id);
            // Atualiza contagem local sem recarregar tudo
            setReminders(prev => prev.map(r => {
                if (r.id !== reminder.id) return r;
                const historico = [...(r.historicoDoses || []), {
                    id: String(Date.now()),
                    timestamp: new Date().toISOString(),
                    horario: null,
                }];
                return { ...r, historicoDoses: historico };
            }));
            Alert.alert('✅ Dose registrada', `"${reminder.medicamentoNome}" registrado com sucesso.`);
        } catch {
            Alert.alert('Erro', 'Não foi possível registrar a dose.');
        }
    };

    const handleSnooze = guard('snooze', async (reminder) => {
        Alert.alert(
            'Adiar lembrete',
            'Por quantos minutos deseja adiar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: '10 min', onPress: () => MedicationReminderService.snoozeReminder(reminder, 10).then(() => Alert.alert('⏱️ Adiado', 'Você será lembrado em 10 minutos.')) },
                { text: '30 min', onPress: () => MedicationReminderService.snoozeReminder(reminder, 30).then(() => Alert.alert('⏱️ Adiado', 'Você será lembrado em 30 minutos.')) },
                { text: '1 hora',  onPress: () => MedicationReminderService.snoozeReminder(reminder, 60).then(() => Alert.alert('⏱️ Adiado', 'Você será lembrado em 1 hora.')) },
            ]
        );
    });

    const handleHistorico = (reminder) => {
        navigation.navigate('MedicationDoseHistory', { reminder });
    };

    const handleEdit = (reminder) => {
        navigation.navigate('MedicationReminderForm', { reminder });
    };

    const handleDelete = (reminder) => {
        Alert.alert(
            'Remover lembrete',
            `Deseja remover o lembrete de "${reminder.medicamentoNome}"? As notificações agendadas serão canceladas.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await MedicationReminderService.remove(reminder.id);
                            setReminders(prev => prev.filter(r => r.id !== reminder.id));
                        } catch {
                            Alert.alert('Erro', 'Não foi possível remover o lembrete.');
                        }
                    },
                },
            ]
        );
    };

    const handleAdd = guard('maxLembretes', () => {
        navigation.navigate('MedicationReminderForm', { perfilId: perfilAtivo?.id, perfilNome: perfilAtivo?.nome });
    }, activeRemindersCount);

    return (
        <AppBackground>
            <StatusBar style="dark" />
            <SafeAreaView style={{ flex: 1 }}>

                {/* Header */}
                <View style={rStyles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={rStyles.backBtn}
                        accessibilityLabel="Voltar"
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H2 style={rStyles.headerTitle}>Lembretes</H2>
                        <Body style={rStyles.headerSub}>Rotina de medicamentos</Body>
                    </View>
                    <TouchableOpacity
                        onPress={handleAdd}
                        style={rStyles.addBtn}
                        accessibilityLabel="Adicionar lembrete"
                    >
                        <NeoIcon name="AddCircle" variant="Bold" size={28} color={CLR.pill} />
                    </TouchableOpacity>
                </View>

                {/* Aviso disclaimer permanente */}
                <View style={rStyles.disclaimerBar}>
                    <NeoIcon name="InfoCircle" variant="Bold" size={14} color={CLR.warning} />
                    <Small style={rStyles.disclaimerBarText}>
                        Assistente de organização — não substitui orientação médica.
                    </Small>
                </View>

                {/* Conteúdo */}
                {loading ? (
                    <View style={rStyles.scroll}>
                        <SkeletonCard lines={3} />
                        <SkeletonCard lines={2} />
                    </View>
                ) : reminders.length === 0 ? (
                    <EmptyState
                        icon="MedicalSquare"
                        title="Nenhum lembrete ainda"
                        description="Toque em + para adicionar seu primeiro lembrete de medicamento."
                        cta={{ label: 'Adicionar lembrete', onPress: handleAdd, color: CLR.pill }}
                    />
                ) : (
                    <ScrollView
                        contentContainerStyle={rStyles.scroll}
                        showsVerticalScrollIndicator={false}
                    >
                        <Eyebrow style={rStyles.eyebrow}>
                            {reminders.length} {reminders.length === 1 ? 'lembrete' : 'lembretes'} cadastrado{reminders.length !== 1 ? 's' : ''}
                        </Eyebrow>

                        {reminders.map(r => (
                            <ReminderCard
                                key={r.id}
                                reminder={r}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onTomei={handleTomei}
                                onSnooze={handleSnooze}
                                onHistorico={handleHistorico}
                            />
                        ))}

                        <ButtonNeo
                            title="Adicionar lembrete"
                            iconName="AddCircle"
                            onPress={handleAdd}
                            type="secondary"
                            style={{ marginTop: Neo.spacing.md }}
                        />

                        {/* Nota de rodapé sobre limitações técnicas */}
                        <NeoCard variant="elevated" style={rStyles.footNote}>
                            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
                                <NeoIcon name="Warning2" variant="Bold" size={14} color={Neo.colors.neutral[500]} />
                                <Small style={rStyles.footNoteText}>
                                    As notificações dependem das permissões e configurações do seu
                                    dispositivo. Podem não funcionar no modo "Não Perturbe" ou com
                                    bateria baixa. Em iOS, o limite é de 64 notificações agendadas.
                                </Small>
                            </View>
                        </NeoCard>
                    </ScrollView>
                )}
            </SafeAreaView>
        </AppBackground>
    );
}

const rStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
    headerTitle: { fontSize: 22, color: Neo.colors.neutral[900], lineHeight: 26 },
    headerSub:   { color: Neo.colors.neutral[500], fontSize: 13 },
    addBtn: { padding: 4 },

    disclaimerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginHorizontal: Neo.spacing.lg,
        marginBottom: Neo.spacing.sm,
        backgroundColor: CLR.warning + '10',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: CLR.warning + '30',
    },
    disclaimerBarText: {
        flex: 1,
        color: '#92400E',
        fontSize: 12,
        lineHeight: 17,
    },

    scroll: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: Neo.layout.scrollBottomFooter || 100,
    },
    eyebrow: { marginBottom: Neo.spacing.sm, color: Neo.colors.neutral[500] },

    card: { marginBottom: Neo.spacing.md },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: Neo.spacing.sm,
    },
    pillBadge: {
        width: 40, height: 40, borderRadius: 12,
        backgroundColor: CLR.pill + '14',
        alignItems: 'center', justifyContent: 'center',
    },
    medName: { fontSize: 16, color: Neo.colors.neutral[900], lineHeight: 21 },
    perfilTag: { color: Neo.colors.neutral[500], marginTop: 2 },

    infoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Neo.spacing.sm },
    infoChip: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        backgroundColor: Neo.colors.neutral[100],
        paddingHorizontal: 10, paddingVertical: 5,
        borderRadius: 999,
    },
    infoChipText: { color: Neo.colors.neutral[600], fontSize: 12 },

    remoteLine: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        marginBottom: Neo.spacing.xs,
    },
    remoteLabel: { color: Neo.colors.neutral[600], flex: 1 },
    remoteBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 999, borderWidth: 1,
    },
    remoteBadgeText: { fontSize: 11, fontWeight: '600' },

    obs: {
        color: Neo.colors.neutral[500],
        fontStyle: 'italic',
        marginBottom: Neo.spacing.sm,
        marginTop: 2,
    },

    actions: {
        flexDirection: 'row',
        gap: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Neo.colors.neutral[200],
        marginTop: 4,
        paddingTop: Neo.spacing.xs,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingVertical: 6,
    },
    actionText: { fontSize: 12, fontWeight: '600' },

    // Fase 3 — ações primárias
    primaryActions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: Neo.spacing.sm,
        marginBottom: 2,
    },
    tomeiBtn: {
        flex: 1,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 6,
        backgroundColor: CLR.success,
        paddingVertical: 10,
        borderRadius: 12,
    },
    tomeiBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
    snoozeBtn: {
        flex: 1,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 6,
        backgroundColor: CLR.warning + '14',
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: CLR.warning + '30',
    },
    snoozeBtnText: { color: CLR.warning, fontWeight: '700', fontSize: 13 },


    footNote: { marginTop: Neo.spacing.sm, marginBottom: Neo.spacing.md },
    footNoteText: {
        color: Neo.colors.neutral[500],
        flex: 1,
        lineHeight: 18,
        fontSize: 12,
    },
});
