/**
 * AuditoriaAtividadeModal.js — a verificação de uma categoria de Atividades Eventuais, em três etapas:
 * educação (o guia), verificação (as perguntas S / N / N/A) e resultado.
 *
 * POR QUE EXISTE
 * Era um bloco de ~330 linhas dentro da tela, no modelo antigo: foto de estoque remota no topo,
 * botões com hex soltos e uma frase fixa em português ("Ambiente verificado e seguro!") que saía
 * assim em qualquer idioma. Agora segue a linguagem da Home (ANATOMIA §9.6 e §9.7): cabeçalho padrão,
 * cartão retroiluminado com o pictograma da categoria, respostas na peça compartilhada RespostaSNA.
 *
 * O QUE MUDOU NA REGRA (não só no visual)
 * 1. A pontuação contava o "N/A" como seguro no numerador e o tirava do denominador: com 2 N/A e 6
 *    seguras de 8 respondidas dava 8/8 = 100% mesmo havendo itens em risco. Agora o N/A fica fora dos dois.
 * 2. Tudo "N/A" (ambiente que não se aplica) dava "0% Seguro" em vermelho. Agora diz que não se aplica.
 * 3. O tom do resultado nunca é "seguro" havendo ponto em aberto, e é crítico se algum ponto crítico
 *    foi marcado como risco. Antes, 11 de 12 seguras com o ponto crítico em risco saía verde.
 *    O limiar de cada faixa continua sendo só o do ScoreService (getTom).
 *
 * A ligação com "EPIs & Ferramentas" (proposta E7, aprovada em 28/10/2026) aparece nas categorias em
 * que se usam ferramentas e proteção: obras, altura e faxina pesada.
 *
 * @param {object|null} risco   a categoria (de RISK_CATEGORIES)
 * @param {boolean} visivel
 * @param {() => void} onFechar
 * @param {object} navigation
 */
import { useEffect, useMemo, useState } from 'react';
import { Modal, View, ScrollView, LayoutAnimation, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { DS as Neo, withAlpha } from '../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../utils/ThemeContext';
import AppBackground from './AppBackground';
import NeoScreenHeader from './NeoScreenHeader';
import NeoGlifoCard from './NeoGlifoCard';
import NeoCard from './NeoCard';
import NeoIcon from './NeoIcon';
import NeoPill from './NeoPill';
import ButtonNeo from './ButtonNeo';
import TriColorBar from './TriColorBar';
import RespostaSNA from './RespostaSNA';
import { H3, Body, Small } from './NeoTypography';
import NeoAlert from '../utils/NeoAlert';
import ScoreService from '../services/ScoreService';
import { resolveEmergencyTokens } from '../utils/emergencyTokens';
import { PICTOGRAMAS_ATIVIDADES, PICTOGRAMA_PLANEJAR, RECUO_DA_ARTE } from '../data/pictogramasAtividades';

// Categorias em que se usam ferramentas e proteção: ligam ao conteúdo de EPIs & Ferramentas.
const COM_LIGACAO_A_EPIS = new Set(['reformas_obras', 'servicos_altura', 'faxina_quimica']);

export default function AuditoriaAtividadeModal({ risco, visivel, onFechar, navigation }) {
    const { t } = useTranslation();
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);

    const [etapa, setEtapa] = useState('educacao'); // 'educacao' | 'verificacao' | 'resultado'
    const [respostas, setRespostas] = useState([]);

    // Cada abertura recomeça pela educação, com as respostas zeradas.
    useEffect(() => {
        if (visivel) {
            setEtapa('educacao');
            setRespostas([]);
        }
    }, [visivel, risco?.id]);

    const perguntas = risco?.questions || [];
    const total = perguntas.length;
    const respondidas = respostas.length;
    const naCount = respostas.filter(a => a.status === 'na').length;
    const efetivo = total - naCount;                                              // o N/A sai dos dois lados da conta
    const seguras = respostas.filter(a => a.isSafe && a.status !== 'na').length;
    const percentual = total > 0 ? Math.round((respondidas / total) * 100) : 0;
    const pontuacao = efetivo > 0 ? Math.round((seguras / efetivo) * 100) : 0;
    const pendencias = respostas.filter(a => !a.isSafe && a.status !== 'na');
    const criticaDe = (id) => !!perguntas.find(q => q.id === id)?.critico;
    const temCritico = pendencias.some(a => criticaDe(a.questionId));

    const tomDoResultado = () => {
        if (efetivo === 0) return 'muted';                  // nada a verificar
        if (pendencias.length === 0) return 'success';
        if (temCritico || pontuacao === 0) return 'error';
        const daFaixa = ScoreService.getTom(pontuacao);
        return daFaixa === 'success' ? 'warning' : daFaixa; // com ponto em aberto, não é "seguro"
    };

    const responder = (pergunta, status, indice) => {
        let opcao = null;
        let segura = false;
        if (status === 'conforme') { opcao = pergunta.options.find(o => o.safe); segura = true; }
        else if (status === 'risco') { opcao = pergunta.options.find(o => !o.safe); segura = false; }
        else if (status === 'na') { opcao = { label: 'N/A' }; segura = true; } // N/A não conta como risco

        const nova = {
            questionId: pergunta.id,
            questionText: pergunta.text,
            selectedOption: opcao?.label,
            isSafe: segura,
            status,
            consequence: !segura && status !== 'na' ? pergunta.consequence : null,
            checkAction: !segura && status !== 'na' ? pergunta.checkAction : null,
        };
        setRespostas(anteriores => [...anteriores.filter(a => a.questionId !== pergunta.id), nova]);

        // Primeira pergunta marcada N/A: pergunta se o ambiente inteiro não se aplica.
        if (status === 'na' && indice === 0) {
            NeoAlert.alert(
                t('telas.ModoPreventivoScreenNeo.ambienteNaoAplicavel', 'Ambiente Não Aplicável?'),
                t('telas.ModoPreventivoScreenNeo.desejaMarcarEsteAmbienteInteiroComo', 'Deseja marcar este ambiente inteiro como não aplicável e finalizar?'),
                [
                    { text: t('telas.ModoPreventivoScreenNeo.naoApenasEsta', 'Não, apenas esta'), style: 'cancel' },
                    {
                        text: t('telas.ModoPreventivoScreenNeo.simPularAmbiente', 'Sim, Pular Ambiente'),
                        onPress: () => {
                            setRespostas(perguntas.map(q => ({
                                questionId: q.id,
                                questionText: q.text,
                                selectedOption: 'N/A',
                                isSafe: true,
                                status: 'na',
                            })));
                            setEtapa('resultado');
                        },
                    },
                ],
            );
        }
    };

    const iniciar = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setEtapa('verificacao');
    };

    const finalizar = () => {
        if (percentual === 100) setEtapa('resultado');
        else NeoAlert.alert(t('telas.ModoPreventivoScreenNeo.atencao', 'Atenção'), t('telas.ModoPreventivoScreenNeo.respondaATodasAsQuestoesPara', 'Responda a todas as questões para concluir.'));
    };

    const irParaEpis = () => {
        onFechar?.();
        navigation?.navigate('FerramentasTrabalho');
    };

    const pictograma = risco ? (PICTOGRAMAS_ATIVIDADES[risco.id] || PICTOGRAMA_PLANEJAR) : PICTOGRAMA_PLANEJAR;

    // ── ETAPA 1 — educação ──
    const renderEducacao = () => (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.corpo}>
            <NeoGlifoCard
                source={pictograma}
                titulo={t('headersFirst.guiaDeSeguranA', 'Guia de Segurança')}
                sub={risco.subtitle}
                tom="info"
                largo
                arte={112}
                recuo={RECUO_DA_ARTE[risco.id] || 0}
                tamanhoTitulo={22}
                style={s.hero}
            />

            <Body style={s.descricao}>
                {risco.educational?.description || t('telas.ModoPreventivoScreenNeo.sigaAsInstrucoesDeSegurancaAbaixo', 'Siga as instruções de segurança abaixo.')}
            </Body>

            <NeoCard variant="elevated" style={s.cartao}>
                <View style={s.cabecalhoSecao}>
                    <NeoIcon name="Lightbulb" variant="Linear" size={22} color={tema.colors.textOn.brand} />
                    <H3 style={s.tituloSecao}>{t('headersFirst.dicasDeOuro', 'Dicas de Ouro:')}</H3>
                </View>
                {(risco.educational?.keyPoints || []).map((ponto, i) => (
                    <View key={i} style={s.dica}>
                        <NeoIcon name="TickCircle" variant="Bold" size={18} color={tema.colors.textOn.brand} style={s.dicaIcone} />
                        <Body style={s.dicaTexto}>{ponto}</Body>
                    </View>
                ))}
            </NeoCard>

            {COM_LIGACAO_A_EPIS.has(risco.id) && (
                <NeoCard variant="elevated" onPress={irParaEpis} style={s.cartao}>
                    <View style={s.ligacao}>
                        <NeoIcon name="Setting2" variant="Linear" size={24} color={tema.colors.textOn.brand} />
                        <View style={s.ligacaoTexto}>
                            <Body style={s.ligacaoTitulo}>{t('knowledgeHub.ppeTools', 'EPIs & Ferramentas')}</Body>
                            <Small style={s.muted}>{t('telas.ModoPreventivoScreenNeo.verEpisDesc', 'Qual proteção usar em cada ferramenta')}</Small>
                        </View>
                        <NeoIcon name="ArrowRight2" variant="Linear" size={16} color={tema.colors.textOn.muted} />
                    </View>
                </NeoCard>
            )}

            <ButtonNeo
                title={t('headersFirst.iniciarVerificaO', 'Iniciar Verificação')}
                iconName="ArrowRight2"
                onPress={iniciar}
                type="primary"
                style={s.botao}
            />
        </ScrollView>
    );

    // ── ETAPA 2 — verificação ──
    const renderVerificacao = () => (
        <View style={s.preenche}>
            <View style={s.progresso}>
                <View style={s.progressoLinha}>
                    <Small style={s.progressoTexto}>
                        {respondidas}{t('telas.ModoPreventivoScreenNeo.de', ' de ')}{total}{t('telas.ModoPreventivoScreenNeo.verificados', ' verificados')}
                    </Small>
                    <Small style={s.progressoPct}>{percentual}%</Small>
                </View>
                <TriColorBar {...TriColorBar.calculate(respostas, perguntas)} height={8} showLabels />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.corpo}>
                <NeoCard variant="elevated" padding={0} style={s.cartao}>
                    {perguntas.map((q, i) => (
                        <View key={q.id} style={[s.pergunta, i > 0 && s.divisor]}>
                            <Body style={s.perguntaTexto}>{resolveEmergencyTokens(q.text)}</Body>
                            <RespostaSNA
                                valor={respostas.find(a => a.questionId === q.id)?.status || null}
                                onChange={(status) => responder(q, status, i)}
                            />
                        </View>
                    ))}
                </NeoCard>

                <ButtonNeo
                    title={t('headersFirst.finalizarProtocolo', 'Finalizar Protocolo')}
                    onPress={finalizar}
                    type="primary"
                    style={s.botao}
                />
            </ScrollView>
        </View>
    );

    // ── ETAPA 3 — resultado ──
    const renderResultado = () => {
        const tom = tomDoResultado();
        const mensagem = efetivo === 0
            ? t('telas.ModoPreventivoScreenNeo.resultadoNaoAplicavel', 'Ambiente não aplicável: nada a verificar.')
            : pendencias.length === 0
                ? t('headersFirst.nenhumaPendNciaIdentificadaOAmbienteEstS', 'Nenhuma pendência identificada. O ambiente está seguro.')
                : t('telas.ModoPreventivoScreenNeo.pontosDeAtencao', {
                    count: pendencias.length,
                    defaultValue: pendencias.length === 1 ? 'Encontramos {{count}} ponto de atenção.' : 'Encontramos {{count}} pontos de atenção.',
                });
        const titulo = efetivo === 0
            ? t('telas.ModoPreventivoScreenNeo.resultadoNaoAplicavelTitulo', 'Não aplicável')
            : `${pontuacao}${t('telas.ModoPreventivoScreenNeo.seguro', '% Seguro')}`;

        // Críticos primeiro.
        const ordenadas = [...pendencias].sort((a, b) => Number(criticaDe(b.questionId)) - Number(criticaDe(a.questionId)));

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.corpo}>
                {/* O tom é o do DADO (a pontuação e os pontos críticos), não o da categoria. */}
                <NeoGlifoCard
                    source={pictograma}
                    titulo={titulo}
                    sub={mensagem}
                    tom={tom}
                    largo
                    arte={112}
                    recuo={RECUO_DA_ARTE[risco.id] || 0}
                    tamanhoTitulo={26}
                    style={s.hero}
                />

                {efetivo > 0 && (
                    <NeoCard variant="elevated" style={s.cartao}>
                        <Small style={s.eyebrow}>{t('headersFirst.dISTRIBUIODECONFORMIDADE', 'DISTRIBUIÇÃO DE CONFORMIDADE')}</Small>
                        <TriColorBar {...TriColorBar.calculate(respostas, perguntas)} height={12} showLabels showLegend />
                    </NeoCard>
                )}

                {ordenadas.length > 0 && (
                    <>
                        <H3 style={s.tituloLista}>{t('headersFirst.pontosDeAtenO', 'Pontos de Atenção')}</H3>
                        {ordenadas.map((resposta) => {
                            const critico = criticaDe(resposta.questionId);
                            const tomPonto = critico ? 'error' : 'warning';
                            const tinta = tema.colors.textOn[tomPonto];
                            return (
                                <NeoCard key={resposta.questionId} variant="elevated" style={s.cartao}>
                                    <NeoPill
                                        tom={tomPonto}
                                        icone="Warning2"
                                        label={critico ? t('telas.ModoPreventivoScreenNeo.pontoCritico', 'Crítico') : t('telas.ModoPreventivoScreenNeo.pontoAtencao', 'Atenção')}
                                    />
                                    <Body style={s.pontoTitulo}>{resolveEmergencyTokens(resposta.questionText)}</Body>
                                    {!!resposta.consequence && (
                                        <Small style={s.muted}>{resolveEmergencyTokens(resposta.consequence)}</Small>
                                    )}
                                    {!!resposta.checkAction && (
                                        <View style={[s.acao, { backgroundColor: withAlpha(tinta, 0.1) }]}>
                                            <Small style={[s.acaoTexto, { color: tinta }]}>
                                                {t('telas.ModoPreventivoScreenNeo.acao', 'AÇÃO: ')}{resolveEmergencyTokens(resposta.checkAction)}
                                            </Small>
                                        </View>
                                    )}
                                </NeoCard>
                            );
                        })}
                    </>
                )}

                <ButtonNeo
                    title={t('headersFirst.fechar', 'Fechar')}
                    onPress={onFechar}
                    type="primary"
                    style={s.botao}
                />
            </ScrollView>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={!!visivel}
            onRequestClose={onFechar}
            statusBarTranslucent
        >
            <AppBackground>
                <SafeAreaView style={s.preenche} edges={['top', 'bottom', 'left', 'right']}>
                    <StatusBar style={isDark ? 'light' : 'dark'} />
                    {risco && (
                        <>
                            {/* O nome da página é o do cartão que a abriu. */}
                            <NeoScreenHeader title={risco.title} onBack={onFechar} />
                            {etapa === 'educacao' && renderEducacao()}
                            {etapa === 'verificacao' && renderVerificacao()}
                            {etapa === 'resultado' && renderResultado()}
                        </>
                    )}
                </SafeAreaView>
            </AppBackground>
        </Modal>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    preenche: { flex: 1, backgroundColor: 'transparent' },
    corpo: { paddingHorizontal: Neo.spacing.lg, paddingBottom: Neo.spacing.xl },
    hero: { height: 150, marginTop: Neo.spacing.xs, marginBottom: Neo.spacing.md },
    descricao: { color: Neo.colors.textOn.ink, lineHeight: 23, marginBottom: Neo.spacing.md },
    cartao: { marginBottom: Neo.spacing.md },
    cabecalhoSecao: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    tituloSecao: { fontSize: 16, color: Neo.colors.textOn.ink },
    dica: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    dicaIcone: { marginTop: 2 },
    dicaTexto: { flex: 1, color: Neo.colors.textOn.ink, lineHeight: 22 },
    ligacao: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    ligacaoTexto: { flex: 1 },
    ligacaoTitulo: { fontWeight: '700', color: Neo.colors.textOn.ink },
    muted: { color: Neo.colors.textOn.muted, lineHeight: 19 },
    botao: { marginTop: Neo.spacing.sm },
    progresso: { paddingHorizontal: Neo.spacing.lg, paddingBottom: Neo.spacing.sm },
    progressoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    progressoTexto: { fontWeight: '600', color: Neo.colors.textOn.muted },
    progressoPct: { fontWeight: '800', color: Neo.colors.textOn.ink },
    pergunta: { padding: Neo.spacing.md, gap: 12 },
    divisor: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Neo.colors.neutral[300] },
    perguntaTexto: { color: Neo.colors.textOn.ink, lineHeight: 22, fontWeight: '500' },
    eyebrow: { color: Neo.colors.textOn.muted, fontWeight: '700', letterSpacing: 1.2, marginBottom: 8 },
    tituloLista: { color: Neo.colors.textOn.ink, marginTop: Neo.spacing.sm, marginBottom: Neo.spacing.sm },
    pontoTitulo: { color: Neo.colors.textOn.ink, fontWeight: '700', marginTop: 10, marginBottom: 4 },
    acao: { marginTop: 10, padding: 12, borderRadius: 12 },
    acaoTexto: { fontWeight: '700', lineHeight: 19 },
});
