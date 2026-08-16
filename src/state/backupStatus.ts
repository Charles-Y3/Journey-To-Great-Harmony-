import { useJourney } from './store';
import { useUi } from './uiStore';

/**
 * How long a backup is allowed to go stale before nudging again. Deliberately
 * NOT "any progress since last export" — each export downloads a new dated
 * file (no overwrite-in-place is available on this platform, see
 * engine/backup.ts), so nudging on every day's progress would mean a new
 * file in Downloads every single day for a user who complies each time.
 * A week keeps the file count sane while still catching real risk.
 */
const STALE_AFTER_DAYS = 7;

function daysBetween(dayKeyA: string, dayKeyB: string): number {
  const [ay, am, ad] = dayKeyA.split('-').map(Number);
  const [by, bm, bd] = dayKeyB.split('-').map(Number);
  const a = new Date(ay, am - 1, ad).getTime();
  const b = new Date(by, bm - 1, bd).getTime();
  return Math.round((b - a) / 86_400_000);
}

/** True once it has been over a week since the last backup export/import while there was journey progress (or no backup was ever taken). Drives the passive Settings dot — not snoozed by dismissing the active nudge banner. */
export function useBackupStale(): boolean {
  const lastActiveDay = useJourney((s) => s.lastActiveDay);
  const lastExportAt = useUi((s) => s.lastExportAt);
  if (!lastActiveDay) return false;
  if (!lastExportAt) return true;
  return daysBetween(lastExportAt, lastActiveDay) >= STALE_AFTER_DAYS;
}

/** Same staleness check as useBackupStale, but also respects a dismissed nudge's snooze window. Drives the active nudge banner only. */
export function useBackupNudgeDue(): boolean {
  const stale = useBackupStale();
  const snoozeUntil = useUi((s) => s.backupNudgeSnoozeUntil);
  if (!stale) return false;
  return !snoozeUntil || Date.now() >= snoozeUntil;
}
