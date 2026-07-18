// Kid-friendly SVG line-art for the Tasviriy sanʼat (Visual arts) subject.
// Every picture is pure vector: fillable `regions` (closed paths or circles the
// child taps to colour) plus non-fillable `details` (veins, stems, antennae…)
// drawn on top. NO emojis anywhere — the whole subject is real vector art.
//
// A picture renders inside ColorFill (tap-to-fill colouring) and FreeDraw
// (shown faintly as an example to copy).

export type Region =
  | { id: string; d: string }
  | { id: string; circle: { cx: number; cy: number; r: number } };

export type Picture = {
  /** SVG viewBox, always square-ish so it scales cleanly */
  viewBox: string;
  /** outline stroke colour + width shared by regions and details */
  stroke?: string;
  strokeWidth?: number;
  /** closed shapes the child can colour */
  regions: Region[];
  /** decorative strokes drawn ON TOP, never filled (veins, stems, rays…) */
  details?: string[];
  /** a soft default fill per region id (used for examples / rainbow) */
  palette?: Record<string, string>;
};

export const PICTURES: Record<string, Picture> = {
  // ── Autumn leaf ────────────────────────────────────────────────
  leaf: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'blade', d: 'M100 24 C64 60 46 118 100 182 C154 118 136 60 100 24 Z' }
    ],
    details: [
      'M100 40 L100 176',
      'M100 78 L70 60', 'M100 78 L130 60',
      'M100 110 L64 96', 'M100 110 L136 96',
      'M100 142 L74 132', 'M100 142 L126 132'
    ]
  },

  // ── Rainbow (7 colour bands, pre-coloured for examples) ────────
  rainbow: {
    viewBox: '0 0 200 130',
    strokeWidth: 1.5,
    regions: [
      { id: 'b1', d: 'M10 120 A90 90 0 0 1 190 120 L182 120 A82 82 0 0 0 18 120 Z' },
      { id: 'b2', d: 'M18 120 A82 82 0 0 1 182 120 L174 120 A74 74 0 0 0 26 120 Z' },
      { id: 'b3', d: 'M26 120 A74 74 0 0 1 174 120 L166 120 A66 66 0 0 0 34 120 Z' },
      { id: 'b4', d: 'M34 120 A66 66 0 0 1 166 120 L158 120 A58 58 0 0 0 42 120 Z' },
      { id: 'b5', d: 'M42 120 A58 58 0 0 1 158 120 L150 120 A50 50 0 0 0 50 120 Z' },
      { id: 'b6', d: 'M50 120 A50 50 0 0 1 150 120 L142 120 A42 42 0 0 0 58 120 Z' },
      { id: 'b7', d: 'M58 120 A42 42 0 0 1 142 120 L134 120 A34 34 0 0 0 66 120 Z' }
    ],
    palette: {
      b1: '#e4443a', b2: '#f39a1f', b3: '#f7d13a', b4: '#5bbf5b',
      b5: '#1fa7e0', b6: '#3a5fd0', b7: '#8a4bd0'
    }
  },

  // ── Apple ──────────────────────────────────────────────────────
  apple: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'body', d: 'M100 66 C78 48 50 58 48 96 C46 140 74 176 100 176 C126 176 154 140 152 96 C150 58 122 48 100 66 Z' },
      { id: 'leaf', d: 'M104 58 C118 40 140 42 146 52 C132 66 114 66 104 58 Z' }
    ],
    details: ['M100 66 C101 52 101 44 108 34']
  },

  // ── Carrot ─────────────────────────────────────────────────────
  carrot: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'body', d: 'M84 66 L116 66 L100 176 Z' },
      { id: 'top1', d: 'M100 66 C92 38 78 30 70 34 C82 44 88 56 100 66 Z' },
      { id: 'top2', d: 'M100 66 C100 34 100 24 100 22 C104 40 104 54 100 66 Z' },
      { id: 'top3', d: 'M100 66 C108 38 122 30 130 34 C118 44 112 56 100 66 Z' }
    ],
    details: ['M90 96 L110 96', 'M92 120 L108 120', 'M95 144 L105 144']
  },

  // ── Fir tree (archa) ───────────────────────────────────────────
  fir: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'trunk', d: 'M90 150 L110 150 L110 178 L90 178 Z' },
      { id: 'tier3', d: 'M100 96 L54 152 L146 152 Z' },
      { id: 'tier2', d: 'M100 62 L66 116 L134 116 Z' },
      { id: 'tier1', d: 'M100 30 L76 82 L124 82 Z' }
    ]
  },

  // ── Butterfly (symmetry: colour the two sides the same) ────────
  butterfly: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'wingUL', d: 'M98 92 C58 52 26 70 30 104 C33 128 66 128 98 110 Z' },
      { id: 'wingUR', d: 'M102 92 C142 52 174 70 170 104 C167 128 134 128 102 110 Z' },
      { id: 'wingLL', d: 'M98 112 C72 122 52 156 78 174 C94 184 98 150 98 128 Z' },
      { id: 'wingLR', d: 'M102 112 C128 122 148 156 122 174 C106 184 102 150 102 128 Z' },
      { id: 'body', d: 'M100 74 C106 74 108 84 108 104 C108 132 104 156 100 168 C96 156 92 132 92 104 C92 84 94 74 100 74 Z' }
    ],
    details: ['M100 78 C96 60 86 50 76 48', 'M100 78 C104 60 114 50 124 48']
  },

  // ── Soap bubbles ───────────────────────────────────────────────
  bubbles: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'b1', circle: { cx: 74, cy: 84, r: 40 } },
      { id: 'b2', circle: { cx: 140, cy: 66, r: 26 } },
      { id: 'b3', circle: { cx: 132, cy: 132, r: 34 } },
      { id: 'b4', circle: { cx: 60, cy: 150, r: 20 } }
    ],
    details: ['M60 70 A22 22 0 0 1 82 62', 'M130 58 A14 14 0 0 1 144 54']
  },

  // ── Snowflake (6-fold; mostly line art to trace/colour) ────────
  snowflake: {
    viewBox: '0 0 200 200',
    regions: [{ id: 'hub', circle: { cx: 100, cy: 100, r: 12 } }],
    details: [
      'M100 20 L100 180', 'M31 60 L169 140', 'M169 60 L31 140',
      'M100 34 L88 50', 'M100 34 L112 50', 'M100 166 L88 150', 'M100 166 L112 150',
      'M45 68 L44 88', 'M45 68 L64 74', 'M155 132 L156 112', 'M155 132 L136 126',
      'M155 68 L156 88', 'M155 68 L136 74', 'M45 132 L44 112', 'M45 132 L64 126'
    ]
  },

  // ── Simple flower (spring lessons) ─────────────────────────────
  flower: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'p1', circle: { cx: 100, cy: 60, r: 22 } },
      { id: 'p2', circle: { cx: 138, cy: 88, r: 22 } },
      { id: 'p3', circle: { cx: 124, cy: 132, r: 22 } },
      { id: 'p4', circle: { cx: 76, cy: 132, r: 22 } },
      { id: 'p5', circle: { cx: 62, cy: 88, r: 22 } },
      { id: 'center', circle: { cx: 100, cy: 96, r: 20 } },
      { id: 'stem', d: 'M96 116 L104 116 L104 186 L96 186 Z' },
      { id: 'leaf', d: 'M104 156 C130 146 146 158 142 172 C120 176 108 168 104 156 Z' }
    ]
  },

  // ── Grapes (bunch) ─────────────────────────────────────────────
  grapes: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'leaf', d: 'M92 44 C70 30 44 38 40 58 C60 60 78 58 92 50 Z' },
      { id: 'g1', circle: { cx: 100, cy: 70, r: 15 } },
      { id: 'g2', circle: { cx: 78, cy: 86, r: 15 } },
      { id: 'g3', circle: { cx: 122, cy: 86, r: 15 } },
      { id: 'g4', circle: { cx: 100, cy: 100, r: 15 } },
      { id: 'g5', circle: { cx: 66, cy: 112, r: 15 } },
      { id: 'g6', circle: { cx: 134, cy: 112, r: 15 } },
      { id: 'g7', circle: { cx: 88, cy: 126, r: 15 } },
      { id: 'g8', circle: { cx: 112, cy: 126, r: 15 } },
      { id: 'g9', circle: { cx: 100, cy: 150, r: 15 } }
    ],
    details: ['M100 40 C102 50 102 54 100 56']
  },

  // ── Car (vehicle) ──────────────────────────────────────────────
  car: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'body', d: 'M24 120 L44 94 Q49 88 62 88 L126 88 Q140 88 152 100 L174 110 Q182 113 182 124 L182 134 Q182 140 176 140 L30 140 Q24 140 24 134 Z' },
      { id: 'win1', d: 'M60 98 L94 98 L94 114 L54 114 Z' },
      { id: 'win2', d: 'M100 98 L122 98 L134 114 L100 114 Z' },
      { id: 'wheelL', circle: { cx: 66, cy: 142, r: 17 } },
      { id: 'wheelR', circle: { cx: 148, cy: 142, r: 17 } }
    ],
    details: ['M97 98 L97 132', 'M66 142 A6 6 0 1 0 66 141.9', 'M148 142 A6 6 0 1 0 148 141.9']
  },

  // ── Chick (baby bird) ──────────────────────────────────────────
  chick: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'body', d: 'M68 116 Q68 154 100 154 Q132 154 132 116 Q132 88 100 88 Q68 88 68 116 Z' },
      { id: 'head', circle: { cx: 100, cy: 68, r: 26 } },
      { id: 'wing', d: 'M120 112 Q142 108 140 130 Q127 138 116 128 Z' },
      { id: 'beak', d: 'M124 66 L144 72 L124 80 Z' }
    ],
    details: ['M108 60 A2.4 2.4 0 1 0 108 59.9', 'M90 154 L86 172', 'M96 154 L96 172', 'M104 154 L104 172', 'M110 154 L114 172']
  },

  // ── Vase of flowers ────────────────────────────────────────────
  vase: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'vase', d: 'M78 122 Q72 154 90 174 L110 174 Q128 154 122 122 Z' },
      { id: 'rim', d: 'M74 114 L126 114 L122 124 L78 124 Z' },
      { id: 'f1', circle: { cx: 78, cy: 66, r: 15 } },
      { id: 'f2', circle: { cx: 100, cy: 54, r: 15 } },
      { id: 'f3', circle: { cx: 122, cy: 66, r: 15 } }
    ],
    details: ['M78 81 L86 114', 'M100 69 L100 114', 'M122 81 L114 114', 'M78 66 A5 5 0 1 0 78 65.9', 'M100 54 A5 5 0 1 0 100 53.9', 'M122 66 A5 5 0 1 0 122 65.9']
  },

  // ── Mittens / gloves (winter) ──────────────────────────────────
  gloves: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'lhand', d: 'M48 66 Q65 60 82 66 Q87 86 83 110 Q80 122 65 122 Q50 122 47 110 Q43 86 48 66 Z' },
      { id: 'lthumb', d: 'M47 82 Q35 82 35 95 Q35 105 47 102 Z' },
      { id: 'lcuff', d: 'M47 118 L83 118 L83 138 Q65 144 47 138 Z' },
      { id: 'rhand', d: 'M118 66 Q135 60 152 66 Q157 86 153 110 Q150 122 135 122 Q120 122 117 110 Q113 86 118 66 Z' },
      { id: 'rthumb', d: 'M153 82 Q165 82 165 95 Q165 105 153 102 Z' },
      { id: 'rcuff', d: 'M117 118 L153 118 L153 138 Q135 144 117 138 Z' }
    ],
    details: [
      'M65 138 Q100 158 135 138',
      'M65 80 L65 100', 'M55 90 L75 90', 'M58 83 L72 97', 'M72 83 L58 97',
      'M135 80 L135 100', 'M125 90 L145 90', 'M128 83 L142 97', 'M142 83 L128 97'
    ]
  },

  // ── Snowman (winter) ───────────────────────────────────────────
  snowman: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'bottom', circle: { cx: 100, cy: 150, r: 42 } },
      { id: 'middle', circle: { cx: 100, cy: 96, r: 32 } },
      { id: 'head', circle: { cx: 100, cy: 52, r: 24 } },
      { id: 'hat', d: 'M78 40 L122 40 L118 40 L114 16 L86 16 L82 40 Z' },
      { id: 'brim', d: 'M74 40 L126 40 L126 46 L74 46 Z' },
      { id: 'scarf', d: 'M76 70 C88 78 112 78 124 70 L124 80 C112 88 88 88 76 80 Z' }
    ],
    details: [
      'M92 48 A2 2 0 1 0 92 47.9', 'M108 48 A2 2 0 1 0 108 47.9',
      'M100 54 L108 58 L100 60', 'M96 62 C99 65 101 65 104 62',
      'M100 88 L100 92', 'M100 104 L100 108', 'M100 120 L100 124',
      'M68 96 L44 84', 'M132 96 L156 84'
    ]
  },

  // ── Apple tree ─────────────────────────────────────────────────
  tree: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'trunk', d: 'M90 116 L110 116 L114 178 L86 178 Z' },
      { id: 'canopy', d: 'M100 26 Q152 30 156 82 Q158 122 100 126 Q42 122 44 82 Q48 30 100 26 Z' },
      { id: 'a1', circle: { cx: 76, cy: 70, r: 9 } },
      { id: 'a2', circle: { cx: 122, cy: 66, r: 9 } },
      { id: 'a3', circle: { cx: 100, cy: 96, r: 9 } },
      { id: 'a4', circle: { cx: 100, cy: 50, r: 9 } }
    ],
    details: ['M90 140 L100 128 L110 140']
  },

  // ── Mushroom (autumn forest) ───────────────────────────────────
  mushroom: {
    viewBox: '0 0 200 200',
    regions: [
      { id: 'cap', d: 'M40 104 C40 58 160 58 160 104 C160 112 40 112 40 104 Z' },
      { id: 'stem', d: 'M84 104 C84 104 82 160 90 170 C98 178 102 178 110 170 C118 160 116 104 116 104 Z' }
    ],
    details: ['M40 104 L160 104']
  }
};

export function getPicture(name: string): Picture | undefined {
  return PICTURES[name];
}
