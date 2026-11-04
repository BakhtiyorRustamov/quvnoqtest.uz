import type { BoardLesson } from './types';
import { GEO4 } from './geografiya-13';

/** Darslik: Geografiya 10, 14-§ (59–63-betlar) — geografik baholash bosqichlari, sifat va miqdor usullari, yer resurslarini (sugʻorish uchun geotizimlar murakkabligi) va rekreatsiya resurslarini baholash. */
export const GEO_14: BoardLesson = {
  n: 14,
  label: '14',
  group: GEO4,
  title: 'Geografik baholash',
  section: '14-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Biror hudud dehqonchilik, qurilish yoki dam olish uchun qanchalik qulay? Bu savolga geografik baholash javob beradi — tabiiy sharoit va resurslarni maʼlum maqsadda foydalanishga yaroqliligi boʻyicha baholash. Baholash bosqichlari: maqsadni aniqlash, kerakli koʻrsatkichlar roʻyxatini tuzish, ularni oʻlchash, har bir komponentni alohida baholash, umumiy xulosa chiqarish va jadval hamda xaritalar tuzish. Ikki usul bor: sifat usuli — «juda qulay», «qulay», «oʻrtacha qulay», «kamroq qulay», «qulay emas»; masalan, yoʻl qurilishi uchun tekislik juda qulay, togʻlar qulay emas. Miqdor usuli esa sonlarga asoslanadi: masalan, eng tezpishar arpa navi +10° C dan yuqori haroratlar yigʻindisi 1000–1400° C boʻlganda pishadi.",
      easy: "Geografik baholash — hududning maqsadga yaroqliligi; usullar: sifat («juda qulay … qulay emas») va miqdor (sonlar).",
      draw: [
        { t: 'title', text: 'Yoʻl qurilishi uchun' },
        { t: 'table', x: 4, y: 18, rows: [['relyef', 'baho'], ['tekislik', 'juda qulay'], ['qumli choʻl', 'qulay'], ['toʻlqinsimon tekislik', 'oʻrtacha qulay'], ['adirlar', 'kamroq qulay'], ['togʻlar', 'qulay emas']] }
      ],
      next: 'Yer va dam olish'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Dehqonchilik uchun yerlarni baholashda relyef, iqlim, tuproq va yer osti suvlari hisobga olinadi. Oʻzbekistonning choʻl va chalachoʻl mintaqalaridagi geotizimlar sugʻorish uchun murakkabligiga koʻra toʻrt guruhga boʻlinadi. Oddiy — togʻoldi tekisliklari va yuqori terrasalar, maxsus tadbir talab qilmaydi. Oʻrtacha murakkab — konussimon yoyilmalar va deltalarning yuqori qismi, ihotazorlar kerak. Murakkab — deltalarning oʻrta qismi, zovurlar qurish kerak. Juda murakkab — delta etaklari va adirlar, zich zovur tarmogʻi, tomchilatib sugʻorish zarur. Rekreatsiya resurslari — dam olish uchun yaroqli tabiat boyliklari: oʻrmonlar, qirgʻoqlar, togʻ vodiylari, koʻllar, gʻorlar; ularni baholashda goʻzallik va rekreatsion bosimga chidamlilik ham hisobga olinadi.",
      easy: "Sugʻorish uchun geotizimlar: oddiy → oʻrtacha murakkab → murakkab → juda murakkab; rekreatsiya — dam olish resurslari.",
      draw: [
        { t: 'title', text: 'Sugʻorish uchun murakkablik' },
        { t: 'box', id: 'a', x: 2, y: 22, w: 22, h: 10, text: 'oddiy', color: 'green' },
        { t: 'box', id: 'b', x: 26, y: 22, w: 22, h: 10, text: 'oʻrtacha', color: 'blue' },
        { t: 'box', id: 'c', x: 50, y: 22, w: 22, h: 10, text: 'murakkab', color: 'orange' },
        { t: 'box', id: 'd', x: 74, y: 22, w: 22, h: 10, text: 'juda murakkab', color: 'red' },
        { t: 'arrow', from: 'a', to: 'b' },
        { t: 'arrow', from: 'b', to: 'c' },
        { t: 'arrow', from: 'c', to: 'd' },
        { t: 'text', x: 4, y: 46, text: 'togʻoldi tekisligi → delta etaklari va adirlar', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Geografik baholash — tabiiy sharoit va resurslarni dehqonchilik, qurilish, rekreatsiya kabi maqsadlarda foydalanishga yaroqliligi boʻyicha baholash.',
    'Baholash bosqichma-bosqich olib boriladi; sifat usulida «juda qulay»dan «qulay emas»gacha baholar, miqdor usulida sonli koʻrsatkichlar ishlatiladi.',
    'Oʻzbekistondagi geotizimlar sugʻorish uchun oddiy, oʻrtacha murakkab, murakkab va juda murakkab guruhlarga boʻlinadi; rekreatsiya resurslarini baholashda goʻzallik va bosimga chidamlilik hisobga olinadi.'
  ],
  questions: [
    {
      id: 'g14q1',
      prompt: 'Geografik baholash bosqichlarini tartiblang.',
      hint: 'Avval maqsad.',
      explanation: 'Maqsadni aniqlash → koʻrsatkichlar roʻyxati → oʻlchash → komponentlarni alohida baholash → umumiy baho → jadval va xarita.',
      widget: { type: 'order_line', props: { items: [{ label: 'maqsadni aniqlash' }, { label: 'koʻrsatkichlar roʻyxatini tuzish' }, { label: 'koʻrsatkichlarni oʻlchash' }, { label: 'umumiy baho chiqarish' }, { label: 'jadval va xarita tuzish' }] } }
    },
    {
      id: 'g14q2',
      prompt: 'Yoʻl qurilishi uchun relyefni baho bilan juftlang.',
      hint: 'Togʻ — eng noqulay.',
      explanation: 'Tekislik — juda qulay; adirlar — kamroq qulay; togʻlar — qulay emas.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'tekislik', right: 'juda qulay' },
            { left: 'adirlar', right: 'kamroq qulay' },
            { left: 'togʻlar', right: 'qulay emas' }
          ]
        }
      }
    },
    {
      id: 'g14q3',
      prompt: 'Baholash usulini misolga ajrating.',
      hint: 'Sonlar — miqdor usuli.',
      explanation: 'Sifat — «qulay», «qulay emas»; miqdor — haroratlar yigʻindisi, suv sarfi oʻlchovi.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 's', label: 'sifat usuli' }, { id: 'm', label: 'miqdor usuli' }],
          items: [
            { emoji: '👍', label: '«juda qulay»', bin: 's' },
            { emoji: '👎', label: '«qulay emas»', bin: 's' },
            { emoji: '🌡️', label: 'haroratlar yigʻindisi 1000–1400° C', bin: 'm' },
            { emoji: '💧', label: 'suv sarfi m³/s da', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'g14q4',
      prompt: 'Sugʻorish uchun «oddiy» geotizimlarga nimalar kiradi?',
      hint: 'Suv yaxshi oqib ketadi.',
      explanation: 'Togʻoldi tekisliklari va daryo vodiylarining yuqori terrasalari.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['togʻoldi tekisliklari va yuqori terrasalar', 'delta etaklari', 'adirlar va platolar', 'shoʻrxokli botiqlar'], answerIndex: 0 } }
    },
    {
      id: 'g14q5',
      prompt: '«Juda murakkab» geotizimlarni sugʻorishda qanday choralar kerak?',
      hint: 'Zovur va tejamkor sugʻorish.',
      explanation: 'Zich zovurlar tarmogʻi, yerni yuvish va tekislash, ihotazorlar, tomchilatib sugʻorish.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'zich zovurlar tarmogʻi', correct: true },
            { label: 'tomchilatib sugʻorish', correct: true },
            { label: 'ihota daraxtzorlari', correct: true },
            { label: 'suvni koʻproq quyib yuborish' }
          ]
        }
      }
    },
    {
      id: 'g14q6',
      prompt: 'Rekreatsiya resurslariga misollarni tanlang.',
      hint: 'Dam olish uchun.',
      explanation: 'Xushmanzara oʻrmonlar, koʻl va dengiz qirgʻoqlari, togʻ vodiylari, gʻorlar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'xushmanzara oʻrmon', correct: true },
            { label: 'koʻl qirgʻogʻi', correct: true },
            { label: 'togʻ vodiysi', correct: true },
            { label: 'chiqindixona' }
          ]
        }
      }
    },
    {
      id: 'g14q7',
      prompt: 'Eng tezpishar arpa navi uchun +10° C dan yuqori haroratlar yigʻindisi kamida necha gradus boʻlishi kerak?',
      hint: '1000–1400° C.',
      explanation: '1000° C dan ortiq (1000–1400° C).',
      widget: { type: 'number_answer', props: { answer: 1000, unit: '° C' } }
    },
    {
      id: 'g14q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Rekreatsiya — dam olish.',
      explanation: '«Rekreatsiya» — dam olish va salomatlikni tiklash maʼnosida ishlatiladi; dam olish tashkiliy va ixtiyoriy boʻladi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Rekreatsiya» dam olish va salomatlikni tiklash maʼnosida ishlatiladi.', value: true },
            { text: 'Dam olish tashkiliy va ixtiyoriy boʻlishi mumkin.', value: true },
            { text: 'Murakkab geotizimlarda zovur qurish shart emas.', value: false },
            { text: 'Togʻlar yoʻl qurilishi uchun eng qulay relyef.', value: false }
          ]
        }
      }
    }
  ]
};
