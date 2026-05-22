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
import { Map1, ShieldTick, Warning2, Danger, ArrowRight2 } from 'iconsax-react-native';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import EmptyState from '../../components/EmptyState';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

import ProfileService from '../../services/ProfileService';
import { ChecklistService } from '../../services/ChecklistService';
import TimelineService from '../../services/TimelineService';
import { AMBIENTES, CHECKLISTS } from '../../data/mapeamento_dados';
import { t_field } from '../../utils/getLocalizedField';

// Helpers de classificação etária (mesmo padrão do ProfileFilterEngine)
const calcAge = (dob) => {
    if (!dob) return null;
    try {
        const d = new Date(dob);
        if (isNaN(d.getTime())) return null;
        const today = new Date();
        let age = today.getFullYear() - d.getFullYear();
        const m = today.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
        return age;
    } catch { return null; }
};

const isBebe = (p) => p?.tipo === 'bebe' || (p?.tipo === 'humano' && calcAge(p.dataNascimento) !== null && calcAge(p.dataNascimento) <= 1);
const isCrianca = (p) => p?.tipo === 'crianca' || (p?.tipo === 'humano' && calcAge(p.dataNascimento) !== null && calcAge(p.dataNascimento) <= 12 && calcAge(p.dataNascimento) >= 2);
const isIdoso = (p) => p?.tipo === 'idoso' || (p?.tipo === 'humano' && calcAge(p.dataNascimento) !== null && calcAge(p.dataNascimento) >= 60);
const hasCondicao = (p, cond) => Array.isArray(p?.necessidadesEspeciais) && p.necessidadesEspeciais.includes(cond);

const PROFILE_FILTERS = [
    { id: 'all',      label: 'Toda família', match: () => true },
    { id: 'bebe',     label: 'Bebê',         match: isBebe },
    { id: 'crianca',  label: 'Criança',      match: isCrianca },
    { id: 'idoso',    label: 'Idoso',        match: isIdoso },
    { id: 'pcd',      label: 'PcD',          match: (p) => hasCondicao(p, 'pcd') },
    { id: 'gestante', label: 'Gestante',     match: (p) => hasCondicao(p, 'gestante') },
];

const HEAT_FILTERS = [
    { id: 'all',       label: 'Todos' },
    { id: 'critical',  label: 'Críticos' },
    { id: 'high',      label: 'Alto risco' },
    { id: 'attention', label: 'Atenção' },
    { id: 'safe',      label: 'Seguros' },
];

const heatBucket = (room) => {
    if (room.stats.critical > 0) return 'critical';
    if (room.pct < 40) return 'high';
    if (room.pct < 70) return 'attention';
    return 'safe';
};

/**
 * Define cor do calor do cômodo:
 *   • Vermelho:  qualquer item crítico pendente (ato inseguro grave)
 *   • Laranja:   score < 40%
 *   • Amarelo:   40-69%
 *   • Verde:     >= 70%
 */
const getHeatColor = (stats) => {
    if (stats.critical > 0) return { bg: '#DC2626', tint: '#FEE2E2', label: 'Crítico' };
    const pct = stats.total > 0 ? (stats.checked / stats.total) * 100 : 0;
    if (pct < 40) return { bg: '#F97316', tint: '#FFEDD5', label: 'Alto risco' };
    if (pct < 70) return { bg: '#EAB308', tint: '#FEF9C3', label: 'Atenção' };
    return { bg: '#16A34A', tint: '#DCFCE7', label: 'Seguro' };
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
    const [heatFilter, setHeatFilter] = useState('all');
    const [profileFilter, setProfileFilter] = useState('all');
    const [availableProfileFilters, setAvailableProfileFilters] = useState(['all']);
    const [trend, setTrend] = useState(null); // { last7, prev7, deltaPct, buckets }

    useFocusEffect(useCallback(() => {
        loadData(profileFilter);
    }, [profileFilter]));

    const loadData = async (currentProfileFilter = 'all') => {
        try {
            setLoading(true);

            const activeRes = await ProfileService.getActiveResidence();
            if (activeRes) setResidenceName(activeRes.nome || '');

            const residenceId = await ProfileService.getActiveResidenceId();
            const moradia = await ProfileService.getMoradia();
            const profiles = await ProfileService.getAllPerfis();
            const mapping = await ProfileService.getMapping();
            const allState = await ChecklistService.getAllState(residenceId);

            // Identifica quais filtros de perfil fazem sentido pra esta família
            const validProfileFilters = PROFILE_FILTERS
                .filter(f => f.id === 'all' || profiles.some(p => f.match(p)))
                .map(f => f.id);
            setAvailableProfileFilters(validProfileFilters);

            // Subset de perfis conforme filtro ativo
            const filterDef = PROFILE_FILTERS.find(f => f.id === currentProfileFilter) || PROFILE_FILTERS[0];
            const filteredProfiles = currentProfileFilter === 'all'
                ? profiles
                : profiles.filter(filterDef.match);

            const mappedRoomIds = Array.isArray(mapping) ? mapping : [];

            const enriched = mappedRoomIds
                .map(roomId => {
                    const ambiente = AMBIENTES.find(a => a.id === roomId);
                    if (!ambiente) return null;
                    const areaData = allState[roomId] || {};
                    const structure = CHECKLISTS[roomId];
                    const stats = ChecklistService.getAreaStats(
                        roomId, areaData, structure, filteredProfiles, moradia
                    );
                    const heat = getHeatColor(stats);
                    const pct = stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0;
                    return { ...ambiente, stats, heat, pct };
                })
                .filter(Boolean)
                // Quando filtrando por perfil, esconde cômodos que não tem risco relevante
                .filter(room => currentProfileFilter === 'all' || room.stats.total > 0)
                // Ordena por gravidade: críticos primeiro, depois pior score
                .sort((a, b) => {
                    if (b.stats.critical !== a.stats.critical) return b.stats.critical - a.stats.critical;
                    return a.pct - b.pct;
                });

            setRooms(enriched);

            // === Histórico (item C) — evolução nos últimos 14 dias ===
            const history = await TimelineService.getHistory();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Bucket por dia, últimos 14 dias (índice 0 = mais recente)
            const buckets = Array.from({ length: 14 }, () => 0);
            history.forEach(h => {
                if (!h.data) return;
                const d = new Date(h.data);
                d.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((today - d) / (1000 * 60 * 60 * 24));
                if (diffDays >= 0 && diffDays < 14) {
                    buckets[diffDays]++;
                }
            });

            // Últimos 7 dias vs 7 dias anteriores
            const last7 = buckets.slice(0, 7).reduce((a, b) => a + b, 0);
            const prev7 = buckets.slice(7, 14).reduce((a, b) => a + b, 0);
            let deltaPct = null;
            if (prev7 > 0) deltaPct = Math.round(((last7 - prev7) / prev7) * 100);
            else if (last7 > 0) deltaPct = 100; // surge a partir do zero

            setTrend({ last7, prev7, deltaPct, buckets });
        } catch (e) {
            if (__DEV__) console.error('[MapaDeCalor] loadData:', e);
        } finally {
            setLoading(false);
        }
    };

    // Filtragem por calor (aplicada após o filtro de perfil já ter sido feito)
    const visibleRooms = heatFilter === 'all'
        ? rooms
        : rooms.filter(r => heatBucket(r) === heatFilter);

    // Agregados globais — calculados sobre TODOS os rooms do perfil ativo
    // (não muda quando heat filter muda, mantendo o contexto)
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
                            {residenceName || t('mapaCalor.subtitle', 'Riscos por cômodo')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* CARD-DICA EXPLICATIVO (padrão IntroSafety / TravelMode) */}
                    <NeoCard variant="elevated" style={s.headerCard}>
                        <View style={[s.headerCardIcon, { backgroundColor: Neo.colors.primary[100] }]}>
                            <Map1 size={24} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                        <Text style={[s.headerCardText, { color: textBody }]}>
                            {t('mapaCalor.intro', 'Cada cômodo aparece colorido pelo nível de risco identificado nas vistorias. Toque pra abrir o checklist.')}
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
                                    icon={<Danger size={18} color="#DC2626" variant="Bold" />}
                                    label={t('mapaCalor.critical', 'Críticos')}
                                    value={criticalRooms}
                                    sublabel={`${globalCritical} item(s)`}
                                    color="#DC2626"
                                    bg="#FEE2E2"
                                />
                                <SummaryStat
                                    icon={<Warning2 size={18} color="#EAB308" variant="Bold" />}
                                    label={t('mapaCalor.attention', 'Atenção')}
                                    value={attentionRooms}
                                    sublabel={`${globalWarning} pendência(s)`}
                                    color="#A16207"
                                    bg="#FEF9C3"
                                />
                                <SummaryStat
                                    icon={<ShieldTick size={18} color="#16A34A" variant="Bold" />}
                                    label={t('mapaCalor.safe', 'Seguros')}
                                    value={safeRooms}
                                    sublabel={`de ${totalRooms} cômodos`}
                                    color="#15803D"
                                    bg="#DCFCE7"
                                />
                            </View>

                            {/* HISTÓRICO (item C) — sempre presente, mostra "sem atividade" se zerado */}
                            <TrendCard trend={trend} textBody={textBody} textSecondary={textSecondary} />

                            {/* FILTROS */}
                            <FilterRow
                                label={t('mapaCalor.filterFocus', 'Foco em')}
                                options={PROFILE_FILTERS.filter(f => availableProfileFilters.includes(f.id))}
                                activeId={profileFilter}
                                onChange={setProfileFilter}
                                textSecondary={textSecondary}
                            />
                            <FilterRow
                                label={t('mapaCalor.filterShow', 'Mostrar')}
                                options={HEAT_FILTERS}
                                activeId={heatFilter}
                                onChange={setHeatFilter}
                                textSecondary={textSecondary}
                            />

                            {/* GRID DE CÔMODOS */}
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {visibleRooms.length === rooms.length
                                    ? t('mapaCalor.roomsLabel', 'Cômodos mapeados')
                                    : `${visibleRooms.length} de ${rooms.length} cômodos`}
                            </Text>
                            {visibleRooms.length === 0 ? (
                                <View style={s.noMatchBox}>
                                    <Body style={[s.noMatchText, { color: textBody }]}>
                                        {t('mapaCalor.noMatch', 'Nenhum cômodo se encaixa nesse filtro. Tenta outra combinação.')}
                                    </Body>
                                </View>
                            ) : (
                                <View style={s.grid}>
                                    {visibleRooms.map(room => (
                                        <RoomHeatCard
                                            key={room.id}
                                            room={room}
                                            textPrimary={textPrimary}
                                            textBody={textBody}
                                            onPress={() => handleRoomPress(room)}
                                        />
                                    ))}
                                </View>
                            )}
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

function TrendCard({ trend, textBody, textSecondary }) {
    if (!trend) return null;
    const { last7, prev7, deltaPct, buckets } = trend;
    const maxBucket = Math.max(1, ...buckets);

    const hasActivity = last7 > 0 || prev7 > 0;

    let deltaInfo = null;
    if (deltaPct !== null && prev7 > 0) {
        const up = deltaPct > 0;
        const flat = deltaPct === 0;
        deltaInfo = {
            color: flat ? Neo.colors.neutral[600] : (up ? '#16A34A' : '#DC2626'),
            symbol: flat ? '→' : (up ? '↑' : '↓'),
            text: `${flat ? '' : (up ? '+' : '')}${deltaPct}% vs 7 dias antes`,
        };
    } else if (last7 > 0 && prev7 === 0) {
        deltaInfo = {
            color: '#16A34A',
            symbol: '↑',
            text: 'Primeira semana ativa',
        };
    }

    return (
        <NeoCard variant="elevated" style={s.trendCard}>
            <View style={s.trendHeader}>
                <View style={{ flex: 1 }}>
                    <Caption style={[s.trendLabel, { color: textSecondary }]}>
                        ÚLTIMOS 7 DIAS
                    </Caption>
                    <View style={s.trendValueRow}>
                        <Text style={s.trendValue}>{last7}</Text>
                        <Caption style={[s.trendValueSub, { color: textBody }]}>
                            {last7 === 1 ? 'item resolvido' : 'itens resolvidos'}
                        </Caption>
                    </View>
                    {deltaInfo && (
                        <Caption style={[s.trendDelta, { color: deltaInfo.color }]}>
                            {deltaInfo.symbol} {deltaInfo.text}
                        </Caption>
                    )}
                    {!hasActivity && (
                        <Caption style={[s.trendDelta, { color: textBody }]}>
                            Sem atividade nas últimas 2 semanas.
                        </Caption>
                    )}
                </View>

                {/* Mini-bars dos últimos 14 dias (índice 0 = hoje à direita) */}
                {hasActivity && (
                    <View style={s.sparkline}>
                        {buckets.slice().reverse().map((count, i) => {
                            const h = count === 0 ? 4 : Math.max(6, (count / maxBucket) * 40);
                            const isLast7 = i >= 7; // últimos 7 (direita)
                            return (
                                <View
                                    key={i}
                                    style={{
                                        width: 4,
                                        height: h,
                                        borderRadius: 2,
                                        backgroundColor: isLast7
                                            ? Neo.colors.primary[500]
                                            : Neo.colors.neutral[300],
                                    }}
                                />
                            );
                        })}
                    </View>
                )}
            </View>
        </NeoCard>
    );
}

function FilterRow({ label, options, activeId, onChange, textSecondary }) {
    if (!options || options.length < 2) return null;
    return (
        <View style={{ marginBottom: 14 }}>
            <Caption style={[s.filterLabel, { color: textSecondary }]}>{label}</Caption>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.filterScrollContent}
            >
                {options.map(opt => {
                    const active = opt.id === activeId;
                    return (
                        <TouchableOpacity
                            key={opt.id}
                            onPress={() => onChange(opt.id)}
                            activeOpacity={0.8}
                            style={[s.filterChip, active && s.filterChipActive]}
                            accessibilityRole="button"
                            accessibilityState={{ selected: active }}
                        >
                            <Text style={[s.filterChipText, active && s.filterChipTextActive]}>
                                {opt.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

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
                                    <Danger size={11} color="#DC2626" variant="Bold" />
                                    <Caption style={[s.problemText, { color: '#DC2626' }]}>
                                        {room.stats.critical} crítico{room.stats.critical > 1 ? 's' : ''}
                                    </Caption>
                                </View>
                            )}
                            {room.stats.warning > 0 && (
                                <View style={s.problemChip}>
                                    <Warning2 size={11} color="#A16207" variant="Bold" />
                                    <Caption style={[s.problemText, { color: '#A16207' }]}>
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

    // Histórico (TrendCard)
    trendCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 18,
    },
    trendHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    trendLabel: {
        fontSize: 10.5,
        fontWeight: '800',
        letterSpacing: 1.2,
        marginBottom: 6,
    },
    trendValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 4,
    },
    trendValue: {
        fontSize: 32,
        fontWeight: '900',
        color: Neo.colors.primary[600],
        letterSpacing: -1,
    },
    trendValueSub: {
        fontSize: 12,
    },
    trendDelta: {
        fontSize: 12,
        fontWeight: '600',
    },
    sparkline: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 3,
        height: 44,
        marginLeft: 12,
    },

    // Filtros
    filterLabel: {
        fontSize: 10.5,
        fontWeight: '800',
        letterSpacing: 1.2,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    filterScrollContent: {
        flexDirection: 'row',
        gap: 8,
        paddingRight: 4,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
    },
    filterChipActive: {
        backgroundColor: Neo.colors.primary[500],
        borderColor: Neo.colors.primary[600],
    },
    filterChipText: {
        fontSize: 12.5,
        fontWeight: '600',
        color: Neo.colors.neutral[700],
    },
    filterChipTextActive: {
        color: '#FFFFFF',
        fontWeight: '800',
    },
    noMatchBox: {
        padding: 24,
        alignItems: 'center',
    },
    noMatchText: {
        fontSize: 14,
        textAlign: 'center',
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
