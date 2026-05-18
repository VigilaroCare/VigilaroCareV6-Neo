import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View, ScrollView, TouchableOpacity, StyleSheet, TextInput,
  Platform, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import HealthService from '../../services/HealthService';
import OpenAIService from '../../services/OpenAIService';
import { useProfiles } from '../../contexts/ProfileContext';
import { useIsDark } from '../../utils/ThemeContext';

// Components
import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';

export default function AddMedicalRecordScreen({ route, navigation }) {
  const { t } = useTranslation('common');
  const isDark = useIsDark();
  const { primaryProfile } = useProfiles();

  const prefillCategory = route.params?.prefillCategory;

  const [category, setCategory] = useState(prefillCategory || 'alergia');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [shareable, setShareable] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  // Ícones iconsax válidos (antes Material Community que não renderizavam)
  const categories = [
    { id: 'alergia',         label: 'Alergia',           icon: 'DangerCircle', color: '#FF5252' },
    { id: 'cirurgia',        label: 'Cirurgia',          icon: 'Health',       color: '#FF6F00' },
    { id: 'condicao_cronica',label: 'Condição crônica',  icon: 'Heart',        color: '#9C27B0' },
    { id: 'vacina',          label: 'Vacina',            icon: 'ShieldTick',   color: '#00BCD4' },
    { id: 'exame',           label: 'Exame',             icon: 'Clipboard',    color: '#4CAF50' },
    { id: 'antipulga',       label: 'Antipulga/Vermífugo', icon: 'Lovely',     color: '#795548', show: primaryProfile?.tipo === 'pet' },
  ].filter(c => c.show !== false);

  const isPet = primaryProfile?.tipo === 'pet';
  const vaccineSuggestions = isPet
    ? ['Antirrábica', 'V8 (Polivalente)', 'V10 (Polivalente)', 'Giárdia', 'Tosse dos canis', 'Leishmaniose']
    : ['Influenza (gripe)', 'COVID-19', 'Hepatite B', 'Tétano', 'Tríplice viral', 'BCG'];

  const handleSuggestion = (text) => setDescription(text);

  const handleScanVaccine = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da câmera para ler a carteirinha.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.6,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].base64) {
        setIsScanning(true);
        const vaccinesExtracted = await OpenAIService.analyzeVaccineCard(result.assets[0].base64);

        if (vaccinesExtracted && vaccinesExtracted.length > 0) {
          const descriptionText = vaccinesExtracted.map(v => `${v.title} (${v.description || '1 dose'})`).join(', ');
          setDescription(descriptionText);

          if (vaccinesExtracted[0].date && !isNaN(new Date(vaccinesExtracted[0].date))) {
            setDate(new Date(vaccinesExtracted[0].date));
          }
          Alert.alert('Sucesso', `${vaccinesExtracted.length} dose(s) encontrada(s). Confira antes de salvar.`);
        } else {
          Alert.alert('Atenção', 'Não foi possível ler as vacinas. Tente uma foto melhor iluminada.');
        }
      }
    } catch (e) {
      if (__DEV__) console.error('Scan Error:', e);
      Alert.alert('Erro', 'Não foi possível processar a imagem.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!description.trim()) {
        Alert.alert('Atenção', 'Por favor, descreva o registro médico.');
        return;
      }

      const record = {
        profileId: primaryProfile?.id,
        category,
        description: description.trim(),
        date: date.toISOString(),
        shareable,
      };

      await HealthService.saveMedicalRecord(record);
      navigation.goBack();
    } catch (e) {
      if (__DEV__) console.error('Error saving medical record:', e);
      Alert.alert('Erro', 'Não foi possível salvar o registro.');
    }
  };

  const selectedCategory = categories.find(c => c.id === category);

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* HEADER padronizado */}
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <H1 style={s.title}>
              {t('headersFirst.novoRegistro', 'Novo registro')}
            </H1>
            <Caption style={s.subtitle}>Histórico médico</Caption>
          </View>
          <TouchableOpacity
            onPress={handleSave}
            style={s.saveBtn}
          >
            <Body style={s.saveBtnText}>
              {t('headersFirst.salvar', 'Salvar')}
            </Body>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={s.content}
          contentContainerStyle={{ paddingBottom: 190 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Categorias */}
          {!prefillCategory && (
            <View style={s.section}>
              <Small style={s.label}>{t('headersFirst.cATEGORIA', 'CATEGORIA')}</Small>
              <View style={s.categoryGrid}>
                {categories.map(cat => {
                  const isActive = category === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        s.categoryCard,
                        isActive && { borderColor: cat.color, backgroundColor: cat.color + '14' },
                      ]}
                      onPress={() => setCategory(cat.id)}
                      activeOpacity={0.85}
                    >
                      <View style={[s.categoryIcon, { backgroundColor: cat.color + '24' }]}>
                        <NeoIcon name={cat.icon} size={20} color={cat.color} variant="Bold" />
                      </View>
                      <Small style={[s.categoryLabel, isActive && { color: cat.color, fontWeight: '800' }]}>
                        {cat.label}
                      </Small>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Descrição */}
          <View style={s.section}>
            <Small style={s.label}>{t('headersFirst.dESCRIO', 'DESCRIÇÃO')}</Small>
            <NeoCard variant="elevated" style={s.inputCard}>
              <TextInput
                style={[s.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder={`Descreva ${selectedCategory?.label.toLowerCase()}…`}
                value={description}
                onChangeText={setDescription}
                multiline
                placeholderTextColor={Neo.colors.neutral[500]}
              />
            </NeoCard>
            <Small style={s.hint}>
              {t('headersFirst.exAlergiaAPenicilinaCirurgiaDeApendicite', 'Ex: Alergia a penicilina, cirurgia de apendicite em 2020, etc.')}
            </Small>

            {/* Vacinas: sugestões + scan caderneta */}
            {category === 'vacina' && (
              <View style={{ marginTop: 14 }}>
                <View style={s.vaccineRow}>
                  <Small style={s.vaccineLabel}>
                    {t('headersFirst.sugestEsRPidas', 'Sugestões rápidas')}
                  </Small>

                  <TouchableOpacity
                    onPress={handleScanVaccine}
                    disabled={isScanning}
                    style={[s.scanBtn, isScanning && { opacity: 0.5 }]}
                    activeOpacity={0.85}
                  >
                    {isScanning ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <NeoIcon name="Camera" size={14} color="#FFF" variant="Bold" />
                    )}
                    <Small style={s.scanBtnText}>
                      {isScanning ? 'Lendo…' : 'Escanear caderneta'}
                    </Small>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
                >
                  {vaccineSuggestions.map(vac => (
                    <TouchableOpacity
                      key={vac}
                      onPress={() => handleSuggestion(vac)}
                      style={s.suggestionChip}
                      activeOpacity={0.85}
                    >
                      <Small style={s.suggestionChipText}>{vac}</Small>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Data */}
          <View style={s.section}>
            <Small style={s.label}>{t('headersFirst.dATA', 'DATA')}</Small>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.85}>
              <NeoCard variant="elevated" style={s.inputCard}>
                <View style={s.dateDisplay}>
                  <NeoIcon name="Calendar" size={18} color={Neo.colors.primary[600]} variant="Bold" />
                  <Body style={{ marginLeft: 10 }}>
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

          {/* Toggle compartilhamento */}
          <View style={s.section}>
            <NeoCard variant="elevated" style={s.toggleCard}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 4 }}
                onPress={() => setShareable(!shareable)}
                activeOpacity={0.85}
              >
                <View style={{ flex: 1 }}>
                  <Body style={{ fontWeight: '700', fontSize: 14.5 }}>
                    {t('headersFirst.permitirCompartilhamento', 'Permitir compartilhamento')}
                  </Body>
                  <Small style={s.toggleSubtext}>
                    {t('headersFirst.esteRegistroPoderSerIncluDoNaFichaMDicaC', 'Este registro poderá ser incluído na ficha médica compartilhável.')}
                  </Small>
                </View>
                <View style={[s.toggle, shareable && s.toggleActive]}>
                  <View style={[s.toggleThumb, shareable && s.toggleThumbActive]} />
                </View>
              </TouchableOpacity>
            </NeoCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Header
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

  // Content
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

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '47.5%',
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: Neo.colors.neutral[700],
    textAlign: 'center',
    fontWeight: '600',
  },

  // Input
  inputCard: {
    padding: 14,
    borderRadius: 14,
  },
  input: {
    fontSize: 15,
    color: Neo.colors.neutral[900],
    fontFamily: 'System',
  },
  hint: {
    color: Neo.colors.neutral[600],
    marginTop: 6,
    fontSize: 11.5,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Vaccine row
  vaccineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vaccineLabel: {
    color: Neo.colors.neutral[700],
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Neo.colors.primary[600],
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },
  scanBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 11.5,
    letterSpacing: 0.2,
  },
  suggestionChip: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Neo.colors.primary[500] + '40',
  },
  suggestionChipText: {
    color: Neo.colors.primary[700],
    fontWeight: '700',
    fontSize: 12,
  },

  // Toggle
  toggleCard: {
    padding: 12,
    borderRadius: 14,
  },
  toggleSubtext: {
    color: Neo.colors.neutral[600],
    marginTop: 3,
    fontSize: 11.5,
    lineHeight: 16,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.12)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: Neo.colors.primary[600],
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});
