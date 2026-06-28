# Cowork prompt — generate quiz questions (auto-mapped to the right component)

**Reusable.** Change only the `TASK` block at the bottom. Paste the whole thing into
Cowork (pointed at your project, "Always Allow").

> This is the *content* prompt — it produces questions as data. It is different from
> the "build a component" prompt, which produces new component code.

---

## Context
You are creating quiz content for the platform — an Uzbek-language quiz app for
school grades 1–11 (Next.js + Supabase). Questions are stored as **data**: each
question names a component `type` that renders it, plus its `props`. The components
already exist in `src/components/learning/` and are registered in
`src/components/learning/registry.js`.

**Before generating, read `src/components/learning/registry.js`** for the live list of
available `type`s, and read the **JSDoc comment at the top of each component file** for
that component's exact props and valid ranges. Treat those comments as the source of
truth — do not invent props.

## How to choose the component — read carefully
Pick the `type` whose **visualization best fits the concept the question teaches** —
**never by grade.** Grade is recorded only as a metadata tag for filtering; one
component can serve several grades by varying its props (e.g. `fraction_bar` with a
small denominator for younger kids, a larger one for older).

If a question's concept fits **no** existing component, set `type: "mcq"` (a plain
multiple-choice fallback) and add a `"note"` proposing a new component to build —
**do not force an ill-fitting component.**

## Available components (confirm against registry.js; current set)
- `number_line_addition` — additive reasoning on a number line. props: `{ a, b, maxSum }` (1 ≤ a,b; a+b ≤ maxSum; maxSum 10 or 20)
- `place_value_blocks` — tens/ones place value. props: `{ target }` (11–99)
- `multiplication_array` — multiplication as rows × cols. props: `{ a, b }` (2–9 each)
- `fraction_bar` — part–whole fractions. props: `{ p, q }` (2 ≤ q ≤ 8; 1 ≤ p < q)
- `clock_reader` — reading an analog clock. props: `{ h, m }` (h 1–12; m is 0 or 30)
- `balance_scale` — comparing numbers (>, <, =). props: `{ x, y }` (1–20 each)
- `race_to_answer` — a gamified addition **drill** that generates its own series. config: `{ steps, maxSum }`. Use it as a practice activity, not a single graded item.
- `mcq` — fallback for concepts with no matching component. props: `{ prompt, choices: [..3-4..], answerIndex }`

## Output format
Return **only a JSON array** — no prose, no markdown fences. Each item:

```json
{
  "type": "fraction_bar",
  "topic": "fractions",
  "grade": 4,
  "difficulty": "easy",
  "props": { "p": 1, "q": 4 }
}
```

Rules:
- Validate every `props` object against that component's contract (correct ranges; the
  math is actually correct; e.g. p < q, a+b ≤ maxSum).
- All learner-facing text (in `mcq` prompts/choices) in **Uzbek**.
- Vary the numbers and spread `difficulty` across the set; avoid near-duplicates.

## After generating
Save the array to `src/data/questions.seed.json` (create the folder if needed) so I can
review it before anything touches a database. Then tell me, in plain text: how many
questions, which `type`s you used and how many of each, and list any that fell back to
`mcq` with their notes.

---