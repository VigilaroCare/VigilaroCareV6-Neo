import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import OpenAIService from '../services/OpenAIService';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';

export default function AITextChatScreen({ navigation }) {
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
                text: '⚠️ Erro de conexão. Tente novamente.',
            }]);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.row, item.role === 'user' ? styles.rowUser : styles.rowAi]}>
            {item.role === 'assistant' && (
                <View style={styles.avatar}>
                    <Text style={{ fontSize: 14 }}>🛡️</Text>
                </View>
            )}
            <View style={[styles.bubble, item.role === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
                <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <AppBackground variant="subtle">
        <SafeAreaView style={styles.safe} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <NeoIcon name="ArrowLeft2" size={22} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('headersFirst.vigilaroAIChat', 'Vigilaro AI — Chat')}</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Mensagens - Flex 1 ocupa o espaço do meio */}
                <FlatList
                    ref={listRef}
                    style={styles.list}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                    onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.emptyIcon}>
                                <NeoIcon name="Message" size={36} color="#FFF" />
                            </LinearGradient>
                            <Text style={styles.emptyTitle}>{t('headersFirst.olComoPossoAjudar', 'Olá! Como posso ajudar?')}</Text>
                            <Text style={styles.emptySub}>
                                {t('headersFirst.tireDVidasSobreSeguranADomSticaPrevenODe', 'Tire dúvidas sobre segurança doméstica, prevenção de acidentes e primeiros socorros.')}
                            </Text>
                        </View>
                    }
                />

                {loading && (
                    <View style={styles.typing}>
                        <ActivityIndicator size="small" color="#8E2DE2" />
                        <Text style={styles.typingText}>{t('headersFirst.respondendo', 'Respondendo...')}</Text>
                    </View>
                )}

                {/* InputBar fixo no fundo da View Flex */}
                <View style={styles.inputWrapper}>
                    <View style={styles.inputBar}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua mensagem..."
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            editable={!loading}
                            multiline={false}
                        />
                        <TouchableOpacity
                            style={[styles.sendBtn, (!inputText.trim() || loading) && styles.sendDisabled]}
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

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#1A1A2E',
    },
    keyboardAvoid: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.07)',
        backgroundColor: '#1A1A2E',
    },
    backBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        flexGrow: 1,
        paddingBottom: 20,
    },
    empty: {
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 32,
    },
    emptyIcon: {
        width: 70, height: 70, borderRadius: 35,
        alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    },
    emptyTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 8 },
    emptySub: { color: 'rgba(255,255,255,0.4)', fontSize: 14, textAlign: 'center', lineHeight: 20 },
    row: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
    rowUser: { justifyContent: 'flex-end' },
    rowAi: { justifyContent: 'flex-start' },
    avatar: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: 'rgba(142,45,226,0.25)',
        alignItems: 'center', justifyContent: 'center', marginRight: 8,
    },
    bubble: {
        maxWidth: '80%', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 18,
    },
    bubbleUser: { backgroundColor: '#6C3AED', borderBottomRightRadius: 4 },
    bubbleAi: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderBottomLeftRadius: 4,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    },
    bubbleText: { color: '#FFF', fontSize: 15, lineHeight: 22 },
    typing: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    typingText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginLeft: 8 },

    // Input fixo básico
    inputWrapper: {
        // Compensação para área da Tab Bar flutuante quando o teclado NÃO está aberto
        paddingBottom: Platform.OS === 'android' ? 120 : 100,
        backgroundColor: '#1A1A2E',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#1A1A2E',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.07)',
    },
    input: {
        flex: 1,
        backgroundColor: '#2D2D44',
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#FFF',
        fontSize: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        minHeight: 44,
    },
    sendBtn: {
        marginLeft: 10, width: 44, height: 44, borderRadius: 22,
        backgroundColor: '#6C3AED', alignItems: 'center', justifyContent: 'center',
    },
    sendDisabled: { opacity: 0.35 },
});
