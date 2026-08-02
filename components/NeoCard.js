import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from '../utils/Theme';
import { useIsDark, useThemeColors } from '../utils/ThemeContext';

/**
 * NeoCard - Cartão Padrão do Sistema DS2026 (Tactical Calm) — theme-aware.
 *
 * ── FIM DO GLASSMORPHISM UNIFICADO (2026-08-01) ───────────────────────────
 * Até aqui, 'elevated' era alias de 'glass': os dois renderizavam vidro
 * jateado idêntico. Eram 181 cards no app inteiro sobre uma única superfície,
 * e a prop dava a impressão de escolher hierarquia sem escolher nada.
 *
 * A medição que motivou a mudança: 167 desses 181 estavam em listas, apoiados
 * no AppBackground — uma névoa quase plana (#EFF5F0 com accents a 6%).
 * Desfocar um fundo liso não produz efeito visual; produz custo de BlurView
 * no Android e impede que qualquer coisa recue. Se tudo flutua, nada se
 * destaca.
 *
 * Agora há três degraus reais:
 *   'elevated' → SÓLIDO. O padrão. Card de lista, de conteúdo, de formulário.
 *   'glass'    → VIDRO. Só quando há mesmo algo atrás que valha desfocar:
 *                sobre foto, sobre hero colorido, sobre mapa.
 *   'premium'  → VIDRO + specular + sombra da marca. Momentos raros.
 *
 * Regra prática: se o card está numa lista, é 'elevated'. Vidro é exceção.
 *
 * VARIANT 'premium' (DS2026 Premium Upgrade):
 * Mesmo glass + (a) specular highlight gradient interno top→bottom
 * (a "lambida de luz" do topo), (b) sombra colorida brand (Forest Deep)
 * — eleva o card de "vidro funcional" para "vidro de luxo". Uso parcimonioso:
 * destinado a hero cards (monitor da Home, CTAs primários, cards de destaque).
 *
 * Props:
 * - variant: 'elevated'|'glass' (vidro jateado), 'premium' (vidro luxo),
 *            'outline' (borda), 'flat' (cinza), 'primary'
 * - padding: number (default: md)
 * - onPress: function (se fornecido, torna-se tocável)
 */
export default function NeoCard({
    children,
    style,
    variant = 'elevated',
    padding,
    onPress,
    activeOpacity = 0.8
}) {
    const { Neo } = Theme;
    const isDark = useIsDark();
    const colors = useThemeColors();
    const spacing = padding !== undefined ? padding : Neo.spacing.md;

    // 'elevated' saiu daqui em 2026-08-01: passou a ser superfície sólida.
    // Vidro agora é escolha explícita, não o default silencioso.
    const isGlass = variant === 'glass' || variant === 'premium';
    const isPremium = variant === 'premium';

    const baseStyle = {
        padding: spacing,
        borderRadius: Neo.borderRadius.md,
        backgroundColor: isGlass ? 'transparent' : (isDark ? colors.neutral[200] : colors.neutral.white),
        overflow: isGlass ? 'hidden' : 'visible',
    };

    let variantStyle = {};

    switch (variant) {
        case 'elevated':
            // SÓLIDO — o degrau de baixo, e o mais usado. Superfície opaca com
            // hairline e sombra discreta; é o que permite ao vidro e ao premium
            // significarem alguma coisa acima dele.
            //
            // A sombra é a mesma "Apple-style" que o glass já usava: espalhada,
            // neutra, opacidade baixa. Sobre a névoa do AppBackground ela dá
            // separação sem virar caixa pesada.
            variantStyle = isDark ? {
                backgroundColor: colors.neutral[200],
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.10)',
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.22,
                shadowRadius: 10,
                elevation: 2,
            } : {
                backgroundColor: colors.neutral.white,
                borderWidth: 1,
                borderColor: 'rgba(120, 113, 108, 0.16)',
                shadowColor: '#1C1C1E',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 1,
            };
            break;
        case 'glass':
            // Moldura vitrificada — borda warm-gray SÓLIDA + highlight branco
            // top/left + sombra warm bottom + sombra Apple-style externa.
            // Sobre off-white, a borda translúcida sumia; agora opacity 0.22
            // dá um contorno definido sem perder a leveza.
            variantStyle = isDark ? {
                backgroundColor: 'rgba(28, 28, 30, 0.58)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.14)',
                borderTopColor: 'rgba(255, 255, 255, 0.22)',
                borderLeftColor: 'rgba(255, 255, 255, 0.18)',
                borderBottomColor: 'rgba(0, 0, 0, 0.32)',
                borderTopWidth: 1.5,
                borderLeftWidth: 1.2,
                borderBottomWidth: 1.2,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 12,
                elevation: 3,
            } : {
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
                borderWidth: 1,
                borderColor: 'rgba(120, 113, 108, 0.22)',     // warm-gray sólido
                borderTopColor: 'rgba(255, 255, 255, 1)',     // highlight brilho top
                borderLeftColor: 'rgba(255, 255, 255, 0.85)', // highlight brilho left
                borderBottomColor: 'rgba(82, 75, 68, 0.22)',  // sombra warm bottom mais escura
                borderTopWidth: 1.5,
                borderLeftWidth: 1.2,
                borderBottomWidth: 1.2,
                // Sombra Apple-style: discreta, espalhada, neutra (sem tinge).
                shadowColor: '#1C1C1E',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 14,
                elevation: 2,
            };
            break;
        case 'premium':
            // Moldura vitrificada + brand shadow sutil + specular interno.
            // Mais "presença" que glass mas sem virar caixa pesada.
            variantStyle = isDark ? {
                backgroundColor: 'rgba(28, 28, 30, 0.68)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.18)',
                borderTopColor: 'rgba(255, 255, 255, 0.32)',
                borderLeftColor: 'rgba(255, 255, 255, 0.22)',
                borderBottomColor: 'rgba(0, 0, 0, 0.42)',
                borderTopWidth: 1.8,
                borderLeftWidth: 1.4,
                borderBottomWidth: 1.4,
                shadowColor: Neo.colors.primary[700],
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.18,
                shadowRadius: 20,
                elevation: 5,
            } : {
                backgroundColor: 'rgba(255, 255, 255, 0.82)',
                borderWidth: 1,
                borderColor: 'rgba(120, 113, 108, 0.26)',     // warm-gray mais sólido
                borderTopColor: 'rgba(255, 255, 255, 1)',
                borderLeftColor: 'rgba(255, 255, 255, 0.92)',
                borderBottomColor: 'rgba(82, 75, 68, 0.28)',  // sombra warm bottom premium
                borderTopWidth: 1.8,
                borderLeftWidth: 1.4,
                borderBottomWidth: 1.4,
                // Sombra dupla: brand Forest sutil + neutra Apple-style.
                // RN só honra uma shadowColor por View; usamos a Forest aqui
                // (assinatura) e o BlurView interno + specular dão o efeito de
                // profundidade. Em Android elevation 4 = neutra cinza.
                shadowColor: Neo.colors.primary[700],
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 20,
                elevation: 4,
            };
            break;
        case 'outline':
            variantStyle = {
                borderWidth: 1,
                borderColor: colors.neutral[300],
                backgroundColor: 'transparent',
            };
            break;
        case 'flat':
            variantStyle = {
                backgroundColor: isDark ? 'rgba(44, 44, 46, 0.85)' : 'rgba(240, 242, 245, 0.8)',
                borderWidth: 0,
                elevation: 0,
            };
            break;
        case 'primary':
            variantStyle = {
                backgroundColor: colors.primary[500],
                elevation: 0,
            };
            break;
    }

    // Merge styles
    const flatStyle = StyleSheet.flatten([baseStyle, variantStyle, style]) || {};

    // Separate LAYOUT styles (for outer wrapper) from VISUAL styles (for inner content)
    const {
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical,
        flex, flexGrow, flexShrink, flexBasis, alignSelf,
        ...visualStyle
    } = flatStyle;

    const layoutStyle = {
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical,
        flex, flexGrow, flexShrink, flexBasis, alignSelf,
    };

    // Remove undefined keys
    Object.keys(layoutStyle).forEach(k => layoutStyle[k] === undefined && delete layoutStyle[k]);

    // Specular highlight overlay — só renderizado em variant="premium".
    // Posicionado absolute no topo do card, ocupando ~55% da altura,
    // com gradient branco semi-transparente top→transparent. pointerEvents="none"
    // garante que toques cheguem nos elementos internos (botões, etc).
    const specularGradient = isDark ? Neo.gradients.specularDark : Neo.gradients.specular;
    const SpecularOverlay = isPremium ? (
        <LinearGradient
            pointerEvents="none"
            colors={specularGradient.colors}
            locations={specularGradient.locations}
            start={specularGradient.start}
            end={specularGradient.end}
            style={StyleSheet.absoluteFillObject}
        />
    ) : null;

    // Glass rendering via BlurView (covers 'elevated', 'glass', and 'premium')
    if (isGlass) {
        if (onPress) {
            const blurStyle = [visualStyle];
            if (layoutStyle.height) {
                blurStyle.push({ height: '100%' });
            }

            return (
                <TouchableOpacity style={layoutStyle} onPress={onPress} activeOpacity={activeOpacity}>
                    <BlurView intensity={isPremium ? 35 : 28} tint={isDark ? 'dark' : 'light'} style={blurStyle}>
                        {SpecularOverlay}
                        {children}
                    </BlurView>
                </TouchableOpacity>
            );
        }

        return (
            <BlurView intensity={isPremium ? 35 : 28} tint={isDark ? 'dark' : 'light'} style={flatStyle}>
                {SpecularOverlay}
                {children}
            </BlurView>
        );
    }

    // Non-glass variants (outline, flat, primary)
    const finalStyle = [baseStyle, variantStyle, style];

    if (onPress) {
        return (
            <TouchableOpacity
                style={finalStyle}
                onPress={onPress}
                activeOpacity={activeOpacity}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View style={finalStyle}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({});
