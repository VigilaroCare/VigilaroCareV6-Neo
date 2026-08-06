
import React, { useRef, useState, useCallback } from 'react';
import { View, Text, Image, Animated, ScrollView, StyleSheet, Share, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, H3, Body, Small, Eyebrow } from '../../components/NeoTypography';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import NeoCard from '../../components/NeoCard';
import ButtonNeo from '../../components/ButtonNeo';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import GlassProfileRing from '../../components/GlassProfileRing';
import TappablePressable from '../../components/TappablePressable';
import ProfileService from '../../services/ProfileService';
import EmptyState from '../../components/EmptyState';
import { SkeletonCard } from '../../components/SkeletonLoader';

// Campos médicos são arrays no schema. Normaliza item string OU objeto em texto.
const asList = (arr) => (Array.isArray(arr) ? arr : [])
    .map(it => (typeof it === 'string' ? it : (it?.nome || it?.label || it?.descricao || '')))
    .filter(Boolean);

// Hues a partir da paleta de grid do DS (hex → permite alpha +'18').
// accent só expõe champagne/copper; rose/amber vivem em gridAccents.
const HUE = {
    rose: Neo.colors.gridAccents.pets.color,        // #BE185D — condições/sangue
    sky:  Neo.colors.gridAccents.vistorias.color,   // #0369A1 — medicamentos (informativo)
};

export default function MinhaSaudeScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    // Sem param = perfil ativo (pouso). Com param = espiar outro perfil (read-only).
    const perfilId = route.params?.perfilId ?? null;

    const [profile, setProfile] = useState(null);
    const [others, setOthers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useFocusEffect(useCallback(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            setImageError(false);
            try {
                const humanos = await ProfileService.getPerfisHumanos();
                let current = perfilId ? humanos.find(p => p.id === perfilId) : null;
                if (!current) current = await ProfileService.getPerfilAtivo();
                const outros = humanos.filter(p => p.id !== current?.id);
                if (alive) { setProfile(current); setOthers(outros); }
            } catch (e) {
                if (__DEV__) console.error('[MinhaSaude] load', e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [perfilId]));

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 280;
    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ];

    const titleStr = perfilId ? (profile?.nome || 'Perfil') : t('health.myHealth', 'Sua Saúde');
    const capaSource = require('../../assets/images/headers/header-saude.jpeg');
    const themeColors = Neo.colors;

    const idade = profile?.dataNascimento ? ProfileService.calcularIdade(profile.dataNascimento) : null;
    const condicoes = asList(profile?.condicoesMedicas);
    const alergias = asList(profile?.alergias);
    const medicamentos = asList(profile?.medicamentosEmUso);
    const necessidades = asList(profile?.necessidadesEspeciais);
    const tipoSanguineo = profile?.tipoSanguineo || '';

    const handleShare = async () => {
        if (!profile) return;
        const fmt = (label, arr) => `*${label}:*\n${arr.length ? arr.join(', ') : '—'}`;
        const msg = `*Ficha de Emergência — ${profile.nome || 'Perfil'} (VigilaroCare)*\n\n` +
            (tipoSanguineo ? `*Tipo Sanguíneo:* ${tipoSanguineo}\n` : '') +
            (idade != null ? `*Idade:* ${idade} anos\n` : '') + `\n` +
            fmt('Condições Médicas', condicoes) + `\n\n` +
            fmt('Alergias', alergias) + `\n\n` +
            fmt('Medicamentos em Uso', medicamentos) + `\n\n` +
            fmt('Necessidades Especiais', necessidades) + `\n\n` +
            `Gerado por VigilaroCare — Prevenção Familiar`;
        try {
            await Share.share({ message: msg, title: `Ficha de ${profile.nome || 'Emergência'}` });
        } catch (e) {
            if (__DEV__) console.error('[MinhaSaude] share', e);
        }
    };

    const renderChips = (arr, color) => {
        if (!arr.length) return <Body style={s.emptyText}>Nada registrado</Body>;
        return (
            <View style={s.chipsWrap}>
                {arr.map((item, i) => (
                    <View key={i} style={[s.chip, { backgroundColor: color + '18', borderColor: color + '33' }]}>
                        <Small style={[s.chipText, { color }]}>{item}</Small>
                    </View>
                ))}
            </View>
        );
    };

    const Section = ({ icon, color, title, children }) => (
        <NeoCard variant="glass" style={s.card}>
            <View style={s.cardHeaderRow}>
                <NeoIcon name={icon} variant="Linear" color={color} size={22} />
                <H3 style={s.cardTitle}>{title}</H3>
            </View>
            {children}
        </NeoCard>
    );

    return (
        <AppBackground>
            
                <StatusBar style="dark" />
                            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
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
            </SafeAreaView>

            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {/* HERO com Glassmorphism Pessoal */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors?.neutral?.[800] || '#222',
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                        {profile ? (
                            <>
                                {/* Foto Principal Quadrada */}
                                <View style={{
                                    width: 110,
                                    height: 110,
                                    borderRadius: 20,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderWidth: 3,
                                    borderColor: 'rgba(255,255,255,0.6)',
                                    overflow: 'hidden',
                                    marginRight: 16,
                                    elevation: 8,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                }}>
                                    <Image
                                        source={profile?.foto ? { uri: ProfileService.resolveImageUri(profile.foto) } : capaSource}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="cover"
                                    />
                                </View>

                                <View style={{ flex: 1, paddingBottom: 4 }}>
                                    <View style={{ backgroundColor: Neo.colors.success[500], paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 }}>
                                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>Monitoramento Ativo</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 28,
                                        fontWeight: '900',
                                        color: '#FFF',
                                        letterSpacing: -0.5,
                                        lineHeight: 32,
                                        marginBottom: 4,
                                    }} numberOfLines={2}>
                                        {profile.nome || 'Perfil'}
                                    </Text>
                                    {!!tipoSanguineo && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                            <NeoIcon name="Drop" variant="Bold" color={HUE.rose} size={14} />
                                            <Text style={{ fontSize: 14, color: '#FFF', fontWeight: 'bold', marginLeft: 4 }}>{tipoSanguineo}</Text>
                                        </View>
                                    )}
                                </View>
                            </>
                        ) : (
                            <View style={{ paddingBottom: 4 }}>
                                <Text style={{ fontSize: 34, fontWeight: '900', color: '#FFF', letterSpacing: -0.8, lineHeight: 38 }}>
                                    {titleStr}
                                </Text>
                            </View>
                        )}
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ paddingTop: 24 }}>

                {loading ? (
                    <View style={s.scroll}>
                        <View style={{ marginTop: Neo.spacing.md }}>
                            <SkeletonCard lines={2} />
                            <SkeletonCard lines={3} />
                            <SkeletonCard lines={2} />
                        </View>
                    </View>
                ) : !profile ? (
                    <EmptyState
                        icon="Users"
                        title={t('health.noProfiles', 'Nenhum perfil cadastrado')}
                        description={t('health.noProfilesDesc', 'Cadastre perfis humanos para gerenciar as informações de saúde.')}
                        cta={{
                            label: t('health.addProfile', 'Cadastrar Perfil'),
                            onPress: () => navigation.navigate('QuemProteger'),
                            color: Neo.colors.primary[500]
                        }}
                    />
                ) : (
                    <View style={s.scroll}>
                        {/* Profile stats now in Hero */}
                        <Eyebrow style={s.eyebrow}>Perfil de Risco e Prevenção</Eyebrow>
                        <Section icon="Heartbeat" color={HUE.rose} title="Condições Médicas">
                            {renderChips(condicoes, HUE.rose)}
                        </Section>
                        <Section icon="Warning" color={Neo.colors.accent.copper} title="Alergias e Restrições">
                            {renderChips(alergias, Neo.colors.accent.copper)}
                        </Section>
                        <Section icon="Wheelchair" color={Neo.colors.primary[600]} title="Necessidades Especiais">
                            {renderChips(necessidades, Neo.colors.primary[600])}
                        </Section>

                        <Eyebrow style={s.eyebrow}>Mural de Rotina</Eyebrow>
                        <Section icon="Plus" color={HUE.sky} title="Medicamentos em Uso">
                            {renderChips(medicamentos, HUE.sky)}
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 6,
                                    marginTop: 12,
                                    alignSelf: 'flex-start',
                                    backgroundColor: HUE.sky + '12',
                                    paddingHorizontal: 14,
                                    paddingVertical: 8,
                                    borderRadius: 999,
                                    borderWidth: 1,
                                    borderColor: HUE.sky + '30',
                                }}
                                onPress={() => navigation.navigate('MedicationReminders', { perfilId: profile?.id, perfilNome: profile?.nome })}
                                accessibilityLabel="Gerenciar lembretes de medicamentos"
                            >
                                <NeoIcon name="Clock" variant="Bold" size={14} color={HUE.sky} />
                                <Small style={{ color: HUE.sky, fontWeight: '700', fontSize: 13 }}>
                                    Gerenciar lembretes
                                </Small>
                            </TouchableOpacity>
                        </Section>

                        {/* OUTROS PERFIS — linhas dentro de um NeoCard (§4); voltar retorna ao ativo */}
                        {others.length > 0 && (
                            <>
                                <Eyebrow style={s.eyebrow}>Outros perfis da casa</Eyebrow>
                                <NeoCard variant="glass" padding={0} style={s.card}>
                                    {others.map((p, i) => (
                                        <TappablePressable
                                            key={p.id}
                                            onPress={() => navigation.push('MinhaSaude', { perfilId: p.id })}
                                            style={[s.row, i > 0 && s.rowDivider]}
                                        >
                                            <GlassProfileRing profile={p} score={0} resolveUri={ProfileService.resolveImageUri} size={40} ringWidth={2} />
                                            <Body style={s.rowName} numberOfLines={1}>{p.nome || 'Perfil'}</Body>
                                            <NeoIcon name="ArrowRight2" variant="Linear" color={Neo.colors.neutral[500]} size={16} />
                                        </TappablePressable>
                                    ))}
                                </NeoCard>
                            </>
                        )}

                        <View style={s.actionContainer}>
                            <ButtonNeo
                                title="Compartilhar Ficha de Emergência"
                                iconName="ShareNetwork"
                                onPress={handleShare}
                                type="primary"
                            />
                        </View>
                    </View>
                )}
            
            </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Neo.spacing.xl, gap: 12 },
    emptyBig: { color: Neo.colors.neutral[500], textAlign: 'center' },
    scroll: { paddingHorizontal: Neo.spacing.lg, paddingBottom: Neo.layout.scrollBottomFooter },
    hero: { marginTop: Neo.spacing.sm },
    heroRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    heroLead: { flex: 1 },
    heroName: { color: Neo.colors.neutral[800] },
    heroMeta: { color: Neo.colors.neutral[500], marginTop: 2 },
    bloodBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, alignSelf: 'flex-start',
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: HUE.rose + '14',
    },
    bloodText: { color: HUE.rose, fontWeight: '700' },
    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    card: { marginBottom: Neo.spacing.md },
    cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
    cardTitle: { fontSize: 16, color: Neo.colors.neutral[800] },
    chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
    chipText: { fontWeight: '600' },
    emptyText: { color: Neo.colors.neutral[400], fontStyle: 'italic' },
    hintText: { fontSize: 12, color: Neo.colors.neutral[500], marginTop: 10, fontStyle: 'italic' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: Neo.spacing.md, paddingVertical: 12 },
    rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Neo.colors.neutral[300] },
    rowName: { flex: 1, color: Neo.colors.neutral[800] },
    actionContainer: { marginTop: Neo.spacing.lg },
});
