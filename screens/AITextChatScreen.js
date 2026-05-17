import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList,
    ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import AppBackground from '../components/AppBackground';
import { H1, Body, Small, Caption } from '../components/NeoTypography';
import OpenAIService from '../services/OpenAIService';
import { DS as Neo } from '../utils/DesignSystem2026';

const ACCENT = '#0EA5E9'; // sky — combina com card "Por texto" das Ferramentas

export default function AITextChatScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const listRef = useRef(null);
    const historyRef = useRef([]);

    const handleSend = async () => {
        const text = inputText.trim();
        if (!text || loading) return;

        const userMsg = { id: Date.now().toString(), role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setLoading(true);

        try {
            historyRef.current.push({ role: 'user', content: text });
            const response = await OpenAIService.sendMessage(text, historyRef.current.slice(-10, -1));
            historyRef.current.push({ role: 'assistant', content: response });

            const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', text: response };
            setMessages(prev => [...prev, aiMsg]);
            setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
        } catch (e) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                role: 'assistant',
                text: t('chat.errorConnection', 'Erro de conexão. Tente novamente.'),
            }]);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        const isUser = item.role === 'user';
        return (
            <View style={[s.row, isUser ? s.rowUser : s.rowAi]}>
                {!isUser && (
                    <View style={s.avatar}>
                        <NeoIcon name="Bubble" size={16} color={ACCENT} variant="Bold" />
                    </View>
                )}
                <View style={[s.bubble, isUser ? s.bubbleUser : s.bubbleAi]}>
                    <Text style={[s.bubbleText, isUser ? s.bubbleTextUser : s.bubbleTextAi]}>
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {/* HEADER consistente */}
                    <View style={s.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={s.backBtn}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <H1 style={s.title}>
                                {t('chat.headerTitle', 'Conversa')}
                            </H1>
                            <Caption style={s.subtitle}>
                                {t('chat.headerSubtitle', 'Tire dúvidas sobre prevenção')}
                            </Caption>
                        </View>
                    </View>

                    {/* MENSAGENS */}
                    <FlatList
                        ref={listRef}
                        style={{ flex: 1 }}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={s.listContent}
                        keyboardShouldPersistTaps="handled"
                        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
                        ListEmptyComponent={
                            <View style={s.empty}>
                                <View style={s.emptyIconCircle}>
                                    <NeoIcon name="Bubble" size={36} color={ACCENT} variant="Bold" />
                                </View>
                                <H1 style={s.emptyTitle}>
                                    {t('chat.emptyTitle', 'Olá! Como posso ajudar?')}
                                </H1>
                                <Body style={s.emptyDesc}>
                                    {t('chat.emptyDesc', 'Tire dúvidas sobre segurança doméstica, prevenção de acidentes e primeiros socorros.')}
                                </Body>
                            </View>
                        }
                    />

                    {loading && (
                        <View style={s.typing}>
                            <ActivityIndicator size="small" color={ACCENT} />
                            <Small style={s.typingText}>
                                {t('chat.typing', 'Respondendo…')}
                            </Small>
                        </View>
                    )}

                    {/* INPUT BAR */}
                    <View style={s.inputWrap}>
                        <View style={s.inputRow}>
                            <TextInput
                                style={s.input}
                                placeholder={t('chat.inputPlaceholder', 'Digite sua mensagem…')}
                                placeholderTextColor={Neo.colors.neutral[500]}
                                value={inputText}
                                onChangeText={setInputText}
                                onSubmitEditing={handleSend}
                                returnKeyType="send"
                                editable={!loading}
                                multiline={false}
                            />
                            <TouchableOpacity
                                style={[s.sendBtn, (!inputText.trim() || loading) && s.sendDisabled]}
                                onPress={handleSend}
                                disabled={!inputText.trim() || loading}
                            >
                                <NeoIcon name="Send2" size={18} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
        fontSize: 24,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    // List
    listContent: {
        padding: Neo.spacing.lg,
        flexGrow: 1,
        paddingBottom: 20,
    },

    // Empty state
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingHorizontal: 32,
    },
    emptyIconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(14,165,233,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyDesc: {
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 300,
    },

    // Chat rows
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    rowUser: { justifyContent: 'flex-end' },
    rowAi: { justifyContent: 'flex-start' },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(14,165,233,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    bubble: {
        maxWidth: '78%',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 18,
    },
    bubbleUser: {
        backgroundColor: ACCENT,
        borderBottomRightRadius: 4,
    },
    bubbleAi: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    bubbleText: {
        fontSize: 15,
        lineHeight: 21,
    },
    bubbleTextUser: { color: '#FFF' },
    bubbleTextAi: { color: Neo.colors.neutral[900] },

    // Typing indicator
    typing: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: 6,
        gap: 8,
    },
    typingText: {
        color: Neo.colors.neutral[500],
        fontSize: 12.5,
    },

    // Input bar
    inputWrap: {
        // Espaço para o GlobalFloatingFooter / SOS quando o teclado NÃO está aberto
        paddingBottom: Platform.OS === 'android' ? 130 : 110,
        backgroundColor: 'transparent',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: 10,
        gap: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: Neo.colors.neutral[900],
        fontSize: 15,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
        minHeight: 44,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: ACCENT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendDisabled: { opacity: 0.35 },
});
