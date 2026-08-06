import React, { useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { H1, H3, Body, Small } from '../../components/NeoTypography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import ReviewImage from '../../components/ReviewImage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { Shadows } from '../../utils/Theme';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = Math.round(width * 0.78);

/**
 * Hero fallback estilizado (igual ao EnvironmentGuideNeoScreen)
 */
function StyledHero({ cor, emoji, icon }) {
    return (
        <View style={{
            width: '100%', height: '100%', backgroundColor: cor, overflow: 'hidden',
        }}>
            <LinearGradient
                colors={[cor, adjustColor(cor, -25)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <View style={s.decorCircle1} />
            <View style={s.decorCircle2} />
            <View style={s.emojiWrap}>
                {emoji ? (
                    <Text style={s.emojiLarge}>{emoji}</Text>
                ) : icon ? (
                    <NeoIcon name={icon} size={110} color={Neo.colors.neutral.white} variant="Bold" />
                ) : (
                    <NeoIcon name="Book" size={110} color={Neo.colors.neutral.white} variant="Bold" />
                )}
            </View>
        </View>
    );
}

function adjustColor(hex, percent) {
    if (!hex || hex[0] !== '#') return hex;
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00FF) + percent;
    let b = (num & 0x0000FF) + percent;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/**
 * PremiumArticleScreen
 * Tela de destino "Gold Standard" unificada para a leitura de Guias.
 * Substitui o antigo ConceitoDetailScreen (que era um popup/modal).
 * 
 * Params esperados:
 * - conceito: { titulo, definicao/conteudo, imagemUrl, emoji, icon, color, prevencao, exemplos, tags }
 */
export default function PremiumArticleScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { conceito } = route.params || {};
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const surface = isDark ? themeColors.neutral[100] : themeColors.neutral.white;
    
    const scrollY = useRef(new Animated.Value(0)).current;

    if (!conceito) return null;

    const title = conceito.titulo || conceito.title;
    const content = conceito.definicao || conceito.conteudo || conceito.descricao || conceito.description;
    const cor = conceito.color || Neo.colors.secondary[500];

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button (fixo no topo da tela) */}
            <SafeAreaView edges={['top']} style={s.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={s.backBtn}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: cor,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    {conceito.imagemUrl ? (
                        <ReviewImage
                            source={typeof conceito.imagemUrl === 'string' ? (typeof conceito.imagemUrl === 'string' ? { uri: conceito.imagemUrl } : conceito.imagemUrl) : conceito.imagemUrl}
                            style={StyleSheet.absoluteFill}
                            resizeMode="cover"
                        />
                    ) : (
                        <StyledHero cor={cor} emoji={conceito.emoji} icon={conceito.icon} />
                    )}

                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <H1 style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: isDark ? themeColors.neutral.white : themeColors.neutral[900],
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </H1>
                        
                        {conceito.tags && conceito.tags.length > 0 && (
                            <View style={[s.tagsRow, { marginTop: 12 }]}>
                                {conceito.tags.map(tag => (
                                    <View key={tag} style={[s.tagBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.25)' }]}>
                                        <Small style={[s.tagText, { color: Neo.colors.neutral.white }]}>#{tag}</Small>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[s.bodyContent, { marginTop: 20 }]}>

                    {/* Main Content */}
                    <View style={s.bodyContent}>
                        {content ? (
                            <Body style={[s.bodyText, { color: textBody }]}>{content}</Body>
                        ) : null}

                        {conceito.exemplos && conceito.exemplos.length > 0 && (
                            <View style={[s.cardSessao, { backgroundColor: isDark ? '#1C1C1E' : themeColors.neutral[100] }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="Star" size={20} color={cor} variant="Bold" style={{ marginRight: 8 }} />
                                    <H3 style={[s.sessaoTitulo, { color: textPrimary }]}>{t('common.examples', 'Exemplos')}</H3>
                                </View>
                                {conceito.exemplos.map((ex, i) => (
                                    <View key={i} style={s.listItem}>
                                        <View style={[s.bullet, { backgroundColor: cor }]} />
                                        <Body style={[s.listText, { color: textBody }]}>{ex}</Body>
                                    </View>
                                ))}
                            </View>
                        )}

                        {conceito.prevencao && conceito.prevencao.length > 0 && (
                            <View style={[s.cardSessao, { backgroundColor: isDark ? '#1C1C1E' : themeColors.neutral[100], marginTop: 16 }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="ShieldTick" size={20} color={Neo.colors.primary[500]} variant="Bold" style={{ marginRight: 8 }} />
                                    <H3 style={[s.sessaoTitulo, { color: textPrimary }]}>{t('common.prevention', 'Prevenção')}</H3>
                                </View>
                                {conceito.prevencao.map((prev, i) => (
                                    <View key={i} style={s.listItem}>
                                        <View style={[s.bullet, { backgroundColor: Neo.colors.primary[500] }]} />
                                        <Body style={[s.listText, { color: textBody }]}>{prev}</Body>
                                    </View>
                                ))}
                            </View>
                        )}
                        {conceito.passos && conceito.passos.length > 0 && (
                            <View style={[s.cardSessao, { backgroundColor: isDark ? '#1C1C1E' : cor + '10', marginBottom: 16 }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="Lovely" size={20} color={cor} variant="Bold" style={{ marginRight: 8 }} />
                                    <H3 style={[s.sessaoTitulo, { color: cor }]}>{t('headersFirst.cOMOAGIR', 'COMO AGIR')}</H3>
                                </View>
                                {conceito.passos.map((step, i) => (
                                    <View key={i} style={[s.listItem, { marginBottom: 16 }]}>
                                        <Body style={{ fontSize: 16, fontWeight: '800', color: step.critico ? Neo.colors.feedback.error : cor, marginRight: 10, marginTop: 2 }}>{i + 1}.</Body>
                                        <View style={{ flex: 1 }}>
                                            <Body style={{ fontSize: 16, fontWeight: '700', color: textPrimary }}>{step.titulo}</Body>
                                            <Body style={{ fontSize: 15, color: textBody, marginTop: 4, lineHeight: 22 }}>{step.descricao}</Body>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        {conceito.alertaVeterinario && (
                            <View style={[s.cardSessao, { backgroundColor: '#FEF2F2' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="Warning2" size={20} color={Neo.colors.feedback.error} variant="Bold" style={{ marginRight: 8 }} />
                                    <H3 style={[s.sessaoTitulo, { color: Neo.colors.feedback.error }]}>{t('headersFirst.aTENOVETERINRIA', 'ATENÇÃO VETERINÁRIA')}</H3>
                                </View>
                                <Body style={{ color: Neo.colors.feedback.error, fontSize: 15, lineHeight: 22 }}>{conceito.alertaVeterinario}</Body>
                            </View>
                        )}

                        {conceito.sinaisCriticos && (Array.isArray(conceito.sinaisCriticos) ? conceito.sinaisCriticos.length > 0 : true) && (
                            <View style={[s.cardSessao, { backgroundColor: '#FFFBEB' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="Health" size={20} color={Neo.colors.accent.champagne} variant="Bold" style={{ marginRight: 8 }} />
                                    <H3 style={[s.sessaoTitulo, { color: Neo.colors.accent.copper }]}>{t('headersFirst.sINAISDEALERTA', 'SINAIS DE ALERTA')}</H3>
                                </View>
                                {Array.isArray(conceito.sinaisCriticos) ? conceito.sinaisCriticos.map((sinal, i) => (
                                    <View key={i} style={s.listItem}>
                                        <View style={[s.bullet, { backgroundColor: Neo.colors.accent.champagne }]} />
                                        <Body style={[s.listText, { color: Neo.colors.accent.copper }]}>{sinal}</Body>
                                    </View>
                                )) : (
                                    <View style={s.listItem}>
                                        <View style={[s.bullet, { backgroundColor: Neo.colors.accent.champagne }]} />
                                        <Body style={[s.listText, { color: Neo.colors.accent.copper }]}>{conceito.sinaisCriticos}</Body>
                                    </View>
                                )}
                            </View>
                        )}

                        {conceito.naoFazer && (Array.isArray(conceito.naoFazer) ? conceito.naoFazer.length > 0 : true) && (
                            <View style={[s.cardSessao, { backgroundColor: '#FEF2F2' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <NeoIcon name="CloseCircle" size={20} color={Neo.colors.feedback.error} variant="Bold" style={{ marginRight: 8 }} />
                                    <H3 style={[s.sessaoTitulo, { color: Neo.colors.feedback.error }]}>{t('headersFirst.oQUENAOFAZER', 'O QUE NÃO FAZER')}</H3>
                                </View>
                                {Array.isArray(conceito.naoFazer) ? conceito.naoFazer.map((item, i) => (
                                    <View key={i} style={s.listItem}>
                                        <NeoIcon name="CloseSquare" size={16} color={Neo.colors.feedback.error} style={{ marginTop: 4, marginRight: 8 }} />
                                        <Body style={[s.listText, { color: Neo.colors.feedback.error }]}>{item}</Body>
                                    </View>
                                )) : (
                                    <View style={s.listItem}>
                                        <NeoIcon name="CloseSquare" size={16} color={Neo.colors.feedback.error} style={{ marginTop: 4, marginRight: 8 }} />
                                        <Body style={[s.listText, { color: Neo.colors.feedback.error }]}>{conceito.naoFazer}</Body>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1 },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtn: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tagBadge: {
        paddingHorizontal: 12, paddingVertical: 6,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 12, fontWeight: '700',
    },
    bodyContent: {
        paddingHorizontal: 24,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    cardSessao: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    sessaoTitulo: {
        fontSize: 18,
        fontWeight: '700',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bullet: {
        width: 6, height: 6, borderRadius: 3,
        marginTop: 8, marginRight: 10,
    },
    listText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
    },
    decorCircle1: {
        position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.08)',
    },
    decorCircle2: {
        position: 'absolute', bottom: -50, left: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.06)',
    },
    emojiWrap: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    emojiLarge: {
        fontSize: 130, textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 8,
    },
});
