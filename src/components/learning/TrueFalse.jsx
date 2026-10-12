"use client";
import React, { useState } from "react";

/**
 * TrueFalse — judge a statement as true or false with two big buttons
 * (Toʻgʻri / Notoʻgʻri). An optional emoji/picture can be shown above the
 * buttons. Ideal for natural-science facts: "A bear sleeps in winter", "Ice is
 * water in solid form", etc.
 *
 * Props: { emoji?, answer (boolean), lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - answer: the correct verdict (true = Toʻgʻri).
 *   - onAttempt(ok) on each tap; onCorrect() when the right verdict is tapped.
 */
const STR = {
  uz: { t: "Toʻgʻri", f: "Notoʻgʻri", done: "Barakalla! Toʻgʻri!", retry: "Yana bir oʻyla", next: "Yana" },
  ru: { t: "Верно", f: "Неверно", done: "Молодец! Правильно!", retry: "Подумай ещё", next: "Ещё" },
  en: { t: "True", f: "False", done: "Great! Correct!", retry: "Think again", next: "Again" },
};

export default function TrueFalse({ emoji, answer = true, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState(null); // 'T' | 'F'

  function choose(val) {
    if (solved) return;
    const ok = val === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { chosen: val });
    if (ok) {
      setSolved(true);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(val ? "T" : "F");
      setTimeout(() => setShake(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {emoji && <div style={S.emoji} aria-hidden>{emoji}</div>}
      <div style={S.row}>
        <button
          onClick={() => choose(true)}
          disabled={solved}
          className={shake === "T" ? "tfShake" : ""}
          style={{ ...S.btn, ...S.trueBtn, ...(solved && answer ? S.win : {}) }}
        >
          <span style={S.mark} aria-hidden>✓</span> {t.t}
        </button>
        <button
          onClick={() => choose(false)}
          disabled={solved}
          className={shake === "F" ? "tfShake" : ""}
          style={{ ...S.btn, ...S.falseBtn, ...(solved && !answer ? S.win : {}) }}
        >
          <span style={S.mark} aria-hidden>✕</span> {t.f}
        </button>
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes tfShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.tfShake{animation:tfShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  emoji: { fontSize: 72, lineHeight: 1, margin: "4px 0 14px" },
  row: { display: "flex", gap: 14, justifyContent: "center" },
  btn: { flex: "1 1 0", maxWidth: 200, minHeight: 72, borderRadius: 20, border: "3px solid", cursor: "pointer", fontFamily: "inherit", fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 5px 0 rgba(0,0,0,.12)" },
  trueBtn: { background: "#eefcf2", borderColor: "#46c06a", color: "#2f9e54" },
  falseBtn: { background: "#fdeceb", borderColor: "#e14b4b", color: "#c53a3a" },
  win: { transform: "translateY(-2px)", boxShadow: "0 7px 0 rgba(70,192,106,.3)" },
  mark: { fontSize: 24, fontWeight: 900 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
