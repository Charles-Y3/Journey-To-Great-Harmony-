import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../state/profileStore';
import { useT } from '../../i18n/useT';
import { isJunkName } from '../../engine/textQuality';

/**
 * Second onboarding step, shown once after the language gate: asks the
 * user's name so fellow (simulated) travellers can identify them in
 * Community and the Great Harmony World. Optional — can be skipped, and
 * changed later in Settings.
 */
export default function NameGate() {
  const { t } = useT();
  const navigate = useNavigate();
  const setName = useProfile((s) => s.setName);
  const [text, setText] = useState('');
  const junk = text.trim() !== '' && isJunkName(text);

  function finish(name: string | null) {
    // Always land on Today — a leftover hash (e.g. #/collection) from a
    // previous session must not become the first screen after onboarding.
    navigate('/', { replace: true });
    setName(name);
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-emoji">🧑‍🌾</div>
        <h1 className="gate-title">{t('nameGateTitle')}</h1>
        <p className="gate-subtitle">{t('nameGateSubtitle')}</p>
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
        <div className="gate-options" style={{ marginTop: 16 }}>
          <button className="btn btn-primary" disabled={!text.trim() || junk} onClick={() => finish(text)}>
            {t('nameGateContinue')}
          </button>
          <button className="btn" onClick={() => finish(null)}>
            {t('nameGateSkip')}
          </button>
        </div>
      </div>
    </div>
  );
}
