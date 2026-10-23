import { View, Text, StyleSheet, Animated } from 'react-native';
import ReviewImage from './ReviewImage';
import { useThemeColors } from '../utils/ThemeContext';

/**
 * NeoHeroHeader
 *
 * Componente padronizado para "Headers com Imagem de Contexto" (Parallax).
 * Resolve inconsistências de altura e animação que afligiam telas com
 * implementações manuais espalhadas. Imagem sem gradiente/sombreamento —
 * mostra o contexto por si só; só o título fica sobreposto.
 *
 * @param {Animated.Value} scrollY - Obrigatório. O Animated.Value do ScrollView pai.
 * @param {any} source - Imagem (require) ou URI ({ uri: '...' }).
 * @param {string} title - Título principal exibido sobre a imagem.
 * @param {number} [height=260] - Altura base do Hero. Padrão unificado: 260px.
 * @param {number} [bleed=0] - Recuo lateral do scroll PAI que este hero precisa
 *   vencer para ir de ponta a ponta. O hero é `width: '100%'`; dentro de um
 *   `contentContainerStyle` com `paddingHorizontal`, esses 100% passam a ser da
 *   área JÁ recuada e a imagem aparece com faixas de fundo dos dois lados —
 *   foi o que aconteceu em RelatoriosScreenNeo (23/10/2026). Passe aqui o mesmo
 *   valor do `paddingHorizontal` do scroll; 0 quando o scroll não tem recuo.
 */
export default function NeoHeroHeader({
    scrollY,
    source,
    title,
    height = 260,
    bleed = 0,
}) {
    const themeColors = useThemeColors();

    // Calcula os transform factors baseados na altura informada
    const heroTransform = scrollY ? [
        {
            translateY: scrollY.interpolate({
                inputRange: [-height, 0, height],
                outputRange: [-height / 2, 0, height * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-height, 0],
                outputRange: [2, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ] : [];

    return (
        <Animated.View style={[
            styles.container,
            {
                height: height,
                backgroundColor: themeColors.neutral[800],
                transform: heroTransform,
                // Vence o recuo do scroll pai: sem isto o hero fica "quadrado"
                // no meio da tela, com faixa de fundo dos dois lados.
                marginHorizontal: bleed ? -bleed : 0,
            }
        ]}>
            <ReviewImage
                source={typeof source === 'number' ? source : { uri: source }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
            />

            <View style={styles.textContainer}>
                {!!title && (
                    <Text style={styles.title}>
                        {title}
                    </Text>
                )}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    textContainer: {
        position: 'absolute',
        bottom: 24,
        paddingHorizontal: 22,
        width: '100%',
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -0.8,
        lineHeight: 38,
        marginBottom: 8,
    },
});
