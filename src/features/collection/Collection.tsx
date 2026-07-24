import { useEffect, useState } from 'react';
import { useJourney } from '../../state/store';
import { CARDS } from '../../data/cards';
import { BADGES } from '../../data/badges';
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

function CardModal({ card, onClose }: { card: WisdomCard; onClose: () => void }) {
  const { t, L } = useT();
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3.2rem' }}>{card.emoji}</div>
        <h2>{L(card.title)}</h2>
        <p>
          <span className={card.rarity === 'legendary' ? 'pill pill-gold' : 'pill'}>{t(RARITY_KEY[card.rarity])}</span>{' '}
          <span className="pill">{t(CATEGORY_KEY[card.category])}</span>
        </p>
        <p style={{ fontStyle: 'italic' }}>{L(card.text)}</p>
      </div>
    </Modal>
  );
}

export default function Collection() {
  const unlockedCards = useJourney((s) => s.unlockedCards);
  const unlockedBadges = useJourney((s) => s.unlockedBadges);
  const markCollectionSeen = useJourney((s) => s.markCollectionSeen);
  const [open, setOpen] = useState<WisdomCard | null>(null);
  const [tab, setTab] = useState<'cards' | 'badges'>('cards');
  const { t, L, locale } = useT();

  // Clear the "new item" nav badge as soon as the user opens this tab —
  // covers both a fresh visit and an unlock happening while already here.
  useEffect(() => {
    markCollectionSeen();
  }, [markCollectionSeen, unlockedCards.length, unlockedBadges.length]);

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
        <div className="card-grid">
          {CARDS.map((card) => {
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
