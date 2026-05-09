import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Alert,
    Easing,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import OpenAIService from '../services/OpenAIService';
import VoiceService from '../services/VoiceService';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';

export default function ChatScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const isTextMode = route.params?.showKeyboard || false;

    const [status, setStatus] = useState('idle');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    // Animações (só para modo voz)
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isTextMode && route.params?.autoStart) {
            setTimeout(() => handleMicPress(), 600);
        }
        return () => {
            VoiceService.stopRecording();
            VoiceService.stopSpeaking();
        };
    }, []);

    // Animação do orb (modo voz)
    useEffect(() => {
        if (isTextMode) return;
        if (status === 'listening' || status === 'speaking') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
                    Animated.timing(pulseAnim, { toValue: 1.0, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
                ])
            ).start();
        } else if (status === 'processing') {
            Animated.loop(
                Animated.timing(rotateAnim, { toValue: 1, duration: 2000, useNativeDriver: true, easing: Easing.linear })
            ).start();
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.1, duration: 400, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 0.9, duration: 400, useNativeDriver: true })
                ])
            ).start();
        } else {
            Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
            rotateAnim.setValue(0);
        }
    }, [status]);

    const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    // ─── ENVIAR MENSAGEM ────────────────────────────────
    const handleSend = async (textOverride = null) => {
        const textToSend = typeof textOverride === 'string' ? textOverride : inputText;
        if (!textToSend.trim()) return;

        const userMsg = { id: Date.now().toString(), role: 'user', content: textToSend.trim() };
        setMessages(prev => [...prev, userMsg]);
        setStatus('processing');
        setInputText('');

        try {
            const history = messages.slice(-6).map(m => ({ role: m.role, content: m.content }));
            const response = await OpenAIService.sendMessage(textToSend.trim(), history);

            const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
            setMessages(prev => [...prev, aiMsg]);
            setStatus('speaking');

            // TTS — falar a resposta
            try {
                await VoiceService.playAudio(await OpenAIService.generateSpeech(response));
            } catch (e) {
                // TTS falhou, sem problema — texto já está na tela
            }

            if (!isTextMode && route.params?.autoStart) {
                setStatus('listening');
                setTimeout(() => handleMicPress(), 300);
            } else {
                setStatus('idle');
            }
        } catch (error) {
            console.error(error);
            const errMsg = { id: (Date.now() + 2).toString(), role: 'assistant', content: '⚠️ Erro de conexão. Tente novamente.' };
            setMessages(prev => [...prev, errMsg]);
            setStatus('idle');
        }
    };

    // ─── MICROFONE (modo voz) ────────────────────────────
    const handleMicPress = async () => {
        if (status === 'listening') {
            setStatus('processing');
            try {
                const uri = await VoiceService.stopRecording();
                if (uri) {
                    const text = await OpenAIService.transcribeAudio(uri);
                    if (text) {
                        handleSend(text);
                    } else {
                        Alert.alert("Não entendi", "Tente falar novamente.");
                        setStatus('idle');
                    }
                } else {
                    setStatus('idle');
                }
            } catch (error) {
                setStatus('idle');
            }
        } else {
            try {
                const started = await VoiceService.startRecording();
                if (started) setStatus('listening');
            } catch (e) {
                Alert.alert("Erro", "Microfone indisponível");
            }
        }
    };

    const getOrbColor = () => {
        switch (status) {
            case 'listening': return ['#4facfe', '#00f2fe'];
            case 'processing': return ['#8E2DE2', '#4A00E0'];
            case 'speaking': return ['#43e97b', '#38f9d7'];
            default: return ['#a18cd1', '#fbc2eb'];
        }
    };

    const getIcon = () => {
        switch (status) {
            case 'listening': return 'microphone';
            case 'processing': return 'loading';
            case 'speaking': return 'volume-high';
            default: return 'microphone-outline';
        }
    };

    // ─── RENDER MENSAGEM (modo texto) ────────────────────
    const renderMessage = ({ item }) => (
        <View style={[styles.msgRow, item.role === 'user' ? styles.msgRowUser : styles.msgRowAi]}>
            <View style={[styles.msgBubble, item.role === 'user' ? styles.msgUser : styles.msgAi]}>
                <Text style={[styles.msgText, item.role === 'user' && styles.msgTextUser]}>
                    {item.content}
                </Text>
            </View>
        </View>
    );

    // ═══════════════════════════════════════════════════════
    // MODO TEXTO — Chat puro sem microfone
    // ═══════════════════════════════════════════════════════
    if (isTextMode) {
        return (
            <AppBackground variant="subtle">
        <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>{t('headersFirst.vigilaroAI', 'Vigilaro AI')}</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Lista de mensagens */}
                <FlatList
                    ref={flatListRef}
                    style={{ flex: 1 }}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.chatList}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    ListEmptyComponent={
                        <View style={styles.emptyChat}>
                            <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.emptyIcon}>
                                <NeoIcon name="Message" size={40} color="#FFF" />
                            </LinearGradient>
                            <Text style={styles.emptyTitle}>{t('headersFirst.vigilaroAI', 'Vigilaro AI')}</Text>
                            <Text style={styles.emptySub}>
                                {t('headersFirst.tireDVidasSobreSeguranADomSticaPrevenODe', 'Tire dúvidas sobre segurança doméstica, prevenção de acidentes e primeiros socorros.')}
                            </Text>
                        </View>
                    }
                />

                {/* Indicador de processamento */}
                {status === 'processing' && (
                    <View style={styles.typingIndicator}>
                        <ActivityIndicator size="small" color="#8E2DE2" />
                        <Text style={styles.typingText}>{t('headersFirst.vigilaroEstPensando', 'Vigilaro está pensando...')}</Text>
                    </View>
                )}

                {/* Input de texto — sempre visível */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
                    style={styles.textInputBar}
                >
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Digite sua dúvida..."
                            placeholderTextColor="rgba(255,255,255,0.35)"
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={() => handleSend()}
                            returnKeyType="send"
                            multiline={false}
                            editable={status !== 'processing'}
                        />
                        <TouchableOpacity
                            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
                            onPress={() => handleSend()}
                            disabled={!inputText.trim() || status === 'processing'}
                        >
                            <NeoIcon name="Send2" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
      </AppBackground>
        );
    }

    // ═══════════════════════════════════════════════════════
    // MODO VOZ — Orb com microfone (original)
    // ═══════════════════════════════════════════════════════
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <NeoIcon name="CloseSquare" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('headersFirst.vIGILAROAI', 'VIGILARO AI')}</Text>
                <View style={{ width: 44 }} />
            </View>

            {/* ORB CENTRAL */}
            <View style={styles.orbContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleMicPress}
                    disabled={status === 'processing' || status === 'speaking'}
                >
                    <Animated.View style={[
                        styles.orbPulse,
                        {
                            transform: [
                                { scale: pulseAnim },
                                { rotate: status === 'processing' ? spin : '0deg' }
                            ]
                        }
                    ]}>
                        <LinearGradient
                            colors={getOrbColor()}
                            style={styles.orbCore}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {status === 'processing' ? (
                                <NeoIcon name="RotateRight" size={60} color="#FFF" />
                            ) : (
                                <NeoIcon name={getIcon()} size={60} color="#FFF" />
                            )}
                        </LinearGradient>
                    </Animated.View>
                </TouchableOpacity>

                <Text style={styles.statusText}>
                    {status === 'listening' ? 'Ouvindo... fale agora' :
                        status === 'processing' ? 'Processando...' :
                            status === 'speaking' ? 'Respondendo...' : '⬆ Toque no círculo para falar'}
                </Text>
            </View>

            {/* Última resposta */}
            {messages.length > 0 && (
                <View style={styles.captionContainer}>
                    <Text style={styles.captionText} numberOfLines={4}>
                        {messages[messages.length - 1].content}
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A2E',
    },
    // ─── HEADER ──────────────────────────
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    headerTitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    headerTitleText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },

    // ─── MODO TEXTO: CHAT ────────────────
    chatList: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        flexGrow: 1,
    },
    emptyChat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        paddingHorizontal: 40,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
    },
    emptySub: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    msgRow: {
        marginBottom: 12,
        flexDirection: 'row',
    },
    msgRowUser: {
        justifyContent: 'flex-end',
    },
    msgRowAi: {
        justifyContent: 'flex-start',
    },
    msgBubble: {
        maxWidth: '82%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 18,
    },
    msgUser: {
        backgroundColor: '#6C3AED',
        borderBottomRightRadius: 4,
    },
    msgAi: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
    },
    msgText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 15,
        lineHeight: 22,
    },
    msgTextUser: {
        color: '#FFF',
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    typingText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
        marginLeft: 8,
    },

    // ─── INPUT DE TEXTO ──────────────────
    textInputBar: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.06)',
    },
    inputRow: {
        flexDirection: 'row',
        backgroundColor: '#2D2D44',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    textInput: {
        flex: 1,
        color: '#FFF',
        paddingVertical: 12,
        fontSize: 16,
    },
    sendBtn: {
        backgroundColor: '#6C3AED',
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendBtnDisabled: {
        opacity: 0.35,
    },

    // ─── MODO VOZ: ORB ───────────────────
    orbContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orbCore: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    statusText: {
        marginTop: 30,
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
        letterSpacing: 1,
    },
    captionContainer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        minHeight: 100,
    },
    captionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4facfe',
        fontWeight: '500',
        lineHeight: 24,
    },
});
