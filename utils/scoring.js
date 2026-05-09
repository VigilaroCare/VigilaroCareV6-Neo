/**
 * scoring.js
 * Sistema de Pontuação Dinâmica - Vigilaro Care V5
 * Calcula score baseado em ações do usuário
 */

// ============================================
// SISTEMA DE PONTUAÇÃO (Total: 100 pontos)
// ============================================
export const SCORING_SYSTEM = {
  // Checklists completados (20 pontos)
  checklists: {
    weight: 20,
    calculate: (data) => {
      const total = data.totalChecklists || 0;
      const completed = data.completedChecklists || 0;
      if (total === 0) return 0;
      return (completed / total) * 20;
    }
  },
  
  // Perfil cadastrado (15 pontos)
  profiles: {
    weight: 15,
    calculate: (data) => {
      if (!data.hasProfile) return 0;
      const completeness = data.profileCompleteness || 0; // 0-100
      return (completeness / 100) * 15;
    }
  },
  
  // Contatos de emergência (10 pontos)
  emergencyContacts: {
    weight: 10,
    calculate: (data) => {
      const contacts = data.emergencyContacts || 0;
      // Máximo 3 contatos = 10 pontos (3.33 por contato)
      return Math.min(contacts * 3.33, 10);
    }
  },
  
  // Kit de emergência (10 pontos)
  emergencyKit: {
    weight: 10,
    calculate: (data) => {
      if (!data.hasEmergencyKit) return 0;
      const completeness = data.kitCompleteness || 0; // 0-100
      return (completeness / 100) * 10;
    }
  },
  
  // Dispositivos de segurança (10 pontos)
  safetyDevices: {
    weight: 10,
    calculate: (data) => {
      const devices = data.safetyDevices || 0;
      // Máximo 5 dispositivos = 10 pontos (2 por dispositivo)
      return Math.min(devices * 2, 10);
    }
  },
  
  // Educação/Treinamento (15 pontos)
  education: {
    weight: 15,
    calculate: (data) => {
      const completed = data.educationModulesCompleted || 0;
      const total = data.totalEducationModules || 10;
      return (completed / total) * 15;
    }
  },
  
  // Alertas configurados (10 pontos)
  alerts: {
    weight: 10,
    calculate: (data) => {
      return data.hasActiveAlerts ? 10 : 0;
    }
  },
  
  // Mapeamento de zonas (10 pontos)
  zoneMapping: {
    weight: 10,
    calculate: (data) => {
      const zones = data.mappedZones || 0;
      // Máximo 3 zonas = 10 pontos (3.33 por zona)
      return Math.min(zones * 3.33, 10);
    }
  },
};

// ============================================
// CALCULAR PONTUAÇÃO TOTAL
// ============================================
export const calculateScore = (userData) => {
  let totalScore = 0;
  
  for (const [key, config] of Object.entries(SCORING_SYSTEM)) {
    const score = config.calculate(userData);
    totalScore += score;
  }
  
  return Math.round(Math.min(totalScore, 100));
};

// ============================================
// OBTER STATUS BASEADO NA PONTUAÇÃO
// ============================================
export const getScoreStatus = (score) => {
  if (score >= 85) {
    return { 
      text: 'Excelente', 
      color: '#4CAF50',
      emoji: '🎉'
    };
  }
  if (score >= 70) {
    return { 
      text: 'Muito Bom', 
      color: '#8BC34A',
      emoji: '👍'
    };
  }
  if (score >= 50) {
    return { 
      text: 'Bom', 
      color: '#FF9800',
      emoji: '⚠️'
    };
  }
  if (score >= 30) {
    return { 
      text: 'Regular', 
      color: '#FF5722',
      emoji: '📋'
    };
  }
  return { 
    text: 'Precisa Melhorar', 
    color: '#F44336',
    emoji: '🚨'
  };
};

// ============================================
// CALCULAR DETALHES POR CATEGORIA
// ============================================
export const getScoreBreakdown = (userData) => {
  const breakdown = [];
  
  for (const [key, config] of Object.entries(SCORING_SYSTEM)) {
    const score = config.calculate(userData);
    breakdown.push({
      category: key,
      score: Math.round(score),
      maxScore: config.weight,
      percentage: Math.round((score / config.weight) * 100)
    });
  }
  
  return breakdown;
};

// ============================================
// OBTER SUGESTÕES DE MELHORIA
// ============================================
export const getSuggestions = (userData) => {
  const suggestions = [];
  
  // Checklist
  if ((userData.completedChecklists || 0) < (userData.totalChecklists || 0)) {
    suggestions.push({
      icon: '✓',
      text: 'Complete mais checklists de segurança',
      action: 'ChecklistTab'
    });
  }
  
  // Perfil
  if (!userData.hasProfile || (userData.profileCompleteness || 0) < 100) {
    suggestions.push({
      icon: '👤',
      text: 'Complete seu perfil de segurança',
      action: 'PerfilTab'
    });
  }
  
  // Contatos
  if ((userData.emergencyContacts || 0) < 3) {
    suggestions.push({
      icon: '📞',
      text: 'Adicione contatos de emergência',
      action: 'ContatosEmergencia'
    });
  }
  
  // Kit
  if (!userData.hasEmergencyKit) {
    suggestions.push({
      icon: '🎒',
      text: 'Monte seu kit de emergência',
      action: 'KitEmergencia'
    });
  }
  
  // Dispositivos
  if ((userData.safetyDevices || 0) < 3) {
    suggestions.push({
      icon: '🔒',
      text: 'Configure dispositivos de segurança',
      action: 'DispositivosSeguranca'
    });
  }
  
  // Limitar a 3 sugestões
  return suggestions.slice(0, 3);
};

// ============================================
// FUNÇÕES HELPER
// ============================================

// Incrementar contador de checklist completo
export const incrementCompletedChecklists = (currentData) => {
  return {
    ...currentData,
    completedChecklists: (currentData.completedChecklists || 0) + 1,
    totalChecklists: Math.max(
      currentData.totalChecklists || 0,
      (currentData.completedChecklists || 0) + 1
    )
  };
};

// Adicionar contato de emergência
export const addEmergencyContact = (currentData) => {
  return {
    ...currentData,
    emergencyContacts: (currentData.emergencyContacts || 0) + 1
  };
};

// Completar módulo educacional
export const completeEducationModule = (currentData) => {
  return {
    ...currentData,
    educationModulesCompleted: (currentData.educationModulesCompleted || 0) + 1
  };
};

// Adicionar dispositivo de segurança
export const addSafetyDevice = (currentData) => {
  return {
    ...currentData,
    safetyDevices: (currentData.safetyDevices || 0) + 1
  };
};
