import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { Colors, Spacing, Shadows, BorderRadius } from '../../utils/Theme';
import { MEDICINE_ITEMS } from '../../data/kits/medicines';
import KitService from '../../services/KitService';
import ProfileService from '../../services/ProfileService';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';

export default function KitRemediosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [checkedItems, setCheckedItems] = useState([]);
    const [residenceId, setResidenceId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const id = await ProfileService.getActiveResidenceId();
            setResidenceId(id);
            const state = await KitService.loadKitState('remedios', id);
            // KitService agora retorna Array, então estamos seguros
            setCheckedItems(state || []);
        } catch (error) {
            console.error('Error loading remedios state:', error);
        }
    };

    const toggleItem = async (id) => {
        let newItems;
        if (checkedItems.includes(id)) {
            newItems = checkedItems.filter(item => item !== id);
        } else {
            newItems = [...checkedItems, id];
        }
        setCheckedItems(newItems);

        if (residenceId) {
            await KitService.saveKitState('remedios', residenceId, newItems);
        }
    };

    const progress = checkedItems.length / MEDICINE_ITEMS.length;

    return (
        <View style={styles.container}>
            <View style={[styles.header, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('headersFirst.medicineKit', 'Kit Remédios')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
                    <NeoIcon name="Home2" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.heroCard}>
                    <View style={styles.heroIconCircle}>
                        <NeoIcon name="Weight" size={40} color="#FFF" />
                    </View>
                    <Text style={styles.heroTitle}>{t('headersFirst.seuPortaRemDios', 'Seu Porta Remédios')}</Text>
                    <Text style={styles.heroSubtitle}>
                        {t('headersFirst.umaFarmCiaDomSticaOrganizadaGaranteAcess', 'Uma farmácia doméstica organizada garante acesso rápido a medicamentos. Mantenha controle rigoroso de validade e armazenamento para evitar intoxicações e garantir eficácia.')}
                    </Text>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress * 100)}% completo</Text>
                </View>

                <Text style={styles.sectionTitle}>{t('headersFirst.listaDeItensEssenciais', 'Lista de Itens Essenciais')}</Text>

                {MEDICINE_ITEMS.map((item) => {
                    const isChecked = checkedItems.includes(item.id);
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.itemCard, isChecked && styles.itemCardChecked]}
                            onPress={() => toggleItem(item.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.itemIcon, isChecked ? styles.itemIconChecked : styles.itemIconUnchecked]}>
                                <NeoIcon name={isChecked ? "checkmark" : item.icon} size={20} color={isChecked ? "#FFF" : "#666"} />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={[styles.itemName, isChecked && styles.itemNameChecked]}>{item.name}</Text>
                                <Text style={styles.itemDesc}>{item.desc}</Text>
                            </View>
                            <View style={styles.checkbox}>
                                {isChecked && <NeoIcon name="TickSquare" size={16} color="#FFF" />}
                            </View>
                        </TouchableOpacity>
                    );
                })}


                <View style={styles.tipBox}>
                    <NeoIcon name="InfoCircle" size={24} color="#C2185B" />
                    <Text style={styles.tipText}>
                        {t('headersFirst.mantenhaRemDiosLongeDoAlcanceDeCrianAsEV', 'Mantenha remédios longe do alcance de crianças e verifique a validade regularmente.')}
                    </Text>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
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
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(229, 229, 234, 0.6)',
    },
    backBtn: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: 20,
        paddingBottom: 120,
    },
    heroCard: {
        backgroundColor: '#E91E63', // Pink for Medicine
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        ...Shadows.md,
    },
    heroIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginBottom: 20,
    },
    progressBarBg: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 4,
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: 4,
    },
    progressText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    itemCardChecked: {
        backgroundColor: '#FCE4EC',
        borderColor: '#E91E63',
    },
    itemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemIconUnchecked: {
        backgroundColor: 'transparent',
    },
    itemIconChecked: {
        backgroundColor: '#E91E63',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    itemNameChecked: {
        color: '#C2185B',
        textDecorationLine: 'line-through',
    },
    itemDesc: {
        fontSize: 12,
        color: '#888',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    tipBox: {
        flexDirection: 'row',
        backgroundColor: '#FCE4EC',
        padding: 16,
        borderRadius: 12,
        marginTop: 12,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#C2185B',
    },
    tipText: {
        flex: 1,
        marginLeft: 12,
        color: '#880E4F',
        fontSize: 14,
    },
});
