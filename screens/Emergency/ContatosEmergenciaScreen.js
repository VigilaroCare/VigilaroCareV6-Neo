import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
  Platform,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import SkeletonLoader, { SkeletonContactCard } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import NeoAlert from '../../utils/NeoAlert';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';
import { Storage } from '../../utils/SecureStorage';

const TIPOS = ['Familiar', 'Médico', 'Vizinho', 'Amigo', 'Outro', 'Veterinário'];

// DS: data-level colors — each tipo has its own brand color
const TIPO_COLORS = {
  Familiar: '#2196F3',  // DS: data-level color
  Médico: '#4CAF50',    // DS: data-level color
  Vizinho: '#FF9800',   // DS: data-level color
  Amigo: '#9C27B0',     // DS: data-level color
  Veterinário: '#009688', // DS: data-level color
  Outro: '#757575',     // DS: data-level color
};

const TIPO_ICONS = {
  Familiar: 'People',
  Médico: 'Health',
  Vizinho: 'Buildings',
  Amigo: 'UserOctagon',
  Veterinário: 'Heart',
  Outro: 'Call',
};

export default function ContatosEmergenciaScreen({ navigation, route }) {
  const { t } = useTranslation('common');

  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('Familiar');
  const [parentesco, setParentesco] = useState('');

  const [activeProfile, setActiveProfile] = useState(null);
  const [storageKey, setStorageKey] = useState(null);

  useEffect(() => {
    setupProfileAndLoad();
  }, []);

  const setupProfileAndLoad = async () => {
    try {
      setLoading(true);
      let profile = route.params?.profile;
      if (!profile) {
        profile = await ProfileService.getPerfilAtivo();
      }
      setActiveProfile(profile);

      const key = profile ? `@contacts_${profile.id}` : 'contatos_emergencia';
      setStorageKey(key);

      await carregarContatos(key, profile);
    } catch (e) {
      if (__DEV__) console.error('Erro setup contacts', e);
    } finally {
      setLoading(false);
    }
  };

  const carregarContatos = async (key, profile) => {
    try {
      const dados = await Storage.getItem(key);
      if (dados) {
        setContatos(JSON.parse(dados));
      } else {
        if (profile) {
          checkAndProposeImport(key);
        } else {
          setContatos([]);
        }
      }
    } catch (error) {
      if (__DEV__) console.log('Erro ao carregar contatos:', error);
      setContatos([]);
    }
  };

  const checkAndProposeImport = async (currentProfileKey) => {
    try {
      const globalData = await Storage.getItem('contatos_emergencia');
      if (globalData) {
        const globalContacts = JSON.parse(globalData);
        if (globalContacts.length > 0) {
          NeoAlert.alert(
            'Importar Contatos?',
            'Encontramos contatos da família. Deseja importá-los para este perfil para facilitar?',
            [
              { text: 'Não, começar do zero', style: 'cancel' },
              {
                text: 'Sim, importar',
                onPress: async () => {
                  await Storage.setItem(currentProfileKey, JSON.stringify(globalContacts));
                  setContatos(globalContacts);
                },
              },
            ]
          );
        }
      }
    } catch (e) {
      if (__DEV__) console.log('Erro ao verificar importação', e);
    }
  };

  const salvarContatos = async (novosContatos) => {
    if (!storageKey) return;
    try {
      await Storage.setItem(storageKey, JSON.stringify(novosContatos));
      setContatos(novosContatos);
    } catch (error) {
      if (__DEV__) console.log('Erro ao salvar contatos:', error);
    }
  };

  const adicionarContato = () => {
    if (!nome.trim()) {
      NeoAlert.alert('Erro', 'Por favor, informe o nome.');
      return;
    }
    if (!telefone.trim()) {
      NeoAlert.alert('Erro', 'Por favor, informe o telefone.');
      return;
    }

    const novoContato = {
      id: editando?.id || Date.now().toString(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      tipo,
      parentesco: parentesco.trim(),
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
    setParentesco(contato.parentesco || '');
    setModalVisible(true);
  };

  const excluirContato = (id) => {
    NeoAlert.alert(
      'Excluir contato',
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

  const ligarContato = (telefoneNum) => {
    Linking.openURL(`tel:${telefoneNum}`);
  };

  const whatsappContato = (telefoneNum) => {
    const num = telefoneNum.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/55${num}`);
  };

  const smsContato = (telefoneNum) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    Linking.openURL(`sms:${telefoneNum}${separator}body=Olá, preciso de ajuda!`);
  };

  if (loading) {
    return (
      <AppBackground>
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
          {/* Header skeleton — espelhando o padrão da tela carregada */}
          <View style={s.header}>
            <View style={s.backBtn} />
            <View style={{ flex: 1, gap: 6 }}>
              <SkeletonLoader width="60%" height={22} borderRadius={6} />
              <SkeletonLoader width="40%" height={11} />
            </View>
          </View>

          <View style={s.scrollContent}>
            {/* Info card skeleton */}
            <View style={[s.infoCard, { backgroundColor: 'rgba(255,255,255,0.4)' }]}>
              <SkeletonLoader width={38} height={38} borderRadius={19} />
              <View style={{ flex: 1, gap: 6 }}>
                <SkeletonLoader width="55%" height={13} />
                <SkeletonLoader width="85%" height={11} />
              </View>
            </View>

            {/* Add button skeleton */}
            <SkeletonLoader width="100%" height={46} borderRadius={14} style={{ marginBottom: 20 }} />

            {/* Lista — 3 cards */}
            <SkeletonLoader width={64} height={11} style={{ marginBottom: 10 }} />
            <SkeletonContactCard />
            <SkeletonContactCard />
            <SkeletonContactCard />
          </View>
        </SafeAreaView>
      </AppBackground>
    );
  }

  const headerTitle = activeProfile ? `Contatos de ${activeProfile.nome}` : 'Contatos de emergência';
  const headerSubtitle = activeProfile
    ? `Rede de apoio específica`
    : 'Contatos gerais da residência';

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style="dark" />

        {/* HEADER padronizado */}
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={t('common.back', 'Voltar')}
          >
            <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <H1 style={s.title} accessibilityRole="header">{headerTitle}</H1>
            <Caption style={s.subtitle}>{headerSubtitle}</Caption>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* INFO */}
          <NeoCard variant="elevated" style={s.infoCard}>
            <View style={s.infoIconCircle}>
              <NeoIcon name="Lovely" size={18} color={Neo.colors.primary[600]} variant="Bold" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.infoTitle}>
                {t('headersFirst.RedeDeApoio', 'Sua rede de apoio')}
              </Text>
              <Text style={s.infoText}>
                {t('headersFirst.mantenhaEssaListaAtualizadaEmUmaEmergNci', 'Mantenha esta lista atualizada. Em emergências, estes contatos aparecerão no topo.')}
              </Text>
            </View>
          </NeoCard>

          {/* FORM (inline modal) */}
          {modalVisible && (
            <NeoCard variant="elevated" style={s.formCard}>
              <Text style={s.formTitle}>
                {editando ? 'Editar contato' : 'Novo contato'}
              </Text>

              <View style={s.field}>
                <Text style={s.label}>{t('headersFirst.nome', 'Nome')}</Text>
                <TextInput
                  style={s.input}
                  placeholder="Ex: Dr. João Silva"
                  placeholderTextColor={Neo.colors.neutral[500]}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              <View style={s.field}>
                <Text style={s.label}>{t('headersFirst.detalheRelacionamento', 'Detalhe / Relacionamento')}</Text>
                <TextInput
                  style={s.input}
                  placeholder="Ex: Cardiologista, Tio, Vizinho da frente…"
                  placeholderTextColor={Neo.colors.neutral[500]}
                  value={parentesco}
                  onChangeText={setParentesco}
                />
              </View>

              <View style={s.field}>
                <Text style={s.label}>{t('headersFirst.telefone', 'Telefone')}</Text>
                <TextInput
                  style={s.input}
                  placeholder="Ex: (41) 99999-9999"
                  placeholderTextColor={Neo.colors.neutral[500]}
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={s.field}>
                <Text style={s.label}>{t('headersFirst.tipo', 'Tipo')}</Text>
                <View style={s.tiposContainer}>
                  {TIPOS.map((tp) => {
                    const isSelected = tipo === tp;
                    const color = TIPO_COLORS[tp];
                    return (
                      <TouchableOpacity
                        key={tp}
                        style={[
                          s.tipoButton,
                          isSelected && {
                            backgroundColor: color,
                            borderColor: color,
                          },
                        ]}
                        onPress={() => setTipo(tp)}
                      >
                        <NeoIcon
                          name={TIPO_ICONS[tp] || 'Call'}
                          size={14}
                          color={isSelected ? Neo.colors.neutral.white : color}
                          variant="Bold"
                        />
                        <Text
                          style={[
                            s.tipoButtonText,
                            { color: isSelected ? Neo.colors.neutral.white : Neo.colors.neutral[700] },
                          ]}
                        >
                          {tp}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={s.formButtons}>
                <TouchableOpacity style={s.cancelButton} onPress={limparFormulario}>
                  <Text style={s.cancelButtonText}>
                    {t('headersFirst.cancelar', 'Cancelar')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.saveButton} onPress={adicionarContato}>
                  <Text style={s.saveButtonText}>
                    {editando ? 'Atualizar' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </NeoCard>
          )}

          {/* ADD */}
          {!modalVisible && (
            <TouchableOpacity
              style={s.addButton}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={t('headersFirst.adicionarContato', 'Adicionar contato')}
              accessibilityHint={t('contacts.addHint', 'Abre o formulário para cadastrar um novo contato de emergência.')}
            >
              <NeoIcon name="AddCircle" size={20} color={Neo.colors.neutral.white} variant="Bold" />
              <Text style={s.addButtonText}>
                {t('headersFirst.adicionarContato', 'Adicionar contato')}
              </Text>
            </TouchableOpacity>
          )}

          {/* LISTA */}
          {contatos.length > 0 ? (
            <>
              <Text style={s.sectionLabel}>
                LISTA · {contatos.length}
              </Text>
              {contatos.map((contato) => {
                const color = TIPO_COLORS[contato.tipo] || TIPO_COLORS.Outro;
                const renderRightActions = (progress, dragX) => {
                  const scale = dragX.interpolate({
                    inputRange: [-90, -50, 0],
                    outputRange: [1, 0.85, 0],
                    extrapolate: 'clamp',
                  });
                  return (
                    <TouchableOpacity
                      onPress={() => excluirContato(contato.id)}
                      style={s.swipeDeleteAction}
                      accessibilityRole="button"
                      accessibilityLabel={t('contacts.deleteLabel', 'Excluir contato {{name}}', { name: contato.nome })}
                    >
                      <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
                        <NeoIcon name="Trash" size={22} color={Neo.colors.neutral.white} variant="Bold" />
                        <Text style={s.swipeDeleteText}>{t('contacts.swipeDelete', 'Excluir')}</Text>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                };
                return (
                  <Swipeable
                    key={contato.id}
                    renderRightActions={renderRightActions}
                    overshootRight={false}
                    containerStyle={{ marginBottom: 10, borderRadius: 16 }}
                  >
                  <NeoCard
                    variant="elevated"
                    style={[s.contatoCard, { borderLeftWidth: 4, borderLeftColor: color, marginBottom: 0 }]}
                  >
                    <View style={s.contatoInfo}>
                      <View style={[s.contatoIconBox, { backgroundColor: color + '1A' }]}>
                        <NeoIcon
                          name={TIPO_ICONS[contato.tipo] || 'Call'}
                          size={22}
                          color={color}
                          variant="Bold"
                        />
                      </View>
                      <View style={s.contatoTextos}>
                        <Text style={s.contatoNome}>{contato.nome}</Text>
                        {contato.parentesco ? (
                          <Text style={s.contatoSub}>{contato.parentesco}</Text>
                        ) : null}
                        <Text style={s.contatoTelefone}>{contato.telefone}</Text>
                        <View style={[s.contatoBadge, { backgroundColor: color }]}>
                          <Text style={s.contatoBadgeText}>{contato.tipo}</Text>
                        </View>
                      </View>

                      <View style={s.quickActions}>
                        <TouchableOpacity
                          onPress={() => whatsappContato(contato.telefone)}
                          style={[s.quickBtn, { backgroundColor: '#25D366' }]}/* DS: WhatsApp brand color */
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          accessibilityRole="button"
                          accessibilityLabel={t('contacts.whatsappLabel', 'Enviar WhatsApp para {{name}}', { name: contato.nome })}
                          accessibilityHint={t('contacts.whatsappHint', 'Abre o WhatsApp com este contato.')}
                        >
                          <NeoIcon name="MessageText1" size={18} color={Neo.colors.neutral.white} variant="Bold" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => ligarContato(contato.telefone)}
                          style={[s.quickBtn, { backgroundColor: color }]}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          accessibilityRole="button"
                          accessibilityLabel={t('contacts.callLabel', 'Ligar para {{name}}', { name: contato.nome })}
                          accessibilityHint={t('contacts.callHint', 'Inicia uma chamada telefônica para este contato.')}
                        >
                          <NeoIcon name="Call" size={18} color={Neo.colors.neutral.white} variant="Bold" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={s.contatoActions}>
                      <TouchableOpacity
                        style={s.actionLink}
                        onPress={() => smsContato(contato.telefone)}
                        accessibilityRole="button"
                        accessibilityLabel={t('contacts.smsLabel', 'Enviar SMS para {{name}}', { name: contato.nome })}
                      >
                        <NeoIcon name="Sms" size={14} color={Neo.colors.neutral[700]} />
                        <Text style={s.actionLinkText}>SMS</Text>
                      </TouchableOpacity>
                      <View style={{ flex: 1 }} />
                      <TouchableOpacity
                        style={s.actionLink}
                        onPress={() => editarContato(contato)}
                        accessibilityRole="button"
                        accessibilityLabel={t('contacts.editLabel', 'Editar contato {{name}}', { name: contato.nome })}
                      >
                        <NeoIcon name="Edit2" size={14} color={Neo.colors.neutral[700]} />
                        <Text style={s.actionLinkText}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[s.actionLink, { backgroundColor: Neo.colors.feedback.error + '12' }]}
                        onPress={() => excluirContato(contato.id)}
                        accessibilityRole="button"
                        accessibilityLabel={t('contacts.deleteLabel', 'Excluir contato {{name}}', { name: contato.nome })}
                        accessibilityHint={t('contacts.deleteHint', 'Remove permanentemente este contato da lista.')}
                      >
                        <NeoIcon name="Trash" size={14} color={Neo.colors.feedback.error} />
                        <Text style={[s.actionLinkText, { color: Neo.colors.feedback.error }]}>Excluir</Text>
                      </TouchableOpacity>
                    </View>
                  </NeoCard>
                  </Swipeable>
                );
              })}
            </>
          ) : (
            !modalVisible && (
              <EmptyState
                icon="ProfileCircle"
                title={t('headersFirst.nenhumContatoNestaLista', 'Nenhum contato nesta lista')}
                description={`Adicione médicos, parentes ou vizinhos específicos para ${activeProfile?.nome || 'sua casa'}.`}
              />
            )
          )}

          {/* Expectativa do SOS calibrada onde os contatos são gerenciados */}
          <SafetyDisclaimer variant="sos" style={{ marginTop: 16 }} />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Neo.spacing.lg,
    paddingTop: 4,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
    fontSize: 22,
  },
  subtitle: {
    color: Neo.colors.neutral[600],
  },

  scrollContent: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },

  // Info card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 16,
  },
  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Neo.colors.primary[500] + '1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 3,
  },
  infoText: {
    fontSize: 12.5,
    color: Neo.colors.neutral[600],
    lineHeight: 17,
  },

  // Add button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Neo.colors.primary[600],
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  addButtonText: {
    color: Neo.colors.neutral.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.1,
  },

  // Section label
  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  // Form
  formCard: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Neo.colors.neutral[700],
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: Neo.colors.neutral[900],
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  tiposContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tipoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  tipoButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Neo.colors.neutral[700],
    fontSize: 14.5,
    fontWeight: '800',
  },
  saveButton: {
    flex: 1,
    backgroundColor: Neo.colors.primary[600],
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Neo.colors.neutral.white,
    fontSize: 14.5,
    fontWeight: '800',
  },

  // Contato card
  contatoCard: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  contatoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contatoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contatoTextos: {
    flex: 1,
  },
  contatoNome: {
    fontSize: 15.5,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  contatoSub: {
    fontSize: 12.5,
    color: Neo.colors.neutral[600],
    marginBottom: 2,
  },
  contatoTelefone: {
    fontSize: 13,
    color: Neo.colors.neutral[700],
    fontWeight: '600',
    marginBottom: 5,
  },
  contatoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  contatoBadgeText: {
    color: Neo.colors.neutral.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  quickBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contatoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    gap: 10,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  actionLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Neo.colors.neutral[700],
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 300,
  },

  // Swipe-to-delete (revealed action behind the card on swipe-right→left)
  swipeDeleteAction: {
    backgroundColor: Neo.colors.feedback.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  swipeDeleteText: {
    color: Neo.colors.neutral.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginTop: 4,
  },
});
