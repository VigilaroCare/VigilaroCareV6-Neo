/**
 * ProcedureSteps.js
 * Componente de fallback para exibir passos do procedimento
 * Usado quando vídeo não está disponível (offline sem cache)
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors } from '../utils/Theme';

export default function ProcedureSteps({
    steps = [],
    title,
    complexity = 'medium',
    duration,
    language = 'pt-BR',
    style,
}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    const toggleStepComplete = (index) => {
        if (completedSteps.includes(index)) {
            setCompletedSteps(completedSteps.filter(i => i !== index));
        } else {
            setCompletedSteps([...completedSteps, index]);
        }
    };

    const goToNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getComplexityColor = () => {
        switch (complexity) {
            case 'high': return Colors.error;
            case 'medium': return Colors.warning;
            case 'low': return Colors.success;
            default: return Colors.textLight;
        }
    };

    const getComplexityLabel = () => {
        const labels = {
            high: { 'pt-BR': 'Alta', es: 'Alta', en: 'High' },
            medium: { 'pt-BR': 'Média', es: 'Media', en: 'Medium' },
            low: { 'pt-BR': 'Baixa', es: 'Baja', en: 'Low' },
        };
        return labels[complexity]?.[language] || complexity;
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <View style={[styles.container, style]}>
            {/* Header */}
            <View style={styles.header}>
                {title && <Text style={styles.title}>{title}</Text>}

                <View style={styles.metaRow}>
                    {duration && (
                        <View style={styles.metaItem}>
                            <NeoIcon name="Clock" size={16} color={Colors.textLight} />
                            <Text style={styles.metaText}>{duration}s</Text>
                        </View>
                    )}

                    <View style={styles.metaItem}>
                        <NeoIcon
                            name="Speedometer"
                            size={16}
                            color={getComplexityColor()}
                        />
                        <Text style={[styles.metaText, { color: getComplexityColor() }]}>
                            {getComplexityLabel()}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <Animated.View
                        style={[
                            styles.progressFill,
                            { width: `${progress}%` }
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {currentStep + 1} / {steps.length}
                </Text>
            </View>

            {/* Current step - Large view */}
            <View style={styles.currentStepContainer}>
                <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{currentStep + 1}</Text>
                </View>
                <Text style={styles.currentStepText}>
                    {steps[currentStep]}
                </Text>
            </View>

            {/* Navigation */}
            <View style={styles.navigation}>
                <TouchableOpacity
                    style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
                    onPress={goToPrevStep}
                    disabled={currentStep === 0}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color={currentStep === 0 ? Colors.textLight : Colors.primary} />
                    <Text style={[styles.navButtonText, currentStep === 0 && styles.navButtonTextDisabled]}>
                        Anterior
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navButton, currentStep === steps.length - 1 && styles.navButtonDisabled]}
                    onPress={goToNextStep}
                    disabled={currentStep === steps.length - 1}
                >
                    <Text style={[styles.navButtonText, currentStep === steps.length - 1 && styles.navButtonTextDisabled]}>
                        Próximo
                    </Text>
                    <NeoIcon name="ArrowRight2" size={24} color={currentStep === steps.length - 1 ? Colors.textLight : Colors.primary} />
                </TouchableOpacity>
            </View>

            {/* All steps list */}
            <ScrollView style={styles.stepsList} showsVerticalScrollIndicator={false}>
                <Text style={styles.allStepsTitle}>
                    {language === 'pt-BR' ? 'Todos os passos:' :
                        language === 'es' ? 'Todos los pasos:' :
                            'All steps:'}
                </Text>

                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    const isCurrent = index === currentStep;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.stepItem,
                                isCurrent && styles.stepItemCurrent,
                                isCompleted && styles.stepItemCompleted,
                            ]}
                            onPress={() => {
                                setCurrentStep(index);
                                toggleStepComplete(index);
                            }}
                        >
                            <View style={[
                                styles.stepCheckbox,
                                isCompleted && styles.stepCheckboxCompleted,
                            ]}>
                                {isCompleted ? (
                                    <NeoIcon name="TickSquare" size={16} color="#FFF" />
                                ) : (
                                    <Text style={styles.stepIndexText}>{index + 1}</Text>
                                )}
                            </View>

                            <Text style={[
                                styles.stepText,
                                isCompleted && styles.stepTextCompleted,
                            ]}>
                                {step}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        color: Colors.textLight,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    progressBar: {
        flex: 1,
        height: 6,
        backgroundColor: Colors.border,
        borderRadius: 3,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
        minWidth: 50,
        textAlign: 'right',
    },
    currentStepContainer: {
        backgroundColor: Colors.primaryLight,
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    stepNumberBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    currentStepText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: Colors.text,
        lineHeight: 26,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        gap: 4,
    },
    navButtonDisabled: {
        opacity: 0.5,
    },
    navButtonText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '500',
    },
    navButtonTextDisabled: {
        color: Colors.textLight,
    },
    stepsList: {
        maxHeight: 250,
    },
    allStepsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textLight,
        marginBottom: 12,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 8,
        gap: 12,
    },
    stepItemCurrent: {
        backgroundColor: Colors.primaryLight + '40',
    },
    stepItemCompleted: {
        opacity: 0.8,
    },
    stepCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCheckboxCompleted: {
        backgroundColor: Colors.success,
        borderColor: Colors.success,
    },
    stepIndexText: {
        fontSize: 12,
        color: Colors.textLight,
        fontWeight: '600',
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        color: Colors.text,
        lineHeight: 22,
    },
    stepTextCompleted: {
        textDecorationLine: 'line-through',
        color: Colors.textLight,
    },
});
