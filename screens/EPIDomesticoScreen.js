/**
 * EPIDomesticoScreen.js
 * Tela de Equipamentos de Proteção Individual para Uso Doméstico
 * Vigilaro Care V5
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small } from '../components/NeoTypography';
import { EPI_DOMESTICO } from '../data/epi_domestico';
import VoiceAlert from '../services/VoiceAlertService';

export default function EPIDomesticoScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = EPI_DOMESTICO.categorias || [];
    const cenarios = EPI_DOMESTICO.cenarios_uso || [];

    const getCategoryIcon = (id) => {
        const icons = {
            'protecao_maos': 'hand-left',
            'protecao_olhos': 'eye',
            'protecao_respiratoria': 'fitness',
            'protecao_auditiva': 'ear',
            'protecao_pele': 'body',
            'protecao_pes': 'footsteps'
        };
        return icons[id] || 'shield-checkmark';
    };

    const getCategoryColor = (id) => {
        const colors = {
            'protecao_maos': '#3B82F6',
            'protecao_olhos': '#8B5CF6',
            'protecao_respiratoria': '#10B981',
            'protecao_auditiva': '#F59E0B',
            'protecao_pele': '#EC4899',
            'protecao_pes': '#6366F1'
        };
        return colors[id] || Neo.colors.primary[500];
    };

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
        setSelectedItem(null);
        // Anunciar categoria
        VoiceAlert.speak(`${category.nome}. ${category.descricao || ''}`);
    };

    const handleItemPress = (item) => {
        setSelectedItem(selectedItem?.id === item.id ? null : item);
        if (selectedItem?.id !== item.id) {
            VoiceAlert.speak(`${item.nome}. ${item.uso_recomendado || item.descricao || ''}`);
        }
    };

    const renderCategoryCard = (category) => {
        const isSelected = selectedCategory?.id === category.id;
        const color = getCategoryColor(category.id);

        return (
            <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, isSelected && { borderColor: color, borderWidth: 2 }]}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
            >
                <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
                    <NeoIcon name={getCategoryIcon(category.id)} size={28} color={color} />
                </View>
                <Text style={styles.categoryName}>{category.nome}</Text>
                <Text style={styles.categoryCount}>{category.itens?.length || 0} itens</Text>
            </TouchableOpacity>
        );
    };

    const renderItemCard = (item) => {
        const isExpanded = selectedItem?.id === item.id;
        const color = getCategoryColor(selectedCategory?.id);

        return (
            <TouchableOpacity
                key={item.id}
                style={[styles.itemCard, isExpanded && styles.itemCardExpanded]}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.85}
            >
                <View style={styles.itemHeader}>
                    <View style={[styles.itemIconSmall, { backgroundColor: color + '20' }]}>
                        <NeoIcon name="ShieldTick" size={20} color={color} />
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.nome}</Text>
                        {item.uso_recomendado && (
                            <Text style={styles.itemUsage} numberOfLines={isExpanded ? undefined : 1}>
                                {item.uso_recomendado}
                            </Text>
                        )}
                    </View>
                    <NeoIcon
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={Neo.colors.neutral[500]}
                    />
                </View>

                {isExpanded && (
                    <View style={styles.itemDetails}>
                        {item.caracteristicas && (
                            <View style={styles.detailSection}>
                                <Text style={styles.detailTitle}>{t('headersFirst.caracterSticas', 'Características:')}</Text>
                                {item.caracteristicas.map((c, i) => (
                                    <Text key={i} style={styles.detailText}>• {c}</Text>
                                ))}
                            </View>
                        )}

                        {item.dicas && (
                            <View style={styles.detailSection}>
                                <Text style={styles.detailTitle}>{t('headersFirst.Dicas', '💡 Dicas:')}</Text>
                                {item.dicas.map((d, i) => (
                                    <Text key={i} style={styles.detailText}>• {d}</Text>
                                ))}
                            </View>
                        )}

                        {item.onde_comprar && (
                            <View style={styles.detailSection}>
                                <Text style={styles.detailTitle}>{t('headersFirst.OndeEncontrar', '🛒 Onde encontrar:')}</Text>
                                <Text style={styles.detailText}>{item.onde_comprar}</Text>
                            </View>
                        )}
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderScenarioCard = (cenario) => (
        <View key={cenario.id} style={styles.scenarioCard}>
            <View style={styles.scenarioHeader}>
                <NeoIcon
                    name={cenario.icone || 'tools'}
                    size={24}
                    color={Neo.colors.primary[500]}
                />
                <Text style={styles.scenarioTitle}>{cenario.nome}</Text>
            </View>
            <View style={styles.scenarioEquipments}>
                {cenario.equipamentos?.map((eq, i) => (
                    <View key={i} style={styles.equipBadge}>
                        <Text style={styles.equipText}>{eq}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('headersFirst.ePIsDomSticos', 'EPIs Domésticos')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('headersFirst.proteOParaAtividadesDoDiaADia', 'Proteção para atividades do dia a dia')}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => VoiceAlert.speak(
                            'Equipamentos de Proteção Individual para uso doméstico. ' +
                            'Selecione uma categoria para ver os equipamentos recomendados.'
                        )}
                        style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Neo.colors.primary[100], alignItems: 'center', justifyContent: 'center' }}
                    >
                        <NeoIcon name="VolumeHigh" size={24} color="#10B981" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                {/* Categorias */}
                <Text style={styles.sectionLabel}>{t('headersFirst.categoriasDeProteO', 'Categorias de Proteção')}</Text>
                <View style={styles.categoriesGrid}>
                    {categories.map(renderCategoryCard)}
                </View>

                {/* Itens da Categoria Selecionada */}
                {selectedCategory && (
                    <View style={styles.selectedSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{selectedCategory.nome}</Text>
                            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                                <NeoIcon name="CloseCircle" size={24} color={Neo.colors.neutral[500]} />
                            </TouchableOpacity>
                        </View>

                        {selectedCategory.itens?.map(renderItemCard)}
                    </View>
                )}

                {/* Cenários de Uso */}
                <Text style={styles.sectionLabel}>{t('headersFirst.quandoUsar', 'Quando Usar?')}</Text>
                <Text style={styles.sectionSubLabel}>
                    {t('headersFirst.vejaQuaisEPIsSORecomendadosParaCadaAtivi', 'Veja quais EPIs são recomendados para cada atividade')}
                </Text>

                {cenarios.map(renderScenarioCard)}

                {/* Dica Final */}
                <View style={styles.tipCard}>
                    <NeoIcon name="InfoCircle" size={24} color="#3B82F6" />
                    <Text style={styles.tipText}>
                        {t('headersFirst.mantenhaSeusEPIsOrganizadosEEmBomEstadoS', 'Mantenha seus EPIs organizados e em bom estado. Substitua itens danificados imediatamente.')}
                    </Text>
                </View>

                <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
    },
    header: {
        padding: Neo.spacing.md,
        paddingTop: Neo.spacing.lg,
        borderBottomLeftRadius: Neo.radius.lg,
        borderBottomRightRadius: Neo.radius.lg,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Neo.spacing.sm,
    },
    headerTitle: {
        fontSize: Typography.sizes.xl,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral.white,
    },
    headerSubtitle: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.primary[100],
        textAlign: 'center',
    },
    content: {
        flexGrow: 1,
        padding: Neo.spacing.md,
        paddingBottom: 120,
    },
    sectionLabel: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
        marginTop: Neo.spacing.md,
        marginBottom: Neo.spacing.sm,
    },
    sectionSubLabel: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[500],
        marginBottom: Neo.spacing.md,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: Neo.spacing.lg,
    },
    categoryCard: {
        width: '47%',
        backgroundColor: Neo.colors.neutral.white,
        padding: Neo.spacing.md,
        borderRadius: Neo.radius.lg,
        alignItems: 'center',
        ...Neo.shadows.sm,
    },
    categoryIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Neo.spacing.sm,
    },
    categoryName: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
    },
    categoryCount: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[500],
    },
    selectedSection: {
        marginBottom: Neo.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Neo.spacing.sm,
    },
    sectionTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
    },
    itemCard: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: Neo.radius.md,
        padding: Neo.spacing.md,
        marginBottom: Neo.spacing.sm,
        ...Neo.shadows.sm,
    },
    itemCardExpanded: {
        borderColor: Neo.colors.primary[500],
        borderWidth: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIconSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Neo.spacing.sm,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
    },
    itemUsage: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[500],
    },
    itemDetails: {
        marginTop: Neo.spacing.md,
        paddingTop: Neo.spacing.md,
        borderTopWidth: 1,
        borderTopColor: Neo.colors.neutral[200],
    },
    detailSection: {
        marginBottom: Neo.spacing.sm,
    },
    detailTitle: {
        fontSize: Typography.sizes.sm,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    detailText: {
        fontSize: Typography.sizes.sm,
        color: Neo.colors.neutral[500],
        marginLeft: Neo.spacing.sm,
    },
    scenarioCard: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: Neo.radius.md,
        padding: Neo.spacing.md,
        marginBottom: Neo.spacing.sm,
        ...Neo.shadows.sm,
    },
    scenarioHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Neo.spacing.sm,
        gap: 10,
    },
    scenarioTitle: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral[900],
    },
    scenarioEquipments: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    equipBadge: {
        backgroundColor: Neo.colors.primary[100],
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: Neo.radius.pill,
    },
    equipText: {
        fontSize: Typography.sizes.xs,
        color: Neo.colors.primary[700],
        fontFamily: Typography.fontFamily.medium,
    },
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.secondary[100],
        padding: Neo.spacing.md,
        borderRadius: Neo.radius.md,
        marginTop: Neo.spacing.md,
        gap: 12,
    },
    tipText: {
        flex: 1,
        fontSize: Typography.sizes.sm,
        color: Neo.colors.secondary[500],
    },
});
