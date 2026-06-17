import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import { H1, Caption } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function LazerFeriasMenuScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    const items = [
        {
            id: 'lazer',
            title: t('lazerMenu.lazer.title', 'Lazer ao Ar Livre'),
            desc: t('lazerMenu.lazer.desc', 'Segurança em parques, piscinas e parquinhos.'),
            iconName: 'Sun1',
            iconColor: '#00ACC1', // Cyan 600
            route: 'SegurancaLazer',
        },
        {
            id: 'ferias',
            title: t('lazerMenu.ferias.title', 'Viagens e Férias'),
            desc: t('lazerMenu.ferias.desc', 'Preparação da casa e segurança no destino.'),
            iconName: 'Airplane',
            iconColor: '#8E24AA', // Purple 600
            route: 'SegurancaFerias',
        },
        {
            id: 'mobilidade',
            title: t('lazerMenu.mobilidade.title', 'Mobilidade Segura'),
            desc: t('lazerMenu.mobilidade.desc', 'Transporte seguro de bebês, crianças e pets.'),
            iconName: 'Flash',
            iconColor: '#FFB300', // Amber 600
            route: 'MobilidadeSegura',
        }
    ];

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER padronizado */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={styles.title}>
                            {t('lazerMenu.headerTitle', 'Lazer e Viagens')}
                        </H1>
                        <Caption style={styles.subtitle}>
                            {t('lazerMenu.headerSubtitle', 'Guia de segurança fora de casa')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: 20 }}>
                        {items.map((item) => (
                            <NeoHorizontalCard
                                key={item.id}
                                title={item.title}
                                description={item.desc}
                                iconName={item.iconName}
                                color={item.iconColor}
                                onPress={() => navigation.navigate(item.route)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 14,
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
        fontSize: 24,
    },
    subtitle: {
        fontSize: 14,
    },
    content: {
        paddingHorizontal: 20,
    },
});
