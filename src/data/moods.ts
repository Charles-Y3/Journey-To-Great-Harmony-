import { localized, type Localized } from '../i18n/types';

export type MoodId = 'calm' | 'hopeful' | 'restless' | 'heavy' | 'grateful' | 'unclear';

export interface MoodOption {
  id: MoodId;
  emoji: string;
  label: Localized<string>;
  /** Short response after picking this mood. */
  response: Localized<string>;
  /**
   * Suggested next step — omit for calm / hopeful / grateful (no redirect needed).
   * Prefer actionFocus over URL hashes — HashRouter cannot carry path + fragment.
   */
  actionTo?: string;
  actionFocus?: string;
  actionCta?: Localized<string>;
}

/** Light daytime Heart-check moods — not a clinical inventory. */
export const MOODS: MoodOption[] = [
  {
    id: 'calm',
    emoji: '🌿',
    label: localized('Calm', '平静'),
    response: localized(
      'Good. Carry that steadiness into whatever comes next today.',
      '很好。把这份安定，带进今天接下来的事里。',
    ),
  },
  {
    id: 'hopeful',
    emoji: '🌤️',
    label: localized('Hopeful', '怀有盼望'),
    response: localized(
      'Hope is already a light. Let it colour one ordinary moment today.',
      '盼望本身已是光。让它照亮今天一个平常的瞬间。',
    ),
  },
  {
    id: 'restless',
    emoji: '💨',
    label: localized('Restless', '躁动'),
    response: localized(
      'Restlessness wants motion. Give it a few quiet breaths first.',
      '躁动想要行动。先给它几口安静的呼吸。',
    ),
    actionTo: '/practice',
    actionFocus: 'quiet-moment',
    actionCta: localized('Take a quiet moment', '静坐片刻'),
  },
  {
    id: 'heavy',
    emoji: '🪨',
    label: localized('Heavy', '沉重'),
    response: localized(
      'You need not carry it alone. A short story can lighten the load.',
      '你不必独自扛着。一段短故事，能减轻一些。',
    ),
    actionTo: '/turning-points',
    actionCta: localized('Visit Still Waters', '前往静水'),
  },
  {
    id: 'grateful',
    emoji: '🌸',
    label: localized('Grateful', '感恩'),
    response: localized(
      'Gratitude noticed is already a practice. Hold it gently.',
      '察觉到感恩，本身已是修行。轻轻持守就好。',
    ),
  },
  {
    id: 'unclear',
    emoji: '🌫️',
    label: localized('Unclear', '不清楚'),
    response: localized(
      'Not knowing is honest. Sit with a short story, then see what still feels true.',
      '不知道，也是一种诚实。先坐看一段短故事，再看什么仍然真切。',
    ),
    actionTo: '/turning-points',
    actionCta: localized('Visit Still Waters', '前往静水'),
  },
];

export function moodById(id: string): MoodOption | undefined {
  return MOODS.find((m) => m.id === id);
}
