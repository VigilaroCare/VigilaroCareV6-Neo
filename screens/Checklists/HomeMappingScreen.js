
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    SafeAreaView
} from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileService from '../../services/ProfileService';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

import { AMBIENTES_INTERNOS, AREAS_EXTERNAS, UTILIDADES } from '../../constants/HousingOptions';

// Helper to find an item by id from the constants
const findOption = (id) => {
    const all = [...AMBIENTES_INTERNOS, ...AREAS_EXTERNAS, ...UTILIDADES];
    return all.find(item => item.id === id) || { id, label: id, icon: 'Home' }; // Fallback
};

const HOME_CATEGORIES = [
    {
        id: 'convivencia',
        label: '🛋️ Convivência e Estar',
        items: [
            findOption('sala_estar'),
            findOption('sala_jantar'),
            findOption('cozinha'),
            findOption('copa'),
            findOption('escritorio'),
            findOption('lavabo')
        ],
    },
    {
        id: 'intima',
        label: '🛏️ Área de Descanso',
        items: [
            findOption('quarto_casal'),
            findOption('quarto_solteiro'),
            findOption('quarto_infantil'),
            findOption('quarto_bebe'),
            findOption('quarto_idoso'),
            findOption('quarto_hospedes'),
            findOption('banheiro_social'),
            findOption('banheiro_suite')
        ],
    },
    {
        id: 'servicos',
        label: '🧹 Serviços e Utilidades',
        items: [
            findOption('lavanderia'),
            findOption('garagem'),
            findOption('sotao_porao'),
            findOption('deposito_oficina'),
            findOption('central_gas')
        ],
    },
    {
        id: 'lazer',
        label: '🌳 Lazer e Exterior',
        items: [
            findOption('quintal'),
            findOption('jardim'),
            findOption('horta'),
            findOption('piscina'),
            findOption('churrasqueira'),
            findOption('parquinho'),
            findOption('area_pet'),
            findOption('frente')
        ],
    },
    {
        id: 'circulacao',
        label: '🪜 Circulação e Acessos',
        items: [
            findOption('escadas_internas'),
            findOption('corredor'),
            findOption('varanda'),
            findOption('terraco')
        ],
    }
];

export default function HomeMappingScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        loadMapping();
    }, []);

    const loadMapping = async () => {
        try {
            const mappedItems = await ProfileService.getMapping();
            if (mappedItems && mappedItems.length > 0) {
                // Migrate legacy IDs
                const legacyMap = {
                    'sala': 'sala_estar',
                    'oficina': 'deposito_oficina',
                    'quarto_adulto': 'quarto_casal',
                    'banheiro': 'banheiro_social',
                    'area_servico': 'lavanderia',
                    'deposito': 'sotao_porao',
                    'jardim_horta': 'jardim',
                    'canil': 'area_pet',
                    'escadas': 'escadas_internas',
                    'hall_corredor': 'corredor'
                };
                
                let cleanItems = mappedItems.map(item => legacyMap[item] || item);
                // Remove duplicates after migration
                cleanItems = [...new Set(cleanItems)];
                
                setSelectedItems(cleanItems);
            }
        } catch (e) {
            console.error("Error loading mapping:", e);
        }
    };

    const toggleItem = (id, value) => {
        if (value) {
            if (!selectedItems.includes(id)) {
                setSelectedItems(prev => [...prev, id]);
            }
        } else {
            setSelectedItems(prev => prev.filter(item => item !== id));
        }
    };

    const saveMapping = async () => {
        try {
            await ProfileService.saveMapping(selectedItems);
            // Removed legacy @home_mapping save to prevent crosstalk between residences

            Alert.alert(
                "Ambientes Identificados!",
                "Agora vamos encontrar os riscos escondidos neles e aprender como se proteger.",
                [{ text: "Verificar Riscos", onPress: () => navigation.navigate('OndeProteger') }]
            );
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar.");
        }
    };

    return (
        <AppBackground variant="subtle">
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{t('headersFirst.mapeamentoDaCasa', 'Mapeamento da Casa')}</Text>
                    <Text style={styles.headerSubtitle}>{t('headersFirst.indiqueOQueExisteNaSuaCasa', 'Indique o que existe na sua casa')}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {HOME_CATEGORIES.map((category) => (
                    <View key={category.id} style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{category.label}</Text>
                        <View style={styles.card}>
                            {category.items.map((item, index) => {
                                const isSelected = selectedItems.includes(item.id);
                                return (
                                    <View key={item.id} style={[
                                        styles.itemRow,
                                        index < category.items.length - 1 && styles.borderBottom
                                    ]}>
                                        <View style={styles.iconBox}>
                                            <NeoIcon name={item.icon} size={24} color={Colors.primary} variant="Bold" />
                                        </View>
                                        <Text style={styles.itemLabel}>{item.label}</Text>

                                        <View style={styles.toggleContainer}>
                                            <TouchableOpacity
                                                style={[styles.toggleBtn, !isSelected && styles.btnNoActive]}
                                                onPress={() => toggleItem(item.id, false)}
                                            >
                                                <Text style={[styles.toggleText, !isSelected && styles.textNoActive]}>{t('headersFirst.nO', 'NÃO')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.toggleBtn, isSelected && styles.btnYesActive]}
                                                onPress={() => toggleItem(item.id, true)}
                                            >
                                                <Text style={[styles.toggleText, isSelected && { color: '#1B5E20' }]}>{t('headersFirst.sIM', 'SIM')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.saveButton} onPress={saveMapping}>
                    <Text style={styles.saveButtonText}>{t('headersFirst.salvarMapeamento', 'Salvar Mapeamento')}</Text>
                    <NeoIcon name="TickCircle" size={24} color="#FFF" variant="Bold" />
                </TouchableOpacity>
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F7' },
    header: {
        backgroundColor: Colors.primary,
        padding: 20, paddingTop: 40,
        borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
        flexDirection: 'row', alignItems: 'center', gap: 16,
        ...Shadows.md
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
    content: { padding: 16 },
    sectionContainer: { marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 8, marginLeft: 4 },
    card: {
        backgroundColor: 'transparent', borderRadius: 16, ...Shadows.sm, overflow: 'hidden'
    },
    itemRow: {
        flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'space-between'
    },
    borderBottom: {
        borderBottomWidth: 1, borderBottomColor: '#F0F0F0'
    },
    iconBox: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: '#E3F2FD',
        justifyContent: 'center', alignItems: 'center', marginRight: 12
    },
    itemLabel: {
        flex: 1, fontSize: 16, color: '#333', fontWeight: '500'
    },
    toggleContainer: {
        flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 8, padding: 2
    },
    toggleBtn: {
        paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6
    },
    // Suavizando as cores (Pastéis com texto escuro)
    btnNoActive: { backgroundColor: '#FFCDD2' }, // Vermelho Suave (Red 100)
    btnYesActive: { backgroundColor: '#C8E6C9' }, // Verde Suave (Green 100)
    toggleText: { fontSize: 12, fontWeight: 'bold', color: '#9E9E9E' }, // Cinza para inativos
    textNoActive: { color: '#B71C1C' }, // Vermelho Escuro
    textActive: { color: '#333' }, // Legacy unused?

    saveButton: {
        backgroundColor: Colors.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        padding: 18, borderRadius: 16, gap: 8, ...Shadows.md, marginTop: 10
    },
    saveButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
