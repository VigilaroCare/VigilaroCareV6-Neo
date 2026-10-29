/**
 * SituacoesTemporariasScreen — a página que o cartão "Planejar reforma, visita ou mudança" (Atividades
 * Eventuais) abre: escolher o cenário. Reforma e visita seguem para o seu fluxo; mudança e outro
 * entram direto no modo da situação.
 *
 * 28/10/2026 — na linguagem da Home (ANATOMIA §9.6 e §9.7): cabeçalho padrão com o NOME do cartão que
 * a abriu (era "Gestão de Eventos") e as quatro opções como NeoGlifoCard, no âmbar do cartão de
 * origem (planejamento). Antes: banner verde copiado, cartões brancos e ícones que caíam todos no
 * triângulo de alerta.
 */
import { useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../utils/ThemeContext';
import AppBackground from '../components/AppBackground';
import NeoScreenHeader from '../components/NeoScreenHeader';
import NeoGlifoCard from '../components/NeoGlifoCard';
import { H3, Body } from '../components/NeoTypography';
import { tx } from '../utils/txFixo';
import { PICTOGRAMAS_ATIVIDADES, PICTOGRAMA_PLANEJAR } from '../data/pictogramasAtividades';

const T = 'telas.SituacoesTemporariasScreen.';
// Os pictogramas são os das categorias de Atividades Eventuais (data/pictogramasAtividades.js): quando
// a arte dedicada chegar, estes cartões a recebem junto.
const OPTIONS = [
  { key: 'reforma', get title() { return tx(T + 'reformaTitulo', 'Reforma / Manutenção'); }, get subtitle() { return tx(T + 'reformaSubtitulo', 'Trabalhos temporários em casa'); }, pictograma: PICTOGRAMAS_ATIVIDADES.reformas_obras },
  { key: 'festa', get title() { return tx(T + 'festaTitulo', 'Festa / Visita'); }, get subtitle() { return tx(T + 'festaSubtitulo', 'Reuniões e eventos sociais'); }, pictograma: PICTOGRAMAS_ATIVIDADES.festas_eventos },
  { key: 'mudanca', get title() { return tx(T + 'mudancaTitulo', 'Mudança de Moradia'); }, get subtitle() { return tx(T + 'mudancaSubtitulo', 'Novo lar, novos riscos'); }, pictograma: PICTOGRAMAS_ATIVIDADES.mudanca_residencia },
  { key: 'outro', get title() { return tx(T + 'outroTitulo', 'Outro Evento'); }, get subtitle() { return tx(T + 'outroSubtitulo', 'Cuidador, técnico, etc.'); }, pictograma: PICTOGRAMA_PLANEJAR },
];

export default function SituacoesTemporariasScreen({ navigation }) {
  const { t } = useTranslation('common');
  const isDark = useIsDark();
  const tema = useThemeDS();
  const s = useMemo(() => criarEstilos(tema), [tema]);

  function abrir(tipo) {
    if (tipo === 'reforma') {
      navigation.navigate('RenovationType');
      return;
    }
    if (tipo === 'festa') {
      navigation.navigate('VisitType');
      return;
    }
    navigation.navigate('ModoSituacaoAtiva', { type: tipo, title: OPTIONS.find(o => o.key === tipo)?.title || tx(T + 'situacao', 'Situação') });
  }

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* O nome da página é o do cartão que a abriu (Atividades Eventuais). */}
        <NeoScreenHeader
          title={t('telas.ModoPreventivoScreenNeo.planejarSituacaoTitulo', 'Planejar reforma, visita ou mudança')}
          subtitle={t('headersFirst.monitoreRiscosTemporRios', 'Monitore riscos temporários')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
          <View style={s.corpo}>
            <H3 style={s.pergunta}>{t('headersFirst.selecioneOEvento', 'Qual evento?')}</H3>
            <Body style={s.apoio}>
              {t('headersFirst.ajustaremosAsRecomendaEsDeSeguranAComBas', 'Ajustaremos as recomendações de segurança com base no cenário escolhido.')}
            </Body>

            {OPTIONS.map(opt => (
              <NeoGlifoCard
                key={opt.key}
                source={opt.pictograma}
                titulo={opt.title}
                sub={opt.subtitle}
                tom="warning"
                largo
                seta
                arte={96}
                tamanhoTitulo={18}
                style={s.cartao}
                onPress={() => abrir(opt.key)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
  corpo: { paddingHorizontal: Neo.spacing.lg, paddingTop: Neo.spacing.sm },
  pergunta: { color: Neo.colors.textOn.ink, marginBottom: 4 },
  apoio: { color: Neo.colors.textOn.muted, lineHeight: 21, marginBottom: Neo.spacing.md },
  cartao: { height: 118, marginBottom: Neo.spacing.sm + 4 },
});
