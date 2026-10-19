import { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import ReviewImage from '../../components/ReviewImage';
import AppBackground from '../../components/AppBackground';

import { DS as Neo } from '../../utils/DesignSystem2026';
import { Body, Small } from "../../components/NeoTypography";
import { MAPA_PREVENCAO } from '../../data/knowledge_prevencao';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors } from '../../utils/ThemeContext';

export default function RiscosMenuScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');
    const ambientes = Object.values(MAPA_PREVENCAO);
    const themeColors = useThemeColors();

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 280;
    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ];

    const title = t('riscosMenu.title', 'Prevenção em casa');
    const capaSource = require('../../assets/illustrations/pad/hero_riscos.png');

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        justifyContent: 'center', alignItems: 'center',
                        marginLeft: 16, marginTop: 12,
                    }}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors?.neutral?.[800] || '#222',
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={capaSource}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                        accessibilityLabel={title}
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }}>
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                    <View style={s.grid}>
                        {ambientes.map((item) => {
                            const topicCount = item.conteudo?.filter(c => c.tipo === 'topico').length || 0;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={s.gridCell}
                                    onPress={() => navigation.navigate('EnvironmentGuideNeo', { ambienteId: item.id })}
                                    activeOpacity={0.85}
                                >
                                    <NeoCard variant="elevated" style={s.gridCard}>
                                        <View style={[s.iconCircle, { backgroundColor: (item.cor || Neo.colors.primary[500]) + '33' }]}>
                                            <Text style={s.emoji}>{item.emoji}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            <Body style={s.itemTitle} numberOfLines={2}>
                                                {t_field(item, 'nome')}
                                            </Body>
                                            <Small style={s.itemSub} numberOfLines={1}>
                                                {topicCount} {t('riscosMenu.preventionTopics', 'tópicos')}
                                            </Small>
                                        </View>
                                    </NeoCard>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </Animated.ScrollView>
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

    // Grid 2-col
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    gridCell: {
        width: '48.5%',
        aspectRatio: 1,
        marginBottom: 4,
    },
    gridCard: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    iconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 28,
    },
    itemTitle: {
        fontWeight: '800',
        fontSize: 14.5,
        marginBottom: 2,
    },
    itemSub: {
        fontSize: 11,
    },
});
