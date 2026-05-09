import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import { ArrowLeft, ArrowRight2 } from 'iconsax-react-native';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, Small } from '../../components/NeoTypography';
import { PRODUTOS_CATEGORIAS_DATA } from '../../data/produtos_categorias';
import { useTranslation } from 'react-i18next';



export default function ProdutosPerigososScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('common');
  const THEME_COLOR = '#8B5CF6'; // Violet/Purple (Consistent with 'Produtos' card in Menu)

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

  return (
    <AppBackground variant="subtle">
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
        <StatusBar style="dark" />

        {/* Custom Header */}
        <View style={{ paddingTop: 10, paddingBottom: 20, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', marginRight: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <H2 style={{ color: Neo.colors.neutral[900] }}>{t('headersFirst.chemicals', 'Produtos Químicos')}</H2>
            <Small style={{ color: Neo.colors.neutral[500], marginTop: 2 }}>{t('headersFirst.riscosInvisVeisEmCasa', 'Riscos invisíveis em casa')}</Small>
          </View>
        </View>

        {/* Vertical List Layout */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 240 }} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={item.id} style={{ marginBottom: 16 }} onPress={() => handlePress(item)} activeOpacity={0.8}>
                <View style={styles.guideCardOuter}>
                  <View style={styles.guideCardInner}>
                    <View style={[styles.guideImageContainer, { backgroundColor: item.bg || THEME_COLOR + '15' }]}>
                      <Icon size={48} color={item.iconColor || THEME_COLOR} variant="Bold" />
                    </View>
                    <View style={styles.guideContent}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={styles.guideTitle} numberOfLines={1}>{item.titulo}</Text>
                        <Text style={styles.guideSubtitle} numberOfLines={1}>{item.subtitulo}</Text>
                      </View>
                      <View style={{ flex: 1 }} />
                      <Text style={styles.descText} numberOfLines={2}>{item.definicao}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
      </SafeAreaView>
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
