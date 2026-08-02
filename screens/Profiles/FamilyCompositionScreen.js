import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows, Components } from '../../utils/Theme';
import ProfileService from '../../services/ProfileService';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoAlert from '../../utils/NeoAlert';

// Componente Stepper Individual
const CounterRow = ({ label, icon, sub, value, onChange }) => (
    <View style={styles.counterRow}>
        <View style={styles.iconContainer}>
            <NeoIcon name={icon} size={24} color={Colors.primary} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>{label}</Text>
            <Text style={styles.rowSub}>{sub}</Text>
        </View>
        <View style={styles.stepper}>
            <TouchableOpacity
                style={[styles.stepBtn, value === 0 && styles.stepBtnDisabled]}
                onPress={() => value > 0 && onChange(value - 1)}
                disabled={value === 0}
            >
                <NeoIcon name="Minus" size={20} color={value === 0 ? '#CCC' : Colors.primary} />
            </TouchableOpacity>

            <Text style={styles.stepValue}>{value}</Text>

            <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => onChange(value + 1)}
            >
                <NeoIcon name="Add" size={20} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    </View>
);

export default function FamilyCompositionScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    // Estado dos contadores - Categorias Científicas (SBP e Criança Segura) - Metodologia 3D
    const [adultos, setAdultos] = useState(1);
    const [idosos, setIdosos] = useState(0); // 60+

    // Novas categorias granulares
    const [bebes_0_6, setBebes_0_6] = useState(0);
    const [bebes_7_12, setBebes_7_12] = useState(0);
    const [criancas_1_3, setCriancas_1_3] = useState(0);
    const [criancas_3_5, setCriancas_3_5] = useState(0);
    const [criancas_6_14, setCriancas_6_14] = useState(0);
    const [adolescentes, setAdolescentes] = useState(0);
    const [pcd, setPcd] = useState(0); // Nova categoria PCD

    const [pets, setPets] = useState(0);

    const isEditing = route?.params?.isEditing;

    const totalPessoas = adultos + idosos + bebes_0_6 + bebes_7_12 + criancas_1_3 + criancas_3_5 + criancas_6_14 + adolescentes + pcd;

    // Load existing data if available
    useEffect(() => {
        loadMeta();
    }, []);

    const loadMeta = async () => {
        try {
            const meta = await ProfileService.getMeta();
            if (meta && meta.composicao) {
                setAdultos(meta.composicao.adultos || 1);
                setIdosos(meta.composicao.idosos || 0);

                setBebes_0_6(meta.composicao.bebes_0_6 || 0);
                setBebes_7_12(meta.composicao.bebes_7_12 || 0);
                setCriancas_1_3(meta.composicao.criancas_1_3 || 0);
                setCriancas_3_5(meta.composicao.criancas_3_5 || 0);
                setCriancas_6_14(meta.composicao.criancas_6_14 || 0);
                setAdolescentes(meta.composicao.adolescentes || 0);
                setPcd(meta.composicao.pcd || 0);

                setPets(meta.composicao.pets || 0);
            }
        } catch (e) {
            console.log('Error loading meta:', e);
        }
    };

    const handleSave = async () => {
        if (totalPessoas === 0) {
            NeoAlert.alert("Atenção", "Selecione pelo menos um morador.");
            return;
        }

        try {
            const meta = {
                totalMoradoresEsperados: totalPessoas,
                totalPetsEsperados: pets,
                composicao: {
                    adultos,
                    idosos,
                    bebes_0_6,
                    bebes_7_12,
                    criancas_1_3,
                    criancas_3_5,
                    criancas_6_14,
                    adolescentes,
                    pcd,
                    pets
                },
                onboardingFamiliarCompleto: true
            };

            await ProfileService.setMeta(meta);
            await ProfileService.ensureGhostProfiles(meta);

            if (isEditing) {
                NeoAlert.alert("Sucesso", "Composição familiar atualizada!", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                // HUB FLOW: Ir para o Wizard da Casa (Fluxo Unificado)
                // O usuário definiu QUANTOS são. Agora define ONDE moram e DETALHA quem são.
                navigation.replace('NewHomeWizard', { fromOnboarding: true });
            }

        } catch (error) {
            console.error(error);
            NeoAlert.alert("Erro", "Não foi possível salvar os dados.");
        }
    };

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('headersFirst.quemVamosProteger', 'Quem vamos proteger?')}</Text>
                <Text style={styles.subtitle}>
                    {t('headersFirst.baseadoNaMetodologiaPrevenO3DDigaQuantas', 'Baseado na Metodologia Prevenção 3D, diga quantas pessoas vivem na casa. Criaremos perfis para você detalhar a seguir.')}
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.sectionLabel}>{t('headersFirst.hUMANOS', 'HUMANOS')}</Text>

                <CounterRow
                    label="Bebês (0 a 6 meses)"
                    sub="Asfixia e Queimaduras"
                    icon="happy"
                    value={bebes_0_6}
                    onChange={setBebes_0_6}
                />

                <CounterRow
                    label="Bebês (7 a 12 meses)"
                    sub="Engatinhar e Primeiros Passos"
                    icon="body"
                    value={bebes_7_12}
                    onChange={setBebes_7_12}
                />

                <CounterRow
                    label="Crianças (1 a 3 anos)"
                    sub="Curiosidade e Ingestão"
                    icon="balloon"
                    value={criancas_1_3}
                    onChange={setCriancas_1_3}
                />

                <CounterRow
                    label="Crianças (3 a 5 anos)"
                    sub="Exploração e Atividade"
                    icon="bicycle"
                    value={criancas_3_5}
                    onChange={setCriancas_3_5}
                />

                <CounterRow
                    label="Crianças (6 a 14 anos)"
                    sub="Energia e Autonomia"
                    icon="school"
                    value={criancas_6_14}
                    onChange={setCriancas_6_14}
                />

                <CounterRow
                    label="Adolescentes (14+)"
                    sub="Comportamento e Trânsito"
                    icon="headset"
                    value={adolescentes}
                    onChange={setAdolescentes}
                />

                <CounterRow
                    label="Adultos"
                    sub="18 a 64 anos"
                    icon="person"
                    value={adultos}
                    onChange={setAdultos}
                />

                <CounterRow
                    label="Idosos (65+)"
                    sub="Mobilidade e Quedas"
                    icon="accessibility"
                    value={idosos}
                    onChange={setIdosos}
                />

                <CounterRow
                    label="Pessoas com Deficiência (PcD)"
                    sub="Acessibilidade e Adaptação"
                    icon="medkit"
                    value={pcd}
                    onChange={setPcd}
                />

                <View style={styles.divider} />

                <Text style={styles.sectionLabel}>{t('headersFirst.aNIMAIS', 'ANIMAIS')}</Text>

                <CounterRow
                    label="Pets"
                    sub="Cães, Gatos, Aves..."
                    icon="paw"
                    value={pets}
                    onChange={setPets}
                />

            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>
                        Total: <Text style={{ fontWeight: 'bold' }}>{totalPessoas} Pessoas, {pets} Pets</Text>
                    </Text>
                </View>

                <TouchableOpacity style={styles.continueBtn} onPress={handleSave}>
                    <Text style={styles.continueText}>{t('headersFirst.definirPerfis', 'Definir Perfis')}</Text>
                    <NeoIcon name="ArrowRight2" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
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
        padding: Spacing.lg,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    title: {
        fontSize: 26,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    content: {
        padding: Spacing.md,
        paddingBottom: 40,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#8E8E93',
        marginTop: 16,
        marginBottom: 12,
        marginLeft: 8,
        letterSpacing: 1,
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        ...Shadows.sm,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Neo.colors.categoria.ardosia.tint,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    rowSub: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 4,
    },
    stepBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 10,
        ...Shadows.sm,
    },
    stepBtnDisabled: {
        opacity: 0.5,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    stepValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
        minWidth: 20,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginVertical: 12,
    },
    footer: {
        padding: Spacing.lg,
        paddingBottom: Platform.OS === 'android' ? 40 : Spacing.lg,
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    summaryBox: {
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    continueBtn: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
        ...Shadows.md,
    },
    continueText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
