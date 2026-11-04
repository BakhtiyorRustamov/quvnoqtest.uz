import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G1 } from './eng-cast';

/** Student's Book: Culture “Shopping in London” (pp. 18–19) — places to shop, a survey on teen shopping habits. */
export const ENG_3: BoardLesson = {
  n: 3,
  label: '3',
  lang: 'en',
  group: ENG_G1,
  easyLang: 'uz',
  title: 'Culture: Shopping in London',
  section: 'Culture 1',
  cast: {
    ...ENG_CAST,
    olivia: { name: 'Olivia', emoji: '', color: '#C53030', azure: 'en-GB-SoniaNeural', accent: 'en-GB', gender: 'f' },
    stall: { name: 'Stall owner', emoji: '', color: '#975A16', azure: 'en-GB-RyanNeural', accent: 'en-GB', gender: 'm' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Malika is going to London with her family. She messages her pen friend Olivia.',
      easy: 'Malika Londonga boradi va doʻsti Oliviyadan qayerda xarid qilishni soʻrayapti. Oxford Street — juda gavjum, katta doʻkonlar koʻchasi. Camden Market — rastalar (stalls), ishlatilgan (second-hand) kiyimlar, gʻayrioddiy uslub.',
      draw: [],
      scene: {
        style: 'phone',
        place: '💬 Olivia (London)',
        lines: [
          { who: 'malika', text: 'Olivia! I’m coming to London next month. Where should I go shopping?', uz: 'Oliviya! Keyingi oy Londonga boraman. Qayerda xarid qilsam boʻladi?' },
          { who: 'olivia', text: 'Oxford Street is the most famous. It’s full of big shops, but it’s always really busy.', uz: 'Eng mashhuri — Oxford Street. U yerda katta doʻkonlar koʻp, lekin doim juda gavjum.' },
          { who: 'malika', text: 'I don’t like crowds. Is there anything more unusual?', uz: 'Olomonni yoqtirmayman. Gʻayrioddiyroq joy bormi?' },
          { who: 'olivia', text: 'Then try Camden Market! There are hundreds of stalls with second-hand clothes and street food.', uz: 'Unda Camden Marketga bor! U yerda ishlatilgan kiyimlar va koʻcha taomlari sotiladigan yuzlab rastalar bor.' },
          { who: 'malika', text: 'Perfect. I love finding cheap vintage stuff!', uz: 'Zoʻr. Arzon eski uslubdagi narsalarni topishni yaxshi koʻraman!' }
        ],
        words: [
          { en: 'busy', uz: 'gavjum' },
          { en: 'stalls', uz: 'rastalar' },
          { en: 'second-hand', uz: 'ishlatilgan' }
        ]
      },
      next: 'Show me London'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Here are four famous places to shop in London. Oxford Street for big shops. Camden Market for stalls and alternative fashion. Carnaby Street, a street for walkers only, famous for fashion since the nineteen sixties. And Westfield, a huge shopping centre with a cinema.',
      easy: 'Londondagi 4 ta joy: Oxford Street — katta doʻkonlar, gavjum. Camden Market — rastalar, oʻziga xos uslub. Carnaby Street — faqat piyodalar uchun koʻcha, 1960-yillardan beri moda bilan mashhur. Westfield — ulkan savdo markazi, ichida kinoteatr ham bor.',
      draw: [
        { t: 'title', text: 'Shopping in London' },
        { t: 'box', id: 'o', x: 4, y: 14, w: 44, h: 11, text: '🏬 Oxford Street', color: 'blue' },
        { t: 'text', x: 6, y: 31, text: 'big shops · very busy', size: 's', color: 'blue' },
        { t: 'box', id: 'c', x: 52, y: 14, w: 44, h: 11, text: '🎪 Camden Market', color: 'orange' },
        { t: 'text', x: 54, y: 31, text: 'stalls · second-hand', size: 's', color: 'orange' },
        { t: 'box', id: 'k', x: 4, y: 40, w: 44, h: 11, text: '🛍️ Carnaby Street', color: 'purple' },
        { t: 'text', x: 6, y: 57, text: 'pedestrian · 1960s fashion', size: 's', color: 'purple' },
        { t: 'box', id: 'w', x: 52, y: 40, w: 44, h: 11, text: '🎬 Westfield', color: 'green' },
        { t: 'text', x: 54, y: 57, text: 'huge centre · cinema', size: 's', color: 'green' }
      ],
      next: 'Next'
    },
    {
      kind: 'scene',
      say: 'Two weeks later. Malika is at Camden Market.',
      easy: 'Malika Camden Marketdagi rastada kurtka koʻryapti. Savdolashadi: narx 30 funt, u 25 ga oladi. “How much is it?” — “Qancha turadi?”. “Can I try it on?” — “Kiyib koʻrsam boʻladimi?”. “It’s a deal” — “Kelishdik”.',
      draw: [],
      scene: {
        style: 'stage',
        place: '🎪 A clothes stall at Camden Market',
        lines: [
          { who: 'malika', text: 'Excuse me, how much is this denim jacket?', uz: 'Kechirasiz, bu jinsi kurtka qancha turadi?' },
          { who: 'stall', text: 'Thirty pounds. It’s second-hand, but it’s in great condition.', uz: 'Oʻttiz funt. Ishlatilgan, lekin holati juda yaxshi.' },
          { who: 'malika', text: 'Can I try it on?', uz: 'Kiyib koʻrsam boʻladimi?' },
          { who: 'stall', text: 'Of course. It looks trendy on you!', uz: 'Albatta. Sizga juda zamonaviy yarashdi!' },
          { who: 'malika', text: 'Thanks! Would you take twenty-five?', uz: 'Rahmat! Yigirma beshga berasizmi?' },
          { who: 'stall', text: 'OK, twenty-five. It’s a deal!', uz: 'Xoʻp, yigirma besh. Kelishdik!' }
        ],
        words: [
          { en: 'How much', uz: 'qancha turadi' },
          { en: 'try it on', uz: 'kiyib koʻrmoq' },
          { en: 'trendy', uz: 'zamonaviy, urfda' },
          { en: 'It’s a deal', uz: 'kelishdik' }
        ]
      },
      next: 'What else?'
    },
    {
      kind: 'scene',
      say: 'Back in Tashkent, Malika and Timur do a survey about shopping in their school. Listen to their report on the school radio.',
      easy: 'Maktab radiosi: oʻquvchilar qanchalik tez-tez xarid qilishadi. Weekly — har hafta, monthly — har oy, hardly ever — deyarli hech qachon. In-store — doʻkonda, online — internetda. Natijalar foizlarda aytiladi.',
      draw: [],
      scene: {
        style: 'interview',
        place: 'School radio · Our shopping survey',
        lines: [
          { who: 'timur', text: 'We asked fifty students in our school about shopping.', uz: 'Maktabimizdagi ellik nafar oʻquvchidan xarid haqida soʻradik.' },
          { who: 'malika', text: 'First question: how often do you go shopping? Most students go monthly. Only a few go weekly.', uz: 'Birinchi savol: qanchalik tez-tez xarid qilasiz? Koʻpchilik oyda bir marta boradi. Faqat bir nechtasi har hafta.' },
          { who: 'timur', text: 'Some of them hardly ever go to shops. They prefer shopping online.', uz: 'Baʼzilari doʻkonga deyarli bormaydi. Ular internetdan xarid qilishni afzal koʻradi.' },
          { who: 'malika', text: 'Second question: what do you buy? Clothes are number one, then books and games.', uz: 'Ikkinchi savol: nima sotib olasiz? Birinchi oʻrinda kiyim, keyin kitob va oʻyinlar.' },
          { who: 'timur', text: 'And the most surprising answer: most students get their money from their grandparents!', uz: 'Eng kutilmagan javob: koʻpchilik pulni buvi-bobosidan oladi!' }
        ],
        words: [
          { en: 'monthly', uz: 'har oy' },
          { en: 'weekly', uz: 'har hafta' },
          { en: 'hardly ever', uz: 'deyarli hech qachon' },
          { en: 'surprising', uz: 'kutilmagan' }
        ]
      },
      next: 'Let’s practise'
    }
  ],
  summary: [
    'Oxford Street — big shops, very busy; Camden Market — stalls, second-hand clothes.',
    'Carnaby Street — for pedestrians, famous for fashion; Westfield — a huge shopping centre with a cinema.',
    'At a stall: How much is it? Can I try it on? Would you take…? It’s a deal!',
    'How often: weekly, monthly, hardly ever; in-store or online.',
    'Reporting a survey: We asked… Most students… Only a few… The most surprising answer was…'
  ],
  questions: [
    {
      id: 'e3q1',
      prompt: 'Where should they go? Match the people to the places.',
      hint: 'Look at the map card again.',
      explanation: 'Second-hand clothes — Camden Market; shopping and a film — Westfield; big famous shops — Oxford Street; walking without cars — Carnaby Street.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'I want second-hand clothes.' }, right: { label: 'Camden Market' } },
            { left: { label: 'I want to shop and then see a film.' }, right: { label: 'Westfield' } },
            { left: { label: 'I want big famous shops.' }, right: { label: 'Oxford Street' } },
            { left: { label: 'I want a street with no cars.' }, right: { label: 'Carnaby Street' } }
          ]
        }
      }
    },
    {
      id: 'e3q2',
      prompt: 'True or false?',
      hint: 'Remember Olivia’s messages and the map.',
      explanation: 'Oxford Street is very busy. Camden has hundreds of stalls. Carnaby Street is for pedestrians. Westfield has a cinema.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Oxford Street is usually quiet.', value: false },
            { text: 'Camden Market has a lot of stalls.', value: true },
            { text: 'Cars drive along Carnaby Street all day.', value: false },
            { text: 'You can watch a film at Westfield.', value: true }
          ]
        }
      }
    },
    {
      id: 'e3q3',
      prompt: 'Complete Malika’s questions at the stall.',
      hint: 'Price — “How much…?” Clothes — “try it on”.',
      explanation: 'How much is this jacket? Can I try it on?',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ blank: 'How much' }, { text: 'is this jacket? Can I' }, { blank: 'try it on' }, { text: '?' }],
          bank: ['How much', 'try it on', 'How many', 'send it back']
        }
      }
    },
    {
      id: 'e3q4',
      prompt: 'Put the dialogue in order.',
      hint: 'Start with the question about the price.',
      explanation: 'Price → answer → try it on → offer → deal.',
      widget: {
        type: 'step_order',
        props: {
          steps: ['How much is this jacket?', 'Thirty pounds.', 'Can I try it on?', 'Would you take twenty-five?', 'OK. It’s a deal!']
        }
      }
    },
    {
      id: 'e3q5',
      prompt: 'Sort the words: how often?',
      hint: 'Often or not often?',
      explanation: 'Often: every day, weekly, twice a week. Not often: hardly ever, once a year, rarely.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'o', label: 'often' },
            { id: 'n', label: 'not often' }
          ],
          tiles: [
            { id: 'a', label: 'every day', bin: 'o' },
            { id: 'b', label: 'hardly ever', bin: 'n' },
            { id: 'c', label: 'weekly', bin: 'o' },
            { id: 'd', label: 'once a year', bin: 'n' },
            { id: 'e', label: 'twice a week', bin: 'o' },
            { id: 'f', label: 'rarely', bin: 'n' }
          ]
        }
      }
    },
    {
      id: 'e3q6',
      prompt: 'Write the word: “every month” = …',
      hint: 'every week = weekly',
      explanation: 'every month = monthly.',
      widget: { type: 'text_answer', props: { before: 'every month =', answer: 'monthly', width: 8 } }
    },
    {
      id: 'e3q7',
      prompt: 'Write the word that means “not new; used before by someone else”.',
      hint: 'Camden Market sells a lot of these clothes.',
      explanation: 'second-hand (also: secondhand).',
      widget: { type: 'text_answer', props: { before: 'clothes that are not new =', after: 'clothes', answer: ['second-hand', 'secondhand', 'second hand'], width: 11 } }
    },
    {
      id: 'e3q8',
      prompt: 'Tap all the words from the survey report about HOW OFTEN.',
      hint: 'Not places or things — frequency.',
      explanation: 'monthly, weekly, hardly ever tell us how often. Clothes and online do not.',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'monthly', match: true },
            { id: 'b', text: 'clothes', match: false },
            { id: 'c', text: 'weekly', match: true },
            { id: 'd', text: 'online', match: false },
            { id: 'e', text: 'hardly ever', match: true }
          ]
        }
      }
    },
    {
      id: 'e3q9',
      prompt: 'Tap the word that means “modern and in fashion”.',
      hint: 'The stall owner said it about the jacket.',
      explanation: '“Trendy” means modern and in fashion.',
      widget: { type: 'word_tap', props: { sentence: 'It looks *trendy* on you!', label: 'modern, in fashion' } }
    },
    {
      id: 'e3q10',
      prompt: 'Which one is NOT a place to shop in London from this lesson?',
      hint: 'Three of them were on the map.',
      explanation: 'Chorsu is a famous bazaar — but in Tashkent, not in London!',
      widget: {
        type: 'odd_one_out',
        props: {
          tiles: [{ text: 'Oxford Street' }, { text: 'Camden Market' }, { text: 'Chorsu Bazaar', odd: true }, { text: 'Carnaby Street' }]
        }
      }
    }
  ]
};
