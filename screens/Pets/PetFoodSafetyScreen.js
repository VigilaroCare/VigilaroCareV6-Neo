import { useRef } from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ReviewImage from '../../components/ReviewImage';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H3, Body, Small } from "../../components/NeoTypography";
import { PET_FOOD_SAFETY } from '../../data/pet_food_safety';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { getPoisonControlDial, getPoisonControlLabel } from '../../utils/emergencyTokens';

export default function PetFoodSafetyScreen({ navigation, route }) {
  const { t } = useTranslation('common');
  const isDark = useIsDark();
  const colors = useThemeColors();
  const petHero = route?.params?.petHero;

  const callCiatox = () => Linking.openURL(`tel:${getPoisonControlDial()}`);

  const renderCard = (item) => (
    <NeoCard variant="elevated" key={item.id} style={s.itemCard}>
      <View style={[s.itemHeader, { borderLeftWidth: 4, borderLeftColor: item.cor }]}>
        <View style={[s.itemIcon, { backgroundColor: item.cor + '1A' }]}>
          <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <H3 style={s.itemTitle}>{t_field(item, 'nome')}</H3>
          <View style={[s.itemBadge, { backgroundColor: item.cor }]}>
            <Small style={s.itemBadgeText}>{t('telas.PetFoodSafetyScreen.risco', 'RISCO ')}{(t_field(item, 'risco') || '').toUpperCase()}
            </Small>
          </View>
        </View>
      </View>

      <View style={s.itemBody}>
        <View style={s.itemRow}>
          <Small style={s.itemLabel}>{t('headersFirst.toxina', 'Toxina')}</Small>
          <Small style={s.itemValue}>{t_field(item, 'toxina')}</Small>
        </View>
        <View style={s.itemRow}>
          <Small style={s.itemLabel}>{t('headersFirst.sintomas', 'Sintomas')}</Small>
          <Small style={s.itemValue}>{t_field(item, 'sintomas')}</Small>
        </View>
        <View style={s.itemTipRow}>
          <NeoIcon name="Lovely" size={12} color={Neo.colors.primary[600]} variant="Bold" />
          <Body style={s.itemTipText}>{t_field(item, 'detalhe')}</Body>
        </View>
      </View>
    </NeoCard>
  );

  const surface = isDark ? Neo.colors.neutral[100] : colors.neutral.white;
  const scrollY = useRef(new Animated.Value(0)).current;
  const HERO_HEIGHT = Neo.layout.heroBanner;

  const title = t('petFood.headerTitle', 'Lista negra');
  const cor = petHero?.cor || '#D32F2F';

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

  return (
    <View style={{ flex: 1, backgroundColor: surface }}>
      <StatusBar style="light" />

      {/* Float Header / Back Button (fixo no topo da tela) */}
      <SafeAreaView edges={['top']} style={s.safeHeader}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={s.backBtnFlat}
              accessibilityRole="button"
              accessibilityLabel={t('common.back', 'Voltar')}
          >
              <NeoIcon name="ArrowLeft2" size={24} color={colors.neutral.white} />
          </TouchableOpacity>
      </SafeAreaView>

      <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          contentContainerStyle={{ paddingBottom: 240 }}
      >
          {/* HERO com parallax */}
          <Animated.View style={{
              width: '100%',
              height: HERO_HEIGHT,
              backgroundColor: cor,
              overflow: 'hidden',
              transform: heroTransform,
          }}>
              {petHero && (
                  <ReviewImage
                      source={petHero.imagemUrl ? (typeof petHero.imagemUrl === 'string' ? { uri: petHero.imagemUrl } : petHero.imagemUrl) : petHero.imagem}
                      style={StyleSheet.absoluteFill}
                      resizeMode={petHero.resizeMode || 'cover'}
                  />
              )}

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
                      color: colors.neutral.white,
                      letterSpacing: -0.8,
                      lineHeight: 38,
                  }} accessibilityRole="header">
                      {title}
                  </Text>
              </View>
          </Animated.View>

          {/* Main Content */}
          <View style={[s.content, { marginTop: 20 }]}>

          {/* CIATOX */}
          <TouchableOpacity onPress={callCiatox} activeOpacity={0.85}>
            <NeoCard variant="elevated" style={s.ciatoxCard}>
              <View style={s.ciatoxIcon}>
                <NeoIcon name="Call" size={20} color="#D32F2F" variant="Bold" />
              </View>
              <View style={{ flex: 1 }}>
                <H3 style={s.ciatoxTitle}>
                  {t('petFood.alertTitle', 'Intoxicação recente?')}
                </H3>
                <Body style={s.ciatoxDesc}>
                  {t('petFood.alertDesc', { defaultValue: 'Ligue para {{poisonControl}}', poisonControl: getPoisonControlLabel() })}
                </Body>
              </View>
              <NeoIcon name="ArrowRight2" size={18} color="#D32F2F" />
            </NeoCard>
          </TouchableOpacity>

          <Small style={s.sectionLabel}>
            {(t('petFood.listTitle', 'Mosaico de riscos') || '').toUpperCase()}
          </Small>

          {PET_FOOD_SAFETY.map(renderCard)}
          </View>
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
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

  ciatoxCard: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#D32F2F',
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    marginBottom: 20,
    gap: 12,
  },
  ciatoxIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D32F2F1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ciatoxTitle: { color: Neo.colors.feedback.error, fontSize: 14, fontWeight: '800' }, // was #B91C1C
  ciatoxDesc: { color: Neo.colors.feedback.error, fontSize: 12.5, marginTop: 2 }, // was #991B1B

  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  itemCard: {
    marginBottom: 12,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  itemIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    color: Neo.colors.neutral[900],
    marginBottom: 4,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  itemBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemBadgeText: {
    color: Neo.colors.neutral.white,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  itemBody: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  itemLabel: {
    width: 72,
    fontWeight: '800',
    color: Neo.colors.neutral[600],
    fontSize: 11.5,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  itemValue: {
    flex: 1,
    color: Neo.colors.neutral[800],
    fontWeight: '500',
    fontSize: 12.5,
    lineHeight: 17,
  },
  itemTipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 8,
  },
  itemTipText: {
    flex: 1,
    fontSize: 12,
    color: Neo.colors.neutral[700],
    fontStyle: 'italic',
    lineHeight: 17,
  },
});
