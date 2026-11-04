import type { L10n } from '@/lib/i18n-config';
import type { G11Question } from '../diagnostic';
import { adjacentAngles, regularPolygon, isoMedian, rightTriangle, arcTriangle, trapezoid, chord, segmentPlane, vectors, cone, cylinder, sphere, box, rhombus, axesTriangle, pyramid, riverPlot, parabolaGraph, areaGraph } from './svg';

/**
 * Matematika — Milliy sertifikat formatidagi test generatori (2026 spetsifikatsiyasi):
 * 45 topshiriq, 150 daqiqa. 1–32 yopiq (4 variant), 33–35 moslashtirish (umumiy shart, A–F),
 * 36–45 ochiq (a va b qismlar). Har safar sonlar va topshiriq turlari tasodifiy tanlanadi —
 * har bir urinish yangi variant. Har bir javob kodda hisoblanadi.
 */

export const MATH_EXAM_MINUTES = 150;

/* ------------------------------- helpers -------------------------------- */
const R = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const MINUS = '−';
/** " + a" / " − a" / "" */
const pm = (a: number) => (a === 0 ? '' : a < 0 ? ` − ${-a}` : ` + ${a}`);
/** x − a with the sign tidied: x − 3, x + 2, x */
const xm = (a: number) => (a === 0 ? 'x' : a < 0 ? `x + ${-a}` : `x − ${a}`);
/** number → text: decimal comma, real minus sign */
export function num(x: number): string {
  const r = Math.round(x * 10000) / 10000;
  const s = String(Math.abs(r)).replace('.', ',');
  return (r < 0 ? MINUS : '') + s;
}
/** reduced fraction text (integer when possible) */
function fr(n: number, d: number): string {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  return d === 1 ? num(n) : `${n < 0 ? MINUS : ''}${Math.abs(n)}/${d}`;
}
/** √n simplified: "k√m", "√m" or an integer */
function sq(n: number): string {
  let k = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) {
    m /= f * f;
    k *= f;
  }
  if (m === 1) return String(k);
  return `${k === 1 ? '' : k}√${m}`;
}
/** a·x^p term list → polynomial text, e.g. [[2,2],[-3,1],[1,0]] → 2x² − 3x + 1 */
const SUP: Record<number, string> = { 2: '²', 3: '³', 4: '⁴' };
function poly(terms: [number, number][], v = 'x'): string {
  let out = '';
  for (const [c, p] of terms) {
    if (!c) continue;
    const abs = Math.abs(c);
    const body = p === 0 ? String(abs) : `${abs === 1 ? '' : abs}${v}${p === 1 ? '' : SUP[p] ?? `^${p}`}`;
    out += out ? (c < 0 ? ` ${MINUS} ` : ' + ') + body : (c < 0 ? MINUS : '') + body;
  }
  return out || '0';
}

type Q = {
  text: string;
  choices?: string[];
  answer?: number;
  parts?: [string, string][]; // [prompt, answer]
  explain: string;
  lesson?: number;
  match?: boolean;
  /** SVG drawing shown under the text */
  fig?: string;
};
/** figure for the question being generated (set by a template, attached by tryGen) */
let FIG: string | undefined;

/** 4-option question: correct answer + wrong ones (deduplicated, shuffled). */
function mc(text: string, correct: string, wrong: string[], explain: string, lesson = 0): Q {
  const w = Array.from(new Set(wrong.filter((x) => x !== correct)));
  if (w.length < 3) throw new Error('few distractors');
  const choices = shuffle([correct, ...shuffle(w).slice(0, 3)]);
  return { text, choices, answer: choices.indexOf(correct), explain, lesson };
}
/** numeric distractors around a value */
function near(x: number, f: (v: number) => string = num): string[] {
  return [x + 1, x - 1, x + 2, x * 2, x - 2, x + 3].filter((v) => v !== x).map(f);
}
const open = (text: string, a: [string, string | number], b: [string, string | number], explain: string, lesson = 0): Q => ({
  text,
  parts: [
    [a[0], typeof a[1] === 'number' ? num(a[1]) : a[1]],
    [b[0], typeof b[1] === 'number' ? num(b[1]) : b[1]]
  ],
  explain,
  lesson
});
const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [6, 8, 10],
  [9, 12, 15],
  [20, 21, 29]
];

/* ----------------------- 1–2. Sonlar va amallar ------------------------ */
const T_numbers1 = [
  () => {
    const P = pick([24, 30, 36, 40, 42, 48, 60]);
    const k = R(2, 3);
    const c = R(1, 3);
    let best = Infinity;
    for (let a = 1; a <= P; a++) if (P % a === 0) best = Math.min(best, a + k * (P / a) - c);
    return mc(
      `a va b natural sonlar uchun a · b = ${P} boʻlsa, a + ${k}b − ${c} ifodaning eng kichik qiymatini toping.`,
      num(best),
      near(best).concat([num(P + k - c), num(1 + k * P - c)]),
      `P = ${P} ning boʻluvchilari juftlarini tekshiramiz: a + ${k}b eng kichik boʻlishi uchun a va ${k}b bir-biriga yaqin boʻlishi kerak. Eng kichik qiymat ${best}.`
    );
  },
  () => {
    const a = pick([12, 18, 24, 30, 36]);
    const b = pick([16, 20, 27, 40, 45]);
    const g = gcd(a, b);
    const l = (a * b) / g;
    return mc(
      `${a} va ${b} sonlarining EKUK va EKUB lari yigʻindisini toping.`,
      num(l + g),
      [num(l), num(a * b + g), num(l - g), num(l + 2 * g), num(a + b)],
      `EKUB(${a}; ${b}) = ${g}, EKUK = ${a}·${b}/${g} = ${l}. Yigʻindi ${l + g}.`
    );
  }
];
const T_numbers2 = [
  () => {
    const p = pick([80000, 120000, 200000, 250000, 400000]);
    const x = pick([10, 20, 25]);
    const y = pick([10, 15, 20]);
    const res = (p * (100 - x) * (100 - y)) / 10000;
    return mc(
      `Mahsulot narxi ${num(p)} soʻm edi. Avval narx ${x}% ga, keyin yana ${y}% ga arzonlashdi. Mahsulotning hozirgi narxini (soʻm) toping.`,
      num(res),
      [num((p * (100 - x - y)) / 100), num(p * (1 - x / 100)), num(res + p / 100), num((p * (100 + x) * (100 - y)) / 10000)],
      `Har bir arzonlashuv avvalgi narxdan hisoblanadi: ${p} · ${(100 - x) / 100} · ${(100 - y) / 100} = ${res}.`
    );
  },
  () => {
    const [a, b] = pick([[2, 4], [3, 4], [2, 3], [3, 5]] as const);
    const [c, d] = pick([[4, 6], [5, 6], [4, 5], [5, 8]] as const);
    const pct = ((a * b) / (c * d)) * 100;
    if (!Number.isInteger(pct * 10)) throw new Error('ugly');
    return mc(
      `Xonaga eni ${a} m va boʻyi ${b} m boʻlgan gilam toʻshalgan. Xonaning eni ${c} m va boʻyi ${d} m boʻlsa, xona yuzining necha foizini gilam egallagan?`,
      num(pct),
      near(Math.round(pct), num).concat([num(100 - pct), num(pct + 5)]),
      `Gilam yuzi ${a * b} m², xona yuzi ${c * d} m². ${a * b}/${c * d} · 100% = ${num(pct)}%.`
    );
  },
  () => {
    const t = R(2, 6) * 10;
    const m = pick([2, 3]);
    const k = pick([2, 4, 5]);
    const second = t * m;
    if (second % k) throw new Error('nonint');
    const first = second / k;
    const total = first + second + t;
    return mc(
      `Doʻkon 3 kunda jami ${total} kg olma sotdi. Ikkinchi kun uchinchi kundagidan ${m} marta koʻp, birinchi kun esa ikkinchi kundagidan ${k} marta kam sotilgan. Birinchi kun necha kg olma sotilgan?`,
      num(first),
      [num(second), num(t), num(first + 10), num(first * 2)],
      `Uchinchi kun x kg boʻlsin: ikkinchi kun ${m}x, birinchi kun ${m}x/${k}. Tenglama: x + ${m}x + ${m}x/${k} = ${total} ⇒ x = ${t}. Birinchi kun ${first} kg.`
    );
  }
];

/* --------------------- 3–13. Algebraik almashtirishlar --------------------- */
const T_alg: (() => Q)[][] = [
  [
    () => {
      const k = R(2, 9);
      const a = R(2, 7);
      const b = R(1, 9);
      return mc(
        `Agar x − y = ${k} boʻlsa, ${a}x + ${b} − ${a}y ifodaning qiymatini toping.`,
        num(a * k + b),
        [num(a * k - b), num(a + k + b), num(a * k), num(a * (k + b))],
        `${a}x − ${a}y = ${a}(x − y) = ${a * k}. Demak, ${a * k} + ${b} = ${a * k + b}.`
      );
    },
    () => {
      const k = R(2, 8);
      const m = R(2, 6);
      return mc(
        `x − y = ${k} boʻlsa, x² − 2xy + y² + ${m}(x − y) ning qiymatini toping.`,
        num(k * k + m * k),
        [num(k * k - m * k), num(k * k + m), num(2 * k + m * k), num(k * k)],
        `x² − 2xy + y² = (x − y)² = ${k * k}. ${k * k} + ${m}·${k} = ${k * k + m * k}.`
      );
    }
  ],
  [
    () => {
      const a = R(3, 9);
      const c = R(1, a - 1);
      const b = a * a - c * c;
      if (Number.isInteger(Math.sqrt(b))) throw new Error('square');
      return mc(
        `Ifodaning qiymatini toping: (√(${a} − √${b}) + √(${a} + √${b}))²`,
        num(2 * a + 2 * c),
        [num(2 * a), num(2 * a - 2 * c), num(a + c), num(2 * a + c)],
        `Kvadratga koʻtaramiz: (${a} − √${b}) + (${a} + √${b}) + 2√(${a}² − ${b}) = ${2 * a} + 2√${c * c} = ${2 * a + 2 * c}.`
      );
    },
    () => {
      let b = R(5, 60);
      while (Number.isInteger(Math.sqrt(b))) b++;
      const a = Math.floor(Math.sqrt(b));
      const c = a + R(1, 3);
      return mc(
        `Hisoblang: √((${a} − √${b})²) + √((√${b} − ${c})²)`,
        num(c - a),
        [`2√${b} − ${a + c}`, `${a + c} − 2√${b}`, num(a + c), num(c - a + 1)],
        `√(t²) = |t|. ${a} < √${b} < ${c} boʻlgani uchun: (√${b} − ${a}) + (${c} − √${b}) = ${c - a}.`
      );
    }
  ],
  [
    () => {
      // order three numbers by their squares
      const items: [string, number][] = shuffle([
        [String(R(5, 7)), 0],
        [`${R(2, 4)}√${pick([2, 3, 5])}`, 0],
        [`${R(2, 3)}√${pick([6, 7, 10, 11])}`, 0]
      ]).map(([s]) => {
        const m = String(s).match(/^(\d+)√(\d+)$/);
        return [s, m ? Number(m[1]) ** 2 * Number(m[2]) : Number(s) ** 2] as [string, number];
      });
      const sq2 = items.map((x) => x[1]);
      if (new Set(sq2).size < 3) throw new Error('tie');
      const names = ['a', 'b', 'c'];
      const order = [0, 1, 2].sort((i, j) => sq2[i] - sq2[j]).map((i) => names[i]).join(' < ');
      const perms = ['a < b < c', 'a < c < b', 'b < a < c', 'b < c < a', 'c < a < b', 'c < b < a'];
      return mc(
        `Sonlarni oʻsish tartibida joylashtiring: a = ${items[0][0]}, b = ${items[1][0]}, c = ${items[2][0]}`,
        order,
        perms,
        `Kvadratlarini solishtiramiz: a² = ${sq2[0]}, b² = ${sq2[1]}, c² = ${sq2[2]}. Demak, ${order}.`
      );
    }
  ],
  [
    () => {
      const q = pick([2, 3, 5, 6, 7]);
      const p = q + R(2, 8);
      const A = p - q - 1;
      return mc(
        `Soddalashtiring: (√${p} + 1 − √${q})(√${p} + √${q} − 1)`,
        `${num(A)} + 2√${q}`,
        [`${num(A)} − 2√${q}`, `${num(A + 2)} + 2√${q}`, `${num(p + q - 1)} − 2√${q}`, `${num(A)} + √${q}`],
        `(√${p} + (1 − √${q}))(√${p} − (1 − √${q})) = ${p} − (1 − √${q})² = ${p} − (${q + 1} − 2√${q}) = ${A} + 2√${q}.`
      );
    }
  ],
  [
    () => {
      const a1 = R(-5, 8);
      const d = R(1, 4);
      const i = R(3, 9);
      const j = i + R(5, 12);
      const a = (n: number) => a1 + (n - 1) * d;
      const S1 = a(i) + a(i + 2);
      const S2 = a(j) + a(j + 2);
      return mc(
        `{aₙ} arifmetik progressiyada a${i} + a${i + 2} = ${S1} va a${j} + a${j + 2} = ${S2} boʻlsa, a${i + 1} + a${j + 1} ni toping.`,
        num((S1 + S2) / 2),
        [num(S1 + S2), num(S2 - S1), num((S1 + S2) / 2 + d), num(S1)],
        `aₖ + aₖ₊₂ = 2aₖ₊₁ boʻlgani uchun a${i + 1} = ${S1 / 2}, a${j + 1} = ${S2 / 2}. Yigʻindi ${(S1 + S2) / 2}.`
      );
    },
    () => {
      const a1 = R(1, 9);
      const d = R(2, 5);
      const n = pick([10, 12, 15, 20]);
      const S = (n * (2 * a1 + (n - 1) * d)) / 2;
      return mc(
        `Arifmetik progressiyada a₁ = ${a1}, d = ${d}. Dastlabki ${n} ta had yigʻindisini toping.`,
        num(S),
        [num(S + n * d), num(n * (a1 + n * d)), num(S - d * n), num(a1 + (n - 1) * d)],
        `Sₙ = (2a₁ + (n − 1)d)·n/2 = (${2 * a1} + ${(n - 1) * d})·${n}/2 = ${S}.`
      );
    }
  ],
  [
    () => {
      const b1 = R(1, 5);
      const q = pick([2, 3, -2]);
      const b2 = b1 * q;
      const b5 = b1 * q ** 4;
      return mc(
        `{bₙ} geometrik progressiyada b₂ = ${num(b2)} va b₅ = ${num(b5)} boʻlsa, b₁ ni toping.`,
        num(b1),
        [num(b1 * 2), num(-b1), num(b2 * q), num(b1 + q)],
        `b₅/b₂ = q³ = ${num(q ** 3)} ⇒ q = ${num(q)}. b₁ = b₂/q = ${num(b1)}.`
      );
    },
    () => {
      const b1 = R(1, 4);
      const q = pick([2, 3]);
      const n = pick([4, 5]);
      const S = (b1 * (q ** n - 1)) / (q - 1);
      return mc(
        `Geometrik progressiyada b₁ = ${b1}, q = ${q}. Dastlabki ${n} ta had yigʻindisini toping.`,
        num(S),
        [num(b1 * q ** n), num(b1 * q ** (n - 1)), num(S + b1), num(S - b1 * q)],
        `Sₙ = b₁(qⁿ − 1)/(q − 1) = ${b1}·(${q ** n} − 1)/${q - 1} = ${S}.`
      );
    }
  ],
  [
    () => {
      const p = pick([2, 3, 5]);
      const m = R(2, 4);
      const B = pick([3, 7, 11, 13].filter((x) => x !== p));
      return mc(
        `Hisoblang: log${p === 2 ? '₂' : p === 3 ? '₃' : '₅'} ${B * p ** m} − log${p === 2 ? '₂' : p === 3 ? '₃' : '₅'} ${B}`,
        num(m),
        [num(m + 1), num(m - 1), num(B), num(p * m)],
        `logₐx − logₐy = logₐ(x/y) = log ${p ** m} = ${m}, chunki ${p}^${m} = ${p ** m}.`
      );
    },
    () => {
      const p = pick([2, 3]);
      const b = R(3, 9);
      const m = R(1, 3);
      return mc(
        `Hisoblang: ${p}^(log${p === 2 ? '₂' : '₃'} ${b} + ${m})`,
        num(b * p ** m),
        [num(b + p ** m), num(b * m), num(b ** m), num(b * p ** m + p)],
        `aᵘ⁺ᵛ = aᵘ·aᵛ: ${p}^(log ${b}) · ${p}^${m} = ${b}·${p ** m} = ${b * p ** m}.`
      );
    },
    () => {
      const [x, y] = pick([[4, 25], [2, 50], [8, 125], [20, 5]] as const);
      return mc(`Hisoblang: lg ${x} + lg ${y}`, num(Math.round(Math.log10(x * y))), ['1', '3', '4', '2', '5'], `lg a + lg b = lg(ab) = lg ${x * y} = ${Math.round(Math.log10(x * y))}.`);
    }
  ],
  [
    () => {
      const k = R(2, 7);
      return mc(
        `Agar 2ˣ = ${k} boʻlsa, 4ˣ + 2ˣ⁺¹ ning qiymatini toping.`,
        num(k * k + 2 * k),
        [num(k * k + k), num(2 * k + 2 * k), num(k * k + 2), num(2 * k * k)],
        `4ˣ = (2ˣ)² = ${k * k}, 2ˣ⁺¹ = 2·2ˣ = ${2 * k}. Yigʻindi ${k * k + 2 * k}.`
      );
    },
    () => {
      const a = pick([2, 3, -2, -3]);
      const m = R(4, 7);
      const n = R(2, 4);
      const k = m + n - R(1, 3);
      const e = m + n - k;
      return mc(
        `a = ${num(a)} boʻlsa, (a^${m} · a^${n}) : a^${k} ifodaning qiymatini toping.`,
        num(a ** e),
        [num(-(a ** e)), num(a ** (e + 1)), num(a * e), num(a ** (m * n - k))].filter((s) => s !== num(a ** e)),
        `Darajalar xossasi: a^(${m}+${n}−${k}) = a^${e} = ${num(a ** e)}.`
      );
    }
  ],
  [
    () => {
      const items = [
        { e: '(cos 3α + cos α)/(sin 3α − sin α)', a: 'ctg α', w: ['tg α', '2 ctg α', '2 tg α', 'ctg 2α'], s: 'Yigʻindini koʻpaytmaga keltiramiz: 2cos 2α cos α / (2cos 2α sin α) = ctg α.' },
        { e: '(sin 3α + sin α)/(cos 3α + cos α)', a: 'tg 2α', w: ['ctg 2α', 'tg α', '2 tg α', 'ctg α'], s: '2sin 2α cos α / (2cos 2α cos α) = tg 2α.' },
        { e: '(1 − cos 2α)/sin 2α', a: 'tg α', w: ['ctg α', '2 tg α', 'sin α', 'cos 2α'], s: '1 − cos 2α = 2sin²α, sin 2α = 2sin α cos α ⇒ tg α.' },
        { e: '(sin α + sin 3α)/(2 sin 2α)', a: 'cos α', w: ['sin α', 'cos 2α', '2 cos α', 'tg α'], s: 'sin α + sin 3α = 2sin 2α cos α ⇒ cos α.' },
        { e: 'sin⁴α − cos⁴α + cos 2α', a: '0', w: ['1', '2 cos 2α', '−2 cos 2α', 'sin 2α'], s: 'sin⁴α − cos⁴α = (sin²α − cos²α)·1 = −cos 2α ⇒ yigʻindi 0.' }
      ];
      const it = pick(items);
      return mc(`Soddalashtiring: ${it.e}`, it.a, it.w, it.s);
    },
    () => {
      const tab = [
        { e: '2 sin 15° cos 15°', a: '1/2' },
        { e: 'cos² 15° − sin² 15°', a: '√3/2' },
        { e: '2 sin 22,5° cos 22,5°', a: '√2/2' },
        { e: 'sin 75° cos 15° + cos 75° sin 15°', a: '1' },
        { e: 'cos 75° cos 15° − sin 75° sin 15°', a: '0' },
        { e: 'sin 50° cos 10° − cos 50° sin 10°', a: '√3/2' },
        { e: '2 cos² 22,5° − 1', a: '√2/2' }
      ];
      const it = pick(tab);
      return mc(`Hisoblang: ${it.e}`, it.a, ['1/2', '√3/2', '√2/2', '1', '0', '√3/3'], `Ikki burchak yigʻindisi / ikkilangan burchak formulasidan foydalanamiz: natija ${it.a}.`);
    }
  ],
  [
    () => {
      const [a, b, c] = pick(TRIPLES.slice(0, 4));
      const s = `${a}/${c}`;
      const ask = pick(['cos', 'tg', 'sin2']);
      const cosv = fr(-b, c);
      const tgv = fr(-a, b);
      const sin2 = fr(-2 * a * b, c * c);
      const ans = ask === 'cos' ? cosv : ask === 'tg' ? tgv : sin2;
      const label = ask === 'cos' ? 'cos α' : ask === 'tg' ? 'tg α' : 'sin 2α';
      return mc(
        `sin α = ${s} va π/2 < α < π boʻlsa, ${label} ni toping.`,
        ans,
        [fr(b, c), fr(a, b), fr(2 * a * b, c * c), fr(-b, a), fr(-a, c), cosv, tgv, sin2],
        `α II chorakda: cos α < 0. cos α = −√(1 − ${a * a}/${c * c}) = ${cosv}, tg α = ${tgv}, sin 2α = 2 sin α cos α = ${sin2}.`
      );
    }
  ],
  [
    () => {
      for (;;) {
        const a = pick([1, 2, 3]);
        const b = R(-9, 9);
        const c = pick([-6, -5, -4, -3, -2, 2, 3, 4]);
        if (b * b - 4 * a * c <= 0 || b === 0) continue;
        const ask = pick(['inv', 'sq']);
        if (ask === 'inv')
          return mc(
            `${poly([[a, 2], [b, 1], [c, 0]])} = 0 tenglamaning ildizlari x₁ va x₂ boʻlsa, 1/x₁ + 1/x₂ ni hisoblang.`,
            fr(-b, c),
            [fr(b, c), fr(-c, b), fr(c, b), fr(-b, a), fr(c, a)],
            `Viyet: x₁ + x₂ = ${fr(-b, a)}, x₁x₂ = ${fr(c, a)}. 1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂) = ${fr(-b, c)}.`
          );
        const s2n = b * b - 2 * a * c;
        return mc(
          `${poly([[a, 2], [b, 1], [c, 0]])} = 0 tenglamaning ildizlari x₁ va x₂ boʻlsa, x₁² + x₂² ni hisoblang.`,
          fr(s2n, a * a),
          [fr(b * b + 2 * a * c, a * a), fr(b * b, a * a), fr(s2n, a), fr(-s2n, a * a)],
          `x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = ${fr(b * b, a * a)} − ${fr(2 * c, a)} = ${fr(s2n, a * a)}.`
        );
      }
    },
    () => {
      const k = pick([2, 3, 4, 5]);
      const A = pick([-4, -2, 2, 4, 6, 7].filter((x) => x !== k && x !== 0 && x !== -k));
      return mc(
        `a = ${num(A)} boʻlsa, (a² − ${k * k})/(a² + ${k}a) ning qiymatini toping.`,
        fr(A - k, A),
        [fr(A + k, A), fr(A - k, k), fr(k, A), fr(A, A - k)],
        `(a − ${k})(a + ${k}) / (a(a + ${k})) = (a − ${k})/a = ${fr(A - k, A)}.`
      );
    }
  ]
];

/* ------------------ 14–19. Tenglama va tengsizliklar ------------------ */
const T_eq: (() => Q)[][] = [
  [
    () => {
      const p = R(0, 2);
      let q = R(1, 3);
      if (q === p) q++;
      const A = 3 ** p + 3 ** q;
      const B = 3 ** (p + q);
      return mc(
        `9ˣ − ${A}·3ˣ + ${B} = 0 tenglamaning ildizlari yigʻindisini toping.`,
        num(p + q),
        [num(A), num(p * q), num(p + q + 1), num(B), num(q - p)],
        `3ˣ = t: t² − ${A}t + ${B} = 0 ⇒ t = ${3 ** p} yoki ${3 ** q} ⇒ x = ${p} yoki ${q}. Yigʻindi ${p + q}.`
      );
    }
  ],
  [
    () => {
      const s = R(0, 2);
      let t = R(1, 3);
      if (t === s) t++;
      const r = R(3, 12);
      const a = r - 2 ** s;
      const b = r - 2 ** t;
      const k = s + t;
      return mc(
        `log₂(${xm(a)}) + log₂(${xm(b)}) = ${k} tenglamani yeching.`,
        num(r),
        [num(a + b - r), `${num(r)} va ${num(a + b - r)}`, num(r + 1), num(2 ** k)],
        `(x − ${a})(x − ${b}) = ${2 ** k}: ildizlar ${r} va ${a + b - r}. Aniqlanish sohasi x > ${Math.max(a, b)} boʻlgani uchun faqat x = ${r}.`
      );
    }
  ],
  [
    () => {
      const p = R(1, 4);
      let q = R(2, 5);
      if (q === p) q++;
      return mc(
        `x⁴ − ${p * p + q * q}x² + ${p * p * q * q} = 0 tenglamaning musbat ildizlari yigʻindisini toping.`,
        num(p + q),
        [num(p * p + q * q), num(p * q), num(0), num(2 * (p + q))],
        `x² = t: t² − ${p * p + q * q}t + ${p * p * q * q} = 0 ⇒ t = ${p * p} yoki ${q * q} ⇒ musbat ildizlar ${p} va ${q}.`
      );
    },
    () => {
      const x = R(-5, 9);
      const y = R(-5, 9);
      return mc(
        `{ x + y = ${num(x + y)};  x − y = ${num(x - y)} } sistemadan x·y ni toping.`,
        num(x * y),
        [num(x + y), num(x * y + 1), num(-x * y), num(x - y)],
        `Qoʻshsak 2x = ${x + y + x - y} ⇒ x = ${x}, y = ${y}. x·y = ${x * y}.`
      );
    }
  ],
  [
    () => {
      const a = R(-3, 5);
      const b = R(2, 5);
      return mc(
        `|${xm(a)}| ≤ ${b} tengsizlikning butun yechimlari yigʻindisini toping.`,
        num(a * (2 * b + 1)),
        [num(2 * b + 1), num(a * 2 * b), num(a + b), num(a * (2 * b + 1) + b)],
        `${a - b} ≤ x ≤ ${a + b}: ${2 * b + 1} ta butun son, ular ${a} ga nisbatan simmetrik. Yigʻindi ${a}·${2 * b + 1} = ${a * (2 * b + 1)}.`
      );
    },
    () => {
      const p = R(-4, 2);
      const q = p + R(3, 7);
      return mc(
        `${poly([[1, 2], [-(p + q), 1], [p * q, 0]])} < 0 tengsizlikning butun yechimlari sonini toping.`,
        num(q - p - 1),
        [num(q - p), num(q - p + 1), num(q - p - 2), num(p + q)],
        `Ildizlar ${p} va ${q}; yechim (${p}; ${q}). Undagi butun sonlar: ${q - p - 1} ta.`
      );
    }
  ],
  [
    () => {
      const a = R(-4, 3);
      const b = a + R(2, 6);
      return mc(
        `(${xm(a)})/(${xm(b)}) ≤ 0 tengsizlikning butun yechimlari sonini toping.`,
        num(b - a),
        [num(b - a + 1), num(b - a - 1), num(a + b), num(2 * (b - a))],
        `Oraliqlar usuli: yechim [${a}; ${b}) (${b} da maxraj nol). Butun yechimlar ${b - a} ta.`
      );
    }
  ],
  [
    () => {
      const m = R(1, 3);
      const kind = pick(['sin', 'cos']);
      return mc(
        `${kind === 'sin' ? '2 sin x − 1' : '2 cos x − 1'} = 0 tenglamaning [0; ${2 * m}π] kesmadagi ildizlari sonini toping.`,
        num(2 * m),
        [num(m), num(2 * m + 1), num(4 * m), num(2 * m - 1)],
        `${kind === 'sin' ? 'sin x = 1/2 har bir 2π davrda 2 ta ildizga ega (π/6 va 5π/6)' : 'cos x = 1/2 har bir 2π davrda 2 ta ildizga ega (π/3 va 5π/3)'}. ${m} ta davr ⇒ ${2 * m} ta ildiz.`
      );
    }
  ]
];

/* ----------------------------- 20–21. Funksiyalar ----------------------------- */
const T_func: (() => Q)[][] = [
  [
    () => {
      const a = R(-4, 4);
      const b = pick([2, 3, -2]);
      const c = R(1, 4) * pick([1, -1]);
      const ok = poly([[b * b, 2], [2 * b * c, 1], [c * c + a, 0]]);
      return mc(
        `f(x) = ${poly([[1, 2], [a, 0]])} va g(x) = ${poly([[b, 1], [c, 0]])} boʻlsa, f(g(x)) ni toping.`,
        ok,
        [poly([[b * b, 2], [-2 * b * c, 1], [c * c + a, 0]]), poly([[b, 2], [2 * b * c, 1], [c * c + a, 0]]), poly([[b * b, 2], [2 * b * c, 1], [c * c - a, 0]]), poly([[b * b, 2], [b * c, 1], [c * c + a, 0]])],
        `f(g(x)) = (${poly([[b, 1], [c, 0]])})²${pm(a)} = ${ok}.`
      );
    },
    () => {
      const k = R(-4, 5) || 2;
      const b = R(-5, 5);
      const x1 = R(1, 3);
      const x2 = x1 + R(2, 4);
      const x3 = x2 + R(1, 3);
      return mc(
        `Chiziqli funksiya uchun f(${x1}) = ${num(k * x1 + b)} va f(${x2}) = ${num(k * x2 + b)}. f(${x3}) ni toping.`,
        num(k * x3 + b),
        near(k * x3 + b).concat([num(k * x3)]),
        `Burchak koeffitsiyenti k = (${num(k * x2 + b)} − ${num(k * x1 + b)})/${x2 - x1} = ${k}, b = ${b}. f(${x3}) = ${k * x3 + b}.`
      );
    }
  ],
  [
    () => {
      const p = R(-4, 4);
      const q = R(-5, 8);
      const m = q - p * p;
      return mc(
        `y = ${poly([[1, 2], [-2 * p, 1], [q, 0]])} funksiyaning qiymatlar sohasini toping.`,
        `[${num(m)}; +∞)`,
        [`(−∞; ${num(m)}]`, `[${num(q)}; +∞)`, `[${num(p)}; +∞)`, `(${num(m)}; +∞)`, `[${num(m + 1)}; +∞)`],
        `y = (${xm(p)})²${pm(m)}. Eng kichik qiymat ${m}, demak E(y) = [${m}; +∞).`
      );
    },
    () => {
      const a = pick([2, 3, 4, 5]);
      const b = R(-6, 6);
      const y = R(-3, 6);
      const k = a * y + b;
      return mc(
        `f(x) = ${poly([[a, 1], [b, 0]])} funksiyaga teskari funksiya f⁻¹ boʻlsa, f⁻¹(${num(k)}) ni toping.`,
        num(y),
        [num(a * k + b), fr(k + b, a), num(y + 1), num(-y)],
        `f⁻¹(${num(k)}) = x shunday sonki f(x) = ${num(k)}: ${a}x${pm(b)} = ${num(k)} ⇒ x = ${y}.`
      );
    }
  ]
];

/* ------------------------- 22–23. Analiz asoslari ------------------------- */
const T_anal: (() => Q)[][] = [
  [
    () => {
      const a = R(1, 3);
      const b = R(-4, 4);
      const c = R(-5, 5);
      const x0 = R(-2, 2) || 1;
      const d = 3 * a * x0 * x0 + 2 * b * x0 + c;
      return mc(
        `f(x) = ${poly([[a, 3], [b, 2], [c, 1], [R(1, 9), 0]])} boʻlsa, f′(${num(x0)}) ni hisoblang.`,
        num(d),
        near(d).concat([num(a * x0 ** 3 + b * x0 * x0 + c * x0)]),
        `f′(x) = ${poly([[3 * a, 2], [2 * b, 1], [c, 0]])}. f′(${x0}) = ${d}.`,
        7
      );
    },
    () => {
      const a = R(1, 6);
      const b = R(1, 4) * pick([1, -1]);
      return mc(
        `f(x) = (x² + ${a})(${xm(b)}) boʻlsa, f′(${num(b)}) ni toping.`,
        num(b * b + a),
        [num(2 * b), num(b * b), num(2 * b * b + a), num(a)],
        `Koʻpaytma hosilasi: f′ = 2x(x − ${b}) + (x² + ${a}). x = ${b} da birinchi qoʻshiluvchi 0: f′(${b}) = ${b * b + a}.`,
        8
      );
    }
  ],
  [
    () => {
      const a = R(1, 4) * 2;
      const b = R(-3, 5);
      const k = R(1, 4);
      const v = (a * k * k) / 2 + b * k;
      return mc(
        `Hisoblang: ∫₀^${k} (${poly([[a, 1], [b, 0]])}) dx`,
        num(v),
        [num(a * k + b), num(a * k * k + b * k), num(v + k), num((a * k * k) / 2)],
        `Boshlangʻich funksiya ${poly([[a / 2, 2], [b, 1]])}. 0 dan ${k} gacha: ${num(v)}.`,
        26
      );
    },
    () => {
      const a = R(-4, 4);
      const c = R(-5, 5);
      const k = R(1, 4);
      return mc(
        `f(x) = ${poly([[2, 1], [a, 0]])} funksiyaning F(0) = ${num(c)} shartni qanoatlantiruvchi boshlangʻich funksiyasi uchun F(${k}) ni toping.`,
        num(k * k + a * k + c),
        [num(k * k + a * k), num(2 * k + a + c), num(k * k + c), num(k * k + a * k - c)],
        `F(x) = x²${pm(a)}x + C, F(0) = C = ${c}. F(${k}) = ${k * k + a * k + c}.`,
        21
      );
    }
  ]
];

/* ----------------------------- 24–30. Geometriya ----------------------------- */
const T_geo: (() => Q)[][] = [
  [
    () => {
      const s = R(4, 8) * 10 + pick([0, 5]);
      const d = 180 - 2 * s;
      if (d <= 0) throw new Error('bad');
      FIG = adjacentAngles(s);
      return mc(
        `Ikki toʻgʻri chiziq kesishganda hosil boʻlgan qoʻshni burchaklar ayirmasi ${d}° ga teng. Kichik burchakni toping.`,
        `${s}°`,
        [`${s + d}°`, `${s + 10}°`, `${d}°`, `${90 - d / 2 + 10}°`, `${s - 10}°`],
        `Qoʻshni burchaklar yigʻindisi 180°: x + (x + ${d}) = 180 ⇒ x = ${s}°.`
      );
    },
    () => {
      const n = pick([5, 6, 8, 9, 10, 12]);
      const ask = pick(['angle', 'diag']);
      FIG = regularPolygon(n);
      if (ask === 'angle')
        return mc(`Muntazam ${n} burchakning ichki burchagini toping.`, `${num((180 * (n - 2)) / n)}°`, [`${num(360 / n)}°`, `${num((180 * (n - 1)) / n)}°`, `${180 * (n - 2)}°`, `${num((180 * (n - 3)) / n)}°`], `Ichki burchak 180°(n − 2)/n = ${num((180 * (n - 2)) / n)}°.`);
      return mc(`Qavariq ${n} burchakning nechta diagonali bor?`, num((n * (n - 3)) / 2), [num(n * (n - 3)), num((n * (n - 2)) / 2), num(n), num((n * (n - 1)) / 2)], `Diagonallar soni n(n − 3)/2 = ${(n * (n - 3)) / 2}.`);
    }
  ],
  [
    () => {
      const [x, y, z] = pick(TRIPLES.slice(0, 5));
      // AD = x (half base), BD = y (median = height), AB = z
      FIG = isoMedian(`${y} cm`);
      return mc(
        `ABC teng yonli (AB = BC) uchburchakning BD medianasi ${y} cm. ABD uchburchak perimetri ${x + y + z} cm. ABC uchburchak perimetrini (cm) toping.`,
        num(2 * (x + z)),
        [num(2 * (x + y + z)), num(x + y + z + x), num(2 * x + z), num(2 * (x + z) - y)],
        `P(ABC) = 2(AB + AD) = 2(P(ABD) − BD) = 2(${x + y + z} − ${y}) = ${2 * (x + z)}.`
      );
    },
    () => {
      const [a, b, c] = pick(TRIPLES);
      const ask = pick(['r', 'area', 'h']);
      FIG = ask === 'area' ? rightTriangle(String(a), '?', { c: String(c) }) : rightTriangle(String(a), String(b), { altitude: ask === 'h' });
      if (ask === 'r') return mc(`Katetlari ${a} va ${b} boʻlgan toʻgʻri burchakli uchburchakka ichki chizilgan aylana radiusini toping.`, num((a + b - c) / 2), [num(c / 2), num((a + b + c) / 2), num((a * b) / c), num((a + b - c) / 2 + 1)], `Gipotenuza ${c}. r = (a + b − c)/2 = ${(a + b - c) / 2}.`);
      if (ask === 'area') return mc(`Gipotenuzasi ${c} va bir kateti ${a} boʻlgan toʻgʻri burchakli uchburchak yuzini toping.`, num((a * b) / 2), [num(a * b), num((a * c) / 2), num((b * c) / 2), num((a * b) / 2 + a)], `Ikkinchi katet √(${c * c} − ${a * a}) = ${b}. S = ${a}·${b}/2 = ${(a * b) / 2}.`);
      return mc(`Katetlari ${a} va ${b} boʻlgan toʻgʻri burchakli uchburchakning gipotenuzaga tushirilgan balandligini toping.`, num((a * b) / c), [num(c / 2), num((a + b) / 2), num((a * b) / 2), num(c)], `h = ab/c = ${a * b}/${c} = ${num((a * b) / c)}.`);
    }
  ],
  [
    () => {
      for (;;) {
        const p = R(1, 7);
        const q = R(1, 7);
        const r = R(1, 7);
        const s = p + q + r;
        if (180 % s || new Set([p, q, r]).size < 2) continue;
        const angs = [p, q, r].map((v) => (180 * v) / s);
        const mx = Math.max(...angs);
        FIG = arcTriangle(p, q, r);
        return mc(
          `Aylana ${p} : ${q} : ${r} nisbatda uchta yoyga boʻlingan, boʻlinish nuqtalari tutashtirilib uchburchak hosil qilingan. Uchburchakning eng katta burchagini toping.`,
          `${mx}°`,
          [`${2 * mx}°`, `${Math.min(...angs)}°`, `${(360 * Math.max(p, q, r)) / s / 2 + 10}°`, `${(360 * Math.max(p, q, r)) / s}°`],
          `Ichki chizilgan burchak oʻzi tiralgan yoyning yarmiga teng. Yoylar ${[p, q, r].map((v) => (360 * v) / s).join('°, ')}° ⇒ eng katta burchak ${mx}°.`
        );
      }
    }
  ],
  [
    () => {
      const a = R(3, 9);
      const b = a + R(2, 8);
      const h = R(2, 8);
      FIG = trapezoid(String(a), String(b), String(h));
      return mc(
        `Trapetsiyaning asoslari ${a} va ${b}, balandligi ${h}. Uning yuzini toping.`,
        num(((a + b) * h) / 2),
        [num((a + b) * h), num(a * b), num(((b - a) * h) / 2), num(((a + b) * h) / 2 + h)],
        `S = (a + b)/2 · h = ${(a + b) / 2}·${h} = ${num(((a + b) * h) / 2)}.`
      );
    },
    () => {
      const [d, half, R0] = pick(TRIPLES.slice(0, 5));
      FIG = chord(String(R0), String(d));
      return mc(
        `Radiusi ${R0} boʻlgan aylananing markazidan ${d} masofada oʻtgan vatar uzunligini toping.`,
        num(2 * half),
        [num(half), num(2 * d), num(R0 + d), num(2 * R0)],
        `Vatar yarmi √(${R0}² − ${d}²) = ${half}. Vatar ${2 * half}.`
      );
    }
  ],
  [
    () => {
      const sets: [number, number, number, number][] = [
        [2, 3, 6, 7],
        [1, 4, 8, 9],
        [2, 6, 9, 11],
        [4, 4, 7, 9],
        [1, 2, 2, 3]
      ];
      const [dx, dy, dz, L] = pick(sets);
      const x1 = R(-3, 3);
      const y1 = R(-3, 3);
      const z1 = R(-3, 3);
      return mc(
        `Fazoda A(${num(x1)}; ${num(y1)}; ${num(z1)}) va B(${num(x1 + dx)}; ${num(y1 - dy)}; ${num(z1 + dz)}) nuqtalar orasidagi masofani toping.`,
        num(L),
        [num(dx + dy + dz), num(L * L), num(L + 1), sq(dx * dx + dy * dy)],
        `|AB| = √(${dx}² + ${dy}² + ${dz}²) = √${L * L} = ${L}.`,
        28
      );
    },
    () => {
      const p = R(1, 6);
      const q = p + R(2, 9);
      const [m, n] = pick([[1, 2], [2, 1], [1, 3], [3, 2], [2, 3]] as const);
      const v = (n * p + m * q) / (m + n);
      FIG = segmentPlane(`${p} cm`, `${q} cm`, m, n);
      return mc(
        `α tekislikni kesib oʻtmaydigan AB kesma uchlaridan tekislikkacha masofalar ${p} cm va ${q} cm. AB ni A uchidan boshlab ${m} : ${n} nisbatda boʻluvchi nuqtadan tekislikkacha masofani toping.`,
        num(v),
        [num((p + q) / 2), num((m * p + n * q) / (m + n)), num(v + 1), num(q - p)],
        `Masofa chiziqli oʻzgaradi: d = (${n}·${p} + ${m}·${q})/${m + n} = ${num(v)}.`
      );
    }
  ],
  [
    () => {
      const p = R(2, 6);
      const q = R(2, 6);
      const m = pick([1, 2, 3]);
      const th = pick([60, 90, 120]);
      const cos = th === 60 ? 0.5 : th === 90 ? 0 : -0.5;
      const N = m * m * p * p + q * q - 2 * m * p * q * cos;
      const t = m === 1 ? 'a − b' : `${m}a − b`;
      FIG = vectors(th);
      return mc(
        `a va b vektorlar uchun |a| = ${p}, |b| = ${q}, ular orasidagi burchak ${th}°. ${t} vektorning uzunligini toping.`,
        sq(N),
        [sq(m * m * p * p + q * q), sq(N + 2 * m * p * q), num(m * p - q), sq(N + m * p * q), num(m * p + q)],
        `|${t}|² = ${m * m}·${p * p} + ${q * q} − 2·${m}·${p}·${q}·cos ${th}° = ${N}. Uzunlik ${sq(N)}.`,
        30
      );
    }
  ],
  [
    () => {
      const kind = pick(['cone', 'cyl', 'ball']);
      if (kind === 'cone') {
        const r = R(2, 6);
        const h = R(1, 4) * 3;
        FIG = cone(String(r), String(h));
        return mc(`Asos radiusi ${r} va balandligi ${h} boʻlgan konusning hajmini toping.`, `${num((r * r * h) / 3)}π`, [`${r * r * h}π`, `${num((r * h) / 3)}π`, `${num((r * r * h) / 3) }`, `${2 * r * h}π`], `V = πr²h/3 = π·${r * r}·${h}/3 = ${num((r * r * h) / 3)}π.`, 69);
      }
      if (kind === 'cyl') {
        const r = R(2, 6);
        const h = R(2, 9);
        FIG = cylinder(String(r), String(h));
        return mc(`Asos radiusi ${r} va balandligi ${h} boʻlgan silindrning yon sirti yuzini toping.`, `${2 * r * h}π`, [`${r * h}π`, `${r * r * h}π`, `${2 * r * (r + h)}π`, `${r * r}π`], `S_yon = 2πrh = ${2 * r * h}π.`, 35);
      }
      const r = R(1, 3) * 3;
      FIG = sphere(String(r));
      return mc(`Radiusi ${r} boʻlgan sharning hajmini toping.`, `${(4 * r ** 3) / 3}π`, [`${4 * r * r}π`, `${r ** 3}π`, `${(4 * r ** 3) / 3}`, `${(2 * r ** 3) / 3}π`], `V = 4πr³/3 = 4π·${r ** 3}/3 = ${(4 * r ** 3) / 3}π.`, 74);
    }
  ]
];

/* --------------- 31–32. Toʻplamlar, kombinatorika, ehtimollik --------------- */
const T_prob: (() => Q)[][] = [
  [
    () => {
      const N = 10;
      const a1 = R(-9, -4);
      const a2 = R(0, 4);
      const b1 = R(-3, 2);
      const b2 = R(5, 9);
      const lo = Math.min(a1, b1);
      const hi = Math.max(a2, b2);
      const uni = b1 <= a2 + 1 ? hi - lo + 1 : a2 - a1 + 1 + (b2 - b1 + 1);
      const ans = 2 * N + 1 - uni;
      return mc(
        `U = {x | −10 ≤ x ≤ 10, x ∈ Z} universal toʻplam, A = {x | ${num(a1)} ≤ x ≤ ${num(a2)}, x ∈ Z}, B = {x | ${num(b1)} ≤ x ≤ ${num(b2)}, x ∈ Z}. A ∪ B toʻplam toʻldiruvchisining elementlari sonini toping.`,
        num(ans),
        [num(uni), num(ans + 1), num(ans + 2), num(Math.max(0, ans - 2))],
        `A ∪ B = [${lo}; ${hi}] dagi butun sonlar: ${uni} ta. U da 21 ta element. Toʻldiruvchi: 21 − ${uni} = ${ans}.`,
        58
      );
    },
    () => {
      const xs = Array.from({ length: 7 }, () => R(2, 9));
      const sorted = [...xs].sort((a, b) => a - b);
      const ask = pick(['median', 'mean']);
      const sum = xs.reduce((s, v) => s + v, 0);
      if (ask === 'median') return mc(`Maʼlumotlar: ${xs.join('; ')}. Medianani toping.`, num(sorted[3]), [num(sum / 7), num(sorted[2]), num(sorted[4]), num(xs[3]), num(sorted[3] + 1)], `Tartiblaymiz: ${sorted.join('; ')}. Oʻrtadagi (4-) son ${sorted[3]}.`, 52);
      if (sum % 7) throw new Error('mean');
      return mc(`Maʼlumotlar: ${xs.join('; ')}. Oʻrta qiymatni toping.`, num(sum / 7), [num(sorted[3]), num(sum / 7 + 1), num(sum), num(sum / 6)], `Yigʻindi ${sum}, sonlar 7 ta: ${sum}/7 = ${sum / 7}.`, 52);
    }
  ],
  [
    () => {
      const m = R(3, 8);
      const n = R(3, 8);
      const T = m + n;
      return mc(
        `Qopchada ${m} ta moviy va ${n} ta qizil shar bor. Ketma-ket (qaytarmasdan) olingan ikki sharning ikkalasi ham moviy boʻlish ehtimolligini toping.`,
        fr(m * (m - 1), T * (T - 1)),
        [fr(m * m, T * T), fr(m, T), fr(m - 1, T - 1), fr(m * (m - 1), T * T), fr(n * (n - 1), T * (T - 1))],
        `P = ${m}/${T} · ${m - 1}/${T - 1} = ${fr(m * (m - 1), T * (T - 1))}.`,
        59
      );
    },
    () => {
      const n = R(5, 9);
      const k = pick([2, 3]);
      const C = k === 2 ? (n * (n - 1)) / 2 : (n * (n - 1) * (n - 2)) / 6;
      return mc(
        `${n} kishidan iborat guruhdan ${k} kishilik delegatsiyani necha usulda tanlash mumkin?`,
        num(C),
        [num(k === 2 ? n * (n - 1) : n * (n - 1) * (n - 2)), num(n * k), num(C + n), num(n ** k)],
        `Tartib muhim emas — guruhlash: C(${n}; ${k}) = ${C}.`,
        48
      );
    },
    () => {
      const s = R(4, 10);
      let cnt = 0;
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) cnt++;
      return mc(
        `Ikkita oʻyin soqqasi tashlandi. Tushgan ochkolar yigʻindisi ${s} ga teng boʻlish ehtimolligini toping.`,
        fr(cnt, 36),
        [fr(cnt, 12), fr(1, 6), fr(cnt + 1, 36), fr(1, 11), fr(cnt, 21)],
        `Jami 36 ta teng imkoniyatli natija, ulardan yigʻindisi ${s} boʻlganlari ${cnt} ta. P = ${fr(cnt, 36)}.`,
        57
      );
    }
  ]
];

/* ---------------- 33–35. Moslashtirish (geometriya, umumiy shart) ---------------- */
function matchBlock(): Q[] {
  const kind = pick(['beam', 'box', 'cone']);
  let stem: string;
  let asks: [string, string, string][]; // [question, answer, explain]
  let extra: string[];
  if (kind === 'beam') {
    const rdm = pick([4, 5, 6]);
    const Lm = pick([3, 4, 6]);
    const base = 2 * rdm * rdm; // dm²
    const vol = (base * Lm * 10) / 1000; // m³
    FIG = cylinder(`${rdm} dm`, `${Lm} m`, true);
    stem = `Uzunligi ${Lm} m va asos radiusi ${rdm} dm boʻlgan silindrsimon yogʻoch boʻlagidan eng katta hajmli toʻgʻri burchakli parallelepiped (kvadrat kesimli ustun) yasaldi.`;
    asks = [
      ['Ustun asosining yuzini (dm²) toping.', num(base), `Kvadrat diagonali = diametr = ${2 * rdm} dm ⇒ yuz = d²/2 = ${base} dm².`],
      ['Ustunning hajmini (m³) toping.', num(vol), `${base} dm² = ${base / 100} m²; V = ${base / 100}·${Lm} = ${num(vol)} m³.`],
      ['Yogʻochning necha foizi chiqindiga chiqqan? (π ≈ 3 deb oling)', '33 1/3', `Doira yuzi 3r² = ${3 * rdm * rdm}, kvadrat 2r² = ${base}. Chiqindi 1/3 qism ≈ 33 1/3 %.`]
    ];
    extra = [num(base * 2), num(vol * 10), '25', num(Lm * 10), '50'];
  } else if (kind === 'box') {
    const [a, b, c, d] = pick([[2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9]] as [number, number, number, number][]);
    FIG = box(String(a), String(b), String(c), true);
    stem = `Toʻgʻri burchakli parallelepipedning oʻlchamlari ${a}, ${b} va ${c} ga teng.`;
    asks = [
      ['Parallelepiped diagonalini toping.', num(d), `d = √(${a * a} + ${b * b} + ${c * c}) = ${d}.`],
      ['Toʻla sirt yuzini toping.', num(2 * (a * b + b * c + a * c)), `S = 2(ab + bc + ac) = ${2 * (a * b + b * c + a * c)}.`],
      ['Hajmini toping.', num(a * b * c), `V = abc = ${a * b * c}.`]
    ];
    extra = [num(a + b + c), num(a * b + b * c + a * c), num(d * d), num(4 * (a + b + c))];
  } else {
    const [r, h, l] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]] as [number, number, number][]);
    FIG = cone(String(r), String(h), 'l');
    stem = `Konus asosining radiusi ${r}, balandligi ${h} ga teng.`;
    asks = [
      ['Konus yasovchisini toping.', num(l), `l = √(${r * r} + ${h * h}) = ${l}.`],
      ['Yon sirt yuzining π ga nisbatini toping (S_yon/π).', num(r * l), `S_yon = πrl = ${r * l}π.`],
      ['Hajmining π ga nisbatini toping (V/π).', num((r * r * h) / 3), `V = πr²h/3 = ${(r * r * h) / 3}π.`]
    ];
    extra = [num(r * h), num(r * r * h), num(r * (r + l)), num(r + h)];
  }
  const answers = asks.map((a) => a[1]);
  const pool = Array.from(new Set(extra.filter((e) => !answers.includes(e))));
  if (new Set(answers).size < 3 || pool.length < 3) throw new Error('match');
  const choices = shuffle([...answers, ...shuffle(pool).slice(0, 3)]);
  return asks.map(([q, a, e], i) => ({
    text: `33–35-topshiriqlar uchun umumiy shart: ${stem}\n\n${q}`,
    choices,
    answer: choices.indexOf(a),
    explain: e,
    match: true,
    fig: FIG,
    lesson: kind === 'cone' ? 68 : kind === 'box' ? 34 : 36
  }));
}

/* ------------------------- 36–45. Ochiq topshiriqlar ------------------------- */
const O36 = [
  () => {
    const p = R(1, 5);
    const neg = Math.random() < 0.5;
    const q = R(1, 4);
    if (neg) {
      // x² = t: t² + (q² − p²)t − p²q² = 0 → t = p² or t = −q²
      return open(
        `Tenglamani yeching: ${poly([[1, 4], [q * q - p * p, 2], [-p * p * q * q, 0]])} = 0`,
        ['a) Tenglama nechta haqiqiy ildizga ega?', 2],
        ['b) Haqiqiy ildizlari koʻpaytmasini toping.', -p * p],
        `x² = t: t = ${p * p} yoki t = −${q * q} (yaroqsiz). x = ±${p}: 2 ta ildiz, koʻpaytma −${p * p}.`
      );
    }
    let r = R(1, 5);
    if (r === p) r++;
    return open(
      `Tenglamani yeching: x⁴ − ${p * p + r * r}x² + ${p * p * r * r} = 0`,
      ['a) Tenglama nechta haqiqiy ildizga ega?', 4],
      ['b) Haqiqiy ildizlari kvadratlarining yigʻindisini toping.', 2 * (p * p + r * r)],
      `x² = t: t = ${p * p} yoki ${r * r} ⇒ x = ±${p}, ±${r}: 4 ta ildiz. Kvadratlar yigʻindisi 2(${p * p} + ${r * r}) = ${2 * (p * p + r * r)}.`
    );
  },
  () => {
    const a = R(-3, 5);
    const b = R(1, 6);
    return open(
      `Tenglamani yeching: |${xm(a)}| = ${b}`,
      ['a) Ildizlar yigʻindisini toping.', 2 * a],
      ['b) Ildizlar koʻpaytmasini toping.', a * a - b * b],
      `x = ${a} ± ${b}: ${a - b} va ${a + b}. Yigʻindi ${2 * a}, koʻpaytma ${a * a - b * b}.`
    );
  }
];
const O37 = [
  () =>
    pick([
      open('Tenglamani yeching: sin 2x = sin x', ['a) Eng kichik musbat ildizini gradusda toping.', 60], ['b) Tenglama [0; 2π] kesmada nechta ildizga ega?', 5], 'sin x(2cos x − 1) = 0: x = πk yoki x = ±π/3 + 2πk. Eng kichik musbat 60°. [0; 2π] da: 0, π/3, π, 5π/3, 2π — 5 ta.'),
      open('Tenglamani yeching: cos 2x = cos x', ['a) Eng kichik musbat ildizini gradusda toping.', 120], ['b) Tenglama [0; 2π] kesmada nechta ildizga ega?', 4], '2cos²x − cos x − 1 = 0 ⇒ cos x = 1 yoki −1/2. [0; 2π] da: 0, 2π/3, 4π/3, 2π — 4 ta. Eng kichik musbat 120°.'),
      open('Tenglamani yeching: 2sin²x = sin x', ['a) Eng kichik musbat ildizini gradusda toping.', 30], ['b) Tenglama [0; 2π] kesmada nechta ildizga ega?', 5], 'sin x(2sin x − 1) = 0: sin x = 0 yoki 1/2. [0; 2π] da: 0, π/6, 5π/6, π, 2π — 5 ta.'),
      open('Tenglamani yeching: sin 2x = cos x', ['a) Eng kichik musbat ildizini gradusda toping.', 30], ['b) Tenglama [0; 2π] kesmada nechta ildizga ega?', 4], 'cos x(2sin x − 1) = 0: cos x = 0 yoki sin x = 1/2. [0; 2π] da: π/6, π/2, 5π/6, 3π/2 — 4 ta.'),
      open('Tenglamani yeching: tg x = √3', ['a) Eng kichik musbat ildizini gradusda toping.', 60], ['b) Tenglama [0; 2π] kesmada nechta ildizga ega?', 2], 'x = π/3 + πk. [0; 2π] da: π/3 va 4π/3 — 2 ta.')
    ])
];
const O38 = [
  () => {
    const h = R(-3, 3);
    const m = R(1, 4);
    const k = m * m;
    FIG = parabolaGraph(h, k, k - h * h);
    return open(
      `f(x) = ${poly([[-1, 2], [2 * h, 1], [k - h * h, 0]])} funksiyaning grafigi — uchi B(${num(h)}; ${num(k)}) nuqtada boʻlgan parabola. U Ox oʻqini x₁ < x₂ nuqtalarda, Oy oʻqini A nuqtada kesadi.`,
      ['a) x₂ − x₁ ni toping.', 2 * m],
      ['b) A nuqtaning ordinatasini toping.', k - h * h],
      `f(x) = −(x − ${h})² + ${k}: ildizlar ${h} ± ${m}, ayirma ${2 * m}. f(0) = ${k} − ${h * h} = ${k - h * h}.`
    );
  }
];
const O39 = [
  () => {
    const roots = shuffle([-4, -2, 0, 1, 3, 5, 7]).slice(0, 4).sort((a, b) => a - b);
    const mult = roots.map(() => pick([1, 1, 2]));
    // sign to the right of the last root is + (leading coef positive)
    let sign = 1;
    let mx = 0;
    let mn = 0;
    for (let i = roots.length - 1; i >= 0; i--) {
      const right = sign;
      const left = mult[i] % 2 ? -sign : sign;
      if (left > 0 && right < 0) mx++;
      if (left < 0 && right > 0) mn++;
      sign = left;
    }
    const f = roots.map((r, i) => `(x ${r < 0 ? '+ ' + -r : r === 0 ? '' : '− ' + r})${mult[i] === 2 ? '²' : ''}`.replace('(x )', 'x')).join('');
    return open(
      `y = f(x) funksiyaning hosilasi f′(x) = ${f} boʻlsin.`,
      ['a) f(x) ning lokal maksimum nuqtalari sonini toping.', mx],
      ['b) f(x) ning lokal minimum nuqtalari sonini toping.', mn],
      `Hosila ishorasini oraliqlar usulida aniqlaymiz (juft karrali ildizda ishora oʻzgarmaydi). Ishora + dan − ga oʻtadigan nuqtalar — maksimum (${mx} ta), − dan + ga — minimum (${mn} ta).`,
      13
    );
  }
];
const O40 = [
  () => {
    const [a, b] = pick([[1, 6], [1, 3], [1, 2], [2, 4], [1, 4], [3, 6]] as [number, number][]);
    FIG = areaGraph(a, b);
    return open(
      `f(x) = ${a === 1 ? '' : a}x² va g(x) = ${b}x funksiyalar berilgan.`,
      ['a) Grafiklar nechta umumiy nuqtaga ega?', 2],
      ['b) Grafiklar bilan chegaralangan shakl yuzini toping.', fr(b ** 3, 6 * a * a)],
      `${a === 1 ? '' : a}x² = ${b}x ⇒ x = 0 yoki x = ${fr(b, a)} (2 ta nuqta). S = ∫₀^${fr(b, a)} (${b}x − ${a === 1 ? '' : a}x²)dx = b³/(6a²) = ${fr(b ** 3, 6 * a * a)}.`,
      41
    );
  }
];
const O_geo = [
  () => {
    const [a, b, c] = pick(TRIPLES);
    FIG = rightTriangle(`${a} cm`, `${b} cm`, { altitude: true });
    return open(
      `Toʻgʻri burchakli uchburchakning katetlari ${a} cm va ${b} cm.`,
      ['a) Gipotenuzani (cm) toping.', c],
      ['b) Gipotenuzaga tushirilgan balandlikni (cm) toping.', (a * b) / c],
      `c = √(${a * a} + ${b * b}) = ${c}; h = ab/c = ${num((a * b) / c)}.`
    );
  },
  () => {
    const [x, y, z] = pick(TRIPLES.slice(0, 5));
    FIG = rhombus(`${2 * x} cm`, `${2 * y} cm`);
    return open(
      `Rombning diagonallari ${2 * x} cm va ${2 * y} cm.`,
      ['a) Romb tomonini (cm) toping.', z],
      ['b) Romb yuzini (cm²) toping.', 2 * x * y],
      `Diagonallar perpendikulyar va teng ikkiga boʻlinadi: tomon √(${x * x} + ${y * y}) = ${z}. S = d₁d₂/2 = ${2 * x * y}.`
    );
  },
  () => {
    const [p, q, r] = pick(TRIPLES);
    FIG = axesTriangle(p, q);
    return open(
      `Koordinatalar tekisligida O(0; 0), A(${p}; 0) va B(0; ${q}) nuqtalar berilgan.`,
      ['a) OAB uchburchakka ichki chizilgan aylana radiusini toping.', (p + q - r) / 2],
      ['b) OAB uchburchakka tashqi chizilgan aylana radiusini toping.', r / 2],
      `AB = ${r}. Toʻgʻri burchakli uchburchakda r = (a + b − c)/2 = ${num((p + q - r) / 2)}, R = c/2 = ${num(r / 2)}.`
    );
  },
  () => {
    const [h2, h, ap] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [4, 3, 5]] as [number, number, number][]);
    const a = 2 * h2;
    FIG = pyramid(`${a} cm`, `${h} cm`);
    return open(
      `Muntazam toʻrtburchakli piramida asosining tomoni ${a} cm, balandligi ${h} cm.`,
      ['a) Piramida apofemasini (cm) toping.', ap],
      ['b) Piramida hajmini (cm³) toping.', (a * a * h) / 3],
      `Apofema √(${h2}² + ${h}²) = ${ap}. V = a²h/3 = ${a * a}·${h}/3 = ${num((a * a * h) / 3)}.`,
      66
    );
  },
  () => {
    const r = R(2, 5);
    const h = R(2, 8);
    FIG = cylinder(`${r} cm`, `${h} cm`);
    return open(
      `Silindr asosining radiusi ${r} cm, balandligi ${h} cm.`,
      ['a) Yon sirt yuzining π ga nisbatini toping.', 2 * r * h],
      ['b) Hajmining π ga nisbatini toping.', r * r * h],
      `S_yon = 2πrh = ${2 * r * h}π; V = πr²h = ${r * r * h}π.`,
      36
    );
  },
  () => {
    const [a, b, c, d] = pick([[2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11]] as [number, number, number, number][]);
    FIG = box(`${a}`, `${b}`, `${c}`, true);
    return open(
      `Toʻgʻri burchakli parallelepipedning oʻlchamlari ${a}, ${b} va ${c} cm.`,
      ['a) Diagonalini (cm) toping.', d],
      ['b) Toʻla sirt yuzini (cm²) toping.', 2 * (a * b + b * c + a * c)],
      `d = √(${a * a} + ${b * b} + ${c * c}) = ${d}; S = 2(ab + bc + ac) = ${2 * (a * b + b * c + a * c)}.`,
      33
    );
  }
];
const O45 = [
  () => {
    const k = R(5, 30) * 2;
    const L = 4 * k;
    FIG = riverPlot();
    return open(
      `Daryo boʻyida toʻgʻri toʻrtburchak shaklidagi yer uchastkasi uch tomondan ${L} m uzunlikdagi devor bilan oʻraldi (daryo tomoni oʻralmaydi). Uchastka yuzi eng katta boʻlishi kerak.`,
      ['a) Daryoga perpendikulyar tomon uzunligini (m) toping.', k],
      ['b) Uchastkaning eng katta yuzini (m²) toping.', 2 * k * k],
      `Perpendikulyar tomon x: yuz S = x(${L} − 2x). S′ = ${L} − 4x = 0 ⇒ x = ${k}. S = ${k}·${2 * k} = ${2 * k * k}.`,
      16
    );
  },
  () => {
    const a = pick([100, 120, 150, 200]);
    const b = pick([2, 4, 5]);
    const p = a / (2 * b);
    if (!Number.isInteger(p)) throw new Error('p');
    return open(
      `Mahsulot narxi p ming soʻm boʻlganda kuniga q = ${a} − ${b}p dona sotiladi. Kunlik tushum R = p·q.`,
      ['a) Tushum eng katta boʻladigan narxni (ming soʻm) toping.', p],
      ['b) Eng katta kunlik tushumni (ming soʻm) toping.', p * (a - b * p)],
      `R(p) = ${a}p − ${b}p². R′ = ${a} − ${2 * b}p = 0 ⇒ p = ${p}. R = ${p}·${a - b * p} = ${p * (a - b * p)}.`,
      17
    );
  },
  () => {
    const n = pick([3, 4]);
    return open(
      `Tanga ${n} marta tashlanadi.`,
      ['a) Gerb aniq 2 marta tushish ehtimolligini toping.', fr(n === 3 ? 3 : 6, 2 ** n)],
      ['b) Kamida bir marta gerb tushish ehtimolligini toping.', fr(2 ** n - 1, 2 ** n)],
      `Bernulli sxemasi: P = C(${n}; 2)/2^${n} = ${fr(n === 3 ? 3 : 6, 2 ** n)}. Kamida bir marta: 1 − 1/2^${n} = ${fr(2 ** n - 1, 2 ** n)}.`,
      61
    );
  }
];

/* ------------------------------- assemble ------------------------------- */
function tryGen(gen: () => Q): Q {
  for (let i = 0; i < 40; i++) {
    try {
      FIG = undefined;
      const q = gen();
      if (FIG) q.fig = FIG;
      FIG = undefined;
      return q;
    } catch {
      /* rejected parameters — draw again */
    }
  }
  throw new Error('generator failed');
}
const fromPool = (pool: (() => Q)[]) => tryGen(() => pick(pool)());

/** typography: real minus sign and decimal comma in generated text */
const tidy = (t: string) => t.replace(/(^|[\s(=;:,\[])-(\d)/g, '$1−$2').replace(/(\d)\.(\d)/g, '$1,$2');
const same = (s: string): L10n => {
  const v = tidy(s);
  return { uz: v, ru: v, en: v };
};

/** A fresh 45-question variant (call on the client only — it is random). */
export function buildMathExam(): G11Question[] {
  const list: Q[] = [];
  list.push(fromPool(T_numbers1), fromPool(T_numbers2));
  for (const slot of T_alg) list.push(fromPool(slot));
  for (const slot of T_eq) list.push(fromPool(slot));
  for (const slot of T_func) list.push(fromPool(slot));
  for (const slot of T_anal) list.push(fromPool(slot));
  for (const slot of T_geo) list.push(fromPool(slot));
  for (const slot of T_prob) list.push(fromPool(slot));
  let block: Q[] | null = null;
  for (let i = 0; i < 40 && !block; i++) {
    try {
      FIG = undefined;
      block = matchBlock();
    } catch {
      /* again */
    }
  }
  list.push(...(block as Q[]));
  list.push(fromPool(O36), fromPool(O37), fromPool(O38), fromPool(O39), fromPool(O40));
  for (const g of shuffle(O_geo).slice(0, 4)) list.push(tryGen(g));
  list.push(fromPool(O45));
  const stamp = Date.now().toString(36);
  return list.map((q, i) => ({
    id: `g11-math-${stamp}-${i + 1}`,
    prompt: same(q.text),
    choices: (q.choices ?? []).map(same),
    answerIndex: q.answer ?? -1,
    reviewTopics: [],
    explanation: same(q.explain),
    lessonN: q.lesson ?? 0,
    ...(q.parts ? { parts: q.parts.map(([p, a], k) => ({ label: k ? 'b' : 'a', prompt: same(p), answer: a })) } : {}),
    ...(q.match ? { match: true } : {}),
    ...(q.fig ? { figure: q.fig } : {})
  }));
}
