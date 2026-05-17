import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarProduto, NIVEIS_PERIGO } from '../data/produtos_scanner';
import { getTelefoneCiatox } from '../data/telefones_ciatox';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';

export default function ProdutoScannerScreen({ route, navigation }) {
    const { t } = useTranslation('common');
  const { codigo } = route.params;
  const produto = buscarProduto(codigo);
  const nivelInfo = NIVEIS_PERIGO[produto.perigo];
  const telefoneCiatox = getTelefoneCiatox('PR');

  const callCIATOX = () => {
    Alert.alert(
      '📞 Ligar para CIATOX',
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
          <Text style={styles.produtoIcon}>{produto.icone}</Text>
          <Text style={styles.produtoNome}>{produto.nome}</Text>
          <Text style={styles.produtoCategoria}>{produto.categoria}</Text>
          <View style={styles.nivelBadge}>
            <Text style={styles.nivelIcon}>{nivelInfo.icone}</Text>
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
            <Text style={styles.sectionTitle}>{t('headersFirst.Componentes', '🧪 Componentes')}</Text>
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
          <Text style={styles.sectionTitle}>{t('headersFirst.RiscosEPerigos', '⚠️ Riscos e Perigos')}</Text>
          {produto.riscos.map((risco, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.riscoBullet}>⚠</Text>
              <Text style={styles.riscoText}>{risco}</Text>
            </View>
          ))}
        </View>

        {/* Primeiros Socorros */}
        <View style={[styles.section, styles.socorrosSection]}>
          <Text style={styles.sectionTitle}>{t('headersFirst.PrimeirosSocorros', '🩹 Primeiros Socorros')}</Text>
          
          <View style={styles.socorroItem}>
            <Text style={styles.socorroTitulo}>{t('headersFirst.SeINGERIU', '💧 Se INGERIU:')}</Text>
            <Text style={styles.socorroTexto}>{produto.primeiros_socorros.ingestao}</Text>
          </View>

          <View style={styles.socorroItem}>
            <Text style={styles.socorroTitulo}>{t('headersFirst.ContatoComOLHOS', '👁️ Contato com OLHOS:')}</Text>
            <Text style={styles.socorroTexto}>{produto.primeiros_socorros.olhos}</Text>
          </View>

          <View style={styles.socorroItem}>
            <Text style={styles.socorroTitulo}>{t('headersFirst.ContatoComPELE', '✋ Contato com PELE:')}</Text>
            <Text style={styles.socorroTexto}>{produto.primeiros_socorros.pele}</Text>
          </View>

          {produto.primeiros_socorros.inalacao && (
            <View style={styles.socorroItem}>
              <Text style={styles.socorroTitulo}>{t('headersFirst.INALAO', '💨 INALAÇÃO:')}</Text>
              <Text style={styles.socorroTexto}>{produto.primeiros_socorros.inalacao}</Text>
            </View>
          )}
        </View>

        {/* Prevenção */}
        <View style={[styles.section, styles.prevencaoSection]}>
          <Text style={styles.sectionTitle}>{t('headersFirst.ComoPrevenirAcidentes', '🛡️ Como Prevenir Acidentes')}</Text>
          {produto.prevencao.map((prev, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.prevBullet}>✓</Text>
              <Text style={styles.prevText}>{prev}</Text>
            </View>
          ))}
        </View>

        {/* Alerta Importante */}
        <View style={styles.alertaCard}>
          <Text style={styles.alertaIcon}>🚨</Text>
          <Text style={styles.alertaTitulo}>{t('headersFirst.iMPORTANTE', 'IMPORTANTE')}</Text>
          <Text style={styles.alertaTexto}>
            {t('headersFirst.emCasoDeAcidenteLigueIMEDIATAMENTEParaOC', `Em caso de acidente, ligue IMEDIATAMENTE para o CIATOX.
            Tenha em mãos a embalagem do produto para informar os componentes.`)}
          </Text>
        </View>

        {/* Botão CIATOX */}
        <TouchableOpacity style={styles.botaoCiatox} onPress={callCIATOX}>
          <Text style={styles.botaoIcon}>📞</Text>
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

const styles = StyleSheet.create({
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  codigoCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  codigoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  codigoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#666',
    marginTop: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  riscosSection: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  riscoBullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#F44336',
    marginTop: 2,
  },
  riscoText: {
    flex: 1,
    fontSize: 15,
    color: '#C62828',
    lineHeight: 22,
    fontWeight: '500',
  },
  socorrosSection: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  socorroItem: {
    marginBottom: 12,
  },
  socorroTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
  },
  socorroTexto: {
    fontSize: 14,
    color: '#01579B',
    lineHeight: 20,
  },
  prevencaoSection: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  prevBullet: {
    fontSize: 18,
    marginRight: 8,
    color: '#4CAF50',
    marginTop: 2,
  },
  prevText: {
    flex: 1,
    fontSize: 15,
    color: '#2E7D32',
    lineHeight: 22,
  },
  alertaCard: {
    backgroundColor: '#FFF8E1',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    alignItems: 'center',
  },
  alertaIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  alertaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57F17',
    marginBottom: 8,
  },
  alertaTexto: {
    fontSize: 14,
    color: '#F57F17',
    textAlign: 'center',
    lineHeight: 20,
  },
  botaoCiatox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    marginHorizontal: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  botaoIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  botaoTextos: {
    flex: 1,
  },
  botaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  botaoSubtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});


