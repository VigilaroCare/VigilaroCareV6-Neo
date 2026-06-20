import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Share, ActivityIndicator } from 'react-native';
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

    const petMeta = (p) => {
        const idade = p.dataNascimento ? ProfileService.calcularIdade(p.dataNascimento) : null;
        const porteMap = { pequeno: 'Pequeno', medio: 'Médio', grande: 'Grande' };
        return [
            p.especie, p.raca,
            p.porte ? (porteMap[p.porte] || p.porte) : null,
            idade != null ? `${idade} ${idade === 1 ? 'ano' : 'anos'}` : null,
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
        const condicoes = asList(pet.condicoesMedicas);
        const alergias = asList(pet.alergias);
        const medicamentos = asList(pet.medicamentosEmUso);
        const necessidades = asList(pet.necessidadesEspeciais);
        const meta = [petMeta(pet), pet.castrado ? 'Castrado' : null].filter(Boolean).join(' · ');

        const handleShare = async () => {
            const fmt = (label, arr) => `*${label}:*\n${arr.length ? arr.join(', ') : '—'}`;
            const msg = `*Ficha de Saúde do Pet — ${pet.nome || 'Pet'} (VigilaroCare)*\n\n` +
                (meta ? `${meta}\n\n` : '') +
                fmt('Condições Médicas', condicoes) + `\n\n` +
                fmt('Alergias e Restrições', alergias) + `\n\n` +
                fmt('Medicamentos em Uso', medicamentos) + `\n\n` +
                fmt('Necessidades Especiais', necessidades) + `\n\n` +
                `Gerado por VigilaroCare — Prevenção Familiar`;
            try {
                await Share.share({ message: msg, title: `Ficha de ${pet.nome || 'Pet'}` });
            } catch (e) {
                if (__DEV__) console.error('[SaudePet] share', e);
            }
        };

        return (
            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                <NeoCard variant="premium" style={s.hero}>
                    <View style={s.heroRow}>
                        <GlassProfileRing
                            profile={pet}
                            score={0}
                            imageError={imageError}
                            onImageError={() => setImageError(true)}
                            resolveUri={ProfileService.resolveImageUri}
                            size={72}
                            ringWidth={3}
                        />
                        <View style={s.heroLead}>
                            <H2 style={s.heroName} numberOfLines={1}>{pet.nome || 'Pet'}</H2>
                            {!!meta && <Small style={s.heroMeta}>{meta}</Small>}
                        </View>
                    </View>
                </NeoCard>

                <Eyebrow style={s.eyebrow}>Saúde e Cuidados</Eyebrow>
                <Section icon="Heartbeat" color={HUE.rose} title="Condições Médicas">
                    {renderChips(condicoes, HUE.rose)}
                </Section>
                <Section icon="Warning" color={Neo.colors.accent.copper} title="Alergias e Restrições">
                    {renderChips(alergias, Neo.colors.accent.copper)}
                </Section>
                <Section icon="Plus" color={HUE.sky} title="Medicamentos em Uso">
                    {renderChips(medicamentos, HUE.sky)}
                    <Body style={s.hintText}>Lista informativa — sem alarmes ou lembretes ativos.</Body>
                </Section>
                <Section icon="Wheelchair" color={Neo.colors.primary[600]} title="Necessidades Especiais">
                    {renderChips(necessidades, Neo.colors.primary[600])}
                </Section>

                <View style={s.actionContainer}>
                    <ButtonNeo title="Compartilhar Ficha do Pet" iconName="ShareNetwork" onPress={handleShare} type="primary" />
                </View>
            </ScrollView>
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
            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                <Eyebrow style={s.eyebrow}>Animais da casa</Eyebrow>
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
            </ScrollView>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
                <StatusBar style="dark" />
                <NeoScreenHeader
                    title={petId ? (pet?.nome || 'Pet') : t('health.petHealth', 'Saúde do Pet')}
                    subtitle={petId ? 'Ficha de saúde' : null}
                    onBack={() => navigation.goBack()}
                />
                {loading ? (
                    <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: Neo.spacing.md }}>
                            <SkeletonCard lines={2} />
                            <SkeletonCard lines={3} />
                            <SkeletonCard lines={2} />
                        </View>
                    </ScrollView>
                ) : petId ? renderFicha() : renderGrid()}
            </SafeAreaView>
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
