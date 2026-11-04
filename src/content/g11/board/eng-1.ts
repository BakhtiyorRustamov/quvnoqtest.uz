import type { BoardLesson } from './types';
import { ENG_CAST, ENG_G1 } from './eng-cast';

/** Student's Book: Unit 1 “Going shopping” (pp. 10–13) — shopping words, determiners, any-words. */
export const ENG_1: BoardLesson = {
  n: 1,
  label: '1',
  lang: 'en',
  group: ENG_G1,
  easyLang: 'uz',
  title: 'Going shopping',
  section: 'Unit 1',
  cast: {
    ...ENG_CAST,
    seller: { name: 'Shop assistant', emoji: '', color: '#B7791F', azure: 'en-GB-SoniaNeural', accent: 'en-GB', gender: 'f' }
  },
  steps: [
    {
      kind: 'scene',
      say: 'Malika bought some trainers last week. They are too small. Listen to her in the shop.',
      easy: 'Malika oʻtgan hafta krossovka sotib olgan, lekin ular kichik chiqqan. U doʻkonga qaytib keldi. Sotuvchi chekni (receipt) soʻrayapti. Malika pulini qaytarib olishi (refund) yoki boshqa oʻlchamga almashtirishi (exchange) mumkin.',
      draw: [],
      scene: {
        style: 'stage',
        place: '👟 A sports shop in Tashkent',
        lines: [
          { who: 'malika', text: 'Hi! I bought these trainers here last week, but they are too small.', uz: 'Salom! Bu krossovkani oʻtgan hafta shu yerdan olgandim, lekin kichik ekan.' },
          { who: 'seller', text: 'No problem. Have you got the receipt?', uz: 'Muammo yoʻq. Chekingiz bormi?' },
          { who: 'malika', text: 'Yes, here it is. Can I get a refund?', uz: 'Ha, mana. Pulimni qaytarib olsam boʻladimi?' },
          { who: 'seller', text: 'Of course. Or you can exchange them for a bigger size.', uz: 'Albatta. Yoki kattaroq oʻlchamga almashtirishingiz mumkin.' },
          { who: 'malika', text: 'I love the colour, so I’ll exchange them, please.', uz: 'Rangi menga juda yoqadi, shuning uchun almashtiraman.' }
        ],
        words: [
          { en: 'receipt', uz: 'chek' },
          { en: 'refund', uz: 'pulni qaytarish' },
          { en: 'exchange', uz: 'almashtirish' }
        ]
      },
      next: 'What happened next?'
    },
    {
      kind: 'scene',
      say: '',
      easy: 'Timur internetdan quloqchin buyurtma qildi. Chegirma (discount) — narxning arzonlashishi. Aksiya (promotion) — doʻkonning maxsus taklifi. Yetkazib berish haqi (delivery charge) — yuborish uchun toʻlov. Send it back — mahsulotni qaytarib yuborish.',
      draw: [],
      scene: {
        style: 'chat',
        place: '💻 Timur and Malika after school',
        lines: [
          { who: 'timur', text: 'Look! I ordered these headphones online. There was a 20% discount.', uz: 'Qara! Bu quloqchinni internetdan buyurtma qildim. 20% chegirma bor edi.' },
          { who: 'malika', text: 'Nice! Did they charge you for delivery?', uz: 'Zoʻr! Yetkazib berish uchun pul olishdimi?' },
          { who: 'timur', text: 'No. There’s a promotion: free delivery if you spend more than 200,000 sum.', uz: 'Yoʻq. Aksiya bor: 200 000 soʻmdan koʻp xarid qilsang, yetkazish bepul.' },
          { who: 'malika', text: 'And if they don’t work?', uz: 'Agar ishlamasa-chi?' },
          { who: 'timur', text: 'Then I can send them back. The service is really good.', uz: 'Unda qaytarib yuboraman. Xizmat koʻrsatish juda yaxshi.' }
        ],
        words: [
          { en: 'discount', uz: 'chegirma' },
          { en: 'charge', uz: 'pul olmoq (haq)' },
          { en: 'promotion', uz: 'aksiya' },
          { en: 'send them back', uz: 'qaytarib yubormoq' },
          { en: 'service', uz: 'xizmat koʻrsatish' }
        ]
      },
      next: 'Next'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Let’s put the new words together. When you buy something, you get a receipt. If something is wrong, you can get a refund, exchange it, or send it back. A discount makes the price lower.',
      easy: 'Yangi soʻzlarni bir joyga yigʻamiz. Receipt — chek. Refund — pulni qaytarish. Exchange — almashtirish. Discount — chegirma. Purchase — xarid. On sale — arzonlashgan narxda.',
      draw: [
        { t: 'title', text: 'Shopping words' },
        { t: 'box', id: 'buy', x: 34, y: 14, w: 32, h: 11, text: 'you buy 🛍️', color: 'blue' },
        { t: 'box', id: 'r', x: 4, y: 36, w: 28, h: 11, text: 'refund 💵', color: 'green' },
        { t: 'box', id: 'e', x: 36, y: 36, w: 28, h: 11, text: 'exchange 🔁', color: 'orange' },
        { t: 'box', id: 's', x: 68, y: 36, w: 28, h: 11, text: 'send back 📦', color: 'purple' },
        { t: 'arrow', from: 'buy', to: 'r' },
        { t: 'arrow', from: 'buy', to: 'e' },
        { t: 'arrow', from: 'buy', to: 's' },
        { t: 'text', x: 4, y: 60, text: 'receipt · discount · on sale · purchase', size: 's', color: 'blue' }
      ],
      next: 'Let’s go on'
    },
    {
      kind: 'scene',
      say: 'Saturday plans. Look at the small words before the nouns: some, any, a lot of, no.',
      easy: 'Diqqat qiling: some — biroz (tasdiq gapda), any — soʻroq va inkorda, no — hech qanday, a lot of / plenty of — koʻp, several — bir nechta, much — koʻp (sanalmaydigan), many — koʻp (sanaladigan).',
      draw: [],
      scene: {
        style: 'phone',
        place: '🛍️ Saturday squad',
        lines: [
          { who: 'malika', text: 'Shopping on Saturday? I need some new jeans.', uz: 'Shanba kuni xaridga boramizmi? Menga yangi jinsi shim kerak.' },
          { who: 'timur', text: 'I can’t buy anything. I don’t have any money left!', uz: 'Men hech narsa ololmayman. Pulim qolmadi!' },
          { who: 'malika', text: 'Come anyway! There are plenty of shops with sales now.', uz: 'Baribir kel! Hozir chegirmali doʻkonlar juda koʻp.' },
          { who: 'timur', text: 'OK. How much time do we need? I have several hours.', uz: 'Xoʻp. Qancha vaqt kerak? Bir necha soatim bor.' },
          { who: 'malika', text: 'No problem — three hours is a lot of time!', uz: 'Muammo yoʻq — uch soat koʻp vaqt!' }
        ],
        words: [
          { en: 'some', uz: 'biroz' },
          { en: 'any', uz: 'hech / biror' },
          { en: 'plenty of', uz: 'juda koʻp' },
          { en: 'several', uz: 'bir nechta' },
          { en: 'a lot of', uz: 'koʻp' }
        ]
      },
      next: 'Show me the rule'
    },
    {
      kind: 'card',
      clear: true,
      say: 'Here is the rule. Countable nouns can be counted: trainers, shops. Uncountable nouns cannot: money, time. Use many with countable nouns and much with uncountable nouns. Some, any, a lot of, plenty of and no work with both. Use any in questions and negatives.',
      easy: 'Sanaladigan otlar (shops, trainers) bilan — many, several. Sanalmaydigan otlar (money, time) bilan — much. Ikkalasi bilan ham — some, any, a lot of, plenty of, no. Any — soʻroq va inkor gaplarda.',
      draw: [
        { t: 'title', text: 'Determiners' },
        {
          t: 'table',
          x: 4,
          y: 14,
          rows: [
            ['', 'countable', 'uncountable'],
            ['+', 'some / several shops', 'some money'],
            ['−', 'not any / no shops', 'not any / no money'],
            ['?', 'how many shops?', 'how much money?'],
            ['lots', 'a lot of / plenty of', 'a lot of / plenty of']
          ]
        },
        { t: 'text', x: 4, y: 58, text: 'any → questions and negatives', size: 's', color: 'orange' },
        { t: 'text', x: 4, y: 65, text: 'anyone · anything · anywhere', size: 's', color: 'purple' }
      ],
      next: 'Practice time'
    },
    {
      kind: 'scene',
      say: 'Malika is writing for a teen magazine competition: “The last cool thing I bought”. Mr Collins helps her.',
      easy: 'Qisqa matn yozishda: hamma savollarga javob bering, qoʻshimcha maʼlumot qoʻshing, turli zamonlardan foydalaning. Masalan: nima oldingiz, qayerdan, nega, doʻstlaringiz nima deydi.',
      draw: [],
      scene: {
        style: 'interview',
        place: 'English club · writing tips',
        lines: [
          { who: 'narrator', text: 'So, Malika, what is the last cool thing you bought?', uz: 'Xoʻsh, Malika, oxirgi marta qanday zoʻr narsa sotib olding?' },
          { who: 'malika', text: 'Some orange trainers. I got them at a local sports shop.', uz: 'Toʻq sariq krossovka. Mahalladagi sport doʻkonidan oldim.' },
          { who: 'narrator', text: 'Good. Why did you choose them? Add some extra information.', uz: 'Yaxshi. Nega aynan ularni tanlading? Qoʻshimcha maʼlumot qoʻsh.' },
          { who: 'malika', text: 'All my friends had white ones, but I wanted to be different. And I got a ten percent discount!', uz: 'Doʻstlarimning hammasida oq rangli bor edi, men boshqacha boʻlishni xohladim. Yana 10% chegirma oldim!' },
          { who: 'narrator', text: 'Great. Answer every question, add details, and use different tenses.', uz: 'Zoʻr. Hamma savolga javob ber, tafsilot qoʻsh va turli zamonlardan foydalan.' }
        ]
      },
      next: 'To the exercises'
    }
  ],
  summary: [
    'receipt — chek, refund — pulni qaytarish, exchange — almashtirish, discount — chegirma, send back — qaytarib yubormoq.',
    'many + countable (many shops), much + uncountable (much money).',
    'some, any, a lot of, plenty of, no — with both; any in questions and negatives.',
    'anyone, anything, anywhere: “I can’t buy anything.” “Is there anyone here?”',
    'A short text: answer all the questions, add extra information, use different tenses.'
  ],
  questions: [
    {
      id: 'e1q1',
      prompt: 'Match the words to their meanings.',
      hint: 'Remember Malika in the sports shop.',
      explanation: 'receipt — the paper that shows what you paid; refund — money back; exchange — change for another item; discount — a lower price.',
      widget: {
        type: 'match_columns',
        props: {
          pairs: [
            { left: { label: 'receipt' }, right: { label: 'the paper that shows what you paid' } },
            { left: { label: 'refund' }, right: { label: 'you get your money back' } },
            { left: { label: 'exchange' }, right: { label: 'change it for another item' } },
            { left: { label: 'discount' }, right: { label: 'a lower price' } }
          ]
        }
      }
    },
    {
      id: 'e1q2',
      prompt: 'Complete the dialogue in the shop.',
      hint: 'What do you show to get your money back?',
      explanation: 'You show the receipt to get a refund.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: '— Can I get a' }, { blank: 'refund' }, { text: '? — Yes. Have you got the' }, { blank: 'receipt' }, { text: '?' }],
          bank: ['refund', 'receipt', 'discount', 'promotion']
        }
      }
    },
    {
      id: 'e1q3',
      prompt: 'Countable or uncountable?',
      hint: 'Can you say “two …”?',
      explanation: 'Countable: trainers, shops, games. Uncountable: money, time, information.',
      widget: {
        type: 'word_sort',
        props: {
          bins: [
            { id: 'c', label: 'countable' },
            { id: 'u', label: 'uncountable' }
          ],
          tiles: [
            { id: 'a', label: 'trainers', bin: 'c' },
            { id: 'b', label: 'money', bin: 'u' },
            { id: 'c', label: 'shops', bin: 'c' },
            { id: 'd', label: 'time', bin: 'u' },
            { id: 'e', label: 'games', bin: 'c' },
            { id: 'f', label: 'information', bin: 'u' }
          ]
        }
      }
    },
    {
      id: 'e1q4',
      prompt: 'Write the missing word: much or many?',
      hint: '“Money” is uncountable.',
      explanation: 'How much money did you spend? — “money” is uncountable, so we use “much”.',
      widget: { type: 'text_answer', props: { before: 'How', after: 'money did you spend?', answer: 'much', width: 6 } }
    },
    {
      id: 'e1q5',
      prompt: 'Write the missing word: much or many?',
      hint: '“Pairs” can be counted.',
      explanation: 'How many pairs of trainers have you got? — countable noun, so “many”.',
      widget: { type: 'text_answer', props: { before: 'How', after: 'pairs of trainers have you got?', answer: 'many', width: 6 } }
    },
    {
      id: 'e1q6',
      prompt: 'Tap all the correct sentences.',
      hint: 'Any — in questions and negatives. Some — in positive sentences.',
      explanation: 'Correct: “I don’t have any money”, “There are plenty of shops”, “Have you got any sunglasses?”. Wrong: “I bought any jeans” (some), “How much shops” (many).',
      widget: {
        type: 'tap_match',
        props: {
          tiles: [
            { id: 'a', text: 'I don’t have any money.', match: true },
            { id: 'b', text: 'I bought any jeans yesterday.', match: false },
            { id: 'c', text: 'There are plenty of shops here.', match: true },
            { id: 'd', text: 'How much shops are there?', match: false },
            { id: 'e', text: 'Have you got any sunglasses?', match: true }
          ]
        }
      }
    },
    {
      id: 'e1q7',
      prompt: 'Complete with anyone, anything or anywhere.',
      hint: 'A person — anyone; a thing — anything; a place — anywhere.',
      explanation: 'Has anyone seen my phone? I can’t find it anywhere. I don’t want anything else.',
      widget: {
        type: 'fill_blanks',
        props: {
          segments: [{ text: 'Has' }, { blank: 'anyone' }, { text: 'seen my phone? I can’t find it' }, { blank: 'anywhere' }, { text: '!' }],
          bank: ['anyone', 'anywhere', 'anything']
        }
      }
    },
    {
      id: 'e1q8',
      prompt: 'Put the words in order.',
      hint: 'Start with the subject “I”.',
      explanation: 'I got a ten percent discount on these trainers.',
      widget: { type: 'sentence_order', props: { words: ['I', 'got', 'a', 'ten', 'percent', 'discount', 'on', 'these', 'trainers.'] } }
    },
    {
      id: 'e1q9',
      prompt: 'True or false? (Timur’s online shopping)',
      hint: 'Remember the chat after school.',
      explanation: 'Timur got a 20% discount and free delivery because of a promotion. He can send the headphones back.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Timur bought his headphones online.', value: true },
            { text: 'He paid a delivery charge.', value: false },
            { text: 'There was a promotion.', value: true },
            { text: 'He can’t send them back.', value: false }
          ]
        }
      }
    },
    {
      id: 'e1q10',
      prompt: 'Which word does NOT go with shopping problems?',
      hint: 'Three words are about returning things.',
      explanation: '“Hairdresser” is a person, not a way to solve a shopping problem. Refund, exchange and send back are.',
      widget: {
        type: 'odd_one_out',
        props: {
          tiles: [{ text: 'refund' }, { text: 'exchange' }, { text: 'send back' }, { text: 'hairdresser', odd: true }]
        }
      }
    }
  ]
};
