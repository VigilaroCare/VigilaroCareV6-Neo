/**
 * QuemProtegerScreenNeo.js — "Quem e onde proteger"
 *
 * REDESENHO 2026-07-31
 *
 * A versão anterior empilhava três rótulos que diziam a mesma coisa por
 * caminhos diferentes — "Defina o contexto da análise", "Onde estamos?",
 * "Contexto ativo de proteção" — e escondia o vínculo de cada pessoa dentro de
 * um menu por perfil. Não havia forma de perguntar o inverso: em que casas
 * está esta pessoa.
 *
 * A estrutura agora é uma pergunta só, respondida de cima para baixo:
 *
 *   1. RESIDÊNCIAS  — cartões horizontais. Tocar num ATIVA na hora; sem
 *      botão "usar este contexto", sem passo extra, sem alerta a interromper.
 *   2. FIXOS        — quem mora ali.
 *   3. EVENTUAIS    — quem frequenta sem morar.
 *
 * E o caminho inverso existe: tocar numa pessoa abre um painel com TODAS as
 * residências e o vínculo dela em cada uma, editável ali mesmo. É o que
 * resolve o caso real de "sou eventual na casa do meu sogro e ele é eventual
 * na minha" — a mesma pessoa com papéis diferentes em casas diferentes.
 *
 * O modelo de dados já suportava isto desde sempre (moradia.habitantes[] e
 * moradia.frequentadores[] por residência). Só faltava mostrar.
 */
import React, { useState, useCallback } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useProfiles } from '../../contexts/ProfileContext';
import ProfileService from '../../services/ProfileService';

import { Neo } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import NeoText, { H1, H2, H3, Body, Small, Caption, Eyebrow } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import NeoAlert from '../../utils/NeoAlert';
import NeoIcon from '../../components/NeoIcon';

const VERDE = Neo.colors.primary?.[600] || '#0E9F6E';
const AMBAR = '#D97706';

export default function QuemProtegerScreenNeo() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { setPrimaryProfile, loadProfiles } = useProfiles();

    const nomeResidencia = (res) => {
        if (!res) return '';
        const nome = typeof res === 'string' ? res : res.nome;
        return nome === 'Minha Casa Principal' ? t('home.mainHouse', 'Minha Casa Principal') : nome;
    };

    const [residencias, setResidencias] = useState([]);
    const [residenciaAtiva, setResidenciaAtiva] = useState(null);
    const [fixos, setFixos] = useState([]);
    const [eventuais, setEventuais] = useState([]);
    const [semVinculo, setSemVinculo] = useState([]);
    const [perfilPrincipal, setPerfilPrincipal] = useState(null);

    // Painel do perfil (o caminho inverso: pessoa → casas)
    const [perfilAberto, setPerfilAberto] = useState(null);
    const [vinculosDoPerfil, setVinculosDoPerfil] = useState([]);

    // Modal de nome de residência (criar / renomear)
    const [modalNomeVisivel, setModalNomeVisivel] = useState(false);
    const [editandoResidenciaId, setEditandoResidenciaId] = useState(null);
    const [nomeDigitado, setNomeDigitado] = useState('');

    const carregar = async () => {
        try {
            const ativa = await ProfileService.getActiveResidence();
            const lista = await ProfileService.getResidences();
            const principal = await ProfileService.getPrimaryProfile();

            setResidencias(lista || []);
            setResidenciaAtiva(ativa);
            setPerfilPrincipal(principal);

            if (ativa?.id) {
                const { fixos: f, eventuais: e, semVinculo: s } =
                    await ProfileService.getPerfisDaResidencia(ativa.id);
                setFixos(f);
                setEventuais(e);
                setSemVinculo(s);
            } else {
                setFixos([]); setEventuais([]); setSemVinculo([]);
            }
        } catch (erro) {
            if (__DEV__) console.error('[QuemProteger] carregar:', erro);
        }
    };

    useFocusEffect(useCallback(() => { loadProfiles(); carregar(); }, []));

    // ── Residências ────────────────────────────────────────────────────────
    // Tocar ATIVA na hora. Sem alerta de confirmação: o próprio cartão muda de
    // estado e o cabeçalho das listas abaixo troca de nome — o feedback está
    // na tela, não num diálogo que precisa ser dispensado.
    const ativarResidencia = async (res) => {
        if (res.id === residenciaAtiva?.id) return;
        try {
            await ProfileService.setActiveResidence(res.id);
            await carregar();
        } catch (erro) {
            if (__DEV__) console.error('[QuemProteger] ativarResidencia:', erro);
        }
    };

    const abrirNovaResidencia = () => {
        setEditandoResidenciaId(null);
        setNomeDigitado('');
        setModalNomeVisivel(true);
    };

    const abrirRenomear = (res) => {
        setEditandoResidenciaId(res.id);
        setNomeDigitado(res.nome);
        setModalNomeVisivel(true);
    };

    const salvarNomeResidencia = async () => {
        const nome = (nomeDigitado || '').trim();
        if (!nome) return;
        if (editandoResidenciaId) {
            await ProfileService.updateResidenceName(editandoResidenciaId, nome);
        } else {
            await ProfileService.addResidence(nome);
        }
        setModalNomeVisivel(false);
        setNomeDigitado('');
        setEditandoResidenciaId(null);
        await carregar();
    };

    const acoesDaResidencia = (res) => {
        const podeExcluir = residencias.length > 1;
        const botoes = [
            {
                text: t('profiles.mapEnvironments', 'Mapear ambientes'),
                onPress: () => navigation.navigate('NewHomeWizard', { residenceId: res.id, initialPhase: 1 }),
            },
            { text: t('profiles.renameLocation', 'Renomear'), onPress: () => abrirRenomear(res) },
        ];
        if (podeExcluir) {
            botoes.push({
                text: t('profiles.delete', 'Excluir'),
                style: 'destructive',
                onPress: () => confirmarExclusaoResidencia(res),
            });
        }
        botoes.push({ text: t('profiles.cancel', 'Cancelar'), style: 'cancel' });

        NeoAlert.alert(nomeResidencia(res), t('profiles.residenceActionsMsg', 'O que deseja fazer com este local?'), botoes);
    };

    const confirmarExclusaoResidencia = (res) => {
        NeoAlert.alert(
            t('profiles.deleteResidenceTitle', 'Excluir este local?'),
            t('profiles.deleteResidenceMsg', 'Os ambientes e vistorias de "{{nome}}" serão perdidos. Os perfis continuam cadastrados.', { nome: nomeResidencia(res) }),
            [
                { text: t('profiles.cancel', 'Cancelar'), style: 'cancel' },
                {
                    text: t('profiles.delete', 'Excluir'),
                    style: 'destructive',
                    onPress: async () => { await ProfileService.removeResidence(res.id); await carregar(); },
                },
            ]
        );
    };

    // ── Painel do perfil: pessoa → casas ───────────────────────────────────
    const abrirPerfil = async (p) => {
        const vinculos = await ProfileService.getVinculosDoPerfilEmTodasResidencias(p.id);
        setVinculosDoPerfil(vinculos);
        setPerfilAberto(p);
    };

    const fecharPerfil = () => { setPerfilAberto(null); setVinculosDoPerfil([]); };

    const mudarVinculo = async (residenciaId, novoVinculo) => {
        if (!perfilAberto) return;
        await ProfileService.setProfileResidenceRelationship(perfilAberto.id, novoVinculo, residenciaId);
        const vinculos = await ProfileService.getVinculosDoPerfilEmTodasResidencias(perfilAberto.id);
        setVinculosDoPerfil(vinculos);
        await loadProfiles();
        await carregar();
    };

    const definirComoPrincipal = async () => {
        if (!perfilAberto || perfilAberto.tipo === 'pet') return;
        await setPrimaryProfile(perfilAberto);
        setPerfilPrincipal(perfilAberto);
        await carregar();
    };

    const excluirPerfil = () => {
        const p = perfilAberto;
        if (!p) return;
        NeoAlert.alert(
            t('profiles.deleteTitle', 'Excluir perfil?'),
            t('profiles.deleteMsg', 'Tem certeza que deseja remover "{{nome}}" deste local? Esta ação não pode ser desfeita.', { nome: p.nome }),
            [
                { text: t('profiles.cancel', 'Cancelar'), style: 'cancel' },
                {
                    text: t('profiles.delete', 'Excluir'),
                    style: 'destructive',
                    onPress: async () => {
                        fecharPerfil();
                        await ProfileService.removePerfil(p.id);
                        await loadProfiles();
                        await carregar();
                    },
                },
            ]
        );
    };

    // ── Peças de interface ─────────────────────────────────────────────────
    const Avatar = ({ p, tamanho = 46 }) => {
        const ehPet = p.tipo === 'pet';
        const raio = tamanho / 2;
        if (p.foto) {
            return <Image source={{ uri: p.foto }} style={{ width: tamanho, height: tamanho, borderRadius: raio }} />;
        }
        return (
            <View style={{
                width: tamanho, height: tamanho, borderRadius: raio,
                backgroundColor: ehPet ? '#FDE68A' : Neo.colors.primary?.[100] || '#D1FAE5',
                alignItems: 'center', justifyContent: 'center',
            }}>
                <NeoIcon name={ehPet ? 'Pet' : 'Profile'} size={tamanho * 0.45} color={ehPet ? AMBAR : VERDE} variant="Bold" />
            </View>
        );
    };

    const LinhaPessoa = ({ p }) => {
        const ehPrincipal = perfilPrincipal?.id === p.id;
        const idade = p.dataNascimento ? ProfileService.calcularIdade(p.dataNascimento) : null;
        const detalhe = [
            p.tipo === 'pet' ? t('profiles.pet', 'Pet') : null,
            idade != null ? t('profiles.yearsOld', '{{n}} anos', { n: idade }) : null,
        ].filter(Boolean).join(' · ');

        return (
            <TouchableOpacity
                onPress={() => abrirPerfil(p)}
                activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
                accessibilityRole="button"
                accessibilityLabel={t('profiles.openPersonA11y', 'Abrir {{nome}}', { nome: p.nome })}
            >
                <Avatar p={p} />
                <View style={{ flex: 1, marginLeft: 12, minWidth: 0 }}>
                    <Body style={{ fontWeight: '700' }} numberOfLines={1}>{p.nome}</Body>
                    {!!detalhe && <Caption numberOfLines={1}>{detalhe}</Caption>}
                </View>
                {ehPrincipal && (
                    <View style={{ backgroundColor: Neo.colors.primary?.[100] || '#D1FAE5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginRight: 8 }}>
                        <Caption style={{ color: VERDE, fontWeight: '800', fontSize: 10 }}>
                            {t('profiles.mainProfileTag', 'PRINCIPAL')}
                        </Caption>
                    </View>
                )}
                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[400]} />
            </TouchableOpacity>
        );
    };

    const ListaDePessoas = ({ titulo, ajuda, pessoas, vazio }) => (
        <View style={{ marginBottom: 18 }}>
            <Eyebrow>{titulo}{pessoas.length > 0 ? `  (${pessoas.length})` : ''}</Eyebrow>
            {!!ajuda && <Caption style={{ marginTop: 2, marginBottom: 2 }}>{ajuda}</Caption>}
            <NeoCard variant="glass" style={{ paddingHorizontal: 14, paddingVertical: 4, marginTop: 8 }}>
                {pessoas.length === 0
                    ? <Caption style={{ paddingVertical: 14 }}>{vazio}</Caption>
                    : pessoas.map((p) => <LinhaPessoa key={p.id} p={p} />)}
            </NeoCard>
        </View>
    );

    const rotuloVinculo = {
        habitante: t('profiles.fixedResident', 'Fixo'),
        frequentador: t('profiles.eventualVisitor', 'Eventual'),
        nenhum: t('profiles.noLink', 'Não está'),
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 4, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H2 style={{ flex: 1 }} numberOfLines={1}>{t('profiles.whoAndWhere', 'Quem e onde proteger')}</H2>
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 140 }}
                    showsVerticalScrollIndicator={false}
                >
                    <FadeInView>
                        {/* ── 1. RESIDÊNCIAS ─────────────────────────────── */}
                        <Eyebrow style={{ marginTop: 10 }}>{t('profiles.myResidences', 'Minhas residências')}</Eyebrow>
                        <Caption style={{ marginTop: 2 }}>
                            {t('profiles.myResidencesHelp', 'Toque para escolher qual o app está monitorando.')}
                        </Caption>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: 10, marginHorizontal: -24 }}
                            contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
                        >
                            {residencias.map((res) => {
                                const ativa = res.id === residenciaAtiva?.id;
                                return (
                                    <TouchableOpacity
                                        key={res.id}
                                        onPress={() => ativarResidencia(res)}
                                        onLongPress={() => acoesDaResidencia(res)}
                                        activeOpacity={0.85}
                                        style={{
                                            width: 168, borderRadius: 18, padding: 14,
                                            backgroundColor: ativa ? VERDE : 'rgba(255,255,255,0.6)',
                                            borderWidth: 1,
                                            borderColor: ativa ? VERDE : 'rgba(0,0,0,0.06)',
                                        }}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: ativa }}
                                        accessibilityLabel={nomeResidencia(res)}
                                        accessibilityHint={t('profiles.residenceHintA11y', 'Toque para monitorar este local. Toque longo para editar.')}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <NeoIcon name="Home2" size={20} color={ativa ? '#FFF' : VERDE} variant="Bold" />
                                            <TouchableOpacity
                                                onPress={() => acoesDaResidencia(res)}
                                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                accessibilityRole="button"
                                                accessibilityLabel={t('profiles.residenceActionsA11y', 'Opções de {{nome}}', { nome: nomeResidencia(res) })}
                                            >
                                                <NeoIcon name="Setting2" size={18} color={ativa ? 'rgba(255,255,255,0.85)' : Neo.colors.neutral[400]} />
                                            </TouchableOpacity>
                                        </View>
                                        <Body style={{ marginTop: 10, fontWeight: '800', color: ativa ? '#FFF' : Neo.colors.neutral[900] }} numberOfLines={2}>
                                            {nomeResidencia(res)}
                                        </Body>
                                        <Caption style={{ marginTop: 4, color: ativa ? 'rgba(255,255,255,0.85)' : Neo.colors.neutral[500] }}>
                                            {ativa
                                                ? t('profiles.monitoringNow', 'Monitorando agora')
                                                : t('profiles.tapToMonitor', 'Tocar para monitorar')}
                                        </Caption>
                                    </TouchableOpacity>
                                );
                            })}

                            <TouchableOpacity
                                onPress={abrirNovaResidencia}
                                activeOpacity={0.85}
                                style={{
                                    width: 120, borderRadius: 18, padding: 14,
                                    borderWidth: 1, borderStyle: 'dashed', borderColor: VERDE,
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                                accessibilityRole="button"
                                accessibilityLabel={t('profiles.newLocation', 'Novo local')}
                            >
                                <NeoIcon name="Add" size={22} color={VERDE} variant="Bold" />
                                <Caption style={{ color: VERDE, fontWeight: '700', marginTop: 6, textAlign: 'center' }}>
                                    {t('profiles.newLocation', 'Novo local')}
                                </Caption>
                            </TouchableOpacity>
                        </ScrollView>

                        {/* ── 2 e 3. PESSOAS DA RESIDÊNCIA ATIVA ─────────── */}
                        <View style={{ marginTop: 24 }}>
                            <H3 numberOfLines={1}>{nomeResidencia(residenciaAtiva)}</H3>
                            <Caption style={{ marginTop: 2, marginBottom: 14 }}>
                                {t('profiles.peopleInThisHouse', 'Quem está nesta casa')}
                            </Caption>

                            <ListaDePessoas
                                titulo={t('profiles.fixedSection', 'Fixos')}
                                ajuda={t('profiles.fixedHelp', 'Moram aqui.')}
                                pessoas={fixos}
                                vazio={t('profiles.noFixed', 'Ninguém marcado como fixo ainda.')}
                            />

                            <ListaDePessoas
                                titulo={t('profiles.eventualSection', 'Eventuais')}
                                ajuda={t('profiles.eventualHelp', 'Frequentam sem morar — visitas, familiares, cuidadores.')}
                                pessoas={eventuais}
                                vazio={t('profiles.noEventual', 'Ninguém marcado como eventual ainda.')}
                            />
                        </View>

                        {/* ── Adicionar ──────────────────────────────────── */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddPerfil', { type: 'humano' })}
                            style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                paddingVertical: 15, borderRadius: 16,
                                borderWidth: 1, borderStyle: 'dashed', borderColor: VERDE, marginBottom: 10,
                            }}
                            accessibilityRole="button"
                        >
                            <NeoIcon name="Add" size={20} color={VERDE} variant="Bold" />
                            <Body style={{ color: VERDE, fontWeight: '700', marginLeft: 8 }}>
                                {t('profiles.addPerson', 'Cadastrar pessoa ou pet')}
                            </Body>
                        </TouchableOpacity>

                        {semVinculo.length > 0 && (
                            <View style={{ marginTop: 10 }}>
                                <Eyebrow>{t('profiles.notInThisHouse', 'Cadastrados, mas não nesta casa')}</Eyebrow>
                                <Caption style={{ marginTop: 2 }}>
                                    {t('profiles.notInThisHouseHelp', 'Toque para definir o vínculo com este local.')}
                                </Caption>
                                <NeoCard variant="glass" style={{ paddingHorizontal: 14, paddingVertical: 4, marginTop: 8 }}>
                                    {semVinculo.map((p) => <LinhaPessoa key={p.id} p={p} />)}
                                </NeoCard>
                            </View>
                        )}
                    </FadeInView>
                </ScrollView>

                {/* ── PAINEL DO PERFIL: pessoa → casas ──────────────────── */}
                <Modal visible={!!perfilAberto} transparent animationType="slide" onRequestClose={fecharPerfil}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={fecharPerfil} />
                        <View style={{
                            backgroundColor: Neo.colors.neutral.white,
                            borderTopLeftRadius: 26, borderTopRightRadius: 26,
                            paddingHorizontal: 24, paddingTop: 12,
                            paddingBottom: insets.bottom + 20, maxHeight: '85%',
                        }}>
                            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: Neo.colors.neutral[300], alignSelf: 'center', marginBottom: 16 }} />

                            {perfilAberto && (
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <Avatar p={perfilAberto} tamanho={58} />
                                        <View style={{ flex: 1, marginLeft: 14, minWidth: 0 }}>
                                            <H3 numberOfLines={1}>{perfilAberto.nome}</H3>
                                            {perfilAberto.dataNascimento && (
                                                <Caption>
                                                    {t('profiles.yearsOld', '{{n}} anos', { n: ProfileService.calcularIdade(perfilAberto.dataNascimento) })}
                                                </Caption>
                                            )}
                                        </View>
                                    </View>

                                    <Eyebrow>{t('profiles.presentIn', 'Está em')}</Eyebrow>
                                    <Caption style={{ marginTop: 2, marginBottom: 10 }}>
                                        {t('profiles.presentInHelp', 'A mesma pessoa pode ser fixa numa casa e eventual noutra.')}
                                    </Caption>

                                    {vinculosDoPerfil.map((r) => (
                                        <View key={r.id} style={{ marginBottom: 14 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                                <NeoIcon name="Home2" size={15} color={Neo.colors.neutral[500]} variant="Bold" />
                                                <Body style={{ marginLeft: 6, fontWeight: '700', flex: 1 }} numberOfLines={1}>
                                                    {nomeResidencia(r)}
                                                </Body>
                                                {r.isAtiva && (
                                                    <Caption style={{ color: VERDE, fontWeight: '800', fontSize: 10 }}>
                                                        {t('profiles.activeTag', 'ATIVA')}
                                                    </Caption>
                                                )}
                                            </View>

                                            {/* Segmentado: Fixo / Eventual / Não está */}
                                            <View style={{ flexDirection: 'row', backgroundColor: Neo.colors.neutral[100], borderRadius: 12, padding: 3 }}>
                                                {['habitante', 'frequentador', 'nenhum'].map((op) => {
                                                    const selecionado = r.vinculo === op;
                                                    return (
                                                        <TouchableOpacity
                                                            key={op}
                                                            onPress={() => mudarVinculo(r.id, op)}
                                                            style={{
                                                                flex: 1, paddingVertical: 8, borderRadius: 10,
                                                                alignItems: 'center',
                                                                backgroundColor: selecionado ? VERDE : 'transparent',
                                                            }}
                                                            accessibilityRole="button"
                                                            accessibilityState={{ selected: selecionado }}
                                                            accessibilityLabel={`${nomeResidencia(r)}: ${rotuloVinculo[op]}`}
                                                        >
                                                            <Caption style={{
                                                                fontWeight: '800',
                                                                color: selecionado ? '#FFF' : Neo.colors.neutral[600],
                                                            }}>
                                                                {rotuloVinculo[op]}
                                                            </Caption>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    ))}

                                    <View style={{ height: 1, backgroundColor: Neo.colors.neutral[200], marginVertical: 14 }} />

                                    {perfilAberto.tipo !== 'pet' && perfilPrincipal?.id !== perfilAberto.id && (
                                        <TouchableOpacity onPress={definirComoPrincipal} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13 }}>
                                            <NeoIcon name="Star1" size={19} color={VERDE} variant="Bold" />
                                            <Body style={{ marginLeft: 12 }}>{t('profiles.setAsMain', 'Definir como perfil principal')}</Body>
                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity
                                        onPress={() => { const p = perfilAberto; fecharPerfil(); navigation.navigate('ProfileRiskSummary', { profile: p }); }}
                                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13 }}
                                    >
                                        <NeoIcon name="Chart" size={19} color={Neo.colors.neutral[700]} variant="Bold" />
                                        <Body style={{ marginLeft: 12 }}>{t('profiles.viewRiskSummary', 'Ver relatório de risco')}</Body>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { const p = perfilAberto; fecharPerfil(); navigation.navigate('AddPerfil', { profile: p }); }}
                                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13 }}
                                    >
                                        <NeoIcon name="Edit2" size={19} color={Neo.colors.neutral[700]} variant="Bold" />
                                        <Body style={{ marginLeft: 12 }}>{t('profiles.editProfile', 'Editar perfil')}</Body>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={excluirPerfil} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13 }}>
                                        <NeoIcon name="Trash" size={19} color={Neo.colors.feedback.error} variant="Bold" />
                                        <Body style={{ marginLeft: 12, color: Neo.colors.feedback.error }}>
                                            {t('profiles.deleteProfileEverywhere', 'Excluir perfil de todas as casas')}
                                        </Body>
                                    </TouchableOpacity>
                                </ScrollView>
                            )}
                        </View>
                    </View>
                </Modal>

                {/* ── Modal de nome da residência ───────────────────────── */}
                <Modal visible={modalNomeVisivel} transparent animationType="fade" onRequestClose={() => setModalNomeVisivel(false)}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', paddingHorizontal: 28 }}
                    >
                        <View style={{ backgroundColor: Neo.colors.neutral.white, borderRadius: 22, padding: 22 }}>
                            <H3 style={{ marginBottom: 10 }}>
                                {editandoResidenciaId
                                    ? t('profiles.renameLocation', 'Renomear local')
                                    : t('profiles.newLocation', 'Novo local')}
                            </H3>
                            <TextInput
                                value={nomeDigitado}
                                onChangeText={setNomeDigitado}
                                autoFocus
                                placeholder={t('profiles.locationNamePlaceholder', 'Ex.: Casa da praia, Casa da minha mãe')}
                                placeholderTextColor={Neo.colors.neutral[400]}
                                style={{
                                    borderWidth: 1, borderColor: Neo.colors.neutral[200], borderRadius: 12,
                                    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
                                    color: Neo.colors.neutral[900], marginBottom: 18,
                                }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                                <TouchableOpacity onPress={() => setModalNomeVisivel(false)} style={{ paddingVertical: 12, paddingHorizontal: 18 }}>
                                    <Body style={{ color: Neo.colors.neutral[600], fontWeight: '700' }}>{t('profiles.cancel', 'Cancelar')}</Body>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={salvarNomeResidencia}
                                    style={{ paddingVertical: 12, paddingHorizontal: 22, backgroundColor: VERDE, borderRadius: 12 }}
                                >
                                    <Body style={{ color: '#FFF', fontWeight: '800' }}>{t('common.save', 'Salvar')}</Body>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </SafeAreaView>
        </AppBackground>
    );
}
