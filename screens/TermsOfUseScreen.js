import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing } from '../utils/Theme';
import { CONTROLADOR } from '../data/legal/politica_privacidade';
import { getTermosUso } from '../data/legal/termos_uso';
import { getMedicalLabel, getFireDial, resolveEmergencyTokens } from '../utils/emergencyTokens';

export default function TermsOfUseScreen({ navigation }) {
    const { t, i18n } = useTranslation('common');
    const termos = getTermosUso(i18n.language);
    return (
      <AppBackground>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{termos.titulo}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <NeoIcon name="ShieldTick" size={48} color={Colors.primary} />
                </View>

                {/* Texto: data/legal/termos_uso.js — fonte única, a mesma das páginas
                    públicas (scripts/gerar_paginas_legais.js). Identificação do
                    fornecedor primeiro: os Termos são um contrato. */}
                <Text style={styles.fornecedor}>
                    {termos.fornecedor.replace('{{empresa}}', CONTROLADOR.razaoSocial || 'Vigilaro Care').replace('{{email}}', CONTROLADOR.email || '')}
                </Text>
                <Text style={styles.fornecedor}>{termos.atualizado}</Text>

                {termos.secoes.map((sec) => (
                    <View key={sec.titulo}>
                        <Text style={styles.sectionTitle}>{sec.titulo}</Text>
                        <Text style={styles.text}>
                            {sec.texto}
                            {/* Números do PAÍS onde a pessoa está (ver utils/emergencyTokens). */}
                            {sec.emergencia
                                ? `\n\n🚑 ${getMedicalLabel()}\n🚒 ${t('headersFirst.bombeirosRotulo', 'Bombeiros')}: ${getFireDial()}\n👮 ${t('headersFirst.policiaRotulo', 'Polícia')}: ${resolveEmergencyTokens('{{POLICE_NUMBER}}')}`
                                : ''}
                        </Text>
                    </View>
                ))}

                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')} accessibilityRole="link">
                    <Text style={[styles.text, { fontWeight: 'bold', color: Colors.primary, marginTop: 20 }]}>{t('telas.TermsOfUseScreen.politicaDePrivacidade', 'Política de Privacidade')}</Text>
                </TouchableOpacity>

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
        width: 36, height: 36, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center', justifyContent: 'center',
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
    fornecedor: {
        fontSize: 13,
        fontStyle: 'italic',
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: 'justify',
    },
});


