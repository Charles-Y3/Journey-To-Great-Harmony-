import type { Greeting } from '../data/greetings';
import type { Locale } from '../i18n/types';

// Maps each greeting's display language label (data/greetings.ts) to a
// BCP-47 tag so SpeechSynthesis pronounces it correctly, rather than
// reading e.g. Hindi text with whatever the browser's default voice is.
const LANG_TO_BCP47: Record<string, string> = {
  中文: 'zh-CN',
  हिन्दी: 'hi-IN',
  Ελληνικά: 'el-GR',
  'Tiếng Việt': 'vi-VN',
  العربية: 'ar-SA',
  Italiano: 'it-IT',
  日本語: 'ja-JP',
  English: 'en-US',
};

// Maps the app's own locale setting to a BCP-47 tag, for reading UI-chrome
// text aloud (as opposed to speakGreeting's fixed real-world languages).
const APP_LOCALE_TO_BCP47: Record<Locale, string> = {
  en: 'en-US',
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-TW',
};

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function speak(text: string, lang: string): void {
  if (!speechSupported()) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis is best-effort flavour, not core functionality —
    // never let a synthesis failure break the click interaction.
  }
}

/** Speaks a peer's greeting aloud, cancelling any greeting already in progress. */
export function speakGreeting(greeting: Greeting): void {
  speak(greeting.text, LANG_TO_BCP47[greeting.lang] ?? 'en-US');
}

/** Speaks a piece of app UI text aloud in the user's current app language. */
export function speakAppText(text: string, locale: Locale): void {
  speak(text, APP_LOCALE_TO_BCP47[locale]);
}
