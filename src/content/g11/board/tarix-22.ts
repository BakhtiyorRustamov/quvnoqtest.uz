import type { BoardLesson } from './types';
import { UZ9 } from './tarix-21';

/** Darslik: Oʻzbekiston tarixi 11, 22-mavzu (136–140-betlar) — Mustaqil Davlatlar Hamdoʻstligi, xalqaro moliyaviy tashkilotlar, Shanxay Hamkorlik Tashkiloti. */
export const TARIX_22: BoardLesson = {
  n: 22,
  label: '22',
  group: UZ9,
  title: 'Mintaqaviy tashkilotlar doirasidagi hamkorlik',
  section: 'Oʻzbekiston tarixi, 22-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Sovet davrida respublikalar iqtisodiy jihatdan bir-biriga qattiq bogʻlangan edi, shuning uchun mustaqillikdan keyin ular hamkorlikni yangi shaklda davom ettirishga qaror qildi. 1991-yil 8-dekabrda Belarus, Rossiya va Ukraina Minskda Mustaqil Davlatlar Hamdoʻstligiga — MDHga asos soldi, 21-dekabrda Olmaotada Oʻzbekiston va boshqa davlatlar unga qoʻshildi. 1993-yilda MDH Nizomi qabul qilindi. Bugun MDHda 10 aʼzo va kuzatuvchi Turkmaniston bor.",
      easy: "MDH: 1991-yil 8-dekabr Minsk, 21-dekabr Olmaota; 10 aʼzo + kuzatuvchi Turkmaniston.",
      draw: [
        { t: 'title', text: 'MDH' },
        { t: 'box', id: 'a', x: 4, y: 22, w: 28, h: 10, text: 'Minsk, 8-dekabr', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 22, w: 28, h: 10, text: 'Olmaota, 21-dekabr', color: 'green' },
        { t: 'box', id: 'c', x: 68, y: 22, w: 28, h: 10, text: 'Nizom, 1993', color: 'orange' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'text', x: 4, y: 48, text: 'bugun: 10 aʼzo + kuzatuvchi Turkmaniston', size: 's' }
      ],
      next: 'Shanxay Hamkorlik Tashkiloti'
    },
    {
      kind: 'explain',
      clear: true,
      say: "1996-yilda Xitoy, Rossiya, Qozogʻiston, Qirgʻiziston va Tojikiston «Shanxay beshligi»ni tuzdi. 2001-yilda Oʻzbekiston toʻla huquqli aʼzo boʻlib qoʻshildi va tashkilot Shanxay Hamkorlik Tashkiloti — ShHT deb nomlandi; terrorchilik, ayirmachilik va ekstremizmga qarshi konvensiya imzolandi. ShHT Yevroosiyo hududining 61 foizini egallaydi, shtab-kvartirasi Pekinda, rasmiy tillari rus va xitoy. 2004-yilda Toshkentda ShHT sammiti oʻtdi, 2017-yilda Hindiston va Pokiston aʼzo boʻldi.",
      easy: "1996 — «Shanxay beshligi»; 2001 — Oʻzbekiston qoʻshilib, ShHT tuzildi; shtab-kvartira — Pekin.",
      draw: [
        { t: 'title', text: 'ShHT' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1996', '«Shanxay beshligi»'], ['2001', 'Oʻzbekiston qoʻshildi — ShHT'], ['2004', 'Toshkent sammiti'], ['2017', 'Hindiston va Pokiston aʼzo']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'MDH 1991-yil 8-dekabrda Minskda tuzildi, 21-dekabrda Olmaotada Oʻzbekiston qoʻshildi; 1993-yilda Nizom qabul qilindi; bugun 10 aʼzo va kuzatuvchi Turkmaniston.',
    'Oʻzbekiston Jahon banki, Xalqaro valuta fondi kabi moliyaviy tashkilotlar bilan hamkorlikni kengaytirmoqda.',
    '1996-yilgi «Shanxay beshligi»ga 2001-yilda Oʻzbekiston qoʻshilib, ShHT tuzildi; shtab-kvartirasi Pekinda, Yevroosiyoning 61 % hududini egallaydi.'
  ],
  questions: [
    {
      id: 't22q1',
      prompt: 'Voqealarni xronologik tartibda joylashtiring.',
      hint: 'Minsk — Olmaotadan oldin.',
      explanation: 'MDHga Minskda asos solindi (1991-yil 8-dekabr) → Olmaota uchrashuvi (21-dekabr) → MDH Nizomi (1993) → ShHT tuzildi (2001).',
      widget: { type: 'order_line', props: { items: [{ label: 'Minskda MDHga asos solindi' }, { label: 'Olmaotada Oʻzbekiston qoʻshildi' }, { label: 'MDH Nizomi qabul qilindi' }, { label: 'ShHT tuzildi' }] } }
    },
    {
      id: 't22q2',
      prompt: 'ShHT Yevroosiyo hududining necha foizini egallaydi?',
      hint: 'Yarmidan koʻp.',
      explanation: '61 %.',
      widget: { type: 'number_answer', props: { answer: 61, unit: '%' } }
    },
    {
      id: 't22q3',
      prompt: 'Tashkilotni maʼlumot bilan juftlang.',
      hint: 'Pekin — ShHT.',
      explanation: 'MDH — 1991-yilda tuzilgan; ShHT — shtab-kvartirasi Pekinda; «Shanxay beshligi» — 1996-yil.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'MDH', right: '1991-yil, Minsk' },
            { left: 'ShHT', right: 'shtab-kvartira — Pekin' },
            { left: '«Shanxay beshligi»', right: '1996-yil' }
          ]
        }
      }
    },
    {
      id: 't22q4',
      prompt: 'Oʻzbekiston qoʻshilgach «Shanxay forumi» qanday nomlandi?',
      hint: 'Hamkorlik.',
      explanation: 'Shanxay Hamkorlik Tashkiloti — ShHT.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Shanxay oltiligi»', 'Shanxay Hamkorlik Tashkiloti', 'Yevroosiyo ittifoqi', 'Markaziy Osiyo hamdoʻstligi'], answerIndex: 1 } }
    },
    {
      id: 't22q5',
      prompt: '«Shanxay beshligi» aʼzolarini tanlang.',
      hint: 'Oʻzbekiston keyin qoʻshilgan.',
      explanation: 'Xitoy, Rossiya, Qozogʻiston, Qirgʻiziston, Tojikiston.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Xitoy', correct: true },
            { label: 'Rossiya', correct: true },
            { label: 'Qozogʻiston', correct: true },
            { label: 'Qirgʻiziston', correct: true },
            { label: 'Tojikiston', correct: true },
            { label: 'Turkmaniston' }
          ]
        }
      }
    },
    {
      id: 't22q6',
      prompt: 'ShHTning rasmiy tillari qaysilar?',
      hint: 'Ikki yirik aʼzo.',
      explanation: 'Rus va xitoy tillari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ingliz va fransuz', 'rus va xitoy', 'oʻzbek va qozoq', 'arab va fors'], answerIndex: 1 } }
    },
    {
      id: 't22q7',
      prompt: 'MDHda Turkmanistonning maqomi qanday?',
      hint: '2005-yildan.',
      explanation: 'Kuzatuvchi (tashkiliy aʼzo).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['toʻla aʼzo', 'kuzatuvchi', 'raislik qiluvchi', 'aʼzo emas va kuzatuvchi ham emas'], answerIndex: 1 } }
    },
    {
      id: 't22q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2004 — Toshkent sammiti.',
      explanation: '2004-yilda ShHT sammiti Toshkentda oʻtgan; 2017-yilda Hindiston va Pokiston ShHTga aʼzo boʻlgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '2004-yilda ShHT sammiti Toshkentda oʻtgan.', value: true },
            { text: '2017-yilda Hindiston va Pokiston ShHTga aʼzo boʻlgan.', value: true },
            { text: 'MDHga 1995-yilda asos solingan.', value: false },
            { text: 'ShHTning shtab-kvartirasi Moskvada.', value: false }
          ]
        }
      }
    }
  ]
};
