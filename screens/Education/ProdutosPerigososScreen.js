import { useRef } from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import NeoIcon from '../../components/NeoIcon';
import { DS as Neo } from '../../utils/DesignSystem2026';
import ReviewImage from '../../components/ReviewImage';
import { PRODUTOS_CATEGORIAS_DATA } from '../../data/produtos_categorias';
import { t_field } from '../../utils/getLocalizedField';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';



export default function ProdutosPerigososScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];
  const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
  const THEME_COLOR = themeColors.categoria.ameixa.fill;

  // Convert object to array
  const items = Object.keys(PRODUTOS_CATEGORIAS_DATA).map(key => ({
    id: key,
    ...PRODUTOS_CATEGORIAS_DATA[key]
  }));

  const handlePress = (item) => {
    navigation.navigate('ConceitoDetail', {
      conceito: item
    });
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const HERO_HEIGHT = Neo.layout.heroBanner;
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

  const capaUrl = require('../../assets/illustrations/pad/Novo-Acidente-1.jpg'); // Cleaning supplies

  const title = t('headersFirst.chemicals', 'Produtos Químicos');

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

        <View style={[styles.content, { marginTop: 20 }]}>

        <View style={styles.listContainer}>
          {items.map((item) => (
              <TouchableOpacity key={item.id} style={{ marginBottom: 16 }} onPress={() => handlePress(item)} activeOpacity={0.8}>
                <View style={styles.guideCardOuter}>
                  <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                    <View style={[styles.guideImageContainer, { backgroundColor: item.bg || THEME_COLOR + '15' }]}>
                      {item.imagemUrl ? (
                        <ReviewImage
                          source={typeof item.imagemUrl === 'string' ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : item.imagemUrl}
                          tint={item.iconColor || THEME_COLOR}
                          accessibilityLabel={t_field(item, 'titulo')}
                        />
                      ) : (
                        <NeoIcon name={item.icon} size={48} color={item.iconColor || THEME_COLOR} variant="Bold" />
                      )}
                    </View>
                    <View style={styles.guideContent}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{t_field(item, 'titulo')}</Text>
                        <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{t_field(item, 'subtitulo')}</Text>
                      </View>
                      <View style={{ flex: 1 }} />
                      <Text style={[styles.descText, { color: textBody }]} numberOfLines={2}>{t_field(item, 'definicao')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 200 }} />
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
  listContainer: {
    flexDirection: 'column',
  },
  guideCardOuter: {
    borderRadius: 24,
    ...Shadows.sm
  },
  guideCardInner: {
    flexDirection: 'row',
    height: 120, // Altura fixa para padrão edge-to-edge
    backgroundColor: '#FFFFFF', // Fundo sólido para evitar bleed de sombra
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  guideImageContainer: {
    width: 120,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontWeight: '700',
    color: Neo.colors.neutral[800],
    marginBottom: 2
  },
  guideSubtitle: {
    fontSize: 14,
    color: Neo.colors.neutral[500],
    fontFamily: 'PlusJakartaSans_500Medium',
    fontStyle: 'italic',
  },
  descText: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    fontFamily: 'PlusJakartaSans_500Medium',
    lineHeight: 18,
  }
});
