/**
 * DesignSystem2026.js
 * Sistema de Design "Neo-Vigilaro" — Tactical Calm
 * Foco: Acessibilidade, Calma Protetora, Identidade Tipográfica Premium.
 *
 * Fonte display: Plus Jakarta Sans (headings, botões)
 * Fonte body: System (iOS SF Pro, Android Roboto) — performance nativa
 */

import { Platform } from 'react-native';

// Nomes das fontes carregadas via expo-font (ver App.js)
export const FONTS = {
    display: {
        regular: 'PlusJakartaSans_400Regular',
        medium: 'PlusJakartaSans_500Medium',
        semiBold: 'PlusJakartaSans_600SemiBold',
        bold: 'PlusJakartaSans_700Bold',
        extraBold: 'PlusJakartaSans_800ExtraBold',
    },
    body: {
        regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    // Flag para saber se a fonte custom foi carregada
    loaded: false,
};

/**
 * Marca as fontes como carregadas (chamado pelo App.js após useFonts).
 */
export function setFontsLoaded() {
    FONTS.loaded = true;
}

/**
 * Retorna a font family correta, com fallback se a custom não carregou.
 */
export function displayFont(weight = 'bold') {
    if (!FONTS.loaded) return undefined; // Usa system default
    return FONTS.display[weight] || FONTS.display.bold;
}

export function bodyFont() {
    return undefined; // System default — sempre performante
}

// Paleta Light (default) — espelhada na DarkColors abaixo
// Escala Tailwind emerald + extensões para callsites legados.
const LightColors = {
    primary: {
        900: '#064E3B', // Forest Green muito profundo (StatusBar dark, gradiente top)
        800: '#065F46', // Deep — títulos em fundo claro, accent em cards
        700: '#047857', // Forest Green (Deep/Premium)
        600: '#059669', // Hover/Active
        500: '#10B981', // Emerald Green (Vibrante, Saudável, Premium)
        300: '#34D399',
        200: '#A7F3D0', // Tint suave (borders, fundos de chips)
        100: '#D1FAE5', // Tint leve para fundos ativos
        50:  '#ECFDF5', // Tint extra-leve (alias retrocompatível)
        main: '#10B981',
    },
    secondary: {
        500: '#0EA5E9', // Sky Blue (Calmante)
        100: '#E0F2FE',
        main: '#0EA5E9',
    },
    feedback: {
        success: '#34C759', // Padrão exato iOS System Green
        error: '#FF3B30',   // Padrão exato iOS System Red (SOS)
        warning: '#FFCC00', // Padrão exato iOS System Yellow
        info: '#5AC8FA',    // Padrão exato iOS System Teal/Blue
    },
    // Aliases retrocompatíveis usados em ~16 telas
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FFCC00',
    info: '#5AC8FA',
    surface: '#FFFFFF',
    neutral: {
        900: '#16241D', // ink (Forest charcoal)
        800: '#38473F', // body (Dark forest slate)
        700: '#566159', // muted (Subtitles/captions)
        600: '#566159', // muted (Subtitles/captions)
        500: '#7C8A80', // faint (Non-text/icons/borders only)
        400: '#C7C7CC', // Bordas médias
        300: '#E5E5EA', // iOS Gray 5 (Divisores e bordas leves)
        200: '#F2F2F7', // iOS Gray 6 (Fundo de seções/cards internos)
        100: '#F9FAFB', // Fundo principal da tela (Off-white)
        50:  '#FAFAFA', // Fundo levíssimo (inputs, hover, divisor extra-leve)
        white: '#FFFFFF',
        black: '#000000',
    },
    // Utilitários exatos para efeitios "Glass"
    glass: {
        light: 'rgba(255, 255, 255, 0.75)',
        border: 'rgba(255, 255, 255, 0.4)',
        dark: 'rgba(28, 28, 30, 0.65)',
    },
    // Mist premium 2026 — verde pastel suave (sage/mint).
    // Aprovado via mockup Claude Design: fundo verde saúde premium,
    // complementa pictogramas cerâmicos e cards glass sem criar "sopa".
    // Tons: #EFF5F0 (sage claro) → #E8F0EA (sage médio) → #EFF5F0.
    mist: {
        gradient: ['#EFF5F0', '#EBF2ED', '#E5EDE7', '#E8F0EA', '#EDF4EF', '#F2F7F3'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(4, 120, 87, 0.06)',       // Forest Deep sutil (reforçado p/ harmonizar)
        accentStrong: 'rgba(4, 120, 87, 0.04)', // Forest secundário (substituiu champagne)
        fallback: '#EFF5F0',
    },
    // Accent "signature" — champagne / cobre para momentos premium pontuais
    // (badges raros, score 100%, highlights de luxo). Uso parcimonioso.
    accent: {
        champagne: '#A16207',       // Cobre/champagne escuro — texto/ícone em fundo claro
        champagneLight: '#D4A055',  // Tom médio para gradientes
        champagneSubtle: '#FEF3C7', // Fundo levíssimo para chips/badges premium
        copper: '#B45309',          // Variante mais quente
    },
    // Paleta do grid principal (Home, menus) — substitui as cores Material
    // hardcoded (#9C27B0, #E91E63, #2196F3, #FF9800) por uma escala coerente
    // ao DS, dessaturada (Tailwind 600-700, não 500).
    gridAccents: {
        saude:     { color: '#0F766E', bg: 'rgba(15, 118, 110, 0.10)' },  // Teal-700
        pets:      { color: '#BE185D', bg: 'rgba(190, 24, 93, 0.10)' },   // Rose-700 (rebaixado)
        vistorias: { color: '#0369A1', bg: 'rgba(3, 105, 161, 0.10)' },   // Sky-700
        eventuais: { color: '#B45309', bg: 'rgba(180, 83, 9, 0.10)' },    // Amber-700
    },
};

// Paleta Dark — invertida no neutral, brand verde mantida, cores semânticas
// ajustadas para os valores iOS Dark Mode oficiais (mais saturadas).
const DarkColors = {
    primary: {
        // Em dark o brand verde mantém o tom; tokens "altos" ficam MAIS claros
        // para contraste sobre fundo escuro (escala invertida vs. light).
        900: '#A7F3D0',   // muito claro p/ títulos accent em dark
        800: '#6EE7B7',   // claro
        700: '#34D399',   // mais clara em dark p/ contraste em hover
        600: '#10B981',   // brand stays
        500: '#10B981',   // brand stays — identidade visual
        300: '#6EE7B7',
        200: '#065F46',   // tint dark (mais escuro, fundo de chip ativo)
        100: '#064E3B',   // tint dark (invertido — fundo de elemento ativo)
        50:  '#022C22',
        main: '#10B981',
    },
    secondary: {
        500: '#38BDF8',   // sky lighter para dark
        100: '#082F49',   // tint dark
        main: '#38BDF8',
    },
    feedback: {
        success: '#30D158', // iOS Dark Mode System Green
        error: '#FF453A',   // iOS Dark Mode System Red
        warning: '#FFD60A', // iOS Dark Mode System Yellow
        info: '#64D2FF',    // iOS Dark Mode System Teal
    },
    success: '#30D158',
    error: '#FF453A',
    warning: '#FFD60A',
    info: '#64D2FF',
    surface: '#1C1C1E',   // dark surface base
    neutral: {
        900: '#F2F2F7',   // texto principal (invertido) — alta luminância
        800: '#E5E5EA',   // texto secundário
        700: '#C7C7CC',
        600: '#AEAEB2',   // intermediário entre 700 e 500 (espelha o 600 do light)
        500: '#8E8E93',   // gray médio — usado em ambos
        400: '#48484A',
        300: '#3A3A3C',   // bordas/divisores em dark
        200: '#2C2C2E',   // fundo de seções/cards
        100: '#1C1C1E',   // fundo principal da tela (off-black)
        50:  '#0F0F11',   // fundo extra-escuro (inputs sobre o 100)
        white: '#FFFFFF', // semantic — texto branco continua branco
        black: '#000000', // semantic — preto continua preto
    },
    // Glass para dark mode — borda sutil e superfície escura translúcida
    glass: {
        light: 'rgba(255, 255, 255, 0.08)',   // overlay claro em dark = sutil
        border: 'rgba(255, 255, 255, 0.12)',
        dark: 'rgba(28, 28, 30, 0.78)',
    },
    // Mist dark premium — charcoal neutro com leve undertone quente.
    // Removido o tom esverdeado (que pesava em camadas).
    mist: {
        gradient: ['#15141A', '#1A1820', '#1E1C24', '#1A1820', '#15141A', '#100F14'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(16, 185, 129, 0.05)',
        accentStrong: 'rgba(212, 160, 85, 0.06)', // Champagne sutil no dark
        fallback: '#15141A',
    },
    // Accent "signature" no dark — champagne mais claro para legibilidade
    accent: {
        champagne: '#D4A055',       // Tom médio (mais claro no dark)
        champagneLight: '#E5C28A',
        champagneSubtle: 'rgba(212, 160, 85, 0.12)',
        copper: '#E08B4D',
    },
    // Grid no dark — mesmas hues mas com luminância elevada para contraste
    // em fundo escuro (Tailwind 400-500 ao invés de 700)
    gridAccents: {
        saude:     { color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.14)' },  // Teal-400
        pets:      { color: '#F472B6', bg: 'rgba(244, 114, 182, 0.14)' }, // Pink-400
        vistorias: { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.14)' },  // Sky-400
        eventuais: { color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.14)' },  // Amber-400
    },
};

const HighContrastLightColors = {
    primary: {
        900: '#022C22',
        800: '#044E35', // Deep dark green for text/borders (contrast > 7:1)
        700: '#045E40',
        600: '#047857',
        500: '#057A55',
        300: '#34D399',
        200: '#A7F3D0',
        100: '#D1FAE5',
        50:  '#ECFDF5',
        main: '#044E35',
    },
    secondary: {
        500: '#025D8C', // High contrast blue (contrast > 7:1)
        100: '#E0F2FE',
        main: '#025D8C',
    },
    feedback: {
        success: '#006E22', // High contrast green
        error: '#BA1A1A',   // High contrast red
        warning: '#805000', // High contrast warning (brownish gold)
        info: '#005D90',    // High contrast info
    },
    success: '#006E22',
    error: '#BA1A1A',
    warning: '#805000',
    info: '#005D90',
    surface: '#FFFFFF',
    neutral: {
        900: '#000000', // Pure black text
        800: '#000000', // Pure black body text
        700: '#1F2421', // Very dark slate for subtitles
        600: '#1F2421', // Very dark slate
        500: '#4B534E', // High contrast icons/borders
        400: '#7A847F',
        300: '#000000', // Solid black borders in high contrast
        200: '#F2F2F7',
        100: '#FFFFFF', // Pure white background
        50:  '#FAFAFA',
        white: '#FFFFFF',
        black: '#000000',
    },
    glass: {
        light: '#FFFFFF', // Flat white, no transparency to preserve contrast
        border: '#000000', // Solid black border
        dark: '#000000',
    },
    mist: {
        gradient: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'], // No gradient
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(0, 0, 0, 0.08)',
        accentStrong: 'rgba(0, 0, 0, 0.12)',
        fallback: '#FFFFFF',
    },
    accent: {
        champagne: '#78350F', // Very dark copper/gold
        champagneLight: '#A16207',
        champagneSubtle: '#FEF3C7',
        copper: '#9A3412',
    },
    gridAccents: {
        saude:     { color: '#0F766E', bg: 'rgba(15, 118, 110, 0.14)' },
        pets:      { color: '#BE185D', bg: 'rgba(190, 24, 93, 0.14)' },
        vistorias: { color: '#0369A1', bg: 'rgba(3, 105, 161, 0.14)' },
        eventuais: { color: '#B45309', bg: 'rgba(180, 83, 9, 0.14)' },
    },
};

const HighContrastDarkColors = {
    primary: {
        900: '#ECFDF5',
        800: '#D1FAE5',
        700: '#A7F3D0',
        600: '#6EE7B7',
        500: '#34D399', // Bright emerald for high contrast on black
        300: '#A7F3D0',
        200: '#065F46',
        100: '#064E3B',
        50:  '#022C22',
        main: '#34D399',
    },
    secondary: {
        500: '#38BDF8', // Bright sky blue
        100: '#082F49',
        main: '#38BDF8',
    },
    feedback: {
        success: '#30D158',
        error: '#FF453A',
        warning: '#FFD60A',
        info: '#64D2FF',
    },
    success: '#30D158',
    error: '#FF453A',
    warning: '#FFD60A',
    info: '#64D2FF',
    surface: '#000000',
    neutral: {
        900: '#FFFFFF', // Pure white text
        800: '#FFFFFF', // Pure white body text
        700: '#E5E5EA',
        600: '#D1D1D6',
        500: '#AEAEB2',
        400: '#48484A',
        300: '#FFFFFF', // Solid white borders in high contrast dark
        200: '#1C1C1E',
        100: '#000000', // Pure black background
        50:  '#000000',
        white: '#FFFFFF',
        black: '#000000',
    },
    glass: {
        light: '#000000', // Flat black
        border: '#FFFFFF', // Solid white border
        dark: '#000000',
    },
    mist: {
        gradient: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(255, 255, 255, 0.12)',
        accentStrong: 'rgba(255, 255, 255, 0.18)',
        fallback: '#000000',
    },
    accent: {
        champagne: '#FCD34D',
        champagneLight: '#FBBF24',
        champagneSubtle: 'rgba(252, 211, 77, 0.18)',
        copper: '#FB923C',
    },
    gridAccents: {
        saude:     { color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.18)' },
        pets:      { color: '#F472B6', bg: 'rgba(244, 114, 182, 0.18)' },
        vistorias: { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.18)' },
        eventuais: { color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.18)' },
    },
};

export const DS = {
    // 1. Paleta de Cores (Premium & Apple-like) — LIGHT (default)
    colors: LightColors,

    // 2. Tipografia (Plus Jakarta Sans display + System body)
    type: {
        // Hero — momentos "wow" da Home (score grande, números de impacto)
        display: { fontSize: 48, fontWeight: '800', lineHeight: 52, color: '#1C1C1E', letterSpacing: -1.2, _display: true },

        h1: { fontSize: 34, fontWeight: '800', lineHeight: 41, color: '#1C1C1E', letterSpacing: -0.6, _display: true }, // Display font
        h2: { fontSize: 28, fontWeight: '700', lineHeight: 34, color: '#1C1C1E', letterSpacing: -0.4, _display: true }, // Display font
        h3: { fontSize: 22, fontWeight: '700', lineHeight: 28, color: '#1C1C1E', letterSpacing: -0.2, _display: true }, // Display font

        body: { fontSize: 17, fontWeight: '400', lineHeight: 24, color: '#3A3A3C', letterSpacing: -0.1 }, // System font
        bodySmall: { fontSize: 15, fontWeight: '400', lineHeight: 20, color: '#3A3A3C', letterSpacing: -0.1 }, // System font
        caption: { fontSize: 13, fontWeight: '500', lineHeight: 18, color: '#8E8E93', letterSpacing: 0.1 }, // System font

        // Eyebrow — labels de seção premium. Substitui o "sectionLabel" inline da Home
        // (fontSize 11, fontWeight 900, uppercase opacity 0.9 — visual de planilha).
        // Premium = peso médio (600), tracking generoso, cor secundária.
        eyebrow: { fontSize: 11, fontWeight: '600', lineHeight: 14, color: '#787880', letterSpacing: 1.4, textTransform: 'uppercase', _display: true },

        button: { fontSize: 17, fontWeight: '600', letterSpacing: 0, textTransform: 'none', _display: true } // Display font
    },

    // 3. Espaçamento (Escala de 8dp)
    spacing: {
        xs: 4,
        sm: 8,
        md: 16, 
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    // 4. Bordas e Formas (Continuous Curve / Squircle)
    borderRadius: {
        sm: 10,
        md: 20, // Padrão Apple para grandes cards
        lg: 24,
        pill: 9999,
        full: 9999,
    },
    radius: {
        sm: 10,
        md: 20,
        lg: 24,
        pill: 9999,
        full: 9999,
    },
    // Alias retrocompatível (algumas telas usam Neo.radii)
    radii: {
        sm: 10,
        md: 20,
        lg: 24,
        pill: 9999,
        full: 9999,
    },

    // 5. Sombras Híbridas (Apple Diffusion + Android Elevation)
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: Platform.OS === 'android' ? 2 : 0,
            // Para Android plano, evitamos a caixa cinza forte, mas damos leve volume
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: Platform.OS === 'android' ? 5 : 0,
        },
        floating: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.12,
            shadowRadius: 30,
            elevation: Platform.OS === 'android' ? 8 : 0,
        },
        none: {
            shadowColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
        },
        premium4K: {
            shadowColor: '#10B981', // Sombra colorida gera o efeito "Neon Blur" luxuoso do iOS
            shadowOffset: { width: 0, height: 16 },
            shadowOpacity: 0.25,
            shadowRadius: 36,
            elevation: Platform.OS === 'android' ? 12 : 0,
        },
        // Premium "duotone" — sombra colorida brand + sombra neutra ampla.
        // Em RN nativo só uma shadowColor é honrada; aqui usamos a colorida
        // (mais característica) e deixamos a neutra para a borda inferior do card
        // via View interna (ver NeoCard variant="premium").
        premium: {
            shadowColor: '#047857', // Forest Deep — assinatura sutil
            shadowOffset: { width: 0, height: 14 },
            shadowOpacity: 0.10,
            shadowRadius: 28,
            elevation: Platform.OS === 'android' ? 10 : 0,
        },
        // Second pass — usada como View overlay para complementar a sombra do premium
        premiumNeutral: {
            shadowColor: '#1C1C1E',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: Platform.OS === 'android' ? 2 : 0,
        },
    },

    // 6. Layout — constantes de anatomia de página (PADRAO_ANATOMIA_PAGINAS.md)
    // Fim dos paddings mágicos por tela: todo scroll usa estes tokens.
    layout: {
        screenHPadding: 24,      // = spacing.lg — padding horizontal de todo scroll
        scrollBottomFooter: 190, // folga única p/ footer flutuante + respiro
        scrollBottomBare: 40,    // telas sem footer (modais, wizards)
        headerMinHeight: 56,
    },

    // 7. Tokens de Emergência — vermelho-pânico INTENCIONAL das telas de SOS
    // (SOSCountdown, SOSEmergencyMode, EmergenciaRapida). Centralizados aqui
    // para as 3 telas usarem a mesma assinatura visual (auditoria D6).
    // Não usar fora de contexto de emergência — o contraste agressivo é
    // proposital e quebraria o "Tactical Calm" do restante do app.
    emergency: {
        panic: '#DC2626',                    // Fundo da tela-pânico
        panicDark: '#B91C1C',                // Variante pressed/bordas
        onPanic: '#FFFFFF',                  // Texto/ícone sobre o pânico
        onPanicMuted: 'rgba(255,255,255,0.85)', // Texto secundário sobre pânico
        surfaceOnPanic: 'rgba(255,255,255,0.18)', // Círculos/chips sobre pânico
        ctaDark: '#000000',                  // Botão CANCELAR (máximo contraste)
        whatsapp: '#25D366',                 // Verde oficial WhatsApp (canal complementar)
    },

    // 7b. Escala Unificada de Severidade — usada em InfoRótulos, relatórios,
    // badges de risco e qualquer classificação ordinal de perigo.
    // Centralizada no DS para garantir consistência visual e semântica.
    severity: {
        extreme:      { bg: '#1A1A1A', text: '#FFF', accent: '#FF1744' },
        veryHigh:     { bg: '#B71C1C', text: '#FFF', accent: '#FF5252' },
        high:         { bg: '#D32F2F', text: '#FFF', accent: '#FF8A80' },
        medium:       { bg: '#F57C00', text: '#FFF', accent: '#FFB74D' },
        low:          { bg: '#388E3C', text: '#FFF', accent: '#81C784' },
        indeterminate:{ bg: '#616161', text: '#FFF', accent: '#BDBDBD' },
    },

    // 8. Gradientes utilitários (specular highlights, brand gradients)
    gradients: {
        // Specular highlight — "lambida de luz" sutil no topo do card de vidro.
        // Mantida baixa (0.35) pra ser polimento, não washout. Decai rápido
        // pra não interferir com a legibilidade do conteúdo.
        specular: {
            colors: ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0)'],
            locations: [0, 0.35, 1],
            start: { x: 0.5, y: 0 },
            end: { x: 0.5, y: 1 },
        },
        // Specular dark — para cards de vidro em dark mode (mais sutil ainda)
        specularDark: {
            colors: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0)'],
            locations: [0, 0.35, 1],
            start: { x: 0.5, y: 0 },
            end: { x: 0.5, y: 1 },
        },
        // Brand sutil — Forest Deep → Emerald, uso em CTAs e hero accents
        brand: {
            colors: ['#047857', '#10B981'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
        },
        // Champagne signature — uso pontual em badges premium / score 100%
        champagne: {
            colors: ['#A16207', '#D4A055'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
        },
    },
};

// DarkDS — mesma estrutura do DS, mas com a paleta dark.
// Tipografia, spacing, radii e shadows são neutros ao tema.
export const DarkDS = {
    ...DS,
    colors: DarkColors,
};

export const HighContrastDS = {
    ...DS,
    colors: HighContrastLightColors,
};

export const HighContrastDarkDS = {
    ...DS,
    colors: HighContrastDarkColors,
};

// Exports nominais das paletas para uso direto fora do ThemeContext
export { LightColors, DarkColors, HighContrastLightColors, HighContrastDarkColors };

// Aliases para manter a retrocompatibilidade de importações nas telas
export const Neo = DS;
export default DS;
