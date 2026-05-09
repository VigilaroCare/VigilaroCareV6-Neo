import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft2, People, Pet, Map, Danger, Building, Home2, ShieldTick, Ruler, Warning2 } from 'iconsax-react-native';
import { StatusBar } from 'expo-status-bar';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { AMBIENTES } from '../../data/mapeamento_dados';
import AppBackground from '../../components/AppBackground';

// Neo Components
import NeoCard from '../../components/NeoCard';
import NeoText, { H1, H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import FadeInView from '../../components/FadeInView';

const { width } = Dimensions.get('window');

export default function HomeXRayScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [residences, setResidences] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const resList = await ProfileService.getResidences();
            const profiles = await ProfileService.getAllPerfis();
            
            // Enrich residences with their specific data
            const enrichedResidences = await Promise.all(resList.map(async (res) => {
                const data = await ProfileService.getResidenceData(res.id);
                return { ...res, ...data };
            }));

            setResidences(enrichedResidences);
            setAllProfiles(profiles);
        } catch (e) {
            console.error("Error loading X-Ray multi-residence data", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const getInherentRisks = (type, construction) => {
        const risks = [];
        const t = type?.toLowerCase() || '';
        const c = construction?.toLowerCase() || '';

        if (t.includes('apartamento') || t.includes('edificio')) {
            risks.push({ label: 'Altura e Janelas', icon: 'ruler', color: '#2196F3' });
            risks.push({ label: 'Gás Coletivo', icon: 'danger', color: '#FF9800' });
            risks.push({ label: 'Evacuação em Escadas', icon: 'warning-2', color: '#F44336' });
        } else if (t.includes('sobrado') || c === 'sobrado') {
            risks.push({ label: 'Quedas em Escadas', icon: 'stairs', color: '#FF9800' });
            risks.push({ label: 'Barreiras de Andar', icon: 'shield-tick', color: '#4CAF50' });
        } else if (t.includes('praia') || t.includes('litoral')) {
            risks.push({ label: 'Umidade/Elétrica', icon: 'flash', color: '#FFC107' });
            risks.push({ label: 'Riscos de Afogamento', icon: 'water', color: '#03A9F4' });
        } else if (t.includes('rural') || t.includes('sitio') || t.includes('fazenda')) {
            risks.push({ label: 'Animais Peçonhentos', icon: 'bug', color: '#795548' });
            risks.push({ label: 'Isolamento Geográfico', icon: 'location', color: '#607D8B' });
        } else {
            // Casa Térrea / Geral
            risks.push({ label: 'Intrusão Exterior', icon: 'lock', color: '#607D8B' });
            risks.push({ label: 'Riscos de Quintal', icon: 'tree', color: '#4CAF50' });
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
            ? (res?.moradia?.tipoConstrucao === 'terrea' ? 'Casa Térrea' : 'Sobrado') 
            : (res?.moradia?.tipoImovel || 'Residência');

        return (
            <FadeInView key={res.id} delay={index * 150}>
                <NeoCard variant="glass" style={s.resCard}>
                    {/* 1. HEADER: BUILDING DESCRIPTION */}
                    <View style={s.resHeader}>
                        <View style={s.titleGroup}>
                            <H3 style={s.resName}>{res.nome || 'Minha Casa'}</H3>
                            <View style={s.badge}>
                                <Caption style={s.badgeText}>{buildDesc.toUpperCase()}</Caption>
                            </View>
                        </View>
                        <View style={[s.iconBox, { backgroundColor: Neo.colors.primary[100] }]}>
                            {res?.moradia?.tipoImovel === 'apartamento' ? <Building size={24} color={Neo.colors.primary[600]} variant="Bold" /> : <Home2 size={24} color={Neo.colors.primary[600]} variant="Bold" />}
                        </View>
                    </View>

                    <View style={s.divider} />

                    {/* 2. INHABITANTS */}
                    <View style={s.section}>
                        <View style={s.sectionIconTitle}>
                            <People size={20} color={Neo.colors.neutral[600]} variant="Outline" />
                            <Small style={s.sectionTitle}>{t('headersFirst.moradoresEPets', 'Moradores e Pets')}</Small>
                        </View>
                        <View style={s.avatarList}>
                            {residents.length > 0 ? (
                                residents.map((p) => (
                                    <View key={p.id} style={s.avatarItem}>
                                        <View style={[s.miniAvatar, { backgroundColor: p.tipo === 'pet' ? Neo.colors.feedback.warning + '25' : Neo.colors.primary[100] }]}>
                                            {p.foto ? (
                                                <Image source={{ uri: p.foto }} style={s.avatarImg} />
                                            ) : (
                                                p.tipo === 'pet' ? <Pet size={12} color={Neo.colors.feedback.warning} variant="Bold" /> : <People size={12} color={Neo.colors.primary[600]} variant="Bold" />
                                            )}
                                        </View>
                                        <Caption style={s.avatarName} numberOfLines={1}>{p.nome.split(' ')[0]}</Caption>
                                    </View>
                                ))
                            ) : (
                                <Caption>{t('headersFirst.nenhumMoradorVinculado', 'Nenhum morador vinculado.')}</Caption>
                            )}
                        </View>
                    </View>

                    {/* 3. ENVIRONMENTS (CHIPS) */}
                    <View style={s.section}>
                        <View style={s.sectionIconTitle}>
                            <Map size={20} color={Neo.colors.neutral[600]} variant="Outline" />
                            <Small style={s.sectionTitle}>{t('headersFirst.ambientesMapeados', 'Ambientes Mapeados')}</Small>
                        </View>
                        <View style={s.roomsRow}>
                            {rooms.length > 0 ? (
                                rooms.map(r => (
                                    <View key={r.id} style={s.roomBadge}>
                                        <Text style={{ fontSize: 13 }}>{r.emoji}</Text>
                                        <Caption style={s.roomBadgeText}>{r.nome}</Caption>
                                    </View>
                                ))
                            ) : (
                                <Caption>{t('headersFirst.nenhumAmbienteMapeado', 'Nenhum ambiente mapeado.')}</Caption>
                            )}
                        </View>
                    </View>

                    {/* 4. INHERENT RISKS (DNA DE SEGURANÇA) */}
                    <View style={s.riskSection}>
                        <View style={s.sectionIconTitle}>
                            <ShieldTick size={20} color={Neo.colors.feedback.error} variant="Bold" />
                            <Small style={[s.sectionTitle, { color: Neo.colors.feedback.error, fontWeight: 'bold' }]}>{t('headersFirst.dNADeSeguranARiscosInerentes', 'DNA de Segurança (Riscos Inerentes)')}</Small>
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
                    {/* 5. ACTIONS: UPDATE MAPPING */}
                    <View style={s.actionsRow}>
                        <TouchableOpacity 
                            style={s.recalcButton}
                            onPress={() => {
                                // Activate this residence first, then navigate
                                ProfileService.setActiveResidence(res.id);
                                navigation.navigate('MapeamentoRiscos', { residenceId: res.id, residenceName: res.nome });
                            }}
                        >
                            <Ruler size={18} color="#FFF" variant="Bold" />
                            <Small style={s.recalcButtonText}>{t('headersFirst.atualizarMapeamentoEstrutural', 'Atualizar Mapeamento Estrutural')}</Small>
                        </TouchableOpacity>
                    </View>
                </NeoCard>
            </FadeInView>
        );
    };

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER */}
                <View style={s.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                        <ArrowLeft2 size={24} color={Neo.colors.neutral[900]} />
                    </TouchableOpacity>
                    <View>
                        <H2>{t('headersFirst.raioXDaMoradia', 'Raio X da Moradia')}</H2>
                        <Caption>{t('headersFirst.resumoEstratGicoPorResidNcia', 'Resumo estratégico por residência')}</Caption>
                    </View>
                </View>

                <ScrollView contentContainerStyle={s.scrollContent}>
                    {residences.map((res, i) => renderResidenceCard(res, i))}
                    
                    {residences.length === 0 && !loading && (
                        <View style={s.emptyState}>
                            <Home2 size={64} color={Neo.colors.neutral[300]} variant="Bold" />
                            <Body style={s.emptyText}>{t('headersFirst.nenhumaResidNciaEncontrada', 'Nenhuma residência encontrada.')}</Body>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: Neo.spacing.md,
    },
    backBtn: {
        padding: 8,
        marginRight: 8,
    },
    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 60,
    },
    resCard: {
        marginBottom: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    resHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    titleGroup: {
        flex: 1,
    },
    resName: {
        fontSize: 18,
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionIconTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: Neo.colors.neutral[700],
    },
    avatarList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    avatarItem: {
        alignItems: 'center',
        width: 50,
    },
    miniAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        overflow: 'hidden',
    },
    avatarImg: {
        width: 32,
        height: 32,
    },
    avatarName: {
        fontSize: 9,
        textAlign: 'center',
    },
    roomsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    roomBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    roomBadgeText: {
        fontSize: 10,
        marginLeft: 4,
        fontWeight: '500',
    },
    riskSection: {
        marginTop: 4,
        backgroundColor: 'rgba(244, 67, 54, 0.05)',
        padding: 12,
        borderRadius: 12,
    },
    risksGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 4,
    },
    riskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    riskDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    riskLabel: {
        fontSize: 11,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 60,
        opacity: 0.5,
    },
    emptyText: {
        marginTop: 16,
    },
    actionsRow: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    recalcButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.primary[500],
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14,
        gap: 10,
        ...Neo.shadows.sm,
    },
    recalcButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    }
});

function Text({ children, style }) {
    return <NeoText style={style}>{children}</NeoText>
}
