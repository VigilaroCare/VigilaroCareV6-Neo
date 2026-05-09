/**
 * ErrorState.js
 * Pilar 1: Utilidade Máxima - Mensagens de Erro Humanas
 * Pilar 3: Robustez - Tratamento de Estados Degradados
 * 
 * Transforma erros crípticos em mensagens acionáveis
 * 
 * Usage:
 * <ErrorState 
 *   type="network" 
 *   onRetry={() => fetchData()} 
 * />
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';

const ERROR_CONFIGS = {
    network: {
        icon: 'cloud-offline-outline',
        title: 'Sem conexão',
        message: 'Não foi possível conectar aos nossos servidores. Verifique sua conexão com a internet e tente novamente.',
        retryLabel: 'Tentar Novamente',
        color: Colors.warning || '#FF9800',
    },
    server: {
        icon: 'server-outline',
        title: 'Servidor indisponível',
        message: 'Nossos servidores estão temporariamente fora do ar. Por favor, aguarde alguns minutos e tente novamente.',
        retryLabel: 'Tentar Novamente',
        color: Colors.error || '#F44336',
    },
    timeout: {
        icon: 'time-outline',
        title: 'Tempo esgotado',
        message: 'A operação demorou mais que o esperado. Isso pode acontecer em conexões lentas. Tente novamente.',
        retryLabel: 'Tentar Novamente',
        color: Colors.warning || '#FF9800',
    },
    permission: {
        icon: 'lock-closed-outline',
        title: 'Permissão necessária',
        message: 'Para usar esta funcionalidade, precisamos de sua permissão. Acesse as configurações do app para concedê-la.',
        retryLabel: 'Abrir Configurações',
        color: Colors.primary,
    },
    storage: {
        icon: 'folder-outline',
        title: 'Erro ao salvar dados',
        message: 'Não foi possível salvar suas informações. Verifique se há espaço disponível no dispositivo.',
        retryLabel: 'Tentar Novamente',
        color: Colors.error || '#F44336',
    },
    camera: {
        icon: 'camera-outline',
        title: 'Câmera indisponível',
        message: 'Não conseguimos acessar a câmera. Verifique as permissões nas configurações do dispositivo.',
        retryLabel: 'Tentar Novamente',
        color: Colors.warning || '#FF9800',
    },
    location: {
        icon: 'location-outline',
        title: 'Localização indisponível',
        message: 'Não conseguimos obter sua localização. Verifique se o GPS está ativado e as permissões concedidas.',
        retryLabel: 'Tentar Novamente',
        color: Colors.warning || '#FF9800',
    },
    ai: {
        icon: 'sparkles-outline',
        title: 'Assistente indisponível',
        message: 'O assistente de IA está temporariamente offline. Suas outras funcionalidades continuam funcionando normalmente.',
        retryLabel: 'Tentar Novamente',
        color: Colors.primary,
    },
    generic: {
        icon: 'alert-circle-outline',
        title: 'Algo deu errado',
        message: 'Ocorreu um erro inesperado. Por favor, tente novamente. Se o problema persistir, reinicie o aplicativo.',
        retryLabel: 'Tentar Novamente',
        color: Colors.error || '#F44336',
    },
    partial: {
        icon: 'warning-outline',
        title: 'Conteúdo parcial',
        message: 'Não foi possível carregar todo o conteúdo. Algumas informações podem estar incompletas.',
        retryLabel: 'Recarregar',
        color: Colors.warning || '#FF9800',
    },
};

export default function ErrorState({
    type = 'generic',
    onRetry,
    customTitle,
    customMessage,
    customIcon,
    showRetry = true,
    compact = false,
    errorDetails = null, // Para logging
}) {
    const config = ERROR_CONFIGS[type] || ERROR_CONFIGS.generic;

    const icon = customIcon || config.icon;
    const title = customTitle || config.title;
    const message = customMessage || config.message;
    const color = config.color;

    // Log error for debugging (only in dev)
    if (__DEV__ && errorDetails) {
        console.warn(`[ErrorState] Type: ${type}`, errorDetails);
    }

    if (compact) {
        return (
            <View style={styles.compactContainer}>
                <NeoIcon name={icon} size={20} color={color} />
                <Text style={styles.compactMessage} numberOfLines={1}>{title}</Text>
                {showRetry && onRetry && (
                    <TouchableOpacity onPress={onRetry}>
                        <Text style={[styles.compactRetry, { color }]}>Tentar</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                <NeoIcon name={icon} size={48} color={color} />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            {showRetry && onRetry && (
                <TouchableOpacity
                    style={[styles.retryButton, { backgroundColor: color }]}
                    onPress={onRetry}
                    activeOpacity={0.8}
                >
                    <NeoIcon name="Refresh" size={18} color="#FFF" />
                    <Text style={styles.retryLabel}>{config.retryLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// Helper function to determine error type from error object
export function getErrorType(error) {
    if (!error) return 'generic';

    const message = error.message?.toLowerCase() || '';
    const code = error.code?.toLowerCase() || '';

    if (message.includes('network') || message.includes('fetch') || code === 'network_error') {
        return 'network';
    }
    if (message.includes('timeout') || code === 'timeout') {
        return 'timeout';
    }
    if (message.includes('permission') || code.includes('permission')) {
        return 'permission';
    }
    if (error.status >= 500 || message.includes('server')) {
        return 'server';
    }
    if (message.includes('storage') || message.includes('quota')) {
        return 'storage';
    }
    if (message.includes('camera')) {
        return 'camera';
    }
    if (message.includes('location') || message.includes('gps')) {
        return 'location';
    }

    return 'generic';
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
        minHeight: 300,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: Typography.lg?.fontSize || 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    message: {
        fontSize: Typography.md?.fontSize || 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 300,
        marginBottom: Spacing.lg,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.md,
        gap: 8,
        ...Shadows.sm,
    },
    retryLabel: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: Typography.md?.fontSize || 14,
    },

    // Compact styles (for inline errors)
    compactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        backgroundColor: Colors.surfaceVariant || '#F5F5F5',
        borderRadius: BorderRadius.sm,
        gap: 8,
    },
    compactMessage: {
        flex: 1,
        fontSize: 13,
        color: Colors.textSecondary,
    },
    compactRetry: {
        fontWeight: 'bold',
        fontSize: 13,
    },
});
