import { useEffect } from 'react';
import { useJourney } from '../../state/store';
import { useUi } from '../../state/uiStore';
import { CARDS } from '../../data/cards';
import { CARD_ART } from '../../data/cardArt';
import type { CardRarity } from '../../data/types';
import { ADVISOR_TOPICS, ADVISOR_WISDOM, type AdvisorTopicId } from '../../data/advisorWisdom';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import type { UiKey } from '../../i18n/strings';
import { todayKey } from '../../engine/progression';

const RARITY_KEY: Record<CardRarity, UiKey> = {
  common: 'rarityCommon',
  rare: 'rarityRare',
  legendary: 'rarityLegendary',
};

const TOPIC_LABEL_KEY: Record<AdvisorTopicId, UiKey> = {
  patience: 'advisorTopicPatience',
  anger: 'advisorTopicAnger',
  loss: 'advisorTopicLoss',
  purpose: 'advisorTopicPurpose',
  relationships: 'advisorTopicRelationships',
  doubt: 'advisorTopicDoubt',
};

const SPARKLE_SPOTS = [
  { top: '10%', left: '18%', delay: '0s' },
  { top: '15%', left: '80%', delay: '0.4s' },
  { top: '50%', left: '6%', delay: '0.9s' },
  { top: '55%', left: '92%', delay: '0.2s' },
  { top: '85%', left: '28%', delay: '1.3s' },
  { top: '82%', left: '68%', delay: '0.7s' },
];

function fillTemplate(template: string, streak: number, harmony: number): string {
  return template.replace('{{streak}}', String(streak)).replace('{{harmony}}', String(harmony));
}

export default function Advisor() {
  const { t, L } = useT();
  const unlockedCards = useJourney((s) => s.unlockedCards);
  const streakCurrent = useJourney((s) => s.streakCurrent);
  const harmonyPoints = useJourney((s) => s.harmonyPoints);

  const advisorFigureId = useUi((s) => s.advisorFigureId);
  const setAdvisorFigureId = useUi((s) => s.setAdvisorFigureId);
  const seenAdvisorUnlock = useUi((s) => s.seenAdvisorUnlock);
  const setSeenAdvisorUnlock = useUi((s) => s.setSeenAdvisorUnlock);
  const lastAdvisorQuestionDay = useUi((s) => s.lastAdvisorQuestionDay);
  const lastAdvisorTopicId = useUi((s) => s.lastAdvisorTopicId);
  const lastAdvisorStreakSnapshot = useUi((s) => s.lastAdvisorStreakSnapshot);
  const lastAdvisorHarmonySnapshot = useUi((s) => s.lastAdvisorHarmonySnapshot);
  const answerAdvisorToday = useUi((s) => s.answerAdvisorToday);

  useEffect(() => {
    if (!seenAdvisorUnlock) setSeenAdvisorUnlock(true);
  }, [seenAdvisorUnlock, setSeenAdvisorUnlock]);

  const ownedFigureCards = CARDS.filter((c) => c.category === 'figure' && unlockedCards.includes(c.id));
  const advisorCard = advisorFigureId ? ownedFigureCards.find((c) => c.id === advisorFigureId) ?? null : null;

  if (ownedFigureCards.length === 0) {
    return (
      <div>
        <PageHeader emoji="🧭" title={t('advisorTitle')} subtitle={t('advisorPickSubtitle')} />
        <p className="muted">{t('advisorLockedMessage')}</p>
      </div>
    );
  }

  if (!advisorCard) {
    return (
      <div>
        <PageHeader emoji="🧭" title={t('advisorTitle')} subtitle={t('advisorPickSubtitle')} />
        <div className="advisor-picker-grid">
          {ownedFigureCards.map((card) => (
            <div
              key={card.id}
              className={`wcard ${card.rarity}`}
              role="button"
              tabIndex={0}
              onClick={() => setAdvisorFigureId(card.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setAdvisorFigureId(card.id);
              }}
            >
              <span className="wcard-emoji">{card.emoji}</span>
              <span className="wcard-name">{L(card.title)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const answeredToday = lastAdvisorQuestionDay === todayKey(0);
  const answeredTopic = answeredToday ? (lastAdvisorTopicId as AdvisorTopicId | null) : null;
  const answerStreak = lastAdvisorStreakSnapshot ?? streakCurrent;
  const answerHarmony = lastAdvisorHarmonySnapshot ?? harmonyPoints;
  const entry = answeredTopic ? ADVISOR_WISDOM[advisorCard.id]?.[answeredTopic] : null;
  const Art = CARD_ART[advisorCard.id];

  return (
    <div>
      <div className="advisor-card">
        <div className={`card-modal-hero card-modal-hero-${advisorCard.rarity}`}>
          {advisorCard.rarity === 'legendary' &&
            SPARKLE_SPOTS.map((s, i) => (
              <span key={i} className="card-modal-sparkle" style={{ top: s.top, left: s.left, animationDelay: s.delay }} aria-hidden="true">
                ✨
              </span>
            ))}
          <div className={`card-modal-portrait card-modal-portrait-${advisorCard.rarity}`}>
            <div className="card-modal-portrait-inner">{Art ? <Art /> : <span className="card-modal-portrait-emoji">{advisorCard.emoji}</span>}</div>
          </div>
          <h2 style={{ marginBottom: 4 }}>{L(advisorCard.title)}</h2>
          <p style={{ marginBottom: 10 }}>
            <span className={advisorCard.rarity === 'legendary' ? 'pill pill-gold' : 'pill'}>{t(RARITY_KEY[advisorCard.rarity])}</span>{' '}
            <span className="pill">{t('categoryFigure')}</span>
          </p>
          <button type="button" className="btn" disabled={answeredToday} onClick={() => setAdvisorFigureId(null)}>
            {t('advisorChangeCta')}
          </button>
          {answeredToday && (
            <p className="small muted" style={{ marginTop: 8, marginBottom: 0 }}>
              {t('advisorChangeLockedHint')}
            </p>
          )}
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          <h4>{t('advisorAskHeading')}</h4>
          <div className="tab-row">
            {ADVISOR_TOPICS.map((topicId) => {
              const isAnswered = answeredTopic === topicId;
              const disabled = answeredToday && !isAnswered;
              return (
                <button
                  key={topicId}
                  type="button"
                  className={isAnswered ? 'btn tab-btn active' : 'btn tab-btn'}
                  disabled={disabled}
                  onClick={() => answerAdvisorToday(topicId, streakCurrent, harmonyPoints)}
                >
                  {t(TOPIC_LABEL_KEY[topicId])}
                </button>
              );
            })}
          </div>

          {entry ? (
            <div className={`advisor-response-panel ${advisorCard.rarity}`}>
              <p className="advisor-quote">“{L(entry.quote)}”</p>
              <p style={{ marginBottom: entry.reflection ? 10 : 0 }}>{L(entry.framing)}</p>
              {entry.reflection && (
                <p className="advisor-reflection">{fillTemplate(L(entry.reflection), answerStreak, answerHarmony)}</p>
              )}
              <p className="small muted" style={{ marginTop: 10, marginBottom: 0 }}>
                {t('advisorComeBackTomorrow')}
              </p>
            </div>
          ) : (
            <p className="small muted" style={{ marginTop: 14 }}>
              {t('advisorHintText')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
