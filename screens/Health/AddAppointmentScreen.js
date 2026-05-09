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

export default function AddAppointmentScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();

    const [editingId, setEditingId] = useState(null);
    const [specialty, setSpecialty] = useState('');
    const [doctor, setDoctor] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(primaryProfile?.id || null);

    // Derived state for Pet context
    const selectedProfileData = profiles.find(p => p.id === selectedProfile);
    const isPet = selectedProfileData?.tipo === 'pet' || selectedProfileData?.isPet;

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    // Post-appointment notes
    const [recommendations, setRecommendations] = useState('');
    const [prescriptions, setPrescriptions] = useState('');
    const [referrals, setReferrals] = useState('');
    const [nextAppointment, setNextAppointment] = useState('');

    const specialties = [
        { id: 'cardiologista', label: 'Cardiologista', icon: 'heart' },
        { id: 'ortopedista', label: 'Ortopedista', icon: 'bone' },
        { id: 'neurologista', label: 'Neurologista', icon: 'brain' },
        { id: 'pediatra', label: 'Pediatra', icon: 'baby-carriage' },
        { id: 'geriatra', label: 'Geriatra', icon: 'human-cane' },
        { id: 'urologista', label: 'Urologista', icon: 'water-outline' },
        { id: 'ginecologista', label: 'Ginecologista', icon: 'human-female' },
        { id: 'nutricionista', label: 'Nutricionista', icon: 'food-apple' },
        { id: 'dermatologista', label: 'Dermatologista', icon: 'hand-back-right' },
        { id: 'oftalmologista', label: 'Oftalmologista', icon: 'eye' },
        { id: 'psicologo', label: 'Psicólogo', icon: 'head-heart' },
        { id: 'veterinario', label: 'Veterinário', icon: 'paw' },
        { id: 'outro', label: 'Outro', icon: 'doctor' },
    ];

    React.useEffect(() => {
        if (route.params?.appointmentUrlParams) {
            const a = route.params.appointmentUrlParams;
            setEditingId(a.id);
            setSpecialty(specialties.find(s => s.label === a.name)?.id || 'outro');
            setDoctor(a.doctor || '');
            setSelectedProfile(a.profileId);
            if (a.date) {
                setDate(new Date(a.date));
                setTime(new Date(a.date));
            }
            setLocation(a.location || '');
            setNotes(a.notes || '');
            if (a.postNotes) {
                setRecommendations(a.postNotes.recommendations || '');
                setPrescriptions(a.postNotes.prescriptions || '');
                setReferrals(a.postNotes.referrals || '');
                setNextAppointment(a.postNotes.nextAppointment || '');
            }
            navigation.setParams({ appointmentUrlParams: null });
        }
    }, [route.params?.appointmentUrlParams]);

    const handleSave = async () => {
        if (saving) return; // Prevent double-tap

        try {
            if (!specialty.trim()) {
                alert('Por favor, selecione a especialidade');
                return;
            }

            if (!selectedProfile) {
                alert('Por favor, selecione para quem é a consulta');
                return;
            }

            setSaving(true);

            // Combine date and time
            const appointmentDateTime = new Date(date);
            appointmentDateTime.setHours(time.getHours());
            appointmentDateTime.setMinutes(time.getMinutes());

            const appointment = {
                profileId: selectedProfile,
                specialty: specialty.trim(),
                doctor: doctor.trim(),
                date: appointmentDateTime.toISOString(),
                location: location.trim(),
                notes: notes.trim(),
                name: specialties.find(s => s.id === specialty)?.label || specialty,
                postNotes: {
                    recommendations: recommendations.trim(),
                    prescriptions: prescriptions.trim(),
                    referrals: referrals.trim(),
                    nextAppointment: nextAppointment.trim()
                }
            };

            if (editingId) {
                await HealthService.updateAppointment(editingId, appointment);
            } else {
                await HealthService.saveAppointment(appointment);
            }
            navigation.goBack();
        } catch (e) {
            console.error('Error saving appointment:', e);
            alert('Erro ao salvar consulta. Tente novamente.');
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
                    {editingId ? 'Editar Consulta' : 'Nova Consulta'}
                </H2>
                <TouchableOpacity onPress={handleSave} disabled={saving}>
                    <Body style={{ color: saving ? Neo.colors.neutral[400] : Neo.colors.primary[600], fontWeight: '600' }}>
                        {saving ? 'Salvando...' : 'Salvar'}
                    </Body>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Specialty */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.eSPECIALIDADE', 'ESPECIALIDADE')}</Small>
                    <View style={styles.specialtyGrid}>
                        {specialties.map(spec => (
                            <TouchableOpacity
                                key={spec.id}
                                style={[styles.specialtyCard, specialty === spec.id && styles.specialtyCardActive]}
                                onPress={() => setSpecialty(spec.id)}
                            >
                                <NeoIcon
                                    name={spec.icon}
                                    size={24}
                                    color={specialty === spec.id ? Neo.colors.primary[500] : Neo.colors.neutral[500]}
                                />
                                <Small style={[styles.specialtyLabel, specialty === spec.id && styles.specialtyLabelActive]}>
                                    {spec.label}
                                </Small>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Doctor */}
                <View style={styles.section}>
                    <Small style={styles.label}>{isPet ? 'VETERINÁRIO (OPCIONAL)' : 'MÉDICO (OPCIONAL)'}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder={isPet ? "Ex: Dr. Veterinário" : "Ex: Dr. João Silva"}
                            value={doctor}
                            onChangeText={setDoctor}
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

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
                                    <NeoIcon name="Calendar" size={20} color={Neo.colors.primary[500]} />
                                    <Body style={{ marginLeft: 12 }}>
                                        {date.toLocaleDateString('pt-BR')}
                                    </Body>
                                </View>
                            </NeoCard>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ flex: 1 }}>
                            <NeoCard variant="elevated" style={styles.inputCard}>
                                <View style={styles.dateDisplay}>
                                    <NeoIcon name="Clock" size={20} color={Neo.colors.primary[500]} />
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
                    <Small style={styles.label}>{t('headersFirst.lOCALOPCIONAL', 'LOCAL (OPCIONAL)')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Clínica XYZ, Hospital ABC"
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
                            placeholder="Motivo da consulta, sintomas, etc."
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
                    <Small style={styles.dividerText}>{t('headersFirst.aNOTAESPSCONSULTA', 'ANOTAÇÕES PÓS-CONSULTA')}</Small>
                    <View style={styles.dividerLine} />
                </View>

                {/* Recommendations */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.rECOMENDAES', 'RECOMENDAÇÕES')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Recomendações médicas recebidas..."
                            value={recommendations}
                            onChangeText={setRecommendations}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Prescriptions */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.rECEITAS', 'RECEITAS')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Medicamentos prescritos..."
                            value={prescriptions}
                            onChangeText={setPrescriptions}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Referrals */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.eNCAMINHAMENTOSGUIAS', 'ENCAMINHAMENTOS/GUIAS')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Encaminhamentos para outros especialistas..."
                            value={referrals}
                            onChangeText={setReferrals}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                </View>

                {/* Next Appointment */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.pRXIMORETORNO', 'PRÓXIMO RETORNO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Retornar em 3 meses"
                            value={nextAppointment}
                            onChangeText={setNextAppointment}
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
    specialtyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    specialtyCard: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: 'transparent',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Neo.colors.neutral[200],
    },
    specialtyCardActive: {
        borderColor: Neo.colors.primary[500],
        backgroundColor: Neo.colors.primary[50],
    },
    specialtyLabel: {
        marginTop: 8,
        color: Neo.colors.neutral[600],
        fontSize: 11,
        textAlign: 'center',
    },
    specialtyLabelActive: {
        color: Neo.colors.primary[600],
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
        backgroundColor: Neo.colors.primary[500],
    },
    profileName: {
        fontSize: 12,
        color: Neo.colors.neutral[600],
    },
    profileNameActive: {
        color: Neo.colors.primary[600],
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
