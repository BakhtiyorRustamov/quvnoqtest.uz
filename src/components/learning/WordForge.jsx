"use client";
import React, { useMemo, useState } from "react";

/**
 * WordForge — "soʻzdagi harflardan foydalanib, yangi soʻzlar tuzing". A bank of
 * letters (e.g. from KUTUBXONA) sits at the top; the child taps letters to spell
 * a word, then checks it. Valid new words (from an accepted list) drop into the
 * "found" tray and count toward a goal; unknown or repeated words shake. A gentle
 * open-ended word-building game that self-completes when the goal is reached.
 *
 * Props: {
 *   letters: string[],   // the letter bank (each physical tile usable once per word)
 *   accept: string[],    // accepted words (case-insensitive)
 *   goal?: number,       // how many words to find (default 4, capped to accept.length)
 *   clue?: {uz,ru,en}, emoji?,
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Harflardan yangi soʻz tuzing", check: "Tekshir", back: "⌫", found: "Topilgan soʻzlar", goalLbl: "Maqsad", already: "Bu soʻz allaqachon bor", invalid: "Bunday soʻz chiqmadi", done: "Barakalla! 🎉", next: "Yana" },
  ru: { instr: "Составь новое слово из букв", check: "Проверить", back: "⌫", found: "Найденные слова", goalLbl: "Цель", already: "Это слово уже есть", invalid: "Такого слова не вышло", done: "Молодец! 🎉", next: "Ещё" },
  en: { instr: "Build a new word from the letters", check: "Check", back: "⌫", found: "Words found", goalLbl: "Goal", already: "Already found", invalid: "Not a valid word", done: "Great! 🎉", next: "Again" }
};
const DEMO = {
  letters: ["K", "U", "T", "U", "B", "X", "O", "N", "A"],
  accept: ["kon", "non", "nok", "kun", "tok", "tun", "ona", "xona", "ot", "un", "kut", "but"],
  goal: 4
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function WordForge({ letters, accept, goal, clue, emoji, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!letters || !accept) {
    letters = DEMO.letters;
    accept = DEMO.accept;
    goal = goal ?? DEMO.goal;
  }
  const bank = useMemo(() => letters.map((ch, i) => ({ ch, i })), [letters]);
  const acceptSet = useMemo(() => new Set(accept.map((w) => w.toLowerCase())), [accept]);
  const target = Math.min(goal ?? 4, acceptSet.size);

  const [picked, setPicked] = useState([]); // tile indices in current word
  const [found, setFound] = useState([]);
  const [note, setNote] = useState(null); // {kind:'ok'|'bad', msg}
  const scored = React.useRef(false);
  const solved = found.length >= target;

  const word = picked.map((i) => letters[i]).join("");

  function tapTile(i) {
    if (solved || picked.includes(i)) return;
    setPicked([...picked, i]);
    setNote(null);
  }
  function back() {
    setPicked(picked.slice(0, -1));
    setNote(null);
  }
  function check() {
    if (solved || picked.length === 0) return;
    const w = word.toLowerCase();
    if (found.includes(w)) {
      setNote({ kind: "bad", msg: t.already });
    } else if (acceptSet.has(w)) {
      const nf = [...found, w];
      setFound(nf);
      setPicked([]);
      setNote({ kind: "ok", msg: "✓ " + word });
      if (!scored.current) {
        scored.current = true;
        if (typeof onAttempt === "function") onAttempt(true, { word: w });
      }
      if (nf.length >= target && typeof onCorrect === "function") onCorrect();
    } else {
      setNote({ kind: "bad", msg: t.invalid });
      setTimeout(() => setNote(null), 1100);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(pickL(clue, lang) || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 24 }}>{emoji}</span>}
          {pickL(clue, lang) && <span>{pickL(clue, lang)}</span>}
        </div>
      )}
      <p style={S.instr}>{t.instr}</p>

      {/* letter bank */}
      <div style={S.bank}>
        {bank.map(({ ch, i }) => {
          const used = picked.includes(i);
          return (
            <button key={i} onClick={() => tapTile(i)} disabled={used || solved} style={{ ...S.letter, ...(used ? S.letterUsed : {}) }}>
              {ch}
            </button>
          );
        })}
      </div>

      {/* current word + controls */}
      <div style={S.builder}>
        <div style={S.slot}>{word || <span style={{ color: "#c3bca6" }}>…</span>}</div>
        <button onClick={back} disabled={!picked.length || solved} style={S.ctrl}>{t.back}</button>
        <button onClick={check} disabled={!picked.length || solved} style={S.checkBtn}>{t.check}</button>
      </div>

      <div style={S.noteRow} aria-live="polite">
        {note ? <span style={note.kind === "ok" ? S.noteOk : S.noteBad}>{note.msg}</span> : <span>&nbsp;</span>}
      </div>

      {/* found tray + goal */}
      <div style={S.foundHead}>
        <span>📚 {t.found}</span>
        <span style={S.goal}>{t.goalLbl}: {found.length}/{target}</span>
      </div>
      <div style={S.tray}>
        {found.length ? found.map((w, k) => <span key={k} style={S.chip}>{w}</span>) : <span style={{ color: "#c3bca6", fontWeight: 700 }}>…</span>}
      </div>

      <div style={S.status} aria-live="polite">{solved ? <span style={S.ok}>{t.done}</span> : <span>&nbsp;</span>}</div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes wfPop{from{transform:scale(.8);opacity:0}to{transform:none;opacity:1}}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  bank: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  letter: { width: 44, height: 48, borderRadius: 12, border: "2px solid #cfe0ff", background: "#f4f8ff", color: "#2f6fed", fontFamily: "inherit", fontSize: 22, fontWeight: 900, cursor: "pointer", boxShadow: "0 4px 0 rgba(47,111,237,.15)" },
  letterUsed: { opacity: 0.35, cursor: "default", boxShadow: "none" },
  builder: { display: "flex", alignItems: "center", gap: 10, marginTop: 14 },
  slot: { flex: 1, minHeight: 46, borderRadius: 12, border: "2px dashed #ecdcb8", background: "#fffdf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, letterSpacing: "0.08em", color: "#1f3a5f" },
  ctrl: { width: 48, height: 46, borderRadius: 12, border: "2px solid #ece1c8", background: "#fff", fontSize: 18, fontWeight: 800, color: "#7a6f57", cursor: "pointer" },
  checkBtn: { height: 46, padding: "0 18px", borderRadius: 12, border: "none", background: "#2f9e54", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 0 #237a41" },
  noteRow: { minHeight: 22, textAlign: "center", marginTop: 8 },
  noteOk: { color: "#2f9e54", fontWeight: 800, fontSize: 15 },
  noteBad: { color: "#e8553e", fontWeight: 700, fontSize: 14 },
  foundHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 13.5, fontWeight: 800, color: "#7a6f57" },
  goal: { color: "#5a2d82" },
  tray: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6, minHeight: 34, padding: "6px", borderRadius: 12, background: "#faf6ec", border: "1px solid #ecdcb8" },
  chip: { background: "#eefcf2", border: "2px solid #46c06a", color: "#2f9e54", borderRadius: 999, padding: "4px 12px", fontWeight: 800, fontSize: 15, animation: "wfPop .2s ease" },
  status: { minHeight: 24, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
