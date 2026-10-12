"use client";
import React, { useState } from "react";

/**
 * TrueFalseNotGiven — a close-reading check for the Oʻqish savodxonligi subject.
 * Shows ONE statement about the text; the child decides whether, according to
 * the passage, it is Toʻgʻri (True), Notoʻgʻri (False) or Matnda yoʻq (Not
 * given — the text neither says nor denies it). The "Not given" option is what
 * forces careful reading: the child must distinguish "the text says it is
 * false" from "the text simply doesn't mention it". Self-grading.
 *
 * Props: {
 *   statement: string | {uz,ru,en},   // the claim about the text
 *   answer: 'true' | 'false' | 'ng',  // the correct verdict
 *   why?: {uz,ru,en},                 // optional one-line reason, shown after solving
 *   clue?: {uz,ru,en}, emoji?,
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: {
    instr: "Matnga koʻra bu fikr qanday?",
    t: "Toʻgʻri",
    f: "Notoʻgʻri",
    ng: "Matnda yoʻq",
    done: "Barakalla! 🎉",
    retry: "Yana bir oʻylab koʻr",
    next: "Yana"
  },
  ru: {
    instr: "Согласно тексту, это утверждение:",
    t: "Верно",
    f: "Неверно",
    ng: "Не сказано",
    done: "Молодец! 🎉",
    retry: "Подумай ещё раз",
    next: "Ещё"
  },
  en: {
    instr: "According to the text, this statement is:",
    t: "True",
    f: "False",
    ng: "Not given",
    done: "Great job! 🎉",
    retry: "Think again",
    next: "Again"
  }
};

const DEMO = {
  statement: { uz: "Doniyor tugʻilgan kunida kitob sovgʻa oldi.", ru: "Данияр получил книгу в подарок на день рождения.", en: "Doniyor received a book as a birthday gift." },
  answer: "true",
  why: { uz: "Sovgʻalar orasida kitobcha ham bor edi.", ru: "Среди подарков была и книжка.", en: "Among the gifts there was a little book." }
};

function pickL(v, lang) {
  if (v == null) return "";
  return typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function TrueFalseNotGiven({
  statement,
  answer,
  why,
  clue,
  emoji,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  if (statement == null) {
    statement = DEMO.statement;
    answer = answer ?? DEMO.answer;
    why = why ?? DEMO.why;
  }
  const [choice, setChoice] = useState(null); // the key the child picked correctly
  const [shake, setShake] = useState(null);
  const solved = choice !== null;

  const OPTS = [
    { key: "true", label: t.t, emoji: "✅", on: S.tOn },
    { key: "false", label: t.f, emoji: "❌", on: S.fOn },
    { key: "ng", label: t.ng, emoji: "❔", on: S.ngOn }
  ];

  function tap(key) {
    if (solved) return;
    const ok = key === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { choice: key });
    if (ok) {
      setChoice(key);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(key);
      setTimeout(() => setShake(null), 440);
    }
  }

  const clueText = pickL(clue, lang);
  const whyText = pickL(why, lang);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(clueText || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 26 }}>{emoji}</span>}
          {clueText && <span>{clueText}</span>}
        </div>
      )}

      <div style={S.card}>“{pickL(statement, lang)}”</div>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.row}>
        {OPTS.map((o) => {
          const isOn = choice === o.key;
          return (
            <button
              key={o.key}
              onClick={() => tap(o.key)}
              disabled={solved}
              className={shake === o.key ? "tfShake" : ""}
              style={{ ...S.opt, ...(isOn ? o.on : {}), cursor: solved ? "default" : "pointer", opacity: solved && !isOn ? 0.5 : 1 }}
            >
              <span style={{ fontSize: 22 }}>{o.emoji}</span>
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? (
          <span style={S.okBox}>
            <b>{t.done}</b>
            {whyText && <span style={S.why}>{whyText}</span>}
          </span>
        ) : shake ? (
          <span style={S.retry}>{t.retry}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>
          {t.next} →
        </button>
      )}
    </div>
  );
}

const CSS = `@keyframes tfShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.tfShake{animation:tfShake .42s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 10px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  card: { background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 16, padding: "16px 18px", fontSize: 18.5, fontWeight: 700, lineHeight: 1.5, color: "#33302b", textAlign: "center", boxShadow: "0 10px 24px -16px rgba(90,60,20,.5)" },
  instr: { textAlign: "center", margin: "12px 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  opt: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 96, padding: "12px 14px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 15, fontWeight: 800, boxShadow: "0 4px 0 rgba(0,0,0,.06)", transition: "transform .1s" },
  tOn: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 rgba(70,192,106,.25)" },
  fOn: { border: "2px solid #e8553e", background: "#fdeeeb", color: "#d23b22", boxShadow: "0 4px 0 rgba(232,85,62,.25)" },
  ngOn: { border: "2px solid #8a8f98", background: "#f2f3f5", color: "#5a5f68", boxShadow: "0 4px 0 rgba(90,95,104,.2)" },
  status: { minHeight: 30, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14, textAlign: "center" },
  okBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 16, fontWeight: 800, color: "#46c06a" },
  why: { fontSize: 13.5, fontWeight: 700, color: "#7a6f57" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
