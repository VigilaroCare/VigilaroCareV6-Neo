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
import NeoIcon from './NeoIcon';
import ScoreService from '../services/ScoreService';

// Fallback para callers que só passam `score` (MinhaSaude, SaudePet):
// deriva o nível da banda CANÔNICA (getBanda 90/70/40) — sem os limiares
// 80/50 próprios que este componente tinha antes.
const BAND_TO_NIVEL = {
    maxima: 'protegido',
    controle: 'controle',
    atencao: 'atencao',
    critico: 'critico',
    inicio: 'inicio',
};

/**
 * Gradiente da MOLDURA por nível de proteção — gramática visual compartilhada
 * entre o anel do avatar e o chip de moradia ativa (HomeScreenNeo). 'atencao'
 * é âmbar puro: o vermelho misturado da versão anterior antecipava um alarme
 * que pertence só ao 'critico'.
 * Exportada como função (não const de módulo): Neo.colors lido em render,
 * nunca no escopo do módulo — padrão que já derrubou o app no Hermes.
 */
export function getNivelRingColors(nivelKey) {
    switch (nivelKey) {
        case 'protegido': return [Neo.colors.primary[700], Neo.colors.primary[500], Neo.colors.primary[300]];
        case 'controle':  return [Neo.colors.primary[500], Neo.colors.primary[300], Neo.colors.feedback.info];
        case 'atencao':   return [Neo.colors.feedback.warning, Neo.colors.accent.copper || Neo.colors.feedback.warning, Neo.colors.feedback.warning];
        case 'critico':   return [Neo.colors.feedback.error, Neo.colors.feedback.error, Neo.colors.accent.copper || Neo.colors.feedback.warning];
        default:          return [Neo.colors.neutral[300], Neo.colors.neutral[400], Neo.colors.neutral[300]];
    }
}

/**
 * @param {object}  profile        - Perfil atual { foto, nome }
 * @param {number}  score          - Score geral de proteção (0-100)
 * @param {object}  nivel          - Nível de ScoreService.getNivelProtecao();
 *                                   quando ausente, derivado do score via getBanda
 * @param {boolean} showBadge      - Exibe o selo com ícone do nível (WCAG: o
 *                                   estado nunca pode ser só cor). Opt-in para
 *                                   não mudar telas que usam o anel decorativo.
 * @param {boolean} imageError     - Se a imagem falhou ao carregar
 * @param {function} onImageError  - Callback quando a imagem falha
 * @param {function} resolveUri    - Função para resolver URI da imagem
 * @param {number}  size           - Diâmetro externo do anel (default: 46)
 * @param {number}  ringWidth      - Largura do anel gradiente (default: 3)
 */
export default function GlassProfileRing({
    profile,
    score = 0,
    nivel = null,
    showBadge = false,
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

    const nivelKey = nivel?.key || BAND_TO_NIVEL[ScoreService.getBanda(score).key] || 'inicio';
    const getGradientColors = () => getNivelRingColors(nivelKey);

    const getShadowColor = () => {
        switch (nivelKey) {
            case 'protegido':
            case 'controle':  return Neo.colors.primary[500];
            case 'atencao':   return Neo.colors.feedback.warning;
            case 'critico':   return Neo.colors.feedback.error;
            default:          return 'transparent';
        }
    };

    // Selo do nível — preenchimento sólido + ícone branco.
    const BADGE_BY_NIVEL = {
        protegido: { icon: 'ShieldTick',     bg: Neo.colors.feedback.success },
        controle:  { icon: 'TickCircle',     bg: Neo.colors.primary[500] },
        atencao:   { icon: 'Warning2',       bg: Neo.colors.feedback.warning },
        critico:   { icon: 'WarningOctagon', bg: Neo.colors.feedback.error },
        inicio:    { icon: 'InfoCircle',     bg: Neo.colors.neutral[400] },
    };
    // O ícone do serviço (fonte única) tem precedência; o mapa local cobre o
    // caminho de fallback por score.
    const badge = BADGE_BY_NIVEL[nivelKey]
        ? { ...BADGE_BY_NIVEL[nivelKey], icon: nivel?.icon || BADGE_BY_NIVEL[nivelKey].icon }
        : null;
    const badgeSize = Math.max(16, Math.round(size * 0.34));

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
                                source={typeof (resolveUri ? resolveUri(profile.foto) : profile.foto) === 'number' ? (resolveUri ? resolveUri(profile.foto) : profile.foto) : { uri: resolveUri ? resolveUri(profile.foto) : profile.foto }}
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

            {showBadge && badge && (
                <View
                    style={[
                        styles.badge,
                        {
                            width: badgeSize,
                            height: badgeSize,
                            borderRadius: badgeSize / 2,
                            backgroundColor: badge.bg,
                        },
                    ]}
                    pointerEvents="none"
                >
                    <NeoIcon
                        name={badge.icon}
                        size={Math.round(badgeSize * 0.62)}
                        color={Neo.colors.neutral.white}
                        variant="Bold"
                    />
                </View>
            )}
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
    badge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: Neo.colors.neutral.white,
    },
});
