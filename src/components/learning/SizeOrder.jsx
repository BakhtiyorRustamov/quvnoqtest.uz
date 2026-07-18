"use client";
import React, { useMemo, useState } from "react";

/**
 * SizeOrder — "soʻzlarni kattalashib borish tartibida joylab … oʻqing". Words are
 * shown scrambled at DIFFERENT font sizes; the child taps them from the smallest
 * to the largest, and reading them in that order spells a hidden proverb (e.g.
 * Alisher Navoiy's "Oz-oz oʻrganib dono boʻlur, qatra-qatra yigʻilib daryo
 * boʻlur"). Each correct tap lights the word green and appends it to the answer
 * strip; a wrong tap (not the smallest remaining) shakes. Self-grading.
 *
 * Props: {
 *   words: string[],       // words IN READING ORDER (index 0 = smallest on screen)
 *   phrase?: string,       // full proverb shown when solved (else words joined)
 *   meaning?: {uz,ru,en},  // what it means, shown after solving
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Soʻzlarni kichikdan kattaga qarab bosing", done: "Barakalla! 🎉", retry: "Eng kichik soʻzdan boshla", meaning: "Maʼnosi", next: "Yana" },
  ru: { instr: "Нажимай слова от маленького к большому", done: "Молодец! 🎉", retry: "Начни с самого маленького слова", meaning: "Значение", next: "Ещё" },
  en: { instr: "Tap the words from smallest to largest", done: "Great! 🎉", retry: "Start with the smallest word", meaning: "Meaning", next: "Again" }
};
const DEMO = {
  words: ["Oz-oz", "oʻrganib", "dono", "boʻlur,", "qatra-qatra", "yigʻilib", "daryo", "boʻlur."],
  phrase: "Oz-oz oʻrganib dono boʻlur, qatra-qatra yigʻilib daryo boʻlur.",
  meaning: { uz: "Bilim oz-ozdan orttiriladi — sabr bilan katta natijaga erishiladi.", ru: "Знания копятся понемногу — терпение приводит к большому результату.", en: "Knowledge grows little by little — patience leads to great results." }
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}
function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _r: Math.random() }));
  return x.sort((p, q) => p._r - q._r);
}

export default function SizeOrder({ words, phrase, meaning, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!words || !words.length) {
    words = DEMO.words;
    phrase = phrase ?? DEMO.phrase;
    meaning = meaning ?? DEMO.meaning;
  }
  const n = words.length;
  // assign a size to each word by its reading-order index (0 = smallest)
  const tiles = useMemo(
    () => shuffle(words.map((w, i) => ({ text: w, i, size: 16 + Math.round((i * 22) / Math.max(1, n - 1)) }))),
    [words, n]
  );
  const [count, setCount] = useState(0);
  const [shake, setShake] = useState(null);
  const solved = count >= n;

  function tap(tile) {
    if (solved) return;
    const ok = tile.i === count; // must tap the smallest untapped word
    if (typeof onAttempt === "function") onAttempt(ok, { word: tile.text });
    if (ok) {
      const nc = count + 1;
      setCount(nc);
      if (nc >= n && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(tile.i);
      setTimeout(() => setShake(null), 420);
    }
  }

  const answer = words.slice(0, count).join(" ");

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.stage}>
        {tiles.map((tile) => {
          const on = tile.i < count;
          const isNext = tile.i === count;
          return (
            <button
              key={tile.i}
              onClick={() => tap(tile)}
              disabled={solved}
              className={shake === tile.i ? "soShake" : ""}
              style={{
                ...S.tile,
                fontSize: tile.size,
                ...(on ? S.on : {}),
                ...(isNext && !solved ? S.next : {}),
                cursor: solved ? "default" : "pointer"
              }}
            >
              {tile.text}
            </button>
          );
        })}
      </div>

      <div style={S.answer}>{answer || <span style={{ color: "#c3bca6" }}>…</span>}</div>

      <div style={S.status} aria-live="polite">
        {solved ? (
          <div style={S.okBox}>
            <div style={S.okPhrase}>🎉 {phrase || answer}</div>
            {meaning && <div style={S.meaning}>{t.meaning}: {pickL(meaning, lang)}</div>}
          </div>
        ) : shake != null ? (
          <span style={S.retry}>{t.retry}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.nextBtn}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes soShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}.soShake{animation:soShake .4s}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 10px", fontSize: 14.5, fontWeight: 800, color: "#7a3e12" },
  stage: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "10px 14px", background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 16, padding: "18px 16px", minHeight: 120, boxShadow: "0 10px 24px -18px rgba(90,60,20,.5)" },
  tile: { border: "none", background: "transparent", fontFamily: "inherit", fontWeight: 800, color: "#2f6fed", lineHeight: 1, padding: "2px 4px", borderRadius: 8, transition: "transform .1s" },
  on: { color: "#2f9e54" },
  next: {},
  answer: { minHeight: 30, marginTop: 12, textAlign: "center", fontSize: 18, fontWeight: 800, color: "#1f3a5f", lineHeight: 1.4 },
  status: { minHeight: 30, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6, textAlign: "center" },
  okBox: { display: "flex", flexDirection: "column", gap: 3, alignItems: "center" },
  okPhrase: { fontSize: 17, fontWeight: 900, color: "#46c06a", lineHeight: 1.35 },
  meaning: { fontSize: 13.5, fontWeight: 700, color: "#7a6f57" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  nextBtn: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
