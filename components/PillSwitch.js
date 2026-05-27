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
import { Home2, ArrowDown2 } from 'iconsax-react-native';
import { DS as Neo } from '../utils/DesignSystem2026';

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

    return (
        <Container
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.housePillOuter}
        >
            <View style={styles.housePillInner}>
                {/* Ícone de casa com dot de status */}
                <View style={styles.houseIconContainer}>
                    <View style={styles.houseIconBg}>
                        <Home2 size={16} color="#FFF" variant="Bold" />
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
                        <ArrowDown2 size={14} color={Neo.colors.neutral[500]} />
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
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        // Moldura vitrificada: borda principal warm-gray sólida (não mais
        // translúcida que sumia no off-white), highlight branco top/left,
        // sombra warm bottom — efeito "moldura sólida com luz superior".
        borderWidth: 1,
        borderColor: 'rgba(120, 113, 108, 0.22)',
        borderTopColor: 'rgba(255, 255, 255, 1)',
        borderTopWidth: 1.5,
        borderLeftColor: 'rgba(255, 255, 255, 0.85)',
        borderLeftWidth: 1.2,
        borderBottomColor: 'rgba(82, 75, 68, 0.20)',
        borderBottomWidth: 1.2,
        // Sombra Apple-style: discreta, espalhada, neutra (sem tinge colorido).
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    houseIconContainer: {
        marginRight: 10,
        position: 'relative',
    },
    houseIconBg: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: Neo.colors.primary[500],
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
        backgroundColor: '#34D399',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    houseLabelGroup: {
        flex: 1,
    },
    houseSublabel: {
        fontSize: 10,
        fontWeight: '600',
        color: Neo.colors.neutral[500],
        letterSpacing: 0.2,
        marginBottom: 1,
    },
    housePillLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        letterSpacing: -0.2,
    },
    arrowContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.04)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
});

export default HousePill;
