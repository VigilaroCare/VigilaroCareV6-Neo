import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import HealthService from '../../services/HealthService';
import { useProfiles } from '../../contexts/ProfileContext';
import { useIsDark } from '../../utils/ThemeContext';

// Components
import NeoCard from '../../components/NeoCard';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';

export default function AddProcedureScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();
    const isDark = useIsDark();

    const [editingId, setEditingId] = useState(null);
    const [procedureType, setProcedureType] = useState('');
    const [name, setName] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(primaryProfile?.id || null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    // Post-procedure notes
    const [result, setResult] = useState('');
    const [prescriptions, setPrescriptions] = useState('');
    const [followUp, setFollowUp] = useState('');
    const [instructions, setInstructions] = useState('');

    // Ícones iconsax válidos (antes Material Community que não renderizavam)
    const procedureTypes = [
        { id: 'colonoscopia',           label: 'Colonoscopia',     icon: 'Health' },
        { id: 'endoscopia',             label: 'Endoscopia',       icon: 'Health' },
        { id: 'raio_x',                 label: 'Raio-X',           icon: 'Scan' },
        { id: 'ultrassom',              label: 'Ultrassom',        icon: 'Sound' },
        { id: 'tomografia',             label: 'Tomografia',       icon: 'Scan' },
        { id: 'ressonancia',            label: 'Ressonância',      icon: 'Cpu' },
        { id: 'exame_sangue',           label: 'Exame de sangue',  icon: 'Drop' },
        { id: 'aplicacao_medicamento',  label: 'Aplicação IV',     icon: 'Health' },
        { id: 'outro',                  label: 'Outro',            icon: 'Health' },
    ];

    React.useEffect(() => {
        if (route.params?.procedureUrlParams) {
            const p = route.params.procedureUrlParams;
            setEditingId(p.id);
            setProcedureType(procedureTypes.find(type => type.label === p.name || type.id === p.type)?.id || 'outro');
            setName(p.name || '');
            setSelectedProfile(p.profileId);
            if (p.date) {
                setDate(new Date(p.date));
                setTime(new Date(p.date));
            }
            setLocation(p.location || '');
            setNotes(p.notes || '');
            if (p.postNotes) {
                setResult(p.postNotes.result || '');
                setPrescriptions(p.postNotes.prescriptions || '');
                setFollowUp(p.postNotes.followUp || '');
                setInstructions(p.postNotes.instructions || '');
            }
            navigation.setParams({ procedureUrlParams: null });
        }
    }, [route.params?.procedureUrlParams]);

    const handleSave = async () => {
        if (saving) return; // Prevent double-tap

        try {
            if (!procedureType.trim()) {
                alert('Por favor, selecione o tipo de procedimento');
                return;
            }

            if (!selectedProfile) {
                alert('Por favor, selecione para quem é o procedimento');
                return;
            }

            setSaving(true);

            // Combine date and time
            const procedureDateTime = new Date(date);
            procedureDateTime.setHours(time.getHours());
            procedureDateTime.setMinutes(time.getMinutes());

            const procedure = {
                profileId: selectedProfile,
                type: procedureType,
                name: name.trim() || procedureTypes.find(p => p.id === procedureType)?.label,
                date: procedureDateTime.toISOString(),
                location: location.trim(),
                notes: notes.trim(),
                postNotes: {
                    result: result.trim(),
                    prescriptions: prescriptions.trim(),
                    followUp: followUp.trim(),
                    instructions: instructions.trim()
                }
            };

            if (editingId) {
                await HealthService.updateProcedure(editingId, procedure);
            } else {
                await HealthService.saveProcedure(procedure);
            }
            navigation.goBack();
        } catch (e) {
            console.error('Error saving procedure:', e);
            alert('Erro ao salvar procedimento. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AppBackground>
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* HEADER padronizado */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <H1 style={styles.title}>
                        {editingId ? 'Editar procedimento' : 'Novo procedimento'}
                    </H1>
                    <Caption style={styles.subtitle}>Exame ou intervenção</Caption>
                </View>
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={saving}
                    style={[styles.saveBtn, saving && { opacity: 0.5 }]}
                >
                    <Body style={styles.saveBtnText}>
                        {saving ? 'Salvando…' : 'Salvar'}
                    </Body>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 190 }} showsVerticalScrollIndicator={false}>

                {/* Procedure Type */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.tIPODEPROCEDIMENTO', 'TIPO DE PROCEDIMENTO')}</Small>
                    <View style={styles.typeGrid}>
                        {procedureTypes.map(proc => (
                            <TouchableOpacity
                                key={proc.id}
                                style={[styles.typeCard, procedureType === proc.id && styles.typeCardActive]}
                                onPress={() => setProcedureType(proc.id)}
                            >
                                <NeoIcon
                                    name={proc.icon}
                                    size={24}
                                    color={procedureType === proc.id ? Neo.colors.feedback.warning : Neo.colors.neutral[500]}
                                />
                                <Small style={[styles.typeLabel, procedureType === proc.id && styles.typeLabelActive]}>
                                    {proc.label}
                                </Small>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Custom Name (if "Outro" selected) */}
                {procedureType === 'outro' && (
                    <View style={styles.section}>
                        <Small style={styles.label}>{t('headersFirst.nOMEDOPROCEDIMENTO', 'NOME DO PROCEDIMENTO')}</Small>
                        <NeoCard variant="elevated" style={styles.inputCard}>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: Biópsia, Cateterismo..."
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor={Neo.colors.neutral[400]}
                            />
                        </NeoCard>
                    </View>
                )}

                {/* Profile Selector */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.pARAQUEM', 'PARA QUEM?')}</Small>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileScroll}>
                        {profiles.map(profile => (
                            <TouchableOpacity
                                key={profile.id}
                                style={[styles.profileCard, selectedProfile === profile.id && styles.profileCardActive]}
                                onPress={() => setSelectedProfile(profile.id)}
                            >
                                <View style={[styles.profileAvatar, selectedProfile === profile.id && styles.profileAvatarActive]}>
                                    <NeoIcon
                                        name={profile.isPet ? 'Heart' : 'User'}
                                        size={18}
                                        color={selectedProfile === profile.id ? '#FFF' : Neo.colors.neutral[600]}
                                        variant="Bold"
                                    />
                                </View>
                                <Small style={[styles.profileName, selectedProfile === profile.id && styles.profileNameActive]}>
                                    {profile.nome}
                                </Small>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Date & Time */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.dATAEHORRIO', 'DATA E HORÁRIO')}</Small>
                    <View style={styles.dateTimeRow}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ flex: 1, marginRight: 12 }}>
                            <NeoCard variant="elevated" style={styles.inputCard}>
                                <View style={styles.dateDisplay}>
                                    <NeoIcon name="Calendar" size={20} color={Neo.colors.feedback.warning} />
                                    <Body style={{ marginLeft: 12 }}>
                                        {date.toLocaleDateString('pt-BR')}
                                    </Body>
                                </View>
                            </NeoCard>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ flex: 1 }}>
                            <NeoCard variant="elevated" style={styles.inputCard}>
                                <View style={styles.dateDisplay}>
                                    <NeoIcon name="Clock" size={20} color={Neo.colors.feedback.warning} />
                                    <Body style={{ marginLeft: 12 }}>
                                        {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </Body>
                                </View>
                            </NeoCard>
                        </TouchableOpacity>
                    </View>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setDate(selectedDate);
                        }}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedTime) => {
                            setShowTimePicker(false);
                            if (selectedTime) setTime(selectedTime);
                        }}
                    />
                )}

                {/* Location */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.lOCAL', 'LOCAL')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Hospital ABC, Laboratório XYZ"
                            value={location}
                            onChangeText={setLocation}
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Notes */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.oBSERVAESOPCIONAL', 'OBSERVAÇÕES (OPCIONAL)')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Preparação necessária, jejum, etc."
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Small style={styles.dividerText}>{t('headersFirst.aNOTAESPSPROCEDIMENTO', 'ANOTAÇÕES PÓS-PROCEDIMENTO')}</Small>
                    <View style={styles.dividerLine} />
                </View>

                {/* Result */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.rESULTADO', 'RESULTADO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            placeholder="Resultado do exame/procedimento..."
                            value={result}
                            onChangeText={setResult}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Prescriptions */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.rECEITURIO', 'RECEITUÁRIO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Medicamentos prescritos após o procedimento..."
                            value={prescriptions}
                            onChangeText={setPrescriptions}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Follow-up */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.rETORNO', 'RETORNO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Retornar em 15 dias para revisão"
                            value={followUp}
                            onChangeText={setFollowUp}
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Instructions */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.cONDUTASINSTRUES', 'CONDUTAS/INSTRUÇÕES')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Cuidados pós-procedimento, restrições, etc."
                            value={instructions}
                            onChangeText={setInstructions}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

            </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
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
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
        fontSize: 22,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },
    saveBtn: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 12,
        backgroundColor: Neo.colors.feedback.warning,
    },
    saveBtnText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 13.5,
    },
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },
    section: {
        marginTop: 20,
    },
    label: {
        color: Neo.colors.neutral[600],
        fontWeight: '800',
        marginBottom: 10,
        letterSpacing: 1.2,
        fontSize: 11,
    },
    typeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    typeCard: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: 'rgba(255,255,255,0.65)',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
    },
    typeCardActive: {
        borderColor: Neo.colors.feedback.warning,
        backgroundColor: Neo.colors.feedback.warning + '1A',
    },
    typeLabel: {
        marginTop: 6,
        color: Neo.colors.neutral[700],
        fontSize: 10.5,
        textAlign: 'center',
        fontWeight: '600',
    },
    typeLabelActive: {
        color: Neo.colors.feedback.warning,
        fontWeight: '800',
    },
    inputCard: {
        padding: 14,
        borderRadius: 14,
    },
    input: {
        fontSize: 15,
        color: Neo.colors.neutral[900],
        fontFamily: 'System',
    },
    profileScroll: {
        flexDirection: 'row',
    },
    profileCard: {
        alignItems: 'center',
        marginRight: 14,
    },
    profileAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    profileAvatarActive: {
        backgroundColor: Neo.colors.feedback.warning,
        borderColor: Neo.colors.feedback.warning,
    },
    profileName: {
        fontSize: 11.5,
        color: Neo.colors.neutral[600],
        fontWeight: '600',
    },
    profileNameActive: {
        color: Neo.colors.feedback.warning,
        fontWeight: '800',
    },
    dateTimeRow: {
        flexDirection: 'row',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 4,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
    },
    dividerText: {
        marginHorizontal: 14,
        color: Neo.colors.neutral[600],
        fontWeight: '800',
        fontSize: 10.5,
        letterSpacing: 1,
    },
});
