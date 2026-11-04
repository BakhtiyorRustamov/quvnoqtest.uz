import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 17-§ (100–102-betlar) — biomassa (fitomassa, zoomassa), biologik mahsuldorlik, birlamchi va ikkilamchi mahsulot, «1 % qoidasi». */
export const BIO_17: BoardLesson = {
  n: 17,
  label: '17',
  group: BOB2,
  title: 'Ekotizimlarning mahsuldorligi',
  section: '17-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Tropik oʻrmonda 1 kvadrat metr yer yiliga 2200 gramm quruq organik modda beradi, tundrada 140, okeanda 125, choʻlda esa atigi 3 gramm. Nega farq bunchalik katta? Buni ekotizim mahsuldorligi tushuntiradi.",
      easy: "Tropik oʻrmon — 2200 g/m², choʻl — 3 g/m² yiliga.",
      draw: [
        { t: 'title', text: 'Yillik mahsuldorlik, g/m²' },
        { t: 'bars', x: 6, y: 18, w: 70, h: 38, items: [{ label: 'tropik', value: 2200 }, { label: 'tundra', value: 140 }, { label: 'okean', value: 125 }, { label: 'choʻl', value: 3 }] }
      ],
      next: 'Biomassa'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekotizimdagi barcha tirik organizmlarning umumiy massasi — biomassa. Oʻsimliklar biomassasi — fitomassa, hayvonlarniki — zoomassa. Quruqlikda u maydon birligiga quruq modda bilan oʻlchanadi: gramm boʻlinsin kvadrat metr, kilogramm boʻlinsin gektar; suvda — hajm birligiga.",
      easy: "Biomassa = fitomassa + zoomassa; g/m², kg/ga.",
      draw: [
        { t: 'title', text: 'Biomassa' },
        { t: 'box', id: 'b', x: 30, y: 20, w: 36, h: 8, text: 'biomassa', color: 'green' },
        { t: 'box', id: 'f', x: 6, y: 38, w: 36, h: 8, text: 'fitomassa' },
        { t: 'box', id: 'z', x: 54, y: 38, w: 36, h: 8, text: 'zoomassa' },
        { t: 'arrow', from: 'b', to: 'f' },
        { t: 'arrow', from: 'b', to: 'z' },
        { t: 'text', x: 6, y: 58, text: 'birligi: g/m², kg/ga, t/km²', color: 'purple' }
      ],
      next: 'Mahsuldorlik'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Biomassa va mahsuldorlik — har xil narsa. Mahsuldorlik — organik modda hosil boʻlish tezligi: vaqt birligida maydon yoki hajm birligida hosil boʻlgan biomassa. Oʻrmonda biomassa katta, lekin yillik oʻsish undan ancha kam. Hovuzda fitoplankton biomassasi kichik, lekin tez koʻpaygani uchun mahsuldorligi yuqori.",
      easy: "Biomassa — qancha bor; mahsuldorlik — qancha tez hosil boʻladi.",
      draw: [
        { t: 'title', text: 'Biomassa va mahsuldorlik' },
        { t: 'table', x: 4, y: 20, rows: [['ekotizim', 'biomassa', 'mahsuldorlik'], ['oʻrmon', 'katta', 'nisbatan kichik'], ['hovuz', 'kichik', 'yuqori']] }
      ],
      next: 'Birlamchi va ikkilamchi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Produtsentlar fotosintez yoki xemosintezda hosil qilgan biomassa — birlamchi mahsulot. Konsumentlar va redutsentlar hosil qilgan biomassa — ikkilamchi mahsulot. Birlamchi mahsuldorlik — ekotizimning eng muhim xususiyati: undagi energiya barcha konsumentlar va redutsentlarga sarflanadi.",
      easy: "Birlamchi — produtsentlar; ikkilamchi — konsumentlar va redutsentlar.",
      draw: [
        { t: 'title', text: 'Ikki xil mahsulot' },
        { t: 'box', id: 'p', x: 4, y: 24, w: 40, h: 8, text: 'birlamchi', color: 'green' },
        { t: 'box', id: 's', x: 54, y: 24, w: 40, h: 8, text: 'ikkilamchi', color: 'orange' },
        { t: 'arrow', from: 'p', to: 's' },
        { t: 'text', x: 4, y: 42, text: 'produtsentlar', size: 's' },
        { t: 'text', x: 54, y: 42, text: 'konsumentlar, redutsentlar', size: 's' }
      ],
      next: '1 % qoidasi'
    },
    {
      kind: 'example',
      clear: true,
      say: "Oʻsimlikka tushgan quyosh energiyasining faqat 1 foizi xlorofill tomonidan ushlanib, organik modda bogʻlariga aylanadi. Qolgan 99 foizi qaytariladi, issiqlikka aylanadi yoki suv bugʻlatishga sarflanadi. Bu — «1 foiz qoidasi». Masalan, 100 ming kilojoul quyosh energiyasidan oʻsimlikda 1000 kilojoul toʻplanadi.",
      easy: "1 % qoidasi: quyosh energiyasining 1 % i organik moddaga oʻtadi.",
      draw: [
        { t: 'title', text: '1 % qoidasi' },
        { t: 'icon', x: 12, y: 36, emoji: '☀️', size: 'l' },
        { t: 'formula', x: 26, y: 30, text: '100 000 kJ → 1 000 kJ' },
        { t: 'list', x: 26, y: 40, items: ['1 % — organik modda', '99 % — issiqlik, bugʻlanish'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Biomassa — ekotizimdagi barcha tirik organizmlar massasi (fitomassa + zoomassa), g/m² yoki kg/ga bilan oʻlchanadi.',
    'Mahsuldorlik — organik modda hosil boʻlish tezligi; birlamchi mahsulot produtsentlardan, ikkilamchi — konsument va redutsentlardan.',
    '«1 % qoidasi»: quyosh energiyasining taxminan 1 % i organik modda energiyasiga aylanadi.'
  ],
  questions: [
    {
      id: 'b17q1',
      prompt: 'Oʻsimlik 50 000 kJ quyosh energiyasi oldi. «1 % qoidasi» boʻyicha organik moddada qancha energiya toʻplanadi?',
      hint: '50 000 · 0,01.',
      explanation: '500 kJ.',
      widget: { type: 'number_answer', props: { answer: 500, unit: 'kJ' } }
    },
    {
      id: 'b17q2',
      prompt: 'Ekotizimlarni yillik mahsuldorligi boʻyicha kattasidan kichigiga tartiblang.',
      hint: 'Tropik — 2200, choʻl — 3 g/m².',
      explanation: 'Tropik oʻrmon (2200) → tundra (140) → okean (125) → choʻl (3).',
      widget: { type: 'order_line', props: { items: [{ label: 'tropik oʻrmon' }, { label: 'tundra' }, { label: 'okean' }, { label: 'choʻl' }] } }
    },
    {
      id: 'b17q3',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Fito- — oʻsimlik.',
      explanation: 'Fitomassa — oʻsimliklar biomassasi; zoomassa — hayvonlar biomassasi; birlamchi mahsulot — produtsentlar hosil qilgani; ikkilamchi — konsumentlar hosil qilgani.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'fitomassa' }, b: { label: 'oʻsimliklar biomassasi' } },
            { a: { label: 'zoomassa' }, b: { label: 'hayvonlar biomassasi' } },
            { a: { label: 'birlamchi mahsulot' }, b: { label: 'produtsentlar hosil qilgan' } },
            { a: { label: 'ikkilamchi mahsulot' }, b: { label: 'konsumentlar hosil qilgan' } }
          ]
        }
      }
    },
    {
      id: 'b17q4',
      prompt: 'Biologik mahsuldorlik nimani bildiradi?',
      hint: 'Tezlik.',
      explanation: 'Organik modda hosil boʻlish tezligini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['organizmlar sonini', 'organik modda hosil boʻlish tezligini', 'tirik moddaning umumiy massasini', 'turlar sonini'], answerIndex: 1 } }
    },
    {
      id: 'b17q5',
      prompt: 'Quyosh energiyasining qancha qismi qaytariladi yoki issiqlikka aylanadi?',
      hint: '1 % — organik modda.',
      explanation: '99 %.',
      widget: { type: 'number_answer', props: { answer: 99, unit: '%' } }
    },
    {
      id: 'b17q6',
      prompt: 'Hovuzda fitoplankton biomassasi kichik boʻlsa ham mahsuldorligi yuqori. Sababi?',
      hint: 'Ular juda tez koʻpayadi.',
      explanation: 'Fitoplankton tez koʻpayib, katta tezlikda organik modda hosil qiladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tez koʻpayadi', 'katta oʻlchamli', 'uzoq yashaydi', 'fotosintez qilmaydi'], answerIndex: 0 } }
    },
    {
      id: 'b17q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Avtotroflar — birlamchi.',
      explanation: 'Produtsentlar birlamchi, konsumentlar ikkilamchi mahsulot hosil qiladi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Produtsentlar ' }, { blank: 'birlamchi' }, { text: ', konsumentlar ' }, { blank: 'ikkilamchi' }, { text: ' mahsulot hosil qiladi.' }],
          bank: ['birlamchi', 'ikkilamchi', 'uchlamchi', 'detrit']
        }
      }
    },
    {
      id: 'b17q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Biomassa ≠ mahsuldorlik.',
      explanation: 'Oʻrmon biomassasi yillik oʻsishidan ancha koʻp; biomassa quruq modda bilan oʻlchanadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oʻrmonning umumiy biomassasi uning yillik oʻsishidan ancha koʻp.', value: true },
            { text: 'Biomassa quruq organik modda massasi bilan oʻlchanadi.', value: true },
            { text: 'Oʻsimliklar quyosh energiyasining yarmini organik moddaga aylantiradi.', value: false },
            { text: 'Choʻlning mahsuldorligi tropik oʻrmondan yuqori.', value: false }
          ]
        }
      }
    }
  ]
};
