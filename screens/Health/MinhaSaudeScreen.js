/**
 * MinhaSaudeScreen — a ficha de saúde de uma PESSOA.
 *
 * 28/10/2026 — na linguagem da Home (ANATOMIA §9.6) e com a MESMA estrutura da Saúde Pet:
 * cabeçalho padrão, a fileira "Trocar pessoa ou pet", o cartão da pessoa (com a foto que ela
 * cadastrou) e as seções. Antes: banner escuro com a foto em miniatura, botão de voltar copiado à
 * mão, vidro nas seções e "Outros perfis da casa" em linhas — e um pet só se alcançava voltando
 * à Home. O que NÃO mudou: os dados, o PDF da ficha médica, a inclusão de medicamentos e os
 * lembretes.
 */
import { useState, useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../../utils/ThemeContext';
import { Small, Eyebrow } from "../../components/NeoTypography";
import ButtonNeo from '../../components/ButtonNeo';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import NeoGlifoCard from '../../components/NeoGlifoCard';
import NeoPill from '../../components/NeoPill';
import MembrosDaCasa, { fotoDoPerfil, inicialDoNome } from '../../components/MembrosDaCasa';
import SaudeSecao, { SaudeChips } from '../../components/SaudeSecao';
import TappablePressable from '../../components/TappablePressable';
import ProfileService from '../../services/ProfileService';
import MedicationReminderService from '../../services/MedicationReminderService';
import { useProfiles } from '../../contexts/ProfileContext';
import { rotuloOpcaoPerfil } from '../../data/opcoesPerfil';
import FichaMedicaService from '../../services/FichaMedicaService';
import NeoAlert from '../../utils/NeoAlert';
import EmptyState from '../../components/EmptyState';
import { SkeletonCard } from '../../components/SkeletonLoader';

// Campos médicos são arrays no schema. Normaliza item string OU objeto em texto.
const asList = (arr) => (Array.isArray(arr) ? arr : [])
    .map(it => (typeof it === 'string' ? it : (it?.nome || it?.label || it?.descricao || '')))
    .filter(Boolean);

export default function MinhaSaudeScreen() {
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
    // Sem param = perfil ativo (pouso). Com param = ficha de outra pessoa da casa.
    const perfilId = route.params?.perfilId ?? null;

    const [profile, setProfile] = useState(null);
    const [humanos, setHumanos] = useState([]);
    const [lembretes, setLembretes] = useState([]);
    const { loadProfiles } = useProfiles();
    const [compartilhando, setCompartilhando] = useState(false);
    const [loading, setLoading] = useState(true);

    useFocusEffect(useCallback(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            try {
                const todos = await ProfileService.getPerfisHumanos();
                let current = perfilId ? todos.find(p => p.id === perfilId) : null;
                if (!current) current = await ProfileService.getPerfilAtivo();
                const doPerfil = current?.id ? await MedicationReminderService.getByPerfil(current.id) : [];
                if (alive) { setProfile(current); setHumanos(todos); setLembretes(doPerfil); }
            } catch (e) {
                if (__DEV__) console.error('[MinhaSaude] load', e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [perfilId]));

    // A fileira "Trocar pessoa" lista só as PESSOAS da casa: animal tem a sua tela (Saúde Pet).
    const membros = useMemo(
        () => humanos.map(p => ({ id: p.id, nome: p.nome, foto: fotoDoPerfil(p.foto) })),
        [humanos],
    );

    // Troca a ficha SEM empilhar telas: voltar continua levando à Home.
    const trocarPara = (m) => navigation.replace('MinhaSaude', { perfilId: m.id });

    const idade = profile?.dataNascimento ? ProfileService.calcularIdade(profile.dataNascimento) : null;
    const condicoes = asList(profile?.condicoesMedicas).map(rotuloOpcaoPerfil);
    const alergias = asList(profile?.alergias).map(rotuloOpcaoPerfil);
    const medicamentos = asList(profile?.medicamentosEmUso);
    // Remédios com lembrete que não estão na lista do perfil. A Ficha Médica
    // de Emergência, o Mapa de Riscos e o dossiê de viagem leem só a lista do
    // perfil; o aviso convida a incluir, sem incluir por conta própria.
    const foraDoPerfil = [...new Map(lembretes
        .map(r => (r?.medicamentoNome || '').trim())
        .filter(nome => nome && !ProfileService.temMedicamentoEmUso(profile, nome))
        .map(nome => [ProfileService.normalizarMedicamento(nome), nome])).values()];

    const incluirNoPerfil = async (nome) => {
        if (!profile?.id) return;
        try {
            const atualizado = await ProfileService.incluirMedicamentoEmUso(profile.id, nome);
            if (atualizado) setProfile(p => ({ ...p, medicamentosEmUso: atualizado.medicamentosEmUso }));
            await loadProfiles();
        } catch (e) {
            if (__DEV__) console.error('[MinhaSaude] incluir medicamento', e);
            NeoAlert.alert(t('telas.MinhaSaudeScreen.medicamentosEmUso', 'Medicamentos em Uso'), t('telas.MinhaSaudeScreen.naoFoiPossivelIncluirMedicamento', 'Não foi possível incluir o medicamento agora. Tente novamente.'));
        }
    };
    const necessidades = asList(profile?.necessidadesEspeciais).map(rotuloOpcaoPerfil);
    const tipoSanguineo = profile?.tipoSanguineo || '';

    // A ficha é montada pelo FichaMedicaService — fonte única. Antes, esta tela
    // e a do SOS tinham cada uma a sua, e discordavam: a do SOS lia campos que
    // o formulário de perfil nunca grava e saía SEM condições médicas e SEM
    // idade. Aqui sai o PDF; o texto colável continua disponível no SOS.
    const handleShare = async () => {
        if (!profile) return;
        setCompartilhando(true);
        const r = await FichaMedicaService.compartilharPdf({ perfil: profile });
        setCompartilhando(false);
        if (!r.ok && r.motivo !== 'sem-compartilhamento') {
            NeoAlert.alert(t('telas.MinhaSaudeScreen.fichaMedica', 'Ficha médica'), t('telas.MinhaSaudeScreen.naoFoiPossivelGerarAFicha', 'Não foi possível gerar a ficha agora. Tente novamente.'));
        }
    };

    const vazio = t('telas.MinhaSaudeScreen.nadaRegistrado', 'Nada registrado');
    const idadeTxt = idade != null
        ? t('telas.SaudePetScreen.idadeAnos', { count: idade, defaultValue: idade === 1 ? '{{count}} ano' : '{{count}} anos' })
        : null;
    // O tipo sanguíneo aparecia no banner antigo, com o ícone de gota: segue visível, agora com o nome por extenso.
    const meta = [idadeTxt, tipoSanguineo ? `${t('fichaMedica.tipoSanguineo', 'Tipo sanguíneo')} ${tipoSanguineo}` : null].filter(Boolean).join(' · ');

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* O nome da tela é o do cartão da Home que a abriu. */}
                <NeoScreenHeader title={t('home.myHealth', 'Minha Saúde')} onBack={() => navigation.goBack()} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <MembrosDaCasa
                            membros={membros}
                            selecionadoId={profile?.id}
                            onSelect={trocarPara}
                            titulo={t('health.switchPerson', 'Trocar pessoa')}
                            tipo="pessoa"
                            style={s.membros}
                        />

                        {loading ? (
                            <View style={{ marginTop: Neo.spacing.md }}>
                                <SkeletonCard lines={2} />
                                <SkeletonCard lines={3} />
                                <SkeletonCard lines={2} />
                            </View>
                        ) : !profile ? (
                            <EmptyState
                                icon="Users"
                                title={t('health.noProfiles', 'Nenhum perfil cadastrado')}
                                description={t('health.noProfilesDesc', 'Cadastre perfis humanos para gerenciar as informações de saúde.')}
                                cta={{
                                    label: t('health.addProfile', 'Cadastrar Perfil'),
                                    onPress: () => navigation.navigate('QuemProteger'),
                                    color: Neo.colors.primary[500],
                                }}
                            />
                        ) : (
                            <>
                                {/* O cartão da PESSOA: a foto que ela cadastrou (ou a inicial), o nome e o essencial. */}
                                <NeoGlifoCard
                                    foto={fotoDoPerfil(profile.foto)}
                                    inicial={inicialDoNome(profile.nome)}
                                    titulo={profile.nome || t('telas.MinhaSaudeScreen.perfil', 'Perfil')}
                                    sub={meta}
                                    tom="info"
                                    largo
                                    arte={96}
                                    tamanhoTitulo={24}
                                    style={s.cartaoMembro}
                                    rodape={<NeoPill sobreCampo icone="ShieldTick" label={t('telas.MinhaSaudeScreen.monitoramentoAtivo', 'Monitoramento Ativo')} />}
                                />

                                <Eyebrow style={s.eyebrow}>{t('telas.MinhaSaudeScreen.perfilDeRiscoEPrevencao', 'Perfil de Risco e Prevenção')}</Eyebrow>
                                <SaudeSecao icone="Heartbeat" cor={HUE.rose} titulo={t('telas.MinhaSaudeScreen.condicoesMedicas', 'Condições Médicas')}>
                                    <SaudeChips itens={condicoes} cor={HUE.rose} vazio={vazio} />
                                </SaudeSecao>
                                <SaudeSecao icone="Warning" cor={tema.colors.textOn.copper} titulo={t('telas.MinhaSaudeScreen.alergiasERestricoes', 'Alergias e Restrições')}>
                                    <SaudeChips itens={alergias} cor={tema.colors.textOn.copper} vazio={vazio} />
                                </SaudeSecao>
                                <SaudeSecao icone="Wheelchair" cor={tema.colors.textOn.brand} titulo={t('telas.MinhaSaudeScreen.necessidadesEspeciais', 'Necessidades Especiais')}>
                                    <SaudeChips itens={necessidades} cor={tema.colors.textOn.brand} vazio={vazio} />
                                </SaudeSecao>
                                {!!profile?.comunicacaoEmergencia && (
                                    <SaudeSecao icone="MessageText1" cor={tema.colors.textOn.brand} titulo={t('telas.MinhaSaudeScreen.comunicacao', 'Comunicação e o que acalma')}>
                                        <Small style={s.texto}>{profile.comunicacaoEmergencia}</Small>
                                    </SaudeSecao>
                                )}

                                <Eyebrow style={s.eyebrow}>{t('telas.MinhaSaudeScreen.muralDeRotina', 'Mural de Rotina')}</Eyebrow>
                                <SaudeSecao icone="Plus" cor={HUE.sky} titulo={t('telas.MinhaSaudeScreen.medicamentosEmUso', 'Medicamentos em Uso')}>
                                    <SaudeChips itens={medicamentos} cor={HUE.sky} vazio={vazio} />
                                    {foraDoPerfil.length > 0 && (
                                        <View style={s.foraBox}>
                                            <Small style={s.foraTexto}>{t('telas.MinhaSaudeScreen.lembretesForaDaLista', 'Estes medicamentos têm lembrete, mas não estão na lista acima. A Ficha Médica de Emergência mostra só a lista. Toque para incluir:')}</Small>
                                            <View style={s.chipsLinha}>
                                                {foraDoPerfil.map(nome => (
                                                    <TappablePressable
                                                        key={nome}
                                                        onPress={() => incluirNoPerfil(nome)}
                                                        style={s.foraChip}
                                                        accessibilityRole="button"
                                                        accessibilityLabel={t('telas.MinhaSaudeScreen.incluirNaLista', 'Incluir na lista') + ': ' + nome}
                                                    >
                                                        <NeoIcon name="AddCircle" variant="Bold" size={14} color={tema.colors.textOn.info} />
                                                        <Small style={[s.chipTexto, { color: tema.colors.textOn.info }]}>{nome}</Small>
                                                    </TappablePressable>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                    <TappablePressable
                                        style={s.lembretes}
                                        onPress={() => navigation.navigate('MedicationReminders', { perfilId: profile?.id, perfilNome: profile?.nome })}
                                        accessibilityRole="button"
                                        accessibilityLabel={t('telas.MinhaSaudeScreen.gerenciarLembretesDeMedicamentos', 'Gerenciar lembretes de medicamentos')}
                                    >
                                        <NeoIcon name="Clock" variant="Bold" size={14} color={HUE.sky} />
                                        <Small style={[s.chipTexto, { color: HUE.sky }]}>{t('telas.MinhaSaudeScreen.gerenciarLembretes', 'Gerenciar lembretes')}</Small>
                                    </TappablePressable>
                                </SaudeSecao>

                                <View style={s.acao}>
                                    <ButtonNeo
                                        title={compartilhando ? t('telas.MinhaSaudeScreen.gerandoFicha', 'Gerando ficha…') : t('telas.MinhaSaudeScreen.compartilharFichaDeEmergencia', 'Compartilhar Ficha de Emergência')}
                                        iconName="ShareNetwork"
                                        onPress={handleShare}
                                        type="primary"
                                        disabled={compartilhando || !profile}
                                    />
                                </View>
                            </>
                        )}
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
    texto: { color: Neo.colors.textOn.ink, lineHeight: 22 },
    chipTexto: { fontWeight: '600' },
    chipsLinha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    foraBox: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Neo.colors.neutral[300], gap: 8 },
    foraTexto: { color: Neo.colors.textOn.muted, lineHeight: 18 },
    foraChip: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
        borderWidth: 1, borderStyle: 'dashed', borderColor: Neo.colors.textOn.info,
    },
    lembretes: {
        flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, alignSelf: 'flex-start',
        paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
    },
    acao: { marginTop: Neo.spacing.lg },
});
