"use client";
import React, { useMemo, useState } from "react";

/**
 * LetterComplete — drop the right letter into a word (Ona tili, grades 1–2).
 * Shows a word with one empty slot ( before + [ ? ] + after ) and a row of
 * letter choices. Tapping the correct letter fills the slot green and completes
 * the word; a wrong letter shakes. Great for "change one sound → new word"
 * ("ayiq → qayiq") and "sound vs. letter" exercises.
 *
 * Props: { before='', after='', choices:[…letters], answer, emoji?, clue?,
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - answer: the correct letter (must be one of choices).
 *   - clue:   optional {uz,ru,en} line shown above the word.
 */
const STR = {
  uz: { instr: "Toʻgʻri harfni tanla!", done: "Barakalla! Soʻz hosil boʻldi!", retry: "Boshqa harfni sinab koʻr", next: "Yana" },
  ru: { instr: "Выбери верную букву!", done: "Молодец! Слово получилось!", retry: "Попробуй другую букву", next: "Ещё" },
  en: { instr: "Choose the right letter!", done: "Great! The word is complete!", retry: "Try another letter", next: "Again" },
};

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function LetterComplete({
  before = "qa",
  after = "iq",
  choices = ["y", "l", "m"],
  answer = "y",
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
    if (typeof onAttempt === "function") onAttempt(ok, { letter: c });
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
      <div style={S.word}>
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
            className={shake === c ? "noShakeL" : ""}
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

const CSS = `@keyframes noShakeL{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.noShakeL{animation:noShakeL .42s}`;
const S = {
  wrap: { maxWidth: 500, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  word: { display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 34, fontWeight: 800, color: "#1f3a5f", textTransform: "lowercase", minHeight: 60 },
  fixed: { letterSpacing: 1 },
  blank: { minWidth: 46, height: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 12, border: "2px dashed #c9b98f", background: "#faf7ef", color: "#c9a40f" },
  blankOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  pool: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 20 },
  pick: { minWidth: 54, height: 54, borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 24, fontWeight: 800, boxShadow: "0 4px 0 rgba(0,0,0,.06)", textTransform: "lowercase" },
  pickOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 #37a85e" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
