#!/usr/bin/env node
/**
 * Records "Mufassal" AI answers as vertical videos (1080×1920 MP4) with the Gemini voice,
 * the logo intro/outro, the question being typed and the cursor clicking through the parts.
 *
 *   npm run video -- --list                 show the queue (answers students asked for on the site)
 *   npm run video -- --queue 3              record the 3 newest queue items
 *   npm run video -- --id 12                record one queue item
 *   npm run video -- --skip 12              never record this item
 *   npm run video -- "Fotosintez nima?"     make a fresh answer for your own question and record it
 *
 * Needs the dev server running (npm run dev) or --base https://quvnoqtest.uz.
 * Output: videos/<date>-<slug>/video.mp4 + caption.txt + meta.json. Check it, then: npm run video:publish -- videos/<folder>
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import ffmpegPath from 'ffmpeg-static';
import { VIDEOS_DIR, sbSelect, sbUpdate, slugify, arg } from './env.mjs';

const BASE = String(arg('base', process.env.VIDEO_BASE_URL || 'http://localhost:3000')).replace(/\/$/, '');
const KEY = process.env.VIDEO_SECRET;
if (!KEY) throw new Error('VIDEO_SECRET is missing in .env');
const H = { 'content-type': 'application/json', 'x-video-key': KEY };

async function freshAnswer(question) {
  const r = await fetch(`${BASE}/api/ai/board`, { method: 'POST', headers: H, body: JSON.stringify({ question }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.lesson) throw new Error(`board failed (${r.status}): ${JSON.stringify(j).slice(0, 200)}`);
  return { id: null, question, lesson: j.lesson, lang: 'uz' };
}

/** Gemini voice for one part → { file, seconds } */
async function voice(text, lang, file) {
  for (let i = 0; i < 3; i++) {
    const r = await fetch(`${BASE}/api/ai/board/voice`, { method: 'POST', headers: H, body: JSON.stringify({ text, lang }) });
    if (r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(file, buf);
      const rate = buf.readUInt32LE(24);
      const bytes = buf.readUInt32LE(40);
      return bytes / (rate * 2);
    }
    console.log(`  voice retry (${r.status})…`);
    await new Promise((res) => setTimeout(res, 4000));
  }
  throw new Error('voice failed');
}

function caption(item) {
  const l = item.lesson;
  const title = `${item.question.replace(/\s+/g, ' ').trim()} | SI ustoz tushuntiradi`.slice(0, 100);
  const body = [
    `${l.title}`,
    '',
    ...l.steps.map((s, i) => `${i + 1}. ${s.say}`),
    '',
    'Oʻz savolingizni bering — SI ustoz doskada tushuntiradi: https://moviydaftar.uz/ai',
    'Barcha fanlardan namunaviy milliy sertifikat testlari, tushunarli darslar va interaktiv mashqlar: https://moviydaftar.uz',
    '',
    '#moviydaftar #quvnoqtest #milliysertifikat #dtm #11sinf #onlayndars #shorts'
  ].join('\n');
  return { title, description: body, tags: ['MoviyDaftar', 'QuvnoqTest', 'SI ustoz', 'Milliy sertifikat', 'DTM', '11-sinf', 'onlayn dars', l.title].slice(0, 15) };
}

async function record(item) {
  const day = new Date().toISOString().slice(0, 10);
  const dir = path.join(VIDEOS_DIR, `${day}-${item.id ?? 'q'}-${slugify(item.question)}`);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`\n▶ ${item.question}\n  ${item.lesson.steps.length} parts → ${dir}`);

  const durations = [];
  for (let i = 0; i < item.lesson.steps.length; i++) {
    durations.push(await voice(item.lesson.steps[i].say, item.lang || 'uz', path.join(dir, `part-${i}.wav`)));
    console.log(`  voice ${i + 1}: ${durations[i].toFixed(1)} s`);
  }

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 576, height: 1024 }, deviceScaleFactor: 1.875 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/record`, { waitUntil: 'networkidle', timeout: 180_000 });
  await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
  await page.waitForTimeout(1500);

  // capture painted frames with their exact wall-clock times (CDP screencast)
  const tmp = path.join(dir, 'frames');
  fs.mkdirSync(tmp, { recursive: true });
  const frames = [];
  const cdp = await ctx.newCDPSession(page);
  cdp.on('Page.screencastFrame', (f) => {
    const file = path.join(tmp, `f${String(frames.length).padStart(6, '0')}.jpg`);
    frames.push({ file, t: f.metadata.timestamp });
    fs.writeFileSync(file, Buffer.from(f.data, 'base64'));
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  await page.waitForTimeout(500);
  await page.evaluate((rec) => (window.__REC = rec), { question: item.question, lesson: item.lesson, durations });
  await page.waitForFunction(() => window.__done === true, null, { timeout: 15 * 60_000, polling: 500 });
  const tEnd = Date.now() / 1000;
  await cdp.send('Page.stopScreencast');
  const { marks, t0wall } = await page.evaluate(() => ({ marks: window.__marks, t0wall: window.__t0wall }));
  await ctx.close();
  await browser.close();

  // video timeline starts at t0wall: keep the last frame painted before it, drop older ones
  const t0 = t0wall / 1000;
  let first = 0;
  for (let i = 0; i < frames.length; i++) if (frames[i].t <= t0) first = i;
  const used = frames.slice(first);
  const lines = ['ffconcat version 1.0'];
  used.forEach((f, i) => {
    const start = Math.max(f.t, t0);
    const end = i + 1 < used.length ? Math.max(used[i + 1].t, t0) : tEnd;
    lines.push(`file '${path.basename(f.file)}'`, `duration ${Math.max(0.001, end - start).toFixed(4)}`);
  });
  lines.push(`file '${path.basename(used[used.length - 1].file)}'`);
  const list = path.join(tmp, 'list.ffconcat');
  fs.writeFileSync(list, lines.join('\n'));

  const parts = marks.filter((m) => m.step >= 0);
  const inputs = ['-f', 'concat', '-safe', '0', '-i', list];
  const chains = [];
  parts.forEach((m, k) => {
    inputs.push('-i', path.join(dir, `part-${m.step}.wav`));
    chains.push(`[${k + 1}:a]adelay=${m.t}|${m.t}[a${k}]`);
  });
  const filter = `[0:v]fps=30,scale=1080:1920:flags=lanczos,format=yuv420p[v];${chains.join(';')};${parts.map((_, k) => `[a${k}]`).join('')}amix=inputs=${parts.length}:normalize=0:duration=longest[a]`;
  const out = path.join(dir, 'video.mp4');
  execFileSync(ffmpegPath, ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', filter, '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
  for (let i = 0; i < item.lesson.steps.length; i++) fs.rmSync(path.join(dir, `part-${i}.wav`), { force: true });

  const cap = caption(item);
  fs.writeFileSync(path.join(dir, 'caption.txt'), `${cap.title}\n\n${cap.description}\n`);
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ queueId: item.id, question: item.question, ...cap }, null, 2));
  if (item.id) await sbUpdate('board_videos', item.id, { status: 'recorded' });
  console.log(`  ✓ ${out}`);
  return out;
}

async function main() {
  if (arg('list')) {
    const rows = await sbSelect('board_videos?status=eq.new&order=created_at.desc&limit=30&select=id,question,created_at');
    for (const r of rows) console.log(`${String(r.id).padStart(5)}  ${r.created_at.slice(0, 16)}  ${r.question}`);
    if (!rows.length) console.log('Queue is empty.');
    return;
  }
  const skip = arg('skip');
  if (skip) return sbUpdate('board_videos', Number(skip), { status: 'skipped' }).then(() => console.log(`skipped ${skip}`));

  let items = [];
  const id = arg('id');
  const n = arg('queue');
  if (id) items = await sbSelect(`board_videos?id=eq.${Number(id)}&select=*`);
  else if (n) items = await sbSelect(`board_videos?status=eq.new&order=created_at.desc&limit=${n === true ? 1 : Number(n)}&select=*`);
  else {
    const q = process.argv.slice(2).filter((a) => !a.startsWith('--') && a !== arg('base')).join(' ').trim();
    if (!q) return console.log('Usage: npm run video -- "Savol" | --queue 3 | --id 12 | --list | --skip 12');
    items = [await freshAnswer(q)];
  }
  if (!items.length) return console.log('Nothing to record.');
  for (const it of items) {
    try {
      await record(it);
    } catch (e) {
      console.error(`  ✗ ${it.question}: ${e.message}`);
    }
  }
  console.log('\nWatch the video(s), then publish: npm run video:publish -- videos/<folder> [--youtube] [--instagram]');
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
