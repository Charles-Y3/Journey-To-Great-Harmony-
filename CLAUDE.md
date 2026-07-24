# Journey to Great Harmony — repo notes

## i18n rule (do not violate)

**Every user-facing string in this app must follow the user's chosen
language setting (English / Simplified Chinese / Traditional Chinese) —
no exceptions, no hardcoded English fallbacks, no showing multiple
languages at once outside of an explicit language picker.**

Concretely:

- All UI chrome text goes through `t('key')` from `src/i18n/useT.ts` /
  `src/i18n/strings.ts`. Never write a raw English (or Chinese) string
  literal directly into JSX — add a key to `UI` in `src/i18n/strings.ts`
  (or a small templated function alongside it) instead.
- All content data (timeline, knowledge path, challenges, quotes, cards,
  badges, map, world, peers, ranks) is typed as `Localized<T>`
  (`src/i18n/types.ts`) and rendered via `L(field)` from `useT()`. New
  content must be authored in **English and Simplified Chinese**;
  Traditional Chinese is derived automatically — see below.
- The only exception is the pre-language-selection gate
  (`src/features/onboarding/LanguageGate.tsx`), which has no "current
  locale" yet. Even there, don't loop over all three locales — it shows
  English + Traditional Chinese only (see `GATE_PREVIEW_LOCALES`), since
  Simplified/Traditional side-by-side is redundant. **Once a language is
  chosen, only that language should ever appear — no exceptions.** An
  earlier version of this app showed decorative bilingual accents next
  to page titles, topic/card names, and quotes (e.g. "The Wisdom
  Timeline 智慧长河") even after a language was chosen; this was wrong
  and was removed (see `PageHeader`, which no longer takes a `zh` prop —
  don't reintroduce one). `types.ts` still has a couple of unused
  optional decorative fields (`Topic.accent`, `WisdomCard.accent`,
  `Quote.originalZh`) left over from that design; they are not rendered
  anywhere and should stay that way — don't wire them back up.
- One deliberate, narrow exception exists: the wandering peers on the
  Great Harmony World tab (`src/features/world/World.tsx`) each greet
  the user in a different real-world language when clicked
  (`src/data/greetings.ts`, `PEER_GREETINGS`), regardless of the app's
  language setting. This is content, not chrome — the entire feature is
  "show off many world languages" — so it does not go through
  `Localized`/`t()`/`L()`. Don't localize it away; don't extend this
  pattern to anything else without a similarly explicit reason.
- After adding or editing any `Localized` content, run `npm run gen:i18n`
  to regenerate `src/i18n/zhHant.generated.json` (the Simplified→Traditional
  lookup table, built via `opencc-js` at build time so the ~1MB conversion
  dictionary never ships to the browser). Commit the regenerated file.
- Before shipping any user-facing change, sanity check it in all three
  languages (Settings → Language, or the first-run gate), not just English.
