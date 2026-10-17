import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import ReviewImage from '../../components/ReviewImage';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { TEORIA_FOGO_DATA } from '../../data/teoria_fogo';
import { t_field, t_array } from '../../utils/getLocalizedField';

export default function TeoriaFogoScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    const THEME_COLOR = '#EA580C'; // Laranja Escuro/Fogo (alinhado com KnowledgeHub)

    const items = [
        { id: 'triangulo', ...TEORIA_FOGO_DATA.triangulo },
        { id: 'classes', ...TEORIA_FOGO_DATA.classes },
        { id: 'extintores', ...TEORIA_FOGO_DATA.extintores },
        { id: 'transmissao', ...TEORIA_FOGO_DATA.transmissao },
        { id: 'combate', ...TEORIA_FOGO_DATA.combate },
    ];

    // Entrega o artigo ja no idioma do usuario e com os tokens resolvidos pelo
    // PAIS (t_field/t_array): as classes de incendio mudam com a norma local
    // (D16, data/classesIncendio.js). Antes ia o objeto cru — o artigo saia em
    // pt-BR em qualquer idioma e as listas de classes nem apareciam.
    const handlePress = (item) => {
        const lista = (campo) => ({
            titulo: t_field(item, `rotulo${campo[0].toUpperCase()}${campo.slice(1)}`),
            itens: t_array(item, campo),
        });
        const definicao = t_field(item, 'definicao');
        const importancia = t_field(item, 'importancia');
        navigation.navigate('PremiumArticle', {
            conceito: {
                id: item.id,
                icon: item.icon,
                imagemUrl: item.imagemUrl,
                titulo: t_field(item, 'titulo'),
                definicao: [definicao, importancia ? `**${importancia}**` : null].filter(Boolean).join('\n\n'),
                secoes: [lista('comoIdentificar'), lista('exemplos'), lista('comoEvitar')],
                color: THEME_COLOR,
                tags: [t('headersFirst.teoriaDoFogo', 'Teoria do Fogo')]
            }
        });
    };

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);
    const surface = isDark ? themeColors.neutral[100] : '#FFFFFF';

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    const capaUrl = require('../../assets/illustrations/pad/Desastres-em-casa-1.jpg'); // Fire

    const title = t('headersFirst.basicoSobreFogo', 'Básico sobre fogo');

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtnFlat}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: THEME_COLOR,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    
                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[styles.content, { marginTop: 20 }]}>

                <View style={{ marginTop: 24 }}>
                    {items.map((item, index) => (
                        <NeoHorizontalCard
                            key={item.id}
                            title={t_field(item, 'titulo')}
                            description={t_field(item, 'subtitulo') || t_field(item, 'descricao')}
                            iconName={item.icon || 'Fire'}
                            color={THEME_COLOR}
                            onPress={() => handlePress(item)}
                        />
                    ))}
                </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
});
