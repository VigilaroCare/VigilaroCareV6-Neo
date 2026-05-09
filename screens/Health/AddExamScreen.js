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

export default function AddExamScreen({ navigation }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();

    const [examType, setExamType] = useState('');
    const [customName, setCustomName] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(primaryProfile?.id || null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    // Post-exam notes
    const [result, setResult] = useState('');
    const [prescriptions, setPrescriptions] = useState('');
    const [followUp, setFollowUp] = useState('');
    const [instructions, setInstructions] = useState('');

    const examTypes = [
        // Exames de Imagem
        { id: 'ultrassom', label: 'Ultrassom', icon: 'waves', category: 'Imagem' },
        { id: 'raio_x', label: 'Raio-X', icon: 'radiobox-marked', category: 'Imagem' },
        { id: 'ressonancia', label: 'Ressonância', icon: 'magnet', category: 'Imagem' },
        { id: 'tomografia', label: 'Tomografia', icon: 'scan-helper', category: 'Imagem' },
        { id: 'mamografia', label: 'Mamografia', icon: 'human-female', category: 'Imagem' },
        { id: 'ecocardiograma', label: 'Ecocardiograma', icon: 'heart-pulse', category: 'Imagem' },

        // Exames Laboratoriais
        { id: 'sangue', label: 'Exame de Sangue', icon: 'water', category: 'Laboratorial' },
        { id: 'urina', label: 'Exame de Urina', icon: 'beaker', category: 'Laboratorial' },
        { id: 'fezes', label: 'Exame de Fezes', icon: 'test-tube', category: 'Laboratorial' },

        // Outros
        { id: 'eletrocardiograma', label: 'Eletrocardiograma', icon: 'heart-flash', category: 'Outro' },
        { id: 'endoscopia', label: 'Endoscopia', icon: 'stomach', category: 'Outro' },
        { id: 'colonoscopia', label: 'Colonoscopia', icon: 'stomach', category: 'Outro' },
        { id: 'outro', label: 'Outro Exame', icon: 'clipboard-text', category: 'Outro' },
    ];

    const handleSave = async () => {
        if (saving) return; // Prevent double-tap

        try {
            if (!examType.trim()) {
                alert('Por favor, selecione o tipo de exame');
                return;
            }

            if (!selectedProfile) {
                alert('Por favor, selecione para quem é o exame');
                return;
            }

            setSaving(true);

            // Combine date and time
            const examDateTime = new Date(date);
            examDateTime.setHours(time.getHours());
            examDateTime.setMinutes(time.getMinutes());

            const examName = examType === 'outro'
                ? customName.trim()
                : examTypes.find(e => e.id === examType)?.label;

            const procedure = {
                profileId: selectedProfile,
                type: examType,
                name: examName || 'Exame',
                date: examDateTime.toISOString(),
                location: location.trim(),
                notes: notes.trim(),
                isExam: true, // Flag to differentiate from procedures
                postNotes: {
                    result: result.trim(),
                    prescriptions: prescriptions.trim(),
                    followUp: followUp.trim(),
                    instructions: instructions.trim()
                }
            };

            await HealthService.saveProcedure(procedure);
            navigation.goBack();
        } catch (e) {
            console.error('Error saving exam:', e);
            alert('Erro ao salvar exame. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    // Group exams by category
    const groupedExams = examTypes.reduce((acc, exam) => {
        if (!acc[exam.category]) acc[exam.category] = [];
        acc[exam.category].push(exam);
        return acc;
    }, {});

    return (
        <AppBackground variant="subtle">
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="CloseSquare" size={28} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <H2 style={{ flex: 1, marginLeft: 16 }}>{t('headersFirst.novoExame', 'Novo Exame')}</H2>
                <TouchableOpacity onPress={handleSave} disabled={saving}>
                    <Body style={{ color: saving ? Neo.colors.neutral[400] : Neo.colors.primary[600], fontWeight: '600' }}>
                        {saving ? 'Salvando...' : 'Salvar'}
                    </Body>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Exam Types by Category */}
                {Object.entries(groupedExams).map(([category, exams]) => (
                    <View key={category} style={styles.section}>
                        <Small style={styles.categoryLabel}>{category.toUpperCase()}</Small>
                        <View style={styles.typeGrid}>
                            {exams.map(exam => (
                                <TouchableOpacity
                                    key={exam.id}
                                    style={[styles.typeCard, examType === exam.id && styles.typeCardActive]}
                                    onPress={() => setExamType(exam.id)}
                                >
                                    <NeoIcon
                                        name={exam.icon}
                                        size={24}
                                        color={examType === exam.id ? Neo.colors.primary[500] : Neo.colors.neutral[500]}
                                    />
                                    <Small style={[styles.typeLabel, examType === exam.id && styles.typeLabelActive]}>
                                        {exam.label}
                                    </Small>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Custom Name (if "Outro" selected) */}
                {examType === 'outro' && (
                    <View style={styles.section}>
                        <Small style={styles.label}>{t('headersFirst.nOMEDOEXAME', 'NOME DO EXAME')}</Small>
                        <NeoCard variant="elevated" style={styles.inputCard}>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: Holter 24h, Espirometria..."
                                value={customName}
                                onChangeText={setCustomName}
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
                    <Small style={styles.label}>{t('headersFirst.lOCAL', 'LOCAL')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Laboratório ABC, Clínica XYZ"
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
                    <Small style={styles.dividerText}>{t('headersFirst.aNOTAESPSEXAME', 'ANOTAÇÕES PÓS-EXAME')}</Small>
                    <View style={styles.dividerLine} />
                </View>

                {/* Result */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.rESULTADO', 'RESULTADO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            placeholder="Resultado do exame..."
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
                            placeholder="Medicamentos prescritos após o exame..."
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
                            placeholder="Ex: Retornar em 15 dias com resultado"
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
                            placeholder="Cuidados, restrições, etc."
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
    categoryLabel: {
        color: Neo.colors.primary[500],
        fontWeight: '700',
        marginBottom: 12,
        letterSpacing: 0.5,
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
        textAlign: 'center',
    },
    typeLabelActive: {
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
