import type { Peer } from './types';

// A little "world" flourish for the Great Harmony World scene: each
// wandering peer greets the user in a distinct real-world language when
// clicked — a nod to the app's Datong 大同 theme ("within the four seas,
// all people are brothers and sisters"). This is intentionally NOT tied to
// the app's own language setting (English/简/繁) — the whole point of the
// feature is to show off many languages at once, regardless of which one
// the user reads the UI in. See CLAUDE.md for why this is a deliberate,
// narrow exception to the "one language at a time" rule.
export interface Greeting {
  lang: string;
  text: string;
}

export const PEER_GREETINGS: Record<string, Greeting> = {
  'p-mei': { lang: '中文', text: '你好！' },
  'p-arjun': { lang: 'हिन्दी', text: 'नमस्ते!' },
  'p-sofia': { lang: 'Ελληνικά', text: 'Γειά σου!' },
  'p-tao': { lang: 'Tiếng Việt', text: 'Xin chào!' },
  'p-amina': { lang: 'العربية', text: 'مرحبا!' },
  'p-leo': { lang: 'Italiano', text: 'Ciao!' },
  'p-hana': { lang: '日本語', text: 'こんにちは！' },
  'p-sam': { lang: 'English', text: 'Hello!' },
  'p-noor': { lang: 'Türkçe', text: 'Merhaba!' },
  'p-diego': { lang: 'Español', text: '¡Hola!' },
  'p-yuki': { lang: '한국어', text: '안녕하세요!' },
  'p-oskar': { lang: 'Русский', text: 'Привет!' },
  'p-fatima': { lang: 'Kiswahili', text: 'Habari!' },
  'p-chen': { lang: 'Français', text: 'Bonjour!' },
};

export function greetingFor(peer: Peer): Greeting {
  return PEER_GREETINGS[peer.id] ?? { lang: 'English', text: 'Hello!' };
}
