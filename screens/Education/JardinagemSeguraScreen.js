import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoText, { H2, H3, Body, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';

export default function JardinagemSeguraScreen({ navigation }) {
    const { t } = useTranslation('common');

    const renderSectionHeader = (title, icon, color) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 24 }}>
            <View style={{ backgroundColor: color + '20', padding: 8, borderRadius: 8, marginRight: 12 }}>
                <NeoIcon name={icon} size={24} color={color} variant="Bold" />
            </View>
            <H3 style={{ color: Neo.colors.neutral[800] }}>{title}</H3>
        </View>
    );

    const renderToolItem = (name, desc, icon = 'tool') => (
        <View style={{ marginBottom: 16, flexDirection: 'row' }}>
            <NeoIcon name={icon} size={20} color={Neo.colors.primary[600]} style={{ marginTop: 2, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: Neo.colors.neutral[800], fontSize: 16 }}>{name}</Text>
                <Text style={{ color: Neo.colors.neutral[600], fontSize: 14, lineHeight: 20 }}>{desc}</Text>
            </View>
        </View>
    );

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header Standardized */}
                <View style={{ padding: 20, paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                        </TouchableOpacity>
                        <H2>{t('headersFirst.gardening', 'Jardinagem')}</H2>
                        <View style={{ width: 44 }} />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 240 }} showsVerticalScrollIndicator={false}>


                    {/* Intro Hero Card Nível 2 */}
                    <View style={styles.guideCardOuter}>
                        <View style={[styles.guideCardInner, { height: 160, backgroundColor: '#E8F5E9' }]}>
                             <View style={styles.guideImageContainer}>
                                <NeoIcon name="Tree" size={64} color="#4CAF50" variant="Bold" />
                             </View>
                             <View style={styles.guideContent}>
                                <Text style={[styles.guideTitle, { color: '#2E7D32' }]}>{t('headersFirst.cultivoSeguro', 'Cultivo Seguro')}</Text>
                                <Text style={[styles.descText, { color: '#1B5E20', fontStyle: 'italic', fontSize: 14 }]} numberOfLines={5}>
                                    {t('headersFirst.APrTicaDaJardinagemEOCultivoDeHortasEmCa', '"A prática da jardinagem e o cultivo de hortas em casa são atividades terapêuticas. O equilíbrio entre equipamento correto e segurança é fundamental."')}
                                </Text>
                             </View>
                        </View>
                    </View>

                    <View style={{ height: 24 }} />

                    {/* 1. KIT ESSENCIAL */}
                    {renderSectionHeader('1. O Kit Essencial', 'Setting2', '#4CAF50')}
                    <NeoCard variant="glass" style={{ padding: 16 }}>
                        <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[800], marginBottom: 12 }}>{t('headersFirst.preparaODoSolo', 'Preparação do Solo')}</Body>
                        {renderToolItem('Pá de Jardinagem', 'Fundamental para mover terra, adubo e transplantar mudas.', 'Setting4')}
                        {renderToolItem('Garfo de Mão', 'Essencial para afofar a terra e retirar ervas daninhas em vasos.', 'Setting4')}
                        {renderToolItem('Ancinho (Rastelo)', 'Nivela o solo e recolhe folhas secas.', 'Setting2')}

                        <View style={{ height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 }} />

                        <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[800], marginBottom: 12 }}>{t('headersFirst.podaEManutenO', 'Poda e Manutenção')}</Body>
                        {renderToolItem('Tesoura de Poda', 'Indispensável para aparar ramos secos e colheitas.', 'Scissor')}
                        {renderToolItem('Serrote / Arco de Serra', 'Para cortes em troncos e galhos espessos.', 'Setting4')}

                        <View style={{ height: 1, backgroundColor: '#E0E0E0', marginVertical: 12 }} />

                        <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[800], marginBottom: 12 }}>{t('headersFirst.regaELimpeza', 'Rega e Limpeza')}</Body>
                        {renderToolItem('Regador e Pulverizador', 'Para irrigação suave e aplicação de produtos.', 'Drop')}
                        {renderToolItem('Carrinho de Mão', 'Transporte de cargas pesadas para evitar esforço físico.', 'ShoppingCart')}
                    </NeoCard>

                    {/* 2. MEDIDAS DE SEGURANÇA */}
                    {renderSectionHeader('2. Segurança e EPIs', 'ShieldTick', '#D32F2F')}
                    <NeoCard variant="glass" style={{ padding: 16, borderColor: '#FFEBEE', borderWidth: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <NeoIcon name="InfoCircle" size={24} color="#D32F2F" style={{ marginRight: 8 }} />
                            <Body style={{ fontWeight: 'bold', color: '#D32F2F' }}>{t('headersFirst.proteOObrigatRia', 'Proteção é Obrigatória!')}</Body>
                        </View>

                        <View style={{ marginLeft: 8 }}>
                            <Text style={s.bulletPoint}><Text style={s.bold}>{t('headersFirst.Luvas', '• Luvas:')}</Text> Proteção contra espinhos, cortes e produtos químicos.</Text>
                            <Text style={s.bulletPoint}><Text style={s.bold}>{t('headersFirst.CalAdosFechados', '• Calçados Fechados:')}</Text> Botas de couro ou cano longo (proteção contra picadas).</Text>
                            <Text style={s.bulletPoint}><Text style={s.bold}>{t('headersFirst.Roupas', '• Roupas:')}</Text> Calças compridas e manga longa (sol e insetos).</Text>
                            <Text style={s.bulletPoint}><Text style={s.bold}>{t('headersFirst.ProteOSolar', '• Proteção Solar:')}</Text> Chapéu, boné e evitar horários de pico.</Text>
                        </View>
                    </NeoCard>

                    {/* 3. QUÍMICOS E RISCOS */}
                    {renderSectionHeader('3. Riscos Específicos', 'Danger', '#FF9800')}

                    <NeoCard variant="glass" style={{ padding: 16, marginBottom: 12 }}>
                        <Body style={{ fontWeight: 'bold', color: '#E65100', marginBottom: 8 }}>{t('headersFirst.ProdutosQuMicos', '☣️ Produtos Químicos')}</Body>
                        <Text style={s.text}>Mantenha fertilizantes e pesticidas na <Text style={s.bold}>{t('headersFirst.embalagemOriginal', 'embalagem original')}</Text> e trancados. Jamais reutilize garrafas de refrigerante para guardar venenos.</Text>
                    </NeoCard>

                    <NeoCard variant="glass" style={{ padding: 16, marginBottom: 12 }}>
                        <Body style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 }}>{t('headersFirst.PlantasTXicas', '🌿 Plantas Tóxicas')}</Body>
                        <Text style={s.text}>Identifique plantas como <Text style={{ fontStyle: 'italic' }}>{t('headersFirst.comigoNinguMPode', 'Comigo-ninguém-pode')}</Text> e <Text style={{ fontStyle: 'italic' }}>{t('headersFirst.bicoDePapagaio', 'Bico-de-papagaio')}</Text>. O contato com a seiva pode causar queimaduras e cegueira.</Text>
                    </NeoCard>

                    <NeoCard variant="glass" style={{ padding: 16 }}>
                        <Body style={{ fontWeight: 'bold', color: '#795548', marginBottom: 8 }}>{t('headersFirst.AnimaisPeOnhentos', '🕷️ Animais Peçonhentos')}</Body>
                        <Text style={s.text}>{t('headersFirst.entulhosAtraemEscorpiEsEAranhasMantenhaO', 'Entulhos atraem escorpiões e aranhas. Mantenha o quintal limpo e examine calçados e luvas antes de usar.')}</Text>
                    </NeoCard>

                    <View style={{ height: 80 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    text: { color: Neo.colors.neutral[700], lineHeight: 22, fontSize: 14 },
    bulletPoint: { color: Neo.colors.neutral[700], lineHeight: 24, fontSize: 14, marginBottom: 8 },
    bold: { fontWeight: 'bold', color: Neo.colors.neutral[800] }
});

const styles = StyleSheet.create({
    guideCardOuter: {
        borderRadius: 24,
        ...Neo.shadows?.sm,
        marginBottom: 16
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
        fontSize: 20,
        fontFamily: 'PlusJakartaSans_700Bold',
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginBottom: 8
    },
    descText: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        fontFamily: 'PlusJakartaSans_500Medium',
        lineHeight: 20,
    }
});
