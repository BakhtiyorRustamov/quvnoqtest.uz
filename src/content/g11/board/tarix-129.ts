import type { BoardLesson } from './types';
import { JH3 } from './tarix-127';

/** Darslik: Jahon tarixi 11, 29-mavzu (135–140-betlar) — ilmiy-texnik inqilob, axborot jamiyati, tibbiyot yutuqlari, ommaviy madaniyat, zamonaviy adabiyot va sanʼat. */
export const TARIX_129: BoardLesson = {
  n: 129,
  label: '29',
  group: JH3,
  title: 'Ilmiy-texnik taraqqiyot, adabiyot va sanʼat',
  section: 'Jahon tarixi, 29-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "XX asrning ikkinchi yarmidagi ilmiy-texnik inqilob — mahsulotlarni ommaviy ishlab chiqarish, konveyerlar, avtomat zavodlar va sanoat robotlari — ilgʻor davlatlarni industrial bosqichdan postindustrial bosqichga olib chiqdi. Asrning soʻnggi 30 yilidagi kompyuterlashtirish va axborot texnologiyalari «axborot jamiyati»ni yaratdi: rivojlangan davlatlarda ishchi kuchining qariyb yarmi aqliy mehnat bilan band. Afrikada aholining uchdan ikki qismi qishloq xoʻjaligida ishlasa, AQSHda bu 3 foizdan oshmaydi. Tibbiyot ham katta yutuqlarga erishdi: koʻplab kasalliklarga qarshi vaksinalar yaratildi va XX asrda Yer aholisi bir yarim milliarddan olti milliardgacha koʻpaydi.",
      easy: "ITI → postindustrial jamiyat → «axborot jamiyati»; vaksinalar; aholi 1,5 mlrd → 6 mlrd.",
      draw: [
        { t: 'title', text: 'XX asrda Yer aholisi, mlrd' },
        { t: 'bars', x: 6, y: 18, w: 50, h: 34, items: [{ label: 'asr boshi', value: 1.5 }, { label: 'asr oxiri', value: 6 }] },
        { t: 'text', x: 60, y: 26, text: 'sabab:', size: 's' },
        { t: 'text', x: 60, y: 34, text: 'tibbiyot, vaksinalar', size: 's', color: 'blue' }
      ],
      next: 'Madaniyat'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Sunʼiy yoʻldosh televideniyesi va Internet madaniy qadriyatlarning jahon miqyosida almashinuviga sharoit yaratdi. Shu bilan birga, tez foyda keltiradigan, koʻngilochar «ommaviy madaniyat» kuchaydi; koʻplab olimlar u insonni yuzaki fikrlashga va koʻr-koʻrona taqlidga undashidan xavotir bildirmoqda. Adabiyotda yangi yoʻnalishlar paydo boʻlmoqda: XXI asr boshida Xolid Husayniyning «Shamol ortidan yugurayotgan odam» romani, Paulo Koeloning «Alkimyogar» asari, Joan Rouling romanlari koʻp tillarga tarjima qilinib, keng oʻqildi. Zamonaviy sanʼatda kompyuter grafikasi, videokliplar kabi yangi turlar paydo boʻldi, sanʼatning jamiyatga taʼsiri oshdi.",
      easy: "Internet va TV — madaniyatlar almashinuvi; «ommaviy madaniyat» xavfi; yangi adabiyot va kompyuter sanʼati.",
      draw: [
        { t: 'title', text: 'Mashhur asarlar' },
        { t: 'table', x: 4, y: 18, rows: [['muallif', 'asar'], ['X. Husayniy', '«Shamol ortidan...»'], ['P. Koelo', '«Alkimyogar»'], ['J. Rouling', 'Garri Potter romanlari']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Ilmiy-texnik inqilob ilgʻor davlatlarni postindustrial bosqichga olib chiqdi; kompyuterlashtirish «axborot jamiyati»ni yaratdi.',
    'Tibbiyot yutuqlari tufayli yuqumli kasalliklar oʻlimning asosiy sababi boʻlmay qoldi, XX asrda Yer aholisi 1,5 mlrd dan 6 mlrd ga yetdi.',
    'Internet va televideniye madaniyatlarni yaqinlashtirdi, ammo «ommaviy madaniyat» xavfi ham paydo boʻldi; adabiyot va sanʼatda yangi yoʻnalishlar shakllandi.'
  ],
  questions: [
    {
      id: 'j29q1',
      prompt: 'Jamiyat bosqichlarini tartiblang.',
      hint: 'Avval zavodlar.',
      explanation: 'Industrial jamiyat → postindustrial jamiyat → axborot jamiyati.',
      widget: { type: 'order_line', props: { items: [{ label: 'industrial jamiyat' }, { label: 'postindustrial jamiyat' }, { label: 'axborot jamiyati' }] } }
    },
    {
      id: 'j29q2',
      prompt: 'XX asr oxirida Yer aholisi taxminan necha milliardga yetgan?',
      hint: 'Asr boshida 1,5 mlrd edi.',
      explanation: '6 milliardga.',
      widget: { type: 'number_answer', props: { answer: 6, unit: 'mlrd' } }
    },
    {
      id: 'j29q3',
      prompt: 'Muallifni asari bilan juftlang.',
      hint: 'Koelo — «Alkimyogar».',
      explanation: 'X. Husayniy — «Shamol ortidan yugurayotgan odam»; P. Koelo — «Alkimyogar»; J. Rouling — Garri Potter haqidagi romanlar.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Xolid Husayniy', right: '«Shamol ortidan yugurayotgan odam»' },
            { left: 'Paulo Koelo', right: '«Alkimyogar»' },
            { left: 'Joan Rouling', right: 'Garri Potter haqidagi romanlar' }
          ]
        }
      }
    },
    {
      id: 'j29q4',
      prompt: 'Ilmiy-texnik inqilobning belgilarini tanlang.',
      hint: 'Ishlab chiqarish.',
      explanation: 'Ommaviy ishlab chiqarish, konveyer liniyalari, avtomat zavodlar, sanoat robotlari.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'konveyer liniyalari', correct: true },
            { label: 'sanoat robotlari', correct: true },
            { label: 'avtomat zavodlar', correct: true },
            { label: 'qoʻl mehnatining koʻpayishi' }
          ]
        }
      }
    },
    {
      id: 'j29q5',
      prompt: 'AQSHda aholining necha foizidan kami qishloq xoʻjaligida band?',
      hint: 'Juda kam.',
      explanation: '3 % dan oshmaydi.',
      widget: { type: 'number_answer', props: { answer: 3, unit: '%' } }
    },
    {
      id: 'j29q6',
      prompt: 'Tushunchani taʼrifi bilan juftlang.',
      hint: 'Vaksina — emlash.',
      explanation: 'Vaksina — emlash vositasi; ommaviy madaniyat — maishiy va koʻngilochar madaniyat; axborot jamiyati — industrialdan keyingi yuqori bosqich.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'vaksina', right: 'yuqumli kasallikka qarshi emlash vositasi' },
            { left: 'ommaviy madaniyat', right: 'maishiy va koʻngilochar madaniyat' },
            { left: 'axborot jamiyati', right: 'industrialdan keyingi bosqich' }
          ]
        }
      }
    },
    {
      id: 'j29q7',
      prompt: 'XX asr oxirida kishilar oʻlimining asosiy sababi nimaga aylandi?',
      hint: 'Yuqumli kasalliklar emas.',
      explanation: 'Yurak-qon tomir tizimi va saraton kasalliklari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻlat va vabo', 'yurak-qon tomir va saraton kasalliklari', 'ocharchilik', 'qorachechak'], answerIndex: 1 } }
    },
    {
      id: 'j29q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Kompyuter grafikasi — yangi sanʼat turi.',
      explanation: 'Kompyuter grafikasi va videokliplar zamonaviy sanʼatning yangi turlari; rivojlangan davlatlarda ishchi kuchining qariyb yarmi aqliy mehnat bilan band.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Kompyuter grafikasi va videokliplar — sanʼatning yangi turlari.', value: true },
            { text: 'Rivojlangan davlatlarda ishchi kuchining qariyb yarmi aqliy mehnat bilan band.', value: true },
            { text: 'XX asrda Yer aholisi kamaygan.', value: false },
            { text: 'Afrikada aholining atigi 3 foizi qishloq xoʻjaligida ishlaydi.', value: false }
          ]
        }
      }
    }
  ]
};
