import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme, AccessibilityInfo } from 'react-native';

const AccessibilityContext = createContext({
    fontSizeLevel: 1,
    highContrast: false,
    reduceMotion: false,
    screenReaderEnabled: false,
    leftHandedMode: false,
    updateFontSize: () => {},
    toggleHighContrast: () => {},
    toggleReduceMotion: () => {},
    toggleScreenReader: () => {},
    toggleLeftHanded: () => {},
});

export const AccessibilityProvider = ({ children }) => {
    // Estados iniciais
    const [fontSizeLevel, setFontSizeLevel] = useState(1); // 1 = Normal, 1.2 = Grande, 1.4 = Extra
    const [highContrast, setHighContrast] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
    const [leftHandedMode, setLeftHandedMode] = useState(false);

    const systemScheme = useColorScheme();

    // Carregar preferências salvas + sincronizar com o SO
    useEffect(() => {
        loadPreferences();
        syncWithOS();
    }, []);

    // Sincronizar com ajustes do Sistema Operacional
    const syncWithOS = () => {
        // Lê estado inicial do SO
        AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
            // Só aplica se o usuário nunca configurou manualmente
            AsyncStorage.getItem('@acc_motion').then(stored => {
                if (stored === null && enabled) {
                    setReduceMotion(true);
                }
            });
        });
        AccessibilityInfo.isScreenReaderEnabled().then(enabled => {
            setScreenReaderEnabled(enabled);
        });

        // Listeners para mudanças em tempo real do SO
        const motionSub = AccessibilityInfo.addEventListener('reduceMotionChanged', enabled => {
            setReduceMotion(enabled);
            AsyncStorage.setItem('@acc_motion', JSON.stringify(enabled));
        });
        const readerSub = AccessibilityInfo.addEventListener('screenReaderChanged', enabled => {
            setScreenReaderEnabled(enabled);
            AsyncStorage.setItem('@acc_reader', JSON.stringify(enabled));
        });

        return () => {
            motionSub?.remove?.();
            readerSub?.remove?.();
        };
    };

    const loadPreferences = async () => {
        try {
            const storedFont = await AsyncStorage.getItem('@acc_font_size');
            const storedContrast = await AsyncStorage.getItem('@acc_contrast');
            const storedMotion = await AsyncStorage.getItem('@acc_motion');
            const storedReader = await AsyncStorage.getItem('@acc_reader');
            const storedLeftHanded = await AsyncStorage.getItem('@acc_left_handed');

            if (storedFont) setFontSizeLevel(parseFloat(storedFont));
            if (storedContrast) setHighContrast(JSON.parse(storedContrast));
            if (storedMotion) setReduceMotion(JSON.parse(storedMotion));
            if (storedReader) setScreenReaderEnabled(JSON.parse(storedReader));
            if (storedLeftHanded) setLeftHandedMode(JSON.parse(storedLeftHanded));
        } catch (e) {
            console.log('Erro ao carregar acessibilidade:', e);
        }
    };

    // Salvar preferências
    const updateFontSize = async (level) => {
        setFontSizeLevel(level);
        await AsyncStorage.setItem('@acc_font_size', String(level));
    };

    const toggleHighContrast = async (val) => {
        setHighContrast(val);
        await AsyncStorage.setItem('@acc_contrast', JSON.stringify(val));
    };

    const toggleReduceMotion = async (val) => {
        setReduceMotion(val);
        await AsyncStorage.setItem('@acc_motion', JSON.stringify(val));
    };

    const toggleScreenReader = async (val) => {
        setScreenReaderEnabled(val);
        await AsyncStorage.setItem('@acc_reader', JSON.stringify(val));
    };

    const toggleLeftHanded = async (val) => {
        setLeftHandedMode(val);
        await AsyncStorage.setItem('@acc_left_handed', JSON.stringify(val));
    };



    return (
        <AccessibilityContext.Provider value={{
            fontSizeLevel,
            highContrast,
            reduceMotion,
            screenReaderEnabled,
            leftHandedMode,
            updateFontSize,
            toggleHighContrast,
            toggleReduceMotion,
            toggleScreenReader,
            toggleLeftHanded,
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        // Fallback robusto para evitar crashes se usado fora do provider
        return {
            fontSizeLevel: 1,
            highContrast: false,
            reduceMotion: false,
            screenReaderEnabled: false,
            leftHandedMode: false,
            updateFontSize: () => {},
            toggleHighContrast: () => {},
            toggleReduceMotion: () => {},
            toggleScreenReader: () => {},
            toggleLeftHanded: () => {},
        };
    }
    return context;
};
