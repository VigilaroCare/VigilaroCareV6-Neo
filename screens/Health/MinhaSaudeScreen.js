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

// Campos médicos são arrays no schema. Normaliza item string OU objeto em texto.
const asList = (arr) => (Array.isArray(arr) ? arr : [])
    .map(it => (typeof it === 'string' ? it : (it?.nome || it?.label || it?.descricao || '')))
    .filter(Boolean);

// genero pode chegar cru (migração V5 traz gender:"male"; legado "M"/"macho").
// Normaliza só p/ exibição — vazio fica omitido (não inventa sexo como o form faz).
const fmtGenero = (g) => {
    const k = String(g || '').toLowerCase();
    if (['masculino', 'macho', 'm', 'male'].includes(k)) return 'Masculino';
    if (['feminino', 'femea', 'fêmea', 'f', 'female'].includes(k)) return 'Feminino';
    return g || '';
};

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

    const idade = profile?.dataNascimento ? ProfileService.calcularIdade(profile.dataNascimento) : null;
    const condicoes = asList(profile?.condicoesMedicas);
    const alergias = asList(profile?.alergias);
    const medicamentos = asList(profile?.medicamentosEmUso);
    const necessidades = asList(profile?.necessidadesEspeciais);
    const tipoSanguineo = profile?.tipoSanguineo || '';
    // Banner enxuto: idade · sexo. Faixa etária formal (rótulo entre parênteses) é ruído aqui.
    const metaLine = [idade != null ? `${idade} anos` : null, fmtGenero(profile?.genero)].filter(Boolean).join(' · ');

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
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
                <StatusBar style="dark" />
                <NeoScreenHeader
                    title={perfilId ? (profile?.nome || 'Perfil') : t('health.myHealth', 'Sua Saúde')}
                    subtitle={perfilId ? 'Ficha de saúde' : (profile?.nome || null)}
                    onBack={() => navigation.goBack()}
                />

                {loading ? (
                    <View style={s.center}><ActivityIndicator color={Neo.colors.primary[600]} /></View>
                ) : !profile ? (
                    <View style={s.center}>
                        <NeoIcon name="Users" variant="Bulk" color={Neo.colors.neutral[400]} size={48} />
                        <Body style={s.emptyBig}>Nenhum perfil cadastrado ainda.</Body>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                        {/* HERO — identidade: foto à esquerda + lead à direita (formato único §2) */}
                        <NeoCard variant="premium" style={s.hero}>
                            <View style={s.heroRow}>
                                <GlassProfileRing
                                    profile={profile}
                                    score={0}
                                    imageError={imageError}
                                    onImageError={() => setImageError(true)}
                                    resolveUri={ProfileService.resolveImageUri}
                                    size={72}
                                    ringWidth={3}
                                />
                                <View style={s.heroLead}>
                                    <H2 style={s.heroName} numberOfLines={1}>{profile.nome || 'Perfil'}</H2>
                                    {!!metaLine && <Small style={s.heroMeta}>{metaLine}</Small>}
                                    {!!tipoSanguineo && (
                                        <View style={s.bloodBadge}>
                                            <NeoIcon name="Drop" variant="Bold" color={HUE.rose} size={13} />
                                            <Small style={s.bloodText}>{tipoSanguineo}</Small>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </NeoCard>

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
                            <Body style={s.hintText}>Lista informativa — sem alarmes ou lembretes ativos.</Body>
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
                    </ScrollView>
                )}
            </SafeAreaView>
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
