import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { useIsDark } from '../utils/ThemeContext';
import CompactActiveMonitor from './CompactActiveMonitor';
import ScoreLegendModal from './ScoreLegendModal';
import * as NavigationService from '../services/NavigationService';

// Nova imagem base com recorte retangular no centro
const HUB_BASE_RECT = require('../assets/illustrations/home-pictograms/hub-base-rect.png');

// Cor semântica do score
const getScoreColor = (score) => {
    if (score >= 80) return '#15803D'; // Verde
    if (score >= 50) return '#B45309'; // Âmbar
    return '#B91C1C';                  // Vermelho
};

export default function HubCasaSobControle({ scoreData, onPress, isExpanded, scoreMessage }) {
    const { t } = useTranslation();
    const isDark = useIsDark();
    const [isLegendVisible, setIsLegendVisible] = useState(false);
    const { width: windowWidth } = useWindowDimensions();

    const navigate = (route, params) => {
        NavigationService.navigate(route, params);
    };

    // ── Dimensões do board (mesma lógica do original) ──
    const IMAGE_ASPECT_RATIO = 1536 / 1024;
    const boardWidth = windowWidth - 16;
    const boardHeight = boardWidth / IMAGE_ASPECT_RATIO;

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View style={styles.container}>

                <View style={[styles.puzzleBoard, { width: boardWidth, height: boardHeight }]}>
                    {/* Imagem base com recorte retangular */}
                    <Image source={HUB_BASE_RECT} style={styles.compositeImage} resizeMode="stretch" />

                    {/* Títulos já embutidos na imagem — sem overlay de texto */}

                    {/* 4 zonas de toque invisíveis nos quadrantes */}
                    <View style={styles.touchOverlay}>
                        <View style={styles.touchRow}>
                            <TouchableOpacity
                                style={styles.touchQuadrant}
                                onPress={() => navigate('Relatorios')}
                                activeOpacity={0.7}
                            />
                            <TouchableOpacity
                                style={styles.touchQuadrant}
                                onPress={() => navigate('ModoPreventivo')}
                                activeOpacity={0.7}
                            />
                        </View>
                        <View style={styles.touchRow}>
                            <TouchableOpacity
                                style={styles.touchQuadrant}
                                onPress={() => navigate('Scanner')}
                                activeOpacity={0.7}
                            />
                            <TouchableOpacity
                                style={styles.touchQuadrant}
                                onPress={() => navigate('InfoRotulos')}
                                activeOpacity={0.7}
                            />
                        </View>
                    </View>

                    {/* Score — conteúdo sobreposto no card central nativo da imagem */}
                    <TouchableOpacity
                        style={[styles.scoreOverlay, {
                            width:  boardWidth * 0.135,
                            height: boardHeight * 0.17,
                            left:   boardWidth * 0.5 - (boardWidth * 0.135) / 2,
                            top:    boardHeight * 0.5 - (boardHeight * 0.17) / 2,
                        }]}
                        activeOpacity={0.8}
                        onPress={() => navigate('AmbientesVistoriados', { scoreData })}
                    >
                        {/* Número do Score */}
                        <Text style={[styles.scoreNumber, { color: '#29402d' }]}>
                            {scoreData?.geral || 0}
                        </Text>

                        {/* Barra Tracejada — 20 segmentos de 5% cada */}
                        <View style={styles.progressBarTrack}>
                            {Array.from({ length: 20 }, (_, i) => {
                                const segmentThreshold = (i + 1) * 5;
                                const score = scoreData?.geral || 0;
                                const isFilled = score >= segmentThreshold;
                                return (
                                    <View
                                        key={i}
                                        style={[
                                            styles.progressSegment,
                                            {
                                                backgroundColor: isFilled
                                                    ? getScoreColor(score)
                                                    : 'rgba(0,0,0,0.08)',
                                            }
                                        ]}
                                    />
                                );
                            })}
                        </View>
                    </TouchableOpacity>

                </View>

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
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 8,
    },
    puzzleBoard: {
        alignSelf: 'center',
        position: 'relative',
        backgroundColor: '#f4ecdc',
        borderRadius: 20,
    },
    compositeImage: {
        width: '100%',
        height: '100%',
    },
    touchOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    touchRow: {
        flex: 1,
        flexDirection: 'row',
    },
    touchQuadrant: {
        flex: 1,
    },
    heroWell: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 8,
    },
    scoreOverlay: {
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreNumber: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -1,
    },
    progressBarTrack: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3,
    },
    progressSegment: {
        flex: 1,
        height: 6,
        borderRadius: 1,
        marginHorizontal: 0.5,
    },
});
