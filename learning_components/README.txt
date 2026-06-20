# Interactive learning components — install guide

This zip mirrors your project layout. Extract it at the ROOT of your Next.js
project and the files land in the right places:

    src/components/learning/   ← the components + registry.js
    src/app/demo/page.jsx      ← the preview gallery (optional, deletable)

(If a file already exists — e.g. NumberLineAddition.jsx — it's safe to let this
copy overwrite it. This copy already has the "use client" line at the top.)

## See them all
1. Extract the zip at your project root.
2. Run:  npm run dev
3. Open:  http://localhost:3000/demo

You can delete src/app/demo later — it's only a viewer.

## Use a component in a real quiz (data-driven)
Each quiz question you store in Supabase carries two things:
  - type:  one of the registry keys (e.g. "fraction_bar")
  - props: the parameters for that component (e.g. { p: 3, q: 4 })

Then render it like this:

    "use client";
    import { WIDGETS } from "@/components/learning/registry";

    export function QuizQuestion({ question, onAttempt }) {
      const Widget = WIDGETS[question.type];
      if (!Widget) return null;
      return <Widget {...question.props} onAttempt={onAttempt} />;
    }

A new QUESTION of an existing kind = just a new database row (no code).
A new KIND of question = add one component file + one line in registry.js.

## Registry keys included
  number_line_addition   place_value_blocks   multiplication_array
  fraction_bar           clock_reader         balance_scale
  race_to_answer

## Every component shares the same contract
  props:      the problem data + { lang='uz' }
  callbacks:  onAttempt(correct, payload), onCorrect(), onNext()
  strings:    centralised in a STRINGS object (uz now; add ru/en later)

## Add more components with Cowork
Open Cowork (pointed at your project root, "Always Allow") and paste a short
brief that says "follow the interactive-learning-components skill", names the
component, and lists its props. Drop the new file in src/components/learning/
and add one import + one line to registry.js.
