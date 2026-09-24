// components/NeoAlertHost.js
//
// Componente Host do NeoAlert. Montado UMA vez no App.js root.
// Escuta chamadas de NeoAlert.alert() via registerNeoAlertHost e
// renderiza um Modal premium com tom Vigilaro (NeoCard, dark mode,
// botões estilizados).
//
// PADRÕES VISUAIS:
// - Card branco/escuro centralizado, animação fade+scale (spring)
// - Título em peso forte (800), mensagem em peso médio (500)
// - 1 botão = full-width primário
// - 2 botões = lado a lado (cancelar à esquerda, ação à direita)
// - 3+ botões = empilhados verticalmente
// - style 'destructive' = vermelho; 'cancel' = quieto; default = primário verde
// - Suporta cancelable (toque fora) e onDismiss

import { useEffect, useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { registerNeoAlertHost, unregisterNeoAlertHost } from '../utils/NeoAlert';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function NeoAlertHost() {
  const [config, setConfig] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  const themeColors = useThemeColors();
  const isDark = useIsDark();

  useEffect(() => {
    registerNeoAlertHost((cfg) => {
      setConfig(cfg);
    });
    return () => unregisterNeoAlertHost();
  }, []);

  // Animação de entrada quando o modal abre
  useEffect(() => {
    if (config) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.92);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 18,
          stiffness: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [config]);

  if (!config) return null;

  const handleClose = (btn) => {
    // Animação de saída antes de desmontar
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 130,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setConfig(null);
      if (btn?.onPress) {
        try { btn.onPress(); } catch (e) { if (__DEV__) console.error('[NeoAlert] onPress error:', e); }
      }
    });
  };

  const handleBackdrop = () => {
    if (config.options?.cancelable === false) return;
    const cancelBtn = config.buttons.find((b) => b.style === 'cancel');
    handleClose(cancelBtn || { onPress: config.options?.onDismiss });
  };

  const handleRequestClose = () => {
    // Hardware back no Android
    if (config.options?.cancelable === false) return;
    const cancelBtn = config.buttons.find((b) => b.style === 'cancel');
    handleClose(cancelBtn || { onPress: config.options?.onDismiss });
  };

  const buttons = config.buttons;
  const cardBg = isDark ? themeColors.neutral[200] : themeColors.neutral.white;
  const titleColor = isDark ? themeColors.neutral[900] : Neo.colors.neutral[900];
  const messageColor = isDark ? themeColors.neutral[700] : Neo.colors.neutral[700];
  const dividerColor = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';

  const renderButton = (btn, idx, layout) => {
    const isDestructive = btn.style === 'destructive';
    const isCancel = btn.style === 'cancel';

    let textColor;
    let backgroundColor;
    if (isDestructive) {
      textColor = themeColors.neutral.white;
      backgroundColor = Neo.colors.feedback.error; // was #EF4444
    } else if (isCancel) {
      textColor = isDark ? themeColors.neutral[700] : Neo.colors.neutral[700];
      backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
    } else {
      textColor = themeColors.neutral.white;
      backgroundColor = Neo.colors.primary[500];
    }

    const btnStyle = [
      s.btn,
      layout === 'row' && s.btnRow,
      layout === 'stack' && s.btnStack,
      { backgroundColor },
    ];

    return (
      <TouchableOpacity
        key={`${btn.text}-${idx}`}
        style={btnStyle}
        onPress={() => handleClose(btn)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={btn.text}
      >
        <Text style={[s.btnText, { color: textColor }, isDestructive && s.btnTextDestructive]}>
          {btn.text}
        </Text>
      </TouchableOpacity>
    );
  };

  // Layout dos botões:
  // 1 botão  → full-width
  // 2 botões → lado a lado (cancel à esquerda quando houver)
  // 3+       → stack vertical
  const buttonLayout = buttons.length >= 3 ? 'stack' : buttons.length === 2 ? 'row' : 'single';

  // Reordena 2 botões: cancel sempre à esquerda
  let orderedButtons = buttons;
  if (buttons.length === 2) {
    const cancelIdx = buttons.findIndex((b) => b.style === 'cancel');
    if (cancelIdx === 1) {
      orderedButtons = [buttons[1], buttons[0]];
    }
  }

  return (
    <Modal
      visible
      transparent
      animationType="none"
      onRequestClose={handleRequestClose}
      statusBarTranslucent
    >
      <Animated.View style={[s.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={s.backdropTouch}
          onPress={handleBackdrop}
        >
          <Animated.View
            style={[
              s.card,
              {
                backgroundColor: cardBg,
                transform: [{ scale: scaleAnim }],
              },
            ]}
            // Bloqueia o backdropTouch dentro do card
            onStartShouldSetResponder={() => true}
          >
            {!!config.title && (
              <Text style={[s.title, { color: titleColor }]} accessibilityRole="header">
                {config.title}
              </Text>
            )}
            {!!config.message && (
              <Text style={[s.message, { color: messageColor }]}>
                {config.message}
              </Text>
            )}

            <View style={[s.divider, { backgroundColor: dividerColor }]} />

            {buttonLayout === 'single' && (
              <View>{renderButton(orderedButtons[0], 0, 'single')}</View>
            )}
            {buttonLayout === 'row' && (
              <View style={s.buttonsRow}>
                {orderedButtons.map((b, i) => renderButton(b, i, 'row'))}
              </View>
            )}
            {buttonLayout === 'stack' && (
              <View style={s.buttonsStack}>
                {orderedButtons.map((b, i) => renderButton(b, i, 'stack'))}
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouch: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 24,
    padding: 22,
    width: '100%',
    maxWidth: 360,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 8,
    lineHeight: 24,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 18,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonsStack: {
    flexDirection: 'column',
    gap: 8,
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRow: {
    flex: 1,
  },
  btnStack: {
    width: '100%',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  btnTextDestructive: {
    fontWeight: '800',
  },
});
