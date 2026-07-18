"use client";
import React, { useState } from "react";

/**
 * Cinquain — the textbook "sinkveyn tuzing" word-web. A topic word sits at the
 * top (e.g. "Ona"); for each guided line the child picks the required number of
 * words from a small bank — describing words (Qanday?), action words (Nima
 * qiladi?), a synonym. When every line is filled the finished cinquain is shown.
 * It is a creative, ungraded builder (any valid picks complete it).
 *
 * Props: {
 *   topic: string|{uz,ru,en},
 *   lines: [{ label:{uz,ru,en}, need:number, bank:string[] }],
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Har bir qatorga mos soʻzlarni tanla", done: "Ajoyib sinkveyn tuzding! 🎉", next: "Yana" },
  ru: { instr: "Подбери подходящие слова к каждой строке", done: "Отличный синквейн! 🎉", next: "Ещё" },
  en: { instr: "Pick the right words for each line", done: "A lovely cinquain! 🎉", next: "Again" }
};
const DEMO = {
  topic: { uz: "Ona", ru: "Мама", en: "Mother" },
  lines: [
    { label: { uz: "Qanday?", ru: "Какая?", en: "What is she like?" }, need: 2, bank: ["mehribon", "gʻamxoʻr", "aqlli", "kuchli"] },
    { label: { uz: "Nima qiladi?", ru: "Что делает?", en: "What does she do?" }, need: 3, bank: ["mehr beradi", "ovqat pishiradi", "alla aytadi", "tarbiyalaydi"] },
    { label: { uz: "Maʼnodosh soʻz", ru: "Синоним", en: "A synonym" }, need: 1, bank: ["oyi", "onajon", "volida"] }
  ]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function Cinquain({ topic, lines, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!lines || !lines.length) {
    topic = topic ?? DEMO.topic;
    lines = DEMO.lines;
  }
  const [picks, setPicks] = useState(() => lines.map(() => []));
  const scored = React.useRef(false);
  const complete = lines.every((ln, i) => picks[i].length >= ln.need);

  function togglePick(li, word) {
    if (complete) return;
    const cur = picks[li];
    let next;
    if (cur.includes(word)) next = cur.filter((w) => w !== word);
    else if (cur.length < lines[li].need) next = [...cur, word];
    else next = cur; // line already full
    if (next === cur) return;
    const np = picks.map((p, i) => (i === li ? next : p));
    setPicks(np);
    if (!scored.current && next.length > cur.length) {
      scored.current = true;
      if (typeof onAttempt === "function") onAttempt(true, { word });
    }
    if (lines.every((ln, i) => np[i].length >= ln.need) && typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.card}>
        <div style={S.topic}>{pickL(topic, lang)}</div>
        {lines.map((ln, li) => (
          <div key={li} style={S.lineBlock}>
            <div style={S.label}>{pickL(ln.label, lang)}</div>
            <div style={S.slots}>
              {Array.from({ length: ln.need }, (_, s) => {
                const w = picks[li][s];
                return (
                  <span key={s} style={{ ...S.slot, ...(w ? S.slotOn : {}) }}>{w || "…"}</span>
                );
              })}
            </div>
            <div style={S.bank}>
              {ln.bank.map((w) => {
                const on = picks[li].includes(w);
                return (
                  <button key={w} onClick={() => togglePick(li, w)} disabled={complete && !on} style={{ ...S.chip, ...(on ? S.chipOn : {}) }}>
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={S.status} aria-live="polite">{complete ? <span style={S.ok}>{t.done}</span> : <span>&nbsp;</span>}</div>

      {!embedded && complete && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes cqPop{from{transform:scale(.85);opacity:.4}to{transform:none;opacity:1}}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  card: { background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 18, padding: "16px 16px 12px", boxShadow: "0 12px 28px -20px rgba(90,60,20,.5)" },
  topic: { textAlign: "center", fontSize: 26, fontWeight: 900, color: "#7a3e12", marginBottom: 10 },
  lineBlock: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: 800, color: "#5a2d82", marginBottom: 5 },
  slots: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 },
  slot: { minWidth: 60, padding: "4px 12px", borderRadius: 999, border: "2px dashed #c8b98f", background: "#fff", color: "#c3bca6", fontSize: 15, fontWeight: 800, textAlign: "center" },
  slotOn: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", animation: "cqPop .18s ease" },
  bank: { display: "flex", flexWrap: "wrap", gap: 6 },
  chip: { border: "2px solid #cfe0ff", background: "#f4f8ff", color: "#2f6fed", borderRadius: 999, padding: "6px 12px", fontFamily: "inherit", fontSize: 14, fontWeight: 800, cursor: "pointer" },
  chipOn: { border: "2px solid #2f6fed", background: "#2f6fed", color: "#fff" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
