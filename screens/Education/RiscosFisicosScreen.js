import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { View, Animated, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import ReviewImage from '../../components/ReviewImage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { riscosFisicos } from '../../data/riscos_fisicos';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';



export default function RiscosFisicosScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  
  const filter = route.params?.filter || 'fisicos';
  const isEletricos = filter === 'eletricos';

  const THEME_COLOR = isEletricos ? Neo.colors.accent.champagne : Neo.emergency?.panic || '#DC2626'; // Amber vs Red

  // Icon Mapping based on Emoji or ID from data
  const getIconData = (item) => {
    if (item.emoji === '⚡') return { icon: "Flash", color: Neo.colors.feedback.warning, bg: Neo.colors.accent.champagneSubtle }; // Amber
    if (item.emoji === '🔥') return { icon: "Danger", color: Neo.colors.feedback.error, bg: '#FEE2E2' }; // TODO: map to DS token (red-100 tint)
    if (item.emoji === '🔫') return { icon: "CloseCircle", color: Neo.colors.secondary[500], bg: '#E0E7FF' }; // TODO: map to DS token (indigo-100 tint)
    if (item.emoji === '🤕') return { icon: "Health", color: Neo.colors.primary[500], bg: '#D1FAE5' }; // TODO: map to DS token (green-100 tint)
    if (item.emoji === '💧') return { icon: "Information", color: Neo.colors.secondary[500], bg: Neo.colors.categoria.ardosia.tint }; // TODO: map to DS token (blue-100 tint)
    return { icon: "Warning2", color: colors.neutral[400], bg: colors.neutral[200] }; // Gray Fallback
  };

  const handlePress = (item) => {
    const iconData = getIconData(item);

    const title = t_field(item, 'nome');
    const risk = t_field(item, 'risco');

    const adaptedItem = {
      titulo: title,
      subtitulo: risk,
      icon: iconData.icon,
      iconColor: iconData.color,
      bg: iconData.bg,
      definicao: t_field(item, 'descricao'),
      importancia: `Risco Principal: ${risk}`,
      comoEvitar: t_array(item, 'prevencao'),
      primeirosSocorros: t_field(item, 'primeirosSocorros'),
      ...item
    };

    navigation.navigate('ConceitoDetail', {
      conceito: adaptedItem
    });
  };


  const scrollY = useRef(new Animated.Value(0)).current;
  const HERO_HEIGHT = 280;
  const heroTransform = [
      {
          translateY: scrollY.interpolate({
              inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
              outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
              extrapolate: 'clamp',
          })
      },
      {
          scale: scrollY.interpolate({
              inputRange: [-HERO_HEIGHT, 0],
              outputRange: [2, 1],
              extrapolateLeft: 'extend',
              extrapolateRight: 'clamp',
          })
      }
  ];

  const titleStr = isEletricos ? t('headersFirst.electrical', 'Riscos Elétricos e Incêndio') : t('headersFirst.physical', 'Riscos Físicos e Quedas');
  const subtitleStr = isEletricos ? t('knowledgeHub.electricalRisks', 'Eletricidade e Prevenção') : t('knowledgeHub.physicalRisks', 'Prevenção de Acidentes');
  
  const capaSource = isEletricos
    ? require('../../assets/illustrations/pad/Choque-eletrico-1.jpg')
    : require('../../assets/illustrations/pad/quedas-escadas_escada-madeira_022.jpg');

  return (
    <AppBackground>
          <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                  width: 44, height: 44, borderRadius: 22,
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  justifyContent: 'center', alignItems: 'center',
                  marginLeft: 16, marginTop: 12,
              }}
          >
              <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
          </TouchableOpacity>
      </SafeAreaView>

      <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      >
          {/* HERO com parallax */}
          <Animated.View style={{
              width: '100%',
              height: HERO_HEIGHT,
              backgroundColor: colors.neutral[800],
              overflow: 'hidden',
              transform: heroTransform,
          }}>
              <ReviewImage
                  source={capaSource}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                  accessibilityLabel={titleStr}
              />
              <LinearGradient
                  colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', isDark ? colors.neutral[100] : '#F6F6F6']}
                  locations={[0, 0.35, 0.85, 1]}
                  style={StyleSheet.absoluteFill}
              />
              <View style={{
                  position: 'absolute',
                  bottom: 24,
                  paddingHorizontal: 22,
                  width: '100%',
              }}>
                  <Text style={{
                      fontSize: 34,
                      fontWeight: '900',
                      color: '#FFF',
                      letterSpacing: -0.8,
                      lineHeight: 38,
                      marginBottom: 8,
                  }}>
                      {titleStr}
                  </Text>
                  <Text style={{
                      fontSize: 17,
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 24,
                  }}>
                      {subtitleStr}
                  </Text>
              </View>
          </Animated.View>

          {/* Main Content */}
          <View style={{ paddingTop: 24, paddingHorizontal: 20 }}>
          <View style={styles.listContainer}>
          {riscosFisicos.filter(item => isEletricos ? item.categoria === 'Eletricidade' : item.categoria !== 'Eletricidade').map((item) => {
            const { icon: IconStr, color, bg } = getIconData(item);
            return (
              <TouchableOpacity key={item.id} style={{ marginBottom: 16 }} onPress={() => handlePress(item)} activeOpacity={0.8}>
                <View style={styles.guideCardOuter}>
                  <View style={styles.guideCardInner}>
                    <View style={[styles.guideImageContainer, { backgroundColor: bg }]}>
                      {item.imagemUrl ? (
                        <ReviewImage
                          source={typeof item.imagemUrl === 'string' ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : item.imagemUrl}
                          tint={color}
                          accessibilityLabel={t_field(item, 'nome')}
                        />
                      ) : (
                        <NeoIcon name={IconStr} size={48} color={color} variant="Bold" />
                      )}
                    </View>
                    <View style={styles.guideContent}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={styles.guideTitle} numberOfLines={1}>{t_field(item, 'nome')}</Text>
                        <Text style={styles.guideSubtitle} numberOfLines={2}>{t_field(item, 'risco')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 80 }} />
      </View>
      </Animated.ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
  },
  guideCardOuter: {
    borderRadius: 24,
    ...Shadows.sm
  },
  guideCardInner: {
    flexDirection: 'row',
    height: 120, // Altura fixa para manter imagem expandida e padronizada
    backgroundColor: Neo.colors.neutral.white, // Sólido para evitar vazamento de sombra no Android
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
    marginBottom: 4
  },
  guideSubtitle: {
    fontSize: 14,
    color: Neo.colors.neutral[600],
    fontFamily: 'PlusJakartaSans_500Medium',
    lineHeight: 20
  }
});
