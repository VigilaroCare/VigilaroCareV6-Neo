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
import { PET_FOOD_SAFETY } from '../../data/pet_food_safety';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';

export default function PetFoodSafetyScreen({ navigation }) {
    const { t } = useTranslation('common');

    const renderCard = (item) => (
        <NeoCard variant="glass" key={item.id} style={{ marginBottom: 16, padding: 0, overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderLeftWidth: 6, borderLeftColor: item.cor }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: item.cor + '15', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <NeoText style={{ fontSize: 24 }}>{item.emoji}</NeoText>
                </View>
                <View style={{ flex: 1 }}>
                    <H3 style={{ fontSize: 16, color: Neo.colors.neutral[900], marginBottom: 2 }}>{t_field(item, 'nome')}</H3>
                    <View style={{ backgroundColor: item.cor, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                        <Small style={{ color: '#FFF', fontWeight: 'bold', fontSize: 10 }}>RISCO {t_field(item, 'risco').toUpperCase()}</Small>
                    </View>
                </View>
            </View>
            
            <View style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)' }}>
                <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                    <Small style={{ width: 70, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>{t('headersFirst.toxina', 'Toxina:')}</Small>
                    <Small style={{ flex: 1, color: Neo.colors.neutral[800], fontWeight: '500' }}>{t_field(item, 'toxina')}</Small>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <Small style={{ width: 70, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>{t('headersFirst.sintomas', 'Sintomas:')}</Small>
                    <Small style={{ flex: 1, color: Neo.colors.neutral[800] }}>{t_field(item, 'sintomas')}</Small>
                </View>
                <Body style={{ fontSize: 12, color: Neo.colors.neutral[600], fontStyle: 'italic', lineHeight: 18 }}>💡 {t_field(item, 'detalhe')}</Body>
            </View>
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
                    <View style={{ flex: 1 }}><H2>{t('petFood.headerTitle', 'Lista Negra')}</H2></View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    
                    {/* Hero Area */}
                    <NeoCard variant="glass" style={{
                        padding: 24, paddingVertical: 32, alignItems: 'center', alignSelf: 'stretch', marginBottom: 24, marginTop: 12, backgroundColor: '#FFEBEE'
                    }}>
                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#EF5350', alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#EF5350', shadowOpacity: 0.8, shadowRadius: 20 }}>
                            <NeoIcon name="Danger" size={32} color="#FFF" variant="Bold" />
                        </View>
                        <H3 style={{ color: '#C62828', textAlign: 'center', marginBottom: 8 }}>{t('petFood.heroTitle', 'Alimentos Proibidos')}</H3>
                        <Body style={{ color: '#D32F2F', textAlign: 'center', lineHeight: 22 }}>{t('petFood.heroDesc', 'Metabolismos diferentes tornam petiscos de humanos em venenos letais para cães e gatos. Memorize esta lista vermelha.')}</Body>
                    </NeoCard>

                    {/* ALERTA CIATOX */}
                    <NeoCard variant="glass" style={{ padding: 16, backgroundColor: '#FFF0F0', borderColor: '#FFCDD2', borderWidth: 1, marginBottom: 24, flexDirection: 'row', alignItems: 'center' }}>
                        <NeoIcon name="Call" size={28} color="#D32F2F" style={{ marginRight: 16 }} />
                        <View style={{ flex: 1 }}>
                            <H3 style={{ color: '#C62828', fontSize: 14 }}>{t('petFood.alertTitle', 'Intoxicação Recente?')}</H3>
                            <Body style={{ color: '#B71C1C', fontSize: 13 }}>{t('petFood.alertDesc', 'Corra ao Veterinário ou acione o CIATOX: 0800-722-6001')}</Body>
                        </View>
                    </NeoCard>

                    <H3 style={{ marginBottom: 16, color: Neo.colors.neutral[800] }}>{t('petFood.listTitle', 'Mosaico de Riscos')}</H3>
                    
                    {PET_FOOD_SAFETY.map(renderCard)}

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
