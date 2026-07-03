import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { useIsDark } from '../utils/ThemeContext';
import ThreeRingChart from './ThreeRingChart';
import NeoIcon from './NeoIcon';
import CompactActiveMonitor from './CompactActiveMonitor';
import ScoreLegendModal from './ScoreLegendModal';
import * as NavigationService from '../services/NavigationService';

// Importaremos as imagens. 
// O App confia que esses arquivos serão substituídos pelas novas imagens "peças de quebra-cabeça" 
// que o designer está gerando, contendo os recortes (furo central).
const HUB_PICTOGRAMS = {
    vistorias:   require('../assets/illustrations/home-pictograms/vistorias.png'),
    atividades:  require('../assets/illustrations/home-pictograms/atividades-eventuais.png'),
    scanner:     require('../assets/illustrations/home-pictograms/scanner-ambiente.png'),
    inforotulos: require('../assets/illustrations/home-pictograms/info-rotulos.png'),
};

export default function HubCasaSobControle({ scoreData, onPress, isExpanded, scoreMessage }) {
    const { t } = useTranslation();
    const isDark = useIsDark();
    const [isLegendVisible, setIsLegendVisible] = useState(false);

    // Usa bege sólido no light mode para casar com o fundo das peças do Canva
    // e remover o aspecto "fundo branco" do Hero.
    const getBgColor = () => {
        return isDark ? [Neo.colors.neutral[800], Neo.colors.neutral[900]] : ['#F4F2EC', '#F4F2EC'];
    };

    const cardBorderColor = isDark ? 'rgba(255,255,255,0.1)' : Neo.colors.primary[800];
    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const textMuted = isDark ? '#A1A1AA' : Neo.colors.neutral[600];

    const navigate = (route, params) => {
        NavigationService.navigate(route, params);
    };

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <LinearGradient
                colors={getBgColor()}
                style={[styles.card, { borderColor: cardBorderColor, borderWidth: isDark ? 1 : 1.5 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Header */}
                <View style={styles.hubHeader}>
                    <Text style={[styles.hubTitle, { color: textColor }]}>
                        VigilaroCare - Visão Geral
                    </Text>
                    <NeoIcon name="ArrowDown2" size={14} color={textMuted} style={{ position: 'absolute', right: 0, opacity: 0.7, transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }} />
                </View>

                {/* Tabuleiro do Quebra-Cabeça (Sem gaps, para que as peças se unam perfeitamente) */}
                <View style={styles.puzzleBoard}>
                    
                    {/* Linha Superior */}
                    <View style={styles.puzzleRow}>
                        {/* Esquerda superior: Vistorias */}
                        <TouchableOpacity 
                            style={styles.puzzlePieceContainer} 
                            onPress={() => navigate('Relatorios')}
                            activeOpacity={0.8}
                            accessibilityLabel={t('home.inspections', 'Vistorias')}
                        >
                            <Image source={HUB_PICTOGRAMS.vistorias} style={styles.puzzleImage} resizeMode="contain" />
                            <Text style={[styles.overlayText, { bottom: 10 }]}>{t('home.inspections', 'Vistorias')}</Text>
                        </TouchableOpacity>

                        {/* Direita superior: Atividades eventuais */}
                        <TouchableOpacity 
                            style={styles.puzzlePieceContainer} 
                            onPress={() => navigate('ModoPreventivo')}
                            activeOpacity={0.8}
                            accessibilityLabel={t('home.eventualActivities', 'Atividades')}
                        >
                            <Image source={HUB_PICTOGRAMS.atividades} style={styles.puzzleImage} resizeMode="contain" />
                            <Text style={styles.overlayText}>{t('home.eventualActivities', 'Atividades')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Linha Inferior */}
                    <View style={styles.puzzleRow}>
                        {/* Esquerda inferior: Scanner Ambiente */}
                        <TouchableOpacity 
                            style={styles.puzzlePieceContainer} 
                            onPress={() => navigate('Scanner')}
                            activeOpacity={0.8}
                            accessibilityLabel={t('home.envScanner', 'Scanner Ambiente')}
                        >
                            <Image source={HUB_PICTOGRAMS.scanner} style={styles.puzzleImage} resizeMode="contain" />
                            <Text style={[styles.overlayText, { bottom: 10 }]}>{t('home.envScanner', 'Scanner Ambiente')}</Text>
                        </TouchableOpacity>

                        {/* Direita inferior: Info Rótulos */}
                        <TouchableOpacity 
                            style={styles.puzzlePieceContainer} 
                            onPress={() => navigate('InfoRotulos')}
                            activeOpacity={0.8}
                            accessibilityLabel={t('home.infoLabels', 'Info Rótulos')}
                        >
                            <Image source={HUB_PICTOGRAMS.inforotulos} style={styles.puzzleImage} resizeMode="contain" />
                            <Text style={styles.overlayText}>{t('home.infoLabels', 'Info Rótulos')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Gráfico Central flutuando no "buraco" do quebra-cabeça */}
                    <TouchableOpacity 
                        style={styles.centerChartWrapper}
                        activeOpacity={0.9}
                        onPress={() => navigate('AmbientesVistoriados', { scoreData })}
                    >
                        <ThreeRingChart scoreData={scoreData} size={80} shape="squircle" />
                    </TouchableOpacity>

                </View>

                {/* ScoreLegend Modal */}
                <ScoreLegendModal 
                    visible={isLegendVisible} 
                    onClose={() => setIsLegendVisible(false)} 
                />

                {isExpanded && (
                    <View style={styles.heroWell}>
                        <CompactActiveMonitor
                            scoreData={scoreData}
                            scoreMessage={scoreMessage}
                            isExpanded={isExpanded}
                            hideScore
                        />
                    </View>
                )}

            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 16,
        paddingTop: 16,
        marginTop: 10,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    hubHeader: {
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    hubTitle: {
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.2,
    },
    puzzleBoard: {
        aspectRatio: 4 / 3, 
        width: '100%',
        position: 'relative',
    },
    puzzleRow: {
        flex: 1,
        flexDirection: 'row',
    },
    puzzlePieceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6, // Cria 12px de espaço real entre os cards (universal)
    },
    puzzleImage: {
        width: '100%',
        height: '100%',
    },
    centerChartWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -42 }, { translateY: -43 }],
        width: 80, 
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    overlayText: {
        position: 'absolute',
        bottom: 8,
        width: '100%',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '800',
        color: Neo.colors.neutral[900], 
        letterSpacing: -0.2,
        paddingHorizontal: 2,
    },
    heroWell: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 8,
    }
});
