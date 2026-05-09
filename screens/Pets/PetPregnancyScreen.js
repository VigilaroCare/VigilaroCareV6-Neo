import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { Colors, Spacing, BorderRadius, Shadows } from '../../utils/Theme';
import ProfileService from '../../services/ProfileService';
import { useTranslation } from 'react-i18next';

export default function PetPregnancyScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
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
            Alert.alert(t('petPregnancyTracker.errorTitle'), t('petPregnancyTracker.errorMatingDate'));
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
            Alert.alert(t('petPregnancyTracker.successTitle'), t('petPregnancyTracker.successPregnancy'));
        }
    };

    const handleBirth = async () => {
        if (!litterSize) {
            Alert.alert(t('petPregnancyTracker.errorTitle'), t('petPregnancyTracker.errorLitterCount'));
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
            Alert.alert(t('petPregnancyTracker.congratsTitle'), t('petPregnancyTracker.congratsBirth', { count: litterSize }));
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
            Alert.alert(t('petPregnancyTracker.errorTitle'), t('petPregnancyTracker.errorSave'));
            return false;
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Header Component Reuse
    const renderHeader = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
            <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('petPregnancyTracker.title')}</Text>
                <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('petPregnancyTracker.subtitle')}</Text>
            </View>
        </View>
    );

    // SELECTION SCREEN
    if (!pet) {
        return (
            <AppBackground variant="subtle">
                <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                    <StatusBar barStyle="dark-content" />
                    {renderHeader()}
                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.cardTitle}>{t('petPregnancyTracker.selectPet')}</Text>
                        {loading ? <ActivityIndicator size="large" color="#E91E63" /> : (
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
                                            <NeoIcon name="Lovely" size={24} color="#E91E63" />
                                        </View>
                                        <View>
                                            <Text style={styles.petName}>{p.nome}</Text>
                                            <Text style={styles.petDetail}>{p.especie || 'Pet'}</Text>
                                        </View>
                                        <NeoIcon name="ArrowRight2" size={20} color={Colors.textTertiary} style={{ marginLeft: 'auto' }} />
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
            <StatusBar barStyle="dark-content" />
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.content}>
                {/* Pet Info */}
                <View style={styles.petCard}>
                    <View style={styles.avatarContainer}>
                        <NeoIcon name="Lovely" size={32} color="#E91E63" />
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
                                <NeoIcon name="Gift" size={24} color="#FFF" />
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FCE4EC' },
    header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, ...Shadows.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
    backButton: { padding: 4 },
    content: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: 120 },
    petCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: Spacing.md, borderRadius: BorderRadius.lg, ...Shadows.sm },
    petSelectionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: Spacing.md, borderRadius: BorderRadius.lg, ...Shadows.sm, marginBottom: 12 },
    avatarContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FCE4EC', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
    petName: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
    petDetail: { color: Colors.textSecondary },
    setupCard: { backgroundColor: '#FFF', padding: Spacing.lg, borderRadius: BorderRadius.lg, ...Shadows.sm },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.md },
    label: { fontSize: 14, fontWeight: 'bold', color: Colors.textSecondary, marginBottom: 8 },
    input: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: '#E0E0E0', fontSize: 16, marginBottom: Spacing.md },
    predictionBox: { backgroundColor: '#E3F2FD', padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center', marginBottom: Spacing.lg },
    predictionLabel: { color: '#2196F3', fontWeight: 'bold' },
    predictionValue: { fontSize: 24, fontWeight: 'bold', color: '#1565C0', marginVertical: 4 },
    predictionSub: { fontSize: 12, color: '#2196F3' },
    saveButton: { backgroundColor: '#E91E63', padding: 16, borderRadius: BorderRadius.md, alignItems: 'center' },
    saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    statusCard: { backgroundColor: '#FFF', padding: Spacing.lg, borderRadius: BorderRadius.lg, ...Shadows.sm },
    statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
    statusTitle: { fontSize: 18, fontWeight: 'bold', color: '#E91E63' },
    weekBadge: { backgroundColor: '#FCE4EC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    weekText: { color: '#C2185B', fontWeight: 'bold', fontSize: 12 },
    timelineContainer: { marginBottom: Spacing.lg },
    timelineBar: { height: 8, backgroundColor: '#F5F5F5', borderRadius: 4, marginBottom: 8, overflow: 'hidden' },
    timelineProgress: { height: '100%', backgroundColor: '#E91E63', borderRadius: 4 },
    timelineLabels: { flexDirection: 'row', justifyContent: 'space-between' },
    timelineLabel: { fontSize: 12, color: Colors.textTertiary },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: Spacing.md },
    infoItem: { alignItems: 'center', flex: 1 },
    infoLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4 },
    infoValue: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary },
    tipsCard: { backgroundColor: '#FFF', padding: Spacing.lg, borderRadius: BorderRadius.lg, ...Shadows.sm },
    tipText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
    birthCard: { backgroundColor: '#FFF', padding: Spacing.lg, borderRadius: BorderRadius.lg, ...Shadows.sm, marginBottom: 40 },
    birthButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: BorderRadius.md, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
    birthButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    noDataCard: { alignItems: 'center', padding: 32 },
    noDataText: { fontSize: 16, color: Colors.textSecondary, marginBottom: 16 },
    createButton: { padding: 12, backgroundColor: Colors.primary, borderRadius: 8 },
    createButtonText: { color: '#FFF', fontWeight: 'bold' }
});
