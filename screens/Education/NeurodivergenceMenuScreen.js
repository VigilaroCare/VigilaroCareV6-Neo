import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, Caption } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { NEURODIVERGENCE_DATA } from '../../data/neurodivergence_data';

export default function NeurodivergenceMenuScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textBody = themeColors.neutral[700];

    const data = NEURODIVERGENCE_DATA;

    const handlePress = (item) => {
        navigation.navigate('PremiumArticle', {
            conceito: {
                titulo: item.title,
                conteudo: item.content,
                icon: item.icon,
                color: item.color,
                tags: [data.title]
            }
        });
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(28,28,30,0.75)' : 'rgba(255,255,255,0.75)' }]}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={styles.title}>{data.title}</H1>
                        <Caption style={styles.subtitle}>{data.subtitle}</Caption>
                    </View>
                </View>

                {/* CONTENT */}
                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    <Caption style={{ marginBottom: 24, fontSize: 16 }}>{data.description}</Caption>
                    
                    {data.categories.map((cat, index) => (
                        <NeoHorizontalCard
                            key={cat.id}
                            title={cat.title}
                            description={cat.short_desc}
                            iconName={cat.icon}
                            color={cat.color}
                            onPress={() => handlePress(cat)}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 2,
    }
});
