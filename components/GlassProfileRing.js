/**
 * GlassProfileRing.js
 * Anel gradiente premium ao redor da foto/inicial do perfil.
 * Representa visualmente o "nível de proteção" (score) via cores.
 *
 * Tactical Calm Design System — Epic Redesign 2026
 */

import React, { useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DS as Neo } from '../utils/DesignSystem2026';

/**
 * @param {object}  profile        - Perfil atual { foto, nome }
 * @param {number}  score          - Score geral de proteção (0-100)
 * @param {boolean} imageError     - Se a imagem falhou ao carregar
 * @param {function} onImageError  - Callback quando a imagem falha
 * @param {function} resolveUri    - Função para resolver URI da imagem
 * @param {number}  size           - Diâmetro externo do anel (default: 46)
 * @param {number}  ringWidth      - Largura do anel gradiente (default: 3)
 */
export default function GlassProfileRing({
    profile,
    score = 0,
    imageError = false,
    onImageError,
    resolveUri,
    size = 46,
    ringWidth = 3,
}) {
    // Pulso sutil no anel
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (score <= 0) return;
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.08,
                    duration: 1800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [score]);

    // Gradiente dinâmico baseado no score
    const getGradientColors = () => {
        if (score >= 80) return ['#059669', '#10B981', '#0EA5E9', '#6366F1']; // Verde → Azul → Índigo
        if (score >= 50) return ['#F59E0B', '#FF9800', '#EF4444']; // Amarelo → Laranja → Vermelho
        if (score > 0)   return ['#EF4444', '#DC2626', '#F97316']; // Vermelho intenso
        return [Neo.colors.neutral[300], Neo.colors.neutral[400], Neo.colors.neutral[300]]; // Neutro
    };

    // Cor da sombra baseada no score
    const getShadowColor = () => {
        if (score >= 80) return '#10B981';
        if (score >= 50) return '#F59E0B';
        if (score > 0) return '#EF4444';
        return 'transparent';
    };

    const innerSize = size - (ringWidth * 2);
    const photoSize = innerSize - 4; // 2px de espaçamento branco interno
    // Quadrado arredondado (padrão DS para fotos de família) — ~30% da dimensão
    const outerRadius = Math.round(size * 0.30);
    const innerRadius = Math.round(innerSize * 0.30);
    const photoRadius = Math.round(photoSize * 0.30);

    return (
        <Animated.View style={{
            transform: [{ scale: pulseAnim }],
            // Sombra colorida glow
            shadowColor: getShadowColor(),
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: score > 0 ? 0.5 : 0,
            shadowRadius: 8,
            elevation: score > 0 ? 4 : 0,
        }}>
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.ring,
                    {
                        width: size,
                        height: size,
                        borderRadius: outerRadius,
                    },
                ]}
            >
                {/* Espaçador branco interno (cria o efeito "anel") */}
                <View
                    style={[
                        styles.innerCircle,
                        {
                            width: innerSize,
                            height: innerSize,
                            borderRadius: innerRadius,
                        },
                    ]}
                >
                    {/* Foto ou Inicial */}
                    <View
                        style={[
                            styles.photoContainer,
                            {
                                width: photoSize,
                                height: photoSize,
                                borderRadius: photoRadius,
                            },
                        ]}
                    >
                        {profile?.foto && !imageError ? (
                            <Image
                                source={{ uri: resolveUri ? resolveUri(profile.foto) : profile.foto }}
                                style={styles.photo}
                                onError={onImageError}
                            />
                        ) : (
                            <Text style={styles.initial}>
                                {profile?.nome?.charAt(0) || 'P'}
                            </Text>
                        )}
                    </View>
                </View>
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    ring: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        backgroundColor: Neo.colors.neutral.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoContainer: {
        backgroundColor: Neo.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    initial: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Neo.colors.primary[700],
    },
});
