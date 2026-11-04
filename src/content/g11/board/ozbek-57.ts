import type { BoardLesson } from './types';
import { OZG8 } from './ozbek-47';

/** Darslik: Adabiyot 11, I qism (2018), 184–189-betlar — Mashrab gʻazallari, murabbaʼ va muxammasi. */
export const OZ_57: BoardLesson = {
  n: 57,
  label: '57',
  group: OZG8,
  title: 'Mashrab: gʻazal, murabbaʼ, muxammas',
  section: 'Adabiyot, 1-qism: Mashrab gʻazallari; «Bulbuldayinkim faryod etarman…» murabbaʼsi; muxammas',
  steps: [
    {
      kind: 'explain',
      clear: true,
      say: "«Bu tani xokini…» gʻazali ritorik soʻroqlar zanjiridan tuzilgan: har bayt «na qilay?!» radifi bilan tugaydi. Tasavvufiy talqinda yor — ilohiy maʼrifat ramzi; gʻazal maʼrifatsiz umr mazmunsiz, asl maqsad — koʻngil pokligi degan fikrni ilgari suradi, gul asosiy maqsad, tikan esa ikkinchi darajali narsalar timsoli. Murabbaʼ — toʻrt misrali bandlardan iborat sheʼr; «Bulbuldayinkim faryod etarman» murabbaʼsida har band bir xil naqarot misra bilan yakunlanadi. Muxammas — besh misrali bandlardan tuziladi; u boshqa shoir gʻazaliga bogʻlanishi yoki mustaqil boʻlishi mumkin. Mashrab muxammasida «dastingdin» radifi falakdan shikoyat ohangini kuchaytiradi.",
      easy: "Murabbaʼda band toʻrt misra, muxammasda besh misra boʻladi. Mashrab gʻazalida ritorik soʻroq koʻp.",
      draw: [
        { t: 'title', text: 'Band tuzilishi' },
        { t: 'table', x: 4, y: 18, rows: [['shakl', 'bandda misra', 'xususiyati'], ['gʻazal', 'bayt (2)', 'matlaʼ, maqtaʼ'], ['murabbaʼ', '4 misra', 'naqarot misra'], ['muxammas', '5 misra', 'radif, taxmis']] },
        { t: 'text', x: 4, y: 46, text: 'Bu tani xokini-yu ruhi ravonni na qilay?!', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 52, text: 'Boʻlmasa qoshimda jonon, bu jahonni na qilay?!', size: 's', color: 'purple' },
        { t: 'text', x: 4, y: 60, text: 'Naqarot: «Yorgʻa yetar kun bormu, yoronlar?»', size: 's', color: 'blue' }
      ],
      next: 'Qani, sinab koʻraylik'
    }
  ],
  summary: [
    '«Bu tani xokini…» gʻazali ritorik soʻroqlarga qurilgan; tasavvufiy maʼnoda koʻngil pokligi va ilohiy maʼrifat ulugʻlanadi.',
    'Murabbaʼ — toʻrt misrali bandlardan iborat; Mashrab murabbaʼsida har band bir xil naqarot bilan tugaydi.',
    'Muxammas — besh misrali bandlardan iborat; boshqa shoir gʻazaliga bogʻlanishi yoki mustaqil boʻlishi mumkin.'
  ],
  questions: [
    {
      id: 'oz57q1',
      prompt: 'Murabbaʼ bandi necha misradan iborat?',
      hint: 'Arabcha «toʻrtlik».',
      explanation: 'Toʻrt misradan.',
      widget: { type: 'number_answer', props: { answer: 4, unit: 'misra' } }
    },
    {
      id: 'oz57q2',
      prompt: 'Muxammas bandi necha misradan iborat?',
      hint: '«Xams» — besh.',
      explanation: 'Besh misradan.',
      widget: { type: 'number_answer', props: { answer: 5, unit: 'misra' } }
    },
    {
      id: 'oz57q3',
      prompt: '«Bu tani xokini…» gʻazalida qaysi badiiy vosita yetakchi?',
      hint: '«…na qilay?!»',
      explanation: 'Ritorik soʻroq.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['ritorik soʻroq', 'tuyuq qofiya', 'masnuʼ shakl', 'barmoq vazni'], answerIndex: 0 } }
    },
    {
      id: 'oz57q4',
      prompt: 'Timsolni gʻazaldagi maʼnosi bilan juftlang.',
      hint: 'Gul va tikan.',
      explanation: 'Gul — asosiy maqsad; tikan — ikkinchi darajali narsalar; yor — ilohiy maʼrifat ramzi.',
      widget: {
        type: 'match_pairs',
        props: {
          pairs: [
            { left: 'gul', right: 'asosiy maqsad' },
            { left: 'tikan', right: 'ikkinchi darajali narsalar' },
            { left: 'yor, jonon', right: 'ilohiy maʼrifat ramzi' }
          ]
        }
      }
    },
    {
      id: 'oz57q5',
      prompt: 'Mashrab murabbaʼsining har bandi qanday tugaydi?',
      hint: 'Takrorlanadi.',
      explanation: 'Bir xil naqarot misra bilan.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['bir xil naqarot misra bilan', 'har safar yangi taxallus bilan', 'qofiyasiz misra bilan', 'savol-javob bilan'], answerIndex: 0 } }
    },
    {
      id: 'oz57q6',
      prompt: 'Muxammasdagi «dastingdin» radifi qanday ohangni kuchaytiradi?',
      hint: 'Charxi bebunyoddan.',
      explanation: 'Falakdan, zamondan shikoyat ohangini.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['falakdan shikoyat', 'bahor shodligi', 'gʻalaba madhi', 'hazil-mutoyiba'], answerIndex: 0 } }
    },
    {
      id: 'oz57q7',
      prompt: 'Sheʼriy shakllarni band hajmiga koʻra ajrating.',
      hint: '4 yoki 5.',
      explanation: 'Murabbaʼ va ruboiy — toʻrt misra; muxammas — besh misra.',
      widget: {
        type: 'sort_bins',
        props: {
          bins: [{ id: 't', label: '4 misrali' }, { id: 'b', label: '5 misrali band' }],
          items: [
            { emoji: '🟦', label: 'murabbaʼ', bin: 't' },
            { emoji: '🔷', label: 'ruboiy', bin: 't' },
            { emoji: '🟧', label: 'muxammas', bin: 'b' }
          ]
        }
      }
    },
    {
      id: 'oz57q8',
      prompt: 'Har bir gap toʻgʻrimi yoki notoʻgʻrimi?',
      hint: 'Jannat va doʻzax bayti.',
      explanation: 'Bu bayt inkor emas: unda ilohiy vasl va koʻngil pokligi nazarda tutilgan; muxammas mustaqil ham boʻlishi mumkin.',
      widget: {
        type: 'statement_check',
        props: {
          statements: [
            { text: 'Jannat va doʻzax haqidagi baytda koʻngil pokligi nazarda tutilgan.', value: true },
            { text: 'Muxammas faqat boshqa shoir gʻazaliga bogʻlab yoziladi.', value: false },
            { text: 'Gʻazalda har bayt bir xil radif bilan tugaydi.', value: true }
          ]
        }
      }
    },
    {
      id: 'oz57q9',
      prompt: 'Murabbaʼning har bandi qaysi naqarot bilan tugaydi?',
      hint: 'Yoronlarga murojaat.',
      explanation: '«Yorgʻa yetar kun bormu, yoronlar?» — umid va intizorlik ohangi.',
      widget: { type: 'mcq', props: { prompt: '', choices: ['Yorgʻa yetar kun bormu, yoronlar?', 'Bu jahonni na qilay?!', 'Dod etarman, dod dastingdin', 'Ishq daftarini bunyod etarman'], answerIndex: 0 } }
    }
  ]
};
