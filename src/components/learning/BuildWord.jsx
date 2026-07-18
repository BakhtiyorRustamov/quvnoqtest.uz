"use client";
import React, { useMemo, useState } from "react";

/**
 * BuildWord — spell a word by tapping its letters in order. A picture (emoji) and
 * its meaning are shown as the clue; the child taps letter tiles left-to-right to
 * fill the slots ("o", "t", "a" → ota). A correct next-letter locks in, a wrong
 * tap shakes. This is the Alifbe reading bridge: once O, T, A, N are known, kids
 * build and read their first words. Optional distractor letters raise the challenge.
 *
 * Props: { word, emoji?, label?, extra?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - word: the target spelling in lower case, e.g. "ota".
 *   - extra: optional distractor letters added to the tray, e.g. ["m","i"].
 *   - onAttempt(ok) per tap; onCorrect() when the word is complete.
 */
const STR = {
  uz: { instr: "Harflarni tartib bilan bosib, soʻzni tuz!", done: "Barakalla! Soʻzni oʻqiding!", retry: "Bu harf hozircha emas", next: "Yana" },
  ru: { instr: "Нажимай буквы по порядку и составь слово!", done: "Молодец! Ты прочитал слово!", retry: "Пока не эта буква", next: "Ещё" },
  en: { instr: "Tap the letters in order to build the word!", done: "Great! You read the word!", retry: "Not that letter yet", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function BuildWord({ word = "", letters: lettersProp, emoji, label, extra = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const letters = Array.isArray(lettersProp) && lettersProp.length ? lettersProp : String(word).split("");
  const tiles = useMemo(
    () => shuffle([...letters, ...extra].map((ch, i) => ({ ch, id: `${ch}-${i}` }))),
    [word]
  );
  const [placed, setPlaced] = useState([]); // tile ids in tap order
  const [shakeId, setShakeId] = useState(null);
  const usedIds = new Set(placed);
  const nextChar = letters[placed.length];
  const solved = placed.length === letters.length && letters.length > 0;
  const spelled = placed.map((id) => tiles.find((x) => x.id === id)?.ch).join("");

  function tap(tile) {
    if (solved || usedIds.has(tile.id)) return;
    const ok = tile.ch === nextChar;
    if (typeof onAttempt === "function") onAttempt(ok, { ch: tile.ch, expected: nextChar });
    if (ok) {
      const np = [...placed, tile.id];
      setPlaced(np);
      if (np.length === letters.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShakeId(tile.id);
      setTimeout(() => setShakeId(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.clue}>
        {emoji && <span style={S.emoji} aria-hidden>{emoji}</span>}
        {label && <span style={S.label}>{L(label, lang)}</span>}
      </div>

      {/* slots */}
      <div style={S.slots}>
        {letters.map((_, i) => {
          const id = placed[i];
          const ch = id ? tiles.find((x) => x.id === id)?.ch : "";
          const isNext = i === placed.length && !solved;
          return (
            <div key={i} style={{ ...S.slot, ...(ch ? S.slotOn : {}), ...(isNext ? S.slotNext : {}) }}>
              {ch || ""}
            </div>
          );
        })}
      </div>

      {/* letter tray */}
      <div style={S.tray}>
        {tiles.map((tile) =>
          usedIds.has(tile.id) ? null : (
            <button key={tile.id} onClick={() => tap(tile)} className={shakeId === tile.id ? "bwShake" : ""} style={S.tile}>
              {tile.ch}
            </button>
          )
        )}
        {solved && <span style={{ fontSize: 26 }} aria-hidden>🎉</span>}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done} «{spelled}»</span> : shakeId != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes bwShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.bwShake{animation:bwShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  clue: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 12 },
  emoji: { fontSize: 52, lineHeight: 1 },
  label: { fontSize: 14, fontWeight: 800, color: "#6b7280" },
  slots: { display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 },
  slot: { width: 52, height: 60, borderRadius: 12, border: "3px dashed #f2c6b6", background: "#fff8f4", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 900, color: "#33302b" },
  slotOn: { border: "3px solid #46c06a", background: "#eefcf2" },
  slotNext: { borderColor: "#f4693b", boxShadow: "0 0 0 3px rgba(244,105,59,.18)" },
  tray: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, minHeight: 60 },
  tile: { minWidth: 52, height: 60, padding: "0 6px", borderRadius: 12, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 28, fontWeight: 900, color: "#33302b", boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
