
import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    Modal,
    Platform,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import { H1, H2, H3, Body, Small, Caption } from '../components/NeoTypography';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import MedicationService from '../services/MedicationService';
import VisionService from '../services/VisionService';
import ProfileService from '../services/ProfileService'; // Para listar quem toma
import DoseConfirmationModal from '../components/DoseConfirmationModal';

export default function MedicationSchedulerScreen({ navigation, route }) {
    const { t } = useTranslation();
    const [meds, setMeds] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('8'); // Horas
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [nextDose, setNextDose] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false); // Novo Picker
    const [stockQuantity, setStockQuantity] = useState(''); // Novo Campo Estoque
    const [stockUnit, setStockUnit] = useState('comprimidos'); // Novo Campo Unidade
    // Educational Fields
    const [indication, setIndication] = useState('');
    const [importance, setImportance] = useState('');
    const [implications, setImplications] = useState('');
    const [isRigidSchedule, setIsRigidSchedule] = useState(false);

    const [photo, setPhoto] = useState(null);
    const [prescriptionPhoto, setPrescriptionPhoto] = useState(null);
    const [viewPrescription, setViewPrescription] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    const [editingId, setEditingId] = useState(null); // ID em edição

    // Dose Confirmation Modal State
    const [doseConfirmVisible, setDoseConfirmVisible] = useState(false);
    const [doseConfirmMed, setDoseConfirmMed] = useState(null);

    // Functions restored below

    useFocusEffect(
        useCallback(() => {
            loadData();
            // Check for Auto-Open param
            if (route.params?.autoOpen) {
                resetForm();
                setModalVisible(true);
                navigation.setParams({ autoOpen: null });
            }
            // Check for edit param
            if (route.params?.medicamentoUrlParams) {
                handleEdit(route.params.medicamentoUrlParams);
                navigation.setParams({ medicamentoUrlParams: null });
            }
        }, [route.params])
    );

    const loadData = async () => {
        const m = await MedicationService.getMedications();
        // Ordenar por data da próxima dose
        m.sort((a, b) => new Date(a.nextDoseDate) - new Date(b.nextDoseDate));
        setMeds(m);

        const p = await ProfileService.getPerfis();
        setProfiles(p);
        if (p.length > 0 && !selectedProfile) setSelectedProfile(p[0].id);
    };

    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchCameraAsync({
                quality: 0.7,
                allowsEditing: true,
                // aspect: [4, 3], // REMOVED: Freeform cropping logic
                base64: true, // Need base64 for Vision AI
            });
            if (!result.canceled) {
                setPhoto(result.assets[0].uri);

                // Intelligent OCR
                if (result.assets[0].base64) {
                    setAnalyzing(true);
                    try {
                        const analysis = await VisionService.analyzeMedication(result.assets[0].base64);
                        if (analysis) {
                            if (analysis.name) setName(analysis.name);
                            if (analysis.dosage) setDosage(analysis.dosage);
                            Alert.alert('Leitura Inteligente', `Identificado:\n${analysis.name || ''} ${analysis.dosage || ''}`);
                        }
                    } catch (e) {
                        console.log("Medication OCR Error", e);
                    } finally {
                        setAnalyzing(false);
                    }
                }
            }
        } else {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para fotografar o remédio.');
        }
    };

    const handleTakePrescription = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                quality: 0.8,
                allowsEditing: false, // Documento geralmente não precisa de crop quadrado
            });
            if (!result.canceled) {
                setPrescriptionPhoto(result.assets[0].uri);
            }
        } else {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para fotografar a receita.');
        }
    };

    const handleSave = async () => {
        if (!name || !dosage || !selectedProfile) {
            Alert.alert('Preencha tudo', 'Nome, dosagem e perfil são obrigatórios.');
            return;
        }

        try {
            // Persistir fotos antes de salvar o objeto
            const persistedPhoto = await ProfileService.persistImage(photo, 'med');
            const persistedPrescription = await ProfileService.persistImage(prescriptionPhoto, 'recipe');

            const medData = {
                id: editingId || Date.now().toString(),
                profileId: selectedProfile,
                name,
                dosage,
                frequencyHours: parseInt(frequency, 10),
                nextDoseDate: nextDose.toISOString(),
                photoUri: persistedPhoto,
                prescriptionUri: persistedPrescription,
                history: [],
                stockQuantity: parseInt(stockQuantity, 10) || null,
                stockUnit: stockUnit,
                indication,
                importance,
                implications,
                isRigidSchedule
            };

            if (editingId) {
                await MedicationService.updateMedication(medData);
                Alert.alert('Atualizado', 'Informações do medicamento corrigidas.');
            } else {
                await MedicationService.addMedication(medData);
                Alert.alert('Sucesso', 'Medicamento agendado com alertas de 15min e 5min.');
            }

            setModalVisible(false);
            resetForm();
            loadData();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar.');
        }
    };

    const handleEdit = (med) => {
        setEditingId(med.id);
        setName(med.name);
        setDosage(med.dosage);
        setFrequency(med.frequencyHours.toString());
        setSelectedProfile(med.profileId);
        setNextDose(new Date(med.nextDoseDate));
        setStockQuantity(med.stockQuantity ? med.stockQuantity.toString() : '');
        setStockUnit(med.stockUnit || 'comprimidos');
        setIndication(med.indication || '');
        setImportance(med.importance || '');
        setImplications(med.implications || '');
        setIsRigidSchedule(med.isRigidSchedule || false);
        setPhoto(ProfileService.resolveImageUri(med.photoUri));
        setPrescriptionPhoto(ProfileService.resolveImageUri(med.prescriptionUri));

        setModalVisible(true);
    };

    // Abre o modal de confirmação de dose em vez de confirmar direto
    const openDoseConfirmation = (med) => {
        setDoseConfirmMed(med);
        setDoseConfirmVisible(true);
    };

    // Callback: tomou no horário
    const handleConfirmOnTime = async () => {
        if (!doseConfirmMed) return;
        try {
            await MedicationService.markAsTaken(doseConfirmMed.id);
            Alert.alert(
                t('doseConfirm.successTitle', 'Registrado!'),
                t('doseConfirm.successOnTime', 'Dose confirmada no horário. Próxima dose agendada.')
            );
            loadData();
        } catch (e) {
            console.error(e);
        }
    };

    // Callback: tomou com atraso
    const handleConfirmDelay = async ({ delayMinutes, nextDoseDate }) => {
        if (!doseConfirmMed) return;
        try {
            await MedicationService.markAsTakenWithDelay(
                doseConfirmMed.id,
                delayMinutes,
                nextDoseDate
            );
            Alert.alert(
                t('doseConfirm.successTitle', 'Registrado!'),
                t('doseConfirm.successDelay', 'Dose registrada com atraso. Próxima dose recalculada.')
            );
            loadData();
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (medId) => {
        Alert.alert('Excluir?', 'Isso cancelará todos os lembretes deste remédio.', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    await MedicationService.deleteMedication(medId);
                    loadData();
                }
            }
        ]);
    };

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setDosage('');
        setFrequency('8'); // Reset default
        setPhoto(null);
        setPrescriptionPhoto(null);
        setNextDose(new Date());
        setNextDose(new Date());
        setStockQuantity('');
        setIndication('');
        setImportance('');
        setImplications('');
        setIsRigidSchedule(false);
    };

    const renderMedCard = (med) => {
        const now = new Date();
        const doseDate = new Date(med.nextDoseDate);
        const isOverdue = doseDate < now;
        const profile = profiles.find(p => p.id === med.profileId);

        return (
            <View key={med.id} style={[styles.card, isOverdue && styles.cardOverdue]}>
                <View style={styles.cardHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {med.photoUri ? (
                            <Image source={{ uri: ProfileService.resolveImageUri(med.photoUri) }} style={styles.medImage} />
                        ) : (
                            <View style={styles.medIconBox}>
                                <NeoIcon name="Health" size={24} color={Neo.colors.primary[500]} />
                            </View>
                        )}
                        <View>
                            <Text style={[styles.medName, isOverdue && { color: Neo.colors.error }]}>{med.name}</Text>
                            <Text style={styles.medDetail}>{med.dosage} • {profile?.nome}</Text>
                            {med.stockQuantity != null && (
                                <Text style={{ fontSize: 12, color: med.stockQuantity <= 5 ? Neo.colors.warning : Neo.colors.neutral[500], fontWeight: med.stockQuantity <= 5 ? 'bold' : 'normal' }}>
                                    Estoque: {med.stockQuantity} {med.stockUnit || 'unid.'}
                                </Text>
                            )}
                        </View>
                    </View>
                    {isOverdue && <NeoIcon name="InfoCircle" size={24} color={Neo.colors.error} />}
                </View>

                <View style={styles.cardSchedule}>
                    <Text style={styles.scheduleText}>
                        {isOverdue ? 'ATRASADO DESDE:' : 'Próxima dose:'}
                        <Text style={{ fontWeight: 'bold' }}> {doseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        {/* Mostra dia se não for hoje */}
                        {doseDate.getDate() !== now.getDate() && ` de ${doseDate.getDate()}/${doseDate.getMonth() + 1}`}
                    </Text>
                    <Text style={styles.freqBadge}>{med.frequencyHours}h em {med.frequencyHours}h</Text>
                </View>

                {/* Educational Info - Premium Feature */}
                {(med.indication || med.importance || med.implications) && (
                    <View style={styles.eduBox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[200], paddingBottom: 4 }}>
                            <NeoIcon name="LampOn" size={16} color={Neo.colors.primary[600]} />
                            <Text style={{ fontWeight: 'bold', color: Neo.colors.primary[600], marginLeft: 4, fontSize: 12 }}>{t('headersFirst.gUIADEUSO', 'GUIA DE USO')}</Text>
                        </View>

                        {med.indication ? (
                            <View style={{ marginBottom: 4 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: Neo.colors.neutral[600] }}>{t('headersFirst.paraQueServe', 'Para que serve:')}</Text>
                                <Text style={styles.eduText}>{med.indication}</Text>
                            </View>
                        ) : null}

                        {med.importance ? (
                            <View style={{ marginBottom: 4 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: Neo.colors.neutral[600] }}>{t('headersFirst.importNcia', 'Importância:')}</Text>
                                <Text style={styles.eduText}>{med.importance}</Text>
                            </View>
                        ) : null}

                        {med.implications ? (
                            <View style={{ marginTop: 2 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: Neo.colors.error }}>{t('headersFirst.seNOTomar', 'Se não tomar:')}</Text>
                                <Text style={[styles.eduText, { color: Neo.colors.error }]}>{med.implications}</Text>
                            </View>
                        ) : null}
                    </View>
                )}

                {/* Botões de Ação Extras */}
                {med.prescriptionUri && (
                    <TouchableOpacity
                        style={styles.prescriptionButton}
                        onPress={() => setViewPrescription(ProfileService.resolveImageUri(med.prescriptionUri))}
                    >
                        <NeoIcon name="Document" size={20} color={Neo.colors.primary[500]} />
                        <Text style={styles.prescriptionText}>{t('headersFirst.verReceitaDigital', 'Ver Receita Digital')}</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.actionButton, isOverdue ? styles.actionOverdue : styles.actionNormal]}
                    onPress={() => openDoseConfirmation(med)}
                >
                    <NeoIcon name="TickCircle" size={20} color={Neo.colors.neutral.white} />
                    <Text style={styles.actionText}>{isOverdue ? t('doseConfirm.takeNow', 'TOMAR AGORA') : t('doseConfirm.confirmDoseBtn', 'Confirmar Tomada')}</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 24 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleEdit(med)}>
                        <NeoIcon name="Edit2" size={16} color={Neo.colors.primary[600]} />
                        <Text style={{ color: Neo.colors.primary[600], fontSize: 12, marginLeft: 4 }}>{t('headersFirst.editar', 'Editar')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleDelete(med.id)}>
                        <NeoIcon name="Trash" size={16} color={Neo.colors.neutral[400]} />
                        <Text style={{ color: Neo.colors.neutral[400], fontSize: 12, marginLeft: 4 }}>{t('headersFirst.remover', 'Remover')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
      <AppBackground>
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <H1 style={styles.headerTitle}>{t('medications.title', 'Medicamentos')}</H1>
                    <Caption style={styles.headerSubtitle}>{meds.length} {meds.length === 1 ? 'remédio agendado' : 'remédios agendados'}</Caption>
                </View>
                <TouchableOpacity
                    onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); resetForm(); setModalVisible(true); }}
                    style={styles.addHeaderBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <NeoIcon name="Add" size={22} color="#FFF" variant="Bold" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {meds.length === 0 ? (
                    <View style={styles.emptyState}>
                        <NeoIcon name="Health" size={64} color={Neo.colors.neutral[200]} />
                        <Text style={styles.emptyText}>{t('headersFirst.nenhumMedicamentoComHorRioDefinidoConfig', 'Nenhum medicamento com horário definido. Configure agendamentos para garantir adesão ao tratamento.')}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => { resetForm(); setModalVisible(true); }}>
                            <Text style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{t('headersFirst.adicionarRemDio', 'Adicionar Remédio')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    meds.map(renderMedCard)
                )}
            </ScrollView>

            {/* MODAL DE CADASTRO */}
            <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
                <SafeAreaView style={{ flex: 1, backgroundColor: Neo.colors.neutral.white }}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{editingId ? 'Editar Medicamento' : 'Novo Medicamento'}</Text>
                        <TouchableOpacity onPress={() => { resetForm(); setModalVisible(false); }}>
                            <NeoIcon name="CloseSquare" size={24} color={Neo.colors.neutral[900]} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={{ padding: 20 }}>

                        {/* Foto */}
                        <TouchableOpacity style={styles.photoBox} onPress={handleTakePhoto}>
                            {photo ? (
                                <Image source={{ uri: ProfileService.resolveImageUri(photo) }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                            ) : (
                                <>
                                    <NeoIcon name="Camera" size={32} color={Neo.colors.primary[500]} />
                                    <Text style={{ color: Neo.colors.neutral[500], marginTop: 8 }}>{t('headersFirst.fotografarCaixaRemDio', 'Fotografar Caixa/Remédio')}</Text>
                                    <Text style={{ fontSize: 10, color: Neo.colors.neutral[400] }}>{t('headersFirst.SeguranAVisual', '(Segurança Visual)')}</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {analyzing && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                                <ActivityIndicator size="small" color={Neo.colors.primary[500]} />
                                <Text style={{ marginLeft: 8, color: Neo.colors.primary[500] }}>{t('headersFirst.analisandoRemDio', 'Analisando remédio...')}</Text>
                            </View>
                        )}

                        {/* Prescription Photo */}
                        <TouchableOpacity style={[styles.photoBox, { marginTop: 16, borderColor: prescriptionPhoto ? Neo.colors.primary[500] : Neo.colors.neutral[300] }]} onPress={handleTakePrescription}>
                            {prescriptionPhoto ? (
                                <Image source={{ uri: ProfileService.resolveImageUri(prescriptionPhoto) }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                            ) : (
                                <>
                                    <NeoIcon name="DocumentText" size={32} color={Neo.colors.neutral[500]} />
                                    <Text style={{ color: Neo.colors.neutral[500], marginTop: 8 }}>{t('headersFirst.anexarReceitaOpcional', 'Anexar Receita (Opcional)')}</Text>
                                    <Text style={{ fontSize: 10, color: Neo.colors.neutral[400] }}>{t('headersFirst.FotoDoDocumento', '(Foto do Documento)')}</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.label}>{t('headersFirst.nomeDoMedicamento', 'Nome do Medicamento')}</Text>
                        <TextInput style={styles.input} placeholder="Ex: Dipirona" value={name} onChangeText={setName} />

                        <Text style={styles.label}>{t('headersFirst.dosagem', 'Dosagem')}</Text>
                        <TextInput style={styles.input} placeholder="Ex: 500mg, 1 comprimido" value={dosage} onChangeText={setDosage} />

                        <Text style={styles.label}>{t('headersFirst.quemVaiTomar', 'Quem vai tomar?')}</Text>
                        <View style={styles.profileRow}>
                            {profiles.map(p => (
                                <TouchableOpacity
                                    key={p.id}
                                    style={[styles.profileChip, selectedProfile === p.id && styles.profileChipActive]}
                                    onPress={() => setSelectedProfile(p.id)}
                                >
                                    <Text style={[styles.profileChipText, selectedProfile === p.id && { color: Neo.colors.neutral.white }]}>{p.nome}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* ── EduBox Prevenção Inteligente ── */}
                        <View style={{ backgroundColor: Neo.colors.neutral[100], padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Neo.colors.neutral[200], marginBottom: 20 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Neo.colors.primary[500], marginBottom: 8 }}>
                                {t('medications.eduBoxTitle')}
                            </Text>
                            <Text style={{ fontSize: 12, color: Neo.colors.neutral[600], marginBottom: 4 }}>
                                {t('medications.eduBoxText1')}
                            </Text>
                            <Text style={{ fontSize: 12, color: Neo.colors.neutral[800], fontWeight: 'bold', marginTop: 4 }}>
                                {t('medications.eduBoxText2')}
                            </Text>
                            <Text style={{ fontSize: 12, color: Neo.colors.neutral[800], fontWeight: 'bold', marginTop: 8 }}>
                                {t('medications.eduBoxText3')}
                            </Text>
                            <Text style={{ fontSize: 12, color: Neo.colors.feedback.error, fontStyle: 'italic', marginTop: 10 }}>
                                {t('medications.eduBoxText4')}
                            </Text>
                        </View>

                        <Text style={styles.label}>{t('medications.delayRuleQuestion')}</Text>
                        <View style={{ marginBottom: 24, gap: 12 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isRigidSchedule ? Neo.colors.primary[500] + '15' : Neo.colors.neutral.white, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: isRigidSchedule ? Neo.colors.primary[500] : Neo.colors.neutral[200] }}
                                onPress={() => setIsRigidSchedule(true)}
                            >
                                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: isRigidSchedule ? Neo.colors.primary[500] : Neo.colors.neutral[400], alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                    {isRigidSchedule && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Neo.colors.primary[500] }} />}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', color: Neo.colors.neutral[900], fontSize: 14 }}>{t('medications.ruleRigid')}</Text>
                                    <Text style={{ color: Neo.colors.neutral[500], fontSize: 12, marginTop: 2 }}>{t('medications.ruleRigidSub')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: !isRigidSchedule ? Neo.colors.primary[500] + '15' : Neo.colors.neutral.white, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: !isRigidSchedule ? Neo.colors.primary[500] : Neo.colors.neutral[200] }}
                                onPress={() => setIsRigidSchedule(false)}
                            >
                                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: !isRigidSchedule ? Neo.colors.primary[500] : Neo.colors.neutral[400], alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                    {!isRigidSchedule && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Neo.colors.primary[500] }} />}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', color: Neo.colors.neutral[900], fontSize: 14 }}>{t('medications.ruleFlexible')}</Text>
                                    <Text style={{ color: Neo.colors.neutral[500], fontSize: 12, marginTop: 2 }}>{t('medications.ruleFlexibleSub')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>{t('headersFirst.frequNciaHoras', 'Frequência (horas)')}</Text>
                        <View style={styles.freqRow}>
                            {['4', '6', '8', '12', '24'].map(freq => (
                                <TouchableOpacity
                                    key={freq}
                                    style={[styles.freqChip, frequency === freq && styles.freqChipActive]}
                                    onPress={() => setFrequency(freq)}
                                >
                                    <Text style={[styles.freqText, frequency === freq && { color: Neo.colors.neutral.white }]}>{freq}h</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>{t('headersFirst.dataEHoraDoInCio', 'Data e Hora do Início')}</Text>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity style={[styles.dateButton, { flex: 1 }]} onPress={() => setShowTimePicker(true)}>
                                <NeoIcon name="Clock" size={20} color={Neo.colors.neutral[900]} />
                                <Text style={{ marginLeft: 8, fontSize: 16 }}>
                                    {nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.dateButton, { flex: 1 }]} onPress={() => setShowDatePicker(true)}>
                                <NeoIcon name="Calendar" size={20} color={Neo.colors.neutral[900]} />
                                <Text style={{ marginLeft: 8, fontSize: 16 }}>
                                    {nextDose.getDate()}/{nextDose.getMonth() + 1}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {showTimePicker && (
                            <View style={{ transform: [{ scale: 1.5 }], marginTop: 20, marginBottom: 10 }}>
                                <DateTimePicker
                                    value={nextDose}
                                    mode="time"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={(event, date) => {
                                        setShowTimePicker(false);
                                        if (date) {
                                            // Manter a data, mudar só a hora
                                            const newDate = new Date(nextDose);
                                            newDate.setHours(date.getHours());
                                            newDate.setMinutes(date.getMinutes());
                                            setNextDose(newDate);
                                        }
                                    }}
                                />
                            </View>
                        )}
                        {showDatePicker && (
                            <DateTimePicker
                                value={nextDose}
                                mode="date"
                                display="default"
                                onChange={(event, date) => {
                                    setShowDatePicker(false);
                                    if (date) {
                                        // Manter a hora, mudar só a data
                                        const newDate = new Date(nextDose);
                                        newDate.setFullYear(date.getFullYear());
                                        newDate.setMonth(date.getMonth());
                                        newDate.setDate(date.getDate());
                                        setNextDose(newDate);
                                    }
                                }}
                            />
                        )}

                        {/* Educational Fields Section */}
                        <Text style={styles.label}>{t('headersFirst.paraQueServeIndicaO', 'Para que serve? (Indicação)')}</Text>
                        <TextInput style={styles.input} placeholder="Ex: Para dor de cabeça / Pressão alta" value={indication} onChangeText={setIndication} />

                        <Text style={styles.label}>{t('headersFirst.porQueImportanteOpcional', 'Por que é importante? (Opcional)')}</Text>
                        <TextInput style={[styles.input, { height: 60 }]} placeholder="Ex: Para evitar picos de pressão..." multiline value={importance} onChangeText={setImportance} />

                        <Text style={styles.label}>{t('headersFirst.oQueAconteceSeNOTomarOpcional', 'O que acontece se não tomar? (Opcional)')}</Text>
                        <TextInput style={[styles.input, { height: 60 }]} placeholder="Ex: Risco de tontura ou mal estar..." multiline value={implications} onChangeText={setImplications} />

                        <Text style={styles.label}>{t('headersFirst.estoqueInicialOpcional', 'Estoque Inicial (Opcional)')}</Text>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qtd (Ex: 30)"
                                    keyboardType="numeric"
                                    value={stockQuantity}
                                    onChangeText={setStockQuantity}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Unidade (Comprimido, ml...)"
                                    value={stockUnit}
                                    onChangeText={setStockUnit}
                                />
                            </View>
                        </View>
                        {stockUnit?.toLowerCase().includes('gotas') && (
                            <Text style={{ fontSize: 12, color: Neo.colors.feedback.warning, marginTop: 4 }}>
                                {t('headersFirst.dicaParaGotasTenteEstimarQuantasDosesOuM', 'Dica: Para gotas, tente estimar quantas doses ou ml restam.')}
                            </Text>
                        )}



                        {/* Spacer for bottom fixed button */}
                        <View style={{ height: 100 }} />

                    </ScrollView>

                    {/* FIXED SAVE BUTTON FOOTER */}
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>{t('headersFirst.agendarTratamento', 'Agendar Tratamento')}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>

            {/* MODAL VIEW PRESCRIPTION */}
            <Modal visible={!!viewPrescription} animationType="fade" transparent={true} onRequestClose={() => setViewPrescription(null)}>
                <View style={styles.fullScreenOverlay}>
                    <TouchableOpacity style={styles.closeOverlayButton} onPress={() => setViewPrescription(null)}>
                        <NeoIcon name="CloseCircle" size={40} color={Neo.colors.neutral.white} />
                    </TouchableOpacity>
                    {viewPrescription && (
                        <Image
                            source={{ uri: ProfileService.resolveImageUri(viewPrescription) }}
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </Modal>

            {/* MODAL DE CONFIRMAÇÃO DE DOSE */}
            <DoseConfirmationModal
                visible={doseConfirmVisible}
                medication={doseConfirmMed || {}}
                profile={doseConfirmMed ? profiles.find(p => p.id === doseConfirmMed.profileId) : null}
                onConfirmOnTime={handleConfirmOnTime}
                onConfirmDelay={handleConfirmDelay}
                onClose={() => { setDoseConfirmVisible(false); setDoseConfirmMed(null); }}
            />
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38, height: 38, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center', justifyContent: 'center',
    },
    headerTitle: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 },
    headerSubtitle: { color: Neo.colors.neutral[600] },
    addHeaderBtn: {
        width: 38, height: 38, borderRadius: 12,
        backgroundColor: Neo.colors.primary[600],
        alignItems: 'center', justifyContent: 'center',
    },
    list: { padding: 20, paddingBottom: 190 },

    card: {
        backgroundColor: Neo.colors.surface, borderRadius: Neo.radii.lg, padding: 16, marginBottom: 16,
        ...Neo.shadows.sm, borderLeftWidth: 4, borderLeftColor: Neo.colors.primary[600]
    },
    cardOverdue: {
        borderLeftColor: Neo.colors.error, backgroundColor: '#FEF2F2'
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    medIconBox: {
        width: 48, height: 48, borderRadius: 24, backgroundColor: Neo.colors.primary[50], justifyContent: 'center', alignItems: 'center'
    },
    medImage: { width: 48, height: 48, borderRadius: 24, resizeMode: 'cover', borderWidth: 1, borderColor: Neo.colors.neutral[200] },
    medName: { fontSize: 18, fontWeight: 'bold', color: Neo.colors.neutral[900] },
    medDetail: { fontSize: 14, color: Neo.colors.neutral[500] },

    cardSchedule: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 12, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Neo.colors.neutral[100]
    },
    scheduleText: { fontSize: 14, color: Neo.colors.neutral[600] },
    freqBadge: { fontSize: 12, backgroundColor: 'transparent', padding: 4, borderRadius: 6, color: Neo.colors.neutral[500] },

    actionButton: {
        marginTop: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        padding: 12, borderRadius: 12, gap: 8
    },
    actionNormal: { backgroundColor: Neo.colors.primary[600] },
    actionOverdue: { backgroundColor: Neo.colors.error },
    actionText: { color: Neo.colors.surface, fontWeight: 'bold', fontSize: 16 },

    deleteLink: { alignSelf: 'center', marginTop: 12 },

    // Empty State
    emptyState: { alignItems: 'center', marginTop: 60 },
    emptyText: { fontSize: 16, color: Neo.colors.neutral[400], marginVertical: 16 },
    addButton: { backgroundColor: Neo.colors.primary[600], paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },

    // Modal
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[200] },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: Neo.colors.neutral[900] },
    label: { fontSize: 14, fontWeight: 'bold', marginTop: 20, marginBottom: 8, color: Neo.colors.neutral[800] },
    input: {
        backgroundColor: Neo.colors.neutral[50], borderWidth: 1, borderColor: Neo.colors.neutral[200], borderRadius: 12, padding: 12, fontSize: 16
    },
    photoBox: {
        height: 150, backgroundColor: Neo.colors.neutral[100], borderRadius: 12, justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: Neo.colors.neutral[300], borderStyle: 'dashed'
    },
    profileRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    profileChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Neo.colors.neutral[100] },
    profileChipActive: { backgroundColor: Neo.colors.primary[600] },
    profileChipText: { color: Neo.colors.neutral[800] },

    freqRow: { flexDirection: 'row', justifyContent: 'space-between' },
    freqChip: { width: 50, height: 50, borderRadius: 25, backgroundColor: Neo.colors.neutral[100], justifyContent: 'center', alignItems: 'center' },
    freqChipActive: { backgroundColor: Neo.colors.primary[600] },
    freqText: { fontWeight: 'bold', color: Neo.colors.neutral[800] },

    dateButton: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: Neo.colors.neutral[50], borderRadius: 12 },

    saveButton: {
        backgroundColor: Neo.colors.success, padding: 16, borderRadius: 12, alignItems: 'center', width: '100%'
    },
    saveButtonText: { color: Neo.colors.surface, fontSize: 18, fontWeight: 'bold' },

    modalFooter: {
        padding: 20,
        backgroundColor: Neo.colors.surface,
        borderTopWidth: 1,
        borderTopColor: Neo.colors.neutral[200],
        ...Neo.shadows.md
    },

    prescriptionButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        padding: 10, marginVertical: 8, borderWidth: 1, borderColor: Neo.colors.primary[600], borderRadius: 8, gap: 8
    },
    prescriptionText: { color: Neo.colors.primary[600], fontWeight: '600' },

    fullScreenOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
    fullScreenImage: { width: '100%', height: '80%' },
    closeOverlayButton: { position: 'absolute', top: 40, right: 20, zIndex: 10 },

    // Edu Styles
    eduBox: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200]
    },
    eduText: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        lineHeight: 18
    }
});
