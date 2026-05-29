/**
 * GerenciarLocaisPerfisScreen.js
 * Central de Gerenciamento e Edição de Locais e Perfis.
 * 
 * Permite ao usuário editar o nome e gerenciar todas as residências (adicionar, 
 * definir como ativa, renomear, excluir) e todos os perfis (pessoas e pets,
 * abrir edição completa via AddPerfil, excluir globalmente).
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import ProfileService from '../../services/ProfileService';
import { useProfiles } from '../../contexts/ProfileContext';
import { Neo } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import NeoAlert from '../../utils/NeoAlert';
import NeoIcon from '../../components/NeoIcon';

const C = Neo.colors;

export default function GerenciarLocaisPerfisScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { loadProfiles } = useProfiles();

    // Abas: 'locais' | 'perfis'
    const [activeTab, setActiveTab] = useState('locais');

    // Dados
    const [residences, setResidences] = useState([]);
    const [activeResId, setActiveResId] = useState(null);
    const [profiles, setProfiles] = useState([]);

    // Modais e Estados de Edição
    const [renameModalVisible, setRenameModalVisible] = useState(false);
    const [selectedResId, setSelectedResId] = useState(null);
    const [newName, setNewName] = useState('');

    const loadData = async () => {
        try {
            const resList = await ProfileService.getResidences();
            const activeId = await ProfileService.getActiveResidenceId();
            const allProfiles = await ProfileService.getAllPerfis();

            setResidences(resList);
            setActiveResId(activeId);
            setProfiles(allProfiles || []);
        } catch (e) {
            if (__DEV__) console.warn('Erro ao carregar dados na central:', e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadProfiles();
            loadData();
        }, [])
    );

    // --- Ações de Residências ---
    const handleSelectResidence = async (id) => {
        try {
            await ProfileService.setActiveResidence(id);
            setActiveResId(id);
            await loadData();
        } catch (_) {}
    };

    const handleOpenRename = (id, currentName) => {
        setSelectedResId(id);
        setNewName(currentName);
        setRenameModalVisible(true);
    };

    const handleSaveRename = async () => {
        if (!newName.trim()) return NeoAlert.alert('Atenção', 'O nome do local não pode ser vazio.');
        try {
            await ProfileService.updateResidenceName(selectedResId, newName.trim());
            setRenameModalVisible(false);
            await loadData();
        } catch (_) {}
    };

    const handleDeleteResidence = async (id, name) => {
        if (residences.length <= 1) {
            return NeoAlert.alert('Não permitido', 'Você deve manter pelo menos uma residência cadastrada no aplicativo.');
        }

        NeoAlert.alert(
            'Excluir residência?',
            `Tem certeza que deseja apagar "${name}"? Todos os mapeamentos específicos deste local serão excluídos de forma permanente.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Apagar', 
                    style: 'destructive', 
                    onPress: async () => {
                        try {
                            const success = await ProfileService.removeResidence(id);
                            if (success) {
                                await loadData();
                            }
                        } catch (_) {}
                    }
                }
            ]
        );
    };

    const handleAddResidence = async () => {
        try {
            const newRes = await ProfileService.addResidence("Nova Residência");
            navigation.navigate('NewHomeWizard', { residenceId: newRes.id });
        } catch (_) {}
    };

    // --- Ações de Perfis ---
    const handleEditProfile = (profile) => {
        navigation.navigate('AddPerfil', { profile });
    };

    const handleDeleteProfile = (id, name) => {
        NeoAlert.alert(
            'Excluir perfil?',
            `Tem certeza que deseja remover ${name} do Vigilaro? Esta pessoa ou pet será retirado de todas as residências.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Apagar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await ProfileService.removePerfil(id);
                            await loadProfiles();
                            await loadData();
                        } catch (_) {}
                    }
                }
            ]
        );
    };

    const handleAddProfile = (type) => {
        navigation.navigate('AddPerfil', { type });
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={C.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>Configurações do Mapa</H1>
                        <Caption style={s.subtitle}>
                            Gerencie e edite seus locais cadastrados e moradores.
                        </Caption>
                    </View>
                </View>

                {/* Tabs */}
                <View style={s.tabBar}>
                    <TouchableOpacity
                        style={[s.tabButton, activeTab === 'locais' && s.tabButtonActive]}
                        onPress={() => setActiveTab('locais')}
                    >
                        <Body style={[s.tabText, activeTab === 'locais' && s.tabTextActive]}>
                            Residências ({residences.length})
                        </Body>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[s.tabButton, activeTab === 'perfis' && s.tabButtonActive]}
                        onPress={() => setActiveTab('perfis')}
                    >
                        <Body style={[s.tabText, activeTab === 'perfis' && s.tabTextActive]}>
                            Moradores & Pets ({profiles.length})
                        </Body>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
                    {activeTab === 'locais' ? (
                        // TAB RESIDÊNCIAS
                        <View style={{ gap: 12 }}>
                            {residences.map(res => {
                                const isActive = res.id === activeResId;
                                return (
                                    <NeoCard
                                        key={res.id}
                                        variant="elevated"
                                        style={[s.card, isActive && s.cardActive]}
                                        onPress={() => handleSelectResidence(res.id)}
                                    >
                                        <View style={[s.iconWrap, isActive && { backgroundColor: C.primary[100] }]}>
                                            <NeoIcon name="Home2" size={24} color={isActive ? C.primary[600] : C.neutral[500]} variant={isActive ? 'Bold' : 'Linear'} />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                                <H3 style={{ fontSize: 16 }}>{res.nome === 'Minha Casa Principal' ? t('home.mainHouse', 'Minha Casa Principal') : res.nome}</H3>
                                                {isActive && (
                                                    <View style={s.activeBadge}>
                                                        <NeoIcon name="TickCircle" size={12} color="#FFF" variant="Bold" />
                                                        <Small style={s.activeBadgeText}>Ativa</Small>
                                                    </View>
                                                )}
                                            </View>
                                            <Caption style={{ color: C.neutral[600], marginTop: 2 }}>
                                                {res.moradia?.tipoImovel ? `${res.moradia.tipoImovel} · ` : ''}
                                                {res.moradia?.andares ? `${res.moradia.andares} andar(es)` : '1 andar'}
                                            </Caption>
                                        </View>
 
                                        <View style={s.actionRow}>
                                            <TouchableOpacity 
                                                onPress={() => handleOpenRename(res.id, res.nome)}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                style={s.actionBtn}
                                            >
                                                <NeoIcon name="Edit2" size={18} color={C.neutral[600]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                onPress={() => handleDeleteResidence(res.id, res.nome === 'Minha Casa Principal' ? t('home.mainHouse', 'Minha Casa Principal') : res.nome)}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                style={s.actionBtn}
                                            >
                                                <NeoIcon name="Trash" size={18} color={C.feedback.error} />
                                            </TouchableOpacity>
                                        </View>
                                    </NeoCard>
                                );
                            })}
                        </View>
                    ) : (
                        // TAB PERFIS
                        <View style={{ gap: 12 }}>
                            {profiles.map(p => {
                                const isPet = p.tipo === 'pet';
                                return (
                                    <NeoCard
                                        key={p.id}
                                        variant="elevated"
                                        style={s.card}
                                        onPress={() => handleEditProfile(p)}
                                    >
                                        <View style={[s.avatar, { backgroundColor: isPet ? '#FFF3E0' : C.primary[100] }]}>
                                            {isPet ? (
                                                <NeoIcon name="Heart" size={20} color="#EF6C00" variant="Bold" />
                                            ) : (
                                                <NeoIcon name="User" size={20} color={C.primary[600]} variant="Bold" />
                                            )}
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <H3 style={{ fontSize: 16 }}>{p.nome}</H3>
                                            <Caption style={{ color: C.neutral[600], marginTop: 2 }}>
                                                {isPet 
                                                    ? (p.especie || 'Pet') 
                                                    : (p.vinculo === 'frequentador' ? 'Visitante Eventual' : 'Morador Fixo')}
                                            </Caption>
                                        </View>

                                        <View style={s.actionRow}>
                                            <TouchableOpacity 
                                                onPress={() => handleEditProfile(p)}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                style={s.actionBtn}
                                            >
                                                <NeoIcon name="Edit2" size={18} color={C.neutral[600]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                onPress={() => handleDeleteProfile(p.id, p.nome)}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                style={s.actionBtn}
                                            >
                                                <NeoIcon name="Trash" size={18} color={C.feedback.error} />
                                            </TouchableOpacity>
                                        </View>
                                    </NeoCard>
                                );
                            })}
                        </View>
                    )}
                </ScrollView>

                {/* Footer Buttons */}
                <View style={s.footer}>
                    {activeTab === 'locais' ? (
                        <TouchableOpacity style={s.mainBtn} onPress={handleAddResidence} activeOpacity={0.9}>
                            <NeoIcon name="Add" size={22} color="#FFF" />
                            <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Adicionar Nova Residência</Body>
                        </TouchableOpacity>
                    ) : (
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity style={[s.mainBtn, { flex: 1 }]} onPress={() => handleAddProfile('humano')} activeOpacity={0.9}>
                                <NeoIcon name="Add" size={20} color="#FFF" />
                                <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>Adicionar Pessoa</Body>
                            </TouchableOpacity>
                            <TouchableOpacity style={[s.mainBtn, { flex: 1, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#EF6C00' }]} onPress={() => handleAddProfile('pet')} activeOpacity={0.9}>
                                <NeoIcon name="Add" size={20} color="#EF6C00" />
                                <Body style={{ color: '#EF6C00', fontWeight: 'bold', fontSize: 15 }}>Adicionar Pet</Body>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Modal para Renomear Residência */}
                <Modal
                    visible={renameModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setRenameModalVisible(false)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={s.modalOverlay}
                    >
                        <NeoCard variant="elevated" style={s.modalCard}>
                            <H2 style={{ marginBottom: 8, fontSize: 20 }}>Renomear Local</H2>
                            <Body style={{ color: C.neutral[700], marginBottom: 20 }}>Como deseja chamar esta residência?</Body>

                            <TextInput
                                style={s.input}
                                value={newName}
                                onChangeText={setNewName}
                                autoFocus
                                selectTextOnFocus
                                placeholder="Ex: Apartamento, Casa de Praia..."
                                placeholderTextColor={C.neutral[400]}
                            />

                            <View style={s.modalButtons}>
                                <TouchableOpacity 
                                    style={[s.modalBtn, { backgroundColor: C.neutral[200] }]} 
                                    onPress={() => setRenameModalVisible(false)}
                                >
                                    <Body style={{ color: C.neutral[800], fontWeight: '600' }}>Cancelar</Body>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[s.modalBtn, { backgroundColor: C.primary[600] }]} 
                                    onPress={handleSaveRename}
                                >
                                    <Body style={{ color: '#FFF', fontWeight: '600' }}>Salvar</Body>
                                </TouchableOpacity>
                            </View>
                        </NeoCard>
                    </KeyboardAvoidingView>
                </Modal>

            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 8,
        paddingBottom: 16,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    subtitle: {
        lineHeight: 17,
        color: C.neutral[700],
    },
    tabBar: {
        flexDirection: 'row',
        marginHorizontal: Neo.spacing.lg,
        backgroundColor: C.neutral[200],
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    tabButtonActive: {
        backgroundColor: '#FFF',
        ...Neo.shadows.sm,
    },
    tabText: {
        fontWeight: '600',
        color: C.neutral[600],
        fontSize: 14,
    },
    tabTextActive: {
        color: C.primary[700],
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 140,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
    },
    cardActive: {
        borderWidth: 1.5,
        borderColor: C.primary[500],
        backgroundColor: C.primary[50],
    },
    iconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: C.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    activeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.primary[600],
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 99,
        gap: 4,
    },
    activeBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginLeft: 8,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: C.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Neo.spacing.lg,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        backgroundColor: 'transparent',
    },
    mainBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: C.primary[700],
        paddingVertical: 16,
        borderRadius: 14,
        ...Neo.shadows.md,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: Neo.spacing.lg,
    },
    modalCard: {
        padding: 24,
        borderRadius: 20,
    },
    input: {
        backgroundColor: C.neutral[200],
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: C.neutral[900],
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 12,
    },
});
