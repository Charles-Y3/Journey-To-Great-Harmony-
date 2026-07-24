import type { Greeting } from '../data/greetings';

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

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Speaks a peer's greeting aloud, cancelling any greeting already in progress. */
export function speakGreeting(greeting: Greeting): void {
  if (!speechSupported()) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(greeting.text);
    utterance.lang = LANG_TO_BCP47[greeting.lang] ?? 'en-US';
    window.speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis is best-effort flavour, not core functionality —
    // never let a synthesis failure break the click interaction.
  }
}
