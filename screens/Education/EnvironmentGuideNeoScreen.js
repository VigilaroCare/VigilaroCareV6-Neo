import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import NeoIcon from '../../components/NeoIcon';
import { getConteudoPrevencao } from '../../data/knowledge_prevencao';
import { Shadows } from '../../utils/Theme';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = Math.round(width * 0.78);

export default function EnvironmentGuideNeoScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { ambienteId } = route.params || { ambienteId: 'sala' };
    const guideData = useMemo(() => getConteudoPrevencao(ambienteId), [ambienteId]);
    const [imgError, setImgError] = useState(false);

    const destaqueText = guideData.conteudo.find(c => c.tipo === 'destaque')?.texto;
    const topicos = guideData.conteudo.filter(c => c.tipo === 'topico');
    const dicas = guideData.conteudo.filter(c => c.tipo === 'dica');

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar style="light" translucent />

            {/* HERO HEADER */}
            <View style={{ width: '100%', height: HERO_HEIGHT, position: 'relative', backgroundColor: guideData.cor }}>
                {/* Imagem com fallback gracioso para emoji+cor */}
                {!imgError && guideData.capa ? (
                    <Image
                        source={{ uri: guideData.capa }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <View style={{
                        width: '100%', height: '100%',
                        alignItems: 'center', justifyContent: 'center',
                        backgroundColor: guideData.cor,
                    }}>
                        <Text style={{ fontSize: 120, opacity: 0.65 }}>{guideData.emoji}</Text>
                    </View>
                )}

                {/* Gradient para legibilidade do título */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', '#FFFFFF']}
                    locations={[0, 0.35, 0.85, 1]}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />

                {/* Nav top */}
                <SafeAreaView edges={['top']} style={{ position: 'absolute', width: '100%' }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingTop: 8,
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                width: 40, height: 40, borderRadius: 20,
                                backgroundColor: 'rgba(0,0,0,0.45)',
                                alignItems: 'center', justifyContent: 'center',
                            }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <NeoIcon name="ArrowLeft2" size={22} color="#FFF" variant="Bold" />
                        </TouchableOpacity>

                        <View style={{
                            width: 40, height: 40, borderRadius: 20,
                            backgroundColor: 'rgba(0,0,0,0.45)',
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 20 }}>{guideData.emoji}</Text>
                        </View>
                    </View>
                </SafeAreaView>

                {/* Hero title (em cima do gradient branco final) */}
                <View style={{
                    position: 'absolute',
                    bottom: 24,
                    paddingHorizontal: 22,
                    width: '100%',
                }}>
                    <Text style={{
                        fontSize: 34,
                        fontWeight: '900',
                        color: '#111827',
                        letterSpacing: -0.8,
                        lineHeight: 38,
                    }}>
                        {guideData.nome}
                    </Text>
                </View>
            </View>

            {/* CONTENT — tipografia ajustada para mobile */}
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 190 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Destaque */}
                {destaqueText && (
                    <Text style={{
                        fontSize: 16.5,
                        color: '#4B5563',
                        lineHeight: 25,
                        fontStyle: 'italic',
                        marginBottom: 26,
                        marginTop: 6,
                    }}>
                        "{destaqueText}"
                    </Text>
                )}

                {/* Tópicos */}
                {topicos.map((topico, idx) => (
                    <View key={idx} style={{ marginBottom: 26 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <View style={{
                                width: 6,
                                height: 22,
                                backgroundColor: guideData.cor,
                                borderRadius: 3,
                                marginRight: 12,
                            }} />
                            <Text style={{
                                fontSize: 18.5,
                                fontWeight: '800',
                                color: '#1F2937',
                                letterSpacing: -0.4,
                                flex: 1,
                                lineHeight: 24,
                            }}>
                                {topico.titulo}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 15,
                            color: '#4B5563',
                            lineHeight: 24,
                            textAlign: 'left',
                        }}>
                            {topico.texto}
                        </Text>
                    </View>
                ))}

                {/* Dicas */}
                {dicas.length > 0 && (
                    <View style={{
                        marginTop: 12,
                        backgroundColor: '#F8FAFC',
                        borderRadius: 18,
                        padding: 18,
                        borderLeftWidth: 4,
                        borderLeftColor: '#3B82F6',
                        ...Shadows.sm,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <NeoIcon name="LampCharge" size={20} color="#3B82F6" variant="Bold" style={{ marginRight: 8 }} />
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '800',
                                color: '#1E293B',
                                letterSpacing: -0.2,
                            }}>
                                {t('headersFirst.goldenTip', 'Dica de ouro')}
                            </Text>
                        </View>

                        {dicas.map((dica, idx) => (
                            <Text key={idx} style={{
                                fontSize: 14.5,
                                color: '#475569',
                                lineHeight: 22,
                                marginBottom: idx < dicas.length - 1 ? 10 : 0,
                            }}>
                                {dica.texto}
                            </Text>
                        ))}
                    </View>
                )}

                {/* CTA Auditar */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('ChecklistDetail', {
                        roomId: ambienteId,
                        roomName: guideData.nome,
                        roomColor: guideData.cor,
                        roomIcon: guideData.emoji,
                    })}
                    activeOpacity={0.85}
                    style={{
                        marginTop: 28,
                        backgroundColor: guideData.cor,
                        borderRadius: 16,
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Shadows.md,
                    }}
                >
                    <NeoIcon name="TickSquare" size={22} color="#FFF" variant="Bold" />
                    <Text style={{
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: '800',
                        marginLeft: 10,
                        letterSpacing: 0.1,
                    }}>
                        {t('headersFirst.auditThisEnvironment', 'Auditar este ambiente')}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
