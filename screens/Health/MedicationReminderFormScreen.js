/**
 * MedicationReminderFormScreen.js
 * Vigilaro Care V6 Neo
 *
 * Formulário para criar ou editar um lembrete de medicamento.
 * Fluxo obrigatório: disclaimer modal → formulário → salvar.
 * Seção opcional: Cuidador Remoto (SMS/WhatsApp).
 */

import { tx } from '../../utils/txFixo';
import { useState, useEffect, useRef } from "react";
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, TextInput, Modal,
    Alert, Animated, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, H3, Body, Small, Eyebrow } from '../../components/NeoTypography';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import ButtonNeo from '../../components/ButtonNeo';
import AppBackground from '../../components/AppBackground';
import TappablePressable from '../../components/TappablePressable';
import { usePremiumGate } from '../../components/PremiumGate';
import PremiumBadge from '../../components/PremiumBadge';
import MedicationReminderService, { DIAS_SEMANA } from '../../services/MedicationReminderService';

const CLR = {
    pill:    Neo.colors.categoria.ardosia.fill,
    success: '#16A34A',
    warning: '#D97706',
    danger:  '#DC2626',
};

/**
 * CUIDADOR REMOTO — desligado até o envio existir de ponta a ponta.
 *
 * A seção oferecia "Notificar por SMS / WhatsApp" com selo Premium e a
 * promessa de "avisa a pessoa assistida no horário do lembrete". O envio não
 * acontece: `MedicationReminderService.sendRemoteNotification()` existe e não
 * tem nenhum chamador, e não há agendador no backend que receba e execute
 * esses lembretes. O que o toggle fazia era persistir os campos e agendar
 * notificações LOCAIS, que só tocam neste aparelho.
 *
 * Dois problemas, não um: é recurso pago que não entrega, e coleta o telefone
 * de um terceiro (a pessoa assistida) pedindo consentimento para uma mensagem
 * que nunca chega.
 *
 * O código da seção e o do serviço ficam onde estão. Para religar: implementar
 * o agendador no backend, chamar `sendRemoteNotification` no salvamento e
 * trocar esta constante para `true`.
 */
const CUIDADOR_REMOTO_DISPONIVEL = false;

// ─── Componente: Modal de Disclaimer ──────────────────────────────────────────

function DisclaimerModal({ visible, onAccept, onCancel }) {
    const slideAnim = useRef(new Animated.Value(300)).current;
    const fadeAnim  = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim,  { toValue: 1, duration: 220, useNativeDriver: true }),
                Animated.spring(slideAnim, { toValue: 0, tension: 65, friction: 11, useNativeDriver: true }),
            ]).start();
        } else {
            slideAnim.setValue(300);
            fadeAnim.setValue(0);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal transparent animationType="none" visible={visible} onRequestClose={onCancel}>
            <Animated.View style={[dStyles.overlay, { opacity: fadeAnim }]}>
                <Animated.View style={[dStyles.sheet, { transform: [{ translateY: slideAnim }] }]}>
                    {/* Pill handle */}
                    <View style={dStyles.handle} />

                    {/* Ícone */}
                    <View style={dStyles.iconWrap}>
                        <NeoIcon name="MedicalSquare" variant="Bold" size={32} color={CLR.pill} />
                    </View>

                    <H3 style={dStyles.title}>{tx('telas.MedicationReminderFormScreen.lembretesDeMedicamentos', 'Lembretes de Medicamentos')}</H3>

                    {/* Corpo do disclaimer */}
                    <View style={dStyles.body}>
                        <View style={dStyles.item}>
                            <NeoIcon name="TickSquare" variant="Bold" size={16} color={CLR.success} />
                            <Body style={dStyles.itemText}>{tx('telas.MedicationReminderFormScreen.osLembretesSao', 'Os lembretes são')}{' '}
                                <Text style={{ fontWeight: '700' }}>{tx('telas.MedicationReminderFormScreen.configuradosPorVoce', 'configurados por você')}</Text>
                                {' '}{tx('telas.MedicationReminderFormScreen.eFuncionamComoUmaAgendaPessoal', 'e funcionam como uma agenda pessoal no seu celular.')}</Body>
                        </View>
                        <View style={dStyles.item}>
                            <NeoIcon name="Warning2" variant="Bold" size={16} color={CLR.warning} />
                            <Body style={dStyles.itemText}>{tx('telas.MedicationReminderFormScreen.oVigilarocare', 'O VigilaroCare')}{' '}
                                <Text style={{ fontWeight: '700' }}>{tx('telas.MedicationReminderFormScreen.naoEUmSistemaMedico', 'não é um sistema médico')}</Text>
                                {' '}{tx('telas.MedicationReminderFormScreen.eNaoSubstituiAOrientacaoDo', 'e não substitui a orientação do seu médico ou farmacêutico.')}</Body>
                        </View>
                        <View style={dStyles.item}>
                            <NeoIcon name="Mobile" variant="Bold" size={16} color={Neo.colors.neutral[500]} />
                            <Body style={dStyles.itemText}>{tx('telas.MedicationReminderFormScreen.asNotificacoesDependemDas', 'As notificações dependem das')}{' '}
                                <Text style={{ fontWeight: '700' }}>{tx('telas.MedicationReminderFormScreen.permissoesEConfiguracoesDoDispositivo', 'permissões e configurações do dispositivo')}</Text>{tx('telas.MedicationReminderFormScreen.podemNaoFuncionarNoModoNao', '. Podem não funcionar no modo "Não Perturbe" ou com bateria fraca.')}</Body>
                        </View>
                    </View>

                    {/* Nota legal */}
                    <View style={dStyles.legalNote}>
                        <Small style={dStyles.legalText}>{tx('telas.MedicationReminderFormScreen.aoContinuarVoceReconheceQueEste', 'Ao continuar, você reconhece que este recurso é uma ferramenta de organização pessoal e isenta o VigilaroCare de responsabilidade por falhas de notificação decorrentes do dispositivo ou sistema operacional.')}</Small>
                    </View>

                    {/* Botões */}
                    <View style={dStyles.btns}>
                        <TouchableOpacity style={dStyles.btnCancel} onPress={onCancel}>
                            <Small style={{ color: Neo.colors.neutral[600], fontWeight: '600' }}>{tx('telas.MedicationReminderFormScreen.cancelar', 'Cancelar')}</Small>
                        </TouchableOpacity>
                        <TouchableOpacity style={dStyles.btnAccept} onPress={onAccept}>
                            <Small style={{ color: '#FFF', fontWeight: '700' }}>{tx('telas.MedicationReminderFormScreen.entendiEAceito', 'Entendi e aceito')}</Small>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

// ─── Seletor de dias da semana ─────────────────────────────────────────────

function DayPicker({ selected, onChange }) {
    const todos = selected.length === 7 || selected.length === 0;

    const toggleDia = (val) => {
        if (selected.includes(val)) {
            onChange(selected.filter(d => d !== val));
        } else {
            onChange([...selected, val].sort());
        }
    };

    const toggleTodos = () => {
        onChange(todos ? [] : DIAS_SEMANA.map(d => d.value));
    };

    return (
        <View style={fStyles.dayWrap}>
            <TappablePressable
                style={[fStyles.dayChip, todos && fStyles.dayChipActive]}
                onPress={toggleTodos}
            >
                <Small style={[fStyles.dayChipText, todos && fStyles.dayChipTextActive]}>{tx('telas.MedicationReminderFormScreen.todos', 'Todos')}</Small>
            </TappablePressable>
            {DIAS_SEMANA.map(d => {
                const active = selected.includes(d.value);
                return (
                    <TappablePressable
                        key={d.value}
                        style={[fStyles.dayChip, active && fStyles.dayChipActive]}
                        onPress={() => toggleDia(d.value)}
                    >
                        <Small style={[fStyles.dayChipText, active && fStyles.dayChipTextActive]}>
                            {d.label}
                        </Small>
                    </TappablePressable>
                );
            })}
        </View>
    );
}

// ─── Seletor de horários ───────────────────────────────────────────────────

function HorarioList({ horarios, onChange }) {
    const [input, setInput] = useState('');
    const [erro, setErro] = useState('');
    const { guard } = usePremiumGate();

    const validar = (val) => /^([01]?\d|2[0-3]):[0-5]\d$/.test(val);

    const adicionar = guard('maxHorariosPerLembrete', () => {
        const v = input.trim();
        if (!validar(v)) { setErro('Use o formato HH:MM (ex: 08:00)'); return; }
        if (horarios.includes(v)) { setErro(tx('telas.MedicationReminderFormScreen.horarioJaAdicionado', 'Horário já adicionado')); return; }
        onChange([...horarios, v].sort());
        setInput('');
        setErro('');
    }, horarios.length);

    const remover = (h) => onChange(horarios.filter(x => x !== h));

    const formatarDigitacao = (val) => {
        const nums = val.replace(/\D/g, '').slice(0, 4);
        if (nums.length >= 3) return `${nums.slice(0, 2)}:${nums.slice(2)}`;
        return nums;
    };

    return (
        <View style={fStyles.horarioSection}>
            <View style={fStyles.horarioInputRow}>
                <TextInput
                    style={[fStyles.input, fStyles.horarioInput, erro ? fStyles.inputError : null]}
                    value={input}
                    onChangeText={v => { setInput(formatarDigitacao(v)); setErro(''); }}
                    placeholder="08:00"
                    placeholderTextColor={Neo.colors.neutral[400]}
                    keyboardType="number-pad"
                    maxLength={5}
                    returnKeyType="done"
                    onSubmitEditing={adicionar}
                    accessibilityLabel={tx('telas.MedicationReminderFormScreen.adicionarHorario', 'Adicionar horário')}
                />
                <TouchableOpacity style={fStyles.horarioAddBtn} onPress={adicionar}>
                    <NeoIcon name="AddCircle" variant="Bold" size={22} color={CLR.pill} />
                </TouchableOpacity>
            </View>
            {!!erro && <Small style={fStyles.errText}>{erro}</Small>}

            <View style={fStyles.horarioChips}>
                {horarios.map(h => (
                    <View key={h} style={fStyles.horarioChip}>
                        <Small style={fStyles.horarioChipText}>{h}</Small>
                        <TouchableOpacity onPress={() => remover(h)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <NeoIcon name="CloseCircle" variant="Bold" size={14} color={CLR.pill} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

// ─── Tela principal ────────────────────────────────────────────────────────

export default function MedicationReminderFormScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const editing = route.params?.reminder ?? null;
    const perfilIdParam = route.params?.perfilId ?? null;
    const perfilNomeParam = route.params?.perfilNome ?? null;
    const { guard } = usePremiumGate();

    // Form state
    const [medicamentoNome, setMedicamentoNome] = useState(editing?.medicamentoNome ?? '');
    const [observacoes, setObservacoes]         = useState(editing?.observacoes ?? '');
    const [horarios, setHorarios]               = useState(editing?.horarios ?? []);
    const [diasSemana, setDiasSemana]           = useState(editing?.diasSemana ?? DIAS_SEMANA.map(d => d.value));
    const [ativo, setAtivo]                     = useState(editing?.ativo ?? true);

    // Cuidador remoto
    const [remotoAtivo, setRemotoAtivo]                   = useState(editing?.cuidadorRemoto?.ativo ?? false);
    const [destinatarioNome, setDestinatarioNome]         = useState(editing?.cuidadorRemoto?.destinatarioNome ?? '');
    const [destinatarioTel, setDestinatarioTel]           = useState(editing?.cuidadorRemoto?.destinatarioTelefone ?? '');
    const [relacaoCuidador, setRelacaoCuidador]           = useState(editing?.cuidadorRemoto?.relacaoComCuidador ?? '');
    const [canalRemoto, setCanalRemoto]                   = useState(editing?.cuidadorRemoto?.canal ?? 'whatsapp');

    // Disclaimer
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [disclaimerAceitoEm, setDisclaimerAceitoEm] = useState(editing?.disclaimerAceitoEm ?? null);

    const [saving, setSaving] = useState(false);
    const [erroNome, setErroNome] = useState('');
    const [erroHorario, setErroHorario] = useState('');

    // Ao montar: verifica se disclaimer já foi aceito globalmente
    useEffect(() => {
        if (!editing) {
            MedicationReminderService.isDisclaimerAccepted().then(accepted => {
                if (!accepted) setShowDisclaimer(true);
                else setDisclaimerAceitoEm(new Date().toISOString());
            });
        }
    }, []);

    const handleDisclaimerAccept = async () => {
        await MedicationReminderService.acceptDisclaimer();
        const ts = new Date().toISOString();
        setDisclaimerAceitoEm(ts);
        setShowDisclaimer(false);
    };

    const handleDisclaimerCancel = () => {
        setShowDisclaimer(false);
        navigation.goBack();
    };

    const validar = () => {
        let ok = true;
        if (!medicamentoNome.trim()) { setErroNome(tx('telas.MedicationReminderFormScreen.informeNome', 'Informe o nome do medicamento')); ok = false; }
        else setErroNome('');
        if (horarios.length === 0) { setErroHorario(tx('telas.MedicationReminderFormScreen.adicioneHorario', 'Adicione ao menos um horário')); ok = false; }
        else setErroHorario('');
        return ok;
    };

    const handleSave = async () => {
        if (!validar()) return;
        if (!disclaimerAceitoEm) {
            setShowDisclaimer(true);
            return;
        }

        setSaving(true);
        try {
            const payload = {
                ...(editing || {}),
                perfilId: editing?.perfilId ?? perfilIdParam ?? null,
                perfilNome: editing?.perfilNome ?? perfilNomeParam ?? null,
                medicamentoNome: medicamentoNome.trim(),
                observacoes: observacoes.trim(),
                horarios,
                diasSemana,
                ativo,
                disclaimerAceitoEm,
                cuidadorRemoto: remotoAtivo ? {
                    ativo: true,
                    destinatarioNome: destinatarioNome.trim(),
                    destinatarioTelefone: destinatarioTel.trim(),
                    relacaoComCuidador: relacaoCuidador.trim(),
                    canal: canalRemoto,
                    optinStatus: editing?.cuidadorRemoto?.optinStatus ?? 'pendente',
                    optinConfirmadoEm: editing?.cuidadorRemoto?.optinConfirmadoEm ?? null,
                } : null,
            };

            const salvo = await MedicationReminderService.save(payload);

            // O lembrete foi gravado, mas o sistema pode ter recusado os
            // agendamentos. Antes isso passava calado e o usuário ficava com um
            // lembrete "ligado" que nunca avisaria.
            if (salvo?.agendamentoVazio) {
                Alert.alert(
                    'Lembrete salvo, mas sem aviso',
                    tx('telas.MedicationReminderFormScreen.naoFoiPossivelAgendarAsNotificacoes', 'Não foi possível agendar as notificações deste lembrete. Verifique a permissão de notificações do Vigilaro Care nos ajustes do aparelho e edite o lembrete para tentar de novo.')
                );
            } else if (salvo?.agendamentoIncompleto) {
                Alert.alert(
                    tx('telas.MedicationReminderFormScreen.algunsHorariosNaoForamAgendados', 'Alguns horários não foram agendados'),
                    tx('telas.MedicationReminderFormScreen.parteDosAvisosDesteLembreteNao', 'Parte dos avisos deste lembrete não pôde ser agendada. Abra o lembrete e salve novamente para tentar os horários que faltaram.')
                );
            }

            navigation.goBack();
        } catch (e) {
            Alert.alert(tx('telas.MedicationReminderFormScreen.erro', 'Erro'), tx('telas.MedicationReminderFormScreen.naoFoiPossivelSalvarOLembrete', 'Não foi possível salvar o lembrete. Tente novamente.'));
            if (__DEV__) console.error('[MedicationReminderForm] save:', e);
        } finally {
            setSaving(false);
        }
    };

    const canalOptions = [
        { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageText1' },
        { value: 'sms',      label: 'SMS',       icon: 'Sms' },
        { value: 'ambos',    label: tx('telas.MedicationReminderFormScreen.canalAmbos', 'Ambos'),      icon: 'MobileProgramming' },
    ];

    return (
        <AppBackground>
            <StatusBar style="dark" />

            {/* Disclaimer modal — aparece na primeira vez */}
            <DisclaimerModal
                visible={showDisclaimer}
                onAccept={handleDisclaimerAccept}
                onCancel={handleDisclaimerCancel}
            />

            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {/* Header */}
                    <View style={fStyles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={fStyles.backBtn}
                            accessibilityLabel={tx('telas.MedicationReminderFormScreen.voltar', 'Voltar')}
                        >
                            <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                        </TouchableOpacity>
                        <H2 style={fStyles.headerTitle}>
                            {editing ? tx('telas.MedicationReminderFormScreen.editarLembrete', 'Editar lembrete') : tx('telas.MedicationReminderFormScreen.novoLembrete', 'Novo lembrete')}
                        </H2>
                    </View>

                    <ScrollView
                        contentContainerStyle={fStyles.scroll}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* ── Seção: Medicamento ── */}
                        <Eyebrow style={fStyles.eyebrow}>{tx('telas.MedicationReminderFormScreen.medicamento', 'Medicamento')}</Eyebrow>
                        <NeoCard variant="elevated" style={fStyles.card}>
                            <View style={fStyles.fieldWrap}>
                                <Small style={fStyles.label}>{tx('telas.MedicationReminderFormScreen.nomeDoMedicamento', 'Nome do medicamento *')}</Small>
                                <TextInput
                                    style={[fStyles.input, erroNome ? fStyles.inputError : null]}
                                    value={medicamentoNome}
                                    onChangeText={v => { setMedicamentoNome(v); setErroNome(''); }}
                                    placeholder="Ex: Losartana 50mg"
                                    placeholderTextColor={Neo.colors.neutral[400]}
                                    returnKeyType="next"
                                    accessibilityLabel={tx('telas.MedicationReminderFormScreen.nomeDoMedicamento2', 'Nome do medicamento')}
                                />
                                {!!erroNome && <Small style={fStyles.errText}>{erroNome}</Small>}
                            </View>

                            <View style={fStyles.fieldWrap}>
                                <Small style={fStyles.label}>{tx('telas.MedicationReminderFormScreen.observacoesOpcional', 'Observações (opcional)')}</Small>
                                <TextInput
                                    style={[fStyles.input, fStyles.inputMulti]}
                                    value={observacoes}
                                    onChangeText={setObservacoes}
                                    placeholder={tx('telas.MedicationReminderFormScreen.exTomarComAguaAposO', 'Ex: Tomar com água, após o café da manhã')}
                                    placeholderTextColor={Neo.colors.neutral[400]}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                    accessibilityLabel={tx('telas.MedicationReminderFormScreen.observacoes', 'Observações')}
                                />
                            </View>
                        </NeoCard>

                        {/* ── Seção: Horários ── */}
                        <Eyebrow style={fStyles.eyebrow}>{tx('telas.MedicationReminderFormScreen.horarios', 'Horários *')}</Eyebrow>
                        <NeoCard variant="elevated" style={fStyles.card}>
                            <HorarioList horarios={horarios} onChange={setHorarios} />
                            {!!erroHorario && <Small style={[fStyles.errText, { marginTop: 4 }]}>{erroHorario}</Small>}
                        </NeoCard>

                        {/* ── Seção: Dias da semana ── */}
                        <Eyebrow style={fStyles.eyebrow}>{tx('telas.MedicationReminderFormScreen.diasDaSemana', 'Dias da semana')}</Eyebrow>
                        <NeoCard variant="elevated" style={fStyles.card}>
                            <DayPicker selected={diasSemana} onChange={setDiasSemana} />
                        </NeoCard>

                        {/* ── Seção: Cuidador Remoto ── */}
                        {CUIDADOR_REMOTO_DISPONIVEL && <>
                        <Eyebrow style={fStyles.eyebrow}>{tx('telas.MedicationReminderFormScreen.cuidadorRemoto', 'Cuidador ou responsável')}</Eyebrow>
                        <NeoCard variant="elevated" style={fStyles.card}>
                            {/* Toggle de ativação */}
                            <TappablePressable
                                style={fStyles.remotoToggleRow}
                                onPress={guard('cuidadorRemoto', () => setRemotoAtivo(v => !v))}
                            >
                                <View style={fStyles.remotoToggleLeft}>
                                    <NeoIcon name="Wifi" variant={remotoAtivo ? 'Bold' : 'Linear'} size={20} color={remotoAtivo ? CLR.pill : Neo.colors.neutral[500]} />
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                            <Body style={fStyles.remotoToggleLabel}>{tx('telas.MedicationReminderFormScreen.notificarPorSmsWhatsapp', 'Notificar por SMS / WhatsApp')}</Body>
                                            {!remotoAtivo && <PremiumBadge size="sm" />}
                                        </View>
                                        <Small style={fStyles.remotoToggleSub}>{tx('telas.MedicationReminderFormScreen.avisaAPessoaAssistidaNoHorario', 'Avisa a pessoa assistida no horário do lembrete')}</Small>
                                    </View>
                                </View>
                                <View style={[
                                    fStyles.togglePill,
                                    remotoAtivo && fStyles.togglePillOn
                                ]}>
                                    <View style={[fStyles.toggleThumb, remotoAtivo && fStyles.toggleThumbOn]} />
                                </View>
                            </TappablePressable>

                            {/* Campos do cuidador remoto — visíveis só se ativo */}
                            {remotoAtivo && (
                                <View style={fStyles.remotoFields}>
                                    {/* Aviso de opt-in */}
                                    <View style={fStyles.optinWarning}>
                                        <NeoIcon name="InfoCircle" variant="Bold" size={14} color={CLR.pill} />
                                        <Small style={fStyles.optinWarningText}>{tx('telas.MedicationReminderFormScreen.aPessoaAssistidaReceberaUmaMensagem', 'A pessoa assistida receberá uma mensagem pedindo confirmação antes de receber lembretes.')}</Small>
                                    </View>

                                    <View style={fStyles.fieldWrap}>
                                        <Small style={fStyles.label}>{tx('telas.MedicationReminderFormScreen.nomeDaPessoaAssistida', 'Nome da pessoa assistida')}</Small>
                                        <TextInput
                                            style={fStyles.input}
                                            value={destinatarioNome}
                                            onChangeText={setDestinatarioNome}
                                            placeholder={tx('telas.MedicationReminderFormScreen.exJose', 'Ex: José')}
                                            placeholderTextColor={Neo.colors.neutral[400]}
                                            accessibilityLabel={tx('telas.MedicationReminderFormScreen.nomeDaPessoaAssistida2', 'Nome da pessoa assistida')}
                                        />
                                    </View>

                                    <View style={fStyles.fieldWrap}>
                                        <Small style={fStyles.label}>{tx('telas.MedicationReminderFormScreen.telefoneComDdd55', 'Telefone com DDD (+55)')}</Small>
                                        <TextInput
                                            style={fStyles.input}
                                            value={destinatarioTel}
                                            onChangeText={setDestinatarioTel}
                                            placeholder="+5511999999999"
                                            placeholderTextColor={Neo.colors.neutral[400]}
                                            keyboardType="phone-pad"
                                            accessibilityLabel={tx('telas.MedicationReminderFormScreen.telefoneDoAssistido', 'Telefone do assistido')}
                                        />
                                    </View>

                                    <View style={fStyles.fieldWrap}>
                                        <Small style={fStyles.label}>{tx('telas.MedicationReminderFormScreen.suaRelacaoComEssaPessoa', 'Sua relação com essa pessoa')}</Small>
                                        <TextInput
                                            style={fStyles.input}
                                            value={relacaoCuidador}
                                            onChangeText={setRelacaoCuidador}
                                            placeholder={tx('telas.MedicationReminderFormScreen.exMinhaMaeMeuPai', 'Ex: minha mãe, meu pai')}
                                            placeholderTextColor={Neo.colors.neutral[400]}
                                            accessibilityLabel={tx('telas.MedicationReminderFormScreen.relacaoComOAssistido', 'Relação com o assistido')}
                                        />
                                    </View>

                                    <View style={fStyles.fieldWrap}>
                                        <Small style={fStyles.label}>{tx('telas.MedicationReminderFormScreen.canalDeNotificacao', 'Canal de notificação')}</Small>
                                        <View style={fStyles.canalRow}>
                                            {canalOptions.map(opt => (
                                                <TappablePressable
                                                    key={opt.value}
                                                    style={[
                                                        fStyles.canalChip,
                                                        canalRemoto === opt.value && fStyles.canalChipActive,
                                                    ]}
                                                    onPress={() => setCanalRemoto(opt.value)}
                                                >
                                                    <NeoIcon
                                                        name={opt.icon}
                                                        variant={canalRemoto === opt.value ? 'Bold' : 'Linear'}
                                                        size={14}
                                                        color={canalRemoto === opt.value ? '#FFF' : Neo.colors.neutral[600]}
                                                    />
                                                    <Small style={[
                                                        fStyles.canalChipText,
                                                        canalRemoto === opt.value && fStyles.canalChipTextActive,
                                                    ]}>
                                                        {opt.label}
                                                    </Small>
                                                </TappablePressable>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            )}
                        </NeoCard>
                        </>}

                        {/* ── Botão Salvar ── */}
                        <ButtonNeo
                            title={saving ? 'Salvando...' : editing ? tx('telas.MedicationReminderFormScreen.salvarAlteracoes', 'Salvar alterações') : tx('telas.MedicationReminderFormScreen.criarLembrete', 'Criar lembrete')}
                            iconName="TickCircle"
                            onPress={handleSave}
                            type="primary"
                            disabled={saving}
                            style={{ marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.md }}
                        />

                        {/* Nota legal no rodapé */}
                        <Small style={fStyles.legalFooter}>{tx('telas.MedicationReminderFormScreen.esteRecursoEUmAssistenteDe', 'Este recurso é um assistente de organização pessoal e não substitui a orientação do seu médico ou farmacêutico. Consulte sempre um profissional de saúde para dúvidas sobre medicamentos.')}</Small>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AppBackground>
    );
}

// ─── Estilos: Disclaimer ──────────────────────────────────────────────────

const dStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
    },
    handle: {
        width: 40, height: 4, borderRadius: 2,
        backgroundColor: Neo.colors.neutral[300],
        alignSelf: 'center', marginBottom: 20,
    },
    iconWrap: {
        width: 64, height: 64, borderRadius: 20,
        backgroundColor: CLR.pill + '14',
        alignItems: 'center', justifyContent: 'center',
        alignSelf: 'center', marginBottom: 16,
    },
    title: {
        textAlign: 'center', fontSize: 18,
        color: Neo.colors.neutral[900], marginBottom: 20,
    },
    body: { gap: 14, marginBottom: 16 },
    item: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    itemText: { flex: 1, color: Neo.colors.neutral[700], lineHeight: 22, fontSize: 14 },
    legalNote: {
        backgroundColor: Neo.colors.neutral[50],
        borderRadius: 12, padding: 14,
        marginBottom: 20,
        borderWidth: 1, borderColor: Neo.colors.neutral[200],
    },
    legalText: {
        color: Neo.colors.neutral[500], lineHeight: 18, fontSize: 12, textAlign: 'center',
    },
    btns: { flexDirection: 'row', gap: 12 },
    btnCancel: {
        flex: 1, paddingVertical: 14, borderRadius: 14,
        backgroundColor: Neo.colors.neutral[100],
        alignItems: 'center',
    },
    btnAccept: {
        flex: 2, paddingVertical: 14, borderRadius: 14,
        backgroundColor: CLR.pill,
        alignItems: 'center',
    },
});

// ─── Estilos: Formulário ──────────────────────────────────────────────────

const fStyles = StyleSheet.create({
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

    scroll: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 60,
    },
    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    card: { marginBottom: 0 },

    fieldWrap: { marginBottom: Neo.spacing.md },
    label: { color: Neo.colors.neutral[600], marginBottom: 6, fontWeight: '600' },

    input: {
        backgroundColor: Neo.colors.neutral[50],
        borderWidth: 1.5, borderColor: Neo.colors.neutral[200],
        borderRadius: 12,
        paddingHorizontal: 14, paddingVertical: 12,
        fontSize: 15, color: Neo.colors.neutral[900],
        fontFamily: undefined,
    },
    inputError: { borderColor: CLR.danger },
    inputMulti: { minHeight: 80, paddingTop: 12 },
    errText: { color: CLR.danger, marginTop: 4, fontSize: 12 },

    // Horários
    horarioSection: {},
    horarioInputRow: {
        flexDirection: 'row', gap: 10, alignItems: 'center',
        marginBottom: 8,
    },
    horarioInput: { flex: 1 },
    horarioAddBtn: {
        width: 44, height: 44, borderRadius: 12,
        backgroundColor: CLR.pill + '14',
        alignItems: 'center', justifyContent: 'center',
    },
    horarioChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    horarioChip: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: CLR.pill + '14',
        paddingHorizontal: 12, paddingVertical: 7,
        borderRadius: 999, borderWidth: 1, borderColor: CLR.pill + '33',
    },
    horarioChipText: { color: CLR.pill, fontWeight: '700', fontSize: 14 },

    // Dias
    dayWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    dayChip: {
        paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
        borderWidth: 1.5, borderColor: Neo.colors.neutral[200],
        backgroundColor: Neo.colors.neutral[50],
    },
    dayChipActive: { backgroundColor: CLR.pill, borderColor: CLR.pill },
    dayChipText: { color: Neo.colors.neutral[600], fontWeight: '600', fontSize: 13 },
    dayChipTextActive: { color: '#FFF' },

    // Cuidador remoto
    remotoToggleRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    },
    remotoToggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    remotoToggleLabel: { color: Neo.colors.neutral[800], fontWeight: '600', fontSize: 15 },
    remotoToggleSub: { color: Neo.colors.neutral[500], fontSize: 12, marginTop: 1 },

    togglePill: {
        width: 44, height: 24, borderRadius: 12,
        backgroundColor: Neo.colors.neutral[300],
        justifyContent: 'center', paddingHorizontal: 2,
    },
    togglePillOn: { backgroundColor: CLR.pill },
    toggleThumb: {
        width: 20, height: 20, borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2, shadowRadius: 2, elevation: 2,
    },
    toggleThumbOn: { alignSelf: 'flex-end' },

    remotoFields: { marginTop: Neo.spacing.md, paddingTop: Neo.spacing.md, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Neo.colors.neutral[200] },

    optinWarning: {
        flexDirection: 'row', gap: 8, alignItems: 'flex-start',
        backgroundColor: CLR.pill + '0D', borderRadius: 10,
        padding: 12, marginBottom: Neo.spacing.md,
        borderWidth: 1, borderColor: CLR.pill + '25',
    },
    optinWarningText: { flex: 1, color: '#1E3A5F', lineHeight: 18, fontSize: 12 },

    canalRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 4 },
    canalChip: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingHorizontal: 14, paddingVertical: 9,
        borderRadius: 999, borderWidth: 1.5, borderColor: Neo.colors.neutral[200],
        backgroundColor: Neo.colors.neutral[50],
    },
    canalChipActive: { backgroundColor: CLR.pill, borderColor: CLR.pill },
    canalChipText: { color: Neo.colors.neutral[600], fontWeight: '600', fontSize: 13 },
    canalChipTextActive: { color: '#FFF' },

    legalFooter: {
        color: Neo.colors.neutral[400], textAlign: 'center',
        lineHeight: 18, fontSize: 12, marginBottom: 20,
    },
});
