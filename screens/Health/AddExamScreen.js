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

export default function AddExamScreen({ navigation }) {
    const { t } = useTranslation('common');
    const { primaryProfile, profiles } = useProfiles();
    const isDark = useIsDark();

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

    // Ícones iconsax válidos (antes Material Community que não renderizavam)
    const examTypes = [
        // Imagem
        { id: 'ultrassom',         label: 'Ultrassom',         icon: 'Sound',  category: 'Imagem' },
        { id: 'raio_x',            label: 'Raio-X',            icon: 'Scan',   category: 'Imagem' },
        { id: 'ressonancia',       label: 'Ressonância',       icon: 'Cpu',    category: 'Imagem' },
        { id: 'tomografia',        label: 'Tomografia',        icon: 'Scan',   category: 'Imagem' },
        { id: 'mamografia',        label: 'Mamografia',        icon: 'Health', category: 'Imagem' },
        { id: 'ecocardiograma',    label: 'Ecocardiograma',    icon: 'Heart',  category: 'Imagem' },

        // Laboratorial
        { id: 'sangue',            label: 'Sangue',            icon: 'Drop',     category: 'Laboratorial' },
        { id: 'urina',             label: 'Urina',             icon: 'Drop',     category: 'Laboratorial' },
        { id: 'fezes',             label: 'Fezes',             icon: 'Health',   category: 'Laboratorial' },

        // Outros
        { id: 'eletrocardiograma', label: 'Eletrocardiograma', icon: 'Heart',     category: 'Outro' },
        { id: 'endoscopia',        label: 'Endoscopia',        icon: 'Health',    category: 'Outro' },
        { id: 'colonoscopia',      label: 'Colonoscopia',      icon: 'Health',    category: 'Outro' },
        { id: 'outro',             label: 'Outro',             icon: 'Clipboard', category: 'Outro' },
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
                        {t('headersFirst.novoExame', 'Novo exame')}
                    </H1>
                    <Caption style={styles.subtitle}>Imagem ou laboratório</Caption>
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
    categoryLabel: {
        color: Neo.colors.primary[700],
        fontWeight: '800',
        marginBottom: 10,
        letterSpacing: 1.2,
        fontSize: 11,
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
