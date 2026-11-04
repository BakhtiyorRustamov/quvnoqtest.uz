import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik, 33–36 — "Masalalar yechish" / "Bobni takrorlash" mashqlari asosida. */
export const MATH_38: BoardLesson = {
  n: 38,
  label: "33–36",
  part: 'algebra',
  title: "Masalalar yechish: hosilaning tatbiqlari",
  section: "33–36",
  revision: true,
  steps: [],
  summary: [],
  questions: [
  {
    "id": "r2q1",
    "prompt": "f(x) = 12x² + 5x + 1 grafigiga x₀ = −1 nuqtada oʻtkazilgan urinma tenglamasini yozing.",
    "hint": "f(−1) = 8, f′(x) = 24x + 5, f′(−1) = −19.",
    "explanation": "y = 8 − 19(x + 1) = −19x − 11.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "-19*x-11",
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
    "id": "r2q2",
    "prompt": "f(x) = x³ − 6x² + 9 funksiyaning statsionar nuqtalaridan kattasini toping.",
    "hint": "f′(x) = 3x² − 12x = 3x(x − 4).",
    "explanation": "x = 0 va x = 4. Kattasi 4.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 4
      }
    }
  },
  {
    "id": "r2q3",
    "prompt": "f(x) = x² − x⁴/4 funksiyaning lokal maksimumidagi qiymatini toping.",
    "hint": "f′(x) = 2x − x³ = x(2 − x²).",
    "explanation": "x = ±√2 da maksimum: f = 2 − 1 = 1.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 1
      }
    }
  },
  {
    "id": "r2q4",
    "prompt": "f(x) = x⁴ − 3x² + 2 funksiyaning [−4; 1] kesmadagi eng katta qiymatini toping.",
    "hint": "Uchlarni ham tekshiring.",
    "explanation": "f(−4) = 256 − 48 + 2 = 210 — eng katta.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 210
      }
    }
  },
  {
    "id": "r2q5",
    "prompt": "1000 m panjara bilan eng koʻpi bilan necha m² toʻgʻri toʻrtburchak maydonni oʻrash mumkin?",
    "hint": "Kvadrat: tomoni 250 m.",
    "explanation": "250² = 62 500 m².",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 62500,
        "unit": "m²"
      }
    }
  },
  {
    "id": "r2q6",
    "prompt": "Maydonning yuzi 3600 m². Uni oʻrash uchun eng kam necha m panjara kerak?",
    "hint": "Kvadrat: tomoni 60 m.",
    "explanation": "4 · 60 = 240 m.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 240,
        "unit": "m"
      }
    }
  },
  {
    "id": "r2q7",
    "prompt": "Tomoni 16 sm kvadrat kartondan usti ochiq quti yasaladi. Hajm eng katta boʻlishi uchun burchaklardan kesiladigan kvadrat tomoni necha sm? (0,01 aniqlikda)",
    "hint": "V = x(16 − 2x)², V′ = (16 − 2x)(16 − 6x).",
    "explanation": "x = 16/6 = 8/3 ≈ 2,67 sm.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 2.667,
        "tolerance": 0.01,
        "unit": "sm"
      }
    }
  },
  {
    "id": "r2q8",
    "prompt": "s(t) = −t⁴/4 + 10t³. Tezlanish eng katta boʻladigan vaqtni toping (s).",
    "hint": "a(t) = −3t² + 60t, a′ = −6t + 60.",
    "explanation": "t₀ = 10 s.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 10,
        "unit": "s"
      }
    }
  },
  {
    "id": "r2q9",
    "prompt": "Akrom x ta shim tiksa, p(x) = −2x² + 240x ming soʻm daromad qiladi. Daromad eng katta boʻlishi uchun nechta shim tikishi kerak?",
    "hint": "p′(x) = −4x + 240.",
    "explanation": "x = 60 ta.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 60
      }
    }
  },
  {
    "id": "r2q10",
    "prompt": "y = e³ˣ funksiyaning hosilasini toping.",
    "hint": "(eᵏˣ)′ = k·eᵏˣ.",
    "explanation": "y′ = 3e³ˣ.",
    "widget": {
      "type": "expression_answer",
      "props": {
        "answer": "3*e^(3*x)",
        "prefix": "y′ =",
        "keys": [
          "e",
          "^",
          "(",
          ")",
          "x",
          "·"
        ]
      }
    }
  },
  {
    "id": "r2q11",
    "prompt": "Qaysi funksiyalar butun son oʻqida oʻsadi? Hammasini belgilab, Tekshirish ni bosing.",
    "hint": "f′(x) > 0 boʻlishi kerak.",
    "explanation": "3 + 7x, x³ + 17x va x/4 + 18 — oʻsadi. −x² − 4x + 6 va x² + 5x − 14 — parabolalar, bir qismida kamayadi.",
    "widget": {
      "type": "pick_many",
      "props": {
        "options": [
          {
            "label": "3 + 7x",
            "correct": true
          },
          {
            "label": "x³ + 17x",
            "correct": true
          },
          {
            "label": "x/4 + 18",
            "correct": true
          },
          {
            "label": "−x² − 4x + 6"
          },
          {
            "label": "x² + 5x − 14"
          }
        ]
      }
    }
  },
  {
    "id": "r2q12",
    "prompt": "Funksiyani tekshirish bosqichlarini tartiblang.",
    "hint": "Sohadan boshlanadi.",
    "explanation": "Soha → hosila → statsionar nuqtalar → ishoralar → ekstremumlar va grafik.",
    "widget": {
      "type": "order_line",
      "props": {
        "items": [
          {
            "label": "Aniqlanish sohasi"
          },
          {
            "label": "Hosilani topish"
          },
          {
            "label": "Statsionar nuqtalar"
          },
          {
            "label": "Hosila ishoralari"
          },
          {
            "label": "Ekstremumlar va grafik"
          }
        ]
      }
    }
  }
]
};
