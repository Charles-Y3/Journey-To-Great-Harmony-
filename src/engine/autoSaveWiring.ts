import { useJourney } from '../state/store';
import { useUi } from '../state/uiStore';
import { autoSaveIfEnabled, isFolderBackupEnabled } from './folderBackup';
import { todayKey } from './progression';

const DEBOUNCE_MS = 3000;
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

/** Call once from main.tsx. Debounced so a burst of store writes (e.g. XP + streak + badge in one action) triggers one write, not several. */
export function initFolderAutoSave(): void {
  useJourney.subscribe(() => {
    if (!isFolderBackupEnabled()) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      void autoSaveIfEnabled().then((wrote) => {
        // A folder auto-save is a real backup too — clear the manual-export
        // stale nudge so desktop users with this on don't also get nagged.
        if (wrote) useUi.getState().setLastExportAt(todayKey(0));
      });
    }, DEBOUNCE_MS);
  });
}
