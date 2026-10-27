
import { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Linking
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from "../../components/NeoTypography";
import NeoIcon from '../../components/NeoIcon';
import { animaisCatalog } from '../../data/animais_ciatox';
import { useTranslation } from 'react-i18next';
import { t_field, t_object } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { getMercadoAtual, separarPorRelevancia } from '../../utils/relevanciaRegional';
import { getPoisonControlLabel, getPoisonControlDial } from '../../utils/emergencyTokens';

export default function AnimaisPeconhentosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : themeColors.neutral.white;
    const [searchText, setSearchText] = useState('');
    const THEME_COLOR = themeColors.categoria.ameixa.fill;

    const normalizarBusca = (valor = '') =>
        String(valor)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[-_/]/g, ' ')
            .toLowerCase()
            .trim();

    const queryNormalizada = normalizarBusca(searchText);
    const animaisFiltrados = !animaisCatalog
        ? []
        : !queryNormalizada
            ? animaisCatalog
            : animaisCatalog.filter(animal => {
                const alvo = normalizarBusca([
                    t_field(animal, 'nomePopular'),
                    animal.nomePopular,
                    animal.nomeCientifico,
                    t_field(animal, 'descricao'),
                ].filter(Boolean).join(' '));
                return alvo.includes(queryNormalizada);
            });

    // Relevancia regional: separa o que ocorre na regiao do utilizador do que
    // nao ocorre. NUNCA remove — o resto continua listado abaixo, porque o
    // brasileiro em Lisboa e quem vai viajar precisam do catalogo inteiro.
    // Durante a busca a lista fica plana, para o resultado nao "sumir" numa
    // secao que o utilizador nao esperava.
    const mercado = useMemo(() => getMercadoAtual(), []);
    const buscando = searchText.trim().length > 0;
    const { locais, outrasRegioes } = useMemo(
        () => (buscando
            ? { locais: animaisFiltrados, outrasRegioes: [] }
            : separarPorRelevancia(animaisFiltrados, 'animais', mercado)),
        [animaisFiltrados, mercado, buscando]
    );

    const getPerigoColor = (nivel) => {
        switch (nivel) {
            case 'Muito Alto': case 'Very High': case 'Muy Alto': return Neo.colors.feedback.error; // DS: data-level color
            case 'Alto': case 'High': return themeColors.categoria.ocre.fill;
            case 'Médio': case 'Medium': case 'Medio': return Neo.colors.feedback.warning; // DS: data-level color
            case 'Baixo': case 'Low': case 'Bajo': return '#EAB308'; // DS: data-level color (yellow-500, no exact mapping)
            default: return Neo.colors.neutral[500];
        }
    };

    // Centro de intoxicacao do pais onde o utilizador esta — nao o do Brasil.
    // Antes discava a linha brasileira em qualquer lugar do mundo.
    const poisonControlLabel = getPoisonControlLabel();
    const handleCallCiatox = () => {
        Linking.openURL(`tel:${getPoisonControlDial()}`);
    };

    // Card extraido para ser reusado nas duas seccoes (local / outras regioes)
    // sem duplicar o markup.
    const renderAnimalCard = (animal) => {
        const nivel = t_field(animal, 'nivelPerigo') || 'Médio';
        const sintomas = t_object(animal, 'sintomas') || {};
        const sintomasList = sintomas.imediatos || sintomas.humanos || [];
        const sintomasText = sintomasList.length > 0 ? `${sintomasList[0]}${sintomasList.length > 1 ? ` ${t('animals.andMore', { count: sintomasList.length - 1 })}` : ''}` : t_field(animal, 'descricao');

        return (
            <TouchableOpacity key={animal.id} onPress={() => navigation.navigate('ConceitoDetail', { conceito: animal })} activeOpacity={0.8} style={{ marginBottom: 16 }}>
                <View style={styles.guideCardOuter}>
                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                        <View style={styles.guideImageContainer}>
                            {animal.imagem ? <Image source={animal.imagem} style={styles.guideImage} /> : <NeoIcon name="Warning2" size={48} color={THEME_COLOR} variant="Bold" />}
                        </View>
                        <View style={styles.guideContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View style={{ flex: 1, paddingRight: 8 }}>
                                    <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{t_field(animal, 'nomePopular')}</Text>
                                    <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{animal.nomeCientifico}</Text>
                                </View>
                                <View style={[styles.toxicBadge, { backgroundColor: getPerigoColor(nivel) + '15' }]}>
                                    <Text style={[styles.toxicText, { color: getPerigoColor(nivel) }]}>{nivel}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }} />
                            <View style={styles.sptContainer}>
                                <NeoIcon name="Warning2" size={12} color={Neo.colors.neutral[500]} />
                                <Text style={styles.sptText} numberOfLines={2}>{sintomasText}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header Standardized */}
                <View style={{ padding: 20, paddingTop: 10 }}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                        </TouchableOpacity>
                        <H2>{t('animals.title')}</H2>
                        <TouchableOpacity onPress={handleCallCiatox} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(239, 68, 68, 0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <NeoIcon name="Call" size={24} color="#EF4444" variant="Bold" />
                        </TouchableOpacity>
                    </View>
                    <Small style={{ color: Neo.colors.neutral[500], textAlign: 'center', marginTop: 8 }}>{t('animals.subtitle')}</Small>
                </View>

                {/* Search Bar */}
                <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                    <NeoCard variant="elevated" style={styles.searchContainer}>
                        <NeoIcon name="SearchNormal1" size={20} color={Neo.colors.neutral[400]} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={t('animals.searchPlaceholder')}
                            placeholderTextColor={Neo.colors.neutral[400]}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </NeoCard>
                </View>

                {/* List */}
                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 240 }} showsVerticalScrollIndicator={false}>
                    {/* CIATOX Alert Card */}
                    <TouchableOpacity onPress={handleCallCiatox} activeOpacity={0.9} style={{ marginBottom: 16 }}>
                        <View style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
                            <View style={styles.alertIconBg}>
                                <NeoIcon name="Call" size={24} color="#EF4444" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <H3 style={styles.alertTitle}>{t('animals.emergencyTitle')}</H3>
                                <Small style={styles.alertDesc}>{t('animals.emergencyDesc', { poisonControl: poisonControlLabel })}</Small>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 16 }} />

                    {locais.length > 0 && outrasRegioes.length > 0 && (
                        <H3 style={{ color: textPrimary, marginBottom: 12 }}>{t('animals.localSection')}</H3>
                    )}

                    {locais.map(renderAnimalCard)}

                    {outrasRegioes.length > 0 && (
                        <>
                            <View style={{ marginTop: 8, marginBottom: 12 }}>
                                <H3 style={{ color: textPrimary }}>{t('animals.otherRegionsSection')}</H3>
                                <Small style={{ color: textMuted, marginTop: 2 }}>{t('animals.otherRegionsHint')}</Small>
                            </View>
                            {outrasRegioes.map(renderAnimalCard)}
                        </>
                    )}

                    {animaisFiltrados.length === 0 && (
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <NeoIcon name="Warning2" size={48} color={Neo.colors.neutral[300]} variant="Bold" />
                            <Body style={{ marginTop: 16, color: Neo.colors.neutral[400] }}>{t('animals.noResults')}</Body>
                        </View>
                    )}

                    <View style={{ height: 80 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: Neo.colors.neutral[800],
    },
    alertCard: {
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alertIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    alertTitle: {
        color: Neo.emergency?.panicDark || '#991B1B'
    },
    alertDesc: {
        color: Neo.emergency?.panicDark || '#B91C1C',
        marginTop: 2
    },
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120, // Altura fixa para manter imagem expandida e padronizada
        backgroundColor: Neo.colors.neutral.white, // Sólido para evitar vazamento de sombra no Android
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: Neo.colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center'
    },
    guideImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    guideContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start'
    },
    guideTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 2
    },
    guideSubtitle: {
        fontSize: 12,
        fontStyle: 'italic',
        color: Neo.colors.neutral[500],
        marginBottom: 8
    },
    toxicBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toxicText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    sptContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sptText: {
        fontSize: 12,
        color: Neo.colors.neutral[500],
        marginLeft: 4
    }
});
