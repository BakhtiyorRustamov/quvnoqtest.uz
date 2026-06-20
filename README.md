# QuvnoqTest.uz 🎒

Gamified quiz-learning web app for Uzbekistan school students (grades 1–11),
built per **SRS v1.1**. Trilingual (UZ default / RU / EN), mobile-first,
free demo lesson + dummy-paid tier + AI tutor.

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000
```

That's it — **no database or API keys needed to try everything**. Without
Supabase the app runs in *cookie demo mode*: the user record, progress and AI
counters live in one signed, HTTP-only cookie (per device). Add real services
later via `.env` (see below).

> Generated assets (logo, sketches, mascots, sounds) are committed under
> `/public`. To regenerate: `npm run gen:assets && npm run gen:sfx`.

## What's implemented (v1.0 scope)

- **Landing** — intro choreography (animated logo alone → logo rises → grade
  tiles fade in), 3-per-row book-stack grade tiles with per-tier educational
  sketches, subjects expanding **from inside** the grade tile (book-open
  animation), subject science sketches, 🚧 badges everywhere except
  1-sinf → Matematika, animated subject open transition.
- **Demo lesson** (1-sinf → Matematika → *Narsalarning xossalari*) — recall
  with the **Matematika book-mascot read-aloud button**, then **10 one-at-a-time
  items across 7 mechanics** (tap-correct, multi-select, size sort
  drag-and-drop, color sort, connect-the-line matching, pattern continuation
  on notebook grid, size ordering, build-a-house creative finale), per-item
  **Yordam** hint expander with visual cues (finger / pulsing targets / example
  line / dashed arrows), royalty-free sounds + confetti, completion screen with
  score, big "Go to Dashboard" and a per-item review with explanations. All
  content authored in UZ/RU/EN (`src/content/g1-math/topic01.json`).
- **Silent registration** on demo start; visible `QT-XXXXX` id; profile drawer
  with editable grade + optional name/phone/email; **magic-link** claim flow.
- **Dashboards** — 3rem headline, subject grid, *sinov darslar* labels in free
  tier, notebook-styled "Hozirgacha oʻrganganlarim" with spiral binding, ruled
  lines and a working **pen drawing tool**, "Mavzular" list (topics 2–41 with
  real trilingual titles) that routes to Upgrade (free) or dummy topic pages
  (paid).
- **Upgrade → dummy checkout** — "I PAID" sets `paid_until = now() + 30 days`;
  on lapse the account auto-reverts to free (history kept, locks return).
- **AI tutor** — Claude Haiku via server-side route, paid-only,
  **5 msgs/day + 1000 tokens/day** enforced *before* sending
  (Asia/Tashkent reset), usage-vs-limit display, limit-reached state.
- **TTS** — one-time seed script caches 3 recall clips (Gemini TTS, voice
  *Charon*); the app only plays cached files, never synthesizes at runtime.
- 40 dummy topic pages, stub pages for every other subject/grade with their
  book mascots, consistent **Back + To Dashboard** nav, mute toggle,
  `prefers-reduced-motion` support.

## Environment (`.env`)

Copy `.env.example` → `.env`. Everything is optional; features degrade
gracefully when unset.

| Variable | Purpose | Without it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Postgres-backed users/progress/limits (schema: `supabase/schema.sql`) | Signed-cookie demo mode (per-device) |
| `SESSION_SECRET` | Signs the demo-mode cookie | Dev fallback secret |
| `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL`) | AI tutor (`claude-haiku-4-5-20251001`) | AI panel shows "not connected" |
| `GEMINI_API_KEY` (+ `GEMINI_TTS_MODEL/VOICE`) | `npm run seed:tts` (one-time, 3 clips) | Mascot button falls back to browser voice (ru/en) or a friendly note |
| `RESEND_API_KEY` + `MAGIC_LINK_FROM` | Magic-link email delivery | Cookie mode: link shown in UI (same device); Supabase mode: disabled with notice |
| `NEXT_PUBLIC_APP_URL` | Absolute base for magic links | Request origin |

## Production setup (≤ $20/month, per SRS §13)

1. **Supabase (free)** — create a project, run `supabase/schema.sql` in the SQL
   editor, set the two env vars. RLS is enabled with no public policies; the
   app only uses the service-role key from server routes.
2. **Vercel (Hobby, $0)** — import the repo, add the env vars, deploy.
3. **TTS seed (once)** — `GEMINI_API_KEY=... npm run seed:tts`, commit
   `public/audio/tts/*` (or upload to Supabase Storage and adjust the path in
   `src/lib/useRecallAudio.ts`).
4. **AI** — set `ANTHROPIC_API_KEY`. The 1000-token/user/day cap is the cost
   governor (worst case ≈ $15/mo at 100 maxed users) — do not remove it.
5. **Email** — set `RESEND_API_KEY` (or swap `src/lib/mailer.ts` for any SMTP
   provider) so magic links are actually delivered cross-device.

## Notes & deviations flagged for the sponsor (SRS §17)

- **Logo**: the SRS-referenced brand file wasn't in the project folder, so a
  stand-in colorful interlocking-Q SVG matching the §5.2 palette was generated
  (`scripts/gen-assets.mjs`). Swap `/public/logo*.svg` + `src/app/icon.svg`
  when the official artwork arrives — hexes already match §5.2.
- **TTS model**: seed script targets `gemini-3.1-flash-tts-preview` (voice
  Charon) and auto-falls back to `gemini-2.5-flash-preview-tts` with a console
  warning if the preview id is unavailable on the key (§17.7).
- **Drag-and-drop**: implemented with native Pointer Events (touch + mouse,
  ~0 KB) instead of the suggested `dnd-kit` — same FR-QZ-11 behavior, smaller
  bundle, full control over the kid-friendly snap/bounce animations.
- **Drawings** are client-side only in v1.0 (allowed by §12.6); a `drawings`
  table is already in the schema for later.
- **Anthropic model id**: SRS says `claude-haiku-4-5`; the exact API string
  `claude-haiku-4-5-20251001` is the default, overridable via env.
- Magic-link **merge rule** implemented as recommended: the email's canonical
  account wins, device progress merges in (best score kept), nothing deleted.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run gen:assets` | Regenerates logo, grade-tier + subject sketches, all 29 book mascots |
| `npm run gen:sfx` | Re-synthesizes the CC0 sound effects (see `public/audio/LICENSES.md`) |
| `npm run seed:tts` | One-time TTS cache seed (recall block only, 3 clips) |

## Structure

```
src/
  app/                 pages + API route handlers (server backend tier)
  components/          landing / lesson / dashboard / ai / ui
  content/             hardcoded curriculum: taxonomy, topics, topic01.json
  lib/                 store (cookie+supabase), ai, mailer, i18n, hooks
  messages/            uz.json · ru.json · en.json (all UI chrome)
public/
  sketches/ mascots/   generated SVG art        audio/sfx + audio/tts
scripts/               gen-assets · gen-sfx · seed-tts
supabase/schema.sql    tables per SRS §12
```

## Interactive learning components (`src/components/learning/`)

Eight reusable, data-driven widgets power extra practice across ALL future
quizzes: `number_line_addition`, `place_value_blocks`, `multiplication_array`,
`fraction_bar`, `clock_reader`, `balance_scale`, `race_to_answer`, plus an
`mcq` fallback. Registry: `src/components/learning/registry.ts`. Preview them
all at **`/demo`**. Trilingual (uz/ru/en via the `lang` prop), self-contained,
shared contract `onAttempt / onCorrect / onNext`, and an `embedded` mode that
hides their internal chrome inside graded lessons.

**Rule: pick a widget by the CONCEPT the question teaches — never by grade**
(see `docs/generate-questions-prompt.md`, the reusable content-generation
prompt). Using one in a lesson is pure data — no code:

```jsonc
// any item in a lesson file:
{ "id": "q8", "type": "widget",
  "widget": { "type": "balance_scale", "props": { "x": 3, "y": 5 } },
  "prompt": { "uz": "…", "ru": "…", "en": "…" }, "hint": { … }, "explanation": { … } }

// optional ungraded practice on the completion screen:
"practice": { "type": "race_to_answer", "props": { "steps": 4, "maxSum": 5 } }
```

Grading matches every other mechanic: the FIRST attempt decides the score,
but the child keeps trying until solved (gentle retry). The demo lesson now
uses `balance_scale` for its comparison item (q8) and a tiny counting
`race_to_answer` as the post-lesson practice corner.
