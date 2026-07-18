"use client";
import React, { useMemo, useState } from "react";

/**
 * SentenceCloze — drop the right WORD into a sentence (Ona tili, grades 1–2).
 * Shows a sentence with one empty slot ( before + [ ? ] + after ) and a row of
 * word choices. Tapping the correct word fills the slot green and completes the
 * sentence; a wrong word shakes. This is the word-level sibling of LetterComplete
 * and matches the textbook's "Nuqtalar oʻrniga mos soʻzni qoʻying" exercises
 * (e.g. choosing the right verb or adjective for a gap). Prefer this over a plain
 * mcq whenever the task is "complete the sentence with the missing word".
 *
 * Props: { before='', after='', choices:[…words], answer, emoji?, clue?,
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - before/after: the sentence text on each side of the gap (either may be "").
 *   - choices: 2–4 candidate words (strings); the child taps one.
 *   - answer:  the correct word (must be exactly one of choices).
 *   - clue:    optional {uz,ru,en} line shown above the sentence.
 */
const STR = {
  uz: { instr: "Boʻsh joyga mos soʻzni tanla!", done: "Barakalla! Gap tayyor!", retry: "Boshqa soʻzni sinab koʻr", next: "Yana" },
  ru: { instr: "Выбери подходящее слово в пропуск!", done: "Молодец! Предложение готово!", retry: "Попробуй другое слово", next: "Ещё" },
  en: { instr: "Choose the right word for the gap!", done: "Great! The sentence is complete!", retry: "Try another word", next: "Again" },
};

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function SentenceCloze({
  before = "Bola kitob ",
  after = ".",
  choices = ["oʻqiydi", "yuguradi", "uxlaydi"],
  answer = "oʻqiydi",
  emoji,
  clue,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STR[lang] || STR.uz;
  const order = useMemo(() => shuffle(choices), [choices]);
  const [picked, setPicked] = useState(null);
  const [shake, setShake] = useState(null);
  const solved = picked === answer;
  const clueText = clue ? clue[lang] ?? clue.uz : null;

  function choose(c) {
    if (solved) return;
    const ok = c === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { word: c });
    if (ok) {
      setPicked(c);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(c);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(clueText || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 30 }}>{emoji}</span>}
          {clueText && <span>{clueText}</span>}
        </div>
      )}
      <p style={S.instr}>{t.instr}</p>
      <div style={S.sentence}>
        {before && <span style={S.fixed}>{before}</span>}
        <span style={{ ...S.blank, ...(solved ? S.blankOk : {}) }}>{solved ? answer : "?"}</span>
        {after && <span style={S.fixed}>{after}</span>}
      </div>
      <div style={S.pool}>
        {order.map((c) => (
          <button
            key={c}
            onClick={() => choose(c)}
            disabled={solved}
            className={shake === c ? "noShakeW" : ""}
            style={{ ...S.pick, ...(solved && c === answer ? S.pickOk : {}), cursor: solved ? "default" : "pointer" }}
          >
            {c}
          </button>
        ))}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes noShakeW{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.noShakeW{animation:noShakeW .42s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  sentence: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 24, fontWeight: 800, color: "#1f3a5f", minHeight: 56, lineHeight: 1.4 },
  fixed: { letterSpacing: 0.2 },
  blank: { minWidth: 70, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 12px", borderRadius: 12, border: "2px dashed #c9b98f", background: "#faf7ef", color: "#c9a40f" },
  blankOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  pool: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 20 },
  pick: { minHeight: 50, padding: "0 18px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 20, fontWeight: 800, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  pickOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 #37a85e" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
