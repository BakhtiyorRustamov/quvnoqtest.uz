// One-off: pull the embedded base64 car sprite out of GrandPrixAddition.jsx
// into its own module so the game component stays readable.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'src/components/learning/GrandPrixAddition.jsx'), 'utf8');
const m = src.match(/const CAR_SPRITE = "(data:image\/png;base64,[^"]+)"/);
if (!m) { console.error('sprite not found'); process.exit(1); }
const out = '// Transparent racing-car sprite (background removed, trimmed) - imported by GrandPrixAddition.\n'
  + 'export const CAR_SPRITE =\n  ' + JSON.stringify(m[1]) + ';\n';
fs.writeFileSync(path.join(root, 'src/components/learning/carSprite.js'), out);
console.log('carSprite.js written,', m[1].length, 'chars');
