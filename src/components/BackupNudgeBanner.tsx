import { useUi } from '../state/uiStore';
import { useSessionFlags } from '../state/sessionFlags';
import { useBackupNudgeDue } from '../state/backupStatus';
import { exportSmart } from '../engine/backup';
import { todayKey } from '../engine/progression';
import { useT } from '../i18n/useT';

/**
 * Low-key, dismissible nudge shown at most once per app session, only after a
 * moment worth not losing (e.g. writing an evening reflection) — never on app
 * start, and never as an interrupting modal. Dismissing also snoozes it for a
 * few days (see uiStore.snoozeBackupNudge) so it doesn't reappear the moment
 * the app is reopened, independent of the per-session shown flag below.
 */
export function BackupNudgeBanner() {
  const { t } = useT();
  const due = useBackupNudgeDue();
  const shown = useSessionFlags((s) => s.backupNudgeShownThisSession);
  const markShown = useSessionFlags((s) => s.markBackupNudgeShown);
  const setLastExportAt = useUi((s) => s.setLastExportAt);
  const snoozeBackupNudge = useUi((s) => s.snoozeBackupNudge);

  if (!due || shown) return null;

  return (
    <div className="card backup-nudge-banner">
      <p className="small">{t('backupNudgeTitle')}</p>
      <button
        className="btn"
        style={{ marginRight: 8 }}
        onClick={() => {
          void exportSmart().then((result) => {
            // A cancelled folder picker means nothing was actually backed up —
            // leave the banner up so the user can retry or dismiss explicitly,
            // rather than it vanishing as if the backup happened.
            if (result.mode === 'cancelled') return;
            setLastExportAt(todayKey(0));
            markShown();
          });
        }}
      >
        {t('backupNudgeBtn')}
      </button>
      <button
        className="btn"
        onClick={() => {
          snoozeBackupNudge();
          markShown();
        }}
      >
        {t('backupNudgeDismiss')}
      </button>
    </div>
  );
}
