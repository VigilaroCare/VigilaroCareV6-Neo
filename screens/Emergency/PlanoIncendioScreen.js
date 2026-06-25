import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from '../../components/ReviewImage';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { getFirePreventionContent } from '../../data/fire_prevention_content';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function PlanoIncendioScreen({ navigation }) {
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];

  const FIRE_PREVENTION_CONTENT = getFirePreventionContent();

  const secoes = [
    {
      id: 'prevention',
      nome: FIRE_PREVENTION_CONTENT?.prevention?.title || 'Prevenção',
      subtitulo: 'Ações para evitar o início de incêndios',
      emoji: FIRE_PREVENTION_CONTENT?.prevention?.emoji || '🛡️',
      cor: Neo.colors.feedback.success,
      imagemUrl: require('../../assets/illustrations/pad/queimaduras-fogo_combustao_006.jpg'),
      itens: FIRE_PREVENTION_CONTENT?.prevention?.sections || [],
    },
    {
      id: 'action',
      nome: FIRE_PREVENTION_CONTENT?.action?.title || 'Ação',
      subtitulo: 'Como agir no primeiro minuto',
      emoji: FIRE_PREVENTION_CONTENT?.action?.emoji || '🔥',
      cor: Neo.colors.feedback.error,
      imagemUrl: require('../../assets/illustrations/pad/generated_action_incendio.png'),
      itens: FIRE_PREVENTION_CONTENT?.action?.steps || [],
    },
    {
      id: 'plan',
      nome: 'Plano de fuga',
      subtitulo: 'Estratégia de evacuação em família',
      emoji: '🗺️',
      cor: Neo.colors.secondary[500],
      imagemUrl: require('../../assets/illustrations/pad/acidentes-estatisticas_acidentes-domesticos-no-brasil_002.jpg'),
      itens: [
        'Desenhe a planta da casa e marque 2 saídas por cômodo.',
        'COMBINE UM PONTO DE ENCONTRO seguro fora da casa (ex: poste, árvore vizinha).',
        'Se houver fumaça: RASTEJE. O ar é mais limpo e fresco junto ao chão.',
        'Toque na porta com as costas da mão antes de abrir. Se quente, NÃO ABRA.',
        'Se suas roupas pegarem fogo: PARE, DEITE e ROLE no chão.',
      ],
    },
  ];

  const handlePress = (secao) => {
    let passos = [];
    if (secao.id === 'prevention') {
      passos = secao.itens.map(s => ({ titulo: s.title, descricao: s.content }));
    } else {
      passos = secao.itens.map(s => ({ titulo: s, descricao: '' }));
    }

    navigation.navigate('PremiumArticle', {
      conceito: {
        titulo: secao.nome,
        subtitulo: secao.subtitulo,
        emoji: secao.emoji,
        color: secao.cor,
        tags: ['Plano de Incêndio'],
        passos: passos,
      }
    });
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);
  const surface = isDark ? themeColors.neutral[100] : themeColors.neutral.white;

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

  const capaUrl = require('../../assets/illustrations/pad/fotos-stock-genericas_incendio-casa-fumaca_041.jpg'); // Fire prevention

  const title = t('headersFirst.firePlan', 'Plano de incêndio');
  const subtitle = t('headersFirst.eviteTragediasFamiliares', 'Evite tragédias familiares');

  return (
    <View style={{ flex: 1, backgroundColor: surface }}>
      <StatusBar style="light" />

      {/* Float Header / Back Button */}
      <SafeAreaView edges={['top']} style={s.safeHeader}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={s.backBtnFlat}
              accessibilityRole="button"
              accessibilityLabel={t('common.back', 'Voltar')}
          >
              <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
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
            backgroundColor: Neo.colors.feedback.error,
            overflow: 'hidden',
            transform: heroTransform,
        }}>
            <ReviewImage
                source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                accessibilityLabel={title}
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
                    color: Neo.colors.neutral.white,
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

        <View style={[s.content, { marginTop: 20 }]}>
          {/* ALERT */}
          <View style={[s.alertCard, { backgroundColor: '#FFF7ED', borderColor: '#FFEDD5' }]}>{/* TODO: map #FFF7ED/#FFEDD5 to DS token (amber-50/100 tints) */}
            <NeoIcon name="Warning2" size={22} color="#F97316" variant="Bold" />
            <Text style={s.alertText}>
              <Text style={{ fontWeight: '800' }}>{t('headersFirst.critical', 'CRÍTICO:')} </Text>
              Você tem menos de 3 minutos para sair em um incêndio. Ter um plano pode salvar sua família.
            </Text>
          </View>

          {/* STATS */}
          <NeoCard variant="elevated" style={s.statsCard}>
            <View style={s.statItem}>
              <Text style={s.statNumber}>3min</Text>
              <Text style={[s.statLabel, { color: textBody }]}>
                {t('headersFirst.tempoParaEvacuar', 'Tempo para evacuar')}
              </Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Text style={s.statNumber}>2×</Text>
              <Text style={[s.statLabel, { color: textBody }]}>
                {t('headersFirst.treinarPorAno', 'Treinar por ano')}
              </Text>
            </View>
          </NeoCard>

          <Small style={s.sectionLabel}>
            {(t('headersFirst.monteSeuPlano', 'Monte seu plano') || '').toUpperCase()}
          </Small>

          {secoes.map(secao => (
             <NeoHorizontalCard
                key={secao.id}
                title={secao.nome}
                description={secao.subtitulo}
                emoji={secao.emoji}
                color={secao.cor}
                imageUrl={secao.imagemUrl}
                onPress={() => handlePress(secao)}
             />
          ))}

          {/* INFO 3D */}
          <View style={[s.infoBox, { backgroundColor: isDark ? 'rgba(79, 70, 229, 0.1)' : '#EEF2FF', borderColor: isDark ? 'rgba(79, 70, 229, 0.2)' : '#E0E7FF' }]}>{/* TODO: map #EEF2FF/#E0E7FF to DS token (indigo-50/100 tints) */}
            <NeoIcon name="InfoCircle" size={20} color={Neo.colors.secondary[500]} variant="Bold" />
            <View style={{ flex: 1 }}>
              <Text style={[s.infoTitle, { color: Neo.colors.secondary[500] }]}>
                {t('headersFirst.prevenO3DAplicada', 'Prevenção 3D aplicada')}
              </Text>
              <Text style={[s.infoText, { color: Neo.colors.secondary[500] }]}>
                • DIÁRIA: verificar extintores{'\n'}
                • DINÂMICA: atualizar plano{'\n'}
                • DURADOURA: treinar regularmente
              </Text>
            </View>
          </View>
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
  alertCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginBottom: 16,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: Neo.colors.accent?.copper || '#9A3412',
  },
  statsCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: Neo.colors.feedback.error,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 16,
  },
  sectionLabel: {
    marginBottom: 12,
    fontWeight: '700',
    color: Neo.colors.neutral[500],
    letterSpacing: 0.5,
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginTop: 8,
  },
  infoTitle: {
    fontWeight: '800',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
