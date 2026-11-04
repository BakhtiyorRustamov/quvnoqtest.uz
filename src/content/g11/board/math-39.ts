import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik, Geometriya, 4 — "Masalalar yechish" / "Bobni takrorlash" mashqlari asosida. */
export const MATH_39: BoardLesson = {
  n: 39,
  label: "4",
  part: 'geometriya',
  title: "Takrorlash: koordinatalar, vektorlar, almashtirishlar",
  section: "Geometriya, 4",
  revision: true,
  steps: [],
  summary: [],
  questions: [
  {
    "id": "g4q1",
    "prompt": "A(x₁; y₁; z₁) va B(x₂; y₂; z₂) uchun z₂ − z₁ nimani bildiradi?",
    "hint": "Vektor koordinatalari: oxiri minus boshi.",
    "explanation": "z₂ − z₁ — AB vektorning koordinatalaridan biri.",
    "widget": {
      "type": "mcq",
      "props": {
        "prompt": "",
        "choices": [
          "AB kesma oʻrtasining koordinatasi",
          "AB kesma uzunligi",
          "AB vektor uzunligi",
          "AB vektorning bitta koordinatasi"
        ],
        "answerIndex": 3
      }
    }
  },
  {
    "id": "g4q2",
    "prompt": "M(−7; 1; 4) va N(−1; −3; 0). MN kesma oʻrtasini toping.",
    "hint": "Koordinatalar yigʻindisining yarmi.",
    "explanation": "((−7 − 1)/2; (1 − 3)/2; (4 + 0)/2) = (−4; −1; 2).",
    "widget": {
      "type": "mcq",
      "props": {
        "prompt": "",
        "choices": [
          "(−4; −1; 4)",
          "(−4; −1; 2)",
          "(−4; −2; 2)",
          "(−3; 2; 2)"
        ],
        "answerIndex": 1
      }
    }
  },
  {
    "id": "g4q3",
    "prompt": "A(0; −3; 2) va B(4; 0; −2). AB kesma oʻrtasi qayerda yotadi?",
    "hint": "Oʻrtani toping va qaysi koordinatasi nol ekanini koʻring.",
    "explanation": "Oʻrta (2; −1,5; 0): z = 0, demak Oxy tekisligida.",
    "widget": {
      "type": "mcq",
      "props": {
        "prompt": "",
        "choices": [
          "Ox oʻqida",
          "Oy oʻqida",
          "Oz oʻqida",
          "Oxy tekisligida"
        ],
        "answerIndex": 3
      }
    }
  },
  {
    "id": "g4q4",
    "prompt": "A(3; 4; −3) nuqtadan Oz oʻqigacha masofani toping.",
    "hint": "Oz oʻqigacha masofa √(x² + y²).",
    "explanation": "√(9 + 16) = 5.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 5
      }
    }
  },
  {
    "id": "g4q5",
    "prompt": "CD + DE + EF vektorlar yigʻindisini toping.",
    "hint": "Uchburchak qoidasini ketma-ket qoʻllang.",
    "explanation": "CD + DE = CE, CE + EF = CF.",
    "widget": {
      "type": "mcq",
      "props": {
        "prompt": "",
        "choices": [
          "0",
          "CF",
          "DF",
          "CE"
        ],
        "answerIndex": 1
      }
    }
  },
  {
    "id": "g4q6",
    "prompt": "m ning qanday qiymatida a(m; 4; −3) va b(4; 8; −6) vektorlar kollinear?",
    "hint": "Koordinatalar proporsional: m/4 = 4/8.",
    "explanation": "m = 2.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 2
      }
    }
  },
  {
    "id": "g4q7",
    "prompt": "Kesmaning bir uchi A(1; −5; 4), oʻrtasi C(4; −2; 3). Ikkinchi uchining abssissasini toping.",
    "hint": "B = 2C − A.",
    "explanation": "B = (7; 1; 2), x = 7.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 7
      }
    }
  },
  {
    "id": "g4q8",
    "prompt": "A(1; 2; 3) nuqtaga simmetrik nuqtalarni moslang.",
    "hint": "Simmetriya elementidagi koordinata saqlanadi.",
    "explanation": "Oxz → (1; −2; 3), Oxy → (1; 2; −3), Oy oʻqi → (−1; 2; −3), O → (−1; −2; −3).",
    "widget": {
      "type": "match_pairs",
      "props": {
        "pairs": [
          {
            "left": "Oxz tekisligiga nisbatan",
            "right": "(1; −2; 3)"
          },
          {
            "left": "Oxy tekisligiga nisbatan",
            "right": "(1; 2; −3)"
          },
          {
            "left": "Oy oʻqiga nisbatan",
            "right": "(−1; 2; −3)"
          },
          {
            "left": "O nuqtaga nisbatan",
            "right": "(−1; −2; −3)"
          }
        ]
      }
    }
  },
  {
    "id": "g4q9",
    "prompt": "a(x; 1; 2) vektorning uzunligi 3. x ning musbat qiymatini toping.",
    "hint": "x² + 1 + 4 = 9.",
    "explanation": "x² = 4 → x = 2.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 2
      }
    }
  },
  {
    "id": "g4q10",
    "prompt": "a(2; −3; 4) va b(−2; −3; 1) vektorlarning skalyar koʻpaytmasini toping.",
    "hint": "a₁b₁ + a₂b₂ + a₃b₃.",
    "explanation": "−4 + 9 + 4 = 9.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 9
      }
    }
  },
  {
    "id": "g4q11",
    "prompt": "n ning qanday qiymatida a(n; −2; 1) va b(n; n; 1) vektorlar perpendikulyar?",
    "hint": "n² − 2n + 1 = 0.",
    "explanation": "(n − 1)² = 0 → n = 1.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 1
      }
    }
  },
  {
    "id": "g4q12",
    "prompt": "a(6; 3; 2) va b(−3; 1; 5). c = a + 2b vektorning uzunligini toping.",
    "hint": "c = (0; 5; 12).",
    "explanation": "√(0 + 25 + 144) = 13.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 13
      }
    }
  }
]
};
