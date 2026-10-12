// Quick pre-build verification: JSX/TS syntax via sucrase + content JSON shape.
const fs = require('fs');
const path = require('path');
const { transform } = require('sucrase');
const root = path.join(__dirname, '..');
let fail = 0;
const jsx = [
  'src/components/learning/GrandPrixAddition.jsx',
  'src/components/learning/TugOfWarMath.jsx',
  'src/components/learning/TankTargets.jsx',
  'src/components/learning/ScaleCompare.jsx',
  'src/components/learning/carSprite.js'
];
for (const f of jsx) {
  try {
    transform(fs.readFileSync(path.join(root, f), 'utf8'), { transforms: ['jsx'] });
    console.log('OK  ', f);
  } catch (e) { fail++; console.log('FAIL', f, '->', e.message); }
}
const ts = [
  'src/components/learning/registry.ts',
  'src/content/index.ts',
  'src/components/lesson/items/WidgetItem.tsx'
];
for (const f of ts) {
  try {
    transform(fs.readFileSync(path.join(root, f), 'utf8'), { transforms: ['typescript', 'jsx'] });
    console.log('OK  ', f);
  } catch (e) { fail++; console.log('FAIL', f, '->', e.message); }
}
for (const n of ['review02', 'review03', 'review04']) {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(root, `src/content/g1-math/${n}.json`), 'utf8'));
    const w = j.items[0].widget;
    console.log('OK  ', n + '.json', '(widget:', w.type + ', completeOn:', w.completeOn + ')');
  } catch (e) { fail++; console.log('FAIL', n, '->', e.message); }
}
console.log(fail ? 'VERIFY_FAILED ' + fail : 'VERIFY_PASSED');
