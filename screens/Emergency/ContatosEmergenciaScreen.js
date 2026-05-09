import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../utils/ThemeContext';
import CustomIcon from '../../components/CustomIcon';
import ProfileService from '../../services/ProfileService'; // Ensure we can get active profile if needed
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';

export default function ContatosEmergenciaScreen({ navigation, route }) {
    const { t } = useTranslation('common');
  const { theme } = useTheme();
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(null);

  // Form State
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('Familiar');
  const [parentesco, setParentesco] = useState(''); // Novo Campo

  // Profile Context
  const [activeProfile, setActiveProfile] = useState(null);
  const [storageKey, setStorageKey] = useState(null);

  const TIPOS = ['Familiar', 'Médico', 'Vizinho', 'Amigo', 'Outro', 'Veterinário'];

  useEffect(() => {
    setupProfileAndLoad();
  }, []);

  const setupProfileAndLoad = async () => {
    try {
      setLoading(true);
      // 1. Determine Profile
      let profile = route.params?.profile;
      if (!profile) {
        profile = await ProfileService.getPerfilAtivo();
      }
      setActiveProfile(profile);

      // 2. Determine Storage Key
      // If no profile (Generic mode), use legacy key
      const key = profile ? `@contacts_${profile.id}` : 'contatos_emergencia';
      setStorageKey(key);

      // 3. Load Contacts
      await carregarContatos(key, profile);

    } catch (e) {
      console.error("Erro setup contacts", e);
    } finally {
      setLoading(false);
    }
  };

  const carregarContatos = async (key, profile) => {
    try {
      const dados = await AsyncStorage.getItem(key);
      if (dados) {
        setContatos(JSON.parse(dados));
      } else {
        // If empty AND we are in a specific profile, check if we can import
        if (profile) { // Only suggest import if we are in a specific profile
          checkAndProposeImport(key);
        } else {
          setContatos([]);
        }
      }
    } catch (error) {
      console.log('Erro ao carregar contatos:', error);
      setContatos([]);
    }
  };

  const checkAndProposeImport = async (currentProfileKey) => {
    try {
      // Check legacy/global list
      const globalData = await AsyncStorage.getItem('contatos_emergencia');
      if (globalData) {
        const globalContacts = JSON.parse(globalData);
        if (globalContacts.length > 0) {
          Alert.alert(
            'Importar Contatos?',
            'Encontramos contatos da família. Deseja importá-los para este perfil para facilitar?',
            [
              { text: 'Não, começar do zero', style: 'cancel' },
              {
                text: 'Sim, importar',
                onPress: async () => {
                  // Save to current profile key
                  await AsyncStorage.setItem(currentProfileKey, JSON.stringify(globalContacts));
                  setContatos(globalContacts);
                }
              }
            ]
          );
        }
      }
    } catch (e) {
      console.log('Erro ao verificar importação', e);
    }
  }

  const salvarContatos = async (novosContatos) => {
    if (!storageKey) return;
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(novosContatos));
      setContatos(novosContatos);

      // If we are editing the 'Main' legacy list (no profile or explicitly main), 
      // strictly speaking we don't sync back, but for now we keep isolated.
    } catch (error) {
      console.log('Erro ao salvar contatos:', error);
    }
  };

  const adicionarContato = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome.');
      return;
    }

    if (!telefone.trim()) {
      Alert.alert('Erro', 'Por favor, informe o telefone.');
      return;
    }

    const novoContato = {
      id: editando?.id || Date.now().toString(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      tipo,
      parentesco: parentesco.trim(), // Salva Parentesco
      dataCriacao: editando?.dataCriacao || new Date().toISOString(),
    };

    let novosContatos;
    if (editando) {
      novosContatos = contatos.map((c) => (c.id === editando.id ? novoContato : c));
    } else {
      novosContatos = [...contatos, novoContato];
    }

    salvarContatos(novosContatos);
    limparFormulario();
  };

  const editarContato = (contato) => {
    setEditando(contato);
    setNome(contato.nome);
    setTelefone(contato.telefone);
    setTipo(contato.tipo);
    setParentesco(contato.parentesco || ''); // Carrega Parentesco
    setModalVisible(true);
  };

  const excluirContato = (id) => {
    Alert.alert(
      'Excluir Contato',
      'Tem certeza que deseja excluir este contato deste perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const novosContatos = contatos.filter((c) => c.id !== id);
            salvarContatos(novosContatos);
          },
        },
      ]
    );
  };

  const limparFormulario = () => {
    setNome('');
    setTelefone('');
    setTipo('Familiar');
    setParentesco('');
    setEditando(null);
    setModalVisible(false);
  };

  const ligarContato = (telefone) => {
    Linking.openURL(`tel:${telefone}`);
  };

  const whatsappContato = (telefone) => {
    // Remove chars não numéricos
    const num = telefone.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/55${num}`);
  };

  const smsContato = (telefone) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    Linking.openURL(`sms:${telefone}${separator}body=Olá, preciso de ajuda!`);
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Familiar': return '#2196F3';
      case 'Médico': return '#4CAF50';
      case 'Vizinho': return '#FF9800';
      case 'Amigo': return '#9C27B0';
      case 'Veterinário': return '#009688';
      default: return '#757575';
    }
  };

  const getTipoEmoji = (tipo) => {
    switch (tipo) {
      case 'Familiar': return '👨‍👩‍👧‍👦';
      case 'Médico': return '👨‍⚕️';
      case 'Vizinho': return '🏘️';
      case 'Amigo': return '👥';
      case 'Veterinário': return '🐾';
      default: return '📞';
    }
  };

  const styles = getStyles(theme);
  const themeColor = activeProfile ? (activeProfile.tipo === 'pet' ? '#FF9800' : '#2196F3') : '#F44336';


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={themeColor} />
      </View>
    )
  }

  return (
    <AppBackground variant="subtle">
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
            <CustomIcon name="voltar" size={24} color={Neo.colors.neutral.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {activeProfile ? `Contatos: ${activeProfile.nome}` : 'Contatos de Emergência'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {activeProfile
              ? `Rede de apoio específica para ${activeProfile.nome}`
              : 'Contatos gerais da residência'
            }
          </Text>
        </View>

        <View style={[styles.infoCard, { borderLeftColor: themeColor, backgroundColor: themeColor + '15' }]}>
          <Text style={[styles.infoTitle, { color: themeColor }]}>{t('headersFirst.RedeDeApoio', '💡 Rede de Apoio')}</Text>
          <Text style={[styles.infoText, { color: themeColor }]}>
            {t('headersFirst.mantenhaEssaListaAtualizadaEmUmaEmergNci', 'Mantenha essa lista atualizada. Em uma emergência, esses contatos aparecerão no topo.')}
          </Text>
        </View>

        {modalVisible && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {editando ? '✏️ Editar Contato' : '➕ Novo Contato'}
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>{t('headersFirst.nome', 'Nome *')}</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Dr. João Silva"
                placeholderTextColor={theme.subText}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>{t('headersFirst.detalheRelacionamento', 'Detalhe / Relacionamento')}</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Cardiologista, Tio, Vizinho frente..."
                placeholderTextColor={theme.subText}
                value={parentesco}
                onChangeText={setParentesco}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>{t('headersFirst.telefone', 'Telefone *')}</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: (41) 99999-9999"
                placeholderTextColor={theme.subText}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>{t('headersFirst.tipo', 'Tipo *')}</Text>
              <View style={styles.tiposContainer}>
                {TIPOS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.tipoButton,
                      tipo === t && { backgroundColor: getTipoColor(t), borderColor: getTipoColor(t) },
                    ]}
                    onPress={() => setTipo(t)}
                  >
                    <Text
                      style={[
                        styles.tipoButtonText,
                        tipo === t ? { color: Neo.colors.neutral.white } : { color: theme.text },
                      ]}
                    >
                      {getTipoEmoji(t)} {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={limparFormulario}
              >
                <Text style={styles.cancelButtonText}>{t('headersFirst.cancelar', 'Cancelar')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: themeColor }]}
                onPress={adicionarContato}
              >
                <Text style={styles.saveButtonText}>
                  {editando ? 'Atualizar' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.content}>
          {!modalVisible && (
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: themeColor }]}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomIcon name="adicionar" size={20} />
                <Text style={styles.addButtonText}> {t('headersFirst.adicionarContato', 'Adicionar Contato')}</Text>
              </View>
            </TouchableOpacity>
          )}

          {contatos.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>
                📋 Lista ({contatos.length})
              </Text>
              {contatos.map((contato) => (
                <View
                  key={contato.id}
                  style={[
                    styles.contatoCard,
                    { borderLeftColor: getTipoColor(contato.tipo) },
                  ]}
                >
                  <View style={styles.contatoInfo}>
                    <Text style={styles.contatoEmoji}>
                      {getTipoEmoji(contato.tipo)}
                    </Text>
                    <View style={styles.contatoTextos}>
                      <Text style={styles.contatoNome}>{contato.nome}</Text>
                      {contato.parentesco ? (
                        <Text style={[styles.contatoTelefone, { color: theme.text, fontWeight: 'normal', fontSize: 13 }]}>
                          {contato.parentesco}
                        </Text>
                      ) : null}
                      <Text style={styles.contatoTelefone}>{contato.telefone}</Text>
                      <View
                        style={[
                          styles.contatoBadge,
                          { backgroundColor: getTipoColor(contato.tipo) },
                        ]}
                      >
                        <Text style={styles.contatoBadgeText}>{contato.tipo}</Text>
                      </View>
                    </View>

                    {/* Botões de Ação Rápida */}
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity onPress={() => whatsappContato(contato.telefone)} style={{ padding: 8, backgroundColor: '#25D366', borderRadius: 20 }}>
                        <CustomIcon name="whatsapp" size={20} color={Neo.colors.neutral.white} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => ligarContato(contato.telefone)} style={{ padding: 8, backgroundColor: themeColor, borderRadius: 20 }}>
                        <CustomIcon name="telefone-emergencia" size={20} color={Neo.colors.neutral.white} />
                      </TouchableOpacity>
                    </View>

                  </View>

                  {/* Actions Line */}
                  <View style={styles.contatoActions}>
                    <TouchableOpacity
                      style={styles.actionIconButton}
                      onPress={() => smsContato(contato.telefone)}
                    >
                      <Text>{t('headersFirst.SMS', '💬 SMS')}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                      style={styles.actionIconButton}
                      onPress={() => editarContato(contato)}
                    >
                      <Text>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionIconButton, { backgroundColor: Neo.colors.feedback.error + '15' }]}
                      onPress={() => excluirContato(contato.id)}
                    >
                      <Text>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          ) : (
            !modalVisible && (
              <View style={styles.emptyState}>
                <Text style={{ fontSize: 40, marginBottom: 10 }}>📭</Text>
                <Text style={styles.emptyStateTitle}>
                  {t('headersFirst.nenhumContatoNestaLista', 'Nenhum contato nesta lista')}
                </Text>
                <Text style={styles.emptyStateText}>
                  Adicione médicos, parentes ou vizinhos específicos para {activeProfile?.nome || 'sua casa'}.
                </Text>
              </View>
            )
          )}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
      </AppBackground>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 20,
      paddingTop: 10,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      elevation: 4,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Neo.colors.neutral.white,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: Neo.colors.neutral.white,
      opacity: 0.9,
    },
    infoCard: {
      margin: 16,
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 4,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      lineHeight: 20,
    },
    formCard: {
      margin: 16,
      padding: 16,
      backgroundColor: theme.card,
      borderRadius: 12,
      ...Neo.shadows.md,
    },
    formTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    tiposContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tipoButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
    },
    tipoButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    formButtons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: Neo.colors.neutral[700],
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: Neo.colors.neutral.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveButton: {
      flex: 1,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveButtonText: {
      color: Neo.colors.neutral.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    content: {
      padding: 16,
    },
    addButton: {
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 24,
      ...Neo.shadows.md,
    },
    addButtonText: {
      color: Neo.colors.neutral.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    contatoCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      elevation: 2,
    },
    contatoInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contatoEmoji: {
      fontSize: 32,
      marginRight: 12,
    },
    contatoTextos: {
      flex: 1,
    },
    contatoNome: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    contatoTelefone: {
      fontSize: 14,
      color: theme.subText,
      fontWeight: '600',
      marginBottom: 6,
    },
    contatoBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    contatoBadgeText: {
      color: Neo.colors.neutral.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    contatoActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: Neo.colors.neutral[300],
      paddingTop: 8,
      gap: 15
    },
    actionIconButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: 'transparent'
    },
    emptyState: {
      alignItems: 'center',
      padding: 32,
      marginTop: 10,
      backgroundColor: 'transparent',
      borderRadius: 12
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateText: {
      fontSize: 14,
      color: theme.subText,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

