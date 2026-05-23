// components/MapaSensivelCard.js
//
// Card "Seu mapa sensível" — reflexo do briefing vivo na Home.
// Consome RiskInterpreterService.interpret() e mostra resumo + recomendação
// em tom Agnaldo. É o ponto de entrada visual da fase ORIENTAR.
//
// PRINCÍPIO: tom suave. Cor adapta-se à urgência (verde = ok, âmbar =
// atenção, vermelho discreto = urgente) mas SEM alarmismo gráfico.
// Não tem caveiras nem "PERIGO" em caixa-alta — fala como gente fala.

import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NeoCard from './NeoCard';
import NeoIcon from './NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import RiskInterpreterService from '../services/RiskInterpreterService';

export default function MapaSensivelCard() {
    const navigation = useNavigation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    const [interpretation, setInterpretation] = useState(null);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);
        try {
            const result = await RiskInterpreterService.interpret();
            setInterpretation(result);
        } catch (_) {
            setInterpretation(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Recarrega ao voltar pra Home (briefing pode ter mudado)
    useFocusEffect(useCallback(() => {
        reload();
    }, [reload]));

    if (loading && !interpretation) {
        return (
            <NeoCard variant="elevated" style={s.card}>
                <ActivityIndicator size="small" color={Neo.colors.primary[500]} />
            </NeoCard>
        );
    }

    if (!interpretation) return null;

    const { prioridades, leitura, contexto } = interpretation;
    const totalCritical = prioridades.reduce((sum, p) => sum + p.criticalCount, 0);
    const totalWarning = prioridades.reduce((sum, p) => sum + p.warningCount, 0);

    // Determina tom visual sem cair em alarmismo
    let tone = 'calm';
    let accentColor = '#10B981'; // emerald — tudo no eixo
    let toneLabel = 'No eixo';
    if (totalCritical >= 3) {
        tone = 'urgent';
        accentColor = '#EF4444';
        toneLabel = `${totalCritical} urgentes`;
    } else if (totalCritical >= 1) {
        tone = 'attention';
        accentColor = '#F59E0B';
        toneLabel = `${totalCritical} urgente${totalCritical > 1 ? 's' : ''}`;
    } else if (totalWarning > 0) {
        tone = 'mild';
        accentColor = '#0EA5E9';
        toneLabel = `${totalWarning} ponto${totalWarning > 1 ? 's' : ''}`;
    }

    const titleColor = isDark ? themeColors.neutral[900] : Neo.colors.neutral[900];
    const subColor = isDark ? themeColors.neutral[700] : Neo.colors.neutral[700];
    const labelColor = isDark ? themeColors.neutral[600] : Neo.colors.neutral[600];

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MapaSensivelHub')}
            accessibilityRole="button"
            accessibilityLabel={`Seu mapa sensível. ${leitura.resumo} ${leitura.recomendacao}`}
        >
            <NeoCard variant="elevated" style={s.card}>
                <View style={s.headerRow}>
                    <View style={[s.iconWrap, { backgroundColor: accentColor + '22' }]}>
                        <NeoIcon name="Activity" size={20} color={accentColor} variant="Bold" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[s.label, { color: labelColor }]}>SEU MAPA SENSÍVEL</Text>
                        <Text style={[s.title, { color: titleColor }]}>{leitura.resumo}</Text>
                    </View>
                    <View style={[s.badge, { backgroundColor: accentColor }]}>
                        <Text style={s.badgeText}>{toneLabel}</Text>
                    </View>
                </View>

                <Text style={[s.recomendacao, { color: subColor }]}>{leitura.recomendacao}</Text>

                {/* Contexto familiar resumido — só aparece se houver dados */}
                {contexto.totalPerfis > 0 && (
                    <View style={s.contextRow}>
                        <Text style={[s.contextItem, { color: labelColor }]}>
                            {contexto.humanos} morador{contexto.humanos !== 1 ? 'es' : ''}
                            {contexto.pets > 0 ? ` · ${contexto.pets} pet${contexto.pets > 1 ? 's' : ''}` : ''}
                        </Text>
                        {contexto.vulneraveis > 0 && (
                            <Text style={[s.contextItem, { color: accentColor, fontWeight: '700' }]}>
                                · {contexto.vulneraveis} com atenção especial
                            </Text>
                        )}
                    </View>
                )}
            </NeoCard>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 14,
        borderRadius: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
        marginBottom: 3,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 15,
        fontWeight: '800',
        lineHeight: 20,
        letterSpacing: -0.2,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    recomendacao: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 18,
        marginTop: 2,
    },
    contextRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        gap: 4,
    },
    contextItem: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
});
