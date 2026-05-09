/**
 * FallDetectionService.js
 * Detecta quedas via acelerômetro e notifica a UI via callback.
 *
 * ⚠️ REGRA CRÍTICA — ARQUITETURA DE SEPARAÇÃO ⚠️
 * Este serviço NUNCA navega diretamente. Ao confirmar uma queda,
 * chama this.onFallDetected({ reason, magnitude }) e a UI decide o que fazer.
 *
 * ALGORITMO DE DETECÇÃO:
 * 1. Queda Livre: magnitude < 0.3G por período prolongado
 * 2. Impacto: magnitude > 3.8G dentro de 1s após queda livre
 * 3. Imobilidade: variação < 0.5G por 5s após impacto
 *
 * FEATURES:
 * - Singleton pattern (instância única)
 * - Throttling inteligente (25Hz)
 * - Configuração ajustável em runtime
 * - Proteção contra notificações duplicadas
 * - Cleanup completo de recursos
 * - Permissões tratadas corretamente
 */

import { Accelerometer } from 'expo-sensors';
import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// PERMISSÕES DE MOTION (expo-sensors SDK 47+)
// ---------------------------------------------------------------------------
let requestPermissions = null;
try {
  const sensors = require('expo-sensors');
  if (sensors.Accelerometer && sensors.Accelerometer.requestPermissionsAsync) {
    requestPermissions = sensors.Accelerometer.requestPermissionsAsync.bind(
      sensors.Accelerometer
    );
  } else if (sensors.Motion && sensors.Motion.requestPermissionsAsync) {
    requestPermissions = sensors.Motion.requestPermissionsAsync.bind(
      sensors.Motion
    );
  }
} catch (_) {
  // Fallback: assumir que a permissão existe (Android < 13 / iOS sem CMMotion)
}

// ---------------------------------------------------------------------------
// CLASSE PRINCIPAL
// ---------------------------------------------------------------------------
class FallDetectionService {
  constructor() {
    this.subscription = null;
    this.lastData = { x: 0, y: 0, z: 0 };
    this.magnitude = 0;
    this._lastProcessedAt = 0; // Throttle: timestamp do último processamento
    this._notificationInProgress = false; // Previne notificações duplicadas
    this._notificationCooldown = 10000; // 10s entre notificações

    // Configurações de sensibilidade (podem ser ajustadas via updateConfig)
    this.config = {
      freefallThreshold: 0.3, // G - threshold para detectar queda livre
      impactThreshold: 3.8, // G - threshold para detectar impacto
      immobilityThreshold: 0.5, // G - variação máxima para considerar imóvel
      detectionWindow: 1000, // ms - janela entre queda livre e impacto
      immobilityWindow: 5000, // ms - tempo de imobilidade após impacto
      impactRebounceWindow: 500, // ms - aguarda rebote do impacto
      throttleMs: 40, // ms - mínimo entre leituras processadas (25Hz)
    };

    // Máquina de estados
    this.state = {
      isFalling: false,
      fallStartTime: 0,
      hasImpacted: false,
      impactTime: 0,
      checkImmobility: false,
    };

    // Callback para notificar UI
    this.onFallDetected = null;
  }

  // -------------------------------------------------------------------------
  // MÉTODOS PÚBLICOS
  // -------------------------------------------------------------------------

  /**
   * Inicia o monitoramento de quedas.
   *
   * @param {function} callback - Chamado com { reason, magnitude } ao confirmar queda
   * @returns {Promise<boolean>} true se iniciado com sucesso, false se falhou
   *
   * @example
   * const started = await fallDetectionService.start(({ reason, magnitude }) => {
   *   console.log(`Queda detectada: ${reason}, magnitude: ${magnitude}G`);
   * });
   */
  async start(callback) {
    // Validação de callback
    if (typeof callback !== 'function') {
      if (__DEV__) {
        console.error(
          '[FallDetectionService] start: callback deve ser uma função'
        );
      }
      return false;
    }

    // Guarda de instância única — evita vazamento de memória por múltiplas subscriptions
    if (this.subscription) {
      if (__DEV__) {
        console.warn(
          '[FallDetectionService] start: já existe uma subscription ativa. Use stop() antes de reiniciar.'
        );
      }
      return false;
    }

    this.onFallDetected = callback;

    // Verifica disponibilidade do sensor no dispositivo
    let isAvailable = false;
    try {
      isAvailable = await Accelerometer.isAvailableAsync();
    } catch (error) {
      if (__DEV__) {
        console.error(
          '[FallDetectionService] start: erro ao verificar disponibilidade:',
          error?.message || error
        );
      }
      isAvailable = false;
    }

    if (!isAvailable) {
      if (__DEV__) {
        console.warn(
          '[FallDetectionService] start: acelerômetro não disponível neste dispositivo'
        );
      }
      return false;
    }

    // Solicita permissão de movimento (obrigatório no iOS e Android 13+)
    if (requestPermissions) {
      try {
        const { status } = await requestPermissions();
        if (status !== 'granted') {
          if (__DEV__) {
            console.warn(
              '[FallDetectionService] start: permissão de movimento negada'
            );
          }
          return false;
        }
      } catch (error) {
        // Se a API de permissão não existir na versão do SDK, prosseguir
        if (__DEV__) {
          console.warn(
            '[FallDetectionService] start: erro ao solicitar permissão:',
            error?.message || error
          );
        }
      }
    }

    // Configura taxa de atualização: 40ms = ~25Hz
    // Metade do consumo de bateria sem perda relevante de precisão
    Accelerometer.setUpdateInterval(this.config.throttleMs);

    // Inicia listener
    this.subscription = Accelerometer.addListener((data) => {
      this._processData(data);
    });

    if (__DEV__) {
      console.log(
        `[FallDetectionService] ✅ Monitoramento iniciado (${1000 / this.config.throttleMs}Hz)`
      );
    }

    return true;
  }

  /**
   * Encerra o monitoramento de quedas e limpa recursos.
   *
   * @returns {void}
   */
  stop() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }

    // Cleanup completo
    this.onFallDetected = null;
    this._notificationInProgress = false;
    this.resetState();

    if (__DEV__) {
      console.log('[FallDetectionService] ⏹️ Monitoramento encerrado');
    }
  }

  /**
   * Atualiza configurações de sensibilidade em runtime.
   *
   * @param {object} newConfig - Objeto com configurações a serem atualizadas
   * @returns {void}
   *
   * @example
   * service.updateConfig({
   *   freefallThreshold: 0.4,
   *   impactThreshold: 3.5,
   * });
   */
  updateConfig(newConfig) {
    if (typeof newConfig !== 'object' || newConfig === null) {
      if (__DEV__) {
        console.error(
          '[FallDetectionService] updateConfig: newConfig deve ser um objeto'
        );
      }
      return;
    }

    this.config = { ...this.config, ...newConfig };

    // Se throttleMs foi alterado e há subscription ativa, atualizar
    if (this.subscription && newConfig.throttleMs) {
      Accelerometer.setUpdateInterval(this.config.throttleMs);
    }

    if (__DEV__) {
      console.log('[FallDetectionService] ⚙️ Config atualizada:', this.config);
    }
  }

  /**
   * Retorna o status atual do serviço.
   *
   * @returns {object} Status detalhado
   */
  getStatus() {
    return {
      isActive: !!this.subscription,
      currentState: { ...this.state },
      currentMagnitude: this.magnitude,
      lastData: { ...this.lastData },
      config: { ...this.config },
      notificationInProgress: this._notificationInProgress,
    };
  }

  /**
   * Verifica se o serviço está ativo.
   *
   * @returns {boolean}
   */
  isActive() {
    return !!this.subscription;
  }

  /**
   * Reseta a máquina de estados (útil para testes ou cancelamento manual).
   *
   * @returns {void}
   */
  resetState() {
    this.state = {
      isFalling: false,
      fallStartTime: 0,
      hasImpacted: false,
      impactTime: 0,
      checkImmobility: false,
    };
    this.magnitude = 0;
    this.lastData = { x: 0, y: 0, z: 0 };

    if (__DEV__) {
      console.log('[FallDetectionService] 🔄 Estado resetado');
    }
  }

  // -------------------------------------------------------------------------
  // MÉTODOS PRIVADOS
  // -------------------------------------------------------------------------

  /**
   * Processa dados do acelerômetro e executa algoritmo de detecção.
   *
   * @private
   * @param {object} data - { x, y, z } em unidades G
   */
  _processData(data) {
    // Throttle: ignorar leituras antes do intervalo mínimo
    const now = Date.now();
    if (now - this._lastProcessedAt < this.config.throttleMs) {
      return;
    }
    this._lastProcessedAt = now;

    const { x, y, z } = data;

    // Magnitude em G (expo-sensors retorna em unidades G)
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    this.magnitude = magnitude;

    // -------------------------------------------------------------------------
    // FASE 1: DETECTAR QUEDA LIVRE
    // -------------------------------------------------------------------------
    if (magnitude < this.config.freefallThreshold && !this.state.isFalling) {
      if (__DEV__) {
        console.log(
          `[FallDetectionService] 🪂 Queda livre detectada (${magnitude.toFixed(3)}G)`
        );
      }
      this.state.isFalling = true;
      this.state.fallStartTime = now;
    }

    // -------------------------------------------------------------------------
    // FASE 2: DETECTAR IMPACTO (dentro da janela de tempo)
    // -------------------------------------------------------------------------
    if (this.state.isFalling && magnitude > this.config.impactThreshold) {
      const timeSinceFall = now - this.state.fallStartTime;

      if (timeSinceFall < this.config.detectionWindow) {
        if (__DEV__) {
          console.log(
            `[FallDetectionService] 💥 Impacto detectado (${magnitude.toFixed(3)}G, ${timeSinceFall}ms após queda)`
          );
        }
        this.state.hasImpacted = true;
        this.state.impactTime = now;
        this.state.checkImmobility = true;
        this.state.isFalling = false;
      } else {
        // Janela de tempo expirou — não é queda relevante
        if (__DEV__) {
          console.log(
            `[FallDetectionService] ⚠️ Janela de detecção expirada (${timeSinceFall}ms)`
          );
        }
        this.state.isFalling = false;
      }
    }

    // -------------------------------------------------------------------------
    // FASE 3: CHECAR IMOBILIDADE APÓS IMPACTO
    // -------------------------------------------------------------------------
    if (this.state.checkImmobility) {
      const timeSinceImpact = now - this.state.impactTime;

      // Aguarda rebote do impacto antes de checar imobilidade
      if (timeSinceImpact > this.config.impactRebounceWindow) {
        const variation = Math.abs(magnitude - 1); // Diferença do repouso (1G)

        if (variation > this.config.immobilityThreshold) {
          // Usuário se moveu — cancela alerta
          if (__DEV__) {
            console.log(
              `[FallDetectionService] 🚶 Movimento detectado (variação: ${variation.toFixed(3)}G). Cancelando alerta.`
            );
          }
          this.resetState();
        } else if (timeSinceImpact > this.config.immobilityWindow) {
          // Imobilidade confirmada — notifica UI via callback
          this._confirmFall(magnitude);
        }
      }
    }

    this.lastData = data;
  }

  /**
   * Confirma queda e notifica callback (com proteção contra duplicatas).
   *
   * @private
   * @param {number} magnitude - Magnitude do impacto em G
   */
  _confirmFall(magnitude) {
    // Proteção contra notificações duplicadas
    if (this._notificationInProgress) {
      if (__DEV__) {
        console.warn(
          '[FallDetectionService] ⚠️ Notificação já em progresso, ignorando'
        );
      }
      return;
    }

    this._notificationInProgress = true;

    if (__DEV__) {
      console.log(
        `[FallDetectionService] 🚨 QUEDA CONFIRMADA (${magnitude.toFixed(3)}G)`
      );
    }

    // Notifica callback com tratamento de erro
    if (typeof this.onFallDetected === 'function') {
      try {
        this.onFallDetected({
          reason: 'FALL_CONFIRMED_IMMOBILITY',
          magnitude: parseFloat(magnitude.toFixed(3)),
          timestamp: Date.now(),
          platform: Platform.OS,
        });
      } catch (error) {
        if (__DEV__) {
          console.error(
            '[FallDetectionService] ❌ Erro ao executar callback:',
            error
          );
        }
      }
    }

    // Reset estado após notificação
    this.resetState();

    // Libera flag após cooldown
    setTimeout(() => {
      this._notificationInProgress = false;
    }, this._notificationCooldown);
  }
}

// ---------------------------------------------------------------------------
// SINGLETON EXPORT
// ---------------------------------------------------------------------------
const fallDetectionService = new FallDetectionService();
export default fallDetectionService;
