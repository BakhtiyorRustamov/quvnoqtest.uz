"use client";
import React, { useMemo, useState } from "react";

/**
 * FillBlanks — "matnni toʻldiring". A sentence (or proverb) has several blanks;
 * a word bank sits below. The child taps a word to pick it up, then taps a blank
 * to drop it in. A correct word locks into the blank (green) and leaves the bank;
 * a wrong one shakes and is returned. Completes when every blank is filled
 * correctly. Self-grading, multi-blank cloze.
 *
 * Props: {
 *   segments: ({ text: string } | { blank: string })[],  // sentence pieces + blanks
 *   bank?: string[],       // words to choose from (default: blank answers, shuffled)
 *   clue?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 * The sentence stays in its original language (Uzbek); only labels localize.
 */
const STR = {
  uz: { instr: "Soʻzni tanlab, boʻsh joyga qoʻying", done: "Barakalla! 🎉", retry: "Bu soʻz bu yerga mos emas", next: "Yana" },
  ru: { instr: "Выбери слово и вставь в пропуск", done: "Молодец! 🎉", retry: "Это слово сюда не подходит", next: "Ещё" },
  en: { instr: "Pick a word and drop it in the gap", done: "Great! 🎉", retry: "That word doesn't fit here", next: "Again" }
};
const DEMO = {
  segments: [
    { text: "Kitob — eng yaxshi" },
    { blank: "doʻst" },
    { text: ". U bizga" },
    { blank: "bilim" },
    { text: "beradi." }
  ],
  bank: ["bilim", "doʻst", "oʻyin"]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}
function shuffle(a) {
  return a.map((v) => ({ v, r: Math.random() })).sort((x, y) => x.r - y.r).map((o) => o.v);
}

export default function FillBlanks({ segments, bank, clue, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!segments || !segments.length) {
    segments = DEMO.segments;
    bank = bank ?? DEMO.bank;
  }
  const blanks = useMemo(() => segments.map((s, i) => ({ ...s, i })).filter((s) => s.blank != null), [segments]);
  const answers = blanks.map((b) => b.blank);
  const words = useMemo(() => shuffle(bank && bank.length ? bank : answers), [bank]);

  const [filled, setFilled] = useState({}); // {segIndex: word}
  const [usedWords, setUsedWords] = useState([]); // words removed from bank
  const [sel, setSel] = useState(null); // selected bank word
  const [shake, setShake] = useState(null); // segIndex being shaken
  const first = React.useRef(null);
  const solved = Object.keys(filled).length >= blanks.length;

  function pickWord(w, key) {
    if (solved || usedWords.includes(key)) return;
    setSel(sel && sel.key === key ? null : { w, key });
  }
  function tapBlank(seg) {
    if (solved || filled[seg.i] != null || !sel) return;
    const ok = sel.w === seg.blank;
    if (first.current === null) first.current = ok;
    if (typeof onAttempt === "function") onAttempt(ok, { blank: seg.blank });
    if (ok) {
      const nf = { ...filled, [seg.i]: sel.w };
      setFilled(nf);
      setUsedWords([...usedWords, sel.key]);
      setSel(null);
      if (Object.keys(nf).length >= blanks.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(seg.i);
      setTimeout(() => setShake(null), 420);
      setSel(null);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {pickL(clue, lang) && <div style={S.clue}>{pickL(clue, lang)}</div>}
      <p style={S.instr}>{t.instr}</p>

      {/* sentence with inline blanks */}
      <div style={S.sentence}>
        {segments.map((seg, i) =>
          seg.blank != null ? (
            <button
              key={i}
              onClick={() => tapBlank({ ...seg, i })}
              disabled={solved || filled[i] != null}
              className={shake === i ? "fbShake" : ""}
              style={{ ...S.blank, ...(filled[i] != null ? S.blankOn : {}), ...(sel && filled[i] == null ? S.blankReady : {}) }}
            >
              {filled[i] != null ? filled[i] : "    "}
            </button>
          ) : (
            <span key={i} style={S.fixed}>{seg.text}</span>
          )
        )}
      </div>

      {/* word bank */}
      <div style={S.bank}>
        {words.map((w, k) => {
          const key = w + "#" + k;
          const used = usedWords.includes(key);
          const on = sel && sel.key === key;
          return (
            <button
              key={key}
              onClick={() => pickWord(w, key)}
              disabled={used || solved}
              style={{ ...S.chip, ...(used ? S.chipUsed : {}), ...(on ? S.chipOn : {}) }}
            >
              {w}
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">{solved ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}</div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes fbShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.fbShake{animation:fbShake .42s}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  sentence: { background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 16, padding: "18px 18px", fontSize: 19, fontWeight: 700, lineHeight: 2.1, color: "#33302b", textAlign: "center", boxShadow: "0 10px 24px -18px rgba(90,60,20,.5)" },
  fixed: { margin: "0 3px" },
  blank: { display: "inline-block", minWidth: 70, margin: "0 3px", padding: "2px 10px", borderRadius: 10, border: "2px dashed #c8b98f", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 18, fontWeight: 800, cursor: "pointer", verticalAlign: "middle" },
  blankReady: { borderColor: "#2f6fed", background: "#eef4ff", cursor: "pointer" },
  blankOn: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", cursor: "default" },
  bank: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 16 },
  chip: { border: "2px solid #cfe0ff", background: "#f4f8ff", color: "#2f6fed", borderRadius: 999, padding: "9px 18px", fontFamily: "inherit", fontSize: 16.5, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 0 rgba(47,111,237,.15)" },
  chipOn: { border: "2px solid #2f6fed", background: "#2f6fed", color: "#fff", transform: "translateY(-1px)" },
  chipUsed: { opacity: 0.3, cursor: "default", boxShadow: "none" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
