import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, DeviceEventEmitter } from 'react-native';
import PaisAtualService, { EVENTO_PAIS } from '../services/PaisAtualService';
import { aceitarUsoDaLocalizacao } from '../components/AvisoPaisEmergencia';
import ConsentimentoIAService, { EVENTO_CONSENTIMENTO_IA } from '../services/ConsentimentoIAService';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing } from '../utils/Theme';
import { useTranslation } from 'react-i18next';
import { getPoliticaPrivacidade } from '../data/legal/politica_privacidade';

const Section = ({ title, children }) => (
    <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.text}>{children}</Text>
    </>
);

/**
 * Suas escolhas — desligar um uso tem de ser tão fácil quanto ligar (LGPD
 * art. 8º §5º; RGPD art. 7(3)). Hoje: a localização para identificar o país
 * dos números de emergência (services/PaisAtualService). O SOS continua a
 * enviar a localização no pedido de ajuda — isso depende só da permissão do
 * sistema.
 */
function SuasEscolhas() {
    const { t } = useTranslation('common');
    const [usaPais, setUsaPais] = useState(false);
    useEffect(() => {
        let vivo = true;
        const ler = () => PaisAtualService.usaLocalizacaoParaPais().then((v) => vivo && setUsaPais(v));
        ler();
        const sub = DeviceEventEmitter.addListener(EVENTO_PAIS, ler);
        return () => { vivo = false; sub.remove(); };
    }, []);
    const mudar = async (ligar) => {
        setUsaPais(ligar);
        if (ligar) await aceitarUsoDaLocalizacao();
        else await PaisAtualService.definirCiencia(false);
        setUsaPais(await PaisAtualService.usaLocalizacaoParaPais());
    };
    // Permissão para IA de terceiro (ver ConsentimentoIAService). Ligar pelo
    // interruptor mostra o mesmo texto do pedido — a pessoa vê o que vai.
    const [usaIA, setUsaIA] = useState(false);
    useEffect(() => {
        let vivo = true;
        const ler = () => ConsentimentoIAService.temConsentimento().then((v) => vivo && setUsaIA(v));
        ler();
        const sub = DeviceEventEmitter.addListener(EVENTO_CONSENTIMENTO_IA, ler);
        return () => { vivo = false; sub.remove(); };
    }, []);
    const mudarIA = async (ligar) => {
        setUsaIA(ligar);
        if (ligar) await ConsentimentoIAService.pedir();
        else await ConsentimentoIAService.definir(false);
        setUsaIA(await ConsentimentoIAService.temConsentimento());
    };
    return (
        <View style={styles.escolhas}>
            <Text style={styles.sectionTitle}>{t('privacidade.suasEscolhas', 'Suas escolhas')}</Text>
            <View style={styles.escolhaLinha}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.escolhaTitulo}>{t('privacidade.paisTitulo', 'Identificar o país pelos números de emergência')}</Text>
                    <Text style={styles.escolhaTexto}>{t('privacidade.paisTexto', 'Usa a localização, só no aparelho, para mostrar o número de emergência do país onde você está. Só o país é guardado. Desligado, os números seguem o país configurado no celular. O envio da localização no SOS não depende disto.')}</Text>
                </View>
                <Switch
                    value={usaPais}
                    onValueChange={mudar}
                    accessibilityLabel={t('privacidade.paisTitulo', 'Identificar o país pelos números de emergência')}
                />
            </View>
            <View style={[styles.escolhaLinha, { marginTop: 14 }]}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.escolhaTitulo}>{t('privacidade.iaTitulo', 'Análises com inteligência artificial')}</Text>
                    <Text style={styles.escolhaTexto}>{t('privacidade.iaTexto', 'Envia à OpenAI (EUA) a foto do Scanner e, para a análise personalizada, idade, condições de saúde e medicamentos — sem nome. Desligado, nada disso sai do aparelho e o resto do app funciona normalmente.')}</Text>
                </View>
                <Switch
                    value={usaIA}
                    onValueChange={mudarIA}
                    accessibilityLabel={t('privacidade.iaTitulo', 'Análises com inteligência artificial')}
                />
            </View>
        </View>
    );
}

export default function PrivacyPolicyScreen({ navigation }) {
    // A política NÃO é traduzida: cada idioma tem a sua, escrita para o regime
    // jurídico correspondente (LGPD, RGPD, EUA). Ver data/legal/.
    const { i18n } = useTranslation();
    const politica = getPoliticaPrivacidade(i18n.language);

    return (
        <AppBackground>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{politica.titulo}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.iconContainer}>
                        <NeoIcon name="Lock" size={48} color={Colors.primary} />
                    </View>

                    {politica.subtitulo ? (
                        <Text style={[styles.text, styles.subtitulo]}>{politica.subtitulo}</Text>
                    ) : null}

                    <SuasEscolhas />

                    {politica.secoes.map((sec) => (
                        <Section key={sec.titulo} title={sec.titulo}>{sec.texto}</Section>
                    ))}

                    <View style={{ height: 40 }} />
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: 14,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
    },
    content: {
        padding: Spacing.lg,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 16,
        marginBottom: 8,
    },
    escolhas: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingBottom: 14,
        marginTop: 12,
        marginBottom: 8,
    },
    escolhaLinha: { flexDirection: 'row', alignItems: 'center' },
    escolhaTitulo: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
    escolhaTexto: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
    subtitulo: {
        fontSize: 13,
        fontStyle: 'italic',
        marginBottom: 4,
    },
    text: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: 'justify',
    },
});
