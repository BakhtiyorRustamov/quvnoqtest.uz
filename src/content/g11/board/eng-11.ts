import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G2 } from './eng-cast';

/** Student's Book: Unit 8 “Amazing architecture” (pp. 46–49) — describing buildings, strong adjectives and adverbs, comparatives and superlatives. */
export const ENG_11: BoardLesson = {
  n: 11,
  label: '11',
  lang: 'en',
  group: ENG_G2,
  easyLang: 'uz',
  title: 'Amazing architecture',
  section: 'Unit 8',
  cast: {
    ...ENG_CAST,
    guide: { name: 'Tour guide', emoji: '', color: '#B7791F', azure: '', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'The class is on a school trip to Samarkand. A guide shows them the Registan.',
      easy: 'Sinf Samarqandga sayohatga bordi. Historic — tarixiy, traditional — anʼanaviy, spectacular — hayratlanarli, original — oʻziga xos, modern — zamonaviy, brand new — yangi qurilgan, cosy — shinam, unusual — gʻayrioddiy.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🕌 The Registan, Samarkand',
        lines: [
          { who: 'guide', text: 'Welcome to the Registan — one of the most historic squares in Central Asia.', uz: 'Registonga xush kelibsiz — Markaziy Osiyodagi eng tarixiy maydonlardan biri.' },
          { who: 'malika', text: 'The blue tiles are spectacular! Are they original?', uz: 'Moviy koshinlar hayratlanarli! Ular asl nusxami?' },
          { who: 'guide', text: 'Many are original, and some were carefully restored in a traditional style.', uz: 'Koʻpi asl, baʼzilari esa anʼanaviy uslubda ehtiyotkorlik bilan tiklangan.' },
          { who: 'timur', text: 'It’s so different from the modern buildings in Tashkent.', uz: 'Bu Toshkentdagi zamonaviy binolardan juda farq qiladi.' },
          { who: 'guide', text: 'Yes — here old and new meet. Across the city there are brand new hotels too.', uz: 'Ha — bu yerda eski va yangi uchrashadi. Shaharda yangi qurilgan mehmonxonalar ham bor.' }
        ],
        words: [
          { en: 'historic', uz: 'tarixiy' },
          { en: 'spectacular', uz: 'hayratlanarli' },
          { en: 'original', uz: 'asl, oʻziga xos' },
          { en: 'traditional', uz: 'anʼanaviy' },
          { en: 'modern', uz: 'zamonaviy' },
          { en: 'brand new', uz: 'butunlay yangi' }
        ]
      },
      next: 'Strong adjectives'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Strong adjectives already mean “very”. Very big is enormous. Very tired is exhausted. Very cold is freezing. Very old is ancient. Very bad is terrible. With strong adjectives use absolutely, not very: absolutely enormous. With normal adjectives use very, extremely or incredibly: extremely tall.',
      easy: 'Kuchli sifatlar: enormous (juda katta), exhausted (juda charchagan), freezing (juda sovuq), ancient (juda qadimiy), terrible (juda yomon). Ular bilan absolutely ishlatiladi (absolutely freezing), very emas. Oddiy sifatlar bilan — very, extremely, incredibly.',
      draw: [
        { t: 'title', text: 'Strong adjectives' },
        {
          t: 'table',
          x: 6,
          y: 14,
          rows: [
            ['very + normal', 'strong'],
            ['very big', 'enormous'],
            ['very tired', 'exhausted'],
            ['very cold', 'freezing'],
            ['very old', 'ancient']
          ]
        },
        { t: 'text', x: 6, y: 48, text: '✓ absolutely enormous  ✗ very enormous', size: 's', color: 'orange' },
        { t: 'text', x: 6, y: 56, text: 'extremely / incredibly + normal adjective', size: 's', color: 'purple' }
      ],
      next: 'Now the grammar'
    },
    {
      kind: 'scene',
      say: 'On the bus home, Malika and Timur compare the buildings they saw.',
      easy: 'Qiyoslash: qisqa sifat + -er (taller, older), uzun sifat — more (more beautiful). Eng yuqori daraja: the + -est (the tallest), the most (the most beautiful). Istisnolar: good — better — the best, bad — worse — the worst.',
      draw: [],
      scene: {
        style: 'chat',
        place: '🚌 On the bus back to Tashkent',
        lines: [
          { who: 'malika', text: 'I think the Registan is more beautiful than any building in Tashkent.', uz: 'Menimcha, Registon Toshkentdagi har qanday binodan chiroyliroq.' },
          { who: 'timur', text: 'Maybe, but the TV Tower in Tashkent is much taller.', uz: 'Balki, lekin Toshkent teleminorasi ancha balandroq.' },
          { who: 'malika', text: 'Is it the tallest tower in Central Asia?', uz: 'U Markaziy Osiyodagi eng baland minorami?' },
          { who: 'timur', text: 'Yes, it is! But for me, the best part of the trip was the old bazaar.', uz: 'Ha! Lekin men uchun sayohatning eng yaxshi qismi eski bozor boʻldi.' },
          { who: 'malika', text: 'The worst part was the bus. I’m absolutely exhausted!', uz: 'Eng yomon qismi — avtobus. Juda charchadim!' }
        ],
        words: [
          { en: 'more beautiful than', uz: '…dan chiroyliroq' },
          { en: 'much taller', uz: 'ancha balandroq' },
          { en: 'the tallest', uz: 'eng baland' },
          { en: 'the best', uz: 'eng yaxshi' },
          { en: 'the worst', uz: 'eng yomon' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Comparatives compare two things: short adjectives add -er — taller, older; long adjectives use more — more beautiful. Superlatives say something is number one: the tallest, the most beautiful. Irregular forms: good, better, the best; bad, worse, the worst. Use than after a comparative, and much or a lot to make it stronger: much taller.',
      easy: 'Qisqa sifat: tall → taller → the tallest. Uzun sifat: beautiful → more beautiful → the most beautiful. Istisno: good → better → the best; bad → worse → the worst. Qiyoslashda than ishlatiladi; kuchaytirish — much / a lot.',
      draw: [
        { t: 'title', text: 'Comparatives and superlatives' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['adjective', 'comparative', 'superlative'],
            ['tall', 'taller', 'the tallest'],
            ['big', 'bigger', 'the biggest'],
            ['beautiful', 'more beautiful', 'the most beautiful'],
            ['good', 'better', 'the best'],
            ['bad', 'worse', 'the worst']
          ]
        },
        { t: 'text', x: 4, y: 52, text: 'much taller than · a lot older than', size: 's', color: 'purple' }
      ],
      next: 'Describing a picture'
    },
    {
      kind: 'scene',
      say: 'In class, the students describe photos of buildings. Mr Collins helps Timur.',
      easy: 'Rasmni tasvirlash: avval umumiy (In this picture I can see…), keyin tafsilotlar (In the foreground / In the background…), soʻng fikringiz (I think…, It looks…).',
      draw: [],
      scene: {
        style: 'interview',
        place: 'Speaking practice · describing a picture',
        lines: [
          { who: 'narrator', text: 'Timur, describe this photo. Start with the general idea.', uz: 'Timur, bu rasmni tasvirla. Umumiy fikrdan boshla.' },
          { who: 'timur', text: 'In this picture I can see an unusual house. It looks like a big egg!', uz: 'Bu rasmda gʻayrioddiy uy koʻryapman. U katta tuxumga oʻxshaydi!' },
          { who: 'narrator', text: 'Good. Now add details: what’s in the foreground and the background?', uz: 'Yaxshi. Endi tafsilot qoʻsh: oldingi va orqa planda nima bor?' },
          { who: 'timur', text: 'In the foreground there’s a garden. In the background there are some modern flats.', uz: 'Oldingi planda bogʻ bor. Orqa planda zamonaviy uylar bor.' },
          { who: 'narrator', text: 'Great. Finish with your opinion.', uz: 'Zoʻr. Fikring bilan yakunla.' },
          { who: 'timur', text: 'I think it’s more original than a normal house, but maybe less cosy.', uz: 'Menimcha, u oddiy uydan koʻra oʻziga xosroq, lekin balki kamroq shinam.' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'Describing buildings: historic, traditional, modern, brand new, spectacular, original, unusual, cosy.',
    'Strong adjectives: enormous, exhausted, freezing, ancient, terrible — use absolutely, not very.',
    'Comparatives: taller, more beautiful (+ than); superlatives: the tallest, the most beautiful.',
    'Irregular: good — better — the best; bad — worse — the worst.',
    'Describing a picture: In this picture I can see… In the foreground/background… I think…'
  ],
  questions: [
    {
      id: 'e11q1',
      prompt: 'Match the normal and strong adjectives.',
      hint: 'Strong adjectives mean “very”.',
      explanation: 'very big — enormous; very tired — exhausted; very cold — freezing; very old — ancient.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'very big' }, right: { label: 'enormous' } },
            { left: { label: 'very tired' }, right: { label: 'exhausted' } },
            { left: { label: 'very cold' }, right: { label: 'freezing' } },
            { left: { label: 'very old' }, right: { label: 'ancient' } }
          ]
        }
      }
    },
    {
      id: 'e11q2',
      prompt: 'Choose the correct word.',
      hint: 'Strong adjectives go with “absolutely”.',
      explanation: 'The Registan is absolutely spectacular.',
      widget: { type: 'mcq', props: { prompt: 'The Registan is ___ spectacular.', choices: ['absolutely', 'very', 'a bit', 'more'], answerIndex: 0 } }
    },
    {
      id: 'e11q3',
      prompt: 'Complete with the superlative.',
      hint: 'tall → the …',
      explanation: 'The TV Tower is the tallest tower in Central Asia.',
      widget: { type: 'text_answer', props: { before: 'The TV Tower is the', after: 'tower in Central Asia.', answer: 'tallest', width: 8 } }
    },
    {
      id: 'e11q4',
      prompt: 'Complete the sentences.',
      hint: 'good → better → the best; beautiful → more beautiful.',
      explanation: 'The Registan is more beautiful than my school. The bazaar was the best part of the trip.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'The Registan is' }, { blank: 'more beautiful' }, { text: 'than my school. The bazaar was the' }, { blank: 'best' }, { text: 'part of the trip.' }],
          bank: ['more beautiful', 'best', 'beautifuller', 'goodest']
        }
      }
    },
    {
      id: 'e11q5',
      prompt: 'Tap all the correct sentences.',
      hint: 'Short adjectives: -er; long ones: more.',
      explanation: 'Correct: “This house is bigger than mine.”, “It’s the most modern building here.”, “Today is worse than yesterday.”',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'This house is bigger than mine.', match: true },
            { id: 'b', text: 'It’s the most modern building here.', match: true },
            { id: 'c', text: 'This tower is more tall.', match: false },
            { id: 'd', text: 'Today is worse than yesterday.', match: true },
            { id: 'e', text: 'It was the baddest day.', match: false }
          ]
        }
      }
    },
    {
      id: 'e11q6',
      prompt: 'True or false?',
      hint: 'Remember the trip to Samarkand.',
      explanation: 'The guide said many tiles are original; Timur thinks the TV Tower is taller; Malika was exhausted after the bus.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Many tiles on the Registan are original.', value: true },
            { text: 'Timur says the Registan is taller than the TV Tower.', value: false },
            { text: 'For Timur, the best part was the old bazaar.', value: true },
            { text: 'Malika felt absolutely exhausted after the bus.', value: true }
          ]
        }
      }
    },
    {
      id: 'e11q7',
      prompt: 'Put the picture description in order.',
      hint: 'General → details → opinion.',
      explanation: 'In this picture I can see… → In the foreground… → In the background… → I think…',
      widget: { type: 'step_order', props: { steps: ['In this picture I can see a house.', 'In the foreground there’s a garden.', 'In the background there are flats.', 'I think it looks very original.'] } }
    },
    {
      id: 'e11q8',
      prompt: 'Which word is the odd one out?',
      hint: 'Three words describe something old.',
      explanation: 'Ancient, historic and traditional are about the past; brand new is not.',
      widget: { type: 'odd_one_out', props: { tiles: [{ text: 'ancient' }, { text: 'historic' }, { text: 'traditional' }, { text: 'brand new', odd: true }] } }
    }
  ]
};
