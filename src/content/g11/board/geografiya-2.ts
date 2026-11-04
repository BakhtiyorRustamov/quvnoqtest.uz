import type { BoardLesson } from './types';
import { GEO1 } from './geografiya-1';

/** Darslik: Geografiya 10, 2-§ (6–11-betlar) — geografiya fanining rivojlanish bosqichlari: antik davr, oʻrta asrlar, buyuk geografik kashfiyotlar, ilmiy geografiya, hozirgi zamon. */
export const GEO_2: BoardLesson = {
  n: 2,
  label: '2',
  group: GEO1,
  title: 'Geografiya fanining tarixi',
  section: '2-§',
  steps: [
    {
      kind: 'hook',
      clear: true,
      say: "Geografiya — eng qadimgi fanlardan biri. Antik davrda Aristotel Yerning sharsimonligini mantiqan isbotladi, Eratosfen birinchi boʻlib Yerning kattaligini oʻlchadi va «Geografika» kitobini yozdi, Ptolemey 8 jildlik «Geografiya»ni yaratib, daraja toʻrini ixtiro qildi. Oʻrta asrlarda fan asosan Sharqda rivojlandi: al-Xorazmiy Yer oʻlchamlarini aniqroq hisobladi va «Surat al-arz»ni yozdi, Beruniy geografiyaga oid 22 ta asar yaratdi va globus yasadi, Ahmad Fargʻoniy «Nilometr» asbobini yaratdi, Bobur «Boburnoma»da oʻlkalar tabiatini tasvirladi.",
      easy: "Antik davr: Aristotel, Eratosfen, Ptolemey. Oʻrta asrlar: al-Xorazmiy, Beruniy, Fargʻoniy, Bobur.",
      draw: [
        { t: 'title', text: 'Olimlar va hissalari' },
        { t: 'table', x: 4, y: 18, rows: [['olim', 'hissasi'], ['Eratosfen', 'Yer kattaligini oʻlchadi'], ['Ptolemey', '8 jildlik «Geografiya»'], ['al-Xorazmiy', '«Surat al-arz»'], ['Beruniy', '22 asar, globus'], ['Ahmad Fargʻoniy', '«Nilometr»']] }
      ],
      next: 'Kashfiyotlar'
    },
    {
      kind: 'explain',
      clear: true,
      say: "XV asr oxirida Buyuk geografik kashfiyotlar davri boshlandi: 1492-yilda Kolumb Amerikaga yetib bordi, 1498-yilda Vasko da Gama Afrikani aylanib Hindistonga dengiz yoʻlini ochdi, Magellan ekspeditsiyasi dunyo boʻylab birinchi sayohatni amalga oshirib, Yerning sharsimonligini amalda isbotladi. 1605-yilda Avstraliya kashf etildi. Keyin ilmiy ekspeditsiyalar davri keldi: J. Kuk dunyo boʻylab uch marta suzdi, Bellinsgauzen va Lazarev Antarktidani kashf etdi, 1911-yilda R. Amundsen Janubiy qutbga yetdi. A. Gumboldt tabiatni yaxlit tizim sifatida oʻrganib, yangi geografiyaga asos soldi. Hozir geografiyada kompyuter, geografik axborot tizimlari va kosmik usullar keng qoʻllanilmoqda.",
      easy: "1492 — Kolumb; 1498 — Vasko da Gama; Magellan — dunyo boʻylab; Antarktida — Bellinsgauzen va Lazarev; 1911 — Amundsen.",
      draw: [
        { t: 'title', text: 'Kashfiyotlar' },
        { t: 'table', x: 4, y: 18, rows: [['yil', 'voqea'], ['1492', 'Kolumb — Amerika'], ['1498', 'Vasko da Gama — Hindiston'], ['1519', 'Magellan sayohati boshlandi'], ['1605', 'Avstraliya kashf etildi'], ['1911', 'Amundsen — Janubiy qutb']] }
      ],
      next: 'Tushundim!'
    }
  ],
  summary: [
    'Antik davrda Yerning sharsimonligi isbotlandi, Eratosfen uning kattaligini oʻlchadi, Ptolemey daraja toʻrini ixtiro qildi.',
    'Oʻrta asrlarda geografiya Sharqda rivojlandi: al-Xorazmiy, Beruniy, Ahmad Fargʻoniy, Bobur katta hissa qoʻshdi.',
    'Buyuk geografik kashfiyotlar Amerika va Avstraliyani ochdi, Yerning sharsimonligini amalda isbotladi; keyin ilmiy geografiya va zamonaviy kosmik usullar rivojlandi.'
  ],
  questions: [
    {
      id: 'g2q1',
      prompt: 'Olimni hissasi bilan juftlang.',
      hint: 'Nilometr — Fargʻoniy.',
      explanation: 'Eratosfen — Yer kattaligini oʻlchadi; Beruniy — globus yasadi; Ahmad Fargʻoniy — «Nilometr»; Bobur — «Boburnoma».',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'Eratosfen', right: 'Yer kattaligini oʻlchadi' },
            { left: 'Beruniy', right: 'globus yasadi' },
            { left: 'Ahmad Fargʻoniy', right: '«Nilometr» asbobi' },
            { left: 'Bobur', right: '«Boburnoma»' }
          ]
        }
      }
    },
    {
      id: 'g2q2',
      prompt: 'Kashfiyotlarni xronologik tartibda joylashtiring.',
      hint: 'Kolumb — birinchi.',
      explanation: 'Kolumb (1492) → Vasko da Gama (1498) → Magellan (1519) → Avstraliya (1605) → Amundsen (1911).',
      widget: { type: 'order_line', props: { items: [{ label: 'Kolumb Amerikaga yetdi' }, { label: 'Vasko da Gama Hindistonga yetdi' }, { label: 'Magellan sayohati' }, { label: 'Avstraliya kashf etildi' }, { label: 'Amundsen Janubiy qutbda' }] } }
    },
    {
      id: 'g2q3',
      prompt: 'Beruniyning geografiyaga oid nechta asari bor?',
      hint: 'Yigirmadan koʻp.',
      explanation: '22 ta.',
      widget: { type: 'number_answer', props: { answer: 22, unit: 'ta' } }
    },
    {
      id: 'g2q4',
      prompt: 'Qaysi ekspeditsiya Yerning sharsimonligi va Dunyo okeanining yaxlitligini amalda isbotladi?',
      hint: 'Dunyo boʻylab birinchi sayohat.',
      explanation: 'Magellan ekspeditsiyasi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Magellan', 'Kolumb', 'Vasko da Gama', 'Marko Polo'], answerIndex: 0 } }
    },
    {
      id: 'g2q5',
      prompt: 'Olimni davriga ajrating.',
      hint: 'Ptolemey — antik.',
      explanation: 'Antik davr — Aristotel, Eratosfen, Ptolemey; oʻrta asrlar — al-Xorazmiy, Beruniy, Yoqut Hamaviy.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 'a', label: 'antik davr' }, { id: 'o', label: 'oʻrta asrlar' }],
          items: [
            { emoji: '🏛️', label: 'Aristotel', bin: 'a' },
            { emoji: '📏', label: 'Eratosfen', bin: 'a' },
            { emoji: '🗺️', label: 'Ptolemey', bin: 'a' },
            { emoji: '📘', label: 'al-Xorazmiy', bin: 'o' },
            { emoji: '🌐', label: 'Beruniy', bin: 'o' },
            { emoji: '📖', label: 'Yoqut Hamaviy', bin: 'o' }
          ]
        }
      }
    },
    {
      id: 'g2q6',
      prompt: 'Antarktidani kim kashf etgan?',
      hint: 'Rus dengizchilari.',
      explanation: 'F. F. Bellinsgauzen va M. P. Lazarev.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Bellinsgauzen va Lazarev', 'Kolumb', 'J. Kuk', 'Vasko da Gama'], answerIndex: 0 } }
    },
    {
      id: 'g2q7',
      prompt: 'Hozirgi zamon geografiyasida qoʻllanilayotgan usullarni tanlang.',
      hint: 'Texnologiya.',
      explanation: 'Geografik axborot tizimlari, kompyuter modellashtirish, kosmik usullar.',
      widget: {
        type: 'pick_many',
        props: {
          options: [
            { label: 'geografik axborot tizimlari', correct: true },
            { label: 'kompyuter modellashtirish', correct: true },
            { label: 'kosmik suratlar', correct: true },
            { label: 'faqat ogʻzaki rivoyatlar' }
          ]
        }
      }
    },
    {
      id: 'g2q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Gumboldt — yaxlit tabiat.',
      explanation: 'Gumboldt tabiatni yaxlit tizim sifatida oʻrganib yangi geografiyani yaratgan; Turkistonda geografiya jamiyati 1897-yilda tuzilgan.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'A. Gumboldt tabiatni yaxlit tizim sifatida oʻrganib, yangi geografiyaga asos solgan.', value: true },
            { text: 'Turkistonda geografiya jamiyati 1897-yilda tuzilgan.', value: true },
            { text: 'Kolumb Amerikani Hindiston emasligini bilgan.', value: false },
            { text: 'Oʻrta asrlarda geografiya faqat Yevropada rivojlangan.', value: false }
          ]
        }
      }
    }
  ]
};
