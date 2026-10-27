import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { View, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Text, Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import ReviewImage from '../../components/ReviewImage';

import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { ChecklistService } from '../../services/ChecklistService';
import SafetyReportService from '../../services/SafetyReportService';
import NeoAlert from '../../utils/NeoAlert';
import { isAreaRelevant, getRoomChecklistStructure } from '../../utils/ProfileFilterEngine';
import { AMBIENTES } from "../../data/mapeamento_dados";

import NeoCard from '../../components/NeoCard';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import NeoText, { H3, Body, Small } from "../../components/NeoTypography";
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { SkeletonCard } from '../../components/SkeletonLoader';
import NeoHeroHeader from '../../components/NeoHeroHeader';

// Helper de cor para badge de status do ambiente
const getStatusStyle = (status) => {
    if (status === 'Seguro')   return { bg: 'rgba(46,125,50,0.12)',   color: Neo.colors.primary[700] };
    if (status === 'Pendente') return { bg: 'rgba(120,120,128,0.12)', color: Neo.colors.neutral[700] };
    if (status === 'Atenção')  return { bg: 'rgba(245,158,11,0.14)',  color: Neo.colors.accent.copper };
    if (status === 'Risco')    return { bg: 'rgba(229,57,53,0.12)',   color: Neo.colors.feedback.error };
    return { bg: 'rgba(0,0,0,0.05)', color: Neo.colors.neutral[500] };
};

export default function RelatoriosScreenNeo({ navigation }) {
    const { t } = useTranslation();
    const route = useRoute();
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [score, setScore] = useState(0);
    const [pendingActions, setPendingActions] = useState([]);
    const [profilesCount, setProfilesCount] = useState(0);
    const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });

    // Deep-link UX: quando vier de Home com params.focus === 'pendencias'
    // (alerta contextual de pontos críticos), pula direto pra SafetyActionPlan
    // assim que os dados carregarem — economiza 1 tap do usuário.
    // Usa ref pra disparar uma única vez por mount (evita loop).
    const didAutoRedirectRef = useRef(false);
    useEffect(() => {
        if (didAutoRedirectRef.current) return;
        if (loading) return;
        if (route?.params?.focus !== 'pendencias') return;
        if (pendingActions.length === 0) return;
        didAutoRedirectRef.current = true;
        navigation.replace('SafetyActionPlan');
    }, [loading, pendingActions.length, route?.params?.focus, navigation]);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [generatingPDF, setGeneratingPDF] = useState(false);

    const handleExportPDF = async () => {
        try {
            setGeneratingPDF(true);
            const profiles = await ProfileService.getPerfis();
            if (profiles && profiles.length > 0) {
                const activeProfileId = profiles[0].id;
                await SafetyReportService.generatePDFReport(activeProfileId);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingPDF(false);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const mapping = (await ProfileService.getMapping()) || [];
            const moradia = (await ProfileService.getMoradia()) || {};
            const profilesData = await ProfileService.getPerfis();
            const profiles = Array.isArray(profilesData) ? profilesData : [];
            setProfilesCount(profiles.length);

            const meta = await ProfileService.getMeta();
            setFamilyMeta(meta || { totalMoradoresEsperados: 0 });

            const activeId = await ProfileService.getActiveResidenceId();
            const checklistState = await ChecklistService.getAllState(activeId);

            const relevantAreas = AMBIENTES.filter(
                (area) => isAreaRelevant(area, moradia, profiles, mapping) && !area.id.includes('kit')
            );

            const COLORS = [
                Neo.colors.primary[500],
                Neo.colors.secondary[500],
                Neo.colors.feedback.warning,
                '#AB47BC', '#7E57C2', '#42A5F5', '#26C6DA', '#66BB6A', '#FFCA28',
            ];

            const finalData = relevantAreas.map((area, index) => {
                const areaData = checklistState[area.id] || {};
                const structure = getRoomChecklistStructure(area.id, profiles, moradia, mapping);
                const stats = ChecklistService.getAreaStats(
                    area.id, areaData, structure, profiles, moradia, mapping
                );

                let fullName = t_field(area, 'nome');
                if (area.id === 'sala' && mapping.includes('sala_estar') && mapping.includes('sala_jantar')) {
                    fullName = t('reports.integratedLivingDining', 'Sala de Estar/Jantar (Integradas)');
                }

                return {
                    key: area.id,
                    fullName: fullName,
                    emoji: area.emoji,
                    iconName: area.iconName,
                    imagemUrl: area.imagemUrl,
                    total: stats.total,
                    checked: stats.checked,
                    percent: stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0,
                    color: area.cor || COLORS[index % COLORS.length],
                };
            });

            // Pendências (itens com status = risco)
            const allRiskItems = [];
            relevantAreas.forEach((area) => {
                const areaData = checklistState[area.id] || [];
                const risks = (Array.isArray(areaData) ? areaData : []).filter((item) => item.status === 'risco');
                risks.forEach((risk) => {
                    let roomName = t_field(area, 'nome');
                    if (area.id === 'sala' && mapping.includes('sala_estar') && mapping.includes('sala_jantar')) {
                        roomName = t('reports.integratedLivingDining', 'Sala de Estar/Jantar (Integradas)');
                    }
                    allRiskItems.push({
                        ...risk,
                        roomName: roomName,
                        roomId: area.id,
                        roomIcon: area.emoji,
                    });
                });
            });
            setPendingActions(allRiskItems);
            setChartData(finalData);

            if (finalData.length > 0) {
                const globalChecked = finalData.reduce((acc, item) => acc + item.checked, 0);
                const globalTotal = finalData.reduce((acc, item) => acc + item.total, 0);
                setScore(globalTotal > 0 ? Math.round((globalChecked / globalTotal) * 100) : 0);
            } else {
                setScore(0);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { loadData(); }, []));

    const criticalAreas = useMemo(() => {
        return chartData
            .filter((item) => item.checked < item.total)
            .sort((a, b) => (b.total - b.checked) - (a.total - a.checked))
            .slice(0, 3);
    }, [chartData]);

    const getStatisticInsight = (areaId) => {
        if (areaId.includes('cozinha'))   return { icon: 'Danger',     text: t('reports.insightKitchen', 'Cozinha: Risco alto de queimaduras.') };
        if (areaId.includes('piscina'))   return { icon: 'Drop',       text: t('reports.insightPool', 'Piscina: Risco de afogamento silencioso.') };
        if (areaId.includes('banheiro'))  return { icon: 'Activity',   text: t('reports.insightBathroom', '80% das quedas em casa ocorrem aqui.') };
        if (areaId.includes('area_servico')) return { icon: 'Warning2', text: t('reports.insightServiceArea', 'Atenção redobrada com produtos tóxicos.') };
        return { icon: 'InfoCircle', text: t('reports.insightGeneral', 'Pequenos descuidos causam acidentes.') };
    };

    const missingProfilesCount = Math.max(0, (familyMeta?.totalMoradoresEsperados || 0) - profilesCount);

    // Mapa de Riscos: monta-se com o cadastro da casa e dos moradores — não com a
    // vistoria (CLAUDE.md: mapa ≠ vistoria). O aviso só fala do que o mapa usa.
    const abrirMapa = () => {
        if (missingProfilesCount > 0) {
            NeoAlert.alert(
                t('reports.mapaAvisoTitulo', 'Cadastro incompleto'),
                t('reports.mapaAvisoTexto', { count: missingProfilesCount, defaultValue: 'O Mapa de Riscos se monta com o que você cadastrou sobre a casa e os moradores — não depende da vistoria. Ainda falta cadastrar {{count}} morador(es), e o mapa pode ficar incompleto.' }),
                [
                    { text: t('reports.verAssimMesmo', 'Ver assim mesmo'), onPress: () => navigation.navigate('MapaDeRiscos') },
                    { text: t('reports.completarCadastro', 'Completar cadastro'), onPress: () => navigation.navigate('QuemProteger') },
                ],
            );
            return;
        }
        navigation.navigate('MapaDeRiscos');
    };

    // Relatório: usa as respostas da vistoria. Com item sem resposta, avisa antes
    // e oferece continuar a vistoria de onde parou.
    const abrirRelatorio = () => {
        const faltam = chartData.reduce((acc, a) => acc + Math.max(0, a.total - a.checked), 0);
        const idx = chartData.findIndex((a) => a.checked < a.total);
        if (faltam > 0 && idx >= 0) {
            const area = chartData[idx];
            NeoAlert.alert(
                t('reports.relatorioAvisoTitulo', 'Vistoria incompleta'),
                t('reports.relatorioAvisoTexto', { count: faltam, defaultValue: 'O relatório usa as respostas da vistoria. Ainda faltam {{count}} item(ns) sem resposta; até lá, ele mostra só o que já foi respondido.' }),
                [
                    { text: t('reports.verAssimMesmo', 'Ver assim mesmo'), onPress: () => navigation.navigate('ProfileRiskSummary') },
                    {
                        text: t('reports.continuarVistoria', 'Continuar a vistoria'),
                        onPress: () => navigation.navigate('ChecklistDetail', {
                            roomId: area.key,
                            roomName: area.fullName,
                            roomColor: area.color,
                            roomIcon: area.emoji,
                            fullChecklist: false,
                            sequentialRooms: chartData.map((item) => ({ roomId: item.key, roomName: item.fullName, roomColor: item.color, roomIcon: item.emoji })),
                            currentRoomIndex: idx,
                        }),
                    },
                ],
            );
            return;
        }
        navigation.navigate('ProfileRiskSummary');
    };
    const scrollY = useRef(new Animated.Value(0)).current;


    const capaUrl = require('../../assets/illustrations/pad/hero_preventivo.png');

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                {navigation.canGoBack() && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: 'rgba(0,0,0,0.35)',
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 16, marginTop: 12,
                        }}
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={[s.scrollContent, { paddingBottom: 120 }]}
            >
                {/* HERO com parallax */}
                <NeoHeroHeader
                    scrollY={scrollY}
                    source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                    title={t('reports.title', 'Vistorias da Casa')}
                    height={260}
                    // O scroll desta tela tem paddingHorizontal (s.scrollContent):
                    // sem vencer esse recuo, o hero fica com faixa de fundo dos
                    // dois lados em vez de ir de ponta a ponta.
                    bleed={Neo.spacing.lg}
                />
                    {loading ? (
                        <View style={{ paddingHorizontal: Neo.spacing.lg, marginTop: 12 }}>
                            <SkeletonCard hasAvatar={false} lines={3} />
                            <SkeletonCard hasAvatar={false} lines={2} />
                            <SkeletonCard hasAvatar={false} lines={2} />
                        </View>
                    ) : (
                        <>
                            {/* AÇÕES — relatório detalhado + histórico */}
                            {/* STANDBY (2026-05-19): card "Relatório detalhado" oculto a pedido do user.
                                Motivo: redundância com os checklists logo abaixo na tela.
                                Decisão sobre redesign ou remoção definitiva fica para próxima iteração.
                                A função do modal (setDetailsModalVisible) e o modal em si permanecem
                                no código, prontos para reativar quando o user definir o redesign.

                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => setDetailsModalVisible(true)}
                                style={{ marginBottom: 10 }}
                            >
                                <NeoCard variant="elevated" style={s.actionCard}>
                                    <View style={[s.actionIconWrap, { backgroundColor: 'rgba(99,102,241,0.20)' }]}>
                                        <NeoIcon name="DocumentText" size={22} color="#6366F1" variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.actionTitle}>
                                            {t('reports.personalReport', 'Relatório detalhado')}
                                        </Body>
                                        <Small style={s.actionSub} numberOfLines={2}>
                                            {t('reports.personalReportDesc', 'Inclui exportação em PDF e plano de ação.')}
                                        </Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>
                            */}

                            {/* PENDÊNCIAS CRÍTICAS CARD */}
                            {pendingActions.length > 0 && (
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => navigation.navigate('SafetyActionPlan')}
                                    style={{ marginBottom: 22 }}
                                >
                                    <NeoCard variant="elevated" style={[s.actionCard, { borderColor: 'rgba(229,57,53,0.3)', borderWidth: 1 }]}>
                                        <View style={[s.actionIconWrap, { backgroundColor: 'rgba(229,57,53,0.20)' }]}>
                                            <NeoIcon name="Warning2" size={22} color={Neo.colors.feedback.error} variant="Bold" />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 14 }}>
                                            <Body style={[s.actionTitle, { color: Neo.colors.feedback.error }]}>
                                                {t('reports.pendencies', 'Pendências')}
                                            </Body>
                                            <Small style={s.actionSub} numberOfLines={2}>
                                                {t('reports.pendenciesDesc', 'Você tem {{count}} item(ns) pendente(s) com risco.', { count: pendingActions.length })}
                                            </Small>
                                        </View>
                                        <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                    </NeoCard>
                                </TouchableOpacity>
                            )}

                            {/* AMBIENTES VISTORIADOS — seção inline.
                                Antes era card de nav que abria AmbientesVistoriadosScreen.
                                Conteúdo (Mapa de Riscos + grid de ambientes) elevado pra cá. */}
                            <Text style={[s.sectionLabel, { marginTop: pendingActions.length > 0 ? 4 : 0 }]}>
                                {t('reports.environmentInspection', 'Ambientes Vistoriados')}
                            </Text>

                            {/* Grid de ambientes com status por cômodo usando NeoHorizontalCard */}
                            {chartData.length > 0 && (
                                <View style={{ flexDirection: 'column', gap: 12, marginTop: 10 }}>
                                    {chartData.map((area, index) => {
                                        const getRoomImage = (roomId) => {
                                            switch (roomId) {
                                                case 'cozinha': return require('../../assets/illustrations/pad/cozinha-utensilios_cozinha-fogao-panelas_006.jpg');
                                                case 'quarto': return require('../../assets/illustrations/pad/ambientes-casa_quarto-casal_007.jpg');
                                                case 'banheiro': return require('../../assets/illustrations/pad/ambientes-casa_stockvault-blue-bathroom-124784_038.jpg');
                                                case 'sala': return require('../../assets/illustrations/pad/ambientes-casa_sala-estar_036.jpg');
                                                case 'quintal': return require('../../assets/illustrations/pad/ambientes-casa_quintal-arvores_037.jpg');
                                                case 'lavanderia': 
                                                case 'area_servico': return require('../../assets/illustrations/pad/ambientes-casa_laundry-room_026.jpg');
                                                case 'escada': return require('../../assets/illustrations/pad/quedas-escadas_escada-madeira_022.jpg');
                                                case 'garagem': return require('../../assets/illustrations/pad/ambientes-casa_carro-na-garagem_011.jpg');
                                                case 'central_gas': return require('../../assets/illustrations/pad/gas-vazamento_central-de-gu00e1s_003.jpg');
                                                default: return require('../../assets/illustrations/pad/hero_preventivo.png');
                                            }
                                        };

                                        const statusKey = area.percent === 100 && area.total > 0
                                            ? 'Seguro'
                                            : area.checked === 0 ? 'Pendente'
                                            : area.percent >= 70 ? 'Atenção' : 'Risco';
                                        const statusStyle = getStatusStyle(statusKey);
                                        let statusLabel = statusKey;
                                        if (statusKey === 'Seguro')   statusLabel = t('reports.statusSafe', 'Seguro');
                                        if (statusKey === 'Pendente') statusLabel = t('reports.statusPending', 'Pendente');
                                        if (statusKey === 'Atenção')  statusLabel = t('reports.statusAttention', 'Atenção');
                                        if (statusKey === 'Risco')    statusLabel = t('reports.statusRisk', 'Risco');

                                        const progressText = area.total > 0 ? t('telas.RelatoriosScreenNeo.itensContagem', { feitos: area.checked, total: area.total, defaultValue: '{{feitos}}/{{total}} Itens' }) : t('telas.RelatoriosScreenNeo.semItens', 'Sem itens');
                                        const restantes = Math.max(0, area.total - area.checked);
                                        const minutosEst = restantes > 0 ? Math.max(1, Math.ceil(restantes * 0.12)) : 0;

                                        // Pílula de status + tempo estimado (Lei de Parkinson) + trilha de progresso (Gradiente de Meta)
                                        const StatusPill = (
                                            <View style={{ marginTop: 4, width: '100%' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                                    <View style={[s.statusPill, { backgroundColor: statusStyle.bg }]}>
                                                        <Small style={[s.statusText, { color: statusStyle.color }]} numberOfLines={1}>
                                                            {statusLabel}
                                                        </Small>
                                                    </View>
                                                    {minutosEst > 0 && (
                                                        <Small style={{ fontSize: 11, color: themeColors.neutral[600], fontWeight: '600' }} numberOfLines={1}>
                                                            {`~${minutosEst} min`}
                                                        </Small>
                                                    )}
                                                </View>
                                                {area.total > 0 && (
                                                    <View style={{
                                                        height: 4,
                                                        borderRadius: 2,
                                                        backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)',
                                                        marginTop: 6,
                                                        overflow: 'hidden',
                                                    }}>
                                                        <View style={{
                                                            width: `${Math.min(100, Math.max(area.checked > 0 ? 8 : 0, area.percent))}%`,
                                                            height: '100%',
                                                            borderRadius: 2,
                                                            backgroundColor: area.checked > 0 ? statusStyle.color : 'transparent',
                                                        }} />
                                                    </View>
                                                )}
                                            </View>
                                        );

                                        const sequentialRooms = chartData.map(item => ({
                                            roomId: item.key,
                                            roomName: item.fullName,
                                            roomColor: item.color,
                                            roomIcon: item.emoji,
                                        }));

                                        return (
                                            <NeoHorizontalCard
                                                key={area.key}
                                                title={area.fullName}
                                                description={`${progressText}`}
                                                iconName={area.iconName || area.icone}
                                                imageUrl={getRoomImage(area.key)}
                                                color={area.color}
                                                onPress={() => navigation.navigate('ChecklistDetail', {
                                                    roomId: area.key,
                                                    roomName: area.fullName,
                                                    roomColor: area.color,
                                                    roomIcon: area.emoji,
                                                    fullChecklist: false,
                                                    sequentialRooms,
                                                    currentRoomIndex: index,
                                                })}
                                                accessibilityLabel={area.fullName}
                                            >
                                                {StatusPill}
                                            </NeoHorizontalCard>
                                        );
                                    })}
                                </View>
                            )}

                            {/* VISTORIAS ESPECIAIS — 2-col, glass cards limpos */}
                            <Text style={[s.sectionLabel, { marginTop: 24 }]}>
                                {t('reports.specialInspections', 'Vistorias Especiais')}
                            </Text>
                            <View style={s.specialGrid}>
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={s.specialCell}
                                    onPress={() => navigation.navigate('EscolaSegura')}
                                >
                                    <NeoCard variant="elevated" style={[s.specialCard, { padding: 0, overflow: 'hidden' }]}>
                                        <ReviewImage 
                                            source={require('../../assets/illustrations/pad/encontradas_brinquedos-seguros-escola.webp')} 
                                            style={{ width: '100%', height: 76, backgroundColor: '#E8F5E9' }}
                                            resizeMode="cover"
                                        />
                                        <View style={{ padding: 12, alignItems: 'center', marginTop: -28 }}>
                                            <View style={[s.specialIconWrap, { backgroundColor: '#2E7D32', borderWidth: 2, borderColor: '#fff' }]}>
                                                <NeoIcon name="Teacher" size={24} color="#FFF" variant="Bold" />
                                            </View>
                                            <H3 style={s.specialTitle}>
                                                {t('reports.safeSchool', 'Escola Segura')}
                                            </H3>
                                            <Small style={s.specialSub} numberOfLines={2}>
                                                {t('reports.safeSchoolDesc', 'Vistoria escolar')}
                                            </Small>
                                        </View>
                                    </NeoCard>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={s.specialCell}
                                    onPress={() => navigation.navigate('VistoriaAsilo')}
                                >
                                    <NeoCard variant="elevated" style={[s.specialCard, { padding: 0, overflow: 'hidden' }]}>
                                        <ReviewImage 
                                            source={require('../../assets/illustrations/pad/idosos_acessibilidade-direito-de-todos-hd-2_001.jpg')} 
                                            style={{ width: '100%', height: 76, backgroundColor: themeColors.categoria.ardosia.tint }}
                                            resizeMode="cover"
                                        />
                                        <View style={{ padding: 12, alignItems: 'center', marginTop: -28 }}>
                                            <View style={[s.specialIconWrap, { backgroundColor: '#1565C0', borderWidth: 2, borderColor: '#fff' }]}>
                                                <NeoIcon name="Building" size={24} color="#FFF" variant="Bold" />
                                            </View>
                                            <H3 style={s.specialTitle}>
                                                {t('reports.safeNursingHome', 'Asilo Seguro')}
                                            </H3>
                                            <Small style={s.specialSub} numberOfLines={2}>
                                                {t('reports.safeNursingHomeDesc', 'Vistoria de instituição')}
                                            </Small>
                                        </View>
                                    </NeoCard>
                                </TouchableOpacity>
                            </View>

                            {/* MAPA DE RISCOS e RELATÓRIO — no fim da tela, depois de vistoriar
                                (decisão do Agnaldo, 22/10/2026). Cada um avisa antes de abrir se
                                falta o que ELE usa: o mapa usa o cadastro (casa + moradores) e não a
                                vistoria; o relatório usa as respostas da vistoria. */}
                            <Text style={[s.sectionLabel, { marginTop: 24 }]}>
                                {t('reports.analises', 'Análises')}
                            </Text>
                            {/* Duas leituras dos mesmos dados, lado a lado: o
                                Mapa de Riscos mostra o risco por AMBIENTE, o
                                Relatório mostra por PESSOA.

                                O Relatório vinha de uma aba própria no rodapé,
                                que dividia o nome com esta tela e confundia —
                                eram dois "relatórios" em dois lugares. A aba
                                virou Modo Viagem (2026-07-31); a entrada é
                                aqui, ao lado do irmão dela. */}
                            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={abrirMapa}
                                    style={{ flex: 1 }}
                                >
                                    <NeoCard variant="elevated" style={s.duploCard}>
                                        {/* Barricade: o mesmo glifo que marca o grupo
                                            "acidente e mecânico" dentro do mapa. A entrada
                                            cita o conteúdo — GridFour descrevia a grade de
                                            cômodos que a tela deixou de ser. */}
                                        <View style={[s.heatmapIconWrap, { backgroundColor: themeColors.neutral[200] }]}>
                                            <NeoIcon name="Barricade" size={22} color={themeColors.neutral[700]} variant="Bold" />
                                        </View>
                                        <Body style={[s.duploTitulo, { color: themeColors.neutral[900] }]} numberOfLines={1}>
                                            {t('reports.riskmap', 'Mapa de Riscos')}
                                        </Body>
                                        <Small style={[s.duploSub, { color: themeColors.neutral[700] }]} numberOfLines={2}>
                                            {t('reports.riskmapShort', 'Agentes por ambiente')}
                                        </Small>
                                    </NeoCard>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={abrirRelatorio}
                                    style={{ flex: 1 }}
                                >
                                    <NeoCard variant="elevated" style={s.duploCard}>
                                        {/* UserList: a tela é uma lista de riscos POR PESSOA,
                                            com reconhecimento e exportação — mais lista do que
                                            gráfico, e a pessoa é o que a distingue do card ao
                                            lado. Cor neutra igual à do irmão: um vermelho aqui
                                            e um verde ali leriam como "ruim × bom", quando são
                                            só duas leituras do mesmo dado. */}
                                        <View style={[s.heatmapIconWrap, { backgroundColor: themeColors.neutral[200] }]}>
                                            <NeoIcon name="UserList" size={22} color={themeColors.neutral[700]} variant="Bold" />
                                        </View>
                                        <Body style={[s.duploTitulo, { color: themeColors.neutral[900] }]} numberOfLines={1}>
                                            {t('reports.riskReport', 'Relatório')}
                                        </Body>
                                        <Small style={[s.duploSub, { color: themeColors.neutral[700] }]} numberOfLines={2}>
                                            {t('reports.riskReportShort', 'Risco por pessoa')}
                                        </Small>
                                    </NeoCard>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Animated.ScrollView>

                {/* MODAL — relatório detalhado (não reestilizado nesta passada) */}
                <Modal
                    animationType="slide"
                    transparent
                    visible={detailsModalVisible}
                    onRequestClose={() => setDetailsModalVisible(false)}
                >
                    <View style={s.modalBackdrop}>
                        <View style={s.modalContent}>
                            <View style={s.modalDragHandle} />

                            <View style={s.modalHeader}>
                                <H3>{t('reports.pendenciesPercent', { pct: 100 - score })}</H3>
                                <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                                    <NeoIcon name="CloseCircle" size={28} color={Neo.colors.neutral[400]} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={handleExportPDF}
                                disabled={generatingPDF}
                                style={s.pdfButton}
                            >
                                {generatingPDF ? (
                                    <ActivityIndicator size="small" color={Neo.colors.primary[600]} />
                                ) : (
                                    <>
                                        <NeoIcon name="DocumentDownload" size={20} color={Neo.colors.primary[600]} style={{ marginRight: 8 }} />
                                        <NeoText style={{ color: Neo.colors.primary[700], fontWeight: 'bold' }}>
                                            {t('reports.savePDF', 'Salvar PDF')}
                                        </NeoText>
                                    </>
                                )}
                            </TouchableOpacity>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {missingProfilesCount > 0 && (
                                    <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16, borderRadius: 16 }}>
                                        <View style={{ flexDirection: 'row', gap: 12 }}>
                                            <View style={{ backgroundColor: 'rgba(229,57,53,0.14)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                <NeoIcon name="Profile2User" size={22} color={Neo.colors.feedback.error} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Body style={{ color: Neo.colors.feedback.error, fontWeight: '800' }}>
                                                    {t('reports.incompleteReg', 'Cadastro incompleto')}
                                                </Body>
                                                <Small>{t('reports.missingPeople', { count: missingProfilesCount })}</Small>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={{ marginTop: 12, backgroundColor: Neo.colors.feedback.error, padding: 10, borderRadius: 10, alignItems: 'center' }}
                                            onPress={() => { setDetailsModalVisible(false); navigation.navigate('QuemProteger'); }}
                                        >
                                            <Small style={{ color: Neo.colors.neutral.white, fontWeight: '800' }}>{t('reports.resolve', 'Resolver')}</Small>
                                        </TouchableOpacity>
                                    </NeoCard>
                                )}

                                {criticalAreas.map((area) => {
                                    const insight = getStatisticInsight(area.key);
                                    return (
                                        <NeoCard variant="elevated" key={area.key} style={{ padding: 16, marginBottom: 12, borderRadius: 16 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Body style={{ fontWeight: '800' }}>{area.fullName}</Body>
                                                <View style={{ backgroundColor: 'rgba(229,57,53,0.14)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                                                    <Small style={{ color: Neo.colors.feedback.error, fontWeight: '800' }}>
                                                        {t('reports.pendenciesCount', { count: area.total - area.checked })}
                                                    </Small>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 10, padding: 12, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 10 }}>
                                                <NeoIcon name={insight.icon} size={20} color={Neo.colors.primary[600]} />
                                                <Small style={{ flex: 1, color: Neo.colors.neutral[600] }}>{insight.text}</Small>
                                            </View>
                                            <TouchableOpacity
                                                style={{ marginTop: 12, backgroundColor: Neo.colors.primary[500], padding: 12, borderRadius: 10, alignItems: 'center' }}
                                                onPress={() => {
                                                    setDetailsModalVisible(false);
                                                    const fullArea = AMBIENTES.find((a) => a.id === area.key);
                                                    if (fullArea) {
                                                        const sequentialRooms = chartData.map(item => ({
                                                            roomId: item.key,
                                                            roomName: item.fullName,
                                                            roomColor: item.color,
                                                            roomIcon: item.emoji,
                                                        }));
                                                        const currentRoomIndex = chartData.findIndex(item => item.key === area.key);
                                                        navigation.navigate('ChecklistDetail', {
                                                            roomId: fullArea.id,
                                                            roomName: fullArea.nome,
                                                            roomColor: fullArea.cor,
                                                            roomIcon: fullArea.emoji,
                                                            sequentialRooms,
                                                            currentRoomIndex: currentRoomIndex !== -1 ? currentRoomIndex : undefined,
                                                        });
                                                    }
                                                }}
                                            >
                                                <Body style={{ color: Neo.colors.neutral.white, fontWeight: '800' }}>{t('reports.verifyNow', 'Verificar agora')}</Body>
                                            </TouchableOpacity>
                                        </NeoCard>
                                    );
                                })}

                                {score === 100 && (
                                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                                        <NeoIcon name="Star" size={56} color="#FFD700" variant="Bold" />
                                        <H3 style={{ marginTop: 16, textAlign: 'center' }}>{t('reports.allSafe', 'Tudo seguro')}</H3>
                                        <Body style={{ textAlign: 'center', color: Neo.colors.neutral[500] }}>
                                            {t('reports.allSafeMsg', 'Sua casa está com todos os checks completos.')}
                                        </Body>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
        </AppBackground>
    );
}

const s = {
    headerBlock: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 18,
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Action cards (relatório + histórico)
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 18,
    },
    actionIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontWeight: '800',
        fontSize: 15,
        color: Neo.colors.neutral[900],
    },
    actionSub: {
        color: Neo.colors.neutral[600],
        marginTop: 2,
        lineHeight: 16,
    },

    // Card de entrada inline pro MapaDeRiscos
    heatmapCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 18,
    },
    // Meia largura: o card do mapa era horizontal e ocupava a linha
    // toda. Virou vertical para caber ao lado do Relatório.
    duploCard: {
        padding: 14,
        borderRadius: 18,
        minHeight: 132,
    },
    duploTitulo: {
        fontWeight: '700',
        fontSize: 15,
        marginTop: 10,
    },
    duploSub: {
        fontSize: 12,
        marginTop: 2,
    },
    heatmapIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    heatmapTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 2,
    },
    heatmapSub: {
        lineHeight: 16,
    },

    // Grid 3-col de ambientes
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    gridCell: {
        width: '31.5%',
        marginBottom: 4,
    },
    roomCard: {
        borderRadius: 18,
        padding: 10,
        paddingTop: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 128,
    },
    roomCardCritical: {
        borderWidth: 1,
        borderColor: 'rgba(229,57,53,0.25)',
    },
    roomIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    roomLabel: {
        fontWeight: '800',
        fontSize: 11.5,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        lineHeight: 14,
        marginBottom: 6,
        minHeight: 28,
    },
    statusPill: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },

    // Grid 2-col vistorias especiais
    specialGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    specialCell: {
        width: '48.5%',
        marginBottom: 4,
    },
    specialCard: {
        borderRadius: 18,
        padding: 16,
        minHeight: 140,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    specialIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    specialTitle: {
        fontSize: 14,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 4,
    },
    specialSub: {
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        lineHeight: 14,
    },

    // Modal
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Neo.colors.neutral.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '85%',
        padding: 24,
    },
    modalDragHandle: {
        width: 40,
        height: 4,
        backgroundColor: Neo.colors.neutral[400],
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pdfButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(16,185,129,0.10)',
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(16,185,129,0.25)',
    },
};
