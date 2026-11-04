import type { BoardLesson } from './types';
import { GEO2 } from './geografiya-3';

/** Darslik: Geografiya 10, 8-§ (33–36-betlar) — balandlik mintaqalanishi, yonbagʻir ekspozitsiyasi, Oʻzbekiston togʻlaridagi mintaqalar (choʻl, adir, togʻ, yaylov), qor chizigʻi. */
export const GEO_8: BoardLesson = {
  n: 8,
  label: '8',
  group: GEO2,
  title: 'Balandlik mintaqalanishi qonuniyati',
  section: '8-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Nega baland togʻ choʻqqilaridagi qor yozda ham erimaydi? Togʻ etagidan yuqoriga koʻtarilgan sari havo harorati va bosimi pasayadi, namlik maʼlum balandlikkacha ortadi — shu sababli tuproq, oʻsimlik va hayvonlar ham pogʻonama-pogʻona almashadi. Bu balandlik mintaqalanishi deb ataladi. Uni ilk bor A. Gumboldt Alp va And togʻlarida ilmiy asoslagan, Bobur esa «Boburnoma»da togʻlardagi bunday oʻzgarishlarni tasvirlagan. Mintaqalar soni togʻning balandligiga va qaysi iqlim mintaqasida joylashganiga bogʻliq: togʻ qanchalik baland va ekvatorga yaqin boʻlsa, mintaqalar shuncha koʻp. Yonbagʻirning qaysi tomonga qaraganligi — ekspozitsiyasi ham katta taʼsir qiladi.",
      easy: "Balandlik mintaqalanishi — togʻ etagidan choʻqqi tomon tabiatning almashinuvi; uni Gumboldt asoslagan.",
      draw: [
        { t: 'title', text: 'Balandlikka koʻtarilganda' },
        { t: 'list', x: 4, y: 18, items: ['harorat pasayadi', 'havo bosimi pasayadi', 'quyosh radiatsiyasi kuchayadi', 'yogʻin avval koʻpayadi, keyin kamayadi'] }
      ],
      next: 'Oʻzbekiston togʻlari'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Oʻzbekiston togʻlarida K. Z. Zokirov toʻrtta balandlik mintaqasini ajratgan. Choʻl — 400–500 m gacha; adir — 400–500 m dan 1000–1200 m gacha; togʻ — 1200 m dan 2700–2800 m gacha; yaylov — 2700–2800 m dan qor chizigʻigacha. Qor chizigʻidan yuqorida doimiy qor va muzliklar — glyatsial-nival zona boshlanadi. Qor chizigʻi — undan yuqorida qor yil boʻyi erimaydigan chegara. U qutblarda dengiz sathigacha tushadi, tropiklarda esa eng baland — 5800–6000 m dan oʻtadi, chunki u yerda issiq va yogʻin kam. Ekvatorda yogʻin koʻp boʻlgani uchun qor chizigʻi 4500 m gacha pasayadi.",
      easy: "Oʻzbekiston: choʻl → adir → togʻ → yaylov → qor-muz. Qor chizigʻi tropiklarda eng baland (5800–6000 m).",
      draw: [
        { t: 'title', text: 'Oʻzbekiston togʻlari mintaqalari' },
        { t: 'table', x: 4, y: 18, rows: [['mintaqa', 'balandligi'], ['choʻl', '400–500 m gacha'], ['adir', '500–1200 m'], ['togʻ', '1200–2800 m'], ['yaylov', '2800 m dan qor chizigʻigacha']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Balandlik mintaqalanishi — togʻ etagidan suvayirgʻich tomon harorat, bosim va namlik oʻzgarishi tufayli tabiatning qonuniy almashinuvi; uni A. Gumboldt asoslagan.',
    'Mintaqalar soni togʻning balandligi, iqlim mintaqasi va yonbagʻir ekspozitsiyasiga bogʻliq; Oʻzbekistonda choʻl, adir, togʻ va yaylov mintaqalari ajratiladi.',
    'Qor chizigʻi — undan yuqorida qor yil boʻyi erimaydigan chegara; u qutblarda pastda, tropiklarda eng balandda (5800–6000 m) joylashadi.'
  ],
  questions: [
    {
      id: 'g8q1',
      prompt: 'Oʻzbekiston togʻlaridagi balandlik mintaqalarini pastdan yuqoriga tartiblang.',
      hint: 'Eng pastda — choʻl.',
      explanation: 'Choʻl → adir → togʻ → yaylov → glyatsial-nival.',
      widget: { type: 'order_line', props: { items: [{ label: 'choʻl' }, { label: 'adir' }, { label: 'togʻ' }, { label: 'yaylov' }, { label: 'qor va muzliklar' }] } }
    },
    {
      id: 'g8q2',
      prompt: 'Balandlik mintaqalanishi qonuniyatini ilk bor ilmiy asoslagan olim kim?',
      hint: 'Alp va And togʻlari.',
      explanation: 'A. Gumboldt.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['A. Gumboldt', 'V. Dokuchayev', 'Beruniy', 'Ptolemey'], answerIndex: 0 } }
    },
    {
      id: 'g8q3',
      prompt: 'Atamani taʼrifi bilan juftlang.',
      hint: 'Ekspozitsiya — yonbagʻirning yoʻnalishi.',
      explanation: 'Qor chizigʻi — qor yil boʻyi erimaydigan chegara; yonbagʻir ekspozitsiyasi — yonbagʻirning ufq tomonlariga nisbatan joylashuvi; adir — togʻ oldi quruq dasht mintaqasi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'qor chizigʻi', right: 'qor yil boʻyi erimaydigan chegara' },
            { left: 'yonbagʻir ekspozitsiyasi', right: 'yonbagʻirning ufq tomoniga qarashi' },
            { left: 'adir', right: 'togʻ oldi quruq dasht mintaqasi' }
          ]
        }
      }
    },
    {
      id: 'g8q4',
      prompt: 'Qor chizigʻi qayerda eng baland joylashadi?',
      hint: 'Issiq va quruq.',
      explanation: 'Tropiklarda (5800–6000 m).',
      widget: { type: 'mcq', props: { prompt: '', choices: ['tropiklarda', 'ekvatorda', 'qutblarda', 'moʻtadil kengliklarda'], answerIndex: 0 } }
    },
    {
      id: 'g8q5',
      prompt: 'Balandlik mintaqalari soni nimalarga bogʻliq?',
      hint: 'Togʻ va joy.',
      explanation: 'Togʻning balandligi, qaysi iqlim mintaqasi va iqlim oʻlkasida joylashgani, yonbagʻir ekspozitsiyasi.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'togʻning balandligi', correct: true },
            { label: 'joylashgan iqlim mintaqasi', correct: true },
            { label: 'yonbagʻir ekspozitsiyasi', correct: true },
            { label: 'togʻning nomi' }
          ]
        }
      }
    },
    {
      id: 'g8q6',
      prompt: 'Ekvatorda qor chizigʻi qaysi balandlikkacha pasayadi (m)?',
      hint: 'Yogʻin koʻp.',
      explanation: '4500 m.',
      widget: { type: 'number_answer', props: { answer: 4500, unit: 'm' } }
    },
    {
      id: 'g8q7',
      prompt: 'Oʻzbekiston togʻlarida birinchi (eng quyi) balandlik mintaqasi qaysi va nima uchun?',
      hint: 'Togʻ etagi qaysi zonada?',
      explanation: 'Choʻl, chunki Oʻzbekiston choʻl tabiat zonasida joylashgan va mintaqalanish etakdagi zonadan boshlanadi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['choʻl — etak choʻl zonasida', 'yaylov — eng keng mintaqa', 'tundra — sovuq iqlim', 'tayga — oʻrmonlar koʻp'], answerIndex: 0 } }
    },
    {
      id: 'g8q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Alp — dengiz iqlimi.',
      explanation: 'Dengiz iqlimidagi Alpda qor chizigʻi Tyanshandagidan ancha past; togʻlarda mintaqalar tekislikdagi zonalarga qaraganda tezroq almashadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Alpda qor chizigʻi Tyanshanga qaraganda pastroqdan oʻtadi.', value: true },
            { text: 'Togʻlarda mintaqalar tekislikdagi zonalarga qaraganda tezroq almashadi.', value: true },
            { text: 'Subalp va alp oʻtloqlari tekisliklarda ham keng tarqalgan.', value: false },
            { text: 'Yuqoriga koʻtarilgan sari havo harorati oshib boradi.', value: false }
          ]
        }
      }
    }
  ]
};
