import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import NeoIcon from '../../components/NeoIcon';
import { TEORIA_FOGO_DATA } from '../../data/teoria_fogo';
import AppBackground from '../../components/AppBackground';
import ReviewImage from '../../components/ReviewImage';
import { DS as Neo } from '../../utils/DesignSystem2026';

const { width } = Dimensions.get('window');
const SPACING = 16;
const CARD_WIDTH = (width - 48 - SPACING) / 2;

export default function TeoriaFogoScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const THEME_COLOR = '#EF4444'; // Red

    const items = [
        { id: 'triangulo', ...TEORIA_FOGO_DATA.triangulo },
        { id: 'classes', ...TEORIA_FOGO_DATA.classes },
        { id: 'extintores', ...TEORIA_FOGO_DATA.extintores },
    ];

    const handlePress = (item) => {
        navigation.navigate('ConceitoDetail', {
            conceito: item
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
            <StatusBar style="light" backgroundColor={THEME_COLOR} />

            {/* Custom Colored Header */}
            <View style={{
                backgroundColor: THEME_COLOR,
                paddingTop: insets.top + 20,
                paddingBottom: 30,
                paddingHorizontal: 24,
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                flexDirection: 'row',
                alignItems: 'center',
                ...Shadows.md
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 48, height: 48, borderRadius: 24,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        alignItems: 'center', justifyContent: 'center',
                        marginRight: 16
                    }}
                >
                    <NeoIcon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: '800', color: '#FFF' }}>
                        {t('headersFirst.teoriaDoFogo', 'Teoria do Fogo')}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>
                        {t('headersFirst.conceitosEssenciaisDePrevenO', 'Conceitos essenciais de prevenção.')}
                    </Text>
                </View>
            </View>

            {/* Grid Layout (2 cols) */}
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                <View style={styles.gridContainer}>
                    {items.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => handlePress(item)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.thumbContainer, { backgroundColor: item.bg }]}>
                                    {item.imagemUrl ? (
                                        <ReviewImage
                                            source={{ uri: item.imagemUrl }}
                                            tint={item.iconColor}
                                            accessibilityLabel={item.titulo}
                                        />
                                    ) : (
                                        <NeoIcon name={item.icon} size={48} color={item.iconColor} variant="Bold" />
                                    )}
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                                    <Text style={styles.cardDesc}>{item.subtitulo}</Text>
                                </View>
                            </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: SPACING,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginBottom: SPACING,
        overflow: 'hidden',
        ...Shadows.md,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    thumbContainer: {
        width: '100%',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBody: {
        padding: 14,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
        textAlign: 'center',
        lineHeight: 20,
    },
    cardDesc: {
        fontSize: 12.5,
        color: '#6B7280',
        fontWeight: '500',
        textAlign: 'center',
    },
});
