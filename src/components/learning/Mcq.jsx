"use client";
import React, { useState } from "react";

/**
 * Mcq — plain multiple-choice fallback for concepts with no matching component.
 * Props: { prompt, choices: (string | {uz,ru,en})[3-4], answerIndex, lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 * A choice may be a plain string (locale-neutral, e.g. "48") or an {uz,ru,en}
 * object for text answers that need translating.
 * embedded: hides the "next" button (the quiz shell provides flow).
 */
const STRINGS = {
  uz: { choose: "Javobni tanla", correct: "Barakalla!", tryAgain: "Yana urinib ko'r", next: "Keyingisi" },
  ru: { choose: "Выбери ответ", correct: "Молодец!", tryAgain: "Попробуй ещё раз", next: "Дальше" },
  en: { choose: "Choose the answer", correct: "Well done!", tryAgain: "Try again", next: "Next" },
};

const SAMPLE = {
  prompt: "2 + 2 = ?",
  choices: ["3", "4", "5"],
  answerIndex: 1,
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Mcq({
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
  // randomized display order so the correct answer isn't always first
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
    <div style={S.wrap}>
      <style>{CSS}</style>
      {!embedded && <h2 style={S.title}>{prompt}</h2>}
      <p style={S.choose}>{t.choose}</p>
      <div style={S.choices}>
        {order.map((i) => {
          const raw = choices[i];
          const c = raw && typeof raw === "object" ? raw[lang] ?? raw.uz ?? "" : raw;
          const correctBtn = status !== "idle" && i === answerIndex;
          const wrongBtn = picked === i && status === "wrong";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={status === "correct"}
              style={{ ...S.choice, ...(correctBtn ? S.choiceOk : {}), ...(wrongBtn ? S.choiceBad : {}) }}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {status === "correct" && <span style={S.ok}>🎉 {t.correct}</span>}
        {status === "wrong" && <span style={S.bad}>{t.tryAgain}</span>}
      </div>
      {!embedded && (
        <button onClick={next} style={S.next}>
          {t.next} →
        </button>
      )}
    </div>
  );
}

const CSS = `
:root{--paper:#fbf6ea;--ink:#33302b;--line:#ece1c8;--primary:#ff7a4d;--primary2:#ef663a;--sky:#2f9fe0;--grass:#46c06a;--mist:#9aa0a6;}
button:focus-visible{outline:3px solid var(--sky);outline-offset:2px;}
@media (prefers-reduced-motion: reduce){*{transition:none!important;}}
`;

const S = {
  wrap: { position: "relative", maxWidth: 560, margin: "0 auto", padding: "20px 20px 24px", borderRadius: 24, border: "2px solid var(--line)", boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)", backgroundColor: "var(--paper)", backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "27px 27px", fontFamily: "inherit", color: "var(--ink)" },
  title: { margin: "4px 0 10px", fontSize: 26, fontWeight: 700, textAlign: "center" },
  choose: { textAlign: "center", margin: "0 0 12px", fontSize: 15, fontWeight: 600, color: "var(--mist)" },
  choices: { display: "grid", gap: 10, marginBottom: 6 },
  choice: { border: "2px solid var(--line)", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 19, fontWeight: 700, color: "var(--ink)", padding: "13px 16px", borderRadius: 16, minHeight: 52, boxShadow: "0 4px 0 rgba(0,0,0,.06)", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.25 },
  choiceOk: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff", boxShadow: "0 4px 0 #2f9b50" },
  choiceBad: { background: "#fdeceb", borderColor: "var(--primary2)", color: "var(--primary2)" },
  status: { minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  ok: { fontSize: 19, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
