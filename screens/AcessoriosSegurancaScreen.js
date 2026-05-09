/**
 * AcessoriosSegurancaScreen.js
 * Tela de Acessórios de Segurança (Baby-proof, Idosos, Pets)
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
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { ACESSORIOS_SEGURANCA } from '../data/acessorios_seguranca';
import VoiceAlert from '../services/VoiceAlertService';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import { H1, H2, H3, Body, Small } from '../components/NeoTypography';

const PROFILE_TABS = [
    { id: 'bebe', label: 'Bebês', icon: 'happy', color: '#EC4899' },
    { id: 'crianca', label: 'Crianças', icon: 'bicycle', color: '#8B5CF6' },
    { id: 'idoso', label: 'Idosos', icon: 'accessibility', color: '#3B82F6' },
    { id: 'pet', label: 'Pets', icon: 'paw', color: '#F59E0B' },
];

export default function AcessoriosSegurancaScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [selectedProfile, setSelectedProfile] = useState('bebe');
    const [expandedCategory, setExpandedCategory] = useState(null);

    const categories = ACESSORIOS_SEGURANCA[selectedProfile]?.categorias || [];
    const kits = ACESSORIOS_SEGURANCA.kits_recomendados || [];

    const handleProfileChange = (profileId) => {
        setSelectedProfile(profileId);
        setExpandedCategory(null);
        const profile = PROFILE_TABS.find(p => p.id === profileId);
        VoiceAlert.speak(`Acessórios de segurança para ${profile.label}`);
    };

    const handleCategoryToggle = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const renderProfileTab = (tab) => {
        const isSelected = selectedProfile === tab.id;
        return (
            <TouchableOpacity
                key={tab.id}
                style={[
                    styles.profileTab,
                    isSelected && { backgroundColor: tab.color + '20', borderColor: tab.color, borderWidth: 2 }
                ]}
                onPress={() => handleProfileChange(tab.id)}
            >
                <NeoIcon name={tab.icon} size={20} color={isSelected ? tab.color : Neo.colors.neutral[500]} />
                <Small style={[styles.profileTabText, isSelected && { color: tab.color, fontWeight: 'bold' }]}>
                    {tab.label}
                </Small>
            </TouchableOpacity>
        );
    };

    const renderCategoryCard = (category) => {
        const isExpanded = expandedCategory === category.id;
        const profileColor = PROFILE_TABS.find(p => p.id === selectedProfile)?.color || Colors.primary;

        return (
            <View key={category.id} style={{ marginBottom: 12 }}>
                <NeoCard
                    variant="glass"
                    style={{ padding: 0, overflow: 'hidden' }}
                >
                    <TouchableOpacity
                        style={styles.categoryHeader}
                        onPress={() => handleCategoryToggle(category.id)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.categoryIcon, { backgroundColor: profileColor + '20' }]}>
                            <NeoIcon name={category.icone || 'shield'} size={24} color={profileColor} />
                        </View>
                        <View style={styles.categoryInfo}>
                            <H3 style={styles.categoryName}>{category.nome}</H3>
                            <Small style={styles.categoryCount}>
                                {category.itens?.length || 0} acessórios
                            </Small>
                        </View>
                        <NeoIcon
                            name={isExpanded ? 'chevron-up' : 'chevron-down'}
                            size={24}
                            color={Neo.colors.neutral[400]}
                        />
                    </TouchableOpacity>

                    {isExpanded && (
                        <View style={styles.itemsList}>
                            {category.itens?.map((item, index) => (
                                <View key={index} style={styles.itemCard}>
                                    <View style={styles.itemHeader}>
                                        <NeoIcon
                                            name="TickCircle"
                                            size={20}
                                            color={profileColor}
                                        />
                                        <H3 style={{ fontSize: 15 }}>{item.nome}</H3>
                                    </View>
                                    {item.descricao && (
                                        <Body style={styles.itemDescription}>{item.descricao}</Body>
                                    )}
                                    {item.locais && (
                                        <View style={styles.locationTags}>
                                            {item.locais.map((local, i) => (
                                                <View key={i} style={styles.locationTag}>
                                                    <Small style={{ color: '#00897B', fontWeight: 'bold' }}>{local}</Small>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    {item.preco_estimado && (
                                        <Small style={styles.priceText}>💰 {item.preco_estimado}</Small>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </NeoCard>
            </View>
        );
    };

    const renderKitCard = (kit) => {
        const profileColor = PROFILE_TABS.find(p => p.id === selectedProfile)?.color || Colors.primary;
        return (
            <NeoCard
                variant="glass"
                key={kit.id}
                style={{
                    backgroundColor: profileColor + '20',
                    borderColor: profileColor + '40',
                    borderWidth: 1.5,
                    marginBottom: 16,
                    padding: 20
                }}
            >
                <View style={styles.kitHeader}>
                    <NeoIcon name="Gift" size={28} color={profileColor} variant="Bold" />
                    <H2 style={{ color: profileColor }}>{kit.nome}</H2>
                </View>
                <Body style={{ color: Neo.colors.neutral[700], marginBottom: 12 }}>{kit.descricao}</Body>

                <View style={[styles.kitItems, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
                    <H3 style={{ fontSize: 14, color: profileColor, marginBottom: 8 }}>{t('headersFirst.itensIncluDos', 'Itens incluídos:')}</H3>
                    {kit.itens?.map((item, i) => (
                        <Body key={i} style={{ color: Neo.colors.neutral[800], fontSize: 13 }}>• {item}</Body>
                    ))}
                </View>

                {kit.preco_estimado && (
                    <View style={styles.kitPrice}>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{t('headersFirst.investimentoEstimado', 'Investimento estimado:')}</Small>
                        <H3 style={{ color: profileColor }}>{kit.preco_estimado}</H3>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.speakButton, { backgroundColor: profileColor }]}
                    onPress={() => {
                        VoiceAlert.speak(
                            `Kit ${kit.nome}. ${kit.descricao}. ` +
                            `Contém: ${kit.itens?.join(', ')}. ` +
                            `Investimento estimado: ${kit.preco_estimado || 'variável'}.`,
                            { rate: 0.85 }
                        );
                    }}
                >
                    <NeoIcon name="VolumeHigh" size={18} color="#FFF" />
                    <Body style={{ color: '#FFF', fontWeight: 'bold' }}>{t('headersFirst.ouvirDetalhes', 'Ouvir Detalhes')}</Body>
                </TouchableOpacity>
            </NeoCard>
        );
    };

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={{ padding: 20, paddingTop: 10 }}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                        </TouchableOpacity>
                        <H2>{t('headersFirst.acessRios', 'Acessórios')}</H2>
                        <TouchableOpacity
                            onPress={() => VoiceAlert.speak(
                                'Acessórios de segurança para proteção da sua família. ' +
                                'Selecione um perfil para ver os itens recomendados.'
                            )}
                            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <NeoIcon name="VolumeHigh" size={24} color={Neo.colors.neutral[600]} />
                        </TouchableOpacity>
                    </View>
                    <Small style={{ color: Neo.colors.neutral[500], textAlign: 'center', marginTop: 8 }}>
                        {t('headersFirst.proteOPersonalizadaParaCadaPerfil', 'Proteção personalizada para cada perfil')}
                    </Small>
                </View>

                {/* Profile Tabs */}
                <View style={{ marginBottom: 12 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
                    >
                        {PROFILE_TABS.map(renderProfileTab)}
                    </ScrollView>
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Kits Recomendados */}
                    {kits.filter(k => k.perfil === selectedProfile).length > 0 && (
                        <View style={styles.section}>
                            <H3 style={{ marginBottom: 16 }}>{t('headersFirst.KitsRecomendados', '🎁 Kits Recomendados')}</H3>
                            {kits.map(renderKitCard)}
                        </View>
                    )}

                    {/* Categorias de Acessórios */}
                    <View style={styles.section}>
                        <H3 style={{ marginBottom: 16 }}>{t('headersFirst.categorias', 'Categorias')}</H3>
                        {categories.length > 0 ? (
                            categories.map(renderCategoryCard)
                        ) : (
                            <View style={styles.emptyState}>
                                <NeoIcon name="Setting2" size={48} color={Neo.colors.neutral[300]} />
                                <Body style={{ color: Neo.colors.neutral[500], textAlign: 'center', marginTop: 12 }}>
                                    {t('headersFirst.estamosPreparandoOsAcessRiosParaEstePerf', 'Estamos preparando os acessórios para este perfil.')}
                                </Body>
                            </View>
                        )}
                    </View>

                    {/* Dica */}
                    <NeoCard variant="glass" style={[styles.tipCard, { backgroundColor: 'rgba(254, 243, 199, 0.4)', borderColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 1 }]}>
                        <NeoIcon name="LampOn" size={24} color="#F59E0B" />
                        <Body style={styles.tipText}>
                            {t('headersFirst.aoInstalarAcessRiosDeSeguranASigaSempreA', `Ao instalar acessórios de segurança, siga sempre as instruções do fabricante
                            e verifique periodicamente se estão bem fixados.`)}
                        </Body>
                    </NeoCard>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.md,
        paddingTop: Spacing.lg,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    headerTitle: {
        fontSize: Typography.sizes.xl,
        fontFamily: Typography.fontFamily.bold,
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: Typography.sizes.sm,
        color: '#E8E8E8',
        textAlign: 'center',
    },
    tabsContainer: {
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surfaceVariant,
    },
    tabsContent: {
        padding: Spacing.sm,
        gap: 10,
    },
    profileTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        backgroundColor: 'rgba(255,255,255,0.2)',
        gap: 8,
    },
    profileTabText: {
        fontSize: Typography.sizes.sm,
        fontFamily: Typography.fontFamily.medium,
        color: Colors.textSecondary,
    },
    content: {
        flexGrow: 1,
        padding: Spacing.md,
        paddingBottom: 120,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    categoryCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.sm,
        ...Shadows.sm,
        overflow: 'hidden',
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    categoryInfo: {
        flex: 1,
    },
    itemsList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    itemCard: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: BorderRadius.md,
        padding: 12,
        marginTop: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    itemDescription: {
        marginBottom: 4,
    },
    locationTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 4,
    },
    locationTag: {
        backgroundColor: 'rgba(0, 137, 123, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    priceText: {
        marginTop: 4,
    },
    kitCard: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    kitHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    kitItems: {
        borderRadius: BorderRadius.md,
        padding: 12,
        marginBottom: 12,
    },
    kitPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    speakButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        gap: 8,
    },
    emptyState: {
        alignItems: 'center',
        padding: Spacing.xl,
    },
    emptyText: {
        fontSize: Typography.sizes.md,
        color: Colors.textTertiary,
        textAlign: 'center',
        marginTop: Spacing.md,
    },
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    tipText: {
        flex: 1,
        color: '#92400E',
    },
});
