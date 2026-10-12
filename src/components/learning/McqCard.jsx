"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * McqCard — shadcn/ui demo restyle of the Mcq widget.
 * SAME interface as Mcq: { prompt, choices:(string|{uz,ru,en})[], answerIndex,
 * lang='uz', embedded=false, onAttempt, onCorrect, onNext } and the same
 * immediate-grade-on-click behavior. Only the presentation changes:
 *   - wrapped in a shadcn <Card>
 *   - option rows are shadcn <Button variant="outline"> that flip to
 *     success/destructive on grade
 *   - keeps the app's playful brand palette (not shadcn's dull slate)
 */
const STRINGS = {
  uz: { choose: "Javobni tanla", correct: "Barakalla!", tryAgain: "Yana urinib ko'r", next: "Keyingisi" },
  ru: { choose: "Выбери ответ", correct: "Молодец!", tryAgain: "Попробуй ещё раз", next: "Дальше" },
  en: { choose: "Choose the answer", correct: "Well done!", tryAgain: "Try again", next: "Next" },
};

const SAMPLE = { prompt: "2 + 2 = ?", choices: ["3", "4", "5"], answerIndex: 1 };

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function McqCard({
  prompt = SAMPLE.prompt,
  choices = SAMPLE.choices,
  answerIndex = SAMPLE.answerIndex,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [status, setStatus] = useState("idle");
  const [picked, setPicked] = useState(null);
  const [order] = useState(() => shuffle(choices.map((_, i) => i)));

  function choose(i) {
    if (status === "correct") return;
    setPicked(i);
    const ok = i === answerIndex;
    if (typeof onAttempt === "function") onAttempt(ok, { prompt, chosen: i, answerIndex });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else setStatus("wrong");
  }
  function next() {
    setStatus("idle");
    setPicked(null);
    if (typeof onNext === "function") onNext();
  }

  return (
    <Card className="mx-auto max-w-xl border-2 border-[#ece1c8] bg-[#fbf6ea] shadow-[0_18px_40px_-22px_rgba(80,60,20,.5)]">
      <CardContent className="flex flex-col gap-4">
        {!embedded && (
          <h2 className="text-center text-2xl font-black text-ink">{prompt}</h2>
        )}
        <p className="text-center text-sm font-semibold text-ink/40">{t.choose}</p>

        <div className="grid gap-2.5">
          {order.map((i) => {
            const raw = choices[i];
            const c = raw && typeof raw === "object" ? raw[lang] ?? raw.uz ?? "" : raw;
            const isAnswer = status !== "idle" && i === answerIndex;
            const isWrongPick = picked === i && status === "wrong";
            const variant = isAnswer ? "success" : isWrongPick ? "destructive" : "outline";
            return (
              <Button
                key={i}
                variant={variant}
                onClick={() => choose(i)}
                disabled={status === "correct"}
                className="h-auto min-h-[3.25rem] whitespace-pre-line py-3 text-lg leading-snug disabled:opacity-100"
              >
                {c}
              </Button>
            );
          })}
        </div>

        <div className="flex min-h-[2rem] items-center justify-center" aria-live="polite">
          {status === "correct" && (
            <span className="text-lg font-black text-brand-green">🎉 {t.correct}</span>
          )}
          {status === "wrong" && (
            <span className="text-sm font-bold text-error">{t.tryAgain}</span>
          )}
        </div>

        {!embedded && (
          <Button variant="sunny" size="lg" onClick={next} className="mx-auto rounded-full">
            {t.next} →
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
