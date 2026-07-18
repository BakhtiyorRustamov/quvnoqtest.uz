"use client";
import React, { useMemo, useState } from "react";

/**
 * BookCare — "kitobni toza saqlang". Two book characters watch: a smiling green
 * book (well cared-for) and a sad red book (mistreated). For each action the
 * child decides whether it makes the book HAPPY (good care) or SAD (harms it) by
 * tapping the matching face. A correct choice locks the row green; a wrong one
 * shakes. Teaches how to look after books. Self-grading.
 *
 * Props: {
 *   actions: [{ text: string|{uz,ru,en}, good: boolean }],  // good = keeps book happy
 *   clue?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Bu ish kitobni xursand qiladimi yoki xafa?", done: "Barakalla! 🎉", retry: "Qayta oʻylab koʻr", next: "Yana", happy: "Xursand", sad: "Xafa" },
  ru: { instr: "Это действие радует книгу или огорчает?", done: "Молодец! 🎉", retry: "Подумай ещё раз", next: "Ещё", happy: "Рада", sad: "Грустит" },
  en: { instr: "Does this make the book happy or sad?", done: "Great! 🎉", retry: "Think again", next: "Again", happy: "Happy", sad: "Sad" }
};
const DEMO = {
  actions: [
    { text: { uz: "Muqovalab, oʻrab qoʻyish", ru: "Обернуть в обложку", en: "Wrap it in a cover" }, good: true },
    { text: { uz: "Varaqlarini bukish", ru: "Сгибать страницы", en: "Fold the pages" }, good: false },
    { text: { uz: "Toza qoʻlda varaqlash", ru: "Листать чистыми руками", en: "Turn pages with clean hands" }, good: true },
    { text: { uz: "Betiga chizish", ru: "Рисовать на страницах", en: "Draw on the pages" }, good: false },
    { text: { uz: "Javonga tartibli qoʻyish", ru: "Ставить на полку аккуратно", en: "Shelve it neatly" }, good: true },
    { text: { uz: "Yerga tashlab ketish", ru: "Бросать на пол", en: "Leave it on the floor" }, good: false }
  ]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}
function Book({ mood, size = 62 }) {
  const happy = mood === "happy";
  const cover = happy ? "#46c06a" : "#e8553e";
  const dark = happy ? "#2f9e54" : "#c33b22";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect x="12" y="8" width="40" height="48" rx="6" fill={cover} />
      <rect x="12" y="8" width="9" height="48" rx="4" fill={dark} />
      <rect x="24" y="14" width="24" height="36" rx="4" fill="#fffdf6" />
      <circle cx="31" cy="27" r="3.2" fill="#33302b" />
      <circle cx="42" cy="27" r="3.2" fill="#33302b" />
      {happy ? (
        <path d="M30 37 Q36.5 44 43 37" stroke="#33302b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M30 42 Q36.5 35 43 42" stroke="#33302b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function BookCare({ actions, clue, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!actions || !actions.length) actions = DEMO.actions;
  const rows = useMemo(() => actions.map((a, i) => ({ ...a, i })), [actions]);
  const [answered, setAnswered] = useState({}); // {i: true}
  const [shake, setShake] = useState(null);
  const first = React.useRef(null);
  const done = Object.keys(answered).length >= rows.length;

  function choose(row, choiceGood) {
    if (done || answered[row.i]) return;
    const ok = choiceGood === row.good;
    if (first.current === null) first.current = ok;
    if (typeof onAttempt === "function") onAttempt(ok, { at: row.i });
    if (ok) {
      const na = { ...answered, [row.i]: choiceGood };
      setAnswered(na);
      if (Object.keys(na).length >= rows.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(row.i);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {pickL(clue, lang) && <div style={S.clue}>{pickL(clue, lang)}</div>}

      <div style={S.legend}>
        <div style={S.legItem}><Book mood="happy" /><span style={{ ...S.legLbl, color: "#2f9e54" }}>😊 {t.happy}</span></div>
        <div style={S.legItem}><Book mood="sad" /><span style={{ ...S.legLbl, color: "#d23b22" }}>😢 {t.sad}</span></div>
      </div>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.list}>
        {rows.map((row) => {
          const ans = answered[row.i];
          const solvedRow = ans != null;
          return (
            <div key={row.i} className={shake === row.i ? "bcShake" : ""} style={{ ...S.row, ...(solvedRow ? S.rowOn : {}) }}>
              <span style={S.rowTxt}>{pickL(row.text, lang)}</span>
              {solvedRow ? (
                <span style={S.rowResult}>{row.good ? "😊" : "😢"} ✓</span>
              ) : (
                <span style={S.choices}>
                  <button onClick={() => choose(row, true)} style={{ ...S.choice, ...S.choiceHappy }} aria-label={t.happy}>😊</button>
                  <button onClick={() => choose(row, false)} style={{ ...S.choice, ...S.choiceSad }} aria-label={t.sad}>😢</button>
                </span>
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

const CSS = `@keyframes bcShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.bcShake{animation:bcShake .42s}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  legend: { display: "flex", justifyContent: "center", gap: 28, marginBottom: 6 },
  legItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 },
  legLbl: { fontSize: 13, fontWeight: 800 },
  instr: { textAlign: "center", margin: "4px 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  list: { display: "flex", flexDirection: "column", gap: 9 },
  row: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", boxShadow: "0 4px 0 rgba(0,0,0,.05)" },
  rowOn: { border: "2px solid #46c06a", background: "#eefcf2" },
  rowTxt: { flex: 1, fontSize: 15.5, fontWeight: 700, color: "#1f3a5f", lineHeight: 1.35 },
  rowResult: { fontSize: 16, fontWeight: 800, color: "#2f9e54", whiteSpace: "nowrap" },
  choices: { display: "flex", gap: 8 },
  choice: { width: 44, height: 40, borderRadius: 12, border: "2px solid #ece1c8", background: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1 },
  choiceHappy: { borderColor: "#bfe6cb" },
  choiceSad: { borderColor: "#f2c6bd" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
