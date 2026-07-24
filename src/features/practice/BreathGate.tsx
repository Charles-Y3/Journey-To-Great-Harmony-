import { useEffect, useState } from 'react';
import { useT } from '../../i18n/useT';

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
