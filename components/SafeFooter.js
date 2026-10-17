
import { tx } from '../utils/txFixo';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NeoIcon from './NeoIcon';
export default function SafeFooter({ navigation }) {
    // Função helper para navegar na Tab
    const navigateTab = (tabName, screenName) => {
        // Se estivermos dentro da Tab Home e quisermos ir para a Home Screen:
        if (tabName === 'HomeTab') {
            navigation.popToTop(); // Volta para o Dashboard
            navigation.navigate('MainTabs', { screen: 'HomeTab' });
        } else {
            navigation.navigate(tabName, screenName ? { screen: screenName } : undefined);
        }
    };

    return (
        <View style={styles.container}>
            {/* Início */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigateTab('HomeTab')}>
                <NeoIcon name="Home2" size={24} color="#666" />
                <Text style={styles.label}>{tx('telas.SafeFooter.inicio', 'Início')}</Text>
            </TouchableOpacity>

            {/* Opções */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigateTab('MenuTab')}>
                <NeoIcon name="Setting2" size={24} color="#666" />
                <Text style={styles.label}>{tx('telas.SafeFooter.opcoes', 'Opções')}</Text>
            </TouchableOpacity>

            {/* ESPAÇO VAZIO CENTRAL (Onde estaria o SOS) */}
            <View style={{ width: 60 }} />

            {/* Voz */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigateTab('AssistenteIA')}>
                <NeoIcon name="Microphone2" size={24} color="#666" />
                <Text style={styles.label}>{tx('telas.SafeFooter.voz', 'Voz')}</Text>
            </TouchableOpacity>

            {/* Scanner */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Scanner')}>
                <NeoIcon name="Camera" size={24} color="#666" />
                <Text style={styles.label}>{tx('telas.SafeFooter.scanner', 'Scanner')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        height: 70,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    label: {
        fontSize: 10,
        color: "#666",
        marginTop: 4,
        fontWeight: '500'
    }
});
