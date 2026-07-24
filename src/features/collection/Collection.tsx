import { useEffect, useState } from 'react';
import { useJourney } from '../../state/store';
import { CARDS } from '../../data/cards';
import { BADGES } from '../../data/badges';
import { ALL_POINTS } from '../../data/timeline';
import { CARD_ART } from '../../data/cardArt';
import type { CardRarity, WisdomCard } from '../../data/types';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { cardsTabLabel, badgesTabLabel, type UiKey } from '../../i18n/strings';

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

// Decorative twinkle positions for the legendary-only sparkle particles
// around the portrait medallion. Purely cosmetic, so a fixed layout (not
// seeded per-card) is fine.
const SPARKLE_SPOTS = [
  { top: '10%', left: '18%', delay: '0s' },
  { top: '15%', left: '80%', delay: '0.4s' },
  { top: '50%', left: '6%', delay: '0.9s' },
  { top: '55%', left: '92%', delay: '0.2s' },
  { top: '85%', left: '28%', delay: '1.3s' },
  { top: '82%', left: '68%', delay: '0.7s' },
];

function CardModal({ card, onClose }: { card: WisdomCard; onClose: () => void }) {
  const { t, L } = useT();
  const Art = CARD_ART[card.id];
  const timelinePoint = ALL_POINTS.find((p) => p.cardId === card.id);
  return (
    <Modal onClose={onClose} fullscreen className={`modal-rarity-${card.rarity}`} hideCloseButton closeOnContentClick>
      <div className={`card-modal-hero card-modal-hero-${card.rarity}`}>
        {timelinePoint && <span className="card-modal-year">{L(timelinePoint.years)}</span>}
        <span className="card-modal-icon-badge" aria-hidden="true">
          {card.emoji}
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
        <p style={{ fontStyle: 'italic', fontSize: '1.05rem' }}>{L(card.text)}</p>
        {card.detail && (
          <>
            <h4>{t('cardDetailHeading')}</h4>
            <p className="small muted">{L(card.detail)}</p>
          </>
        )}
      </div>
    </Modal>
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
  const markCollectionSeen = useJourney((s) => s.markCollectionSeen);
  const [open, setOpen] = useState<WisdomCard | null>(null);
  const [tab, setTab] = useState<'cards' | 'badges'>('cards');
  const [rarityFilter, setRarityFilter] = useState<'all' | CardRarity>('all');
  const { t, L, locale } = useT();

  // Clear the "new item" nav badge as soon as the user opens this tab —
  // covers both a fresh visit and an unlock happening while already here.
  useEffect(() => {
    markCollectionSeen();
  }, [markCollectionSeen, unlockedCards.length, unlockedBadges.length]);

  const visibleCards = rarityFilter === 'all' ? CARDS : CARDS.filter((c) => c.rarity === rarityFilter);

  return (
    <div>
      <PageHeader emoji="🎴" title={t('collectionTitle')} subtitle={t('collectionSubtitle')} />

      <div className="tab-row">
        <button className={tab === 'cards' ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setTab('cards')}>
          {cardsTabLabel(locale, unlockedCards.length, CARDS.length)}
        </button>
        <button className={tab === 'badges' ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setTab('badges')}>
          {badgesTabLabel(locale, unlockedBadges.length, BADGES.length)}
        </button>
      </div>

      {tab === 'cards' ? (
        <>
          <div className="tab-row rarity-filter-row">
            {RARITY_FILTERS.map((f) => (
              <button
                key={f.id}
                className={rarityFilter === f.id ? 'btn tab-btn active' : 'btn tab-btn'}
                onClick={() => setRarityFilter(f.id)}
              >
                {t(f.key)}
              </button>
            ))}
          </div>
          <div className="card-grid">
            {visibleCards.map((card) => {
              const owned = unlockedCards.includes(card.id);
              return (
                <div key={card.id} className={owned ? `wcard ${card.rarity}` : 'wcard locked'} onClick={() => owned && setOpen(card)} title={owned ? L(card.title) : L(card.unlockHint)}>
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

      {open && <CardModal card={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
