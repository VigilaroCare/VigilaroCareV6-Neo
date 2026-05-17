import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import NeoIcon from '../../components/NeoIcon';
import { getConteudoPrevencao } from '../../data/knowledge_prevencao';
import { Shadows } from '../../utils/Theme';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = Math.round(width * 0.78);

/**
 * Hero estilizado para fallback ou ambientes sem foto adequada.
 * Mantém qualidade visual premium mesmo sem imagem externa:
 * - Gradient duotone na cor do ambiente
 * - Emoji em escala grande, centralizado
 * - Padrão decorativo sutil (círculos translúcidos) ao fundo
 */
function StyledHero({ cor, emoji }) {
    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: cor,
            overflow: 'hidden',
        }}>
            {/* Gradient duotone */}
            <LinearGradient
                colors={[cor, adjustColor(cor, -25)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
            />

            {/* Círculos decorativos */}
            <View style={{
                position: 'absolute',
                top: -60,
                right: -40,
                width: 220,
                height: 220,
                borderRadius: 110,
                backgroundColor: 'rgba(255,255,255,0.08)',
            }} />
            <View style={{
                position: 'absolute',
                bottom: -50,
                left: -30,
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: 'rgba(255,255,255,0.06)',
            }} />

            {/* Emoji centralizado */}
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 130,
                    textShadowColor: 'rgba(0,0,0,0.15)',
                    textShadowOffset: { width: 0, height: 4 },
                    textShadowRadius: 8,
                }}>{emoji}</Text>
            </View>
        </View>
    );
}

/**
 * Escurece/clareia uma cor hex em N%.
 * Usado para criar o segundo stop do gradient duotone.
 */
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

export default function EnvironmentGuideNeoScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { ambienteId } = route.params || { ambienteId: 'sala' };
    const guideData = useMemo(() => getConteudoPrevencao(ambienteId), [ambienteId]);

    // Suporta capa como string ou array de URLs (cascade fallback)
    const capaList = useMemo(() => {
        if (Array.isArray(guideData.capa)) return guideData.capa.filter(Boolean);
        if (typeof guideData.capa === 'string' && guideData.capa) return [guideData.capa];
        return [];
    }, [guideData.capa]);

    const [imgIndex, setImgIndex] = useState(0);
    const [allFailed, setAllFailed] = useState(false);

    const handleImgError = useCallback(() => {
        if (imgIndex < capaList.length - 1) {
            setImgIndex(imgIndex + 1);
        } else {
            setAllFailed(true);
        }
    }, [imgIndex, capaList.length]);

    const currentUrl = capaList[imgIndex];
    const showImage = !allFailed && !!currentUrl && !guideData.useStyledHero;

    const destaqueText = guideData.conteudo.find(c => c.tipo === 'destaque')?.texto;
    const topicos = guideData.conteudo.filter(c => c.tipo === 'topico');
    const dicas = guideData.conteudo.filter(c => c.tipo === 'dica');

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar style="light" translucent />

            {/* HERO */}
            <View style={{ width: '100%', height: HERO_HEIGHT, position: 'relative', backgroundColor: guideData.cor }}>
                {showImage ? (
                    <Image
                        // key força reload quando trocar de URL
                        key={`${guideData.id}-${imgIndex}`}
                        source={{ uri: currentUrl }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                        onError={handleImgError}
                    />
                ) : (
                    <StyledHero cor={guideData.cor} emoji={guideData.emoji} />
                )}

                {/* Gradient para legibilidade do título */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', '#FFFFFF']}
                    locations={[0, 0.35, 0.85, 1]}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />

                {/* Nav top */}
                <SafeAreaView edges={['top']} style={{ position: 'absolute', width: '100%' }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingTop: 8,
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                width: 40, height: 40, borderRadius: 20,
                                backgroundColor: 'rgba(0,0,0,0.45)',
                                alignItems: 'center', justifyContent: 'center',
                            }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <NeoIcon name="ArrowLeft2" size={22} color="#FFF" variant="Bold" />
                        </TouchableOpacity>

                        <View style={{
                            width: 40, height: 40, borderRadius: 20,
                            backgroundColor: 'rgba(0,0,0,0.45)',
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 20 }}>{guideData.emoji}</Text>
                        </View>
                    </View>
                </SafeAreaView>

                {/* Hero title */}
                <View style={{
                    position: 'absolute',
                    bottom: 24,
                    paddingHorizontal: 22,
                    width: '100%',
                }}>
                    <Text style={{
                        fontSize: 34,
                        fontWeight: '900',
                        color: '#111827',
                        letterSpacing: -0.8,
                        lineHeight: 38,
                    }}>
                        {guideData.nome}
                    </Text>
                </View>
            </View>

            {/* CONTENT */}
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 190 }}
                showsVerticalScrollIndicator={false}
            >
                {destaqueText && (
                    <Text style={{
                        fontSize: 16.5,
                        color: '#4B5563',
                        lineHeight: 25,
                        fontStyle: 'italic',
                        marginBottom: 26,
                        marginTop: 6,
                    }}>
                        "{destaqueText}"
                    </Text>
                )}

                {topicos.map((topico, idx) => (
                    <View key={idx} style={{ marginBottom: 26 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <View style={{
                                width: 6,
                                height: 22,
                                backgroundColor: guideData.cor,
                                borderRadius: 3,
                                marginRight: 12,
                            }} />
                            <Text style={{
                                fontSize: 18.5,
                                fontWeight: '800',
                                color: '#1F2937',
                                letterSpacing: -0.4,
                                flex: 1,
                                lineHeight: 24,
                            }}>
                                {topico.titulo}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 15,
                            color: '#4B5563',
                            lineHeight: 24,
                        }}>
                            {topico.texto}
                        </Text>
                    </View>
                ))}

                {dicas.length > 0 && (
                    <View style={{
                        marginTop: 12,
                        backgroundColor: '#F8FAFC',
                        borderRadius: 18,
                        padding: 18,
                        borderLeftWidth: 4,
                        borderLeftColor: '#3B82F6',
                        ...Shadows.sm,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <NeoIcon name="LampCharge" size={20} color="#3B82F6" variant="Bold" style={{ marginRight: 8 }} />
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '800',
                                color: '#1E293B',
                                letterSpacing: -0.2,
                            }}>
                                {t('headersFirst.goldenTip', 'Dica de ouro')}
                            </Text>
                        </View>

                        {dicas.map((dica, idx) => (
                            <Text key={idx} style={{
                                fontSize: 14.5,
                                color: '#475569',
                                lineHeight: 22,
                                marginBottom: idx < dicas.length - 1 ? 10 : 0,
                            }}>
                                {dica.texto}
                            </Text>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    onPress={() => navigation.navigate('ChecklistDetail', {
                        roomId: ambienteId,
                        roomName: guideData.nome,
                        roomColor: guideData.cor,
                        roomIcon: guideData.emoji,
                    })}
                    activeOpacity={0.85}
                    style={{
                        marginTop: 28,
                        backgroundColor: guideData.cor,
                        borderRadius: 16,
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Shadows.md,
                    }}
                >
                    <NeoIcon name="TickSquare" size={22} color="#FFF" variant="Bold" />
                    <Text style={{
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: '800',
                        marginLeft: 10,
                        letterSpacing: 0.1,
                    }}>
                        {t('headersFirst.auditThisEnvironment', 'Auditar este ambiente')}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
