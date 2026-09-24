import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
