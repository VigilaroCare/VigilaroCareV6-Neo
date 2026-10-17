import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../utils/getLocalizedField';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import ReviewImage from '../components/ReviewImage';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Shadows } from '../utils/Theme';
import {
  TEXTOS_MOBILIDADE,
  DISPOSITIVOS_RETENCAO,
  MOBILIDADE_ATIVA,
  SEGURANCA_PEDESTRE,
  SEGURANCA_MOTO,
  MICROMOBILIDADE_ELETRICA,
  getDispositivoPorIdade
} from '../data/mobilidade_data';
import { resolveEmergencyTokens, getEmergencyCountry } from '../utils/emergencyTokens';

// Textos da tela no idioma do usuario. A LEI vem por token, pelo PAIS
// (data/regrasTransitoPorPais.js) — D19: antes a tela mostrava CTB, CNH,
// SAMU 192 e PRF 191 em qualquer pais.
const tx = (campo, vars) => {
  let s = t_field(TEXTOS_MOBILIDADE, campo);
  if (vars && typeof s === 'string') Object.entries(vars).forEach(([k, v]) => { s = s.split(`{${k}}`).join(String(v)); });
  return s;
};
const lei = (token) => resolveEmergencyTokens(`{{${token}}}`);
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

const { width } = Dimensions.get('window');

export default function MobilidadeSeguraScreen({ navigation }) {
    const { t } = useTranslation('common');
  const [tabAtiva, setTabAtiva] = useState('drv'); // drv, ativa, pedestre, moto
  const insets = useSafeAreaInsets();
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(themeColors, isDark), [themeColors, isDark]);
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];
  const cardBg = isDark ? themeColors.neutral[200] : themeColors.neutral.white;

  const abas = tx('abas') || {};
  const TABS = [
    { id: 'drv', label: abas.drv, iconName: 'Car' },
    { id: 'ativa', label: abas.ativa, iconName: 'Bicycle' },
    { id: 'pedestre', label: abas.pedestre, iconName: 'Pedestrian' },
    { id: 'moto', label: abas.moto, iconName: 'Motorcycle' },
    { id: 'eletrica', label: abas.eletrica, iconName: 'Lightning' },
  ];

  return (
    <AppBackground>
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* Header Neo Glass */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: isDark ? 'rgba(28,28,30,0.4)' : 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)' }}
            accessibilityRole="button"
            accessibilityLabel={t('common.back', 'Voltar')}
          >
            <NeoIcon name="ArrowLeft2" size={24} color={textBody} />
          </TouchableOpacity>
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">{t('lazerMenu.mobilidade.title', 'Mobilidade Segura')}</Text>
          </View>
        </View>

        {/* Tabs Premium */}
        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, tabAtiva === tab.id && styles.tabAtiva]}
                onPress={() => setTabAtiva(tab.id)}
              >
                <NeoIcon name={tab.iconName || 'Car'} size={18} color={Neo.colors.primary[600]} variant="Bold" style={{ marginBottom: 4 }} />
                <Text style={[styles.tabText, tabAtiva === tab.id && styles.tabTextAtiva]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      {/* Conteúdo */}
      <ScrollView style={styles.scrollView}>
        {tabAtiva === 'drv' && <ConteudoDRV />}
        {tabAtiva === 'ativa' && <ConteudoAtiva />}
        {tabAtiva === 'pedestre' && <ConteudoPedestre />}
        {tabAtiva === 'moto' && <ConteudoMoto />}
        {tabAtiva === 'eletrica' && <ConteudoEletrica />}
      </ScrollView>
      </View>
    </AppBackground>
  );
}

function ConteudoDRV() {
  const { t } = useTranslation('common');
  const [dispositivoExpandido, setDispositivoExpandido] = useState(null);
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.conteudo}>
      {/* O que é DRV? */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Car" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{tx('drvTitulo')}</Text>
        </View>
        <Text style={styles.cardTexto}>{tx('drvTexto')}</Text>
      </View>

      {/* A lei do PAIS do usuario (data/regrasTransitoPorPais.js) */}
      <View style={styles.alertaImportante}>
        <NeoIcon name="Warning2" size={24} color={Neo.colors.feedback.warning} variant="Bold" />
        <View style={styles.alertaTexto}>
          <Text style={styles.alertaTitulo}>{tx('leiTitulo')}</Text>
          <Text style={styles.alertaDescricao}>{lei('CHILD_SEAT_LAW')}</Text>
          <Text style={[styles.alertaDescricao, { marginTop: 6 }]}>
            <Text style={{ fontWeight: 'bold' }}>{tx('multaRotulo')}: </Text>{lei('CHILD_SEAT_PENALTY')}
          </Text>
          <Text style={[styles.alertaDescricao, { marginTop: 6 }]}>{tx('reducaoRisco')}</Text>
        </View>
      </View>

      {/* Calculadora rápida */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="ChartBar" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.QualDispositivoMeuFilhoPrecisa', 'Qual dispositivo meu filho precisa?')}</Text>
        </View>
        <Text style={styles.cardSubtitulo}>
          {t('headersFirst.selecioneAIdadeParaVerODispositivoRecome', 'Que idade tem a criança?')}
        </Text>
        
        <View style={styles.idadeBotoesContainer}>
          {[0, 2, 5].map((idade, i) => ({ idade, label: (tx('idadeBotoes') || [])[i] })).map((item) => (
            <TouchableOpacity
              key={item.idade}
              style={styles.idadeBotao}
              onPress={() => {
                const dispositivo = getDispositivoPorIdade(item.idade);
                if (dispositivo) {
                  setDispositivoExpandido(dispositivo.id);
                }
              }}
            >
              <Text style={styles.idadeBotaoText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de dispositivos */}
      {DISPOSITIVOS_RETENCAO.map((dispositivo) => (
        <DispositivoCard
          key={dispositivo.id}
          dispositivo={dispositivo}
          expandido={dispositivoExpandido === dispositivo.id}
          onToggle={() => setDispositivoExpandido(
            dispositivoExpandido === dispositivo.id ? null : dispositivo.id
          )}
        />
      ))}

      {/* Dica final */}
      <View style={[styles.card, styles.cardDica]}>
        <NeoIcon name="Lightbulb" size={32} color={Neo.colors.feedback.warning} variant="Bold" style={{ marginBottom: 8 }} />
        <Text style={styles.dicaTitulo}>{t('headersFirst.dicaImportante', 'Dica Importante')}</Text>
        <Text style={styles.dicaTexto}>
          {(tx('dicaItens') || []).map((d) => `• ${d}`).join('\n')}
        </Text>
      </View>
    </View>
  );
}

function DispositivoCard({ dispositivo, expandido, onToggle }) {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={styles.guideCardOuter}>
          <View style={styles.guideCardInner}>
            <View style={[styles.guideImageContainer, { backgroundColor: dispositivo.cor + '15' }]}>
              {dispositivo.imagemUrl ? (
                <ReviewImage
                  source={typeof dispositivo.imagemUrl === 'string' ? (typeof dispositivo.imagemUrl === 'string' ? { uri: dispositivo.imagemUrl } : dispositivo.imagemUrl) : dispositivo.imagemUrl}
                  tint={dispositivo.cor}
                  accessibilityLabel={t_field(dispositivo, 'nome')}
                />
              ) : (
                <NeoIcon name={dispositivo.icone} size={48} color={Neo.colors.primary[600]} variant="Bold" />
              )}
            </View>
            <View style={styles.guideContent}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.guideTitle} numberOfLines={1}>{t_field(dispositivo, 'nome')}</Text>
                <Text style={styles.guideSubtitle}>{tx('faixaDispositivo', { idade: `${dispositivo.idadeMin}-${dispositivo.idadeMax}`, peso: `${dispositivo.pesoMin}-${dispositivo.pesoMax}` })}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <NeoIcon
                  name={expandido ? "ArrowUp2" : "ArrowDown2"}
                  size={20}
                  color={Neo.colors.neutral[400]}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>


      {expandido && (
        <View style={styles.dispositivoConteudo}>
          {/* Descrição */}
          <Text style={styles.dispositivoDescricao}>{t_field(dispositivo, 'descricao')}</Text>

          {/* Posição */}
          <View style={styles.secao}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="MapPin" size={16} color={colors.neutral[800]} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.PosiONoVeCulo', 'Posição no Veículo')}</Text>
            </View>
            <Text style={styles.secaoTexto}>
              <Text style={styles.textoDestaque}>{t_field(dispositivo, 'posicao')}</Text>{'\n'}
              {tx('localRotulo')}: {t_field(dispositivo, 'localizacao')}
            </Text>
          </View>

          {/* Como instalar */}
          <View style={styles.secao}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="Setting2" size={16} color={colors.neutral[800]} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.ComoInstalar', 'Como Instalar')}</Text>
            </View>
            {t_array(dispositivo, 'comoInstalar').map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Como usar */}
          <View style={styles.secao}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="Profile" size={16} color={colors.neutral[800]} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.ComoUsar', 'Como Usar')}</Text>
            </View>
            {t_array(dispositivo, 'comoUsar').map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Erros comuns */}
          <View style={[styles.secao, styles.secaoAviso]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="CloseCircle" size={16} color={colors.feedback.error} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.ErrosComunsEVITE', 'Erros Comuns (EVITE!)')}</Text>
            </View>
            {t_array(dispositivo, 'errosComuns').map((item, index) => (
              <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
                • {item}
              </Text>
            ))}
          </View>
          {/* A lei fica num cartao unico no topo, pelo pais do usuario (D19). */}
        </View>
      )}
    </View>
  );
}

function ConteudoAtiva() {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.conteudo}>
      {/* Introdução */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Bicycle" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.OQueMobilidadeAtiva', 'O que é Mobilidade Ativa?')}</Text>
        </View>
        <Text style={styles.cardTexto}>{t_field(MOBILIDADE_ATIVA, 'definicao')}</Text>

        <Text style={styles.subtitulo}>{t('headersFirst.benefCios', 'Benefícios:')}</Text>
        {t_array(MOBILIDADE_ATIVA, 'beneficios').map((beneficio, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <NeoIcon name="TickCircle" size={14} color={Neo.colors.primary[600]} variant="Bold" style={{ marginRight: 6, marginTop: 2 }} />
            <Text style={[styles.beneficioItem, { flex: 1 }]}>{beneficio}</Text>
          </View>
        ))}
      </View>

      {/* Idade de autonomia */}
      <View style={[styles.card, styles.cardDestaque]}>
        <NeoIcon name="Warning2" size={32} color={Neo.colors.feedback.warning} variant="Bold" style={{ marginBottom: 8 }} />
        <Text style={styles.destaqueTitulo}>{t('headersFirst.idadeDeAutonomia', 'Idade de Autonomia')}</Text>
        <Text style={styles.destaqueTexto}>
          {tx('autonomiaAtiva', { n: MOBILIDADE_ATIVA.idadeAutonomia.idade })}
        </Text>
        <Text style={styles.destaqueSubtitulo}>{t('headersFirst.porQu', 'Por quê?')}</Text>
        {t_array(MOBILIDADE_ATIVA.idadeAutonomia, 'habilidadesNecessarias').map((hab, index) => (
          <Text key={index} style={styles.listaItem}>
            • {hab}
          </Text>
        ))}
      </View>

      {/* Tipos de mobilidade */}
      {MOBILIDADE_ATIVA.tipos.map((tipo, index) => (
        <TipoMobilidadeCard key={index} tipo={tipo} />
      ))}
    </View>
  );
}

function TipoMobilidadeCard({ tipo }) {
  const [expandido, setExpandido] = useState(false);
  // Componente de topo do arquivo: precisa do proprio `t`. Usava a funcao em 5
  // pontos sem nunca declara-la — o `t` da tela nao alcanca aqui, e cada um
  // desses rotulos quebrava ao renderizar.
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        onPress={() => setExpandido(!expandido)}
        activeOpacity={0.8}
      >
        <View style={styles.guideCardOuter}>
          <View style={styles.guideCardInner}>
            <View style={[styles.guideImageContainer, { backgroundColor: '#F8F9FA' }]}>
              <NeoIcon name={tipo.icone} size={48} color={Neo.colors.primary[600]} variant="Bold" />
            </View>
            <View style={styles.guideContent}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.guideTitle} numberOfLines={1}>{t_field(tipo, 'tipo')}</Text>
                <Text style={styles.guideSubtitle}>{tx('idadeMinimaRotulo', { n: tipo.idadeMinima })}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <NeoIcon
                  name={expandido ? "ArrowUp2" : "ArrowDown2"}
                  size={20}
                  color={Neo.colors.neutral[400]}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>


      {expandido && (
        <View style={styles.tipoConteudo}>
          {/* Equipamentos */}
          <View style={styles.secao}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="ShieldTick" size={16} color={colors.neutral[800]} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.EquipamentosNecessRios', 'Equipamentos Necessários')}</Text>
            </View>
            {t_array(tipo, 'equipamentos').map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Locais apropriados */}
          <View style={styles.secao}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="TickCircle" size={16} color={colors.feedback.success} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.LocaisApropriados', 'Locais Apropriados')}</Text>
            </View>
            {t_array(tipo, 'locaisApropriados').map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <NeoIcon name="TickCircle" size={14} color={Neo.colors.primary[600]} variant="Bold" style={{ marginRight: 6, marginTop: 2 }} />
                <Text style={[styles.listaItem, styles.listaItemSucesso, { flex: 1 }]}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Locais a evitar */}
          {tipo.locaisEvitar && (
            <View style={styles.secao}>
              <Text style={styles.secaoTitulo}>{t('headersFirst.LocaisAEvitar', 'Locais a Evitar')}</Text>
              {t_array(tipo, 'locaisEvitar').map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <NeoIcon name="CloseCircle" size={14} color={Neo.colors.feedback.error} variant="Bold" style={{ marginRight: 6, marginTop: 2 }} />
                  <Text style={[styles.listaItem, styles.listaItemAviso, { flex: 1 }]}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Regras de segurança */}
          <View style={styles.secao}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <NeoIcon name="Warning2" size={16} color={colors.neutral[800]} style={{ marginRight: 8 }} />
              <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.RegrasDeSeguranA', 'Regras de Segurança')}</Text>
            </View>
            {t_array(tipo, 'regrasSeguranca').map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Manutenção */}
          {tipo.manutencao && (
            <View style={styles.secao}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <NeoIcon name="Setting2" size={16} color={colors.neutral[800]} style={{ marginRight: 8 }} />
                <Text style={[styles.secaoTitulo, { marginBottom: 0 }]}>{t('headersFirst.ManutenO', 'Manutenção')}</Text>
              </View>
              {t_array(tipo, 'manutencao').map((item, index) => (
                <Text key={index} style={styles.listaItem}>
                  • {item}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function ConteudoPedestre() {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.conteudo}>
      {/* Idade de autonomia */}
      <View style={[styles.card, styles.cardDestaque]}>
        <NeoIcon name="Pedestrian" size={32} color={Neo.colors.primary[600]} variant="Bold" style={{ marginBottom: 8 }} />
        <Text style={styles.destaqueTitulo}>{t('headersFirst.autonomiaDeMobilidade', 'Autonomia de Mobilidade')}</Text>
        <Text style={styles.destaqueTexto}>
          {tx('autonomiaPedestre', { n: SEGURANCA_PEDESTRE.idadeAutonomia })}
        </Text>
      </View>

      {/* Regras gerais */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="ClipboardText" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.RegrasGeraisDeSeguranA', 'Regras Gerais de Segurança')}</Text>
        </View>
        {t_array(SEGURANCA_PEDESTRE, 'regrasGerais').map((regra, index) => (
          <Text key={index} style={styles.listaItem}>
            • {regra}
          </Text>
        ))}
      </View>

      {/* Sinalização */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Warning2" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.EntendendoASinalizaO', 'Entendendo a Sinalização')}</Text>
        </View>
        {t_array(SEGURANCA_PEDESTRE, 'sinalizacaoVial').map((sinal, index) => (
          <View key={index} style={styles.sinalizacaoItem}>
            <Text style={styles.sinalizacaoSinal}>{sinal.sinal}</Text>
            <Text style={styles.sinalizacaoAcao}>{sinal.acao}</Text>
          </View>
        ))}
      </View>

      {/* Fatores de risco */}
      <View style={[styles.card, styles.cardAviso]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Warning2" size={20} color={colors.feedback.error} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0, color: colors.feedback.error }]}>{t('headersFirst.FatoresDeRisco', 'Fatores de Risco')}</Text>
        </View>
        <Text style={styles.cardSubtitulo}>{t('headersFirst.eviteViasCom', 'Evite vias com:')}</Text>
        {t_array(SEGURANCA_PEDESTRE, 'fatoresRisco').map((fator, index) => (
          <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
            • {fator}
          </Text>
        ))}
      </View>

      {/* Dicas para noite */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Moon" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.SeguranANoite', 'Segurança à Noite')}</Text>
        </View>
        {t_array(SEGURANCA_PEDESTRE, 'dicas_seguranca_noite').map((dica, index) => (
          <Text key={index} style={styles.listaItem}>
            • {dica}
          </Text>
        ))}
      </View>

      {/* Crianças específicas */}
      <View style={[styles.card, styles.cardDestaque]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Profile" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.CuidadosComCrianAs', 'Cuidados com Crianças')}</Text>
        </View>
        {t_array(SEGURANCA_PEDESTRE, 'criancas_especificas').map((cuidado, index) => (
          <Text key={index} style={styles.listaItem}>
            • {cuidado}
          </Text>
        ))}
      </View>
    </View>
  );
}

function ConteudoMoto() {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.conteudo}>
      {/* Idade mínima */}
      <View style={[styles.card, styles.cardDestaque]}>
        <NeoIcon name="Motorcycle" size={32} color={Neo.colors.primary[600]} variant="Bold" style={{ marginBottom: 8 }} />
        <Text style={styles.destaqueTitulo}>{tx('motoIdadeTitulo')}</Text>
        <Text style={styles.destaqueTexto}>{lei('MOTO_PASSENGER_RULE')}</Text>
      </View>

      {/* Equipamentos obrigatórios */}
      {SEGURANCA_MOTO.equipamentos_obrigatorios.map((equip, index) => (
        <View key={index} style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <NeoIcon name="ShieldTick" size={18} color={Neo.colors.primary[600]} variant="Bold" />
            <Text style={styles.cardTitulo}>{t_field(equip, 'item')}</Text>
          </View>
          {t_array(equip, 'requisitos').map((req, idx) => (
            <Text key={idx} style={styles.listaItem}>
              • {req}
            </Text>
          ))}
          {t_array(equip, 'recomendacoes').map((rec, idx) => (
            <Text key={idx} style={styles.listaItem}>
              • {rec}
            </Text>
          ))}
        </View>
      ))}

      {/* Regras para passageiro */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Profile" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.RegrasParaPassageiro', 'Regras para Passageiro')}</Text>
        </View>
        {t_array(SEGURANCA_MOTO, 'regras_passageiro').map((regra, index) => (
          <Text key={index} style={styles.listaItem}>
            • {regra}
          </Text>
        ))}
      </View>

      {/* Regras para piloto */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Motorcycle" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.RegrasParaPiloto', 'Regras para Piloto')}</Text>
        </View>
        {t_array(SEGURANCA_MOTO, 'regras_piloto').map((regra, index) => (
          <Text key={index} style={styles.listaItem}>
            • {regra}
          </Text>
        ))}
      </View>

      {/* Riscos específicos */}
      <View style={[styles.card, styles.cardAviso]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Warning2" size={20} color={colors.feedback.error} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0, color: colors.feedback.error }]}>{t('headersFirst.RiscosEspecFicosDasMotos', 'Riscos Específicos das Motos')}</Text>
        </View>
        {t_array(SEGURANCA_MOTO, 'riscos_especificos').map((risco, index) => (
          <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
            • {risco}
          </Text>
        ))}
      </View>

      {/* Emergência */}
      <View style={[styles.card, styles.cardEmergencia]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Danger" size={20} color={Neo.colors.primary[600]} style={{ marginRight: 8 }} />
          <Text style={[styles.emergenciaTitulo, { marginBottom: 0 }]}>{t('headersFirst.EmCasoDeAcidente', 'Em caso de acidente')}</Text>
        </View>
        {/* Numeros do pais do usuario; a PRF (191) so existe no Brasil. */}
        {(tx('emergenciaItens') || []).map((linha, i) => (
          <Text key={i} style={styles.emergenciaNumero}>{linha}</Text>
        ))}
        {getEmergencyCountry() === 'BR' && (
          <Text style={styles.emergenciaNumero}>{tx('emergenciaRodoviaria')}</Text>
        )}
      </View>
    </View>
  );
}

function ConteudoEletrica() {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const isDark = useIsDark();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.conteudo}>
      {/* Introdução */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Lightning" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.MicromobilidadeElTrica', 'Micromobilidade Elétrica')}</Text>
        </View>
        <Text style={styles.cardTexto}>{t_field(MICROMOBILIDADE_ELETRICA, 'definicao')}</Text>
        <Text style={[styles.cardTexto, { marginTop: 8 }]}>{t_field(MICROMOBILIDADE_ELETRICA, 'contexto')}</Text>
      </View>

      {/* Regras do PAIS do usuario (data/regrasTransitoPorPais.js) */}
      <View style={[styles.card, styles.cardDestaque]}>
        <NeoIcon name="Pedestrian" size={32} color={Neo.colors.primary[600]} variant="Bold" style={{ marginBottom: 8 }} />
        <Text style={styles.destaqueTitulo}>{tx('regrasLocaisTitulo')}</Text>
        <Text style={styles.destaqueTexto}>{lei('MICROMOBILITY_RULE')}</Text>
      </View>

      {/* Categorias do CONTRAN: definicao legal brasileira, so no Brasil. */}
      {getEmergencyCountry() === 'BR' && MICROMOBILIDADE_ELETRICA.categorias_ctb.map((cat, index) => (
        <View key={index} style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <NeoIcon name={cat.icone} size={24} color={Neo.colors.primary[600]} variant="Bold" style={{ marginRight: 8 }} />
            <Text style={styles.cardTitulo}>{cat.nome}</Text>
          </View>
          <Text style={[styles.textoDestaque, { marginBottom: 8 }]}>{tx('limiteRotulo')}: {cat.velocidadeMax}</Text>

          <Text style={styles.cardSubtitulo}>{t('headersFirst.caracterSticas', 'Características:')}</Text>
          {cat.caracteristicas.map((carac, idx) => (
            <Text key={idx} style={styles.listaItem}>• {carac}</Text>
          ))}

          <Text style={[styles.cardSubtitulo, { marginTop: 8 }]}>{t('headersFirst.ondeAndar', 'Onde andar:')}</Text>
          <Text style={[styles.listaItem, { color: cat.proibido ? colors.feedback.error : colors.feedback.success, fontWeight: 'bold' }]}>
            {cat.ondeAndar}
          </Text>
        </View>
      ))}

      {/* Riscos */}
      <View style={[styles.card, styles.cardAviso]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="Warning2" size={20} color={colors.feedback.error} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0, color: colors.feedback.error }]}>{t('headersFirst.RiscosDeAcidentes', 'Riscos de Acidentes')}</Text>
        </View>
        {t_array(MICROMOBILIDADE_ELETRICA, 'riscos').map((risco, index) => (
          <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>• {risco}</Text>
        ))}
      </View>

      {/* Prevenção */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <NeoIcon name="ShieldTick" size={20} color={colors.neutral[800]} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitulo, { marginBottom: 0 }]}>{t('headersFirst.PrevenO', 'Prevenção')}</Text>
        </View>
        {t_array(MICROMOBILIDADE_ELETRICA, 'prevencao').map((prev, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
              <NeoIcon name="TickCircle" size={14} color={Neo.colors.primary[600]} variant="Bold" style={{ marginTop: 2 }} />
              <Text style={[styles.listaItem, { flex: 1 }]}>{prev}</Text>
            </View>
        ))}
      </View>
    </View>
  );
}

const getStyles = (colors, isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabsWrapper: {
    backgroundColor: isDark ? colors.neutral[900] : colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    height: 70,
  },
  tabsContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 80
  },
  tabAtiva: {
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral.white,
    borderColor: colors.primary[500],
    ...Shadows.sm
  },
  tabText: {
    fontSize: 11,
    color: colors.neutral[500],
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  tabTextAtiva: {
    color: colors.primary[600],
  },
  scrollView: {
    flex: 1,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 190,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  guideCardOuter: {
    borderRadius: 24,
    ...Shadows.sm
  },
  guideCardInner: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral.white,
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
    justifyContent: 'center',
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: 2
  },
  guideSubtitle: {
    fontSize: 13,
    color: colors.neutral[500],
    fontFamily: 'PlusJakartaSans_500Medium',
    fontStyle: 'italic',
  },
  itemsList: {
    padding: 12,
    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: -16,
    paddingTop: 24,
    zIndex: -1,
  },
  descText: {
    fontSize: 13,
    color: colors.neutral[600],
    fontFamily: 'PlusJakartaSans_500Medium',
    lineHeight: 18,
  },
  card: {
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...Shadows.sm,
  },
  cardTitulo: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.neutral[800],
    marginBottom: 12,
  },
  cardSubtitulo: {
    fontSize: 14,
    color: colors.neutral[500],
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginBottom: 8,
  },
  cardTexto: {
    fontSize: 14,
    color: colors.neutral[600],
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  alertaImportante: {
    flexDirection: 'row',
    backgroundColor: colors.feedback.error + '1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.error,
  },
  alertaTexto: {
    flex: 1,
  },
  alertaTitulo: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.feedback.error,
    marginBottom: 4,
  },
  alertaDescricao: {
    fontSize: 13,
    color: colors.feedback.error,
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  idadeBotoesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  idadeBotao: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.neutral[200],
    borderRadius: 12,
    alignItems: 'center',
  },
  idadeBotaoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.neutral[700],
  },
  dispositivoConteudo: {
    padding: 16,
    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: -16,
    paddingTop: 24,
  },
  tipoConteudo: {
    padding: 16,
    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: -16,
    paddingTop: 24,
  },
  secao: {
    marginBottom: 16,
  },
  secaoTitulo: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.primary[600],
    marginBottom: 6,
  },
  secaoTexto: {
    fontSize: 13,
    color: colors.neutral[600],
    lineHeight: 18,
  },
  listaItem: {
    fontSize: 13,
    color: colors.neutral[600],
    lineHeight: 20,
    marginBottom: 4,
  },
  listaItemSucesso: {
    color: colors.feedback.success,
  },
  listaItemAviso: {
    color: colors.feedback.error,
  },
  textoDestaque: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.primary[600],
  },
  cardDestaque: {
    backgroundColor: colors.feedback.info + '1A',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.info,
  },
  cardAviso: {
    backgroundColor: colors.feedback.warning + '1A',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.warning,
  },
  cardEmergencia: {
    backgroundColor: colors.feedback.error + '1A',
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.error,
  },
  cardDica: {
    backgroundColor: colors.accent?.champagneSubtle || '#FFFBEB',
    borderLeftWidth: 4,
    borderLeftColor: colors.accent?.champagne || '#FBC02D',
  },
  dicaTitulo: { fontSize: 16, fontWeight: 'bold', color: colors.accent?.champagne || '#FBC02D', marginBottom: 4 },
  dicaTexto: { fontSize: 13, color: colors.accent?.champagne || '#FBC02D', lineHeight: 18 },
  destaqueTitulo: { fontSize: 16, fontWeight: 'bold', color: colors.feedback.info, marginBottom: 4 },
  destaqueTexto: { fontSize: 14, color: colors.feedback.info, lineHeight: 20 },
  destaqueSubtitulo: { fontSize: 13, fontWeight: 'bold', color: colors.feedback.info, marginTop: 8, marginBottom: 4 },
  sinalizacaoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sinalizacaoSinal: { fontSize: 24, marginRight: 12 },
  sinalizacaoAcao: { fontSize: 14, color: colors.neutral[700], flex: 1 },
  emergenciaTitulo: { fontSize: 16, fontWeight: 'bold', color: colors.feedback.error, marginBottom: 8 },
  emergenciaNumero: { fontSize: 20, fontWeight: '800', color: colors.feedback.error, marginBottom: 4 },
  subtitulo: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.neutral[800],
    marginTop: 16,
    marginBottom: 8,
  },
  beneficioItem: {
    fontSize: 14,
    color: colors.feedback.success,
    fontFamily: 'PlusJakartaSans_500Medium',
    marginLeft: 8,
    marginBottom: 4,
  },
});


