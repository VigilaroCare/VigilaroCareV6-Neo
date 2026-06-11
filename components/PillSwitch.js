/**
 * PillSwitch.js
 * Componente glassmorphism premium para o header da HomeScreen.
 * Encapsula o seletor de casa (com seta animada) e o card de perfil.
 *
 * Tactical Calm Design System — Epic Redesign 2026
 * 
 * Nota: Usa View com fundo translúcido em vez de BlurView para
 * máxima compatibilidade Android (BlurView tem rendering inconsistente).
 */

import React, { useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import NeoIcon from './NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import haptic from '../utils/Haptics';

/**
 * HousePill — Card seletor de residência ativa.
 * Segue o mesmo vocabulário visual do profileCardInner da Home:
 * fundo rgba(255,255,255,0.88), borderRadius 18, sem gradiente.
 *
 * @param {string}  label       - Nome da residência ativa
 * @param {boolean} isModalOpen - Controla rotação da seta
 * @param {function} onPress    - Callback ao pressionar
 */
export function HousePill({ label, isModalOpen = false, onPress }) {
    const arrowRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (onPress) {
            Animated.timing(arrowRotation, {
                toValue: isModalOpen ? 1 : 0,
                duration: 280,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start();
        }
    }, [isModalOpen, onPress]);

    const rotate = arrowRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const Container = onPress ? TouchableOpacity : View;

    // Feedback tátil leve ao trocar de residência (auditoria D5)
    const handlePress = onPress
        ? () => { haptic.tap(); onPress(); }
        : undefined;

    return (
        <Container
            onPress={handlePress}
            activeOpacity={0.8}
            style={styles.housePillOuter}
        >
            <View style={styles.housePillInner}>
                {/* Ícone de casa com dot de status */}
                <View style={styles.houseIconContainer}>
                    <View style={styles.houseIconBg}>
                        <NeoIcon name="Home2" size={16} color="#FFF" variant="Bold" />
                    </View>
                    <View style={styles.statusDot} />
                </View>

                {/* Sublabel + nome da residência */}
                <View style={styles.houseLabelGroup}>
                    <Text style={styles.houseSublabel} numberOfLines={1}>
                        Moradia ativa
                    </Text>
                    <Text style={styles.housePillLabel} numberOfLines={1}>
                        {label}
                    </Text>
                </View>

                {/* Seta animada — só exibe se for clicável/editável */}
                {onPress && (
                    <Animated.View style={[styles.arrowContainer, { transform: [{ rotate }] }]}>
                        <NeoIcon name="ArrowDown2" size={14} color="rgba(14, 59, 59, 0.58)" />
                    </Animated.View>
                )}
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    housePillOuter: {
        flex: 1,
        marginRight: 10,
        // alignSelf:center impede que o outer estique até a altura do card de
        // perfil vizinho (efeito de "card fantasma" visto antes — a sombra
        // desenhava no bounding esticado, mas o inner não preenchia tudo).
        alignSelf: 'center',
        width: '100%',
    },
    housePillInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 251, 244, 0.82)',
        // Moldura vitrificada: borda principal warm-gray sólida (não mais
        // translúcida que sumia no off-white), highlight branco top/left,
        // sombra warm bottom — efeito "moldura sólida com luz superior".
        borderWidth: 1,
        borderColor: 'rgba(14, 59, 59, 0.18)',
        borderTopColor: 'rgba(255, 255, 255, 1)',
        borderTopWidth: 1.5,
        borderLeftColor: 'rgba(255, 255, 255, 0.85)',
        borderLeftWidth: 1.2,
        borderBottomColor: 'rgba(14, 59, 59, 0.25)',
        borderBottomWidth: 1.2,
        // Sombra Apple-style: discreta, espalhada, neutra (sem tinge colorido).
        shadowColor: '#0E3B3B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.055,
        shadowRadius: 12,
        elevation: 2,
    },
    houseIconContainer: {
        marginRight: 10,
        position: 'relative',
    },
    houseIconBg: {
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: '#0E3B3B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusDot: {
        position: 'absolute',
        bottom: -1,
        right: -2,
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#2DD4BF',
        borderWidth: 2,
        borderColor: '#FFFBF4',
    },
    houseLabelGroup: {
        flex: 1,
    },
    houseSublabel: {
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(14, 59, 59, 0.58)',
        letterSpacing: 0,
        marginBottom: 1,
    },
    housePillLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0E3B3B',
        letterSpacing: 0,
    },
    arrowContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(14, 59, 59, 0.06)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
});

export default HousePill;
