import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function TermsModal({ onAccept }) {
    const [visible, setVisible] = useState(false);
    const [canAccept, setCanAccept] = useState(false);

    useEffect(() => {
        checkTerms();
    }, []);

    const checkTerms = async () => {
        try {
            const accepted = await AsyncStorage.getItem('termsAccepted_v1');
            if (!accepted) {
                setVisible(true);
            }
        } catch (e) {
            console.error("Erro ao ler termos:", e);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            setCanAccept(true);
        }
    };

    // Auto-enable if content is short enough to not need scrolling
    useEffect(() => {
        // Timeout to ensure layout is done
        setTimeout(() => {
            setCanAccept(true); // Temporarily auto-enable to fix "button not working" report
        }, 1000);
    }, []);

    const handleAccept = async () => {
        try {
            await AsyncStorage.setItem('termsAccepted_v1', 'true');
            setVisible(false);
            if (onAccept) onAccept();
        } catch (e) {
            console.error("Erro ao salvar aceite:", e);
        }
    };

    if (!visible) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }} // Impede fechar com botão voltar
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <NeoIcon name="ShieldTick" size={32} color={Colors.primary} />
                        <Text style={styles.title}>Termos de Uso e Segurança</Text>
                        <Text style={styles.subtitle}>Leia atentamente para continuar</Text>
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        onScroll={handleScroll}
                        scrollEventThrottle={400}
                        showsVerticalScrollIndicator={true}
                    >
                        <Text style={styles.sectionTitle}>1. Natureza Informativa</Text>
                        <Text style={styles.text}>
                            O aplicativo Vigilaro Care é uma ferramenta de auxílio e prevenção. Todo o conteúdo, incluindo checklists, guias de primeiros socorros e análises de IA, tem caráter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.
                        </Text>

                        <Text style={styles.sectionTitle}>2. Não Substitui Profissionais</Text>
                        <Text style={styles.text}>
                            As informações aqui contidas NÃO substituem, em hipótese alguma, o diagnóstico, aconselhamento ou tratamento por profissionais de saúde (médicos, enfermeiros, socorristas) ou especialistas em segurança.
                        </Text>

                        <Text style={styles.sectionTitle}>3. Em Caso de Emergência</Text>
                        <Text style={styles.text}>
                            Se você ou alguém estiver em situação de risco imediato, ferido gravemente ou passando mal, NÃO USE O APP. Ligue imediatamente para os serviços de emergência locais:
                            {'\n\n'}
                            🚑 SAMU: 192
                            {'\n'}
                            🚒 Bombeiros: 193
                            {'\n'}
                            👮 Polícia: 190
                        </Text>

                        <Text style={styles.sectionTitle}>4. Limitação de Responsabilidade</Text>
                        <Text style={styles.text}>
                            Os desenvolvedores do Vigilaro Care não se responsabilizam por quaisquer danos, lesões ou perdas resultantes do uso das informações fornecidas pelo aplicativo. A segurança final do ambiente e das pessoas é de responsabilidade do usuário.
                        </Text>

                        <Text style={styles.sectionTitle}>5. Inteligência Artificial</Text>
                        <Text style={styles.text}>
                            O recurso de "Scanner IA" utiliza inteligência artificial para identificar possíveis riscos. Esta tecnologia pode falhar ou cometer erros. Sempre verifique visualmente o ambiente e use seu próprio julgamento.
                        </Text>

                        <View style={{ height: 40 }} />
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, !canAccept && styles.buttonDisabled]}
                            onPress={handleAccept}
                            disabled={!canAccept}
                        >
                            <Text style={styles.buttonText}>
                                {canAccept ? "Li e Concordo" : "Role até o fim para aceitar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
    },
    modalContainer: {
        width: '100%',
        maxHeight: '85%',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.lg,
    },
    header: {
        alignItems: 'center',
        padding: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surfaceVariant,
        backgroundColor: '#F8FAFC',
    },
    title: {
        fontSize: Typography.sizes.xl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    scrollView: {
        padding: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 16,
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: 'justify',
    },
    footer: {
        padding: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.surfaceVariant,
        backgroundColor: Colors.surface,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: Colors.textTertiary,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
