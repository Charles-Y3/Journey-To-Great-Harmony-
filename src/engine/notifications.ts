import { useJourney } from '../state/store';
import { useNotifications } from '../state/notificationStore';
import { useLocale } from '../state/localeStore';
import { todayKey } from './progression';
import { t } from '../i18n/strings';

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function notificationPermission(): NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!notificationsSupported()) return 'denied';
  return Notification.requestPermission();
}

function fireNotification(title: string, body: string) {
  if (!notificationsSupported() || Notification.permission !== 'granted') return;
  try {
    // eslint-disable-next-line no-new
    new Notification(title, { body, tag: 'journey-reminder' });
  } catch {
    // A few browsers (notably mobile Safari) don't support the constructor
    // form outside a service worker — fail silently rather than crash.
  }
}

/**
 * Check whether an evening-reflection or daily-streak reminder is due, and
 * fire a browser Notification if so. Safe to call often (on load, on tab
 * focus, on an interval) — it no-ops unless something is actually due.
 * Only ever fires once per day per reminder kind.
 *
 * Limitation: like any page-driven Notification, this can only fire while
 * the app is open in a tab (or was very recently) — there's no service
 * worker/push subscription behind it, so it won't wake up a fully closed
 * browser. Settings copy says as much; don't oversell this.
 */
export function checkReminders(): void {
  const notif = useNotifications.getState();
  if (!notif.enabled || notificationPermission() !== 'granted') return;

  const journey = useJourney.getState();
  const today = todayKey(journey.dayOffset);
  const locale = useLocale.getState().locale;
  const rec = journey.days[today];
  const hour = new Date().getHours();

  const hasActivityToday = !!(rec?.intention || rec?.challengeDone || rec?.reflection || (rec?.lessons ?? 0) > 0);

  // Evening reflection nudge: from 19:00, once, if not yet reflected today.
  if (hour >= 19 && !rec?.reflection && notif.lastEveningPromptDay !== today) {
    fireNotification(t('notifyEveningTitle', locale), t('notifyEveningBody', locale));
    notif.markEveningPrompted(today);
  }

  // Daily-streak nudge: from midday, once, if nothing at all done today yet.
  if (hour >= 12 && !hasActivityToday && notif.lastStreakPromptDay !== today) {
    fireNotification(t('notifyStreakTitle', locale), t('notifyStreakBody', locale));
    notif.markStreakPrompted(today);
  }
}
