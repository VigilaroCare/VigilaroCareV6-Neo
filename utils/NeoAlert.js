// utils/NeoAlert.js
//
// Drop-in replacement do Alert.alert() nativo do React Native.
// Mantém EXATAMENTE a mesma assinatura, então a migração é apenas
// trocar o import — código de chamada não muda.
//
// USO:
//   import NeoAlert from '../utils/NeoAlert';
//   NeoAlert.alert(
//     'Título',
//     'Mensagem',
//     [
//       { text: 'Cancelar', style: 'cancel' },
//       { text: 'OK', onPress: () => doSomething(), style: 'default' },
//       { text: 'Apagar', onPress: () => deleteIt(), style: 'destructive' },
//     ],
//     { cancelable: true }
//   );
//
// O Host (NeoAlertHost) precisa estar montado uma vez no root do app
// (App.js). Se por algum motivo não estiver, faz fallback para Alert
// nativo — garante que avisos nunca sumam por bug de bootstrap.

let _showFn = null;

/**
 * Registra a função de exibição vinda do NeoAlertHost.
 * Chamado uma vez quando o Host monta.
 */
export function registerNeoAlertHost(showFn) {
  _showFn = showFn;
}

/**
 * Limpa o registro — usado em cleanup do Host (raro).
 */
export function unregisterNeoAlertHost() {
  _showFn = null;
}

const NeoAlert = {
  /**
   * API idêntica a Alert.alert do React Native.
   *
   * @param {string} title       — título do alerta
   * @param {string} [message]   — mensagem secundária (opcional)
   * @param {Array}  [buttons]   — [{ text, onPress, style }], default [{ text: 'OK' }]
   * @param {object} [options]   — { cancelable, onDismiss }
   */
  alert(title, message, buttons, options) {
    const normalizedButtons =
      Array.isArray(buttons) && buttons.length > 0
        ? buttons
        : [{ text: 'OK' }];

    if (_showFn) {
      _showFn({
        title,
        message,
        buttons: normalizedButtons,
        options: options || {},
      });
      return;
    }

    // Fallback de segurança: se o Host não estiver montado (bootstrap
    // edge-case), cai pro Alert nativo. Ninguém perde aviso por isso.
    if (__DEV__) {
      console.warn(
        '[NeoAlert] Host não registrado — caindo pro Alert nativo. ' +
          'Verifique se <NeoAlertHost /> está no App.js root.'
      );
    }
    try {
      const { Alert } = require('react-native');
      Alert.alert(title, message, normalizedButtons, options);
    } catch (e) {
      if (__DEV__) console.error('[NeoAlert] Fallback nativo falhou:', e);
    }
  },
};

export default NeoAlert;
