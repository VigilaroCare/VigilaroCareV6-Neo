/**
 * PetsMenuScreen.js
 * Hub de Saúde Pet — Vigilaro Care V6 Neo
 *
 * Filosofia: lista plana de 11 itens vira 3 seções semânticas
 * (Por tipo/idade · Bem-estar · Emergência). Cada item é um card glass
 * horizontal com ícone (emoji on-brand para pets) + título + descrição.
 */

import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ArrowRight2 } from 'iconsax-react-native';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { PET_SAFETY_CONTENT } from '../../data/pet_safety_content';

export default function PetsMenuScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');

    // ── Por tipo/idade ──
    const sectionTipos = [
        {
            id: 'prenhez',
            emoji: '🤰',
            cor: '#E91E63',
            titulo: t('petsMenu.prenhez.titulo'),
            descricao: t('petsMenu.prenhez.descricao'),
            tela: 'PetPregnancyGuide',
        },
        {
            id: 'filhotes',
            emoji: '🐶',
            cor: '#2196F3',
            titulo: t('petsMenu.filhotes.titulo'),
            descricao: t('petsMenu.filhotes.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['filhotes']?.risks,
            checklist: PET_SAFETY_CONTENT['filhotes']?.checklist,
        },
        {
            id: 'adultos',
            emoji: '🐕',
            cor: '#4CAF50',
            titulo: t('petsMenu.adultos.titulo'),
            descricao: t('petsMenu.adultos.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['adultos']?.risks,
            checklist: PET_SAFETY_CONTENT['adultos']?.checklist,
        },
        {
            id: 'pequenos',
            emoji: '🐹',
            cor: '#FF7043',
            titulo: t('petsMenu.pequenos.titulo'),
            descricao: t('petsMenu.pequenos.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['pequenos_mamiferos']?.risks,
            checklist: PET_SAFETY_CONTENT['pequenos_mamiferos']?.checklist,
        },
        {
            id: 'aves',
            emoji: '🦜',
            cor: '#FBC02D',
            titulo: t('petsMenu.aves.titulo'),
            descricao: t('petsMenu.aves.descricao'),
            tela: 'AvesSeguras',
        },
        {
            id: 'peixes',
            emoji: '🐠',
            cor: '#0EA5E9',
            titulo: t('petsMenu.peixes.titulo'),
            descricao: t('petsMenu.peixes.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['peixes']?.risks,
            checklist: PET_SAFETY_CONTENT['peixes']?.checklist,
        },
    ];

    // ── Bem-estar & alimentação ──
    const sectionBemEstar = [
        {
            id: 'wellness',
            emoji: '🌿',
            cor: '#16A34A',
            titulo: t('petsMenu.wellness.titulo'),
            descricao: t('petsMenu.wellness.descricao'),
            tela: 'PetWellness',
        },
        {
            id: 'alimentos',
            emoji: '🍫',
            cor: '#D32F2F',
            titulo: t('petsMenu.alimentos.titulo'),
            descricao: t('petsMenu.alimentos.descricao'),
            tela: 'PetFoodSafety',
        },
    ];

    // ── Emergência ──
    const sectionEmergencia = [
        {
            id: 'socorros',
            emoji: '🚑',
            cor: '#DC2626',
            titulo: t('petsMenu.socorros.titulo'),
            descricao: t('petsMenu.socorros.descricao'),
            tela: 'PrimeirosSocorrosEmergencia',
        },
        {
            id: 'guia_socorros_pet',
            emoji: '📖',
            cor: '#7C3AED',
            titulo: t('petsMenu.guia_socorros_pet.titulo'),
            descricao: t('petsMenu.guia_socorros_pet.descricao'),
            tela: 'PrimeirosSocorros',
        },
        {
            id: 'kit_pet_checklist',
            emoji: '🎒',
            cor: '#F59E0B',
            titulo: t('petsMenu.kit_pet_checklist.titulo'),
            descricao: t('petsMenu.kit_pet_checklist.descricao'),
            tela: 'GuiaKitsEmergencia',
            params: {},
        },
    ];

    const handlePress = (item) => {
        if (item.tela === 'AgeGroupDetail') {
            navigation.navigate(item.tela, {
                group: {
                    title: item.titulo,
                    subtitle: t(`petsMenu.${item.id}.subtitulo`, ''),
                    description: item.descricao,
                    color: item.cor,
                    icon: 'paw',
                    risks: item.risks,
                    checklist: item.checklist,
                },
            });
        } else {
            navigation.navigate(item.tela, item.params || {});
        }
    };

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(item)}
            activeOpacity={0.85}
            style={{ marginBottom: 10 }}
        >
            <NeoCard variant="elevated" style={s.itemCard}>
                <View style={[s.iconCircle, { backgroundColor: item.cor + '26' }]}>
                    <Text style={s.emoji}>{item.emoji}</Text>
                </View>
                <View style={s.textCol}>
                    <Body style={s.itemTitle} numberOfLines={1}>{item.titulo}</Body>
                    <Small style={s.itemDesc} numberOfLines={2}>{item.descricao}</Small>
                </View>
                <ArrowRight2 size={18} color={Neo.colors.neutral[500]} />
            </NeoCard>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER consistente */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('petsMenu.headerTitle', 'Saúde Pet')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('petsMenu.headerSubtitle', 'Cuidados e segurança para seus pets')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* POR TIPO/IDADE */}
                    <Text style={s.sectionLabel}>
                        {t('petsMenu.sectionTipos', 'Por tipo / idade')}
                    </Text>
                    {sectionTipos.map(renderItem)}

                    {/* BEM-ESTAR */}
                    <Text style={[s.sectionLabel, { marginTop: 22 }]}>
                        {t('petsMenu.sectionBemEstar', 'Bem-estar')}
                    </Text>
                    {sectionBemEstar.map(renderItem)}

                    {/* EMERGÊNCIA */}
                    <Text style={[s.sectionLabel, { marginTop: 22 }]}>
                        {t('petsMenu.sectionEmergencia', 'Emergência')}
                    </Text>
                    {sectionEmergencia.map(renderItem)}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 18,
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
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Section labels
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Item card
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    emoji: {
        fontSize: 26,
    },
    textCol: {
        flex: 1,
    },
    itemTitle: {
        fontWeight: '800',
        fontSize: 14.5,
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    itemDesc: {
        color: Neo.colors.neutral[600],
        lineHeight: 16,
    },
});
