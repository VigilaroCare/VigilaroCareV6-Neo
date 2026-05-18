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
const LightColors = {
    primary: {
        700: '#047857', // Forest Green (Deep/Premium)
        600: '#059669', // Hover/Active
        500: '#10B981', // Emerald Green (Vibrante, Saudável, Premium)
        300: '#34D399',
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
        900: '#1C1C1E', // iOS Dark Text (Não é 100% preto, reduz fadiga ocular)
        800: '#3A3A3C', // iOS Secondary Text
        700: '#636366',
        500: '#8E8E93', // iOS System Gray (Desabilitados, placeholders)
        400: '#C7C7CC', // Bordas médias
        300: '#E5E5EA', // iOS Gray 5 (Divisores e bordas leves)
        200: '#F2F2F7', // iOS Gray 6 (Fundo de seções/cards internos)
        100: '#F9FAFB', // Fundo principal da tela (Off-white)
        white: '#FFFFFF',
        black: '#000000',
    },
    // Utilitários exatos para efeitios "Glass"
    glass: {
        light: 'rgba(255, 255, 255, 0.75)',
        border: 'rgba(255, 255, 255, 0.4)',
        dark: 'rgba(28, 28, 30, 0.65)',
    },
    // Mist (gradient de fundo) — verde claro
    mist: {
        gradient: ['#D0EBE0', '#B0DBCA', '#8CCEA8', '#A1D4B8', '#D0EBE0', '#E4F2EC'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(46, 125, 50, 0.08)',
        accentStrong: 'rgba(27, 94, 32, 0.12)',
        fallback: '#F2F8F4',
    },
};

// Paleta Dark — invertida no neutral, brand verde mantida, cores semânticas
// ajustadas para os valores iOS Dark Mode oficiais (mais saturadas).
const DarkColors = {
    primary: {
        700: '#34D399',   // mais clara em dark p/ contraste em hover
        600: '#10B981',   // brand stays
        500: '#10B981',   // brand stays — identidade visual
        300: '#6EE7B7',
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
        500: '#8E8E93',   // gray médio — usado em ambos
        400: '#48484A',
        300: '#3A3A3C',   // bordas/divisores em dark
        200: '#2C2C2E',   // fundo de seções/cards
        100: '#1C1C1E',   // fundo principal da tela (off-black)
        white: '#FFFFFF', // semantic — texto branco continua branco
        black: '#000000', // semantic — preto continua preto
    },
    // Glass para dark mode — borda sutil e superfície escura translúcida
    glass: {
        light: 'rgba(255, 255, 255, 0.08)',   // overlay claro em dark = sutil
        border: 'rgba(255, 255, 255, 0.12)',
        dark: 'rgba(28, 28, 30, 0.78)',
    },
    // Mist dark — gradient escuro com tom esverdeado sutil (identidade)
    mist: {
        gradient: ['#0F1A14', '#13241B', '#173024', '#13241B', '#0F1A14', '#0A130E'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(16, 185, 129, 0.06)',
        accentStrong: 'rgba(16, 185, 129, 0.10)',
        fallback: '#0E1A12',
    },
};

export const DS = {
    // 1. Paleta de Cores (Premium & Apple-like) — LIGHT (default)
    colors: LightColors,

    // 2. Tipografia (Plus Jakarta Sans display + System body)
    type: {
        h1: { fontSize: 34, fontWeight: '800', lineHeight: 41, color: '#1C1C1E', letterSpacing: -0.6, _display: true }, // Display font
        h2: { fontSize: 28, fontWeight: '700', lineHeight: 34, color: '#1C1C1E', letterSpacing: -0.4, _display: true }, // Display font
        h3: { fontSize: 22, fontWeight: '700', lineHeight: 28, color: '#1C1C1E', letterSpacing: -0.2, _display: true }, // Display font

        body: { fontSize: 17, fontWeight: '400', lineHeight: 24, color: '#3A3A3C', letterSpacing: -0.1 }, // System font
        bodySmall: { fontSize: 15, fontWeight: '400', lineHeight: 20, color: '#3A3A3C', letterSpacing: -0.1 }, // System font
        caption: { fontSize: 13, fontWeight: '500', lineHeight: 18, color: '#8E8E93', letterSpacing: 0.1 }, // System font

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
        }
    }
};

// DarkDS — mesma estrutura do DS, mas com a paleta dark.
// Tipografia, spacing, radii e shadows são neutros ao tema.
export const DarkDS = {
    ...DS,
    colors: DarkColors,
};

// Exports nominais das paletas para uso direto fora do ThemeContext
export { LightColors, DarkColors };

// Aliases para manter a retrocompatibilidade de importações nas telas
export const Neo = DS;
export default DS;
