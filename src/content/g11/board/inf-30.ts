import type { BoardLesson } from './types';

/** Darslik: 10.01–10.02 — video va audioni tahrirlash: tomonlar nisbati, aniqlik, kesish, oʻtish effektlari, matn, ovoz, siqish. */
export const INF_30: BoardLesson = {
  n: 30,
  label: '30',
  part: 10,
  title: 'Audio va video tahrirlash',
  section: '10.01–10.02',
  steps: [
    {
      kind: 'hook',
      say: "Maktab bayramiga bir daqiqalik video tayyorlaymiz. Video muharririda vaqt shkalasi bor: yuqorida video treki, pastda audio treki. Avval sarlavha slaydi, keyin ikki klip, ular orasida oʻtish effekti, ostida musiqa — boshida sekin balandlashib, oxirida sekin pasayadi. Oxirida mualliflar roʻyxati. Kuzating, video qanday yigʻiladi.",
      easy: "Vaqt shkalasida kliplar, matn va musiqa ketma-ket joylashtiriladi. Oxirida tayyor video eksport qilinadi.",
      draw: [],
      animTitle: 'Vaqt shkalasi',
      anim: {
        type: 'timeline',
        total: 60,
        tracks: [
          {
            label: 'Video',
            icon: '🎬',
            clips: [
              { start: 0, dur: 5, label: 'Sarlavha', color: '#8b5cf6' },
              { start: 5, dur: 22, label: 'Klip 1: sahna', color: '#0ea5e9' },
              { start: 27, dur: 25, label: 'Klip 2: raqs', color: '#f97316' },
              { start: 52, dur: 8, label: 'Mualliflar', color: '#64748b' }
            ]
          },
          { label: 'Audio', icon: '🎵', clips: [{ start: 0, dur: 60, label: 'Musiqa', color: '#22c55e', fadeIn: true, fadeOut: true }] }
        ]
      },
      next: 'Qanday boshlanadi?'
    },
    {
      kind: 'explain',
      say: "Loyiha boshida ikkita narsa sozlanadi. Tomonlar nisbati — ekran kengligi va balandligi nisbati: televizor va kompyuter uchun 16 ga 9, telefon hikoyalari uchun tik 9 ga 16, eski fotolar uchun 4 ga 3. Aniqlik — piksellar soni: 1920 ga 1080, yaʼni Full HD kadrida 2 million 73 ming 600 piksel. Shuningdek kadrlar tezligi — soniyasiga 25 yoki 30 kadr.",
      easy: "Nisbat — ekran shakli (16:9 yoki 9:16). Aniqlik — piksellar soni (1920×1080). Bular boshida tanlanadi.",
      draw: [],
      animTitle: 'Loyiha sozlamalari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '🖥️', title: '16:9', text: 'Televizor, kompyuter, YouTube' },
          { icon: '📱', title: '9:16', text: 'Telefon hikoyalari, qisqa videolar' },
          { icon: '🖼️', title: '4:3', text: 'Eski televizor va fotolar' },
          { icon: '🔲', title: '1920 × 1080', text: 'Full HD — 2 073 600 piksel' },
          { icon: '🎞️', title: 'Kadr tezligi', text: 'Soniyasiga 25–30 kadr' }
        ]
      },
      next: 'Tahrirlash amallari?'
    },
    {
      kind: 'explain',
      say: "Asosiy video amallari. Kesish — klip boshidagi va oxiridagi keraksiz qismni olib tashlash. Boʻlish — klipni ikkiga ajratish, oʻrtadagi qismni oʻchirish uchun. Birlashtirish — kliplarni shkalada yonma-yon qoʻyish. Oʻtish effekti — bir klipdan keyingisiga silliq oʻtish: xiralashib almashish yoki surilish. Matn — sarlavha, izoh va mualliflar. Filtr — rangni oʻzgartirish, masalan, oq-qora. Oxirida renderlash: hamma effektlar bitta tayyor faylga yigʻiladi.",
      easy: "Kesish, boʻlish, birlashtirish, oʻtish effekti, matn, filtr — keyin renderlash bilan tayyor fayl.",
      draw: [],
      animTitle: 'Video amallari',
      anim: {
        type: 'cards',
        cols: 3,
        items: [
          { icon: '✂️', title: 'Kesish', text: 'Boshi va oxirini qisqartirish' },
          { icon: '🔪', title: 'Boʻlish', text: 'Klipni ikkiga ajratish' },
          { icon: '🔗', title: 'Birlashtirish', text: 'Kliplarni yonma-yon qoʻyish' },
          { icon: '🌫️', title: 'Oʻtish effekti', text: 'Silliq almashish' },
          { icon: '🔤', title: 'Matn', text: 'Sarlavha, izoh, mualliflar' },
          { icon: '⚙️', title: 'Renderlash', text: 'Yakuniy faylni yaratish' }
        ]
      },
      next: 'Ovoz-chi?'
    },
    {
      kind: 'explain',
      say: "Audio tahrirlash amallari. Kesish va boʻlish — xuddi videodagidek. Sekin kuchayish va sekin pasayish — ovoz boshida asta balandlashadi, oxirida asta yoʻqoladi. Ovoz balandligini tenglashtirish — normallashtirish. Shovqinni kamaytirish — fondagi gʻuvillashni olib tashlash. Tezlik va ohangni oʻzgartirish. Bir nechta trekni aralashtirish — masalan, ovoz va fon musiqasi; bunda musiqa gapga xalaqit bermasligi uchun pasaytiriladi.",
      easy: "Audio: kesish, sekin kirish va chiqish, balandlikni tenglash, shovqinni yoʻqotish, treklarni aralashtirish.",
      draw: [],
      animTitle: 'Ovoz va musiqa treklari',
      anim: {
        type: 'timeline',
        total: 40,
        tracks: [
          {
            label: 'Ovoz',
            icon: '🎙️',
            clips: [
              { start: 3, dur: 14, label: 'Kirish soʻzi', color: '#0ea5e9' },
              { start: 22, dur: 14, label: 'Tabrik', color: '#0ea5e9' }
            ]
          },
          { label: 'Musiqa', icon: '🎵', clips: [{ start: 0, dur: 40, label: 'Fon (past)', color: '#22c55e', fadeIn: true, fadeOut: true }] }
        ]
      },
      next: 'Fayl katta boʻlsa-chi?'
    },
    {
      kind: 'example',
      say: "Tayyor video eksport qilinganda siqiladi. Hajm aniqlik, kadr tezligi va bit tezligiga bogʻliq. Bir daqiqalik video: 4K da — taxminan 350 megabayt, Full HD da — 130, 720p da — 60, telefonda yuborish uchun 480p da — 25 megabayt atrofida. Kichikroq fayl tez yuklanadi va kam joy egallaydi, lekin sifati pasayadi. Shuning uchun format qurilma va maqsadga qarab tanlanadi.",
      easy: "Aniqlik qancha past boʻlsa, fayl shuncha kichik, lekin sifat ham past. Maqsadga qarab tanlanadi.",
      draw: [],
      animTitle: '1 daqiqalik video hajmi (taxminan, MB)',
      anim: { type: 'chart', kind: 'bar', labels: ['4K', '1080p', '720p', '480p'], values: [350, 130, 60, 25], unit: 'MB' },
      next: 'Mashqqa oʻtamiz'
    }
  ],
  summary: [
    'Loyiha boshida tomonlar nisbati (16:9, 9:16, 4:3), aniqlik (1920×1080) va kadr tezligi tanlanadi.',
    'Video amallari: kesish, boʻlish, birlashtirish, oʻtish effekti, matn, filtr, renderlash.',
    'Audio amallari: kesish, sekin kuchayish va pasayish, normallashtirish, shovqinni kamaytirish, treklarni aralashtirish.',
    'Eksportda video siqiladi: aniqlik va bit tezligi qancha past boʻlsa, fayl shuncha kichik, sifat ham past.'
  ],
  questions: [
    {
      id: 'i30q1',
      prompt: 'Amalni natijasi bilan juftlang.',
      hint: 'Qisqartirish, ajratish, silliq almashish…',
      explanation: 'Kesish — boshi va oxirini olib tashlash; boʻlish — ikkiga ajratish; oʻtish effekti — kliplar orasidagi silliq almashish; renderlash — yakuniy fayl.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Kesish' }, right: { label: 'boshi va oxirini olib tashlash' } },
            { left: { label: 'Boʻlish' }, right: { label: 'klipni ikkiga ajratish' } },
            { left: { label: 'Oʻtish effekti' }, right: { label: 'kliplar orasida silliq almashish' } },
            { left: { label: 'Renderlash' }, right: { label: 'yakuniy faylni yaratish' } }
          ]
        }
      }
    },
    {
      id: 'i30q2',
      prompt: 'Qurilmaga mos tomonlar nisbatini juftlang.',
      hint: 'Ekran shakli.',
      explanation: 'Televizor — 16:9; telefon hikoyasi — 9:16; eski televizor — 4:3.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'Zamonaviy televizor' }, right: { label: '16:9' } },
            { left: { label: 'Telefondagi tik video' }, right: { label: '9:16' } },
            { left: { label: 'Eski televizor' }, right: { label: '4:3' } }
          ]
        }
      }
    },
    {
      id: 'i30q3',
      prompt: '1280 × 720 kadrda nechta piksel bor?',
      hint: 'Koʻpaytiring.',
      explanation: '1280 × 720 = 921 600 piksel.',
      widget: { type: 'number_answer', props: { answer: 921600, unit: 'piksel' } }
    },
    {
      id: 'i30q4',
      prompt: 'Video yoki audio amali?',
      hint: 'Tasvir bilanmi yoki ovoz bilanmi?',
      explanation: 'Filtr, oʻtish effekti, sarlavha — video. Shovqinni kamaytirish, sekin pasayish, normallashtirish — audio.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'v', label: 'Video' },
            { id: 'a', label: 'Audio' }
          ],
          tiles: [
            { id: 't1', label: 'Oq-qora filtr', bin: 'v' },
            { id: 't2', label: 'Shovqinni kamaytirish', bin: 'a' },
            { id: 't3', label: 'Oʻtish effekti', bin: 'v' },
            { id: 't4', label: 'Sekin pasayish', bin: 'a' },
            { id: 't5', label: 'Sarlavha slaydi', bin: 'v' },
            { id: 't6', label: 'Normallashtirish', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'i30q5',
      prompt: 'Video tayyorlash bosqichlarini tartiblang.',
      hint: 'Sozlashdan eksportgacha.',
      explanation: 'Nisbat va aniqlik sozlanadi ➜ kliplar import qilinadi ➜ kesilib birlashtiriladi ➜ effekt, matn va musiqa qoʻshiladi ➜ renderlanib eksport qilinadi.',
      widget: {
        type: 'step_order',
        props: { steps: ['Nisbat va aniqlikni sozlash', 'Kliplarni import qilish', 'Kesish va birlashtirish', 'Effekt, matn va musiqa qoʻshish', 'Renderlab eksport qilish'] }
      }
    },
    {
      id: 'i30q6',
      prompt: 'Toʻgʻri yoki notoʻgʻri?',
      hint: 'Aniqlik pasaysa hajm nima boʻladi?',
      explanation: 'Aniqlik pasaysa hajm kamayadi; Full HD — 1920×1080; fon musiqasi gapda pasaytiriladi; renderlashdan oldin effektlar alohida turadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Aniqlik pasaysa, video fayl hajmi ham kamayadi.', value: true },
            { text: 'Full HD aniqligi 1280 × 720.', value: false },
            { text: 'Gap paytida fon musiqasi pasaytiriladi.', value: true },
            { text: 'Telefon hikoyalari uchun 16:9 eng mos nisbat.', value: false }
          ]
        }
      }
    },
    {
      id: 'i30q7',
      prompt: 'Videoni messenjerda tez yuborish uchun qaysi sozlamalar mos? Bosing.',
      hint: 'Kichik hajm kerak.',
      explanation: '480p yoki 720p aniqlik va pastroq bit tezligi hajmni kamaytiradi. 4K va eng yuqori bit tezligi — katta fayl.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: '720p aniqlik', match: true },
            { id: 'b', text: 'Pastroq bit tezligi', match: true },
            { id: 'c', text: '4K aniqlik', match: false },
            { id: 'd', text: 'Siqishsiz eksport', match: false }
          ]
        }
      }
    },
    {
      id: 'i30q8',
      prompt: 'Qaysi biri audio tahrirlash amali emas?',
      hint: 'Uchtasi ovoz bilan ishlaydi.',
      explanation: 'Tomonlar nisbati — video sozlamasi. Qolganlari audio amallari.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'Sekin kuchayish' }, { text: 'Shovqinni kamaytirish' }, { text: 'Treklarni aralashtirish' }, { text: 'Tomonlar nisbati', odd: true }] } }
    },
    {
      id: 'i30q9',
      prompt: 'Bir daqiqalik 720p video 60 MB. 3 daqiqalik xuddi shunday video qancha boʻladi?',
      hint: '60 × 3',
      explanation: '60 × 3 = 180 MB.',
      widget: { type: 'number_answer', props: { answer: 180, unit: 'MB' } }
    },
    {
      id: 'i30q10',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Boshida va oxirida.',
      explanation: 'Musiqa boshida sekin kuchayadi, oxirida sekin pasayadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Musiqa boshida sekin' }, { blank: 'kuchayadi' }, { text: ', oxirida esa sekin' }, { blank: 'pasayadi' }, { text: '.' }],
          bank: ['kuchayadi', 'pasayadi', 'boʻlinadi']
        }
      }
    }
  ]
};
