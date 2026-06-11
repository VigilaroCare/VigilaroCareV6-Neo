import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform, DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CHECKLIST_ITEMS = [
    {
        id: 'sweep',
        title: 'Varredura Pente-Fino',
        icon: 'Eye',
        color: Neo.colors.feedback.error,
        items: [
            { id: 'safe', label: 'Cofre vazio e aberto (Passaportes/Dinheiro)' },
            { id: 'plugs', label: 'Carregadores retirados das tomadas' },
            { id: 'bathroom', label: 'Box e pia vazios (Shampoos, escovas)' },
            { id: 'under_bed', label: 'Verificar debaixo da cama e travesseiros' },
            { id: 'drawers', label: 'Abrir todas as gavetas e armários' },
        ]
    },
    {
        id: 'returns',
        title: 'Devoluções e Acertos',
        icon: 'Key',
        color: Neo.colors.primary[500],
        items: [
            { id: 'keys', label: 'Chaves ou cartões do quarto' },
            { id: 'towels', label: 'Cartões de toalha de piscina/praia' },
            { id: 'consumables', label: 'Conferir conta do frigobar antes do balcão' },
            { id: 'car', label: 'Chaves do carro alugado e tanque cheio (se aplicável)' },
        ]
    },
    {
        id: 'packing',
        title: 'Malas de Retorno',
        icon: 'BoxTick',
        color: Neo.colors.feedback.success,
        items: [
            { id: 'liquids', label: 'Líquidos bem fechados (em sacos plásticos)' },
            { id: 'weight', label: 'Peso estimado OK para o voo (cuidado com compras)' },
            { id: 'dirty_clothes', label: 'Roupas sujas separadas em sacos isolados' },
            { id: 'tags', label: 'Tags de identificação presas nas malas' },
        ]
    }
];

const TOTAL_ITEMS = CHECKLIST_ITEMS.reduce((n, s) => n + s.items.length, 0);

export default function InspecaoRetornoScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedSections, setExpandedSections] = useState({ sweep: true, returns: true, packing: true });

    // Ao concluir TODOS os itens do checkout, marca o retorno na viagem ativa.
    // O footer lê esse flag e inverte o avião ("voltando pra casa") até a
    // viagem ser encerrada. Só marca se houver viagem ativa; roda uma vez.
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const markedRef = useRef(false);
    useEffect(() => {
        if (markedRef.current || checkedCount < TOTAL_ITEMS) return;
        markedRef.current = true;
        (async () => {
            try {
                const raw = await AsyncStorage.getItem('@active_trip');
                if (!raw) return; // sem viagem ativa — nada a marcar
                const trip = JSON.parse(raw);
                trip.retornoConcluido = true;
                await AsyncStorage.setItem('@active_trip', JSON.stringify(trip));
                DeviceEventEmitter.emit('travel_return_changed', true);
            } catch (e) {
                markedRef.current = false; // permite nova tentativa se falhar
            }
        })();
    }, [checkedCount]);

    const toggleItem = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderSection = (section) => {
        const isExpanded = expandedSections[section.id];
        const completedCount = section.items.filter(item => checkedItems[item.id]).length;
        const totalCount = section.items.length;
        const isCompleted = completedCount === totalCount;

        return (
            <NeoCard key={section.id} variant="elevated" style={{ marginBottom: 16, overflow: 'hidden' }}>
                <TouchableOpacity
                    onPress={() => toggleSection(section.id)}
                    style={{
                        flexDirection: 'row', alignItems: 'center', padding: 16,
                        backgroundColor: isCompleted ? Neo.colors.feedback.success + '1A' : 'transparent'
                    }}
                >
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: section.color + '15', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <NeoIcon name={section.icon} size={20} color={isCompleted ? Neo.colors.feedback.success : section.color} variant="Bold" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <H3 style={{ color: isCompleted ? Neo.colors.feedback.success : Neo.colors.neutral[800] }}>{section.title}</H3>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{completedCount} de {totalCount} concluídos</Small>
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <View style={{ padding: 16, paddingTop: 0 }}>
                        <View style={{ height: 1, backgroundColor: Neo.colors.neutral[100], marginBottom: 12 }} />
                        {section.items.map(item => {
                            const isChecked = checkedItems[item.id];
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => toggleItem(item.id)}
                                    style={{
                                        flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
                                        borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[50],
                                        opacity: isChecked ? 0.6 : 1
                                    }}
                                >
                                    <View style={{
                                        width: 24, height: 24, borderRadius: 12,
                                        borderWidth: 2, borderColor: isChecked ? Neo.colors.feedback.success : Neo.colors.neutral[300],
                                        backgroundColor: isChecked ? Neo.colors.feedback.success : 'transparent',
                                        alignItems: 'center', justifyContent: 'center', marginRight: 12
                                    }}>
                                        {isChecked && <NeoIcon name="TickCircle" size={14} color={Neo.colors.neutral.white} variant="Bold" />}
                                    </View>
                                    <Body style={{ flex: 1, color: isChecked ? Neo.colors.neutral[500] : Neo.colors.neutral[800], textDecorationLine: isChecked ? 'line-through' : 'none' }}>
                                        {item.label}
                                    </Body>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </NeoCard>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
                        }}
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 44 }}>
                        <H2>{t('headersFirst.safeCheckout', 'Checkout Seguro')}</H2>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{t('headersFirst.inspeODeRetornoFimDaViagem', 'Inspeção de Retorno (Fim da Viagem)')}</Small>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 190 }}>
                    <View style={{ alignItems: 'center', marginBottom: 24 }}>
                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Neo.colors.feedback.error + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <NeoIcon name="SearchNormal" size={32} color={Neo.colors.feedback.error} variant="Bold" />
                        </View>
                        <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600] }}>
                            {t('headersFirst.aHoraDeIrEmboraQuandoOCansaOBateEOsPiore', 'A hora de ir embora é quando o cansaço bate e os piores esquecimentos acontecem. Faça esta varredura pente-fino antes de entregar a chave.')}
                        </Body>
                    </View>

                    {CHECKLIST_ITEMS.map(renderSection)}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
