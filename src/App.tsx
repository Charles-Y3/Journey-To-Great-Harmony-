import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useJourney, useToday } from './state/store';
import { rankForXp, nextRankForXp } from './engine/progression';
import { ProgressBar, CelebrationOverlay, Modal } from './components/ui';
import Today from './features/home/Today';
import Practice from './features/practice/Practice';
import Knowledge from './features/knowledge/Knowledge';
import Timeline from './features/timeline/Timeline';
import Forest from './features/forest/Forest';
import JourneyMap from './features/map/JourneyMap';
import World from './features/world/World';
import Community from './features/community/Community';
import Collection from './features/collection/Collection';

const NAV = [
  { to: '/', emoji: '🌅', label: 'Today' },
  { to: '/practice', emoji: '🎯', label: 'Practice' },
  { to: '/knowledge', emoji: '🌳', label: 'Knowledge' },
  { to: '/timeline', emoji: '⏳', label: 'Timeline' },
  { to: '/forest', emoji: '🌲', label: 'Forest' },
  { to: '/map', emoji: '🗺️', label: 'Map' },
  { to: '/world', emoji: '🌏', label: 'World' },
  { to: '/community', emoji: '👥', label: 'Community' },
  { to: '/collection', emoji: '🎴', label: 'Collection' },
];

function NavLinks() {
  return (
    <>
      {NAV.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <span className="nav-emoji">{item.emoji}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const reset = useJourney((s) => s.resetJourney);
  const advanceDay = useJourney((s) => s.advanceDay);
  const dayOffset = useJourney((s) => s.dayOffset);
  const today = useToday();
  const [confirming, setConfirming] = useState(false);
  return (
    <Modal onClose={onClose}>
      <h2>⚙️ Settings</h2>
      <div className="card">
        <h3>Testing tools</h3>
        <p className="small muted">
          Simulated date: <strong>{today}</strong>
          {dayOffset > 0 && ` (advanced ${dayOffset} day${dayOffset === 1 ? '' : 's'})`}. Advancing the day lets you
          preview streaks and community growth without waiting.
        </p>
        <button className="btn" onClick={advanceDay}>
          ⏭️ Advance one day
        </button>
      </div>
      <div className="card">
        <h3>Reset</h3>
        <p className="small muted">Erase all progress and begin the journey again as a Seeker.</p>
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
              Yes, erase everything
            </button>
            <button className="btn" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn" onClick={() => setConfirming(true)}>
            🔄 Reset journey…
          </button>
        )}
      </div>
      <p className="small muted">
        Journey to Great Harmony v1 — your progress is stored privately in this browser.
      </p>
    </Modal>
  );
}

export default function App() {
  const xp = useJourney((s) => s.xp);
  const streak = useJourney((s) => s.streakCurrent);
  const harmony = useJourney((s) => s.harmonyPoints);
  const [showSettings, setShowSettings] = useState(false);

  const rank = rankForXp(xp);
  const next = nextRankForXp(xp);

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="sidebar-title">
          Journey to Great Harmony <span className="sidebar-zh">大同</span>
        </h1>
        <p className="sidebar-tagline">Learn · Cultivate · Practise · Contribute</p>
        <NavLinks />
        <div className="sidebar-footer">
          <button className="btn" style={{ width: '100%' }} onClick={() => setShowSettings(true)}>
            ⚙️ Settings
          </button>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="topbar-rank" title={rank.zh}>
            <span>{rank.emoji}</span>
            <span>{rank.name}</span>
          </div>
          <div className="topbar-xp">
            <ProgressBar
              value={next ? xp - rank.minXp : 1}
              max={next ? next.minXp - rank.minXp : 1}
              label={next ? `${xp} XP · ${next.minXp - xp} to ${next.name}` : `${xp} XP · highest rank`}
            />
          </div>
          <div className="topbar-right">
            <span className="streak-flame" title="Current streak">
              🔥 {streak}
            </span>
            <span className="pill" title="Your harmony contribution">
              🌏 {harmony}
            </span>
            <button
              className="btn"
              style={{ padding: '5px 10px' }}
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
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

      <nav className="bottom-nav">
        <NavLinks />
      </nav>

      <CelebrationOverlay />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
