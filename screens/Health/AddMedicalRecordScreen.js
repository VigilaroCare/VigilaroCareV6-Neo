import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import HealthService from '../../services/HealthService';
import OpenAIService from '../../services/OpenAIService';
import { useProfiles } from '../../contexts/ProfileContext';

// Components
import NeoCard from '../../components/NeoCard';
import { H2, Body, Small } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';

export default function AddMedicalRecordScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { primaryProfile } = useProfiles();

    // Obter categoria sugerida caso tenhamos vindo do componente de Dossiê
    const prefillCategory = route.params?.prefillCategory;

    const [category, setCategory] = useState(prefillCategory || 'alergia');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [shareable, setShareable] = useState(true);

    const categories = [
        { id: 'alergia', label: 'Alergia', icon: 'alert-circle', color: '#FF5252' },
        { id: 'cirurgia', label: 'Cirurgia', icon: 'medical-bag', color: '#FF6F00' },
        { id: 'condicao_cronica', label: 'Condição Crônica', icon: 'heart-pulse', color: '#9C27B0' },
        { id: 'vacina', label: 'Vacina', icon: 'needle', color: '#00BCD4' },
        { id: 'exame', label: 'Exame', icon: 'clipboard-text', color: '#4CAF50' },
        { id: 'antipulga', label: 'Antipulga/Vermifugo', icon: 'bug', color: '#795548', show: primaryProfile?.tipo === 'pet' }
    ].filter(c => c.show !== false);

    const isPet = primaryProfile?.tipo === 'pet';
    const vaccineSuggestions = isPet
        ? ['Antirrábica', 'V8 (Polivalente)', 'V10 (Polivalente)', 'Giárdia', 'Tosse dos Canis', 'Leishmaniose']
        : ['Influenza (Gripe)', 'COVID-19', 'Hepatite B', 'Tétano', 'Tríplice Viral', 'BCG'];

    const [isScanning, setIsScanning] = useState(false);

    const handleSuggestion = (text) => {
        setDescription(text);
    };

    const handleScanVaccine = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão Negada', 'Precisamos da câmera para ler a carteirinha.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.6,
                base64: true
            });

            if (!result.canceled && result.assets && result.assets[0].base64) {
                setIsScanning(true);
                const vaccinesExtracted = await OpenAIService.analyzeVaccineCard(result.assets[0].base64);

                if (vaccinesExtracted && vaccinesExtracted.length > 0) {
                    // Formata os nomes encontrados
                    const descriptionText = vaccinesExtracted.map(v => `${v.title} (${v.description || '1 Dose'})`).join(', ');
                    setDescription(descriptionText);

                    // Se encontrou data válida na primeira vacina
                    if (vaccinesExtracted[0].date && !isNaN(new Date(vaccinesExtracted[0].date))) {
                        setDate(new Date(vaccinesExtracted[0].date));
                    }
                    Alert.alert('Sucesso!', `${vaccinesExtracted.length} dose(s) encontrada(s). Verifique os campos antes de Salvar.`);
                } else {
                    Alert.alert('Ops', 'Não foi possível ler as vacinas na imagem. Tente tirar uma foto melhor iluminada.');
                }
            }
        } catch (e) {
            console.error('Scan Error:', e);
            Alert.alert('Erro', 'Ocorreu uma falha ao contatar a IA.');
        } finally {
            setIsScanning(false);
        }
    };

    const handleSave = async () => {
        try {
            if (!description.trim()) {
                alert('Por favor, descreva o registro médico');
                return;
            }

            const record = {
                profileId: primaryProfile?.id,
                category,
                description: description.trim(),
                date: date.toISOString(),
                shareable
            };

            await HealthService.saveMedicalRecord(record);
            navigation.goBack();
        } catch (e) {
            console.error('Error saving medical record:', e);
            alert('Erro ao salvar registro');
        }
    };

    const selectedCategory = categories.find(c => c.id === category);

    return (
        <AppBackground variant="subtle">
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="CloseSquare" size={28} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <H2 style={{ flex: 1, marginLeft: 16 }}>{t('headersFirst.novoRegistro', 'Novo Registro')}</H2>
                <TouchableOpacity onPress={handleSave}>
                    <Body style={{ color: Neo.colors.primary[600], fontWeight: '600' }}>{t('headersFirst.salvar', 'Salvar')}</Body>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Category Selection - Omitido se a categoria já veio pré-preenchida da tela principal */}
                {!prefillCategory && (
                    <View style={styles.section}>
                        <Small style={styles.label}>{t('headersFirst.cATEGORIA', 'CATEGORIA')}</Small>
                        <View style={styles.categoryGrid}>
                            {categories.map(cat => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[
                                        styles.categoryCard,
                                        category === cat.id && { borderColor: cat.color, backgroundColor: cat.color + '10' }
                                    ]}
                                    onPress={() => setCategory(cat.id)}
                                >
                                    <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                                        <NeoIcon
                                            name={cat.icon}
                                            size={24}
                                            color={cat.color}
                                        />
                                    </View>
                                    <Small style={[styles.categoryLabel, category === cat.id && { color: cat.color, fontWeight: '600' }]}>
                                        {cat.label}
                                    </Small>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Description */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.dESCRIO', 'DESCRIÇÃO')}</Small>
                    <NeoCard variant="elevated" style={styles.inputCard}>
                        <TextInput
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            placeholder={`Descreva ${selectedCategory?.label.toLowerCase()}...`}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            placeholderTextColor={Neo.colors.neutral[400]}
                        />
                    </NeoCard>
                    <Small style={{ color: Neo.colors.neutral[500], marginTop: 8 }}>
                        {t('headersFirst.exAlergiaAPenicilinaCirurgiaDeApendicite', 'Ex: Alergia a penicilina, Cirurgia de apendicite em 2020, etc.')}
                    </Small>

                    {/* Vaccine Suggestions Chips / OCR Button */}
                    {category === 'vacina' && (
                        <View style={{ marginTop: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Small style={{ color: Neo.colors.primary[600] }}>{t('headersFirst.sugestEsRPidas', 'Sugestões Rápidas:')}</Small>

                                <TouchableOpacity
                                    onPress={handleScanVaccine}
                                    disabled={isScanning}
                                    style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isScanning ? Neo.colors.neutral[300] : Neo.colors.primary[600], paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}
                                >
                                    {isScanning ? (
                                        <ActivityIndicator size="small" color={Neo.colors.neutral.white} style={{ marginRight: 6 }} />
                                    ) : (
                                        <NeoIcon name="Camera" size={16} color={Neo.colors.neutral.white} style={{ marginRight: 6 }} />
                                    )}
                                    <Small style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{isScanning ? 'Lendo...' : 'Escanear Caderneta'}</Small>
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                                {vaccineSuggestions.map(vac => (
                                    <TouchableOpacity
                                        key={vac}
                                        onPress={() => handleSuggestion(vac)}
                                        style={{
                                            backgroundColor: Neo.colors.primary[100],
                                            paddingHorizontal: 12,
                                            paddingVertical: 6,
                                            borderRadius: 16,
                                            marginRight: 8,
                                            borderWidth: 1,
                                            borderColor: Neo.colors.primary[200]
                                        }}
                                    >
                                        <Small style={{ color: Neo.colors.primary[700], fontWeight: '600' }}>{vac}</Small>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                {/* Date */}
                <View style={styles.section}>
                    <Small style={styles.label}>{t('headersFirst.dATA', 'DATA')}</Small>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <NeoCard variant="elevated" style={styles.inputCard}>
                            <View style={styles.dateDisplay}>
                                <NeoIcon name="Calendar" size={20} color={Neo.colors.primary[500]} />
                                <Body style={{ marginLeft: 12 }}>
                                    {date.toLocaleDateString('pt-BR')}
                                </Body>
                            </View>
                        </NeoCard>
                    </TouchableOpacity>
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

                {/* Shareable Toggle */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.toggleCard}
                        onPress={() => setShareable(!shareable)}
                    >
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: '600' }}>{t('headersFirst.permitirCompartilhamento', 'Permitir compartilhamento')}</Body>
                            <Small style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                                {t('headersFirst.esteRegistroPoderSerIncluDoNaFichaMDicaC', 'Este registro poderá ser incluído na ficha médica compartilhável')}
                            </Small>
                        </View>
                        <View style={[styles.toggle, shareable && styles.toggleActive]}>
                            <View style={[styles.toggleThumb, shareable && styles.toggleThumbActive]} />
                        </View>
                    </TouchableOpacity>
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
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    categoryCard: {
        width: '47%',
        padding: 16,
        backgroundColor: 'transparent',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Neo.colors.neutral[200],
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryLabel: {
        fontSize: 12,
        color: Neo.colors.neutral[600],
        textAlign: 'center',
    },
    inputCard: {
        padding: 16,
    },
    input: {
        fontSize: 16,
        color: Neo.colors.neutral[900],
        fontFamily: 'System',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'transparent',
        borderRadius: 12,
        gap: 16,
    },
    toggle: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: Neo.colors.neutral[300],
        padding: 2,
        justifyContent: 'center',
    },
    toggleActive: {
        backgroundColor: Neo.colors.primary[500],
    },
    toggleThumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: Neo.colors.neutral.white,
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
});
