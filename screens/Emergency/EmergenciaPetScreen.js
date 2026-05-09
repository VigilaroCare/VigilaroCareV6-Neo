import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Design System
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import NeoText, { H2, H3, Body, Small } from '../../components/NeoTypography';
import SafeFooter from '../../components/SafeFooter';
import ProfileService from '../../services/ProfileService';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';

export default function EmergenciaPetScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const [species, setSpecies] = React.useState([]);

    React.useEffect(() => {
        async function loadData() {
            const pets = await ProfileService.getPets();
            const uniqueSpecies = [...new Set(pets.map(p => p.especie?.toLowerCase() || ''))].filter(s => s !== '');
            setSpecies(uniqueSpecies);
        }
        loadData();
    }, []);

    const callCiatox = () => Linking.openURL('tel:08007226001');
    const callVet = () => Linking.openURL('geo:0,0?q=veterinario 24h');

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Header de Emergência Extrema - Neo Glass Emerald */}
            <LinearGradient
                colors={['#059669', '#047857', '#064E3B']} // Verde Médico Profundo
                style={{
                    paddingHorizontal: 20,
                    paddingTop: insets.top + 20,
                    paddingBottom: 40,
                    borderBottomLeftRadius: 32,
                    borderBottomRightRadius: 32,
                    ...Neo.shadows?.lg
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 16 }}>
                    <NeoIcon name="ArrowLeft2" size={28} color="#FFF" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                        <NeoIcon name="Health" size={32} color="#FFF" variant="Bold" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <H2 style={{ color: '#FFF' }}>{t('headersFirst.sosPet', 'S.O.S Pet')}</H2>
                        <Body style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}>{t('headersFirst.centralDeAOImediata', 'Central de Ação Imediata')}</Body>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 130 }} showsVerticalScrollIndicator={false} style={{ marginTop: -20 }}>
                
                {/* AÇÃO PRINCIPAL: PRIMEIROS SOCORROS */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('PrimeirosSocorrosEmergencia')}
                >
                    <NeoCard variant="glass" style={{
                        padding: 0, overflow: 'hidden', marginBottom: 24,
                        borderWidth: 2, borderColor: '#10B981', backgroundColor: 'transparent'
                    }}>
                        <LinearGradient colors={['rgba(16, 185, 129, 0.1)', 'transparent']} style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', marginRight: 16, ...Neo.shadows?.md }}>
                                <NeoIcon name="Heart" size={32} color="#FFF" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <H3 style={{ color: '#047857', fontSize: 18, marginBottom: 4 }}>{t('headersFirst.survivalProtocols', 'Protocolos de Sobrevivência')}</H3>
                                <Body style={{ color: '#065F46', lineHeight: 20 }}>{t('headersFirst.guiasPassoAPassoRPidosParaEngasgoEnvenen', 'Guias passo a passo rápidos para Engasgo, Envenenamento e Quedas.')}</Body>
                            </View>
                            <NeoIcon name="ArrowRight2" size={24} color="#10B981" />
                        </LinearGradient>
                    </NeoCard>
                </TouchableOpacity>

                <H3 style={{ color: Neo.colors.neutral[800], marginBottom: 16, marginLeft: 4 }}>{t('headersFirst.lifeThreateningCall', 'Ligação de Risco de Morte')}</H3>

                {/* BOTÃO DE PÂNICO: INTOXICAÇÃO */}
                <TouchableOpacity activeOpacity={0.8} onPress={callCiatox}>
                    <NeoCard variant="glass" style={{ backgroundColor: '#EF4444', padding: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
                        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#B91C1C', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                            <NeoIcon name="Danger" size={32} color="#FFF" variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <H3 style={{ color: '#FFF', fontSize: 18, marginBottom: 2 }}>{t('headersFirst.poisoning', 'Envenenamento / Tóxicos')}</H3>
                            <Body style={{ color: '#FEE2E2', fontWeight: 'bold' }}>{t('headersFirst.cIATOXLIGUE08007226001', 'CIATOX - LIGUE 0800 722 6001')}</Body>
                        </View>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}>
                            <NeoText style={{ color: '#FFF', fontWeight: 'bold' }}>LIGAR</NeoText>
                        </View>
                    </NeoCard>
                </TouchableOpacity>

                {/* BOTÃO DE PÂNICO: TRAUMA FIV */}
                <TouchableOpacity activeOpacity={0.8} onPress={callVet}>
                    <NeoCard variant="glass" style={{ backgroundColor: '#F59E0B', padding: 20, marginBottom: 24, flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
                        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#B45309', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                            <NeoIcon name="Location" size={32} color="#FFF" variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <H3 style={{ color: '#FFF', fontSize: 18, marginBottom: 2 }}>{t('headersFirst.hemorrhage', 'Hemorragia / Traumas')}</H3>
                            <Body style={{ color: '#FEF3C7', fontWeight: 'bold' }}>{t('headersFirst.buscarClNicas24hNaRegiO', 'Buscar Clínicas 24h na Região')}</Body>
                        </View>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}>
                            <NeoText style={{ color: '#FFF', fontWeight: 'bold' }}>BUSCAR</NeoText>
                        </View>
                    </NeoCard>
                </TouchableOpacity>

                {/* PROTOCOLOS INTELIGENTES */}
                {species && species.length > 0 && species.includes('ave') && (
                    <View style={{ marginBottom: 24 }}>
                        <H3 style={{ color: Neo.colors.neutral[800], marginBottom: 12, marginLeft: 4 }}>{t('headersFirst.protocolosDetectados', 'Protocolos Detectados')}</H3>
                        <TouchableOpacity onPress={() => navigation.navigate('AvesSeguras')}>
                            <NeoCard variant="glass" style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderStyle: 'dashed', borderColor: '#0288D1', borderWidth: 2, backgroundColor: '#F0F9FF' }}>
                                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                                    <NeoIcon name="Wind" size={24} color="#0288D1" variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <H3 style={{ color: '#0369A1', fontSize: 15 }}>{t('headersFirst.atenOAveNaCasa', 'Atenção: Ave na Casa')}</H3>
                                    <Body style={{ color: '#0284C7', fontSize: 12 }}>{t('headersFirst.riscoRespiratRioCrTicoTeflonVapores', 'Risco Respiratório Crítico (Teflon/Vapores)')}</Body>
                                </View>
                            </NeoCard>
                        </TouchableOpacity>
                    </View>
                )}

                {/* ACESSO A CARTEIRINHA */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MainTabs', { screen: 'Perfil' })}>
                    <NeoCard variant="glass" style={{ flexDirection: 'row', padding: 16, alignItems: 'center', backgroundColor: 'transparent', borderColor: Neo.colors.neutral[200] }}>
                        <NeoIcon name="Card" size={28} color={Neo.colors.primary[500]} style={{ marginRight: 16 }} />
                        <View style={{ flex: 1 }}>
                            <H3 style={{ color: Neo.colors.neutral[800], fontSize: 15 }}>{t('headersFirst.carteirinhaDeVacinaO', 'Carteirinha de Vacinação')}</H3>
                            <Body style={{ color: Neo.colors.neutral[500] }}>{t('headersFirst.histRicoParaApresentarAoVeterinRio', 'Histórico para apresentar ao Veterinário.')}</Body>
                        </View>
                        <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[400]} />
                    </NeoCard>
                </TouchableOpacity>

            </ScrollView>

            <SafeFooter navigation={navigation} />
        </View>
    );
}
