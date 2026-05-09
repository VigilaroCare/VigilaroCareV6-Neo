import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';

export default function TravelSafetyGuideScreen({ navigation }) {
    const { t } = useTranslation('common');

    const renderSection = (iconName, color, title, content, bulletPoints = []) => (
        <NeoCard variant="elevated" style={{ marginBottom: 16, padding: 16, borderColor: color, borderWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{
                    width: 40, height: 40, borderRadius: 20,
                    backgroundColor: color + '20', // Opacidade 20%
                    alignItems: 'center', justifyContent: 'center', marginRight: 12
                }}>
                    <NeoIcon name={iconName} size={24} color={color} variant="Bold" />
                </View>
                <H3 style={{ color: Neo.colors.neutral[800], flex: 1 }}>{title}</H3>
            </View>

            <Body style={{ color: Neo.colors.neutral[600], marginBottom: 12, lineHeight: 20 }}>
                {content}
            </Body>

            {bulletPoints.length > 0 && (
                <View style={{ backgroundColor: Neo.colors.neutral[50], padding: 12, borderRadius: 8 }}>
                    {bulletPoints.map((point, index) => (
                        <View key={index} style={{ flexDirection: 'row', marginBottom: 6 }}>
                            <Text style={{ color: color, marginRight: 6, fontWeight: 'bold' }}>•</Text>
                            <Small style={{ color: Neo.colors.neutral[700], flex: 1, lineHeight: 18 }}>{point}</Small>
                        </View>
                    ))}
                </View>
            )}
        </NeoCard>
    );

    return (
        <AppBackground variant="subtle">
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <H2 style={{ marginLeft: 16, fontSize: 20 }}>{t('headersFirst.travelSafety', 'Segurança em Viagens e Lazer')}</H2>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Intro */}
                <Body style={{ marginBottom: 20, textAlign: 'center', fontStyle: 'italic' }}>
                    {t('headersFirst.FRiasEMomentosDeLazerExigemAtenORedobrad', '"Férias e momentos de lazer exigem atenção redobrada. Descubra como prevenir acidentes fora de casa."')}
                </Body>

                {/* 1. Ambientes Aquáticos */}
                {renderSection(
                    'Drop', // Drop -> water
                    '#0288D1',
                    'Ambientes Aquáticos',
                    'Praias, rios e cachoeiras são destinos comuns, mas escondem riscos de afogamento e quedas.',
                    [
                        'Avalie criteriosamente os riscos do local antes de entrar.',
                        'Supervisão Ativa: Olhos atentos o tempo todo.',
                        'Coletes Salva-vidas são mais seguros que boias de braço.'
                    ]
                )}

                {/* 2. Piscinas */}
                {renderSection(
                    'InfoCircle', // Custom -> radio-button-on (pool like?) or water
                    '#00BCD4',
                    'Piscinas e Clubes',
                    'Piscinas são grandes focos de acidentes fatais. A distração em festas aumenta o risco.',
                    [
                        'Em festas, use alarmes de queda na água ou sensores.',
                        'Respeite a separação de piscinas por idade.',
                        'Guarde piscinas portáteis imediatamente após o uso.'
                    ]
                )}

                {/* 3. Passeios Escolares */}
                {renderSection(
                    'Car', // Bus -> bus
                    '#FBC02D',
                    'Passeios Escolares',
                    'A responsabilidade de autorizar viagens escolares exige critério dos pais.',
                    [
                        'Avalie o destino (lagos, mar, cachoeiras exigem cautela).',
                        'Se possível, considere ir junto como monitor.',
                        'Verifique a proporção de adultos por criança.'
                    ]
                )}

                {/* 4. Ao Ar Livre */}
                {renderSection(
                    'Sun1', // Sun1 -> sunny
                    '#FF5722',
                    'Brincadeiras ao Ar Livre',
                    'Bicicletas, skates e pipas exigem locais seguros e proteção.',
                    [
                        'Capacete é obrigatório para rodas (bike, skate).',
                        'Nunca solte pipas perto da rede elétrica.',
                        'Verifique parquinhos quanto a ferrugem e peças soltas.'
                    ]
                )}

                {/* 5. Hospedagem */}
                {renderSection(
                    'Bed', // Bed -> bed
                    '#7B1FA2',
                    'Dormindo Fora (Hospedagem)',
                    'Hotéis e casas de veraneio não são adaptados para crianças ou idosos.',
                    [
                        'Leve Telas de Proteção Portáteis para camas de hotel.',
                        'Verifique sacadas e janelas assim que chegar.',
                        'Afaste móveis de janelas.'
                    ]
                )}

                {/* 6. Festas e Decoração */}
                {renderSection(
                    'MagicStar', // MagicStar -> aperture (party like?) or star
                    '#E91E63',
                    'Festas e Fim de Ano',
                    'Decorações temporárias e festas trazem novos riscos elétricos e de queimaduras.',
                    [
                        'Desligue árvores de natal ao dormir.',
                        'Cuidado com extensões elétricas no caminho (tropeços).',
                        'Atenção redobrada com vidro e churrasqueiras se houver álcool.'
                    ]
                )}

                {/* 7. Tecnologia */}
                {renderSection(
                    'Mobile', // Mobile -> phone-portrait
                    '#607D8B',
                    'Distração Digital',
                    'O uso excessivo de celulares isola o adulto dos riscos ao redor.',
                    [
                        'Evite celulares enquanto supervisiona crianças na água.',
                        'Mantenha o foco no trânsito e no ambiente.',
                        'Desconecte-se para conectar-se com segurança.'
                    ]
                )}

                <View style={{ height: 40 }} />

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
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    content: {
        padding: 20,
    }
});
