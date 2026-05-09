import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import { MAPA_PREVENCAO } from '../../data/knowledge_prevencao';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';

export default function RiscosMenuScreen({ navigation }) {
    const { t } = useTranslation('common');
    const ambientes = Object.values(MAPA_PREVENCAO);

    return (
        <AppBackground variant="subtle">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }} edges={['top']}>
            <StatusBar style="dark" backgroundColor="#F8F9FA" />

            {/* Header */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ alignSelf: 'flex-start', marginBottom: 16, padding: 8, marginLeft: -8 }}
                >
                    <NeoIcon name="ArrowLeft2" size={28} color="#1F2937" />
                </TouchableOpacity>
                <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', letterSpacing: -0.5 }}>
                    {t('riscosMenu.title', 'Prevenção em Casa')}
                </Text>
                <Text style={{ fontSize: 16, color: '#6B7280', marginTop: 4 }}>
                    {t('riscosMenu.subtitle', 'Guia Consultivo dos acidentes por cômodo.')}
                </Text>
            </View>

            {/* Grid Quadrado (2 colunas) - Padrão Visual do App */}
            <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 0, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
                    {ambientes.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                width: '47%',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 24,
                                padding: 20,
                                aspectRatio: 1,
                                justifyContent: 'space-between',
                                ...Shadows.sm,
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.03)'
                            }}
                            onPress={() => navigation.navigate('EnvironmentGuideNeo', { ambienteId: item.id })}
                            activeOpacity={0.7}
                        >
                            <View style={{
                                width: 52, height: 52, borderRadius: 26,
                                backgroundColor: item.cor + '22',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 4 }}>
                                    {item.nome}
                                </Text>
                                <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500', lineHeight: 14 }} numberOfLines={2}>
                                    {item.conteudo.filter(c => c.tipo === 'topico').length} {t('riscosMenu.preventionTopics', 'tópicos de prevenção')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
}
