import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { getConteudoPrevencao } from '../../data/knowledge_prevencao';
import { Shadows } from '../../utils/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

export default function EnvironmentGuideNeoScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { ambienteId } = route.params || { ambienteId: 'sala' };
    const guideData = useMemo(() => getConteudoPrevencao(ambienteId), [ambienteId]);
    const insets = useSafeAreaInsets();

    const destaqueText = guideData.conteudo.find(c => c.tipo === 'destaque')?.texto;
    const topicos = guideData.conteudo.filter(c => c.tipo === 'topico');
    const dicas = guideData.conteudo.filter(c => c.tipo === 'dica');

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar style="light" translucent />

            {/* HEROS IMAGE HEADER */}
            <View style={{ width: '100%', height: width * 0.85, position: 'relative' }}>
                <Image
                    source={{ uri: guideData.capa }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />

                {/* Gradient Overlay to make text readable */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)', '#FFFFFF']}
                    locations={[0, 0.4, 0.9, 1]}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />

                {/* Top Nav Overlay */}
                <SafeAreaView edges={['top']} style={{ position: 'absolute', width: '100%', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                        </TouchableOpacity>

                        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{guideData.emoji}</Text>
                        </View>
                    </View>
                </SafeAreaView>

                {/* Hero Title Container */}
                <View style={{ position: 'absolute', bottom: 40, paddingHorizontal: 24, width: '100%' }}>
                    <Text style={{ fontSize: 40, fontWeight: '900', color: '#111827', letterSpacing: -1, lineHeight: 42 }}>
                        {guideData.nome}
                    </Text>
                </View>
            </View>

            {/* CONTENT SCROLL (Journalism Style) */}
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Destaque / Resumo */}
                {destaqueText && (
                    <Text style={{ fontSize: 20, color: '#4B5563', lineHeight: 28, fontStyle: 'italic', marginBottom: 32, marginTop: -10 }}>
                        "{destaqueText}"
                    </Text>
                )}

                {/* Body Topicos */}
                {topicos.map((topico, idx) => (
                    <View key={idx} style={{ marginBottom: 32 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <View style={{ width: 8, height: 24, backgroundColor: guideData.cor, borderRadius: 4, marginRight: 12 }} />
                            <Text style={{ fontSize: 22, fontWeight: '800', color: '#1F2937', letterSpacing: -0.5, flex: 1 }}>
                                {topico.titulo}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 17, color: '#4B5563', lineHeight: 28, textAlign: 'justify' }}>
                            {topico.texto}
                        </Text>
                    </View>
                ))}

                {/* Dicas Soltas (Calls to Action format) */}
                {dicas.length > 0 && (
                    <View style={{
                        marginTop: 16,
                        backgroundColor: '#F8FAFC', // Slate 50
                        borderRadius: 20,
                        padding: 24,
                        borderLeftWidth: 4,
                        borderLeftColor: '#3B82F6', // Blue 500
                        ...Shadows.sm
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <NeoIcon name="LampCharge" size={24} color="#3B82F6" variant="Bold" style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: 18, fontWeight: '800', color: '#1E293B' }}>{t('headersFirst.goldenTip', 'Dica de Ouro')}</Text>
                        </View>

                        {dicas.map((dica, idx) => (
                            <Text key={idx} style={{ fontSize: 16, color: '#475569', lineHeight: 26, marginBottom: idx < dicas.length - 1 ? 12 : 0 }}>
                                {dica.texto}
                            </Text>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    onPress={() => navigation.navigate('ChecklistDetail', { 
                        roomId: ambienteId,
                        roomName: guideData.label,
                        roomColor: guideData.cor,
                        roomIcon: guideData.emoji
                    })}
                    style={{
                        marginTop: 40,
                        backgroundColor: guideData.cor,
                        borderRadius: 16,
                        padding: 18,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Shadows.md
                    }}
                >
                    <NeoIcon name="TickSquare" size={24} color="#FFF" variant="Bold" />
                    <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '800', marginLeft: 10 }}>
                        {t('headersFirst.auditThisEnvironment', 'Auditar este ambiente')}
                    </Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}
