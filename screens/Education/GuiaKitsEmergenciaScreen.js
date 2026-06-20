import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { KITS_EDUCATIONAL_CONTENT } from '../../data/kits/educational_content';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import PetHeroBanner from '../../components/PetHeroBanner';
import ReviewImage from '../../components/ReviewImage';
import { LinearGradient } from 'expo-linear-gradient';
import { H1, Caption } from '../../components/NeoTypography';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { t_field, t_array } from '../../utils/getLocalizedField';

export default function GuiaKitsEmergenciaScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    const petHero = route?.params?.petHero;
    const THEME_COLOR = '#8B5CF6';

    const MENU_ITEMS = [
        { id: 'epis', title: 'EPIs', title_en: 'PPE', title_es: 'EPIs', subtitle: 'Equipamentos de Proteção Individual', subtitle_en: 'Personal Protective Equipment', subtitle_es: 'Equipos de Protección Individual', iconName: 'ShieldTick', color: '#F59E0B', imagemUrl: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 'first_aid', title: 'Kit de Primeiros Socorros', title_en: 'First Aid Kit', title_es: 'Kit de Primeros Auxilios', subtitle: 'Itens Essenciais', subtitle_en: 'Essential Items', subtitle_es: 'Artículos Esenciales', iconName: 'Health', color: '#EF4444', imagemUrl: 'https://images.pexels.com/photos/5207085/pexels-photo-5207085.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 'tools', title: 'Caixa de Ferramentas', title_en: 'Toolbox', title_es: 'Caja de Herramientas', subtitle: 'Manutenção Segura', subtitle_en: 'Safe Maintenance', subtitle_es: 'Mantenimiento Seguro', iconName: 'ArchiveBox', color: '#607D8B', imagemUrl: 'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 'emergency_support', title: 'Utilidades de Apoio', title_en: 'Support Utilities', title_es: 'Utilidades de Apoyo', subtitle: 'Luz e Comunicação', subtitle_en: 'Light & Communication', subtitle_es: 'Luz y Comunicación', iconName: 'Lamp', color: '#8B5CF6', imagemUrl: 'https://images.pexels.com/photos/3326105/pexels-photo-3326105.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 'farmacinha', title: 'Kit de Medicamentos', title_en: 'Medication Kit', title_es: 'Kit de Medicamentos', subtitle: 'Farmácia Caseira', subtitle_en: 'Home Pharmacy', subtitle_es: 'Farmacia Casera', iconName: 'Heart', color: '#10B981', imagemUrl: 'https://images.pexels.com/photos/3652103/pexels-photo-3652103.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 'pet', title: 'Kit Pet', title_en: 'Pet Kit', title_es: 'Kit Mascotas', subtitle: 'Prevenção e Emergência', subtitle_en: 'Prevention & Emergency', subtitle_es: 'Prevención y Emergencia', iconName: 'Star', color: '#F43F5E', imagemUrl: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ];

    const handlePress = (item) => {
        const rawContent = KITS_EDUCATIONAL_CONTENT[item.id] || {};
        const description = t_field(rawContent, 'description');
        const sections = t_array(rawContent, 'sections');

        const formatSections = (desc, secs) => {
            let res = desc || '';
            if (Array.isArray(secs)) {
                secs.forEach(sec => {
                    res += `\n\n🔹 ${sec.title.toUpperCase()}`;
                    if (Array.isArray(sec.content)) {
                        res += '\n' + sec.content.map(c => `• ${c}`).join('\n');
                    } else {
                        res += '\n' + sec.content;
                    }
                });
            }
            return res;
        };

        const adaptedDescription = formatSections(description, sections);

        navigation.navigate('PremiumArticle', {
            conceito: {
                titulo: t_field(item, 'title'),
                subtitulo: t_field(item, 'subtitle'),
                icon: item.iconName,
                color: item.color,
                conteudo: adaptedDescription,
                tags: ['Guia de Kits']
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

    const capaUrl = 'https://images.pexels.com/photos/5452202/pexels-photo-5452202.jpeg?auto=compress&cs=tinysrgb&w=1200'; // First Aid

    const title = t('headersFirst.guiaDeKits', 'Guia de Kits');
    const subtitle = t('estejaPreparadoQuandoPrecisar', 'Esteja preparado quando precisar.');

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button (fixo no topo da tela) */}
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
                        source={{ uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />

                    {/* Gradient para legibilidade do título e fusão com o fundo */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', surface]}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
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
                        <Text style={{
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.9)',
                            marginTop: 6,
                            fontWeight: '600'
                        }}>
                            {subtitle}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[styles.content, { marginTop: 20 }]}>
                    {petHero && (
                        <PetHeroBanner
                            image={petHero.imagem}
                            imageUrl={petHero.imagemUrl}
                            tint={petHero.cor || THEME_COLOR}
                            resizeMode={petHero.resizeMode || 'cover'}
                            accessibilityLabel={petHero.titulo}
                            marginHorizontal={0}
                            marginBottom={14}
                        />
                    )}

                    {MENU_ITEMS.map((item) => (
                        <NeoHorizontalCard
                            key={item.id}
                            title={t_field(item, 'title')}
                            description={t_field(item, 'subtitle')}
                            iconName={item.iconName}
                            color={item.color}
                            imageUrl={item.imagemUrl}
                            onPress={() => handlePress(item)}
                        />
                    ))}
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
