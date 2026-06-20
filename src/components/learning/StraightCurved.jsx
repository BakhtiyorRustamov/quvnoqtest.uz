"use client";
import React, { useState } from "react";

/**
 * StraightCurved — a dedicated "lines" widget for the Point/straight/curved
 * lesson. Renders several real line samples (straight segments vs wavy/curved
 * paths) drawn between dotted end-points, and asks the child to tap ALL lines
 * of the asked type, then press Check. Follows the shared widget contract.
 *
 * Props:
 *   lines:  [{ id, kind: 'straight' | 'curved' }]
 *   target: 'straight' | 'curved'   (which type to select)
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 */
const STRINGS = {
  uz: { straight: "Toʻgʻri chiziqlarni belgila", curved: "Egri chiziqlarni belgila", broken: "Siniq chiziqlarni belgila", pick: "Belgilab, «Tekshirish»ni bos", check: "Tekshirish", correct: "Barakalla!", tryAgain: "Yana urinib koʻr", next: "Keyingisi" },
  ru: { straight: "Отметь прямые линии", curved: "Отметь кривые линии", broken: "Отметь ломаные линии", pick: "Отметь и нажми «Проверить»", check: "Проверить", correct: "Молодец!", tryAgain: "Попробуй ещё раз", next: "Дальше" },
  en: { straight: "Tap the straight lines", curved: "Tap the curved lines", broken: "Tap the broken lines", pick: "Select, then press Check", check: "Check", correct: "Well done!", tryAgain: "Try again", next: "Next" },
};

const SAMPLE = {
  target: "straight",
  lines: [
    { id: "a", kind: "straight" },
    { id: "b", kind: "curved" },
    { id: "c", kind: "straight" },
    { id: "d", kind: "curved" },
  ],
};

const STRAIGHT_PATHS = ["M14 50 L106 14", "M14 16 L106 50", "M14 33 L106 33", "M16 50 L104 18"];
const CURVED_PATHS = [
  "M14 33 Q 37 8 60 33 T 106 33",
  "M14 38 Q 36 64 58 38 T 104 38",
  "M14 30 C 32 6 48 56 66 30 S 96 16 106 34",
  "M14 24 Q 60 66 106 24",
];
const BROKEN_PATHS = [
  "M14 50 L40 16 L66 50 L106 18",
  "M14 20 L44 50 L74 20 L104 48",
  "M14 44 L46 18 L78 48 L106 22",
  "M14 18 L38 48 L70 22 L106 50",
];

function pathFor(line, i) {
  if (line.kind === "straight") return STRAIGHT_PATHS[i % STRAIGHT_PATHS.length];
  if (line.kind === "broken") return BROKEN_PATHS[i % BROKEN_PATHS.length];
  return CURVED_PATHS[i % CURVED_PATHS.length];
}
function ends(d) {
  const m = d.match(/M\s*([\d.]+)\s+([\d.]+)/);
  const nums = d.match(/[\d.]+/g) || [];
  const x1 = m ? +m[1] : 14, y1 = m ? +m[2] : 33;
  const x2 = +nums[nums.length - 2], y2 = +nums[nums.length - 1];
  return { x1, y1, x2, y2 };
}

export default function StraightCurved({
  lines = SAMPLE.lines,
  target = SAMPLE.target,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [sel, setSel] = useState(() => new Set());
  const [status, setStatus] = useState("idle");

  const correctIds = lines.filter((l) => l.kind === target).map((l) => l.id);

  function toggle(id) {
    if (status === "correct") return;
    setStatus("idle");
    setSel((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  function check() {
    if (status === "correct") return;
    const ok = sel.size === correctIds.length && correctIds.every((id) => sel.has(id));
    if (typeof onAttempt === "function") onAttempt(ok, { target, selected: [...sel] });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setStatus("wrong");
    }
  }
  function next() {
    setSel(new Set());
    setStatus("idle");
    if (typeof onNext === "function") onNext();
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {!embedded && <h2 style={S.title}>{target === "straight" ? t.straight : target === "broken" ? t.broken : t.curved}</h2>}
      <p style={S.pick}>{t.pick}</p>
      <div style={S.grid}>
        {lines.map((l, i) => {
          const d = pathFor(l, i);
          const e = ends(d);
          const on = sel.has(l.id);
          const reveal = status === "correct" || status === "wrong";
          const isCorrect = l.kind === target;
          const border = on
            ? (reveal ? (isCorrect ? "#46c06a" : "#e8463c") : "#2f9fe0")
            : (reveal && isCorrect ? "#46c06a" : "rgba(0,0,0,0.12)");
          return (
            <button
              key={l.id}
              onClick={() => toggle(l.id)}
              disabled={status === "correct"}
              className={on && status === "wrong" && !isCorrect ? "sc-shake" : ""}
              style={{ ...S.card, borderColor: border, boxShadow: on ? `0 0 0 3px ${border}33` : S.card.boxShadow }}
              aria-label={l.id}
              aria-pressed={on}
            >
              <svg viewBox="0 0 120 66" width="100%" height="66" aria-hidden>
                <circle cx={e.x1} cy={e.y1} r="3.5" fill="#33302b" />
                <circle cx={e.x2} cy={e.y2} r="3.5" fill="#33302b" />
                <path d={d} fill="none" stroke="#2f6fe0" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </button>
          );
        })}
      </div>
      <div style={S.row}>
        <button onClick={check} disabled={status === "correct"} style={S.check}>
          {t.check}
        </button>
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
@keyframes scShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
.sc-shake{animation:scShake .4s ease}
@media (prefers-reduced-motion: reduce){.sc-shake{animation:none}}
`;

const S = {
  wrap: { position: "relative", maxWidth: 520, margin: "0 auto", padding: "12px 12px 18px", fontFamily: "inherit", color: "#33302b" },
  title: { margin: "2px 0 8px", fontSize: 22, fontWeight: 800, textAlign: "center" },
  pick: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#9aa0a6" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 12 },
  card: { border: "2px solid rgba(0,0,0,0.12)", background: "#fff", cursor: "pointer", padding: "8px 10px", borderRadius: 16, minHeight: 80, display: "grid", placeItems: "center", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  row: { display: "flex", justifyContent: "center" },
  check: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "#2f9fe0", padding: "10px 26px", borderRadius: 999, boxShadow: "0 4px 0 #1f7fb8" },
  status: { minHeight: 30, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0 2px" },
  ok: { fontSize: 18, fontWeight: 800, color: "#46c06a" },
  bad: { fontSize: 14, fontWeight: 700, color: "#e8463c" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "#ff7a4d", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
