// utils/notificationsHelper.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configura o handler (padrão)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensurePermissions() {
  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: ask } = await Notifications.requestPermissionsAsync();
      return ask === 'granted';
    }
    return true;
  }
  return false;
}

/**
 * agenda notificação diária no horário HH:MM
 * @param {string} title
 * @param {string} body
 * @param {string} time HH:MM (24h)
 * @param {boolean} repeatDaily
 * @returns notificationId (string)
 */
export async function scheduleDailyNotification(title, body, time, repeatDaily = true) {
  const ok = await ensurePermissions();
  if (!ok) throw new Error('Permissão de notificações não concedida');

  // parse time "HH:MM"
  const [hh, mm] = time.split(':').map(s => parseInt(s, 10));
  if (Number.isNaN(hh) || Number.isNaN(mm)) throw new Error('Formato de horário inválido (use HH:MM)');

  // monta trigger: hora/minuto do próximo dia/hoje
  const now = new Date();
  const triggerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);

  // se já passou hoje, agenda para amanhã
  if (triggerDate <= now) triggerDate.setDate(triggerDate.getDate() + 1);

  const trigger = repeatDaily
    ? { hour: hh, minute: mm, repeats: true } // cross-platform scheduling via Expo
    : { type: 'date', date: triggerDate };

  const id = await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: 'default' },
    trigger,
  });

  return id;
}

export async function cancelScheduledNotification(id) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (e) {
    console.warn('Erro ao cancelar notificação', e);
  }
}
