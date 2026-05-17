import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft2 } from 'iconsax-react-native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H2, Body, Small } from '../../components/NeoTypography';
import { CHECKLISTS } from '../../data/mapeamento_dados';
import { t_field } from '../../utils/getLocalizedField';

const { width } = Dimensions.get('window');

export default function KitsMenuScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const kitParam = route.params?.kitId;

    // Dados dos Kits vêm de CHECKLISTS.kits_prontidao
    const kitsData = CHECKLISTS.kits_prontidao?.categorias || [];

    const handleOpenKit = (categoria, index) => {
        // Preparar navegação sequencial para Kits
        const sequentialRooms = kitsData.map(k => ({
            roomId: 'kits_prontidao', // Mesmo ID pai
            roomName: k.nome,
            roomColor: '#F97316',
            roomIcon: k.emoji,
            categoryFilter: k.nome // CRUCIAL: O filtro de categoria define o conteúdo
        }));

        navigation.navigate('ChecklistDetail', {
            roomId: 'kits_prontidao', // ID pai
            roomName: categoria.nome, // Nome do Kit específico
            roomColor: '#F97316', // Laranja do Kit
            roomIcon: categoria.emoji,
            categoryFilter: categoria.nome, // Parâmetro para filtrar itens na próxima tela
            sequentialRooms,
            currentRoomIndex: index
        });
    };

    // Deep Link Logic: Auto-open kit if kitId is passed
    useEffect(() => {
        if (kitParam && kitsData.length > 0) {
            const mapping = {
                'epis': 'Equipamentos de Proteção (EPIs)',
                'tools': 'Caixa de Ferramentas',
                'emergency_support': 'Kits de Apoio e Emergência',
                'first_aid': 'Kit de Primeiros Socorros / Curativos',
                'farmacinha': 'Farmácia Caseira',
                'pet': 'Prontidão Pet'
            };

            const targetName = mapping[kitParam];
            const kitIndex = kitsData.findIndex(k => k.nome === targetName);

            if (kitIndex !== -1) {
                // Pequeno delay para garantir que a tela carregou
                const timer = setTimeout(() => {
                    handleOpenKit(kitsData[kitIndex], kitIndex);
                    // Limpar params para não abrir de novo se voltar
                    navigation.setParams({ kitId: null });
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [kitParam]);

    return (
        <AppBackground>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

                {/* Header Premium Neo (Glass) */}
                <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
                    <NeoCard variant="glass" style={styles.headerCard}>
                        <View style={styles.headerTopRow}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowLeft2 size={24} color={Neo.colors.primary[600]} />
                            </TouchableOpacity>

                            <View style={styles.headerTitleContainer}>
                                <H2 style={{ color: Neo.colors.primary[600] }}>{t('headersFirst.kitsDeProntidO', 'Kits de Prontidão')}</H2>
                                <Body style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.selecioneUmaCategoria', 'Selecione uma categoria')}</Body>
                            </View>
                        </View>
                    </NeoCard>
                </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {kitsData.length === 0 ? (
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: '#999', fontSize: 16 }}>
                            {t('headersFirst.aCaixaDeFerramentasEstVaziaEstrutureSeus', 'A caixa de ferramentas está vazia. Estruture seus kits de emergência para uma resposta rápida.')}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {kitsData.map((kit, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.gridItem}
                                onPress={() => handleOpenKit(kit, index)}
                                activeOpacity={0.7}
                            >
                                <NeoCard variant="glass" style={styles.kitCard}>
                                    <View style={[styles.iconCircle, { backgroundColor: Neo.colors.primary[50] }]}>
                                        <Text style={{ fontSize: 32 }}>{kit.emoji || '🎒'}</Text>
                                    </View>

                                    <Body style={styles.gridCardTitle} numberOfLines={2}>{t_field(kit, 'nome')}</Body>

                                    <Small style={styles.cardHelperText}>
                                        {kit.itens?.length || 0} {t('headersFirst.itensParaVerificar', 'itens para verificar')}
                                    </Small>
                                </NeoCard>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

            </ScrollView>
        </View>
    </AppBackground>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    headerCard: {
        padding: 16,
        alignItems: 'center',
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 40,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.03)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 190,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    gridItem: {
        width: '48%',
        aspectRatio: 0.9,
    },
    kitCard: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    gridCardTitle: {
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
        textAlign: 'center',
        marginBottom: 4,
    },
    cardHelperText: {
        color: Neo.colors.neutral[500],
        marginTop: 4,
    }
});
