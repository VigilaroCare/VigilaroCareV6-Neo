
import { useRef, useState, useCallback } from "react";
import { View, Text, Image, Animated, StyleSheet, Share, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H3, Body, Small, Eyebrow } from "../../components/NeoTypography";
import NeoCard from '../../components/NeoCard';
import ButtonNeo from '../../components/ButtonNeo';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import GlassProfileRing from '../../components/GlassProfileRing';
import TappablePressable from '../../components/TappablePressable';
import ProfileService from '../../services/ProfileService';
import { rotuloOpcaoPerfil } from '../../data/opcoesPerfil';
import { PET_SPECIES, PET_SIZES, rotuloOnboarding } from '../../data/onboarding_data';
import EmptyState from '../../components/EmptyState';
import { SkeletonCard } from '../../components/SkeletonLoader';

const asList = (arr) => (Array.isArray(arr) ? arr : [])
    .map(it => (typeof it === 'string' ? it : (it?.nome || it?.label || it?.descricao || '')))
    .filter(Boolean);

const HUE = {
    rose: Neo.colors.gridAccents.pets.color,        // #BE185D
    sky:  Neo.colors.gridAccents.vistorias.color,   // #0369A1
};

export default function SaudePetScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    // Pet NUNCA é perfil ativo: pouso = grid de linhas. Com param = ficha individual.
    const petId = route.params?.petId ?? null;

    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useFocusEffect(useCallback(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            setImageError(false);
            try {
                const lista = await ProfileService.getPets();
                const atual = petId ? lista.find(p => p.id === petId) : null;
                if (alive) { setPets(lista); setPet(atual); }
            } catch (e) {
                if (__DEV__) console.error('[SaudePet] load', e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [petId]));

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Neo.layout.heroBanner;
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

    const titleStr = petId ? (pet?.nome || 'Pet') : t('health.petHealth', 'Saúde do Pet');
    const capaSource = require('../../assets/images/headers/header-pet.jpeg');
    const themeColors = Neo.colors;

    const renderChips = (arr, color) => {
        if (!arr.length) return <Body style={s.emptyText}>{t('telas.SaudePetScreen.nadaRegistrado', 'Nada registrado')}</Body>;
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

    const petMeta = (p) => {
        const idade = p.dataNascimento ? ProfileService.calcularIdade(p.dataNascimento) : null;
        // especie e porte são gravados como id ('cao', 'medio'): exibe o rótulo.
        return [
            p.especie ? rotuloOnboarding(PET_SPECIES, p.especie) : null, p.raca,
            p.porte ? rotuloOnboarding(PET_SIZES, p.porte) : null,
            idade != null ? t('telas.SaudePetScreen.idadeAnos', { count: idade, defaultValue: idade === 1 ? '{{count}} ano' : '{{count}} anos' }) : null,
        ].filter(Boolean).join(' · ');
    };

    // ── FICHA DE UM PET ──
    const renderFicha = () => {
        if (!pet) {
            return (
                <EmptyState
                    icon="PawPrint"
                    title={t('health.petNotFound', 'Pet não encontrado')}
                    description={t('health.petNotFoundDesc', 'O pet selecionado não foi encontrado ou foi removido.')}
                    cta={{
                        label: t('common.back', 'Voltar'),
                        onPress: () => navigation.goBack(),
                        color: Neo.colors.neutral[500]
                    }}
                />
            );
        }
        const condicoes = asList(pet.condicoesMedicas).map(rotuloOpcaoPerfil);
        const alergias = asList(pet.alergias).map(rotuloOpcaoPerfil);
        const medicamentos = asList(pet.medicamentosEmUso);
        const necessidades = asList(pet.necessidadesEspeciais).map(rotuloOpcaoPerfil);
        const meta = [petMeta(pet), pet.castrado ? t('telas.SaudePetScreen.castrado', 'Castrado') : null].filter(Boolean).join(' · ');

        const handleShare = async () => {
            const fmt = (label, arr) => `*${label}:*\n${arr.length ? arr.join(', ') : '—'}`;
            const nomePet = pet.nome || 'Pet';
            const msg = `*${t('telas.SaudePetScreen.fichaTitulo', { nome: nomePet, defaultValue: 'Ficha de Saúde do Pet — {{nome}}' })} (VigilaroCare)*\n\n` +
                (meta ? `${meta}\n\n` : '') +
                fmt(t('telas.SaudePetScreen.condicoesMedicas', 'Condições Médicas'), condicoes) + `\n\n` +
                fmt(t('telas.SaudePetScreen.alergiasERestricoes', 'Alergias e Restrições'), alergias) + `\n\n` +
                fmt(t('telas.SaudePetScreen.medicamentosEmUso', 'Medicamentos em Uso'), medicamentos) + `\n\n` +
                fmt(t('telas.SaudePetScreen.necessidadesEspeciais', 'Necessidades Especiais'), necessidades) + `\n\n` +
                t('telas.SaudePetScreen.geradoPor', 'Gerado por VigilaroCare — Prevenção Familiar');
            try {
                await Share.share({ message: msg, title: t('telas.SaudePetScreen.fichaDe', { nome: nomePet, defaultValue: 'Ficha de {{nome}}' }) });
            } catch (e) {
                if (__DEV__) console.error('[SaudePet] share', e);
            }
        };

        return (
            <View style={s.scroll}>

                <Eyebrow style={s.eyebrow}>{t('telas.SaudePetScreen.saudeECuidados', 'Saúde e Cuidados')}</Eyebrow>
                <Section icon="Heartbeat" color={HUE.rose} title={t('telas.SaudePetScreen.condicoesMedicas', 'Condições Médicas')}>
                    {renderChips(condicoes, HUE.rose)}
                </Section>
                <Section icon="Warning" color={Neo.colors.accent.copper} title={t('telas.SaudePetScreen.alergiasERestricoes', 'Alergias e Restrições')}>
                    {renderChips(alergias, Neo.colors.accent.copper)}
                </Section>
                <Section icon="Plus" color={HUE.sky} title={t('telas.SaudePetScreen.medicamentosEmUso', 'Medicamentos em Uso')}>
                    {renderChips(medicamentos, HUE.sky)}
                    <Body style={s.hintText}>{t('telas.SaudePetScreen.listaInformativaSemAlarmesOuLembretes', 'Lista informativa — sem alarmes ou lembretes ativos.')}</Body>
                </Section>
                <Section icon="Wheelchair" color={Neo.colors.primary[600]} title={t('telas.SaudePetScreen.necessidadesEspeciais', 'Necessidades Especiais')}>
                    {renderChips(necessidades, Neo.colors.primary[600])}
                </Section>

                <View style={s.actionContainer}>
                    <ButtonNeo title={t('telas.SaudePetScreen.compartilharFichaDoPet', 'Compartilhar Ficha do Pet')} iconName="ShareNetwork" onPress={handleShare} type="primary" />
                </View>
            </View>
        );
    };

    // ── GRID DE PETS (pouso) — linhas dentro de um NeoCard (§4) ──
    const renderGrid = () => {
        if (!pets.length) {
            return (
                <EmptyState
                    icon="PawPrint"
                    title={t('health.noPets', 'Nenhum pet cadastrado')}
                    description={t('health.noPetsDesc', 'Cadastre seus pets para acompanhar as informações de saúde e prevenção.')}
                    cta={{
                        label: t('health.addPet', 'Cadastrar Pet'),
                        onPress: () => navigation.navigate('QuemProteger'),
                        color: Neo.colors.primary[500]
                    }}
                />
            );
        }
        return (
            <View style={s.scroll}>
                <Eyebrow style={s.eyebrow}>{t('telas.SaudePetScreen.animaisDaCasa', 'Animais da casa')}</Eyebrow>
                <NeoCard variant="glass" padding={0} style={s.card}>
                    {pets.map((p, i) => {
                        const sub = petMeta(p);
                        return (
                            <TappablePressable
                                key={p.id}
                                onPress={() => navigation.push('SaudePet', { petId: p.id })}
                                style={[s.row, i > 0 && s.rowDivider]}
                            >
                                <GlassProfileRing profile={p} score={0} resolveUri={ProfileService.resolveImageUri} size={48} ringWidth={2} />
                                <View style={s.rowText}>
                                    <Body style={s.rowName} numberOfLines={1}>{p.nome || 'Pet'}</Body>
                                    {!!sub && <Small style={s.rowSub} numberOfLines={1}>{sub}</Small>}
                                </View>
                                <NeoIcon name="ArrowRight2" variant="Linear" color={Neo.colors.neutral[500]} size={16} />
                            </TappablePressable>
                        );
                    })}
                </NeoCard>
            </View>
        );
    };

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
                        {pet ? (
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
                                        source={pet?.foto ? (typeof pet.foto === 'number' ? pet.foto : { uri: ProfileService.resolveImageUri(pet.foto) }) : capaSource}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="cover"
                                    />
                                </View>

                                <View style={{ flex: 1, paddingBottom: 4 }}>
                                    <View style={{ backgroundColor: Neo.colors.primary[500], paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 }}>
                                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>{t('telas.SaudePetScreen.cuidadoAtivo', 'Cuidado Ativo')}</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 28,
                                        fontWeight: '900',
                                        color: '#FFF',
                                        letterSpacing: -0.5,
                                        lineHeight: 32,
                                        marginBottom: 4,
                                    }} numberOfLines={2}>
                                        {pet.nome || 'Pet'}
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <View style={{ paddingBottom: 4 }}>
                                <Text style={{ fontSize: 34, fontWeight: '900', color: '#FFF', letterSpacing: -0.8, lineHeight: 38, marginBottom: 8 }}>
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
                ) : petId ? renderFicha() : renderGrid()}
            
            </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Neo.spacing.xl, gap: 12 },
    emptyBig: { color: Neo.colors.neutral[500], textAlign: 'center' },
    emptyText: { color: Neo.colors.neutral[400], fontStyle: 'italic' },
    scroll: { paddingHorizontal: Neo.spacing.lg, paddingBottom: Neo.layout.scrollBottomFooter },
    hero: { marginTop: Neo.spacing.sm },
    heroRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    heroLead: { flex: 1 },
    heroName: { color: Neo.colors.neutral[800] },
    heroMeta: { color: Neo.colors.neutral[500], marginTop: 2 },
    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    card: { marginBottom: Neo.spacing.md },
    cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
    cardTitle: { fontSize: 16, color: Neo.colors.neutral[800] },
    chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
    chipText: { fontWeight: '600' },
    hintText: { fontSize: 12, color: Neo.colors.neutral[500], marginTop: 10, fontStyle: 'italic' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: Neo.spacing.md, paddingVertical: 12 },
    rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Neo.colors.neutral[300] },
    rowText: { flex: 1 },
    rowName: { color: Neo.colors.neutral[800] },
    rowSub: { color: Neo.colors.neutral[500], marginTop: 2 },
    actionContainer: { marginTop: Neo.spacing.lg },
});
