import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import {
    People, Pet, Map, Building, Home2, ShieldTick, Ruler,
} from 'iconsax-react-native';

import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { AMBIENTES } from '../../data/mapeamento_dados';

import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function HomeXRayScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textSecondary = themeColors.neutral[700];

    const [residences, setResidences] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const resList = await ProfileService.getResidences();
            const profiles = await ProfileService.getAllPerfis();

            const enrichedResidences = await Promise.all(resList.map(async (res) => {
                const data = await ProfileService.getResidenceData(res.id);
                return { ...res, ...data };
            }));

            setResidences(enrichedResidences);
            setAllProfiles(profiles);
        } catch (e) {
            console.error('Error loading X-Ray multi-residence data', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const getInherentRisks = (type, construction) => {
        const risks = [];
        const ty = type?.toLowerCase() || '';
        const cs = construction?.toLowerCase() || '';

        if (ty.includes('apartamento') || ty.includes('edificio')) {
            risks.push({ label: t('homeXRay.riskHeight', 'Altura e janelas'), color: '#2196F3' });
            risks.push({ label: t('homeXRay.riskCollectiveGas', 'Gás coletivo'), color: '#F59E0B' });
            risks.push({ label: t('homeXRay.riskStairs', 'Evacuação em escadas'), color: '#DC2626' });
        } else if (ty.includes('sobrado') || cs === 'sobrado') {
            risks.push({ label: t('homeXRay.riskFalls', 'Quedas em escadas'), color: '#F59E0B' });
            risks.push({ label: t('homeXRay.riskBarriers', 'Barreiras de andar'), color: '#16A34A' });
        } else if (ty.includes('praia') || ty.includes('litoral')) {
            risks.push({ label: t('homeXRay.riskHumidity', 'Umidade e elétrica'), color: '#EAB308' });
            risks.push({ label: t('homeXRay.riskDrowning', 'Risco de afogamento'), color: '#0EA5E9' });
        } else if (ty.includes('rural') || ty.includes('sitio') || ty.includes('fazenda')) {
            risks.push({ label: t('homeXRay.riskAnimals', 'Animais peçonhentos'), color: '#78716C' });
            risks.push({ label: t('homeXRay.riskIsolation', 'Isolamento geográfico'), color: '#475569' });
        } else {
            risks.push({ label: t('homeXRay.riskIntrusion', 'Intrusão exterior'), color: '#475569' });
            risks.push({ label: t('homeXRay.riskBackyard', 'Riscos de quintal'), color: '#16A34A' });
        }

        return risks;
    };

    const renderResidenceCard = (res, index) => {
        const inhabitantsIds = res?.moradia?.habitantes || [];
        const residents = allProfiles.filter(p => inhabitantsIds.includes(p.id));
        const roomIds = res?.moradia?.estrutura?.ambientes || [];
        const rooms = AMBIENTES.filter(a => roomIds.includes(a.id));
        const inherentRisks = getInherentRisks(res?.moradia?.tipoImovel, res?.moradia?.tipoConstrucao);

        const buildDesc = res?.moradia?.tipoImovel === 'casa'
            ? (res?.moradia?.tipoConstrucao === 'terrea' ? t('homeXRay.houseTipoTerrea', 'Casa térrea') : t('homeXRay.houseTipoSobrado', 'Sobrado'))
            : (res?.moradia?.tipoImovel || t('homeXRay.houseTipoGeneric', 'Residência'));

        return (
            <FadeInView key={res.id} delay={120 + index * 40}>
                <NeoCard variant="elevated" style={s.resCard}>
                    {/* HEADER do card */}
                    <View style={s.resHeader}>
                        <View style={{ flex: 1 }}>
                            <H3 style={s.resName}>{res.nome || t('home.mainHouse', 'Minha Casa')}</H3>
                            <View style={s.typeBadge}>
                                <Caption style={s.typeBadgeText}>{buildDesc.toUpperCase()}</Caption>
                            </View>
                        </View>
                        <View style={s.resIconBox}>
                            {res?.moradia?.tipoImovel === 'apartamento'
                                ? <Building size={22} color={Neo.colors.primary[600]} variant="Bold" />
                                : <Home2 size={22} color={Neo.colors.primary[600]} variant="Bold" />}
                        </View>
                    </View>

                    <View style={s.divider} />

                    {/* MORADORES */}
                    <View style={s.section}>
                        <View style={s.sectionHeader}>
                            <People size={14} color={Neo.colors.neutral[600]} variant="Bold" />
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {t('homeXRay.inhabitantsLabel', 'Moradores e pets')}
                            </Text>
                        </View>
                        <View style={s.avatarList}>
                            {residents.length > 0 ? residents.map((p) => (
                                <View key={p.id} style={s.avatarItem}>
                                    <View style={[s.miniAvatar, {
                                        backgroundColor: p.tipo === 'pet' ? 'rgba(245,158,11,0.22)' : Neo.colors.primary[100],
                                    }]}>
                                        {p.foto ? (
                                            <Image source={{ uri: p.foto }} style={s.avatarImg} />
                                        ) : (
                                            p.tipo === 'pet'
                                                ? <Pet size={14} color="#F59E0B" variant="Bold" />
                                                : <People size={14} color={Neo.colors.primary[600]} variant="Bold" />
                                        )}
                                    </View>
                                    <Caption style={s.avatarName} numberOfLines={1}>
                                        {(p.nome || '').split(' ')[0]}
                                    </Caption>
                                </View>
                            )) : (
                                <Caption style={s.emptyInline}>
                                    {t('headersFirst.nenhumMoradorVinculado', 'Nenhum morador vinculado.')}
                                </Caption>
                            )}
                        </View>
                    </View>

                    {/* AMBIENTES */}
                    <View style={s.section}>
                        <View style={s.sectionHeader}>
                            <Map size={14} color={Neo.colors.neutral[600]} variant="Bold" />
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {t('homeXRay.environmentsLabel', 'Ambientes mapeados')}
                            </Text>
                        </View>
                        <View style={s.roomsRow}>
                            {rooms.length > 0 ? rooms.map(r => (
                                <View key={r.id} style={s.roomBadge}>
                                    <Text style={{ fontSize: 13 }}>{r.emoji}</Text>
                                    <Caption style={s.roomBadgeText}>{r.nome}</Caption>
                                </View>
                            )) : (
                                <Caption style={s.emptyInline}>
                                    {t('headersFirst.nenhumAmbienteMapeado', 'Nenhum ambiente mapeado.')}
                                </Caption>
                            )}
                        </View>
                    </View>

                    {/* RISCOS INERENTES — calmo, sem bg vermelho ostensivo */}
                    <View style={s.section}>
                        <View style={s.sectionHeader}>
                            <ShieldTick size={14} color={Neo.colors.neutral[600]} variant="Bold" />
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {t('homeXRay.inherentRisksLabel', 'Riscos inerentes')}
                            </Text>
                        </View>
                        <View style={s.risksGrid}>
                            {inherentRisks.map((risk, i) => (
                                <View key={i} style={s.riskItem}>
                                    <View style={[s.riskDot, { backgroundColor: risk.color }]} />
                                    <Caption style={s.riskLabel}>{risk.label}</Caption>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* AÇÃO */}
                    <TouchableOpacity
                        style={s.recalcButton}
                        activeOpacity={0.85}
                        onPress={() => {
                            ProfileService.setActiveResidence(res.id);
                            navigation.navigate('MapeamentoRiscos', { residenceId: res.id, residenceName: res.nome });
                        }}
                    >
                        <Ruler size={16} color="#FFF" variant="Bold" />
                        <Text style={s.recalcButtonText}>
                            {t('homeXRay.updateMapping', 'Atualizar mapeamento')}
                        </Text>
                    </TouchableOpacity>
                </NeoCard>
            </FadeInView>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER consistente */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('homeXRay.headerTitle', 'Raio-X da casa')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('homeXRay.headerSubtitle', 'Perfil de cada residência')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {residences.map((res, i) => renderResidenceCard(res, i))}

                    {residences.length === 0 && !loading && (
                        <View style={s.emptyState}>
                            <View style={s.emptyIconCircle}>
                                <Home2 size={40} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <H3 style={s.emptyTitle}>
                                {t('headersFirst.nenhumaResidNciaEncontrada', 'Nenhuma residência encontrada.')}
                            </H3>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 18,
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
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Card de residência
    resCard: {
        marginBottom: 16,
        padding: 18,
        borderRadius: 20,
    },
    resHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 14,
        gap: 12,
    },
    resName: {
        fontSize: 17,
        color: Neo.colors.neutral[900],
        marginBottom: 6,
    },
    typeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(16,185,129,0.12)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    typeBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: Neo.colors.primary[700],
        letterSpacing: 0.4,
    },
    resIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(16,185,129,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginBottom: 14,
    },

    // Sections internas do card
    section: {
        marginBottom: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    sectionLabel: {
        fontSize: 10.5,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    emptyInline: {
        color: Neo.colors.neutral[500],
    },

    // Moradores
    avatarList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    avatarItem: {
        alignItems: 'center',
        width: 52,
    },
    miniAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        overflow: 'hidden',
    },
    avatarImg: {
        width: 36,
        height: 36,
    },
    avatarName: {
        fontSize: 10,
        textAlign: 'center',
        color: Neo.colors.neutral[700],
    },

    // Ambientes (chips)
    roomsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    roomBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.65)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        gap: 4,
    },
    roomBadgeText: {
        fontSize: 10.5,
        color: Neo.colors.neutral[700],
        fontWeight: '600',
    },

    // Riscos inerentes
    risksGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    riskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    riskDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
    },
    riskLabel: {
        fontSize: 11.5,
        fontWeight: '600',
        color: Neo.colors.neutral[800],
    },

    // Botão de ação
    recalcButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Neo.colors.primary[500],
        paddingVertical: 12,
        borderRadius: 14,
        gap: 8,
        marginTop: 6,
    },
    recalcButtonText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 13.5,
    },

    // Empty state
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        paddingHorizontal: 32,
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(16,185,129,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    emptyTitle: {
        color: Neo.colors.neutral[800],
        textAlign: 'center',
    },
});
