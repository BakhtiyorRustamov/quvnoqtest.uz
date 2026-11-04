import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 190–197-betlar — Anbar Otin va «Qarolar falsafasi risolasi». */
export const OZ_58: BoardLesson = {
  n: 58,
  label: '58',
  group: OZG8,
  title: 'Anbar Otin. «Qarolar falsafasi»',
  section: 'Adabiyot, 1-qism: Anbar Otin (1870–1910); «Risolayi falsafayi siyohon»dan',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Anbar Otin (1870–1910) — XIX asr oxiri va XX asr boshidagi qoʻqonlik shoira; oilasi kambagʻal belbogʻchi-boʻzchilar boʻlgan. U Dilshod otin maktabida oʻqigan, bolaligidanoq Navoiy gʻazallariga qiziqqan, oʻzbek va tojik tillarida ijod qilgan; sheʼrlarida Uvaysiy taʼsiri seziladi. Shoira Navoiyni ustozlarning ulugʻi deb bilgan, Muqimiy, Furqat kabi zamondoshlari ijodiga murojaat qilgan. Uning «Risolayi falsafayi siyohon» («Qarolar falsafasi risolasi») asari adabiyotimizda ilk falsafiy-publitsistik asar hisoblanadi. Unda «qora» soʻzining turli maʼnolari orqali ijtimoiy tengsizlik tahlil qilinadi: teri rangi insonning qadrini belgilamaydi, odamni olam va odamga munosabati belgilaydi; ayollarning jamiyatdagi oʻrni haqida ham fikr yuritiladi.",
      easy: "Anbar Otin — qoʻqonlik shoira. «Qarolar falsafasi»da u inson qadri rangida emas, xulqida ekanini aytadi.",
      draw: [
        { t: 'title', text: '«Qora» soʻzi risolada' },
        { t: 'box', id: 'q', x: 34, y: 15, w: 32, h: 9, text: 'qora', color: 'ink' },
        { t: 'box', id: 'a', x: 4, y: 32, w: 28, h: 11, text: 'qora tun, zulm', color: 'red' },
        { t: 'box', id: 'b', x: 36, y: 32, w: 28, h: 11, text: 'qozon, chiroq', color: 'orange' },
        { t: 'box', id: 'c', x: 68, y: 32, w: 28, h: 11, text: 'mehnatkash xalq', color: 'green' },
        { t: 'arrow', from: 'q', to: 'a' },
        { t: 'arrow', from: 'q', to: 'b' },
        { t: 'arrow', from: 'q', to: 'c' },
        { t: 'text', x: 4, y: 54, text: 'Agar ustodi adabni izlasang, Anbar Otin,', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 60, text: 'Sen Navoiy taʼlimini doim mutolaa qil.', size: 's', color: 'purple' }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    'Anbar Otin (1870–1910) — qoʻqonlik shoira; oʻzbek va tojik tillarida ijod qilgan, Uvaysiy va Navoiyni ustoz bilgan.',
    '«Qarolar falsafasi risolasi» — adabiyotimizdagi ilk falsafiy-publitsistik asar.',
    'Risolada «qora» soʻzi orqali ijtimoiy tengsizlik tahlil qilinadi: inson qadri rangida emas, xulq va munosabatida.'
  ],
  questions: [
    {
      id: 'oz58q1',
      prompt: 'Anbar Otin qaysi yillarda yashagan?',
      hint: 'XX asr boshigacha.',
      explanation: '1870–1910.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['1870–1910', '1640–1711', '1483–1530', '1779–1845'], answerIndex: 0 } }
    },
    {
      id: 'oz58q2',
      prompt: 'Anbar Otin qaysi tillarda ijod qilgan?',
      hint: 'Ikki til.',
      explanation: 'Oʻzbek va tojik tillarida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻzbek va tojik', 'arab va fors', 'rus va oʻzbek', 'faqat oʻzbek'], answerIndex: 0 } }
    },
    {
      id: 'oz58q3',
      prompt: 'Shoira kimni ustozlarning ulugʻi deb bilgan?',
      hint: 'Uning taʼlimini mutolaa qilishga chaqiradi.',
      explanation: 'Alisher Navoiyni.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Alisher Navoiy', 'Bobur', 'Mashrab', 'Rabgʻuziy'], answerIndex: 0 } }
    },
    {
      id: 'oz58q4',
      prompt: '«Qarolar falsafasi risolasi» qanday yoʻnalishdagi asar?',
      hint: 'Ilk bor.',
      explanation: 'Adabiyotimizdagi ilk falsafiy-publitsistik asar.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['falsafiy-publitsistik', 'tarixiy doston', 'lirik devon', 'sahna asari'], answerIndex: 0 } }
    },
    {
      id: 'oz58q5',
      prompt: 'Risolaga koʻra inson qadrini nima belgilaydi?',
      hint: 'Rang emas.',
      explanation: 'Olam va odamga munosabati, xulqi — teri rangi, yashash joyi yoki tili emas.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['olam va odamga munosabati', 'teri rangi', 'qaysi tilda gaplashishi', 'qayerda yashashi'], answerIndex: 0 } }
    },
    {
      id: 'oz58q6',
      prompt: 'Risoladagi «qora» timsolini maʼnosi bilan juftlang.',
      hint: 'Chiroq oʻzi qora, lekin nur sochadi.',
      explanation: 'Qozon — oʻzi kuyib, odamlarni toʻydiradi; qora chiroq — nuri bilan kulbani yoritadi; qora tun — zulm va qaygʻu.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qora qozon', right: 'oʻzi kuyib, elni toʻydiradi' },
            { left: 'qora chiroq', right: 'nuri bilan kulbani yoritadi' },
            { left: 'qora tun', right: 'zulm va qaygʻu' }
          ]
        }
      }
    },
    {
      id: 'oz58q7',
      prompt: 'Anbar Otin ijodiga taʼsir qilgan yoki u murojaat qilgan shoirlarni belgilang.',
      hint: 'Uvaysiyni «momom» deydi.',
      explanation: 'Uvaysiy, Navoiy, Muqimiy, Furqat.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Uvaysiy', correct: true },
            { label: 'Navoiy', correct: true },
            { label: 'Muqimiy', correct: true },
            { label: 'Furqat', correct: true }
          ]
        }
      }
    },
    {
      id: 'oz58q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Otin maktabi.',
      explanation: 'Anbar Otin Dilshod otin maktabida oʻqigan; risolada ayollarning jamiyatdagi oʻrni haqida ham fikr yuritiladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Anbar Otin Dilshod otin maktabida tahsil olgan.', value: true },
            { text: 'Risolada ayollarning jamiyatdagi oʻrni haqida ham fikr yuritiladi.', value: true },
            { text: 'Anbar Otin badavlat saroy oilasida tugʻilgan.', value: false }
          ]
        }
      }
    },
    {
      id: 'oz58q9',
      prompt: 'Baytda shoira oʻziga qanday maslahat beradi?',
      hint: 'Ustodi adab.',
      explanation: 'Adab ustozini izlasang, Navoiy taʼlimini doim mutolaa qil, deydi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Navoiy asarlarini doim mutolaa qilishni', 'sheʼr yozishni tashlashni', 'faqat tojikcha yozishni', 'safarga chiqishni'], answerIndex: 0 } }
    }
  ]
};
