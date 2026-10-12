"use client";
import React, { useMemo, useState } from "react";

/**
 * RiddleSolve — "Topishmoqni yeching". Shows a riddle (a few short lines) on a
 * card, then a row of picture/word answer options; the child taps what the
 * riddle describes. A correct pick lights green and reveals the answer name;
 * a wrong one shakes. Self-grading.
 *
 * Props: {
 *   lines: [string|{uz,ru,en}],                 // the riddle text, line by line
 *   options: [{ label: string|{uz,ru,en}, emoji?: string, correct?: boolean }],
 *   answer?: number,                            // index of the right option (if not marked on the option)
 *   clue?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { badge: "Topishmoq", instr: "Bu nima? Javobni tanla!", done: "Topdingiz! 🎉", retry: "Yana oʻylab koʻr", next: "Yana" },
  ru: { badge: "Загадка", instr: "Что это? Выбери ответ!", done: "Отгадали! 🎉", retry: "Подумай ещё раз", next: "Ещё" },
  en: { badge: "Riddle", instr: "What is it? Pick the answer!", done: "You got it! 🎉", retry: "Think again", next: "Again" }
};
const DEMO = {
  lines: [
    { uz: "Oʻzi bir kichik narsa,", ru: "Маленькая вещица,", en: "A tiny little thing," },
    { uz: "Kerak boʻlar har darsda.", ru: "Нужна на каждом уроке.", en: "needed in every lesson." },
    { uz: "Chizib qoʻysang notoʻgʻri,", ru: "Если начертил не так,", en: "If you draw it wrong," },
    { uz: "Yoʻq qiladi birpasda.", ru: "мигом всё сотрёт.", en: "it wipes it in a blink." }
  ],
  options: [
    { emoji: "🩹", label: { uz: "Oʻchirgʻich", ru: "Ластик", en: "Eraser" }, correct: true },
    { emoji: "✏️", label: { uz: "Qalam", ru: "Карандаш", en: "Pencil" } },
    { emoji: "📕", label: { uz: "Kitob", ru: "Книга", en: "Book" } }
  ]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function RiddleSolve({ lines, options, answer, clue, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!lines || !options) {
    lines = DEMO.lines;
    options = DEMO.options;
  }
  const correctIdx = useMemo(() => {
    const marked = options.findIndex((o) => o && o.correct);
    return marked >= 0 ? marked : typeof answer === "number" ? answer : 0;
  }, [options, answer]);

  const [chosen, setChosen] = useState(null); // index of correct pick
  const [shake, setShake] = useState(null);
  const first = React.useRef(null);
  const done = chosen != null;
  const clueText = pickL(clue, lang);

  function choose(i) {
    if (done) return;
    const ok = i === correctIdx;
    if (first.current === null) first.current = ok;
    if (typeof onAttempt === "function") onAttempt(ok, { index: i });
    if (ok) {
      setChosen(i);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(i);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {clueText && <div style={S.clue}>{clueText}</div>}

      <div style={S.card}>
        <span style={S.badge}>🧩 {t.badge}</span>
        {lines.map((ln, i) => (
          <div key={i} style={S.line}>{pickL(ln, lang)}</div>
        ))}
      </div>

      <p style={S.instr}>{t.instr}</p>

      <div style={S.opts}>
        {options.map((o, i) => {
          const solved = chosen === i;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={done}
              className={shake === i ? "rsShake" : ""}
              style={{ ...S.opt, ...(solved ? S.optOn : {}), ...(done && !solved ? S.optDim : {}) }}
            >
              {o.emoji && <span style={S.emoji} aria-hidden>{o.emoji}</span>}
              <span>{pickL(o.label, lang)}</span>
              {solved && <span style={S.check}>✓</span>}
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {done ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>

      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes rsShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.rsShake{animation:rsShake .44s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  card: { position: "relative", borderRadius: 18, border: "2px solid #ffd79a", background: "linear-gradient(180deg,#fff8ec,#fff)", padding: "22px 18px 16px", textAlign: "center", boxShadow: "0 5px 0 rgba(0,0,0,.05)", marginBottom: 14 },
  badge: { position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#f59a1f", color: "#fff", fontSize: 13, fontWeight: 800, padding: "3px 14px", borderRadius: 999, whiteSpace: "nowrap", boxShadow: "0 3px 0 rgba(0,0,0,.08)" },
  line: { fontSize: 17, fontWeight: 700, color: "#7a4b12", lineHeight: 1.5 },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  opts: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  opt: { display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid #cfe0ff", background: "#f4f8ff", color: "#2f6fed", borderRadius: 16, padding: "10px 16px", fontFamily: "inherit", fontSize: 15.5, fontWeight: 800, cursor: "pointer" },
  optOn: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  optDim: { opacity: 0.45 },
  emoji: { fontSize: 24, lineHeight: 1 },
  check: { fontWeight: 900 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
