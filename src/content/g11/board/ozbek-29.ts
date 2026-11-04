import type { BoardLesson } from './types';
import { OZG2 } from './ozbek-25';

/** Darslik: Ona tili 11, 2-qism (2020), 6-mavzu (19–22-betlar) — qoʻshma va juft soʻzlarning imlosi: qoʻshib yoki ajratib yozish. */
export const OZ_29: BoardLesson = {
  n: 29,
  label: '29',
  group: OZG2,
  title: 'Qoʻshib yoziladimi, ajratib?',
  section: 'Ona tili, 2-qism: 6-mavzu',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "Qoʻshma soʻzlar imlosiga koʻra ikki guruhga boʻlinadi. Bitta urgʻuli qoʻshma soʻzlar qoʻshib yoziladi: «uchburchak», «olibsotar». Har bir qismi alohida urgʻu olsa, ajratib yoziladi: «olib kelmoq», «xarid qilmoq», «Oʻzbekiston Respublikasi». Butunlay qoʻshma soʻzga aylangan birikma qoʻshib yoziladi — «soʻzboshi», endi aylanayotgani ajratib yoziladi — «temir yoʻl», «osma koʻprik». Juft soʻzlar chiziqcha bilan yoki «-u, -yu» bilan yoziladi: «katta-kichik», «katta-yu kichik».",
      easy: "Bitta urgʻu — qoʻshib yoz (uchburchak). Ikki urgʻu — ajratib yoz (olib kelmoq).",
      draw: [
        { t: 'title', text: 'Qoʻshib yoki ajratib' },
        { t: 'table', x: 4, y: 18, rows: [['qoʻshib yoziladi', 'ajratib yoziladi'], ['uchburchak', 'olib kelmoq'], ['soʻzboshi', 'temir yoʻl'], ['qoʻziqorin', 'har xil'], ['jigarrang', 'toʻq qizil'], ['birpas', 'sakkiz yuz']] }
      ],
      next: 'Boshladik!'
    }
  ],
  summary: [
    'Bitta urgʻuli qoʻshma soʻzlar qoʻshib, har bir qismi urgʻu oladiganlari ajratib yoziladi.',
    'Toʻliq qoʻshma soʻzga aylangan birikmalar qoʻshib (soʻzboshi), aylanayotganlari ajratib (temir yoʻl) yoziladi.',
    'Juft soʻzlar chiziqcha bilan yoki -u (-yu) bilan yoziladi: katta-kichik, katta-yu kichik.'
  ],
  questions: [
    {
      id: 'oz29q1',
      prompt: 'Soʻzlarni yozilishiga koʻra ajrating.',
      hint: '«Har xil» ajratib yoziladi.',
      explanation: 'Qoʻshib — uchburchak, qoʻziqorin, jigarrang, birpas; ajratib — har xil, toʻq qizil, sakkiz yuz, hamma vaqt.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'q', label: 'qoʻshib' }, { id: 'a', label: 'ajratib' }],
          items: [
            { emoji: '🔺', label: 'uchburchak', bin: 'q' },
            { emoji: '🍄', label: 'qoʻziqorin', bin: 'q' },
            { emoji: '🟤', label: 'jigarrang', bin: 'q' },
            { emoji: '🎨', label: 'har xil', bin: 'a' },
            { emoji: '🟥', label: 'toʻq qizil', bin: 'a' },
            { emoji: '🔢', label: 'sakkiz yuz', bin: 'a' }
          ]
        }
      }
    },
    {
      id: 'oz29q2',
      prompt: 'Qaysi yozuv toʻgʻri?',
      hint: 'Ikki soʻz, ikki urgʻu.',
      explanation: '«Hamma vaqt» ajratib yoziladi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['hamma vaqt', 'hammavaqt', 'hamma-vaqt'], answerIndex: 0 } }
    },
    {
      id: 'oz29q3',
      prompt: 'Qoʻshma soʻz qachon qoʻshib yoziladi?',
      hint: 'Urgʻu soni.',
      explanation: 'Unda bitta soʻz urgʻusi boʻlsa.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bitta urgʻusi boʻlsa', 'har bir qismi urgʻu olsa', 'har doim', 'hech qachon'], answerIndex: 0 } }
    },
    {
      id: 'oz29q4',
      prompt: 'Juft soʻzning toʻgʻri yozilishlarini tanlang.',
      hint: 'Chiziqcha yoki -yu.',
      explanation: '«Katta-kichik» va «katta-yu kichik» — ikkalasi toʻgʻri.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'katta-kichik', correct: true },
            { label: 'katta-yu kichik', correct: true },
            { label: 'kattakichik' },
            { label: 'katta kichik' }
          ]
        }
      }
    },
    {
      id: 'oz29q5',
      prompt: 'Qaysi qatorda barcha soʻzlar toʻgʻri yozilgan?',
      hint: 'Oʻn bir, och sariq — ajratib.',
      explanation: '«Oʻn bir, och sariq, sotib ol» — ajratib yoziladi va shunday yozilgan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['oʻn bir, och sariq, sotib ol', 'oʻnbir, ochsariq, sotibol', 'oʻnbir, och sariq, sotib ol', 'oʻn bir, ochsariq, sotibol'], answerIndex: 0 } }
    },
    {
      id: 'oz29q6',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Temir yoʻl.',
      explanation: '«Temir yoʻl» hali qoʻshma soʻzga toʻliq aylanmagan — ajratib yoziladi; «soʻzboshi» — qoʻshib.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: '«Temir yoʻl» ajratib yoziladi.', value: true },
            { text: '«Soʻzboshi» qoʻshib yoziladi.', value: true },
            { text: '«Olib kelmoq» qoʻshib yoziladi.', value: false }
          ]
        }
      }
    }
  ]
};
