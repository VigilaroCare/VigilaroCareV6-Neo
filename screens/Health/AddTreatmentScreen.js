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

export default function AddTreatmentScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();

    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('custom');
    const [selectedProfile, setSelectedProfile] = useState(primaryProfile?.id || null);
    const [isPet, setIsPet] = useState(false);
    const [intervalValue, setIntervalValue] = useState('7');
    const [intervalUnit, setIntervalUnit] = useState('days');
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    const treatmentTypes = [
        { id: 'fisioterapia', label: 'Fisioterapia', icon: 'walk' },
        { id: 'hemodialise', label: 'Hemodiálise', icon: 'water' },
        { id: 'quimioterapia', label: 'Quimioterapia', icon: 'medical' },
        { id: 'acupuntura', label: 'Acupuntura', icon: 'fitness' },
        { id: 'custom', label: 'Outro', icon: 'add-circle' },
    ];

    React.useEffect(() => {
        if (route.params?.treatmentUrlParams) {
            const t = route.params.treatmentUrlParams;
            setEditingId(t.id);
            setName(t.name);
            setType(t.type);
            setSelectedProfile(t.profileId);
            setIsPet(t.isPet || false);
            if (t.interval) {
                setIntervalValue(t.interval.value.toString());
                setIntervalUnit(t.interval.unit);
            }
            if (t.startDate) setStartDate(new Date(t.startDate));
            setNotes(t.notes || '');
            navigation.setParams({ treatmentUrlParams: null });
        }
    }, [route.params?.treatmentUrlParams]);

    const handleSave = async () => {
        if (saving) return; // Prevent double-tap

        try {
            if (!name.trim()) {
                alert('Por favor, informe o nome do tratamento');
                return;
            }

            if (!selectedProfile) {
                alert('Por favor, selecione para quem é o tratamento');
                return;
            }

            setSaving(true);

            const treatment = {
                name: name.trim(),
                type,
                profileId: selectedProfile,
                isPet,
                interval: {
                    value: parseInt(intervalValue),
                    unit: intervalUnit
                },
                startDate: startDate.toISOString(),
                notes: notes.trim()
            };

            if (editingId) {
                await HealthService.updateTreatment(editingId, treatment);
            } else {
                await HealthService.saveTreatment(treatment);
            }
            navigation.goBack();
        } catch (e) {
            console.error('Error saving treatment:', e);
            alert('Erro ao salvar tratamento. Tente novamente.');
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
                    {editingId ? 'Editar Tratamento' : 'Novo Tratamento'}
                </H2>
                <TouchableOpacity onPress={handleSave} disabled={saving}>
                    <Body style={{ color: saving ? Neo.colors.neutral[400] : Neo.colors.primary[600], fontWeight: '600' }}>
                        {saving ? 'Salvando...' : 'Salvar'}
                    </Body>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Treatment Type */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.tIPODETRATAMENTO', 'TIPO DE TRATAMENTO')}</Small>
                    <View style={styles.typeGrid}>
                        {treatmentTypes.map(t => (
                            <TouchableOpacity
                                key={t.id}
                                style={[styles.typeCard, type === t.id && styles.typeCardActive]}
                                onPress={() => setType(t.id)}
                            >
                                <NeoIcon
                                    name={t.icon}
                                    size={24}
                                    color={type === t.id ? Neo.colors.primary[600] : Neo.colors.neutral[500]}
                                />
                                <Small style={[styles.typeLabel, type === t.id && styles.typeLabelActive]}>
                                    {t.label}
                                </Small>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Name */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.nOMEDOTRATAMENTO', 'NOME DO TRATAMENTO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Fisioterapia para joelho"
                            value={name}
                            onChangeText={setName}
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
                                onPress={() => {
                                    setSelectedProfile(profile.id);
                                    setIsPet(profile.isPet || false);
                                }}
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

                {/* Interval */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.fREQUNCIA', 'FREQUÊNCIA')}</Small>
                    <View style={styles.intervalRow}>
                        <NeoCard variant="elevated" style={[styles.inputCard, { flex: 1, marginRight: 12 }]}>
                            <TextInput
                                style={styles.input}
                                placeholder="7"
                                value={intervalValue}
                                onChangeText={setIntervalValue}
                                keyboardType="number-pad"
                                placeholderTextColor={Neo.colors.neutral[400]}
                            />
                        </NeoCard>

                        <NeoCard variant="elevated" style={[styles.inputCard, { flex: 2 }]}>
                            <View style={styles.unitPicker}>
                                {['days', 'weeks', 'months'].map(unit => (
                                    <TouchableOpacity
                                        key={unit}
                                        style={[styles.unitOption, intervalUnit === unit && styles.unitOptionActive]}
                                        onPress={() => setIntervalUnit(unit)}
                                    >
                                        <Small style={[styles.unitText, intervalUnit === unit && styles.unitTextActive]}>
                                            {unit === 'days' ? 'Dias' : unit === 'weeks' ? 'Semanas' : 'Meses'}
                                        </Small>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </NeoCard>
                    </View>
                </View>

                {/* Start Date */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.dATADEINCIO', 'DATA DE INÍCIO')}</Small>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <NeoCard variant="elevated" style={styles.inputCard}>
                            <View style={styles.dateDisplay}>
                                <NeoIcon name="Calendar" size={20} color={Neo.colors.primary[500]} />
                                <Body style={{ marginLeft: 12 }}>
                                    {startDate.toLocaleDateString('pt-BR')}
                                </Body>
                            </View>
                        </NeoCard>
                    </TouchableOpacity>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setStartDate(selectedDate);
                        }}
                    />
                )}

                {/* Notes */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.oBSERVAESOPCIONAL', 'OBSERVAÇÕES (OPCIONAL)')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                            placeholder="Adicione observações sobre o tratamento..."
                            value={notes}
                            onChangeText={setNotes}
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
        borderColor: Neo.colors.primary[500],
        backgroundColor: Neo.colors.primary[50],
    },
    typeLabel: {
        marginTop: 8,
        color: Neo.colors.neutral[600],
        fontSize: 11,
    },
    typeLabelActive: {
        color: Neo.colors.primary[700],
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
    profileCardActive: {
        // Active state handled by avatar
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
        color: Neo.colors.primary[700],
        fontWeight: '600',
    },
    intervalRow: {
        flexDirection: 'row',
    },
    unitPicker: {
        flexDirection: 'row',
        gap: 8,
    },
    unitOption: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: Neo.colors.neutral[100],
    },
    unitOptionActive: {
        backgroundColor: Neo.colors.primary[500],
    },
    unitText: {
        fontSize: 14,
        color: Neo.colors.neutral[600],
    },
    unitTextActive: {
        color: Neo.colors.neutral.white,
        fontWeight: '600',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
