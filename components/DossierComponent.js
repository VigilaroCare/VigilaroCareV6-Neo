import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DS as Neo } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';
import NeoCard from './NeoCard';
import { H3, Body, Small, Caption, H2 } from './NeoTypography';
import NeoIcon from './NeoIcon';

/**
 * DossierComponent
 * 
 * O "Prontuário Inteligente" do usuário.
 * Exibe identidade, análise de riscos personalizada e histórico médico.
 */
export default function DossierComponent({ profile, history = [] }) {
    const [risks, setRisks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // Categorias de Histórico Rápido
    const historyCategories = [
        { id: 'alergia', label: 'Alergia', icon: 'alert-circle', color: '#FF5252' },
        { id: 'cirurgia', label: 'Cirurgia', icon: 'medical-bag', color: '#FF6F00' },
        { id: 'condicao_cronica', label: 'Condição Crônica', icon: 'heart-pulse', color: '#9C27B0' },
        { id: 'vacina', label: 'Vacina', icon: 'needle', color: '#00BCD4' },
        { id: 'exame', label: 'Exame', icon: 'clipboard-text', color: '#4CAF50' }
    ];

    if (profile?.tipo === 'pet') {
        historyCategories.push({ id: 'antipulga', label: 'Antipulga', icon: 'bug', color: '#795548' });
    }

    useEffect(() => {
        let isMounted = true;

        const loadRisks = async () => {
            if (!profile) return;
            try {
                // Analisa riscos globais da casa
                const allRisks = await ProfileService.analisarRiscos();

                // Filtra apenas riscos que citam estritamente este perfil
                // A lógica do ProfileService.analisarRiscos já retorna "perfisAfetados" (array de nomes)
                const myRisks = allRisks.filter(r =>
                    r.perfisAfetados && r.perfisAfetados.includes(profile.nome)
                );

                if (isMounted) {
                    setRisks(myRisks);
                    setLoading(false);
                }
            } catch (e) {
                console.error("Erro ao carregar riscos do dossiê:", e);
                if (isMounted) setLoading(false);
            }
        };

        loadRisks();

        return () => { isMounted = false; };
    }, [profile]);

    if (!profile) return null;

    // Helper para Idade
    const getAge = () => {
        if (profile.idade) return `${profile.idade} anos`;
        if (profile.dataNascimento) {
            const age = ProfileService.calcularIdade(profile.dataNascimento);
            return age !== null ? `${age} anos` : '--';
        }
        return '--';
    };

    // --- VACCINATION LOGIC ---
    const getRecommendedVaccines = () => {
        if (profile.tipo === 'pet') {
            return [
                { id: 'raiva', name: 'Antirrábica', label: 'Raiva' },
                { id: 'v10', name: 'V10/V8', label: 'Polivalente' },
                { id: 'giardia', name: 'Giárdia', label: 'Giárdia' },
                { id: 'tosse', name: 'Tosse dos Canis', label: 'Gripe Canina' },
                { id: 'leish', name: 'Leishmaniose', label: 'Leishmaniose' }
            ];
        } else {
            // Humano (Simplificado)
            return [
                { id: 'gripe', name: 'Influenza', label: 'Gripe Anual' },
                { id: 'tetano', name: 'Tétano', label: 'Tétano' },
                { id: 'covid', name: 'COVID-19', label: 'Covid-19' },
                { id: 'hepatite', name: 'Hepatite B', label: 'Hepatite B' },
                { id: 'bcg', name: 'BCG', label: 'BCG' }
            ];
        }
    };

    const renderVaccinationWallet = () => {
        const recommended = getRecommendedVaccines();
        const takenVaccines = history.filter(h => h.category === 'vacina');

        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <NeoIcon name="Personalcard" size={22} color={Neo.colors.primary[600]} />
                    <H3 style={{ marginLeft: 8 }}>Carteira de Vacinação Digital</H3>
                </View>
                <Small style={{ color: Neo.colors.neutral[500], marginBottom: 12, marginLeft: 28 }}>
                    {profile.tipo === 'pet' ? 'Protocolo Veterinário Sugerido' : 'Calendário Nacional Sugerido'}
                </Small>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginHorizontal: 16, marginTop: 12 }}>
                    {recommended.map(vac => {
                        // Check if taken
                        const match = takenVaccines.find(taken =>
                            taken.description.toLowerCase().includes(vac.name.toLowerCase()) ||
                            taken.description.toLowerCase().includes(vac.label.toLowerCase()) ||
                            taken.description.toLowerCase().includes(vac.id)
                        );

                        const isTaken = !!match;
                        const dateTaken = match ? new Date(match.date).toLocaleDateString('pt-BR') : null;

                        return (
                            <NeoCard key={vac.id} style={[
                                styles.vaccineCard,
                                isTaken ? { borderColor: Neo.colors.feedback.success } : { borderColor: Neo.colors.neutral[300], borderStyle: 'dashed', borderWidth: 1 }
                            ]}>
                                <View style={[styles.vaccineIcon, isTaken ? { backgroundColor: '#E8F5E9' } : { backgroundColor: '#F5F5F5' }]}>
                                    <NeoIcon
                                        name={isTaken ? "check-decagram" : "needle-off"}
                                        size={20}
                                        color={isTaken ? Neo.colors.feedback.success : Neo.colors.neutral[400]}
                                    />
                                </View>
                                <Small style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center', marginTop: 8, color: isTaken ? Neo.colors.neutral[900] : Neo.colors.neutral[500] }}>
                                    {vac.label}
                                </Small>
                                <Caption style={{ fontSize: 9, textAlign: 'center', color: isTaken ? Neo.colors.feedback.success : Neo.colors.feedback.warning, marginTop: 4 }}>
                                    {isTaken ? `${dateTaken}` : 'Pendente'}
                                </Caption>
                            </NeoCard>
                        );
                    })}
                </View>
            </View>
        );
    };

    // Render Identity
    const renderIdentity = () => (
        <NeoCard style={styles.identityCard}>
            <View style={styles.identityHeader}>
                {profile.foto ? (
                    <Image source={{ uri: profile.foto }} style={styles.avatarLarge} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarInitial}>{profile.nome?.charAt(0)}</Text>
                    </View>
                )}
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <H2>{profile.nome}</H2>
                    <Body style={{ color: Neo.colors.neutral[600] }}>
                        {profile.tipo === 'humano' ? 'Residente' : 'Pet'} • {getAge()}
                    </Body>

                    {/* Tags Rápidas */}
                    <View style={styles.tagsContainer}>
                        {!!profile.tipoSanguineo && (
                            <View style={[styles.tag, { backgroundColor: '#FFEBEE' }]}>
                                <NeoIcon name="Drop" size={12} color="#D32F2F" />
                                <Caption style={{ color: '#D32F2F', fontWeight: 'bold' }}>{profile.tipoSanguineo}</Caption>
                            </View>
                        )}
                        {!!(profile.alergias && profile.alergias.length > 0) && (
                            <View style={[styles.tag, { backgroundColor: '#FFF3E0' }]}>
                                <NeoIcon name="Warning2" size={12} color="#F57C00" />
                                <Caption style={{ color: '#F57C00', fontWeight: 'bold' }}>Alérgico</Caption>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </NeoCard>
    );


    // Render Timeline (Legacy History)
    const renderTimeline = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <NeoIcon name="Health" size={20} color={Neo.colors.neutral[600]} />
                <H3 style={{ marginLeft: 8 }}>Registros Médicos</H3>
            </View>
            <Small style={{ color: Neo.colors.neutral[500], marginBottom: 12, marginLeft: 28 }}>
                Armazene ocorrências, alergias, procedimentos e medicações passadas
            </Small>

            {/* Quick Add Categories Grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16, marginBottom: 24, justifyContent: 'space-between' }}>
                {historyCategories.map(cat => (
                    <TouchableOpacity
                        key={cat.id}
                        style={{ width: '31%', alignItems: 'center' }}
                        onPress={() => navigation.navigate('AddMedicalRecord', { prefillCategory: cat.id })}
                    >
                        <NeoCard style={{ width: '100%', padding: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: cat.color + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                <NeoIcon name={cat.icon} size={20} color={cat.color} />
                            </View>
                            <Small style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: Neo.colors.neutral[700] }}>{cat.label}</Small>
                        </NeoCard>
                    </TouchableOpacity>
                ))}
            </View>

            {history.length === 0 ? (
                <View style={styles.emptyHistory}>
                    <Small style={{ color: Neo.colors.neutral[400] }}>Nenhum evento registrado no histórico.</Small>
                </View>
            ) : (
                history.map((record) => (
                    <View key={record.id} style={styles.timelineItem}>
                        <View style={styles.timelineLine} />
                        <View style={styles.timelineDot} />
                        <NeoCard style={styles.timelineContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ textTransform: 'uppercase', color: Neo.colors.primary[600], fontWeight: 'bold' }}>
                                    {record.category?.replace('_', ' ')}
                                </Caption>
                                <Caption style={{ color: Neo.colors.neutral[400] }}>
                                    {new Date(record.createdAt).toLocaleDateString('pt-BR')}
                                </Caption>
                            </View>
                            <Body style={{ marginTop: 4 }}>{record.description}</Body>
                        </NeoCard>
                    </View>
                ))
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderIdentity()}
            {renderVaccinationWallet()}
            {renderTimeline()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 24,
        paddingBottom: 40
    },
    identityCard: {
        padding: 16,
        backgroundColor: '#FFF'
    },
    identityHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: Neo.colors.primary[100]
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Neo.colors.primary[200],
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarInitial: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF'
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12
    },
    section: {
        gap: 12
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4
    },

    // Timeline
    timelineItem: {
        flexDirection: 'row',
        paddingLeft: 16,
        marginBottom: 16
    },
    timelineLine: {
        position: 'absolute',
        left: 19,
        top: 0,
        bottom: -20,
        width: 2,
        backgroundColor: Neo.colors.neutral[200]
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Neo.colors.primary[500],
        marginRight: 16,
        marginTop: 6,
        zIndex: 1
    },
    timelineContent: {
        flex: 1,
        padding: 12
    },
    emptyHistory: {
        alignItems: 'center',
        padding: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
        borderRadius: 8
    },
    // Vaccination
    vaccineCard: {
        width: '31%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 8
    },
    vaccineIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4
    }
});
