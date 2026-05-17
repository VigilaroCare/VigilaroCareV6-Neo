import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft, Book1, Star1, TickCircle, CloseCircle,
  Note, SearchNormal1, Health, InfoCircle, Warning2, ShieldTick, Pet, User
} from 'iconsax-react-native';
import { Shadows } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, H2, H3, Body, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { t_field, t_array, t_object } from '../../utils/getLocalizedField';

export default function ConceitoDetailScreen({ route, navigation }) {
  const { t } = useTranslation('common');
  const { conceito } = route.params;

  // Determine Icon/Emoji/Image to show
  const HeroIcon = conceito.icon;
  const HeroEmoji = conceito.emoji;
  const HeroImage = conceito.imagem; // Support for Image (require or uri)

  // Default blue if not provided
  const HeroColor = conceito.iconColor || conceito.color || '#3B82F6';
  const HeroBg = conceito.bg || (HeroColor + '20') || '#EFF6FF';

  const renderList = (items, bulletColor = '#374151') => {
    if (!items) return null;
    if (typeof items === 'string') return <Text style={[styles.text, { color: Neo.colors.neutral[700], fontSize: 16 }]}>{items}</Text>;
    if (Array.isArray(items)) {
      return items.map((item, index) => (
        <View key={index} style={styles.listItem}><View style={[styles.bullet, { backgroundColor: bulletColor }]} /><Text style={[styles.text, { color: Neo.colors.neutral[700], fontSize: 16 }]}>{item}</Text></View>
      ));
    }
    if (typeof items === 'object') {
      return Object.entries(items).map(([key, value], index) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        return (
          <View key={key} style={{ marginBottom: 16 }}><Text style={{ fontWeight: '700', color: bulletColor, marginBottom: 8, fontSize: 14 }}>{label}:</Text>{renderList(value, bulletColor)}</View>
        );
      });
    }
    return null;
  };

  const renderSection = (title, content, IconComp, color = Neo.colors.neutral[800]) => {
    if (!content) return null;
    const hasItems = Array.isArray(content) ? content.length > 0 : (typeof content === 'object' ? Object.keys(content).length > 0 : !!content);
    if (!hasItems) return null;
    return (
      <View style={styles.sectionContainer} key={title}><View style={styles.sectionHeader}>{IconComp && <IconComp size={24} color={color} variant="Bold" style={{ marginRight: 8 }} />}<H3 style={{ color }}>{title}</H3></View><NeoCard variant="glass" style={styles.cardContent}>{renderList(content, color)}</NeoCard></View>
    );
  };

  const renderFirstAid = (socorros) => {
    if (!socorros) return null;
    if (Array.isArray(socorros) || typeof socorros === 'string') return renderSection(t('detail.firstAid', 'Primeiros Socorros'), socorros, Health, '#EF4444');
    return (
      <View key="first_aid_complex">{socorros.fazer && renderSection(t('detail.whatToDo', 'O que Fazer'), socorros.fazer, TickCircle, '#10B981')}{socorros.naoFazer && renderSection(t('detail.whatNotToDo', 'O que NÃO Fazer'), socorros.naoFazer, CloseCircle, '#EF4444')}</View>
    );
  };

  const renderMarkdown = (markdown) => {
    if (!markdown) return null;
    const lines = markdown.split('\n');
    return (
      <NeoCard variant="glass" style={styles.card}><View style={styles.cardHeader}><Book1 size={24} color={HeroColor} variant="Bold" /><H3 style={styles.cardTitle}>{t('detail.completeGuide', 'Guia Completo')}</H3></View>{lines.map((line, index) => {
          const trimmed = line.trim();
          if (!trimmed) return <View key={index} style={{ height: 8 }} />;
          if (trimmed.startsWith('# ')) return <H2 key={index} style={[styles.mdH1, { color: HeroColor, marginTop: 16, marginBottom: 8 }]}>{trimmed.substring(2)}</H2>;
          if (trimmed.startsWith('## ')) return <H3 key={index} style={[styles.mdH2, { color: Neo.colors.neutral[800], marginTop: 12, marginBottom: 4 }]}>{trimmed.substring(3)}</H3>;
          if (trimmed.startsWith('### ')) return <H3 key={index} style={[styles.mdH3, { color: Neo.colors.neutral[700], marginTop: 8, marginBottom: 4, fontSize: 16 }]}>{trimmed.substring(4)}</H3>;
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) return (<View key={index} style={styles.listItem}><View style={[styles.bullet, { backgroundColor: HeroColor }]} /><Text style={styles.text}>{trimmed.substring(2)}</Text></View>);
          return <Text key={index} style={[styles.text, { marginBottom: 4 }]}>{trimmed}</Text>;
        })}</NeoCard>
    );
  };

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><ArrowLeft size={28} color={Neo.colors.neutral[800]} /></TouchableOpacity></View>
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 240 }]} showsVerticalScrollIndicator={false}>
          <View style={styles.heroSection}>
              {HeroImage ? (
                  <View style={[styles.heroImageBanner, { ...Neo.shadows.md }]}>
                      <Image source={HeroImage} style={styles.heroImageLarge} resizeMode="cover" />
                  </View>
              ) : (
                  <View style={[styles.heroIconContainer, { backgroundColor: HeroBg }]}>
                      {HeroIcon && typeof HeroIcon === 'string' ? (
                          <NeoIcon name={HeroIcon} size={64} color={HeroColor} variant="Bold" />
                      ) : HeroIcon ? (
                          <HeroIcon size={64} color={HeroColor} variant="Bold" />
                      ) : (
                          <Text style={{ fontSize: 64 }}>{HeroEmoji || '📝'}</Text>
                      )}
                  </View>
              )}
              <H1 style={styles.heroTitle}>{t_field(conceito, 'titulo') || t_field(conceito, 'nomePopular') || t_field(conceito, 'nome') || t('detail.details', 'Detalhes')}</H1>
              {(t_field(conceito, 'nomeCientifico') || t_field(conceito, 'subtitulo')) && (<Text style={[styles.heroSubtitle, { color: Neo.colors.neutral[500], textAlign: 'center', fontStyle: 'italic' }]}>{t_field(conceito, 'nomeCientifico') || t_field(conceito, 'subtitulo')}</Text>)}
              {(t_field(conceito, 'nivelPerigo') || t_field(conceito, 'nivelToxicidade')) && (<View style={[styles.badge, { backgroundColor: 'rgba(239, 68, 68, 0.1)', marginTop: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' }]}><Warning2 size={16} color="#EF4444" variant="Bold" /><Text style={{ color: '#EF4444', fontWeight: 'bold', marginLeft: 6 }}>{t_field(conceito, 'nivelPerigo') || t_field(conceito, 'nivelToxicidade')}</Text></View>)}
          </View>
          {(t_field(conceito, 'definicao') || t_field(conceito, 'descricao')) && (<NeoCard variant="glass" style={styles.card}><View style={styles.cardHeader}><Book1 size={24} color={HeroColor} variant="Bold" /><H3 style={styles.cardTitle}>{t_field(conceito, 'definicao') ? t('detail.definition', 'Definição') : t('detail.description', 'Descrição')}</H3></View><Text style={styles.text}>{t_field(conceito, 'definicao') || t_field(conceito, 'descricao')}</Text></NeoCard>)}
          {t_field(conceito, 'conteudo') && renderMarkdown(t_field(conceito, 'conteudo'))}
          {renderSection(t('detail.toxicParts', 'Partes Tóxicas'), t_array(conceito, 'partesToxicas'), Warning2, '#F59E0B')}
          {renderSection(t('detail.humanSymptoms', 'Sintomas em Humanos'), t_array(conceito, 'sintomasHumanos'), User, '#EF4444')}
          {renderSection(t('detail.petSymptoms', 'Sintomas em Pets'), t_array(conceito, 'sintomasPets'), Pet, '#F97316')}
          {renderSection(t('detail.generalSymptoms', 'Sintomas Gerais'), t_object(conceito, 'sintomas'), Health, '#EF4444')}
          {renderSection(t('detail.whereFound', '📍 Onde é Encontrado'), t_field(conceito, 'ondeEncontrada'), InfoCircle, '#6366F1')}
          {renderSection(t('detail.safeAlternatives', '🌱 Alternativas Seguras'), t_array(conceito, 'alternativasSeguras'), ShieldTick, '#10B981')}
          {renderSection(t('detail.howToPrevent', 'Como Evitar / Prevenir'), t_array(conceito, 'comoEvitar') || t_array(conceito, 'prevencao'), ShieldTick, '#10B981')}
          {t_field(conceito, 'importancia') && (<NeoCard variant="glass" style={[styles.card, { borderColor: 'rgba(37, 99, 235, 0.2)' }]}><View style={styles.cardHeader}><Star1 size={24} color="#2563EB" variant="Bold" /><H3 style={[styles.cardTitle, { color: '#1E40AF' }]}>{t('detail.importance', 'Importância')}</H3></View><Text style={[styles.text, { color: '#1E3A8A' }]}>{t_field(conceito, 'importancia')}</Text></NeoCard>)}
          {renderSection(t('detail.practicalExamples', 'Exemplos Práticos'), t_array(conceito, 'exemplos'), Note, '#6366F1')}
          {renderSection(t('detail.identification', 'Identificação'), t_array(conceito, 'comoIdentificar') || t_array(conceito, 'caracteristicas'), SearchNormal1, '#8B5CF6')}
          {renderFirstAid(t_object(conceito, 'primeirosSocorros') || t_array(conceito, 'oQueFazer') || t_field(conceito, 'oQueFazer'))}
          {renderSection(t('detail.whatNotToDo', 'O que NÃO fazer'), t_array(conceito, 'oQueNaoFazer'), CloseCircle, '#DC2626')}
          {t_field(conceito, 'estatisticas') && (<NeoCard variant="glass" style={[styles.card, { marginTop: 12 }]}><View style={styles.cardHeader}><InfoCircle size={24} color={Neo.colors.neutral[500]} variant="Bold" /><H3 style={styles.cardTitle}>{t('detail.dataStats', 'Dados & Estatísticas')}</H3></View><Text style={styles.text}>{t_field(conceito, 'estatisticas')}</Text></NeoCard>)}
          {renderSection(t('detail.curiosities', 'Curiosidades'), t_array(conceito, 'curiosidades'), Star1, '#F59E0B')}
          <View style={{ height: 80 }} />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginLeft: -8,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden'
  },
  heroImageBanner: {
    width: '100%',
    height: 260,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#F3F4F6',
  },
  heroImageLarge: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: Neo.colors.neutral[500],
    textAlign: 'center',
    fontStyle: 'italic'
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardContent: {
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12
  },
  cardTitle: {
    color: Neo.colors.neutral[800],
  },
  text: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 9,
    marginRight: 12,
  },
  mdH1: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28
  },
  mdH2: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26
  },
  mdH3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24
  }
});
