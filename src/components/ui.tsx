import { useEffect, type ReactNode } from 'react';
import { useJourney } from '../state/store';
import { useT } from '../i18n/useT';
import { continueBtn } from '../i18n/strings';

export function ProgressBar({
  value,
  max,
  label,
  small,
}: {
  value: number;
  max: number;
  label?: string;
  small?: boolean;
}) {
  const pct = max <= 0 ? 100 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={small ? 'progress progress-small' : 'progress'} title={label}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
      {label && !small && <span className="progress-label">{label}</span>}
    </div>
  );
}

export function Modal({
  onClose,
  children,
  wide,
}: {
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  const { t } = useT();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={wide ? 'modal modal-wide' : 'modal'} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t('close')}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

/** Shows queued celebrations (rank-ups, badges, cards, growth) one at a time. */
export function CelebrationOverlay() {
  const celebrations = useJourney((s) => s.celebrations);
  const dismiss = useJourney((s) => s.dismissCelebration);
  const { locale } = useT();
  if (celebrations.length === 0) return null;
  const c = celebrations[0];
  return (
    <div className="modal-backdrop celebrate-backdrop" onClick={dismiss}>
      <div className="celebrate" onClick={(e) => e.stopPropagation()}>
        <div className="celebrate-emoji">{c.emoji}</div>
        <h2>{c.title}</h2>
        {c.subtitle && <p className="celebrate-sub">{c.subtitle}</p>}
        <button className="btn btn-primary" onClick={dismiss}>
          {continueBtn(locale, celebrations.length - 1)}
        </button>
      </div>
    </div>
  );
}

export function PageHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <header className="page-header">
      <h1>
        <span className="page-emoji">{emoji}</span> {title}
      </h1>
      <p className="page-subtitle">{subtitle}</p>
    </header>
  );
}
