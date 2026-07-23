import { useState } from 'react';
import { useJourney } from '../../state/store';
import { CARDS } from '../../data/cards';
import { BADGES } from '../../data/badges';
import type { WisdomCard } from '../../data/types';
import { Modal, PageHeader } from '../../components/ui';

function CardModal({ card, onClose }: { card: WisdomCard; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3.2rem' }}>{card.emoji}</div>
        <h2>
          {card.title} {card.zh && <span className="zh-accent">{card.zh}</span>}
        </h2>
        <p>
          <span className={card.rarity === 'legendary' ? 'pill pill-gold' : 'pill'}>{card.rarity}</span>{' '}
          <span className="pill">{card.category}</span>
        </p>
        <p style={{ fontStyle: 'italic' }}>{card.text}</p>
      </div>
    </Modal>
  );
}

export default function Collection() {
  const unlockedCards = useJourney((s) => s.unlockedCards);
  const unlockedBadges = useJourney((s) => s.unlockedBadges);
  const [open, setOpen] = useState<WisdomCard | null>(null);
  const [tab, setTab] = useState<'cards' | 'badges'>('cards');

  return (
    <div>
      <PageHeader
        emoji="🎴"
        title="Collection"
        zh="收藏"
        subtitle="Wisdom cards and achievement badges gathered along your journey."
      />

      <div className="tab-row">
        <button className={tab === 'cards' ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setTab('cards')}>
          🎴 Wisdom Cards ({unlockedCards.length}/{CARDS.length})
        </button>
        <button className={tab === 'badges' ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setTab('badges')}>
          🏅 Badges ({unlockedBadges.length}/{BADGES.length})
        </button>
      </div>

      {tab === 'cards' ? (
        <div className="card-grid">
          {CARDS.map((card) => {
            const owned = unlockedCards.includes(card.id);
            return (
              <div
                key={card.id}
                className={owned ? `wcard ${card.rarity}` : 'wcard locked'}
                onClick={() => owned && setOpen(card)}
                title={owned ? card.title : card.unlockHint}
              >
                <div className="wcard-emoji">{owned ? card.emoji : '❔'}</div>
                <strong>{owned ? card.title : '???'}</strong>
                <span className="small muted">{owned ? card.rarity : card.unlockHint}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-grid">
          {BADGES.map((badge) => {
            const owned = unlockedBadges.includes(badge.id);
            return (
              <div key={badge.id} className={owned ? 'badge-tile' : 'badge-tile locked'} title={badge.description}>
                <div className="wcard-emoji">{badge.emoji}</div>
                <strong>{badge.title}</strong>
                <p className="small muted" style={{ margin: '4px 0 0' }}>
                  {badge.description}
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
