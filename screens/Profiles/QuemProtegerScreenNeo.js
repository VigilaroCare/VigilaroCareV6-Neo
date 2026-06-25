import React, { useState, useCallback } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Hooks & Services
import { useProfiles } from '../../contexts/ProfileContext';
import ProfileService from '../../services/ProfileService';

// Neo Design
import { Neo } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import NeoText, { H1, H2, H3, Body, Small, Caption, Eyebrow } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import NeoAlert from '../../utils/NeoAlert';
import NeoIcon from '../../components/NeoIcon';

const Pet = ({ size, color }) => <NeoIcon name="Heart" size={size} color={color} variant="Bold" />;

export default function QuemProtegerScreenNeo() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const getResidenceName = (res) => {
        if (!res) return '';
        const name = typeof res === 'string' ? res : res.nome;
        return name === 'Minha Casa Principal' ? t('home.mainHouse', 'Minha Casa Principal') : name;
    };
    const insets = useSafeAreaInsets();
    const { setPrimaryProfile, deleteProfile, loadProfiles } = useProfiles();

    const [mainOwner, setMainOwner] = useState(null);
    const [activeProfile, setActiveProfile] = useState(null);
    const [allResidences, setAllResidences] = useState([]);
    const [activeResidenceId, setActiveResidenceId] = useState(null);
    const [activeResidence, setActiveResidence] = useState(null);
    const [houseProfiles, setHouseProfiles] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    
    // UI State
    const [modalVisible, setModalVisible] = useState(false);
    const [houseModalVisible, setHouseModalVisible] = useState(false);
    const [isEditingResidence, setIsEditingResidence] = useState(false);
    const [editingResidenceId, setEditingResidenceId] = useState(null);
    const [newResidenceName, setNewResidenceName] = useState('');

    const loadHomeData = async () => {
        try {
            const activeRes = await ProfileService.getActiveResidence();
            const list = await ProfileService.getResidences();
            const perfisDestaCasa = await ProfileService.getPerfis();
            const donoApp = await ProfileService.getPrimaryProfile();
            const todosPerfis = await ProfileService.getAllPerfis();

            setAllResidences(list);
            setActiveResidenceId(activeRes?.id ?? null);
            setActiveResidence(activeRes);
            setHouseProfiles(perfisDestaCasa);
            setAllProfiles(todosPerfis || []);

            if (perfisDestaCasa.length > 0) {
                const owner = donoApp || perfisDestaCasa[0];
                const currentActiveId = donoApp?.id ?? null;
                const isActiveInHouse = currentActiveId ? perfisDestaCasa.find(p => p.id === currentActiveId) : null;
                const active = isActiveInHouse || owner;
                setMainOwner(owner);
                setActiveProfile(active);
            } else {
                setMainOwner(null);
                setActiveProfile(null);
            }
        } catch (e) {
            console.error('Error loading home data', e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadProfiles();
            loadHomeData();
        }, [])
    );

    const handleSelectProfile = async (perfilSelecionado) => {
        try {
            if (perfilSelecionado.tipo === 'pet') {
                NeoAlert.alert(t('profiles.petCareTitle'), t('profiles.petCareMsg'));
                return;
            }
            setActiveProfile(perfilSelecionado);
            await setPrimaryProfile(perfilSelecionado);
        } catch (error) {
            console.error('Erro ao selecionar perfil:', error);
        }
    };

    const handleSelectResidence = async (residence) => {
        try {
            await ProfileService.setActiveResidence(residence.id);
            setActiveResidenceId(residence.id);
            await loadHomeData();
            setHouseModalVisible(false);
            NeoAlert.alert(
                t('profiles.residenceChangedTitle', 'Local Alterado'),
                t('profiles.residenceChangedMsg', { name: getResidenceName(residence), defaultValue: `Agora monitorando: ${getResidenceName(residence)}` })
            );
        } catch (e) { console.error(e); }
    };

    const handleSaveResidence = async () => {
        if (!newResidenceName || !newResidenceName.trim()) return;
        if (isEditingResidence && editingResidenceId) {
            await ProfileService.updateResidenceName(editingResidenceId, newResidenceName);
        } else {
            await ProfileService.addResidence(newResidenceName);
        }
        await loadHomeData();
        setModalVisible(false);
        setNewResidenceName('');
        setIsEditingResidence(false);
        setEditingResidenceId(null);
    };

    const handleEditProfile = (p) => {
        navigation.navigate('AddPerfil', { profile: p });
    };

    const handleDeleteProfile = (p) => {
        NeoAlert.alert(
            t('profiles.deleteTitle', 'Excluir perfil?'),
            t('profiles.deleteMsg', 'Tem certeza que deseja remover "{{nome}}" deste local? Esta ação não pode ser desfeita.', { nome: p.nome }),
            [
                { text: t('profiles.cancel', 'Cancelar'), style: 'cancel' },
                {
                    text: t('profiles.delete', 'Excluir'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await ProfileService.removePerfil(p.id);
                            await loadProfiles();
                            await loadHomeData();
                        } catch (e) {
                            if (__DEV__) console.error('removePerfil error:', e);
                        }
                    },
                },
            ],
        );
    };

    const handleEditResidence = (res) => {
        setEditingResidenceId(res.id);
        setIsEditingResidence(true);
        setNewResidenceName(res.nome);
        setHouseModalVisible(false);
        setModalVisible(true);
    };

    const handleDeleteResidence = (res) => {
        if (allResidences.length <= 1) {
            NeoAlert.alert(
                t('profiles.cannotDeleteLastTitle', 'Não é possível excluir'),
                t('profiles.cannotDeleteLastMsg', 'Você precisa ter pelo menos um local cadastrado.'),
            );
            return;
        }
        NeoAlert.alert(
            t('profiles.deleteResTitle', 'Excluir local?'),
            t('profiles.deleteResMsg', 'Tem certeza que deseja remover o local "{{nome}}"? Todos os perfis e dados desse local serão removidos.', { nome: res.nome }),
            [
                { text: t('profiles.cancel', 'Cancelar'), style: 'cancel' },
                {
                    text: t('profiles.delete', 'Excluir'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await ProfileService.removeResidence(res.id);
                            await loadHomeData();
                        } catch (e) {
                            if (__DEV__) console.error('removeResidence error:', e);
                        }
                    },
                },
            ],
        );
    };

    const getProfileColor = (p) => {
        if (!p) return Neo.colors.neutral[500];
        if (p.tipo === 'pet') return Neo.colors.feedback.warning;
        const faixa = ProfileService.getFaixaEtaria(p.dataNascimento);
        if (faixa === 'baby' || faixa === 'child') return Neo.colors.secondary[500];
        if (faixa === 'elderly') return Neo.colors.primary[500];
        return Neo.colors.neutral[500];
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER premium — back button vitrificado + eyebrow no subtítulo */}
                <View style={{ paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 42, height: 42, borderRadius: 14,
                            backgroundColor: '#FFFFFF',
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(120, 113, 108, 0.22)',
                            borderTopColor: 'rgba(255, 255, 255, 1)',
                            borderTopWidth: 1.5,
                            borderBottomColor: 'rgba(82, 75, 68, 0.20)',
                            borderBottomWidth: 1.2,
                            shadowColor: '#1C1C1E',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.05,
                            shadowRadius: 8,
                            elevation: 2,
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={20} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={{ fontWeight: '700', letterSpacing: -0.5, fontSize: 24 }}>{t('profiles.whoAndWhereToProtect', 'Quem e onde proteger')}</H1>
                        <Eyebrow style={{ marginTop: 4 }}>{t('profiles.residentsAndLocations', 'Moradores e locais')}</Eyebrow>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }} showsVerticalScrollIndicator={false}>

                    {/* ONDE: LOCAL ATIVO — card hero (variant premium) */}
                    <Eyebrow style={{ marginBottom: 8 }}>{t('profiles.whereAreWe', 'Onde estamos?')}</Eyebrow>
                    <NeoCard variant="premium" style={{ padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => setHouseModalVisible(true)}>
                        <View style={{
                            width: 44, height: 44, borderRadius: 14,
                            backgroundColor: Neo.colors.primary[100],
                            alignItems: 'center', justifyContent: 'center', marginRight: 14
                        }}>
                            <NeoIcon name="Home2" size={22} color={Neo.colors.primary[700]} variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: '700', letterSpacing: -0.2 }}>{getResidenceName(activeResidence) || t('profiles.noResidence', 'Nenhuma Residência')}</Body>
                            <Caption style={{ color: Neo.colors.neutral[600], marginTop: 2 }}>{t('profiles.tapToChangeLocation', 'Toque para trocar de local')}</Caption>
                        </View>
                        <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[500]} />
                    </NeoCard>

                    {/* BOTÃO ADICIONAR NOVO LOCAL — simetria com "Adicionar integrante" abaixo */}
                    <TouchableOpacity
                        onPress={() => { setIsEditingResidence(false); setNewResidenceName(''); setModalVisible(true); }}
                        activeOpacity={0.85}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            paddingVertical: 14, paddingHorizontal: 16,
                            backgroundColor: Neo.colors.primary[100],
                            borderRadius: 14,
                            marginBottom: 22,
                            borderWidth: 1,
                            borderColor: 'rgba(4, 120, 87, 0.20)',
                            borderTopColor: 'rgba(255, 255, 255, 0.9)',
                            borderTopWidth: 1.5,
                        }}
                    >
                        <NeoIcon name="Add" size={20} color={Neo.colors.primary[700]} style={{ marginRight: 8 }} />
                        <Body style={{ color: Neo.colors.primary[800], fontWeight: '700', letterSpacing: -0.1 }}>
                            {t('profiles.addNewResidence', 'Adicionar nova residência')}
                        </Body>
                    </TouchableOpacity>

                    {/* QUEM: MORADORES */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Eyebrow>
                            {t('profiles.whoIsHere', 'Quem está na {{local}}?', { local: getResidenceName(activeResidence) || 'esta residência' })}
                        </Eyebrow>
                    </View>

                    <View style={{ gap: 10 }}>
                        {houseProfiles.map((p) => {
                            const isSelected = activeProfile?.id === p.id;
                            const isGhost = p.pendente;

                            return (
                                <TouchableOpacity key={p.id} onPress={() => handleSelectProfile(p)} activeOpacity={0.8}>
                                    <NeoCard variant={isSelected ? 'premium' : 'glass'} style={{
                                        padding: 14, flexDirection: 'row', alignItems: 'center',
                                        ...(isSelected ? {
                                            borderColor: Neo.colors.primary[700],
                                            borderWidth: 1.5,
                                        } : {}),
                                    }}>
                                        <View style={{
                                            width: 48, height: 48, borderRadius: 14,
                                            backgroundColor: isGhost ? Neo.colors.neutral[200] : getProfileColor(p) + '26',
                                            alignItems: 'center', justifyContent: 'center', marginRight: 14,
                                            overflow: 'hidden'
                                        }}>
                                            {p.foto ? (
                                                <Image source={{ uri: ProfileService.resolveImageUri ? ProfileService.resolveImageUri(p.foto) : p.foto }} style={{ width: 48, height: 48 }} />
                                            ) : (
                                                p.tipo === 'pet' ? <Pet size={22} color={isGhost ? Neo.colors.neutral[400] : getProfileColor(p)} /> : <NeoIcon name="User" size={22} color={isGhost ? Neo.colors.neutral[400] : getProfileColor(p)} variant="Bold" />
                                            )}
                                        </View>

                                        <View style={{ flex: 1 }}>
                                             <Body style={{ fontWeight: 'bold' }}>{p.nome}</Body>
                                             <Caption style={{ color: p.isVisitante ? Neo.colors.feedback.warning : Neo.colors.neutral[500] }}>
                                                 {p.isVisitante ? t('profiles.eventualVisitor', 'Visitante Eventual') : (p.tipo === 'pet' ? t('profiles.pet', 'Pet') : t('profiles.fixedResident', 'Morador Fixo'))}
                                             </Caption>
                                         </View>

                                        {/* Relatório — abre análise de risco do perfil */}
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('ProfileRiskSummary', { profile: p })}
                                            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
                                            style={{ padding: 10, marginRight: 8 }}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Ver relatório de ${p.nome}`}
                                        >
                                            <NeoIcon name="DocumentText" size={22} color={Neo.colors.primary[700]} variant="Linear" />
                                        </TouchableOpacity>

                                        {/* Editar — abre formulário pré-preenchido (AddPerfil já suporta).
                                            Ergonomia: size 22 + padding 10 + marginRight 14 + hitSlop 14 pra
                                            acessibilidade (alvo de toque mín 44x44 do iOS HIG / 48dp Material). */}
                                        <TouchableOpacity
                                            onPress={() => handleEditProfile(p)}
                                            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
                                            style={{ padding: 10, marginRight: 8 }}
                                            accessibilityRole="button"
                                            accessibilityLabel={t('profiles.editProfileLabel', 'Editar perfil {{nome}}', { nome: p.nome })}
                                        >
                                            <NeoIcon name="Edit2" size={22} color={Neo.colors.neutral[700]} variant="Linear" />
                                        </TouchableOpacity>

                                        {/* Excluir — confirma antes */}
                                        <TouchableOpacity
                                            onPress={() => handleDeleteProfile(p)}
                                            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
                                            style={{ padding: 10, marginRight: 14 }}
                                            accessibilityRole="button"
                                            accessibilityLabel={t('profiles.deleteProfileLabel', 'Excluir perfil {{nome}}', { nome: p.nome })}
                                        >
                                            <NeoIcon name="Trash" size={22} color={Neo.colors.feedback.error} variant="Linear" />
                                        </TouchableOpacity>

                                        {isSelected ? (
                                            <NeoIcon name="TickCircle" size={28} color={Neo.colors.primary[700]} variant="Bold" />
                                        ) : (
                                            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: Neo.colors.neutral[400] }} />
                                        )}
                                    </NeoCard>
                                </TouchableOpacity>
                            );
                        })}

                        {/* BOTÃO ADICIONAR — CTA secundário com moldura premium */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddPerfil', { type: 'humano' })}
                            activeOpacity={0.85}
                            style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                paddingVertical: 14, paddingHorizontal: 16,
                                backgroundColor: Neo.colors.primary[100],
                                borderRadius: 14,
                                marginTop: 8,
                                borderWidth: 1,
                                borderColor: 'rgba(4, 120, 87, 0.20)',
                                borderTopColor: 'rgba(255, 255, 255, 0.9)',
                                borderTopWidth: 1.5,
                            }}
                        >
                            <NeoIcon name="Add" size={20} color={Neo.colors.primary[700]} style={{ marginRight: 8 }} />
                            <Body style={{ color: Neo.colors.primary[800], fontWeight: '700', letterSpacing: -0.1 }}>
                                {t('profiles.addMemberTo', 'Adicionar integrante à {{local}}', { local: getResidenceName(activeResidence) || 'esta residência' })}
                            </Body>
                        </TouchableOpacity>

                        {/* VINCULAR INTEGRANTES EXISTENTES */}
                        {(() => {
                            const unlinkedProfiles = allProfiles.filter(p => !houseProfiles.some(hp => hp.id === p.id));
                            if (unlinkedProfiles.length === 0) return null;
                            return (
                                <View style={{ marginTop: 28 }}>
                                    <Eyebrow style={{ marginBottom: 14 }}>
                                        {t('profiles.linkExistingTo', 'Vincular pessoas existentes à {{local}}', { local: getResidenceName(activeResidence) || 'esta residência' })}
                                    </Eyebrow>
                                    <View style={{ gap: 10 }}>
                                        {unlinkedProfiles.map((p) => (
                                            <TouchableOpacity
                                                key={p.id}
                                                onPress={async () => {
                                                    await ProfileService.linkProfileToActiveResidence(p.id);
                                                    await loadHomeData();
                                                    NeoAlert.alert(
                                                        t('profiles.linkSuccessTitle', 'Sucesso'),
                                                        t('profiles.linkSuccessMsg', { name: p.nome, defaultValue: `${p.nome} foi vinculado(a) a este local.` })
                                                    );
                                                }}
                                                activeOpacity={0.85}
                                            >
                                                <NeoCard variant="glass" style={{ padding: 14, flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{
                                                        width: 40, height: 40, borderRadius: 12,
                                                        backgroundColor: p.tipo === 'pet' ? Neo.colors.accent.champagneSubtle : Neo.colors.primary[100],
                                                        alignItems: 'center', justifyContent: 'center', marginRight: 12,
                                                        overflow: 'hidden'
                                                    }}>
                                                        {p.foto ? (
                                                            <Image source={{ uri: ProfileService.resolveImageUri ? ProfileService.resolveImageUri(p.foto) : p.foto }} style={{ width: 40, height: 40 }} />
                                                        ) : (
                                                            p.tipo === 'pet' ? <Pet size={18} color={Neo.colors.accent.champagne} /> : <NeoIcon name="User" size={18} color={Neo.colors.primary[700]} variant="Bold" />
                                                        )}
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Body style={{ fontSize: 14, fontWeight: '600' }}>{p.nome}</Body>
                                                        <Caption style={{ fontSize: 11, color: Neo.colors.neutral[600], marginTop: 1 }}>
                                                            {p.tipo === 'pet' ? t('profiles.pet', 'Pet') : (p.vinculo === 'frequentador' ? t('profiles.eventualVisitor', 'Visitante Eventual') : t('profiles.fixedResident', 'Morador Fixo'))}
                                                        </Caption>
                                                    </View>
                                                    <NeoIcon name="AddCircle" size={22} color={Neo.colors.primary[700]} />
                                                </NeoCard>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            );
                        })()}
                       {/* ACTIONS SECUNDÁRIAS */}

                        {/* ACTIONS SECUNDÁRIAS (Movidas para a Home) */}
                        <View style={{ marginTop: 24, gap: 10 }}>
                            {/* Os botões de Relatório e Raio-X agora moram na HomeScreenNeo */}
                        </View>
                    </View>

                </ScrollView>

                {/* MODAL DE TROCA DE CASA */}
                <Modal visible={houseModalVisible} transparent animationType="slide">
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '80%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <H3>{t('profiles.registeredLocations', 'Locais Cadastrados')}</H3>
                                <TouchableOpacity onPress={() => setHouseModalVisible(false)}><Caption style={{ fontSize: 16, color: Neo.colors.neutral[500] }}>{t('common.close', 'Fechar')}</Caption></TouchableOpacity>
                            </View>
                            
                            <ScrollView style={{ marginBottom: 24 }} showsVerticalScrollIndicator={false}>
                                {allResidences.map(res => {
                                    const isSelected = activeResidenceId === res.id;
                                    return (
                                        <View key={res.id} style={{ marginBottom: 12 }}>
                                            <NeoCard
                                                variant={isSelected ? 'premium' : 'glass'}
                                                style={{
                                                    padding: 14,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    ...(isSelected ? {
                                                        borderColor: Neo.colors.primary[700],
                                                        borderWidth: 1.5,
                                                    } : {}),
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => handleSelectResidence(res)}
                                                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                                    accessibilityRole="button"
                                                    accessibilityLabel={t('profiles.selectResidenceLabel', 'Selecionar {{nome}}', { nome: res.nome })}
                                                >
                                                    <View style={{
                                                        width: 44, height: 44, borderRadius: 14,
                                                        backgroundColor: isSelected ? Neo.colors.primary[100] : Neo.colors.neutral[200],
                                                        alignItems: 'center', justifyContent: 'center', marginRight: 12
                                                    }}>
                                                        <NeoIcon name="Home2" size={22} color={isSelected ? Neo.colors.primary[700] : Neo.colors.neutral[600]} variant={isSelected ? "Bold" : "Linear"} />
                                                    </View>

                                                    <View style={{ flex: 1 }}>
                                                        <Body style={{ fontWeight: '700', color: isSelected ? Neo.colors.primary[800] : Neo.colors.neutral[900], letterSpacing: -0.2 }}>
                                                            {getResidenceName(res)}
                                                        </Body>
                                                        <Caption style={{ color: Neo.colors.neutral[600], marginTop: 2 }}>
                                                            {res.moradia?.tipoImovel ? `${res.moradia.tipoImovel === 'casa_praia' ? t('home.beachHouse', 'Casa de Praia') : res.moradia.tipoImovel} · ` : ''}
                                                            {res.moradia?.andares ? `${res.moradia.andares} andar(es)` : '1 andar'}
                                                        </Caption>
                                                    </View>
                                                </TouchableOpacity>

                                                {/* Linha de botões de ação à direita */}
                                                <View style={{ flexDirection: 'row', gap: 6, marginLeft: 8 }}>
                                                    {/* 1. Mapear Estrutura (Phase 0) */}
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setHouseModalVisible(false);
                                                            navigation.navigate('NewHomeWizard', { residenceId: res.id, initialPhase: 0 });
                                                        }}
                                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                        style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: Neo.colors.neutral[200], alignItems: 'center', justifyContent: 'center' }}
                                                        accessibilityLabel="Configurar estrutura da moradia"
                                                    >
                                                        <NeoIcon name="Setting4" size={18} color={Neo.colors.neutral[700]} variant="Linear" />
                                                    </TouchableOpacity>

                                                    {/* 2. Mapear Ambientes (Phase 1) */}
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setHouseModalVisible(false);
                                                            navigation.navigate('NewHomeWizard', { residenceId: res.id, initialPhase: 1 });
                                                        }}
                                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                        style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: Neo.colors.neutral[200], alignItems: 'center', justifyContent: 'center' }}
                                                        accessibilityLabel="Mapear ambientes da moradia"
                                                    >
                                                        <NeoIcon name="Grid2" size={18} color={Neo.colors.neutral[700]} />
                                                    </TouchableOpacity>

                                                    {/* 3. Renomear local */}
                                                    <TouchableOpacity
                                                        onPress={() => handleEditResidence(res)}
                                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                        style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: Neo.colors.neutral[200], alignItems: 'center', justifyContent: 'center' }}
                                                        accessibilityLabel="Renomear local"
                                                    >
                                                        <NeoIcon name="Edit2" size={18} color={Neo.colors.neutral[700]} variant="Linear" />
                                                    </TouchableOpacity>

                                                    {/* 4. Excluir local */}
                                                    <TouchableOpacity
                                                        onPress={() => handleDeleteResidence(res)}
                                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                        style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: Neo.colors.neutral[200], alignItems: 'center', justifyContent: 'center' }}
                                                        accessibilityLabel="Excluir local"
                                                    >
                                                        <NeoIcon name="Trash" size={18} color={Neo.colors.feedback.error} variant="Linear" />
                                                    </TouchableOpacity>
                                                </View>
                                            </NeoCard>
                                        </View>
                                    );
                                })}
                            </ScrollView>

                            <TouchableOpacity
                                onPress={() => { setHouseModalVisible(false); setIsEditingResidence(false); setNewResidenceName(''); setModalVisible(true); }}
                                activeOpacity={0.85}
                                style={{
                                    backgroundColor: Neo.colors.primary[100],
                                    paddingVertical: 16, paddingHorizontal: 18,
                                    borderRadius: 14,
                                    alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: 'rgba(4, 120, 87, 0.20)',
                                    borderTopColor: 'rgba(255, 255, 255, 0.9)',
                                    borderTopWidth: 1.5,
                                }}
                            >
                                <NeoIcon name="Add" size={20} color={Neo.colors.primary[700]} style={{ marginRight: 8 }} />
                                <Body style={{ color: Neo.colors.primary[800], fontWeight: '700', letterSpacing: -0.1 }}>{t('profiles.newLocation', 'Novo Local')}</Body>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* MODAL NOVO LOCAL */}
                <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '85%', backgroundColor: '#FFF', borderRadius: 20, padding: 24, ...Neo.shadows.lg }}>
                            <H3 style={{ marginBottom: 8 }}>{isEditingResidence ? t('profiles.renameLocation') : t('profiles.newLocation')}</H3>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: Neo.colors.neutral[300], borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 }}
                                placeholder={t('profiles.locationName')}
                                value={newResidenceName}
                                onChangeText={setNewResidenceName}
                                autoFocus
                            />
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, paddingVertical: 14, alignItems: 'center', backgroundColor: Neo.colors.neutral[200], borderRadius: 12 }}
                                    onPress={() => setModalVisible(false)}
                                    activeOpacity={0.85}
                                >
                                    <Body style={{ color: Neo.colors.neutral[800], fontWeight: '600' }}>{t('profiles.cancel')}</Body>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1, paddingVertical: 14, alignItems: 'center',
                                        backgroundColor: Neo.colors.primary[700],
                                        borderRadius: 12,
                                        shadowColor: Neo.colors.primary[700],
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.18,
                                        shadowRadius: 10,
                                        elevation: 3,
                                    }}
                                    onPress={handleSaveResidence}
                                    activeOpacity={0.9}
                                >
                                    <Body style={{ color: '#FFF', fontWeight: '700', letterSpacing: 0.1 }}>{t('profiles.save')}</Body>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                {/* TACTICAL FOOTER — CTA Forest brand */}
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: Math.max(insets.bottom + 10, 16) }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!activeProfile) { NeoAlert.alert(t('profiles.warning'), t('profiles.noProfileSelected')); return; }
                            navigation.navigate('MainTabs');
                        }}
                        activeOpacity={0.9}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            gap: 12, paddingVertical: 16, borderRadius: 20,
                            backgroundColor: Neo.colors.primary[700], // Forest Deep
                            borderTopWidth: 1.5, borderTopColor: 'rgba(255,255,255,0.30)',
                            borderBottomWidth: 1.2, borderBottomColor: 'rgba(0,0,0,0.28)',
                            // Sombra brand sutil (não mais Material verde saturado)
                            shadowColor: Neo.colors.primary[800],
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.22,
                            shadowRadius: 22,
                            elevation: 8,
                        }}
                    >
                        <NeoIcon name="TickCircle" size={24} color="#FFF" variant="Bold" />
                        <H3 style={{ color: '#FFF', fontSize: 17, letterSpacing: 0.2, fontWeight: '700' }}>{t('profiles.confirmContext', 'Confirmar Contexto')}</H3>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </AppBackground>
    );
}
