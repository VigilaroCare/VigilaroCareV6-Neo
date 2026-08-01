import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef,  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { utensiliosDomesticos } from '../../data/utensilios_domesticos';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, Small } from '../../components/NeoTypography';
import ReviewImage from '../../components/ReviewImage';
import FadeInView from '../../components/FadeInView';
import { Shadows } from '../../utils/Theme';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import NeoScreenHeader from '../../components/NeoScreenHeader';

// Cor de risco por nivel (heuristica baseada no texto do campo)
const getRiscoColor = (risco) => {
    const r = (risco || '').toLowerCase();
    if (r.includes('explos') || r.includes('grave') || r.includes('choque')) return '#D32F2F';
    if (r.includes('queimadu') || r.includes('contamin')) return '#E65100';
    if (r.includes('corte') || r.includes('perfur')) return '#F57F17';
    return '#388E3C';
};

const getRiscoBg = (color) => color + '15';

export default function UtensiliosDomesticosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
    const [search, setSearch] = useState('');

    const THEME_COLOR = '#E65100'; // consistente com UtensiliosReviewsScreen

    const filteredData = utensiliosDomesticos.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.categoria.toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (item) => {
        // Padroniza com FasesVida/Produtos: navega para ConceitoDetail.
        // ConceitoDetail ja sabe ler imagemUrl como hero (Lote 7k) e
        // os campos nome/descricao/prevencao/primeirosSocorros.
        navigation.navigate('ConceitoDetail', {
            conceito: {
                ...item,
                iconColor: getRiscoColor(item.risco),
            },
        });
    };

    const capaUrl = require('../../assets/illustrations/pad/cozinha-utensilios_cozinha-fogao-panelas_006.jpg');

    const title = t('headersFirst.utensLiosDomSticos', 'Utensílios Domésticos');
    const subtitle = t('headersFirst.seguranANaCozinhaEReasDeServiO', 'Segurança na cozinha e áreas de serviço');

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

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            {/* Float Header / Back Button */}
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
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors.neutral[800],
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', isDark ? themeColors.neutral[100] : themeColors.neutral.white]}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
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
                            marginBottom: 8,
                        }}>
                            {title}
                        </Text>
                        <Text style={{
                            fontSize: 17,
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 24,
                        }}>
                            {subtitle}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>

                    {/* Search Bar */}
                    <View style={[styles.searchContainer, { borderColor: themeColors.neutral[300], backgroundColor: isDark ? 'rgba(28,28,30,0.4)' : 'rgba(255,255,255,0.5)' }]}>
                        <NeoIcon name="SearchNormal1" size={20} color={textMuted} />
                        <TextInput
                            style={[styles.searchInput, { color: textPrimary }]}
                            placeholder="Buscar utensílio (ex: Facas, Panelas)"
                            placeholderTextColor={textMuted}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <NeoIcon name="ClipboardText" size={13} color={textMuted} style={{ marginRight: 6 }} />
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                {filteredData.length} itens • Toque para ver detalhes
                            </Text>
                        </View>
                    </FadeInView>

                    {filteredData.map((item, idx) => {
                        const riscoColor = getRiscoColor(item.risco);
                        const riscoBg = getRiscoBg(riscoColor);

                        return (
                            <FadeInView key={item.id} delay={150 + idx * 50}>
                                <TouchableOpacity
                                    onPress={() => handlePress(item)}
                                    activeOpacity={0.8}
                                    style={{ marginBottom: 16 }}
                                >
                                    {/* Padrão de card alinhado com Plantas/Animais/Reviews */}
                                    <View style={styles.guideCardOuter}>
                                        <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                            <View style={[styles.guideImageContainer, { backgroundColor: riscoBg }]}>
                                                {item.imagemUrl ? (
                                                    <ReviewImage
                                                        source={typeof item.imagemUrl === 'string' ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : item.imagemUrl}
                                                        tint={riscoColor}
                                                        accessibilityLabel={item.nome}
                                                    />
                                                ) : (
                                                    <Text style={{ fontSize: 48 }}>
                                                        {item.emoji === 'blender' ? '🌪️' : item.emoji}
                                                    </Text>
                                                )}
                                            </View>
                                            <View style={styles.guideContent}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <View style={{ flex: 1, paddingRight: 8 }}>
                                                        <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{item.nome}</Text>
                                                        <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{item.categoria}</Text>
                                                    </View>
                                                    <View style={[styles.riscoBadge, { backgroundColor: riscoBg }]}>
                                                        <Text style={[styles.riscoText, { color: riscoColor }]} numberOfLines={1}>{item.risco}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                                <Text style={[styles.descText, { color: textBody }]} numberOfLines={2}>{item.descricao}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </FadeInView>
                        );
                    })}

                    <View style={{ height: 200 }} />
                </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    headerTitle: {
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontFamily: 'PlusJakartaSans_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 6,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
    },

    listContent: {
        paddingHorizontal: 16,
    },
    infoBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        fontWeight: '500',
    },

    // Card grande estilo Plantas/Animais (imagem retangular a esquerda)
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 2,
    },
    guideSubtitle: {
        fontSize: 11.5,
        fontStyle: 'italic',
        marginBottom: 6,
    },
    riscoBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        maxWidth: 120,
    },
    riscoText: {
        fontSize: 9.5,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    descText: {
        fontSize: 11.5,
        lineHeight: 16,
    },
});
