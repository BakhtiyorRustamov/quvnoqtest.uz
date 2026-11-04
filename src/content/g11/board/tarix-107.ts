import type { BoardLesson } from './types';
import { JH2 } from './tarix-104';

/** Darslik: Jahon tarixi 11, 7-mavzu (33–38-betlar) — Kavkazorti davlatlari: Ozarbayjon, Gruziya, Armaniston; Togʻli Qorabogʻ masalasi, «Atirgullar inqilobi». */
export const TARIX_107: BoardLesson = {
  n: 107,
  label: '7',
  group: JH2,
  title: 'Kavkazorti davlatlari',
  section: 'Jahon tarixi, 7-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Kavkazorti — Ozarbayjon, Gruziya va Armaniston. Uchalasi ham 1991-yilda mustaqil boʻldi: Gruziya 9-aprelda, Armaniston sentabrdagi referendumdan keyin, Ozarbayjon 18-oktabrda. Mintaqaning eng ogʻir muammosi — Togʻli Qorabogʻ: Ozarbayjon hududidagi, asosan armanlar yashaydigan avtonom viloyat rahbarlari 1980-yillar oxirida uni Armanistonga qoʻshishni soʻragach, ikki xalq oʻrtasida keskin mojaro boshlandi. Ozarbayjonda 1993-yildan Geydar Aliyev prezident boʻlib, vaziyatni yumshatdi va faol janglar toʻxtadi; 2003-yildan oʻgʻli Ilhom Aliyev prezident. Armanistonning birinchi prezidenti Levon Ter-Petrosyan boʻldi.",
      easy: "1991 — uchala davlat mustaqil; asosiy muammo — Togʻli Qorabogʻ.",
      draw: [
        { t: 'title', text: 'Kavkazorti' },
        { t: 'table', x: 4, y: 18, rows: [['davlat', '1991-yil', 'rahbar'], ['Gruziya', '9-aprel', 'Z. Gamsaxurdiya'], ['Armaniston', 'sentabr', 'L. Ter-Petrosyan'], ['Ozarbayjon', '18-oktabr', 'G. Aliyev']] },
        { t: 'text', x: 4, y: 54, text: 'Asosiy mojaro: Togʻli Qorabogʻ', size: 's', color: 'red' }
      ],
      next: 'Gruziya yoʻli'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Gruziyada birinchi prezident Zviad Gamsaxurdiya davrida millatlararo munosabatlar keskinlashdi, Tbilisida janglar boʻlib, u hokimiyatdan chetlatildi. Keyin hokimiyat Eduard Shevardnadzega oʻtdi. 2003-yilgi parlament saylovlaridan keyin namoyishlar natijasida u isteʼfoga chiqdi — bu «Atirgullar inqilobi» deb ataldi va prezident Mixail Saakashvili boʻldi. U soliqlarni kamaytirish, xususiylashtirish va korrupsiyaga qarshi kurash islohotlarini oʻtkazdi. 2008-yil avgustdagi harbiy toʻqnashuvdan keyin Rossiya Abxaziya va Janubiy Osetiya mustaqilligini tan oldi. 2012-yildan «Gruziya orzusi» partiyasi hokimiyatda.",
      easy: "Gruziya: Gamsaxurdiya → Shevardnadze → «Atirgullar inqilobi» (2003) → Saakashvili → «Gruziya orzusi» (2012).",
      draw: [
        { t: 'title', text: 'Gruziyada hokimiyat' },
        { t: 'box', id: 'a', x: 4, y: 20, w: 28, h: 10, text: 'Gamsaxurdiya', color: 'blue' },
        { t: 'box', id: 'b', x: 36, y: 20, w: 28, h: 10, text: 'Shevardnadze', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 20, w: 28, h: 10, text: 'Saakashvili', color: 'green' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c', label: '2003' },
        { t: 'text', x: 4, y: 44, text: '2003 — «Atirgullar inqilobi»', size: 's' },
        { t: 'text', x: 4, y: 52, text: '2012 — «Gruziya orzusi» gʻolib', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Gruziya, Armaniston va Ozarbayjon 1991-yilda mustaqil boʻldi; mintaqaning eng ogʻir muammosi — Togʻli Qorabogʻ mojarosi.',
    'Ozarbayjonda 1993-yildan G. Aliyev barqarorlikni taʼminladi, 2003-yildan I. Aliyev prezident; Armaniston Rossiyaga tayanadi.',
    'Gruziyada 2003-yilgi «Atirgullar inqilobi»dan keyin M. Saakashvili islohotlar oʻtkazdi; 2008-yilgi toʻqnashuvdan soʻng Rossiya Abxaziya va Janubiy Osetiyani tan oldi.'
  ],
  questions: [
    {
      id: 'j7q1',
      prompt: 'Davlatni mustaqillik eʼlon qilingan sana bilan juftlang.',
      hint: 'Gruziya — bahorda.',
      explanation: 'Gruziya — 1991-yil 9-aprel; Armaniston — 1991-yil sentabr; Ozarbayjon — 1991-yil 18-oktabr.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Gruziya', right: '1991-yil 9-aprel' },
            { left: 'Armaniston', right: '1991-yil sentabr' },
            { left: 'Ozarbayjon', right: '1991-yil 18-oktabr' }
          ]
        }
      }
    },
    {
      id: 'j7q2',
      prompt: 'Gruziyadagi rahbarlarni tartib boʻyicha joylashtiring.',
      hint: 'Birinchi prezident — Gamsaxurdiya.',
      explanation: 'Z. Gamsaxurdiya → E. Shevardnadze → M. Saakashvili → G. Margvelashvili.',
      widget: { type: 'order_line', props: { items: [{ label: 'Z. Gamsaxurdiya' }, { label: 'E. Shevardnadze' }, { label: 'M. Saakashvili' }, { label: 'G. Margvelashvili' }] } }
    },
    {
      id: 'j7q3',
      prompt: '2003-yilda Gruziyadagi hokimiyat almashinuvi qanday nom olgan?',
      hint: 'Gul nomi.',
      explanation: '«Atirgullar inqilobi».',
      widget: { type: 'mcq', props: { prompt: '', choices: ['«Lolalar inqilobi»', '«Atirgullar inqilobi»', '«Aprel inqilobi»', '«Yevromaydan»'], answerIndex: 1 } }
    },
    {
      id: 'j7q4',
      prompt: 'Ozarbayjon va Armaniston oʻrtasidagi asosiy mojaro qaysi hudud bilan bogʻliq?',
      hint: 'Avtonom viloyat.',
      explanation: 'Togʻli Qorabogʻ.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Abxaziya', 'Janubiy Osetiya', 'Togʻli Qorabogʻ', 'Dnestrboʻyi'], answerIndex: 2 } }
    },
    {
      id: 'j7q5',
      prompt: 'M. Saakashvili hukumatining islohotlarini tanlang.',
      hint: 'Iqtisod va korrupsiya.',
      explanation: 'Soliqlarni kamaytirish, davlat mulkini xususiylashtirish, korrupsiyaga qarshi kurash.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'soliqlarni kamaytirish', correct: true },
            { label: 'davlat mulkini xususiylashtirish', correct: true },
            { label: 'korrupsiyaga qarshi kurash', correct: true },
            { label: 'MDHga qaytish' }
          ]
        }
      }
    },
    {
      id: 'j7q6',
      prompt: 'Faktni davlatga ajrating.',
      hint: 'Aliyevlar — Ozarbayjon.',
      explanation: 'Ozarbayjon — neft va gaz, Aliyevlar; Gruziya — «Atirgullar inqilobi», «Gruziya orzusi»; Armaniston — Ter-Petrosyan, Rossiyaga tayanish.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'o', label: 'Ozarbayjon' }, { id: 'g', label: 'Gruziya' }, { id: 'a', label: 'Armaniston' }],
          items: [
            { emoji: '🛢️', label: 'katta neft va gaz zaxiralari', bin: 'o' },
            { emoji: '👤', label: 'G. Aliyev', bin: 'o' },
            { emoji: '🌹', label: '«Atirgullar inqilobi»', bin: 'g' },
            { emoji: '🗳️', label: '«Gruziya orzusi» partiyasi', bin: 'g' },
            { emoji: '🏛️', label: 'L. Ter-Petrosyan', bin: 'a' },
            { emoji: '🤝', label: 'Rossiya — asosiy ittifoqchi', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'j7q7',
      prompt: 'Ilhom Aliyev Ozarbayjon prezidenti qaysi yilda boʻlgan?',
      hint: 'Otasi vafotidan keyin.',
      explanation: '2003-yilda.',
      widget: { type: 'number_answer', props: { answer: 2003, unit: 'yil' } }
    },
    {
      id: 'j7q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: '2008 — harbiy toʻqnashuv.',
      explanation: '2008-yildan keyin Rossiya Abxaziya va Janubiy Osetiyani tan olgan; Armaniston Rossiyani mintaqadagi asosiy ittifoqchi deb biladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '2008-yildan keyin Rossiya Abxaziya va Janubiy Osetiya mustaqilligini tan olgan.', value: true },
            { text: 'Armaniston uchun Rossiya mintaqadagi asosiy ittifoqchi hisoblanadi.', value: true },
            { text: 'Togʻli Qorabogʻ masalasi toʻliq hal qilingan.', value: false },
            { text: 'E. Shevardnadze «Atirgullar inqilobi» natijasida hokimiyatga kelgan.', value: false }
          ]
        }
      }
    }
  ]
};
