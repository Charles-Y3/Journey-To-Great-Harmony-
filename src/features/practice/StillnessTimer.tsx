import { useEffect, useRef, useState } from 'react';
import { useT } from '../../i18n/useT';
import { playSfx } from '../../engine/sfx';
import { useSound } from '../../state/soundStore';
import { playMusicTrack, stopMusic, setMusicVolume } from '../../engine/music';

function formatRemaining(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** A guided countdown for stillness challenges: a slow-pulsing circle, a
 * start/pause control, and a soft bell when time is up. */
export default function StillnessTimer({ minutes, onDone }: { minutes: number; onDone?: () => void }) {
  const { t } = useT();
  const totalSec = minutes * 60;
  const [remaining, setRemaining] = useState(totalSec);
  const [running, setRunning] = useState(false);
  const [pulseIn, setPulseIn] = useState(true);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const tick = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => window.clearInterval(tick);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const pulse = window.setInterval(() => setPulseIn((p) => !p), 4000);
    return () => window.clearInterval(pulse);
  }, [running]);

  // Ambient accompaniment only while actively counting down, and only if
  // the user hasn't already chosen their own ambient track in Settings.
  useEffect(() => {
    if (!running) return;
    if (useSound.getState().musicTrack !== null) return;
    playMusicTrack('chimes');
    setMusicVolume(0.3);
    return () => {
      if (useSound.getState().musicTrack === null) stopMusic();
    };
  }, [running]);

  useEffect(() => {
    if (remaining > 0 || doneRef.current) return;
    doneRef.current = true;
    setRunning(false);
    playSfx('bell');
    onDone?.();
    // Only fire once when remaining first reaches 0.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  return (
    <div className="breath-gate">
      <div className={`breath-circle ${pulseIn ? 'breath-circle-in' : 'breath-circle-out'}`} aria-hidden="true" />
      <h3>{formatRemaining(remaining)}</h3>
      {remaining <= 0 ? (
        <p className="small muted">{t('stillnessTimerDone')}</p>
      ) : (
        <button type="button" className="btn btn-primary" onClick={() => setRunning((r) => !r)}>
          {running ? t('stillnessTimerPause') : t('stillnessTimerStart')}
        </button>
      )}
    </div>
  );
}
