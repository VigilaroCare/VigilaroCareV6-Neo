import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import CustomIcon from '../../components/CustomIcon';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';

export default function PlantaDetailScreen({ route, navigation }) {
    const { t } = useTranslation('common');
  const { theme } = useTheme();
  const { planta } = route.params;

  const callEmergency = () => {
    Linking.openURL('tel:08007226001'); // Centro de Intoxicação
  };

  const getNivelPerigo = (nivel) => {
    const niveis = {
      'Muito Alto': { cor: Neo.colors.feedback.error, emoji: '🔴', texto: 'MUITO PERIGOSA' },
      'Alto': { cor: Neo.colors.feedback.error, emoji: '🔴', texto: 'PERIGOSA' },
      'Médio': { cor: Neo.colors.feedback.warning, emoji: '🟡', texto: 'CUIDADO' },
      'Baixo': { cor: Neo.colors.feedback.success, emoji: '🟢', texto: 'BAIXO RISCO' },
    };
    return niveis[nivel] || niveis['Médio'];
  };

  const nivelInfo = getNivelPerigo(planta.nivelPerigo);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header com Imagem e Nome */}
      <View style={[styles.header, { backgroundColor: nivelInfo.cor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
        </TouchableOpacity>

        {planta.imagem ? (
          <Image
            source={planta.imagem}
            style={styles.plantaImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.plantaEmoji}>{planta.emoji}</Text>
        )}
        <Text style={styles.plantaNome}>{planta.nomePopular}</Text>

        <View style={styles.nivelBadge}>
          <Text style={styles.nivelEmoji}>{nivelInfo.emoji}</Text>
          <Text style={styles.nivelTexto}>{nivelInfo.texto}</Text>
        </View>
      </View>

      {/* Alerta de Emergência */}
      <TouchableOpacity style={styles.emergencyButton} onPress={callEmergency}>
        <NeoIcon name="Call" size={32} color={Neo.colors.feedback.error} style={{ marginRight: 12 }} />
        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyTitle}>{t('headersFirst.iNTOXICAO', 'INTOXICAÇÃO?')}</Text>
          <Text style={styles.emergencySubtitle}>{t('headersFirst.ligueImediatamente08007226001', 'Ligue imediatamente: 0800 722 6001')}</Text>
        </View>
      </TouchableOpacity>

      {/* Descrição */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('headersFirst.DescriO', '📋 Descrição')}
        </Text>
        <Text style={[styles.descriptionText, { color: theme.text }]}>
          {planta.descricao}
        </Text>
      </View>

      {/* Partes Tóxicas */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('headersFirst.PartesTXicas', '☣️ Partes Tóxicas')}
        </Text>
        <View style={styles.tagContainer}>
          {(planta.partesToxicas || []).map((parte, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{parte}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Sintomas em Humanos */}
      <View style={styles.warningSection}>
        <Text style={styles.warningSectionTitle}>
          {t('headersFirst.SintomasEmHumanos', '👤 Sintomas em Humanos')}
        </Text>
        {(planta.sintomasHumanos || []).map((sintoma, index) => (
          <View key={index} style={styles.sintomaItem}>
            <Text style={styles.sintomaIcon}>•</Text>
            <Text style={styles.sintomaText}>{sintoma}</Text>
          </View>
        ))}
      </View>

      {/* Sintomas em Pets */}
      {planta.sintomasPets && (
        <View style={styles.petsSection}>
          <Text style={styles.petsSectionTitle}>
            {t('headersFirst.SintomasEmPetsCEsEGatos', '🐾 Sintomas em Pets (Cães e Gatos)')}
          </Text>
          {(planta.sintomasPets || []).map((sintoma, index) => (
            <View key={index} style={styles.sintomaItem}>
              <Text style={styles.sintomaIcon}>•</Text>
              <Text style={styles.sintomaText}>{sintoma}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Primeiros Socorros */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('headersFirst.PrimeirosSocorros', '🏥 Primeiros Socorros')}
        </Text>
        <View style={styles.primeirosSocorrosContainer}>
          <Text style={styles.doTitle}>{t('headersFirst.OQUEFAZER', '✅ O QUE FAZER:')}</Text>
          {(planta.primeirosSocorros?.fazer || []).map((item, index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionNumber}>{index + 1}</Text>
              <Text style={[styles.actionText, { color: theme.text }]}>{item}</Text>
            </View>
          ))}

          <Text style={styles.dontTitle}>{t('headersFirst.OQUENOFAZER', '❌ O QUE NÃO FAZER:')}</Text>
          {(planta.primeirosSocorros?.naoFazer || []).map((item, index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionIcon}>✖</Text>
              <Text style={[styles.actionText, { color: theme.text }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Características de Identificação */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('headersFirst.ComoIdentificar', '🔍 Como Identificar')}
        </Text>
        {(planta.caracteristicas || []).map((caracteristica, index) => (
          <View key={index} style={styles.caracteristicaItem}>
            <Text style={styles.caracteristicaIcon}>▪</Text>
            <Text style={[styles.caracteristicaText, { color: theme.text }]}>
              {caracteristica}
            </Text>
          </View>
        ))}
      </View>

      {/* Onde é Encontrada */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('headersFirst.OndeEncontrada', '📍 Onde é Encontrada')}
        </Text>
        <Text style={[styles.localizacaoText, { color: theme.text }]}>
          {planta.ondeEncontrada}
        </Text>
      </View>

      {/* Alternativas Seguras */}
      {planta.alternativasSeguras && (
        <View style={styles.alternativasSection}>
          <Text style={styles.alternativasTitle}>
            {t('headersFirst.AlternativasSeguras', '🌱 Alternativas Seguras')}
          </Text>
          <Text style={styles.alternativasSubtitle}>
            {t('headersFirst.considereSubstituirPorEstasPlantasNOTXic', 'Considere substituir por estas plantas não-tóxicas:')}
          </Text>
          {planta.alternativasSeguras.map((alt, index) => (
            <View key={index} style={styles.alternativaItem}>
              <Text style={styles.alternativaEmoji}>✓</Text>
              <Text style={styles.alternativaText}>{alt}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Dicas de Prevenção */}
      <View style={styles.prevencaoSection}>
        <Text style={styles.prevencaoTitle}>
          {t('headersFirst.ComoPrevenir', '🛡️ Como Prevenir')}
        </Text>
        <Text style={styles.prevencaoText}>
          {t('headersFirst.MantenhaAPlantaForaDoAlcanceDeCrianAsEPe', '• Mantenha a planta fora do alcance de crianças e pets')}
        </Text>
        <Text style={styles.prevencaoText}>
          {t('headersFirst.EnsineCrianAsANOTocarOuComerPlantas', '• Ensine crianças a não tocar ou comer plantas')}
        </Text>
        <Text style={styles.prevencaoText}>
          {t('headersFirst.UseLuvasAoManusearAPlanta', '• Use luvas ao manusear a planta')}
        </Text>
        <Text style={styles.prevencaoText}>
          {t('headersFirst.ConsidereRemovLaSeHouverCrianAsPequenasO', '• Considere removê-la se houver crianças pequenas ou pets')}
        </Text>
        <Text style={styles.prevencaoText}>
          {t('headersFirst.MantenhaONMeroDoCentroDeIntoxicaOSalvo08', '• Mantenha o número do Centro de Intoxicação salvo: 0800 722 6001')}
        </Text>
      </View>

      {/* Botão de Emergência Final */}
      <TouchableOpacity
        style={styles.finalEmergencyButton}
        onPress={callEmergency}
      >
        <Text style={styles.finalEmergencyIcon}>☎️</Text>
        <Text style={styles.finalEmergencyText}>
          {t('headersFirst.lIGARPARACENTRODEINTOXICAO', 'LIGAR PARA CENTRO DE INTOXICAÇÃO')}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 60, // Added padding for status bar
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  plantaEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  plantaImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Neo.colors.neutral.white,
    marginBottom: 16,
  },
  plantaNome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Neo.colors.neutral.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  plantaNomeCientifico: {
    fontSize: 16,
    color: Neo.colors.neutral.white,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  nivelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  nivelEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  nivelTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emergencyButton: {
    backgroundColor: Neo.colors.feedback.error,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  emergencyIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Neo.colors.neutral.white,
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  section: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Neo.colors.feedback.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: Neo.colors.neutral.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  warningSection: {
    backgroundColor: Neo.colors.feedback.error + '15',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Neo.colors.feedback.error,
  },
  warningSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Neo.colors.feedback.error,
    marginBottom: 12,
  },
  petsSection: {
    backgroundColor: Neo.colors.feedback.warning + '15',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Neo.colors.feedback.warning,
  },
  petsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Neo.colors.feedback.warning,
    marginBottom: 12,
  },
  sintomaItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  sintomaIcon: {
    fontSize: 18,
    marginRight: 8,
    color: Neo.colors.feedback.error,
  },
  sintomaText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Neo.colors.neutral[800],
  },
  primeirosSocorrosContainer: {
    gap: 12,
  },
  doTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Neo.colors.feedback.success,
    marginTop: 8,
    marginBottom: 8,
  },
  dontTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Neo.colors.feedback.error,
    marginTop: 16,
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  actionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Neo.colors.feedback.success,
    color: Neo.colors.neutral.white,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 8,
    color: Neo.colors.feedback.error,
  },
  actionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  caracteristicaItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  caracteristicaIcon: {
    fontSize: 16,
    marginRight: 8,
    color: Neo.colors.secondary[500],
  },
  caracteristicaText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  localizacaoText: {
    fontSize: 15,
    lineHeight: 22,
  },
  alternativasSection: {
    backgroundColor: Neo.colors.feedback.success + '15',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Neo.colors.feedback.success,
  },
  alternativasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Neo.colors.primary[700],
    marginBottom: 8,
  },
  alternativasSubtitle: {
    fontSize: 14,
    color: Neo.colors.primary[600],
    marginBottom: 12,
  },
  alternativaItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  alternativaEmoji: {
    fontSize: 18,
    marginRight: 8,
    color: Neo.colors.feedback.success,
  },
  alternativaText: {
    fontSize: 15,
    color: Neo.colors.primary[700],
  },
  prevencaoSection: {
    backgroundColor: Neo.colors.secondary[100],
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Neo.colors.secondary[500],
  },
  prevencaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Neo.colors.secondary[500],
    marginBottom: 12,
  },
  prevencaoText: {
    fontSize: 15,
    color: Neo.colors.secondary[500],
    marginBottom: 6,
    lineHeight: 22,
  },
  finalEmergencyButton: {
    backgroundColor: Neo.colors.feedback.error,
    margin: 16,
    marginTop: 0,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  finalEmergencyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  finalEmergencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Neo.colors.neutral.white,
  },
  footer: {
    height: 32,
  },
});


