import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { Shadows, Colors } from '../../utils/Theme';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import {
    Sun1, Airplane, Flash
} from 'iconsax-react-native';
import { useTranslation } from 'react-i18next';

export default function LazerFeriasMenuScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const items = [
        {
            id: 'lazer',
            title: t('lazerMenu.lazer.title'),
            subtitulo: t('lazerMenu.lazer.subtitulo'),
            desc: t('lazerMenu.lazer.desc'),
            icon: Sun1,
            color: '#E0F7FA', // Cyan 50
            iconColor: '#00ACC1', // Cyan 600
            route: 'SegurancaLazer',
        },
        {
            id: 'ferias',
            title: t('lazerMenu.ferias.title'),
            subtitulo: t('lazerMenu.ferias.subtitulo'),
            desc: t('lazerMenu.ferias.desc'),
            icon: Airplane,
            color: '#F3E5F5', // Purple 50
            iconColor: '#8E24AA', // Purple 600
            route: 'SegurancaFerias',
        },
        {
            id: 'mobilidade',
            title: t('lazerMenu.mobilidade.title'),
            subtitulo: t('lazerMenu.mobilidade.subtitulo'),
            desc: t('lazerMenu.mobilidade.desc'),
            icon: Flash,
            color: '#FFF8E1', // Amber 50
            iconColor: '#FFB300', // Amber 600
            route: 'MobilidadeSegura',
        }
    ];

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('lazerMenu.headerTitle')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('lazerMenu.headerSubtitle')}</Text>
                    </View>
                </View>

                {/* List Layout Nível 2 */}
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={{ width: '100%', marginBottom: 16 }}
                                onPress={() => navigation.navigate(item.route)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.guideCardOuter}>
                                    <View style={styles.guideCardInner}>
                                        <View style={[styles.guideImageContainer, { backgroundColor: item.color }]}>
                                            <Icon size={48} color={item.iconColor} variant="Bold" />
                                        </View>
                                        
                                        <View style={styles.guideContent}>
                                            <View style={{ flex: 1, paddingRight: 8 }}>
                                                <Text style={styles.guideTitle} numberOfLines={1}>
                                                    {item.title}
                                                </Text>
                                                <Text style={styles.guideSubtitle} numberOfLines={1}>
                                                    {item.subtitulo}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }} />
                                            <Text style={styles.descText} numberOfLines={2}>
                                                {item.desc}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    guideTitle: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans_700Bold',
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginBottom: 2
    },
    guideSubtitle: {
        fontSize: 14,
        color: Neo.colors.neutral[500],
        fontFamily: 'PlusJakartaSans_500Medium',
        fontStyle: 'italic',
    },
    descText: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        fontFamily: 'PlusJakartaSans_500Medium',
        lineHeight: 18,
    }
});
