/**
 * EmptyState.js
 * Pilar 1: Utilidade Máxima - Estados Vazios Inteligentes
 * Mostra conteúdo útil quando não há dados, com CTAs para ação
 * 
 * Usage:
 * <EmptyState 
 *   type="profiles" 
 *   onAction={() => navigation.navigate('AddPerfil')} 
 * />
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';

const EMPTY_STATES = {
    profiles: {
        icon: 'people-outline',
        title: 'Nenhum perfil cadastrado',
        message: 'Cadastre os membros da sua família para receber orientações personalizadas de segurança.',
        actionLabel: 'Criar Primeiro Perfil',
        color: Colors.primary,
    },
    checklists: {
        icon: 'checkbox-outline',
        title: 'Nenhum checklist realizado',
        message: 'Complete checklists de segurança para identificar riscos e melhorar a proteção da sua casa.',
        actionLabel: 'Iniciar Checklist',
        color: Colors.success || '#4CAF50',
    },
    contacts: {
        icon: 'call-outline',
        title: 'Nenhum contato de emergência',
        message: 'Adicione contatos de emergência para acesso rápido em situações críticas.',
        actionLabel: 'Adicionar Contato',
        color: Colors.error || '#F44336',
    },
    medications: {
        icon: 'medical-outline',
        title: 'Nenhuma medicação cadastrada',
        message: 'Cadastre medicações para lembretes e histórico de uso.',
        actionLabel: 'Adicionar Medicação',
        color: Colors.warning || '#FF9800',
    },
    history: {
        icon: 'time-outline',
        title: 'Histórico vazio',
        message: 'Suas atividades e conquistas aparecerão aqui conforme você usa o app.',
        actionLabel: null,
        color: Colors.textSecondary,
    },
    search: {
        icon: 'search-outline',
        title: 'Nenhum resultado encontrado',
        message: 'Tente buscar com outras palavras-chave.',
        actionLabel: 'Limpar Busca',
        color: Colors.textSecondary,
    },
    notifications: {
        icon: 'notifications-off-outline',
        title: 'Sem notificações',
        message: 'Você está em dia! Novas notificações aparecerão aqui.',
        actionLabel: null,
        color: Colors.textSecondary,
    },
    generic: {
        icon: 'folder-open-outline',
        title: 'Nada aqui ainda',
        message: 'Comece a usar esta funcionalidade para ver conteúdo.',
        actionLabel: null,
        color: Colors.textSecondary,
    },
};

export default function EmptyState({
    type = 'generic',
    onAction,
    customTitle,
    customMessage,
    customIcon,
    customActionLabel,
}) {
    const config = EMPTY_STATES[type] || EMPTY_STATES.generic;

    const icon = customIcon || config.icon;
    const title = customTitle || config.title;
    const message = customMessage || config.message;
    const actionLabel = customActionLabel || config.actionLabel;
    const color = config.color;

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                <NeoIcon name={icon} size={48} color={color} />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            {actionLabel && onAction && (
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: color }]}
                    onPress={onAction}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionLabel}>{actionLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
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
        maxWidth: 280,
        marginBottom: Spacing.lg,
    },
    actionButton: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.md,
        ...Shadows.sm,
    },
    actionLabel: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: Typography.md?.fontSize || 14,
    },
});
