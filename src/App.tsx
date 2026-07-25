import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { useJourney, useToday, JOURNEY_EXPORT_VERSION, exportJourneyData } from './state/store';
import type { JourneyData } from './state/selectors';
import { useLocale } from './state/localeStore';
import { useReminders } from './state/reminderStore';
import { useUi } from './state/uiStore';
import { useProfile } from './state/profileStore';
import { useTodayTasks } from './features/home/useTodayTasks';
import { useSound, type MusicTrackId } from './state/soundStore';
import { playMusicTrack, stopMusic, setMusicVolume as applyMusicVolume } from './engine/music';
import { VISIBLE_LOCALES, LOCALE_LABELS, type Locale } from './i18n/types';
import { useT } from './i18n/useT';
import { xpBarLabel, advancedDaysNote, newItemsAriaLabel, rankXpLabel, welcomeBackTitle } from './i18n/strings';
import { RANKS, rankForXp, nextRankForXp, rankIndexForXp, todayKey } from './engine/progression';
import { buildReminderIcs, downloadIcs } from './engine/calendarReminder';
import { isJunkName } from './engine/textQuality';
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

const SIDEBAR_NAV = [
  { to: '/', emoji: '🌅', key: 'navToday' as const },
  { to: '/practice', emoji: '🎯', key: 'navPractice' as const },
  { to: '/knowledge', emoji: '🌳', key: 'navKnowledge' as const },
  { to: '/timeline', emoji: '⏳', key: 'navTimeline' as const },
  { to: '/forest', emoji: '🌲', key: 'navForest' as const },
  { to: '/map', emoji: '🗺️', key: 'navMap' as const },
  { to: '/world', emoji: '🌏', key: 'navWorld' as const },
  { to: '/community', emoji: '👥', key: 'navCommunity' as const },
  { to: '/collection', emoji: '🎴', key: 'navCollection' as const },
];

// Mobile bottom nav: daily loop + living places; the rest lives behind "More".
const BOTTOM_NAV = [
  { to: '/', emoji: '🌅', key: 'navToday' as const },
  { to: '/practice', emoji: '🎯', key: 'navPractice' as const },
  { to: '/knowledge', emoji: '🌳', key: 'navKnowledge' as const },
  { to: '/forest', emoji: '🌲', key: 'navForest' as const },
  { to: '/world', emoji: '🌏', key: 'navWorld' as const },
];

const MORE_ITEMS = [
  { to: '/timeline', emoji: '⏳', key: 'navTimeline' as const },
  { to: '/map', emoji: '🗺️', key: 'navMap' as const },
  { to: '/community', emoji: '👥', key: 'navCommunity' as const },
  { to: '/collection', emoji: '🎴', key: 'navCollection' as const },
];

/** How many unlocked cards/badges the user hasn't opened the Collection tab to see yet. */
function useNewCollectionCount(): number {
  return useJourney((s) => Math.max(0, s.unlockedCards.length + s.unlockedBadges.length - s.seenCollectionCount));
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

function SidebarNavLinks() {
  const { t } = useT();
  const newCollectionCount = useNewCollectionCount();
  return (
    <>
      {SIDEBAR_NAV.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <span className="nav-emoji">
            {item.emoji}
            {item.key === 'navCollection' && <NavBadge count={newCollectionCount} />}
          </span>
          <span>{t(item.key)}</span>
        </NavLink>
      ))}
    </>
  );
}

function MoreSheet({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const newCollectionCount = useNewCollectionCount();
  return (
    <Modal onClose={onClose}>
      <h2>{t('moreSheetTitle')}</h2>
      <p className="muted">{t('moreSheetSubtitle')}</p>
      <div className="more-sheet-grid">
        {MORE_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} className="more-sheet-item" onClick={onClose}>
            <span className="more-sheet-emoji">
              {item.emoji}
              {item.key === 'navCollection' && <NavBadge count={newCollectionCount} />}
            </span>
            <span>{t(item.key)}</span>
          </Link>
        ))}
      </div>
    </Modal>
  );
}

function BottomNav() {
  const { t } = useT();
  const [showMore, setShowMore] = useState(false);
  const newCollectionCount = useNewCollectionCount();
  return (
    <>
      <nav className="bottom-nav">
        {BOTTOM_NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className="nav-emoji">{item.emoji}</span>
            <span>{t(item.key)}</span>
          </NavLink>
        ))}
        <button type="button" className="nav-link nav-link-more" onClick={() => setShowMore(true)}>
          <span className="nav-emoji">
            ⋯
            <NavBadge count={newCollectionCount} />
          </span>
          <span>{t('navMore')}</span>
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

function BackupSection() {
  const { t } = useT();
  const importJourney = useJourney((s) => s.importJourney);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  function exportBackup() {
    const payload = {
      version: JOURNEY_EXPORT_VERSION,
      exportedAt: todayKey(0),
      journey: exportJourneyData(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journey-to-great-harmony-backup-${payload.exportedAt}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function onImportFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { version?: number; journey?: JourneyData };
        if (parsed.version !== JOURNEY_EXPORT_VERSION || !parsed.journey) {
          setStatus('err');
          return;
        }
        if (!window.confirm(t('settingsImportConfirm'))) return;
        const ok = importJourney(parsed.journey);
        setStatus(ok ? 'ok' : 'err');
      } catch {
        setStatus('err');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="card">
      <h3>{t('settingsExportTitle')}</h3>
      <p className="small muted">{t('settingsExportDesc')}</p>
      <button className="btn" style={{ marginRight: 8 }} onClick={exportBackup}>
        {t('settingsExportBtn')}
      </button>
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
      {status === 'ok' && <p className="small" style={{ marginTop: 8 }}>{t('settingsImportSuccess')}</p>}
      {status === 'err' && <p className="small muted" style={{ marginTop: 8 }}>{t('settingsImportError')}</p>}
    </div>
  );
}

function PacingIntroModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  return (
    <Modal onClose={onClose}>
      <h2>{t('pacingIntroTitle')}</h2>
      <p>{t('pacingIntroBody1')}</p>
      <p>{t('pacingIntroBody2')}</p>
      <p>{t('pacingIntroBody3')}</p>
      <p>{t('pacingIntroBody4')}</p>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={onClose}>
        {t('pacingIntroContinue')}
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

  function addToCalendar(kind: 'morning' | 'evening') {
    const time = kind === 'morning' ? morningTime : eveningTime;
    const ics = buildReminderIcs({
      uid: `journey-${kind}-reminder@great-harmony`,
      summary: t(kind === 'morning' ? 'reminderMorningSummary' : 'reminderEveningSummary'),
      description: t(kind === 'morning' ? 'reminderMorningDesc' : 'reminderEveningDesc'),
      time,
    });
    downloadIcs(`${kind}-reminder.ics`, ics);
  }

  return (
    <div className="card">
      <h3>{t('settingsReminderTitle')}</h3>
      <p className="small muted">{t('settingsReminderDesc')}</p>

      <div className="reminder-row">
        <strong>{t('reminderMorningLabel')}</strong>
        <p className="small muted reminder-row-desc">{t('reminderMorningDesc')}</p>
        <div className="reminder-row-controls">
          <input type="time" value={morningTime} onChange={(e) => setMorningTime(e.target.value)} />
          <button className="btn" onClick={() => addToCalendar('morning')}>
            {t('settingsReminderAddBtn')}
          </button>
        </div>
      </div>

      <div className="reminder-row">
        <strong>{t('reminderEveningLabel')}</strong>
        <p className="small muted reminder-row-desc">{t('reminderEveningDesc')}</p>
        <div className="reminder-row-controls">
          <input type="time" value={eveningTime} onChange={(e) => setEveningTime(e.target.value)} />
          <button className="btn" onClick={() => addToCalendar('evening')}>
            {t('settingsReminderAddBtn')}
          </button>
        </div>
      </div>

      <p className="small muted" style={{ marginTop: 8 }}>
        {t('settingsReminderFootnote')}
      </p>
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

const MUSIC_TRACKS: { id: MusicTrackId; key: 'musicTrackPad' | 'musicTrackBells' | 'musicTrackChimes' }[] = [
  { id: 'pad', key: 'musicTrackPad' },
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
    <div className="card">
      <h3>{t('settingsMusicTitle')}</h3>
      <p className="small muted">{t('settingsMusicDesc')}</p>
      <select
        className="music-track-select"
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
  const name = useProfile((s) => s.name);
  const streak = useJourney((s) => s.streakCurrent);
  const xp = useJourney((s) => s.xp);
  const rank = rankForXp(xp);
  const { tasks, doneCount } = useTodayTasks();

  return (
    <Modal onClose={onClose}>
      <h2>{name ? welcomeBackTitle(locale, name) : t('welcomeBackTitleAnon')}</h2>
      <p className="small muted">
        {rank.emoji} {L(rank.name)} · 🔥 {streak} {t('statStreak')}
      </p>
      <h4>{t('welcomeBackTasksHeading')}</h4>
      {tasks.map((tk) => (
        <div key={tk.title} className={tk.done ? 'task-row task-done' : 'task-row'}>
          <span className="task-check">{tk.done ? '✅' : tk.emoji}</span>
          <div>
            <div className="task-title">{tk.title}</div>
          </div>
        </div>
      ))}
      {doneCount === tasks.length && <p className="pill" style={{ marginTop: 10 }}>{t('todayFullHarmony')}</p>}
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={onClose}>
        {t('welcomeBackContinue')}
      </button>
    </Modal>
  );
}

function RankModal({ xp, onClose }: { xp: number; onClose: () => void }) {
  const { t, L, locale } = useT();
  const currentIdx = rankIndexForXp(xp);
  return (
    <Modal onClose={onClose}>
      <h2>{t('rankModalTitle')}</h2>
      <p className="small muted">{t('rankModalSubtitle')}</p>
      {RANKS.map((r, i) => {
        let cls = 'rank-row';
        if (i < currentIdx) cls += ' reached';
        if (i === currentIdx) cls += ' current';
        return (
          <div key={r.id} className={cls}>
            <span className="rank-row-emoji">{r.emoji}</span>
            <span className="rank-row-body">
              <strong>{L(r.name)}</strong>
              <span className="small muted rank-row-xp">{rankXpLabel(locale, r.minXp)}</span>
            </span>
            {i === currentIdx && <span className="pill">{t('rankModalCurrent')}</span>}
          </div>
        );
      })}
    </Modal>
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const { t, locale } = useT();
  const reset = useJourney((s) => s.resetJourney);
  const advanceDay = useJourney((s) => s.advanceDay);
  const dayOffset = useJourney((s) => s.dayOffset);
  const today = useToday();
  const [confirming, setConfirming] = useState(false);
  return (
    <Modal onClose={onClose}>
      <h2>{t('settingsTitle')}</h2>
      <LanguageSection />
      <NameSection />
      <ReminderSection />
      <MusicSection />
      <ShareSection />
      <BackupSection />
      <div className="card">
        <h3>{t('settingsInstallTitle')}</h3>
        <p className="small muted">{t('settingsInstallDesc')}</p>
      </div>
      <div className="card">
        <h3>{t('settingsTestingTitle')}</h3>
        <p className="small muted">{advancedDaysNote(locale, today, dayOffset)}</p>
        <p className="small muted">{t('settingsTestingDesc')}</p>
        <button className="btn" onClick={advanceDay}>
          {t('settingsAdvanceDay')}
        </button>
      </div>
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

export default function App() {
  const xp = useJourney((s) => s.xp);
  const streak = useJourney((s) => s.streakCurrent);
  const harmony = useJourney((s) => s.harmonyPoints);
  const hasChosenLocale = useLocale((s) => s.hasChosen);
  const hasSetName = useProfile((s) => s.hasSetName);
  const today = useToday();
  const lastWelcomeSeenDay = useUi((s) => s.lastWelcomeSeenDay);
  const setLastWelcomeSeenDay = useUi((s) => s.setLastWelcomeSeenDay);
  const seenPacingIntro = useUi((s) => s.seenPacingIntro);
  const setSeenPacingIntro = useUi((s) => s.setSeenPacingIntro);
  const { t, L, locale } = useT();
  const [showSettings, setShowSettings] = useState(false);
  const [showRankModal, setShowRankModal] = useState(false);
  const [showStreakInfo, setShowStreakInfo] = useState(false);
  const [showHarmonyInfo, setShowHarmonyInfo] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPacing, setShowPacing] = useState(false);

  // Once per calendar day (and only past the language/name gates), greet
  // the user with a quick progress + to-do summary instead of dropping
  // them straight onto the Today page with no orientation.
  useEffect(() => {
    if (hasChosenLocale && hasSetName && lastWelcomeSeenDay !== today) {
      setShowWelcome(true);
      setLastWelcomeSeenDay(today);
    }
  }, [hasChosenLocale, hasSetName, today, lastWelcomeSeenDay, setLastWelcomeSeenDay]);

  useEffect(() => {
    if (hasChosenLocale && hasSetName && !seenPacingIntro) {
      setShowPacing(true);
    }
  }, [hasChosenLocale, hasSetName, seenPacingIntro]);

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
      <OfflineBanner />
      <aside className="sidebar">
        <h1 className="sidebar-title">{t('appName')}</h1>
        <p className="sidebar-tagline">{t('appTagline')}</p>
        <SidebarNavLinks />
        <div className="sidebar-footer">
          <button className="btn" style={{ width: '100%' }} onClick={() => setShowSettings(true)}>
            {t('settings')}
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
              style={{ padding: '5px 10px' }}
              onClick={() => setShowSettings(true)}
              aria-label={t('settings')}
            >
              ⚙️
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
          </Routes>
        </main>
      </div>

      <BottomNav />

      <CelebrationOverlay />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showRankModal && <RankModal xp={xp} onClose={() => setShowRankModal(false)} />}
      {showStreakInfo && <StreakInfoModal onClose={() => setShowStreakInfo(false)} />}
      {showHarmonyInfo && <HarmonyInfoModal onClose={() => setShowHarmonyInfo(false)} />}
      {showPacing && (
        <PacingIntroModal
          onClose={() => {
            setSeenPacingIntro(true);
            setShowPacing(false);
          }}
        />
      )}
      {showWelcome && !showPacing && <WelcomeModal onClose={() => setShowWelcome(false)} />}
    </div>
  );
}
