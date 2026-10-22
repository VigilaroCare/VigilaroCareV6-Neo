/**
 * DoseAtrasadaScreen.js
 * Vigilaro Care V6 Neo
 *
 * "Atrasou ou esqueceu uma dose?" — orientacao geral, com vocabulo de cautela,
 * que aponta para a bula e para o medico ou profissional de saude responsavel.
 * O app nao decide pelo usuario: ver o cabecalho de data/dose_atrasada.js.
 *
 * Acesso: MedicationRemindersScreen → cartao "Atrasou ou esqueceu uma dose?"
 */

import { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { tx } from '../../utils/txFixo';
import { t_deep } from '../../utils/getLocalizedField';
import { DOSE_ATRASADA } from '../../data/dose_atrasada';

export default function DoseAtrasadaScreen({ navigation }) {
    // t_deep: idioma do usuario + numeros de emergencia/intoxicacao do pais.
    const D = useMemo(() => t_deep(DOSE_ATRASADA), []);
    const [escolha, setEscolha] = useState(null);
    const opcao = D.opcoes.find((o) => o.id === escolha);

    return (
        <AppBackground>
            <StatusBar style="dark" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        accessibilityLabel={tx('telas.MedicationRemindersScreen.voltar', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H2 style={s.headerTitle}>{D.titulo}</H2>
                </View>

                <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                    <Body style={s.intro}>{D.intro}</Body>

                    <H3 style={s.secao}>{D.pergunta}</H3>
                    <View style={s.opcoes}>
                        {D.opcoes.map((o) => {
                            const ativa = o.id === escolha;
                            return (
                                <TouchableOpacity
                                    key={o.id}
                                    onPress={() => setEscolha(o.id)}
                                    style={[s.opcao, ativa && s.opcaoAtiva]}
                                    accessibilityRole="radio"
                                    accessibilityState={{ selected: ativa }}
                                >
                                    <Body style={[s.opcaoTexto, ativa && s.opcaoTextoAtivo]}>{o.rotulo}</Body>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {opcao ? (
                        <NeoCard variant="elevated" style={s.card}>
                            <Body style={s.texto}>{opcao.texto}</Body>
                        </NeoCard>
                    ) : null}

                    <H3 style={s.secao}>{D.regrasTitulo}</H3>
                    <NeoCard variant="elevated" style={s.card}>
                        {D.regras.map((r) => (
                            <View key={r} style={s.linha}>
                                <NeoIcon name="TickCircle" variant="Bold" size={16} color={Neo.colors.textOn.brand} />
                                <Body style={s.linhaTexto}>{r}</Body>
                            </View>
                        ))}
                    </NeoCard>

                    <NeoCard variant="elevated" style={[s.card, s.atencao]}>
                        <View style={s.linha}>
                            <NeoIcon name="Warning2" variant="Bold" size={18} color={Neo.colors.textOn.warning} />
                            <H3 style={s.atencaoTitulo}>{D.atencaoTitulo}</H3>
                        </View>
                        <Body style={s.texto}>{D.atencao}</Body>
                    </NeoCard>

                    <NeoCard variant="elevated" style={s.card}>
                        <View style={s.linha}>
                            <NeoIcon name="Call" variant="Bold" size={16} color={Neo.colors.textOn.error} />
                            <Body style={s.linhaTexto}>{D.doseAMais}</Body>
                        </View>
                        <View style={s.linha}>
                            <NeoIcon name="Danger" variant="Bold" size={16} color={Neo.colors.textOn.error} />
                            <Body style={s.linhaTexto}>{D.urgencia}</Body>
                        </View>
                    </NeoCard>

                    <Small style={s.aviso}>{D.aviso}</Small>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.md,
        paddingBottom: Neo.spacing.sm,
        gap: 12,
    },
    backBtn: {
        width: 40, height: 40, borderRadius: 20,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: Neo.colors.neutral[100],
    },
    headerTitle: { flex: 1, fontSize: 20, lineHeight: 26, color: Neo.colors.textOn.ink },
    scroll: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: Neo.layout.scrollBottomFooter || 100,
    },
    intro: { color: Neo.colors.textOn.ink, lineHeight: 22, marginBottom: Neo.spacing.md },
    secao: { marginTop: Neo.spacing.md, marginBottom: Neo.spacing.sm, color: Neo.colors.textOn.ink },
    opcoes: { flexDirection: 'row', gap: 10, marginBottom: Neo.spacing.sm },
    opcao: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
        alignItems: 'center',
    },
    opcaoAtiva: { borderColor: Neo.colors.textOn.brand, backgroundColor: Neo.colors.neutral[100] },
    opcaoTexto: { color: Neo.colors.textOn.muted, textAlign: 'center' },
    opcaoTextoAtivo: { color: Neo.colors.textOn.brand, fontWeight: '700' },
    card: { marginBottom: Neo.spacing.md },
    texto: { color: Neo.colors.textOn.ink, lineHeight: 22 },
    linha: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginBottom: 10 },
    linhaTexto: { flex: 1, color: Neo.colors.textOn.ink, lineHeight: 22 },
    atencao: { borderLeftWidth: 4, borderLeftColor: Neo.colors.feedback.warning },
    atencaoTitulo: { flex: 1, color: Neo.colors.textOn.ink },
    aviso: { color: Neo.colors.textOn.muted, marginTop: Neo.spacing.sm, marginBottom: Neo.spacing.lg },
});
