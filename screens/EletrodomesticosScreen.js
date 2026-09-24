import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import ReviewImage from '../components/ReviewImage';
import NeoScreenHeader from '../components/NeoScreenHeader';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { eletrodomesticosSeguranca } from '../data/eletrodomesticos_seguranca';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// DS: data-level color (used as tint)
const DEVICE_COLORS = {
    microondas:    Neo.colors.categoria.ocre.fill, // TODO: map to DS token
    processadores: Neo.colors.categoria.ameixa.fill, // TODO: map to DS token
    fogao:         '#D32F2F', // TODO: map to DS token
    aquecedor:     Neo.colors.categoria.ocre.fill, // TODO: map to DS token
    ventilador:    '#0EA5E9', // DS: mapped to colors.secondary[500]
    ferro:         Neo.colors.categoria.rose.fill, // TODO: map to DS token
    secador:       Neo.colors.categoria.rose.fill, // TODO: map to DS token
    geladeira:     Neo.colors.categoria.ardosia.fill, // DS: mapped to colors.secondary[500]
};

export default function EletrodomesticosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [expandedId, setExpandedId] = useState(null);
    const insets = useSafeAreaInsets();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];

    // Hero com parallax. Este bloco estava colado DENTRO de `renderDeviceCard`,
    // enquanto o JSX do componente o referenciava de fora — todas estas
    // constantes ficavam indefinidas na hora de renderizar. Dois defeitos num:
    // a tela quebrava, e `useRef` rodava dentro de uma funcao que nao e
    // componente, violando as regras de hooks (uma chamada por card renderizado).
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

    const titleStr = t('headersFirst.eletrodomesticos', 'Eletrodomésticos');
    const capaSource = require('../assets/illustrations/pad/hero_eletro.png');

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const renderDeviceCard = (device) => {
        const isExpanded = expandedId === device.id;
        const cardBg = isDark ? themeColors.neutral[200] : Neo.colors.neutral.white;
        const deviceColor = DEVICE_COLORS[device.id] || themeColors.primary[500];

    return (
            <TouchableOpacity
                key={device.id}
                onPress={() => toggleExpand(device.id)}
                activeOpacity={0.9}
                style={{ marginBottom: 16 }}
            >
                {/* Card retangular 130x130 padrão Plantas/Reviews */}
                <View style={styles.guideCardOuter}>
                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                        <View style={[styles.guideImageContainer, { backgroundColor: deviceColor + '15' }]}>
                            {device.imagemUrl ? (
                                <ReviewImage
                                    source={typeof device.imagemUrl === 'string' ? (typeof device.imagemUrl === 'string' ? { uri: device.imagemUrl } : device.imagemUrl) : device.imagemUrl}
                                    tint={deviceColor}
                                    accessibilityLabel={device.nome}
                                />
                            ) : (
                                <NeoIcon
                                    name={getIconForDevice(device.id)}
                                    size={48}
                                    color={deviceColor}
                                />
                            )}
                        </View>
                        <View style={styles.guideContent}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={{ flex: 1, paddingRight: 8 }}>
                                    <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={2}>{device.nome}</Text>
                                </View>
                                <NeoIcon
                                    name={isExpanded ? "ArrowUp2" : "ArrowDown2"}
                                    size={18}
                                    color={textMuted}
                                />
                            </View>
                            <View style={{ flex: 1 }} />
                            <View style={styles.badgesRow}>
                                {device.travas && (
                                    <View style={styles.badgeLock}>
                                        <NeoIcon name="Lock" size={10} color={Neo.colors.neutral.white} style={{ marginRight: 3 }} />
                                        <Text style={styles.badgeLockText}>Trava</Text>
                                    </View>
                                )}
                                {device.riscos.slice(0, 2).map((risco, index) => (
                                    <View key={index} style={styles.badgeRisk}>
                                        <Text style={styles.badgeRiskText}>{risco}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                {isExpanded && (
                    <View style={styles.cardContent}>
                        <Text style={[styles.description, { color: textBody }]}>{device.descricao}</Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('headersFirst.RiscosPrincipais', '⚠️ Riscos Principais')}</Text>
                            <View style={styles.tagsContainer}>
                                {device.riscos.map((risco, idx) => (
                                    <View key={idx} style={styles.riskTag}>
                                        <NeoIcon name="Warning2" size={14} color={Colors.error} style={{ marginRight: 4 }} />
                                        <Text style={styles.riskTagText}>{risco}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('headersFirst.PrevenO', '🛡️ Prevenção')}</Text>
                            {device.prevencao.map((item, idx) => (
                                <View key={idx} style={styles.checkItem}>
                                    <NeoIcon name="TickCircle" size={18} color={Colors.success} style={{ marginRight: 8, marginTop: 2 }} />
                                    <Text style={styles.checkText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const getIconForDevice = (id) => {
        const map = {
            'microondas': 'restaurant',
            'processadores': 'nutrition',
            'fogao': 'flame',
            'aquecedor': 'thermometer',
            'ventilador': 'snow',
            'ferro': 'shirt',
            'secador': 'water',
            'geladeira': 'cube'
        };
        return map[id] || 'hardware-chip';
    };

    return (
        <AppBackground>

                {/* Cabeçalho Padronizado */}
                
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
                        accessibilityLabel={titleStr}
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
                            {titleStr}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ paddingTop: 24 }}>


                
                {eletrodomesticosSeguranca.map((categoria) => (
                    <View key={categoria.id} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <NeoIcon name={categoria.icone || 'Electricity'} size={32} color={Neo.colors.primary[600]} variant="Bold" />
                            <Text style={styles.categoryTitle}>{categoria.categoria}</Text>
                        </View>
                        {categoria.dispositivos.map(renderDeviceCard)}
                    </View>
                ))}
                <View style={{ height: 40 }} />
            </View>
            </Animated.ScrollView>
            
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.md,
        paddingTop: Spacing.sm,
        paddingBottom: Spacing.xl,
        borderBottomLeftRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.xl,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    headerTitle: {
        fontSize: Typography.sizes.xl,
        fontFamily: Typography.fontFamily.bold,
        color: Neo.colors.neutral.white,
    },
    headerSubtitle: {
        fontSize: Typography.sizes.md,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    scrollContent: {
        padding: Spacing.md,
    },
    categorySection: {
        marginBottom: Spacing.lg,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.xs,
    },
    categoryEmoji: {
        fontSize: 24,
        marginRight: Spacing.sm,
    },
    categoryTitle: {
        fontSize: Typography.sizes.lg,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
    },
    // Card grande estilo Plantas/Animais (imagem retangular à esquerda)
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 130,
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 130,
        height: '100%',
        backgroundColor: Neo.colors.neutral[200],
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
        marginBottom: 4,
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    badgeLock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    badgeLockText: {
        color: Neo.colors.neutral.white,
        fontSize: 10,
        fontFamily: Typography.fontFamily.bold,
    },
    badgeRisk: {
        backgroundColor: Colors.surfaceVariant,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    badgeRiskText: {
        color: Colors.textSecondary,
        fontSize: 10,
        fontFamily: Typography.fontFamily.medium,
    },
    cardContent: {
        padding: Spacing.md,
        marginTop: -10,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 16,
        marginHorizontal: 8,
    },
    description: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        lineHeight: 20,
    },
    section: {
        marginTop: Spacing.sm,
    },
    sectionTitle: {
        fontSize: Typography.sizes.sm,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: Spacing.md,
    },
    riskTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // DS: emergency panic bg
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: BorderRadius.sm,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)', // DS: emergency panic border
    },
    riskTagText: {
        color: Colors.error,
        fontSize: 14,
        fontFamily: Typography.fontFamily.medium,
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    checkText: {
        flex: 1,
        fontSize: Typography.sizes.sm,
        color: Colors.textPrimary,
        lineHeight: 20,
    },
});




