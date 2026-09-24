import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { H1, Caption } from '../components/NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function IntroSafetyMenuScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textBody = themeColors.neutral[700];
    const textPrimary = themeColors.neutral[900];

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER padronizado */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('headersFirst.conceitosFundamentais', 'Conceitos Fundamentais')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('intro.subtitle', 'Base da prevenção doméstica')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    style={s.content}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={s.textContainer}>
                        <Text style={[s.sectionTitle, { color: textPrimary }]}>
                            Introdução à Segurança
                        </Text>
                        <Text style={[s.bodyText, { color: textBody }]}>
                            Segurança doméstica não é acidente, é planejamento. É o conjunto de medidas adotadas para minimizar riscos e garantir a integridade física de toda a família. A maioria dos acidentes acontecem onde deveríamos estar mais seguros: em casa.
                        </Text>
                        
                        <View style={s.divider} />

                        <Text style={[s.sectionTitle, { color: textPrimary }]}>
                            Metodologia 3D
                        </Text>
                        <Text style={[s.bodyText, { color: textBody }]}>
                            A Metodologia 3D define ações para uma prevenção Diária, Dinâmica e Duradoura, transformando a casa em um refúgio seguro. Para eliminarmos os perigos do lar, a prevenção e a conscientização são as únicas chaves. A grande maioria dos acidentes não acontece por acaso, mas por descaso.
                        </Text>

                        <View style={s.divider} />

                        <Text style={[s.sectionTitle, { color: textPrimary }]}>
                            Quase Acidentes
                        </Text>
                        <Text style={[s.bodyText, { color: textBody }]}>
                            Os “quase acidentes”, e também os acidentes sem ferimentos ou danos materiais, não podem ser ignorados, uma vez que eles são “avisos” do que pode ou, provavelmente, irá acontecer se os atos e condições inseguras forem ignorados. Lembre-se: um acidente acontece, mais cedo ou mais tarde, quando tais “avisos” são ignorados.
                        </Text>
                    </View>
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
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    subtitle: {
        // ...
    },
    content: {
        paddingHorizontal: Neo.spacing.lg,
    },
    textContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 24,
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    bodyText: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 18,
    }
});
