"use client";
import React, { useState } from "react";

/**
 * FirstLetters — "narsa-buyumlar nomini ayting; ularning birinchi harfi boʻyicha
 * soʻz tuzing". A row of picture (emoji) objects; the child taps them LEFT-TO-
 * RIGHT, and each tap flips the object to reveal its first letter, spelling a
 * hidden word (e.g. 🥁🍯🦅🔥🤖 → B-A-H-O-R → "bahor"). Tapping out of order
 * shakes, which trains left-to-right reading. Self-grading; reveals the word and
 * its meaning at the end.
 *
 * Props: {
 *   objects: [{ emoji, letter, name?:{uz,ru,en} }],  // IN ORDER; first letters spell the word
 *   word?: string,          // the assembled word shown when solved (else letters joined)
 *   meaning?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Rasmlarni chapdan oʻngga bos — birinchi harflaridan soʻz chiqadi", done: "Barakalla! 🎉", retry: "Chapdan boshla — navbatdagi rasmni bos", word: "Soʻz", meaning: "Maʼnosi", next: "Yana" },
  ru: { instr: "Нажимай картинки слева направо — из первых букв выйдет слово", done: "Молодец! 🎉", retry: "Начни слева — нажми следующую картинку", word: "Слово", meaning: "Значение", next: "Ещё" },
  en: { instr: "Tap the pictures left to right — their first letters spell a word", done: "Great! 🎉", retry: "Start from the left — tap the next picture", word: "Word", meaning: "Meaning", next: "Again" }
};
const DEMO = {
  objects: [
    { emoji: "🥁", letter: "B", name: { uz: "baraban", ru: "барабан", en: "drum" } },
    { emoji: "🍯", letter: "A", name: { uz: "asal" } },
    { emoji: "🦅", letter: "H", name: { uz: "humo" } },
    { emoji: "🔥", letter: "O", name: { uz: "olov" } },
    { emoji: "🤖", letter: "R", name: { uz: "robot" } }
  ],
  word: "BAHOR",
  meaning: { uz: "Bahor — yilning fasli.", ru: "Bahor — весна.", en: "Bahor — spring." }
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function FirstLetters({ objects, word, meaning, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!objects || !objects.length) {
    objects = DEMO.objects;
    word = word ?? DEMO.word;
    meaning = meaning ?? DEMO.meaning;
  }
  const n = objects.length;
  const [count, setCount] = useState(0);
  const [shake, setShake] = useState(null);
  const solved = count >= n;

  function tap(i) {
    if (solved || i < count) return;
    const ok = i === count;
    if (typeof onAttempt === "function") onAttempt(ok, { at: i });
    if (ok) {
      const nc = count + 1;
      setCount(nc);
      if (nc >= n && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(i);
      setTimeout(() => setShake(null), 420);
    }
  }

  const answer = objects.slice(0, count).map((o) => o.letter).join("");

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.row}>
        {objects.map((o, i) => {
          const flipped = i < count;
          const isNext = i === count && !solved;
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={solved || flipped}
              className={shake === i ? "flShake" : ""}
              style={{ ...S.card, ...(flipped ? S.cardOn : {}), ...(isNext ? S.cardNext : {}), cursor: solved || flipped ? "default" : "pointer" }}
              title={pickL(o.name, lang)}
            >
              <span style={S.emoji}>{o.emoji}</span>
              <span style={{ ...S.letter, ...(flipped ? S.letterOn : {}) }}>{flipped ? o.letter : "?"}</span>
            </button>
          );
        })}
      </div>

      <div style={S.answer}>{answer ? answer.split("").map((c, k) => <span key={k} style={S.aLetter}>{c}</span>) : <span style={{ color: "#c3bca6" }}>…</span>}</div>

      <div style={S.status} aria-live="polite">
        {solved ? (
          <div style={S.okBox}>
            <div style={S.okWord}>🎉 {t.word}: {word || answer}</div>
            {meaning && <div style={S.meaning}>{pickL(meaning, lang)}</div>}
          </div>
        ) : shake != null ? (
          <span style={S.retry}>{t.retry}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes flShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.flShake{animation:flShake .42s}@keyframes flPop{from{transform:scale(.7)}to{transform:none}}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  card: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 66, padding: "10px 4px", borderRadius: 16, border: "2px solid #ece1c8", background: "#fff", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  cardOn: { border: "2px solid #46c06a", background: "#eefcf2" },
  cardNext: { border: "2px solid #2f6fed", background: "#eef4ff" },
  emoji: { fontSize: 30, lineHeight: 1 },
  letter: { fontSize: 20, fontWeight: 900, color: "#c9bfa6", width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 8, background: "#faf6ec" },
  letterOn: { color: "#fff", background: "#46c06a", animation: "flPop .2s ease" },
  answer: { minHeight: 44, marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
  aLetter: { fontSize: 26, fontWeight: 900, color: "#1f3a5f", width: 32, height: 40, display: "grid", placeItems: "center", borderRadius: 8, background: "#fff", border: "2px solid #ecdcb8" },
  status: { minHeight: 34, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8, textAlign: "center" },
  okBox: { display: "flex", flexDirection: "column", gap: 3, alignItems: "center" },
  okWord: { fontSize: 18, fontWeight: 900, color: "#46c06a" },
  meaning: { fontSize: 14, fontWeight: 700, color: "#7a6f57" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
