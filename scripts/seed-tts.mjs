/**
 * One-time TTS seed (FR-TTS-3/4) — Azure AI Speech (Text-to-Speech).
 *
 * Synthesizes the RECALL block (the quiz "topic explanation") for every built
 * lesson and caches the clip as a static .wav. The app only ever serves these
 * cached files — it NEVER calls the TTS API at runtime, so there is no key or
 * credential in the shipped app and no per-play cost.
 *
 *   Read-aloud is UZBEK ONLY (Russian/English clips are not generated — those
 *   locales have no read-aloud button).
 *
 * Auth/config (read from .env — loaded automatically below):
 *     AZURE_SPEECH_KEY        resource key (required)
 *     AZURE_SPEECH_ENDPOINT   e.g. https://<resource>.cognitiveservices.azure.com/
 *     AZURE_SPEECH_REGION     e.g. eastus  (optional; preferred over endpoint if set)
 *     AZURE_SPEECH_VOICE      e.g. uz-UZ-MadinaNeural  (Uzbek). Defaults to uz-UZ-MadinaNeural.
 *
 * Usage:  npm run seed:tts
 *   Keep existing clips: only MISSING ones are generated. Set TTS_FORCE=1 to
 *   re-make clips whose text/voice changed.
 *
 * Output: public/audio/tts/<topicId>.uz.wav + manifest.json
 */
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = join(root, 'src', 'content');
const outDir = join(root, 'public', 'audio', 'tts');
mkdirSync(outDir, { recursive: true });

// ---- load .env (this is a plain node script; Next does not load it for us) --
function loadEnv() {
  const envPath = join(root, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2];
    if (/^".*"$/.test(val) || /^'.*'$/.test(val)) val = val.slice(1, -1); // strip quotes
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadEnv();

const KEY = process.env.AZURE_SPEECH_KEY;
const ENDPOINT = process.env.AZURE_SPEECH_ENDPOINT;
const REGION = process.env.AZURE_SPEECH_REGION;
const VOICE = process.env.AZURE_SPEECH_VOICE || 'uz-UZ-MadinaNeural';
const ONLY_LOCALE = 'uz'; // read-aloud is Uzbek only

if (!KEY || (!REGION && !ENDPOINT)) {
  console.error('✋ Missing Azure Speech config. Need AZURE_SPEECH_KEY and (AZURE_SPEECH_REGION or AZURE_SPEECH_ENDPOINT) in .env');
  process.exit(1);
}

// xml:lang for the SSML is the voice's locale prefix, e.g.
//   uz-UZ-MadinaNeural            → uz-UZ
//   de-DE-Florian:DragonHDLatest  → de-DE
function voiceLocale(voice) {
  const m = voice.match(/^([a-z]{2,3}-[A-Z]{2})/);
  return m ? m[1] : 'uz-UZ';
}
const XML_LANG = voiceLocale(VOICE);

// ---- helpers ------------------------------------------------------------
// The TTS voices read letters, not digits or math symbols. Instead of STRIPPING
// "10 + 3 = 13" (which makes the voice skip it), we VERBALIZE it into spoken
// words — "oʻn qoʻshish uch teng oʻn uch" — so the audio speaks the numbers and
// operators while the on-screen text keeps its clean digit form.

// Number → words (0–999) for each lesson locale.
const NUM = {
  uz: {
    ones: ['nol', 'bir', 'ikki', 'uch', 'toʻrt', 'besh', 'olti', 'yetti', 'sakkiz', 'toʻqqiz'],
    tens: ['', 'oʻn', 'yigirma', 'oʻttiz', 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', 'toʻqson']
  },
  ru: {
    ones: ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
    teens: ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'],
    tens: ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
    hundreds: ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']
  },
  en: {
    ones: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    teens: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  }
};

function numToWords(n, lang) {
  const T = NUM[lang] || NUM.uz;
  if (n < 0) return String(n);
  if (n < 10) return T.ones[n];
  if (n < 20) {
    if (lang === 'uz') return n === 10 ? 'oʻn' : `oʻn ${T.ones[n - 10]}`;
    return T.teens[n - 10];
  }
  if (n < 100) {
    const t = Math.floor(n / 10), u = n % 10;
    return T.tens[t] + (u ? ' ' + T.ones[u] : '');
  }
  if (n < 1000) {
    const h = Math.floor(n / 100), rem = n % 100;
    let head;
    if (lang === 'uz') head = (h > 1 ? T.ones[h] + ' ' : '') + 'yuz';
    else if (lang === 'ru') head = T.hundreds[h];
    else head = T.ones[h] + ' hundred';
    return head + (rem ? ' ' + numToWords(rem, lang) : '');
  }
  return String(n);
}

// Math operators → spoken words, per locale.
const OPS = {
  uz: { '+': 'qoʻshish', '−': 'ayirish', '=': 'teng', '×': 'koʻpaytirish', '÷': 'boʻlish', '<': 'kichik', '>': 'katta', '%': 'foiz' },
  ru: { '+': 'плюс', '−': 'минус', '=': 'равно', '×': 'умножить', '÷': 'разделить', '<': 'меньше', '>': 'больше', '%': 'процент' },
  en: { '+': 'plus', '−': 'minus', '=': 'equals', '×': 'times', '÷': 'divided by', '<': 'less than', '>': 'greater than', '%': 'percent' }
};

<<<<<<< HEAD
// Measurement-unit abbreviations → full spoken words, per locale. The neural
// voice reads bare "cm"/"dm"/"kg" letter-by-letter (a garbled sound after the
// word), so we speak the whole unit instead. "sm" is the Uzbek spelling.
const UNITS = {
  uz: { cm: 'santimetr', sm: 'santimetr', dm: 'detsimetr', mm: 'millimetr', km: 'kilometr', kg: 'kilogramm' },
  ru: { cm: 'сантиметр', sm: 'сантиметр', dm: 'дециметр', mm: 'миллиметр', km: 'километр', kg: 'килограмм' },
  en: { cm: 'centimetre', sm: 'centimetre', dm: 'decimetre', mm: 'millimetre', km: 'kilometre', kg: 'kilogram' }
};
const UNIT_RE = /\b(cm|sm|dm|mm|km|kg)\b/gi;

/** Convert digits + math symbols to spoken words, then keep only speakable text. */
function verbalize(s, lang) {
  const op = OPS[lang] || OPS.uz;
  const unit = UNITS[lang] || UNITS.uz;
  return s
    // a parenthetical that just repeats a unit (e.g. "Santimetr (cm)") is read
    // as stray letters — drop it; the full word is already in the text.
    .replace(/\(\s*(?:cm|sm|dm|mm|km|kg)\s*\)/gi, ' ')
    // remaining unit abbreviations (e.g. "10 cm") → the full spoken word.
    .replace(UNIT_RE, (m) => ` ${unit[m.toLowerCase()]} `)
=======
/** Convert digits + math symbols to spoken words, then keep only speakable text. */
function verbalize(s, lang) {
  const op = OPS[lang] || OPS.uz;
  return s
>>>>>>> origin/main
    // minus / multiplication / division only when written between numbers
    // (so a hyphenated word or the Uzbek letter "x" is never mistaken for an operator)
    .replace(/(\d)\s*[-–−]\s*(\d)/g, `$1 ${op['−']} $2`)
    .replace(/(\d)\s*÷\s*(\d)/g, `$1 ${op['÷']} $2`)
    .replace(/(\d)\s*[*×]\s*(\d)/g, `$1 ${op['×']} $2`)
    // standalone operators
    .replace(/\s*\+\s*/g, ` ${op['+']} `)
    .replace(/\s*=\s*/g, ` ${op['=']} `)
    .replace(/\s*<\s*/g, ` ${op['<']} `)
    .replace(/\s*>\s*/g, ` ${op['>']} `)
    .replace(/\s*%\s*/g, ` ${op['%']} `)
    // remaining dashes and colons are prose pauses, not math
    .replace(/[‒–—―:-]/g, ' , ')
    // every remaining run of digits → words
    .replace(/\d+/g, (m) => numToWords(parseInt(m, 10), lang))
    // drop anything that still isn't a letter / space / . , — keep oʻ gʻ (Lm letters)
    .replace(/[^\p{L}\s.,]/gu, ' ')
    .replace(/\s+([.,])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Liveliness controls — Uzbek neural voices (Sardor/Madina) don't support
// express-as styles, so we add energy with pitch + a touch more pace, and put
// small natural pauses at sentence/comma boundaries so it doesn't sound flat.
const RATE = process.env.AZURE_SPEECH_RATE || '+4%';
const PITCH = process.env.AZURE_SPEECH_PITCH || '+12%';

function ssml(text) {
  const body = xmlEscape(text)
    .replace(/\. /g, '.<break strength="weak"/> ')
    .replace(/, /g, ',<break strength="x-weak"/> ');
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${XML_LANG}">`
    + `<voice name="${VOICE}"><prosody rate="${RATE}" pitch="${PITCH}">${body}</prosody></voice></speak>`;
}

function makeSpeechConfig() {
  const cfg = REGION
    ? sdk.SpeechConfig.fromSubscription(KEY, REGION)
    : sdk.SpeechConfig.fromEndpoint(new URL(ENDPOINT), KEY);
  cfg.speechSynthesisVoiceName = VOICE;
  // 24 kHz 16-bit mono PCM in a RIFF/WAV container → write straight to disk.
  cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;
  return cfg;
}

/** Synthesize one SSML string → Buffer (WAV). */
function synth(text) {
  return new Promise((resolve, reject) => {
    const synthesizer = new sdk.SpeechSynthesizer(makeSpeechConfig(), null);
    synthesizer.speakSsmlAsync(
      ssml(text),
      (result) => {
        try {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            resolve(Buffer.from(result.audioData));
          } else {
            reject(new Error(result.errorDetails || `synthesis failed (reason ${result.reason})`));
          }
        } finally {
          synthesizer.close();
        }
      },
      (err) => {
        synthesizer.close();
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    );
  });
}

// ---- run ----------------------------------------------------------------
const manifestPath = join(outDir, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

/** Recursively collect every lesson JSON (topicNN.json) anywhere under src/content. */
function findLessons(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...findLessons(p));
    else if (/^topic\d+\.json$/.test(ent.name)) out.push(p);
  }
  return out;
}
const lessonPaths = findLessons(contentRoot).sort();
console.log(`🔊 Azure TTS seed · ${lessonPaths.length} lesson(s) · voice ${VOICE} · ${ONLY_LOCALE} only`);

for (const lpath of lessonPaths) {
  const lesson = JSON.parse(readFileSync(lpath, 'utf8'));
  if (!lesson?.topicId || !lesson?.recall?.[ONLY_LOCALE]) continue; // skip non-lesson json
  // Optional per-lesson override: lesson.ttsText[locale] is read verbatim
  // (still verbalized) when the auto-conversion needs a manual tweak.
  const raw = lesson.ttsText?.[ONLY_LOCALE] || `${lesson.title[ONLY_LOCALE]}. ${lesson.recall[ONLY_LOCALE]}`;
  const text = verbalize(raw, ONLY_LOCALE);
  if (raw.length > 300) {
    console.warn(`⚠️  ${lesson.topicId}: explanation is ${raw.length} chars (>300) — consider shortening.`);
  }
  const file = `${lesson.topicId}.${ONLY_LOCALE}.wav`;
  const hash = createHash('sha256').update(`${ONLY_LOCALE}|azure|${VOICE}|${text}`).digest('hex');
  const force = process.env.TTS_FORCE === '1';
  if (existsSync(join(outDir, file)) && (!force || manifest[file]?.hash === hash)) {
    console.log(`↪︎ ${file} — kept (exists), skipping`);
    continue;
  }
  try {
    console.log(`🎙  ${file} (azure, voice ${VOICE})…`);
    const wav = await synth(text);
    writeFileSync(join(outDir, file), wav);
    manifest[file] = { hash, provider: 'azure', voice: VOICE, bytes: wav.length, at: new Date().toISOString() };
    console.log(`   ✓ ${(wav.length / 1024).toFixed(0)} KB`);
  } catch (e) {
    console.error(`   ✗ ${file}: ${e.message}`);
    process.exitCode = 1;
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ TTS seed finished. Clips are cached — the app never synthesizes at runtime.');
