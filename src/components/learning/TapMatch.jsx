"use client";
import React, { useMemo, useState } from "react";

/**
 * TapMatch — tap every tile that matches a rule (Ona tili, grades 1–2).
 * Shows a grid of word/letter tiles; the child taps the ones that satisfy the
 * lesson's rule (e.g. "tap the words that end with Q", "tap the vowels",
 * "tap the words spelled correctly"). A correct tap turns the tile green; a
 * wrong tap shakes it red. Solved when every matching tile is selected. This is
 * the multi-select "underline all that fit" interaction the phonics lessons use
 * (distinct from drag_buckets, which sorts into two bins).
 *
 * Props: { tiles: [{text, match}], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - tiles: each { text: string, match: true|false }. Tapping a match:true
 *            tile selects it; tapping match:false shakes (counts as a miss).
 */
const STR = {
  uz: { instr: "Mos keladiganlarini bos!", done: "Barakalla! Hammasini topding!", retry: "Bu mos emas", next: "Yana" },
  ru: { instr: "Нажми все подходящие!", done: "Молодец! Все найдены!", retry: "Это не подходит", next: "Ещё" },
  en: { instr: "Tap all that fit!", done: "Great! You found them all!", retry: "That one doesn't fit", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, id: i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function TapMatch({ tiles = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const shown = useMemo(() => shuffle(tiles), [tiles]);
  const need = tiles.filter((x) => x.match).length;
  const [picked, setPicked] = useState([]); // ids of correctly picked tiles
  const [shake, setShake] = useState(null);
  const solved = need > 0 && picked.length === need;

  function tap(tile) {
    if (solved || picked.includes(tile.id)) return;
    const ok = !!tile.match;
    if (typeof onAttempt === "function") onAttempt(ok, { text: tile.text });
    if (ok) {
      const np = [...picked, tile.id];
      setPicked(np);
      if (np.length === need && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(tile.id);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        {shown.map((tile) => {
          const on = picked.includes(tile.id);
          return (
            <button
              key={tile.id}
              onClick={() => tap(tile)}
              disabled={solved}
              className={shake === tile.id ? "tmShake" : ""}
              style={{ ...S.tile, ...(on ? S.on : {}), cursor: solved ? "default" : "pointer" }}
            >
              {on && <span style={S.check}>✓</span>}
              {tile.text}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes tmShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.tmShake{animation:tmShake .42s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  tile: { position: "relative", minWidth: 64, padding: "12px 16px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 19, fontWeight: 800, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  on: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 rgba(70,192,106,.25)" },
  check: { marginRight: 6, fontSize: 15, fontWeight: 900, color: "#46c06a" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
