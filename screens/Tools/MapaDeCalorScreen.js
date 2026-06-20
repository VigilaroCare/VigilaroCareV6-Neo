/**
 * MapaDeCalorScreen.js
 * Visualização agregada dos riscos por cômodo da residência ativa.
 *
 * Item A — Tela base:
 *   • Grid 2-col de cômodos coloridos por score (% conforme).
 *   • Stats globais no topo (seguro/atenção/crítico).
 *   • Card-header explicativo no padrão IntroSafety.
 *   • Tap no cômodo → ChecklistDetail.
 *
 * Próximos itens:
 *   B — filtros (categoria/morador vulnerável)
 *   C — histórico (evolução temporal)
 */
import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import EmptyState from '../../components/EmptyState';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

import ProfileService from '../../services/ProfileService';
import { ChecklistService } from '../../services/ChecklistService';
import { AMBIENTES, CHECKLISTS } from '../../data/mapeamento_dados';
import { t_field } from '../../utils/getLocalizedField';

/**
 * Define cor do calor do cômodo:
 *   • Vermelho:  qualquer item crítico pendente (ato inseguro grave)
 *   • Laranja:   score < 40%
 *   • Amarelo:   40-69%
 *   • Verde:     >= 70%
 */
const getHeatColor = (stats) => {
    if (stats.critical > 0) return { bg: '#DC2626', tint: '#FEE2E2', label: 'Crítico' }; // DS: data-level color
    const pct = stats.total > 0 ? (stats.checked / stats.total) * 100 : 0;
    if (pct < 40) return { bg: '#F97316', tint: '#FFEDD5', label: 'Alto risco' }; // DS: data-level color
    if (pct < 70) return { bg: '#EAB308', tint: '#FEF9C3', label: 'Atenção' }; // DS: data-level color
    return { bg: '#16A34A', tint: '#DCFCE7', label: 'Seguro' }; // DS: data-level color
};

export default function MapaDeCalorScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textSecondary = themeColors.neutral[600];

    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [residenceName, setResidenceName] = useState('');
    // Filtro contextual: nome do perfil ativo + indicação visual de que
    // o mapa está focado nele (quando há comodosUsados declarados).
    const [activeProfileName, setActiveProfileName] = useState('');
    const [isFilteredByProfile, setIsFilteredByProfile] = useState(false);

    useFocusEffect(useCallback(() => {
        loadData();
    }, []));

    const loadData = async () => {
        try {
            setLoading(true);

            const activeRes = await ProfileService.getActiveResidence();
            if (activeRes) setResidenceName(activeRes.nome || '');

            const residenceId = await ProfileService.getActiveResidenceId();
            const moradia = await ProfileService.getMoradia();
            const profiles = await ProfileService.getAllPerfis();
            const mapping = await ProfileService.getMapping();
            const allState = await ChecklistService.getAllState(residenceId);

            // CONTEXTO ATIVO — filtrar mapa pelo morador selecionado
            // se ele declarou cômodos (D1 schema comodosUsados[]).
            const perfilAtivo = await ProfileService.getPerfilAtivo();
            const comodosDoPerfil = Array.isArray(perfilAtivo?.comodosUsados)
                ? perfilAtivo.comodosUsados
                : null;
            const filterActive = comodosDoPerfil && comodosDoPerfil.length > 0;
            setActiveProfileName(perfilAtivo?.nome || '');
            setIsFilteredByProfile(filterActive);

            let mappedRoomIds = Array.isArray(mapping) ? mapping : [];

            // Se há perfil ativo com cômodos declarados, intersecta:
            // só exibe cômodos que o perfil declara usar (subset do mapping).
            if (filterActive) {
                mappedRoomIds = mappedRoomIds.filter(id => comodosDoPerfil.includes(id));
            }

            const enriched = mappedRoomIds
                .map(roomId => {
                    const ambiente = AMBIENTES.find(a => a.id === roomId);
                    if (!ambiente) return null;
                    const areaData = allState[roomId] || {};
                    const structure = CHECKLISTS[roomId];
                    const stats = ChecklistService.getAreaStats(
                        roomId, areaData, structure, profiles, moradia
                    );
                    const heat = getHeatColor(stats);
                    const pct = stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0;
                    return { ...ambiente, stats, heat, pct };
                })
                .filter(Boolean)
                // Ordena por gravidade: críticos primeiro, depois pior score
                .sort((a, b) => {
                    if (b.stats.critical !== a.stats.critical) return b.stats.critical - a.stats.critical;
                    return a.pct - b.pct;
                });

            setRooms(enriched);
        } catch (e) {
            if (__DEV__) console.error('[MapaDeCalor] loadData:', e);
        } finally {
            setLoading(false);
        }
    };

    // Agregados globais
    const totalRooms = rooms.length;
    const criticalRooms = rooms.filter(r => r.stats.critical > 0).length;
    const attentionRooms = rooms.filter(r => r.stats.critical === 0 && r.pct < 70).length;
    const safeRooms = rooms.filter(r => r.stats.critical === 0 && r.pct >= 70).length;
    const globalCritical = rooms.reduce((sum, r) => sum + r.stats.critical, 0);
    const globalWarning = rooms.reduce((sum, r) => sum + r.stats.warning, 0);

    const handleRoomPress = (room) => {
        navigation.navigate('ChecklistDetail', {
            areaId: room.id,
            areaNome: t_field(room, 'nome'),
        });
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>{t('mapaCalor.title', 'Mapa de calor')}</H1>
                        <Caption style={s.subtitle}>
                            {isFilteredByProfile && activeProfileName
                                ? `${residenceName} · ${activeProfileName}`
                                : (residenceName || t('mapaCalor.subtitle', 'Riscos por cômodo'))}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* CARD-DICA EXPLICATIVO — texto contextualiza se está filtrado por morador */}
                    <NeoCard variant="elevated" style={s.headerCard}>
                        <View style={[s.headerCardIcon, { backgroundColor: Neo.colors.primary[100] }]}>
                            <NeoIcon name="Map1" size={24} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                        <Text style={[s.headerCardText, { color: textBody }]}>
                            {isFilteredByProfile && activeProfileName
                                ? `Mostrando apenas os ambientes que ${activeProfileName.split(' ')[0]} usa. Toque num cômodo pra ver o checklist.`
                                : t('mapaCalor.intro', 'Cada cômodo aparece colorido pelo nível de risco identificado nas vistorias. Toque pra abrir o checklist.')}
                        </Text>
                    </NeoCard>

                    {totalRooms === 0 ? (
                        <EmptyState
                            icon="Map1"
                            title={t('mapaCalor.emptyTitle', 'Sem mapa pra mostrar ainda')}
                            description={t('mapaCalor.emptyDesc', 'Mapeie os cômodos da sua residência e faça pelo menos uma vistoria pra ver o mapa de calor.')}
                            cta={{
                                label: t('mapaCalor.emptyCta', 'Ir pra Onde Proteger'),
                                onPress: () => navigation.navigate('OndeProteger'),
                            }}
                        />
                    ) : (
                        <>
                            {/* SUMÁRIO GLOBAL */}
                            <View style={s.summaryRow}>
                                <SummaryStat
                                    icon={<NeoIcon name="Danger" size={18} color={Neo.colors.feedback.error} variant="Bold" />}
                                    label={t('mapaCalor.critical', 'Críticos')}
                                    value={criticalRooms}
                                    sublabel={`${globalCritical} item(s)`}
                                    color={Neo.colors.feedback.error}
                                    bg="#FEE2E2"
                                />
                                <SummaryStat
                                    icon={<NeoIcon name="Warning2" size={18} color={Neo.colors.feedback.warning} variant="Bold" />}
                                    label={t('mapaCalor.attention', 'Atenção')}
                                    value={attentionRooms}
                                    sublabel={`${globalWarning} pendência(s)`}
                                    color={Neo.colors.accent.champagne}
                                    bg="#FEF9C3"
                                />
                                <SummaryStat
                                    icon={<NeoIcon name="ShieldTick" size={18} color="#16A34A" variant="Bold" />}
                                    label={t('mapaCalor.safe', 'Seguros')}
                                    value={safeRooms}
                                    sublabel={`de ${totalRooms} cômodos`}
                                    color="#15803D"
                                    bg="#DCFCE7"
                                />
                            </View>

                            {/* GRID DE CÔMODOS */}
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {t('mapaCalor.roomsLabel', 'Cômodos mapeados')}
                            </Text>
                            <View style={s.grid}>
                                {rooms.map(room => (
                                    <RoomHeatCard
                                        key={room.id}
                                        room={room}
                                        textPrimary={textPrimary}
                                        textBody={textBody}
                                        onPress={() => handleRoomPress(room)}
                                    />
                                ))}
                            </View>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// ============================================
// Subcomponentes
// ============================================

function SummaryStat({ icon, label, value, sublabel, color, bg }) {
    return (
        <View style={[s.summaryCard, { backgroundColor: bg }]}>
            <View style={s.summaryHeader}>
                {icon}
                <Caption style={[s.summaryLabel, { color }]}>{label}</Caption>
            </View>
            <Text style={[s.summaryValue, { color }]}>{value}</Text>
            <Caption style={[s.summarySub, { color }]}>{sublabel}</Caption>
        </View>
    );
}

function RoomHeatCard({ room, textPrimary, textBody, onPress }) {
    const { t } = useTranslation('common');
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={s.cell}>
            <NeoCard variant="elevated" style={s.roomCard}>
                {/* Borda lateral colorida = calor */}
                <View style={[s.heatStripe, { backgroundColor: room.heat.bg }]} />

                <View style={s.roomBody}>
                    <View style={s.roomHeader}>
                        <Text style={s.roomEmoji}>{room.emoji}</Text>
                        <View style={[s.heatBadge, { backgroundColor: room.heat.tint }]}>
                            <Text style={[s.heatBadgeText, { color: room.heat.bg }]}>
                                {room.heat.label}
                            </Text>
                        </View>
                    </View>

                    <Text style={[s.roomTitle, { color: textPrimary }]} numberOfLines={1}>
                        {t_field(room, 'nome')}
                    </Text>

                    {/* Score + barra */}
                    <View style={s.scoreRow}>
                        <Text style={[s.scorePct, { color: room.heat.bg }]}>
                            {room.pct}%
                        </Text>
                        <Caption style={[s.scoreText, { color: textBody }]}>
                            {room.stats.checked}/{room.stats.total} ok
                        </Caption>
                    </View>
                    <View style={s.barTrack}>
                        <View style={[s.barFill, {
                            width: `${room.pct}%`,
                            backgroundColor: room.heat.bg,
                        }]} />
                    </View>

                    {/* Contagem de problemas */}
                    {(room.stats.critical > 0 || room.stats.warning > 0) && (
                        <View style={s.problemRow}>
                            {room.stats.critical > 0 && (
                                <View style={s.problemChip}>
                                    <NeoIcon name="Danger" size={11} color={Neo.colors.feedback.error} variant="Bold" />
                                    <Caption style={[s.problemText, { color: Neo.colors.feedback.error }]}>
                                        {room.stats.critical} crítico{room.stats.critical > 1 ? 's' : ''}
                                    </Caption>
                                </View>
                            )}
                            {room.stats.warning > 0 && (
                                <View style={s.problemChip}>
                                    <NeoIcon name="Warning2" size={11} color={Neo.colors.accent.champagne} variant="Bold" />
                                    <Caption style={[s.problemText, { color: Neo.colors.accent.champagne }]}>
                                        {room.stats.warning} pend.
                                    </Caption>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </NeoCard>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
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
        fontSize: 22,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 190,
    },

    // Card-dica do topo
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        gap: 12,
        marginBottom: 20,
    },
    headerCardIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCardText: {
        flex: 1,
        fontSize: 14.5,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.1,
    },

    // Sumário global
    summaryRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 22,
    },
    summaryCard: {
        flex: 1,
        padding: 12,
        borderRadius: 14,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
    summaryValue: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -1,
    },
    summarySub: {
        fontSize: 10.5,
        opacity: 0.8,
        marginTop: 2,
    },

    // Section label
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.6,
        marginBottom: 12,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Grid
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    cell: {
        width: '48%',
    },
    roomCard: {
        flexDirection: 'row',
        padding: 0,
        borderRadius: 14,
        overflow: 'hidden',
        minHeight: 160,
    },
    heatStripe: {
        width: 4,
    },
    roomBody: {
        flex: 1,
        padding: 12,
    },
    roomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    roomEmoji: {
        fontSize: 28,
    },
    heatBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    heatBadgeText: {
        fontSize: 9.5,
        fontWeight: '900',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
    roomTitle: {
        fontSize: 13.5,
        fontWeight: '800',
        marginBottom: 6,
        letterSpacing: -0.2,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
        marginBottom: 4,
    },
    scorePct: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    scoreText: {
        fontSize: 10,
        fontWeight: '600',
    },
    barTrack: {
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderRadius: 2,
        marginBottom: 8,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 2,
    },
    problemRow: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    problemChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: 'rgba(0,0,0,0.04)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
    },
    problemText: {
        fontSize: 9.5,
        fontWeight: '700',
    },
});
