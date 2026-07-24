import { useLocale } from '../../state/localeStore';
import { LOCALES, LOCALE_LABELS, type Locale } from '../../i18n/types';
import { t } from '../../i18n/strings';

// Before a language is chosen there is no "current locale" to render in,
// but showing all three variants (including both Simplified and Traditional,
// which mostly overlap) is repetitive. Represent the pre-choice screen with
// just English + Traditional Chinese.
const GATE_PREVIEW_LOCALES: Locale[] = ['en', 'zh-Hant'];

/**
 * Full-screen language picker shown once, before the rest of the app, on a
 * fresh install. The choice is stored in useLocale (separate from journey
 * progress) and can always be changed later from Settings.
 */
export default function LanguageGate() {
  const setLocale = useLocale((s) => s.setLocale);

  return (
    <div className="gate">
      <div className="gate-card">
        <div className="gate-emoji">🌏</div>
        <h1 className="gate-title">{GATE_PREVIEW_LOCALES.map((l) => t('gateWelcome', l)).join(' · ')}</h1>
        <p className="gate-subtitle">{GATE_PREVIEW_LOCALES.map((l) => t('gateSubtitle', l)).join(' ')}</p>
        <div className="gate-options">
          {LOCALES.map((locale: Locale) => (
            <button key={locale} className="gate-option" onClick={() => setLocale(locale)}>
              <span className="gate-flag">{LOCALE_LABELS[locale].flagEmoji}</span>
              <span className="gate-native">{LOCALE_LABELS[locale].native}</span>
            </button>
          ))}
        </div>
        <p className="gate-footnote">{GATE_PREVIEW_LOCALES.map((l) => t('gateChangeLater', l)).join(' · ')}</p>
      </div>
    </div>
  );
}
