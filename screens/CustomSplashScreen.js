import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { getLocalizedLogo } from '../utils/getLocalizedLogo';

const { width } = Dimensions.get('window');

export default function CustomSplashScreen({ onFinish }) {
    // Definir valores iniciais para animação
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const containerOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Sequência de animação — entrada elástica suave
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(logoScale, {
                toValue: 1,
                damping: 14,
                stiffness: 120,
                useNativeDriver: true,
            })
        ]).start();

        // Splash mais curta — 1.5s total (recomendação Apple HIG / Material)
        const timer = setTimeout(() => {
            Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 350,
                useNativeDriver: true,
            }).start(() => {
                if (onFinish) onFinish();
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
            <View style={styles.background}>
                <Animated.View style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }]
                    }
                ]}>
                    <Image
                        source={getLocalizedLogo()}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Fundo branco
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: width * 0.8,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
});
