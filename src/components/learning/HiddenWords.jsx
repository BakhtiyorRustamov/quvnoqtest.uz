"use client";
import React, { useMemo, useState } from "react";

/**
 * HiddenWords — "yashiringan soʻzlarni aniqlang". A run-on string of letters with
 * no spaces hides several words (e.g. "assalomrahmatmarhamat"). The child taps the
 * gaps BETWEEN letters to place a divider where one word ends and the next begins.
 * A correct divider snaps in (green) and the words drift apart; a wrong gap shakes.
 * Solved when every word boundary is found. Self-grading.
 *
 * Props: {
 *   words: string[],        // the hidden words IN ORDER; the string = words.join("")
 *   text?: string,          // optional explicit run-on string (defaults to words joined)
 *   clue?: {uz,ru,en},
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Soʻzlar orasiga chiziq qoʻy — yashiringan soʻzlarni ajrat", count: "Yashiringan soʻzlar", done: "Barakalla! 🎉", retry: "Bu yerda soʻz tugamaydi", next: "Yana" },
  ru: { instr: "Поставь черту между словами — раздели спрятанные слова", count: "Спрятанные слова", done: "Молодец! 🎉", retry: "Здесь слово не кончается", next: "Ещё" },
  en: { instr: "Tap the gaps to split the hidden words apart", count: "Hidden words", done: "Great! 🎉", retry: "A word doesn't end here", next: "Again" }
};
const DEMO = {
  words: ["assalom", "rahmat", "marhamat"]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}
/** Split a string into glyphs, merging the ʻ modifier into the previous letter. */
function toGlyphs(str) {
  const out = [];
  for (const ch of str) {
    if ((ch === "ʻ" || ch === "'" || ch === "’") && out.length) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

export default function HiddenWords({ words, text, clue, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!words || !words.length) words = DEMO.words;

  const { glyphs, bounds } = useMemo(() => {
    const glyphs = toGlyphs(text || words.join(""));
    const bounds = [];
    let k = 0;
    for (let i = 0; i < words.length - 1; i++) {
      k += toGlyphs(words[i]).length;
      bounds.push(k); // a boundary sits BEFORE glyph index k
    }
    return { glyphs, bounds: new Set(bounds) };
  }, [words, text]);

  const [placed, setPlaced] = useState(() => new Set());
  const [shake, setShake] = useState(null);
  const solved = placed.size >= bounds.size;
  const clueText = pickL(clue, lang);

  function tapGap(i) {
    if (solved || placed.has(i)) return;
    const ok = bounds.has(i);
    if (typeof onAttempt === "function") onAttempt(ok, { gap: i });
    if (ok) {
      const np = new Set(placed);
      np.add(i);
      setPlaced(np);
      if (np.size >= bounds.size && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(i);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {clueText && <div style={S.clue}>{clueText}</div>}
      <p style={S.instr}>{t.instr}</p>

      <div style={S.strip}>
        {glyphs.map((g, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span
                onClick={() => tapGap(i)}
                className={shake === i ? "hwShake" : ""}
                style={{ ...S.gap, ...(placed.has(i) ? S.gapOn : {}) }}
                aria-label="split here"
              >
                <span style={{ ...S.bar, ...(placed.has(i) ? S.barOn : {}) }} />
              </span>
            )}
            <span style={S.letter}>{g}</span>
          </React.Fragment>
        ))}
      </div>

      <div style={S.count}>{t.count}: {placed.size} / {bounds.size}</div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>{t.done} {words.join(" · ")}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes hwShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}.hwShake{animation:hwShake .44s}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  strip: { display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", rowGap: 8, background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 16, padding: "14px 10px" },
  letter: { fontSize: 22, fontWeight: 900, color: "#1f3a5f", padding: "2px 0" },
  gap: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 12, height: 30, cursor: "pointer" },
  gapOn: { width: 16 },
  bar: { width: 3, height: 20, borderRadius: 2, background: "#e3d9c2" },
  barOn: { background: "#46c06a", height: 30, width: 4 },
  count: { textAlign: "center", marginTop: 10, fontSize: 13.5, fontWeight: 800, color: "#7a6f57" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8, textAlign: "center" },
  ok: { fontSize: 15.5, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
