import type { BoardLesson } from './types';

/** Takrorlash (savollar): darslik, Geometriya, 9 — "Masalalar yechish" / "Bobni takrorlash" mashqlari asosida. */
export const MATH_40: BoardLesson = {
  n: 40,
  label: "9",
  part: 'geometriya',
  title: "Takrorlash: koʻpyoqlar, prizma va silindr",
  section: "Geometriya, 9",
  revision: true,
  steps: [],
  summary: [],
  questions: [
  {
    "id": "g9q1",
    "prompt": "Kubning nechta simmetriya tekisligi bor?",
    "hint": "3 ta yoqlarga parallel + 6 ta diagonal tekislik.",
    "explanation": "3 + 6 = 9.",
    "widget": {
      "type": "mcq",
      "props": {
        "prompt": "",
        "choices": [
          "8",
          "9",
          "7",
          "10"
        ],
        "answerIndex": 1
      }
    }
  },
  {
    "id": "g9q2",
    "prompt": "Toʻgʻri burchakli parallelepiped asosining tomonlari 7 va 24, balandligi 8. Diagonal kesimining yuzini toping.",
    "hint": "Asos diagonali √(49 + 576).",
    "explanation": "Diagonal 25, kesim 25 · 8 = 200.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 200
      }
    }
  },
  {
    "id": "g9q3",
    "prompt": "Prizmaning jami qirralari 36 ta. Uning nechta yon yogʻi bor?",
    "hint": "n burchakli prizmada 3n qirra.",
    "explanation": "3n = 36 → n = 12 yon yoq.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 12
      }
    }
  },
  {
    "id": "g9q4",
    "prompt": "Toʻrtburchakli muntazam prizma yon sirti 72 sm², asosi 64 sm². Prizma hajmini toping (sm³).",
    "hint": "a = 8, P = 32, h = 72 : 32.",
    "explanation": "h = 2,25, V = 64 · 2,25 = 144 sm³.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 144,
        "unit": "sm³"
      }
    }
  },
  {
    "id": "g9q5",
    "prompt": "Muntazam toʻrtburchakli prizma asosining perimetri 12 sm, yon yogʻining perimetri 18 sm. Hajmini toping (sm³).",
    "hint": "a = 3, 2(3 + h) = 18.",
    "explanation": "h = 6, V = 9 · 6 = 54 sm³.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 54,
        "unit": "sm³"
      }
    }
  },
  {
    "id": "g9q6",
    "prompt": "Silindr oʻq kesimining yuzi 10. Yon sirti kπ. k ni toping.",
    "hint": "S yon = 2πrh = π·(2r·h).",
    "explanation": "2r·h = 10 → S yon = 10π.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 10
      }
    }
  },
  {
    "id": "g9q7",
    "prompt": "Silindr balandligi 8, yon sirti yoyilmasining diagonali 10. Yon sirt yuzini toping.",
    "hint": "Yoyilma — toʻgʻri toʻrtburchak 8 × ?",
    "explanation": "Ikkinchi tomon 6, yuz 48.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 48
      }
    }
  },
  {
    "id": "g9q8",
    "prompt": "Tomonlari 2 va 4 boʻlgan toʻgʻri toʻrtburchak katta tomoni atrofida aylandi. Toʻla sirt kπ. k ni toping.",
    "hint": "r = 2, h = 4.",
    "explanation": "2π·2·(4 + 2) = 24π.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 24
      }
    }
  },
  {
    "id": "g9q9",
    "prompt": "Silindr asosining radiusi 2 marta orttirilsa, hajmi necha marta ortadi?",
    "hint": "V ~ r².",
    "explanation": "4 marta.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 4
      }
    }
  },
  {
    "id": "g9q10",
    "prompt": "Silindr hajmi 120π, yon sirti 60π. Asos radiusini toping.",
    "hint": "V/S yon = r/2.",
    "explanation": "120π / 60π = r/2 → r = 4.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 4
      }
    }
  },
  {
    "id": "g9q11",
    "prompt": "Silindr toʻla sirti 24π, yon sirti 6π. Hajmi kπ. k ni toping.",
    "hint": "2πr² = 18π → r = 3; 2πrh = 6π → h = 1.",
    "explanation": "V = π · 9 · 1 = 9π.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 9
      }
    }
  },
  {
    "id": "g9q12",
    "prompt": "Silindr balandligi 24, oʻq kesim diagonali 26. Hajmi kπ. k ni toping.",
    "hint": "2r = √(26² − 24²) = 10.",
    "explanation": "r = 5, V = π·25·24 = 600π.",
    "widget": {
      "type": "number_answer",
      "props": {
        "answer": 600
      }
    }
  },
  {
    "id": "g9q13",
    "prompt": "Muntazam koʻpyoqni yoqlari bilan moslang.",
    "hint": "Yoqlar soni nomida.",
    "explanation": "Tetraedr — 4, kub — 6, oktaedr — 8, ikosaedr — 20.",
    "widget": {
      "type": "memory_match",
      "props": {
        "pairs": [
          {
            "a": {
              "label": "Tetraedr"
            },
            "b": {
              "label": "4 yoq"
            }
          },
          {
            "a": {
              "label": "Kub"
            },
            "b": {
              "label": "6 yoq"
            }
          },
          {
            "a": {
              "label": "Oktaedr"
            },
            "b": {
              "label": "8 yoq"
            }
          },
          {
            "a": {
              "label": "Ikosaedr"
            },
            "b": {
              "label": "20 yoq"
            }
          }
        ]
      }
    }
  }
]
};
