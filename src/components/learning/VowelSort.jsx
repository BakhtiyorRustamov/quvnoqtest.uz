"use client";
import React, { useMemo, useState } from "react";

/**
 * VowelSort — a two-basket tap-sorter for letters (or short words). Tap a tile,
 * then tap the basket it belongs to. Built for the Alifbe review lessons: sort
 * letters into "Unli" (vowel) and "Undosh" (consonant), the primer's founding
 * distinction, revisited now that every letter is known. Generic two-way labels
 * mean it also fits "tutuq bor / tutuq yoʻq" and similar sorts.
 *
 * Props: { leftLabel, rightLabel, items, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - leftLabel / rightLabel: L10n basket captions (e.g. Unli / Undosh).
 *   - items: [{ text, side: 'left'|'right' }] — the tiles and their correct bin.
 *   - onAttempt(ok) per placement; onCorrect() when every tile is sorted right.
 */
const STR = {
  uz: { instr: "Katakni bos, soʻng mos savatga joyla!", done: "Barakalla! Hammasi joyida!", retry: "Notoʻgʻri savat — yana urin", next: "Yana" },
  ru: { instr: "Нажми плитку, затем нужную корзину!", done: "Молодец! Всё разложено верно!", retry: "Не та корзина — ещё раз", next: "Ещё" },
  en: { instr: "Tap a tile, then its basket!", done: "Great! All sorted!", retry: "Wrong basket — try again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: i }));
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}

export default function VowelSort({ leftLabel, rightLabel, items = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const tiles = useMemo(() => shuffle(items), [items]);
  const [placed, setPlaced] = useState({});   // _id -> 'left' | 'right'
  const [sel, setSel] = useState(null);
  const [shake, setShake] = useState(false);
  const total = items.length;
  const doneCount = Object.keys(placed).length;
  const won = total > 0 && doneCount === total;

  function pickTile(id) { if (won || placed[id] != null) return; setSel(id); setShake(false); }
  function drop(side) {
    if (won || sel == null) return;
    const tile = tiles.find((x) => x._id === sel);
    const ok = tile && tile.side === side;
    if (typeof onAttempt === "function") onAttempt(!!ok, { id: sel, side });
    if (ok) {
      const np = { ...placed, [sel]: side };
      setPlaced(np); setSel(null);
      if (Object.keys(np).length === total && typeof onCorrect === "function") onCorrect();
    } else { setShake(true); setSel(null); setTimeout(() => setShake(false), 460); }
  }

  const pool = tiles.filter((x) => placed[x._id] == null);
  const basket = (side, label, tint) => (
    <button onClick={() => drop(side)} disabled={won}
      className={shake && sel == null ? "vsShake" : ""}
      style={{ ...S.basket, borderColor: tint, background: tint + "14" }}>
      <span style={{ ...S.basketCap, color: tint }}>{L(label, lang)}</span>
      <span style={S.basketRow}>
        {tiles.filter((x) => placed[x._id] === side).map((x) => (
          <span key={x._id} style={{ ...S.chip, borderColor: tint }}>{x.text}</span>
        ))}
      </span>
    </button>
  );

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.pool}>
        {pool.length === 0 ? <span style={S.poolEmpty}>—</span> : pool.map((x) => (
          <button key={x._id} onClick={() => pickTile(x._id)}
            style={{ ...S.tile, ...(sel === x._id ? S.tileSel : {}) }}>{x.text}</button>
        ))}
      </div>
      <div style={S.baskets}>
        {basket("left", leftLabel, "#e8553e")}
        {basket("right", rightLabel, "#2f9fe0")}
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : shake ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes vsShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.vsShake{animation:vsShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  pool: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, minHeight: 60, marginBottom: 14 },
  poolEmpty: { color: "#c9c9c9", fontSize: 22, fontWeight: 900 },
  tile: { minWidth: 50, height: 54, padding: "0 10px", borderRadius: 12, border: "3px solid #d9e6c4", background: "#fff", fontFamily: "inherit", fontSize: 24, fontWeight: 900, color: "#33302b", cursor: "pointer", boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  tileSel: { borderColor: "#f4a11f", boxShadow: "0 0 0 3px rgba(244,161,31,.3), 0 4px 0 rgba(244,161,31,.25)", transform: "translateY(-2px)" },
  baskets: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  basket: { minHeight: 96, borderRadius: 16, border: "3px solid", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 6px", fontFamily: "inherit" },
  basketCap: { fontSize: 16, fontWeight: 900, marginBottom: 6 },
  basketRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 5 },
  chip: { minWidth: 34, height: 38, padding: "0 6px", borderRadius: 9, border: "2px solid", background: "#fff", display: "grid", placeItems: "center", fontSize: 19, fontWeight: 900, color: "#33302b" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
