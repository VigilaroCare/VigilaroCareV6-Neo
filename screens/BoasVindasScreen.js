import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, ScrollView, Dimensions } from "react-native";
import NeoIcon from '../components/NeoIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfileService from "../services/ProfileService";
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { getLocalizedLogo } from '../utils/getLocalizedLogo';

export default function BoasVindasScreen({ navigation }) {
  const { t } = useTranslation('common');
  const [accepted, setAccepted] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);
  const [scrolledToBottom, setScrolledToBottom] = React.useState(false);

  // Acessibilidade rápida logo no início (Inclusão by Design)
  const openAccessibility = () => {
    navigation.navigate('AccessibilitySettings');
  };

  const iniciar = async () => {
    if (!accepted) return;

    try {
      const completo = await ProfileService.isOnboardingCompleto();
      const perfis = await ProfileService.getPerfis();
      const activeResId = await ProfileService.getActiveResidenceId();

      if (completo && perfis.length > 0) {
        navigation.replace("MainTabs");
      } else {
        // Fluxo direto: Mapeamento Doméstico
        navigation.replace("NewHomeWizard", {
          fromOnboarding: true,
          residenceId: activeResId
        });
      }

    } catch (error) {
      console.log("Erro ao validar perfis:", error);
      navigation.replace("MapeamentoRiscos", { isOnboarding: true });
    }
  };

  return (
    <AppBackground>
        <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Botão de Acessibilidade (Canto Direito Superior) */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.acessibilidadeBtn}
          onPress={openAccessibility}
          accessibilityLabel={t('welcome.accessibilityLabel')}
          accessibilityRole="button"
        >
          <NeoIcon name="Eye" size={24} color="#1A73E8" />
          <Text style={styles.acessibilidadeText}>{t('welcome.accessibility')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={getLocalizedLogo()}
          style={{ width: 220, height: 80, marginBottom: 20 }}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>{t('welcome.title')}</Text>
        <Text style={styles.subtitulo}>
          Para transformar sua casa em um refúgio seguro e aplicar a Prevenção 3D, precisamos conhecer quem mora com você e o seu espaço.
        </Text>

        {/* LGPD Consent */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => {
            if (!accepted) {
                setScrolledToBottom(false);
                setShowTermsModal(true);
            } else {
                setAccepted(false);
            }
          }}
          activeOpacity={0.8}
        >
          <NeoIcon
            name={accepted ? 'TickSquare' : 'Stop'}
            size={22}
            color={accepted ? '#1A73E8' : '#999'}
            variant={accepted ? 'Bold' : 'Linear'}
          />
          <Text style={styles.checkboxText}>
            Ler e concordar com os{' '}
            <Text style={styles.linkText}>Termos de Uso</Text>
            {' '}e{' '}
            <Text style={styles.linkText}>Política de Privacidade</Text>.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: accepted ? 1 : 0.5, backgroundColor: accepted ? "#1A73E8" : "#999" }]}
          onPress={iniciar}
          disabled={!accepted}
        >
          <Text style={styles.buttonText}>Iniciar Mapeamento Doméstico</Text>
          <NeoIcon name="ArrowRight2" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* TERMOS E CONDIÇÕES MODAL (SCROLL OBRIGATÓRIO) */}
      <Modal visible={showTermsModal} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 24 }}>
            <View style={{ backgroundColor: Neo.colors.neutral[0] || '#FFF', borderRadius: 20, padding: 24, maxHeight: '80%', ...Neo.shadows.lg }}>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <NeoIcon name="ShieldTick" size={28} color={Neo.colors.primary[600]} />
                  <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 12, color: Neo.colors.neutral[900] }}>
                    Termos e Privacidade
                  </Text>
              </View>
              
              <ScrollView
                style={{ maxHeight: Dimensions.get('window').height * 0.45 }}
                onScroll={(e) => {
                  const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
                  // Tolera 20px de margem
                  if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20) {
                    setScrolledToBottom(true);
                  }
                }}
                onContentSizeChange={(w, h) => {
                    const maxHeight = Dimensions.get('window').height * 0.45;
                    if (h <= maxHeight) {
                        setScrolledToBottom(true);
                    }
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
              >
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, color: Neo.colors.neutral[800] }}>1. Natureza Informativa</Text>
                  <Text style={{ marginBottom: 10, color: Neo.colors.neutral[600], lineHeight: 22 }}>O aplicativo Vigilaro Care é uma ferramenta de auxílio e prevenção. Todo o conteúdo tem caráter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.</Text>
                  
                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, color: Neo.colors.neutral[800] }}>2. Não Substitui Profissionais</Text>
                  <Text style={{ marginBottom: 10, color: Neo.colors.neutral[600], lineHeight: 22 }}>As informações aqui contidas NÃO substituem o diagnóstico ou aconselhamento por profissionais de saúde.</Text>

                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, color: Neo.colors.neutral[800] }}>3. Privacidade e LGPD</Text>
                  <Text style={{ marginBottom: 10, color: Neo.colors.neutral[600], lineHeight: 22 }}>Seus dados ficam EXCLUSIVAMENTE NA MEMÓRIA DO SEU DISPOSITIVO. Não coletamos dados sensíveis para servidores externos.</Text>

                  <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, color: Neo.colors.neutral[800] }}>4. Isenção de Responsabilidade</Text>
                  <Text style={{ marginBottom: 10, color: Neo.colors.neutral[600], lineHeight: 22 }}>Os desenvolvedores não se responsabilizam por quaisquer danos ou lesões resultantes do uso das informações do aplicativo.</Text>

                  {!scrolledToBottom && (
                      <Text style={{ color: Neo.colors.neutral[400], marginTop: 24, textAlign: 'center', fontStyle: 'italic' }}>
                          Role até o final para aceitar os termos.
                      </Text>
                  )}
              </ScrollView>

              <TouchableOpacity 
                style={{ 
                    backgroundColor: scrolledToBottom ? Neo.colors.primary[600] : Neo.colors.neutral[300], 
                    padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 
                }}
                disabled={!scrolledToBottom}
                onPress={() => {
                  setAccepted(true);
                  setShowTermsModal(false);
                }}
              >
                <Text style={{ color: scrolledToBottom ? '#FFF' : Neo.colors.neutral[500], fontWeight: 'bold', fontSize: 16 }}>
                    {scrolledToBottom ? 'Li e Concordo' : 'Role para continuar'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={{ marginTop: 16, alignItems: 'center', padding: 8 }} onPress={() => setShowTermsModal(false)}>
                <Text style={{ color: Neo.colors.neutral[500], fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
      </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-end', // Botão à direita
  },
  acessibilidadeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBDEFB'
  },
  acessibilidadeText: {
    fontSize: 12,
    color: '#1565C0',
    fontWeight: '600',
    marginLeft: 6,
    marginRight: 4
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: -40 // Compensar topBar visualmente
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: '#333'
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#555',
    flex: 1,
    lineHeight: 18
  },
  linkText: {
    fontWeight: 'bold',
    color: '#1A73E8'
  },
  button: {
    backgroundColor: "#1A73E8",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
