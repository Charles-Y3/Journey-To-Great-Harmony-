import type { JourneyData } from '../state/selectors';
import {
  isFolderBackupEnabled,
  isFolderBackupSupported,
  getFolderBackupName,
  enableFolderBackup,
  saveToFolderNow,
} from './folderBackup';
import { JOURNEY_EXPORT_VERSION, exportJourneyData, buildBackupPayload } from '../state/store';

/** Triggers a browser download of a journey backup JSON file, returning the day key it was exported on. */
export function downloadBackupJson(version: number, journeyData: JourneyData): string {
  const payload = buildBackupPayload(version, journeyData);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `journey-to-great-harmony-backup-${payload.exportedAt}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return payload.exportedAt;
}

export type ExportSmartResult =
  | { mode: 'folder'; folderName: string; justEnabled?: boolean }
  | { mode: 'download'; error?: unknown }
  | { mode: 'cancelled' };

/**
 * The single "what should Export actually do" decision, shared by every
 * export entry point (Settings button, the reflection nudge banner) so they
 * can't drift apart: reuse an already-granted folder (silent overwrite); if
 * none is granted yet but the browser supports it, ask for one now — never
 * default straight to a download when the folder flow is available. Falls
 * back to a plain download only when the File System Access API isn't
 * supported, or the folder step genuinely fails (a cancelled picker does
 * nothing, rather than surprising the user with an unrequested download).
 */
export async function exportSmart(): Promise<ExportSmartResult> {
  if (isFolderBackupEnabled()) {
    try {
      await saveToFolderNow();
      return { mode: 'folder', folderName: getFolderBackupName() ?? '' };
    } catch (err) {
      downloadBackupJson(JOURNEY_EXPORT_VERSION, exportJourneyData());
      return { mode: 'download', error: err };
    }
  }
  if (isFolderBackupSupported()) {
    try {
      const name = await enableFolderBackup();
      return { mode: 'folder', folderName: name, justEnabled: true };
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return { mode: 'cancelled' };
      downloadBackupJson(JOURNEY_EXPORT_VERSION, exportJourneyData());
      return { mode: 'download', error: err };
    }
  }
  downloadBackupJson(JOURNEY_EXPORT_VERSION, exportJourneyData());
  return { mode: 'download' };
}
