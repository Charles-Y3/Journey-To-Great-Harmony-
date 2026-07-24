import { useState } from 'react';
import { useJourney } from '../../state/store';
import { CARDS } from '../../data/cards';
import { BADGES } from '../../data/badges';
import type { WisdomCard } from '../../data/types';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { cardsTabLabel, badgesTabLabel } from '../../i18n/strings';

function CardModal({ card, onClose }: { card: WisdomCard; onClose: () => void }) {
  const { L } = useT();
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3.2rem' }}>{card.emoji}</div>
        <h2>
          {L(card.title)} {card.accent && <span className="zh-accent">{card.accent}</span>}
        </h2>
        <p>
          <span className={card.rarity === 'legendary' ? 'pill pill-gold' : 'pill'}>{card.rarity}</span>{' '}
          <span className="pill">{card.category}</span>
        </p>
        <p style={{ fontStyle: 'italic' }}>{L(card.text)}</p>
      </div>
    </Modal>
  );
}

export default function Collection() {
  const unlockedCards = useJourney((s) => s.unlockedCards);
  const unlockedBadges = useJourney((s) => s.unlockedBadges);
  const [open, setOpen] = useState<WisdomCard | null>(null);
  const [tab, setTab] = useState<'cards' | 'badges'>('cards');
  const { t, L, locale } = useT();

  return (
    <div>
      <PageHeader emoji="🎴" title={t('collectionTitle')} zh={t('collectionZh')} subtitle={t('collectionSubtitle')} />

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
                <span className="small muted">{owned ? card.rarity : L(card.unlockHint)}</span>
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
