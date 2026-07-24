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
- Watch for raw enum-like data fields rendered directly as text (e.g.
  `WisdomCard.rarity`/`.category` used to leak literal English words like
  "common"/"legendary" into every locale — see `RARITY_KEY`/`CATEGORY_KEY`
  in `src/features/collection/Collection.tsx` for the fix pattern: map the
  enum value to a `UiKey` and render via `t()`, never the raw value).
- Also watch for a Chinese phrase hardcoded directly inside an English
  `localized()` string as a "flourish" (it happened once, in
  `forestFooter`) — grep is `*.tsx`-only in most sweeps, so `.ts` string
  files need checking separately. Not every embedded Chinese character is
  wrong, though: teaching the actual Hanzi for a named term in English
  prose (e.g. "Dao 道 (the Way)", "Ren 仁 (humaneness)") is intentional and
  fine throughout `src/data/timeline.ts` and `src/data/knowledgeTree.ts` —
  the lessons are explicitly teaching those terms. The bug pattern is a
  decorative, un-cited full sentence tacked onto unrelated English text.

## Persistence

Progress (`src/state/store.ts`, key `journey-to-great-harmony`), language
choice (`src/state/localeStore.ts`, key `journey-locale`), display name
(`src/state/profileStore.ts`, key `journey-profile`), and the notification
preference (`src/state/notificationStore.ts`, key `journey-notifications`)
are four separate zustand `persist` stores, all backed by `localStorage` —
deliberately separate so resetting one (e.g. "Reset journey" in Settings)
never touches the others. This has been verified to survive a full browser
process restart (not just a page reload), same browser/profile/origin. It
does **not** sync across devices or browsers, and is lost if the user
clears site data or uses a private window — there is no backend in v1.

## Notifications

`src/engine/notifications.ts` + `src/state/notificationStore.ts` implement
opt-in browser Notification reminders (evening-reflection nudge after
19:00 local time, daily-streak nudge after 12:00 if nothing done yet),
toggled in Settings. Be honest about the real limitation in any UI copy:
these are plain `Notification` API calls with no service worker or push
subscription behind them, so they only fire while the app is open in a
tab (checked on load, every 5 minutes, and on tab focus) — not from a
fully closed browser. Don't imply otherwise.

## Difficulty / pacing features

The journey is deliberately not trivially completable. Five mechanisms,
layered together:

- **Mastery-gated quizzes** (`src/engine/quiz.ts` `shuffledIndices()`):
  every quiz in `Timeline.tsx` and `Knowledge.tsx` shuffles its option
  order per attempt and requires a *correct* answer before the user can
  continue — a wrong answer no longer reveals the right one or lets the
  user proceed; it shows a "try again" button that reshuffles.
- **Rank-tiered daily challenges**: `Challenge.tier` (1–3) in
  `src/data/challenges.ts`; `maxChallengeTierForRankIndex()` in
  `src/engine/progression.ts` caps which tiers are eligible for a given
  rank; `dailyChallenge(today, maxTier)` in `src/engine/community.ts`
  (replaces the old `dailyChallengeIndex`) picks deterministically from
  the eligible pool only.
- **Minimum-effort thresholds**: morning intentions and evening
  reflections (`src/features/practice/Practice.tsx`) require a minimum
  character count (`minLengthHint()` in `src/i18n/strings.ts`) before the
  submit button enables.
- **Capstone reflections gating badges**: completing every point in a
  timeline era, or every topic in a knowledge-tree branch, no longer
  auto-grants that era/branch badge. The user must also write a longer
  capstone reflection (`CapstoneModal` in `src/components/ui.tsx`, min
  40 chars) — entry points appear inline in `Timeline.tsx` (per era-card)
  and `Knowledge.tsx` (under each branch's leaf list) once the
  prerequisite is met. Capstones are stored in `JourneyData.capstones`
  (`src/state/selectors.ts`), keyed by era id for eras and by
  `branchCapstoneKey(branch)` (a `branch-` prefix) for knowledge
  branches — the prefix avoids any id collision with timeline era ids.
  `submitCapstone(key, text)` in `src/state/store.ts` records it and
  awards `XP_FOR.capstone`/`HARMONY_FOR.capstone`; `collectUnlocks()`
  only grants `eraBadgeId()`/`branchBadgeId()` badges once both the
  completion condition *and* `capstones[key]` are true. Branch-mastery
  badges (`b-branch-compassion`/`-character`/`-understanding`) are new in
  `src/data/badges.ts` (`MASTERABLE_BRANCHES`, `branchBadgeId()`) — like
  era badges, their `check()` always returns `false` since they're
  granted directly by the engine, not via a `Stats` predicate.
- **Pushed-out endgame thresholds**: rank XP thresholds
  (`RANKS` in `src/engine/progression.ts`), world-stage harmony
  thresholds (`WORLD_STAGES`/`BUILDINGS` in `src/data/world.ts`) were all
  raised from their original v1 values so the top of each ladder takes
  meaningfully longer to reach.
