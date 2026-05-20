import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import ReviewImage from '../components/ReviewImage';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Shadows } from '../utils/Theme';
import { 
  DISPOSITIVOS_RETENCAO,
  MOBILIDADE_ATIVA,
  SEGURANCA_PEDESTRE,
  SEGURANCA_MOTO,
  MICROMOBILIDADE_ELETRICA,
  getDispositivoPorIdade
} from '../data/mobilidade_data';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

const { width } = Dimensions.get('window');

export default function MobilidadeSeguraScreen({ navigation }) {
    const { t } = useTranslation('common');
  const [tabAtiva, setTabAtiva] = useState('drv'); // drv, ativa, pedestre, moto
  const insets = useSafeAreaInsets();
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];
  const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

  const TABS = [
    { id: 'drv', label: 'Carros', emoji: '🚗' },
    { id: 'ativa', label: 'Bikes', emoji: '🚴' },
    { id: 'pedestre', label: 'Pedestre', emoji: '🚸' },
    { id: 'moto', label: 'Moto', emoji: '🏍️' },
    { id: 'eletrica', label: 'E-Bikes', emoji: '⚡' },
  ];

  return (
    <AppBackground>
      <View style={styles.container}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

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
            <Text style={{ fontSize: 24, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">{t('headersFirst.mobilidade', 'Mobilidade')}</Text>
            <Text style={{ fontSize: 13, color: textMuted }}>{t('headersFirst.trNsitoESeguranA', 'Trânsito e Segurança.')}</Text>
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
                <Text style={{ fontSize: 18, marginBottom: 4 }}>{tab.emoji}</Text>
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

  return (
    <View style={styles.conteudo}>
      {/* O que é DRV? */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.OQueDRV', '🚗 O que é DRV?')}</Text>
        <Text style={styles.cardTexto}>
          <Text style={{fontWeight: 'bold'}}>D</Text>ispositivo de <Text style={{fontWeight: 'bold'}}>R</Text>etenção <Text style={{fontWeight: 'bold'}}>V</Text>eicular. 
          É o termo técnico e legal para bebê conforto, cadeirinha e assento de elevação.
        </Text>
      </View>

      {/* Alerta importante */}
      <View style={styles.alertaImportante}>
        <Text style={styles.alertaIcon}>⚠️</Text>
        <View style={styles.alertaTexto}>
          <Text style={styles.alertaTitulo}>{t('headersFirst.oBRIGATRIOPORLEI', 'OBRIGATÓRIO POR LEI')}</Text>
          <Text style={styles.alertaDescricao}>
            O uso correto do DRV reduz em até 71% o risco de morte em acidentes.{'\n'}
            Multa: Gravíssima + 7 pontos na CNH
          </Text>
        </View>
      </View>

      {/* Calculadora rápida */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.QualDispositivoMeuFilhoPrecisa', '📊 Qual dispositivo meu filho precisa?')}</Text>
        <Text style={styles.cardSubtitulo}>
          {t('headersFirst.selecioneAIdadeParaVerODispositivoRecome', 'Selecione a idade para ver o dispositivo recomendado:')}
        </Text>
        
        <View style={styles.idadeBotoesContainer}>
          {[
            { idade: 0, label: '0-1 ano' },
            { idade: 2, label: '1-4 anos' },
            { idade: 5, label: '4-10 anos' }
          ].map((item) => (
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
        <Text style={styles.dicaIcon}>💡</Text>
        <Text style={styles.dicaTitulo}>{t('headersFirst.dicaImportante', 'Dica Importante')}</Text>
        <Text style={styles.dicaTexto}>
          • Sempre verificar selo do Inmetro{'\n'}
          • Seguir RIGOROSAMENTE instruções do fabricante{'\n'}
          • Substituir após qualquer acidente{'\n'}
          • Não usar dispositivos de segunda mão sem conhecer histórico{'\n'}
          • Crianças no banco traseiro até 10 anos
        </Text>
      </View>
    </View>
  );
}

function DispositivoCard({ dispositivo, expandido, onToggle }) {
  const { t } = useTranslation('common');
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
                  source={{ uri: dispositivo.imagemUrl }}
                  tint={dispositivo.cor}
                  accessibilityLabel={dispositivo.nome}
                />
              ) : (
                <Text style={{ fontSize: 48 }}>{dispositivo.icone}</Text>
              )}
            </View>
            <View style={styles.guideContent}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.guideTitle} numberOfLines={1}>{dispositivo.nome}</Text>
                <Text style={styles.guideSubtitle}>{dispositivo.idadeMin}-{dispositivo.idadeMax} anos • {dispositivo.pesoMin}-{dispositivo.pesoMax} kg</Text>
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
          <Text style={styles.dispositivoDescricao}>{dispositivo.descricao}</Text>

          {/* Posição */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>{t('headersFirst.PosiONoVeCulo', '📍 Posição no Veículo')}</Text>
            <Text style={styles.secaoTexto}>
              <Text style={styles.textoDestaque}>{dispositivo.posicao}</Text>{'\n'}
              Local: {dispositivo.localizacao}
            </Text>
          </View>

          {/* Como instalar */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>{t('headersFirst.ComoInstalar', '🔧 Como Instalar')}</Text>
            {dispositivo.comoInstalar.map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Como usar */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>{t('headersFirst.ComoUsar', '👶 Como Usar')}</Text>
            {dispositivo.comoUsar.map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Erros comuns */}
          <View style={[styles.secao, styles.secaoAviso]}>
            <Text style={styles.secaoTitulo}>{t('headersFirst.ErrosComunsEVITE', '❌ Erros Comuns (EVITE!)')}</Text>
            {dispositivo.errosComuns.map((item, index) => (
              <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Legislação */}
          <View style={[styles.secao, styles.secaoLegislacao]}>
            <Text style={styles.legislacaoTitulo}>{t('headersFirst.LegislaO', '⚖️ Legislação')}</Text>
            <Text style={styles.legislacaoTexto}>{dispositivo.legislacao}</Text>
            <Text style={styles.multaTexto}>Multa: {dispositivo.multa}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

function ConteudoAtiva() {
  const { t } = useTranslation('common');
  return (
    <View style={styles.conteudo}>
      {/* Introdução */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.OQueMobilidadeAtiva', '🚴 O que é Mobilidade Ativa?')}</Text>
        <Text style={styles.cardTexto}>{MOBILIDADE_ATIVA.definicao}</Text>
        
        <Text style={styles.subtitulo}>{t('headersFirst.benefCios', 'Benefícios:')}</Text>
        {MOBILIDADE_ATIVA.beneficios.map((beneficio, index) => (
          <Text key={index} style={styles.beneficioItem}>
            ✓ {beneficio}
          </Text>
        ))}
      </View>

      {/* Idade de autonomia */}
      <View style={[styles.card, styles.cardDestaque]}>
        <Text style={styles.destaqueIcon}>⚠️</Text>
        <Text style={styles.destaqueTitulo}>{t('headersFirst.idadeDeAutonomia', 'Idade de Autonomia')}</Text>
        <Text style={styles.destaqueTexto}>
          Crianças só devem transitar desacompanhadas a partir dos{' '}
          <Text style={styles.textoDestaque}>{MOBILIDADE_ATIVA.idadeAutonomia.idade} anos</Text>
        </Text>
        <Text style={styles.destaqueSubtitulo}>{t('headersFirst.porQu', 'Por quê?')}</Text>
        {MOBILIDADE_ATIVA.idadeAutonomia.habilidadesNecessarias.map((hab, index) => (
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

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        onPress={() => setExpandido(!expandido)}
        activeOpacity={0.8}
      >
        <View style={styles.guideCardOuter}>
          <View style={styles.guideCardInner}>
            <View style={[styles.guideImageContainer, { backgroundColor: '#F8F9FA' }]}>
              <Text style={{ fontSize: 48 }}>{tipo.icone}</Text>
            </View>
            <View style={styles.guideContent}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.guideTitle} numberOfLines={1}>{tipo.tipo}</Text>
                <Text style={styles.guideSubtitle}>Idade mínima: {tipo.idadeMinima} anos</Text>
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
            <Text style={styles.secaoTitulo}>{t('headersFirst.EquipamentosNecessRios', '🛡️ Equipamentos Necessários')}</Text>
            {tipo.equipamentos.map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Locais apropriados */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>{t('headersFirst.LocaisApropriados', '✅ Locais Apropriados')}</Text>
            {tipo.locaisApropriados.map((item, index) => (
              <Text key={index} style={[styles.listaItem, styles.listaItemSucesso]}>
                ✓ {item}
              </Text>
            ))}
          </View>

          {/* Locais a evitar */}
          {tipo.locaisEvitar && (
            <View style={styles.secao}>
              <Text style={styles.secaoTitulo}>{t('headersFirst.LocaisAEvitar', '❌ Locais a Evitar')}</Text>
              {tipo.locaisEvitar.map((item, index) => (
                <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
                  ✗ {item}
                </Text>
              ))}
            </View>
          )}

          {/* Regras de segurança */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>{t('headersFirst.RegrasDeSeguranA', '⚠️ Regras de Segurança')}</Text>
            {tipo.regrasSeguranca.map((item, index) => (
              <Text key={index} style={styles.listaItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Manutenção */}
          {tipo.manutencao && (
            <View style={styles.secao}>
              <Text style={styles.secaoTitulo}>{t('headersFirst.ManutenO', '🔧 Manutenção')}</Text>
              {tipo.manutencao.map((item, index) => (
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
  return (
    <View style={styles.conteudo}>
      {/* Idade de autonomia */}
      <View style={[styles.card, styles.cardDestaque]}>
        <Text style={styles.destaqueIcon}>🚸</Text>
        <Text style={styles.destaqueTitulo}>{t('headersFirst.autonomiaDeMobilidade', 'Autonomia de Mobilidade')}</Text>
        <Text style={styles.destaqueTexto}>
          Crianças podem andar sozinhas na rua a partir dos{' '}
          <Text style={styles.textoDestaque}>{SEGURANCA_PEDESTRE.idadeAutonomia} anos</Text>
        </Text>
      </View>

      {/* Regras gerais */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.RegrasGeraisDeSeguranA', '📋 Regras Gerais de Segurança')}</Text>
        {SEGURANCA_PEDESTRE.regrasGerais.map((regra, index) => (
          <Text key={index} style={styles.listaItem}>
            • {regra}
          </Text>
        ))}
      </View>

      {/* Sinalização */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.EntendendoASinalizaO', '🚦 Entendendo a Sinalização')}</Text>
        {SEGURANCA_PEDESTRE.sinalizacaoVial.map((sinal, index) => (
          <View key={index} style={styles.sinalizacaoItem}>
            <Text style={styles.sinalizacaoSinal}>{sinal.sinal}</Text>
            <Text style={styles.sinalizacaoAcao}>{sinal.acao}</Text>
          </View>
        ))}
      </View>

      {/* Fatores de risco */}
      <View style={[styles.card, styles.cardAviso]}>
        <Text style={styles.cardTitulo}>{t('headersFirst.FatoresDeRisco', '⚠️ Fatores de Risco')}</Text>
        <Text style={styles.cardSubtitulo}>{t('headersFirst.eviteViasCom', 'Evite vias com:')}</Text>
        {SEGURANCA_PEDESTRE.fatoresRisco.map((fator, index) => (
          <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
            • {fator}
          </Text>
        ))}
      </View>

      {/* Dicas para noite */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.SeguranANoite', '🌙 Segurança à Noite')}</Text>
        {SEGURANCA_PEDESTRE.dicas_seguranca_noite.map((dica, index) => (
          <Text key={index} style={styles.listaItem}>
            • {dica}
          </Text>
        ))}
      </View>

      {/* Crianças específicas */}
      <View style={[styles.card, styles.cardDestaque]}>
        <Text style={styles.cardTitulo}>{t('headersFirst.CuidadosComCrianAs', '👶 Cuidados com Crianças')}</Text>
        {SEGURANCA_PEDESTRE.criancas_especificas.map((cuidado, index) => (
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
  return (
    <View style={styles.conteudo}>
      {/* Idade mínima */}
      <View style={[styles.card, styles.cardDestaque]}>
        <Text style={styles.destaqueIcon}>🏍️</Text>
        <Text style={styles.destaqueTitulo}>{t('headersFirst.idadeMNima', 'Idade Mínima')}</Text>
        <Text style={styles.destaqueTexto}>
          Crianças podem ser passageiras em motos a partir dos{' '}
          <Text style={styles.textoDestaque}>{SEGURANCA_MOTO.idadeMinimaPassageiro} anos</Text>
        </Text>
      </View>

      {/* Equipamentos obrigatórios */}
      {SEGURANCA_MOTO.equipamentos_obrigatorios.map((equip, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitulo}>🛡️ {equip.item}</Text>
          {equip.requisitos && equip.requisitos.map((req, idx) => (
            <Text key={idx} style={styles.listaItem}>
              • {req}
            </Text>
          ))}
          {equip.recomendacoes && equip.recomendacoes.map((rec, idx) => (
            <Text key={idx} style={styles.listaItem}>
              • {rec}
            </Text>
          ))}
        </View>
      ))}

      {/* Regras para passageiro */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.RegrasParaPassageiro', '👤 Regras para Passageiro')}</Text>
        {SEGURANCA_MOTO.regras_passageiro.map((regra, index) => (
          <Text key={index} style={styles.listaItem}>
            • {regra}
          </Text>
        ))}
      </View>

      {/* Regras para piloto */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.RegrasParaPiloto', '🏍️ Regras para Piloto')}</Text>
        {SEGURANCA_MOTO.regras_piloto.map((regra, index) => (
          <Text key={index} style={styles.listaItem}>
            • {regra}
          </Text>
        ))}
      </View>

      {/* Riscos específicos */}
      <View style={[styles.card, styles.cardAviso]}>
        <Text style={styles.cardTitulo}>{t('headersFirst.RiscosEspecFicosDasMotos', '⚠️ Riscos Específicos das Motos')}</Text>
        {SEGURANCA_MOTO.riscos_especificos.map((risco, index) => (
          <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>
            • {risco}
          </Text>
        ))}
      </View>

      {/* Emergência */}
      <View style={[styles.card, styles.cardEmergencia]}>
        <Text style={styles.emergenciaTitulo}>{t('headersFirst.EmCasoDeAcidente', '🚨 Em caso de acidente')}</Text>
        <Text style={styles.emergenciaNumero}>{t('headersFirst.sAMU192', 'SAMU: 192')}</Text>
        <Text style={styles.emergenciaNumero}>{t('headersFirst.bombeiros193', 'Bombeiros: 193')}</Text>
        <Text style={styles.emergenciaNumero}>{t('headersFirst.pRF191', 'PRF: 191')}</Text>
      </View>
    </View>
  );
}

function ConteudoEletrica() {
  const { t } = useTranslation('common');
  return (
    <View style={styles.conteudo}>
      {/* Introdução */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.MicromobilidadeElTrica', '⚡ Micromobilidade Elétrica')}</Text>
        <Text style={styles.cardTexto}>{MICROMOBILIDADE_ELETRICA.definicao}</Text>
        <Text style={[styles.cardTexto, { marginTop: 8 }]}>{MICROMOBILIDADE_ELETRICA.contexto}</Text>
      </View>

      {/* Categorias CTB */}
      <Text style={[styles.subtitulo, { marginLeft: 4 }]}>{t('headersFirst.categoriasNoCTB', 'Categorias no CTB')}</Text>
      {MICROMOBILIDADE_ELETRICA.categorias_ctb.map((cat, index) => (
        <View key={index} style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 24, marginRight: 8 }}>{cat.icone}</Text>
            <Text style={styles.cardTitulo}>{cat.nome}</Text>
          </View>
          <Text style={[styles.textoDestaque, { marginBottom: 8 }]}>Limite: {cat.velocidadeMax}</Text>
          
          <Text style={styles.cardSubtitulo}>{t('headersFirst.caracterSticas', 'Características:')}</Text>
          {cat.caracteristicas.map((carac, idx) => (
            <Text key={idx} style={styles.listaItem}>• {carac}</Text>
          ))}
          
          <Text style={[styles.cardSubtitulo, { marginTop: 8 }]}>{t('headersFirst.ondeAndar', 'Onde andar:')}</Text>
          <Text style={[styles.listaItem, { color: cat.nome === 'Ciclomotor' ? '#D32F2F' : '#2E7D32', fontWeight: 'bold' }]}>
            {cat.ondeAndar}
          </Text>
        </View>
      ))}

      {/* Regras de Calçadas */}
      <View style={[styles.card, styles.cardDestaque]}>
        <Text style={styles.destaqueIcon}>🚸</Text>
        <Text style={styles.destaqueTitulo}>{t('headersFirst.eNasCalAdas', 'E nas calçadas?')}</Text>
        <Text style={styles.destaqueTexto}>{MICROMOBILIDADE_ELETRICA.regras_calcadas.regraGeral}</Text>
        {MICROMOBILIDADE_ELETRICA.regras_calcadas.detalhes.map((detalhe, idx) => (
          <Text key={idx} style={styles.listaItem}>• {detalhe}</Text>
        ))}
      </View>

      {/* Riscos */}
      <View style={[styles.card, styles.cardAviso]}>
        <Text style={styles.cardTitulo}>{t('headersFirst.RiscosDeAcidentes', '⚠️ Riscos de Acidentes')}</Text>
        {MICROMOBILIDADE_ELETRICA.riscos.map((risco, index) => (
          <Text key={index} style={[styles.listaItem, styles.listaItemAviso]}>• {risco}</Text>
        ))}
      </View>

      {/* Prevenção */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{t('headersFirst.PrevenO', '🛡️ Prevenção')}</Text>
        {MICROMOBILIDADE_ELETRICA.prevencao.map((prev, index) => (
          <Text key={index} style={styles.listaItem}>✓ {prev}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabsWrapper: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 80
  },
  tabAtiva: {
    backgroundColor: '#FFFFFF',
    borderColor: Neo.colors.primary[500],
    ...Shadows.sm
  },
  tabText: {
    fontSize: 11,
    color: Neo.colors.neutral[500],
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  tabTextAtiva: {
    color: Neo.colors.primary[600],
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
    backgroundColor: '#FFFFFF',
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
    color: Neo.colors.neutral[800],
    marginBottom: 2
  },
  guideSubtitle: {
    fontSize: 13,
    color: Neo.colors.neutral[500],
    fontFamily: 'PlusJakartaSans_500Medium',
    fontStyle: 'italic',
  },
  itemsList: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: -16,
    paddingTop: 24,
    zIndex: -1,
  },
  descText: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    fontFamily: 'PlusJakartaSans_500Medium',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...Shadows.sm,
  },
  cardTitulo: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Neo.colors.neutral[800],
    marginBottom: 12,
  },
  cardSubtitulo: {
    fontSize: 14,
    color: Neo.colors.neutral[500],
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginBottom: 8,
  },
  cardTexto: {
    fontSize: 14,
    color: Neo.colors.neutral[600],
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  alertaImportante: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  alertaIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  alertaTexto: {
    flex: 1,
  },
  alertaTitulo: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#D32F2F',
    marginBottom: 4,
  },
  alertaDescricao: {
    fontSize: 13,
    color: '#B71C1C',
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
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  idadeBotaoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Neo.colors.neutral[700],
  },
  dispositivoConteudo: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: -16,
    paddingTop: 24,
  },
  tipoConteudo: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
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
    color: Neo.colors.primary[600],
    marginBottom: 6,
  },
  secaoTexto: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    lineHeight: 18,
  },
  listaItem: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    lineHeight: 20,
    marginBottom: 4,
  },
  listaItemSucesso: {
    color: '#2E7D32',
  },
  listaItemAviso: {
    color: '#D32F2F',
  },
  textoDestaque: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Neo.colors.primary[600],
  },
  cardDestaque: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  cardAviso: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  cardEmergencia: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  cardDica: {
    backgroundColor: '#FFF9C4',
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
  },
  dicaIcon: { fontSize: 32, marginBottom: 8 },
  dicaTitulo: { fontSize: 16, fontWeight: 'bold', color: '#FBC02D', marginBottom: 4 },
  dicaTexto: { fontSize: 13, color: '#FBC02D', lineHeight: 18 },
  destaqueIcon: { fontSize: 32, marginBottom: 8 },
  destaqueTitulo: { fontSize: 16, fontWeight: 'bold', color: '#2196F3', marginBottom: 4 },
  destaqueTexto: { fontSize: 14, color: '#1565C0', lineHeight: 20 },
  destaqueSubtitulo: { fontSize: 13, fontWeight: 'bold', color: '#1565C0', marginTop: 8, marginBottom: 4 },
  sinalizacaoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sinalizacaoSinal: { fontSize: 24, marginRight: 12 },
  sinalizacaoAcao: { fontSize: 14, color: Neo.colors.neutral[700], flex: 1 },
  emergenciaTitulo: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F', marginBottom: 8 },
  emergenciaNumero: { fontSize: 20, fontWeight: '800', color: '#D32F2F', marginBottom: 4 },
  subtitulo: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Neo.colors.neutral[800],
    marginTop: 16,
    marginBottom: 8,
  },
  beneficioItem: {
    fontSize: 14,
    color: '#2E7D32',
    fontFamily: 'PlusJakartaSans_500Medium',
    marginLeft: 8,
    marginBottom: 4,
  },
});


