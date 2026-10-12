"use client";
import React, { useMemo, useState } from "react";

/**
 * ShadowGuess — a big black silhouette is shown; the child taps which animal
 * (from the colourful options) casts that shadow. Recreates the textbook's
 * "guess the animal by its shadow" game. On the correct pick the shadow lights
 * up in colour.
 *
 * Props: { shadow: emoji, options: [{ id?, emoji, label?, correct? }],
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - shadow: the emoji shown as a silhouette (usually === the correct option).
 *   - options: 3–4 cards; EXACTLY ONE has correct:true.
 */
const STR = {
  uz: { instr: "Bu soya qaysi jonivorniki? Bos!", done: "Barakalla! Topding!", retry: "Yoʻq, boshqa jonivor", next: "Yana" },
  ru: { instr: "Чья это тень? Нажми!", done: "Молодец! Угадал!", retry: "Нет, другое животное", next: "Ещё" },
  en: { instr: "Whose shadow is this? Tap it!", done: "Great! You guessed it!", retry: "No, another animal", next: "Again" },
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

export default function ShadowGuess({ shadow = "🐘", options = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
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

      <div style={S.stage}>
        <span style={S.ground} aria-hidden />
        <span style={{ ...S.shadow, ...(solved ? S.shadowLit : {}) }} aria-hidden>{shadow}</span>
      </div>

      <div style={S.row}>
        {cards.map((c) => {
          const on = solvedId === c._id;
          const cap = L(c.label, lang);
          return (
            <button
              key={c._id}
              onClick={() => tap(c)}
              disabled={solved}
              aria-label={cap || undefined}
              className={shakeId === c._id ? "sgShake" : ""}
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

const CSS = `@keyframes sgShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.sgShake{animation:sgShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  stage: { position: "relative", height: 150, borderRadius: 22, background: "linear-gradient(#eaf6ff,#dff0d8)", border: "3px solid #d9e6c4", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  ground: { position: "absolute", left: 0, right: 0, bottom: 0, height: 34, background: "#bfe08e" },
  shadow: { position: "relative", fontSize: 96, lineHeight: 1, filter: "brightness(0) saturate(0)", transition: "filter .4s ease", zIndex: 1 },
  shadowLit: { filter: "none" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 16 },
  card: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, minWidth: 92, minHeight: 92, padding: "10px 12px", borderRadius: 20, border: "3px solid #d9e6c4", background: "#fff", boxShadow: "0 5px 0 rgba(80,90,40,.10)", transition: "transform .12s, border-color .15s" },
  on: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 5px 0 rgba(70,192,106,.28)", transform: "translateY(-2px)" },
  emoji: { fontSize: 42, lineHeight: 1 },
  cap: { fontSize: 13.5, fontWeight: 800, color: "#3c5a1e", textAlign: "center" },
  tick: { position: "absolute", top: 6, right: 8, fontSize: 18, fontWeight: 900, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
