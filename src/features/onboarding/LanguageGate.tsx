import { useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../state/localeStore';
import { VISIBLE_LOCALES, LOCALE_LABELS, type Locale } from '../../i18n/types';
import { t, type UiKey } from '../../i18n/strings';
import { useJourney, applyBackupSideStores, JOURNEY_EXPORT_VERSION, type BackupPayload } from '../../state/store';
import { useUi } from '../../state/uiStore';
import { MAX_NAV_WAVE } from '../../engine/pacing';
import { LATEST_CHANGELOG_VERSION } from '../../data/changelog';
import { todayKey } from '../../engine/progression';
import { isFolderBackupSupported, importFromFolder } from '../../engine/folderBackup';

// Before a language is chosen there is no "current locale" to render in.
// Preview text cycles through the same locales offered below (see
// VISIBLE_LOCALES) — Simplified Chinese is hidden as a selectable language,
// so it's not shown here either.
const GATE_PREVIEW_LOCALES = VISIBLE_LOCALES;

function isValidPayload(obj: unknown): obj is BackupPayload {
  if (!obj || typeof obj !== 'object') return false;
  const p = obj as Partial<BackupPayload>;
  return p.version === JOURNEY_EXPORT_VERSION && !!p.journey;
}

/**
 * Full-screen language picker shown once, before the rest of the app, on a
 * fresh install. The choice is stored in useLocale (separate from journey
 * progress) and can always be changed later from Settings.
 */
export default function LanguageGate() {
  const setLocale = useLocale((s) => s.setLocale);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<UiKey | ''>('');
  const [importBusy, setImportBusy] = useState(false);

  function choose(locale: Locale) {
    navigate('/', { replace: true });
    setLocale(locale);
  }

  // Nothing to protect with an "overwrite?" confirm here — this screen only
  // shows when storage was just wiped or on first launch, so there's no
  // existing progress yet. Also marks every onboarding/tour flag (pacing
  // intro, first-day guide, app tour, welcome-back, what's-new) as already
  // seen so a restored returning user lands straight on Today instead of
  // replaying first-run prompts meant for someone starting fresh.
  function applyAndGo(payload: BackupPayload) {
    const ok = useJourney.getState().importJourney(payload.journey);
    if (!ok) {
      setImportError('gateImportErrorInvalid');
      return;
    }
    applyBackupSideStores(payload);
    useLocale.setState({ hasChosen: true, locale: payload.locale ?? useLocale.getState().locale });
    useUi.setState({
      seenPacingIntro: true,
      pacingModeChosen: true,
      pacingMode: 'all',
      highestWaveSeen: MAX_NAV_WAVE,
      seenFirstDayGuide: true,
      seenAppTour: true,
      lastWelcomeSeenDay: todayKey(0),
      lastSeenChangelogVersion: LATEST_CHANGELOG_VERSION,
      lastExportAt: todayKey(0),
    });
    navigate('/', { replace: true });
  }

  // When the File System Access API is available, one folder picker does
  // double duty: it reads the backup file out of the chosen folder AND
  // re-grants auto-save access to that same folder — so restoring data and
  // re-enabling auto-save after storage was cleared is a single action.
  // Falls back to a plain file picker where unsupported.
  async function handleImportClick() {
    if (!isFolderBackupSupported()) {
      fileInputRef.current?.click();
      return;
    }
    setImportError('');
    setImportBusy(true);
    try {
      const { backup } = await importFromFolder();
      if (!isValidPayload(backup)) {
        setImportError('gateImportErrorInvalid');
        return;
      }
      applyAndGo(backup);
    } catch (err) {
      if (!(err instanceof Error && err.name === 'AbortError')) {
        setImportError(err instanceof Error && err.message === 'NO_BACKUP_FILE' ? 'gateImportErrorNoFile' : 'gateImportErrorReadFail');
      }
    } finally {
      setImportBusy(false);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(String(reader.result));
        if (!isValidPayload(parsed)) {
          setImportError('gateImportErrorFile');
          return;
        }
        applyAndGo(parsed);
      } catch {
        setImportError('gateImportErrorFileRead');
      }
    };
    reader.onerror = () => setImportError('gateImportErrorFileRead');
    reader.readAsText(file);
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-emoji">🌏</div>
        <h1 className="gate-title">{GATE_PREVIEW_LOCALES.map((l) => t('gateWelcome', l)).join(' · ')}</h1>
        <p className="gate-subtitle">{GATE_PREVIEW_LOCALES.map((l) => t('gateSubtitle', l)).join(' ')}</p>
        <div className="gate-options">
          {VISIBLE_LOCALES.map((locale: Locale) => (
            <button key={locale} className="gate-option" onClick={() => choose(locale)}>
              <span className="gate-flag">{LOCALE_LABELS[locale].flagEmoji}</span>
              <span className="gate-native">{LOCALE_LABELS[locale].native}</span>
            </button>
          ))}
        </div>
        <p className="gate-footnote">{GATE_PREVIEW_LOCALES.map((l) => t('gateChangeLater', l)).join(' · ')}</p>

        <p className="gate-footnote" style={{ marginTop: 14 }}>
          {GATE_PREVIEW_LOCALES.map((l) => t('gateImportHint', l)).join(' · ')}
        </p>
        <button
          type="button"
          className="btn"
          style={{ marginTop: 10 }}
          disabled={importBusy}
          onClick={() => void handleImportClick()}
        >
          {GATE_PREVIEW_LOCALES.map((l) => t('gateImportButton', l)).join(' / ')}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {importError && (
          <p className="gate-footnote" style={{ color: 'var(--seal)', marginTop: 6 }}>
            {GATE_PREVIEW_LOCALES.map((l) => t(importError, l)).join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
}
