"use client";
import React, { useMemo, useState } from "react";

/**
 * TongueTwister — "Tez aytish". Shows a tongue-twister with the repeated
 * leading sound of each word highlighted, plus a playful "say it 3× fast" cue.
 * The graded task is phonemic awareness: the child taps WHICH sound repeats.
 * A correct pick lights green; a wrong one shakes. Self-grading.
 *
 * Props: {
 *   text: string|{uz,ru,en},   // the tongue-twister sentence (uz recommended)
 *   sound: string,             // the repeated leading sound, e.g. "T", "Sh", "G"
 *   options: [string],         // sound choices to tap (include `sound`)
 *   clue?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { badge: "Tez aytish", cue: "3 marta tez ayt!", instr: "Qaysi tovush koʻp takrorlanadi?", done: "Barakalla! 🎉", retry: "Yana oʻylab koʻr", next: "Yana" },
  ru: { badge: "Скороговорка", cue: "Скажи быстро 3 раза!", instr: "Какой звук чаще повторяется?", done: "Молодец! 🎉", retry: "Подумай ещё раз", next: "Ещё" },
  en: { badge: "Tongue-twister", cue: "Say it fast 3×!", instr: "Which sound repeats most?", done: "Great! 🎉", retry: "Think again", next: "Again" }
};
const DEMO = {
  text: { uz: "Toʻrtta toʻn tikdi Tohir tez.", ru: "Тохир быстро сшил четыре тона.", en: "Tohir quickly tailored four robes." },
  sound: "T",
  options: ["T", "S", "Q"]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

/** Render a word, coloring its leading sound if it matches `sound`. */
function Word({ w, sound }) {
  const s = (sound || "").toLocaleLowerCase();
  const lead = w.slice(0, s.length).toLocaleLowerCase();
  if (s && lead === s) {
    return (
      <span style={S.word}>
        <span style={S.hot}>{w.slice(0, s.length)}</span>{w.slice(s.length)}
      </span>
    );
  }
  return <span style={S.word}>{w}</span>;
}

export default function TongueTwister({ text, sound, options, clue, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (text == null || !sound || !options) {
    text = DEMO.text;
    sound = DEMO.sound;
    options = DEMO.options;
  }
  const words = useMemo(() => pickL(text, lang).split(/\s+/).filter(Boolean), [text, lang]);
  const [chosen, setChosen] = useState(null);
  const [shake, setShake] = useState(null);
  const first = React.useRef(null);
  const done = chosen != null;
  const clueText = pickL(clue, lang);

  function choose(opt) {
    if (done) return;
    const ok = opt.toLocaleLowerCase() === sound.toLocaleLowerCase();
    if (first.current === null) first.current = ok;
    if (typeof onAttempt === "function") onAttempt(ok, { pick: opt });
    if (ok) {
      setChosen(opt);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(opt);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {clueText && <div style={S.clue}>{clueText}</div>}

      <div style={S.card}>
        <span style={S.badge}>👅 {t.badge}</span>
        <div style={S.sentence}>
          {words.map((w, i) => (
            <React.Fragment key={i}><Word w={w} sound={done ? sound : ""} /> </React.Fragment>
          ))}
        </div>
        <div style={S.cue}>🔊 {t.cue}</div>
      </div>

      <p style={S.instr}>{t.instr}</p>

      <div style={S.opts}>
        {options.map((opt, i) => {
          const solved = done && opt === chosen;
          return (
            <button
              key={i}
              onClick={() => choose(opt)}
              disabled={done}
              className={shake === opt ? "ttShake" : ""}
              style={{ ...S.opt, ...(solved ? S.optOn : {}), ...(done && !solved ? S.optDim : {}) }}
            >
              {opt}
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

const CSS = `@keyframes ttShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.ttShake{animation:ttShake .44s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  card: { position: "relative", borderRadius: 18, border: "2px solid #b9e0c6", background: "linear-gradient(180deg,#effaf1,#fff)", padding: "22px 18px 14px", textAlign: "center", boxShadow: "0 5px 0 rgba(0,0,0,.05)", marginBottom: 14 },
  badge: { position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#46c06a", color: "#fff", fontSize: 13, fontWeight: 800, padding: "3px 14px", borderRadius: 999, whiteSpace: "nowrap", boxShadow: "0 3px 0 rgba(0,0,0,.08)" },
  sentence: { fontSize: 18, fontWeight: 800, color: "#215b36", lineHeight: 1.5 },
  word: { whiteSpace: "nowrap" },
  hot: { color: "#e8553e", textDecoration: "underline", textUnderlineOffset: 3 },
  cue: { marginTop: 10, fontSize: 13.5, fontWeight: 800, color: "#8a6d1f" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  opts: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  opt: { minWidth: 56, border: "2px solid #cfe0ff", background: "#f4f8ff", color: "#2f6fed", borderRadius: 14, padding: "10px 18px", fontFamily: "inherit", fontSize: 20, fontWeight: 900, cursor: "pointer" },
  optOn: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  optDim: { opacity: 0.4 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
