import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Colors, Shadows } from '../utils/Theme';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoAlert from '../utils/NeoAlert';

// --- DATA: SAFETY PROTOCOLS (FULL DATABASE) ---
const PROTOCOLS = {
    '1': { // Telhado
        title: 'Trabalho em Altura & Telhado',
        questions: [
            { id: 'q1', text: 'Telhas de Fibrocimento (Amianto)?', stopMsg: 'Risco de Ruptura', riskIf: 'yes', icon: 'alert-outline' },
            { id: 'q2', text: 'Possui tábuas para distribuir peso?', stopMsg: 'RISCO DE MORTE. Use tábuas.', stopIf: 'no', requiredIfQ1: 'yes', icon: 'construct-outline' },
            { id: 'q3', text: 'Altura maior que 2m?', riskIf: 'yes', icon: 'arrow-up-outline' },
            { id: 'q4', text: 'Escada travada e amarrada?', stopMsg: 'Escada solta mata. Amarre.', stopIf: 'no', icon: 'trending-up-outline' },
            { id: 'q5', text: 'Tem ajudante no local?', tip: 'Trabalho solo é perigoso.', riskIf: 'no', icon: 'people-outline' },
            { id: 'q6', text: 'Avisou alguém que vai subir?', stopMsg: 'REGRA DE OURO: Avise antes.', stopIf: 'no', icon: 'megaphone-outline' },
            { id: 'q7', text: 'Celular/Apito no bolso?', tip: 'Leve comunicação.', riskIf: 'no', icon: 'call-outline' }
        ],
        risks: ['Queda Fatal', 'Ruptura', 'Choque Elétrico'],
        measures: ['Use EPI', 'Isole a área', 'Três pontos de contato']
    },
    '2': { // Em Reforma
        title: 'Segurança em Obras',
        questions: [
            { id: 'r1', text: 'Vai mexer na rede elétrica?', riskIf: 'yes', icon: 'flash-outline' },
            { id: 'r2', text: 'Disjuntor Geral foi DESLIGADO?', stopIf: 'no', requiredIfQ1: 'yes', stopMsg: 'CHOQUE FATAL. Desligue a energia.', icon: 'power-outline' },
            { id: 'r3', text: 'Área da obra está isolada de crianças/pets?', stopIf: 'no', stopMsg: 'Isole a area fisicamente antes de iniciar.', icon: 'close-circle-outline' },
            { id: 'r4', text: 'Ferramentas de corte possuem proteção?', icon: 'cut-outline' }
        ],
        risks: ['Choque Elétrico', 'Cortes Profundos', 'Poeira Tóxica'],
        measures: ['Use Óculos de Proteção', 'Descarte entulho rápido', 'Isole Crianças']
    },
    '3': { // Chegou Bebê
        title: 'Casa Segura para Bebê',
        questions: [
            { id: 'b1', text: 'Berço VAZIO (sem almofadas/fofos)?', stopIf: 'no', stopMsg: 'RISCO DE SUFOCAMENTO. Bebê deve dormir em colchão firme e vazio.', icon: 'bed-outline' },
            { id: 'b2', text: 'Todas as tomadas baixas têm protetor?', riskIf: 'no', stopMsg: 'Choque. Instale protetores hoje.', icon: 'flash-off-outline' },
            { id: 'b3', text: 'Remédios e Químicos estão no alto?', stopIf: 'no', stopMsg: 'Intoxicação é rápida. Suba os produtos.', icon: 'medkit-outline' },
            { id: 'b4', text: 'Cordões de cortina fora de alcance?', icon: 'alert-circle-outline' }
        ],
        risks: ['Morte Súbita (Sufocamento)', 'Choque', 'Intoxicação'],
        measures: ['Sono Seguro (Barriga pra cima)', 'Chão Limpo (Pequenos objetos)', 'Móveis Fixados']
    },
    '4': { // Pet Deu Cria
        title: 'Filhotes em Casa',
        questions: [
            { id: 'p1', text: 'Fios elétricos estão protegidos/escondidos?', stopIf: 'no', stopMsg: 'Filhotes roem fios e morrem eletrocutados.', icon: 'flash-outline' },
            { id: 'p2', text: 'Acesso à piscina/baldes bloqueado?', stopIf: 'no', stopMsg: 'Risco altíssimo de afogamento.', icon: 'water-outline' },
            { id: 'p3', text: 'Plantas tóxicas removidas?', icon: 'flower-outline' }
        ],
        risks: ['Eletrocussão', 'Afogamento', 'Intoxicação'],
        measures: ['Bloqueie rotas de fuga', 'Esconda fios', 'Recolha objetos pequenos']
    },
    '5': { // Chuva & Enchente
        title: 'Tempestade e Alagamento',
        questions: [
            { id: 'c1', text: 'Água ameaça atingir tomadas?', stopIf: 'yes', stopMsg: 'PERIGO MORTAL. Desligue a Chave Geral AGORA.', icon: 'water-outline' },
            { id: 'c2', text: 'Telhas estão bem fixadas?', icon: 'home-outline' },
            { id: 'c3', text: 'Calhas estão limpas?', icon: 'trash-outline' }
        ],
        risks: ['Eletrocussão em massa', 'Desabamento', 'Doenças'],
        measures: ['Desligue Energia', 'Suba móveis', 'Evite contato com a água']
    },
    '6': { // Remédio Acabou
        title: 'Gestão de Medicamentos',
        questions: [
            { id: 'm1', text: 'É medicação de uso contínuo (Coração/Pressão)?', riskIf: 'yes', icon: 'pulse-outline' },
            { id: 'm2', text: 'Já comprou/pediu a reposição?', stopIf: 'no', requiredIfQ1: 'yes', stopMsg: 'Falhar na dose pode ser fatal. Compre AGORA.', icon: 'cart-outline' },
            { id: 'm3', text: 'Conferiu a validade do novo?', icon: 'calendar-outline' }
        ],
        risks: ['Crise Hipertensiva', 'AVC', 'Perda de Eficácia'],
        measures: ['Compre antes de acabar', 'Tire foto da caixa', 'Mantenha lista atualizada']
    }
};

export default function SafetyPermitScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { eventId } = route.params || {};
    const protocol = PROTOCOLS[eventId] || PROTOCOLS['1']; // Fallback seguro, mas idealmente mostra erro

    const [step, setStep] = useState('assessment');
    const [answers, setAnswers] = useState({});
    const [blockReason, setBlockReason] = useState(null);

    // Se ID inválido
    if (!PROTOCOLS[eventId]) {
        return (
            <AppBackground>
        <SafeAreaView style={styles.center}>
                <Text>Protocolo '{eventId}' não encontrado.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>{t('headersFirst.voltar', 'Voltar')}</Text>
                </TouchableOpacity>
            </SafeAreaView>
      </AppBackground>
        );
    }

    // Use o protocol correto
    const activeProtocol = PROTOCOLS[eventId];

    const toggleAnswer = (qId, val) => {
        setAnswers(prev => ({ ...prev, [qId]: val }));
    };

    const validate = () => {
        // Check for stops
        for (let q of activeProtocol.questions) {
            const ans = answers[q.id];

            // Required Logic Check
            // Se requiredIfQ1 existir, só valida se Q1 match. (Simplificação: aqui assumimos que q1 é sempre q1)
            // Mas IDs são unicos agora (r1, b1...).
            // Logica complexa de dependencia? Vamos simplificar: Valida TUDO.

            if (ans === undefined) {
                NeoAlert.alert("Atenção", "Responda todas as perguntas para garantir sua segurança.");
                return;
            }
            if (q.stopIf && ans === q.stopIf) {
                setBlockReason(q.stopMsg);
                setStep('blocked');
                return;
            }
        }
        setStep('approved');
    };

    const renderToggle = (q) => {
        const val = answers[q.id];
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleBtn, val === 'no' && styles.btnNoActive]}
                    onPress={() => toggleAnswer(q.id, 'no')}
                >
                    <Text style={[styles.toggleText, val === 'no' && styles.textActiveWhite]}>{t('headersFirst.nO', 'NÃO')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleBtn, val === 'yes' && styles.btnYesActive]}
                    onPress={() => toggleAnswer(q.id, 'yes')}
                >
                    <Text style={[styles.toggleText, val === 'yes' && styles.textActiveWhite]}>{t('headersFirst.sIM', 'SIM')}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderAssessment = () => (
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{t('headersFirst.checklistDeVerificaO', 'Checklist de Verificação')}</Text>
                <View style={styles.card}>
                    {activeProtocol.questions.map((q, index) => (
                        <View key={q.id} style={[styles.itemRow, index < activeProtocol.questions.length - 1 && styles.borderBottom]}>
                            <View style={styles.iconBox}>
                                <NeoIcon name={q.icon || 'alert-circle-outline'} size={24} color={Colors.primary} />
                            </View>
                            <Text style={styles.itemLabel}>{q.text}</Text>
                            {renderToggle(q)}
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.actionBtn} onPress={validate}>
                <Text style={styles.actionBtnText}>{t('headersFirst.verificarSeguranA', 'Verificar Segurança')}</Text>
                <NeoIcon name="ShieldTick" size={24} color="#FFF" />
            </TouchableOpacity>
        </ScrollView>
    );

    const renderBlocked = () => (
        <View style={styles.blockedContainer}>
            <NeoIcon name="StopCircle" size={80} color="#D32F2F" />
            <Text style={styles.blockedTitle}>{t('headersFirst.pAREIMEDIATAMENTE', 'PARE IMEDIATAMENTE')}</Text>
            <Text style={styles.blockedReason}>{blockReason}</Text>
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep('assessment')}>
                <Text style={styles.backBtnText}>{t('headersFirst.voltarECorrigir', 'Voltar e Corrigir')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.riskLink} onPress={() => setStep('approved')}>
                <Text style={styles.riskLinkText}>{t('headersFirst.estouCienteAssumirRisco', 'Estou ciente (Assumir Risco)')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderApproved = () => (
        <View style={styles.blockedContainer}>
            <NeoIcon name="TickCircle" size={80} color={Neo.colors.feedback.success} />
            <Text style={[styles.blockedTitle, { color: Neo.colors.feedback.success }]}>{t('headersFirst.aTIVIDADELIBERADA', 'ATIVIDADE LIBERADA')}</Text>
            <Text style={styles.safeText}>{t('headersFirst.sigaAsMedidasRecomendadas', 'Siga as medidas recomendadas:')}</Text>
            <View style={{ marginTop: 20 }}>
                {activeProtocol.measures.map((m, i) => (<Text key={i} style={styles.measurePoint}>• {m}</Text>))}
            </View>
            <TouchableOpacity style={[styles.backBtn, { backgroundColor: Neo.colors.primary[600] }]} onPress={() => navigation.goBack()}>
                <Text style={styles.backBtnText}>{t('headersFirst.finalizar', 'Finalizar')}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{t('headersFirst.anLiseDeSeguranA', 'Análise de Segurança')}</Text>
                    <Text style={styles.headerSubtitle}>{activeProtocol.title}</Text>
                </View>
            </View>
            {step === 'assessment' && renderAssessment()}
            {step === 'blocked' && renderBlocked()}
            {step === 'approved' && renderApproved()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Neo.colors.neutral[200] },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { padding: 16 },

    // Header Padrão
    header: {
        backgroundColor: Colors.primary,
        padding: 20, paddingTop: 40,
        borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
        flexDirection: 'row', alignItems: 'center', gap: 16,
        ...Shadows.md
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: Neo.colors.neutral.white },
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },

    // Card List Style (Igual HomeMapping)
    sectionContainer: { marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Neo.colors.neutral[700], marginBottom: 8, marginLeft: 4 },
    card: { backgroundColor: 'transparent', borderRadius: 16, ...Shadows.sm, overflow: 'hidden' },
    itemRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
    borderBottom: { borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[200] },

    iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: Neo.colors.primary[100] || 'rgba(16,185,129,0.1)', justifyContent: 'center', alignItems: 'center' },
    itemLabel: { flex: 1, fontSize: 14, color: Neo.colors.neutral[900], fontWeight: '500' },

    // Toggle Style
    toggleContainer: { flexDirection: 'row', backgroundColor: Neo.colors.neutral[200], borderRadius: 8, padding: 2 },
    toggleBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, minWidth: 48, alignItems: 'center' },
    btnNoActive: { backgroundColor: Neo.colors.neutral[500] },
    btnYesActive: { backgroundColor: Colors.primary },
    toggleText: { fontSize: 11, fontWeight: 'bold', color: Neo.colors.neutral[500] },
    textActiveWhite: { color: Neo.colors.neutral.white },

    actionBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, ...Shadows.md },
    actionBtnText: { color: Neo.colors.neutral.white, fontSize: 18, fontWeight: 'bold' },

    blockedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
    blockedTitle: { fontSize: 22, fontWeight: 'bold', color: Neo.colors.feedback.error, marginTop: 20 },
    blockedReason: { fontSize: 16, color: Neo.colors.neutral[600], textAlign: 'center', marginVertical: 20 },
    backBtn: { backgroundColor: Neo.colors.feedback.error, padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 10 },
    backBtnText: { color: Neo.colors.neutral.white, fontWeight: 'bold' },
    riskLink: { marginTop: 20 },
    riskLinkText: { color: Neo.colors.neutral[500], textDecorationLine: 'underline' },
    measurePoint: { fontSize: 16, color: Neo.colors.neutral[900], marginBottom: 6 },
    safeText: { fontSize: 16, color: Neo.colors.neutral[600], marginBottom: 20 }
});
