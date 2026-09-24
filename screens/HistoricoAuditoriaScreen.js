import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '../utils/Theme';
import NeoIcon from '../components/NeoIcon';
export default function HistoricoAuditoriaScreen({ navigation }) {
    const { t } = useTranslation('common');
    // Dados mockados por enquanto para não quebrar
    const historico = [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>{t('headersFirst.histRicoDeAuditorias', 'Histórico de Auditorias')}</Text>
            </View>

            {historico.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <NeoIcon name="Clipboard" size={64} color="#CCC" />
                    <Text style={styles.emptyText}>{t('headersFirst.nenhumaAuditoriaRegistradaRealizeAPrimei', 'Nenhuma auditoria registrada. Realize a primeira vistoria para criar o histórico de segurança desta residência.')}</Text>
                </View>
            ) : (
                <FlatList
                    data={historico}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Text>{item.date}</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent', padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20 },
    backBtn: { marginRight: 16 },
    title: { fontSize: 22, fontWeight: 'bold', color: Colors.textPrimary },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.7 },
    emptyText: { marginTop: 16, fontSize: 16, color: '#666' }
});
