#!/usr/bin/env node
/**
 * Publish a recorded video (after you have watched it):
 *   npm run video:publish -- videos/<folder> --youtube              (uploads as PRIVATE by default)
 *   npm run video:publish -- videos/<folder> --youtube --public
 *   npm run video:publish -- videos/<folder> --instagram            (Reels)
 *
 * YouTube: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN in .env (run `npm run video:auth` once).
 * Instagram: IG_USER_ID and IG_ACCESS_TOKEN (Instagram professional account linked to a Facebook Page,
 * permission instagram_content_publish). The MP4 is put in the public Supabase "videos" bucket so Instagram can fetch it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, sbUpdate, sbUploadPublic, arg } from './env.mjs';

const folder = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!folder) {
  console.log('Usage: npm run video:publish -- videos/<folder> [--youtube] [--public] [--instagram]');
  process.exit(0);
}
const dir = path.resolve(ROOT, folder);
const file = path.join(dir, 'video.mp4');
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
if (!fs.existsSync(file)) throw new Error(`no video.mp4 in ${dir}`);

async function youtube() {
  const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
  if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN) throw new Error('YouTube keys missing — run: npm run video:auth');
  const tok = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: YT_CLIENT_ID, client_secret: YT_CLIENT_SECRET, refresh_token: YT_REFRESH_TOKEN, grant_type: 'refresh_token' })
  }).then((r) => r.json());
  if (!tok.access_token) throw new Error(`YouTube token: ${JSON.stringify(tok)}`);
  const privacy = arg('public') ? 'public' : arg('unlisted') ? 'unlisted' : 'private';
  const body = fs.readFileSync(file);
  const init = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tok.access_token}`, 'content-type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': String(body.length) },
    body: JSON.stringify({
      snippet: { title: meta.title, description: meta.description, tags: meta.tags, categoryId: '27', defaultLanguage: 'uz', defaultAudioLanguage: 'uz' },
      status: { privacyStatus: privacy, selfDeclaredMadeForKids: !!arg('kids') }
    })
  });
  const url = init.headers.get('location');
  if (!url) throw new Error(`YouTube upload start: ${init.status} ${await init.text()}`);
  const up = await fetch(url, { method: 'PUT', headers: { 'content-type': 'video/mp4', 'content-length': String(body.length) }, body });
  const j = await up.json();
  if (!j.id) throw new Error(`YouTube upload: ${JSON.stringify(j).slice(0, 400)}`);
  console.log(`✓ YouTube (${privacy}): https://youtu.be/${j.id}`);
  return j.id;
}

async function instagram() {
  const { IG_USER_ID, IG_ACCESS_TOKEN } = process.env;
  if (!IG_USER_ID || !IG_ACCESS_TOKEN) throw new Error('IG_USER_ID / IG_ACCESS_TOKEN missing in .env');
  const G = 'https://graph.facebook.com/v21.0';
  const url = await sbUploadPublic(`${path.basename(dir)}.mp4`, fs.readFileSync(file), 'video/mp4');
  const cap = `${meta.title}\n\n${meta.description}`.slice(0, 2200);
  const c = await fetch(`${G}/${IG_USER_ID}/media`, { method: 'POST', body: new URLSearchParams({ media_type: 'REELS', video_url: url, caption: cap, share_to_feed: 'true', access_token: IG_ACCESS_TOKEN }) }).then((r) => r.json());
  if (!c.id) throw new Error(`Instagram container: ${JSON.stringify(c)}`);
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const s = await fetch(`${G}/${c.id}?fields=status_code,status&access_token=${IG_ACCESS_TOKEN}`).then((r) => r.json());
    if (s.status_code === 'FINISHED') break;
    if (s.status_code === 'ERROR') throw new Error(`Instagram processing: ${JSON.stringify(s)}`);
    process.stdout.write('.');
  }
  const p = await fetch(`${G}/${IG_USER_ID}/media_publish`, { method: 'POST', body: new URLSearchParams({ creation_id: c.id, access_token: IG_ACCESS_TOKEN }) }).then((r) => r.json());
  if (!p.id) throw new Error(`Instagram publish: ${JSON.stringify(p)}`);
  console.log(`\n✓ Instagram Reel published (id ${p.id})`);
  return p.id;
}

const patch = {};
if (arg('youtube')) patch.youtube_id = await youtube();
if (arg('instagram')) patch.instagram_id = await instagram();
if (!arg('youtube') && !arg('instagram')) console.log('Add --youtube and/or --instagram.');
else if (meta.queueId) await sbUpdate('board_videos', meta.queueId, { ...patch, status: 'published' });
