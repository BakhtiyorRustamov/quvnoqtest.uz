"use client";
import React, { useMemo, useState } from "react";

/**
 * PickPicture — tap the ONE correct picture (emoji) card. The natural-science
 * counterpart of the math "click_correct": each option is a big emoji with a
 * short caption, and exactly one is right. Great for "tap the sense organ you
 * hear with", "tap the wild animal", "tap the object made of glass", etc.
 *
 * Props: { options: [{ id?, emoji, label?, correct? }], lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - options: 3–6 cards; EXACTLY ONE has correct:true.
 *   - label: optional caption, a plain string or { uz, ru, en }.
 *   - onAttempt(ok, payload) fires on each tap (shell keeps the first for the
 *     score); onCorrect() fires when the right card is tapped.
 */
const STR = {
  uz: { instr: "Toʻgʻri rasmni bos!", done: "Barakalla! Toʻgʻri!", retry: "Yana urinib koʻr", next: "Yana" },
  ru: { instr: "Нажми правильную картинку!", done: "Молодец! Верно!", retry: "Попробуй ещё раз", next: "Ещё" },
  en: { instr: "Tap the correct picture!", done: "Great! Correct!", retry: "Try again", next: "Again" },
};

const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.id ?? i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function PickPicture({ options = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(options), [options]);
  const [solvedId, setSolvedId] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const solved = solvedId !== null;

  function tap(card) {
    if (solved) return;
    const ok = !!card.correct;
    if (typeof onAttempt === "function") onAttempt(ok, { id: card._id });
    if (ok) {
      setSolvedId(card._id);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShakeId(card._id);
      setTimeout(() => setShakeId(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        {cards.map((c) => {
          const on = solvedId === c._id;
          const cap = L(c.label, lang);
          return (
            <button
              key={c._id}
              onClick={() => tap(c)}
              disabled={solved}
              aria-label={cap || undefined}
              className={shakeId === c._id ? "ppShake" : ""}
              style={{ ...S.card, ...(on ? S.on : {}), cursor: solved ? "default" : "pointer" }}
            >
              <span style={S.emoji} aria-hidden>{c.emoji}</span>
              {cap && <span style={S.cap}>{cap}</span>}
              {on && <span style={S.tick} aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shakeId != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes ppShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.ppShake{animation:ppShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  card: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minWidth: 104, minHeight: 104, padding: "12px 14px", borderRadius: 20, border: "3px solid #d9e6c4", background: "#fff", boxShadow: "0 5px 0 rgba(80,90,40,.10)", transition: "transform .12s, border-color .15s" },
  on: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 5px 0 rgba(70,192,106,.28)", transform: "translateY(-2px)" },
  emoji: { fontSize: 46, lineHeight: 1 },
  cap: { fontSize: 14, fontWeight: 800, color: "#3c5a1e", textAlign: "center" },
  tick: { position: "absolute", top: 6, right: 8, fontSize: 18, fontWeight: 900, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
