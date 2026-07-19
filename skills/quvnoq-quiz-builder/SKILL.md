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
1. `src/components/learning/registry.ts` — live `WIDGETS` map of available `type`s.
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

**Oʻqish savodxonligi (reading) has its own component set — see the dedicated
section "Oʻqish savodxonligi …" below before building any reading lesson.**

## Mandatory workflow

### Phase 1 — Read the topic & build a CONCEPT CHECKLIST (REQUIRED, do this FIRST)
Before writing ANY question, read the whole topic material (book page / lesson
text) and take notes. Produce an explicit **concept checklist** — one line per
distinct thing the topic teaches:
  - [ ] concept 1 — <what the child must be able to do>
  - [ ] concept 2 — ...
This checklist is the contract for the rest of the run. Every concept on it MUST
be covered by at least one question, and Phase 5 checks each box off. Do not
start Phase 2 until the checklist is written.
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
  do NOT pad with mcq.
- **CREATE A NEW COMPONENT WHEN THE TOPIC NEEDS ONE.** If a concept has no good
  visual fit in the registry (common for a genuinely new topic — e.g. a reading
  or grammar skill with no existing widget), build a real learning component
  rather than falling back to mcq. Steps:
    1. Follow the `interactive-learning-components` skill and the reference in
       `src/components/learning/` (e.g. `NumberLineAddition.jsx`) — code-native,
       animated, self-grading, with a JSDoc props contract and `lang` support.
    2. Create `src/components/learning/<Name>.jsx`, then register its `type` in
       the `WIDGETS` map in `src/components/learning/registry.ts` (and add a
       `WIDGET_LABELS` entry).
    3. Use the new `type` in this topic's items like any other widget.
  Only emit a `componentProposal` (see below) instead of building when the
  component is out of scope for this run; otherwise prefer building it.

### Phase 3 — Diversity & novelty plan (REQUIRED)
- **COUNT: make exactly 10 questions per topic**, and together they MUST cover
  every concept on the Phase 1 checklist. If there are more than 10 concepts,
  merge the closest ones; if fewer, add depth/difficulty variants so each
  concept still gets a question and the set totals 10.
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
- [ ] Exactly 10 questions?
- [ ] EVERY concept on the Phase 1 checklist is covered — tick each box?
- [ ] Every props object valid against its component contract (ranges + math:
      p<q, a+b≤maxSum, target 11–99, etc.)?
- [ ] <= 20% mcq?
- [ ] >= 4 component types (when topic allows)?
- [ ] No trivial duplicates within set or vs previous seed file?
- [ ] Any newly created component registered in registry.ts and rendering?
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

After building, report in plain text — SHORT (a few lines, no long write-ups,
no per-topic tables, no separate report files): the concept checklist with each
box ticked, total count (should be 10), types used + count of each, any new
component built, any mcq fallbacks with their componentProposal, and any
i18nGaps.

## Oʻqish savodxonligi (reading literacy) — components, patterns & wiring
Reading lessons are NOT math. Each lesson is built around ONE text (poem or
story) and follows: PRESENT the text → CHECK comprehension → EXPLORE words &
ideas. Item q1 is the reading passage; the rest are comprehension. Prefer the
reading components below over `mcq`.

### Reading components (registry keys)
| type            | use it for                                              | key props |
|-----------------|---------------------------------------------------------|-----------|
| karaoke_reading | present a poem/story WITH read-along audio + highlight   | { title, author?, source?, lines:[…], variant:'poem'\|'story', audio:"<topicId>-<itemId>" } |
| poem_reading    | present a poem, no audio                                 | { title, author?, lines:[…] } |
| story_reading   | present prose, no audio                                  | { title, paragraphs:[…] } |
| true_false_ng   | close reading: Toʻgʻri / Notoʻgʻri / Matnda yoʻq         | { statement:{uz,ru,en}, answer:'true'\|'false'\|'ng', why?:{…} } |
| what_next       | event ORDER — "Keyin nima boʻldi?"                      | { before:{…}, options:[{text:{…}, next?:true}] } — EXACTLY ONE next:true |
| open_response   | open-ended reflection (UNGRADED, always completes)      | { sample:{…}, starters?:[{…}] } |
| letter_sequence | "Harflarni toʻgʻri ketma-ketlikda oʻqing" curve puzzle  | { letters:[…], words?:[n,…], phrase, meaning?:{…} } |
| size_order      | words at growing font sizes → tap smallest→largest to read a proverb | { words:[reading order], phrase, meaning?:{…} } |
| story_sequence  | "voqealar ketma-ketligini aniqlang" — order event cards | { events:[{text:{…}}] } IN CORRECT ORDER |
| word_forge      | build words from a letter bank ("KUTUBXONA harflaridan…") | { letters:[…], accept:[words], goal?:N } |
| book_care       | sort actions as good/bad for a book (happy/sad book faces) | { actions:[{text:{…}, good:boolean}] } |
| fill_blanks     | multi-blank cloze with a word bank                      | { segments:[{text}|{blank:'answer'}], bank?:[…] } (sentence stays uz) |
| first_letters   | picture objects → take each first letter → spell a word | { objects:[{emoji, letter, name?:{…}}], word, meaning?:{…} } |
| cinquain        | "sinkveyn" word-web: pick adjectives/verbs/synonym      | { topic, lines:[{label:{…}, need:N, bank:[…]}] } (ungraded builder) |

`size_order` also does LETTERS by size (pass single letters as `words`, e.g. K,Oʻ,K,L,A,M → KOʻKLAM); `syllable_build` handles scrambled bird/word syllables.

Reuse from the shared registry too: `match_pairs` (izohli lugʻat / glossary),
`tap_match` (hidden real words in a letter string), `sentence_cloze` &
`letter_complete` (maqol / word-building), `sentence_order` (make a sentence),
`odd_one_out` (ortiqcha soʻz). `mcq` stays the last resort.

### Patterns the textbook expects
- FIRST item = the passage. Use `karaoke_reading` when a uz read-along clip will
  exist; else `poem_reading` / `story_reading`.
- Force CAREFUL reading with `true_false_ng` (the "Matnda yoʻq / Not given"
  option especially) and `what_next` — both punish keyword-guessing.
- Put an `open_response` DIRECTLY AFTER the related closed-ended question: the
  child first recalls a fact (mcq / true_false_ng), then reflects in their own
  words. It is ungraded and always completes, so it never dents the /10.
- Recreate a curved-letter book task with `letter_sequence`: `letters` are in
  READING order, `words` splits them into words for display, `meaning` reveals
  the sense (e.g. K,i,t,o,b,a,q,l,q,a,y,r,o,gʻ,i → "Kitob — aql qayrogʻi").
- "Read the text again" needs NO authoring: every comprehension item auto-shows a
  button that reopens the lesson's passage (first reading item), audio and all.
  Override with `item.reference` (a WidgetSpec) only to point at a different text.

### Read-along audio (karaoke) — keeping the highlight in sync
`karaoke_reading` needs a per-line timings file. Set `props.audio` to the key
`"<topicId>-<itemId>"` (e.g. "g1-oqish-19-q1"). Then `npm run seed:tts`
synthesizes EACH `lines[]` entry as its own Gemini (voice Charon) clip, measures
its exact duration, concatenates them into
`public/audio/tts/passages/<key>.uz.wav`, and writes `<key>.uz.json` with
per-line start/duration. The component highlights line-by-line from that file —
NO word-timepoints are needed (Gemini returns none; per-line durations are
exact, so there is zero drift). Uzbek only; ru/en show the text without audio.
Keep each `lines[]` entry short (one poetic line / one sentence); empty "" lines
are stanza gaps (0-duration). Audio is the USER's job to (re)generate; a passage
re-synthesizes only when its lines change (or `TTS_FORCE_ONA=1`).

### Wiring an Oʻqish lesson (differs from math)
1. Create `src/content/g1-oqish/topicNN.json` (subjectKey `"g1-oqish"`), shaped
   like `topic18.json`: { topicId:"g1-oqish-NN", subjectKey, emojis, title{},
   recall{}, items:[…] }. Make exactly 10 items (q1 = passage + 9 comprehension).
2. `src/content/index.ts` — add `import oqishTopicNNJson from
   '@/content/g1-oqish/topicNN.json'` and a
   `'g1-oqish-NN': oqishTopicNNJson as unknown as Lesson,` entry.
3. `src/content/g1-oqish/structure.ts` — add the paraphrased title to
   `BUILT_TITLES` under key `g1-oqish-NN` (flips the lesson from 🔒 to open).
   The book numbers lessons per SECTION and the UI shows "N-boʻlim · M-dars"
   (section · lesson); the global 1..34 index is internal only. To find NN, count
   lessons across parts/sections in `PLAN` (Part I sections = 8,7,9,10; Part II =
   8,8,10,7). E.g. Part I · Section 3 · Lesson 4 → 8+7+3 = lesson 19 → topic19 /
   g1-oqish-19.
- Recall clips are Gemini (Charon), uz only, like Ona tili; keep `recall` ≤ 300 chars.

## Anti-monotony summary (the point of this skill)
Monotony comes from over-using mcq and repeating prop sets. Beat it by:
1) analyzing concepts first, 2) maximizing rich-component coverage,
3) capping mcq + proposing new components, 4) enforcing novelty vs the seed file.