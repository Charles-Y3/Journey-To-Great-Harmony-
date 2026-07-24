import { useLocale } from '../../state/localeStore';
import { VISIBLE_LOCALES, LOCALE_LABELS, type Locale } from '../../i18n/types';
import { t } from '../../i18n/strings';

// Before a language is chosen there is no "current locale" to render in.
// Preview text cycles through the same locales offered below (see
// VISIBLE_LOCALES) — Simplified Chinese is hidden as a selectable language,
// so it's not shown here either.
const GATE_PREVIEW_LOCALES = VISIBLE_LOCALES;

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
          {VISIBLE_LOCALES.map((locale: Locale) => (
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
