/**
 * SaudePetScreen — a ficha de saúde de um ANIMAL.
 *
 * 28/10/2026 — na linguagem da Home (ANATOMIA §9.6) e com a MESMA estrutura da Minha Saúde:
 * cabeçalho padrão, a fileira "Trocar pessoa ou pet", o cartão do animal (com a foto que ele
 * ganhou no cadastro) e as seções. Antes: um banner escuro sem foto quando se abria pela Home,
 * uma lista de animais como pouso e, só depois de tocar, a ficha — com a foto num quadrado
 * dentro do banner. O que NÃO mudou: os dados e o texto que se compartilha.
 *
 * Sem `petId` (a Home abre assim), abre o primeiro animal da casa: a lista de pouso saiu porque
 * a própria fileira "Trocar pessoa ou pet" já faz esse papel nas duas telas.
 */
import { useState, useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet, Share } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../../utils/ThemeContext';
import { Small, Eyebrow } from "../../components/NeoTypography";
import ButtonNeo from '../../components/ButtonNeo';
import AppBackground from '../../components/AppBackground';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import NeoGlifoCard from '../../components/NeoGlifoCard';
import NeoPill from '../../components/NeoPill';
import MembrosDaCasa, { fotoDoPerfil, inicialDoNome } from '../../components/MembrosDaCasa';
import SaudeSecao, { SaudeChips } from '../../components/SaudeSecao';
import ProfileService from '../../services/ProfileService';
import { rotuloOpcaoPerfil } from '../../data/opcoesPerfil';
import { PET_SPECIES, PET_SIZES, rotuloOnboarding } from '../../data/onboarding_data';
import EmptyState from '../../components/EmptyState';
import { SkeletonCard } from '../../components/SkeletonLoader';

const asList = (arr) => (Array.isArray(arr) ? arr : [])
    .map(it => (typeof it === 'string' ? it : (it?.nome || it?.label || it?.descricao || '')))
    .filter(Boolean);

export default function SaudePetScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    // Matizes das seções: da paleta de grid do DS (o tema escuro tem as suas).
    const HUE = {
        rose: tema.colors.gridAccents?.pets?.color || Neo.colors.gridAccents.pets.color,        // condições
        sky: tema.colors.gridAccents?.vistorias?.color || Neo.colors.gridAccents.vistorias.color, // medicamentos
    };
    // Pet NUNCA é perfil ativo: sem param, abre o primeiro da lista; com param, o escolhido.
    const petId = route.params?.petId ?? null;

    const [pets, setPets] = useState([]);
    const [humanos, setHumanos] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(useCallback(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            try {
                const animais = await ProfileService.getPets();
                const todos = await ProfileService.getPerfisHumanos();
                if (alive) { setPets(animais); setHumanos(todos); }
            } catch (e) {
                if (__DEV__) console.error('[SaudePet] load', e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []));

    const pet = useMemo(() => (petId ? pets.find(p => p.id === petId) : pets[0]) || null, [pets, petId]);

    // Pessoas primeiro, depois os animais: é a ordem da fileira "Trocar pessoa ou pet".
    const membros = useMemo(() => ([
        ...humanos.map(p => ({ id: p.id, tipo: 'pessoa', nome: p.nome, foto: fotoDoPerfil(p.foto) })),
        ...pets.map(p => ({ id: p.id, tipo: 'pet', nome: p.nome, foto: fotoDoPerfil(p.foto) })),
    ]), [humanos, pets]);

    // Troca a ficha SEM empilhar telas: voltar continua levando à Home.
    const trocarPara = (m) => {
        if (m.tipo === 'pet') navigation.replace('SaudePet', { petId: m.id });
        else navigation.replace('MinhaSaude', { perfilId: m.id });
    };

    const nomeDoPet = (p) => p?.nome || t('telas.SaudePetScreen.pet', 'Pet');

    const petMeta = (p) => {
        const idade = p.dataNascimento ? ProfileService.calcularIdade(p.dataNascimento) : null;
        // especie e porte são gravados como id ('cao', 'medio'): exibe o rótulo.
        return [
            p.especie ? rotuloOnboarding(PET_SPECIES, p.especie) : null, p.raca,
            p.porte ? rotuloOnboarding(PET_SIZES, p.porte) : null,
            idade != null ? t('telas.SaudePetScreen.idadeAnos', { count: idade, defaultValue: idade === 1 ? '{{count}} ano' : '{{count}} anos' }) : null,
        ].filter(Boolean).join(' · ');
    };

    const condicoes = asList(pet?.condicoesMedicas).map(rotuloOpcaoPerfil);
    const alergias = asList(pet?.alergias).map(rotuloOpcaoPerfil);
    const medicamentos = asList(pet?.medicamentosEmUso);
    const necessidades = asList(pet?.necessidadesEspeciais).map(rotuloOpcaoPerfil);
    const meta = pet ? [petMeta(pet), pet.castrado ? t('telas.SaudePetScreen.castrado', 'Castrado') : null].filter(Boolean).join(' · ') : '';

    const handleShare = async () => {
        if (!pet) return;
        const fmt = (label, arr) => `*${label}:*\n${arr.length ? arr.join(', ') : '—'}`;
        const nomePet = nomeDoPet(pet);
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

    const vazio = t('telas.SaudePetScreen.nadaRegistrado', 'Nada registrado');

    const renderConteudo = () => {
        if (loading) {
            return (
                <View style={{ marginTop: Neo.spacing.md }}>
                    <SkeletonCard lines={2} />
                    <SkeletonCard lines={3} />
                    <SkeletonCard lines={2} />
                </View>
            );
        }
        if (!pets.length) {
            return (
                <EmptyState
                    icon="PawPrint"
                    title={t('health.noPets', 'Nenhum pet cadastrado')}
                    description={t('health.noPetsDesc', 'Cadastre seus pets para acompanhar as informações de saúde e prevenção.')}
                    cta={{
                        label: t('health.addPet', 'Cadastrar Pet'),
                        onPress: () => navigation.navigate('QuemProteger'),
                        color: Neo.colors.primary[500],
                    }}
                />
            );
        }
        if (!pet) {
            return (
                <EmptyState
                    icon="PawPrint"
                    title={t('health.petNotFound', 'Pet não encontrado')}
                    description={t('health.petNotFoundDesc', 'O pet selecionado não foi encontrado ou foi removido.')}
                    cta={{
                        label: t('common.back', 'Voltar'),
                        onPress: () => navigation.goBack(),
                        color: Neo.colors.neutral[500],
                    }}
                />
            );
        }
        return (
            <>
                {/* O cartão do ANIMAL: a foto do cadastro (ou a inicial), o nome e o essencial. */}
                <NeoGlifoCard
                    foto={fotoDoPerfil(pet.foto)}
                    inicial={inicialDoNome(pet.nome)}
                    titulo={nomeDoPet(pet)}
                    sub={meta}
                    tom="info"
                    largo
                    arte={96}
                    tamanhoTitulo={24}
                    style={s.cartaoMembro}
                    rodape={<NeoPill sobreCampo icone="ShieldTick" label={t('telas.SaudePetScreen.cuidadoAtivo', 'Cuidado Ativo')} />}
                />

                <Eyebrow style={s.eyebrow}>{t('telas.SaudePetScreen.saudeECuidados', 'Saúde e Cuidados')}</Eyebrow>
                <SaudeSecao icone="Heartbeat" cor={HUE.rose} titulo={t('telas.SaudePetScreen.condicoesMedicas', 'Condições Médicas')}>
                    <SaudeChips itens={condicoes} cor={HUE.rose} vazio={vazio} />
                </SaudeSecao>
                <SaudeSecao icone="Warning" cor={tema.colors.textOn.copper} titulo={t('telas.SaudePetScreen.alergiasERestricoes', 'Alergias e Restrições')}>
                    <SaudeChips itens={alergias} cor={tema.colors.textOn.copper} vazio={vazio} />
                </SaudeSecao>
                <SaudeSecao icone="Plus" cor={HUE.sky} titulo={t('telas.SaudePetScreen.medicamentosEmUso', 'Medicamentos em Uso')}>
                    <SaudeChips itens={medicamentos} cor={HUE.sky} vazio={vazio} />
                    <Small style={s.dica}>{t('telas.SaudePetScreen.listaInformativaSemAlarmesOuLembretes', 'Lista informativa — sem alarmes ou lembretes ativos.')}</Small>
                </SaudeSecao>
                <SaudeSecao icone="Wheelchair" cor={tema.colors.textOn.brand} titulo={t('telas.SaudePetScreen.necessidadesEspeciais', 'Necessidades Especiais')}>
                    <SaudeChips itens={necessidades} cor={tema.colors.textOn.brand} vazio={vazio} />
                </SaudeSecao>

                <View style={s.acao}>
                    <ButtonNeo title={t('telas.SaudePetScreen.compartilharFichaDoPet', 'Compartilhar Ficha do Pet')} iconName="ShareNetwork" onPress={handleShare} type="primary" />
                </View>
            </>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* O nome da tela é o do cartão da Home que a abriu. */}
                <NeoScreenHeader title={t('home.petHealth', 'Saúde Pet')} onBack={() => navigation.goBack()} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <MembrosDaCasa
                            membros={membros}
                            selecionado={pet ? { tipo: 'pet', id: pet.id } : null}
                            onSelect={trocarPara}
                            style={s.membros}
                        />
                        {renderConteudo()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    corpo: { paddingHorizontal: Neo.spacing.lg },
    membros: { marginBottom: Neo.spacing.md },
    cartaoMembro: { height: 160, marginBottom: Neo.spacing.sm },
    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    dica: { color: Neo.colors.textOn.muted, marginTop: 10, fontStyle: 'italic' },
    acao: { marginTop: Neo.spacing.lg },
});
