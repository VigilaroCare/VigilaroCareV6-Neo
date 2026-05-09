/**
 * userData.js
 * Gerenciamento de Dados do Usuário com AsyncStorage
 * Vigilaro Care V5
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// CONSTANTES
// ============================================
const STORAGE_KEY = '@vigilaro_user_data';

// ============================================
// ESTRUTURA DE DADOS PADRÃO
// ============================================
const getDefaultUserData = () => ({
  // Checklists
  totalChecklists: 5,
  completedChecklists: 0,
  
  // Perfil
  hasProfile: false,
  profileCompleteness: 0, // 0-100
  
  // Emergência
  emergencyContacts: 0, // Máximo recomendado: 3
  hasEmergencyKit: false,
  kitCompleteness: 0, // 0-100
  
  // Segurança
  safetyDevices: 0, // Máximo recomendado: 5
  mappedZones: 0, // Máximo recomendado: 3
  hasActiveAlerts: false,
  
  // Educação
  educationModulesCompleted: 0,
  totalEducationModules: 10,
  
  // Metadados
  lastUpdated: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  version: '5.0.0',
});

// ============================================
// SALVAR DADOS
// ============================================
export const saveUserData = async (data) => {
  try {
    const updatedData = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    
    const jsonValue = JSON.stringify(updatedData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    
    console.log('✅ Dados salvos com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar dados:', error);
    return false;
  }
};

// ============================================
// CARREGAR DADOS
// ============================================
export const loadUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (jsonValue === null) {
      console.log('ℹ️ Nenhum dado encontrado. Usando dados padrão.');
      const defaultData = getDefaultUserData();
      await saveUserData(defaultData);
      return defaultData;
    }
    
    const data = JSON.parse(jsonValue);
    console.log('✅ Dados carregados com sucesso');
    return data;
    
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
    return getDefaultUserData();
  }
};

// ============================================
// ATUALIZAR DADOS (PARCIAL)
// ============================================
export const updateUserData = async (partialData) => {
  try {
    const currentData = await loadUserData();
    const updatedData = {
      ...currentData,
      ...partialData,
      lastUpdated: new Date().toISOString(),
    };
    
    await saveUserData(updatedData);
    return updatedData;
  } catch (error) {
    console.error('❌ Erro ao atualizar dados:', error);
    return null;
  }
};

// ============================================
// RESETAR DADOS
// ============================================
export const resetUserData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('✅ Dados resetados com sucesso');
    return getDefaultUserData();
  } catch (error) {
    console.error('❌ Erro ao resetar dados:', error);
    return null;
  }
};

// ============================================
// FUNÇÕES DE ATUALIZAÇÃO ESPECÍFICAS
// ============================================

// Marcar checklist como completo
export const markChecklistComplete = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    completedChecklists: (currentData.completedChecklists || 0) + 1,
  };
  return await updateUserData(updatedData);
};

// Adicionar contato de emergência
export const addEmergencyContact = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    emergencyContacts: Math.min((currentData.emergencyContacts || 0) + 1, 10),
  };
  return await updateUserData(updatedData);
};

// Remover contato de emergência
export const removeEmergencyContact = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    emergencyContacts: Math.max((currentData.emergencyContacts || 0) - 1, 0),
  };
  return await updateUserData(updatedData);
};

// Atualizar completude do perfil
export const updateProfileCompleteness = async (percentage) => {
  return await updateUserData({ 
    hasProfile: percentage > 0,
    profileCompleteness: Math.min(Math.max(percentage, 0), 100) 
  });
};

// Configurar kit de emergência
export const updateEmergencyKit = async (completeness) => {
  return await updateUserData({
    hasEmergencyKit: completeness > 0,
    kitCompleteness: Math.min(Math.max(completeness, 0), 100),
  });
};

// Adicionar dispositivo de segurança
export const addSafetyDevice = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    safetyDevices: Math.min((currentData.safetyDevices || 0) + 1, 20),
  };
  return await updateUserData(updatedData);
};

// Remover dispositivo de segurança
export const removeSafetyDevice = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    safetyDevices: Math.max((currentData.safetyDevices || 0) - 1, 0),
  };
  return await updateUserData(updatedData);
};

// Completar módulo educacional
export const completeEducationModule = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    educationModulesCompleted: Math.min(
      (currentData.educationModulesCompleted || 0) + 1,
      currentData.totalEducationModules || 10
    ),
  };
  return await updateUserData(updatedData);
};

// Adicionar zona mapeada
export const addMappedZone = async () => {
  const currentData = await loadUserData();
  const updatedData = {
    ...currentData,
    mappedZones: Math.min((currentData.mappedZones || 0) + 1, 10),
  };
  return await updateUserData(updatedData);
};

// Ativar/Desativar alertas
export const toggleAlerts = async (enabled) => {
  return await updateUserData({ hasActiveAlerts: enabled });
};

// ============================================
// FUNÇÕES DE DEBUG
// ============================================

// Ver todos os dados (para debug)
export const debugShowAllData = async () => {
  const data = await loadUserData();
  console.log('📊 Dados do usuário:', JSON.stringify(data, null, 2));
  return data;
};

// Popular com dados de exemplo (para teste)
export const populateWithTestData = async () => {
  const testData = {
    totalChecklists: 5,
    completedChecklists: 3,
    hasProfile: true,
    profileCompleteness: 75,
    emergencyContacts: 2,
    hasEmergencyKit: true,
    kitCompleteness: 60,
    safetyDevices: 4,
    mappedZones: 2,
    hasActiveAlerts: true,
    educationModulesCompleted: 5,
    totalEducationModules: 10,
  };
  
  await saveUserData(testData);
  console.log('✅ Dados de teste populados');
  return testData;
};

// ============================================
// EXPORTAR FUNÇÕES
// ============================================
export default {
  saveUserData,
  loadUserData,
  updateUserData,
  resetUserData,
  markChecklistComplete,
  addEmergencyContact,
  removeEmergencyContact,
  updateProfileCompleteness,
  updateEmergencyKit,
  addSafetyDevice,
  removeSafetyDevice,
  completeEducationModule,
  addMappedZone,
  toggleAlerts,
  debugShowAllData,
  populateWithTestData,
};
