"use client";
import React, { useState } from "react";

/**
 * SoundScheme — colour a word's sound boxes: red for a vowel (unli), blue for a
 * consonant (undosh). This is the Alifbe "tovush chizmasi" (sound scheme) that
 * appears on every letter page — kids learn that a word is a run of vowels and
 * consonants ("non" = blue-red-blue). Each box cycles empty → red → blue on tap;
 * press Check when the whole scheme matches.
 *
 * Props: { word, emoji?, scheme, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - scheme: array, one per sound, "v" = vowel (red) or "c" = consonant (blue),
 *     e.g. "non" → ["c","v","c"].
 *   - onAttempt(ok) fires on Check; onCorrect() when every box matches.
 */
const STR = {
  uz: { instr: "Har katakni rangla: qizil — unli, koʻk — undosh.", vowel: "unli", cons: "undosh", check: "Tekshirish", done: "Barakalla! Chizma toʻgʻri!", retry: "Ranglarni yana koʻrib chiq", next: "Yana" },
  ru: { instr: "Раскрась клетки: красный — гласный, синий — согласный.", vowel: "гласный", cons: "согласный", check: "Проверить", done: "Молодец! Схема верна!", retry: "Посмотри цвета ещё раз", next: "Ещё" },
  en: { instr: "Colour each box: red = vowel, blue = consonant.", vowel: "vowel", cons: "consonant", check: "Check", done: "Great! Scheme is right!", retry: "Check the colours again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");
const RED = "#e14b4b", BLUE = "#2f9fe0", GRAY = "#e2e2e2";
// cycle: 0 = empty, 1 = red(vowel), 2 = blue(consonant)
const STATE_COLOR = [GRAY, RED, BLUE];

export default function SoundScheme({ word, emoji, scheme = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const target = scheme.map((s) => (String(s).toLowerCase().startsWith("v") ? 1 : 2));
  const [cells, setCells] = useState(() => scheme.map(() => 0));
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const solved = status === "correct";

  function tap(i) {
    if (solved) return;
    setStatus("idle");
    setCells((c) => c.map((v, k) => (k === i ? (v + 1) % 3 : v)));
  }
  function check() {
    if (solved) return;
    if (cells.some((v) => v === 0)) { setStatus("wrong"); setTimeout(() => setStatus((s) => (s === "wrong" ? "idle" : s)), 900); return; }
    const ok = cells.every((v, i) => v === target[i]);
    if (typeof onAttempt === "function") onAttempt(ok, { cells });
    if (ok) { setStatus("correct"); if (typeof onCorrect === "function") onCorrect(); }
    else { setStatus("wrong"); setTimeout(() => setStatus((s) => (s === "wrong" ? "idle" : s)), 900); }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.wordRow}>
        {emoji && <span style={S.emoji} aria-hidden>{emoji}</span>}
        {word && <span style={S.word}>{L(word, lang)}</span>}
      </div>

      <div style={S.legend}>
        <span style={S.legItem}><span style={{ ...S.swatch, background: RED }} /> {t.vowel}</span>
        <span style={S.legItem}><span style={{ ...S.swatch, background: BLUE }} /> {t.cons}</span>
      </div>

      <div style={S.boxes}>
        {cells.map((v, i) => (
          <button key={i} onClick={() => tap(i)} disabled={solved} aria-label={`${i + 1}`} style={{ ...S.box, background: STATE_COLOR[v], borderColor: v === 0 ? "#c9c9c9" : STATE_COLOR[v] }} />
        ))}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : status === "wrong" ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!solved && <button onClick={check} style={S.check}>{t.check}</button>}
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  wordRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 },
  emoji: { fontSize: 44, lineHeight: 1 },
  word: { fontSize: 26, fontWeight: 900, color: "#33302b", letterSpacing: 1 },
  legend: { display: "flex", justifyContent: "center", gap: 18, marginBottom: 12, fontSize: 13, fontWeight: 800, color: "#6b7280" },
  legItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  swatch: { width: 16, height: 16, borderRadius: 4, display: "inline-block" },
  boxes: { display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" },
  box: { width: 52, height: 52, borderRadius: 12, border: "3px solid", cursor: "pointer", boxShadow: "0 4px 0 rgba(0,0,0,.10)", transition: "background .12s" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  check: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#f4693b", padding: "11px 26px", borderRadius: 999, boxShadow: "0 5px 0 #c94f2a" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
