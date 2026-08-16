import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useJourney, useToday, JOURNEY_EXPORT_VERSION, applyBackupSideStores } from './state/store';
import { statsFromData, forestInfo, worldInfo, type JourneyData } from './state/selectors';
import { CARDS } from './data/cards';
import { BADGES } from './data/badges';
import { CHANGELOG, LATEST_CHANGELOG_VERSION } from './data/changelog';
import { useLocale } from './state/localeStore';
import { useReminders } from './state/reminderStore';
import { useUi } from './state/uiStore';
import { useProfile } from './state/profileStore';
import { useTextScale, applyTextScale, type TextScale } from './state/textScaleStore';
import { useTraveller, TRAVELLER_OPT_IN_STREAK } from './state/travellerStore';
import { resolveAvatarForRank } from './data/avatars';
import { AvatarPicker } from './components/AvatarPicker';
import { flushTravellerSync, scheduleTravellerSync } from './engine/travellerSync';
import { useTodayTasks } from './features/home/useTodayTasks';
import { useSound, type MusicTrackId } from './state/soundStore';
import { playMusicTrack, stopMusic, setMusicVolume as applyMusicVolume } from './engine/music';
import { VISIBLE_LOCALES, LOCALE_LABELS, type Locale } from './i18n/types';
import { useT } from './i18n/useT';
import { xpBarLabel, newItemsAriaLabel, rankXpLabel, welcomeBackTitle, type UiKey } from './i18n/strings';
import { RANKS, rankForXp, nextRankForXp, rankIndexForXp, todayKey } from './engine/progression';
import {
  NAV_ITEMS,
  MAX_NAV_WAVE,
  computeProgressWave,
  navItemState,
  isNavRouteUnlocked,
  useEffectiveWave,
} from './engine/pacing';
import { buildReminderIcs, downloadIcs } from './engine/calendarReminder';
import { exportSmart } from './engine/backup';
import {
  isFolderBackupSupported,
  isFolderBackupEnabled,
  getFolderBackupName,
  enableFolderBackup,
  disableFolderBackup,
} from './engine/folderBackup';
import { useBackupStale } from './state/backupStatus';
import { isJunkName } from './engine/textQuality';
import { applyPwaUpdate, subscribePwaNeedRefresh } from './engine/pwaUpdate';
import {
  getDeferredInstallPrompt,
  installGuideKind,
  isStandaloneDisplay,
  promptPwaInstall,
  subscribePwaInstall,
} from './engine/pwaInstall';
import { ProgressBar, CelebrationOverlay, Modal } from './components/ui';
import LanguageGate from './features/onboarding/LanguageGate';
import NameGate from './features/onboarding/NameGate';
import Today from './features/home/Today';
import Practice from './features/practice/Practice';
import Knowledge from './features/knowledge/Knowledge';
import Timeline from './features/timeline/Timeline';
import Forest from './features/forest/Forest';
import JourneyMap from './features/map/JourneyMap';
import World from './features/world/World';
import Community from './features/community/Community';
import Collection from './features/collection/Collection';
import Glyphs from './features/glyphs/Glyphs';
import TurningPoints from './features/turningPoints/TurningPoints';
import Advisor from './features/advisor/Advisor';

const ADVISOR_ITEM = { to: '/advisor', emoji: '🧭', key: 'navAdvisor' as const };

/** How many unlocked cards haven't been flipped + badges not viewed on the badges tab. */
function useNewCollectionCount(): number {
  return useJourney((s) => {
    const revealed = s.revealedCards ?? [];
    const unrevealed = s.unlockedCards.filter((id) => !revealed.includes(id)).length;
    const badgeUnseen = Math.max(0, s.unlockedBadges.length - (s.seenBadgeCount ?? 0));
    return unrevealed + badgeUnseen;
  });
}

/** True once the user owns at least one figure-category wisdom card. */
function useAdvisorUnlocked(): boolean {
  return useJourney((s) => s.unlockedCards.some((id) => CARDS.find((c) => c.id === id)?.category === 'figure'));
}

/** 1 the first time the Advisor becomes available and hasn't been opened yet, else 0. */
function useAdvisorBadgeCount(): number {
  const unlocked = useAdvisorUnlocked();
  const seen = useUi((s) => s.seenAdvisorUnlock);
  return unlocked && !seen ? 1 : 0;
}

function NavBadge({ count }: { count: number }) {
  const { locale } = useT();
  if (count <= 0) return null;
  return (
    <span className="nav-badge" aria-label={newItemsAriaLabel(locale, count)}>
      {count > 9 ? '9+' : count}
    </span>
  );
}

function NavDot({ show, label }: { show: boolean; label: string }) {
  if (!show) return null;
  return <span className="nav-dot" aria-label={label} />;
}

function SidebarNavLinks() {
  const { t } = useT();
  const newCollectionCount = useNewCollectionCount();
  const advisorUnlocked = useAdvisorUnlocked();
  const advisorBadgeCount = useAdvisorBadgeCount();
  const effectiveWave = useEffectiveWave();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const state = navItemState(item.wave, effectiveWave);
        if (state === 'hidden') return null;
        if (state === 'locked') {
          return (
            <span key={item.to} className="nav-link nav-link-locked" title={t('navLockedHint')} aria-disabled="true">
              <span className="nav-emoji">🔒</span>
              <span className="nav-label">{t(item.key)}</span>
            </span>
          );
        }
        return (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className="nav-emoji">
              {item.emoji}
              {item.key === 'navCollection' && <NavBadge count={newCollectionCount} />}
            </span>
            <span className="nav-label">{t(item.key)}</span>
          </NavLink>
        );
      })}
      {advisorUnlocked && (
        <NavLink to={ADVISOR_ITEM.to} end={false} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <span className="nav-emoji">
            {ADVISOR_ITEM.emoji}
            <NavBadge count={advisorBadgeCount} />
          </span>
          <span className="nav-label">{t(ADVISOR_ITEM.key)}</span>
        </NavLink>
      )}
    </>
  );
}

/** Items shown in "More": everything not in the bottom bar, plus mobile-primary
 * items not yet unlocked (they graduate into the bottom bar once they are). */
function useMoreNavItems() {
  const effectiveWave = useEffectiveWave();
  return NAV_ITEMS.filter((item) => !item.mobilePrimary || navItemState(item.wave, effectiveWave) !== 'visible').map(
    (item) => ({ item, state: navItemState(item.wave, effectiveWave) }),
  );
}

function MoreSheet({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const newCollectionCount = useNewCollectionCount();
  const advisorUnlocked = useAdvisorUnlocked();
  const advisorBadgeCount = useAdvisorBadgeCount();
  const moreItems = useMoreNavItems().filter(({ state }) => state !== 'hidden');
  return (
    <Modal onClose={onClose}>
      <h2>{t('moreSheetTitle')}</h2>
      <p className="muted">{t('moreSheetSubtitle')}</p>
      <div className="more-sheet-grid">
        {moreItems.map(({ item, state }) =>
          state === 'locked' ? (
            <div key={item.to} className="more-sheet-item more-sheet-item-locked" title={t('navLockedHint')} aria-disabled="true">
              <span className="more-sheet-emoji">🔒</span>
              <span>{t(item.key)}</span>
            </div>
          ) : (
            <Link key={item.to} to={item.to} className="more-sheet-item" onClick={onClose}>
              <span className="more-sheet-emoji">
                {item.emoji}
                {item.key === 'navCollection' && <NavBadge count={newCollectionCount} />}
              </span>
              <span>{t(item.key)}</span>
            </Link>
          ),
        )}
        {advisorUnlocked && (
          <Link to={ADVISOR_ITEM.to} className="more-sheet-item" onClick={onClose}>
            <span className="more-sheet-emoji">
              {ADVISOR_ITEM.emoji}
              <NavBadge count={advisorBadgeCount} />
            </span>
            <span>{t(ADVISOR_ITEM.key)}</span>
          </Link>
        )}
      </div>
    </Modal>
  );
}

function BottomNav() {
  const { t } = useT();
  const [showMore, setShowMore] = useState(false);
  const newCollectionCount = useNewCollectionCount();
  const advisorBadgeCount = useAdvisorBadgeCount();
  const effectiveWave = useEffectiveWave();
  const bottomItems = NAV_ITEMS.filter((item) => item.mobilePrimary && navItemState(item.wave, effectiveWave) === 'visible');
  return (
    <>
      <nav className="bottom-nav">
        {bottomItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className="nav-emoji">{item.emoji}</span>
            <span className="nav-label">{t(item.key)}</span>
          </NavLink>
        ))}
        <button type="button" className="nav-link nav-link-more" onClick={() => setShowMore(true)}>
          <span className="nav-emoji">
            ⋯
            <NavBadge count={newCollectionCount + advisorBadgeCount} />
          </span>
          <span className="nav-label">{t('navMore')}</span>
        </button>
      </nav>
      {showMore && <MoreSheet onClose={() => setShowMore(false)} />}
    </>
  );
}

function LanguageSection() {
  const { t, locale } = useT();
  const setLocale = useLocale((s) => s.setLocale);
  return (
    <div className="card">
      <h3>{t('settingsLanguageTitle')}</h3>
      <p className="small muted">{t('settingsLanguageDesc')}</p>
      <div className="tab-row">
        {VISIBLE_LOCALES.map((l: Locale) => (
          <button key={l} className={l === locale ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setLocale(l)}>
            {LOCALE_LABELS[l].flagEmoji} {LOCALE_LABELS[l].native}
          </button>
        ))}
      </div>
    </div>
  );
}

const TEXT_SCALE_OPTIONS: { id: TextScale; labelKey: UiKey }[] = [
  { id: 'default', labelKey: 'settingsTextSizeDefault' },
  { id: 'larger', labelKey: 'settingsTextSizeLarger' },
  { id: 'largest', labelKey: 'settingsTextSizeLargest' },
];

function TextSizeSection() {
  const { t } = useT();
  const scale = useTextScale((s) => s.scale);
  const setScale = useTextScale((s) => s.setScale);
  return (
    <div className="card">
      <h3>{t('settingsTextSizeTitle')}</h3>
      <p className="small muted">{t('settingsTextSizeDesc')}</p>
      <div className="tab-row">
        {TEXT_SCALE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={opt.id === scale ? 'btn tab-btn active' : 'btn tab-btn'}
            onClick={() => setScale(opt.id)}
          >
            {t(opt.labelKey)}
          </button>
        ))}
      </div>
      <p className="text-size-preview">{t('settingsTextSizePreview')}</p>
    </div>
  );
}

function NameSection() {
  const { t } = useT();
  const name = useProfile((s) => s.name);
  const setName = useProfile((s) => s.setName);
  const [text, setText] = useState(name ?? '');
  const junk = text.trim() !== '' && isJunkName(text);

  return (
    <div className="card">
      <h3>{t('settingsNameTitle')}</h3>
      <p className="small muted">{t('settingsNameDesc')}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('nameGatePlaceholder')} maxLength={40} />
        <button className="btn" disabled={junk} onClick={() => setName(text)}>
          {t('settingsNameSave')}
        </button>
      </div>
      {junk && <p className="small muted">{t('nameJunkHint')}</p>}
    </div>
  );
}

function AvatarSection() {
  const { t } = useT();
  const avatar = useProfile((s) => s.avatar);
  const setAvatar = useProfile((s) => s.setAvatar);
  const optedIn = useTraveller((s) => s.optedIn);
  const xp = useJourney((s) => s.xp);
  const rankIndex = rankIndexForXp(xp);

  return (
    <div className="card">
      <h3>{t('settingsAvatarTitle')}</h3>
      <p className="small muted">{t('settingsAvatarDesc')}</p>
      <AvatarPicker
        value={avatar}
        rankIndex={rankIndex}
        onSelect={(a) => {
          setAvatar(a);
          if (optedIn) void flushTravellerSync();
        }}
      />
    </div>
  );
}

function PacingModeSection() {
  const { t } = useT();
  const pacingMode = useUi((s) => s.pacingMode);
  const setPacingMode = useUi((s) => s.setPacingMode);
  const setHighestWaveSeen = useUi((s) => s.setHighestWaveSeen);
  const [confirmingAll, setConfirmingAll] = useState(false);

  // Choosing "all" ratchets highestWaveSeen to the max permanently (see
  // uiStore's doc comment) — there's no way back to real gating after that,
  // so switching to it needs a confirm step, and once it's active there's
  // nothing left for "Ease me in" to do (it would be a silent no-op), so it
  // stays disabled rather than looking clickable and doing nothing.
  const alreadyAll = pacingMode === 'all';

  function confirmAll() {
    setPacingMode('all');
    setHighestWaveSeen(MAX_NAV_WAVE);
    setConfirmingAll(false);
  }

  return (
    <div className="card">
      <h3>{t('settingsPacingTitle')}</h3>
      <p className="small muted">{t('settingsPacingDesc')}</p>
      <div className="tab-row">
        <button
          type="button"
          className={pacingMode === 'gated' ? 'btn tab-btn active' : 'btn tab-btn'}
          disabled={alreadyAll}
          title={alreadyAll ? t('pacingEaseInDisabledHint') : undefined}
          onClick={() => setPacingMode('gated')}
        >
          {t('pacingModeEaseIn')}
        </button>
        <button
          type="button"
          className={alreadyAll ? 'btn tab-btn active' : 'btn tab-btn'}
          onClick={() => {
            if (!alreadyAll) setConfirmingAll(true);
          }}
        >
          {t('pacingModeShowAll')}
        </button>
      </div>
      {confirmingAll && (
        <div className="card" style={{ borderColor: 'var(--seal)', marginTop: 10, marginBottom: 0 }}>
          <p className="small" style={{ marginTop: 0 }}>{t('pacingConfirmAllBody')}</p>
          <button type="button" className="btn btn-primary" style={{ marginRight: 8 }} onClick={confirmAll}>
            {t('pacingConfirmAllYes')}
          </button>
          <button type="button" className="btn" onClick={() => setConfirmingAll(false)}>
            {t('settingsCancel')}
          </button>
        </div>
      )}
    </div>
  );
}

function SharedRoadSection() {
  const { t } = useT();
  const name = useProfile((s) => s.name);
  const hasSetName = useProfile((s) => s.hasSetName);
  const streakBest = useJourney((s) => s.streakBest);
  const optedIn = useTraveller((s) => s.optedIn);
  const setOptedIn = useTraveller((s) => s.setOptedIn);
  const ensureId = useTraveller((s) => s.ensureId);
  const [syncNote, setSyncNote] = useState<'ok' | 'fail' | null>(null);
  const unlocked = hasSetName && !!name?.trim() && streakBest >= TRAVELLER_OPT_IN_STREAK;

  async function toggle() {
    if (!unlocked) return;
    const next = !optedIn;
    if (next) ensureId();
    setOptedIn(next);
    const ok = await flushTravellerSync();
    setSyncNote(ok ? 'ok' : 'fail');
    window.setTimeout(() => setSyncNote(null), 4000);
  }

  return (
    <div className="card">
      <h3>{t('settingsSharedRoadTitle')}</h3>
      <p className="small muted">{t('settingsSharedRoadDesc')}</p>
      {!unlocked ? (
        <p className="small muted">{t('settingsSharedRoadLocked')}</p>
      ) : (
        <>
          <p className="small muted">{optedIn ? t('settingsSharedRoadOn') : t('settingsSharedRoadOff')}</p>
          <button type="button" className={optedIn ? 'btn' : 'btn btn-primary'} onClick={() => void toggle()}>
            {optedIn ? t('settingsSharedRoadLeave') : t('settingsSharedRoadJoin')}
          </button>
          {syncNote === 'fail' && <p className="small muted" style={{ marginTop: 8 }}>{t('settingsSharedRoadSyncFail')}</p>}
        </>
      )}
    </div>
  );
}

function ShareSection() {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.origin;
    const title = t('appName');
    const message = t('shareMessage');
    if (navigator.share) {
      try {
        await navigator.share({ title, text: message, url });
      } catch {
        // User cancelled the share sheet — not an error, nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${message} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (permissions, insecure context) — the
      // button simply won't confirm; nothing else to fall back to here.
    }
  }

  return (
    <div className="card">
      <h3>{t('settingsShareTitle')}</h3>
      <p className="small muted">{t('settingsShareDesc')}</p>
      <button className="btn" onClick={share}>
        {copied ? t('shareCopiedConfirmation') : t('settingsShareBtn')}
      </button>
    </div>
  );
}

function folderNameLabel(prefix: string, name: string | null): string {
  return name ? `${prefix} “${name}”` : prefix;
}

/**
 * All folder-auto-save UI state (enabled/name/busy/error) lives here rather
 * than split into its own component, because Export/Choose-folder/Stop are
 * really one shared decision (see engine/backup.ts exportSmart) — splitting
 * them risked the Export button and the folder controls showing stale state
 * relative to each other after either one changed things.
 */
function BackupSection() {
  const { t } = useT();
  const importJourney = useJourney((s) => s.importJourney);
  const setLastExportAt = useUi((s) => s.setLastExportAt);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [folderSupported, setFolderSupported] = useState(false);
  const [folderEnabled, setFolderEnabled] = useState(false);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [folderBusy, setFolderBusy] = useState(false);
  const [folderError, setFolderError] = useState<'export-fallback' | 'choose-failed' | null>(null);

  useEffect(() => {
    setFolderSupported(isFolderBackupSupported());
    setFolderEnabled(isFolderBackupEnabled());
    setFolderName(getFolderBackupName());
  }, []);

  async function exportBackup() {
    setFolderBusy(true);
    setFolderError(null);
    try {
      const result = await exportSmart();
      if (result.mode === 'folder') {
        setFolderEnabled(true);
        setFolderName(result.folderName);
        setLastExportAt(todayKey(0));
      } else if (result.mode === 'download') {
        if (result.error) setFolderError('export-fallback');
        setLastExportAt(todayKey(0));
      }
      // 'cancelled' (picker dismissed): nothing happened, leave state as-is.
    } finally {
      setFolderBusy(false);
    }
  }

  async function chooseFolder() {
    setFolderBusy(true);
    setFolderError(null);
    try {
      const name = await enableFolderBackup();
      setFolderEnabled(true);
      setFolderName(name);
      setLastExportAt(todayKey(0));
    } catch (err) {
      if (!(err instanceof Error && err.name === 'AbortError')) setFolderError('choose-failed');
    } finally {
      setFolderBusy(false);
    }
  }

  async function stopFolderBackup() {
    setFolderBusy(true);
    await disableFolderBackup();
    setFolderEnabled(false);
    setFolderName(null);
    setFolderBusy(false);
  }

  function onImportFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as {
          version?: number;
          journey?: JourneyData;
          turningPoints?: { flippedDays: string[]; assignments: Record<string, string>; cycleSeen: string[] };
          profile?: { name: string | null; hasSetName: boolean; avatar: string };
        };
        if (parsed.version !== JOURNEY_EXPORT_VERSION || !parsed.journey) {
          setStatus('err');
          return;
        }
        if (!window.confirm(t('settingsImportConfirm'))) return;
        const ok = importJourney(parsed.journey);
        // turningPoints/profile are optional — older exports predate them,
        // so only restore when the file actually has them.
        if (ok) applyBackupSideStores(parsed);
        if (ok) setLastExportAt(todayKey(0));
        setStatus(ok ? 'ok' : 'err');
      } catch {
        setStatus('err');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="card" id="settings-backup">
      <h3>{t('settingsExportTitle')}</h3>
      <p className="small muted">{t('settingsExportDesc')}</p>
      <button className="btn" style={{ marginRight: 8 }} onClick={() => void exportBackup()} disabled={folderBusy}>
        {t('settingsExportBtn')}
      </button>
      {folderError === 'export-fallback' && (
        <p className="small muted" style={{ marginTop: 8 }}>{t('settingsFolderExportFallback')}</p>
      )}
      <label className="btn" style={{ display: 'inline-block', cursor: 'pointer' }}>
        {t('settingsImportBtn')}
        <input
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={(e) => {
            onImportFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </label>
      {status === 'ok' && (
        <p style={{ marginTop: 8, fontWeight: 700, color: 'var(--jade-deep)' }}>
          {t('settingsImportSuccess')}
        </p>
      )}
      {status === 'ok' && folderSupported && !folderEnabled && (
        <p className="small muted" style={{ marginTop: 4 }}>{t('settingsImportFolderHint')}</p>
      )}
      {status === 'err' && <p className="small muted" style={{ marginTop: 8 }}>{t('settingsImportError')}</p>}
      {folderSupported && (
        <div className="folder-autosave-row">
          <p className="small muted">{t('settingsFolderAutoSaveDesc')}</p>
          {folderEnabled ? (
            <>
              <p className="small">{folderNameLabel(t('settingsFolderAutoSaveOn'), folderName)}</p>
              <button className="btn" onClick={() => void stopFolderBackup()} disabled={folderBusy}>
                {t('settingsFolderAutoSaveStopBtn')}
              </button>
            </>
          ) : (
            <button className="btn" onClick={() => void chooseFolder()} disabled={folderBusy}>
              {t('settingsFolderAutoSaveChooseBtn')}
            </button>
          )}
          {folderError === 'choose-failed' && <p className="small muted">{t('settingsFolderAutoSaveError')}</p>}
        </div>
      )}
    </div>
  );
}

function DisclaimerSection() {
  const { t } = useT();
  return (
    <div className="card">
      <h3>{t('settingsDisclaimerTitle')}</h3>
      <p className="small muted">{t('settingsDisclaimerBody')}</p>
    </div>
  );
}

function PacingIntroModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const navigate = useNavigate();
  const setPacingMode = useUi((s) => s.setPacingMode);
  const setHighestWaveSeen = useUi((s) => s.setHighestWaveSeen);

  function finish(mode: 'gated' | 'all') {
    setPacingMode(mode);
    if (mode === 'all') setHighestWaveSeen(MAX_NAV_WAVE);
    navigate('/', { replace: true });
    onClose();
  }

  return (
    <Modal onClose={() => finish('gated')}>
      <h2>{t('pacingIntroTitle')}</h2>
      <p>{t('pacingIntroBody1')}</p>
      <p>{t('pacingIntroBody2')}</p>
      <p>{t('pacingIntroBody3')}</p>
      <p>{t('pacingIntroBody4')}</p>
      <p className="small muted" style={{ marginTop: 14, marginBottom: 6 }}>
        {t('pacingIntroChoiceLabel')}
      </p>
      <button type="button" className="btn btn-primary" style={{ width: '100%', marginBottom: 8 }} onClick={() => finish('gated')}>
        {t('pacingModeEaseIn')}
      </button>
      <p className="small muted" style={{ marginTop: 0, marginBottom: 10 }}>
        {t('pacingModeEaseInDesc')}
      </p>
      <button type="button" className="btn" style={{ width: '100%' }} onClick={() => finish('all')}>
        {t('pacingModeShowAll')}
      </button>
      <p className="small muted" style={{ marginTop: 6, marginBottom: 0 }}>
        {t('pacingModeShowAllDesc')}
      </p>
    </Modal>
  );
}

const APP_TOUR_CLUSTERS: { emoji: string; titleKey: UiKey; descKey: UiKey }[] = [
  { emoji: '🎯', titleKey: 'appTourClusterDailyTitle', descKey: 'appTourClusterDailyDesc' },
  { emoji: '📖', titleKey: 'appTourClusterLearningTitle', descKey: 'appTourClusterLearningDesc' },
  { emoji: '🌏', titleKey: 'appTourClusterLivingTitle', descKey: 'appTourClusterLivingDesc' },
  { emoji: '🎴', titleKey: 'appTourClusterTogetherTitle', descKey: 'appTourClusterTogetherDesc' },
];

function FirstDayGuideModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const effectiveWave = useEffectiveWave();

  // Still Waters is wave 1 — for a gated user this modal fires on day one,
  // before wave 1 is reached, so offering it here would point at a step the
  // sidebar itself still shows locked. Filter to whatever's actually usable
  // right now instead of assuming every step is always available.
  const allSteps: { to: string; emoji: string; titleKey: UiKey; descKey: UiKey; focus?: string }[] = [
    { to: '/practice', emoji: '🌅', titleKey: 'firstDayGuidePractice', descKey: 'firstDayGuidePracticeDesc', focus: 'morning-intention' },
    { to: '/turning-points', emoji: '💧', titleKey: 'firstDayGuideStillWaters', descKey: 'firstDayGuideStillWatersDesc' },
    { to: '/knowledge', emoji: '📖', titleKey: 'firstDayGuideLearn', descKey: 'firstDayGuideLearnDesc' },
  ];
  const steps = allSteps.filter((s) => isNavRouteUnlocked(s.to, effectiveWave));

  function finish() {
    onClose();
  }

  return (
    <Modal onClose={finish}>
      <h2>{t('firstDayGuideTitle')}</h2>
      <p className="small muted">{t('firstDayGuideIntro')}</p>
      <div className="first-day-guide-links">
        {steps.map((s) => (
          <Link
            key={s.to}
            className="first-day-guide-link"
            to={s.to}
            state={s.focus ? { focus: s.focus } : undefined}
            onClick={finish}
          >
            <span className="first-day-guide-emoji">{s.emoji}</span>
            <span>
              <strong>{t(s.titleKey)}</strong>
              <span className="small muted" style={{ display: 'block' }}>{t(s.descKey)}</span>
            </span>
          </Link>
        ))}
      </div>
      <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={finish}>
        {t('firstDayGuideContinue')}
      </button>
    </Modal>
  );
}

function AppTourModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const navigate = useNavigate();

  function finish() {
    navigate('/', { replace: true });
    onClose();
  }

  return (
    <Modal onClose={finish}>
      <h2>{t('appTourTitle')}</h2>
      <p className="small muted">{t('appTourIntro')}</p>
      {APP_TOUR_CLUSTERS.map((c) => (
        <div className="card" key={c.titleKey} style={{ marginTop: 10 }}>
          <h3>
            {c.emoji} {t(c.titleKey)}
          </h3>
          <p className="small muted" style={{ margin: 0 }}>
            {t(c.descKey)}
          </p>
        </div>
      ))}
      <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={finish}>
        {t('appTourContinue')}
      </button>
    </Modal>
  );
}

function WhatsNewModal({ sinceVersion, onClose }: { sinceVersion: number; onClose: () => void }) {
  const { t, L } = useT();
  const navigate = useNavigate();
  const entries = CHANGELOG.filter((e) => e.version > sinceVersion);

  function finish() {
    navigate('/', { replace: true });
    onClose();
  }

  return (
    <Modal onClose={finish}>
      <h2>{t('whatsNewTitle')}</h2>
      {entries.map((entry) => (
        <div key={entry.version} style={{ marginBottom: 14 }}>
          <p className="small muted" style={{ marginBottom: 6 }}>
            {entry.date}
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
            {entry.highlights.map((h, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {L(h)}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button type="button" className="btn btn-primary" style={{ marginTop: 8 }} onClick={finish}>
        {t('whatsNewContinue')}
      </button>
    </Modal>
  );
}

function ReminderSection() {
  const { t } = useT();
  const morningTime = useReminders((s) => s.morningTime);
  const setMorningTime = useReminders((s) => s.setMorningTime);
  const eveningTime = useReminders((s) => s.eveningTime);
  const setEveningTime = useReminders((s) => s.setEveningTime);
  const markMorningCalendarAdded = useReminders((s) => s.markMorningCalendarAdded);
  const markEveningCalendarAdded = useReminders((s) => s.markEveningCalendarAdded);

  function addToCalendar(kind: 'morning' | 'evening') {
    const time = kind === 'morning' ? morningTime : eveningTime;
    const ics = buildReminderIcs({
      uid: `journey-${kind}-reminder@great-harmony`,
      summary: t(kind === 'morning' ? 'reminderMorningSummary' : 'reminderEveningSummary'),
      description: t(kind === 'morning' ? 'reminderMorningDesc' : 'reminderEveningDesc'),
      time,
    });
    downloadIcs(`${kind}-reminder.ics`, ics);
    if (kind === 'morning') markMorningCalendarAdded();
    else markEveningCalendarAdded();
  }

  return (
    <div className="card" id="settings-reminders">
      <h3>{t('settingsReminderTitle')}</h3>
      <p className="small muted">{t('settingsReminderDesc')}</p>

      <div className="reminder-row">
        <strong>{t('reminderMorningLabel')}</strong>
        <p className="small muted reminder-row-desc">{t('reminderMorningDesc')}</p>
        <div className="reminder-row-controls">
          <input
            type="time"
            className="settings-control-select"
            value={morningTime}
            onChange={(e) => setMorningTime(e.target.value)}
          />
          <button className="btn" onClick={() => addToCalendar('morning')}>
            {t('settingsReminderAddBtn')}
          </button>
        </div>
      </div>

      <div className="reminder-row">
        <strong>{t('reminderEveningLabel')}</strong>
        <p className="small muted reminder-row-desc">{t('reminderEveningDesc')}</p>
        <div className="reminder-row-controls">
          <input
            type="time"
            className="settings-control-select"
            value={eveningTime}
            onChange={(e) => setEveningTime(e.target.value)}
          />
          <button className="btn" onClick={() => addToCalendar('evening')}>
            {t('settingsReminderAddBtn')}
          </button>
        </div>
      </div>

      <p className="small muted" style={{ marginTop: 8 }}>
        {t('settingsReminderFootnote')}
      </p>
      <p className="small muted why-this-line">{t('whyCalendarReadd')}</p>
    </div>
  );
}

function StreakInfoModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  return (
    <Modal onClose={onClose}>
      <h2>{t('streakInfoTitle')}</h2>
      <p>{t('streakInfoBody')}</p>
    </Modal>
  );
}

function HarmonyInfoModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  return (
    <Modal onClose={onClose}>
      <h2>{t('harmonyInfoTitle')}</h2>
      <p>{t('harmonyInfoBody')}</p>
    </Modal>
  );
}

const MUSIC_TRACKS: { id: MusicTrackId; key: 'musicTrackBells' | 'musicTrackChimes' }[] = [
  { id: 'bells', key: 'musicTrackBells' },
  { id: 'chimes', key: 'musicTrackChimes' },
];

const MUSIC_OFF = '__off__';

function MusicSection() {
  const { t } = useT();
  const musicTrack = useSound((s) => s.musicTrack);
  const setMusicTrack = useSound((s) => s.setMusicTrack);
  const musicVolume = useSound((s) => s.musicVolume);
  const setMusicVolume = useSound((s) => s.setMusicVolume);

  function selectTrack(id: MusicTrackId | null) {
    setMusicTrack(id);
    if (id) {
      playMusicTrack(id);
      applyMusicVolume(musicVolume);
    } else {
      stopMusic();
    }
  }

  function handleVolume(v: number) {
    setMusicVolume(v);
    applyMusicVolume(v);
  }

  return (
    <div className="card" id="settings-music">
      <h3>{t('settingsMusicTitle')}</h3>
      <p className="small muted">{t('settingsMusicDesc')}</p>
      <select
        className="music-track-select settings-control-select"
        value={musicTrack ?? MUSIC_OFF}
        onChange={(e) => selectTrack(e.target.value === MUSIC_OFF ? null : (e.target.value as MusicTrackId))}
      >
        <option value={MUSIC_OFF}>{t('musicTrackOff')}</option>
        {MUSIC_TRACKS.map((tr) => (
          <option key={tr.id} value={tr.id}>
            {t(tr.key)}
          </option>
        ))}
      </select>
      {musicTrack && (
        <div style={{ marginTop: 10 }}>
          <label className="small muted">{t('musicVolumeLabel')}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={musicVolume}
            onChange={(e) => handleVolume(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      )}
      <p className="small muted" style={{ marginTop: 8 }}>
        {t('settingsMusicAutoplayNote')}
      </p>
    </div>
  );
}

function WelcomeModal({ onClose }: { onClose: () => void }) {
  const { t, L, locale } = useT();
  const navigate = useNavigate();
  const name = useProfile((s) => s.name);
  const streak = useJourney((s) => s.streakCurrent);
  const xp = useJourney((s) => s.xp);
  const rank = rankForXp(xp);
  const { tasks, coreComplete } = useTodayTasks();
  const coreTasks = tasks.filter((tk) => !tk.secondary);

  function finish() {
    navigate('/', { replace: true });
    onClose();
  }

  return (
    <Modal onClose={finish}>
      <h2>{name ? welcomeBackTitle(locale, name) : t('welcomeBackTitleAnon')}</h2>
      <p className="small muted">
        {rank.emoji} {L(rank.name)} · 🔥 {streak} {t('statStreak')}
      </p>
      <h4>{t('welcomeBackTasksHeading')}</h4>
      {coreTasks.map((tk) => (
        <div key={tk.title} className={tk.done ? 'task-row task-done' : 'task-row'}>
          <span className="task-check">{tk.done ? '✅' : tk.emoji}</span>
          <div>
            <div className="task-title">{tk.title}</div>
          </div>
        </div>
      ))}
      {coreComplete && <p className="pill" style={{ marginTop: 10 }}>{t('todayFullHarmony')}</p>}
      <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={finish}>
        {t('welcomeBackContinue')}
      </button>
    </Modal>
  );
}

function RankModal({ xp, onClose }: { xp: number; onClose: () => void }) {
  const { t, L, locale } = useT();
  const currentIdx = rankIndexForXp(xp);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? RANKS.find((r) => r.id === selectedId) ?? null : null;
  const selectedIdx = selected ? RANKS.findIndex((r) => r.id === selected.id) : -1;

  // Closing a rank-detail view returns to the list; only the list dismisses the modal.
  const handleClose = () => {
    if (selectedId) setSelectedId(null);
    else onClose();
  };

  return (
    <Modal onClose={handleClose}>
      {selected ? (
        <>
          <button type="button" className="btn" style={{ marginBottom: 12 }} onClick={() => setSelectedId(null)}>
            {t('rankModalBack')}
          </button>
          <h2>
            {selected.emoji} {L(selected.name)}
          </h2>
          <p className="small muted">
            {t('rankModalUnlockedAt')} {rankXpLabel(locale, selected.minXp)}
            {selectedIdx === currentIdx ? ` · ${t('rankModalCurrent')}` : ''}
          </p>
          <p style={{ marginTop: 12 }}>{L(selected.blurb)}</p>
        </>
      ) : (
        <>
          <h2>{t('rankModalTitle')}</h2>
          <p className="small muted">{t('rankModalSubtitle')}</p>
          {RANKS.map((r, i) => {
            let cls = 'rank-row rank-row-btn';
            if (i < currentIdx) cls += ' reached';
            if (i === currentIdx) cls += ' current';
            return (
              <button key={r.id} type="button" className={cls} onClick={() => setSelectedId(r.id)}>
                <span className="rank-row-emoji">{r.emoji}</span>
                <span className="rank-row-body">
                  <strong>{L(r.name)}</strong>
                  <span className="small muted rank-row-xp">{rankXpLabel(locale, r.minXp)}</span>
                </span>
                {i === currentIdx && <span className="pill">{t('rankModalCurrent')}</span>}
              </button>
            );
          })}
        </>
      )}
    </Modal>
  );
}

function JourneyRecapModal({ onClose }: { onClose: () => void }) {
  const { t, L } = useT();
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const stats = statsFromData(d);
  const forest = forestInfo(d);
  const world = worldInfo(d, today);
  const rank = rankForXp(stats.xp);
  const capstoneCount = Object.keys(d.capstones).length;

  const tiles: { emoji: string; value: string | number; label: string }[] = [
    { emoji: rank.emoji, value: L(rank.name), label: t('journeyRecapRankLabel') },
    { emoji: '✨', value: stats.xp, label: t('statWisdomXp') },
    { emoji: '🔥', value: stats.streakBest, label: t('forestFactorStreak') },
    { emoji: '📖', value: stats.lessons, label: t('forestFactorLessons') },
    { emoji: '⏳', value: stats.timelinePoints, label: t('forestFactorTimeline') },
    { emoji: '🎯', value: stats.challengesDone, label: t('forestFactorChallenges') },
    { emoji: '🪞', value: stats.reflections, label: t('forestFactorReflections') },
    { emoji: forest.stage.emoji, value: L(forest.stage.name), label: t('statForest') },
    { emoji: world.stage.emoji, value: L(world.stage.name), label: t('statWorld') },
    { emoji: '🎴', value: `${d.unlockedCards.length}/${CARDS.length}`, label: t('journeyRecapCardsLabel') },
    { emoji: '🏅', value: `${d.unlockedBadges.length}/${BADGES.length}`, label: t('journeyRecapBadgesLabel') },
    { emoji: '📜', value: capstoneCount, label: t('journeyRecapCapstonesLabel') },
  ];

  return (
    <Modal onClose={onClose} wide>
      <h2>{t('journeyRecapTitle')}</h2>
      <div className="stat-grid">
        {tiles.map((tile) => (
          <div className="stat-tile" key={tile.label}>
            <div className="stat-value">
              {tile.emoji} {tile.value}
            </div>
            <div className="stat-name">{tile.label}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function JourneyRecapSection({ onOpen }: { onOpen: () => void }) {
  const { t } = useT();
  return (
    <div className="card">
      <h3>{t('journeyRecapSettingsTitle')}</h3>
      <p className="small muted">{t('journeyRecapSettingsDesc')}</p>
      <button className="btn" onClick={onOpen}>
        {t('journeyRecapOpenBtn')}
      </button>
    </div>
  );
}

type SettingsTabId = 'you' | 'journey' | 'device' | 'about';

const SETTINGS_TABS: { id: SettingsTabId; labelKey: UiKey }[] = [
  { id: 'you', labelKey: 'settingsTabYou' },
  { id: 'journey', labelKey: 'settingsTabJourney' },
  { id: 'device', labelKey: 'settingsTabDevice' },
  { id: 'about', labelKey: 'settingsTabAbout' },
];

function SettingsModal({
  onClose,
  focusSection,
  onOpenRecap,
}: {
  onClose: () => void;
  focusSection?: string | null;
  onOpenRecap: () => void;
}) {
  const { t } = useT();
  const navigate = useNavigate();
  const reset = useJourney((s) => s.resetJourney);
  const resetOnboardingUi = useUi((s) => s.resetOnboardingUi);
  const [confirming, setConfirming] = useState(false);
  const initialTab: SettingsTabId =
    focusSection === 'install' || focusSection === 'backup'
      ? 'device'
      : focusSection === 'reminders' || focusSection === 'music'
        ? 'journey'
        : 'you';
  const [tab, setTab] = useState<SettingsTabId>(initialTab);

  useEffect(() => {
    if (!focusSection) return;
    if (focusSection === 'install' || focusSection === 'backup') setTab('device');
    else if (focusSection === 'reminders' || focusSection === 'music') setTab('journey');
    const anchor =
      focusSection === 'reminders'
        ? 'settings-reminders'
        : focusSection === 'music'
          ? 'settings-music'
          : focusSection === 'install'
            ? 'settings-install'
            : focusSection === 'backup'
              ? 'settings-backup'
              : null;
    if (!anchor) return;
    const id = window.setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(id);
  }, [focusSection]);

  return (
    <Modal onClose={onClose}>
      <h2>{t('settingsTitle')}</h2>
      <div className="tab-row settings-tab-row" role="tablist" aria-label={t('settingsTitle')}>
        {SETTINGS_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? 'btn tab-btn active' : 'btn tab-btn'}
            onClick={() => setTab(item.id)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      {tab === 'you' && (
        <>
          <NameSection />
          <AvatarSection />
          <LanguageSection />
          <TextSizeSection />
        </>
      )}
      {tab === 'journey' && (
        <>
          <PacingModeSection />
          <SharedRoadSection />
          <JourneyRecapSection onOpen={onOpenRecap} />
          <ReminderSection />
          <MusicSection />
        </>
      )}
      {tab === 'device' && (
        <>
          <ShareSection />
          <BackupSection />
          <InstallSection />
        </>
      )}
      {tab === 'about' && (
        <>
          <DisclaimerSection />
          <div className="card">
            <h3>{t('settingsResetTitle')}</h3>
            <p className="small muted">{t('settingsResetDesc')}</p>
            {confirming ? (
              <>
                <button
                  className="btn"
                  style={{ borderColor: 'var(--seal)', color: 'var(--seal)', marginRight: 8 }}
                  onClick={() => {
                    reset();
                    resetOnboardingUi();
                    // Journey XP returns to Seeker — clamp avatar to the starter pack.
                    useProfile.getState().setAvatar(resolveAvatarForRank(useProfile.getState().avatar, 0));
                    navigate('/', { replace: true });
                    setConfirming(false);
                    onClose();
                  }}
                >
                  {t('settingsResetConfirm')}
                </button>
                <button className="btn" onClick={() => setConfirming(false)}>
                  {t('settingsCancel')}
                </button>
              </>
            ) : (
              <button className="btn" onClick={() => setConfirming(true)}>
                {t('settingsResetBtn')}
              </button>
            )}
          </div>
          <p className="small muted">{t('settingsFooter')}</p>
        </>
      )}
    </Modal>
  );
}

function OfflineBanner() {
  const { t } = useT();
  const [offline, setOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  if (!offline) return null;
  return <div className="offline-banner">{t('offlineBanner')}</div>;
}

/** Shown when a waiting service worker has a newer build (production PWA only). */
function UpdateBanner() {
  const { t } = useT();
  const [available, setAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => subscribePwaNeedRefresh(setAvailable), []);

  if (!available || dismissed) return null;
  return (
    <div className="update-banner" role="status">
      <span>{t('updateBannerBody')}</span>
      <div className="update-banner-actions">
        <button type="button" className="btn btn-primary" onClick={() => applyPwaUpdate()}>
          {t('updateBannerReload')}
        </button>
        <button type="button" className="btn" onClick={() => setDismissed(true)}>
          {t('updateBannerLater')}
        </button>
      </div>
    </div>
  );
}

function InstallSection() {
  const { t } = useT();
  const [canPrompt, setCanPrompt] = useState(() => getDeferredInstallPrompt() !== null);
  const [installed, setInstalled] = useState(isStandaloneDisplay);
  const guide = installGuideKind();
  const guideKey =
    guide === 'ios'
      ? 'settingsInstallIosSteps'
      : guide === 'android'
        ? 'settingsInstallAndroidSteps'
        : 'settingsInstallDesktopSteps';

  useEffect(() => {
    return subscribePwaInstall(() => {
      setCanPrompt(getDeferredInstallPrompt() !== null);
      setInstalled(isStandaloneDisplay());
    });
  }, []);

  async function install() {
    if (installed) return;
    const outcome = await promptPwaInstall();
    if (outcome === 'accepted') setInstalled(true);
    setCanPrompt(getDeferredInstallPrompt() !== null);
  }

  return (
    <div className="card" id="settings-install">
      <h3>{t('settingsInstallTitle')}</h3>
      <p className="small muted">{t('settingsInstallDesc')}</p>
      {installed ? (
        <p className="pill">{t('settingsInstallDone')}</p>
      ) : (
        <>
          {canPrompt ? (
            <>
              <button type="button" className="btn btn-primary" onClick={() => void install()}>
                {t('settingsInstallBtn')}
              </button>
              <p className="small muted" style={{ marginTop: 8 }}>
                {t('settingsInstallOrMenu')}
              </p>
            </>
          ) : (
            <p className="small muted" style={{ marginTop: 4 }}>
              {t(guideKey)}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function App() {
  const xp = useJourney((s) => s.xp);
  const streak = useJourney((s) => s.streakCurrent);
  const harmony = useJourney((s) => s.harmonyPoints);
  const hasChosenLocale = useLocale((s) => s.hasChosen);
  const hasSetName = useProfile((s) => s.hasSetName);
  const textScale = useTextScale((s) => s.scale);
  const today = useToday();
  const lastWelcomeSeenDay = useUi((s) => s.lastWelcomeSeenDay);
  const setLastWelcomeSeenDay = useUi((s) => s.setLastWelcomeSeenDay);
  const seenPacingIntro = useUi((s) => s.seenPacingIntro);
  const setSeenPacingIntro = useUi((s) => s.setSeenPacingIntro);
  const seenFirstDayGuide = useUi((s) => s.seenFirstDayGuide);
  const setSeenFirstDayGuide = useUi((s) => s.setSeenFirstDayGuide);
  const seenAppTour = useUi((s) => s.seenAppTour);
  const setSeenAppTour = useUi((s) => s.setSeenAppTour);
  const lastSeenChangelogVersion = useUi((s) => s.lastSeenChangelogVersion);
  const setLastSeenChangelogVersion = useUi((s) => s.setLastSeenChangelogVersion);
  const pacingModeChosen = useUi((s) => s.pacingModeChosen);
  const setPacingModeForMigration = useUi((s) => s.setPacingMode);
  const highestWaveSeen = useUi((s) => s.highestWaveSeen);
  const setHighestWaveSeen = useUi((s) => s.setHighestWaveSeen);
  const effectiveWave = useEffectiveWave();
  const dayRec = useJourney((s) => s.days[today] ?? {});
  const location = useLocation();
  // Still Waters flip must NOT count as firstDaySuccess — with "show everything"
  // pacing it used to fire the feature tour mid-reveal and steal the page.
  const firstDaySuccess =
    !!dayRec.intention || (dayRec.lessons ?? 0) + (dayRec.timelineStudies ?? 0) > 0;
  const { t, L, locale } = useT();
  const backupStale = useBackupStale();
  const [showSettings, setShowSettings] = useState(false);
  const [settingsFocus, setSettingsFocus] = useState<string | null>(null);
  const [showRankModal, setShowRankModal] = useState(false);
  const [showRecap, setShowRecap] = useState(false);
  const [showStreakInfo, setShowStreakInfo] = useState(false);
  const [showHarmonyInfo, setShowHarmonyInfo] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPacing, setShowPacing] = useState(false);
  const [showFirstDay, setShowFirstDay] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  // Keep <html> --text-scale in sync (also applied on persist rehydrate).
  useEffect(() => {
    applyTextScale(textScale);
  }, [textScale]);

  // If journey XP drops below an avatar’s unlock (e.g. Reset), fall back to default.
  const profileAvatar = useProfile((s) => s.avatar);
  const setProfileAvatar = useProfile((s) => s.setAvatar);
  const journeyXp = useJourney((s) => s.xp);
  useEffect(() => {
    const next = resolveAvatarForRank(profileAvatar, rankIndexForXp(journeyXp));
    if (next !== profileAvatar) setProfileAvatar(next);
  }, [profileAvatar, journeyXp, setProfileAvatar]);

  // Ratchet the nav "wave" high-water mark up as real progress reaches it —
  // never down, so switching pacingMode back to 'gated' later can't hide
  // something the user already reached honestly through play.
  useEffect(() => {
    const progressWave = computeProgressWave(rankIndexForXp(xp), firstDaySuccess);
    if (progressWave > highestWaveSeen) setHighestWaveSeen(progressWave);
  }, [xp, firstDaySuccess, highestWaveSeen, setHighestWaveSeen]);

  // Genuinely returning users had seenPacingIntro=true before pacingMode
  // existed, so they'll never see PacingIntroModal's choice — default them
  // to "show everything" rather than retroactively gating nav they already
  // use. Brand-new users get the real choice in the modal instead (this
  // effect no-ops for them since seenPacingIntro starts false).
  useEffect(() => {
    if (hasChosenLocale && hasSetName && seenPacingIntro && !pacingModeChosen) {
      setPacingModeForMigration('all');
      setHighestWaveSeen(MAX_NAV_WAVE);
    }
  }, [hasChosenLocale, hasSetName, seenPacingIntro, pacingModeChosen, setPacingModeForMigration, setHighestWaveSeen]);

  // Opted-in travellers: debounce sync when dedication metrics change.
  const syncXp = useJourney((s) => s.xp);
  const syncStreak = useJourney((s) => s.streakCurrent);
  const syncEncouragements = useJourney((s) => s.encouragementsSent);
  const syncHarmony = useJourney((s) => s.harmonyPoints);
  const syncOptedIn = useTraveller((s) => s.optedIn);
  useEffect(() => {
    if (!syncOptedIn) return;
    scheduleTravellerSync();
  }, [syncXp, syncStreak, syncEncouragements, syncHarmony, syncOptedIn]);

  // Once per calendar day (and only past the language/name gates AND past
  // pacing intro), greet the user with a quick progress + to-do summary
  // instead of dropping them straight onto the Today page with no
  // orientation. Gated on seenPacingIntro so it can't queue itself up
  // during a brand-new user's very first session — otherwise it fires the
  // instant hasSetName flips true, sits pending behind Pacing/FirstDayGuide,
  // and then pops up right after First Small Steps regardless of which
  // step the user picked, which reads as a non-sequitur ("Welcome back" on
  // day one) rather than the daily nudge it's meant to be.
  useEffect(() => {
    if (hasChosenLocale && hasSetName && seenPacingIntro && lastWelcomeSeenDay !== today) {
      setShowWelcome(true);
      setLastWelcomeSeenDay(today);
    }
  }, [hasChosenLocale, hasSetName, seenPacingIntro, today, lastWelcomeSeenDay, setLastWelcomeSeenDay]);

  useEffect(() => {
    if (hasChosenLocale && hasSetName && !seenPacingIntro) {
      setShowPacing(true);
    }
  }, [hasChosenLocale, hasSetName, seenPacingIntro]);

  // After pacing: first-day guide (skip for users who already finished the old tour).
  useEffect(() => {
    if (hasChosenLocale && hasSetName && seenPacingIntro && !seenFirstDayGuide && !seenAppTour) {
      setShowFirstDay(true);
    }
  }, [hasChosenLocale, hasSetName, seenPacingIntro, seenFirstDayGuide, seenAppTour]);

  // Feature tour only once every wave it describes (Learning/Living/
  // Together cover Timeline, World, Map, Community, Collection, Glyphs —
  // spanning waves 2 and 3) is actually unlocked. Gating this on
  // firstDaySuccess alone used to fire it the moment wave 1 was reached,
  // previewing content the sidebar still showed locked. 'all' pacing users
  // have effectiveWave already maxed, so this behaves the same as before
  // for them — only 'gated' users now wait for the real thing.
  // Also skip while on Still Waters so a mid-story overlay never interrupts.
  useEffect(() => {
    if (location.pathname === '/turning-points') return;
    if (
      hasChosenLocale &&
      hasSetName &&
      seenPacingIntro &&
      seenFirstDayGuide &&
      !seenAppTour &&
      firstDaySuccess &&
      effectiveWave >= MAX_NAV_WAVE
    ) {
      setShowTour(true);
    }
  }, [
    hasChosenLocale,
    hasSetName,
    seenPacingIntro,
    seenFirstDayGuide,
    seenAppTour,
    firstDaySuccess,
    effectiveWave,
    location.pathname,
  ]);

  // Only for genuinely returning users: seenPacingIntro is already true
  // (from before this flag existed) but lastSeenChangelogVersion was never
  // set. A brand-new user instead gets lastSeenChangelogVersion seeded to
  // the latest version the moment they finish the pacing intro (see its
  // onClose below), so they never see this — nothing to announce yet.
  useEffect(() => {
    if (hasChosenLocale && hasSetName && seenPacingIntro) {
      if (lastSeenChangelogVersion === null || lastSeenChangelogVersion < LATEST_CHANGELOG_VERSION) {
        setShowWhatsNew(true);
      }
    }
  }, [hasChosenLocale, hasSetName, seenPacingIntro, lastSeenChangelogVersion]);

  useEffect(() => {
    const open = (e: Event) => {
      const section = (e as CustomEvent<{ section?: string }>).detail?.section ?? null;
      setSettingsFocus(section);
      setShowSettings(true);
    };
    window.addEventListener('journey:open-settings', open);
    return () => window.removeEventListener('journey:open-settings', open);
  }, []);

  if (!hasChosenLocale) {
    return <LanguageGate />;
  }

  if (!hasSetName) {
    return <NameGate />;
  }

  const rank = rankForXp(xp);
  const next = nextRankForXp(xp);

  return (
    <div className="app">
      <UpdateBanner />
      <OfflineBanner />
      {/* Row shell kept separate from OfflineBanner so going offline cannot
          insert a flex column sibling that squeezes the UI to half-width. */}
      <div className="app-body">
        <aside className="sidebar">
          <h1 className="sidebar-title">{t('appName')}</h1>
          <p className="sidebar-tagline">{t('appTagline')}</p>
          <SidebarNavLinks />
          <div className="sidebar-footer">
            <button
              className="btn"
              style={{ width: '100%', position: 'relative' }}
              onClick={() => {
                if (backupStale) setSettingsFocus('backup');
                setShowSettings(true);
              }}
            >
              {t('settings')}
              <NavDot show={backupStale} label={t('backupStaleAriaLabel')} />
            </button>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <button type="button" className="topbar-rank topbar-rank-btn" onClick={() => setShowRankModal(true)}>
              <span>{rank.emoji}</span>
              <span>{L(rank.name)}</span>
            </button>
            <div className="topbar-xp">
              <ProgressBar
                value={next ? xp - rank.minXp : 1}
                max={next ? next.minXp - rank.minXp : 1}
                label={xpBarLabel(locale, xp, next ? next.minXp - xp : null, next ? L(next.name) : '')}
              />
            </div>
            <div className="topbar-right">
              <button type="button" className="streak-flame streak-flame-btn" onClick={() => setShowStreakInfo(true)} aria-label={t('statStreak')}>
                🔥 {streak}
              </button>
              <button type="button" className="pill pill-btn" onClick={() => setShowHarmonyInfo(true)} aria-label={t('worldYourContribution')}>
                🌏 {harmony}
              </button>
              <button
                className="btn"
                style={{ padding: '5px 10px', position: 'relative' }}
                onClick={() => {
                  if (backupStale) setSettingsFocus('backup');
                  setShowSettings(true);
                }}
                aria-label={t('settings')}
              >
                ⚙️
                <NavDot show={backupStale} label={t('backupStaleAriaLabel')} />
              </button>
            </div>
          </div>

          <main className="content">
            <Routes>
              <Route path="/" element={<Today />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/forest" element={<Forest />} />
              <Route path="/map" element={<JourneyMap />} />
              <Route path="/world" element={<World />} />
              <Route path="/community" element={<Community />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/glyphs" element={<Glyphs />} />
              <Route path="/turning-points" element={<TurningPoints />} />
              <Route path="/advisor" element={<Advisor />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>

      <BottomNav />

      {/* Hide celebrations under onboarding modals so a primary CTA click
          cannot fall through onto a "Visit Collection" link underneath. */}
      {!showPacing && !showFirstDay && !showTour && !showWhatsNew && !showWelcome && <CelebrationOverlay />}
      {showSettings && (
        <SettingsModal
          focusSection={settingsFocus}
          onClose={() => {
            setShowSettings(false);
            setSettingsFocus(null);
          }}
          onOpenRecap={() => setShowRecap(true)}
        />
      )}
      {showRecap && <JourneyRecapModal onClose={() => setShowRecap(false)} />}
      {showRankModal && <RankModal xp={xp} onClose={() => setShowRankModal(false)} />}
      {showStreakInfo && <StreakInfoModal onClose={() => setShowStreakInfo(false)} />}
      {showHarmonyInfo && <HarmonyInfoModal onClose={() => setShowHarmonyInfo(false)} />}
      {showPacing && (
        <PacingIntroModal
          onClose={() => {
            setSeenPacingIntro(true);
            setLastSeenChangelogVersion(LATEST_CHANGELOG_VERSION);
            // Pre-mark today as "welcome already seen" — day one shouldn't
            // get a "Welcome back" once First Small Steps/the tour clear,
            // that greeting starts making sense from the next calendar day.
            setLastWelcomeSeenDay(today);
            setShowPacing(false);
          }}
        />
      )}
      {showFirstDay && !showPacing && (
        <FirstDayGuideModal
          onClose={() => {
            setSeenFirstDayGuide(true);
            setShowFirstDay(false);
          }}
        />
      )}
      {showTour && !showPacing && !showFirstDay && (
        <AppTourModal
          onClose={() => {
            setSeenAppTour(true);
            setShowTour(false);
          }}
        />
      )}
      {showWhatsNew && !showPacing && !showFirstDay && !showTour && (
        <WhatsNewModal
          sinceVersion={lastSeenChangelogVersion ?? 0}
          onClose={() => {
            setLastSeenChangelogVersion(LATEST_CHANGELOG_VERSION);
            setShowWhatsNew(false);
          }}
        />
      )}
      {showWelcome && !showPacing && !showFirstDay && !showTour && !showWhatsNew && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
}
