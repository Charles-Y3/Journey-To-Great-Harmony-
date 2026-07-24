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
- The one intentional exception is the pre-language-selection gate
  (`src/features/onboarding/LanguageGate.tsx`), which has no "current
  locale" yet. Even there, don't loop over all three locales — it shows
  English + Traditional Chinese only (see `GATE_PREVIEW_LOCALES`), since
  Simplified/Traditional side-by-side is redundant. Once a language is
  chosen, only that language should ever appear (the one deliberate,
  narrow exception is the small bilingual "original source text" flourish
  under quotes/ranks, shown only in English locale — see
  `quote.originalZh` usage).
- After adding or editing any `Localized` content, run `npm run gen:i18n`
  to regenerate `src/i18n/zhHant.generated.json` (the Simplified→Traditional
  lookup table, built via `opencc-js` at build time so the ~1MB conversion
  dictionary never ships to the browser). Commit the regenerated file.
- Before shipping any user-facing change, sanity check it in all three
  languages (Settings → Language, or the first-run gate), not just English.
