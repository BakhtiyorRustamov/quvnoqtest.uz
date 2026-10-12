#!/usr/bin/env node
/**
 * Generates the value for ADMIN_PASSWORD_HASH.
 *
 *   node scripts/hash-admin-password.mjs "your-password-here"
 *
 * Paste the printed line into .env for local dev and into the Vercel project's
 * environment variables for production. The plaintext password is never stored
 * anywhere — only this scrypt hash.
 */
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-admin-password.mjs "<password>"');
  process.exit(1);
}
if (password.length < 12) {
  console.error(`Password is ${password.length} characters — use at least 12.`);
  process.exit(1);
}

const salt = randomBytes(16);
const key = await scrypt(password, salt, 64);

console.log('\nAdd this to .env and to Vercel → Settings → Environment Variables:\n');
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString('hex')}$${key.toString('hex')}\n`);
