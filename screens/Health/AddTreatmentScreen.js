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

export default function AddTreatmentScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();
    const isDark = useIsDark();

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

    // Ícones Phosphor válidos via NeoIcon (antes eram Ionicons que não renderizavam)
    const treatmentTypes = [
        { id: 'fisioterapia',  label: 'Fisioterapia',  icon: 'Activity' },
        { id: 'hemodialise',   label: 'Hemodiálise',   icon: 'Drop' },
        { id: 'quimioterapia', label: 'Quimioterapia', icon: 'Health' },
        { id: 'acupuntura',    label: 'Acupuntura',    icon: 'Lovely' },
        { id: 'custom',        label: 'Outro',         icon: 'AddCircle' },
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
                        {editingId ? 'Editar tratamento' : 'Novo tratamento'}
                    </H1>
                    <Caption style={styles.subtitle}>Sessão contínua</Caption>
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
        backgroundColor: Neo.colors.primary[600],
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
        borderColor: Neo.colors.primary[500],
        backgroundColor: Neo.colors.primary[500] + '15',
    },
    typeLabel: {
        marginTop: 6,
        color: Neo.colors.neutral[700],
        fontSize: 10.5,
        textAlign: 'center',
        fontWeight: '600',
    },
    typeLabelActive: {
        color: Neo.colors.primary[700],
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
    profileCardActive: {},
    profileAvatar: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    profileAvatarActive: {
        backgroundColor: Neo.colors.primary[600],
        borderColor: Neo.colors.primary[600],
    },
    profileName: {
        fontSize: 11.5,
        color: Neo.colors.neutral[600],
        fontWeight: '600',
    },
    profileNameActive: {
        color: Neo.colors.primary[700],
        fontWeight: '800',
    },
    intervalRow: {
        flexDirection: 'row',
    },
    unitPicker: {
        flexDirection: 'row',
        gap: 6,
    },
    unitOption: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
    },
    unitOptionActive: {
        backgroundColor: Neo.colors.primary[600],
        borderColor: Neo.colors.primary[600],
    },
    unitText: {
        fontSize: 13,
        color: Neo.colors.neutral[700],
        fontWeight: '600',
    },
    unitTextActive: {
        color: '#FFF',
        fontWeight: '800',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
