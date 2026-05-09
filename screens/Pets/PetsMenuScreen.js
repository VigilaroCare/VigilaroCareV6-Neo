/**
 * PetsMenuScreen.js
 * Menu de Segurança para Pets
 * Vigilaro Care V5
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Pet, ArrowRight2 } from 'iconsax-react-native'; // Standard icons
import { Shadows } from '../../utils/Theme';
import { PET_SAFETY_CONTENT } from '../../data/pet_safety_content';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import NeoText, { H3, Body, Small } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';

export default function PetsMenuScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const THEME_COLOR = '#9C27B0'; // Purple

    const items = [
        {
            id: 'prenhez',
            titulo: t('petsMenu.prenhez.titulo'),
            subtitulo: t('petsMenu.prenhez.subtitulo'),
            descricao: t('petsMenu.prenhez.descricao'),
            emoji: '🐾',
            cor: '#F3E5F5',
            corIcone: '#E1BEE7', // Light Purple
            tela: 'PetPregnancyGuide',
        },
        {
            id: 'filhotes',
            titulo: t('petsMenu.filhotes.titulo'),
            subtitulo: t('petsMenu.filhotes.subtitulo'),
            descricao: t('petsMenu.filhotes.descricao'),
            emoji: '🐶',
            cor: '#E3F2FD',
            corIcone: '#90CAF9', // Light Blue
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['filhotes'].risks,
            checklist: PET_SAFETY_CONTENT['filhotes'].checklist
        },
        {
            id: 'adultos',
            titulo: t('petsMenu.adultos.titulo'),
            subtitulo: t('petsMenu.adultos.subtitulo'),
            descricao: t('petsMenu.adultos.descricao'),
            emoji: '🐕',
            cor: '#E8F5E9',
            corIcone: '#A5D6A7', // Light Green
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['adultos'].risks,
            checklist: PET_SAFETY_CONTENT['adultos'].checklist
        },
        {
            id: 'aves',
            titulo: t('petsMenu.aves.titulo'),
            subtitulo: t('petsMenu.aves.subtitulo'),
            descricao: t('petsMenu.aves.descricao'),
            emoji: '🦜',
            cor: '#FFF9C4',
            corIcone: '#FFF176',
            tela: 'AvesSeguras',
        },
        {
            id: 'wellness',
            titulo: t('petsMenu.wellness.titulo'),
            subtitulo: t('petsMenu.wellness.subtitulo'),
            descricao: t('petsMenu.wellness.descricao'),
            emoji: '🌟',
            cor: '#E0F2F1',
            corIcone: '#80CBC4',
            tela: 'PetWellness',
        },
        {
            id: 'pequenos',
            titulo: t('petsMenu.pequenos.titulo'),
            subtitulo: t('petsMenu.pequenos.subtitulo'),
            descricao: t('petsMenu.pequenos.descricao'),
            emoji: '🐹',
            cor: '#FBE9E7',
            corIcone: '#FFAB91',
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['pequenos_mamiferos'].risks,
            checklist: PET_SAFETY_CONTENT['pequenos_mamiferos'].checklist
        },
        {
            id: 'peixes',
            titulo: t('petsMenu.peixes.titulo'),
            subtitulo: t('petsMenu.peixes.subtitulo'),
            descricao: t('petsMenu.peixes.descricao'),
            emoji: '🐠',
            cor: '#E1F5FE',
            corIcone: '#81D4FA',
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['peixes'].risks,
            checklist: PET_SAFETY_CONTENT['peixes'].checklist
        },
        {
            id: 'alimentos',
            titulo: t('petsMenu.alimentos.titulo'),
            subtitulo: t('petsMenu.alimentos.subtitulo'),
            descricao: t('petsMenu.alimentos.descricao'),
            emoji: '🍫',
            cor: '#FFEBEE',
            corIcone: '#D32F2F',
            tela: 'PetFoodSafety',
        },
        {
            id: 'socorros',
            titulo: t('petsMenu.socorros.titulo'),
            subtitulo: t('petsMenu.socorros.subtitulo'),
            descricao: t('petsMenu.socorros.descricao'),
            emoji: '🚑',
            cor: '#EFEBE9',
            corIcone: '#4E342E',
            tela: 'PrimeirosSocorrosEmergencia',
        },
        {
            id: 'guia_socorros_pet',
            titulo: t('petsMenu.guia_socorros_pet.titulo'),
            subtitulo: t('petsMenu.guia_socorros_pet.subtitulo'),
            descricao: t('petsMenu.guia_socorros_pet.descricao'),
            emoji: '📖',
            cor: '#F3E5F5',
            corIcone: '#E1BEE7',
            tela: 'PrimeirosSocorros',
        },
        {
            id: 'kit_pet_checklist',
            titulo: t('petsMenu.kit_pet_checklist.titulo'),
            subtitulo: t('petsMenu.kit_pet_checklist.subtitulo'),
            descricao: t('petsMenu.kit_pet_checklist.descricao'),
            emoji: '🎒',
            cor: '#FFF3E0',
            corIcone: '#FFB74D',
            tela: 'GuiaKitsEmergencia',
params: {}
        }
    ];

    return (
        <AppBackground variant="subtle">
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <StatusBar style="dark" />

            {/* Header Neo Glass */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
                <NeoCard variant="glass"
                    style={{
                        width: '100%',
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        ...Neo.shadows?.sm
                    }}
                >
                    <View style={{
                        width: 48, height: 48, borderRadius: 12,
                        backgroundColor: '#F3E5F5', alignItems: 'center', justifyContent: 'center',
                        marginRight: 16
                    }}>
                        <Text style={{ fontSize: 24 }}>🐾</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: THEME_COLOR, fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{t('petsMenu.headerTitle')}</Text>
                        <Text style={{ color: Neo.colors.neutral[600], fontSize: 13, fontWeight: '600' }}>{t('petsMenu.headerSubtitle')}</Text>
                    </View>
                </NeoCard>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>

                <Body style={{ textAlign: 'center', marginBottom: 24, paddingHorizontal: 16 }}>
                    {t('petsMenu.introText')}
                </Body>

                {/* Vertical List Layout */}
                <View style={styles.listContainer}>
                    {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                                if (item.tela === 'AgeGroupDetail') {
                                    navigation.navigate(item.tela, {
                                        group: {
                                            title: item.titulo,
                                            subtitle: item.subtitulo,
                                            description: item.descricao,
                                            color: item.corIcone,
                                            icon: 'paw', // Generic icon
                                            risks: item.risks,
                                            checklist: item.checklist
                                        }
                                    });
                                } else {
                                    navigation.navigate(item.tela, item.params || {});
                                }
                            }}
                            activeOpacity={0.8}
                        >
                            <NeoCard variant="glass" style={styles.listCard}>
                                <View style={[styles.iconContainer, { backgroundColor: item.corIcone }]}>
                                    <NeoText style={{ fontSize: 26 }}>{item.emoji}</NeoText>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                                    <Text style={styles.cardDesc} numberOfLines={2}>{item.descricao}</Text>
                                </View>
                                <View style={styles.chevronBox}>
                                    <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                                </View>
                            </NeoCard>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    infoBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        ...Shadows.sm,
    },
    infoText: {
        fontSize: 14,
        color: '#424242',
        lineHeight: 20,
        textAlign: 'center',
    },
    listContainer: {
        flexDirection: 'column',
        gap: 12
    },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 4,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: Neo.colors.neutral[500],
        lineHeight: 18,
    },
    chevronBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12
    }
});
