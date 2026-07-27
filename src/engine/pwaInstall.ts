/** Chromium's deferred install event (not on Safari / Firefox). */
export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export type InstallGuideKind = 'ios' | 'android' | 'desktop';

type InstallListener = () => void;

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<InstallListener>();

function notify() {
  for (const cb of listeners) cb();
}

/**
 * Capture `beforeinstallprompt` as early as possible (from main.tsx).
 * Settings mounts late; without this the event is missed and Install does nothing.
 */
export function registerPwaInstall() {
  if (typeof window === 'undefined') return;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    notify();
  });
}

export function getDeferredInstallPrompt(): BeforeInstallPromptEvent | null {
  return deferred;
}

export function subscribePwaInstall(cb: InstallListener): () => void {
  listeners.add(cb);
  cb();
  return () => {
    listeners.delete(cb);
  };
}

/** Show the native install dialog when a deferred prompt was captured. */
export async function promptPwaInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferred) return 'unavailable';
  const event = deferred;
  deferred = null;
  notify();
  await event.prompt();
  const { outcome } = await event.userChoice;
  return outcome;
}

export function isStandaloneDisplay(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

export function isIosDevice(): boolean {
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOs = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

export function isAndroidDevice(): boolean {
  return /Android/i.test(navigator.userAgent);
}

/** Manual install steps when no Chromium prompt is available. */
export function installGuideKind(): InstallGuideKind {
  if (isIosDevice()) return 'ios';
  if (isAndroidDevice()) return 'android';
  return 'desktop';
}
