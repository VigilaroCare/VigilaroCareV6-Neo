/**
 * ErrorBoundary.js
 * Class Component — captura erros de renderização em toda a árvore React.
 *
 * Conformidade:
 * - getDerivedStateFromError define hasError; getDerivedStateFromProps reseta por resetKey
 * - errorCode gerado fora de this.state para evitar race condition no componentDidCatch
 * - handleRestart oferece reset de estado como fallback quando reload não está disponível
 * - Botão "Tentar novamente" para erros transitórios sem forçar reload
 * - Stack trace completo em __DEV__; código de referência em produção
 */

import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, NativeModules, Platform,
} from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from './NeoIcon';

// expo-updates — disponível em builds EAS; ignorado em Expo Go sem crash
let Updates = null;
try {
  Updates = require('expo-updates');
} catch (_) {}

// @sentry/react-native — instale com: npx expo install @sentry/react-native
// TODO: Configure o Sentry antes de publicar nas lojas.
// Documentação: https://docs.sentry.io/platforms/react-native/
let Sentry = null;
try {
  Sentry = require('@sentry/react-native');
} catch (_) {}

/**
 * Gera código de referência único com timestamp + sufixo aleatório.
 * Exemplo: "ERR-M0BUXV-K3"
 */
function generateErrorCode() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `ERR-${ts}-${rand}`;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCode: null,
      prevResetKey: props.resetKey ?? null,
    };
  }

  /**
   * Reseta o boundary quando resetKey muda (ex: troca de rota no App.js).
   *
   * ATENÇÃO: getDerivedStateFromProps executa em todo render, inclusive
   * após getDerivedStateFromError. Se resetKey mudar no mesmo ciclo em que
   * um erro ocorre, o estado de erro será zerado — isso é intencional para
   * permitir recuperação por navegação, mas o erro já terá sido logado em
   * componentDidCatch antes do reset.
   */
  static getDerivedStateFromProps(props, state) {
    const currentKey = props.resetKey ?? null;
    if (currentKey !== state.prevResetKey) {
      return {
        hasError: false,
        error: null,
        errorInfo: null,
        errorCode: null,
        prevResetKey: currentKey,
      };
    }
    return null;
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      // errorCode gerado aqui — disponível de forma síncrona no render
      errorCode: generateErrorCode(),
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Usa o errorCode do estado se disponível; gera novo como fallback
    // para cobrir o caso de race condition entre getDerivedStateFromError e componentDidCatch
    const errorCode = this.state.errorCode || generateErrorCode();

    if (!__DEV__) {
      if (Sentry) {
        Sentry.captureException(error, {
          extra: {
            componentStack: errorInfo.componentStack,
            errorCode,
          },
        });
      }
      // TODO: Adicione Sentry antes de publicar — sem ele, crashes em produção
      // são invisíveis. https://docs.sentry.io/platforms/react-native/
    } else {
      console.error('[ErrorBoundary] Erro capturado:', error, errorInfo);
    }
  }

  // Reset de estado — útil para erros transitórios sem forçar reload do app
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCode: null,
    });
  };

  handleRestart = async () => {
    try {
      if (__DEV__ && NativeModules.DevSettings) {
        NativeModules.DevSettings.reload();
      } else if (Updates && typeof Updates.reloadAsync === 'function') {
        await Updates.reloadAsync();
      } else {
        // Sem mecanismo de reload disponível — reseta estado como fallback
        if (__DEV__) {
          console.warn('[ErrorBoundary] handleRestart: nenhum mecanismo de reload disponível. Resetando estado.');
        }
        this.handleRetry();
      }
    } catch (e) {
      if (__DEV__) {
        console.warn('[ErrorBoundary] handleRestart: falha ao reiniciar:', e?.message);
      }
      // Fallback: reseta o estado para o usuário não ficar preso
      this.handleRetry();
    }
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { error, errorInfo, errorCode } = this.state;

    return (
      <View
        style={styles.container}
        accessibilityRole="alert"
        accessibilityLiveRegion="assertive"
      >
        <View style={styles.content}>
          <NeoIcon name="Danger" size={64} color={Neo.colors.feedback.error} />

          <Text style={styles.title}>Algo deu errado</Text>

          <Text style={styles.subtitle}>
            Ocorreu um problema inesperado. Por favor, reinicie o aplicativo para continuar.
          </Text>

          {/* Caixa de erro: stack completo em DEV / código de referência em produção */}
          <View style={styles.errorBox}>
            <ScrollView nestedScrollEnabled={true}>
              {__DEV__ ? (
                <>
                  <Text style={styles.errorText}>
                    {error?.toString()}
                  </Text>
                  {errorInfo && (
                    <Text style={[styles.errorText, { marginTop: 8, opacity: 0.7 }]}>
                      {errorInfo.componentStack}
                    </Text>
                  )}
                </>
              ) : (
                <Text style={styles.errorCode}>
                  {`Código de referência: ${errorCode}\n\nSe o problema persistir, entre em contato com o suporte informando este código.`}
                </Text>
              )}
            </ScrollView>
          </View>

          {/* Tentar novamente — para erros transitórios sem forçar reload */}
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={this.handleRetry}
            accessibilityLabel="Tentar novamente"
          >
            <Text style={[styles.buttonText, { color: Neo.colors.primary[500] }]}>
              Tentar novamente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleRestart}
            accessibilityLabel="Reiniciar aplicativo"
          >
            <Text style={styles.buttonText}>Reiniciar Aplicativo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: Neo.colors.neutral[900],
  },
  subtitle: {
    fontSize: 15,
    color: Neo.colors.neutral[600],
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },
  errorBox: {
    width: '100%',
    maxHeight: 160,
    backgroundColor: Neo.colors.neutral[100] || '#F3F4F6',
    padding: 14,
    borderRadius: 8,
    marginBottom: 28,
  },
  errorText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11,
    color: Neo.colors.neutral[700],
    lineHeight: 16,
  },
  errorCode: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  button: {
    backgroundColor: Neo.colors.primary[500],
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Neo.colors.primary[500],
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ErrorBoundary;