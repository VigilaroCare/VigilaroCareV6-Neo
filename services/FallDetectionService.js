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

import { Accelerometer, Gyroscope } from 'expo-sensors';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------------------------------------------------------------------------
// HEURÍSTICAS DE "CELULAR CAINDO"
// Estes parâmetros NÃO são por-preset — são heurísticas defensivas que
// reduzem falsos positivos do tipo "o celular caiu da mesa, não a pessoa".
//
// Sinal 1: rotação caótica durante a queda
//   Se o giroscópio registrar pico angular > GYRO_CHAOS_THRESHOLD em
//   pelo menos 2 dos 3 eixos durante a janela [queda livre → impacto],
//   classifica como celular girando no ar.
//
// Sinal 2: repouso prolongado prévio
//   Se nos últimos PRE_FALL_REST_WINDOW_MS antes da queda livre a magnitude
//   do acelerômetro variou < PRE_FALL_REST_VARIATION (celular parado em
//   superfície), classifica como celular tombando da superfície.
//
// Qualquer um dos dois sinais positivos => suprime o alerta.
// ---------------------------------------------------------------------------
const GYRO_CHAOS_THRESHOLD = 5.0; // rad/s — pico angular típico de objeto girando
const GYRO_CHAOS_AXES_MIN = 2;    // n.º de eixos que precisam ultrapassar
const PRE_FALL_REST_WINDOW_MS = 30000; // 30s antes da queda livre
const PRE_FALL_REST_VARIATION = 0.08;  // G — variação max para considerar "parado"
const ACC_HISTORY_SAMPLES = 750;  // ~30s a 25Hz

// ---------------------------------------------------------------------------
// PRESETS DE SENSIBILIDADE
// Cada preset ajusta os 4 thresholds principais. O usuário escolhe na
// tela FallSensitivityScreen. A chave persistida é '@vigilaro/fall_sensitivity'
// e '@vigilaro/fall_detection_enabled' para o toggle on/off.
// ---------------------------------------------------------------------------
export const SENSITIVITY_PRESETS = {
  high: {
    freefallThreshold: 0.35,
    impactThreshold: 3.2,
    immobilityThreshold: 0.6,
    immobilityWindow: 4000,
    detectionWindow: 1200,
    impactRebounceWindow: 500,
    throttleMs: 40,
  },
  medium: {
    freefallThreshold: 0.3,
    impactThreshold: 3.8,
    immobilityThreshold: 0.5,
    immobilityWindow: 5000,
    detectionWindow: 1000,
    impactRebounceWindow: 500,
    throttleMs: 40,
  },
  low: {
    freefallThreshold: 0.2,
    impactThreshold: 4.5,
    immobilityThreshold: 0.35,
    immobilityWindow: 7000,
    detectionWindow: 800,
    impactRebounceWindow: 500,
    throttleMs: 40,
  },
};

const STORAGE_KEY_PRESET = '@vigilaro/fall_sensitivity';
const STORAGE_KEY_ENABLED = '@vigilaro/fall_detection_enabled';
const DEFAULT_PRESET = 'medium';

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

    // Preset ativo (lido de AsyncStorage no boot via loadPersistedConfig)
    this.currentPreset = DEFAULT_PRESET;
    this.isEnabledByUser = true; // toggle de "Desligar detecção"

    // Configurações de sensibilidade (preset 'medium' por padrão)
    this.config = { ...SENSITIVITY_PRESETS[DEFAULT_PRESET] };

    // Máquina de estados
    this.state = {
      isFalling: false,
      fallStartTime: 0,
      hasImpacted: false,
      impactTime: 0,
      checkImmobility: false,
    };

    // Buffers para heurística de "celular caindo"
    // accHistory: { t, magnitude } circular, ~30s a 25Hz
    // gyroPeak: pico de |ω| em cada eixo durante queda livre + impacto
    this.accHistory = [];
    this.gyroSubscription = null;
    this.gyroPeak = { x: 0, y: 0, z: 0 };
    this.gyroPeakActive = false; // true durante a janela queda livre → 200ms pós-impacto

    // Estatísticas de supressão (para debug/telemetria)
    this.suppressionStats = {
      suppressedByGyro: 0,
      suppressedByRest: 0,
      confirmed: 0,
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

    // Usuário desativou a detecção no menu de Sensibilidade — não iniciar
    if (!this.isEnabledByUser) {
      if (__DEV__) {
        console.log(
          '[FallDetectionService] start: detecção desativada pelo usuário (Sensibilidade > Desligar)'
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

    // Inicia giroscópio em paralelo (mesma frequência) — usado pela
    // heurística de "celular caindo".
    try {
      const gyroAvailable = await Gyroscope.isAvailableAsync();
      if (gyroAvailable) {
        Gyroscope.setUpdateInterval(this.config.throttleMs);
        this.gyroSubscription = Gyroscope.addListener((data) => {
          this._processGyro(data);
        });
      } else if (__DEV__) {
        console.warn(
          '[FallDetectionService] giroscópio indisponível — heurística de celular caindo desativada'
        );
      }
    } catch (error) {
      if (__DEV__) {
        console.warn(
          '[FallDetectionService] erro ao iniciar giroscópio:',
          error?.message || error
        );
      }
    }

    if (__DEV__) {
      console.log(
        `[FallDetectionService] ✅ Monitoramento iniciado (${1000 / this.config.throttleMs}Hz, gyro: ${!!this.gyroSubscription})`
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
    if (this.gyroSubscription) {
      this.gyroSubscription.remove();
      this.gyroSubscription = null;
    }

    // Cleanup completo
    this.onFallDetected = null;
    this._notificationInProgress = false;
    this.resetState();
    this.accHistory = [];

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
   * Aplica um preset de sensibilidade ('high' | 'medium' | 'low') e persiste
   * a escolha em AsyncStorage. Atualiza thresholds em runtime sem reiniciar.
   *
   * @param {'high'|'medium'|'low'} level
   * @returns {Promise<boolean>} true se aplicado
   */
  async setSensitivityPreset(level) {
    if (!SENSITIVITY_PRESETS[level]) {
      if (__DEV__) {
        console.error(
          `[FallDetectionService] setSensitivityPreset: nível inválido "${level}"`
        );
      }
      return false;
    }
    this.currentPreset = level;
    this.updateConfig(SENSITIVITY_PRESETS[level]);
    try {
      await AsyncStorage.setItem(STORAGE_KEY_PRESET, level);
    } catch (error) {
      if (__DEV__) {
        console.warn('[FallDetectionService] Falha ao persistir preset:', error);
      }
    }
    return true;
  }

  /**
   * Liga/desliga a detecção como um todo. Persiste em AsyncStorage e
   * encerra a subscription se houver, ou inicia (caso já haja callback registrado).
   *
   * @param {boolean} enabled
   * @returns {Promise<void>}
   */
  async setEnabled(enabled) {
    this.isEnabledByUser = !!enabled;
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_ENABLED,
        this.isEnabledByUser ? '1' : '0'
      );
    } catch (error) {
      if (__DEV__) {
        console.warn('[FallDetectionService] Falha ao persistir enabled:', error);
      }
    }
    // Se desligou e havia subscription ativa, encerrar
    if (!this.isEnabledByUser && this.subscription) {
      const cb = this.onFallDetected;
      this.stop();
      // Guardamos o callback fora do stop para permitir religar depois
      this._lastCallback = cb;
    }
  }

  /**
   * Carrega preset e flag de habilitação do AsyncStorage. Deve ser chamado
   * antes do primeiro `start()` (no boot do App.js).
   *
   * @returns {Promise<{preset: string, enabled: boolean}>}
   */
  async loadPersistedConfig() {
    try {
      const [savedPreset, savedEnabled] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_PRESET),
        AsyncStorage.getItem(STORAGE_KEY_ENABLED),
      ]);

      if (savedPreset && SENSITIVITY_PRESETS[savedPreset]) {
        this.currentPreset = savedPreset;
        this.config = { ...SENSITIVITY_PRESETS[savedPreset] };
      }
      // savedEnabled === null => primeira vez => default true
      this.isEnabledByUser = savedEnabled === null ? true : savedEnabled === '1';

      if (__DEV__) {
        console.log(
          `[FallDetectionService] 🔧 Config carregada: preset=${this.currentPreset}, enabled=${this.isEnabledByUser}`
        );
      }
    } catch (error) {
      if (__DEV__) {
        console.warn(
          '[FallDetectionService] loadPersistedConfig falhou — usando defaults:',
          error
        );
      }
    }
    return { preset: this.currentPreset, enabled: this.isEnabledByUser };
  }

  /**
   * Getter para preset atual (usado pela tela de Sensibilidade).
   *
   * @returns {'high'|'medium'|'low'}
   */
  getCurrentPreset() {
    return this.currentPreset;
  }

  /**
   * Getter para flag de habilitação.
   *
   * @returns {boolean}
   */
  getIsEnabled() {
    return this.isEnabledByUser;
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
    this._resetGyroPeak();

    if (__DEV__) {
      console.log('[FallDetectionService] 🔄 Estado resetado');
    }
  }

  /**
   * Retorna estatísticas de supressão para a tela de Sensibilidade (debug
   * opcional) e para validar a heurística em campo.
   */
  getSuppressionStats() {
    return { ...this.suppressionStats };
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

    // Alimenta histórico circular (usado pela heurística de repouso prévio)
    this._pushAccHistory(now, magnitude);

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
      // Liga captura do pico angular para a heurística de "celular caindo"
      this._resetGyroPeak();
      this.gyroPeakActive = true;
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
          // Imobilidade confirmada — antes de notificar, aplica heurísticas
          // de "celular caindo" para suprimir falsos positivos.
          if (this._hadChaoticRotation()) {
            if (__DEV__) {
              console.log(
                '[FallDetectionService] 📱 Suprimido: rotação caótica indica celular girando no ar.'
              );
            }
            this.suppressionStats.suppressedByGyro += 1;
            this.resetState();
            return;
          }
          if (this._hadPriorRest()) {
            if (__DEV__) {
              console.log(
                '[FallDetectionService] 🛏️ Suprimido: celular estava em repouso prolongado antes da queda.'
              );
            }
            this.suppressionStats.suppressedByRest += 1;
            this.resetState();
            return;
          }
          // Passou nos filtros — notifica UI via callback
          this.suppressionStats.confirmed += 1;
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

  // -------------------------------------------------------------------------
  // HEURÍSTICA DE "CELULAR CAINDO" — PRIVADOS
  // -------------------------------------------------------------------------

  /**
   * Processa cada amostra do giroscópio. Mantém o pico de |ω| por eixo
   * durante a janela ativa (queda livre → 200ms pós-impacto).
   *
   * @private
   * @param {object} data - { x, y, z } em rad/s
   */
  _processGyro(data) {
    if (!this.gyroPeakActive) return;

    // Encerra a janela 200ms após o impacto (tempo suficiente pra capturar
    // o pico angular do tombo). Depois disso, não interessa mais.
    if (this.state.impactTime > 0 && Date.now() - this.state.impactTime > 200) {
      this.gyroPeakActive = false;
      return;
    }

    const ax = Math.abs(data.x);
    const ay = Math.abs(data.y);
    const az = Math.abs(data.z);
    if (ax > this.gyroPeak.x) this.gyroPeak.x = ax;
    if (ay > this.gyroPeak.y) this.gyroPeak.y = ay;
    if (az > this.gyroPeak.z) this.gyroPeak.z = az;
  }

  _resetGyroPeak() {
    this.gyroPeak = { x: 0, y: 0, z: 0 };
    this.gyroPeakActive = false;
  }

  /**
   * Adiciona uma amostra ao histórico circular do acelerômetro.
   * Mantém no máximo ACC_HISTORY_SAMPLES entradas (~30s a 25Hz).
   *
   * @private
   */
  _pushAccHistory(timestamp, magnitude) {
    this.accHistory.push({ t: timestamp, m: magnitude });
    if (this.accHistory.length > ACC_HISTORY_SAMPLES) {
      this.accHistory.shift();
    }
  }

  /**
   * Sinal 1 — Rotação caótica durante a queda.
   * Retorna true se o pico angular ultrapassou GYRO_CHAOS_THRESHOLD em pelo
   * menos GYRO_CHAOS_AXES_MIN eixos. Indica celular girando no ar (queda
   * livre típica de objeto, não de pessoa).
   *
   * Se o giroscópio não está disponível (gyroSubscription === null),
   * retorna false — a heurística simplesmente não é aplicada.
   *
   * @private
   * @returns {boolean}
   */
  _hadChaoticRotation() {
    if (!this.gyroSubscription) return false;

    let axesAboveThreshold = 0;
    if (this.gyroPeak.x > GYRO_CHAOS_THRESHOLD) axesAboveThreshold += 1;
    if (this.gyroPeak.y > GYRO_CHAOS_THRESHOLD) axesAboveThreshold += 1;
    if (this.gyroPeak.z > GYRO_CHAOS_THRESHOLD) axesAboveThreshold += 1;

    if (__DEV__ && axesAboveThreshold > 0) {
      console.log(
        `[FallDetectionService] gyro peak: x=${this.gyroPeak.x.toFixed(2)} y=${this.gyroPeak.y.toFixed(2)} z=${this.gyroPeak.z.toFixed(2)} (eixos>${GYRO_CHAOS_THRESHOLD}: ${axesAboveThreshold})`
      );
    }

    return axesAboveThreshold >= GYRO_CHAOS_AXES_MIN;
  }

  /**
   * Sinal 2 — Repouso prolongado prévio.
   * Retorna true se nos últimos PRE_FALL_REST_WINDOW_MS (30s) antes da queda
   * livre a magnitude variou menos que PRE_FALL_REST_VARIATION (0.08G).
   * Significa que o celular estava sobre uma superfície parada (mesa de
   * cabeceira, sofá, bancada) e tombou sozinho.
   *
   * Se não há histórico suficiente, retorna false (concede o benefício
   * da dúvida — evita suprimir queda real logo após o boot do app).
   *
   * @private
   * @returns {boolean}
   */
  _hadPriorRest() {
    const cutoff = this.state.fallStartTime - PRE_FALL_REST_WINDOW_MS;
    const window = this.accHistory.filter(
      (s) => s.t < this.state.fallStartTime && s.t >= cutoff
    );

    // Exige pelo menos metade da janela com amostras (15s contínuos)
    // para confiar na conclusão "estava parado".
    const minSamples = Math.floor((PRE_FALL_REST_WINDOW_MS / this.config.throttleMs) * 0.5);
    if (window.length < minSamples) return false;

    let max = -Infinity;
    let min = Infinity;
    for (const s of window) {
      if (s.m > max) max = s.m;
      if (s.m < min) min = s.m;
    }
    const variation = max - min;

    if (__DEV__) {
      console.log(
        `[FallDetectionService] pre-fall rest: variação=${variation.toFixed(3)}G em ${window.length} amostras`
      );
    }

    return variation < PRE_FALL_REST_VARIATION;
  }
}

// ---------------------------------------------------------------------------
// SINGLETON EXPORT
// ---------------------------------------------------------------------------
const fallDetectionService = new FallDetectionService();
export default fallDetectionService;
