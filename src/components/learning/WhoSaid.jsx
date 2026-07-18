"use client";
import React, { useMemo, useState } from "react";

/**
 * WhoSaid — "bu gaplar qaysi qahramonga tegishli?". For a dialogue story, each
 * quote is shown with a row of character buttons; the child taps who said it.
 * Unlike match_pairs (1-to-1), several quotes may belong to the SAME character.
 * A correct pick locks the row green and shows the speaker; a wrong one shakes.
 * Self-grading.
 *
 * Props: {
 *   characters: [{ name: string|{uz,ru,en}, emoji? }],
 *   quotes: [{ text: string|{uz,ru,en}, speaker: number }],  // speaker = character index
 *   clue?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Bu gapni kim aytdi?", done: "Barakalla! 🎉", retry: "Yana oʻylab koʻr", next: "Yana" },
  ru: { instr: "Кто это сказал?", done: "Молодец! 🎉", retry: "Подумай ещё раз", next: "Ещё" },
  en: { instr: "Who said this line?", done: "Great! 🎉", retry: "Think again", next: "Again" }
};
const DEMO = {
  characters: [
    { name: { uz: "Samolyotjon", ru: "Самолётик", en: "Little Plane" }, emoji: "✈️" },
    { name: { uz: "Quyosh bobo", ru: "Дед Солнце", en: "Grandfather Sun" }, emoji: "☀️" }
  ],
  quotes: [
    { text: { uz: "Meni kichkina samolyotchaga aylantirib qoʻying!", ru: "Преврати меня в маленький самолётик!", en: "Turn me into a tiny plane!" }, speaker: 0 },
    { text: { uz: "Nega? Esing joyidami?", ru: "Зачем? Ты в своём уме?", en: "Why? Are you all right?" }, speaker: 1 }
  ]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function WhoSaid({ characters, quotes, clue, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!characters || !quotes) {
    characters = DEMO.characters;
    quotes = DEMO.quotes;
  }
  const rows = useMemo(() => quotes.map((q, i) => ({ ...q, i })), [quotes]);
  const [answered, setAnswered] = useState({}); // {rowIndex: speakerIndex}
  const [shake, setShake] = useState(null); // `${row}:${char}`
  const first = React.useRef(null);
  const done = Object.keys(answered).length >= rows.length;
  const clueText = pickL(clue, lang);

  function choose(row, ci) {
    if (done || answered[row.i] != null) return;
    const ok = ci === row.speaker;
    if (first.current === null) first.current = ok;
    if (typeof onAttempt === "function") onAttempt(ok, { row: row.i, char: ci });
    if (ok) {
      const na = { ...answered, [row.i]: ci };
      setAnswered(na);
      if (Object.keys(na).length >= rows.length && typeof onCorrect === "function") onCorrect();
    } else {
      const key = row.i + ":" + ci;
      setShake(key);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {clueText && <div style={S.clue}>{clueText}</div>}
      <p style={S.instr}>{t.instr}</p>

      <div style={S.list}>
        {rows.map((row) => {
          const ans = answered[row.i];
          const solved = ans != null;
          const who = solved ? characters[ans] : null;
          return (
            <div key={row.i} style={{ ...S.row, ...(solved ? S.rowOn : {}) }}>
              <div style={S.quote}>“{pickL(row.text, lang)}”</div>
              {solved ? (
                <div style={S.speaker}>{who.emoji ? who.emoji + " " : ""}{pickL(who.name, lang)} ✓</div>
              ) : (
                <div style={S.chars}>
                  {characters.map((c, ci) => (
                    <button
                      key={ci}
                      onClick={() => choose(row, ci)}
                      className={shake === row.i + ":" + ci ? "wsShake" : ""}
                      style={S.charBtn}
                    >
                      {c.emoji ? c.emoji + " " : ""}{pickL(c.name, lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">{done ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}</div>

      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes wsShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.wsShake{animation:wsShake .42s}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  list: { display: "flex", flexDirection: "column", gap: 12 },
  row: { padding: "12px 14px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", boxShadow: "0 4px 0 rgba(0,0,0,.05)" },
  rowOn: { border: "2px solid #46c06a", background: "#eefcf2" },
  quote: { fontSize: 16, fontWeight: 700, color: "#1f3a5f", lineHeight: 1.4, marginBottom: 8 },
  chars: { display: "flex", flexWrap: "wrap", gap: 8 },
  charBtn: { border: "2px solid #cfe0ff", background: "#f4f8ff", color: "#2f6fed", borderRadius: 999, padding: "8px 14px", fontFamily: "inherit", fontSize: 14.5, fontWeight: 800, cursor: "pointer" },
  speaker: { fontSize: 15.5, fontWeight: 800, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
