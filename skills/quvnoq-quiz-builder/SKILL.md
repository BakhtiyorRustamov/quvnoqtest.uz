---
name: quvnoq-quiz-builder
description: Generates interactive, diverse, non-repeating quiz questions as data objects for QuvnoqTest.uz, auto-mapped to the existing learning components. Use whenever asked to create, build, or add questions or tests for a topic.
---

# QuvnoqTest Quiz Builder

## What a question IS here (read first)
Questions are DATA, not UI. Each item = a `type` (a registered component) plus
`props`. The COMPONENT supplies the interactivity and self-grades. Your job is
to pick the best component for the concept and feed valid props. Interactivity
variety comes from USING DIFFERENT COMPONENTS, not from the question text.

## Sources of truth (read every run — do not invent props)
1. `src/components/learning/registry.js` — live list of available `type`s.
2. The JSDoc at the top of each component file — exact props + valid ranges.
Treat these as authoritative. If registry and this skill disagree, registry wins.

## Component map (confirm against registry each run)
| type                  | concept it teaches            | props (validate ranges!)        |
|-----------------------|-------------------------------|---------------------------------|
| number_line_addition  | additive reasoning            | { a, b, maxSum }  a+b≤maxSum; maxSum 10|20 |
| place_value_blocks    | tens/ones place value         | { target } 11–99                |
| multiplication_array  | multiplication rows×cols      | { a, b } 2–9 each               |
| fraction_bar          | part–whole fractions          | { p, q } 2≤q≤8; 1≤p<q           |
| clock_reader          | reading analog clock          | { h, m } h 1–12; m 0 or 30      |
| balance_scale         | compare >,<,=                 | { x, y } 1–20 each              |
| race_to_answer        | gamified addition drill       | { steps, maxSum } — activity, not 1 graded item |
| mcq                   | FALLBACK only                 | { prompt, choices[3-4], answerIndex } |

## Mandatory workflow

### Phase 1 — Analyze the topic (REQUIRED before any question)
- Read the topic material (book page / lesson text).
- Output a CONCEPT LIST: every distinct skill the topic teaches.
- Tag grade (metadata only — NEVER pick a component by grade).
- TITLE: always PARAPHRASE the lesson title (uz/ru/en) — never copy the book
  heading verbatim. Make it kid-friendly and active (e.g. book "Santimetr.
  Detsimetr" → "Detsimetr bilan tanishamiz"). Keep all three languages in sync
  in BOTH the topic JSON `title` and `topics.ts`.

### Phase 2 — Map concepts → components, minimize mcq (REQUIRED)
- For each concept pick the component whose VISUAL best fits it.
- One component serves many grades by varying props (small q for young,
  larger q for older). Spread props to do this.
- mcq is a LAST RESORT. Before using mcq, check: can balance_scale,
  number_line_addition, place_value_blocks, etc. express this concept by
  reframing the question? If yes, use it.
- Hard cap: at most 20% of items may be `mcq`. If more concepts have no fit,
  do NOT pad with mcq — instead emit a `componentProposal` (see below).

### Phase 3 — Diversity & novelty plan (REQUIRED)
- Build a plan table: | # | concept | type | props | difficulty |
- Use >= 4 distinct component types if the topic allows.
- No concept takes more than ~1/3 of the set.
- Difficulty spreads easy→hard; vary the numbers widely.
- NOVELTY: no two items may be the same type with trivially-swapped numbers
  unless difficulty differs meaningfully. Compare against
  `src/data/questions.seed.json` from earlier runs and avoid repeating
  prop sets / scenarios across runs.
- drag_buckets: the component SHUFFLES tiles on render, so authoring order is
  irrelevant — but still spread the answer key (don't make every "left" tile a
  single bin in a way that reads as a pattern). Bins of ~equal size are best.

### Phase 4 — Trilingual text (UZ/RU/EN)
- Visual components render their own strings; pass `lang` in props where the
  component supports it (e.g. fraction_bar, multiplication_array accept `lang`).
- For `mcq`, make text trilingual objects, NOT plain strings:
  "props": {
    "prompt":  { "uz": "...", "ru": "...", "en": "..." },
    "choices": [ {"uz":"..","ru":"..","en":".."}, ... ],
    "answerIndex": 0
  }
- RU/EN must be natural equivalents, age-appropriate, not literal.
- If a visual component does NOT yet accept `lang`, note it under
  `i18nGaps` in your final report so it can be patched.
- READ-ALOUD (uz): only the lesson `title` + `recall` are spoken (by
  `scripts/seed-tts.mjs`). Unit abbreviations (cm/dm/mm/km/kg) are auto-spoken
  as full Uzbek words and redundant "(cm)"-style parentheticals are dropped, so
  recall may use them freely. Keep recall <= 300 chars. Audio is the user's job
  to regenerate (`npm run seed:tts`, `TTS_FORCE=1` to refresh changed clips).

### Phase 5 — Validate (REQUIRED, fix & regenerate on any fail)
- [ ] Every props object valid against its component contract (ranges + math:
      p<q, a+b≤maxSum, target 11–99, etc.)?
- [ ] <= 20% mcq?
- [ ] >= 4 component types (when topic allows)?
- [ ] No trivial duplicates within set or vs previous seed file?
- [ ] All concepts from Phase 1 covered?
- [ ] mcq text trilingual; lang passed where supported?

## When NO component fits — propose, don't dump mcq
Emit an item shaped like:
{ "type": "mcq", "topic": "...", "grade": N, "difficulty": "...",
  "props": { trilingual mcq as above },
  "componentProposal": {
    "suggestedType": "fraction_compare",
    "concept": "comparing two fractions visually",
    "interaction": "drag two bars to compare",
    "props": "{ p1,q1,p2,q2 }",
    "why": "no current component covers fraction comparison"
  } }
This turns each fallback into a roadmap item instead of monotony.

## Output format & wiring (REQUIRED — this is what makes a lesson playable)
Each lesson is ONE file `src/content/g1-math/topicNN.json` shaped like the
existing topics (see topic99.json):
  { topicId:"g1-math-NN", subjectKey:"g1-math", emojis, title{uz,ru,en},
    recall{uz,ru,en}, items:[ {id:"qN", type:"widget", visualHint:"none",
    widget:{type,props}, prompt{}, hint{}, explanation{}, componentProposal? } ] }
Map book lesson number → topic number (book "Lesson 100" → topic100.json).

To actually surface the lesson you MUST also:
1. `src/content/index.ts` — add `import topicNNJson` and a `'g1-math-NN':`
   entry in the LESSONS map (this flips it from "coming soon" to built).
2. `src/content/g1-math/topics.ts` — replace the `P(NN)` placeholder with a
   real `T(NN, uz, ru, en)` using the PARAPHRASED title.
A lesson file that isn't registered in index.ts will NOT appear.

`src/data/questions.seed.json` is an OPTIONAL review dump only — it is NOT
imported by the app and is not shipped in the bundle. Write it if useful for
review; it is not required for the lesson to work.

After building, report in plain text (keep it SHORT — no per-topic tables):
total count, types used + count of each, any mcq fallbacks with their
componentProposal, and any i18nGaps.

## Anti-monotony summary (the point of this skill)
Monotony comes from over-using mcq and repeating prop sets. Beat it by:
1) analyzing concepts first, 2) maximizing rich-component coverage,
3) capping mcq + proposing new components, 4) enforcing novelty vs the seed file.