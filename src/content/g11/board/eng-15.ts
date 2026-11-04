import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G3 } from './eng-cast';

/** Student's Book: Culture “Animals as national symbols” (pp. 62–63). */
export const ENG_15: BoardLesson = {
  n: 15,
  label: '15',
  lang: 'en',
  group: ENG_G3,
  easyLang: 'uz',
  title: 'Culture: Animals as national symbols',
  section: 'Culture 3',
  cast: { ...ENG_CAST },
  steps: [
    {
      kind: 'scene',
      say: 'Mr Collins starts a lesson about animals as national symbols. He shows the class some flags and coins.',
      easy: 'Mr Collins hayvonlar — milliy ramz haqida dars boshlaydi. Ramz (symbol) — biror gʻoyani bildiruvchi belgi. Koʻp davlatlarda bayroq, gerb va tangalarda hayvon tasviri bor.',
      draw: [],
      scene: {
        style: 'interview',
        place: '🏫 English lesson · national symbols',
        lines: [
          { who: 'narrator', text: 'Many countries have a national animal. It appears on flags, coins and coats of arms.', uz: 'Koʻp davlatlarning milliy hayvoni bor. U bayroq, tanga va gerblarda tasvirlanadi.' },
          { who: 'malika', text: 'Why do countries choose animals?', uz: 'Nega davlatlar hayvonlarni tanlaydi?' },
          { who: 'narrator', text: 'An animal can represent the qualities a nation admires: strength, freedom or wisdom.', uz: 'Hayvon xalq qadrlaydigan fazilatlarni ifodalashi mumkin: kuch, erkinlik yoki donolik.' },
          { who: 'timur', text: 'The bald eagle is the symbol of the USA, right?', uz: 'Oq boshli burgut AQSh ramzi, toʻgʻrimi?' },
          { who: 'narrator', text: 'Exactly. It represents freedom and strength.', uz: 'Aynan. U erkinlik va kuchni bildiradi.' }
        ],
        words: [
          { en: 'national animal', uz: 'milliy hayvon' },
          { en: 'coats of arms', uz: 'gerblar' },
          { en: 'represent', uz: 'ifodalamoq' },
          { en: 'qualities', uz: 'fazilatlar' }
        ]
      },
      next: 'Which animals?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Here are some famous national animals. The bald eagle for the USA. The kangaroo and the emu for Australia — they appear on its coat of arms. The kiwi, a bird that cannot fly, for New Zealand — New Zealanders even call themselves Kiwis. The beaver for Canada. And the lion is a symbol of England.',
      easy: 'Milliy hayvonlar: AQSh — oq boshli burgut; Avstraliya — kenguru va emu (gerbda); Yangi Zelandiya — kivi qushi (ucha olmaydi, aholi oʻzini “Kiwi” deb ataydi); Kanada — qunduz; Angliya — sher.',
      draw: [
        { t: 'title', text: 'National animals' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['country', 'animal'],
            ['the USA', 'bald eagle'],
            ['Australia', 'kangaroo and emu'],
            ['New Zealand', 'kiwi (bird)'],
            ['Canada', 'beaver'],
            ['England', 'lion']
          ]
        }
      ],
      next: 'And Uzbekistan?'
    },
    {
      kind: 'scene',
      say: 'Malika tells the class about the symbol of Uzbekistan.',
      easy: 'Oʻzbekiston gerbida afsonaviy Humo qushi tasvirlangan. U baxt va erkinlik ramzi. Humo — haqiqiy hayvon emas, afsonaviy qush.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🏫 Malika’s presentation',
        lines: [
          { who: 'malika', text: 'On the coat of arms of Uzbekistan there is the Humo bird.', uz: 'Oʻzbekiston gerbida Humo qushi tasvirlangan.' },
          { who: 'timur', text: 'Is it a real bird?', uz: 'Bu haqiqiy qushmi?' },
          { who: 'malika', text: 'No, it’s a legendary bird. In old stories it brings happiness.', uz: 'Yoʻq, bu afsonaviy qush. Qadimgi rivoyatlarda u baxt keltiradi.' },
          { who: 'narrator', text: 'So what does it represent today?', uz: 'Xoʻsh, bugun u nimani ifodalaydi?' },
          { who: 'malika', text: 'Happiness, freedom and a bright future for the country.', uz: 'Baxt, erkinlik va mamlakatning yorqin kelajagini.' }
        ],
        words: [
          { en: 'legendary', uz: 'afsonaviy' },
          { en: 'happiness', uz: 'baxt' },
          { en: 'freedom', uz: 'erkinlik' },
          { en: 'bright future', uz: 'yorqin kelajak' }
        ]
      },
      next: 'What do they mean?'
    },
    {
      kind: 'card',
      clear: true,
      say: 'National animals usually represent a quality. The eagle and the lion — strength and courage. The beaver — hard work. The kiwi — something unique, found only in New Zealand. The Humo bird — happiness and freedom.',
      easy: 'Har bir hayvon fazilatni bildiradi: burgut va sher — kuch va jasorat; qunduz — mehnatsevarlik; kivi — noyoblik; Humo — baxt va erkinlik.',
      draw: [
        { t: 'title', text: 'What they represent' },
        { t: 'box', id: 'a', x: 2, y: 16, w: 30, h: 12, text: 'eagle, lion: courage', color: 'orange' },
        { t: 'box', id: 'b', x: 35, y: 16, w: 30, h: 12, text: 'beaver: hard work', color: 'blue' },
        { t: 'box', id: 'c', x: 68, y: 16, w: 30, h: 12, text: 'Humo: happiness', color: 'green' },
        { t: 'text', x: 6, y: 42, text: 'kiwi: unique — only in New Zealand', size: 's', color: 'purple' }
      ],
      next: 'To the exercises'
    }
  ],
  summary: [
    'A national animal appears on flags, coins and coats of arms and represents the qualities a nation admires.',
    'The USA — bald eagle; Australia — kangaroo and emu; New Zealand — kiwi; Canada — beaver; England — lion.',
    'Uzbekistan’s coat of arms shows the legendary Humo bird — a symbol of happiness and freedom.'
  ],
  questions: [
    {
      id: 'e15q1',
      prompt: 'Match the countries to their national animals.',
      hint: 'Remember the table.',
      explanation: 'the USA — bald eagle; Australia — kangaroo; New Zealand — kiwi; Canada — beaver.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'the USA' }, right: { label: 'bald eagle' } },
            { left: { label: 'Australia' }, right: { label: 'kangaroo' } },
            { left: { label: 'New Zealand' }, right: { label: 'kiwi' } },
            { left: { label: 'Canada' }, right: { label: 'beaver' } }
          ]
        }
      }
    },
    {
      id: 'e15q2',
      prompt: 'Which bird is on the coat of arms of Uzbekistan?',
      hint: 'A legendary bird of happiness.',
      explanation: 'The Humo bird.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['the Humo bird', 'the bald eagle', 'the kiwi', 'the emu'], answerIndex: 0 } }
    },
    {
      id: 'e15q3',
      prompt: 'Complete the sentence.',
      hint: 'A story, not real.',
      explanation: 'The Humo is a legendary bird.',
      widget: { type: 'text_answer', props: { before: 'The Humo is a', after: 'bird.', answer: 'legendary', width: 10 } }
    },
    {
      id: 'e15q4',
      prompt: 'True or false?',
      hint: 'Think about the kiwi and the Humo.',
      explanation: 'The kiwi cannot fly; New Zealanders call themselves Kiwis; the Humo is not a real bird.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'The kiwi is a bird that cannot fly.', value: true },
            { text: 'People from New Zealand call themselves Kiwis.', value: true },
            { text: 'The Humo bird lives in Uzbek mountains today.', value: false },
            { text: 'The bald eagle represents freedom and strength.', value: true }
          ]
        }
      }
    },
    {
      id: 'e15q5',
      prompt: 'Match the animals to the qualities they represent.',
      hint: 'Which animal builds all day?',
      explanation: 'lion — courage; beaver — hard work; Humo — happiness.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'lion' }, right: { label: 'courage' } },
            { left: { label: 'beaver' }, right: { label: 'hard work' } },
            { left: { label: 'Humo' }, right: { label: 'happiness' } }
          ]
        }
      }
    },
    {
      id: 'e15q6',
      prompt: 'Which word is the odd one out?',
      hint: 'Three are real animals.',
      explanation: 'The kangaroo, beaver and kiwi are real animals; the Humo is a legendary bird.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'kangaroo' }, { text: 'beaver' }, { text: 'kiwi' }, { text: 'Humo', odd: true }] } }
    },
    {
      id: 'e15q7',
      prompt: 'Put the words in order.',
      hint: 'Start with “The bald eagle”.',
      explanation: 'The bald eagle is the symbol of the USA.',
      widget: { type: 'sentence_order', props: { words: ['The', 'bald', 'eagle', 'is', 'the', 'symbol', 'of', 'the', 'USA.'] } }
    }
  ]
};
