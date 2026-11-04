import type { BoardLesson } from './types';
import { BOB2 } from './biologiya-3';

/** Darslik: Biologiya 11, 9-§ (53–58-betlar) — harorat ekologik omil sifatida, poykiloterm va gomoyoterm organizmlar, oʻsimlik va hayvonlarning haroratga moslanishlari. */
export const BIO_9: BoardLesson = {
  n: 9,
  label: '9',
  group: BOB2,
  title: 'Harorat — abiotik omil',
  section: '9-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Quruqlikda harorat −70 gradusdan +55 gradusgacha, geotermal buloqlarda esa +90 gradusgacha boradi. Koʻpchilik organizmlar 0 dan +50 gradusgacha yashaydi: yuqorida oqsillar buziladi — denaturatsiya, noldan pastda hujayrada muz kristallari membranani yirtadi. Lekin ayrim bakteriyalar issiq buloqlarda ham yashaydi.",
      easy: "Koʻpchilik organizmlar 0…+50 °C da yashaydi.",
      draw: [
        { t: 'title', text: 'Hayot chegaralari' },
        { t: 'icon', x: 16, y: 40, emoji: '🌡️', size: 'l' },
        { t: 'list', x: 32, y: 22, items: ['quruqlik: −70…+55 °C', 'dengiz: +3…+35 °C', 'geotermal suv: +90 °C gacha', 'koʻpchilik: 0…+50 °C'] }
      ],
      next: 'Sovuqqon va issiqqon'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Poykiloterm — sovuqqonli organizmlar tana harorati muhitga bogʻliq: umurtqasizlar, baliqlar, amfibiyalar, sudralib yuruvchilar. Isisa — moddalar almashinuvi tezlashadi, sovisa — sekinlashadi, karaxt boʻlib qoladi. Gomoyoterm — issiqqonlilar tana haroratini doimiy saqlaydi: qushlar va sutemizuvchilar.",
      easy: "Poykiloterm — sovuqqon (baliq, kaltakesak); gomoyoterm — issiqqon (qush, sutemizuvchi).",
      draw: [
        { t: 'title', text: 'Termoregulatsiya' },
        { t: 'box', id: 'p', x: 4, y: 22, w: 42, h: 8, text: 'poykiloterm', color: 'blue' },
        { t: 'box', id: 'g', x: 52, y: 22, w: 42, h: 8, text: 'gomoyoterm', color: 'red' },
        { t: 'list', x: 4, y: 38, items: ['baliq, qurbaqa', 'ilon, hasharot', 'harorat oʻzgaradi'] },
        { t: 'list', x: 52, y: 38, items: ['qushlar', 'sutemizuvchilar', 'harorat doimiy'] }
      ],
      next: 'Oʻsimliklar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻsimliklar moslanishi uch xil. Biokimyoviy: sovuqqa chidamlilarning hujayra shirasida shakar koʻpayib, muzlashdan saqlaydi. Fiziologik: transpiratsiya qizib ketishdan saqlaydi; choʻl efemerlari bahorda tez oʻsib, yozni urugʻ holida, efemeroidlar piyozbosh yoki tugunak holida oʻtkazadi. Morfologik: kaktusda tikan, saksovulda qipiq barg, sovuqda past boʻy, yostiqsimon shakl.",
      easy: "Shakar — sovuqdan; transpiratsiya — issiqdan; efemer — urugʻ bilan, efemeroid — piyozbosh bilan.",
      draw: [
        { t: 'title', text: 'Oʻsimliklar moslanishi' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'misol'], ['biokimyoviy', 'shirada shakar ortadi'], ['fiziologik', 'transpiratsiya, efemerlar'], ['morfologik', 'tikan, past boʻy']] },
        { t: 'text', x: 4, y: 54, text: 'anabioz — hayot jarayonlari vaqtincha toʻxtaydi', size: 's', color: 'purple' }
      ],
      next: 'Hayvonlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Hayvonlarda: biokimyoviy — sovuq suvdagi baliqlarda glikoproteinlar, hasharotlarda glitserin muzlashga yoʻl qoʻymaydi. Fiziologik — titrash issiqlik beradi, teri tomirlari kengayib-torayadi, qishki uyqu: yumronqoziq, sugʻur, tipratikan. Morfologik — tangacha, pat, jun, teri osti yogʻi: pingvin, kit. Etologik — migratsiya, uya qurish, agamaning buta shoxiga chiqishi.",
      easy: "Glitserin, titrash, qishki uyqu, jun va yogʻ, migratsiya.",
      draw: [
        { t: 'title', text: 'Hayvonlar moslanishi' },
        { t: 'table', x: 4, y: 20, rows: [['tur', 'misol'], ['biokimyoviy', 'glitserin, glikoprotein'], ['fiziologik', 'titrash, qishki uyqu'], ['morfologik', 'pat, jun, yogʻ qatlami'], ['etologik', 'migratsiya, uya']] }
      ],
      next: 'Misol'
    },
    {
      kind: 'example',
      clear: true,
      say: "Nega issiqqonli hayvonlar qutbdan choʻlgacha hamma joyda yashay oladi? Ular toʻrt kamerali yurak, mukammal nafas tizimi va jadal moddalar almashinuvi bilan tana haroratini doimiy saqlaydi. Pingvin yogʻ qatlami va zich pati bilan Antarktidada, tuya esa choʻlda yashaydi.",
      easy: "Doimiy tana harorati — issiqqonlilarni har iqlimga moslaydi.",
      draw: [
        { t: 'title', text: 'Har iqlimda' },
        { t: 'icon', x: 16, y: 34, emoji: '🐧', size: 'l' },
        { t: 'icon', x: 16, y: 56, emoji: '🐫', size: 'l' },
        { t: 'list', x: 32, y: 26, items: ['toʻrt kamerali yurak', 'jadal moddalar almashinuvi', 'pat, jun, yogʻ qatlami'] }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Koʻpchilik organizmlar 0…+50 °C da yashaydi; yuqori harorat oqsillarni denaturatsiyalaydi, past harorat muz kristallari hosil qiladi.',
    'Poykiloterm (sovuqqonli) organizmlar tana harorati muhitga bogʻliq; gomoyoterm (issiqqonli) qush va sutemizuvchilar uni doimiy saqlaydi.',
    'Moslanishlar: biokimyoviy (shakar, glitserin), fiziologik (transpiratsiya, titrash, qishki uyqu, efemerlar), morfologik (tikan, pat, jun) va etologik (migratsiya).'
  ],
  questions: [
    {
      id: 'b9q1',
      prompt: 'Hayvonni guruhiga ajrating.',
      hint: 'Qush va sutemizuvchi — issiqqonli.',
      explanation: 'Poykiloterm: baliq, qurbaqa, ilon, chigirtka. Gomoyoterm: pingvin, sugʻur.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'p', label: 'Poykiloterm' },
            { id: 'g', label: 'Gomoyoterm' }
          ],
          items: [
            { emoji: '', label: 'baliq', bin: 'p' },
            { emoji: '', label: 'qurbaqa', bin: 'p' },
            { emoji: '', label: 'ilon', bin: 'p' },
            { emoji: '', label: 'pingvin', bin: 'g' },
            { emoji: '', label: 'sugʻur', bin: 'g' }
          ]
        }
      }
    },
    {
      id: 'b9q2',
      prompt: 'Moslanishni turi bilan juftlang.',
      hint: 'Migratsiya — xulq-atvor.',
      explanation: 'Glitserin — biokimyoviy; titrash — fiziologik; jun — morfologik; migratsiya — etologik.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'hasharotlarda glitserin', right: 'biokimyoviy' },
            { left: 'titrash', right: 'fiziologik' },
            { left: 'qalin jun', right: 'morfologik' },
            { left: 'migratsiya', right: 'etologik' }
          ]
        }
      }
    },
    {
      id: 'b9q3',
      prompt: 'Yozni urugʻ holatida oʻtkazadigan bir yillik choʻl oʻsimliklari qanday ataladi?',
      hint: 'Piyozbosh bilan oʻtkazsa — efemeroid.',
      explanation: 'Efemerlar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['efemerlar', 'efemeroidlar', 'sukkulentlar', 'gigrofitlar'], answerIndex: 0 } }
    },
    {
      id: 'b9q4',
      prompt: 'Sovuqqa chidamli oʻsimliklar hujayra shirasida qaysi modda koʻpayadi?',
      hint: 'U muzlashdan saqlaydi.',
      explanation: 'Shakar (uglevodlar).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tuz', 'shakar', 'oqsil', 'kislorod'], answerIndex: 1 } }
    },
    {
      id: 'b9q5',
      prompt: 'Qishki uyquga ketadigan hayvonlarni belgilang.',
      hint: 'Kemiruvchilar va hasharotxoʻrlar.',
      explanation: 'Yumronqoziq, sugʻur, tipratikan, koʻrshapalak qishki uyquga ketadi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'yumronqoziq', correct: true },
            { label: 'sugʻur', correct: true },
            { label: 'tipratikan', correct: true },
            { label: 'boʻri' },
            { label: 'quyon' }
          ]
        }
      }
    },
    {
      id: 'b9q6',
      prompt: 'Koʻpchilik organizmlar normal yashaydigan harorat oraligʻi qaysi?',
      hint: 'Yuqorida oqsil buziladi.',
      explanation: '0 °C dan +50 °C gacha.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['−70…0 °C', '0…+50 °C', '+50…+90 °C', '−20…+20 °C'], answerIndex: 1 } }
    },
    {
      id: 'b9q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Poykilos — oʻzgaruvchan.',
      explanation: 'Tana harorati oʻzgaruvchan — poykiloterm, doimiy — gomoyoterm.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Tana harorati muhitga bogʻliq organizmlar — ' }, { blank: 'poykiloterm' }, { text: ', doimiy saqlaydiganlar — ' }, { blank: 'gomoyoterm' }, { text: '.' }],
          bank: ['poykiloterm', 'gomoyoterm', 'efemer', 'stenobiont']
        }
      }
    },
    {
      id: 'b9q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Muz kristallari membranani shikastlaydi.',
      explanation: 'Muz kristallari hujayrani nobud qiladi; sovuq iqlimda daraxtlar past boʻyli; baliqlar sovuqqonli.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Muz kristallari hujayra membranasini shikastlaydi.', value: true },
            { text: 'Sovuq iqlimda daraxtlar past boʻyli yoki yer bagʻirlab oʻsadi.', value: true },
            { text: 'Baliqlar gomoyoterm hayvonlar.', value: false },
            { text: 'Sovuqqonli hayvonlarda sovuqda moddalar almashinuvi tezlashadi.', value: false }
          ]
        }
      }
    }
  ]
};
