/**
 * VitalCheckService.js
 * Monitora o bem-estar do usuário via notificações periódicas agendadas.
 *
 * Regra 3: Este serviço NUNCA navega diretamente.
 *   Ao expirar a janela sem resposta, chama this.onEscalate({ reason })
 *   e a UI decide a rota.
 * Regra 5: Nenhum dado pessoal hardcoded.
 *   O nome do usuário é sempre lido do storage seguro em tempo de execução.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Storage } from '../utils/SecureStorage';

const VITAL_CHECK_CONFIG_KEY = '@vital_check_config';
const VIGILARO_DATA_KEY = '@vigilaro_data';
const NOTIFICATION_TYPE = 'VITAL_CHECK_REQUEST';

const DEFAULT_CONFIG = {
  enabled: true,
  checkTimes: ['09:00', '15:00', '21:00'],
  responseWindow: 15, // minutos
};

const MAX_CHECK_TIMES = 10;
const TIME_REGEX = /^\d{2}:\d{2}$/;

class VitalCheckService {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.onEscalate = null;
    this.escalateTimeout = null;
    this.scheduledIds = [];
    this.initialized = false;
    this._notificationListener = null;
  }

  // ---------------------------------------------------------------------------
  // INICIALIZAÇÃO
  // ---------------------------------------------------------------------------

  async init(onEscalate) {
    if (typeof onEscalate !== 'function') {
      if (__DEV__) { console.error('[VitalCheckService] onEscalate deve ser uma função'); }
      return;
    }

    if (this.initialized) {
      if (__DEV__) {
        console.warn('[VitalCheckService] init: já inicializado, ignorando chamada duplicada.');
      }
      return;
    }

    this.onEscalate = onEscalate;
    await this._loadConfig();

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      if (__DEV__) {
        console.warn('[VitalCheckService] init: permissão de notificações negada, serviço desativado.');
      }
      return;
    }

    this._notificationListener = Notifications.addNotificationResponseReceivedListener(response => {
      const type = response.notification.request.content.data?.type;
      if (type === NOTIFICATION_TYPE) {
        this.confirmWellBeing();
      }
    });

    await this._scheduleNextChecks();
    this.initialized = true;

    if (__DEV__) {
      console.log('[VitalCheckService] ✅ Serviço inicializado:', this.getStatus());
    }
  }

  // ---------------------------------------------------------------------------
  // CONFIGURAÇÃO
  // ---------------------------------------------------------------------------

  async _loadConfig() {
    try {
      const data = await AsyncStorage.getItem(VITAL_CHECK_CONFIG_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.config = { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      if (__DEV__) {
        console.warn('[VitalCheckService] _loadConfig: erro ao carregar configuração:', e?.message);
      }
      this.config = { ...DEFAULT_CONFIG };
    }
  }

  async _saveConfig() {
    try {
      await AsyncStorage.setItem(VITAL_CHECK_CONFIG_KEY, JSON.stringify(this.config));
    } catch (e) {
      if (__DEV__) { console.error('[VitalCheckService] _saveConfig: erro ao salvar configuração:', e?.message); }
    }
  }

  async updateConfig(newConfig) {
    if (newConfig.checkTimes !== undefined) {
      if (!Array.isArray(newConfig.checkTimes)) {
        if (__DEV__) { console.error('[VitalCheckService] updateConfig: checkTimes deve ser um array'); }
        return;
      }

      // Remove duplicatas
      const uniqueTimes = [...new Set(newConfig.checkTimes)];

      if (uniqueTimes.length > MAX_CHECK_TIMES) {
        if (__DEV__) { console.error(`[VitalCheckService] updateConfig: máximo ${MAX_CHECK_TIMES} horários permitidos`); }
        return;
      }

      const allValid = uniqueTimes.every(t => TIME_REGEX.test(t));
      if (!allValid) {
        if (__DEV__) { console.error('[VitalCheckService] updateConfig: checkTimes contém formato inválido (esperado HH:MM)'); }
        return;
      }

      newConfig.checkTimes = uniqueTimes;
    }

    this.config = { ...this.config, ...newConfig };
    await this._saveConfig();

    if (this.initialized && this.config.enabled) {
      await this._scheduleNextChecks();
    } else if (!this.config.enabled) {
      await this._cancelOwn();
    }

    if (__DEV__) {
      console.log('[VitalCheckService] ⚙️ Config atualizada:', this.config);
    }
  }

  // ---------------------------------------------------------------------------
  // AGENDAMENTO
  // ---------------------------------------------------------------------------

  async _cancelOwn() {
    for (const id of this.scheduledIds) {
      try {
        await Notifications.cancelScheduledNotificationAsync(id);
      } catch {
        // Já cancelada ou expirada — ignorar
      }
    }
    this.scheduledIds = [];
  }

  async _scheduleNextChecks() {
    await this._cancelOwn();

    if (!this.config.enabled) {
      if (__DEV__) {
        console.log('[VitalCheckService] _scheduleNextChecks: monitoramento desativado.');
      }
      return;
    }

    for (const timeStr of this.config.checkTimes) {
      try {
        const [hour, minute] = timeStr.split(':').map(Number);
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Vigilaro Care — Check-in',
            body: 'Olá! Tudo bem por aí? Toque aqui para confirmar.',
            data: { type: NOTIFICATION_TYPE },
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: {
            hour,
            minute,
            repeats: true,
            channelId: 'default'
          },
        });

        if (id) {
          this.scheduledIds.push(id);
          if (__DEV__) {
            console.log(`[VitalCheckService] 📅 Agendado ${timeStr} → id: ${id}`);
          }
        } else {
          if (__DEV__) { console.error(`[VitalCheckService] ❌ Falha ao agendar ${timeStr}`); }
        }
      } catch (e) {
        if (__DEV__) {
          console.warn(`[VitalCheckService] _scheduleNextChecks: erro ao agendar ${timeStr}:`, e?.message);
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // CONFIRMAÇÃO DE BEM-ESTAR
  // ---------------------------------------------------------------------------

  confirmWellBeing() {
    if (__DEV__) {
      console.log('[VitalCheckService] 🙋 Usuário confirmou que está bem.');
    }
    if (this.escalateTimeout) {
      clearTimeout(this.escalateTimeout);
      this.escalateTimeout = null;
    }
  }

  // ---------------------------------------------------------------------------
  // CHECK IMEDIATO
  // ---------------------------------------------------------------------------

  async triggerCheck() {
    if (__DEV__) {
      console.log('[VitalCheckService] Disparando verificação de segurança...');
    }

    // [FIX-A02] Lê nome do usuário da estrutura real do ProfileService (@vigilaro_data)
    let userName = '';
    try {
      const profileRaw = await Storage.getItem(VIGILARO_DATA_KEY);
      if (profileRaw) {
        const data = JSON.parse(profileRaw);
        // Busca o perfil ativo na estrutura unificada
        const perfis = data.perfis || [];
        const perfilAtivo = perfis.find(p => p.ativo) || perfis[0];
        userName = perfilAtivo?.nome?.trim() || '';
      }
    } catch {
      // Nome indisponível — usa saudação genérica
    }

    const greeting = userName
      ? `Olá, ${userName}! Tudo bem por aí?`
      : 'Olá! Gostaria de confirmar se está tudo bem por aí.';

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Vigilaro Care — Check-in',
          body: greeting,
          data: { type: NOTIFICATION_TYPE },
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Imediato
      });
    } catch (e) {
      if (__DEV__) {
        console.warn('[VitalCheckService] triggerCheck: erro ao enviar notificação:', e?.message);
      }
    }

    // Limpa timeout anterior antes de criar novo — evita escalates duplicados
    if (this.escalateTimeout) {
      clearTimeout(this.escalateTimeout);
      this.escalateTimeout = null;
    }

    const windowMs = (this.config.responseWindow || 15) * 60 * 1000;

    this.escalateTimeout = setTimeout(() => {
      if (__DEV__) {
        console.warn('[VitalCheckService] ⏰ Janela de resposta expirada. Escalando...');
      }
      // Nunca navega diretamente — notifica a UI via callback (Regra 3)
      try {
        if (typeof this.onEscalate === 'function') {
          this.onEscalate({ reason: 'VITAL_CHECK_NO_RESPONSE', timestamp: Date.now() });
        }
      } catch (error) {
        if (__DEV__) { console.error('[VitalCheckService] Erro ao executar callback onEscalate:', error?.message); }
      }
      this.escalateTimeout = null;
    }, windowMs);
  }

  // ---------------------------------------------------------------------------
  // STATUS
  // ---------------------------------------------------------------------------

  getStatus() {
    return {
      isInitialized: this.initialized,
      isEnabled: this.config.enabled,
      checkTimes: [...this.config.checkTimes],
      responseWindow: this.config.responseWindow,
      scheduledCount: this.scheduledIds.length,
      hasEscalateTimeout: !!this.escalateTimeout,
    };
  }

  // ---------------------------------------------------------------------------
  // LOGOUT / CLEANUP
  // ---------------------------------------------------------------------------

  async logout() {
    if (this._notificationListener) {
      this._notificationListener.remove();
      this._notificationListener = null;
    }

    await this._cancelOwn();

    if (this.escalateTimeout) {
      clearTimeout(this.escalateTimeout);
      this.escalateTimeout = null;
    }

    this.onEscalate = null;
    this.initialized = false;
    // Reseta config para DEFAULT — permite reinicialização limpa após novo login
    this.config = { ...DEFAULT_CONFIG };

    if (__DEV__) {
      console.log('[VitalCheckService] 🚪 Logout concluído.');
    }
  }
}

export default new VitalCheckService();
