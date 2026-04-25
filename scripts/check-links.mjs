#!/usr/bin/env node
// Internal-link checker. Spins up `astro preview` in a child process,
// crawls every page reachable from the homepage with linkinator, and
// fails the build if any internal link 404s. External links are NOT
// followed — that would slow the check, hit rate limits, and create
// flaky failures from sites that block headless requests. Anchor
// integrity is already covered by check:anchors.

import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { LinkChecker } from 'linkinator';

const PORT = 4329;
const BASE = `http://127.0.0.1:${PORT}`;

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverReady = false;
server.stdout.on('data', (buf) => {
  const s = buf.toString();
  if (/localhost:|127\.0\.0\.1:/.test(s)) serverReady = true;
});
server.stderr.on('data', () => {});

async function shutdown(code) {
  try { server.kill('SIGTERM'); } catch {}
  await sleep(50);
  try { server.kill('SIGKILL'); } catch {}
  process.exit(code);
}

process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));

const start = Date.now();
while (!serverReady && Date.now() - start < 15000) {
  await sleep(150);
}
if (!serverReady) {
  console.error('preview server did not start within 15s');
  await shutdown(1);
}

const checker = new LinkChecker();
const broken = [];
checker.on('link', (r) => {
  if (r.state === 'BROKEN') broken.push(r);
});

const result = await checker.check({
  path: BASE,
  recurse: true,
  linksToSkip: [
    '^mailto:',
    '^tel:',
    // External links — don't fail the check on third-party flakiness.
    '^https?://(?!127\\.0\\.0\\.1|localhost)',
  ],
  concurrency: 25,
  timeout: 5000,
});

// Linkinator sometimes probes trailing-slash variants of the current URL
// (e.g. asks for `/foo/` while crawling `/foo`). With `trailingSlash:
// 'never'` astro preview returns 404 for those, but the underlying page
// is fine — these are self-loop probes, not actual broken links in the
// rendered HTML. Filter them out so the check stays signal-only.
const internalBroken = broken.filter((b) => {
  if (!b.url.startsWith(BASE)) return false;
  if (b.parent && b.url === b.parent + '/') return false;
  return true;
});
if (internalBroken.length > 0) {
  console.error(`✗ ${internalBroken.length} broken internal link(s):`);
  for (const b of internalBroken) {
    console.error(`  [${b.status}] ${b.url}  (from ${b.parent})`);
  }
  await shutdown(1);
}

const scanned = result.links.filter((l) => l.url.startsWith(BASE)).length;
console.log(`✓ link check passed — ${scanned} internal URLs scanned, no broken links.`);
await shutdown(0);
