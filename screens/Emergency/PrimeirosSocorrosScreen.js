import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../utils/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPrimeirosSocorros } from '../../data/primeiros_socorros';
import DisclaimerModal from '../../components/DisclaimerModal';

// ... imports mantidos
import { Modal, ScrollView as SimpleScroll } from 'react-native'; // Add Modal import

import { getEmergenciasPets } from '../../data/primeiros_socorros_pets';
import { useTranslation } from 'react-i18next';

export default function PrimeirosSocorrosScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [type, setType] = useState('HUMAN'); // 'HUMAN' | 'PET'

    const openDetail = (item) => setSelectedItem(item);
    const closeDetail = () => setSelectedItem(null);

    // Normalize Data
    const getData = () => {
        if (type === 'HUMAN') return getPrimeirosSocorros();

        // Map Pet Data to matched structure
        return getEmergenciasPets().map(pet => ({
            id: pet.id,
            emoji: null, // Use Icon instead
            icon: pet.icon, // Ionicons name
            titulo: pet.titulo,
            situacao: pet.descricao,
            isPet: true,
            // Pet data has 'passos', we map to 'oQueFazer' for simplicity in this view, 
            // or we handle it in the modal.
            rawPetData: pet
        }));
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => openDetail(item)}
            activeOpacity={0.8}
        >
            <View style={[styles.iconBox, item.isPet && { backgroundColor: '#E8F5E9' }]}>
                {item.emoji ? (
                    <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
                ) : (
                    <NeoIcon name={item.icon || 'paw'} size={32} color={item.isPet ? Colors.success : Colors.primary} />
                )}
            </View>
            <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.titulo}</Text>
                <Text style={styles.cardSituation} numberOfLines={2}>{item.situacao}</Text>
            </View>
            <View style={{ position: 'absolute', top: 12, right: 12 }}>
                <NeoIcon name="AddCircle" size={24} color={item.isPet ? Colors.success : Colors.primary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <AppBackground variant="subtle">
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <DisclaimerModal visible={showDisclaimer} onClose={() => setShowDisclaimer(false)} />

            {/* Header Neo Glass - Tactical Calm */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
                <NeoCard variant="glass"
                    style={{
                        width: '100%',
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        ...Neo.shadows?.sm
                    }}
                >
                    <View style={{
                        width: 48, height: 48, borderRadius: 12,
                        backgroundColor: type === 'HUMAN' ? '#FEE2E2' : '#D1FAE5', alignItems: 'center', justifyContent: 'center',
                        marginRight: 16
                    }}>
                        <Text style={{ fontSize: 24 }}>{type === 'HUMAN' ? '🚑' : '🐶'}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: type === 'HUMAN' ? '#EF4444' : '#10B981', fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{t('headersFirst.firstAid', 'Primeiros Socorros')}</Text>
                        <Text style={{ color: Neo.colors.neutral[600], fontSize: 13, fontWeight: '600' }}>{t('headersFirst.respostaRPidaEmEmergNcias', 'Resposta rápida em emergências')}</Text>
                    </View>
                </NeoCard>
            </View>

            {/* TABS TACTICAL CALM */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 20, padding: 4, width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => setType('HUMAN')}
                        style={{ flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 16, backgroundColor: type === 'HUMAN' ? '#FFF' : 'transparent', ... (type === 'HUMAN' ? Neo.shadows?.sm : {}) }}
                    >
                        <Text style={{ fontWeight: 'bold', color: type === 'HUMAN' ? '#EF4444' : Neo.colors.neutral[500] }}>{t('headersFirst.people', 'Pessoas')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setType('PET')}
                        style={{ flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 16, backgroundColor: type === 'PET' ? '#FFF' : 'transparent', ... (type === 'PET' ? Neo.shadows?.sm : {}) }}
                    >
                        <Text style={{ fontWeight: 'bold', color: type === 'PET' ? '#10B981' : Neo.colors.neutral[500] }}>{t('headersFirst.pets', 'Pets')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* BENTO GRID */}
            <FlatList
                data={getData()}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.gridContent}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }} // Expo SDK 49+
                showsVerticalScrollIndicator={false}
            />

            {/* DETAIL MODAL */}
            <Modal
                visible={!!selectedItem}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={closeDetail}
            >
                {selectedItem && (
                    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                        {/* Modal Header */}
                        <View style={[styles.modalHeader, { paddingTop: 20 }]}>
                            {selectedItem.emoji ? (
                                <Text style={styles.modalEmoji}>{selectedItem.emoji}</Text>
                            ) : (
                                <View style={{ marginRight: 16, backgroundColor: selectedItem.isPet ? '#E8F5E9' : '#FEE2E2', padding: 8, borderRadius: 25 }}>
                                    <NeoIcon name={selectedItem.icon || 'paw'} size={32} color={selectedItem.isPet ? Colors.success : Colors.primary} />
                                </View>
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.modalTitle}>{selectedItem.titulo}</Text>
                                <Text style={styles.modalSubtitle}>{selectedItem.situacao}</Text>
                            </View>
                            <TouchableOpacity onPress={closeDetail} style={styles.closeBtn}>
                                <NeoIcon name="CloseSquare" size={24} color={Colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <SimpleScroll contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
                            {/* PET CONTENT RENDERER */}
                            {selectedItem.isPet ? (
                                <>
                                    <View style={[styles.sectionContainer, { backgroundColor: '#F1F8E9' }]}>
                                        <View style={styles.sectionHeader}>
                                            <NeoIcon name="Lovely" size={24} color={Colors.success} />
                                            <Text style={[styles.sectionLabel, { color: Colors.success, fontSize: 16 }]}>{t('headersFirst.cOMOAGIR', 'COMO AGIR')}</Text>
                                        </View>
                                        {selectedItem.rawPetData.passos.map((step, index) => (
                                            <View key={index} style={styles.stepRow}>
                                                <Text style={[styles.stepNumber, { color: step.critico ? Colors.error : Colors.success }]}>{index + 1}.</Text>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.stepText, { fontWeight: 'bold' }]}>{step.titulo}</Text>
                                                    <Text style={styles.stepText}>{step.descricao}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                    <View style={styles.alertBox}>
                                        <View style={styles.alertHeader}>
                                            <NeoIcon name="Warning2" size={24} color="#FFF" />
                                            <Text style={[styles.alertTitle, { fontSize: 16 }]}>{t('headersFirst.aTENOVETERINRIA', 'ATENÇÃO VETERINÁRIA')}</Text>
                                        </View>
                                        {selectedItem.rawPetData.alertas.map((alerta, idx) => (
                                            <Text key={idx} style={[styles.alertText, { fontSize: 16, marginBottom: 4 }]}>• {alerta}</Text>
                                        ))}
                                    </View>
                                </>
                            ) : (
                                /* HUMAN CONTENT RENDERER */
                                <>
                                    {/* O QUE FAZER */}
                                    <View style={styles.sectionContainer}>
                                        <View style={styles.sectionHeader}>
                                            <NeoIcon name="TickCircle" size={24} color={Colors.success} />
                                            <Text style={[styles.sectionLabel, { color: Colors.success, fontSize: 16 }]}>{t('headersFirst.oQUEFAZER', 'O QUE FAZER')}</Text>
                                        </View>
                                        {selectedItem.oQueFazer && selectedItem.oQueFazer.map((step, index) => (
                                            <View key={index} style={styles.stepRow}>
                                                <Text style={styles.stepNumber}>{index + 1}.</Text>
                                                <Text style={styles.stepText}>{step}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* O QUE NÃO FAZER */}
                                    {selectedItem.oQueNaoFazer && (
                                        <View style={styles.sectionContainer}>
                                            <View style={styles.sectionHeader}>
                                                <NeoIcon name="CloseCircle" size={24} color={Colors.error} />
                                                <Text style={[styles.sectionLabel, { color: Colors.error, fontSize: 16 }]}>{t('headersFirst.oQUENOFAZER', 'O QUE NÃO FAZER')}</Text>
                                            </View>
                                            {selectedItem.oQueNaoFazer.map((step, index) => (
                                                <View key={index} style={styles.stepRow}>
                                                    <View style={styles.bulletError} />
                                                    <Text style={styles.stepText}>{step}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </>
                            )}

                            {/* CHAMAR AJUDA */}
                            <View style={styles.alertBox}>
                                <View style={styles.alertHeader}>
                                    <NeoIcon name="Health" size={24} color="#FFF" />
                                    <Text style={[styles.alertTitle, { fontSize: 16 }]}>{t('headersFirst.qUANDOCHAMARAJUDA', 'QUANDO CHAMAR AJUDA')}</Text>
                                </View>
                                <Text style={[styles.alertText, { fontSize: 16 }]}>{selectedItem.quandoChamarAjuda}</Text>
                            </View>
                        </SimpleScroll>
                    </View>
                )}
            </Modal>
        </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, ...Shadows.md },
    backBtn: { marginBottom: Spacing.md, width: 40, height: 40, justifyContent: 'center' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },

    gridContent: { padding: Spacing.lg, paddingBottom: 120 }, // Grid padding

    // Bento Card Styles
    bentoCard: {
        flex: 1, // Divide espaço
        aspectRatio: 1, // Quadrado
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12, // Gap vertical (horizontal handled by columnWrapper)
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...Shadows.sm,
    },
    iconBox: {
        width: 50, height: 50,
        borderRadius: 25,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 8
    },
    cardTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
    cardSituation: { fontSize: 12, color: Colors.textSecondary },

    // Modal Styles
    modalHeader: { flexDirection: 'row', alignItems: 'center', padding: 24, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    modalEmoji: { fontSize: 40, marginRight: 16 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.textPrimary },
    modalSubtitle: { fontSize: 14, color: Colors.textSecondary },
    closeBtn: { padding: 8, backgroundColor: '#F5F5F5', borderRadius: 20 },

    // Content Styles (Reused/Adapted)
    sectionContainer: { marginBottom: 24, backgroundColor: '#FAFAFA', padding: 16, borderRadius: 12 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
    sectionLabel: { fontWeight: '900', letterSpacing: 0.5 },
    stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
    stepNumber: { fontSize: 16, fontWeight: 'bold', color: Colors.textSecondary, marginRight: 8, width: 24 },
    stepText: { fontSize: 16, color: Colors.textPrimary, flex: 1, lineHeight: 24 },
    bulletError: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.error, marginTop: 9, marginRight: 12 },

    alertBox: { backgroundColor: '#EF4444', padding: 20, borderRadius: 16, marginTop: 8 },
    alertHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
    alertTitle: { color: '#FFF', fontWeight: 'bold' },
    alertText: { color: '#FFF', lineHeight: 22 },
});


