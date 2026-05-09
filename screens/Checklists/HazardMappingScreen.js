import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../../components/NeoIcon';
import { Colors, Shadows } from '../../utils/Theme';
import { HAZARD_DATABASE } from '../../data/HazardDatabase';
import ProfileService from '../../services/ProfileService';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function HazardMappingScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        const saved = await ProfileService.getInventory();
        setInventory(saved || []);
        setLoading(false);
    };

    const toggleItem = (itemId) => {
        setInventory(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };

    const saveAndExit = async () => {
        await ProfileService.saveInventory(inventory);
        navigation.goBack();
    };

    const renderCategory = (key) => {
        const category = HAZARD_DATABASE[key];

        return (
            <View key={key} style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionEmoji}>{category.emoji}</Text>
                    <Text style={styles.sectionTitle}>{category.label}</Text>
                </View>

                <View style={styles.itemsContainer}>
                    {category.items.map(item => {
                        const isSelected = inventory.includes(item.id);
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.itemCard, isSelected && styles.itemCardSelected]}
                                onPress={() => toggleItem(item.id)}
                            >
                                <View style={styles.itemRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.itemLabel, isSelected && styles.itemLabelSelected]}>{item.label}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                            {item.riskLevel === 'CRITICO' && (
                                                <View style={styles.badgeRisk}>
                                                    <Text style={styles.badgeText}>{t('headersFirst.cRTICO', 'CRÍTICO')}</Text>
                                                </View>
                                            )}
                                            <Text style={styles.itemHazardPreview}>
                                                {item.hazards.length} risco(s)
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                        {isSelected && <NeoIcon name="TickSquare" size={16} color="#FFF" />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF5722', '#F4511E']}
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('headersFirst.mapeamentoDeAtivos', 'Mapeamento de Ativos')}</Text>
                    <TouchableOpacity onPress={saveAndExit} style={styles.saveHeaderButton}>
                        <Text style={styles.saveHeaderText}>{t('headersFirst.salvar', 'Salvar')}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerSubtitle}>
                    {t('headersFirst.marqueOQueVocPossuiEmCasaParaAtivarOsAle', 'Marque o que você possui em casa para ativar os alertas de proteção personalizados.')}
                </Text>
            </LinearGradient>

            {loading ? (
                <View style={styles.centerLoading}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.content}>
                    {Object.keys(HAZARD_DATABASE).map(key => renderCategory(key))}

                    <TouchableOpacity style={styles.bigSaveButton} onPress={saveAndExit}>
                        <Text style={styles.bigSaveText}>Confirmar Inventário ({inventory.length} itens)</Text>
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        paddingTop: 50, paddingBottom: 24, paddingHorizontal: 20,
        borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
        ...Shadows.md
    },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
    headerSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
    saveHeaderButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    saveHeaderText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

    content: { padding: 16 },
    section: { marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingLeft: 4 },
    sectionEmoji: { fontSize: 24, marginRight: 8 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },

    itemsContainer: { gap: 8 },
    itemCard: {
        backgroundColor: 'transparent', borderRadius: 12, padding: 16,
        borderWidth: 1, borderColor: '#EEE',
        ...Shadows.sm
    },
    itemCardSelected: {
        borderColor: '#FF5722', backgroundColor: '#FFFBE6'
    },
    itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    itemLabel: { fontSize: 16, color: '#333', fontWeight: '500' },
    itemLabelSelected: { color: '#BF360C', fontWeight: 'bold' },

    itemHazardPreview: { fontSize: 11, color: '#888', marginLeft: 8 },
    badgeRisk: { backgroundColor: '#FFEBEE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    badgeText: { fontSize: 10, color: '#D32F2F', fontWeight: 'bold' },

    checkbox: {
        width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#CCC',
        justifyContent: 'center', alignItems: 'center'
    },
    checkboxSelected: {
        backgroundColor: '#FF5722', borderColor: '#FF5722'
    },

    bigSaveButton: {
        backgroundColor: '#FF5722', padding: 18, borderRadius: 16,
        alignItems: 'center', marginTop: 20,
        ...Shadows.md
    },
    bigSaveText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
    centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
