import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, LayoutAnimation, Platform, UIManager, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import CustomIcon from '../../components/CustomIcon';
import { Colors, Spacing, Shadows, BorderRadius } from '../../utils/Theme';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import { FERRAMENTAS_DATA } from '../../data/ferramentas_seguranca';
import { useTranslation } from 'react-i18next';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function FerramentasTrabalhoScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(expandedSection === id ? null : id);
    };

    const { goldenRules, categories } = FERRAMENTAS_DATA;

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('headersFirst.toolsAndRepairs', 'Ferramentas & Reparos')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('headersFirst.safetyAndMaintenance', 'Segurança e Manutenção.')}</Text>
                    </View>
                </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Regras de Ouro */}
                <View style={styles.goldenRulesCard}>
                    <View style={styles.goldenHeader}>
                        <NeoIcon name="Star1" size={24} color="#FFD700" variant="Bold" />
                        <Text style={styles.goldenTitle}>{t('headersFirst.regrasDeOuro', 'Regras de Ouro')}</Text>
                    </View>
                    {goldenRules.map((rule) => (
                        <View key={rule.id} style={styles.ruleItem}>
                            <Text style={styles.ruleNumber}>{rule.id}</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.ruleTitle}>{rule.title}</Text>
                                <Text style={styles.ruleText}>{rule.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Acessos Rápidos - Guias de EPI e Acessórios */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => navigation.navigate('EpiDomestico')}
                        activeOpacity={0.8}
                    >
                        <NeoCard variant="glass" style={{ padding: 16, borderRadius: 16, alignItems: 'center' }}>
                            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                <NeoIcon name="Health" size={24} color="#4CAF50" variant="Bold" />
                            </View>
                            <Text style={{ color: Neo.colors.neutral[800], fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Guia de{'\n'}EPIs</Text>
                        </NeoCard>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => navigation.navigate('AcessoriosSeguranca')}
                        activeOpacity={0.8}
                    >
                        <NeoCard variant="glass" style={{ padding: 16, borderRadius: 16, alignItems: 'center' }}>
                            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E3F2FD', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                <NeoIcon name="ShieldTick" size={24} color="#2196F3" variant="Bold" />
                            </View>
                            <Text style={{ color: Neo.colors.neutral[800], fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>Acessórios de{'\n'}Segurança</Text>
                        </NeoCard>
                    </TouchableOpacity>
                </View>

                {/* Categorias - Estilo Nível 2 */}
                {categories.map((category) => (
                    <View key={category.id} style={styles.categoryContainer}>
                        <TouchableOpacity
                            onPress={() => toggleSection(category.id)}
                            activeOpacity={0.9}
                        >
                            <View style={styles.guideCardOuter}>
                                <View style={styles.guideCardInner}>
                                    <View style={[styles.guideImageContainer, { backgroundColor: category.color }]}>
                                        <NeoIcon name={category.icon} size={48} color="#FFF" variant="Bold" />
                                    </View>
                                    <View style={styles.guideContent}>
                                        <View style={{ flex: 1, paddingRight: 8 }}>
                                            <Text style={styles.guideTitle}>{category.title}</Text>
                                            <Text style={styles.guideSubtitle}>{category.subtitle}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <NeoIcon
                                                name={expandedSection === category.id ? "ArrowUp2" : "ArrowDown2"}
                                                size={20}
                                                color={Neo.colors.neutral[400]}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {expandedSection === category.id && (
                            <View style={styles.itemsList}>
                                {category.items.map((item, index) => (
                                    <View key={index} style={styles.toolCard}>
                                        <View style={styles.toolHeader}>
                                            <Text style={styles.toolName}>{item.name}</Text>
                                            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEBEE', alignItems: 'center', justifyContent: 'center' }}>
                                                <NeoIcon name="InfoCircle" size={20} color="#D32F2F" variant="Bold" />
                                            </View>
                                        </View>

                                        <View style={styles.toolDetail}>
                                            <Text style={styles.label}>{t('headersFirst.risco', 'Risco:')}</Text>
                                            <Text style={styles.value}>{item.risk}</Text>
                                        </View>

                                        <View style={styles.toolDetail}>
                                            <Text style={styles.label}>{t('headersFirst.ePIs', 'EPIs:')}</Text>
                                            <Text style={styles.value}>{item.epi}</Text>
                                        </View>

                                        {item.care && (
                                            <View style={[styles.toolDetail, { borderLeftColor: '#4CAF50' }]}>
                                                <Text style={styles.label}>{t('headersFirst.cuidado', 'Cuidado:')}</Text>
                                                <Text style={styles.value}>{item.care}</Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
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
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        paddingTop: 60,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        ...Shadows.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    content: {
        padding: 16,
        paddingBottom: 120,
    },
    goldenRulesCard: {
        backgroundColor: '#263238',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        ...Shadows.md,
    },
    goldenHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 12,
    },
    goldenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700',
        marginLeft: 8,
    },
    ruleItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    ruleNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFD700',
        color: '#000',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: 'bold',
        marginRight: 12,
        fontSize: 14,
    },
    ruleTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    ruleText: {
        color: '#B0BEC5',
        fontSize: 14,
        lineHeight: 20,
    },
    categoryContainer: {
        marginBottom: 16,
    },
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    guideTitle: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans_700Bold',
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginBottom: 2
    },
    guideSubtitle: {
        fontSize: 13,
        color: Neo.colors.neutral[500],
        fontFamily: 'PlusJakartaSans_500Medium',
        fontStyle: 'italic',
    },
    itemsList: {
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginTop: -16,
        paddingTop: 24,
        zIndex: -1
    },
    toolCard: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    toolHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    toolName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    toolDetail: {
        marginBottom: 8,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#DDD',
    },
    label: {
        fontSize: 12,
        color: '#888',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
});


