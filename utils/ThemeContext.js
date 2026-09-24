import { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DS, DarkDS, LightColors, DarkColors, HighContrastLightColors, HighContrastDarkColors } from './DesignSystem2026';
import { useAccessibility } from '../context/AccessibilityContext';

const STORAGE_KEY = '@vigilaro_theme_mode'; // 'system' | 'light' | 'dark'

/**
 * Constrói o objeto `theme` (shape flat de back-compat) a partir das cores DS.
 * Mantido para componentes legacy que consomem `theme.background`, etc.
 */
function buildLegacyTheme(colors) {
    return {
        background: colors.neutral[100],
        card: colors === DarkColors ? colors.neutral[200] : colors.neutral.white,
        cardBackground: colors === DarkColors ? colors.neutral[200] : colors.neutral.white,
        text: colors.neutral[900],
        textPrimary: colors.neutral[900],
        textSecondary: colors.neutral[700],
        subText: colors.neutral[700],
        primary: colors.primary[500],
        primaryGradient: [colors.primary[500], colors.primary[700]],
        border: colors.neutral[300],
        success: colors.feedback.success,
        warning: colors.feedback.warning,
        danger: colors.feedback.error,
    };
}

const defaultValue = {
    mode: 'system',
    isDark: false,
    colors: LightColors,
    theme: buildLegacyTheme(LightColors),
    setMode: () => {},
    toggleTheme: () => {},
};

const ThemeContext = createContext(defaultValue);

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [mode, setModeState] = useState('system');

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored === 'light' || stored === 'dark' || stored === 'system') {
                    setModeState(stored);
                }
            } catch (e) {
                // AsyncStorage indisponível — mantém 'system'
            }
        })();
    }, []);

    const isDark = useMemo(() => {
        if (mode === 'system') return systemScheme === 'dark';
        return mode === 'dark';
    }, [mode, systemScheme]);

    const { highContrast } = useAccessibility();

    const colors = useMemo(() => {
        if (highContrast) {
            return isDark ? HighContrastDarkColors : HighContrastLightColors;
        }
        return isDark ? DarkColors : LightColors;
    }, [highContrast, isDark]);

    const theme = useMemo(() => buildLegacyTheme(colors), [colors]);

    const setMode = useCallback(async (newMode) => {
        if (newMode !== 'light' && newMode !== 'dark' && newMode !== 'system') return;
        setModeState(newMode);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, newMode);
        } catch (e) {
            // Falha silenciosa — preferência ainda fica em memória
        }
    }, []);

    // Back-compat: alterna apenas entre light/dark (sem 'system')
    const toggleTheme = useCallback(() => {
        setMode(isDark ? 'light' : 'dark');
    }, [isDark, setMode]);

    const value = useMemo(() => ({
        mode,
        isDark,
        colors,
        theme,
        setMode,
        toggleTheme,
    }), [mode, isDark, colors, theme, setMode, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Hook principal — retorna { mode, isDark, colors, theme, setMode, toggleTheme }.
 * Compatível com consumidores existentes que destruturam `theme`.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Hook simplificado — retorna o objeto de cores DS ativo (LightColors ou DarkColors).
 * Preferir este em código novo (mais explícito que `useTheme().colors`).
 */
export const useThemeColors = () => useContext(ThemeContext).colors;

/**
 * Hook simplificado — retorna apenas o boolean isDark.
 * Útil em componentes que só precisam variar tint (ex: BlurView).
 */
export const useIsDark = () => useContext(ThemeContext).isDark;

/**
 * Retorna o DS completo (light ou dark) — para componentes que queiram acessar
 * tipografia/spacing/radii sem precisar mexer no tema.
 */
export const useThemeDS = () => (useContext(ThemeContext).isDark ? DarkDS : DS);
