import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';

// Components
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import { useProfiles } from '../../contexts/ProfileContext';
import AppBackground from '../../components/AppBackground';

export default function AddEventScreen({ navigation }) {
    const { t } = useTranslation('common');
    const { primaryProfile } = useProfiles();
    const isPet = primaryProfile?.tipo === 'pet';

    const eventTypes = [
        {
            id: 'treatment',
            title: 'Tratamento Contínuo',
            description: isPet ? 'Fisioterapia, controle de dor, etc.' : 'Fisioterapia, hemodiálise, etc.',
            icon: 'hospital-box',
            color: Neo.colors.primary[600],
            screen: 'AddTreatment'
        },
        {
            id: 'appointment',
            title: 'Consulta',
            description: isPet ? 'Agendamento com veterinário' : 'Agendamento com médico',
            icon: 'calendar',
            color: Neo.colors.secondary[500],
            screen: 'AddAppointment'
        },
        {
            id: 'exam',
            title: 'Exame',
            description: isPet ? 'Raio-x, ultrassom, sangue, etc.' : 'Ultrassom, raio-x, laboratoriais, etc.',
            icon: 'clipboard-pulse',
            color: Neo.colors.primary[500],
            screen: 'AddExam'
        },
        {
            id: 'procedure',
            title: 'Procedimento',
            description: isPet ? 'Castração, limpeza de tártaro, etc.' : 'Endoscopia, colonoscopia, etc.',
            icon: 'medical-bag',
            color: Neo.colors.feedback.warning,
            screen: 'AddProcedure'
        }
    ];

    return (
        <AppBackground variant="subtle">
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NeoIcon name="CloseSquare" size={28} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <H2 style={{ flex: 1, marginLeft: 16 }}>{t('headersFirst.novoEvento', 'Novo Evento')}</H2>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
                <Body style={{ color: Neo.colors.neutral[600], marginBottom: 24 }}>
                    {t('headersFirst.escolhaOTipoDeEventoQueDesejaAdicionar', 'Escolha o tipo de evento que deseja adicionar:')}
                </Body>

                <View style={styles.gridContainer}>
                    {eventTypes.map(type => (
                        <TouchableOpacity
                            key={type.id}
                            style={styles.gridItem}
                            onPress={() => navigation.navigate(type.screen)}
                        >
                            <NeoCard variant="elevated" style={styles.typeCard}>
                                <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                                    <NeoIcon name={type.icon} size={32} color={type.color} />
                                </View>
                                <H3 style={{ textAlign: 'center', marginTop: 12 }}>{type.title}</H3>
                                <Small style={{ color: Neo.colors.neutral[500], textAlign: 'center', marginTop: 8, flex: 1 }}>
                                    {type.description}
                                </Small>
                            </NeoCard>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: Neo.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 24,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 16,
    },
    typeCard: {
        alignItems: 'center',
        padding: 16,
        height: 180,
    },
    typeIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
