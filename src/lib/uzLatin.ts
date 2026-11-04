/**
 * Uzbek text clean-up for speech-to-text output: Cyrillic → Latin, and the
 * proper oʻ / gʻ / ʼ marks instead of the many apostrophes Whisper uses.
 */

const MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', ғ: 'gʻ', д: 'd', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', қ: 'q', л: 'l', м: 'm', н: 'n', о: 'o', ў: 'oʻ',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ҳ: 'h', ц: 's', ч: 'ch', ш: 'sh', щ: 'sh', ъ: 'ʼ', ы: 'i', ь: '', э: 'e', ё: 'yo', ю: 'yu', я: 'ya'
};
const VOWELS = 'аеёиоуўэюяaeiou';

/** Cyrillic Uzbek → Latin Uzbek (Russian words come out transliterated, which the tutor still understands). */
export function cyrToLatin(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const low = ch.toLowerCase();
    let lat: string | undefined;
    if (low === 'е') {
      // "е" is "ye" at the start of a word and after a vowel
      const prev = text[i - 1]?.toLowerCase() ?? '';
      lat = !prev || !/[\p{L}]/u.test(prev) || VOWELS.includes(prev) || prev === 'ъ' || prev === 'ь' ? 'ye' : 'e';
    } else lat = MAP[low];
    if (lat === undefined) {
      out += ch;
      continue;
    }
    if (ch !== low && lat) {
      // keep capitals: "Ш" → "Sh", or "SH" inside an all-caps word
      const nextUpper = text[i + 1] && text[i + 1] !== text[i + 1].toLowerCase();
      lat = nextUpper ? lat.toUpperCase() : lat[0].toUpperCase() + lat.slice(1);
    }
    out += lat;
  }
  return out;
}

/** oʻ / gʻ with the turned comma, other in-word apostrophes as ʼ (taʼlim). */
export function fixUzMarks(text: string): string {
  return text
    .replace(/([oOgG])['`‘’ʼ´]/g, '$1ʻ')
    .replace(/(\p{L})['`‘’´](?=\p{L})/gu, '$1ʼ');
}

export const uzLatin = (text: string) => fixUzMarks(cyrToLatin(text));
