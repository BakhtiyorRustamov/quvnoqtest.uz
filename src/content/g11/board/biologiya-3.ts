import type { BoardLesson } from './types';

export const BOB2 = { kicker: '2-bob', title: 'Hayotning ekosistema darajasi' };

/** Darslik: Biologiya 11, 3-§ (14–18-betlar) — biogeotsenoz (Sukachev), biotsenoz va biotop, ekosistema (Tensli), ekosistemalarning oʻlchamlari. */
export const BIO_3: BoardLesson = {
  n: 3,
  label: '3',
  group: BOB2,
  title: 'Biogeotsenoz — biologik sistema',
  section: '3-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yer yuzida tirik jamoalar uchramaydigan joy deyarli yoʻq: choʻl, tundra, ekvator, okean, togʻ — hamma joyda hayot jamoa boʻlib yashaydi. Bunday jamoa va u yashaydigan joy birgalikda biogeotsenoz deyiladi: yunoncha bios — hayot, ge — yer, koinos — umumiy.",
      easy: "Biogeotsenoz = tirik jamoa + uning yashash joyi.",
      draw: [
        { t: 'title', text: 'Biogeotsenoz' },
        { t: 'icon', x: 16, y: 40, emoji: '🌲', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['bios — hayot', 'ge — yer', 'koinos — umumiy'] }
      ],
      next: 'Tuzilishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biogeotsenoz haqidagi taʼlimotni rus olimi V. N. Sukachev yaratgan. U ikki qismdan iborat: biotsenoz — oʻsimliklar, hayvonlar va mikroorganizmlar jamoasi, va biotop — tuproq, suv, atmosferadan iborat yashash sharoitlari. Ular moddalar va energiya almashinuvi orqali bogʻlangan.",
      easy: "Biogeotsenoz = biotsenoz (tirik) + biotop (notirik).",
      draw: [
        { t: 'title', text: 'Sukachev boʻyicha' },
        { t: 'box', id: 'bg', x: 30, y: 18, w: 36, h: 8, text: 'biogeotsenoz', color: 'green' },
        { t: 'box', id: 'bs', x: 6, y: 34, w: 36, h: 8, text: 'biotsenoz', color: 'blue' },
        { t: 'box', id: 'bt', x: 56, y: 34, w: 36, h: 8, text: 'biotop', color: 'orange' },
        { t: 'arrow', from: 'bg', to: 'bs' },
        { t: 'arrow', from: 'bg', to: 'bt' },
        { t: 'text', x: 6, y: 52, text: 'oʻsimlik, hayvon, mikrob', size: 's' },
        { t: 'text', x: 56, y: 52, text: 'tuproq, suv, havo', size: 's' }
      ],
      next: 'Xususiyatlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biogeotsenoz — ochiq, barqaror, oʻz-oʻzini boshqaradigan tizim. Unda uchta asosiy jarayon boradi: biomassa sintezlanadi, turlar soni boshqariladi, moddalar va energiya oqimi tizim barqarorligini taʼminlaydi. Biogeotsenozlarni ekologiyaning biogeotsenologiya boʻlimi oʻrganadi.",
      easy: "Ochiq, barqaror, oʻz-oʻzini boshqaradigan tizim.",
      draw: [
        { t: 'title', text: 'Biogeotsenoz jarayonlari' },
        { t: 'list', x: 4, y: 20, items: ['biomassa sintezi', 'turlar sonining boshqarilishi', 'moddalar va energiya oqimi'] },
        { t: 'text', x: 4, y: 50, text: 'misollar: togʻ oʻrmoni, adir, yaylov', color: 'green' }
      ],
      next: 'Ekosistema'
    },
    {
      kind: 'explain',
      clear: true,
      say: "«Ekosistema» atamasini 1935-yilda ingliz botanigi A. Tensli kiritgan. Ikki tushuncha yaqin, lekin farqi bor: biogeotsenoz — aniq chegarali tabiiy jamoa, uning nomi koʻp tur boʻyicha beriladi: archazor, yongʻoqzor. Ekosistema kengroq: har qanday biogeotsenoz — ekosistema, lekin har qanday ekosistema biogeotsenoz emas.",
      easy: "Har biogeotsenoz — ekosistema, lekin teskarisi emas.",
      draw: [
        { t: 'title', text: 'Ekosistema va biogeotsenoz' },
        { t: 'ellipse', cx: 40, cy: 44, rx: 30, ry: 18, color: 'blue' },
        { t: 'ellipse', cx: 40, cy: 48, rx: 15, ry: 9, color: 'green' },
        { t: 'text', x: 40, y: 32, text: 'ekosistema', anchor: 'middle', color: 'blue' },
        { t: 'text', x: 40, y: 50, text: 'biogeotsenoz', size: 's', anchor: 'middle', color: 'green' },
        { t: 'list', x: 74, y: 30, items: ['Tensli', '1935'] }
      ],
      next: 'Oʻlchamlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Ekosistemalar oʻlchami turlicha. Mikroekosistema — mikrobli suv tomchisi, chiriyotgan toʻnka, akvarium. Mezoekosistema — olmazor bogʻ, dala, hovuz, koʻl. Makroekosistema — okean, tayga, choʻl, togʻlar. Eng kattasi — global ekosistema, ya'ni biosfera.",
      easy: "Mikro (tomchi) → mezo (koʻl) → makro (okean) → global (biosfera).",
      draw: [
        { t: 'title', text: 'Ekosistemalar oʻlchami' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'misol'], ['mikro', 'suv tomchisi, akvarium'], ['mezo', 'bogʻ, hovuz, koʻl'], ['makro', 'okean, tayga, choʻl'], ['global', 'biosfera']] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biogeotsenoz (Sukachev) — biotsenoz (tirik organizmlar jamoasi) va biotop (yashash sharoitlari) birligidan iborat ochiq, barqaror tizim.',
    '«Ekosistema» atamasini 1935-yilda A. Tensli kiritgan; har qanday biogeotsenoz ekosistema, lekin har qanday ekosistema biogeotsenoz emas.',
    'Ekosistemalar mikro (tomchi), mezo (koʻl), makro (okean) va global (biosfera) boʻladi.'
  ],
  questions: [
    {
      id: 'b3q1',
      prompt: 'Biogeotsenoz qanday ikki qismdan iborat?',
      hint: 'Tirik va notirik qism.',
      explanation: 'Biotsenoz (tirik jamoa) va biotop (yashash sharoitlari).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['populatsiya va tur', 'biotsenoz va biotop', 'produtsent va konsument', 'tuproq va suv'], answerIndex: 1 } }
    },
    {
      id: 'b3q2',
      prompt: 'Ekosistemani oʻlchami boʻyicha ajrating.',
      hint: 'Akvarium — kichik.',
      explanation: 'Mikro: suv tomchisi, chiriyotgan toʻnka. Mezo: hovuz, olmazor. Makro: okean, tayga.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'mi', label: 'Mikro' },
            { id: 'me', label: 'Mezo' },
            { id: 'ma', label: 'Makro' }
          ],
          items: [
            { emoji: '', label: 'suv tomchisi', bin: 'mi' },
            { emoji: '', label: 'chiriyotgan toʻnka', bin: 'mi' },
            { emoji: '', label: 'hovuz', bin: 'me' },
            { emoji: '', label: 'olmazor bogʻ', bin: 'me' },
            { emoji: '', label: 'okean', bin: 'ma' },
            { emoji: '', label: 'tayga', bin: 'ma' }
          ]
        }
      }
    },
    {
      id: 'b3q3',
      prompt: '«Ekosistema» atamasini kim va qachon kiritgan?',
      hint: 'Ingliz botanigi.',
      explanation: 'A. Tensli, 1935-yil.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['E. Gekkel, 1866', 'A. Tensli, 1935', 'V. N. Sukachev, 1940', 'V. I. Vernadskiy, 1926'], answerIndex: 1 } }
    },
    {
      id: 'b3q4',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Biotop — joy.',
      explanation: 'Biotsenoz — tirik organizmlar jamoasi; biotop — yashash sharoitlari; biogeotsenoz — ikkalasi birgalikda; global ekosistema — biosfera.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'biotsenoz' }, b: { label: 'tirik jamoa' } },
            { a: { label: 'biotop' }, b: { label: 'yashash sharoitlari' } },
            { a: { label: 'global ekosistema' }, b: { label: 'biosfera' } },
            { a: { label: 'biogeotsenologiya' }, b: { label: 'biogeotsenozni oʻrganadi' } }
          ]
        }
      }
    },
    {
      id: 'b3q5',
      prompt: 'Biogeotsenozga koʻpincha qanday nom beriladi?',
      hint: 'Archazor, yongʻoqzor…',
      explanation: 'Unda son jihatdan koʻp uchraydigan tur boʻyicha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['kashf etgan olim nomi bilan', 'koʻp uchraydigan tur boʻyicha', 'maydoni boʻyicha', 'yoshiga qarab'], answerIndex: 1 } }
    },
    {
      id: 'b3q6',
      prompt: 'Biogeotsenozda boradigan asosiy jarayonlarni belgilang.',
      hint: 'Uchta jarayon.',
      explanation: 'Biomassa sintezi, turlar sonini boshqarish, moddalar va energiya oqimi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'biomassa sintezi', correct: true },
            { label: 'turlar sonining boshqarilishi', correct: true },
            { label: 'moddalar va energiya oqimi', correct: true },
            { label: 'yangi togʻ jinslari hosil boʻlishi' }
          ]
        }
      }
    },
    {
      id: 'b3q7',
      prompt: 'Qaysi biri biogeotsenoz emas?',
      hint: 'Uchtasi — tabiiy jamoa.',
      explanation: 'Akvarium — sunʼiy mikroekosistema; qolganlari tabiiy biogeotsenozlar.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'archazor oʻrmon' }, { text: 'adir' }, { text: 'akvarium', odd: true }, { text: 'togʻ yaylovi' }] } }
    },
    {
      id: 'b3q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Ekosistema — kengroq tushuncha.',
      explanation: 'Har biogeotsenoz — ekosistema; biogeotsenoz chegarasi oʻsimliklar jamoasi bilan belgilanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Har qanday biogeotsenozga ekosistema sifatida qarash mumkin.', value: true },
            { text: 'Biogeotsenoz — ochiq tizim.', value: true },
            { text: 'Har qanday ekosistema biogeotsenoz hisoblanadi.', value: false },
            { text: 'Biotop — tirik organizmlar yigʻindisi.', value: false }
          ]
        }
      }
    }
  ]
};
