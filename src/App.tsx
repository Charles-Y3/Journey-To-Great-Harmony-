import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { useJourney, useToday } from './state/store';
import { useLocale } from './state/localeStore';
import { useNotifications } from './state/notificationStore';
import { useProfile } from './state/profileStore';
import { LOCALES, LOCALE_LABELS, type Locale } from './i18n/types';
import { useT } from './i18n/useT';
import { xpBarLabel, advancedDaysNote, newItemsAriaLabel, rankXpLabel } from './i18n/strings';
import { RANKS, rankForXp, nextRankForXp, rankIndexForXp } from './engine/progression';
import { checkReminders, notificationPermission, requestNotificationPermission } from './engine/notifications';
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

// Mobile bottom nav shows only the daily-loop essentials; everything else
// (Timeline, Forest, World, Community, Collection) lives behind "More".
const BOTTOM_NAV = [
  { to: '/', emoji: '🌅', key: 'navToday' as const },
  { to: '/practice', emoji: '🎯', key: 'navPractice' as const },
  { to: '/knowledge', emoji: '🌳', key: 'navKnowledge' as const },
  { to: '/map', emoji: '🗺️', key: 'navMap' as const },
];

const MORE_ITEMS = [
  { to: '/timeline', emoji: '⏳', key: 'navTimeline' as const },
  { to: '/forest', emoji: '🌲', key: 'navForest' as const },
  { to: '/world', emoji: '🌏', key: 'navWorld' as const },
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
        <button className="nav-link" onClick={() => setShowMore(true)}>
          <span className="nav-emoji">
            ➕
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
        {LOCALES.map((l: Locale) => (
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

  return (
    <div className="card">
      <h3>{t('settingsNameTitle')}</h3>
      <p className="small muted">{t('settingsNameDesc')}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('nameGatePlaceholder')} maxLength={40} />
        <button className="btn" onClick={() => setName(text)}>
          {t('settingsNameSave')}
        </button>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const { t } = useT();
  const enabled = useNotifications((s) => s.enabled);
  const setEnabled = useNotifications((s) => s.setEnabled);
  const [permission, setPermission] = useState(notificationPermission());

  async function handleToggle() {
    if (enabled) {
      setEnabled(false);
      return;
    }
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === 'granted') {
      setEnabled(true);
      checkReminders();
    }
  }

  return (
    <div className="card">
      <h3>{t('settingsNotifTitle')}</h3>
      <p className="small muted">{t('settingsNotifDesc')}</p>
      {permission === 'unsupported' ? (
        <p className="small muted">{t('settingsNotifUnsupported')}</p>
      ) : (
        <>
          <button className={enabled ? 'btn btn-primary' : 'btn'} onClick={handleToggle}>
            {enabled ? t('settingsNotifOn') : t('settingsNotifOff')}
          </button>
          {permission === 'denied' && !enabled && <p className="small muted">{t('settingsNotifDenied')}</p>}
        </>
      )}
    </div>
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
      <NotificationsSection />
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

export default function App() {
  const xp = useJourney((s) => s.xp);
  const streak = useJourney((s) => s.streakCurrent);
  const harmony = useJourney((s) => s.harmonyPoints);
  const hasChosenLocale = useLocale((s) => s.hasChosen);
  const hasSetName = useProfile((s) => s.hasSetName);
  const { t, L, locale } = useT();
  const [showSettings, setShowSettings] = useState(false);
  const [showRankModal, setShowRankModal] = useState(false);

  // Check for a due evening-reflection or daily-streak reminder on load, on
  // an interval while the tab stays open, and whenever the tab regains
  // focus (covers a laptop reopened or a background tab switched back to).
  useEffect(() => {
    checkReminders();
    const interval = window.setInterval(checkReminders, 5 * 60 * 1000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') checkReminders();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
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
            <span className="streak-flame" title={t('statStreak')}>
              🔥 {streak}
            </span>
            <span className="pill" title={t('worldYourContribution')}>
              🌏 {harmony}
            </span>
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
    </div>
  );
}
