/**
 * Tiny, safe math-expression reader for typed answers (no eval).
 *
 * Accepts what students type on a phone: 2x, x(x+3), x^2, x², 3·x, 5×x,
 * the "−" minus sign, decimal commas (0,5) and fractions (3/4). Answers are
 * compared numerically at several random points, so "3 + x" equals "x + 3".
 */

/** `imp` marks a multiplication sign that was implied (2x → 2*x), not typed. */
type Tok = { k: 'num'; v: number } | { k: 'var'; v: string } | { k: 'op'; v: string; imp?: boolean } | { k: 'fn'; v: string };
type Node = { n: number } | { v: string } | { op: string; a: Node; b: Node } | { neg: Node } | { fn: string; a: Node };

// longer names first, so "ctg" is not read as "c" + "tg"
const FNS = ['sqrt', 'ctg', 'cot', 'sin', 'cos', 'tan', 'tg', 'ln', 'lg', 'abs'];
const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

function normalize(s: string): string {
  return s
    .replace(/[−–—]/g, '-')
    .replace(/[·×∙*]/g, '*')
    .replace(/÷/g, '/')
    // superscripts: x⁴ → x^(4), x⁻¹ → x^(-1)
    .replace(/[⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `^(${[...m].map((c) => SUP[c]).join('')})`)
    .replace(/√/g, 'sqrt')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function tokenize(src: string, vars: string[]): Tok[] {
  const s = normalize(src);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const v = Number(s.slice(i, j));
      if (!Number.isFinite(v)) throw new Error('bad number');
      out.push({ k: 'num', v });
      i = j;
    } else if (/[a-z]/.test(c)) {
      const fn = FNS.find((f) => s.startsWith(f, i));
      if (fn) {
        out.push({ k: 'fn', v: fn });
        i += fn.length;
      } else if (s.startsWith('pi', i)) {
        out.push({ k: 'num', v: Math.PI });
        i += 2;
      } else if (c === 'e' && !vars.includes('e')) {
        out.push({ k: 'num', v: Math.E });
        i++;
      } else if (vars.includes(c)) {
        out.push({ k: 'var', v: c });
        i++;
      } else throw new Error(`unknown letter ${c}`);
    } else if ('+-*/^()'.includes(c)) {
      out.push({ k: 'op', v: c });
      i++;
    } else throw new Error(`unknown symbol ${c}`);
  }
  // implicit multiplication: 2x, x(…), )(, )x, x y, 2(…)
  const res: Tok[] = [];
  for (const t of out) {
    const p = res[res.length - 1];
    const leftOk = p && (p.k === 'num' || p.k === 'var' || (p.k === 'op' && p.v === ')'));
    const rightOk = t.k === 'num' || t.k === 'var' || t.k === 'fn' || (t.k === 'op' && t.v === '(');
    if (leftOk && rightOk && !(p.k === 'num' && t.k === 'num')) res.push({ k: 'op', v: '*', imp: true });
    res.push(t);
  }
  return res;
}

function parse(toks: Tok[]): Node {
  let i = 0;
  const peek = () => toks[i];
  const isOp = (v: string) => peek()?.k === 'op' && peek()!.v === v;
  function expr(): Node {
    let a = term();
    while (isOp('+') || isOp('-')) {
      const op = (toks[i++] as { v: string }).v;
      a = { op, a, b: term() };
    }
    return a;
  }
  function term(): Node {
    let a = unary();
    while (isOp('*') || isOp('/')) {
      const op = (toks[i++] as { v: string }).v;
      a = { op, a, b: unary() };
    }
    return a;
  }
  function unary(): Node {
    if (isOp('-')) {
      i++;
      return { neg: unary() };
    }
    if (isOp('+')) {
      i++;
      return unary();
    }
    return power();
  }
  function power(): Node {
    const base = atom();
    if (isOp('^')) {
      i++;
      return { op: '^', a: base, b: unary() };
    }
    return base;
  }
  function atom(): Node {
    const t = toks[i++];
    if (!t) throw new Error('unexpected end');
    if (t.k === 'num') return { n: t.v };
    if (t.k === 'var') return { v: t.v };
    if (t.k === 'fn') {
      // sin²x / cos⁸x: the power belongs to the whole function value
      if (isOp('^')) {
        i++;
        const exp = atom();
        return { op: '^', a: { fn: t.v, a: fnArg() }, b: exp };
      }
      return { fn: t.v, a: fnArg() };
    }
    if (t.v === '(') {
      const e = expr();
      if (!isOp(')')) throw new Error(') expected');
      i++;
      return e;
    }
    throw new Error(`unexpected ${t.v}`);
  }
  /**
   * A function's argument: (…) as usual, or — the way it is written on paper —
   * the term right after it: sin x, cos 4x, √x, sin 2x·cos x = sin(2x)·cos(x).
   */
  function fnArg(): Node {
    // sin²x: the "x" after the power got an implied ×; it is the argument
    const p0 = peek();
    if (p0?.k === 'op' && p0.v === '*' && p0.imp) i++;
    if (isOp('(')) return atom();
    if (!peek() || (peek()!.k !== 'num' && peek()!.k !== 'var')) throw new Error('argument expected');
    let a = power();
    for (;;) {
      const t = peek();
      const n = toks[i + 1];
      if (t?.k === 'op' && t.v === '*' && t.imp && n && (n.k === 'num' || n.k === 'var')) {
        i++;
        a = { op: '*', a, b: power() };
      } else break;
    }
    return a;
  }
  const e = expr();
  if (i !== toks.length) throw new Error('extra input');
  return e;
}

function evaluate(n: Node, env: Record<string, number>): number {
  if ('n' in n) return n.n;
  if ('v' in n) return env[n.v];
  if ('neg' in n) return -evaluate(n.neg, env);
  if ('fn' in n) {
    const a = evaluate(n.a, env);
    switch (n.fn) {
      case 'sqrt':
        return Math.sqrt(a);
      case 'sin':
        return Math.sin(a);
      case 'cos':
        return Math.cos(a);
      case 'tg':
      case 'tan':
        return Math.tan(a);
      case 'ctg':
      case 'cot':
        return 1 / Math.tan(a);
      case 'ln':
        return Math.log(a);
      case 'lg':
        return Math.log10(a);
      default:
        return Math.abs(a);
    }
  }
  const a = evaluate(n.a, env);
  const b = evaluate(n.b, env);
  switch (n.op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return a ** b;
  }
}

export function compile(src: string, vars: string[]): (env: Record<string, number>) => number {
  const tree = parse(tokenize(src, vars));
  return (env) => evaluate(tree, env);
}

/** Do two expressions agree at several random points (ignoring points where either is undefined)? */
export function sameExpression(student: string, answer: string, vars: string[]): boolean {
  const f = compile(student, vars);
  const g = compile(answer, vars);
  let checked = 0;
  for (let k = 0; k < 40 && checked < 8; k++) {
    const env = Object.fromEntries(vars.map((v) => [v, Math.round((Math.random() * 8 - 4) * 1000) / 1000 + 0.137]));
    const a = f(env);
    const b = g(env);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    if (Math.abs(a - b) > 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))) return false;
    checked++;
  }
  return checked >= 4;
}

/** Read a typed number: "0,5", "-3", "3/4", "2 1/2" is not supported (write 5/2). */
export function readNumber(src: string): number | null {
  const s = normalize(src);
  if (!s) return null;
  if (!/^[-+]?[0-9.]+(\/[0-9.]+)?$/.test(s)) return null;
  const [p, q] = s.split('/');
  const v = q === undefined ? Number(p) : Number(p) / Number(q);
  return Number.isFinite(v) ? v : null;
}

/**
 * Antiderivative check: do the two expressions differ only by a constant?
 * A trailing "+ C" in the student's answer is allowed and ignored.
 */
export function sameUpToConstant(student: string, answer: string, vars: string[]): boolean {
  const cleaned = student.replace(/[+＋]\s*[cCсС]\s*$/, '');
  const f = compile(cleaned, vars);
  const g = compile(answer, vars);
  let diff: number | null = null;
  let checked = 0;
  for (let k = 0; k < 60 && checked < 8; k++) {
    const env = Object.fromEntries(vars.map((v) => [v, Math.round((Math.random() * 6 + 0.3) * 1000) / 1000]));
    const a = f(env);
    const b = g(env);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    const d = a - b;
    if (diff === null) diff = d;
    else if (Math.abs(d - diff) > 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))) return false;
    checked++;
  }
  return checked >= 4;
}
