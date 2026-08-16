import { JOURNEY_EXPORT_VERSION, exportJourneyData } from '../state/store';
import { todayKey } from './progression';

/**
 * Desktop-only (Chromium/Edge) true auto-save: writes the backup to a fixed
 * filename inside a folder the user grants once, overwriting in place on
 * every save — unlike engine/backup.ts's plain <a download>, which can only
 * ever add a new dated file. Not available on Chrome for Android or any iOS
 * browser (File System Access API isn't implemented there) — callers must
 * keep the download-based backup as a fallback everywhere this isn't
 * supported. See components/BackupNudgeBanner.tsx / state/backupStatus.ts
 * for that fallback path, which stays in place regardless of this feature.
 */

const DB_NAME = 'journey-fs';
const STORE_NAME = 'handles';
const HANDLE_KEY = 'backupDir';
const BACKUP_FILENAME = 'journey-to-great-harmony-backup.json';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbDel(key: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function isFolderBackupSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

const ENABLED_KEY = 'journeyFolderBackupEnabled';
const FOLDER_NAME_KEY = 'journeyFolderBackupName';

export function isFolderBackupEnabled(): boolean {
  return localStorage.getItem(ENABLED_KEY) === '1';
}

export function getFolderBackupName(): string | null {
  return localStorage.getItem(FOLDER_NAME_KEY);
}

async function writeBackupToFolder(dirHandle: FileSystemDirectoryHandle): Promise<void> {
  const fileHandle = await dirHandle.getFileHandle(BACKUP_FILENAME, { create: true });
  const writable = await fileHandle.createWritable();
  const payload = { version: JOURNEY_EXPORT_VERSION, exportedAt: todayKey(0), journey: exportJourneyData() };
  await writable.write(JSON.stringify(payload, null, 2));
  await writable.close();
}

/** Must be called from within a user gesture (click handler) — showDirectoryPicker requires transient activation. */
export async function enableFolderBackup(): Promise<string> {
  if (!isFolderBackupSupported()) throw new Error('File System Access API not supported');
  const dirHandle = await window.showDirectoryPicker({ id: 'journey-backup', mode: 'readwrite' });
  await idbSet(HANDLE_KEY, dirHandle);
  localStorage.setItem(ENABLED_KEY, '1');
  localStorage.setItem(FOLDER_NAME_KEY, dirHandle.name);
  await writeBackupToFolder(dirHandle);
  return dirHandle.name;
}

export async function disableFolderBackup(): Promise<void> {
  localStorage.removeItem(ENABLED_KEY);
  localStorage.removeItem(FOLDER_NAME_KEY);
  await idbDel(HANDLE_KEY);
}

/** Silent permission re-check; only prompts (via requestPermission) if called within a user gesture. */
async function getVerifiedHandle(): Promise<FileSystemDirectoryHandle | null> {
  const handle = await idbGet<FileSystemDirectoryHandle>(HANDLE_KEY);
  if (!handle) return null;
  const opts = { mode: 'readwrite' } as const;
  if ((await handle.queryPermission(opts)) === 'granted') return handle;
  try {
    if ((await handle.requestPermission(opts)) === 'granted') return handle;
  } catch {
    // requestPermission throws outside a user gesture — treat as unavailable for this call.
  }
  return null;
}

/** Silent, best-effort: writes to the saved folder if auto-save is on and permission still holds; never throws. */
export async function autoSaveIfEnabled(): Promise<boolean> {
  if (!isFolderBackupSupported() || !isFolderBackupEnabled()) return false;
  try {
    const handle = await getVerifiedHandle();
    if (!handle) return false;
    await writeBackupToFolder(handle);
    return true;
  } catch {
    return false;
  }
}

/** Explicit save-now for the manual Export button when folder mode is on — surfaces failures instead of swallowing them. */
export async function saveToFolderNow(): Promise<void> {
  const handle = await getVerifiedHandle();
  if (!handle) throw new Error('Folder access is no longer available');
  await writeBackupToFolder(handle);
}
