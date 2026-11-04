import type { BoardLesson } from './types';
import { GEO2 } from './geografiya-3';

/** Darslik: Geografiya 10, 4-§ (17–20-betlar) — Yer qobiqlari (yer poʻsti turlari, mantiya, yadro), litosfera plitalari, seysmik mintaqalar, zilzila va vulqonlar. */
export const GEO_4: BoardLesson = {
  n: 4,
  label: '4',
  group: GEO2,
  title: 'Yerning ichki tuzilishi va tektonik jarayonlar',
  section: '4-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Yerning ichi qobiqlardan tuzilgan. Eng ustida — yer poʻsti, oʻrtacha qalinligi 35–40 km; u materik, okean, oraliq va riftogen yer poʻstlariga boʻlinadi. Materik yer poʻsti choʻkindi, granit va bazalt qatlamlaridan, okean yer poʻsti esa faqat choʻkindi va bazalt qatlamlaridan iborat. Yer poʻsti ostida mantiya joylashgan — u Yer hajmining 83 foizini tashkil etadi va 2900 km chuqurlikkacha davom etadi. Eng ichkarida — yadro, harorati 4000° C dan yuqori. Litosfera — yer poʻsti va yuqori mantiyaning bir qismi; u 13 ta yirik plitaga boʻlingan va bu plitalar yiliga bir necha santimetr siljiydi.",
      easy: "Yer poʻsti (35–40 km) → mantiya (2900 km gacha) → yadro (> 4000° C); litosfera — 13 ta plita.",
      draw: [
        { t: 'title', text: 'Yer qobiqlari' },
        { t: 'box', id: 'p', x: 4, y: 22, w: 28, h: 10, text: 'yer poʻsti', color: 'orange' },
        { t: 'box', id: 'm', x: 36, y: 22, w: 28, h: 10, text: 'mantiya', color: 'red' },
        { t: 'box', id: 'y', x: 68, y: 22, w: 28, h: 10, text: 'yadro', color: 'purple' },
        { t: 'arrow', from: 'p', to: 'm' },
        { t: 'arrow', from: 'm', to: 'y' },
        { t: 'text', x: 4, y: 46, text: '35–40 km · 2900 km gacha · > 4000° C', size: 's' }
      ],
      next: 'Zilzila va vulqonlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "Litosfera plitalari toʻqnashgan joylarda zilzila va vulqonlar tez-tez sodir boʻladi; bunday hududlar seysmik mintaqalar deb ataladi. Ikkita eng muhim mintaqa bor: Tinch okean «olovli» halqasi va Alp–Himolay seysmik mintaqasi. Oʻzbekiston Alp–Himolay mintaqasida joylashgan, shuning uchun bizda ham kuchli zilzilalar boʻlib turadi. Zilzila kuchi respublikamizda 12 balli shkala bilan oʻlchanadi. Vulqonlarning ogʻzi — krater, tagidagi magma oʻchogʻi va ularni bogʻlovchi kanali bor; hozir sayyoramizda 800 dan ortiq harakatdagi vulqon mavjud. Geyzer va issiq buloqlardan Islandiya, Yaponiya, Yangi Zelandiya kabi davlatlarda isitish va elektr energiyasi olishda foydalaniladi.",
      easy: "Seysmik mintaqalar: Tinch okean «olovli» halqasi, Alp–Himolay (Oʻzbekiston shu yerda); 12 balli shkala; 800+ vulqon.",
      draw: [
        { t: 'title', text: 'Seysmik mintaqalar' },
        { t: 'list', x: 4, y: 18, items: ['Tinch okean «olovli» halqasi', 'Alp–Himolay mintaqasi'] },
        { t: 'text', x: 4, y: 40, text: 'Oʻzbekiston — Alp–Himolay mintaqasida', size: 's', color: 'red' },
        { t: 'text', x: 4, y: 48, text: 'Zilzila kuchi: 12 balli shkala', size: 's' },
        { t: 'text', x: 4, y: 56, text: 'Harakatdagi vulqonlar: 800 dan ortiq', size: 's' }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Yer yer poʻsti, mantiya va yadrodan tuzilgan; yer poʻsti materik, okean, oraliq va riftogen turlarga boʻlinadi.',
    'Litosfera 13 ta plitaga boʻlingan; plitalar toʻqnashgan joylarda zilzila va vulqonlar koʻp boʻladi.',
    'Asosiy seysmik mintaqalar — Tinch okean «olovli» halqasi va Alp–Himolay mintaqasi; Oʻzbekiston Alp–Himolay mintaqasida, zilzila kuchi 12 balli shkalada oʻlchanadi.'
  ],
  questions: [
    {
      id: 'g4q1',
      prompt: 'Yer qobiqlarini tashqaridan ichkariga qarab tartiblang.',
      hint: 'Eng ichida — yadro.',
      explanation: 'Yer poʻsti → mantiya → tashqi yadro → ichki yadro.',
      widget: { type: 'order_line', props: { items: [{ label: 'yer poʻsti' }, { label: 'mantiya' }, { label: 'tashqi yadro' }, { label: 'ichki yadro' }] } }
    },
    {
      id: 'g4q2',
      prompt: 'Oʻzbekiston qaysi seysmik mintaqada joylashgan?',
      hint: 'Yevropadan Himolaygacha.',
      explanation: 'Alp–Himolay seysmik mintaqasida.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Alp–Himolay', 'Tinch okean «olovli» halqasi', 'Atlantika tizmasi', 'seysmik mintaqada emas'], answerIndex: 0 } }
    },
    {
      id: 'g4q3',
      prompt: 'Litosfera nechta yirik plitaga boʻlingan?',
      hint: 'Oʻndan koʻp.',
      explanation: '13 ta.',
      widget: { type: 'number_answer', props: { answer: 13, unit: 'ta' } }
    },
    {
      id: 'g4q4',
      prompt: 'Yer poʻsti turini tuzilishi bilan juftlang.',
      hint: 'Materik — uch qatlam.',
      explanation: 'Materik — choʻkindi, granit, bazalt; okean — choʻkindi va bazalt, 5–10 km; riftogen — oʻrta okean tizmalarida, eng yupqa.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'materik yer poʻsti', right: 'choʻkindi, granit va bazalt' },
            { left: 'okean yer poʻsti', right: 'choʻkindi va bazalt, 5–10 km' },
            { left: 'riftogen yer poʻsti', right: 'oʻrta okean tizmalarida' }
          ]
        }
      }
    },
    {
      id: 'g4q5',
      prompt: 'Vulqon qismlarini ustdan pastga tartiblang.',
      hint: 'Ogʻzi — krater.',
      explanation: 'Krater → vulqon kanali → magma oʻchogʻi.',
      widget: { type: 'order_line', props: { items: [{ label: 'krater' }, { label: 'vulqon kanali' }, { label: 'magma oʻchogʻi' }] } }
    },
    {
      id: 'g4q6',
      prompt: 'Respublikamizda zilzila kuchi necha balli shkala bilan oʻlchanadi?',
      hint: 'Oʻndan koʻp.',
      explanation: '12 balli.',
      widget: { type: 'number_answer', props: { answer: 12, unit: 'ball' } }
    },
    {
      id: 'g4q7',
      prompt: 'Geyzer va issiq buloqlardan energiya olishda foydalanadigan davlatlarni tanlang.',
      hint: 'Vulqonli hududlar.',
      explanation: 'Islandiya, Yaponiya, Italiya, Yangi Zelandiya.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'Islandiya', correct: true },
            { label: 'Yaponiya', correct: true },
            { label: 'Yangi Zelandiya', correct: true },
            { label: 'Italiya', correct: true },
            { label: 'Misr' }
          ]
        }
      }
    },
    {
      id: 'g4q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Mantiya — eng katta hajm.',
      explanation: 'Mantiya Yer hajmining 83 % ini tashkil etadi; zilzilalar tektonik, vulqon va oʻpirilish turlariga boʻlinadi.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Mantiya Yer hajmining eng katta qismini tashkil etadi.', value: true },
            { text: 'Zilzilalar tektonik, vulqon va oʻpirilish zilzilalariga boʻlinadi.', value: true },
            { text: 'Okean yer poʻstida qalin granit qatlami bor.', value: false },
            { text: 'Litosfera plitalari umuman harakatlanmaydi.', value: false }
          ]
        }
      }
    }
  ]
};
