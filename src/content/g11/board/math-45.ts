import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik 2-qism, 52–56 "Masalalar yechish" — differensial tenglamalar, integrallar, yuzalar. */
export const MATH_45: BoardLesson = {
  n: 45,
  label: '52–56',
  part: 'algebra',
  qism: 2,
  title: 'Masalalar yechish: integral va differensial tenglamalar',
  section: '52–56',
  revision: true,
  steps: [],
  summary: [],
  questions: [
  {
    "id": "p45q1",
    "prompt": "Differensial tenglamani yeching: y′ = 3x² − 1.",
    "hint": "Boshlangʻich funksiyani toping.",
    "explanation": "y = x³ − x + C.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "x^3-x",
        "prefix": "y =",
        "plusC": true,
        "keys": [
          "x",
          "³",
          "−",
          "+",
          "C"
        ]
      }
    }
  },
  {
    "id": "p45q2",
    "prompt": "s′ = 5 − 3t differensial tenglamaning yechimini yozing.",
    "hint": "t boʻyicha boshlangʻich funksiya.",
    "explanation": "s = 5t − 1,5t² + C.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "5*t-1.5*t^2",
        "vars": [
          "t"
        ],
        "prefix": "s =",
        "plusC": true,
        "keys": [
          "t",
          "²",
          "−",
          "+",
          "C"
        ]
      }
    }
  },
  {
    "id": "p45q3",
    "prompt": "y′ = sin x + cos x, y(π/2) = 5. y = −cos x + sin x + C da C ni toping.",
    "hint": "x = π/2 ni qoʻying.",
    "explanation": "−0 + 1 + C = 5 → C = 4.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 4
      }
    }
  },
  {
    "id": "p45q4",
    "prompt": "y′ = 1 + 2x + 3x² − 4x³, y(2) = 9. y = x + x² + x³ − x⁴ + C da C ni toping.",
    "hint": "2 + 4 + 8 − 16 + C = 9.",
    "explanation": "−2 + C = 9 → C = 11.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 11
      }
    }
  },
  {
    "id": "p45q5",
    "prompt": "Radioaktiv moddaning yarim yemirilish davri 1000 yil. 2000 yildan keyin dastlabki miqdorning qancha qismi qoladi? (oʻnli kasrda)",
    "hint": "Har 1000 yilda yarmi qoladi.",
    "explanation": "½ · ½ = 0,25.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 0.25,
        "tolerance": 0.001
      }
    }
  },
  {
    "id": "p45q6",
    "prompt": "Xona harorati 20°C. Qaynoq suv 20 minutda 100°C dan 60°C gacha sovidi. Suv necha minutda 30°C ga yetadi? (sovish tezligi harorat farqiga proporsional)",
    "hint": "Farq 80° → 40°: 20 minutda yarmiga kamayadi.",
    "explanation": "80 → 40 → 20 → 10: uch marta yarmiga, 3 · 20 = 60 minut.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 60,
        "unit": "min"
      }
    }
  },
  {
    "id": "p45q7",
    "prompt": "∫ sin²x · cos²x dx ni toping.",
    "hint": "sin x cos x = ½ sin 2x, sin²2x = (1 − cos 4x)/2.",
    "explanation": "x/8 − sin 4x/32 + C.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "x/8-sin(4*x)/32",
        "prefix": "=",
        "plusC": true,
        "keys": [
          "x",
          "sin",
          "(",
          ")",
          "/",
          "−",
          "C"
        ]
      }
    }
  },
  {
    "id": "p45q8",
    "prompt": "∫ eˣ/(eˣ + 1) dx ni toping.",
    "hint": "t = eˣ + 1, dt = eˣ dx.",
    "explanation": "ln(eˣ + 1) + C.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "ln(e^x+1)",
        "prefix": "=",
        "plusC": true,
        "keys": [
          "ln",
          "e",
          "^",
          "x",
          "(",
          ")",
          "+",
          "C"
        ]
      }
    }
  },
  {
    "id": "p45q9",
    "prompt": "∫₀¹ x·eˣ dx ni hisoblang.",
    "hint": "Boʻlaklab: eˣ(x − 1).",
    "explanation": "e·0 − (−1) = 1.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 1
      }
    }
  },
  {
    "id": "p45q10",
    "prompt": "y = x² − 2x + 4 parabola, Ox, Oy oʻqlari va parabola uchidan oʻtuvchi vertikal chiziq bilan chegaralangan yuzani toping (0,01 aniqlikda).",
    "hint": "Uchi (1; 3). S = ∫₀¹ ((x − 1)² + 3) dx.",
    "explanation": "⅓ + 3 = 10/3 ≈ 3,33.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 3.333,
        "tolerance": 0.01
      }
    }
  },
  {
    "id": "p45q11",
    "prompt": "f(x) = −x² + x₀x parabola va Ox oʻqi bilan chegaralangan yuza 32/3. x₀ ni toping (x₀ > 0).",
    "hint": "S = x₀³/6.",
    "explanation": "x₀³/6 = 32/3 → x₀³ = 64 → x₀ = 4.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 4
      }
    }
  },
  {
    "id": "p45q12",
    "prompt": "Har bir differensial tenglamaga uning yechimini moslang.",
    "hint": "Boshlangʻich funksiya yoki eksponenta.",
    "explanation": "y′ = 2x → x² + C; y′ = cos x → sin x + C; y′ = ky → Ceᵏˣ; y′ = 1/x → ln|x| + C.",
    "widget": {
      "type": "match_pairs",
      "props": {
        "pairs": [
          {
            "left": "y′ = 2x",
            "right": "y = x² + C"
          },
          {
            "left": "y′ = cos x",
            "right": "y = sin x + C"
          },
          {
            "left": "y′ = ky",
            "right": "y = C·eᵏˣ"
          },
          {
            "left": "y′ = 1/x",
            "right": "y = ln|x| + C"
          }
        ]
      }
    }
  }
]
};
