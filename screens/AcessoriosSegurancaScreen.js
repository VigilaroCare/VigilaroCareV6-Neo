import { LinearGradient } from 'expo-linear-gradient';
/**
 * AcessoriosSegurancaScreen.js
 * Tela de Acessórios de Segurança (Baby-proof, Idosos, Pets, PCD)
 * Vigilaro Care V6 Neo
 *
 * Padrao card-retangulo 120x120 + filtro por perfil + navegacao para
 * ConceitoDetail (hero = foto do card). Sem expand inline.
 */

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../components/NeoIcon';
import { Shadows } from '../utils/Theme';
import { ACESSORIOS_SEGURANCA } from '../data/acessorios_seguranca';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import ReviewImage from '../components/ReviewImage';
import FadeInView from '../components/FadeInView';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

const THEME_COLOR = Neo.colors.categoria.ameixa.fill;

export default function AcessoriosSegurancaScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    const allCategories = ACESSORIOS_SEGURANCA.categorias || [];

    const handlePress = (cat) => {
        // ConceitoDetail ja le imagemUrl/imagem como hero (Lote 7k).
        // Mapeia os campos do data de acessorios para o que o detail espera.
        navigation.navigate('ConceitoDetail', {
            conceito: {
                ...cat,
                nome: cat.titulo,
                descricao: cat.descricao,
                iconColor: THEME_COLOR,
                // Tipos vira "como_identificar" pra renderizar como lista
                comoIdentificar: cat.tipos ? cat.tipos.map(t => t.nome || JSON.stringify(t)) : null,
                // onde / ondeInstalar viram "ondeEncontrada"
                ondeEncontrada: cat.onde || cat.ondeInstalar || null,
                // instalacao e importante viram parte da importancia (precos removidos)
                importancia: [cat.instalacao, cat.importante]
                    .filter(Boolean)
                    .join('\n\n'),
            },
        });
    };

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

    const titleStr = t('headersFirst.acessRiosDeSeguranA', 'Dispositivos de Proteção Doméstica');
    const capaSource = { uri: 'file:///C:/Users/User/Pictures/Imagens PAD/imagens_blog_pad/Acidentes.jpg' };

    return (
        <AppBackground>
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
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <NeoIcon name="ClipboardText" size={13} color={textMuted} style={{ marginRight: 6 }} />
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                {allCategories.length} acessórios • Toque para ver detalhes
                            </Text>
                        </View>
                    </FadeInView>

                    {allCategories.map((cat, idx) => (
                        <FadeInView key={cat.id} delay={150 + idx * 50}>
                            <TouchableOpacity
                                onPress={() => handlePress(cat)}
                                activeOpacity={0.8}
                                style={{ marginBottom: 16 }}
                            >
                                <View style={styles.guideCardOuter}>
                                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                        <View style={[styles.guideImageContainer, { backgroundColor: THEME_COLOR + '15' }]}>
                                            {(cat.imagem || cat.imagemUrl) ? (
                                                <ReviewImage
                                                    source={cat.imagem || (typeof cat.imagemUrl === 'string' ? { uri: cat.imagemUrl } : cat.imagemUrl)}
                                                    tint={THEME_COLOR}
                                                    accessibilityLabel={cat.titulo}
                                                />
                                            ) : (
                                                <NeoIcon name="ShieldTick" size={48} color={THEME_COLOR} variant="Bold" />
                                            )}
                                        </View>
                                        <View style={styles.guideContent}>
                                            <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={2}>{cat.titulo}</Text>
                                            <View style={{ flex: 1 }} />
                                            <Text style={[styles.guideDesc, { color: textBody }]} numberOfLines={3}>{cat.descricao || 'Toque para ver tipos e instalação.'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </FadeInView>
                    ))}

                    <View style={{ height: 140 }} />
                </View>
            </Animated.ScrollView>
            
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        alignItems: 'center',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerEmoji: {
        fontSize: 40,
        marginBottom: 6,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
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
        height: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 130,
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
        marginBottom: 6,
    },
    guideDesc: {
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 4,
    },
    priceText: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 2,
    },

});
