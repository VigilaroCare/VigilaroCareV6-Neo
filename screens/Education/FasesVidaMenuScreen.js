import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import { ArrowLeft, EmojiHappy, Book1, ArrowRight2 } from 'iconsax-react-native';
import { FASES_VIDA_DATA } from '../../data/fases_vida';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';

const { width } = Dimensions.get('window');

export default function FasesVidaMenuScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');

    // Correct order based on eBook content
    const dataKeys = [
        'baby_0_6', 'baby_7_12',
        'child_1_3', 'child_3_5', 'child_6_14',
        'teen', 'adult', 'pne', 'elder'
    ];

    const items = dataKeys.map(key => {
        const data = FASES_VIDA_DATA[key];
        if (!data) return null;

        let cardTitle = t_field(data, 'cardTitle');
        let desc = t_field(data, 'desc');

        return {
            id: key,
            cardTitle,
            desc,
            icon: data.icon,
            color: data.bg,
            iconColor: data.iconColor,
            data: data
        };
    }).filter(item => item !== null);

    const handlePress = (item) => {
        navigation.navigate('ConceitoDetail', {
            conceito: item.data
        });
    };

    return (
        <AppBackground>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar barStyle="dark-content" />

                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H2 style={{ color: Neo.colors.neutral[900] }}>
                            {t('fasesVida.title', 'Fases da Vida')}
                        </H2>
                        <Body style={{ color: Neo.colors.neutral[500] }}>
                            {t('fasesVida.subtitle', 'Guia de proteção por faixa etária')}
                        </Body>
                    </View>
                </View>

                {/* Vertical List Layout */}
                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.listContainer}>
                        {items.map((item) => {
                            const Icon = item.icon || EmojiHappy;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handlePress(item)}
                                    activeOpacity={0.8}
                                >
                                    <NeoCard variant="glass" style={styles.listCard}>
                                        <View style={[styles.iconContainer, { backgroundColor: item.color + '33' }]}>
                                            <Icon size={28} color={item.iconColor} variant="Bold" />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.cardTitle}>{item.cardTitle}</Text>
                                            <Text style={styles.cardDesc}>{item.desc}</Text>
                                        </View>
                                        <View style={styles.chevronBox}>
                                            <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                                        </View>
                                    </NeoCard>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </ScrollView>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    backBtn: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
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
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)'
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
        fontWeight: '500',
    },
    chevronBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12
    },
    articleCard: {
        padding: 16,
        marginBottom: 12,
    },
    articleTitle: {
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        flex: 1
    },
    articleDesc: {
        color: Neo.colors.neutral[500],
        lineHeight: 20
    },
    tag: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Neo.colors.primary[500],
        backgroundColor: Neo.colors.primary[500] + '1A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    }
});
