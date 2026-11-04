import type { BoardLesson } from './types';
import { BOB4 } from './fizika-23';

/** Darslik: Fizika 11, 29-mavzu (107–110-betlar) — infraqizil, ultrabinafsha va rentgen nurlanish, ularning qoʻllanilishi. */
export const FIZ_31: BoardLesson = {
  n: 31,
  label: '29',
  group: BOB4,
  title: 'Infraqizil, ultrabinafsha va rentgen nurlari',
  section: '29-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Televizor pulti tugmasini bossangiz, koʻzga koʻrinmaydigan nur televizorga buyruq yetkazadi. Yozda quyoshda terimiz qorayadi, shifoxonada esa suyaklarimiz suratga olinadi. Bularning hammasi koʻzimiz koʻrmaydigan elektromagnit nurlar: infraqizil, ultrabinafsha va rentgen.",
      easy: "Pult, quyosh qorayishi, rentgen — koʻrinmas nurlar.",
      draw: [
        { t: 'title', text: 'Koʻrinmas nurlar' },
        { t: 'icon', x: 16, y: 34, emoji: '📺', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🦴', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['pult — infraqizil', 'quyoshda qorayish — ultrabinafsha', 'suyak surati — rentgen'] }
      ],
      next: 'Infraqizil nurlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1800-yilda Gershel spektrning turli ranglari ostiga termometr qoʻyib, eng koʻp qizish qizil nurdan keyingi, koʻrinmas sohada ekanini topdi — infraqizil nurlar. Ular 700 nanometrdan 1 millimetrgacha. Ilonlar, piranyalar va chivinlar ularni sezadi. Infraqizil nurlar tungi koʻrish kameralari, termografiya, isitgichlar, pultlar, pullarni tekshirish va fizioterapiyada ishlatiladi.",
      easy: "Infraqizil: 700 nm – 1 mm; issiqlik nuri; pult, tungi kamera, isitgich.",
      draw: [
        { t: 'title', text: 'Infraqizil (Gershel, 1800)' },
        { t: 'icon', x: 14, y: 34, emoji: '🌡️', size: 'l' },
        { t: 'list', x: 28, y: 24, items: ['λ = 700 nm … 1 mm', 'qizdirilgan jismlar chiqaradi', 'tungi kamera, termografiya', 'pult, isitgich, fizioterapiya'] }
      ],
      next: 'Ultrabinafsha nurlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1801-yilda Ritter kumush xlorid binafsha nurdan keyingi koʻrinmas sohada tezroq parchalanishini koʻrdi — ultrabinafsha nurlar. Ular 400 dan 10 nanometrgacha. Asosiy manbasi — Quyosh, atmosferadagi ozon ularning koʻp qismini toʻsadi. Ultrabinafsha teriga qoramtir rang beradi, bakteriyalarni oʻldiradi: xona va suvni zararsizlantirish, qalbaki pul va hujjatlarni aniqlashda ishlatiladi.",
      easy: "Ultrabinafsha: 10–400 nm; dezinfeksiya, qalbaki pulni aniqlash.",
      draw: [
        { t: 'title', text: 'Ultrabinafsha (Ritter, 1801)' },
        { t: 'icon', x: 14, y: 34, emoji: '☀️', size: 'l' },
        { t: 'list', x: 28, y: 24, items: ['λ = 10 … 400 nm', 'manba — Quyosh, maxsus lampalar', 'ozon qatlami toʻsadi', 'dezinfeksiya, qalbaki pulni aniqlash'] }
      ],
      next: 'Rentgen nurlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1895-yil 8-noyabrda Vilgelm Rentgen katod-nurli trubka yaqinidagi ekran qorongʻida yorishganini koʻrdi va bu nurlarni X-nurlar deb atadi. Trubkada katoddan uchgan elektronlar anodga urilib keskin tormozlanadi va rentgen nurlari chiqadi; energiyaning faqat 1 foizi nurga, 99 foizi issiqlikka aylanadi. 1901-yilda Rentgen birinchi Nobel mukofotini oldi.",
      easy: "Rentgen nurlari: tez elektronlar anodda tormozlanganda chiqadi (1895).",
      draw: [
        { t: 'title', text: 'Rentgen trubkasi (1895)' },
        { t: 'list', x: 6, y: 22, items: ['katod qiziydi → elektronlar uchadi', 'kuchlanish ularni tezlatadi', 'anodga urilib tormozlanadi', '1 % → rentgen nuri, 99 % → issiqlik'] },
        { t: 'text', x: 6, y: 62, text: 'λ ≈ 0,005 … 100 nm', color: 'purple' }
      ],
      next: 'Rentgen qoʻllanilishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Rentgen nurlari tanadan oʻtadi, lekin aʼzolar ularni turlicha yutadi — shuning uchun suyak va ichki organlar surati olinadi, kompyuter tomografiyasi hajmiy tasvir beradi. Sanoatda relslar va payvand choklaridagi nuqsonlar topiladi — defektoskopiya. Aeroport va bojxonada yuklar tekshiriladi, olimlar esa DNK kabi moddalar tuzilishini oʻrganadi.",
      easy: "Tibbiyot, defektoskopiya, aeroport, modda tuzilishi.",
      draw: [
        { t: 'title', text: 'Rentgen nurlari qayerda?' },
        {
          t: 'table',
          x: 6,
          y: 22,
          rows: [
            ['nurlanish', 'λ oraligʻi', 'misol'],
            ['infraqizil', '0,7 μm – 1 mm', 'pult, isitgich'],
            ['koʻrinadigan', '380 – 760 nm', 'koʻz, kamera'],
            ['ultrabinafsha', '10 – 400 nm', 'dezinfeksiya'],
            ['rentgen', '0,005 – 100 nm', 'tibbiyot, bojxona']
          ]
        }
      ],
      next: 'Masala'
    },
    {
      kind: 'example',
      clear: true,
      say: "Rentgen nurining chastotasi 3 karra 10 ning 17 darajasi gers. Toʻlqin uzunligi: lambda teng c boʻlinsin nu — 3 karra 10 ning 8 darajasi boʻlinsin 3 karra 10 ning 17 darajasi, yaʼni 10 ning minus 9 darajasi metr — 1 nanometr. Bu koʻrinadigan nurdan taxminan 500 marta qisqa.",
      easy: "λ = c/ν = 3·10⁸ / 3·10¹⁷ = 10⁻⁹ m = 1 nm.",
      draw: [
        { t: 'title', text: 'Rentgen toʻlqin uzunligi' },
        { t: 'list', x: 6, y: 20, items: ['ν = 3 · 10¹⁷ Hz', 'c = 3 · 10⁸ m/s'] },
        { t: 'formula', x: 6, y: 46, text: 'λ = c / ν = 10⁻⁹ m = 1 nm' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Infraqizil nurlar (700 nm – 1 mm) — issiqlik nurlari: pult, tungi kamera, termografiya, isitgich.',
    'Ultrabinafsha nurlar (10–400 nm) teriga qoramtir rang beradi, bakteriyalarni oʻldiradi: dezinfeksiya, qalbaki pulni aniqlash.',
    'Rentgen nurlari tez elektronlar tormozlanganda chiqadi; tibbiyot, defektoskopiya va bojxonada ishlatiladi.'
  ],
  questions: [
    {
      id: 'f31q1',
      prompt: 'Toʻlqin uzunligi 10 μm boʻlgan infraqizil nurning chastotasi necha THz? (1 THz = 10¹² Hz)',
      hint: 'ν = c/λ.',
      explanation: '3·10⁸ / 10⁻⁵ = 3·10¹³ Hz = 30 THz.',
      widget: { type: 'number_answer', props: { answer: 30, unit: 'THz' } }
    },
    {
      id: 'f31q2',
      prompt: 'Chastotasi 1,5·10¹⁵ Hz boʻlgan ultrabinafsha nurning toʻlqin uzunligi necha nm?',
      hint: 'λ = c/ν.',
      explanation: '3·10⁸ / 1,5·10¹⁵ = 2·10⁻⁷ m = 200 nm.',
      widget: { type: 'number_answer', props: { answer: 200, unit: 'nm' } }
    },
    {
      id: 'f31q3',
      prompt: 'Nurlanishlarni toʻlqin uzunligi kamayishi tartibida joylang.',
      hint: 'Infraqizil eng uzun.',
      explanation: 'Infraqizil → koʻrinadigan → ultrabinafsha → rentgen.',
      widget: { type: 'order_line', props: { items: [{ label: 'infraqizil' }, { label: 'koʻrinadigan' }, { label: 'ultrabinafsha' }, { label: 'rentgen' }] } }
    },
    {
      id: 'f31q4',
      prompt: 'Qaysi biri eng kichik toʻlqin uzunligiga ega?',
      hint: 'Tanadan oʻtadigan nur.',
      explanation: 'Rentgen nurlari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['infraqizil', 'koʻrinadigan', 'ultrabinafsha', 'rentgen'], answerIndex: 3 } }
    },
    {
      id: 'f31q5',
      prompt: 'Qoʻllanilishni nur turiga ajrating.',
      hint: 'Issiqlik — infraqizil.',
      explanation: 'Pult, tungi kamera — infraqizil; dezinfeksiya, qalbaki pul — ultrabinafsha; suyak surati, bagaj — rentgen.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'i', label: 'Infraqizil' },
            { id: 'u', label: 'Ultrabinafsha' },
            { id: 'x', label: 'Rentgen' }
          ],
          items: [
            { emoji: '', label: 'televizor pulti', bin: 'i' },
            { emoji: '', label: 'tungi koʻrish kamerasi', bin: 'i' },
            { emoji: '', label: 'suvni zararsizlantirish', bin: 'u' },
            { emoji: '', label: 'qalbaki pulni aniqlash', bin: 'u' },
            { emoji: '', label: 'suyak surati', bin: 'x' },
            { emoji: '', label: 'aeroportda bagaj tekshiruvi', bin: 'x' }
          ]
        }
      }
    },
    {
      id: 'f31q6',
      prompt: 'Rentgen trubkasida elektronlar energiyasining necha foizi nurga aylanadi?',
      hint: 'Qolgani issiqlik.',
      explanation: 'Taxminan 1 %; 99 % issiqlikka aylanadi, shuning uchun anod sovitiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1 %', '50 %', '90 %', '99 %'], answerIndex: 0 } }
    },
    {
      id: 'f31q7',
      prompt: 'Kashfiyotchini nur bilan moslang.',
      hint: 'Gershel — termometr bilan.',
      explanation: 'Gershel — infraqizil (1800); Ritter — ultrabinafsha (1801); Rentgen — X-nurlar (1895).',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'Gershel, 1800' }, b: { label: 'infraqizil' } },
            { a: { label: 'Ritter, 1801' }, b: { label: 'ultrabinafsha' } },
            { a: { label: 'Rentgen, 1895' }, b: { label: 'X-nurlar' } }
          ]
        }
      }
    },
    {
      id: 'f31q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ozon — himoya qatlami.',
      explanation: 'Ozon UB ning koʻp qismini toʻsadi; Rentgen birinchi Nobel mukofotini olgan; IK nur ham elektromagnit toʻlqin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Atmosferadagi ozon ultrabinafsha nurlarning koʻp qismini toʻsadi.', value: true },
            { text: 'Rentgen 1901-yilda fizika boʻyicha birinchi Nobel mukofotini olgan.', value: true },
            { text: 'Infraqizil nurlar elektromagnit toʻlqin emas.', value: false },
            { text: 'Rentgen nurlari tanadagi barcha aʼzolardan bir xil oʻtadi.', value: false }
          ]
        }
      }
    }
  ]
};
