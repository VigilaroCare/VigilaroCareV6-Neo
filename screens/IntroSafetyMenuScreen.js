import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Shadows } from '../utils/Theme';
import { INTRO_CONCEPTS } from '../data/intro_safety';
import { t_field } from '../utils/getLocalizedField';

const { width } = Dimensions.get('window');
const GAP = 16;
const CARD_WIDTH = (width - 40 - GAP) / 2;

export default function IntroSafetyMenuScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();

    const renderCard = (concept) => (
        <TouchableOpacity
            key={concept.id}
            style={{ width: '100%', marginBottom: 12 }}
            onPress={() => navigation.navigate('ConceitoDetail', { conceito: concept })}
            activeOpacity={0.8}
        >
            <NeoCard variant="glass" style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
                ...Neo.shadows?.sm
            }}>
                <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: (concept.bg || '#EDE7F6'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 16
                }}>
                    {concept.icone ? (
                        <NeoIcon name={concept.icone} size={24} color={concept.cor || Colors.primary} />
                    ) : (
                        <Text style={styles.emoji}>{concept.emoji || '💡'}</Text>
                    )}
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: Neo.colors.neutral[800], marginBottom: 4 }} numberOfLines={1}>
                        {t_field(concept, 'titulo')}
                    </Text>
                    <Text style={{ fontSize: 13, color: Neo.colors.neutral[500], lineHeight: 18 }} numberOfLines={2}>
                        {t_field(concept, 'definicao')}
                    </Text>
                </View>
                
                <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[400]} style={{ marginLeft: 8 }} />
            </NeoCard>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header Neo Glass */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
                <NeoCard variant="glass"
                    style={{
                        width: '100%',
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        ...Neo.shadows?.sm
                    }}
                >
                    <View style={{
                        width: 48, height: 48, borderRadius: 12,
                        backgroundColor: '#EDE7F6', alignItems: 'center', justifyContent: 'center',
                        marginRight: 16
                    }}>
                        <Text style={{ fontSize: 24 }}>💎</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#673AB7', fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{t('headersFirst.metodologia3D', 'Metodologia 3D')}</Text>
                        <Text style={{ color: Neo.colors.neutral[600], fontWeight: 'bold', fontSize: 13 }}>{t('headersFirst.conceitosFundamentais', 'Conceitos Fundamentais')}</Text>
                    </View>
                </NeoCard>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.list}>
                    {INTRO_CONCEPTS.map(renderCard)}
                </View>
                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        ...Shadows.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    content: {
        padding: 20,
        paddingTop: 24
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: GAP,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.1, // Aspect ratio fixo levemente vertical
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'flex-start', // Importante para alinhamento do topo
        ...Shadows.sm,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16, // Espaço fixo entre ícone e texto
        marginTop: 8 // Padding top interno leve
    },
    emoji: {
        fontSize: 28,
    },
    textWrapper: {
        alignItems: 'center',
        width: '100%'
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: 6,
        minHeight: 40, // FORÇA ALINHAMENTO: Reserva espaço para 2 linhas sempre
        // Isso garante que se um titulo tiver 1 linha e outro 2, os subtitulos (se existirem) começariam alinhados?
        // O usuário quer "títulos equidistantes". O título começa no mesmo lugar.
    },
    cardSubtitle: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
        lineHeight: 14,
    },
});
