import React, { useState, useCallback } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Icons
import { ArrowLeft2, ArrowRight2, Home2, Edit2, Trash, Scan, Add, TickCircle, Setting4, User, Woman, Warning2, Heart } from 'iconsax-react-native';

// Hooks & Services
import { useProfiles } from '../../contexts/ProfileContext';
import ProfileService from '../../services/ProfileService';

// Neo Design
import { Neo } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import NeoText, { H1, H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';

const Pet = ({ size, color }) => <Heart size={size} color={color} variant="Bold" />;

export default function QuemProtegerScreenNeo() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { setPrimaryProfile, deleteProfile, loadProfiles } = useProfiles();

    const [mainOwner, setMainOwner] = useState(null);
    const [activeProfile, setActiveProfile] = useState(null);
    const [allResidences, setAllResidences] = useState([]);
    const [activeResidenceId, setActiveResidenceId] = useState(null);
    const [activeResidence, setActiveResidence] = useState(null);
    const [houseProfiles, setHouseProfiles] = useState([]);
    
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

            setAllResidences(list);
            setActiveResidenceId(activeRes?.id ?? null);
            setActiveResidence(activeRes);
            setHouseProfiles(perfisDestaCasa);

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
                Alert.alert(t('profiles.petCareTitle'), t('profiles.petCareMsg'));
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
            Alert.alert("Local Alterado", `Agora monitorando: ${residence.nome}`);
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

                {/* HEADER padronizado */}
                <View style={{ paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.75)', alignItems: 'center', justifyContent: 'center' }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <ArrowLeft2 size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={{ fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 }}>Quem proteger</H1>
                        <Caption style={{ color: Neo.colors.neutral[600] }}>Moradores e residências</Caption>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }} showsVerticalScrollIndicator={false}>
                    
                    {/* ONDE: LOCAL ATIVO */}
                    <Caption style={{ marginBottom: 8, fontWeight: 'bold', color: Neo.colors.neutral[600] }}>Onde estamos?</Caption>
                    <NeoCard variant="glass" style={{ padding: 16, marginBottom: 24, flexDirection: 'row', alignItems: 'center' }} onPress={() => setHouseModalVisible(true)}>
                        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Neo.colors.primary[100], alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                            <Home2 size={24} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ fontWeight: 'bold' }}>{activeResidence?.nome || 'Nenhuma Residência'}</Body>
                            <Caption style={{ color: Neo.colors.neutral[500] }}>Toque para trocar de local</Caption>
                        </View>
                        <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                    </NeoCard>

                    {/* QUEM: MORADORES */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Caption style={{ fontWeight: 'bold', color: Neo.colors.neutral[600] }}>Quem está aqui?</Caption>
                    </View>

                    <View style={{ gap: 12 }}>
                        {houseProfiles.map((p) => {
                            const isSelected = activeProfile?.id === p.id;
                            const isGhost = p.pendente;
                            
                            return (
                                <TouchableOpacity key={p.id} onPress={() => handleSelectProfile(p)} activeOpacity={0.8}>
                                    <NeoCard variant="glass" style={{ 
                                        padding: 16, flexDirection: 'row', alignItems: 'center',
                                        borderColor: isSelected ? Neo.colors.primary[500] : 'rgba(255,255,255,0.4)',
                                        borderWidth: isSelected ? 2 : 1,
                                        backgroundColor: isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'
                                    }}>
                                        <View style={{
                                            width: 52, height: 52, borderRadius: 26,
                                            backgroundColor: isGhost ? Neo.colors.neutral[200] : getProfileColor(p) + '26',
                                            alignItems: 'center', justifyContent: 'center', marginRight: 16,
                                            overflow: 'hidden'
                                        }}>
                                            {p.foto ? (
                                                <Image source={{ uri: ProfileService.resolveImageUri ? ProfileService.resolveImageUri(p.foto) : p.foto }} style={{ width: 52, height: 52 }} />
                                            ) : (
                                                p.tipo === 'pet' ? <Pet size={24} color={isGhost ? Neo.colors.neutral[400] : getProfileColor(p)} /> : <User size={24} color={isGhost ? Neo.colors.neutral[400] : getProfileColor(p)} variant="Bold" />
                                            )}
                                        </View>
                                        
                                        <View style={{ flex: 1 }}>
                                            <Body style={{ fontWeight: 'bold' }}>{p.nome}</Body>
                                            <Caption style={{ color: p.isVisitante ? Neo.colors.feedback.warning : Neo.colors.neutral[500] }}>
                                                {p.isVisitante ? 'Visitante Eventual' : (p.tipo === 'pet' ? 'Pet' : 'Morador Fixo')}
                                            </Caption>
                                        </View>

                                        {isSelected ? (
                                            <TickCircle size={28} color={Neo.colors.primary[600]} variant="Bold" />
                                        ) : (
                                            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: Neo.colors.neutral[300] }} />
                                        )}
                                    </NeoCard>
                                </TouchableOpacity>
                            );
                        })}

                        {/* BOTÃO ADICIONAR ABAIXO DA LISTA */}
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('AddPerfil', { type: 'humano' })}
                            style={{ 
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                padding: 16, backgroundColor: Neo.colors.primary[100], borderRadius: 16,
                                marginTop: 8
                            }}
                        >
                            <Add size={20} color={Neo.colors.primary[600]} style={{ marginRight: 8 }} />
                            <Body style={{ color: Neo.colors.primary[700], fontWeight: 'bold' }}>Adicionar Integrante</Body>
                        </TouchableOpacity>
                    </View>

                    {/* ACTIONS SECUNDÁRIAS */}
                    <View style={{ marginTop: 32, gap: 16 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeXRay')}>
                            <NeoCard variant="glass" style={{ padding: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)' }}>
                                <Scan size={24} color={Neo.colors.primary[600]} style={{ marginRight: 16 }} />
                                <Body style={{ flex: 1, fontWeight: 'bold', color: Neo.colors.neutral[800] }}>Raio-X da Casa</Body>
                                <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                            </NeoCard>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => navigation.navigate('NewHomeWizard', { residenceId: activeResidence?.id, residenceName: activeResidence?.nome })}>
                            <NeoCard variant="glass" style={{ padding: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)' }}>
                                <Setting4 size={24} color={Neo.colors.neutral[600]} style={{ marginRight: 16 }} />
                                <Body style={{ flex: 1, fontWeight: 'bold', color: Neo.colors.neutral[800] }}>Refazer Onboarding da Casa</Body>
                                <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                            </NeoCard>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                {/* MODAL DE TROCA DE CASA */}
                <Modal visible={houseModalVisible} transparent animationType="slide">
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '80%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <H3>Locais Cadastrados</H3>
                                <TouchableOpacity onPress={() => setHouseModalVisible(false)}><Caption style={{ fontSize: 16, color: Neo.colors.neutral[500] }}>Fechar</Caption></TouchableOpacity>
                            </View>
                            
                            <ScrollView style={{ marginBottom: 24 }}>
                                {allResidences.map(res => (
                                    <TouchableOpacity key={res.id} onPress={() => handleSelectResidence(res)} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[100], flexDirection: 'row', alignItems: 'center' }}>
                                        <Home2 size={24} color={activeResidenceId === res.id ? Neo.colors.primary[600] : Neo.colors.neutral[500]} variant={activeResidenceId === res.id ? "Bold" : "Linear"} style={{ marginRight: 16 }} />
                                        <Body style={{ flex: 1, fontWeight: activeResidenceId === res.id ? 'bold' : 'normal', color: activeResidenceId === res.id ? Neo.colors.primary[800] : Neo.colors.neutral[800] }}>{res.nome}</Body>
                                        {activeResidenceId === res.id && <TickCircle size={20} color={Neo.colors.primary[600]} />}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <TouchableOpacity 
                                onPress={() => { setHouseModalVisible(false); setIsEditingResidence(false); setNewResidenceName(''); setModalVisible(true); }}
                                style={{ backgroundColor: Neo.colors.primary[100], padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                            >
                                <Add size={20} color={Neo.colors.primary[600]} style={{ marginRight: 8 }} />
                                <Body style={{ color: Neo.colors.primary[800], fontWeight: 'bold' }}>Novo Local</Body>
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
                                <TouchableOpacity style={{ flex: 1, padding: 12, alignItems: 'center', backgroundColor: Neo.colors.neutral[200], borderRadius: 8 }} onPress={() => setModalVisible(false)}>
                                    <Body>{t('profiles.cancel')}</Body>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, padding: 12, alignItems: 'center', backgroundColor: Neo.colors.primary[500], borderRadius: 8 }} onPress={handleSaveResidence}>
                                    <Body style={{ color: '#FFF', fontWeight: 'bold' }}>{t('profiles.save')}</Body>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                {/* TACTICAL FOOTER */}
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, paddingBottom: Math.max(insets.bottom + 16, 24) }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!activeProfile) { Alert.alert(t('profiles.warning'), t('profiles.noProfileSelected')); return; }
                            navigation.navigate('MainTabs');
                        }}
                        activeOpacity={0.9}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            gap: 12, paddingVertical: 18, borderRadius: 20,
                            backgroundColor: 'rgba(46, 125, 50, 0.85)',
                            borderTopWidth: 1.5, borderTopColor: 'rgba(255,255,255,0.4)',
                            borderBottomWidth: 1.5, borderBottomColor: 'rgba(0,0,0,0.2)',
                            shadowColor: '#2E7D32', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
                        }}
                    >
                        <TickCircle size={24} color="#FFF" variant="Bold" />
                        <H3 style={{ color: '#FFF', fontSize: 18, letterSpacing: 0.5 }}>Confirmar Contexto</H3>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </AppBackground>
    );
}