/**
 * EPIDomesticoScreen.js
 * Tela de Equipamentos de Proteção Individual para Uso Doméstico
 * Vigilaro Care V6 Neo
 *
 * Padrao card-retangulo 120x120 + navegacao para ConceitoDetail
 * (hero = foto do card). Sem expand inline.
 */

import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../components/NeoIcon';
import { Shadows } from '../utils/Theme';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import ReviewImage from '../components/ReviewImage';
import FadeInView from '../components/FadeInView';
import { EPI_DOMESTICO } from '../data/epi_domestico';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

const THEME_COLOR = '#F59E0B'; // amber

// Cor por categoria (mantem identidade no tint da foto)
const CAT_COLORS = {
    epi_cabeca:      '#EF4444', // red - alerta
    epi_olhos:       Neo.colors.categoria.ameixa.fill,
    epi_maos:        Neo.colors.categoria.ardosia.fill, // blue
    epi_ouvidos:     '#F59E0B', // amber
    epi_pes:         '#6366F1', // indigo
    epi_respiratorio:'#10B981', // green
    epi_corpo:       Neo.colors.categoria.rose.fill, // pink
};

export default function EPIDomesticoScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    const categories = EPI_DOMESTICO.categorias || [];

    const handlePress = (cat) => {
        const catColor = CAT_COLORS[cat.id] || THEME_COLOR;

        // Mapeia campos do data para o que ConceitoDetail espera
        // (Lote 7k ja le imagemUrl como hero).
        navigation.navigate('ConceitoDetail', {
            conceito: {
                ...cat,
                nome: cat.titulo,
                descricao: cat.equipamento || cat.dica || t('telas.EPIDomesticoScreen.epiEssencial', 'EPI essencial para esta atividade.'),
                iconColor: catColor,
                // "quando usar" vira lista de exemplos
                exemplos: cat.quando || null,
                // tipos viram comoIdentificar (lista de tipos disponiveis)
                comoIdentificar: cat.tipos
                    ? cat.tipos.map(tipo =>
                        typeof tipo === 'string'
                            ? tipo
                            : `${tipo.tipo}: ${tipo.uso || ''}`.trim()
                      )
                    : null,
                // dica vira importancia
                importancia: cat.dica || null,
                // alternativa + limiteDb viram parte da estatistica
                estatisticas: [
                    cat.alternativa && `Alternativa: ${cat.alternativa}`,
                    cat.limiteDb && `Limite seguro: ${cat.limiteDb} dB`,
                ].filter(Boolean).join('\n'),
            },
        });
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* Header padronizado */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, { backgroundColor: THEME_COLOR + '20' }]}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft" size={22} color={THEME_COLOR} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <NeoIcon name="ShieldTick" size={64} color={Neo.colors.primary[600]} variant="Bold" style={{ marginBottom: 15 }} />
                        <Text style={[styles.headerTitle, { color: textPrimary }]} accessibilityRole="header">
                            {t('headersFirst.episParaAtividadesDomesticas', 'EPIs para Atividades Domésticas')}
                        </Text>
                        <Text style={[styles.headerSubtitle, { color: textBody }]}>
                            {t('headersFirst.usoNaoEhSomenteParaObrasUseProtegao', 'Não são apenas para obras — use proteção em casa')}
                        </Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Advertencia em destaque */}
                    {EPI_DOMESTICO.advertencia && (
                        <FadeInView delay={80}>
                            <View style={[styles.warnBox, { borderColor: THEME_COLOR + '40' }]}>
                                <NeoIcon name="Warning2" size={20} color={THEME_COLOR} variant="Bold" />
                                <Text style={[styles.warnText, { color: textBody }]}>
                                    {EPI_DOMESTICO.advertencia}
                                </Text>
                            </View>
                        </FadeInView>
                    )}

                    {/* Info bar */}
                    <FadeInView delay={120}>
                        <View style={styles.infoBar}>
                            <NeoIcon name="ClipboardText" size={13} color={textMuted} style={{ marginRight: 6 }} />
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                {categories.length} {categories.length === 1 ? 'EPI' : 'EPIs'}{t('telas.EPIDomesticoScreen.toqueParaVerDetalhes', ' • Toque para ver detalhes')}</Text>
                        </View>
                    </FadeInView>

                    {categories.map((cat, idx) => {
                        const catColor = CAT_COLORS[cat.id] || THEME_COLOR;
                        return (
                            <FadeInView key={cat.id} delay={160 + idx * 60}>
                                <TouchableOpacity
                                    onPress={() => handlePress(cat)}
                                    activeOpacity={0.8}
                                    style={{ marginBottom: 16 }}
                                >
                                    <View style={styles.guideCardOuter}>
                                        <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                            <View style={[styles.guideImageContainer, { backgroundColor: catColor + '15' }]}>
                                                {cat.imagemUrl ? (
                                                    <ReviewImage
                                                        source={typeof cat.imagemUrl === 'string' ? (typeof cat.imagemUrl === 'string' ? { uri: cat.imagemUrl } : cat.imagemUrl) : cat.imagemUrl}
                                                        tint={catColor}
                                                        accessibilityLabel={cat.titulo}
                                                    />
                                                ) : (
                                                    <NeoIcon name={cat.icone || 'ShieldTick'} size={48} color={Neo.colors.primary[600]} variant="Bold" />
                                                )}
                                            </View>
                                            <View style={styles.guideContent}>
                                                <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={2}>{cat.titulo}</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={[styles.guideDesc, { color: textBody }]} numberOfLines={2}>
                                                    {cat.equipamento || cat.dica || 'EPI essencial.'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </FadeInView>
                        );
                    })}

                    <View style={{ height: 140 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 16,
        alignItems: 'center',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },

    listContent: {
        paddingHorizontal: 16,
    },
    warnBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(245, 158, 11, 0.08)',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    warnText: {
        flex: 1,
        fontSize: 12.5,
        lineHeight: 17,
    },
    infoBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        fontWeight: '500',
    },

    // Card grande estilo Plantas/Animais (imagem retangular a esquerda)
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 130,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
    },
    guideDesc: {
        fontSize: 12,
        lineHeight: 16,
    },
});
