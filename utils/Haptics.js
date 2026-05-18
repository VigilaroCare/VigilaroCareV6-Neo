/**
 * utils/Haptics.js
 * Wrapper semântico acima de `expo-haptics` para uniformizar feedback tátil
 * em todo o app. Em vez de cada tela escolher entre Light/Medium/Heavy ad-hoc,
 * usamos verbos da intenção:
 *
 *   haptic.tap()     — toque comum em card/botão (Light)
 *   haptic.action()  — confirmação de ação intermediária (Medium)
 *   haptic.toggle()  — switch ou seleção entre opções (Selection)
 *   haptic.success() — operação concluída com sucesso (Notification Success)
 *   haptic.warning() — atenção exigida do usuário (Notification Warning)
 *   haptic.error()   — operação falhou ou ação bloqueada (Notification Error)
 *   haptic.heavy()   — gatilho crítico (Heavy) — uso raro
 *   haptic.sos()     — disparo SOS: Heavy + warning sequencial
 *
 * Cada chamada é async-and-forget: falha silenciosamente se o device
 * não suportar haptic (web, alguns Androids antigos).
 *
 * Não há "reduceMotion" aqui — haptic é independente de motion.
 * Se quiser adicionar toggle global no futuro, basta gate em um único lugar.
 */

import * as Haptics from 'expo-haptics';

const safe = async (fn) => {
    try { await fn(); } catch { /* ignore */ }
};

const haptic = {
    /** Toque comum: card, botão de navegação. Sutil. */
    tap: () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),

    /** Ação intermediária: salvar, marcar como feito, abrir modal importante. */
    action: () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),

    /** Switch / radio / chip: alternou um valor. */
    toggle: () => safe(() => Haptics.selectionAsync()),

    /** Sucesso: vistoria concluída, kit 100%, contato salvo. */
    success: () => safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),

    /** Atenção: validação de campo, item crítico no checklist. */
    warning: () => safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),

    /** Erro: falha de rede, ação bloqueada, formulário inválido. */
    error: () => safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),

    /** Heavy puro: uso raro, gatilho crítico (ex: press-in do SOS). */
    heavy: () => safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),

    /** SOS dispara: heavy imediato + warning curto sequencial. */
    sos: async () => {
        await safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy));
        await new Promise(r => setTimeout(r, 80));
        await safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning));
    },
};

export default haptic;
