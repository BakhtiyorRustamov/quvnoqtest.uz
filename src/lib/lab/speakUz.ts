/**
 * Pronunciation list for lesson audio: maths notation in the narration is
 * rewritten the way an Uzbek teacher says it, before the text goes to the
 * voice model. Only the audio text changes — captions keep the notation.
 * (Gemini otherwise sometimes reads "f(x)" the Russian way: "эф от икс".)
 */

/** How single letters are read in formulas. */
const LETTER: Record<string, string> = {
  a: 'a', b: 'be', c: 'se', d: 'de', f: 'ef', g: 'ge', h: 'ha', k: 'ka', m: 'em', n: 'en', p: 'pe', q: 'qu', s: 'es', t: 'te', u: 'u', v: 've',
  x: 'iks', y: 'igrek', z: 'zet'
};
const say = (letter: string) => LETTER[letter] ?? LETTER[letter.toLowerCase()] ?? letter;
/** Lone letters inside a formula part ("a plyus h" → "a plyus ha"). */
const letters = (s: string) =>
  s.replace(/(^|[^\p{L}ʻʼ'])([a-zA-Z])(?=$|[^\p{L}ʻʼ'])/gu, (_, pre, l) => `${pre}${/\d/.test(pre) ? ' ' : ''}${say(l)}`);

const RULES: [RegExp, string | ((...m: string[]) => string)][] = [
  [/lim\b/g, 'limit'],
  // x₀ → "iks nol", x₁ → "iks bir"
  [/([a-zA-Z])([₀₁₂₃])/g, (_, l, d) => `${say(l)} ${({ '₀': 'nol', '₁': 'bir', '₂': 'ikki', '₃': 'uch' } as Record<string, string>)[d]}`],
  // units
  [/\bkm\/soat\b/g, 'kilometr soatiga'],
  [/\bkm\/h\b/g, 'kilometr soatiga'],
  [/\bm\/s\b/g, 'metr sekundiga'],
  [/\bsm\/min\b/g, 'santimetr minutiga'],
  [/Δ\s?([a-zA-Z])/g, (_, l) => `delta ${say(l)}`],
  // f′(x) → "ef shtrix iks", y′ → "igrek shtrix"
  [/\b([a-zA-Z])[′']\(([^()]{1,40})\)/g, (_, fn, arg) => `${say(fn)} shtrix ${letters(arg).trim()}`],
  [/\b([a-zA-Z])[′']/g, (_, l) => `${say(l)} shtrix`],
  // f(x), g(a plyus h), f(4) …
  [/\b([a-zA-Z])\(([^()]{1,40})\)/g, (_, fn, arg) => `${say(fn)} ${letters(arg).trim()}`],
  // x², a³
  [/(\d?)([a-zA-Z])²/g, (_, d, l) => `${d ? `${d} ` : ''}${say(l)} kvadrat`],
  [/(\d?)([a-zA-Z])³/g, (_, d, l) => `${d ? `${d} ` : ''}${say(l)} kub`],
  [/(\d)²/g, '$1 kvadrat'],
  [/(\d)³/g, '$1 kub'],
  // 8,61 → "8 butun 61"
  [/(\d+),(\d+)/g, '$1 butun $2'],
  [/(\d)\s?%/g, '$1 foiz'],
  [/\s?√\s?/g, ' ildiz ostida '],
  [/\s?≈\s?/g, ' taxminan '],
  [/\s?≠\s?/g, ' teng emas '],
  [/\s?≤\s?/g, ' kichik yoki teng '],
  [/\s?≥\s?/g, ' katta yoki teng '],
  [/\s?±\s?/g, ' plyus-minus '],
  [/\s?∞/g, ' cheksizlik'],
  [/π/g, 'pi'],
  [/°/g, ' gradus'],
  [/\s?→\s?/g, ', keyin '],
  [/\s[−-]\s/g, ' minus '],
  [/\s\+\s/g, ' plyus '],
  [/\s=\s/g, ' teng '],
  [/\s·\s|\s×\s/g, ' karra '],
  [/\s:\s(?=\d)/g, ' boʻlingan ']
];

export function speakUz(text: string): string {
  let s = text;
  for (const [re, to] of RULES) s = s.replace(re, to as never);
  // remaining lone letters ("teng x kvadrat" → "teng iks kvadrat"); no Uzbek word is a single Latin letter here
  s = letters(s);
  return s.replace(/\s{2,}/g, ' ').trim();
}
