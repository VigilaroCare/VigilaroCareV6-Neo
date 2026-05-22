/**
 * OndeProtegerScreen.js
 * Hub de Ambientes - Minha Casa
 * Vigilaro Care V6 (Fusion: Aprendizado + Conhecimento)
 *
 * CORREÇÕES APLICADAS:
 * #1 — loadData respeita activeResidenceId via ProfileService.getActiveResidence()
 * #2 — Filtro usa estritamente activeRes.mapping, sem fallbacks que vazam dados
 * #3 — useFocusEffect recarrega ao mudar residência ativa
 * #4 — familyStats filtra apenas perfis da residência ativa (habitantes + frequentadores)
 * #5 — ID_TRANSLATION corrigido: copa não mapeia mais para cozinha
 * #6 — import() dinâmico removido; Alert importado estaticamente
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import ProfileService from '../../services/ProfileService';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import NeoAlert from '../../utils/NeoAlert';

const CHECKLIST_KEY = '@checklist_progress_v2';

// Lista unificada com IDs nativos do mapeamento_dados.js
const AMBIENTES_DISPONIVEIS = [
    // Convivência
    { id: 'cozinha', label: 'Cozinha', icon: 'Kitchen', color: '#FF9800', riscos: ['Incêndio', 'Cortes', 'Queimaduras', 'Gás'] },
    { id: 'sala', label: 'Sala de Estar', icon: 'Monitor', color: '#9C27B0', riscos: ['Quedas', 'Sufocamento', 'Choque'] },
    { id: 'copa', label: 'Copa', icon: 'Reserve', color: '#8D6E63', riscos: ['Queimaduras', 'Cortes'] },
    { id: 'oficina', label: 'Oficina / Ateliê', icon: 'Setting2', color: '#607D8B', riscos: ['Cortes', 'Ferramentas'] },

    // Íntima
    { id: 'quarto_adulto', label: 'Quarto de Adulto', icon: 'Bed', color: '#673AB7', riscos: ['Quedas', 'Sufocamento'] },
    { id: 'quarto_crianca', label: 'Quarto Infantil', icon: 'Happyemoji', color: '#E91E63', riscos: ['Quedas', 'Sufocamento', 'Mobília'], condicional: 'crianca' },
    { id: 'quarto_bebe', label: 'Quarto de Bebê', icon: 'BabyCrib', color: '#FF4081', riscos: ['CONTEÚDO ESPECIAL DE SEGURANÇA'], condicional: 'bebe' },
    { id: 'quarto_idoso', label: 'Quarto do Idoso', icon: 'Elder', color: '#8D6E63', riscos: ['Quedas', 'Iluminação'], condicional: 'idoso' },
    { id: 'banheiro', label: 'Banheiro', icon: 'Bathroom', color: '#2196F3', riscos: ['Quedas', 'Afogamento', 'Choques'] },

    // Serviços
    { id: 'area_servico', label: 'Área de Serviço', icon: 'WashingMachine', color: '#00BCD4', riscos: ['Intoxicação', 'Quedas', 'Máquinas'] },
    { id: 'garagem', label: 'Garagem', icon: 'Car', color: '#546E7A', riscos: ['Atropelamento', 'Intoxicação (CO)'] },
    { id: 'deposito', label: 'Depósito', icon: 'Box', color: '#455A64', riscos: ['Organização', 'Pragas'] },
    { id: 'central_gas', label: 'Central de Gás', icon: 'Danger', color: '#D32F2F', riscos: ['Explosão', 'Vazamento'], condicional: 'opcional' },

    // Lazer & Exterior
    { id: 'jardim_horta', label: 'Jardim / Horta', icon: 'Tree', color: '#4CAF50', riscos: ['Plantas Tóxicas', 'Insetos'] },
    { id: 'quintal', label: 'Quintal', icon: 'Activity', color: '#8BC34A', riscos: ['Pisos Irregulares', 'Entulhos'] },
    { id: 'piscina', label: 'Piscina', icon: 'Pool', color: '#03A9F4', riscos: ['AFOGAMENTO', 'Choque'], condicional: 'opcional' },
    { id: 'parquinho', label: 'Parquinho', icon: 'Happyemoji', color: '#CDDC39', riscos: ['Quedas de Altura', 'Brinquedos'] },
    { id: 'canil', label: 'Área do Pet', icon: 'Pet', color: '#795548', riscos: ['Mordidas', 'Parasitas'] },

    // Circulação
    { id: 'escadas', label: 'Escadas', icon: 'Stairs', color: '#F44336', riscos: ['Quedas Graves'], condicional: 'opcional' },
    { id: 'varanda', label: 'Varanda / Sacada', icon: 'Sun1', color: '#FFB300', riscos: ['Quedas', 'Escorregões'], condicional: 'opcional' },
    { id: 'hall_corredor', label: 'Corredores', icon: 'ArrowRight2', color: '#9E9E9E', riscos: ['Iluminação', 'Tropeços'] },
];

// FIX #5: ID_TRANSLATION corrigido — cada ambiente mapeia para seu próprio ID.
// 'copa' não deve mais apontar para 'cozinha', pois são ambientes distintos.
const ID_TRANSLATION = {
    'cozinha': 'cozinha',
    'sala': 'sala',
    'copa': 'copa',           // CORRIGIDO: era 'cozinha'
    'oficina': 'oficina',
    'quarto_adulto': 'quarto_adulto',
    'quarto_crianca': 'quarto_crianca',
    'quarto_bebe': 'quarto_bebe',
    'quarto_idoso': 'quarto_idoso',
    'banheiro': 'banheiro',
    'area_servico': 'area_servico',
    'garagem': 'garagem',
    'deposito': 'deposito',
    'central_gas': 'central_gas',
    'jardim_horta': 'jardim_horta',
    'quintal': 'quintal',
    'piscina': 'piscina',
    'parquinho': 'parquinho',
    'canil': 'canil',
    'escadas': 'escadas',
    'varanda': 'varanda',
    'hall_corredor': 'hall_corredor',
};

export default function OndeProtegerScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[800];

    // FIX #3: activeResidenceId no estado para disparar recarregamento ao trocar de casa
    const [activeResidenceId, setActiveResidenceId] = useState(null);
    const [ambientesMapeados, setAmbientesMapeados] = useState([]);
    const [checklistState, setChecklistState] = useState({});
    const [perfilData, setPerfilData] = useState(null);
    const [familyStats, setFamilyStats] = useState({ temBebe: false, temCrianca: false, temIdoso: false });
    const insets = useSafeAreaInsets();

    // FIX #3: useFocusEffect sempre recarrega ao focar a tela,
    // garantindo que troca de residência feita em outra tela seja refletida aqui.
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            // FIX #1: Obter a residência ativa explicitamente antes de tudo
            const activeRes = await ProfileService.getActiveResidence();
            const resId = activeRes?.id ?? null;
            setActiveResidenceId(resId);

            // FIX #1: Usar o mapping ESTRITO da residência ativa, não um global
            // activeRes.mapping é o array de IDs dos ambientes desta residência
            const mapping = activeRes?.mapping ?? [];
            setAmbientesMapeados(mapping);

            const checklist = await AsyncStorage.getItem(CHECKLIST_KEY);
            if (checklist) setChecklistState(JSON.parse(checklist));

            const activeProfile = await ProfileService.getPrimaryProfile();
            if (activeProfile) setPerfilData(activeProfile);

            // FIX #4: familyStats considera apenas perfis vinculados à residência ativa
            // (habitantes + frequentadores), não todos os perfis do banco global
            const todosPeris = await ProfileService.getAllPerfis();
            const idsNaResidencia = [
                ...(activeRes?.moradia?.habitantes ?? []),
                ...(activeRes?.moradia?.frequentadores ?? []),
            ];
            const perfisNaResidencia = todosPeris.filter(p => idsNaResidencia.includes(p.id));

            const stats = {
                temBebe: perfisNaResidencia.some(p => ProfileService.getFaixaEtaria(p.dataNascimento) === 'baby'),
                temCrianca: perfisNaResidencia.some(p => ProfileService.getFaixaEtaria(p.dataNascimento) === 'child'),
                temIdoso: perfisNaResidencia.some(p => ProfileService.getFaixaEtaria(p.dataNascimento) === 'elderly'),
            };
            setFamilyStats(stats);

        } catch (error) {
            console.error('OndeProteger: Error loading data:', error);
        }
    };

    // FIX #2: Filtro usa estritamente activeRes.mapping (ambientesMapeados).
    // Removidos os fallbacks que causavam vazamento de dados entre residências:
    // - Regra 4 (cozinha_americana/cozinha_tradicional) removida — esses IDs devem
    //   estar no mapping correto, não como caso especial aqui.
    // - Regra 5 (perfilData?.ambiente?.caracteristicas) removida — dado legado
    //   que não respeita a arquitetura multi-residência.
    const ambientesDoUsuario = AMBIENTES_DISPONIVEIS.filter(a => {
        // Filtros condicionais por público-alvo da residência ativa
        if (a.condicional === 'bebe' && !familyStats.temBebe) return false;
        if (a.condicional === 'crianca' && !familyStats.temCrianca) return false;
        if (a.condicional === 'idoso' && !familyStats.temIdoso) return false;

        // Match direto: o ID do ambiente está no mapping desta residência
        if (ambientesMapeados.includes(a.id)) return true;

        // Match traduzido: para compatibilidade com mappings que usam IDs alternativos
        const translatedId = ID_TRANSLATION[a.id];
        if (translatedId && translatedId !== a.id && ambientesMapeados.includes(translatedId)) return true;

        return false;
    });

    // FIX #6: Handler de nova residência sem import() dinâmico
    const handleAddResidence = async () => {
        NeoAlert.alert(
            'Nova Residência',
            'Deseja criar e mapear um novo local?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Criar',
                    onPress: async () => {
                        try {
                            const novoNome = 'Nova Casa ' + new Date().toLocaleTimeString().slice(0, 5);
                            const newRes = await ProfileService.addResidence(novoNome);
                            if (newRes) {
                                await ProfileService.setActiveResidence(newRes.id);
                                navigation.navigate('MapeamentoRiscos');
                            }
                        } catch (e) {
                            console.error('Erro ao criar residência:', e);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" translucent backgroundColor="transparent" />

            {/* Gradient Header */}
            <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={[styles.header, { paddingTop: insets.top + 10 }]}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.headerTitle, { color: textPrimary }]} accessibilityRole="header">{t('headersFirst.vistoriarAmbientes', 'Vistoriar Ambientes')}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.backButton}>
                    <NeoIcon name="Home2" size={24} color={Neo.colors.neutral.white} />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.sectionTitle, { color: textPrimary }]} accessibilityRole="header">{t('headersFirst.checklistsDeSeguranA', 'Checklists de Segurança')}</Text>

                {ambientesDoUsuario.length === 0 ? (
                    <View style={styles.emptyState}>
                        <NeoIcon name="Home2" size={64} color={Neo.colors.primary[500]} />
                        <Text style={styles.emptyTitle}>{t('headersFirst.suaCasaAindaNOFoiMapeada', 'Sua casa ainda não foi mapeada')}</Text>
                        <Text style={styles.emptyText}>
                            {t('headersFirst.paraCriarChecklistPersonalizadosPrecisam', 'Para criar checklist personalizados, precisamos saber o que existe na sua casa (Piscina? Escadas? Quintal?).')}
                        </Text>
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() => navigation.navigate('MapeamentoRiscos')}
                        >
                            <Text style={styles.startButtonText}>{t('headersFirst.iniciarMapeamentoDaCasa', 'Iniciar Mapeamento da Casa')}</Text>
                            <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral.white} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View style={styles.ambientesGrid}>
                            {ambientesDoUsuario.map((ambiente) => (
                                <TouchableOpacity
                                    key={ambiente.id}
                                    style={styles.ambienteCard}
                                    onPress={() => {
                                        // Usa o ID nativo do ambiente (sem tradução desnecessária)
                                        navigation.navigate('AreasInternas', {
                                            ambiente: ambiente.id,
                                            ambientesSequence: ambientesDoUsuario
                                        });
                                    }}
                                >
                                    <View style={[styles.ambienteIcon, { backgroundColor: ambiente.color }]}>
                                        <NeoIcon name={ambiente.icon} size={28} color={Neo.colors.neutral.white} variant="Bold" />
                                    </View>
                                    <View>
                                        <Text style={[styles.ambienteLabel, { color: textPrimary }]}>{ambiente.label}</Text>
                                        <Text style={styles.ambienteRiscos}>
                                            {ambiente.riscos.length} pontos de atenção
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* SEÇÃO: INVENTÁRIO */}
                        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>{t('headersFirst.oQueTenhoAtivos', 'O Que Tenho (Ativos)')}</Text>
                        <TouchableOpacity
                            style={styles.inventoryCard}
                            onPress={() => navigation.navigate('HazardMapping')}
                        >
                            <LinearGradient
                                colors={['#FF5722', '#F4511E']}
                                style={styles.inventoryGradient}
                            >
                                <View style={styles.inventoryIconBox}>
                                    <NeoIcon name="Box" size={32} color="#FF5722" variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.inventoryTitle, { color: textPrimary }]}>{t('headersFirst.inventRioDeRisco', 'Inventário de Risco')}</Text>
                                    <Text style={styles.inventorySubtitle}>
                                        {t('headersFirst.mapeie25ItensPerigososAirFryerVidrosEsca', 'Mapeie 25+ itens perigosos (Air Fryer, Vidros, Escadas...) para ativar a proteção inteligente.')}
                                    </Text>
                                </View>
                                <View style={styles.inventoryBtn}>
                                    <Text style={styles.inventoryBtnText}>{t('headersFirst.mapear', 'Mapear')}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.adjustButton}
                            onPress={() => navigation.navigate('MapeamentoRiscos')}
                        >
                            <NeoIcon name="Setting4" size={20} color={Neo.colors.neutral[500]} />
                            <Text style={styles.adjustButtonText}>{t('headersFirst.ajustarAmbientesMapeados', 'Ajustar Ambientes Mapeados')}</Text>
                        </TouchableOpacity>

                        {/* FIX #6: Handler extraído, sem import() dinâmico */}
                        <TouchableOpacity
                            style={[styles.adjustButton, { marginTop: 0 }]}
                            onPress={handleAddResidence}
                        >
                            <NeoIcon name="AddCircle" size={20} color={Neo.colors.primary[500]} />
                            <Text style={[styles.adjustButtonText, { color: Neo.colors.primary[500], fontWeight: 'bold' }]}>{t('headersFirst.adicionarOutraResidNcia', 'Adicionar Outra Residência')}</Text>
                        </TouchableOpacity>
                    </>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        ...Neo.shadows.md,
    },
    backButton: { padding: 4 },
    headerTitle: { fontSize: 24, fontWeight: '700', color: Neo.colors.neutral.white },
    headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 4 },

    content: { padding: 20, paddingBottom: 190 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: Neo.colors.neutral[900], marginBottom: 16 },

    ambientesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    ambienteCard: {
        width: '48%',
        aspectRatio: 1,
        padding: 16,
        borderRadius: 20,
        backgroundColor: Neo.colors.neutral.white,
        ...Neo.shadows.sm,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    ambienteIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    ambienteLabel: { fontSize: 15, fontWeight: '700', color: Neo.colors.neutral[900], marginBottom: 4 },
    ambienteRiscos: { fontSize: 12, color: Neo.colors.neutral[500] },

    adjustButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        padding: 16
    },
    adjustButtonText: { marginLeft: 8, color: Neo.colors.neutral[500], fontSize: 14 },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        backgroundColor: 'transparent',
        borderRadius: 24,
        marginTop: 20,
        ...Neo.shadows.md
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center'
    },
    emptyText: {
        fontSize: 14,
        color: Neo.colors.neutral[500],
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22
    },
    startButton: {
        backgroundColor: Neo.colors.primary[500],
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        ...Neo.shadows.md
    },
    startButtonText: {
        color: Neo.colors.neutral.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    inventoryCard: {
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        ...Neo.shadows.md,
        marginBottom: 10
    },
    inventoryGradient: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inventoryIconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    inventoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral.white,
        marginBottom: 4
    },
    inventorySubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 18
    },
    inventoryBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginLeft: 8
    },
    inventoryBtnText: {
        color: Neo.colors.neutral.white,
        fontWeight: 'bold',
        fontSize: 12
    }
});