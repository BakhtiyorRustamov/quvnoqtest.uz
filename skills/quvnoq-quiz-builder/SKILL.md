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

## Output format (UNCHANGED from existing pipeline)
- Return ONLY a JSON array, no prose, no markdown fences.
- Then SAVE the array to src/data/questions.seed.json (create folder if
  needed) for human review before any DB write.
- After saving, report in plain text: total count, types used + count of each,
  any mcq fallbacks with their componentProposal, and any i18nGaps.

## Anti-monotony summary (the point of this skill)
Monotony comes from over-using mcq and repeating prop sets. Beat it by:
1) analyzing concepts first, 2) maximizing rich-component coverage,
3) capping mcq + proposing new components, 4) enforcing novelty vs the seed file.