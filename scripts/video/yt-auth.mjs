#!/usr/bin/env node
/**
 * One-time YouTube sign-in: saves YT_REFRESH_TOKEN to .env.
 * Before running: Google Cloud Console → enable "YouTube Data API v3" → OAuth client ID of type
 * "Desktop app" → put YT_CLIENT_ID and YT_CLIENT_SECRET in .env. Then: npm run video:auth
 */
import http from 'node:http';
import { exec } from 'node:child_process';
import { appendEnv } from './env.mjs';

const { YT_CLIENT_ID, YT_CLIENT_SECRET } = process.env;
if (!YT_CLIENT_ID || !YT_CLIENT_SECRET) {
  console.log('Put YT_CLIENT_ID and YT_CLIENT_SECRET (OAuth client, type "Desktop app") in .env first.');
  process.exit(1);
}
const PORT = 53682;
const redirect = `http://127.0.0.1:${PORT}`;
const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
  client_id: YT_CLIENT_ID,
  redirect_uri: redirect,
  response_type: 'code',
  scope: 'https://www.googleapis.com/auth/youtube.upload',
  access_type: 'offline',
  prompt: 'consent'
})}`;

http
  .createServer(async (req, res) => {
    const code = new URL(req.url, redirect).searchParams.get('code');
    if (!code) return res.end('No code.');
    const t = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: YT_CLIENT_ID, client_secret: YT_CLIENT_SECRET, redirect_uri: redirect, grant_type: 'authorization_code' })
    }).then((r) => r.json());
    if (!t.refresh_token) {
      res.end('Failed: ' + JSON.stringify(t));
      console.error(t);
      process.exit(1);
    }
    appendEnv('YT_REFRESH_TOKEN', t.refresh_token);
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end('<h2>Tayyor! YouTube ulandi. Bu oynani yopishingiz mumkin.</h2>');
    console.log('✓ YT_REFRESH_TOKEN saved to .env');
    process.exit(0);
  })
  .listen(PORT, () => {
    console.log('Opening Google sign-in… If it does not open, visit:\n' + url);
    exec(`${process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open'} "${url}"`);
  });
