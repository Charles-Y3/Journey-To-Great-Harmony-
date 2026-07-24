import { useEffect, useState, type ReactNode } from 'react';
import { useJourney } from '../state/store';
import { useT } from '../i18n/useT';
import { continueBtn, minLengthHint, capstoneSubmitBtn } from '../i18n/strings';
import { XP_FOR } from '../engine/progression';

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

const CAPSTONE_MIN = 40;

/** Shared modal for writing a longer "capstone" reflection that gates an era or branch-mastery badge. */
export function CapstoneModal({
  name,
  prompt,
  onSubmit,
  onClose,
}: {
  name: string;
  prompt: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState('');
  const { t, locale } = useT();

  return (
    <Modal onClose={onClose}>
      <h2>
        {t('capstoneModalTitle')} · {name}
      </h2>
      <p>{prompt}</p>
      <textarea rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder={t('capstonePlaceholder')} />
      <p className="small muted">{minLengthHint(locale, text.trim().length, CAPSTONE_MIN)}</p>
      <button
        className="btn btn-primary"
        disabled={text.trim().length < CAPSTONE_MIN}
        onClick={() => onSubmit(text.trim())}
      >
        {capstoneSubmitBtn(locale, XP_FOR.capstone)}
      </button>
    </Modal>
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
