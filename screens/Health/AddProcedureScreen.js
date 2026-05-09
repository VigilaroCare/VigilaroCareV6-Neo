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

// Components
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';

export default function AddProcedureScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();

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

    const procedureTypes = [
        { id: 'colonoscopia', label: 'Colonoscopia', icon: 'stomach' },
        { id: 'endoscopia', label: 'Endoscopia', icon: 'stomach' },
        { id: 'raio_x', label: 'Raio-X', icon: 'radiobox-marked' },
        { id: 'ultrassom', label: 'Ultrassom', icon: 'waves' },
        { id: 'tomografia', label: 'Tomografia', icon: 'scan-helper' },
        { id: 'ressonancia', label: 'Ressonância', icon: 'magnet' },
        { id: 'exame_sangue', label: 'Exame de Sangue', icon: 'water' },
        { id: 'aplicacao_medicamento', label: 'Aplicação IV', icon: 'needle' },
        { id: 'outro', label: 'Outro', icon: 'medical-bag' },
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
        <AppBackground variant="subtle">
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="CloseSquare" size={28} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <H2 style={{ flex: 1, marginLeft: 16 }}>
                    {editingId ? 'Editar Procedimento' : 'Novo Procedimento'}
                </H2>
                <TouchableOpacity onPress={handleSave} disabled={saving}>
                    <Body style={{ color: saving ? Neo.colors.neutral[400] : Neo.colors.primary[600], fontWeight: '600' }}>
                        {saving ? 'Salvando...' : 'Salvar'}
                    </Body>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

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
                                        name={profile.isPet ? "paw" : "person"}
                                        size={20}
                                        color={selectedProfile === profile.id ? Neo.colors.neutral.white : Neo.colors.neutral[600]}
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
        backgroundColor: Neo.colors.neutral[100],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: Neo.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },
    section: {
        marginTop: 24,
    },
    label: {
        color: Neo.colors.neutral[600],
        fontWeight: '600',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    typeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    typeCard: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: 'transparent',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Neo.colors.neutral[200],
    },
    typeCardActive: {
        borderColor: Neo.colors.feedback.warning,
        backgroundColor: Neo.colors.feedback.warning + '1A',
    },
    typeLabel: {
        marginTop: 8,
        color: Neo.colors.neutral[600],
        fontSize: 11,
        textAlign: 'center',
    },
    typeLabelActive: {
        color: Neo.colors.feedback.warning,
        fontWeight: '600',
    },
    inputCard: {
        padding: 16,
    },
    input: {
        fontSize: 16,
        color: Neo.colors.neutral[900],
        fontFamily: 'System',
    },
    profileScroll: {
        flexDirection: 'row',
        gap: 12,
    },
    profileCard: {
        alignItems: 'center',
        marginRight: 16,
    },
    profileAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Neo.colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    profileAvatarActive: {
        backgroundColor: Neo.colors.feedback.warning,
    },
    profileName: {
        fontSize: 12,
        color: Neo.colors.neutral[600],
    },
    profileNameActive: {
        color: Neo.colors.feedback.warning,
        fontWeight: '600',
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
        marginTop: 32,
        marginBottom: 8,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Neo.colors.neutral[300],
    },
    dividerText: {
        marginHorizontal: 16,
        color: Neo.colors.neutral[500],
        fontWeight: '600',
    },
});
