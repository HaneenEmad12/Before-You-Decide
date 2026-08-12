# Before You Decide

A decision-making companion that helps you find clarity, not just answers.

"You don't need an answer. You need clarity."

## What this is

A fully client-side React app. You walk through a 7-stage journey (Context →
Priorities → Options → Facts & Assumptions → Risks & Rewards → Scenarios →
Clarity), and land on a personalized Decision Map with animated charts,
score rings, and next-step suggestions. Everything is stored in the
browser's `localStorage` — there is no backend, no database, and no
authentication required.

## Tech stack

- React 18 + Vite
- React Router (client-side routing)
- Tailwind CSS (custom design tokens — see `tailwind.config.js`)
- Framer Motion (animation)
- Recharts (radar chart, bar charts)
- lucide-react (icons)

## Local development

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The build output goes to `dist/`.

## Deploying

### Vercel (recommended — this is a static frontend, no backend needed)

1. Push this project to a GitHub/GitLab/Bitbucket repo, or drag-and-drop
   the folder into the Vercel dashboard.
2. Framework preset: **Vite**. Build command: `npm run build`. Output
   directory: `dist`.
3. `vercel.json` is already included so client-side routes
   (`/journey/priorities`, `/map`, etc.) resolve correctly on refresh —
   it rewrites all paths to `index.html`.
4. Deploy. No environment variables are required.

Or via CLI:

```bash
npm i -g vercel
vercel
```

### About Render

This app has no server component — everything (state, "AI-style"
missing-info suggestions, scoring) runs in the browser and persists to
`localStorage`. There's nothing for a Render backend to do today, so you
can skip it entirely. If you later add real accounts, saved decisions
across devices, or a genuine AI-generated "missing information" step,
that's when a small API (Node/Express, FastAPI, etc.) on Render would
make sense — the `src/data/insights.js` heuristics are the natural place
to swap in a real API call.

## Project structure

```
src/
  components/       Reusable UI: NavBar, ProgressStepper, JourneyLayout,
                     ScoreRing, EncouragementBanner, DecisionPathHero, ui.jsx
  context/           DecisionContext.jsx — the single source of truth for
                     the in-progress decision, persisted to localStorage
  data/              bank.js (categories, priority bank, encouragement
                     copy, missing-info question bank) and insights.js
                     (heuristic scoring + missing-info selection)
  pages/             Landing, Setup (category + description)
  pages/journey/     One file per journey step, plus JourneyRouter.jsx
  pages/DecisionMap.jsx   the final report screen
```

## Notes on the "scores"

Clarity / Confidence / Uncertainty / Risk Exposure on the Decision Map are
transparent heuristics based on how much you filled in and the facts-vs-
assumptions ratio and risk/impact ratings you entered — not a prediction
or a real model. This is stated on the Decision Map itself.

## Resetting

"Start over" on the Decision Map (or the "Start a Decision" button in the
nav) clears the current decision from `localStorage` and starts fresh.
# Before-You-Decide
