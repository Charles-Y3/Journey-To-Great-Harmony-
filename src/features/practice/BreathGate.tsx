import { useEffect, useState } from 'react';
import { useT } from '../../i18n/useT';
import { useSound } from '../../state/soundStore';
import { playMusicTrack, stopMusic, setMusicVolume } from '../../engine/music';

const BREATH_MS = 10_000;
const SKIP_AFTER_MS = 3_000;

/** A short inhale/exhale pause before accepting a virtue challenge. */
export default function BreathGate({ onReady }: { onReady: () => void }) {
  const { t } = useT();
  const [canSkip, setCanSkip] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const skipTimer = window.setTimeout(() => setCanSkip(true), SKIP_AFTER_MS);
    const doneTimer = window.setTimeout(onReady, BREATH_MS);
    const phaseTimer = window.setInterval(() => {
      setPhase((p) => (p === 'in' ? 'out' : 'in'));
    }, 2500);
    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(doneTimer);
      window.clearInterval(phaseTimer);
    };
  }, [onReady]);

  // A brief ambient accompaniment for the pause, but only if the user
  // hasn't already chosen their own ambient track in Settings — never
  // interrupt a track they deliberately started.
  useEffect(() => {
    if (useSound.getState().musicTrack !== null) return;
    playMusicTrack('chimes');
    setMusicVolume(0.3);
    return () => {
      if (useSound.getState().musicTrack === null) stopMusic();
    };
  }, []);

  return (
    <div className="breath-gate" role="dialog" aria-label={t('breathGateTitle')}>
      <div className={`breath-circle breath-circle-${phase}`} aria-hidden="true" />
      <h3>{t('breathGateTitle')}</h3>
      <p className="small muted">{phase === 'in' ? t('breathGateInhale') : t('breathGateExhale')}</p>
      {canSkip && (
        <button type="button" className="btn btn-primary" onClick={onReady}>
          {t('breathGateReady')}
        </button>
      )}
    </div>
  );
}
