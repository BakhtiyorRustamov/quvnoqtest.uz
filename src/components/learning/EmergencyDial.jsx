"use client";
import React, { useMemo, useState } from "react";

/**
 * EmergencyDial — a phone-styled widget: a situation is shown at the top, and the
 * child taps the correct emergency-service number below. Thematic for the "how a
 * phone works / emergency numbers" lesson (101 fire, 102 police, 103 ambulance,
 * 104 gas). Data-driven via `scenario` + `options`.
 *
 * Props: { scenario: { emoji, label? }, options: [{ number, label, correct }],
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - options: 3–4 service cards; EXACTLY ONE has correct:true.
 */
const STR = {
  uz: { instr: "Toʻgʻri raqamni ter!", done: "Barakalla! Toʻgʻri raqam!", retry: "Boshqa raqam — yana urin", next: "Yana" },
  ru: { instr: "Набери правильный номер!", done: "Молодец! Верный номер!", retry: "Другой номер — попробуй ещё", next: "Ещё" },
  en: { instr: "Dial the right number!", done: "Great! Correct number!", retry: "Wrong number — try again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.number ?? i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function EmergencyDial({ scenario = {}, options = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(options), [options]);
  const [solvedId, setSolvedId] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const solved = solvedId !== null;

  function tap(card) {
    if (solved) return;
    const ok = !!card.correct;
    if (typeof onAttempt === "function") onAttempt(ok, { number: card.number });
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
      <div style={S.phone}>
        <div style={S.screen}>
          <span style={S.scEmoji} aria-hidden>{scenario.emoji}</span>
          {L(scenario.label, lang) && <span style={S.scLabel}>{L(scenario.label, lang)}</span>}
        </div>
        <div style={S.keys}>
          {cards.map((c) => {
            const on = solvedId === c._id;
            return (
              <button
                key={c._id}
                onClick={() => tap(c)}
                disabled={solved}
                aria-label={c.number + " " + L(c.label, lang)}
                className={shakeId === c._id ? "edShake" : ""}
                style={{ ...S.key, ...(on ? S.keyOn : {}) }}
              >
                <span style={S.num}>{c.number}</span>
                <span style={S.lab}>{L(c.label, lang)}</span>
                {on && <span style={S.tick} aria-hidden>✓</span>}
              </button>
            );
          })}
        </div>
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

const CSS = `@keyframes edShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.edShake{animation:edShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}`;
const S = {
  wrap: { maxWidth: 440, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  phone: { maxWidth: 300, margin: "0 auto", background: "#1e2530", borderRadius: 28, padding: 12, boxShadow: "0 10px 24px -10px rgba(0,0,0,.5)" },
  screen: { background: "linear-gradient(#eaf4ff,#dfeffb)", borderRadius: 16, minHeight: 96, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 12 },
  scEmoji: { fontSize: 52, lineHeight: 1 },
  scLabel: { fontSize: 14, fontWeight: 800, color: "#1f3a5f" },
  keys: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  key: { position: "relative", borderRadius: 16, border: "none", cursor: "pointer", background: "#f4f7fb", padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, boxShadow: "0 4px 0 rgba(0,0,0,.18)" },
  keyOn: { background: "#eefcf2", boxShadow: "0 4px 0 rgba(70,192,106,.4)" },
  num: { fontSize: 26, fontWeight: 900, color: "#1f3a5f", letterSpacing: 1 },
  lab: { fontSize: 12.5, fontWeight: 800, color: "#5a6675", textAlign: "center", lineHeight: 1.1 },
  tick: { position: "absolute", top: 5, right: 8, fontSize: 16, fontWeight: 900, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
