import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import ReviewImage from '../../components/ReviewImage';
import PetHeroBanner from '../../components/PetHeroBanner';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { getPrimeirosSocorros } from '../../data/primeiros_socorros';
import { getEmergenciasPets } from '../../data/primeiros_socorros_pets';
import DisclaimerModal from '../../components/DisclaimerModal';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const HUMAN_ACCENT = '#EF4444'; // red — pessoas (urgência)
const PET_ACCENT = '#10B981';   // green — pets (cuidado)

export default function PrimeirosSocorrosScreen({ navigation, route }) {
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[800];
  const petHero = route?.params?.petHero;
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  // Se veio do hub Pet, abre direto na aba PET
  const [type, setType] = useState(petHero ? 'PET' : 'HUMAN');

  const openDetail = (item) => setSelectedItem(item);
  const closeDetail = () => setSelectedItem(null);

  const getData = () => {
    if (type === 'HUMAN') return getPrimeirosSocorros();
    return getEmergenciasPets().map(pet => ({
      id: pet.id,
      emoji: pet.emoji || '🐾', // garante fallback visual
      titulo: pet.titulo,
      situacao: pet.descricao,
      imagemUrl: pet.imagemUrl, // foto Pexels/URL do merge
      imagem: pet.imagem,      // require() local, se disponível
      isPet: true,
      rawPetData: pet,
    }));
  };

  const accent = type === 'HUMAN' ? HUMAN_ACCENT : PET_ACCENT;

  const renderCard = ({ item }) => {
    const itemAccent = item.isPet ? PET_ACCENT : HUMAN_ACCENT;
    return (
      <TouchableOpacity
        style={s.bentoCard}
        onPress={() => openDetail(item)}
        activeOpacity={0.85}
      >
        <View style={[s.iconBox, { backgroundColor: itemAccent + '1A' }]}>
          {(item.imagem || item.imagemUrl) ? (
            <ReviewImage
              source={item.imagem || { uri: item.imagemUrl }}
              tint={itemAccent}
              accessibilityLabel={item.titulo}
            />
          ) : item.emoji ? (
            <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
          ) : (
            <NeoIcon name="Heart" size={26} color={itemAccent} variant="Bold" />
          )}
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          <Text style={[s.cardTitle, { color: textPrimary }]} numberOfLines={2}>{item.titulo}</Text>
          <Text style={s.cardSituation} numberOfLines={2}>{item.situacao}</Text>
        </View>
        <View style={s.cardArrow}>
          <NeoIcon name="ArrowRight2" size={14} color={itemAccent} variant="Bold" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <DisclaimerModal visible={showDisclaimer} onClose={() => setShowDisclaimer(false)} />

        {/* HEADER padronizado */}
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <H1 style={s.title}>
              {t('headersFirst.firstAid', 'Primeiros socorros')}
            </H1>
            <Caption style={s.subtitle}>
              {t('headersFirst.respostaRPidaEmEmergNcias', 'Resposta rápida em emergências')}
            </Caption>
          </View>
        </View>

        {/* Hero banner — se veio do hub Pet */}
        {petHero && (
          <PetHeroBanner
            image={petHero.imagem}
            imageUrl={petHero.imagemUrl}
            tint={petHero.cor || PET_ACCENT}
            accessibilityLabel={petHero.titulo}
            marginHorizontal={20}
            marginBottom={12}
            height={120}
          />
        )}

        {/* TABS Pessoas / Pets */}
        <View style={s.tabsWrap}>
          <View style={s.tabsTrack}>
            <TouchableOpacity
              onPress={() => setType('HUMAN')}
              style={[
                s.tabBtn,
                type === 'HUMAN' && { backgroundColor: '#FFF' },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  s.tabText,
                  { color: type === 'HUMAN' ? HUMAN_ACCENT : Neo.colors.neutral[500] },
                ]}
              >
                {t('headersFirst.people', 'Pessoas')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setType('PET')}
              style={[
                s.tabBtn,
                type === 'PET' && { backgroundColor: '#FFF' },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  s.tabText,
                  { color: type === 'PET' ? PET_ACCENT : Neo.colors.neutral[500] },
                ]}
              >
                {t('headersFirst.pets', 'Pets')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BENTO GRID */}
        <FlatList
          data={getData()}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.gridContent}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          showsVerticalScrollIndicator={false}
        />

        {/* DETAIL MODAL */}
        <Modal
          visible={!!selectedItem}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={closeDetail}
        >
          {selectedItem && (
            <View style={{ flex: 1, backgroundColor: '#F5F8F6' }}>
              {/* Modal Header */}
              <View style={s.modalHeader}>
                <View
                  style={[
                    s.modalIconBox,
                    { backgroundColor: (selectedItem.isPet ? PET_ACCENT : HUMAN_ACCENT) + '1A' },
                  ]}
                >
                  {selectedItem.emoji ? (
                    <Text style={s.modalEmoji}>{selectedItem.emoji}</Text>
                  ) : (
                    <NeoIcon
                      name="Heart"
                      size={26}
                      color={selectedItem.isPet ? PET_ACCENT : HUMAN_ACCENT}
                      variant="Bold"
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.modalTitle, { color: textPrimary }]} accessibilityRole="header">{selectedItem.titulo}</Text>
                  <Text style={s.modalSubtitle} numberOfLines={2}>{selectedItem.situacao}</Text>
                </View>
                <TouchableOpacity onPress={closeDetail} style={s.closeBtn}>
                  <NeoIcon name="CloseSquare" size={22} color={Neo.colors.neutral[700]} />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                {selectedItem.isPet ? (
                  <>
                    {/* COMO AGIR (Pet) */}
                    <View style={[s.sectionContainer, { backgroundColor: PET_ACCENT + '10' }]}>
                      <View style={s.sectionHeader}>
                        <NeoIcon name="Lovely" size={18} color={PET_ACCENT} variant="Bold" />
                        <Text style={[s.sectionLabel, { color: PET_ACCENT }]}>
                          {t('headersFirst.cOMOAGIR', 'COMO AGIR')}
                        </Text>
                      </View>
                      {(selectedItem.rawPetData.passos || []).map((step, index) => (
                        <View key={index} style={s.stepRow}>
                          <Text
                            style={[
                              s.stepNumber,
                              { color: step.critico ? HUMAN_ACCENT : PET_ACCENT },
                            ]}
                          >
                            {index + 1}.
                          </Text>
                          <View style={{ flex: 1 }}>
                            <Text style={[s.stepText, { fontWeight: '700' }]}>{step.titulo}</Text>
                            <Text style={[s.stepText, { color: Neo.colors.neutral[700], marginTop: 2 }]}>
                              {step.descricao}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    {/* ATENÇÃO VETERINÁRIA */}
                    <View style={s.alertBoxRed}>
                      <View style={s.alertHeader}>
                        <NeoIcon name="Warning2" size={20} color="#FFF" variant="Bold" />
                        <Text style={s.alertTitle}>
                          {t('headersFirst.aTENOVETERINRIA', 'ATENÇÃO VETERINÁRIA')}
                        </Text>
                      </View>
                      {(selectedItem.rawPetData.alertas || []).map((alerta, idx) => (
                        <Text key={idx} style={s.alertText}>• {alerta}</Text>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    {/* O QUE FAZER */}
                    <View style={[s.sectionContainer, { backgroundColor: PET_ACCENT + '10' }]}>
                      <View style={s.sectionHeader}>
                        <NeoIcon name="TickCircle" size={18} color={PET_ACCENT} variant="Bold" />
                        <Text style={[s.sectionLabel, { color: PET_ACCENT }]}>
                          {t('headersFirst.oQUEFAZER', 'O QUE FAZER')}
                        </Text>
                      </View>
                      {(selectedItem.oQueFazer || []).map((step, index) => (
                        <View key={index} style={s.stepRow}>
                          <Text style={[s.stepNumber, { color: PET_ACCENT }]}>{index + 1}.</Text>
                          <Text style={[s.stepText, { color: textBody }]}>{step}</Text>
                        </View>
                      ))}
                    </View>

                    {/* O QUE NÃO FAZER */}
                    {selectedItem.oQueNaoFazer && (
                      <View style={[s.sectionContainer, { backgroundColor: HUMAN_ACCENT + '10' }]}>
                        <View style={s.sectionHeader}>
                          <NeoIcon name="CloseCircle" size={18} color={HUMAN_ACCENT} variant="Bold" />
                          <Text style={[s.sectionLabel, { color: HUMAN_ACCENT }]}>
                            {t('headersFirst.oQUENOFAZER', 'O QUE NÃO FAZER')}
                          </Text>
                        </View>
                        {selectedItem.oQueNaoFazer.map((step, index) => (
                          <View key={index} style={s.stepRow}>
                            <View style={s.bulletError} />
                            <Text style={[s.stepText, { color: textBody }]}>{step}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </>
                )}

                {/* QUANDO CHAMAR AJUDA (vermelho — urgência justificada) */}
                {selectedItem.quandoChamarAjuda && (
                  <View style={s.alertBoxRed}>
                    <View style={s.alertHeader}>
                      <NeoIcon name="Health" size={20} color="#FFF" variant="Bold" />
                      <Text style={s.alertTitle}>
                        {t('headersFirst.qUANDOCHAMARAJUDA', 'QUANDO CHAMAR AJUDA')}
                      </Text>
                    </View>
                    <Text style={s.alertText}>{selectedItem.quandoChamarAjuda}</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </Modal>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Neo.spacing.lg,
    paddingTop: 4,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
    fontSize: 24,
  },
  subtitle: {
    color: Neo.colors.neutral[600],
  },

  // Tabs pill
  tabsWrap: {
    paddingHorizontal: Neo.spacing.lg,
    marginBottom: 12,
  },
  tabsTrack: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  // Grid
  gridContent: {
    paddingHorizontal: Neo.spacing.lg,
    paddingTop: 4,
    paddingBottom: 190,
    gap: 12,
  },

  // Bento Card
  bentoCard: {
    flex: 1,
    minHeight: 150,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  cardSituation: {
    fontSize: 11.5,
    color: Neo.colors.neutral[600],
    lineHeight: 16,
  },
  cardArrow: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    gap: 12,
    backgroundColor: '#FFF',
  },
  modalIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEmoji: {
    fontSize: 26,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
  },

  // Sections
  sectionContainer: {
    marginBottom: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: '800',
    marginRight: 8,
    width: 22,
  },
  stepText: {
    fontSize: 14.5,
    color: Neo.colors.neutral[900],
    flex: 1,
    lineHeight: 21,
  },
  bulletError: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: HUMAN_ACCENT,
    marginTop: 8,
    marginRight: 12,
  },

  // Alert (vermelho — urgência)
  alertBoxRed: {
    backgroundColor: HUMAN_ACCENT,
    padding: 16,
    borderRadius: 16,
    marginTop: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  alertTitle: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13.5,
    letterSpacing: 0.5,
  },
  alertText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
});
