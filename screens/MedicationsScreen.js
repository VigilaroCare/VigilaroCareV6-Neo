
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    StatusBar,
    SectionList,
    Switch,
    ScrollView,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Typography } from '../utils/Theme';
import ProfileService from '../services/ProfileService';
import GamificationService from '../services/GamificationService';
import NotificationService from '../services/NotificationService';
import { useProfiles } from '../contexts/ProfileContext';
import { useTranslation } from 'react-i18next';

// PERIODS are now defined inside the component to access t()

export default function MedicationsScreen({ navigation }) {
    const { t } = useTranslation();

    const PERIODS = [
        { id: 'morning', label: t('medications.morning'), icon: 'sunny', color: '#FFB74D', range: '06:00 - 12:00' },
        { id: 'afternoon', label: t('medications.afternoon'), icon: 'partly-sunny', color: '#4FC3F7', range: '12:00 - 18:00' },
        { id: 'night', label: t('medications.night'), icon: 'moon', color: '#7986CB', range: '18:00 - 06:00' }
    ];

    const [medications, setMedications] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [manageMode, setManageMode] = useState(null); // 'add', 'edit', 'delete', 'history'
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState('');
    const [period, setPeriod] = useState('morning');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [currentStock, setCurrentStock] = useState(''); // New: Stock Tracking
    const [lowStockAlert, setLowStockAlert] = useState('5'); // Alert when <= 5

    // History View
    const [historyVisible, setHistoryVisible] = useState(false);
    const [guideVisible, setGuideVisible] = useState(false); // Modal do Guia de Descarte
    const [historyLog, setHistoryLog] = useState([]);

    useEffect(() => {
        loadProfiles();
        loadMedications();
    }, []);

    const loadProfiles = async () => {
        try {
            const allProfiles = await ProfileService.getPerfis();
            setProfiles(allProfiles);
            if (allProfiles.length > 0) {
                // Set initial profile (Active or First)
                const active = allProfiles.find(p => p.ativo) || allProfiles[0];
                setSelectedProfileId(active.id);
            }
        } catch (e) {
            console.error('Error loading profiles:', e);
        }
    };

    const loadMedications = async () => {
        try {
            const saved = await AsyncStorage.getItem('@medications_timeline');
            if (saved) {
                setMedications(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading medications:', error);
        }
    };

    const loadHistory = async () => {
        try {
            const saved = await AsyncStorage.getItem('@medications_history');
            if (saved) {
                const allHistory = JSON.parse(saved);
                // Filter by current profile if needed, or show all
                setHistoryLog(allHistory.filter(h => h.profileId === selectedProfileId).reverse());
            } else {
                setHistoryLog([]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const saveMedication = async () => {
        if (!name.trim() || !time.trim()) {
            Alert.alert(t('medications.errorNameTime'));
            return;
        }

        if (!selectedProfileId) {
            Alert.alert(t('medications.errorSelectProfile'));
            return;
        }

        const medId = manageMode === 'edit' && editingId ? editingId : Date.now().toString();

        // 1. Prepare Data
        const medData = {
            id: medId,
            profileId: selectedProfileId, // Link to Profile
            name,
            dosage,
            time,
            period,
            taken: false,
            notifications: notificationsEnabled,
            stock: currentStock ? parseInt(currentStock) : null,
            lowStockThreshold: parseInt(lowStockAlert) || 5,
            lastTaken: null,
            notificationId: null // Placeholder
        };

        // 2. Handle Notifications
        let notifId = null;

        // If Editing, CANCEL old notification first
        if (manageMode === 'edit') {
            const oldMed = medications.find(m => m.id === editingId);
            if (oldMed && oldMed.notificationId) {
                await NotificationService.cancelNotification(oldMed.notificationId);
            }
            // Preserve other fields if needed, but we overwrite mostly relative to form
        }

        // If Enabled, SCHEDULE new
        if (notificationsEnabled) {
            const [hours, minutes] = time.split(':').map(Number);
            if (!isNaN(hours) && !isNaN(minutes)) {
                notifId = await NotificationService.scheduleNotification(
                    `Hora do Remédio: ${name}`,
                    `Está na hora de tomar ${name} (${dosage || 'sua dose'}).`,
                    { hour: hours, minute: minutes, repeats: true }
                );
            }
        }

        medData.notificationId = notifId;

        // 3. Save to State & Storage
        let updated;
        if (manageMode === 'edit' && editingId) {
            updated = medications.map(m => m.id === editingId ? { ...m, ...medData, taken: m.taken, lastTaken: m.lastTaken } : m);
        } else {
            updated = [...medications, medData];
        }

        setMedications(updated);
        await AsyncStorage.setItem('@medications_timeline', JSON.stringify(updated));

        setModalVisible(false);
        resetForm();
        setManageMode(null);
    };

    const toggleTaken = async (id) => {
        if (manageMode === 'delete') {
            deleteMedication(id);
            return;
        }
        if (manageMode === 'edit') {
            const med = medications.find(m => m.id === id);
            if (med) {
                setName(med.name);
                setDosage(med.dosage);
                setTime(med.time);
                setPeriod(med.period);
                setNotificationsEnabled(med.notifications !== false);
                setCurrentStock(med.stock ? med.stock.toString() : '');
                setEditingId(med.id);
                setModalVisible(true);
            }
            return;
        }

        // Logic for Taking Medicine (History + Stock + Gamification)
        const med = medications.find(m => m.id === id);
        if (!med) return;

        const isTaking = !med.taken;

        // Update Stock
        let newStock = med.stock;
        if (isTaking && med.stock !== null && med.stock > 0) {
            newStock = med.stock - 1;
            if (newStock <= med.lowStockThreshold) {
                Alert.alert(t('medications.lowStockTitle'), t('medications.lowStock', { count: newStock, name: med.name }));
            }
        } else if (!isTaking && med.stock !== null) {
            newStock = med.stock + 1; // Undo
        }

        // Update Timeline
        const updated = medications.map(m =>
            m.id === id ? { ...m, taken: isTaking, stock: newStock, lastTaken: isTaking ? new Date().toISOString() : m.lastTaken } : m
        );
        setMedications(updated);
        await AsyncStorage.setItem('@medications_timeline', JSON.stringify(updated));

        // Log to History
        if (isTaking) {
            const historyEntry = {
                id: Date.now().toString(),
                medId: med.id,
                medName: med.name,
                profileId: med.profileId,
                timestamp: new Date().toISOString(),
                status: 'TAKEN'
            };

            try {
                const historyStr = await AsyncStorage.getItem('@medications_history');
                const history = historyStr ? JSON.parse(historyStr) : [];
                history.push(historyEntry);
                await AsyncStorage.setItem('@medications_history', JSON.stringify(history));

                // Gamification
                await GamificationService.addPoints('MEDICATION_TAKEN');
            } catch (e) {
                console.error("History Error", e);
            }
        }
    };

    const deleteMedication = async (id) => {
        Alert.alert(
            t('medications.disposalTitle'), 
            t('medications.disposalAlertMsg'), 
            [
                { text: t('medications.no') },
                {
                    text: t('medications.yes'),
                    onPress: async () => {
                    // Cancel Notification if exists
                    const med = medications.find(m => m.id === id);
                    if (med && med.notificationId) {
                        await NotificationService.cancelNotification(med.notificationId);
                    }

                    const updated = medications.filter(m => m.id !== id);
                    setMedications(updated);
                    await AsyncStorage.setItem('@medications_timeline', JSON.stringify(updated));
                }
            }
        ]);
    };

    const resetForm = () => {
        setName('');
        setDosage('');
        setTime('');
        setPeriod('morning');
        setNotificationsEnabled(true);
        setCurrentStock('');
        setEditingId(null);
    };

    const getSections = () => {
        // Filter by SELECTED PROFILE
        const profileMeds = medications.filter(m => m.profileId === selectedProfileId);

        return PERIODS.map(p => ({
            title: p.label,
            periodId: p.id,
            icon: p.icon,
            color: p.color,
            data: profileMeds.filter(m => m.period === p.id).sort((a, b) => a.time.localeCompare(b.time))
        })).filter(section => section.data.length > 0 || true); // Use true to force empty sections if we want vacant placeholders
    };

    const handleManageAction = (action) => {
        if (action === 'history') {
            loadHistory();
            setHistoryVisible(true);
            return;
        }

        if (action === 'add') {
            setManageMode('add');
            resetForm();
            setModalVisible(true);
        } else if (action === 'edit') {
            setManageMode(manageMode === 'edit' ? null : 'edit');
        } else if (action === 'delete') {
            setManageMode(manageMode === 'delete' ? null : 'delete');
        }
    };

    const getProfileIcon = (profile) => {
        if (profile.tipo === 'pet') {
            // Simple mapping for demo
            return profile.especie === 'gato' ? 'logo-octocat' : 'paw';
        }
        const faixa = ProfileService.getFaixaEtaria(profile.dataNascimento);
        if (faixa === 'baby') return 'happy-outline';
        if (faixa === 'elderly') return 'glasses-outline';
        return 'person-outline';
    };

    return (
      <AppBackground variant="subtle">
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
                <H2 style={styles.headerTitle}>{t('medications.title')}</H2>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setGuideVisible(true); }}>
                        <NeoIcon name="Trash" size={22} color={Neo.colors.primary[600]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); handleManageAction('history'); }}>
                        <NeoIcon name="Clock" size={22} color={Neo.colors.primary[600]} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Profile Selector */}
            <View style={styles.profileSelector}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: Neo.spacing.md }}>
                    {profiles.map(p => (
                        <TouchableOpacity
                            key={p.id}
                            style={[
                                styles.profileChip,
                                selectedProfileId === p.id && styles.profileChipActive
                            ]}
                            onPress={() => setSelectedProfileId(p.id)}
                        >
                            <View style={[styles.profileIconBox, selectedProfileId === p.id && { backgroundColor: '#FFF' }]}>
                                <NeoIcon
                                    name={getProfileIcon(p)}
                                    size={16}
                                    color={selectedProfileId === p.id ? Neo.colors.primary[500] : Neo.colors.neutral.white}
                                />
                            </View>
                            <Small style={[styles.profileName, selectedProfileId === p.id && styles.profileNameActive]}>
                                {p.nome}
                            </Small>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.content}>
                {/* LISTA */}
                <NeoCard variant="glass" style={[styles.mainCard, { ...Neo.shadows.md }]}>
                    <SectionList
                        sections={getSections()}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        renderSectionHeader={({ section: { title, icon, color } }) => (
                            <View style={styles.sectionHeader}>
                                <View style={[styles.sectionIcon, { backgroundColor: color }]}>
                                    <NeoIcon name={icon} size={16} color="#FFF" />
                                </View>
                                <H3 style={styles.sectionTitle}>{title}</H3>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.itemCard,
                                    item.taken && styles.itemCardTaken,
                                    manageMode === 'delete' && styles.itemCardDelete,
                                    manageMode === 'edit' && styles.itemCardEdit
                                ]}
                                onPress={() => toggleTaken(item.id)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.timeColumn}>
                                    <Body style={styles.timeText}>{item.time}</Body>
                                    {item.notifications && <NeoIcon name="Notification" size={12} color={Neo.colors.primary[500]} style={{ marginTop: 4 }} />}
                                </View>

                                <View style={styles.infoColumn}>
                                    <H3 style={[styles.medName, item.taken && styles.textTaken]}>{item.name}</H3>
                                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                        {item.dosage ? <Small style={styles.medDosage}>{item.dosage}</Small> : null}
                                        {item.stock !== null && (
                                            <Small style={[styles.medStock, item.stock <= item.lowStockThreshold && styles.stockLow]}>
                                                {t('medications.stock')}: {item.stock}
                                            </Small>
                                        )}
                                    </View>
                                </View>

                                <View style={[styles.checkCircle, item.taken && styles.checkCircleActive]}>
                                    {manageMode === 'delete' ? (
                                        <NeoIcon name="Trash" size={16} color={Neo.colors.feedback.error} />
                                    ) : manageMode === 'edit' ? (
                                        <NeoIcon name="Edit2" size={16} color={Neo.colors.primary[500]} />
                                    ) : (
                                        item.taken && <NeoIcon name="TickSquare" size={16} color={Neo.colors.neutral.white} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 20 }}>
                                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0F2F1', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <NeoIcon name="health" size={40} color={Neo.colors.primary[500]} />
                                </View>
                                <H3 style={{ color: Neo.colors.neutral[900], marginBottom: 8, textAlign: 'center' }}>{t('medications.noRoutine')}</H3>
                                <Body style={{ color: Neo.colors.neutral[500], textAlign: 'center', lineHeight: 22 }}>
                                    {t('medications.noRoutineMsg')}
                                </Body>
                            </View>
                        }
                    />
                </NeoCard>

                {/* CONTROLES */}
                <NeoCard variant="glass" style={[styles.manageCard, { ...Neo.shadows.sm }]}>
                    <H3 style={styles.cardTitle}>{t('medications.manageRoutines')}</H3>
                    <View style={styles.manageButtonsRow}>
                        <TouchableOpacity style={styles.manageBtn} onPress={() => handleManageAction('add')}>
                            <View style={[styles.manageIcon, { backgroundColor: '#E8F5E9' }]}>
                                <NeoIcon name="Add" size={24} color={Neo.colors.feedback.success} />
                            </View>
                            <Small style={styles.manageLabel}>{t('medications.add')}</Small>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.manageBtn, manageMode === 'edit' && styles.manageBtnActive]}
                            onPress={() => handleManageAction('edit')}
                        >
                            <View style={[styles.manageIcon, { backgroundColor: '#E3F2FD' }]}>
                                <NeoIcon name="Edit2" size={24} color={Neo.colors.primary[500]} />
                            </View>
                            <Small style={styles.manageLabel}>{t('medications.edit')}</Small>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.manageBtn, manageMode === 'delete' && styles.manageBtnActive]}
                            onPress={() => handleManageAction('delete')}
                        >
                            <View style={[styles.manageIcon, { backgroundColor: '#FFEBEE' }]}>
                                <NeoIcon name="Trash" size={24} color={Neo.colors.feedback.error} />
                            </View>
                            <Small style={styles.manageLabel}>{t('medications.delete')}</Small>
                        </TouchableOpacity>
                    </View>
                </NeoCard>
            </View>

            {/* MODAL HISTORY */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={historyVisible}
                onRequestClose={() => setHistoryVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <Text style={styles.modalTitle}>{t('medications.doseHistory')}</Text>
                            <TouchableOpacity onPress={() => setHistoryVisible(false)}>
                                <NeoIcon name="CloseSquare" size={24} color={Neo.colors.neutral[500]} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={{ maxHeight: 400 }}>
                            {historyLog.length === 0 ? (
                                <Text style={styles.emptyText}>{t('medications.historyEmpty')}</Text>
                            ) : (
                                historyLog.map(log => (
                                    <View key={log.id} style={styles.historyItem}>
                                        <NeoIcon name="TickCircle" size={20} color={Neo.colors.feedback.success} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.historyName}>{log.medName}</Text>
                                            <Text style={styles.historyTime}>
                                                {new Date(log.timestamp).toLocaleDateString()} às {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>


            {/* MODAL ADD/EDIT */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{manageMode === 'edit' ? t('medications.editMed') : t('medications.newMed')}</Text>

                        {/* Period Selector */}
                        <View style={styles.periodSelector}>
                            {PERIODS.map(p => (
                                <TouchableOpacity
                                    key={p.id}
                                    style={[
                                        styles.periodOption,
                                        period === p.id && { backgroundColor: p.color, borderColor: p.color }
                                    ]}
                                    onPress={() => setPeriod(p.id)}
                                >
                                    <NeoIcon
                                        name={p.icon}
                                        size={20}
                                        color={period === p.id ? Neo.colors.neutral.white : Neo.colors.neutral[500]}
                                    />
                                    <Text style={[
                                        styles.periodText,
                                        period === p.id && { color: Neo.colors.neutral.white, fontWeight: 'bold' }
                                    ]}>
                                        {p.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder={t('medications.medName')}
                            value={name}
                            onChangeText={setName}
                        />
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginRight: 8 }]}
                                placeholder={t('medications.dose')}
                                value={dosage}
                                onChangeText={setDosage}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder={t('medications.time')}
                                value={time}
                                onChangeText={setTime}
                                keyboardType="numbers-and-punctuation"
                            />
                        </View>

                        {/* Configs Row */}
                        <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 16 }]}>
                            {/* Notifications */}
                            <View style={styles.configItem}>
                                <Text style={styles.configLabel}>{t('medications.notification')}</Text>
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                    trackColor={{ false: Neo.colors.neutral[400], true: Neo.colors.primary[500] }}
                                />
                            </View>

                            {/* Stock */}
                            <View style={[styles.configItem, { flex: 1, marginLeft: 16 }]}>
                                <Text style={styles.configLabel}>{t('medications.currentStock')}</Text>
                                <TextInput
                                    style={[styles.input, { marginBottom: 0, height: 40 }]}
                                    placeholder={t('medications.stockQty')}
                                    value={currentStock}
                                    onChangeText={setCurrentStock}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>{t('medications.cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={saveMedication}
                            >
                                <Text style={styles.saveButtonText}>{t('medications.save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL DESCARTE SEGURO */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={guideVisible}
                onRequestClose={() => setGuideVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <Text style={styles.modalTitle}>{t('medications.guideTitle')}</Text>
                            <TouchableOpacity onPress={() => setGuideVisible(false)}>
                                <NeoIcon name="CloseSquare" size={24} color={Neo.colors.neutral[500]} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="Trash" size={32} color="#10B981" />
                                </View>
                                <H3 style={{ color: '#065F46', textAlign: 'center', marginBottom: 8 }}>{t('medications.guideP1')}</H3>
                            </View>
                            
                            <View style={{ backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <NeoIcon name="DocumentText" size={20} color="#3B82F6" />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 8, color: '#1E293B' }}>{t('headersFirst.caixasEBulas', 'Caixas e Bulas')}</Text>
                                </View>
                                <Text style={{ color: '#475569', fontSize: 13, lineHeight: 20 }}>{t('medications.guideP2')}</Text>
                            </View>

                            <View style={{ backgroundColor: '#FEF2F2', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#FECACA' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <NeoIcon name="Warning2" size={20} color="#EF4444" />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 8, color: '#991B1B' }}>{t('headersFirst.pLulasEFrascos', 'Pílulas e Frascos')}</Text>
                                </View>
                                <Text style={{ color: '#7F1D1D', fontSize: 13, lineHeight: 20 }}>{t('medications.guideP3')}</Text>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: '#10B981', marginTop: 16 }]} onPress={() => setGuideVisible(false)}>
                            <Text style={styles.saveBtnText}>{t('headersFirst.entendi', 'Entendi')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        justifyContent: 'space-between',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: 14,
    },
    backButton: {
        width: 36, height: 36, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center', justifyContent: 'center',
    },
    headerTitle: {
        color: Neo.colors.neutral[900],
        textAlign: 'center',
    },
    profileSelector: {
        paddingVertical: 10,
        backgroundColor: Neo.colors.primary[600],
        borderRadius: 0,
    },
    profileChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        marginRight: 8,
    },
    profileChipActive: {
        backgroundColor: '#FFF',
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    profileIconBox: {
        width: 28, // Slights larger
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    profileName: {
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
        fontSize: 14,
    },
    profileNameActive: {
        color: Neo.colors.primary[500],
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: Neo.spacing.md,
    },
    mainCard: {
        flex: 1,
        backgroundColor: Neo.colors.surface,
        borderRadius: Neo.radius.lg,
        padding: Neo.spacing.md,
        marginBottom: Neo.spacing.md,
        ...Neo.shadows.sm,
    },
    manageCard: {
        backgroundColor: Neo.colors.surface,
        borderRadius: Neo.radius.lg,
        padding: Neo.spacing.md,
        ...Neo.shadows.sm,
    },
    cardTitle: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
        marginBottom: Neo.spacing.md,
    },
    listContent: {
        paddingBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Neo.spacing.sm,
        marginBottom: Neo.spacing.xs,
    },
    sectionIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: Typography.sizes.sm,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[500],
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.neutral[100],
        borderRadius: Neo.radius.md,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
    },
    itemCardTaken: {
        opacity: 0.6,
        backgroundColor: '#F5F5F5',
    },
    itemCardDelete: {
        borderColor: Neo.colors.feedback.error,
        backgroundColor: '#FFEBEE',
    },
    itemCardEdit: {
        borderColor: Neo.colors.primary[500],
        backgroundColor: '#E3F2FD',
    },
    timeColumn: {
        marginRight: 12,
        width: 50,
        alignItems: 'center',
    },
    timeText: {
        fontSize: Typography.sizes.md,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
    },
    infoColumn: {
        flex: 1,
    },
    medName: {
        fontSize: Typography.sizes.md,
        fontWeight: '600',
        color: Neo.colors.neutral[900],
    },
    medDosage: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[500],
    },
    medStock: {
        fontSize: 10,
        color: Neo.colors.neutral[400],
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4,
    },
    stockLow: {
        color: Neo.colors.feedback.error,
        backgroundColor: '#FFEBEE',
        fontWeight: 'bold',
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Neo.colors.neutral[200],
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkCircleActive: {
        backgroundColor: Neo.colors.feedback.success,
        borderColor: Neo.colors.feedback.success,
    },
    manageButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    manageBtn: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    manageBtnActive: {
        backgroundColor: '#F0F0F0',
    },
    manageIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    manageLabel: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[900],
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 20,
    },
    emptyText: {
        color: Neo.colors.neutral[400],
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: Neo.spacing.lg,
    },
    modalContent: {
        backgroundColor: Neo.colors.surface,
        borderRadius: Neo.radius.lg,
        padding: Neo.spacing.lg,
        ...Neo.shadows.md,
    },
    modalTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        marginBottom: Neo.spacing.md,
        textAlign: 'center',
    },
    configItem: {
        alignItems: 'flex-start',
    },
    configLabel: {
        fontSize: 12,
        color: Neo.colors.neutral[500],
        marginBottom: 4,
    },
    periodSelector: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: Neo.spacing.lg,
    },
    periodOption: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        borderRadius: Neo.radius.md,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
    },
    periodText: {
        fontSize: 12,
        marginTop: 4,
        color: Neo.colors.neutral[500],
    },
    input: {
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
        borderRadius: Neo.radius.md,
        padding: 12,
        marginBottom: 12,
        fontSize: Typography.sizes.md,
    },
    row: {
        flexDirection: 'row',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: Neo.radius.md,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Neo.colors.neutral[200],
    },
    saveButton: {
        backgroundColor: Neo.colors.primary[500],
    },
    cancelButtonText: {
        fontWeight: 'bold',
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    textTaken: {
        textDecorationLine: 'line-through',
        color: Neo.colors.neutral[400],
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
        gap: 12,
    },
    historyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
    },
    historyTime: {
        fontSize: 12,
        color: Neo.colors.neutral[500],
    }
});


