// components/NetworkMonitor.js
// [MIG-AV-03] expo-av removido — Audio estava comentado, apenas Vibration era usado

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity, Vibration } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NeoIcon from './NeoIcon';

export default function NetworkMonitor() {
    const [isConnected, setIsConnected] = useState(true);
    const [type, setType] = useState(null);
    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        NetInfo.fetch().then(state => handleNetworkChange(state));
        const unsubscribe = NetInfo.addEventListener(handleNetworkChange);
        return () => unsubscribe();
    }, []);

    const handleNetworkChange = (state) => {
        const online = state.isConnected && state.isInternetReachable !== false;
        setIsConnected(online);
        setType(state.type);

        if (!online) {
            playSound('offline');
            showToast();
        } else {
            playSound('online');
            showToast();
            setTimeout(hideToast, 4000);
        }
    };

    const playSound = (mode) => {
        try {
            if (mode === 'offline') {
                Vibration.vibrate([0, 500, 200, 500]);
            } else {
                Vibration.vibrate(200);
            }
        } catch (error) {
            console.log('Error playing sound', error);
        }
    };

    const getConnectionLabel = () => {
        if (!isConnected) return 'Sem Conexão';
        if (type === 'wifi') return 'Wi-Fi Conectado';
        if (type === 'cellular') return 'Dados Móveis (4G/5G)';
        return 'Conectado';
    };

    const showToast = () => {
        Animated.timing(slideAnim, {
            toValue: Platform.OS === 'ios' ? 60 : 30,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hideToast = () => {
        Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const toggleConnection = () => {
        const newState = !isConnected;
        setIsConnected(newState);
        if (!newState) {
            playSound('offline');
            showToast();
        } else {
            playSound('online');
            showToast();
            setTimeout(hideToast, 4000);
        }
    };

    if (isConnected && slideAnim._value === -100) {
        return (
            <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: 0, width: 50, height: 50, zIndex: 9999 }}
                onPress={toggleConnection}
                onLongPress={() => alert('Network Monitor Test Trigger')}
            />
        );
    }

    return (
        <Animated.View style={[
            styles.toast,
            { transform: [{ translateY: slideAnim }] },
            isConnected ? styles.online : styles.offline
        ]}>
            <TouchableOpacity onPress={toggleConnection}>
                <NeoIcon
                    name={isConnected ? (type === 'wifi' ? 'wifi' : 'cellular') : 'cloud-offline'}
                    size={24}
                    color="#FFF"
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{getConnectionLabel()}</Text>
                <Text style={styles.subtitle}>
                    {isConnected
                        ? `Monitoramento ativo: ${type === 'wifi' ? 'Rede Segura' : 'Consumo de dados'}`
                        : 'Verifique sua internet. O app pode estar limitado.'}
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        zIndex: 9999,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    online:  { backgroundColor: '#4CAF50' },
    offline: { backgroundColor: '#F44336' },
    textContainer: { marginLeft: 12, flex: 1 },
    title:    { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    subtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 2 },
});