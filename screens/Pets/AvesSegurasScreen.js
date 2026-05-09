import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Design System
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import NeoText, { H2, H3, Body, Small } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import { AVES_SEGURAS_DATA } from '../../data/aves_seguras_data';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';

export default function AvesSegurasScreen({ navigation }) {
    const { t } = useTranslation('common');

    const renderRiscoCard = (title, message, icon, color, bg) => (
        <NeoCard variant="glass" style={{ marginBottom: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: color }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <NeoIcon name={icon} size={20} color={color} variant="Bold"/>
                </View>
                <H3 style={{ flex: 1, fontSize: 16, color: Neo.colors.neutral[900] }}>{title}</H3>
            </View>
            <Body style={{ color: Neo.colors.neutral[600] }}>{message}</Body>
        </NeoCard>
    );

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style="dark" />
                
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginRight: 16 }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}><H2>{t('avesSeguras.headerTitle', 'Aves Seguras')}</H2></View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
                    
                    {/* Hero Area */}
                    <NeoCard variant="glass" style={{
                        padding: 24, paddingVertical: 32, alignItems: 'center', alignSelf: 'stretch', marginBottom: 24, marginTop: 12, backgroundColor: '#E1F5FE'
                    }}>
                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#81D4FA', alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#81D4FA', shadowOpacity: 0.8, shadowRadius: 20 }}>
                            <NeoText style={{ fontSize: 32 }}>🦜</NeoText>
                        </View>
                        <H3 style={{ color: '#0288D1', textAlign: 'center', marginBottom: 8 }}>{t_field(AVES_SEGURAS_DATA.hero, 'title')}</H3>
                        <Body style={{ color: '#0277BD', textAlign: 'center', lineHeight: 22 }}>{t_field(AVES_SEGURAS_DATA.hero, 'desc')}</Body>
                    </NeoCard>

                    {/* ALERTA CRITICO */}
                    <NeoCard variant="glass" style={{ padding: 20, backgroundColor: '#FFF0F0', borderColor: '#FFCDD2', borderWidth: 1, marginBottom: 24 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFCDD2', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <NeoIcon name="Danger" size={20} color="#D32F2F" variant="Bold"/>
                            </View>
                            <H3 style={{ color: '#C62828', flex: 1, textTransform: 'uppercase', fontSize: 14 }}>{t_field(AVES_SEGURAS_DATA.alertaCritico, 'title')}</H3>
                        </View>
                        <Body style={{ color: '#B71C1C', marginBottom: 12, fontWeight: '500' }}>
                            {t_field(AVES_SEGURAS_DATA.alertaCritico, 'desc')}
                        </Body>
                        <View style={{ backgroundColor: 'rgba(211, 47, 47, 0.1)', padding: 12, borderRadius: 8 }}>
                            <Small style={{ color: '#D32F2F', fontWeight: 'bold' }}>{t_field(AVES_SEGURAS_DATA.alertaCritico, 'small')}</Small>
                        </View>
                    </NeoCard>

                    <H3 style={{ marginBottom: 16, color: Neo.colors.neutral[800] }}>{t('avesSeguras.environmentTitle', 'Ambiente Saudável')}</H3>
                    
                    {AVES_SEGURAS_DATA.riscos.map((risco, index) => 
                        <View key={index}>
                            {renderRiscoCard(
                                t_field(risco, 'title'),
                                t_field(risco, 'message'),
                                risco.icon,
                                risco.color,
                                risco.bg
                            )}
                        </View>
                    )}

                    <NeoCard variant="glass" style={{ marginTop: 16, padding: 20, backgroundColor: '#F3E5F5', borderColor: '#E1BEE7', borderWidth: 1 }}>
                        <H3 style={{ color: '#6A1B9A', marginBottom: 8 }}>{t_field(AVES_SEGURAS_DATA.diagnostico, 'title')}</H3>
                        <Body style={{ color: '#8E24AA', marginBottom: 16 }}>{t_field(AVES_SEGURAS_DATA.diagnostico, 'desc')}</Body>
                        <TouchableOpacity 
                            style={{ backgroundColor: '#8E24AA', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
                            onPress={() => navigation.navigate('PetFoodSafety')}
                        >
                            <NeoText style={{ color: '#FFF', fontWeight: 'bold' }}>{t_field(AVES_SEGURAS_DATA.diagnostico, 'btn')}</NeoText>
                        </TouchableOpacity>
                    </NeoCard>

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
