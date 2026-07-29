import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../state/store';
import { useT } from '../i18n/useT';
import { continueBtn, minLengthHint, capstoneSubmitBtn, type UiKey } from '../i18n/strings';
import { XP_FOR } from '../engine/progression';
import { useIsNavRouteUnlocked } from '../engine/pacing';
import { meaningfulLength, progressLength, looksLikeNonsense, TEXT_MIN } from '../engine/textQuality';
import { playSfx } from '../engine/sfx';

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
  fullscreen,
  className,
  hideCloseButton,
  closeOnContentClick,
}: {
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  /** Near-fullscreen presentation for content meant to be the whole show (e.g. a Wisdom Card). */
  fullscreen?: boolean;
  /** Extra class(es) appended to the modal panel, e.g. for rarity-tinted borders. */
  className?: string;
  /** Omit the "✕" button — for content simple/large enough that tapping anywhere should close it instead. */
  hideCloseButton?: boolean;
  /** Let a click anywhere on the panel close it, instead of only the backdrop (pairs with hideCloseButton). */
  closeOnContentClick?: boolean;
}) {
  const { t } = useT();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  let cls = 'modal';
  if (fullscreen) cls += ' modal-fullscreen';
  else if (wide) cls += ' modal-wide';
  if (className) cls += ` ${className}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={cls} onClick={closeOnContentClick ? onClose : (e) => e.stopPropagation()}>
        {!hideCloseButton && (
          <button className="modal-close" onClick={onClose} aria-label={t('close')}>
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function ctaLabelKey(ctaTo: string): UiKey {
  if (ctaTo === '/forest') return 'celebrateVisitForest';
  if (ctaTo === '/world') return 'celebrateVisitWorld';
  if (ctaTo === '/collection') return 'celebrateVisitCollection';
  if (ctaTo === '/map') return 'celebrateVisitMap';
  if (ctaTo === '/glyphs') return 'openGlyphsCta';
  return 'celebrateContinue';
}

/** Shows queued celebrations (rank-ups, badges, cards, growth) one at a time. */
export function CelebrationOverlay() {
  const celebrations = useJourney((s) => s.celebrations);
  const dismiss = useJourney((s) => s.dismissCelebration);
  const { locale, t } = useT();

  const headId = celebrations[0]?.id;
  const headMajor = celebrations[0]?.major;
  useEffect(() => {
    if (headId && headMajor) playSfx('celebrate');
  }, [headId, headMajor]);
  // Growth/card celebrations can fire from a wave-0 or wave-1 action (e.g.
  // finishing a Knowledge lesson bumps forest growth or unlocks a card)
  // well before the page they'd send you to — Forest, World, Collection —
  // is itself wave-unlocked. Called before the early return below so hook
  // order stays stable regardless of whether a celebration is queued.
  const ctaUnlocked = useIsNavRouteUnlocked(celebrations[0]?.ctaTo ?? '');

  if (celebrations.length === 0) return null;
  const c = celebrations[0];
  const major = !!c.major;
  const showCta = !!c.ctaTo && ctaUnlocked;

  return (
    <div className="modal-backdrop celebrate-backdrop" onClick={dismiss}>
      <div className={major ? 'celebrate celebrate--major' : 'celebrate'} onClick={(e) => e.stopPropagation()}>
        {major && (
          <div className="celebrate-bloom" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
        <div className="celebrate-emoji">{c.emoji}</div>
        <h2>{c.title}</h2>
        {c.subtitle && <p className="celebrate-sub">{c.subtitle}</p>}
        <div className="celebrate-actions">
          {showCta && (
            <Link className="btn btn-primary" to={c.ctaTo!} onClick={dismiss}>
              {t(ctaLabelKey(c.ctaTo!))}
            </Link>
          )}
          <button className={showCta ? 'btn' : 'btn btn-primary'} onClick={dismiss}>
            {continueBtn(locale, celebrations.length - 1)}
          </button>
        </div>
      </div>
    </div>
  );
}

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
      <p className="small muted">{minLengthHint(locale, progressLength(text), TEXT_MIN.capstone)}</p>
      {progressLength(text) >= TEXT_MIN.capstone && looksLikeNonsense(text) && (
        <p className="small muted">{t('textNonsenseHint')}</p>
      )}
      <button
        className="btn btn-primary"
        disabled={meaningfulLength(text) < TEXT_MIN.capstone}
        onClick={() => onSubmit(text.trim())}
      >
        {capstoneSubmitBtn(locale, XP_FOR.capstone)}
      </button>
    </Modal>
  );
}

/** Emoji avatar with an optional collision ring — shared between World.tsx and Community.tsx. */
export function AvatarGlyph({ emoji, ringed, className }: { emoji: string; ringed?: boolean; className?: string }) {
  return (
    <span className={[className, ringed ? 'avatar-ring-collision' : ''].filter(Boolean).join(' ')} aria-hidden="true">
      {emoji}
    </span>
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
