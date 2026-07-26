import { AVATAR_DEFS, isAvatarUnlocked } from '../data/avatars';
import { RANKS } from '../engine/progression';
import { useT } from '../i18n/useT';
import { avatarUnlocksAt } from '../i18n/strings';

interface AvatarPickerProps {
  value: string;
  rankIndex: number;
  onSelect: (emoji: string) => void;
}

export function AvatarPicker({ value, rankIndex, onSelect }: AvatarPickerProps) {
  const { t, L, locale } = useT();

  return (
    <div className="avatar-picker-grid" role="listbox" aria-label={t('settingsAvatarTitle')}>
      {AVATAR_DEFS.map((def) => {
        const unlocked = isAvatarUnlocked(def.emoji, rankIndex);
        const unlockRank = RANKS[def.minRankIndex];
        const unlockLabel = unlockRank
          ? avatarUnlocksAt(locale, L(unlockRank.name))
          : t('settingsAvatarLocked');
        const selected = def.emoji === value;
        return (
          <button
            key={def.emoji}
            type="button"
            role="option"
            aria-selected={selected}
            aria-disabled={!unlocked}
            title={unlocked ? def.emoji : unlockLabel}
            aria-label={unlocked ? def.emoji : unlockLabel}
            disabled={!unlocked}
            className={[
              'avatar-picker-btn',
              selected ? 'active' : '',
              unlocked ? '' : 'locked',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (unlocked) onSelect(def.emoji);
            }}
          >
            <span className="avatar-picker-emoji" aria-hidden="true">
              {def.emoji}
            </span>
            {!unlocked && (
              <span className="avatar-picker-lock" aria-hidden="true">
                🔒
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
