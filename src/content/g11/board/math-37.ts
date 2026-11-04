import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik, 15–17 — "Masalalar yechish" / "Bobni takrorlash" mashqlari asosida. */
export const MATH_37: BoardLesson = {
  n: 37,
  label: "15–17",
  part: 'algebra',
  title: "Masalalar yechish: hosila va urinma",
  section: "15–17",
  revision: true,
  steps: [],
  summary: [],
  questions: [
  {
    "id": "r1q1",
    "prompt": "f(x) = 4x² − 3x + 2, x₀ = 1, x = 1,01. Funksiya orttirmasi Δy ni toping.",
    "hint": "Δy = f(1,01) − f(1).",
    "explanation": "f(1,01) = 3,0504, f(1) = 3. Δy = 0,0504.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 0.0504,
        "tolerance": 0.0001
      }
    }
  },
  {
    "id": "r1q2",
    "prompt": "x → 0 da f(x) = x³ − 2x² + 3x + 4 qaysi songa intiladi?",
    "hint": "x = 0 ni qoʻying.",
    "explanation": "Faqat ozod had qoladi: 4.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 4
      }
    }
  },
  {
    "id": "r1q3",
    "prompt": "y = 16x² − 3x funksiyaning hosilasini toping.",
    "hint": "(x²)′ = 2x.",
    "explanation": "y′ = 32x − 3.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "32*x-3",
        "prefix": "y′ =",
        "keys": [
          "x",
          "+",
          "−",
          "·"
        ]
      }
    }
  },
  {
    "id": "r1q4",
    "prompt": "f(x) = 4x³ + 3x² + 2x + 1. f′(1) ni toping.",
    "hint": "f′(x) = 12x² + 6x + 2.",
    "explanation": "12 + 6 + 2 = 20.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 20
      }
    }
  },
  {
    "id": "r1q5",
    "prompt": "Moddiy nuqta s(t) = (4/3)t³ − t + 5 qonuniyat bilan harakatlanmoqda. t = 2 s dagi tezlikni toping (m/s).",
    "hint": "v(t) = s′(t) = 4t² − 1.",
    "explanation": "v(2) = 16 − 1 = 15 m/s.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 15,
        "unit": "m/s"
      }
    }
  },
  {
    "id": "r1q6",
    "prompt": "y = (2x + 3)³ funksiyaning hosilasini toping.",
    "hint": "Murakkab funksiya: tashqi daraja, ichki 2x + 3.",
    "explanation": "y′ = 3(2x + 3)² · 2 = 6(2x + 3)².",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "6*(2*x+3)^2",
        "prefix": "y′ =",
        "keys": [
          "x",
          "(",
          ")",
          "^",
          "+",
          "·"
        ]
      }
    }
  },
  {
    "id": "r1q7",
    "prompt": "f(x) = x¹⁰ − 80x. f′(1) ni toping.",
    "hint": "f′(x) = 10x⁹ − 80.",
    "explanation": "10 − 80 = −70.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": -70
      }
    }
  },
  {
    "id": "r1q8",
    "prompt": "s(t) = t³/3 − 1,5t² + 2t. Tezlik nolga teng boʻladigan vaqtlardan kattasini toping (s).",
    "hint": "v(t) = t² − 3t + 2 = 0.",
    "explanation": "t = 1 va t = 2. Kattasi 2 s: nuqta toʻxtab, yoʻnalishini oʻzgartiradi.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 2,
        "unit": "s"
      }
    }
  },
  {
    "id": "r1q9",
    "prompt": "Har bir funksiyaga uning hosilasini moslang.",
    "hint": "Hosilalar jadvalini eslang.",
    "explanation": "(x⁵)′ = 5x⁴, (sin x)′ = cos x, (√x)′ = 1/(2√x), (ln x)′ = 1/x.",
    "widget": {
      "type": "match_pairs",
      "props": {
        "pairs": [
          {
            "left": "x⁵",
            "right": "5x⁴"
          },
          {
            "left": "sin x",
            "right": "cos x"
          },
          {
            "left": "√x",
            "right": "1/(2√x)"
          },
          {
            "left": "ln x",
            "right": "1/x"
          }
        ]
      }
    }
  },
  {
    "id": "r1q10",
    "prompt": "y = 1/x grafigiga x₀ = −1/2 nuqtada oʻtkazilgan urinma tenglamasini yozing.",
    "hint": "f(−1/2) = −2, f′(x) = −1/x², f′(−1/2) = −4.",
    "explanation": "y = −2 − 4(x + 1/2) = −4x − 4.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "-4*x-4",
        "prefix": "y =",
        "keys": [
          "x",
          "+",
          "−",
          "·"
        ]
      }
    }
  },
  {
    "id": "r1q11",
    "prompt": "Qaysi hosila notoʻgʻri topilgan? Ortiqchasini bosing.",
    "hint": "Har birini tekshiring.",
    "explanation": "(cos x)′ = −sin x, cos x emas.",
    "widget": {
      "type": "odd_one_out",
      "props": {
        "tiles": [
          {
            "text": "(x³)′ = 3x²"
          },
          {
            "text": "(eˣ)′ = eˣ"
          },
          {
            "text": "(5x)′ = 5"
          },
          {
            "text": "(cos x)′ = sin x",
            "odd": true
          }
        ]
      }
    }
  },
  {
    "id": "r1q12",
    "prompt": "Har bir gap toʻgʻrimi yoki notoʻgʻrimi?",
    "hint": "Hosilaning maʼnolarini eslang.",
    "explanation": "Hosila — urinma qiyaligi va oniy tezlik; oʻzgarmasning hosilasi 0; (uv)′ ≠ u′v′.",
    "widget": {
      "type": "statement_check",
      "props": {
        "statements": [
          {
            "text": "f′(x₀) — x₀ nuqtadagi urinmaning burchak koeffitsiyenti.",
            "value": true
          },
          {
            "text": "Oʻzgarmas sonning hosilasi 1 ga teng.",
            "value": false
          },
          {
            "text": "Yoʻlning vaqt boʻyicha hosilasi — tezlik.",
            "value": true
          },
          {
            "text": "(u·v)′ = u′·v′.",
            "value": false
          }
        ]
      }
    }
  }
]
};
