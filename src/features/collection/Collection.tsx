import { useEffect, useState } from 'react';
import { useJourney } from '../../state/store';
import { CARDS } from '../../data/cards';
import { BADGES } from '../../data/badges';
import { ALL_POINTS } from '../../data/timeline';
import { CARD_ART } from '../../data/cardArt';
import type { CardRarity, WisdomCard } from '../../data/types';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { badgesTabLabel, type UiKey } from '../../i18n/strings';
import { playSfx } from '../../engine/sfx';

const RARITY_KEY: Record<CardRarity, UiKey> = {
  common: 'rarityCommon',
  rare: 'rarityRare',
  legendary: 'rarityLegendary',
};

const CATEGORY_KEY: Record<WisdomCard['category'], UiKey> = {
  figure: 'categoryFigure',
  teaching: 'categoryTeaching',
  virtue: 'categoryVirtue',
  story: 'categoryStory',
};

/** Fixed top-right corner glyph per category — a signal separate from rarity
 * (border/glow) and from the card's own centred art (which figure/virtue/etc.). */
const CATEGORY_ICON: Record<WisdomCard['category'], string> = {
  figure: '🧑',
  teaching: '💡',
  virtue: '💛',
  story: '📖',
};

const SPARKLE_SPOTS = [
  { top: '10%', left: '18%', delay: '0s' },
  { top: '15%', left: '80%', delay: '0.4s' },
  { top: '50%', left: '6%', delay: '0.9s' },
  { top: '55%', left: '92%', delay: '0.2s' },
  { top: '85%', left: '28%', delay: '1.3s' },
  { top: '82%', left: '68%', delay: '0.7s' },
];

export function CardModal({ card, onClose }: { card: WisdomCard; onClose: () => void }) {
  const { t, L } = useT();
  const Art = CARD_ART[card.id];
  const timelinePoint = ALL_POINTS.find((p) => p.cardId === card.id);
  return (
    <Modal onClose={onClose} fullscreen className={`modal-rarity-${card.rarity}`} hideCloseButton closeOnContentClick>
      <div className={`card-modal-hero card-modal-hero-${card.rarity}`}>
        {timelinePoint && <span className="card-modal-year">{L(timelinePoint.years)}</span>}
        <span className="card-modal-icon-badge" aria-hidden="true" title={t(CATEGORY_KEY[card.category])}>
          {CATEGORY_ICON[card.category]}
        </span>
        {card.rarity === 'legendary' &&
          SPARKLE_SPOTS.map((s, i) => (
            <span key={i} className="card-modal-sparkle" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true">
              ✨
            </span>
          ))}
        <div className={`card-modal-portrait card-modal-portrait-${card.rarity}`}>
          <div className="card-modal-portrait-inner">{Art ? <Art /> : <span className="card-modal-portrait-emoji">{card.emoji}</span>}</div>
        </div>
        <h2 style={{ marginBottom: 4 }}>{L(card.title)}</h2>
        <p style={{ marginBottom: 0 }}>
          <span className={card.rarity === 'legendary' ? 'pill pill-gold' : 'pill'}>{t(RARITY_KEY[card.rarity])}</span>{' '}
          <span className="pill">{t(CATEGORY_KEY[card.category])}</span>
        </p>
      </div>
      <div className="card-modal-body">
        <h4>{t('cardSummaryHeading')}</h4>
        <p>{L(card.summary)}</p>
        <h4>{t('cardQuoteHeading')}</h4>
        <p className="card-modal-quote">“{L(card.quote)}”</p>
        <h4>{t('cardDetailHeading')}</h4>
        <p className="small muted">{L(card.didYouKnow)}</p>
      </div>
    </Modal>
  );
}

function CardReveal({ card, onDone }: { card: WisdomCard; onDone: () => void }) {
  const { t, L } = useT();
  useEffect(() => {
    playSfx(card.rarity === 'legendary' ? 'celebrate' : 'chime');
    const timer = window.setTimeout(onDone, card.rarity === 'legendary' ? 1600 : 1100);
    return () => window.clearTimeout(timer);
    // Intentionally only re-run when the revealed card identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  return (
    <div className="modal-backdrop celebrate-backdrop" onClick={onDone}>
      <div className={`card-reveal card-reveal-${card.rarity}`} onClick={(e) => e.stopPropagation()}>
        <div className="card-reveal-inner">
          <div className="card-reveal-emoji">{card.emoji}</div>
          <h2>{L(card.title)}</h2>
          <p className="small muted">{t(RARITY_KEY[card.rarity])}</p>
          <button className="btn btn-primary" onClick={onDone}>
            {t('cardRevealTap')}
          </button>
        </div>
      </div>
    </div>
  );
}

const RARITY_FILTERS: { id: 'all' | CardRarity; key: UiKey }[] = [
  { id: 'all', key: 'rarityFilterAll' },
  { id: 'common', key: 'rarityCommon' },
  { id: 'rare', key: 'rarityRare' },
  { id: 'legendary', key: 'rarityLegendary' },
];

export default function Collection() {
  const unlockedCards = useJourney((s) => s.unlockedCards);
  const unlockedBadges = useJourney((s) => s.unlockedBadges);
  const revealedCards = useJourney((s) => s.revealedCards ?? []);
  const markCollectionSeen = useJourney((s) => s.markCollectionSeen);
  const markCardRevealed = useJourney((s) => s.markCardRevealed);
  const [open, setOpen] = useState<WisdomCard | null>(null);
  const [revealing, setRevealing] = useState<WisdomCard | null>(null);
  const [tab, setTab] = useState<'cards' | 'badges'>('cards');
  const [rarityFilter, setRarityFilter] = useState<'all' | CardRarity>('all');
  const { t, L, locale } = useT();

  useEffect(() => {
    markCollectionSeen();
  }, [markCollectionSeen, unlockedCards.length, unlockedBadges.length]);

  const visibleCards = rarityFilter === 'all' ? CARDS : CARDS.filter((c) => c.rarity === rarityFilter);

  function rarityFilterCounts(filterId: 'all' | CardRarity): { owned: number; total: number } {
    const cardsForFilter = filterId === 'all' ? CARDS : CARDS.filter((c) => c.rarity === filterId);
    return { owned: cardsForFilter.filter((c) => unlockedCards.includes(c.id)).length, total: cardsForFilter.length };
  }

  function openCard(card: WisdomCard) {
    if (!revealedCards.includes(card.id)) {
      setRevealing(card);
      return;
    }
    setOpen(card);
  }

  return (
    <div>
      <PageHeader emoji="🎴" title={t('collectionTitle')} subtitle={t('collectionSubtitle')} />

      {unlockedCards.length === 0 && (
        <p className="small muted" style={{ marginBottom: 12 }}>{t('collectionFirstPromise')}</p>
      )}

      <div className="tab-row">
        <button className={tab === 'cards' ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setTab('cards')}>
          {t('wisdomCardsTab')}
        </button>
        <button className={tab === 'badges' ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setTab('badges')}>
          {badgesTabLabel(locale, unlockedBadges.length, BADGES.length)}
        </button>
      </div>

      {tab === 'cards' ? (
        <>
          <div className="tab-row rarity-filter-row">
            {RARITY_FILTERS.map((f) => {
              const { owned, total } = rarityFilterCounts(f.id);
              return (
                <button
                  key={f.id}
                  className={rarityFilter === f.id ? 'btn tab-btn active' : 'btn tab-btn'}
                  onClick={() => setRarityFilter(f.id)}
                >
                  {t(f.key)} ({owned}/{total})
                </button>
              );
            })}
          </div>
          <div className="card-grid">
            {visibleCards.map((card) => {
              const owned = unlockedCards.includes(card.id);
              return (
                <div key={card.id} className={owned ? `wcard ${card.rarity}` : 'wcard locked'} onClick={() => owned && openCard(card)} title={owned ? L(card.title) : L(card.unlockHint)}>
                  {owned && (
                    <span className="wcard-category-badge" aria-hidden="true">
                      {CATEGORY_ICON[card.category]}
                    </span>
                  )}
                  <div className="wcard-emoji">{owned ? card.emoji : '❔'}</div>
                  <strong>{owned ? L(card.title) : t('lockedCardTitle')}</strong>
                  <span className="small muted">{owned ? t(RARITY_KEY[card.rarity]) : L(card.unlockHint)}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="card-grid">
          {BADGES.map((badge) => {
            const owned = unlockedBadges.includes(badge.id);
            return (
              <div key={badge.id} className={owned ? 'badge-tile' : 'badge-tile locked'} title={L(badge.description)}>
                <div className="wcard-emoji">{badge.emoji}</div>
                <strong>{L(badge.title)}</strong>
                <p className="small muted" style={{ margin: '4px 0 0' }}>
                  {L(badge.description)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {revealing && (
        <CardReveal
          card={revealing}
          onDone={() => {
            markCardRevealed(revealing.id);
            setOpen(revealing);
            setRevealing(null);
          }}
        />
      )}
      {open && !revealing && <CardModal card={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
