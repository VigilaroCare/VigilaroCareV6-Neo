
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Vibration,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileService from '../../services/ProfileService';
import GamificationService from '../../services/GamificationService';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

// --- DATA CONSTANTS ---

const HOUSING_TYPES = [
  { id: 'casa', label: 'Casa', icon: 'Home2' },
  { id: 'apartamento', label: 'Apartamento', icon: 'Building' },
  { id: 'sobrado', label: 'Sobrado', icon: 'HomeHashtag' },
  { id: 'sitio', label: 'Sítio', icon: 'Tree' },
  { id: 'chacara', label: 'Chácara', icon: 'Sun1' },
  { id: 'casa_praia', label: 'Casa de Praia', icon: 'Sun1' },
  { id: 'apto_praia', label: 'Apto. na Praia', icon: 'Pool' },
  { id: 'studio', label: 'Studio/Flat', icon: 'Monitor' },
  { id: 'cobertura', label: 'Cobertura', icon: 'CloudPlus' },
];

const EXTERNAL_AREAS = [
  { id: 'piscina', label: 'Piscina', icon: 'Pool' },
  { id: 'jardim', label: 'Jardim', icon: 'Tree' },
  { id: 'quintal', label: 'Quintal', icon: 'Tree' },
  { id: 'churrasqueira', label: 'Churrasqueira', icon: 'Setting2' },
  { id: 'parquinho', label: 'Parquinho', icon: 'Happyemoji' },
  { id: 'garagem', label: 'Garagem', icon: 'Car' },
  { id: 'oficina', label: 'Oficina', icon: 'Setting2' }, // Novo - Sincronizado
  { id: 'pomar', label: 'Pomar/Horta', icon: 'Tree' },
  { id: 'canil', label: 'Canil', icon: 'Pet' },
  { id: 'area_pet', label: 'Área Pet', icon: 'Pet' },
  { id: 'rua', label: 'Rua Movimentada', icon: 'Warning2' },
  { id: 'central_gas', label: 'Central de Gás (Externo)', icon: 'Danger' },
];

const INTERNAL_HAZARDS = [
  { id: 'escadas', label: 'Escadas', icon: 'Stairs' },
  { id: 'lareira', label: 'Lareira', icon: 'Danger' },
  { id: 'varanda', label: 'Varanda / Sacada', icon: 'Sun1' },
  { id: 'gas_encanado', label: 'Gás Encanado', icon: 'Danger' },
  { id: 'botijao', label: 'Botijão de Gás', icon: 'Box' },
  { id: 'fogao_lenha', label: 'Fogão a Lenha', icon: 'Kitchen' },
  { id: 'cozinha_americana', label: 'Coz. Americana', icon: 'Kitchen' }, // Novo
  { id: 'cozinha_tradicional', label: 'Coz. Tradicional', icon: 'Kitchen' }, // Novo
  { id: 'sala', label: 'Sala de Estar', icon: 'Monitor' }, // Novo
  { id: 'banheiro', label: 'Banheiro', icon: 'Bathroom' }, // Novo
  { id: 'deposito', label: 'Depósito', icon: 'FolderOpen' }, // Novo
  { id: 'despensa', label: 'Despensa', icon: 'Reserve' }, // Novo
  { id: 'janela_sem_rede', label: 'Janelas Sem Rede', icon: 'Scan' },
  { id: 'tapetes', label: 'Tapetes Soltos', icon: 'Layer' },
  { id: 'moveis_pontas', label: 'Móveis Pontiagudos', icon: 'Warning2' },
  { id: 'vidros', label: 'Portas de Vidro', icon: 'Wallet2' },
];

const PROTECTIONS = [
  { id: 'redes_janela', label: 'Redes em Janelas', icon: 'Grid2' },
  { id: 'cerca_piscina', label: 'Cerca na Piscina', icon: 'Lock' },
  { id: 'portao_escada', label: 'Portão em Escadas', icon: 'CloseCircle' },
  { id: 'alarme', label: 'Alarme', icon: 'ShieldTick' }, // Separado
  { id: 'cameras', label: 'Câmeras', icon: 'Video' }, // Separado
  { id: 'extintor', label: 'Extintor', icon: 'Danger' },
  { id: 'travas_gaveta', label: 'Travas de Gaveta', icon: 'Key' },
  { id: 'protetor_tomada', label: 'Protetor de Tomada', icon: 'FlashSlash' },
  { id: 'tapete_antiderrapante', label: 'Tapete Antiderrapante', icon: 'Square' },
];

export default function HomeMappingScreen({ navigation, route }) {
    const { t } = useTranslation('common');
  const isOnboarding = route.params?.isOnboarding || false;
  const [loading, setLoading] = useState(true);

  // State
  const [tipo, setTipo] = useState(null);
  const [andares, setAndares] = useState(1);
  const [areasExternas, setAreasExternas] = useState([]);
  const [riscosInternos, setRiscosInternos] = useState([]);
  const [protecoes, setProtecoes] = useState([]);

  // New States for Consolidation
  const [allProfiles, setAllProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [priorities, setPriorities] = useState([]);


  // State
  const [activeHouseName, setActiveHouseName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const moradia = await ProfileService.getMoradia();
      const profiles = await ProfileService.getAllPerfis();

      setAllProfiles(profiles);

      // Get Active House Name
      const activeRes = await ProfileService.getActiveResidence();
      if (activeRes) setActiveHouseName(activeRes.nome);

      if (moradia) {
        setTipo(moradia.tipoImovel || moradia.tipo); // Compatibilidade
        setAndares(moradia.andares || 1);
        setAreasExternas(moradia.estrutura?.areasExternas || []);
        setRiscosInternos(moradia.estrutura?.riscosInternos || []);
        setProtecoes(moradia.estrutura?.protecoes || []);

        // Load Consolidated Fields
        setSelectedProfiles(moradia.habitantes || []);
        setPriorities(moradia.objetivos || []);
      }
    } catch (e) {
      console.log('Error loading home data:', e);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id, list, setList) => {
    Vibration.vibrate(10);
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  const handleSave = async () => {
    if (!tipo) {
      Alert.alert('Atenção', 'Selecione o tipo de moradia.');
      return;
    }

    const homeData = {
      tipo, // old field
      tipoImovel: tipo, // new standardized field
      andares,
      estrutura: {
        areasExternas,
        riscosInternos,
        protecoes,
      },
      caracteristicas: [
        ...areasExternas,
        ...riscosInternos,
        ...protecoes
      ],
      utilidades: riscosInternos.includes('gas_encanado') ? 'gas_encanado' :
        riscosInternos.includes('botijao') ? 'botijao' : null,

      // Consolidated
      habitantes: selectedProfiles,
      objetivos: priorities
    };

    await ProfileService.saveMoradia(homeData);
    // Também salva mapping separado se necessário, mas saveMoradia já lida com isso se atualizado
    await ProfileService.saveMapping([...areasExternas, ...riscosInternos, ...protecoes]);

    if (isOnboarding) {
      await GamificationService.addPoints('HOME_MAPPING_COMPLETE');
      await ProfileService.setOnboardingCompleto();

      Alert.alert(
        'Tudo Pronto! 🚀',
        'Seu perfil, família e casa foram configurados com sucesso.',
        [{
          text: 'Acessar Vigilaro',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          })
        }]
      );
    } else {
      Alert.alert('Sucesso', 'Configurações do lar atualizadas!', [
        {
          text: 'OK',
          onPress: () => {
            // Tenta navegar para o início (TabSeguranca geralmente)
            // Se veio do menu, pode dar goBack.
            // Se veio de outro lugar, navigate.
            try {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('MainTabs');
              }
            } catch (e) {
              console.warn('Navigation error:', e);
              // Fallback brutal
              navigation.navigate('MainTabs');
            }
          }
        }
      ]);
    }
  };

  return (
    <AppBackground>
        <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        {!isOnboarding && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {isOnboarding ? 'Raio-X do Lar 🏠' : (activeHouseName ? `Mapeamento: ${activeHouseName}` : 'Mapeamento da Casa')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <NeoIcon name="Home2" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {isOnboarding && (
          <View style={styles.introBox}>
            <Text style={styles.introText}>
              {t('headersFirst.paraProtegermosSuaFamLiaPrecisamosConhec', `Para protegermos sua família, precisamos conhecer sua casa e quem mora nela.
              Responda apenas uma vez!`)}
            </Text>
          </View>
        )}

        {/* 1. TIPO DE MORADIA */}
        <Text style={styles.sectionTitle}>{t('headersFirst.ondeVocMora', 'Onde você mora?')}</Text>
        <View style={styles.grid}>
          {HOUSING_TYPES.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.cardOption, tipo === item.id && styles.cardActive]}
              onPress={() => setTipo(item.id)}
            >
              <NeoIcon name={item.icon} size={28} color={tipo === item.id ? Colors.primary : Colors.textSecondary} variant={tipo === item.id ? "Bold" : "Linear"} />
              <Text style={[styles.cardText, tipo === item.id && styles.textActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. ANDARES Selector */}
        <Text style={styles.sectionTitle}>{t('headersFirst.quantosAndares', 'Quantos andares?')}</Text>
        <View style={styles.floorSelector}>
          <TouchableOpacity onPress={() => setAndares(Math.max(1, andares - 1))} style={styles.floorBtn}>
            <NeoIcon name="Minus" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.floorText}>{andares}</Text>
          <TouchableOpacity onPress={() => setAndares(andares + 1)} style={styles.floorBtn}>
            <NeoIcon name="Add" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* 4. ÁREAS EXTERNAS */}
        <Text style={styles.sectionTitle}>{t('headersFirst.ReasExternasLazer', 'Áreas Externas & Lazer')}</Text>
        <View style={styles.chipsContainer}>
          {EXTERNAL_AREAS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, areasExternas.includes(item.id) && styles.chipActive]}
              onPress={() => toggleItem(item.id, areasExternas, setAreasExternas)}
            >
              <NeoIcon
                name={areasExternas.includes(item.id) ? "TickCircle" : "Record"}
                size={20}
                color={areasExternas.includes(item.id) ? "#FFF" : Colors.success}
                variant={areasExternas.includes(item.id) ? "Bold" : "Linear"}
              />
              <Text style={[styles.chipText, areasExternas.includes(item.id) && styles.chipTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. RISCOS INTERNOS */}
        <Text style={styles.sectionTitle}>{t('headersFirst.estruturasRiscosInternos', 'Estruturas & Riscos Internos')}</Text>
        <View style={styles.chipsContainer}>
          {INTERNAL_HAZARDS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, riscosInternos.includes(item.id) && styles.chipActive]}
              onPress={() => toggleItem(item.id, riscosInternos, setRiscosInternos)}
            >
              <NeoIcon
                name={item.icon}
                size={20}
                color={riscosInternos.includes(item.id) ? "#FFF" : Colors.textPrimary}
                style={{ marginRight: 6 }}
                variant={riscosInternos.includes(item.id) ? "Bold" : "Linear"}
              />
              <Text style={[styles.chipText, riscosInternos.includes(item.id) && styles.chipTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 6. PRIORIDADES (Adicionado) */}
        <Text style={styles.sectionTitle}>{t('headersFirst.prioridadesDeSeguranA', 'Prioridades de Segurança 🚨')}</Text>
        <Text style={styles.sectionSubtitle}>{t('headersFirst.oQueMaisTePreocupaHoje', 'O que mais te preocupa hoje?')}</Text>
        <View style={styles.grid}>
          {[
            { id: 'quedas_idosos', label: 'Quedas (Idosos)', icon: 'Elder' },
            { id: 'quedas_criancas', label: 'Quedas (Crianças)', icon: 'Happyemoji' },
            { id: 'afogamento', label: 'Afogamento', icon: 'Pool' },
            { id: 'produtos_quimicos', label: 'Prod. Químicos', icon: 'Reserve' },
            { id: 'incendio', label: 'Incêndio', icon: 'Danger' },
            { id: 'fuga', label: 'Fuga', icon: 'Location' },
            { id: 'choque', label: 'Choque Elétrico', icon: 'Flash' },
            { id: 'engasgo', label: 'Engasgo', icon: 'RecordCircle' },
          ].map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.cardOption, priorities.includes(p.id) && styles.cardActive]}
              onPress={() => toggleItem(p.id, priorities, setPriorities)}
            >
              <NeoIcon name={p.icon} size={28} color={priorities.includes(p.id) ? Colors.primary : Colors.textSecondary} variant={priorities.includes(p.id) ? "Bold" : "Linear"} />
              <Text style={[styles.cardText, priorities.includes(p.id) && styles.textActive]} numberOfLines={1}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 7. PROTEÇÕES */}
        <Text style={styles.sectionTitle}>{t('headersFirst.proteEsJInstaladas', 'Proteções Já Instaladas ✅')}</Text>
        <View style={styles.chipsContainer}>
          {PROTECTIONS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, protecoes.includes(item.id) && styles.chipActive]}
              onPress={() => toggleItem(item.id, protecoes, setProtecoes)}
            >
              <NeoIcon
                name={protecoes.includes(item.id) ? "TickCircle" : "TickSquare"}
                size={20}
                color={protecoes.includes(item.id) ? "#FFF" : Colors.success}
                style={{ marginRight: 6 }}
                variant={protecoes.includes(item.id) ? "Bold" : "Linear"}
              />
              <Text style={[styles.chipText, protecoes.includes(item.id) && styles.chipTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={[Colors.primary, '#4FC3F7']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.saveText}>
              {isOnboarding ? 'Finalizar Configuração' : 'Salvar Alterações'}
            </Text>
            <NeoIcon name="ArrowRight2" size={24} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
      </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 220,
  },
  introBox: {
    backgroundColor: '#E1F5FE',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  introText: {
    color: '#01579B',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  cardOption: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: Spacing.sm,
  },
  cardActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    ...Shadows.sm,
  },
  cardText: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  textActive: {
    color: Colors.primary,
  },
  floorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'flex-start',
  },
  floorBtn: {
    padding: Spacing.sm,
    backgroundColor: 'transparent',
    borderRadius: BorderRadius.sm,
  },
  floorText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: Spacing.xl,
    minWidth: 30,
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  chipActive: {
    backgroundColor: Colors.success, // Standardized Green
    borderColor: Colors.success,
  },
  chipText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginLeft: 6,
  },
  chipTextActive: {
    color: '#FFF',
  },
  saveButton: {
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.md,
  },
  gradientBtn: {
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  saveText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
