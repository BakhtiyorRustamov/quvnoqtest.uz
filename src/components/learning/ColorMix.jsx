"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * ColorMix — CLIL Art "What color is it?" (Ingliz tili). Two paint pots and a
 * mystery pot: the child taps the color that the two paints make when mixed.
 * Several rounds; each solved round pours the mixed color into the "?" pot.
 * The English color word can be spoken per round via a pre-seeded clip.
 *
 * Props: {
 *   rounds: [{ a: 'red', b: 'yellow', result: 'orange',
 *              options: ['orange','green','purple'],
 *              audio?: { key, text } }],
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 * onCorrect() fires after the LAST round (use completeOn:'finish' if >1 round —
 * the component reports one onAttempt per round).
 */
const PAINT = {
  red: { hex: "#e53935", uz: "qizil", ru: "красный", en: "red" },
  yellow: { hex: "#fdd835", uz: "sariq", ru: "жёлтый", en: "yellow" },
  blue: { hex: "#1e88e5", uz: "koʻk", ru: "синий", en: "blue" },
  green: { hex: "#43a047", uz: "yashil", ru: "зелёный", en: "green" },
  orange: { hex: "#fb8c00", uz: "toʻq sariq", ru: "оранжевый", en: "orange" },
  purple: { hex: "#8e24aa", uz: "binafsha", ru: "фиолетовый", en: "purple" },
  pink: { hex: "#ec407a", uz: "pushti", ru: "розовый", en: "pink" },
  white: { hex: "#f5f5f5", uz: "oq", ru: "белый", en: "white" },
  black: { hex: "#37474f", uz: "qora", ru: "чёрный", en: "black" },
};
const STR = {
  uz: { instr: "Ikki boʻyoq aralashsa qaysi rang chiqadi? Bos!", done: "Barakalla! Rassom boʻlding! 🎨", retry: "Boshqa rangni sina", round: "bosqich" },
  ru: { instr: "Какой цвет получится, если смешать краски? Нажми!", done: "Молодец! Настоящий художник! 🎨", retry: "Попробуй другой цвет", round: "раунд" },
  en: { instr: "Mix the two paints — what color do they make? Tap it!", done: "Great! A real artist! 🎨", retry: "Try another color", round: "round" },
};

function Pot({ color, unknown, big }) {
  const hex = color ? PAINT[color]?.hex : "#cfd8dc";
  const size = big ? 86 : 72;
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: unknown ? "repeating-conic-gradient(#eceff1 0 15deg, #cfd8dc 15deg 30deg)" : hex,
          border: "4px solid #fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          display: "grid",
          placeItems: "center",
          fontSize: 34,
          fontWeight: 900,
          color: "#78909c",
          transition: "background .4s ease",
        }}
        aria-hidden
      >
        {unknown ? "?" : ""}
      </div>
    </div>
  );
}

export default function ColorMix({ rounds = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [round, setRound] = useState(0);
  const [solved, setSolved] = useState(false); // current round solved (pot filled)
  const [allDone, setAllDone] = useState(false);
  const [shake, setShake] = useState(null);
  const cur = rounds[Math.min(round, rounds.length - 1)] || {};
  const elRef = useRef(null);

  // Play the answer clip, then call onDone AFTER it finishes so the round never
  // advances while the voice is still saying the colour. Falls back to a short
  // delay when the clip is missing or autoplay is blocked (stays silent — never
  // the robotic browser voice).
  const speak = useCallback((audio, onDone) => {
    elRef.current?.pause();
    let done = false;
    const finish = () => { if (done) return; done = true; if (typeof onDone === "function") onDone(); };
    if (!audio) { setTimeout(finish, 900); return; }
    try {
      const el = new Audio(`/audio/tts/en/${audio.key}.wav`);
      elRef.current = el;
      el.onended = finish;
      el.onerror = () => setTimeout(finish, 900);
      el.play().then(() => setTimeout(finish, 6000)).catch(() => setTimeout(finish, 900));
    } catch {
      setTimeout(finish, 900);
    }
  }, []);
  useEffect(() => () => elRef.current?.pause(), []);

  function tap(opt) {
    if (solved || allDone) return;
    const ok = opt === cur.result;
    if (typeof onAttempt === "function") onAttempt(ok, { round, chosen: opt });
    if (!ok) {
      setShake(opt);
      setTimeout(() => setShake(null), 460);
      return;
    }
    setSolved(true);
    // Advance only once the answer audio has finished playing.
    speak(cur.audio, () => {
      if (round + 1 < rounds.length) {
        setRound(round + 1);
        setSolved(false);
      } else {
        setAllDone(true);
        if (typeof onCorrect === "function") onCorrect();
      }
    });
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      {/* round dots */}
      {rounds.length > 1 && (
        <div style={S.dots} aria-label={`${t.round} ${round + 1}/${rounds.length}`}>
          {rounds.map((_, i) => (
            <span key={i} style={{ ...S.dot, background: i < round || allDone ? "#46c06a" : i === round ? "#f39a1f" : "rgba(0,0,0,0.15)" }} />
          ))}
        </div>
      )}

      <div style={S.eq} className="cmx-pop" key={round}>
        <Pot color={cur.a} />
        <span style={S.op} aria-hidden>+</span>
        <Pot color={cur.b} />
        <span style={S.op} aria-hidden>=</span>
        <Pot color={solved || allDone ? cur.result : null} unknown={!(solved || allDone)} big />
      </div>

      {solved || allDone ? (
        <p style={S.word}>
          {PAINT[cur.result]?.en} <span style={{ opacity: 0.55, fontSize: 15 }}>· {PAINT[cur.result]?.[lang === "en" ? "uz" : lang] || PAINT[cur.result]?.uz}</span>
        </p>
      ) : (
        <div style={S.opts}>
          {(cur.options || []).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => tap(opt)}
              className={shake === opt ? "cmx-shake" : ""}
              aria-label={PAINT[opt]?.en}
              style={{ ...S.swatch, background: PAINT[opt]?.hex }}
            >
              <span style={S.swatchLabel}>{PAINT[opt]?.en}</span>
            </button>
          ))}
        </div>
      )}

      {allDone && <p style={S.done}>{t.done}</p>}
    </div>
  );
}

const S = {
  wrap: { maxWidth: 520, margin: "12px auto 0", textAlign: "center", fontFamily: "inherit" },
  instr: { fontWeight: 800, fontSize: 15, color: "rgba(28,37,64,0.65)", margin: "0 0 8px" },
  dots: { display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: "50%", transition: "background .3s" },
  eq: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "10px 0 14px" },
  op: { fontSize: 30, fontWeight: 900, color: "#1c2540" },
  opts: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  swatch: {
    width: 84,
    height: 64,
    borderRadius: 16,
    border: "4px solid #fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    display: "grid",
    placeItems: "end center",
    paddingBottom: 4,
  },
  swatchLabel: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: 8,
    padding: "1px 8px",
    fontSize: 13,
    fontWeight: 900,
    color: "#1c2540",
  },
  word: { fontSize: 26, fontWeight: 900, color: "#1c2540", margin: "6px 0" },
  done: { marginTop: 8, fontWeight: 900, fontSize: 18, color: "#2e9e52" },
};

const CSS = `
.cmx-pop { animation: cmxPop .35s ease both; }
@keyframes cmxPop { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: none; } }
.cmx-shake { animation: cmxShake .4s ease; }
@keyframes cmxShake { 20% { transform: translateX(-5px);} 40% { transform: translateX(5px);} 60% { transform: translateX(-4px);} 80% { transform: translateX(3px);} }
`;
