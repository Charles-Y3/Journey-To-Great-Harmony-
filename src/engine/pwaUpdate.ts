import { registerSW } from 'virtual:pwa-register';

type NeedRefreshListener = (needRefresh: boolean) => void;

let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;
let needRefresh = false;
const listeners = new Set<NeedRefreshListener>();

function emit(next: boolean) {
  needRefresh = next;
  for (const cb of listeners) cb(needRefresh);
}

/**
 * Register the service worker and surface "new version available" to the UI.
 * Call once from main.tsx before React mounts.
 *
 * Requires vite-plugin-pwa `registerType: 'prompt'` so updates wait for the
 * user instead of reloading silently.
 */
export function registerPwaUpdates() {
  updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      emit(true);
    },
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      // Recheck periodically while a tab stays open for days.
      window.setInterval(() => {
        void registration.update();
      }, 60 * 60 * 1000);
    },
  });
}

/** Subscribe to whether a waiting service worker has a fresh build. */
export function subscribePwaNeedRefresh(cb: NeedRefreshListener): () => void {
  listeners.add(cb);
  cb(needRefresh);
  return () => {
    listeners.delete(cb);
  };
}

/** Activate the waiting worker and reload so the new build runs. */
export function applyPwaUpdate(): void {
  void updateSW?.(true);
}
