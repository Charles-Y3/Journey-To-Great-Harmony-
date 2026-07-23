# Journey to Great Harmony 大同

A personal growth and community-building web app that turns humanity's wisdom into an
interactive, lifelong journey:

> **Learn from humanity's wisdom → cultivate yourself → practise virtue → contribute to
> society → build Great Harmony together.**

Inspired by the ideal of **大同世界 (Datong, the Great Harmony)** — a world where people
develop themselves, care for others, and work together for the betterment of society.

## The eight modules

| Module | What it does |
| --- | --- |
| 🌅 **Today** | The daily 10-minute loop: wisdom quote, intention, lesson, virtue challenge, reflection |
| ⏳ **Wisdom Timeline** | Interactive journey through 10 eras of human wisdom — from ancient civilizations to modern thinkers — with quizzes and era badges |
| 🌳 **Knowledge Path** | A skill tree: Wisdom → Compassion / Character / Understanding → nine virtues, each with short lessons |
| 🎯 **Daily Practice** | Morning intention, daily virtue challenge, evening reflection, and a browsable journal |
| 🌲 **Virtue Forest** | A living SVG forest that grows from a seed to a sanctuary as you practise |
| 🗺️ **Journey Map** | An RPG-style adventure map — five regions of inner growth with stories and challenges |
| 🌏 **Great Harmony World** | A shared world that grows from village to Harmony Society as everyone practises; civic buildings unlock along the way |
| 👥 **Community & 🎴 Collection** | Leaderboards in four categories, encouragement (never toxic competition), wisdom cards, and achievement badges |

Progress ranks: Seeker → Explorer → Learner → Practitioner → Cultivator → Contributor →
Harmony Builder → Wisdom Keeper. Progress is based on consistency and personal
development, not competition.

## Running it

```bash
npm install
npm run dev        # development server
npm run build      # type-check + production build (output in dist/)
npm run preview    # preview the production build
```

## Tech notes (v1)

- **React 18 + TypeScript + Vite**, `react-router-dom` (hash routing — deployable to any
  static host, including GitHub Pages), **Zustand** with `persist` for state.
- **Client-only**: all progress is stored privately in the browser's `localStorage`.
  No account, no server, no tracking.
- The community layer (fellow travellers, leaderboards, shared world growth) is a
  deterministic local simulation in v1; the module boundaries (`src/engine/community.ts`)
  are designed so a real backend can replace it later.
- All content lives in typed data files under `src/data/` — easy to extend with new
  lessons, eras, challenges, quotes, cards, and badges.
- **Settings → Testing tools → "Advance one day"** simulates the passage of days for
  previewing streaks and community growth.
