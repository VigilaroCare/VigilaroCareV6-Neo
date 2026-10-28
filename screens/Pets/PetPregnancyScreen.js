import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import NeoAlert from '../../utils/NeoAlert';

export default function PetPregnancyScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const isDark = useIsDark();
    const colors = useThemeColors();
    const [pet, setPet] = useState(route.params?.pet || null);
    const [petsList, setPetsList] = useState([]);

    // Form States
    const [matingDate, setMatingDate] = useState(''); // DD/MM/YYYY
    const [dueDate, setDueDate] = useState(null);
    const [weeksPregnant, setWeeksPregnant] = useState(0);
    const [litterSize, setLitterSize] = useState('');
    const [isPregnant, setIsPregnant] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load Logic
    useEffect(() => {
        if (!pet) {
            loadPets();
        } else {
            if (pet.pregnancy && pet.pregnancy.active) {
                setMatingDate(pet.pregnancy.matingDate);
                calculatePregnancy(pet.pregnancy.matingDate, pet.especie);
                setIsPregnant(true);
            }
        }
    }, [pet]);

    const loadPets = async () => {
        setLoading(true);
        try {
            const allPets = await ProfileService.getPets();
            setPetsList(allPets);
        } catch (e) {
            console.error("Error loading pets:", e);
        } finally {
            setLoading(false);
        }
    };

    const calculatePregnancy = (dateStr, especieParam) => {
        const parts = dateStr.split('/');
        if (parts.length !== 3) return;

        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);

        const mating = new Date(year, month, day);
        if (isNaN(mating.getTime())) return;

        // Use especieParam or fallback to state pet
        const especie = especieParam || pet?.especie;
        const gestationDays = especie === 'Gato' ? 65 : 63;

        const due = new Date(mating);
        due.setDate(due.getDate() + gestationDays);

        setDueDate(due);

        const today = new Date();
        const diffTime = Math.abs(today - mating);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setWeeksPregnant(Math.floor(diffDays / 7));
    };

    const handleSave = async () => {
        if (!matingDate || !dueDate) {
            NeoAlert.alert(t('petPregnancyTracker.errorTitle'), t('petPregnancyTracker.errorMatingDate'));
            return;
        }

        const updatedPet = {
            ...pet,
            pregnancy: {
                matingDate,
                dueDate: dueDate.toISOString(),
                active: true
            }
        };

        if (await updatePetInStorage(updatedPet)) {
            setIsPregnant(true);
            NeoAlert.alert(t('petPregnancyTracker.successTitle'), t('petPregnancyTracker.successPregnancy'));
        }
    };

    const handleBirth = async () => {
        if (!litterSize) {
            NeoAlert.alert(t('petPregnancyTracker.errorTitle'), t('petPregnancyTracker.errorLitterCount'));
            return;
        }

        const updatedPet = {
            ...pet,
            pregnancy: { ...pet.pregnancy, active: false },
            // pregnancy: null, // Pode manter historico se quiser no futuro, mas por enquanto vamos limpar active
            lastLitter: {
                date: new Date().toISOString(),
                size: litterSize
            }
        };

        if (await updatePetInStorage(updatedPet)) {
            setIsPregnant(false);
            setMatingDate('');
            setDueDate(null);
            setLitterSize('');
            // count NUMÉRICO: com o texto do campo ('3') o i18next não escolhe
            // singular/plural e devolve o nome da chave no lugar da frase.
            NeoAlert.alert(t('petPregnancyTracker.congratsTitle'), t('petPregnancyTracker.congratsBirth', { count: Number(litterSize) || 0 }));
            navigation.goBack();
        }
    };

    const updatePetInStorage = async (updatedPet) => {
        try {
            const data = await ProfileService.getData();
            data.perfis = data.perfis.map(p => p.id === updatedPet.id ? updatedPet : p);
            await ProfileService.saveData(data);
            setPet(updatedPet);
            return true;
        } catch (e) {
            console.error("Error updating pet:", e);
            NeoAlert.alert(t('petPregnancyTracker.errorTitle'), t('petPregnancyTracker.errorSave'));
            return false;
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Header padronizado
    const renderHeader = () => (
        <View style={styles.headerStd}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <H1 style={styles.titleStd}>{t('petPregnancyTracker.title', 'Gestação pet')}</H1>
                <Caption style={styles.subtitleStd}>{t('petPregnancyTracker.subtitle', 'Acompanhamento semanal')}</Caption>
            </View>
        </View>
    );

    // SELECTION SCREEN
    if (!pet) {
        return (
            <AppBackground>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                    <StatusBar style={isDark ? 'light' : 'dark'} />
                    {renderHeader()}
                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.cardTitle}>{t('petPregnancyTracker.selectPet')}</Text>
                        {loading ? <ActivityIndicator size="large" color={colors.categoria.rose.fill} /> : (
                            petsList.length === 0 ? (
                                <View style={styles.noDataCard}>
                                    <Text style={styles.noDataText}>{t('petPregnancyTracker.noPets')}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('PetsMenu')} style={styles.createButton}>
                                        <Text style={styles.createButtonText}>{t('petPregnancyTracker.registerPet')}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                petsList.map(p => (
                                    <TouchableOpacity
                                        key={p.id}
                                        style={styles.petSelectionCard}
                                        onPress={() => setPet(p)}
                                        activeOpacity={0.8}
                                    >
                                        <View style={styles.avatarContainer}>
                                            <NeoIcon name="Lovely" size={24} color={colors.categoria.rose.fill} />
                                        </View>
                                        <View>
                                            <Text style={styles.petName}>{p.nome}</Text>
                                            <Text style={styles.petDetail}>{p.especie || 'Pet'}</Text>
                                        </View>
                                        <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} style={{ marginLeft: 'auto' }} />
                                    </TouchableOpacity>
                                ))
                            )
                        )}
                    </ScrollView>
                </SafeAreaView>
            </AppBackground>
        );
    }

    // MAIN SCREEN
    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
            <StatusBar style="dark" />
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.content}>
                {/* Pet Info */}
                <View style={styles.petCard}>
                    <View style={styles.avatarContainer}>
                        <NeoIcon name="Lovely" size={32} color={colors.categoria.rose.fill} />
                    </View>
                    <View>
                        <Text style={styles.petName}>{pet.nome}</Text>
                        <Text style={styles.petDetail}>{pet.especie} • {pet.raca || t('petPregnancyTracker.breedNotInformed')}</Text>
                    </View>
                </View>

                {!isPregnant ? (
                    <View style={styles.setupCard}>
                        <Text style={styles.cardTitle}>{t('petPregnancyTracker.startTracking')}</Text>
                        <Text style={styles.label}>{t('petPregnancyTracker.matingDate')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: 01/12/2025"
                            value={matingDate}
                            onChangeText={(t) => {
                                setMatingDate(t);
                                if (t.length === 10) calculatePregnancy(t);
                            }}
                            keyboardType="numbers-and-punctuation"
                            maxLength={10}
                        />

                        {dueDate && (
                            <View style={styles.predictionBox}>
                                <Text style={styles.predictionLabel}>{t('petPregnancyTracker.dueDate')}</Text>
                                <Text style={styles.predictionValue}>{formatDate(dueDate)}</Text>
                                <Text style={styles.predictionSub}>
                                    {t('petPregnancyTracker.gestationDays', { days: pet.especie === 'Gato' ? 65 : 63 })}
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>{t('petPregnancyTracker.confirmPregnancy')}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* Status Card */}
                        <View style={styles.statusCard}>
                            <View style={styles.statusHeader}>
                                <Text style={styles.statusTitle}>{t('petPregnancyTracker.ongoingPregnancy')}</Text>
                                <View style={styles.weekBadge}>
                                    <Text style={styles.weekText}>{t('petPregnancyTracker.weekNumber', { week: weeksPregnant })}</Text>
                                </View>
                            </View>

                            <View style={styles.timelineContainer}>
                                <View style={styles.timelineBar}>
                                    <View style={[styles.timelineProgress, { width: `${Math.min((weeksPregnant / 9) * 100, 100)}%` }]} />
                                </View>
                                <View style={styles.timelineLabels}>
                                    <Text style={styles.timelineLabel}>{t('petPregnancyTracker.start')}</Text>
                                    <Text style={styles.timelineLabel}>{t('petPregnancyTracker.birth')}</Text>
                                </View>
                            </View>

                            <View style={styles.infoRow}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>{t('petPregnancyTracker.mating')}</Text>
                                    <Text style={styles.infoValue}>{matingDate}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>{t('petPregnancyTracker.forecast')}</Text>
                                    <Text style={styles.infoValue}>{formatDate(dueDate)}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Weekly Tips */}
                        <View style={styles.tipsCard}>
                            <Text style={styles.cardTitle}>{t('petPregnancyTracker.weeklyTips')}</Text>
                            <Text style={styles.tipText}>
                                {weeksPregnant < 3
                                    ? t('petPregnancyTracker.tip1')
                                    : weeksPregnant < 6
                                        ? t('petPregnancyTracker.tip2')
                                        : t('petPregnancyTracker.tip3')}
                            </Text>
                        </View>

                        {/* Register Birth */}
                        <View style={styles.birthCard}>
                            <Text style={styles.cardTitle}>{t('petPregnancyTracker.registerBirth')}</Text>
                            <Text style={styles.label}>{t('petPregnancyTracker.litterCount')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: 5"
                                value={litterSize}
                                onChangeText={setLitterSize}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity style={styles.birthButton} onPress={handleBirth}>
                                <NeoIcon name="Gift" size={24} color={colors.neutral.white} />
                                <Text style={styles.birthButtonText}>{t('petPregnancyTracker.finishPregnancy')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const ACCENT = Neo.colors.categoria.rose.fill;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },

    // Header padronizado
    headerStd: {
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
    titleStd: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 },
    subtitleStd: { color: Neo.colors.neutral[600] },

    content: { padding: Neo.spacing.lg, gap: 12, paddingBottom: 240 },

    petCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    petSelectionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: 14,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: ACCENT + '1A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    petName: { fontSize: 16, fontWeight: '800', color: Neo.colors.neutral[900] },
    petDetail: { color: Neo.colors.neutral[600], fontSize: 12.5 },

    setupCard: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    cardTitle: { fontSize: 16, fontWeight: '800', color: Neo.colors.neutral[900], marginBottom: 12, letterSpacing: -0.2 },
    label: { fontSize: 11.5, fontWeight: '800', color: Neo.colors.neutral[600], marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' },
    input: {
        backgroundColor: Neo.colors.neutral.white,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
        fontSize: 15,
        marginBottom: 14,
        color: Neo.colors.neutral[900],
    },
    predictionBox: {
        backgroundColor: Neo.colors.categoria.ardosia.tint,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    predictionLabel: { color: Neo.colors.secondary[500], fontWeight: '800', fontSize: 12, letterSpacing: 0.4 }, // was #1565C0
    predictionValue: { fontSize: 24, fontWeight: '800', color: Neo.colors.secondary[500], marginVertical: 4, letterSpacing: -0.5 }, // was #0D47A1
    predictionSub: { fontSize: 12, color: Neo.colors.secondary[500] }, // was #1976D2
    saveButton: { backgroundColor: ACCENT, padding: 14, borderRadius: 12, alignItems: 'center' },
    saveButtonText: { color: Neo.colors.neutral.white, fontWeight: '800', fontSize: 15 },

    statusCard: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    statusTitle: { fontSize: 16, fontWeight: '800', color: ACCENT },
    weekBadge: { backgroundColor: ACCENT + '1A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
    weekText: { color: ACCENT, fontWeight: '800', fontSize: 11.5 },
    timelineContainer: { marginBottom: 14 },
    timelineBar: { height: 8, backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 4, marginBottom: 6, overflow: 'hidden' },
    timelineProgress: { height: '100%', backgroundColor: ACCENT, borderRadius: 4 },
    timelineLabels: { flexDirection: 'row', justifyContent: 'space-between' },
    timelineLabel: { fontSize: 11.5, color: Neo.colors.neutral[600] },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.06)', paddingTop: 12 },
    infoItem: { alignItems: 'center', flex: 1 },
    infoLabel: { fontSize: 11.5, color: Neo.colors.neutral[600], marginBottom: 4 },
    infoValue: { fontSize: 15, fontWeight: '800', color: Neo.colors.neutral[900] },

    tipsCard: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    tipText: { fontSize: 13.5, color: Neo.colors.neutral[800], lineHeight: 20 },

    birthCard: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    birthButton: {
        backgroundColor: Neo.colors.feedback.success, // was #4CAF50
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    birthButtonText: { color: Neo.colors.neutral.white, fontWeight: '800', fontSize: 15 },

    noDataCard: { alignItems: 'center', padding: 32 },
    noDataText: { fontSize: 14, color: Neo.colors.neutral[600], marginBottom: 16, textAlign: 'center' },
    createButton: { paddingVertical: 12, paddingHorizontal: 18, backgroundColor: Neo.colors.primary[600], borderRadius: 12 },
    createButtonText: { color: Neo.colors.neutral.white, fontWeight: '800' },
});
