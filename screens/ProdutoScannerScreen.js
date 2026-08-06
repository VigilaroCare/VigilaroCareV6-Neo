import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import NeoIcon from '../components/NeoIcon';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarProduto, NIVEIS_PERIGO } from '../data/produtos_scanner';
import { getTelefoneCiatox } from '../data/telefones_ciatox';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoAlert from '../utils/NeoAlert';
import { useThemeColors } from '../utils/ThemeContext';

export default function ProdutoScannerScreen({ route, navigation }) {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { codigo } = route.params;
  const produto = buscarProduto(codigo);
  const nivelInfo = NIVEIS_PERIGO[produto.perigo];
  const telefoneCiatox = getTelefoneCiatox('PR');

  const callCIATOX = () => {
    NeoAlert.alert(
      'Ligar para CIATOX',
      `${telefoneCiatox}\n\nDeseja ligar para o Centro de Intoxicação?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ligar Agora', 
          onPress: () => Linking.openURL(`tel:${telefoneCiatox.replace(/\D/g, '')}`)
        },
      ]
    );
  };

  return (
    <AppBackground>
        <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: nivelInfo.cor }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{t('headersFirst.Voltar', '← Voltar')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Produto Info */}
        <View style={[styles.produtoHeader, { backgroundColor: nivelInfo.cor }]}>
          <NeoIcon name={produto.icone || 'TestTube'} size={44} color={Neo.colors.neutral.white} variant="Bold" />
          <Text style={styles.produtoNome}>{produto.nome}</Text>
          <Text style={styles.produtoCategoria}>{produto.categoria}</Text>
          <View style={styles.nivelBadge}>
            <NeoIcon name={nivelInfo.icone || 'Circle'} size={14} color={Neo.colors.neutral.white} variant="Bold" style={{ marginRight: 6 }} />
            <Text style={styles.nivelTexto}>PERIGO: {produto.perigo.toUpperCase()}</Text>
          </View>
        </View>

        {/* Código */}
        <View style={styles.codigoCard}>
          <Text style={styles.codigoLabel}>{t('headersFirst.cDigoDeBarras', 'Código de Barras:')}</Text>
          <Text style={styles.codigoTexto}>{codigo}</Text>
        </View>

        {/* Componentes */}
        {produto.componentes && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="TestTube" size={20} color={colors.neutral[900]} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{t('headersFirst.Componentes', 'Componentes')}</Text>
            </View>
            {produto.componentes.map((comp, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemText}>{comp}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Riscos */}
        <View style={[styles.section, styles.riscosSection]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <NeoIcon name="Warning2" size={20} color={colors.neutral[900]} style={{ marginRight: 8 }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{t('headersFirst.RiscosEPerigos', 'Riscos e Perigos')}</Text>
          </View>
          {produto.riscos.map((risco, index) => (
            <View key={index} style={styles.item}>
              <NeoIcon name="Warning2" size={16} color={Neo.colors.feedback.warning} variant="Bold" />
              <Text style={styles.riscoText}>{risco}</Text>
            </View>
          ))}
        </View>

        {/* Primeiros Socorros */}
        <View style={[styles.section, styles.socorrosSection]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <NeoIcon name="Health" size={20} color={colors.neutral[900]} style={{ marginRight: 8 }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{t('headersFirst.PrimeirosSocorros', 'Primeiros Socorros')}</Text>
          </View>
          
          <View style={styles.socorroItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <NeoIcon name="Drop" size={16} color={colors.feedback.info} style={{ marginRight: 6 }} />
              <Text style={[styles.socorroTitulo, { marginBottom: 0 }]}>{t('headersFirst.SeINGERIU', 'Se INGERIU:')}</Text>
            </View>
            <Text style={styles.socorroTexto}>{produto.primeiros_socorros.ingestao}</Text>
          </View>

          <View style={styles.socorroItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <NeoIcon name="Eye" size={16} color={colors.feedback.info} style={{ marginRight: 6 }} />
              <Text style={[styles.socorroTitulo, { marginBottom: 0 }]}>{t('headersFirst.ContatoComOLHOS', 'Contato com OLHOS:')}</Text>
            </View>
            <Text style={styles.socorroTexto}>{produto.primeiros_socorros.olhos}</Text>
          </View>

          <View style={styles.socorroItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <NeoIcon name="Hand" size={16} color={colors.feedback.info} style={{ marginRight: 6 }} />
              <Text style={[styles.socorroTitulo, { marginBottom: 0 }]}>{t('headersFirst.ContatoComPELE', 'Contato com PELE:')}</Text>
            </View>
            <Text style={styles.socorroTexto}>{produto.primeiros_socorros.pele}</Text>
          </View>

          {produto.primeiros_socorros.inalacao && (
            <View style={styles.socorroItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <NeoIcon name="Wind" size={16} color={colors.feedback.info} style={{ marginRight: 6 }} />
                <Text style={[styles.socorroTitulo, { marginBottom: 0 }]}>{t('headersFirst.INALAO', 'INALAÇÃO:')}</Text>
              </View>
              <Text style={styles.socorroTexto}>{produto.primeiros_socorros.inalacao}</Text>
            </View>
          )}
        </View>

        {/* Prevenção */}
        <View style={[styles.section, styles.prevencaoSection]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <NeoIcon name="ShieldTick" size={20} color={colors.neutral[900]} style={{ marginRight: 8 }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{t('headersFirst.ComoPrevenirAcidentes', 'Como Prevenir Acidentes')}</Text>
          </View>
          {produto.prevencao.map((prev, index) => (
            <View key={index} style={styles.item}>
              <NeoIcon name="TickCircle" size={16} color={Neo.colors.primary[600]} variant="Bold" />
              <Text style={styles.prevText}>{prev}</Text>
            </View>
          ))}
        </View>

        {/* Alerta Importante */}
        <View style={styles.alertaCard}>
          <NeoIcon name="Danger" size={24} color={Neo.colors.feedback.error} variant="Bold" />
          <Text style={styles.alertaTitulo}>{t('headersFirst.iMPORTANTE', 'IMPORTANTE')}</Text>
          <Text style={styles.alertaTexto}>
            {t('headersFirst.emCasoDeAcidenteLigueIMEDIATAMENTEParaOC', `Em caso de acidente, ligue IMEDIATAMENTE para o CIATOX.
            Tenha em mãos a embalagem do produto para informar os componentes.`)}
          </Text>
        </View>

        {/* Botão CIATOX */}
        <TouchableOpacity style={styles.botaoCiatox} onPress={callCIATOX}>
          <NeoIcon name="Call" size={18} color={Neo.colors.neutral.white} variant="Bold" />
          <View style={styles.botaoTextos}>
            <Text style={styles.botaoTitulo}>{t('headersFirst.lIGARPARACIATOX', 'LIGAR PARA CIATOX')}</Text>
            <Text style={styles.botaoSubtitulo}>{telefoneCiatox}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
      </AppBackground>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
  produtoHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  produtoIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  produtoNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  produtoCategoria: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  nivelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  nivelIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  nivelTexto: {
    color: colors.neutral.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  codigoCard: {
    backgroundColor: colors.neutral.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  codigoLabel: {
    fontSize: 14,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  codigoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  section: {
    backgroundColor: colors.neutral.white,
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: colors.neutral[500],
    marginTop: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: colors.neutral[600],
    lineHeight: 22,
  },
  riscosSection: {
    backgroundColor: colors.feedback.error + '1A',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.error,
  },
  riscoText: {
    flex: 1,
    fontSize: 15,
    color: colors.feedback.error,
    lineHeight: 22,
    fontWeight: '500',
  },
  socorrosSection: {
    backgroundColor: colors.feedback.info + '1A',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.info,
  },
  socorroItem: {
    marginBottom: 12,
  },
  socorroTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.feedback.info,
    marginBottom: 4,
  },
  socorroTexto: {
    fontSize: 14,
    color: colors.neutral[700],
    lineHeight: 20,
  },
  prevencaoSection: {
    backgroundColor: colors.feedback.success + '1A',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.success,
  },
  prevText: {
    flex: 1,
    fontSize: 15,
    color: colors.neutral[700],
    lineHeight: 22,
  },
  alertaCard: {
    backgroundColor: colors.feedback.warning + '1A',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.warning,
    alignItems: 'center',
  },
  alertaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.feedback.warning,
    marginBottom: 8,
  },
  alertaTexto: {
    fontSize: 14,
    color: colors.feedback.warning,
    textAlign: 'center',
    lineHeight: 20,
  },
  botaoCiatox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Neo.emergency?.panic || colors.feedback.error,
    marginHorizontal: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
  },
  botaoTextos: {
    flex: 1,
  },
  botaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.neutral.white,
    marginBottom: 4,
  },
  botaoSubtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
});


