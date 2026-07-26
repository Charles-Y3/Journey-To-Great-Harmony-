import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../state/profileStore';
import { useTextScale, type TextScale } from '../../state/textScaleStore';
import { AVATARS } from '../../data/avatars';
import { useT } from '../../i18n/useT';
import { isJunkName } from '../../engine/textQuality';
import type { UiKey } from '../../i18n/strings';

const TEXT_SCALE_OPTIONS: { id: TextScale; labelKey: UiKey }[] = [
  { id: 'default', labelKey: 'settingsTextSizeDefault' },
  { id: 'larger', labelKey: 'settingsTextSizeLarger' },
  { id: 'largest', labelKey: 'settingsTextSizeLargest' },
];

/**
 * After language: collect “You” prefs from Settings — name, text size, avatar.
 * Optional name (skippable); size and avatar always saved on continue.
 */
export default function NameGate() {
  const { t } = useT();
  const navigate = useNavigate();
  const setName = useProfile((s) => s.setName);
  const avatar = useProfile((s) => s.avatar);
  const setAvatar = useProfile((s) => s.setAvatar);
  const scale = useTextScale((s) => s.scale);
  const setScale = useTextScale((s) => s.setScale);
  const [text, setText] = useState('');
  const junk = text.trim() !== '' && isJunkName(text);

  function finish(name: string | null) {
    navigate('/', { replace: true });
    setName(name);
  }

  return (
    <div className="gate">
      <div className="gate-card gate-card-you">
        <div className="gate-emoji" aria-hidden="true">
          {avatar}
        </div>
        <h1 className="gate-title">{t('youGateTitle')}</h1>
        <p className="gate-subtitle">{t('youGateSubtitle')}</p>

        <h3 className="gate-section-title">{t('settingsNameTitle')}</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('nameGatePlaceholder')}
          maxLength={40}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && text.trim() && !isJunkName(text)) finish(text);
          }}
        />
        {junk && <p className="small muted">{t('nameJunkHint')}</p>}

        <h3 className="gate-section-title">{t('settingsTextSizeTitle')}</h3>
        <p className="small muted">{t('settingsTextSizeDesc')}</p>
        <div className="tab-row">
          {TEXT_SCALE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={opt.id === scale ? 'btn tab-btn active' : 'btn tab-btn'}
              onClick={() => setScale(opt.id)}
            >
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
        <p className="text-size-preview">{t('settingsTextSizePreview')}</p>

        <h3 className="gate-section-title">{t('settingsAvatarTitle')}</h3>
        <p className="small muted">{t('settingsAvatarDesc')}</p>
        <div className="avatar-picker-grid" role="listbox" aria-label={t('settingsAvatarTitle')}>
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              role="option"
              aria-selected={a === avatar}
              className={a === avatar ? 'avatar-picker-btn active' : 'avatar-picker-btn'}
              onClick={() => setAvatar(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="gate-options" style={{ marginTop: 16 }}>
          <button
            className="btn btn-primary"
            disabled={!text.trim() || junk}
            onClick={() => finish(text)}
          >
            {t('nameGateContinue')}
          </button>
          <button className="btn" onClick={() => finish(null)}>
            {t('nameGateSkip')}
          </button>
        </div>
        <p className="gate-footnote">{t('youGateChangeLater')}</p>
      </div>
    </div>
  );
}
