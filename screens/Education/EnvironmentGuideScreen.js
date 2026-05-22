
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../utils/Theme';
import { EDUCATIONAL_GUIDES } from '../../data/educational_guides';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function EnvironmentGuideScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { envId } = route.params;
    const guideItem = EDUCATIONAL_GUIDES[envId];

    if (!guideItem) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>{t('headersFirst.conteDoNOEncontrado', 'Conteúdo não encontrado.')}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#FFF" />
            <View style={[styles.header, { borderBottomColor: guideItem.color }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: guideItem.color }]}>{guideItem.label}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={[styles.iconHeader, { backgroundColor: guideItem.color }]}>
                    <NeoIcon name={guideItem.iconName} size={64} color="#FFF" />
                </View>

                <View style={styles.contentCard}>
                    <View style={styles.cardHeader}>
                        <NeoIcon name="ShieldTick" size={24} color={guideItem.color} variant="Bold" />
                        <Text style={styles.cardTitle}>{t('headersFirst.resumoOtimizadoRiscoAO', 'Resumo Otimizado (Risco + Ação)')}</Text>
                    </View>

                    <Text style={styles.guideText}>
                        {guideItem.content}
                    </Text>
                </View>

                {/* Extra: Dica visual ou Iconografia */}
                <View style={styles.tipBox}>
                    <NeoIcon name="LampCharge" size={20} color="#F57C00" />
                    <Text style={styles.tipText}>
                        {t('headersFirst.lembreSeAPrevenOAtivaDependeDeVerificaOC', 'Lembre-se: A prevenção ativa depende de verificação constante.')}
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        flexDirection: 'row', alignItems: 'center', gap: 16,
        padding: 20, paddingTop: 50, borderBottomWidth: 2
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    content: { padding: 24, alignItems: 'center' },

    iconHeader: {
        width: 100, height: 100, borderRadius: 50,
        justifyContent: 'center', alignItems: 'center', marginBottom: 32,
        ...Shadows.md
    },

    contentCard: {
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    cardHeader: {
        flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16
    },
    cardTitle: {
        fontSize: 16, fontWeight: 'bold', color: '#333', textTransform: 'uppercase'
    },
    guideText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#444',
        textAlign: 'left' // Leitura mais natural
    },

    tipBox: {
        flexDirection: 'row', gap: 10,
        backgroundColor: '#FFF3E0', padding: 16, borderRadius: 12, width: '100%'
    },
    tipText: { fontSize: 13, color: '#E65100', flex: 1 }
});
