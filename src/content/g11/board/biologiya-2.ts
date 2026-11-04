import type { BoardLesson } from './types';
import { BOB1 } from './biologiya-1';

/** Darslik: Biologiya 11, 2-§ (9–13-betlar) — ekologiyaning rivojlanish tarixi, boʻlimlari va atrof-muhitni oʻrganish metodlari. */
export const BIO_2: BoardLesson = {
  n: 2,
  label: '2',
  group: BOB1,
  title: 'Ekologiyaning rivojlanishi, boʻlimlari va metodlari',
  section: '2-mavzu',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Ekologik bilimlar juda qadimiy. X–XII asrlarda al-Xorazmiy, al-Forobiy, Beruniy, Ibn Sino asarlarida dorivor oʻsimliklar va hayvonlarning yashash joylari yozilgan. Bobur «Boburnoma»da Oʻrta Osiyo va Hindiston oʻsimlik va hayvonlarini, ularning tarqalishi va koʻpayish davrlarini tasvirlagan.",
      easy: "Beruniy, Ibn Sino, Bobur asarlarida ham ekologik maʼlumotlar bor.",
      draw: [
        { t: 'title', text: 'Qadimiy bilimlar' },
        { t: 'icon', x: 16, y: 40, emoji: '📜', size: 'l' },
        { t: 'list', x: 32, y: 24, items: ['al-Xorazmiy, al-Forobiy', 'Beruniy, Ibn Sino', 'Bobur — «Boburnoma»'] }
      ],
      next: 'Fan boʻlib shakllanishi'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Muhitning tirik organizmlarga taʼsirini chuqur oʻrganishni Aleksandr Gumboldt boshlab berdi. XX asr boshida ekologiya alohida yoʻnalish boʻlib shakllandi. Ingliz olimi A. Tensli ekotizim konsepsiyasini, rus olimi V. N. Sukachev biogeotsenoz nazariyasini yaratdi. 70-yillardan inson taʼsiri kuchayib, ekologik muammolar dolzarb boʻldi.",
      easy: "Gumboldt — boshlovchi; Tensli — ekotizim; Sukachev — biogeotsenoz.",
      draw: [
        { t: 'title', text: 'Olimlar' },
        { t: 'table', x: 4, y: 20, rows: [['olim', 'hissasi'], ['A. Gumboldt', 'omillar taʼsiri'], ['E. Gekkel', '«ekologiya» atamasi'], ['A. Tensli', 'ekotizim'], ['V. N. Sukachev', 'biogeotsenoz']] }
      ],
      next: 'Boʻlimlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Ekologiya oʻrganadigan tizimiga qarab boʻlinadi. Autekologiya — organizm va muhit munosabatlarini, demekologiya — populatsiyalarni, sinekologiya — turli turlar jamoalarini, biogeotsenologiya — ekotizimlarni, global ekologiya — biosferani oʻrganadi. Evolutsion ekologiya qadimiy ekotizimlarni, tarixiy ekologiya esa sivilizatsiya davridagi oʻzgarishlarni tiklaydi.",
      easy: "Aut- — organizm, dem- — populatsiya, sin- — jamoa, global — biosfera.",
      draw: [
        { t: 'title', text: 'Ekologiya boʻlimlari' },
        { t: 'table', x: 4, y: 20, rows: [['boʻlim', 'oʻrganadi'], ['autekologiya', 'organizm'], ['demekologiya', 'populatsiya'], ['sinekologiya', 'jamoa'], ['biogeotsenologiya', 'ekotizim'], ['global ekologiya', 'biosfera']] }
      ],
      next: 'Amaliy yoʻnalishlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Amaliy yoʻnalishlar ham bor. Landshaft ekologiyasi inson faoliyati oqibatlarini bashorat qiladi. Sanoat ekologiyasi — ekologik toza mahsulot va chiqindisiz texnologiya bilan, ijtimoiy ekologiya — muhit va jamiyat munosabatlari bilan, matematik ekologiya — organizmlarning son jihatdan taqsimlanishi bilan shugʻullanadi.",
      easy: "Landshaft, sanoat, ijtimoiy, matematik ekologiya — amaliy yoʻnalishlar.",
      draw: [
        { t: 'title', text: 'Amaliy yoʻnalishlar' },
        { t: 'icon', x: 12, y: 40, emoji: '🏭', size: 'l' },
        { t: 'list', x: 24, y: 22, items: ['landshaft — bashorat', 'sanoat — chiqindisiz texnologiya', 'ijtimoiy — inson va jamiyat', 'matematik — sonlar taqsimoti'] }
      ],
      next: 'Metodlar'
    },
    {
      kind: 'example',
      clear: true,
      say: "Atrof-muhitni oʻrganishning uch metodi bor. Dala metodi — tabiiy sharoitda kuzatish: masalan, qushlarni halqalab, migratsiyani kuzatish. Ekologik tajriba — bitta omil taʼsirini modelda sinash: akvarium — chuchuk suv havzasining modeli. Matematik modellashtirish — kompyuterda ekotizim kelajagini bashorat qilish.",
      easy: "Dala (kuzatish), tajriba (model, akvarium), matematik model (kompyuter).",
      draw: [
        { t: 'title', text: 'Uch metod' },
        { t: 'icon', x: 12, y: 26, emoji: '🐦', size: 'm' },
        { t: 'icon', x: 12, y: 42, emoji: '🐠', size: 'm' },
        { t: 'icon', x: 12, y: 58, emoji: '💻', size: 'm' },
        { t: 'text', x: 22, y: 28, text: 'dala metodi — qushlarni halqalash' },
        { t: 'text', x: 22, y: 44, text: 'tajriba — akvarium modeli' },
        { t: 'text', x: 22, y: 60, text: 'matematik modellashtirish' }
      ],
      next: 'Endi oʻzim!'
    }
  ],
  summary: [
    'Ekologik bilimlar Beruniy, Ibn Sino, Bobur asarlarida ham bor; ilmiy asosni Gumboldt, Gekkel, Tensli (ekotizim) va Sukachev (biogeotsenoz) yaratgan.',
    'Boʻlimlar: autekologiya — organizm, demekologiya — populatsiya, sinekologiya — jamoa, biogeotsenologiya — ekotizim, global ekologiya — biosfera.',
    'Metodlar: dala kuzatuvi, ekologik tajriba (model) va matematik modellashtirish.'
  ],
  questions: [
    {
      id: 'b2q1',
      prompt: 'Ekologiya boʻlimini u oʻrganadigan tizim bilan juftlang.',
      hint: 'Dem- — xalq, populatsiya.',
      explanation: 'Autekologiya — organizm; demekologiya — populatsiya; sinekologiya — jamoa; global ekologiya — biosfera.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'autekologiya', right: 'organizm' },
            { left: 'demekologiya', right: 'populatsiya' },
            { left: 'sinekologiya', right: 'jamoa' },
            { left: 'global ekologiya', right: 'biosfera' }
          ]
        }
      }
    },
    {
      id: 'b2q2',
      prompt: 'Biogeotsenoz nazariyasini kim yaratgan?',
      hint: 'Rus olimi.',
      explanation: 'V. N. Sukachev.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['A. Tensli', 'V. N. Sukachev', 'A. Gumboldt', 'E. Gekkel'], answerIndex: 1 } }
    },
    {
      id: 'b2q3',
      prompt: 'Olimni uning hissasi bilan juftlang.',
      hint: 'Tensli — ingliz olimi.',
      explanation: 'Tensli — ekotizim konsepsiyasi; Gekkel — «ekologiya» atamasi; Gumboldt — muhit omillari taʼsirini oʻrganishni boshlagan.',
      widget: {
        type: 'memory_match',
        props: {
          pairs: [
            { a: { label: 'A. Tensli' }, b: { label: 'ekotizim' } },
            { a: { label: 'E. Gekkel' }, b: { label: '«ekologiya» atamasi' } },
            { a: { label: 'V. N. Sukachev' }, b: { label: 'biogeotsenoz' } },
            { a: { label: 'A. Gumboldt' }, b: { label: 'omillar taʼsiri' } }
          ]
        }
      }
    },
    {
      id: 'b2q4',
      prompt: 'Misolni metod bilan ajrating.',
      hint: 'Akvarium — model.',
      explanation: 'Dala: qushlarni halqalash, meteorologik kuzatish. Tajriba: akvarium modeli. Matematik: kompyuter modeli.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [
            { id: 'd', label: 'Dala' },
            { id: 't', label: 'Tajriba' },
            { id: 'm', label: 'Matematik' }
          ],
          items: [
            { emoji: '', label: 'qushlarni halqalash', bin: 'd' },
            { emoji: '', label: 'meteorologik kuzatish', bin: 'd' },
            { emoji: '', label: 'akvarium modeli', bin: 't' },
            { emoji: '', label: 'kompyuterda bashorat', bin: 'm' }
          ]
        }
      }
    },
    {
      id: 'b2q5',
      prompt: '«Boburnoma»da qaysi hududlarning oʻsimlik va hayvonlari tasvirlangan?',
      hint: 'Bobur yashagan joylar.',
      explanation: 'Oʻrta Osiyo va Hindiston.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Afrika va Arabiston', 'Oʻrta Osiyo va Hindiston', 'Yevropa', 'Xitoy va Yaponiya'], answerIndex: 1 } }
    },
    {
      id: 'b2q6',
      prompt: 'Chiqindisiz texnologiya qaysi yoʻnalish vazifasi?',
      hint: 'Zavodlar bilan bogʻliq.',
      explanation: 'Sanoat ekologiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ijtimoiy ekologiya', 'sanoat ekologiyasi', 'matematik ekologiya', 'autekologiya'], answerIndex: 1 } }
    },
    {
      id: 'b2q7',
      prompt: 'Boʻsh joylarni toʻldiring.',
      hint: 'Tarixiy ekologiya — sivilizatsiya davri.',
      explanation: 'Evolutsion ekologiya qadimiy ekotizimlarni tiklaydi, tarixiy ekologiya neolitdan bugungacha boʻlgan oʻzgarishlarni oʻrganadi.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Qadimiy ekotizimlarni ' }, { blank: 'evolutsion' }, { text: ' ekologiya, neolitdan bugungacha oʻzgarishlarni ' }, { blank: 'tarixiy' }, { text: ' ekologiya oʻrganadi.' }],
          bank: ['evolutsion', 'tarixiy', 'sanoat', 'ijtimoiy']
        }
      }
    },
    {
      id: 'b2q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Tabiatda omillar birgalikda taʼsir qiladi.',
      explanation: 'Tabiatda bitta omilni ajratib boʻlmaydi, shuning uchun model kerak; matematik model bashorat beradi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Bitta omil taʼsirini oʻrganish uchun tabiiy tizim modellashtiriladi.', value: true },
            { text: 'Matematik modellashtirish ekotizim kelajagini bashorat qilishga yordam beradi.', value: true },
            { text: 'Demekologiya biosferani oʻrganadi.', value: false },
            { text: 'Dala metodida faqat kompyuter ishlatiladi.', value: false }
          ]
        }
      }
    }
  ]
};
